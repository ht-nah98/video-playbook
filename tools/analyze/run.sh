#!/usr/bin/env bash
# Bóc tách một bài hát thành music.json cho đạo diễn hình ảnh.
#   ./tools/analyze/run.sh projects/<tên>/audio/bai.mp3 [lyrics.txt]
#   MUSIC_LANG=ja ./tools/analyze/run.sh …   lời tiếng Nhật (whisper ja, CTC trên romaji); STEMS_KEEP=1 giữ stem ở projects/<tên>/stems/
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail

VENV=$(python3 "$(dirname "$0")/../config.py" analysis_py)   # tools/config.py — đổi bằng MASCOT_ANALYSIS_PY
[ -x "$VENV" ] || { echo "Không thấy venv: $VENV"; exit 1; }

MP3="$1"
LYRICS="${2:-}"
[ -f "$MP3" ] || { echo "Không thấy file: $MP3"; exit 1; }

PROJ=$(dirname "$(dirname "$MP3")")        # projects/<tên>
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT                  # luôn dọn, kể cả khi lỗi

echo "▸ Bóc tách: $MP3"
echo "  thư mục tạm: $WORK"

echo "▸ [1/4] giải mã"
ffmpeg -v error -y -i "$MP3" -ar 44100 -ac 2 "$WORK/mix.wav"

echo "▸ [2/4] tách stem (Demucs — bước lâu nhất)"
# GPU bị OmniVoice chiếm (~11.8/12 GB) → CUDA out of memory; trước đây `| tail -1` + pipefail làm script thoát IM LẶNG.
if ! "$VENV" -m demucs -n htdemucs -o "$WORK/stems" "$WORK/mix.wav" > "$WORK/demucs.log" 2>&1; then
  grep -m1 -iE "out of memory|error" "$WORK/demucs.log" | sed 's/^/  GPU lỗi: /'
  echo "  → chạy lại trên CPU"
  "$VENV" -m demucs -d cpu -n htdemucs -o "$WORK/stems" "$WORK/mix.wav" > "$WORK/demucs.log" 2>&1 || { tail -20 "$WORK/demucs.log"; exit 1; }
fi
STEM="$WORK/stems/htdemucs/mix"

echo "▸ [3/4] căn lời (whisper + CTC)"
"$VENV" "$(dirname "$0")/align.py" \
  --vocal "$STEM/vocals.wav" \
  --out "$WORK/words.json" --lang "${MUSIC_LANG:-en}" \
  ${LYRICS:+--lyrics "$LYRICS"}

echo "▸ [4/4] phân tích nhạc"
"$VENV" "$(dirname "$0")/analyze.py" \
  --mix "$WORK/mix.wav" \
  --vocal "$STEM/vocals.wav" --drums "$STEM/drums.wav" \
  --bass "$STEM/bass.wav" --other "$STEM/other.wav" \
  --words "$WORK/words.json" \
  --out "$PROJ/data/music.json"
cp "$WORK/words.json" "$PROJ/data/words.heard.json"   # bước 2 (lyrics_map.py) cần file này — thư mục tạm bị xoá
[ -n "${STEMS_KEEP:-}" ] && { mkdir -p "$PROJ/stems"; cp "$STEM"/*.wav "$PROJ/stems/"; }

echo "▸ Xong. Bước tiếp: viết $PROJ/TREATMENT.md (xem docs/mv/PIPELINE.md § Bước 3)"
