# REFERENCE-TEARDOWN — bóc tách video mẫu, từng lớp (bản 2)

Đối tượng: `Video mẫu.mp4` — lyric MV *"Nothing Went FOOM — a song by claude"*,
300.35s, 1280×720, 30fps. Mascot: cô gái anime tóc cam, kẹp tóc hình `*`, tai
nghe có mic; kèm robot nhỏ "tiny".

**Bản 1 đã sai** (xem §0). Bản này soi lại toàn bộ 300s ở **độ phân giải gốc**:
chuỗi 6fps qua mọi chuyển cảnh, 30fps ở những lần chuyển nhanh, và mọi kết
luận về chất liệu đều dựa trên **ảnh zoom** (crop 240×135, phóng 4×,
`flags=neighbor`). Phương pháp: `reference/METHOD.md`. Dòng thời gian chi tiết
từng cảnh: `reference/segments/a1…a5.md` (mỗi file 60s). Ảnh bằng chứng:
`reference/evidence/` (tên file có mốc giây). Lời + mốc từ:
`reference/lyrics_whisper.json`. Số đo từng khung: `reference/stats.json`
(`[t, YAVG, SATAVG, YDIF]` ở 640×360). Bản 1 lưu ở `.backup-2026-09-30/`.

**Độ tin cậy:** 10 khẳng định chính đã được một agent độc lập kiểm lại trên video
gốc (8 đúng, 1 sửa, 1 không tìm thấy phản ví dụ) — các chỗ nói quá đã sửa. Các
con số đếm (≥30 lần chuyển, ~110 nhịp, ~75% ảnh màu, bước hàng 6.5px) là của
báo cáo từng đoạn, CHƯA được kiểm độc lập.

---

## 0. Bản 1 sai ở đâu, và vì sao

| bản 1 nói | thực tế (có bằng chứng) |
|---|---|
| nhân vật "PNG đặc, nét sạch, KHÔNG hiệu ứng" là mặc định | đúng một nửa: **lúc đứng yên** thường là ảnh màu sạch (~75% thời gian có mặt). Nhưng **mỗi lần vào/ra** đều đi qua một trạng thái ký tự/hạt; nhân vật không bao giờ bị cắt cứng vào/ra |
| "mosaic chỉ một khung, lúc MONSTER" | ≥ 30 lần chuyển chất liệu trong 300s, gần như **mỗi câu hát một lần** |
| mở đầu là nhân vật PNG | 0–1.53s chân dung dựng **hoàn toàn bằng hàng ký tự ASCII** tô màu theo ảnh; cuối bài (298.5–299.6) lặp lại → khép vòng |
| 14 cut / 300s, cảnh dài TB 24s | 14 là số lần `scene>0.25` bắt được. Ý tưởng hình đổi **mỗi ~2.7s** (~110 nhịp hình), hầu như bằng **chuyển mềm 4–10 khung** chứ không phải cắt |
| nền trắng 148–181s | 148.5–190s (~42s, 14%) |
| 9 kiểu chữ | đúng hướng, nhưng thiếu điều quan trọng nhất: **chữ không fade mà decode/scramble**; ruột chữ lớn thường **lấp bằng chữ nhỏ có nghĩa** |

**Vì sao sai:** bản 1 kết luận chất liệu từ ảnh thu nhỏ và lấy mẫu thưa. Ở ô
contact sheet 320px, chân dung ASCII trông y hệt ảnh thường; các lần chuyển chất
liệu chỉ dài 2–18 khung nên lấy mẫu 1fps gần như luôn bỏ lỡ. Các **số đo** (độ
sáng, bão hoà, YDIF ở 640×360) của bản 1 và `VISUAL-RESEARCH.md` thì đúng — đo
lại khớp. Sai nằm ở phần phải **nhìn**.

---

## 1. Nguyên lý bao trùm: THẾ GIỚI LÀM BẰNG CHỮ

Video nói về một AI "được làm từ từ ngữ", và ngôn ngữ hình ảnh bám đúng ý đó:
**mọi thứ có thể tan thành ký tự, và ký tự có thể tụ lại thành mọi thứ.**

- nhân vật: ảnh màu ⇄ hàng/cột ký tự tô màu theo ảnh
- chữ lời: không fade — **decode** (glyph ngẫu nhiên → chốt đúng chữ) và **vỡ
  thành ký tự ngẫu nhiên** khi hết lượt
- chữ lớn, vật thể, nền: **lấp ruột bằng chữ nhỏ có nghĩa**, thường là câu đùa
  liên quan lời hát
- chuyển cảnh: ký tự nổ ra rồi tụ lại thành cảnh mới

---

## 2. Nhân vật — ảnh màu KHI ĐỨNG, ký tự KHI CHUYỂN

### 2.1 Chu kỳ một lần xuất hiện

```
[vào 0.13–0.6s]        →  [đứng: ảnh màu sạch, 2–5s]      →  [ra 0.1–1s]
 hàng ASCII quét            không scanline, không ký tự        tan thành lưới/cột ký tự
 mặt nạ mây mềm             (zoom + FFT theo hàng xác nhận)    hoặc halftone rồi mờ,
 flash / cháy trắng                                            hoặc nổ hạt
```

Đo kỹ ở 0–60s: nhân vật có mặt ~28s, **~75% là ảnh màu**, ~25% đang chuyển chất
liệu. Con số "≥70% ảnh màu" của bản 1 vì thế gần đúng — cái sai là coi 25% còn
lại là không đáng kể. **25% đó chính là dấu ấn của video.**

### 2.2 Các trạng thái chất liệu đã thấy (có zoom)

| trạng thái | mốc (giây) | bằng chứng `reference/evidence/` |
|---|---|---|
| **chân dung ASCII toàn phần** — hàng ký tự bước ~6.5px, mỗi ký tự mang màu ảnh, tông trầm | 0.0–1.53 mở; 298.5–299.4 kết (rồi tan hạt, mờ 299.4–299.7) | `a1_t000.50_face_ascii.png`, `a5_t299.30_face_ascii_crt.png` (tên file có "crt" nhưng CRT chỉ áp cho CHỮ ở 300.1, xem §3.1) |
| **hàng ASCII quét khi vào** | 3.8, 23.17, 33.67, 60.0, 149.5, 212.9 | `a1_t003.80_entry_asciirows.png`, `a3_t149.60_ascii_buildin.png`, `a4_t212.90_mascot_ascii_rows_forming.png` |
| **cháy trắng lộ ảnh màu** — ASCII → bloom trắng ~2 khung → ảnh màu, mép rã hạt | 1.53–1.60, 23.2, 50.35 | `a1_t001.90_face_clean.png` (ngay sau) |
| **mặt nạ mây mềm khi vào** — 3–6 khung; thường ngay sau khi shot trước tan thành cột hạt (cặp ra-vào) | 69.25, 89.95, 99.05, 104.8, 110.33, 115.85, 118.55, 134.7, 144.8 | `a2_t098.88-099.25_entry_puff_seq.jpg`, `a3_t134.67_cloud_reveal_edge.png` |
| **lưới glyph khi ra** — ký tự a/u/v/w lấy độ sáng từ ảnh, xoay 3D rồi bay | 70.5, 74.85, 93.33, 100.33, 107.0, 113.85, 117.2 | `a2_t093.38_exit_ascii_glyphs.png`, `a2_t093.28-093.65_exit_ascii_seq.jpg` |
| **cột chấm/vạch dọc khi ra** — ảnh màu → cột (chủ yếu chấm và vạch, ít chữ cái rõ) trong 2–3 khung, cột mờ 0.5–1s | 17.6, 57.4, 232.6, 249.0, 261.8, 272.2, 279.2, 283.0, 297.2 | `a5_t248.90_seq30fps_glyph_dissolve.jpg`, `a5_t249.10_face_glyphcolumns.png`, `a4_t232.60_mascot_ascii_dissolve.png` |
| **lưới chấm vuông / halftone / ma trận LED** | 24.5, 28.2, 28.85, 78.4, 126.6, 180.3, 189.8 | `a1_t024.50_exit_dotgrid.png`, `a2_t078.40_body_halftone_exit.png`, `a3_t126.70_body_dotmatrix.png` |
| **cột dữ liệu phủ khi rời cảnh** | 192.2 | `a4_t192.17_face_datacolumns.png` |
| **scanline ngang mảnh trên ảnh màu** — THEO ĐỢT, không thường trực | 2.17–2.43; 213–219 dày suốt | `a1_t002.25_hair_scanline.png`, `a4_t214.00_face_scanlines.png` |
| **mép rã hạt** — tóc, tay | 16.3, 21.2, 34.5, 196.5 | `a1_t016.30_hairedge_particles.png`, `a4_t196.50_hairedge_particles.png` |
| **nổ thành cầu sáng + confetti** | 143.8–144.2, 197.8 | xem `segments/a3.md`, `a4.md` |
| **ảnh màu sạch** (đối chứng) | 1.9, 5.2, 40.5, 69.8, 124.5, 136, 161.5, 190.5, 247.8 | `a1_t040.50_face_clean.png`, `a2_t069.80_face_clean.png`, `a3_t136.00_face_clean.png`, `a5_t247.80_face_clean.png` |

Chưa chắc: scanline cực mảnh có thể đã bị nén H.264 xoá ở các shot "sạch". Chỉ
khẳng định được là **không thấy và không đo được** (FFT theo hàng trên da/tóc:
đỉnh/median 4.5–7 lúc sạch, so với 36–154 lúc ASCII).

### 2.3 Luật rút ra

1. Nhân vật **không cắt cứng vào/ra** — trong mọi lần đã soi (~40 lần, gồm 3 lần
   kiểm chứng độc lập chọn ngẫu nhiên), không có phản ví dụ. Chưa soi hết từng lần.
2. Chuyển chất liệu **ngắn**: vào 4–18 khung; ra 2–3 khung đổi + 15–30 khung mờ.
3. Có **≥ 6 kiểu** chuyển, xoay vòng — không lặp một kiểu liên tục.
4. Ký tự của nhân vật **lấy màu và độ sáng từ chính ảnh** — cùng nguồn ảnh, khác
   chất liệu; không phải lớp phủ đơn màu.
5. Chân dung ASCII toàn phần dành cho **mở và kết** (khung sách).
6. Robot "tiny" và các "quái vật" dựng bằng ASCII **thường trực** — tương phản
   với nhân vật chính (ảnh màu khi đứng).

---

## 3. Chữ

### 3.1 Hiện / mất — không bao giờ fade

- **hiện:** gõ phím có con trỏ khối · **decode** (glyph ngẫu nhiên nhảy rồi chốt
  đúng chữ) · bút marker viết theo nét (cây bút bay theo) · từ khoá đỏ hiện nhoè
  như mực thấm rồi nét lại · tụ từ vệt hạt bay vào
- **mất:** cả khối lời **vỡ thành ký tự ngẫu nhiên nhiều màu trong 1–2 khung**,
  ở hầu hết các khối lời chính · riêng dòng cuối "DON'T MAKE ME LAUGH" đứng yên
  rồi tắt kiểu CRT (ép dẹt → một chấm, ~300.1s)
- bằng chứng: `a3_t131.60_text_scramble.png`, `a5_t272.50_text_scramble.png`

### 3.2 Ruột chữ lớn lấp bằng chữ nhỏ CÓ NGHĨA

- `CLAUDE`, `DOOM`, `DANGEROUS`, `FLOOD`, `F✱✱M`, `BOOM`: ruột là hàng chữ nhỏ
  dày đặc (`a2_t066.50_BOOM_text_ascii_fill.png`, `a3_t142.50_foom_charfill.png`)
- `P(DOOM)` lấp "P(DOOM)=99 · TRUST · MODEL · IT'S OVER"; icon pause lấp
  "PAUSE • PAUSE"; áo blouse lấp "97% CONFIDENT · VIBES · SCIENCE-ISH · TRUST ME"
  (`a2_t085.80_labcoat_ascii_phrases.png`); dấu tick lấp "VERIFIED/TESTED/REVIEWED"
  (`a4_t196.50_checkmark_wordfill.png`); ổ khoá lấp code "mutex.unlock", "deny by
  default" (`a4_t230.50_padlock_codefill.png`); FOOM ghép từ gạch nhãn BUILD/LOGIC
- **Chữ lấp ruột có khi là lớp đùa thứ hai**: cụm trên áo blouse, P(DOOM), ổ khoá
  đọc được khi zoom; còn ruột BOOM/F✱✱M ở 720p chỉ là kết cấu chữ nhỏ, không
  đọc được. Tức là: vật thể lớn, ít chữ → câu có nghĩa; chữ khổng lồ → kết cấu.
- Không phải chữ nào cũng lấp: `MASS STARVATION`, `THE END`, `NOBEL`, lời chính
  và chữ viết tay trên bảng trắng có ruột **đặc**. Lấp dành cho **từ khoá lớn**,
  đặc dành cho **câu cần đọc**.

### 3.3 Font và màu

- **mỗi cảnh/thế giới một họ font**: mono terminal · condensed/stencil đậm ·
  serif in hoa (kiểu Trajan) · serif nghiêng · script viết tay · marker (bảng
  trắng) · LED đỏ
- **mỗi dòng một từ khoá đổi màu, thường đổi cả font**: **vàng** = tích cực/nhấn
  (TINY, PROTEINS, TOWN, SUN); **đỏ** = tận thế (STARVE, DOOM, FUNERAL, DIE,
  MONSTER, SHUT IT DOWN); cyan/xanh neon ở vài cảnh; trên bảng trắng luôn đỏ
- `F✱✱M` / `B✱✱M`: chữ O thay bằng ngôi sao 8 cánh (logo)

### 3.4 Chữ là vật thể / không gian

- đường hầm chữ xoáy (HELLO WORLD · ATTENTION · NEXT TOKEN · HARMLESS…), camera
  zoom xuyên qua (3.0, 148.5) — `a3_t148.85_word_tunnel.png`
- mặt trời có tia là dải chữ (7.0), vòng đồng tâm sau lưng nhân vật
  (`a3_t142.50_rays_textstrings.png`)
- tường chữ Hán (`a2_t118.80_hanzi_wall.png`), tường code, sàn phối cảnh phủ chữ,
  hình người/mặt đường ghép từ hàng chữ (`a4_t218.40_mother_textrows.png`)

---

## 4. Nền & không gian

- **luôn ≥ 2 lớp độ sâu**: sàn/mặt nước hạt phản chiếu ở nửa dưới · đường chân
  trời sáng · tia/vòng/đường hầm chữ · bokeh
- vật thể nền phần lớn là **lưới chấm LED / halftone / glyph**: địa cầu, xe,
  quái vật, khung màn hình viền cột ký tự (`a5_t239.20_car_dotgrid.png`,
  `a5_t268.00_monster_glyphs.png`)
- camera luôn chuyển động: zoom xuyên, whip pan, ngửa lên, đẩy vào

### Các "thế giới" — mỗi thế giới một bảng màu, một font, một kiểu chuyển

| đoạn (s) | thế giới | chuyển bên trong |
|---|---|---|
| 0–148 | tối, nâu-đỏ-vàng; terminal, đường hầm chữ, sân khấu | ký tự nổ → tụ lại, tan hạt, zoom xuyên |
| **148.5–190** | **bảng trắng 3D** — marker đen, điểm đỏ, bão hoà ~3 | lời scramble → **whip pan ngang** sang bảng kế, mỗi 3–4s |
| 191.7–205.8 | blueprint xanh, nhãn "SHEET 0X/08" | vật vỡ hạt → hạt tụ thành vật sau |
| 205.8–229 | phòng chờ ASCII tím → hoàng hôn biển | tan hạt |
| 229–241 | tường code → con đường & xe | camera ngửa, tường gập thành mặt đường |
| 241–300 | tím-hoàng hôn, sân khấu, điệp khúc F✱✱M | nhân vật tan cột ký tự; kết bằng ASCII + CRT tắt |

Cú chuyển bảng trắng → blueprint (191.67) là morph: chữ giữ nguyên chỗ, chỉ đổi màu.

---

## 5. Nhịp & chuyển cảnh

- **~110 nhịp hình / 300s** → ý tưởng hình đổi mỗi ~2.7s, xấp xỉ **mỗi câu hát một ý**
- **cắt cứng hiếm**, và khi có thì gắn với **một vật đập xuống** (con dấu
  "DIDN'T HAPPEN" 10.17, tem "RIGHT ✓" 48.4) hoặc flash trắng 2 khung
- còn lại: morph, tan hạt, whip pan (thực chất là xoay/trượt bảng có phối cảnh 3D
  kèm mờ chuyển động, 8–10 khung), zoom xuyên,
  block-mosaic (60.58–60.85: màn hình vỡ thành khối, tụ lại thành điện thoại —
  `a2_t060.58-060.95_mosaic_block_morph_seq.jpg`)
- `scene>0.25` chỉ bắt 14 lần, `scene>0.4` chỉ 3 → **chỉ số scene-cut không đo
  được nhịp của video này**; phải xem chuỗi 6fps

---

## 6. Độ sáng & màu (đo lại, khớp bản 1)

| chỉ số | giá trị |
|---|---|
| YAVG trung vị / p5 / p95 | 74.2 / 35.6 / 197.3 |
| SATAVG trung bình | 14.3 |
| YDIF trung vị (640×360) | 5.49 |
| khung YAVG > 120 | 15.4% |
| đảo nền trắng | 148.5–190s, YAVG ~194, **SATAVG tụt ~15 → ~3** |

---

## 7. Bảng kiểm khi dựng MV mới

| hạng mục | chuẩn từ video mẫu | cách kiểm |
|---|---|---|
| nhân vật vào/ra | qua chuyển chất liệu, không cắt cứng (không thấy ngoại lệ) | xem 6fps mọi lần vào/ra |
| kiểu chuyển chất liệu | ≥ 4 kiểu, xoay vòng | liệt kê |
| nhân vật khi đứng | ảnh màu sạch, rõ | zoom |
| chữ lời | decode khi hiện, scramble khi mất — **không fade** | xem 6fps |
| từ khoá lớn | lấp ruột bằng chữ nhỏ có nghĩa | zoom |
| từ khoá màu | 1 từ/dòng, màu theo nghĩa (tốt/xấu) | nhìn |
| nhịp hình | ~1 ý / câu hát | đếm |
| cắt cứng | chỉ khi có vật đập xuống | xem 6fps |
| đảo nền | 8–15% thời lượng, bão hoà tụt | `signalstats` |
| lớp nền | ≥ 2 độ sâu | nhìn |
| mở / kết | khung sách cùng một chất liệu | nhìn |

**Luật phương pháp:** mọi kết luận về chất liệu phải có ảnh zoom khung gốc làm
bằng chứng. Contact sheet chỉ dùng để định vị.

---

## 8. Điều video mẫu làm mà mascot-mv CHƯA có

Theo mức độ là dấu ấn:

1. **Chu kỳ vào/ra bằng chuyển chất liệu** cho mọi lần nhân vật xuất hiện
   (hiện tại `mascot.mosaic()` chỉ được phép như sự kiện hiếm)
2. **Chữ decode / scramble** thay cho fade
3. **Ruột từ khoá lấp bằng chữ nhỏ có nghĩa** (lớp đùa thứ hai)
4. **Chân dung ký tự làm khung sách** mở/kết
5. Chữ là không gian (đường hầm chữ, tường chữ) và vật thể nền bằng glyph
