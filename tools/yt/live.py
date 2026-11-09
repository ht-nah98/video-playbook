#!/usr/bin/env python3
"""Chụp bộ đếm CÔNG KHAI (Data API: views, like, comment) mọi video của mọi kênh có token → analytics/raw/<ch>/live/<YYYY-MM>.jsonl.

  tools/i18n/.venv/bin/python tools/yt/live.py       # cron mỗi giờ (crontab: tools/yt/live.cron)

Vì sao: Analytics API trễ ~2 ngày; Studio Realtime không có API. Hiệu giữa hai lần chụp = views theo giờ của 48 h đầu
video mới. Chỉ là bộ đếm công khai (gồm cả lượt tự phát) — số chi tiết vẫn lấy từ pull.py khi có. ~2 đơn vị hạn mức /
kênh / lần. CHỈ ĐỌC; không bao giờ mở trình duyệt (token hết hạn → ghi lỗi, bỏ qua kênh).
"""
import datetime, json, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, ROOT, clients, has_token


def snap(ch):
    yt, _ = clients(ch, interactive=False)
    up = yt.channels().list(part='contentDetails', mine=True).execute()['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    ids, tok = [], None
    while True:
        r = yt.playlistItems().list(part='contentDetails', playlistId=up, maxResults=50, pageToken=tok).execute()
        ids += [i['contentDetails']['videoId'] for i in r['items']]
        tok = r.get('nextPageToken')
        if not tok:
            break
    ts = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='minutes')
    out = ROOT / 'analytics' / 'raw' / ch / 'live' / f'{ts[:7]}.jsonl'
    out.parent.mkdir(parents=True, exist_ok=True)
    n = 0
    with out.open('a') as f:
        for i in range(0, len(ids), 50):
            for v in yt.videos().list(part='statistics', id=','.join(ids[i:i + 50])).execute()['items']:
                s = v['statistics']
                f.write(json.dumps({'ts': ts, 'id': v['id'], 'views': int(s.get('viewCount', 0)),
                                    'likes': int(s.get('likeCount', 0)), 'comments': int(s.get('commentCount', 0))}) + '\n')
                n += 1
    return ts, n


def main():
    for ch in CHANNELS:
        if not has_token(ch):
            continue
        try:
            ts, n = snap(ch)
            print(f'{ts} {ch}: {n} video')
        except Exception as e:  # noqa: BLE001 — một kênh lỗi không chặn kênh khác
            print(f'{datetime.datetime.now().isoformat(timespec="minutes")} {ch}: LỖI {str(e)[:200]}')


if __name__ == '__main__':
    main()
