"""Bóc tách một bài hát thành dữ liệu cho đạo diễn hình ảnh.

Input : mp3/wav  (+ lyrics.txt tuỳ chọn, chỉ để đối chiếu)
Output: music.json  — xem tools/analyze/README.md

Chạy qua run.sh (nó lo venv + Demucs). Đừng gọi trực tiếp.
"""
import sys, os, json, re, wave, argparse
import numpy as np

SR = 44100
FPS = 100                 # đường bao 100fps — đủ mịn cho hiệu ứng 60fps


# ---------------------------------------------------------------- đọc wav
def read_wav(path, want_sr=SR):
    import soundfile as sf
    x, sr = sf.read(path, always_2d=True)
    x = x.mean(1).astype(np.float32)
    if sr != want_sr:
        import scipy.signal as ss
        x = ss.resample_poly(x, want_sr, sr).astype(np.float32)
    return x, want_sr


# ------------------------------------------------------- tempo: grid-energy
def onset_flux(x, sr, hop=256, win=1024):
    """Spectral flux — nền cho mọi phép đo nhịp."""
    n = 1 + (len(x) - win) // hop
    w = np.hanning(win).astype(np.float32)
    S = np.empty((win // 2 + 1, n), np.float32)
    for i in range(n):
        S[:, i] = np.abs(np.fft.rfft(x[i*hop:i*hop+win] * w))
    d = np.diff(S, axis=1)
    d[d < 0] = 0
    f = d.sum(0)
    return f / (f.max() + 1e-9), sr / hop


def grid_score(flux, fps, bpm):
    """Đặt lưới beat lên onset envelope, đo năng lượng rơi trúng lưới.

    Đây là cách DUY NHẤT đáng tin để chọn BPM. Autocorrelation hay tempo
    của librosa đều từng cho kết quả sai ở bài 99% (khai 118, thật 78.97).
    """
    per = 60.0 / bpm * fps
    best, best_off = 0.0, 0.0
    for off in np.arange(0, per, max(1.0, per / 32)):
        idx = np.arange(off, len(flux) - 1, per).astype(int)
        if len(idx) < 4:
            continue
        v = flux[idx].mean()
        if v > best:
            best, best_off = v, off
    return best / (flux.mean() + 1e-9), best_off / fps


def find_tempo(x, sr, lo=60, hi=190):
    flux, fps = onset_flux(x, sr)
    cands = np.arange(lo, hi + 0.01, 0.01)
    scores = np.array([grid_score(flux, fps, b)[0] for b in cands])
    i = int(scores.argmax())
    bpm = float(cands[i])
    conf = float(scores[i])
    # tinh chỉnh phase
    _, t0 = grid_score(flux, fps, bpm)
    # nửa/đôi tempo: chọn bản có điểm cao hơn rõ rệt
    for alt in (bpm / 2, bpm * 2):
        if lo <= alt <= hi:
            s, _ = grid_score(flux, fps, alt)
            if s > conf * 1.15:
                bpm, conf = alt, s
                _, t0 = grid_score(flux, fps, bpm)
    return bpm, conf, t0


# ------------------------------------------------------------- đường bao
def envelope(x, sr, lo=None, hi=None):
    """RMS 100fps của một dải tần, chuẩn hoá theo phân vị 99 của chính nó."""
    if lo or hi:
        from scipy.signal import butter, sosfiltfilt
        ny = sr / 2
        if lo and hi:  sos = butter(4, [lo/ny, hi/ny], btype='band', output='sos')
        elif lo:       sos = butter(4, lo/ny, btype='high', output='sos')
        else:          sos = butter(4, hi/ny, btype='low',  output='sos')
        x = sosfiltfilt(sos, x)
    hop = sr // FPS
    n = len(x) // hop
    e = np.sqrt(np.array([np.mean(x[i*hop:(i+1)*hop] ** 2) for i in range(n)]))
    p = np.percentile(e, 99)
    return np.clip(e / (p + 1e-9), 0, 1)


def peaks(env, fps=FPS, thr=0.22, min_gap=0.08):
    """Đỉnh của đường bao → onset."""
    d = np.diff(env, prepend=env[0])
    d[d < 0] = 0
    d = d / (d.max() + 1e-9)
    out, last = [], -9
    for i in range(1, len(d) - 1):
        if d[i] > thr and d[i] >= d[i-1] and d[i] >= d[i+1]:
            t = i / fps
            if t - last >= min_gap:
                out.append(round(t, 3)); last = t
    return out


# --------------------------------------------------------------- sections
def sections(env, downbeats, dur):
    """Chia bài theo mức năng lượng, ranh giới luôn rơi vào downbeat."""
    if not downbeats:
        return [{"name": "all", "start": 0.0, "end": round(dur, 3), "energy": 1.0}]
    # Ngưỡng theo PHÂN VỊ của chính bài, không phải số cố định — bài ngắn/nhẹ
    # sẽ bị gộp hết thành một section nếu dùng ngưỡng tuyệt đối.
    bar_e = []
    for i in range(len(downbeats)):
        a_ = downbeats[i]
        b_ = downbeats[i+1] if i+1 < len(downbeats) else dur
        bar_e.append(float(env[int(a_*FPS):int(b_*FPS)].mean()) if b_ > a_ else 0.0)
    lo_thr = float(np.percentile(bar_e, 33))
    hi_thr = float(np.percentile(bar_e, 67))

    segs, cur = [], [downbeats[0]]
    lv_prev = None
    for i in range(len(downbeats)):
        a = downbeats[i]
        b = downbeats[i+1] if i+1 < len(downbeats) else dur
        e = float(env[int(a*FPS):int(b*FPS)].mean()) if b > a else 0.0
        lv = 0 if e < lo_thr else (1 if e < hi_thr else 2)
        if lv_prev is not None and lv != lv_prev:
            segs.append((cur[0], a)); cur = [a]
        lv_prev = lv
    segs.append((cur[0], dur))
    names = ['intro', 'build', 'main', 'drop', 'outro']
    out = []
    for i, (a, b) in enumerate(segs):
        e = float(env[int(a*FPS):int(b*FPS)].mean()) if b > a else 0.0
        out.append({"name": names[min(i, len(names)-1)] if len(segs) <= 5 else f"sec{i+1}",
                    "start": round(a, 3), "end": round(b, 3), "energy": round(e, 3)})
    return out


# ------------------------------------------------------------ main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mix', required=True)      # wav gốc
    ap.add_argument('--vocal')                   # stem giọng (Demucs)
    ap.add_argument('--drums')
    ap.add_argument('--bass')
    ap.add_argument('--other')
    ap.add_argument('--words')                   # json từ align.py
    ap.add_argument('--out', required=True)
    a = ap.parse_args()

    x, sr = read_wav(a.mix)
    dur = len(x) / sr
    print(f"  bài dài {dur:.3f}s")

    bpm, conf, t0 = find_tempo(x, sr)
    print(f"  BPM {bpm:.2f}  (tin cậy {conf:.2f}× baseline, downbeat đầu {t0:.3f}s)")
    if conf < 2.0:
        print(f"  ⚠ tin cậy THẤP — kiểm tay trước khi dùng")

    per = 60.0 / bpm
    beats = [round(t0 + i*per, 3) for i in range(int((dur - t0) / per) + 1)]
    downbeats = beats[::4]

    env = {}
    env['rms']  = envelope(x, sr)
    env['low']  = envelope(x, sr, hi=150)
    env['mid']  = envelope(x, sr, lo=150, hi=2000)
    env['high'] = envelope(x, sr, lo=4000)
    for name, path in (('vocal', a.vocal), ('drums', a.drums),
                       ('bass', a.bass), ('other', a.other)):
        if path and os.path.exists(path):
            s, _ = read_wav(path)
            n = min(len(s), len(x))
            env[name] = envelope(s[:n], sr)
        else:
            env[name] = np.zeros_like(env['rms'])

    L = min(len(v) for v in env.values())
    env = {k: v[:L] for k, v in env.items()}

    ons = {
        'kick':  peaks(env['low'],   thr=0.20, min_gap=0.12),
        'snare': peaks(env['mid'],   thr=0.26, min_gap=0.14),
        'hat':   peaks(env['high'],  thr=0.24, min_gap=0.06),
        'vocal': peaks(env['vocal'], thr=0.20, min_gap=0.10),
    }
    print(f"  onset: kick {len(ons['kick'])} · snare {len(ons['snare'])} · "
          f"hat {len(ons['hat'])} · vocal {len(ons['vocal'])}")

    words, lines, gaps = [], [], []
    if a.words and os.path.exists(a.words):
        words = json.load(open(a.words, encoding='utf-8'))
        # gom câu: khoảng nghỉ > 0.55s là ranh giới
        cur = []
        for i, w in enumerate(words):
            if cur and w['start'] - words[i-1]['end'] > 0.55:
                lines.append(cur); cur = []
            cur.append(i)
        if cur: lines.append(cur)
        lines = [{"text": ' '.join(words[i]['w'] for i in ix),
                  "start": words[ix[0]]['start'], "end": words[ix[-1]]['end'],
                  "words": ix} for ix in lines]
        # khoảng không có giọng
        prev = 0.0
        for ln in lines:
            if ln['start'] - prev > 0.8:
                gaps.append({"start": round(prev,3), "end": round(ln['start'],3),
                             "dur": round(ln['start']-prev,3)})
            prev = ln['end']
        if dur - prev > 0.8:
            gaps.append({"start": round(prev,3), "end": round(dur,3),
                         "dur": round(dur-prev,3)})
        print(f"  lời: {len(words)} từ · {len(lines)} câu · {len(gaps)} khoảng lặng")

        # KIỂM: giọng có bám beat không?
        off = []
        for w in words:
            k = (w['start'] - t0) / per
            off.append(abs((k - round(k)) * per))
        near = float(np.mean(np.array(off) < 0.08))
        print(f"  từ rơi gần beat: {near*100:.0f}%  "
              f"→ {'chữ CÓ THỂ bám beat' if near > 0.6 else 'chữ PHẢI bám lời, nền bám beat'}")

    out = {
        "duration": round(dur, 3),
        "bpm": round(bpm, 2),
        "bpm_confidence": round(conf, 2),
        "beat_period": round(per, 5),
        "t0": round(t0, 3),
        "time_signature": 4,
        "beats": beats,
        "downbeats": downbeats,
        "sections": sections(env['rms'], downbeats, dur),
        "fps": FPS,
        "env": {k: [round(float(z), 4) for z in v] for k, v in env.items()},
        "onsets": ons,
        "words": words,
        "lines": lines,
        "vocal_gaps": gaps,
    }
    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    json.dump(out, open(a.out, 'w', encoding='utf-8'), ensure_ascii=False)
    print(f"  → {a.out}  ({os.path.getsize(a.out)/1024:.0f} KB)")


if __name__ == '__main__':
    main()
