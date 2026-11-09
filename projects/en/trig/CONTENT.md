# trig — Pha 0: bóc tách nội dung

**Chủ đề:** Sine Was Never About Triangles · lời đọc tiếng Anh · nguồn: bài người dùng gửi 2026-10-20 "Bản chất của
lượng giác" — nguyên văn ở `SCRIPT.vi.md`. Người dùng chọn kênh Anh + gói A ("không có tam giác") 2026-10-20.

## Cổng ý tưởng (docs/lesson/PACKAGING.md §1)
- **Góc nhìn gốc trượt cổng:** "Bản chất của lượng giác" = "The Essence of Trigonometry" — tên chương sách, đúng kiểu
  đã thua 3 lần trên kênh Anh ("The Essence of Probability" 6 view / 7 ngày, PACKAGING §1). Đổi góc nhìn, giữ nội dung.
- **Góc nhìn mới (đã có sẵn trong Phần 3 của bài):** máy tính trả lời sin 120° = 0.866 ngay, nhưng không tam giác vuông
  nào có góc 120° → con số ấy đến từ đâu? Khuôn thắng kênh Anh: điều quen thuộc có vẻ KHÔNG THỂ — vì sao?
- **Thumbnail một vật + ≤ 3 từ:** máy tính hiện `sin 120° = 0.866` + một tam giác vuông bị kéo gãy · chữ 「HOW?」.
- **3 câu hỏi có mâu thuẫn:** 1. Vì sao mỗi góc mang đúng một con số cố định (sin)? 2. Máy tính tìm sin của góc mà
  không tam giác nào chứa được bằng cách nào? 3. Vì sao cùng đường tròn ấy nằm trong mọi sóng?
- **Người lạ có quan tâm?** Ai cũng từng học SOH-CAH-TOA và có máy tính; ai cũng nghe nhạc / dùng điện → nối được.
- **Trần + ngoại lệ:** chưa đo (phiên vidIQ hết hạn 2026-10-20). Chủ đề có trần cao (3Blue1Brown, Khan); điểm khác của
  ta là móc "máy tính vs tam giác" chứ không phải "unit circle explained". Đo lại trước khi đăng.
- **80% khán giả bài trước:** π, 2^√2, 3 centres — cùng "điều quen → toán phía sau". Đạt.

## Mạch bài (giữ 7 phần của người dùng, đổi mở đầu)
| # | phần gốc | hồi | trả lời câu hỏi |
|---|---|---|---|
| 0 | Mở đầu (câu vè) | Cold open mới 30 s bốn nhịp: sin 120° → sin(−30°), sin 1000° → "không phải SOH-CAH-TOA, là điểm chạy trên đường tròn" → "đường tròn nhìn nghiêng = mọi sóng" | hứa cả 3 |
| 1 | P1 đo cái không chạm được | ACT ONE Measuring the unreachable | bối cảnh |
| 2 | P2 tỉ số có tên riêng | ACT TWO One number per angle (+ nguồn gốc chữ "sine": dây cung) | **Q1** |
| 3 | P3 tam giác hết dùng | ACT THREE Stuck below ninety | dựng Q2 |
| 4 | P4 đường tròn đơn vị | ACT FOUR The unit circle — trả lời 0.866 rõ ràng ~5 phút | **Q2** (lời hứa của title) |
| 5 | P5 radian | ACT FIVE Why radians | cầu nối góc = quãng đường |
| 6 | P6 đường tròn → sóng | ACT SIX The circle becomes a wave | **Q3** |
| 7 | P7 công thức | ACT SEVEN The formulas are the circle | |
| 8 | Kết (Fourier) | Everything that repeats → Putting it together → Next time | |

## Soát sự kiện — CẦN SỬA
- "hệ số phụ rất dương gia" → hệ số **π/180**: d/dx sin(x°) = (π/180)·cos(x°). Nói thành lời trong SCRIPT.
- "Đường cos y như vậy, chỉ lệch đi một chút" → lệch **đúng một phần tư vòng** (π/2): cos θ = sin(θ + π/2).
- "Con lắc" dao động hình sin **chỉ với góc lắc nhỏ** → nói "a pendulum making small swings".
- Hipparchus: "người lập bảng lượng giác đầu tiên mà ta biết" — đúng, nhưng bảng của ông là **bảng DÂY CUNG trong
  đường tròn**, không phải tỉ số tam giác vuông (Toomer; MacTutor "Hipparchus"). Đây là bằng chứng cho title → đưa vào.
- "Sin đi học, cos không hư" là câu vè tiếng Việt → bản Anh dùng **SOH-CAH-TOA**.

## Đúng — giữ nguyên (đã kiểm)
- trigonometry = τρίγωνον (trigōnon, tam giác) + μέτρον (metron, đo). Từ "trigonometria" do Bartholomaeus Pitiscus
  đặt năm 1595 (không đưa vào lời).
- Hipparchus xứ Nicaea, nhà thiên văn Hy Lạp, k. 190 – k. 120 TCN; bảng gốc thất lạc, biết qua Ptolemy (Almagest,
  k. 150 CN) và Theon xứ Alexandria. "More than two thousand years ago" — đúng.
- 360°: thường gắn với người Babylon và hệ cơ số 60 — lời nói "probably" (giả thuyết, không chắc chắn).
- Radian = cung / bán kính; 1 vòng = 2π; 180° = π; 90° = π/2. d/dθ sin θ = cos θ (θ radian).
- sin 30° = 0.5 · sin 120° = 0.8660 · sin(−30°) = −0.5 · sin 1000° = sin 280° = −0.9848 (1000 = 2·360 + 280)
  — tính bằng code 2026-10-20.
- sin²θ + cos²θ = 1 ⇔ x² + y² = 1 trên đường tròn đơn vị.
- Joseph Fourier (Jean-Baptiste Joseph Fourier, nhà toán học & vật lý Pháp, 1768–1830): luận văn về nhiệt 1807,
  "Théorie analytique de la chaleur" 1822 → "early eighteen hundreds".
- Ứng dụng Fourier: nén nhạc (MP3 / AAC dùng MDCT — biến đổi họ Fourier), MRI dựng ảnh bằng biến đổi Fourier,
  4G/5G dùng OFDM (chia tín hiệu thành nhiều sóng sin). Lời nói chung "inside the signals that carry mobile data".
- Điện xoay chiều 50 Hz / 60 Hz tuỳ nước → "fifty or sixty times a second".

## Lấp thông tin (đề xuất — đã đưa vào SCRIPT, người dùng duyệt cùng SCRIPT)
- **Nguồn gốc chữ "sine"** (MacTutor, "The trigonometric functions"; Merriam-Webster): Ấn Độ *jyā* / *jīvā* = dây
  cung (của cây cung — chính là dây cung của một cung tròn) → Ả Rập phiên âm *jība*, viết không nguyên âm *jb*, đọc
  nhầm thành *jayb* (nếp gấp, túi áo) → dịch giả Latin thế kỷ 12 viết *sinus* (nếp gấp) → "sine". Hai tác dụng: mạch
  phụ vui ở ACT TWO, và **lý do tin cho title**: sin sinh ra từ dây cung của đường tròn, không phải từ tam giác vuông.

## Tiếng hiệu ứng (docs/lesson/SFX.md)
Chờ DNA.

## Ảnh (tự lấy — Commons API; trang web → Chrome headless)
| file | nội dung | loại | gợi ý tìm |
|---|---|---|---|
| hipparchus | Hipparchus (k. 190–120 TCN, nhà thiên văn Hy Lạp) — tranh / tượng đời sau | tưởng tượng (ghi rõ) | Commons "Hipparchos" |
| almagest | trang Almagest (bản chép tay) có bảng dây cung | hiện vật | Commons "Almagest manuscript" |
| aryabhatiya / jya | trang sách thiên văn Ấn Độ có bảng jyā (Aryabhata, 499 CN) | hiện vật | Commons |
| fourier | chân dung Joseph Fourier (1768–1830) | thật | Commons "Joseph Fourier" |
| plimpton / babylon | bảng đất sét Babylon (hệ 60) | hiện vật | Commons "YBC 7289" |
| ac / oscilloscope | sóng điện xoay chiều trên máy hiện sóng | thật | Commons |

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
sin 120° = 0.866 · sin(−30°) = −0.5 · sin 1000° ≈ −0.985 · 1000 = 2·360 + 280 · sin 30° = 0.5 · 2π / π / π/2 ↔
360° / 180° / 90° · π/180 · cos θ = sin(θ + 90°) · sin² + cos² = 1.

### Thêm khi dựng cảnh (2026-10-20, đạo diễn duyệt)
- 2π ≈ 6.28 (bán kính quanh một vòng) · góc minh hoạ 2 rad ↔ cung dài 2 trên vòng bán kính 1 (ví dụ, tính trong code) ·
  bộ đếm góc khi cabin quay tới 1000° (đi qua 865°…) là số chạy, không phải dữ kiện · d/dθ sin θ° = (π/180) cos θ° ·
  sin(θ + 2π) = sin θ · sin(−θ) = −sin θ · sin 2θ = 2 sin θ cos θ · điện xoay chiều 50 / 60 lần mỗi giây.
