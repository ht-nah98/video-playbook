# 08 — Cách làm hoạt ảnh người que (nghiên cứu sau khi người que calculus bị chê "dị tật")

Người dùng 2026-10-22: "mình muốn nâng cấp có người que… nghiên cứu cách làm người que, làm animation… đúc kết và học hỏi
kinh nghiệm để các video tiếp theo áp dụng". Bối cảnh: bản calculus 2 dùng `engine/stick.js` tự tính tư thế bằng IK
trên dốc 50–60° → gập chân, tay chồng thân; đã gỡ (LESSONS §136).

Nguồn (lời tải bằng yt-dlp, video 480p ở `out/_lab/study/stick-anim/` — không commit):

| nguồn | dùng gì |
|---|---|
| Alan Becker — *Stick Figure Animation* (revamped, 4:24) `mViKZJQcbpM` | quy trình 5 bước của anh ấy |
| Alan Becker — *Stick Figure Animation* (bản 2011, 20:48) `a8kKmsMia-8` | làm mẫu một cảnh chạy → nhảy tường → ngã |
| Alan Becker — *Animating Walk Cycles* (3:53) `2y6aVz0Acx0` | 4 tư thế đi, đi ngang màn hình, tính cách |
| Alan Becker — *Animating Run Cycles* (2:37) `jggdbxTJPG4` | chạy, nhảy chân sáo, tính cách |
| Alan Becker — *12 Principles of Animation* (24:03) `uDqjIdI4bF4` | 12 nguyên lý (Thomas & Johnston) |
| Ano — *How I Animate Stick Figures "Like Alan Becker"* `FgAuEdsPGYA` | ease-in/out, kéo giãn nhẹ khung đầu/cuối |
| *Stick Figures Walk Cycle Tutorial* `tsDtF1IXPyQ` | 8–12 khung mỗi bước, 3 đường dẫn |
| Diễn đàn Spine (shepherd walk) — đi dốc = trộn 3 clip lên dốc + 3 clip xuống dốc theo độ dốc | đi trên dốc |
| Shots.net phỏng vấn Becker: "nếu người que truyền đạt được điều cần, là đã làm tốt" (Richard Williams) | vì sao người que |

## 1. Cách người giỏi làm — và vì sao bản của ta xấu

| người giỏi | bản calculus 2 của ta | hậu quả |
|---|---|---|
| **Pose-to-pose**: vẽ TƯ THẾ CHÍNH trước, chỉnh từng cái cho đẹp, rồi mới chèn khung giữa (keys → extremes → breakdowns → in-between) | không có tư thế chính nào được vẽ tay cho cảnh — IK tự sinh mọi khung | không ai từng "duyệt" một tư thế; khung xấu lọt ra |
| **Bước đi = 4 tư thế** contact → down → passing → up; đầu đi theo sóng | `walk()` = một sin/cos cho mọi góc | không có contact / passing rõ; dáng "bơi" |
| **Đi ngang màn hình: lên bản đồ BƯỚC CHÂN trước** (chỗ đặt chân trên sân khấu + trên dòng thời gian), đặt contact trước | chân đặt theo `phase`, thân trôi theo t → không ràng nhau | **trượt chân** (Becker: "slidy like a video game character") |
| **Mỗi tình huống một bộ tư thế riêng** (đi, chạy, nhảy chân sáo, rón rén; Spine: 3 clip lên dốc + 3 xuống dốc theo độ dốc) | một chu kỳ đi bị ép lên dốc 55° | dốc gắt cần dáng LEO (chống tay, bước ngắn), không phải dáng đi |
| **Hông là gốc**, đặt theo đường đi mượt của thân; chân với tới đất | `stick.js:85` đặt hông theo bàn chân THẤP hơn | trên dốc gắt, chân phía trên phải gập tới ngực → "dị tật" |
| **Arcs**: khớp đi theo cung; **ease** ở đầu/cuối mọi động tác | nội suy tuyến tính góc | máy móc |
| **Silhouette**: tay chân không chồng lên thân; tránh "twinning" (hai tay giống hệt) | tay vung theo góc cố định bất kể thân nghiêng 30–50° | tay xuyên thân / đầu |
| Đo tỉ lệ bằng **đường dẫn** (đỉnh đầu, eo, đất) — người que KHÔNG đổi chiều cao giữa khung | `squash` + IK đổi độ dài chi | co giãn ngoài ý muốn |
| **Xem lại khi chạy** ở tốc độ thật, sửa | ta chấm qua ảnh tĩnh crop nhỏ | lỗi chỉ lộ khi xem video |

**Kết luận gốc:** người que đẹp là người que được **ĐẠO DIỄN TỪNG TƯ THẾ**, không phải mô phỏng. IK chỉ nên dùng để
*khoá* một bàn chân / bàn tay đã đặt (chống trượt), không để *sinh* tư thế.

## 2. Số đo từ mẫu (walk cycle của Becker, khung 0:55)

- 8–12 khung mỗi bước ở 24 fps → ~0.4–0.5 s mỗi bước (đi thường); chạy ~nửa đó.
- Contact: hai chân duỗi gần thẳng, tay xa nhau nhất. Down (ngay sau contact): gối trước gập, đầu thấp nhất.
  Passing: chân sau gập cao, đi qua chân trụ thẳng; tay gần nhau nhất. Up: chân trụ duỗi, đầu cao nhất.
- Đầu nhấp nhô ~4–5% chiều cao; thân nghiêng trước ~5–10°.
- Tay ngược chân; khuỷu luôn gập nhẹ (không tay que thẳng đơ), cẳng tay trễ sau khuỷu (overlap).
- Tính cách đổi bằng 3 núm: **timing** (giữ tư thế nào lâu), **position** (nghiêng thân, độ cao tay), **offset**
  (tay đi trước / sau chân 1–2 khung).

## 3. Luật cho người que của kênh (đề xuất — chờ người dùng duyệt)

1. **Tư thế chính vẽ tay, có tên**, mỗi cảnh ≤ 6 tư thế chính; dựng trong bàn thử và duyệt TỪNG TƯ THẾ ở cỡ thật trước
   khi nội suy.
2. **Nội suy có ease + cung**: khớp đi theo cung (nội suy GÓC, không nội suy toạ độ), ease-in/out, overshoot nhẹ khi dừng.
3. **Đi / chạy theo bản đồ bước**: danh sách điểm đặt chân `(x, t)` trên mặt đất; trong pha trụ bàn chân ĐỨNG YÊN
   (sai lệch 0 px); hông = đường cong mượt qua các điểm trụ + sóng nhấp nhô.
4. **Dốc**: ≤ 15° đi thường nghiêng thân; 15–35° bước ngắn, thân đổ trước, tay vung mạnh; > 35° **không đi** — đổi sang
   leo (bước bậc, tay chống) hoặc bố trí cho nhân vật đứng / ngồi / được chở. Không ép một chu kỳ lên mọi độ dốc.
5. **Gác chất lượng tự động** (thêm vào bàn thử, chạy mọi khung): góc gối ≤ 150° gập; hông cao ≥ 75% chiều dài chân
   khi đứng / đi; chiều dài mọi chi không đổi (±0.5 px); bàn chân trụ không trượt; ở dáng nghiêng, tay không cắt đoạn thân.
6. **Duyệt bằng clip, không bằng ảnh**: clip 10 s ở tốc độ thật, cỡ thật, tình huống KHÓ nhất của bài → người dùng xem
   → mới vào video (LESSONS §136).
7. Tiết chế và vai giữ như CRAFT §7 (đang tạm dừng): mascot dẫn, người que diễn, 3–6 khoảnh khắc mỗi video.

## 4. Việc engine (khi người dùng đồng ý làm tiếp)

- `engine/stick.js` giữ `stick()` để VẼ; thêm lớp **hoạt ảnh theo khoá**: `keys([{t, pose}, …], t)` (ease + nội suy
  góc), `steps(map, t)` (bản đồ bước → vị trí hông + bàn chân trụ khoá), bộ tư thế đi 4 khung (`walkKeys`) và leo.
- Bỏ đặt hông theo bàn chân thấp (dòng 85) khi có bản đồ bước.
- Bàn thử mới `tools/lab/stick2.html`: (a) đi phẳng, (b) lên dốc 25°, (c) dốc 55° = leo, (d) ngồi lên chữ, (e) đẩy
  vật — kèm gác chất lượng §3.5 in ra console, `shoot.js check` bắt lỗi.

## Không bắt chước
Người que cam đầu rỗng của Alan Becker, nền giấy cũ của các video hướng dẫn, đánh nhau / bạo lực.

## 5. Bàn thử bản 2 (2026-10-22) — chờ người dùng xem clip

`engine/stickmove.js` (`gait`, `keys`) + `tools/lab/stick2.html` / `stick2-scene.js`, clip `out/_lab/stick2-demo.mp4`
(12 s): đi phẳng → dốc 22° → dừng, ngẩng nhìn → lấy đà → bay theo cung lên thẻ LIMIT → tiếp đất dồn + vượt → bước nhỏ →
ngồi mép thẻ, đung đưa chân. Gác `node tools/lab/stick2-qa.mjs`: gối gập nhất 40° trong, chân trụ trượt 0 px, độ dài chi
lệch 0 px, không lún đất, không NaN. Gác bắt được lỗi mà ảnh tĩnh bỏ sót (cú nhảy 58 px/khung, chân xuyên mặt thẻ khi
ngồi, tư thế khoá thiếu trường → NaN mà vẫn "đạt").
Tự nhận còn yếu: khung bật nhảy thân + hai chân thẳng một đường (kéo giãn 1–2 khung); bước đầu lên dốc hông hơi thấp
(dáng khom); không có bàn chân; tay sau đôi khi chồng thân ở dáng nghiêng (13 khung, ngắn).

## 6. Người dùng duyệt (2026-10-22) → luật kênh + bổ sung tư thế

Clip zero-div (`projects/en/zero-div/plates/stick-patch.js`) được duyệt và gắn vào video; người dùng: MỌI video có người que,
tần suất linh hoạt, tương tác với sự vật / sự kiện, mỗi video một phong cách, DNA bài + lối Alan Becker (CRAFT §7, DNA §5b,
BRIEF-PLATES § Người que). Engine thêm 15 tư thế (34 tổng — bảng `tools/lab/stick.html`): wave, facepalm, kneel, sitFloor,
kick, sneak, lookUp, lookDown, surprised, tired, climb, write, windup, throw, pointDown. Hai tư thế tay chạm đầu (scratch,
wave) GIẢI BẰNG SỐ với ràng buộc cánh tay ngoài vòng đầu — chỉnh mò cho ra tay chui vào đầu. `gait({ run: 1 })` chạy có pha
bay (`tools/lab/stick-run.html`); khi chạy, phép hạ hông chỉ tính chân TRỤ (tính cả chân bay → dáng khom như quỳ). Bài đã
duyệt giữ tư thế cũ trong module của bài (zero-div `SCRATCH`) → clip so PSNR = ∞ sau mọi lần sửa engine.
