# Brief: dựng cảnh phần 2 của neg-times-neg ("Why Is a Negative Times a Negative Positive?")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/neg-times-neg/DNA.md` — DNA "Tiles": số âm là viên gạch trên thảm cắt, vật xuyên suốt ZERO PAIR, vàng = dương,
   đỏ = âm, xanh băng CHỈ cho cái sai. Bảng "hình theo từng phần" là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/neg-times-neg/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/neg-times-neg/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/neg-times-neg/kit.js` — đọc HẾT (zeroPair, mulRect, tile, eq, num/par, stickyNote, crack, portrait, card…).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` (trang p1) + khung lab `out/_lab/tiles/t_0.50.png`, `t_1.50.png`
   (`tools/lab/tiles.html` — d4 và e2 dựng theo đúng hai khung này).
7. `projects/en/neg-times-neg/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/neg-times-neg/assets/history/INDEX.md`: ảnh có sẵn (key, file, cỡ).

## Hợp đồng một cảnh

File `projects/en/neg-times-neg/plates/<tên>.js` (tên trong lời giao việc), một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, ARC, ground, card, actTitle, eq, num, par, tile, zeroPair, mulRect, label, prog, lookup, must, typeCues } from '../../kit.js';
export default class Pattern {
  static ERA = 'mat';                                    // cả bài một chất liệu
  static IMAGES = { euler: './assets/history/euler.jpg' };   // ảnh cần nạp (đường dẫn tương đối trang)
  static POSES = ['twoways'];                            // CHỈ tư thế được giao
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { ... };                                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(28).start;                            // câu đầu của mục
    this.FROM = this.START - 1.2;                        // lúc cảnh bắt đầu hiện (mục MỞ HỒI: START − 2.6)
    // this.CONTINUES = true;                            // cảnh vẽ TIẾP đúng hình của cảnh trước → cắt thẳng (§50)
  }
  sfx() { return [...typeCues('…', a, b), { t: T.x, kind: 'pop' }]; }   // tiếng của chuyển động TRONG cảnh
  render(g, t) { ground(g, 'mat'); ... }                 // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("don't", "twenty-three"). Sai từ → `lookup` ném lỗi.
Từ LẶP trong câu ("minus", "times", "two", "three" lặp RẤT nhiều ở bài này) → truyền n và đếm cẩn thận; `prog(t, a, b)`
ném lỗi khi b < a (LESSONS §59). Chạy `python3 tools/qa/lookups.py neg-times-neg` sau khi viết.

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM (cùng ERA → tấm thảm cũ trượt lên, có whoosh). Cảnh phải ĐẸP ở
mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. `CONTINUES`: khung đầu của bạn phải TRÙNG khung cuối cảnh trước.

**Thẻ mục / thẻ hồi.** `card(g, k, 'ACT II', 'THE PATTERN')` góc trái trên (x 96–900, y 64–166 — CHỪA vùng này), tên VIẾT
HOA ≤ **31 ký tự** (đạo diễn ĐO: "FICTITIOUS, ABSURD, MEANINGLESS" = 779 px, §56). Mục MỞ HỒI gọi thêm
`actTitle(g, t, START, 'II', 'Explanations that feel right', 'answers question 2')`, FROM = START − 2.6, và card hiện
SAU khi thẻ hồi trượt đi.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá 3 s (camera `drift` không
  đủ nếu hình đã vẽ xong). Mục mở hồi phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động (gạch nhấc lên, zero pair biến), không biến mất giữa khung. Chữ VIẾT vào, không fade.
- Mỗi khung MỘT ý chính. **Số dương = viên/chữ VÀNG, số âm = viên/chữ ĐỎ, 0 và phép toán ngà** — mọi số qua `num()` /
  `par()` (dấu "−" thật) và `eq()` tô đúng màu. Mỗi lần lời nói "adds up to zero / opposites" → một `zeroPair` thật sự
  úp và biến (vật xuyên suốt).
- **Xanh băng CHỈ cho cái sai** (`strike`, `crack`, viền `wrong`). KHÔNG gạch các cách giải thích ở hồi 2 hay Euler — chúng
  được nhãn "A WAY TO REMEMBER · NOT A PROOF" (ngà/nhãn phụ), không phải ý sai (§58).
- Dụng cụ trên hình làm ĐÚNG điều lời đọc nói (§57): chữ nhật nhân của (−3) × 2 là 3 hàng đỏ × 2 cột vàng → lòng đỏ.
- Vật phải đứng yên (thẻ mục, nhãn chốt, nhân vật) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera.

**Toán / số.** Mọi số lên hình tính bằng code (`must`); chỉ số liệu trong CONTENT.md.

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render.

**Chữ.** Chỉ Archivo / IBM Plex Mono / Cormorant Garamond LN (đã nạp trong `p2.html`). `label` VIẾT HOA (nhãn in thảm),
`mono` giữ hoa/thường, `quote` lời dẫn nghiêng. Ký tự lạ kiểm fontTools `getBestCmap`; θ ✓ ✗ ⅑ ⟶ τ không có → vẽ tay
(`check`, `cross`). Chữ nhỏ ≥ 4.5:1 trên thảm (nhãn phụ `C.dim` là sàn).

**Mascot.** CHỈ tư thế được giao, một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–780, chân chạm đáy, 3–8 s quanh đúng câu,
vẽ sau khi `restore` camera. **Ảnh**: `portrait(g, key, x, y, h, k, { label: { name, life, note } })` — năm chỉ lấy từ CONTENT.

## Tiếng hiệu ứng (DNA cuối file; docs/lesson/SFX.md)

gạch rơi `chip` (một tiếng cho cả hàng) · zero pair biến `pop` · chữ viết `type` (typeCues) · khép chữ nhật / dán thẻ
`snap` · nhãn, dấu `tick` · nứt / sụp `impact` + `error` · kết luận đúng `correct` · câu hỏi `question`.
- Chuyển cảnh trượt tự có whoosh — đừng thêm ở FROM. Không tiếng cho chuyển động phụ.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (ngoài chùm gõ); không hai tiếng trong 0.25 s.
- Hạn mức loại hiếm của NHÓM BẠN ghi trong lời giao việc (bảng của đạo diễn đã cộng ≤ trần cả video — §55). Báo số đã dùng.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD (build.json, phần p2: LEAD = 3.0). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/neg-times-neg/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 900 \
  --t <mốc trang,…> --outdir out/en/neg-times-neg/qa/<nhóm>
python3 tools/qa/sheet.py out/en/neg-times-neg/qa/<nhóm> out/en/neg-times-neg/qa/<nhóm>.jpg
node engine/render/shoot.js cues --page "projects/en/neg-times-neg/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước) và khung cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn; chữ đè nhân vật / chồng chữ;
  tương phản thấp; khung đứng im > 3 s; vật biến mất giữa khung; ký tự rơi về font khác; số sai màu (dương phải vàng,
  âm phải đỏ). `[PAGE ERROR]` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh). `shoot.js` luôn kèm `--page`.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, số tiếng theo loại,
  cỡ font cần thêm, chỗ còn băn khoăn.
