# 12 — War-Animation (người que chiến tranh) + Thanh Pahm "Thế Chiến 1" (cách kể) — cho kênh kể chuyện lịch sử

Người dùng 2026-10-24: "kênh làm animation người que rất hay… kênh này là cách kể truyện rất hay… visual cũng đỉnh… lấy chủ
đề thế chiến 1… nên thêm effect vào các sự kiện giống Thanh Pahm, chỉ thay người dẫn bằng người que". Nguồn tải ở
scratchpad, chuẩn bị bằng `tools/study/prep.sh` → `out/_lab/study/12-*` (không commit).

| video | kênh | dài | view | nhịp (`pace.py`) |
|---|---|---|---|---|
| [【W-A】Prelude – Battle of Surabaya](https://youtu.be/weWQ6sb9R30) (11/2025) | 單戈動畫 War-Animation (158 k sub) | 2:12 | 0.92 tr | 57 cắt, cảnh giữa **1.94 s**, đứng yên 2.3% |
| [Thế Chiến 1](https://youtu.be/iCAdtp_CNno) (1/2022) | Thanh Pahm | 17:59 | **14.1 tr** | 254 cắt, cảnh giữa **3.27 s**, đứng yên 14%; lời ≈ 270 từ/phút |

## 1. War-Animation — phim người que chiến tranh (gần như không lời)
- **Người que thân ĐẶC, dày** (chi ≈ 0.1 h, đầu tròn, không viền), **phe = màu da** (tím / cam / vàng); vai nhận qua mũ
  sắt, mũ lính, súng. Mặt trống — chỉ cận cảnh mới có miệng / mắt.
- **Quay như phim**: cận, góc thấp, nghiêng, qua vai, chèn vật (băng đạn, súng máy); cắt 1–3 s; nền vector phối cảnh chi
  tiết; hiệu ứng chớp nòng, vệt đạn, vụn tường, nổ khói đen-vàng, máu (nhiều — ta tránh).
- Thiếu: không có NGƯỜI KỂ — đẹp nhưng người xem phải tự biết bối cảnh.

## 2. Thanh Pahm — cách kể (14 tr view)
- **Người dẫn = avatar hoạt hình** góc phải dưới, tay chỉ vào hình — xuất hiện ở ~40% khung, không diễn trong cảnh.
- **Quốc gia = nhân vật**: bản đồ tô cờ có mắt, chân, tay cầm súng / trà sữa ("countryballs"); cảm xúc bằng mắt
  (giận, khóc, cười nhe răng). Bản đồ lớn tô cờ để kể chiến trường; lính hoạt hình nhỏ dàn hàng trên bản đồ.
- **Hình thật xen kẽ**: ảnh / tranh / báo 1914, phim tư liệu, bức điện Zimmermann; lửa, khói, nổ phủ lên.
- **Lời**: tiếng lóng đời thường ("băng đảng", "alo", "tao khao trà sữa", "ăn hành", "đánh hội đồng"), ẩn dụ đánh nhau /
  quả bom, mỗi 1–2 câu một gag hình; móc người xem ("chỗ này là Việt Nam nè"), kết bằng số thương vong + liên hệ Việt
  Nam + móc sang Thế chiến 2. Nhịp nhanh, không dừng.
- Điểm yếu ta không theo: vài chỗ ảnh có watermark Getty, hình nhiều nguồn chắp vá, dữ kiện đôi chỗ giản lược.

## 3. So với ta (bản dựng tạm hist-pilot)
Cảnh của ta dài ~6 s không cắt (pace mỗi cảnh = 1 shot) — gấp 2–3 lần họ; chưa có nhân vật quốc gia, chưa có hiệu ứng
sự kiện; người que của ta nét mảnh (0.045 h) — W-A dày gấp đôi.

## 4. Đề xuất kết hợp (chờ người dùng)
Khung Thanh Pahm (bản đồ + quốc gia biết diễn + ảnh thật + hiệu ứng + lời đời thường, cắt ~3 s) · **người dẫn = người que du
hành** (thay avatar — nhưng SỐNG: phản ứng, có lúc bước vào cảnh như nhân chứng) · **cảnh hành động kiểu W-A** cho vài
khoảnh khắc lớn (Sarajevo, chiến hào, sông Marne, hưu chiến Giáng sinh) bằng người que thân dày, phe = màu cờ.
Bộ đồ nghề dựng một lần, dùng mọi tập: bản đồ biên giới thật (dữ liệu mở) tô cờ + mắt / chân; lính que theo phe; hiệu
ứng (lửa, khói, nổ, chớp nòng) tất định; khung ảnh tư liệu (Commons — ảnh WW1 đều PD); người dẫn.
KHÔNG lấy: câu đùa / thiết kế / kịch bản của Thanh Pahm; máu me của W-A; watermark.

## 5. Công thức viết của Thanh Pahm (đọc toàn bộ lời — người dùng 2026-10-24: "học cách viết script vừa kể chuyện, vừa joke, vừa đưa thông tin")
1. **Quốc gia = nhân vật có TÍNH CÁCH CỐ ĐỊNH** → mọi tình tiết thành chuyện người: Đức tham vọng nóng nảy, Áo-Hung "đàn em
   vô dụng" lúc nào cũng cần cứu, Nga "to xác nhưng vụng", Ý "quay xe", Anh ngại dây vào, Bỉ nhỏ mà lì. Tính cách lặp lại
   = gag chạy suốt bài, người xem đoán trước được và cười vì đoán đúng.
2. **Dịch ngoại giao sang chuyện đời thường**: liên minh = băng đảng, tối hậu thư = "cà khịa", bảo đảm = "bảo kê", tuyên
   chiến = "đánh hội đồng", thua = "ăn hành", đổi phe = "quay xe". Thông tin vẫn đúng, chỉ đổi từ vựng.
3. **Nhịp thông tin → gag**: 2–3 câu dữ kiện thì một câu "đấm" — thường là chữ cuối của nhịp, hoặc câu bỏ lửng "Thì…" + tiếng
   hiệu ứng.
4. **Kế hoạch → thực tế** (gài rồi trả): "Đức định hạ Pháp trong 40 ngày… kết quả 4 năm bất phân thắng bại"; "kế hoạch …
   lại phá sản" lặp như điệp khúc.
5. **Thoại ngắn của quốc gia**, ngôi thứ nhất: "Áo-Hung, mày xử lý bọn Nga nhá." — "Ok." Ngắn, đời, tạo nhân vật.
6. **Người dẫn có cá tính**: chen lời riêng ("hợp gu mình", "tí nữa thì quên", "chỗ này là Việt Nam nè").
7. **Số cụ thể** (40 ngày, 48 giờ, 780 km, 1,5 tỷ người, 10 triệu chết) — đùa nhưng không mơ hồ.
8. **Biết lúc nghiêm**: chiến hào, diệt chủng Armenia, thương vong — kể thẳng, không đùa.
9. **Biển chỉ đường**: "Quay trở lại Đức", "Tóm lại", "Nhìn toàn cảnh cục diện" — người xem không lạc giữa nhiều mặt trận.
10. **Thả tên + móc**: "…ngày nay được biết với cái tên là" (cắt sang tiêu đề); kết móc sang tập sau (Thế chiến 2).

**Bản của ta (không chép câu đùa)**: tiếng Anh; quốc gia nói bằng **bong bóng chữ** (giọng đọc chỉ là người dẫn — gọn,
không cần nhiều giọng); người dẫn là người que **đến từ 2026 nên biết trước kết cục** — điều đó thành gag riêng của ta
("I'm from the future. This plan does not work."); mỗi tập một "điệp khúc" kế hoạch → thực tế.
