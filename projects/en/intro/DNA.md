# DNA của `intro` — intro kênh "99% from scratch" (3D, studio3d `?set=intro`) — BẢN 2

> **Bản 2 (2026-10-09), sau khi xem bản 1.** Người dùng: *"Lyrics và hình ảnh luôn đi kèm với nhau… effect hiệu ứng
> chuyển động có tần suất diễn ra nhiều hơn nhiều… cách họ làm hình ảnh nhân vật 2D rồi chuyển từ 2D sang 3D. Có thể
> bỏ bớt nhân vật nhưng dùng các hiệu ứng khác thêm vào."* Bản 1 chỉ có ~20 sự kiện trong 26 s, gần như không có chữ
> của lời, mascot chiếm ~40% thời gian. Thước đo lấy từ hai video tham chiếu:
> - p(doom) 22.7–24.3: mỗi từ là một khung, đổi khoảng 0.27 s một lần, chiếm trọn màn hình;
> - video mẫu 93.3: nhân vật vào bằng ảnh 2D sạch, ra bằng cách vỡ thành lưới 3D có phối cảnh (`docs/mv/REFERENCE-TEARDOWN.md` §2).
> Những gì sửa so với bản 1 nằm ở mục 3, 4, 5, 8 bên dưới.

> Người dùng (2026-10-09): tự làm intro riêng thay bản của hkt-project, **làm mới hoàn toàn** (chỉ giữ tên kênh và
> nhân vật), nhạc `intro-99.m4a`, **hai bản để duyệt**: dài (trọn nhạc 25.97 s) và ngắn. Hướng **C "Xây từ nền"**,
> không khí ban đầu là clay (khung mẫu đã xoá khi dọn out/, 2026-10-09). **Bản 2 đổi sang nền tối.**

1. **Ý trung tâm: 99% = 99 trên 100 khối.**
   - Một sàn 10 × 10 ô được lấp dần suốt bài. Đó là thanh "loading" dựng bằng khối.
   - Mở đầu bằng **một khối duy nhất** rơi xuống sàn trống (from scratch). Kết thúc với 99 khối nằm yên và một ô trống
     sáng cam. **Khối thứ 100 lơ lửng phía trên: đó là người xem.**
   - Mọi thứ khác (dấu "?", chữ 99%, mascot) đều dựng từ khối và tan về khối.

2. **Màu — NỀN TỐI (bản 2, người dùng 2026-10-09: "đổi hẳn sang nền tối", theo p(doom) và video mẫu).**

   | vai | màu | ghi chú |
   |---|---|---|
   | nền | mực `#05070C` → `#0E1320` | có ≥ 2 lớp độ sâu: bụi hạt trôi xa + một vệt chân trời sáng mờ (video mẫu §4) |
   | sàn | đen bóng `#0A0D14`, lưới 10 × 10 phát sáng mờ `#2A3550` | bóng loáng, có ánh phản chiếu của khối |
   | khối sàn | xà cừ tối `#1C2230`, cạnh trên sáng | khối tối, đọc ra nhờ ánh sáng viền và bloom (như `stack` của p(doom)) |
   | **chữ lời** | xương `#EEE9DF`, phát sáng nhẹ | bloom nhẹ ở mép |
   | **cam** | `#FF6A2B`, phát sáng mạnh | từ khóa mỗi câu + phần của người xem (dấu ?, ô thứ 100, khối thứ 100) |
   | chớp | xương `#EEE9DF` đầy màn, 2 khung | chớp trắng như p(doom) 22.70 |
   | mascot | ảnh gốc khi 2D; khối **LED** mang màu ảnh khi 3D | |

   Hậu kỳ: bloom 0.6, halation, grain 0.05, vignette 0.4, quang sai màu nhẹ. Chỉ cam và chữ lời được bloom mạnh.

3. **Chữ — LỜI LÀ VẬT THỂ (bản 2).**
   - **Mỗi từ của lời là một khối chữ 3D** (Archivo 900 in hoa, voxel hóa, mỗi khối là một ô), hiện **đúng lúc từ được
     hát**: 41 từ thì 41 lần hiện.
   - Từ **không fade**. Từ vào bằng cách các khối bay vào chốt chỗ, ra bằng cách vỡ thành khối, và chính các khối đó
     thành thứ tiếp theo.
   - **Từ chuyển động theo nghĩa của nó** (động từ của từng câu, có sẵn trong `lyrics.json` của hkt): xem TREATMENT.
   - Chữ to chiếm 50–90% bề ngang khung khi đứng một mình (như p(doom)). Câu dài thì xếp từ thành hàng trong không
     gian, camera đi dọc theo hàng đó.
   - Mỗi câu có đúng **một từ khóa cam**: QUESTION, DOWN, TURN, MOVE, AROUND, TRICKS, GUESSING, GROUND, WHY, SCRATCH.
     Ngoài ra cam vẫn là màu của phần người xem.
   - **Đếm "LOADING nn%"** bằng IBM Plex Mono 500, luôn **bằng đúng số khối trên sàn**. **Tên kênh** ở cuối dùng Archivo 900.

4. **Nhịp — dày (bản 2).**
   - Đoạn có lời: **mỗi từ là một sự kiện**. Đoạn không lời (build, drop): **mỗi beat là một sự kiện** (0.51 s).
   - Đo được: không khung nào giữ nguyên bố cục quá 0.5 s, trừ đoạn dip 15.5–16.5. Có kiểm bằng script.
   - Chuyển giữa các câu: **whip** (camera quất ngang kèm nhòe chuyển động, 6–8 khung) hoặc **chớp** (2 khung mực
     `#2A2D33` đầy màn, như chớp trắng của p(doom) nhưng đảo màu cho nền sáng). Mỗi đầu ô nhịp có một cú.
   - Khối chạm sàn nảy nhẹ và tung bụi khối nhỏ. Có camera rung nhẹ ở các cú đập mạnh (kick của drop).

5. **Nhân vật — ít hơn, 2D vào, 3D ra (bản 2).**
   - **Chỉ 3 lần xuất hiện**, tổng cộng dưới 25% thời lượng: mở bài, "build it from the ground", và cuối bài (mời).
   - Mỗi lần **vào bằng ảnh 2D sạch** (ảnh cắt nền, nét rõ, trên một tấm phẳng). Ở lần mở bài, ảnh **hiện ra trong
     0.25 s qua hiệu ứng khối**: các ô vuông lật mặt.
   - **Ra bằng cách vỡ sang 3D**: tấm ảnh chia thành lưới ô (mỗi ô 14 px mang màu ảnh). Các ô **đẩy nổi lên thành
     khối** có độ sâu, lưới **xoay vào phối cảnh** rồi khối bay đi và thành chữ hoặc vật tiếp theo. Mất 8–14 khung,
     như video mẫu ở giây 93.3.
   - Tư thế: `wave` (mở), `idle` → khối ("build"), `invite` (cuối). Bỏ `ponder` và tư thế 99%: các câu đó do chữ đảm nhận.
   - Không hát nhép.

6. **Chuyển cảnh.**
   - Mặc định là **một thế giới liền, camera chạy liên tục**: sàn ở đó suốt bài.
   - Bản 2: thế giới vẫn liền một khối, nhưng **mỗi câu đổi khung một lần** bằng whip hoặc chớp mực (mục 4). Có 2
     cú cắt cứng kèm chớp: 4.087 và 16.509 (hai câu "99%"). Về đen ở 25.968.
   - Mở bài: từ đen, ánh sáng bật lên khi khối đầu tiên chạm sàn (0.07 s).
   - Kết bài: camera lao vào ô trống cam rồi về đen đúng lúc nhạc tắt. Như vậy intro chèn được giữa hai đoạn video tối.

7. **Camera và thế giới.**
   - Đoạn build trôi chậm, nhìn từ thấp.
   - Đoạn mid nhanh: lia, xoay vòng ("watch it come around"), đẩy vào.
   - Đoạn dip đứng gần như yên.
   - Đoạn drop nhìn từ thấp lên, kiểu anh hùng, và đẩy theo beat.
   - Bóng đổ thật (PCF), sương xa, không có bloom mạnh.

8. **CẤM.**
   - Chữ fade. Từ được hát mà không có trên hình. Khung giữ nguyên quá 0.5 s ngoài đoạn dip (bản 2).
   - Mascot đứng giữa khung quá 2 s (bản 2).
   - Số 99% màu vàng (của intro cũ).
   - Mascot dựng từ ký hiệu toán (đó là của intro cũ).
   - Dán ảnh PNG phẳng của mascot.
   - Cam dùng cho bất cứ thứ gì khác ngoài phần của người xem.
   - Số đếm % không khớp số khối trên sàn.

9. **Toán đúng.**
   - 10 × 10 = 100 ô; "99%" = 99 khối nằm yên.
   - Mỗi khung hình hiện LOADING thì phần trăm = số khối trên sàn. Kiểm bằng assert trong code.
   - Chữ 99% bằng khối phải đọc được ở khung hình đứng yên.

**Chỉ số sàn:** mỗi khung khác khung trước. Không khung nào đứng yên quá 1 s, trừ đoạn dip 15.5–16.5 (cố ý lặng).
