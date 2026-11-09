#!/usr/bin/env bash
# Ảnh chuẩn cả bài — lưới an toàn cho refactor: code đổi mà hình không được đổi.
#   tools/qa/golden.sh save  <project> [bước=2]   chụp mỗi <bước> giây → projects/<p>/data/golden.md5
#   tools/qa/golden.sh check <project>            chụp lại đúng các mốc đó, so md5
# Đổi hình CÓ CHỦ Ý thì save lại và commit golden.md5 cùng thay đổi.
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
source "$(dirname "$0")/_lib.sh"
# md5 chuẩn hoá: bỏ dấu " *" (chế độ nhị phân trên Windows), sắp theo tên với LC_ALL=C — không phụ thuộc locale.
sums() { (cd "$1" && md5sum ./*.png | sed -E 's#^([0-9a-f]+) [ *]\./#\1  #' | LC_ALL=C sort -k2); }
cmd="$1" p="$2" f="projects/$2/data/golden.md5" out="out/$2/qa/golden"
case "$cmd" in
  save)
    step="${3:-2}" dur="$(song_dur "$p")"
    ts=$(python3 -c "import sys;d=float('$dur');s=float('$step');print(','.join(f'{0.5+i*s:.2f}' for i in range(int((d-0.6)//s)+1)))")
    shoot "$p" "$ts" "$out"
    sums "$out" > "$f"; echo "golden: $(wc -l < "$f") khung → $f" ;;
  check)
    ts=$(sed -E 's/.*t_([0-9.]+)\.png/\1/' "$f" | paste -sd,)
    shoot "$p" "$ts" "$out"
    if diff <(sums "$out") <(LC_ALL=C sort -k2 "$f") >/dev/null; then echo "GOLDEN SAME ($(wc -l < "$f") khung)"
    else echo "GOLDEN DIFF:"; diff <(sums "$out") <(LC_ALL=C sort -k2 "$f") | grep '^<' | sed -E 's/.*t_([0-9.]+)\.png/  t=\1/'; exit 1; fi ;;
  *) echo "dùng: golden.sh save|check <project> [bước]"; exit 2 ;;
esac
