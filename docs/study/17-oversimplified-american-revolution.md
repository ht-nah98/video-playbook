# 17 — OverSimplified "The American Revolution (Part 1)": DNA một tập sử 15 phút giữ người xem bằng hài

Người dùng 2026-10-27: kiểu kể này "là thứ làm lịch sử trở nên thú vị" — học liên tục để tối ưu kênh lịch sử. Chỉ học
**kỹ thuật và cấu trúc**; không chép nhân vật, nét vẽ, câu đùa.

**Nguồn.** File `~/Downloads/The American Revolution  - OverSimplified (Part 1).mp4` (15:07, 1280×720). Chuẩn bị bằng
`tools/study/prep.sh … 17-oversimplified-american-revolution en` → `out/_lab/study/17-oversimplified-american-revolution/`
(không commit): `transcript.{txt,json}` (whisper, 308 câu), `sheet0–6.jpg` (mỗi 5 s), `pace.{txt,json}`. Khung từng giây của
6 đoạn (mở bài, nước nói chuyện, điểm danh Quốc hội, gag Arnold, gag lá thư, Lexington) đã xem ở độ phân giải gốc.
So với tập của ta: `out/hist/sarajevo/sarajevo.mp4` (216 s, bản 3).

## 1. Số đo

| đo | OverSimplified | Sarajevo v3 của ta |
|---|---|---|
| dài | 907 s (lời chính ~13:30; quảng cáo 1:00–1:43; thẻ "PART 2:" giữ 12 s cuối) | 216 s |
| cắt (`pace.py`) | 132 cắt, cảnh giữa **3.9 s**; scene > 0.25: 138 cắt, giữa 3.6 s, 23% cảnh < 2 s | 47 cắt, giữa **3.63 s** |
| đứng yên | **25.8%**; đoạn dài nhất 26 s (2:41, hai nước nói chuyện), 14 s (7:57), 9 s (8:45 "No, I'm in charge" ×7) | 12.4% |
| % đứng yên theo phút | 28 14 42 47 28 14 8 23 49 38 20 15 23 19 13 — phút có sketch thoại cao (40–50%), phút trận đánh thấp (8–20%) | 11 26 5 4 |
| lời | 3 380 từ, **227 từ/phút** (cả thoại nhân vật) | 598 từ / 216 s ≈ 166 từ/phút |
| câu | trung vị **11 từ**, trung bình 15.5, p90 30 từ (thoại kéo trung vị xuống) | trung vị ~15 (WRITING §2) |
| khoảng lặng lời ≥ 1 s | 18 lần; dài nhất 3.9 s (0:33, trước "GOOOLD") và 3.3 s (9:13, "Never heard of him… ouch") | — |
| tiếng | −14.9 LUFS (bằng ta). Nhạc dưới lời kể thấp hơn giọng 15–25 dB; sketch thoại thường KHÔNG nhạc (§6b) | −14.9 LUFS |
| im hẳn (< −45 dB, ≥ 0.4 s) | **31 lần**, gần như TẤT CẢ là nhịp gag hoặc nhịp nghiêm (§6) | chỉ ở nhịp chết |
| điểm cười | ≈ 48 trong ~810 s lời chính → **1 gag / ~17 s**; khoảng trống dài nhất ~45–65 s, đều là đoạn trận đánh kể thẳng (7:44–8:44, 9:57–10:40, 13:56–14:48) | ~1 / 25 s |
| chất liệu (182 khung 5 s) | bản đồ ≈ **33%** · nước hình bản đồ có chân ≈ 6% · cảnh nhân vật ≈ 50% · tranh/khắc thời đó ≈ 3% · quảng cáo 5% · chữ to toàn khung ≈ 3% | |
| thoại nhân vật | ≈ 200 s ≈ **23%** lời là thoại do người kể tự đóng nhiều giọng | ~2 câu |

**Kết luận số đo.** Nhịp cắt gần như bằng ta (3.6–3.9 s). Cái khác là (1) **hai chế độ** xen nhau: sketch thoại đứng yên
lâu (chữ thoại đổi thay cho cắt cảnh) ↔ bản đồ chạy liên tục; (2) **mật độ gag ~17 s** nhưng biết tắt hẳn khi kể trận đánh;
(3) **im lặng là công cụ** — nhạc tắt trước cú chốt.

## 2. Cấu trúc tập

Không có thẻ tên tập, không chào. Mở vào thẳng một sketch, rồi đi bằng ~17 mạch nhỏ 30–60 s, mỗi mạch kết bằng một "nút"
(gag hoặc một câu phán), chuyển bằng bản đồ + năm.

| giờ | mạch | nút kết |
|---|---|---|
| 0:00–0:35 | **cold open sketch** tiền truyện (Columbus trình vua, 35 s, 1 bối cảnh, thoại qua lại) | chữ to "GOOOOLD!!" + zoom mặt |
| 0:36–1:00 | tua nhanh 1492 → thuộc địa trên quả địa cầu | "người xem" que hỏi vặn → |
| 1:00–1:43 | quảng cáo, nối bằng câu đùa "if you love Vikings so much…" | "Now where was I" + callback cái võng |
| 1:43–2:33 | Chiến tranh Bảy năm (bản đồ Pháp–Anh sọc) | "60 million pound cost" |
| 2:33–3:10 | Anh nợ — hai nước hình bản đồ nói chuyện, 26 s đứng yên | "No." + 2 s im |
| 3:10–4:40 | Đạo luật đường, tem → tiệm tạp hoá sketch → biểu tình → vua tự luyến | "Get the hell out" |
| 4:41–5:12 | thuế nhập khẩu "There's a tax for that" ×3 | lệnh gửi lính |
| 5:12–5:45 | thảm sát Boston: tuyết → đá → vỏ hàu | **nghiêm**: tranh khắc thật, "Five civilians were killed.", im |
| 5:45–6:27 | đốt tàu, đốt nhà, Tea Party, luật trừng phạt | "people pissed" |
| 6:28–7:22 | Quốc hội Lục địa: **điểm danh kiểu thẻ đấu sĩ** | "Can you stop?" "No." |
| 7:22–8:25 | Lexington & Concord (bản đồ cờ chạy) | chữ to "THE SHOT HEARD AROUND THE WORLD" |
| 8:25–9:20 | Ticonderoga: "No, I'm in charge" ×7 → Arnold bị quên | "Never heard of him." → mặt khóc → "What the fu–" |
| 9:18–9:57 | chọn Washington | "Dude. Uncool." |
| 9:57–10:27 | Bunker Hill (thắng mà thua) | thẻ "BUNKER HILL CASUALTIES" |
| 10:28–11:03 | thư cầu hoà — vua viết, chữ xấu, đọc nhầm | "…gross." |
| 11:03–12:31 | đốt thị trấn, đánh Canada, kéo pháo, Boston thất thủ | "It was checkmate." |
| 12:31–13:30 | Common Sense, Tuyên ngôn, giật đổ tượng vua | "Speaking of the British, guess who's back?" |
| 13:31–14:52 | New York: thua liên tiếp | **cliffhanger nghiêm**: "Rarely had an army been so badly beaten, yet survived to fight another day." |
| 14:53–15:07 | thẻ "PART 2:" trắng, đứng yên 12 s | màn kết YouTube |

**Biển chỉ đường chương** (thay cho thẻ chương): năm in trên bản đồ ("1766"), chữ to tên sự kiện ("7 Years War",
"MINUTEMEN"), dòng "MEANWHILE IN ENGLAND…", và câu nói thường của người kể: "Now where was I", "Speaking of which,
remember…", "Speaking of the British, guess who's back?".

## 3. Giữ đà 15 phút

1. **Một mạch = một nút.** Không có mạch nào kết bằng câu thông tin trơn; thường là một câu một-hai chữ ("No.", "Ouch.",
   "Dude. Uncool.", "It was checkmate.").
2. **Gag chạy / nhân vật chạy:** vua George (tự luyến, quát người hầu, dỗi) xuất hiện 6 lần trong cùng một phòng — lần nào
   cũng đúng bối cảnh đó, nên chỉ cần cắt vào phòng là người xem đã cười; "No." của bên bị xin (3:05, 3:42, 7:12) — cùng
   khuôn, cùng khoảng im trước; cái võng (0:43, 0:49, 1:46); "burned by the locals" ×2 liền nhau.
3. **Gài để tập sau trả:** Benedict Arnold bị cướp công, bị quên tên, khóc (8:25–9:20) và lại đi tìm vinh quang (11:25) — người
   biết sử hiểu đó là mầm phản bội; người không biết vẫn cười. Gài sớm, không giải thích.
4. **Mỉa kịch tính (dramatic irony):** "It's not like this will start a seven-year global conflict." → "And what happened next was
   a seven-year global conflict." — lặp nguyên câu, chỉ đổi khung.
5. **Quy tắc ba + biến:** "Glass? There's a tax for that. Lead? … Paper? Tea? Oil?" — lần ba gộp nhanh; "snowballs → rocks →
   oyster shells".
6. **Điểm danh có tốc độ:** 6:41 mỗi nhân vật 1–2 s: nền vạch tốc độ màu khác nhau, chân dung to, nhãn nghề + tên, nhãn sau
   cùng là cú đùa ("guy who married a rich lady"). Giới thiệu 6 người trong 12 s mà vẫn nhớ được.
7. **Mật độ hài co giãn:** chính trị / nguyên nhân (0–7 phút) dày gag (~1/12 s); trận đánh (7:44 trở đi) kể thẳng 45–65 s bằng
   bản đồ cờ rồi mới chèn một gag. Hài nằm ở **quyết định của con người**, không ở cái chết.

## 4. Nhân vật lịch sử — cách làm cho nhận ra

| loại | hình | nhận ra nhờ |
|---|---|---|
| người thường / lính | đầu tròn trắng, 2 chấm mắt, **không miệng**, thân viên thuốc; đầu ≈ 45% chiều cao | MŨ + MÀU ÁO: tam giác đen (Lục địa), áo đỏ đai chéo trắng (Anh), xanh lá (Green Mountain Boys), tóc giả xám (nghị sĩ) |
| người quyền lực, ít diễn (Adams, Franklin, Jefferson, Hancock, Patrick Henry…) | **mặt cắt từ tranh chân dung sơn dầu thật** dán lên thân viên thuốc phẳng, màu áo theo tranh (Sam Adams đỏ, Franklin xám) | chính bức chân dung nổi tiếng + một màu áo |
| người diễn nhiều (vua George III, Washington, Lord North) | mặt **vẽ lại** biếm hoạ (vẫn đầu tròn), thêm tóc giả + má hồng + áo đặc trưng (vua: áo choàng vàng lông chồn; Washington: áo xanh lam) | 1 màu + 1 món đồ + 1 tính cách; chân dung thật của vua treo trên tường phòng như "chứng cứ" |
| nước | hình bản đồ đặc màu (Anh đỏ, 13 thuộc địa xanh) + tay chân que, mặt tối giản; Anh còn có nhân vật mũ chóp + mắt lồi (13:31) | hình dạng lãnh thổ |
| "người xem" | người que ghi "YOU" hỏi vặn người kể (0:55) | nhãn |

- **Không nhép miệng.** Thoại = chữ trắng nhỏ viền đen đặt sát đầu + một vạch ngắn chỉ vào người nói; không bong bóng. Người
  nói chỉ nhún / nghiêng nhẹ; cảm xúc đổi bằng mắt (chấm → nhíu → mắt khóc) và cú zoom.
- Chữ thoại tự to lên theo âm lượng ("WRONG!" phóng to, "GOOOOLD!!" bay theo zoom) — cỡ chữ là âm lượng.
- Thoại bịa cho người thật là **diễn ý** chuyện có thật (vua bác thư cầu hoà, Quốc hội xin Anh dừng) — phóng đại giọng, không
  bịa sự kiện.

## 5. Người kể

- **Không xuất hiện trên hình.** Giọng một người, tự đóng mọi vai bằng đổi giọng / giọng địa phương.
- Nói với người xem như bạn: "I know what you're thinking, but OverSimplified…", "you can see where this is going", "oh
  boy". **Đón trước lời bắt bẻ** (Viking đến trước Columbus) — biến bình luận "thật ra là…" thành một gag.
- Câu phán chen vào câu kể: "a friendly-looking old man by the name of Thomas Paine", "to his credit, Washington was great at
  hearing… the ideas of others" (→ cảnh "That's a really dumb idea").
- Nói thẳng điều khó chịu bằng mỉa: "Of course, Jefferson had over 100 slaves, but we don't have to talk about that." — câu
  đùa là cách NÓI RA sự thật, không phải để né nó.

## 6. Bản đồ, chữ, bố cục, tiếng

**Bản đồ (≈ 33% hình).** Ba tầng: quả địa cầu ảnh vệ tinh (thiết lập, tua thời gian) → bản đồ phẳng vùng (lãnh thổ tô một
màu đặc, biển xanh đậm, ranh giới trắng) → bản đồ trận (đất một màu sáng, sông, đường) với **cờ phe làm quân cờ** trượt,
chồng, đổi màu. Nhãn: chấm tròn trắng + tên chữ trắng. Lãnh thổ tranh chấp = sọc hai màu. Mũi tên trắng to cho hướng tiến.
Sự kiện trên bản đồ = icon nhỏ (lửa ở Falmouth, cái pháo lăn), không cần cắt sang cảnh khác. Hình nhỏ chèn trên bản đồ
(cửa sổ cảnh Quốc hội trượt ra 11:03) để nối cảnh.

**Chữ.** (1) thoại nhỏ có vạch; (2) **chữ to toàn khung** cho cụm từ lịch sử ("THE SHOT HEARD AROUND THE WORLD" đè lên cảnh
trận, "MINUTEMEN" xoay chéo trên bản đồ, "2nd of July" + chú thích nhỏ "(4th of July)"); (3) **chữ đùa meta**: thẻ "CLICHES
RELATED TO TENSION: palpable / cuttable with a knife / about to come to a head" đúng lúc người kể dùng mấy sáo ngữ đó; nhãn
gạch ("~~Jack Black~~ PAUL REVERE"); dấu sao "BEST SELLING AMERICAN TITLE*"; bảng "Days since last revoked charter: 032850"
trên tường. Chữ là một làn hài riêng chạy song song lời.

**Bố cục.** Cảnh nhân vật luôn là "sân khấu" ngang, nhìn chính diện, nhân vật đứng trên sàn ở 1/3 dưới, trần nhà / tường chiếm
nửa trên — chừa chỗ cho chữ thoại. Một phòng dùng lại nhiều lần (phòng vua, hội trường) → người xem định hướng ngay. Đám đông
xếp hàng chồng lớp. Cận cảnh hiếm, chỉ cho cú chốt (mặt vua hét, Washington khóc).

**Tiếng** (chi tiết ở §6b). Nhạc nền dưới lời kể; 31 lần im hẳn ≥ 0.4 s, gần như trùng hết với nút gag: 0:17 "WRONG!", 0:33 trước "GOLD", 3:06
và 3:45 "No.", 4:40 "Get out", 7:12 "No.", 9:10–9:18 (Arnold), 9:50 "Uncool", 10:58–11:03 "…gross", 13:33 "guess who's
back" — và **5:36 "Five civilians were killed."** (im = nghiêm). Công thức: câu gài → nhạc cắt → 1–2 s im (mặt đơ) → cú
chốt một chữ → nhạc vào lại. SFX ít, đúng chỗ (nổ, đấm, phóng to chữ).

## 6b. Âm thanh (đo kỹ)

**Cách đo.** Tách lời khỏi phần còn lại bằng Demucs (`htdemucs --two-stems=vocals`, file tạm trong scratchpad, đã xoá —
không lưu tiếng của họ). Trên phần không-lời: mức nền nhạc từng giây (trung vị RMS) + bắt tiếng chát (onset cao hơn nền trung
vị 3 s ≥ 7 dB), rồi xem khung hình đúng giờ đó để gán sự kiện. Chuỗi tiếng đều nhau 0.3–0.75 s (0:37–0:53, 0:59–1:04,
9:53–10:06) là trống trong nhạc, đã loại. Tiếng nhỏ nằm dưới giọng bị sót → số dưới đây là **cận dưới**.

**Mức (RMS trên stem, cùng thang).** Giọng: trung vị −17.8 dB. Nền nhạc dưới lời: −33 … −45 dB → **thấp hơn giọng 15–25 dB**;
nhạc ở chỗ không lời (chuyển cảnh, thẻ kết) lên −20 … −25 dB. Tiếng hiệu ứng lớn (boom, đấm): đỉnh −11 … −16 dB → **ngang
hoặc to hơn giọng 2–6 dB**; súng / pháo trên bản đồ −15 … −24 dB; tiếng nhỏ (vụt, bút, ngựa) −24 … −34 dB (dưới giọng 8–16 dB).
(Kênh toán của ta trộn nhạc −38, sfx −6 — cùng khoảng.)

**Mật độ.** ≈ **45 tiếng hiệu ứng / 15 phút ≈ 3 / phút**, rất lệch: phút 4:00–5:00 không có tiếng nào (cảnh vua trong
phòng, chỉ thoại); trận Lexington–Concord 8:11–8:23 có 6 tiếng / 12 s. Tiếng đi theo **hành động trên hình**, không rải đều,
và hầu như không đặt dưới câu đùa bằng lời — câu đùa lời dùng **im lặng**, không dùng tiếng.

| loại | sự kiện trên hình → tiếng (giờ) | đặc trưng đo | từ khoá tìm CC0 / PD |
|---|---|---|---|
| **boom trầm / bass hit** (đánh dấu "chuyện lớn") | 1:52.5 cờ các nước bật lên bản đồ thuộc địa · 2:29.9 lãnh thổ Pháp chuyển đỏ (Pháp mất hết) · 3:20.8 chữ "1765 STAMP ACT" đập vào khung · 3:50.1 cắt bụp sang chân dung Sam Adams · 10:41.9 lá thư hiện ra | trọng tâm phổ 160–430 Hz, 70–87% năng lượng < 215 Hz, dài 0.3–0.7 s, đỉnh ngang giọng | `boom impact`, `cinematic hit`, `bass drop`, `low thud`, `sub hit` (Freesound lọc CC0; OpenGameArt "impact" CC0) |
| **súng / pháo** (trận đánh, kể cả trên bản đồ) | 5:34.7 lính Anh bắn ở Boston · 7:55.6 "the shot heard around the world" (một phát, đuôi vang 0.5 s) · 8:11–8:23 cờ đụng nhau trên bản đồ Lexington–Concord (6 phát) · 13:53.4 pháo kích (icon nổ trên bản đồ New York) · 14:05.0 hai hàng lính bắn loạt | trọng tâm 1–2.4 kHz, ngắn 0.15–0.35 s; pháo / loạt có phần trầm | `musket shot`, `flintlock`, `cannon fire`, `volley`, `artillery distant` (Openverse audio, Freesound CC0, Commons "Category:Gunshot sounds") |
| **va chạm hoạt hình** (ném, đóng, đấm, chém) | 5:28.8 / 5:29.5 / 5:31.1 tuyết → đá → vỏ hàu trúng lính (ba tiếng tăng dần) · 3:35.8 con dấu "STAMP" đóng xuống giấy · 6:17.4 búa đóng ván cửa toà nhà · 9:22.1 găng đấm thuộc địa đấm vào Anh · 2:17.7 rìu bổ (tiếng sắc, trọng tâm 4.3 kHz) | ngắn 0.08–0.33 s, mid 0.7–2 kHz | `punch`, `cartoon hit`, `rubber stamp`, `hammer nail`, `snowball hit`, `axe chop` (Kenney "Impact Sounds" CC0, OpenGameArt "cartoon hit") |
| **vụt / whoosh** (thẻ tốc độ, chuyển cảnh nhanh) | 6:46.8 thẻ "BUSINESSMAN" · 6:52.8 thẻ "(BIG) JOHN DICKINSON" · 7:00.0 trở về hội trường · (cùng loại ở 2:34.3 lúc cắt sang cảnh quán bar) | 1–1.4 kHz, 0.24 s, có phần trầm | `whoosh`, `swish`, `swoosh transition`, `fast pass by` (Kenney "Interface Sounds", Freesound CC0) |
| **đổ / sập / bõm** | 13:22.9 giật đổ tượng vua · 5:51.9 thống đốc ngã sấp vào bùn · (đốt nhà 5:55 có lửa lách tách nền) | 13:22.9: tiếng vỡ sáng 2.9 kHz, 0.4 s | `statue fall crash`, `metal crash`, `mud splat`, `fire crackle` |
| **tiếng đời minh hoạ** (ít) | 7:41.8 Paul Revere phi ngựa la "The British are coming" · 12:55.9–12:57.7 Jefferson viết (3 tiếng ngắn, có lẽ bút lông sột soạt) · 8:55 lính ngủ (chữ "Z z", tiếng ngáy chìm dưới lời) | nhỏ, dưới giọng 10–16 dB | `horse gallop`, `quill writing`, `snore cartoon` |

**Nhạc vào / ra quanh gag và chương** (mức nền theo giây):
1. **Sketch thoại thường KHÔ — không nhạc.** Cold open 0:03–0:36 (nền −55 … −62 = chỉ còn tạp), cảnh vua 4:20–4:40, Quốc hội
   "Can you stop? No." 7:01–7:12, Arnold bị quên 9:03–9:17, Washington giả khiêm tốn 9:29–9:39 và 9:45–9:52, lá thư đọc nhầm
   10:56–11:03, tượng / "treason" 13:20–13:33. Nhạc tắt → tiếng nói của nhân vật thành "diễn kịch", người xem nghe từng chữ.
2. **Nhạc VÀO lại đúng câu chuyển mạch, thường bằng một bản mới và to hơn:** 0:37 (sau "GOLD", nhạc vào cùng quả địa cầu),
   3:50 (sau "damn" → −21 dB cùng chân dung Sam Adams), 4:41 (sau "Get out" → đoạn thuế), 9:53 (sau "Uncool" → trống hành
   quân Bunker Hill), 11:04 (sau "gross"), 13:34 (sau "guess who's back" → nhạc mới −33 dB khi hạm đội Anh tới).
3. **Nhạc CẮT ĐỘT NGỘT 1–4 s ngay trước cú chốt** khi sketch có nhạc: 3:04–3:08 (trước "No.", −64 dB), 3:42–3:49 ("No… Don't
   do it… damn").
4. **Nhịp nghiêm:** 5:35–5:39 nhạc tụt về −52 … −59 ở "Five civilians were killed." rồi quay lại; 14:45–14:52 nhạc rút trước
   câu cliffhanger cuối, rồi 14:53 nhạc kết vào to (−21 dB) cùng thẻ "PART 2:".
5. Quảng cáo có nhạc riêng (1:00–1:43) và kết bằng một cú nhạc to (−31 dB) rồi im 1.5 s trước "Now where was I".

**Áp cho ta.** Bộ SFX Sarajevo (`projects/hist/sarajevo/assets/sfx/CREDITS.md`) đã có súng, nổ, bốp, boing, dế — **còn thiếu
boom trầm cho chữ / bản đồ, whoosh, búa / con dấu, ngựa, bút lông, tượng đổ**; tìm theo từ khoá cột cuối (Openverse →
Freesound CC0 → OpenGameArt CC0 → Kenney), không có mới tự tạo bằng `tools/sfx/material.py` (PIPELINE §Tiếng). Trong
`mix.py`: thêm khái niệm đoạn **khô** (nhạc về −∞ suốt một sketch thoại) bên cạnh cue `hush` ngắn (P3).

## 7. Viết lời

- Trung vị 11 từ/câu nhưng **xen kẽ**: câu kể dài 20–30 từ nối "and / so / while / which" ↔ thoại cực ngắn ("No.", "Ouch.").
  Mảnh câu chỉ nằm trong thoại hoặc cú chốt — đúng luật WRITING §2 của ta.
- **Câu đùa dựng 3 nhịp:** gài bằng giọng kể bình thường / trang trọng → hạ giọng thông tục ("…and by that I mean he went on
  a huge theft and murder spree") → cắt sang hình chứng minh. Hoặc: kể → thoại đóng vai → im → một chữ.
- **Hạ thấp ngôn ngữ ngoại giao** thành nói chuyện đời thường ("could you not" / "sorry but no, I could not not"; tuyên bố
  1766 = "we can do what we want, because we're in charge").
- **Số thật làm nền cho cái đùa:** 60 triệu bảng, 56 đại biểu / 12 thuộc địa, 120 000 pound pháo / 300 dặm, 42 000 viên đạn
  từ tượng vua, 130 tàu / 25 000 lính. Gag đứng trên số đúng nên người xem tin phần còn lại.
- **Giữ đúng sử khi đùa:** sửa ngay trên hình ("2nd of July" + "(4th of July)"), dấu sao cho phóng đại, nói rõ "technically
  a British victory", đoạn có người chết kể bằng số + tranh thời đó. Chưa soát sử toàn bộ; vài chỗ là đơn giản hoá (Đạo
  luật đường "buộc nhập độc quyền từ Anh", Thomas Paine "ông già" — ông 39 tuổi, có lẽ cố ý đùa).

## 8. Họ làm gì → ta áp cho kênh lịch sử thế nào

| họ làm | lời (SCRIPT) | nhân vật | dựng | tiếng |
|---|---|---|---|---|
| sketch lạnh 20–35 s trước khi kể | một cảnh thoại tiền truyện / hệ quả, kết bằng một chữ — đặt TRƯỚC "Hey everyone" | người dẫn vai C đứng trong cảnh | 1 bối cảnh, chữ thoại đổi thay cắt | cắt nhạc trước chữ chốt |
| chính trị = thoại, trận = bản đồ | SHOTS ghi chế độ mỗi đoạn: `talk` / `map` | nước có mặt cho đoạn `talk` | `map`: cờ phe trượt, ≤ 5 s / khung | `map` nhạc chạy đều |
| không nhép miệng; chữ thoại có vạch | thoại ngắn ≤ 8 từ / lượt | mặt ảnh thật không cần miệng | `say()` chữ + vạch, cỡ chữ = âm lượng | — |
| người quyền lực = chân dung thật trên thân phẳng | — | `headcut.py` đã làm được; thêm luật 1 màu áo + 1 đồ vật cố định | — | — |
| nhân vật chạy một tính cách, một phòng riêng | sổ gag chạy cho series | Kaiser / Franz Joseph / Ý… mỗi người một tật | mỗi người một bối cảnh lặp lại | một motif tiếng riêng |
| gài người sẽ phản / sẽ quan trọng | 1 câu gài / tập, không giải thích | — | — | — |
| chữ đùa meta | dòng `TEXT:` trong SHOTS | — | nhãn gạch, dấu sao, bảng đếm | — |
| im trước cú chốt | đánh dấu `[beat]` ở dòng chốt | mặt đơ (vai B) | giữ khung 1–2 s | nhạc về −∞ rồi vào lại |
| nghiêm = tranh thời đó + im | đã có (đoạn chết) | — | tranh khắc PD, khử màu | im |
| cliffhanger + thẻ tập sau 12 s | câu phán cuối một dòng | — | thẻ "PART 2" đứng yên làm màn kết | nhạc kết |

## 9. KHÔNG chép

- Nét vẽ: đầu tròn trắng chấm mắt thân viên thuốc, mặt vua George, Washington má hồng, người que "YOU", bút chì mascot,
  nước có chân que kiểu họ. Ta đã có người đầu tròn riêng (mũ 1914, đầu tách thân — CHARACTER §2) và mapFace; giữ chúng khác.
- Bảng màu bản đồ đặc trưng (đất xanh neon, lãnh thổ đỏ đặc + biển xanh tím) — chọn bảng màu của ta.
- Câu đùa và khuôn câu nguyên văn ("No.", "There's a tax for that", "Never heard of him", "guess who's back", "cut the crap").
- Người kể vô hình — ta đã chốt người dẫn chibi có mặt (4 vai). Học giọng, không bỏ người dẫn.
- Chửi tục ("BS", "kick your ass", "what the fu–"): kênh ta giữ mức nhẹ hơn.
- Quảng cáo nối bằng gag — chưa có nhà tài trợ; ghi lại để dùng sau.
- Không đóng vai nhiều giọng bằng một người — giọng OmniVoice của ta chưa đổi vai tốt; thoại → chữ trên hình (§4) là đường an toàn.

## 10. Đề xuất cho kênh (chờ người dùng duyệt)

| # | đề xuất | đặt ở | giá |
|---|---|---|---|
| P1 | **Hai chế độ cảnh**: mỗi đoạn SHOTS ghi `talk` (sketch thoại, được đứng yên tới ~15 s nếu chữ thoại đổi ≤ 3 s) hoặc `map` (bản đồ cờ, đổi ≤ 5 s). Nguyên nhân / ngoại giao → `talk`; trận đánh → `map`. | `PIPELINE.md` §Hình + `WRITING.md` §5 | thấp |
| P2 | **Thoại bằng chữ có vạch, không nhép miệng**: hàm `say(text, x, y, {size, at})` (chữ trắng viền đen, vạch chỉ người nói, cỡ = âm lượng, hiện từng lượt theo mốc giọng). Mặt ảnh thật và người đầu tròn nói được mà không cần miệng. | code: `projects/hist/_kit/` (mới `say.js`), dùng ở tập 2 | trung bình |
| P3 | **Nhịp im trước cú chốt + sketch khô**: cue loại `hush` (nhạc hạ về −∞ trong 1–2 s, giữ khung mặt đơ) — mỗi tập 4–8 lần, gồm cả nhịp chết; đoạn `talk` dài thì cả đoạn không nhạc, nhạc vào lại (bản mới) ở câu chuyển mạch (§6b). | code: `tools/hist/mix.py` (đọc cue `hush` từ `data/cues.json`) + `WRITING.md` §4 ký hiệu `[beat]` | thấp |
| P4 | **Mật độ gag co giãn**: mục tiêu ~1 gag / 15–20 s ở đoạn nguyên nhân, cho phép 45–60 s không đùa ở đoạn trận / chết chóc; mỗi mạch 30–60 s kết bằng một "nút". `script_check.py` có thể in khoảng cách giữa các dòng đánh dấu `[gag]`. | `WRITING.md` §3 (+ tuỳ chọn `tools/voice/script_check.py`) | thấp |
| P5 | **Sổ gag chạy cho series WW1**: mỗi nhân vật / nước một tật + một bối cảnh riêng lặp lại (vd. Kaiser Wilhelm ganh với anh em họ, Ý "flake" đã gài ở tập 1), ghi lần xuất hiện và tập trả. Gài 1 nhân vật / tập cho tập sau. | `WRITING.md` §3 + bảng trong `projects/hist/<series>/README.md` | thấp |
| P6 | **Luật nhận diện nhân vật quyền lực**: chân dung PD thật (tranh / ảnh) cắt mặt + **1 màu áo + 1 vật cố định** suốt series; nhân vật diễn nhiều thì xin bản biếm hoạ (§3b) nhưng giữ chân dung thật treo trong bối cảnh làm "chứng cứ". | `CHARACTER.md` §2 | thấp |
| P7 | **Thẻ điểm danh tốc độ** khi một tập phải giới thiệu ≥ 3 người / nước cùng lúc (6 kẻ ám sát, các cường quốc): 1.5–2 s mỗi thẻ, nền vạch tốc độ màu riêng, chân dung + tên + nhãn nghề; nhãn cuối là cú đùa (đúng sự thật). | code: `projects/hist/_kit/` `rollCard()`; `CHARACTER.md` §2 | trung bình |
| P8 | **Làn chữ đùa meta**: dòng `TEXT:` trong SHOTS cho nhãn gạch–sửa, dấu sao chú thích phóng đại, sửa ngay trên hình ("2nd of July (4th)"), chữ to cho cụm từ lịch sử. Mỗi tập 3–5 cái. | `WRITING.md` §5 + kit `bigWord()`, `strike()` | thấp |
| P9 | **Sketch lạnh tuỳ chọn** 15–30 s trước câu chào: một cảnh thoại tiền truyện kết bằng một chữ to (vd. WW1 p2: hai ông anh họ Kaiser–Nicky điện tín cho nhau). Cần người dùng xác nhận vì §1b đang mở bằng "chào". | `WRITING.md` §1b | thấp (lời) / trung bình (cảnh) |
| P10 | **Đón trước lời bắt bẻ**: mỗi tập 1 lần người dẫn tự nêu điều khán giả hay "à thật ra…" (huyền thoại bánh mì Princip đã là ví dụ) — biến bình luận sửa sai thành gag, tăng tin cậy. | `WRITING.md` §3 | thấp |
| P11 | **Kết tập**: một câu phán nghiêm tóm tình thế + thẻ "PART 2" / tên tập sau đứng yên 12–20 s làm màn kết YouTube (Sarajevo v3 kết ngay ở 216 s). | `PIPELINE.md` bước 4/6 + `episode.html` | thấp |
| P12 | **Bản đồ trận = cờ phe làm quân cờ**: cờ nhỏ trượt / chồng / đổi màu, nhãn chấm trắng, icon sự kiện (lửa, pháo) đặt ngay trên bản đồ; hình cảnh nhỏ trượt ra từ bản đồ để nối. | code: `projects/hist/_kit/mapkit.js` (`flagUnit()`, `mapIcon()`) | trung bình |

**Kiểm bằng dữ liệu thật:** khi tập 2 có P1–P4, đo lại `pace.py` (đứng yên nên lên ~20% ở đoạn `talk` mà biểu đồ giữ chân
không rơi) và so điểm rơi trong YouTube Studio với các nút gag.
