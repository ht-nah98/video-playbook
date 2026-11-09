# Brief: dựng cảnh ja/hikari (「なぜ世界は見えるのか ― 光の正体」)

Bạn dựng MỘT NHÓM cảnh (G1…G7, ghi trong lời giao việc) cho video bài học kênh Nhật **99の発見**. Lời đọc tiếng NHẬT đã thu;
mốc từng chữ là THẬT (`data/p1.timeline.json`, `data/p2.timeline.json`). **Một lượt đọc lại (redo) đang chạy song song: vài
câu có thể dời 0.1–2 s** — chỉ số câu và chữ KHÔNG đổi, nên mọi mốc phải tra bằng chữ (`L(i)`, `w(i, 'từ', n)`); một con số
giây gõ tay là lệch sau redo. Hợp đồng cảnh: `docs/ENGINE.md` §7. Đọc theo thứ tự, đừng bỏ bước:

1. `projects/ja/hikari/DNA.md` — 「節穴の暗室」: một phòng Nhật tối đóng 雨戸, ánh sáng chỉ vào qua một LỖ ở tường trái (x 0–92);
   không gì hiện ra cho tới khi ánh sáng chạm tới nó. §1 lỗ theo từng hồi, §2 MÀU = ÁNH SÁNG, §3 chữ, §5 mascot, §7 camera,
   §8 ảnh, §9 CẤM, §10 tiếng, §11 vật chung, §12 bảng cảnh (ý đạo diễn — theo nó, chi tiết tự quyết).
2. `docs/CRAFT.md` §5–§6: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; liền mạch ở ranh giới cảnh.
3. `projects/ja/hikari/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/ja/hikari/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây (bảng "Đúng — giữ nguyên", "Hình cần đúng").
5. `projects/ja/hikari/kit.js` — đọc HẾT (đầu file ghi luật kit giữ bằng code; hàm nào ném lỗi khi nào).
6. Khung phong cách = tờ thử kit, chạy THẲNG trên kit: `kit-test.html` + `BRIEF-LAB.md` + ảnh `out/_lab/hikari/sf/`
   (sf1 = a0, sf2 = e1, sf3 = f3 — dựng lại ĐÚNG như vậy bằng hàm kit), tờ kit ở k = .25/.5/.75/1 `out/_lab/hikari/lab-kit-sheet.jpg`.
   Cách viết một file cảnh (import, `static`, `init`, `sfx`, `render`): `projects/ja/chirality/plates/b1-pasteur.js` (KHÁC kit —
   chỉ mượn cấu trúc, không mượn hàm).
7. `projects/ja/hikari/data/lines.txt`: dòng `p2 i bắt-đầu kết-thúc từ|từ|…` — từ đúng như `lookup` cần (unidic: trợ từ là từ
   riêng; ruby `{hiện|đọc}` là MỘT từ HIỆN: `w(0, '2000年')`; chữ Latin viết THƯỜNG: `'led'`, `'wi-fi'`, `'x線'`, `'uvb'`, `'dna'`;
   `ガンマ線` là một từ ở câu 76, 77 nhưng `ガンマ|線` hai từ ở câu 75, 78). Tệp sinh từ timeline lượt 1 — đạo diễn sinh lại sau
   redo (giờ có thể đổi, từ thì không).
8. `projects/ja/hikari/assets/history/INDEX.md`: ảnh có sẵn (key, cỡ, nhãn) — nạp bằng `static IMAGES = imgs('key', …)`.

## Hợp đồng một cảnh

File `projects/ja/hikari/plates/<tên>.js` (tên ở bảng dưới), một mục `##` của SCRIPT.md = một file. Cấu trúc như mẫu chirality:
import từ `../kit.js`, `static ERA`, `static IMAGES`, `static POSES`, `init({ tl })` với `lookup(tl, '<tên>')`, `sfx()`, `render(g, t)`.
- **Mọi mốc lấy từ chữ** (`L(i).start/.end`, `w(i, 'từ', n)`). Từ LẶP trong câu → truyền n. Chạy `python3 tools/qa/lookups.py ja/hikari`
  và đọc TỪNG dòng "LẶP" (công cụ chỉ thấy lời gọi dạng `w(<số>, '<từ>'[, n])` nháy ĐƠN).
- **FROM = max(START − lead, KẾT cảnh trước + 0.5)**; lead 1.2 (thường) / 2.6 (mở hồi); KẾT = `L(câu cuối cảnh trước).end`
  (tra bằng `L(i)` trong `init` của bạn — cảnh trước KHÔNG được import). Ngoại lệ: `b1` FROM = START − 2.6 (cảnh đầu p2);
  `a0` FROM = −0.5 (p1, LEAD 0.6: trang mở trong bóng tối).
- **Thẻ hồi**: `actCard(g, t, FROM, START, n)` + `...actCues(FROM, START)` trong `sfx()`; tiêu đề cảnh mở hồi
  `title(g, '<tên mục>', t, actTimes(FROM, START).o1 − 0.2, { act: n })`. Không tự vẽ kicker, không ghi giây.
- **Tiêu đề cảnh thường**: `title(g, '<tên mục>', t, FROM + 0.3)` — tên mục ĐÚNG như `##` trong SCRIPT (cột "tiêu đề" bảng dưới).
  Tiêu đề chiếm góc trên trái (x 140 → ~900, y 74–190): nội dung không vào ô đó. `h2` (nền ngày) KHÔNG dùng `title` (chữ sáng).
- **Chuyển cảnh trang lo** (`p1.html`/`p2.html` gọi `kit.transition`, 0.9 s từ FROM): cùng ERA → 雨戸 khép (0.45 s) rồi mở, tiếng
  `amado` tự có; khác ERA → vòng sáng mở từ LỖ (`cur.WIPE` hoặc `APT`), tiếng `whoosh-long` tự có. `CONTINUES = true` → cắt
  thẳng, im (chỉ khi khung đầu TRÙNG khung cuối cảnh trước — §50, §90). Đừng thêm tiếng ở FROM. Cảnh phải ĐẸP ở mọi
  t ∈ [FROM, FROM cảnh sau + 0.9], kể cả trước START. Trang tự phủ `grain` cuối mỗi khung — cảnh KHÔNG gọi `grain`.
- `render(g, t)` tự tô nền toàn khung: `ground(g, <ERA>)` trước tiên. `t` = giây timeline của trang (như `T`).

## Luật kit giữ bằng code (vi phạm → ném lỗi; đừng lách)

- Chữ chỉ qua `write`/`telop`/`wrong`/`title`/`actCard`/`promiseCards`/`photo`/`pow10` — KHÔNG `g.fillText`. Chữ Nhật ≥ 28 px; hộp chữ
  trong vùng an toàn; font thiếu ký tự → ném lỗi: **Noto thiếu ⁰ ⁵–⁹ ⁻ ₀–₃ ✗**; **Shippori (`mincho`) thiếu thêm λ ν γ ⊥ ≈ ∝ μ ℏ θ π ∞ ≠ √
  ℃ ✓** → ký hiệu toán dùng Noto (mặc định của `telop`); luỹ thừa 10 → `pow10()`; ✓ → `tick()`, ✗ → `cross()`.
- **Màu có sắc CHỈ là ánh sáng**: `wl2rgb`/`wlCss`/`ray`/`shaft`/`spot`/`photon`/`wave`/`chip`/`spectrumStrip`/`specRuler`/`surfaceRgb`/`apple`.
  Chữ, khung, mũi tên, ①②③④, ✓ ✗, khoanh = trung tính (`ink()` ném lỗi khi nhận hex có sắc). Nhãn KHÔNG mang màu phổ → `chip(nm)` cạnh nhãn.
- **Sóng KHÔNG thấy được** (電波, マイクロ波, 赤外線, 紫外線, X線, ガンマ線) vẽ nét TRUNG TÍNH ('@dim'/'@ink', ≥ 4 px, không 'lighter', không
  quầng) — chỉ ánh sáng thấy được mới phát sáng qua `ray`/`wave`/`photon`. Ánh trắng = `nm: 'white'`.
- `ray()` w ≥ 4; `zoom()` ≤ 1.6 trong save/restore; `photo()` key trong `PHOTOS`, nạp qua `imgs()`, tôn trọng `maxH`, nhãn + credit kit tự vẽ.
- Mascot CHỈ qua `figure(g, pose, cx, foot, h, k, { t })`; ném lỗi nếu đè tường 雨戸 (x < 92). Tư thế NÓI: ponder, point, ok, wave
  (`mouths.js`); startled/pointer im (`talk: false`). `data/p*.mouth.json` chưa có (redo đang chạy) → mascot im lúc thử là bình thường.
- Gạch hiểu lầm: `wrong(...)` → `strike(g, hộp, k)` → chữ đúng NGAY DƯỚI bằng `telop`. KHÔNG đỏ (đỏ là một bước sóng).
- Chữ đặt trên vùng sáng (trong chùm, trên dải phổ) → `plate()` tối sau chữ. Ánh sáng chồng lên chữ là lỗi.

## Bảng cảnh và nhóm (chỉ số câu = `data/lines.txt`; giây = timeline lượt 1, 2026-10-14 — chỉ để ƯỚC, đừng chép vào code)

`dur` = FROM cảnh sau − FROM cảnh này (cảnh cuối trang: + TAIL). **`--t` của `shoot.js` là giờ TRANG = giờ timeline + LEAD
(p1 +0.6, p2 +3.0 — build.json)** (§102); cột "FROM trang" đã cộng sẵn. Tiếng: `⌈dur ÷ 4⌉ ≤ số tiếng ≤ ⌊dur ÷ 2.5⌋`, đếm MỌI cue có
giờ trang ∈ [FROM trang, FROM trang cảnh sau) — kể cả tiếng chuyển cảnh tự có và `actCues`.

| nhóm | cảnh (file) | trang | câu | tiêu đề (= `##`) | ERA | hồi | START–KẾT (tl) | FROM tl / trang | dur | tiếng | CONTINUES? | mascot |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 | `a0-open` | p1 | 0–12 | (không tiêu đề) | darkroom | — | 0.52–67.42 | −0.5 / 0.1 | 68.9 | 18–27 | — | `ponder` (nói), `point` (nói) |
| G2 | `b1-me-kara` | p2 | 0–3 | 目から光が出る？ | darkroom | 1 | 0.22–25.64 | −2.38 / 0.62 | 28.6 | 8–11 | không (mở từ ĐEN) | — |
| G2 | `b2-ukeru` | p2 | 4–6 | 目は受け取るだけ | darkroom | — | 27.40–51.97 | 26.20 / 29.20 | 26.6 | 7–10 | không | — |
| G2 | `b3-tsubu-nami` | p2 | 7–11 | 粒か、波か | darkroom | — | 54.01–85.43 | 52.81 / 55.81 | 33.3 | 9–13 | không | — |
| G2 | `b4-young` | p2 | 12–17 | ヤングの縞模様 | darkroom | — | 87.27–127.21 | 86.07 / 89.07 | 41.6 | 11–16 | không | — |
| G3 | `c1-denjiha` | p2 | 18–22 | 何が揺れているのか | lab | 2 | 130.11–157.07 | 127.71 / 130.71 | 29.9 | 8–11 | không | — |
| G3 | `c2-kouden` | p2 | 23–28 | 光電効果の謎 | lab | — | 158.79–195.13 | 157.59 / 160.59 | 38.4 | 10–15 | không | `startled` (im) |
| G3 | `c3-einstein` | p2 | 29–40 | アインシュタインの光の粒 | lab | — | 197.23–284.74 | 196.03 / 199.03 | 89.2 | 23–35 | không | — |
| G4 | `d1-kaidan` | p2 | 41–48 | エネルギーの階段 | lab | 3 | 287.34–329.99 | 285.24 / 288.24 | 45.8 | 12–18 | không | — |
| G4 | `d2-aoi-led` | p2 | 49–53 | 青い光の段差 | lab | — | 332.27–365.39 | 331.07 / 334.07 | 34.8 | 9–13 | không | — |
| G4 | `d3-netsu` | p2 | 54–59 | 熱く光る | lab | — | 367.09–401.76 | 365.89 / 368.89 | 36.4 | 10–14 | không | — |
| G5 | `e1-hitonigiri` | p2 | 60–61 | ほんの一握り | darkroom | 4 | 404.84–417.13 | 402.26 / 405.26 | 15.6 | 4–6 | không | `pointer` (im) |
| G5 | `e2-denpa` | p2 | 62–68 | 電波とマイクロ波 | darkroom | — | 419.03–471.73 | 417.83 / 420.83 | 54.8 | 14–21 | không | — |
| G5 | `e3-sekigai-shigai` | p2 | 69–73 | 赤外線と紫外線 | darkroom | — | 473.85–514.43 | 472.65 / 475.65 | 42.3 | 11–16 | **có thể** (thước đỗ, chỉ dấu dải dời) | — |
| G5 | `e4-x-gamma` | p2 | 74–84 | エックス線とガンマ線 | darkroom | — | 516.13–582.79 | 514.93 / 517.93 | 68.4 | 18–27 | **có thể** (như e3) | — |
| G6 | `f1-kussetsu` | p2 | 85–88 | 屈折 | darkroom | 5 | 585.59–615.60 | 583.29 / 586.29 | 33.1 | 9–13 | không | — |
| G6 | `f2-hodoku` | p2 | 89–94 | 白い光をほどく | darkroom | — | 617.62–649.07 | 616.42 / 619.42 | 33.1 | 9–13 | không | — |
| G6 | `f3-niji` | p2 | 95–101 | 虹 | sky | — | 650.77–700.62 | 649.57 / 652.57 | 52.0 | 13–20 | không | — |
| G6 | `f4-nanairo` | p2 | 102–104 | 虹は七色？ | sky | — | 702.75–721.59 | 701.55 / 704.55 | 20.7 | 6–8 | không | — |
| G6 | `f5-sora` | p2 | 105–112 | 空はなぜ青い | sky | — | 723.41–768.91 | 722.21 / 725.21 | 47.2 | 12–18 | không | — |
| G7 | `g1-ringo` | p2 | 113–114 | リンゴの赤 | darkroom | 6 | 771.49–787.95 | 769.41 / 772.41 | 19.1 | 5–7 | không | — |
| G7 | `g2-kamera` | p2 | 115–122 | 目というカメラ | eye | — | 789.75–836.96 | 788.55 / 791.55 | 48.9 | 13–19 | không | — |
| G7 | `g3-retinal` | p2 | 123–128 | 光が化学に変わる瞬間 | eye | — | 838.70–882.03 | 837.50 / 840.50 | 45.3 | 12–18 | **có thể** (mở bằng ĐÚNG khung cuối g2) | — |
| G7 | `g4-atama` | p2 | 129–131 | 色は頭の中にある | eye | — | 883.98–904.67 | 882.78 / 885.78 | 22.4 | 6–8 | không | `ok` (nói) |
| G1 | `h1-matome` | p2 | 132–135 | まとめ | darkroom | 7 | 907.11–933.64 | 905.17 / 908.17 | 29.0 | 8–11 | không | — |
| G1 | `h2-next` | p2 | 136–138 | (không `title`) | day | — | 935.38–953.69 | 934.18 / 937.18 | 21.5 | 6–8 | **CÓ** (bắt buộc — xem h2) | `wave` (nói) |
| | **TỔNG** | | | | | | | | **1026.9** | **271–396** | | |

| nhóm | cảnh | thời lượng | tiếng (dưới–trên) | ghi chú |
|---|---|---|---|---|
| G1 | a0 + h1 + h2 | 119.4 s | 32–46 | hai đầu bài dùng CHUNG thẻ hứa ①–④ (hỏi ở a0, lật ra đáp ở h1) và bàn táo |
| G2 | b1 b2 b3 b4 | 130.1 s | 35–50 | hồi 1 |
| G3 | c1 c2 c3 | 157.5 s | 41–61 | hồi 2; c3 dài nhất bài (89 s, 12 câu) |
| G4 | d1 d2 d3 | 117.0 s | 31–45 | hồi 3 |
| G5 | e1 e2 e3 e4 | 181.1 s | 47–70 | hồi 4; MỘT thước phổ cho cả nhóm; e4 có cú "lao vào khe" |
| G6 | f1 f2 f3 f4 f5 | 186.1 s | 49–72 | hồi 5; f3 dựng từ sf3 có sẵn, f4 ngắn |
| G7 | g1 g2 g3 g4 | 135.7 s | 36–52 | hồi 6 |

Lượt chạy (≤ 4 agent cùng lúc): **lượt 1** G3, G5, G6, G2 (dài nhất) · **lượt 2** G7, G1, G4.
Mối nối giữa hai nhóm: cảnh SAU sở hữu FROM; mọi mối nối giữa nhóm là chuyển cảnh trang (雨戸 / vòng sáng) — KHÔNG đặt `CONTINUES`
qua hai nhóm. "Có thể" = chỉ đặt `CONTINUES = true` khi khung đầu TRÙNG pixel khung cuối cảnh trước (cùng nhóm, so bằng ảnh).

## Vật dùng chung (§44, §71) — vẽ lại ĐÚNG bằng hàm kit với ĐÚNG tham số dưới đây, không tự đặt bản thứ hai

| vật | tham số chuẩn | cảnh dùng |
|---|---|---|
| LỖ | `aperture(g, kind, { y })` ở `APT` (x 92, y 360) — trừ a0 y = 300 (sf1). Lỗ theo hồi = DNA §1: knot (a0, b1–b3), lamps (b2), double (b4, `gap` 90), slit (c1–d3, e2–e4 khi cần), window (f1, f2), pupil (g1–g4), slit ×4 (thẻ hứa, `promiseCards` tự vẽ) | MỌI cảnh trừ f3–f5 (sky: 雨戸 mở — vẽ khung cửa mở thay lỗ) và h2 (day) |
| BÀN TÁO | `chabudai(g, 1150, 880, 380, { lit })` + `apple(g, 1150, 812, 50, { illum, lit })`, luồng `shaft(g, APT.x, ay, 975, 872, 1315, 872, …)` (sf1) | a0, g1 (mở bằng đúng bàn này, ay = 360) |
| THẺ HỨA | `promiseCards(g, { k, lit, flip, t })` để MẶC ĐỊNH (x 980, w 844, y0 230, h 150, gap 36, size 40); chữ `QUESTIONS`/`ANSWERS` của kit | a0 (hiện), h1 (lật) — cùng G1 |
| DẢI CHUẨN | `spectrumStrip(g, 360, y, 1200, 64, { ticks: [400, 500, 600, 700], … })` → x = 360 + 3·(nm − 380): 400→420, 544→852, 589→987, 656→1188, 700→1320 | c2 (ngưỡng), d1 (vạch H/Na/Ne), d3 (liên tục), f4, g2 (trục đường nhạy — cùng ánh xạ x) |
| THƯỚC | e1 = sf2: `specRuler(g, { y: 600, h: 64, window, dim: 0.15 })`, dải nở `spectrumStrip(g, 560, 330, 800, 60, …)`; **đỗ** (e2–e4): `specRuler(g, { y: 846, h: 48, window: 1 })` (nhãn dải y 824, số mũ y 952; nội dung e2–e4 ở y 200–790) | G5; h1 mini (`R` hẹp, `labels: 0, pows: 0`) |
| PHOTON | đỏ `PH_RED = 700` nm (`fmt(eV(700), 2)` = '1.77'), tím `PH_VIO = 400` nm (`fmt(eV(400), 1)` = '3.1', `must` trong cảnh); bó `photon(g, x, y, nm, { size: 70 })` | c2, c3, h1 mini |
| THANG | `ladder(g, {})` mặc định kit (x 360, w 420, y0 230, sc 150, gap 150) + `ladderDrop` | d1; h1 mini (`sc` nhỏ, `labels: false`) |
| MẮT | lớn `eye(g, 760, 540, 340, …)`, nhỏ `eye(g, 360, 560, 200, …)` | g2 (lớn → nhỏ), g3, g4 (nhỏ); h1 mini |
| BA TÍN HIỆU | thanh S/M/L của táo tính trong g2 (đường nhạy cục bộ × `APPLE`), `must` L > M > S; g4 vẽ lại cùng tỉ lệ | g2, g4 (cùng G7) |
| CẦU VỒNG TRÒN | cung đỏ NGOÀI, tím TRONG; bán kính tỉ lệ `descartes(656).theta : descartes(404.7).theta`; màu `wlCss` (trên nền ngày: nét `source-over`, KHÔNG `ray` — 'lighter' cháy trắng trên nền sáng) | f3, h2 |
| ẢNH | `alhazen-hevelius` b2 · `newton`, `huygens` b3 · `young`, `young-fig442` (≤ 380) b4 · `maxwell` (≤ 640) c1 · `einstein-1921` c3 · `tube-h`, `tube-ne`, `sodium-street`, `spectrum-na` d1 · `mimulus-uv` e3 · `newton-crucis` f2 · `rainbow-double` f3 · `sodium-cars` g1 | mỗi ảnh một cảnh, như cột trái |

Thiếu vật → hàm cục bộ trong file cảnh + BÁO đạo diễn. KHÔNG import cảnh khác, KHÔNG sửa `kit.js` / `p*.html` / `p*-order.js`.

## Chuỗi khoa học phải nhất quán QUA MỌI CẢNH (§103) — người soát lần theo từng dòng

1. **Trục bước sóng** luôn NGẮN → DÀI từ trái sang phải: tím trái, đỏ phải (dải 380–780, thước log 10⁻¹² m trái → 10³ m phải,
   trục đường nhạy S/M/L). Không trục λ nào chạy ngược, không trục dọc.
2. **Ngắn = năng lượng lớn = tím/lam**: photon tím 400 (3.1 eV) đẩy electron ra, đỏ 700 (1.77 eV) không (c2, c3) = bậc rơi lớn cho
   vạch tím 410, bậc nhỏ cho đỏ 656 (d1) = LED lam cần bậc LỚN nhất (d2) = tím/lam cong NHIỀU nhất trong lăng kính (f2) = VÒNG TRONG
   cầu vồng ~40° (f3) = tán xạ MẠNH hơn (f5) = 紫外線 làm hại DNA / phân tử (e3, e4). Đỏ: ngược lại toàn bộ (cong ít, vòng ngoài ~42°,
   tán xạ ít, đi thẳng lúc hoàng hôn).
3. **Đỏ ngoài 42° / tím trong 40°** (cầu vồng chính); 副虹 ở NGOÀI, thứ tự màu ĐẢO (`descartes(nm, 2)`). Số trên hình: 「およそ42°」
   「およそ40°」 (số nguyên như SCRIPT) — không in 42.4 / 40.6.
4. **Táo phản xạ bước sóng DÀI** (`APPLE`: hấp thụ ngắn + giữa) → dưới natri (một vạch 589) táo TỐI (`surfaceRgb`, kit đã `must`);
   táo kích thích nón L mạnh, M ít, S ≈ 0; **nón L nhạy nhất ở VÀNG LỤC 564 nm, không phải đỏ** (CONES). "Đỏ" chỉ ở trong đầu (g4).
5. **Màu phổ chỉ qua `wl2rgb`** (và các hàm kit gọi nó); ánh trắng = tổng mọi sợi; sóng không thấy = xám trung tính.
6. **Ánh sáng luôn đi từ LỖ ở tường trái sang phải** (chùm, tia vào giọt mưa, tia vào mắt — đồng tử ở trái).
7. **Giao thoa** (b4): đỉnh + đỉnh = sáng, đỉnh + đáy = tối; cường độ vân `cos²` tính bằng code, không vẽ tay.

**Số không lên hình** (không có trong CONTENT hoặc lời cố ý né): tên kim loại của quang điện (lời: 「ある金属」) → không ghi
"ナトリウム", "2.28 eV", "544 nm" ở c2/c3 (vạch ngưỡng vẽ ở `NA_EDGE` nhưng nhãn bằng chữ); Δy = 5.2 mm của vân Young; 26 tuổi;
1.5 triệu K…; mọi số khác: chỉ hằng của kit (`SUN_S`, `RAYLEIGH`, `VIS_FRAC`, `LAMBDA`, `eV`, `CONES`, `descartes`) hoặc CONTENT.

## Hình bám lời (kênh Nhật)

- **≤ 3 s không có テロップ / vật mới** (§96): mỗi câu ≥ 1 thay đổi bám đúng TỪ được đọc; câu dài (> 6 s) thêm vật giữa câu.
  Bụi trôi / sóng tự chạy không tính là thay đổi.
- **Phần tử chính hiện từ FROM + 0.3** (khung đầu không trống: lỗ + chùm vươn ra là đủ). Kết luận viết xong TRƯỚC câu cuối.
- Vật mới hiện khi CHÙM SÁNG chạm tới nó (DNA §4: `k` của `ray`/`shaft`); chữ hiện bằng vệt sáng (`write`, không fade).
- Vật rời khung bằng chuyển động (trượt ra, chùm tắt dần rồi vật chìm) — không `if (t < mốc) vẽ()` cắt cứng. Mỗi khung MỘT ý chính.
- Mascot: mỗi lần 3–8 s quanh đúng câu, một bên khung (cx ≤ 380 hoặc ≥ 1540), chân chạm đáy (`foot = H`), chữ ở nửa kia,
  `figure(..., { t })` khi nói, `{ talk: false }` khi im. Vẽ sau `restore` camera.

**Toán / số.** Mọi số lên hình tính bằng code + `must` ở trạng thái ĐÃ XONG (§70), trên chính chuỗi hiện (§94).

**Tất định.** Không `Math.random` / `Date.now` / `performance.now` (→ `hash(i)`); không `ctx.filter` trong render.

## Từng cảnh

Ký hiệu: `w(i,'từ')` = mốc chữ (giờ timeline); 「…」 = テロップ đúng chuỗi (cỡ ≥ 28; '@dim' = テロップ phụ, KHÔNG tiếng);
**tiếng** = loại qua `cue(t, 'nghĩa')` (SND của kit) — danh sách là khung, nhóm tự thêm/bớt trong trần số của cảnh.
"Vào/ra" = chuyển cảnh trang; "mối nối" = vật mang qua.

### G1 · `a0-open` (p1 câu 0–12) — ERA darkroom, FROM −0.5 · tiếng 18–27 · `static POSES = ['ponder', 'point']`

Mở từ đen (trang p1 bắt đầu ở T = −0.6). Bố cục = **sf1** (`kit-test.html` hàm `sf1`): knot ở y 300, luồng tới BÀN TÁO, bó sóng
nhiều màu bay trong luồng (đúng như sf1: [650, 470, 560, 410, 600, 520, 700, 440], `photon(... size 34, amp 8, scale 0.045)`).
- FROM + 0.3 → `w(0,'今')`: chấm sáng ở lỗ (`aperture('knot', { open })` 0 → 1), luồng vươn tới táo (`shaft k`), bàn + táo sáng lên khi
  luồng chạm. `w(0,'毎秒')` 「毎秒　何十兆個もの」 (64, 900) → `w(0,'光')` 「光の粒」 (76, mincho) → `w(0,'飛び込んで')` bó sóng
  bay vào mắt (một mắt vẽ nét trung tính góc phải-trên, hoặc mép mascot sau).
- câu 1 `w(1,'8分')`: 「8分19秒前に太陽を出た光」 (`SUN_S`, `must` '8分19秒'; lời 「8分あまり」) + '@dim' 「外にいるなら」.
- câu 2: một sơ đồ ngang thu nhỏ ở trên (y ~250): ☉ (đĩa sáng `spot` 'white') — nét đứt dài — Trái Đất; `w(2,'1億5000万キロ')`
  「1億5000万km」, `w(2,'秒速30万キロ')` 「秒速30万km」 (cả hai CONTENT).
- câu 3 `w(3,'空気')`→`w(3,'跳ね返り')`→`w(3,'目')`: tia trắng lỗ → táo → tia dội từ táo (sợi đỏ, chỉ `nm` ≥ 600 — chuỗi 4) → mắt.
- câu 4: mascot `ponder` (flip, nhìn táo) như sf1 `figure(g, 'ponder', 1590, H, 800, k, { flip: true, t })`, 3–8 s quanh
  `w(4,'見る')`; 「『見る』」 (mincho 72) bên trái. Chữ sf1 ở dưới trái phải đã rút trước khi mascot vào.
- câu 5 `w(5,'物理')`/`w(5,'化学')`/`w(5,'脳')`: ba trạm 「物理」「化学」「脳」 nối bằng ba vệt sáng tiếp nhau (rơ-le) `w(5,'リレー')`.
- câu 6 `w(6,'バトン')`: một bó sáng chạy qua ba trạm 「バトン＝光」; `w(6,'物理学者たち')` '@dim' 「物理学者たちを、いちばん長く悩ませてきた」.
- câu 7–11: trạm rút; `w(7,'4つ')` bốn khe mở trên tường, `promiseCards` (mặc định) — thẻ i hiện ở `w(8+i,'iつ目')`
  (`'1つ目'`, `'2つ目'`, `'3つ目'`, `'4つ目'`), `lit[i]` 0 → 1 0.4 s trước `k[i]`. Mascot `point` cx 300, foot H, h 640 (chỉ sang
  thẻ — flip nếu cần), 3–8 s từ `w(7,'4つ')`.
- câu 12 `w(12,'思いがけない')`: 「思いがけない場所」 '@dim' dưới thẻ ④; sau `L(12).end` thẻ + luồng tắt, **knot khép** (`open` 1 → 0 tới
  `L(12).end + 0.7`), `dark(g, on)` 1 → 0 tới `L(12).end + 1.0` (đen kín ở cuối trang → intro).
- Tiếng: hole (lỗ mở), beam (luồng vươn), telop ×~8, photon ×2–3 (bó vào mắt), step ×3 (rơ-le), card ×4
  (thẻ ①–④), hole (lỗ khép). **Không** suzu/error/impact.

### G2 · `b1-me-kara` (câu 0–3) — darkroom, mở hồi 1 · tiếng 8–11

**Vào:** từ ĐEN sau intro: `t < FROM` → đen kín (trang chạy từ T = −3.0); từ FROM: chấm sáng ở knot (y 360) rồi chùm vươn (DNA §6)
— `dark(g, on)` 0 → 1 trong [FROM, FROM + 0.8]. `actCard(..., 1)` + title 「目から光が出る？」 `{ act: 1 }`.
- câu 0 `w(0,'2000年')`: 「2000年以上前から」 (44) + 「光とは何か」 (mincho 60) giữa trái.
- câu 1 bảng TRÁI (x 140–900): mắt nét trung tính + tia NÉT ĐỨT xám bắn ra từ mắt như đèn pin (`arrow` dash); `w(1,'ユークリッドたち')`
  「ユークリッドたち（古代ギリシャ）」; `w(1,'見る')` 「目から『見る光線』が出る？」.
- câu 2 bảng PHẢI (x 980–1824): vật (quả táo `apple` nhỏ được chùm chiếu) bong ra lớp 「写し」 bay vào mắt; `w(2,'デモクリトスたち')`
  「デモクリトスたち」; `w(2,'写し')` 「ものから『写し』が飛び込む？」.
- câu 3 `w(3,'どちら')`: `cross` nhỏ cạnh CẢ HAI bảng (trung tính — "cả hai đều chưa đúng", không gạch chữ); `w(3,'近かった')` bảng phải
  sáng lên (vòng 生成り) 「近かったのは、あとのほう」.
- Tiếng: (actCues), telop ×4–5, beam (chùm vươn tới bảng phải), photon (写し vào mắt), step (✗ ×2 một tiếng).
- **Ra:** cùng ERA → 雨戸 (trang). Không mối nối vật.

### G2 · `b2-ukeru` (câu 4–6) — darkroom · tiếng 7–10 · `IMAGES = imgs('alhazen-hevelius')`

- FROM+0.3: knot + ảnh `alhazen-hevelius` (h ≤ 560, trái, `photo` k 0 → 1) ; `w(4,'11世紀')` 「11世紀のはじめ」; `w(4,'バスラ')`
  「イラク・バスラ生まれ」; `w(4,'イブン')` 「イブン・アル＝ハイサム」 (mincho 52).
- câu 5 `w(5,'太陽')`: đĩa Mặt Trời chói (spot 'white' lớn) chiếu vào mắt nét trung tính → mắt "nheo" (vạch đau) 「目が痛くなる」;
  `w(5,'なぜ')` 「目が光を出すだけなら、なぜ痛む？」.
- câu 6 `w(6,'四方')`: lỗ đổi `'lamps'` (ba lỗ) → ba chùm tới một vật ở giữa, từ vật nhiều tia trắng toả 四方 (`ray` k), CHỈ một tia vào
  mắt `w(6,'ごく')` 「そのごく一部が目に入る」; `w(6,'受け取る')`: `wrong(「目から光が出る」)` + `strike` → ngay dưới
  「目は受け取るだけ」 (mincho 56) — xong trước `L(6).end − 1`.
- Tiếng: photo (page), telop ×4, beam (Mặt Trời), hole (đổi lamps), shimmer? (tia toả — dùng beam một lần), **error −4** (strike).

### G2 · `b3-tsubu-nami` (câu 7–11) — darkroom · tiếng 9–13 · `IMAGES = imgs('newton', 'huygens')`

- câu 7 `w(7,'17世紀')`: ảnh `newton` trái (h 420) 「17世紀」; `w(7,'粒')` chuỗi chấm sáng bay THẲNG từ lỗ 「光は、小さな粒の流れ？」.
- câu 8 `w(8,'オランダ')`: ảnh `huygens` phải (h 420); `w(8,'波紋')` vòng gợn tròn đồng tâm (nét sáng mảnh ≥ 4 px, 'white') 「光は、波紋のような波？」.
- câu 9 `w(9,'交差')`: hai chùm cắt nhau giữa khung, đi XUYÊN qua nhau không lệch 「粒なら、ぶつかり合うはず」; `w(9,'2人')` hai mắt
  (nét trung tính) hai đầu, hai tia nhìn nhau 「2人は同時に、おたがいの目を見られる」.
- câu 10 `w(10,'ホイヘンス')`: 「ホイヘンスの問い」 '@dim' (khung không đứng yên: vòng gợn mở rộng).
- câu 11 `w(11,'名声')`: cán cân trung tính 「粒」｜「波」 nghiêng về 粒; `w(11,'18世紀')` 「18世紀：ほとんどの人が『粒』」.
- Tiếng: photo ×2 (page), telop ×4–5, photon (chuỗi hạt), wave (gợn — `whoosh` nhẹ −6), beam (hai chùm cắt), tick (cân nghiêng).

### G2 · `b4-young` (câu 12–17) — darkroom · tiếng 11–16 · `IMAGES = imgs('young', 'young-fig442')`

Lỗ đổi `'double'` (gap 90, y 360). Màn ở x ~1500 (dọc). Ánh sáng MỘT màu: 589 nm (nhãn KHÔNG ghi số).
- câu 12 `w(12,'1801年')` 「1801〜1803年」, `w(12,'トマス')` ảnh `young` (h 380, góc phải trên) + 「トマス・ヤング（イギリス）」.
- câu 13 `w(13,'二つ')`: một chùm tách hai qua hai khe 「光を二つに分けて、重ねる」 + '@dim' 「二重スリット（今の教科書の形）」 (CONTENT #7).
- câu 14 `w(14,'明るい')`: TRƯỚC đó (đầu câu) màn hiện '@dim' 「粒なら？」 hai vạch mờ; rồi vân hiện DẦN từng chấm (vị trí chấm = `hash(i)` qua
  nghịch đảo CDF của `I(y) = cos²(π d y / λL)` — tính, không vẽ tay); 「明るい縞と暗い縞」; `w(14,'ヤング')` 「ヤングの実験（高校物理）」.
- câu 15 `w(15,'山',1)`: hai sóng (`wave`, 589) chồng: đỉnh + đỉnh → biên độ đôi 「山＋山 → 明るい」; `w(15,'谷')` 「山＋谷 → 暗い」;
  `w(15,'粒')` 「粒には、つくれない模様」. (Câu này có `山` ×4, `重なれ` ×2 — truyền n.)
- câu 16 `w(16,'1819年')` 「1819年ごろ　フレネルたち（フランス）」 + ảnh `young-fig442` (≤ 380) nhỏ.
- câu 17 `w(17,'波')`: 「光は、波だ」 (mincho 72) — xong trước `L(17).end`; '@dim' 「少なくとも、誰もがそう思った」.
- Tiếng: hole (khe đôi), beam, photo ×2, telop ×5, **beep ≤ 4** (−8, chấm đầu tiên rơi trên màn, rồi theo cụm — không mỗi chấm),
  wave (sóng chồng), **suzu 1** (「光は、波だ」).

### G3 · `c1-denjiha` (câu 18–22) — **lab**, mở hồi 2 · tiếng 8–11 · `IMAGES = imgs('maxwell')`

**Vào:** khác ERA (darkroom → lab) → vòng sáng từ lỗ (trang). Lỗ `'slit'`. `actCard(..., 2)`, title 「何が揺れているのか」 `{ act: 2 }`.
- câu 18 `w(18,'何')`: một sóng trắng ngang (`wave`, 'white') trôi, 「何が揺れている？」.
- câu 19 `w(19,'1860年代')` ảnh `maxwell` (≤ 640, trái) 「1860年代」; `w(19,'電気')` 「電気と磁気の方程式」 → 「空間を伝わる波」.
- câu 20 `w(20,'速さ',1)`: 「その速さ ≈ 光の速さ」 (Noto — ≈); `w(20,'一致')` 「ほぼ一致」.
- câu 21 `w(21,'電場')`: sóng E/B chiếu 3D (hàm cục bộ, góc nhìn chéo): **E dọc** = sóng sáng (`ray` 'white'), **B ngang (sâu)** =
  nét trung tính '@dim' ≥ 4 px, CÙNG pha, ⊥ trục; nhãn 「電場」「磁場」「進む向き」 (mũi tên trung tính); `w(21,'電磁波')`
  「電磁波」 (mincho 72).
- câu 22 `w(22,'たがい')` 「たがいを生み合いながら」; `w(22,'真空')` 「真空の中でも進む」.
- Tiếng: (actCues), photo, telop ×4, beam (sóng), wave (E/B hiện).

### G3 · `c2-kouden` (câu 23–28) — lab · tiếng 10–15 · `POSES = ['startled']`

Tấm kim loại xám (trung tính) đứng ở x ~1100, nhãn 「ある金属」 (KHÔNG tên). Chùm từ khe trái tới tấm. Hai núm trung tính 「明るさ」「波長」.
- câu 23 `w(23,'19世紀')` 「19世紀の終わり」; `w(23,'説明')` 「波では説明できない現象」.
- câu 24 `w(24,'金属')`: chùm trắng → tấm → electron (chấm 生成り) bật ra; `w(24,'光電')` 「光電効果」 (mincho 64).
- câu 25 `w(25,'赤い')`: chùm đổi `PH_RED` 700; `w(25,'明るく')` núm 明るさ quay, chùm dày ×10 (rộng + sáng), 「明るさ×10」;
  `w(25,'1個')` KHÔNG electron nào: `cross` trên tấm + 「電子は1個も出ない」. Mascot `startled` cx 1640, foot H, h 600, `talk: false`,
  3–8 s từ `w(25,'どんな')`. (Tấm ở giữa — đặt sao cho chữ ở nửa trái.)
- câu 26 `w(26,'紫')`: chùm `PH_VIO` 400, MẢNH/mờ; `w(26,'すぐ')` electron bật ngay (zap) 「弱くても、すぐに飛び出す」.
- câu 27 `w(27,'波長')`: DẢI CHUẨN y 760 xuất hiện, vạch ngưỡng trung tính ở `NA_EDGE`; vùng TRÁI vạch sáng, vùng phải mờ 「この長さより
  短い波長だけ」 (KHÔNG số); `w(27,'強く')`: `wrong(「明るくすれば電子が出る」)` + `strike` → 「波長で決まる」; `w(27,'数')`
  「明るさで増えるのは、電子の『数』」 (chùm tím dày → nhiều electron).
- câu 28 `w(28,'明るい')`: chùm đỏ dày lại, 「明るい赤は、なぜだめ？」 (treo câu hỏi, kết bằng ?).
- Tiếng: telop ×5, beam (đổi màu chùm) ×2, **error −6** (「1個も出ない」), **zap ≤ 2** (câu 24, 26 — câu 27 không thêm), spectrum
  (dải hiện), **error −4** (strike). Không suzu.

### G3 · `c3-einstein` (câu 29–40) — lab · tiếng 23–35 · `IMAGES = imgs('einstein-1921')`

Bốn khối, mỗi khối ≤ 3 s không vật mới; chữ cũ rút khi khối mới vào.
- **A câu 29–32:** `w(29,'1905年')` 「1905年」 + ảnh `einstein-1921` (trái, h 460) `w(29,'アインシュタイン')`; `w(30,'ひとかたまり')`
  chùm vỡ thành chuỗi `photon` rời 「光のエネルギーは、ひとかたまりずつ」; `w(30,'光子')` 「光子」 (mincho 72) + '@dim' 「今の言葉」.
  câu 31 `w(31,'比例')` 「エネルギー ∝ 振動数」 (Noto); `w(31,'短い')` hai bó: `PH_RED` 「1.77 eV」, `PH_VIO` 「3.1 eV」 (bước sóng
  trên hình tỉ lệ — đỏ dài, tím ngắn) 「波長が短いほど、1個のエネルギーは大きい」. câu 32 `w(32,'1個')` electron nhận ĐÚNG một bó
  「電子は、光子を1個ずつしか受け取れない」.
- **B câu 33–35 (塀):** tường cao trung tính ở x ~1150, nhãn 「電子が飛び出すのに必要なエネルギー」 '@dim' (không số). `w(33,'弱い')`
  bóng yếu (bó đỏ) ném ×N, `w(33,'1000個')` đếm 「×1000」, `w(33,'越えません')` không quả nào qua (cross) 「1000個でも、1個も越えない」;
  `w(34,'強い')` bóng mạnh (bó tím) MỘT quả qua 「強いボールなら、1個で越える」; `w(34,'たくさん',1)` nhiều quả tím → nhiều quả qua.
  câu 35 `w(35,'赤い')` 「赤い光子＝弱いボール」, `w(35,'紫')` 「紫の光子＝強いボール」, `w(35,'明るく')` 「明るくする＝投げる数を増やす」.
- **C câu 36–38 (Nobel):** `w(36,'1921年')` 「1921年　ノーベル物理学賞」 (huy chương vẽ trơn trung tính, không logo); `w(37,'理論',1)`
  nguyên văn 「理論物理学への貢献、とくに光電効果の法則の発見」 (2 dòng, 40); `w(37,'相対性')` 「相対性理論」 '@dim' + `cross`;
  `w(38,'1922年')` 「1922年11月」, `w(38,'船')` con tàu đơn giản (nét trung tính) trôi phải, 「日本へ向かう船の旅の途中」.
- **D câu 39–40:** `w(39,'波',1)` một photon bay = sóng 「進むときは、波のように」; `w(39,'粒')` chạm tấm = hạt 「物質とやりとりするときは、粒のように」;
  `w(40,'短い')` chốt 「波長が短いほど、光子1個のエネルギーは大きい」 (mincho) + `w(40,'鍵')` 「これが、この先の鍵」 — xong trước `L(40).end`.
- Tiếng: photo, telop ×~14, photon ×4–5 (ném bóng theo cụm), **zap ≤ 3** (electron/bóng qua tường), **error −6 ×1** (1000 quả không qua),
  **suzu ×1** (Nobel 1921), tick (con tàu). `must`: `fmt(eV(700),2)` = '1.77', `fmt(eV(400),1)` = '3.1'.

### G4 · `d1-kaidan` (câu 41–48) — lab, mở hồi 3 · tiếng 12–18 · `IMAGES = imgs('tube-h', 'tube-ne', 'sodium-street', 'spectrum-na')`

**Vào:** cùng ERA (lab → lab) → 雨戸. `actCard(..., 3)`, title 「エネルギーの階段」 `{ act: 3 }`. Lỗ `'slit'`.
- câu 41 `w(41,'2つ')`: hai nhãn 「①　電子の階段」「②　熱」 (② '@dim' — d3 dùng lại đúng chữ này).
- câu 42–43 `w(42,'階段')`: `ladder` (THANG, k 0 → 1); `w(43,'決まった')` 「決まったエネルギーの段にしか、いられない」; electron = chấm 生成り ở n = 2.
- câu 44 `w(44,'跳び上がった')` electron nhảy lên n = 3 (mũi tên trung tính lên); `w(44,'戻り')` rơi 3 → 2: `ladderDrop(L, 3, 2, …)`
  (656 đỏ) + bó `photon` bay ra phải; `w(44,'光子')` 「段差の分 ＝ 光子1個」.
- câu 45 `w(45,'大きい')`: `ladderDrop` 4→2 (486), 5→2 (434), 6→2 (410) nối nhau ~0.5 s; 「段差が大きいほど、波長が短い」 (chuỗi 2).
- câu 46 `w(46,'指紋')`: thang thu nhỏ trái; DẢI CHUẨN ×3 (`continuous: false`, `lines: H_LINES` / `NA_LINES` / `NE_LINES`) nhãn
  「水素」「ナトリウム」「ネオン」 + 「原子ごとの指紋」.
- câu 47 `w(47,'ネオン',1)` ảnh `tube-ne` + 「ネオンサインの赤 ＝ ネオン原子の色」; `w(47,'トンネル')` ảnh `sodium-street` + 「トンネルの
  オレンジ ＝ ナトリウム原子の色」 (ảnh `tube-h` / `spectrum-na`: tuỳ chỗ, tối đa 3 ảnh cùng lúc, mỗi ảnh h ≤ 260).
- câu 48 `w(48,'led')`: 「LEDやスマホの画面も、この仲間」 + biểu tượng màn hình nét trung tính có ba chấm `chip` 650/530/450.
- Tiếng: (actCues), telop ×5–6, step ×3 (bậc hiện / electron nhảy), photon ×2 (bó bay ra), spectrum (ba dải), photo ×2–3.

### G4 · `d2-aoi-led` (câu 49–53) — lab · tiếng 9–13

- câu 49 `w(49,'led')`: ba bậc đôi (tấm trên/dưới, nét trung tính) cạnh nhau, khoảng hở TỈ LỆ `eV(nm)` của 650 / 530 / 450 (`must`
  thứ tự hở 650 < 530 < 450); `w(49,'1960年代')` bậc đỏ phát chùm 650 「赤いLED：1960年代から」; `w(49,'青')` bậc lam tối, 「青だけは、
  作れなかった」.
- câu 50 `w(50,'大きな')`: khe bậc lam rộng nhất + 「青には、大きな段差が必要」; `w(50,'結晶')` tinh thể nét trung tính nứt/không lớn
  được 「結晶が、うまく育たなかった」.
- câu 51 `w(51,'赤崎勇')` / `w(51,'天野浩')` / `w(51,'中村修二')`: ba tên (chữ, KHÔNG ảnh) 「赤崎勇」「天野浩」「中村修二」 lần lượt.
- câu 52 `w(52,'2014年')` 「2014年　ノーベル物理学賞」 (huy chương trơn); bậc lam phát chùm 450.
- câu 53 `w(53,'そろって')`: ba chùm 650 + 530 + 450 hội tụ → chùm 'white' (thứ tự trái → phải giữ tím… đỏ không bắt buộc ở đây,
  nhưng không vẽ ngược chuỗi 2); `w(53,'白く')` 「白く明るいLEDの明かり」 (mincho).
- Tiếng: telop ×5, beam ×2 (đỏ, lam), tick (tinh thể nứt), pop ×3 (tên — chỉ tên đầu `pop`, hai tên sau −4), **suzu ×1** (2014),
  spectrum (ba chùm thành trắng).

### G4 · `d3-netsu` (câu 54–59) — lab · tiếng 10–14

- câu 54 `w(54,'2つ目')`: hai nhãn của d1 lại hiện, 「②　熱」 sáng lên (①  '@dim').
- câu 55 `w(55,'電荷')`: các chấm điện tích rung mạnh trong khối nóng (hash, theo t); `w(55,'あらゆる')` DẢI CHUẨN `continuous` (y 700),
  ngay trên nó dải vạch Na thu nhỏ để so: 「線」 vs 「ひと続き」; 「あらゆる波長が、ひと続きに」.
- câu 56 `w(56,'1500万度')`: Mặt Trời mặt cắt (nét + quầng 'white'): lõi 「中心：およそ1500万度」 「エネルギーが生まれる」.
- câu 57 `w(57,'そこ')`: mũi tên từ lõi → ✗ tới mắt 「見ている光は、ここから来たのではない」.
- câu 58 `w(58,'表面')`: viền sáng lên 「表面：およそ5500度」, tia ra từ mặt → mắt; `w(58,'熱い')` 「太陽は、熱いから光っている」.
- câu 59 `w(59,'ろうそく')`: ngọn nến (thân vàng `wlCss(585)`, chân lam `wlCss(470)`), `w(59,'すす')` 「黄色：熱で輝く、すすの粒」,
  `w(59,'青い')` 「青：分子の階段の光」 — nối lại hai nhãn ①② (nến có cả hai).
- Tiếng: telop ×6, spectrum (dải liên tục), tick (rung), beam (tia từ mặt), step ×2.
- **Ra:** khác ERA (lab → darkroom) → vòng sáng (trang).

### G5 · `e1-hitonigiri` (câu 60–61) — darkroom, mở hồi 4 · tiếng 4–6 · `POSES = ['pointer']`

**Trạng thái cuối = sf2** (`kit-test.html` hàm `sf2`) trừ hai dòng chữ dưới. `actCard(..., 4)`, title 「ほんの一握り」 `{ act: 4 }`.
- câu 60 `w(60,'波長')`: dải 380–780 hiện TRƯỚC (`spectrumStrip(g, 560, 330, 800, 60, { ticks: [400, 500, 600, 700] })`, k quét trái → phải)
  「可視光」 + `w(60,'380')` 「およそ380〜780 nm」; `w(60,'紫')` 「紫から赤まで」. Mascot `pointer` (`talk: false`) cx 1640, foot H, h 520,
  chỉ vào dải, 3–8 s, **lặn xuống trước khi thước phủ ngang** (`w(61,'外側')`).
- câu 61 `w(61,'外側')`: `specRuler({ y: 600, h: 64, k: 0 → 1 })` vươn hai phía từ khe (k quét), quạt sáng nối khe ↔ dải như sf2;
  `w(61,'電磁波')` 「その外側にも、電磁波は続く」 (48); '@dim' 「目盛り1つで10倍（対数目盛り）」.
- Tiếng: (actCues), spectrum (dải), telop ×2, beam (thước vươn).
- **Ra:** cùng ERA → 雨戸. e2 mở bằng THƯỚC ĐỖ (y 846).

### G5 · `e2-denpa` (câu 62–68) — darkroom · tiếng 14–21

Thước đỗ `specRuler({ y: 846, h: 48, window: 1 })` suốt cảnh. **Dấu dải** (hàm cục bộ dùng chung cả G5 — chép giống hệt vào e2/e3/e4):
khung chữ nhật 生成り 3 px bao đúng dải `[X(lo), X(hi)]` của `BANDS`, trượt (smooth) giữa các dải.
- câu 62 `w(62,'電波',1)`: dấu dải → 電波 (phải); sóng TRUNG TÍNH dài; `w(62,'時計')` đồng hồ nét trung tính + 「電波時計」;
  `w(62,'5キロ')` 「波長 5〜7.5 km」 (`LAMBDA(60e3)`, `LAMBDA(40e3)`, `must` '5', '7.5'); '@dim' 「おおたかどや山 40 kHz・はがね山 60 kHz」.
- câu 63 `w(63,'マイクロ波')`: dấu dải → マイクロ波; 「数ミリ〜数十センチ」; `w(63,'wi-fi')` ba biểu tượng nét 「Wi-Fi」「スマートフォン」
  「電子レンジ」 lần lượt ở `w(63,'スマート')`, `w(63,'電子')`.
- câu 64 `w(64,'電場')`: lò vi sóng mặt cắt; mũi tên E trung tính lật lên/xuống theo t; `w(64,'24億5000万回')` 「1秒間に24億5000万回」
  (CONTENT; `must` `2.45e9` ↔ chuỗi) + 「行ったり来たり」; '@dim' 「波長 12.2 cm」 (`LAMBDA(2.45e9)`).
- câu 65 `w(65,'水')`: phân tử nước (ba chấm trung tính) quay theo E; `w(65,'熱')` 「回る動き → 熱」.
- câu 66 `w(66,'水')`: `wrong(「水だけを狙った周波数」)` + `strike` → 「水の分子をゆさぶる」.
- câu 67 `w(67,'表面')`: mặt cắt thức ăn, lớp ngoài sáng ấm trung tính 「温まるのは表面から数センチ」, `w(67,'奥')` mũi tên vào trong
  「奥へは、熱が伝わる」.
- câu 68 `w(68,'wi-fi',1)`: biểu tượng Wi-Fi + lò cạnh nhau; `w(68,'2.4ギガヘルツ')` 「Wi-Fi 2.4 GHz」 vs 「電子レンジ 2.45 GHz」 →
  「同じ帯域」 (+ '@dim' 12.5 / 12.2 cm từ `LAMBDA`).
- Tiếng: telop ×7, tick (dấu dải dời) ×2, pop ×3 (biểu tượng — một tiếng mỗi biểu tượng, −4), wave (E lật), **error −4** (strike),
  beep (Wi-Fi rớt, câu 68).

### G5 · `e3-sekigai-shigai` (câu 69–73) — darkroom · tiếng 11–16 · `IMAGES = imgs('mimulus-uv')`

Thước đỗ như e2; dấu dải bắt đầu ở マイクロ波 (đúng khung cuối e2 nếu đặt `CONTINUES` — nếu không, chuyển 雨戸 bình thường).
- câu 69 `w(69,'赤外線',1)`: dấu → 赤外線; hình người nét trung tính phát quầng XÁM (không giả màu nhiệt) 「温かいものなら何でも」;
  `w(69,'皆さん')` 「皆さんの体も、赤外線で輝いている」.
- câu 70 `w(70,'紫外線')`: dấu trượt QUA khe thấy được (khe sáng lên khi dấu đi qua) sang 紫外線 (TRÁI khe — chuỗi 1);
  `w(70,'dna')` chuỗi xoắn DNA nét trung tính bị một vạch xám đánh trúng 「DNAを傷つけるほどのエネルギー」.
- câu 71 `w(71,'uvb',1)` 「UVB：日焼け」, `w(71,'uva')` 「UVA：肌の老化」, `w(71,'皮膚')` 「どちらも皮膚がんの原因」 (ba vạch phụ
  trong dải 紫外線 — KHÔNG số nm).
- câu 72 `w(72,'uvc')`: lớp khí quyển (hai dải xám ngang) chặn mũi tên UVC 「UVC：酸素とオゾンが、すべて吸収」; `w(72,'uvb',1)` mũi tên
  UVB phần lớn dừng ở 「オゾン層」 「UVBも、大部分は止まる」.
- câu 73 `w(73,'ミツバチ')`: ảnh `mimulus-uv` (h 380) + 「ミツバチには、紫外線が見える」; `w(73,'模様')` vòng 生成り quanh vân ở ảnh phải.
- Tiếng: tick (dấu dời) ×2, telop ×6, photo, **không** error.

### G5 · `e4-x-gamma` (câu 74–84) — darkroom · tiếng 18–27

Hai nửa. **Nửa 1 (câu 74–77)**, thước đỗ như e3:
- câu 74 `w(74,'x線')`: dấu → X線; bàn tay mặt cắt: mô mềm nét mờ, xương đặc trung tính 「やわらかい部分は通り抜け」 `w(74,'骨')`
  「骨には吸収」.
- câu 75–76 `w(75,'ガンマ')` dấu → ガンマ線 (trái cùng); `w(76,'数十万倍')` thanh so: bó thấy được (1) vs ガンマ (dài tới mép) 「目に見える
  光の、数十万〜100万倍のエネルギー」 (Noto).
- câu 77 `w(77,'医療')` 「医療：がん細胞をねらい撃ち」 (mũi tên trung tính hội tụ vào một điểm).

**Nửa 2 (câu 78–84) — LAO VÀO KHE** (ngoại lệ DNA §7, viết trong cảnh này, KHÔNG dùng `zoom()`):
- câu 78 `w(78,'電波')`: thước nâng từ y 846 lên y 600 (trạng thái e1/sf2, `labels`/`pows` đủ), mọi dải sáng đều một lượt từ phải sang trái
  「電波からガンマ線まで、すべて同じ電磁波」; `w(78,'波長')` 「ちがうのは、波長だけ」.
- câu 79 `w(79,'細い')`: `specRuler({ window: 1, dim: 0 → 1 })` — các dải khác chìm; 「目に見えるのは、ほんの細いすき間だけ」 + '@dim'
  「帯の幅のおよそ2%」 (`VIS_FRAC`, `must` '2').
- câu 80 `w(80,'なぜ')`: **lao vào khe** trong ~1.2 s: vẽ lại thước với `R` nội suy (log của độ phóng) sao cho cuối cùng `rulerX(380e-9) = 240`,
  `rulerX(780e-9) = 1680` (R.x1 − R.x0 ≈ 69 165 px), `labels: 0, pows: 0` trong lúc lao (nhãn xa ngoài khung sẽ làm `safeBox` ném lỗi).
  Khe thành dải 380–780 full rộng (khớp `spectrumStrip(g, 240, y, 1440, h)` — cùng phép tuyến tính nm), y/h nội suy tới y 560, h 120.
  「なぜ、このすき間？」 sau khi dừng.
- câu 81 `w(81,'太陽')`: đường phổ Mặt Trời (Planck 5772 K — CONTENT; hàm cục bộ, `must` đỉnh ∈ 380–780) phủ trên dải, đỉnh trong khung
  「太陽の光が、いちばん強い」; `w(81,'空気')` 「空気も、よく通す」 (dải xám mờ "khí quyển" trong suốt ở khe).
- câu 82 `w(82,'分子')` 「分子の形を、こわさずに変えられる強さ」 (không vẽ retinal — vật của g3).
- câu 83 `w(83,'紫外線')` mép TRÁI ngoài khung: 「紫外線：分子が傷つく」; `w(83,'赤外線')` mép PHẢI: 「赤外線：体の熱の光に埋もれる」.
- câu 84 `w(84,'窓')`: khung 生成り quanh dải + 「目は、この『窓』に合わせて進化した」 (mincho) — xong trước `L(84).end`.
- Tiếng: tick ×3 (dấu dời), telop ×10, pop (bàn tay), spectrum (mọi dải sáng, câu 78), whoosh (lao vào khe, câu 80), beam (đường phổ
  Mặt Trời), **suzu 1** (「窓」, −4). **Ra:** cùng ERA → 雨戸; f1 (mở hồi) bắt đầu lại từ lỗ — không mối nối vật.

### G6 · `f1-kussetsu` (câu 85–88) — darkroom, mở hồi 5 · tiếng 9–13

`actCard(..., 5)`, title 「屈折」 `{ act: 5 }`. Lỗ `'window'` (DNA §1 hồi 5).
- câu 85 `w(85,'水')`: chùm trắng xiên vào mặt nước (bể nét trung tính, nửa dưới khung), gãy ở mặt nước, pháp tuyến nét đứt; góc theo
  Snell với `nWater(589)` (tính); `w(85,'ガラス')` khối kính nhỏ cũng gãy; `w(85,'中学1年')` 「屈折（中学1年の理科）」.
- câu 86 `w(86,'速さ')`: mặt sóng (vạch song song) vào nước khít lại (λ/n); `w(86,'25%')` 「水の中では、光は25%ほど遅くなる」
  (`must` `Math.round((1 − 1/nWater(589))·100)` = 25).
- câu 87 `w(87,'車')`: xe nhìn từ trên (nét trung tính) đi xiên vào vùng 「砂地」; `w(87,'先')` bánh vào cát trước chậm lại (vệt ngắn hơn),
  `w(87,'変えます')` xe quay VỀ phía bánh chậm 「先に入った側が遅くなり、その側へ曲がる」.
- câu 88 `w(88,'垂直')`: quay lại tia nước, cung góc tới/khúc xạ (`angleArc`) 「境目に対して、より垂直な向きへ」 + cốc 麦茶 với đũa
  gãy (tuỳ, nếu còn chỗ).
- Tiếng: (actCues), hole (cửa sổ), beam, **water/glass** (tia vào nước), telop ×4, tick (xe vào cát).

### G6 · `f2-hodoku` (câu 89–94) — darkroom · tiếng 9–13 · `IMAGES = imgs('newton-crucis')`

Lỗ `'window'` + lăng kính (tam giác kính nét sáng trung tính) trên bậu ngay phải lỗ.
- câu 89 `w(89,'色ごと')`: chùm trắng vào lăng kính 「色ごとに、速さが少しちがう」.
- câu 90 `w(90,'紫')`: quạt màu ra (nhiều `ray` 400…700): tím/lam lệch NHIỀU nhất, đỏ ít nhất (chuỗi 2); '@dim' 「角度は強調」 BẮT BUỘC
  (góc phóng); `w(90,'分散')` 「分散」 (mincho 64) + 「紫や青は大きく、赤は小さく曲がる」.
- câu 91 `w(91,'プリズム')`: '@dim' 「色は、プリズムがつける？（昔の考え）」.
- câu 92 `w(92,'1666年')` 「1666年　ニュートン」; một tấm chắn có khe chỉ cho MỘT màu (vd 589… chọn một sợi của quạt) qua;
  `w(92,'もう')` lăng kính thứ hai.
- câu 93 `w(93,'変わりませんでした')`: sợi một màu qua lăng kính thứ hai VẪN một màu (chỉ lệch hướng) 「色は、もう変わらない」.
- câu 94 `w(94,'混ざった')` ảnh `newton-crucis` (想像画 — nhãn kit) nhỏ; 「白い光は、すべての色が混ざったもの」; `w(94,'ほどいて')`
  「プリズムは、それをほどいていただけ」 (mincho) — xong trước `L(94).end`.
- Tiếng: prism (glass) ×2, spectrum (quạt bung), telop ×5, photo, **suzu 1** (câu 93).
- **Ra:** khác ERA (darkroom → sky) → vòng sáng từ lỗ.

### G6 · `f3-niji` (câu 95–101) — **sky** · tiếng 13–20 · `IMAGES = imgs('rainbow-double')`

Trạng thái giữa cảnh = **sf3** (`raindrop(g, 700, 470, 270, { nms: [656, 404.7], outLen: 640 })`, lỗ = khung 雨戸 mở bên trái) trên nền
`ground(g, 'sky')`. Số trên hình: 「およそ42°」「およそ40°」 (chuỗi 3) — nhãn cung sf3 đổi thành số nguyên.
- câu 95 `w(95,'雨粒')`: giọt hiện (`body` 0 → 1), `w(95,'屈折')` tia vào (k1), `w(95,'反射')` trong giọt (k2), `w(95,'色')` ra (k3)
  「屈折・反射・屈折」.
- câu 96 `w(96,'背')`: thu giọt về góc trái trên; người nét trung tính đứng quay lưng Mặt Trời (trái), bóng đầu trên mặt đất;
  `w(96,'影')` nón từ mắt qua bóng đầu (điểm đối nhật) 「自分の頭の影が中心」; `w(96,'円')` cung tròn.
- câu 97 `w(97,'42度')`: cung đỏ NGOÀI 「赤　およそ42°」 (`chip(656)`); `w(97,'40度')` cung tím TRONG 「紫　およそ40°」 (`chip(404.7)`);
  `w(97,'外側')` 「外側が赤、内側が紫」 (mincho, như sf3).
- câu 98 `w(98,'全部')`: một giọt tung quạt đủ màu; `w(98,'一つ')` các giọt ở độ cao khác nhau, mỗi giọt chỉ MỘT tia màu tới mắt
  (giọt cao → đỏ, thấp → tím).
- câu 99 `w(99,'一色')`: hàng giọt dọc tô dần thành dải cầu vồng 「たくさんの雨粒が、一色ずつ」.
- câu 100 `w(100,'となり')`: người thứ hai đứng cạnh, cung của họ dịch đi 「となりの人は、別の雨粒の、別の虹」.
- câu 101 `w(101,'副虹')`: cung phụ NGOÀI, màu ĐẢO (`descartes(nm, 2)`) 「副虹：2回反射、色の順が逆」; ảnh `rainbow-double` (h 300) như sf3.
- Tiếng: water (giọt) ×2, beam, spectrum (cầu vồng hiện), telop ×7, photo, tick (người thứ hai).

### G6 · `f4-nanairo` (câu 102–104) — sky · tiếng 6–8

- câu 102 `w(102,'七色')`: DẢI CHUẨN (y 520, cao 96) + 6 vạch ranh trung tính (đều) → 「虹は七色（日本）」 (`must` số ô = 7).
- câu 103 `w(103,'ニュートン')` 「7つに分けたのはニュートン」; `w(103,'ドレミファソラシ')` 7 nhãn 「ド」「レ」「ミ」「ファ」「ソ」「ラ」「シ」 dưới 7 ô.
- câu 104 `w(104,'6色')` vạch xếp lại 5 → 「アメリカ：6色」; `w(104,'5色')` 4 vạch → 「ドイツ：5色」; `w(104,'境目')` mọi vạch tan
  「光そのものには、境目がない」 (mincho).
- Tiếng: spectrum, tick (vạch rơi) ×2, telop ×4.

### G6 · `f5-sora` (câu 105–112) — sky · tiếng 12–18

- câu 105 `w(105,'分子')`: chùm trắng từ trái qua đám phân tử (chấm trung tính), mỗi lần chạm toả tia nhỏ 四方; `w(105,'散乱')` 「散乱」.
- câu 106 `w(106,'短い')`: hai cột 450 / 700 (`chip`), cột 450 cao gấp `RAYLEIGH`; `w(106,'6倍')` 「およそ6倍」 (`must` `Math.round(RAYLEIGH)` = 6).
- câu 107 `w(107,'あちこち')`: tia lam toả từ mọi phía vào mắt; nền trời nhuộm nhẹ `wlCss(470, 0.12)`; 「だから、空は青い」.
- câu 108 `w(108,'紫',1)`: cột 400 cao hơn nữa (không số) 「紫は、もっと強く散乱」; `w(108,'なら')` 「空は紫に？」.
- câu 109 `w(109,'少なく')` 「太陽の光には、紫が少ない」; `w(109,'敏感')` 「目も、紫には敏感でない」.
- câu 110 `w(110,'青')` 「目と脳が『青』と読み取る」 (g4 gọi lại câu này).
- câu 111 `w(111,'夕方')`: Trái Đất cong + lớp khí dày, Mặt Trời thấp: đường dài, tia lam rẽ đi dọc đường, `w(111,'赤')` chỉ đỏ/cam
  tới mắt; câu 112 `w(112,'夕焼け')` 「夕焼け」 (mincho 72).
- Tiếng: beam ×2, telop ×7, tick (cột) ×2, spectrum (hoàng hôn).
- **Ra:** khác ERA (sky → darkroom) → vòng sáng từ lỗ.

### G7 · `g1-ringo` (câu 113–114) — darkroom, mở hồi 6 · tiếng 5–7 · `IMAGES = imgs('sodium-cars')`

**Mở bằng BÀN TÁO** (như a0, ay = 360, knot). `actCard(..., 6)`, title 「リンゴの赤」 `{ act: 6 }`.
- câu 113 `w(113,'白い')`: chùm trắng tách sợi tới táo (ray 420…700); `w(113,'短い')` sợi ngắn + giữa DỪNG ở mặt táo (chấm tối),
  「短い・中くらいの波長：吸収」; `w(113,'長い')` sợi 600–700 dội ra 「長い波長：跳ね返す」.
- câu 114 `w(114,'性質')` 「リンゴが持っているのは、『どの光を跳ね返すか』だけ」; `w(114,'赤い')`: ảnh `sodium-cars` (h 300) + táo thứ hai
  dưới `SODIUM` TỐI hẳn (`apple({ illum: SODIUM, lit: 3 })`) + chip(589); 「『赤い』という感じは、まだどこにもない」.
- Tiếng: (actCues), beam, telop ×2, photo, **suzu 1** (táo tối dưới natri).
- **Ra:** khác ERA (darkroom → eye) → vòng sáng từ lỗ.

### G7 · `g2-kamera` (câu 115–122) — **eye** · tiếng 13–19

Lỗ `'pupil'`. MẮT LỚN `eye(g, 760, 540, 340)` cho câu 115–118, rồi thu về MẮT NHỎ `eye(g, 360, 560, 200)` (nội suy 0.8 s ở `L(118).end`).
- câu 115 `w(115,'3分の2')`: chùm trắng vào giác mạc gãy mạnh; 「角膜：曲げる仕事のおよそ3分の2」 (cung sáng giác mạc).
- câu 116 `w(116,'水晶')`: `thick` 0.2 ↔ 0.8 (thuỷ tinh thể dày/mỏng), điểm hội tụ trượt lên võng mạc 「水晶体：厚みを変えてピント」;
  `w(116,'網膜')` võng mạc sáng (`lit`) 「網膜（スクリーン）」.
- câu 117 `w(117,'桿体')` khung zoom tròn bên phải: hàng tế bào que (thanh trung tính) 「桿体細胞：およそ1億個（暗いところ）」.
- câu 118 `w(118,'錐体')` thêm tế bào nón (hình nón trung tính) 「錐体細胞：およそ500万個（色）」.
- câu 119 `w(119,'錐体')`: mắt thu nhỏ; ĐỒ THỊ ĐƯỜNG NHẠY: trục x = DẢI CHUẨN (x 360 + 3·(nm − 380) dịch sang phải nếu cần, CÙNG chiều) có dải
  phổ mỏng làm trục; ba đường TRUNG TÍNH (nét '@ink' / '@dim', KHÔNG màu) đỉnh `CONES.S/M/L` + `chip` ở đỉnh; nhãn 「短い波長（S）」
  「中くらい（M）」「長い波長（L）」 hiện ở `w(119,'短い')`, `w(119,'中')`, `w(119,'長い')`; '@dim' 「感度（模式図）」.
- câu 120 `w(120,'赤')`: `wrong(「Lは赤のセンサー」)` + `strike` → `w(120,'黄緑')` 「いちばん感じるのは黄緑」 + vạch dọc ở 564.
- câu 121 `w(121,'リンゴ')`: phổ phản xạ táo (`APPLE`) phủ mờ lên trục; ba thanh tín hiệu (BA TÍN HIỆU, `must` L > M > S ≈ 0)
  `w(121,'強く')` L cao, `w(121,'少し')` M thấp.
- câu 122 `w(122,'比べて')` 「脳は、3つの信号を比べている」 (ba thanh nối mũi tên tới hình đầu trung tính nhỏ).
- Tiếng: beam (chùm vào mắt), glass (thuỷ tinh thể), telop ×7, pop ×2 (khung tế bào), tick ×3 (ba đường), **error −4** (strike), step (thanh).

### G7 · `g3-retinal` (câu 123–128) — eye · tiếng 12–18

Mở: MẮT NHỎ + khung zoom võng mạc (nếu đặt `CONTINUES`, khung đầu = khung cuối g2 — chép đúng hàm vẽ cục bộ của g2).
- câu 123 `w(123,'レチナール',1)`: khung zoom lớn: một tế bào, trong đó phân tử retinal (chuỗi gấp khúc trung tính, có MỘT chỗ gập);
  「レチナール」 (mincho 60) + 「小さな分子」.
- câu 124 `w(124,'光子')`: bó `photon` (650 — từ táo) bay vào; `w(124,'まっすぐ')` chỗ gập DUỖI thẳng (nội suy góc) 「折れ曲がった形 → まっすぐ」;
  `w(124,'化学')` 「光が、化学に変わる瞬間」.
- câu 125 `w(125,'ロドプシン')`: chỉ ở tế bào QUE: retinal + vòng protein 「桿体：レチナール＋タンパク質＝ロドプシン」.
- câu 126 `w(126,'タンパク質')`: ba tế bào NÓN cạnh nhau, vòng protein ba dáng hơi khác + `chip` 420/534/564 「組むタンパク質のちがいで、反応する
  波長が決まる」 (KHÔNG ghi ロドプシン cho nón — DNA §9).
- câu 127 `w(127,'信号')`: xung trung tính chạy qua các lớp tế bào võng mạc → `w(127,'視神経')` dây thần kinh → `w(127,'脳')` đầu nhỏ.
- câu 128 `w(128,'網膜')`: chùm sáng DỪNG ở võng mạc (tắt dần phía sau) 「光の旅は、網膜で終わる」; `w(128,'脳')` 「脳の中に、光はない」;
  `w(128,'電気')` 「あるのは、電気と化学の信号だけ」.
- Tiếng: photon, tick (gập → thẳng), telop ×7, pop ×2, beep ×2 (xung, −6).

### G7 · `g4-atama` (câu 129–131) — eye · tiếng 6–8 · `POSES = ['ok']`

- câu 129 `w(129,'3つ')`: BA TÍN HIỆU (cùng tỉ lệ g2) bay vào hình đầu trung tính lớn; `w(129,'比率')` 「脳に届くのは、3つの信号の比率だけ」;
  `w(129,'赤')`: trong đầu hiện chữ 「赤」 (mincho 96, 生成り — chữ KHÔNG màu) + `chip(656)` nhỏ cạnh; 「脳が『赤』をつくり出す」.
- câu 130 `w(130,'空')` thu nhỏ trời f5 (dải trời + 「紫ではなく青」); `w(130,'七色')` thu nhỏ dải f4 với 6 vạch; `w(130,'目')`
  「最後に決めているのは、目と頭」.
- câu 131 `w(131,'物理')`: 「物理の世界：波長と強さだけ」; mascot `ok` (nói, `{ t }`) cx 1640, foot H, h 640 từ `w(131,'物理')` đến hết cảnh;
  `w(131,'色')` 「色は、頭の中にある」 (mincho 72, nửa trái) — xong trước `L(131).end`.
- Tiếng: step (tín hiệu bay), telop ×4, **suzu 1** (「色は、頭の中にある」), pop (hai thu nhỏ — một tiếng).
- **Ra:** khác ERA (eye → darkroom) → vòng sáng từ lỗ.

### G1 · `h1-matome` (câu 132–135) — darkroom, mở hồi 7 · tiếng 8–11

`actCard(..., 7)`, title 「まとめ」 `{ act: 7 }`. THẺ HỨA (cùng tham số a0) hiện hết ngay sau thẻ hồi (`k` 1, `lit` 0.4).
Với i = 0..3 ở câu 132 + i: `w(132+i, '(i+1)つ目')` → `lit[i]` 1, `flip[i]` 0 → 1 trong 0.6 s → `ANSWERS[i]` (kit); bên trái (x 140–900)
hình mini của hồi đó bằng hàm kit (không vẽ mới): ① `wave` + `photon` (`PH_VIO`) ; ② `ladder` mini + `ladderDrop` 3→2 + dải liên tục nhỏ;
③ `specRuler` hẹp (`R` x 160–880, `window: 1`, `labels: 0, pows: 0`); ④ mắt mini (`eye`) + 「赤」 trong đầu nhỏ.
Bám chữ: câu 132 `w(132,'光子')`, câu 133 `w(133,'熱い')`, câu 134 `w(134,'窓')`, câu 135 `w(135,'脳')` — mỗi chữ khoá một vòng sáng
quanh phần tương ứng của mini.
- Tiếng: (actCues), card ×4 (lật), hole/beam ×2–3 (khe sáng), **suzu 1** (thẻ ④, −4 — trong trần G1).
- **Trạng thái cuối** (từ `L(135).end`): bốn thẻ lật hết, `lit` 1, mini ④ — giữ yên tới hết (khung này h2 vẽ lại).

### G1 · `h2-next` (câu 136–138) — **day** · tiếng 6–8 · `POSES = ['wave']` · `CONTINUES = true` (bắt buộc)

Kết bài DNA §7: 雨戸 khép trên cảnh cũ rồi MỞ HẾT ra ánh ngày. Trang cắt thẳng (CONTINUES) → h2 tự làm:
khung h2 ở `t = FROM` = khung cuối h1 (hàm cục bộ `h1Final(g, t)` chép GIỐNG HỆT vào cả hai file — so pixel), rồi
`amado(g, 0 → 1, { from: 'left' })` trong [FROM, FROM + 0.45], rồi `ground(g, 'day')` + `amado(g, 1 → 0, { from: 'right' })` trong
[FROM + 0.45, FROM + 1.4]. Chữ nền ngày: `color: '@dark', shadow: false`.
- câu 136 `w(136,'虹')` 「次に虹を見つけたら」; `w(136,'背')` hình người nét '@dark' (không phải mascot) quay lưng Mặt Trời
  trái; `w(136,'影')` bóng đầu trên đất 「太陽に背を向けて、頭の影を探そう」.
- câu 137 `w(137,'中心')`: CẦU VỒNG TRÒN quanh bóng đầu (đỏ ngoài, tím trong; nét `wlCss`, `source-over`); `w(137,'皆さん')` 「皆さんだけに見えている虹」.
- câu 138 `w(138,'ご視聴')`: hình thu sang trái/mờ; biển GIỮA khung 「99の発見」 (mincho 96) + 「チャンネル登録」 (52) đứng YÊN ≥ 4 s tới
  hết trang; mascot `wave` (nói `{ t }`) cx 1620, foot H, h 620 từ `w(138,'ご視聴')`.
- Tiếng: amado ×2 (khép −4, mở — ngoài chuyển cảnh, đã trong trần G1), telop ×3, shimmer (cầu vồng hiện), pop (biển).

## Tiếng (DNA §10 — DÀY: mỗi cảnh ⌈dur ÷ 4⌉ ≤ số tiếng ≤ ⌊dur ÷ 2.5⌋; lặng dài nhất ≤ 4 s; MỖI テロップ chính một tiếng)

Dùng `cue(t, 'nghĩa', db?)` của kit (`SND`): hole/photon/step → tick · beam/spectrum → shimmer · arrive → beep · glass/prism/water → glass ·
electron/zap → zap · fail → error · aha/nobel → suzu · photo/page → page · telop → pop · card → card · wave → whoosh.
Không hai tiếng trong 0.25 s; không tiếng cho chuyển động phụ; テロップ '@dim' không tiếng; KHÔNG thêm tiếng ở FROM (trang có).
Chuyển cảnh: cùng ERA `amado` (trang tự đặt), khác ERA `whoosh-long`, CONTINUES im.

Hạn mức loại hiếm — hàng của nhóm bạn (cộng cả video = trần):

| nhóm (cảnh) | error | suzu | zap | beep | impact (ngoài actCues) | amado (ngoài chuyển cảnh) | correct |
|---|---|---|---|---|---|---|---|
| G1 a0 h1 h2 | 0 | 1 (h1 thẻ ④) | 0 | 0 | 0 | 2 (h2 khép + mở) | 0 |
| G2 b1 b2 b3 b4 | 1 (b2 strike) | 1 (「光は、波だ」) | 0 | ≤ 4 (b4 vân) | 0 | 0 | 0 |
| G3 c1 c2 c3 | 3 (c2 「1個も出ない」, c2 strike, c3 1000 quả) | 1 (Nobel 1921) | ≤ 5 | 0 | 0 | 0 | 0 |
| G4 d1 d2 d3 | 0 | 1 (Nobel 2014) | 0 | 0 | 0 | 0 | 0 |
| G5 e1 e2 e3 e4 | 1 (e2 strike) | 1 (「窓」) | 0 | ≤ 1 (Wi-Fi) | 0 | 0 | 0 |
| G6 f1 … f5 | 0 | 1 (lăng kính thứ hai) | 0 | 0 | 0 | 0 | 0 |
| G7 g1 g2 g3 g4 | 1 (g2 strike) | 2 (táo natri, 色は頭の中) | 0 | ≤ 2 (xung g3) | 0 | 0 | 0 |
| **TỔNG** | **6** ≤ 6 | **8** ≤ 8 | **≤ 5** | **≤ 7** | **0** | **2** | **0** |

Mọi gạch hiểu lầm (`strike`) = `error −4`, cùng một tiếng ở cả bốn chỗ (b2, c2, e2, g2) — "cùng chuyển động, cùng tiếng" (SFX.md).
(§51, §55, §66, §99. Sau khi gộp, đạo diễn đếm lại cả hai trang bằng `shoot.js cues`.)

## Kiểm trước khi báo xong (chạy từ gốc repo `<repo>`)

1. **Chạy khô** — mã 0 (mọi khung, kể cả khung chuyển tiếp mà ảnh chụp không trúng — §70):
   `node engine/render/shoot.js check --page "projects/ja/hikari/p2.html?plates=<cảnh của bạn>"` (a0: `p1.html?plates=a0-open`).
2. **Chụp và NHÌN.** **`--t` là giờ TRANG = giờ timeline + LEAD (p2 +3.0, p1 +0.6 — build.json)**; truyền thẳng giây timeline là chụp
   sớm 3 s (§102). Mỗi cảnh: FROM + 0.3, START − 0.6, MỖI câu một khung (giữa câu), KẾT + 1.2 (khung trong chuyển cảnh sau), và
   FROM + 0.45 của cảnh đầu nhóm khi nạp CẢ cảnh trước (`?plates=<cảnh trước>,<cảnh của bạn>` nếu cảnh trước đã có). Lệnh in danh sách
   giờ trang (START − 0.6, giữa từng câu, KẾT + 1.2) cho câu a..b — tự cộng thêm FROM + 0.3 + LEAD:
   ```bash
   python3 -c "import json,sys;p,a,b=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]);d=json.load(open(f'projects/ja/hikari/data/{p}.timeline.json'))['lines'];L={'p1':0.6,'p2':3.0}[p];t=[d[a]['start']-0.6]+[(x['start']+x['end'])/2 for x in d[a:b+1]]+[d[b]['end']+1.2];print(','.join(f'{v+L:.2f}' for v in t))" p2 23 28
   node engine/render/shoot.js stills --page "projects/ja/hikari/p2.html?plates=<cảnh>" --t <danh sách> --outdir out/_lab/hikari/<cảnh>
   python3 tools/qa/sheet.py out/_lab/hikari/<cảnh> out/_lab/hikari/<cảnh>.jpg
   ```
   Tên file ảnh là giờ TRANG; báo cáo ghi cả hai giờ. MỞ ít nhất 3 khung mỗi cảnh ở độ phân giải gốc (Read .png), sửa đến khi không còn:
   chữ chạm mép / đè mascot / chồng chữ / đè vùng tiêu đề; chữ trên vùng sáng thiếu `plate`; khung trống; > 3 s không có gì mới;
   màu có sắc không phải ánh sáng; trục λ ngược; số sai. `[PAGE ERROR]` = lỗi JS.
3. **Đếm tiếng** theo cảnh (giờ trang):
   ```bash
   node engine/render/shoot.js cues --page "projects/ja/hikari/p2.html?plates=<cảnh của bạn>" --out out/_lab/hikari/<nhóm>-cues.json
   python3 -c "import json,sys,collections as C;c=json.load(open(sys.argv[1]));B=[float(v) for v in sys.argv[2:]];[print(f'{B[i]:.2f}-{B[i+1]:.2f}:',len(s),'tiếng · lặng dài nhất',round(max(y-x for x,y in zip([B[i]]+[q['t'] for q in s],[q['t'] for q in s]+[B[i+1]])),1),'s ·',dict(C.Counter(q['kind'] for q in s))) for i in range(len(B)-1) for s in [[q for q in c if B[i]<=q['t']<B[i+1]]]]" out/_lab/hikari/<nhóm>-cues.json <FROM trang cảnh 1> … <FROM trang cảnh sau nhóm>
   ```
   (FROM trang: cột bảng nhóm — sau redo lệch ≤ 1 s, không sao.) Mỗi cảnh trong trần; lặng ≤ 4 s; loại hiếm ≤ hàng nhóm.
   Với `?plates=` chỉ cảnh của bạn, cảnh ĐẦU nhóm thiếu tiếng chuyển cảnh vào (+1) — tính thêm khi so trần.
4. `python3 tools/qa/lookups.py ja/hikari` — không còn "LẶP" chưa xử lý ở cảnh của bạn.
5. `grep -nE "\b(1[0-9]|2[0-7])px|size: ?(1[0-9]|2[0-7])\b" projects/ja/hikari/plates/<cảnh>.js` — chỉ được còn số mũ (`pow10`) (§95);
   `grep -nE "Math.random|Date.now|performance.now|ctx.filter|fillText" …` — rỗng.
6. Không sửa file ngoài `plates/<cảnh của bạn>.js` (và ảnh trong `out/_lab/`). KHÔNG commit. KHÔNG `pkill -f`/`killall` (§19, §98) —
   dừng tiến trình theo PID. Không gọi OmniVoice, không render video.

## Báo cáo (≤ 15 dòng, tiếng Việt)
File, đường dẫn tờ ảnh, số tiếng theo loại từng cảnh (và trần), `CONTINUES` đã đặt (nếu có, kèm bằng chứng so pixel), hàm cục bộ
nên gom vào kit, chỗ còn băn khoăn (nhất là chỗ brief mâu thuẫn với kit/CONTENT).
