# Chất liệu mascot — dùng cái nào, khi nào

Một nguồn ảnh PNG, sáu cách hiện. Quy tắc gốc của 99-intro (projects/mv/99-intro/DNA.md):
**PNG đặc khi ĐỨNG (~75% thời gian có mặt). MỌI lần vào/ra đi qua một chuyển
chất liệu (~25%) — không bao giờ cắt cứng.** Video mẫu làm vậy gần như mỗi câu
hát, ≥ 4 kiểu xoay vòng (xem `mv/REFERENCE-TEARDOWN.md` §2). Ngoài vào/ra, chất
liệu khác vẫn là SỰ KIỆN kể chuyện.

Mỗi lần dùng một chất liệu không-mặc-định, phải trả lời được: *nó phục vụ
CÂU LỜI nào?* Không trả lời được thì bỏ. Đó chính là lỗi đã làm bản v2 bị bác.

| Chất liệu   | Nghĩa nó nói ra              | Dùng khi lời hát nói về |
|-------------|------------------------------|-------------------------|
| `draw()`    | Nhân vật CÓ MẶT, rõ ràng     | mặc định — mọi lúc khác |
| `chalk()`   | Bản nháp, nét tay, chưa tô   | làm tay, không mẹo, nháp |
| `mosaic()`  | Thân thể LÀ ký hiệu toán     | khoảnh khắc chốt, danh tính |
| `shatter()` | Vỡ ra / tụ lại               | phá, bẻ nhỏ, dựng lại   |
| `frame()`   | Đổi hệ quy chiếu             | chuyển chủ đề, trích dẫn |
| `mirror()`  | Có mặt đất, có chiều sâu     | nền dưới, cảnh tĩnh     |

## Phân công cho MV "99% 로딩 중" (bài tham khảo)

Bài này là BÀI TẬP. MV sau làm mới hoàn toàn — bảng dưới là ví dụ cách suy
nghĩ, không phải khuôn mẫu phải lặp lại.

| Cảnh | Lời                                   | Chất liệu            | Lý do |
|------|---------------------------------------|----------------------|-------|
| P1   | "99%… loading"                        | `draw`               | giới thiệu: phải thấy rõ mặt |
| P2   | "Start with a question"               | `draw` + `frame`     | khung tròn mở ra = bắt đầu một câu hỏi |
| P3   | "break it down"                       | `shatter` 0→0.55→0   | NGHĨA ĐEN của lời: vỡ rồi tụ lại |
| P4   | "lines turn, numbers move"            | `mosaic`             | thân thể thành ký hiệu — bốn môn toán |
| P5   | "no tricks, no guessing, from ground" | `draw` (dựng riêng)  | cần đầu phấn khớp đúng đường kẻ — không đụng |
| P6   | "why does it work?"                   | `draw` đứng im       | cảnh tĩnh duy nhất, không thêm gì |
| P7   | "from scratch"                        | `chalk` → `draw`+sweep | cào ra từ nét, rồi đặc lại |
| P8   | (không lời, cao trào)                 | `draw`               | lưới đã là hệ quy chiếu rồi |
| P9   | "loading" + hard stop                 | `draw`               | khép lại đúng như mở ra |

### Vì sao `mirror()` KHÔNG dùng ở bài này

Cả P1/P2/P9 đặt chân nhân vật ở `H*0.985–0.99` — chỉ còn 11–16px tới đáy
khung, trong khi bóng cần ~200px. Bố cục "đứng sát đáy, thấy nửa người" là
chủ ý, nên bỏ `mirror` chứ không nâng nhân vật lên phá bố cục.

`mirror()` vẫn nằm trong engine, dùng được ngay khi MV sau đặt nhân vật cao
hơn `H*0.80`. **Đo khoảng trống dưới chân trước khi gọi nó.**

## Bẫy đã gặp (đừng lặp)

1. `drawMosaic()` nhận **tâm-đáy**, giống `draw()`. Trừ sẵn `w/2`/`h` trước
   khi truyền là trừ hai lần → mascot bay lên góc trên.
2. `grid()` từng dựng lưới ở `h=420` cố định → `cell` không còn là px logic,
   cỡ chữ đổi theo `hpx`. Nay lấy mẫu theo `hpx` thật, làm tròn bậc 60px.
3. `chalk()` nếu chỉ lấy viền ngoài thì ruột rỗng hoàn toàn → mất mặt, mất
   kính, nhìn như cái bóng. Phải giữ **biên** bên trong (nơi độ sáng đổi đột
   ngột), không phải giữ cả mảng tối — giữ mảng tối sẽ ra hình bóng tô màu.
4. `mirror()` lật quanh đường chân: sau `scale(1,-1)` trục y hướng LÊN, nên
   phải vẽ ảnh ở `-hpx..0`. Vẽ ở `0..hpx` thì bóng phủ ngược lên thân.
5. `chalk()` đọc `getImageData` — PHẢI cache theo (pose, kích thước, độ dày),
   nếu không là một lần đọc pixel mỗi khung ở 60fps.
6. **Màu chất liệu phải hợp NỀN CỦA CẢNH ĐÓ.** P7 chạy trên nền giấy sáng:
   `chalk` màu gold-hot chìm hoàn toàn, phải đổi sang mực tối `#2a2418`.
   Đây đúng là bẫy đã làm hỏng v2 — lặp lại y nguyên ở chất liệu mới.
7. **Đừng cho alpha thân người chạy 0→1 trên nền sáng.** Giấy lọt xuyên qua
   người thành bóng ma. Cho PNG đặc ngay; thứ fade phải là lớp nét phủ lên.
8. `shatter()` bay ra ngoài khung nếu nhân vật đứng sát mép: ở x=202 với
   `spread 0.7` hạt tới x=−10. Tính `mx − spread·hpx` trước, đừng đoán.

## Bàn thử

    node engine/render/shoot.js stills --page tools/lab/mascot.html \
      --t 0,0.35,0.7,1 --outdir out/_lab

Sáu ô, mỗi ô một chất liệu, `k` chạy theo `t`. **Luôn nhìn ảnh** trước khi
gắn vào cảnh — `node --check` không bắt được lỗi vẽ.
