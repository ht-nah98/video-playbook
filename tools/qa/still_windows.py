#!/usr/bin/env python3
"""Find stretches where a video's picture barely changes (DNA `intro` §4: nothing holds longer than 0.5 s).

    python3 tools/qa/still_windows.py <video.mp4> [--win 0.5] [--thr 1.5] [--skip a-b,...]

Samples 20 fps at 192×108 grey; for each frame compares it with the frame `win` seconds later (mean |Δ| in 0..255).
Prints every run where that stays under `thr`, minus the --skip ranges (e.g. the intended quiet dip). Exit 1 if any.
"""
import argparse, subprocess, sys
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('--win', type=float, default=0.5); ap.add_argument('--thr', type=float, default=1.5)
ap.add_argument('--skip', default='')
a = ap.parse_args()
FPS, Wd, Hd = 20, 192, 108
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.video, '-vf', f'fps={FPS},scale={Wd}:{Hd},format=gray', '-f', 'rawvideo', '-'],
                     capture_output=True, check=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, Hd, Wd).astype(np.float32)
k = round(a.win * FPS)
d = np.abs(f[k:] - f[:-k]).mean(axis=(1, 2))
skips = [tuple(map(float, s.split('-'))) for s in a.skip.split(',') if s]
still = [(i / FPS) for i, x in enumerate(d) if x < a.thr and not any(s0 <= i / FPS <= s1 for s0, s1 in skips)]
runs, cur = [], None
for t in still:
    if cur and t - cur[1] <= 1.5 / FPS: cur[1] = t
    else:
        if cur: runs.append(cur)
        cur = [t, t]
if cur: runs.append(cur)
print(f'{a.video}: change over {a.win}s — median {np.median(d):.1f}, p10 {np.percentile(d, 10):.1f}, min {d.min():.1f}')
for s0, s1 in runs: print(f'  STILL {s0:.2f}–{s1 + a.win:.2f} s')
print('OK: no still stretch' if not runs else f'{len(runs)} still stretch(es)')
sys.exit(1 if runs else 0)
