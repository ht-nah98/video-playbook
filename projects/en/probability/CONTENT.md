# probability — Pha 0: bóc tách nội dung

**Chủ đề:** bản chất xác suất + cách giải bài, mở bằng cược của de Méré (1654) · lời đọc tiếng Anh · nguồn: yêu cầu người
dùng 2026-10-23 (`SCRIPT.vi.md`) + nghiên cứu `docs/study/09-probability.md`. Bài TIỀN ĐỀ cho fifty-percent.

## Cổng ý tưởng (docs/lesson/PACKAGING.md §1)
- Thumbnail phác được: **hai bàn cược** — 1 xúc xắc ×4 → 51.8% (xanh) | 2 xúc xắc ×24 → 49.1% (đỏ) + ≤ 3 từ.
- **3 câu hỏi có mâu thuẫn**: 1. Hai cược "cùng tỉ lệ 2/3" — sao một thắng một thua? 2. Xác suất thật ra là gì, và vì
  sao trực giác của ta đếm sai? 3. Làm sao giải một bài xác suất mà không đoán?
- **Người lạ có quan tâm?** Ai cũng từng tung xúc xắc / chơi cược / làm bài thi xác suất; "cách tính nghe hợp lý mà sai".
- **Trần**: nhập môn "basic probability" 4–6M (Math Antics, Khan), Bayes 4.5–6M, nghịch lý 4–40M (`09-probability.md` §1).
  Video "The Essence of Probability" của kênh: 6 view / 7 ngày → tên chương bị cấm ở gói.
- **80%**: khán giả π / 0⁰ (điều quen mà sai) quan tâm; nối sang fifty-percent ở cuối.

## Mạch bài
| # | ý | khái niệm | vì sao quan trọng |
|---|---|---|---|
| 0 | cược de Méré, mô phỏng 10.000 ván | — | móc: "cách tính hợp lý" mà sai |
| 1 | xác suất = phần ÷ toàn bộ, với khả năng NGANG NHAU | không gian mẫu, biến cố, đường 0–1, tổng = 1 | gốc của mọi bài |
| 2 | 11 tổng ≠ 36 cặp | thiên kiến ngang khả năng | lỗi số 1 của người học (nghiên cứu) |
| 3 | cộng 4 × 1/6 sai → 7 lần = 7/6 | "hoặc" chồng nhau | thấy cái sai bằng chính nó |
| 4 | đếm cái ngược lại: (5/6)^4 → 671/1296 | phần bù, "và" = nhân | giải xong cược 1 — đúng số trong thư Pascal |
| 5 | (35/36)^24 → 49.1%; 25 lần → 50.6% | cùng công cụ | giải xong cược 2 |
| 6 | năm bước giải bài | lưới/cây, phần bù, nhân/cộng, 1000 người, kiểm | dùng được khi đi thi |
| 7 | cầu nối | 50% mô tả cái gì? | → fifty-percent |

## Đúng — giữ nguyên (đã kiểm)
- Thư Pascal gửi Fermat **29/7/1654**: de Méré thấy "lỗi trong các con số": cược 6 trong 4 lần "lợi như 671 với 625";
  đôi sáu với hai xúc xắc, 24 lần thì bất lợi; "vậy mà 24 với 36 như 4 với 6" → "số học tự mâu thuẫn" (Smith 1929, p. 552,
  qua Gorroochurn, *The American Statistician* 2011, "Errors of Probability in Historical Context").
- Chevalier de Méré = Antoine Gombaud (1607–1684); qua Pierre de Carcavi → Pascal → Fermat (luật sư ở Toulouse).
  Thư Pascal–Fermat 1654 thường được coi là khởi đầu của lý thuyết xác suất (Gorroochurn; nhiều sách lịch sử).
- "Luật cũ của dân cờ bạc": số lần ÷ số mặt = tỉ lệ → 4/6 = 24/36 = 2/3 (Gorroochurn: Old Gambler's Rule).
- **Lưu ý trung thực:** Ore (1960) nghi de Méré không thể thấy khác biệt chỉ bằng chơi — cần ~3.400 ván để chênh lệch
  bằng một độ lệch chuẩn, ~13.000 ván để chắc 95% (tính bằng code). Kịch bản KHÔNG nói "ông thua nhiều tiền nên phát
  hiện"; chỉ nói ông tin hai cược bằng nhau, và số học nói khác.

## Số (tính bằng `fractions`, scratch 2026-10-23)
| đại lượng | giá trị |
|---|---|
| ít nhất một 6 trong 4 lần | 1 − (5/6)⁴ = 671/1296 = **51.77%** (không 6: 625/1296) |
| ít nhất một đôi 6 trong 24 lần | 1 − (35/36)²⁴ = **49.14%**; 25 lần **50.55%** |
| cách cộng | 4 × 1/6 = 24 × 1/36 = 2/3; 7 lần → 7/6 (thật 72.1%) |
| hai xúc xắc | 36 cặp; tổng 7: 6/36 = 1/6; tổng 12: 1/36; 11 tổng 2…12 |
| ít nhất một 6 (hai xúc xắc) | 11/36; không 6: 25/36 |
| túi 3 đỏ 2 xanh, bốc 2 không hoàn lại, cả hai đỏ | 3/5 × 2/4 = **3/10** |
| xét nghiệm đúng 99%, sai 1%, bệnh 0.1% | 1000 người: 1 bệnh (dương tính) + ~10 dương tính giả → 1/11 ≈ **9%** (chính xác 9.02%) |
| sinh nhật 23 người | **50.7%** (bài tập cuối) |

## Soát sự kiện — CẦN SỬA
- (chưa có)

## Tiếng hiệu ứng
| khoảnh khắc | loại | nguồn |
|---|---|---|
| xúc xắc lăn / rơi | cần thêm "dice roll" CC0 | tự tải (§fetch-sfx) |
| xu cược / thắng thua | coin (có sẵn?) | kiểm assets/sfx |

## Ảnh
| file | nội dung | loại | gợi ý tìm |
|---|---|---|---|
| pascal.jpg | Blaise Pascal, nhà toán học Pháp, 1623–1662 | chân dung thật | Commons |
| fermat.jpg | Pierre de Fermat, luật sư và nhà toán học Pháp, 1601–1665 | chân dung thật | Commons |
| letter-1654 | thư Pascal–Fermat 1654 (bản in Œuvres de Fermat) | hiện vật | Commons / Gallica — kiểm có không |
| de Méré | Antoine Gombaud — không có chân dung chắc chắn → người que vai dân cược | tưởng tượng | — |
