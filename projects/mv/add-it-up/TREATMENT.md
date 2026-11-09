# "Add It Up" — tích phân = cộng dồn — treatment & style bible

Bài: Suno, **233.20s**, **97 BPM** (tin cậy 5.31×, beat 0.6186s, downbeat đầu 0.155s, mỗi ô nhịp 2.474s).
Chỉ 22% từ rơi gần beat, nên **chữ bám lời, nền bám stem**.

Dữ liệu:
- Mốc từng câu: `data/timeline.json` / `timeline.txt`. Lời gốc được ghép với mốc whisper, đối chiếu CTC trên lead
  vocal Suno và đường bao giọng dải 300–3400Hz; 10 câu phân xử tay có lý do trong `data/overrides.json`.
- Hoạt động của 10 stem Suno: `data/stems.json`.
- Mọi mốc dưới đây lấy từ đó. **Không gõ số tay trong code**: mốc lời tra bằng `tl.at()`, mốc nhạc cụ là hằng số
  kèm nguồn.

Khung 1920×1080, 60fps. Khung phong cách: `styleframes.jpg` (`tools/lab/riso.html`).

---

## 1. Đọc bài — bài nói gì, theo thứ tự nào

Bài là một **bài giảng tích phân trọn vẹn**, đi từ mất mát tới lời giải:

| đoạn | ý toán | câu chốt |
|---|---|---|
| Intro | hai thứ cùng thay đổi như nhau nhưng khác điểm xuất phát → **ta đã mất gì?** | "What did we lose?" |
| Verse 1 | hai xe cùng tốc độ, đồng hồ quãng đường 12 và 112. Đạo hàm **xoá mất hằng số**; đi ngược thì ra **cả một họ** F(x) + C | "F of x plus C, that's the missing memory" |
| Pre 1 | tốc độ quên điểm bắt đầu, nhưng có lẽ ta **chỉ cần phần thay đổi** | "all we need is the change we can see" |
| Chorus | cộng từng mảnh; đầu trừ cuối; hằng số phai đi. Tốc độ → lượng, chiều cao → diện tích. **Cùng một cỗ máy, khác đầu vào** | "Same machine. Different input." |
| Verse 2 | bồn nước với lưu lượng 3t². Một hình chữ nhật thì sai; cắt 2, 4, 8 dải… → **tổng Riemann hội tụ**, bậc thang thành đường cong | "the staircase and the curve begin to look the same" |
| Pre 2 | không khoảnh khắc nào kể được toàn bộ; gom mọi thay đổi thành tổng | "accumulation is the key" |
| Break | **định lý cơ bản**: F(b) − F(a); C bên trái trừ C bên phải → **mất**. Nhạc im hẳn | "The family becomes one number." |
| Beat switch | diện tích dưới đường cong bằng dải; **thể tích bằng lát cắt**. Chiều cao → diện tích → thể tích; cỗ máy không đổi | "Only what we chose to feed it." |
| Bridge | ba câu song song; nước, khối lượng, năng lượng: **khác chuyện, chung máy** | "Same machinery." |
| Final chorus | quên điểm đầu, tìm lại họ, giải phóng phần thay đổi; **cùng một ý bên dưới** | "Same idea underneath." |
| Kết | "Why does it work?" → FROM SCRATCH ×4 → Reverse · Add · Slice · See → 99% Loading → **dừng cứng** | "now you know." |

Ba điệp ngữ lặp lại suốt bài, và hình phải giữ ba vật tương ứng sống từ đầu đến cuối:
- **machine** ×7 → cỗ máy ∫;
- **piece** ×12 → dải giấy;
- **family / C** ×5 → bản in lệch khuôn và màu vàng.

Ví dụ số xuyên suốt, để toán trên hình **nối với nhau** thay vì mỗi cảnh một ví dụ:
- **bồn 3t² trên [0, 2]**: ∫₀² 3t² dt = 2³ − 0³ = **8**. Đây là bồn của Verse 2, là số "8" của Break, là
  F(t) = t³ + C;
- **đường cong √x trên [0, 4]**: diện tích **16/3**; quay quanh trục thì ra khối với thể tích ∫₀⁴ πx dx = **8π**.
  Đây là Beat switch. Hai số 8 và 8π vọng nhau đúng ý "same machine";
- **tổng Riemann phải** của 3t² trên [0, 2]: n = 1 → 24 · 2 → 15 · 4 → 11.25 · 8 → 9.5625 · 16 → 8.766 ·
  32 → 8.379 · 64 → 8.189 → **8**.

---

## 2. Ý tưởng trong một đoạn

**Xưởng in riso.** MV là một tập zine in riso đang được in ngay trước mắt.

- **Cộng dồn chính là in:** mỗi lượt máy in thêm một lớp mực, và hình chỉ hiện đủ khi mọi lớp đã cộng vào.
- **Cỗ máy:** máy in có **đường giấy hình ∫**. ∫ là chữ S kéo dài của Leibniz, nghĩa là *summa* (tổng): một sự
  thật lịch sử, khán giả học được ngay. Dải hồng (tốc độ, chiều cao) vào khe trên, chạy dọc chữ S, chồng lên khay
  dưới thành khối xanh (tổng). Cỗ máy không đổi suốt bài; chỉ tấm thẻ nạp vào đổi (tốc độ → chiều cao → lát cắt
  → nước → khối lượng → năng lượng).
- **Hằng số C:** họ F + C là **cùng một bản khắc in lệch khuôn theo chiều dọc**. Trong in ấn, lệch khuôn là
  "lỗi"; ở đây nó là toán thật: cùng độ dốc, khác độ cao. C in bằng mực vàng, thứ mực gần như không thấy trên
  giấy, như một ký ức đã phai. Ở Break, C trái trừ C phải và lớp vàng biến mất.
- **Nhân vật:** chính cậu ấy đã đeo câu trả lời từ đầu: **mặt dây chuyền "+C"** có trong MỌI ảnh của nhân vật.
  "That's the missing memory" là lúc cậu cầm nó lên.

### Vì sao mô-típ này (đọc trước khi phản đối)

1. **Khác hẳn exp-log, có chủ đích.** exp-log là đêm navy, ánh sáng phát quang, ký hiệu vỡ, gương. Bài này là
   ban ngày, giấy, mực, tay nghề in. Cùng nhân vật, cùng kênh, nhưng là một ấn phẩm khác.
2. **Chất liệu NÓI được ý toán, không chỉ để đẹp:**
   - chồng lớp = tích luỹ;
   - lệch khuôn dọc = + C;
   - dao xén = chia nhỏ dx;
   - tram (chấm to nhỏ) = sắc độ như một đại lượng;
   - lượt key cuối = "the key".
3. **Lời tự gọi tên chất liệu:** "piece by piece", "strips", "cut it thin", "slice", "machine", "feed it",
   "underneath".
4. **Tắt tiếng vẫn hiểu:** dải hồng đi vào, khối xanh lớn lên; bản in lệch thì cùng dốc khác cao; hai mảng vàng
   chồng nhau thì biến mất.

---

## 3. Tone

Tỉnh táo, tay nghề, ấm. Điệp khúc là poster rực huỳnh quang; đoạn rap là bản vẽ kỹ thuật trên giấy; đoạn nói
(Break) là máy chữ.

Mọi hiệu ứng mạnh phải là **một thao tác in hoặc thao tác toán đang xảy ra**:
- in một lượt, lệch khuôn, xén, nạp giấy, chồng lớp;
- cộng, trừ, quay, cắt lát.

### Danh sách CẤM

1. Glow, bloom, neon, lens flare, hạt lấp lánh, nền tối vũ trụ, CRT, chữ/ảnh vỡ thành ký hiệu, gương: đó là ngôn
   ngữ của exp-log.
2. **Alpha để làm sắc độ.** Riso không có mực trong suốt: sắc nhạt = **tram** (chấm thưa). Ngoại lệ duy nhất: lớp
   vàng C được phai đúng câu "let the constant fade away" (lời nói đúng điều đó).
3. Màu ngoài 4 mực. Màu thứ 5 trở đi chỉ được sinh ra từ in chồng.
4. Gradient mượt, bóng đổ mờ, ánh sáng 3D. 3D chỉ được làm bằng **chồng giấy phẳng**.
5. Mực in dưới áo nhân vật: nhân vật luôn có phần đục lỗ (giấy), tóc và áo thun là key.
6. Chữ fade. Chữ vào bằng lượt in, ra bằng dao xén.
7. Công thức trang trí. Ký hiệu nào trên hình cũng là của cảnh đó, và đúng toán (có test).
8. Cắt cứng ngoài danh sách § Nhịp.
9. Nhân vật ngoài 7 chỗ ở § Nhân vật.
10. Nền trắng tinh hoặc đen tuyền. Nền luôn là giấy, hoặc một mực phủ toàn khổ.

---

## 4. Bảng màu — 4 mực + giấy (in chồng = multiply)

| vai | mực | dùng cho |
|---|---|---|
| giấy | `#F2EDE4` + hạt giấy (sinh từ `hash`) | nền mọi cảnh |
| **thay đổi / tốc độ / đầu vào** | hồng huỳnh quang `#FF48B0` | dải chiều cao, đường đạo hàm, thẻ nạp, đồng hồ tốc độ |
| **tích luỹ / tổng** | xanh `#0078BF` | F(x), mực trong bồn, diện tích, chồng đĩa, khay ra |
| **hằng số C / ký ức mất** | vàng `#FFE800` | +C, độ lệch khuôn, điểm xuất phát, 1% còn thiếu |
| **key** | `#1F1D24` | chữ, trục, nét, tóc/áo thun nhân vật |
| hồng + xanh | ≈ `#001E75` (tự sinh) | chỗ tốc độ gặp lượng: dải đã vào máy |
| hồng + vàng | ≈ `#F23C00` (tự sinh) | **sai lệch**: phần hình chữ nhật thừa ("won't get it right") |
| xanh + vàng | ≈ `#006500` (tự sinh) | F + C khi C còn |

Tương phản đo được:

| cặp | tỉ số |
|---|---|
| key/giấy | 14.3 |
| xanh/giấy | 4.1 |
| hồng/giấy | 2.65 (chỉ dùng cho mảng lớn, không cho chữ nhỏ) |
| vàng/giấy | 1.07 (cố ý: C mờ) |
| key/vàng | 11.5 (băng lời) |
| key/hồng | 4.8 |
| giấy/xanh phủ | 4.7 |

Góc tram theo máy riso thật: hồng 75°, xanh 15°, vàng 0°, key 45°.

## 5. Chữ — ba giọng, ba mặt chữ

| giọng (tag lời gốc) | mặt chữ | hiện | đặt |
|---|---|---|---|
| **rap** (Verse 1–2, Beat switch, Hook) | Archivo Condensed 800, IN HOA | in vào: lớp vàng nền băng → chữ key lệch 14px khớp lại trong 0.12s | **băng giấy** nghiêng −2° góc dưới-trái, mỗi câu một băng |
| **hát** (Pre, Chorus, Bridge) | Cormorant Garamond nghiêng 600 | in key, có bóng lệch một mực (hồng hoặc vàng) | to, đặt như tít poster, theo bố cục cảnh |
| **nói** (Intro, Break, "Why does it work?", 99% Loading) | IBM Plex Mono | gõ từng ký tự như máy chữ | dòng đơn, giữa khung hoặc trên thẻ |

- Lời **luôn** đọc được: chữ là key, nằm trên giấy, vàng hoặc hồng (tỉ số ≥ 4.8).
- Sang câu mới thì dòng cũ bị **dao xén** cắt thành 5–7 dải ngang trượt lệch nhau ra khỏi khung trong 0.25s.
  Không fade.
- **Bè (backing vocals)** 54–56 · 62–71 · 101–114 · 188–196 · 203–218: in lại lời hát dưới dạng chữ rỗng
  (stroke) mực hồng lệch khuôn, như bản in thử.
- Chữ làm vật thể:
  - "ADD IT UP" dựng từ dải dọc lệch nhau, khớp dần (P09, P13, P20);
  - "+C" vàng khổng lồ (P07);
  - tem "FROM SCRATCH!" (P22);
  - ba từ "DERIVATIVE · INTEGRAL · GEOMETRY" (P23).

## 6. Nhịp & chuyển cảnh

- Hình đổi **mỗi câu hát** (~1–3s). Câu rap ngắn ("Two strips." 0.46s) thì đổi đúng **chữ**.
- **Nền bám stem:**
  - mỗi kick → các lớp mực lệch khuôn rồi khớp lại; độ lệch ∝ đường bao drums, tối đa 4px ở verse, 12px ở điệp
    khúc;
  - đoạn trống câm → khuôn đứng yên tuyệt đối.
- **Chuyển cảnh mặc định = nạp giấy:** tờ cũ trượt lên ra khỏi máy (0.35s, outCubic), tờ mới vào từ dưới; dấu cắt
  và vạch đăng ký luôn ở bốn góc; dòng chân trang Plex Mono ghi lượt in (`PASS n/4`).
- **Cắt cứng đúng 11 chỗ**, mỗi chỗ gắn một cú đập hoặc cú lặng:
  1. **53.50**: vào điệp khúc 1, trống dồn 52.12–53.36 kết thúc → lộ cỗ máy ∫;
  2. **112.86**: vào điệp khúc 2;
  3. **139.94**: **nhạc cụ tắt hẳn** (đo trên stem: im 139.94–143.52) → phủ xanh toàn khổ;
  4. **143.67**: trống trở lại, Beat switch → giấy trắng;
  5. **191.92**: vào điệp khúc cuối;
  6–9. **212.60 · 213.56 · 214.79 · 216.03**: FROM SCRATCH ×4, mỗi tiếng một con dấu;
  10. **218.02**: Final hook;
  11. **233.20**: dừng cứng (hết file, nhạc cắt ngang, không fade).

### Bản đồ năng lượng (đo trên stem, `data/stems.json`; năng lượng nhạc cụ trung bình ×100)

| mốc | nhạc làm gì | hình phải làm gì |
|---|---|---|
| 0 – 10.06 | **chỉ keyboard**, giọng máy mềm (1.9) | giấy trắng, mỗi nốt một lượt in; tĩnh, ít vật |
| 10.06 – 13.76 | guitar arpeggio vào, chưa có lời | tít bài in dần, mỗi nốt guitar một dải |
| 13.76 – 15.0 | rap vào **trơn** | băng chữ đầu tiên một mình |
| 15.0 – 42.98 | trống vào nhẹ, bass thưa (5.1) | bản vẽ kỹ thuật trên giấy; lệch khuôn nhẹ |
| 42.98 – 52.12 | pre 1, synth dâng (6.5) | chữ hát nghiêng; giấy ít vật hơn, căng |
| 52.12 – 53.36 | **trống dồn** | dải giấy dồn vào máy nhanh dần |
| **53.50 – 71.94** | điệp khúc 1, bè vào (8.6) | **cỗ máy ∫ hiện ra**, poster huỳnh quang |
| 71.94 – 98.00 | verse 2 (6.4); lặng ngắn 73.74 | bồn mực, dải Riemann; đếm 2 · 4 · 8 đúng chữ |
| 98.00 – 112.86 | pre 2, bè dày (7.6) | gom mảnh → lượt key |
| **112.86 – 131.26** | điệp khúc 2, bass dày (11.8) | máy chạy nhanh, camera trượt theo đường ∫ |
| 131.26 – 139.94 | break: beat tối giản, percussion mỗi 1.24s | thẻ máy chữ, mỗi tiếng percussion một con dấu |
| **139.94 – 143.52** | **nhạc cụ im hẳn**, chỉ còn giọng | phủ xanh toàn khổ, một con số, đứng yên |
| **143.67 – 173.05** | beat switch: trống trở lại, percussion 2.47s (7.6) | giấy trắng lại; dải → mặt → khối giấy xoay |
| 173.05 – 187.9 | bridge: trống không bass, bè (6.9) | ba poster in lần lượt; thoáng |
| 187.9 – 191.9 | năng lượng tụt | lặng, giấy trôi chậm — lấy đà |
| **191.92 – 211.06** | điệp khúc cuối, to nhất (12.3) | **đỉnh**: in đủ 4 lượt, nhân vật đủ màu |
| 211.06 – 212.60 | gần lặng (211.31) | tờ trắng, một câu hỏi máy chữ |
| **212.60 – 218.02** | hô FROM SCRATCH ×4 + FX 212.33 (13.6) | 4 con dấu cắt cứng |
| 218.02 – 228.9 | hook, đủ band (13.3) | dồn dập theo từ |
| 229.00 – 231.0 | "Ninety-nine percent… Loading." trên band | thanh 99% trở về |
| **233.20** | **hard stop** | cắt ngang |

### Mốc nhạc cụ cụ thể (`data/stems.json`)

| stem | mốc | dùng cho |
|---|---|---|
| keyboard | 0.20 · 0.50 · 2.04 | in dấu cắt / vạch đăng ký / thanh tải (P01) |
| keyboard | 4.49 · 5.12 · 5.75 · 6.65 · 6.97 · 7.90 · 8.20 · 9.13 | mỗi nốt một lượt in của hai bản song song (P02) |
| guitar | 10.06 · 10.68 · 10.98 · 11.62 · 11.93 · 12.24 · 12.53 · 13.16 · 13.47 (9 nốt) | **9 dải** dựng tít "ADD IT UP" (P03) |
| drums | 15.00 | giấy bắt đầu chạy (P04) |
| drums | 52.12 → 53.36 (5 cú) | dồn dải vào máy (P08) |
| percussion | 134.39 · 135.63 · 136.87 · 138.10 · 139.34 | con dấu máy chữ của Break (P14) |
| (im) | 139.94 – 143.52 | phủ xanh, một con số (P15) |
| drums | 143.67 | Beat switch (P16) |
| percussion | 148.02 · 150.50 · 152.97 · 154.20 · 155.44 · 156.67 · 157.92 · 159.15 | mỗi cú một dải/đĩa được dập (P16–P17) |
| other (FX) | 212.33 | tiếng vút trước con dấu đầu (P22) |
| percussion | 221.01 · 223.48 · 224.72 · 225.95 · 227.19 | bộ đếm lượt in nhảy (P23) |
| strings | gần như câm (đỉnh 0.025) | không dùng |

## 7. Nhân vật — tiết chế, luật bằng số

Nguyên tắc của người dùng: **chỉ tư thế hợp lời, vừa đủ tạo điểm nhấn.** Thư viện có 33 tư thế; bài này dùng **6
+ mặt hát nhép**, có mặt ≈ **44s / 233s ≈ 19%**. Các cảnh còn lại để toán và chữ làm nhân vật chính.

| # | pose | câu | khoảng | vì sao đúng câu này |
|---|---|---|---|---|
| 1 | `ponder` (chống cằm) | "What did we lose?" | 9.00 – 13.76 | câu hỏi mở bài |
| 2 | `plusc` (cầm mặt dây chuyền +C) | "F of x plus C, that's the missing memory" | 33.47 – 42.98 | **ký ức đã mất đeo sẵn trên cổ** |
| 3 | mặt hát nhép (`viseme` + `mouth`) | "Add it up, piece by piece" ×3 | 53.50 – 55.34 · 112.86 – 114.76 · 191.92 – 193.84 | câu hook, chữ ký của bài |
| 4 | `three` (giơ ba ngón) | "Three t squared" | 76.22 – 83.12 | ba = hệ số 3 của 3t² |
| 5 | `pointer` (que chỉ) | "Look at the slice, not only the skin" | 154.90 – 162.75 | chỉ vào lát cắt |
| 6 | `fist` (nắm đấm) | "From scratch!" ×4 | 212.60 – 218.02 | tiếng hô |
| 7 | `peace-back` (quay lưng, chữ V) | "Same machine— now you know" | 225.14 – 228.90 | chào rồi đi, trước khi về 99% |

- **Chất liệu:** bản tách màu riso dựng một lần khi nạp, nên tất định:
  - key = nét, tóc, áo thun;
  - tram xanh = bóng;
  - tram hồng = da và chỗ ấm;
  - tram vàng = ánh vàng (dây chuyền, viền tai nghe).

  Thêm **bóng bẹt một mực** lệch (18, 12)px chỉ lộ ngoài silhouette, và mọi lớp phủ toàn khổ đều **đục lỗ** dưới
  người, chừa mép 10px.
- **Vào:** in lần lượt 4 lượt vàng → hồng → xanh → key, mỗi lượt 4 khung, lệch khuôn 14px rồi khớp lại.
- **Ra:** xén thành 12 dải dọc, rơi lệch nhau 0.3s.
- Không cắt cứng nhân vật; trừ ×4 con dấu FROM SCRATCH, nơi cả khung cắt.
- **Cỡ:** cao ≥ 55% khung khi đứng ở rìa (đã thử: 640–1000px); mặt hát nhép ≥ 70% chiều cao khung.
- **Chỗ đứng:** bên phải, một phần ba khung; toán ở hai phần ba trái. Không đè lên đồ thị hay chữ (đo bbox).
- Dây chuyền +C ở P07: có quầng vàng tram và viền key, vì ở cỡ thường chi tiết vàng bị nuốt (đã soi ở độ phân
  giải gốc).

---

## 8. Plates

Cột mốc là mốc bắt đầu dòng lời trong `timeline.json`. Mỗi plate có một ý gọi tên được, và câu "vì sao".

### P01 `press` — "Máy in khởi động" · 0.00 → 3.90
Giấy trắng. Nốt keyboard 0.20 in **dấu cắt** bốn góc; 0.50 in **vạch đăng ký** ⊕. 1.18 "Ninety-nine percent…"
(Plex Mono, gõ) và một **dải tải** in hồng từng lượt, dừng ở **99%**. 2.08 "Loading." thì ô 1% cuối còn trống
là một khung viền vàng mờ: thứ còn thiếu.
*Vì sao:* bookend của kênh, đặt bằng ngôn ngữ in. Ô 1% vàng gieo sẵn câu hỏi mà Break sẽ trả lời (vàng = C).

### P02 `twins` — "Cùng tốc độ, khác chỗ" · 3.90 → 9.00
Hai **bản in cùng một bản khắc** đặt chồng nhau, lệch dọc một đoạn. Mỗi nốt keyboard (4.49 … 8.20) in thêm một
lượt.
- 3.90 "Same speed.": hai mũi tên hồng giống hệt;
- 5.36 "Different place.": hai chấm xanh ở hai độ cao;
- 6.54 "Same change.": hai đoạn dốc hồng song song;
- 8.14 "Different past.": vệt quá khứ vàng phía sau mỗi chấm, dài ngắn khác nhau.

*Vì sao:* lệch khuôn dọc được giới thiệu ngay từ đầu như một "lỗi in"; Verse 1 sẽ gọi tên nó là + C.

### P03 `lose` — "Ta đã mất gì?" · 9.00 → 13.76
9.00 "What did we lose?" (Plex Mono). Nhân vật `ponder` in vào bên phải. Bên trái là khung vàng rỗng có dấu "?".
Guitar 10.06 → 13.47 đúng **9 nốt → 9 dải** ghép thành tít **ADD IT UP** (Archivo 900, dải lệch rồi khớp dần).
13.4: nhân vật xén thành dải và ra.
*Vì sao:* tít bài dựng từ mảnh, đúng tên bài, ngay khi nhạc cụ thứ hai vào.

### P04 `cars` — "Hai xe" · 13.76 → 21.54
Giấy dài cuộn ngang. Hai làn đường là hai băng giấy song song; hai xe là hai con tem riso.
- 13.76 "Two cars moving down the same straight line": rap trơn, chưa có trống, nên giấy đứng yên;
- **15.00 trống vào → giấy bắt đầu cuộn** sang trái (xe đi sang phải);
- 16.64 "same speed every second": hai kim đồng hồ tốc độ giống hệt, mỗi beat một vạch;
- 19.14 "One reads twelve" → đồng hồ quãng đường `012`;
- 20.18 "one reads one-twelve" → `112`. Số lăn như máy đánh số.

*Vì sao:* ví dụ đời thường của lời, đặt bằng vật in (tem, máy đánh số).

### P05 `erase` — "Đạo hàm xoá hằng số" · 21.54 → 28.44
Đồ thị quãng đường của hai xe: **hai đường xanh song song**, khoảng giữa là mảng vàng ghi "+100".
- 21.54 "Same motion on the meter—": đồ thị tốc độ hồng của hai xe in **trùng khít một nét** (in chồng hai lần
  cùng chỗ vẫn là một đường);
- 22.74 "something disappeared";
- 23.38 "Take the position, / differentiate.": **trục lăn d/dx** quét từ trái sang phải trên hai đường xanh, phía
  sau nó còn lại đúng một đường hồng phẳng;
- 25.48 "Anything constant / gets erased" (27.85): **mảng vàng +100 bị trục lăn lột ra**, cong lên rồi rơi khỏi
  khung.

*Vì sao:* "xoá" là một thao tác vật lý của máy in, không phải dấu gạch.

### P06 `family` — "Cả một họ" · 28.44 → 33.47
- 28.44 "Run it backward,": dải hồng **chạy ngược** qua trục lăn và in ra một đường xanh. Nhưng mảng vàng đã mất,
  máy không biết đặt khuôn ở độ cao nào;
- 29.62 "what comes through?";
- 30.72 "Not just one curve—": máy **in lại cùng bản khắc 7 lần, mỗi lần lệch dọc** (C = −9 … 9 bước 3), xen
  xanh/hồng;
- 31.96 "a family of you": cả chồng rung lệch khuôn theo beat.

*Vì sao:* họ nguyên hàm = bản in lệch khuôn. Đây là hình ảnh trung tâm của DNA.

### P07 `plusc` — "+C: ký ức đã mất" · 33.47 → 42.98 (khung phong cách A)
Nhân vật `plusc` in vào bên phải.
- 33.47 "F of x plus C,": **"+C" vàng khổng lồ** in giữa khung, viền key; dây chuyền +C trên cổ nhân vật có quầng
  vàng tram;
- 34.96 "that's the missing memory";
- 35.98 "Same slope,": tại cùng một x, **7 tiếp tuyến key song song** trên 7 bản in (F(x) = x³/3 − x,
  F′(1.8) = 2.24);
- 37.42 "different history": mỗi bản kéo vệt vàng về bên trái;
- 38.34 "Move it higher, / move it low.": cả chồng trượt lên rồi xuống theo hai beat;
- 40.42 "The derivative / will never know.": trục lăn d/dx đi qua; dưới nó, 7 bản cho ra **một** đường hồng.
- 42.5: nhân vật xén thành dải và ra.

*Vì sao:* câu trả lời nằm ngay trên người nhân vật từ đầu. Đó là phát hiện của MV, không phải gắn thêm.

### P08 `forgot` — "Có lẽ chỉ cần phần thay đổi" · 42.98 → 53.50 (pre 1, hát)
Chữ Cormorant nghiêng, to.
- 42.98 "If the rate forgot / where the journey began,": một đường hành trình in xanh; **chấm xuất phát vàng**
  mờ dần (vàng = C được phép mờ);
- 46.26 "maybe going backward / can't give one answer again.": mũi tên ngược tách thành một chùm;
- 48.32 "But maybe we don't need / where we started to be.": hai cột key **a** và **b** dập xuống;
- 50.82 "Maybe all we need / is the change we can see.": chỉ đoạn giữa a và b được in xanh đậm;
- **52.12 → 53.36: 5 cú trống dồn → 5 dải hồng bị hút lên mép trên khung**, nhanh dần.

*Vì sao:* chuyển từ "mất" sang "chỉ cần hiệu", và đà trống dẫn thẳng vào cỗ máy.

### P09 `chorus1` — "CỖ MÁY ∫" · ✂ 53.50 → 71.94 (điệp khúc 1)
**Cắt cứng 53.50.** Toàn khổ phủ hồng, đục lỗ.
- 53.50 "Add it up, / piece by piece.": **mặt nhân vật cận cảnh hát nhép**, in riso, bên phải. Bên trái là chữ
  **ADD IT UP dựng từ dải dọc** lệch nhau, mỗi âm tiết khớp lại một phần (khung phong cách D);
- 55.34 về giấy trắng (nạp giấy): **cỗ máy ∫** hiện ra, cao hết khung. Đường giấy hình chữ S kéo dài, khe vào ở
  trên, khay ra ở dưới, nhãn nhỏ *summa*;
- 55.34 "Let the changing / find its shape.": dải hồng (chiều cao khác nhau) chạy dọc chữ S và xếp ở khay thành
  hình vùng dưới đồ thị;
- 58.22 "Start to end, / take the difference,": khay có hai cột a, b; bảng số F(b) − F(a);
- 60.54 "let the constant fade away.": lớp vàng ở khay **phai đi**: lần duy nhất dùng alpha, vì lời nói đúng thế;
- 62.96 "Rate to amount.": thẻ nạp "RATE" (đồng hồ tốc độ hồng) → khay ra "AMOUNT" (đồng hồ quãng đường xanh);
- 64.34 "Height to area.": thẻ "HEIGHT" (dải) → "AREA" (mảng);
- 65.26 "Different things, / same melody.": hai cỗ máy giống hệt chạy đồng bộ, như hai bản in của một khuôn;
- 67.38 "Same machine. / Different input.": hai cỗ máy chập làm một; thẻ nạp đổi trên từng beat;
- 69.66 "Add up / what you need.": khay ra in số tổng.

Bè 54–56 và 62–71: lời hát in lại thành chữ rỗng hồng lệch khuôn.
*Vì sao:* "Same machine" là trục của cả bài, nên điệp khúc đầu phải dựng nó lên.

### P10 `tank` — "Bồn đầy, dòng đổi" · 71.94 → 83.12
Giấy trắng.
- 71.94 "Now the tank fills up,": **bồn** khung key, mực xanh tram dâng lên; ống vào có đồng hồ lưu lượng hồng;
- 74.62 "but the flow keeps changing.": kim đồng hồ lưu lượng tăng dần;
- 76.22 "Three t squared,": nhân vật `three` in vào; đồ thị **f(t) = 3t²** in hồng bên trái;
- 77.12 "every second rearranging.": mỗi beat thêm một vạch trên đồ thị;
- 78.89 "One rate times time": **một hình chữ nhật** cao f(2) = 12, rộng 2;
- 79.88 "won't get it right.": = **24**. Phần thừa trên đường cong in **hồng + vàng** (màu sai lệch, ≈ đỏ cam), kèm
  nhãn "24 ≠ 8";
- 80.89 "One big rectangle / doesn't fit the line.": hình chữ nhật rung lệch khuôn.
- 82.6: nhân vật xén thành dải và ra.

*Vì sao:* thất bại phải thấy được bằng màu (in chồng = sai lệch) trước khi lời giải tới.

### P11 `strips` — "Cắt nhỏ" · 83.12 → 98.00 (khung phong cách B)
- 83.12 "So break it down.": **dao xén** chém hình chữ nhật;
- 83.90 "Two strips." → n = 2, tổng 15;
- 84.48 "Four strips." → n = 4, 11.25;
- 85.14 "Eight, then more." → n = 8, 9.5625; tiếp theo trên beat: 16 → 8.766 · 32 → 8.379 · 64 → 8.189.
  Số đếm Archivo 900 cạnh nhãn "STRIPS"; tổng in trên băng Plex Mono;
- 86.12 "Smaller and smaller, / closer than before.": dải mỏng tới mức sinh **moiré** với lưới tram. Đó là chất
  liệu in thật, và nó nói "mảnh đã nhỏ hơn cái mắt phân biệt được";
- 88.32 "Every little width, / every changing height,": phóng to **một dải**: bề rộng key "dt", chiều cao hồng
  "3t²";
- 90.56 "add them together / from left to right.": các dải **bay từng cái từ trái sang phải vào bồn**; mỗi dải là
  một lớp mực, mực dâng thành bậc thang;
- 93.08 "And as the pieces / fade away,": dải mỏng dần tới không. Đây là bề rộng → 0, KHÔNG phải alpha;
- 95.42 "the staircase and the curve / begin to look the same.": đồ thị mực trong bồn theo thời gian, tức bậc
  thang đè lên đường **t³** xanh, trùng nhau; bồn đúng vạch **8**.

*Vì sao:* đây là định nghĩa tích phân, kể đúng thứ tự lời và đúng số.

### P12 `whole` — "Gom mảnh thành tổng" · 98.00 → 112.86 (pre 2, hát)
- 98.00 "No single moment / can tell us the whole.": **một vạch dọc mảnh** (một khoảnh khắc) đứng trước cả vùng
  diện tích, nhỏ xíu;
- 101.12 "So gather every change / and let the pieces form the total.": mọi dải từ P11 **tụ về** thành một khối
  xanh đặc;
- 103.60 "What looked like motion / becomes something we can see.": chiếc xe P04 chạy qua, và vệt sau nó *là*
  diện tích dưới đồ thị tốc độ: chuyển động hoá thành hình;
- 107.22 "Piece by piece—";
- 108.52 "accumulation is the key.": **lượt in KEY**. Mọi thứ trên trang đang chỉ có lớp màu bỗng được in nét key
  cùng lúc và **sắc nét lên**. Chân trang: `PASS 4/4 · K = KEY`.

Bè 101–114 ở chữ rỗng.
*Vì sao:* chơi chữ nghề in (K của CMYK = key plate) thành chính khoảnh khắc "à ra thế".

### P13 `chorus2` — "Máy chạy hết cỡ" · ✂ 112.86 → 131.26 (điệp khúc 2)
**Cắt cứng 112.86.** Cùng cấu trúc với P09 nhưng **camera trượt theo một dải giấy dọc đường ∫**: đi vào khe trên,
lượn theo chữ S, rơi vào khay. Đây là cảnh chuyển động lớn nhất, vật thể lớn, tương phản cao.
- 112.86 "Add it up, piece by piece": hát nhép;
- 115.14 "Let the changing find its shape": dải 3t²;
- 117.62 "Start to end": t = 0 và 2;
- 119.88 "let the constant fade away": C vàng phai lần hai;
- 122.78 "Rate to amount": bồn đầy tới 8;
- 123.72 "Height to area": vùng 3t²;
- 126.78 "Same machine. / Different input.": thẻ nạp đổi trên mỗi beat; kick bass dày → lệch khuôn 12px.

*Vì sao:* lần hai phải lớn hơn: cùng máy, nhưng giờ ta đi BÊN TRONG nó.

### P14 `ftc` — "Kiểm hai đầu" · 131.26 → 139.94 (break, nói)
Một tấm **thẻ máy chữ** (Plex Mono) trên giấy; mỗi tiếng percussion là một con dấu.
- 131.26 "Take an antiderivative.": F(t) = t³ + C, họ bản in lệch khuôn quay lại, mảnh;
- 133.15 "Check both ends.": cột a = 0, b = 2;
- 134.44 "F of b" → `F(2) = 8 + C`;
- 135.06 "minus F of a." → `F(0) = 0 + C`;
- 136.62 "C on the left.": **mảng vàng C** dập ở bên trái;
- 138.00 "C on the right.": mảng vàng C dập ở bên phải;
- 139.38 "Subtract—": hai mảng vàng **trượt vào nhau**.

*Vì sao:* nhịp tối giản, giọng nói, nên hình cũng tối giản và bằng chứng từng dòng như máy chữ.

### P15 `gone` — "Biến mất" · ✂ 139.94 → 143.67 (nhạc cụ im)
**Cắt cứng 139.94**, đúng lúc mọi nhạc cụ tắt. "and it's gone." (139.82): hai mảng vàng chồng lên nhau và **triệt
tiêu**, rồi **toàn khổ phủ xanh**.
141.32 "The family / becomes one number.": 7 đường của họ **sập lại làm một**, rồi co thành con số **8** khổng lồ,
đục lỗ giấy trên nền xanh. Đứng yên tuyệt đối tới khi trống về.
*Vì sao:* cú lặng duy nhất của bài nhận hình tĩnh nhất và tương phản nhất. Số 8 nối lại bồn của Verse 2.

### P16 `area` — "Một đường cong trên mặt đất" · ✂ 143.67 → 152.42 (beat switch)
Câu 143.12 "Now take a curve" bắt đầu khi nền vẫn phủ xanh: băng chữ in lên nền xanh trước. **Cắt cứng 143.67**
(trống về) sang giấy trắng.
- 143.12 "Now take a curve / above the ground.": đường **√x** trên [0, 4] in xanh trên một **đường đất** key;
- 145.24 "Thin little strips / all the way around.": dải hồng dập theo percussion 148.02 · 150.50;
- 147.22 "Height times width— / one little piece.": một dải phóng to, nhãn `√x · dx`;
- 150.00 "Add every piece / and the surface appears.": các dải liền lại thành **mặt diện tích** xanh, nhãn
  `∫₀⁴ √x dx = 16/3`.

*Vì sao:* cùng cỗ máy, đầu vào giờ là chiều cao.

### P17 `solid` — "Lát cắt" · 152.42 → 162.75 (khung phong cách C)
- 152.42 "Now take a solid.": mặt diện tích P16 **quay quanh trục x** thành khối, dựng bằng **26 đĩa giấy xếp
  chồng** (giả 3D, mỗi đĩa phẳng, tô bằng in chồng nên chỗ chồng nhiều thì đậm hơn: cộng dồn nhìn thấy được);
- 153.88 "Cut it thin.": dao xén lướt dọc khối, lộ khe giữa các đĩa;
- 154.90 "Look at the slice, / not only the skin.": nhân vật `pointer` in vào; **một đĩa rút ra**, chỗ cũ còn viền
  nét đứt; đĩa tô kín hồng;
- 157.34 "Every cross-section / has an area inside.": nhãn `A(x) = π(√x)² = πx`;
- 159.74 "Add those areas / from side to side.": đĩa trở về, cả chồng đếm từ trái sang phải theo percussion,
  `V = ∫₀⁴ πx dx = 8π`;
- 162.3: nhân vật xén thành dải và ra.

*Vì sao:* "thể tích bằng lát cắt" làm bằng chính vật liệu của xưởng: giấy xếp chồng. 8π vọng số 8.

### P18 `climb` — "Chiều cao → diện tích → thể tích" · 162.75 → 173.05
- 162.75 "And suddenly—": khung trống trong một beat;
- 163.10 "height became area.": **một vạch** hồng quét ngang, để lại mặt xanh;
- 164.76 "Area became volume.": mặt đó quét theo chiều sâu, để lại khối chồng giấy;
- 166.64 "Nothing changed / inside the machine.": lùi ra thấy **cỗ máy ∫** với ba khe nạp: vạch, mặt, khối;
- 168.42 "Only what / we chose to feed it.": bàn tay giấy đổi thẻ nạp.

*Vì sao:* tóm cả Beat switch thành một chuỗi chiều kích, rồi trả về cỗ máy.

### P19 `bridge` — "Khác chuyện, chung máy" · 173.05 → 191.92 (bridge, hát)
Nhịp chậm, thoáng, không bass. **Ba poster** in lần lượt cạnh nhau như một bộ:
- 173.05 "A rate / becomes an amount.": poster hồng;
- 174.74 "A height / becomes an area.": poster xanh;
- 177.28 "A slice / becomes a volume.": poster vàng + key;
- 179.78 "Same operation.": **một con dấu ∫ in chồng ngang qua cả ba tờ**;
- 181.18 "Different thing / we choose / to accumulate.";
- 183.86 "Water." → giọt nước (∫ lưu lượng dt);
- 184.92 "Mass." → quả cân (∫ mật độ dx);
- 185.26 "Energy." → tia sét (∫ công suất dt).
  Ba con tem dập đúng ba từ;
- 187.14 "Different stories. / Same machinery.": các tờ gấp lại thành **một tập zine**;
- 187.9–191.9 năng lượng tụt: tập zine nằm yên, giấy trôi rất chậm.

*Vì sao:* bridge hát trọn, phải đẹp và thở; toán đã đủ, giờ mở ra thế giới thật.

### P20 `final` — "In đủ bốn lượt" · ✂ 191.92 → 211.06 (điệp khúc cuối, ĐỈNH)
**Cắt cứng 191.92.**
- 191.92 "Add it up, piece by piece.": hát nhép lần ba. Lần này mặt nhân vật in **đủ 4 lượt theo nhịp**:
  vàng → hồng → xanh → key, và chỉ khi đủ 4 lượt mới thấy đủ màu. Cộng dồn ngay trên chân dung;
- 193.84 "Don't memorise / what you can see.": thẻ công thức bay đi, hình ở lại;
- 195.72 "Lose the start,": chấm vàng xuất phát biến mất;
- 197.10 "recover the family,": chồng lệch khuôn hiện lại;
- 197.96 "take the change / and set it free.": **hàng trăm dải hồng bung ra quét ngang khung**: chuyển động lớn
  nhất bài;
- 201.56 "Rate to amount." · 202.92 "Height to area." · 203.84 "Area to volume.": ba con dấu nối nhau;
- 205.32 "Same idea underneath.": các tờ **lật lên** và lộ con dấu ∫ in sẵn **bên dưới** mọi tờ;
- 207.34 "Same machine. / Different input.": cỗ máy chạy hết cỡ, mọi thẻ nạp xoay vòng;
- 208.92 "Now you know / what it's built to do.": khay ra đầy.

*Vì sao:* đỉnh cảm xúc là lúc mọi chất liệu của bài hội tụ.

### P21 `why` — "Why does it work?" · 211.06 → 212.60
Mọi thứ dừng. Một tờ giấy trắng; Plex Mono gõ "Why does it work?" giữa khung; con trỏ nhấp. Gần lặng (211.31).

### P22 `chant` — "FROM SCRATCH!" · ✂✂✂✂ 212.60 / 213.56 / 214.79 / 216.03 → 218.02
FX 212.33 là tiếng vút. Mỗi tiếng hô là **một con dấu cắt cứng**: chữ "FROM SCRATCH!" Archivo 900 khổng lồ, nghiêng
khác nhau, lần lượt hồng · xanh · vàng + key · cả bốn in chồng. Nhân vật `fist` mỗi lần to hơn (55% → 70% → 85% →
100% khung). Bè hô dày nên khuôn lệch 12px.
*Vì sao:* tên kênh, hô to; con dấu là thao tác in mạnh nhất.

### P23 `hook` — "Reverse · Add · Slice · See" · ✂ 218.02 → 228.90
**Cắt cứng 218.02.**
- 218.02 "Reverse it.": họ lệch khuôn bung ra;
- 218.82 "Add it.": dải chồng lên;
- 219.44 "Slice it.": đĩa giấy;
- 220.68 "See.": ba hình ghép thành **một poster** duy nhất;
- 221.17 "Derivative." · 221.90 "Integral." · 222.68 "Geometry.": ba chữ khổng lồ dập trên ba beat, ba mực;
- 223.45 "Piece by piece, / the total grows.": cột dải cao dần theo percussion 223.48 · 224.72; bộ đếm lượt in
  nhảy;
- 225.14 "Same machine—": cỗ máy ∫ lần cuối;
- 226.70 "now you know.": nhân vật `peace-back` quay lưng giơ chữ V, rồi xén thành dải và rời khung.

### P24 `loading` — "Trở về 99%" · 228.90 → 233.20 ✂ (hard stop)
Giấy trắng, dấu cắt.
- 229.00 "Ninety-nine percent…": dải tải của P01 in lại, **99%**;
- 230.25 "Loading.": ô 1% cuối vẫn là khung vàng mờ;
- band vẫn chạy tới 233.20 → **cắt ngang**, khung cuối là tờ giấy đang dở. Không fade.

*Vì sao:* bookend khép vòng của kênh: luôn còn 1% để học tiếp.

---

## 9. Năng lực engine cần xây (chưa có)

Thêm module mới, không sửa hành vi module cũ (exp-log phải render y hệt: `golden.sh`).

| # | năng lực | đặt ở | dùng ở |
|---|---|---|---|
| 1 | **riso**: bộ đệm từng mực, in chồng multiply, lệch khuôn theo drums, giấy + hạt mực (hash), tram xoay góc, đục lỗ | `engine/riso.js` | mọi cảnh |
| 2 | **tách màu ảnh** nhân vật → key/xanh/hồng/vàng + silhouette, dựng một lần khi nạp | `engine/riso.js` | 7 chỗ nhân vật |
| 3 | **in vào theo lượt / xén ra thành dải** cho nhân vật và chữ | `engine/riso.js` | mọi lần vào/ra |
| 4 | **băng lời ba giọng** (rap/hát/nói) + bè chữ rỗng | `engine/tape.js` | mọi câu |
| 5 | **nạp giấy** (chuyển cảnh mặc định) | `engine/riso.js` | ranh giới cảnh |
| 6 | **mặt hát nhép bản riso** (tách màu viseme + mouth) | dùng `face.js` + tách màu | P09, P13, P20 |
| 7 | **cỗ máy ∫** (đường giấy chữ S, khe nạp, khay) | `projects/mv/add-it-up/press.js` | P09, P13, P18, P20, P23 |
| 8 | **chồng đĩa giấy giả 3D** (khối tròn xoay) | `projects/mv/add-it-up/solid.js` | P17, P18, P23 |

Bàn thử đã có các mẩu 1, 2 (bản thô): `tools/lab/riso.html`.

## 10. Kiểm tra trước khi giao

- Mỗi plate: chụp một khung mỗi câu và **nhìn** ở độ phân giải gốc (tram, moiré, chữ).
- **Test toán** (`tools/test/add-it-up.test.mjs`):
  - tổng Riemann (24, 15, 11.25, 9.5625 …);
  - ∫₀² 3t² = 8, ∫₀⁴ √x = 16/3, V = 8π;
  - tiếp tuyến song song của họ F + C;
  - F(2) − F(0) = 8 với mọi C.
- `tools/qa/determinism.sh`, `seams.py` ở 24 mốc vào cảnh, `golden.sh check exp-log` (không làm hỏng MV cũ).
- `tools/review.mjs` ≥ 7/8, YDIF ≥ 1.5.
- Đếm thời lượng nhân vật trên hình ≤ 22% (nguyên tắc tiết chế).
