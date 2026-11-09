# Brief: dựng cảnh phần 2 của logarithm ("One Number Tells You When Your Money Doubles")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/logarithm/DNA.md` — **blocks · khối gỗ đồ chơi**: bàn chơi buổi sáng, tường bảng đục lỗ xanh nhạt, mặt bàn
   bạch dương; vật xuyên suốt = KHỐI GỖ (luỹ thừa là XẾP khối, logarit là ĐẾM tầng). Màu mang nghĩa: đỏ cà chua = CƠ SỐ /
   viên gạch (×2, ×10), tím = LOGARIT / số tầng (sticker đếm, ngoặc bậc), vàng xu = TIỀN / tăng trưởng (「72」 cam vàng),
   xám gỗ mộc + băng keo xám = SAI / hiểu lầm, bạch dương + navy = trung tính. Bảng "khối gỗ là gì" theo hồi (§1) là ý
   đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/logarithm/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/logarithm/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/logarithm/kit.js` — đọc HẾT. Tờ thử mọi vật: `kit-test.html`, ảnh `out/en/logarithm/qa/kit.jpg` (+ `kit/t_*.png`).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + khung chụp `out/en/logarithm/qa/a0.jpg` (+ `a0/t_*.png`); bàn thử phong
   cách `tools/lab/blocks.html`.
7. `projects/en/logarithm/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc [mục] câu | chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/logarithm/assets/photos/INDEX.md`: ảnh thật có sẵn (key, cỡ, tác giả, nhãn bắt buộc). Credit đã chép vào
   `kit.PHOTOS` — dùng `photoBlock(g, key, …)`, nạp bằng `static IMAGES = photoImages('key', …)`.

## Các mục của p2 → file cảnh, nhóm

Thời gian = giây trong p2 (cột 3 của lines.txt). ★ = mục MỞ HỒI (gọi `actTitle`).

| # | mục (`##` SCRIPT) | câu p2 | câu đầu … câu cuối (lines.txt) | giây | dài | file | ERA | nhóm |
|---|---|---|---|---|---|---|---|---|
| 1 ★ | Forwards (ACT ONE) | 0–3 | "Start with something familiar…" … "…where do you end up? At eight." | 0.1–19.4 | 19.3 | `b01-forwards` | table | G1 |
| 2 | Backwards | 4–8 | "A logarithm asks the same question backwards." … "…how many bricks it takes." | 21.1–42.8 | 21.7 | `b02-backwards` | table | G1 |
| 3 | A few more | 9–12 | "Let's try a few." … "You only need a single five." | 44.5–58.7 | 14.2 | `b03-few-more` | table | G1 |
| 4 | Standing at the start | 13–17 | "Here's a fun one. The log of one is always zero…" … "…and it's negative." | 60.4–86.9 | 26.5 | `b04-start` | table | G1 |
| 5 ★ | How many zeros (ACT TWO) | 18–21 | "Now try something small…" … "…a log between nine and ten." | 89.3–108.6 | 19.3 | `b05-zeros` | table | G2 |
| 6 | An ant and a whale | 22–27 | "That makes it easy to compare…" … "…a size you can hold in your hand." | 110.3–134.4 | 24.1 | `b06-ant-whale` | table | G2 |
| 7 ★ | Adding up bricks (ACT THREE) | 28–34 | "The most famous property…" … "…takes away exactly its bricks." | 136.8–164.7 | 27.8 | `b07-adding` | table | G2 |
| 8 | 1614 | 35–42 | "That one property was worth a fortune." … "…still everywhere." | 166.4–211.3 | 44.9 | `b08-napier` | **photo** | G2 |
| 9 ★ | Earthquakes (ACT FOUR) | 43–46 | "When something can range from tiny to enormous…" … "…thirty-two times the energy." | 213.7–237.3 | 23.6 | `b09-quakes` | table | G3 |
| 10 | Decibels | 47–50 | "Sound is another…" … "…ten times the intensity." | 239.0–255.4 | 16.4 | `b10-decibels` | table | G3 |
| 11 | Lemons | 51–54 | "A third is p h…" … "…than pure water." | 257.1–273.8 | 16.8 | `b11-lemons` | table | G3 |
| 12 | Your own senses | 55–59 | "And here's something curious…" … "…the way we actually hear." | 275.5–294.9 | 19.5 | `b12-senses` | table | G3 |
| 13 ★ | A strange base (ACT FIVE) | 60–61 | "You may have wondered why… natural, written l n…" … "That number is called e." | 297.4–305.8 | 8.4 | `b13-strange-base` | table | G3 |
| 14 | Interest on interest | 62–68 | "To see where it comes from, think about growth." … "…for one unit of time." | 307.6–338.8 | 31.2 | `b14-interest` | table | G4 |
| 15 | Doubling time | 69–72 | "The natural log asks the question backwards…" … "…divided by the rate." | 340.5–364.6 | 24.1 | `b15-doubling` | table | G4 |
| 16 | Why 72, not 69.3 | 73–78 | "So why do bankers say seventy-two?" … "…it's remarkably good." | 366.3–391.4 | 25.1 | `b16-why-72` | table | G4 |
| 17 ★ | Putting it together (ACT SIX) | 79–81 | "A logarithm is a power, asked backwards…" … "…added once a year." | 393.9–412.5 | 18.6 | `b17-together` | table | G4 |
| 18 | Next time | 82–84 | "Logarithms shrink the enormous…" … "…See you then." | 414.1–434.7 | 20.6 | `b18-next-time` | table (outro) | G4 |

**Nhóm (cân giây, tính từ đầu mục tới đầu mục sau):** G1 ACT ONE b01–b04 = 89 s, 4 cảnh · G2 ACT TWO–THREE b05–b08 =
124 s, 4 cảnh (b08 dài nhất, ảnh) · G3 ACT FOUR + mở ACT FIVE b09–b13 = 94 s, 5 cảnh · G4 b14–b18 = 127 s + đuôi 2 s,
5 cảnh (b17 tóm tắt vẽ lại hình cũ, b18 outro — ít hình mới). Thẻ hồi (`actTitle`): chữ hồi + phụ đề lấy từ cột `act` của
timeline, tách ở " — ": `ACT ONE` + "The question, backwards", `ACT TWO` + "Counting zeros", `ACT THREE` +
"Multiplication becomes addition", `ACT FOUR` + "Rulers that count powers", `ACT FIVE` + "Where seventy-two comes from",
`ACT SIX` + "Putting it together".

## Hợp đồng một cảnh

File `projects/en/logarithm/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, AR, BASE_Y, ground, block, tower, sticker, tag, secTag, actTitle, figure, prog, lookup, must } from '../../kit.js';
export default class Forwards {
  static ERA = 'table';                                  // 'table' (tường + bàn) | 'photo' (cùng phòng, tối hơn một bậc — chỉ b08)
  static IMAGES = {};                                    // ảnh thật: photoImages('napier', …)
  static POSES = ['pointer'];                            // CHỈ tư thế được giao (DNA §5)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b01');                  // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { two: w(1, 'two') };                       // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(0).start;
    this.FROM = -3.0;                                    // b01: khung 0 của p2 (LEAD 3.0). Cảnh khác: luật FROM bên dưới
  }
  sfx() { const T = this.T; return [{ t: T.two, kind: 'wood' }]; }
  render(g, t) {
    const T = this.T; ground(g, 'table');                // tự tô nền toàn khung
    actTitle(g, t, this.START, 'ACT ONE', 'The question, backwards');
    secTag(g, 'Forwards', { k: prog(t, this.START, this.START + 0.4), t });
    /* … */
  }
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("let's", "four-digit", "seventy-two", "p", "h",
"l", "n"). Sai từ → `lookup` ném lỗi. Từ LẶP trong câu → truyền n; `prog(t, a, b)` ném lỗi khi b < a (LESSONS §59).
Chạy `python3 tools/qa/lookups.py logarithm` và đọc TỪNG dòng "LẶP" — công cụ chỉ đọc lời gọi dạng
`w(<số>, '<từ>'[, n])` (nháy ĐƠN, chỉ số là số viết thẳng).

**FROM — một luật.** `FROM = max(START − lead, KẾT của cảnh trước + 0.5)`; lead = 1.2 (cảnh thường) / 2.6 (mục MỞ HỒI ★);
KẾT = `end` câu cuối của cảnh trước, hoặc mốc kết chuyển động đặc biệt của nó nếu muộn hơn (§44, §64).

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: cùng ERA → **khối gỗ lớn trượt ngang** (`kit.slideSwap`: khối
bạch dương cao hết khung đi TRÁI → PHẢI, cảnh mới lộ phía sau khối — bên TRÁI lộ trước; tiếng `whoosh` tự động); khác ERA
→ **đổ tháp domino** (`kit.dominoSwap`: thanh domino rơi che cảnh cũ rồi đổ dây chuyền PHẢI → TRÁI, `whoosh-long`). Chỉ
b07 → b08 và b08 → b09 là domino. Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. Nhãn ở NỬA PHẢI
khung sống lâu hơn khi khối trượt (bị che sau cùng). `CONTINUES = true`: khung đầu của bạn TRÙNG khung cuối cảnh trước
(cắt thẳng, không tiếng).

**Mối nối đặc biệt (ai sở hữu):**
- **p1 → b01 (G1).** p1 kết bằng `kit.bare(g)` (bàn trơn, không mascot — tháp ×2 ×2 ×2 của a0 S5 đã gỡ hết, khối bay
  lên). Trang p2 có LEAD 3.0 → khung 0 của p2 là t = −3.0: b01 đặt `FROM = -3.0`, vẽ ĐÚNG `bare(g)` cho t ≤ −2.45 (không
  vật nào khác); thẻ hồi `actTitle(ACT ONE)` thả khối chữ từ START − 2.45; ngay khi thẻ nhấc đi, khối ×2 đầu tiên rơi
  xuống bàn ĐÚNG hình học a0 S5: `tower(g, 960, BASE_Y, n, { s: 120, label: '×2', k })` ("Begin at one. Multiply by
  two…" — mỗi "two" một khối; "you land on eight" → sticker / thẻ "= 8"). Khung đứng yên đầu p2 ≤ 1.2 s.
- **b04 → b05 (G1 → G2).** b04 kết ở "con đường log" (1 ở giữa, dương phải, âm trái); b05 mở hồi bằng thẻ hồi — không cần
  khớp khung.
- **b06 (G2).** Ván thước kiến ↔ cá voi: vẽ lại ĐÚNG a0 S3b (`logBoard(g, {})` + thú gỗ + ngoặc + "≈ 11 STEPS / OF ×10",
  toạ độ chép từ `a0-open.js` `s3b`), lần này kèm ảnh thật kiến / cá voi trên `photoBlock` ("ruler… the ant simply
  vanishes" → trước đó vẽ một thước THƯỜNG để kiến biến mất).
- **b07 → b08 → b09 (G2 → G3).** Hai cú domino do trang lo. b08 là cảnh duy nhất ERA 'photo'.
- **b16 (G4).** Quay lại cold open: 「72」 `big72(g, 330, BASE_Y, 0.82)`, chồng xu $1,000 / B / khối ×2 (a0 S1: A 540,
  ×2 770, B 990, base 860, `COIN_STD`), hàng khối năm (a0 S2: `1000 + i·76`, s 64) và "9 YEARS + 2 DAYS" — cùng hình.
  "69.3" là khối bạch dương dán thêm mẩu gỗ thành "72" (DNA §1).
- **b17 (G4).** Tóm tắt: ba khối lời hứa ①②③ — gọi ĐÚNG `promiseBlock(g, i, { … })` của kit (cùng `PROMISE.xs`, base,
  hình trên mặt), mỗi khối thêm câu trả lời (thẻ treo / sticker). Đừng vẽ khối mới.
- **b18 (G4).** Outro: "99% from scratch" + SUBSCRIBE đứng yên ≥ 4 s ở cuối (memory outro-channel-name), mascot
  `pose-wave`. Trang p2 có TAIL 2.0 → khung cuối = L(84).end + 2.0.

**Biển tên mục / thẻ hồi.** `secTag(g, tên mục, { k, lift, t })` — thẻ giấy treo góc trên trái (x 104, y 72, cao 66):
chừa vùng x 96–830, y 64–150. Chữ 700 34px Archivo, rộng tối đa `SEC_MAX` = 720 px (tên dài nhất "Standing at the
start", 21 ký tự — quá rộng thì `fits` ném lỗi). Mục MỞ HỒI gọi thêm `actTitle(g, t, START, 'ACT ONE', 'The question,
backwards')`: hàng khối bạch dương in TỪNG chữ rơi lên một tấm ván giữa khung (tối đa `ACT_MAX` = 9 ký tự: "ACT THREE"),
phụ đề trên thẻ giấy treo dưới ván, 700 48px tối đa `ACT_SUB_MAX` = 1300 px (dài nhất "Multiplication becomes addition"
đo 727 px). Cụm chiếm x ~420–1500, y 300–760 từ START − 2.45 tới START + 0.45 — đừng đặt vật quan trọng ở đó lúc ấy.

**Vật dùng chung với nhóm khác** (§71) — vẽ lại ĐÚNG, không tự đặt lại:
| vật | hình học / hàm | ai dùng |
|---|---|---|
| tháp viên gạch ×2 | `tower(g, 960, BASE_Y, n, { s: 120, label: '×2', k, count, lift })` (a0 S5); `count` = sticker tím đếm tầng cạnh phải; `lift` = gỡ từ đỉnh | b01, b02, b07 (8 = 3 tầng đặt lên 4 = 2 tầng → 5 tầng), b17 |
| tháp ×10 / ×3 / ×5 | `tower(…, { label: '×10' })` đỏ (cơ số), s 96–120 | b03, b05, b09 |
| tháp treo NGƯỢC | `tower(g, x, TABLE_Y + …, 3, { hang: true, label: '÷2', count })` — sticker −1 −2 −3 | b04 (log₂(1/8) = −3), b11 (pH) |
| bàn trống = 0 | `bare(g)` / khối không đặt: "log 1 = 0" = vạch xuất phát trên bàn, không khối nào | b04 |
| ván thước ×10 | `logBoard(g, {})` (BOARD x0 300, y 806, step 118; tháp k = k khối, sticker = k) + `animal()` + `brace(g, 300, Y(11), PT)` — như a0 S3b | b05 (10, 100, 1000, 10000 = tháp 1–4), b06 |
| xu gỗ | `coinStack(g, x, BASE_Y, n, COIN_STD / COIN_SM)`, bóng chồng `ghostStack`; tiền qua `money()`, `grow8(y)` | b14, b15, b16 |
| 「72」 | `big72(g, 330, BASE_Y, 0.82)` (a0 S2) — 72 rơi = `{ k }`, nhấc = `{ lift }` | b16, b17 |
| khối ảnh | `photoBlock(g, key, x, y, w, h, { k, label, … })` rộng ≥ 300 px (credit tự xuống hai dòng; hẹp hơn có thể ném) | b06, b08, b09, b14 |
| băng keo xám (SAI) | `tape(g, x0, y0, x1, y1, k, { w: 16 })` gạch đúng CHỮ sai, chữ vẫn đọc được (dán qua nửa dưới chữ) | b09 ("a little stronger"), b16 |
| lời hứa ①②③ | `promiseBlock(g, i, { k, kp, turn, cap })`, `PROMISE` | b17 |
| hằng số | `R8 9.006 · DAYS8 2 · RULE {3:24, 6:12, 8:9, 12:6} · LN2 0.693 · E 2.718 · ANT_MG 3 · WHALE_T 150 · STEPS 10.7 · QUAKE 31.6 · DB 1e12 · PH 1e5` (đã `must` trong kit) | mọi nhóm |

**Ảnh thật** (`assets/photos/INDEX.md`; nhãn ghi ở đó là BẮT BUỘC, credit kit tự in):
| key | dùng ở | nhãn |
|---|---|---|
| `napier` | b08 ("John Napier published…") | "JOHN NAPIER · 1550–1617" |
| `descriptio` | b08 (a0 đã dùng ở "four hundred years old") | `['MIRIFICI LOGARITHMORUM', 'CANONIS DESCRIPTIO · 1614']` (mảng = hai thẻ) |
| `logtable` | b08 ("printed table") | "A PAGE OF NAPIER'S TABLES · 1614" — KHÔNG gọi là bảng cơ số 10 / Briggs |
| `sliderule` | b08 ("tables and slide rules") | "A SLIDE RULE" |
| `seismogram` | b09 | "A SEISMOGRAPH DRUM" |
| `bernoulli` | b14 ("Jacob Bernoulli asked…") | "JACOB BERNOULLI · 1655–1705" |
| `ant` | b06 | "ANT · A FEW MILLIGRAMS" |
| `bluewhale` | b06 | "BLUE WHALE · OVER 100 TONNES" |
Không có ảnh thì KHÔNG bịa: kit vẽ ô trống "PHOTO TO COME" — báo đạo diễn. Briggs / Laplace / Richter không có ảnh: chữ
trên thẻ, không chân dung.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc: khối được ĐẶT / GỠ / ĐẾM. Không khung nào đứng yên quá
  3 s (kênh Anh, DNA §4) — khi không có khối mới, cho vật khác chuyển động (thẻ đung đưa, tháp đếm sticker, xu rơi). Cảnh
  MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động (`lift` bay lên, trượt ra), không biến mất giữa khung. Chữ hiện theo cách của DNA: thẻ
  giấy bật vào (`tag` k), sticker dán (`sticker` k), chữ in dần (`text` k), chữ in trên khối (`block` label) — KHÔNG fade.
- **Nhãn của một cụm bật ở TỪ ĐẦU cụm và sống ≥ 1.5 s** (LESSONS §130). Mỗi khung ≤ 3 cụm chữ lớn, MỘT ý chính.
- Hiểu lầm lời nói ra → **băng keo xám** `tape()` gạch đúng CHỮ sai (thẻ xám `edge: C.bad`, chữ `C.badInk`), ý đúng viết
  ngay dưới; KHÔNG gạch câu đúng, KHÔNG dùng đỏ cho "sai" (đỏ = CƠ SỐ).
- Dụng cụ trên hình làm ĐÚNG phép đo lời đọc nói và khớp cảnh trước đã dùng nó (§57): log = SỐ TẦNG (sticker tím), cơ số =
  CHỮ IN TRÊN KHỐI đỏ, con số đích = thẻ / chồng xu. Logarit âm = tháp TREO NGƯỢC dưới mép bàn, không phải khối đỏ "−".
- **Vật xuyên suốt** (DNA §1): khối gỗ đúng vai của hồi. **Mục tóm tắt** (b17): vẽ lại thu nhỏ hình của từng hồi.
- Vật đứng yên (biển mục, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera. Có camera cuộn: clip phần cuộn ở
  y > đáy biển mục + 10 (§68).
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / mũi tên chỉ bằng **navy `C.ink`**; tím CHỈ cho số tầng
  / logarit / ngoặc bậc, vàng CHỈ cho tiền, đỏ CHỈ cho cơ số. Mũi tên "hỏi ngược" (a0 S5) là tím vì nó LÀ logarit.
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; vùng mới có sẵn ô chờ (ô nét đứt như a0 S1 / S4) ngay
  khi tới. Kết luận viết xong TRƯỚC câu cuối của cảnh (§64).
- **Mascot NÓI** (§86): `figure(g, pose, cx, H, h, k, { t })` — truyền `t` thì miệng mở theo lời đọc khi đã đứng hẳn;
  `{ talk: false }` nếu nó chỉ nghe. Đã đo miệng: ponder, pointer, calculator, wave, point, ok, phone, halt, coin-flip.
  **pose-notebook, pose-thumb CHƯA đo miệng** → `{ talk: false }`, đừng tự đo.

**Toán / số.** Mọi số lên hình tính bằng code (`must` hoặc hằng của kit); chỉ số liệu trong CONTENT.md; làm tròn ghi "≈"
(chuột / người / voi chỉ khi ghi "≈", DNA §9). `must()` chỉ đặt ở trạng thái ĐÃ XONG (sau chuyển động) — khung chuyển tiếp
ném lỗi làm chết render (§70). `must` đổi `−` thành `-` trước khi tính → so CHUỖI có dấu trừ thật thì so `num(v) ===
'−3'` trực tiếp. Hiển thị số âm luôn qua `num()` (U+2212). Archivo có ₂ ₃ ₅ ₁₀ ⁰–⁹ × ÷ ≈ −, KHÔNG có ⅛ ①②③ ₑ: viết
"1/8", số trong vòng = `sticker()`, "log" + "ₑ" → viết "ln". Mũ âm không có ký tự ⁻ → viết "10" + "−3" thường hoặc vẽ.

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `shadowBlur` / `ctx.filter` trong render (LESSONS §127) —
bóng = `shadowRR` / `shade({ box })` / `contact()` / `glow()` của kit.

**Chữ.** Trang nạp đủ `kit.FONTS` (Archivo 500–900). Dùng hàm chữ của kit (`text`, `tag`, `secTag`, `measure`, `fits`).
Chữ ≥ 28 px (`tag` / `block` ném lỗi dưới 28), số ≥ 30 px. `tag()` đã đứng yên mà tràn x 96–1824 → ném lỗi.

**Mascot.** CHỈ tư thế được giao (DNA §5: calculator cold open + ACT FIVE, pointer thước ×10 / tháp, ponder log 1 = 0 +
hiểu lầm, notebook bảng 1614, ok / thumb 72 khớp, wave cuối), một bên khung (cx ≤ 380 hoặc ≥ 1540), cao **≤ 270 px**
(kit ném lỗi > 270), chân chạm đáy (`foot = H`), 3–8 s quanh đúng câu, vẽ sau cùng ở toạ độ màn hình. **Chân dung**:
nhãn tên + năm theo INDEX.md.

| nhóm | tư thế |
|---|---|
| G1 | pointer (b01–b03), ponder (b04) |
| G2 | pointer (b05–b07), notebook `talk: false` (b08) |
| G3 | pointer (b09–b11), ponder (b12), calculator (b13) |
| G4 | calculator (b14–b15), ok hoặc thumb `talk: false` (b16), pointer (b17), wave (b18) |

## Tiếng hiệu ứng (DNA §10; docs/lesson/SFX.md)

| chuyển động | kind |
|---|---|
| đặt khối | `wood` / `tick` |
| xu chồng / tiền | `coin` |
| tháp đổ / gỡ khối | `chip`, `snap` (HIẾM) |
| sticker dán / thẻ treo | `pop`, `card` |
| đếm tầng | `tick` |
| băng keo xám gạch | `tear` |
| khối ảnh trượt vào | `page` |
| động đất | `impact` (thư viện chưa có `rumble`) |
| loa / decibel | `beep` |
| đúng / chốt (72 khớp) | `correct` (HIẾM), `shimmer` (HIẾM) |
- Khối trượt / domino: trang TỰ có tiếng — đừng thêm ở FROM.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (ngoài chùm đặt khối liên tiếp); không hai tiếng trong 0.25 s; khoảng giữa hai
  tiếng ≤ 6 s (DNA §12, kể cả tiếng chuyển cảnh).
- Hạn mức loại HIẾM của NHÓM BẠN (trần cả video DNA §10: shimmer ≤ 6, correct ≤ 5, snap ≤ 8):

| nhóm (cảnh) | shimmer | correct | snap |
|---|---|---|---|
| a0 (đạo diễn, p1 — đã đếm bằng `shoot.js cues`) | 1 | 1 | 1 |
| G1 b01–b04 | 1 | 1 | 2 |
| G2 b05–b08 | 1 | 1 | 2 |
| G3 b09–b13 | 1 | 0 | 2 |
| G4 b14–b18 | 2 | 2 | 1 |
| **TỔNG** (đã cộng) | **6 ≤ 6** | **5 ≤ 5** | **8 ≤ 8** |

Báo số đã dùng theo loại. Sau khi gộp, đạo diễn đếm lại bằng `shoot.js cues` cả hai trang.

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD 3.0 (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/logarithm/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 440 \
  --t <mốc trang,…> --outdir out/en/logarithm/qa/<nhóm>
python3 tools/qa/sheet.py out/en/logarithm/qa/<nhóm> out/en/logarithm/qa/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/logarithm/p2.html?plates=<các cảnh của bạn>"   # chạy khô MỌI khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/logarithm/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py logarithm
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước — thấy khối trượt / domino) và khung cuối cảnh. G1:
  chụp thêm p2 t = 0.0, 0.3 (phải TRÙNG `out/en/logarithm/qa/a0/t_54.75.png` — khung cuối p1, bàn trơn) và lúc khối ×2 đầu
  tiên rơi.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ;
  tương phản thấp (chữ trên tường: navy / tím đậm / vàng đậm trên thẻ giấy); khung đứng im > 3 s; vật biến mất giữa
  khung; nhãn tí hon (đang bật / bật ở từ cuối — §130). `[PAGE ERROR]` = lỗi JS.
- `shoot.js check` phải thoát 0 — ảnh chụp từng câu không trúng khung chuyển tiếp, chạy khô thì trúng (§70).

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh / chạy khô). `shoot.js` luôn kèm `--page`.
- **KHÔNG `pkill -f` / `killall`**: nhiều nhóm chạy `shoot.js check` cùng lúc (LESSONS §98). Dừng lệnh của mình bằng PID.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, chỗ còn băn khoăn.
