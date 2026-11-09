# DNA của `ja/hikari` — 「なぜ世界は見えるのか ― 光の正体」 (video bài học, lời đọc tiếng Nhật, kênh 99の発見)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md` v2 đã duyệt). Người dùng chọn (2026-10-14): **A「節穴の暗室」** trong 3 hướng của
> `research/R3-visual.md` §2 (mượn của C đồ vật đời thường trong phòng — 麦茶, táo trên 卓袱台, cầu vồng qua 雨戸 mở; mượn của B
> MỘT thước nm duy nhất). Engine 2D. Kit: `kit.js` (luật đo được giữ bằng code — LESSONS §95); bàn thử + khung phong cách:
> `kit-test.html`, `BRIEF-LAB.md`, ảnh `out/_lab/hikari/sf/`. Kênh Nhật: tiếng DÀY (~1 / 3 s), chữ Nhật ≥ 28 px, ≤ 3 s không có
> テロップ / vật mới, phần tử chính hiện từ FROM + 0.3 (§95, §96).

## 1. Ý trung tâm — "không có gì tồn tại trên hình cho tới khi ánh sáng chạm tới nó"

Cả bài diễn ra trong MỘT căn phòng Nhật tối đóng 雨戸. Ánh sáng chỉ vào qua một **LỖ** ở bức tường bên trái (mặt cắt, x 0–92 —
`WALL_X`), thành chùm trong không khí có bụi. Vật, sơ đồ, cả mascot chỉ hiện ở nơi chùm sáng tới — chính là luận điểm của bài
("thấy" = ánh sáng tới được mắt). Phòng tối có lỗ = buồng tối của Ibn al-Haytham = phòng của Newton = chính con mắt (hồi 6).

**Vật xuyên suốt: LỖ (`kit.aperture`)** — luôn ở tường trái, chùm luôn đi từ trái sang phải:

| hồi | lỗ là | kit |
|---|---|---|
| mở bài | 節穴 (lỗ mắt gỗ) → chùm tới quả táo trên 卓袱台; mục lục = bốn khe → bốn chùm chiếu bốn thẻ ①②③④ | `aperture('knot')`, `promiseCards` |
| 1 光をめぐる論争 | 節穴 → ba lỗ (ba ngọn đèn của Ibn al-Haytham: che một đèn, tắt một vệt) → **hai khe Young** | `'knot'`, `'lamps'`, `'double'` |
| 2 波でもあり、粒でもある | khe → tấm kim loại natri đón photon (lab) | `'slit'` |
| 3 光はどこで生まれるのか | khe kính quang phổ (dấu vân tay H / Na / Ne) | `'slit'`, `spectrumStrip(lines)` |
| 4 見えない光 | **khe "thấy được" trên thước phổ log** — lỗ chính là dải hẹp ta nhìn qua | `specRuler({ window })` |
| 5 曲がる光、ほどける白 | cửa sổ hẹp có lăng kính trên bậu; cầu vồng: 雨戸 mở một nửa ra trời sau mưa (ERA `sky`) | `'window'`, `raindrop` |
| 6 色は頭の中にある | lỗ thành **đồng tử** — phòng thành nhãn cầu, tường sau = võng mạc (ERA `eye`) | `'pupil'`, `eye()` |
| まとめ / 次回 | bốn thẻ lật ra câu trả lời; **mọi 雨戸 trượt mở**, ánh ngày tràn vào (ERA `day` — lần DUY NHẤT nền sáng) | `promiseCards({ flip })`, `amado(…, { from: 'right' })` |

- **Mục lục lời hứa** = bốn khe trên tường, bốn chùm chiếu lên bốn thẻ ①②③④ (`QUESTIONS`), dùng lại ở まとめ lật ra `ANSWERS`.
- **Gạch hiểu lầm → sửa:** chữ sai '@dim' + một nét gạch xám (`wrong` + `strike`), chữ đúng ngay dưới. KHÔNG đỏ (đỏ là một bước
  sóng). Chỗ dùng: 「目から光が出る」→「目は受け取るだけ」 (b2) · 「明るくすれば電子が出る」→「波長で決まる」 (c2) · 「Lは赤のセンサー」→
  「いちばん感じるのは黄緑」 (g2) · 「水だけを狙った周波数」→「水の分子をゆさぶる」 (e2).

## 2. Chất liệu / màu — MÀU = ÁNH SÁNG

- phòng `#0B0B0E` · kết cấu (柱, 長押, mép tatami, ván 雨戸) `#1E1C19` ≈ 1.2:1 — chỉ là kết cấu, không mang thông tin.
- chữ 生成り `#EDE8DF` (16:1 trên phòng) · chữ phụ `#9A958C` (≥ 5.2:1 trên phòng, kết cấu, tấm, trời) · ánh ngày `#EFEAE0` + mực
  `#23211F` (13.4:1). Tất cả đo bằng `needC` trong kit, ném lỗi < 4.5.
- **Mọi màu có sắc = ánh sáng, đi qua `wl2rgb(nm)`** (bảng CIE 1931 2° 5 nm nhúng trong kit, 380–780). `must` kiểm sắc độ:
  700/656 đỏ, 589 vàng cam, 546 lục, 486 lam lục, 450 lam, 434 lam tím, 380 tím. Ánh trắng = `'white'` (tổng các sợi).
  Dải phổ mờ ở hai đầu (`eyeFade`). Lõi chùm sáng hơn (pha 30–50% trắng; xanh–tím 430–470 nhiều hơn vì chỉ 2.6–3:1 trên đen).
- **Không màu nhấn cho UI**: ①②③④, ✓, ✗, khoanh, mũi tên = trung tính; nhấn bằng độ sáng, cỡ, vòng mảnh 生成り.
  `ink()` ném lỗi khi nhận hex có sắc. Nhãn không bao giờ mang màu phổ → `chip(nm)` (chấm sáng) cạnh nhãn 生成り.
- Màu mặt vật = phản xạ × nguồn (`surfaceRgb(refl, illum)`): táo đỏ dưới ánh trắng, **tối hẳn dưới đèn natri** (`must`).
- Ảnh: chân dung / hiện vật → in đơn sắc ấm; **ảnh ánh sáng thật** (cầu vồng, ống khí, quang phổ, natri, hoa UV) GIỮ màu.
- Chống dải màu H.264: `grain(g, t)` phủ cuối mỗi khung (tất định, đổi theo khung).
- ERA: `darkroom` (mặc định) · `lab` (phòng tối + thước nm mờ — hồi 2–3) · `sky` (trời sau mưa qua 雨戸 mở — hồi 5 cầu vồng, hoàng
  hôn) · `eye` (tường sau cong như võng mạc — hồi 6) · `day` (kết).

## 3. Chữ

- Shippori Mincho 700: tiêu đề cảnh, thẻ hồi, từ khoá (`telop({ mincho })`). Noto Sans JP: nhãn, số, công thức, đơn vị.
- **Chữ hiện bằng ánh sáng** (`write`): một vệt sáng quét từ trái, chữ lộ ra nơi vệt đi qua và ở lại (mặt nạ sáng, không fade).
- Font thiếu (fontTools, 2026-10-14): **Noto thiếu ⁰ ⁵–⁹ ⁻ ₀–₃ ✗**; **Shippori thiếu thêm λ ν γ ⊥ ≈ ∝ μ ℏ θ π ∞ ≠ √ ℃ ✓**. Luỹ thừa của
  10 → `pow10()` (số mũ nâng, miễn cỡ); kit `guard` ném lỗi khi gõ ký tự thiếu.
- テロップ ≥ 28 px (kit ném lỗi), vùng an toàn x 96–1824, y 64–1016 (kit ném lỗi). Chữ đặt trên vùng sáng → `plate()` tối sau chữ.
- **Kicker mỗi hồi** từ `ACTS` (「第四幕　見えない光」 28 px '@dim' trên tiêu đề — `title({ act })`), cảnh không tự viết.
- Mọi trục bước sóng chạy **ngắn → dài, trái → phải** (tím trái, đỏ phải; thước log 10⁻¹² m trái → 10³ m phải) để zoom từ thước
  vào khe không lật chiều.

## 4. Nhịp

Hình bám từ được đọc (`w(i, '…')`); mỗi câu ≥ 1 thay đổi; ≤ 3 s không có テロップ / vật mới; phần tử chính từ FROM + 0.3.
Chùm sáng "bay" tới (k của `ray` / `shaft`) là chuyển động mặc định khi vật mới xuất hiện — vật hiện khi chùm chạm.

## 5. Nhân vật

Mascot đứng trong vệt sáng (`figure({ lit })`: quầng sáng trên tường sau, ánh viền ấm phía lỗ), một bên khung, chân chạm đáy,
chữ ở nửa kia, không đè tường 雨戸 (kit ném lỗi). NÓI (`{ t }`) chỉ khi tư thế có trong `mouths.js` (ponder, point, ok, wave,
calculator). 6 lần:

| cảnh | tư thế | nói | khoảnh khắc |
|---|---|---|---|
| a0 | `ponder` (lật, nhìn táo) | ✓ | 「それを『見る』と呼んでいます」 (khung SF1) |
| a0 | `point` | ✓ | mục lục bốn thẻ |
| c2 | `startled` | — | 「どんなに明るくしても、電子は1個も出てきません」 |
| e1 | `pointer` | — | que chỉ vào khe thấy được trên thước |
| g4 | `ok` | ✓ | 「色は、頭の中にあるのです」 |
| h2 | `wave` | ✓ | 次回 + biển kênh |

## 6. Intro

a0 kết ở 「最後の答えは、思いがけない場所にあります」: 節穴 khép lại (open 1 → 0), phòng về đen → intro 漆と金 (đen–đen).
p2 mở từ đen: một chấm sáng ở lỗ, chùm vươn ra (b1).

## 7. Camera / chuyển cảnh (`kit.transition`, trang gọi)

- **Cùng ERA:** 雨戸 KHÉP (ván gỗ trượt từ trái phủ cảnh cũ, 0.45 s; ván kín vẫn rò vài điểm sáng) rồi MỞ (trượt tiếp sang phải
  lộ cảnh mới, 0.45 s). Tiếng: một tiếng gỗ trượt.
- **Khác ERA:** **vòng sáng mở từ lỗ** (`WIPE` mặc định = `APT`), viền loé sáng.
- Trong cảnh: zoom nhẹ ≤ 1.6× (`zoom` ném lỗi). Ngoại lệ DUY NHẤT: cuối ACT 4 camera lao vào khe thấy được của thước (e4 → hết
  hồi), viết riêng trong cảnh đó.
- Kết bài: 雨戸 mở hết (`amado(1 → 0, from 'right')`) → ERA `day`.

## 8. Ảnh (`assets/history/INDEX.md`, `kit.PHOTOS` / `imgs()`)

Ảnh được một luồng sáng rọi (mở từ tâm, mép tối dần) — không khung bạc, không trượt. Nhãn tiếng Nhật + credit LUÔN dưới ảnh.
Ibn al-Haytham chỉ có tranh tưởng tượng → nhãn 「想像図」 (đã trong PHOTOS). Ảnh nhỏ có `maxH` (alhazen-eye ≤ 480, young-fig442 ≤ 380,
maxwell ≤ 640). Tranh Grusche = 「想像画」. Không logo Nobel (huy chương nếu cần thì vẽ trơn, trung tính).

## 9. CẤM

- Màu có sắc không đến từ một bước sóng (UI, nhấn, "đúng/sai" màu). Đỏ cho "sai".
- Số vật lý gõ tay trong cảnh: λ, eV, góc, 5.86×, 544 nm, 8分19秒, 2%, 12.2 cm… phải lấy từ kit (đã `must`) — `H_LINES`, `NA_EDGE`,
  `eV()`, `descartes()`, `RAYLEIGH`, `SUN_S`, `VIS_FRAC`, `LAMBDA()`, `CONES`.
- Vẽ nón L như "cảm biến đỏ" (đỉnh 564 nm, vàng lục); "rhodopsin trong tế bào nón"; "2.45 GHz là tần số cộng hưởng của nước".
- Tia sơ đồ mảnh < 4 px (`ray` ném lỗi); chữ trong quầng sáng không có tấm; luỹ thừa gõ bằng ký tự ⁰⁵–⁹⁻.
- Phóng đại góc tán sắc mà không ghi 「角度は強調」.
- `Math.random`, `Date.now`, `ctx.filter` lúc vẽ khung (chỉ lúc nạp).

## 10. Tiếng — DÀY (~1 / 3 s), trần mỗi cảnh: thời lượng ÷ 4 ≤ số tiếng ≤ thời lượng ÷ 2.5, lặng dài nhất ≤ 4 s (§99)

Bảng nghĩa → loại ở `kit.SND` (chỉ loại có trong `assets/sfx/library.json`):

| chuyển động | loại |
|---|---|
| 雨戸 khép/mở (chuyển cảnh cùng ERA) | `amado` (trang đặt `TRANSITION = 'amado'` / mặc định của trang) |
| lỗ mở, khe mở | `tick` |
| chùm sáng vươn tới / dải phổ bung | `shimmer` |
| photon tới đích, chấm sáng trên màn (Young) | `tick` / `beep` (rất nhỏ) |
| electron bật khỏi kim loại | `zap` |
| "không có electron nào" | `error` nhẹ |
| lăng kính, cốc nước, giọt mưa | `glass` |
| a-ha (táo tối dưới natri, 色は頭の中) / Nobel | `suzu` |
| ảnh lịch sử | `page` |
| テロップ chính | `pop` (テロップ phụ '@dim' không tiếng) |
| thẻ hồi | `impact` nhẹ + `shimmer` (`actCues`) |
| bước bậc năng lượng | `tick` |

Đã thêm 2026-10-14 (OpenGameArt CC0, `assets/sfx/SOURCES.md`): `amado/01–02` (ngăn kéo gỗ trượt — chưa có bản 雨戸 thật),
`zap/01` (tia lửa 0.22 s). Người dùng chưa nghe duyệt.

## 11. Vật dùng chung giữa các nhóm (LESSONS §71 — hằng số + hình học ĐÃ ở kit)

`APT`/`WALL_X`/`FLOOR` (lỗ, tường, sàn) · `aperture` · `amado` · `ray`/`shaft`/`spot`/`photon`/`wave` · `spectrumStrip` (380–780,
vạch `H_LINES`/`NA_LINES`/`NE_LINES`) · `specRuler` + `RULER`/`BANDS`/`pow10` · `ladder`/`ladderDrop` (hydro đúng tỉ lệ eV, gãy trục
n = 1) · `raindrop`/`dropRay`/`descartes`/`angleArc` · `eye` · `apple`/`chabudai`/`surfaceRgb`/`SODIUM` · `promiseCards` · `photo`.
**Chuỗi nhân quả phải lần theo qua các cảnh (§103):** bước sóng ngắn = năng lượng lớn = tím = bên TRÁI mọi trục λ = cong NHIỀU
hơn trong lăng kính = vòng TRONG cầu vồng (40.6°) = vượt ngưỡng natri 544 nm. Đỏ: ngược lại toàn bộ.

## 12. Danh sách cảnh (một mục `##` = một file cảnh; a0 ở p1, còn lại p2)

| cảnh | ERA | FROM (câu đầu) | hiện |
|---|---|---|---|
| a0-open | darkroom | 今この瞬間も、毎秒何十兆個もの光の粒が… | phòng đen → 節穴 mở, chùm vươn tới táo trên 卓袱台 (SF1); bó sóng nhiều màu bay trong chùm (trắng = mọi màu); 「毎秒 何十兆個」; 1億5000万km · `SUN_S` 8分19秒; đường đi Mặt Trời → không khí → vật → mắt (log); mascot `ponder`; 物理・化学・脳 rơ-le (ba vệt sáng nối nhau); bốn khe → bốn thẻ ①②③④ (`point`); 節穴 khép → đen |
| b1-me-kara | darkroom | 「光とは何か」。人類は、2000年以上も前から… | thẻ hồi 1; hai bảng: mắt phát tia (nét đứt, `wrong`) / vật bong 「写し」 bay vào mắt; 「近かったのは、あとのほう」 |
| b2-ukeru | darkroom | 11世紀のはじめ、イラクのバスラ生まれの学者… | ảnh `alhazen-hevelius` (想像図); mặt trời chói → mắt đau; nguồn → vật → mắt (ba mũi tên); thí nghiệm ba lỗ (`'lamps'`): che một đèn → tắt một vệt; 「目から光が出る」 gạch → 「目は受け取るだけ」 |
| b3-tsubu-nami | darkroom | 17世紀、アイザック・ニュートンは… | ảnh `newton`, `huygens`; hạt bay thẳng / gợn sóng tròn; hai chùm cắt nhau đi xuyên qua nhau (hai mắt nhìn nhau); 18世紀: 「粒」 thắng (cân nghiêng) |
| b4-young | darkroom | 1801年から1803年にかけて、イギリスのトマス・ヤングが… | `'double'`; mặt sóng từ hai khe, sáng–tối; màn: dự đoán hạt (hai vạch, mờ) vs vân hiện dần từng chấm (`hash` + nghịch đảo CDF của I(y)); Δy = λL/d = 5.2 mm (`must`); ảnh `young`, `young-fig442`; 1819 フレネル; 「光は、波だ」 |
| c1-denjiha | lab | 光が波なら、何が揺れているのでしょうか。 | thẻ hồi 2; sóng điện từ 3D chiếu: E đứng, B ngang, cùng pha, ⊥ hướng đi (nhãn 電場 / 磁場 / 進む向き); ảnh `maxwell` · 1860年代 |
| c2-kouden | lab | ところが、19世紀の終わり、波では説明できない… | tấm natri; hai núm 明るさ / 波長; đỏ ×10 → 0 electron (`startled`); tím yếu → electron bật ngay; ngưỡng `NA_EDGE` 544 nm trên dải; gạch 「明るくすれば…」 |
| c3-einstein | lab | 1905年、アインシュタインが、答えを出します。 | `photon` mỗi bó nhãn eV (`eV()`: 1.77 / 2.76); tường cao 2.28 eV, bóng yếu ×1000 không qua, bóng mạnh qua; ảnh `einstein-1921`; 1921 ノーベル物理学賞 + nguyên văn lý do; 1922年11月 · 日本へ (con tàu vẽ đơn giản); 「波のように / 粒のように」 |
| d1-kaidan | lab | 光の生まれ方は、大きく2つあります。 | thẻ hồi 3; `ladder` hydro; electron nhảy lên, rơi 3→2 phát 656 nm (`ladderDrop`), rồi 4→2, 5→2, 6→2; vân tay H / Na / Ne (`spectrumStrip(lines)`) cạnh ảnh `tube-h`, `tube-ne`, `sodium-street`, `spectrum-na`; LED / màn hình (vẽ) |
| d2-aoi-led | lab | 赤いLEDは、1960年代からありました。 | ba bậc rộng dần: đỏ, lục, LAM (khe lớn nhất = năng lượng lớn nhất); 赤崎・天野・中村 (chữ, không ảnh) 2014; R+G+B → trắng |
| d3-netsu | lab | 2つ目の生まれ方は、「熱」です。 | vật nóng phát dải LIÊN TỤC; Mặt Trời 1500万度 (lõi) vs 5500度 (bề mặt); ngọn nến: thân vàng = muội than, chân lam = phân tử |
| e1-hitonigiri | darkroom | 目に見える光は、波長でいうと、およそ380から780ナノメートル。 | thẻ hồi 4; **SF2**: `specRuler` với khe sáng, dải 380–780 nở ra phía trên; `pointer`; 「ほんの細いすき間」 (`VIS_FRAC` ≈ 2%) |
| e2-denpa | darkroom | いちばん長いのは電波。 | thước trượt sang phải; 電波時計 5–7.5 km (`LAMBDA`); マイクロ波 Wi-Fi / 電子レンジ 12.2 cm; E đảo chiều 24億5000万回; gạch 「水だけを狙った」 |
| e3-sekigai-shigai | darkroom | 赤外線は、温かいものなら何でも出していて… | người phát IR (hình bóng xám — KHÔNG giả màu nhiệt); UVA/UVB/UVC, ôzôn; ảnh `mimulus-uv` |
| e4-x-gamma | darkroom | さらに短いのが、X線。 | bàn tay X (xương, trung tính); gamma 数十万〜100万倍; 「すべて同じ電磁波」 → camera lao vào khe; "窓": phổ Mặt Trời đỉnh trong khe, khí quyển trong suốt, retinal |
| f1-kussetsu | darkroom | 空気から水へ、空気からガラスへ入るとき… | thẻ hồi 5; mặt sóng vào nước gãy, λ/1.33; xe vào cát; đũa trong cốc 麦茶 |
| f2-hodoku | darkroom | 水やガラスの中の光の速さは、色ごとに少しちがいます。 | `'window'` + lăng kính trên bậu; trắng → quạt màu (ghi 「角度は強調」 nếu phóng); experimentum crucis: một màu qua lăng kính thứ hai không tách nữa; ảnh `newton-crucis` (想像画) |
| f3-niji | sky | 虹では、プリズムのかわりに雨粒が… | **SF3**: `raindrop` 42.4° / 40.6°; người đứng quay lưng Mặt Trời, bóng đầu = tâm, nón 42°; mỗi giọt một màu tới mắt; 副虹 (refl 2, 50–54°), ảnh `rainbow-double` |
| f4-nanairo | sky | 日本では、「虹は七色」と習います。 | dải liên tục bị vạch ranh 7 / 6 / 5 (Nhật / Mỹ / Đức) rồi vạch tan — 「境目がない」 |
| f5-sora | sky | 空気の分子にぶつかった光は、四方へ散らされます。 | phân tử tán xạ; cột 450 vs 700 = `RAYLEIGH` 5.86 → 「およそ6倍」; vì sao không tím (ít tím + mắt kém nhạy); đường dài lúc hoàng hôn |
| g1-ringo | darkroom | 白い光が当たると、リンゴは… | thẻ hồi 6; sợi trắng tới táo, sợi ngắn/giữa dừng, sợi đỏ dội ra; ảnh `sodium-cars` + táo dưới `SODIUM` tối hẳn (`suzu`) |
| g2-kamera | eye | 光を曲げる仕事の、およそ3分の2は… | `eye()` (giác mạc, thuỷ tinh thể dày/mỏng, võng mạc, hố trung tâm, thần kinh); 1億 que / 500万 nón; đường nhạy S/M/L ở 420/534/564 (`CONES`) trên trục 380–780; đầu dò táo: L cao, M thấp, S≈0; gạch 「Lは赤」 |
| g3-retinal | eye | 細胞の中で光を受けとめるのは… | retinal gập → duỗi (hai khung phân tử); ロドプシン (que); xung điện đi ra thần kinh; ranh: chùm tắt ở võng mạc, chỉ còn xung |
| g4-atama | eye | 脳に届くのは、3つの信号の比率だけ。 | ba thanh tỉ lệ → 「赤」 hiện trong đầu mascot (`ok`, nói); 空は青 / 七色 → 目と頭 |
| h1-matome | darkroom | 1つ目。光は、電場と磁場の波であり… | thẻ hồi 7; bốn khe sáng lại, thẻ ①②③④ lật ra `ANSWERS` |
| h2-next | day | 次に虹を見つけたら、太陽に背を向けて… | 雨戸 mở hết, ánh ngày; bóng đầu + vòng cầu vồng của riêng mình; mascot `wave` (nói); biển 「99の発見」+「チャンネル登録」 giữa, đứng yên ≥ 4 s |

## 13. Kit rules (giữ bằng code trong `kit.js`, không bằng lời)

1. `ink()` — chữ/nét chỉ trung tính; hex có sắc → ném lỗi. Màu có sắc chỉ qua `wl2rgb`/`ray`/`shaft`/`spot`/`chip`/`spectrumStrip`/`specRuler`/`surfaceRgb`.
2. `guard()` — chữ Nhật < 28 px, ký tự font thiếu → ném lỗi; `safeBox()` — ra ngoài vùng an toàn → ném lỗi.
3. `ray()` — w < 4 px → ném lỗi; quầng 'lighter' alpha thấp (chồng không cháy trắng).
4. `zoom()` > 1.6× → ném lỗi. `figure()` đè tường 雨戸 → ném lỗi; tư thế không có miệng → im dù có `t`.
5. `photo()` — key ngoài `PHOTOS` / chưa nạp / vượt `maxH` → ném lỗi; nhãn + credit luôn vẽ.
6. Hằng vật lý + `must` lúc nạp kit: CIE đủ 81 mẫu; sắc 8 bước sóng; Balmer 656.1/486.0/433.9/410.1; mức H; 544 nm, 1.77/2.76/3.26 eV;
   8分19秒; 5.86; 2.1%; 12.2 cm, 7.5/5 km; cầu vồng 42.5/42.4/42.1/41.5/40.6 và phụ 50.1/53.6; lần tia `dropRay` = `descartes`;
   táo đỏ dưới trắng, tối dưới natri; tương phản mọi cặp chữ/nền và lõi chùm 430–470 ≥ 4.5.
7. `ACTS` / `QUESTIONS` / `ANSWERS` / `SND` một nguồn; `cue(t, 'nghĩa')`.

## 14. Chỉ số sàn

Đặt sau khi có p2 thô (§28). Dự kiến YDIF thấp (nền đen tĩnh) — không bù bằng rung nền; camera chỉ đi khi có vật lớn (thước, giọt mưa).
