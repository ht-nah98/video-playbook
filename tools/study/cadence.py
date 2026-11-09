#!/usr/bin/env python3
"""Nhịp VẼ của video hoạt hình (docs/study/10-stick-fight.md): fps, % khung trùng khung trước (vẽ trên twos / giữ dáng),
cắt cảnh / phút, đoạn đứng yên, năng lượng chuyển động (trung bình |khác biệt| / khung, xám 192×108), giây mạnh nhất.

  python3 tools/study/cadence.py <video.mp4> [--roi x,y,w,h]

Cạnh pace.py (đứng yên theo 2 s): đây đo TỪNG KHUNG. Bẫy (LESSONS §152): trung bình cả khung bỏ sót nhân vật nhỏ trên
nền tĩnh — clip người que 230 px báo "76% khung trùng" dù vùng nhân vật đổi ở mọi khung. So nhân vật → --roi vùng nhân vật.
"""
import argparse, subprocess, json
import numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--roi', help='x,y,w,h theo pixel gốc')
o = ap.parse_args(); v = o.video
pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate,width,height', '-show_entries', 'format=duration', '-of', 'json', v], capture_output=True, text=True).stdout)
n_, d_ = pr['streams'][0]['r_frame_rate'].split('/'); fps = int(n_) / int(d_); dur = float(pr['format']['duration'])
W, H = 192, 108
crop = (lambda x, y, w, h: f'crop={w}:{h}:{x}:{y},')(*o.roi.split(',')) if o.roi else ''
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', v, '-vf', f'{crop}scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
prev = None; D = []
while True:
    b = p.stdout.read(W * H)
    if len(b) < W * H: break
    f = np.frombuffer(b, np.uint8).astype(np.int16)
    if prev is not None: D.append(np.abs(f - prev).mean())
    prev = f
D = np.array(D); N = len(D)
dup = D < 0.35                       # khung lặp (giữ hình)
cut = D > 40                         # cắt cảnh / loé sáng
sec = int(fps)
# cửa sổ có chuyển động: trung vị khác biệt 1 s > ngưỡng
act = np.array([np.median(D[max(0, i - sec // 2): i + sec // 2]) > 0.35 or D[max(0, i - sec // 2): i + sec // 2].max() > 3 for i in range(N)])
moving = ~dup
inact = dup[act]
# độ dài chuỗi khung lặp liên tiếp bên trong vùng chuyển động (1 = twos, 2 = threes)
runs = []; r = 0
for x in dup & act:
    if x: r += 1
    elif r: runs.append(r); r = 0
runs = np.array(runs) if runs else np.array([0])
# đoạn đứng yên dài (≥ 2 s toàn khung lặp)
still = []; s0 = None
for i, x in enumerate(dup):
    if x and s0 is None: s0 = i
    if not x and s0 is not None:
        if (i - s0) / fps >= 2: still.append(round((i - s0) / fps, 1))
        s0 = None
per = [D[i * sec:(i + 1) * sec].mean() for i in range(N // sec)]
top = sorted(range(len(per)), key=lambda i: -per[i])[:8]
print(json.dumps({
  'video': v.split('/')[-1], 'fps': round(fps, 3), 'dur': round(dur, 1),
  'dup_all_%': round(100 * dup.mean(), 1),
  'dup_in_action_%': round(100 * inact.mean(), 1) if len(inact) else None,
  'run_hist_in_action': {k: int((runs == k).sum()) for k in [1, 2, 3, 4]} | {'5+': int((runs >= 5).sum())},
  'cuts_per_min': round(cut.sum() / (N / fps / 60), 1), 'mean_shot_s': round((N / fps) / max(1, cut.sum()), 1),
  'still_runs_ge2s': len(still), 'longest_still_s': max(still) if still else 0,
  'motion_energy_mean': round(float(D.mean()), 2),
  'top_action_seconds': [f'{i // 60}:{i % 60:02d}' for i in sorted(top)],
}, ensure_ascii=False))
