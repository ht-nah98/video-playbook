#!/usr/bin/env python3
"""Lệnh hằng ngày: mọi kênh đã có token → pull (Analytics API) + reporting (impressions/CTR) → dựng lại sqlite.

  tools/i18n/.venv/bin/python tools/yt/sync.py            # mọi kênh có token
  tools/i18n/.venv/bin/python tools/yt/sync.py ja         # một kênh

CHỈ ĐỌC YouTube. Kênh chưa có token bị bỏ qua (đăng nhập: stats.py --ch <ch> --login).
"""
import argparse, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from auth import CHANNELS, has_token
import db, pull, reporting


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('channels', nargs='*', choices=CHANNELS)
    chs = ap.parse_args().channels or CHANNELS
    for ch in chs:
        if not has_token(ch):
            print(f'{ch}: chưa có token — bỏ qua'); continue
        pull.pull(ch)
        reporting.download(ch)
    db.build()


if __name__ == '__main__':
    main()
