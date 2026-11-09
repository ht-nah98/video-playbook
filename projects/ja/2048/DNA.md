# DNA của `ja/2048` — 「2048の数学 ― なぜ私たちは負けるのか」 (video bài học, lời đọc tiếng Nhật, kênh 99の発見)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md` đã duyệt 2026-10-12). Người dùng chọn (2026-10-12): **A「盤上」 — bàn
> gỗ 榧 và quân 駒** trong 3 hướng (`styleframes-compare.jpg`: 盤上 / 江戸切子 / 夜の路線図). Bàn thử chuẩn:
> `tools/lab/banjo.html`. Engine 2D. Kênh Nhật: tiếng hiệu ứng DÀY (~1 / 3 s, `channels/ja/CHANNEL.md`), chữ Nhật ≥ 28 px
> do kit giữ (LESSONS §95), ≤ 3 s không có テロップ / vật mới (§96).

1. **Ý trung tâm — 2048 là một ván cờ một người, đối thủ là 運.** Bàn 4×4 là một 盤 gỗ 榧 dày có chân như bàn 将棋/碁
   thật, trên chiếu 畳 tối, nắng xiên trên-trái. Ô số là quân 駒 gỗ ngũ giác, số khắc điền mực (彫り駒). Người Nhật nhận ra
   ngay; nó nói đúng ý bài: kịch bản so với 将棋AI (ミニマックス) — ở đây đối thủ không chơi tối ưu mà gieo xúc xắc. Cùng
   nhà với intro 漆と金 (quân lớn hoá sơn mài rồi vàng lá), nhưng KHÁC bài π: ấm, gỗ, ánh ngày trong phòng — không trời chàm.
   **Quân càng lớn càng quý** = bảo toàn: không gì sinh ra hay mất đi, chỉ gộp lại thành vật quý hơn.
   - **Vật xuyên suốt: BÀN 榧 4×4 + 駒** (`kit.ban`, `kit.koma`). Bàn mini (cây trò chơi, điện thoại, bảng thống kê) là
     CÙNG bàn đó thu nhỏ. 駒台 bên bàn = chỗ của quân chưa có / con số đang nói.

     | hồi | bàn |
     |---|---|
     | mở bài | bàn trống → hai luật bằng quân thật (trượt, gộp, quân mới rơi); điện thoại của mascot có bàn mini |
     | 1 合計は消えない | 駒台 ghi TỔNG (bàn tính 算盤) — gộp/trượt tổng đứng yên, quân mới rơi tổng +2/+4 |
     | 2 131072の壁 | **đúng khung lab 0**: 16 quân xếp rắn, đáy hai quân 4, gộp từ dưới lên → một quân 131072 黒漆 chữ vàng |
     | 3 角に集める | rắn ở góc + mũi vàng gộp dây chuyền; quân lớn giữa bàn chắn đường (quân nhỏ bị nhốt mờ đi) |
     | 4 運 | **đúng khung lab 1**: cây trò chơi như 棋譜 trên 和紙; nút 運 = đồng xu 寛永通宝 浅葱; bàn 将棋 9×9 bên cạnh |
     | 5 自分で学ぶ | bàn "sau khi vuốt" có ô trống sáng 浅葱 (chỗ may rủi sắp rơi) — chấm điểm TRƯỚC đó |
     | 6 勝ち続ける | bàn cuối kín 15 quân + một lỗ; quân 4 浅葱 rơi vào lỗ cuối (1/10) |
     | まとめ | 投了図: bàn cuối, ba câu trả lời trên ba 短冊 |
   - **Mục lục lời hứa** = ba 短冊 (giấy dọc) treo bên bàn ①②③, dùng lại ở まとめ (lật ra câu trả lời).
   - **Gạch hiểu lầm → sửa:** chữ sai viết 墨 mờ, gạch một nét 墨 xám (KHÔNG son), chữ đúng ngay dưới. Chỗ dùng: 「17段」 không
     cần; 「いくらでも大きくなる？」→「いいえ」 (c1), luật cố định 「これで勝てる？」→「1024 は 5回」 (d2).

   Hình theo từng phần (một mục `##` = một file cảnh; a0 ở p1):

   | cảnh | mục | hình |
   |---|---|---|
   | a0-open | Cold open | bàn trống trên chiếu; 「縦に4マス、横に4マス」 kẻ đường mực; hai luật diễn bằng quân (vuốt → trượt; 2+2 → 4; quân mới rơi); 2014 · ガブリエレ・チルリ · 19歳 (chữ, không ảnh) · 「1週間で400万人」; 「スリーズ」→「1024」→「2048」 ba bàn nhỏ (chỉ chữ + bàn gỗ của ta, không giao diện thật); 20万回 bấm bừa: bàn mini chạy nhanh, bảng đếm 「1024 到達 0回」; máy "biết tính": quân 2048 → 32768 → 65536 lên 駒台; **131072 bóng mờ + 「壁」**; ba 短冊 ①②③ (mascot `point`, nói); 「16マスの裏」 → bàn tối dần về đen |
   | b1-hozon | 盤の上の保存則 | thẻ hồi「第一幕 合計は消えない」; 駒台 có bàn tính 算盤 ghi tổng; 2+2 → 4 tổng đứng yên; trượt tổng đứng yên; quân mới 2 (9/10) / 4 (1/10) → +2.2 trung bình (`must`); cân đĩa: hai quân 2 ⇄ một quân 4; 「保存則」「質量保存の法則（中学理科）」 |
   | b2-tesuu | 2048までの手数 | 2048 ÷ 2.2 ≈ 930 (`must`), 「少なくとも」; 棋譜 ghi tay chạy 「第1手 … 第1018手」; quân nhỏ còn sót trên bàn; 「約1000回の判断」 |
   | c1-kaidan | 階段をつくる | thẻ hồi「第二幕 131072の壁」; 「いくらでも大きく？」→「いいえ」; đệ quy: quân 2ᵏ cần hai 2ᵏ⁻¹ 「出会える位置」, giữ quân thứ nhất trong lúc dựng quân thứ hai → bậc thang mọc ra trên 駒台; 「少なくとも階段1つ分が同時に盤に」 |
   | c2-16masu | 16マスにぴったりの階段 | **khung lab 0**: 16 quân rắn 4,4,8…65536, 等比数列, ＋4 → 2¹⁷ = 131072 (`must`); gộp dây chuyền từ dưới lên → quân 131072; mascot `phone` (không nói) |
   | c3-naze4 | なぜ4から始まるのか | quân mới có thể là 4 → đáy 4,4; nếu chỉ 2: bậc thang 2,2,4…32768 → 65536 (`must`); 17 quân cần 17 ô → ô thứ 17 không có (quân thứ 17 lơ lửng ngoài bàn); 「少なくとも6万手」 (131072/2.2, `must`) |
   | d1-jouzu | 上手な人の共通点 | thẻ hồi「第三幕 なぜ角に集めるのか」; quân lớn nhất ở góc, rắn giảm dần, mũi vàng; một lần gộp ở đuôi → dây chuyền về góc (quân lật vàng lần lượt); quân lớn giữa bàn → quân nhỏ phía sau bị nhốt (mờ, khung xích) |
   | d2-rule | 単純なルールの実験 | bốn quân mũi tên ↓ ← → ↑ xếp thứ tự ưu tiên trên 駒台; bàn mini chạy theo luật; 「20万回」, 512 ×200, 1024 → 「5回」 (gạch: 「これで勝てる？」); 「相手がいる」 → đồng xu 浅葱 lần đầu |
   | e1-aite | 新しいタイルという相手 | thẻ hồi「第四幕 相手の名は「運」」; quân 2 浅葱 rơi đúng góc → bậc thang vỡ; 4 hướng × 15 ô trống × 2 = 30 (`must`); 18 trạng thái/ô; 18¹⁶ ≈ 1.2垓 (`must`); 「1億×1億×1万」 tháp chữ số; 「すべては調べられない」 |
   | e2-heikin | 運を平均で読む | bàn 将棋 9×9 nhỏ: 「相手は最善手を指す」 = ミニマックス; bên kia bàn 2048: đối thủ = đồng xu 浅葱; Michie 1966 (chữ, không ảnh — 「人工知能研究者」); **khung lab 1**: cây 棋譜, nút ta (max, nhánh vàng), nút 運 (期待値 0.9/0.1, `must`); 「エクスペクティマックス法」; mascot `coin-flip` (không nói) |
   | e3-sakiyomi | 先読みの効果 | 評価: 空きマス · となりの同じ数 · 順番 (ba ký hiệu trên 駒台); 1手先 71.5% / 2手先 ~96% thanh khắc; cây phình ×~100 mỗi tầng (cây nở ra kín khung); 「自分で学ぶ」 |
   | f1-saiten | 運が入る前に採点する | thẻ hồi「第五幕 自分で学ぶ機械」; 何百万回: hàng bàn mini chạy; bàn sau khi vuốt: ô trống sáng 浅葱 = chỗ 運 sắp rơi; 「ここで採点」 (con dấu 評価) TRƯỚC khi quân mới rơi; hai nửa 「自分で決めた / 運で決まる」 |
   | f2-td | TD学習 | 「TD学習 = 時間差分学習」; hai số: 予想(いま) vs 得点 + 予想(次); ずれ → mũi tên sửa nhỏ, lặp nhiều lần (đường hội tụ) |
   | f3-ayumi | 研究の歩み | 棋譜 dòng năm: 2014 シュベルト・ヤシュコフスキ (ポーランド) 97% · 松崎公紀 (高知工科大学) · 2016 台湾: 10000 quân nhỏ, MỘT quân 65536 vàng · 2021 72% → 32768 (chỉ chữ, không ảnh) |
   | g1-saikyo | 最強の機械 | thẻ hồi「第六幕 勝ち続けることはできるのか」; sổ 定跡 (bảng tra) mở ra + cây tìm kiếm; 1200回: 16384 ほぼ毎回 / 32768 86% / 65536 8.4% (thanh); 12 bàn mini, một bàn vàng (1/12, `must`); 「なぜ毎回は勝てない？」 |
   | g2-saigo | 最後の1枚 | bàn chật, 1–2 ô trống; quân rơi sai chỗ → 詰み (khung xích mờ); bàn cuối kín 15 + lỗ cuối; 「枚数が増えるのは新しいタイルだけ」; lỗ cuối phải là 4 → quân 4 浅葱 rơi (1/10); 「一発勝負」 + taiko |
   | h1-matome | まとめ | thẻ hồi「第七幕 まとめ」; 投了図: bàn cuối; ba 短冊 ①②③ lật ra: 「約1000手、運を相手に」 · 「131072が限界」 · 「平均で読み、自分で学ぶ」; ba hình thu nhỏ (保存則, 階段, 木) |
   | h2-next | 次回 | 「角から動かさずに」 bàn với quân lớn ở góc; mascot `wave` (nói); biển kênh **「99の発見」+「チャンネル登録」** ở GIỮA, đứng yên ≥ 4 s tới hết |

2. **Chất liệu / màu** (từ `tools/lab/banjo.html`; tương phản đo bằng code, ném lỗi < 4.5):
   - 畳 nền `#2A2619 → #15130D` · 榧 bàn `#DDB062` (vân `#B98A42`, cạnh `#8E6229`) · 墨 đường kẻ / chữ trên gỗ `#17110C`.
   - **17 bậc quân** (chất liệu + độ dày 5 → 16 px): 2 → 128 柘植 `#F1DDA8 → #8A5F2E` (黒柿 ở 128) · 256 / 512 溜塗
     `#5A2B19` (512 thêm viền vàng mảnh để khác 256) · 1024 黒漆 `#15100D` chữ 胡粉 · 2048 → 65536 金箔 `#E4C977 → #C08A34`
     ấm dần, chữ 墨, **mỗi bậc vàng thêm một vạch hoa văn ở đáy quân (1–5 vạch)** để khác ngoài con số · 131072 黒漆 chữ vàng.
   - 和紙 `#ECE3CF` (棋譜, 短冊, giấy) · 胡粉 `#F2EBDD` chữ chính trên nền tối.
   - **朱 `#C53A20`** (chữ `#A42C16`) CHỈ cho đáp án / khoảnh khắc chốt (= 131072, = 2.2, 期待値, 答, 1/10).
   - **浅葱 `#3AA5B5`** (chữ `#156A78` trên giấy, `#7FD0DA` trên nền tối) CHỈ cho MAY RỦI: đồng xu, nút 運, quân vừa rơi, xác suất.
   - Gạch / sai: 墨 xám `#6B6253` — không son, không 浅葱.
3. **Chữ** — Shippori Mincho Bold (テロップ, tiêu đề, số trên quân — THIẾU ² ¹⁷ π √: mũ và ký hiệu bằng Noto Sans JP) ·
   Noto Sans JP (nhãn, mũ, mũi tên ↑↓←→, %) · Cormorant Garamond LN (số thập phân dài nếu cần). Số trên quân 5–6 chữ số
   ≥ 36 px (quân to ra ở cảnh nói về chúng). テロップ ngắn. Chữ hiện = viết 墨 (nét chạy) hoặc khắc; không fade.
4. **Nhịp** — hình bám từ được đọc; mỗi câu ≥ 1 thay đổi; **≤ 3 s không có テロップ / vật mới**; phần tử chính hiện từ
   FROM + 0.3 (LESSONS §96).
5. **Nhân vật** — CÓ MIỆNG NÓI khi tư thế có trong `mouths.js` (ponder, point, ok, wave, calculator). 6 lần:
   `point` (a0 mục lục, nói) · `phone` (c2, bàn mini trên màn, không nói) · `ponder` (d2 「これで勝てる？」, nói) ·
   `coin-flip` (e2, đồng xu vẽ bằng code, không nói) · `ok` (g2 一発勝負 hoặc h1, nói) · `wave` (h2, nói). Một bên khung,
   chân chạm đáy, chữ ở nửa kia.
6. **Intro** — a0 kết ở 「一緒に見ていきましょう」: bàn tối dần, nắng tắt → đen → intro 漆と金. p2 mở từ đen: nắng xiên
   hiện dần trên chiếu, bàn sáng lên (b1).
7. **Camera / chuyển cảnh** — cùng ERA `banjo`: chuyển = **lật 棋譜** (tấm giấy/bàn cũ trượt sang, cái mới vào theo vệt
   nắng; tiếng `page` hoặc `whoosh` tự có). Trong cảnh: zoom nhẹ vào bàn / quân đang nói (≤ 1.6×). Không xoay khung.
8. **Ảnh** — KHÔNG ảnh người (Cirulli, Michie, nhà nghiên cứu — chỉ chữ tên + năm), KHÔNG giao diện thật của 2048 / Threes!
   / 1024 (màu be-cam của app gốc là nhận diện người khác).
9. **CẤM** — son cho thứ khác ngoài đáp án; 浅葱 cho thứ khác ngoài may rủi; số lên hình không tính bằng code hoặc không có
   trong CONTENT.md; bàn mini ở trạng thái không hợp lệ (mọi bàn chạy bằng `kit.slide` thật, quân mới bằng `hash(i)`);
   neon, glow mạnh; chữ fade; câu dài trên hình; ký hiệu toán bằng 明朝 (tofu).
10. **Tiếng — DÀY (~1 tiếng / 3 s, mỗi テロップ một tiếng), khớp nghĩa vật:**

    | chuyển động | kind | ghi chú |
    |---|---|---|
    | thẻ hồi, đổi hồi | `hyoshigi` | 7 lần |
    | quân trượt / đặt quân | **`koma`** (駒音 "pachi" — MỚI, tổng hợp gỗ) | chùm khi nhiều quân, một tiếng mỗi lượt vuốt |
    | gộp quân | `chip` / `snap` (bậc thấp), `suzu` (bậc 漆), `shimmer` (bậc 金) | cao dần theo bậc |
    | quân mới rơi, đồng xu 運 | `coin` | |
    | xúc xắc / cây may rủi tách nhánh | `dice` (có sẵn, Kenney CC0) | ≤ 6 |
    | テロップ / chữ 墨 hiện | `pen` (nét) / `tick` | mỗi テロップ một tiếng |
    | số chạy (tổng, đếm ván, 棋譜 tay) | `soroban` | chùm |
    | 棋譜 / giấy vào | `page` | |
    | "à ra thế" | `suzu` / `shimmer` | ≤ 12 cộng lại |
    | đóng dấu đáp án (答, 評価) | `hanko` | ≤ 6 |
    | chốt ý lớn (131072, ô thứ 16 = 4) | `taiko` | ≤ 3 cả bài |
    | gạch (sai), 詰み | `error` | ≤ 4 |
    | đúng, khớp | `correct` | ≤ 6 |

    Nhạc: dùng lại "Nocturne in Warm Felt" (`projects/en/fifty-percent/assets/music.m4a` — ấm, mềm, hợp gỗ) — `music.lufs`
    −38, `sfx_db` −6.
11. **Vật dùng chung (kit, TRƯỚC khi giao — LESSONS §71, §83, §89, §95)**: `ground()` chiếu + nắng; `ban(g, x, y, s, k)`
    bàn 榧 (đường kẻ, 星, chân, bóng); `koma(g, v, x, y, s, k, opts)` quân theo bậc (chất liệu, độ dày, vạch vàng; opts:
    `luck` viền 浅葱, `ghost` bóng mờ, `lift`); `board(g, cells, x, y, s, k, opts)` vẽ một trạng thái 4×4; `slide(cells, dir)`
    luật 2048 thật (trượt + gộp một lần/ô, trả về bàn mới + danh sách gộp + điểm, `must` tổng bảo toàn); `spawn(cells, i)`
    quân mới bằng `hash(i)` (0.9/0.1); `snake(levels)` bàn rắn; `komadai()` 駒台; `kifu()` tờ 棋譜 和紙; `tanzaku()` 短冊;
    `coin()` 寛永通宝 浅葱; `soroban()` bàn tính tổng; `tree()` cây trò chơi (nút ta / nút 運); `shogiban()` bàn 9×9 nhỏ;
    `telop()`, `heading()`, `actCard()` (kicker từng hồi trong bảng `ACTS` — không để nhóm tự viết), `stamp()` 判子 son,
    `strikeInk()` gạch 墨, `figure()`, `phoneBoard()` bàn trên màn điện thoại. **Mọi hàm chữ ném lỗi khi chữ Nhật < 28 px.**
    Hằng: `LADDER` (4,4,8…65536, `must` tổng = 2¹⁷), `MEAN = 2.2`, `STATES = 18**16`.
12. **Chỉ số sàn** — mỗi cảnh: bàn hoặc quân trên hình; chữ ≥ 28 px; son chỉ trên đáp án, 浅葱 chỉ trên may rủi; không
    khung đứng yên > 3 s; mascot ≤ 10% thời lượng p2; mật độ tiếng 1 / 2.5–3.5 s mỗi cảnh.
