#!/usr/bin/env python3
"""Tìm + tải ảnh Wikimedia Commons có giấy phép dùng được (PD / CC0 — mặc định chỉ hai loại này), chậm rãi (Commons chặn khi
gọi dồn — 2026-10-27 trả trang lỗi thay JSON).

    python3 tools/hist/commons.py search "<từ khoá>" [--n 8]                 # in tên file + giấy phép + cỡ
    python3 tools/hist/commons.py get "File:<tên>" <out.jpg> [--w 1920] [--any-license]   # tải bản thu nhỏ, ghi meta.json cạnh file

meta.json (cùng thư mục out) giữ {khoá: {title, lic, artist}} — ghi nguồn trên hình bằng `credit`.
"""
import argparse, json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

UA = {'User-Agent': 'mascot-mv/1.0 (history channel research; local use)'}
OK = re.compile(r'^(public domain|pd|cc0|no restrictions)', re.I)


def api(**q):
    q.update(format='json')
    for i in range(5):
        try:
            r = urllib.request.urlopen(urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(q), headers=UA), timeout=30)
            return json.load(r)
        except Exception as e:                       # bị chặn / trang lỗi → chờ lâu dần
            time.sleep(4 * (i + 1)); err = e
    sys.exit(f'commons: {err}')


def info(title, w=1920):
    d = api(action='query', titles=title, prop='imageinfo', iiprop='url|extmetadata|size', iiurlwidth=w)
    ii = list(d['query']['pages'].values())[0].get('imageinfo', [None])[0]
    if not ii: return None
    em = ii['extmetadata']; strip = lambda s: re.sub(r'<[^>]+>', '', s or '').strip()
    return dict(title=title, lic=strip(em.get('LicenseShortName', {}).get('value')), artist=strip(em.get('Artist', {}).get('value'))[:80],
                url=ii.get('thumburl', ii['url']), size=[ii['width'], ii['height']])


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('cmd'); ap.add_argument('q'); ap.add_argument('out', nargs='?')
    ap.add_argument('--n', type=int, default=8); ap.add_argument('--w', type=int, default=1920); ap.add_argument('--any-license', action='store_true')
    a = ap.parse_args()
    if a.cmd == 'search':
        d = api(action='query', list='search', srsearch=a.q, srnamespace=6, srlimit=a.n)
        for x in d['query']['search']:
            time.sleep(1.2); i = info(x['title'], 400)
            if i: print(('✓ ' if OK.match(i['lic'] or '') else '✗ ') + f"{i['lic']:<22} {i['size'][0]}×{i['size'][1]}  {x['title']}")
    elif a.cmd == 'get':
        i = info(a.q, a.w)
        if not i: sys.exit('không có ảnh')
        if not OK.match(i['lic'] or '') and not a.any_license: sys.exit(f"giấy phép {i['lic']} — không phải PD/CC0 (thêm --any-license nếu đã hỏi người dùng)")
        out = Path(a.out); out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(urllib.request.urlopen(urllib.request.Request(i['url'], headers=UA), timeout=60).read())
        mf = out.parent / 'meta.json'; meta = json.loads(mf.read_text()) if mf.exists() else {}
        meta[out.stem] = {k: i[k] for k in ('title', 'lic', 'artist')}; mf.write_text(json.dumps(meta, indent=1, ensure_ascii=False))
        print(f"✓ {out} ({i['lic']})")


if __name__ == '__main__':
    main()
