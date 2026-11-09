#!/usr/bin/env bash
# Render theo quy ước thư mục out/ (mọi MV giống nhau):
#   out/<p>/<p>.mp4         bản cuối — file DUY NHẤT để xem / đăng
#   out/<p>/parts/A-B.mp4   các đoạn render (ghép xong thì xoá được: tools/qa/clean.sh <p>)
#   out/_lab/                ảnh kiểm tra, bàn thử, log — xoá lúc nào cũng được
#
#   tools/render.sh part  <p> <A> <B>   render đoạn [A, B] giây → out/<p>/parts/A-B.mp4
#   tools/render.sh full  <p> [mốc,…]   render TRỌN BÀI: chia ở các mốc (nên là chỗ cắt cứng), chạy SONG SONG,
#                                       đợi xong rồi ghép → out/<p>/<p>.mp4 (add-it-up: 6 đoạn, 233s ≈ 30 phút)
#   tools/render.sh final <p>           ghép MỌI đoạn trong parts/ theo thứ tự A → out/<p>/<p>.mp4 (AAC, faststart)
# Các đoạn phải nối liền (B của đoạn trước = A của đoạn sau) — stitch.mjs kiểm từng khung.
# Trước khi ghép phần cũ với phần mới: tools/qa/golden.sh check <p> (code của phần cũ không được đổi hình).
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
source "$(dirname "$0")/qa/_lib.sh"
cmd="${1:-}" p="${2:-}"
[ -n "$p" ] && [ -f "projects/$p/index.html" ] || { sed -n '2,11p' "$0"; exit 1; }
dir="out/$p" audio="projects/$p/audio/song.m4a"
case "$cmd" in
  part)
    a="$3" b="$4" dur="$(song_dur "$p")"; mkdir -p "$dir/parts"
    node engine/render/shoot.js video --page "$(page_of "$p")" --dur "$dur" --from "$a" --to "$b" \
      --audio "$audio" --out "$dir/parts/$a-$b.mp4" 2>&1 | tr '\r' '\n' > "$dir/parts/$a-$b.log"
    echo "OK: $dir/parts/$a-$b.mp4" ;;
  full)
    dur="$(song_dur "$p")"; IFS=',' read -ra cut <<< "${3:-}"
    pts=(0 "${cut[@]}" "$dur"); rm -rf "$dir/parts"
    for ((i = 0; i < ${#pts[@]} - 1; i++)); do "$0" part "$p" "${pts[i]}" "${pts[i+1]}" & done
    wait
    bad=$(grep -L "xong:" "$dir"/parts/*.log); [ -z "$bad" ] || { echo "đoạn hỏng: $bad" >&2; exit 1; }
    "$0" final "$p" ;;
  final)
    mapfile -t args < <(python3 - "$dir/parts" <<'PY'
import sys, glob, os, re
fs = []
for f in glob.glob(os.path.join(sys.argv[1], '*.mp4')):
    m = re.fullmatch(r'([\d.]+)-([\d.]+)\.mp4', os.path.basename(f))
    if m: fs.append((float(m[1]), m[1], m[2], f))
for _, a, b, f in sorted(fs): print(f'{f}@{a}:{a}:{b}')
PY
)
    [ "${#args[@]}" -gt 0 ] || { echo "không có đoạn nào trong $dir/parts" >&2; exit 1; }
    node tools/stitch.mjs --audio "$audio" --out "$dir/.stitch.mp4" "${args[@]}"
    ffmpeg -v error -y -i "$dir/.stitch.mp4" -c:v copy -c:a aac -b:a 256k -movflags +faststart "$dir/$p.mp4"  # Opus → AAC (LESSONS §22)
    rm -f "$dir/.stitch.mp4"
    echo "BẢN CUỐI: $dir/$p.mp4 ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$dir/$p.mp4")s)" ;;
  *) sed -n '2,11p' "$0"; exit 1 ;;
esac
