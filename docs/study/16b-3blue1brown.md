# Học từ 3Blue1Brown: nội dung, hình ảnh, thương hiệu nhân vật (2026-11-02)

Lý do: người dùng bác việc cho số 9 chạy và tương tác với hình toán; yêu cầu nghiên cứu kỹ trước khi làm tiếp.

## Nguồn và giới hạn

- Số liệu kênh: YouTube Data API (247 video, 8,73 triệu sub, 791 triệu view).
- Mã cảnh công khai `github.com/3b1b/videos`: phân tích văn bản, không chạy. **Giấy phép CC BY-NC-SA: không chép code, hình pi hay file SVG vào kênh mình.** Chỉ học nguyên lý.
- Trang FAQ, About, bài `essence-of-calculus` trên 3blue1brown.com; Q&A trên rosetta.to; bài Stanford Daily 2020.
- Thumbnail và 3 ảnh mẫu nhỏ của 10 video. Chưa xem trọn video, nên nhịp dựng và thời điểm xuất hiện thực tế là suy ra, chưa đo trực tiếp.

## 1. Nhân vật xuất hiện bao nhiêu

Tỉ lệ cảnh có nhân vật theo năm: 2015 7%, 2016 25%, 2017 41%, 2018 35%, 2019 20%, 2020 27%, 2021 23%, 2022 31%, 2023 21%, 2024 23%, 2025 22%, 2026 20%.

Ước lượng theo tổng `self.wait` (thô, code có thể chứa cảnh không dùng): hairy_ball 21%, colliding_blocks 20%, holograms 24%, grover 29%, laplace 30%. Có dự án gần như không có: `cosmic_distance` 6/115 cảnh, `antp` 2/16, video khách 0/9.

**Kết luận:** phần lớn thời lượng là hình toán, không có nhân vật. Nhân vật xuất hiện trong các đoạn chen ngắn, không phải vai chính.

## 2. Nhân vật làm gì

Cảnh toán chính nằm ở file riêng (`attention.py`, `embedding.py`: 0 cảnh có nhân vật). Nhân vật gom ở `supplements.py`: cảnh chen thêm riêng, không trộn vào hình toán.

Khuôn phổ biến `TeacherStudentsScene`: ba học sinh π xanh ở trái, một thầy π nâu ở phải, một ô màn hình nhỏ phía trên chiếu hình đang nói. Mọi người nhìn vào màn hình hoặc nhìn nhau, đổi nét mặt, có khi một người nói một câu trong bong bóng rồi bong bóng biến mất.

Thống kê mã 2024–2026:
- `look_at` 446 lần, `Blink` 203 lần: **mắt là công cụ diễn chính**.
- Biểu cảm nhiều nhất: tease 105, raise_right_hand 103, pondering 95, confused 60, hesitant 51, guilty 43, erm 41, maybe 40, hooray 28. Rất nhiều sắc thái ngờ vực, ít vui mừng; surprised chỉ 8.
- 156 câu nói trong bong bóng, 46% có dấu hỏi. Ngắn: "Wait, why?", "Why logs?", "Is this...useful?", "But...springs are real", "I'm sorry, what?".

**Nhân vật làm được:** thay mặt người xem hỏi, phản đối, bối rối; thầy trả lời hoặc nhận lỗi; chuyển ý. Ví dụ `WhyDoWeCare`: học sinh hỏi "I'm sorry, why do we care?", thầy đáp, rồi quay về hình toán. Họ cũng dùng để làm rõ người xem đang ở đâu ("Physics student" đối với "CS student").

**Nhân vật không làm (theo các mẫu đã đọc):** chạy trên đồ thị, kéo tam giác, làm thay điểm toán. Hình toán tự nói được. Đúng như FAQ: "Every movement on the screen should be deliberate, with an identifiable purpose."

## 3. Thương hiệu

- Logo là mắt phải của tác giả, khoảng 3/4 xanh và 1/4 nâu; tên kênh lấy từ logo. Học sinh π xanh, thầy π nâu, nên **màu nhân vật kể lại tên kênh**.
- Thiết kế một ký hiệu toán đặc, hai mắt trắng to đặt ở đỉnh; thân gần như không đổi, diễn bằng đồng tử, mí và tư thế thân. Bộ biểu cảm vẽ sẵn, nội suy giữa các dáng.
- Nền đen, chữ trắng kiểu LaTeX, màu theo khái niệm, gần như không thay đổi suốt 10 năm: nhận ra ngay mà không cần logo.
- Thumbnail: một hình toán đẹp + 0–3 từ, nền đen. Nhân vật chỉ hiếm khi có. Series dùng tên lặp: "But what is…", "The essence of…", "Chapter n".
- Tiêu đề là câu hỏi hoặc lời hứa hiểu sâu, không cường điệu.

## 4. Nội dung và hình

- "Never start with definitions": định nghĩa là đích. Đi từ cụ thể đến tổng quát; mở bằng bài toán chính.
- Bài `essence-of-calculus` mở bằng lời hứa "feeling like you could have invented calculus", rồi một ví dụ trung tâm (diện tích hình tròn), khái quát dần, tên gọi đến sau.
- Toán có câu chuyện, cảm xúc, cao trào khi hai ý gặp nhau (Stanford Daily). Hình đặt trước, giải thích sau, để người học thấy mình "sở hữu" ý đó.
- "Topic choice matters way more than production quality."
- Làm kỹ: khoảng 3 tuần một video; viết kịch bản không hay thì không đăng. Không chạy theo cái người khác đã làm.
- Video 20–60 phút hiện nay; không cần ép theo thời lượng của họ.

## 5. Áp cho kênh mình

| việc | làm | không làm |
|---|---|---|
| Hình toán | Tự diễn, chiếm phần lớn thời gian (khoảng 75–85%) | Có nhân vật đi trên hình toán |
| Ký tự λ | Chỉ biểu cảm trong đoạn chen ngắn: nhìn ô hình, đổi nét mặt, câu ngắn trong bong bóng | Chạy, nảy, kéo vật; đứng cố định suốt video |
| Mascot anime | Người dẫn truyện ở góc: mở bài, đầu chương, kết | Trộn vai với λ |
| Thương hiệu | Một thiết kế λ cố định, mắt to; màu nhân vật chọn một lần | Đổi kiểu theo bài |
| Bản gốc | Khuôn hỏi–đáp, tinh thần | Chép thiết kế π, code, bố cục đúng y hệt |

Lưu ý: λ có hai chân, dáng thanh, không có "mặt" lớn; muốn đủ biểu cảm phải đặt mắt to ở đỉnh như π và thân đặc hơn, phải thử. Tránh λ cam trong vòng tròn (giống logo Half-Life).

Nguồn: https://www.3blue1brown.com/faq · https://www.3blue1brown.com/about · https://www.3blue1brown.com/lessons/essence-of-calculus · https://github.com/3b1b/videos · https://rosetta.to/u/3blue1brown/q-a-with-grant-sanderson-3blue1brown · https://www.stanforddaily.com/2020/01/24/3blue1brown-creator-grant-sanderson-15-talks-engaging-with-math-using-stories-and-visuals
