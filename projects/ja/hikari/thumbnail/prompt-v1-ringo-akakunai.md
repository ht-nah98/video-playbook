# ja/hikari — thumbnail prompt v1 「このリンゴ、赤くない。」

Ngày 2026-10-14 · bộ phận thumbnail (`.claude/agents/thumbnail-artist.md`) · kênh 99の発見.
Bản đang đăng: `projects/ja/hikari/thumbnail.png` 「色は脳が作る？」 (mắt + não + lăng kính + cầu vồng + sóng —
rối; thử 50% chỉ còn 「色は」, 02-thumbnails §2). Bản thử dựng từ khung video: `out/ja/hikari/youtube/thumb-tests/{A,B,C}.png`.

## Lời hứa

Title (chốt): 「あなたが見ている「色」は、実は脳が作り出しているものです！！光の正体とは何でしょうか？」 — title đã
NÓI đáp án (não). Thumbnail là móc thứ hai: không nói "não", chỉ đặt một vật ai cũng chắc chắn biết màu rồi phủ nhận nó.

## Móc + mốc giờ

- Đặt câu hỏi (không tiếng, 0:00–0:05): phòng tối, chùm sáng qua 節穴 rơi đúng vào quả táo trên 卓袱台 — vật của thumbnail.
- Trả lời phần đầu: **14:31–14:39** 「リンゴが持っているのは、『どの光を跳ね返すか』という性質だけ。『赤い』という感じは、
  まだ、どこにもありません」 (khung 14:30: chùm trắng tới táo, chỉ tia đỏ dội ra).
- Trả lời trọn: **16:15–16:35** 「脳に届くのは、3つの信号の比率だけ。そこから脳が、『赤』をつくり出します … 色は、頭の
  中にあるのです」 (khung: 「赤」 hiện trong đầu).

## Ba hướng

| # | người xem THẮC MẮC | CẢM THẤY | cơ chế | vật chính | khớp 5 s đầu |
|---|---|---|---|---|---|
| **1 ★** | "Táo rõ ràng đỏ — sao lại không?" | bị thách, hơi phản đối | **mâu thuẫn**: vật ai cũng biết + câu phủ nhận | quả táo trong chùm sáng, chỉ tia đỏ bật ra | **có** — 0:00–0:05 chính là táo trong chùm |
| 2 | "Cùng một quả — màu thật là màu nào?" | bối rối, muốn kiểm | **bằng chứng tận mắt**: một quả táo, nửa dưới ánh trắng đỏ, nửa dưới đèn natri gần đen; 「本当は何色？」 | quả táo hai ánh sáng | một nửa — táo có, đèn natri tới 14:36 mới có |
| 3 | "Cầu vồng không phải 7 màu?" | ngạc nhiên vì điều học ở trường | **lật niềm tin văn hoá Nhật** (13:13 「虹は七色と習います」→ Newton chọn 7 theo ドレミ); 「虹は七色じゃない？」 | dải phổ với 7 vạch ranh tan dần | không — cầu vồng ở 12:22–13:32; lệch lời hứa title; lặp cầu vồng của bản đang đăng |

**Đề xuất hướng 1**, xây tiếp trên bản thử A:
- Một vật, đọc trong nửa giây; táo + chữ 「赤」 nói chủ đề "màu" mà không cần dò sơ đồ (thứ hạng của skill: vật quen > sơ đồ).
- Cùng thế giới với video ở mức cao nhất: thumbnail = khung 0:00–0:05 → người xem rê chuột thấy ngay vật vừa thấy.
- Bổ sung title thay vì lặp: title nói "não", thumbnail chỉ phủ nhận cái đỏ.
- Bản thử A đã qua thử 50% / 168 px nhưng "kém lộng lẫy" (02 §3) và mascot là ảnh cắt tư thế `startled` bên phải. v1 này
  giữ ý A, đổi: render AI có bụi trong chùm, ánh dội đỏ, gỗ 卓袱台; mascot sang TRÁI (xoay vòng), mặt phản ứng mạnh; táo lớn hơn.
- Hướng 2 là ứng viên thứ hai cho Test & Compare (khác hình, không chỉ khác chữ). Hướng 3 hợp làm Short hơn.

## Xoay vòng so với 2 bài trước

| | chirality | 2048 | bản đang đăng (hikari) | **v1 này** |
|---|---|---|---|---|
| vị trí mascot | giữa | phải | phải | **trái** |
| tư thế / tay | tay chống cằm (ponder) | cằm tựa nắm tay, nghiêng | cầm lăng kính | **chỉ tay vào táo, tay kia giơ ngang vai, ngả ra sau** |
| mặt | nghỉ (deadpan) | cười tự mãn | nghỉ | **cao: sững sờ (miệng oval nhỏ, giọt mồ hôi, vạch chuyển động)** |
| chữ | dưới | trái trên | trái | **phải trên** |
| nền | xanh/vàng, ADN | sơn mài đỏ/vàng, núi Phú Sĩ | xanh neon, phòng lab | **phòng tối 雨戸, một chùm sáng, đỏ** |
| cảnh (scene-style) | presenting | measuring/board | holding | **caught out (#6)** |

## Prompt (dán vào ChatGPT / gpt-image)

Đính kèm (đường dẫn tuyệt đối, đúng thứ tự):
1. `~/Desktop/yt-studio/brand/mascot/avatar-master-v2.png` — mặt / nhân dạng.
2. `<repo>/out/ja/hikari/youtube/thumb-tests/ref-frame-14m30.png`
   (= `<repo>/out/ja/hikari/youtube/thumb-tests/ref-frame-14m30.png`) — chỉ để lấy vẻ phòng tối,
   lỗ trên tường, chùm sáng, 卓袱台, tia đỏ dội ra.
3. `~/Desktop/yt-studio/lessons/pending-math-30k-history/thumbnails/v3-owner-30000-years-of-maths.png` — chỉ
   lấy không khí ánh sáng.

```
Create a YouTube thumbnail, 1280x720, 16:9, for a Japanese science education channel.

Attached images: image 1 is the character reference — match his face, hair, glasses and outfit exactly. Image 2 is a frame from the actual video — use it ONLY for the look of the dark room, the bright hole in the left wall, the white light beam with dust, the small round low wooden table and the red rays bouncing off the apple. Image 3 is used ONLY for the lighting mood. Do NOT copy any text, layout or pose from images 2 and 3.

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

Pose: a large bust, head and shoulders plus upper chest, on the LEFT third of the frame, body turned three-quarters toward the right, toward the apple. He is caught out: his upper body leans back and away from the apple as if it just did something it should not. His RIGHT arm reaches toward the centre of the frame, index finger extended and pointing straight at the glowing apple, forearm and sleeve rolled up; his LEFT hand is raised beside his left shoulder, palm out, fingers spread, as if saying "wait". Both arms and both hands visible and correctly attached, five fingers on each hand. His gaze goes to the apple, not to the viewer.

EXPRESSION — astonished, but the eyes DO NOT CHANGE. Keep the heavy flat half-closed upper lids exactly as described above. The reaction is carried entirely by: the mouth, open in a small tight oval as if caught mid-word; the head pulled back a little; one small cartoon sweat drop at his right temple; two or three short motion lines in the air beside his head.
Do NOT open the eyes, do NOT enlarge them, do NOT add sparkles or extra highlights, do NOT add eyebrows to signal surprise.

FRAMING OF THE CHARACTER — this matters:
His coat and shoulder may bleed off the LEFT and BOTTOM edges, but his whole head, all of his hair, his face, both hands and the pointing finger stay fully inside the frame with a clear margin. His face is large — about one third of the frame height — so the heavy lid line reads on a phone. He occupies roughly the left 30% of the width.

BACKGROUND — the world of the video
A pitch-dark traditional Japanese room at night, near-black (#0B0B0E), with the faintest structure barely visible in very dark brown (#1E1C19): wooden pillars, a horizontal beam, the closed wooden storm shutters (amado), the edge of a tatami floor. No windows, no lab, no stars, no neon. The ONLY light source in the room is a small bright knot-hole high on the LEFT wall, just above and behind the boy's head; from it a single straight shaft of white sunlight crosses the room diagonally downward to the right, with fine dust motes floating inside it. Inside the shaft, very faint thin coloured strands (violet, blue, green, yellow, red) run together, showing that white light contains every colour.
The shaft lands on ONE shiny red apple (the hero object) resting on a small, round, dark wooden low table (chabudai) placed right of centre. The apple is large — about 22% of the frame height — and glows a deep saturated red in the white light. At the apple, the violet, blue and green strands simply end (absorbed); only RED light bounces back out: four or five thin glowing red rays fan upward and to the right from the apple, with soft bloom. The table sits on a dark tatami floor.

LIGHTING
The white shaft from the knot-hole is the key light: it catches the top of his hair and his shoulder. The apple throws a soft red bounce light onto his pointing hand, the front of his white coat and the underside of his chin. A cool blue rim light (#4DA6FF) runs along the top and outer edge of his hair and across his left shoulder, as if from a thin crack in the shutters. A soft warm gold light on the crown of his head. Everything else falls into deep black. Bright elements carry a soft bloom that bleeds into the dark around them.

LAYOUT — three zones, placed vertically with care (the top half alone must tell the story)
ZONE 1, left ~30% — THE CHARACTER, as described above. His head sits in the upper-left area.
ZONE 2, upper right, the top ~45% of the canvas from about x=36% to x=96% — HEADLINE TEXT (the dominant element):
Two lines of Japanese text in an ultra-heavy bold Japanese gothic typeface (like Hiragino Kaku Gothic StdN W9 / 極太ゴシック), slight upward tilt of 2 degrees, thick near-black outline plus soft drop shadow:
Line 1: 「このリンゴ、」 — warm off-white (#EDE8DF)
Line 2: 「赤くない。」 — glowing saturated red (#FF2A1A) like light itself, with a soft red bloom and a thick dark outline so it separates from the black room
Line 2 is clearly larger than line 1. Together the two lines fill roughly 40% of the canvas. The red rays from the apple may pass BEHIND the letters but never cross in front of them.
ZONE 3, centre-right, just below the headline — THE APPLE on its low table, the top of the apple and the fanning red rays sitting at or slightly above the vertical middle of the image, so that when only the top half of the thumbnail is visible, the headline, the top of the glowing apple and the red rays are all still there.
The bottom-right corner (roughly the last 25% of width and the lowest 25% of height) is only dark tatami floor — completely empty.

STYLE
Polished anime illustration, soft cel shading with clean thin dark line art, smooth gradients on skin and hair, subtle glow and bloom on bright elements. Cinematic, premium, high contrast, minimal: a dark room, one shaft of light, one red apple, one boy. High quality digital anime artwork.
Palette strictly limited to: near-black room, very dark brown wood, white light, the apple's deep red, the off-white text, a cool blue rim on the hair. No other saturated colours, no rainbow fan, no prism.
NOT flat vector, NOT thick wobbly ink outlines, NOT western cartoon. No photorealism, no 3D render, no lens flare, no gradient fills on the text, no decorative clutter.

CRITICAL CONSTRAINTS
- Render the Japanese text exactly: 「このリンゴ、」 on line 1 and 「赤くない。」 on line 2. The ONLY characters allowed anywhere in the image are, in order: こ の リ ン ゴ 、 赤 く な い 。 — eleven characters in total. No English, no channel name, no labels, no numbers, no other kana or kanji anywhere.
- Everything must stay readable when the image is scaled to 250px wide
- Keep all text, his head and both hands at least 40px from every edge — nothing cropped (only the coat may bleed off the left and bottom edges)
- Leave the bottom-right corner clear (YouTube places the duration stamp there)
- Exactly one apple; exactly one light shaft; no brain, no eye, no prism, no rainbow, no waves
- No watermark, no logo, no signature
- The heavy flat half-closed upper lids are non-negotiable — do not replace them with large, fully open or sparkling anime eyes, and do not add eyebrows
- Thin round wire-frame glasses with the lid line visible through them; no lens glare
- BOTH arms and BOTH hands visible and correctly attached — no missing or merged limbs, five fingers each
- No large empty dead areas: the headline, the apple with its rays and the character together fill the frame in a balanced way
```

Nếu model làm hỏng chữ Nhật: tạo lại với dòng "Leave the upper-right zone as clean dark space for text added later" thay
cho khối chữ, rồi đặt chữ bằng PIL như bản thử A (font ゴシック極太, đúng vị trí ZONE 2).

## Ba cách viết chữ (A/B — YouTube Test & Compare, cùng hình)

| | dòng 1 | dòng 2 | cách nói |
|---|---|---|---|
| A ★ | このリンゴ、 | **赤くない。** | khẳng định phủ nhận — mâu thuẫn trần trụi |
| B | リンゴの「赤」は | **どこにある？** | câu hỏi "ở đâu" — dẫn tới đáp án "trong đầu" mà không nói ra |
| C | 赤いのは | **リンゴ？** | câu hỏi ngắn nhất → chữ to nhất (B1/B2 tốt nhất ở 168 px) |

Màu: dòng 1 生成り `#EDE8DF`, dòng 2 đỏ phát sáng. Cặp title: giữ title đã chốt (nói "脳が作り出している") — cả ba
bản chữ đều không chứa 脳/色 nên không lặp (A4). Nếu sau này đổi title, cặp mạnh với A: 「色は、目の中にも、リンゴの中にもない
― 光の正体」.

## Gate tự chấm (prompt, trước khi render)

```
GATE — prompt-v1-ringo-akakunai (concept + prompt)
PASS A1 — quả táo + chữ 「赤」 nói chủ đề "màu" trong một cái nhìn
PASS A2 — chữ lớn nhất (赤くない。) là ý của video
PASS A3 — thách thức, không in đáp án (không có 脳 / 頭の中)
PASS A4 — không lặp title (title: 色・脳; thumbnail: リンゴ・赤くない)
PASS A5 — video nói đúng điều này ở 14:31–14:39 và 16:15–16:35
PASS A6 — vật lý đúng: trắng vào, lam/lục bị hấp thụ, chỉ đỏ dội ra; không vẽ lăng kính/cầu vồng sai chỗ
PASS B1 — yêu cầu ~40% (chữ Nhật 11 ký tự, dòng 2 lớn) — kiểm lại trên ảnh, model hay thu nhỏ chữ
PASS B2 — 5–6 ký tự mỗi dòng, đọc được ở 250 px (bản thử A đã đọc được ở 168 px)
PASS B3 — 2 dòng, không tag kênh, không dòng phụ (bỏ 「99の発見」/「SCIENCE / PHYSICS」 của bản đang đăng)
PASS B4 — 生成り và đỏ có viền đen trên phòng đen
PASS C1 — EYE LOCK + GLASSES nguyên văn
PASS C2 — sững sờ (cao) khác chirality (nghỉ) và 2048 (cười tự mãn); hợp móc mâu thuẫn
PASS C3 — một nguồn sáng có động cơ (節穴) + dội đỏ + viền lam
PASS C4 — mặt ~1/3 chiều cao, một cử chỉ (chỉ vào táo)
PASS C5 — phòng tối 雨戸, 節穴, 卓袱台, táo, #0B0B0E — đúng khung 0:00–0:05 và 14:30
PASS D1–D2 — lề 40 px, góc phải dưới chỉ là sàn tối
D3–D5 — chỉ kiểm được trên ảnh render (11 ký tự đúng, 5 ngón, 16:9 ≥ 1280×720, ≤ 2 MB)
Verdict: READY TO RENDER (còn D3–D5 + thử 50% / 168 px trên ảnh thật)
```

Rủi ro đã biết: model hay thu nhỏ chữ và mascot trong cảnh nhiều vật (intuition v1) — cảnh này chỉ có táo + bàn + chùm
sáng, nhưng vẫn xin to hơn ~20%. Chữ Nhật dài có thể sai nét: đếm đúng 11 ký tự khi nhận ảnh.

## Outcome

2026-10-14 — người dùng render bằng prompt này → `v1-ringo-akakunai.png` (1672×941, 1.7 MB; bản đăng
`out/ja/hikari/youtube/thumb-tests/v1-ringo-upload.jpg` 1280×720). Người dùng: "Khá đẹp đó".
- Chữ đúng 11 ký tự, đúng nguyên văn; 250 px đọc rõ cả hai dòng; góc phải dưới trống.
- Thử 50% TV: chữ còn trọn, nhưng quả táo nằm ở nửa dưới (~65% chiều cao) → nửa trên còn chữ + mascot, mất vật chính.
  Bản sau: kéo táo + bàn lên cao hơn (prompt đã xin nhưng model đặt thấp).
- Mascot: có nét lông mày nhíu trên mắt trái (gate C1 cấm lông mày) — nhỏ, chấp nhận được ở cỡ xem.
- So với bản đang đăng: `out/ja/hikari/youtube/thumb-tests/v1-vs-current.jpg`.
