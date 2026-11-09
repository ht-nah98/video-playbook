# Brief: dựng cảnh ja/gacha 「ガチャの罠」 (kênh 99の発見, lời Nhật)

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc). Lời đọc tiếng Nhật đã thu xong, mốc từng chữ là THẬT
(`data/p1.timeline.json`, `data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/ja/gacha/DNA.md` — カプセル: viên nang = 1 lượt quay; bảng §1 "viên nang là gì ở mỗi hồi" là ý đạo diễn.
   Màu một nghĩa (§2): son sơn mài CHỈ cho casino / 賭博 / cấm; vàng CHỈ cho ★5 / trúng; san hô = xác suất tăng.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/ja/gacha/SCRIPT.md` (lời trước `---`): lời của mục bạn làm. `projects/ja/gacha/CONTENT.md`: mọi con số /
   năm / tên lên hình PHẢI có ở đây (kit có sẵn mô hình 天井 + `must`).
4. `projects/ja/gacha/kit.js` — đọc HẾT (API ở đầu file). `kit-test.html` + ảnh `out/_lab/gacha/kit/t_*.png` cho thấy mọi hàm.
5. `projects/ja/gacha/data/lines.txt`: các dòng `p1|p2 i bắt-đầu kết-thúc chữ`; từ để tra = từ trong timeline (`words[].w`).
6. Ảnh thật: `kit.PHOTOS` (gashapon, slot, casino, skinner, skinnerScheme, belgium, netherlands, pachinko, beReport,
   nlReport, itmedia, cesa, kokusen, swrve, hooked, apple) — đặt bằng `photoTag` (credit in sẵn). Người dùng: CÀNG NHIỀU
   ẢNH THẬT CÀNG HẤP DẪN → mỗi cảnh được giao ảnh thì dùng, camera `push` chậm vào ảnh.

**Kênh Nhật (LESSONS §96):** ≤ 3 s phải có テロップ hoặc vật MỚI; phần tử chính hiện từ FROM + 0.3. テロップ ngắn (cụm
từ khoá của câu, không chép cả câu). Chữ Nhật ≥ 28 px (kit ném lỗi). Không vẽ UI / tên / nhân vật game thật (原神 chỉ là
chữ); không "SSR/UR". "Sai" = tem giấy xám bị bóc (`wrong` / `strike`), KHÔNG đỏ.

## Cảnh, nhóm, ý đạo diễn

| cảnh (file) | mục SCRIPT | nhóm | hình (ý đạo diễn) | ảnh | mascot |
|---|---|---|---|---|---|
| **a0-open** (p1) | Cold open (16 câu) | G1 | xem mục riêng dưới | slot, casino, belgium, gashapon | phone (ngắn, cuối) |
| b1-hako | 100回の箱 (mở ACT 1 — `actCard`) | G2 | 100 viên `capsuleGrid` mở dần, không viên vàng (0.6 viên); chữ 0.994¹⁰⁰ ≈ 55% | — | — |
| b2-gobyu | ギャンブラーの誤謬 | G2 | 12 viên xám lăn ra liên tiếp; bóng chữ 「そろそろ来るはず」 → tem 「ギャンブラーの誤謬」; viên 13 vẫn 0.6%; câu "本物は覚えています" = viên hé một bộ đếm nhỏ (gợi ACT 2) | — | ponder |
| b3-kaisu | 回数を増やすと | G2 | đường 1−0.994ⁿ bằng chồng viên: 10 → 5.8%, 50 → 26%, 116 → 50%; dải "−160石 mỗi lần" chạy thẳng song song (tiền giảm đều) | — | — |
| b4-200nin | 200人の200通り | G2 | 200 viên = 200 người, vài viên vàng sớm (3–4 ở ≤ 3 lần), vài viên còn trống ở 80; đám phân bố tản ra | — | — |
| c1-74 | 74回目から (mở ACT 2) | G2 | `pityBars` + `firstHit` như lab khung 1 — cột 74 dựng ĐÚNG chữ 「74回目」, 36% / 56% / 76 theo lời; tem 天井 (bạc hà) | — | pointer |
| c2-matsu | 待つ時間 | G2 | viên đang lắc trên tay máy (`shake`), đồng hồ chờ; biểu đồ chuông phản ứng–xác suất đỉnh ở 50% (khỉ, 2003 — nhãn nguồn chữ) | — | coin-flip |
| c3-atosukoshi | あと少しだった | G2 | `slot` dừng sát 7 (near-miss) rồi trượt; Nevada 1989 nhãn; câu "作ることもできる" | slot | — |
| c4-kumiawase | 不確かさの組み合わせ | G2 | hai viên: 0% (chán) / 100% (bỏ) → ở giữa: "低い確率 + 待たせる演出" ghép thành một viên | — | — |
| d1-skinner | スキナーの箱 (mở ACT 3) | G3 | ảnh hộp Skinner + sơ đồ; 1957 ハト; nhịp bấm đều vs bấm dồn khi thưởng ngẫu nhiên | skinner, skinnerScheme | — |
| d2-hooked | 4つのステップ | G3 | 4 viên mở theo thứ tự きっかけ→行動→報酬→投資, mũi tên quay vòng về 1; ảnh bìa Hooked | hooked | — |
| d3-23jikan | 残り23時間 | G3 | `machine` mặt đồng hồ 「残り23時間」; tua nhanh: sự kiện kết thúc → sự kiện mới mọc lên | — | — |
| d4-sns | タイムラインのフィルター | G3 | bảng tin tự vẽ: thẻ pastel mỗi thẻ một viên vàng; lưới 1000 → 6 sáng / 994 xám bị lọc đi | — | phone |
| d5-rasen | らせんのループ | G3 | viên lăn theo vòng xoắn nở ra; mỗi vòng một hoá đơn lớn hơn (`receipt` nhỏ) | — | — |
| e1-2dai | よく似た2台 (mở ACT 4 — ERA casino) | G3 | phone ↔ slot cạnh nhau (như cold open), 3 điểm giống; 2 khác: "お金にならない", tuổi 13+/16+; ảnh 国民生活センター + 4,024件 / 33万円 | casino, kokusen, pachinko | — |
| e2-belgium | ベルギーの結論 | G3 | bản đồ Bỉ (ảnh) + bìa báo cáo; tem 賭博; FIFA / Overwatch chữ; 80万ユーロ | belgium, beReport | — |
| e3-sekai | 世界の答えはばらばら | G3 | 5 nước như 5 thẻ: Hà Lan (2018 → 2022 huỷ phạt), Trung Quốc 2017, Anh 2022, Nhật 2012 コンプガチャ + CESA 2016; kết: 「禁止ではなく、表示」 → 0.6% trên điện thoại | netherlands, nlReport, itmedia, cesa | — |
| f1-015 | 0.15%の人たち (mở ACT 5 — về studio) | G4 | 1000 viên: 15 viên có tiền (1.5%), 1–2 viên vàng to (0.15%) mang NỬA chồng xu; ảnh Swrve | swrve | — |
| f2-heikin | 平均では見えない形 | G4 | chồng xu chia đều (trung bình) ↔ phân bố thật: đa số 0 + đuôi rất dài; chữ "平均" che đuôi | — | — |
| f3-tenjou | 天井の値段 | G4 | 90 lần tệ nhất vs trung bình 62; 160石 × 90 = 14,400 (`gem`); ≈ 3万円; ★5 ≠ nhân vật muốn | — | calculator |
| f4-meisai | 明細にすると | G4 | `receipt` dài cuộn ra, nhiều dòng nhỏ, tổng cộng dồn tới ≈ 3万円 | — | — |
| f5-kansan | 手で持てるものに換算する | G4 | 3万円 = 30 hộp cơm 1000円 / 30 tháng xem phim (2.5 năm); ↔ "石の数" | — | — |
| f6-ikisaki | お金の行き先 | G4 | dòng tiền: ストア 30% → (từ cuối 2025 thấp hơn) → 運営 | apple | — |
| g1-hanron | いちばん強い反論 (mở ACT 6) | G4 | câu phản đối trên thẻ; 2 điều kiện: 知っている (確率表 ✓) / やめる力 (演出・時計・タイムライン làm mòn) | — | ponder |
| g2-magarikado | 曲がり角は3つ | G4 | vòng lặp có 3 lối rẽ sáng lên lần lượt; mỗi lần đi qua lối sau hẹp lại | — | halt |
| h1-matome | まとめ (mở ACT 7) | G4 | 3 viên đứng thẳng hàng, mỗi viên mở ra hình thu nhỏ của hồi: 1−0.994ⁿ / cột 74 / bản đồ Bỉ–Nhật / viên đang lắc "数秒" | — | — |
| h2-jikai | 次回 | G4 | 3 việc làm (金額で上限 / お金に換算 / 「あと少し」= 合図); biển kênh 「99の発見」+「チャンネル登録」 ≥ 4 s (`channels/ja/channel.json` outro) | — | wave |

**a0-open (p1, G1) — 0–5 s là THUMBNAIL đang chuyển động (PACKAGING §0b, §4).** Khung 0.5 s đã có: điện thoại ガチャ (trái,
pastel) ↔ máy slot sơn mài (phải), cùng nhịp quay, cùng ánh vàng, giữa là 「＝？」 → câu 2 「ベルギーでは…賭博」: tem 賭博 đóng
lên giữa; câu 3 「日本では、ガチャは合法」: ảnh máy ガシャポン thật + cờ/nhãn 日本 合法. Câu 4–5: 0.6% → khối 1000 viên, 6 viên
vàng. Câu 6: 100 viên, hơn nửa trắng tay (「この数字どおりなら」 nhãn nhỏ). Câu 7–8: bảng tỉ lệ tự vẽ 「確率 0.6%」 rõ ràng.
Câu 9–10: 「確率ではなく、設計」 (tem 確率 bị bóc xám → 設計). Câu 11: điện thoại rung nhẹ, các cột 天井 hé bóng 1 s rồi tắt
(câu treo). Câu 12–15: 3 viên nang lớn ①②③ trên khay mở nắp lộ câu hỏi (①0.6%と知っていて… ②確率表の裏で… ③なぜベルギーでは違法で、日本では合法なのか). Câu 16: 3 vật nhỏ (đồ thị / não / cán cân luật) → tắt về đen (intro 漆と金 từ đen). Mascot
`phone` nhỏ ở mép trong câu 9–11 (nói). Phải chuyển động từ giây đầu; mỗi câu một vật mới.

**Cảnh mở hồi** (b1, c1, d1, e1, f1, g1, h1): `actCard` theo `ACTS` (kit) trước nội dung; lead FROM 2.6.
**ERA:** 'studio' mọi cảnh trừ e1–e3 = 'casino' (vào casino ở e1 bằng loang, ra ở f1).
**Vật dùng chung (§71):** điện thoại + slot ở e1 vẽ lại ĐÚNG như a0 (cùng hàm, cùng tham số — G1 ghi tham số vào đầu
a0-open.js, G3 đọc lại). Đồ thị 天井 ở h1 = `pityBars` thu nhỏ như c1.

## Hợp đồng một cảnh

File `projects/ja/gacha/plates/<tên>.js` (tên trong lời giao việc), một mục `##` của SCRIPT.md = một file:

```js
import { W, H, ground, card, actTitle, typed, prog, lookup, must, typeCues } from '../kit.js';
export default class Euclid {
  static ERA = 'studio';                                 // khoá của kit.ERA
  static IMAGES = { euclid: './assets/history/euclid.jpeg' };   // ảnh cần nạp (đường dẫn tương đối trang)
  static POSES = ['point'];                              // CHỈ tư thế được giao (assets/character-v2/cut/pose-*.png)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { e: w(11, 'elements'), x: w(12, 'five') }; // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(11).start;                            // câu đầu của mục
    this.FROM = Math.max(this.START - 1.2, L(10).end + 0.5);   // luật FROM bên dưới (mở HỒI: 2.6 thay 1.2)
    // this.CONTINUES = true;                            // cảnh vẽ TIẾP đúng hình của cảnh trước → cắt thẳng (§50)
  }
  sfx() { const T = this.T; return [...typeCues('ELEMENTS', T.e, T.e + 0.6), { t: T.x, kind: 'pop' }]; }
  render(g, t) { const T = this.T; ground(g, Euclid.ERA); /* … */ }   // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("doesn't", "thirty-seven"). Sai từ → `lookup` ném lỗi.
Từ LẶP trong câu → truyền n; `prog(t, a, b)` ném lỗi khi b < a (LESSONS §59). Chạy `python3 tools/qa/lookups.py ja/gacha`
và đọc TỪNG dòng "LẶP" — công cụ chỉ đọc lời gọi dạng `w(<số>, '<từ>'[, n])` (nháy ĐƠN, chỉ số là số viết thẳng);
viết khác (nháy kép, biến) thì nó không thấy.

**FROM — một luật.** `FROM = max(START − lead, KẾT của cảnh trước + 0.5)`; lead = 1.2 (cảnh thường) / 2.6 (mục MỞ HỒI);
KẾT = `end` câu cuối của cảnh trước, hoặc mốc kết chuyển động đặc biệt của nó (lao vào, loang) nếu muộn hơn (§44, §64).

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: khác ERA → nền mới loang từ `WIPE`; cùng ERA → khay trượt (cảnh cũ
trượt trái, cảnh mới vào từ phải, một viên lăn qua mối nối), có tiếng tự động. Cảnh phải ĐẸP ở mọi
t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. `CONTINUES`: khung đầu của bạn phải TRÙNG khung cuối cảnh trước
(cắt thẳng, không tiếng). Mối nối đặc biệt: d5 → e1 (vào casino, loang — e1 đặt `WIPE` ở máy slot) và e3 → f1 (ra studio, f1 đặt `WIPE`).

**Biển tên mục / thẻ hồi.** `heading(g, act, title, k)` góc trên-trái (x 96, y 150; chừa y < 190 vùng trái) — kit ném lỗi
khi tên > 1100 px; tên = tên mục `##` của SCRIPT. Mục MỞ HỒI gọi thêm `actCard(g, t, FROM, START, act)` + `actCue` trong sfx().

**Vật dùng chung với nhóm khác** (§71). Mô hình 天井 (`p`, `PMF`, `cum`, `firstHits`), `phone`/`slot` của a0, `capsuleGrid` 1000 / 100. Vật đã xuất hiện ở cảnh nhóm khác:
"vẽ lại đúng như a0-open / c1-74" (cùng số, cùng hình học, cùng màu) — không tự đặt lại.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá 3 s (camera trôi chậm
  không đủ nếu hình đã vẽ xong; gõ thêm dòng chữ trên bố cục cũ cũng không đủ — đổi bố cục, đẩy camera, hay cho vật
  chuyển động; `docs/study/01`). Cảnh MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động, không biến mất giữa khung. Chữ hiện theo cách của DNA, không fade.
- Mỗi khung MỘT ý chính. Hiểu lầm lời nói ra → gạch / đánh dấu SAI đúng CHỮ sai, ý đúng viết ngay dưới; KHÔNG gạch câu
  đúng, KHÔNG tô màu "sai" lên kết luận đúng (§58). Đẳng thức đúng nhưng "hỏng khi bỏ luật" → nứt qua dấu "=" + nhãn
  điều kiện, KHÔNG gạch (§62).
- Dụng cụ trên hình làm ĐÚNG phép đo lời đọc nói và khớp với cảnh trước đã dùng nó (§57).
- **Vật xuyên suốt** (DNA §1): vẽ đúng trạng thái của hồi bằng hàm chung của kit. **Mục tóm tắt**: vẽ lại thu nhỏ hình
  của từng hồi, không vẽ hình mới.
- Vật phải đứng yên (biển kênh, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera. Nếu DNA có cuộn / camera:
  clip phần cuộn ở y > đáy thẻ mục + 10, kẻo nội dung trượt QUA thẻ (§68).
- Nếu DNA có ô mang biến: ô / nhãn của một BIẾN giữ đúng biến đó, giá trị viết chỗ khác; gọi lại một điều kiện → cho
  thấy nó đổi trạng thái (§67).
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / viền chọn / số thứ tự bằng mực / bạc hà (`sure`) — không vàng, không son.
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; vùng mới sau camera có sẵn ô chờ ngay khi tới.
  Kết luận viết xong TRƯỚC câu cuối của cảnh (§64).
- **Mascot NÓI** (§86): `figure(g, pose, …, k, { t })` — truyền `t` của cảnh thì miệng mở theo lời đọc khi đã đứng
  hẳn; đặt mascot ở câu mà nó "nói", `{ talk: false }` nếu nó chỉ nghe. Tư thế chưa có trong
  `assets/character-v2/mouths.js` → ném lỗi: báo đạo diễn, đừng tự đo.

**Toán / số.** Mọi số lên hình tính bằng code (`must`); chỉ số liệu trong CONTENT.md; làm tròn ghi "≈". `must()` chỉ
đặt ở trạng thái ĐÃ XONG (sau chuyển động + biên an toàn), không ở mốc bắt đầu của chuyển động — khung chuyển tiếp
ném lỗi làm chết render giữa chừng (§70).

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render (sprite mờ vẽ sẵn).

**Chữ.** `kit.FONTS` (Shippori Mincho 400/700, Noto Sans JP, Cormorant) — dùng `telop`/`card`/`write`/`heading` của kit, đừng chép hàm chữ riêng.
Ký tự ngoài ASCII kiểm fontTools `getBestCmap` (DNA không dùng font: bảng glyph của kit, §69); thiếu → vẽ tay. Chữ nhỏ
≥ 4.5:1 trên nền thật.

**Mascot.** CHỈ tư thế được giao, một bên khung (cx ≤ 380 hoặc ≥ 1540), cao ≤ 480 px (≤ 45% — mascot NHỎ, nội dung là chính), chân chạm đáy, 3–8 s quanh
đúng câu, vẽ sau khi `restore` camera. **Chân dung**: nhãn tên + năm (chỉ năm có trong CONTENT) + note bắt buộc cho
ảnh tưởng tượng.

## Tiếng hiệu ứng (DNA §10; docs/lesson/SFX.md) — kênh Nhật: ~1 tiếng / 2.5–4 s mỗi cảnh, khoảng lặng ≤ 4 s

Bảng: núm / nút 回す → `gacha` (mới, CC0) hoặc `tick` · viên rơi / chạm → `pop`, `chip` · ★5 lóe → `shimmer`, `suzu` · cột
dựng / đếm → `tick` · máy slot → `reel` (mới), `coin`, `buzzer` · テロップ chính → `pen`; テロップ phụ (@dim) KHÔNG tiếng · tem
賭博 / 天井 → `hanko` · ảnh thật vào khung → `card` · tiền / hoá đơn → `soroban`, `coin` · chuyển cảnh: trang tự có.
Trần mỗi cảnh: số tiếng ≤ thời lượng ÷ 2.5 và ≥ thời lượng ÷ 4 (LESSONS §99); không hai tiếng trong 0.25 s.

| nhóm | shimmer | suzu | buzzer | hanko |
|---|---|---|---|---|
| G1 a0-open | ≤ 3 | ≤ 1 | 0 | ≤ 2 |
| G2 b1–c4 | ≤ 3 | ≤ 2 | 0 | ≤ 2 |
| G3 d1–e3 | ≤ 2 | ≤ 1 | ≤ 2 | ≤ 3 |
| G4 f1–h2 | ≤ 3 | ≤ 2 | ≤ 1 | ≤ 1 |
| **TỔNG** | **≤ 11 (trần 12)** | **≤ 6 (trần 6)** | **≤ 3 (trần 3)** | ≤ 8 |

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/ja/gacha/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 900 \
  --t <mốc trang,…> --outdir out/_lab/gacha/<nhóm>
python3 tools/qa/sheet.py out/_lab/gacha/<nhóm> out/_lab/gacha/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/ja/gacha/p2.html?plates=<các cảnh của bạn>"   # chạy khô MỌI khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/ja/gacha/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py ja/gacha
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước) và khung cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ;
  tương phản thấp; khung đứng im > 3 s; vật biến mất giữa khung; ký tự rơi về font khác. `[PAGE ERROR]` = lỗi JS.
- `shoot.js check` phải thoát 0 — ảnh chụp từng câu không trúng khung chuyển tiếp, chạy khô thì trúng (§70).

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh / chạy khô). `shoot.js` luôn kèm `--page`.
- **KHÔNG `pkill -f` / `killall`**: nhiều nhóm chạy `shoot.js check` cùng lúc, `pkill -f "shoot.js"` giết lệnh của nhóm khác
  (LESSONS §98). Dừng lệnh của mình bằng PID nó in ra.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, cỡ font cần thêm, chỗ còn băn khoăn.
