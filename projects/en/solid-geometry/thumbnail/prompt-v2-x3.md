# solid-geometry — thumbnail prompt v2 「×3」 (three pyramids fill one box)

Ngày 2026-10-19 · kênh 99% from scratch · video CHƯA đăng, đổi gói theo PACKAGING §0b. Loại: KẾT QUẢ ("làm sao được thế?").
Thay v1 (`out/en/solid-geometry/youtube/thumbnail.jpg`, "ONE PYRAMID. ONE THIRD." — mascot ~40% khung, chữ lặp title).
Cặp: thumbnail CHO THẤY 3 lần đổ đầy hộp; title NÓI 「Every Pyramid Is Exactly ⅓ of a Box. Why?」. Khớp 0–5 s mới
(`plates/a0-open.js`: đổ nước 3 lần). Khung prompt mặc định: `projects/ja/gacha/thumbnail/prompt-v1-onaji.md` (LESSONS §123).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/en/solid-geometry/youtube/thumb-tests/ref-frame-00m04.png` — khung 4 s của video mới.

```
Create a YouTube thumbnail, 1280x720, 16:9, for an English mathematics education channel.

SIZE RULE FIRST: the boy is SMALL — no taller than the box, about 30% of the image height, in the bottom-left corner. The pyramids and the box are the heroes and fill most of the image.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the world: folded white paper solids with crisp dark ink edges, a single warm hanging lamp, soft paper shadows. Do NOT copy any text or layout from image 2.

THE STORY IN ONE GLANCE: three identical paper pyramids of water pour into ONE paper box with the same square base and the same height — and the box is exactly full.

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

THE BOY (small, bottom-left, x=2–20%, y=68–100%): chest-up, chin on his hand, watching the box with quiet surprise. Mouth a small "o". Same heavy half-closed lids. He never overlaps the pyramids or the box.

THE HEROES — under a warm hanging lamp at the top centre:
LEFT (x=8–52%, y=22–70%): three identical white folded-paper square pyramids in a row, each tipped toward the right, each pouring a clear blue stream of water (#5BA8E0, glossy highlights) toward the box — the three streams arc together like a curved arrow.
RIGHT (x=55–90%, y=28–78%): one open white folded-paper box (cube-like, same square base and same height as each pyramid — make this visually obvious by drawing a thin dotted line from the pyramids' apex height to the box rim). The box is filled EXACTLY to the rim with blue water, with two faint level marks on its side at one third and two thirds.

HEADLINE — upper right, y=4–22%, x=55–94%: 「×3」 in a very heavy bold condensed sans-serif, warm ivory (#F4EEDF) with a thick dark outline and soft shadow, large. This is the ONLY headline text.

BACKGROUND: warm paper-coloured backdrop (#EFE6D6) fading to soft warm grey at the edges, a single pool of warm lamp light on the table; the blue water is the only cool colour — strong warm/cool contrast.

LAYOUT CHECK: pyramids + streams + box cover about 70% of the image. The bottom-right corner (the last 30% of the width and the lowest 32% of the height) is only warm table surface — no box, no text.

STYLE: polished anime illustration, soft cel shading with clean thin dark line art, paper texture on the solids, subtle glow on the water. NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text is 「×3」 — no other words, digits, formulas or channel name
- Exactly three pyramids and one box; same base, same height
- Everything readable at 250 px wide
- Keep the text and his head at least 40 px from every edge; leave the bottom-right corner clear
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: five fingers on every visible hand
```

## Ba cách viết chữ (A/B)
| | chữ |
|---|---|
| A ★ | ×3 |
| B | ALWAYS ⅓ |
| C | WHY 3? |

## Outcome
2026-10-20 người dùng render → `thumbnail/v2-x3.png` (1672×940) → `out/en/solid-geometry/youtube/thumbnail.jpg`. check.py: đọc rõ ở 250/168 px, góc phải dưới trống. Chỉ chữ 「×3」 là CÓ CHỦ Ý (thumbnail cho thấy ×3, title nói ⅓ + Why?). Mascot cao ~50% khung nhưng ở mép, đầu ~25% — chấp nhận.
