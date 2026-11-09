# ja/2048 — thumbnail prompt v3「1時間 → 1000時間」, mascot nhỏ ×2

Ngày 2026-10-19 · kênh 99の発見 · thay v2 (`prompt-v2-1h-1000h.md`, ảnh `v2-1h-1000h.png`). Loại: **BIẾN ĐỔI** (hỗn loạn → trật tự).

## Vì sao có v3 (người dùng, sau khi render v2)

"Mascot quá to trên màn hình là không ổn… không gian thumbs nên dành cho sự tương phản và nội dung… ít nhất 2 tư thế
mascot: bối rối vì mới chơi / thành công khám phá… đánh vào tương phản màu sắc… Mascot chỉ là 1 phần bổ trợ nhỏ nhận
diện kênh." Soi v2: mascot ~30% bề ngang ở GIỮA (mắt dừng ở mặt), hai bàn cùng tông gỗ ấm (đối lập chỉ nằm ở chữ),
một tư thế → không kể "trước → sau".

v3: hai bàn là vật chính (~75% bề ngang); trái LẠNH xám-xanh, quân xỉn — phải ẤM nắng vàng, 2048 phát sáng; mũi tên
vàng trái → phải; mascot ×2 mỗi cái ~22% chiều cao: bối rối (góc trái dưới) / ngón cái (giữa dưới). Chữ: 1時間 xám-xanh,
1000時間 vàng. Số trên quân giữ như v2 (bàn trái = thế thật ván thua thứ 4 trong video; bàn phải = bậc thang như 4:01).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/ja/2048/youtube/thumb-tests/ref-frame-00m01.png` — khung 0:01: CHỈ vẻ bàn + quân.
   (Có thể đính thêm `projects/ja/2048/thumbnail/v2-1h-1000h.png` và nói "same boards and numbers as this image, but…")

```
Create a YouTube thumbnail, 1280x720, 16:9, for a Japanese mathematics education channel.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the two light-wood 4x4 game boards with dark ink grid lines and short legs, and the shogi-piece-shaped tiles (pale wood for small numbers, brown and dark lacquer for bigger numbers, black lacquer with gold for the biggest). Do NOT copy its layout or text.

THE STORY IN ONE GLANCE: chaos → order. The two boards are the heroes and fill most of the image. The boy appears TWICE, SMALL, as a supporting mark of the channel — once lost, once successful. The eye must go to the contrast between the boards, not to the boy.

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

THE BOY APPEARS TWICE, SMALL (each figure only about 22% of the image height, chest-up, never covering a board's tiles):
1. BOTTOM-LEFT, in the cold shadow, at about x=2–17%, y=70–100%: confused beginner — head tilted, one hand scratching the back of his messy hair, a single small sweat drop beside his head, a small grey "?" floating above. Mouth a small wavy line. Same heavy half-closed lids.
2. BOTTOM-CENTRE, in the warm light, at about x=43–57%, y=70–100%, just below the arrow: calm success — a tiny satisfied closed-mouth smile, giving a small thumbs-up toward the right board. Same heavy half-closed lids.
Both are the SAME character, same outfit. EXPRESSIONS change only through head tilt, hands and mouth; the eyes DO NOT CHANGE. Do NOT open the eyes, do NOT enlarge them, do NOT add sparkles, do NOT add eyebrows.

THE HEROES — two big 4x4 boards, BEFORE and AFTER, seen almost straight from the front
LEFT board at x=3–41%, y=17–68%: "one hour" — COLD and DEAD. Completely full, a messy jam of tiles, drained of colour, bathed in a cold blue-grey shadow (#3B4656 / #5E6B7D), the tiles look dull and greyish as if the game is lost. Exactly these numbers, row by row from the top:
  2   8   32  4
  8   64  16  2
  4   32  2   128
  2   8   4   2
RIGHT board at x=57–96%, y=17–68%: "1000 hours" — WARM and ALIVE. A clean staircase snaking from the TOP-LEFT corner, bathed in golden sunlight, rich warm lacquer colours. Exactly these numbers, row by row from the top (empty = no tile):
  2048  1024  512  256
  16    32    64   128
  8     4     2    (empty)
  (empty) (empty) (empty) (empty)
The 2048 corner tile is black lacquer with gold numerals and a strong golden glow — the single brightest point of the image.

ARROW: one thick, slightly brush-stroked GOLD arrow (#E8C46A) pointing from the left board to the right board, in the gap between them at about x=42–56%, y=35–48%.

HEADLINE — above each board
Very heavy bold Japanese Mincho (serif), thin dark outline and soft shadow:
Above the LEFT board, centred, at about 3–15% of the height: 「1時間」 in cold pale grey-blue (#C9D3DF).
Above the RIGHT board, centred, at about 3–15% of the height: 「1000時間」 in bright warm gold (#F2CF6B), the same size.
Nothing else is written anywhere except the small "?" near the confused boy.

BACKGROUND — split light, one world
A tatami floor seen from slightly above. The LEFT half sits in cool blue-grey shadow, desaturated; the RIGHT half is flooded with warm golden diagonal sunlight from the upper right. The boundary between cold and warm runs softly down the middle, behind the arrow. No walls, no furniture, no table, no other objects.

LAYOUT CHECK
The two boards together cover about 75% of the image width. Each small boy is clearly smaller than one board. The bottom-right corner (the last 30% of the width and the lowest 32% of the height) is only warm sunlit tatami — no board legs, no boy, no text.

STYLE
Polished anime illustration, soft cel shading with clean thin dark line art, strong colour temperature contrast (cold left, warm right), subtle glow on the 2048 tile only.
NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text is 「1時間」, 「1000時間」, the small "?" and the tile numbers exactly as listed — no other words, no channel name, no "VS"
- Each board has exactly 4 rows and 4 columns; tile numbers exactly as listed, every digit legible
- Exactly TWO small figures of the same boy, each about 22% of the image height — never larger, never in the centre of a board
- Everything must stay readable when the image is scaled to 250px wide
- Keep all text and both heads at least 40px from every edge
- Leave the bottom-right corner clear (YouTube places the duration stamp there)
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable on BOTH figures; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: five fingers on every visible hand
```

Nếu số sai: dùng lại hai bàn của v2 (đã đúng số) — đính v2 làm ảnh 3, dặn "keep both boards and their numbers exactly".
Nếu mascot vẫn to: thêm "each boy no taller than one board row ×2".

## Ba cách viết chữ (A/B)

| | chữ |
|---|---|
| A ★ | 1時間 / 1000時間 |
| B | 1時間 / 1000時間 + mũi tên có chữ nhỏ 「並べ方」 |
| C | 初心者 / 上級者 |

## Outcome

2026-10-19 người dùng render → `v3-1h-1000h.png`, CHỐT. Soát (`tools/thumb/check.py`, out/ja/2048/youtube/thumb-tests/check-v3.jpg):
- ĐẠT: đường chéo lạnh ↔ ấm đọc được ở 168 px; che chữ vẫn thấy "lộn xộn tối → bậc thang sáng" (BIẾN ĐỔI); 2 tư thế kể
  trước → sau; 50% TV còn chữ + hàng 2048·1024·512·256; góc phải dưới chỉ ô trống + chân bàn.
- CHƯA đúng prompt: mascot phải vẫn to (~nửa chiều cao, prompt 22%) và đẩy bàn phải xuống nửa dưới. Không chặn đăng;
  lần sau thêm "each boy no taller than one board" ngay đầu prompt.
