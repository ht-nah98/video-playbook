# pi — gói đăng YouTube

Mẫu đã dùng thật: `projects/en/math-30k/YOUTUBE.md`. Mỗi ô đếm ký tự BẰNG CODE trước khi giao (LESSONS §42).
Bản dán được → `out/en/pi/youtube/{title.txt, description.txt, tags.txt, problems.txt, subtitles-en.srt, chapters.txt}`.

## Thumbnail
Người dùng làm (2026-10-07): "WHY 3.14?" xanh mực + mascot cầm compa + dãy chữ số π cuộn quanh hình tròn nội tiếp
lục giác. Gốc `projects/en/pi/thumbnail.png` (1672×941, 2.4 MB PNG — quá trần 2 MB) → bản đăng
`out/en/pi/youtube/thumbnail.jpg` (q95, 0.56 MB).

## Title (≤ 100, hiện đủ ~60)
**π Is Not Just 3.14 — You've Been Thinking About It Wrong** (56) — người dùng CHỐT khi đăng (2026-10-07).
Đi cặp thumbnail "WHY 3.14?": ảnh hỏi, title lật lại hiểu lầm.
Đề xuất cũ của đạo diễn (không dùng): What Is Pi, Really? It Was Never About Circles · Why Is Pi 3.14? The Real
Meaning of Pi · Pi Isn't About Circles – It's About Turning.

## Description (≤ 5000, không `<` `>`)
→ `description.txt` (2135): móc mở bài (1 + 1 = 2 / "máy tính bảo thế") + 3 câu hỏi · 16 chương · "In this video" ·
ghi chú ảnh (Archimedes = tranh Fetti 1620 tưởng tượng; Tổ Xung Chi = tượng hiện đại) · lời mời kênh · #pi #math
#geometry · credit Wikipedia / Wikimedia Commons. Lần đầu có "223/71 < pi < 22/7" — `<` bị cấm, đã viết lại bằng chữ.

## Tags (≤ 500 tổng)
→ `tags.txt` (329, 21 tag): câu hỏi người xem hay gõ (why is pi 3.14, why does pi never end) + chủ đề từng hồi.

## Problems (≤ 800 tổng, `m:ss câu hỏi` mỗi dòng)
→ `problems.txt` (716, 16 câu), mốc lấy từ `subtitles-en.srt`.

## Phụ đề
Số đọc bằng chữ của bài này đã thêm vào bảng `SPOKEN` (`tools/voice/publish.py`): 3.1408, 355/113, 12,288, 1761,
1882, 1,900 years, 99% from scratch… Cụm số bị cắt ngang hai cue không đổi được → thêm cả bản ngắn ("nineteen hundred").

## Cài đặt
English · Education · Academic system United States · tải `subtitles-en.srt` · "Altered or synthetic content" = Yes (giọng tổng hợp).
