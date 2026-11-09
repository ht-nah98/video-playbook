# SYNC — đồng bộ chữ, hình và nhạc

Đo trực tiếp trên video mẫu ở độ phân giải 1/6 giây. Đây là phần quyết định
video có "khớp" hay không.

---

## 1. Chữ gõ theo KÝ TỰ, không theo từ

Đo đoạn 54.0–55.8s (1.83 giây liên tục):

```
54.000  ME
54.167  MEOL
54.333  MEOLD
54.500  MEOLD S
54.667  MEOLD SU
54.833  MEOLD SUN C
55.000  ME OLD SUN COM
55.167  ME OLD SUN COMING
55.333  AME OLD SUN COMING
55.500  AME OLD SUN COMING U
```

**14 ký tự / 1.83s = 7.6 ký tự/giây = 131 ms mỗi ký tự.**

Đổi ra từ: ~0.59s cho một từ tiếng Anh trung bình (4.5 ký tự) — khớp nhịp rap
2–4 từ/giây.

### Cách làm đúng

```js
// SAI: hiện cả từ khi tới mốc
if (t >= word.start) drawWord(word.w);

// ĐÚNG: gõ từng ký tự, tốc độ suy từ độ dài từ và thời lượng hát nó
const k = clamp((t - word.start) / (word.end - word.start));
const n = Math.ceil(word.w.length * k);
drawWord(word.w.slice(0, n));
```

Tốc độ **không phải hằng số** — nó là `độ_dài_từ / thời_lượng_hát_từ_đó`, lấy
từ `music.json` → `words[i].start/end`.

---

## 2. Từ khoá đổi màu NGAY khi gõ xong, không đợi hết câu

`SUN` chuyển vàng ngay ở khung ký tự cuối của nó xuất hiện. `MONSTER` chuyển đỏ
tương tự.

```js
const done = t >= word.end;
g.fillStyle = word.key ? (done ? C.goldHot : C.gold) : C.bone;
```

→ Mỗi câu nên có **1–2 từ khoá** đổi màu. Không phải mọi từ.

---

## 3. Dòng chữ TRƯỢT khi dài ra

Khi câu dài thêm, cả dòng trượt sang trái để từ mới luôn ở vị trí dễ đọc.
Trong đoạn đo: `ME` ở giữa khung → `AME OLD SUN COMING U` đã trượt hẳn sang trái.

→ Neo dòng chữ theo **từ đang gõ**, không neo theo mép trái cố định.

---

## 4. Hai hệ nhịp — đã đo, không phải giả định

Trên bài 99%: chỉ **22%** số từ rơi trong 80ms của một beat.

| bám gì | dùng | lý do |
|---|---|---|
| chữ, sự kiện nội dung | `vox.wordAt()`, `words[i].start` | giọng rap chạy tự do trên nhịp |
| nền, lưới, hạt, HUD | `beat.onBeat()`, `beat.beatIndex()` | nhạc nền bám nhịp chặt |
| cắt cảnh, cú đóng | `onsets.kick`, `downbeats` | cú sốc phải rơi vào trống |

Dùng một hệ cho cả hai thì hoặc chữ lệch lời, hoặc nền mất nhịp.

---

## 5. Bảng tra: sự kiện nào bám nguồn nào

| sự kiện hình | nguồn thời gian trong `music.json` |
|---|---|
| chữ bắt đầu hiện | `words[i].start` |
| chữ gõ xong | `words[i].end` |
| từ khoá đổi màu | `words[i].end` |
| cảnh bắt đầu | `lines[j].start` hoặc `sections[k].start` |
| cắt cứng | `downbeats` gần nhất |
| rung khung, đóng dấu | `onsets.kick` |
| lật, whip-pan | `onsets.snare` |
| nhấp nháy dày | `onsets.hat` |
| nền trôi, lưới chạy | `beat.onBeat(t)` |
| độ đậm chữ | `env.vocal[floor(t*100)]` |
| scale/zoom theo bass | `env.low[floor(t*100)]` |
| hình thở, không chữ | `vocal_gaps` |

---

## 6. Ngưỡng kiểm

| chỉ số | mục tiêu | công cụ |
|---|---|---|
| lệch mốc cảnh | < 120 ms | `tools/review.mjs` |
| lệch mốc từ | < 50 ms | forced alignment đã đảm bảo |
| tốc độ gõ | 6–9 ký tự/giây | đếm tay trên ảnh 1/6s |

**Cách kiểm nhanh bằng mắt:** chụp khung cách nhau 1/6 giây ở một đoạn có chữ,
ghép thành lưới. Nếu chữ nhảy cả từ một lúc → sai. Phải thấy từng ký tự.

```bash
for i in $(seq 0 11); do
  t=$(python3 -c "print(START + $i/6)")
  ffmpeg -v error -y -ss $t -i video.mp4 -frames:v 1 -vf "crop=iw:ih*0.22:0:0" t$i.jpg
done
ffmpeg -y -i t%d.jpg -vf "tile=2x6" grid.jpg
```
