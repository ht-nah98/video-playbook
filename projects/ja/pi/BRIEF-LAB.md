# Brief: bàn thử phong cách (DNA) cho ja/pi — mỗi agent MỘT hướng

Video bài học đầu tiên của kênh Nhật **99の発見**, lời đọc tiếng Nhật, 「円周率の正体 ― なぜπは3.14なのか」 (~18 phút).
Đọc `projects/ja/pi/SCRIPT.md` (đã duyệt) và `projects/ja/pi/CONTENT.md`. π là GIỚI HẠN (đa giác kẹp hình tròn, giải
đề 東大 2003 π > 3.05), là thước đo của SỰ QUAY (nửa vòng), vì sao chữ số không hết (循環小数, 超越数, 円積問題), và vì
sao trên mặt cong C/d ≠ π. Người xem: người Nhật. Kênh muốn **"sang, xịn, mịn, căng"**, hợp chất Nhật — intro kênh là
3D 漆と金 (sơn mài đen + vàng lá + son đỏ, chữ 明朝 đùn khối). Video bài học là 2D canvas; không phải chép intro, nhưng
phải cùng một gia đình cao cấp. Người dùng SO 3 hướng rồi chọn một (ghép `styleframes-compare.jpg`), nên hai khung của
bạn phải đẹp như khung thật của video.

**Vật xuyên suốt:** MỘT vòng tròn sống qua cả bài và biến hình theo hồi (bị đa giác kẹp → kim quay nửa vòng → chuỗi số
chạy quanh vành → vòng trên quả cầu / yên ngựa). Trong chất liệu của bạn, vòng tròn đó LÀ gì? Hai khung phải cho thấy
cùng một vòng tròn.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0
khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/archive/syracuse.html`, `tools/lab/lantern.html`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác (ô đậu phụ), khoảng trống vô nghĩa.

**Khung 0 — Hồi 1, はさみうち.** 「円の内側に、ぴったり入る多角形… 外側に、円を包みこむ多角形… 正96角形で、円周率が
3.1408と3.1429のあいだにあることを証明しました。」 Hiện: vòng tròn kẹp giữa đa giác trong và ngoài (số cạnh dễ nhìn,
vd. 12, kèm dấu hiệu đã đi tới 96 — vd. bảng 6 → 12 → 24 → 48 → 96), khoảng kẹp `3.1408 < π < 3.1429` (223/71, 22/7),
nhãn tiếng Nhật (vd. 内接・外接, 正96角形). Mascot `assets/character-v2/cut/pose-compass.png` (khung giữa đùi, compa
chĩa sang TRÁI → nhân vật bên PHẢI, x ≥ 1500, cao ~700–780, chân chạm đáy khung).

**Khung 1 — Hồi 2, 回転の影.** 「円の上を、一定の速さで回る点… 壁に映ったその影だけを見ます… 波が現れます。サイン波です。」
+ 「半回転はπ」. Hiện: điểm trên vòng tròn bán kính 1, cung nửa vòng ghi π (và/hoặc 半回転 = π), bóng của điểm vẽ ra
sóng sin theo thời gian. Mascot `pose-spin.png` — TOÀN THÂN, chỉ dùng phần trên 45% ảnh (cắt ngang hông, `crop = 0.45`
như `templates/lesson/kit.js` `figure`), một bên khung (x ≤ 420), ngón trỏ chỉ lên: vẽ thêm vệt vòng quay quanh đầu
ngón bằng code.

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/archive/syracuse.html`): 223/71, 22/7,
chu vi n·sin(π/n), n·tan(π/n), sin của bóng.

## Chữ Nhật
- `assets/fonts/NotoSansJP[wght].ttf` (family "Noto Sans JP", đủ π √ θ ≤ <) cho chữ thường / số / ký hiệu toán.
- `assets/fonts/ShipporiMincho-Regular.ttf`, `-Bold.ttf` (明朝, family "Shippori Mincho") cho tiêu đề — **THIẾU π √ θ**:
  ký hiệu toán trong tiêu đề明朝 phải vẽ bằng Noto Sans JP (hoặc Cormorant Garamond LN cho số/π kiểu sách).
- Có thể dùng Cormorant Garamond LN, IBM Plex Mono cho số. Kiểm ký tự bằng fontTools `getBestCmap`.
- Chữ Nhật trên hình: ngắn, kiểu テロップ (nhãn, công thức, từ khoá), không câu dài.

## Tiếng hiệu ứng — kênh Nhật DÀY HƠN (người dùng 2026-10-10)
Người dùng: người Nhật thích tiếng hiệu ứng **khớp nội dung**, nhiều hơn kênh Anh một chút. Trong khối DNA tóm tắt, đề
xuất bảng tiếng cho chất liệu của bạn: thư viện có sẵn `assets/sfx/` (type tick pop snap whoosh whoosh-long shimmer
impact error correct question beep pen page tear coin chip flap buzzer door card) + **tiếng mới hợp chất liệu Nhật** nếu
cần (vd. 拍子木 chuyển hồi, 鈴/風鈴 khoảnh khắc "à ra thế", 判子 đóng dấu đáp án, 筆 nét cọ, 算盤 hạt bàn tính khi số chạy,
和太鼓 chốt ý lớn — chỉ đề xuất, chưa tải). Mật độ mục tiêu ~1 tiếng / 3 s (kênh Anh 1 / 4–5 s): mỗi テロップ hiện ra
có tiếng.

## Luật chung (docs/CRAFT.md §5, docs/lesson/LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ
  (`document.fonts.load` từng family + weight). Không `ctx.filter` trong lúc vẽ khung (chỉ lúc nạp để làm sprite).
- Không logo, không giao diện thật. Đỏ/son (nếu có) mang nghĩa rõ ràng, ghi trong DNA.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài VÀ hợp
  người xem Nhật), vật xuyên suốt, bảng màu (hex), chữ, bảng tiếng, các phần khác của bài sẽ trông thế nào (người xưa đo,
  đề 東大, 劉徽/祖沖之 + 和算 村松/関/建部, 360° vs ラジアン, 1÷7 余り, ランベルト/リンデマン, 円積問題, kỷ lục 100兆桁,
  quả cầu xích đạo C/d = 2, 馬の鞍, ブラックホール, まとめ).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
