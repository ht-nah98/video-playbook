# Brief: dựng cảnh của solid-geometry ("Solid Geometry from Scratch")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p1.timeline.json`, `data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/solid-geometry/DNA.md` — "Shadowbox: giấy và đèn": ý trung tâm (đèn + cái bóng = hình chiếu; tam giác
   cần tìm cam đất), vật xuyên suốt (CĂN PHÒNG 12 × 4 × 3), màu mang nghĩa gì. **Bảng "hình theo từng phần" là ý đạo diễn
   cho mục của bạn**: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/solid-geometry/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/solid-geometry/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/solid-geometry/kit.js` — đọc HẾT (phép chiếu 3D, đèn, bóng, khối, tờ bìa, chỉ, nhãn phẳng, ký hiệu vẽ tay,
   ROOM, dải xé, thẻ chữ A, thẻ hồi, mascot, ảnh).
6. **Cảnh mẫu của đạo diễn: `plates/e3-three.js`** (đọc hết — cách tra mốc, camera trôi, k từng phần theo TỪ, nhãn
   phẳng cạnh điểm chiếu, dấu vuông, mascot, công thức) + khung `out/en/solid-geometry/qa/e3.jpg`. Bàn thử phong cách:
   `tools/lab/shadowbox.html` (khung 1 = năm khối Platon).
7. `projects/en/solid-geometry/data/lines.txt`: dòng `## mục [hồi]` rồi các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường,
   đúng như lookup cần). Phần p1 (mở bài) ghi `p1 i …`.
8. `projects/en/solid-geometry/assets/history/INDEX.md`: ảnh có sẵn (`giza.jpg`, `cicero-tomb.jpg`) + credit bắt buộc.

## Hợp đồng một cảnh

File `projects/en/solid-geometry/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file. Mẫu đầy đủ: `plates/e3-three.js`.
- `static ERA = 'desk'` (một chất liệu cả bài). `static POSES` CHỈ tư thế được giao. `static IMAGES = { giza: './assets/history/giza.jpg' }` nếu cần.
- `init({ tl })`: `const { L, w } = lookup(tl, '<tên>')`; MỌI mốc lấy từ chữ (`w(i, 'từ', n)`), không gõ giây tay.
  `this.START = L(câu đầu).start`; `this.FROM = max(START − lead, L(câu cuối cảnh trước).end + 0.5)`, lead = 1.2 (cảnh
  thường) / **2.6 (mục MỞ HỒI)**.
- `sfx()` → `[{ t, kind }]` giờ timeline. `render(g, t)`: THUẦN theo t; gọi `ground(g)` đầu tiên.

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("doesn't", "b's", "three-legged"). Từ LẶP trong câu →
truyền n; `prog(t, a, b)` ném lỗi khi b < a. Chạy `python3 tools/qa/lookups.py solid-geometry` và đọc TỪNG dòng "LẶP"
(công cụ chỉ thấy lời gọi dạng `w(<số>, '<từ>'[, n])` nháy ĐƠN).

**Chuyển cảnh.** Trang lo 0.9 s từ FROM: tờ cũ trượt lên (lật tờ giấy, tiếng `page` tự có). Cảnh phải ĐẸP ở mọi
t ∈ [FROM, FROM cảnh sau + 0.9], kể cả trước START. Phần tử đầu tiên vẽ từ FROM + 0.3 (không khung trống).

**Thẻ hồi** (mục MỞ HỒI: b1 c1 d1 e1 f1 g1 h1 i1 j1 k1): `actCard(g, t, START, 'ACT ONE', 'Three bricks', 'ANSWERS 1')`
trong 2.5 s trước START; đèn tắt–bật 0.3 s quanh START − 2.4 (`dark(g, …)`, lamp `on`), tiếng `shimmer` ở START − 2.3.
ANSWERS 1 / 2 / 3 chỉ ở b1 / f1 / h1. **Biển mục** mọi cảnh: `sectionTag(g, 'ACT IV · THREE PERPENDICULARS')` (≤ 44 ký tự).

**3D (bắt buộc).**
- Camera `camera()` / `camLerp()`: trôi chậm ≤ 4°/s khi đang giảng, ĐỨNG khi người xem cần đọc nhãn; xoay nhanh chỉ
  khi lời nói "in space" / "lift it". Hình chính ở x ≈ 600–1800 (chừa chỗ chữ trái-trên và mascot).
- Đèn cố định của cảnh (`lamp()` ở mép trên, toạ độ thế giới của đèn dùng cho `shadow()` và `solid(…, L)`). **Mọi khối có
  bóng** (`shadow()` / `sheetShadow()`). Bóng "cam đậm" CHỈ khi nó LÀ hình chiếu đang nói tới.
- Cạnh khuất nét đứt (`solid` lo). Chữ, nhãn PHẲNG, hướng màn hình, đặt cạnh điểm chiếu (≤ 60 px), không đè nét/khối.
- Thứ tự vẽ: bóng → tờ bìa/sàn → khối/chỉ (xa → gần) → nhãn → mascot. Đường xuyên qua tờ bìa: phần dưới nét đứt.

**Vật dùng chung** (DNA §11 — KHÔNG tự đặt lại): `ROOM` (12 × 4 × 3, `ROOM.edges.topFront/nearVertical/farVertical/
wallCeiling`, `room()`), `PLATONIC` (5 khối đã kiểm), `box/prism/pyramid/revolve/sphere`, `rest()`, `xf()`. Cùng một
vật ở hai cảnh = cùng số, cùng hình học, cùng màu. Ghế ba chân / bốn chân, cầu vượt, sách, thang, lon… chưa có trong kit:
dựng cục bộ trong cảnh bằng `solid`/`thread`/`sheet` (báo lại để đạo diễn gom).

**Hình bám lời.** Mỗi câu ≥ 1 thay đổi bám đúng TỪ. Không khung đứng yên > 3 s (đèn đung đưa không tính). Vật rời khung
bằng chuyển động. Chữ không fade (viết vào theo `k`). Mỗi khung MỘT ý chính. **Dải xé** (`tornStrip`) CHỈ ở 4 chỗ DNA §1
cho phép. Kết luận viết xong TRƯỚC câu cuối của cảnh. Mascot: CHỈ tư thế được giao, một bên khung, chân chạm đáy,
3–8 s quanh đúng câu (`figure(g, pose, cx, H, h, k)`; toàn thân crop 0.45 thì h ≈ 560; `stool`/`icosa` h ≈ 720–800).

**Toán / số.** Mọi số lên hình tính bằng code + `must(…)` ở trạng thái ĐÃ XONG (không ở khung chuyển tiếp, §70). Chỉ
số liệu trong CONTENT.md; làm tròn ghi "≈". **Tất định**: không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter`
trong render.

**Chữ.** `it()` (Cormorant LN nghiêng), `label()` (Plex in hoa), `mono()`, `formula()` + `perp/para/iff/frac` (font
thiếu ⊥ ∥ ⇔ φ ⅓ — DNA §3). Chỉ cỡ có trong `kit.FONTS`; cần cỡ khác → báo. Chữ nhỏ ≥ 4.5:1.

## Tiếng hiệu ứng (DNA §10)

`flap` (gấp bìa lên) · `pen` (kẻ nét, một tiếng mỗi cụm) · `shimmer` (đèn bật / bóng hiện) · `tick` (đếm) · `snap` (khít/khoá)
· `chip` (khối đơn vị — một mỗi lớp) · `correct` (tam giác cam xong) · `tear` / `wood` / `dice` theo hạn mức. Chuyển cảnh
tự có tiếng `page` — đừng thêm ở FROM. **≤ 1 tiếng / 3 s** mỗi cảnh (ngoài chùm đếm); không hai tiếng trong 0.25 s.

| nhóm | tear | wood | dice | correct | shimmer |
|---|---|---|---|---|---|
| e3 (đạo diễn) | 0 | 0 | 0 | 1 | 1 |
| G1 a0 + k1–k4 | 0 | 1 | 0 | 1 | 2 |
| G2 b1–b3 | 0 | 2 | 0 | 0 | 1 |
| G3 c1–c4 | 1 | 0 | 0 | 1 | 1 |
| G4 d1–d3, e1, e2, e4 | 1 | 0 | 0 | 1 | 2 |
| G5 f1–f5 | 1 | 0 | 0 | 2 | 1 |
| G6 g1–g4 | 0 | 0 | 0 | 1 | 1 |
| G7 h1–h4 | 0 | 0 | 2 | 0 | 1 |
| G8 i1–i3, j1 | 1 | 0 | 0 | 1 | 2 |
| G9 j2–j5 | 1 | 0 | 0 | 0 | 1 |
| **TỔNG** | **5 ≤ 5** | **3 ≤ 3** | **2 ≤ 2** | **8 ≤ 8** | **13 ≤ 14** |

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
# giờ TRANG = mốc timeline + LEAD (build.json: p1 lead 0.6, p2 lead 3.0). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/solid-geometry/p2.html?plates=<các cảnh của bạn>" --dur 1100 \
  --t <giờ trang,…> --outdir out/en/solid-geometry/qa/<nhóm>
python3 tools/qa/sheet.py out/en/solid-geometry/qa/<nhóm> out/en/solid-geometry/qa/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/solid-geometry/p2.html?plates=<các cảnh của bạn>"   # mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/solid-geometry/p2.html?plates=<các cảnh của bạn>" --out out/en/solid-geometry/qa/<nhóm>-cues.json
python3 tools/qa/lookups.py solid-geometry
```
(a0 ở trang `p1.html`, `--dur 60`.)
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 và khung cuối cảnh. Mở ít nhất 4 khung ở ĐỘ PHÂN GIẢI GỐC (Read .png), sửa
  hết: chữ chạm mép / tràn; chữ đè nhân vật / đè nét; hình 3D đọc sai (cạnh khuất vẽ liền, mặt tô sai thứ tự, bóng sai
  phía đèn); khung đứng im > 3 s; khung trống; ký tự rơi về font khác. `shoot.js check` phải thoát 0.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p1.html`, `p2.html`, `plates/*-order.js`, cảnh nhóm khác;
  KHÔNG commit; KHÔNG gọi agent. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo).
- Không gọi OmniVoice, không render video. `shoot.js` luôn kèm `--page`.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, hàm cục bộ đáng gom vào kit, chỗ còn băn khoăn.
