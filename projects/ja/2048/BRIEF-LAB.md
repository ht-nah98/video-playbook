# Brief: bàn thử phong cách (DNA) cho ja/2048 — mỗi agent MỘT hướng

Video bài học thứ hai của kênh Nhật **99の発見**, lời đọc tiếng Nhật, 「2048の数学 ― なぜ私たちは負けるのか」 (~14 phút).
Đọc `projects/ja/2048/SCRIPT.md` (đã duyệt) và `projects/ja/2048/CONTENT.md`. Mạch: tổng trên bàn bảo toàn (保存則, +2.2 mỗi
lượt) → bức tường 131072 (bậc thang 4,4,8,…,65536 kín 16 ô = 2¹⁷) → vì sao dồn góc (hình rắn, gộp dây chuyền) → đối thủ là
MAY RỦI (cây trò chơi: nút ta chọn max, nút may rủi lấy kỳ vọng 0.9/0.1 — エクスペクティマックス; 将棋AI = ミニマックス) →
máy tự học (TD学習, chấm bàn ngay sau khi vuốt, trước khi ô mới rơi) → không thắng mãi được (ô thứ 16 phải là ô 4 vừa rơi,
1/10). Người xem: người Nhật. Kênh muốn **"sang, xịn, mịn, căng"**, hợp chất Nhật — intro kênh là 3D 漆と金 (sơn mài đen
+ vàng lá + son đỏ, chữ 明朝 đùn khối); bài trước (ja/pi) dùng DNA 天球 (trời chàm, vành đồng thau, son = π). Bài này
PHẢI KHÁC bài π nhưng cùng gia đình cao cấp. Người dùng SO 3 hướng rồi chọn một (ghép `styleframes-compare.jpg`), nên
hai khung của bạn phải đẹp như khung thật của video.

**Vật xuyên suốt:** BÀN 4×4 và các ô số. Trong chất liệu của bạn, bàn và ô LÀ gì (vật thật nào)? Ô 2, 4, 8 … 131072 phân
biệt bằng gì ngoài con số (màu, chất liệu, độ cao, hoa văn…) — 17 bậc phải đọc được, ô lớn phải "nặng" hơn ô nhỏ. Hai khung
phải cho thấy cùng một bàn.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0
khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/sangaku.html`, `tools/lab/tenkyu.html`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác (ô đậu phụ), khoảng trống vô nghĩa, số trong ô tràn ô.

**Khung 0 — Hồi 2, 131072の壁.** 「16マスにぴったり収まるいちばん高い階段… 4、4、8、16と倍々に進んで、65536まで。…{1枚|いちまい}の
131072になります。」 Hiện: bàn 4×4 kín 16 ô xếp hình rắn (snake) 65536 ở góc, giảm dần, đáy là HAI ô 4; dải chú thích
「4 + 4 + 8 + … + 65536 = 2¹⁷ = 131072」 (mọi số tính bằng code, `must`), テロップ 「131072の壁」, gợi ý ô 131072 sắp
thành (bóng mờ / viền). Mascot `assets/character-v2/cut/pose-phone.png` (giơ điện thoại, liếc nghi ngờ — màn điện thoại
có thể vẽ một bàn 2048 nhỏ bằng code), một bên khung, cao ~700–780, chân chạm đáy khung, chữ ở nửa kia.

**Khung 1 — Hồi 4, 相手の名は「運」.** 「自分の番では、いちばん良い手を選びます。運の番では…確率で重みをつけた平均、つまり期待値を
とります。2には10分の9、4には10分の1。」 Hiện: cây trò chơi nhỏ — nút gốc (một bàn mini) → 4 nhánh ↑↓←→ (nút TA, chọn
max, nhánh tốt nhất sáng) → một nút MAY RỦI → các bàn con có ô mới 2 (0.9) / 4 (0.1) rơi vào chỗ trống, giá trị kỳ vọng
tính bằng code; テロップ 「期待値」/「エクスペクティマックス」. Mascot `pose-coin-flip.png` (búng đồng xu — đồng xu vẽ lại
bằng code), một bên khung.

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/sangaku.html`): 4+4+…+65536 = 131072,
0.9·2 + 0.1·4 = 2.2, kỳ vọng ở nút may rủi. Bàn mini phải là trạng thái 2048 hợp lệ (luật trượt + gộp thật nếu vẽ "sau
khi vuốt").

## Chữ Nhật
- `assets/fonts/NotoSansJP[wght].ttf` (family "Noto Sans JP", đủ ký tự toán) cho chữ thường / số / ký hiệu.
- `assets/fonts/ShipporiMincho-Regular.ttf`, `-Bold.ttf` (明朝, "Shippori Mincho") cho tiêu đề — **THIẾU π √ θ ² ¹⁷**:
  số mũ và ký hiệu toán vẽ bằng Noto Sans JP hoặc Cormorant Garamond LN. Kiểm cmap bằng fontTools `getBestCmap`.
- Số trong ô: chọn font số hợp chất liệu (Cormorant Garamond LN, IBM Plex Mono, Archivo, Noto Sans JP…) — 6 chữ số
  (131072) phải vừa ô và đọc được.
- **Chữ Nhật ≥ 28 px** (LESSONS §95), số ≥ 30 px; chữ Nhật trên hình kiểu テロップ ngắn.

## Tiếng hiệu ứng — kênh Nhật dày (~1 tiếng / 3 s, mỗi テロップ có tiếng, KHỚP NGHĨA)
Thư viện `assets/sfx/`: type tick pop snap whoosh whoosh-long shimmer impact error correct question beep pen page tear
coin chip flap buzzer door card + tiếng Nhật hyoshigi soroban hanko suzu taiko. Đề xuất bảng tiếng cho chất liệu của bạn
(vd. tiếng ô trượt, tiếng gộp tăng dần theo cấp, ô mới rơi, đồng xu / xúc xắc cho may rủi) — tiếng mới chỉ đề xuất, chưa tải.

## Luật chung (docs/CRAFT.md §5, docs/lesson/LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ lúc nạp để làm sprite).
- Không logo, không giao diện thật của app 2048 (màu be/cam gốc của Cirulli là nhận diện của người khác — KHÔNG chép).
  Màu mang nghĩa ghi trong DNA (một màu = một nghĩa).
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài VÀ hợp người
  xem Nhật), vật xuyên suốt, bảng màu (hex), chữ, bảng tiếng, các phần khác của bài sẽ trông thế nào (Cirulli/Threes!,
  保存則 + 質量保存, 930/1018 lượt, bậc thang, hình rắn + gộp dây chuyền, luật ↓←→↑, 1.2垓, 将棋AI vs may rủi, Michie,
  71.5%/96%, TD学習 afterstate, Szubert & Jaśkowski, 松崎, Đài Loan 1/10000, bảng tra 86%/8.4%, ô thứ 16 = ô 4, まとめ).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
