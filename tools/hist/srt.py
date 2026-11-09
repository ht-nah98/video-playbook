#!/usr/bin/env python3
"""Phụ đề + chương YouTube cho một tập kênh sử, từ data/narration.timeline.json (chữ lấy của SCRIPT, mốc của whisper).

    python3 tools/hist/srt.py hist/<tập>            # → out/hist/<tập>/youtube/<tập>.en.srt + in danh sách chương (M:SS tên đoạn)

Cắt mỗi dòng lời thành cue 34–50 ký tự ở dấu câu; đuôi < 18 ký tự gộp vào cue trước; cue ngắn nhất 0.6 s.
Tên chương = tên mục `## ` trong SCRIPT (sửa tay cho hay hơn khi dán vào mô tả). Trước đây viết tay mỗi tập (berlin, pearl — §226).
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def ts(x):
    h, m, s = int(x // 3600), int(x % 3600 // 60), x % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)) % 1000:03d}"


def cues(lines):
    out = []
    for l in lines:
        ws, text = l['words'], l['text'].split()
        n, cur, start, lc = len(text), [], None, []
        for i, wd in enumerate(text):
            k = min(len(ws) - 1, round(i * (len(ws) - 1) / max(1, n - 1)))   # chữ SCRIPT ↔ mốc whisper theo tỉ lệ vị trí
            if start is None: start = ws[k]['start']
            cur.append(wd); s = ' '.join(cur)
            if (len(s) >= 34 and (wd[-1] in ',.?!' or len(s) >= 50)) or i == n - 1:
                lc.append([start, ws[k]['end'] if i < n - 1 else l['end'], s]); cur, start = [], None
        if len(lc) > 1 and len(lc[-1][2]) < 18: lc[-2][1] = lc[-1][1]; lc[-2][2] += ' ' + lc[-1][2]; lc.pop()
        out += lc
    return out


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help'): print(__doc__.strip()); return
    p = sys.argv[1]; name = p.split('/')[-1]
    t = json.loads((ROOT / 'projects' / p / 'data' / 'narration.timeline.json').read_text())
    cs = cues(t['lines']); d = ROOT / 'out' / p / 'youtube'; d.mkdir(parents=True, exist_ok=True)
    (d / f'{name}.en.srt').write_text('\n'.join(f"{i}\n{ts(a)} --> {ts(max(b, a + 0.6))}\n{s}\n" for i, (a, b, s) in enumerate(cs, 1)))
    print(f'✓ {d / (name + ".en.srt")} — {len(cs)} dòng, dài nhất {max(len(c[2]) for c in cs)} ký tự')
    for s in t['sections']: print(f"{int(s['start']) // 60}:{int(s['start']) % 60:02d} {s['name']}")


if __name__ == '__main__':
    main()
