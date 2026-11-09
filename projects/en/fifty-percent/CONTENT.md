# fifty-percent — Pha 0: bóc tách nội dung

**Chủ đề:** What Does 50% Actually Mean? (tên tạm) · lời đọc tiếng Anh · nguồn: bài người dùng gửi 2026-10-06,
nguyên văn ở `SCRIPT.vi.md`. Độ dài ước ~14 phút (2619 từ tiếng Việt; pemdas 1877 từ → 10:08), chưa tính phần lấp.

**Hình ảnh xuyên suốt:** đồng xu úp dưới bàn tay. Nó mở bài, quay lại ở Phần 2 (lén nhìn), và khép bài ở Phần 7
("khoảng cách giữa bạn và đồng xu").

## Mạch bài
| # | phần | ý | "vì sao quan trọng" |
|---|---|---|---|
| 0 | mở bài | đồng xu đã rơi, úp dưới tay: "50%" không mô tả đồng xu, chỉ mô tả người chưa biết | câu treo cho intro: "con số này thực sự nghĩa là gì?" |
| 1 | tần suất | tung nhiều lần, tỉ lệ ngửa tiến về 1/2 (luật số lớn); sòng bạc, bảo hiểm, kiểm tra chất lượng | đúng khi sự việc LẶP LẠI được, kiểm bằng dữ liệu |
| 2 | tần suất hụt hơi | mưa ngày mai 70%, thuốc pha 3, bầu cử: không lặp lại; lối thoát "hiệu chỉnh" (calibration) của dự báo thời tiết; đồng xu đã rơi thì không có tập hợp nào để gom vào; lén nhìn: 100%/0% với mình, 50% với bạn | đồng xu không đổi, chỉ THÔNG TIN đổi |
| 3 | niềm tin | xác suất = mức tin dựa trên thông tin; Ramsey, de Finetti: niềm tin nhất quán buộc theo luật xác suất (lập luận cá cược, "Dutch book": A 70% + B 50% → thua chắc) | xử lý được sự việc chỉ xảy ra một lần (sự sống trên sao Hoả) |
| 4 | Bayes = cán cân | tin nhắn "ngân hàng": câu chào (tỉ lệ ≈ 1, cán cân đứng yên) vs đòi OTP (tỉ lệ lớn, cán cân lệch hẳn); cán cân chỉ dịch, không đặt lại | bằng chứng mạnh khi nó KHÓ xảy ra nếu giả thuyết sai |
| 5 | tỉ lệ nền | bệnh 1/1000, xét nghiệm nhạy 99%, báo nhầm 5% → dương tính chỉ ≈ 2%; đếm 100 000 người | quên tỉ lệ nền là lỗi của cả người có chuyên môn |
| 6 | toán không chọn phe | Kolmogorov 1933: 3 tiên đề; xác suất là độ đo (như diện tích), không nói ý nghĩa | hai phe cãi về nghĩa nhưng dùng chung toán |
| 7 | ngẫu nhiên hay thiếu thông tin | đồng xu theo cơ học Newton; máy tung của Diaconis cùng một mặt mọi lần; tung tay thiên về mặt ban đầu ~51% | xác suất là cách ghi có kỷ luật điều mình chưa biết; 50% là khoảng cách giữa bạn và đồng xu |

## Soát sự kiện — CẦN SỬA (sẽ sửa trong SCRIPT.md)

1. **Ramsey và de Finetti "đầu thế kỷ 20"** → chính xác hơn: **những năm 1920–1930**. Ramsey viết "Truth and
   Probability" năm 1926 (in năm 1931, sau khi ông mất năm 1930, lúc 26 tuổi); de Finetti độc lập, các bài 1931 và
   1937.
2. **Lập luận cá cược.** Bản gốc: bộ kèo "khiến bạn nghĩ mình luôn có lợi". Đúng ra: theo chính niềm tin của bạn, mỗi
   kèo đều **công bằng**, nên bạn chịu mua cả hai. Số cụ thể (đưa lên hình bằng phỉnh): vé "A thắng thì được 1 đồng"
   bạn trả 0,70; vé "B thắng thì được 1 đồng" bạn trả 0,50. Tổng trả 1,20; trận nào cũng chỉ một đội thắng nên luôn
   nhận về đúng 1 → **mất 0,20 dù kết quả ra sao** (đã tính bằng python).
3. **Phần 7 khái quát quá tay.** "Ngẫu nhiên là tên gọi khác của thiếu thông tin" đúng cho đồng xu, thời tiết, thị
   trường. Nhưng tiêu đề phần hỏi "**thế giới** vốn ngẫu nhiên?". Ở cấp lượng tử, các thí nghiệm Bell (Nobel Vật lý
   2022: Aspect, Clauser, Zeilinger) loại bỏ mọi lời giải thích bằng "thông tin ẩn" cục bộ. Ngẫu nhiên ở đó có phải
   là thật hay không vẫn còn tranh luận giữa các cách diễn giải. **Đề xuất:** thêm 1–2 câu thừa nhận chỗ này. Nếu
   không, người xem biết vật lý sẽ bắt lỗi trong phần bình luận. Cần người dùng duyệt.
4. **"Xác suất vượt pha 3 là 30%"**: chỉ là ví dụ về MỘT loại thuốc nên không sai. Lưu ý: tỉ lệ trung bình toàn
   ngành ở pha 3 vào khoảng 50–60%. Giữ nguyên, không nói "trung bình".

## Đúng — giữ nguyên (đã kiểm)

- **Xét nghiệm**, chạy bằng python: 100 000 người → 100 mắc bệnh → 99 dương tính thật; 99 900 khỏe → 4 995 dương
  tính nhầm; tổng 5 094; 99 / 5 094 = 1,94 % ≈ 2 %.
- **Câu chuyện có thật:** Casscells, Schoenberger, Graboys, *NEJM* 1978. Họ hỏi 60 người ở các bệnh viện giảng dạy
  của Harvard (20 bác sĩ, 20 bác sĩ nội trú, 20 sinh viên y), với bệnh 1/1000 và báo nhầm 5%. **27/60 trả lời 95%**;
  đáp án đúng là ≈ 2%. Bài gốc không nêu độ nhạy (coi là 100% → 1,96%); bản của mình dùng 99% → 1,94%. Cả hai đều
  ≈ 2%.
- **Kolmogorov**, *Grundbegriffe der Wahrscheinlichkeitsrechnung*, 1933: không âm; P(chắc chắn) = 1; cộng tính cho
  biến cố xung khắc. Bản chuẩn là cộng tính đếm được, nhưng lời đọc không cần nói.
- **Luật số lớn:** độ lệch chuẩn của tỉ lệ với 10 lần tung là ±16%, với 100 lần ±5%, với 1 triệu lần ±0,05%. "Tung 10
  được 7" là bình thường.
- **Diaconis:** từng là ảo thuật gia (bỏ nhà năm 14 tuổi đi theo ảo thuật gia Dai Vernon), giáo sư Stanford. Diaconis,
  Holmes và Montgomery, "Dynamical Bias in the Coin Toss", *SIAM Review*, 2007: máy tung cơ khí cho cùng một mặt mọi
  lần; tung tay rồi bắt có xác suất ≈ 51% ra **mặt ban đầu**.
- **Dự báo "hiệu chỉnh tốt" (calibration):** đúng là cách chấm điểm dự báo thời tiết.

## Lấp thông tin (người dùng duyệt TẤT CẢ 2026-10-06, kể cả câu lượng tử — đã vào SCRIPT.md v1)

1. **Số liệu thật cho Phần 1** (thay ví dụ giả định, hoặc thêm vào cạnh): tỉ lệ đã tính bằng python.

   | người tung | số lần | số lần ngửa | tỉ lệ ngửa |
   |---|---|---|---|
   | Buffon (thế kỷ 18) | 4 040 | 2 048 | 50,69% |
   | Karl Pearson | 24 000 | 12 012 | 50,05% |
   | John Kerrich, tù binh ở Đan Mạch trong Thế chiến II | 10 000 | 5 067 | 50,67% |

   Jacob Bernoulli chứng minh luật số lớn trong *Ars Conjectandi* (1713).
2. **Xác nhận năm 2023 cho Phần 7:** Bartoš và cộng sự cho 48 người tung **350 757 lần** bằng 46 loại tiền. Đồng xu
   rơi đúng mặt ban đầu **50,8%** lần, khớp mô hình của Diaconis.
3. **Móc ngược về mở bài (Phần 7):** nếu bạn thấy mặt nào ngửa lúc mình búng, con số với bạn là 51% chứ không phải
   50%. Thông tin lại đổi xác suất, đồng xu vẫn y nguyên. Ý này nối Phần 7 với Phần 2.
4. **Phần 5, vì sao "đếm người" dễ hơn:** cách đếm này có tên là "tần số tự nhiên" (Gigerenzer và Hoffrage, 1995).
   Viết bài toán bằng số người thay vì phần trăm thì tỉ lệ người trả lời đúng tăng rõ. Điều này cũng nối hai cách hiểu:
   đếm (tần suất) giúp tính niềm tin (Bayes).
5. **Kết video:** bản gốc chỉ có "cảm ơn… hẹn gặp lại". Kênh luôn kết bằng tên **"99% from scratch" + SUBSCRIBE**,
   đứng yên ≥ 4 s (mẫu `projects/en/pemdas/plates/f2-answer.js`).
6. **Intro** đặt sau câu treo "Bắt đầu thôi" của mở bài. Trước đó màn tối dần về đen: bàn tay úp lại che hết khung.

## Tiếng hiệu ứng (docs/lesson/SFX.md)
| khoảnh khắc | loại có sẵn / cần thêm | đã tải (nguồn CC0) hoặc hỏi người dùng |
|---|---|---|
| búng đồng xu, đồng xu rơi / đập vào tay | **`coin`** (mới) | OpenGameArt "Coin sounds" Coin5, Coin0 + "Coin Drop" — CC0 |
| đặt cược, phỉnh lên bàn (Phần 3, Dutch book; sòng bạc Phần 1) | **`chip`** (mới) | Kenney "Casino Audio" chip-lay-1–3 — CC0 |
| bộ đếm tung tăng dần (10 → 100 → 1 triệu) | `tick` (gap tự thưa) | có sẵn |
| tin nhắn hiện lên điện thoại | `pop` / `beep` | có sẵn |
| đòi OTP: cờ đỏ | `error` | có sẵn |
| cán cân nghiêng / dịch | `snap` | có sẵn |
| 100 000 người, đám chấm dương tính sáng lên | `shimmer` (một lần) | có sẵn |
| "2%" lộ ra | `impact` (≤ 2 cả video) | có sẵn |
| ba tiên đề lần lượt hiện | `pen` hoặc `pop` | có sẵn (tuỳ DNA) |
| "= ?", câu hỏi treo | `question` | có sẵn |
File nghe thử: `out/_sfx/audition-fifty-percent.wav` (+ `.txt`), so với pop/error cũ. Chờ người dùng nghe.

## Ảnh cần người dùng tải (mọi ảnh từ web — tôi không tự tìm) → `projects/en/fifty-percent/assets/history/` + `SOURCES.txt`
| file | nội dung | loại | dùng ở | gợi ý tìm |
|---|---|---|---|---|
| `kolmogorov.jpg` | chân dung Andrey Kolmogorov | thật | Phần 6 | Wikimedia Commons "Andrey Kolmogorov" (kiểm giấy phép) |
| `grundbegriffe-1933.jpg` | bìa hoặc trang tên *Grundbegriffe der Wahrscheinlichkeitsrechnung* (1933) | hiện vật | Phần 6 "năm 1933" | tìm ảnh bìa bản Springer 1933 |
| `ramsey.jpg` | chân dung Frank P. Ramsey | thật | Phần 3 | Wikimedia Commons "Frank Ramsey" (ít ảnh; thiếu thì dùng chữ) |
| `definetti.jpg` | chân dung Bruno de Finetti | thật | Phần 3 | Wikimedia Commons / Wikipedia "Bruno de Finetti" |
| `diaconis.jpg` (tuỳ) | ảnh Persi Diaconis | thật (người còn sống, cần giấy phép tự do) | Phần 7 | Wikimedia Commons "Persi Diaconis" |
| `ars-conjectandi-1713.jpg` (tuỳ, nếu lấy mục lấp 1) | trang tên *Ars Conjectandi* của Jacob Bernoulli | hiện vật, công khai | Phần 1 luật số lớn | Wikimedia Commons "Ars Conjectandi" |

- Không dùng "chân dung Thomas Bayes": bức quen thuộc nhiều khả năng **không phải ông**. Bayes chỉ hiện bằng công thức.
- Tự vẽ bằng code: đồng xu, điện thoại và tin nhắn (không logo ngân hàng thật), cán cân, 100 000 chấm người, biểu đồ
  tỉ lệ hội tụ, máy tung đồng xu (dạng sơ đồ), sòng bạc (phỉnh), mây mưa, lá phiếu, sao Hoả.

## Mascot — tư thế
Có sẵn, hợp: `three` (3 tiên đề), `ponder` (Phần 7 "câu hỏi sâu hơn"), `shrug` ("ai muốn tin bao nhiêu cũng được?"),
`halt` (đòi OTP — dừng lại!), `pointer` (giải thích), `peace-back` (chào cuối).
**Cần người dùng tạo** (cùng nhân vật, cùng khung **giữa đùi**, nền trơn để tách):
| tên | mô tả | khoảnh khắc |
|---|---|---|
| `coin-cover` (**quan trọng nhất**) | bàn tay úp lên mu bàn tay kia (đồng xu giấu bên dưới), nhìn người xem, nụ cười bí ẩn | mở bài; quay lại ở Phần 2 và kết bài |
| `coin-flip` | ngón cái búng đồng xu bay lên, mắt dõi theo | câu đầu tiên; Phần 7 (máy tung) |
| `peek` | hé bàn tay che, lén nhìn đồng xu, liếc mắt tinh nghịch | Phần 2 "nếu mình lén nhìn…" |
| `phone` (tuỳ) | cầm điện thoại, nhíu mày nghi ngờ | Phần 4 tin nhắn lừa đảo |

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
- 99 / 5094 ≈ 2%; 4 995 = 5% × 99 900; Dutch book 0,70 + 0,50 − 1 = 0,20; tỉ lệ Buffon, Pearson, Kerrich.
- Biểu đồ tỉ lệ hội tụ: mô phỏng tung bằng `hash(i)` tất định, không `Math.random`.
- Cán cân Bayes: tỉ lệ trước (odds) × tỉ lệ khả năng = tỉ lệ sau. Số minh hoạ chọn ở bước kịch bản, tính bằng code.
- Font: kiểm ≈ × ÷ − ∪ ∩ Ω ≥ ∑ bằng fontTools trước khi dựng (LESSON-VIDEO bẫy 1).

## Ví dụ minh hoạ do hình thêm (lời không đọc số — tính bằng code trong cảnh, `must()`)
- **Cán cân Bayes (tin nhắn):** tỉ lệ trước lừa đảo : thật = 1 : 99. Câu chào: P(chào | lừa) = 0,90, P(chào | thật) = 0,85
  → tỉ lệ khả năng ≈ 1,06 → sau ≈ 1,06 : 99 (≈ 1,1%), cán cân gần như đứng. OTP: P(OTP | lừa) = 0,80, P(OTP | thật) =
  0,001 → ×800 → ≈ 8,6 : 1 (≈ 90%) — cán cân lệch hẳn. Góc nghiêng cán cân = hàm của log tỉ lệ (tính trong code).
- **Cán cân "chỉ dịch, không đặt lại":** giả thuyết rất khó xảy ra 1 : 1 000 000 × 800 = 1 : 1 250 (≈ 0,08%) — vẫn xa giữa.
- **Năm sinh–mất trên thẻ tên:** Frank Ramsey 1903–1930, Bruno de Finetti 1906–1985, Andrey Kolmogorov 1903–1987.
- **Độ đo:** vùng sáng chiếm 3/10 mặt sân (30 / 100 ô).
- **Harvard 1978:** 60 người, 27 trả lời 95% (CONTENT "Đúng").
- **Hiệu chỉnh:** dải 10 ngày "70%", 7 ngày mưa.

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
