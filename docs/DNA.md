# DNA — mỗi video một bản sắc riêng (MV và bài học)

> Người dùng (2026-10-01): *"Mỗi video sẽ có DNA và style phong cách đạo diễn phù hợp với lyrics và hình ảnh.
> Chúng ta không ép buộc bó buộc ở đâu cả. Chúng ta đúc kết quy trình xem cái gì dùng lại được."*

Không có bảng màu, mô-típ hay luật chuyển cảnh nào là "của kênh". Mỗi video viết DNA của chính nó
(`projects/<p>/DNA.md`, khung ở `templates/mv/DNA.md`) TỪ lời bài hát (MV) hoặc nội dung bài học (video bài học)
và chất liệu hình của nó, trước TREATMENT/SCRIPT. Video bài học: "lời" là kịch bản đọc, "nhịp" là nhịp lời đọc
(không có beat nhạc), "hát nhép" thường không có — `docs/lesson/LESSON-VIDEO.md`. Luật chung mọi dạng: `docs/CRAFT.md`.

## Dùng lại / không dùng lại

| DÙNG LẠI giữa các MV | RIÊNG từng MV (viết vào DNA) |
|---|---|
| quy trình: dữ liệu → DNA + TREATMENT → nháp/chụp/kế hoạch → QA → render/ghép (`docs/mv/NEW-MV.md`) | mô-típ trung tâm, câu chuyện, thế giới nền |
| engine + hợp đồng cảnh (`docs/ENGINE.md`), `tools/qa`, `tools/analyze` | bảng màu và màu mang nghĩa gì |
| tất định, mốc từ dữ liệu, NHÌN ảnh (AGENTS.md — ba luật) | cách hiện chữ (gõ ký tự, giải mã, viết tay, chữ làm vật thể…) |
| các bẫy kỹ thuật đã trả giá (`docs/LESSONS.md`) | nhân vật hiện thế nào, vào/ra thế nào, cỡ, chỗ đứng, hát nhép ở đâu |
| nhân dạng nhân vật (`docs/character/CHARACTER-V2.md`) | chuyển cảnh, ngân sách cắt cứng, khi nào camera chạy |
| | danh sách CẤM của bài, chỉ số sàn chấp nhận |

## Một DNA phải trả lời

1. **Ý trung tâm** — một hình ảnh nói đúng ý toán của bài (exp-log: gương y = x; 99-intro: dựng hình từ nét bút).
2. **Màu mang nghĩa gì** — mỗi màu một vai; kiểm tương phản tiền cảnh/hậu cảnh BẰNG SỐ ở từng loại nền (LESSONS §13).
3. **Chữ** — chữ để đọc hiện/rời thế nào; chữ làm vật thể dùng ở đâu (`docs/TEXT-AS-OBJECT.md`).
4. **Nhịp** — chữ và sự kiện bám lời (`timeline.json`), nền bám beat hay stem; đo % từ rơi gần beat trước khi chọn.
5. **Nhân vật** — chất liệu khi đứng / khi vào-ra, cỡ tối thiểu, chỗ đứng, các tư thế cho ý nào, hát nhép câu nào.
6. **Chuyển cảnh** — mặc định là gì; cắt cứng ở đâu (mỗi cú gắn một cú đập/lặng của nhạc).
7. **Camera và thế giới** — đoạn nào trôi nhẹ, đoạn nào bùng; nền là phông hay thế giới có vật sống qua cảnh.
8. **Danh sách CẤM** của bài.
9. **Chỉ số sàn** (`tools/review.mjs`) — sàn, không phải mục tiêu: chỉ số không đo được ý nghĩa.

## Hai câu hỏi đúng với MỌI DNA (vì là về người xem, không về phong cách)

- **Tắt tiếng đi, khán giả có hiểu cảnh này nói gì?** Không → cảnh là trang trí, làm lại.
- **Toán trên hình có ĐÚNG không?** Kênh dạy toán: mọi đẳng thức, đồ thị, phép gập phải đúng (exp-log có test cho
  hình học gương và các đẳng thức trên tia mặt trời — `tools/test/finale.test.mjs`).

## Ví dụ đã làm — để tham khảo, không để chép

| | `projects/mv/99-intro/DNA.md` | `projects/mv/exp-log/DNA.md` | `projects/mv/add-it-up/DNA.md` | `projects/en/math-30k/DNA.md` (bài học) | `projects/en/zero-div/DNA.md` (bài học) |
|---|---|---|---|---|---|
| ý trung tâm | dựng hình từ nét bút | tấm gương y = x: luỹ thừa ⇄ logarit | xưởng in riso: tích phân = cộng từng lớp; cỗ máy là đường giấy hình ∫ (summa); F + C = bản in lệch khuôn | "The Long Line": một nét vạch đi từ vạch khắc trên xương tới băng máy Turing | "The Hole in the Page": một trang giấy kẻ ô, ở điểm 0 có LỖ THỦNG thật — giữ chỗ, hố đen, khe 1/x, nơi máy tính sống |
| màu | vàng = đang vẽ, teal = đã xong, nền #05070f | vàng = đi xuôi (mũ), xanh = đi ngược (log), nền navy #0B0F1E; đoạn giữa đảo nền giấy | 4 mực in chồng trên giấy: hồng = thay đổi, xanh = tích luỹ, vàng = C (gần vô hình — cố ý), key = chữ (K = key plate) | chất liệu theo thời đại (xương, đất sét, giấy cói, cát, giấy da, giấy in, bảng đen, màn hình); nhấn = cái MỚI được phát minh | giấy kẻ ô + mực xanh đậm; ĐỎ bút chấm bài CHỈ cho chỗ hỏng (gạch, ✗, ≠, UNDEFINED); trong lỗ: khoảng tối + terminal vàng |
| chữ | gõ theo ký tự 7.6 ký tự/s | lời chân khung giải mã/vỡ thành ký hiệu; chữ lớn ruột lấp đẳng thức; chữ viết tay trên giấy | ba giọng ba mặt chữ: rap = băng giấy in hoa, hát = nghiêng có chân, nói = máy chữ; ra bằng dao xén | Archivo năm, Cormorant nghiêng (bản số thẳng hàng -LN), Plex nhãn; chữ VIẾT/ĐÓNG DẤU vào, không fade | phép tính viết tay, sai thì GẠCH ĐỎ; ✗ vẽ tay (không font nào có) |
| nhân vật | mascot v1, ảnh đặc + mosaic | anime v2: vào/ra bằng ký hiệu 5 kiểu, khung trung ở góc, mặt cận hát nhép theo giọng | tách màu riso, đục lỗ; vào 4 lượt in, ra xén dải; 6 tư thế + mặt hát nhép (~19%) | người dẫn đường, 5 tư thế, ~12%; chân dung lịch sử theo chất liệu (khắc đồng / ảnh ghim), tưởng tượng ghi IMAGINED | NỬA THÂN (toàn thân cắt 45%), 6 tư thế mỗi cái một khoảnh khắc (OK = vòng tròn số 0; chỉ hai hướng = ±∞) |
| cắt cứng | ≤ 3 / 26s | đúng 8 chỗ, liệt kê trong TREATMENT | 11 chỗ; mặc định = nạp giấy | không cắt cứng: đổi chất liệu = nền loang; cùng chất liệu = nạp giấy; intro = camera LAO VÀO LỖ → đen; vào máy tính cũng lao vào lỗ; lật trang giữa các mục |

**Tám video bài học** — một dòng mỗi bài (chi tiết ở `projects/<p>/DNA.md`; bảng trên có thêm math-30k, zero-div):

| bài | DNA — ý trung tâm | vật xuyên suốt / chất liệu | chuyển cảnh cùng ERA |
|---|---|---|---|
| `math-30k` | "The Long Line": một nét vạch qua các thời đại | chất liệu = thời đại (xương → đất sét → … → màn hình) | đổi chất liệu = loang; cùng chất liệu = nạp giấy |
| `zero-div` | "The Hole in the Page": giấy kẻ ô có lỗ thủng ở 0 | trang giấy + bút; đỏ bút chấm CHỈ cho chỗ hỏng | trang mới trượt lên (`page`) |
| `pemdas` | "Rules of the Road": đường nhìn từ trên xuống | biểu thức sơn trên đường, phép tính = biển báo | camera trượt dọc đường (whoosh) |
| `fifty-percent` | ánh sáng = thông tin: đèn trong đêm | đèn bão của người xem; phỉnh cược dưới đèn bàn | camera trôi ngang qua đêm, sương nối; `CONTINUES` khi cùng vật |
| `pi` | bộ bản vẽ của nhà hình học (bàn dựng hình) | vòng tròn mực xanh do compa quay | tờ PLATE trượt lên |
| `neg-times-neg` | số âm là đồ vật: viên gạch đại số trên thảm cắt | zero pair (vàng úp đỏ → dấu chân "0") | tấm thảm trượt lên |
| `zero-power` | sống trong màn LCD máy tính cầm tay (không font) | thanh ghi × = 1 màu lam | màn cuộn lên |
| `intuition` | trường quay gameshow: trực giác là thí sinh, logic là bảng điểm | thẻ trả lời bút dạ; bảng lật Solari | màn nhung khép–mở |

