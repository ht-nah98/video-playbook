#!/usr/bin/env python3
"""Nhịp hình của một video: cắt cảnh + thời gian màn hình đứng yên (docs/study/README.md).

  python3 tools/study/pace.py <video.mp4> [--json out.json]

Cắt cảnh (ffmpeg scene > 0.3) đo video quay thật; hoạt hình của ta chuyển bằng morph/mờ dần nên gần như
không có "cắt" — vì vậy số chính là ĐỨNG YÊN: < 2% điểm ảnh đổi (> 12 mức xám) so với 2 s trước. Gõ thêm một
dòng chữ trên bố cục cố định vẫn tính là đứng yên — với người xem, khung hình trông như cũ.
"""
import argparse, json, statistics, subprocess, sys
import numpy as np

W, H, FPS = 960, 540, 2   # đo ở 960×540 — ảnh thu nhỏ hơn làm mất chuyển động nhỏ, báo thừa đứng yên (LESSONS §12, §38b)


def cuts(f):
    err = subprocess.run(['ffmpeg', '-i', f, '-vf', "scale=480:-1,select='gt(scene,0.3)',showinfo",
                          '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return [float(x.split(':')[1]) for x in err.split() if x.startswith('pts_time:')]


def changed(f):
    """Tỉ lệ điểm ảnh đổi > 12 mức xám so với khung 2 s trước, đọc dòng (không giữ cả video trong RAM)."""
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', f, '-vf', f'fps={FPS},scale={W}:{H},format=gray',
                          '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    ring, out, n = [], [], W * H
    while (b := p.stdout.read(n)) and len(b) == n:
        fr = np.frombuffer(b, np.uint8).astype(np.int16)
        if len(ring) == 2 * FPS:
            out.append(float((np.abs(fr - ring.pop(0)) > 12).mean()))
        ring.append(fr)
    p.wait()
    return np.array(out), (len(out) + 2 * FPS) / FPS


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video')
    ap.add_argument('--json')
    a = ap.parse_args()
    ch, dur = changed(a.video)
    static = ch < 0.02
    runs, r = [], 0
    for i, s in enumerate(list(static) + [False]):
        if s:
            r += 1
        elif r:
            runs.append((r / FPS, (i - r) / FPS)); r = 0
    runs.sort(reverse=True)
    c = cuts(a.video)
    gaps = [b - x for x, b in zip([0] + c, c + [dur])]
    per_min = [round(float(static[m * 60 * FPS:(m + 1) * 60 * FPS].mean()) * 100)
               for m in range(int(dur // 60) + 1) if static[m * 60 * FPS:(m + 1) * 60 * FPS].size]
    res = {'dur': round(dur, 1), 'cuts': len(c), 'median_shot': round(statistics.median(gaps), 2),
           'static_pct': round(float(static.mean()) * 100, 1), 'static_runs_ge5': sum(x >= 5 for x, _ in runs),
           'longest': [[x, f'{int(t // 60)}:{int(t % 60):02d}'] for x, t in runs[:8]], 'static_pct_per_min': per_min}
    print(f"{a.video}: {res['dur']:.0f} s · {res['cuts']} cắt, cảnh giữa {res['median_shot']} s · "
          f"đứng yên {res['static_pct']}% · đoạn ≥ 5 s: {res['static_runs_ge5']}")
    print('  dài nhất:', ', '.join(f'{x:.0f}s@{t}' for x, t in res['longest']))
    print('  % đứng yên từng phút:', ' '.join(map(str, per_min)))
    if a.json:
        json.dump(res, open(a.json, 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    sys.exit(main())
