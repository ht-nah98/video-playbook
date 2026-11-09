# 09 — Nghiên cứu đề tài: xác suất (bản chất + cách giải bài) — 2026-10-23

Người dùng: fifty-percent ("What Does 50% Actually Mean?", CTR 0.81%) yếu vì nó là triết học / sự kiện khoa học của xác
suất, không phải toán. Kênh cần một bài **làm tiền đề**: bản chất xác suất + cách áp dụng để giải bài (cả khi đi thi).
Nguồn: 7 video YouTube (lời đọc, `out/_lab/study/prob/*.txt`, không commit), hkt-project (series probability), web,
số kênh ta (Studio export 22/10). Mọi con số dưới đây tính bằng code (`fractions`), trừ chỗ ghi "nguồn ngoài".

## 1. Trần của đề tài (YouTube Data API, sắp theo view, 12 cụm từ khoá, 2026-10-23)

| nhóm | video lớn nhất | view |
|---|---|---|
| nghịch lý / đố mẹo | Zack D. Films — Monty Hall (Short) · Veritasium — 100 prisoners · Vsauce2 — Birthday Paradox · Vsauce2 — The Easiest Problem Everyone Gets Wrong | 40M · 19M · 14M · 3.7M |
| Bayes / xét nghiệm | 3Blue1Brown — medical test paradox (Short) · **3Blue1Brown — Bayes theorem** (người dùng gửi) · Veritasium — The Bayesian Trap | 11M · 6.0M · 4.5M |
| nhập môn "basic probability" | Khan — independent/dependent events · **Math Antics — Basic Probability** (người dùng gửi) · Organic Chemistry Tutor — intro, sample space, tree diagrams | 5.8M · 4.8M · 4.0M |
| ôn thi | Dear Sir — Probability Tricks (24 ph) · Shobhit Nirwan — Class 10 One Shot (1h50) | 5.2M · 4.3M |

- Trần rất cao ở cả 4 nhóm. Nhóm "ôn thi" gần như toàn bộ là Ấn Độ (Class 10/12, SSC) — khán giả khác ta.
- **Cảnh báo từ chính kênh ta:** video cũ "The Essence of Probability" — **6 view / 7 ngày** (PACKAGING §1). "Bản chất của
  xác suất" là TÊN CHƯƠNG; đề tài tốt, nhưng gói không được mang tên này.
- Khán giả kênh Anh (Studio, 03/08–22/10): 25–34 tuổi 42%, 18–24 19%, 35–44 19%, 13–17 11% → người lớn tò mò là chính;
  học sinh ~30%. Góc "đi thi" là một phần lời hứa, không phải toàn bộ gói.
- Từ khoá tìm thật đã dẫn tới kênh: "probability" (3 view) — có nhu cầu, chưa có bài khớp.

## 2. Các video mẫu làm gì (đọc toàn bộ lời)

**3Blue1Brown — "Bayes theorem, the geometry of changing beliefs" (15:11, 6.0M)**
- 0:00 hứa + lý do quan tâm (khoa học, AI, kho vàng 700 triệu USD tìm bằng Bayes). Nói rõ **3 mức hiểu** (cắm số → vì sao
  đúng → biết KHI NÀO dùng) và đi **ngược**: bắt đầu từ biết khi nào dùng.
- Câu đố cho NGƯỜI XEM trước công thức: Steve nhút nhát — thủ thư hay nông dân? Trả lời bằng **mẫu đại diện**: 200 nông
  dân + 10 thủ thư → 20 + 4 người hợp mô tả → 4/24 = 16.7%.
- "Đừng học thuộc công thức, hãy vẽ hình": không gian = hình vuông 1×1, xác suất = diện tích. "Toán xác suất thực chất
  là toán của TỈ LỆ."
- Linda (Kahneman–Tversky): 85% chọn sai; hỏi lại bằng "100 người như vậy, bao nhiêu…" → gần như không ai sai (theo lời
  video). → **đổi % thành số người là công cụ mạnh nhất.**

**Math Antics — "Basic Probability" (11:28, 4.8M)**
- Mức tiểu học, vui (tiểu phẩm), chậm, chắc: chắc chắn ↔ ngẫu nhiên; **đường xác suất 0–1** (0 không thể, 1 chắc chắn,
  ½ ngang nhau); phân số / thập phân / %.
- Công thức duy nhất: **số khả năng ta muốn ÷ tổng số khả năng**; lặp trên đồng xu, xúc xắc, vòng quay 16 ô (5 xanh,
  11 vàng), túi bi (3/7/1).
- Thử nhiều lần: ít lần thì lệch, nhiều lần thì gần (luật số lớn); **kiểm: tổng mọi khả năng = 1**.
- Không có bẫy, không có "vì sao lạ" — sống nhờ người tìm "basic probability" (đi học).

**Veritasium — "The Bayesian Trap" (10:37, 4.5M)** — ngôi thứ hai ("bạn thấy hơi mệt…"), xét nghiệm đúng 99%, bệnh
0.1% → người xem đoán 99%, thật **9.0%**; giải bằng 1000 người (1 bệnh + 10 dương tính giả → 1/11). Xét nghiệm lần 2
→ **90.8%**. Lịch sử Bayes / Price, rồi thông điệp đời sống.

**Vsauce2 — "The Birthday Paradox" (8:03, 14M)** — 23 em bé → 50.7% (người ta đoán 23/365 ≈ 6%); giải bằng PHẦN BÙ
(tính xác suất KHÔNG trùng rồi trừ 1). 50 người 97.0%.

**Vsauce2 — "The Easiest Problem Everyone Gets Wrong" (15:04, 3.7M)** — ba tù nhân, hộp Bertrand (1889), Monty Hall:
"thứ trông như 50/50 thật ra không phải" — cùng một gốc: **đếm khả năng chứ đừng đếm kết cục còn lại**. 10.000 thư phản
đối Marilyn vos Savant (~1.000 người ký PhD, theo lời video). → nối thẳng với fifty-percent.

**Organic Chemistry Tutor — intro, sample space, tree diagrams (17:00, 4.0M)** — giải bài kiểu bảng đen: liệt kê không
gian mẫu, cây xác suất. Nhu cầu "cách làm bài" có thật.

Rút ra: video lớn đều **bắt người xem đoán sai trước** (Steve, 99%, 6%, 50/50) rồi dùng một công cụ đơn giản (đếm người,
phần bù, liệt kê) cho thấy vì sao sai. Không video lớn nào mở bằng định nghĩa.

## 3. hkt-project (`~/Desktop/hkt-project/content/series/probability/`)

- Kế hoạch 3 bài theo sách [Y]: l01 *Counting What Could Happen* (phép thử, Ω, biến cố, `P(A)=n(A)/n(Ω)`, phần bù,
  nguyên lý xác suất bé) · l02 hợp / giao, xung khắc ≠ độc lập (cặp hay nhầm nhất) · l03 có điều kiện + Bayes (cây 4 nhánh).
- Kịch bản l01 (1.328 từ, ~9 ph): móc = bài toán ngày sinh; **ba bước: danh sách → phần → lối tắt (phần bù)**; lưới
  6×6 = 36 khả năng; bẫy "11 tổng từ 2 đến 12 không ngang nhau"; "ít nhất một sáu" đếm thẳng 11/36 vs phần bù 25/36;
  3 đồng xu 7/8; "nhỏ so với cái gì?" (1/1000 × 1 tỷ liều).
- Bài học kỹ thuật dùng được cho ta: ký hiệu Ω ∅ ∩ ∪ Ā | phải được ĐỌC (`P(A|B)` từng bị đọc thành "P A B" = giao);
  móc 39.7 s → 21.5 s bằng cách DỜI câu dạy vào thân, không xoá.
- Bài ta không bê nguyên: hkt là bài giảng theo sách (đọc chậm, Manim). Ta lấy khung "danh sách – phần – lối tắt" và các
  ví dụ đã kiểm, viết lại theo khuôn kênh (PACKAGING §0b, người que, DNA riêng).

## 4. Nghiên cứu ngoài (web)

- Hiểu lầm phổ biến nhất ở học sinh / sinh viên: **thiên kiến ngang khả năng** (mọi kết cục coi như bằng nhau — "hai
  tổng bất kỳ của hai xúc xắc như nhau", "còn 2 cửa = 50/50"), thiên kiến tính đại diện, "định hướng kết cục"; ở giáo
  viên tương lai lỗi số 1 là **không liệt kê được khả năng**. Morsanyi và cộng sự (2009): thiên kiến ngang khả năng
  còn TĂNG theo số năm học thống kê. [IASE 2021](https://iase-web.org/documents/papers/sat2021/IASE2021%20Satellite%20175_SANEI.pdf),
  [CAUSE](https://www.causeweb.org/cause/node/7387)
- **Tần số tự nhiên** ("10 trong 1000 người") thay cho %: Hoffrage và cộng sự (2015) +37 điểm phần trăm trả lời đúng;
  meta-analysis McDowell & Jacobs 2017 ~4% → 24% (nguồn thứ cấp, chưa kiểm). [Frontiers 2015](https://www.frontiersin.org/articles/10.3389/fpsyg.2015.01473/text),
  [MedicalResearch](https://medicalresearch.com/?p=45292)
- Chiến lược thi chuẩn (LibreTexts, NSW): "ít nhất một" → 1 − P(không lần nào); cây khi xác suất đổi giữa các bước
  (bốc không hoàn lại), nhân dọc nhánh, các nhánh từ một điểm cộng = 1; liệt kê có hệ thống (lưới 6×6) trước khi đếm;
  lỗi hay gặp: cộng khi phải nhân. [LibreTexts](https://stats.libretexts.org/Courses/Citrus_College/Statistics_C1000%3A_Introduction_to_Statistics/04%3A_Probability_and_Combinatorics/4.05%3A_At_Least_One_Rule_and_Tree_Diagrams)

## 5. Đúc kết: "bản chất" + "cách giải" trong một câu

**Xác suất là phép chia hai số đếm — và gần như mọi lỗi là đếm SAI CÁI MẪU SỐ** (đếm đáp án thay vì khả năng ngang nhau:
11 tổng; "còn 2 cửa"; cộng 4 × 1/6 thay vì nhân). Bộ công cụ giải bài rút từ cả 7 video + hkt + nghiên cứu:

1. **Liệt kê khả năng NGANG NHAU** (lưới / cây) trước khi tính — hỏi: "các khả năng của tôi có ngang nhau không?"
2. **Đổi % thành người**: "trong 1000 người…" (Bayes không cần công thức).
3. **"Ít nhất một" → đếm cái ngược lại** rồi trừ khỏi 1.
4. **"Và" nhân dọc cây, "hoặc" cộng các nhánh không chồng nhau**; cộng khi phải nhân là lỗi số 1.
5. **Kiểm**: kết quả trong [0, 1]; tổng mọi nhánh = 1; ước lượng trước rồi so.

Số đã kiểm (code): hai xúc xắc tổng 7 = 6/36, tổng 2 = 1/36 · ít nhất một 6 khi tung 2 xúc xắc = 11/36 · 3 đồng xu ít
nhất một sấp = 7/8 · sinh nhật 23 người 50.7%, 50 người 97.0% · xét nghiệm 99% / bệnh 0.1% → 9.0%, lần 2 → 90.8% ·
Monty Hall đổi cửa 2/3 · hai con, ít nhất một trai → cả hai trai 1/3 · ba xúc xắc tổng 9 = 25/216, tổng 10 = 27/216.

**Móc lịch sử chưa ai dùng nhiều — Chevalier de Méré (Pháp, thế kỷ 17):** "cách tính" của ông: 4 lần tung × 1/6 = 2/3,
24 lần tung hai xúc xắc × 1/36 = 2/3 → hai cược "như nhau". Thật: **ít nhất một 6 trong 4 lần = 51.8% (thắng), ít nhất
một đôi 6 trong 24 lần = 49.1% (thua)**; cần 25 lần mới qua 50% (50.6%). Theo cách cộng của ông, 7 lần tung cho "7/6 >
100%" — vô lý ngay. Câu hỏi của ông (cùng bài "chia tiền khi ván bị dừng") được Pascal gửi Fermat năm 1654 — thường được
coi là điểm khởi đầu của lý thuyết xác suất. (Lịch sử: kiểm lại nguồn khi viết CONTENT.)

## 6. Gắn với fifty-percent và với các Short thắng

- Thứ tự học tự nhiên: **bài mới = xác suất là đếm (cổ điển + tần số, cách giải)** → fifty-percent = "nhưng 50% mô tả
  cái gì?" (tần số vs niềm tin). Cuối bài mới trỏ đích danh fifty-percent (PACKAGING §7) + playlist "Probability".
- Short thắng của kênh = sự thật lịch sử bất ngờ bằng lời đời thường (Florence 1299: 1.467 xem / 7 ngày); Short thua =
  tên khái niệm ("A Coin Flip Isn't Really 50/50" 23, "Two Fair Bets" 12). De Méré khớp khuôn thắng.
- Bão hoà: sinh nhật / Monty Hall / Bayes xét nghiệm đã có video 4–40M — dùng làm BÀI TẬP trong thân bài, không làm móc.
