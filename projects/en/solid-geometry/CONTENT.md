# solid-geometry — Pha 0: bóc tách nội dung

**Chủ đề:** Solid Geometry from Scratch (tên tạm) · lời đọc tiếng Anh · nguồn: kịch bản tiếng Việt người dùng gửi
2026-10-09, nguyên văn ở `SCRIPT.vi.md` (10 phần, 19:35).

**Người dùng chốt (2026-10-09):**
- **Tiếng Anh, đổi ví dụ cho hợp người nước ngoài.**
- **Hình: engine 2D + hình 3D chiếu.** Kit có module chiếu 3D: khối, mặt phẳng trong suốt, xoay chậm, nét sạch. Chữ
  và nhãn luôn phẳng (docs/MEDIUM.md, LESSONS §77). Không chen cú studio3d.

**Độ dài:** kịch bản v1 dài 3688 từ. Bài intuition 2209 từ ra 11:49, tức ~0.31 s/từ, nên bài này ≈ **19:20–19:40**
kể cả intro. Đây là bài dài nhất cùng math-30k (19:21).

**Ý trung tâm (đề xuất, chốt ở DNA):** *"Mọi bài toán không gian đều kết thúc trên một tam giác phẳng."*
- Kịch bản gốc tự nói ra ý này hai lần: phần 5 ("mọi con đường đều dẫn về một tam giác") và phần 10 (kinh nghiệm thứ
  nhất).
- Công cụ để đi từ không gian về mặt phẳng là **cái bóng** (hình chiếu). Nó xuất hiện ở định lý ba đường vuông góc,
  góc đường–mặt, khoảng cách.

**Vật xuyên suốt (đề xuất):** **căn phòng** của người xem, một hình hộp.
- Hồi 1: góc tường–trần là giao tuyến.
- Hồi 2: hai cạnh chéo nhau; sàn và trần song song.
- Hồi 4: cột và tường vuông góc với sàn.
- Hồi 6: trần cao 3 m.
- Hồi 7: căn phòng chính là hình hộp, đường chéo của nó là Pythagoras 3D.
- Hồi 8: xếp khối lập phương đơn vị vào chính căn phòng.

## Mạch bài (giữ 10 phần của người dùng; thêm mục lục ở mở bài, gói lại, lần sau)

| # | phần | ý | câu hứa |
|---|---|---|---|
| 0 | mở bài | "thành thật nhé" · ghế ba chân, góc phòng, cầu vượt · **mục lục 3 câu** · câu treo → intro | — |
| 1 | ba viên gạch | điểm, đường, mặt phẳng · mặt phẳng = mặt bàn/hồ kéo vô tận, không bề dày · vẽ bằng hình bình hành, tên P · tiên đề · 4 tính chất (ghế ba chân/chân máy ảnh; thước kẻ; góc tường–trần) · 3 cách xác định mặt phẳng | 1 |
| 2 | vị trí tương đối | hai đường: cắt / song song / **chéo** (cạnh phòng, cầu vượt) · đường–mặt: nằm trong / cắt (kim xuyên giấy) / song song (dây cáp căng) · mặt–mặt: cắt (sách mở) / song song (sàn–trần) | 1 |
| 3 | song song | người đại diện (d ∥ P) · giao tuyến song song với d (thiết diện) · hai đường cắt nhau khoá mặt phẳng (bản lề) · mặt thứ ba cắt hai mặt song song | 1 |
| 4 | vuông góc | đường ⊥ mặt = ⊥ mọi đường · chỉ cần 2 đường cắt nhau · **ba đường vuông góc** (cái bóng) · mặt ⊥ mặt · hệ quả: kẻ ⊥ giao tuyến | 1 → 2 |
| 5 | góc | đường–đường (tịnh tiến, 0–90°) · đường–mặt (thang, hình chiếu, tam giác vuông) · mặt–mặt (sách, ⊥ gáy, 0–90°, laptop 120° → 60°) · **mọi đường dẫn về tam giác** | 2 |
| 6 | khoảng cách | ngắn nhất = vuông góc · điểm–mặt (trần 3 m) · đường–mặt, mặt–mặt: điểm bất kỳ · chéo nhau: đoạn vuông góc chung, mẹo mặt phẳng song song | 2 |
| 7 | khối đa diện | mặt / cạnh / đỉnh · lăng trụ (đùn đa giác; đứng; đều; hộp; lập phương; d² = a² + b² + c²) · chóp (đều; tứ diện 4–4–6) · **5 khối Platon + vì sao chỉ 5** | 3 |
| 8 | thể tích đa diện | đơn vị khối · hộp = xếp khối đơn vị · lăng trụ = đáy × cao (cao ≠ cạnh bên ở lăng trụ xiên) · chóp = ⅓ (lăng trụ cắt thành 3 chóp) · Kim tự tháp: ⅓ lượng đá | 3 |
| 9 | tròn xoay | trụ (chữ nhật quay; πr²h; 2πrh, bóc nhãn lon) · nón (tam giác vuông quay; ⅓πr²h; đường sinh, πrl, hình quạt) · cầu (nửa tròn quay; 4πr²; ⁴⁄₃πr³) · Archimedes ⅔, bia mộ, Cicero | 3 |
| 10 | gói lại + lần sau | về mặt phẳng: "tam giác nào, mặt phẳng nào?" · chuỗi: vị trí → song song/vuông góc → góc/khoảng cách → chiều cao → thể tích · trả lời 3 câu hứa · lần sau: nhìn ra mặt phẳng và đường thẳng trong ghế ba chân, góc phòng | — |

**Mục lục (3 câu hứa):**
1. What are the few simple rules that the whole subject is built on?
2. How do you measure an angle, or a distance, between things that never touch?
3. Where do the volume formulas come from, including that strange one third?

## Soát sự kiện — CẦN SỬA (đã sửa trong SCRIPT.md)

1. **Ví dụ hai đường chéo nhau trong phòng.** Gốc: "Cạnh trên của bức tường trước mặt và cạnh dọc của bức tường bên
   hông không bao giờ gặp nhau."
   - Sai một nửa: tường bên hông có hai cạnh dọc. Cạnh ở góc xa (giáp tường trước mặt) **cắt** cạnh trên ngay tại góc.
   - Chỉ cạnh dọc ở đầu gần (giáp tường sau lưng) mới chéo với cạnh trên.
   - Sửa: chỉ rõ cạnh gần, và nói luôn cặp ở góc xa thì cắt nhau. Câu này thành một khoảnh khắc "cẩn thận" trên hình.
2. **Mặt cầu.** Gốc: "tập hợp mọi điểm cách một điểm cố định." Thiếu "một khoảng không đổi R". Sửa: "at the same
   fixed distance from one point… That fixed distance is the radius."
3. **Góc giữa hai mặt phẳng: ví dụ mâu thuẫn quy ước.** Gốc nói góc lấy từ 0 đến 90°, nhưng lại lấy ví dụ "độ mở
   cuốn sách" và "màn hình laptop so với bàn phím". Laptop thường mở 100–135°.
   - Sửa: thêm câu "laptop mở 120° thì góc giữa hai mặt phẳng là 60°".
   - Góc của hai nửa mặt phẳng (nhị diện) có thể tới 180°, nhưng chương trình định nghĩa góc giữa hai **mặt phẳng**
     trong [0°, 90°].
4. **"Đường dây điện chạy phía trên mặt đường"** làm ví dụ đường thẳng song song mặt phẳng. Dây điện thật bị võng nên
   không phải đường thẳng. Sửa: "a straight cable stretched above a road" (trên hình vẽ là dây căng thẳng).
5. **Lỗi chữ ở bản gốc:** "phức tạp biến thế" → "đến thế"; "bệ nghi" → "bệ vệ". Bản tiếng Anh không bị ảnh hưởng.

## Đúng — giữ nguyên (đã kiểm)

- **4 tính chất**, **3 cách xác định mặt phẳng**: đúng (SGK Hình học 11, ch. II §1). Ghế ba chân không cập kênh vì 3
  điểm luôn đồng phẳng; chân máy ảnh ba chân: đúng.
- **Định lý d ∥ (P)**, giao tuyến song song d, hai mặt phẳng song song (hai đường cắt nhau), mặt thứ ba cắt hai mặt
  song song: đúng.
- **Đường ⊥ mặt** khi ⊥ hai đường cắt nhau trong mặt: đúng.
- **Ba đường vuông góc**: điều kiện "b không nằm trong P, không vuông góc P", a ⊂ P: a ⊥ b ⇔ a ⊥ b' (b' là hình chiếu
  của b). Đúng; tên tiếng Anh "theorem of three perpendiculars" có thật.
- **Mặt ⊥ mặt** khi một mặt chứa đường ⊥ mặt kia; hệ quả kẻ ⊥ giao tuyến: đúng.
- **Góc hai đường** lấy trong [0°, 90°], tịnh tiến giữ hướng: đúng. **Góc đường–mặt** = góc với hình chiếu; 90° khi
  vuông góc: đúng.
- **Đoạn vuông góc chung** của hai đường chéo nhau: tồn tại và duy nhất; mẹo mặt phẳng song song: đúng.
- **Tứ diện:** 4 mặt, 4 đỉnh, 6 cạnh. Đúng; Euler V − E + F = 4 − 6 + 4 = 2.
- **d² = a² + b² + c²** cho đường chéo hình hộp: đúng.
- **Lăng trụ tam giác cắt thành 3 chóp cùng thể tích**: đúng (Euclid, *Elements* XII.7).
- **Thể tích lăng trụ = đáy × cao**, cao là khoảng cách hai mặt đáy, khác cạnh bên ở lăng trụ xiên: đúng.
- **Trụ** πr²h, 2πrh; **nón** ⅓πr²h, πrl, khai triển ra hình quạt; **cầu** 4πr², ⁴⁄₃πr³: đúng. Trụ sinh từ chữ nhật quay
  quanh một cạnh, nón từ tam giác vuông quay quanh cạnh góc vuông, cầu từ nửa hình tròn quay quanh đường kính: đúng.
- **Archimedes**: cầu nội tiếp trụ, V cầu = ⅔ V trụ (đã tính: (4/3)πr³ / (2πr³) = 0.667). Diện tích mặt cầu cũng bằng
  ⅔ diện tích toàn phần của trụ. Ông muốn khắc hình này lên mộ: Plutarch, *Life of Marcellus* 17.
- **5 khối Platon**: tứ diện, lập phương, bát diện, 12 mặt, 20 mặt. Người Hy Lạp biết hơn 2000 năm trước: Euclid,
  *Elements* quyển XIII (~300 TCN), mệnh đề cuối chứng minh chỉ có 5. Xúc xắc d4, d6, d8, d12, d20 của trò nhập vai:
  đúng.

## Lấp thông tin (đã đưa vào SCRIPT.md)

1. **Vì sao chỉ có 5 khối Platon** (~30 s, rất hợp "from scratch", vẽ được). Ở mỗi đỉnh có ít nhất 3 mặt, tổng góc
   phải < 360°. Đã tính bằng code:
   - tam giác 60°: 3 → 180°, 4 → 240°, 5 → 300°, 6 → **360° phẳng**;
   - vuông 90°: 3 → 270°, 4 → **360°**;
   - ngũ giác 108°: 3 → 324°;
   - lục giác 120°: 3 → **360°**.
   Ra đúng 5 cách.
2. **Kim tự tháp Giza bằng số.** Đáy 230.33 m, cao gốc 146.6 m.
   - V = 230.33² × 146.6 / 3 ≈ **2.59 triệu m³**; hộp cùng đáy cùng cao ≈ **7.78 triệu m³** (đã tính).
   - Lời đọc: "about two and a half million… nearly eight million".
   - Nguồn: Wikipedia "Great Pyramid of Giza" (cao gốc 146.6 m, cạnh đáy ~230.3 m).
3. **Cicero tìm thấy mộ Archimedes** (75 TCN, khi làm quan tài vụ ở Sicily) gần Syracuse: mộ bị cây che, ông nhận ra
   nhờ hình cầu và trụ khắc trên đó, rồi cho dọn sạch (Cicero, *Tusculan Disputations* V.64–66). Archimedes mất 212
   TCN, nên "about a hundred and fifty years later" là đúng (137 năm, làm tròn).
4. **"Cái bóng"** = hình chiếu vuông góc, đặt tên ngay ở định lý ba đường vuông góc để các phần sau gọi lại.
5. **Ví dụ quốc tế:** traffic cone, party hat, ice-cream cone (thay nón lá); soda can; d4–d20 của tabletop RPG.

## Hình cần đúng (tính trong code, ném lỗi nếu sai)

- Chiếu 3D: mọi hình (hộp, chóp, lăng trụ, trụ, nón, cầu, Platon) dựng từ toạ độ thật. Nhãn góc/độ dài lên hình phải
  tính từ toạ độ đó, ví dụ hộp 3 × 4 × 12 → chéo 13.
- Tổng góc đỉnh Platon: bảng ở trên (`must`).
- Laptop 120° → 60°.
- Kim tự tháp 2.59 / 7.78 triệu m³.
- ⅔ của Archimedes.
- 5 khối Platon có (V, E, F) đúng:
  - tứ diện (4, 6, 4);
  - lập phương (8, 12, 6);
  - bát diện (6, 12, 8);
  - 12 mặt (20, 30, 12);
  - 20 mặt (12, 30, 20).
- Ba chóp từ lăng trụ: cùng thể tích (tính bằng định thức).

## Tiếng hiệu ứng (docs/lesson/SFX.md) — làm ở pha cảnh

| khoảnh khắc | loại có sẵn / cần thêm |
|---|---|
| điểm đặt xuống, đường kẻ ra | `tick`, `pen` |
| mặt phẳng trượt vào / xoay | `whoosh`, `whoosh-long` |
| ghế bốn chân cập kênh | **cần thêm: gỗ gõ sàn** (CC0) |
| khối xếp vào hộp, lăng trụ cắt thành 3 chóp | `chip`, `snap` |
| bóc nhãn lon | `tear` |
| xúc xắc lăn (5 khối Platon) | **cần thêm: xúc xắc lăn** (CC0) |
| đúng / sai (cặp cạnh góc xa "careful") | `correct`, `error` |

## Ảnh (Wikipedia / Commons → tôi tự tải và soi)

| file | nội dung | loại | gợi ý tìm |
|---|---|---|---|
| `cicero-tomb.jpg` | *Cicero Discovering the Tomb of Archimedes*, Benjamin West (họa sĩ Mỹ, 1738–1820), 1797 | tranh (tưởng tượng lịch sử) | Commons "Benjamin West Cicero Archimedes" |
| `giza.jpg` | Kim tự tháp Khufu (Great Pyramid of Giza) | ảnh thật | Commons "Kheops-Pyramid.jpg" |
| `elements-xiii.jpg` | trang *Elements* (Euclid, nhà toán học Hy Lạp, ~325–~265 TCN) có khối Platon, nếu có bản thảo đẹp | hiện vật | Commons "Euclid Elements Book XIII" (không bắt buộc) |

Còn lại (ghế, tripod, lon, nón, sách, laptop, phòng, cầu vượt, xúc xắc) **vẽ bằng code** trong kit 3D.

## Tư thế mascot (`assets/character-v2/POSES.md`)

- Có sẵn, hợp bài:
  - `pose-wave` (mở);
  - `pose-point` / que chỉ dẫn (chỉ vào hình);
  - `pose-slump` ("this one isn't for me");
  - `pose-compass` (cầm compa: dựng hình, hồi 5–6);
  - `pose-ok` (khép vòng: tròn xoay);
  - `pose-three` (giơ ba ngón: ba viên gạch / ba câu hỏi / ⅓);
  - `pose-fist` (5 khối Platon, "only five").
- **Đề xuất 1–2 tư thế mới** (người dùng tạo ảnh song song, không bắt buộc):
  - mascot **ngồi trên ghế đẩu ba chân**: mở bài và lần sau;
  - mascot **ôm một khối lập phương / cầm xúc xắc d20**: hồi 7.
