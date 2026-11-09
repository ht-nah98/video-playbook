# Brief: dựng cảnh phần 2 của zero-power ("Why Is Anything to the Power of Zero One?")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/zero-power/DNA.md` — "LCD": ý trung tâm, vật xuyên suốt (thanh ghi × = 1 lam), màu mang nghĩa gì (lam = 1,
   gỉ = 0, tranh chấp = `contested`, SAI = `wrong` âm bản + ERR).
   Bảng "hình theo từng phần" là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/zero-power/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/zero-power/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/zero-power/kit.js` — đọc HẾT.
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + khung chụp `out/en/zero-power/qa/a0.jpg`; bàn thử `tools/lab/lcd.html`.
7. `projects/en/zero-power/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/zero-power/assets/history/INDEX.md`: ảnh lịch sử có sẵn (key, file, cỡ, nhãn bắt buộc).

## Hợp đồng một cảnh

File `projects/en/zero-power/plates/<tên>.js` (tên trong lời giao việc), một mục `##` của SCRIPT.md = một file:

```js
import { W, H, C, ground, ink, card, actTitle, dm, row, seg7, prog, lookup, must, figure } from '../../kit.js';
export default class Euclid {
  static ERA = 'lcd';                                    // khoá của kit.ERA (chỉ có 'lcd')
  static IMAGES = { cauchy: './assets/history/cauchy.jpg' };    // ảnh cần nạp (đường dẫn tương đối trang)
  static POSES = ['point'];                              // CHỈ tư thế được giao (assets/character-v2/cut/pose-*.png)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { ... };                                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(11).start;                            // câu đầu của mục
    this.FROM = this.START - 1.2;                        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.6)
    // this.CONTINUES = true;                            // cảnh vẽ TIẾP đúng hình của cảnh trước → cắt thẳng (§50)
  }
  sfx() { return [...typeCues('ELEMENTS', T.e, T.e + 0.6), { t: T.x, kind: 'pop' }]; }  // tiếng của chuyển động TRONG cảnh
  render(g, t) {                                         // t = giây trong p2 (0 = câu 0)
    ground(g);                                           // kính LCD toàn khung
    ink(g, d => { card(d, k, 'ACT II', 'THE RULE'); dm(d, …); row(d, …); });   // MỌI chữ/số vẽ trong ink
    figure(g, 'pointer', 1640, 1080, 760, k);            // nhân vật SAU ink
  }
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("doesn't", "thirty-seven"). Sai từ → `lookup` ném lỗi.
Từ LẶP trong câu → truyền n; `prog(t, a, b)` ném lỗi khi b < a (LESSONS §59).

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM (khác ERA → nền mới loang; cùng ERA → tờ cũ trượt lên, có
whoosh). Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. `CONTINUES`: khung đầu của bạn phải
TRÙNG khung cuối cảnh trước (không whoosh).

**Biển tên mục / thẻ hồi.** `card(d, k, 'ACT II', 'TÊN MỤC')` góc trên trái (x 96, y 74, ma trận điểm p4) — chừa vùng
y < 130. Chuỗi "ACT II · TÊN" tối đa **31 ký tự** (31 × 24 = 744 px; dải chỉ báo `annunciators` ở góc trên phải bắt đầu
từ x ≈ 1310) — dài hơn thì rút gọn. Mỗi cảnh gọi `annunciators(d, ['×'])` (thêm 'ERR' khi có lỗi / âm bản, 'E' khi ô 0⁰
nhấp nháy). Mục MỞ HỒI gọi thêm `actTitle(d, t, START, 'II', 'FORCED BY A RULE', 'ANSWERS 1 + 2')` (trong ink),
FROM = START − 2.6.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá 3 s (camera trôi chậm
  không đủ nếu hình đã vẽ xong). Cảnh MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động, không biến mất giữa khung. Chữ VIẾT vào, không fade.
- Mỗi khung MỘT ý chính. Hiểu lầm: CHỈ những chỗ DNA §1 liệt kê → viết chữ sai, `wrong()` đúng CHỮ sai (âm bản) +
  ERR, ý đúng viết ngay dưới; KHÔNG âm bản câu đúng (§58). Trực giác → nhãn "A HINT · NOT A PROOF".
- Dụng cụ trên hình làm ĐÚNG phép đo lời đọc nói (độ dài cung ≠ dây cung) và khớp với cảnh trước đã dùng nó (§57).
- **Vật xuyên suốt** (DNA §1): vẽ đúng trạng thái của hồi bằng hàm chung của kit. **Mục tóm tắt**: vẽ lại thu nhỏ hình
  của từng hồi, không vẽ hình mới.
- Vật phải đứng yên (biển kênh, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera.
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / viền chọn / số thứ tự bằng màu mực. Đẳng thức đúng
  nhưng "hỏng khi bỏ luật" → nứt qua dấu "=" + nhãn điều kiện, KHÔNG gạch (§62).
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; vùng mới sau camera có sẵn ô chờ (viền đứt) ngay khi
  tới. FROM mở hồi = max(START − 2.6, câu cuối cảnh trước + 0.5); kết luận viết xong TRƯỚC câu cuối (§64).

**Toán / số.** Mọi số lên hình tính bằng code (`must`); chỉ số liệu trong CONTENT.md; làm tròn ghi "≈".

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render (sprite mờ vẽ sẵn).

**Chữ.** KHÔNG `fillText` / font: chữ = `dm` (ma trận điểm, chữ hoa, `^…^` số mũ — nhớ ĐÓNG), số lớn = `row` / `seg7`
(7 đoạn). Đo trước bằng `dmW` / `rowW` để căn và kiểm chạm mép. Glyph thiếu → kit ném lỗi: thêm hàm cục bộ và BÁO.
Màu chỉ mực / lam (giá trị 1) / gỉ (giá trị 0) / phụ (DNA §2).

**Mascot.** CHỈ tư thế được giao, một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–780, chân chạm đáy, 3–8 s quanh đúng câu,
vẽ sau khi `restore` camera. **Chân dung**: nhãn tên + năm (chỉ năm có trong CONTENT) + note bắt buộc cho ảnh tưởng tượng.

## Tiếng hiệu ứng (DNA cuối file; docs/lesson/SFX.md)

DNA §10: beep (số hiện / bấm phím) · tick (đoạn tắt, rút thừa số, bậc) · chip (thanh ghi reset, ảnh in xong) ·
question (ô 0⁰, câu hỏi) · error (ERR / âm bản) · correct (chốt = 1) · snap (hai quy luật đâm vào ô) · whoosh-long (hiếm).
- Chuyển cảnh trượt tự có whoosh — đừng thêm ở FROM. Không tiếng cho chuyển động phụ.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (ngoài chùm gõ); không hai tiếng trong 0.25 s.
- Hạn mức loại hiếm của NHÓM BẠN ghi trong lời giao việc (bảng của đạo diễn đã cộng ≤ trần cả video — §51, §55). Báo số
  đã dùng theo loại.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/zero-power/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 900 \
  --t <mốc trang,…> --outdir out/en/zero-power/qa/<nhóm>
python3 tools/qa/sheet.py out/en/zero-power/qa/<nhóm> out/en/zero-power/qa/<nhóm>.jpg
node engine/render/shoot.js cues --page "projects/en/zero-power/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước) và khung cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ;
  tương phản thấp; khung đứng im > 3 s; vật biến mất giữa khung; ký tự rơi về font khác. `[PAGE ERROR]` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh). `shoot.js` luôn kèm `--page`.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, số tiếng theo loại,
  cỡ font cần thêm, chỗ còn băn khoăn.
