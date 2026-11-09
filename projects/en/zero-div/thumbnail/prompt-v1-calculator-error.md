# zero-div — thumbnail prompt v1 「1 ÷ 0 = ERROR」 (máy tính bỏ túi + lỗ thủng ở số 0)

Ngày 2026-10-22 · bản 2 (`REVISION.md`, người dùng duyệt). Loại "LẠ" ("máy tính cũng chịu thua?"). Che chữ: máy tính màn
hình đỏ báo lỗi + một LỖ THỦNG đen trên trang giấy kẻ ô ngay ở số 0 của trục số → "sao chỗ đó lại thủng?". Title A
"Why Can't You Divide by Zero? It's Not Just a Rule" · B "Every Division Has an Answer Except One. Why?" — thumbnail
không chứa "divide", "zero", "rule" (chỉ có màn hình 1 ÷ 0 / ERROR). Thế giới = khung 0.5 s của video (DNA "the hole in the
page": giấy kẻ ô kem, mực navy, đỏ bút chấm bài).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/en/zero-div/youtube/thumb-tests/ref-frame-00m00.png` — khung 0.5 s của video: lấy GIẤY KẺ Ô, MÁY TÍNH, TRỤC SỐ có LỖ.

```
Create a YouTube thumbnail, 1280x720, 16:9, for an English mathematics education channel.

SIZE RULE FIRST: the boy is SMALL — no taller than the calculator's keypad, about one fifth of the image height, in the bottom-left corner, cut off at the chest. The calculator and the hole are the heroes.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — keep its world: a sheet of cream graph paper with pale blue grid lines and a faint red margin line, a dark navy pocket calculator, and a hand-drawn number line with a real torn HOLE where the 0 should be. Repaint it as a richer, more polished illustration.

THE STORY IN ONE GLANCE: a calculator refuses one division and shows a red ERROR, and right below it the paper itself has a hole punched through at zero.

CHARACTER — match the attached reference image exactly
Polished anime illustration of a teenage boy, soft cel shading, clean thin dark line art.

HIS FACE — this is the channel's identity, reproduce it precisely:
- EYES: large anime eyes whose UPPER LID IS DRAWN AS A HEAVY, ALMOST STRAIGHT
  HORIZONTAL LINE cutting across well over half of the eye, so he looks permanently
  half-closed, unimpressed and a little tired. Beneath that lid line sits a clean
  white sclera and a small dark iris with a single tiny highlight. The lid line is
  the strongest line on the face and is drawn slightly thicker than the other
  outlines. A soft dark lash line follows the upper lid and turns down a little at
  the outer corner.
- The eyes are NEVER fully open, NEVER circular, NEVER large sparkling shoujo eyes
  with multiple highlights. The heavy flat upper lid is always present. If in doubt,
  draw the lid lower.
- No visible eyebrows — the hair falls over the brow and hides it completely.
- A small simple nose indicated with a minimal line, a small mouth, soft rounded
  cheeks, a delicate pointed chin.
- Skin: warm pale peach with soft cel shading under the chin, under the fringe and
  along the jaw. A gentle warm blush across the nose and cheeks.

GLASSES: thin round wire-frame glasses. The heavy flat lid line stays clearly
visible through the lenses; no glare or white reflection covering the eyes.

HAIR: thick, voluminous, messy dark brown-black anime hair in large layered spikes
that fall over the forehead and past the ears, with a few strands standing up at the
crown. It is shaded in three tones — a near-black base, a warm brown midtone, and a
bright COOL BLUE rim light along the top and outer edges where the light catches it.
A warm golden-orange light also touches the very top of the head. This blue-and-gold
rimmed hair is a signature of the style; do not draw the hair as a flat single colour.

OUTFIT: an open WHITE LAB COAT with a visible collar and lapels, sleeves often pushed
or rolled up the forearm, worn over a plain BLACK crew-neck t-shirt. The coat is
shaded with soft grey-blue folds; the black shirt is nearly flat with a subtle
lighter edge where light hits it.


THE BOY (small, bottom-left, x=2–20%, y=70–100%): chest-up, shrugging with both palms up, looking at the calculator with a flat unimpressed expression, one small sweat drop. Same heavy half-closed lids. He never overlaps the calculator or the hole.

THE CALCULATOR (hero, x=26–62%, y=6–78%): a chunky dark navy pocket calculator (#2A3248) held up and tilted about 8°, cream keys with navy numbers, operator keys in slate blue. Its LCD screen is large and clearly readable and shows exactly "1 ÷ 0" on a small top line and a huge "ERROR" below it in bright red (#C8382A) on a pale pink LCD. A soft red glow comes off the screen.

THE HOLE (x=64–92%, y=48–86%): on the paper, a hand-drawn navy number line runs horizontally with tick marks labelled −2, −1, 1, 2 (no 0 label). Exactly where 0 should be there is a ROUND TORN HOLE in the paper, about as wide as the calculator screen is tall: pure black inside, a thick curled white-cream paper rim with a soft shadow falling inward, a few tiny torn fibres. It must look like a real hole THROUGH the page, not a black dot. A short red pen arrow points from the calculator down to the hole.

THE TEXT: the ONLY text is what is on the calculator screen ("1 ÷ 0" and "ERROR") plus the small tick labels −2, −1, 1, 2. No other words, no title text.

BACKGROUND: the whole image is the cream graph-paper page (#F2EEE3, grid #C9D6E3), lit warmly from the top-left, slight paper texture. Bright and clean.

LAYOUT CHECK: calculator + hole cover about 70% of the image. The bottom-right corner (last 25% of width, lowest 20% of height) is only plain graph paper — no text, no hole, no person.

STYLE: polished anime background-art illustration, clean thin dark line art, soft cel shading. NOT flat vector, NOT photo, NOT western cartoon, no lens flare.

CRITICAL CONSTRAINTS
- The boy is small and in the corner; his head top is below the calculator screen
- The screen reads exactly "1 ÷ 0" and "ERROR"; "÷" is a real division sign (a dash with one dot above and one below)
- The hole sits exactly where 0 would be on the number line, between −1 and 1
- Keep all text and his head at least 40 px from every edge
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: five fingers on every visible hand
```

Nếu chữ trên màn hình ra sai: tạo lại với màn hình TRỐNG rồi mình đặt "1 ÷ 0" / "ERROR" bằng PIL (Archivo 800, đỏ #C8382A).

## Sau khi có ảnh
Gửi mình → `tools/thumb/check.py` (168/250 px, 50% TV, góc phải dưới) → bản B/C để A/B: B màn hình "1 ÷ 0 = ?" thay
ERROR; C thêm nhãn nhỏ "1,400 YEARS" cạnh lỗ.

## Gate
A1 hiểu trong nửa giây (máy tính báo lỗi + lỗ ở số 0) · A3 không lộ đáp án (không "undefined", "infinity") · A4 không
chung từ khoá với title · B ≤ 3 cụm chữ · C1 khoá mắt nguyên văn · D góc phải dưới trống.
