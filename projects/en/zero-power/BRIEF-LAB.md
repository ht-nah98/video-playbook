# Brief: bàn thử phong cách (DNA) cho zero-power — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, "Why Is Anything to the Power of Zero One?". Ý trung tâm: **nhân 0 lần
không phải là "không có gì" — là CHƯA nhân, và phép nhân chưa bắt đầu thì đứng ở 1** (cộng khởi từ 0, nhân khởi từ 1).
Rồi ở 0⁰ hai quy luật đều hợp lý (hàng x⁰ toàn 1, cột 0ʸ toàn 0) giành nhau MỘT ô. Đọc `projects/en/zero-power/SCRIPT.md`
và `projects/en/zero-power/CONTENT.md`. Người dùng sẽ SO 3 hướng rồi chọn một (như `projects/en/neg-times-neg/styleframes-compare.jpg`),
nên hai khung của bạn phải đẹp như khung thật của video.

**Vật xuyên suốt:** **"số 1 khởi động" của phép nhân** — thứ đứng sẵn trước khi nhân lần nào. Nó là đáy cầu thang ở
hồi 1, là cái còn lại khi rút hết thừa số ở hồi 2, là "1 cách điền 0 ô" ở hồi 4, và là MỘT trong hai ứng viên giành ô
0⁰ ở hồi 3/5 (ứng viên kia là 0). Trong chất liệu của bạn, "số 1 khởi động" LÀ vật gì, và ô 0⁰ bị giành trông ra sao?
Hai khung phải cho thấy cùng một vật.
Màu mang nghĩa: "1" (khởi động / đúng) một màu cố định, "0" một màu cố định khác, ô tranh chấp 0⁰ một dấu hiệu riêng;
"sai" (chữ bị gạch) một dấu hiệu KHÁC cả ba. Không lặp DNA các bài trước: chất liệu theo thời đại (math-30k), trang
giấy + bút chấm (zero-div), con đường (pemdas), đèn trong đêm (fifty-percent), bàn dựng hình compa (pi), gạch đại số
trên thảm cắt (neg-times-neg).

## Hướng của bạn (đạo diễn giao — ghi trong lời giao việc)
- **lcd — màn hình máy tính cầm tay.** Cả video sống trong kính LCD xám-xanh: chữ số 7 đoạn (vẽ bằng code, đoạn tắt
  hiện mờ), điểm ảnh ma trận cho chữ, phím bấm nhựa. "Số 1 khởi động" = thanh ghi phép nhân reset về `1` (chỉ báo nhỏ
  "×" sáng) trước khi bấm phím nào; ô 0⁰ = màn hình nhấp nháy giữa `1` và `0`, hoặc `E`. Hợp móc mở bài (máy cãi nhau)
  và tư thế mới `pose-calculator`.
- **press — bảng tra in chì.** Bảng lũy thừa in typo trên giấy ngà như sách bảng tra thế kỷ 19 (Cauchy 1821): hộc chữ
  chì (type case) làm ô, hai mực đỏ–đen, số kiểu Cormorant LN. "Số 1 khởi động" = con chữ chì `1` đặt sẵn trong khuôn
  in; đếm cách điền ô = các hộc type case; ô 0⁰ = một ô in chồng hai con chữ (lệch đăng ký mực).
- **fold — tờ giấy gấp đôi.** Một tờ giấy thật (bóng đổ, nếp gấp): mỗi lần gấp số lớp ×2 (2ⁿ lớp), mở ra từng nếp là
  chia 2 — cầu thang hồi 1 thành chồng lớp mỏng dần; 0 nếp gấp = tờ giấy nguyên = 1. "Số 1 khởi động" = tờ giấy
  chưa gấp. Ô 0⁰ = hai tờ (một tờ nguyên "1", một khoảng trống "0") chồng lên cùng một ô của bảng kẻ.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: một trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`,
khung 0 khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/tiles.html`, `tools/lab/drafting.html`.
Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng
chữ, tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa.

**Khung 0 — Hồi 2, "Multiplying zero times".** "Two cubed is really one, times two, times two, times two. Take the twos
away, one at a time, and you are left with the starting point. One. Multiplying zero times isn't nothing. It's not
having done anything yet, and for multiplication, that place is one."
Hiện: 2³ = 1 × 2 × 2 × 2 = 8 → 2² = 1 × 2 × 2 = 4 → 2¹ = 1 × 2 = 2 → **2⁰ = 1** (các số 2 đã rút đi, "1" khởi động còn
lại, nổi bật bằng VẬT XUYÊN SUỐT). Bên cạnh nhỏ: cộng khởi từ 0 / nhân khởi từ 1 ("empty sum = 0 · empty product = 1").
Mascot `assets/character-v2/cut/pose-notebook.png` (khung giữa đùi) một bên khung (x ≥ 1500 hoặc ≤ 420), cao ~700–780,
đáy ảnh chạm đáy khung.

**Khung 1 — Hồi 3, "Two patterns, one square".** "Picture a table of x to the power of y. Along the row where the
exponent is zero, every answer is one… Down the column where the base is zero, every answer is zero… Both lines run
into the same square. Zero to the zero. One pattern says one. The other says zero."
Hiện: bảng xʸ (x = 0, ½, 2, 5 hoặc tương tự; y = 0, 1, 2, 3): hàng y = 0 toàn 1, cột x = 0 toàn 0 (y ≥ 1), các ô khác
có giá trị (mờ hơn), **ô (0, 0) bị hai bên giành** — "1?" và "0?" với dấu hiệu tranh chấp của DNA. Mascot
`pose-twoways.png` (khung giữa đùi — một tay lên, một tay xuống) một bên khung, cao ~700–780.

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/tiles.html`): 2³ = 8, 2² = 4,
2¹ = 2, các ô bảng = `x ** y` của JS (trừ ô (0,0) — vẽ tranh chấp, KHÔNG in 1 của JS như đáp án).

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ một lần lúc nạp để làm sprite mờ sẵn).
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond bản **LN** — số thẳng hàng). Số mũ
  (², ³, ⁰, ʸ, ˣ, ᵐ, ⁿ): KIỂM bằng fontTools `getBestCmap` cho đúng font bạn dùng — thiếu thì vẽ số mũ bằng chữ nhỏ
  nâng lên (nên làm vậy cho mọi số mũ để đồng nhất). × và ½ cũng kiểm. Chữ số 7 đoạn (lcd) vẽ tay bằng path.
- Không logo, không giao diện thật (không Casio/TI/Excel; máy tính là máy chung chung).
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu hợp bài), vật xuyên
  suốt là gì, bảng màu (hex, nghĩa từng màu), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type tick pop snap whoosh
  whoosh-long shimmer impact error correct question beep pen page tear coin chip), các phần khác sẽ trông thế nào
  (máy cãi nhau ở mở bài, cầu thang 16→1 và 1000→1, luật aᵐ·aⁿ, x·x = x chỉ còn 0 hoặc 1, đếm cách điền ô, nhị thức
  Newton / đa thức / eˣ, Knuth 1992, hai đường tới góc (0,0) + đường xʸ = 2, xˣ → 1, Cauchy 1821 / Libri 1833 / Möbius,
  tóm tắt, lần sau 0! = 1).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
