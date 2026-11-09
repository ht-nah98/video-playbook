# STYLE — người que khăn đỏ nét mềm (model sheet kỹ thuật)

Một nguồn cấu hình duy nhất (LESSONS §166): `engine/hero.js` — `hero(g, 'C', …, { soft: true })`. Không truyền `arm` /
`torso` riêng trong cảnh trừ khi dáng cần giãn (DICTIONARY `armK`). Bài cũ (không `soft`) giữ nguyên từng pixel.

## 1. Thông số

| phần | giá trị | vì sao |
|---|---|---|
| tay | `SOFT_ARM = 0.85` × (0.155 + 0.15) h ≈ 0.26 h, mọc ở cổ | người dùng 10-26: "tay dài quá nửa thân" → tay buông, đầu tay trên hông |
| thân | `SOFT_TORSO = 1.2` × 0.27 h ≈ 0.32 h | người dùng: "người dài ra thêm 1 xíu" |
| chân | đùi 0.2 h + cẳng 0.2 h (không đổi) | hông đứng ở 0.394 h — gait và IK chân dựa vào số này |
| đầu | vòng trắng viền mực, r ≈ 0.15 h | nhận dạng kênh (`docs/character/CHARACTER-STICK.md` §1) — to hơn Becker là CHỦ Ý (mắt diễn ở cỡ nhỏ) |
| nét chi / thân | 1.25 × 0.06 h = 0.075 h | kiểu C người dùng chọn; viền đầu giữ 0.06 h |
| đầu tay | chấm tròn bán kính 0.6 × nét | đọc được bàn tay khi chi cong |
| bàn chân | móc ngắn 0.05 h về phía mặt | chân "đứng" trên đất, không phải que cắm |
| khăn | giữ nét 0.06 h như bản cũ | khăn không phình theo nét chi |

## 2. Đường cong (hình học, không phải easing — LESSONS §168)

- **Chi** = một cung bậc hai từ gốc tới đầu chi, điểm điều khiển `m + β·(m − (a + e)/2)` (m = khuỷu/gối).
  Gập nhẹ → β = 1: cung đi QUA khớp (mềm như Becker). Gập gắt → β giảm tuyến tính tới 0.3 ở góc 120°: bo theo góc.
  β = 1 ở gối 90° làm chi phình như quả bóng (LESSONS §169).
- **Thân** = xương HAI đốt (LESSONS §172): `curl` gập lưng — nửa dưới `lean − curl/2`, nửa trên `lean + curl/2`, đầu theo
  nửa trên; vẽ một cung hông → cổ đi qua giữa lưng. Mặc định `curlOf(lean)`: +10° đứng (hơi khom vai), cúi → gù chữ C
  (0.6 × lean, tới 48°), ngả sau → ưỡn (0.75 × lean, tới −40°). Dáng mạnh ghi `curl` riêng (hunch 56, pick 50, recoil −44).
- Chi duỗi thẳng vẫn thẳng — đường cong chỉ xuất hiện khi khớp gập; không bao giờ "uốn sẵn" một chi đang thẳng.

## 3. Số đo Becker (đo bằng mặt nạ màu trên khung gốc, `tools/study/stick_ref.py --at`)

| đo | Coding (vàng, đầu đặc) | Math (cam, đầu rỗng) | ta (soft) |
|---|---|---|---|
| nét / cao người | 0.041 | 0.029–0.032 | ≈ 0.07 |
| đường kính đầu / cao người | ≈ 0.20 | ≈ 0.22–0.25 | ≈ 0.29 |
| tay buông tới | đáy chậu / đầu đùi | đầu đùi | trên hông (theo yêu cầu) |
| gốc tay | dưới đầu ~0.1 thân | dưới đầu ~0.1 thân | ở cổ |

Nét của ta dày gấp đôi Becker — người dùng đã chọn bản này ("kiểu C ok"). **Đề xuất còn chờ:** thử nét 0.9 × (≈ 0.054 h)
trên bảng từ điển để người dùng so; không tự đổi.

## 4. Giãn chi theo dáng (squash & stretch)

Đầu to + tay ngắn = không với qua đầu (LESSONS §149, §170). Không kéo dài tay CHUNG (người dùng chê tay dài) — thay vào đó
mỗi dáng giơ cao mang `armK` (cheer 1.3, overhead 1.4, hang 1.55, scratch 1.15, shrug 1.1). Nội suy giữa khoá → tay dài ra
dần khi vươn, ngắn lại khi buông — đúng cách Becker kéo giãn chi trong động tác nhanh.

## 5. Không bắt chước

Đầu đặc vàng (Coding) / cam rỗng (Math) là dấu riêng của Becker — giữ đầu trắng + khăn đỏ + mực của kênh. Học cách vẽ
đường và biên độ dáng, không học màu.
