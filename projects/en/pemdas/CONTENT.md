# pemdas — Pha 0: bóc tách nội dung

**Chủ đề:** Is PEMDAS a Law of Math, or Just a Convention? (tên tạm) · lời đọc tiếng Anh · nguồn: bài người dùng gửi
2026-10-06, nguyên văn ở `SCRIPT.vi.md`. Đây chính là nội dung video mẫu của anh người dùng ("PEMDAS Là Gì?"). Bản
kênh mình làm bằng tiếng Anh, hình và DNA riêng. Độ dài ước ~9:45 (1825 từ; zero-div 2095 từ → 11:06).

## Mạch bài
| # | phần | ý | "vì sao quan trọng" |
|---|---|---|---|
| 0 | mở bài | 6 ÷ 2(1 + 2): nửa nói 9, nửa nói 1, cả hai "theo PEMDAS"; câu hỏi chân lý hay luật chơi | lập trường: quy ước nhưng không tuỳ tiện; bằng chứng chính là bài cãi nhau |
| 1 | PEMDAS nói gì | P E M D A S; BODMAS (Anh), BEDMAS (Canada); M/D và A/S cùng cấp, trái → phải; 10 − 3 + 2 = 9 (sai: 5); 8 ÷ 4 × 2 = 4 (sai: 1) | phần lớn tranh cãi do nhớ sai cấp |
| 2 | phần là lựa chọn | trái → phải là lựa chọn (APL đọc phải → trái; tháp luỹ thừa 2^3^2 = 512 đọc từ trên xuống); ngoặc thắng tất cả → PEMDAS là luật "khi lười ngoặc"; nhiều tên = thoả thuận, như lái xe bên trái/phải; lịch sử | quy tắc về cách VIẾT và ĐỌC, không phải tính chất của số |
| 3 | không tuỳ tiện | đa thức 3x² + 2x + 1 không cần ngoặc vs (3x²) + (2x) + 1; phân phối a(b + c) = ab + ac; cái thang: × = + lặp (3 × 4 = 4 + 4 + 4), luỹ thừa = × lặp (4³ = 4·4·4) | tối ưu cho thứ người ta viết nhiều nhất, "tự nhiên" vì tiện |
| 4 | quy ước hụt hơi | 6 ÷ 2 × 3 = 9 (trái → phải) vs nhân ẩn ưu tiên → 6 ÷ 6 = 1; máy tính TI đời cũ/mới khác nhau; gạch phân số hết cãi; ÷ bị khuyên bỏ | nếu là chân lý thì không thể có hai đáp án đúng luật |
| 5 | kết | −2²: toán −4, Excel 4, Python −4, JavaScript từ chối, đòi ngoặc | PEMDAS là đường tắt, ngoặc mới là công cụ thật |

## Soát sự kiện — CẦN SỬA (đã sửa trong SCRIPT.md)

1. **Mốc thời gian (bản gốc tự nói "không chắc lắm").** Đã viết lại theo tài liệu.
   - Nhân trước cộng có từ khi ký hiệu đại số hình thành ở thế kỷ 17 (Viète, Descartes).
   - Quy tắc đầy đủ được viết thành luật trong sách giáo khoa khoảng cuối thế kỷ 19 đến đầu thế kỷ 20.
   - Năm 1917, *American Mathematical Monthly* (N. J. Lennes) tranh luận × trước ÷ hay trái → phải. Đây là bằng chứng
     rằng "phe 1" có từ hơn 100 năm trước.
   - Tên PEMDAS và câu nhớ "Please Excuse My Dear Aunt Sally" ra đời muộn hơn. Không có năm chắc chắn nên lời đọc
     không nêu năm.
2. **Texas Instruments.** Bản gốc chỉ nói "khác nhau giữa các đời". Hướng đúng:
   - Đời cũ (TI-81, TI-82, TI-85) ưu tiên nhân ẩn, nên ra 1.
   - Họ TI-83/84 coi nhân ẩn như × thường, nên ra 9.
   - Nguồn: diễn đàn hpmuseum.org và cemetech. Chưa thử trên máy thật, nên hình chỉ ghi "đời cũ / đời sau", không
     ghi số máy.

## Đúng — giữ nguyên (đã kiểm)

- PEMDAS (Mỹ), BODMAS (Anh; còn BIDMAS), BEDMAS (Canada). Lái xe (dùng ở DNA cảnh biên giới): Anh bên TRÁI, Mỹ và Canada bên PHẢI.
- Phép tính, chạy bằng python:
  - 10 − 3 + 2 = 9, sai 5;
  - 8 ÷ 4 × 2 = 4, sai 1;
  - 6 ÷ 2 × 3 = 9; 6 ÷ (2 × 3) = 1.
- Excel `=-2^2` → 4: bảng ưu tiên của Microsoft xếp phủ định (−) trên luỹ thừa (^)
  ("Calculation operators and precedence in Excel", support.microsoft.com).
- Toán thường: −2² = −4. Nhân ẩn được ưu tiên trong nhiều tài liệu vật lý và kỹ thuật (Wikipedia "Order of
  operations", mục mixed division and multiplication).
- Gạch phân số loại bỏ mơ hồ.
- ISO 80000-2 khuyên không dùng ÷. Dấu ÷ (obelus) có từ Johann Rahn năm 1659; chi tiết này không đưa vào lời đọc.

## Ví dụ minh hoạ do hình thêm (lời không đọc số — chỉ để hình có phép tính thật)
- "Want to add before you multiply?": 2 × (3 + 4) = 14, so với không ngoặc 2 × 3 + 4 = 10.
- Phân phối: 2 × (3 + 4) = 2 × 3 + 2 × 4 = 14.
- APL (đọc phải → trái, không cấp): 2 × 3 + 4 → 2 × (3 + 4) = 14.
- Bảng "ít ngoặc nhất" (d3): cùng 3x² + 2x + 1 dưới các luật tưởng tượng (+ trước ×, trái → phải, phải → trái) cần 2 cặp ngoặc; PEMDAS cần 0 — tính bằng cây biểu thức trong cảnh, ném lỗi nếu sai.
- (2 × 3) + (8 ÷ 4) = 8 (c2, mọi phép đều có ngoặc).

## Lấp thông tin (đã thêm)

- **APL** (Kenneth Iverson, thập niên 1960): mọi hàm cùng cấp, đọc từ phải sang trái. Đây là ví dụ thật cho ý "có thể
  quy ước đọc ngược lại" của bản gốc.
- **Tháp luỹ thừa:** 2^3^2 = 2^9 = 512, không phải 8² = 64. Ngay trong toán thường, luỹ thừa đã đọc từ trên xuống.
  Đã chạy: python `2**3**2` → 512, node → 512.
- **Lennes 1917:** xem mục sửa số 1.
- **−2² trong máy, chạy thật:**
  - python `-2**2` → −4;
  - node `-2**2` → SyntaxError "Unary operator used immediately before exponentiation expression. Parenthesis must be
    used to disambiguate operator precedence". JavaScript từ chối và đòi ngoặc, đúng bài học kết;
  - `bc`: `-2^2` → 4. Không đưa vào lời đọc vì đã đủ ví dụ.

## Tiếng hiệu ứng (docs/lesson/SFX.md)
| khoảnh khắc | loại có sẵn / cần thêm | đã tải (nguồn CC0) hoặc hỏi người dùng |
|---|---|---|
| bình luận cãi nhau bật lên dồn dập | `pop` (giới hạn gap tự thưa) | có sẵn |
| "= ?" của bài viral, biểu thức mơ hồ | **`question`** (mới) | Kenney Interface Sounds question_002, 004 — CC0 |
| đáp án đúng ✓ (9 ở 10 − 3 + 2, 4 ở 8 ÷ 4 × 2) | **`correct`** (mới) | Kenney Interface Sounds confirmation_001, 004 — CC0 |
| đáp án sai, gạch đỏ (5, 1) | `error` | có sẵn |
| máy tính TI, ô Excel, terminal hiện kết quả | **`beep`** (mới) | tự tạo `synth.py` (sine 2.4 / 2.0 kHz) |
| gõ biểu thức vào Excel / Python / JS | `type` | có sẵn |
| ngoặc đóng lại ôm phần cộng, 2 × 3 gộp thành 6 | `snap` | có sẵn |
| bậc thang leo lên (+ → × → ^) | `tick` từng bậc | có sẵn |
| chữ PEMDAS bung thành 6 từ; BODMAS/BEDMAS đổi chữ | `whoosh` + `type` | có sẵn |
| "Brackets are the real tool" | `impact` | có sẵn |
File nghe thử: `out/_sfx/audition-pemdas.wav` (+ `.txt`), mức db 0, kèm pop/error/tick để so. Chờ người dùng nghe.

## Ảnh cần người dùng tải (mọi ảnh từ web — tôi không tự tìm)
| file | nội dung | loại | dùng ở | gợi ý tìm |
|---|---|---|---|---|
| `descartes-geometrie.jpg` | một trang *La Géométrie* (Descartes, 1637) có phương trình viết bằng ký hiệu | hiện vật | Phần 2 "sixteen hundreds… writing equations in symbols" | Wikimedia Commons "La Géométrie 1637 page" (công khai) |
| `lennes-1917.jpg` | trang đầu bài "Discussions: Relating to the Order of Operations in Algebra", N. J. Lennes, *American Mathematical Monthly* 24(2), 1917 | hiện vật | Phần 2 "In nineteen seventeen… debating" | JSTOR (xem trước trang đầu, chụp màn hình); trước 1929 → công khai ở Mỹ |
| `apl-keyboard.jpg` | bàn phím / máy có ký hiệu APL (ảnh chụp thật) | hiện vật | Phần 2 "APL… right to left" | Wikimedia Commons "APL keyboard" (kiểm giấy phép, ghi SOURCES) |
| `iverson.jpg` (tuỳ) | chân dung Kenneth Iverson, người tạo APL | thật | cùng chỗ, nếu có ảnh giấy phép tự do | Wikimedia Commons "Kenneth E. Iverson" |
Không cần ảnh: bình luận mạng xã hội, Excel, máy tính bỏ túi, terminal, biển lái xe → tự vẽ bằng code (không dùng
giao diện/logo thật của TI, Excel, mạng xã hội — chỉ dạng chung).

## Hình cần đúng (tính trong code, ném lỗi nếu sai)

- Mọi phép tính trên hình phải được tính bằng code từ biểu thức, không gõ tay kết quả:
  - 10 − 3 + 2, 8 ÷ 4 × 2 và hai cách sai;
  - 6 ÷ 2(1 + 2) theo hai cách;
  - 2^3^2 = 512 so với 64;
  - 3 × 4 = 4 + 4 + 4; 4³ = 64.
- Terminal: chép đúng kết quả python/node ở trên, kể cả câu lỗi của node.
- Excel: ô `=-2^2` → `4`.
- Máy tính bỏ túi: không vẽ logo hay mẫu máy thật của TI, chỉ dùng máy tính chung chung, ghi "older model" /
  "later model".
- Đa thức 3x² + 2x + 1 và (3x²) + (2x) + 1. Kiểm bằng fontTools: font có ² (U+00B2), ³ (U+00B3), ÷ (U+00F7),
  × (U+00D7), − (U+2212) chưa (LESSON-VIDEO bẫy 1).

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
