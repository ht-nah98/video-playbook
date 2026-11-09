# Brief: bàn thử phong cách (DNA) cho ja/gacha — mỗi agent MỘT hướng

Video bài học kênh Nhật **99の発見**, lời đọc tiếng Nhật, 「ガチャの罠」 (~14 phút). Đọc `projects/ja/gacha/SCRIPT.md`
(ĐÃ DUYỆT — lời đọc trước `---`, gói đăng sau `---`) và `projects/ja/gacha/CONTENT.md` (số đã kiểm). Mạch: Bỉ gọi ガチャ là
賭博, Nhật hợp pháp → 0.6% (1000 người → 6 người) → mô hình thuần 0.6% (100 lần → 55% trắng tay, 116 lần mới quá nửa) →
天井 thật: 0.6% tới lần 73, từ 74 mỗi lần +6%, lần 90 chắc chắn → 36% trúng trước 74, 56% trúng ở 74–80, quá nửa quay ≥ 76
→ dopamine chờ (khỉ, 2003, đỉnh ở 50%), near-miss → hộp Skinner, 4 bước Hooked, đồng hồ 23 giờ, bảng tin lọc → đặt cạnh
máy slot, luật Bỉ / Hà Lan / Trung Quốc / Anh / Nhật (コンプガチャ 2012, CESA 2016) → 0.15% tạo nửa doanh thu, đuôi dài,
天井 ≈ 3万円, sao kê → 3 khúc rẽ, まとめ.

Kênh muốn **"sang, xịn, mịn, căng"**, cao cấp kiểu Nhật (intro kênh 3D 漆と金). Bài trước: ja/pi 天球, ja/2048 盤上 (bàn
榧 + quân 駒), ja/chirality 合わせ鏡, ja/hikari 節穴の暗室 — bài này PHẢI KHÁC. Gói đăng (PACKAGING §0b): thumbnail =
**điện thoại ガチャ ↔ máy slot**, đối lập MÀU, chữ 「同じ？」 → khung 0–5 s phải là thế giới đó. Thumbnail nên SÁNG hơn tối.
Người dùng SO 3 hướng rồi chọn một (ghép `styleframes-compare.jpg`), nên hai khung phải đẹp như khung thật của video.

**KHÔNG chép giao diện thật của game nào** (原神, FGO…): không logo, không nhân vật, không UI thật. ガチャ trong video là
một máy / màn TỰ THIẾT KẾ theo chất liệu của bạn. ★5 = "最高レア" — một màu / chất liệu riêng, hiếm và sáng nhất.

**Vật xuyên suốt:** MỘT lượt quay (một "đơn vị may rủi"): trong chất liệu của bạn nó LÀ gì (viên nang, thẻ, ô, đèn…)?
Nó phải xếp được thành lưới 1000, thành dãy 90 cột, thành tiền (160 viên đá → 1 lượt), và thành điểm trên đồ thị phân bố.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0
khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/banjo.html`, `tools/lab/sangaku.html`.
Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác (ô đậu phụ), khoảng trống vô nghĩa.

**Khung 0 — Cold open 0–5 s (= thế giới thumbnail).** 「スマホのガチャと、カジノのスロット。ベルギーでは、どちらも『賭博』です。」
Hiện: bên trái một điện thoại đang quay ガチャ (thiết kế của bạn — nút 「回す」, ánh ★5 vừa lóe), bên phải một máy slot
(3 cuộn, cần gạt) — HAI vật cùng dáng "nút → chờ → ánh vàng", đối lập MÀU (ví dụ pastel / sáng ↔ đỏ casino / tối). テロップ
「ベルギーでは、どちらも「賭博」」. Mascot nhỏ (≤ ~45% chiều cao khung — mascot là dấu phụ, nội dung là chính):
`assets/character-v2/cut/pose-phone.png` hoặc `pose-ponder.png`, ở mép, không che hai vật.

**Khung 1 — ACT 2 「74回目から」.** 「74回目でおよそ6.6%。そこから1回ごとに、およそ6%ずつ…半分以上の人は、74回目から80回目
のあいだで当たります。」 Hiện: (a) dãy 90 cột = xác suất từng lần quay: 0.6% phẳng tới 73 (gần như không thấy), từ 74 dựng
lên 6.6, 12.6 … 96.6, 100% ở 90 — vạch 「74」 「90 = 天井」; (b) dưới hoặc chồng lên: phân bố lần trúng đầu tiên của 200
người (cột / chấm theo chất liệu), đỉnh ở 74–80, nhãn 「36%」 (≤ 73) và 「56%」 (74–80). テロップ 「74回目から」. Mascot
`pose-pointer.png` chỉ vào vùng 74–80, một bên khung, nhỏ.

MỌI con số tính bằng code và `must(biểu thức, giá trị)` (xem `tools/lab/sangaku.html`): mô hình p(n) = 0.006 (n ≤ 73),
min(1, 0.006 + 0.06·(n−73)) (n ≥ 74); P(trúng ≤ 73) = 0.356 → 「36%」, P(74–80) = 0.563 → 「56%」, trung vị 76, trung bình
62.3; 200 người = 200 × pmf (làm tròn, tổng = 200).

## Chữ Nhật
- `assets/fonts/NotoSansJP[wght].ttf` ("Noto Sans JP") cho chữ thường / số / ký hiệu; `ShipporiMincho-Regular/Bold.ttf`
  (明朝) cho tiêu đề — kiểm cmap bằng fontTools `getBestCmap` nếu dùng ký tự lạ (★ %).
- **Chữ Nhật ≥ 28 px**, số ≥ 30 px; テロップ ngắn.

## Tiếng hiệu ứng — kênh Nhật dày (~1 tiếng / 2.5–4 s, khớp nghĩa)
Thư viện `assets/sfx/library.json`. Đề xuất bảng tiếng cho chất liệu của bạn (nút quay, chờ, ánh ★5, trượt, đồng xu / tiền,
slot) — tiếng mới chỉ đề xuất, chưa tải.

## Luật chung (docs/CRAFT.md §5)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` (`engine/lib.js`). Promise.all mọi font trước vẽ.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu này hợp bài + người xem
  Nhật), vật xuyên suốt, bảng màu (hex, một màu = một nghĩa: ★5, tiền, cảnh báo/casino, trung tính), chữ, bảng tiếng, các
  phần khác sẽ trông thế nào (lưới 1000, hộp Skinner + ảnh thật, Hooked 4 bước, đồng hồ 23時間, bảng tin SNS tự vẽ, bản đồ
  + ảnh báo cáo thật, đuôi dài 0.15%, sao kê 3万円, 3 khúc rẽ). Video sẽ dùng NHIỀU ẢNH THẬT (`projects/ja/gacha/assets/
  photos/`, `assets/web/`) — chất liệu của bạn phải có "khung ảnh" hợp để đặt chúng vào (thử một ảnh nhỏ trong khung 0
  hoặc 1 nếu chỗ trống cho phép).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
