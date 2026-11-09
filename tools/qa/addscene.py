#!/usr/bin/env python3
"""Nối một cảnh vào projects/<p>/index.html: thêm import sau import cảnh cuối, thêm [mốc, Tên] vào cuối order.
  python3 tools/qa/addscene.py <project> <Tên> <file.js> "<biểu thức mốc>"
  vd.  python3 tools/qa/addscene.py exp-log P21 p21-facing.js "tl.at('What does this exponent produce?')"
Mốc là biểu thức JS — thường tl.at('câu', n); cảnh không bắt đầu ở một câu: tl.line('…').end + 0.12."""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import os, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
p, name, file, mark = sys.argv[1:5]
path = f'projects/{p}/index.html'; s = open(path).read()
lines = s.split('\n')
last = max(i for i, l in enumerate(lines) if l.startswith('import ') and '/plates/' in l)
lines.insert(last + 1, f"import {name} from './plates/{file}';"); s = '\n'.join(lines)
old = ']], beat, end: SONG.duration,'
assert s.count(old) == 1, 'không thấy cuối order — sửa tay'
s = s.replace(old, f"],\n            [{mark}, {name}]], beat, end: SONG.duration,")
open(path, 'w').write(s); print(f'+ {name} @ {mark}')
