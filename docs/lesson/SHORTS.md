# Shorts từ video bài học

Mỗi video dài đã đăng → 5–8 Short dọc để kéo người xem về video gốc. Hình + tiếng lấy THẲNG từ bản cuối
`out/<p>/<p>.mp4` (không render lại cảnh, không thu giọng mới). Chạy thật lần đầu: math-30k, 8 Short (2026-10-07,
`projects/en/math-30k/{shorts.json, SHORTS.md}`). Đã cắt (2026-10-08): math-30k 8, zero-div / pemdas / fifty-percent / pi /
neg-times-neg / zero-power mỗi bài 6; solid-geometry 6 (2026-10-23), logarithm 7 (2026-10-30) — cấu hình `projects/<p>/shorts.json`, ra `out/<p>/shorts/`.

```bash
python3 tools/shorts/sheet.py src <p> /tmp/…/src.jpg 145.9-157.8 870-887   # soi khung gốc có lưới → chọn crop
python3 tools/shorts/short.py <p> [tên…]                                   # cắt → out/<p>/shorts/<tên>.mp4 + .jpg
python3 tools/shorts/sheet.py out <p> /tmp/…/out.jpg [tên…]                # soi Short đã cắt (cột cuối = khung CTA)
```

## 1. Chọn đoạn (đạo diễn, trước khi cấu hình)

- Nguồn ứng viên: `out/<p>/youtube/problems.txt` (câu hỏi người xem tò mò) + chương + cold open của SCRIPT.
- Một Short = MỘT ý tự đứng được, không cần ngữ cảnh trước nó; 20–50 s lời (+ 2.5 s CTA). Ngắn → tỷ lệ xem hết cao.
- **Giây đầu là móc**: câu gây tò mò nhất của đoạn. Nếu câu đó nằm ở cold open hay cuối mục (vd "every time you check a
  clock…") thì đặt nó làm mẩu ĐẦU rồi mới vào giải thích — `pieces` không cần theo thứ tự video.
- Câu mở bằng "But / And / Now, back to…" phụ thuộc ngữ cảnh → bỏ hoặc bắt đầu sau nó.
- Cắt ở biên CÂU (`p2:58`), bỏ câu lan man ở giữa (nhiều mẩu nối nhau được).
- Hook trên đầu (2–3 dòng IN HOA, ≤ 20 ký tự/dòng, `short.py` cảnh báo từ 22, `{chữ}` = vàng): đúng sự thật như lời đọc — "broke set theory" được
  vì lời nói "naive idea of a set was inconsistent"; không phóng đại hơn lời.
- Bảng đề xuất cho người dùng: #, đoạn gốc (m:ss), móc mở đầu, lý do; đề xuất SỐ Short + thứ tự đăng.

## 2. Cấu hình `projects/<p>/shorts.json`

```json
{"cta": "FULL STORY ▶ link below",
 "shorts": [{"name": "florence-ban", "hook": ["A CITY {BANNED}", "THE NUMBERS", "YOU USE TODAY"],
   "pieces": [{"from": "p1a:0", "to": "p1a:0", "video": 6.0, "crop": [1080, 40, 40, 0]},
              {"from": "p2:59", "to": "p2:59", "crop": [1215, 180, 180, 0]},
              {"from": "p2:60", "to": "p2:61", "crop": [1640, 40, 40, 0]}]}]}
```

- `from`/`to` = câu của timeline (`data/<tl>.timeline.json`), gồm hai đầu. Mốc → giây video cuối qua `segments.json`.
- `video` = lấy HÌNH từ giây khác (khi khung gốc của câu móc còn trống — cold open thường mới vẽ chữ đầu).
- `crop [w, x0, x1, y]` trên khung 1920×1080, khung Short 1080×960:
  - w = 1080–1215: phóng to MỘT vật (đồng hồ, bảng chéo hoá, hình tròn tập hợp). Trượt x0 → x1 theo nơi vật xuất hiện.
  - w > 1215 (1500–1920): bố cục RỘNG — hai cột đối chiếu (La Mã | Ả Rập), ba mặt phẳng/yên ngựa/cầu, dòng thời gian,
    sóng. Hiện cả bố cục, thấp hơn khung, giữa vùng hình. Đừng cố phóng to: cắt mất một cột = mất ý.
  - Mascot đứng một bên khung: thường để ra ngoài cửa sổ; không sao.
- Chia mẩu theo CẢNH (mỗi cảnh một crop) chứ không theo ý — một ý trải hai cảnh = hai mẩu.
- `tail`: giữ thêm sau câu cuối (0.4). **Âm** (−0.25) khi cảnh sau / thẻ HỒI chen vào ngay sau câu cuối.

## 3. Bố cục (do `short.py` lo — chỉ đổi khi người dùng yêu cầu)

1080×1920 · tên kênh nhỏ y 80 · hook y 150–420 · khung hình y 440–1400 · phụ đề tâm y 1470 · đáy ~420 px và mép phải
~140 px để trống (nút + tiêu đề YouTube che). Nền = chính khung gốc phóng đầy, mờ, tối đi.
Phụ đề: chữ SCRIPT căn mốc từng từ, số đọc bằng chữ → chữ số (`projects/<p>/spoken.json`, thêm mục mới ở đó), cụm ≤ 3 từ, từ đang
đọc vàng; mỗi cụm TẮT đúng lúc cụm sau hiện (khe < 0.35 s thì giữ chữ, khỏi nháy trống).
Kết: 2.5 s đứng hình ở khung cuối + nhạc tắt dần + thẻ "FULL STORY ▶ link below" (không lấn sang câu/cảnh sau).

## 4. Soi trước khi giao (bắt buộc)

- `sheet.py src` trước khi đặt crop; `sheet.py out` sau khi cắt — xem từng hàng: vật chính có trong khung, chữ gốc không
  bị cắt ngang ý, hook không đè hình.
- **Cột cuối (khung CTA)**: không có thẻ "ACT …", không có năm/tiêu đề của mục sau. Có → `tail` âm.
- Phụ đề không chồng: `short.py` tự dừng nếu hai cụm chồng thời gian; vẫn mở 1 khung độ phân giải gốc ở chỗ chuyển cụm.
- Độ to −16 … −17 LUFS (`ffmpeg -af ebur128`), ngang bản gốc.

## 5. Gói đăng (`projects/<p>/SHORTS.md`, chép sang `out/<p>/shorts/`)

Bảng: #, file, dài, title (≤ 100, đếm bằng code — LESSONS §42), mô tả (1 câu + "Full video: … — linked above." +
3 hashtag: `#shorts #math #<chủ đề>`). Title = câu người xem hay GÕ TÌM ("Why Does an Hour Have 60 Minutes?").

**Hướng dẫn người dùng đăng** (Studio → Upload, giống video thường; dọc + < 3 phút → tự thành Short, link `/shorts/`):
- Details: title + mô tả từ bảng · **Related video = video gốc** (đường chính kéo về video dài) · Not made for kids ·
  Show more → Altered content = **Yes** (giọng tổng hợp) · Education · English.
- Không tải thumbnail (Short không dùng ảnh bìa như video thường; chọn khung bìa trên app điện thoại nếu muốn).
- Video elements: bỏ qua (Short không có end screen/card).
- Visibility: **Schedule** theo lịch — tải hết một lần, hẹn giờ từng cái.
- Sau khi lên: ghim bình luận có link video gốc; trả lời bình luận trong giờ đầu.

**Số thật (Studio 22/10, LESSONS §145):** Shorts 85% lượt xem thật nhưng 1.9 sub / 1.000 (video dài 23.4); chỉ 9 lượt
sang video dài dù luật Related video có sẵn → **kiểm sau 48 h** trên Channel Lab (nguồn "Link trong Shorts" > 0). 8/11
Short ≥ 80% người xem VN, người VN ở lại xem 29% (Mỹ 63%) → **24 h đầu không xem / like / share từ tài khoản ở VN.**
Title thắng = sự thật bất ngờ bằng đời thường ("In 1299, Florence Banned…" 1,467; "Why Is Pi 3.14? Nobody Chose It"
1,442); thua = tên khái niệm ("Why Is 2 to the Power of 0 Equal to 1?" 9).

**Lịch đề xuất:** 3 Short/tuần cách ngày (T2–T4–T6), mạnh nhất trước, xen kẽ "chuyện đời thường/lịch sử" ↔ "hack não";
Short dài/nặng nhất để sau. Hết đợt thì nối Short của video kế để kênh không nguội. Giờ đăng: Studio → Analytics →
Audience → "When your viewers are on YouTube". Kênh Anh (ảnh Studio 5/10–1/11, giờ VN): đỉnh 18–23 h, cao nhất 20–22 h T7 + CN;
đáy 4–9 h; 2 Short/ngày thử 11:30 + 18:00, long T3 + T6 19:00: sóng đề xuất của long tới sau 12–30 h, đỉnh ngày 2–3, nên chọn NGÀY để sóng rơi vào T7–CN (LESSONS §255) (ô chỉ 4 mức, ~90% view là Shorts; giờ đăng không chắc ảnh hưởng lâu dài, đo 4 tuần rồi quyết).
Sau 3 Short đầu đọc "Viewed vs swiped away" + "Average percentage viewed": bị lướt nhiều → sửa giây đầu (hook / mẩu mở).

## Bẫy đã gặp (math-30k, fifty-percent)

| Bẫy | Hậu quả | Luật |
|---|---|---|
| Chữ cuối cụm giữ thêm 0.25 s trong khi cụm sau đã hiện | hai cụm phụ đề đè nhau một khoảnh khắc (người dùng bắt được) | sự kiện phụ đề tắt đúng lúc sự kiện sau bắt đầu; đếm chồng = 0 |
| Kéo dài mẩu cuối để làm CTA | tiếng câu SAU + cảnh sau lọt vào 2.5 s cuối | CTA = đứng hình (`tpad clone`) + đệm im (`apad`), không đọc thêm video gốc |
| Đuôi 0.4 s chạm thẻ hồi / cảnh sau dọn bảng | khung CTA hiện "ACT SIX", hoặc bảng trống (russell) | soi cột cuối `sheet.py out`; `tail` âm |
| Phóng to bố cục hai cột | mất nửa ý (chỉ thấy La Mã hoặc Ả Rập) | w > 1215 → hiện cả bố cục |
| Crop rộng 1440 cho mọi cảnh | vật nhỏ, chữ gốc không đọc được trên điện thoại | mặc định 1215; vật đơn 1080 |
| Khung gốc của câu móc cold open còn trống | giây đầu nhạt | `video` = giây có hình rõ (tem BANNED) |
| Crop đặt theo vật chính, quên chữ ở mép (fifty-percent "24,000 times") | "John Kerric", "e law of large numbers" bị cắt — phải cắt lại 2 lần | trên `sheet.py src` đọc mép TRÁI/PHẢI của MỌI chữ trong mẩu (tiêu đề cảnh, nhãn cuối hàng), cửa sổ phủ hết rồi mới tới vật |
| Video gốc nền tối (DNA đêm) | nền mờ của Short gần đen, khung hình nhỏ khi hiện cả bố cục | chấp nhận được; ưu tiên mẩu có MỘT vật lớn (50%, 2%, 51%) để phóng 1080–1215 |
| Bài cũ chưa có số trong `projects/<p>/spoken.json` | phụ đề Short hiện "four thousand and forty" | thêm mục của bài TRƯỚC khi cắt; bảng riêng từng bài nên không cắn sang bài khác, cụm dài tự áp trước; vẫn tránh cụm quá chung ("ninety-nine") nếu chính bài đó có chỗ phải giữ chữ |
