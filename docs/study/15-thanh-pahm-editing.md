# 15 — Thanh Pahm "Thế Chiến 1": mổ kỹ thuật dựng (người dẫn, mặt meme, lính que, nhịp cắt) — cho kênh lịch sử

Người dùng 2026-10-27 muốn nghiên cứu thật kỹ video của Thanh Pahm. Cần trả lời bốn câu:
- cách đưa nhân vật kể sử vào video;
- cách ghép mặt nhân vật cho meme, hài hước;
- cách lồng người que đánh nhau;
- cách để người kể "là một thành viên trải nghiệm lịch sử".

Người dùng đã có mascot mới: `~/Downloads/Vietnamese Cartoon Character Design Sheet.png`.
- Đặc điểm: cậu bé tóc đen, áo hoodie đen, mặt "lơ đễnh, vô tri".
- Tấm thiết kế có 4 góc nhìn, 10 biểu cảm và 4 bộ đồ.

Bài này nối tiếp study 12. Study 12 đã ghi cách VIẾT lời (công thức 10 điểm) nên bài này không lặp lại; ở đây chỉ mổ HÌNH và DỰNG.

**Nguồn.** [Thế Chiến 1](https://youtu.be/iCAdtp_CNno), dài 17:59, 14.1 triệu lượt xem, 1080p 30 hình/giây.
- File người dùng gửi (`~/Downloads/20261027_034221_output.mp4`) là video nhạc gospel, không phải Thanh Pahm. Vì vậy bài này dùng lại bản đã tải ngày 10-24.
- Toàn bộ chất liệu ở `out/_lab/study/12-thanh-pahm-ww1/` (không commit):
  - `source.mp4`
  - `cuts.txt` — các mốc cắt cảnh
  - `shotsheet00–12.jpg` — mỗi cảnh một khung, có ghi giờ
  - `strip-{intro,sarajevo,trench,belgium}.jpg` — 1.5–2.5 khung mỗi giây

## 1. Số đo

| đo | số |
|---|---|
| cảnh (cắt ở ngưỡng scene > 0.2) | **260**; độ dài giữa **3.3 s**; 22 cảnh < 1 s; 26 cảnh > 8 s |
| lời | 4 871 từ, **272 từ/phút**; chỉ 16 khoảng lặng > 1.5 s, mỗi khoảng là một gag (xem §6) |
| người dẫn trên hình | **42/260 cảnh, ~220 s ≈ 20 % thời lượng**: 32 cảnh đứng góc phải (183 s), 6 cận mặt (9 s), 4 cảnh nhập vai (28 s) |
| hoạt hình | rất ít: vật cắt rời trượt vào kèm nhoè chuyển động, lặp 2–3 khung, nhún; gần như không có khung hình đi bộ thật |

**Kết luận số đo:** sức hút đến từ **ý tưởng hình cho từng câu**, không đến từ hoạt hình công phu. Mỗi 3 giây là một hình
mới khớp đúng một câu (thường là một phép ẩn dụ được vẽ ra). Hoạt hình chỉ cần đủ để đọc được ý.

## 2. Người dẫn — bốn vai, không phải một

Người dẫn là **tranh biếm họa của chính tác giả**: nét đen dày, viền trắng như sticker, mặt "đơ" lơ đễnh, áo phông đen.
Người dẫn xuất hiện ở bốn vai:

| vai | ví dụ (giờ) | làm gì | vì sao hiệu quả |
|---|---|---|---|
| **A. Người thuyết trình** | góc phải dưới, tay ngửa "mời xem" — 0:04, 0:45, 6:38, 12:47… (32 cảnh) | đứng ĐÈ lên mọi chất liệu (ảnh tư liệu, bản đồ, lính que); gần như KHÔNG cử động: một dáng tay, mặt giữ nguyên | chất keo nối các chất liệu chắp vá: ảnh thật, tranh, bản đồ Wikipedia vẫn thành "một video" vì có cùng một người cầm lái |
| **B. Cận mặt "đơ"** | 0:08, 0:20, 2:34, 4:41, 15:32, 16:39 — 0.8–2.5 s | cắt BỤP vào mặt chiếm cả khung, nhìn thẳng người xem, không nói | dấu chấm câu cho gag: sau một câu vô lý ("tên sát thủ ban cho Thái tử một phát súng ân huệ") thì nhìn người xem — kiểu "nhìn camera" của *The Office* |
| **C. Nhập vai trong cảnh** | **trọng tài** đeo nơ ở trận quyền anh mở đầu (0:24) · **đứng trong đám đông** ở Sarajevo lúc xe Thái tử chạy qua (2:22) · **ngồi trong chiến hào** bịt mũi, ngoi lên → **đầu bay**, cảnh sau quay lại với mặt nứt, băng bó (7:18–7:31) · tiêu đề "Thế chiến I" với người dẫn khoanh tay | cùng một hình cắt rời được thu nhỏ, đặt vào cảnh như một nhân vật, chịu hậu quả của lịch sử | đây là kỹ thuật "người kể trải nghiệm lịch sử" người dùng muốn: lời cảnh báo "ngoi lên là bay đầu" được người dẫn TỰ CHỊU, rồi giữ thương tích sang cảnh sau (nối tiếp, biến thành gag chạy) |
| **D. Bình luận riêng** | "gương mặt khá đẹp trai và hợp gu mình" (6:39), cạnh ảnh Conrad · "tí nữa thì quên" · "chỗ này là Việt Nam nè" | người dẫn hiện cạnh ảnh thật như đang "soi" ảnh | tạo cá tính, nối người xem với tác giả |

Chi tiết dựng của vai C (strip-trench):
- Cùng một bức tranh người dẫn được dán vào hàng lính, có thêm tay bịt mũi.
- Ở chữ "bay đầu", cái đầu bị kéo ra với nhoè chuyển động.
- 4 giây sau người dẫn trở lại góc trình bày với **vết nứt trên mặt**: vẫn đúng hình cũ, chỉ thêm một lớp vết nứt.

Giá rẻ, nhưng người xem nhớ.

## 3. Mặt meme — ghép ảnh thật lên thân vẽ

| kỹ thuật | ví dụ | cách làm |
|---|---|---|
| **Đầu ảnh thật trên thân vẽ đơn giản** | Thái tử + vợ thò đầu ra sau bụi cây (2:30) và ngồi trên xe cổ cắt từ ảnh (2:37); Conrad von Hötzendorf thân lính hoạt hình chỉ bản đồ (6:44); Lenin thân đen cầm bút ký (13:09) | cắt đầu từ ảnh tư liệu (viền trắng sticker); thân là khối vẽ phẳng hoặc đồ vật cắt từ ảnh khác |
| **Mặt ghép vào tranh khác** | Wilson "đóng vai Chúa Giê-xu": mặt Wilson ghép vào tranh Thánh Tâm, hào quang toả (5:23) | ghép theo nghĩa đen của câu thoại (ẩn dụ → hình) |
| **Quốc gia có mặt và cảm xúc** | mắt trắng tròn ngơ ngác, mắt giận nghiêng, miệng cười nhe răng, **răng cá mập + sừng mũi nhọn + chuỳ gai** = Đức "phản diện" (5:34, lặp lại 14:32); Bỉ băng dán + giọt nước mắt; Anh mắt lồi | bộ phận mặt là sticker rời đặt lên hình bản đồ tô cờ; một bộ ~8 biểu cảm dùng cả video |
| **Đạo cụ meme** | kiếm, cuốc kim cương Minecraft; AK-47 (đời 1914!); trà sữa trân châu; găng quyền anh; gậy bóng chày; tờ giấy tối hậu thư; chó Doge thay quốc huy Đức ("làm chó", 11:15) | đồ vật lạc thời đại = gag; người xem Việt nhận ra ngay |
| **Gag chạy suốt bài** | trà sữa (lời mời liên minh, 1:34 → Bỉ 4:55 → Ottoman 9:40); Đức chuỳ gai; Pháp gậy bóng chày đánh Việt Nam (1:05 ↔ 17:21) | cùng một hình quay lại, người xem đoán trước được nên cười vì đoán đúng (study 12 §5.1) |

## 4. Người que / lính que đánh nhau

Thanh Pahm KHÔNG dùng người que kiểu Becker. Ông dùng ba lớp:
1. **Lính chibi hạt đậu**: đầu tròn to, mũ theo phe (Pickelhaube xám = Đức, kepi xanh = Pháp, mũ nâu = Anh / Nga), súng ngang.
   - Dàn **thành hàng trên bản đồ** dọc biên giới (4:42, 6:21, 8:11) để nói "quân tiến tới đâu".
   - Hoặc dàn hai khối đối mặt trên **ảnh chiến trường thật đã làm xám** (5:01, 6:11, 15:19), có chớp nòng.
2. **Chiến hào nhìn từ trên xuống**: nền xanh lá phẳng, hai rãnh nâu đầy lính, vệt đạn trắng bay ngang, nổ lửa ở giữa (7:03–7:31, 11:18).
   - Chỉ cần MỘT bố cục cho cả cảnh "bất phân thắng bại".
3. **Quốc gia có chân que** (2 nét đen) đi, đứng, cầm súng; đánh bằng **vòng lặp 2–3 khung** (chuỳ vung–đập, nhoè xám).
   - Người xem hiểu "đánh nhau" mà không cần một khung đi bộ thật nào.

Đám đông dân thường là **hạt đậu trắng mắt chấm**: không tay, không chân, cầm cờ (Yay! / Go for it Germany!!).
- Khi họ "thôi ủng hộ", cờ rơi xuống (5:37).

**Ý nghĩa cho ta:** cảnh "chiến đấu" của kênh lịch sử không cần người que diễn võ từng khung. Cần:
- (a) một bố cục đọc được trong 1 giây (hai phe, ai thắng);
- (b) một vòng lặp hành động ngắn;
- (c) hiệu ứng nổ / khói / chớp nòng.

Người que diễn công phu (bài học Becker, study 10) để dành cho 2–3 khoảnh khắc lớn của mỗi tập — đúng luật §175: người que chỉ diễn khi làm việc với vật.

## 5. Bản đồ + chất liệu tư liệu

- **Bản đồ cờ** = hình cờ cắt theo biên giới, viền đen dày, có thể mọc mắt.
  - Zoom bằng cách cắt sang khung chặt hơn (0:28 thế giới → 0:30 Việt Nam có mũi tên đỏ "Chỗ này là Việt Nam nè").
  - Không có camera trượt mượt.
- **Bản đồ Wikipedia / atlas thật** xen với bản đồ cờ tự vẽ. Lớp chữ trên bản đồ:
  - ngày tháng to ("28/7/1914" kèm mũi tên "WAR!");
  - nhãn tên ("Pháp", "Nga", "Sông Marn", "Paris");
  - đường kẻ chỉ.
- **Ảnh tư liệu** (tranh, ảnh, điện tín Zimmermann, hòa ước Versailles) chiếm cả khung hoặc đặt giữa nền đen. Thêm:
  - phụ đề tên người: chữ trắng viền đen ở góc dưới — "Helmuth von Moltke", "Nga Hoàng Nicolai II", "Vua Wilhelm II";
  - thẻ chữ giải thích: "Bức điện tín được viết bằng các mã số".
- **Stock / footage**: nổ, lửa (phủ đáy khung khi giận dữ hoặc chiến tranh), khói, tiền bay, quả địa cầu, phòng họp (bàn đàm phán), thư viện (viết tối hậu thư), sàn đấu quyền anh.
  - Họ dùng cả ảnh có watermark (agefotostock, Mary Evans) — ta KHÔNG theo.
- **Nhãn băng nhóm**: thẻ chữ màu cố định — đỏ "Băng Liên Minh", xanh "Băng Hiệp Ước".
  - Hiện lại mỗi khi nhắc phe, như một mã màu.
- **Màu theo tâm trạng**:
  - cảnh xấu cho Đức → khử màu xám tối (4:27, 10:58, 14:32);
  - căng thẳng → lửa ở đáy khung;
  - ăn mừng → đèn sân khấu + quả cầu disco + confetti (Mỹ 13:45, 17:05).
- **Hồi tưởng** = khung mây đen tròn quanh hình nhỏ, kèm chữ "Chiến tranh Pháp Phổ (1870–1871) / Kết quả: Pháp thua Đức" (3:52).

## 6. Ngữ pháp dựng (edit)

| thủ pháp | ví dụ | dùng khi |
|---|---|---|
| **Cắt theo câu** | ~1 hình mới / câu; câu dài thì thêm lớp (người dẫn trượt vào, thẻ chữ) | luôn luôn — 272 từ/phút cần hình đổi theo |
| **Whip / nhoè chuyển động** | vật cắt rời trượt vào với 3–4 khung nhoè; quả địa cầu "lia" từ châu Âu sang Mỹ (5:29) | vào cảnh, đổi nơi chốn |
| **Màn đen + chỉ có tiếng** | sau "phát súng ân huệ": khung đen 2.5 s (2:45); "Thì..." → khoảng lặng 3.3 s (6:21) | cái chết, bước ngoặt, cliffhanger — không chiếu bạo lực |
| **Gài → trả** | "chiến tranh đã không xảy ra" → "Nhưng mà không," + cảnh Thái tử quay lại (2:31) | đổi hướng câu chuyện; người xem tưởng xong |
| **Khoảng lặng có chủ đích** | 16 chỗ > 1.5 s: tiêu đề (0:21, 6.5 s), trả lời "Ok" (6:34), trận Marne (6:54, 6.4 s), cảnh hành quân Nga (8:32, 7.4 s) | cho tiếng hiệu ứng / nhạc thở; mỗi khoảng là MỘT sự kiện hình |
| **Thoại bằng chữ + nét chỉ** | "Kill him", "đứa nào ?", "Đi đấm Serbia với tao ko ?", "chõ mũi vào thì đừng trách bố m" — chữ đen + một nét gạch tới người nói | nhân vật nói mà không cần giọng thứ hai (đúng hướng study 12: quốc gia nói bằng chữ) |
| **"…ngày nay được biết với cái tên là" → cắt tiêu đề** | 0:19 → "THẾ CHIẾN I"; 7:07 → "Chiến tranh chiến hào"; 14:16 → "Điện báo Zimmermann"; 17:51 → "THẾ CHIẾN 2" | khung quen thuộc thả tên + móc tập sau |
| **Số liệu chồng lên ảnh thật** | "1,5 tỷ người… 10 triệu người chết… 20 triệu tàn phế" mờ dần trên ảnh nghĩa trang (16:57) | kết, phần nghiêm túc |

## 7. Ráp với đồ nghề của ta

Ta có canvas tất định — kiến trúc giống lemo-opuscar, study 11. Đồ nghề hiện có:
- `projects/hist/_kit/mapkit.js` — bản đồ 1914 tô cờ, quốc gia có mắt;
- `actkit.js` — dàn nhân vật;
- `traveler.js` — mặt biểu cảm;
- `tools/hist/geo.py`;
- `engine/stick*.js` + từ điển dáng Becker;
- tiếng hiệu ứng theo chất liệu (`tools/sfx/material.py`).

| kỹ thuật Thanh Pahm | ta có chưa | làm gì |
|---|---|---|
| người dẫn sticker 4 vai | **chưa** — CHARACTER.md đang chốt người dẫn que mũ chóp; mascot mới của người dùng là tranh hoodie đen | cắt nền tấm thiết kế → các lớp PNG (đầu / thân / tay, 10 biểu cảm), `host-sprite.js`: `present()` góc phải, `close()` cận mặt, `inScene(x, y, scale, pose)`, lớp thương tích (nứt, băng) |
| đầu ảnh thật trên thân vẽ | chưa | `cutout.js`: ảnh Commons (PD) → mặt nạ cắt đầu (làm một lần bằng `rembg` / tay, lưu PNG trong `assets/hist/`) + viền trắng sticker + thân phẳng theo vai |
| quốc gia biết diễn | **có** (mapkit: tô cờ, mắt, tay chân) | thêm bộ biểu cảm chuẩn (ngơ, giận, nhe răng, cá mập, khóc, băng dán) + đạo cụ (trà sữa, gậy, giấy) |
| lính chibi trên bản đồ / chiến hào | một phần (actkit) | `troops.js`: lính hạt đậu theo phe, dàn hàng theo đường biên (đường đi lấy từ geo), vòng lặp bắn; bố cục chiến hào nhìn từ trên |
| nổ / lửa / khói / vệt đạn | chưa (cấm `shadowBlur` / `ctx.filter`) | hiệu ứng vẽ bằng hạt `hash(i)` tất định (study 12 đã đề xuất); hoặc sprite sheet CC0 nổ / lửa — rẻ hơn, nhìn thật như stock của họ |
| nhoè chuyển động khi trượt vào | chưa | vẽ 3–4 bản bóng mờ dọc đường đi (cách "ghost copies" của newsreel lemo) |
| màn đen + tiếng, khoảng lặng | có (SFX theo mốc) | đưa vào `SHOTS.md` của tập như "khoảng lặng có sự kiện" |
| khử màu theo tâm trạng | chưa | phủ lớp xám nhân màu (không dùng `ctx.filter`): `globalCompositeOperation = 'saturation'` vẽ lớp xám |
| thoại chữ + nét chỉ, nhãn băng nhóm | chưa | `say(text, from, to)` + thẻ phe màu cố định trong kit |
| ảnh tư liệu + phụ đề tên | có quy trình lấy ảnh Commons | khung `doc(img, name)`; ảnh WW1 gần như đều PD |

**Lemo-opuscar áp được:**

| style trong lemo | thủ pháp | dùng ở |
|---|---|---|
| `newsreel` | "spinning paper" (tối hậu thư, điện tín), "map spread" (cung chấm từ thủ đô, tiếng điện tín), "grease-pencil freeze" (khoanh đỏ chi tiết trong ảnh), "band stop + button" | đoạn tin tức, tối hậu thư, kết |
| `archive-lighttable` | "line lights up" (một dòng trên điện tín Zimmermann sáng lên, chữ nhấc ra thẻ), "two records side by side" | tài liệu gốc |
| `halftone-dossier` | "the stamp" (đóng dấu "WAR!" / "BỊ TỪ CHỐI"), "evidence board" (liên minh nối dây) | tối hậu thư, sơ đồ liên minh |
| `DIRECTOR.md` | shot list có lý do, ≥ 2 khoảng lặng thật, J/L-cut | khung `SHOTS.md` cho mỗi tập |

## 8. Công thức dựng một tập (đề xuất — chờ người dùng duyệt)

1. **Lời trước** (công thức 10 điểm của study 12 §5). Tiếng Anh, người dẫn có cá tính.
2. **Bảng hình theo câu**: mỗi câu một dòng, gồm:
   - hình gì;
   - ẩn dụ nào được vẽ ra;
   - vai người dẫn (A / B / C / D);
   - tiếng gì.
   
   Đánh dấu:
   - 3–5 chỗ **người dẫn nhập vai** (C) — chính là "trải nghiệm lịch sử";
   - 4–6 chỗ **cận mặt đơ** (B) sau câu vô lý;
   - 2–3 **gag chạy suốt tập**.
3. **Đồ nghề dùng lại** (dựng một lần, mọi tập):
   - người dẫn sticker (từ tấm thiết kế);
   - cutout ảnh thật;
   - quốc gia biểu cảm + đạo cụ;
   - lính chibi;
   - hiệu ứng nổ / lửa / khói;
   - thoại chữ;
   - màu tâm trạng.
4. **Khung dài**: ~3 s mỗi hình; 20 % thời lượng có người dẫn; hoạt hình tối thiểu (trượt + nhoè, vòng lặp 2–3 khung).
   Người que diễn công phu chỉ ở 2–3 khoảnh khắc lớn.
5. **Thử trước**: một đoạn 60 s (đề xuất Sarajevo 1914 — có đủ cả bốn vai người dẫn, mặt ảnh thật, gài → trả, màn đen) →
   người dùng duyệt → mới làm cả tập.

## 9. Không bắt chước
- Câu đùa, kịch bản, thiết kế người dẫn của Thanh Pahm.
- Chửi thề ("bố m", "làm chó") — kênh tiếng Anh cho người xem toàn cầu.
- AK-47 và Minecraft đúng y như họ — ta chọn đạo cụ lạc thời đại của riêng ta.
- Ảnh có watermark Getty / agefotostock / Mary Evans — chỉ dùng ảnh PD / CC từ Commons.
- Đề tài nhạy cảm đem ra đùa: diệt chủng Armenia, thương vong. Họ cũng kể thẳng các đoạn này — giữ như vậy.

## 10. Bổ sung — người dùng chỉ ra 2026-10-27: ngoài cắt ảnh còn VẼ LẠI, CHÈN MEME, NGƯỜI QUE ĐẦU TRÒN
Ảnh người dùng gửi (các cảnh 10:58–13:17 và lính trên chiến trường). Đúc kết thành 7 kỹ thuật — cách ta làm ở cột phải.

| kỹ thuật | Thanh Pahm làm | ta làm |
|---|---|---|
| **Vẽ lại nhân vật thật (biếm hoạ)** | Lenin vẽ tay: đầu to, mặt hoạt hình theo ảnh thật, thân áo đen đơn giản; chỉ bản đồ Nga, ký giấy bằng cây bút chì khổng lồ (13:09) | xin người dùng tạo biếm hoạ (prompt CHARACTER §3b, theo ảnh PD) → cắt như người dẫn; đạo cụ (bút, giấy) vẽ bằng code |
| **Lính chibi đầu tròn theo phe** | đầu tròn to, mũ phân phe (mũ lưỡi trai xanh Nga / Pickelhaube xám Đức), súng ngang, chớp nòng là đốm khói hồng; đứng thành khối trên ảnh chiến trường khử màu có lửa; hoặc túm lại trên lãnh thổ bản đồ | vẽ bằng code (`soldier(phe)` — chưa có): một hàm, mũ + màu áo theo phe, 2–3 khung bắn lặp |
| **Đám đông + cờ + nhãn = một dân tộc** | đậu trắng cầm cờ Armenia + nhãn "người Armenia"; cùng đám dưới cờ Nga; đám đông trước lửa + bản đồ Ottoman mặt giận (gân, răng cá mập) → kể chuyện nặng bằng ký hiệu đơn giản | `crowd()` + cờ (đã có) + nhãn chữ; nền lửa: ảnh / hiệu ứng code |
| **Đặc vụ / nhóm kín = đậu đen mũ quả dưa** | hai đậu đen mũ quả dưa đứng trên lãnh thổ Afghanistan; trên ảnh sa mạc thật, giơ tay | `assassin()` (đã có) — thêm tay giơ |
| **Bong bóng thoại bằng HÌNH** | bong bóng chứa cờ Ấn bị gạch chéo (không chữ) | `bubble` chứa icon: cờ + vòng cấm đỏ |
| **Cờ thay người trên ảnh thật** | phòng họp thật (ảnh), mỗi nước = lá cờ đặt trên ghế → "hội nghị các nước" | ảnh nội thất PD + cờ vẽ bằng code đặt theo toạ độ ghế |
| **Chèn meme** | Doge thay quốc huy trên cờ Đức (11:15); mặt bản đồ kiểu countryball: mắt trắng bầu dục, cười nhe răng + giọt lệ, mắt lim dim | mặt bản đồ `mapFace` (đã có 6 mood) — thêm giọt lệ / nhe răng; meme: chỉ dùng mẫu ta tự vẽ lại hoặc ảnh PD (ảnh meme gốc là ảnh có bản quyền — Doge là ảnh chụp chó Kabosu) |

Ý chính: **trộn ba chất liệu trong cùng một khung** — ảnh thật (nền, phòng, chiến trường) + vẽ phẳng (bản đồ, cờ, đậu) + nhân
vật hoạt hình (người dẫn, biếm hoạ). Mỗi chất liệu một vai: ảnh = "chuyện có thật", vẽ = "ai với ai", hoạt hình = "cảm xúc".
