#!/usr/bin/env python3
"""Quét mọi chỗ tra lời theo CHỮ trong một project (tl.at / tl.line / L('…')) và báo câu LẶP mà không ghi lần thứ
mấy — tra như vậy luôn ra lần ĐẦU. add-it-up dính 3 lần (LESSONS §25): "piece by piece" khớp cả "Piece by piece—"
(dấu câu bị bỏ khi so), "Same machine—" khớp "Same machine.", hàm L viết tắt nuốt mất tham số n.
  python3 tools/qa/lookups.py <project>        → in các chỗ cần xem; mã thoát 1 nếu có câu không tồn tại
Câu lặp cố ý lấy lần đầu thì cứ để; mọi dòng in ra phải được NHÌN qua một lần.
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import re, json, sys, glob, os
p = sys.argv[1]; root = f'projects/{p}'
if not os.path.exists(f'{root}/data/timeline.json'):
    # VIDEO BÀI HỌC (templates/lesson): cảnh tra w(i, 'từ', n) trong timeline của TRANG chứa nó (plates/<page>-order.js).
    # Từ không có → lookup ném lỗi lúc chạy (đã an toàn); cái nguy hiểm là từ LẶP trong câu mà không ghi n → lấy lần đầu.
    tls = {pg: json.load(open(f'{root}/data/{pg}.timeline.json')) for pg in
           (os.path.basename(f).split('.')[0] for f in glob.glob(f'{root}/data/p*.timeline.json'))}
    page_of = {}
    for f in glob.glob(f'{root}/plates/*-order.js'):
        for name in re.findall(r"'([\w-]+)'", open(f).read()): page_of[name] = os.path.basename(f).split('-')[0]
    pat = re.compile(r"\bw\((\d+),\s*'([^']+)'(?:,\s*(\d+))?\)")
    miss = 0
    for f in sorted(glob.glob(f'{root}/plates/*.js')):
        name = os.path.basename(f)[:-3]; tl = tls.get(page_of.get(name))
        if tl is None: continue
        for n, line in enumerate(open(f), 1):
            for m in pat.finditer(line):
                i, word, k = int(m.group(1)), m.group(2), int(m.group(3) or 1)
                ws = [x['w'] for x in tl['lines'][i]['words']] if i < len(tl['lines']) else []
                c = ws.count(word)
                if c < k: print(f'KHÔNG CÓ  {f}:{n}  câu {i} "{word}" ({k})'); miss += 1
                elif c > 1 and m.group(3) is None: print(f'LẶP {c}×  {f}:{n}  câu {i} "{word}" → lấy lần 1')
    sys.exit(1 if miss else 0)
key = lambda s: re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]+', ' ', s.lower())).strip()
occ = {}
for l in json.load(open(f'{root}/data/timeline.json'))['lines']: occ.setdefault(key(l['text']), []).append(round(l['start'], 2))
pat = re.compile(r"""(?:\bL|tl\.at|tl\.line)\((['"])(.+?)\1(?:,\s*([\w.]+))?\)""")
miss = 0
for f in sorted(glob.glob(f'{root}/**/*.js', recursive=True)):
    for n, line in enumerate(open(f), 1):
        for m in pat.finditer(line):
            o = occ.get(key(m.group(2)))
            if o is None: print(f'KHÔNG CÓ  {f}:{n}  {m.group(2)!r}'); miss += 1
            elif len(o) > 1 and m.group(3) is None: print(f'LẶP {len(o)}×  {f}:{n}  {m.group(2)!r} → lấy lần 1 = {o[0]}s; các lần: {o}')
for f in sorted(glob.glob(f'{root}/**/*.js', recursive=True)):        # hàm viết tắt nuốt tham số n
    for n, line in enumerate(open(f), 1):
        if re.search(r'const L = \(?x\)? =>', line): print(f'NUỐT n   {f}:{n}  L = x => … bỏ mất tham số lần thứ n')
sys.exit(1 if miss else 0)
