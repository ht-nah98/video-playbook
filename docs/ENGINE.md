# ENGINE — bản đồ module và hợp đồng cảnh

`engine/` dùng chung cho MỌI video, không biết gì về một bài cụ thể — và không áp phong cách: phong cách nằm ở DNA
của từng video (`docs/DNA.md`). Mỗi bài là một thư mục `projects/<p>/` (dựng khung bằng `tools/new-mv.sh` hoặc
`tools/new-lesson.sh`). MV tham chiếu đầy đủ: `projects/mv/exp-log` (27 cảnh, 239.65s). Video bài học dùng hợp đồng cảnh
KHÁC (không qua `Show`) — mục 7.

## 1. Cảnh MV (plate) — hợp đồng

Mỗi cảnh là `projects/<p>/plates/pNN-ten.js`, `export default class`:

| thành phần | bắt buộc | ý nghĩa |
|---|---|---|
| `t0` | — (engine gán TRƯỚC `init`) | mốc vào cảnh |
| `async init(s)` | ✓ | `s = { mascot, beat, ...extra }`; exp-log `extra = { tl, face, vox }`. Tra mốc lời ở đây |
| `render(g, t)` | ✓ | hàm THUẦN của `t`; vẽ dưới camera của cảnh |
| `backdrop` | | object tham số nền chung, hoặc `false` (cảnh tự tô nền, vd. trang giấy) |
| `backdropAt(t)` | | như `backdrop` nhưng đổi theo `t` (ưu tiên hơn `backdrop`); trả `false` để tắt |
| `camera(t)` | | `{ s, x, y, r, cx, cy, bg }`: phóng `s` quanh `(cx, cy)`, dời `(x, y)`, xoay `r`; `bg` ∈ [0,1] = phần camera áp lên nền |

Engine (`engine/main.js` `Show`) mỗi khung: tô `bg` → nền chung (camera·`bg`) → cảnh đang chạy (camera đủ).
Cảnh đang chạy = cảnh có `t0` LỚN NHẤT ≤ t. Thứ tự cảnh khai báo trong `projects/<p>/index.html`
(`order: [[mốc, Lớp], …]`; mốc tra từ lời: `tl.at('câu', n)`, hoặc `tl.line('câu').end + 0.12` khi cảnh
không bắt đầu ở một câu; cảnh đầu `0`); thêm cảnh: `python3 tools/qa/addscene.py`.

**Luật kỹ thuật của mọi cảnh** (mỗi luật có giá ở `docs/LESSONS.md`):
- Thuần theo `t`: cấm `Math.random`/`Date.now`/`performance.now`; cần ngẫu nhiên → `hash(i)`.
- Mốc lời tra theo CHỮ: `tl.at(text, n)`, `tl.line(text, n).words[i].start`. Mốc nhạc cụ (không có trong lời)
  khai báo hằng số kèm nguồn (`data/stems.json`).
- Không tô nền toàn khung khi đang dùng nền chung (xoá sạch lớp nền).
- Plate không import plate — hình dùng chung giữa các cảnh để ở module của project (`chorus.js`, `finale.js`…).
- Ranh giới cảnh: khung đầu của cảnh sau tiếp đúng khung cuối của cảnh trước — camera, tham số nền, vật dùng
  chung — trừ chỗ DNA/TREATMENT cố ý cắt. Cảnh sau DÂNG từ giá trị cuối của cảnh trước
  (`lerp(cũ, mới, smooth(prog(t, t0, t0+0.3)))`). Kiểm bằng `tools/qa/seams.py`.

**Phong cách là của từng MV** (`docs/DNA.md`). Engine có sẵn công cụ cho các lựa chọn exp-log đã dùng — chữ giải
mã/vỡ (`lyric.js`), nhân vật vào/ra bằng ký hiệu (`transit.js`), cả cảnh vỡ thành ký hiệu (`morph.js shatter`),
gập/phản chiếu (`mirror.js`), CRT (`crt.js`) — nhưng MV khác có thể chọn khác (cắt cứng theo beat, fade, wipe…).
Khi chọn khác thì thêm công cụ vào engine, đừng sửa hành vi của công cụ cũ (MV cũ phải render y hệt — `golden.sh`).

### Mẫu: khung ĐÔNG CỨNG (P23b "Why does it work?", P27 227.3)
```js
render(g, t) {
  const tf = Math.min(t, FREEZE);                       // thế giới dùng t đông
  if (t >= FREEZE) { g.save(); g.setTransform(1,0,0,1,0,0); backdrop(g, tf, { beat, ...this.bd(tf) }); g.restore(); }
  this.world(g, tf);
  // chỉ những thứ CÒN SỐNG dùng t thật (nhân vật bước ra, chữ số mọc)
}
backdropAt(t) { return t < FREEZE ? this.bd(t) : false; }   // nền chung chạy theo t thật → tắt, tự vẽ ở tf
camera(t) { const tf = Math.min(t, FREEZE); … bg: 0 }        // bg: 0 để nền tự vẽ khớp nền chung
```

## 2. Module

| module | dùng cho | API chính |
|---|---|---|
| `lib.js` | nền tảng | `W, H`, `clamp, lerp, smooth, prog(t,a,b,ease)`, `outBack, outExpo, outCubic, inExpo, inOutCubic`, `hash(n)`, `makeBeat({bpm,t0})` → `onBeat, beatPulse, beatT, BEAT, BAR`, `makeVox` (99-intro) |
| `main.js` | điều phối | `new Show({ order, beat, end, assets, poses, bg, backdrop, extra, camera })`, `init()`, `render(g,t)` |
| `timeline.js` | mốc lời | `loadTimeline(url)` / `makeTimeline(json)` → `line(text,n)`, `at(text,n)`, `lineAt(t)`, `sectionAt(t)`, `wordsOf(line)` |
| `lyric.js` | chữ để ĐỌC | `decodeLine(g, words, t, x, y, {font, colBase, colKey, keys, burstAt, burstDur, align, mirror})`, `burstText(g, str, t, tb, x, y, font, col, {dur, seed, align})`, `footerPlan(tl,t,{from,carry,at,dur})`, `footerLine(g,tl,t,keys,opts)`; `typeLine`, `caret` (99-intro) |
| `glyphs.js` | ký hiệu toán | `GLYPHS`, `decodeChars`, `burstChars` |
| `transit.js` | nhân vật vào/ra | `presence(t, tIn, tOut, {inDur, outDur})` → `{state, k}`; `drawTransit(g, m, pose, x, y, h, kind, 'in'|'out', k, {t, cell, seed})`; `figure(g, m, pose, x, y, h, kind, p, {t, seed, flip})`; `KINDS` = rows · columns · grid · burn · digits |
| `mascot.js` | ảnh nhân vật | `Mascot.load(dir, poses)`, `draw(g, pose, x, y, h, {alpha, ring, ringColor, shadow, flip})` (x = giữa, y = chân), `grid()`; `POSES_V2`, `POSES_V2_MID`; `toCanvas` (tất định) |
| `face.js` | mặt cận hát nhép | `new Face().load(dir, {set:'b'})`, `draw(g, x, y, h, mouthId)` |
| `visemes.js` | khẩu hình | `mouthAt(t, words, env)`, `makeEnv(vox.json)`, `V` |
| `talk.js` | miệng NÓI (bài học, tư thế toàn thân) | `drawMouth(g, pose, {x0, y0, s, flip}, open, imgW)`, `mouthOpen(env, t, k)`, `makeEnv` — neo ở `assets/character-v2/mouths.js`, đường bao từ `tools/voice/mouth_env.py` (CHARACTER-V2 § Miệng nói) |
| `shade.js` | bóng mờ / hào quang TẤT ĐỊNH (bài học — LESSONS §127) | `shadowRR(g, x, y, w, h, r, {col, blur, ox, oy})`, `shade(g, fn, {box})`, `glow(g, x, y, r, rgb, a)` — sprite 9 mảnh vẽ sẵn thay `shadowBlur`; mẫu kit re-export; bàn thử `tools/lab/shade.html` |
| `stick.js` | người que tất định SỐNG TRONG hình toán (học "Animation vs. Geometry" — `docs/study/06-stick-geometry.md`) | `stick(g, x, y, pose, {h, color, dir, rot, squash, ground, feet, hands})` → toạ độ khớp; `P` (17 tư thế: dáng nghiêng + chính diện), `mix(a, b, k)`, `walk(phase, {run, lean})` (chân bám mặt đất bất kỳ qua `ground`), `ik2` (tay/chân chạm đúng điểm); bàn thử `tools/lab/stick.html` (leo y = x², cưỡi điểm thứ hai, cát tuyến → tiếp tuyến) |
| `mascot-line.js` | mascot kênh Anh vẽ nét (2026-10-29) | `mascot(x, yĐế, h, {mood, mouth, arms\|hands, crouch, lift, lean, yaw, look, lookY, blink, sweat, flip, noArm})` → `{hy, r, top, hands}`; `head(x, y, r, {…, yaw})`; `talkMouth(open, t)`, `blinkAt(t, seed)`; chỉ góc thẳng + xoay 3/4 `yaw` (§219 §220) |
| `mascot-actor.js` | mascot diễn trong cảnh | `actor({base, mh}).draw(g, {keys, walks, hold, grip}, t)` → `{C, r, armL, armR, P}`; `F({...})` khoá (y c l0 l1 lean yaw ax ay bx by look lookY mood mouth sweat), `HANDS`; đi bộ tự quay 3/4 |
| `stickmove.js` | đạo diễn chuyển động người que (study 08, 10) | `keys(list, t)` (khoá tư thế + ease), `gait(o, t)` (bản đồ bước — chân không trượt), `ease` / `easeOut` / `easeIn`, `snap` / `fast` (nhịp Becker: ease-out mạnh, giật), `reach(neck, p, len)` (kẹp tay trong tầm), `leadOf(W)` (chân dẫn — nối hai lượt đi không trượt), `NOOP` (ctx giả cho gác số) |
| `hero.js` | người que khăn đỏ — nhân vật xuyên suốt (`docs/character/CHARACTER-STICK.md`) | `hero(g, v, x, y, pose, {h, dir, hip, feet, hands, squash, arm, eye, wind, t, scale, anger, front})`, `headOf`, `ARM` (1.3), `card`, `star`, màu `INK RED GOLD PAPER TEAL`; gác: `node tools/lab/stick2-qa.mjs <scene>` |
| `poses-sport.js` | 70 tư thế thể thao (lemo-opuscar pictogram, MIT) | `SPORT` (độ + dx/dy), `sport(name)` → tư thế radian + `dx`/`dy` (dời hông × chiều cao); dùng `{ ...P.stand, ...sport('javelin') }` |
| `morph.js` | chuyển cảnh | `shatter(g, paint, k, t, {cell, seed})` — cả cảnh vỡ thành ký hiệu; `drawMorph(g, A, B, k, t)` — hạt nổ rồi tụ; `squarePoints` |
| `mirror.js` | gương | `line()`, `reflectPoint`, `mirrorMatrix`, `foldMatrix(L, c)` (gập như tấm bìa; c < 0 = phản xạ thật), `clipSide`, `side`, `drawMirrorLine`, `drawReflected`, `tinted` |
| `stage.js` | sân khấu nền | `glyphFloor`, `horizonGlow`, `textRings`, `bokeh`, `floorPoint` |
| `fill.js` | chữ lớn ruột chữ nhỏ | `fillWord(g, word, x, y, {font, inner, innerFont, color, innerColor, drift})` |
| `typeobj.js` | chữ làm vật thể | `arcText`, `textOrb`, `textWall`, `textDissolve`, `textPlane` — `docs/TEXT-AS-OBJECT.md` |
| `crt.js` | khung sách "máy cũ" | `scanlines(g, a, {col})`, `crtOff(g, paint, k, {bg, line})` |
| `mosaic.js` | ảnh → lưới ký hiệu | `sampleGrid`, `drawMosaic`, `RAMP` (dùng bởi `mascot.grid`, `drawTransit`) |
| `draw.js`, `charts.js`, `hatch.js`, `backdrop.js` | bộ dựng hình 99-intro | xem chú thích từng file |
| `riso.js` | chất liệu in riso (add-it-up) | `new Riso({inks, paper}).init()`; `R.begin(g)`, `R.paper()`, `R.ink(name, paint)` (paint nhận context đã mang transform của g), `R.knock(paint, only)` (đục lỗ — riso không có mực trắng), `R.tint(ink, mật độ, ô)` (sắc nhạt = tram, không alpha), `R.flush({shake})` (in chồng multiply, lệch khuôn `MIS × (0.6+shake)`); `separate(img, {inks, cell})` → bản key/xanh/hồng/vàng/sil dựng MỘT lần; `printImage(R, P, cx, foot, h, {k, out, shadow, knock})` — vào 4 lượt in, ra xén dải |
| `sheets.js` | Show cho MV "trên giấy" | `new SheetShow(cfg)` (= Show, thêm `cfg.feed`): cảnh khai `feed` giây nạp giấy (0 = cắt cứng / nối liền), tự vẽ giấy + mực + flush; `pl.screen` = transform trước camera (vẽ lời cố định khi camera chạy) |
| `tape.js` | lời ba giọng bằng mực riso | `drawLine(R, line, t, {voice, x, y, px, rot, align, bg, shadow, exit})` — rap: băng giấy, cả câu; sung: nghiêng, từng từ; spoken: gõ ≤ 18 ký tự/s; ra bằng dao xén `sliced()`; `lyricTrack(R, tl, t, {from, to, style})`; `voiceOf(section)` |
| `lesson.js` | ống nối kit bài học (không DNA) | `lookup(tl, tag)` → `{L, w}`; `must(expr, want)` (số hoặc chuỗi), `fix(expr, d)`; `prog(t,a,b)` NÉM khi b < a (khác `lib.prog` không ném); `mk(w, h)` (ceil, ≥ 1); `loadImages(images, IM, {toCanvas})`; `CROP` (từ `assets/character-v2/crop.js`); `typeCues` — dùng bởi `templates/lesson/kit.js` |
| `sfx.js` | tiếng hiệu ứng (bài học) | `KINDS` (22 loại), `typeCues(s, a, b)`, `collectCues(plates, lead)` — `docs/lesson/SFX.md` |
| `render/shoot.js` | render | `--page` bắt buộc. `stills --page … --dur … --t a,b --outdir d`; `video --page … --dur … --from --to --audio --out`; `cues --page … --out f.json`; `check --page …` (chạy khô MỌI khung, mã 1 khi lỗi JS / `must`; `--hash bước` cho `tools/qa/lesson_golden.py`; cũng kiểm chuyển cảnh: FROM ≥ hết câu trước + 0.5 s, đọc `window.__intro.transitions`); `readcheck --page …` (chữ trên hình giữ ≥ ký tự/15 + 1.5 s; cảnh báo, `--strict` mã 1, `--minlen 3`); `video … --silent` (không tiếng) |

## 3. Bộ đệm — không dùng chung

Mỗi hàm vẽ-qua-bộ-đệm có bộ đệm RIÊNG; gọi lồng hai hàm khác nhau thì được, nhưng:
- `shatter()` có MỘT bộ đệm: không gọi `shatter` bên trong `paint` của một `shatter` khác, và trong cùng một khung
  không để hai cửa sổ `shatter` chồng nhau (cảnh vỡ thế giới cũ ở 0.3s đầu, thế giới mới ở 0.35s cuối — tách rời).
- `drawReflected`, `tinted`, `fillWord`, `crtOff` mỗi cái một bộ đệm.
- `shatter` bỏ qua ô có alpha < 60/255 — nét mờ hơn (đường quét CRT 0.08) phải vẽ NGOÀI `shatter` và tự giảm theo `1 − k`.

## 4. Lời chân khung — luật `footerPlan`

Mỗi cảnh gọi `footer(g, tl, t, keys, { from: this.t0, … })` (kit.js của project gắn bảng màu).
- Sang dòng mới: dòng trước VỠ 0.3s trong lúc dòng mới giải mã.
- Hai cảnh liền nhau không cùng vỡ một dòng: dòng bắt đầu trước `from` thuộc cảnh trước.
- `carry: true`: cảnh trước KHÔNG vỡ dòng của nó (cảnh nối liền) → cảnh này vỡ hộ.
- `at, dur`: cảnh này vỡ dòng đang hát ở lối ra của nó.
- Khoảng nghỉ > 0.6s sau dòng: dòng tắt (giới hạn đã biết — xem LESSONS §17).

## 5. Tất định — bốn nguồn đã gặp

| nguồn | chặn bằng |
|---|---|
| `Math.random`, đồng hồ | `hash(i)`, mọi thứ từ `t` |
| font chưa nạp khi cảnh đo chữ trong `init` | `Promise.all(document.fonts.load(...))` đủ mọi họ + cỡ trước `show.init()` |
| vòng xem trước (rAF) tranh canvas với renderer | `PREVIEW = !/headless/i.test(navigator.userAgent)` |
| trạng thái giải mã ảnh của Chrome | `toCanvas` mọi ảnh khi nạp (`mascot.js`, `face.js`) |

Kiểm MV: `tools/qa/determinism.sh <p> <t…>` (xuôi/ngược), `tools/qa/golden.sh check <p>` (cả bài, sau refactor) — hai
script này đọc `song.js` / `index.html`, KHÔNG chạy với bài học. Bài học: `node engine/render/shoot.js check --page
projects/<p>/p2.html` (chạy khô mọi khung), `python3 tools/qa/lesson_golden.py record|check <p>` (băm canvas cả bài →
`projects/<p>/golden.json`, có chụp ngược để kiểm tất định). Tra lời theo chữ: `tools/qa/lookups.py <p>` (MV: câu lặp
tra thiếu n — LESSONS §25; bài học: từ lặp trong `w(i, 'từ')` — §59).

## 6. Hiệu năng đã đo

riso (4 bộ đệm mực toàn khung + multiply + đục lỗ): ≈ 0.4s/khung một luồng, ≈ 2.2 khung/s mỗi luồng khi 6 luồng song
song (máy 20 nhân) — 233s @60fps ≈ 30 phút với `tools/render.sh full`. Tách màu 6 tư thế + 9 mặt khi nạp ≈ vài giây.

## 7. Cảnh bài học — hợp đồng

Video bài học không dùng `Show`. Mỗi trang (`projects/<p>/p1.html` trước intro, `p2.html` sau intro; khung ở
`templates/lesson/part.html`) tự nạp cảnh, tự chuyển cảnh và đưa ra `window.__intro` cho `shoot.js`. Cảnh mẫu:
`projects/en/intuition/plates/a0-open.js`; brief giao việc: `templates/lesson/BRIEF-PLATES.md`.

| thành phần | bắt buộc | ý nghĩa |
|---|---|---|
| `static ERA` | ✓ | chất liệu / nền (khoá của `kit.ERA`). Đổi ERA = chuyển cảnh loang; cùng ERA = chuyển cảnh của DNA |
| `static IMAGES` | | `{ key: './assets/…' }` — ảnh trang nạp trước `init` (đường dẫn tương đối trang) |
| `static POSES` | | tư thế mascot cần nạp (`assets/character-v2/cut/pose-<tên>.png`) |
| `init({ tl })` | ✓ | ĐỒNG BỘ. Tra mốc bằng `lookup(tl, tên)` → `L(i)` (câu i), `w(i, 'từ', n)`; gán `this.T` (mọi mốc từ chữ) |
| `START` | ✓ | gán trong `init`: `L(câu đầu).start` |
| `FROM` | ✓ | lúc cảnh bắt đầu hiện: `max(START − lead, KẾT cảnh trước + 0.5)`, lead 1.2 / 2.6 (mở hồi) — LESSONS §44, §64 |
| `CONTINUES` | | `true`: khung đầu = khung cuối cảnh trước → cắt thẳng, không tiếng (§50) |
| `TRANSITION` | | tiếng chuyển cảnh: tên `kind` để đổi, `null` để tắt (mặc định bên dưới) |
| `WIPE` | | `[x, y]` tâm vòng loang khi đổi ERA (mặc định giữa khung) |
| `sfx()` | | `[{ t, kind, db? }]`, `t` giờ TIMELINE (như `T`); `typeCues(chuỗi, a, b)` cho chữ gõ |
| `render(g, t)` | ✓ | THUẦN theo `t` = giây trong timeline của trang (0 = câu 0, có thể âm); tự tô nền toàn khung |

**Trang chọn cảnh.** `plates/<page>-order.js` export `ALL` (tên file cảnh); `?plates=a,b` chỉ nạp vài cảnh (chụp riêng,
chạy khô một nhóm). Cảnh xếp theo `FROM`; ở giờ trang `t`, `T = t − LEAD`, cảnh đang chạy = cảnh có `FROM` lớn nhất ≤ T.

**Chuyển cảnh** (0.9 s từ `FROM` của cảnh sau, trang lo — cảnh không tự vẽ chuyển cảnh): `CONTINUES` → cắt thẳng; khác
ERA → cảnh mới hiện trong vòng tròn loang từ `WIPE`; cùng ERA → cách của DNA viết trong trang (mẫu: nạp giấy — tờ cũ
trượt lên, mỗi cảnh clip vào ô của nó, độ dịch làm tròn, §47; intuition: màn nhung `kit.curtain` khép 0.45 s rồi mở).
Cảnh phải đẹp ở mọi `t ∈ [FROM, FROM cảnh sau + 0.9]`, kể cả trước `START`.

**Tiếng** (`engine/sfx.js collectCues`): mỗi chuyển cảnh tự có tiếng — cùng ERA `whoosh`, khác ERA `whoosh-long`,
`CONTINUES` im, `TRANSITION` ghi đè; cộng mọi `sfx()`; loại lạ → ném lỗi. Trang cộng `LEAD` để ra giờ trang.

**LEAD / TAIL** đọc từ `build.json` (`parts[]` có `page` trùng tên trang) — MỘT nguồn cho trang và `build.py`; lệch
LEAD là hình lệch tiếng cả phần. `DUR = LEAD + end câu cuối + TAIL`. Đổi lead/tail → đoạn hình cũ phải render lại.

**`window.__intro`** = `{ ready, frame(t), still(t), DUR, LEAD, cues, transitions, error }` — `shoot.js` (`video`, `stills`,
`cues`, `check`, `readcheck`) chỉ nói chuyện với trang qua đây.

**Kit của dự án** (`projects/<p>/kit.js`, chép từ `templates/lesson/kit.js` rồi thay theo DNA; ống nối không DNA import từ
`engine/lesson.js`) giữ đồ nghề chung:
`ERA`/`ground`, `lookup`, `prog` (ném lỗi khi b < a, §59), `must` (kiểm số trên hình — chỉ ở trạng thái đã xong, §70),
`figure` (mascot nửa thân, NÓI khi truyền `{ t }` — `engine/talk.js`), thẻ mục / thẻ hồi, và mọi vật dùng chung giữa các nhóm cảnh (§71). Plate không import plate.
