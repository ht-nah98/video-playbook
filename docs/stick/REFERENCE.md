# REFERENCE — video mẫu người que và cách dùng

Video mẫu là của người khác: repo **không** giữ khung hình — chỉ mốc giờ + mô tả; ảnh dựng lại bằng công cụ (ra `out/_lab/`).
Tải mẫu: **tối đa 1–2 video một buổi** (yt-dlp từng bị chặn IP — LESSONS §160, AGENTS); không cookie tài khoản.

## 1. Kho mẫu

| slug | video | đường dẫn local | màu (`--color`) | ghi chú |
|---|---|---|---|---|
| `coding` | Alan Becker — Animation vs. Coding (9:27, 24 fps) | `~/Downloads/Animation vs. Coding.mp4` | `yellow` | người dùng gửi 2026-10-26; đầu đặc |
| `math` | Alan Becker — Animation vs. Math (tải 2026-10-26, id `B1J6Ou4q8vE`) | `~/Downloads/becker-ref/Animation vs. Math.mp4` | `orange` | đầu RỖNG như nhân vật ta — mẫu tỉ lệ gần nhất |
| `fight` | STRENGTH VS SPEED Round 2 (StickNodes) | `~/Downloads/STRENGTH VS SPEED_ ROUND 2 _ StickNodes.mp4` | — | đánh nhau, study 10 |
| `faces` | Faces — An Actual Short | `~/Downloads/Faces - An Actual Short.mp4` | — | biểu cảm đầu–vai–thân |

## 2. Công cụ

```bash
python3 tools/study/stick_ref.py "<video>" --slug coding --color yellow --every 2.5   # bảng dáng có mốc → out/_lab/stick-ref/coding/
python3 tools/study/stick_ref.py "<video>" --slug coding --at 12.5,61.5               # khung gốc đúng mốc (đo tỉ lệ)
python3 tools/study/stick_dict_pairs.py                                               # cặp mẫu ↔ từ điển ta
```

## 3. Mốc đáng học

**Coding** (giây trong video gốc):
- 3–15 tỉnh dậy → nhặt laptop (đã làm lại: `tools/lab/becker-redo.html`, giờ ta = giờ gốc − 3)
- 18.25 NameError: giật mình 1 khung · 34.5 chữ "hi" đập mặt, loạng choạng · 37–45 quỳ gõ, copy · 47–60 dán, biến a
- 157–165 bị bắn văng: thân nằm ngang, chi kéo dài thành vệt (smear) · 187–210 chạy nước rút, nhảy
- 215 vác laptop như khiên · 235 treo trên cột · 300–315 đẩy khối đỏ · 350–352 vác qua đầu, trụ chân
- 390–395 nằm chống, ngồi ôm laptop · 432–452 quỳ gót, gục đầu (buồn → bình tâm) · 500+ cận cảnh ôm laptop

**Math**:
- 4 ngồi bó gối · 12 gãi đầu · 24 che mặt · 28 nhún vai · 40 giơ hai tay · 68 đứng mở · 72 ngồi co ro · 88 chống cằm
- 112 bò · 128 chỉ · 220 tựa khoanh tay chân chéo · 256–260 ngã sấp, bò · 280/312 né · 320–332 cầm quả bóng
- 444–448 lao, ném (thế chân rất rộng)

## 4. Còn nên học (khi có mẫu)

Walk cycle chuẩn Becker (study 08 có số đo walk khung 0:55), nhảy + tiếp đất (squash), smear khi văng, cận cảnh mặt
(Faces). Mỗi lần thêm mẫu: ghi một dòng vào §1 và mốc vào §3.
