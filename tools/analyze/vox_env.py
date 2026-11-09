"""Đường bao giọng hát cho hát nhép → projects/<tên>/data/vox.json  ({fps, t0, q: 0..255 mỗi khung}).

Năng lượng dải 300–3400 Hz của stem lead-vocals (không đo RMS toàn dải — ghi nhớ
"đo giọng, không đo RMS"), cửa sổ 2048 mẫu căn giữa mỗi khung 1/60s. Chuẩn hoá theo
phân vị của các khung có giọng: p15 → 0, p92 → 1. Làm mượt 3 khung để miệng không nháy.
Chạy một lần; engine chỉ đọc file → vẫn tất định.

Dùng: python3 tools/analyze/vox_env.py projects/mv/exp-log
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, sys
from pathlib import Path
import numpy as np
import soundfile as sf

proj = Path(sys.argv[1]); fps = 60
x, sr = sf.read(proj / "audio/stems/lead-vocals.wav", dtype="float32")
if x.ndim > 1: x = x.mean(1)
N = 2048; win = np.hanning(N); f = np.fft.rfftfreq(N, 1 / sr); band = (f >= 300) & (f <= 3400)
n = int(len(x) / sr * fps)
e = np.zeros(n)
pad = np.pad(x, (N // 2, N // 2))
for i in range(n):
    c = int(i / fps * sr)
    seg = pad[c:c + N] * win
    e[i] = np.sqrt(np.sum(np.abs(np.fft.rfft(seg))[band] ** 2) / N)
db = 20 * np.log10(e + 1e-7)
voiced = db[db > np.percentile(db, 30)]
lo, hi = np.percentile(voiced, 15), np.percentile(voiced, 92)
lv = np.clip((db - lo) / (hi - lo), 0, 1)
lv = np.convolve(lv, np.ones(3) / 3, mode="same")
q = np.round(lv * 255).astype(int).tolist()
(proj / "data/vox.json").write_text(json.dumps({"fps": fps, "t0": 0, "src": "lead-vocals 300–3400Hz",
                                                 "lo_db": round(float(lo), 1), "hi_db": round(float(hi), 1), "q": q}, separators=(",", ":")))
print(f"vox.json: {n} khung, lo {lo:.1f} dB, hi {hi:.1f} dB")
