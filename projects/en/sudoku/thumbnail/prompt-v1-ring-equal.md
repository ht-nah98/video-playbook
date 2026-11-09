# sudoku — thumbnail prompt v1 "ALWAYS EQUAL"

Ngày 2026-10-15 · đường nhanh (`.claude/agents/thumbnail-artist.md`) · kênh 99% from scratch · video chưa đăng.

## Lời hứa

Title (chốt 2026-10-15, thay bản cũ "The Hidden Ring Inside Every Sudoku (and Why 17 Clues Is the Minimum)" — 69 ký tự,
bị cắt): **"Every Sudoku You've Ever Solved Hides a Secret"** (46). Title nói "có bí mật", không nói bí mật gì. Thumbnail
là móc thứ hai: CHO THẤY vòng đỏ + 4 góc xanh và khẳng định chúng luôn bằng nhau — mâu thuẫn với trực giác ("hai nhóm ô
chẳng liên quan gì, sao lại luôn cùng bộ số?"). Không lặp "every" / "secret".

## Móc + mốc giờ

- **0:00–0:20** "Take the sixteen cells that form a ring around the middle box… the four little two by two squares in the
  corners… those two groups hold exactly the same digits… in every sudoku ever made." Sau bản sửa 2026-10-15, vòng đỏ + 4
  góc xanh có ngay từ khung 0.5 s (`out/en/sudoku/youtube/thumb-tests/ref-frame-00m05.png`) → thumbnail = khung đầu.
- Trả lời: 2:16–3:41 (Counting without knowing → What's left).

## Ba hướng

| # | THẮC MẮC | CẢM THẤY | cơ chế | vật chính |
|---|---|---|---|---|
| **1 ★** | "Vòng giữa và 4 góc luôn bằng nhau? Sao được?" | không tin, muốn thử | mâu thuẫn trên vật quen (ô sudoku ai cũng giải) | ô cửa kính sudoku: vòng kính đỏ, 4 góc kính xanh, chữ ALWAYS EQUAL |
| 2 | "Sudoku mà có x² − y²?" | lạ | hai thế giới va nhau | ô cửa câu đố Difference of Squares + "x² − y²" — rủi ro ký hiệu mũ hỏng |
| 3 | "Không có sudoku 16 gợi ý?" | thách đố | con số lạ | lưới thưa + "16?" — lời đáp ở phút 9, xa móc 5 s đầu |

Đề xuất 1: khớp 5 giây đầu tuyệt đối, chữ ngắn (2 từ), không cần số.

## Xoay vòng (kênh Anh)

solid-geometry: mascot phải, chống cằm, nền tối, vật trên bàn. zero-power: mascot phải, chỉ tay, nền tối, máy tính LCD.
**v1:** mascot TRÁI, hai tay GIƠ tấm kính lên (không bàn), mặt "thấy chưa" bình thản, nền SÁNG (tường giấy ấm, nắng xuyên kính).

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm:
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt.
2. `<repo>/out/en/sudoku/youtube/thumb-tests/ref-frame-00m05.png` — khung đầu video: CHỈ vẻ
   ô cửa kính chì, màu kính đỏ / xanh / trong, tường giấy ấm.

```
Create a YouTube thumbnail, 1280x720, 16:9, for an English mathematics education channel.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the stained-glass sudoku window: dark lead came lines, thicker lead between the 3x3 boxes, soft salmon-red glass, cornflower-blue glass with fine vertical ribs, pale clear glass, and the warm handmade-paper wall. Do NOT copy any digits, text or layout from image 2.

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

Pose: he is on the LEFT side of the frame, seen from mid-chest up, body turned three-quarters toward the RIGHT. With BOTH hands he holds up a square stained-glass panel beside him, at the height of his own face, like showing a finished puzzle to the viewer: his left hand grips the panel's left edge at about 25% of the image height, his right hand supports its lower-left corner at about 60%. His head is tilted slightly toward the panel; his gaze goes to the viewer, as if saying "see? every time."

EXPRESSION — calm, quietly certain, a tiny closed-mouth smile on one side; the eyes DO NOT CHANGE. Keep the heavy flat half-closed upper lids exactly as described above. Do NOT open the eyes, do NOT enlarge them, do NOT add sparkles or extra highlights, do NOT add eyebrows.

FRAMING OF THE CHARACTER:
His whole head, all of his hair, his face and both hands stay fully inside the frame with a clear margin; only his coat shoulder and lower torso may touch the left and bottom edges. His face is large — about one third of the frame height — and his head sits HIGH: top of the hair at about 8% of the height, chin at about 45%. He occupies roughly x=3% to x=34% of the width.

THE HERO OBJECT — a stained-glass sudoku panel
A square 9x9 stained-glass window panel with a dark grey lead frame (#2C2D33): 81 small square glass panes separated by thin lead lines, with thicker lead lines dividing it into nine 3x3 boxes. The panes carry NO digits and NO symbols — glass only.
Colour pattern, exactly:
- RED glass (#F6B39A, deeper #E07A5F at the edges, a few soft wavy streaks): the 16 panes that form a hollow square RING around the centre 3x3 box — that is, the ring one pane wide that surrounds the middle box (rows 3 to 7, columns 3 to 7, minus the middle 3x3).
- BLUE glass (#82A6D9 with fine vertical ribs): the four 2x2 blocks in the four corners of the panel (16 panes in total).
- Every other pane is pale clear glass (#F4F1E8).
So the panel shows a red square ring in the middle and four blue 2x2 squares in the corners — bold, simple and readable from far away.
The panel spans from about x=33% to x=66% of the width and from about 6% to 66% of the height, tilted about 4 degrees, held by the boy. Warm sunlight shines THROUGH it from behind, so it glows, and casts soft red and blue coloured light patches onto the boy's lab coat and the wall.

HEADLINE — to the right of the panel, upper right
Two lines of very heavy bold condensed sans-serif capitals, near-black ink (#1E1914) with a thin warm white outline so they pop off the wall:
Line 1: "ALWAYS" — at about 12–32% of the image height.
Line 2: "EQUAL" — directly below, at about 32–54% of the height, the same size or slightly larger, with the letters tinted half red (#9A2A18) on the left and half blue (#1A4E8C) on the right, as if made of the panel's two glass colours.
The headline sits between x=68% and x=96% of the width. Together the two words fill roughly 20–25% of the canvas.

BACKGROUND — the world of the video
A warm handmade-paper wall (#E4DCCD) with faint fibres, softly lit; a diagonal beam of warm sunlight falls from the upper right. The edges darken gently to warm grey-brown (#8A7F6E) so the panel and the face pop. No windows, no furniture, no desk, no table, no floor.

LIGHTING
Warm golden backlight through the glass panel; coloured red and blue light patches on the coat; a cool blue rim light along the top of his hair; soft warm gold on the crown. Calm and premium, soft bloom on the glowing glass.

LAYOUT — the top half alone must tell the story
Left: the boy's face high. Centre: the glowing glass panel (its red ring and blue corners must be fully visible in the top 60%). Upper right: ALWAYS / EQUAL.
The bottom-right corner (the last 30% of the width and the lowest 35% of the height) is only soft paper wall — no hand, no glass, no text.

STYLE
Polished anime illustration, soft cel shading with clean thin dark line art, smooth gradients, subtle glow on the lit glass. Bright, warm, clean, minimal: one boy, one glass panel, two words.
NOT flat vector, NOT western cartoon, no photorealism, no 3D render, no lens flare.

CRITICAL CONSTRAINTS
- The ONLY text anywhere in the image is "ALWAYS" and "EQUAL" — 11 letters: A L W A Y S E Q U A L. No digits at all (not on the panel, not anywhere), no question mark, no equals sign, no channel name, no other words.
- The panel is exactly 9 by 9 panes with the red ring and four blue 2x2 corners exactly as described — no other colours of glass, no random pattern
- Exactly one boy and one glass panel. No desk, no table, no sudoku on paper, no pencil
- Everything must stay readable when the image is scaled to 250px wide
- Keep all text, his head and both hands at least 40px from every edge
- Leave the bottom-right corner clear (YouTube places the duration stamp there)
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable; no eyebrows; thin round wire glasses, no lens glare
- BOTH arms and BOTH hands visible and correctly attached, five fingers each
```

Nếu kính lệch mẫu (vòng/góc sai chỗ): tạo lại với "panel blank clear glass", rồi tô vòng + góc bằng PIL theo lưới.
Nếu chữ hỏng: tạo lại không chữ ("leave the upper right empty paper wall") và đặt chữ bằng PIL.

## Ba cách viết chữ (A/B, cùng hình)

| | chữ | cách nói |
|---|---|---|
| A ★ | ALWAYS / EQUAL | khẳng định trần — mâu thuẫn mạnh nhất |
| B | SAME DIGITS. / EVERY TIME. | nói rõ hơn "bằng nhau về cái gì"; dài hơn → nhỏ hơn |
| C | NOT A / COINCIDENCE | đúng câu của video (0:21), cảm xúc mạnh nhưng không nói vật nào |

## Gate (prompt)

PASS A1 sudoku nhận ra trong nửa giây · A2 chữ = móc thật 0:00–0:20 · A3 không lộ lý do (bằng nhau VÌ SAO) · A4 không lặp
"every"/"secret" của title · A5 video nói đúng (kit.js `must` vòng = góc) · B1–B3 2 từ, 1 khối chữ · C1 EYE LOCK nguyên văn ·
C5 màu kính + tường giấy = khung 0.5 s · D1–D2 không bàn, góc phải dưới trống. D3–D5 kiểm trên ảnh render.
Thử 50% TV (thiết kế): mặt 8–45%, tấm kính 6–66% (vòng đỏ ~25–50%), chữ 12–54%.

## Màn hình kết thúc (lúc đăng)

Trỏ sang `intuition` (Monty Hall + 0.999… — cùng chất "đố logic"); phần tử thứ hai: Subscribe.

## Outcome

(trống — chờ người dùng render)
