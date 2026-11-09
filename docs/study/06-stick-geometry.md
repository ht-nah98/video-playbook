# 06 — Alan Becker, "Animation vs. Geometry" (9:02, ~31 triệu view) — người que trong thế giới toán

Người dùng gửi 2026-10-22 (sau bài calculus): "đưa thêm nhân vật người que vào các video… điểm nhấn siêu thuyệt vời, đặc
biệt trong toán học". Kèm ảnh tham khảo người que trên mạng (meme, bộ tư thế nét tay). Video tải về `out/_lab/study/
stick-geometry/` (không commit), ảnh mỗi 3 s ghép `sheet1–6.jpg`. Video KHÔNG có lời — chỉ học hình và chuyển động.

## Họ làm gì (đã xem hết 181 khung)

1. **Người que SỐNG TRONG hình toán, hình toán là VẬT THỂ có vật lý.** Đứng trên đoạn thẳng, ngồi lên điểm, bẻ đoạn
   thẳng thành góc vuông (0:48–1:09), đu trên đường thẳng (1:57–2:03), trượt xuống cạnh huyền (2:09–2:15), bị kẹt giữa
   các hình vuông a² + b² = c² (3:00–3:54), đẩy / vác ký hiệu φ như một cây gậy (1:45 trở đi).
2. **Phép dựng hình sinh ra từ HÀNH ĐỘNG của nhân vật** — không ai "vẽ" đường vuông góc; nhân vật kéo nó ra. Người xem
   hiểu cấu trúc vì thấy nó được làm ra bằng tay.
3. **Gần như không chữ** — nhãn toán nhỏ (a, b, a:b = 1.618, 90°) đặt đúng chỗ, câu chuyện kể bằng tư thế: tò mò → thử →
   vấp → vỡ lẽ. Phép thử "tắt tiếng có hiểu không" (CRAFT §1) đạt tuyệt đối.
4. **Một màu nhân vật (cam), hình học trắng mảnh trên nền đen**, nét nhân vật DÀY hơn nét hình → luôn tách khỏi nền mà
   vẫn cùng một thế giới (nét tròn đầu, cùng ngôn ngữ đường).
5. **Cỡ nhân vật đổi theo khung**: cận cảnh nhân vật chiếm nửa khung (cảm xúc), toàn cảnh nhân vật tí hon giữa cấu trúc
   lớn (quy mô) — camera kể chuyện bằng tỉ lệ.
6. **Tư thế rõ bóng (silhouette)**: mỗi tư thế đọc được chỉ bằng đường viền — tay chân không chồng lên thân, hướng chuyển
   động (line of action) rõ; dồn nén trước khi nhảy, kéo giãn khi bay.

## Ta đã làm (2026-10-22)

`engine/stick.js` — người que tất định (hàm thuần của tham số; xuôi = ngược từng byte, `tools/lab/stick.html`):
- khung xương theo tỉ lệ chiều cao, đầu tròn rỗng, nét bo tròn; chi phía sau nhạt hơn để đọc chiều sâu;
- 17 tư thế (`P`): dáng nghiêng (stand, think, point, pointUp, push, pull, crouch, sit, jump, fall, sad, aha) và chính diện
  (cheer, shrug, carry, hang, balance); `mix()` nội suy mượt;
- `walk(phase)` + `ground: X => Y`: đi / chạy với bàn chân BÁM đường cong bất kỳ (IK hai đoạn), thân nghiêng theo dốc;
- `feet` / `hands`: chạm đúng điểm (đứng trên một điểm, cầm một vật, đu một đường);
- trả toạ độ khớp → gắn vật (thước, ký hiệu) vào tay.

Bàn thử dựng đúng một cảnh của bài calculus (12 s, `out/_lab/stick-demo.mp4`): người que leo chén y = x² (chân bám
đường cong), dừng nghĩ dưới điểm (1, 1), nhảy lên điểm thứ hai, dang tay giữ thăng bằng CƯỠI nó trượt về (1, 1) — cát
tuyến xoay, số dốc đếm 3 → 2.87 → 2.20 → 2.022, thước tiếp tuyến đỏ hạ xuống, "aha". Thử đẩy điểm xuôi dốc trước: dốc
gắt làm tay không với tới — đổi thành cưỡi điểm (bài học: hành động phải hợp vật lý của hình, chọn hành động trước khi chỉnh tham số).

## Đề xuất (chờ người dùng duyệt)

- **Vai:** mascot anime vẫn là NGƯỜI DẪN (nói, ít tư thế, ≤ 25%); người que là DIỄN VIÊN trong hình toán — làm thay phép
  dựng hình (kéo điểm, đứng trên đồ thị, vác ký hiệu, bị kẹt trong 0/0…). Không thay mascot.
- **Màu theo DNA từng bài** (mặc định mực navy). KHÔNG cam + nền đen: đó là dấu riêng của Alan Becker — học nguyên lý, không
  chép nhân dạng.
- **Nét người que dày hơn nét hình ~1.5×**, cùng ngôn ngữ đường của DNA.
- **Mỗi lần xuất hiện = một HÀNH ĐỘNG gây ra toán** (không đứng làm cảnh): brief cảnh ghi "người que làm gì → hình đổi gì".
- **Tiết chế như mascot:** 3–6 khoảnh khắc mỗi video, mỗi lần 4–12 s.
- Có thể gắn vào bài cũ? Không — bài đã xong không đổi pixel. Bắt đầu từ video sau; nếu người dùng muốn, thử thêm vào
  calculus trước khi đăng (b04–b07 cát tuyến trượt về tiếp tuyến là đúng cảnh của bàn thử).

## Không bắt chước
Định dạng không lời (ta là bài giảng có lời đọc), nền đen neon, câu chuyện đối kháng / hành động mạnh, nhân dạng cam của
Alan Becker.
