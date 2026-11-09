# wrong-turn — brief dựng cảnh (cho người dựng từng hồi, 2026-10-28)

Lời: `SCRIPT.md` (bản 2, người dùng duyệt). Mốc giọng: `data/narration.timeline.json` (`lines[].text/start/end/words[].w/start/end`).
Trang: `episode.html` nạp tài nguyên rồi ghép cảnh từ `scenes/a0.js … a8.js`. Mỗi file:

```js
import * as S from '../../_kit/stage.js';            // label, stamp, nameTag, photoBg, photo, sticker, realBoom, shake, smoke, sweat, vein, tear, flash, bigFace, lipHost, hostIn, paper, desat, credit, boxer, carPhoto …
import * as C from '../../_kit/cast.js';             // folk (người đầu tròn kiểu B), crowd, figure (đầu ảnh trên thân vẽ), car1914 (xe vẽ, người ngồi qua seats)
import * as B from '../../_kit/backdrop.js';         // place('quay'|'cityhall'|'latin'|'palace', {night})
import { narrator, cornerHost, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, mapFace, cutout, pt, bubble, ANCHOR, INK } from '../../_kit/mapkit.js';
export default K => { const { g, IM, M, MW, LT, wd, ST } = K;
  return [ [ST('Câu đầu dòng'), (t, X) => { /* t = giây từ đầu cảnh, X = giờ trang */ }], … ]; };
```
Chung: `./common.js` — `mistakes(n, k, pop)` bảng "MISTAKES n/5" (gag chạy: hiện từ a0 "Fair warning", tăng ở mỗi "Mistake number…"; chỉ hiện ~3.5 s quanh mỗi lần đếm, KHÔNG treo suốt cảnh; số cũ hiện trước rồi nảy lên số mới đúng từ "one/two/…"), `rewind(t,k)`, `streetMap()` + `routeArrow()` (bản đồ phố a5/a6).
Người dẫn có thêm outfit `waiter` (người hầu, nơ), `austro` (quan Áo), `serb` (bộ trưởng Serbia) ngoài suit/bowler/soldier/officer/reporter/protest.
`LT(pre)` = dòng có đầu `pre` (phải khớp đúng 1 dòng), `wd(pre, word, nth)` = giờ bắt đầu của từ (tìm trong dòng đó + 2 dòng sau),
`ST(pre)` = đầu dòng − 0.2 s. Ảnh: `IM.p_<khoá>` (assets/photos của tập, nguồn ở meta.json), `IM.s_<khoá>` (../sarajevo/assets/photos),
`IM.w_<khoá>` (../sarajevo/assets/web), `IM.car/boom1/ff_bust/sophie_bust/potiorek_bust` (cắt nền). Đọc chữ ký hàm trong file kit
trước khi gọi. Tham khảo cách dùng thật: `../sarajevo/episode.html` (tập mẫu, đã duyệt "hầu hết ổn") và `../_lab/cast.html`.

## Luật cứng (vi phạm = làm lại)
1. **Tất định**: mọi khung là hàm thuần của X. Cấm Math.random / Date.now / performance.now / shadowBlur / ctx.filter. Ngẫu nhiên → `hash(i)`.
2. **Kiểu nhân vật** (CHARACTER §2b, người dùng chốt): nhân vật lịch sử vẽ kiểu **B** = `C.folk` + `feat` (ff, sophie, potiorek, princip,
   cabri, mayor, fj, wilhelm, tsar) + `wear`/`coat`. Kiểu A `C.figure(k…)` (đầu ảnh thật trên thân vẽ) chỉ khi GIỚI THIỆU nhân vật lần đầu.
   **Không dán ảnh thật vào giữa cảnh vẽ.** Ảnh thật = cảnh "tư liệu" riêng: tràn khung (`S.photoBg`) hoặc khung ảnh trên nền tối
   (`S.photo`) + `S.nameTag` / ghi nguồn (`credit`). Xe trong cảnh vẽ = `C.car1914` (không `carPhoto`).
3. **Người dẫn** (`narrator.js`): (a) góc phải nhép miệng `S.lipHost(X)` khi giải thích / bản đồ — KHÔNG ở cảnh có người dẫn nhập vai;
   (b) cận mặt phản ứng `S.bigFace` ≤ 1.2 s; (c) **nhập vai** đúng bảng dưới — cùng cỡ ±10 % với người xung quanh, đúng đồ, không chữ,
   không mũi tên, không lời. Cảnh chết chóc (Two shots) + bản đồ thuần: không người dẫn.
4. **Bố cục**: ≤ 3 nhóm đọc được / khung, chữ trong x 96–1824 / y 64–1016, chữ trên hình ≤ 4 từ (trừ thẻ tên / trích dẫn), vào bằng
   trượt/bật ≤ 0.3 s rồi đứng yên, đổi hình ~3 s (không đứng một hình > 8 s — tách thành 2–3 nhịp theo từ). Vị trí + cỡ một nhân vật giữ nguyên
   qua các cảnh liền nhau. Mọi ảnh thật có `credit('… · public domain')`.
5. **Mốc theo TỪ** (`wd`), không gõ giây. Hiệu ứng (nổ, bật chữ, đổi mặt) rơi đúng từ được nói.
6. **Nghiêm ở chỗ chết**: hồi Two shots + The bill — khử màu, không meme, không chữ đùa.
7. Mỗi cảnh một dòng chú thích đầu: hình gì · người dẫn ở đâu · tiếng chính (để người làm tiếng đặt cue).

## Kiểm (bắt buộc trước khi báo xong)
```bash
node engine/render/shoot.js check --page projects/hist/wrong-turn/episode.html          # 0 lỗi
node engine/render/shoot.js stills --page projects/hist/wrong-turn/episode.html --t <giờ1>,<giờ2>,… --outdir out/hist/wrong-turn/qa/<hồi>
```
Chụp ≥ 1 khung / 3 s của hồi mình và **mở từng ảnh ra NHÌN** (luật 3: màn hình trống vẫn "hợp lệ"). Sửa đến khi không có: chữ đè
nhân vật, chữ tràn khung, nhân vật lơ lửng / cắt ngang, khung trống, cỡ nhảy giữa hai cảnh liền.

## Từng hồi — ý đồ đạo diễn
Câu đùa nằm ở LỜI; hình phải làm câu đùa rõ hơn (gài → trả), không minh hoạ từng chữ.

### a0 · Cold open (`## Cold open`)
- "Hey everyone…" — người dẫn chào trên ảnh phố Sarajevo 1914 (`IM.s_sarajevo` khử màu) + tên kênh nhỏ? (không — kênh chưa tên) → chữ luận đề
  "TINY MISTAKES → HUGE DISASTERS" bật theo từ "tiny"/"disasters".
- "Take a good look at this car…" — **money shot ĐÓNG BĂNG**: `B.place('latin')` + `C.car1914` đang dừng, FF + Sophie (kiểu B) ngồi sau, tài xế
  ngồi trước, Princip (`feat:'princip'`, coat suit) đứng cách ~5 ft tay trong túi; hiệu ứng tua dừng (khung hơi khử màu, viền tối, chữ "FREEZE"?
  không — dùng dấu "⏸" nhỏ). Theo từ: "pistol" → khoanh đỏ túi Princip; "brakes" → vệt phanh; "world war" → khung rung + lửa thật mờ phía sau.
- "Around twenty million…" — bộ đếm "20,000,000" bằng chữ to trên nền tối, mỗi số nhảy.
- "Because nobody told the driver." — cận tài xế (folk to, mắt chấm, nhún vai) + chữ "NOBODY TOLD THE DRIVER" (tên tập) đóng dấu.
- "So let's rewind…" — hiệu ứng tua ngược (vạch trắng, ◀◀), đồng hồ / ngày "28 JUNE 1914" đóng dấu.
- "Fair warning…" — bảng "MISTAKES: 0/5" kiểu bảng điểm (sẽ tăng ở từng "Mistake number…" trong các hồi sau — gag thị giác chạy).

### a1 · The powder keg
- căng-tin trường học: vẽ 2 bàn ăn — quốc gia `cutout(g, M, n, …)` (nước biết diễn) ngồi theo bàn: bàn 1 UK/FR/RU, bàn 2 DE/AH, Ý ngồi mép bàn 2 liếc ra cửa.
- AH "one empire, two countries, a dozen languages, one very old emperor" — đếm bằng chữ bật theo từ + Franz Joseph (kiểu A `C.figure('franzjoseph')` lần đầu giới thiệu, hoặc ảnh tư liệu `IM.p_franzjoseph`) "since 1848".
- Serbia: bản đồ Balkan (`view` zoom), mặt Serbia, "fresh off winning two Balkan wars" (ảnh tư liệu `IM.p_balkanwar` nếu có).
- Bosnia: bản đồ, "OCCUPIED 1878" → "ANNEXED 1908" dấu đóng. **Gag máy cắt cỏ**: hai nhà vẽ, hàng rào, người hàng xóm (folk, coat austro) đẩy máy cắt cỏ (vẽ) về sân mình, chủ (folk, fez) mắt giận.
- Conrad: ảnh tư liệu `IM.p_conrad` + nameTag "CONRAD VON HÖTZENDORF · ARMY CHIEF" → phòng họp (B.place('palace') bên trong? vẽ phòng tối) Conrad (folk coat austro, wear kepi) giơ tấm bảng "WAR ON SERBIA?" + bộ đếm "×25 (1913)". **Người dẫn nhập vai #1**: sĩ quan ngồi hàng ghế (outfit hợp — xem narrator.js outfits), đảo mắt / ngáp.
- "And on one Sunday morning…" — bản đồ châu Âu tối dần, chấm đỏ Sarajevo nhấp nháy.

### a2 · The unloved heir
- FF: ảnh tư liệu `IM.s_ff` / `IM.p_ff_sarajevo` + nameTag "ARCHDUKE FRANZ FERDINAND · HEIR". "two other men died first" — hai bia mộ vẽ (không tên) ngã ra cho FF bước lên bục.
- Săn bắn: ảnh `IM.p_ff_hunt` nếu có; bộ đếm "270,000+" → "≈ 15 / DAY" (lịch xé tờ); thú vẽ đơn giản xếp hàng sợ hãi (meme mắt shock).
- Sophie: kiểu A giới thiệu → kiểu B. "countess … practically a commoner" — thang "rank" vẽ: Habsburg trên đỉnh, countess dưới đáy cạnh "commoner".
- Lời thề con không kế vị: tờ giấy "I SWEAR…" + chữ ký, dấu đóng.
- Vienna: `B.place('palace')`, lô nhà hát vẽ: FF ngồi, Sophie bị chặn ở cửa. **Người dẫn nhập vai #2**: người hầu đeo găng (outfit phục vụ nếu có, không thì suit) giơ tay chặn Sophie, mặt áy náy.
- Bosnia: FF đổi sang mũ lông xanh quân phục; Sophie ngồi cạnh trong `C.car1914` — "Which is sweet…" giữ tim nhỏ rồi tắt dần (câu nặng: "the only reason she was in that car").
- "Mistake number one: the date" — bảng MISTAKES 1/5. Lịch "28 JUNE" + tranh Kosovo 1389 (`IM.p_kosovo` tư liệu). Yankees/Boston: đám đông vẽ áo đỏ (Boston) mắt giận nhìn xe diễu hành áo sọc — dùng quần chúng folk + cờ, không logo đội thật.
- Kỷ niệm: tim + "28 JUNE 1900" → "28 JUNE 1914". "lovely day for a drive, perfect day for an assassination" — trời xanh vẽ, cùng khung tối dần.

### a3 · Six assassins
- Sáu người hàng ngang trong phòng tối (như tập mẫu L20): 5 người `S.assassin` hoặc folk áo đen + **người dẫn nhập vai #3** là một trong sáu (áo đen cùng cỡ, mặt đắc ý), không chữ.
- "four pistols, six bombs, cyanide" — đồ vật vẽ rơi lên bàn theo từ.
- Black Hand: cờ hội kín (tham khảo tập mẫu) + ảnh tư liệu `IM.p_apis` nameTag "APIS · HEAD OF SERBIAN MILITARY INTELLIGENCE".
- "the Serbian government didn't order this" — ảnh `IM.p_pasic` (thủ tướng) + dấu "NOT OFFICIAL"; "not a great look" — mặt Serbia trên bản đồ sweat.
- Buôn lậu qua biên giới: đường chấm trên bản đồ; "spread out along the main road by the river" — `B.place('quay')` sáu người đứng rải.

### a4 · The plan falls apart
- "Mistake number two: security" — MISTAKES 2/5; 120 cảnh sát (folk wear police, vài người rải rác thưa thớt dọc phố dài) + tờ báo đăng lộ trình (giấy vẽ "PROGRAMME: ROUTE" có bản đồ nhỏ).
- Đoàn xe trên `B.place('quay')`: đám đông vẫy cờ đen-vàng (Áo) — **người dẫn nhập vai #4** đứng trong đám đông vẫy cờ (bowler), bom nổ → núp tại chỗ (giữ chỗ qua các cảnh).
- Sát thủ 1, 2 "did nothing" — gag: đứng đơ, dấu "…".
- Čabrinović hỏi cảnh sát (bong bóng "Which car?" — cảnh sát chỉ tay giúp), gõ nắp bom vào cột đèn, ném; ngòi ~10 s đếm; nảy khỏi mui (BOING), nổ dưới xe sau (`S.realBoom`).
- Xyanua + nhảy sông: sông nông (nước tới mắt cá) "5 INCHES"; đám đông đánh.
- Princip nhìn xe vụt qua (mặt chán, gió thổi tóc).
- "World War One cancelled" — màn THE END giả + confetti (tập mẫu L23).

### a5 · But no
- "But no." — `S.bigFace` sốc ≤ 1.2 s + tua ngược.
- Toà thị chính `B.place('cityhall')`: thị trưởng (feat mayor, fez) đọc giấy dài lê thê; FF giận (vein) bong bóng câu thật rút gọn "I'm greeted with BOMBS!"; Sophie thì thầm; thị trưởng tiếp tục (meme "this is fine" bằng chính thị trưởng mỉm cười). **Người dẫn nhập vai #5**: quan chức hàng ghế sau, mắt chán.
- Giấy diễn văn dính máu: nghiêm, không đùa — giấy có vệt nâu sẫm, không đỏ tươi.
- "Mistake number three" MISTAKES 3/5 — lịch trình không huỷ. Bệnh viện (ảnh `IM.w_hospital` tư liệu).
- Potiorek (kiểu A giới thiệu `C.figure('potiorek')` rồi B) "Do you think Sarajevo is full of assassins?" — cắt sang: 5 sát thủ còn lại cùng quay đầu nhìn camera (gag). "but sure, mistake number four" MISTAKES 4/5.
- Kế hoạch mới: bản đồ phố vẽ đơn giản (sông ngang, mũi tên xanh thẳng dọc sông "NEW", mũi tên đỏ rẽ "OLD").
- "Mistake number five: nobody told the driver." MISTAKES 5/5 + cận tài xế ngây thơ huýt sáo (♪).

### a6 · The wrong turn + Two shots
- Bản đồ phố vẽ (cùng bản trên): xe 1 rẽ phải vào phố Franz Joseph, xe FF theo. Tài xế Lojka nameTag "DRIVER: LEOPOLD LOJKA"; "only man doing exactly what he'd been told" — dấu ✓ xanh trên đầu tài xế.
- Potiorek la (bong bóng "WRONG WAY!"), phanh, lùi; `B.place('latin')` + `C.car1914` dừng trước tiệm (biển tiệm trơn + chữ "SCHILLER'S DELICATESSEN" như tập mẫu).
- Princip ~5 ft (vạch đo "5 FT"). Sandwich: bánh mì vẽ + dấu "MYTH" (tập mẫu L29).
- **Two shots**: màn đen + 2 chớp (tập mẫu L30) → ảnh tư liệu nghiêm (`IM.s_nyt` báo, `IM.p_arrest` bắt người) khử màu, không người dẫn, chữ chỉ là trích dẫn thật "Sophie, don't die…" dạng phụ đề nghiêm. Không vẽ máu.

### a7 · Five weeks + Dominoes
- "assassinations weren't exactly rare" — 4 chân dung tư liệu xếp hàng (`IM.p_mckinley, p_umberto, p_george1_greece, p_sisi`) bật theo từ, khung đen; chữ nhỏ năm.
- AH muốn đè Serbia; Nga bảo kê (mapkit mặt + bubble).
- **Bữa trưa Potsdam 5/7**: phòng ăn vẽ, Kaiser (feat wilhelm, wear pickel) + đại sứ (folk suit) — tấm séc khổng lồ ký trống "BLANK CHECK". **Người dẫn nhập vai #6**: người hầu bưng khay rót rượu.
- Kaiser đi du thuyền: ảnh tư liệu `IM.p_hohenzollern` + Kaiser kiểu B đeo kính râm (meme) "like you do".
- Tối hậu thư 23/7: ảnh `IM.p_ultimatum` / tờ giấy dài cuộn xuống đất, đồng hồ 48h. Serbia trả lời: **người dẫn nhập vai #7** = bộ trưởng Serbia (phe B) đọc tối hậu thư, đổ mồ hôi, gật gật ký gần hết.
- Kaiser "every reason for war disappeared" (bong bóng diễn ý, đúng câu thật rút gọn) → AH vẫn tuyên chiến: telegram vẽ "WAR. — VIENNA", 28 JULY.
- Dominoes: căng-tin gọi lại (cùng bàn ăn a1) → domino quốc gia ngã (tập mẫu L15 / thumbnail F) theo từ: Nga → Đức → Pháp → Bỉ → Anh. "scrap of paper" — tờ hiệp ước 1839 bị vò. Ảnh `IM.p_bethmann`.
- Willy / Nicky: tin nhắn kiểu group chat (bong bóng chat vẽ, không logo app) "pls no war" ↔ "you first". Ảnh tư liệu `IM.p_willy_nicky`.
- Đám đông cổ vũ (ảnh `IM.p_crowd_berlin` tư liệu) → cảnh vẽ đám đông Berlin vẫy mũ — **người dẫn nhập vai #8** tung mũ; "over by Christmas" → "It would not be over by Christmas." lịch rơi tờ 1914 → 1918, người dẫn trong đám đông mặt méo.
- Biển số: xe vẽ cận biển "A III 118" → chữ chuyển thành "ARMISTICE 11 · 11 · 18" (ảnh `IM.p_armistice` tư liệu).

### a8 · The bill + Outro
- The bill (nghiêm): ảnh chiến hào `IM.p_trench` khử màu; "20 MILLION" chữ trắng nhỏ, không hiệu ứng; bản đồ 4 đế quốc mờ dần (không mặt cười). Princip: ảnh `IM.s_princip`, "1894 – 1918". Không người dẫn nhập vai.
- Outro: người dẫn góc phải nói lại (mode a). 5 sai lầm hiện lại dạng danh sách đánh dấu ✗ theo từ ("the date, the security, …").
  "Instead, nobody told the driver." — tài xế cận, đóng dấu tên tập lần 3.
- Câu luận đề kênh → thẻ kết đứng ≥ 4 s: "NOBODY TOLD THE DRIVER" + "next time: an even smaller mistake" + người dẫn vẫy (không tên kênh — kênh chưa đặt tên).
