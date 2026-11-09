#!/usr/bin/env python3
"""Đo độ "ngắt ngắt" của lời đọc TRƯỚC khi đọc giọng (LESSONS §34, §182 — lỗi lặp lại: viết theo nhịp cắt hình → mảnh câu).

    python3 tools/voice/script_check.py <p>          # vd. hist/sarajevo — đọc projects/<p>/SCRIPT.md như narrate.py

Báo: số câu, độ dài câu trung vị, tỉ lệ MẢNH (câu < 5 từ: "Nineteen.", "Two shots."), chuỗi mảnh liền nhau, dòng hơi chứa
≥ 3 câu, câu trích "…" đứng giữa dòng kể (chỉ cảnh báo — §208). Mảnh câu là vũ khí — một hai cái đúng chỗ đắt giá (punchline, sốc); rải khắp bài thì đọc lên như máy đọc gạch đầu dòng.
Mã ra 1 khi: mảnh > 25% số câu, hoặc chuỗi ≥ 5 mảnh liền nhau, hoặc trung vị < 7 từ. Chỉ tiếng Anh (tách từ bằng khoảng trắng).
Đối chiếu: en/pi 16% · zero-div 10% · logarithm 18% · pemdas 10% (chuỗi ≤ 4, trung vị 9–11) ; hist/sarajevo bản 1 bị chê: 54%, chuỗi 6, trung vị 4.
"""
import re, statistics, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from narrate import parse  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
FRAG, MAX_FRAG, MAX_RUN, MIN_MED = 5, 0.25, 5, 7    # hiệu chỉnh 2026-10-27: bài Anh đã duyệt 10–18% mảnh, chuỗi ≤ 4, trung vị 9–11


def sentences(line):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+|(?<=:)\s+(?=[A-Z])', line) if re.search(r'\w', s)]


def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    f = ROOT / 'projects' / sys.argv[1] / 'SCRIPT.md'
    if '\n## Cold open' not in f.read_text(encoding='utf-8'): sys.exit(f'{f}: không có mục "## Cold open" (định dạng narrate.py)')
    beats = parse(f)
    sents = [(i + 1, s) for i, b in enumerate(beats) for s in sentences(b['text'])]
    n = [len(re.findall(r"[\w'’-]+", s)) for _, s in sents]
    frag = [k for k, w in enumerate(n) if w < FRAG]
    run = best = 0
    for k, w in enumerate(n):
        run = run + 1 if w < FRAG else 0; best = max(best, run)
    med = statistics.median(n) if n else 0
    print(f'{len(beats)} dòng hơi · {len(sents)} câu · trung vị {med:g} từ/câu · mảnh (< {FRAG} từ) {len(frag)}/{len(sents)} '
          f'= {len(frag) / max(1, len(sents)):.0%} · chuỗi mảnh dài nhất {best}')
    for k in frag: print(f'  mảnh  L{sents[k][0]}: {sents[k][1]}')
    for i, b in enumerate(beats, 1):
        if len(sentences(b['text'])) >= 3: print(f'  dòng L{i} có {len(sentences(b["text"]))} câu: {b["text"]}')
        q = b['text'].find('"')       # câu trích dài sau lời kể: thị trưởng ở hist/wrong-turn bị nuốt 6 từ, đọc lại vẫn nuốt
        if q > 0 and b['text'][:q].strip() and len(b['text'][q:].split('"')[1].split()) >= 8: print(f'  trích lời giữa dòng L{i} (TTS dễ nuốt — tách câu trích thành dòng riêng, §208): {b["text"]}')
    bad = len(frag) / max(1, len(sents)) > MAX_FRAG or best >= MAX_RUN or med < MIN_MED
    print('✗ NGẮT NGẮT — viết lại thành văn xuôi (channels/hist/WRITING.md §2)' if bad else '✓ nhịp câu ổn')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
