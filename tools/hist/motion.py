#!/usr/bin/env python3
"""Đo độ giàu hình của video đã render (LESSONS §238): % thời lượng gần đứng yên, số lần đổi hình mạnh, % khung nền phẳng, đoạn 15 s tệ nhất.

    python3 tools/hist/motion.py out/hist/<tập>/<tập>.mp4

Thêm: liệt kê cú máy < 1 s sau trailer (LESSONS §242) — hình chớp qua dễ thành "lỗi edit"; xem từng chỗ, cắt có chủ đích thì giữ.
Số chỉ để tìm chỗ cần xem; cảnh nhiều chuyển động vẫn có thể vô nghĩa — nhìn cả clip (AGENTS luật 3).
Tham chiếu: hitler 54% / 44% nền phẳng (bị chê); berlin-v3 19% / 5% (người dùng chọn, 2026-11-02).
"""
import re, subprocess, sys
import numpy as np
if len(sys.argv) != 2 or sys.argv[1] in ('-h', '--help'): sys.exit(__doc__)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-vf', 'fps=2,scale=160:90,format=gray', '-f', 'rawvideo', '-'], capture_output=True, check=True, stdin=subprocess.DEVNULL).stdout
a = np.frombuffer(raw, np.uint8).reshape(-1, 90, 160).astype(int)
d = np.abs(a[1:] - a[:-1]).mean((1, 2))
flat = np.mean([(np.abs(f - np.median(f)) < 6).mean() >= 0.7 for f in a[::4]])
print(f'{len(a) / 2:.0f} s · đứng yên {(d < 0.3).mean() * 100:.0f}% · đổi hình mạnh {(d > 8).sum()} · nền phẳng {flat * 100:.0f}%')
win = sorted(((float((d[i:i + 30] < 0.3).mean()), i // 2) for i in range(0, len(d) - 30, 30)), reverse=True)[:6]
print('đoạn 15 s đứng yên nhất:', ' · '.join(f'{s // 60}:{s % 60:02d} ({v * 100:.0f}%)' for v, s in win))
info = subprocess.run(['ffmpeg', '-hide_banner', '-i', sys.argv[1], '-vf', "select='gt(scene,0.25)',showinfo", '-an', '-f', 'null', '-'], capture_output=True, text=True, stdin=subprocess.DEVNULL).stderr
cuts = [float(x) for x in re.findall(r'pts_time:([0-9.]+)', info)]
short = [(a, b - a) for a, b in zip(cuts, cuts[1:]) if 0.05 < b - a < 1 and a > 10]
print(f'cú máy < 1 s sau trailer: {len(short)}', ' · '.join(f'{int(a) // 60}:{a % 60:04.1f} ({d:.2f})' for a, d in short))
