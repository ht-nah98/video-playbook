# Dùng chung cho tools/qa/*.sh — source, không chạy trực tiếp.
# Mọi lệnh chạy từ gốc repo; <project> là tên thư mục trong projects/ (vd. exp-log).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"
# Thời lượng bài: đọc từ projects/<p>/song.js (SONG = { …, duration: 239.65, … }).
song_dur() {
  local d; d=$(node -e "import('$ROOT/projects/$1/song.js').then(m => console.log(m.SONG.duration))" 2>/dev/null) || true
  [ -n "$d" ] || { echo "không đọc được SONG.duration từ projects/$1/song.js" >&2; return 1; }
  echo "$d"
}
page_of() { echo "projects/$1/index.html"; }
# shoot <project> <t1,t2,…> <outdir>: chụp, xoá thư mục cũ, BÁO LỖI nếu thiếu ảnh
# (shoot.js im lặng bỏ qua khung lỗi — đã từng làm phép so md5 "trùng" vì cả hai bên rỗng).
shoot() {
  local p="$1" ts="$2" out="$3" dur; dur="$(song_dur "$p")"
  rm -rf "$out"
  mkdir -p "$(dirname "$out")"
  node engine/render/shoot.js stills --page "$(page_of "$p")" --dur "$dur" --t "$ts" --outdir "$out" > "$out.log" 2>&1 || true
  local n want; n=$(find "$out" -name '*.png' 2>/dev/null | wc -l); want=$(echo "$ts" | tr ',' '\n' | grep -c .)
  [ "$n" = "$want" ] || { echo "SHOOT FAIL: $n/$want ảnh trong $out — xem $out.log (lỗi trang: [PAGE ERROR])" >&2; return 1; }
}
