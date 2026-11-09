#!/usr/bin/env python3
"""Kéo video công khai của các kênh đối thủ (Data API, CHỈ ĐỌC, token kênh en) → out/hist/market/raw/<ngày>/.

    tools/i18n/.venv/bin/python tools/hist/market/pull.py [--months 24] [--max 250] [--only @OverSimplified …]

Danh sách kênh: channels/hist/market/rivals.json [{handle, group}] (group: niche = hoạt hình / kể sử hài tiếng Anh, adjacent =
địa chính trị / tài liệu). Mỗi kênh: channels.list forHandle (1 đơn vị) → uploads playlist (1 / 50 video) → videos.list (1 / 50).
Không search.list (100 đơn vị). Ghi videos.json (nguyên số + ngày chụp) để snapshot sau so tốc độ — không ghi đè ngày cũ.
"""
import argparse, datetime, json, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2] / 'yt'))
from auth import ROOT, clients
from googleapiclient.errors import HttpError

RIVALS = ROOT / 'channels' / 'hist' / 'market' / 'rivals.json'


def chunks(xs, n=50):
    for i in range(0, len(xs), n):
        yield xs[i:i + n]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--months', type=int, default=24); ap.add_argument('--max', type=int, default=250)
    ap.add_argument('--only', nargs='*')
    a = ap.parse_args()
    yt, _ = clients('en', interactive=False)
    today = datetime.date.today().isoformat()
    since = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=30.5 * a.months)).isoformat()
    out = ROOT / 'out' / 'hist' / 'market' / 'raw' / today; out.mkdir(parents=True, exist_ok=True)
    rivals = json.loads(RIVALS.read_text())
    if a.only: rivals = [r for r in rivals if r['handle'] in a.only]
    chans, vids, miss = {}, {}, []
    for r in rivals:
        it = yt.channels().list(part='snippet,statistics,contentDetails', forHandle=r['handle']).execute().get('items')
        if not it: miss.append(r['handle']); continue
        c = it[0]; cid = c['id']
        chans[cid] = {'handle': r['handle'], 'group': r['group'], 'title': c['snippet']['title'],
                      'created': c['snippet']['publishedAt'], 'subs': int(c['statistics'].get('subscriberCount', 0)),
                      'videos': int(c['statistics'].get('videoCount', 0)), 'views': int(c['statistics'].get('viewCount', 0))}
        ids, tok = [], None
        up = c['contentDetails']['relatedPlaylists']['uploads']
        while len(ids) < a.max:
            try:
                res = yt.playlistItems().list(part='contentDetails', playlistId=up, maxResults=50, pageToken=tok).execute()
            except HttpError:  # kênh không có video công khai (handle trỏ nhầm kênh rỗng)
                break
            got = [x['contentDetails'] for x in res['items']]
            ids += [g['videoId'] for g in got if g.get('videoPublishedAt', '9') >= since]
            tok = res.get('nextPageToken')
            if not tok or (got and got[-1].get('videoPublishedAt', '9') < since): break
        for ch in chunks(ids[:a.max]):
            for v in yt.videos().list(part='snippet,statistics,contentDetails', id=','.join(ch)).execute()['items']:
                s, st = v['snippet'], v['statistics']
                vids[v['id']] = {'channel': cid, 'title': s['title'], 'published': s['publishedAt'],
                                 'duration': v['contentDetails']['duration'], 'views': int(st.get('viewCount', 0)),
                                 'likes': int(st.get('likeCount', 0)) if 'likeCount' in st else None,
                                 'comments': int(st.get('commentCount', 0)) if 'commentCount' in st else None,
                                 'thumb': (s['thumbnails'].get('maxres') or s['thumbnails'].get('high') or {}).get('url')}
        print(f"{r['handle']:28} {chans[cid]['subs']:>10,} sub  {len(ids):>4} video", flush=True)
    (out / 'channels.json').write_text(json.dumps(chans, ensure_ascii=False, indent=1))
    (out / 'videos.json').write_text(json.dumps({'snapshot': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                                                 'videos': vids}, ensure_ascii=False, indent=1))
    print(f'✓ {out} — {len(chans)} kênh, {len(vids)} video' + (f'; không thấy: {" ".join(miss)}' if miss else ''))


if __name__ == '__main__':
    main()
