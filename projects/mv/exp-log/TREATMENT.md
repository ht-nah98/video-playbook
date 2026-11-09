# "Ninety-nine percent" — luỹ thừa ⇄ logarit — treatment & style bible

Bài: Suno, 239.65s, **112 BPM** (tin cậy 3.28×, beat 0.536s, downbeat đầu 0.184s).
Chỉ 29% từ rơi gần beat → **chữ bám lời, nền bám beat** (`docs/mv/SYNC.md`).
Mốc từng câu: `data/timeline.json` / `timeline.txt` — lời gốc ghép vào mốc nghe
được trên **lead vocal sạch từ 12 stem Suno** (`audio/stems/`), 17 câu phân xử tay
có lý do trong `data/overrides.json` (bằng chứng `data/disputes.png`). Hoạt động
từng nhạc cụ: `data/stems.json`, ảnh `data/stems.png`. Mọi mốc dưới đây lấy từ đó
— **không gõ số tay trong code**, đọc từ `timeline.json`.

Khung 1920×1080, 60fps. Nhân vật: `docs/character/CHARACTER-V2.md`.
Ngôn ngữ hình ảnh: `docs/mv/REFERENCE-TEARDOWN.md` (bản 2).

---

## Ý tưởng trong một đoạn

**Tấm gương y = x.** Cả bài là một câu hỏi được hỏi theo hai chiều: cho số mũ
tìm giá trị (luỹ thừa, *đi xuôi*), cho giá trị tìm số mũ (logarit, *đi ngược*).
Thế giới của MV có một đường chéo phát sáng — đường y = x — chia khung làm hai
nửa: **nửa ấm vàng là đi xuôi, nửa lạnh xanh là đi ngược.** Mọi thứ nhân vật làm
ở nửa này đều có bóng phản chiếu ở nửa kia. Nửa đầu bài, gương còn ẩn: ta chỉ
thấy nửa vàng, và một ô trống □ ở chỗ số mũ mà không ai gọi tên được. Chorus đầu
tiên làm gương hiện ra. Giữa bài, trên nền giấy trắng, tờ giấy được **gấp đúng
theo đường y = x** và hai đồ thị trùng khít — khoảnh khắc "à ra thế" của cả bài.
Kết bài, hai nửa gặp nhau tại gương và nhân vật trở về trạng thái "99% loading".

### Vì sao mô-típ này (đọc trước khi phản đối)

1. **Nhân vật đã mang sẵn nó.** Mọi ảnh pose có viền sáng **cam bên trái, xanh
   bên phải** (`CHARACTER-V2.md`). Đặt nhân vật đứng trên đường gương thì ánh
   sáng cài sẵn trở thành *nghĩa*: nửa người thuộc đi xuôi, nửa thuộc đi ngược.
   Không phải chỉnh gì trong ảnh.
2. **Lời bài hát tự nói ra nó**: "Draw one line: y equals x. Fold the whole
   picture", "seen through the mirror", "Meet them at the mirror".
3. **Nó là một phép toán thật**, không phải trang trí: logarit *là* ảnh phản
   chiếu của hàm mũ qua y = x. Khán giả tắt tiếng vẫn thấy được điều đó.
4. **Thế giới làm bằng ký hiệu** (dấu ấn video mẫu) ở kênh toán thành: thế giới
   làm bằng **chữ số và ký hiệu toán** — 2, ³, √, ×, +, log, □.

---

## Tone

Tỉnh bơ, sắc, nhịp rap — rồi vỡ oà ở chorus. Không "vũ trụ huyền bí", không
"phép màu". Lời bài nói thẳng: *"A logarithm isn't magic."* Mọi hiệu ứng mạnh phải
là **một phép toán đang xảy ra** (nhân, gấp, phản chiếu, xoay), không phải lấp lánh.

### Danh sách CẤM (kế thừa `projects/mv/99-intro/DNA.md` §4, cộng riêng bài này)

1. Nền hạt lấp lánh vô nghĩa. Hạt chỉ tồn tại khi nó **là** một ký hiệu toán.
2. Chữ fade in/out. Chữ **decode** khi hiện, **vỡ thành ký hiệu** khi mất.
3. Nhân vật cắt cứng vào/ra. Mọi lần vào/ra qua chuyển chất liệu bằng ký hiệu.
4. Nhân vật bán trong suốt khi đứng. Alpha 1 khi đứng; chỉ tan bằng ký hiệu.
5. "Phép màu": đũa thần, sparkle, vòng phép. (Có đúng một cảnh dùng đũa thần —
   P15 — để **phá** nó.)
6. Công thức rải trang trí. Ký hiệu nào trên màn hình cũng phải là của cảnh đó.
7. Cắt cứng ngoài danh sách cho phép (§ Nhịp).
8. Nền đen tuyền (tóc nhân vật chìm) hoặc trắng tinh (áo blouse chìm).

---

## Bảng màu

| vai | màu | dùng cho |
|---|---|---|
| nền tối | navy đêm `#0B0F1E` → quầng `#16203A` sau nhân vật | mọi cảnh tối — không đen tuyền |
| **đi xuôi / luỹ thừa** | vàng `#FFB547`, lõi nóng `#FFE3A3` | số mũ → giá trị, đường cong mũ, nửa dưới-phải gương |
| **đi ngược / logarit** | xanh `#3FB8FF`, lõi `#BDE8FF` | giá trị → số mũ, đường cong log, nửa trên-trái gương |
| **gương y = x / sự thật** | trắng `#F4F1EA` | đường gương, "stay true", "Why does it work?" |
| **cản trở / câu hỏi mở** | đỏ `#FF4D5E` | "Wait.", "can't", ô trống □, "cannot" |
| giấy (đảo nền) | `#F2EEE4`, mực `#1E2230`, 1 màu nhấn | đoạn 125.66–155.70 |

Chỉ vàng và xanh được bloom. Chữ trắng luôn sắc.

## Chữ

| vai | font | cách hiện |
|---|---|---|
| lời để đọc | Archivo (nén, đậm) | gõ theo ký tự bám mốc từ (`lyric.js`), **decode** 2–4 khung glyph ngẫu nhiên trước khi chốt |
| phép toán | IBM Plex Mono | gõ terminal, con trỏ khối |
| từ khoá lớn | Archivo đen khổng lồ, **ruột lấp chữ nhỏ có nghĩa** | tụ từ ký hiệu bay vào |
| giọng máy (intro/outro) | Plex Mono nhỏ, cách chữ rộng | con trỏ nhấp nháy |
| bảng trắng | Cormorant Italic như nét tay + nét bút vẽ theo đường | bút vẽ theo nét |

Mỗi dòng **một từ khoá đổi màu theo nghĩa**: vàng nếu là đi xuôi (forward,
exponential, value, power, multiply), xanh nếu đi ngược (back, logarithm,
exponent-cần-tìm, find), đỏ nếu là cản trở (wait, can't, cannot, magic),
trắng nếu là sự thật (true, same, one).

**Bè vọng = ảnh phản chiếu.** Stem backing vocals chỉ vang ở các hook
(53–63, 72–73, 101–114, 188–213). Mỗi khi bè vang, dòng lời đang hát hiện thêm
một bản **lật gương, màu xanh, ở nửa bên kia đường y = x**. Bè tắt thì bản gương tan.

Khi hết lượt, cả khối lời **vỡ thành ký hiệu toán** (2 ³ √ × + ÷ = log) trong
1–2 khung rồi tan.

---

## Nhịp & chuyển cảnh

- Ý tưởng hình đổi **mỗi câu hát** (~2–4s) — không có câu nào hình đứng yên.
- Chuyển cảnh mặc định: **ký hiệu nổ ra rồi tụ lại thành cảnh sau**, whip xoay
  quanh đường gương, zoom xuyên qua ký hiệu.
- **Cắt cứng chỉ ở 8 chỗ**, mỗi chỗ gắn một vật đập xuống hoặc một cú lặng của
  nhạc: 12.52 (drop: trống + kèn đồng vào) · 63.82 (con dấu LOGARITHM) · 125.66
  (nhạc lặng → giấy trắng) · 208.60, 209.54, 210.58 (FROM SCRATCH ×3) · 227.3
  (nhạc ngắt) · 238.6 (hard stop).
- Nền (lưới, quầng, sàn ký hiệu) bám `beat.onBeat()`; chữ và sự kiện bám mốc từ.

### Bản đồ năng lượng (đo trên stem, ảnh `data/overview.png`)

| mốc | nhạc làm gì | hình phải làm gì |
|---|---|---|
| 0 – 11.8 | intro rất nhẹ, giọng máy | tối, ít, terminal |
| 11.80 | rap vào **trơn**, chưa có nhạc | chữ `2` đầu tiên hiện một mình |
| **12.52** | **drop thật**: trống + kèn đồng cùng vào, đúng chữ "two" thứ hai | cú đập đầu tiên — mọi thứ sáng lên |
| 40 – 46.4 | bass rút, trống dồn 43–46 | co lại, lạnh dần, căng |
| **46.52** | chorus 1 | **gương hiện ra** |
| 59.5 – 64.4 | post-chorus, bass tắt | tập trung vào ô □ |
| 70.9 – 73 | năng lượng tụt | khoảng thở trước "When will it double?" |
| 92 – 98.5 | bass rút, trống dồn | như pre-chorus 1, mạnh hơn |
| **98.88** | chorus 2, cú trống lớn | gương nhân lên |
| **125.66** | nhạc lặng hẳn rồi chỉ còn bass đứt quãng | **đảo nền trắng**, mỗi cú bass một nét vẽ |
| **139.5** | beat vào lại | điểm nhảy qua gương |
| 155.7 – 167.8 | bridge half-time | chậm nhất, tối nhất, ít vật nhất |
| **168.58** | cymbal, rap cuối | sáng lại, tăng tốc |
| **186.88** | final chorus, bass dày liên tục | **đỉnh của bài** — mọi thứ quay lại |
| 221.2 – 227.3 | outro **đủ band + kèn đồng** — khải hoàn | màn chào kết, không phải đoạn lặng |
| 227.3 – 229.5 | nhạc ngắt; lead vọng "loading" 229.48 | đông cứng, con trỏ nhấp |
| 229.5 – 236.4 | band + kèn vào lại, kèn gỗ dâng từ 234 | dồn tới 99.999… |
| 236.4 | trống, bass tắt; **kèn đồng + kèn gỗ giữ một hợp âm** | mọi thứ đứng im, chỉ thanh loading sống |
| **238.6** | hợp âm cắt — hard stop | CRT tắt |

Đảo nền trắng 125.66–155.70 = 30s = **12.5%** thời lượng, đặt ở 52–65% bài —
đúng khung của video mẫu (8–15%, quanh giữa bài). Bão hoà tụt về mực đơn sắc + 1 màu nhấn.

---

### Mốc nhạc cụ cụ thể (từ 12 stem, `data/stems.json`)

| stem | mốc | dùng cho |
|---|---|---|
| keyboard | 1.87 · 2.13 · 2.40 · 2.67 · 2.97 · 3.24 | mỗi nốt in một hàng chân dung ký hiệu (P01) |
| keyboard | **4.54 · 4.83 · 5.34 · 5.64 · 6.14 · 6.41 · 6.68 · 6.99** — đúng **8 nốt** | **8 khối lập phương đơn vị** xếp thành 2×2×2 (P02) |
| other (FX) | 1.81 | tiếng vút mở màn — màn CRT bật |
| drums + brass | **12.52** | drop (P04) |
| brass | 29.81 | "Zero has no choice" — ổ khoá đóng có tiếng kèn (P08) |
| percussion | **64.49**, 64.85 | "Money" — **máy tính tiền ka-ching** (P13) |
| percussion | **128.28 · 130.42 · 132.51 · 134.66 · 136.80 · 138.94** · 141.09 · 143.23 — mỗi ô nhịp một cú, cách 2.14s | **mỗi cú một nét bút** trên giấy (P19), nhịp gập giấy (P20) |
| backing vocals | 53–56 · 59–63 · 72–73 · 101–114 · 188–196 · 203–213 | chữ gương xanh ở nửa kia (luật Bè vọng) |
| other (FX) | 221.49, 230.02 | loé mở hai khối outro |
| guitar, strings | gần như câm | không dùng |

## Nhân vật — luật bằng số

- Có mặt ~60% thời lượng. **Khi đứng: ảnh màu sạch, alpha 1.**
- **Mọi lần vào/ra: chuyển chất liệu bằng ký hiệu toán** (≥ 5 kiểu, xoay vòng):
  hàng ký hiệu quét · cột ký hiệu dọc · lưới ×/+ · cháy trắng lộ ảnh ·
  tan thành chữ số bay đi. Vào 8–18 khung, ra 3 khung đổi + 20–40 khung mờ.
- Cao ≥ 22% khung; ≥ 35% ở chorus; **cận mặt 70%+** ở những câu hát nhép.
- **Hát nhép** (viseme-1 + mouth-N) chỉ ở cận mặt thẳng, ở các câu **hát**
  (pre-chorus, chorus, bridge, final hook). Phần rap: nhân vật diễn bằng pose.
- Đứng **trên đường gương** ở mọi cảnh có gương, để viền cam trái/xanh phải trùng
  hai nửa thế giới.
- Nền sau nhân vật luôn có quầng sáng (tóc tối) và không bao giờ trắng tinh (áo
  blouse sáng). Trên giấy trắng: thêm viền mực 3px + bóng đổ (`LESSONS.md` §13).
- Khung sách: **mở và kết bằng chân dung dựng từ ký hiệu toán** (`viseme-1`).

| pose | dùng ở |
|---|---|
| crossed | "yeah, I know that game" — tự tin |
| startled | "Wait." — "cannot run" |
| point | chỉ vào phép toán / đồ thị |
| slump | "division cannot run", "couldn't write it right" |
| thumb | "It was already in the game" |
| wave | chào mở đầu sau boot, "One story" |
| angry | "Not a trick to memorize" |
| jump | "everywhere" chorus 2, final chorus |
| notebook · pointer · offer · invite (khung trung) | đoạn giấy P18–P20 |
| down · halt · chalk · invite | rap cuối P22: chỉ xuống · chặn nhánh ma · bảng phấn · "Follow" |
| halt · sky | P23b: "No tricks" · "No rules falling from the sky" |
| ponder | "Why does it work?" — trước khung đông |
| tea | đông cứng 227.3, chờ 99.999… |

---

## Plates

Cột "câu" là mốc bắt đầu dòng lời. Mỗi plate có một **ý tưởng gọi tên được**.

### P01 `boot` — "Máy khởi động" · 0.00 → 4.78
Màn CRT tối, con trỏ nhấp nháy. **1.81 tiếng vút (FX) — màn CRT bật.** Mỗi nốt
keyboard 1.87 · 2.13 · 2.40 · 2.67 · 2.97 · 3.24 in thêm một dải hàng: chân dung
nhân vật hiện ra bằng **hàng ký hiệu toán** như máy in dòng, màu lấy từ ảnh
(bookend mở — video mẫu 0–1.53s).
2.76 "Ninety-nine percent…" — dưới chân dung, thanh loading gõ lên `99%` và
**kẹt**. 3.66 "Loading." — chữ LOADING nhấp nháy theo beat, thanh không nhúc nhích.
*Tắt tiếng: một cỗ máy/nhân vật đang khởi động mà chưa xong.*

### P02 `easy` — "2³ — dễ ợt" · 4.78 → 8.00
4.78 "Two to the three?" — mono gõ `2³ = ?`. Chân dung **cháy trắng** (2 khung)
lộ ảnh màu — mặt tỉnh bơ. **Tám khối lập phương đơn vị** (mặt khối là chữ số
`2`) rơi xuống **đúng 8 nốt keyboard** 4.54–6.99, xếp thành khối 2 × 2 × 2. 6.96 "Easy." — `= 8` đóng dấu vàng, nhân vật nhếch mép
(mouth-2). *Luỹ thừa = đếm số lần nhân. Nhìn là hiểu.*

### P03 `wait` — "2^√2 — kẹt" · 8.00 → 11.80
8.00 "Two to the root two?" — `2^√2`. Các khối thử xếp **1.41421356…** lần: khối
thứ hai chỉ hiện 41%, rồi 4.1%, rồi 0.41% — cứ vỡ vụn. Chuỗi chữ số của √2 chảy
mãi ra khỏi khung. 9.68 **"Wait."** — mọi thứ đông cứng, chuyển đỏ, nhân vật
pose-startled vào bằng **hàng ký hiệu quét**. 10.98–11.80 im lặng: chỉ còn một
dấu `?` đỏ rung nhẹ. *Phép đếm không đi tiếp được.*

### P04 `factors` — "Ba thừa số" · 11.80 → 16.48 ✂ 12.52 (drop)
11.80 "**Two**" — hát trơn, chưa có nhạc: một chữ `2` khổng lồ hiện một mình giữa
khoảng lặng. 12.24 "times" — dấu `×` rung. **12.52 cắt cứng — drop (trống + kèn):**
chữ `2` thứ hai đập xuống đúng lúc hát "two" (12.64), cả khung sáng bừng; 12.86
"times", 13.18 "two" — chữ `2` thứ ba đập xuống. 13.46 "yeah, I know that game" — nhân vật pose-crossed
bên trái. 14.26 "Three little factors" — ba chữ 2 thu nhỏ, bay lên thành số mũ
`2³`. 15.56 "power gets the name" — nhãn tên dán vào chữ ³: **POWER** (ruột lấp
`2·2·2 = 8` lặp lại).

### P05 `rootwall` — "Không nhân 1.414 lần được" · 16.50 → 20.62
16.50 "But root two on top" — `√2` leo lên ngồi vào chỗ số mũ, đẩy ³ rơi xuống.
17.42 "how many times is that?" — bộ đếm lần nhân quay: 1… 1.4… 1.41… 1.414…
không dừng. 18.42 "**Can't** repeat multiplication" — chuỗi `2 × 2 × 2…` cố lặp
lại, dấu × thứ hai **gãy đôi** (đỏ). 19.54 "one-point-four-one-four like that" —
các chữ số 1.414 rơi lả tả như mảnh vỡ.

### P06 `deeper` — "Luật nằm sâu hơn" · 20.62 → 25.38
20.62 "So maybe the meaning was never just the count" — camera **lao xuống xuyên
qua** đống vạch đếm (đường hầm chữ COUNT · COUNT · COUNT). 22.82 "one deeper law"
— dưới đáy là một **mặt trời làm bằng phương trình**: lõi `aᵐ · aⁿ = aᵐ⁺ⁿ`, tia
sáng là các dòng chữ nhỏ `2³·2² = 2⁵` · `2¹·2⁰ = 2¹` … (kỹ thuật mặt trời-bằng-chữ
của video mẫu). 23.78 "that everything comes out from" — tia sáng toả ra theo beat.

### P07 `law` — "Giữ luật sống" · 25.38 → 29.24
25.38 "Same base multiplying" — hai cột `2·2·2` và `2·2` sát lại nhập một.
26.40 "exponents combine" — ³ và ² trượt vào nhau thành ⁵. 27.50 "Keep that rule
alive" — phương trình đập như **nhịp tim** trên beat. 28.04 "the rest falls into
line" — các số mũ rải rác rơi xuống và **xếp hàng** thành một trục số.

### P08 `extend` — "Luật kéo dài" · 29.24 → 35.68
Trục số mũ … −2 −1 0 ½ 1 2 3, trên mỗi mốc một cột cao 2ⁿ. 29.24 "**Zero** has no
choice" — cột ở 0 đập xuống đúng bằng 1, ổ khoá đóng lại (không còn lựa chọn).
30.74 "Negative turns around" — cột âm lộn ngược thành phân số ½, ¼ (mũi tên quay
đầu). 31.54 "Fractions pull out roots" — cột ½ **rút ra một dấu √** như rút kiếm.
32.46 "when the same law holds its ground" — con dấu. 33.88 "Step by step, the old
rule stretches through" — **một đường cong vàng luồn qua đỉnh mọi cột**: đường cong
mũ ra đời. Nhân vật pose-point chỉ theo.

### P09 `truth` — "Đi theo điều phải đúng" · 35.68 → 37.78
35.68 "We didn't pick the meaning" — các lá bài "định nghĩa" bị gạt khỏi bàn.
36.60 "We followed what had to stay true" — nhân vật đi dọc sợi chỉ vàng; chữ
**TRUE** trắng sắc. Nhân vật ra bằng **cột ký hiệu dọc**.

### P10 `turn` — "Lật câu hỏi" · 37.78 → 46.52 (pre-chorus 1)
37.78 "Keep the rule alive, follow where it goes" — camera trượt dọc đường cong,
mỗi bước sáng lên một giá trị đã biết (1, 2, 4, 8 — đèn lồng). 39.98 "Every step
reveals something we already know". 42.08 "But **turn the question round**" — cả
khung **xoay 180°**, bảng màu lạnh dần vàng → xanh (bass rút 40–46). 44.20 "What
if the exponent is the thing we **cannot name**?" — số mũ bị thay bằng **ô trống □
đỏ** nhấp nháy: `2^□ = 8`. Trống dồn 43–46: ô □ rung mạnh dần.

### P11 `mirror` — "TẤM GƯƠNG" · 46.52 → 60.20 (chorus 1)
46.52 **Đường y = x trắng xé chéo khung** — gương hiện ra lần đầu. Nửa dưới-phải
vàng, nửa trên-trái xanh. Nhân vật đứng giữa đường gương, cận mặt, **hát nhép**.
- 46.52 "Run it forward" — mũi tên vàng `3 → 8` bắn sang phải.
- 47.24 "run it back" — mũi tên xanh `8 → 3` bắn ngược, ở nửa kia.
- 48.48 "Same connection, different track" — hai mũi tên là ảnh phản chiếu của nhau.
- 50.44 "Give me the exponent — I'll give you the value" — một **cỗ máy** hai khe:
  số mũ vào khe vàng, giá trị ra.
- 53.24 "Give me the value — find the exponent" — cỗ máy **chạy ngược**, bánh răng quay chiều kia.
- 55.32 "Turn it around, see what was there" — cả khung **lật qua gương**.
- 57.10 "Forward and backward — same idea, everywhere" — cặp (3, 8)/(8, 3) nhân
  bản thành **kính vạn hoa** đối xứng qua gương ra tới mép khung.

### P12 `name` — "Nó có tên rồi" · 60.20 → 64.30 ✂ 63.82
60.20 "Backward question" — kính vạn hoa co về một ô □ (bè vọng 59–61 là tiếng
"everywhere" cuối cùng tan dần ở nửa xanh). 61.52 "Missing exponent"
— □ đỏ lơ lửng ở chỗ số mũ, bass tắt, chỉ còn nó. 63.02 "Now it has a name" —
ba chữ cái bay vào ô. **63.82 "logarithm" — cắt cứng + con dấu**: `log₂ 8 = 3`, ô
□ chuyển xanh. Chữ **LOGARITHM** khổng lồ, ruột lấp `log₂8=3 · log₂16=4 · log₁₀1000=3 …`.

### P13 `bank` — "Tiền trong ngân hàng" · 64.30 → 72.46
64.30 "Money in the bank" — heo đất làm bằng ký hiệu `$` và `%`; **64.49 cú
percussion = máy tính tiền ka-ching**, xu bắn ra. 65.72 "same
percent every month" — mỗi beat một cột xu cao thêm ×1.07. 67.02 "One little
multiplier" — nhãn `×1.07` dán lên heo. 68.98 "Don't ask, 'How much after ten?'" —
câu hỏi đó bị **gạch đỏ**. 70.26 (năng lượng tụt) "Ask the harder question" —
khung tối lại, chỉ còn đường kẻ ngang `×2`. 71.14 "**When will it double?**" —
một tờ lịch lật tìm tháng, dừng ở dấu `?`.

### P14 `hiding` — "Ẩn trong số mũ" · 72.46 → 81.78
72.46 "Now the unknown isn't sitting in a sum" — ô □ **không** nằm trong dấu +
(dấu + đứng trống). 75.11 "It isn't multiplying" — cũng không nằm cạnh ×. 75.96
"so division **cannot run**" — dấu `÷` mọc chân chạy tới, **không với tới** □ đang
lơ lửng ở chỗ số mũ; ngã sấp. Nhân vật pose-slump. 76.88 "It's hiding in the
exponent, out of reach" — □ bay lên cao. 79.64 "What exponent turns this base into
two?" — `1.07^□ = 2`.

### P15 `sentence` — "Nói được mà không viết được" · 81.78 → 90.47
81.78 "That's the whole question. Nothing strange inside" — mở hộp □ ra: bên trong
trống trơn, không có gì lạ. 84.05 "We could say it in a sentence" — terminal gõ cả
câu: *"the power of 1.07 that gives 2"*. 85.04 "we just couldn't write it right" —
câu dài không vừa ô □, tràn ra (nhân vật slump). 86.14 "So give that exponent a
symbol and a name" — cả câu **nén lại** thành `log₁.₀₇ 2` (decode) ≈ 10.2 tháng.
87.94 "A logarithm isn't **magic**" — một cây đũa thần xuất hiện và **vỡ vụn thành
ký hiệu**. 88.98 "It was already in the game" — đèn sảnh ngân hàng bật lại, zoom ra: đường
cong tiền của P13 cắt vạch ×2 đúng ở tháng **10.2**, vạch xanh rơi xuống trục, tờ lịch
từng hỏi "?" giờ hiện `10.2` — câu trả lời nằm sẵn trong thế giới từ đầu. Nhân vật
pose-thumb. *(Thực hiện: Kế hoạch 3 — thay bàn cờ P04, vì P04 đã dựng không có bàn cờ.)*

### P16 `otherside` — "Nghe từ phía bên kia" · 90.47 → 98.88 (pre-chorus 2)
90.47 "We already knew the question" — câu hỏi khắc trên **kính quầy giao dịch** của
chính ngân hàng (kính hạ xuống như cửa chớp; nhạc tắt 90–94: lạnh, đứng yên). 92.54 "Turn
the language backward" — chữ **lật gương** (đọc ngược), bass rút. 94.60 "What
looked unfamiliar was waiting there all along" — sau tấm kính là đường gương y = x
đã chờ sẵn. Mặt cận hát nhép hiện sau kính, trên đường gương. Trống dồn 94–98.8: mỗi beat một
cú rạn, ô nhịp cuối dồn nửa beat. 97.70 "heard from the other side" — kính rạn kín.

### P17 `mirror2` — "Gương nhân đôi" · 98.88 → 112.80 (chorus 2)
**Cú bùng nổ thứ nhất của nửa sau.** Cú trống 98.88: kính vỡ tung về phía camera, lộ
**hai** gương giao nhau, sảnh ngân hàng nhường chỗ cho **sảnh gương** sâu hun hút (đổi
phong cách thế giới). Điệp khúc 1 kể bằng đại số; điệp khúc 2 kể bằng **đồ thị**: hệ toạ
độ đặt sao cho u = v trùng gương, nên đường cong mũ vàng và ảnh của nó — đường cong log
xanh — đúng là ảnh của nhau. "Same connection, different track": vạch nối vuông góc gương.
"Give me the exponent…" điểm chạy 2 → 4; "…find the exponent" 4 → 2. "Turn it around":
đồ thị gập qua gương (vàng ⇄ xanh). Hát nhép cận mặt tới "different track". 109.60
"Forward and backward" — pose-jump; 111.62 "everywhere" — kính vạn hoa 8 nhánh đường cong
tràn khung, camera xoay.

### P18 `engine` — "× xoay thành +" · 112.80 → 125.66 (beat switch)
112.80 "Same old laws coming through again" — một **động cơ** bánh răng, răng hình `×`.
114.81 "Multiply the values — exponents add within" — hai giá trị nhân vào, trong
lõi số mũ cộng lại. 116.99 "Now read it backward, watch the language shift".
**118.87 "Multiplication turns to addition"** — mọi dấu `×` **xoay 45° thành `+`**
(đúng hình học: × xoay 45° là +). 120.30 "same engine, different script" — cùng
động cơ, chữ đổi từ serif sang mono. 121.70 "Not a bag of rules" — túi thẻ công
thức rơi ra, cháy. 122.50 "Not a trick to memorize" — thẻ học thuộc bị cắt vụn
(pose-angry). 124.50 "seen from the other side" — camera vòng ra **sau lưng**
động cơ: mặt sau là cùng một cỗ máy, đọc ngược.

*(Thực hiện, Kế hoạch 4: động cơ CHÍNH LÀ cửa két tròn ở cuối sảnh ngân hàng P13–P16. Đo stem:
112.9–116.4 gần như chỉ còn giọng → ký hiệu của P17 tụ thành cửa két tối; **116.42 band vào lại
= cú nổ thứ hai** — động cơ bừng sáng; 118.87 bass nhấn đúng "Multiplication" → răng × xoay 45°
thành +. Nhân vật: que chỉ dẫn (khung trung, góc trái) giảng, rồi angry ở "memorize".)*

### P19 `axes` — "Bảng trắng: hai đường cong" · 125.66 → 140.09 ✂ (đảo nền)
**125.66 nhạc lặng → cắt sang giấy trắng.** Mỗi cú percussion/bass mỗi ô nhịp
(128.28 · 130.42 · 132.51 · 134.66 · 136.80 · 138.94) = **một nét vẽ**.
125.66 "Put them on the axes" — bút vẽ hai trục. 127.52 "Exponential — rising to
the right" — đường cong mực **vàng** vẽ theo nét. 130.56 "Logarithm beside it —
different shape in sight" — đường cong mực **xanh**. 134.30 "Draw one line" —
thước kẻ đặt chéo; 136.12 "**y equals x**" — nét đứt vẽ đúng lúc hát. 137.50 "Fold
the whole picture" — **tờ giấy gấp theo đường y = x** (gấp 3D, mặt sau giấy lộ ra).
138.66 "watch what happens next" — nếp gấp dừng ở 90°, chờ.

*(Thực hiện, Kế hoạch 4: tờ giấy là **trang sổ kẻ ô của nhân vật** — pose cầm sổ ở góc phải,
viền mực. Nửa trên-trái gập lên làm lộ mặt bàn tối.)*

### P20 `fold` — "X thành Y" · 140.09 → 155.70 (beat vào lại, vẫn trên giấy)
140.09 beat vào: **tờ giấy gập xong** — đường vàng đè khít lên đường xanh, loé
trắng. 140.09 "X becomes Y", 141.19 "Y becomes X" — nhãn trục X, Y **đổi chỗ** bay qua gương.
142.21 "Every point switches when the mirror reflects" — các chấm nhảy qua gương.
143.76 "Zero-one turns into one-zero clean" — điểm `(0,1)` bay thành `(1,0)`, vệt nối
vuông góc với gương. 146.23 "Input becomes output on the other side of the screen"
— nhãn INPUT/OUTPUT đổi chỗ, **mép màn hình là nếp gấp**. 148.31 "What went forward
now comes back". 151.88 "Two different graphs?" — hai đồ thị tách ra hai tờ.
153.17 "Look again" — chồng lên nhau. 153.46 "One is the other seen through the
mirror" — trùng khít, rồi **tờ giấy xé thành ký hiệu** quay về nền tối.

*(Thực hiện, Kế hoạch 4: gập bằng phép phản xạ thật — nét vàng thấm qua mặt sau giấy nằm đúng lên
đường xanh. Thêm: "on the other side of the screen" cả tờ lật sang mặt sau, "comes back" lật về;
"Two different graphs?" tờ giấy xé đôi theo gương, "Look again" ghép lại; kết thúc trang vỡ thành
ký hiệu về nền tối. Nhân vật: chìa tay giới thiệu, rồi mời "Look again".)*

### P21 `facing` — "Hai câu hỏi đối mặt" · 155.70 → 168.58 (bridge, half-time)
Tối nhất, chậm nhất, ít vật nhất. Nhân vật cận mặt bên trái, **ảnh phản chiếu của
nhân vật** (lật ngang, nhuộm xanh) bên phải, đường gương ở giữa. Hát nhép.
155.70 "What does this exponent produce?" — câu vàng bên trái.
157.96 "What exponent produced this?" — câu xanh bên phải, **chữ viết gương**.
160.06 "Two questions facing one another". 162.04 "One moves forward" — nhân vật
bước tới. 163.46 "One comes back" — ảnh phản chiếu bước tới. 164.24 "Meet them at
the mirror" — hai bên chạm nhau tại đường gương. 165.28 "and they become the same"
— hai nửa **nhập làm một**, loé trắng, gương tan thành ký hiệu.

*(Thực hiện, Kế hoạch 5: gương ĐỨNG giữa khung (phép phản xạ ngang, không phải y = x) để hai mặt nhìn nhau. Mặt thật: 2³ = ? vàng; ảnh nhuộm xanh: 2^? = 8 viết gương. "Meet them at the mirror": hai mặt áp vào gương, mỗi bên chỉ còn nửa phía mình; "and they become": hai trục mũi trùng nhau → một gương mặt đối xứng ghép từ nửa trái (`duet.js`); "the same": loé, gương tan thành ký hiệu, 2³ = 8 ở giữa. Cảnh vỡ thành ký hiệu ở 0.35s cuối.)*

### P22 `unique` — "Đúng một đáp án" · 168.58 → 186.88 (final rap)
168.58 cymbal — sáng lại. "And if the curve never turns around" — đường cong mũ
vàng, camera chạy dọc nó như tàu lượn, không bao giờ quay đầu. 170.81 "every
positive target gets exactly one way found" — **tia laser ngang** quét lên, mỗi
độ cao chạm đường cong đúng một điểm (loé `1`). 173.63 "One height." · 174.15 "One
crossing." · 174.71 "One exponent there." — ba con dấu trên ba beat. 175.93 "No
second answer waiting anywhere" — một điểm cắt thứ hai ma quái thử hiện ra, bị gạch
đỏ. 177.91 "That's why the question had an answer from the start". 180.19 "Not
because a textbook declared that part" — một cuốn sách giáo khoa đóng sập, **vỡ
thành ký hiệu**. 182.35 "Follow the curve. Follow the law. Follow the reason
through." — ba lần tăng tốc trên beat. 184.40 "What looked like two ideas — was one
idea seen from two views" — màn hình chia đôi nhập lại một.

*(Thực hiện, Kế hoạch 5: lưới neon của hệ G (trang sổ P19 trên nền tối). Camera ngồi trên đường mũ như tàu lượn, nghiêng theo tiếp tuyến. Laser dừng ở v = 4 → ba con dấu ở v = 4, (2, 4), u = 2. Nhánh ma đỏ rời đường cong ở u = 2.2, vồng lên rồi quay đầu cắt lại v = 4 — gạch chéo, rút về. Thầy cầm phấn viết aˣ = y → exactly one x → x = logₐ y; sách giáo khoa (DEFINITION / Memorize.) đóng sập ở "declared", vỡ thành ký hiệu. Ba "Follow": ba cú đẩy camera + sao chổi nhanh dần + chữ CURVE / LAW / REASON. Hai khung mũ | log trượt vào nhập làm một đồ thị có gương — khung mở P23. Tư thế: down → halt → chalk → invite.)*

### P23 `finale` — "Tất cả qua gương" · 186.88 → 208.60 (final chorus — ĐỈNH)
Mọi vật từ P02–P22 quay lại dọc hai bên gương: khối 2³, mặt trời phương trình,
heo đất, động cơ ×/+, hai đường cong. Nhân vật cận mặt hát nhép + pose-jump.
- 186.88 "Run it forward, run it back" — hai sao chổi chạy trên hai đường cong.
- 188.66 "**Fold the graph** — watch them match" — gập lần nữa, lần này **nổ tung
  thành ký hiệu** rồi tụ lại.
- 190.78 "Exponential goes forward" · 193.42 "Logarithm comes back".
- 194.52 "Two directions — one connection".
- 196.84 "No tricks." · 197.78 "No guessing." · 198.42 "No rules falling from the
  sky" — thẻ công thức rơi từ trời xuống, bị đường gương **bật ra**, vỡ vụn.
- 200.08 "Follow what must stay true and the reason comes alive" — mặt trời
  phương trình P06 bừng lên toàn khung.
- 202.96 "Same law." · 204.48 "Different direction." · 205.46 "Same curve." ·
  206.74 "Different reflection." — bốn thẻ lật trên bốn beat, xen vàng/xanh.
- **207.44 "Why does it work?"** — mọi thứ **đứng im**, câu hỏi của kênh hiện
  trắng giữa khung, không hiệu ứng.

*(Thực hiện, Kế hoạch 5 — tách hai cảnh P23 (186.88 → 196.86) và P23b (196.86 → 208.60). Đoàn diễu hành (`finale.js parade`): khối 2³, mặt trời aᵐ⁺ⁿ, động cơ ×→+, chồng xu ×1.07, con dấu LOGARITHM, tờ giấy gập — trôi dọc gương phía vàng, ảnh nhuộm xanh ở phía kia. "Fold the graph": nửa vàng gập qua gương (phép phản xạ thật) rồi nổ ở "match", tụ lại khi "Exponential" vào, nhân vật nhảy. "one connection": dây nối vuông góc gương giữa (u, 2^u) và (2^u, u). P23b: thẻ TRICK / GUESS? bị gạch (halt); thẻ công thức rơi, chạm gương bật ngang sang trái (sky) — vận tốc (0, v) phản xạ qua x + y = c thành (−v, 0); mặt cận trở lại với mặt trời làm bằng mọi đẳng thức của bài sau đầu, bừng tràn khung ở "alive"; hai thẻ lật vàng ⇄ xanh. "Why does it work?": thế giới và nền đông ở mốc câu hỏi, màn tối, câu hỏi trắng không hiệu ứng, nhân vật trầm tư bước ra trước khung đông.)*

### P24 `chant` — "FROM SCRATCH" · 208.60 → 211.46 ✂✂✂
Lead vocal hát **ba** lần (lời gốc ghi hai): 208.60 · 209.54 · 210.58 — ba con
dấu **FROM SCRATCH** đập xuống, mỗi lần một cú cắt cứng, lần sau to gấp đôi lần
trước. Bè vang cùng (backing 209–213) → mỗi con dấu có bản gương xanh. Ruột chữ
lấp toàn bộ phép toán của bài.

*(Thực hiện, Kế hoạch 5: con dấu 150 → 300 → 600 px, ruột lấp mọi đẳng thức của bài (`EQUATIONS`), loé + rung ở mỗi cú cắt; từ con dấu thứ hai có bản gương xanh qua y = x. Không có lời chân khung — con dấu chính là lời.)*

### P25 `hook` — "Hai chiều, một chuyện" · 211.46 → 219.09
Nhân vật cận mặt trên đường gương, hát nhép. 211.46 "Forward —" mũi tên vàng;
212.68 "exponential"; 214.48 "Backward —" mũi tên xanh; 215.46 "logarithm". 216.36
"Two directions" — hai mũi tên. 218.12 "One story" — hai mũi tên cong lại thành một
vòng khép (pose-wave).

*(Thực hiện, Kế hoạch 5: hai cung cùng xuất phát ở 9 giờ — vàng theo chiều kim qua đỉnh (FORWARD · EXPONENTIAL), xanh ngược chiều qua đáy (BACKWARD · LOGARITHM); "Two directions": hai chấm chạy hai chiều; "One story": hai mũi tên gặp ở 3 giờ, vòng khép loé trắng. Không dùng pose-wave: mặt cận giữ tới hết để P26 tan ngược đúng mặt này.)*

### P26 `loading` — "Trở về 99%" · 219.09 → 221.22
219.09 "Ninety-nine percent…" — nhân vật tan ngược thành **chân dung ký hiệu**
(bookend kết), thanh loading hiện lại `99%`. 220.14 "Loading." — giọng máy.

*(Thực hiện, Kế hoạch 5: mặt cận chạy lùi pha "in" (ảnh → cháy trắng → ký hiệu) và trượt về đúng chỗ chân dung P01 (1240, 900, 760); đường quét CRT, thanh loading, LOADING nhấp — vẽ bằng `loading.js` (P01 giữ bản riêng, không đổi pixel).)*

### P27 `outro` — "Khải hoàn, rồi 99.999…" · 221.22 → 239.65 ✂ 227.3 ✂ 238.6
Không phải đoạn lặng: stem cho thấy **đủ band + kèn đồng** (brass chỉ chơi ở đây).
- 221.22 (FX loé 221.49) — **màn chào kết**: mọi vật của bài diễu hành dọc đường
  gương theo beat (khối 2³, mặt trời phương trình, heo đất, động cơ ×/+, hai đường
  cong, con dấu LOGARITHM), nhân vật toàn thân pose-jump ở giữa; credits *99% from scratch*.
- **227.3 nhạc ngắt → khung đông cứng.** 229.48 lead vọng "loading": thanh loading
  hiện lại, con trỏ nhấp một lần.
- 229.5 (FX 230.02) band vào lại: thanh dồn 99.9 → 99.99 → 99.999… chữ số thập
  phân **kéo dài mãi** (vọng P03 — số vô tỉ không bao giờ đủ); kèn gỗ dâng từ 234.
- **236.4 trống và bass tắt, kèn giữ một hợp âm**: mọi thứ đứng im, chỉ còn chữ số
  thập phân tiếp tục mọc.
- **238.6 hợp âm cắt — hard stop: CRT tắt** (ép dẹt → một chấm → đen), ngay trước khi
  thanh chạm 100%. 238.6–239.65 đen.

*(Thực hiện, Kế hoạch 5: màn chào — đoàn diễu hành to và nhanh gấp ba, tên kênh "99% from scratch" ở góc trên-trái (ngoài dải diễu hành). 227.3: thế giới + nền đông, màn tối + quét CRT, nhân vật cầm tách trà bước ra. Chữ số 9 mọc 2.2/s, từ 234 thêm (t − 234)²·9, xuống dòng trước nhân vật. 238.6: CRT ép dẹt → vạch → chấm → đen trong 0.32s.)*

---

## Năng lực engine cần xây (chưa có)

| # | năng lực | dùng ở | ghi chú |
|---|---|---|---|
| 1 | **chuyển chất liệu vào/ra** của nhân vật bằng ký hiệu toán, ≥ 5 kiểu | mọi plate có nhân vật | mở rộng `mascot.mosaic()`; ký tự lấy màu từ ảnh |
| 2 | **chữ decode / vỡ thành ký hiệu** | mọi dòng lời | mở rộng `lyric.js` |
| 3 | **hát nhép**: viseme-1 + mouth-N theo âm vị từ mốc từ | P11, P17, P21, P23, P25 | map chữ cái → khẩu hình |
| 4 | **đường gương y = x** + phản chiếu vật qua nó | P11 trở đi | biến đổi affine qua đường chéo |
| 5 | **gấp giấy 3D** theo đường chéo | P19–P20, P23 | cắt nửa khung, co theo cos(góc), đổ bóng nếp |
| 6 | **ruột chữ lấp chữ nhỏ có nghĩa** | P04, P12, P24 | clip theo glyph |
| 7 | **chân dung ký hiệu** (bookend) | P01, P26 | đã có mosaic — đổi bộ ký tự |
| 8 | bút vẽ theo nét trên giấy | P19 | đã có `chalk()` — đổi màu mực theo nền giấy |

## Kiểm tra trước khi giao

- Mỗi plate: chụp một khung/câu và **nhìn** (`LESSONS.md` §7, §15).
- `tools/check-timing.mjs`: mọi mốc cảnh lệch < 50ms so với mốc từ.
- `tools/review.mjs`: biên độ sáng p95−p5 ≥ 90, YDIF ≥ 1.5 ở 640×360, bão hoà
  đoạn giấy ≤ 6.
- Zoom chất liệu mọi lần nhân vật vào/ra ở 6fps: không có cắt cứng.
