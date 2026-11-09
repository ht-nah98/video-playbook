# Gói đăng tập 4 "hitler" — title ↔ thumbnail ↔ 30 s đầu (bản 1, 2026-10-30 — chờ người dùng duyệt)

**Concept MỚI để kiểm thử** (người dùng 10-30: 3 tập đầu cùng dạng "một sai lầm nhỏ"; tập 4 thử dạng khác — tiểu sử dẫn vào WW2):
cuộc đời Hitler kể theo TRỤC THỜI GIAN, mỗi chặng là một quyết định tồi → vì sao thua WW2. Giữ móc "mistake" (trung vị 632k trong
dữ liệu đối thủ) + từ khoá quanh năm "Hitler / WW2". Dài dự kiến 12–15 phút (thử luôn độ dài). Đăng SAU Zimmermann (móc tập 3 giữ).

**Thumbnail dựng bằng code:** `thumbs.html` (A t 0.5 · B t 1.5 · C t 2.5) → `node engine/render/shoot.js stills --page
projects/hist/hitler/thumbs.html --t 0.5,1.5,2.5 --outdir out/hist/hitler/qa/thumbs-v1` → `tools/thumb/check.py` → `out/hist/hitler/youtube/thumb-*.jpg`.
Nhân vật: `_kit/famous.js` (Hitler đầu tròn, băng tay đỏ TRƠN trên bắp tay trái — người dùng chọn 10-30). Người dùng 10-30: xen ẢNH THẬT vào thumbnail (thẻ ảnh, ảnh ghim) — gần gũi, đắt giá hơn. Thế giới khác bộ
wrong-turn (tách đôi / tia / domino), berlin (họp báo / thông cáo rách / TV), pearl (radar / ảnh Arizona / đồng hồ báo thức).

| cặp | thumbnail | title | chữ trên ảnh |
|---|---|---|---|
| A | **bối cảnh video** — bàn bản đồ châu Âu, tuyết phủ phía đông, mũi tên đỏ Berlin → Moscow + **ảnh thật** tù binh Stalingrad 1943 ghim trên bàn; Hitler cười tự tin giơ tay, người dẫn (sĩ quan tuỳ tùng) facepalm | Every Mistake That Made Hitler Lose WW2 | BAD IDEA |
| B | bảng xếp hạng tier list S→D, thẻ = **ẢNH THẬT PD**: tù binh Stalingrad + USS Arizona ở S, Dunkirk ở A, D-Day ở B, St Paul's trong Blitz ở C, tranh màu nước Nhà hát Vienna của Hitler ở D; Hitler mếu | Hitler's Worst Decisions, Ranked | RANKED |
| C | **ẢNH THẬT** PD Dunkirk 26–29/5/1940 (NYP68075) kín khung, Hitler cười vẫy tay | Hitler Had Them Trapped at Dunkirk. Then He Said "Stop." | HE LET THEM GO |

Title A = lời hứa trọn tập (cụm tìm "how did hitler lose ww2"); B = khuôn xếp hạng (cuối video có bảng xếp hạng tổng kết, đúng lời
hứa title); C = một khoảnh khắc + câu nói (khuôn "mistake" của kênh). Title không lặp chữ trên ảnh (PACKAGING §2a).

## 30 s đầu (bốn nhịp PACKAGING §0b — nháp, viết lại ở SCRIPT.md)
1. **Chào (0–5 s):** "Hey everyone. Today, the man who caused the biggest disaster of the twentieth century, and then, luckily for
   the rest of us, kept making mistakes."
2. **Money shot (5–15 s):** "June sixth, 1944. D-Day. The most important morning of the war. And the man who has to personally
   release the tanks… is asleep. And his staff decide not to wake him." — phòng ngủ tối, người dẫn (tuỳ tùng) rón rén giơ tay gõ cửa rồi rụt lại.
   (Soát sử: Jodl CHỌN không đánh thức — tin đổ bộ chính sẽ ở Calais; giờ thức / giờ thả xe tăng lệch theo nguồn → không nêu giờ.)
3. **Mở rộng (15–24 s):** "That wasn't his first mistake. It wasn't even his tenth." — vạch đếm 1…10 bay ra.
4. **Lời hứa (24–30 s):** "So let's go back to where it all started: a young man in Vienna, with a folder full of paintings,
   about to be told no." — tờ đơn dự thi, dấu REJECTED đỏ.

## Mạch tập (chờ bảng dữ kiện soát sử — README.md)
Trường mỹ thuật Vienna (1907, 1908) → đảo chính quán bia 1923 → nắm quyền 1933 → Dunkirk 1940 (lệnh dừng) → Trận Anh quốc (đổi sang
ném bom London) → Barbarossa 1941 → tuyên chiến với Mỹ 11/12/1941 (nối tập 3) → Stalingrad (cấm rút) → D-Day (ngủ) → hầm boongke 1945
→ **bảng xếp hạng tổng kết** (lời hứa title B).

**Một đoạn NGHIÊM** (không đùa): Holocaust + số người chết WW2 — ảnh thật PD, khử màu, nhạc lặng (như đoạn nghiêm tập 3). Cười vào
quyết định và cái tôi của Hitler, KHÔNG BAO GIỜ vào nạn nhân.

**Người dẫn nhập vai:** sĩ quan tuỳ tùng mệt mỏi cầm bìa kẹp hồ sơ — gag chạy: mỗi chặng rụt rè "Mein Führer… are we sure?" rồi bị
lờ đi → cuối tập úp tay che mặt (biểu cảm meme `facepalm`). Nhân vật nổi tiếng: Hitler, Stalin, Churchill (`famous.js`) + thêm
Göring, Rommel, Paulus khi cần (mục mới trong `WHO`).

## Còn chờ
- Người dùng duyệt 3 cặp + quyết băng tay → SCRIPT.md → soát sử độc lập từng dòng → đọc giọng.
