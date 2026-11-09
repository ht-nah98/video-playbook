# <p> — gói đăng YouTube

Mẫu đã dùng thật: `projects/en/intuition/YOUTUBE.md`, `projects/en/zero-power/YOUTUBE.md`. Mỗi ô đếm ký tự BẰNG CODE trước
khi giao (LESSONS §42). Bản dán được → `out/<p>/youtube/{title.txt, description.txt, tags.txt, problems.txt,
chapters.txt, subtitles-en.srt, thumbnail.jpg}` (docs/lesson/LESSON-VIDEO.md "Đăng YouTube").

## Thumbnail
Người dùng làm. Lưu `projects/<p>/thumbnail.png`; bản đăng LUÔN là `out/<p>/youtube/thumbnail.jpg` (q95, ≤ 2 MB,
≥ 1280×720, 16:9 — ảnh người dùng gửi thường > 2 MB). Soát chữ số / công thức trên ảnh như soát hình.

## Title (≤ 100, hiện đủ ~60) → `title.txt`
Thêm một móc mà thumbnail CHƯA nói; 3 bản dự phòng để đổi khi CTR thấp. Đã chốt ở phiên khác thì dùng đúng bản đó.

## Description (≤ 5000, không `<` `>`)
Hai câu đầu = móc mở bài + lời hứa · chương (chép `chapters.txt`) · "In this video" · ghi chú ảnh tưởng tượng ·
lời mời kênh · 3 hashtag · credit ảnh (mặc định "Wikipedia / Wikimedia Commons"; ảnh CC BY-SA ghi tác giả — xem `assets/history/INDEX.md`).

## Tags (≤ 500 tổng)

## Problems (≤ 800 tổng, `m:ss câu hỏi` mỗi dòng)
Mốc = câu bắt đầu lời giải thích, lấy từ mốc chữ thật (`data/*.timeline.json` + `segments.json`); ≈ 15 câu ngắn.

## Cài đặt
English · Education · Academic system United States · tải `subtitles-en.srt` · "Altered or synthetic content" = Yes (giọng tổng hợp).
