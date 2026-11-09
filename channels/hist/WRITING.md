# Viết lời cho kênh lịch sử

Đọc trước khi viết `projects/hist/<tập>/SCRIPT.md`. Học cách viết từ study 12 §5 (Thanh Pahm) + kịch bản mẫu người dùng gửi
(§6 — bộ máy hài + chỗ mẫu sai sử). Kiểm bằng code trước khi đọc giọng: `python3 tools/voice/script_check.py hist/<tập>`.

## 1. Ba thứ phải có cùng lúc
1. **Đúng sử.** Mỗi dữ kiện có nguồn trong README của tập; chỗ chưa chắc ghi "CẦN KIỂM" và kiểm trước khi đọc giọng. Không
   vì câu đùa mà bẻ sự thật (vd. "Serbia ra lệnh" — sai; chính phủ Serbia không ra lệnh). Đơn giản hoá được, bịa thì không.
   Xong bản nháp → agent độc lập soát sử TỪNG dòng trước khi đọc giọng (§191: bản 3 sót "Đức rủ Ý", "một tài xế rẽ sai").
2. **Thú vị.** Kể như kể cho bạn nghe: nhân quả rõ ("vì… nên…"), chi tiết lạ có thật (quả bom NẢY khỏi mui gập; tài xế
   KHÔNG được báo đổi đường), nhịp gài → trả.
3. **Hài, châm biếm.** Cái hài đến từ SỰ THẬT vô lý, nói bằng giọng người dẫn (CHARACTER §1: người từ 2026 đã biết kết cục).
   Không chế giễu nạn nhân; cảnh có người chết thì nghiêm (study 15 §6).

## 1b. Khung một tập (người dùng 2026-10-27, §187)
Chào → một câu châm toàn cảnh → tên trận / chủ đề → bối cảnh (bản đồ nay vs xưa, ai mạnh, ai thù ai) → sự kiện chính → câu
móc tập sau. Không mở thẳng vào giữa sự kiện. Độ dài theo nội dung — "khoảng 1 phút" là ước lượng, không ép, không hỏi lại.

## 1c. Người dẫn xuất hiện TRONG sự kiện — bằng HÌNH, không bằng lời (người dùng 2026-10-28, sửa lại)
Người dùng (lần 3, sau bản 6): "Tôi bảo bạn làm mascot như 1 nhân vật xuất hiện ở các sự kiện chứ không bảo bạn viết script kiểu
why I know… I am the seventh. Xuất hiện suốt video thì nhàm chán, lặp lại, vô nghĩa." Luật:
- **Không câu tự xưng** ("How do I know? I was…", "that's me", "passenger seat: me"). Lời kể giữ nguyên chuyện; người dẫn chỉ
  CÓ MẶT trên hình, khán giả tự phát hiện → thấy thú vị.
- **Làm bằng một việc đơn giản**: thay MỘT người trong nhóm bằng người dẫn mặc đúng đồ của nhóm (6 sát thủ → 1 trong 6 là người
  dẫn mặc áo sát thủ, cùng cỡ, mặt khác chút — đắc ý giữa đám cau có). Không thêm người thứ bảy, không mũi tên, không nhãn.
- **Chọn chỗ có nghĩa**: ưu tiên chuyện chỉ người TRONG CUỘC mới biết (mật đàm, hội kín, phòng họp phe A / phe B, chiến hào).
  Chuyện công khai ai cũng thấy (xe chạy qua phố) thì KHÔNG cần nhét người dẫn vào. Nếu thật sự vui thì một vai có hành động
  (vd. làm tài xế) — không bắt buộc.
- **Cân bằng + linh hoạt** (số đo study 15 §1: Thanh Pahm nhập vai 4 lần / 18 phút, không lần nào giải thích bằng lời).
  Người dùng sau bản 8: "tăng nhẹ tần xuất xuất hiện của mascot hơn lên 1 xíu thay vì 4 lần trong 18 phút thì nên cân
  nhất các sự xuất hiện bên cạnh các sự kiện quan trọng, có thể cảnh đám đông vẫy vẫy hoặc 1 cảnh nào đó có nhiều nhân vật". Mục tiêu ≈ 1 lần / 1–1.5 phút, mỗi lần một vai khác (sát thủ,
  người trong đám đông vẫy cờ, lính, người hầu phòng họp phe A rồi phe B, người chứng kiến với biểu cảm) — PLAYBOOK §3.
- **Hình phải ra hồn**: toàn thân hoặc bán thân đúng tỉ lệ, không cắt nửa cái đầu sau cửa xe; nếu không dựng được đẹp thì bỏ.
- **Ý tưởng người dùng mô tả là VÍ DỤ, không phải danh sách bắt buộc nhét vào.** Chưa hiểu ý → hỏi lại trước khi dựng (LESSONS §200).

## 2. Văn xuôi, không gạch đầu dòng (LESSONS §34 → §182 — đã lặp lại, có máy chặn)
- Câu đầy đủ, có chủ ngữ – động từ, nối bằng "and / but / so / because / which". Một dòng = một hơi đọc tự nhiên (thường
  1 câu 10–20 từ, hoặc 2 câu dính nhau), KHÔNG phải một nhịp cắt hình. Hình cắt 3 s; lời KHÔNG cắt theo.
- Mảnh câu ("Nineteen.", "Two shots.", "Sarajevo.") là vũ khí: tối đa vài cái cho punchline / sốc, không bao giờ 3 cái liền.
- `script_check.py` báo ✗ khi: mảnh > 25% số câu, chuỗi ≥ 5 mảnh, trung vị < 7 từ/câu. Bài Anh đã duyệt: 10–18%, chuỗi ≤ 4,
  trung vị 9–11. Bản 1 Sarajevo bị chê "quá AI, ngắt ngắt": 54%, chuỗi 6, trung vị 4.
- Đọc to cả đoạn một lần trước khi giao — nghe như người kể hay như máy đọc thẻ?

## 3. Giọng người dẫn (đùa kiểu gì)
- Nói với người xem ("you"), bình luận như người đứng ngay đó: "And this is where I'd like to remind everyone…"
- Châm biếm bằng cách nói giảm / phóng đại sự thật: tối hậu thư 48 giờ → "a list of demands so long it needed its own
  postman". Biết trước kết cục: "It will not be over by Christmas. I checked."
- Gag chạy suốt series (study 12 §5): tính cách cố định cho mỗi nước / nhân vật, quay lại ở tập sau.
- Câu đùa của TA — học cách Thanh Pahm dựng câu đùa, không chép câu đùa.

## 4. Định dạng file (narrate.py)
Phần đọc nằm giữa `## Cold open` và `---`. Một dòng = một hơi (nghỉ 0.35 s), dòng trống = hết ý (0.95 s), `## ` = dừng 1.6 s.
Số viết bằng chữ. Độ dài: giọng adam ×1.1 ≈ 190 từ/phút lời + nghỉ dòng (~0.7 s/dòng) — 60 s ≈ 150 từ.

## 4b. Đánh dấu vật CÓ TÊN + chỗ meme ngay lúc viết (§231)
Vật cụ thể có tên trong câu (một con tàu, một chiếc xe, một cỗ máy) → ghi vào ghi chú đạo diễn cuối SCRIPT để tìm ảnh PD của CHÍNH vật
đó trước khi dựng; 2–3 cú chốt hợp meme (khuôn quen, vẽ lại bằng nhân vật kênh) → ghi luôn ở đó.

## 5. Bảng cảnh đi kèm
Ghi chú cảnh viết ngay đầu mỗi cảnh trong `episode.html` (hình · chỗ người dẫn nhập vai nếu có · tiếng chính); tiếng chi tiết ở
`data/cues.py`. Bảng riêng `SHOTS.md` / `ASSETS.md` đã bỏ (2026-10-28) — chỉ làm khi người dùng muốn duyệt bảng cảnh trước khi dựng.

## 6. Kịch bản mẫu người dùng gửi (Thanh Pahm "Thế Chiến 1", 18 phút, bản chép 2026-10-27)
Đo: ~4 400 từ / 18 phút; câu dài 20–40 từ nối bằng "Vì thế / Tuy nhiên / Vậy nên / Và / Sau đó"; gần như không có mảnh câu
— mảnh chỉ ở chỗ lật ("Nhưng mà không!", "Tí nữa thì quên!"). Đây là lý do bản 1 của ta (54% mảnh) nghe "AI".

**Bộ máy hài — cái nên học (cách dựng, không chép câu):**
| kỹ thuật | ví dụ trong mẫu | luật cho ta |
|---|---|---|
| mở = chào + một câu toàn cảnh có giọng châm | "để quyết định ai mạnh nhất, các quốc gia quyết định sẽ đấm nhau" | câu 1–2: hứa cả tập bằng một nhận định mỉa |
| quốc gia = băng nhóm học trò | "alo", "đánh hội đồng", "bảo kê", "ăn hành", "cà khịa", "băng Liên Minh" | động từ đời thường / tiếng lóng cho hành động ngoại giao; tiếng Anh: *call up, gang up on, beef, get wrecked* |
| thoại bịa giữa các NƯỚC | "Nhờ giúp tao… tao khao trà sữa" — "Nhớ nhiều chân trâu" | được bịa thoại cho nước (rõ là đùa); với NGƯỜI THẬT chỉ dùng câu có thật hoặc diễn ý |
| kết giả rồi lật | "…Chiến tranh Thế giới thứ nhất đã không xảy ra… Nhưng mà không!" | gài → `## ` dừng → câu lật 2 từ |
| câu phán của người kể | "cái tư tưởng mất dạy này", "đẹp trai và hợp gu mình" | người dẫn chen ý kiến riêng vào giữa câu kể (một mệnh đề), không tách thành câu đùa riêng |
| danh sách 3 với cú chót | "1… 2… 3. thằng nào vi phạm làm chó. Và Đức quyết định sẽ làm chó." | quy tắc ba + callback ngay câu sau |
| gag chạy | "kế hoạch… lại bị phá sản" ×3, "ăn hành" ×6 | một cụm cố định cho mỗi nhân vật / nước, lặp có chủ đích |
| cắt treo sang mạch khác | "chỉ còn một chút nữa là chiếm Paris thì…" → "Ở phía Đông," | treo câu, nhảy chuyển cảnh, quay lại sau |
| chuyển ý bằng lời nói thường | "Quay trở lại Đức.", "Lúc này,", "Tí nữa thì quên!" | không cần câu nối hoa mỹ |
| giải thích kiểu nói với bạn | "Đơn giản cho mọi người dễ hiểu thì…" | khái niệm khó → một câu định nghĩa bình dân |
| nghiêm khi chết chóc | chiến hào, diệt chủng Armenia: kể thẳng bằng số, không đùa | đoạn có người chết: câu ngắn hơn, không tiếng lóng |
| số cụ thể | 780 km, 128 thuỷ thủ, 5,2 → 4,1 triệu | mỗi đoạn một con số thật, làm cái đùa đáng tin |
| kết = móc tập sau | "…có một kẻ… THẾ CHIẾN 2" | câu cuối mở tập kế (tập lẻ: quay về móc mở bài) |

**Cái KHÔNG học — mẫu sai sử ở nhiều chỗ** (ta phải kiểm — §1: đúng sử đứng đầu):
"Serbia phái sát thủ" (chính phủ Serbia không ra lệnh — hội kín Black Hand cấp vũ khí cho nhóm Young Bosnia) · "Pháp tuyên
chiến Đức" (Đức tuyên chiến Pháp 3/8) · kế hoạch "của Moltke" (kế hoạch Schlieffen, Moltke thực hiện) · Đức bắn "tàu của Mỹ"
(Lusitania là tàu Anh, 128 người Mỹ chết) · "Mỹ số một về quân sự 1917" (sai — quân đội Mỹ 1917 còn nhỏ) · Lenin "tháng 5"
(về nước tháng 4) · "cuối tháng 9 Liên Minh đầu hàng" (Bulgaria 29/9, Đức đình chiến 11/11). Đơn giản hoá thì được; mỗi
câu "nước X làm Y" phải tra nguồn trong README của tập.

**Chuyển sang tiếng Anh cho khán giả Mỹ:** giữ bộ máy, đổi chất liệu — tiếng lóng Mỹ, so sánh đời sống Mỹ (group chat,
HOA, drive-thru), không dịch câu đùa Việt. Độ dài câu Anh trung vị 12–18 từ (`script_check` ✓). Tập 60 s chỉ chứa được ~3
kỹ thuật lớn; Sarajevo bản 2 dùng: kết giả → "But no", câu phán chen giữa, bẻ huyền thoại, đoạn chết nghiêm.
