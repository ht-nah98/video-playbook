# 01 — "How MrBeast Solved YouTube Retention" (April Lynne Alter, 14:10)

Học ngày 2026-10-14. Bằng chứng (lời, bảng ảnh, nhịp hình) ở `out/_lab/study/mrbeast/` — không commit.
Video tổng hợp lời MrBeast trong các phỏng vấn (Colin & Samir, Coffeezilla, 100 Thieves), thêm ý của Jay Clouse
(input bias) và Paddy Galloway (đồ thị năng lượng), minh hoạ bằng ba video MrBeast: *50 Hours in Antarctica*,
*Ages 1–100 Fight for $500,000*, *$1 vs $1,000,000,000 Yacht*.

## 1. Họ nói gì — khung 5 chặng

| chặng | mục tiêu | cách làm |
|---|---|---|
| **5 giây đầu** | đúng điều tiêu đề + thumbnail đã hứa | câu đầu = tiêu đề; khung hình đầu = thumbnail (cùng bố cục, cùng màu) |
| **20 giây đầu** | lý do ở lại tới cuối | (1) bối cảnh, (2) cược/phần thưởng, (3) khoảng trống tò mò; thêm *input bias*: cho thấy công sức bỏ vào. **Thân bài bắt đầu trước giây 20.** |
| **Thân bài** | giữ đường giữ chân nằm ngang | (1) đổi hình mỗi 3–5 s; (2) tương phản đều đặn (mạch phụ, đổi dạng); (3) chu kỳ năng lượng cao→thấp, mỗi chu kỳ 2–4 phút, ngắn ở đầu, dài ở cuối, phần chậm/xúc động để vào 20% cuối |
| **Kết** | ấn tượng còn lại | lộ phần thưởng lớn, rồi kết ở nốt cao (kịch tính, ấm áp, hài) — không kéo dài sau đó |
| **Hậu kỳ** | cắt mọi đoạn nhạt | 10 người bạn chê thẳng; xem người khác xem, đánh dấu lúc họ chán / cầm điện thoại / bối rối |

## 2. Video tự làm thế nào (đo, không tin lời)

- 296 lần cắt trong 850 s, cảnh dài trung vị **1.7 s**; màn hình đứng yên (< 2% điểm ảnh đổi trong 2 s) chỉ
  **4.6%** thời lượng, chỉ một đoạn ≥ 5 s (ở bảng tóm tắt cuối).
- Dạng "người nói trước camera" mà không bao giờ đứng: chữ lớn đè lên mặt, đổi cỡ khung, xen clip gốc, đồ hoạ
  trắng (bình thí nghiệm 3 lớp lớn dần qua video = vật xuyên suốt), đồ thị năng lượng tô màu.
- Chính video tự áp khung: mở bằng con số + công sức ("một tuần nghiên cứu"), rồi tự mổ xẻ phần mở đầu của
  mình ở 5:45 — và tự nhận lỗi: mở đầu dài 29 s, quá 20 s.
- Kết thúc bằng một bảng tóm tắt một trang (khung 14:06) — đáng chụp lại, người xem lưu ảnh.

## 3. Đánh giá

- **Đáng tin:** các ý cốt lõi là lời MrBeast trích trực tiếp (5 giây đầu, gặp rồi vượt kỳ vọng, cắt mỗi vài
  giây, cho bạn bè chê, xem người khác xem). Khớp với nghiên cứu khác ta đã có (LESSONS, video Pi: mục lục lời
  hứa, vật xuyên suốt).
- **Phóng đại:** "70% với mọi video" không có nguồn; ảnh chụp trong video chỉ là "76% còn xem ở giây 30". Coi
  là quảng cáo cho tiêu đề. "Chu kỳ 2–4 phút" khái quát từ 1–2 video.
- **Không hợp với ta nguyên dạng:** MrBeast là video quay thật, kịch tính tiền thưởng. Ta là bài giảng hoạt hình
  bình tĩnh, giọng đọc. Lấy NGUYÊN LÝ (lời hứa → chứng minh sớm; hình phải đổi; chu kỳ; kết ở đỉnh), không lấy
  dạng (giật gân, cắt 1.7 s, chữ vàng hét).

## 4. Khoảng cách với video của ta (đo 2026-10-14)

`python3 tools/study/pace.py <mp4>` ở 960×540 — "đứng yên": < 2% điểm ảnh đổi so với 2 s trước, nên gõ thêm một
dòng chữ trên bố cục cũ vẫn tính là đứng yên. Số phụ thuộc độ phân giải (đo ở 64×36: mẫu 4.6%, ta 39–67%, thứ tự
giống nhau) — chỉ so các video đo cùng cách. Đã soi ảnh: đoạn đứng yên của ta là bố cục cố định, chỉ gõ thêm từng dòng
(vd. chirality 8:19, hikari 5:40).

| video | đứng yên | đoạn ≥ 5 s | dài nhất | mở đầu tới thân bài* | câu đầu và lời hứa của tiêu đề |
|---|---|---|---|---|---|
| mẫu (April) | **8.6%** | 4 | 16 s (đồ thị) | ~29 s | khớp |
| ja/pi | 52% | 44 | 32 s | ~151 s + intro | gần — câu hỏi tiêu đề ở 12 s |
| ja/2048 | 58% | 43 | 22 s | ~123 s + intro | lệch — chữ 「勝てない」 của tiêu đề lần đầu được đọc ở 13:06 |
| ja/chirality | 59% | 47 | 26 s | ~96 s + intro | gần — "sự sống chỉ dùng một tay" 24 s, câu hỏi tiêu đề 36 s |
| ja/hikari | 60% | 51 | 22 s | ~71 s + intro | lệch — tiêu đề "màu do não tạo ra", câu đầu "hạt ánh sáng bay vào mắt"; lời đáp ở 14:04 |
| en/sudoku | 60% | 27 | 34 s | — | — |

\* giờ chương 2 trong `chapters.txt` trừ intro kênh 20.7 s.

Kết của ta: lời đáp → まとめ (~30–70 s) → 次回 (~20–40 s).

Cái ta đã làm đúng: mục lục lời hứa ("4 câu hỏi" trong hikari = khoảng trống tò mò), chương 30–90 s (chu kỳ
ngắn), vật xuyên suốt, tiếng hiệu ứng ~1/3 s, lời đọc văn xuôi.

## 5. Quyết định của người dùng (2026-10-14)

> "Chúng ta làm nội dung học tập, nên việc bắt đầu nội dung chậm là bình thường vì đoạn đầu chúng ta cần phải truyền
> tải thông điệp… đúc kết MrBeast là một dạng nội dung khác, 3 năm trước, nên chỉ để tham khảo. Chúng ta phải tối ưu
> theo cách riêng của chúng ta."

- **Giữ intro kênh** — kênh học tập, khoa học, khác kênh giải trí.
- **Không giới hạn độ dài mở đầu** (bỏ "thân bài ≤ 20–30 s"): mở đầu bài giảng cần truyền thông điệp.
- **Lấy làm hướng dẫn mềm, không thành cổng số:**
  - câu đầu chạm vào lời hứa của tiêu đề / thumbnail (hikari, 2048 lệch);
  - "đổi hình" nghĩa là bố cục / camera / vật chuyển động — gõ thêm chữ trên bố cục cũ không tính (luật ≤ 3 s đã có
    trong BRIEF-PLATES, nay nói rõ); `pace.py` dùng để SOI đoạn đứng yên dài, không phải ngưỡng đạt/trượt;
  - kết ấm sau lời đáp, まとめ / 次回 gọn.
- Thước đo cuối là biểu đồ giữ chân thật của kênh ta (đề xuất H dưới), không phải số của kênh khác.

## 6. Đề xuất ban đầu (lưu làm lịch sử)

| # | đề xuất | đổi ở đâu | giá |
|---|---|---|---|
| A | **Câu đầu nói lại lời hứa của tiêu đề, khung đầu giống thumbnail.** Chốt title + thumbnail TRƯỚC khi viết SCRIPT (hiện tại chốt sau render). | SCRIPT v1, thứ tự quy trình | rẻ; đổi thứ tự làm việc |
| B | **Thân bài bắt đầu ≤ 30 s.** Mở đầu = lời hứa + cược + mục lục, ≤ 30 s. Lịch sử/bối cảnh dài chuyển vào thân. | SCRIPT, WRITING | trung bình |
| C | **Intro kênh 20.7 s: rút ngắn (vd. bản 3–5 s) hoặc bỏ.** Người xem mới không biết kênh; 21 s logo ở phút đầu là chỗ rơi. | build.json / channel.json, intro | rẻ (đã có intro-short 11 s cho kênh Anh) |
| D | **Không khung nào đứng yên > 4 s** (như trần im lặng SFX 4.5 s): bố cục đổi, camera đẩy/kéo, cắt sang cận, vật chuyển động. Gõ chữ không tính là đổi. Cổng QA: `pace.py` ≤ 15% đứng yên, không đoạn > 6 s. | DNA (luật chuyển động), BRIEF-PLATES, QA trước build | đắt nhất: mỗi plate thêm 1–2 nhịp hình |
| E | **Kết ở đỉnh:** lời đáp lớn → một câu ấm/hài → tên kênh 4 s. まとめ rút còn ≤ 20 s (hoặc thành hình tóm tắt một trang, như mẫu), 次回 ≤ 10 s hoặc lồng vào câu cuối. | SCRIPT, plates h1/h2 | rẻ |
| F | **Mạch phụ để tương phản:** một tuyến nhỏ quay lại mỗi 2–3 phút (vd. mascot làm thí nghiệm dở dang, lộ kết quả ở cuối). | DNA, SCRIPT | trung bình |
| G | **Duyệt "chán" chứ không chỉ duyệt "đúng":** thêm một review đọc bảng ảnh 5 s + lời, đánh dấu chỗ sẽ bỏ đi xem video khác. | vòng review | rẻ |
| H | **Dữ liệu thật:** người dùng gửi ảnh biểu đồ giữ chân (YouTube Studio) của các video đã đăng → đối chiếu điểm rơi với chapters. Kiểm đề xuất nào đúng với kênh ta. | học tiếp | rẻ, giá trị cao nhất |

Không bắt chước: nhịp cắt 1.7 s, chữ hét, cường điệu kiểu "solved YouTube". Kênh ta mạnh ở bình tĩnh và
chính xác; "đổi hình" của ta là chuyển động có nghĩa của hình minh hoạ, không phải cắt cảnh.
