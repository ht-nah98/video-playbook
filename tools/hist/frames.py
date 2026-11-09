#!/usr/bin/env python3
"""Trích ảnh QA từ video đã render, ĐÚNG GIỜ: tên file = giây thật của khung (LESSONS §232).

    python3 tools/hist/frames.py hist/<tập> [--every 4] [--video f.mp4] [--start 2]   # → out/hist/<tập>/qa/frames/t_0002.0.jpg

Dùng select theo chỉ số khung; KHÔNG dùng `-vf fps=1/n` — bộ lọc đó lấy khung cuối của mỗi ô, lệch n/2 giây so với giờ tưởng.
"""
import argparse, json, shutil, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from channel import out_dir

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('p'); ap.add_argument('--every', type=float, default=4); ap.add_argument('--start', type=float, default=2); ap.add_argument('--video')
a = ap.parse_args()
out = Path(out_dir(a.p)); name = a.p.split('/')[-1]; video = Path(a.video) if a.video else out / f'{name}.mp4'
info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate', '-of', 'json', str(video)]))
num, den = info['streams'][0]['r_frame_rate'].split('/'); fps = int(num) / int(den)
step, first = round(a.every * fps), round(a.start * fps)
qa = out / 'qa' / 'frames'; shutil.rmtree(qa, ignore_errors=True); qa.mkdir(parents=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf', f"select='gte(n,{first})*not(mod(n-{first},{step}))'", '-vsync', '0', '-q:v', '2', str(qa / 'f_%05d.jpg')], check=True, stdin=subprocess.DEVNULL)
fs = sorted(qa.glob('f_*.jpg'))
for i, f in enumerate(fs): f.rename(qa / f't_{(first + i * step) / fps:07.1f}.jpg')
print(f'✓ {qa} — {len(fs)} ảnh, mỗi {step / fps:g} s từ {first / fps:g} s')
