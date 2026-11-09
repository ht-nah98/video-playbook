# Brief: dựng cảnh phần 2 của math-30k

Bạn dựng MỘT NHÓM cảnh (nhóm của bạn ghi trong lời giao việc) cho video bài học "Mathematics After 30,000 Years"
(kênh dạy toán 99% from scratch). Đọc theo thứ tự, ĐỪNG bỏ bước nào:

1. `projects/en/math-30k/DNA.md` — phong cách "The Long Line": chất liệu theo thời đại, màu nhấn = cái MỚI được phát
   minh, chữ được VIẾT/ĐÓNG DẤU vào (không bao giờ fade), mascot tiết chế, chân dung theo chất liệu.
2. `docs/CRAFT.md` §5 — vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/math-30k/SCRIPT.md` — lời đọc của mục của bạn (đây là cái người xem NGHE; hình phải nói cùng ý).
4. `projects/en/math-30k/kit.js` — mọi công cụ vẽ (đọc hết file, ngắn).
5. Ba cảnh mẫu đã được người dùng duyệt — học cách làm, ĐỪNG chép bố cục:
   `plates/c0-open.js` (mở bài), `plates/a1-bone.js` (xương), `plates/a2-sumer.js` (Sumer, đất sét).
   Video đã duyệt: `out/en/math-30k/math-30k-part1.mp4` (chỉ cần xem vài khung bằng ffmpeg nếu muốn).
6. `projects/en/math-30k/data/p2.lines.txt` — chỉ số câu (0–226) của phần 2 → mục → chữ.
7. `projects/en/math-30k/assets/history/INDEX.md` — ảnh lịch sử có sẵn (key, file, loại).

## Hợp đồng một cảnh

File `projects/en/math-30k/plates/<tên>.js` (tên trong lời giao việc), một mục của SCRIPT.md = một file:

```js
import { ERA, W, H, ..., lookup } from '../../kit.js';
export default class Euclid {
  static ERA = 'sand';                                   // chất liệu nền (khoá của kit.ERA)
  static IMAGES = { euclid: './assets/history/euclid.jpeg' };   // ảnh cần nạp (đường dẫn tương đối trang)
  static POSES = ['point'];                              // tư thế mascot cần nạp (assets/character-v2/cut/pose-*.png)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu từ
    this.T = { ... };                                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(11).start;                            // câu đầu của mục
    this.FROM = this.START - 1.2;                        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.6)
    // this.WIPE = [x, y];                               // tâm nền mới loang ra (khi ERA khác cảnh trước) — tuỳ chọn
  }
  render(g, t) { ground(g, Euclid.ERA); ... }            // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

- Từ trong `w(i, word)`: chữ thường, giữ dấu nháy và gạch nối như trong câu (`"doesn't"`, `"thirty-seven"`,
  `"al-jabr"`). Sai từ → `lookup` ném lỗi có tên câu: sửa ngay.
- Trang `part2.html` lo chuyển cảnh (0.9 s từ FROM): khác ERA → nền mới loang; cùng ERA → tờ cũ trượt lên. Cảnh
  của bạn phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9] — kể cả trước START (thẻ mốc đang viết vào).
- Thẻ mốc: `card(g, era, k, 'ACT TWO · PROOF', '≈ 300 BC', 'Euclid, the Elements')` + `ruler(g, era, năm, k)` —
  như các cảnh mẫu, viết vào từ FROM. Mục MỞ HỒI gọi thêm `actTitle(g, era, t, START, 'ACT TWO', 'Proof')`.
- Mỗi câu (một dòng của SCRIPT) = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên
  quá 3 s. Vật rời khung bằng chuyển động (trượt, rơi, xén), không `if (t < mốc)` cho vật biến mất giữa khung.
- Toán trên hình PHẢI đúng (tính bằng số trong code, như tam giác I.1 tính C từ A, B). Con số/năm/tên chỉ lấy từ
  `SCRIPT.md`, `CONTENT.md` — không thêm sự kiện mới.
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)`. Cache theo khoá cố định nếu cần.
- Chữ: Archivo (năm/nhãn lớn), Cormorant nghiêng (tên, câu, công thức), Plex Mono (nhãn nhỏ ≥ 20 px). Chỉ dùng các
  cỡ font đã nạp ở `part2.html` (dòng `fonts`); cần cỡ khác thì dùng cỡ gần nhất.
- Mascot: CHỈ tư thế được giao trong nhóm, ở một bên khung, phía còn lại là hình toán; vào bằng `figure(..., k)`.
- Chân dung: `portrait(g, key, era, x, y, h, k, { style, label: { name, life, note } })` — giấy in → 'engrave',
  bảng đen → 'pin', còn lại 'print'. Chân dung tưởng tượng: note = 'IMAGINED · NO LIKENESS SURVIVES'. Năm sinh–mất
  chỉ ghi khi chắc chắn (tên người lịch sử nổi tiếng: chuẩn); không chắc → bỏ `life`.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
python3 -c "import json;d=json.load(open('projects/en/math-30k/data/p2.timeline.json'));[print(round(s['start']+0.8,1),s['name']) for s in d['sections']]"
#   (thời gian TRANG = mốc p2 + 0.8). Mốc hiện là ƯỚC TÍNH; giọng thật sẽ thay — cảnh tra theo chữ nên không vỡ.
node engine/render/shoot.js stills --page "projects/en/math-30k/part2.html?plates=<các cảnh của bạn>" --dur 1300 \
  --t <mốc,…> --outdir out/en/math-30k/qa/<tên>
python3 tools/qa/sheet.py out/en/math-30k/qa/<tên> out/en/math-30k/qa/<tên>.jpg
```
Chụp ít nhất một khung mỗi câu, và mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png): chữ chạm mép, chữ đè
nhân vật/ảnh, chữ chồng chữ, tương phản thấp, khung trống quá 3 s — sửa hết. `[PAGE ERROR]` trong log = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `part2.html`, `p2-order.js`, cảnh của nhóm khác, và
  KHÔNG commit. Cần công cụ mới → viết hàm cục bộ trong file cảnh của bạn.
- Không gọi OmniVoice, không render video (chỉ chụp ảnh tĩnh).
- Báo cáo cuối (ngắn): file đã viết, mỗi câu hình làm gì, khung nào đã soi ở độ phân giải gốc, chỗ còn băn khoăn.
