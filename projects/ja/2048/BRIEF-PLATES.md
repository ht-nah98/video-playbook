# Brief: dựng cảnh phần 2 của ja/2048 (「2048の数学 ― なぜ私たちは負けるのか」)

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh Nhật **99の発見**. Lời đọc tiếng NHẬT đã thu;
mốc từng chữ là THẬT (`data/p2.timeline.json`). Hợp đồng cảnh đầy đủ: `docs/ENGINE.md` §7. Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/ja/2048/DNA.md` — 「盤上」: bàn 榧 4×4 + quân 駒 17 bậc trên chiếu, nắng xiên. Bảng "hình theo từng phần" (§1)
   là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết. §2 màu, §3 chữ, §5 mascot, §9 CẤM, §10 tiếng.
2. `docs/CRAFT.md` §5–§6: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; liền mạch ở ranh giới cảnh.
3. `projects/ja/2048/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/ja/2048/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây (không ảnh người, không giao diện thật của 2048/Threes!).
5. `projects/ja/2048/kit.js` — đọc HẾT (đầu file ghi các luật kit giữ bằng code).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + ảnh `out/_lab/ja/2048/a0.jpg` (mỗi câu một khung), tờ thử kit
   `out/_lab/ja/2048/kit/` (`kit-test.html`: mọi hàm ở k = 0.25/0.5/0.75/1, 17 bậc quân, bàn nhiều cỡ, thẻ hồi 4 mốc).
   Bàn thử gốc `tools/lab/banjo.html` (khung 0 = c2, khung 1 = e2 — dựng lại đúng như vậy bằng hàm kit).
7. `data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc từ|từ|từ` — từ đúng như `lookup` cần (unidic: trợ từ là từ riêng,
   ruby `{hiện|đọc}` là MỘT từ HIỆN: `w(i, '131072')`, `w(i, '2.2')`). **Đạo diễn tạo `data/lines.txt` + `data/p2.timeline.json`
   bản cuối trước khi giao** — chỉ số câu ở bảng dưới lấy từ bản căn tạm, đối chiếu lại với `lines.txt`.

## Hợp đồng một cảnh

File `projects/ja/2048/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, MIN, JP, ground, board, koma, telop, answer, heading, actCard, actCue, prog, lookup, must } from '../kit.js';
export default class Hozon {
  static ERA = 'banjo';                                  // MỘT ERA cho cả bài
  static POSES = [];                                     // CHỈ tư thế được giao (bảng nhóm)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { sum: w(2, '合計') };                       // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                        // mở hồi: max(START − 2.6, KẾT cảnh trước + 0.5); cảnh thường 1.2
    // this.CONTINUES = true;                            // chỉ khi cột CONTINUES ghi "có" VÀ khung đầu = khung cuối cảnh trước
  }
  sfx() { return [actCue(this.FROM, this.START), { t: this.T.sum, kind: 'soroban' }]; }   // giờ TIMELINE như T
  render(g, t) { ground(g, t); actCard(g, t, this.FROM, this.START, 1); /* … */ }          // t = giây trong p2
}
```

**Tra mốc.** Từ CHÉP NGUYÊN từ `lines.txt`. Từ LẶP trong câu → truyền n. `prog(t, a, b)` ném lỗi khi b < a hoặc NaN.
Chạy `python3 tools/qa/lookups.py ja/2048` và đọc TỪNG dòng "LẶP" (công cụ chỉ thấy `w(<số>, '<từ>'[, n])` nháy ĐƠN).

**FROM — một luật.** `FROM = max(START − lead, KẾT cảnh trước + 0.5)`; lead 1.2 (thường) / 2.6 (mở hồi); KẾT = `end` câu
cuối cảnh trước (cột "kết" của bảng). **Thẻ hồi tự lo mốc**: `actCard(g, t, FROM, START, n)` + `actCue(FROM, START)` trong
sfx() tính từ FROM THẬT (§82) — không ghi số giây tay cho thẻ hồi, không tự vẽ kicker (bảng `ACTS` trong kit).

**Chuyển cảnh.** Trang lo trong 0.9 s từ FROM: cùng ERA → **lật 棋譜** (tấm cũ trượt trái, tấm mới vào từ phải theo vệt nắng,
tiếng `page` tự có). Cảnh phải ĐẸP ở mọi t ∈ [FROM, FROM cảnh sau + 0.9], kể cả trước START. Đừng thêm tiếng ở FROM.

## Luật kit giữ bằng code (vi phạm → ném lỗi; đừng lách)

- **Chữ Nhật ≥ 28 px**: mọi chữ qua `write` / `telop` / `answer` / `luck` / `wrong` / `heading` / `vtext` / `tanzaku` / `stamp` /
  nhãn `tree`. Miễn DUY NHẤT số mũ: phần `['17', \`700 30px ${JP}\`, '@ink', { rise: 26, sup: true }]` (chỉ số/dấu). KHÔNG gọi
  `g.fillText` chữ Nhật trực tiếp trong cảnh. Ký hiệu toán (√ ≈ ⁷ …) Shippori THIẾU → phần đó dùng `JP`.
- **Màu nghĩa không có trong `C`**: 朱 chỉ qua `answer()` / `stamp()` / màu `'@ans'` (đáp án / khoảnh khắc chốt: = 131072,
  = 2.2, 930, 期待値, 答, 1/10 của ô cuối…). 浅葱 chỉ qua `luck()` / `coin()` / `koma({ luck })` / `hl` của bàn / `'@luck'`
  (đồng xu, nút 運, quân vừa rơi, xác suất 9/10, 1/10). Sai / gạch: `wrong()` + `strikeInk()` (墨 xám), chữ đúng NGAY DƯỚI.
  Khoanh / gạch chân / viền chọn: màu trung tính (`C.goldLt`, `C.gofunDim`, `C.sumi`).
- **Số trên quân**: ≥ 28 px; 5–6 chữ số ≥ 36 px khi quân ≥ 150 px. Bàn / quân quá nhỏ → kit ném lỗi bảo truyền
  `{ numbers: false }` (bàn mini: cây, hàng bàn, điện thoại) — khi đó số cần đọc thì viết bằng `telop` bên cạnh.
- **Luật 2048 thật**: mọi bàn có chuyển động chạy bằng `slide` / `boardMove` / `play` (quân mới = `spawn(cells, i)` theo hash).
  Không vẽ trạng thái không hợp lệ. `must` tổng bảo toàn đã nằm trong `slide`.
- **Zoom** chỉ qua `zoom(g, z, fx, fy)` (≤ 1.6, ném lỗi nếu hơn), trong `save/restore` của cảnh.

## Hàm kit (tóm tắt — chữ ký đầy đủ trong `kit.js`)

| nhóm | hàm |
|---|---|
| nền | `ground(g, t, { sun })` (sun 0..1 — b1 mở từ đen: nắng hiện dần), `dark(g, on)`, `zoom` |
| bàn / quân | `ban(g, x, y, S, k, { n, hl, gridV, gridH, legs, thick })` · `board(g, cells, x, y, S, k, { numbers, luck, dim, hl, chev, kChev })` · `boardMove(g, from, dir, x, y, S, k, { spawn })` · `koma(g, v, cx, cy, s, k, { luck, ghost, lift, dim, label })` · `chevrons(g, G, list, k)` · `komadai(g, x, y, w, h, k)` · `shogiban(g, x, y, S, k)` · `mat(v)` `thick(v, s)` `rank(v)` |
| luật | `slide(cells, dir)` → `{ cells, moves, merges, score, moved }` · `spawn(cells, i)` · `play(cells0, n, { seed, order })` · `snake(levels)` · `SNAKE` · `empty()` `copy()` |
| hằng | `LADDER` (4,4,8…65536, tổng 2¹⁷) · `LADDER2` (2,2,4…32768, tổng 2¹⁶) · `MEAN` 2.2 · `STATES` 18¹⁶ · `ARROW` · `ACTS` · `comma(n)` |
| giấy | `kifu(g, x, y, w, h, k, { rules, content })` (chữ/bàn trên tờ vẽ TRONG content — đi cùng tờ) · `tanzaku(g, x, y, w, h, k, { n, text, back, flip, kText })` |
| may rủi | `coin(g, cx, cy, R, k, { tilt, spin })` · `tree(g, root, x, y, k, { dx, dy, size, meSize, numbers })` (nút `board` / `me` / `luck` / `dot`, `best`, `tag`) |
| số chạy | `soroban(g, x, y, value, k, { cols, rod, from, kv })` (hạt trượt từ `from` sang `value`) |
| chữ / dấu | `write` · `telop` · `answer` · `luck` · `wrong` · `heading(g, act, title, k)` · `vtext` · `stamp` · `strikeInk` · `brush` · `arrow` · `measure` |
| hồi | `actCard(g, t, FROM, START, n)` · `actCue(FROM, START)` · `actTimes` |
| mascot | `figure(g, pose, cx, foot, h, k, { t, talk })` · `phoneBoard(g, F, cells)` (sau `figure('phone', …)`) |

## Bảng nhóm (chỉ số câu p2 = bản CUỐI, khớp `data/lines.txt` — đã đối chiếu 2026-10-12)

| nhóm | cảnh (file) | câu | kết ≈ s | mở hồi `actCard` | CONTINUES (nối tiếp cảnh trước?) | mascot |
|---|---|---|---|---|---|---|
| G1 | `b1-hozon` | 0–8 | 50.8 | 1 (mở từ ĐEN: `ground(g, t, { sun })` + `dark` từ FROM, nắng hiện dần — DNA §6) | không (sau intro) | — |
| G1 | `b2-tesuu` | 9–14 | 94.5 | — | không (棋譜 ghi tay vào) | — |
| G2 | `c1-kaidan` | 15–21 | 142.5 | 2 | không | — |
| G2 | `c2-16masu` | 22–27 | 180.7 | — | không (khung lab 0 mới) | `phone` (`talk: false`, `phoneBoard`) |
| G2 | `c3-naze4` | 28–33 | 223.9 | — | **có thể** — nếu c3 mở bằng ĐÚNG bàn rắn cuối c2 (cùng toạ độ, cùng quân) | — |
| G3 | `d1-jouzu` | 34–41 | 274.6 | 3 | không | — |
| G3 | `d2-rule` | 42–47 | 312.5 | — | không | `ponder` (nói, 「これで勝てる？」) |
| G4 | `e1-aite` | 48–58 | 374.4 | 4 | không | — |
| G4 | `e2-heikin` | 59–66 | 433.7 | — | không (将棋 / cây mới) | `coin-flip` (`talk: false`) |
| G4 | `e3-sakiyomi` | 67–72 | 475.1 | — | **có thể** — nếu e3 mở bằng ĐÚNG cây cuối e2 rồi cây phình ra | — |
| G5 | `f1-saiten` | 73–77 | 507.5 | 5 | không | — |
| G5 | `f2-td` | 78–81 | 529.6 | — | **có thể** — nếu f2 giữ đúng bàn "sau khi vuốt" của f1 | — |
| G5 | `f3-ayumi` | 82–88 | 597.1 | — | không (棋譜 dòng năm) | — |
| G6 | `g1-saikyo` | 89–94 | 644.5 | 6 | không | — |
| G6 | `g2-saigo` | 95–101 | 700.4 | — | không | `ok` (nói, 一発勝負) — HOẶC h1, không cả hai |
| G7 | `h1-matome` | 102–106 | 742.1 | 7 | không | (`ok` nếu G6 không dùng) |
| G7 | `h2-next` | 107–111 | 777.6 | — | không | `wave` (nói); biển 「99の発見」+「チャンネル登録」 GIỮA khung, đứng yên ≥ 4 s tới hết (vẽ bằng `telop`, toạ độ màn hình) |

Mối nối giữa hai nhóm: cảnh SAU sở hữu (FROM = max(START − lead, kết cảnh trước + 0.5)); KHÔNG đặt CONTINUES qua hai nhóm.
"Có thể" = chỉ đặt `CONTINUES = true` khi khung đầu TRÙNG khung cuối cảnh trước (so pixel; trượt hai bản cùng bố cục trông
như hình nhân đôi, §50, §90). Mascot ≤ 10 % thời lượng p2: mỗi lần 3–8 s quanh đúng câu, một bên khung (cx ≤ 380 hoặc
≥ 1540), h 680–760 (crop theo `CROP`), chân chạm đáy, chữ ở nửa kia. Tư thế không có miệng trong `mouths.js` → `talk: false`.

**Vật dùng chung** (§71, §83): bàn `board`/`ban`, quân `koma`, `LADDER`/`snake` (c1, c2, c3, d1, h1), 短冊 ①②③ (a0 → h1 lật ra
câu trả lời: 「約1000手、運を相手に」 · 「131072が限界」 · 「平均で読み、自分で学ぶ」), đồng xu (d2 lần đầu → e1–f1, g2), cây (e2, e3,
g1), 駒台 (b1, c1, d2, e3). Vẽ lại ĐÚNG như cảnh trước bằng hàm kit — không tự vẽ bản thứ hai. Thiếu vật → hàm cục bộ
trong file cảnh + báo đạo diễn (để gom vào kit). KHÔNG import cảnh khác.

## Hình bám lời (kênh Nhật)

- **≤ 3 s không có テロップ / vật mới** (§96): mỗi câu ≥ 1 thay đổi, bám đúng TỪ được đọc; câu dài thì thêm vật giữa câu.
  Camera trôi không tính là thay đổi.
- **Phần tử chính hiện từ FROM + 0.3** (khung đầu không trống). Kết luận viết xong TRƯỚC câu cuối của cảnh.
- Chữ hiện = viết (`write`/`telop` với k) — KHÔNG fade, không câu dài trên hình (テロップ ngắn: từ khoá, công thức).
- Vật rời khung bằng chuyển động (trượt), không biến mất giữa khung; không `if (t < mốc) vẽ()` cắt cứng.
- Mỗi khung MỘT ý chính. Gạch đúng CHỮ sai (`wrong` + `strikeInk`), chữ đúng ngay dưới; không gạch kết luận đúng.
- Mascot NÓI: `figure(g, pose, …, k, { t })` (miệng theo lời đọc khi đã đứng hẳn; chưa có `data/p2.mouth.json` thì im).

**Toán / số.** Mọi số lên hình tính bằng code + `must` ở trạng thái ĐÃ XONG (sau chuyển động + biên), không ở mốc bắt
đầu (§70); làm tròn ghi 「約」/「≈」 theo hướng an toàn và `must` chính chuỗi hiện (§94). Số mô phỏng (20万回, 1018手,
×200, 5回, 71.5%, 96%, 97%, 72%, 86.1%, 8.4%) là số của CONTENT — chỉ chép, không bịa thêm.

**Tất định.** Không `Math.random` / `Date.now` / `performance.now` (→ `hash(i)`, `spawn(cells, i)`, `play(…, { seed })`);
không `ctx.filter` trong render.

## Tiếng (DNA §10 — DÀY: ~1 tiếng / 2.5–3.5 s mỗi cảnh, MỖI テロップ một tiếng, khớp nghĩa vật)

`koma` (駒音, MỚI — một tiếng mỗi lượt vuốt / quân đặt; chùm cách ≥ 0.1 s) · gộp: `chip`/`snap` (bậc gỗ), `suzu` (bậc 漆),
`shimmer` (bậc 金) · quân mới rơi, đồng xu 運: `coin` · cây may rủi tách nhánh: `dice` · テロップ / chữ viết: `pen` hoặc `tick` ·
số chạy, 棋譜 tay: `soroban` · giấy vào: `page` · đóng dấu: `hanko` · gạch / 詰み: `error` · khớp: `correct` · thẻ hồi:
`actCue` (hyoshigi). Không hai tiếng trong 0.25 s; không tiếng cho chuyển động phụ. Báo số đã dùng theo loại.

Hạn mức loại hiếm — hàng của nhóm bạn (cộng cả video = trần DNA §10):

| nhóm (cảnh) | hyoshigi | dice | suzu + shimmer | hanko | taiko | error | correct |
|---|---|---|---|---|---|---|---|
| a0 (đạo diễn, đã dùng) | 0 | 1 | 4 | 1 | 0 | 0 | 0 |
| G1 b1 b2 | 1 | 0 | 1 | 1 (= 2.2) | 0 | 0 | 1 (tổng khớp) |
| G2 c1 c2 c3 | 1 | 0 | 2 | 1 | 1 (= 131072) | 1 (「いくらでも？」) | 1 |
| G3 d1 d2 | 1 | 1 | 1 | 0 | 0 | 1 (「これで勝てる？」) | 1 |
| G4 e1 e2 e3 | 1 | 2 | 1 | 1 (期待値 答) | 0 | 0 | 1 |
| G5 f1 f2 f3 | 1 | 1 | 1 | 1 (評価) | 0 | 0 | 1 |
| G6 g1 g2 | 1 | 1 | 1 | 0 | 1 (ô cuối = 4) | 2 (詰み) | 0 |
| G7 h1 h2 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| **TỔNG** | **7** = 7 hồi | **6** ≤ 6 | **12** ≤ 12 | **6** ≤ 6 | **2** ≤ 3 | **4** ≤ 4 | **6** ≤ 6 |

(§51, §55, §66: mỗi nhóm đúng hạn mức mà cả video vẫn vượt là lỗi phép cộng. Sau khi gộp, đạo diễn đếm lại bằng `shoot.js cues`.)

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"
#  giờ TRANG = mốc p2 + LEAD 3.0 (build.json phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/ja/2048/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --t <mốc trang,…> --outdir out/_lab/ja/2048/<nhóm>
python3 tools/qa/sheet.py out/_lab/ja/2048/<nhóm> out/_lab/ja/2048/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/ja/2048/p2.html?plates=<các cảnh của bạn>"     # chạy khô MỌI khung; mã 1 = lỗi
node engine/render/shoot.js cues --page "projects/ja/2048/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py ja/2048
grep -nE "fillText|C\.shu|#C53A20|#3AA5B5|#A42C16|#156A78" projects/ja/2048/plates/<cảnh>.js   # phải rỗng (chữ & màu nghĩa qua kit)
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước) và khung cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn; chữ đè nhân vật / chồng chữ; khung
  đứng im > 3 s (khoảng giữa hai cue > 4 s là chỗ phải xem ảnh); vật biến mất giữa khung; ký tự rơi về font khác.
- `shoot.js check` phải thoát 0 (ảnh chụp từng câu không trúng khung chuyển tiếp, chạy khô thì trúng — §70).

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn (thử bằng `p2.html?plates=…`). KHÔNG sửa `kit.js`, `p2.html`, `plates/p2-order.js`
  (đạo diễn ghép thứ tự), cảnh nhóm khác; KHÔNG commit; KHÔNG gọi agent khác; không gọi OmniVoice, không render video.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số tiếng
  theo loại (bảng hạn mức), hàm cục bộ nên gom vào kit, chỗ còn băn khoăn.
