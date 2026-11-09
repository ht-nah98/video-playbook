#!/usr/bin/env bash
# Chuẩn bị một video mẫu để học (docs/study/README.md): lời (whisper), ảnh mỗi 5 s ghép bảng, nhịp hình.
#   tools/study/prep.sh <video.mp4> <slug> [lang=en]
# Kết quả ở out/_lab/study/<slug>/ — KHÔNG commit (lời và ảnh là của tác giả video).
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail
cd "$(dirname "$0")/../.."
v="$1"; slug="$2"; lang="${3:-en}"
d="out/_lab/study/$slug"; mkdir -p "$d/frames"
PY=$(python3 tools/config.py analysis_py)

ffmpeg -v error -y -i "$v" -ac 1 -ar 16000 "$d/audio.wav"
ffmpeg -v error -y -i "$v" -vf "fps=1/5,scale=320:-1" "$d/frames/f%04d.jpg"
python3 -I tools/study/sheets.py "$d/frames" "$d/sheet"
python3 -I tools/study/pace.py "$v" --json "$d/pace.json" | tee "$d/pace.txt"
"$PY" -I tools/study/transcribe.py "$d/audio.wav" "$d/transcript.json" "$lang"
echo "xong: $d (sheet*.jpg, transcript.txt, pace.txt)"
