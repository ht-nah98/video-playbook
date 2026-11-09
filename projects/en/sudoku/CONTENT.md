# sudoku — Pha 0: bóc tách nội dung

**Chủ đề:** The Hidden Math Inside Every Sudoku (tên tạm) · lời đọc tiếng Anh · nguồn: lời thoại 3 video Numberphile
người dùng gửi 2026-10-09 (nguyên văn ở `SCRIPT.vi.md`). Người dùng: *"bài này tôi tổng hợp… rất cần bạn hoàn thiện
nội dung, tuyến nội dung sắp xếp ý sao cho hợp lý"*. Như bài pi: nguồn là lời bình kênh khác → dùng làm tư liệu,
kịch bản viết lại bằng lời của kênh, sắp lại mạch, sửa lỗi.

**Độ dài:** SCRIPT v1 dài 2097 từ (có hồi giải chi tiết) ≈ **11:00–11:30** kể cả intro (0.31 s/từ như intuition).

**Ý trung tâm (đề xuất, chốt ở DNA):** *đếm mà không cần biết* — một hàng/cột/khối đã đủ thì ta biết chính xác nó
chứa gì mà không cần biết số nào ở đâu. Từ đó ra vòng Phistomefel, hiệu hai bình phương, và cả cách chứng minh 17.
**Vật xuyên suốt (đề xuất):** một **lưới sudoku đã giải** (cố định, tất định) được tô đỏ/xanh qua các hồi; cùng lưới đó
ở cuối để người xem "tự kiểm".

## Mạch bài (3 video nguồn → 5 hồi theo 3 câu hứa)

| # | hồi | ý | câu hứa |
|---|---|---|---|
| 0 | mở bài | vòng 16 ô quanh khối giữa = 4 góc 2×2, mọi sudoku · mục lục 3 câu · câu treo | — |
| 1 | luật + một con số lớn | luật 3 cách · gợi ý, đáp án duy nhất · **lịch sử đã sửa** (Number Place 1979, Garns; Nikoli 1984; 2004) · 6.67 × 10²¹ lưới | — |
| 2 | vòng Phistomefel | một bộ đủ 1–9 · tô đỏ: hàng 3, hàng 7, khối 4, khối 6 · tô xanh: cột 1, 2, 8, 9 · bỏ ô hai màu · còn vòng vs 4 góc | 1 |
| 3 | hình khác | 4 hàng đỏ vs 5 cột xanh → vuông 5×5 − vuông 4×4 = đúng một bộ (25 − 16 = 9 ô, tổng chênh 45) · Aad van de Wetering · câu đố "Difference of Squares": x² − y² = x + y → x − y = 1 | 2 |
| 4 | 17 gợi ý | báo in ~25 gợi ý · tìm được 17, chưa bao giờ 16 · vét cạn: 6.67 × 10²¹ × 3.36 × 10¹⁶ · họ lưới đối xứng → 5 472 730 538 · tập không tránh được (hình chữ nhật 7/9) · McGuire, Tugemann, Civario, ~7 triệu giờ CPU, 2011, công bố 01/2012 | 3 |
| 5 | chỉ là logic? | máy giải tức thì nhưng không nhận ra vòng · "tìm cái gì" mới là toán · gói lại · lần sau: tự kiểm vòng + 45 | — |

## Soát sự kiện — CẦN SỬA (đã sửa trong SCRIPT.md)

1. **"Sudoku đến từ Nhật, nổi tiếng thập niên 1980"** (video 3) — sai nửa.
   - Sudoku hiện đại in lần đầu tháng 5/1979 trong *Dell Pencil Puzzles and Word Games* (Mỹ), tên **Number Place**.
     Người soạn gần như chắc là **Howard Garns** (kiến trúc sư về hưu, Indiana). "Gần như chắc" vì bài in không ký
     tên; tên ông có trong danh sách cộng tác viên của đúng các số có bài này.
   - **Nikoli** (Nhật) đưa vào năm 1984 và đặt tên sudoku.
   - Thành cơn sốt toàn cầu từ **2004**: The Times (London), tháng 11/2004.
   - Nguồn: Wikipedia "Sudoku"; Crown Hill Heritage Foundation "Howard S. Garns".
2. **Hình chữ nhật 7/9 "không tránh được"** (video 3) chỉ nói "cùng cột". Điều kiện đúng: bốn ô nằm trên 2 hàng,
   2 cột và **đúng 2 khối**. Nếu chúng rơi vào 4 khối thì đổi 7↔9 làm hỏng luật khối. Đã kiểm bằng lập luận: mỗi khối
   phải mất một 7 và nhận một 9 trong chính nó. SCRIPT nói "in the same two boxes".
3. **"Máy tính mất khoảng 300 000 năm"** (video 3): không tìm thấy nguồn. Bài báo (arXiv 1201.0749) chỉ nói thuật toán
   quay lui chuẩn "not fast enough… at today's supercomputer speeds". Đã bỏ con số, nói "hopeless".
4. **"Phistomefel phát hiện vài năm trước"**: không tìm được năm chính xác → SCRIPT không nêu năm.
5. **Câu đố "Difference of Squares"**: ĐÃ xác minh — tác giả **MathGuy_12**, SudokuPad `sudokupad.app/8HQfQ4tD9q`, Cracking
   the Cryptic giải ngày 12/10/2023 ("A Difference Of Squares: A Sudoku Masterpiece", 54:32). Dữ liệu gốc (luật, lồng,
   mũi tên, renban, lời giải) lưu ở `data/difference-of-squares.sudokupad.txt`. Người dùng muốn **giải chi tiết** (ACT FOUR).

## Đúng — giữ nguyên (đã kiểm)

- **Vòng Phistomefel.** Đỏ = hàng 3, 7 + khối 4, 6 (khối trái/phải của khối giữa); xanh = cột 1, 2, 8, 9. Bỏ phần chung
  thì đỏ còn đúng vòng 16 ô quanh khối 5, xanh còn đúng 4 góc 2×2. Đã kiểm bằng phép trừ đa tập trong code, rồi thử
  trên **20 000** lưới hợp lệ: đa tập chữ số của vòng = của 4 góc ở mọi lưới.
- **Hiệu hai bình phương (tự dựng từ cùng phép tô).** Đỏ = 4 hàng trên (4 bộ); xanh = 5 cột trái (5 bộ). Bỏ khối 4×5
  chung thì đỏ còn vuông **4×4** (hàng 1–4, cột 6–9), xanh còn vuông **5×5** (hàng 5–9, cột 1–5), và xanh = đỏ + một
  bộ 1–9. 25 − 16 = 9 ô; tổng chênh **45**. Đã kiểm trên 20 000 lưới. Đối xứng thì cặp góc nào cũng được.
- **Câu đố Difference of Squares:** x² = y² + x + y (lời Simon Anthony) ⇒ (x − y)(x + y) = x + y ⇒ x − y = 1 (x + y > 0).
- **Số lưới:** 6 670 903 752 021 072 936 960 ≈ 6.67 × 10²¹ (Felgenhauer & Jarvis 2005). **Khác biệt thật sự:**
  5 472 730 538 (Russell & Jarvis 2005–06). Nguồn: Wikipedia "Mathematics of Sudoku".
- **C(81, 16)** = 33 594 090 947 249 085 ≈ 3.36 × 10¹⁶ (đã tính bằng code; video nói 3.3 × 10¹⁶).
- **17 gợi ý.** McGuire, Tugemann, Civario, "There is no 16-clue sudoku" (arXiv 1201.0749, 01/2012; Experimental
  Mathematics 23(2), 2014).
  - Tính toán từ 01/2011 đến 12/2011, khoảng **7 triệu giờ CPU** (UCD news; ~7.1 triệu core-hour) trên cụm Stokes của
    ICHEC, Ireland.
  - Bài báo dùng "hitting sets" của các tập không tránh được.
- **Số câu đố 17 gợi ý đã biết:** bộ sưu tập Gordon Royle có hơn 36 000 câu (Taalman 2007, Wikipedia), sau này
  ~49 000. Lời đọc: "tens of thousands".
- **Báo in khoảng 25 gợi ý**: hợp lý (thường 22–30), giữ "around twenty-five".
- **Aad van de Wetering**, người soạn Hà Lan: theo lời Simon Anthony (Numberphile). Ông là đồng tác giả bộ
  *Sudoku Patterns*. Giữ ở mức "found a trick of exactly this kind".

## Câu đố Difference of Squares — đã kiểm bằng code trên dữ liệu gốc

- Lồng: X = r1c9 + r2c9; Y = r9c1 + r9c2; Y² = r1–3c4 + r4c1–4 (7 ô); X² = 11 ô ở r5–r8 c5–c8; X − Y = r7c4 và r9c8;
  15 = r7c1–3. Mũi tên (vòng ← thân): r5c8 ← r3c9, r4c9 · r8c5 ← r9c3, r9c4 · r9c9 ← r8c8, r7c8, r8c7 · r3c7 ← r2c6,
  r1c5 · r4c4 ← r3c3, r2c2 · r7c3 ← r6c2, r5c1. Renban: r1c2-r1c1-r2c1 · r1c4-r2c4-r3c4 · r4c3-r4c2-r4c1 · r1c8-r2c9 ·
  r4c5-r5c4-r5c5 · r8c4-r9c5 · r9c6-r8c7.
- **Mở cửa:** đỏ = hàng 1–4, xanh = cột 5–9 → bỏ chung: đỏ = vuông 4×4 trái trên, xanh = vuông 5×5 phải dưới (+1 bộ).
  Bỏ khối 1 khỏi đỏ (+2 bộ) → đỏ = đúng lồng Y². Thêm cột 9 + hàng 9 vào đỏ → cân bằng; bỏ chung (9 ô; r9c9 còn đỏ một
  lần) → đỏ = Y² + X + Y + {r3c9, r4c9} + {r9c3, r9c4} + r9c9; xanh = X² + r5c8 + r8c5 + {r8c8, r7c8, r8c7}. Ba mũi
  tên triệt nhau → **X² = Y² + X + Y** → (X − Y)(X + Y) = X + Y → **X − Y = 1**. (Code: so từng bước đa tập.)
- **Khoảng:** r9c8 = 1 → hai ô lồng Y khác nhau ≥ 2 → Y ≥ 5. Lồng Y² ≤ 24 + 24 + 6 = 54 < 64 (r4c4 khác mọi số của hai
  renban cùng hàng/cột) → Y ≤ 7.
- **Lời giải gốc:** X = 8, Y = 7; Y² cage = 9+8+7 + 7+6+8+4 = 49; X² cage = 64; 64 − 49 = 15 = 8 + 7. Mọi mũi tên đúng.
- **Credit trên hình + mô tả:** "Difference of Squares by MathGuy_12 · SudokuPad" (vẽ lại lưới bằng code, ghi tên tác giả).

## Lấp thông tin (đã đưa vào SCRIPT.md)

1. Đẳng thức 5×5 − 4×4 = một bộ, tổng 45: tự dựng, kiểm bằng code, cho người xem tự thử ở "Next time".
2. 5.47 tỉ lưới khác biệt thật sự: con số đúng cho bước "họ lưới" mà video nguồn hỏi nhưng không trả lời.
3. Lịch sử thật (Garns / Nikoli / 2004) thay câu sai.
4. Kết bài: trả lời ý "chỉ là logic, máy làm được" bằng lập luận "biết tìm cái gì mới là toán", thay vì lặp lại.

## Hình cần đúng (tính trong code, ném lỗi nếu sai)

- **Lưới cố định:** một lưới hợp lệ sinh tất định, `must` 27 ràng buộc.
- **Phistomefel:** `must` đa tập của vòng = của 4 góc trên chính lưới đó.
- **Hiệu hai bình phương:** `must` (tổng 5×5) − (tổng 4×4) = 45 và đa tập chênh = {1…9}.
- **Hình chữ nhật không tránh được:** dựng trong lưới thật, `must` sau khi đổi vẫn hợp lệ và 4 ô nằm trong đúng 2 khối.
- **Các số:** C(81, 16), 6.67 × 10²¹, 5 472 730 538.

## Tiếng hiệu ứng — làm ở pha cảnh

- Có sẵn: `pen` (tô màu, khoanh), `tick` (đếm ô), `pop`/`chip` (điền số), `snap` (bỏ ô trùng), `correct`.
- Có thể cần: tiếng **bút dạ / highlighter** (CC0) cho tô đỏ/xanh — xem lại sau khi chọn DNA.

## Ảnh

- Howard Garns: không có ảnh tự do quyền phổ biến; nếu cần thì hiện vật = **bìa Dell Pencil Puzzles 1979** (có bản
  quyền → không dùng) → **vẽ lại bằng code** một trang tạp chí "NUMBER PLACE · 1979" kiểu chung.
- Gary McGuire: ảnh trên Commons? Chưa tìm. Mặc định **không dùng ảnh người**, chỉ thẻ tên.

## Tư thế mascot

`ponder`/`slump` (mở bài "coincidence?"), `point` (vòng), `three` (ba câu hỏi), `calculator` (máy tính giải tức thì),
`ok` (gói lại). Không cần tư thế mới; nếu muốn: mascot **cầm bút dạ tô sudoku**.
