"""Quét stem (Suno xuất 12 stem .wav vào projects/<p>/audio/stems/): offset so với mix, stem nào có tiếng, hoạt
động từng stem theo thời gian (RMS 100fps, chuẩn hoá theo đỉnh) → projects/<p>/data/stems.json.
Đây là nguồn của MỐC NHẠC CỤ (cú drop, ka-ching, mỗi cú percussion một nét bút) — không có trong lời.

  python3 tools/analyze/stems.py projects/<p>
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, wave, sys
import numpy as np
from pathlib import Path
P = Path(sys.argv[1]).resolve(); S = P / "audio/stems"
def load(p):
    f = wave.open(str(p)); sr = f.getframerate(); ch = f.getnchannels()
    x = np.frombuffer(f.readframes(f.getnframes()), np.int16).astype(np.float32).reshape(-1, ch).mean(1) / 32768
    return x, sr
names = sorted(p.stem for p in S.glob("*.wav"))
X = {}; sr = None
for n in names: X[n], sr = load(S / f"{n}.wav")
hop = sr // 100
def env(x): 
    n = len(x) // hop; return np.sqrt((x[:n*hop].reshape(n, hop) ** 2).mean(1))
E = {n: env(X[n]) for n in names}
# offset: tổng stem vs mix đã giải mã (44.1k) — so bằng đường bao
import subprocess
song = next((P / "audio" / f"song.{e}" for e in ("m4a", "mp3", "wav") if (P / "audio" / f"song.{e}").exists()), None)
if song is None: sys.exit(f"không thấy {P}/audio/song.(m4a|mp3|wav)")
mix = subprocess.run(["ffmpeg","-v","error","-i",str(song),"-ac","1","-ar",str(sr),"-f","s16le","-"],capture_output=True,check=True).stdout
m = np.frombuffer(mix, np.int16).astype(np.float32) / 32768; Em = env(m)
tot = sum(E.values()); L = min(len(tot), len(Em))
a = (tot[:L] - tot[:L].mean()); b = (Em[:L] - Em[:L].mean())
c = [np.dot(a[max(0,k):L+min(0,k)], b[max(0,-k):L-max(0,k)]) for k in range(-50, 51)]
print("offset stem→mix (10ms bước):", np.argmax(c) - 50)
out = {"fps": 100, "stems": {}}
for n in names:
    e = E[n]; pk = e.max()
    act = e > max(0.01, 0.08 * pk)
    # đoạn hoạt động ≥ 0.5s, gộp khe < 0.4s
    segs = []; i = 0
    while i < len(act):
        if act[i]:
            j = i
            while j < len(act) and (act[j] or (act[j:j+40].any())): j += 1
            if (j - i) >= 50: segs.append([round(i/100, 2), round(j/100, 2)])
            i = j
        else: i += 1
    out["stems"][n] = {"peak": round(float(pk), 4), "active_s": round(float(act.mean()*len(act)/100), 1),
                        "segments": segs, "env": [round(float(v/pk if pk else 0), 3) for v in e]}
    print(f"{n:15s} đỉnh {pk:.3f}  hoạt động {act.mean()*len(act)/100:6.1f}s  {len(segs)} đoạn  " + " ".join(f"{s:.0f}-{e_:.0f}" for s, e_ in segs[:12]))
json.dump(out, open(P / "data/stems.json", "w"))
