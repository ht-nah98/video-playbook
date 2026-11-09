# 16 — Oversimplified "WW1 (Part 1)": học DỰNG HÌNH — cỡ, khung, vị trí, nền — đối chiếu sarajevo v3

Người dùng 2026-10-27 so bản dựng của ta (`out/hist/sarajevo/sarajevo.mp4`, v3, 216 s) với video này và nói: *"Đây là cách
mày edit và cách người chuyên nghiệp edit: một kích thước nhất quán, đúng khung, đúng vị trí, đúng tỉ lệ. Mày cần học
edit."* Người dùng chỉ vào năm chỗ:
- (a) cảnh xe ở Sarajevo;
- (b) cảnh thăm bệnh viện của họ;
- (c) sơ đồ "rẽ nhầm" của ta, bị chê lệch tông, xấu;
- (d) "mắt meme" của họ;
- (e) người dẫn của ta quá to, cần nhỏ lại và nép vào góc;
- (f) tiếng: chê sting `dun` tự tạo của ta (2:20), khen phần tiếng của họ (§7).

Bài này chỉ học kỹ thuật. KHÔNG chép nhân vật, nét vẽ, câu đùa của họ (§9).

**Nguồn.** Oversimplified, *WW1 – Oversimplified (Part 1)*, 6:23, 1280×720, 30 hình/giây. File người dùng gửi:
`~/Downloads/WW1 - Oversimplified (Part 1).mp4`.

Chất liệu ở `out/_lab/study/16-oversimplified-ww1/`. Thư mục này KHÔNG commit.
- `transcript.txt` · `pace.txt` · `cuts.txt` (ngưỡng scene > 0.3) · `shots.tsv` (giờ, độ dài từng cảnh)
- `shotsheet00–03.jpg` — mỗi cảnh một khung, có ghi giờ và độ dài
- `strip-opening.jpg` (0:00–0:24) · `strip-assassin-a.jpg` (0:40–1:10) · `strip-assassin-b.jpg` (1:10–1:40) ·
  `strip-belgium-meme.jpg` (2:40–3:20) · `strip-trench.jpg` (5:00–5:40) — 1.5–2 khung mỗi giây
- `ours-strip-all.jpg` (bản v3, 3 s một khung) · `ours-strip-sarajevo.jpg` (2:00–3:06, 1.5 s một khung)
- `sfx-events.jpg` — khung hình ở 50 mốc tiếng hiệu ứng dò được (§7)
- **ảnh so sánh ta ↔ họ:** `cmp-car.jpg` · `cmp-hospital.jpg` · `cmp-wrongturn.jpg` · `cmp-meme.jpg` · `cmp-presenter.jpg`

## 1. Số đo

| đo | Oversimplified | ta (sarajevo v3) |
|---|---|---|
| dài | 384 s | 216 s |
| cắt (scene > 0.3) | 75 · độ dài giữa **2.87 s** · 10 cảnh < 1 s · 15 cảnh > 8 s | 47 · độ dài giữa **3.63 s** |
| khung đứng yên (`pace.py`) | **19.1 %** — tăng dần về cuối: 13 → 39 % mỗi phút | 12.4 % |
| lời | 1 235 từ · **193 từ/phút** | — |
| người dẫn trên hình | **0 %** — chỉ có giọng, không có người dẫn | ~**32 %** khung mẫu (23/72), cao 50–62 % khung |
| kiểu bản đồ | **1** (bản đồ chính trị trên nền vệ tinh, màu bão hoà, viền trắng dày) + một hình chiến hào vẽ nhìn từ trên | **5** (atlas ảnh, bản đồ phẳng nhạt, bản đồ ảnh khử xám, bản đồ cổ, sơ đồ phố be) |
| chữ trên hình | ~38 % số cảnh (29/76) | gần như mọi khung (~75 %): nhãn, tiêu đề, dòng nguồn ảnh |
| độ ồn | −26.7 LUFS (bản tải về); khoảng nghỉ giữa câu chỉ thấp hơn lời ~5 dB (−36.7 so với −31.6 dBFS) → **nhạc nền chạy liên tục**; 8 khoảng lặng > 0.3 s | −14.9 LUFS; 1 khoảng lặng (khoảnh khắc cái chết) |

Ghi chú về số cảnh: ngưỡng 0.3 bỏ sót các lần chuyển trong cùng một bản đồ (vd. cảnh "41.9 s" ở 1:21 thật ra là ~8 lần
lia/zoom bản đồ). Nhịp hình thật vào khoảng 2–3 s mỗi lần đổi.

**Phân loại nền** (76 cảnh, tính theo thời lượng):

| nền | cảnh | thời lượng | dùng cho |
|---|---|---|---|
| bản đồ (một kiểu) | 23 | **47.7 %** | ai ở đâu, ai đánh ai; cờ và mặt đặt lên bản đồ |
| vẽ phẳng sáng (trắng có vignette xám, trời xanh + đồi xanh, phòng nét đen) | 20 | **26.0 %** | cảnh DỰNG có nhân vật: đám đông, bệnh viện, quán cà phê, lính |
| đen tuyền (#000) | 20 | **20.2 %** | ảnh tư liệu, chân dung, cutout xe, tờ báo, tấm áp phích |
| chữ trên nền trơn | 8 | 3.1 % | "LET'S HAVE A WAR", "EXCEPT NO", "Trench Warfare" |
| ảnh tràn khung | 5 | **3.1 %** | cận mặt mắt meme, ảnh lính có mũi tên |

So với ta (72 khung mẫu, 3 s một khung):
- ảnh tràn khung làm nền rồi đè thêm lớp: 25 %;
- nền than (#1a1a1a, có dòng nguồn ảnh): 22 %;
- bản đồ năm kiểu: 39 %;
- nền kem / trắng vẽ: 11 %;
- cận mặt người dẫn: 3 %.

**Họ gần như KHÔNG BAO GIỜ đè đồ lên ảnh thật.** Ảnh thật là một VẬT đặt trên nền đen. Còn ta lấy ảnh thật làm SÂN KHẤU
rồi dán thêm 5–20 thứ lên trên.

**Cỡ chủ thể** (đo bbox phần không đen trên nền đen, hoặc đo tay trên ảnh `cmp-*`):

| loại khung | Oversimplified | ta |
|---|---|---|
| một chân dung trên nền đen (Joffre, Conrad) | ảnh cao **~60–65 %**, tâm x 50 %, tên ở dưới (chữ cao ~5 %) | 60–65 %, nhưng đặt lệch trái 30 %, tên nhỏ ở bên phải |
| cặp chân dung (Anh ↔ Đức, "YOLO") | mỗi ảnh cao **~60 %**, cỡ bằng nhau, tâm x **33 % / 67 %**, cờ cao ~12 % ở dưới mỗi ảnh | — |
| xe + người (một cutout) | to ~70 % khi vào cảnh (0:50), rồi **~36 %** khi nhường chỗ cho tờ báo (0:54); ~43 % ở quán cà phê (1:16) | xe ~29 % + **đầu Thái tử ~22 %** dán riêng (đầu bằng ~¾ chiều cao xe) |
| nhân vật đầu tròn trong đám đông | đầu ~16 % khung (đám đông gần), hàng người bị CẮT ở mép trên | ~10 %, 16+ người đè lên ảnh phố thật |
| người trong cảnh dựng (bệnh viện) | bust ảnh thật cao ~40 %, **ngồi trên mép dưới**; bệnh nhân đầu tròn ~9 % | ảnh bệnh viện thật + xe + 2 bust, không có người bệnh |
| tổng diện tích chủ thể / khung đen | 20–35 % (phần còn lại là nền trơn) | 8–42 % |

## 2. Họ làm gì — từng cảnh người dùng chỉ ra

**(a) Xe ở Sarajevo** — `cmp-car.jpg`, `strip-assassin-a.jpg` 0:46–1:10.
- Một cutout duy nhất: ảnh xe CÓ SẴN người ngồi, giữ đúng tỉ lệ thật, không viền sticker, đặt trên nền đen.
- Diễn trong 4 nhịp:
  - vào to (~70 % cao);
  - lùi xuống góc trái dưới (~36 %) để nhường chỗ cho tờ báo nghiêng ~10° xoay vào (có nhoè xoay);
  - thêm nhãn "Assassinated ↓" chỉ vào xe;
  - cắt sang cảnh đám đông.
- Đám đông là cảnh RIÊNG: nền vẽ trắng (một vạch sàn, cửa sổ màu nhạt bị nhoè), một hàng ~10 người đầu tròn bị cắt ở mép
  trên, một tên sát thủ mũ nâu. Xe chỉ lướt qua với nhoè chuyển động, quả bom là một chấm đen, nổ bằng stock thật.
- Cùng cutout xe đó được dùng lại ở **6 cảnh** (0:50, 1:00, 1:04, 1:09, 1:16, 1:19). Người xem nhận ra "chiếc xe" như
  nhận ra một nhân vật.

**(b) Bệnh viện** — `cmp-hospital.jpg`, `strip-assassin-b.jpg` 1:12.
- Phòng vẽ bằng nét đen mảnh, phối cảnh nghiêng, nền trắng xanh nhạt.
- Chỉ 4 loại đạo cụ: hai giường, cửa sổ, chữ thập đỏ, bình hoa.
- Bệnh nhân là đầu tròn mắt chấm trên giường.
- Thái tử là bust ảnh thật ngồi trên mép dưới khung (không trôi lơ lửng). Chữ "Hey" rất nhỏ (~2 % cao) có một nét chỉ.
- Đúng **một** ý trong khung: "ông ấy đến thăm người bị thương".

**(c) Rẽ nhầm** — `cmp-wrongturn.jpg`.
- Họ KHÔNG vẽ sơ đồ đường phố. Họ dựng **cảnh**: mặt tiền quán "Cafe" vẽ phẳng (vàng, cửa sổ xanh), đường xám.
  Tên sát thủ đứng ở 1/3 trái. Xe cutout (cùng tấm ở (a)) đỗ ở 2/3 phải, cao ~43 %.
- Phát súng là một nét thẳng từ khẩu súng tới xe.
- Sau đó whip-zoom vào mặt Thái tử với mắt meme, rồi cắt màn đen 0.7 s.
- Địa lý chỉ dùng bản đồ CHUNG của cả video (Sarajevo là chấm vàng trên bản đồ vệ tinh, 0:42).

**(d) Mắt meme** — `cmp-meme.jpg`, `strip-opening.jpg` 0:20, `strip-belgium-meme.jpg` 2:49–2:51.
- Hai vòng trắng viền đen dày đặt ĐÚNG lên mắt thật trong ảnh.
  - Mỗi vòng có đường kính ~25–30 % bề ngang mặt; viền đen ~12 % đường kính; con ngươi đen ~45 % đường kính.
  - **Con ngươi liếc về phía nhân vật kia**, nên ánh mắt là mũi tên chỉ hướng của câu đùa.
- Thêm một đạo cụ cảm xúc: giọt mồ hôi xanh, má đỏ (0:20).
- Chữ meme ("YOLO ¯\\_(ツ)_/¯") nhỏ, nghiêng, kèm một nét gạch chỉ vào người nói.
- Ảnh vẫn đặt trên nền đen, cỡ bằng nhau, đối xứng 33 / 67 %.
- Phiên bản cận: whip-zoom vào mặt (nhoè ~0.3 s), mắt chiếm ~35 % cao khung, giữ ~1 s.

**(e) Người dẫn.** Họ KHÔNG có người dẫn trên hình. Nhân vật là chính các nước và người trong lịch sử. Toàn bộ khung dành
cho thông tin.

## 3. Bảng kỹ thuật — họ làm gì → ta làm trong canvas thế nào

| họ làm | ta làm trong canvas (tất định, không `shadowBlur` / `ctx.filter`) |
|---|---|
| **3 loại nền** cố định: đen tuyền / vẽ phẳng sáng / bản đồ một kiểu | `bg(kind)` trong kit tập: `'black'` = `#000`; `'drawn'` = trắng + vignette radial gradient xám (≤ 12 %) hoặc trời–đồi (2 gradient + 1 đường cong); `'map'` = một hàm bản đồ duy nhất của tập. Cảnh khai báo `bg`, không tự vẽ nền. |
| ảnh thật = VẬT trên nền đen, cỡ chuẩn | `doc(img, {slot:'center'|'L'|'R', h:0.62})`: slot center → tâm x 0.5; L / R → 0.33 / 0.67; cao 0.62 H; tên ở dưới cao 0.05 H. Một hàm, mọi chân dung đi qua đây. |
| một cutout = một nhân vật, dùng lại nhiều cảnh | thư mục `assets/hist/cut/<vật>.png` (vd. xe có sẵn người ngồi), mỗi vật một **cỡ chuẩn** trong `cast.json` (`h: 0.40`). Cảnh chỉ được nhân với 0.5–1.8, không đặt cỡ tuỳ ý. |
| không viền sticker trên cutout ảnh | viền trắng chỉ cho nhân vật vẽ (người dẫn); cutout ảnh để mép sạch (mặt nạ alpha khử răng cưa 1 px). |
| bust ngồi trên mép dưới | `anchor:'bottom'` → y đáy = H (cắt ngang ngực), không trôi giữa khung. |
| đám đông bị cắt ở mép | hàng người đặt sao cho đầu chạm hoặc vượt mép trên / dưới; đám đông = 1 nhóm, ≤ 12 người trong khung. |
| tách theo THỜI GIAN chứ không chồng | xe + đám đông + sát thủ + Thái tử = 3–4 khung liên tiếp, mỗi khung ≤ 3 nhóm; `SHOTS.md` ghi số nhóm mỗi khung. |
| cảnh dựng vẽ nét mảnh | `drawnRoom()` / `facade()`: nét đen `lineWidth = 0.0035·H` (~4 px ở 1080), tô phẳng, 3–5 đạo cụ. |
| whip pan / zoom giữa hai khung bản đồ | 4–8 khung: vẽ 5 bản mờ (alpha 0.2) dọc vector dịch chuyển = nhoè chuyển động giả (study 15 §7); dịch camera theo easeInOut. |
| vật trượt vào có nhoè | cùng hàm ghost copies, ≤ 0.3 s, sau đó ĐỨNG YÊN. |
| mắt meme | `googly(face, {lookAt})`: 2 vòng trắng `r = 0.14·faceW`, viền `0.12·r`, con ngươi `0.45·r` lệch về phía `lookAt`; toạ độ mắt đo tay một lần cho mỗi ảnh, lưu trong `cast.json`. |
| màn đen + chữ đổi hướng ("EXCEPT / NO") | `card(text)`: chữ trắng đậm cao 0.25–0.35 H, hiện từng từ theo mốc lời. |
| nhạc nền liên tục, nghỉ câu chỉ thấp hơn lời ~5 dB | `tools/hist/mix.py`: giữ nhạc dưới lời, không tắt giữa câu; lặng hoàn toàn chỉ ở 1–2 khoảnh khắc (đã có: khoảnh khắc cái chết). |

## 4. Bản 3 của ta sai ở đâu

1. **Cảnh xe (`cmp-car.jpg`, ta 126 s và 133.5 s).**
   - Xe cutout một ảnh, đầu Thái tử + Sophie cắt từ ảnh khác dán vào. Đầu cao ~22 % khung trong khi xe ~29 %, tức to gấp
     ~4 lần tỉ lệ thật.
   - Nền là ảnh phố sepia rối mắt. Thêm 16 người đầu tròn, người dẫn vẫy cờ, chữ "SOPHIE, HIS WIFE" và dòng nguồn ảnh:
     khoảng **22 phần tử trong một khung**.
   - Họ chỉ có 2 (xe, tờ báo) trên nền đen.
2. **Bệnh viện (`cmp-hospital.jpg`, 168.5 s).**
   - Tấm bưu thiếp bệnh viện thật làm nền, xe + 2 bust dán trước cửa. Không có người bị thương, nên ý "thăm người bị
     thương" không hiện ra.
   - Họ: phòng vẽ, giường, bệnh nhân, Thái tử nói "Hey". Hình nói đúng câu.
3. **Sơ đồ rẽ nhầm (`cmp-wrongturn.jpg`, 175.5 s).**
   - Kiểu bản đồ thứ 5 trong tập: be phẳng, chữ nhỏ, hình chữ nhật đen làm xe, không có ai.
   - Màu và độ chi tiết không giống bất kỳ cảnh nào khác. Đó là cảm giác "lệch tông" người dùng nói.
   - Họ không làm sơ đồ; họ dựng cảnh với cùng cutout xe và một mặt tiền vẽ.
4. **Mắt / meme (`cmp-meme.jpg`).**
   - Ta có "*splash?*", "NOBODY TOLD HIM", mặt xanh của sát thủ: chữ đè lên ảnh rối, không có ánh mắt dẫn hướng.
   - Họ: đặt ảnh sạch trên nền đen, mắt to liếc sang nhân vật kia, câu meme 1–2 từ.
5. **Người dẫn (`cmp-presenter.jpg`, 9 s và 45 s).**
   - Người dẫn toàn thân cao **56–62 % khung**, đứng ở 1/3 phải, hiện ~32 % thời lượng.
   - Ở 45 s, ảnh Rhodes Colossus bị đẩy lệch trái để chừa chỗ, khiến nửa phải khung là nền than trống + người dẫn.
6. **Năm kiểu bản đồ** (`ours-strip-all.jpg` 0:30, 0:36, 0:54, 1:21, 2:55).
   - Mỗi lần đổi kiểu là một lần người xem phải học lại "bản đồ trông thế nào".
   - Họ dùng 1 kiểu suốt 6 phút.
7. **Chữ ở khắp nơi.**
   - Nhãn đỏ chéo, tiêu đề góc, dòng nguồn ảnh ở mọi khung có ảnh.
   - Họ có chữ ở ~38 % cảnh, mỗi khung tối đa một khối chữ to.
8. **Nét không đồng nhất.**
   - Người đầu tròn của ta viền dày, mặt cười. Cutout ảnh có viền trắng dày. Người dẫn anime nét tô bóng. Bản đồ phẳng.
     Đó là bốn ngôn ngữ nét trong một khung.
   - Họ: mọi thứ vẽ đều cùng nét đen mảnh; ảnh thật thì không viền.

## 5. Luật đề xuất cho kênh lịch sử (kiểm được bằng số) — chờ người dùng duyệt

1. **Ba nền.** Mỗi cảnh khai báo `bg ∈ {black, drawn, map}`.
   - Ảnh tư liệu tràn khung làm nền: ≤ 5 % thời lượng, và chỉ đè ≤ 1 lớp (mũi tên / mắt meme).
   - Kiểm: đếm `bg` trong `SHOTS.md`.
2. **Một kiểu bản đồ một tập.** Mọi bản đồ, kể cả "sơ đồ phố", là phóng to của cùng một hàm bản đồ (cùng bảng màu, cùng
   viền). Không làm được thì dựng cảnh vẽ thay vì sơ đồ.
3. **Cỡ chuẩn theo loại khung.** Lệch quá ±10 % thì phải có lý do ghi trong `SHOTS.md`.
   - Chân dung đơn: cao **0.62 H**, tâm x 0.5.
   - Cặp chân dung: mỗi ảnh **0.60 H**, tâm x 0.33 / 0.67, cỡ bằng nhau ±5 %.
   - Vật chính trong cảnh dựng (xe có người): **0.35–0.45 H**.
   - Bust trong cảnh: 0.35–0.45 H, đáy chạm mép dưới.
4. **Cutout giữ tỉ lệ thật.**
   - Người trong xe phải là cùng một ảnh với xe.
   - Nếu buộc ghép, đầu ≤ 0.2 × chiều cao xe.
   - Cấm dán bust to lên xe nhỏ.
5. **≤ 3 nhóm đọc được mỗi khung.** Một đám đông, một hàng lính, một cụm cờ đều tính là 1 nhóm. Nhiều hơn thì tách thành
   khung sau (cắt theo câu).
6. **Khoảng trống.** Trên nền black / drawn, ≥ 40 % diện tích là nền trơn.
   - Mép an toàn: chủ thể cách mép ≥ 5 % W.
   - Ngoại lệ có chủ đích: đám đông cắt mép trên, bust ngồi mép dưới, người dẫn nép góc.
7. **Người dẫn nhỏ và nép góc.**
   - Cao ≤ **0.28 H** (nửa trên cơ thể, cắt ở mép dưới).
   - Toàn bộ trong 18 % W ngoài cùng của góc dưới phải (hoặc trái, khi chủ thể ở phải).
   - Hiện ≤ **15 %** thời lượng.
   - Bbox người dẫn không được giao với bbox chủ thể.
   - Cận mặt toàn khung chỉ dùng cho 2–4 nhịp gag mỗi tập.
8. **Một ngôn ngữ nét.**
   - Mọi thứ vẽ (người đầu tròn, phòng, mặt tiền, đạo cụ) dùng nét đen `0.0035 H` (±30 %).
   - Cutout ảnh: không viền.
   - Viền trắng sticker chỉ dành cho người dẫn.
9. **Chữ.**
   - ≤ 1 khối chữ to (≥ 0.05 H) mỗi khung; ≤ 45 % số khung có chữ to.
   - Tên người: dưới ảnh, cao 0.05 H, căn giữa theo ảnh.
   - Thoại meme ≤ 4 từ, cao 0.03–0.05 H, có nét chỉ.
   - Dòng nguồn ảnh PD gom vào mô tả + thẻ cuối; ảnh CC BY thì giữ nguồn trên hình, nhưng cỡ ≤ 0.015 H.
10. **Mắt meme theo thông số.**
    - Đường kính ≈ 0.28 × bề ngang mặt, viền 12 %, con ngươi 45 %.
    - Con ngươi nhìn về nhân vật / vật của câu đùa.
    - Vào bằng cắt (không fade); giữ ≥ 1.0 s.
    - Tối đa 1 mặt meme mỗi 20 s.
11. **Chuyển động.**
    - Vật vào khung: trượt + nhoè ≤ 0.3 s, rồi đứng yên.
    - Đổi chỗ trên bản đồ: whip / zoom 4–8 khung.
    - Không trôi chậm liên tục.
    - Mục tiêu khung đứng yên 15–25 % (`pace.py`; họ 19 %, ta 12 %).
12. **Dùng lại vật xuyên suốt.**
    - Mỗi tập chọn 1–3 cutout "nhân vật đồ vật" (xe, tờ báo, khẩu súng).
    - Mỗi vật hiện lại ≥ 3 cảnh, cùng cỡ chuẩn, cùng hướng.
13. **Cảnh dựng thay sơ đồ.** Sự kiện xảy ra ở một chỗ cụ thể (rẽ nhầm, bệnh viện, quán cà phê) được dựng thành một cảnh
    vẽ phẳng 3–5 đạo cụ + cutout. Câu nói gì, hình cho thấy đúng điều đó (có người bệnh khi nói "thăm người bị thương").
14. **Nhạc nền không tắt giữa câu.** Nhạc dưới lời liên tục, khoảng nghỉ thấp hơn lời ~5–8 dB. Lặng hoàn toàn chỉ ở 1–2
    nhịp có chủ đích mỗi tập.

Kiểm tự động khả thi:
- `SHOTS.md` + một gác đọc `cast.json` / bbox từ `shoot.js stills`: đo cỡ chủ thể, bbox người dẫn, số nhóm, tỉ lệ nền trơn.
- Vẫn phải NHÌN ảnh (luật 3 của AGENTS).

## 6. Ráp vào sarajevo v4 (gợi ý, chưa làm)

| cảnh v3 | v4 theo luật |
|---|---|
| xe + 2 bust + đám đông trên ảnh phố (2:03–2:30) | (1) nền đen: cutout xe có người ngồi, cao 0.70 H → lùi 0.36 H góc trái, tờ báo / bản tin nghiêng vào bên phải; (2) cảnh vẽ: hàng đầu tròn cắt mép trên + sát thủ, xe lướt qua có nhoè |
| ảnh bệnh viện + xe (2:48) | phòng vẽ nét mảnh, 2 giường có bệnh nhân đầu tròn, bust Thái tử ngồi mép dưới, thoại ngắn |
| sơ đồ be (2:55) | mặt tiền phố vẽ + biển tên phố, xe cùng cutout, mũi tên "WRONG WAY" là thoại của Potiorek (bust nền đen ở cảnh trước) |
| người dẫn toàn thân 0.56–0.62 H | nửa người ≤ 0.28 H góc dưới, chỉ ở nhịp chuyển đoạn và bình luận; xoá khỏi cảnh có chân dung / bản đồ dày |
| 5 kiểu bản đồ | chọn 1 (đề xuất: bản đồ phẳng tô cờ của `mapkit.js`, đã có mắt); các bản đồ khác thành cảnh phóng to của nó |

## 7. Âm thanh — họ đặt tiếng thế nào

Người dùng chê tiếng `dun` tự tạo của ta (sting kịch tính ở 2:20, vào lúc lộ "Black Hand", và ở 3:05): "lạc quẻ, không
khớp hình". `dun` đã bị bỏ (`projects/hist/sarajevo/assets/sfx/CREDITS.md`). Người dùng lại khen phần tiếng của Oversimplified.

**Cách đo.**
- Tách lời khỏi nhạc + hiệu ứng bằng Demucs (htdemucs, `--two-stems=vocals`), chỉ để PHÂN TÍCH, trong scratchpad.
  Các stem đã xoá ngay sau khi đo; KHÔNG lưu, KHÔNG dùng lại tiếng của họ (bản trộn có bản quyền).
- Dò onset trên phần nhạc + hiệu ứng: đỉnh vượt nền nhạc (trung vị 3 s) ≥ 6 dB.
- Vẽ phổ 0:40–2:10, 2:20–3:20, 4:00–5:00, rồi đối chiếu từng mốc với khung hình (`sfx-events.jpg` trong thư mục lab).
- Không nghe trực tiếp được, nên loại tiếng được suy từ hình phổ (dải tần, độ dài, dạng nổ / vệt) + việc trên hình.
  Mức tin được ghi ở cột cuối.

**Số chung.**

| | Oversimplified | ta (sarajevo v3, `data/cues.json`) |
|---|---|---|
| hiệu ứng rõ (vượt nền ≥ 6 dB) | 50 onset / 6.4 phút ≈ **8 / phút**; trừ nhịp trống của nhạc thì còn khoảng **5–7 / phút** | **125 cue / 3.6 phút ≈ 35 / phút** (boom 30, pop 25, snap 16, bonk 15, whoosh 10…) |
| nhạc nền | gần như liên tục; mức RMS thấp hơn đỉnh lời ~8 dB ở 90 s đầu (nhạc "kể chuyện" to), ~15–20 dB ở phần bản đồ về sau | — |
| chỗ nhạc DỪNG | 0:10 (1.5 s, "LET'S HAVE A WAR" hiện từng chữ trên im lặng) · 1:07.6 (1.5 s, "EXCEPT / NO") · 1:19.2–1:21.6 (trước và sau phát súng, màn đen) · 1:55.5 (3.1 s, Anh "…Maybe?" + giọt mồ hôi) · 3:32.4 (2.3 s, "Did you see him?" — mũi tên chỉ người lính) · 2:30–2:46 (nhạc nhường chỗ cho tiếng trận) | nhạc có, lặng 1 chỗ (khoảnh khắc cái chết) |

→ Họ dùng **ít hơn ta khoảng 5 lần** số hiệu ứng. "Hiệu ứng" mạnh nhất của họ là **cắt nhạc đúng nhịp gag**: 5 lần dừng
nhạc trong 6 phút, mỗi lần 1.5–3 s, đúng vào câu đùa hoặc khúc ngoặt.

**Danh mục.** Mức = đỉnh hiệu ứng so với đỉnh lời quanh đó (RMS 20 ms). Dương nghĩa là to hơn lời.

| loại | ví dụ (giờ) | gắn với gì trên hình | mức so với lời | dài | mật độ | tin |
|---|---|---|---|---|---|---|
| **whoosh** (gió lướt, dải rộng, nhẹ) | 0:13.3 · 0:16.5 · 0:18.7 · 0:52.0 · 1:00.5 | máy quay whip / zoom giữa hai khung bản đồ; tờ báo xoay vào; xe lướt qua đám đông có nhoè | −7 … −2 dB | 0.3–0.6 s | ~1.5 / phút, dồn ở đoạn mở | cao |
| **pop / blip** (ngắn, sáng, 1–3 kHz) | 0:20.9 · 0:23.8 · 0:25.7 · 0:27.3 · 0:55.8 | một vật HIỆN ra: mắt meme bật lên, bong bóng "we are so hot", mặt giận mọc trên bản đồ, nhãn tên dân tộc, nhãn "Assassinated" | −11 … −3 dB | 0.1–0.2 s | ~2 / phút | cao |
| **thump** (trầm 300–850 Hz, ngắn) | 1:41.0 · 1:41.7 · 1:44.4 · 1:48.6 · 1:52.8 | mũi tên "WAR" / "FRIENDS" cắm lên bản đồ, nhãn "kind of friends" | −5 … +1 dB | 0.2–0.3 s | dồn theo chuỗi mũi tên (5 cái trong 12 s), rồi thôi | trung bình (có thể lẫn trống nhạc) |
| **bước chân nặng** | 2:04.7 · 2:07.1 | nước Nga có chân que đi lạch bạch ("big and clumsy") | −8 … −5 dB | 0.2–0.3 s | 2 tiếng, chỉ ở cảnh này | trung bình |
| **nổ** | 1:02.0 (bom nổ trước đám đông) · 2:30.0 ("INVASION", khung loé trắng) · 4:33.5 (Tannenberg) · 5:25.8 (đạn pháo rơi chiến hào) | vụ nổ có trên hình (stock lửa / chớp vàng) | +4 dB (bom) · **+12 dB** (Invasion, chiến hào) | 0.5–1.2 s, đuôi dài | 4 lần / 6.4 phút | cao |
| **súng** | 1:20.8 | khung đen ngay sau whip-zoom mắt meme: 1.5 s im lặng → một phát súng → im lặng tiếp 0.5 s | ≈ 0 dB, nhưng vượt nền +43 dB vì đứng trong im lặng | ~0.6 s (đuôi vang) | 1 lần | cao |
| **cắt nhạc / scratch ngắn** | 1:07.5 | chữ "EXCEPT" bụp lên nền đen, nhạc tắt ngay | +1.5 dB | 0.1 s, rồi lặng 1.5 s | 1 lần | trung bình (không chắc là scratch hay chỉ là cú cắt) |
| **sting nhạc** (chuông / hợp âm lấp lánh) | 1:05.6–1:07.4 | biểu tượng hoà bình + chim bồ câu trên quả địa cầu ("the whole war never happens") — sting **đùa**, ngay sau đó bị "EXCEPT NO" cắt | +4.6 dB | 1.8 s | 1 lần | cao |
| **sting nhạc** (kèn / hoà âm ngắn) | 4:00–4:04 | "Russia's ready for war… way earlier than expected" | ≈ 0 dB | ~4 s | 1 lần | trung bình |
| **không khí trận** (tiếng súng xa liên tục, dải rộng) | 2:30–2:34 · 2:35–2:39.5 · 2:40–2:44.5 | Đức tràn qua Bỉ, trận Liège trên bản đồ; nhạc ngừng nhường chỗ | **−13 dB** (rất nhỏ, dưới lời) | 3–4.5 s mỗi khối | 1 đoạn | trung bình |
| **đám đông reo** | 3:21–3:26 ("Yay Germany!!") | đám đông người que vẫy cờ | −7 dB, nhạc gần như tắt | ~5 s | 1 lần | thấp (mức rất nhỏ, có thể chỉ là nhạc) |
| **boing** | — | không thấy | | | 0 | |
| **im lặng** | 0:10 · 1:07.6 · 1:19.2 · 1:55.5 · 3:32.4 | chữ to trên nền đen, khúc ngoặt, trước / sau phát súng, câu trả lời lửng "Maybe?", gag "Did you see him?" | — | 1.5–3.1 s | ~0.8 / phút | cao |

Không thấy tiếng hiệu ứng cho: cảnh bệnh viện, xe đỗ ở quán cà phê, chân dung, phần lớn các lần bản đồ đổi màu. **Phần
lớn các lần cắt cảnh KHÔNG có tiếng.**

**Luật đề xuất (âm thanh, chờ duyệt):**
1. **Tiếng chỉ đi với một việc NHÌN THẤY được.** Một vật bật ra → pop; máy quay lia → whoosh; mũi tên cắm → thump; vụ nổ
   có trên hình → nổ. Không có việc trên hình thì không có tiếng. Sting "kịch tính" không gắn với vật nào (như `dun` của
   ta lúc lộ Black Hand) bị loại.
2. **Mật độ 6–12 hiệu ứng / phút** (họ ~6–8; ta 35). Riêng chuỗi lặp (14 boom trong 6 s ở 0:19–0:25 của ta) chỉ tính
   là 1 sự kiện, và tối đa 3 lần lặp.
3. **Mức:** pop / whoosh thấp hơn lời 3–10 dB; thump ~0 dB; nổ / súng được +4 … +12 dB nhưng tối đa 1 lần / phút.
4. **Im lặng là hiệu ứng.** 3–5 chỗ cắt nhạc mỗi 5 phút, 1.5–3 s, đúng câu đùa / chữ to / khúc ngoặt. Súng hay nổ đặt
   NGAY SAU 1–1.5 s im lặng.
5. **Nhạc nền không đổi theo từng câu.** Đổi bản nhạc theo đoạn (giới thiệu → âm mưu → chiến tranh). Trong đoạn chiến
   sự, nhạc có thể nhường chỗ cho tiếng trận nhỏ (−13 dB).
6. **Sting nhạc chỉ để ĐÙA hoặc ĐỔI ĐOẠN**, mỗi tập ≤ 2, và phải có hình đi kèm (biểu tượng, tiêu đề).

**Tìm tiếng tương đương CC0 / PD (từ khoá tìm):**

| loại | Freesound (lọc License = Creative Commons 0) | OpenGameArt (CC0) / Openverse (lọc "use commercially" + CC0 / PDM) |
|---|---|---|
| whoosh | `whoosh short swish`, `swipe transition`, `whip pan` | `whoosh`, `swish` |
| pop | `pop ui`, `bubble pop short`, `blip appear` | `UI pop`, `interface blip` (vd. bộ "100 CC0 SFX" đã có) |
| thump | `thud low`, `stamp hit`, `paper slam table` | `impact thud`, `hit low` |
| bước chân nặng | `heavy footstep stomp`, `giant footstep cartoon` | `footstep heavy` |
| nổ | `explosion distant`, `artillery explosion`, `bomb blast` | Commons "Explosion" (PD — đã có "Explosion 10") |
| súng | `pistol shot single`, `revolver gunshot outdoor` | OGA "Gunshot sounds" (đã có) |
| cắt nhạc | `record scratch`, `vinyl stop`, `tape stop` | `record scratch` |
| sting đùa | `angelic choir short`, `harp glissando`, `magic chime sparkle` | `harp`, `chime sparkle` |
| không khí trận | `distant gunfire battle ambience`, `war ambience rifles` | Commons "battle sound" (kiểm PD) |
| đám đông reo | `crowd cheer small`, `crowd yay` | Commons "Crowd cheering" (đã thiếu bản reo CC0 — CREDITS ghi đang dùng vỗ tay) |

Nhạc: vẫn dùng nhạc của kênh (bản Suno cũ hợp DNA), không tìm nhạc ngoài.

## 8. Không bắt chước
- Nhân vật đầu tròn mắt chấm, thân con nhộng của họ là thiết kế nhận diện của Oversimplified. Ta giữ người đầu tròn của
  kênh mình và chỉ học **độ dày nét, cỡ, vị trí**.
- Câu đùa ("7 Essential Tips…", "YOLO", "piss!", "Group Huddle?"), cấu trúc "EXCEPT NO" y nguyên chữ, tờ báo tên giả
  của họ.
- Bản đồ vệ tinh của họ (nguồn không rõ giấy phép): ta dùng bản đồ của mình.
- Ảnh thân người cơ bắp, cảnh ghép tục: kênh ta cho người xem toàn cầu, giữ sạch.
