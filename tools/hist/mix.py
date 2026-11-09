#!/usr/bin/env python3
"""Trộn tiếng một tập kênh lịch sử: lời + tiếng hiệu ứng theo mốc của trang + nhạc nền (tắt ở đoạn nghiêm).

    python3 tools/hist/mix.py hist/sarajevo --video out/hist/sarajevo/v1-silent.mp4 --out out/hist/sarajevo/sarajevo.mp4 \
        [--music projects/en/fifty-percent/assets/music.m4a] [--sfx-db -9] [--music-db -21]

Mốc tiếng: `projects/<p>/data/cues.json` (= `shoot.js cues --page projects/<p>/episode.html --out …`), mỗi mục
{t, kind, db[, end]}; file `projects/<p>/assets/sfx/<kind>.wav`, không có thì thư viện chung `projects/<kênh>/_kit/sfx/` (có `end` = lặp / cắt tới end, mép mềm — nền phố, rè đĩa). Mục kind `_quiet` {t, end} = nhạc tắt (study 15 §6: chết chóc → im).
Cân tiếng theo RMS phần có tiếng của từng file (file mạng chênh nhau tới 25 dB — PIPELINE §Tiếng): hiệu ứng = lời + sfx-db
(+ db của mục), nhạc = lời + music-db, nhạc nhỏ thêm 6 dB khi đang có lời (ducking).

Mục điều khiển nhạc (tuỳ chọn — không có thì trộn như cũ):
  {kind:'hush', t, end}      nhạc tắt NGẮN trước cú chốt (EDITING C3, study 16 §7 / 17 §6b): dốc 0.15 s, chạm 0 đúng t,
                             lên lại trong 0.3 s từ end (1.5–3 s là đủ). Khác `_quiet` = lặng dài, mép mềm 0.3 s (nhịp chết).
  {kind:'_music', t, file[, from]}  đổi bản nhạc nền theo ĐOẠN (C4) — chéo 1 s quanh t; file tính từ gốc repo; `from` = giây
                             vào bài nhạc (mặc định 0). Bản trước t=0 là --music (hoặc mục `_music` sớm nhất nếu không có
                             --music). Mỗi bản cân RMS riêng → mức như nhau. Đoạn dài hơn bản nhạc → lặp: bỏ đuôi tắt dần
                             của bản (Suno kết bằng fade) rồi nối chéo 2 s công suất đều — không hụt tiếng ở mối lặp.
"""
import argparse, json, subprocess
from pathlib import Path
import numpy as np, soundfile as sf

ROOT = Path(__file__).resolve().parents[2]
SR = 48000


def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()


def rms_db(x):
    e = np.sqrt((x ** 2).mean(1) + 1e-12)
    act = e[e > e.max() * 0.1]                       # phần có tiếng, không tính đuôi im
    return 20 * np.log10(np.sqrt((act ** 2).mean()) + 1e-9)


def loop_to(m, L, xf=2 * SR):
    """m dài đúng L mẫu; ngắn hơn thì lặp thân bài (bỏ đuôi tắt dần: sau điểm cuối có RMS 0.5 s ≥ trung vị − 8 dB) nối chéo xf"""
    if len(m) >= L: return m[:L]
    h = SR // 2; e = np.array([np.sqrt((m[i:i + h] ** 2).mean() + 1e-12) for i in range(0, len(m) - h + 1, h)])
    db = 20 * np.log10(e); body = m[:min(len(m), (np.nonzero(db >= np.median(db) - 8)[0][-1] + 1) * h)]
    xf = min(xf, len(body) // 4); r = np.sqrt(np.linspace(0, 1, xf, dtype=np.float32))[:, None]
    out = body.copy()
    while len(out) < L:
        out[-xf:] = out[-xf:] * r[::-1] + body[:xf] * r
        out = np.concatenate([out, body[xf:]])
    return out[:L]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('p'); ap.add_argument('--video', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--music', help='bản nhạc nền từ đầu (đổi theo đoạn bằng mục _music trong cues)'); ap.add_argument('--sfx-db', type=float, default=-9); ap.add_argument('--music-db', type=float, default=-21)
    ap.add_argument('--cues', help='file mốc khác data/cues.json (thử kế hoạch tiếng mà không đụng trang)')
    a = ap.parse_args()
    P = ROOT / 'projects' / a.p
    voice = load(P / 'audio' / 'narration.wav')
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video],
                               capture_output=True, text=True, check=True).stdout)
    n = int(dur * SR) + 1
    mix = np.zeros((n, 2), np.float32); mix[:min(n, len(voice))] += voice[:n]
    vref = rms_db(voice)
    ap_cues = Path(a.cues) if a.cues else P / 'data' / 'cues.json'
    cues = json.loads(ap_cues.read_text())
    cache = {}
    for c in cues:
        if c['kind'].startswith('_') or c['kind'] == 'hush': continue
        if c['kind'] not in cache:
            f = P / 'assets' / 'sfx' / f"{c['kind']}.wav"
            if not f.exists(): f = P.parent / '_kit' / 'sfx' / f"{c['kind']}.wav"      # thư viện chung của kênh
            x = load(f); cache[c['kind']] = x * 10 ** ((vref + a.sfx_db - rms_db(x)) / 20)
        x = cache[c['kind']] * 10 ** (c.get('db', 0) / 20); i = int(c['t'] * SR)
        if i >= n: continue
        if 'end' in c:                                                     # nền / cắt ngắn: lặp tới end, mép mềm 0.4 s
            L = max(1, int((c['end'] - c['t']) * SR)); x = np.tile(x, (L // len(x) + 1, 1))[:L].copy()
            f = min(L // 2, int(0.4 * SR)); r = np.linspace(0, 1, f, dtype=np.float32)[:, None]
            x[:f] *= r; x[L - f:] *= r[::-1]
        j = min(n, i + len(x)); mix[i:j] += x[:j - i]
    beds = sorted([c for c in cues if c['kind'] == '_music'], key=lambda c: c['t'])
    if a.music: beds = [{'t': 0, 'file': str(Path(a.music).resolve())}] + beds   # --music: tính từ thư mục hiện tại như cũ
    if beds:
        mus = np.zeros((n, 2), np.float32)
        for b, nb in zip(beds, beds[1:] + [None]):
            m = load(Path(b['file']) if Path(b['file']).is_absolute() else ROOT / b['file'])
            m = m * 10 ** ((vref + a.music_db - rms_db(m)) / 20)
            if b.get('from'): m = m[int(b['from'] * SR):]
            t0 = 0 if b is beds[0] else int((b['t'] - 0.5) * SR)        # chéo 1 s quanh mốc đổi bản
            t1 = n if nb is None else min(n, int((nb['t'] + 0.5) * SR))
            t0 = max(0, t0); L = t1 - t0
            if L <= 0: continue
            seg = loop_to(m, L)                                            # bản mới vào từ `from` (mặc định đầu bài)
            w = np.ones(L, np.float32); x = int(SR)
            if b is not beds[0]: w[:x] = np.linspace(0, 1, min(x, L))[:len(w[:x])]
            if nb is not None: w[-x:] = np.minimum(w[-x:], np.linspace(1, 0, min(x, L)))
            mus[t0:t1] += seg * w[:, None]
        env = np.sqrt((np.pad(voice[:, 0], (0, max(0, n - len(voice))))[:n] ** 2))
        k = SR // 10; talk = np.convolve(env, np.ones(k) / k, 'same') > 10 ** ((vref - 30) / 20)
        g = np.where(talk, 10 ** (-6 / 20), 1.0)
        for c in cues:
            if c['kind'] == '_quiet': g[int(c['t'] * SR):int(c['end'] * SR)] = 0
        k = SR // 3; g = np.convolve(g, np.ones(k) / k, 'same')               # mở / tắt nhạc mượt 0.3 s
        h = np.ones(n, np.float32)                                           # hush: tắt nhanh 0.15 s, mở lại 0.3 s
        for c in cues:
            if c['kind'] != 'hush': continue
            i0, i1 = int(c['t'] * SR), int(c['end'] * SR); fi, fo = int(0.15 * SR), int(0.3 * SR)
            if i0 >= n or i1 <= i0: continue
            r = np.ones(n, np.float32); a0 = max(0, i0 - fi)
            r[a0:i0] = np.linspace(1, 0, fi + 1)[fi - (i0 - a0) + 1:]         # chạm 0 đúng t
            r[i0:min(n, i1)] = 0
            if i1 < n: r[i1:min(n, i1 + fo)] = np.linspace(0, 1, fo)[:min(n, i1 + fo) - i1]
            h = np.minimum(h, r)
        fade = np.clip((n - np.arange(n)) / (2.5 * SR), 0, 1)                  # nhạc nhỏ dần 2.5 s cuối
        mix += mus * (g * h * fade)[:, None]
    peak = np.abs(mix).max()
    if peak > 0.98: mix *= 0.98 / peak
    wav = Path(a.out).with_suffix('.wav'); sf.write(wav, mix, SR)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-i', str(wav), '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '256k', '-shortest', a.out], check=True)
    wav.unlink()
    nh = sum(c['kind'] == 'hush' for c in cues); nm = len(beds) if beds else 0
    print(f'✓ {a.out} — {len([c for c in cues if not c["kind"].startswith("_") and c["kind"] != "hush"])} tiếng, {nh} hush, {nm} bản nhạc, đỉnh {20 * np.log10(peak + 1e-9):.1f} dBFS')


if __name__ == '__main__':
    main()
