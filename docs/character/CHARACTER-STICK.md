# Người que khăn đỏ — nhân vật xuyên suốt của kênh

Người dùng duyệt 2026-10-23 (chọn phương án C trên bảng `tools/lab/hero.html`, duyệt clip `out/_lab/hero-clip.mp4`).
Tài liệu này là **kiến thức để SÁNG TẠO**, không phải danh mục cố định: "với mỗi kịch bản sẽ có các tư thế, biến đổi khác
nhau, đừng bao giờ cố định fix cứng — chúng ta cần sáng tạo" (người dùng). Nền tảng kỹ thuật: `docs/study/06` (người que
trong thế giới toán), `07`, `08` (đạo diễn tư thế), LESSONS §136–138.

## 0. Vai

| ai | vai | xuất hiện |
|---|---|---|
| **Cậu bé anime** (`docs/character/CHARACTER-V2.md`) | THƯƠNG HIỆU kênh (avatar, banner, thumbnail) + người dẫn | thỉnh thoảng — mở bài, kết bài, câu cần "người thầy" |
| **Người que khăn đỏ** | KHÁN GIẢ CHÍNH trong video — như pi creature của 3Blue1Brown: thắc mắc, hiểu sai, vỡ lẽ đúng lúc người xem; đồng thời là DIỄN VIÊN chạy nhảy, giao du, gây ra toán | xuyên suốt, gần như mọi cảnh |

Người que hành động thay người xem: điều người xem sắp nghĩ ("chắc là 4 × 1/6?") thì người que làm trước — và vấp.
Khi màn hình đang cần đọc (công thức dài), người que lui về mép quan sát, mắt nhìn theo thứ đang được nói (như pi creature
ở góc dưới); khi có sự kiện, người que vào giữa và gây ra nó.

## 1. Nhận dạng bất biến (chỉ chừng này là cố định)

| bộ phận | khoá | ghi chú |
|---|---|---|
| nét | mực `#22303C`, dày 0.06 × chiều cao, đầu nét tròn | DNA nền tối (bảng đen…) → nét đổi sang màu sáng của DNA; khăn vẫn đỏ. **Từ 2026-10-26 video mới dùng nét mềm** (`soft`: chi cong, nét 0.075 h, tay 0.85, thân 1.2) — `docs/stick/STYLE.md` |
| đầu | tròn TRẮNG, viền mực, bán kính 1.45 × đầu engine (≈ 0.15 h) | to để mắt diễn được ở cỡ nhỏ |
| mắt | hai hạt đen bầu dục | MỌI cảm xúc mặt đi qua mắt (+ ký hiệu §3e); miệng chỉ thêm khi kịch bản cần |
| **khăn quàng đỏ** `#D9481E` | vòng cổ + hai đuôi bay sau lưng, phấp phới theo gió / chuyển động | dấu nhận diện — có mặt cả khi đổi trang phục |
| tỉ lệ | khung xương `engine/stick.js` (`L`), **tay × 1.3** (`ARM`, ≈ dài chân — đầu to cao 0.33 h trên cổ, tay mặc định 0.305 h không giơ qua đầu được); không đổi chiều dài chi trừ squash / stretch có chủ đích | |

Code: `engine/hero.js` — `hero(g, 'C', x, y, pose, { h, dir, hip, feet, hands, squash, eye, wind, t, scale, anger, front })`,
`headOf(J, h)` (đặt vật lên đầu trước khi vẽ), `ARM`. Helper cảnh ở `engine/stickmove.js`: `snap`, `fast`, `reach`, `leadOf`,
`NOOP` (lấy khớp không vẽ). Mẫu cảnh: `tools/lab/hero-scene.js` (clip đầu), `fight-scene.js` + `fight-page.js` (đánh nhau).

Mọi thứ khác — tư thế, biến dạng, màu trạng thái, đạo cụ, ký hiệu, số bản sao — **đổi theo kịch bản**.

## 2. Cách sáng tạo một khoảnh khắc (mỗi cảnh, mỗi kịch bản)

1. Đọc câu thoại → người que **cảm thấy gì / làm gì** (một câu: "bị con số 49% đè bẹp", "say xỉn vì cộng quá nhiều").
2. Chọn các LỚP ở §3 ghép lại — càng bất ngờ càng tốt, miễn đọc được khi tắt tiếng.
3. Vẽ tay 2–6 tư thế chính (keys), đặt timing theo mốc từ trong câu; thêm lấy đà → làm → đà theo.
4. Gác số (`node tools/lab/stick2-qa.mjs <scene>.js`) → tự soi khung cỡ gốc → hành động KIỂU MỚI thì clip ngắn người dùng xem.
5. Tư thế / biến đổi mới làm đẹp được → bổ sung vào thư viện (§3) để lần sau dùng lại — thư viện chỉ là điểm xuất phát.

## 3. Các lớp diễn (ghép tự do)

**a. Thân — tư thế.** 34 tư thế trong `engine/stick.js` (bảng `tools/lab/stick.html`) + **70 tư thế thể thao**
`engine/poses-sport.js` — `sport('javelin')` (chạy, nhảy, ném, bơi, võ, bóng, đạp xe, leo…; bảng `tools/lab/sport-poses.html`,
chuyển từ lemo-opuscar, người dùng duyệt 2026-10-23; dựng lại: `tools/lab/picto-extract.mjs`; test từng mục `tools/test/hero.test.mjs`) + `FRONT` (chính diện nhìn người
xem, `tools/lab/hero-scene.js`). Đi / chạy: `gait` (bản đồ bước). Tư thế mới: vẽ tay bằng góc, không IK sinh.

**b. Mặt — mắt.** Đã có: nhìn theo hướng (`look`), chớp (`lid`), mở to (`wide`), choáng (× ×), cười (^ ^). Thêm khi cần:
xoắn ốc (chóng mặt, say), lim dim nửa mí (mệt, buồn ngủ, chán), lông mày gắt hai vạch xiên (giận), mắt sao (phấn khích),
hai chấm tí hon (sợ, sốc), nước mắt / mắt rưng (cảm động), một mắt nheo (nghi ngờ), mắt tim. Miệng (vạch, chữ O, răng
nghiến) chỉ khi mắt không đủ.

**c. Biến dạng thân.** squash / stretch (bị đè, bật nhảy), lắc lư sóng (say), chảy nhão xuống đất (kiệt sức), tay chân
dài như dây cao su (với tới xa), dẹt như tờ giấy (bị đè), xoay vòng (choáng), phồng (ăn no), run (lạnh, sợ), tan thành
chấm (biến mất), gập đôi (cười lăn).

**d. Màu / chất trạng thái** (tô tạm, khăn luôn đỏ): đỏ cả người (phơi nắng, giận, ngượng — kèm vệt má), xanh lam (lạnh,
sợ), xanh lá (say sóng, buồn nôn), trắng mờ (ma, kiệt sức), vằn nắng (đeo kính râm để lại vệt trắng), ướt (giọt nước
nhỏ), đen nhẻm (nổ), vàng rực (siêu saiyan). Tô bằng màu nét / ruột đầu — KHÔNG `shadowBlur` / `ctx.filter` (tất định).

**e. Ký hiệu cảm xúc (kiểu manga).** giọt mồ hôi, gân giận #, vạch u ám trên đầu, mây đen nhỏ, hơi nước từ tai, zZ,
! và ?, tim, sao quay quanh đầu (đã có), đường tốc độ, vạch rung, hào quang (tia nét vàng toả quanh người + "tóc" gai vàng
mọc trên đầu = siêu saiyan), khói bụi khi phanh gấp, bóng đèn khi vỡ lẽ.

**f. Phân thân & tổ hợp.** bản sao bật ra (đã có: chuỗi kéo tay); một bản sao = một KẾT CỤC (xác suất: 36 bản sao xếp
lưới 6×6), vòng tròn, tháp chồng, cầu nối hai vế phương trình, hàng đợi, đội cổ vũ, hai bản sao cãi nhau (hai lập luận).

**g. Đóng giả.** thân uốn thành chữ số / chữ cái / ký hiệu (1, 7, L, T, Y, X, +, =, ÷), nằm ngang làm gạch phân số,
đầu thay bằng con số (0, 6, 9), cầm biển, mặc "áo" một biến số, nằm làm trục số.

**h. Tương tác với vật toán** (vật có khối lượng — Alan Becker): vác, ôm, đẩy, kéo, ném, đá, ngồi / đứng / treo trên,
trượt xuống cạnh huyền, chạy trên đồ thị, bị con số rơi trúng (đã có), chui qua dấu ngoặc, mở hộp, cân hai vế, bẻ đoạn
thẳng, dùng con số làm công cụ (cái 7 làm cái móc).

**i. Đạo cụ theo kịch bản.** kính bơi + phao, ly nước, ô, kính râm, mũ tốt nghiệp, bút chì khổng lồ, kính lúp, xúc xắc
to bằng người… Đạo cụ là TẠM — khăn đỏ thì luôn còn.

## 4. Ví dụ ghép (gợi ý, không phải khuôn)

| tình huống | ghép |
|---|---|
| giận gồng siêu saiyan | hạ thấp trọng tâm, nắm tay (a) · lông mày gắt (b) · rung (c) · vàng rực (d) · hào quang + tóc gai (e) · khăn bay thẳng đứng |
| uống nhiều bị say | đi theo bản đồ bước LỆCH (bước chéo, bước hụt) (a) · mắt xoắn ốc, nửa mí (b) · lắc lư sóng (c) · má đỏ / xanh lá (d) · bong bóng nhỏ (e) · ly nước (i) |
| bơi nhiều bị mệt | sải tay chính diện → bò lên bờ, nằm sấp (a) · lim dim (b) · chảy nhão (c) · ướt (d) · mồ hôi + vạch u ám (e) · kính bơi, phao (i) |
| phơi nắng bị đỏ | nằm ghế (a) · mắt nhắm sung sướng → giật mình (b) · đỏ cả người, vệt kính râm trắng (d) · hơi nóng bốc (e) · kính râm, ô (i) |
| con số 49% đè bẹp | squash dẹt (c) · mắt × (b) · sao (e) — rồi chui ra, phủi bụi |
| một trong 36 kết cục | phân thân thành lưới 6×6 (f), mỗi bản sao cầm một cặp xúc xắc; bản sao trúng nhảy lên (a) |

## 5. Kỹ thuật bắt buộc (đã trả giá)

- **Tất định:** mọi thứ là hàm của t; phấp phới / rung = `sin(t…)` hoặc `hash`, không random.
- **Đạo diễn tư thế** (§137): khoá đặt tay + ease, `gait` cho mọi lần đi; nối FK ↔ khoá bằng nội suy điểm.
- **Đầu to → tay KHÔNG với qua đỉnh đầu** (tay 0.305 h, đỉnh đầu cao 0.33 h trên cổ): vật trên đầu = đội / để vật nằm
  lên đầu (`headOf`), vác = ôm trước ngực, kẹp hai MÉP vật; vẽ nắm tay đè lên mép vật để thấy đang cầm.
- **Đích tay ngoài tầm với** (khi nội suy FK → vật) → kéo về mép tầm (`reach` trong `hero-scene.js`), không thì tay lơ lửng.
- **Hai lượt đi nối nhau:** chân đang ở SAU là chân bước trước của lượt sau (`leadOf`), không thì chân trụ trượt 2 · gap
  (16 px ở h 230) đúng khung nối — gác bắt, ảnh tĩnh không thấy.
- **Dáng chính diện** (reo, gồng, bị đè): truyền `front: true` — cả hai tay vẽ SAU đầu, không thì tay trái bị đầu to che.
- **Màu trạng thái không trùng khăn:** giận = đỏ thẫm `#7A1F2B` (đỏ tươi làm khăn biến mất).
- **60 hình / giây nội suy** (người dùng chọn A trên clip A/B, 2026-10-23) — không lượng tử nhân vật về 24.
- **Nhịp Becker** (study 10): `fast` (ease-out bậc 3) cho động tác lớn 3–6 khung-24, khoá trùng giờ = bật dáng; cú bật cố ý gắn `A.fast` để gác bỏ qua kiểm 'đầu nhảy'. Mẫu: `tools/lab/fight-scene.js`.
- **Bản sao kéo tay:** khoảng cách ≤ 0.56 h để tay với tới thoải mái; chuỗi bản sao xếp về phía KHÔNG có vật chính.
- **Gác số** chạy mọi khung nhân vật chính (`stick2-qa.mjs`); bản sao chưa có trong gác — soi khung cỡ gốc.
- **Không đè chữ, ở trong vùng an toàn** (x 96–1824, y 64–1016, LESSONS §32); khăn bay cũng tính vào khung bao.

## 6. Còn chờ

- Gác số cho bản sao; thêm mắt / ký hiệu / màu trạng thái ở §3 khi kịch bản đầu tiên cần — làm trong bàn thử, clip duyệt.
- Có thể nghiên cứu thêm: Alan Becker *Animation vs. Math* (tương tác với ký hiệu toán), các khoảnh khắc pi creature của
  3Blue1Brown (khi nào chúng xuất hiện, phản ứng gì), ký hiệu cảm xúc manga (manpu).
