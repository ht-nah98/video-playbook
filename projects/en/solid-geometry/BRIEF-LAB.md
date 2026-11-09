# Brief: bàn thử phong cách (DNA) cho solid-geometry — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, **"Solid Geometry from Scratch"**, ~19 phút, 10 hồi: điểm/đường/mặt
phẳng và 4 tiên đề → vị trí tương đối (chéo nhau) → song song → vuông góc (định lý ba đường vuông góc) → góc →
khoảng cách → khối đa diện (5 khối Platon) → thể tích (⅓ của chóp) → khối tròn xoay (Archimedes) → gói lại. Đọc
`projects/en/solid-geometry/SCRIPT.md` (đã duyệt) và `projects/en/solid-geometry/CONTENT.md`. Người dùng sẽ SO 3 hướng rồi
chọn một (như `projects/en/fifty-percent/styleframes-compare.jpg`), nên hai khung của bạn phải đẹp như khung thật của video.

**Công nghệ đã chốt (người dùng 2026-10-09): canvas 2D + hình 3D CHIẾU.** Bạn tự viết phép chiếu trong trang:
- điểm 3D → camera (yaw, pitch, khoảng cách) → phối cảnh nhẹ (FOV ~30–35°, gần như sách giáo khoa);
- mặt đa giác vẽ theo thứ tự xa→gần (painter), có tô mặt theo pháp tuyến;
- cạnh khuất: nét đứt (quy ước hình học không gian);
- mặt phẳng: hình bình hành trong suốt.
- **Chữ và nhãn LUÔN PHẲNG, hướng thẳng màn hình, đủ to để đọc** (LESSONS §77: 3D làm chữ nghiêng/nhỏ là kém rõ). Nhãn
  điểm (A, B, P…) đặt cạnh điểm đã chiếu, không đè nét.
- Hình phải đọc được ở khung đứng yên: chọn góc nhìn sao cho không có cạnh trùng nhau / điểm trùng nhau.

**Ý trung tâm (đề xuất của CONTENT, bạn diễn đạt bằng chất liệu của mình):** *mọi bài toán không gian kết thúc trên một
tam giác phẳng*, và **cái bóng (hình chiếu)** là cách đưa không gian về mặt phẳng. **Vật xuyên suốt:** căn phòng của
người xem (một hình hộp: góc tường–trần, cạnh chéo nhau, trần 3 m, đường chéo Pythagoras, xếp khối đơn vị). Trong chất
liệu của bạn, "cái bóng" và "căn phòng" trông ra sao? Ghi ở khối DNA tóm tắt; khung 0 phải cho thấy cái bóng.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: một trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`,
khung 0 khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/lantern.html`,
`tools/lab/tiles.html`. Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng
chữ, tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa, hình 3D đọc sai (cạnh khuất vẽ liền, mặt tô sai
thứ tự, nhãn lệch khỏi điểm).

**Khung 0 — Hồi 4, định lý ba đường vuông góc.** "Take a line a lying in plane P. And take a line b that isn't in P…
Shine a light straight down onto P, and line b casts a shadow… a is perpendicular to b, exactly when a is perpendicular
to b's shadow." Hiện: mặt phẳng P (nhãn P), đường a nằm trong P, đường b xiên xuyên qua P tại một điểm, **ánh sáng chiếu
thẳng xuống** và **bóng b′ của b** nằm trên P, dấu góc vuông giữa a và b′, và (cùng lúc) dấu góc vuông a ⊥ b. Một dòng
chữ ngắn tóm định lý (vd. `a ⊥ b′  ⇔  a ⊥ b`). Mascot `assets/character-v2/cut/pose-point.png` — TOÀN THÂN, chỉ dùng
phần trên 45% ảnh (`crop = 0.45` như `templates/lesson/kit.js` `figure`), MỞ ẢNH XEM tay chỉ hướng nào rồi đặt bên đối
diện để tay chỉ vào hình; chân cắt ngang đáy khung.
**Toán phải đúng bằng code:** dựng toạ độ thật (P là z = 0, a dọc trục x, b đi qua điểm O trên a, hướng b = (0, cosα,
sinα)…), `must()` tích vô hướng a·b′ = 0 và a·b = 0. Bóng b′ = chiếu b lên z = 0.

**Khung 1 — Hồi 7, "only five".** "In space, there are only five regular polyhedra… The tetrahedron, the cube, the
octahedron, the dodecahedron with twelve faces, and the icosahedron with twenty." Hiện: **năm khối Platon** dựng từ toạ
độ thật (đỉnh chuẩn: tứ diện từ 4 đỉnh xen kẽ của lập phương; bát diện (±1,0,0)…; 12 mặt và 20 mặt dùng tỉ số vàng
φ), xếp hàng hoặc vòng cung, mỗi khối một nhãn tên + số mặt. Mascot `pose-icosa.png` (khung giữa đùi, CROP 1, tay phải
giơ khối 20 mặt xanh lam ở góc TRÊN-TRÁI ảnh cắt → đặt nhân vật bên PHẢI khung, x ≥ 1450, cao ~720–800, chân chạm
đáy). Khối 20 mặt bạn vẽ nên **hô ứng** với khối mascot đang cầm (màu hoặc vị trí).
**Toán phải đúng bằng code:** đếm (V, E, F) từ chính lưới bạn dựng và `must` V − E + F = 2 cho cả năm; mọi cạnh của
một khối dài bằng nhau (sai số 1e-9).

MỌI con số hiện ra là số code trả về (`must(biểu thức, giá trị)` ném lỗi nếu sai — xem `tools/lab/poster.html`).

## Luật chung (docs/CRAFT.md §5, docs/lesson/LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ được dùng một lần lúc nạp để làm sprite mờ sẵn).
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond bản **LN**…). Ký tự lạ
  (⊥ ′ ⇔ ∥ φ …) KIỂM bằng fontTools `getBestCmap` — thiếu thì vẽ tay (dấu ⊥ là hai nét).
- Không logo, không giao diện thật. Đỏ (nếu DNA của bạn có) chỉ cho cái sai / cảnh báo.
- Đầu file: một khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài),
  "cái bóng" và "căn phòng" trong chất liệu này, bảng màu (hex), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type
  tick pop snap whoosh whoosh-long shimmer impact error correct question beep pen page tear coin chip card flap door),
  các phần khác của bài sẽ trông thế nào (ghế ba chân, cầu vượt, cuốn sách mở, thang dựa tường, xếp khối đơn vị vào
  hộp, lăng trụ cắt thành 3 chóp, bóc nhãn lon, Archimedes cầu trong trụ, mục tóm tắt).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.

## Ba hướng (mỗi agent một)

- **`shadowbox`: Giấy và đèn.** Nền giấy ấm (kem / giấy vẽ), khối là **giấy gấp** (origami / bìa cắt) có cạnh gấp
  sáng tối. Một **ngọn đèn** cố định trên cao đổ **bóng thật** xuống mặt giấy. Cái bóng chính là hình chiếu, nên ý
  trung tâm hiện ra bằng chất liệu. Màu nhấn: mực xanh đậm cho nét, một màu ấm (cam đất) cho "cái bóng / tam giác cần
  tìm".
- **`pinboard`: Ghim, chỉ, kính.** Bộ đồ nghề hình học vật lý: **điểm là đầu ghim**, **đường là sợi chỉ căng** (có độ
  dày, ánh sáng), **mặt phẳng là tấm kính / acrylic** trong có mép sáng, khối là **khung que gỗ** (cạnh khuất = que
  mờ phía sau kính). Nền: tấm bần hoặc bàn gỗ sáng nhìn từ trên. Căn phòng = mô hình kiến trúc bìa trắng cắt mặt.
  Màu nhấn: chỉ đỏ son cho đường đang xét (nhớ: đỏ chỉ cho cái sai → dùng màu khác cho "đường đang xét", vd. chàm/
  xanh cobalt; đỏ để dành cho cặp cạnh "careful").
- **`nightlab`: Bàn ánh sáng tối.** Nền tối xanh mực (gần không khí intro 3D mới của kênh, `projects/en/intro/DNA.md`),
  khối là **nét sáng phát quang** (wireframe neon mảnh + mặt kính mờ), mặt phẳng là **lưới sáng mờ**, **chùm sáng
  chiếu xuống** làm bóng sáng trên lưới. Màu nhấn: cam `#FF6A2B` của kênh cho "cái bóng / tam giác cần tìm", xương
  `#EEE9DF` cho chữ. Phải đọc rõ: nét ≥ 3 px, nhãn to, không sương mù làm giảm tương phản.
