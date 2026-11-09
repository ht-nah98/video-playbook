"""Bước 2 — ghép lời GỐC (projects/<p>/lyrics.raw.txt, có tag [Section]) với mốc từ NGHE được (words.json của
align.py / whisper). Whisper nghe sai vài từ, nên văn bản lấy từ lời gốc, thời gian lấy từ căn chỉnh; từ không
khớp được nội suy giữa hai từ khớp kề nhau.

  python3 tools/analyze/lyrics_map.py projects/<p> <words.json>   → projects/<p>/data/timeline.raw.json
Bản RAW không bao giờ sửa tay; overrides.py đọc nó và ghi timeline.json (chạy lại bao nhiêu lần cũng ra một kết quả).
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, re, sys, difflib
from pathlib import Path
P = Path(sys.argv[1]).resolve()
words = json.load(open(sys.argv[2]))
NUM = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine'}
def norm(w):
    w = w.lower().replace('’', "'")
    w = re.sub(r"[^a-z0-9']", '', w)
    return NUM.get(w, w)
# lời gốc → danh sách token có gắn dòng và section
sec, lines, toks = None, [], []
for raw in open(P / "lyrics.raw.txt", encoding='utf-8'):
    s = raw.strip()
    if not s: continue
    m = re.match(r'^\[(.+)\]$', s)
    if m: sec = m.group(1); lines.append({"section": sec, "text": None}); continue
    if s == '...': continue
    li = len(lines); lines.append({"section": sec, "text": s})
    for w in re.findall(r"[A-Za-z0-9'’\-]+", s):
        for part in w.split('-'):
            if norm(part): toks.append({"w": norm(part), "line": li})
heard = [norm(w['w']) for w in words]
sm = difflib.SequenceMatcher(a=[t['w'] for t in toks], b=heard, autojunk=False)
for a, b, n in sm.get_matching_blocks():
    for k in range(n):
        toks[a+k]['start'] = words[b+k]['start']; toks[a+k]['end'] = words[b+k]['end']
matched = sum('start' in t for t in toks)
# nội suy
idx = [i for i, t in enumerate(toks) if 'start' in t]
for i, t in enumerate(toks):
    if 'start' in t: continue
    L = max([j for j in idx if j < i], default=None); R = min([j for j in idx if j > i], default=None)
    if L is None: t['start'] = toks[R]['start'] - 0.3*(R-i); t['end'] = t['start'] + 0.25
    elif R is None: t['start'] = toks[L]['end'] + 0.3*(i-L); t['end'] = t['start'] + 0.25
    else:
        f = (i-L)/(R-L); t['start'] = toks[L]['end'] + f*(toks[R]['start']-toks[L]['end']); t['end'] = t['start'] + 0.2
    t['interp'] = True
out_lines = []
for li, l in enumerate(lines):
    if l['text'] is None: continue
    tw = [t for t in toks if t['line'] == li]
    out_lines.append({"section": l['section'], "text": l['text'],
                      "start": round(tw[0]['start'], 3), "end": round(tw[-1]['end'], 3),
                      "words": [{"w": t['w'], "start": round(t['start'], 3), "end": round(t['end'], 3),
                                 **({"interp": True} if t.get('interp') else {})} for t in tw]})
secs = []
for l in out_lines:
    if not secs or secs[-1]['name'] != l['section']:
        secs.append({"name": l['section'], "start": l['start'], "end": l['end']})
    secs[-1]['end'] = l['end']
json.dump({"sections": secs, "lines": out_lines}, open(P / "data/timeline.raw.json", "w"), indent=1, ensure_ascii=False)
print(f"khớp {matched}/{len(toks)} từ ({100*matched/len(toks):.0f}%), nội suy {len(toks)-matched}")
for s in secs: print(f"{s['start']:7.2f} → {s['end']:7.2f}  {s['name']}")
