# UPGRADE-NOTES — nhận xét ngoài, đã lọc

*2026-09-30. Nguồn: nhận xét của một người bạn (`hkt-project/docs/LYRIC_VIDEO.md`,
`src/web/README.md`), đọc đối chiếu với exp-log 0–64s.*

Đây là **nhận xét, không phải nguyên tắc**. Chỉ ghi những điểm thấy hợp lý với
MV này; điểm chưa đúng hoặc chưa rõ thì bỏ. Khi một mục đã được kiểm bằng lỗi thật
thì chuyển nó sang `LESSONS.md` hoặc `DNA.md`.

---

## Số đo hiện trạng (dùng công cụ của họ, cùng cách đo với video mẫu)

`measure_motion.py`: 2 fps, 160×90, xám, mực ở 40/255, motion = |Δ| trung bình.

| | motion | mực | khoảng gần tĩnh |
|---|---|---|---|
| video mẫu, cả phim | 25.70 | 58.0% | 0% |
| video mẫu, 26s đầu | 34.36 | 30.0% | — |
| **exp-log 0–64s** | **6.19** | **9.5%** | **12.5%** |

Từng đoạn 8s: motion 4.1–10.3, mực 5.6–18.5%. Các nửa giây gần tĩnh:
0–1.5, 4, 5.5, 8.5, 10.5, 15, 18, **30–33.5** (P07/P08), **62–63.5** (con dấu
LOGARITHM đứng yên).

Khớp với feedback camera của khách: vấn đề là **nền navy trống**, không phải
thiếu camera. Hướng nâng cấp là làm giàu lớp nền, không phải lắc khung.

---

## 0. Khách chốt (2026-09-30): tất cả đều linh hoạt, phục vụ câu chuyện

> *"Mọi lớp đều trôi nhẹ khi mà mình chưa có các sự bùng nổ thôi. Còn nếu có sự
> bùng nổ thì chúng ta đã có các hiệu ứng, camera thay đổi, với rất nhiều style,
> phong cách, xây dựng thế giới ở background chứ không phải nền. … Tất cả đều
> flexible không phải nguyên tắc cứng. … xây dựng bối cảnh câu chuyện các thành
> phần liên kết quan trọng lắm."*

- Trôi nhẹ chỉ là mức sàn cho đoạn **lặng, trước bùng nổ**. Lúc bùng nổ thì dùng
  hiệu ứng, camera, đổi phong cách.
- Background là **một thế giới** có vật, có không gian, có logic, không phải một
  tấm nền phủ màu.
- Thước đo cao nhất: có hợp với lời, với bài, với bối cảnh câu chuyện không.
  Các vật và các cảnh phải **nối với nhau** (vật của cảnh trước đi tiếp, biến đổi
  ở cảnh sau), như cỗ máy đi từ P11a sang P11b.
- Mọi mục dưới đây là gợi ý, không phải luật.

## 1. Mọi lớp đều trôi nhẹ theo t — ở đoạn lặng, kể cả khi camera cố định

Video mẫu không có nửa giây nào đứng yên, nhưng không nhờ camera: **mỗi lớp có
một chuyển động trôi riêng, là hàm của t, không phụ thuộc beat**. Các cử chỉ bám
beat nằm chồng lên trên.

- Không mâu thuẫn với luật "cố định camera trên nền trống": trôi là của lớp
  (sàn chữ, bokeh, chữ nền), không phải của khung.
- Áp dụng: cảnh "giữ" (hold) như con dấu 63.82 hay P07/P08 cần một lớp trôi,
  ví dụ ruột `fillWord` chạy nhanh hơn, sàn chữ lướt, hoặc hạt bụi.
- Ngưỡng tham khảo: mực khoảng 30% (mức 26s đầu của mẫu, không phải 58% trung
  bình), không còn khoảng gần tĩnh nào ngoài chỗ cố ý im.

## 2. Nền làm bằng CHÍNH LỜI BÀI HÁT

Ở video mẫu, lớp chữ nền lát kín chính là điệp khúc. Sàn chữ của ta
(`glyphFloor`) đang dùng ký hiệu toán ngẫu nhiên.

- Áp dụng: cho `glyphFloor` / `textRings` nhận danh sách chữ lấy từ lời đang hát
  hoặc từ khoá của đoạn (`forward`, `back`, `3 → 8`…). P11 đã làm vậy với vòng
  chữ; mở rộng ra sàn và cho các đoạn sau.

## 3. Lắp ráp và "chốt" là hai sự kiện; cú chốt rơi đúng beat

Trang báo ở mẫu tự dựng 2.5s bằng màu **xám**, rồi mới **bừng trắng đúng beat**.
Mắt đã đọc xong hình, nên beat chỉ mang lực nhấn chứ không phải thông tin mới.

- Áp dụng: vật thể lớn (cỗ máy, kính vạn hoa, LOGARITHM) có thể dựng lên bất kỳ
  lúc nào trong ô nhịp, nhưng **đủ màu, đủ cỡ, đủ sáng chỉ ở một beat**.
- Hợp với ghi nhớ cũ "chữ bám lời, nền bám nhịp".

## 4. Chọn vật thể theo ĐỘNG TỪ của câu, không theo chủ đề

Hỏi câu hát đang **làm gì**: so sánh → cân (chữ nằm trong đĩa cân); khẳng định →
trang báo; hệ quả → sổ/biên lai; câu hỏi không lời đáp → phòng trống; đếm/tăng
tốc → đường cong, bộ đếm; phủ định/đảo → vật của cảnh trước bị lật hoặc gạch.

- Kiểm nhanh: **hai câu liền nhau cùng một vật thể là một câu chưa được đọc kỹ.**
- Chữ là **khối lượng trên cân**, không phải phụ đề dưới hình cân.

## 5. Hai lớp chữ cùng khung được, nếu là hai "loài" khác nhau

Chữ của thế giới (tĩnh, thuộc vật thể) và lời hát (đang đến, có nền riêng) sống
chung một khung mà không ai phải né ai. Dọn trống khung cho lời hát là thứ đẻ ra
khung trống.

## 6. Hiệu ứng bị cắt ngang = chưa xảy ra

- **Trễ theo từng ký tự phải là tỉ lệ của dòng, không phải hằng số**: `i·0.035`
  với 20 ký tự cộng cửa sổ 0.72 cần 1.385 > 1 → nửa dòng không kịp xong. Cần kiểm
  `decodeLine`/`burstText` với dòng dài nhất bài.
- **Quay về phải quay về ở mọi thuộc tính**: test vị trí ở u = 1 có thể đúng
  trong khi góc lệch 90°. P10 xoay 180° rồi quay đủ 2π — test phải khẳng định
  cả **góc**, không chỉ x/y.
- **Xong phải kịp được thấy xong**: cho động tác kết thúc ở khoảng 0.72 cửa sổ
  để dòng đứng yên vài khung trước cú cắt.

## 7. Trạng thái Canvas2D rò giữa các hàm

`textAlign`, `textBaseline`, `font`, `lineWidth` sống qua lần gọi không có
`save()/restore()`. Một helper tự tính vị trí sẽ phụ thuộc cả **thứ tự vẽ**.
→ Mỗi helper tự khai báo căn lề của mình.

## 8. Nhân vật di chuyển quanh chữ; chữ không né nhân vật

Khai báo "sân khấu" cho từng câu: một khai báo cho ra hộp của nhân vật, hộp của
dòng chữ, hộp phụ. Dùng tư thế và crop nửa thân (bust) đặt góc như công cụ bố
cục; chữ tự co để vừa hộp được cấp. Khoảng bay của hiệu ứng lấy từ hộp, không
chọn tay.

## 9. Kiểm trước và sau khi render

- **Trước**: 6–12 khung thăm dò rải khắp bài. Nếu nhìn khung không đoán được
  câu đang hát thì nền đã lấn át lời.
- **Sau**: đo motion/mực (bảng trên) và quét vùng trống (phải có cả mực **và**
  độ sáng đỉnh, vì một tấm xám phẳng cũng "phủ kín"). Công cụ tham khảo:
  hkt-project `scripts/measure_motion.py`, `scripts/check_coverage_sweep.py`.

## 10. Âm thanh: không nén lại khi không cần

Đã kiểm (2026-10-01): `song.m4a` thực ra là **Opus**, không phải AAC, nên bản
ghép cũ (`-c:a aac 256k`) là nén một lần Opus → AAC chứ không phải "AAC thế hệ
hai" như nhận xét đoán. Dù vậy, chép nguyên vẫn tốt hơn: `stitch.mjs` nay chép
nguyên luồng gốc khi đoạn ghép bắt đầu từ 0, và chỉ mã hoá AAC khi cắt giữa bài.
Opus trong MP4 thì YouTube, Chrome và VLC đều chạy; QuickTime cũ có thể không.

---

## Không ghi (không áp dụng hoặc chưa rõ)

- Các chỗ riêng của repo họ: Playwright route, `font-stretch` với font biến
  thiên, `TONE_V1/V2`, đo loudness chỗ nối signature vào tập.
- Snap chữ đầu câu vào onset: ta đã đo giọng bằng forced alignment và
  `measure-vocals-not-rms`; chỉ xét lại nếu thấy chữ trễ.
- "5 cú cắt cứng trong 5 phút": là số của một bài khác nhịp; không dùng làm chỉ tiêu.
