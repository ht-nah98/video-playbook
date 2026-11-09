# ja/2048 — gói đăng YouTube (kênh 99の発見, tiếng Nhật)

Như `YOUTUBE.md` (đếm ký tự bằng code — LESSONS §42), khác ở:
- **Tiêu đề / mô tả / tags / problems viết tiếng Nhật.** YouTube đếm ký tự, không đếm byte: tiêu đề ≤ 100 (hiện đủ ~30–35
  ký tự Nhật trên di động — móc chính đặt ĐẦU), mô tả ≤ 5000, tags ≤ 500.
- Mô tả: hai câu móc + lời hứa · 目次 (chép `chapters.txt`) · この動画で · lời mời kênh「チャンネル登録して、新しい発見に出会って
  ください！」· 3 hashtag (#数学 #科学 #数学の面白さ + một tag riêng bài) · credit ảnh · ghi chú giọng tổng hợp
  (「ナレーションは合成音声です」).
- Phụ đề: `out/<p>/youtube/subtitles-ja.srt`.
- Cài đặt: 日本語 · Education · "Altered or synthetic content" = Yes.

## Thumbnail
**v3 CHỐT (2026-10-19):** `thumbnail/v3-1h-1000h.png` → bản đăng `out/ja/2048/youtube/thumbnail-v3.jpg` (1280×720, 0.28 MB) —
chéo lạnh/ấm, mascot 2 tư thế (bối rối ↔ chỉ 2048), prompt `thumbnail/prompt-v3-small-mascots.md`.
**v2 (2026-10-19):** 「1時間 | 1000時間」 — bàn kín lộn xộn ↔ bậc thang dồn góc, 2048 phát sáng; prompt
`thumbnail/prompt-v2-1h-1000h.md`. Khớp 5 giây đầu mới (hai bàn chơi thật, `plates/a0-open.js` ⓪).

v1 (người dùng làm 2026-10-13): chữ vàng lá「2048の限界 131072」+ nhỏ「16マスに隠された数学」, mascot chống cằm, bàn 4×4
quân gỗ/sơn mài với ô 131072 phát sáng vàng, nền đêm có 鳥居 + núi Phú Sĩ. Gốc `projects/ja/2048/thumbnail.png` (1672×941,
2.4 MB PNG — quá trần 2 MB) → bản đăng `out/ja/2048/youtube/thumbnail.jpg` (q95, 0.65 MB). Soát 2026-10-19 (PACKAGING
§3): che chữ vẫn hỏi được, nhưng nhiều chi tiết, khác thế giới video (gỗ sáng), lặp 131072 với title cũ → thay bằng v2.

## タイトル → `title.txt`
Chọn (2026-10-19, người dùng: "kiểu 1000 giờ chơi 2048"): 「2048、1時間の人と1000時間の人は何が違う？」 (22)
— so sánh, KHÔNG nhận kênh đã chơi 1000 giờ (kênh không chơi; số thí nghiệm là của Ratio). Khớp câu đầu video.
A/B (YouTube Test & Compare, người dùng 2026-10-19): **「同じ2048なのに…1時間と1000時間で何が変わる？」** (27)
Dự phòng:
1. 「1時間 vs 1000時間。2048の差は「数学」だった」
2. 「2048で、絶対に作れない数字がある」 (cực đoan mà đúng: > 131072)
3. 「最強AIでも12回に1回。2048の「65536」の壁」
Cũ (v1, chưa đăng): 「2048はなぜ勝てないのか？ 数学が明かす「131072の壁」と運の正体」 (36) — dài, chung chung, không
khớp câu đầu.

## 説明 → `description.txt` (目次 chép từ `chapters.txt` sau khi build)
Nguồn mạch ý + số mô phỏng (ランダム・角ルール・エクスペクティマックス): video của kênh Ratio — mô tả ghi 「構成参考」 và nói rõ số
thí nghiệm là của video đó (người dùng có thể bỏ dòng 構成参考 khi đăng nếu muốn, nhưng giữ câu về nguồn số liệu).

## タグ → `tags.txt` · Problems → `problems.txt` (câu hỏi theo mốc chương)
