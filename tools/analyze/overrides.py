"""Bước 4 — áp phân xử tay projects/<p>/data/overrides.json lên data/timeline.raw.json (ra của lyrics_map) →
data/timeline.json + timeline.txt. Luôn đọc bản RAW nên chạy lại sau mỗi lần sửa overrides.json không làm mốc trôi.

overrides.json:
  "starts": { "câu": [mốc_mới, "vì sao"], "câu lặp#3": [...] }   dời cả câu (giữ khoảng cách các từ)
  "repeat": [ { "section", "before", "text", "words": [[từ, lệch_đầu, lệch_cuối|null]], "dur", "starts", "_why" } ]
            thay MỌI dòng của section bằng các dòng `text` ở từng mốc `starts` (lời gốc ghi sai số lần hát),
            chèn trước dòng đầu tiên có section bắt đầu bằng `before`.
Sau đó: câu tràn sang câu sau bị cắt; câu ngắn phi lý (< 0.3s) kéo tới sát câu sau.

  python3 tools/analyze/overrides.py projects/<p>
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, sys
from pathlib import Path
P = Path(sys.argv[1]).resolve()
tl = json.load(open(P / "data/timeline.raw.json")); ov = json.load(open(P / "data/overrides.json"))
seen = {}
for l in tl["lines"]:
    seen[l["text"]] = seen.get(l["text"], 0) + 1
    key = l["text"] if seen[l["text"]] == 1 else f'{l["text"]}#{seen[l["text"]]}'
    hit = ov["starts"].get(key) or (ov["starts"].get(l["text"]) if seen[l["text"]] == 1 else None)
    if hit:
        d = hit[0] - l["start"]
        for w in l["words"]: w["start"] = round(w["start"] + d, 3); w["end"] = round(w["end"] + d, 3)
        l["start"] = round(l["start"] + d, 3); l["end"] = round(l["end"] + d, 3); l["override"] = hit[1]
for r in ov.get("repeat", []):
    lines = [l for l in tl["lines"] if l["section"] != r["section"]]
    i = next(k for k, l in enumerate(lines) if l["section"].startswith(r["before"]))
    new = [{"section": r["section"], "text": r["text"], "start": s, "end": round(s + r["dur"], 3),
            "words": [{"w": w, "start": round(s + a, 3), "end": round(s + (r["dur"] if b is None else b), 3)} for w, a, b in r["words"]],
            "override": r["_why"]} for s in r["starts"]]
    tl["lines"] = lines[:i] + new + lines[i:]
secs = []
for l in tl["lines"]:
    if not secs or secs[-1]["name"] != l["section"]: secs.append({"name": l["section"], "start": l["start"], "end": l["end"]})
    secs[-1]["end"] = max(secs[-1]["end"], l["end"])
tl["sections"] = secs
# câu có độ dài phi lý (< 0.3s) → kéo tới sát câu sau
for a, b in zip(tl["lines"], tl["lines"][1:]):
    if a["end"] > b["start"] + 0.1:          # câu tràn sang câu sau
        a["end"] = round(b["start"], 3)
        for w in a["words"]: w["end"] = min(w["end"], a["end"]); w["start"] = min(w["start"], a["end"] - 0.05)
    if a["end"] - a["start"] < 0.3:
        a["end"] = round(b["start"] - 0.02, 3); a["words"][-1]["end"] = a["end"]
json.dump(tl, open(P / "data/timeline.json", "w"), indent=1, ensure_ascii=False)
with open(P / "data/timeline.txt", "w") as f:
    sec = None
    for l in tl["lines"]:
        if l["section"] != sec: sec = l["section"]; f.write(f"## {sec}\n")
        f.write(f'{l["start"]:7.2f}-{l["end"]:7.2f} {l["text"]}{"   *" if l.get("override") else ""}\n')
print(sum(1 for l in tl["lines"] if l.get("override")), "dòng bị ghi đè")
