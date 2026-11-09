#!/usr/bin/env python3
"""Tìm + tải ảnh CC0 / public domain qua Openverse (gom Flickr Commons, Wikimedia, rawpixel, Met, stocksnap…) — kho rộng hơn
Commons cho ảnh đời thật (xe cổ, phố, bệnh viện, vụ nổ). Chỉ cc0 + pdm (người dùng 2026-10-27: ưu tiên ảnh thật trên mạng
thay vì vẽ; giấy phép phải sạch như tiếng — PIPELINE §Hình).

    python3 tools/hist/openverse.py search "<từ khoá>" [--n 10]
    python3 tools/hist/openverse.py get <id> <out.jpg>          # ghi nguồn vào meta.json cạnh file
"""
import argparse, json, sys, time, urllib.parse, urllib.request
from pathlib import Path

UA = {'User-Agent': 'mascot-mv/1.0 (local research)'}
API = 'https://api.openverse.org/v1/images/'


def req(url):
    for i in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()
        except Exception as e: err = e; time.sleep(3 * (i + 1))
    sys.exit(f'openverse: {err}')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('cmd'); ap.add_argument('q'); ap.add_argument('out', nargs='?'); ap.add_argument('--n', type=int, default=10)
    a = ap.parse_args()
    if a.cmd == 'search':
        d = json.loads(req(API + '?' + urllib.parse.urlencode({'q': a.q, 'license': 'cc0,pdm', 'page_size': a.n})))
        for r in d['results']: print(f"{r['id']}  {r['license']:<4} {r.get('width')}×{r.get('height')}  {r['source']:<10} {r['title'][:70]}")
    elif a.cmd == 'get':
        r = json.loads(req(API + a.q + '/'))
        if r['license'] not in ('cc0', 'pdm'): sys.exit(f"giấy phép {r['license']}")
        out = Path(a.out); out.parent.mkdir(parents=True, exist_ok=True); out.write_bytes(req(r['url']))
        mf = out.parent / 'meta.json'; meta = json.loads(mf.read_text()) if mf.exists() else {}
        meta[out.stem] = {'title': r['title'], 'lic': r['license'], 'artist': r.get('creator'), 'source': r.get('foreign_landing_url')}
        mf.write_text(json.dumps(meta, indent=1, ensure_ascii=False)); print(f"✓ {out} ({r['license']}, {r['source']})")


if __name__ == '__main__':
    main()
