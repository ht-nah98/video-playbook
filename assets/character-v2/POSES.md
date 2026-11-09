# Danh mục tư thế mascot v2

Ảnh gốc ở `src/`, bản đã tách nền ở `cut/` (tách thêm bằng `tools/cutout/cutout.py`; bảng `ALIAS` đổi tên tiếng Việt).

**Nguyên tắc chọn:** mỗi MV chỉ lấy vài tư thế hợp với lời và câu chuyện của bài, đủ để tạo điểm nhấn.
KHÔNG nhồi hết vào một MV. Mỗi tư thế xuất hiện thì phải có lý do, ghi vào TREATMENT.

| nhóm | ảnh gốc (`src/`) | gợi ý dùng |
|---|---|---|
| đếm / ra dấu | giơ ba ngón tay (`pose-three`) · tóc rối giơ dấu hòa bình, quay lưng (`pose-peace-back`) | đếm số, "3", chào tạm biệt quay lưng |
| bùng nổ | giơ nắm đấm chiến thắng (`pose-fist`) · `pose-jump` · dang tay chào đón | cao trào, drop, kết bài |
| suy nghĩ | trầm tư trong áo blouse · `pose-slump` | câu hỏi, đoạn lặng |
| chỉ dẫn | chỉ lên trời · chỉ xuống · cầm que chỉ dẫn · `pose-point` · thầy giáo cầm phấn | giải thích, nhấn một vật trên khung |
| mời / dừng | chìa tay mời gọi · giơ tay dừng lại · `pose-wave` | mở bài, ngắt nhịp |
| điềm tĩnh | lạnh lùng (2 bản) · tai nghe đen · ánh viền xanh cam / xanh vàng | nền, đứng giữ khung |
| đạo cụ | sổ tay trắng · tách trà nóng · mặt dây chuyền +C (`pose-plusc`) · đĩa phát sáng · đặt cột sáng vàng | khi lời nhắc đúng vật đó |
| âm nhạc | tai nghe vàng rực (2 bản, ngang) · DJ máy beat · ca sĩ dây chuyền +C (ngang) | đoạn beat, điệp khúc |
| cảm xúc mạnh | `pose-angry` · `pose-startled` · `pose-thumb` · `pose-crossed` | phản ứng một câu lời |

Hát nhép: `visemes-3x3.png` → `cut/viseme-N`, `Bảng chín biểu cảm miệng anime.png` → `cut/mouth-*`.
Miệng NÓI (bài học, mọi tư thế): neo đo tay trong `mouths.js` — có ponder, point, calculator, ok, wave; tư thế khác phải đo thêm (`docs/character/CHARACTER-V2.md` § Miệng nói).

## Bộ 2026-10-05 (cho zero-div) + luật khung hình

| tên | ảnh gốc | gợi ý dùng |
|---|---|---|
| `pose-idle` | Chàng trai áo blouse trắng kính tròn (1) | đứng nghe, trung tính (toàn thân) |
| `pose-shrug` | Chàng trai nhún vai với đôi tay trống rỗng | "không có đáp án", "trống rỗng", NaN (toàn thân) |
| `pose-ok` | Nam chính áo blouse tạo dấu OK | ngón tay tạo vòng tròn = **số 0**; "ổn rồi" (toàn thân) |
| `pose-twoways` | Nhà Khoa Học Chỉ Hướng Hờ Hững | một tay lên, một tay xuống: hai phía / hai đáp án (khung giữa đùi) |

**Hai loại khung trong `cut/`:** toàn thân (angry, crossed, idle, jump, ok, point, shrug, slump, startled, thumb,
wave) và giữa đùi (còn lại). Trong một video đừng trộn cỡ đầu: khi đặt cạnh bộ giữa đùi, cắt ảnh toàn thân còn
**~45% chiều cao trên (ngang hông)** rồi phóng bằng chiều cao hiển thị — cỡ đầu khớp (đo ở `out/_lab/mascot-crop.jpg`,
cắt 60% thì đầu nhỏ hơn ~1.35×). Nhảy/giật mình (jump, startled) chỉ dùng toàn thân.

## Bộ 2026-10-06 (cho fifty-percent) — khung giữa đùi, nền trắng, tách sạch

| tên | ảnh gốc | gợi ý dùng |
|---|---|---|
| `pose-coin-cover` | Nhà khoa học trẻ với nụ cười tinh quái | úp tay lên mu bàn tay, đồng xu giấu dưới; cười bí ẩn — "đã rơi nhưng chưa mở" |
| `pose-coin-flip` | Tung đồng xu giữa ánh sáng tương phản | ngón cái vừa búng, mắt nhìn lên. **Đồng xu vẽ sẵn bị tách nền xoá** (như vạch chuyển động) → vẽ đồng xu bay bằng code, quanh (x ≈ 0.12, y ≈ 0.05) khung cắt |
| `pose-coin-peek` | Trộm Coin Kín Đáo Trong Áo Blouse | cầm đồng xu sát ngực, cúi nhìn lén — "nếu mình lén nhìn" |
| `pose-phone` | Nhà khoa học trẻ nhìn điện thoại đầy nghi ngờ | giơ điện thoại (màn trống, xám nhạt), liếc nghi ngờ — tin nhắn lừa đảo; có thể vẽ tin nhắn lên màn bằng code |

## Bộ 2026-10-07 (cho pi) — nền trắng, tách sạch

| tên | ảnh gốc | gợi ý dùng |
|---|---|---|
| `pose-spin` | Nhà Khoa Học Anime Ngầu Lòi | **TOÀN THÂN** (CROP 0.45): ngón trỏ phải chỉ lên, tay trái chống hông, cười tự tin — vẽ vòng quay / vệt sáng quanh đầu ngón bằng code ("π là về sự quay") |
| `pose-compass` | Chàng trai áo blouse vẽ bằng compa | khung giữa đùi (CROP 1): tay phải giơ compa gỗ (đầu kim chĩa sang TRÁI khung cắt), tay kia đút túi, cúi nhìn — đặt nhân vật bên PHẢI khung để compa chĩa vào hình; Archimedes / vẽ vòng tròn |

## Bộ 2026-10-08 (cho zero-power) — nền trắng, tách sạch

| tên | ảnh gốc | gợi ý dùng |
|---|---|---|
| `pose-calculator` | Cậu học sinh với máy tính đáng ngờ | khung giữa đùi (CROP 1): hai tay giơ máy tính cầm tay ở bên TRÁI khung, ngón trỏ bấm phím, liếc nghi ngờ + giọt mồ hôi. **Màn máy trống (xám xanh)** ở khoảng x 0.05–0.20, y 0.34–0.41 của ảnh cắt → vẽ chữ kết quả lên màn bằng code (`ERR`, `1`) — "máy tính cãi nhau" |

## Bộ 2026-10-09 (cho solid-geometry) — nền xám nhạt, tách sạch (vùng sót: bảng `ERASE` trong `tools/cutout/cutout.py`)

| tên | ảnh gốc | gợi ý dùng |
|---|---|---|
| `pose-icosa` | Nhà khoa học và khối đa diện xanh lam | khung giữa đùi (CROP 1): tay phải giơ **khối 20 mặt xanh lam** ở góc TRÊN-TRÁI ảnh cắt (khoảng x 0.0–0.30, y 0.13–0.33), mắt liếc nhìn khối, tay kia đút túi — 5 khối Platon, xúc xắc d20, "only five" |
| `pose-stool` | Chàng trai tóc rối trên ghế gỗ | **TOÀN THÂN NGỒI** (CROP 1 — giữ cả ghế, đầu nhỏ hơn bộ giữa đùi ~1.6×): ngồi **ghế đẩu gỗ BA CHÂN**, cười nhếch, khuỷu tay chống gối — ghế ba chân không cập kênh (tiên đề 2), mở bài, "lần sau" |
