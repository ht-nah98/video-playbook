# DNA — `ja/intro` (intro kênh 99の発見), hướng A「漆と金」

Người dùng chọn A (2026-10-10), duyệt khung mẫu (4 khung 2.75 / 6.75 / 11.4 / 20.3 s; ảnh QA đã dọn — chụp lại bằng `render.ts stills --set ja/intro`) ("OK đẹp đấy. Triển khai nhé").
Yêu cầu gốc: "phong cách sang xịn mịn căng đét, hợp style Nhật", ý tưởng "thật bùng nổ".

## Ý trung tâm
**Câu hỏi → bên dưới con số → khám phá.** Mỗi câu lời là một lớp sơn mài được lật ra: đen bóng phía trên, vàng phía dưới.
"99" là con dấu 朱印 — dấu của người tìm ra.

## Chất liệu (đã kiểm trên khung mẫu)
| | |
|---|---|
| sân | sơn mài đen = gương tối: `Reflector` + lớp đen bán trong 85% (Reflector trộn OVERLAY, không nhân — không lớp phủ thì phản chiếu loá) |
| vàng 金 | `#D9A441`, kim loại, roughness 0.24; vàng trầm `#9C6B1E` cho vật nền |
| son 朱 | `#9A1D12`, roughness 0.55, clearcoat 0.45 (clearcoat cao → hồng nhựa) |
| ngà | `#EFE3C8` — chữ phụ, chữ khắc trên dấu |
| nền | đen ấm `#050403` → `#120B07`, quầng son rất nhẹ ở chân trời; sương 12–34 cho sàn tan vào nền |
| môi trường | studio tự dựng: softbox ấm SAU camera (mặt trước chữ vàng phản chiếu nó — thiếu thì vàng thành nâu), softbox trên, dải son phía sau, dải lạnh yếu. Không dùng RoomEnvironment (đèn HDR gắt) |
| chữ | Shippori Mincho Bold (明朝, OFL) đùn khối có vát; KHÔNG voxel (nét chữ Hán mảnh → răng cưa). Thiếu √ π θ Σ ∞ → ký hiệu vẽ bằng hình |
| hạt | bụi lá vàng nhỏ, thưa (260), không bay sát ống kính; rộ theo kick |
| hậu kỳ | bloom 0.5 ngưỡng 0.9, grain 0.035, vignette 0.45, CA 0.6; chớp trắng 2 khung ở cú đập lớn |

## Mô-típ
円相 (vòng tròn một nét cọ) · kintsugi (vết nứt vàng) · 枯山水 (vườn đá, vân cát = vòng đồng tâm) · 朱印 (con dấu) ·
提灯 (đèn lồng giấy) · 切り紙 (hoa giấy cắt) · chữ số vàng như hạt bàn tính.

## Nhịp (thước đo từ intro 3D cũ — LESSONS §73)
Mỗi cụm lời là một vật thể trên hình, hiện đúng mốc hát. Không khung nào đứng yên quá 0.5 s (trừ khung logo cuối,
giữ ≥ 0.7 s). Mỗi ô nhịp có một cú cắt / whip / chớp. Mascot ≤ 25% thời lượng (ở đây ~8%: chỉ cú drop).

## Âm thanh
Chỉ nhạc Suno của người dùng (`audio/intro-ja.m4a`, 98 BPM, 20.69 s). Không thêm tiếng hiệu ứng.
