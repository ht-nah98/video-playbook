# fifty-percent — gói đăng YouTube

Mẫu đã dùng thật: `projects/en/math-30k/YOUTUBE.md`. Mỗi ô đếm ký tự BẰNG CODE trước khi giao (LESSONS §42).
Bản dán được → `out/<p>/youtube/{description.txt, tags.txt, problems.txt, thumbnail.png}`.

## Thumbnail
Người dùng làm. Lưu `projects/<p>/thumbnail.png` + bản sao ở `out/<p>/youtube/` (≤ 2 MB, ≥ 1280×720, 16:9).

## Title (≤ 100, hiện đủ ~60)
Thêm một móc mà thumbnail CHƯA nói; 3 bản dự phòng để đổi khi CTR thấp.

**The Coin Already Landed. So What Is 50% Describing?** (51) — **đổi 2026-10-16** (lý do: 6 view / 7 ngày; `docs/study/05-youtube-dip.md`). Khớp câu mở video; thumbnail v2 "50% OF WHAT?" (`projects/en/fifty-percent/thumbnail/prompt-v2-fifty-of-what.md`).
Dự phòng 2026-10-16: A Coin Flip Isn't Random. A Machine Proved It. (46) · A 99% Accurate Test Says You're Sick. You Probably Aren't. (58).

Cũ: **The Coin Was Never Random – The Essence of Probability** (54) — chốt 2026-10-07. Title khẳng định, thumbnail hỏi
(`WHAT DOES 50% MEAN?`). "essence of probability" 3,624 lượt/tháng, cạnh tranh 33 (vidIQ). Bản nháp của chủ kênh
"The Essence of Authentication…" — "Authentication" sai nghĩa, đổi thành "Probability".
Dự phòng: The Essence of Probability – The Coin Was Never Random · What Does 50% Actually Mean? Probability Explained
· What Does 50% Actually Mean? Probability, from Coin Flips to Bayes.
Chi tiết: `~/Desktop/yt-studio/lessons/pending-fifty-percent-what-does-50-mean/thumbnail-brief.md`.

## Description (≤ 5000, không `<` `>`)
Hai câu đầu = móc mở bài + lời hứa · chương (chép `chapters.txt`) · "In this video" · ghi chú ảnh tưởng tượng ·
lời mời kênh · 3 hashtag · credit ảnh (từ `assets/history/SOURCES.txt`).

→ `out/en/fifty-percent/youtube/description.txt` (2051). Không có chân dung tưởng tượng nên bỏ ghi chú "IMAGINED";
credit Kolmogorov CC BY-SA bắt buộc.

## Tags (≤ 500 tổng)
→ `tags.txt` (416, 21 tag): từ khoá vidIQ trong thumbnail-brief (probability explained, essence of probability,
bayes theorem) + chủ đề từng hồi.

## Problems (≤ 800 tổng, `m:ss câu hỏi` mỗi dòng)
Mốc = câu bắt đầu lời giải thích, lấy từ mốc chữ thật (`data/*.timeline.json` + `segments.json`); ≈ 15 câu ngắn.

→ `problems.txt` (780, 16 câu), mốc lấy từ `subtitles-en.srt`.

## Cài đặt
English · Education · Academic system United States · tải `subtitles-en.srt` · "Altered or synthetic content" = Yes (giọng tổng hợp).
