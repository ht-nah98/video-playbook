# Brief: dựng cảnh phần 2 của calculus ("The Impossible Question That Created Calculus")

Bạn dựng MỘT NHÓM cảnh (G1 / G2 / G3 / G4 — ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch".
Lời đọc tiếng Anh đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/calculus/DNA.md` — **survey · đường mòn + sổ đo đạc thực địa**: sườn đồi y = x² cắt dọc, cọc tiêu sọc đỏ
   trắng, dây đo xanh, sào ngắm, sổ đo bìa vải xanh. Vật xuyên suốt = SƯỜN ĐỒI. Màu mang nghĩa: đỏ cọc tiêu = điểm đang hỏi
   + tiếp tuyến (sào) · xanh dây = cát tuyến · lục = đường cong · nâu đất = diện tích / dải · tím gạch chéo = phần thừa ·
   navy / giấy sổ = trung tính. Bảng "sườn đồi là gì" theo hồi (§1) là ý đạo diễn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/calculus/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/calculus/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/calculus/kit.js` — đọc HẾT. Tờ thử mọi vật: `kit-test.html`, ảnh `out/en/calculus/qa/kit.jpg` (+ `kit/t_*.png`,
   tờ 13 = vật dùng chung).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + `out/en/calculus/qa/a0.jpg` (+ `a0/t_*.png`); bàn thử `tools/lab/survey.html`.
7. `projects/en/calculus/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc [mục] câu | chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/calculus/assets/photos/INDEX.md`: 4 ảnh thật. Credit + nhãn BẮT BUỘC đã chép vào `kit.PHOTOS` — dùng
   `photo(g, key, x, y, w, h, { k, … })` (nhãn mặc định = `PHOTOS[key].label`), nạp bằng `static IMAGES = photoImages('key', …)`.

## Các mục của p2 → file cảnh, nhóm

Thời gian = giây trong p2 (cột 3 của lines.txt). ★ = mục MỞ HỒI (gọi `actTitle`). FROM = theo luật bên dưới.

| # | mục (`##` SCRIPT) | câu p2 | câu đầu … câu cuối | giây | file | ERA | nhóm |
|---|---|---|---|---|---|---|---|
| 1 ★ | A bowl (ACT ONE — Two points) | 0–3 | "Take a curve…" … "How steep is the curve, right here?" | 0.0–18.0 | `b01-bowl` | field | G1 |
| 2 | The secant | 4–7 | "We don't know how to handle a single point yet…" … "…slope of three." | 19.6–40.0 | `b02-secant` | field | G1 |
| 3 | An average | 8–11 | "But three isn't our answer." … "…a shorter stretch." | 41.7–55.3 | `b03-average` | field | G1 |
| 4 ★ | Sliding in (ACT TWO — Closer and closer) | 12–16 | "So let's slide the second point back…" … "…two point zero zero one." | 57.8–81.2 | `b04-sliding` | field | G1 |
| 5 | Lining up | 17–18 | "Look at the numbers lining up…" … "…not one of them goes past it." | 82.8–92.6 | `b05-lining-up` | field | G1 |
| 6 | The line turns | 19–21 | "On the picture, you can watch it happen." … "…one particular angle." | 94.3–105.1 | `b06-line-turns` | field | G1 |
| 7 | The tangent | 22–26 | "The line it settles on is special…" … "…where the slopes were heading." | 106.7–129.3 | `b07-tangent` | field | G2 |
| 8 ★ | Where it's heading (ACT THREE — The hole) | 27–31 | "That idea… is called a limit." … "…has no value." | 131.7–152.6 | `b08-heading` | field | G2 |
| 9 | Sneaking up | 32–36 | "But nothing stops us…" … "…as x approaches five, is ten." | 154.2–174.2 | `b09-sneaking` | field | G2 |
| 10 | A hole in the line | 37–40 | "Draw it, and you get a straight line…" … "…creep closer and closer." | 175.9–193.8 | `b10-hole` | field | G2 |
| 11 ★ | Back to the bowl (ACT FOUR — The derivative) | 41–46 | "Now the slope at a single point isn't stuck…" … "…heads straight for two." | 196.3–221.6 | `b11-back-to-bowl` | field | G2 |
| 12 | Every point at once | 47–49 | "Do the same at any point x…" … "…the derivative of x squared is two x." | 223.3–242.9 | `b12-every-point` | field | G3 |
| 13 | The speedometer | 50–54 | "And the derivative isn't only about hills." … "…see each instant clearly." | 244.7–273.2 | `b13-speedometer` | field | G3 |
| 14 ★ | The area under the bowl (ACT FIVE — Adding up thin slices) | 55–57 | "Integrals use the same idea…" … "…one for rectangles." | 275.6–290.0 | `b14-area` | **sheet** | G3 |
| 15 | Four strips | 58–61 | "So cut the area into four strips…" … "…trapped somewhere in between." | 291.7–312.0 | `b15-four-strips` | sheet | G3 |
| 16 | Thinner and thinner | 62–66 | "Now make the strips thinner…" … "…is the integral." | 313.7–343.0 | `b16-thinner` | sheet | G3 |
| 17 | Archimedes | 67–68 | "This isn't a modern trick." … "…in the same spirit as this." | 344.6–356.3 | `b17-archimedes` | **cover** | G4 |
| 18 ★ | The growing area (ACT SIX — Two sides of one coin) | 69–74 | "So derivatives cut a change into instants…" … "…is the curve itself." | 358.8–387.0 | `b18-growing` | sheet | G4 |
| 19 | Check it | 75–76 | "For our bowl, the area from zero to x…" … "…the very bowl we started with." | 388.7–399.6 | `b19-check` | sheet | G4 |
| 20 | The car, again | 77–79 | "Your car knows this too." … "…the fundamental theorem of calculus." | 401.2–415.1 | `b20-car` | field | G4 |
| 21 ★ | Putting it together (ACT SEVEN — Putting it together) | 80–82 | "A single point has a steepness because…" … "…back into a whole." | 417.7–438.6 | `b21-together` | field | G4 |
| 22 | Next time | 83–85 | "Next time you're walking up a hill…" … "…See you then." | 440.2–458.6 (+ TAIL 2.0) | `b22-next-time` | field (outro) | G4 |

**Nhóm (cân giây, tính từ FROM của cảnh đầu tới FROM của cảnh đầu nhóm sau; mỗi mối nối trong tay MỘT người):**
- **G1** = ACT ONE + ACT TWO tới "the line turns" — b01–b06, câu p2 **0–21**, FROM −3.0 → ~105.5 = **108.5 s**, 6 cảnh.
- **G2** = tiếp tuyến + ACT THREE + mở ACT FOUR — b07–b11, câu **22–46**, ~105.5 → ~222.1 = **116.6 s**, 5 cảnh.
- **G3** = hết ACT FOUR + ACT FIVE tới "thinner" — b12–b16, câu **47–66**, ~222.1 → ~343.4 = **121.3 s**, 5 cảnh.
- **G4** = Archimedes + ACT SIX + ACT SEVEN + outro — b17–b22, câu **67–85**, ~343.4 → 460.6 (cuối p2) = **117.2 s**, 6 cảnh.
Thẻ hồi (`actTitle(g, t, START, 'ACT ONE', 'Two points')`): chữ hồi + phụ đề tách ở " — " từ cột `act` của timeline:
ONE "Two points" · TWO "Closer and closer" · THREE "The hole" · FOUR "The derivative" · FIVE "Adding up thin slices" ·
SIX "Two sides of one coin" · SEVEN "Putting it together" (phụ đề dài nhất đo 554 / 1000 px).

## Hợp đồng một cảnh

File `projects/en/calculus/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, AR, MO, ground, hill, secant, rod, spot, hiker, card, secTag, actTitle, figure, VIEWS, STEPS, prog, lookup, must } from '../../kit.js';
export default class Bowl {
  static ERA = 'field';                                  // 'field' (sườn đồi) | 'sheet' (trắc dọc, trời nhạt) | 'cover' (bìa sổ — ảnh)
  static IMAGES = {};                                    // ảnh thật: photoImages('newton', …)
  static POSES = ['pointer'];                            // CHỈ tư thế được giao (bảng Mascot dưới)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');                  // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { take: w(0, 'take') };                     // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(0).start;
    this.FROM = -3.0;                                    // b01: khung 0 của p2 (LEAD 3.0). Cảnh khác: luật FROM bên dưới
  }
  sfx() { const T = this.T; return [{ t: T.take, kind: 'pen' }]; }
  render(g, t) {
    const T = this.T; ground(g, 'field', t);             // tự tô nền toàn khung (mây / chim theo giờ video)
    actTitle(g, t, this.START, 'ACT ONE', 'Two points');
    secTag(g, 'A bowl', { k: prog(t, this.START + 0.4, this.START + 0.8), t });
    /* … */
  }
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy / gạch nối như `lines.txt` ("let's", "it's", "you've", "right-hand",
"twenty-five", "we'd", "they're", "car's", "sixties", "eighty-four"…). Sai từ → `lookup` ném lỗi. Từ LẶP trong câu → truyền n ("two",
"one", "zero", "point", "x", "h", "is", "the"… lặp rất nhiều trong bài này); `prog(t, a, b)` ném lỗi khi b < a (§59).
Chạy `python3 tools/qa/lookups.py calculus` và đọc TỪNG dòng "LẶP" — công cụ chỉ đọc lời gọi `w(<số>, '<từ>'[, n])`
(nháy ĐƠN, chỉ số viết thẳng).

**FROM — một luật.** `FROM = max(START − lead, KẾT của cảnh trước + 0.5)`; lead = 1.2 (cảnh thường) / 2.6 (mục MỞ HỒI ★);
KẾT = `end` câu cuối của cảnh trước (lines.txt cột 4), hoặc mốc kết chuyển động đặc biệt của nó nếu muộn hơn (§44, §64).
**FROM của cảnh sau = tính từ mốc KẾT cảnh trước** — cảnh đầu nhóm sau tính từ KẾT cảnh cuối nhóm trước theo lines.txt
(không chờ nhóm kia): b07 từ end câu 21 (105.09), b12 từ end câu 46 (221.60), b17 từ end câu 66 (342.97). Ai đổi KẾT
(chuyển động kéo dài sau câu cuối) phải báo đạo diễn.

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: cùng ERA → **thước dây vàng kéo ngang** (`kit.tapeSwap`, cảnh
mới lộ phía sau, bên TRÁI lộ trước; `whoosh` tự động); khác ERA → **lật trang sổ đo** (`kit.pageSwap`, `whoosh-long`).
Lật trang chỉ ở: b13 → b14, b16 → b17, b17 → b18, b19 → b20. Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể
cả trước START. `CONTINUES = true` (khung đầu TRÙNG khung cuối cảnh trước → cắt thẳng, im): chỉ dùng khi nhóm bạn sở
hữu cả hai phía mối nối.

**Mối nối đặc biệt (ai sở hữu):**
- **p1 → b01 (G1).** p1 kết bằng `kit.bare(g, t)` (trời + núi xa trơn, không đồi, không mascot — a0 S3 rút hết). b01
  `FROM = -3.0`, vẽ ĐÚNG `bare(g, t)` cho t ≤ START − 2.45 (không vật nào khác); thẻ hồi ACT ONE; rồi cái chén vẽ dần đúng
  hình học a0 S3: `hill(g, VIEWS.bowl, { a: -3, b: 3.6, k, t })` ("comes down, flattens out… climbs again" = k chạy theo
  ba cụm từ). "Our walker" → `hiker` + `spot` tại (1, 1); "one, one" → thẻ "(1, 1)". Khung đứng yên đầu p2 ≤ 1.2 s.
- **b06 → b07 (G1 → G2).** b06 kết ở VIEWS.zoom: sườn, (1, 1), dây cuối cùng đã "settles at one particular angle". b07
  mở ở ĐÚNG VIEWS.zoom (hill a −1.2, b 3.6; spot (1, 1)) để thước dây lộ cùng thế giới; sào hạ xuống ở "special".
- **b10 → b11 (G2).** Từ đường mòn (VIEWS.trail) về lại cái chén — thẻ hồi ACT FOUR che giữa.
- **b11 → b12 (G2 → G3).** b11 kết "two plus h heads straight for two" (VIEWS.zoom hoặc bowl, sào ở (1, 1)). b12 mở VIEWS.bowl.
- **b13 → b14 (G3).** Lật trang sang ERA sheet; b14 – b16 dùng VIEWS.area (trắc dọc 0…1 như a0 câu 7).
- **b16 → b17 (G3 → G4).** Lật trang sang ERA cover (ảnh Archimedes); b17 → b18 lật lại sheet, VIEWS.area.
- **b20 (G4).** Bánh xe đo vẽ ĐÚNG như b13: `wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, … })`.
- **b21 (G4).** Tóm tắt: ba thẻ lời hứa ①②③ gọi ĐÚNG `promiseCard(g, i, { … })` (cùng `PROMISE.xs`, base, hình trên
  trang — như a0 S2), mỗi thẻ thêm câu trả lời (thẻ giấy). Đừng vẽ thẻ mới.
- **b22 (G4).** Outro: người đi bộ leo dốc (đùi "cảm" đạo hàm), đồng hồ tốc độ ↔ công-tơ-mét; cuối: "99% from scratch"
  + SUBSCRIBE đứng yên ≥ 4 s, mascot `pose-wave`. Trang p2 có TAIL 2.0 → khung cuối = L(85).end + 2.0.

**Biển tên mục / thẻ hồi.** `secTag(g, tên mục, { k, lift, t })` — thẻ giấy góc trên trái (x 104, y 72, cao 66, mép trái
sọc cọc tiêu): chừa vùng x 96–830, y 64–150. Chữ 700 34px, tối đa `SEC_MAX` 720 px. Mục ★ gọi thêm
`actTitle(g, t, START, 'ACT ONE', 'Two points')`: cuốn sổ bìa xanh x 410–1510, y 300–760 từ START − 2.45 tới START + 0.45
— đừng đặt vật quan trọng ở đó lúc ấy; secTag bật SAU START + 0.4.

**Vật dùng chung với nhóm khác** (§71) — vẽ lại ĐÚNG, không tự đặt lại:
| vật | hình học / hàm | ai dùng |
|---|---|---|
| cái chén cả bát | `hill(g, VIEWS.bowl, { a: -3, b: 3.6, t })`; (1, 1) ở (1230, 755), (2, 4) ở (1560, 230) | a0 S3, b01–b03, b11, b12, b22 |
| vùng quanh (1, 1) | `VIEWS.zoom` ((1, 1) ở (820, 640)), `hill(…, { a: -1.2, b: 3.6 })`; camera `lerpView(VIEWS.bowl, VIEWS.zoom, k)` | a0 câu 5–6, b04–b07, b11 |
| trắc dọc 0…1 | `VIEWS.area` ((0, 0) ở (540, 920), 800 × 720) + `columns(g, V, n, { side, k, excess })`, `areaFill` | a0 câu 7, b14–b16, b18–b19, b21 |
| đường mòn có hố | `VIEWS.trail` ((5, 10) ở (960, 560)); `plot(g, V, u => u + 5, a, b, { color: C.soilInk, w: 14 })` + lớp `#E2C792` w 8 + `hole(g, V.X(5), V.Y(10))` + `flag` (như kit-test tờ 5) | b08–b10, b21 |
| dây đo / cọc / sào / điểm | `secant(g, V, 1, x2, { k, a, ext: 0.3, ext0: 0.03, poleK, lift })` (trả dốc) · `rod(g, V, 1, { d0, d1, k, hover, turn, lift })` · `spot` · `rangingPole` | G1, G2, G3 (b12 sào ở x = 0, 1, 3) |
| người đi bộ | `hiker(g, x, y, s, { step, flip })` — đứng ở (1, 1) khung bowl / open; ở zoom lùi về (0.78, 0.61) như a0 | G1, G2, G4 |
| sổ đo STEPS | `ledger(g, BOOK.x, BOOK.y, BOOK.w, BOOK.h, { cols: STEP_COLS, rows: STEP_ROWS, shown, hi })` (trên-trái khung zoom) | b04, b05, b21 |
| sổ đo khác | `ledger(…)` cột tự chọn (NEAR5 cho b09, RIEMANN + `interval` cho b16 — như kit-test tờ 3) | b09, b16 |
| kính lúp | `loupe(g, cx, cy, r, () => { … view phóng … })` — soi 1.01 / 1.001 / "never on top" | b04, b06, b07 |
| bánh xe đo | `wheel(g, WHEEL.cx, WHEEL.y, { r: WHEEL.r, dist, speed, odo })`; `speedometer` (KHÔNG số km/h), `odometer` | b13, b20, b22 |
| ảnh thật | `photo(g, key, x, y, w, h, { k, from, rot, zoom })` rộng ≥ 330 px; nhãn tự in (3 thẻ cho archimedes) | b13, b17, b20 |
| lời hứa ①②③ | `promiseCard(g, i, { k, kp, cap, flip, ap })`, `PROMISE`, `coin`, `mini` | b21 |
| hằng số | `STEPS` · `tanAt` / `touchesOnce` · `D2X {0: 0, 1: 2, 3: 6}` · `NEAR5` · `lim(x)` · `RIEMANN` / `upper(n)` / `lower(n)` · `AREA(x)` · `YEARS` · `fmt` (đã `must` trong kit) | mọi nhóm |

**Ảnh thật** (nhãn BẮT BUỘC từ `PHOTOS[key].label`, credit kit tự in):
| key | dùng ở | nhãn (tự in) |
|---|---|---|
| `newton` | b13 ("Isaac Newton in England"), b20 ("Newton and Leibniz") | ISAAC NEWTON · 1643–1727 |
| `leibniz` | b13 ("Gottfried Leibniz in Germany"), b20 | GOTTFRIED LEIBNIZ · 1646–1716 |
| `nova` | b13 ("published his first, in 1684") — a0 đã dùng ở "for centuries" | NOVA METHODUS / ACTA ERUDITORUM · 1684 |
| `archimedes` | b17 — a0 đã dùng ở câu 7 | ARCHIMEDES / AS IMAGINED IN 1620 / c. 287–212 BC |

**Hình bám lời** (theo bảng §1 DNA; mỗi mục một ý chính):
- G1 — b01: chén vẽ dần theo "comes down / flattens out / climbs again", walker + (1, 1), "How steep… right here?" → sào
  lơ lửng chưa hạ (dấu ?). b02: cọc thứ hai cắm ở "two" (2, 4); dây căng ở "join"; chữ "secant" trên thẻ xanh; tam giác
  RISE 3 / RUN 1 (đoạn navy như a0), "slope = 3" xanh. b03: đoạn 1…2 dốc dần — sào nhỏ trượt dọc đoạn cho thấy dốc tăng;
  "average" → thẻ "AVERAGE"; "steep part… mixed in" → phần trên của đoạn đánh dấu. b04 ★: camera bowl → zoom; cọc dời
  1.5 → 1.1 → 1.01 → 1.001 mỗi câu; sổ BOOK ghi từng dòng đúng chữ được đọc (y, rise, run, slope); 1.01 / 1.001 soi
  kính lúp. b05: sổ khoanh cột dốc, mũi tên navy "→ 2"; hàng số trên đường số tiến về 2 từ một phía (không vượt). b06:
  quạt dây xoay quanh (1, 1), góc quay mỗi lần nhỏ dần (vẽ cung góc), dừng ở một góc.
- G2 — b07: sào HẠ xuống áp đúng một điểm (`touchesOnce`), "ruler… outside of a bowl"; chữ "tangent" thẻ đỏ; "slope = 2";
  "never put the second point on top" → kính lúp + hai cọc chồng → 「0 ÷ 0」 nứt (pose-halt); "heading" → mũi tên.
  b08 ★: "limit" thẻ; biểu thức `math('(x² − 25) / (x − 5)')`; thay 5: tử 25 − 25 = 0, mẫu 5 − 5 = 0, 「0 / 0」 (frac),
  "no value" → hố. b09: hai người đo tiến từ hai phía trên đường mòn (4.9, 4.99 | 5.1, 5.01), sổ NEAR5 ghi, kết "→ 10".
  b10: đường mòn thẳng y = x + 5 vẽ dần, hố tại (5, 10), cờ; "x plus five" thẻ; "around it… closer" → hai chấm lần tới
  (như `mini(… ap)`). b11 ★: lại cái chén; khoảng h giữa hai cọc = thước dây vàng; đại số 2h + h² ÷ h = 2 + h (math);
  h = 0.1 → 2.1, h = 0.01 → 2.01 (STEPS); "never set h to zero" (pose-halt) → h co mà không chạm 0.
- G3 — b12: `math('2x + h')` → `2x`; sào đặt ở x = 1 (dốc 2), x = 3 (dốc 6), x = 0 (nằm ngang, pose-ok); "derivative"
  thẻ; "derivative of x squared is two x". b13: bánh xe đo lăn trên dốc; "height ↔ distance, run ↔ time"; đồng hồ tốc độ
  (kim đỏ — "right now"), không số km/h; ảnh Newton + Leibniz + trang 1684 kẹp. b14 ★ (sheet): vùng dưới chén 0…1 tô nhạt,
  "no simple formula" → dấu ?; "rectangles" → một hình chữ nhật mẫu. b15: 4 cột (`side: 'right'`), phần thừa tím, tổng ≈ 0.47
  (thẻ tím); `side: 'left'` nét đứt ≈ 0.22 (thẻ navy); "trapped in between" → ngoặc / khoảng. b16: 10 / 100 / 1000 cột; sổ
  RIEMANN + `interval` co về ⅓; "gap = 1 / n" (frac); "one third" → `frac('1', '3')` màu `C.soilInk` (⅓ là DIỆN TÍCH — không đỏ); "integral".
- G4 — b17 (cover): ảnh Archimedes + hình mảnh parabol vẽ tay trên giấy kẹp (chặn hai phía). b18 ★: cột đất tới x; lát mỏng
  rộng h cao = chiều cao đường cong; (diện tích thêm) ÷ h = chiều cao. b19: `math('x³/3')`, x = 1 → ⅓ (AREA); "derivative
  of x³/3 is x²" → lại cái chén. b20: bánh xe đo — đồng hồ tốc độ (đạo hàm) ↔ công-tơ-mét lăn số (tích phân); Newton +
  Leibniz kẹp; "fundamental theorem of calculus" thẻ lớn (`impact` một lần). b21 ★: ba thẻ ①②③ + câu trả lời. b22: outro.
- Mỗi câu ít nhất một thay đổi bám đúng TỪ được đọc. **Không khung nào đứng yên quá 3 s** (kênh Anh): khi không có vật mới,
  cho camera nhích / cọc dời / dòng sổ ghi. Cảnh MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động (`lift`, trượt ra, lặn), không biến mất giữa khung. Chữ hiện theo DNA: thẻ giấy bật
  (`card` k), ghi sổ từng ký tự (`text` k, `ledger` shown) — KHÔNG fade.
- **Nhãn của một cụm bật ở TỪ ĐẦU cụm và sống ≥ 1.5 s** (LESSONS §130). Mỗi khung ≤ 3 cụm chữ lớn, MỘT ý chính.
- Hiểu lầm → **bút navy** `pen()` gạch đúng CHỮ sai, ý đúng viết ngay cạnh; KHÔNG đỏ / tím cho "sai".
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / mũi tên = navy `C.ink`. Đỏ CHỈ cho điểm đang hỏi /
  sào / dốc tại một điểm; xanh CHỈ cho cát tuyến; nâu CHỈ cho diện tích; tím CHỈ cho phần thừa.
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; kết luận viết xong TRƯỚC câu cuối của cảnh (§64).
- Vật đứng yên (biển mục, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, không theo camera. Camera chỉ đi khi cảnh có vật lớn (sườn đồi).

**Toán / số.** Mọi số lên hình tính bằng code (hằng của kit hoặc `must`); chỉ số trong CONTENT.md; "≈" cho 0.47 / 0.22.
`must()` chỉ đặt ở trạng thái ĐÃ XONG (sau chuyển động) — khung chuyển tiếp ném lỗi làm chết render (§70). Công thức qua
`math()` (biến nghiêng, chữ thường — chữ hoa ném), phân số chồng qua `frac()`; mũ ² ³ KHÔNG viết bằng Plex Mono. Số thập phân
hiển thị qua `fmt()` (bỏ rác dấu phẩy động). Dấu trừ thật U+2212.

**Tất định.** Không `Math.random` / `Date.now` (→ `hash(i)`); không `shadowBlur` / `ctx.filter` trong render (§127) — bóng =
`shadowRR` / `shade({ box })` / `glow` (kit re-export từ engine/shade.js).

**Chữ.** Trang nạp đủ `kit.FONTS`. Dùng hàm chữ của kit (`text`, `math`, `frac`, `card`, `secTag`, `measure`, `fits`).
Chữ ≥ 28 px, chuỗi có số ≥ 30 px — kit ném lỗi. Thẻ đã đứng yên mà tràn vùng an toàn → kit ném lỗi.

**Mascot.** CHỈ tư thế được giao, góc dưới TRÁI (cx ≈ 205, chân = H, cao ≤ 262 — kit ném > 270), 3–8 s quanh đúng câu,
NÓI (`figure(g, pose, 205, H, 262, k, { t })`), vào / ra bằng trồi / lặn. Chữ không vào vùng x 60–340, y 810–1080.
| nhóm | tư thế |
|---|---|
| G1 | pointer (b01–b03, b06), calculator (b04–b05) |
| G2 | pointer (b07, b10–b11), halt (b07 "never put… on top", b11 "never set h to zero"), ponder (b08–b09) |
| G3 | pointer (b12, b14–b15), ok (b12 "at zero, it's zero: perfectly flat"), calculator (b13, b16) |
| G4 | ponder (b17), pointer (b18–b19, b21), calculator (b20), wave (b22) |

## Tiếng hiệu ứng (DNA §10; docs/lesson/SFX.md)

| chuyển động | kind |
|---|---|
| cắm cọc / sào chạm | `wood` / `tick` |
| dây đo căng, dây khép vào sào | `snap` (HIẾM) |
| ghi sổ một cụm / bút gạch | `pen` |
| thẻ giấy bật | `card` |
| ảnh kẹp / lật | `page` |
| điểm / hố bật | `pop` |
| đếm cột, dây lóe | `tick` |
| 0 ÷ 0 nứt | `crack` (HIẾM) |
| "= ?" treo | `question` (HIẾM) |
| sào chạm đúng một điểm / kết quả xác nhận | `correct` (HIẾM) |
| ⅓, "à ra thế" | `shimmer` (HIẾM) |
| bánh xe lăn / công-tơ-mét nhảy số | `reel` (HIẾM) |
| đồng xu lật | `coin` (HIẾM) |
| định lý cơ bản | `impact` (HIẾM) |
- Thước dây / lật trang: trang TỰ có tiếng — đừng thêm ở FROM.
- **Mật độ từng nhóm** (≥ thời lượng ÷ 4, ≤ ÷ 2.5, tính cả tiếng chuyển cảnh): G1 108.5 s → **27–43** · G2 116.6 s →
  **29–46** · G3 121.3 s → **30–48** · G4 117.2 s → **29–46**. Không hai tiếng trong 0.25 s; khoảng lặng dài nhất ≤ 4 s;
  mỗi loại ≤ 25% tổng của nhóm.
- Hạn mức loại HIẾM (trần cả video DNA §10):

| nhóm (cảnh) | shimmer | correct | snap | crack | question | coin | reel | impact |
|---|---|---|---|---|---|---|---|---|
| a0 (đạo diễn, p1 — đã đếm bằng `shoot.js cues`, 25 tiếng) | 1 | 1 | 1 | 1 | 0 | 1 | 0 | 0 |
| G1 b01–b06 | 1 | 1 | 2 | 0 | 1 | 0 | 0 | 0 |
| G2 b07–b11 | 1 | 1 | 2 | 1 | 1 | 0 | 0 | 0 |
| G3 b12–b16 | 2 | 1 | 2 | 0 | 1 | 0 | 3 | 1 |
| G4 b17–b22 | 1 | 1 | 1 | 0 | 0 | 2 | 3 | 1 |
| **TỔNG** (đã cộng) | **6 ≤ 6** | **5 ≤ 5** | **8 ≤ 8** | **2 ≤ 2** | **3 ≤ 3** | **3 ≤ 4** | **6 ≤ 6** | **2 ≤ 2** |

Báo số đã dùng theo loại. Sau khi gộp, đạo diễn đếm lại bằng `shoot.js cues` cả hai trang (tổng cả video 132–211).

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD 3.0 (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/calculus/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 470 \
  --t <mốc trang,…> --outdir out/en/calculus/qa/<nhóm>
python3 tools/qa/sheet.py out/en/calculus/qa/<nhóm> out/en/calculus/qa/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/calculus/p2.html?plates=<các cảnh của bạn>"   # chạy khô MỌI khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/calculus/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py calculus
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước — thấy thước dây / lật trang) và khung cuối cảnh. G1:
  chụp thêm p2 t = 0.0, 0.3 (phải TRÙNG khung cuối p1 `out/en/calculus/qa/a0/t_65.60.png` — trời + núi trơn) và lúc cái
  chén bắt đầu vẽ.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ /
  đè người đi bộ; tương phản thấp; khung đứng im > 3 s; vật biến mất giữa khung; nhãn tí hon (đang bật / bật ở từ cuối —
  §130). `[PAGE ERROR]` = lỗi JS.
- `node engine/render/shoot.js check --page projects/en/calculus/p2.html` (cả trang, sau khi điền `plates/p2-order.js` —
  hoặc `?plates=` các cảnh của bạn nếu nhóm khác chưa xong) phải thoát 0 TRƯỚC khi báo xong — ảnh chụp từng câu không
  trúng khung chuyển tiếp, chạy khô thì trúng (§70).

## Giới hạn

- Chỉ tạo / sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh / chạy khô). `shoot.js` luôn kèm `--page`.
- **KHÔNG `pkill -f` / `killall` / `pgrep -f … | kill`**: nhiều nhóm chạy `shoot.js check` cùng lúc (LESSONS §98). Dừng lệnh
  của mình bằng PID (`ps -eo pid,cmd | grep -v zsh`, rồi `kill <pid>`).
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, chỗ còn băn khoăn.
