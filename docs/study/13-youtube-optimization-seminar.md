# 13 — Tối ưu YouTube: title, thumbnail cho TV, giữ chân, đọc chỉ số, thuật toán (đợt seminar, 2026-10-24)

Người dùng chuẩn bị seminar chia sẻ kiến thức YouTube (slide ở `~/Desktop/seminar-youtube/`, ngoài repo) rồi bảo: "những thứ
chúng ta vừa làm cũng là kiến thức để tối ưu cho các video sau này của chúng ta". File này giữ bằng chứng; luật làm được đã
gom vào `docs/lesson/PACKAGING.md` (§3a, §8a, §10). Bối cảnh của ta: §144 — quy trình mới làm NỘI DUNG tốt hơn nhưng GÓI kéo
bấm kém hơn (CTR 1.34% vs 3.12%), nên phần gói đăng và đọc số là chỗ cần áp nhất.

## Nguồn

| # | video / trang | ngày | lấy gì |
|---|---|---|---|
| a | Aprilynne Alter — “give me 8 minutes, I’ll make your titles 81% better” `cF0wTWOQE1s` | 02/2025 | 5 lỗi title; khi nào đổi title |
| b | Aprilynne — “give me 9 minutes, I’ll make your thumbnails 81% better” `KE4zqD0ONDI` | 08/2026 | **thumbnail cho TV** (đã học ở 02, nay có số + cách kiểm) |
| c | Aprilynne — “how to make a killer youtube thumbnail” `0TolBiTrUg4` | 12/2023 | công thức 4 phần; scroll stopper; tương phản; 3 bản dự phòng |
| d | Aprilynne — “you have thumbnail blindness” `igk3kvNQRVQ` | 10/2026 | nhân vật chính = lý do bấm; biến thể khác ý tưởng |
| e | Aprilynne — “how to make a killer youtube intro” `TOHQXdCAo5k` | 09/2023 | câu đầu = title, khung đầu = thumbnail (Mark Rober); nhịp intro |
| f | Aprilynne — “My BIGGEST Advice for Starting and Growing a YouTube Channel” `EBMhiweVN2E` | 10/2025 | 0→1K→10K→100K; 30 title/20 phút; lỗi bấm / xem / ý tưởng; ra mắt 4 video |
| g | Aprilynne — “The EXACT System to Blow Up on YouTube in 90 Days” `n5upxXteYuY` | 09/2025 | 3 pha; tự đánh giá sau mỗi video |
| h | Aprilynne — “Stop Copying Big YouTubers” `659t-D3e0Z0`; “I REGRET Making YouTube Shorts” `Izmx3UVjNIc` | 01/2025; 07/2023 | mượn MỘT yếu tố; Shorts kéo sub kém (số 2023) |
| i | Aprilynne × Amjad Hanif (VP Creator Products) — “How to ACTUALLY Use YouTube Studio” `oGjHGcmHin4` | 09/2024 | đọc Studio; CTR cao ≠ thắng; thẻ quốc gia |
| j | Creator Insider — “YouTube Algorithm 2026” (Rene Ritchie × Todd Beaupré, Growth & Discovery) `rHLjxrbXmmY` | 2026 | thuật toán “kéo”; 6 lời đồn; nguồn cấp kênh đăng ký |
| k | Creator Insider — “Paddy Galloway Dives Deep on Video A/B & Ask Studio” `j7GtybYc6gk` | 2026 | quy trình phân tích của Paddy; thumbnail động; A/B video |
| l | YouTube Help — “Measure key moments for audience retention” (answer/9314415); “Add tags” (146402); YPP eligibility (72851); Blog — “On YouTube’s recommendation system” | — | định nghĩa chính thức |
| m | Quan Ngo — “15 Cài Đặt YouTube QUAN TRỌNG…” `XmwaLebHOGg` | 10/2026 | thiết lập kênh (đối chiếu từng mẹo với YouTube Help) |
| n | Video Facebook “Hành trình 30 ngày kiếm tiền với YouTube — ngày 12” (tệp người dùng tải) | 2026 | mô hình nuôi nhiều kênh — CHỈ làm ví dụ cảnh báo |

Lời j, k do người dùng dán (YouTube chặn tải từ máy — LESSONS §160). Tài trợ đã ghi chú: Spotter Studio (a, f, g, h),
One of Ten (b, d), MoreLogin qua link tiếp thị (n).

## Áp cho video của ta

**Thumbnail (b, c, d)**
- **TV:** Studio → Khán giả → Loại thiết bị; TV ≥ 10% thời gian xem thì phép thử 50% là BẮT BUỘC (giao diện TV chỉ lộ nửa trên
  ở trang chủ và đề xuất). Ta đã có phép thử 50% trong `tools/thumb/check.py` từ 02 — nay biết lý do đo được và ngưỡng.
- Title ngày càng nhỏ so với thumbnail → thumbnail phải tự gợi câu hỏi khi che title (khớp phép thử “che chữ” 05).
- Thiên kiến quen thuộc: mặt người lạ yếu hơn mặt quen → mascot của ta chưa ai biết, nên giữ NHỎ (§113) và để VẬT kể chuyện;
  vật quen (giao diện, đồ vật ai cũng biết) là scroll stopper tốt cho kênh nhỏ.
- Mỗi video: phác 10–15 ý → làm 3 → đăng 1, giữ 2 để thay. Biến thể phải khác Ý TƯỞNG, không chỉ màu nền.
- Tương phản với các thumbnail xung quanh trong ngách (ai cũng tối thì thử sáng…).

**Title (a, f)**
- 30 title / 20 phút: 5′ tự nghĩ · 5′ “5 kênh mẫu” (khán giả khác, cùng kiểu giá trị) · 5′ outlier cùng đề tài · 5′ AI.
- Từ mạnh của NGÁCH: lướt video top của ngách, đếm từ lặp lại. Ý chính ở ~55 ký tự đầu (đã có PACKAGING §2).
- Test & Compare thử được cả title (mở rộng toàn cầu cuối 2025) — chọn thắng theo thời gian xem.

**Mở đầu (e, k)**
- “Title–thumbnail hứa, intro xác nhận” (Paddy). Lỗi hay gặp: mở đầu nhồi “sẽ có cái này, cái kia” — không tiến lên.
- Khi YouTube mở A/B video cho video dài (hiện bắt đầu ở Shorts): thử hai mở đầu của cùng bài — đây là phép đo §144 cần.

**Đọc số sau khi đăng (f, i, j, k, l)**
- Đừng phán xét trong vài giờ đầu; bài toán của ta là evergreen — nhiều video evergreen có phần lớn view sau một tháng (j).
- Lượt hiển thị CAO + CTR THẤP thường là tốt (đang ra ngoài khán giả quen). Chỉ đổi gói khi view, hiển thị, CTR CÙNG thấp, và
  sau “cửa sổ bứt lên” của kênh (dải Typical đổi độ dốc) (a, c, j).
- Lát cắt sạch: Nguồn lưu lượng → Tính năng duyệt → **Nguồn cấp kênh đăng ký** — so CTR / thời gian xem giữa các video ở đây
  để biết lỗi ở NỘI DUNG chứ không phải “thuật toán không đẩy”. CTR ≤ 10% ở nguồn này là bình thường (j).
- Key moments (l): Intro (% còn xem sau 30 s), Top moments, Spike, Dip, phẳng / dốc dần; so với 10 video gần nhất cùng độ dài;
  tách người xem mới / quay lại. Top moment nằm cuối → video sau đưa lên sớm hơn.
- Chẩn đoán flop (f): lỗi BẤM (CTR + hiển thị) / lỗi XEM (AVD, đường giữ chân) / lỗi Ý TƯỞNG (cả hai ổn mà vẫn ít) → thêm một
  luật lọc ý tưởng.
- Paddy (k): view → đường giữ chân → chỉ số khác → “video vừa rồi dạy 3 điều gì”.
- Thẻ quốc gia (i): 5 nước đứng sau nước chính là cơ hội (ta đã làm bản dịch title/mô tả 10 ngôn ngữ — đúng hướng).

**Kênh (f, j)**
- Kênh = thương hiệu khớp MỘT nhóm khán giả (j: sushi cao cấp vs mì mang đi) — đúng lý do ta tách ba kênh.
- Ra mắt kênh mới bằng 4–5 video nối nhau bằng màn hình kết thúc (f; đội Fearless “launch with five videos”) — áp cho kênh
  lịch sử khi lên YouTube (`channels/hist/CHANNEL.md`).
- Thuật toán xét từng video, không “phạt” đổi chủ đề; tắt bình luận không bị phạt; đừng tắt thông báo cho người đăng ký (j).

## Không áp / cảnh báo
- Con số không nguồn: “81%”, “70% retention”, ngưỡng “70–80% viewed” của Shorts trên blog — chỉ tham khảo.
- Số Shorts 2023 (Paddy: 22.7 vs 16.9 sub / 10 000 view) có trước khi YouTube đổi cách đếm view Shorts (31/03/2025) — kiểm
  lại trên kênh ta (§145 đã thấy Shorts ít thành sub).
- Mẹo cộng đồng (m): nhồi 500 ký tự từ khoá/tag (YouTube: tag “vai trò tối thiểu”), CC BY “để quảng bá” (cho người khác dùng
  lại cả để kiếm tiền, không thu hồi), bình luận không kiểm duyệt, ẩn lượt thích — chưa có bằng chứng hoặc rủi ro.
- Mô hình (n): nhiều kênh cùng công thức AI, Gmail né xác minh SĐT, IP/trình duyệt chống phát hiện — đi ngược chính sách
  (YPP “inauthentic content” 15/07/2025; lách xử phạt → chấm dứt mọi kênh liên quan). Không làm.
