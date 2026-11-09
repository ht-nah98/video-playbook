# Dựng hình + tiếng kênh lịch sử — luật edit

Nguồn: `docs/study/16-oversimplified-ww1.md` (dựng hình + tiếng, đo trên WW1 Part 1, so với Sarajevo v3) và
`docs/study/17-oversimplified-american-revolution.md` (DNA một tập 15 phút), cùng `docs/study/15-thanh-pahm-editing.md`.
Người dùng 2026-10-27: "một kích thước, khung hình phù hợp, vị trí phù hợp, size phù hợp — bạn cần học thêm việc edit".
**Đã có hiệu lực** = người dùng đã nói thẳng. **Đề xuất** = chờ người dùng duyệt (hỏi khi dựng tập sau).
**Hướng chung (người dùng 2026-10-27, "có kết hợp với DNA của Thanh Pahm không"):** DNA Thanh Pahm (người dẫn 4 vai trong lịch
sử, ảnh thật + đầu tròn + mặt quốc gia + lớp meme, ảnh nơi chốn làm nền, khung mở bài chào → câu châm → tên trận → bối cảnh)
+ KỶ LUẬT dựng của OverSimplified (cỡ, khung, số lớp, một kiểu bản đồ, tiếng ít mà trúng). Mở bài GIỮ câu chào (không sketch
lạnh trước chào — người dùng chọn, study 17 P9 bỏ).
Học kỹ thuật, KHÔNG chép nét vẽ / nhân vật / câu đùa của mẫu (study 16 §8, study 17 §9).

## A. Đã có hiệu lực
1. **Người dẫn VẼ NÉT bằng code** (`_kit/narrator.js`, v2 2026-10-28; bảng xem `projects/hist/_lab/narrator.html`): đồ + dáng +
   miệng sinh bằng code (CHARACTER §1); miệng nhép theo đường bao giọng (≤ 12 lần đổi / s). **Nói ở góc** (`S.lipHost`): bán
   thân, thấy vai + ngực (KHÔNG nằm tịt góc), cách mép phải ≈ 0.04 W, thân cắt ở mép dưới; không đè chủ thể; ghi nguồn ảnh đặt
   góc TRÁI (§196). **Nhập vai trong cảnh**: toàn thân cao bằng người xung quanh.
2. **Nhất quán qua các cảnh liền nhau cùng nơi** — người / vật giữ chỗ đứng + cỡ; đổi dáng tại chỗ (vẫy cờ → núp) (§194).
   Người dẫn nhập vai trong đám đông cao bằng người dân (±10 %).
3. **Cỡ + khung nhất quán; cutout giữ tỉ lệ thật** — người ngồi xe phải cùng một ảnh với xe hoặc đầu ≤ 0.2 × cao xe;
   cấm dán bán thân to lên xe nhỏ (§193).
4. **Không vẽ giả vật / nơi** — xe, phố, bệnh viện là ảnh thật cắt nền hoặc cảnh vẽ phẳng có chủ đích; không sơ đồ lạc tông
   (sơ đồ phố be bản 3 bị chê) (§188, §193).
5. **Cận mặt người dẫn chỉ là phản ứng ≤ 1.2 s** sau cú chốt; lúc lời đang kể, hình minh hoạ câu (§197).
7. **Người dẫn nhập vai bằng HÌNH, không bằng lời** (người dùng 10-28, PLAYBOOK §3) — thay một người trong nhóm bằng người dẫn
   đúng đồ, cùng cỡ, không nhãn "that's me", không câu "I was there"; ~1 lần / 1–1.5 phút cạnh sự kiện quan trọng: nhóm kín
   (mật đàm, hội kín), cảnh đông người (đám đông vẫy cờ, hàng lính, hội nghị); không ở cảnh chân dung / bản đồ / chết chóc;
   hình không cắt nửa đầu (WRITING §1c, LESSONS §200, §204).
6. **Tiếng phải khớp một việc nhìn thấy** — cấm sting kịch tính tự tạo không gắn vật (`dun` bị chê ở 2:20 và 3:05) (§195).
8. **Bản đồ nói Ở ĐÂU, cận cảnh nói CÁI GÌ** (hist/berlin, §223): trên bản đồ chỉ ký hiệu đọc được ở cỡ nhỏ (đường, mũi tên,
   ghim) + nhãn; hành động cần thấy đồ vật (cắt rào, ký giấy) → cận cảnh riêng ≥ 1.5 s. Thử: che tiếng, vẫn mô tả được vật?
9. **Nhãn / mặt / ghim trên bản đồ nằm TRONG vùng của nó** (§222): đặt tại kinh/vĩ tâm vùng (`V.pt(ll(M, lon, lat))`), không dời
   bằng px cố định; hai vùng sát nhau → nhãn giữa vùng, không trên ranh giới.
10. **Chữ trong ô → đo chữ trước** (`measureText`), ô theo chữ (thẻ PRESS tràn ô — §222).
11. **Cảnh đọc được từ 0.5 s đầu** (§227): nền + vật + nhãn chính hiện ngay đầu cảnh; `wd(…)` chỉ cho điểm nhấn (dấu, khoanh, đổi trạng thái).
12. **Bản đồ mới: bàn thử trước, đặt sẵn mọi ghim / mặt của tập** (§228) — kiểm từng điểm nằm trên polygon; thiếu đảo → ghép Natural Earth (PD).
    Mặt quốc gia trên bản đồ không phải châu Âu 1914: neo tạm ANCHOR/SIZE trong scene (`face()` ở `projects/hist/pearl/scenes/a1.js`), bán kính px cố định.
13. **Khoanh / chỉ vào chi tiết ẢNH đang zoom → toạ độ phân số của ảnh** (§229), kiểm khung đầu + cuối cảnh.
14. **Vật CÓ TÊN dùng ảnh thật, số đông vô danh thì vẽ, meme chèn ở khoảnh khắc chốt** (người dùng 2026-10-30):
    - Một vật cụ thể, có tên trong lịch sử (tàu USS Ward, radar SCR-270 Opana, đoàn B-17, Enola Gay, xe của Thái tử) → ảnh thật PD
      cắt nền (`tools/hist/cutout.py`) ghép vào cảnh, cỡ nhất quán (A3).
    - Số đông / chung chung (hàng máy bay đỗ, đàn 183 máy bay, dòng xe kẹt) → vẽ phẳng: gọn, đếm được, làm hành động hài được;
      có thể nối ngay một ảnh thật của cùng nơi cho "đây là chuyện thật".
    - Meme ở cú chốt (≤ 1–2 s, ít mà trúng): ưu tiên ảnh PD hoặc VẼ LẠI khuôn meme bằng người dẫn / dàn nhân vật (khán giả nhận ra
      khuôn, không dính bản quyền). Meme gốc có bản quyền (ảnh phim, truyện tranh như "This is fine") → hỏi người dùng trước.

## B. Đề xuất (chờ duyệt) — hình
| # | luật | số đo kiểm |
|---|---|---|
| B1 | **Người dùng chọn 2026-10-27: NGHIÊNG THANH PAHM** — ảnh nơi chốn thật tràn khung (phố, rừng, sông) dùng thoải mái làm nền như Thanh Pahm; chỉ sửa CỠ (B3) và SỐ LỚP (B4: ≤ 3 nhóm đọc được, không chồng ba chất liệu lên một ảnh). Nền đen / vẽ phẳng / bản đồ cho cảnh cần gọn (chân dung, bài báo, sketch thoại) | đếm nhóm khi soi ảnh |
| B2 | Một kiểu bản đồ một tập (mọi bản đồ là phóng to của cùng hàm `mapkit`); không được thì dựng cảnh vẽ, không vẽ sơ đồ | — |
| B3 | Cỡ chuẩn: chân dung đơn 0.62 H giữa; cặp chân dung 0.60 H ở x 0.33 / 0.67; vật chính 0.35–0.45 H; bán thân trong cảnh 0.35–0.45 H chạm mép dưới | lệch > ±10 % ghi lý do |
| B4 | ≤ 3 nhóm đọc được mỗi khung; ≥ 40 % nền trơn; chủ thể cách mép ≥ 5 % W | soi ảnh |
| B5 | Một ngôn ngữ nét: nét đen ≈ 0.0035 H cho mọi thứ vẽ; cutout ảnh KHÔNG viền; viền trắng sticker chỉ cho người dẫn | — |
| B6 | Chữ: ≤ 1 khối chữ to (≥ 0.05 H) / khung, ≤ 45 % khung có chữ to; tên người dưới ảnh 0.05 H; thoại meme ≤ 4 từ có nét chỉ | — |
| B7 | Mắt meme trên ảnh thật: đường kính ≈ 0.28 × bề ngang mặt, con ngươi nhìn về vật của câu đùa, vào bằng cắt, giữ ≥ 1 s, ≤ 1 / 20 s | — |
| B8 | Chuyển động: vật vào trượt + nhoè ≤ 0.3 s rồi ĐỨNG YÊN; đổi chỗ bản đồ whip / zoom 4–8 khung; khung đứng yên 15–25 % (`pace.py`; họ 19 %, ta 12 %) | `pace.py` |
| B9 | Vật xuyên suốt: 1–3 cutout "nhân vật đồ vật" (xe, tờ báo) hiện ≥ 3 cảnh cùng cỡ, cùng hướng | — |
| B10 | Sự kiện ở một chỗ cụ thể → cảnh vẽ phẳng 3–5 đạo cụ + cutout, hình nói ĐÚNG câu (thăm người bị thương → có giường, có bệnh nhân) | soi ảnh |
| B11 | Hai chế độ đoạn: `talk` (sketch thoại, đứng yên tới ~15 s nếu thoại đổi ≤ 3 s) / `map` (bản đồ cờ, đổi ≤ 5 s) — study 17 P1 | ghi ở SHOTS |
| B12 | Người dẫn hiện ≤ 15 % thời lượng, cận mặt toàn khung 2–4 nhịp / tập (≤ 1.2 s mỗi lần — đã thành A5) | đếm |

## C. Tiếng — ĐÃ ÁP ở Sarajevo (bản 8: `data/cues.py`, thư viện `_kit/sfx/` + `_kit/music/`; §199, §201)
| # | luật |
|---|---|
| C1 | Mật độ 6–12 hiệu ứng / phút (họ ~6–8; v3 của ta 35); chuỗi lặp (nổ liên tiếp) tính một |
| C2 | Mức: pop / whoosh dưới lời 3–10 dB; tiếng đập ~0 dB; nổ / súng +4…+12 dB, tối đa ~1 lần / phút |
| C3 | **Im lặng là hiệu ứng**: 3–5 chỗ cắt nhạc / 5 phút, 1.5–3 s, đúng câu đùa / khúc ngoặt; súng, nổ đặt ngay SAU lặng (cue `hush` trong `tools/hist/mix.py` — study 17 P3) |
| C4 | Nhạc không đổi theo từng câu; đổi bản theo đoạn (giới thiệu → âm mưu → chiến tranh); nhạc dưới lời 15–25 dB |
| C5 | Sting nhạc chỉ để đùa hoặc đổi đoạn, ≤ 2 / tập, có hình đi kèm |
| C6 | Nguồn: CC0 / PD (Freesound CC0, OpenGameArt, Openverse — từ khoá ở study 16 §7, 17 §6b); không cắt tiếng từ video mẫu |

## D. Đề xuất (chờ duyệt) — lời + cấu trúc (study 17 §10)
P4 mật độ gag co giãn (1 / 15–20 s ở đoạn nguyên nhân, 45–60 s không đùa ở đoạn chết chóc) · P5 sổ gag chạy cho series ·
P6 nhận diện nhân vật quyền lực = chân dung thật + 1 màu áo + 1 vật · P7 thẻ điểm danh nhanh khi giới thiệu ≥ 3 người ·
P8 làn chữ đùa (gạch–sửa, dấu sao) · ~~P9 sketch lạnh trước câu chào~~ (người dùng chọn giữ câu chào) · P10 đón trước lời
bắt bẻ · P11 kết tập: câu phán nghiêm + thẻ tập sau đứng yên 12–20 s · P12 bản đồ trận = cờ phe làm quân cờ.

Không áp: thoại chỉ bằng chữ thay cho nhép miệng (study 17 P2) — người dùng muốn người dẫn NHÉP MIỆNG; thoại bằng chữ vẫn
dùng cho nhân vật lịch sử / quốc gia.

## Soát trước render (hist/hitler 141 mục QA, LESSONS §232–§237)
Ảnh: `python3 tools/hist/frames.py hist/<tập>` (đúng giờ, cỡ thật) → soi từng hồi, ghi `qa/findings.md`. Theo thứ tự đắt → rẻ:
1. **Sử trên hình:** mỗi ảnh thật có nhãn ngày → đối chiếu `DateTimeOriginal` / chú thích Commons; khác thời điểm lời → nhãn nói đúng, hoặc cảnh vẽ cho mốc lời. Mỗi mũi tên bản đồ: đặt bằng `P(V, lon, lat)` theo nguồn, đầu cuối đúng nơi thật; nhãn nằm trong vùng của nó.
2. **Đồ theo phe + năm:** ai, phe nào, năm nào đội gì (`pickel` chỉ tới WW1; lính Đức WW2 = `stahl` / outfit `wehr`, `helmet` là mũ Anh). Đám đông truyền `wears` theo bối cảnh — mặc định của `crowd` có fez, mũ chóp.
3. **Đoạn nghiêm:** không chữ đè mặt nạn nhân, không nhân vật cười cạnh ảnh người chết; thẻ ảnh trên bảng xếp hạng có nhãn để không hiểu nhầm (ảnh Pearl Harbor ≠ sai lầm của Hitler). Biểu tượng vẽ gần Hitler xem kỹ dáng (dấu gân giận 4 nét gợi chong chóng chữ thập ngoặc → đã bỏ).
4. **Bản đồ:** dữ liệu dừng ở biên bbox (europe1960 ~46°E, 63°B) → nối đất bằng `eastLand` kiểu hitler `common.js`, kẻo Nga thành biển. Pixel tuyệt đối dễ rơi xuống biển.
5. **Chữ + mép:** nhãn `nameTag` góc trái dưới đè nhân vật / đám đông → đưa lên trên; dấu `stamp` không rộng hơn tờ giấy, không đè số chứng minh; khay / thẻ bay không che chữ chốt. `famous` đặt đế ≤ 1060 (đế lòi y + 0,014 h). Chữ trong đồ vật bị `flip` phải lật lại.

## Độ giàu hình (LESSONS §238–§241, người dùng 11-02) — mẫu chuẩn: `projects/hist/berlin` bản v3
**Trailer ~7 s** (`a0.js` cảnh đầu hitler, berlin): lời chào giữ; mỗi từ khoá một nhịp; cắt 0,3–0,4 s; mỗi tập một khung từ thế giới của nó (tua ngược ảnh · TV chuyển kênh); người dẫn phản ứng ở góc; `cues.py` đặt tiếng đúng từng cắt; ảnh đoạn nghiêm không dùng.
**Phim tư liệu:** (1) khi viết gói, tìm Commons `<chủ đề> filetype:video` + nguồn NARA; gọi chậm, 429 thì nghỉ; chỉ PD / CC0. (2) tải về `out/hist/<tập>/film-src/` (không commit), lập bảng tờ phim bằng `-vf "fps=...,scale=240:-1,tile=8x6"`, nhìn rồi chọn giây. (3) `python3 tools/hist/film.py hist/<tập> <khoá> <nguồn> <giây> <dài>`. (4) chèn đè theo câu: `scenes/life.js` INSERTS `[từ, đến, phim, nhãn, nguồn]`, nối vào `frame()` + `episode.html`. (5) ghi nguồn trên hình + mô tả; nhãn năm phải đúng năm quay. (6) **Không để hình chớp (§242):** hai đoạn phim cách nhau < 1,5 s thì nối liền, đầu / cuối chèn ăn trọn mẩu cảnh vẽ < 1 s, đọc cắt cảnh nguồn trước khi chọn giây; `motion.py` liệt kê cú máy < 1 s sau trailer để xem từng chỗ.
**Làm sống cảnh vẽ** (`life.js`): `camera()` trôi 1,01–1,06 trong đoạn tĩnh; lớp theo bối cảnh (đèn flash, đèn pha, hơi thở); đám đông `cheer`. Giới hạn: lớp phủ không làm nhân vật diễn; cảnh đứng yên dài vẫn cần sửa trong cảnh.
**Đo:** `python3 tools/hist/motion.py out/hist/<tập>/<tập>.mp4`. Hướng tới ≤ ~25% đứng yên, nền phẳng ≤ ~10%, đoạn 15 s > 60% phải có lý do. Mốc: hitler 54/44 (bị chê) · pearl 45/30 · wrong-turn 23/25 · berlin v3 19/5 (được chọn). Nền thật hoặc có chi tiết, không mảng màu trơn.
