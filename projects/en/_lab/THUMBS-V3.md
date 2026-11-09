> **Đã thay (2026-10-29, LESSONS §217):** "3 phong cách dùng chung" bị người dùng chê là lối mòn — thumbnail mới sinh từ thế giới của từng video + mascot dáng động (mẫu `projects/en/logarithm/thumbnail/thumbs-v4.html`). File này giữ làm lịch sử cho bản v3 đang A/B.

# Thumbnail v3 — vẽ nét, không ảnh AI (2026-10-29)

Người dùng: thumbnail ảnh AI của kênh "không đạt hiệu quả", audience sợ nội dung AI → mascot vẽ nét đầu tròn (`../_kit/mascot.js`,
chuyển thể cậu bé blouse trắng) + biểu cảm. Nháp 1 bị chê: mascot "hơi to", nền một màu + tia "đơn điệu".
Luật v3 (LESSONS §216): đo MẶT ở 168 px — đường kính mặt ≈ 40% cao khung (`bust(x, hy, r ≈ 210)`), mặt ở nửa trên, né góc nhãn giờ; khung
cắt theo việc (nháp: bán thân to giữa → "to"; toàn thân 35% → "trống"; toàn thân 58% → mặt 21 px ở 168, mất biểu cảm); nền có chất liệu; 3 phong cách dùng CHUNG cho mọi bài để A/B biết phong cách nào thắng.

| kiểu | nền | chữ |
|---|---|---|
| A bảng phấn | bảng xanh, khung gỗ, vệt lau, hạt phấn | Caveat (OFL) |
| B truyện tranh | hai ô chia chéo, tia + chấm halftone, đối đầu hai vế | Bangers (OFL) |
| C đèn chiếu | một vật trên bàn gỗ, quầng đèn, viền tối | Archivo |

Dựng: `thumbs-v3.html` (t = bài × 3 + kiểu + 0.5) → `shoot.js stills` → `tools/thumb/check.py … --jpg` →
`out/en/<p>_public/youtube/thumb-tests/v3/{thumb-A,B,C.jpg, check-*.png, titles.txt}`.

| bài | A | B | C |
|---|---|---|---|
| zero-power | 2⁴…2⁰ chia đôi + "0⁰ = ?" — *Why Is Anything to the Power of Zero Equal to 1? (And What Is 0⁰?)* | Python 1 vs TI-84 ERROR — *Python Says 0⁰ = 1. A TI-84 Says Error. Who Is Right?* | khối 8-4-2-1, "WHY NOT 0?" — *Multiplying Something Zero Times Should Give Nothing. So Why 1?* |
| fifty-percent | "50% of WHAT?" ba mũi tên — *What Does 50% Actually Mean? Most People Can’t Say* | IN THE AIR 50% vs LANDED 50%?? — *The Coin Already Landed. So What Is 50% Describing?* | que thử POSITIVE, "SICK? 2%" — *A 99% Accurate Test Says You’re Sick. You Probably Aren’t.* |
| math-30k | dòng thời gian xương → BANNED → điện thoại — *30,000 Years of Math, From a Wolf Bone to Your Phone* | 1299 BANNED vs NOW bàn phím — *In 1299, These Numbers Were Banned. You Use Them Every Day.* | xương sói dưới đèn "THE FIRST MATH?" — *How Humans Invented Math, One Forbidden Idea at a Time* |

Dữ kiện: 2% = 0.99·0.001 / (0.99·0.001 + 0.05·0.999) ≈ 1.9% (SCRIPT fifty-percent); xương sói Czech ~30.000 năm; Florence 1299
(mô tả math-30k); TI-84 domain error, Python 0**0 = 1 (SCRIPT zero-power).

**Thêm 10-29 (người dùng: 2 bản mỗi bài để A/B với thumbnail đang chạy):** `thumbs-v3.html` t = 9.5 / 10.5 / 11.5 / 12.5.

| bài | bản | title |
|---|---|---|
| pi | A bảng phấn: vòng tròn lăn = d d d + 0.14…? "WHO CHOSE 3.14?" | *Nobody Chose π. So Why Is It 3.14 and Not Just 3?* |
| pi | B truyện tranh: FLAT 3.14 vs GLOBE "= 2?!" (xích đạo, đường kính qua cực — SCRIPT ACT FOUR) | *On a Globe, a Circle’s Circumference ÷ Diameter Is 2. Where Did π Go?* |
| solid-geometry | A bảng phấn: 3 chóp = 1 hộp "WHY EXACTLY 3?" | *Why Does It Take Exactly 3 Pyramids to Fill a Box?* |
| solid-geometry | C đèn chiếu: quả cầu trong ống trụ "2/3 ALWAYS?" (Archimedes, mộ) | *Archimedes Wanted This on His Tomb: Why a Ball Fills ⅔ of a Cylinder* |
