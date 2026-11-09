# berlin — brief dựng cảnh (cho người dựng từng hồi, 2026-10-29)

Lời: `SCRIPT.md` (bản 2, người dùng duyệt + giọng đã duyệt). Mốc giọng: `data/narration.timeline.json`
(`lines[].text/start/end/words[].w/start/end`; `sections[]` = 11 hồi). Tổng 659 s. Trang: `episode.html` nạp tài nguyên rồi ghép
cảnh từ `scenes/a0.js … a10.js`. Mỗi file:

```js
import * as S from '../../_kit/stage.js';            // W H PAPER RED clamp lerp hash ease easeOut back · label stamp nameTag photoBg photo sticker realBoom shake smoke sweat vein tear flash bigFace lipHost hostIn paper desat credit …
import * as C from '../../_kit/cast.js';             // folk (người đầu tròn kiểu B), crowd (đám đông nhiều hàng; wears, cheer, panic)
import { narrator, cornerHost, mouthAt } from '../../_kit/narrator.js';
import { view, drawMap, country, mapFace, cutout, bubble, ll, INK } from '../../_kit/mapkit.js';
import { P, memo, pressRoom, pressTable, wall, cap, SK } from './common.js';
export default K => { const { g, IM, M, M94, LT, wd, ST } = K;
  return [ [ST('Đầu câu'), (t, X) => { /* t = giây từ đầu cảnh, X = giờ trang */ }], … ]; };
```
ĐỌC chữ ký hàm trong file kit trước khi gọi (`projects/hist/_kit/*.js`, đầu file có cách dùng). Tham khảo cách dùng thật:
`projects/hist/wrong-turn/scenes/*.js` (tập 1, đã duyệt) — học CÁCH dựng, KHÔNG chép bố cục / gag của tập 1 (DNA không lặp:
tập 1 có bảng "MISTAKES n/5", căng-tin trường học, domino — tập này KHÔNG dùng lại).

**Đồ chung (`scenes/common.js`)** — dùng, đừng vẽ lại:
- `P.schab / P.honecker / P.krenz / P.jaeger / P.guard / P.vopo (x, yĐế, h, o)` = nhân vật kiểu B (folk + nét riêng). o = { eyes:
  dot|bored|shock|angry|cry|happy, mouth: o|frown|grin|flat, look, arm:'up', sweat, squint (schab) }. Trả { head:[x,y], r }.
- `memo(x, y, w, rot, { title, stamp, seed })` — **TỜ GIẤY xuyên suốt tập**: mọi lần tờ quy định xuất hiện phải là hàm này.
- `pressRoom({ spot, dim })` + `pressTable(y, mics)` — phòng họp báo (cùng thế giới thumbnail A `youtube/thumb-A-pressroom.jpg`).
  Vẽ pressRoom → người ngồi (P.schab…) → pressTable (bàn che nửa dưới).
- `wall(x0, x1, yĐế, h, { west, gap, seed })` — Bức Tường nhìn ngang (mặt Tây graffiti / mặt Đông xám), `gap` = chỗ trống.
- `cap(hx, hy, r, top, band)` mũ kê-pi Đông Đức.
**Bản đồ:** `M` = europe1960 (tên nước: 'West Germany', 'East Germany', 'USSR', 'Poland', 'Czechoslovakia', 'Hungary', 'Austria',
'United Kingdom', 'France', 'Italy'…), `M94` = europe1994 ('Germany', 'Russia'…). Có cờ + mặt: `country(g, M, V, 'East Germany', { mood,
arms, t })`. Tây Berlin KHÔNG có trong dữ liệu — tự vẽ chấm/đảo nhỏ tại `V.pt(ll(M, 13.4, 52.52))`. Bàn thử: `projects/hist/_lab/map1989.html`.
Hai nửa Berlin 1945: tự vẽ (4 khu bằng màu) — không cần dữ liệu biên giới thật, ghi rõ là sơ đồ.
**Ảnh có sẵn (PD):** `IM.p_reagan` (Reagan phát biểu ở Brandenburg 1987), `IM.p_potsdamer` (đám đông trèo Tường Potsdamer Platz
11/1989), `IM.p_brandenburg89` (Brandenburg 12/1989, đám đông trên Tường). Nguồn: `assets/photos/meta.json`.
**Ảnh thêm (tự lấy, CHỈ CC0 / PD):** mỗi người dựng một thư mục `assets/photos/<chữ của bạn>/` → khoá thành `IM.p<chữ>_<khoá>`:
```bash
python3 tools/hist/commons.py search "<từ khoá>" --n 8                         # ✓ = PD/CC0 dùng được, ✗ = KHÔNG dùng
python3 tools/hist/commons.py get "File:<tên>" projects/hist/berlin/assets/photos/<chữ>/<khoá>.jpg --w 1920
python3 tools/hist/openverse.py search "<từ khoá>"  /  get <id> <out.jpg>      # CC0 + PD (Flickr Commons, rawpixel…)
```
Commons chặn khi gọi dồn (HTTP 429): gọi TUẦN TỰ, gặp 429 thì chờ 60 s rồi thử lại, tối đa ~8 ảnh / người. Ảnh Bundesarchiv và phần lớn
ảnh Đức là CC-BY-SA → KHÔNG dùng. Không tìm được ảnh PD → VẼ (kiểu B), đừng dùng ảnh ngoài giấy phép. Mọi ảnh thật có
`S.credit('… · public domain')`. Ghi dòng nguồn mới vào `meta.json` của thư mục bạn (commons.py tự ghi).
**Mốc:** `LT(pre)` = dòng có đầu `pre` (khớp đúng 1 dòng), `wd(pre, word, nth)` = giờ bắt đầu của từ (dòng đó + 2 dòng sau), `ST(pre)`
= đầu dòng − 0.2 s. Không gõ giây tay.

## Luật cứng (vi phạm = làm lại)
1. **Tất định**: mọi khung là hàm thuần của X. Cấm Math.random / Date.now / performance.now / shadowBlur / ctx.filter. Ngẫu nhiên → `S.hash(i)`.
2. **Kiểu nhân vật**: nhân vật lịch sử + quần chúng VẼ kiểu B (folk / crowd / P.*). Ảnh thật = cảnh "tư liệu" riêng: tràn khung
   (`S.photoBg`) hoặc khung ảnh trên nền tối (`S.photo`) + `S.nameTag` / `S.credit`. **Không dán ảnh thật vào giữa cảnh vẽ.**
   Reagan, Gorbachev, Kennedy… = ảnh tư liệu PD nếu có; không có thì không vẽ chân dung người thật mới ngoài P.*.
3. **Người dẫn** (`narrator.js`, outfit: plain, suit, bowler, soldier, officer, reporter, protest, waiter…): (a) góc phải nhép miệng
   `S.lipHost(X)` khi giải thích / bản đồ — KHÔNG ở cảnh có người dẫn nhập vai; (b) cận mặt phản ứng `S.bigFace` ≤ 1.2 s, tối đa 1 lần
   / hồi; (c) **nhập vai** đúng bảng dưới — cùng cỡ ±10 % với người xung quanh, đúng đồ, không chữ, không mũi tên, không lời.
   Cảnh chết chóc (người chết ở Tường, toà án) + bản đồ thuần: không người dẫn.
4. **Bố cục**: ≤ 3 nhóm đọc được / khung, chữ trong x 96–1824 / y 64–1016, chữ trên hình ≤ 4 từ (trừ thẻ tên / trích dẫn thật), vào
   bằng trượt/bật ≤ 0.3 s rồi đứng yên, đổi hình ~3 s (không đứng một hình > 8 s — tách 2–3 nhịp theo từ). Vị trí + cỡ một nhân vật
   giữ nguyên qua các cảnh liền nhau. Nhân vật toàn thân hoặc bán thân đúng tỉ lệ, không cắt nửa đầu.
5. **Mốc theo TỪ** (`wd`). Hiệu ứng (bật chữ, đổi mặt, đóng dấu) rơi đúng từ được nói.
6. **Nghiêm ở chỗ chết**: người bị bắn ở Tường (a2 cuối), toà án (a9): khử màu, không meme, không chữ đùa, không máu.
7. Mỗi cảnh một dòng chú thích đầu: hình gì · người dẫn ở đâu · tiếng chính (để người làm tiếng đặt cue).
8. Chỉ sửa file hồi của mình (`scenes/aN.js`) + thư mục ảnh của mình. Cần thêm đồ dùng chung → viết hàm cục bộ trong file hồi
   của bạn và ghi trong báo cáo (mình gom về common.js sau). KHÔNG sửa `_kit/`, `common.js`, `episode.html`.

## Kiểm (bắt buộc trước khi báo xong)
```bash
node engine/render/shoot.js check --page projects/hist/berlin/episode.html          # 0 lỗi (cả trang — đừng làm hỏng hồi người khác)
node engine/render/shoot.js stills --page projects/hist/berlin/episode.html --t <giờ1>,<giờ2>,… --outdir out/hist/berlin/qa/<aN>
```
Chụp ≥ 1 khung / 3 s của hồi mình và **mở từng ảnh ra NHÌN** (màn hình trống vẫn "hợp lệ"). Sửa đến khi không có: chữ đè nhân
vật, chữ tràn khung, nhân vật lơ lửng / cắt ngang, khung trống, cỡ nhảy giữa hai cảnh liền, ảnh không ghi nguồn.

## Từng hồi — ý đồ đạo diễn
Câu đùa nằm ở LỜI; hình phải làm câu đùa rõ hơn (gài → trả), không minh hoạ từng chữ. Gag chạy cả tập: chữ đóng dấu
**"NOBODY READ THE MEMO"** đúng 3 lần (a6 "Nobody read the memo, and the only man…", a7 "So now the entire world…", a10 "All
because nobody read the memo") — cùng một kiểu dấu (`S.stamp`), mỗi lần trên một nền khác.

### a0 · Cold open (0–55 s) — người A
- "Hey everyone…" — người dẫn chào (hostIn / lipHost) trên nền tối, chữ luận đề kênh nhỏ "TINY MISTAKES → HUGE DISASTERS" bật theo từ.
- "Last time, one driver took one wrong turn…" — gợi tập 1 cực nhanh: xe 1914 vẽ (`C.car1914` từ cast.js) rẽ nhầm + chữ "EPISODE 1"
  nhỏ, rồi lật trang (whoosh) — ≤ 3 s.
- "Well, here it is, and it's a single sheet of paper." — `memo()` rơi lắc lư xuống giữa khung đen, đèn chiếu.
- "It's November ninth, 1989…" — **money shot**: `pressRoom` + `P.schab` nheo mắt cầm `memo` + `pressTable` (như thumbnail A) →
  ĐÓNG BĂNG (khung hơi khử màu + dấu ⏸ nhỏ) ở "has not read it"/"barely looked at it"; dấu ngày "9 NOV 1989".
- "A reporter asks him one simple question…" — cận Schabowski lật giấy, chữ "IMMEDIATELY" bật đúng từ "immediately".
- "By midnight, the Berlin Wall is open." — ảnh `IM.p_potsdamer` tràn khung (credit). "Within a year…" — bản đồ M: Đông Đức mờ
  dần → M94 'Germany' một khối (cut nhanh).
- "So how does one unread piece of paper beat twenty-eight years of concrete?" — cân: tờ memo nhẹ tênh bên trái ↔ tấm bê tông
  "28 YEARS" bên phải, cán cân nghiêng về phía GIẤY (gag). "…the moment a city got cut in half" — chuyển.

### a1 · A city cut in half (55–110 s) — người A
- Bản đồ M (1960 dùng tạm cho 1945 — chỉ tô, không chữ năm 1960): Đức chia 4 khu (vẽ màu 4 nước Mỹ/Anh/Pháp/Liên Xô bằng tay — sơ
  đồ, không cần biên giới chính xác) → Berlin nằm sâu trong khu Liên Xô, cũng chia 4 (phóng to ô vuông Berlin).
- **Gag bạn cùng phòng**: căn hộ vẽ 4 phòng, mỗi phòng một người (folk) mang cờ nhỏ 4 nước; ngôi nhà to bên ngoài chỉ một người ở (cờ
  đỏ Liên Xô) — "except the apartment was in the middle of a house that only one of them lived in".
- "stopped getting along" — 3 phòng nhập làm một (Tây Đức `country(…,'West Germany')`), phòng còn lại thành 'East Germany' (mặt giận).
- "little island of capitalism, about a hundred miles inside…" — Tây Berlin là đảo nhỏ có đèn neon / cờ trong biển đỏ Đông Đức, thước "≈100 MI".
- "East Germans kept doing something their government really hated, which was leaving." — dòng người (folk mang vali) đi về bên phải;
  bộ đếm "3,500,000" + "1 IN 5" (5 người, 1 người bước ra). **Người dẫn nhập vai #1** "took the subway to West Berlin": toa tàu điện
  ngầm vẽ cắt ngang, hành khách ôm vali, người dẫn (outfit plain/bowler) ngồi giữa đọc báo giả vờ, vali kẹp chân.
- "Imagine running a country where your citizens can quit by catching a train." — biển ga "EXIT" / nút "QUIT" trên vé tàu.

### a2 · Barbed Wire Sunday (110–175 s) — người B
- Đêm 13/8/1961: phố Berlin vẽ đêm (cửa sổ tắt), lính `P.guard` + `P.vopo` trải dây thép gai ngang phố, cuốc xới đường. **Người dẫn
  nhập vai #2** "rolled out barbed wire first": một trong những người lính (outfit soldier + `cap` nếu khớp được — hoặc đứng cùng
  cỡ đồ xám), mặt ngái ngủ, ngáp. Dấu "13 AUG 1961" + chữ "BARBED WIRE SUNDAY".
- "a few days later the concrete started going up" — `wall()` mọc lên từng tấm theo nhịp (thud).
- "Families woke up on opposite sides of a fence" — hai cửa sổ hai bên dây thép gai, hai người vẫy nhau (cảm động, không đùa).
- "Officially it was the Anti-Fascist Protection Rampart" — biển tên dài thòng ra khỏi khung; mũi tên chỉ một chiều (vào trong) — gag
  "only pointed in one direction": súng / đèn trên tháp canh đều quay về phía ĐÔNG.
- Hệ thống tường: mặt cắt ngang vẽ (tường trong — dải cát "DEATH STRIP" — tháp canh — đèn — tường ngoài), nhãn ngắn.
- "More than a hundred thousand… over five thousand made it" — hai bộ đếm. "At least a hundred and forty people died…" — **NGHIÊM**:
  nền tối, khử màu, hàng nến / 140 vạch nhỏ, không người dẫn, không đùa.

### a3 · Tear down this wall (175–208 s) — người B
- "Western leaders came to Berlin…" — bục phát biểu vẽ trước Tường, micro, cờ.
- Reagan: ảnh tư liệu `IM.p_reagan` (photo + nameTag "RONALD REAGAN · 12 JUNE 1987") — chữ trích "MR. GORBACHEV, TEAR DOWN THIS WALL!"
  → "the Wall did not move an inch" — cắt sang `wall()` đứng im + thước đo "0 IN" (gag).
- Honecker: `P.honecker` tự tin cạnh Tường, bong bóng "50… EVEN 100 YEARS" (diễn ý câu thật); "off by about ninety-nine years and two
  months" — đồng hồ cát / lịch 100 năm tua cực nhanh còn 10 tháng, Honecker mặt méo.

### a4 · The summer everything leaked (208–293 s) — người C
- "a very bad year to be a wall" — `wall()` có vết nứt, rỉ nước (ẩn dụ "leaked"), mặt bê tông lo lắng (mắt chấm).
- Bản đồ M: USSR mặt "ngủ"/thôi doạ (bỏ xe tăng — xe tăng vẽ nhỏ quay đầu về nhà), các nước láng giềng ngẩng lên.
- Hungary tháo hàng rào với Austria (`country(…'Hungary')` cầm kìm cắt, hàng rào gãy). Pan-European Picnic: bãi cỏ, khăn kẻ ô, giỏ picnic,
  cổng mở — **người dẫn nhập vai #3**: du khách đội mũ cói cầm giỏ picnic thong thả đi qua cổng (giữa đám folk).
- "tens of thousands… deep personal interest in Hungarian vacations" — tờ quảng cáo du lịch "VISIT HUNGARY!" đông nghịt người (gag).
- Prague: vườn đại sứ quán (hàng rào + lều + đám đông folk); ban công, bộ trưởng nói, đám đông reo át chữ (bong bóng bị chữ "YAAAY" đè).
- Leipzig: đêm thứ Hai, đoàn tuần hành cầm nến (`C.crowd` + đốm nến vàng), băng rôn "WIR SIND DAS VOLK" (câu thật) — **người dẫn nhập
  vai #4**: trong đoàn, cầm nến, cùng cỡ. "permission to use force… extra blood" — căng thẳng: hàng cảnh sát `P.vopo`, nền tối; "But
  nobody gave the order to shoot, and nobody fired." — nhẹ nhõm (giữ nghiêm, không đùa).
- "Nine days later, Honecker… was pushed out" — `P.honecker` bị đẩy khỏi khung (trượt ra); `P.krenz` bước vào cười răng to + nameTag
  "EGON KRENZ".

### a5 · The memo (293–366 s) — người C
- "Krenz needed to let some steam out" — nồi áp suất / ấm nước rít (meme) với Krenz.
- Dự thảo 6/11: `memo()` dài cuộn xuống đất đầy chữ "CONDITIONS"; thị trưởng Tây Berlin (folk suit, không chân dung thật) bong bóng
  "COMPLETE TRASH" (câu thật) → tờ giấy bay vào thùng rác. "Back to the drawing board."
- Sáng 9/11: văn phòng Bộ Nội vụ vẽ, 2–3 quan chức (folk suit + 1 người Stasi `P.jaeger`-kiểu áo xám, KHÔNG phải Jäger — đổi mũ) gõ máy
  chữ vội, `memo()` mới ra lò; đồng hồ tường. "meant to take effect the next day, November tenth" — dấu "10 NOV" + "EMBARGO: MORNING".
- "Now here's the guy who had to announce it" — `P.schab` giới thiệu + nameTag "GÜNTER SCHABOWSKI · SPOKESMAN". "wasn't in the room"
  — phòng họp kín, ghế trống có bảng tên "SCHABOWSKI".
- "Krenz handed him a note" — `P.krenz` đưa `memo` cho `P.schab` (hai người cùng cỡ), không dặn gì (Krenz nháy mắt / vẫy đi).
- "just read the text out without any mistakes" — bong bóng "EASY." "…which, to be fair, is also how I got through college" — cận
  người dẫn ≤ 1.2 s (bigFace, mặt đắc ý / nhún vai), mũ tốt nghiệp — được, vì là câu đùa của người dẫn (không phải nhập vai).

### a6 · The press conference (366–446 s) — người D
- `pressRoom` + `P.schab` giữa + 1–2 quan chức ngồi cạnh (folk suit; Gerhard Beil không cần tên) + `pressTable`. Đồng hồ tường thật
  (18:00 → 18:53 → 19:00) đổi theo lời. "spectacularly boring" — phóng viên (crowd lưng quay về máy, hàng ghế) ngủ gật, "Zzz";
  "Committees, reforms, more committees." — 3 tấm thẻ chữ bật theo từ.
- **Người dẫn nhập vai #5** "a room full of the world's press" (đã đặt ở a5 cuối hoặc đầu a6): phóng viên hàng đầu (outfit reporter
  hoặc plain + sổ), giơ tay khi có câu hỏi — giữ đúng chỗ ngồi qua mọi cảnh phòng họp báo.
- "Then, at about six fifty-three…" — đồng hồ 18:53, một phóng viên giơ tay (KHÔNG ghi tên). Schabowski đọc `memo`, chậm, vấp — phòng
  xôn xao (mắt các phóng viên mở to lần lượt).
- "when does this take effect?" → Schabowski lật giấy (gag lật nhiều trang, `memo` xoay), mồ hôi; câu trích thật **dòng riêng**
  ("As far as I know, it takes effect immediately, without delay.") hiện phụ đề to, từ "IMMEDIATELY" nảy đúng lúc nói.
- "Nobody had told him about November tenth." / "Nobody had told him to wait until morning." — 2 tấm lịch "10 NOV" và mặt trời mọc gạch
  đỏ, lần lượt. "Nobody read the memo, and the only man…" — **dấu "NOBODY READ THE MEMO" lần 1**.
- West Berlin — point three: ngón tay dò `memo` tới "3." (phóng to dòng). Phóng viên Anh hỏi về Tường → Schabowski nói lan man
  (bong bóng chữ rối xoắn ốc), 19:00 đứng dậy.
- "Then he sat down with an American TV anchor, Tom Brokaw of NBC" — máy quay truyền hình + đèn, phóng viên Mỹ (folk suit, không chân
  dung thật, không logo NBC thật) — Schabowski lặp lại "YES, OF COURSE".

### a7 · Nobody read the memo (446–483 s) — người D
- 19:04 điện tín (máy telex vẽ, băng giấy "IMMEDIATELY"), 19:17 TV, 20:00 TV lớn — dùng phòng khách TV gỗ (thế giới thumbnail C
  `youtube/thumb-C-tv.jpg`): gia đình Đông Đức (folk) xem TV, mắt mở to.
- Câu trích "The gates in the Wall stand open wide." — TV phát người dẫn tin (folk suit sau bàn tin), phụ đề câu thật → "They did not."
  → CẮT sang cổng Tường đóng im lìm ban đêm, `P.guard` ngơ ngác, tiếng dế.
- "So now the entire world was reporting a memo that nobody had actually read." — nhiều TV / tờ báo vẽ cùng tít → **dấu "NOBODY READ
  THE MEMO" lần 2**.

### a8 · Bornholmer Street (483–567 s) — người E
- Đêm: cầu Bornholmer vẽ (dầm thép, đèn đường vàng), cổng chắn, chòi gác. Đám đông (`C.crowd`, áo khoác mùa đông) lớn dần theo lời
  ("a few hundred… then thousands") — đếm bằng hàng người tăng.
- `P.jaeger` + nameTag "HARALD JÄGER · STASI LT. COLONEL", điện thoại bàn: gọi liên tục — **gag điện thoại**: nhiều lần quay số, đầu dây
  bên kia chỉ là "…" / tút tút. **Người dẫn nhập vai #6**: lính gác đứng cạnh Jäger (outfit soldier), nhìn điện thoại, đổ mồ hôi.
- "let the loudest troublemakers out and quietly mark their passports" — hộ chiếu + con dấu đóng lên ảnh (tiếng stamp), chữ nhỏ "NO
  RETURN" (không đùa quá — đây là trò bẩn thật). Đám đông hô — chữ "TOR AUF!" (OPEN THE GATE!).
- "So at around eleven thirty that night… open the gate." — đồng hồ 23:30, Jäger gật, thanh chắn nâng lên → dòng người tràn qua cầu
  (khoảnh khắc lớn nhất tập: nhạc, cheer, máy quay lùi rộng).
- "hugs, flowers and bottles of champagne" — người Tây Berlin (folk) ôm, hoa, champagne nổ nút.
- "people were standing on top of the Wall itself" — ảnh `IM.p_brandenburg89` tư liệu (credit) → cảnh vẽ: người đứng trên `wall()`, búa
  đục. **Người dẫn nhập vai #7**: đứng trên Tường cầm búa + chai champagne. Câu "the same Wall where guards had been shooting people
  earlier that year" — dừng vui 1 nhịp: khử màu nhẹ, không đùa.

### a9 · The bill (567–614 s) — người E
- "no way to close the gates again" — cổng rời khỏi bản lề, nằm đất.
- Bản đồ: 'East Germany' + 'West Germany' (M) nhập thành 'Germany' (M94) đúng "Germany became one country again"; dấu "3 OCT 1990".
  "the Soviet Union itself was gone" — USSR (M) vỡ ra (M94 các nước mới) — nhanh, không đùa quá.
- Schabowski: bị đuổi khỏi đảng (thẻ đảng xé); toà án 1997 — **NGHIÊM**: khử màu, `P.schab` cùng `P.krenz` ở vành móng ngựa, búa toà,
  chữ "3 YEARS"; "accepted moral guilt" — Schabowski cúi đầu; "pardoned after about a year"; "He died in Berlin in 2015" — `memo` nằm
  trên bàn trống, đèn tắt dần. Không người dẫn.

### a10 · Outro (614–665 s) — người E
- "did one man's mistake bring down the Berlin Wall? Not really…" — tóm tắt bằng hình cũ (study: tóm tắt bằng hình đã xem): Hungary
  picnic → Prague → nến Leipzig, đặt cạnh nhau như 3 tấm ảnh dán (vẽ lại nhỏ, không ảnh thật).
- "But the memo decided when." — `memo` + đồng hồ. "a stampede that very night" — dòng người a8.
- "All because nobody read the memo…" — **dấu "NOBODY READ THE MEMO" lần 3**, P.schab nheo mắt "…immediately".
- Luận đề + móc tập sau — người dẫn lipHost hoặc hostIn giữa khung; "this time… a happy ending" — tờ memo gấp thành máy bay giấy bay
  qua Tường. "next time… not nearly as happy" — trời tối sầm.
- **Thẻ kết** (từ END tới DUR, ≥ 4 s, đứng yên): tên kênh "BLUNDERSTORY" + "SUBSCRIBE" + "NEXT: AN EVEN SADDER MISTAKE"? — KHÔNG hứa
  đề tài cụ thể; dùng "NEXT TIME: ANOTHER TINY MISTAKE" + người dẫn vẫy.

## Người dẫn nhập vai — tổng (7 lần / 11 phút, mỗi lần một vai khác tập 1)
| # | hồi | dòng | vai |
|---|---|---|---|
| 1 | a1 | "took the subway to West Berlin" | hành khách tàu điện ngầm ôm vali, đọc báo giả vờ |
| 2 | a2 | "rolled out barbed wire first" | lính Đông Đức trải dây thép gai, ngáp |
| 3 | a4 | "Pan-European Picnic" | du khách mũ cói cầm giỏ picnic qua cổng |
| 4 | a4 | "seventy thousand people marched" | trong đoàn biểu tình Leipzig cầm nến |
| 5 | a6 | "a room full of the world's press" | phóng viên hàng đầu giơ tay (giữ chỗ suốt phòng họp báo) |
| 6 | a8 | "nobody above him was willing to give a real order" | lính gác cạnh Jäger nhìn điện thoại, mồ hôi |
| 7 | a8 | "chipping away at it with hammers" | đứng trên Tường cầm búa + champagne |
