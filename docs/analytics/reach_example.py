#!/usr/bin/env python3
"""Ví dụ tối giản: lấy thumbnail impressions + CTR theo video từ YouTube Reporting API.

  pip install google-api-python-client google-auth google-auth-oauthlib requests
  python3 reach_example.py token.json            # lần đầu tạo job nếu chưa có, in tổng theo video

token.json: OAuth token của tài khoản chủ kênh, scope yt-analytics.readonly. Hướng dẫn: CTR-IMPRESSIONS-API.md
"""
import csv, io, sys
from collections import defaultdict
from google.auth.transport.requests import AuthorizedSession
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

REPORT = 'channel_reach_basic_a1'
creds = Credentials.from_authorized_user_file(sys.argv[1])
api = build('youtubereporting', 'v1', credentials=creds, cache_discovery=False)
jobs = {j['reportTypeId']: j for j in api.jobs().list().execute().get('jobs', [])}
if REPORT not in jobs:
    api.jobs().create(body={'reportTypeId': REPORT, 'name': REPORT}).execute()
    sys.exit('Đã tạo job. Báo cáo đầu tiên có trong vòng 48 giờ, chạy lại sau.')

reports, token = [], None
while True:
    page = api.jobs().reports().list(jobId=jobs[REPORT]['id'], pageToken=token).execute()
    reports += page.get('reports', [])
    token = page.get('nextPageToken')
    if not token:
        break

# Một ngày có thể có nhiều báo cáo (backfill): chỉ giữ báo cáo tạo sau cùng của mỗi ngày.
latest = {}
for r in sorted(reports, key=lambda r: r['createTime']):
    latest[r['startTime']] = r
sess, totals = AuthorizedSession(creds), defaultdict(lambda: [0, 0.0])
for r in latest.values():
    resp = sess.get(r['downloadUrl'])
    resp.raise_for_status()
    for row in csv.DictReader(io.StringIO(resp.text)):
        n = int(float(row['video_thumbnail_impressions'] or 0))
        totals[row['video_id']][0] += n
        totals[row['video_id']][1] += n * float(row['video_thumbnail_impressions_ctr'] or 0)  # CTR là phân số 0–1

for vid, (n, clicks) in sorted(totals.items(), key=lambda x: -x[1][0]):
    print(f'{vid}  impressions {n:>7}  ctr {100 * clicks / n if n else 0:5.2f}%')
