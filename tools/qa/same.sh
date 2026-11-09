#!/usr/bin/env bash
# So md5 từng ảnh của hai thư mục (phải có ảnh, phải trùng hết).  tools/qa/same.sh <dirA> <dirB>
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail
for d in "$1" "$2"; do ls "$d"/*.png >/dev/null 2>&1 || { echo "DIFF: $d không có ảnh .png"; exit 1; }; done
a=$(cd "$1" && md5sum *.png); b=$(cd "$2" && md5sum *.png)
if [ -n "$a" ] && [ "$a" = "$b" ]; then echo "SAME ($(echo "$a" | wc -l) ảnh)"; else echo "DIFF"; diff <(echo "$a") <(echo "$b") || true; exit 1; fi
