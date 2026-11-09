# calculus — Pha 0: bóc tách nội dung

**Chủ đề:** The Impossible Question That Created Calculus · lời đọc tiếng Anh · nguồn: bài người dùng gửi 2026-10-21
"Bản chất của đạo hàm và tích phân" — nguyên văn ở `SCRIPT.vi.md`. Người dùng giao toàn quyền ("bạn tự triển khai…
tôi sẽ review khi có kết quả cuối cùng"): kênh Anh, gói A, DNA do đạo diễn chọn.

## Cổng ý tưởng (docs/lesson/PACKAGING.md §1)
- **Góc nhìn gốc trượt cổng:** "Bản chất của đạo hàm và tích phân" = tên chương. Cứu bằng câu "không thể" CÓ SẴN trong
  bản gốc (LESSONS §124): "một điểm thì không có điểm đầu, cũng không có điểm cuối — độ dốc tính từ đâu?" → 0:00.
  Câu trả lời gây bất ngờ (đúng BẰNG 2, không phải "không xác định") nói trong 30 s đầu.
- **Thumbnail một vật + ≤ 3 cụm:** cái chén / con dốc có MỘT điểm sáng, cây thước (tiếp tuyến) áp vào, chữ 「0 ÷ 0 = 2?」.
  Loại "lạ" — mạnh nhất kênh Anh (2^√2 = ?). Nối với bài cũ zero-div (luật 80%).
- **3 câu hỏi có mâu thuẫn:** 1. Một điểm sao có độ dốc? 2. Giới hạn là gì, sao vắt được đáp số từ 0/0? 3. Vì sao độ
  dốc và diện tích, đạo hàm và tích phân, là hai mặt một đồng xu?
- **Người lạ có quan tâm?** Ai cũng từng leo dốc và nhìn đồng hồ tốc độ → có.
- **Trần + ngoại lệ:** chưa đo (vidIQ hết hạn). "calculus explained / essence of calculus" có trần rất cao (3Blue1Brown
  hàng triệu view) — đo lại trước khi đăng.
- **80%** khán giả bài trước (logarithm, trig): cùng chuỗi "điều quen → toán phía sau". Đạt.

## Mạch bài
| # | phần gốc | hồi | trả lời |
|---|---|---|---|
| 0 | Mở đầu (con dốc, một điểm) | Cold open bốn nhịp: dốc tại chân → rise/run cần 2 điểm → 0 ÷ 0 → "không phải không có gì: đúng bằng 2" → chạy ngược: vô số lát mỏng → diện tích đúng (Archimedes) | hứa cả 3 |
| 1 | Phần 1 cát tuyến | ACT ONE Two points (y = x², (1,1), (2,4), dốc 3, là TRUNG BÌNH) | |
| 2 | tiến gần + xoay + tiếp tuyến | ACT TWO Closer and closer (2.5, 2.1, 2.01, 2.001 → 2; cát tuyến xoay; thước áp chén) | **Q1** |
| 3 | Giới hạn | ACT THREE The hole ((x²−25)/(x−5), 4.9/4.99/5.1/5.01 → 10, đường thẳng thủng một lỗ) | **Q2** |
| 4 | Phần 4 đạo hàm (gốc thiếu 5:05–7:45) | ACT FOUR The derivative (dốc cát tuyến = 2 + h → 2; mọi x: 2x; đồng hồ tốc độ; Newton, Leibniz 1684) | Q1 trọn |
| 5 | Phần 5 tích phân (gốc thiếu 9:05–10:17) | ACT FIVE Adding up thin slices (4 dải: 0.47 / 0.22; 10, 100, 1000; khe = 1/n; ⅓; Archimedes) | |
| 6 | Kết luận "hai mặt" | ACT SIX Two sides of one coin (diện tích lớn lên với tốc độ = chiều cao; x³/3 → x²; công-tơ-mét ↔ đồng hồ tốc độ; định lý cơ bản) | **Q3** |
| 7 | Kết | ACT SEVEN Putting it together + Next time | |

## Soát sự kiện — CẦN SỬA / BỎ
- Đoạn tài trợ Odoo / TikTok Shop (1:05–1:57) và câu "nhiều học sinh thấy giải tích mơ hồ" → bỏ (không phải nội dung
  bài; kênh không có nhà tài trợ).
- Bản gốc kết "đạo hàm và tích phân là hai mặt của cùng một vấn đề" mà không chỉ ra vì sao → ACT SIX chứng minh bằng
  hình (dải mỏng cuối cùng: diện tích thêm ÷ h = chiều cao).
- "Biểu thức này không xác định tại x = 5" → giữ ý, lời đọc "has no value" (dễ nghe hơn "undefined").

## Đúng — giữ nguyên (đã kiểm bằng code 2026-10-21)
| sự kiện | giá trị | ghi chú |
|---|---|---|
| y = x², x = 1 → y = 1; x = 2 → y = 4 | dốc cát tuyến (4 − 1)/(2 − 1) = 3 | |
| x = 1.5 → y = 2.25, (2.25 − 1)/0.5 = 2.5 | | |
| x = 1.1 → y = 1.21, 0.21/0.1 = 2.1 | | |
| x = 1.01 → 2.01 · x = 1.001 → 2.001 | dốc = 2 + h | không giá trị nào vượt qua 2 (h > 0) |
| (x² − 25)/(x − 5): 4.9 → 9.9 · 4.99 → 9.99 · 5.1 → 10.1 · 5.01 → 10.01 | = x + 5 khi x ≠ 5 → giới hạn 10 | lỗ tại (5, 10) |
| ((1 + h)² − 1)/h = (2h + h²)/h = 2 + h | h = 0.1 → 2.1, h = 0.01 → 2.01 | |
| ((x + h)² − x²)/h = 2x + h → 2x | x = 1 → 2, x = 3 → 6, x = 0 → 0 | |
| Isaac Newton (nhà toán học, vật lý Anh, 1643–1727): phương pháp fluxion ~1665–66 | "sixteen sixties" | MacTutor "Newton" |
| Gottfried Wilhelm Leibniz (nhà toán học, triết học Đức, 1646–1716): giải tích 1673–76, công bố "Nova Methodus pro Maximis et Minimis" (Acta Eruditorum) 1684 | "sixties and seventies… Leibniz published his first, in 1684" | MacTutor "Leibniz"; Newton công bố muộn hơn (Principia 1687 dùng hình học; fluxion in 1704/1736) |
| Tổng dưới / trên của ∫₀¹ x² dx, n dải đều | n = 4: 0.21875 / 0.46875 ("about 0.22 / 0.47") · n = 10: 0.285 / 0.385 · n = 100: 0.32835 / 0.33835 ("0.328 / 0.338") · n = 1000: 0.3328335 / 0.3338335 (cùng 0.33) | tính bằng Fraction |
| khe tổng trên − tổng dưới = 1/n | 0.25, 0.1, 0.01, 0.001 | đúng chính xác (f(1) − f(0) = 1, mỗi dải rộng 1/n) |
| ∫₀¹ x² dx = 1/3 | ∫₀ˣ t² dt = x³/3, (x³/3)' = x² | |
| Archimedes (nhà toán học Hy Lạp, ~287–212 TCN), "Quadrature of the Parabola": diện tích mảnh parabol = 4/3 tam giác nội tiếp, bằng phương pháp vét cạn (chặn trên + dưới, phản chứng kép) | "more than two thousand years ago… in the same spirit" | hơn 2,200 năm |
| Định lý cơ bản của giải tích: Newton và Leibniz đều nhận ra vi phân ↔ tích phân là ngược nhau | "both saw this connection" | Isaac Barrow có dạng hình học trước đó — không nhắc để khỏi rối |
| đồng hồ tốc độ = đạo hàm quãng đường theo thời gian; công-tơ-mét = tích phân tốc độ | | |

## Tiếng hiệu ứng
Chờ DNA (thư viện `assets/sfx/library.json`).

## Ảnh (tự lấy — Commons API)
| key | nội dung | loại |
|---|---|---|
| newton | Isaac Newton, chân dung Godfrey Kneller 1689 | thật (tranh) |
| leibniz | Gottfried Wilhelm Leibniz, chân dung Christoph Bernhard Francke ~1695 | thật (tranh) |
| nova | trang đầu "Nova Methodus…" Acta Eruditorum 1684 | hiện vật |
| archimedes | Archimedes — tranh Domenico Fetti 1620 (tưởng tượng) | tưởng tượng |

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
Mọi số trên hình lấy từ bảng trên bằng code (`kit.js` `must`): dốc cát tuyến, giá trị biểu thức quanh 5, tổng Riemann,
1/n, x³/3. Thước tiếp tuyến tại (1, 1): y = 2x − 1.
