# Brief: dựng cảnh của sudoku ("The Hidden Math Inside Every Sudoku")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p1.timeline.json`, `data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/sudoku/DNA.md` — "Glass: kính màu khung chì": ý trung tâm (đếm mà không cần biết; ô hai màu = kính đôi →
   nhấc ra), vật xuyên suốt (MỘT lưới đã giải), màu mang nghĩa gì (đỏ / xanh gân CHỈ cho hai tập hợp). **Bảng "hình theo
   từng phần" là ý đạo diễn cho mục của bạn**: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/sudoku/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/sudoku/CONTENT.md`: mọi con số, tên lên hình PHẢI có ở đây (dữ liệu câu đố + lập luận hồi 4 ở đó).
5. `projects/en/sudoku/kit.js` — đọc HẾT. **Mọi vật dùng chung ĐÃ có trong kit** (LESSONS §83): `SOL`/`D`, `window9`,
   `pane`, `chip`, `outline`, `PHI`/`RING`/`CORNERS`/`PHI_DBL`, `SQ`/`SQ_SMALL`/`SQ_BIG`/`SQ_DBL`, `CAGES`/`ARROWS`/
   `RENBAN`/`puzzle()`/`cage`/`arrow`/`renban`, `DOS` (bước hồi 4), `X`/`Y`/`Y2_MAX`, `crack`, `roundel`, `nameplate`,
   `actCard`/`actFlash`/`dark`, `figure` (có miệng nói), `eq`/`it`/`label`/`num`. **Cảnh KHÔNG import cảnh khác** — thiếu
   gì dùng chung với nhóm khác thì báo đạo diễn, đừng export từ file cảnh.
6. **Cảnh mẫu của đạo diễn: `plates/c4-left.js`** (đọc hết) + khung `out/en/sudoku/qa/c4.jpg`. Bàn thử: `tools/lab/glass.html`.
7. `projects/en/sudoku/data/lines.txt`: dòng `## mục [hồi]` rồi `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).

## Hợp đồng một cảnh

File `projects/en/sudoku/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file. Mẫu đầy đủ: `plates/c4-left.js`.
- `static ERA = 'glass'` (một chất liệu cả bài). `static POSES` CHỈ tư thế được giao. Bài này không dùng ảnh (`IMAGES`).
- `init({ tl })`: `const { L, w } = lookup(tl, '<tên>')`; MỌI mốc lấy từ chữ (`w(i, 'từ', n)`), không gõ giây tay.
  `this.START = L(câu đầu).start`; `this.FROM = max(START − lead, L(câu cuối cảnh trước).end + 0.5)`, lead = 1.2 (cảnh
  thường) / **2.6 (mục MỞ HỒI)**.
- `sfx()` → `[{ t, kind }]` giờ timeline. `render(g, t)`: THUẦN theo t; gọi `ground(g)` đầu tiên.

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("doesn't", "b's", "three-legged"). Từ LẶP trong câu →
truyền n; `prog(t, a, b)` ném lỗi khi b < a. Chạy `python3 tools/qa/lookups.py sudoku` và đọc TỪNG dòng "LẶP"
(công cụ chỉ thấy lời gọi dạng `w(<số>, '<từ>'[, n])` nháy ĐƠN).

**Chuyển cảnh.** Trang lo 0.9 s từ FROM: tờ cũ trượt lên (lật tờ giấy, tiếng `page` tự có). Cảnh phải ĐẸP ở mọi
t ∈ [FROM, FROM cảnh sau + 0.9], kể cả trước START. Phần tử đầu tiên vẽ từ FROM + 0.3 (không khung trống).

**Thẻ hồi** (mục MỞ HỒI: b1 c1 d1 e1 f1 g1): `const on = actCard(g, t, this.FROM, this.START, 'ACT TWO', 'The ring',
'ANSWERS 1')` — mốc tính từ FROM THẬT (LESSONS §82); vẽ cảnh xong thì `dark(g, on)`; tiếng `shimmer` ở `actFlash(this.FROM)`.
ANSWERS 1 / 2 / 3 chỉ ở c1 / d1 / f1. **Biển mục** mọi cảnh: `sectionTag(g, "ACT II · WHAT'S LEFT")` (≤ 44 ký tự).

**Ô cửa (bắt buộc).**
- Một lưới = `window9(g, X, Y, cs, { kindOf, kOf, digits, digitK })`. Cỡ chuẩn: lưới chính cs = 80 ở X ≈ 712, Y ≈ 132
  (khung lab 0); câu đố cs = 84 ở X ≈ 120, Y ≈ 168 (khung lab 1). Giữ một cỡ trong suốt một cảnh; zoom thì dùng
  `g.scale` quanh vùng đang nói (≤ 1.6×), restore trước khi vẽ chữ/mascot.
- **Lắp kính** = `kOf(r, c)` tăng 0 → 1 theo TỪ được đọc (gọi tên hàng/cột/khối nào thì dải đó lắp, so le nhẹ theo ô).
  **Nhấc kính đôi** = đổi kind sang `'hole'` (có thể lắp ngược k 1 → 0 trước). Ô kính đôi = kind `'dbl'`.
- Tô đúng các tập của kit (`PHI`, `SQ`, `DOS`, `CAGES`) — KHÔNG tự đặt lại ô.
- Số trong ô luôn đọc được (≥ 7:1); ô `hole` số lùi màu `C.holeT`.

**Câu đố (hồi 4).** `puzzle(g, P, { k, bgOf })` vẽ renban + mũi tên + lồng + nhãn; mũi tên đang triệt nhau tô nổi bằng
`arrow(g, P, ARROWS[i], { color: C.redT | C.blueT, w: 5 })`. Credit "Difference of Squares · puzzle by MathGuy_12 ·
SudokuPad" luôn có ở mọi khung có câu đố (Plex 18 px, dưới lưới).

**Hình bám lời.** Mỗi câu ≥ 1 thay đổi bám đúng TỪ. Không khung đứng yên > 3 s. Vật rời khung bằng chuyển động. Chữ không
fade (khắc vào theo `k`). Mỗi khung MỘT ý chính. **Kính nứt** (`crack`) CHỈ ở hai chỗ DNA §1 (b2, f1). Kết luận khắc
xong TRƯỚC câu cuối của cảnh. **Mascot:** CHỈ tư thế được giao, một bên khung, chân chạm đáy, 3–8 s quanh đúng câu,
`figure(g, pose, cx, H, h, k, { t })` — truyền `t` để miệng NÓI theo lời đọc (người dùng muốn); toàn thân crop 0.45 thì
h ≈ 560, khung giữa đùi h ≈ 700.

**Toán / số.** Mọi số lên hình tính bằng code + `must(…)` ở trạng thái ĐÃ XONG (§70). Chỉ số liệu trong CONTENT.md.
**Tất định**: không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render.

**Chữ.** `it()` (Cormorant nghiêng — lời dẫn, phương trình), `eq()` (phương trình nhiều màu), `label()` (Plex in hoa),
`num()` (Archivo). Chỉ cỡ có trong `kit.FONTS`; cần cỡ khác → báo. Chữ nhỏ ≥ 4.5:1.

## Tiếng hiệu ứng (DNA §10)

`chip` (lắp kính — một mỗi dải) · `snap` (nhấc kính đôi — một mỗi cụm) · `shimmer` (lắp xong một bộ / thẻ hồi) · `tick`
(đếm) · `pen` (khắc chữ) · `correct` · `error` (kính nứt) · `flap` (điền số nhanh, chùm). Chuyển cảnh tự có `whoosh` — đừng
thêm ở FROM. **≤ 1 tiếng / 3 s** mỗi cảnh (ngoài chùm đếm/điền); không hai tiếng trong 0.25 s.

| nhóm | error | correct | shimmer |
|---|---|---|---|
| c4 (đạo diễn) | 0 | 1 | 0 |
| G1 a0 + g1–g3 | 0 | 1 | 2 |
| G2 b1–b3 | 1 | 0 | 1 |
| G3 c1–c3 | 0 | 0 | 2 |
| G4 d1–d2 | 0 | 1 | 1 |
| G5 e1–e3 | 0 | 0 | 1 |
| G6 e4–e6 | 0 | 2 | 1 |
| G7 f1–f5 | 1 | 1 | 2 |
| **TỔNG** | **2 ≤ 2** | **6 ≤ 6** | **10 ≤ 10** |

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
# giờ TRANG = mốc timeline + LEAD (build.json: p1 lead 0.6, p2 lead 3.0). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/sudoku/p2.html?plates=<các cảnh của bạn>" --dur 600 \
  --t <giờ trang,…> --outdir out/en/sudoku/qa/<nhóm>
python3 tools/qa/sheet.py out/en/sudoku/qa/<nhóm> out/en/sudoku/qa/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/sudoku/p2.html?plates=<các cảnh của bạn>"   # mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/sudoku/p2.html?plates=<các cảnh của bạn>" --out out/en/sudoku/qa/<nhóm>-cues.json
python3 tools/qa/lookups.py sudoku
```
(a0 ở trang `p1.html`, `--dur 60`.)
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 và khung cuối cảnh. Mở ít nhất 4 khung ở ĐỘ PHÂN GIẢI GỐC (Read .png), sửa
  hết: chữ chạm mép / tràn; chữ đè nhân vật / đè nét; ô tô sai tập (so với kit), số trong ô khó đọc, miệng nói lệch khỏi mặt; khung đứng im > 3 s; khung trống; ký tự rơi về font khác. `shoot.js check` phải thoát 0.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p1.html`, `p2.html`, `plates/*-order.js`, cảnh nhóm khác;
  KHÔNG commit; KHÔNG gọi agent. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo).
- Không gọi OmniVoice, không render video. `shoot.js` luôn kèm `--page`.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, hàm cục bộ đáng gom vào kit, chỗ còn băn khoăn.
