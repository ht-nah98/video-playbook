# Brief: bàn thử phong cách (DNA) cho trig — mỗi agent MỘT hướng

Video bài học kênh Anh **99% from scratch**, lời đọc tiếng Anh, "Sine Was Never About Triangles" (~13 phút). Đọc
`projects/en/trig/SCRIPT.md` (ĐÃ DUYỆT — lời đọc trước `---`, gói đăng + bảng "what the viewer SEES" sau `---`) và
`projects/en/trig/CONTENT.md` (số đã kiểm). Mạch: máy tính trả lời sin 120° = 0.866 dù không tam giác vuông nào có góc
120° → đo cái không chạm được (núi, thuyền, Mặt Trăng), Hipparchus → tam giác đồng dạng ⇒ mỗi góc một số (sin), chữ
"sine" = dây cung (jya) → tam giác kẹt dưới 90° → đường tròn đơn vị: x = cos, y = sin; 120° → 0.866, −30° → −0.5,
1000° → −0.985 → radian (góc = quãng đường) → điểm chạy đều, nhìn nghiêng = sóng sin (con lắc, dây đàn, ổ điện) →
sin² + cos² = 1 là đường tròn → Fourier (nhạc nén, MRI, sóng di động).

Gói đăng (PACKAGING §0b): thumbnail = **một máy tính bỏ túi hiện `sin 120° = 0.866` cạnh một tam giác vuông bị kéo gãy**,
chữ 「HOW?」, nền SÁNG ấm; mascot nhỏ góc dưới trái → khung 0–5 s phải là thế giới đó. Video cũ của kênh Anh đã dùng:
math-30k, zero-div, pemdas (đường), fifty-percent, pi, neg-times-neg (gạch men), zero-power (LCD), intuition (gameshow),
solid-geometry (shadowbox giấy gấp + đèn treo), sudoku (kính màu) — bài này PHẢI KHÁC (đặc biệt: không LCD xanh kiểu
zero-power, không giấy gấp + đèn treo kiểu solid-geometry).

**Máy tính** trong video là máy TỰ THIẾT KẾ theo chất liệu của bạn (không logo / tên hãng thật, không chép Casio / TI).

**Vật xuyên suốt** — bạn chọn trong chất liệu của mình, nhưng nó phải làm được: (1) vẽ đường tròn, (2) là "dây cung"
căng ngang một cung tròn (chữ jya = dây cung), (3) chạy quanh vòng tròn như một điểm, (4) duỗi thành sóng khi nhìn
nghiêng, (5) rung như dây đàn ở ACT SIX.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0
khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/capsule.html` (gần nhất), `tools/lab/sangaku.html`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác (ô đậu phụ: °, −, π, ², √), khoảng trống vô nghĩa.

**Khung 0 — Cold open 0–5 s (= thế giới thumbnail).** Lời: "Type sine of one hundred and twenty degrees into any
calculator, and it answers instantly: zero point eight six six. But no right triangle has a one-hundred-and-twenty-degree
angle." Hiện: một máy tính lớn (thiết kế của bạn), màn hình `sin(120°)` / `0.866` sáng; bên cạnh một tam giác vuông bị
kéo mở góc tới 120° và GÃY ở góc vuông (xám, lạnh) — tương phản MÀU: con số ấm sáng ↔ tam giác lạnh xỉn. Mascot nhỏ
(≤ ~25% chiều cao khung, mép trái dưới, không che hai vật): `assets/character-v2/cut/pose-ponder.png` (hoặc
`pose-calculator.png` nếu có — xem `assets/character-v2/POSES.md`).

**Khung 1 — ACT FOUR/SIX "Every angle has an answer → the wave".** Hiện: đường tròn đơn vị lớn bên trái, trục x / y,
điểm ở 120°, cung góc 120° có nhãn, thanh dọc từ điểm xuống trục sáng lên với nhãn `sin 120° = 0.866`, đoạn ngang
`cos 120° = −0.5`; bên phải sóng sin được "duỗi" ra từ độ cao của điểm (vạch nối ngang từ điểm sang sóng), trục ngang
đánh dấu `π/2 π 3π/2 2π` (hoặc 90° … 360°). Mascot `pose-pointer.png` nhỏ chỉ vào điểm, một bên khung.

MỌI con số tính bằng code và `must(biểu thức, giá trị)` (xem `tools/lab/sangaku.html`): sin 120° = 0.866,
cos 120° = −0.5, toạ độ điểm = (cos θ, sin θ), sóng = sin(x).

## Chữ
- Font có sẵn ở `assets/fonts/` — chọn hợp chất liệu, kiểm cmap (fontTools `getBestCmap`) cho ° − π ² √ θ.
- Chữ ≥ 28 px, số ≥ 30 px; mỗi khung ≤ 3 cụm chữ lớn.

## Tiếng hiệu ứng
Thư viện `assets/sfx/library.json`. Đề xuất bảng tiếng cho chất liệu của bạn (phím bấm, tam giác gãy, điểm chạy, sóng
duỗi, dây rung) — tiếng mới chỉ đề xuất, chưa tải.

## Luật chung (docs/CRAFT.md §5)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` (`engine/lib.js`). Promise.all mọi font trước vẽ.
- Nền SÁNG hơn tối (thumbnail nên sáng).
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài), vật
  xuyên suốt + 5 vai của nó, bảng màu (hex, một màu = một nghĩa: sin, cos, góc, "sai"/tam giác hỏng, trung tính), chữ,
  bảng tiếng, các phần khác sẽ trông thế nào (núi / thuyền / Mặt Trăng, Hipparchus + ảnh thật trong khung, họ tam
  giác 30°, chữ jya → sinus, radian = cung, sóng + con lắc / dây đàn / ổ điện, sin²+cos²=1, Fourier cộng sóng). Video
  dùng ảnh thật (chân dung Fourier, trang Almagest, bảng đất sét Babylon) — chất liệu phải có "khung ảnh" hợp.
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
