#!/usr/bin/env python3
"""Kéo số liệu kênh qua API → analytics/raw/<ch>/<YYYY-MM-DD>/ (CHỈ ĐỌC YouTube; nguyên văn API, không sửa).

  tools/i18n/.venv/bin/python tools/yt/pull.py ja          # toàn bộ lịch sử kênh, một ảnh chụp hôm nay
  tools/i18n/.venv/bin/python tools/yt/pull.py ja en       # nhiều kênh

Mỗi lần chạy ghi đè thư mục của ngày hôm nay. Nạp vào sqlite: tools/yt/db.py. Kế hoạch: docs/analytics/PLAN.md.
"""
import argparse, datetime, json, pathlib, sys, time

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, ROOT, clients

RAW = ROOT / 'analytics' / 'raw'
DETAIL = ('YT_SEARCH', 'RELATED_VIDEO', 'EXT_URL', 'YT_CHANNEL')  # PLAYLIST: API 400  # nguồn có chi tiết (từ khoá, video dẫn tới…)


def query(ya, **kw):
    """Một báo cáo Analytics → {'cols': [...], 'rows': [...]} hoặc {'error': ...} (báo cáo không áp dụng / ít dữ liệu)."""
    for attempt in range(3):  # Google hay trả 500 tạm thời → thử lại; lỗi 4xx (báo cáo không hỗ trợ) thì thôi
        try:
            r = ya.reports().query(ids='channel==MINE', **kw).execute()
            return {'query': kw, 'cols': [h['name'] for h in r['columnHeaders']], 'rows': r.get('rows', [])}
        except Exception as e:  # noqa: BLE001
            err = str(e)[:300]
            if 'HttpError 5' not in err or attempt == 2:
                return {'query': kw, 'error': err}
            time.sleep(2 * (attempt + 1))


def videos(yt):
    ch = yt.channels().list(part='snippet,contentDetails,statistics', mine=True).execute()['items'][0]
    up, ids, tok = ch['contentDetails']['relatedPlaylists']['uploads'], [], None
    while True:
        r = yt.playlistItems().list(part='contentDetails', playlistId=up, maxResults=50, pageToken=tok).execute()
        ids += [i['contentDetails']['videoId'] for i in r['items']]
        tok = r.get('nextPageToken')
        if not tok:
            break
    items = []
    for i in range(0, len(ids), 50):
        items += yt.videos().list(part='snippet,contentDetails,status,statistics,localizations',
                                  id=','.join(ids[i:i + 50])).execute()['items']
    return ch, items


def thumbs(ch_id, items, today):
    """Thumbnail ĐANG hiện trên YouTube (API, bản lớn nhất) → analytics/raw/<ch>/thumbs/<id>/<sha8>.jpg + history.json.
    Đổi thumbnail (A/B, sửa tay) → file mới, ngày thấy đầu tiên được ghi lại."""
    import hashlib, urllib.request
    for v in items:
        t = v['snippet']['thumbnails']
        url = next(t[k]['url'] for k in ('maxres', 'standard', 'high', 'medium', 'default') if k in t)
        try:
            data = urllib.request.urlopen(url, timeout=20).read()
        except OSError as e:
            print(f'  thumbnail {v["id"]}: {e}'); continue
        d = RAW / ch_id / 'thumbs' / v['id']; d.mkdir(parents=True, exist_ok=True)
        sha = hashlib.sha1(data).hexdigest()[:8]
        hist = json.loads((d / 'history.json').read_text()) if (d / 'history.json').exists() else []
        if not (d / f'{sha}.jpg').exists():
            (d / f'{sha}.jpg').write_bytes(data)
        if not hist or hist[-1]['sha'] != sha:
            hist.append({'sha': sha, 'first_seen': today, 'title': v['snippet']['title']})
        hist[-1]['last_seen'] = today
        (d / 'history.json').write_text(json.dumps(hist, ensure_ascii=False, indent=1))


def pull(ch_id):
    yt, ya = clients(ch_id)
    ch, items = videos(yt)
    today = datetime.date.today().isoformat()
    out = RAW / ch_id / today
    out.mkdir(parents=True, exist_ok=True)
    w = lambda name, obj: (out / f'{name}.json').write_text(json.dumps(obj, ensure_ascii=False, indent=1))
    w('channel', ch); w('videos', items)
    start = min((v['snippet']['publishedAt'][:10] for v in items), default=today)
    span = dict(startDate=start, endDate=today)
    m_core = 'views,engagedViews,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,comments,shares,subscribersGained,subscribersLost'

    # cấp kênh
    w('ch_daily', query(ya, **span, dimensions='day', metrics=m_core, sort='day'))
    w('ch_daily_source', query(ya, **span, dimensions='day,insightTrafficSourceType', metrics='views,estimatedMinutesWatched', sort='day'))
    w('ch_daily_type', query(ya, **span, dimensions='day,creatorContentType', metrics='views,estimatedMinutesWatched', sort='day'))
    w('ch_daily_playback', query(ya, **span, dimensions='day,insightPlaybackLocationType', metrics='views,estimatedMinutesWatched', sort='day'))
    w('ch_os', query(ya, **span, dimensions='operatingSystem', metrics='views,estimatedMinutesWatched', sort='-views'))
    for s_, name in (('YT_SEARCH', 'ch_search'), ('RELATED_VIDEO', 'ch_related'), ('EXT_URL', 'ch_ext')):
        w(name, query(ya, **span, dimensions='insightTrafficSourceDetail', filters=f'insightTrafficSourceType=={s_}',
                      metrics='views,estimatedMinutesWatched', sort='-views', maxResults=25))
    w('ch_country', query(ya, **span, dimensions='country', metrics='views,estimatedMinutesWatched,averageViewDuration', sort='-views', maxResults=50))
    w('ch_playback', query(ya, **span, dimensions='insightPlaybackLocationType', metrics='views,estimatedMinutesWatched'))
    w('ch_device', query(ya, **span, dimensions='deviceType', metrics='views,estimatedMinutesWatched,averageViewDuration'))
    w('ch_demo', query(ya, **span, dimensions='ageGroup,gender', metrics='viewerPercentage'))

    # từng video
    vd = out / 'video'; vd.mkdir(exist_ok=True)
    for v in items:
        vid = v['id']
        f = {'filters': f'video=={vid}', 'startDate': v['snippet']['publishedAt'][:10], 'endDate': today}
        rep = {
            # tổng do YouTube tính: averageViewDuration KHÔNG chia cho lượt tự phát trang chủ — đừng tự chia phút/views
            'total': query(ya, **f, metrics=m_core),
            'daily': query(ya, **f, dimensions='day', metrics=m_core, sort='day'),
            'daily_playback': query(ya, **f, dimensions='day,insightPlaybackLocationType', metrics='views,estimatedMinutesWatched', sort='day'),
            'daily_source': query(ya, **f, dimensions='day,insightTrafficSourceType', metrics='views,estimatedMinutesWatched', sort='day'),
            'source': query(ya, **f, dimensions='insightTrafficSourceType', metrics='views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage', sort='-views'),
            'country': query(ya, **f, dimensions='country', metrics='views,averageViewDuration', sort='-views', maxResults=25),
            'device': query(ya, **f, dimensions='deviceType', metrics='views,averageViewDuration'),
            # BROWSE = autoplay trên trang chủ (views rất ngắn) ≠ WATCH (bấm vào) — docs/analytics/DATA.md §4
            'playback': query(ya, **f, dimensions='insightPlaybackLocationType', metrics='views,estimatedMinutesWatched'),
            'retention': query(ya, **{**f, 'filters': f'video=={vid};audienceType==ORGANIC'}, dimensions='elapsedVideoTimeRatio',
                               metrics='audienceWatchRatio,relativeRetentionPerformance'),
        }
        srcs = [r[0] for r in rep['source'].get('rows', [])]
        for s in DETAIL:
            if s in srcs:
                rep[f'detail_{s}'] = query(ya, **{**f, 'filters': f'video=={vid};insightTrafficSourceType=={s}'},
                                           dimensions='insightTrafficSourceDetail', metrics='views,estimatedMinutesWatched',
                                           sort='-views', maxResults=25)
        (vd / f'{vid}.json').write_text(json.dumps(rep, ensure_ascii=False, indent=1))
    thumbs(ch_id, items, today)
    # tên + kênh của video NGOÀI dẫn người xem tới (RELATED_VIDEO) — API chỉ trả id
    own = {v['id'] for v in items}
    ext = set()
    for f_ in [out / 'ch_related.json', *vd.glob('*.json')]:
        rep = json.loads(f_.read_text())
        for r in (rep.get('detail_RELATED_VIDEO', {}) if f_.parent == vd else rep).get('rows', []):
            if r[0] not in own:
                ext.add(r[0])
    info = {}
    for i in range(0, len(ext), 50):
        for v in yt.videos().list(part='snippet,statistics', id=','.join(sorted(ext)[i:i + 50])).execute().get('items', []):
            info[v['id']] = {'title': v['snippet']['title'], 'channel': v['snippet']['channelTitle'],
                             'views': int(v['statistics'].get('viewCount', 0)), 'thumb': v['snippet']['thumbnails'].get('medium', {}).get('url')}
    w('ext_videos', info)
    errs = sum('error' in r for p in vd.glob('*.json') for r in json.loads(p.read_text()).values())
    print(f'{ch_id}: {ch["snippet"]["title"]} · {len(items)} video · {start}→{today} → {out.relative_to(ROOT)}'
          f'{f" · {errs} báo cáo không có dữ liệu" if errs else ""}')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('channels', nargs='+', choices=CHANNELS)
    for c in ap.parse_args().channels:
        pull(c)


if __name__ == '__main__':
    main()
