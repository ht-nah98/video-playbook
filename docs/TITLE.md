# Title — công thức chung MỌI kênh (đúc kết 2026-11-06, kênh sử pearl → áp kênh Anh trig-explained)

> Một chủ đề một chỗ. Thumbnail của từng kênh: `channels/hist/PACKAGING.md` (kênh sử), `docs/lesson/PACKAGING.md` (bài học toán).
> Bằng chứng: LESSONS §300 (title đúng công thức vẫn chán), §298, §297 (combo), §114 (lặp chữ ảnh), §124 (title cực đoan phải có thật).
> Phán quyết cuối = **CTR thật** (Test & Compare); điểm tự chấm chỉ để loại phương án tồi.

## 1. Phép thử quyết định: CÂU HỎI BẬT RA
Viết bên cạnh mỗi title câu người xem **tự hỏi** ngay sau khi đọc.
- Không viết được câu hỏi → title đang KỂ, bỏ. Dấu hiệu: động từ trung tính (*Said, Got, Was, Is Just*), dạng tên chương (*X, Finally Explained*).
- Title đã chứa đáp án (*…All Three Were Ignored*, *Sine Is Just a Height*) → bỏ.
- Người dùng (11-06): "đọc title không có 1 tý hấp dẫn nào… không có khoảng trống tò mò" → bộ này là lý do có file này.

## 2. Nguyên liệu: chi tiết NGƯỢC ĐỜI CÓ THẬT trong lời
Đọc `SCRIPT.md`, gạch mọi chỗ: con số cụ thể · việc vô lý · điều trái niềm tin phổ biến · câu nói đáng nhớ của chính lời.
Title chỉ dùng dữ kiện CÓ trong lời đã soát (không thêm giờ / số mới — suýt thêm "7:20" ở pearl).
Câu hay nhất thường nằm sẵn trong lời: *"We just never told it how far to walk"* (trig), *"Don't worry about it"* (pearl).

## 3. Sáu khuôn — viết ≥ 8 phương án trải đủ khuôn rồi chấm
| khuôn | dạng | thắng khi | ví dụ của mình |
|---|---|---|---|
| **Khẳng định-câu đố** | một nửa câu đố; ảnh giữ nửa kia | ảnh + title ghép thành câu đố | *The Most Expensive Sentence in American History* ↔ ảnh "DON'T WORRY" |
| **Điều tốt → kết quả ngược** | [có thứ tốt + số]. Then [vô lý]. | có con số + chi tiết vô lý thật | *Radar Saw Pearl Harbor Coming 53 Minutes Early. Then Came Breakfast.* |
| **Vật nhỏ → hậu quả lớn** | How [vật nhỏ] [hậu quả] / The Most Expensive [vật nhỏ] | = slogan kênh sử | *How 200 Soldiers Took Down The Inca Empire* (thị trường) |
| **Why** | câu hỏi THẬT người xem đang gõ | trúng câu tìm kiếm + video trả lời | *Why Did Nobody Stop Pearl Harbor? Radar Saw It Coming.* |
| **How / What** | How did… / What does… really… | bí ẩn quanh một vật / một khái niệm | *What happened to the USS Arizona?* 9,4 tr (thị trường) |
| **What if** | What if… / Could… | CHỈ khi lời có câu trả lời | *Could A Single F-15E Have Stopped … Pearl Harbor?* 2,2 tr |
Số liệu (11-06): kênh sử thị trường, title How / Why / What trung vị 2,6 tr view vs khẳng định 1,3 tr — gần như không có "?" (dạng "How + chuyện
khó tin"); đề Pearl Harbor (YouTube API, `out/hist/_market/pearl-titles.json`): câu hỏi thắng khi trúng câu người ta đang tìm, góc nói thẳng
đáp án chỉ 0,11 tr. Là VIEW, chưa phải CTR.

## 4. Luật cứng
- ≤ 100 ký tự, nên ≤ 60 (điện thoại cắt); **lời hứa trong 50 ký tự đầu**; từ khoá đề có mặt ở ≥ 2 / 3 title.
- **Không lặp chữ / số trên ảnh** (§114) — `python3 tools/thumb/check.py --pair "<chữ trên ảnh>" "<title>"` (mã 1 = trùng, kể cả số "3" ↔ "×3").
- **Không khẳng định quá điều video kết luận**; không câu hỏi gợi thuyết âm mưu (*…a Surprise? It Wasn't.*); title cực đoan phải có ≥ 1 sự thật trong video (§124).
- **Bộ Test & Compare = 3 KHUÔN khác nhau** (vd khẳng định-câu đố / Why / How) → kết quả cho biết khuôn nào thắng ở kênh; 7 ngày sau ghi `channels/THUMB-LOG.md`.
- Đổi title A → sửa 2 câu đầu mô tả cùng lúc.

## 5. Chấm (0–2 mỗi tiêu chí, ≥ 8 / 10 mới vào bộ)
S trúng câu người ta tìm · Q câu hỏi bật ra · N ngược đời / cụ thể · G giọng kênh · Đ đúng kết luận video. Ghi bảng chấm vào gói của bài (`PACKAGING.md` / `COMBOS.md`).

## 7. Short (kênh sử)
- Short KHÔNG có thumbnail: **khung đầu + dòng móc trên khung** làm việc của thumbnail → title và dòng móc là hai nửa câu đố, không lặp chữ (như §4).
- Ngắn hơn: ≤ 50 ký tự (màn hình dọc cắt sớm); khuôn hợp nhất: khẳng định-câu đố, Why, "điều tốt → kết quả ngược".
- Phép thử §1 giữ nguyên; nguyên liệu = câu móc ở 0 s + chi tiết ngược đời của Short đó. Short của một tập dài không dùng lại title tập dài.
- Nghiên cứu khuôn trong đề: `tools/yt/topic_titles.py … --short`.

## 8. Công cụ
- `python3 tools/thumb/check.py --pair "<chữ trên ảnh / dòng móc>" "<title>"` — độ dài, 50 ký tự đầu, trùng từ / số (mã 1 = hỏng).
- `tools/i18n/.venv/bin/python tools/yt/topic_titles.py <ra.json> "<cụm>"… [--must …] [--noise …] [--short]` — khuôn nào thắng trong đề (YouTube API, công khai);
  có ra.json sẵn thì chỉ phân tích lại. vidIQ (`vidiq_score_title`) chấm CTR dự đoán khi còn credit (hết credit 11-06).

## 6. Sổ ví dụ (thêm dòng mỗi bài)
| bài | bị chê / bỏ | chốt | khuôn |
|---|---|---|---|
| hist/pearl | *The 4 Words Said Right Before Pearl Harbor* · *…It Didn't Matter* · *…All Three Were Ignored* | *The Most Expensive Sentence in American History* · *Why Did Nobody Stop Pearl Harbor? Radar Saw It Coming.* · *How Did America Sleep Through Pearl Harbor's Warnings?* | câu đố / Why / How |
| en/trig-explained | *Trigonometry, Finally Explained: What Sine Really Measures* (tên chương) · *Sine Is Just a Height…* (lộ đáp án) · *Why Your Calculator Is Right Both Times* (nhắc lại ảnh) | *Your Calculator Isn't Broken. You Never Told It How Far to Walk.* · *What Does Sine Actually Measure? Trigonometry in One Picture* · *Why Does Your Calculator Have a DEG/RAD Button? (Trig Explained)* | câu đố / What / Why |
