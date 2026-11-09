# Brief: dựng cảnh phần 2 của ja/chirality (「鏡の中の分子 ― 2026年ノーベル化学賞」)

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh Nhật **99の発見**. Lời đọc tiếng NHẬT đã thu;
mốc từng chữ là THẬT (`data/p2.timeline.json`, bản cuối). Hợp đồng cảnh: `docs/ENGINE.md` §7. Đọc theo thứ tự, đừng bỏ bước:

1. `projects/ja/chirality/DNA.md` — 「合わせ鏡」: MỘT gương bạc ở x = 930 trên bàn graphite; 左 hổ phách / 右 azure luôn
   đúng PHÍA gương. Bảng "hình theo từng phần" (§1) là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết. §2 màu,
   §3 chữ, §5 mascot, §7 camera, §8 ảnh, §9 CẤM, §10 tiếng.
2. `docs/CRAFT.md` §5–§6: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; liền mạch ở ranh giới cảnh.
3. `projects/ja/chirality/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/ja/chirality/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/ja/chirality/kit.js` — đọc HẾT (đầu file ghi các luật kit giữ bằng code; hàm nào ném lỗi khi nào).
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + ảnh `out/_lab/chirality/a0.jpg`; tờ thử kit `kit-test.html` + ảnh
   `out/_lab/chirality/kit/` (mọi hàm ở k = 0.25/0.5/0.75/1). Bàn thử gốc `tools/lab/awasekagami.html`
   (khung 0 = b2 CHFClBr, khung 1 = g2 mạng nhện — dựng lại ĐÚNG như vậy bằng hàm kit).
7. `data/lines.txt`: dòng `p2 i bắt-đầu kết-thúc từ|từ|từ` — từ đúng như `lookup` cần (unidic: trợ từ là từ riêng; ruby
   `{hiện|đọc}` là MỘT từ HIỆN: `w(i, '1848年')`, `w(i, '0.00005%')`).

## Hợp đồng một cảnh

File `projects/ja/chirality/plates/<tên>.js`, một mục `##` của SCRIPT.md = một file. Mẫu: `plates/a0-open.js` (cùng
cách import từ `../kit.js`, `static ERA`, `static POSES`, `init({ tl })` với `lookup(tl, '<tên>')`, `sfx()`, `render(g, t)`).
- **Mọi mốc lấy từ chữ** (`L(i)`, `w(i, 'từ', n)`) — không gõ giây tay. Từ LẶP trong câu → truyền n. Chạy
  `python3 tools/qa/lookups.py ja/chirality` và đọc TỪNG dòng "LẶP".
- **FROM = max(START − lead, KẾT cảnh trước + 0.5)**; lead 1.2 (thường) / 2.6 (mở hồi); KẾT = cột "kết" bảng dưới.
  Thẻ hồi: `actCard(g, t, FROM, START, n)` + `...actCues(FROM, START)` trong sfx() — không tự vẽ kicker, không ghi giây.
- **Chuyển cảnh** trang lo (`kit.transition`): cùng ERA → camera trượt xuyên gương (tiếng whoosh + shimmer tự có); khác ERA
  → lau từ tâm gương. Cảnh phải ĐẸP ở mọi t ∈ [FROM, FROM cảnh sau + 0.9], kể cả trước START. Đừng thêm tiếng ở FROM.
- ERA: `mirror` cho mọi cảnh, TRỪ `b1-pasteur` = `note` (đèn dầu 1848; `ground(g, 'note', t, { lamp })`).
- Gương: `mirror(g, {...})` — luôn x = 930, mọi cảnh vẽ (trừ khi đang zoom vào vật xa gương; khi đó gương vẫn trong khung).

## Luật kit giữ bằng code (vi phạm → ném lỗi; đừng lách)
- Chữ Nhật ≥ 28 px, trong vùng an toàn, không glyph thiếu: chỉ qua `write`/`telop`/`wrong`/`mismatch`/`nobelText`/`flipWrite`/
  `title`/`pane`/`photo`. KHÔNG `g.fillText` chữ trong cảnh. Ký hiệu toán (√ ≈ χ …) Shippori THIẾU → phần đó dùng `JP`.
- ✗ đỏ CHỈ qua `cross()` / `mismatch()` / `mirror({ crack })`; vàng CHỈ qua `nobel()` / `nobelText()`. 左/右 = `'@L'`/`'@R'`
  đặt ĐÚNG phía gương (左 bên trái x < 930, 右 bên phải).
- Phân tử CHỈ qua `molecule(g, key, …)` với key trong `MOLS`; bản gương = `mirror: true` cùng `rot`/`tilt`. Nhãn R/S do
  `stereo()`/`cip()` tính. Đừng tự vẽ quả cầu nguyên tử.
- Ảnh CHỈ qua `photo(g, key, …)` (nhãn + credit tự vẽ; soai ≤ 160 px cao). Không ảnh nạn nhân thalidomide.
- Mascot CHỈ qua `figure(g, pose, cx, foot, h, k, { t })`; ném lỗi nếu thân đè gương. Chỉ tư thế trong `mouths.js` nói.
- Zoom chỉ qua `zoom(g, z, fx, fy)` (≤ 1.6) trong save/restore.

## Bảng nhóm (chỉ số câu p2 = bản CUỐI, khớp `data/lines.txt`, 2026-10-13)

| nhóm | cảnh (file) | câu | bắt đầu – kết (s) | mở hồi | CONTINUES? | mascot |
|---|---|---|---|---|---|---|
| G1 | `b1-pasteur` | 0–11 | 1.0 – 71.9 | 1 — mở từ ĐEN (sau intro): `dark` + đèn dầu hiện dần từ FROM, gương sáng lên (DNA §6) | không | — |
| G1 | `b2-te` | 12–21 | 73.6 – 134.0 | — | không | — |
| G2 | `c1-seimei` | 22–26 | 136.7 – 168.7 | 2 | không | — |
| G2 | `c2-nioi` | 27–31 | 170.4 – 195.7 | — | không | — |
| G2 | `c3-thalido` | 32–41 | 198.2 – 265.0 | — | không | — |
| G3 | `d1-heimen` | 42–47 | 267.6 – 299.7 | 3 | không | — |
| G3 | `d2-shokubai` | 48–55 | 301.4 – 358.4 | — | không | — |
| G4 | `e1-frank` | 56–63 | 361.4 – 415.1 | 4 | không | — |
| G4 | `f1-chokusen` | 64–67 | 417.9 – 441.6 | 5 | không | — |
| G4 | `f2-kagan` | 68–71 | 443.7 – 467.5 | — | **có thể** — nếu f2 mở bằng ĐÚNG đồ thị cuối f1 rồi điểm lệch lên | — |
| G4 | `f3-dance` | 72–82 | 469.5 – 542.7 | — | không | — |
| G5 | `g1-soai` | 83–91 | 545.3 – 601.0 | 6 | không | — |
| G5 | `g2-cobweb` | 92–102 | 602.8 – 666.0 | — | không | `pointer` (`talk: false`, que chỉ đồ thị, mép TRÁI) |
| G5 | `g3-hyakuman` | 103–108 | 667.8 – 702.9 | — | không | — |
| G6 | `h1-coin` | 109–112 | 706.3 – 726.5 | 7 | không | `coin-flip` (`talk: false`) |
| G6 | `h2-hanbun` | 113–119 | 728.6 – 777.4 | — | không | — |
| G6 | `i1-me` | 120–127 | 780.3 – 824.9 | 8 | không | `ponder` (nói, 「意外かもしれませんが」) |
| G7 | `j1-matome` | 128–135 | 827.5 – 879.2 | 9 | không | — |
| G7 | `j2-next` | 136–138 | 881.9 – 901.9 | — | không | `wave` (nói); biển 「99の発見」+「チャンネル登録」 GIỮA khung, đứng yên ≥ 4 s tới hết (`telop`) |

Mối nối giữa hai nhóm: cảnh SAU sở hữu FROM; KHÔNG đặt CONTINUES qua hai nhóm. "Có thể" = chỉ `CONTINUES = true` khi khung
đầu TRÙNG khung cuối cảnh trước (§50, §90). Mascot: mỗi lần 3–8 s quanh đúng câu, một bên khung (cx ≤ 380 hoặc ≥ 1540),
chân chạm đáy, chữ ở nửa kia, không đè gương.

**Vật dùng chung** (§71, §83) — vẽ lại ĐÚNG bằng hàm kit, không tự vẽ bản thứ hai:
- gương `mirror` (mọi cảnh) · `crystal` (b1 → d2: DIOP từ 酒石酸 — tinh thể b1 quay lại) · `hand`/găng tay (a0 → c1 thụ thể
  → d2 xúc tác) · `tube` (a0 → d1) · `molecule` CHFClBr (b2 = khung lab 0) · `graph` (f1 → f2 → g2 → h2 → i1; trục, đường
  thẳng, cong, mạng nhện — CÙNG `oy/pw/ph` mặc định của kit) · ba ô Frank `panes({ texts: FRANK, tick })`: e1 đánh dấu ①,
  f3 đánh dấu ②, g1 đánh dấu ③ (ô cũ giữ ✓) · ba ô câu hỏi `panes({ texts: QUESTIONS, flip, backs })` ở j1 lật ra câu trả
  lời (rút từ まとめ trong SCRIPT, ≤ 16 chữ mỗi ô) · `coin` (h1, h2, j2) · `nobel` (j1 nếu cần) · `photo` (b1 pasteur-21,
  pasteur-crystals, polarimeter; b2 kelvin; c3 kevadon; d2 kagan; g1 soai).
- Hằng: `MODEL`, `iterate`, `f` (mô hình — luôn nhãn 「モデル」), `SOAI_1995`, `SOAI_2003` (số THÍ NGHIỆM — nhãn 「実験」).
- Thiếu vật → hàm cục bộ trong file cảnh + BÁO đạo diễn. KHÔNG import cảnh khác, KHÔNG sửa kit.js (cần sửa → báo).

## Hình bám lời (kênh Nhật)
- **≤ 3 s không có テロップ / vật mới** (§96): mỗi câu ≥ 1 thay đổi bám đúng TỪ được đọc; câu dài thì thêm vật giữa câu.
  Camera trôi / phân tử tự xoay không tính là thay đổi.
- **Phần tử chính hiện từ FROM + 0.3** (khung đầu không trống). Kết luận viết xong TRƯỚC câu cuối của cảnh.
- Tiêu đề cảnh: `title(g, '<tên mục>', t, a)` (chữ ngược gương rồi lật). テロップ ngắn: từ khoá, số, công thức.
- Vật rời khung bằng chuyển động; không `if (t < mốc) vẽ()` cắt cứng. Mỗi khung MỘT ý chính.
- Gạch hiểu lầm: `wrong` + `strike`, chữ đúng NGAY DƯỚI (DNA §1: d1 「いつも半分ずつ？」→「ほぼ同じ数」, f2 「一本の直線」→ cong,
  c3 「安全な方だけなら？」→「入れかわる」).
- Thalidomide (c3): điềm tĩnh, không hình người; số bằng chữ + chấm đếm.

**Toán / số.** Mọi số lên hình tính bằng code + `must` ở trạng thái ĐÃ XONG (§70); làm tròn theo hướng an toàn và `must`
chính chuỗi hiện (§94): 0.75² = 56%, 2·0.75·0.25 = 38%, 0.25² = 6%, 56:6 → 90:10, mô hình 2→4→8→16→31→56→86→99,
C(100,50)/2¹⁰⁰ ≈ 8%, 19 + 18 = 37, 0.00005% ↔ 1 / 2 000 001. Số thí nghiệm (2/10/57/81/88; 57/99/>99.5; 15%→95% KHÔNG còn
trong lời — đừng vẽ) chỉ chép từ kit/CONTENT.

**Tất định.** Không `Math.random` / `Date.now` / `performance.now` (→ `hash(i)`); không `ctx.filter` trong render.

## Tiếng (DNA §10 — DÀY: mỗi cảnh thời lượng ÷ 4 ≤ số tiếng ≤ thời lượng ÷ 2.5; MỖI テロップ một tiếng, khớp nghĩa)

Dùng `cue(t, 'tên-nghĩa')` của kit (SND): `mol`/`crystal`/`tube`/`glass` → glass · `tweezers`/`web` → tick · `telop` → pop ·
`photo`/`page` → page · `match` → correct · `mismatch` → error · `crack` → crack · `frank`/`nobel` → suzu · `web99` → shimmer
· `coin` → coin. Không hai tiếng trong 0.25 s; không tiếng cho chuyển động phụ. Báo số đã dùng theo loại
(`node engine/render/shoot.js cues --page "projects/ja/chirality/p2.html?plates=<cảnh,…>" --out out/_lab/chirality/<nhóm>-cues.json`).

Hạn mức loại hiếm — hàng của nhóm bạn (cộng cả video = trần):

| nhóm (cảnh) | crack | error | correct | suzu | coin | impact (ngoài actCues) |
|---|---|---|---|---|---|---|
| a0 (đạo diễn, đã dùng) | 1 | 0 | 0 | 2 | 0 | 0 |
| G1 b1 b2 | 1 (b2 không khớp) | 1 | 1 | 0 | 0 | 0 |
| G2 c1 c2 c3 | 0 | 1 (găng sai tay) | 1 | 0 | 0 | 0 |
| G3 d1 d2 | 0 | 1 (「いつも半分？」) | 1 | 1 (2001 Nobel) | 0 | 0 |
| G4 e1 f1 f2 f3 | 0 | 1 (「直線」) | 1 | 2 (ô ①, ô ②) | 0 | 0 |
| G5 g1 g2 g3 | 0 | 0 | 1 | 2 (ô ③, もっとも美しい) | 0 | 0 |
| G6 h1 h2 i1 | 0 | 0 | 0 | 0 | 6 | 0 |
| G7 j1 j2 | 1 (gương hạ xuống) | 0 | 1 | 1 | 1 | 0 |
| **TỔNG** | **3** ≤ 4 | **4** ≤ 5 | **6** ≤ 6 | **8** ≤ 10 | **7** ≤ 8 | **0** |

(§51, §55, §66, §99. Sau khi gộp, đạo diễn đếm lại bằng `shoot.js cues`.)

## Kiểm trước khi báo xong
1. `node engine/render/shoot.js check --page "projects/ja/chirality/p2.html?plates=<cảnh của bạn>"` → mã 0.
2. Chụp mỗi cảnh: khung ở FROM+0.3, mỗi câu một khung (giữa câu), START−0.6, KẾT+1.2. **`--t` là giờ TRANG = giờ timeline
   + LEAD (p2 +3.0, p1 +0.6 — build.json)**; truyền thẳng giây timeline là chụp sớm 3 s (review 2026-10-13):
   `node engine/render/shoot.js stills --page "projects/ja/chirality/p2.html?plates=<cảnh>" --t … --outdir out/_lab/chirality/<cảnh>`
   rồi `python3 tools/qa/sheet.py out/_lab/chirality/<cảnh> out/_lab/chirality/<cảnh>.jpg`. MỞ ảnh ở độ phân giải gốc, sửa đến
   khi không còn: chữ chạm mép / đè mascot / chồng chữ / đè gương, khung trống, > 3 s không có gì mới, số sai.
3. `python3 tools/qa/lookups.py ja/chirality` — không còn "LẶP" chưa xử lý ở cảnh của bạn.
4. Không sửa file ngoài `plates/<cảnh của bạn>.js` (và ảnh trong `out/_lab/`). KHÔNG commit. KHÔNG `pkill -f`/`killall`
   (LESSONS §19, §98) — dừng tiến trình theo PID. Đừng sửa `p2-order.js` (đạo diễn điền).

## Báo cáo (≤ 15 dòng, tiếng Việt)
File, đường dẫn tờ ảnh, số tiếng theo loại từng cảnh, CONTINUES đã đặt (nếu có), thứ cần gom vào kit, chỗ còn băn khoăn.
