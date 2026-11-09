# Brief: bàn thử phong cách (DNA) cho sudoku — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, **"The Hidden Math Inside Every Sudoku"**, ~11 phút, 6 hồi: luật +
số lưới → vòng Phistomefel (tô đỏ/xanh, bỏ phần chung) → hình vuông 5×5 − 4×4 = một bộ → giải câu đố "Difference of
Squares" (MathGuy_12) ra x² = y² + x + y → chứng minh 17 gợi ý (McGuire 2012) → "chỉ là logic?". Đọc
`projects/en/sudoku/SCRIPT.md` (đã duyệt) và `projects/en/sudoku/CONTENT.md` (dữ liệu câu đố, mọi con số). Người dùng sẽ SO 3
hướng rồi chọn một, nên hai khung của bạn phải đẹp như khung thật của video.

**Ý trung tâm (đề xuất):** *đếm mà không cần biết* — một hàng/cột/khối đủ thì biết chính xác nó chứa gì. Hình: hai màu
(đỏ, xanh) phủ lên lưới; ô HAI màu bị gỡ ra (vì có ở cả hai bên); cái còn lại cân nhau. Trong chất liệu của bạn, "tô
màu", "ô hai màu" và "gỡ ra" trông thế nào? Ghi ở khối DNA tóm tắt. **Màu đỏ ở đây là màu tập hợp, KHÔNG phải màu sai**
— chọn hai sắc rõ, phân biệt được với người mù màu đỏ–lục (đo bằng số: khác độ sáng ≥ 20%, hoặc thêm hoạ tiết sọc).

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0
khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/shadowbox.html`, `tools/lab/tiles.html`.
Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc, sửa đến khi sạch: chữ chạm mép / đè nhân vật / chồng chữ, tương phản thấp, ký tự rơi
về font khác, số trong ô lưới khó đọc, khoảng trống vô nghĩa.

**Lưới đã giải dùng chung** (khung 0): lời giải của câu đố Difference of Squares (CONTENT.md):
`572946381634851297981732564768429153459318672213567948825194736197683425346275819` (hàng 1 → 9). `must` 27 ràng buộc.

**Khung 0 — Hồi 2, "What's left".** Lưới 9×9 có đủ số. Hiện trạng thái SAU khi gỡ: vòng 16 ô quanh khối giữa (đỏ)
và bốn góc 2×2 (xanh); các ô từng có hai màu còn dấu "đã gỡ" mờ (cách gỡ của chất liệu bạn). Bên cạnh: hai dãy số đã
sắp xếp của vòng và của góc, khớp từng số (`must` đa tập bằng nhau trên chính lưới). Dòng chữ ngắn: "ring = corners".
Mascot `assets/character-v2/cut/pose-point.png` (toàn thân, chỉ dùng phần trên 45%, `crop = 0.45`), MỞ ẢNH xem tay
chỉ hướng nào rồi đặt bên đối diện để tay chỉ vào lưới.

**Khung 1 — Hồi 4, "The equation".** Lưới câu đố (CHƯA có số, trừ hai ô x − y = 1): lồng nét đứt có nhãn góc (x, y,
y², x², x − y, 15), 6 mũi tên có vòng tròn, 7 đường renban tím — toạ độ ĐÚNG như CONTENT.md. Tô: phần đỏ còn lại (lồng y²
+ lồng x + lồng y) và phần xanh còn lại (lồng x²). Phương trình lớn: `x² = y² + x + y` → `(x − y)(x + y) = x + y` →
`x − y = 1`. Credit nhỏ: "Difference of Squares · puzzle by MathGuy_12 · SudokuPad". Không mascot (hoặc mascot nhỏ
`pose-ok`, nếu còn chỗ).

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ; số trong ô ≥ 7:1).
- Tất định: không `Math.random`/`Date.now` (→ `hash(i)` từ `engine/lib.js`). Promise.all mọi font trước vẽ. Không
  `ctx.filter` lúc vẽ khung.
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond LN…). Ký tự lạ (² − × →) kiểm bằng
  fontTools `getBestCmap`; thiếu → vẽ tay.
- Không logo, không giao diện thật (không chép giao diện SudokuPad).
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm, "tô màu / ô hai màu / gỡ ra" trong chất
  liệu, bảng màu (hex), chữ, tiếng hiệu ứng (thư viện: type tick pop snap whoosh whoosh-long shimmer impact error correct
  question beep pen page tear coin chip card flap door dice wood), các phần khác của bài trông thế nào (lịch sử Number
  Place 1979 / Nikoli / 2004, con số 6.7 × 10²¹, 5×5 − 4×4, McGuire + siêu máy tính, hình chữ nhật 7/9 không tránh được,
  "máy tính giải tức thì", gói lại).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.

## Ba hướng (mỗi agent một)

- **`newsprint`: Trang báo và bút dạ.** Sudoku sống ở trang giải trí của báo in: giấy báo ngà, chữ in, lưới in đen,
  số in đậm. Hai màu tập hợp là **hai cây bút dạ highlight** (ví dụ cam và xanh lam) quét thành vệt có mép không đều, chồng
  lên nhau thì đậm; "gỡ ra" = gạch bút chì hoặc tẩy. Bút chì ghi chú lề.
- **`glass`: Kính màu.** Lưới là khung chì; hai tập hợp là **hai tấm kính màu** đặt lên lưới, ánh sáng xuyên qua; ô hai
  màu thành ô sẫm (hai lớp kính) — "gỡ ra" = nhấc ô kính đôi đi. Nền sáng dịu (tường đá / giấy dó), không tối hẳn.
- **`puzzlelab`: Bàn giải tối.** Nền tối xanh mực, lưới mảnh sáng, số trắng ngà kiểu ứng dụng giải đố hiện đại (KHÔNG chép
  SudokuPad); tô màu = ô phát sáng mờ hai sắc (cam `#FF6A2B` của kênh và xanh lam), ô hai màu sọc chéo; "gỡ ra" = ô tắt sáng.
  Gần không khí intro 3D mới của kênh. Phải đọc rõ: số to, tương phản cao.
