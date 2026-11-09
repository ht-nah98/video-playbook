#!/usr/bin/env bash
# Dọn out/ — chỉ xoá thứ sinh lại được.
#   tools/qa/clean.sh          KHÔNG xoá gì: in cách dùng + liệt kê file lạ ở out/ (LESSONS §135)
#   tools/qa/clean.sh --qa     xoá out/_lab (bàn thử chung) + mọi out/<kênh>/<bài>/qa (ảnh kiểm tra, golden, log)
#   tools/qa/clean.sh <p>      dọn out/<p>/parts — CHỈ khi đã có bản cuối out/<p>/<p>.mp4:
#     MV (không có build.json)          xoá cả parts/ (render lại bằng tools/render.sh)
#     bài học (projects/<p>/build.json) chỉ xoá trung gian (*.wav, video.mp4, *.log); GIỮ đoạn hình *.mp4 + *.meta
#                                       để `build.py <p> --keep` trộn lại tiếng/nhạc khỏi render hình (docs/lesson/SFX.md)
# Không bao giờ đụng bản cuối. Thứ không theo quy ước (file lạ ở out/) được liệt kê để người xem quyết.
source "$(dirname "$0")/_lib.sh"
usage() { sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in
  -h|--help) usage; exit 0 ;;
  --qa) rm -rf out/_lab; find out -mindepth 3 -maxdepth 3 -type d -name qa -exec rm -rf {} +; echo "đã xoá out/_lab + out/*/*/qa" ;;
  "") usage ;;
esac
if [ -n "${1:-}" ] && [ "${1:-}" != "--qa" ]; then
  O="out/$1"; [ -d "out/$1_public" ] && O="out/$1_public"   # bài đã đăng: out/<p>_public (tools/channel.py out_dir)
  F="$O/${1##*/}.mp4"   # mã kênh khác: ja/<p> → out/ja/<p>/<p>.mp4
  [ -f "$F" ] || { echo "chưa có $F — giữ parts/" >&2; exit 1; }
  if [ -f "projects/$1/build.json" ]; then
    if [ -d "$O/parts" ]; then
      find "$O/parts" -maxdepth 1 -type f \( -name '*.wav' -o -name 'video.mp4' -o -name '*.log' \) -delete
      echo "đã xoá trung gian trong $O/parts (giữ *.mp4 + *.meta cho build.py --keep)"
    fi
  else
    rm -rf "$O/parts" && echo "đã xoá $O/parts (bản cuối: $F)"
  fi
fi
stray=$(find out -mindepth 1 -maxdepth 1 ! -name _lab $(for d in projects/*/; do printf ' ! -name %s' "$(basename "$d")"; done) 2>/dev/null)   # out/ = _lab + một thư mục mỗi kênh
[ -z "$stray" ] || { echo "ngoài quy ước (xem rồi tự xoá):"; echo "$stray" | sed 's/^/  /'; }
