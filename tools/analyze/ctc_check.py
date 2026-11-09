"""Bước 3 — nguồn thứ hai để phân xử: CTC forced alignment TRỰC TIẾP lời gốc lên giọng sạch (stem lead vocal).
Không phụ thuộc whisper nghe đúng hay sai. Ghi data/timeline.ctc.json (mỗi từ thêm "ctc": {start, end, conf});
so với timeline.json để tìm câu lệch, phân xử bằng tay vào data/overrides.json (luật: CTC conf ≥ 0.45 thắng).

  python3 tools/analyze/ctc_check.py projects/<p> <lead-vocals.wav>     (cần venv của align.py)
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from align import ctc_align
P = Path(sys.argv[1]).resolve()
tl = json.load(open(P / "data/timeline.raw.json"))   # lời gốc TRƯỚC phân xử — để phân xử
words = [{"w": w["w"]} for l in tl["lines"] for w in l["words"]]
res = ctc_align(sys.argv[2], words)
k = 0
for l in tl["lines"]:
    for w in l["words"]:
        r = res[k]; k += 1
        w["ctc"] = r
json.dump(tl, open(P / "data/timeline.ctc.json", "w"), indent=1, ensure_ascii=False)
ok = sum(1 for r in res if r and r["conf"] >= 0.45)
print(f"CTC lời gốc: {ok}/{len(res)} từ conf ≥ 0.45")
