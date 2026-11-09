# ja/gacha — thumbnail prompt v1 「同じ？」 (ガチャ ↔ スロット)

Ngày 2026-10-19 · kênh 99の発見 · gói A (người dùng chốt): thumbnail CHO THẤY điện thoại ガチャ ↔ máy slot là cùng một máy,
title NÓI nửa còn lại 「ベルギーでは違法。日本では合法のガチャ、その数学」. Loại: SO SÁNH ("cái nào? — giống hệt"). Luật
PACKAGING §3 (2026-10-19): mascot NHỎ, ràng buộc cỡ ĐẦU prompt, đối lập bằng MÀU (pastel ↔ son tối). Khớp 0–5 s
(`plates/a0-open.js`: phone ↔ slot, 「＝？」, cùng ánh vàng).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/ja/gacha/youtube/thumb-tests/ref-frame-00m00.png` — khung 0.5 s của video.

```
Create a YouTube thumbnail, 1280x720, 16:9, for a Japanese mathematics education channel.

SIZE RULE FIRST: the boy is SMALL — no taller than the phone, about 30% of the image height, in the bottom-left corner. The phone and the slot machine are the heroes and fill most of the image.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the pastel phone gacha screen with the glowing gold capsule and the red lacquer slot machine. Do NOT copy its text or layout.

THE STORY IN ONE GLANCE: a cute smartphone gacha and a casino slot machine are the SAME machine. Strong colour-temperature contrast: soft pastel and bright on the left, dark lacquer red and black on the right, split by a clean diagonal.

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

THE BOY (small, bottom-left, x=2–20%, y=68–100%): chest-up, holding his own phone, looking sideways at the slot machine with a puzzled, suspicious expression — head tilted, one small sweat drop. Mouth a small flat line. Same heavy half-closed lids. He never overlaps the phone or the slot.

LEFT HERO — a large smartphone (x=14–44%, y=8–88%), tilted slightly, bright pastel screen (cream white, soft pink and sky blue): a single round two-tone capsule (gold top half, pearl-white bottom half) bursting with warm golden light in the centre of the screen, five small gold stars under it, and a rounded pink button at the bottom. No words on the screen except nothing — no game logo, no character art, no UI text.

RIGHT HERO — a classic slot machine (x=56–90%, y=6–80%) in glossy deep lacquer red (#B3121F to #4A060C) with black and gold trim, three reels showing 7 7 7 in red with a gold payline, a gold-light marquee strip with dots, a red ball lever on the right side. Its reels glow with the SAME warm golden light as the phone's capsule — the light visibly matches.

BETWEEN THEM, centred at x=47–55%, y=30–55%: a large bold equals sign with a question mark, 「＝？」, in ivory with a thin dark outline.

HEADLINE — top, centred over the split, y=3–20%: 「同じ？」 in very heavy bold Japanese Mincho, warm ivory (#F4EEDF) with a thick dark outline and soft shadow. This is the ONLY headline text.

BACKGROUND: left half a bright warm-white studio with soft pastel bokeh (pink, sky blue, mint); right half a dark casino red-black with soft gold bokeh. The diagonal boundary runs behind the 「＝？」.

LAYOUT CHECK: phone + slot machine together cover about 70% of the image. The bottom-right corner (the last 30% of the width and the lowest 32% of the height) is only dark red background — no lever, no text, no coins.

STYLE: polished anime illustration, soft cel shading, clean thin dark line art, premium product-shot lighting, subtle gold glow only on the capsule and the 7 7 7 reels. NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text is 「同じ？」, 「＝？」 and the digits 7 7 7 on the reels — no game names, no logos, no "SSR", no "JACKPOT", no channel name, no other words
- Exactly one small boy, one phone, one slot machine
- Everything readable at 250 px wide
- Keep all text and his head at least 40 px from every edge; leave the bottom-right corner clear
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: five fingers on every visible hand
```

Nếu chữ Nhật hỏng: tạo lại không chữ, đặt 「同じ？」 bằng PIL (`assets/fonts/ShipporiMincho-Bold.ttf`).

## Ba cách viết chữ (A/B)
| | chữ |
|---|---|
| A ★ | 同じ？ |
| B | どっちが賭博？ |
| C | 0.6% |

## Outcome
2026-10-19: người dùng render → `v1-onaji.png`, CHỐT ("ổn hơn rồi"). check.py: che chữ còn hỏi (2 máy cùng ánh vàng),
TV 50% còn 「同じ？」 + 777, 168 px đọc được, góc phải dưới chỉ nền đỏ. Mascot nhỏ ~35% chiều cao, góc trái dưới — đạt lần đầu.
Bản đăng: `out/ja/gacha/youtube/thumbnail.jpg` (1280×720, 0.25 MB).
