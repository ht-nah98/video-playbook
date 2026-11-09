# Brief: bàn thử phong cách (DNA) cho calculus — mỗi agent MỘT hướng

Video bài học kênh Anh **99% from scratch**, lời đọc tiếng Anh, "The Impossible Question That Created Calculus" (~11 phút).
Đọc `projects/en/calculus/SCRIPT.md` (lời trước `---`, gói đăng + bảng "what the viewer SEES" sau `---`) và
`projects/en/calculus/CONTENT.md` (số đã kiểm). Mạch: con dốc — độ dốc tại ĐÚNG chỗ bàn chân? rise/run cần 2 điểm, 1 điểm
→ 0 ÷ 0 → y = x² tại x = 1: cát tuyến tới x = 2 dốc 3 (trung bình) → trượt lại gần 2.5, 2.1, 2.01, 2.001 → cát tuyến
xoay, dừng ở TIẾP TUYẾN (cây thước áp vào thành ngoài chiếc chén), dốc đúng bằng 2 → giới hạn: (x² − 25)/(x − 5), 4.9 →
9.9 … → 10, đường thẳng THỦNG một lỗ tại (5, 10) → đạo hàm: dốc = 2 + h → 2; mọi x: 2x; đồng hồ tốc độ; Newton, Leibniz
1684 → tích phân: diện tích dưới chén từ 0 tới 1, 4 dải (trên 0.47 / dưới 0.22), 10/100/1000 dải, khe = 1/n → ⅓;
Archimedes → hai mặt một đồng xu: diện tích lớn lên với tốc độ = chiều cao đường cong; đồng hồ tốc độ ↔ công-tơ-mét.

Gói đăng (PACKAGING §0b): thumbnail = **chén / con dốc với MỘT điểm sáng, cây thước (tiếp tuyến) áp vào điểm đó, quạt
cát tuyến mờ khép lại, chữ 「0 ÷ 0 = 2?」**, nền SÁNG; mascot nhỏ góc dưới trái nhìn lên dốc → khung 0–5 s phải là thế
giới đó. Video cũ kênh Anh: math-30k (vạch qua thời đại), zero-div (giấy có lỗ), pemdas (đường), fifty-percent (đèn đêm),
pi (bàn dựng hình), neg-times-neg (gạch men), zero-power (LCD), intuition (gameshow), solid-geometry (giấy gấp + đèn),
sudoku (kính màu), trig (hội chợ đu quay pastel), logarithm (khối gỗ đồ chơi) — bài này PHẢI KHÁC. MV add-it-up (tích
phân) đã dùng xưởng in riso — tránh.

**Vật xuyên suốt** — trong chất liệu của bạn, nó phải làm được: (1) là CON DỐC / CHIẾC CHÉN y = x² có người đứng trên đó,
(2) có một THƯỚC thẳng áp vào đúng một điểm (tiếp tuyến) và các đường cắt qua hai điểm (cát tuyến) xoay quanh điểm đó,
(3) đường thẳng THỦNG một lỗ (giới hạn), (4) cắt được thành DẢI MỎNG xếp dưới đường cong (tích phân), (5) đồng hồ tốc độ +
công-tơ-mét ở hồi cuối.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0 khi
t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước): `tools/lab/blocks.html` (gần nhất), `tools/lab/ferris.html`.
Bóng: import `engine/shade.js` (`shadowRR`, `shade`, `glow` — sprite tất định), KHÔNG `shadowBlur` / `ctx.filter`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read .png), sửa tới khi không còn: chữ chạm mép / đè nhân vật / chồng chữ, tương phản
thấp, ô đậu phụ (² ÷ ≈ − ⅓ → h), khoảng trống vô nghĩa.

**Khung 0 — Cold open 0–5 s (= thế giới thumbnail).** Lời: "How steep is a hill, at the exact spot where your foot is
standing? … rise over run … zero divided by zero …" Hiện: con dốc / chén y = x² (nửa phải), MỘT điểm sáng ấm tại (1, 1)
dưới chân người đi (mascot nhỏ ≤ ~25% chiều cao, mép trái dưới — `assets/character-v2/cut/pose-ponder.png` hoặc
`pose-sky.png`), cây thước (tiếp tuyến y = 2x − 1) áp vào điểm đó, 3–4 cát tuyến mờ (tới x = 2, 1.5, 1.1) khép về thước,
chữ lớn `0 ÷ 0 = 2?` (vật của thumbnail). Tương phản MÀU: điểm + thước ấm ↔ nền mát.

**Khung 1 — ACT FIVE "Four strips" / "Thinner".** Hiện: trục, chén y = x² từ 0 tới 1 (phóng to), diện tích dưới chén
chia 4 dải: hình chữ nhật chạm cong ở mép PHẢI (tổng trên, phần thò lên trên cong tô màu "thừa") — nhãn `≈ 0.47`; đường
viền dải mép TRÁI (tổng dưới) `≈ 0.22`; một thanh nhỏ bên cạnh cho thấy 10 / 100 dải ép vào `⅓`. Mascot `pose-pointer.png`
nhỏ một bên. Vật xuyên suốt của bạn phải là các dải.

MỌI con số tính bằng code và `must(biểu thức, giá trị)` (mẫu: `tools/lab/blocks.html`): (2² − 1)/(2 − 1) = 3, tổng trên
n = 4 = 0.46875, tổng dưới = 0.21875, khe = 1/n, ∫ = 1/3 (dùng đúng số CONTENT).

## Chữ
Font `assets/fonts/` (Archivo, Cormorant Garamond, IBM Plex Mono, Noto Sans JP, Shippori) — kiểm cmap ký tự lạ
(² ÷ ≈ − ⅓ ′). Biến x, h, y in nghiêng (serif) và KHÔNG viết hoa (hàm nhãn của kit cũ viết hoa — đừng dùng cho công thức).
Chữ ≥ 28 px, số ≥ 30 px; mỗi khung ≤ 3 cụm chữ lớn.

## Luật chung (docs/CRAFT.md §5)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)`. Promise.all mọi font trước vẽ.
- Nền SÁNG hơn tối.
- Đường cong và thước phải ĐÚNG toán (toạ độ thật của y = x², tiếp tuyến y = 2x − 1 chạm đúng một điểm) — hình toán sai là lỗi BLOCKER.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm, vật xuyên suốt + 5 vai, bảng màu (hex, một
  màu = một nghĩa: điểm đang hỏi / tiếp tuyến, cát tuyến, đường cong, diện tích / dải, phần thừa "sai", trung tính), chữ,
  bảng tiếng (thư viện `assets/sfx/library.json`; tiếng mới chỉ đề xuất), các phần khác trông thế nào (cát tuyến xoay,
  bảng số 3 → 2.001, lỗ ở (5, 10), 2 + h, đồng hồ tốc độ, Newton / Leibniz / trang 1684 / Archimedes ảnh thật — chất liệu
  phải có "khung ảnh" hợp, dải mỏng → ⅓, công-tơ-mét).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent,
  không `pkill -f` / `killall`.

## Báo cáo (≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
