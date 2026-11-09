# Săn đề kênh Anh, 2026-11-02 (người dùng chọn hướng "tìm video viral, làm lại theo DNA của mình")

Dữ liệu: `analytics/market/hunt-2026-11-02.json`, công cụ `tools/yt/hunt.py` (YouTube Data API, công khai). Lọc: dài 3–45 phút, đăng từ 11/2025, ≥ 30k view, kênh < 200k sub, title tiếng Anh, view ≥ 3 lần trung vị video dài của chính kênh (trong 50 video gần nhất). Ra 52 video, đã bỏ tay các mục lạc đề (vẽ, mẹo học, đề thi Ấn Độ, chứng khoán).

**Giới hạn:** chỉ thấy video thắng; đề xuất hiện một phần vì mình tìm đúng từ khoá đó; không có CTR, giữ chân, nguồn view; chưa xem video, chưa loại được video chạy quảng cáo.

## Luật làm lại
Mỗi video đứng riêng, không nối bài khác (người dùng 11-02).
Lấy đề tài + lời hứa; lời, ví dụ, hình, cách giải thích là của mình. Cần ≥ 2–3 kênh cùng thắng. Phải nói được bản của ta hơn ở đâu trong một câu. So với mốc CTR 3,24%, giữ chân 30 s 56%, 10,2 sub/1.000 view (`PLAN-2026-11.md`).

## Cụm đề (view · kênh)

| cụm | bằng chứng | góc của ta |
|---|---|---|
| Số ảo, Euler | 470k STEM in Motion (Euler) · 134k STEM in Motion · 131k MR. PRAYOGER · 69k Think Like Feynman · 52k Ciaoidea · 48k Math Quest Club · 36k HistArMat | i là một phần tư vòng quay (tự giải thích đủ, không dựa bài khác) |
| Số e | 108k Simple Math For All · 100k Aion · 69k Po-Shen Loh · 37k Practical stats (kênh 3–72k sub; ba video chỉ 4–5 phút) | Đi từ tiền lãi gộp; nguồn hkt `exponentials-and-logarithms` |
| Tích phân, giải tích | 3,5M No Fluff · 1,2M + 230k DIBEOS · 605k Flash Bytes · 148k STEM in Motion | Nhu cầu lớn nhất, cạnh tranh nặng nhất; nguồn hkt `integrals` |
| Cả môn trong N phút | 605k + 66k Flash Bytes · 98k LohQuality · 46k Math Speedrun · 40k Not Your Classroom | Tóm cuối series; cùng khuôn mà Lượng giác 66k, Giải tích 605k: chủ đề quyết định, không phải khuôn |
| Các tầng số | 300k + 131k ThoughtThrill · 248k Unqualified Tutor · 150k Pi Guy (hằng số) | Thang số từ đếm tới số ảo; dễ thành Short |
| Toán ứng dụng trực quan | 295k Synthetic Mind (Monte Carlo) · 113k + 60k + 43k Mathspark8 · 58k Math with Ming | Khán giả đại học, lệch "from scratch"; để sau |

Cạnh đó: 478k Eigen về logarithm, cùng đề với `en/logarithm` của ta (CTR 0,7% theo người dùng): nên đổi gói bài cũ, không làm lại.

MathVis (kiểm 11-02): kênh **tiếng Nhật**, 24 ngày, 80 video, 494.707 view, 1.860 sub; trung vị video dài 6.724; 24/47 video dài có AI trong title; 3,8 sub/1.000 view. Tăng nhờ tin AI + bài toán nổi tiếng + sản lượng nhiều hơn là nhờ hình.

## Đề xuất thứ tự
1. Số ảo · 2. Số e · 3. Tích phân. Bài 2 "bốn phép đối xứng" tạm dừng.

## Nghiên cứu theo kênh, 2026-11-02 (`tools/yt/market_channels.py`, `market_report.py`; dữ liệu `analytics/market/channels-2026-11-02.json`)
66 kênh cũ + mới, tối đa 200 video gần nhất mỗi kênh. Danh sách chọn theo kênh đã có hit nên lệch về kẻ thắng; view là số hiện tại.

**SEO (61 kênh, so video vượt trội ≥ 3× trung vị với phần còn lại trong CÙNG kênh):** tag, số tag, hashtag trong mô tả/title, chapter: chênh trung vị 0; không có tín hiệu. Mô tả dài hơn ~67 ký tự, 38/61 kênh: rất yếu. Brain Station (489k sub) 0% tag, Numberphile gần 100%. Kết luận: làm SEO đủ gọn, không kỳ vọng tag tạo viral; hơn thua ở đề tài + title + thumbnail + giữ chân (chưa đo được ở kênh người khác).

**Kênh mới (17 kênh tạo từ 2025):** trung vị 11,5k sub; trung vị-của-trung vị 4,4k view/video dài. Nhiều kênh sống nhờ 1 hit: Eigen 478k rồi 9k; Visual Math Lab 92k, trung vị 549; No Fluff top chiếm 57% tổng view. Kênh đều nhất: snsus (31k), STEM in Motion (25k), No Fluff (20k), Codist (15k), Margin (12k).

**Mẫu title lặp ở nhiều kênh:** "X Explained Like You Are 5" · "Every X Explained in N Minutes" · "Best Explanation of X" · "The X I Wish I Had" · "How [nhân vật] Solved X" · "Why X".

**Brain Station Advanced** (Ấn Độ, tạo 12/2024, 489k sub, 350 video): khái niệm kỹ thuật/khoa học 4–19 phút; 0% tag; video gần đây chỉ 9–40k, title chuyển sang dạng câu đố/mồi click. **Dialect** (Mỹ, 2019, 128k, 42 video, ~0,5 video/tháng): vật lý nâng cao 13–25 phút; hit 100k đầu là video thứ 8, sau ~2,5 năm: đường dài, không phải viral nhanh.
