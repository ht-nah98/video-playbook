#!/usr/bin/env python3
"""Soi kênh: view, × trung vị, ngày đăng của mọi video công khai (docs/lesson/PACKAGING.md §8, docs/study/05).

  python3 tools/study/channel.py @99fromscartch [--fast] [--json out.json]

Video ≥ 3× trung vị là NGOẠI LỆ — bóc động cơ tò mò của nó để lặp lại (study 05 ý 3). Video < 7 ngày còn quá sớm,
đánh dấu "mới". --fast bỏ ngày đăng và view chính xác (danh sách phẳng làm tròn 1042 → "1K"); chỉ một lần gọi,
mặc định gọi từng video (~1 s/video).
Dữ liệu công khai qua yt-dlp (player android — web hay bị 403).
"""
import argparse, datetime, json, statistics, subprocess, sys

YT = ["yt-dlp", "-q", "--no-warnings", "--extractor-args", "youtube:player_client=android"]


def lines(args):
    r = subprocess.run(YT + args, capture_output=True, text=True)
    if r.returncode and not r.stdout:
        sys.exit(r.stderr.strip() or "yt-dlp lỗi")
    return [l.split("|", 3) for l in r.stdout.splitlines() if l.strip()]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("handle")
    ap.add_argument("--fast", action="store_true")
    ap.add_argument("--json")
    a = ap.parse_args()
    h = a.handle if a.handle.startswith("http") else f"https://www.youtube.com/{a.handle}/videos"
    rows = lines(["--flat-playlist", "--print", "%(id)s|%(view_count)s|%(duration_string)s|%(title)s", h])
    dates = {}
    if not a.fast:
        urls = [f"https://www.youtube.com/watch?v={r[0]}" for r in rows]
        exact = {d[0]: d[1:] for d in lines(["--skip-download", "--print", "%(id)s|%(upload_date)s|%(view_count)s"] + urls)}
        dates = {i: e[0] for i, e in exact.items()}
        rows = [[i, exact.get(i, [0, v])[1], d, t] for i, v, d, t in rows]  # danh sách phẳng làm tròn (1042 → 1000)
    vids = [dict(id=i, views=int(v) if v.isdigit() else 0, dur=d, title=t, date=dates.get(i, "")) for i, v, d, t in rows]
    if not vids:
        sys.exit("không thấy video nào")
    med = statistics.median(v["views"] for v in vids) or 1
    today = datetime.date.today()
    print(f"{len(vids)} video · trung vị {med:g} view\n")
    print(f"{'ngày':10}  {'view':>6}  {'×tv':>5}  {'dài':>6}  title")
    for v in vids:
        v["x"] = round(v["views"] / med, 2)
        new = v["date"] and (today - datetime.date.fromisoformat(f"{v['date'][:4]}-{v['date'][4:6]}-{v['date'][6:]}")).days < 7
        mark = "  ← NGOẠI LỆ" if v["x"] >= 3 else ("  (mới)" if new else "")
        print(f"{v['date'] or '-':10}  {v['views']:>6}  {v['x']:>5.1f}  {v['dur']:>6}  {v['title'][:70]}{mark}")
    if a.json:
        json.dump(dict(median=med, videos=vids), open(a.json, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
