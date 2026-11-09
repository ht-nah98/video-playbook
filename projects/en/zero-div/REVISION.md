# zero-div bản 2 — sửa mở đầu + gói + vá thân (người dùng duyệt phạm vi 2026-10-22)

Bản 1 (2026-10-05) làm TRƯỚC chuẩn đóng gói (`docs/lesson/PACKAGING.md` §0b, 2026-10-19). Đo bản 1:
- khung 0.5 s gần trống (một gạch nhỏ); câu đầu "Imagine a world without zero" là câu dẫn — chữ "divide by zero" của
  title tới ~0:30 mới nghe; 0:14 "In our last video…" ở đúng chỗ đắt nhất;
- `pace.py`: đứng yên 76.7% (bài mới 50–60%), 29 đoạn ≥ 5 s; dài nhất 39 s @0:09 (mở đầu), 34 s @3:16, 34 s @6:24,
  27 s @9:03, 26 s @7:42, 26 s @4:05;
- intro kênh 26 s (kênh Anh bỏ intro từ 2026-10-19); chưa có thumbnail; title 59 ký tự.

## 1. Bốn dòng gói (§0b)

| | bản 2 |
|---|---|
| **Thumbnail** | trang giấy kẻ ô; một **máy tính bỏ túi** giơ lên, màn hình `1 ÷ 0` → **`ERROR`** đỏ; ngay dưới, cái **lỗ thủng** đen ở số 0 trên trục số. Chữ ≤ 3 cụm: chính màn hình máy tính. Mascot nhỏ (≤ 25% cao) góc trái, nhún vai. Che chữ vẫn hỏi: "sao máy tính chịu thua?" (loại **lạ**) |
| **Title** | A (tìm kiếm, ~5.200 lượt/tháng): `Why Can't You Divide by Zero? It's Not Just a Rule` (50) · B (khuôn thắng của kênh, A/B khác cơ chế): `Every Division Has an Answer Except One. Why?` (46) |
| **5 s đầu** | THẤY: máy tính trên trang, gõ `1 ÷ 0 =` → `ERROR` đỏ; lỗ ở 0 ngay dưới. Phụ đề: "Type one divided by zero into any calculator, and it refuses." |
| **30 s đầu** | lời hứa → bằng chứng (`? × 0 = 1`: thử 1, 5, 100 → đều ra 0, gạch đỏ) → lật hiểu lầm ("not a rule a teacher made up" — chữ RULE bị gạch → lỗ lớn dần) → hứa thứ lớn hơn (một lỗ chứng minh toán là một HỆ THỐNG) |

Cặp (§2a): thumbnail cho thấy máy tính chịu thua; title nói "vì sao — không phải luật". Không lặp từ khoá ("ERROR" chỉ ở
thumbnail, "rule" chỉ ở title). Câu phụ đề đầu nói đúng vật của thumbnail.

## 2. Lời mở đầu mới (thay `## Cold open`, ~55 s, rồi vào thẳng ACT ONE — không intro)

| # | lời (đọc) | người xem THẤY |
|---|---|---|
| 1 | Type one divided by zero into any calculator, and it refuses. | máy tính giữa trang, phím bấm `1 ÷ 0 =`, màn hình nháy **ERROR** đỏ; lỗ ở 0 trên trục số dưới |
| 2 | Every other division has an answer. This one does not. Why? | `12 ÷ 3 = 4`, `7 ÷ 2 = 3.5`, `1 ÷ 1000 = 0.001` hiện nhanh thành cột, dòng `1 ÷ 0 =` trống, dấu ? đỏ |
| 3 | Division is really a question: what number, times zero, gives you one? | `? × 0 = 1` viết tay, ô ? nhấp nháy |
| 4 | Try any number you like. One, five, a hundred. Times zero, it always comes back as zero. Never one. | 1, 5, 100 lần lượt rơi vào ô ? → kết quả `0` → gạch đỏ ✗ ba lần |
| 5 | So this is not a rule some teacher made up to annoy you. | chữ **RULE** đóng dấu, bị gạch đỏ |
| 6 | It is a hole in arithmetic itself, and in almost fourteen hundred years, nobody has managed to patch it. | lỗ ở số 0 lớn dần, miếng vá giấy rơi tuột qua lỗ (nhắc lại cái kết của bài) |
| 7 | And that one hole turns out to be the best proof we have that mathematics is not a pile of rules, but a system. | các phép tính trên trang nối với nhau bằng nét mực thành mạng — mạng chỉ hở đúng ở lỗ |
| 8 | Zero was the last of the familiar numbers to arrive, and it brought that hole along with it. | trục số: số 0 hiện cuối cùng, kéo theo lỗ |
| 9 | So in this video, we'll find out why zero was so hard to accept as a number at all. | mục lục 1 (chữ to hơn bản 1, có vật nhỏ minh hoạ) |
| 10 | Why dividing by zero makes no sense, no matter which way you look at it. | mục lục 2 |
| 11 | And what your computer actually does when you ask it anyway. | mục lục 3 — terminal mini `1/0 → Infinity`, `0/0 → NaN` hé 2 s (Jenga) |
| 12 | But first, we have to go back to a time when nobody needed zero at all. | camera lao vào lỗ → đen → mở iris ra người chăn cừu (Hồi 1, giữ nguyên) |

Bỏ khỏi mở đầu: "In our last video…" (đã có ở mô tả: "Previous video"). "Imagine a world without zero" và đoạn bàn phím
không có số 0 dời thành mở đầu Hồi 1 nếu cần (không bắt buộc — Hồi 1 đã mở bằng người chăn cừu).

## 3. Vá thân bài (p2 giữ giọng, chỉ sửa hình ở các đoạn đứng yên dài nhất)

| giờ bản 1 | cảnh | việc |
|---|---|---|
| 3:16 (34 s) | `b2-jobs` | thêm chuyển động bám từ đọc: mỗi ví dụ một vật mới / đổi bố cục |
| 6:24 (34 s) | `c3-limit` | camera đẩy theo bảng 1/x khi số nhỏ dần; đồ thị vẽ dần |
| 9:03 (27 s) | `d2-computer` | terminal gõ từng lệnh đúng lúc đọc, con trỏ chạy |
| 7:42 / 4:05 (26 s) | `d1-inf` / `c1-ops` | nếu còn thời gian |
Soi lại bằng `pace.py` sau build; mục tiêu đứng yên ≤ ~60%.

## 4. Người que (người dùng chọn "thử ở bàn thử")

Một khoảnh khắc ~8 s cho dòng 6 ("a hole in arithmetic"): người que đi dọc trục số từ 5 về 0, bước hụt vào lỗ, rơi,
bám mép lỗ bằng một tay rồi tự kéo mình lên ngồi ở mép (hoặc rơi hẳn). Làm ở `tools/lab/` bằng `engine/stickmove.js`,
qua gác số mọi khung, clip để người dùng duyệt — **chưa duyệt thì video không có người que** (LESSONS §136).

## 5. Build
`build.json` bỏ phần `{"intro": true}` và khoá `intro`; p1 đọc giọng lại (narrate → align → mouth_env), p2 giữ giọng
(`build.py --keep` không dùng được cho p2 vì sửa plates → render lại các đoạn có cảnh đổi). Gói đăng: title, mô tả,
chương (lệch −26 s + mở đầu mới), problems, tags tính lại bằng code (LESSONS §42).
