# VISUAL-RESEARCH — bóc tách video mẫu và pdoom

Đo trên hai video đã được đánh giá cao, so với bản của tôi. Mọi con số đo bằng
`ffmpeg signalstats` ở 160×90.

---

## 1. Phát hiện quan trọng nhất: BIÊN ĐỘ ĐỘ SÁNG

| | video mẫu | pdoom | bản đầu | **sau khi sửa** |
|---|---|---|---|---|
| độ sáng trung vị | 74.2 | 42.9 | 34.3 | 34.3 |
| p5 (khung tối nhất) | 35.5 | 23.6 | 32.7 | 32.7 |
| p95 (khung sáng nhất) | 197.3 | 197.6 | 38.0 | **194.1** |
| **BIÊN ĐỘ (p95−p5)** | **161.8** | **174.0** | **5.2** | **161.4** |

**Đo bằng p5–p95, KHÔNG p10–p90.** Cảnh đảo nền thường chỉ chiếm 8% thời lượng
nên không lọt vào p90 — dùng p90 sẽ báo "chưa đạt" trên một video đã đạt.
Đây là lỗi tôi mắc ngay lần đo đầu: p90 chỉ 39.1 trong khi p95 đã là 194.1.

Video của tôi **phẳng lì**: mọi khung sáng như nhau. Hai video kia có khung rất
tối xen kẽ khung rất sáng — **đó mới là thứ tạo nhịp thị giác**, không phải YDIF.

### YDIF phải đo ở 640×360, không phải 160×90

Ở 160×90 chữ và nét mảnh bị nuốt hoàn toàn. Cùng một video:

| độ phân giải đo | video mẫu | pdoom | bản của tôi |
|---|---|---|---|
| 160×90 | 3.50 | 1.51 | 0.27 |
| **640×360** | **5.49** | **3.04** | **0.65** |

Ở độ phân giải đúng, khoảng cách lộ rõ: tôi kém pdoom **5 lần**, không phải
"gần bằng". Ngưỡng nên lấy theo pdoom: **≥ 1.5**.

→ Vẫn đúng rằng YDIF là ngưỡng **sàn**, không phải mục tiêu — bản v2 đạt 3.64
ở 160×90 mà vẫn bị bác vì vô nghĩa. Nhưng đừng đo ở độ phân giải quá thô rồi
kết luận "đủ rồi".

---

## 2. Cơ chế tạo biên độ: ĐẢO NỀN

Không phải làm nền sáng dần. Cả hai video đều **đảo ngược bảng màu** ở một vài
cảnh: nền sáng, chữ tối.

| | số đoạn nền sáng | tổng thời lượng | % bài |
|---|---|---|---|
| video mẫu | 4 | 45.5s | **15%** |
| pdoom | 2 | 12.8s | **8%** |
| bản của tôi | 0 | 0s | **0%** |

**pdoom `bureau` (62–81s):** giấy trắng, mực đen, con dấu cam. Lời hát được
đánh máy vào đúng ô của một biểu mẫu hành chính.

**Video mẫu (148–192s):** bảng trắng, chữ viết tay đen, điểm nhấn đỏ.

### Áp dụng

- Dành **8–15% thời lượng** cho cảnh nền sáng
- Đặt ở **cao trào** (cả hai video đều đảo nền ở ~45–55% bài)
- Không đảo dần — **cắt cứng** sang nền sáng, đó là cú sốc thị giác
- Bảng màu đảo: `bone` làm nền, `navy` làm chữ, `gold` giữ nguyên làm điểm nhấn

---

## 3. Bão hoà màu

| | trung vị | p90 |
|---|---|---|
| video mẫu | 14.6 | 23.3 |
| pdoom | 4.1 | 8.0 |
| bản của tôi | 4.4 | 9.0 |

Bản của tôi ngang pdoom — **không cần sửa**. Video mẫu bão hoà cao hơn vì dùng
đỏ tươi làm điểm nhấn; pdoom kỷ luật hơn (chỉ cam hazard).

---

## 4. Phân bố sáng theo thời gian

Cả hai video đều có **một đỉnh sáng lớn ở giữa bài**:

```
VIDEO MAU   50-60% bài:  194 → 195 → 162      (đỉnh kéo dài 3 đoạn)
PDOOM       40-50% bài:  100 → 197 →  92      (đỉnh nhọn, 1 đoạn)
CUA TOI     mọi đoạn:     33 …  39 …  34      (đường thẳng)
```

→ Cấu trúc sáng của một MV nên là: **tối → sáng dần → ĐỈNH ĐẢO NỀN → tối lại**.

---

## 5. Việc cần làm cho bản tiếp theo

| việc | mục tiêu | cách kiểm |
|---|---|---|
| thêm 1–2 cảnh **đảo nền** | 8–15% thời lượng | đếm frame YAVG > 120 |
| nâng biên độ sáng | p90−p10 ≥ 60 | `signalstats` |
| giữ bão hoà | trung vị 4–8 | không đổi |
| YDIF | ≥ 0.5, không cần cao hơn | ngưỡng sàn |

**Với bài 26 giây:** 8–15% là **2–4 giây** nền sáng. Hợp lý nhất là đặt vào
cảnh cao trào (P7 "from scratch" hoặc P8 lưới chứng minh).


---

## 7. Chuyển động phải TRẢI ĐỀU khung, không dồn một chỗ

Đo YDIF theo từng vùng (đoạn 4 giây, 640×360):

| vùng | video mẫu | bản của tôi |
|---|---|---|
| nền trên | **3.09** | **0.20** |
| nền dưới | **5.97** | 0.63 |
| giữa khung | **6.04** | 0.82 |
| vùng mascot | — | 1.43 |

Vùng mascot của tôi đạt 1.43 (gần ngưỡng pdoom 3.04), nhưng **nền trên chỉ
0.20** — gần như chết. Nền chiếm diện tích lớn nhất nên nó kéo trung bình xuống.

### Thí nghiệm đã làm và kết quả

Tăng biên độ camera pan **4.5 lần** (46 → 210px), thêm dolly, tia sáng quay
nhanh gấp 2.6 lần → YDIF **0.76 → 0.75**, gần như không đổi.

→ **Pan/dolly một lớp mờ không tạo được chuyển động.** Cái tạo YDIF là *vật thể
có tương phản cao* di chuyển, không phải nền mờ trượt qua.

### Video mẫu làm gì ở nền

1. **Mặt nước phản chiếu chiếm nửa dưới khung** — hàng nghìn điểm sáng lấp lánh
   độc lập, tương phản cao trên nền tối
2. **Tia sáng hướng tâm** quay liên tục, tương phản rõ
3. **Chữ/vật thể lớn** di chuyển qua khung

→ Việc cần làm: thêm **mặt phản chiếu** ở nửa dưới khung. Đây là lớp chuyển
động lớn nhất của video mẫu và là thứ bản của tôi thiếu hoàn toàn.


---

## 8. Phép đo đáng tin nhất: % PIXEL ĐỔI giữa hai khung liên tiếp

YDIF ba lần liên tiếp không phản ứng với thay đổi lớn (pan ×4.5, mật độ hạt ×3).
Phép đo trực tiếp hơn: so hai khung cách nhau **một frame** và đếm pixel đổi.

```python
from PIL import Image, ImageChops
import numpy as np
a = Image.open('f1.png').convert('L'); b = Image.open('f2.png').convert('L')
d = np.array(ImageChops.difference(a, b))
print('%% pixel đổi > 2: %.1f%%' % (100 * (d > 2).mean()))
```

| | % pixel đổi | quy về cùng đơn vị |
|---|---|---|
| video mẫu (1/30s) | **32.4%** | 32.4% |
| bản của tôi (1/60s) | 6.0% | **~12%** |

→ Kém gần **3 lần**. Đây là con số nên dùng để theo dõi, không phải YDIF.

### Vì sao YDIF không phản ứng

YDIF là **trung bình toàn khung** của độ lệch. Một lớp nền mờ trượt qua làm đổi
rất nhiều pixel nhưng mỗi pixel chỉ đổi 1–2 mức — trung bình vẫn thấp. Trong khi
một vật thể tương phản cao di chuyển làm ít pixel đổi nhưng mỗi pixel đổi 100+.

→ Dùng **% pixel đổi** để đo "khung có sống không", **YDIF** để đo "biên độ đổi".
Hai chỉ số khác nhau, cần cả hai.

### Việc còn lại

Nền trên vẫn 0.26 (video mẫu 3.09). Cần một lớp chuyển động lớn ở nửa trên —
video mẫu dùng chữ/vật thể lớn bay qua, không phải nền mờ.
