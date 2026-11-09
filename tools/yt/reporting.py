#!/usr/bin/env python3
"""Reporting API: impressions + CTR thumbnail (và các báo cáo hằng ngày) → analytics/raw/<ch>/reporting/ (CHỈ ĐỌC kênh).

  tools/i18n/.venv/bin/python tools/yt/reporting.py ja --create   # tạo job (bỏ qua job đã có) — chỉ cần một lần mỗi kênh
  tools/i18n/.venv/bin/python tools/yt/reporting.py ja            # tải mọi file mới (chạy hằng ngày: file chỉ giữ 60 ngày)
  tools/i18n/.venv/bin/python tools/yt/reporting.py ja --jobs     # liệt kê job

Job mới có 30 ngày lịch sử trước ngày tạo; file đầu tiên sau ~48 h. Backfill (file mới cùng khoảng ngày) lưu kèm id
nên không ghi đè — khi nạp, lấy file createTime mới nhất cho mỗi ngày. Chi tiết: docs/analytics/DATA.md §2.
"""
import argparse, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, ROOT, creds

TYPES = ('channel_reach_basic_a1',     # impressions, CTR theo ngày × video
         'channel_reach_combined_a1',  # … × nguồn traffic × thiết bị
         'channel_basic_a3')           # views, phút xem, sub… × đã/chưa sub × quốc gia


def service(ch):
    from googleapiclient.discovery import build
    c = creds(ch)
    yr = build('youtubereporting', 'v1', credentials=c, cache_discovery=False)
    return c, yr, {j['reportTypeId']: j for j in yr.jobs().list().execute().get('jobs', [])}


def create(ch):
    _, yr, jobs = service(ch)
    for t in TYPES:
        if t in jobs:
            print(f'  có rồi  {t}  (tạo {jobs[t]["createTime"][:10]})')
        else:
            j = yr.jobs().create(body={'reportTypeId': t, 'name': f'mascot-mv {t}'}).execute()
            print(f'  tạo     {t}  id {j["id"]}')


def download(ch):
    """Tải mọi file chưa có → analytics/raw/<ch>/reporting/<type>/<ngày>_<tạo>_<id>.csv. Trả số file mới."""
    from google.auth.transport.requests import AuthorizedSession
    c, yr, jobs = service(ch)
    sess, new = AuthorizedSession(c), 0
    for t, j in jobs.items():
        d = ROOT / 'analytics' / 'raw' / ch / 'reporting' / t
        d.mkdir(parents=True, exist_ok=True)
        tok = None
        while True:
            r = yr.jobs().reports().list(jobId=j['id'], pageToken=tok).execute()
            for rep in r.get('reports', []):
                f = d / f'{rep["startTime"][:10]}_{rep["createTime"][:10]}_{rep["id"]}.csv'
                if not f.exists():
                    resp = sess.get(rep['downloadUrl']); resp.raise_for_status()
                    f.write_bytes(resp.content); new += 1
            tok = r.get('nextPageToken')
            if not tok:
                break
    print(f'{ch}: reporting {new} file mới' + ('' if jobs else ' — chưa có job, chạy reporting.py <ch> --create'))
    return new


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('ch', choices=CHANNELS)
    ap.add_argument('--create', action='store_true')
    ap.add_argument('--jobs', action='store_true')
    a = ap.parse_args()
    if a.create:
        create(a.ch)
    if a.jobs or a.create:
        for t, j in service(a.ch)[2].items():
            print(f'{t:28} {j["id"]}  tạo {j["createTime"][:10]}')
        return
    download(a.ch)


if __name__ == '__main__':
    main()
