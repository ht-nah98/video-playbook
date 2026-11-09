# Gói đăng tập 1 "wrong-turn" — title ↔ thumbnail (chốt 2026-10-28, gói đủ 2026-10-29)

**File đăng:** `out/hist/wrong-turn/youtube/` (title, mô tả, tags, Problems, SRT, 3 thumbnail, bình luận ghim) — checklist từng ô `out/hist/wrong-turn/youtube/UPLOAD.md`.
**Thumbnail dựng bằng code:** `thumbs.html` (A t 0.5 · D t 3.5 · F t 5.5) → `node engine/render/shoot.js stills --page projects/hist/wrong-turn/thumbs.html --t 0.5,3.5,5.5 …`
→ `tools/thumb/check.py <ảnh> -o … --jpg out/hist/wrong-turn/youtube/thumb-<k>.jpg` (thử 50% TV, 250/168 px).

| cặp | thumbnail | title | chữ trên ảnh |
|---|---|---|---|
| A | tách đôi 1914 ảnh thật FF ↔ 1918 chiến hào + người dẫn lính | The Wrong Turn That Killed 20 Million People | 1914 / 1918, ONE TURN? |
| D | kiểu Thanh Pahm: nền tia vàng, Áo-Hung giận ↔ Serbia hoảng, người dẫn cầm vô-lăng | Nobody Told the Driver (And It Started World War 1) | WORLD WAR 1 |
| F | domino 5 nước, người dẫn đẩy xe tí hon | How One Wrong Turn Started World War 1 (title chính) | OOPS. |

## Đường đi (để tập sau khỏi lặp)
1. Prompt ảnh AI "điện ảnh" (con phố, xe, mũi tên đỏ — 2 vòng) → ảnh người dùng gen "không nổi bật", "quá kém" (LESSONS §206).
2. Người dùng soi Thanh Pahm / OverSimplified: thumbnail dựng từ CHÍNH dàn nhân vật của video + cắt ghép meme, không gen ảnh thật →
   mình dựng 6 hướng trong `thumbs.html` (A tách đôi, B nền trắng, C cảm xúc, D Thanh Pahm, E OverSimplified, F domino).
3. Người dùng chọn A + D + F làm Test & compare. F làm to lại cho 168 px (bỏ Nga — hình Nga lẫn vào Đức ở cỡ nhỏ).
Luật: title và chữ trên ảnh không lặp nhau (PACKAGING §2a); ảnh thật PD chỉ là một mảnh dán, người dẫn vẽ nét luôn có mặt.

Số người chết WW1 ≈ 20 triệu (lính + dân; các nguồn 15–22 triệu) — giữ "20 million" trong title, lời đọc và mô tả ghi khoảng.
