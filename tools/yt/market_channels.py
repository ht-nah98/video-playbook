#!/usr/bin/env python3
"""Nghiên cứu thị trường theo KÊNH: tuổi, nhịp đăng, video vượt trội, SEO (tag, hashtag, title, mô tả). Chỉ dữ liệu công khai, Data API.
Dùng: tools/i18n/.venv/bin/python tools/yt/market_channels.py <file.json ra> @handle… (thêm UC… từ hunt-*.json nếu có)."""
import sys, json, re, pathlib
sys.path.insert(0, 'tools/yt')
import auth
yt = auth.clients('en', interactive=False)[0]
out = pathlib.Path(sys.argv[1]); seeds = sys.argv[2:]
ids = {}
for h in seeds:
    try:
        it = yt.channels().list(part='id', forHandle=h.lstrip('@')).execute().get('items', [])
        if it: ids[it[0]['id']] = h
        else: print('không thấy', h)
    except Exception as e: print('lỗi', h, str(e)[:80])
for f in pathlib.Path('analytics/market').glob('hunt-*.json'):
    vid = [r['id'] for r in json.load(open(f))]
    for i in range(0, len(vid), 50):
        for v in yt.videos().list(part='snippet', id=','.join(vid[i:i+50])).execute()['items']:
            ids.setdefault(v['snippet']['channelId'], 'hunt')
res = {}
for c, src in ids.items():
    ch = yt.channels().list(part='snippet,statistics,contentDetails', id=c).execute()['items'][0]
    up = ch['contentDetails']['relatedPlaylists']['uploads']; vids = []; tok = None
    while len(vids) < 200:
        try: p = yt.playlistItems().list(part='contentDetails', playlistId=up, maxResults=50, pageToken=tok).execute()
        except Exception: break
        vids += [i['contentDetails']['videoId'] for i in p['items']]; tok = p.get('nextPageToken')
        if not tok: break
    V = []
    for i in range(0, len(vids), 50):
        for v in yt.videos().list(part='snippet,statistics,contentDetails', id=','.join(vids[i:i+50])).execute()['items']:
            s, st = v['snippet'], v['statistics']
            V.append(dict(id=v['id'], t=s['title'], p=s['publishedAt'], d=v['contentDetails']['duration'], v=int(st.get('viewCount', 0)), l=int(st.get('likeCount', 0)), cm=int(st.get('commentCount', 0)), tags=s.get('tags', []), desc=s.get('description', ''), cat=s.get('categoryId'), lang=s.get('defaultAudioLanguage')))
    st = ch['statistics']
    res[c] = dict(src=src, name=ch['snippet']['title'], made=ch['snippet']['publishedAt'], subs=int(st.get('subscriberCount', 0)), views=int(st.get('viewCount', 0)), n=int(st.get('videoCount', 0)), country=ch['snippet'].get('country'), videos=V)
    print(ch['snippet']['title'], len(V), flush=True)
json.dump(res, open(out, 'w'), ensure_ascii=False)
