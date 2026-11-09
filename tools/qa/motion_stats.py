#!/usr/bin/env python3
"""Đo CHUYỂN ĐỘNG của một video (so video mình với video mẫu): máy quay vs vật tự động, khung chết, cú cắt.

    python3 tools/qa/motion_stats.py <video> [<video2> …] [--w 270] [--per-sec] [--gate channels/wn/motion_gate.json]   (mã 1 = dưới chuẩn)

Mỗi cặp khung liền nhau (thu về rộng --w px): luồng quang học Farneback → khớp affine toàn khung (RANSAC) =
CHUYỂN ĐỘNG MÁY (lia / đẩy / xoay); phần dư |luồng − affine| = CHUYỂN ĐỘNG RIÊNG (nhân vật, đạo cụ, hiệu ứng tự động).
In: máy TB (px/khung ở 1080 rộng), riêng TB, % khung "chết" (riêng < 0,6 px@1080 VÀ máy < 0,6), % khung có vật động mạnh
(riêng > 3 px@1080 trên ≥ 2 % diện tích), số cú cắt (chênh ảnh tuyệt đối tăng vọt), số đoạn giữ máy ≥ 1 s. Không tham số: in cách dùng.
"""
import sys, numpy as np, cv2

GATE = None; GATE_FAIL = []
TEX = 40.0   # ngưỡng độ dốc Sobel (ảnh xám 0–255 ở --w): điểm dưới ngưỡng không có vân để đo dòng — bỏ (bản 2, 11-09)

def analyse(path, W=270, per_sec=False):
    cap = cv2.VideoCapture(path); fps = cap.get(cv2.CAP_PROP_FPS) or 30; prev = None; rows = []; k = 1080 / W
    while True:
        ok, fr = cap.read()
        if not ok: break
        g = cv2.cvtColor(cv2.resize(fr, (W, int(W * fr.shape[0] / fr.shape[1]))), cv2.COLOR_BGR2GRAY)
        if prev is not None:
            fl = cv2.calcOpticalFlowFarneback(prev, g, None, 0.5, 3, 15, 3, 5, 1.2, 0)
            h, w = g.shape; ys, xs = np.mgrid[0:h:6, 0:w:6]; p0 = np.stack([xs.ravel(), ys.ravel()], 1).astype(np.float32); d = fl[ys, xs].reshape(-1, 2)
            gm = cv2.magnitude(cv2.Sobel(prev, cv2.CV_32F, 1, 0), cv2.Sobel(prev, cv2.CV_32F, 0, 1))[ys, xs].ravel()   # CHỈ điểm có vân: vùng phẳng (trời, tường trơn, nhoè)
            tx = gm > TEX                                                                                               # luôn báo dòng ≈ 0 → kéo máy về 0 (copper 11-09: lia thật 6–13 px đo ra 0,6)
            if tx.sum() >= 30: p0, d = p0[tx], d[tx]
            A, inl = cv2.estimateAffinePartial2D(p0, p0 + d, method=cv2.RANSAC, ransacReprojThreshold=1.0)
            if A is None: A = np.array([[1, 0, 0], [0, 1, 0]], np.float32)
            pred = p0 @ A[:, :2].T + A[:, 2] - p0; res = np.linalg.norm(d - pred, axis=1)
            cam = float(np.median(np.linalg.norm(pred, axis=1))) * k; loc = float(res.mean()) * k; strong = float((res * k > 3).mean())
            diff = float(np.abs(g.astype(np.int16) - prev.astype(np.int16)).mean())
            gy, gx = np.mgrid[0:h, 0:w].astype(np.float32); wg = cv2.remap(g, gx + fl[..., 0], gy + fl[..., 1], cv2.INTER_LINEAR)   # kéo khung sau về khung trước theo dòng chuyển động
            dw = float(np.abs(wg.astype(np.int16) - prev.astype(np.int16)).mean())                                              # lia vụt: khớp lại (dw nhỏ) · cắt cảnh thật: không khớp
            rows.append((cam, loc, strong, diff, dw))
        prev = g
    R = np.array(rows); n = len(R)
    if n == 0: return print(path, 'không đọc được khung')
    cuts = int(((R[:, 3] > 25) & (R[:, 3] > 4 * np.median(R[:, 3]) + 1) & (R[:, 4] > 0.5 * R[:, 3])).sum())   # cắt = khung đổi mạnh MÀ dòng chuyển động không giải thích được (lia vụt không tính — §303, 11-06)
    dead = (R[:, 1] < 0.6) & (R[:, 0] < 0.6); holds = 0; run = 0
    for c in R[:, 0]:
        run = run + 1 if c < 0.3 else 0
        if run == int(fps): holds += 1
    print(f"{path.split('/')[-1][:34]:34s} {n / fps:5.1f}s · máy TB {R[:, 0].mean():5.2f} (p90 {np.percentile(R[:, 0], 90):5.2f}) · riêng TB {R[:, 1].mean():5.2f} (p90 {np.percentile(R[:, 1], 90):5.2f})"
          f" · chết {dead.mean() * 100:4.1f}% · vật động mạnh {(R[:, 2] > 0.02).mean() * 100:4.1f}% · cắt {cuts} ({cuts / (n / fps) * 60:4.1f}/phút) · giữ máy ≥1 s {holds}")
    if per_sec:
        for s in range(int(n / fps) + 1):
            seg = R[int(s * fps):int((s + 1) * fps)]
            if len(seg): print(f"   {s:3d}s máy {seg[:, 0].mean():5.2f} riêng {seg[:, 1].mean():5.2f} động-mạnh {(seg[:, 2] > 0.02).mean() * 100:5.1f}%")
    if GATE:                                                                         # --gate <json>: cổng bắt buộc (LESSONS §303) — mã thoát 1 nếu dưới chuẩn
        import json; g = json.load(open(GATE)); cpm = cuts / (n / fps) * 60
        bad = [m for m, ok in ((f"máy TB {R[:, 0].mean():.2f} < {g['cam_min']}", R[:, 0].mean() >= g['cam_min']),
                              (f"riêng TB {R[:, 1].mean():.2f} < {g['self_min']}", R[:, 1].mean() >= g['self_min']),
                              (f"chết {dead.mean() * 100:.1f}% > {g['dead_max_pct']}%", dead.mean() * 100 <= g['dead_max_pct']),
                              (f"cắt {cpm:.1f}/phút > {g['cuts_per_min_max']}", cpm <= g['cuts_per_min_max'])) if not ok]
        print('CỔNG CHUYỂN ĐỘNG:', 'XANH' if not bad else 'ĐỎ — ' + ' · '.join(bad) + ' → CHƯA được đưa người dùng xem')
        GATE_FAIL.append(bool(bad))
    return R

if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if not a: print(__doc__); sys.exit(0)
    W = int(sys.argv[sys.argv.index('--w') + 1]) if '--w' in sys.argv else 270
    if '--gate' in sys.argv: GATE = sys.argv[sys.argv.index('--gate') + 1]; a = [x for x in a if x != GATE]
    for v in a:
        if v.isdigit(): continue
        analyse(v, W, '--per-sec' in sys.argv)
    sys.exit(1 if any(GATE_FAIL) else 0)
