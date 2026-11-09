# 99% from scratch — kênh tiếng Anh (@99fromscratch)

Dạy toán từ số 0, tiếng Anh. Cấu hình máy đọc: `channel.json`. Quy trình: `docs/lesson/LESSON-VIDEO.md` (viết cho kênh
này trước, nên là mặc định của mọi công cụ).

| | |
|---|---|
| giọng | OmniVoice Atlas `03572937` + `atempo 1.08` (≈ 174 wpm) — `hkt-project/docs/OMNIVOICE_HANDOFF.md` §3 |
| intro | `projects/en/intro` (3D) → `out/en/intro/intro.mp4` 26 s (+ `intro-short.mp4` 11.3 s); 8 bài đầu dùng intro hkt cũ |
| biển cuối | "99% from scratch" + SUBSCRIBE, đứng yên ≥ 4 s |
| kịch bản / gói đăng | `templates/lesson/SCRIPT.md`, `templates/lesson/YOUTUBE.md` (English · Education · giọng tổng hợp = Yes) |
| Shorts | `docs/lesson/SHORTS.md` |

## Hệ hình hiện hành (người dùng chốt 2026-11-02, thay người que, LESSONS §246)

Nền sáng có lưới, thẻ bo góc viền màu theo nghĩa, dải chữ cho vài câu chốt, thanh chấm tiến độ (cách trình bày tham khảo kênh MathVis, không dùng nhân vật của họ). **Sửa cùng ngày (§247, `docs/study/16b-3blue1brown.md`): bỏ số 9. Ký tự λ chỉ biểu cảm trong đoạn chen ngắn, không tương tác với hình toán; mascot anime là người dẫn ở góc.** Thiết kế λ đã duyệt: `projects/en/_kit/lambda.js`, 8 đoạn chen ở `en/trig-explained/plates/common.js`. Code hệ hình: `projects/en/_kit/system.js`. Bài mẫu: `en/trig-explained`.

## Công thức video mới (người dùng 2026-11-02, LESSONS §243 §244)

| phần | làm gì |
|---|---|
| **5–30 s đầu: lát cắt** | Cắt nhanh các cảnh hay nhất của chính video, như trailer kênh sử, để tạo hook, tò mò, lời hứa và nói rõ người xem sẽ có gì. Dựng sau thân bài. Lát cắt phải có mục đích, hình cuối giữ đủ lâu để hiểu (§242). Kiểu dựng lát cắt đổi theo bài, trong cùng hệ hình |
| **Mở bài** (§250) | Vào đề ≤ 30 s, mỗi câu một hình, không đứng yên quá 3 s đầu, không thẻ mục lục dài |
| **Tư liệu thật** (§250) | Nhắc người, sách, năm, máy móc thật → ảnh/tài liệu PD/CC0 kèm chú thích, giữ màu gốc (`archive()` trong kit bài `en/imaginary`), kết hợp với hình toán |
| **Hệ hình cố định cả kênh** (§245) | Mọi video toán dùng cùng nền, bảng màu, font, người que, kiểu trình bày. Sáng tạo nằm ở hình minh hoạ từng ý. Thiết kế hệ hình: duyệt trước bài đầu |
| **Thumbnail** | **Từ 2026-11-06 thử ký tự λ thay cậu bé anime, gọn** (A/B zero-div: bản không anime 58,6 %, LESSONS §296); luôn là COMBO thumbnail + title (`tools/thumb/check.py --pair`, §297); mẫu `projects/en/trig-explained/thumbnail/thumbs-lambda.html`. Trước đó: cậu bé anime, chữ câu hỏi lớn, một vật toán: `out/en/<p>_public/youtube/thumb-tests/user-2026-11/` (6 bài, mỗi bài 3 ảnh); đổi dáng và bố cục giữa các bản |
| **Mascot trong video** | Người dẫn truyện ở góc: mở bài, đầu chương, kết. Không diễn toàn thân |
| **Ký tự λ** | Chỉ biểu cảm trong đoạn chen 3–8 s, nhìn ô chiếu hình đang nói, câu ngắn trong bong bóng; không chạm hình toán. Hình toán tự diễn phần lớn thời gian (§247, study 16) |

## Video

Nhật ký chi tiết (DNA, số cảnh, review, bài học): `docs/STATUS.md` (bảng trạng thái + nhật ký sản xuất).

| dự án | tiêu đề đăng | dài |
|---|---|---|
| `math-30k` | Mathematics After 30,000 Years | 19:21 |
| `zero-div` | Why You Can't Divide by Zero | 11:06 |
| `pemdas` | Is PEMDAS a Law of Math, or Just a Convention? (6 ÷ 2(1+2) Explained) | 10:08 |
| `fifty-percent` | The Coin Was Never Random – The Essence of Probability | 14:06 |
| `pi` | π Is Not Just 3.14 — You've Been Thinking About It Wrong | 10:44 |
| `neg-times-neg` | Why Is a Negative Times a Negative Positive? It's Not a Convention | 11:43 |
| `zero-power` | Why Is Anything to the Power of Zero Equal to 1? (And What Is 0⁰?) | 10:48 |
| `intuition` | Should You Trust Your Intuition in Math? (Monty Hall and 0.999… = 1) | 11:49 |
| `solid-geometry` | Why Is a Pyramid Exactly One Third of a Box? \| The 2,000-Year-Old Geometry Mystery | 19:21 |
| `sudoku` | The Hidden Ring Inside Every Sudoku (and Why 17 Clues Is the Minimum) — tiêu đề tạm | 11:02 |

MV của kênh (không phải bài học): `projects/mv/exp-log`, `projects/mv/add-it-up`, `projects/mv/99-intro` — `docs/mv/NEW-MV.md`.
