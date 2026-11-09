# Sổ tay đạo diễn kênh lịch sử — đúc kết từ tập mẫu Sarajevo (8 bản, 2026-10-24 → 10-28) + tập đầu wrong-turn (10-28 → 10-29)

Đọc file này TRƯỚC khi bàn hay làm một tập mới. Luật chi tiết ở `WRITING.md` (lời), `EDITING.md` (hình + tiếng), `CHARACTER.md`
(người dẫn + dàn nhân vật), `PIPELINE.md` (bước + lệnh). Bằng chứng từng luật: `docs/LESSONS.md` §182–§230.

## 0. DNA kênh = hợp tuyển, không phải một khuôn (người dùng 2026-10-28)
> "Chúng ta sẽ luôn linh hoạt, sáng tạo học theo các video tốt nhất. Không cần fix cứng 1 style. DNA video của chúng ta là
> kết hợp giữa các video thành công. Video Thanh Pahm này chỉ là ví dụ đầu. Bạn là đạo diễn — có quyền nâng cấp hình ảnh,
> đề xuất cách triển khai nội dung học theo các video mẫu."

- **Cái cố định:** đúng sử (soát độc lập, §191) · tiếng Anh cho khán giả Mỹ, châm biếm khô mà không ác · người dẫn vẽ nét
  của kênh (`_kit/narrator.js`) · ảnh tư liệu CC0 / PD thật · render tất định · giọng adam ×1.1 (`voice/VOICE.md`).
- **Cái thay đổi theo từng tập:** cách mở, nhịp, chất liệu chính (ảnh / bản đồ / người que đánh nhau / sketch thoại), bảng
  màu, nhạc, kiểu meme. Mỗi tập chọn lại từ kho mẫu bên dưới theo NỘI DUNG — như "mỗi video một DNA" của kênh toán.
- **Kho mẫu đã mổ** (học kỹ thuật, KHÔNG chép nét vẽ / câu đùa / nhân vật):
  | mẫu | học được gì | file |
  |---|---|---|
  | Thanh Pahm "Thế Chiến 1" | người dẫn nhập vai, ảnh thật + đầu tròn + mặt quốc gia, mở bằng chào → châm → tên trận, ghép vụ nổ thật | `docs/study/15-…`, dải khung `out/_lab/study/12-thanh-pahm-ww1/` |
  | OverSimplified WW1 | kỷ luật dựng: cỡ / khung / ≤ 3 nhóm, một kiểu bản đồ, tiếng ít mà trúng, im lặng là hiệu ứng | `docs/study/16-…` |
  | OverSimplified American Revolution | DNA một tập 15 phút: hai chế độ `talk` / `map`, sổ gag chạy, thẻ điểm danh, kết bằng câu nghiêm + thẻ tập sau | `docs/study/17-…` |
  | Alan Becker (Animation vs. …) | người que chi mềm, dáng đẩy mạnh, thân cong — dùng khi tập cần cảnh đánh nhau / hành động | `docs/stick/` |
  | Historically & các kênh cùng ngách | **chưa mổ** — người dùng đang nghiên cứu thị trường; mổ 1–2 video trước tập đầu | — |

## 0b. DNA khác biệt + luận đề kênh (chốt với người dùng 2026-10-28, số liệu `market/2026-10-28/VIRAL.md`)
Người dùng: "kênh mình có gì khác biệt so với các video đã nổ? … cùng search cùng tìm thì audience ưu tiên các video nhiều views."
1. **Ảnh thật trộn hoạt hình** — đối thủ hoặc vẽ hết (Historically, OverSimplified, Animated History) hoặc thật hết (RealLifeLore,
   Johnny Harris, fern); ảnh tư liệu = "chuyện có thật", hoạt hình = tiếng cười.
2. **Người dẫn du hành thời gian trốn trong sự kiện** (1 trong 6 sát thủ, đám đông, tài xế…) — không tự xưng; khán giả tự tìm
   ("spotted him at 4:12") → bình luận + xem lại.
3. **Luận đề: "History's biggest disasters started with tiny, stupid mistakes"** — mỗi tập một cú sai ngớ ngẩn → hậu quả khổng
   lồ; không đua từ khoá to, đứng cạnh video lớn bằng lời hứa họ không có. Ra mắt 4–5 tập cùng luận đề.
4. Khoảng trống: OverSimplified (9.67M sub) 1 video / 24 tháng. Khán giả ngách né AI ("[No AI]" ở Historically, Serious History)
   → hình vẽ bằng code + ảnh thật; giọng clone là điểm yếu cần bàn.
**Thumbnail:** mình viết prompt (NO text, chừa chỗ) → người dùng gen ảnh nền → mình hậu kỳ người dẫn vẽ nét + chữ + `tools/thumb/check.py`.
Gói của một tập nằm trong tập: `projects/hist/<tập>/PACKAGING.md`.

## 1. Hành trình 8 bản — chê gì, học gì
| bản | người dùng nói | học (LESSONS) |
|---|---|---|
| 1 (92 s) | mở thẳng Sarajevo; xe / phố vẽ "xấu, lỏ"; dân đậu trơn "như con ma" | mở kiểu Thanh Pahm (chào → châm → tên trận → bối cảnh); vật / nơi = ảnh thật; dân = đầu tròn (§187–§189) |
| 2 | lời "quá AI, ngắt ngắt" | văn xuôi, dòng = một hơi, `script_check` chặn mảnh câu (§182) |
| 3 | nhất quán: đứng cùng dân rồi sau nổ lại ra góc; mascot to; mặt to giữa câu kể; tiếng "dun" lạc quẻ | vị trí + cỡ giữ qua cảnh liền nhau; cận mặt ≤ 1.2 s; tiếng phải gắn việc nhìn thấy (§193–§197) |
| 4 | mascot anime không hoà cảnh → vẽ nét bằng code, "quá đẹp, tuyệt vời"; nâng góc lên, cách lề | người dẫn vẽ nét đổi đồ bằng code (§198); tiếng làm lại 43 cue (§199) |
| 5 | người dẫn ở góc phải là "người trong cuộc" | 3 agent review độc lập (lời / hình / tiếng) ra danh sách số |
| 6 | "quên nguyên tắc người dẫn là người trải nghiệm" | (hiểu sai: nhét người dẫn mọi cảnh + câu "I was there") |
| 7 | "why I know… dfuck is that"; "mỗi thứ nhét 1 ít, chả có cái gì ra hồn"; chưa hiểu thì HỎI | người dẫn xuất hiện bằng HÌNH, không lời tự xưng; ví dụ ≠ danh sách bắt buộc (§200) |
| 8 | "hầu hết ổn rồi"; muốn thêm người dẫn trong đám đông; tăng nhẹ tần suất | §3 dưới đây (§204) |

## 1b. Tập đầu wrong-turn — từ thị trường tới bản trọn 13 phút (2026-10-28 → 10-29)
| bước | chuyện gì | học |
|---|---|---|
| thị trường | báo cáo agent khác + 28 kênh: từ khoá dễ nổ; người dùng: "mình có gì khác biệt?" | đề tài kèm lời hứa video lớn không có (§205, §0b) |
| thumbnail | prompt ảnh AI "điện ảnh" → "quá kém"; kênh thắng dựng từ dàn nhân vật + meme | 6 hướng dựng bằng code, A/B = A + D + F (§206) |
| bàn thử nhân vật | đầu ảnh cắt vuông, ảnh thật dán vào cảnh vẽ → "sai và kì" | B: VIP vẽ đầu tròn có nét nhận dạng, xe vẽ có người ngồi (§207, CHARACTER §2b) |
| lời bản 2 | soát sử 25 mục + biên tập độc lập → duyệt | 5 sai lầm đánh số, gag "Nobody told the driver" ×3 |
| giọng | câu trích thị trưởng bị nuốt 6 từ | câu trích dài → dòng riêng (§208) |
| dựng | 5 agent × 9 hồi theo `BRIEF-SCENES.md`, QA độc lập 198 khung → 2 lỗi sự thật trên hình + 11 lỗi lớn | vai / đạo cụ chung vào `common.js` TRƯỚC khi giao; QA soát cả nhãn / địa danh (§209) |
| render | 8 phần song song, 47 666 khung, trộn 168 tiếng | ~1 giờ máy |
| nhạc | PD ragtime "ồn ào" → 7 bản người dùng gen theo prompt từng đoạn | nhạc dưới lời không piano chạy nốt; lặp có nối chéo (§211, `MUSIC.md`) |
| gói đăng | 3 cặp title ↔ thumbnail A/D/F, mô tả + 12 chương, tags, Problems, SRT, bình luận ghim | dán nguyên văn chữ cho người dùng; Education có Problems (§214, `out/hist/<tập>/youtube/UPLOAD.md`) |
| kênh | tên Blunderstory @blunderstorytv, avatar B, banner 4 vòng, Studio | nhận diện = cả kênh, không theo tập đầu (§212–§215, `BRAND.md`, `STUDIO-SETUP.md`) |

## 1c. Tập 2 berlin — một ngày từ chọn đề tới bản 2 (2026-10-29)
| bước | chuyện gì | học |
|---|---|---|
| đề tài | 4 ứng viên cùng luận đề (Berlin, Zimmermann, Pearl Harbor, Constantinople) → người dùng chọn Berlin ("an even smaller mistake" — lời hứa cuối tập 1) | đề tài tiếp nối = giữ lời hứa thẻ kết; vidIQ hết credit → gợi ý tìm kiếm YouTube (§225) |
| gói | 3 thumbnail 3 thế giới (họp báo / tờ thông cáo rách / TV 1989), không lặp bộ tập 1 | duyệt ngay lượt đầu (THUMB-LOG) |
| lời | tự soát → soát độc lập bắt 9 chỗ (328 ngày, ≥ 140 người chết, Brokaw…) | phép tính ngày bằng code (§224) |
| dựng | khung + `common.js` + bản đồ 1960/1994 vào kit TRƯỚC; 5 agent / 11 hồi ~1 giờ; mình xem bảng ảnh từng hồi | bỏ QA độc lập → người dùng bắt 4 lỗi bản đồ / chữ (§222, §223) |
| nhạc | 7 bản người dùng gen → thư viện kênh `_kit/music/LIBRARY.md` | tập sau dùng lại trước khi xin gen (§225) |
| gói đăng | `out/hist/berlin/youtube/` đủ ô: title A/B/C, mô tả 11 chương + nguồn, tags, Problems 15 câu, SRT 237 dòng, ghim, UPLOAD.md | thẻ (card) ở "Last time…" trỏ tập 1 |

## 1d. Tập 3 pearl — tự làm tuần tự một ngày, từ đề tài tới bản 1 (2026-10-30)
| bước | chuyện gì | học |
|---|---|---|
| đề tài | giữ lời hứa cuối tập 2 ("lần sau không vui") → Pearl Harbor radar; đăng trước kỷ niệm 7/12 | lịch kỷ niệm = tín hiệu tìm kiếm theo mùa |
| gói | 3 thế giới: lều radar (bối cảnh) / ảnh Arizona + giấy ghi điện thoại / đồng hồ báo thức; người dùng: "biểu cảm chưa đa dạng" → mỗi bản một mặt (nháy mắt, khóc, ngủ mũ ngủ) | biểu cảm + mũ mới vào kit (§230) |
| lời | vật xuyên suốt = đồng hồ báo thức (không đếm "number one" như tập 1); soát độc lập sửa 10 chỗ ("less than an hour" sai, "five words" = 4 từ, war warning gửi Hải quân) | phép đếm / giờ trong câu đùa cũng phải tính |
| giọng | "U S S Ward" → whisper nghe "sword" → viết lại "the old American destroyer Ward" | viết tắt đánh vần dễ đọc sai — tránh trong lời |
| dựng | một mình 10 hồi + common.js; bản đồ Thái Bình Dương mới (thiếu Oahu!) | QA độc lập cỡ thật bắt 27 lỗi (§227–§229) |
| tiếng | 103 tiếng, nhạc 100% thư viện kênh (0 bản gen mới), thêm `alarm-ring` CC0 | thư viện kênh trả công (§225) |
| gói đăng | `out/hist/pearl/youtube/` (người dùng bắt lỗi gói nằm trong projects/ — §226) | sản phẩm luôn ở out/ |

Ba bài học lớn nhất cả đợt Sarajevo:
1. **Nhìn mẫu ở độ phân giải gốc trước khi dựng** — mọi lỗi chất liệu (xe vẽ, dân đậu, sơ đồ phố be) là do dựng theo trí nhớ
   thay vì soi dải khung mẫu (§190).
2. **Hiểu đúng ý trước khi làm** — hai bản (6, 7) mất vì biến ví dụ của người dùng thành checklist. Ý mới có ≥ 2 cách hiểu →
   hỏi bằng 2–3 phương án cụ thể (§200).
3. **Ít mà ra hồn** — mỗi thiết bị (người dẫn nhập vai, meme, sting, cận mặt) làm một lần cho đẹp hơn rải mười lần nửa vời.

## 2. Câu chuyện + cách kể
- **Khung tập** (WRITING §1b): chào → câu châm / câu móc tò mò (hứa 3 hình ảnh: "a wrong turn, a stalled car and a
  nineteen-year-old outside a deli") → tên trận → bối cảnh cho người Mỹ (giải nghĩa từ lạ: "Austria-Hungary, which was one
  empire, two countries and one very old emperor") → sự kiện → hậu quả nghiêm → móc tập sau ("And Italy? Well, Italy has a
  decision to make.").
- **Đùa bằng sự thật**: gài → trả ("Plan failed, Archduke safe, World War One cancelled." … "But no."), nói giảm / phóng
  đại sự thật có thật (sông sâu 5 inch, xyanua quá hạn), sửa huyền thoại (bánh mì kẹp là chuyện bịa). Mật độ co giãn: 1 gag /
  15–20 s ở đoạn nguyên nhân, KHÔNG đùa ở đoạn có người chết.
- **Ngừng trước câu chốt**: dòng tách đôi + `hush` nhạc 1.5–3 s; câu chết chóc có khoảng lặng dài (`_quiet`).
- **Đúng sử là cổng**: mọi lời + số + ngày trên hình qua soát độc lập trước khi đọc giọng — đã bắt 5 lỗi ở Sarajevo
  (Ý xin vào Liên minh 1882, xe dẫn đầu rẽ trước, tầm pháo Paris, điều kiện điện Zimmermann, "biggest navy").
- **Độ dài theo nội dung** ("khoảng 1 phút" là ước lượng — không ép, không hỏi lại).

## 3. Người dẫn — tần suất + cách xuất hiện (người dùng 2026-10-28, chốt sau bản 8)
- **Ba chế độ**: (a) nói ở góc phải, nhép miệng — khi giải thích / bản đồ; (b) cận mặt phản ứng ≤ 1.2 s sau cú chốt
  ("But no."); (c) **nhập vai trong cảnh** — có mặt như một người trong sự kiện, KHÔNG nói "I was there".
- **Tần suất nhập vai: nhiều hơn Thanh Pahm một chút** (họ 4 lần / 18 phút). Mục tiêu ≈ **1 lần / 1–1.5 phút**, ĐẶT CẠNH
  các sự kiện quan trọng. Chỗ hợp:
  1. **chuyện chỉ người trong cuộc biết** — mật đàm, hội kín, phòng họp phe A rồi phe B (Sarajevo: 1 trong 6 sát thủ, áo đen
     cùng cỡ, mặt đắc ý giữa đám cau có);
  2. **cảnh đông người** — đám đông vẫy cờ, hàng lính, hội nghị (Sarajevo: đứng trong đám đông vẫy cờ, bom nổ → núp tại chỗ);
  3. vai có hành động rõ (tài xế, người hầu bưng khay, lính chiến hào) khi nó làm câu chuyện vui hơn.
  Không nhét vào cảnh chân dung, bài báo, bản đồ thuần, cảnh chết chóc; không thêm người thứ bảy / mũi tên / nhãn "that's me".
- **Hình phải ra hồn**: toàn thân cùng cỡ người trong cảnh (±10 %), đúng đồ (`outfit`), giữ chỗ qua cảnh liền nhau, không cắt
  nửa đầu. Không dựng đẹp được → bỏ.

## 4. Hình — hệ chất liệu đã có (EDITING A + B)
| lớp | dùng cho | đồ nghề |
|---|---|---|
| ảnh nơi chốn thật tràn khung (khử màu nhẹ, đẩy chậm) | nền cảnh sự kiện | `S.photoBg` · ảnh `openverse.py` / `commons.py` |
| ảnh thật cắt nền | xe, vụ nổ, người quyền lực bán thân, tranh biếm hoạ thời đó | `tools/hist/cutout.py` · `S.sticker`, `S.carPhoto`, `S.realBoom` |
| người đầu tròn vẽ | dân, đám đông (mũ 1914), sát thủ (áo đen, mắt xếch) | `S.person`, `S.crowdRow`, `S.assassin` |
| quốc gia biết diễn | khối bản đồ tô cờ + mặt meme + găng đấm | `mapkit.js` `drawMap`, `mapFace`, `cutout`, `S.boxer` |
| bản đồ một kiểu / tập | 1914 châu Âu, thế giới 1914 | `_kit/maps/*.json` (historical-basemaps, ghi nguồn) |
| chữ làm vật | dấu đóng (CANCELLED, 28 JUNE 1914), thẻ tên, nhãn, bong bóng ≤ 4 từ | `S.stamp`, `S.nameTag`, `S.label` (tự kẹp vùng an toàn) |
| lớp meme | mồ hôi, gân giận, lệ, khói, rung khung, "*gulp*", "*cough*" | `S.sweat`, `S.vein`, `S.tear`, `S.smoke`, `S.shake` |
| người dẫn | 7 bộ đồ × 11 dáng × 8 miệng | `_kit/narrator.js` · bảng xem `projects/hist/_lab/narrator.html` |
Luật đo được: ≤ 3 nhóm đọc được / khung, ≥ 40 % nền trơn, vào bằng trượt + nhoè ≤ 0.3 s rồi đứng yên, ~3 s / hình, chữ trong
x 96–1824 / y 64–1016, ảnh ghi nguồn góc trái (`creditLeft`).

## 5. Tiếng — hệ đã có (EDITING C)
- **Kế hoạch tiếng là script theo TỪ**: `projects/hist/<tập>/data/cues.py` → `cues.json` (mỗi tiếng = đầu câu + từ + một
  việc nhìn thấy). Chạy lại sau mỗi lần đọc giọng; không gõ giây tay (§201).
- **Thư viện chung**: `projects/hist/_kit/sfx/` (31 file: 28 tiếng CC0 / PD + nền phố, gió, rè đĩa 78 vòng; nguồn `CREDITS.md`) và
  `projects/hist/_kit/music/` (5 bản PD: ragtime 1911, hành khúc 1914, Chopin tang lễ, trombone, sting). `mix.py` tìm tiếng
  trong tập trước, rồi thư viện.
- **Mức + mật độ**: 6–12 tiếng / phút; nổ / súng ~1 / phút, đặt SAU khoảng lặng; 3–5 `hush` / 5 phút trước câu đùa; nhạc
  đổi bản theo ĐOẠN (`_music`), dưới lời ~16 dB; đoạn chết chóc `_quiet` liền một mạch; nền dài dùng `end` (lặp + mép mềm).
- Không sting tự tạo không gắn hình (`dun` bị chê); ba tiếng tự tạo (scratch / slide / stall) đã bỏ — tìm bản CC0 khi cần.

## 6. Quy trình + kỹ thuật (PIPELINE)
- Một tập = `projects/hist/<tập>/` {README, SCRIPT, episode.html, data/, assets/} — trang **import** `_kit/stage.js`,
  `_kit/narrator.js`, `_kit/mapkit.js`; đồ nghề mới viết thẳng vào kit (tập mẫu từng chép 180 dòng kit rồi lệch nhau, §202).
- Tập dài (> 5 phút): `episode.html` chỉ nạp + ghép; cảnh theo hồi `scenes/aN.js` (`export default K => [[giờ, (t, X) => …]]`),
  gag + vai lặp ở `scenes/common.js`, hợp đồng cho người dựng `BRIEF-SCENES.md` (mẫu: `projects/hist/wrong-turn/`). Nhiều hồi
  → giao song song được (mỗi agent 1–2 hồi), rồi một agent QA độc lập xem ảnh mỗi ~4 s (§209).
- Cảnh tìm dòng bằng ĐẦU CÂU (`LT('…')`), mốc bằng TỪ — sống sót qua mọi lần viết lại / cắt câu.
- Cắt câu khỏi giọng có sẵn không cần đọc lại: cắt `narration.wav` + dời `narration.timeline.json` + `mouth_env.py` (bản 7: 3
  câu, 1 phút làm).
- Render song song 4 phần (`--from/--to`, giờ trang), đếm khung tổng = DUR × 60, `ffmpeg concat`, `mix.py`, `loudnorm
  I=-15 TP=-1.5`. Chỉ render lại phần có cảnh đổi.
- Refactor đồ nghề: chụp 40+ khung trước / sau, so md5 từng ảnh (bản 8: 44/44 giống hệt).

## 7. Làm việc với người dùng (kênh này)
- Người dùng đạo diễn bằng nhận xét sau mỗi bản: xem bản cuối → nói điều không ổn bằng ví dụ. Ví dụ là MINH HOẠ ý.
- Chưa hiểu → AskUserQuestion với 2–3 cách hiểu cụ thể, rồi mới làm. Hiểu rồi → làm hết, báo một lần.
- Báo localhost, không gửi link claude.ai; không gửi lại link khi người dùng tự mở; báo giờ chờ render khi được hỏi.
- Subagent chỉ khi người dùng cho phép (TẮT 10-28 sáng; BẬT lại 10-28 tối cho wrong-turn: "triển khai subagent để tăng hiệu quả").

## 8. Tập đầu tiên — đề xuất của đạo diễn (đã làm: `projects/hist/wrong-turn/` bản 1, 2026-10-29 — mục 1, 5, 6 có; 2, 3, 7 còn lại)
Người dùng: "thật chỉn chu, đầy đủ, bùng nổ cả effect, hiệu ứng, visual, câu chuyện, cách kể chuyện, những meme phù hợp."
**Đã sẵn** (từ Sarajevo): toàn bộ §4–§6. **Đề xuất nâng cấp** (chọn theo chủ đề, mỗi cái thử ở `_lab/` trước khi vào tập):
1. **Mở 30 s bùng nổ**: 3 hình hứa hẹn cắt nhanh 0.8–1.2 s (như câu móc Sarajevo) + một khung "money shot" đẹp nhất tập
   đặt ở giây 5–8; tên tập hiện bằng dấu đóng + tiếng đóng dấu.
2. **Camera trên ảnh thật**: parallax 2–3 lớp (nền / người / khói) thay cho ảnh phẳng đẩy chậm; whip-pan / zoom 4–8 khung khi
   đổi chỗ trên bản đồ (EDITING B8).
3. **Bản đồ sống**: quân cờ phe di chuyển theo mũi tên, biên giới đổi màu theo năm, quốc gia đấm nhau (đã có `boxer`) —
   chế độ `map` của OverSimplified.
4. **Cảnh hành động người que** khi chủ đề có trận đánh: hệ Becker (`docs/stick/`) cho 1–2 khoảnh khắc đỉnh (không cả tập).
5. **Meme** (người dùng 2026-10-28): ƯU TIÊN meme trên mạng → tìm không được thì đề xuất người dùng tìm và gửi → không có
   mới tự vẽ / tự cắt ghép rồi lồng vào video. Mắt meme trên ảnh thật (B7: ≤ 1 / 20 s, giữ ≥ 1 s).
6. **Sổ gag chạy cho tập** (study 17 P5): 1–2 vật / câu đùa quay lại 3 lần (Sarajevo: "nobody told the driver").
7. **Tiếng điện ảnh hơn**: nền theo nơi (chiến hào: gió + súng xa; cung điện: tiếng vọng), riser 1–2 s trước cú nổ lớn, nhạc
   đổi đúng hồi; vẫn 6–12 tiếng / phút.
8. **Gói đăng** song song từ đầu: title + thumbnail người dẫn (bản anime `assets/hist-host/` cho thumbnail) + 30 s đầu
   (PACKAGING §0b), 4–5 tập ra mắt cùng lúc (CHANNEL).
**Nhạc nền** (người dùng 2026-10-29): THƯ VIỆN KÊNH `projects/hist/_kit/music/LIBRARY.md` — tập mới chọn bản có sẵn hợp không khí trước,
chỉ đoạn thiếu mới viết prompt `MUSIC.md` cho người dùng gen; bản mới chép vào `_kit/music/gen/` + thêm dòng vào LIBRARY.
**Quy trình chọn đề tài (làm CÙNG người dùng, khi có ý tưởng + báo cáo thị trường `channels/hist/market/`)**: dựng hệ phân
tích, đánh giá nội dung viral cùng ngách → chọn nội dung tốt → tìm các nội dung tương tự để tổng hợp thông tin → đề xuất hình,
tiếng, cách triển khai. Không tự chọn đề tài.
Còn thiếu cần chuẩn bị: mổ 1–2 video Historically / cùng ngách (người dùng gửi link hoặc lời); thư viện meme vẽ lại;
riser / tiếng vọng CC0; parallax trong `stage.js`; thumbnail cho kênh.
