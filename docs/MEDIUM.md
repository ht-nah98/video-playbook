# MEDIUM — khi nào 2D, khi nào 3D, khi nào kết hợp

Rút từ ba lần thử 3D ngày 2026-10-09: mẫu p(doom), đoạn 30 s của fifty-percent dựng lại bằng 3D, và intro kênh
(`projects/en/intro`). Người dùng chốt:
- MV ca nhạc **cân nhắc 3D trước**, video bài học dùng 2D;
- *"không phải video nào dựng 3D cũng tốt hơn dựng 2D. Còn tùy vào nội dung"* — bản 2D của fifty-percent "rõ ràng hơn, clear hơn".

Đây là luật chọn **công cụ**, không phải phong cách. Phong cách vẫn là DNA của từng video (`docs/DNA.md`).

## Hai câu hỏi quyết định

1. **Người xem cần ĐỌC hay cần CẢM?**
   - ĐỌC (số, chữ, phép tính, đồ thị, lập luận từng bước) → **2D**.
   - CẢM (nhịp, năng lượng, ấn tượng, nhận diện) → 3D có lợi thế.
2. **Không gian có phải là nội dung không?**
   - Có (khối, mặt cong, xoay, mặt cắt, chiều sâu, thang đo khổng lồ) → **3D**, kể cả trong bài học.
   - Không → 3D chỉ là trang trí. Phối cảnh làm chữ nhỏ và nghiêng, sương/đèn làm giảm tương phản, camera bay tranh sự
     chú ý với lời đọc (LESSONS §77).

## Bảng chọn

| dạng | mặc định | dùng 3D khi | ví dụ của kênh |
|---|---|---|---|
| video bài học | **2D** (`engine/`) | không gian là nội dung của CẢ bài (hình học không gian, khối, mặt cắt) → **2D + hình 3D CHIẾU** trong kit (đã chạy, §78); chỉ chen đoạn studio3d khi cần ánh sáng/vật liệu thật | solid-geometry: 2D + 3D chiếu, người dùng "bài này hay" (§78); fifty-percent dựng 3D thì kém rõ hơn (§77); pi "lăn vòng tròn" là ứng viên |
| MV ca nhạc | **cân nhắc 3D trước** (`studio3d/`) | gần như luôn được, vì MV là cảm. Chọn 2D khi DNA cần chất liệu phẳng (giấy, riso, mực) và ghi lý do vào TREATMENT | exp-log (gương giấy), add-it-up (riso) là 2D có lý do; p(doom) là 3D |
| intro / outro / hook / chuyển chương | **3D** | ngắn, cảm, nhận diện kênh | `projects/en/intro` (99/100 khối) |
| Shorts | theo video gốc | — | cắt từ bản cuối (`docs/lesson/SHORTS.md`) |

## 3D CHIẾU trong engine 2D (đã chạy: solid-geometry, §78)

Khi hình khối là nội dung nhưng người xem vẫn cần ĐỌC nhãn và công thức:
- **Kit có bộ chiếu:** `camera()` yaw/pitch/FOV 32°, painter, tô mặt theo pháp tuyến so với một đèn, cạnh khuất nét
  đứt, bóng mềm từ đèn, tờ bìa = mặt phẳng, chỉ = đường. Mẫu: `projects/en/solid-geometry/kit.js` + `plates/e3-three.js`.
- **Chữ luôn phẳng**, đặt cạnh điểm chiếu; camera đứng yên lúc cần đọc, trôi ≤ 4°/s lúc giảng.
- **Hình chiếu = bóng thật** của một đèn cố định → góc, khoảng cách, "đưa về mặt phẳng" hiện ra bằng chất liệu.
- **Giá:** render ~15–20 lần chậm hơn 2D phẳng (§84); giữ trọn đường ống bài học (giọng, chạy khô, SFX, build.py).

## Kết hợp — ba cách, đều đã có ở kênh hoặc có đường làm

1. **Bài học 2D + cú chen 3D.** Cú 3D là một đoạn video riêng, render bằng `studio3d`, ghép vào giữa các phần như
   intro (`build.json` đã ghép được một mp4 có sẵn). Hai mép cú 3D phải nối với 2D: cùng màu nền ở khung cuối và
   khung đầu, hoặc về đen như intro. **Chưa có công cụ ghép giữa bài; cần làm khi có bài đầu tiên dùng.**
2. **MV 3D có chỗ cần đọc** (công thức, câu dài): đặt **chữ phẳng hướng thẳng camera** trong không gian 3D, cỡ đủ
   đọc, camera đứng yên lúc đọc. Đừng để chữ cần đọc bay xa hoặc nghiêng.
3. **Nhân vật: 2D vào, 3D ra.** Nhân vật đứng yên là **ảnh 2D sạch**. Nhân vật chuyển (vào, ra, biến thành thứ khác)
   thì **vỡ thành khối/hạt 3D** mang màu của ảnh. Đây là cách của video mẫu (`docs/mv/REFERENCE-TEARDOWN.md` §2).
   Dán ảnh PNG phẳng làm tấm bìa trong 3D thì không được.

## Khi đã chọn 3D: những gì người dùng đã đòi

- **Mỗi từ được hát là một vật thể trên hình**, hiện đúng mốc, chuyển động theo nghĩa của từ. "Lyrics và hình ảnh
  luôn đi kèm với nhau" (LESSONS §73).
- **Nhịp dày**: mỗi từ (có lời) hoặc mỗi beat (không lời) là một sự kiện. Không đoạn nào đứng yên quá 0.5 s, trừ
  khoảng lặng có chủ ý. Đo bằng `tools/qa/still_windows.py`.
- **Nền tối** kiểu p(doom) và video mẫu (bloom, grain, lớp độ sâu) là sở thích hiện tại cho MV/intro. Muốn dùng nền
  sáng thì làm thành một **đoạn đảo nền** (video mẫu đảo nền trắng 14% thời lượng), không làm cả bài.
- **Mascot ít**: ≤ 25% thời lượng, mỗi lần một ý.

## Giá phải trả (đo trên máy này, RTX 4070 Ti)

| | 2D bài học | 3D |
|---|---|---|
| render | vài phút cho cả bài 10–20 phút; **2D + 3D chiếu: ~70 phút cho 19 phút** (§84) | ~5 phút cho 26 s (nhòe chuyển động tự động); ~3 phút cho 32 s cảnh nhẹ |
| dựng | engine + kit có sẵn, mẫu `templates/lesson` | chưa có template; cảnh viết tay (~600 dòng cho intro) |
| rủi ro riêng | — | GPU rơi về CPU im lặng (§72); trạng thái three.js rò giữa các khung (§74); chữ khối rộng hơn ước lượng (§75) |

Đây là bản đầu, sau một MV mẫu và hai lần thử. Mỗi video 3D tiếp theo phải bổ sung hoặc sửa file này.
