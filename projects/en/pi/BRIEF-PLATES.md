# Brief: dựng cảnh phần 2 của pi ("What Is Pi, Really?")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng
Anh đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/pi/DNA.md` — "Bàn dựng hình": CẢ BÀI LÀ MỘT BỘ BẢN VẼ của nhà hình học.
   - Nét chì dựng hình (`C.lead`) để lại, không tẩy; hình cuối bằng mực (`C.ink`).
   - **XANH `C.blue` = sự thật**: π, vòng tròn compa (vật xuyên suốt), cận đúng. **Đỏ `C.red` CHỈ cho ý/số sai bị gạch.**
   - Bảng "hình theo từng phần" trong DNA §1 là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/pi/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/pi/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây (bảng "Đúng — đã kiểm", "Hình cần đúng").
5. `projects/en/pi/kit.js` — đọc HẾT: `ground` (giấy can, lưới trôi theo camera), `drift`, `text`, `typed`, `note` (ghi
   chú Plex Mono viết hoa, π giữ thường), `frac` (phân số chồng), `line` (thước, vẽ dần theo k), `poly`, `compassCircle`
   (vòng compa xanh, quét theo k), `pivot`, `arc`, `arrowHead`, `leader`, `hatch`, `card` (khung tên PLATE góc phải
   trên), `actTitle`, `strike` / `cross` (đỏ, vẽ tay), `check`, `ring`, `arrow`, `stamp`, `figure` (mascot viền mực,
   trả về hàm đổi toạ độ ảnh → khung), `portrait` (ảnh in kiểu bản khắc + nhãn), `iris`, `lookup`, `must`, `fix`,
   `PI_DIGITS` (200 chữ số đã kiểm), `C`, `CG`, `MONO`, `ARC`, `PI`.
6. Cảnh mẫu: `plates/a0-open.js` (mở bài, trang p1 — camera đi xuống tờ giấy qua 4 vùng). Khung chụp:
   `out/en/pi/qa/a0b/t_36.40.png`. Bàn thử phong cách: `tools/lab/drafting.html` (khung 0 = kẹp hình tròn, khung 1 =
   bóng của vòng quay — DÙNG LẠI được cho b2, c4). Ảnh so: `styleframes-compare.jpg` (hàng A).
7. `projects/en/pi/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/pi/assets/history/INDEX.md`: ảnh lịch sử có sẵn (key, file, kích thước, nhãn bắt buộc).

## Hợp đồng một cảnh

File `projects/en/pi/plates/<tên>.js`:

```js
import { W, H, C, CG, MONO, PI, ground, drift, card, typed, note, line, compassCircle, ..., lookup, must } from '../../kit.js';
export default class Squeeze {
  static ERA = 'vellum';                 // MỌI cảnh
  static POSES = ['compass'];            // CHỈ tư thế được giao
  static IMAGES = { archimedes: './assets/history/Domenico-Fetti_Archimedes_1620.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n của từ trong câu
    this.T = { ... };                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(4).start;             // câu đầu của mục
    this.FROM = this.START - 1.2;        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.6)
  }
  sfx() { return [{ t: this.T.x, kind: 'pen' }, ...]; }
  render(g, t) {                         // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
    const c = drift(t, this.FROM); ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y); /* hình */ g.restore();
    card(g, prog(t, this.FROM, this.FROM + 1.4), 'I', 'THE SQUEEZE', 'syracuse · c. 250 bc');   // toạ độ màn hình
  }
}
```

**Tra mốc.** Từ trong `w(i, word)` viết chữ thường, giữ nháy/gạch nối như trong `lines.txt` ("wouldn't", "twenty-two").
Số đọc bằng chữ. Sai từ → `lookup` ném lỗi có tên câu. Từ lặp trong câu → truyền n (a0 suýt sai: `w(4,'is')` lấy chữ
"is" ĐẦU câu). `prog(t, a, b)` với b < a là lỗi im lặng — kiểm a < b.

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: tờ cũ trượt lên, tờ mới vào (cùng ERA). Cảnh phải ĐẸP ở mọi
t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. Vật quan trọng vào SAU FROM + 0.9, bằng chuyển động (nét vẽ dần).
Cảnh vẽ TIẾP đúng hình của cảnh trước (cùng vòng tròn, cùng chỗ) → `CONTINUES = true;` (field lớp): cắt thẳng, và
khung đầu của bạn phải TRÙNG khung cuối của cảnh trước (vòng tròn cùng tâm/bán kính, vật đã có thì vẽ sẵn).

**Khung tên và thẻ hồi.**
- Khung tên `card(g, k, 'I', 'THE SQUEEZE', 'syracuse · c. 250 bc')`, k từ FROM, góc phải trên (x 1404–1824,
  y 64–160). Chừa vùng đó. Tên = tên `##` của SCRIPT viết hoa (rút gọn ≤ 22 ký tự). Số PLATE = số hồi (I–V).
- Mục MỞ HỒI gọi thêm `actTitle(g, t, START, 'II', 'Pi is about turning', 'answers note 1')` và FROM = START − 2.6.
  "answers note n" = câu hỏi số mấy trong khối NOTES của mở bài mà hồi này trả lời (H1, H2 → 1; H3 → 2; H4 → 3; H5 bỏ).

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc.
- Không khung nào đứng yên quá 3 s: nét mực/compa VẼ DẦN theo lời, camera `drift` (đã có trong mẫu hợp đồng). Đứng
  chờ với hình đã vẽ xong > 3 s là lỗi.
- Vật rời khung bằng chuyển động (trượt ra, camera đi tiếp trên tờ như a0), không biến mất giữa khung. Chữ VIẾT vào
  bằng `typed`/`note`, không fade.
- Mỗi khung MỘT ý chính được nhấn; bỏ vật không mang nghĩa. Hiểu lầm lời nói ra → viết chì, `strike` đỏ đúng từ
  "isn't"/"not", ý đúng viết xanh ngay dưới. Lập luận chỉ là trực giác → nhãn nhỏ "INTUITION, NOT A PROOF".
- **Vật xuyên suốt:** vòng tròn compa xanh (`compassCircle` + `pivot`). Khi vòng tròn là vật chính, dùng chuẩn
  tâm (760, 540), R 280 (trừ khi bố cục mục bạn cần khác — ghi lý do trong báo cáo).

**Toán / số.** Mọi số lên hình tính bằng code: `must('223 / 71 < Math.PI', true)`, `fix('96 * Math.sin(Math.PI / 96)', 4)`
→ chuỗi. Chỉ số liệu trong CONTENT.md. Làm tròn thì ghi "≈". Chữ số π lấy từ `PI_DIGITS`.

**Tất định.** Không `Math.random`, `Date.now`; ngẫu nhiên → `hash(i)`. KHÔNG `ctx.filter` trong render. Cache canvas
theo khoá cố định nếu cần.

**Chữ.**
- Cormorant Garamond LN 600 (số lớn), nghiêng 600 (câu dẫn), nghiêng 700 (π, chữ biến C, d). Plex Mono 500 cho ghi chú
  (`note`, ≥ 18 px; chữ thường ≥ 20 px). Archivo 600/700 chỉ trong khung tên / NOTES.
- CHỈ các cỡ đã nạp trong `p2.html` (dòng `fonts`); cần cỡ khác thì ghi trong báo cáo, dùng cỡ gần nhất.
- Ký tự đã kiểm có ở Cormorant: π ≈ ÷ · ≠ ⅛ ¼ ½ ² ⁿ → − × √ ∞ ° …  **KHÔNG có:** θ ✓ ✗ ⅑ ⟶ (vẽ tay: `check`, `cross`).
  Ký tự khác: kiểm fontTools `getBestCmap`.
- Tương phản: chữ nhỏ ≥ 4.5:1 → chữ nhỏ dùng `C.leadT` (4.75) hoặc đậm hơn; `C.lead` CHỈ cho nét, không cho chữ.

**Mascot.**
- CHỈ tư thế được giao: `figure(g, pose, cx, H, h, k)` — vẽ SAU khi `restore` camera (toạ độ màn hình).
- Một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–780, chân chạm đáy. Vào/ra bằng k (trồi lên). 3–8 s quanh đúng câu.
- `compass`: đứng PHẢI (compa chĩa trái vào hình). `spin` (toàn thân, đã cắt ngang hông): đứng TRÁI, vẽ vệt quay xanh
  quanh đầu ngón (xem lab drafting khung 1: `P(120, 132)` là đầu ngón trong ảnh gốc). `startled`: ảnh toàn thân KHÔNG cắt.

**Ảnh lịch sử.** `portrait(g, key, x, y, h, k, { label: { name, life, note } })` — in kiểu bản khắc. Archimedes:
note 'IMAGINED · NO LIKENESS SURVIVES'. Tổ Xung Chi: 'MODERN STATUE · NO LIKENESS SURVIVES'. Lambert, Lindemann, Fetti
nhỏ → h ≤ 330.

## Tiếng hiệu ứng (DNA cuối file; docs/lesson/SFX.md)

| chuyển động | tiếng |
|---|---|
| nét mực dài, compa quay, vòng tròn vẽ vào | `pen` |
| cắm chốt, bước dividers, dòng bảng / ghi chú hiện | `tick` |
| đa giác nhân đôi cạnh, cận khép lại | `snap` |
| Q.E.D., đáp đúng | `correct` |
| gạch đỏ ý sai | `error` |
| câu hỏi treo | `question` |
| ảnh dán lên tờ | `pop` |
| "IMPOSSIBLE · 1882", "exactly two" | `impact` — CHỈ d3 và e1 |

- Chuyển cảnh tự có `whoosh`: đừng thêm ở FROM.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (không tính chùm gõ); không hai tiếng trong 0.25 s. Im lặng là nhịp.
- Trần CẢ VIDEO đã chia theo nhóm trong lời giao việc (LESSONS §51). Báo số đã dùng theo loại trong báo cáo.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + 3.0 (LEAD). Mốc từng câu: data/lines.txt (cột 3 = bắt đầu, p2).
node engine/render/shoot.js stills --page "projects/en/pi/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 700 \
  --t <mốc trang,…> --outdir out/en/pi/qa/<nhóm>
python3 tools/qa/sheet.py out/en/pi/qa/<nhóm> out/en/pi/qa/<nhóm>.jpg
node engine/render/shoot.js cues --page "projects/en/pi/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
```

- Chụp ít nhất một khung mỗi câu, cộng khung ở FROM + 0.45 (giữa chuyển cảnh, nạp CẢ cảnh trước) và cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png) và sửa hết: chữ chạm mép; chữ đè nhân vật / chữ chồng chữ;
  tương phản thấp; khung trống hoặc đứng im quá 3 s; vật biến mất giữa khung; ký tự rơi về font khác.
- Log có `[PAGE ERROR]` / `LỖI` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit; KHÔNG
  gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh.
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh).
- Báo cáo cuối (ngắn, ≤ 20 dòng): file đã viết, mỗi câu hình làm gì (gọn), khung đã soi ở độ phân giải gốc, số tiếng
  theo loại, cỡ font cần thêm (nếu có), chỗ còn băn khoăn.
