# ja/2048 — thumbnail prompt v2「1時間 | 1000時間」

Ngày 2026-10-19 · kênh 99の発見 · video CHƯA đăng → đổi gói theo `docs/lesson/PACKAGING.md` §2–§5 trước khi đăng.
Loại thumbnail: **BIẾN ĐỔI** (trước → sau). Ý của người dùng: "1 bên là 1h chơi 2048, 1 bên là 1000h".

## Lời hứa

Title (chốt 2026-10-19): **「2048、1時間の人と1000時間の人は何が違う？」** (22). Câu đầu video nói đúng điều đó:
「2048を1時間やった人と、1000時間やった人。盤の上は、まるで違います。」 — so sánh, KHÔNG nhận kênh đã chơi 1000 giờ
(kênh không chơi, số thí nghiệm là của Ratio — CONTENT §6). Đáp: 並べ方 (rắn về góc, 0:00–0:26 hé, ACT 3 「上手な人の
共通点」 trả lời) → phía sau là toán (等比数列, 131072の壁).

Bản v1 (người dùng làm 2026-10-13): 「2048の限界 131072」, đêm + 鳥居 + Phú Sĩ — đẹp nhưng nhiều chi tiết, khác thế giới
video (gỗ sáng), lặp 131072 với title cũ. Giữ ở `projects/ja/2048/thumbnail.png`.

## Móc + mốc giờ

- **0:00–0:26** hai bàn 「1時間」 (bấm bừa, thua 4 ván, quân tối dần) | 「1000時間」 (ván thật của bot chơi kiểu rắn về góc,
  data/opening.mjs) lên 2048 đúng chữ 「2048」; 指の速さ (gạch) → 並べ方 (朱) → 並べ方の裏に、数学. Khung 0.5 s = thumbnail.
- **Phép thử che chữ:** bàn kín lộn xộn tối ↔ bậc thang sáng dồn góc → "khác nhau ở đâu?" — loại BIẾN ĐỔI, PASS theo thiết kế.

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/ja/2048/youtube/thumb-tests/ref-frame-00m01.png` — khung 0:01 của video:
   bàn 榧 trên chiếu, quân 駒 gỗ / nâu / đen theo bậc, nắng xiên. CHỈ lấy vẻ bàn + quân + nền.

```
Create a YouTube thumbnail, 1280x720, 16:9, for a Japanese mathematics education channel.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the world: the two thick light-wood game boards with dark ink grid lines and short wooden legs, the shogi-piece-shaped tiles (pentagon pieces: pale wood for small numbers, warm brown and dark chocolate lacquer for bigger numbers, black lacquer with gold for the biggest), the tatami floor and the warm diagonal sunlight. Do NOT copy the layout or text from image 2.

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

Pose: he stands in the CENTRE, between the two boards, seen from mid-chest up, body facing the viewer. His head turns slightly toward the RIGHT board and his right index finger points at its glowing corner tile, as if saying "this is the difference." His left hand stays down, out of frame.

EXPRESSION — calm, quietly knowing, mouth a small flat closed line; the eyes DO NOT CHANGE. Keep the heavy flat half-closed upper lids exactly as described above. Do NOT open the eyes, do NOT enlarge them, do NOT add sparkles or extra highlights, do NOT add eyebrows.

FRAMING OF THE CHARACTER:
His whole head, all of his hair and his pointing hand stay fully inside the frame; only his coat and lower torso may touch the bottom edge. His face is about one quarter of the frame height; top of the hair at about 22% of the height, chin at about 52%. He occupies roughly x=39% to x=61% of the width.

THE HERO OBJECTS — two 4x4 boards, BEFORE and AFTER
Two identical square 4x4 light-wood boards (16 cells each), seen almost straight from the front, tilted back very slightly. Each board spans about 33% of the image width and sits between 20% and 64% of the image height.

LEFT board (x = 3% to 36%) — "one hour": completely FULL, a messy jam of small tiles, slightly dimmed and greyed as if the game is over. Exactly these numbers, row by row from the top:
  2   8   32  4
  8   64  16  2
  4   32  2   128
  2   8   4   2

RIGHT board (x = 64% to 97%) — "1000 hours": a clean STAIRCASE snaking down from the TOP-LEFT corner, bright and warm. Exactly these numbers, row by row from the top (empty = no tile):
  2048  1024  512  256
  16    32    64   128
  8     4     2    (empty)
  (empty) (empty) (empty) (empty)
The 2048 tile in the top-left corner is black lacquer with gold numerals and a soft golden glow — the brightest object in the image. Bigger numbers = darker, richer lacquer pieces, exactly like the video.

HEADLINE — above each board
Very heavy bold Japanese Mincho (serif) characters, warm ivory (#F4EEDF) with a thin dark outline and soft shadow:
Above the LEFT board, centred, at about 4–17% of the height: 「1時間」
Above the RIGHT board, centred, at about 4–17% of the height: 「1000時間」, the same size, with the numerals "1000" in warm gold (#E8C46A).
Nothing else is written anywhere.

BACKGROUND — the world of the video
A warm tatami room floor seen from above at a shallow angle, soft woven texture (#8C7A55 to #5A4C34), a broad diagonal beam of warm sunlight falling from the upper left across the right board. Gentle darker vignette at the edges. No walls, no furniture, no table, no window, no other objects.

LIGHTING
Warm golden sunlight from the upper left; the right board is in the light, the left board is a little in shadow. A cool blue rim light along the top of his hair; soft warm gold on the crown. Bright, warm, calm, premium.

LAYOUT — the top half alone must tell the story
Top: 1時間 | 1000時間. Middle band: messy full board | the boy pointing | clean staircase with the glowing 2048 corner. The bottom-right corner (the last 30% of the width and the lowest 35% of the height) is only tatami in soft light — no board legs, no tiles, no text.

STYLE
Polished anime illustration, soft cel shading with clean thin dark line art, smooth gradients, subtle glow on the 2048 tile only. Clean and minimal: one boy, two boards, two labels.
NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text is 「1時間」 and 「1000時間」 plus the numbers on the tiles exactly as listed — no other words, no channel name, no "VS", no arrows
- Each board has exactly 4 rows and 4 columns; tile numbers exactly as listed, every digit legible
- Both boards are the same size and the same wood; the difference is only the tiles and the light
- Everything must stay readable when the image is scaled to 250px wide
- Keep all text, his head and his hand at least 40px from every edge
- Leave the bottom-right corner clear (YouTube places the duration stamp there)
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- Correct anatomy: the pointing hand has five fingers and is attached to his right arm
```

Nếu số trên quân sai (model ảnh hay đổi số): tạo lại với "tiles WITHOUT numbers", rồi đặt số bằng PIL theo lưới
(Cormorant / Shippori như kit). Nếu chữ Nhật hỏng: tạo lại không chữ ("leave the top band empty tatami"), đặt
「1時間」「1000時間」 bằng PIL với `assets/fonts/ShipporiMincho-Bold.ttf`.

## Ba cách viết chữ (A/B, cùng hình)

| | chữ | cách nói |
|---|---|---|
| A ★ | 1時間 / 1000時間 | đúng câu đầu video, đúng ý người dùng |
| B | 1時間 / 1000時間 + nhỏ dưới bàn phải 「並べ方」 | lộ một nửa đáp án — thử khi A có CTR thấp |
| C | 初心者 / 上級者 | không số; mềm hơn, ít "công sức" hơn |

## Gate (prompt)

PASS A1 2048 nhận ra trong nửa giây (bàn 4×4 + quân số) · A2 chữ = câu đầu video · A3 không lộ lý do (chỉ thấy KHÁC,
không thấy VÌ SAO) · A4 lặp「1時間 / 1000時間」 với title — người dùng chọn có chủ đích (thumbnail cho thấy, title hỏi) ·
A5 video nói đúng (bàn trái = thế thật ván thua thứ 4, bàn phải = bậc thang như cảnh 4:01) · B1–B3 ≤ 3 cụm chữ ·
C1 EYE LOCK nguyên văn · C5 bàn 榧 + quân 駒 + chiếu + nắng = khung 0:01 · D1–D2 không bàn ăn / đồ đạc, góc phải dưới trống.
D3–D5 kiểm trên ảnh render (`tools/thumb/check.py`).

## Màn hình kết thúc (lúc đăng)

Trỏ sang ja/pi (cùng chất "con số quen → toán phía sau"); phần tử thứ hai: チャンネル登録.

## Outcome

(trống — chờ người dùng render)
