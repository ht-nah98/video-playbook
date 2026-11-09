# 99% from scratch — intro 25.968s — treatment & style bible

> Tài liệu này là KỊCH BẢN, không phải tài liệu kỹ thuật. Nó nói video PHẢI
> TRÔNG NHƯ THẾ NÀO và VÌ SAO. Phần ánh xạ sang code nằm ở mục cuối.
>
> Luật kiểm tra duy nhất cho mọi cảnh: **tắt tiếng đi, người xem vẫn phải hiểu
> cảnh này đang nói gì.** Cảnh nào trượt luật này thì vứt, viết lại.

---

## The idea in one paragraph

Video là **một dựng hình thước-kẻ-compa duy nhất, được vẽ trọn vẹn từ một điểm
đến một định lý, trong 26 giây.** Xuyên suốt cả video có một mô-típ trung tâm —
**đầu compa** (the compass point): một chấm sáng vàng hổ phách, luôn là thứ
sáng nhất khung hình, kéo theo sau nó một nét mảnh. Nó là vật đầu tiên xuất hiện
trên nền đen, và mọi hình ảnh trong video đều do chính nó sinh ra: nó chọc xuống
làm tâm, quay một cung tròn, cắt cung kia, dựng đường trung trực, bẻ thành đồ
thị, tự nhân bản thành một lưới chứng minh, rồi cuối cùng đóng lại thành một
dấu chấm — chính là dấu chấm của chữ "99%". Không có vật thể nào trong video
"xuất hiện"; mọi vật thể đều được **DỰNG** ra trước mắt khán giả, từ thứ đã có
trước nó. Đó chính là nghĩa đen của "from scratch": bạn không được cho trước gì
cả, bạn chỉ có một điểm và một cái compa, và từ đó bạn dựng ra toàn bộ hình học.
Mascot không đứng ngoài xem — anh ta là **người cầm compa**: bàn tay và cây phấn
của anh ta là thứ điều khiển chấm sáng đó, nên nhân vật và hình ảnh là một.

### Vì sao chọn mô-típ này (đọc trước khi phản đối)

| Tiêu chí | Đầu compa đạt được ra sao |
|---|---|
| Thuộc về toán học thật | Dựng hình thước-compa là nền móng của Euclid — "toán từ số 0" theo nghĩa lịch sử chính xác nhất |
| Khớp triết lý kênh | Dựng hình KHÔNG được phép giả định; mọi bước phải chứng minh được. Đúng câu "No tricks, no guessing" |
| Khớp tên kênh | "From scratch" = "scratch" cũng có nghĩa là VẾT GẠCH, vết compa cào trên mặt giấy. Một chơi chữ hình ảnh, không cần giải thích |
| Có sức mạnh thị giác | Một chấm sáng kéo nét trên nền tối là hình ảnh mạnh nhất có thể có với ngân sách 150k điểm — pdoom đã chứng minh bằng "the spark" |
| Biến hình được | Compa → cung tròn → đồ thị → lưới → dấu chấm: mọi thứ đều là ĐƯỜNG, nên biến hình giữa chúng là nội suy đường, không phải cắt cảnh |
| Trả lời được câu hỏi cuối | "Why does it work?" — dựng hình là loại toán DUY NHẤT mà lời giải và lời chứng minh là CÙNG MỘT hình vẽ |

**Mô-típ bị loại và lý do:** hạt/particle (vô nghĩa, đã bị khách bác); số 0 lớn
dần (một trò chơi chữ, hết ý sau 3 giây); cây nhị phân (đẹp nhưng không nói gì
về "hiểu bản chất"); vòng lặp Mandelbrot (quá nặng, không dạy gì, và là cliché
của video toán); dòng code chạy (đây là kênh toán, không phải kênh lập trình).

---

## Tone

- **Dựng, không trang trí.** Mỗi frame phải trả lời được: hình này được dựng ra
  từ cái gì ở frame trước? Nếu câu trả lời là "nó tự hiện ra" thì sai.
- **Chuyển động liên tục nhưng CÓ LÝ DO.** Camera di chuyển vì đang đi theo đầu
  compa, không phải vì "cần YDIF cao". Mọi cú nhấn rơi đúng beat (0.7598s).
- **Chính xác như bản vẽ kỹ thuật**: nét mảnh đều, tương phản cao, nhiều khoảng
  trống. Đẹp theo kiểu một trang sách hình học được vẽ tay chuẩn, không phải
  theo kiểu poster sci-fi.
- **Deadpan, đứng cùng phía người học.** Mascot mắt lim dim, không hò hét. Cảm
  giác đúng là: "ừ, bài này khó, nhưng nhìn này, dựng được đấy."
- **26 giây, không một giây thừa.** Mỗi từ trong lời bài hát có một chỗ đứng
  trên hình. 26 giây quá ngắn để có bất kỳ cảnh "chuyển tiếp" nào.

### Not slop — DANH SÁCH CẤM (đây là các lỗi bản v2 đã mắc)

Cấm tuyệt đối, không có ngoại lệ, không có "nhưng lần này thì khác":

1. **CẤM nền hạt lấp lánh** làm nền cho một cảnh. Hạt chỉ được phép tồn tại khi
   nó ĐANG LÀ một vật cụ thể gọi tên được (các điểm của một đồ thị, các ô của
   một lưới chứng minh, các glyph của mosaic nhân vật). Không có "sương hạt",
   "bụi vũ trụ", "nebula", "starfield".
2. **CẤM hạt tụ lại mà không thành hình rõ ràng.** Nếu sau khi tụ, người xem
   không đọc được nó là CÁI GÌ trong vòng 0.3s, thì cảnh đó hỏng.
3. **CẤM rung lắc / shake không có nguyên nhân trên hình.** Chỉ rung khi có một
   vật va chạm, đóng dấu, hoặc chốt xuống mặt giấy trong khung.
4. **CẤM chữ dán nổi trên nền không liên quan.** Chữ phải nằm TRÊN mặt phẳng của
   hình vẽ, hoặc là nhãn của một đối tượng trong hình, hoặc được viết ra bởi
   chính đầu compa. Không có phụ đề.
5. **CẤM toán trang trí.** Không có "công thức ngẫu nhiên bay lơ lửng", không có
   ∫∑π rải rác cho "có vẻ toán". Mọi ký hiệu xuất hiện phải đúng ngữ cảnh của
   hình đang dựng.
6. **CẤM bloom phủ toàn màn.** Bloom chỉ cho màu gold — đầu compa và nét vừa
   được vẽ. Chữ trắng xương phải SẮC, không bao giờ nhoè.
7. **CẤM mascot mờ / chìm / bán trong suốt.** Xem mục Mascot integration.
8. **CẤM lens flare quét ngang, god rays, chromatic aberration** làm hiệu ứng
   "cho đẹp". Đây là bản vẽ hình học, không phải trailer game.
9. **CẤM cắt cảnh khi có thể biến hình.** Ngân sách: tối đa **3 cú cắt cứng**
   trong toàn bộ 26 giây (xem bảng Plates). Mọi chỗ còn lại là BIẾN HÌNH.

---

## Palette

Kế thừa bảng màu kênh, gán vai rõ ràng. Mỗi màu có đúng MỘT công việc.

| Tên | Mã | Vai trò — dùng ở ĐÚNG chỗ này, không chỗ khác |
|---|---|---|
| `navy` | `#05070f` | Nền. Mặt giấy vô tận. Không bao giờ có gradient trang trí trên nó |
| `gold` | `#d4a017` | **Đầu compa và nét nó vừa vẽ.** Màu của "cái đang được dựng" |
| `gold-hot` | `#ffc94d` | Lõi nóng của đầu compa + từ đang được hát. Màu duy nhất được phép > 0.85 linear (tức được bloom) |
| `teal` | `#2fe0d0` | **Màu của cái đã được chứng minh.** Nét gold sau khi hoàn tất một bước dựng sẽ NGUỘI về teal. Đây là ngữ pháp màu cốt lõi của video |
| `bone` | `#e8e4da` | Chữ, nhãn, ký hiệu. Luôn sắc, không bloom |
| `bone-dim` | `bone @ 34%` | Chữ chưa được hát; đường dựng phụ (construction lines) |

**Ngữ pháp màu — luật bất di bất dịch:**
```
gold-hot  →  đang vẽ, ngay lúc này
gold      →  vừa vẽ xong, còn nóng (nguội dần trong ~0.5s)
teal      →  đã dựng xong, đã đúng, là nền móng cho bước sau
bone-dim  →  đường phụ trợ, sẽ mờ đi khi không cần nữa
```
Khán giả không cần được giải thích luật này. Sau 3 lần lặp, họ tự hiểu:
vàng = đang làm, lam = đã xong. Đó chính là cảm giác "xây từ dưới lên".

---

## Typography

| Font | Vai | Dùng ở đâu |
|---|---|---|
| **Grotesk đậm, hẹp** (Archivo 700–900, width 75–100) | **Giọng lời hát.** Chữ to, chắc, tự tin | Các từ được hát: WHY, FROM SCRATCH, 99% |
| **Mono** (IBM Plex Mono 400–500) | **Giọng máy / nhãn kỹ thuật.** | "Loading", nhãn điểm `A` `B` `M`, toạ độ, chú thích nhỏ, `Q.E.D.` |
| **Serif nghiêng** (Cormorant italic) | **Giọng định lý.** Dùng RẤT hiếm — đúng 2 lần | Câu hỏi "Why does it work?" và dòng tagline cuối |
| **Nét đơn (single-stroke)** | Chữ do chính đầu compa **viết ra** | Bất cứ chỗ nào chữ được vẽ theo thời gian thực bởi đầu compa |

Luật bố cục:
- Kỷ luật lưới, bố cục bất đối xứng, nhiều khoảng trống. Không căn giữa tất cả.
- Nhãn mono luôn nhỏ, luôn nằm cạnh đối tượng nó gọi tên, có leader line mảnh
  nối tới đối tượng — như bản vẽ kỹ thuật.
- Không có chữ viền (outline), không có chữ đổ bóng loè, không có halo.
- Chữ nằm trong vùng an toàn ≥ 80px mỗi cạnh ở 1920×1080.

---

## Lyric sync rules

26 giây, 42 từ. **Mọi từ đều có chỗ đứng.** Không được có từ nào trôi qua mà
trên hình không có gì đánh dấu nó.

### Luật chung
1. **Đồng bộ theo TỪNG TỪ.** Một từ sáng lên (`bone-dim → bone` hoặc
   `bone → gold-hot`) đúng tại `start` của nó và hoàn tất trước `end`.
2. **Được phép báo trước, cấm chạy trước.** Có thể cho cả câu hiện mờ
   (`bone-dim`) sớm tối đa 0.4s. Nhưng phần sáng lên KHÔNG BAO GIỜ đi trước
   giọng hát.
3. **Chữ là một phần của hình.** Mỗi cảnh tích hợp lời theo cách KHÁC NHAU:
   được compa viết ra, là nhãn của điểm dựng, khắc trên trục đồ thị, đóng dấu
   lên giấy, xếp thành hàng của một lưới. Không cảnh nào lặp lại cách của cảnh
   trước.
4. **Mỗi từ được hát sẽ tạo ra MỘT sự kiện hình học.** Đây là luật quan trọng
   nhất và là thứ bản v2 thiếu hoàn toàn. Ví dụ: từ "question" → một dấu hỏi
   được dựng bằng cung tròn; từ "down" → cả hình rơi xuống một bậc; từ "turn" →
   đường thẳng quay thật; từ "ground" → một đường nằm ngang được kẻ và mọi thứ
   đáp xuống nó.
5. **Từ trọng âm rơi đúng beat.** Beat = 0.7598s, downbeat đầu 0.731s. Từ mang
   trọng âm của mỗi câu phải trùng downbeat gần nhất; nếu lệch > 0.1s thì dời
   HÌNH chứ không dời chữ.
6. **"From scratch!" là cú đóng dấu.** Đây là tên kênh, là cao trào, là thứ
   người xem phải nhớ. Nó được xử lý như một con dấu cao su đóng xuống giấy —
   có khối lượng, có tiếng, có rung, có vết mực.

### Bảng phân bổ từng từ

| t (s) | Lời | Sự kiện hình học |
|---|---|---|
| 0.0–2.6 | *Ninety-nine percent...* | Số 99 được đếm lên bởi đầu compa quay tròn |
| 2.6–5.4 | *Loading.* | Cung tròn khép lại còn 1% cuối, dừng |
| 5.4–6.6 | *Start with a* | Đầu compa chọc xuống — CHẤM đầu tiên |
| 6.6–7.4 | **question** | Dấu `?` được dựng bằng cung + đoạn thẳng |
| 7.4–8.5 | *break it* | Dấu `?` vỡ theo đường chéo |
| 8.5–9.43 | **down** | Các mảnh rơi xuống, xếp thành 3 dòng bậc thang |
| 9.43–10.4 | **Lines turn** | Đường thẳng quay thật quanh một điểm |
| 10.4–11.5 | **numbers move** | Chữ số trượt dọc trục, giá trị đổi |
| 11.5–13.47 | *watch it come around* | Đường quay hết 1 vòng, khép về vị trí đầu → thành hình tròn |
| 13.47–14.1 | **No tricks** | Đường phụ trợ SÁNG BỪNG lên thay vì bị xoá — không giấu gì |
| 14.1–14.7 | **no guessing** | Ba mũi tên đoán sai bị gạch chéo |
| 14.7–15.59 | *build it from the ground* | Đường nằm ngang được kẻ; mọi thứ đáp xuống nó |
| 15.59–17.25 | **Why does it work?** | Cả hình co lại thành một câu hỏi duy nhất trên nền tối |
| 17.25–18.1 | **From scratch!** (1) | CON DẤU đóng xuống |
| 18.1–20.77 | **From scratch!** (2) | Dấu thứ hai, to hơn, lệch góc |
| 20.77–24.81 | *chant / cao trào* | Lưới chứng minh nhân bản, mascot bước ra |
| 24.81–25.37 | *Ninety-nine percent... Loading.* | Vòng đếm quay lại, dừng ở 99% |
| 25.37–25.968 | *(im lặng)* | Chấm cuối. Đen. |

---

## Motifs

Năm mô-típ lặp lại, mỗi cái xuất hiện tối thiểu 3 lần.

### M1 — Đầu compa (the compass point)
Một chấm gold-hot đường kính ~6px với lõi trắng, kéo theo một nét gold dài
~40px đang nguội dần. Đây là NHÂN VẬT THỨ HAI của video. Nó xuất hiện ở
**mọi cảnh**. Quy tắc: nó không bao giờ tắt giữa chừng; khi cần biến mất, nó
phải đi vào một vật (chốt xuống thành tâm, chui vào dấu chấm, đóng thành con
dấu). Nó là thứ sáng nhất khung hình, luôn luôn.

### M2 — Ngữ pháp nguội (gold → teal)
Mọi nét vừa được vẽ đều gold-hot, nguội qua gold, rồi ổn định ở teal trong
khoảng 0.5s. Mắt khán giả đọc được ngay: chỗ nào vàng là đang làm, chỗ nào lam
là đã xong. Điều này biến một màn hình đầy đường nét thành một **tiến trình đọc
được**, chứ không phải một mớ rối.

### M3 — Đường dựng phụ (construction lines)
Các đường đứt nét mảnh `bone-dim` — đường nối tâm, bán kính, đường vuông góc
phụ. Chúng luôn được vẽ TRƯỚC kết quả, và mờ đi sau khi kết quả đã dựng xong.
Đây là mô-típ mang thông điệp "chúng tôi cho bạn xem cả phần nháp". Nó là hình
ảnh trực tiếp của triết lý kênh.

### M4 — Nhãn mono có leader line
Mỗi điểm/đoạn quan trọng được gọi tên bằng một nhãn mono nhỏ (`A`, `B`, `M`,
`r`, `⟂`, `Q.E.D.`) nối bằng một nét mảnh. Nó làm khung hình trông như một
trang sách hình học thật, và là cách chữ được tích hợp vào hình mà không thành
phụ đề.

### M5 — Số 99 và chấm cuối
Con số 99 (và 1% còn thiếu) là bookend của video. Nó mở bằng một vòng tròn đếm
lên 99%, đóng bằng chính vòng tròn đó dừng lại ở 99%, và dấu chấm cuối cùng của
video CHÍNH LÀ đầu compa đã chốt xuống. Video kết thúc ở đúng trạng thái nó bắt
đầu → nếu người xem xem lại, nó khớp liền.

---

## Plates (scene modules)

**Ngân sách cắt: 3 cú cắt cứng.** Đánh dấu ✂ trong bảng. Mọi chỗ khác là biến
hình liên tục.

| id | cửa sổ (s) | lời | một câu tóm tắt |
|---|---|---|---|
| `P1 dial` | 0.00–5.40 | Ninety-nine percent... Loading. | Compa quay một cung tròn đếm lên 99%, rồi kẹt |
| `P2 dot` | 5.40–7.40 | Start with a question, | Từ một chấm, dựng một dấu hỏi bằng cung tròn |
| `P3 break` | 7.40–9.43 | break it down. | Dấu hỏi vỡ theo đường chéo, mảnh rơi thành 3 bậc |
| `P4 rotate` | 9.43–13.47 | Lines turn, numbers move, watch it come around. | Đường thẳng quay quanh điểm, vẽ ra chính hình tròn |
| `P5 erase` | 13.47–15.59 | No tricks, no guessing, build it from the ground. | Đường phụ sáng bừng lên (không giấu gì), gạch bỏ các phỏng đoán, kẻ mặt đất |
| `P6 question` | 15.59–17.25 | Why does it work? | ✂ Tất cả co về một câu hỏi trên nền đen |
| `P7 stamp` | 17.25–20.77 | From scratch! From scratch! | ✂ Con dấu đóng xuống hai lần |
| `P8 lattice` | 20.77–24.81 | (chant / cao trào) | Lưới chứng minh nhân bản; mascot bước ra rõ nét |
| `P9 close` | 24.81–25.968 | Ninety-nine percent... Loading. / im lặng | ✂ Vòng đếm về 99%, chốt một chấm, đen |

---

### `P1 dial` — "Đồng hồ 99%" · 0.00 → 5.40s
**Lời:** *"Ninety-nine percent... Loading."* (giọng máy, không có bass)

**Ý tưởng thị giác:** Nền navy trống hoàn toàn. Một chấm gold-hot xuất hiện ở
tâm khung hình — **đầu compa chốt xuống**. Từ nó, một nét gold quay một **cung
tròn** theo chiều kim đồng hồ, như kim của một cái compa đang vạch. Cung chạy
được bao nhiêu phần trăm thì một **nhãn mono** bên cạnh đầu bút hiển thị đúng
phần trăm đó, tăng dần: `12%` → `47%` → `88%` → `99%`. Cung dừng lại ở 99% —
**thiếu đúng một đoạn nhỏ để khép kín vòng tròn.** Nét đã vẽ nguội từ gold sang
teal. Khoảng hở 1% đó nhấp nháy gold-hot, chờ. Chữ `Loading` mono nhỏ đứng dưới
tâm, dấu chấm lửng gõ từng cái theo nhịp.

**Vì sao khớp lời:** "Ninety-nine percent... Loading" — thanh loading của kênh
không phải một cái thanh chữ nhật, nó là **một vòng tròn chưa khép**. Và một
vòng tròn thiếu 1% thì chưa phải vòng tròn. Đó là toàn bộ luận điểm của kênh:
99% đã có, 1% cuối là chỗ bạn phải tự dựng.

**Biến hình vào cảnh sau:** Camera **dolly vào** khoảng hở 1%. Khi lại đủ gần,
khoảng hở đó chiếm cả khung hình, và cả vòng tròn đã trôi ra ngoài khung — chỉ
còn lại nền trống và đầu compa đang lơ lửng ở mép phải. Không cắt.

**Chữ:** `99%` là nhãn mono chạy theo đầu bút — nó LÀ một phần của dụng cụ đo.
`Loading` mono nhỏ, dấu chấm lửng gõ theo beat.

**Mascot:** Từ ~3.2s, ở góc dưới-trái, mascot pose `think` (chống cằm) **trượt
vào từ mép khung**, chiếm ~22% chiều cao khung. Anh ta nhìn cái vòng tròn chưa
khép. Ở 4.8s, khi cung dừng ở 99%, anh ta **nghiêng đầu** (rig 2 lớp, xoay đầu
~7°). Deadpan. Đọc rõ 100%, không mờ, không trong suốt, có vệt tối phía sau
tách khỏi nền.

---

### `P2 dot` — "Từ một chấm, dựng một câu hỏi" · 5.40 → 7.40s
**Lời:** *"Start with a question,"* — beat drop, bass vào

**Ý tưởng thị giác:** Đúng downbeat 5.47s (bar 3), đầu compa **chốt xuống** nền
trống: một chấm gold-hot duy nhất, có rung nhẹ khi chạm (rung CÓ lý do — có vật
chạm mặt giấy). Nhãn mono `A` hiện bên cạnh nó với leader line. Đó là tất cả
những gì ta có: một điểm, không hơn.

Rồi trên từ **"question"** (≈6.6s), đầu compa **dựng một dấu chấm hỏi bằng
đúng dựng hình hợp lệ**: nó vẽ một cung tròn lớn (phần đầu dấu hỏi), rồi một
cung nhỏ hơn tiếp tuyến (phần cong xuống), rồi một đoạn thẳng đứng ngắn, rồi
quay về chốt xuống tạo **chấm dưới của dấu hỏi — chính là điểm A ban đầu.**
Dấu hỏi cao gần hết khung, nét gold nguội dần sang teal khi từng đoạn hoàn tất.
Xung quanh nó là các **đường dựng phụ** `bone-dim` đứt nét: tâm các cung, bán
kính, đường tiếp tuyến — cho thấy dấu hỏi này được dựng chứ không phải vẽ tay.

**Vì sao khớp lời:** "Start with a question" — chữ "start" được minh hoạ bằng
một điểm khởi đầu theo nghĩa toán học chính xác nhất. Chữ "question" thành một
dấu hỏi được DỰNG, tức là: ngay cả câu hỏi cũng phải được xây từ nền móng.

**Biến hình từ P1:** Đầu compa đang lơ lửng ở mép phải sau cú dolly → nó bay
vào giữa khung và chốt xuống. Liên tục, không cắt.

**Chữ:** Các từ `Start` `with` `a` `question` được **viết bằng nét đơn bởi
chính đầu compa** ở góc trên-trái, từng từ một đúng theo `start` của nó, như
ghi chú bên lề bản vẽ. Từ `question` được viết xong đúng lúc dấu hỏi dựng xong.

**Mascot:** Pose `chalk` (cầm phấn), ở mép phải khung, chiếm ~30% chiều cao.
**Cánh tay cầm phấn của anh ta chỉ đúng vào đầu compa** — tạo ảo giác anh ta là
người đang vẽ. Khi dấu hỏi dựng xong, đầu anh ta hất lên (rig, ~5°).

---

### `P3 break` — "Bẻ nhỏ ra" · 7.40 → 9.43s
**Lời:** *"break it down."*

**Ý tưởng thị giác:** Trên từ **"break"** (≈7.5s), một **đường cắt** gold-hot
quét chéo qua dấu hỏi — và dấu hỏi **vỡ dọc theo đúng đường đó** thành 3 mảnh.
Không phải vỡ vụn ngẫu nhiên: 3 mảnh sạch sẽ, mép cắt thẳng, đúng như khi bạn
tách một bài toán thành ba phần. Trên từ **"down"** (≈8.5s), 3 mảnh **rơi
xuống** dưới trọng lực (ease `inQuad`, có nảy nhẹ) và **đáp vào 3 dòng của một
lưới nằm ngang** — ba dòng của một lời giải, mỗi dòng có số thứ tự mono `1.`
`2.` `3.` bên trái. Khi đáp xuống, mỗi mảnh **duỗi ra thành một dòng ký hiệu
toán thật** (ví dụ: `1. cho AB` / `2. dựng ⊙(A, AB)` / `3. ⊙(A) ∩ ⊙(B) = C`).
Cả ba dòng nguội về teal.

**Vì sao khớp lời:** "Break it down" theo nghĩa đen là bẻ nhỏ. Hình ảnh cho thấy
một câu hỏi lớn không bị đập nát, nó được **tách theo đúng chỗ tách được**, và
mỗi mảnh trở thành một bước giải. Đó chính xác là cách dạy toán từ đầu.

**Biến hình từ P2:** Không cắt. Dấu hỏi vẫn đứng đó, chỉ bị cắt và rơi.

**Chữ:** Từ `break` được viết bởi đầu compa và **chính nó bị đường cắt xẻ đôi**
— chữ và hình chịu cùng một số phận. Từ `down` rơi cùng các mảnh.

**Mascot:** Pose `point` (chỉ tay). Anh ta **chỉ vào đường cắt** ngay trước khi
nó quét qua — tạo cảm giác chính anh ta ra lệnh cắt. Sau khi 3 dòng đáp xuống,
đổi sang `shrug` nhẹ (kiểu "thì có thế thôi"). ~28% chiều cao khung, mép trái.

---

### `P4 rotate` — "Đường quay, số chạy, vòng khép" · 9.43 → 13.47s
**Lời:** *"Lines turn, numbers move, watch it come around."*

Đây là cảnh dài nhất (4s) và là **trái tim toán học của video**. Nó cần 3 động
tác nối liền nhau, không cắt.

**(a) "Lines turn" (9.43–10.4s):** Ba dòng lời giải ở P3 **dựng đứng dậy** và
gộp lại thành một **đoạn thẳng gold duy nhất** nằm ngang giữa khung, có hai nhãn
mono `A` và `B` ở hai đầu. Đúng trên từ **"turn"**, đoạn thẳng **quay thật**
quanh điểm A — góc quay đọc được nhờ một **cung góc** `bone-dim` với nhãn `θ`
tăng dần. Đây không phải hiệu ứng, đây là phép quay hình học có số đo.

**(b) "numbers move" (10.4–11.5s):** Khi đoạn quay, **toạ độ điểm B thay đổi
theo thời gian thực** — một cặp số mono `B(x, y)` bám theo B và các chữ số
trượt dọc như đồng hồ odometer: `B(4.00, 0.00)` → `B(2.83, 2.83)` →
`B(0.00, 4.00)`. Đồng thời một **trục toạ độ** `bone-dim` mảnh hiện lên dưới
hình để những con số đó có nghĩa. Khán giả thấy: hình quay thì số chạy — hình
học và đại số là một.

**(c) "watch it come around" (11.5–13.47s):** Đoạn thẳng tiếp tục quay **trọn
360°**, và **vệt của điểm B để lại một đường** — đường đó khép kín thành **một
hình tròn hoàn chỉnh**. Trên từ **"around"**, vòng tròn khép lại với một cú chớp
gold-hot ở chỗ khép, rồi cả vòng nguội về teal. Nhãn mono `⊙(A, AB)` hiện bên
cạnh. Camera lùi ra một chút để thấy trọn vòng tròn.

**Vì sao khớp lời:** Từng cụm từ có hình riêng. "Lines turn" = đường quay thật.
"Numbers move" = số thật sự chạy vì đường đang quay. "Come around" = quay hết
một vòng và trở về, đồng thời tạo ra hình tròn — vật thể mà cả video này cần.
Và nó **trả lời ngược lại P1**: ở P1 vòng tròn thiếu 1%; ở đây ta tự dựng được
một vòng tròn trọn vẹn, bằng chính tay mình.

**Biến hình:** liên tục, một động tác duy nhất kéo 4 giây, camera dolly nhẹ ra
xa trong suốt cảnh.

**Chữ:** Lời hát ở cảnh này **nằm trên chính đối tượng**: `LINES TURN` được đặt
dọc theo đoạn thẳng đang quay (text-on-path, chữ quay theo); `NUMBERS MOVE` là
chính cặp toạ độ đang chạy; `COME AROUND` được đặt theo cung tròn đang được vẽ,
mỗi từ hiện ra khi đầu bút chạy qua vị trí của nó.

**Mascot:** Lùi về góc dưới-phải, nhỏ hơn (~20%), pose `think`. Anh ta **quay
đầu theo chuyển động quay** của đoạn thẳng (rig xoay đầu, biên độ nhỏ, chậm).
Anh ta không che hình.

---

### `P5 erase` — "Không mẹo, không đoán, có mặt đất" · 13.47 → 15.59s
**Lời:** *"No tricks, no guessing, build it from the ground."*

**Ý tưởng thị giác:** Ba động tác ngắn, dứt khoát, mỗi cái rơi đúng beat.

**"No tricks" (13.47–14.1s):** Toàn bộ **đường dựng phụ** `bone-dim` trong
khung — mọi đường đứt nét, mọi tâm, mọi bán kính — **KHÔNG bị xoá đi mà sáng
bừng lên** thành bone đặc trong 0.2s rồi mờ về. Nghĩa: chúng tôi không giấu gì
cả, đây là toàn bộ phần nháp, mời xem. (Đây là phép đảo: người xem chờ nó biến
mất, nó lại lộ ra hết.)

**"no guessing" (14.1–14.7s):** Ba **mũi tên đứt nét** bắn ra từ vòng tròn về
ba hướng khác nhau — ba phỏng đoán. Từng cái **bị gạch chéo bằng một nét gold**
đúng theo 3 nhịp hạt (hat) liên tiếp, kèm nhãn mono nhỏ `?` bị đổi thành `✗`.
Chúng tan.

**"build it from the ground" (14.7–15.59s):** Một **đường nằm ngang** gold được
kẻ từ trái sang phải qua đáy khung — mặt đất. Trên từ **"ground"**, vòng tròn và
tất cả các đối tượng còn lại **rơi xuống và đáp lên đường đó**, nảy một cái,
đứng yên. Rung khung nhẹ đúng lúc chạm (rung CÓ lý do). Đường ngang nguội về
teal và có các vạch chia mono đều đặn — nó là một **trục số**.

**Vì sao khớp lời:** Ba câu là ba lời tuyên bố của kênh, và mỗi câu có một hành
động thị giác đối ứng chính xác. Đặc biệt "from the ground" = một đường thẳng
làm nền, đúng nghĩa đen lẫn nghĩa bóng.

**Biến hình:** liên tục từ P4, cùng một không gian.

**Chữ:** `NO TRICKS` `NO GUESSING` được **đóng như hai nhãn kiểm định** vào lề
phải khung (mono, có khung chữ nhật mảnh, như con dấu QC). `BUILD IT FROM THE
GROUND` được **khắc dọc theo chính đường ngang** vừa kẻ — chữ nằm trên trục số.

**Mascot:** Bước lên phía trước, to hơn (~32%), pose `chalk`. Khi đường ngang
được kẻ, **tay cầm phấn của anh ta di chuyển đồng tốc với đầu bút** — anh ta
đang kẻ cái đường đó. Đây là khoảnh khắc mascot rõ nhất cho tới lúc này.

---

### `P6 question` — "Câu hỏi" · 15.59 → 17.25s ✂
**Lời:** *"Why does it work?"* — breakdown, năng lượng tụt

**Ý tưởng thị giác:** ✂ **Cắt cứng đầu tiên**, đúng 15.59s. Tất cả biến mất.
Nền navy gần như đen tuyệt đối. Ở giữa khung, một dòng chữ **serif nghiêng**,
bone, cỡ vừa phải — không to, không gào:

> *Why does it work?*

Chữ này KHÔNG bay, KHÔNG rung, KHÔNG có hiệu ứng. Nó đứng yên. Đây là 1.7 giây
duy nhất trong cả video mà mọi thứ đứng im — và chính vì thế nó là khoảnh khắc
mạnh nhất. (Đối lập với video mẫu: giá trị của im lặng chỉ tồn tại khi mọi thứ
xung quanh nó đang chạy.)

Thứ duy nhất chuyển động: **đầu compa** vẫn ở đó, lơ lửng bên phải chữ, nhấp
nháy chậm như con trỏ văn bản đang chờ. Ở 16.9s nó **bắt đầu lùi lại lấy đà**
(kéo ra xa khỏi mặt giấy) — báo hiệu cú đóng dấu sắp tới.

**Vì sao khớp lời:** Đây là câu hỏi cốt lõi của kênh, câu mà toàn bộ triết lý
"hiểu bản chất chứ không học thuộc" xoay quanh. Nó xứng đáng có riêng một khung
hình sạch. Và nhạc đang tụt xuống — hình cũng phải tụt xuống.

**Vì sao được phép cắt:** Năng lượng nhạc tụt 3.8dB tại đây. Cắt cứng là cách
duy nhất khớp được cú tụt đó. Biến hình sẽ làm mềm mất cú tụt.

**Chữ:** Chữ LÀ cảnh. Bốn từ hiện lần lượt theo `start` từng từ, dấu `?` hiện
cuối cùng.

**Mascot:** Ở 16.4s, mascot **bước vào từ mép trái**, pose `shrug` (nhún vai),
KHÔNG che chữ — anh ta đứng thấp bên trái, chiếm ~26%. Nhún vai ở đây nghĩa là:
"ừ, đấy mới là câu hỏi đúng." Anh ta đứng cùng phía với người xem trước câu hỏi
khó. **Đây là pose đắt nhất của cả video.**

---

### `P7 stamp` — "Con dấu" · 17.25 → 20.77s ✂
**Lời:** *"From scratch! From scratch!"* — BEAT DROP, mạnh nhất bài

**Ý tưởng thị giác:** ✂ **Cắt cứng thứ hai**, đúng 17.25s cùng cú drop.

Đầu compa, đã lùi lấy đà, **lao xuống mặt giấy và ĐÓNG XUỐNG** như một con dấu
cao su. Tại điểm chạm: một **vòng sóng xung kích** teal lan ra, khung rung mạnh
(có lý do — vừa có vật đóng xuống), và tại chỗ đó hiện ra chữ:

> **FROM SCRATCH**

— nhưng không phải chữ in bình thường. Nó là **vết compa cào trên giấy**: chữ
được tạo bởi những **nét gạch chéo song song** (hatching) như khi bạn cào một
mũi kim loại lên bề mặt, mép chữ hơi xước, hơi lệch, có vệt mực gold đậm nhạt
không đều. Chữ NGHIÊNG khoảng 3°, như con dấu đóng vội.

**Lần thứ hai (18.1s hoặc downbeat gần nhất):** Con dấu đóng lần nữa, **to hơn,
lệch góc ngược lại (−4°), đè chồng lên dấu thứ nhất**, bằng màu gold-hot. Hai
lớp chữ chồng nhau tạo một khối chắc nịch. Khung rung lần hai, mạnh hơn.

Sau đó (18.6–20.77s), **từ mỗi nét gạch chéo của con dấu, một đường dựng mọc
ra** — các nét gạch kéo dài ra ngoài chữ, biến thành các đường của một hình
dựng mới, lan ra khắp khung. Con dấu không đứng yên chờ hết đoạn: nó **nảy mầm**
thành cảnh sau.

**Vì sao khớp lời:** "From scratch" — "scratch" là vết cào. Chữ được làm bằng
chính vết cào. Đây là cú chơi chữ hình ảnh, và nó chỉ hoạt động vì cả video đã
xây dựng hình ảnh "mũi compa cào trên giấy" từ giây thứ 0.

**Vì sao được phép cắt:** Drop mạnh nhất bài (+5.9dB). Phải cắt.

**Chữ:** Chữ LÀ con dấu, con dấu LÀ cảnh. Không có chữ nào khác trên khung.

**Mascot:** **Đây là khoảnh khắc mascot phải rõ nhất cả video.** Từ 17.25s,
mascot chuyển sang **PNG đặc (không mosaic, không hạt)**, pose `thumb` (giơ
ngón cái), chiếm **~40% chiều cao khung**, đứng bên phải con dấu, có **viền
navy đậm dày 4px** quanh toàn bộ silhouette để tách tuyệt đối khỏi nền. Anh ta
**nảy lên đúng mỗi cú đóng dấu** (2 lần, offset ~14px, ease `outBack`). Từ
19.5s, một **vệt sáng gold quét chéo qua người anh ta** một lần — làm nhân vật
"thuộc về" thế giới sáng chứ không phải sticker dán lên.

---

### `P8 lattice` — "Lưới chứng minh" · 20.77 → 24.81s
**Lời:** *(chant tiếp / cao trào nhạc — không có lời mới)*

**Ý tưởng thị giác:** Các đường mọc ra từ con dấu **tự nhân bản theo nhịp**:
mỗi beat (0.7598s), cấu hình hiện tại được **sao chép và phản chiếu**, tạo ra
một **lưới dựng hình lan rộng** — giống cách một dựng hình Euclid cơ bản (dựng
tam giác đều từ hai cung tròn) khi lặp lại sẽ tự sinh ra lưới tam giác đều, rồi
lục giác, rồi hoa thị. Đây là hình học thật, không phải fractal trang trí:
**⊙(A,AB) ∩ ⊙(B,AB) → tam giác đều → lưới tam giác → lưới lục giác.**

5 beat trong 4 giây, mỗi beat một bậc nhân bản:
- beat 1 (20.8s): 1 tam giác đều
- beat 2 (21.5s): 6 tam giác → 1 lục giác
- beat 3 (22.3s): lục giác lát kín một vùng
- beat 4 (23.1s): lưới lan ra hết khung, camera **dolly lùi** để chứa
- beat 5 (23.8s): lưới trở thành một **mặt phẳng 3D nghiêng** trải tới chân
  trời — đây là chỗ duy nhất trong video có không gian sâu 3D, và nó đến từ
  một dựng hình có thật

Toàn bộ lưới **nguội dần về teal** theo làn sóng lan từ tâm ra. Ở 24.3s, một
nhãn mono nhỏ `Q.E.D.` hiện ở góc dưới-phải lưới — khiêm tốn, không phô trương.

**Vì sao khớp (không có lời):** Đoạn này nhạc lên cao trào không lời, nên hình
phải là chỗ **trả bài**: từ một điểm ở giây thứ 5, ta đã dựng ra cả một mặt
phẳng lát kín. "From scratch" đã được chứng minh bằng hình chứ không bằng chữ.

**Biến hình:** liên tục từ P7, cùng một hệ đường.

**Chữ:** Chỉ có `Q.E.D.` mono nhỏ. Cảnh này để hình nói.

**Mascot:** Vẫn PNG đặc, ~36%, nhưng giờ **bước đi trên mặt lưới 3D** — chân
anh ta đặt trên các nút lưới, có bóng đổ mềm xuống lưới. Ở 23.5s anh ta **quay
đầu về phía camera** (rig 2 lớp) và giữ nguyên. Từ 24.0s anh ta **thở** (rig,
biên độ 3px, chu kỳ 2s) — nhân vật sống, không phải hình dán.

---

### `P9 close` — "Chốt" · 24.81 → 25.968s ✂
**Lời:** *"Ninety-nine percent... Loading."* rồi HARD STOP

**Ý tưởng thị giác:** ✂ **Cắt cứng thứ ba** tại 24.81s — nhưng là cắt **VÀO**,
không phải cắt ra: camera **lao vút vào một nút lưới duy nhất** (zoom cực nhanh
trong 0.25s), và nút đó hoá ra chính là **vòng tròn 99% của P1** — vẫn thiếu
đúng 1%.

Ở 25.1s, đầu compa quay nốt **1% cuối cùng** và **khép vòng tròn lại.** Vòng
tròn hoàn tất, chớp gold-hot một lần, nguội toàn bộ về teal. Nhãn mono đổi
`99%` → `100%` trong đúng 1 frame.

Tại 25.37s (HARD STOP): **tất cả tắt cùng lúc**, trừ **một chấm gold duy nhất**
ở tâm — đầu compa. Nó đứng đó 0.4s trên nền đen tuyệt đối. Rồi ở 25.9s nó tắt.
Đen.

**Vì sao khớp lời:** Video mở bằng "99%... Loading" và đóng bằng đúng câu đó.
Nhưng lần này nó KHÔNG còn loading nữa — nó đã đóng được vòng. Bài hát kết thúc
đột ngột, hình cũng phải kết thúc đột ngột. Chấm cuối cùng còn lại chính là thứ
đầu tiên xuất hiện ở giây 0 → video khép kín như chính vòng tròn nó vừa dựng.

**Chữ:** `100%` mono, 1 frame duy nhất, rồi tắt. Không có end card, không có
logo bay vào. Kênh đã được nêu tên ở P7 bằng con dấu; lặp lại là thừa.

**Mascot:** Ở 24.81s mascot **ở lại phía sau** khi camera lao vào — anh ta ra
khỏi khung một cách tự nhiên, không bị "tắt". Anh ta không xuất hiện ở cú hard
stop: khoảnh khắc cuối thuộc về cái chấm.

---

## Mascot integration

Đây là lỗi bị khách hàng nêu đích danh: *"nhân vật thì cũng không được in lên."*
Sửa bằng các luật SỐ, không bằng "làm rõ hơn".

### Luật bắt buộc

1. **Kích thước tối thiểu:** mascot không bao giờ nhỏ hơn **20% chiều cao
   khung** (216px ở 1080p). Ở các cảnh cao trào (P5, P7, P8) tối thiểu **32%**.
   Ở P7 là **40%**.
2. **Thời lượng có mặt:** mascot xuất hiện ở **8/9 cảnh** (vắng mặt duy nhất ở
   0.6s cuối của P9). Tổng thời gian có mặt ≥ **21/26 giây**.
3. **Độ mờ:** alpha của mascot **luôn ≥ 0.92**. Không có ngoại lệ. Không bao giờ
   có mascot bán trong suốt.
4. **Tách nền bắt buộc** — dùng CẢ HAI cơ chế:
   - **Viền**: một viền navy đậm (`#05070f`) dày 3–4px quanh toàn bộ silhouette
   - **Bóng**: một vệt tối blur 26px phía sau khối nhân vật
   Lý do: nền của video là các đường gold/teal sáng; nhân vật màu olive + kem sẽ
   chìm nếu chỉ dán lên.
5. **Cấm dùng gold làm màu chủ đạo của nhân vật.** Áo olive `#5A6B4D`, da kem
   `#F5DFA8`, tóc đen `#2E2E2E` — giữ nguyên bảng màu nhân vật gốc. Nhân vật
   phải KHÁC màu với thế giới, đó là cách anh ta nổi lên.
6. **Nhân vật không bao giờ che đối tượng hình học chính.** Anh ta đứng ở lề,
   ở góc, hoặc phía sau — nhưng luôn ở vị trí có thể đọc rõ toàn bộ silhouette.
7. **Ăng-ten tóc phải luôn đọc được.** Đây là dấu nhận dạng mạnh nhất của nhân
   vật (theo `CHARACTER.md`). Không bao giờ để nó bị cắt bởi mép khung hay bị
   một đường sáng chồng lên.

### Chất liệu theo cảnh

| Cảnh | Chất liệu | Lý do |
|---|---|---|
| P1 | PNG `think` | Vào nhẹ, đọc rõ ngay từ đầu |
| P2 | PNG `chalk` (rig) | Tay cầm phấn phải khớp đầu compa |
| P3 | PNG `point` → `shrug` | Hai pose, chuyển trên beat |
| P4 | PNG `think` (rig xoay đầu) | Nhỏ hơn, để hình học là chính |
| P5 | PNG `chalk` (rig) | Anh ta kẻ đường mặt đất |
| P6 | PNG `shrug` | Khoảnh khắc đắt nhất — phải sắc nét tuyệt đối |
| P7 | **PNG đặc `thumb`, 40%** | Cao trào — rõ nhất cả video |
| P8 | PNG `thumb` → rig thở, đi trên lưới | Nhân vật sống |
| P9 | — | Ra khỏi khung tự nhiên |

**Ghi chú về mosaic:** Kỹ thuật text-mosaic (`MOSAIC.md`) là một công cụ đẹp,
nhưng ở bản này **không dùng cho mascot** — vì nó chính là thứ làm nhân vật
chìm đi ở v2. Nếu muốn dùng, chỉ dùng cho **bóng đổ của mascot lên mặt lưới 3D
ở P8** (bóng làm bằng ký hiệu toán thưa) — chỗ đó nó là một chi tiết, không
phải là cách thể hiện nhân vật.

### Rig
Dùng `assets/character/rig/` (`chalk-head` + `chalk-body`, điểm xoay `(300,430)`,
mép cổ `y=415`, chồng lấn 35px). Các động tác đầu (nghiêng ở P1, hất lên ở P2,
quay theo ở P4, quay về camera ở P8) đều nằm trong biên độ ±10° — quá hơn sẽ
hở cổ.

---

## Technical conventions

Ánh xạ từng ý tưởng thị giác sang kỹ thuật đã được xác minh. Không có mục nào
vượt quá năng lực đã liệt kê (three.js 0.180 + WebGL2, 150k điểm @ 8.83ms,
multi-pass bloom, morph point-cloud, Canvas 2D overlay).

### Phân lớp (giữ nguyên nguyên tắc từ `REFERENCE-TEARDOWN.md` mục 5)

```
lớp 5  nhãn mono nhỏ, Q.E.D., toạ độ       ← Canvas 2D, đứng yên
lớp 4  LỜI HÁT                              ← Canvas 2D, đứng yên hoặc trôi rất chậm
lớp 3  MASCOT (PNG + viền + bóng)           ← Canvas 2D, chuyển động vừa
lớp 2  đầu compa + nét đang vẽ (gold-hot)   ← LineBatch additive, luôn trên cùng của lớp hình
lớp 1  hình học đã dựng (teal) + lưới 3D    ← LineBatch 3D / point-cloud
lớp 0  nền navy + bloom chỉ trên gold       ← FSPass
```

### Ánh xạ ý tưởng → kỹ thuật

| Ý tưởng thị giác | Kỹ thuật |
|---|---|
| Đầu compa + nét kéo theo | `LineBatch` 2D additive, một capsule segment cho lõi + polyline cho vệt. Màu linear > 1.0 để ăn bloom. Đây là thứ DUY NHẤT được vượt 0.85 linear |
| Cung tròn được vẽ dần | Polyline sinh theo tham số `θ ∈ [0, θ(t)]`. Hàm thuần của `t`, không state |
| Ngữ pháp nguội gold→teal | Mỗi segment mang `birthTime`; màu = `mix(GOLD_HOT, TEAL, smoothstep(0, 0.5, t − birthTime))`. Một phép nội suy trong vertex shader, chi phí bằng 0 |
| Dấu hỏi vỡ 3 mảnh | 3 polyline con, mỗi cái có ma trận biến đổi riêng theo `t`. Không cần physics — chỉ ease `inQuad` + nảy |
| Đường thẳng quay + toạ độ chạy | Phép quay 2D thuần. Toạ độ B tính trực tiếp từ `θ(t)`, render bằng Canvas 2D mono. Odometer chữ số = dịch dọc + clip |
| Vết điểm B → hình tròn | Chính là polyline của cung tròn ở trên, cộng thêm `LineBatch` cho đoạn đang quay |
| Con dấu "FROM SCRATCH" bằng nét cào | `textPoints()` / `textPathCommands` lấy outline chữ → clip một chùm **đường gạch chéo song song** vào trong outline. Mỗi nét gạch là một segment của `LineBatch`. Độ lệch mép = nhiễu seed theo `hash(i)`, KHÔNG theo `t` (tất định) |
| Sóng xung kích khi đóng dấu | `FSPass` một vòng tròn lan ra, alpha giảm theo bán kính. Rẻ |
| Lưới tam giác/lục giác nhân bản | Sinh tất định từ công thức lưới tam giác đều. Ở bậc cao nhất (~beat 5) ước tính **≤ 40k segment** — dưới xa ngân sách 150k điểm |
| Mặt phẳng 3D nghiêng tới chân trời | `LineBatch` chế độ 3D với `PerspectiveCamera`. Lưới đã có sẵn ở 2D, chỉ đổi ma trận chiếu → đây là **biến hình**, không phải cảnh mới |
| Chữ nằm trên đường cong (text-on-path) | Canvas 2D: `polylineLengths` + `pointAtLength` để đặt từng glyph, xoay theo tiếp tuyến |
| Chữ được compa viết ra | `stroke.ts` single-stroke font + `writtenLength(st, charTimes, t)` đồng bộ theo `start`/`end` của từng từ |
| Mascot + viền + bóng | Canvas 2D `Layer2D`. Viền: vẽ PNG 8 lần offset theo 8 hướng bằng `navy` rồi vẽ bản gốc đè lên. Bóng: `shadowBlur = 26` + `shadowColor = navy` |
| Mascot rig xoay đầu / thở | Hai `drawImage` từ `chalk-head.png` / `chalk-body.png`, xoay đầu quanh `(300,430)`, offset thân theo `sin(2πt/2)` |
| Vệt sáng quét qua mascot ở P7 | Một gradient tuyến tính gold, `globalCompositeOperation = 'lighter'`, clip bằng alpha của PNG. Đúng 1 lần, 0.4s |
| Camera dolly / zoom | Tất cả là hàm của `t`: scale + offset cho `LineBatch` 2D, hoặc vị trí camera cho 3D |
| Rung khung (chỉ P5, P7) | `post.shake: [x, y]` với biên độ giảm theo `exp(−k·(t−t0))`. Chỉ tại 3 thời điểm có va chạm trên hình |
| Bloom | Chỉ ngưỡng đủ cao để **chỉ gold-hot vượt qua**. `bloomThreshold` đặt sao cho teal và bone KHÔNG bloom. Chữ bone phải sắc |

### Luật tất định (bắt buộc)
- Mọi thứ là hàm thuần của `t`. Không `Math.random`, không `Date.now`,
  không `performance.now`.
- Nhiễu (độ lệch mép con dấu, độ rung nhẹ của nét vẽ tay) dùng `hash(i)` theo
  chỉ số, hoặc `frameIdx(t)` nếu cần đổi theo frame — **không bao giờ** dùng
  `t` liên tục làm seed cho nhiễu nhấp nháy.
- Không scene nào cần `stateful = true`. Toàn bộ video render được ở bất kỳ
  thứ tự frame nào.

### Ngân sách hiệu năng
| Cảnh | Ước tính segment/điểm | Ghi chú |
|---|---|---|
| P1 | < 2k | Một cung tròn |
| P2 | < 5k | Dấu hỏi + đường phụ |
| P3 | < 6k | 3 mảnh + 3 dòng chữ |
| P4 | < 8k | Vòng tròn + trục + đoạn quay |
| P5 | < 10k | Thêm trục số |
| P6 | < 1k | Gần như trống |
| P7 | ~25k | Hatching của con dấu là chỗ tốn nhất |
| P8 | ~40k | Lưới ở bậc cao nhất |
| P9 | < 3k | Quay về một vòng tròn |

Đỉnh ~40k, cách xa ngân sách 150k. Có dư địa cho supersampling và motion blur.

---

## Kiểm tra trước khi coi là xong

Với MỖI cảnh, trả lời bằng CÓ/KHÔNG. Một chữ KHÔNG là cảnh chưa xong.

1. Tắt tiếng đi, người xem có hiểu cảnh này nói gì không?
2. Mọi vật thể trong khung có được DỰNG ra từ thứ có trước nó không, hay có cái
   nào tự nhiên hiện ra?
3. Có bất kỳ hạt nào không thuộc về một vật cụ thể gọi tên được không?
4. Mascot có chiếm ≥ 20% chiều cao khung và alpha ≥ 0.92 không?
5. Mọi từ trong lời hát thuộc cảnh này có một sự kiện hình học tương ứng không?
6. Có cú rung/chớp nào không có nguyên nhân nhìn thấy được trên hình không?
7. Chữ có nằm trên mặt phẳng của hình, hay đang nổi lơ lửng như phụ đề?
8. Nội dung toán học trong cảnh có đúng không, hay chỉ là ký hiệu trang trí?
9. Chuyển sang cảnh sau là BIẾN HÌNH hay CẮT? Nếu cắt, nó có nằm trong ngân
   sách 3 cú cắt không?
