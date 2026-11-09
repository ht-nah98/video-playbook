#!/usr/bin/env python3
"""Đường dẫn NGOÀI repo — một chỗ duy nhất. Đổi máy: đặt biến môi trường, không sửa code.

    MASCOT_HKT          hkt-project (giọng OmniVoice qua src/hkt/voice, intro work/brand/intro.mp4)
                        mặc định: thư mục hkt-project NẰM CẠNH repo này
    MASCOT_ANALYSIS_PY  python của venv phân tích (Demucs, torch, MMS_FA, whisper) — tools/analyze, tools/voice/align.py
                        mặc định: studio3d/analysis/.venv trong repo (dựng theo tools/analyze/requirements.lock.txt)

Python: `from config import HKT, ANALYSIS_PY, expand` (thêm tools/ vào sys.path).
Shell:  `python3 tools/config.py hkt|analysis_py` in ra giá trị.
"""
import os, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
HKT = Path(os.environ.get('MASCOT_HKT', REPO.parent / 'hkt-project'))
ANALYSIS_PY = Path(os.environ.get('MASCOT_ANALYSIS_PY', REPO / 'studio3d/analysis/.venv/bin/python'))


def expand(s):
    """'${REPO}/out/en/intro/intro.mp4' | '${HKT}/…' → đường dẫn thật (build.json "intro"). Chuỗi tuyệt đối giữ nguyên."""
    return str(s).replace('${HKT}', str(HKT)).replace('${REPO}', str(REPO)) if s is not None else None


if __name__ == '__main__':
    if sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); sys.exit(0)
    vals = {'hkt': HKT, 'analysis_py': ANALYSIS_PY}
    if len(sys.argv) != 2 or sys.argv[1] not in vals: sys.exit('dùng: python3 tools/config.py hkt|analysis_py')
    print(vals[sys.argv[1]])
