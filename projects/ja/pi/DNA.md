# DNA của `ja/pi` — 「円周率の正体 ― なぜπは3.14なのか」 (video bài học, lời đọc tiếng Nhật, kênh 99の発見)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md` đã duyệt 2026-10-10). Người dùng chọn (2026-10-10): **C「天球」 —
> trời đêm chàm, khí cụ thiên văn đồng thau**, trong 3 hướng (`styleframes-compare.jpg`), **mượn một tấm 算額** của
> hướng B cho đoạn 和算. Bàn thử: `tools/lab/tenkyu.html` (khung chuẩn), `tools/lab/sangaku.html` (算額). Engine 2D.
> Kênh Nhật: tiếng hiệu ứng DÀY HƠN kênh Anh (`channels/ja/CHANNEL.md`).

1. **Ý trung tâm — π là số của SỰ QUAY, đo bằng khí cụ.** Trời đêm chàm 藍 quay quanh cực; người xưa đo góc bằng khí cụ
   đồng thau khắc vạch (渾天儀/天球儀, mặt đồng hồ cơ cao cấp). Cả bài là một bàn thiên văn: mỗi phép dựng (đa giác,
   radian, bóng, phép chia) là một vành / kim / thước đồng thau khắc vạch, mọi số khắc. Cùng gia đình với intro 漆と金
   (vàng trên nền tối, son), nhưng đêm chàm thay sơn mài.
   - **Vật xuyên suốt: MỘT VÀNH ĐỒNG THAU khắc 360 vạch** quanh một đường tròn chỉ vàng mảnh (`kit.ring360`):

     | hồi | trạng thái của vành |
     |---|---|
     | mở bài | vành lơ lửng trong đêm, kim quay chậm; "3.14" khắc lên vành; mục lục 3 câu hỏi = ba vạch son trên vành |
     | 1 はさみうち | đường tròn trong vành bị kẹp giữa đa giác nội tiếp (đồng) và ngoại tiếp (thép) 6 → 96 |
     | 2 回転 | kim quay từ tâm; cung son nửa vòng = π; bóng chiếu lên thước 壁 thành sóng |
     | 3 終わらない | chữ số π khắc chạy quanh vành như vạch giây, rồi xoắn ra ngoài, không lặp |
     | 4 曲がった空間 | vành thành xích đạo của 天球 (quả cầu), đo qua cực → C/d = 2; vặn theo 馬の鞍; bị hố đen bẻ |
     | まとめ | 天球儀 lắp đủ vòng — mỗi đáp án khắc trên một vòng |
   - **Mục lục lời hứa** = ba vạch son trên vành, mỗi vạch kéo ra một テロップ câu hỏi (①②③), dùng lại ở thẻ hồi
     ("問① の答え" …).
   - **Gạch hiểu lầm → sửa:** chữ sai khắc THÉP MỜ, một vạch thép gạch ngang (KHÔNG son), chữ đúng khắc đồng ngay dưới.
     Đúng hai chỗ: 「円の数？」→「回転の数」 (c1), 「3.14だから」 (a0, 0 điểm đề 東大).

   Hình theo từng phần (một mục `##` = một file cảnh; a0 ở p1):

   | cảnh | mục | hình |
   |---|---|---|
   | a0-open | Cold open | đêm chàm, vành đồng thau lơ lửng; 「1+1=2」 → hai viên đá (hai chấm đồng); 「なぜ3.14？」 khắc, 2·4·7 lướt qua gạch thép; mascot `ponder` (nói) ở 「電卓」, màn hình máy tính bỏ túi vẽ bằng đồng thau "3.14159…"; định nghĩa SGK 「円周 ÷ 直径」 = 「測り方」 ≠ 「何なのか」; phiếu đề 東大 2003 (giấy ngà, viền son)「円周率が3.05より大きいことを証明せよ」, 「3.14だから」→ 0点 (gạch thép); mục lục ①②③ (mascot `point`, nói); 「多数決？」 gạch; số π chạy không lặp; câu treo → vành tắt dần về đen |
   | b1-measured | 測っていた時代 | thẻ hồi「第一幕 円をはさみうちにする」; bảng đất sét Babylon「3」「3.125」và lá papyrus Rhind (ảnh thật, khung đồng) 「紀元前1650年ごろ ≈ 3.16」 khắc trên đĩa đồng; 「測った値 ≠ 理由」 |
   | b2-squeeze | アルキメデスのはさみうち | **đúng khung lab 0**: vành + 12 giác trong/ngoài, bảng 6→96, 3.1408 < π < 3.1429 (223/71, 22/7); ảnh Archimedes (Fetti, nhãn「想像図」); mascot `compass` (không nói) |
   | b3-todai | 東大の問題を解く | phiếu đề 東大 trở lại; lục giác trong vành: chu vi = 3 (「足りない」); 12 giác: tam giác vuông nhỏ + 「三平方の定理」 → 3.106; chuỗi 「円周率 > 3.106 > 3.05」; dấu son 判子「証明終」; mascot `ok` (nói)「これで証明できました」 |
   | b4-overseas | 海を越えたアイデア | bản đồ sao Á Đông: 劉徽 (263) → 祖沖之 (thế kỷ 5, 7 chữ số, 355/113 khắc tấm đồng) → **tấm 算額 dưới trời sao** (gỗ hinoki, khung sơn đen, 金具) ghi 村松茂清 1663「3万角形超」、関孝和、建部賢弘 1722「40桁以上」; 「2000年近く」 |
   | b5-limit | 極限 | đa giác 6 → 12 → … → 3072 hội tụ vào đường tròn chỉ vàng; 「極限」 khắc lớn; 「まっすぐ ↔ 曲がった」 hai nửa |
   | c1-turn | 円の数ではない | thẻ hồi「第二幕 円周率は「回転」の数」; 「円の数？」 thép → gạch → 「回転の数」 đồng; 「弧度法・ラジアン」 |
   | c2-360 | 360という数 | vành 360 vạch sáng lần lượt; bàn tính 60 (Babylon); 360 = 24 ước (lưới ước số khắc, code đếm); 「約束ごと」 |
   | c3-radian | 誰も選ばなかった単位 | sợi dây đồng dài 1 bán kính uốn theo vành → 「1ラジアン ≈ 57.3°」; nửa vòng = π, cả vòng = 2π, 1/4 vòng = π/2 khắc trên vành; 「τ = 2π」 nhỏ |
   | c4-shadow | 回転の影 | **đúng khung lab 1**: kim quay, bóng lên thước 壁, sóng sin theo thời gian; con lắc (T = 2π√(L/g)), sóng âm, cuộn dây trong máy phát (vẽ đồng thau); mascot `spin` (không nói) |
   | d1-repeat | 分数は必ずくり返す | thẻ hồi「第三幕 なぜ終わらないのか」; 1÷3 = 0.333… (dấu chấm Nhật trên số lặp); 1÷7 phép chia 筆算 khắc, số dư 1·3·2·6·4·5 thành mặt số quanh vành, lặp ở lần 7; 「有限小数・循環小数」 |
   | d2-proof | 予想ではなく、証明 | ảnh Lambert 1761「無理数」, Lindemann 1882「超越数」 (khung đồng, nhãn năm sinh–mất); định nghĩa 超越数 khắc |
   | d3-noshortcut | 近道はない | 「一言で？」→「ない」; Niven 1947「1ページ・微分積分」; 円積問題: hình tròn ↔ hình vuông thép cùng diện tích, thước + compa, hình vuông không khép → 「不可能」 (1882) |
   | d4-records | 100兆桁の先へ | chữ số π khắc theo xoắn ốc ra ngoài; ba mốc: 金田康正 2002「1兆桁超」· 近藤茂 2011「10兆桁」· 岩尾エマはるか 2022「100兆桁」 (chữ, không ảnh); 「くり返しは現れない」 |
   | e1-sphere | 球の上の円 | thẻ hồi「第四幕 円周率にならない円」; 天球: vành thành vòng trên quả cầu; đo đường kính dọc mặt cầu; C/d < π; cực Bắc + xích đạo → **C/d = 2** (mascot `startled`, không nói); 馬の鞍 → C/d > π |
   | e2-universe | 私たちの宇宙 | 「円周＝直径×円周率」 (SGK lớp 5) + 「平らな空間だけ」; vũ trụ phẳng (sai số < 1%); 1915 アインシュタイン; hố đen: vệt sao bị bẻ, vành giãn; 「変わったのは世界」 |
   | f1-summary | まとめ | thẻ hồi「第五幕 まとめ」; 天球儀 lắp đủ vòng, mỗi đáp án khắc trên một vòng (極限 · 回転 · 無理数・超越数 · 平らな空間) — vẽ lại thu nhỏ hình của từng hồi |
   | f2-next | 次回 | 正規分布 có √(2π); 1 + 1/4 + 1/9 + … = π²/6; 「回転・波・隠れた円」; mascot `wave` (nói); biển kênh **「99の発見」+「チャンネル登録」** đứng yên ≥ 4 s tới hết |

2. **Chất liệu / màu** (đo trên nền sáng nhất `#13224A`, lab tenkyu):
   - chàm 藍 `#050A1C → #13224A` (hạt sao mịn tất định; vệt sao quay CHỈ ở hồi 2 và hố đen).
   - **đồng thau `#D9A441`** (sáng `#F3DFA2`, tối `#6E5224`) = khí cụ, phép dựng, đa giác NỘI tiếp, chữ khắc nhấn (6.9:1).
   - **thép `#A9B8D6`** = đa giác NGOẠI tiếp, biên trên, cái SAI (gạch) (7.8:1).
   - **ngà `#EFE7D2`** = chữ chính (12.6:1) · chàm nhạt `#8E9CC0` = chữ phụ (5.7:1).
   - **son 朱 `#F0603C`** CHỈ cho π và đáp án đã chứng minh (4.75:1 → chỉ chữ ≥ 40 px / nét, không chữ nhỏ).
   - **算額 (chỉ b4):** gỗ hinoki `#D8BE92` vân tinh, khung sơn đen, 金具 vàng; chữ mực `#1E1914` (≥ 5.9:1), son tối `#76200F`.
3. **Chữ** — Shippori Mincho Bold (tiêu đề, テロップ — THIẾU π √ θ: ký hiệu toán trong câu 明朝 vẽ bằng Noto Sans JP
   hoặc Cormorant) · Noto Sans JP (nhãn, ký hiệu) · Cormorant Garamond LN (số lớn, π kiểu sách) · IBM Plex Mono (bảng
   số, vạch khắc). テロップ ngắn, không câu dài. Chữ hiện = KHẮC vào (vạch sáng chạy theo nét / gõ từng ký tự), không fade.
4. **Nhịp** — hình bám từ được đọc; mỗi câu ≥ 1 thay đổi; không khung đứng yên quá 3 s (sao trôi không tính).
5. **Nhân vật** — CÓ MIỆNG NÓI khi tư thế có trong `mouths.js` (ponder, point, ok, wave, calculator). 7 lần:
   `ponder` (a0 電卓, nói) · `point` (a0 mục lục, nói) · `compass` (b2, không nói) · `ok` (b3 証明, nói) · `spin` (c4,
   chỉ phần trên 45%, vệt quỹ đạo quanh ngón, không nói) · `startled` (e1 C/d = 2, không nói) · `wave` (f2, nói). Một bên
   khung, chân chạm đáy, không đè vành.
6. **Intro** — a0 kết ở câu treo: vành tắt dần, sao tắt → đen kín → intro 漆と金 (từ/về đen). p2 mở từ đen: sao hiện dần,
   vành sáng lên (b1).
7. **Camera / chuyển cảnh** — cùng ERA `tenkyu`: chuyển = **trời quay** (bầu sao xoay quanh cực ~20°, tấm cũ lướt ra
   theo vòng cung, tấm mới vào; tiếng `whoosh` tự có). Khác ERA (`sangaku` ở b4) loang từ `WIPE`. Trong cảnh: zoom nhẹ
   vào vùng đang nói (≤ 1.6×), xoay vành được (vành là khí cụ quay), không xoay cả khung.
8. **Ảnh / hiện vật** — dùng lại `projects/en/pi/assets/history/` (chép sang `assets/history/`): Archimedes Fetti
   (「想像図」), Rhind papyrus, Lambert, Lindemann, 祖沖之 (「後世の像」). Khung đồng thau, nhãn tên + năm khắc. KHÔNG
   ảnh người còn sống (金田, 近藤, 岩尾 — chỉ chữ).
9. **CẤM** — son cho thứ khác ngoài π / đáp án; số lên hình không tính bằng code hoặc không có trong CONTENT.md; neon,
   glow mạnh; chữ fade; câu dài trên hình; ký hiệu toán bằng 明朝 (tofu).
10. **Tiếng — DÀY HƠN (~1 tiếng / 3 s, mỗi テロップ một tiếng), khớp nghĩa vật:**

    | chuyển động | kind | ghi chú |
    |---|---|---|
    | thẻ hồi, đổi hồi | **`hyoshigi`** (拍子木 — MỚI) | 5 lần |
    | テロップ/chữ khắc hiện | `tick` (ngắn) / `type` (gõ từng ký tự số) | mỗi テロップ một tiếng |
    | vạch khắc, hàng bảng số | `tick` | |
    | số chạy, đếm cạnh, chữ số π chạy | **`soroban`** (算盤 — MỚI) | chùm, một tiếng mỗi cụm |
    | kim / vành quay, sóng tràn | `whoosh-long` | ≤ 8 |
    | nét compa / đa giác vẽ ra | `pen` | |
    | "à ra thế", π hiện | **`suzu`** (鈴 — MỚI) / `shimmer` | ≤ 12 cộng lại |
    | đóng dấu đáp án (証明終, 答) | **`hanko`** (判子 — MỚI) | ≤ 6 |
    | chốt ý lớn cuối hồi | **`taiko`** (和太鼓 — MỚI) | ≤ 3 cả bài |
    | gạch thép (sai) | `error` | ≤ 3 |
    | đúng, khớp | `correct` | ≤ 6 |
    | ảnh / hiện vật vào | `page` | |

    Tiếng mới: assets/sfx (synth_ja.py + 1 CC0) — người dùng nghe DUYỆT 2026-10-10 ("sound effect ok"). Nhạc: dùng lại "Late-Evening Study"
    (`projects/en/neg-times-neg/assets/music.m4a`, hợp đêm) — `music.lufs` −38, `sfx_db` −6.
11. **Vật dùng chung (kit, TRƯỚC khi giao — LESSONS §71, §83)**: `sky()` bầu sao tất định + xoay; `ring360(g, cx, cy, r,
    k, opts)` vành đồng thau (vạch, số độ, đường tròn chỉ vàng, xoay được); `polyIn/polyOut(n)` đa giác nội/ngoại tiếp +
    bảng chu vi `PERIM` (n·sin, n·tan, `must`); `engrave(g, s, x, y, k, font, color)` chữ khắc; `telop()` テロップ khung đồng;
    `tag()` vạch son mục lục ①②③; `strikeSteel()` gạch thép; `stamp()` 判子 son; `exam()` phiếu đề 東大; `sangaku()` tấm
    算額 (b4); `plate()` khung ảnh đồng; `actCard()`; `figure()`. Hằng: `PI_DIGITS` (≥ 120 chữ số, `must` với chuỗi chuẩn),
    `ARCH = [223/71, 22/7]`, `REM7 = [1,3,2,6,4,5]`.
12. **Chỉ số sàn** — mỗi cảnh: vành hoặc một khí cụ đồng thau trên hình; chữ ≥ 28 px (trừ vạch khắc trang trí); son chỉ
    trên π/đáp án; không khung đứng yên > 3 s; mascot ≤ 10% thời lượng p2; mật độ tiếng 1 / 2.5–3.5 s mỗi cảnh.
