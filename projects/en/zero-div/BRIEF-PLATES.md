# Brief: dựng cảnh phần 2 của zero-div ("Why You Can't Divide by Zero")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học của kênh dạy toán "99% from scratch". Lời đọc
tiếng Anh đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/zero-div/DNA.md` — "The Hole in the Page": cả video là MỘT trang giấy kẻ ô; ở điểm 0 có một LỖ THỦNG
   thật. Mực xanh đậm = phép tính; ĐỎ bút chấm bài = CHỈ chỗ hỏng (gạch, ✗, ≠, UNDEFINED, −∞…). Phép tính được VIẾT
   ra, sai thì GẠCH ĐỎ — không bao giờ fade.
2. `docs/CRAFT.md` §5 — vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/zero-div/SCRIPT.md` — lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/zero-div/CONTENT.md` — mọi con số/năm/tên/kết quả máy tính lên hình PHẢI có ở đây.
5. `projects/en/zero-div/kit.js` — đồ nghề (đọc hết): `ground, hand, seg, typed, stamp, card, actTitle, strike,
   cross, ring, arrow, hole, diveInto, figure (nửa thân, CROP), iris, wedge, lookup, GRID`.
6. Cảnh mẫu đã dựng: `plates/a0-open.js` (mở bài — học cách tra mốc theo chữ, viết vào, gạch đỏ, lỗ). Khung phong
   cách: `styleframes.jpg` (bàn thử `tools/lab/hole.html`).
7. `projects/en/zero-div/data/lines.txt` — chỉ số câu p2 (dòng bắt đầu "p2 i") → mục → chữ.

## Hợp đồng một cảnh

File `projects/en/zero-div/plates/<tên>.js`:

```js
import { ERA, W, H, ..., lookup } from '../../kit.js';
export default class Division {
  static ERA = 'page';                   // 'page' (giấy kẻ ô) — riêng cảnh máy tính: 'void'
  static POSES = ['shrug'];              // tư thế mascot được giao (assets/character-v2/cut/pose-*.png)
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n của từ
    this.T = { ... };                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(48).start;            // câu đầu của mục
    this.FROM = this.START - 1.2;        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.3)
    // this.WIPE = [x, y];               // khác ERA với cảnh trước: nền mới loang từ đây (đặt ở tâm lỗ)
  }
  render(g, t) { ground(g, 'page'); ... } // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

- Từ trong `w(i, word)`: chữ thường, giữ nháy/gạch nối như trong câu ("isn't", "thirty-five", "al-khwarizmi").
  Sai từ → `lookup` ném lỗi có tên câu: sửa ngay. Số đọc bằng chữ ("twelve", "six", "twenty-eight").
- Trang `p2.html` lo chuyển cảnh (0.9 s từ FROM): cùng ERA → tờ cũ trượt lên, tờ mới vào (lật trang); khác ERA → nền
  mới loang từ WIPE. Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9] — kể cả trước START.
- Tiêu đề mục: `card(g, 'page', k, 'ACT TWO · THE BROKEN OPERATION', 'What division really is')`, viết vào từ FROM,
  góc trái trên (x ≈ 200, y 100–152) — chừa vùng đó. Mục MỞ HỒI gọi thêm `actTitle(g, 'page', t, START, 'ACT TWO',
  'The broken operation')` (thẻ hồi giữa khung trong khoảng lặng 2.4 s trước START).
- **LỖ**: `hole(g, cx, cy, r, inside?)`. Vị trí "nhà" của lỗ: (960, 640), r ≈ 60 — dùng khi không có lý do khác, để
  khi lật trang lỗ như xuyên qua cả xấp giấy. Lỗ là NHÂN VẬT: nó hút, nuốt, rách, chứa — đừng chỉ đặt nó cho có.
- Mỗi câu (một dòng của SCRIPT) = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá
  3 s. Vật rời khung bằng chuyển động (trượt, rơi vào lỗ, xén), không biến mất giữa khung.
- Toán trên hình PHẢI đúng, TÍNH bằng code (đồ thị vẽ bằng hàm; bảng số kiểm bằng phép tính, `throw` nếu sai).
  Ký hiệu có đủ trong font: ÷ × − ∞ ≈ ≠ ² → ±. ✗ KHÔNG có — dùng `cross`. Dấu trừ dùng "−" (U+2212), không "-"
  (trừ trong terminal).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)`.
- Chữ: Archivo 800 (số/phép tính lớn), Cormorant nghiêng 600 (câu, tên người, "khahara"), Plex Mono 500 (nhãn nhỏ
  ≥ 20 px, bảng số, terminal). CHỈ các cỡ đã nạp trong `p2.html` (dòng `fonts`).
- Mascot: CHỈ tư thế được giao, NỬA THÂN (`figure(g, pose, cx, H, h, 'page', k)` — CROP tự đúng), một bên khung
  (x ≤ 380 hoặc ≥ 1540), h ≈ 620–760, phía còn lại là toán. Vào bằng k (trồi lên), ra bằng k giảm (lặn xuống).
  Mỗi lần xuất hiện 3–8 s quanh đúng câu được giao; không có mặt suốt mục.
- Không chân dung, không ảnh: Brahmagupta/Bhaskara chỉ là tên viết tay + năm + tên sách.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + 3.0 (LEAD). Mốc từng câu: data/lines.txt (cột 3 = mốc p2).
node engine/render/shoot.js stills --page "projects/en/zero-div/p2.html?plates=<các cảnh của bạn>" --dur 600 \
  --t <mốc trang,…> --outdir out/en/zero-div/qa/<tên>
python3 tools/qa/sheet.py out/en/zero-div/qa/<tên> out/en/zero-div/qa/<tên>.jpg
```
Chụp ít nhất một khung mỗi câu, và mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png): chữ chạm mép, chữ đè
nhân vật/lỗ, chữ chồng chữ, tương phản thấp, khung trống quá 3 s — sửa hết. Log có `[PAGE ERROR]` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác, và KHÔNG commit.
  Cần công cụ mới → viết hàm cục bộ trong file cảnh.
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh).
- Báo cáo cuối (ngắn): file đã viết, mỗi câu hình làm gì, khung nào đã soi ở độ phân giải gốc, chỗ còn băn khoăn.
