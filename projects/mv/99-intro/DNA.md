# DNA của MV `99-intro` ("99% 로딩 중")

> **Đây là DNA của MỘT MV**, không phải luật của kênh. Mỗi MV có DNA riêng hợp với lời và chất liệu hình của nó
> (`docs/DNA.md` — cách viết; exp-log dùng một DNA khác hẳn: `projects/mv/exp-log/DNA.md`). Giữ ở đây làm ví dụ
> và vì các bài học bên trong (bẫy tương phản, mosaic, danh sách cấm) đã trả giá thật.

---

## 1. Ngữ pháp màu — luật cốt lõi

```
gold-hot  #ffc94d  →  ĐANG vẽ, ngay lúc này. Màu DUY NHẤT được phép bloom.
gold      #d4a017  →  vừa vẽ xong, còn nóng (nguội dần ~0.5s)
teal      #2fe0d0  →  ĐÃ dựng xong, đã đúng, là nền móng cho bước sau
bone      #e8e4da  →  chữ, nhãn. Luôn SẮC, không bao giờ bloom
bone-dim  bone@34% →  đường dựng phụ, sẽ mờ khi không cần
navy      #05070f  →  nền, mặt giấy vô tận
```

Khán giả không cần được giải thích. Sau 3 lần lặp họ tự hiểu: **vàng = đang làm,
lam = đã xong**. Đó chính là cảm giác "xây từ dưới lên" mà kênh bán.

**Luật bất di bất dịch:** một phần tử tiền cảnh KHÔNG BAO GIỜ dùng chung màu chủ
đạo với hậu cảnh. Ở v2 mascot chìm vì vùng tối của nó được tô đúng màu vàng của
trường hạt nền — xem `docs/LESSONS.md § Bẫy tương phản`.

---

## 2a. Chữ gõ theo KÝ TỰ

Đo video mẫu ở 1/6 giây: **7.6 ký tự/giây, 131 ms mỗi ký tự**, tốc độ bám theo
thời lượng hát từng từ. Hiện cả từ một lúc là lỗi dễ thấy nhất khi so với video
chuyên nghiệp.

Dùng `typeLine()` trong `engine/lyric.js`. Từ khoá đổi màu **ngay khi gõ xong
từ đó**, không đợi hết câu. Mỗi câu 1–2 từ khoá, không phải mọi từ.

Chi tiết + bảng tra sự kiện: `docs/mv/SYNC.md`.

---

## 2b. Hai hệ nhịp — TÁCH BIỆT

Đo trên bài 99%: chỉ **22%** số từ rơi trong 80ms của một beat. Giọng rap chạy
tự do trên nhịp. Nên:

| bám gì | dùng hàm | ví dụ |
|---|---|---|
| **chữ + sự kiện nội dung** | `vox.wordAt()`, `vox.voxHot()` | chữ hiện, cảnh bắt đầu, hình vỡ |
| **nền: lưới, hạt, quầng, HUD** | `beat.onBeat()`, `beat.beatIndex()` | lưới trôi, hạt sáng, đếm beat |

Dùng một hệ cho cả hai thì hoặc chữ lệch lời, hoặc nền mất nhịp.

---

## 3. Mascot — luật hiển thị

> **Nhân vật đã đổi sang bản anime** (lab coat, kính tròng trong) — nhận dạng ở
> `CHARACTER-V2.md`. Đoạn mô tả ngoại hình ngay dưới là nhân vật cũ; các luật
> chất liệu và luật bằng số bên dưới vẫn áp dụng.

Nhân vật: tóc đen có **1–2 sợi ăng-ten** (dấu nhận dạng mạnh nhất), kính tròn
tròng trắng đục, **mắt lim dim**, áo sơ mi olive `#5A6B4D` mở phanh, da kem
`#F5DFA8`. Deadpan, hoài nghi nhẹ, **đứng cùng phía với người học**.

**Hai chất liệu, một nguồn ảnh:**

| hàm | khi nào | tỉ lệ thời lượng có mặt |
|---|---|---|
| `mascot.draw()` | **lúc đứng** — PNG đặc, nét sạch, viền + bóng | ~75% |
| `mascot.mosaic()` | **MỌI lần vào và ra** — hiện ra / tan đi bằng ký tự | ~25% |

Nhân vật **không bao giờ cắt cứng vào/ra**. Đo lại video mẫu ở độ phân giải gốc
(`REFERENCE-TEARDOWN.md` §2): đứng yên là ảnh màu sạch, nhưng mỗi lần xuất hiện
đều mở bằng một chuyển chất liệu (hàng ký tự quét, mặt nạ mây, cháy trắng) và
khép bằng một chuyển khác (tan thành lưới/cột ký tự, halftone, nổ hạt) — gần
như mỗi câu hát một lần, ≥ 4 kiểu xoay vòng. Vào 4–18 khung; ra 2–3 khung đổi +
0.5–1s mờ. Mở và kết bài: chân dung dựng hoàn toàn bằng ký tự (khung sách).

→ Bản cũ của mục này ghi "mosaic < 10%, chỉ một khung lúc MONSTER" — SAI, do
kết luận từ ảnh thu nhỏ. v2 dùng mosaic làm chất liệu đứng (sai, nhân vật chìm);
v3 bỏ hẳn (sai, mất dấu ấn). Đúng là: **ảnh đặc khi đứng, ký tự khi chuyển.**

**Luật bằng SỐ, không bằng "làm rõ hơn":**
- cao ≥ 20% khung; ≥ 32% ở cao trào; 40%+ ở khoảnh khắc đắt nhất
- alpha ≥ 0.92 khi đứng, không bao giờ bán trong suốt; chỉ trong chuyển chất
  liệu vào/ra thân mới được tan (bằng ký tự/hạt, không phải bằng alpha)
- luôn `ring: 4` (viền navy) + bóng blur — nền có đường sáng, thiếu viền là chìm
- CẤM dùng gold làm màu chủ đạo nhân vật — anh ta phải KHÁC màu với thế giới
- ăng-ten tóc không bao giờ bị cắt bởi mép khung
- không che đối tượng hình học chính

---

## 4. Not slop — DANH SÁCH CẤM

Mỗi điều dưới đây là một lỗi ĐÃ MẮC và bị khách bác bỏ.

1. **CẤM nền hạt lấp lánh.** Hạt chỉ tồn tại khi nó ĐANG LÀ một vật gọi tên được
   (điểm của đồ thị, ô của lưới, glyph của mosaic). Không "sương hạt", "nebula".
2. **CẤM hạt tụ lại mà không thành hình rõ.** Sau khi tụ, không đọc được nó là
   CÁI GÌ trong 0.3s → cảnh hỏng.
3. **CẤM rung/shake không có nguyên nhân trên hình.** Chỉ rung khi có vật va
   chạm, đóng dấu, chốt xuống mặt giấy TRONG KHUNG.
4. **CẤM chữ dán nổi trên nền không liên quan.** Chữ phải nằm trên mặt phẳng
   hình vẽ, hoặc là nhãn của một đối tượng, hoặc do chính đầu bút viết ra.
5. **CẤM toán trang trí.** Không ∫∑π rải rác cho "có vẻ toán". Mọi ký hiệu phải
   đúng ngữ cảnh hình đang dựng.
6. **CẤM bloom phủ toàn màn.** Chỉ gold được bloom. Chữ bone phải SẮC.
7. **CẤM mascot mờ/chìm/bán trong suốt.**
8. **CẤM lens flare quét ngang, god rays, chromatic aberration** làm hiệu ứng
   "cho đẹp". Đây là bản vẽ hình học, không phải trailer game.
9. **CẤM cắt cảnh khi có thể biến hình.** Ngân sách: tối đa 3 cú cắt cứng / 26s.

---

## 5. Kiểm tra cuối — tắt tiếng

Với MỖI cảnh, hỏi: **"tắt tiếng đi, khán giả có hiểu cảnh này nói gì không?"**

Nếu không → cảnh đó là trang trí, không phải nội dung. Làm lại.

---

## 6. Chỉ số đo được

| chỉ số | video mẫu | mục tiêu | cách đo |
|---|---|---|---|
| độ sáng TB | 87 | ≥ 33 | `signalstats` YAVG |
| YDIF trung vị | 3.50 | ≥ 0.5 | `signalstats` YDIF |
| lệch mốc cảnh | — | < 50ms | `tools/check-timing.mjs` |
| bitrate | 2.5 Mbps | 3–6 Mbps | `ffprobe` |

**Cảnh báo:** YDIF đo màn hình CÓ RUNG, không đo hình ảnh CÓ NGHĨA. Bản v2 đạt
YDIF 3.64 (vượt cả video mẫu) mà vẫn bị bác vì vô nghĩa. Dùng nó làm ngưỡng
sàn, không làm mục tiêu.
