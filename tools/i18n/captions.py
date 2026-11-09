#!/usr/bin/env python3
"""Phụ đề dịch: dựng SRT từ bản dịch theo câu rồi gắn lên video qua captions API (400 đơn vị quota mỗi ngôn ngữ).

  tools/i18n/.venv/bin/python tools/i18n/captions.py --login            # cấp thêm quyền captions cho token kênh Anh (một lần)
  tools/i18n/.venv/bin/python tools/i18n/captions.py en/imaginary --dry-run   # dựng + soát SRT, in sẽ đổi gì, KHÔNG gửi
  tools/i18n/.venv/bin/python tools/i18n/captions.py en/imaginary       # gửi thật rồi đọc lại danh sách

Nguồn: tools/i18n/subs/<kênh>-<bài>/<ngôn ngữ>.txt, mỗi dòng MỘT câu đúng thứ tự p1 + p2 của timeline (số dòng phải khớp).
Mốc lấy từ data/*.timeline.json + segments.json; câu dài chia cue theo tỉ lệ ký tự. Ra out/<p>/youtube/languages/subs/<ngôn ngữ>.srt.
"""
import argparse, io, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools'))
from channel import out_dir
sys.path.insert(0, str(ROOT / 'tools' / 'yt'))
from auth import clients, relogin, video_map
sys.path.insert(0, str(ROOT / 'tools' / 'i18n'))
from gen import LANGS

MAX_CUE, MAX_LINE = 84, 42


def timed_lines(p):
    out = []
    for s in json.loads((ROOT / f'projects/{p}/data/segments.json').read_text()):
        if 'timeline' in s:
            tl = json.loads((ROOT / f"projects/{p}/data/{s['timeline']}.timeline.json").read_text())
            out += [(l['start'] + s['offset'], l['end'] + s['offset']) for l in tl['lines']]
    return out


def chunks(text):
    """Chia câu thành các cụm gần bằng nhau ≤ MAX_CUE ký tự, ưu tiên cắt sau dấu câu gần điểm chia (khỏi cụm cuối chớp nhoáng)."""
    res = []
    n = -(-len(text) // MAX_CUE)
    while n > 1:
        target = len(text) // n
        lo, hi = max(target - 14, 1), min(target + 14, MAX_CUE, len(text) - 1)
        punct = [m.end() for m in re.finditer(r'[,.:;?!،؛।]\s', text) if lo <= m.end() <= hi]
        spaces = [i for i, c in enumerate(text) if c == ' ' and i <= MAX_CUE]
        cut = min(punct or spaces or [target], key=lambda k: abs(k - target))
        res.append(text[:cut].strip()); text = text[cut:].strip(); n -= 1
    return res + [text]


def wrap(text):
    if len(text) <= MAX_LINE: return text
    mid = len(text) // 2
    sp = [i for i, c in enumerate(text) if c == ' ']
    if not sp: return text
    i = min(sp, key=lambda k: abs(k - mid))
    return text[:i] + '\n' + text[i + 1:]


def stamp(t):
    ms = round(t * 1000); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'


def build(p, code, times):
    src = ROOT / 'tools/i18n/subs' / p.replace('/', '-') / f'{code}.txt'
    rows = src.read_text(encoding='utf-8').rstrip('\n').split('\n')
    if len(rows) != len(times):
        sys.exit(f'{src}: {len(rows)} dòng, timeline có {len(times)}')
    cues = []
    for row, (a, b) in zip(rows, times):
        row = row.strip(); assert row, (code, a)
        parts = chunks(row); n = sum(map(len, parts)); t = a
        for x in parts:
            e = t + (b - a) * len(x) / n
            cues.append((t, e, x)); t = e
    srt = ''.join(f'{i}\n{stamp(a)} --> {stamp(b)}\n{wrap(x)}\n\n' for i, (a, b, x) in enumerate(cues, 1))
    d = pathlib.Path(out_dir(p)) / 'youtube/languages/subs'; d.mkdir(parents=True, exist_ok=True)
    (d / f'{code}.srt').write_text(srt, encoding='utf-8')
    short = min(b - a for a, b, _ in cues)
    print(f'  {code:6} {len(cues):3} cue  ngắn nhất {short:.2f} s')
    return srt


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('project', nargs='?'); ap.add_argument('--login', action='store_true'); ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    if a.login:
        relogin('en'); print('Đã cấp quyền captions cho token kênh Anh.'); return
    if not a.project: ap.print_help(); return
    times = timed_lines(a.project)
    built = {code: build(a.project, code, times) for code, _ in LANGS}
    if a.dry_run:
        print('--dry-run: không gửi.'); return
    from googleapiclient.http import MediaIoBaseUpload
    vid = {x: i for i, x in video_map('en').items()}[a.project]
    yt = clients('en')[0]
    have = {c['snippet']['language']: c['id'] for c in yt.captions().list(part='snippet', videoId=vid).execute()['items']
            if c['snippet']['trackKind'] != 'asr'}
    for code, srt in built.items():
        media = MediaIoBaseUpload(io.BytesIO(srt.encode('utf-8')), mimetype='application/octet-stream', resumable=False)
        if code in have:
            yt.captions().update(part='id', body={'id': have[code]}, media_body=media).execute(); print(f'  {code}: thay')
        else:
            yt.captions().insert(part='snippet', body={'snippet': {'videoId': vid, 'language': code, 'name': '', 'isDraft': False}},
                                 media_body=media).execute(); print(f'  {code}: thêm')
    back = sorted(c['snippet']['language'] for c in yt.captions().list(part='snippet', videoId=vid).execute()['items'])
    print('Trên YouTube:', back)
    miss = [c for c in built if c not in back]
    if miss: sys.exit(f'!! thiếu {miss}')
    print(f'✓ {len(built)} phụ đề')


if __name__ == '__main__':
    main()
