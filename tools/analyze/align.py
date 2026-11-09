"""Căn lời vào stem giọng — forced alignment, KHÔNG ước lượng năng lượng.

Hai nguồn, hợp nhất theo độ tin cậy:
  1. whisper large-v3  → nghe ra LỜI THẬT + mốc từng từ
  2. CTC MMS_FA + star → biên từ sắc hơn ở chỗ tin cậy cao

Vì sao không đo năng lượng: đã thử hai lần, lệch 324ms rồi 1.68s.
Xem docs/mv/PIPELINE.md § Bước 1.
"""
import sys, os, json, re, wave, argparse
import numpy as np, torch


def load_mono16k(path):
    """Đọc wav bằng module chuẩn — torchaudio.load cần torchcodec."""
    f = wave.open(path, 'rb')
    sr, n, ch = f.getframerate(), f.getnframes(), f.getnchannels()
    raw = np.frombuffer(f.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
    if ch > 1:
        raw = raw.reshape(-1, ch).mean(1)
    if sr != 16000:
        import torchaudio.functional as AF
        raw = AF.resample(torch.from_numpy(raw), sr, 16000).numpy()
    return raw


def hear(vocal_wav, lang='en'):
    """whisper nghe stem giọng → lời thật + mốc từng từ."""
    from faster_whisper import WhisperModel
    m = WhisperModel("large-v3", device="cpu", compute_type="int8")
    segs, _ = m.transcribe(vocal_wav, word_timestamps=True, language=lang,
                           vad_filter=False, beam_size=5)
    out = []
    for s in segs:
        for w in (s.words or []):
            t = w.word.strip().lower().strip('.,!?;:')
            if t:
                out.append({'w': t, 'start': round(w.start, 3),
                            'end': round(w.end, 3), 'p': round(w.probability, 3)})
    return out


def ctc_align(vocal_wav, words, margin=2.0):
    """CTC forced alignment với star token hấp thụ khoảng lặng.

    Thiếu star token thì MỌI từ bị dồn về đầu bài — đã gặp.
    """
    from torchaudio.pipelines import MMS_FA as B
    import torchaudio.functional as AF

    raw = load_mono16k(vocal_wav)
    wav = torch.from_numpy(raw).unsqueeze(0)
    dur = wav.shape[1] / 16000

    model = B.get_model(with_star=True)
    labels = B.get_labels(star='*')
    LUT = {c: i for i, c in enumerate(labels)}
    with torch.inference_mode():
        emission, _ = model(wav)
    E = emission[0].float().clone()          # inference tensor không sửa tại chỗ
    T = E.shape[0]
    ratio = dur / T
    star = LUT['*']
    E[:, star] = E[:, :star].max(dim=1).values - margin

    norm = [re.sub(r"[^a-z']", '', w['w']) or 'a' for w in words]
    tgt, owner = [star], [-1]
    for i, w in enumerate(norm):
        for c in w:
            if c in LUT:
                tgt.append(LUT[c]); owner.append(i)
        tgt.append(star); owner.append(-1)

    paths, scores = AF.forced_align(E.unsqueeze(0),
                                    torch.tensor([tgt], dtype=torch.int32), blank=0)
    path, sc = paths[0].tolist(), scores[0].exp().tolist()

    # forced_align trả NHÃN TOKEN mỗi khung, KHÔNG phải chỉ số trong tgt.
    # Phải tự lần con trỏ khi nhãn đổi.
    per, pos, prev = {}, -1, 0
    for fr, (lab, s) in enumerate(zip(path, sc)):
        if lab != 0:
            if lab != prev:
                pos += 1
                while pos < len(tgt) and tgt[pos] != lab:
                    pos += 1
            if 0 <= pos < len(owner) and owner[pos] >= 0:
                per.setdefault(owner[pos], []).append((fr, s))
        prev = lab

    out = []
    for i, w in enumerate(words):
        fr = per.get(i)
        if not fr:
            out.append(None); continue
        out.append({'start': round(fr[0][0]*ratio, 3),
                    'end':   round((fr[-1][0]+1)*ratio, 3),
                    'conf':  round(float(np.mean([s for _, s in fr])), 3)})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--vocal', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--lyrics', help='chỉ để đối chiếu, KHÔNG dùng làm nguồn')
    ap.add_argument('--lang', default='en', help='ngôn ngữ lời (ja: CTC trên romaji — tools/voice/ja.py)')
    a = ap.parse_args()

    print("  whisper đang nghe stem giọng…")
    wh = hear(a.vocal, a.lang)
    print(f"  nghe được {len(wh)} từ")

    if a.lyrics and os.path.exists(a.lyrics):
        # Chuẩn hoá trước khi so: "99" và "ninety nine" là CÙNG một thứ, chỉ
        # khác cách viết. So thô sẽ báo sai lệch giả và gây nhiễu.
        NUM = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five',
               '6':'six','7':'seven','8':'eight','9':'nine','%':'percent'}
        def norm(seq):
            out = []
            for w in seq:
                if w.isdigit():
                    out += [NUM.get(c, c) for c in w]      # "99" -> nine nine
                elif w in NUM:
                    out.append(NUM[w])
                else:
                    out.append(w)
            # "ninety nine" ~ "nine nine": bỏ tiền tố -ty để so
            return [re.sub(r'ty$', '', w) for w in out]
        given = norm(re.findall(r"[a-z0-9%']+", open(a.lyrics, encoding='utf-8').read().lower()))
        heard = norm([w['w'] for w in wh])
        miss = [w for w in given if w not in heard]
        extra = [w for w in heard if w not in given]
        if miss or extra:
            print(f"  ⚠ lyrics bạn đưa KHÁC bài hát thật:")
            if miss:  print(f"      có trong lyrics, KHÔNG nghe thấy: {miss[:8]}")
            if extra: print(f"      nghe thấy, KHÔNG có trong lyrics: {extra[:8]}")
            print(f"      → dùng bản NGHE ĐƯỢC (metadata mp3 từng sai)")

    print("  CTC đang căn biên từ…")
    if a.lang == 'ja':                       # nhãn MMS_FA chỉ có a-z: căn trên romaji của cách đọc
        sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'voice'))
        import ja
        ctc = ctc_align(a.vocal, [{'w': ja.romaji(ja.reading(w['w']) or 'a')} for w in wh])
    else:
        ctc = ctc_align(a.vocal, wh)

    out = []
    for w, c in zip(wh, ctc):
        use_ctc = c and c['conf'] >= 0.45 and abs(c['start'] - w['start']) < 0.6
        out.append({'w': w['w'],
                    'start': c['start'] if use_ctc else w['start'],
                    'end':   c['end']   if use_ctc else w['end'],
                    'conf':  c['conf']  if use_ctc else w['p'],
                    'src':   'ctc' if use_ctc else 'whisper'})
    n_ctc = sum(1 for o in out if o['src'] == 'ctc')
    print(f"  hợp nhất: {n_ctc} từ theo CTC, {len(out)-n_ctc} theo whisper")

    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    json.dump(out, open(a.out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f"  → {a.out}")


if __name__ == '__main__':
    main()
