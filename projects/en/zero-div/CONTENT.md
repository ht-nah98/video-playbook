# zero-div — Pha 0: bóc tách nội dung

**Chủ đề:** Why You Can't Divide by Zero · lời đọc tiếng Anh · nguồn: bài người dùng gửi 2026-10-05, lưu nguyên văn ở
`SCRIPT.vi.md`. Video thứ hai của kênh — "đi sâu" một điểm dừng của math-30k (Brahmagupta, 628), như outro math-30k đã hứa.

## Mạch bài
| # | phần | ý | "vì sao quan trọng" |
|---|---|---|---|
| 0 | mở bài | thế giới không có số 0; số 0 đến muộn nhất, mang theo một lỗ trong phép chia | hứa: vì sao 0 khó, vì sao chia cho 0 vô nghĩa, vì sao cái lỗ chứng tỏ toán học chặt |
| 1 | 0 ra đời muộn | đếm cừu không cần 0; La Mã không cần; 305 vs 35 → cần giữ chỗ; Babylon giữ chỗ; Brahmagupta 628 biến 0 thành số; lan qua thế giới Hồi giáo → Fibonacci 1202 | "không có gì" thành đối tượng toán học |
| 2 | hai vai trò | giữ chỗ (35 / 305 / 3050) · con số thật (5 − 5, rổ rỗng, gốc toạ độ) | vai trò thứ hai kéo theo phép chia |
| 3 | mọi phép đều ổn trừ chia | 7 + 0, 7 − 0, 7 − 7, 7 rổ × 0 táo, 0 rổ × 7 táo; Brahmagupta 0/0 = 0; Bhaskara II "khahara" | không định nghĩa nào nhất quán |
| 4 | chia là gì | 12 ÷ 3 = 4 ⇔ 4 × 3 = 12; 12 ÷ 0: không x nào; 0 ÷ 0: mọi x | hai kiểu không xác định; mất tính DUY NHẤT |
| 5 | giới hạn | 1/0.1, 1/0.01, 1/0.001 → 10, 100, 1000; phía âm → −10, −100, −1000; x/x → 1, 2x/x → 2, x²/x → 0 | giới hạn không tồn tại; 0/0 vô định |
| 6 | sao không gán = ∞ | ∞ × 0 = 1 và = 2; 1 + ∞ = 2 + ∞ ⇒ 1 = 2; mặt cầu Riemann: được, nhưng trả giá | toán học cho phép, nhưng phải đánh đổi |
| 7 | máy tính | số nguyên: dừng với lỗi; IEEE 754: +∞, −∞, NaN, +0 và −0, NaN ≠ NaN, ∞ × 0 = NaN | quy ước thực dụng, không phải lời giải |
| 8 | kết | số âm vá phép trừ, phân số vá phép chia, i vá căn — chia cho 0 là lỗ không loại số mới nào vá MIỄN PHÍ | toán học là hệ thống, không phải quy ước tuỳ tiện |

## Soát sự kiện — CẦN SỬA (đã sửa trong SCRIPT.md)

1. **Al-Khwarizmi "nhà toán học Ả Rập"** → người Ba Tư, viết bằng tiếng Ả Rập, làm việc ở Baghdad: "scholars of the
   Islamic world".
2. **Babylon "nhận ra từ rất sớm"** → ký hiệu giữ chỗ (hai nêm nghiêng) chỉ xuất hiện khoảng thế kỷ 3 TCN (thời
   Seleucid), sau hơn một nghìn năm viết hệ 60 không có nó. Họ đếm cơ số 60 → ví dụ 305/35 là minh hoạ bằng hệ 10.
   Không bao giờ đặt ở cuối số: ĐÚNG.
3. **"Ai Cập, La Mã, Hy Lạp không ai có con số cho không có gì"** quá tuyệt đối: thư lại Ai Cập có từ *nfr* ("nefer")
   cho số dư 0 trong sổ sách; người Maya tự phát minh số 0 (lịch Long Count). Luận điểm giữ được và mạnh hơn: nhiều
   nơi có KÝ HIỆU, Ấn Độ là nơi biến nó thành CON SỐ có luật tính.
4. **IEEE 754 "số âm chia 0 ra −Infinity"** chỉ đúng với +0; IEEE có cả +0 và −0: 1 / (−0) = −Infinity. Thêm vào —
   nối với Phần 5 (hai phía).
5. **"Cái lỗ duy nhất trong số học"** → trong số nguyên 7 ÷ 2 cũng không có đáp án, căn số âm cũng không có trong số
   thực — nhưng mấy lỗ đó được VÁ bằng loại số mới (phân số, số phức). Chia cho 0 là lỗ duy nhất trong bốn phép tính
   mà không loại số mới nào vá được mà không phải trả giá.
6. **Phần 6 "bỏ giao hoán / kết hợp / phân phối"** chung chung → thay bằng phản chứng cụ thể: 1 + ∞ = ∞ = 2 + ∞, trừ
   ∞ hai vế ⇒ 1 = 2. Ví dụ thật của "đánh đổi": mặt cầu Riemann (đường thẳng thực mở rộng xạ ảnh) — 1/0 = ∞ hợp lệ,
   nhưng ∞ không có dấu, và 0 × ∞, ∞ − ∞, 0/0 vẫn không định nghĩa.

## Đúng — giữ nguyên (đã kiểm)

- Brahmagupta, *Brāhmasphuṭasiddhānta*, năm 628: a + 0 = a, a − a = 0, a × 0 = 0, **0 / 0 = 0**; a / 0 để là "phân số
  có mẫu 0". "Gần 1400 năm" (628 → 2026 = 1398): đúng.
- Bhāskara II, *Bījagaṇita*, khoảng 1150 (≈ 500 năm sau): a / 0 = *khahara*, đại lượng vô hạn, thêm bớt không đổi.
- Al-Khwarizmi khoảng 820 (sách về số Ấn Độ); Fibonacci *Liber Abaci* 1202; châu Âu dùng rộng rãi khoảng thế kỷ 16.
- La Mã: I V X L C D M, không có ký hiệu cho 0.
- Chia là nhân ngược; 12 ÷ 0 không có x; 0 ÷ 0 mọi x; giới hạn 1/x tại 0 không tồn tại (±∞ hai phía); x/x → 1,
  2x/x → 2, x²/x → 0: dạng vô định.
- Số nguyên chia 0: Python `ZeroDivisionError`, Java `ArithmeticException`, C là hành vi không xác định (thường dừng
  chương trình) → "most languages stop with an error".
- IEEE 754 (1985), đã chạy thật bằng node: `1/0` → `Infinity`, `1/-0` → `-Infinity`, `0/0` → `NaN`,
  `NaN === NaN` → `false`, `Infinity * 0` → `NaN`, `Infinity - Infinity` → `NaN`.

## Lấp thông tin (đã thêm)

- Mở bài nối với math-30k ("in our last video… one stop went by in a few seconds").
- Mặt cầu Riemann làm ví dụ "đánh đổi" (Riemann đã xuất hiện ở math-30k).
- ±0 và ∞ × 0 = NaN của máy tính: máy tính "học lại" đúng bài học Phần 6.
- Kết nối với chủ đề "nới rộng thế nào là hợp lệ" của math-30k: số âm, phân số, số phức đều là vá lỗ.

## Hình cần đúng (tính trong code, ném lỗi nếu sai)

- Bảng 1/x: 1/0.1 = 10, 1/0.01 = 100, 1/0.001 = 1000 và phía âm; đồ thị y = 1/x vẽ bằng hàm, hai nhánh tiệm cận.
- x/x, 2x/x, x²/x: đồ thị có LỖ tại x = 0 (chấm rỗng), giá trị tiến về 1, 2, 0.
- 7 rổ × 0 táo, 0 rổ × 7 táo: đếm táo trên hình = 0.
- Terminal: chép đúng kết quả node ở trên.

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
