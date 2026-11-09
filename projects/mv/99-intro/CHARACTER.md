# Mascot — bản mô tả nhận dạng

> **Đã thay thế:** nhân vật hiện tại là bản anime — xem `CHARACTER-V2.md`. File này mô tả nhân vật cũ.

Dùng làm "identity lock" khi sinh thêm pose mới, để nhân vật không trôi.

## Bất biến

| Bộ phận | Mô tả |
|---|---|
| Tóc | Đen than `#2E2E2E`–`#3A3A3A`, khối tròn lớn, rối, viền răng cưa. **1–2 sợi "ăng-ten" dựng đứng trên đỉnh** — dấu nhận dạng mạnh nhất |
| Kính | Gọng tròn/bầu dục mảnh, **tròng luôn trắng đục có vệt phản sáng chéo**, không thấy rõ mắt |
| Mắt | **Mí trên trĩu nặng, lim dim** — nét tính cách quan trọng nhất |
| Lông mày | Mảnh, thường nhíu nhẹ giữa |
| Da | Vàng kem ấm `#F5DFA8`–`#FAE3B0` |
| Áo khoác | **Sơ mi xanh rêu olive** `#5A6B4D`–`#6B7A5A`, luôn **mở phanh**, cổ bẻ |
| Áo trong | Thun đen/xám than, cổ tròn |
| Quần | Đen/xám than, ống suông |
| Giày | Nâu đất, đế dày |

Tỉ lệ **5–5.5 đầu**. Bàn tay 4 ngón + ngón cái, to so với cổ tay.
Nét viền dày đều, màu phẳng, không gradient.

## Tính cách

Không phải mascot "vui vẻ nhiệt tình". Mắt lim dim + kính lóa tạo ra nhân vật
**deadpan, hoài nghi nhẹ**, và quan trọng nhất: **đứng cùng phía với người học**
trước một bài toán khó, chứ không giảng từ trên xuống.

## Tài sản hiện có

`assets/character/cut/` — 6 pose đã tách nền:
`wave` (chào), `point` (chỉ tay), `thumb` (giơ ngón cái),
`shrug` (nhún vai), `think` (chống cằm), `chalk` (cầm phấn).

`assets/character/turnaround.png` — 6 góc: chính diện, 3/4 trái, nghiêng trái,
sau lưng, nghiêng phải, 3/4 phải.

`assets/character/rig/` — `chalk` tách 2 lớp để rig:
- `chalk-head.png` — crop (0,0,559,450) của ảnh gốc 648×1344
- `chalk-body.png` — crop (0,380,648,1344)
- điểm xoay đầu: (300,430) trong toạ độ ảnh gốc
- mép cổ y=415, chồng lấn 35px để không hở khi xoay

## Còn thiếu

- Bộ khẩu hình cho lip-sync (hiện chỉ 3 trạng thái miệng)
- Pose ngồi toàn thân
- Cận mặt (close-up)
