# logarithm — thumbnail prompt v1 「72」 (chồng xu gấp đôi)

Ngày 2026-10-20 · kênh 99% from scratch · gói A: thumbnail CHO THẤY chồng xu thấp → chồng cao gấp đôi (×2) + số 「72」
rất to; title NÓI nửa còn lại "One Number Tells You When Your Money Doubles" (B: "Bankers Know This Number. It's a
Logarithm."). Loại: KẾT QUẢ ("làm sao?"). Không chung từ khoá: thumbnail chỉ có "72" + "×2" (ký hiệu), title không có
"72". Mascot NHỎ, cỡ ở ĐẦU prompt (LESSONS §123). Khớp 0–5 s (`plates/a0-open.js`, khung 0.5 s).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/en/logarithm/youtube/thumb-tests/ref-frame-00m00.png` — khung 0.5 s của video.

```
Create a YouTube thumbnail, 1280x720, 16:9, for an English mathematics education channel.

SIZE RULE FIRST: the boy is SMALL — no taller than the short coin stack, about 28% of the image height, in the bottom-left corner. The two coin stacks and the number 72 are the heroes and fill most of the image.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the world: painted wooden toy coins in warm gold with visible wood grain, a thick chunky cut-wood "72" in orange-gold, a red painted wooden block printed "×2", a cool pale blue pegboard wall and a whitewashed birch tabletop. Do NOT copy its layout.

THE STORY IN ONE GLANCE: a small stack of money becomes a stack exactly twice as tall, and one big number knows when.

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

THE BOY (small, bottom-left, x=2–18%, y=70–100%): chest-up, holding a small calculator, looking up at the tall stack with a quietly impressed expression. Mouth a small flat line. Same heavy half-closed lids. He never overlaps the coins or the 72.

LEFT HERO — two stacks of chunky wooden gold coins on the table (x=16–52%, y=22–90%): a SHORT stack on the left (about 6 coins) and, right next to it, a TALL stack exactly twice as high (about 12 coins), glowing warmly. A small red wooden block printed "×2" sits between them, with a hand-drawn curved arrow from the short stack to the tall one.

RIGHT HERO — a huge thick cut-wood number "72" (x=55–94%, y=8–66%), warm orange-gold (#F6A623) with visible wood grain, bevelled edges and a soft drop shadow on the wall — the biggest, brightest object.

TEXT: the ONLY text in the image is the number "72" (the wooden object itself) and "×2" printed on the red block. No other headline.

BACKGROUND: a cool pale blue pegboard wall (#E3EDF1) with tiny holes, and a whitewashed birch tabletop. Bright, clean, morning light. The cool background makes the gold coins and the 72 pop.

LAYOUT CHECK: coins + 72 together cover about 70% of the image. The bottom-right corner (the last 30% of the width and the lowest 32% of the height) is only plain tabletop — no coins, no blocks, no text.

STYLE: polished anime illustration, soft cel shading with clean thin dark line art, smooth gradients, wood grain on the coins and the 72. NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text is "72" and "×2" — no dollar amounts, no percentages, no channel name, no other words
- Exactly one small boy, two coin stacks, one 72, one ×2 block
- The tall stack is clearly twice the height of the short one
- Everything readable at 250 px wide; "72" must be legible at 168 px
- Keep all text and his head at least 40 px from every edge; leave the bottom-right corner clear
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: five fingers on every visible hand
```

Nếu "72" hỏng: tạo lại không số, đặt 「72」 bằng cắt từ `ref-frame-00m00.png` hoặc vẽ bằng PIL (Archivo 900, cam #F6A623).

## Ba cách viết chữ (A/B)
| | chữ |
|---|---|
| A ★ | 72 (chỉ số, không chữ) |
| B | 72 + nhỏ "÷ 8 = 9" |
| C | WHY 72? |

## Gate
A1 hiểu trong nửa giây (tiền ×2 + một số lạ) · A2 khớp câu đầu video · A3 không lộ đáp án (không có "log") · A4 không chung
từ khoá với title · B ≤ 3 cụm chữ · C1 khoá mắt nguyên văn · C5 cùng thế giới khung 0.5 s · D góc phải dưới trống —
kiểm bằng `tools/thumb/check.py`.

## Outcome
(trống — chờ người dùng render)
