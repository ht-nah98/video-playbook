#!/usr/bin/env bash
# Dựng khung một MV mới từ templates/mv/.
#   tools/new-mv.sh <tên-thư-mục> "<Tên bài>" [thời lượng=60] [bpm=120] [downbeat=0]
# tên-thư-mục: chữ thường, số, gạch ngang (vd. sin-cos). Tên bài: tuỳ ý (dấu nháy, &, tiếng Việt đều được).
# Sau đó làm theo docs/mv/NEW-MV.md (bóc nhạc → DNA + TREATMENT → cảnh).
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail
cd "$(dirname "$0")/.."
name="$1" title="${2:-$1}" dur="${3:-60}" bpm="${4:-120}" t0="${5:-0}" dst="projects/mv/$1"
[[ "$name" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "tên thư mục chỉ gồm a-z, 0-9, '-': $name"; exit 1; }
for v in "$dur" "$bpm" "$t0"; do [[ "$v" =~ ^[0-9]+(\.[0-9]+)?$ ]] || { echo "không phải số: $v"; exit 1; }; done
[ -e "$dst" ] && { echo "đã có $dst — không ghi đè"; exit 1; }
mkdir -p projects/mv; cp -r templates/mv "$dst"
find "$dst" \( -name '*.js' -o -name '*.html' \) | while read -r f; do sed -i 's#\.\./\.\./#../../../#g' "$f"; done   # mẫu viết cho projects/<p>/: thêm một cấp
# Điền chỗ trống bằng Python: tên bài đi vào JS dưới dạng chuỗi JSON, vào HTML đã thoát ký tự.
python3 - "$dst" "$name" "$title" "$dur" "$bpm" "$t0" <<'PY'
import sys, json, html, pathlib
dst, name, title, dur, bpm, t0 = sys.argv[1:7]
rep = {'__TITLE_JS__': json.dumps(title, ensure_ascii=False), '__NAME__': name, '__DUR__': dur, '__BPM__': bpm, '__T0__': t0}
for f in ['song.js', 'index.html', 'TREATMENT.md', 'DNA.md']:
    p = pathlib.Path(dst, f); s = p.read_text()
    s = s.replace('__TITLE__', html.escape(title) if f.endswith('.html') else title)
    for k, v in rep.items(): s = s.replace(k, v)
    p.write_text(s)
PY
echo "Đã tạo $dst. Bước tiếp (docs/mv/NEW-MV.md):"
echo "  1. chép bài hát vào $dst/audio/, lời gốc vào $dst/lyrics.raw.txt (có tag [Section])"
echo "  2. bóc nhạc + lời: tools/analyze/README.md § Pipeline dữ liệu  → thay data/timeline.json mẫu"
echo "  3. viết $dst/DNA.md + TREATMENT.md (riêng bài này) và DUYỆT trước khi code"
echo "  4. xem thử: tools/qa/stills.sh $name 0.6,1.3,2.4 out/_lab/$name"
