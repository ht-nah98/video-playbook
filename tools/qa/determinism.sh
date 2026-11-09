#!/usr/bin/env bash
# Tất định: chụp cùng tập khung theo thứ tự XUÔI rồi NGƯỢC, md5 phải trùng.
#   tools/qa/determinism.sh <project> <t1,t2,…>
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
source "$(dirname "$0")/_lib.sh"
rev=$(echo "$2" | tr ',' '\n' | tac | paste -sd,)
shoot "$1" "$2" out/_lab/det-fwd
shoot "$1" "$rev" out/_lab/det-rev
"$ROOT/tools/qa/same.sh" out/_lab/det-fwd out/_lab/det-rev
