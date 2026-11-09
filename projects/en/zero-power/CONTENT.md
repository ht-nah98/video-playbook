# zero-power — Pha 0: bóc tách nội dung

**Chủ đề:** Why Is Anything to the Power of Zero One? (tên tạm) · lời đọc tiếng Anh · nguồn: lời bình người dùng gửi
2026-10-08, nguyên văn ở `SCRIPT.vi.md` (1336 chữ tiếng Việt, ước 9 phút; thêm phần lấp → kịch bản tiếng Anh ~1900–2100
từ ≈ 10–11 phút). Viết lại bằng văn xuôi của kênh, giữ ý + mạch + 5 phần của người dùng, sửa lỗi, lấp chỗ trống.

**Ý trung tâm (đề xuất, chốt ở DNA):** "Nhân 0 lần không phải là không có gì — là **chưa làm gì**, và phép nhân chưa làm
gì thì đứng ở 1." Phép cộng bắt đầu từ 0, phép nhân bắt đầu từ 1. Vật xuyên suốt gợi ý: **một bộ đếm của phép nhân**
luôn khởi động ở 1 (mỗi lần nhân là một bước; lùi về 0 bước thì còn lại đúng con số khởi động). Ở 0⁰ hai "bộ đếm" (hàng
x⁰ và cột 0ʸ) giành nhau một ô.

## Mạch bài (giữ 5 phần của người dùng; thêm mở bài có mục lục, gói lại, lần sau)

| # | phần | ý | câu hứa |
|---|---|---|---|
| 0 | mở bài | 2³ = 8, 2¹ = 2, 2⁰ = 1? "nhân 0 lần" nghĩa là gì? Rồi 0⁰: máy móc cãi nhau — Python / JavaScript / Google ra 1, máy TI-84 báo ERR:DOMAIN, Excel báo #NUM!. **Mục lục 3 câu**. Câu treo → intro | — |
| 1 | dãy số | 16 → 8 → 4 → 2 → **1** (chia 2); 1000 → 100 → 10 → **1** (chia 10); mọi cơ số khác 0. Trực giác, chưa phải chứng minh | 1 |
| 2 | quy tắc buộc | aᵐ × aⁿ = aᵐ⁺ⁿ (2³ × 2² = 32 = 8 × 4) → aᵐ × a⁰ = aᵐ, aᵐ ≠ 0 nên chia được → a⁰ = 1 · cách chia aᵐ ÷ aᵐ · **lấp:** "nhân 0 lần" = tích rỗng = 1 (đếm cách: 0 ô trống → 1 cách) · nối bài 6: giữ luật cũ ⇒ luật ép ra kết quả | 1 + 2 |
| 3 | 0⁰ bắt đầu khó | dãy 0³, 0², 0¹ = 0 không chia được · **sửa:** quy tắc nhân không "hỏng" mà **im lặng** (0 × x = 0 đúng với mọi x) · **lấp:** bảng hai chiều: hàng x⁰ toàn 1, cột 0ʸ toàn 0 → hai quy luật giành một ô · quy tắc chỉ còn ép x × x = x → x = 0 hoặc 1 | 3 |
| 4 | đại số / đếm chọn 1 | đếm: số cách lấp 0 ô bằng 0 lựa chọn = 1 (không làm gì) → ở đây 0⁰ = 1 là ĐẾM ra, không chỉ quy ước · nhị thức (x + y)ⁿ với x = 0 · đa thức p(0) = hệ số tự do · chuỗi eˣ tại x = 0 · Knuth 1992 | 3 |
| 5 | giải tích: dạng vô định | xʸ tiến về (0, 0): giữ y = 0 → 1; giữ x = 0 → 0; đường khéo → 2, ½, số dương bất kỳ · xˣ → 1 · Cauchy 1821 xếp 0⁰ vào bảng dạng vô định; Libri 1833 + Möbius cãi nhau · "vô định" nói về GIỚI HẠN, không nói về giá trị | 3 |
| 6 | Putting it together | GIÁ TRỊ 0⁰ = 1 (đại số, đếm, máy tính) ≠ DẠNG 0⁰ của giới hạn (giải tích, phải tính) — không mâu thuẫn · bài kiểm tra: trả lời theo sách của khóa học | — |
| 7 | lần sau + lời chào | 0! = 1 cũng là "tích rỗng" (gieo, không hứa ngày) · hỏi bình luận: 0⁰ nên bằng 1, 0, hay không xác định? · "99% from scratch" | — |

**Mục lục (3 câu hứa):** 1. Why is anything to the power of zero equal to one? · 2. Is that a rule someone chose, or
is it forced? · 3. So what is zero to the zero — and why do machines disagree?

## Soát sự kiện — CẦN SỬA (sửa trong SCRIPT.md)

1. **"Câu trắc nghiệm về 0⁰ thì trả lời an toàn nhất là 1"** — SAI với chính người xem Việt Nam: SGK Toán 11 (Kết nối
   tri thức; Cùng khám phá) ghi "0⁰ và 0⁻ⁿ không có nghĩa"; nhiều sách giải tích Mỹ cũng ghi "undefined". Khuyên "chọn 1"
   có thể làm người xem mất điểm. Nói: *"trên bài kiểm tra, hãy trả lời theo định nghĩa của khóa học — nhiều sách giáo
   khoa ghi là không xác định; còn phần lớn toán học hiện đại và gần như mọi ngôn ngữ lập trình dùng 1."*
   Nguồn: loigiaihay.com (lý thuyết lũy thừa Toán 11 KNTT / Cùng khám phá).
2. **"Quy tắc nhân lũy thừa cũng gặp vấn đề tương tự (chia cho 0)"** — chưa chính xác. Dạng nhân aᵐ × a⁰ = aᵐ không
   chia gì cả; với a = 0 nó thành 0 × x = 0 — **đúng với MỌI x**, nên quy tắc không hỏng mà **không còn quyết định**.
   Chỉ dạng chia aᵐ ÷ aᵐ mới vướng chia cho 0. Thêm: lấy m = 0 thì quy tắc ép x × x = x → chỉ còn 0 hoặc 1 (lấp 3).
3. **"Số duy nhất mà nhân vào không thay đổi gì là 1"** — với MỘT số cụ thể aᵐ thì lý do là aᵐ ≠ 0 nên chia được hai vế
   (nếu aᵐ = 0 thì số nào cũng "không thay đổi gì" — chính là chuyện 0⁰ ở Phần 3). Nói rõ "because aᵐ isn't zero, we
   can divide it out", để Phần 3 có chỗ quay lại.
4. **"a⁰ buộc phải bằng 1, không có lựa chọn nào khác" (Phần 2) vs "quy ước thuận tiện" (Phần 5)** — hai câu nghe đá
   nhau. Thực ra: quy tắc aᵐ⁺ⁿ chỉ được CHỨNG MINH cho số mũ đếm được (1, 2, 3…); kéo nó sang số mũ 0 là một lựa chọn
   (giữ luật cũ — đúng "nguyên lý bảo toàn" Peacock / Hankel của bài 6), và một khi đã chọn giữ thì a⁰ = 1 bị ÉP. Với
   a ≠ 0 hầu như không ai chọn khác; với 0⁰ thì luật không ép được → mới thành "quy ước". Nói đúng như vậy.
5. **"Excel… đây là quyết định thận trọng của người thiết kế, họ muốn nhắc người dùng…"** — đoán ý định, không có nguồn.
   Nói: "you can read that error as a warning label" (đọc lỗi đó như một lời cảnh báo), không gán động cơ.
6. **"Một số máy ra 1, một số máy báo lỗi"** — cụ thể hóa bằng thứ đã kiểm: Python `0**0` = 1, JavaScript
   `Math.pow(0,0)` = 1, C `pow(0,0)` = 1 (đã chạy ở máy này); TI-84 báo `ERR:DOMAIN` (TI knowledge base; TI-89 lại ra 1);
   Excel `=0^0` → `#NUM!` (Excel 2010/2013+, nhiều nguồn); Google calculator → 1; LibreOffice Calc → 1.
7. **"Lý thuyết tập hợp: quy ước phổ biến là 0⁰ = 1"** — ở đó không chỉ là quy ước: số hàm từ tập rỗng vào tập rỗng
   bằng 1 (hàm rỗng), nên 0⁰ = 1 là KẾT QUẢ ĐẾM. Nói "in counting, it isn't even a choice" (lấp 2).
8. **Nhị thức "ở số hạng đầu tiên xuất hiện 0⁰"** — đúng nếu viết theo lũy thừa tăng của x: (x + y)ⁿ = Σ C(n,k) xᵏ yⁿ⁻ᵏ,
   số hạng k = 0 là C(n,0) x⁰ yⁿ. Trên hình viết đúng thứ tự đó. Kiểm: n = 3, y = 5, x = 0 → 125 = 5³ ✓.
9. **"0⁰/0!" trong chuỗi eˣ** — đúng, nhưng 0! = 1 lại là một chuyện cần giải thích → để làm "lần sau" (lấp 8), trong
   bài chỉ nói "zero factorial, which is also one".

## Đúng — giữ nguyên (đã kiểm bằng code ở máy này)

- 2⁴ … 2⁰ = 16, 8, 4, 2, 1; 10³ … 10⁰ = 1000, 100, 10, 1; 2³ × 2² = 32 = 2⁵ = 8 × 4.
- 0³ = 0² = 0¹ = 0 và 0ʸ = 0 với mọi y > 0; x⁰ = 1 với mọi x > 0.
- Giữ y = 0, x → 0⁺: giới hạn 1. Giữ x = 0, y → 0⁺: giới hạn 0. Hàm xʸ không liên tục được tại (0, 0) dù gán giá trị nào.
- Đường y = ln c / ln x cho xʸ = c tại MỌI điểm (c = 2, c = 0.5: in ra 2.0 và 0.5 ở x = 0.1, 0.001, 10⁻⁹) → giới hạn
  ra bất kỳ số dương c nào ✓.
- "Dạng vô định không có nghĩa biểu thức không có giá trị" ✓ — giữ nguyên, đây là câu hay nhất bài.

## Lấp thông tin (đề xuất)

1. **Tích rỗng ("nhân 0 lần"):** cộng bắt đầu từ 0, nhân bắt đầu từ 1. 2³ = 1 × 2 × 2 × 2; bỏ từng số 2 → còn số khởi
   động 1. Trả lời thẳng câu hỏi của mở bài "không lần thì có nghĩa gì".
2. **Đếm:** 2³ = số cách điền 3 ô, mỗi ô chọn 1 trong 2 (8 cách, vẽ 8 dãy). 0 ô → đúng 1 cách: không điền gì. Áp cho cả
   cơ số 0: 0 ô, 0 lựa chọn → vẫn 1 cách. → trong toán đếm 0⁰ = 1 là đếm ra.
3. **Quy tắc ép 0⁰ còn hai ứng viên:** a⁰ × a⁰ = a⁰⁺⁰ = a⁰ → x × x = x → x = 0 hoặc x = 1. Một khoảnh khắc đẹp: luật không
   chọn hộ, nhưng loại hết mọi số khác.
4. **Bảng hai chiều xʸ** (hàng y = 0 toàn 1, cột x = 0 toàn 0, ô (0, 0) bị hai bên giành) — hình mở cho Phần 3, và chính
   là hai "đường" của Phần 5.
5. **Đa thức:** p(x) = 3 + 2x + x², viết gọn Σ aₖxᵏ; p(0) phải ra 3 → cần 0⁰ = 1.
6. **xˣ → 1 khi x → 0⁺** (0.5 → 0.707, 0.1 → 0.794, 0.01 → 0.955, 0.001 → 0.993; đáy 0.692 tại x = 1/e ≈ 0.368) — một
   giới hạn dạng 0⁰ ra 1; đường y = ln 2 / ln x ra 2 → "phải tính từng trường hợp" thấy bằng mắt.
7. **Lịch sử tranh cãi:** Augustin-Louis Cauchy, *Cours d'analyse* (1821) xếp 0⁰ vào bảng các dạng vô định · Guglielmo
   Libri (1833) cho rằng 0⁰ = 1, August Ferdinand Möbius đưa "chứng minh" ủng hộ (sai) → cãi nhau trên tạp chí ·
   Donald Knuth, *Two Notes on Notation* (American Mathematical Monthly, 1992): 0⁰ phải bằng 1, vì định lý nhị thức quá
   quan trọng để bị giới hạn tùy tiện. Nguồn: arXiv math/9205211.
8. **Lần sau:** 0! = 1 — cũng là tích rỗng (gieo).

## Tiếng hiệu ứng (docs/lesson/SFX.md)
| khoảnh khắc | loại có sẵn / cần thêm | đã tải (nguồn CC0) hoặc hỏi người dùng |
|---|---|---|
| gõ phím máy tính / code ra kết quả | `type`, `beep` có sẵn | — |
| máy báo ERR / #NUM! | `error` có sẵn | — |
| mỗi bậc chia đôi trong dãy | `tick` / `pop` có sẵn | — |
| hai quy luật giành ô (0, 0) | `snap` / `impact` có sẵn | — |
| chốt "= 1" | `correct` / `shimmer` có sẵn | — |
> Chưa thấy khoảnh khắc ngoài 17 loại có sẵn; chọn DNA xong soát lại theo chất liệu.

## Ảnh (có trên Wikipedia/Commons → tôi tự tải và soi, sau khi duyệt CONTENT)
> Dùng lại (tôi tự chép): `Portrait_of_Sir_Isaac_Newton,_1689.jpg` (math-30k — nhị thức Newton; chân dung của Godfrey Kneller, 1689), `euler.jpg` (bài 6 —
> chuỗi eˣ, nếu cần).

| file | nội dung | loại | ghi chú |
|---|---|---|---|
| `cauchy.jpg` | **Augustin-Louis Cauchy**, nhà toán học Pháp, 1789–1857 — chân dung | thật | Commons |
| `cours-danalyse-1821.jpg` | trang bìa ***Cours d'analyse de l'École royale polytechnique*** (Cauchy, 1821) | hiện vật | Commons, không bắt buộc |
| `libri.jpg` | **Guglielmo Libri** (Guglielmo Libri Carucci dalla Sommaja), nhà toán học Ý, 1803–1869 — chân dung | thật | Commons; thiếu thì bỏ |
| `mobius.jpg` | **August Ferdinand Möbius**, nhà toán học Đức, 1790–1868 — chân dung | thật | Commons |
| `knuth.jpg` | **Donald Ervin Knuth**, nhà khoa học máy tính Mỹ, sinh 1938 — ảnh chụp (giấy phép CC) | thật | Commons |

Không cần ảnh: máy tính cầm tay, bảng tính, dòng code — **tự vẽ bằng code**, KHÔNG logo hay giao diện thật của
Excel / Google / TI (chỉ chữ kết quả: `1`, `ERR:DOMAIN`, `#NUM!`).

## Tư thế mascot
Có sẵn hợp bài: `ponder` / `shrug` (nhân 0 lần là gì?), `twoways` (hai quy luật giành ô 0⁰ — hợp nhất bài), `startled`
(máy cãi nhau), `point`, `ok` (chốt a⁰ = 1), `crossed`, `wave` (lần sau).
**Đề xuất 1 tư thế mới (không bắt buộc):** `pose-calculator` — cầm máy tính cầm tay, nhíu mày nhìn màn hình (mở bài:
máy báo lỗi). Thiếu thì dùng `startled`.

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
- dãy 2⁴…2⁰, 10³…10⁰; 2³ × 2² = 32; nhị thức n = 3, y = 5 → 125; p(0) = 3; xˣ ở 0.5 / 0.1 / 0.01 / 0.001; đáy 0.692
  tại 0.368; đường y = ln c / ln x cho c.
- năm: 1821 (Cauchy), 1833 (Libri), 1992 (Knuth); kết quả máy: Python / JS / C = 1, TI-84 ERR:DOMAIN, Excel #NUM!,
  Google 1.

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
