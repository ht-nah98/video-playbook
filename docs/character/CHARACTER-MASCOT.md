# Mascot vẽ nét kênh Anh — dẫn chuyện + diễn viên (quyết định 2026-10-29)

> **Đã dừng cho video mới từ 2026-11-02:** kênh Anh quay lại người que tương tác (LESSONS §243).

Người dùng (sau khi duyệt thumbnail v3): "từ những video mới, sử dụng mascot này trong các video để tương tác và truyền đạt thông
tin. **Không cần người que nữa.** … vừa là dẫn truyện vừa là người tương tác với các hành động, hoạt động, con số có trong nội dung."

- **Nhân vật:** cậu bé blouse trắng vẽ nét đầu tròn — `projects/en/_kit/mascot.js` (bàn thử `projects/en/_lab/mascot.html`): tóc rối
  nâu đen phủ trán, kính tròn gọng mảnh, mắt lờ đờ, blouse trắng xắn tay, thun đen, giày đen đế trắng. 8 biểu cảm, 11 tư thế.
- **Thay thế:** người que khăn đỏ (`docs/character/CHARACTER-STICK.md`, `docs/stick/`) KHÔNG dùng cho video mới. Bài đã đăng giữ nguyên pixel.
  Cậu bé anime (ảnh gen, `assets/character-v2`) không vào video mới nữa — chỉ còn ở avatar / banner kênh cho tới khi đổi.
- **Một nhân vật từ thumbnail tới video:** người xem bấm vì mặt mascot ở thumbnail → gặp đúng mascot đó ở 0–5 s.

## 1. Ba vai trong một video
| vai | khi nào | khung | luật |
|---|---|---|---|
| **Dẫn** | đoạn nói giải thích, không có sự kiện để diễn | góc (bán thân, nhép miệng theo giọng) — như `cornerHost` kênh sử | không che vật chính; ra / vào có lý do |
| **Diễn** | sự kiện quan trọng: con số đổi, phép tính chạy, đồ thị vẽ, ví dụ đời thường | trong cảnh, toàn thân hoặc trung | mascot là NGUYÊN NHÂN (đẩy, nhấc, xếp, ném, leo, cầm số) — che mascot đi cảnh mất nghĩa (§175) |
| **Phản ứng** | khoảnh khắc lộ kết quả / nghịch lý (khoảnh khắc thumbnail) | cận mặt, mặt ≈ 40% khung (§216) | biểu cảm BẬT dáng, giữ ≥ 1 s; tối đa vài lần một bài |

Luật kế thừa từ người que (vẫn đúng, áp cho mascot): CRAFT "hoạt ảnh = đạo diễn tư thế" (§137), "mượt = nhịp" (§152), tầm tay của rig
(§176), cảnh nhịp nhanh không chen nhân vật, hành động trọn ≥ 2–3 s. DNA mỗi bài vẫn riêng; mascot đổi đạo cụ / trang phục theo bài,
nhận dạng khoá (tóc, kính, blouse) không đổi.

## 2. Kế hoạch nâng cấp (tuần tự, mỗi bước người dùng xem)
1. **Rig động — XONG 10-29:** bản 4 góc thẳng (`mascot()` tay ống blouse, §219) + bản 5 xoay 3/4 `yaw` (khối cầu đầu, khối trụ thân, vai theo thân — bàn thử `projects/en/_lab/mascot-yaw.html`, §220). Bản đầu (bỏ): `engine/mascot-line.js` (`skin(J)` bọc lên khung người que + từ điển dáng, `talkMouth`, `blinkAt`, `noArm`; `projects/en/_kit/mascot.js` re-export), LESSONS §219. Kế hoạch gốc: chuyển `mascot.js` thành module engine `engine/mascot.js` (bài học import từ `engine/`; `projects/en/_kit/mascot.js`
   re-export cho thumbnail): tay theo góc vai + khuỷu (nội suy được) thay bảng đích cố định; nghiêng đầu, cúi / ngả thân, nén-giãn,
   chớp mắt theo `hash`, hướng nhìn; miệng nhép theo `data/*.mouth.json` (công thức `mouthAt` của `projects/hist/_kit/narrator.js`);
   tư thế khoá → khoá có ease (`engine/stickmove.js` `keys`); đi bộ (chân trụ khoá); neo bàn tay để cầm đạo cụ / con số. Tất định.
2. **Clip duyệt — XONG 10-29:** clip 56 s logarithm (`out/en/logarithm/qa/mascot-clip/`) người dùng "Được, làm tiếp". Kế hoạch gốc: clip bàn thử ~25 s, tốc độ thật** (`out/_lab/en-mascot/`): nói ở góc nhép miệng một câu giọng thật → bước vào cảnh → nhấc một con
   số đặt vào phép tính → kết quả lộ: cận mặt sốc → đắc ý. Gác số mọi khung (NaN, tay ngoài tầm) + người dùng duyệt (§136).
3. **Luật + template — XONG 10-29:** `templates/lesson/{DNA §5b, BRIEF-PLATES}` (mẫu `engine/mascot-actor.js`), CRAFT §7. Kế hoạch gốc: cột "mascot làm gì" thay "người que làm gì" trong `templates/lesson/{DNA,SHOTS,BRIEF-PLATES}.md`; `CRAFT`
   mục nhân vật; skill `lesson-video` bước nhân vật.
4. **Bài thí điểm: `en/logarithm` — XONG 10-29 (bản 5 `out/en/logarithm/logarithm.mp4`, người dùng duyệt)** (người dùng 10-29: "chỉ tối ưu các video cũ" — bài dựng sẵn, thay người que ở b02 b07 b08 b12) — DNA §5b lập bảng câu → vai (dẫn / diễn / phản ứng) → con số / vật đổi gì.
   Thumbnail của bài dựng bằng chính khung phản ứng trong video (`projects/en/_lab/THUMBS-V3.md`).
5. **Sau thí điểm:** đúc kết; quyết cùng người dùng các bài đã dựng chưa đăng (sudoku, trig, logarithm, neg-times-neg, pemdas,
   intuition, probability — trước đây chờ thêm người que) và việc đổi avatar / banner kênh sang mascot vẽ nét.
