# Brief: bàn thử phong cách (DNA) cho logarithm — mỗi agent MỘT hướng

Video bài học kênh Anh **99% from scratch**, lời đọc tiếng Anh, "One Number Tells You When Your Money Doubles" (~9 phút).
Đọc `projects/en/logarithm/SCRIPT.md` (ĐÃ DUYỆT — lời trước `---`, gói đăng + bảng "what the viewer SEES" sau `---`) và
`projects/en/logarithm/CONTENT.md` (số đã kiểm). Mạch: $1,000 ở 8% gấp đôi sau 9 năm (thật: 9 năm 2 ngày), 72 ÷ lãi →
logarit = phép luỹ thừa hỏi ngược (viên gạch: log₂ 8 = 3) → log₁₀ đếm số 0; kiến ↔ cá voi xanh chỉ cách ~11 bậc ×10 →
log(tích) = tổng log (8 × 4: 3 + 2 = 5 viên), Napier 1614, Briggs, bảng + thước trượt → thang logarit: động đất (×32
năng lượng), decibel, pH (chanh 2 vs nước 7), giác quan → e (Bernoulli 1683, lãi 100% chia nhỏ → 2.718), ln 2 = 0.693
→ 69.3/r, lãi năm đẩy lên 72.

Gói đăng (PACKAGING §0b): thumbnail = **chồng xu → chồng cao gấp đôi, ×2, số 「72」 rất to**, nền SÁNG; mascot nhỏ góc
dưới trái → khung 0–5 s phải là thế giới đó. Video cũ kênh Anh: math-30k, zero-div, pemdas (đường), fifty-percent (nỉ),
pi, neg-times-neg (gạch men), zero-power (LCD), intuition (gameshow), solid-geometry (giấy gấp + đèn treo), sudoku (kính
màu), trig (hội chợ đu quay pastel) — bài này PHẢI KHÁC.

**Vật xuyên suốt** — trong chất liệu của bạn, nó phải làm được: (1) là "viên gạch" của phép nhân lặp (2·2·2 → 8, gộp
3 + 2 viên = 5), (2) xếp thành thước bậc ×10 (1, 10, 100 … 10¹¹) để kiến và cá voi đứng cùng một thước, (3) là tiền /
tăng trưởng (chồng xu gấp đôi, lãi chia nhỏ → e), (4) đếm bậc cho động đất / decibel / pH.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0 khi
t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước): `tools/lab/ferris.html` (gần nhất), `tools/lab/capsule.html`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read .png), sửa tới khi không còn: chữ chạm mép / đè nhân vật / chồng chữ, tương phản
thấp, ô đậu phụ (₂ ¹¹ × ÷ ≈ − $ %), khoảng trống vô nghĩa.

**Khung 0 — Cold open 0–5 s (= thế giới thumbnail).** Lời: "Put a thousand dollars in an account that pays eight
percent a year. How long until it doubles? Ask a banker… nine years." Hiện: một chồng xu (hoặc vật tiền của chất liệu
bạn) nhãn `$1,000` + thẻ `8%`, bên cạnh chồng cao gấp đôi (`$2,000`, ×2) và bộ đếm năm `9 YEARS`; số 「72」 lớn, ấm sáng
(đây là vật của thumbnail). Tương phản MÀU: tiền ấm ↔ nền mát. Mascot nhỏ (≤ ~25% chiều cao, mép trái dưới):
`assets/character-v2/cut/pose-calculator.png` hoặc `pose-ponder.png`.

**Khung 1 — ACT TWO "An ant and a whale".** Hiện: một thước logarit nằm ngang, vạch 10⁰ … 10¹¹ (gam → hoặc mg … tấn, nhãn
rõ), con kiến ở đầu thấp (`3 mg`), cá voi xanh ở đầu cao (`150 t`), giữa có vài vật mốc (vd. chuột, người, voi — chỉ
nếu cân nặng nằm trong CONTENT hoặc ghi rõ "≈"), dấu ngoặc `≈ 11 STEPS OF ×10`. Mascot `pose-pointer.png` nhỏ một bên.
Vật xuyên suốt của bạn phải là các bậc của thước.

MỌI con số tính bằng code và `must(biểu thức, giá trị)` (mẫu: `tools/lab/ferris.html`): 72/8 = 9, ln2/ln1.08 = 9.006,
log₁₀(1.5e11 mg / 3 mg) = 10.7… (dùng đúng số CONTENT).

## Chữ
Font `assets/fonts/` (Archivo, Cormorant Garamond, IBM Plex Mono, Noto Sans JP, Shippori) — kiểm cmap ký tự lạ
(₂ ¹ × ÷ ≈ − θ). Chữ ≥ 28 px, số ≥ 30 px; mỗi khung ≤ 3 cụm chữ lớn.

## Luật chung (docs/CRAFT.md §5)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)`. Promise.all mọi font trước vẽ. **Không `shadowBlur`
  / `ctx.filter` trong render** (LESSONS §127) — bóng = sprite vẽ sẵn hoặc gradient (xem `projects/en/trig/kit.js` shade/glow).
- Nền SÁNG hơn tối.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm, vật xuyên suốt + 4 vai, bảng màu (hex, một
  màu = một nghĩa: tiền/tăng trưởng, cơ số/viên gạch, logarit/số bậc, "sai", trung tính), chữ, bảng tiếng (thư viện
  `assets/sfx/library.json`; tiếng mới chỉ đề xuất), các phần khác trông thế nào (viên gạch 2·2·2, thước ×10, Napier +
  bảng log + thước trượt ảnh thật, động đất / decibel / pH, tạ 10 kg vs 100 kg, lãi chia nhỏ → e, 69.3 → 72). Video dùng
  ảnh thật (chân dung Napier, trang 1614, bảng log, thước trượt, băng địa chấn) — chất liệu phải có "khung ảnh" hợp.
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent,
  không `pkill -f`.

## Báo cáo (≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
