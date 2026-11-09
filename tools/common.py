#!/usr/bin/env python3
"""Phần dùng chung của các công cụ Python: ROOT (gốc repo) và duration (ffprobe).

Dùng: thêm tools/ vào sys.path rồi `from common import ROOT, duration`
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))   # script nằm trong tools/<nhóm>/
"""
import subprocess
from pathlib import Path

from config import REPO as ROOT   # noqa: F401  (re-export)


def duration(path, default=None):
    """Thời lượng (giây) của file media theo ffprobe format=duration.
    default=None: ffprobe lỗi thì ném CalledProcessError. default=x: ffprobe không in gì thì trả x."""
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                       capture_output=True, text=True, check=default is None)
    return float(r.stdout or default)
