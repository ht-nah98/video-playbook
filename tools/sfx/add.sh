#!/usr/bin/env bash
# Thêm tiếng vào thư viện: chuẩn hoá (cắt lặng hai đầu, 48k stereo 16-bit, đỉnh −6 dBFS) → assets/sfx/<kind>/NN.wav.
#   tools/sfx/add.sh <kind> <file>...      (nhớ ghi nguồn + giấy phép CC0 vào assets/sfx/SOURCES.md — docs/lesson/SFX.md)
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail
kind=$1; shift; D="$(cd "$(dirname "$0")/../.." && pwd)/assets/sfx/$kind"; mkdir -p "$D"
shopt -s nullglob                                   # loại mới: thư mục rỗng (ls | wc -l chết vì pipefail)
tmp=$(mktemp --suffix=.wav); trap 'rm -f "$tmp"' EXIT
for f in "$@"; do
  have=("$D"/*.wav); n=$(( ${#have[@]} + 1 )); out="$D/$(printf %02d "$n").wav"
  ffmpeg -v error -y -i "$f" -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-60dB,areverse,aresample=48000" -ac 2 -c:a pcm_s16le "$tmp"
  pk=$(ffmpeg -hide_banner -i "$tmp" -af volumedetect -f null - 2>&1 | awk '/max_volume/{print $5}')
  ffmpeg -v error -y -i "$tmp" -af "volume=$(python3 -c "print(-6-($pk))")dB" -c:a pcm_s16le "$out"
  echo "▸ $f → ${out#$PWD/}"
done
