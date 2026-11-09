#!/usr/bin/env python3
"""Biên giới lịch sử → dữ liệu bản đồ gọn cho engine (kênh kể chuyện lịch sử).

    python3 -I tools/hist/geo.py <world_YYYY.geojson> <out.json> [--bbox lon0,lat0,lon1,lat1] [--tol 0.04] [--lat0 50]

Nguồn: aourednik/historical-basemaps (GPL-3.0 — ghi công trên hình + mô tả: "Borders: historical-basemaps, A. Ourednik").
Cắt vùng (điểm ngoài khung mở rộng bị kẹp về mép — chỉ méo phần nằm ngoài hình), chiếu trụ đều có hệ số cos(lat0),
đơn giản hoá Douglas–Peucker, bỏ đảo quá nhỏ. Ra: {"bbox": [x0,y0,x1,y1], "lat0", "credit", "countries": {tên: [[[x,y],…], …]}}
toạ độ x = (lon − lon0)·cos(lat0), y = −lat (độ) — trang tự co giãn vào khung.
"""
import argparse, json, math


def dp(pts, tol):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]; dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1e-12
    i, dm = 0, -1.0
    for k in range(1, len(pts) - 1):
        d = abs(dy * (pts[k][0] - a[0]) - dx * (pts[k][1] - a[1])) / L
        if d > dm: i, dm = k, d
    if dm <= tol: return [a, b]
    return dp(pts[:i + 1], tol)[:-1] + dp(pts[i:], tol)


def area(r): return abs(sum(r[i][0] * r[i - 1][1] - r[i - 1][0] * r[i][1] for i in range(len(r)))) / 2


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('src'); ap.add_argument('out')
    ap.add_argument('--bbox', default='-12,33,46,63'); ap.add_argument('--tol', type=float, default=0.04)
    ap.add_argument('--lat0', type=float, default=50); ap.add_argument('--minarea', type=float, default=0.02)
    o = ap.parse_args()
    lon0, lat0_, lon1, lat1 = map(float, o.bbox.split(',')); c = math.cos(math.radians(o.lat0))
    pad = 12; L0, L1, A0, A1 = lon0 - pad, lon1 + pad, lat0_ - pad, lat1 + pad
    d = json.load(open(o.src)); out = {}
    for f in d['features']:
        name = f['properties'].get('NAME'); g = f.get('geometry')
        if not name or not g: continue
        polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
        for poly in polys:
            ring = poly[0]
            if not any(lon0 <= p[0] <= lon1 and lat0_ <= p[1] <= lat1 for p in ring): continue
            r = [[(min(max(p[0], L0), L1) - lon0) * c, -min(max(p[1], A0), A1)] for p in ring]
            k = max(range(len(r)), key=lambda i: (r[i][0] - r[0][0]) ** 2 + (r[i][1] - r[0][1]) ** 2)   # vòng khép kín: tách ở điểm xa nhất
            r = dp(r[:k + 1], o.tol)[:-1] + dp(r[k:], o.tol)
            if len(r) < 4 or area(r) < o.minarea: continue
            out.setdefault(name, []).append([[round(x, 3), round(y, 3)] for x, y in r])
    res = {'bbox': [0, -lat1, (lon1 - lon0) * c, -lat0_], 'lat0': o.lat0, 'lon0': lon0,
           'credit': 'Borders: historical-basemaps (A. Ourednik), GPL-3.0', 'countries': out}
    json.dump(res, open(o.out, 'w'), separators=(',', ':'))
    n = sum(len(r) for v in out.values() for r in v)
    print(f'{len(out)} nước, {n} điểm → {o.out}')


if __name__ == '__main__':
    main()
