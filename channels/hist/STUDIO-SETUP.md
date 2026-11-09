# Cài kênh Blunderstory trong YouTube Studio (2026-10-29)

## 1. Tuỳ chỉnh → Hồ sơ
- Tên: `Blunderstory` · handle `@blunderstorytv` · ảnh hồ sơ `channels/hist/brand/avatar.png` · biểu ngữ `channels/hist/brand/banner-2560.png`
- Mô tả: `channels/hist/brand/channel-description.txt`
- Đại từ nhân xưng, đường liên kết: để trống (chưa có mạng xã hội khác). Email liên hệ: chỉ email riêng cho kênh, không dùng email cá nhân.

## 2. Tuỳ chỉnh → Thẻ Trang chủ
- Video giới thiệu kênh (người chưa đăng ký): tạm dùng tập đầu wrong-turn; sau này thay bằng trailer 45–60 s.
- Video nổi bật (người đã đăng ký): video mới nhất (mặc định).
- Mục: Video (phổ biến) → khi ≥ 2 tập thêm danh sách phát "Tiny Mistakes, Huge Disasters".

## 3. Cài đặt → Kênh → Thông tin cơ bản
- Quốc gia cư trú: quốc gia THẬT của chủ kênh (ảnh hưởng thuế / kiếm tiền — không khai giả).
- Từ khoá kênh (Studio mới: phân cách bằng DẤU PHẨY, ô ≤ 500 ký tự):
Blunderstory, history, history explained, animated history, funny history, history documentary, historical mistakes, history fails, biggest mistakes in history, world history, ancient history, military history, world war 1, world war 2, history animation, what if history, history for adults

## 4. Cài đặt → Kênh → Cài đặt nâng cao
- Đối tượng: **Không, đặt kênh là không dành cho trẻ em** (nội dung chiến tranh, chết chóc; hoạt hình không có nghĩa là cho trẻ em).

## 5. Cài đặt → Tải lên mặc định
- Tiêu đề: để trống. Danh mục: **Education** (Giáo dục). Ngôn ngữ video + tiêu đề/mô tả: **English**.
- Giấy phép: Standard YouTube License · cho phép nhúng · đăng lên nguồn cấp kênh đăng ký.
- Bình luận: giữ lại bình luận có thể không phù hợp để xem xét · sắp xếp: Hàng đầu.
- Thẻ: `history, history explained, animated history, funny history, blunderstory`
- Mô tả mặc định:
```
[HOOK — 1–2 sentences: the tiny mistake → the huge disaster. Put the topic keywords here.]

⏱️ Chapters
0:00

📚 Sources
-

🎨 Credits
Historical images: public domain / CC0 (credited on screen).
Sound effects: CC0 / public domain.

💥 Blunderstory: history's biggest disasters started with tiny, stupid mistakes.
🔔 Subscribe: https://www.youtube.com/@blunderstorytv?sub_confirmation=1
👀 Spot the narrator? Tell us the timestamp in the comments.
```

## 6. Mỗi video khi đăng
- **Nội dung đã chỉnh sửa / tổng hợp: chọn CÓ** — giọng đọc là giọng clone (YouTube liệt kê "tạo giọng một người để dẫn chuyện" / "clone giọng để lồng tiếng"
  là phải khai). Nhãn chỉ hiện trong mô tả mở rộng; YouTube nói khai báo không giảm tiếp cận, không ảnh hưởng kiếm tiền.
- **Problems** (ô của danh mục Education, ≤ 800 ký tự): 10–14 dòng `M:SS câu hỏi`, mỗi câu trả lời được ngay tại mốc đó (mẫu `out/hist/wrong-turn/youtube/problems.txt`).
- Không dành cho trẻ em · Education · phụ đề `.en.srt` · màn hình kết thúc (video tiếp + đăng ký) · Test & compare thumbnail/title.

## 7. API (token riêng cho kênh — Gmail kinh doanh)
Dùng lại dự án Google Cloud + `~/.config/mascot-mv/client_secret.json` của kênh toán. (1) Cloud Console → Google Auth Platform → Audience →
Test users → thêm Gmail kinh doanh. (2) `! tools/i18n/.venv/bin/python tools/yt/stats.py --ch hist --login` → chọn Gmail kinh doanh / kênh
Blunderstory (`channels/hist/channel.json` youtube_id `UC0cRXjNUYaAWDG6AtJO8prA` — sai kênh thì không lưu). Máy khác: `--remote`.
App Testing → token hết hạn 7 ngày. Phụ đề tay trong Studio không cần API; API cho bản dịch 10 ngôn ngữ.
