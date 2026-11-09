# Brief: khung phong cách (DNA) cho intuition — hướng "gameshow" (người dùng đã chọn)

Video bài học kênh "99% from scratch", tiếng Anh, "Should You Trust Your Intuition in Math?". Đọc
`projects/en/intuition/SCRIPT.md` và `projects/en/intuition/CONTENT.md` trước. Hai bài toán: **Monty Hall** (ba cửa, dê, xe)
và **0,999… = 1**; mở bài bằng hộp Bertrand (3 lá bài); ý trung tâm: trực giác là động cơ, logic là phanh.

## Hướng: GAMESHOW — sân khấu truyền hình thập niên 70
Cả video là một trường quay game show: nền phông tối ấm, sàn bóng phản chiếu, **cửa sơn lớn có số** (1, 2, 3), viền
**bóng đèn tròn chạy** (marquee bulbs) quanh bảng, **bảng số lật** (split-flap — mỗi ô một tấm lật nửa trên/nửa dưới,
khe giữa, lật có chuyển động gập) để hiện số/chữ. Hồi 2 (0,999…) dùng chính bảng lật: các ô 9 lật mãi, bảng dài ra.
Không logo / không tên chương trình thật (không "Let's Make a Deal" trên hình như logo — tên chỉ được viết thường như
một dòng chú thích trên bảng lật). Vẽ dê và xe kiểu biểu tượng bìa cứng (cutout phẳng, viền dày), không ảnh thật.

**Vật xuyên suốt: "THẺ TRẢ LỜI BẬT RA" (the gut answer)** — tấm bảng trả lời cầm tay của thí sinh (bìa cứng, chữ bút
dạ viết tay) ghi con số lóe lên đầu tiên: "50%" (lá bài), "50/50" (cửa), "STILL A LITTLE SHORT" (0,999…). Logic trả lời
bằng **bảng lật** (chữ in, đèn). Ở Monty Hall thẻ bị đóng dấu X đỏ kiểu còi sai của game show; ở 0,999… thẻ KHÔNG bị
gạch mà được dán nhãn "A DIFFERENT NUMBER SYSTEM". Bạn đề xuất cụ thể trông ra sao.

**Màu mang nghĩa (đề xuất, bạn đo tương phản bằng số và chỉnh):** đèn vàng hổ phách = logic / đáp án đã tính (bảng lật,
bóng đèn sáng); hồng sen/magenta bút dạ = trực giác (thẻ trả lời viết tay); đỏ tín hiệu = SAI (dấu X còi); xanh ngọc =
"cánh cửa / xác suất dồn về" (khối 2/3 di chuyển). Màu là chữ ký nghĩa, không trang trí. Không lặp DNA cũ (thời đại, giấy +
bút, con đường, đèn đêm, bàn compa, gạch đại số, LCD).

## Việc của bạn
Viết `tools/lab/gameshow.html`: canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0 khi t < 1,
khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/lcd.html`, `tools/lab/tiles.html`. Chụp:
```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js stills --page tools/lab/gameshow.html --dur 2 --t 0.5,1.5 --outdir out/_lab/gameshow
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa. Hai khung phải ĐẸP như khung thật của video.

**Khung 0 — Hồi 1, "What the host knows".** "Your door is still one in three. The other door now holds two in three."
Ba cửa lớn trên sân khấu; cửa 1 có dấu "YOUR PICK" và nhãn 1/3; cửa 3 đã mở lộ dê (cutout); cửa 2 đóng, mang khối 2/3
(khối xác suất đã "chảy" từ ngoặc bao cửa 2+3 dồn về cửa 2 — gợi chuyển động bằng vệt). Bảng lật phía trên: "STAY 1/3 ·
SWITCH 2/3". Thẻ trả lời của thí sinh "50/50" bị dấu X đỏ. Mascot `assets/character-v2/cut/pose-twoways.png` (khung
giữa đùi) một bên khung (x ≥ 1500 hoặc ≤ 420), cao ~700–780, đáy ảnh chạm đáy khung.

**Khung 1 — Hồi 2, "What the dots mean".** Bảng lật nhiều dòng: 0.9 / 0.99 / 0.999 / 0.9999 … với cột "GAP TO 1": 0.1 /
0.01 / 0.001 / 0.0001; dòng cuối ô 9 đang lật dở (chuyển động gập); bên phải "0.999… = WHERE THIS IS HEADING = 1" bằng
đèn vàng. Thẻ trả lời "STILL A LITTLE SHORT" KHÔNG bị gạch — dán nhãn "A DIFFERENT NUMBER SYSTEM". Mascot
`pose-crossed.png` một bên khung, cao ~700–780.

MỌI con số tính bằng code: `must(biểu thức, giá trị)` ném lỗi nếu sai (xem `tools/lab/tiles.html`): 1/3 + 2/3 = 1, các
khoảng cách = 1 − 0.9…9 (làm tròn đúng), số dòng lật.

## Luật chung (docs/CRAFT.md §5, LESSON-VIDEO.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ).
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` từ `engine/lib.js`. Promise.all mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ một lần lúc nạp để làm sprite mờ sẵn).
- Font có sẵn `assets/fonts/` (Archivo biến thiên — dùng trục wdth hẹp/đậm cho chữ bảng lật kiểu Solari; IBM Plex Mono;
  Cormorant Garamond bản **LN**). Chữ viết tay bút dạ: KHÔNG có font viết tay → vẽ bằng nét path (stroke đậm, đầu tròn,
  hơi lệch theo hash) cho số và vài chữ hoa, hoặc Archivo rất đậm xoay nhẹ — đề xuất cách đẹp hơn. Kiểm glyph bằng
  fontTools `getBestCmap` (… , ⅓, ×, −).
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm, vật xuyên suốt, bảng màu (hex, nghĩa
  từng màu, tỉ lệ tương phản), chữ, tiếng hiệu ứng hợp chất liệu (thư viện: type tick pop snap whoosh whoosh-long shimmer
  impact error correct question beep pen page tear coin chip; đề xuất loại mới nếu cần: lật bảng `flap`, còi sai `buzzer`,
  cửa mở `door`, dê `goat`), các phần khác sẽ trông thế nào (hộp Bertrand 3 lá bài, cảnh lớp học phim 21 vẽ lại, 100 cửa,
  mô phỏng 1.000 ván, vos Savant + thư, luật không ai nói, 1/3 × 3, 10x − x, không số nào chen giữa, Newton/Leibniz/
  Robinson, động cơ/phanh, Poincaré, tóm tắt, lần sau).
- Chỉ tạo `tools/lab/gameshow.html` và ảnh trong `out/_lab/gameshow/`. Không sửa file khác, KHÔNG commit, không gọi agent.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
