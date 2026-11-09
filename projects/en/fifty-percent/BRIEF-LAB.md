# Brief: bàn thử phong cách (DNA) cho fifty-percent — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, "What Does 50% Actually Mean?" — xác suất là gì: tần suất hay
niềm tin. Đọc `projects/en/fifty-percent/SCRIPT.md` (đã duyệt) và `CONTENT.md`. Người dùng sẽ SO 3 hướng rồi chọn một
(như pemdas: `projects/en/pemdas/styleframes-compare.jpg`), nên hai cảnh của bạn phải đẹp như khung thật của video.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: một trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`,
khung 0 khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/road.html`, `tools/lab/table.html`.
Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng
chữ, tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa.

**Khung 0 — mở bài.** "I have just flipped a coin… slapped it down on the back of my hand… What is the probability
that it landed heads?… that fifty percent is not describing the coin. The only thing still undecided… is you."
Mascot `assets/character-v2/cut/pose-coin-cover.png` (khung giữa đùi, nửa thân, một bên khung x ≤ 420 hoặc ≥ 1500,
cao ~700, chân chạm đáy khung). Hình phải NÓI được ý: đồng xu đã cố định, chỉ người xem là chưa biết; con số 50% gắn
với NGƯỜI XEM, không với đồng xu.

**Khung 1 — Act Four, đếm người.** 100 000 người → 100 bệnh (xét nghiệm bắt 99) + 99 900 khỏe (4 995 dương tính
nhầm) → 99 / 5 094 ≈ 2%. Tự chọn tỉ lệ chấm (vd. 1 chấm = 100 người) nhưng ghi rõ trên hình, và MỌI con số tính bằng
code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem poster.html). Kết quả hiện ra là số code trả về.

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond bản **LN** — số thẳng hàng).
  Ký tự lạ (≈ ✓ ✗ …) kiểm bằng fontTools `getBestCmap` hoặc vẽ tay.
- Không logo, không giao diện thật. Đỏ chỉ cho cái sai / cảnh báo nếu DNA của bạn dùng đỏ.
- Đầu file: một khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài),
  bảng màu (hex), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type tick pop snap whoosh whoosh-long shimmer impact
  error correct question beep pen page tear coin chip), các phần khác của bài sẽ trông thế nào (tần suất, cá cược,
  cán cân Bayes, 3 tiên đề, máy tung đồng xu).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
