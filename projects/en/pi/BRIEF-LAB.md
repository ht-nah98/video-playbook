# Brief: bàn thử phong cách (DNA) cho pi — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, "What Is Pi, Really?" — π không chỉ là chu vi/đường kính: π là
GIỚI HẠN (đa giác kẹp hình tròn), là đơn vị của SỰ QUAY (nửa vòng), vì sao chữ số không hết, và vì sao trên mặt cong
C/d ≠ π. Đọc `projects/en/pi/SCRIPT.md` (đã duyệt) và `projects/en/pi/CONTENT.md`. Người dùng sẽ SO 3 hướng rồi chọn một
(như `projects/en/fifty-percent/styleframes-compare.jpg`), nên hai khung của bạn phải đẹp như khung thật của video.

**Vật xuyên suốt** (docs/lesson/LESSON-VIDEO.md "Học từ video mẫu số Pi"): MỘT vòng tròn sống qua cả bài và biến hình
theo hồi (bị đa giác kẹp → kim quay nửa vòng → chuỗi số chạy quanh vành → vòng trên quả cầu / yên ngựa). Trong chất
liệu của bạn, vòng tròn đó LÀ gì (vẽ bằng gì, sáng/đậm ra sao)? Hai khung phải cho thấy cùng một vòng tròn.
KHÔNG chép phong cách đen trắng tối giản của video mẫu — mỗi bài một DNA riêng, có màu mang nghĩa.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: một trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`,
khung 0 khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/lantern.html`, `tools/lab/felt.html`.
Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng
chữ, tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa.

**Khung 0 — Hồi 1, kẹp hình tròn.** "Draw a polygon inside the circle… then a polygon outside, hugging the circle… At
ninety-six sides, he proved that pi lies between three point one four zero eight and three point one four two nine."
Hiện: vòng tròn kẹp giữa đa giác trong và ngoài (bạn chọn số cạnh dễ nhìn, vd. 12, kèm dấu hiệu đã đi tới 96), khoảng
kẹp `223/71 ≈ 3.1408 < π < 22/7 ≈ 3.1429`. Mascot `assets/character-v2/cut/pose-compass.png` (khung giữa đùi, nửa thân,
compa chĩa sang TRÁI → đặt nhân vật bên PHẢI, x ≥ 1500, cao ~700–780, chân chạm đáy khung).

**Khung 1 — Hồi 2, bóng của một vòng quay.** "Imagine a point running steadily around a circle, and look only at its
shadow… Trace it out over time, and you get a wave." + "Half a turn is pi." Hiện: điểm trên vòng tròn bán kính 1, cung
nửa vòng ghi π, bóng của điểm vẽ ra sóng sin theo thời gian. Mascot `pose-spin.png` — TOÀN THÂN, chỉ dùng phần trên
45% ảnh (cắt ngang hông, `crop = 0.45` như `templates/lesson/kit.js` `figure`), một bên khung (x ≤ 420), ngón trỏ chỉ
lên: vẽ thêm vệt vòng quay quanh đầu ngón bằng code.

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/poster.html` / `lantern.html`):
223/71, 22/7, chu vi đa giác n·sin(π/n) và n·tan(π/n), sin của bóng. Kết quả hiện ra là số code trả về.

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ được dùng một lần lúc nạp để làm sprite mờ sẵn).
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond bản **LN** — số thẳng hàng). Ký tự
  lạ (π ≈ < ½ ° √ …) kiểm bằng fontTools `getBestCmap` hoặc vẽ tay.
- Không logo, không giao diện thật. Đỏ (nếu DNA của bạn có) chỉ cho cái sai / cảnh báo.
- Đầu file: một khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài),
  vật xuyên suốt là gì, bảng màu (hex), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type tick pop snap whoosh
  whoosh-long shimmer impact error correct question beep pen page tear coin chip), các phần khác của bài sẽ trông thế
  nào (người xưa đo, Tổ Xung Chi / van Ceulen, 360° vs radian, chia 1 cho 7, Lambert / Lindemann, cầu phương hình
  tròn, quả cầu xích đạo C/d = 2, yên ngựa, hố đen, mục tóm tắt).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
