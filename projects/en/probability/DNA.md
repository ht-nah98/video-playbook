# DNA của `probability` — "How to Solve Any Probability Problem — A 1654 Bet" (video bài học, lời đọc)

> Người dùng chọn 2026-10-23: **vở nháp ô li (lab `notebook`) + chèn thư 1654 (lấy từ lab `engraving`) cho phần lịch sử.**
> Phạm vi một câu: thân bài là MỘT trang vở nháp của người đi thi; đoạn Pascal–Fermat / thư 29/7/1654 là một tờ thư cũ
> được KẸP vào vở (giấy vergé ngà, mực sắt, dấu sáp) — không đổi cả khung hình sang thế kỷ 17.
> Khung thật: `styleframes-compare.jpg` (hàng 1 = nền chính, hàng 3 = chất liệu tờ thư). Bàn thử: `tools/lab/notebook.html`,
> `tools/lab/engraving.html`, phần chung `tools/lab/prob-common.js`.

## 1. Ý trung tâm + vật xuyên suốt
**Xác suất là ĐẾM — và đếm thì làm trên giấy nháp.** Người xem thấy chính trang nháp họ sẽ viết khi đi thi: bút bi
xanh viết, bút dạ VÀNG tô thứ ta muốn (biến cố), bút ĐỎ gạch chỗ sai, giấy note dán = một "move".

Vật xuyên suốt: **lưới ô li** của trang vở.
| hồi | lưới ô li thành |
|---|---|
| Cold open | hai thẻ cược dán băng keo; lý lẽ "4 × 1/6 = 2/3" viết bút bi, "=" giữa hai thẻ; 10.000 ván = hai cột đếm vạch (tally) mọc trên ô li |
| Act One | danh sách 6 mặt → đường xác suất 0–1 kẻ thước; lưới 6×6 kẻ bút chì, đỏ = hàng, xanh = cột; ô 7 tô dạ vàng, ô 12 khoanh cam |
| Act Two | "7 × 1/6 = 7/6" vượt mép đường 0–1 (rơi khỏi thước); phần bù = tô dạ vàng NGƯỢC (vùng "không có 6" 5×5 = 25 ô); thư Pascal kẹp vào vở với 671 / 625 |
| Act Three | 5 giấy note dán lên lề (grid · flip · × + · people · ✓); cây xác suất kẻ trên ô li; 1000 người = 1000 chấm ô li (1 đỏ + 10 cam) |
| Putting it together | trang vở lật lại: 5 giấy note thành cột, hai lời giải một dòng |
| Next time | góc trang gấp, viết "23 people?"; đồng xu đặt trên vở → nối fifty-percent |

**Mục lục lời hứa:** 3 câu hỏi viết bút bi, đánh số khoanh tròn ①②③, mỗi hồi tô dạ câu của nó.
**Gạch hiểu lầm → sửa:** bút đỏ gạch MỘT nét (đọc được chữ dưới), lời sửa viết bút bi bên cạnh, mũi tên cong.

## 2. Màu (một màu một nghĩa) — tương phản đo trong lab
| màu | hex | nghĩa |
|---|---|---|
| giấy | #FBF8EF, ô #BFD3E6 (30%), lề đỏ nhạt | nền |
| mực bi | #1E2F6B (chữ), #3A466E (phụ) | trung tính, phép tính |
| dạ VÀNG | #FFE45C (multiply) | cái ta đếm / biến cố |
| CAM | #E2701E (chữ #9A4A10) | ca hiếm, so sánh (ô 12, 10 dương tính giả) |
| XANH LÁ | #1B6B43 | đúng / thắng |
| ĐỎ BÚT | #B02A24 | sai / thua / gạch |
| xúc xắc | đỏ #D8433A · xanh #2F6DB5 | đúng lời "paint one die red and the other blue" (§88) |
| tờ thư 1654 | giấy #EFE3C6, mực sắt #2A2118, sáp đỏ #9E2A22, sáp xanh đồng #2F6B5C | chỉ trong đoạn lịch sử |
Tương phản đo: ink/paper, ink2/card, win, lose, ink/dạ vàng, cam/paper — đều ≥ 4.5 (lab `__contrast`).

## 3. Chữ
Archivo 800 (số lớn, tiêu đề), Archivo 600 (nhãn), IBM Plex Mono Medium (phép tính nháp); tờ thư: Cormorant Garamond
LN 600–700 + Italic. Số ≥ 30 px, chữ ≥ 28 px; ≤ 3 cụm chữ lớn mỗi khung. Phân số viết "1/6" (Plex) hoặc chồng tử/mẫu
(Archivo) — không dùng ký tự ⅙ (kiểm cmap trước khi dùng ký tự lạ).

## 4. Nhịp
Hình bám từ được đọc; không khung đứng yên > 3 s: nét bút bi tự viết (stroke tiến theo t), dạ quang quẹt trái→phải,
xúc xắc lăn trên giấy, tally mọc. Đổi hình = vật mới / bố cục, không chỉ thêm chữ.

## 5. Mascot (nhỏ, một bên, ≤ ~25% cao)
`pose-ponder` (cold open, câu hỏi), `pose-pointer` (lưới, 5 moves), `pose-calculator` (tính 671/1296), `pose-startled`
(7/6 > 1; 9% không phải 99%), `pose-thumb` (kết). Mỗi lần gắn một khoảnh khắc.

## 5b. Người que — "dân cược 1654" bằng nét bút bi
Nét mực bi #1E2F6B, dày 0.05h; mũ rộng vành + lông chim đỏ (đạo cụ của de Méré); trong đoạn thư 1654 có cổ áo ren.
Tính cách: tự tin, cộng vội, rồi ngơ ngác. Sống TRÊN trang vở, chạm vào chữ / số như vật.
| câu | người que làm gì | sự vật đổi gì |
|---|---|---|
| "two bets he was sure were exactly the same" | đứng giữa hai thẻ, nhún vai (shrug) | — |
| "His reasoning sounded perfect" | đẩy hai phân số "2/3" lại gần, đặt "=" giữa | dấu "=" in đậm |
| "ten thousand games" | ngồi bệt đếm tally, mệt dần | cột tally mọc |
| "He was counting the wrong thing" | dấu "=" nứt, rơi trúng đầu | "=" vỡ đôi |
| "seven sixths, more than one" | leo lên đầu thước 0–1, rơi ra ngoài | "7/6" trượt khỏi thước |
| "count the opposite instead" | lật ngược tờ note (flip) | vùng tô vàng đổi sang 25 ô |
| "Twenty-four rolls … forty-nine point one" | xách 24 xúc xắc, rơi một cái | 25 → 50.6 |
| "five moves" | dán từng giấy note lên lề | note 1–5 |
| "Imagine a thousand people" | đứng giữa đám chấm, chỉ 1 chấm đỏ | 10 chấm cam sáng lên |
| "check" | đánh dấu ✓ khổng lồ bằng cả người | ✓ |
Tư thế: `engine/stick.js` P.*; chuyển động `engine/stickmove.js`. Mũ đặt theo `J.head` (lab notebook).

## 6. Intro
Kênh Anh không intro. p1 (cold open) khép về trang vở trắng còn lưới ô li → p2 mở trên CÙNG trang (cùng toạ độ lưới).

## 7. Camera / chuyển cảnh
Trong vở: lật trang (giấy cong + bóng gradient, KHÔNG shadowBlur), hoặc camera trượt dọc trang. Vào đoạn thư 1654: tờ thư
trượt vào từ mép, kẹp đè lên vở; ra: tờ thư trượt đi.

## 8. Chân dung / hiện vật
Pascal (1623–1662), Fermat (1601–1665): ảnh Commons in như bản khắc dán trên tờ thư. de Méré (Antoine Gombaud,
1607–1684): không dùng chân dung → người que dân cược (ghi "IMAGINED" nếu có khung chân dung).

## 9. CẤM
- Bàn nỉ xanh, phỉnh casino, đèn đêm (của fifty-percent).
- Gạch xoá làm chữ không đọc được (đã sửa trong lab).
- Ký tự ⅙ ½ không kiểm cmap; số không có trong CONTENT.
- "He lost a fortune" — sử không chắc (CONTENT, Ore).

## 10. Tiếng (docs/lesson/SFX.md — thư viện `assets/sfx/library.json`)
bút bi viết (scribble) · dạ quang quẹt (swish ngắn) · xúc xắc lăn trên giấy (cần CC0 "dice roll" — tải) · giấy note
dán (pop) · lật trang (paper) · "=" vỡ (crack nhẹ) · ✓ (tick) · tờ thư trượt (paper slide). Trần: dice ≤ 12 cả bài.

## 11. Vật dùng chung (kit)
Lưới ô li 40 px (gốc x 12, y 20); xúc xắc `die(cx, cy, s, n, col)`; lưới 6×6 ô 104 px; phép tính nháp Plex;
dạ quang `hi(path)`; gạch đỏ `strike()`; vòng khoanh `ring()`; giấy note `note()`; tờ thư `letter()` — từ lab.

## 12. Chỉ số sàn
Đặt sau kit (đo ảnh thật mẫu a0).
