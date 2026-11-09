#!/usr/bin/env python3
"""Soát gói đăng out/<p>/youtube/: đủ file, đúng giới hạn ô Studio, mô tả mang đúng chương hiện tại.

    python3 tools/lesson/pack_check.py <p>     # mã 1 = có lỗi; build.py gọi ở bước cuối (chỉ cảnh báo)
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools'))
LIMITS = {'title.txt': 100, 'title-b.txt': 100, 'tags.txt': 500, 'problems.txt': 800}
NEED = ['title.txt', 'title-b.txt', 'description.txt', 'tags.txt', 'problems.txt', 'chapters.txt', 'subtitles-en.srt']


def check(d):
    d = pathlib.Path(d)
    errs = [f'thiếu {n}' for n in NEED if not (d / n).exists()]
    read = lambda n: (d / n).read_text(encoding='utf-8').strip() if (d / n).exists() else ''
    errs += [f'{n}: {len(read(n))}/{m} ký tự' for n, m in LIMITS.items() if len(read(n)) > m]
    desc = read('description.txt')
    if len(desc.encode('utf-8')) > 5000: errs.append('description.txt: quá 5000 byte')
    if re.search(r'[<>]', desc): errs.append('description.txt: có < hoặc >')
    # build lại đổi mốc chương, còn mô tả chép tay thì không tự đổi (en/imaginary bản 2, §254)
    errs += [f'description.txt thiếu chương hiện tại "{l}"' for l in read('chapters.txt').splitlines() if desc and l not in desc]
    errs += [f'problems.txt sai định dạng: "{l}"' for l in read('problems.txt').splitlines() if not re.match(r'\d+:\d\d(:\d\d)? \S', l)]
    return errs


def main():
    from channel import out_dir
    errs = check(pathlib.Path(out_dir(sys.argv[1])) / 'youtube')
    for e in errs: print(f'  !! gói đăng: {e}')
    if not errs: print('✓ gói đăng đủ')
    return 1 if errs else 0


if __name__ == '__main__':
    raise SystemExit(main())
