#!/usr/bin/env bash
# Chụp ảnh kiểm tra.  tools/qa/stills.sh <project> <t1,t2,…> [outdir=out/_lab/stills]
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
source "$(dirname "$0")/_lib.sh"
shoot "$1" "$2" "${3:-out/_qa/stills}" && echo "OK: ${3:-out/_qa/stills}"
