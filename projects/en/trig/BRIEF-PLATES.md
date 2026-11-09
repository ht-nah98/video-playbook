# Brief: dựng cảnh phần 2 của trig ("Sine Was Never About Triangles")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/trig/DNA.md` — **ferris · vòng đu quay ban ngày**: hội chợ trời pastel, thép kem, cabin kẹo; vật xuyên suốt =
   VÒNG ĐU QUAY (vành = đường tròn đơn vị, nan = bán kính 1, cabin hồng = điểm). Màu mang nghĩa: hồng = SIN, bạc hà = COS,
   chanh vàng = GÓC, xám thép = SAI / tam giác hỏng, đèn ấm = số máy trả lời. Bảng "vòng đu quay là gì" theo hồi (§1) là ý
   đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/trig/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/trig/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/trig/kit.js` — đọc HẾT. Tờ thử mọi vật: `kit-test.html`, ảnh `out/en/trig/qa/kit.jpg` (+ `kit/t_*.png`).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + khung chụp `out/en/trig/qa/a0.jpg` (+ `a0/t_*.png`); bàn thử phong cách
   `tools/lab/ferris.html`.
7. `projects/en/trig/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc [mục] câu | chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/trig/assets/photos/INDEX.md`: ảnh thật có sẵn (key, cỡ, tác giả, nhãn bắt buộc). Credit đã chép vào
   `kit.PHOTOS` — dùng `mirrorFrame(g, key, …)`, nạp bằng `static IMAGES = photoImages('key', …)`.

## Các mục của p2 → file cảnh, nhóm

Thời gian = giây trong p2 (cột 3 của lines.txt). ★ = mục MỞ HỒI (gọi `actTitle`).

| # | mục (`##` SCRIPT) | câu p2 | giây | dài | file | ERA gợi ý | nhóm |
|---|---|---|---|---|---|---|---|
| 1 ★ | Too far to touch (ACT ONE) | 0–7 | 0.0–34.3 | 34.3 | `b01-too-far` | fair | G1 |
| 2 | Tables for the sky | 8–11 | 35.9–57.3 | 21.4 | `b02-sky-tables` | tent (Hipparchus, Almagest) | G1 |
| 3 ★ | The same ratio, every time (ACT TWO) | 12–18 | 59.8–89.4 | 29.6 | `b03-same-ratio` | fair | G1 |
| 4 | A number that belongs to the angle | 19–31 | 91.1–152.3 | 61.3 | `b04-belongs` | fair (dây cờ, dây cung jya → sinus) | G1 |
| 5 ★ | Where the triangle runs out (ACT THREE) | 32–39 | 154.8–198.8 | 44.0 | `b05-runs-out` | fair | G2 |
| 6 ★ | A circle of radius one (ACT FOUR) | 40–44 | 201.2–224.8 | 23.6 | `b06-radius-one` | fair | G2 |
| 7 | The old sine is still inside | 45–48 | 226.6–241.9 | 15.4 | `b07-old-sine` | fair | G2 |
| 8 | Every angle has an answer | 49–56 | 243.6–280.1 | 36.6 | `b08-every-angle` | fair (máy bán vé quay lại) | G2 |
| 9 ★ | Three hundred and sixty is a choice (ACT FIVE) | 57–60 | 282.6–300.0 | 17.5 | `b09-choice-360` | tent (bảng Babylon) | G3 |
| 10 | Measuring with the circle itself | 61–66 | 301.7–326.3 | 24.6 | `b10-radian` | fair | G3 |
| 11 | Cleaner formulas | 67–70 | 327.9–347.2 | 19.3 | `b11-cleaner` | tent (bảng công thức) | G3 |
| 12 ★ | Watching only the height (ACT SIX) | 71–77 | 349.7–377.7 | 28.1 | `b12-height` | fair | G3 |
| 13 | A circle seen from the side | 78–82 | 379.4–401.7 | 22.3 | `b13-side-view` | fair | G3 |
| 14 ★ | Sine squared plus cosine squared (ACT SEVEN) | 83–88 | 404.2–432.8 | 28.6 | `b14-pythagoras` | fair | G4 |
| 15 | The rest of the list | 89–93 | 434.4–456.4 | 21.9 | `b15-rest` | tent (bảng công thức) | G4 |
| 16 ★ | The key is rhythm (ACT EIGHT) | 94–98 | 458.9–479.5 | 20.7 | `b16-rhythm` | fair | G4 |
| 17 | Fourier | 99–102 | 481.1–506.5 | 25.3 | `b17-fourier` | tent (chân dung Fourier) | G4 |
| 18 | Putting it together | 103–105 | 508.1–525.0 | 16.9 | `b18-together` | fair | G4 |
| 19 | Next time | 106–110 | 526.7–551.8 | 25.1 | `b19-next-time` | fair (outro) | G4 |

**Nhóm (cân thời lượng):** G1 ACT ONE–TWO = 152 s, 4 cảnh · G2 ACT THREE–FOUR = 125 s, 4 cảnh · G3 ACT FIVE–SIX = 119 s,
5 cảnh · G4 ACT SEVEN–EIGHT + Putting it together + Next time = 148 s, 6 cảnh (G4 nhiều cảnh ngắn, ít hình mới: tóm tắt
vẽ lại hình cũ). Thẻ hồi (`actTitle`) chữ hồi lấy từ cột `act` của timeline: `ACT ONE` + "Measuring the unreachable", ….

## Hợp đồng một cảnh

File `projects/en/trig/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, AR, TAU, D2R, ground, wheel, heroDot, ticket, secTag, actTitle, figure, prog, lookup, must, typeCues } from '../../kit.js';
export default class RadiusOne {
  static ERA = 'fair';                                   // 'fair' (trời + sân cát) | 'tent' (lều bạt kem sọc)
  static IMAGES = {};                                    // ảnh thật: photoImages('fourier', …)
  static POSES = ['pointer'];                            // CHỈ tư thế được giao (DNA §5)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b06');                  // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { r: w(40, 'radius') };                     // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(40).start;
    this.FROM = Math.max(this.START - 2.6, L(39).end + 0.5);   // mở HỒI: 2.6; cảnh thường: 1.2
  }
  sfx() { const T = this.T; return [{ t: T.r, kind: 'tick' }]; }
  render(g, t) {
    const T = this.T; ground(g, 'fair');                 // tự tô nền toàn khung (ground(g, 'fair', { ground: false }) = trời không sân)
    actTitle(g, t, this.START, 'ACT FOUR', 'The unit circle');
    secTag(g, 'A circle of radius one', { k: prog(t, this.START, this.START + 0.4), t });
    /* … */
  }
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("don't", "one-hundred-and-twenty-degree"). Sai từ →
`lookup` ném lỗi. Từ LẶP trong câu → truyền n; `prog(t, a, b)` ném lỗi khi b < a (LESSONS §59). Chạy
`python3 tools/qa/lookups.py trig` và đọc TỪNG dòng "LẶP" — công cụ chỉ đọc lời gọi dạng `w(<số>, '<từ>'[, n])` (nháy
ĐƠN, chỉ số là số viết thẳng).

**FROM — một luật.** `FROM = max(START − lead, KẾT của cảnh trước + 0.5)`; lead = 1.2 (cảnh thường) / 2.6 (mục MỞ HỒI ★);
KẾT = `end` câu cuối của cảnh trước, hoặc mốc kết chuyển động đặc biệt của nó nếu muộn hơn (§44, §64).

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: cùng ERA → **dây cờ quét** (`kit.buntingSweep`: một dây cờ dọc bay
phải → trái, cảnh mới lộ sau dây, tiếng `whoosh` tự động); khác ERA → **rèm lều** (`kit.curtainSwap`: rèm sọc khép che cảnh
cũ rồi kéo ra hai bên, `whoosh-long`). Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START.
`CONTINUES = true`: khung đầu của bạn TRÙNG khung cuối cảnh trước (cắt thẳng, không tiếng).

**Mối nối đặc biệt (ai sở hữu):**
- **p1 → b01 (G1).** p1 kết bằng `kit.zenith()` (đỉnh trời trơn, camera đã ngửa). Trang p2 có LEAD 3.0 → khung 0 của p2 là
  t = −3.0: b01 đặt `FROM = -3.0`, vẽ ĐÚNG `zenith(g)` cho t ≤ −2.7, rồi camera HẠ xuống: `sky(g, { pan })` với pan 1 → 0
  (cùng cách `a0-open.js` s3 ngửa lên, đảo chiều) tới cảnh nhìn từ ĐỈNH vòng đu quay (DNA §1 ACT ONE: ống nhòm bỏ xu ngắm
  núi, thuyền, Mặt Trăng); biển `actTitle(ACT ONE)` thả xuống đúng lúc camera dừng. Núi / thuyền / Mặt Trăng / gốc tia ngắm
  vẽ lại ĐÚNG như a0 s3: `mountain(g, 480, 760, 1.1)`, `ship(g, 1080, 800, 0.9)`, `moon(g, 1240, 210, 70)`, gốc tia (330, 905).
- **b04 → b05 (G1 → G2).** b04 kết bằng cái máy hỏi "angle → one number"; b05 mở hồi bằng thẻ hồi — không cần khớp khung.
- **b08 (G2).** Máy bán vé quay lại (cùng `ticketMachine(g, 330, 92, 1, …)` như a0) cho 120° → 0.866, −30° → −0.5,
  1000° → −0.985 (bộ đếm vòng `TURNS1000` + `REST1000`). Cabin chạy trên vòng chính diện (hình học chung bên dưới).
- **b12 → b13 (G3).** b13 = cảnh vòng NHÌN NGHIÊNG → sóng trên bạt, vẽ lại ĐÚNG hình học của a0 s1 Ⓔ (bên dưới).
- **b18 (G4).** Tóm tắt: 3 vé ①②③ lật mặt — vẽ lại ĐÚNG ba vé của a0 s2 (`card()` trong a0-open.js: cùng vị trí 560 / 960 /
  1360, cùng hình trên mặt vé, cùng màu `#F59AB5 #8FD6C1 #C7B3EE`), mỗi vé thêm câu trả lời. Chép `card()` vào cảnh, đừng
  vẽ vé mới.
- **b19 (G4).** Outro: "99% from scratch" + SUBSCRIBE đứng yên ≥ 4 s (memory outro-channel-name), mascot `pose-wave`.

**Biển tên mục / thẻ hồi.** `secTag(g, tên mục, { k, lift, t })` — biển nhỏ treo góc trên trái (x 104, y 70, cao 70):
chừa vùng x 96–830, y 64–150. Chữ 700 34px Archivo, rộng tối đa `SEC_MAX` = 720 px (tên dài nhất "Three hundred and
sixty is a choice", 35 ký tự, đo ≈ 600 px — tên khác của p2 đều ngắn hơn; quá rộng → `fits` ném lỗi). Mục MỞ HỒI gọi thêm
`actTitle(g, t, START, 'ACT ONE', 'Measuring the unreachable')`: biển hội chợ giữa khung, chữ hồi trên bảng lật **10 ô**
(tối đa 10 ký tự: "ACT SEVEN" = 9), phụ đề 700 56px tối đa `ACT_SUB_MAX` = 1640 px ("Why mathematicians measure in
radians", 37 ký tự, đo 1073 px). Biển chiếm x ~380–1540, y 300–560 từ START − 2.4 tới START + 0.3 — đừng đặt vật quan
trọng ở đó lúc ấy.

**Vật dùng chung với nhóm khác** (§71) — vẽ lại ĐÚNG, không tự đặt lại:
| vật | hình học / hàm | ai dùng |
|---|---|---|
| vòng đu quay chính diện = đường tròn đơn vị | `wheel(g, 700, 540, 290, { theta, hero: true, axes: true, groundY: 1000 })` trên `ground(g, 'fair', { ground: false })`; cos = `line(… C.cos, 12)` trên trục, sin = thanh hồng `C.sin` 12 px từ cabin xuống trục; `heroDot` ở cabin; cung góc `angleArc(g, 700, 540, 70, θ)` | b06–b08, b10, b12, b14 |
| vòng nhìn nghiêng + bạt sóng | vòng `cx 430, cy 540, R 300, side 0.1`; `tarp(g, 620, 150, 1200, 780)`; sóng `waveOnTarp(g, u => Math.sin(θ − u), rev, { x0: 660, L: 1100, mid: 540, A: 300, span: 2·TAU })`; dây đứt hồng từ cabin sang đầu sóng ở x 660 | b12, b13, b16, b17 |
| máy bán vé | `ticketMachine(g, 330, 92, 1, { line, value, flapK, bulbK, press, cells: 10 })`, giá trị qua `num(SIN120)`… | b08 (và gọi lại ở b18) |
| tam giác vuông xám | `brokenTriangle(g, Ax, Ay, { deg, snap, flip, spin, apart, s, label })` — xám thép là màu DUY NHẤT của tam giác (cung góc vàng khi còn nguyên) | b03, b04 (họ 30°: `deg: 30`, s 0.3 / 0.45 / 0.6 như vé ①), b05 (kẹt / gãy quá 90°), b07, b14 |
| cảnh xa | `mountain`, `ship`, `moon`, `star`, `dashed` (tia ngắm) — toạ độ như a0 s3 | b01, b02 |
| biểu tượng sóng | `icon(g, 'speaker' / 'light' / 'socket', x, y, 50)` | b12, b13, b17 |
| hằng số | `SIN30 0.5 · SIN120 0.866 · COS120 −0.5 · SINM30 −0.5 · SIN1000 −0.985 · TURNS1000 2 · REST1000 280 · SPIN` (đã `must` trong kit) | mọi nhóm |

**Ảnh thật** (`assets/photos/INDEX.md`; nhãn ghi ở đó là BẮT BUỘC, credit kit tự in):
| key | dùng ở | nhãn |
|---|---|---|
| `hipparchus` | b02 | "HIPPARCHUS · c. 190–120 BC" + note "IMAGINED · NO LIKENESS SURVIVES" (kit ném lỗi nếu thiếu note) |
| `almagest` | b02 ("writers who came centuries later, like Ptolemy") | "PTOLEMY'S ALMAGEST · LATIN MANUSCRIPT" — KHÔNG gọi là bảng dây cung |
| `babylon` | b09 | "BABYLONIAN TABLET YBC 7289 · BASE-60 NUMBERS"; khung đứng (cao ≥ rộng) hoặc `zoom ≥ 1.4` để cắt thang màu bên trái (`PHOTOS.babylon.focus` đã lệch phải) |
| `fourier` | b17 | "JOSEPH FOURIER · 1768–1830" |
| `ferris-photo` | b13 ("steady turning turns up everywhere") hoặc b01 | (nhãn tự đặt, không năm) |
| `oscilloscope` | b12 / b17 | "A REAL SINE WAVE ON AN OSCILLOSCOPE" |
Khung gương rộng ≥ 380 px (credit dài nhất cần ≈ 360 px ở 14 px — hẹp hơn thì `mirrorFrame` ném lỗi). Không có ảnh thì
KHÔNG bịa: kit vẽ khung trống "PHOTO TO COME" — báo đạo diễn.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá 3 s — vòng đu quay luôn
  quay chậm ở nền (`theta = base + SPIN * t`) trừ khi cảnh cần dừng ở một góc; khi dừng, cho vật khác chuyển động
  (`docs/study/01`). Cảnh MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động (trượt, rơi, kéo lên), không biến mất giữa khung. Chữ hiện theo cách của DNA: vé bật vào
  (`ticket` k), chữ in dần (`text` k), bảng lật (`flap`, `sign`) — KHÔNG fade.
- Mỗi khung ≤ 3 cụm chữ lớn, MỘT ý chính. Hiểu lầm lời nói ra → **thanh xám thép** `strike()` gạch đúng CHỮ sai, ý đúng
  viết ngay dưới; KHÔNG gạch câu đúng, KHÔNG dùng đỏ/hồng cho "sai" (hồng = SIN, §58). Đẳng thức đúng nhưng "hỏng khi bỏ
  luật" → nứt qua dấu "=" + nhãn điều kiện, KHÔNG gạch (§62).
- Dụng cụ trên hình làm ĐÚNG phép đo lời đọc nói và khớp cảnh trước đã dùng nó (§57).
- **Vật xuyên suốt** (DNA §1): vòng đu quay đúng trạng thái của hồi bằng `wheel()` của kit. **Mục tóm tắt** (b18): vẽ lại
  thu nhỏ hình của từng hồi, không vẽ hình mới.
- Vật đứng yên (biển mục, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera. Có camera cuộn: clip phần cuộn ở
  y > đáy biển mục + 10 (§68).
- Ô / nhãn của một BIẾN giữ đúng biến (x = cos bạc hà, y = sin hồng), giá trị viết chỗ khác; gọi lại một điều kiện → cho
  thấy nó đổi trạng thái (§67).
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / số thứ tự bằng **navy `C.ink`** hoặc **chanh vàng
  `C.ang` chỉ khi nói về GÓC**; kẹo (`CANDY`) chỉ trang trí.
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; vùng mới sau camera có sẵn ô chờ ngay khi tới (xem ô
  chờ nét đứt ở a0 s2). Kết luận viết xong TRƯỚC câu cuối của cảnh (§64).
- **Mascot NÓI** (§86): `figure(g, pose, cx, H, h, k, { t })` — truyền `t` thì miệng mở theo lời đọc khi đã đứng hẳn;
  `{ talk: false }` nếu nó chỉ nghe. Tư thế đã đo miệng (assets/character-v2/mouths.js): ponder, pointer, calculator,
  wave, point, ok, phone, halt, coin-flip. **pose-compass, pose-sky, pose-shrug CHƯA đo miệng** → dùng `{ talk: false }`
  hoặc báo đạo diễn, đừng tự đo.

**Toán / số.** Mọi số lên hình tính bằng code (`must` hoặc hằng của kit); chỉ số liệu trong CONTENT.md; làm tròn ghi "≈".
`must()` chỉ đặt ở trạng thái ĐÃ XONG (sau chuyển động), không ở mốc bắt đầu chuyển động — khung chuyển tiếp ném lỗi làm
chết render (§70). CHÚ Ý: `must` đổi `−` thành `-` trước khi tính → so CHUỖI có dấu trừ thật thì so `num(v) === '−0.5'`
trực tiếp (xem a0-open.js `init`), đừng `must("'−0.5'", …)`. Hiển thị số âm luôn qua `num()` (U+2212).

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render.

**Chữ.** Trang đã nạp đủ `kit.FONTS` (Archivo 500–900, Cormorant Garamond Italic 500/600, Noto Sans JP 500/700/800) —
mọi cỡ dùng được. Dùng hàm chữ của kit (`text`, `ticket`, `sign`, `secTag`, `measure`, `fits`) — chúng TỰ tách **θ**
sang Noto Sans JP (Archivo / Cormorant không có θ, ①②③). Đừng `g.fillText` chuỗi có θ. Biến *x*, *y* = `italic 600 …px
${CG}`. Chữ ≥ 30 px (trừ credit ảnh do kit in). Ký tự lạ khác: kiểm fontTools `getBestCmap` trước.

**Mascot.** CHỈ tư thế được giao (DNA §5: pointer ACT FOUR/SIX, calculator máy bán vé/1000°, compass radian, sky Mặt
Trăng ACT ONE, shrug "công thức phải học thuộc", ponder ACT THREE, wave outro), một bên khung (cx ≤ 380 hoặc ≥ 1540),
cao **≤ 270 px** (kit ném lỗi > 290), chân chạm đáy (`foot = H`), 3–8 s quanh đúng câu, vẽ sau cùng ở toạ độ màn hình.
**Chân dung**: nhãn tên + năm theo INDEX.md + note bắt buộc cho ảnh tưởng tượng.

## Tiếng hiệu ứng (DNA §10; docs/lesson/SFX.md)

| chuyển động | kind |
|---|---|
| phím máy bán vé | `chip` (chùm gõ) / `tick` |
| bảng lật, vé lật | `flap` |
| bóng đèn bật số | `zap` (nhỏ) + `shimmer` (HIẾM) |
| tam giác gãy | `crack` (HIẾM) · gãy nhỏ / nứt: `snap` · bu-lông rơi: `coin` |
| vòng / cabin quay | `tick` |
| sóng duỗi | `whoosh-long` (dây cờ quét / rèm: trang TỰ có tiếng — đừng thêm ở FROM) |
| dây rung (ACT SIX) | `snap` tạm (chưa có `pluck` CC0 — đạo diễn sẽ tải) |
| vé / thẻ / ảnh hiện | `card`, `pen` |
| đúng / chốt | `correct` (HIẾM) |
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (ngoài chùm gõ); không hai tiếng trong 0.25 s; khoảng giữa hai tiếng ≤ 6 s
  (DNA §12, kể cả tiếng chuyển cảnh).
- Hạn mức loại HIẾM của NHÓM BẠN (trần cả video DNA §10: shimmer ≤ 8, correct ≤ 6, crack ≤ 5):

| nhóm (cảnh) | shimmer | correct | crack |
|---|---|---|---|
| a0 (đạo diễn, p1 — đã đếm bằng `shoot.js cues`) | 2 | 0 | 1 |
| G1 b01–b04 | 1 | 1 | 1 |
| G2 b05–b08 | 2 | 2 | 2 |
| G3 b09–b13 | 1 | 1 | 0 |
| G4 b14–b19 | 2 | 2 | 0 |
| **TỔNG** (đã cộng) | **8 ≤ 8** | **6 ≤ 6** | **4 ≤ 5** |

Báo số đã dùng theo loại. Sau khi gộp, đạo diễn đếm lại bằng `shoot.js cues` cả hai trang.

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD 3.0 (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/trig/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 560 \
  --t <mốc trang,…> --outdir out/en/trig/qa/<nhóm>
python3 tools/qa/sheet.py out/en/trig/qa/<nhóm> out/en/trig/qa/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/trig/p2.html?plates=<các cảnh của bạn>"   # chạy khô MỌI khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/trig/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py trig
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước — thấy dây cờ quét / rèm) và khung cuối cảnh. G1: chụp
  thêm p2 t = 0.0, 0.3 (phải TRÙNG `out/en/trig/qa/a0/t_57.50.png` — khung cuối p1) và giữa lúc camera hạ.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ;
  tương phản thấp (chữ trên trời pastel: navy hoặc trên vé trắng); khung đứng im > 3 s; vật biến mất giữa khung; θ rơi
  về ô đậu phụ. `[PAGE ERROR]` = lỗi JS.
- `shoot.js check` phải thoát 0 — ảnh chụp từng câu không trúng khung chuyển tiếp, chạy khô thì trúng (§70).

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh / chạy khô). `shoot.js` luôn kèm `--page`.
- **KHÔNG `pkill -f` / `killall`**: nhiều nhóm chạy `shoot.js check` cùng lúc (LESSONS §98). Dừng lệnh của mình bằng PID.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, chỗ còn băn khoăn.
