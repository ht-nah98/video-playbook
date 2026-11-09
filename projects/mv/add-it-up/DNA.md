# DNA của MV `add-it-up` — "Add It Up" (tích phân = cộng dồn)

> Viết TỪ lời bài và chất liệu hình của bài này (docs/DNA.md). Chi tiết, bảng năng lượng, từng cảnh: `TREATMENT.md`.
> Khung phong cách đã dựng thử: `styleframes.jpg` (bàn thử `tools/lab/riso.html`).

1. **Ý trung tâm:** **xưởng in riso.** Tích phân là *cộng dồn từng mảnh*, và in riso cũng là cộng dồn: mỗi lượt
   máy in thêm MỘT lớp mực, các lớp chồng lên nhau thành hình. Cỗ máy của bài ("Same machine. Different input") là
   một **máy in có đường giấy hình ∫** (∫ là chữ S kéo dài của Leibniz, viết tắt *summa* = tổng): dải giấy vào ở
   trên, chạy dọc chữ S, chồng lại ở khay dưới thành tổng. Họ nguyên hàm F + C chính là **một bản in bị lệch khuôn
   theo chiều dọc**: cùng bản khắc, in nhiều lần, mỗi lần lệch một đoạn C.
2. **Màu mang nghĩa gì:** 4 mực riso in chồng (multiply) trên giấy `#F2EDE4`:
   - hồng huỳnh quang `#FF48B0` = **tốc độ thay đổi** (đầu vào, đạo hàm, chiều cao dải);
   - xanh `#0078BF` = **lượng tích luỹ** (F, tổng, diện tích, thể tích);
   - vàng `#FFE800` = **hằng số C**, ký ức đã mất. Nó gần vô hình trên giấy (tương phản 1.07) đúng như nghĩa;
     khi cần đọc thì có viền key;
   - key `#1F1D24` = chữ, trục, nét. K trong CMYK là chữ viết tắt của *key plate*, nên "accumulation is the key"
     là lượt in key.

   Chỗ hai mực chồng nhau tự ra màu thứ ba, ví dụ hồng + xanh = tím than, tức tốc độ gặp lượng.

   Tương phản đo được: key/giấy 14.3, xanh/giấy 4.1, hồng/giấy 2.65, vàng/giấy 1.07, key/vàng 11.5.
   Áo blouse/giấy chỉ đạt 1.06, nên nhân vật LUÔN có phần đục lỗ cộng bóng in lệch.
3. **Chữ:** ba giọng hát thì ba mặt chữ:
   - rap: Archivo Condensed 800, chữ in hoa, trên dải băng giấy;
   - hát: Cormorant Garamond nghiêng;
   - nói (intro, break, "Why does it work?"): IBM Plex Mono, gõ từng ký tự.

   Chữ vào bằng cách in (các lớp mực lệch khuôn rồi khớp lại trong 0.12s) và ra bằng dao xén (cắt thành dải,
   trượt đi). Chữ làm vật thể: "ADD IT UP" dựng từ dải, "+C" vàng khổng lồ, tem "FROM SCRATCH".
4. **Nhịp:** 22% từ rơi gần beat (BPM 97, beat 0.619s), nên chữ và sự kiện bám lời (`timeline.json`). Nền bám
   stem: cú kick làm các bản in **lệch khuôn rồi khớp lại** (độ lệch ∝ drums), nốt keyboard/guitar ở intro thì
   mỗi nốt in một lượt.
5. **Nhân vật:** **tiết chế, chỉ 6 tư thế + mặt hát nhép**, có mặt khoảng 19% thời lượng, mỗi lần gắn một câu lời
   (TREATMENT § Nhân vật).
   - Chất liệu: bản tách màu riso (key + tram xanh/hồng/vàng), bóng bẹt lệch một mực, giấy đục lỗ dưới người.
   - Vào: in từng lượt vàng → hồng → xanh → key. Ra: xén thành dải dọc rơi khỏi khung.
   - Hát nhép chỉ ở câu "Add it up, piece by piece" của ba điệp khúc.
6. **Chuyển cảnh:** mặc định là **nạp giấy**: tờ cũ trượt lên ra khỏi máy, tờ mới vào từ dưới, kèm dấu cắt.
   Cắt cứng đúng 11 chỗ (TREATMENT § Nhịp), mỗi chỗ gắn một cú đập hoặc cú lặng.
7. **Camera / thế giới:**
   - Khung là mặt bàn in nhìn thẳng, phẳng như ấn phẩm; cái chuyển động là giấy, không phải camera.
   - Bùng ở điệp khúc 2 và điệp khúc cuối (camera chạy theo dải giấy dọc đường ∫) và ở khối tròn xoay (chồng
     giấy xoay 3D).
   - Vật sống qua cảnh: cỗ máy ∫, bồn mực (3t² → 8), họ đường cong lệch khuôn, thanh 99% ở hai đầu bài.
8. **CẤM:**
   - glow, neon, nền tối kiểu vũ trụ, CRT, mosaic ký hiệu, gương: đó là ngôn ngữ của exp-log;
   - alpha để làm sắc độ (sắc độ = tram), trừ lớp vàng C được phép phai đúng câu "let the constant fade away";
   - màu ngoài 4 mực; gradient mượt; bóng đổ 3D mượt;
   - mực in dưới áo nhân vật;
   - chữ fade;
   - công thức trang trí, toán sai;
   - cắt cứng ngoài danh sách;
   - quá 6 tư thế.
9. **Chỉ số sàn chấp nhận:** dự kiến ≥ 7/8 — đo thật bản cuối được **5/8** (`tools/review.mjs`, 2026-10-01).
   - "Nền sáng" 95% và "biên độ sáng" 74 trượt vì chính lựa chọn nền giấy — không áp dụng cho DNA này (LESSONS §28).
   - YDIF trung vị 0.40 là nợ thật; "% pixel đổi" 52.3% đạt (vượt video mẫu 32%).
   - Chưa làm so với TREATMENT: chữ bè in rỗng mực hồng (§5); bồn mực ở "Rate to amount" của điệp khúc 2 (P13b).
