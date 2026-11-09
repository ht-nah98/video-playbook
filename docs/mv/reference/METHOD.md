# Phương pháp soi video mẫu (bắt buộc)

Video: "~/Downloads/Video mẫu.mp4" (300.35s, 1280x720, 30fps). Lyric MV "Nothing Went FOOM — a song by claude".
Mascot: cô gái anime tóc cam, kẹp tóc hình dấu * cam, tai nghe có mic, áo trắng. Còn có một robot nhỏ ("tiny").

BỐI CẢNH: một bản phân tích cũ đã SAI vì nhìn ảnh thu nhỏ. Nó kết luận "nhân vật là PNG đặc,
nét sạch ≥70% thời lượng, mosaic chỉ 1 khung". Thực tế khi zoom ảnh gốc: 0–1.5s nhân vật dựng
TOÀN BỘ bằng các hàng ký tự ASCII tô màu theo ảnh; ~1.7s lớp ký tự vỡ thành hạt từ mép để lộ ảnh
màu; lúc "màu đầy đủ" vẫn còn scanline ngang mảnh phủ lên; mép tóc/tay rã thành hạt. Chữ lớn cũng
được lấp bằng ký tự. ĐỪNG lặp lại lỗi này: đừng kết luận chất liệu từ ảnh nhỏ.

## Quy trình
1. ĐỊNH VỊ: contact sheet 1fps có sẵn ở sheets/sNNN.png (NNN = giây bắt đầu, mỗi tấm 40s, 8x5 ô,
   có timecode). Chỉ dùng để biết lúc nào có gì — KHÔNG dùng để kết luận chất liệu.
2. CHUỖI: với mỗi đoạn/chuyển cảnh, xem chuỗi 6fps:
   ffmpeg -v error -y -ss T -i "~/Downloads/Video mẫu.mp4" -t 3 -vf "fps=6,scale=426:-1,tile=6x3" -frames:v 1 OUT.jpg
3. KHUNG GỐC: trích 1 khung đầy đủ 1280x720: ffmpeg -v error -y -ss T -i "~/Downloads/Video mẫu.mp4" -frames:v 1 OUT.png
4. ZOOM CHẤT LIỆU (bắt buộc cho mọi kết luận về chất liệu nhân vật/chữ/nền):
   ffmpeg -v error -y -ss T -i "~/Downloads/Video mẫu.mp4" -frames:v 1 -vf "crop=240:135:X:Y,scale=960:540:flags=neighbor" OUT.png
   Crop phải nằm TRÊN đối tượng (tính X,Y từ khung gốc 1280x720). Crop vào mặt/tóc/mép nhân vật,
   vào ruột chữ, vào nền.
5. Mỗi kết luận về chất liệu phải có ít nhất một ảnh zoom làm bằng chứng. Nếu zoom vẫn mờ vì nén,
   ghi "không chắc" — đừng đoán.
Dùng ffmpeg qua Bash, đọc ảnh bằng Read. Tên file trong zoom/khung phải có timecode, ví dụ
evidence/<agent>_t012.40_face.png. Chỉ lưu vào evidence/ những ảnh là BẰNG CHỨNG đắt giá (≤ 15 ảnh);
ảnh nháp để ở scratch_<agent>/.

## Báo cáo (ghi vào reports/<agent>.md, tiếng Việt)
A. Dòng thời gian: bảng | từ–đến (giây, chính xác 0.1s) | lời trên màn hình | ý tưởng hình (gọi tên
   cụ thể được) | nhân vật: có mặt? trạng thái chất liệu | chữ: kiểu xử lý | nền: các lớp | chuyển sang
   cảnh sau bằng gì (cắt cứng / whip / zoom xuyên / tan hạt / morph / flash…, kèm số khung) |
B. Chất liệu nhân vật: liệt kê MỌI trạng thái thấy được (ký tự ASCII, hạt, ảnh màu, scanline, viền,
   glow, mép rã…), thời điểm, cách chuyển giữa các trạng thái, kèm đường dẫn ảnh bằng chứng.
   Nhân vật có bao giờ là PNG sạch hoàn toàn, không lớp phủ nào không? Trả lời có bằng chứng zoom.
C. Chữ: mọi kiểu xử lý chữ (font, chất liệu lấp ruột chữ, cách hiện/biến mất, phối cảnh, màu từ khoá).
D. Nền & không gian: lớp nền, sàn, hạt, ánh sáng, camera (zoom/pan/xuyên), độ sâu.
E. Những gì bản cũ có thể đã hiểu sai (nếu thấy).
F. Độ tin cậy: chỗ nào bạn chắc, chỗ nào không.
Trả về cho người gọi: đường dẫn báo cáo + 5 phát hiện quan trọng nhất (ngắn).
