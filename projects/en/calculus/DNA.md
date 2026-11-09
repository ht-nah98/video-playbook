# DNA của `calculus` — "The Impossible Question That Created Calculus" · survey (đường mòn + sổ đo đạc thực địa)

Đạo diễn chọn 2026-10-21 (toàn quyền người dùng) trong 3 hướng (`out/_lab/calculus-styleframes-compare.jpg`): **survey**.
Bàn thử gốc: `tools/lab/survey.html` (khung 0 = cold open / thumbnail, khung 1 = trắc dọc 4 dải + sổ đo). Viết TỪ
`SCRIPT.md` + `CONTENT.md`. Kit: `kit.js` (đồ nghề), tờ thử `kit-test.html` → `out/en/calculus/qa/kit.jpg`; cảnh mẫu
`plates/a0-open.js` → `out/en/calculus/qa/a0.jpg`.

## 1. Ý trung tâm + vật xuyên suốt
**"Dốc tại đúng chỗ chân đứng" là câu hỏi của người ĐO ĐẠC NGOÀI TRỜI.** Cả bài là một buổi sáng trên sườn đồi cỏ: trời
mát, núi xa có đường đồng mức, một người đi bộ nhỏ, đoàn trắc địa với cọc tiêu sọc đỏ trắng, dây đo xanh căng giữa hai
cọc, sào ngắm và cuốn sổ đo bìa vải xanh kẻ ô. Mọi số đều được GHI VÀO SỔ — tính được (bằng code, `must`) mới ghi.

**Vật xuyên suốt = SƯỜN ĐỒI y = x²** (cắt dọc thấy lớp đất).

| hồi | sườn đồi là gì |
|---|---|
| Cold open | thumbnail: sườn phải, người đi bộ trên điểm sáng (1, 1), sào lơ lửng, quạt dây đo; RISE ÷ RUN = tam giác cọc; hai cọc trượt làm một → 「0 ÷ 0 = ?」 nứt; zoom vào (1, 1): dây 3 · 2.5 · 2.1 · 2.01 → sào chạm → 「= 2」; lùi về trắc dọc: cột đất 4 → 10 → 100 → đất đặc = ⅓ |
| ACT ONE | cả cái chén (VIEWS.bowl); người đi bộ ở (1, 1); cọc thứ hai ở (2, 4), dây đo = cát tuyến dốc 3 (TRUNG BÌNH của cả đoạn — đoạn trên dốc hơn) |
| ACT TWO | camera zoom (VIEWS.zoom); cọc dời 1.5 → 1.1 → 1.01 → 1.001, mỗi lần một dòng chép vào sổ đo; dây xoay khép dần vào SÀO (tiếp tuyến) — chạm đúng một điểm; kính lúp cho 1.01 / 1.001 |
| ACT THREE | đường mòn THẲNG y = x + 5 (VIEWS.trail) có MỘT hố cọc rỗng tại (5, 10), cờ hiệu cắm cạnh; hai người đo tiến lại từ hai phía 4.9 / 4.99 ↔ 5.1 / 5.01 |
| ACT FOUR | lại cái chén: khoảng giữa hai cọc là h (thước dây vàng rút ngắn); mọi điểm: sào ở x = 0 (nằm ngang), 1 (dốc 2), 3 (dốc 6); bánh xe đo + đồng hồ tốc độ; ảnh Newton, Leibniz, trang 1684 kẹp |
| ACT FIVE | trắc dọc (VIEWS.area, ERA sheet): đất dưới sườn 0…1 cắt thành CỘT ĐẤT; phần thò lên = đất đắp THỪA gạch tím; sổ đo [dưới, trên] co về vạch ⅓; ảnh Archimedes (ERA cover) |
| ACT SIX | cột đất lớn dần tới x, thêm MỘT lát mỏng rộng h; x³/3; bánh xe đo: công-tơ-mét (cộng dồn) ↔ đồng hồ tốc độ (ngay lúc này) |
| ACT SEVEN | ba thẻ lời hứa ①②③ vẽ lại (kit.promiseCard) kèm câu trả lời; người đi bộ leo dốc (đùi "cảm" đạo hàm) |

**Mục lục lời hứa** (cold open S2, b21 vẽ lại ĐÚNG): ba trang sổ đo đánh số tròn đỏ — ① dốc + sào chạm MỘT điểm ·
② 0/0 + đường thẳng thủng một lỗ (hai chấm lần tới lỗ) · ③ đồng xu hai mặt: dốc ↔ cột đất.
**Gạch hiểu lầm → sửa:** bút mực NAVY gạch qua chữ sai (`kit.pen`, vd "≈ 2" bị gạch, "= 2" ở lại). KHÔNG đỏ (đỏ = điểm
đang hỏi / tiếp tuyến), KHÔNG tím (tím = phần thừa của tổng Riemann).

### 1a. Vùng quanh (1, 1) đủ to (băn khoăn của lab)
Ở khung thumbnail (VIEWS.open, 375 × 186 px/đơn vị) quạt dây chỉ cách nhau vài px. Cảnh tiếp tuyến dùng **VIEWS.zoom**:
(1, 1) ở (820, 640), 760 × 420 px/đơn vị — dây x = 1.5 / 1.1 tách rõ, 1.01 / 1.001 soi bằng **`kit.loupe`** (kính lúp
đồng). Camera đi bằng `lerpView(A, B, k)` (tỉ lệ hình học, điểm nhìn trượt êm); tỉ lệ trục khác nhau là phép affine →
tiếp xúc giữ nguyên, sào vẫn chạm đúng một điểm (kiểm `kit.touchesOnce`).

### 1b. Sào đặt TRƯỚC mặt cắt (băn khoăn của lab)
Ngoài điểm chạm, tiếp tuyến nằm DƯỚI đường cong (trong đất). Vẽ sào (`kit.rodAt / rod`) như thước ĐẶT áp vào mặt cắt:
bóng sprite lệch xuống-phải 14 / 18 px rơi lên mặt đồi phía sau, đầu bịt đồng, mép sáng trên — đọc là vật ở lớp trước,
không cắm vào đất. Sào hạ xuống từ phía trời theo pháp tuyến (`k`, `hover`), nhấc đi theo `lift`. Vẽ SAU đồi, dây đo,
đồi cỏ gần; TRƯỚC điểm sáng và người đi bộ.

### 1c. Nền có vật đổi được (băn khoăn của lab; kênh Anh: không khung đứng yên > 3 s)
`kit.ground(g, era, t, { pan })`: mây trôi và đàn chim bay ngang theo **giờ VIDEO** (`setClock` — liền qua mối nối p1 →
p2), cỏ lay theo giờ; `pan` dịch núi xa (thị sai khi camera đi; mỗi cảnh một pan khác nhau → nền khác giữa các cảnh).
Đó là nền — nhịp nội dung vẫn do cảnh lo (§4).

## 2. Màu (một màu một nghĩa — kit đo khi nạp, < 4.5 thì ném)
| màu | nghĩa | chữ / nền (đo) |
|---|---|---|
| trời `#DCEAF1 → #F3F6EE`, giấy sổ `#FBF7EA`, mực navy `#22313B` | TRUNG TÍNH | navy/trời 10.9 · navy/giấy 12.5 · xám dim `#4E5B66`/giấy 6.5 |
| **đỏ cọc tiêu** `#D9481E` (chữ `#B23A12`) | **ĐIỂM ĐANG HỎI + TIẾP TUYẾN (sào)**, dốc tại một điểm ("= 2") | 4.9 trên trời · 5.6 trên giấy |
| **xanh dây đo** `#2F6DB5` (chữ `#23579A`) | **CÁT TUYẾN** + dốc cát tuyến (3, 2.5, 2.1…) | 5.9 trời · 6.8 giấy |
| **lục sườn** `#3E7A3A` (chữ `#2E6A2B`), mặt cỏ `#9CC274` | **ĐƯỜNG CONG y = x²** | 5.3 trời · 6.1 giấy |
| **nâu đất** `#C9A46A`, lớp `#E7D3A8…#BE9562` (chữ `#6E4A1C`) | **DIỆN TÍCH / DẢI / tích phân** (⅓, x³/3) | 7.4 giấy · 6.4 trời |
| **tím gạch chéo** `#7A4FB8` (chữ `#5E3A9A`, nền `#E6DCF3`) | **PHẦN THỪA** của tổng trên | 7.7 giấy |
| bìa sổ vải xanh `#2F5A46` | ERA cover (ảnh kẹp), thẻ hồi | trắng/bìa 7.9 |
| thước dây vàng `#F2C230` | CHỈ chuyển cảnh + thước dây rút (khoảng h) | — |
Khoanh / gạch / mũi tên chỉ = **navy** (`pen`, `arrow`). Đường mòn y = x + 5 = nâu `soilInk` (đất), hố = vòng rỗng navy.

## 3. Chữ
**Archivo** 700–900 = chữ lớn, nhãn, thẻ hồi (đủ ÷ × ≈ − ² ³ → ·). **IBM Plex Mono 500** = chữ GHI SỔ (số liệu, bảng,
thẻ số). **Biến x y h n** = Cormorant Garamond Italic LN qua `kit.math()` — một chữ cái latin thường đứng riêng → nghiêng
(to 1.22×); "lim", số, dấu → thẳng. **Công thức KHÔNG viết hoa** (`math()` ném khi gặp chữ hoa). Không font nào có ✓;
⅓ của Plex quá nhỏ → `kit.frac()` vẽ chồng. Đã soi (kit-test tờ 4): Archivo **l / I giống hệt** → không viết l / I
đứng riêng bằng Archivo; Plex có 0 chấm giữa (khác O); mũ ² ³ trong Plex tách rời → công thức có mũ luôn qua `math()`
(Archivo / Cormorant), không viết bằng Plex. Dấu trừ thật U+2212. **Chữ ≥ 28 px, chuỗi có số ≥ 30 px** — `text / math /
card / frac / ledger / odometer` ném lỗi dưới mức (credit ảnh 14–20 px là ngoại lệ duy nhất, trong viền ảnh). Thẻ đã
đứng yên ra ngoài vùng an toàn x 96–1824, y 64–1016 → ném. ≤ 3 cụm chữ lớn mỗi khung.

## 4. Nhịp
Hình bám TỪ được đọc (`lookup` / `w(i, 'từ', n)`). Kênh Anh: không khung đứng yên > 3 s — mỗi câu ít nhất một thay
đổi: cọc cắm, dây căng, sào hạ, dòng sổ ghi, cột đất mọc, camera nhích. Mở đầu: mỗi câu một vật mới (PACKAGING §0b).
Nhãn của một cụm bật ở TỪ ĐẦU cụm, sống ≥ 1.5 s (LESSONS §130). Chữ hiện theo cách của DNA: thẻ giấy bật (`card` k),
ghi sổ từng ký tự (`text` k, `ledger` shown) — KHÔNG fade.

## 5. Nhân vật (≤ 25% chiều cao: `FIG_MAX` 270 px, kit ném > 270; góc dưới TRÁI cx ≈ 205, chân = H)
Tư thế (đều đã đo miệng → mascot NÓI ở mọi câu có mascot, `figure(..., { t })`):
`pose-ponder` (câu hỏi, cold open câu 0–4, ACT THREE mở, Archimedes) · `pose-pointer` (giải thích, que chỉ = sào thợ đo
— tư thế chính) · `pose-calculator` (số dốc, tổng Riemann, đồng hồ tốc độ) · `pose-halt` ("we never put the second point
on top", "we never set h to zero") · `pose-ok` (dốc ở đáy = 0, "perfectly flat") · `pose-wave` (cuối). Vào / ra bằng
trồi lên / lặn xuống (k), không fade. Chữ ở nửa phải / trên; vùng mascot x 60–340, y 810–1080 không có chữ.

## 6. Mối nối p1 → p2 (không intro — kênh Anh từ 2026-10-19)
p1 kết ở "…the slope between two points": cái chén + hai cọc + dây (1, 1)–(2, 4), rồi tất cả rút đi → **khung cuối p1 =
`kit.bare(g, t)`** (trời + núi xa trơn, pan 0, không mascot). p2 b01 mở bằng đúng `bare(g, t)`; giờ video liền
(`setClock`, p2.html tự cộng DUR p1) nên mây / chim không nhảy.

## 7. Chuyển cảnh (trang lo, 0.9 s từ FROM)
Cùng ERA = **thước dây vàng kéo ngang** (`kit.tapeSwap`, dải thước có vạch đi TRÁI → PHẢI, cảnh mới lộ phía sau; tiếng
`whoosh` tự động). Khác ERA = **lật trang sổ đo** (`kit.pageSwap`, trang cũ gập về gáy trái; `whoosh-long`). ERA:
**field** (sườn đồi ngoài trời — mặc định) · **sheet** (trời nhạt không núi — trắc dọc, đại số, sổ đo lớn) · **cover**
(bìa sổ vải xanh — ảnh thật kẹp). Thẻ hồi = cuốn sổ đo bìa xanh rơi xuống giữa khung, "ACT ONE" dập nổi, nhãn giấy
phụ đề (Plex Mono) ghi dần, rồi nhấc đi (`actTitle`).

## 8. Ảnh thật (tự lấy — `assets/photos/INDEX.md`, credit trong viền ảnh, nhãn BẮT BUỘC = `kit.PHOTOS[key].label`)
Newton (Kneller 1689), Leibniz (Francke ~1695), trang "Nova Methodus" Acta Eruditorum 1684, Archimedes (Fetti 1620 —
TƯỞNG TƯỢNG: nhãn "ARCHIMEDES / AS IMAGINED IN 1620 / c. 287–212 BC", chia 3 thẻ cho vừa vùng an toàn). In giấy ảnh
viền trắng, **kẹp giấy đồng** lên bìa sổ / sườn đồi (`kit.photo`), bóng sprite, credit dòng nhỏ.

## 9. CẤM
Không red cho "sai" (đỏ = điểm / tiếp tuyến). Không tím ngoài phần thừa. Không công thức viết hoa, không mũ bằng Plex.
Không `shadowBlur` / `ctx.filter` trong render (LESSONS §127) — bóng = `shadowRR` / `shade({box})` / `glow` (engine/shade.js).
Không số gõ tay — mọi số từ hằng của kit (`STEPS`, `NEAR5`, `RIEMANN`, `D2X`, `AREA`, `YEARS`) hoặc `must`. Không số
ngoài CONTENT (đồng hồ tốc độ không ghi số km/h). Không trời xanh + cờ đuôi nheo kiểu trig, không khối gỗ kiểu logarithm.
Mascot ≤ 25% chiều cao. Không đặt cọc / chữ đè lên người đi bộ ở (1, 1).

## 10. Tiếng (`assets/sfx/library.json`; luật `docs/lesson/SFX.md`)
| chuyển động | kind |
|---|---|
| cắm cọc tiêu / sào chạm | `wood` / `tick` |
| dây đo căng / dây khép vào sào | `snap` (HIẾM) |
| ghi sổ (một cụm) / bút gạch | `pen` |
| thẻ giấy bật | `card` |
| ảnh kẹp / lật trang | `page` |
| điểm / hố cọc bật | `pop` |
| dây đo lóe / đếm cột / đếm dòng | `tick` |
| 0 ÷ 0 nứt | `crack` (≤ 2 cả bài) |
| "= ?" treo | `question` (≤ 3) |
| sào chạm đúng một điểm / kết quả xác nhận | `correct` (≤ 5) |
| ⅓ / "à ra thế" | `shimmer` (≤ 6) |
| bánh xe đo lăn, công-tơ-mét nhảy số | `reel` (≤ 6) — `tick` nếu dày |
| đồng xu hai mặt lật | `coin` (≤ 4) |
| chốt lớn (định lý cơ bản) | `impact` (≤ 2) |
| thước dây / lật trang (chuyển cảnh) | trang tự có `whoosh` / `whoosh-long` |
**Trần cả video** (~529 s = p1 65.7 + p2 463.6): tổng 132–211 tiếng (≥ thời lượng ÷ 4, ≤ ÷ 2.5), khoảng lặng dài nhất
≤ 4 s, mỗi loại ≤ 25% tổng nhóm. Loại hiếm: shimmer ≤ 6 · correct ≤ 5 · snap ≤ 8 · crack ≤ 2 · question ≤ 3 · coin ≤ 4
· reel ≤ 6 · impact ≤ 2 · `error` / `buzzer` 0 (không có "sai" kiểu còi). a0 (p1) đã dùng: 25 tiếng / 65.7 s, khoảng
lặng dài nhất 3.8 s — shimmer 1, correct 1, snap 1, crack 1, coin 1 (đếm bằng `shoot.js cues`).

## 11. Vật dùng chung (kit — trước khi giao nhóm)
Khung nhìn `VIEWS.open / bowl / zoom / area / trail` + `lerpView` · `hill(g, V, {a, b, k, rise, t})` · `mound` ·
`plot(g, V, f, a, b)` · `rangingPole` · `secant(g, V, 1, x2, {k, a, ext, ext0, poleK, lift})` (trả dốc) ·
`rod(g, V, x0, {d0, d1, k, hover, turn, lift})` / `rodAt` · `spot` · `hole` · `flag` · `hiker(g, x, y, s, {step, flip})` ·
`loupe` · `card` · `secTag` · `actTitle` · `ledger(g, x, y, w, h, {cols, rows, shown, hi})` · `interval` ·
`columns(g, V, n, {side, k, excess})` · `areaFill` · `wheel / odometer / speedometer` · `photo(g, key, …)` ·
`promiseCard(g, i, {k, kp, cap, flip, ap})` / `coin` / `mini` · `figure` · `text / math / frac / pen / arrow`.
Hằng (đã `must`): `STEPS` (x 2, 1.5, 1.1, 1.01, 1.001 → y, rise, run, dốc 3 · 2.5 · 2.1 · 2.01 · 2.001) ·
`tanAt(1, x) = 2x − 1`, `touchesOnce(x0)` · `D2X {0: 0, 1: 2, 3: 6}` · `NEAR5` (4.9 → 9.9, 4.99 → 9.99, 5.1 → 10.1,
5.01 → 10.01) · `RIEMANN {4: 0.22 / 0.47 (≈), 10: 0.285 / 0.385, 100: 0.328 / 0.338, 1000: 0.3328 / 0.3338}`,
`upper(n) − lower(n) = 1/n` · `AREA(x) = x³/3`, `AREA(1) = ⅓` · `YEARS` (Newton 1643–1727, Leibniz 1646–1716, 1684,
Archimedes c. 287–212 BC).

## 12. Chỉ số sàn
Đặt sau kit: tiếng như §10 (`shoot.js cues`); đứng yên — ảnh mỗi 1 s, < 2% điểm ảnh đổi so với 2 s trước không quá
2 mẫu liền (a0: đạt, trừ các quãng ≤ 2 s); sau render `tools/study/pace.py` — % màn hình đứng yên ≤ logarithm.

## §12. Bản 2 (2026-10-22, sau review người dùng)

- **Tông "muted"** (`kit.js` `THEME`, mặc định; bản build đầu xem bằng `?theme=base`): người dùng "tông sáng quá, khó tập
  trung vào ký hiệu, bị tập trung vào núi quá" → phong cảnh LÙI (đồi #CCD8C2 rút bão hoà, mép cỏ #B4C6A4, đồng mức 0.10,
  cỏ 35%, núi xa xám nhạt, nắng 0.25, đất nhạt), toán LÊN (đường cong #2E5A2C dày +3 px). So 3 hướng (base / muted /
  sketch) ở `out/en/calculus/qa/theme-compare.jpg`; sketch loại vì mất cảm giác leo núi và dải đất tích phân nhạt.
- **Người que: ĐÃ BỎ** (2026-10-22). Đã thử thay người leo núi bằng người que (`engine/stick.js`, mũ + ba lô, 6 khoảnh khắc —
  commit d56c049, 9dd9a6b) nhưng người dùng chê: tư thế trên dốc gắt gập chân, tay chân rối, "trông dị tật". IK tự tính
  theo mặt dốc không đủ chất lượng → trả lại người leo núi vẽ tay + cảnh bản v1; chỉ giữ tông muted.
