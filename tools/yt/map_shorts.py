#!/usr/bin/env python3
"""Ghép Short đã đăng → bài trong repo theo title trong projects/<p>/SHORTS.md → channels/<ch>/shorts.json {id: p}.

  python3 tools/yt/map_shorts.py en          # in bảng ghép + ghi file; Short không ghép được in ra để điền tay

Tách khỏi videos.json vì push.py cần mỗi bài trỏ MỘT video dài. Dùng snapshot mới nhất analytics/raw/<ch>/.
"""
import json, pathlib, re, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, ROOT


def norm(t):
    t = re.sub(r'#\w+', '', t)
    t = re.sub(r'\(\d+\)\s*$', '', t.strip())
    return re.sub(r'[^0-9a-zà-ỹ⁰-⁹π÷−×√]+', ' ', t.lower()).strip()


def main():
    ch = sys.argv[1] if len(sys.argv) > 1 else 'en'
    assert ch in CHANNELS
    titles = {}
    for f in (ROOT / 'projects').glob('*/*/SHORTS.md'):                 # projects/<kênh>/<bài>
        for line in f.read_text().splitlines():
            for cell in line.split('|'):
                n = norm(cell)
                if len(n) > 14:
                    titles[n] = str(f.parent.relative_to(ROOT / 'projects'))
    snap = sorted((ROOT / 'analytics' / 'raw' / ch).glob('20*'))[-1]
    out, miss = {}, []
    for v in json.loads((snap / 'videos.json').read_text()):
        t = v['snippet']['title']
        if '#short' not in (t + v['snippet'].get('description', '')).lower() and not re.search(r'PT[0-5]?\dS$|PT1M$', v['contentDetails']['duration']):
            continue
        n = norm(t)
        hit = titles.get(n) or next((p for k, p in titles.items() if n.startswith(k) or k.startswith(n)), None)
        (out.__setitem__(v['id'], hit) if hit else miss.append(t))
        print(f'{v["id"]}  {hit or "—":16} {t[:70]}')
    f = ROOT / 'channels' / ch / 'shorts.json'
    f.write_text(json.dumps(dict(sorted(out.items())), ensure_ascii=False, indent=1) + '\n')
    print(f'→ {f.relative_to(ROOT)}: {len(out)} ghép · {len(miss)} không ghép được')


if __name__ == '__main__':
    main()
