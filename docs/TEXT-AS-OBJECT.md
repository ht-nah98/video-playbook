# Chữ LÀ vật thể

Kỹ thuật mạnh nhất của video mẫu, và là thứ tách một MV chuyên nghiệp khỏi
một video có phụ đề.

> **Luật gốc:** chữ KHÔNG BAO GIỜ chỉ là phụ đề. Nó luôn là *một phần của
> thế giới trong khung.* — docs/mv/REFERENCE-TEARDOWN.md §3

Video mẫu dùng chín kiểu xử lý chữ khác nhau, **không lặp lại kiểu nào**.
Mạnh nhất: mặt trời dựng bằng chính lời bài hát, chữ uốn thành vòng đồng tâm,
tia sáng cũng là chữ.

## Hai module chữ — đừng nhầm

| | `engine/lyric.js` | `engine/typeobj.js` |
|---|---|---|
| Vai trò | chữ để **ĐỌC** | chữ làm **VẬT LIỆU** |
| Bám vào | `vox.wordAt()` — từng từ hát | mốc cảnh, hoặc beat |
| Kích thước | cỡ đọc (26–40px) | lớn (40–120px) |
| Đóng góp | nội dung | **hình khối + chuyển động** |

`typeobj.js` cũng chính là lời giải cho vấn đề nền trên bất động
(docs/mv/VISUAL-RESEARCH.md §7–8): nền trên cần **vật thể lớn tương phản cao**
chuyển động, không phải lớp mờ trượt. Chữ lớn đúng là vật thể đó.

## Năm hàm

### `arcText(g, text, cx, cy, r, a0, opts) → góc kết thúc`
Uốn chuỗi quanh cung tròn. Viên gạch của mọi vật thể tròn làm bằng chữ.
Trả về góc cuối nên nối được nhiều đoạn liên tiếp. `flip: true` cho chữ quay
đầu vào tâm (dùng ở vòng ngoài).

### `textOrb(g, text, cx, cy, r, t, opts)`
**Mặt trời của video mẫu.** Nhiều vòng đồng tâm, vòng kề nhau quay ngược
chiều để lớp trong/ngoài tách bạch. `rays: n` thêm tia hướng tâm cũng bằng chữ.
`grow` 0→1 cho vòng nở ra từ tâm — bám mốc hát bằng `prog()`.

### `textWall(g, text, x, y, w, h, t, opts)`
**Chữ thành kiến trúc không gian** (video mẫu: tường chữ Hán). Lưới chữ phủ
kín vùng, hàng chẵn/lẻ trôi ngược nhau nên mắt đọc ra chuyển động thật chứ
không phải một khối trượt. Đây là lớp chuyển động lớn dùng cho nền.

### `textDissolve(g, text, x, y, t, k, opts)`
**Chữ tan thành hạt khi hết lượt.** `k` 0→1. Chữ phải ĐỌC ĐƯỢC rồi mới rã:
đường cong mũ 2.2 giữ chữ gần nguyên tới k≈0.45 rồi rã dứt khoát. Tuyến tính
thì 48% hạt đã rời chỗ ngay ở k=0.30 — người xem chưa kịp đọc.

### `textPlane(g, lines, cx, cy, t, z, opts)`
**Chữ trên mặt phẳng 3D nghiêng.** Mỗi dòng ở một độ sâu; tăng `z` = bay tới,
dòng gần nhất vượt qua camera và biến mất. Chữ của tôi trước giờ luôn phẳng 2D.

## Bẫy đã gặp

1. **`parseFloat('700 46px "Archivo"')` trả về `700`, không phải `46`.**
   Đó là trọng lượng chữ. Lỗi này làm `lineH` sai 15 lần và tường chữ trôi
   hết khỏi vùng clip. Dùng `fontPx(font)` — đã export sẵn.
2. **Vòng chữ quấn chồng lên nhau.** Làm tròn LÊN số lần lặp thì phần dư đè
   lên đoạn đầu thành vệt rối. Làm tròn XUỐNG rồi giãn `spacing` để phần
   thiếu chia đều: `sp = chu_vi / (times × bề_rộng_chuỗi)`.
3. **`textPlane` cộng dồn `i*spacing`** sẽ đẩy cả khối xuống đáy khung.
   Phải xoay quanh điểm tụ: `(d-1) * spacing * s`.
4. **Màu phải hợp nền CỦA CẢNH ĐÓ**, không theo bảng màu thương hiệu.
   Xem docs/LESSONS.md §13 — bẫy này đã làm hỏng v2 và tái xuất ở P7.

## Bàn thử

    node engine/render/shoot.js stills --page tools/lab/typeobj.html \
      --t 0,0.3,0.7,1 --outdir out/_lab

Bốn ô, `k` chạy theo `t`. **Luôn nhìn ảnh** — `node --check` không bắt được
lỗi vẽ. Bốn trong năm lỗi trên chỉ lộ ra khi nhìn.
