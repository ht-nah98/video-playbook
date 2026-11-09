# DNA của `sudoku` — "The Hidden Math Inside Every Sudoku" (video bài học, lời đọc)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md` đã duyệt 2026-10-09; lời đọc đổi "green" → "blue" cho khớp màu kính).
> Khung phong cách: `styleframes.jpg` (`tools/lab/glass.html`). Người dùng chọn (2026-10-09): **B "Glass" — kính màu
> khung chì**, trong 3 hướng (`styleframes-compare.jpg`). Công nghệ: engine 2D (bài ĐỌC số — docs/MEDIUM.md).

1. **Ý trung tâm — ĐẾM MÀ KHÔNG CẦN BIẾT, bằng kính màu.** Lưới sudoku là một ô cửa kính khung chì, đặt trước tường giấy
   dó. Một bộ đủ 1–9 (hàng, cột, khối) = một **dải kính màu** lắp vào khung. **Đỏ** = kính trơn hồng-cam; **xanh lam** =
   kính GÂN dọc (người mù màu nhận ra nhờ gân + độ sáng chênh). Ô thuộc cả hai = **hai lớp kính chồng → ô sẫm**; "take it
   out of both" = **nhấc ô kính đôi ra**: khung chì còn, lòng ô lộ tường, viền nét đứt ghi chỗ kính cũ. Cái còn lại "cân
   nhau" = hai dãy chip kính sắp xếp khớp từng số.
   - **Vật xuyên suốt: MỘT LƯỚI ĐÃ GIẢI** — lời giải của câu đố Difference of Squares (`CONTENT.md`), dùng ở hồi 2, 3, 6;
     ở hồi 4 cùng ô cửa đó là câu đố CHƯA giải. Kit kiểm 27 ràng buộc lúc nạp.
   - **Mục lục lời hứa** = ba ô kính tròn đánh số 1 · 2 · 3 khắc chữ (câu hỏi viết vào); thẻ hồi ghi "ANSWERS 1/2/3" ở
     hồi 2, 3, 5.
   - **Gạch hiểu lầm → sửa:** ô kính **nứt** (vết nứt chì) lên câu sai, câu đúng khắc bên cạnh. Đúng hai chỗ: "from
     Japan" (b2) và "not finding = proof" (e1: vết nứt lên "NEVER FOUND = PROOF?").

   Hình theo từng phần (một mục `##` = một file cảnh; a0 ở p1):

   | cảnh | mục | hình |
   |---|---|---|
   | a0-open | Cold open | ô cửa lưới đã giải trong bóng tối, ánh sáng bật dần; vòng 16 ô quanh khối giữa lắp kính đỏ, 4 góc 2×2 lắp kính xanh; hai dãy chip khớp; "coincidence?" khắc rồi nứt; ba ô kính tròn 1·2·3 với ba câu hỏi; câu treo → ánh sáng tắt về đen. Mascot `ponder` (chữ "coincidence") |
   | b1-rules | One rule, three ways | thẻ hồi I "THE RULES, AND A VERY BIG NUMBER"; một hàng sáng lên 1–9, một cột, một khối; vài ô là "clues" (kính trong, số in đậm), còn lại trống; "ONE ANSWER" |
   | b2-japan | Not from Japan | "FROM JAPAN?" khắc → kính nứt; ba ô kính kể chuyện: "NUMBER PLACE · 1979 · DELL" (trang tạp chí vẽ bằng code, không bìa thật) · "HOWARD GARNS · MOST LIKELY" · "NIKOLI · 1984 · SUDOKU" · "2004 · LONDON" |
   | b3-count | How many grids? | bức tường đầy ô cửa nhỏ lùi xa; số **6,670,903,752,021,072,936,960** đếm lên rồi chốt "≈ 6.7 × 10²¹"; "2005" |
   | c1-sets | Counting without knowing | thẻ hồi II "THE RING · ANSWERS 1"; một hàng: số xoá thành "?", nhãn "1–9, ONCE EACH" = một dải kính; cột, khối như vậy; chữ "SET EQUIVALENCE" |
   | c2-colours | Red and blue | lắp kính đỏ: hàng 3, hàng 7, khối 4, khối 6 ("4 SETS"); kính xanh gân: cột 1, 2, 8, 9 ("4 SETS"); cân "4 = 4" |
   | c3-overlap | Take away the overlap | ô kính đôi sẫm hiện rõ (20 ô); nhấc một ô ra (snap), cân vẫn thăng bằng; nhấc hết |
   | c4-left | What's left | **đúng khung lab 0**: vòng đỏ + góc xanh + hai dãy chip khớp; "PHISTOMEFEL RING"; "we only counted". Mascot `point` |
   | d1-shapes | Four rows, five columns | thẻ hồi III "OTHER SHAPES · ANSWERS 2"; đỏ: 4 hàng trên ("4 SETS"); xanh: 5 cột phải ("5 SETS"); "+1 SET" |
   | d2-squares | Squares appear | nhấc khối 4×5 kính đôi; còn vuông đỏ 4×4 trái trên, vuông xanh 5×5 phải dưới; 25 − 16 = 9; tổng hai vuông đếm lên → chênh **45** (code); "AAD VAN DE WETERING" thẻ tên |
   | e1-puzzle | A puzzle built from algebra | thẻ hồi IV "DIFFERENCE OF SQUARES"; ô cửa THÀNH câu đố: lồng nét đứt có nhãn x, y, y², x², x − y, 15; mũi tên kính mờ có vòng; renban = dải kính tím; credit "puzzle by MathGuy_12 · SudokuPad"; "almost nothing given" |
   | e2-colour | Red, blue, and one box | đỏ 4 hàng, xanh 5 cột phải, nhấc chung; nhấc khối 1 → "+2 SETS"; phần đỏ còn = lồng y² (viền sáng) |
   | e3-balance | Balance the books | thêm cột 9 + hàng 9 vào đỏ; ô góc phải dưới "×2"; nhấc chung từng lớp; ba mũi tên: thân đỏ ↔ vòng xanh triệt nhau (snap mỗi mũi tên) |
   | e4-equation | The equation | **đúng khung lab 1**: còn x² (xanh) và y² + x + y (đỏ); phương trình viết từng dòng → (x − y)(x + y) = x + y → **x − y = 1** |
   | e5-range | Two ones, and a range | hai ô x − y hiện "1"; hàng 9 có 1 → lồng y ≥ 2 + 3 = 5; lồng y² ≤ 24 + 24 + 6 = **54** < 64 (code) → y ∈ {5, 6, 7} |
   | e6-rest | The rest of the grid | các ô điền nhanh theo lời giải (từng khối một); "x = 8 · y = 7"; 49 · 64 · 64 − 49 = 15 = 8 + 7 (code); "~ 1 HOUR · CRACKING THE CRYPTIC" |
   | f1-few | How few? | thẻ hồi V "SEVENTEEN CLUES · ANSWERS 3"; ô cửa còn ~25 kính trong (gợi ý báo in) → bớt dần tới 17; "16?" — "NEVER FOUND"; "NEVER FOUND = PROOF?" nứt |
   | f2-search | Too big to search | 6.7 × 10²¹ lưới × C(81, 16) ≈ 3.4 × 10¹⁶ (code) — tường cửa sổ lùi xa vô tận; "HOPELESS" |
   | f3-families | Families of grids | đổi hai hàng trong một băng, đổi hai băng, xoay, đổi nhãn 3↔5 — mỗi phép là một ô cửa biến hình, vẫn hợp lệ (code); "≈ 5.5 BILLION" (5,472,730,538) |
   | f4-unavoidable | Patterns that must be broken | trong lưới thật: hình chữ nhật 7/9 ở 2 hàng, 2 cột, **đúng 2 khối** (code chọn); đổi 7↔9 vẫn hợp lệ; "AT LEAST ONE CLUE HERE"; "UNAVOIDABLE SET" |
   | f5-hours | Seven million hours | thẻ tên "GARY McGUIRE · BASTIAN TUGEMANN · GILLES CIVARIO"; "2011 · ~7 MILLION CPU HOURS · IRELAND"; "16: NONE" → "17 = MINIMUM"; "JANUARY 2012" |
   | g1-logic | A computer can do it | thẻ hồi VI "JUST LOGIC?"; khung chì tự điền số trong tích tắc nhưng KHÔNG có kính màu ("solved in 0.01 s") — rồi kính đỏ/xanh lắp vào: "the computer never saw the ring". Mascot `calculator` |
   | g2-together | Putting it together | ba ô kính tròn 1·2·3 quay lại, mỗi câu một hình thu nhỏ: vòng · 5×5 − 4×4 / x − y = 1 · 17 |
   | g3-next | Next time | lưới đã giải, vòng + góc + hai vuông; "−45"; mascot `wave`; biển kênh **"99% FROM SCRATCH" + "SUBSCRIBE"** đứng yên ≥ 4 s tới hết |

2. **Chất liệu / màu** (đo tại chỗ, lab glass):
   - tường giấy dó `#E4DCCD` · chì `#2C2D33` (gờ sáng `#6E7078`) · kính trong `#F4F1E8`.
   - **đỏ `#F6B39A`** (chữ đỏ `#9A2A18`) = tập hợp ĐỎ. **xanh `#82A6D9`, có gân dọc** (chữ `#1A4E8C`) = tập hợp XANH.
     Đỏ/xanh chỉ dùng cho hai tập hợp, không cho thứ khác.
   - **kính đôi `#7D7583`** = ô thuộc cả hai · **tím `#8E5BC8`** = renban (chỉ ở câu đố).
   - **số trong ô `#141218`**, ≥ 7.3:1 trên mọi kính; chữ nhỏ trên tường ≥ 4.9:1.
   - Không màu "sai". Cái sai = **kính nứt** (vết nứt chì).
3. **Chữ** — Archivo (số trong ô, chip số, số lớn) · Cormorant Garamond LN nghiêng (phương trình, lời dẫn — như chữ khắc) ·
   IBM Plex Mono (nhãn). ² − × → · có đủ trong font (getBestCmap, lab). Số mũ ² của Cormorant nhỏ → nhãn lồng dùng cỡ ≥ 30.
4. **Nhịp** — hình bám từ được đọc: kính lắp đúng lúc gọi tên hàng/cột/khối; mỗi câu ≥ 1 thay đổi; không khung đứng yên
   quá 3 s (vệt nắng trôi KHÔNG tính).
5. **Nhân vật** — CÓ MIỆNG NÓI theo lời đọc khi đứng trên hình (người dùng 2026-10-09; `figure(…, { t })`). 5 lần: `ponder` (a0 "coincidence"), `point` (c4), `calculator` (g1), `ok` (e4, nhỏ, góc), `wave` (g3).
   Một bên khung, chân chạm đáy, không đè ô cửa.
6. **Intro** — a0 kết ở câu treo: ánh sáng sau ô kính tắt → đen kín → intro 3D (từ/về đen). p2 mở từ đen: nắng lên sau ô cửa (b1).
7. **Camera / chuyển cảnh** — cùng ERA `glass`: chuyển = **ô cửa trượt lên** (tờ cũ trượt lên, tiếng `whoosh` tự có);
   trong cảnh: zoom nhẹ vào vùng đang nói (≤ 1.6×), không xoay.
8. **Ảnh / hiện vật** — không dùng ảnh người (không có ảnh tự do quyền phù hợp). Thẻ tên khắc. Trang "Number Place" vẽ bằng
   code (kiểu chung, không chép bìa Dell).
9. **CẤM** — đỏ/xanh cho thứ khác ngoài hai tập hợp; giao diện SudokuPad thật; số lên hình không tính bằng code hoặc không
   có trong CONTENT.md; tên người soạn câu đố thiếu credit; chữ fade (khắc vào / lắp vào).
10. **Tiếng** — `chip` (lắp ô kính; một tiếng mỗi dải) · `snap` (nhấc ô kính đôi; một mỗi cụm) · `shimmer` (lắp xong một
    bộ, ánh sáng xuyên) · `tick` (đếm, chip số) · `pen` (khắc chữ) · `correct` (hai dãy khớp / phương trình xong) ·
    `error` (kính nứt — đúng 2) · `flap` (số điền nhanh, chùm). TRẦN cả video: error ≤ 2, correct ≤ 6, shimmer ≤ 10,
    whoosh-long ≤ 2; mật độ ≤ 1 tiếng / 3 s mỗi cảnh ngoài chùm đếm/điền.
11. **Vật dùng chung (kit, TRƯỚC khi giao — LESSONS §71, §83)**: lưới đã giải `SOL` + `must` 27 ràng buộc; câu đố `PUZ`
    (lồng, mũi tên, renban, toạ độ từ `data/difference-of-squares.sudokupad.txt`); `pane()` ô cửa (vẽ lưới chì, số, kính
    theo bảng màu từng ô: trong / đỏ / xanh / đôi / đã nhấc, k lắp vào); `chips()` dãy chip sắp xếp; `cage()`, `arrow()`,
    `renban()`; `crack()` kính nứt; `roundel()` ô kính tròn (mục lục); `nameplate()` thẻ tên khắc; `actCard()`; `figure()`.
    Hằng: vòng `RING`, góc `CORNERS`, `RED_ROWS`… và các phép tô của hồi 2/3/4 (đa tập kiểm bằng code).
12. **Chỉ số sàn** — mỗi cảnh: ô cửa hoặc vật kính trên hình; số trong ô ≥ 7:1; chữ ≥ 28 px trừ credit; không khung đứng yên
    > 3 s; mascot ≤ 10% thời lượng p2.
