#!/usr/bin/env python3
"""Đọc số liệu thật của kênh qua YouTube Analytics API (CHỈ ĐỌC, không ghi gì lên YouTube).

  tools/i18n/.venv/bin/python tools/yt/stats.py --ch ja --login         # đăng nhập kênh (chọn đúng kênh ở trang Google)
  tools/i18n/.venv/bin/python tools/yt/stats.py --ch ja                 # bảng mọi video: views, xem TB, % xem, nguồn
  tools/i18n/.venv/bin/python tools/yt/stats.py --ch ja VIDEO_ID        # một video: theo ngày + nguồn + đường giữ chân
  tools/i18n/.venv/bin/python tools/yt/stats.py --ch en --remote        # link cấp quyền cho CHỦ KÊNH ở máy khác
  tools/i18n/.venv/bin/python tools/yt/stats.py --ch en --remote-finish 'http://localhost:8790/?state=…&code=…'

Token mỗi kênh một file: ~/.config/mascot-mv/youtube-token-<ch>.json (ngoài repo, không commit).
"""
import argparse, datetime, pathlib, re, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, clients


def q(ya, **kw):
    r = ya.reports().query(ids='channel==MINE', **kw).execute()
    cols = [h['name'] for h in r['columnHeaders']]
    return [dict(zip(cols, row)) for row in r.get('rows', [])]


def mmss(s):
    return f'{int(s) // 60}:{int(s) % 60:02d}'


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('video', nargs='?')
    ap.add_argument('--ch', required=True, choices=CHANNELS)
    ap.add_argument('--login', action='store_true')
    ap.add_argument('--remote', action='store_true', help='in link cấp quyền cho CHỦ KÊNH ở máy khác')
    ap.add_argument('--remote-finish', metavar='URL', help='địa chỉ localhost:8790/?code=… chủ kênh gửi lại')
    a = ap.parse_args()
    if a.remote:
        import auth
        print('Gửi link này cho chủ kênh (đăng nhập bằng Gmail CHỦ kênh, bấm Cho phép; trang localhost không mở được là bình thường —')
        print('copy NGUYÊN địa chỉ trang đó gửi lại trong 10 phút):\n')
        print(auth.remote_start(a.ch)); return
    if a.remote_finish:
        import auth
        print(f'✓ Đã lưu token kênh "{auth.remote_finish(a.ch, a.remote_finish)}"'); return
    yt, ya = clients(a.ch)
    ch = yt.channels().list(part='snippet,contentDetails,statistics', mine=True).execute()['items'][0]
    st = ch['statistics']
    print(f'Kênh: {ch["snippet"]["title"]} · {st.get("subscriberCount")} sub · {st["videoCount"]} video · {st["viewCount"]} view')
    if a.login:
        return
    up = ch['contentDetails']['relatedPlaylists']['uploads']
    vids, tok = [], None
    while True:
        r = yt.playlistItems().list(part='snippet', playlistId=up, maxResults=50, pageToken=tok).execute()
        vids += [(i['snippet']['resourceId']['videoId'], i['snippet']['publishedAt'][:10], i['snippet']['title']) for i in r['items']]
        tok = r.get('nextPageToken')
        if not tok:
            break
    meta = {}
    for i in range(0, len(vids), 50):
        for v in yt.videos().list(part='contentDetails,status', id=','.join(x[0] for x in vids[i:i + 50])).execute()['items']:
            meta[v['id']] = v
    start = min(x[1] for x in vids) if vids else '2020-01-01'
    end = datetime.date.today().isoformat()

    if not a.video:
        rows = {r['video']: r for r in q(ya, startDate=start, endDate=end, dimensions='video', sort='-views', maxResults=200,
                metrics='views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,subscribersGained')}
        print(f'\n{"id":11}  {"đăng":10}  {"dài":>5} {"views":>6} {"xem TB":>6} {"%xem":>5} {"+sub":>4}  title')
        for vid, d, t in sorted(vids, key=lambda x: x[1]):
            r = rows.get(vid, {}); m = meta.get(vid, {})
            dur = m.get('contentDetails', {}).get('duration', '')
            mm = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', dur)
            sec = sum(int(g or 0) * k for g, k in zip(mm.groups(), (3600, 60, 1))) if mm else 0
            flag = '' if m.get('status', {}).get('privacyStatus') == 'public' else f' [{m.get("status", {}).get("privacyStatus")}]'
            print(f'{vid}  {d}  {mmss(sec):>5} {r.get("views", 0):>6} {mmss(r.get("averageViewDuration", 0)):>6}'
                  f' {r.get("averageViewPercentage", 0):>5.1f} {r.get("subscribersGained", 0):>4}  {t[:60]}{flag}')
        print('\nNguồn view theo video:')
        for vid, d, t in sorted(vids, key=lambda x: x[1]):
            src = q(ya, startDate=start, endDate=end, dimensions='insightTrafficSourceType', filters=f'video=={vid}',
                    metrics='views,averageViewDuration', sort='-views')
            print(f'  {vid}: ' + ' · '.join(f'{s["insightTrafficSourceType"]} {s["views"]} ({mmss(s["averageViewDuration"])})' for s in src))
        return

    vid = a.video
    d0 = next((x[1] for x in vids if x[0] == vid), start)
    print(f'\n{vid} — theo ngày (views · phút xem · xem TB):')
    for r in q(ya, startDate=d0, endDate=end, dimensions='day', filters=f'video=={vid}', sort='day',
               metrics='views,estimatedMinutesWatched,averageViewDuration'):
        if r['views']:
            print(f'  {r["day"]}  {r["views"]:>5}  {r["estimatedMinutesWatched"]:>6}  {mmss(r["averageViewDuration"])}')
    print('\nNguồn:')
    for s in q(ya, startDate=d0, endDate=end, dimensions='insightTrafficSourceType', filters=f'video=={vid}',
               metrics='views,averageViewDuration,averageViewPercentage', sort='-views'):
        print(f'  {s["insightTrafficSourceType"]:24} {s["views"]:>5}  {mmss(s["averageViewDuration"])}  {s["averageViewPercentage"]:.1f}%')
    print('\nĐường giữ chân (tỷ lệ thời lượng → % người còn xem · so với video cùng độ dài):')
    for r in q(ya, startDate=d0, endDate=end, dimensions='elapsedVideoTimeRatio', filters=f'video=={vid};audienceType==ORGANIC',
               metrics='audienceWatchRatio,relativeRetentionPerformance'):
        x = r['elapsedVideoTimeRatio']
        if round(x * 100) % 5 == 0 or x <= 0.1:
            print(f'  {x:5.2f}  {r["audienceWatchRatio"] * 100:6.1f}%  rel {r["relativeRetentionPerformance"]:.2f}')


if __name__ == '__main__':
    main()
