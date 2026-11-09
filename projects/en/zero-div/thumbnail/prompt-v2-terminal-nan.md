# zero-div — thumbnail prompt v2 「1/0 Infinity · 0/0 NaN」 (bản B cho A/B — máy tính CHIA ĐƯỢC)

Ngày 2026-10-27 · người dùng chọn hướng "máy tính chia được" cho Test & Compare. Ý KHÁC bản A: A = máy tính chịu thua
(ERROR, sáng, giấy); B = máy tính TRẢ LỜI (Infinity, NaN — tối, terminal trong lỗ giấy). Cùng thế giới video: hồi ba
camera lao vào LỖ trên trang giấy, trong lỗ là terminal (`plates/d2-computer.js`, khung 9:08). Che chữ: một lỗ thủng trên
giấy kẻ ô, bên trong là màn hình code tối → "trong lỗ có gì?".

Title đi cùng (đo bằng code): **`Your Computer CAN Divide by Zero. So Why Can't You?`** (51 ký tự, "divide by zero" ở ký tự
18, ngôi "you" — LESSONS §144). Dự phòng: `Computers Divide by Zero Every Day. Why Can't We?` (49) ·
`Why Your Computer Says 1 ÷ 0 = Infinity (Math Says No)`.
Thật với video: 8:46 "A positive number divided by zero gives Infinity", 0/0 → NaN; số nguyên (Python `7 // 0`) vẫn báo lỗi —
"CAN" đúng với số thập phân (IEEE 754), video nói rõ.

## Đính kèm
1. `<repo>/out/en/zero-div/youtube/thumb-tests/ref-frame-09m08.png` — khung terminal của video.
2. `<repo>/out/en/zero-div/youtube/thumb-tests/ref-frame-00m00.png` — giấy kẻ ô + lỗ (bìa giấy).
3. `<repo>/out/en/zero-div/youtube/thumb-tests/ref-stick-point.png` — người que khăn đỏ của kênh.

```
Create a YouTube thumbnail, 1280x720, 16:9, for an English mathematics education channel.

THE STORY IN ONE GLANCE: a sheet of cream graph paper has a huge torn hole in it, and inside the hole is a dark computer terminal that calmly prints answers to divisions by zero. A tiny stick figure leans over the edge of the hole and points at it, surprised.

Attached images: image 1 is a frame from the actual video — use it ONLY for the look of the terminal (near-black background #0E0F12, monospace text, off-white input lines, an amber/yellow result). Image 2 is the opening frame of the video — use it ONLY for the paper (cream graph paper #F2EEE3, pale blue grid #C9D6E3, faint red margin line, torn curled paper rim). Image 3 is the channel's stick figure — copy its exact design. Do NOT copy any layout, text or pose from the attached images.

THE PAPER AND THE HOLE (fills the frame): the whole image is a cream graph-paper page, warmly lit from the top-left. A big roughly round TORN HOLE is ripped through it, covering x=6–80%, y=8–92% of the image. The hole edge is a thick curled cream paper rim with torn fibres and a soft shadow falling inward, so it clearly looks like paper ripped open, not a drawn circle. Through the hole we see a dark terminal screen.

THE TERMINAL TEXT (inside the hole, left-aligned, VERY LARGE monospace, like IBM Plex Mono, two rows, together about 45% of the image area):
  Row 1:   > 1/0   Infinity
  Row 2:   > 0/0   NaN
"> 1/0" and "> 0/0" are off-white (#E8E4DA). "Infinity" is off-white too. "NaN" is the BIGGEST word in the image, bright amber-yellow (#F2C94C), with a soft warm glow. Each row is about 17% of the image height. A small blinking block cursor sits after NaN. Nothing else is written in the terminal.

THE STICK FIGURE (small, right side, x=80–94%, y=22–62%): the channel's stick figure from image 3 — thick dark navy (#22303C) rounded lines for body, arms and legs, a big round WHITE head with a thick navy outline, two small black oval dot eyes, and a RED scarf (#D9481E) around the neck with two tails flying behind. No mouth, no nose, no hair, no clothes. He stands on the paper at the right edge of the hole, leaning over it, one arm pointing at "NaN", eyes wide in surprise. He is about one third of the image height. Do not turn him into an anime character or give him a face beyond the two dot eyes.

THE TEXT: the ONLY text in the image is "> 1/0", "Infinity", "> 0/0", "NaN". No title, no other words, no labels.

LAYOUT CHECK: the bottom-right corner (last 22% of width, lowest 20% of height) is plain graph paper only — no text, no stick figure. All text at least 40 px from every edge.

STYLE: clean polished illustration, crisp paper texture, real torn-paper depth, the terminal glowing softly from inside the hole. NOT photo, NOT neon cyberpunk, no lens flare, no matrix rain.

CRITICAL CONSTRAINTS
- Exactly two terminal rows, spelled exactly: "> 1/0   Infinity" and "> 0/0   NaN" — "/" is a plain forward slash, "NaN" is capital N, small a, capital N
- "NaN" is the largest and brightest text
- The stick figure keeps his white round head, two dot eyes, red scarf, navy stick body — nothing else
- No watermark, no logo, no signature
```

Nếu chữ trong terminal ra sai: tạo lại với terminal TRỐNG, mình đặt chữ bằng PIL (IBM Plex Mono 500, màu như trên).

## Sau khi có ảnh
Gửi mình → `python3 tools/thumb/check.py <B> out/en/zero-div/youtube/thumbnail.jpg -o out/en/zero-div/youtube/thumb-tests/check-b.jpg`
(250 px, 50% TV, góc phải dưới) + gate.

## Gate (tự chấm trước khi giao)
A1 lỗ giấy + terminal + "1/0" nhận ra trong nửa giây · A3 có in "Infinity"/"NaN" — chấp nhận có chủ ý: NaN với đa số người
xem là một CÂU HỎI, và title hỏi tiếp "So why can't you?" · A4 thumbnail không chứa "divide", "zero", "computer" · A5 đúng
video (8:46–9:20) · B1 hai dòng chữ ≈ 35–45% · B3 2 dòng, 0 dòng phụ · C1/C4 không dùng cậu bé anime — biến số của A/B là
Ý + nhân vật kênh mới (người que khăn đỏ, xuyên suốt từ sau zero-div); thumbnail nhỏ mascot theo PACKAGING §3 · C5 cùng
thế giới (giấy + lỗ + terminal của hồi ba) · D2 góc phải dưới trống.
