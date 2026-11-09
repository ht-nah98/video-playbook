# Brief: bàn thử phong cách (DNA) cho neg-times-neg — mỗi agent MỘT hướng

Video bài học kênh "99% from scratch", tiếng Anh, "Why Is a Negative Times a Negative Positive?". Ý trung tâm: không
ai CHỌN âm × âm = dương — ta chỉ chọn giữ luật cũ (phân phối, số đối, số 0), và luật cũ ÉP ra kết quả; đổi kết quả thì
số học sụp (0 = −2). Đọc `projects/en/neg-times-neg/SCRIPT.md` (đã duyệt) và `projects/en/neg-times-neg/CONTENT.md`.
Người dùng sẽ SO 3 hướng rồi chọn một (như `projects/en/fifty-percent/styleframes-compare.jpg`), nên hai khung của bạn
phải đẹp như khung thật của video.

**Vật xuyên suốt** (docs/lesson/LESSON-VIDEO.md "Học từ video mẫu số Pi"): **một CẶP SỐ ĐỐI triệt tiêu về 0** (x và −x
cộng lại thành không). Nó có ở lịch sử (nợ ↔ tài sản, que dương ↔ que âm), ở các cách giải thích (quay đầu trên trục
số), là TRỤC của chứng minh (bước nào cũng "hai số cộng lại bằng 0 thì là số đối của nhau"), và là thứ bị phá ở hồi 4.
Trong chất liệu của bạn, cặp số đối đó LÀ gì, và "triệt tiêu về 0" trông ra sao? Hai khung phải cho thấy cùng một vật.
Màu mang nghĩa: dương và âm mỗi bên MỘT màu cố định trong cả video; "sai" (chữ bị gạch, phép phá) một dấu hiệu riêng,
không trùng màu dương/âm. Không lặp DNA các bài trước: chất liệu theo thời đại, trang giấy + bút chấm, con đường, đèn
trong đêm, bàn dựng hình (compa xanh).

## Hướng của bạn (đạo diễn giao — ghi trong lời giao việc)
- **rods — bàn tính que.** Bàn đếm gỗ sơn mài của Cửu chương toán thuật; que tính hai màu (lịch sử: đỏ = dương, đen =
  âm — nếu giữ thì "sai" phải là dấu hiệu khác đỏ). Cặp số đối = một que dương + một que âm đặt chéo nhau rồi gạt khỏi
  bàn. Chữ số / công thức như khắc hoặc viết bút lông trên giấy dán bàn.
- **tiles — viên gạch đại số.** Đồ dùng học toán thật ("algebra tiles"): viên +1 và viên −1 hai màu, phẳng, có độ dày
  và bóng đổ nhẹ, trên mặt bàn học. Cặp số đối = "zero pair": hai viên úp vào nhau và biến mất. Phép nhân = hình chữ
  nhật lưới viên.
- **ledger — sổ cái kế toán.** Sổ kép (debit | credit) giấy ngà, mực sắt, kẻ ô, tem; dòng gạch đôi tổng kết. Cặp số
  đối = một dòng ghi nợ và một dòng ghi có cùng số, cân về 0 (dòng tổng "0.00" gạch đôi). Chứng minh = các dòng bút
  toán phải cân.

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: một trang canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`,
khung 0 khi t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/drafting.html`, `tools/lab/lantern.html`.
Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng
chữ, tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa.

**Khung 0 — Hồi 3, bước cuối của chứng minh.** "Start with minus three times, two plus minus two. Inside the brackets
is zero… By the distributive law, the same thing is minus three times two, plus minus three times minus two… So minus
three times minus two is the opposite of minus six. And the opposite of minus six is six."
Hiện: (−3) × (2 + (−2)) = (−3) × 0 = 0 · = (−3) × 2 + (−3) × (−2) = −6 + (−3) × (−2) · kết luận (−3) × (−2) = 6.
Cặp số đối (2 và −2, rồi −6 và 6) phải hiện bằng VẬT XUYÊN SUỐT của bạn, không chỉ chữ. Mascot
`assets/character-v2/cut/pose-chalk.png` (khung giữa đùi, nửa thân) một bên khung (x ≥ 1500 hoặc ≤ 420), cao ~700–780,
chân/đáy ảnh chạm đáy khung.

**Khung 1 — Hồi 4, thử phá.** "Suppose we decide… that minus one times minus one is minus one… Take minus one times, one
plus minus one… zero. But the distributive law says it's also minus one times one, plus minus one times minus one.
That's minus one, plus our new minus one. Minus two. So zero equals minus two. One small change, and arithmetic
collapses." Hiện: giả định (−1) × (−1) = −1 (đánh dấu là giả định), hai vế, và **0 = −2** với dấu hiệu "sai/sụp" của
DNA — cặp số đối không còn cân. Mascot `pose-startled.png` (TOÀN THÂN — đứng nguyên, cao ~760, một bên khung).

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/drafting.html`): (−3)×2, (−3)×0,
−6 + 6, (−1)×1 + (−1) = −2. Kết quả hiện ra là số code trả về.

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ một lần lúc nạp để làm sprite mờ sẵn).
- Font có sẵn `assets/fonts/` (Archivo biến thiên, IBM Plex Mono, Cormorant Garamond bản **LN** — số thẳng hàng). Dấu
  trừ: dùng "−" (U+2212) và kiểm bằng fontTools `getBestCmap` cho đúng font bạn dùng; thiếu thì vẽ tay. × cũng kiểm.
- Không logo, không giao diện thật.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu hợp bài), vật xuyên
  suốt là gì, bảng màu (hex, nghĩa từng màu), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type tick pop snap whoosh
  whoosh-long shimmer impact error correct question beep pen page tear coin chip), các phần khác sẽ trông thế nào
  (Stendhal, Diophantus 4x + 20 = 4, que Trung Quốc, Brahmagupta, Cardano/Maseres/Frend, câu chuyện nợ, dãy số, quay
  180°, Euler, các luật, mục tóm tắt, quay 90° ở lần sau).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
