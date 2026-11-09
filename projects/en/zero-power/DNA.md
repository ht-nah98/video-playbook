# DNA của `zero-power` — "Why Is Anything to the Power of Zero One?" (video bài học, lời đọc)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md`). Khung phong cách: `styleframes-compare.jpg`.
> Người dùng chọn (2026-10-08): **A "LCD"** (`tools/lab/lcd.html`) — nguyên hướng A, không ghép. Cảnh mẫu: `plates/a0-open.js`.

1. **Ý trung tâm — CẢ BÀI SỐNG TRONG MÀN LCD CỦA MỘT MÁY TÍNH CẦM TAY.** Bài mở bằng "máy cãi nhau" về 0⁰; máy tính
   là nơi "chưa bấm gì" có trạng thái thật: thanh ghi NHÂN reset về **1**, thanh ghi CỘNG về **0**. Nhân 0 lần = chưa
   bấm phím nhân nào = thanh ghi vẫn 1.
   - **Vật xuyên suốt: THANH GHI × = 1** — số `1` 7 đoạn màu LAM, chỉ báo "×" sáng lam ở dải trên cùng, cột kính nhuộm
     lam (`register`, cột lam như lab). Mở bài: 2⁰ = 1 lam, "WHY 1?" · H1 đáy cầu thang là ô 1 lam · H2 rút hết thừa số
     → còn 1 lam trong cột ×REG · H3 ô 0⁰ = 1 lam GIÀNH với 0 gỉ (`contested`) · H4 "1 cách điền 0 ô" = màn trống, thanh
     ghi = 1 · H5 đường y = 0 dẫn tới 1 lam, đường x = 0 dẫn tới 0 gỉ · tóm tắt: lịch sử phép tính cuộn lại từng hồi ·
     lần sau: phím "!" — 0! cũng hiện 1 lam.
   - **Mục lục lời hứa** = ba dòng đánh số 7 đoạn (a0, trang 2); thẻ hồi ghi "ANSWERS 1" / "ANSWERS 1 + 2" / "ANSWERS 3".
   - **Gạch hiểu lầm → sửa:** `wrong()` = ÂM BẢN (thanh mực đặc, chữ khoét màu kính) + chỉ báo ERR bật; ý đúng viết
     ngay dưới bằng lam (nếu là "1") hoặc mực. CHỈ bốn chỗ:
     "MULTIPLYING ZERO TIMES = NOTHING" (c4) → "= NOT STARTED YET = 1" ·
     "THE RULE FAILS AT ZERO" (d2) → "THE RULE GOES QUIET" ·
     "INDETERMINATE = NO VALUE" (f3) → "CAN'T READ IT OFF THE SHAPE" ·
     "PROOF" của Möbius (f4) → "WRONG".
     Dãy số ở H1 KHÔNG bị gạch — chỉ nhãn "A HINT · NOT A PROOF" (§58). Phép chia cho 0 ở d1 KHÔNG phải câu sai mà
     phép bị cấm: chỉ báo ERR + chữ "DIVIDE BY 0: NOT ALLOWED", không âm bản.

   Hình theo từng phần (một mục `##` = một file cảnh; trang p2):

   | cảnh | mục | hình |
   |---|---|---|
   | b1-down | Down the powers of two | thẻ hồi I "FOLLOW THE PATTERN · ANSWERS 1" (mở từ đen sau intro); cột 2⁴ = 16, 2³ = 8, 2² = 4, 2¹ = 2 (7 đoạn, kiểu bảng giá trị) — mỗi bậc "÷2" ma trận điểm bên phải; bậc chót "2⁰ = ?" → 1 lam khi "two divided by two is one" |
   | b2-ten | Try another number | cùng bố cục, cột 10³ = 1000 … 10⁰ = 1, "÷10"; "LAST STEP: N ÷ N = 1"; "ANY BASE ≠ 0 → 1" |
   | b3-hint | A pattern is not a proof | hai cột thu nhỏ; nhãn "A HINT · NOT A PROOF" (mực, không gạch); "WHY MUST A^0 = 1?" |
   | c1-rule | The rule you already know | thẻ hồi II "FORCED BY A RULE · ANSWERS 1 + 2"; A^M × A^N = A^M+N ma trận điểm lớn; 2³ × 2² = 2⁵ = 32; kiểm 8 × 4 = 32; "đếm 2": (2·2·2)(2·2) → năm số 2 |
   | c2-zero | Put in a zero | A^M × A^0 = A^M+0 = A^M; "×A^0 CHANGES NOTHING"; dòng "A^M ≠ 0 → DIVIDE" khung chấm (để H3 gọi lại); kết A^0 = 1 lam |
   | c3-divide | Or divide | A^M ÷ A^M = 1 và = A^M−M = A^0 — hai đường ghép về cùng ô 1 lam ("TWO ROADS, SAME PLACE") |
   | c4-empty | Multiplying zero times | hai thanh ghi: + [0] EMPTY SUM, × [1] EMPTY PRODUCT (như lab khung 0); 2³ = 1 × 2 × 2 × 2, rút từng 2 (đoạn tắt) → 1 lam; GẠCH "= NOTHING" → "= NOT STARTED YET" |
   | c5-choice | A choice, then no choice | "PROVED FOR 1, 2, 3…" → mũi tên sang 0 "A CHOICE: KEEP THE RULE" ("SAME CHOICE AS LAST VIDEO: NEGATIVE NUMBERS") → "THEN: FORCED · A^0 = 1" |
   | d1-stops | The staircase stops | thẻ hồi III "WHEN THE BASE IS ZERO · ANSWERS 3"; cột 0³ = 0, 0² = 0, 0¹ = 0 (0 gỉ); bậc kế "÷0" → chỉ báo ERR + "DIVIDE BY 0: NOT ALLOWED"; cầu thang dừng một bậc sớm |
   | d2-quiet | The rule goes quiet | gọi lại dòng "A^M ≠ 0 → DIVIDE" của c2, giờ A^M = 0; 0 × [?] = 0 thử 1, 7, 1000000 → mọi giá trị đều qua; GẠCH "FAILS" → "GOES QUIET"; X × X = X → chỉ 0 và 1 đứng yên (thử 2: 4 ≠ 2 …) |
   | d3-table | Two patterns, one square | bảng xʸ đúng lab khung 1 (x = 0, 1/2, 2, 5 · y = 0..3), hàng lam toàn 1, cột gỉ toàn 0, ô 0⁰ `contested`; "ONE SQUARE: 1 OR 0?" |
   | e1-count | Counting the ways | thẻ hồi IV "WHEN COUNTING DECIDES · ANSWERS 3"; 3 ô × 2 ký hiệu → 8 dãy ma trận điểm (liệt kê đủ 8); A^N = SỐ CÁCH; 0 ô → màn trống "1 WAY: DO NOTHING" (thanh ghi 1 lam); "0 SYMBOLS, 0 BOXES → STILL 1 WAY" → 0^0 = 1 lam "IN COUNTING" |
   | e2-formulas | Formulas that need it | ba dòng như máy đồ thị cuộn: P(X) = 3 + 2X + X² = 3·X^0 + …, P(0) = 3; (X + Y)^N = 1·X^0·Y^N + …, Newton (ảnh điểm); E^X = X^0/0! + X + …, E^0 = 1; mỗi chỗ X^0 tại x = 0 tô lam "NEEDS 0^0 = 1" |
   | e3-knuth | Ten thousand times no | Knuth (ảnh điểm), "TWO NOTES ON NOTATION · 1992"; câu "NO, NO, TEN THOUSAND TIMES NO" gõ vào lớn; "PYTHON 1 · JAVASCRIPT 1" gọi lại a0 |
   | f1-shape | A shape, not a number | thẻ hồi V "WHEN LIMITS DECIDE · ANSWERS 3"; mascot pose-calculator màn "Err"; hai ô "0^0 AS A NUMBER" vs "0^0 AS THE SHAPE OF A LIMIT" |
   | f2-paths | Two paths to the corner | trục điểm ảnh x, y; góc (0, 0) = ô `contested`; đường 1 (y = 0, nằm ngang) dẫn lam → 1; đường 2 (x = 0, đứng) dẫn gỉ → 0; đường cong y = ln 2 / ln x → nhãn "X^Y = 2 EVERYWHERE"; "NO NUMBER EVERY PATH AGREES ON" |
   | f3-indet | What indeterminate means | GẠCH "INDETERMINATE = NO VALUE" → "CAN'T READ IT OFF THE SHAPE · WORK IT OUT"; đồ thị điểm ảnh xˣ trên (0, 1]: đáy ≈ 0.692 tại x ≈ 0.368, về 1 khi x → 0 |
   | f4-history | An old argument | dòng thời gian 1821 → 1833: Cauchy (ảnh điểm + bìa Cours d'analyse, "TABLE OF UNDEFINED FORMS … 0^0"), Libri "0^0 = 1", Möbius "PROOF" → âm bản → "WRONG"; "STILL ARGUED TODAY" |
   | g1-together | Putting it together | thẻ hồi VI; ba ô thu nhỏ của hình đã có (cột cầu thang + thanh ghi 1; A^M × A^0; bảng 0⁰ tách đôi: VALUE = 1 lam / LIMIT = WORK IT OUT) theo từng câu; "ON A TEST: YOUR COURSE'S DEFINITION" |
   | g2-next | Next time | phím "!" — 0! = 1 lam "PRODUCT OF NO NUMBERS"; "WHERE HAVE WE SEEN THAT?"; câu bình luận "0^0 = 1, 0, OR UNDEFINED?"; mascot `wave`; biển kênh "99% FROM SCRATCH" + "SUBSCRIBE" (ma trận điểm lớn) ĐỨNG YÊN ≥ 4 s tới hết |

2. **Chất liệu / màu** (đo trên kính #C4CEB6→#B3BEA6, tối nhất ở đáy):
   - mực `#18211B` (≈ 11:1) · **lam `#0A3A86` = "1" / khởi động / đúng** (≈ 7:1) · **gỉ `#7A1A10` = "0"** (≈ 6.4:1 đỉnh,
     4.95 đáy) · phụ `#3E4A40` (≈ 5.9:1 đỉnh, 4.3 đáy — chữ phụ cỡ p ≤ 3 không đặt ở y > 900).
   - Lam và gỉ CHỈ cho giá trị 1 và 0 (và đường dẫn tới chúng). Khoanh, gạch chân, số thứ tự, khung chọn: MỰC (§61).
   - Tranh chấp 0⁰ = `contested` (caro + ngoặc), không phải một màu. SAI = `wrong` (âm bản) + ERR.
3. **Chữ** — KHÔNG font hệ thống trên màn: số = `seg7` / `row` (7 đoạn nghiêng 6°, đoạn tắt mờ); chữ = `dm` ma trận điểm
   5×7 (CHỮ HOA; biến viết hoa như máy tính — A^M); số mũ `^…^` (nhớ ĐÓNG `^`). Glyph thiếu → kit ném lỗi → báo đạo diễn.
   Cỡ: thẻ mục p4 (`card`), thân p5–p7, chữ lớn p9–p14, chú thích ≥ p3.
4. **Nhịp** — chữ GÕ vào (k theo ký tự), số "bấm" vào theo token; mỗi câu ≥ 1 thay đổi; không khung đứng yên > 3 s.
5. **Nhân vật** — sau ink, một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–800, chân chạm đáy. Tư thế giao theo cảnh (BRIEF).
6. **Intro** — a0 kết bằng iris khép vào ô 0⁰ → đen kín → intro. p2 mở từ đen (b1 mở iris ở đầu).
7. **Camera / chuyển cảnh** — chuyển giữa cảnh cùng ERA = màn cuộn lên (trang tự làm, có whoosh). Trong cảnh: cuộn trang
   như a0 (`smooth(prog)` 0.9 s), không zoom.
8. **Chân dung / hiện vật** — `portrait` (ảnh điểm 4 mức xám, gõ vào theo hàng) + nhãn ma trận điểm (tên, năm).
   Knuth: note "PHOTO: ALEX HANDY · CC BY-SA 2.0".
9. **CẤM** — logo / giao diện thật (Casio, TI, Excel, Google, Python); in `0 ** 0` của JS làm đáp án ô 0⁰; `fillText` /
   font hệ thống trên màn; màu thứ năm ngoài mực–lam–gỉ–phụ.
10. **Tiếng** — chất liệu máy tính: `beep` (bấm phím / số hiện), `tick` (đoạn tắt, rút thừa số, bậc cầu thang), `chip`
    (reset thanh ghi, ảnh in xong), `question` (ô 0⁰, câu hỏi), `error` (ERR / âm bản), `correct` (= 1 chốt), `snap` (hai
    quy luật đâm vào ô), `whoosh-long` (chỉ cuộn dài). TRẦN cả video: error ≤ 7, correct ≤ 8, question ≤ 8, snap ≤ 4,
    whoosh-long ≤ 3; mật độ ≤ 1 tiếng / 3 s mỗi cảnh ngoài chùm gõ.
