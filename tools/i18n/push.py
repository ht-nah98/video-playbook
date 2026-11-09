#!/usr/bin/env python3
"""Gắn bản dịch title + mô tả (out/<p>/youtube/languages/*.txt) lên video YouTube qua YouTube Data API v3.

Chạy bằng venv riêng (cài một lần: python3 -m venv tools/i18n/.venv &&
  tools/i18n/.venv/bin/pip install google-api-python-client google-auth-oauthlib):

  tools/i18n/.venv/bin/python tools/i18n/push.py --login          # đăng nhập lần đầu, in kênh đã cấp quyền
  tools/i18n/.venv/bin/python tools/i18n/push.py --list           # video đã đăng: id + title (để điền channels/en/videos.json)
  tools/i18n/.venv/bin/python tools/i18n/push.py pi --dry-run     # in sẽ đổi gì, KHÔNG gửi
  tools/i18n/.venv/bin/python tools/i18n/push.py pi               # gửi thật, rồi đọc lại và soát

Chỉ THÊM / thay mục `localizations` theo ngôn ngữ có file; title, mô tả, tags, danh mục gốc được đọc rồi ghi lại nguyên
vẹn (videos.update ghi đè cả snippet) và soát lại sau khi gửi. Bí mật ở ~/.config/mascot-mv/ (token youtube-token-en.json, tools/yt/auth.py) (ngoài repo, không commit).
"""
import argparse, json, pathlib, re, sys, time

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools'))
from channel import out_dir

sys.path.insert(0, str(ROOT / 'tools' / 'yt'))
from auth import clients, video_map  # token kênh Anh, chặn sai kênh theo ID
KEEP = ('title', 'description', 'tags', 'categoryId', 'defaultLanguage', 'defaultAudioLanguage')


def client():
    return clients('en')[0]


def my_channel(yt):
    r = yt.channels().list(part='snippet,contentDetails', mine=True).execute()
    if not r.get('items'):
        sys.exit('Tài khoản đã đăng nhập không có kênh — đăng nhập lại và CHỌN kênh 99% from scratch (xem PDF, mục Lỗi).')
    return r['items'][0]


def read_langs(p):
    d = pathlib.Path(out_dir(p)) / 'youtube' / 'languages'
    files = sorted(d.glob('[0-9][0-9]-*.txt'))
    if not files:
        sys.exit(f'Không có bản dịch ở {d} — chạy python3 tools/i18n/{p}.py trước')
    out = {}
    for f in files:
        code = f.stem.split('-', 1)[1]
        t = f.read_text()
        title = re.search(r'===== TITLE[^\n]*\n(.*?)\n', t).group(1).strip()
        desc = t.split('===== DESCRIPTION', 1)[1].split('\n', 1)[1].strip()
        assert title and desc and len(title) <= 100 and len(desc.encode()) <= 5000, f
        out[code] = {'title': title, 'description': desc}
    return out


def push(yt, p, dry):
    vid = {proj: i for i, proj in video_map('en').items()}.get(p) or sys.exit(
        f'{p} chưa có trong channels/en/videos.json — chạy --list rồi điền "id": "{p}"')
    items = yt.videos().list(part='snippet,localizations', id=vid).execute().get('items')
    if not items:
        sys.exit(f'Không thấy video {vid} trên kênh đã đăng nhập')
    v = items[0]; sn = v['snippet']
    snippet = {k: sn[k] for k in KEEP if k in sn}
    if not snippet.get('defaultLanguage'):  # localizations cần ngôn ngữ gốc của title/mô tả
        snippet['defaultLanguage'] = 'en'
    old = v.get('localizations', {}); new = read_langs(p)
    loc = {**old, **new}
    print(f'{p}: {vid} "{sn["title"]}"  (ngôn ngữ gốc {snippet["defaultLanguage"]}'
          f'{" — sẽ đặt" if not sn.get("defaultLanguage") else ""})')
    for code, x in new.items():
        tag = 'mới' if code not in old else ('giống' if old[code] == x else 'thay')
        print(f'  {code:6} [{tag:4}] {x["title"]}')
    if dry:
        print('  --dry-run: không gửi.'); return
    yt.videos().update(part='snippet,localizations', body={'id': vid, 'snippet': snippet, 'localizations': loc}).execute()
    for wait in (0, 5, 10, 20):  # đọc ngay sau update có thể còn bản cũ (calculus 2026-10-26: báo lệch, 1 phút sau khớp)
        time.sleep(wait)
        back = yt.videos().list(part='snippet,localizations', id=vid).execute()['items'][0]
        bad = [k for k in KEEP if k in sn and back['snippet'].get(k) != sn[k]]
        miss = [c for c in new if back.get('localizations', {}).get(c) != new[c]]
        if not (bad or miss):
            break
    if bad or miss:
        sys.exit(f'  !! soát sau khi gửi lệch: snippet {bad} · ngôn ngữ {miss}')
    print(f'  ✓ đã gắn {len(new)} ngôn ngữ; title/mô tả/tags gốc giữ nguyên')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('projects', nargs='*')
    ap.add_argument('--login', action='store_true', help='đăng nhập và in kênh đã cấp quyền')
    ap.add_argument('--list', action='store_true', help='liệt kê video đã đăng của kênh')
    ap.add_argument('--dry-run', action='store_true', help='chỉ in sẽ đổi gì')
    a = ap.parse_args()
    if not (a.login or a.list or a.projects):
        ap.print_help(); return
    yt = client(); ch = my_channel(yt)
    print(f'Kênh: {ch["snippet"]["title"]} ({ch["id"]})')
    if a.list:
        up = ch['contentDetails']['relatedPlaylists']['uploads']; tok = None
        while True:
            r = yt.playlistItems().list(part='snippet', playlistId=up, maxResults=50, pageToken=tok).execute()
            for it in r['items']:
                s = it['snippet']; print(f'  {s["resourceId"]["videoId"]}  {s["publishedAt"][:10]}  {s["title"]}')
            tok = r.get('nextPageToken')
            if not tok: break
    for p in a.projects:
        push(yt, p, a.dry_run)


if __name__ == '__main__':
    main()
