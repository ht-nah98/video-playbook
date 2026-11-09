# Làm một MV mới — playbook

Quy trình đã chạy trọn hai lần: `projects/mv/exp-log` ("Ninety-nine percent", 239.65s, 27 cảnh, 5 kế hoạch) và
`projects/mv/add-it-up` ("Add It Up", 233.2s, 24 cảnh, một ngày, xưởng in riso). Mỗi pha
có đầu vào, lệnh, và điều kiện xong. Chi tiết kỹ thuật: `docs/ENGINE.md` (engine), `docs/mv/PIPELINE.md` (bóc nhạc),
`docs/LESSONS.md` (sai lầm đã trả giá).

## Chọn công nghệ: cân nhắc 3D trước (chốt 2026-10-09)

MV ca nhạc mặc định cân nhắc **3D** — `studio3d/` (TypeScript + three.js, bun + Vite; mẫu p(doom), `studio3d/README.md`,
`studio3d/docs/ENGINE.md`). Chọn 2D (`engine/`, như exp-log, add-it-up) khi DNA cần chất liệu phẳng (giấy, riso,
nhân vật PNG) — ghi lý do vào TREATMENT. Video bài học luôn 2D. Playbook 5 pha dưới đây viết cho 2D; với 3D, pha nội
dung (DNA, TREATMENT, bóc nhạc) giữ nguyên, pha code/render theo `studio3d/`.

## Cần người dùng đưa

| bắt buộc | dạng | ghi chú |
|---|---|---|
| bài hát | `.mp3`/`.m4a` | Suno: xuất thêm **stem** (12 file `.wav`) — nguồn mốc nhạc cụ và hát nhép |
| lời gốc | `.txt`, có tag `[Section]` | mỗi câu một dòng; lời có thể ghi sai số lần hát — sẽ phân xử |
| nhân vật | ảnh tư thế, bảng miệng | danh mục `assets/character-v2/POSES.md`; chỉ chọn vài tư thế hợp lời, đủ tạo điểm nhấn, không nhồi hết; tách nền bằng `tools/cutout/cutout.py` |

Nên có: ảnh phong cách tham khảo, câu muốn nhấn, tỉ lệ khung.

## Mỗi MV một DNA — chỉ quy trình là dùng lại

exp-log là kinh nghiệm của MỘT video. MV sau có DNA và phong cách đạo diễn riêng, hợp với lời và hình của nó —
không ép theo exp-log (`docs/DNA.md`: cái gì dùng lại, cái gì viết mới). Cái dùng lại là playbook này, engine,
`tools/qa`, `tools/analyze`, và các bẫy trong `LESSONS.md`.

Cách làm việc với người dùng (đúng cho mọi MV): người dùng giao quyền đạo diễn hình ảnh — tự quyết, ghi lý do
vào TREATMENT; mọi kỹ thuật linh hoạt, phục vụ lời và câu chuyện; không làm lại việc đã xong; báo cáo bằng tiếng
Việt. Ví dụ lựa chọn đạo diễn của exp-log (KHÔNG phải luật): nền là thế giới có vật sống qua các cảnh; đoạn lặng
chỉ trôi nhẹ, cú nổ mới bật camera/hiệu ứng (`projects/mv/exp-log/DNA.md`).

## Pha 0 — Khung project (5 phút)

```bash
tools/new-mv.sh <tên> "<Tên bài>" <thời lượng> <bpm> <downbeat>   # templates/mv → projects/<tên>
```
Chép audio vào `projects/<tên>/audio/`, stem vào `audio/stems/` (gitignore), lời vào `lyrics.raw.txt`.

## Pha 1 — Dữ liệu (≈ 30 phút)

Theo bảng trong `tools/analyze/README.md` § Pipeline dữ liệu: `run.sh` → `lyrics_map.py` → `ctc_check.py` →
phân xử tay `overrides.json` → `overrides.py` → `stems.py` → `vox_env.py`. Xong khi:
- `data/timeline.txt` đọc khớp tai nghe ở mọi câu (đặc biệt câu lặp, câu ghi sai số lần);
- `data/stems.json` có, và đã lập **bản đồ năng lượng** từ stem (không đo RMS mix — LESSONS §21);
- đoạn hô / hook dồn từ đã đếm lại trên đường bao lead + backing (lời gốc Suno đếm sai 2 bài liền — LESSONS §27).

## Pha 2 — DNA + TREATMENT (duyệt trước khi code)

1. `projects/<tên>/DNA.md` (khung có sẵn, 9 câu hỏi của `docs/DNA.md`) — viết TỪ lời và chất liệu hình của bài này.
   Chất liệu mới: dựng bàn thử (`tools/lab/*.html`), chụp 3–4 **khung phong cách** thật → `projects/<tên>/styleframes.jpg`
   (người dùng duyệt nhanh nhất khi NHÌN — LESSONS §31). Chỉ số sàn đặt sau khi đo một đoạn thử (§28).
   Nhân vật: chọn ít tư thế từ `assets/character-v2/POSES.md`, mỗi tư thế gắn một câu (add-it-up: 6 + mặt hát nhép, ~19%).
2. `projects/<tên>/TREATMENT.md` — bản đồ năng lượng (từ stem) → hình phải làm gì; danh sách cắt cứng; từng cảnh:
   câu lời → ý nghĩa → kỹ thuật → vì sao kỹ thuật đó nói đúng ý đó. Mẫu đã dùng thật: `projects/mv/exp-log/TREATMENT.md`.

**Người dùng duyệt** cả hai rồi mới code.

## Pha 3 — Dựng theo từng đoạn bài (lặp lại cho mỗi đoạn ~20–40s)

Mỗi đoạn là một "kế hoạch" (`projects/<tên>/plans/`). Vòng đã chạy 5 lần ở exp-log:

1. **Nháp ở bản sao.** `rsync -a --exclude .git --exclude out <repo>/ <scratch>/mN/`; dựng các cảnh của đoạn ở đó.
2. **Chụp mỗi câu một khung và NHÌN** (`tools/qa/stills.sh`, `tools/qa/sheet.py`). Sửa tới khi từng câu đọc được ý.
   Ở độ phân giải gốc: chữ trong vùng an toàn (x 96–1824, y 64–1016), lời không đè lên nhân vật (LESSONS §32).
   Đặt hiệu ứng bằng SỐ trước (khoảng trống, va chạm với nhân vật/lời — LESSONS §14).
3. **Kiểm nháp:** `tools/qa/determinism.sh`, `python3 tools/qa/seams.py <p> <các mốc vào cảnh>` (nhìn tờ xem).
4. **Viết kế hoạch** nhúng NGUYÊN VĂN code nháp (task = một cảnh hoặc một module; mỗi task có mốc chụp + kỳ vọng).
5. **Thực thi trong repo:** mỗi task chép code, chụp đúng các mốc, `tools/qa/same.sh` với ảnh nháp → `SAME` thay
   cho xem lại; commit; ghi sổ.
6. **Review độc lập** (model mạnh nhất) trên cả nhánh — luôn bắt được chỗ tắt cứng ở ranh giới cảnh (3 lần liền).
   Sửa, chụp cặp khung trước/sau, `golden.sh save` nếu cố ý đổi hình.
   Lối nhẹ hơn (add-it-up, khi cả bài một người dựng liền một mạch): dựng thẳng trên nhánh riêng theo từng đoạn,
   mỗi đoạn chụp một khung/câu + NHÌN rồi commit; bỏ bước nháp-ở-bản-sao và kế hoạch nhúng code. Bù lại BẮT BUỘC
   `python3 tools/qa/lookups.py <tên>` (câu lặp — §25) và review độc lập trước render (§29).
7. **Render đoạn** (`tools/render.sh part <tên> A B` → `out/<tên>/parts/`) và ghép (`tools/render.sh final <tên>`) — mỗi khung là hàm thuần của t nên
   đoạn render riêng ghép liền từng bit. Trước khi ghép: `golden.sh check` chứng minh phần cũ không đổi.

## Pha 4 — Bàn giao

```bash
tools/render.sh full <p> 53.5,112.86,…   # trọn bài: chia ở chỗ cắt cứng, chạy song song, ghép (Opus → AAC, §22)
# (hoặc từng đoạn: render.sh part … rồi render.sh final <p>)
node tools/review.mjs out/<p>/<p>.mp4                                                       # 8 chỉ số
ffmpeg -i out/<p>/<p>.mp4 -vf fps=6,scale=192:-1,tile=20x26 -frames:v 1 out/_lab/sheet.jpg  # nhìn cả bài
tools/qa/golden.sh save <p>     # chốt ảnh chuẩn cho mọi refactor sau
tools/qa/clean.sh <p>           # DỌN: xoá out/_lab và parts/ — chỉ còn out/<p>/<p>.mp4
```
Xong khi `out/` chỉ còn `out/<p>/<p>.mp4` cho mỗi bài. Bản cuối không commit (`out/` bị gitignore).

## Chỉ số còn nợ

| | exp-log (6/8) | add-it-up (5/8) | video mẫu |
|---|---|---|---|
| YDIF (640×360) | 0.69 | 0.40 | 5.49 |
| % pixel đổi/khung | 6.1% | **52.3%** (đạt) | 32.4% |
| nền sáng / biên độ sáng | đạt | 95% / 74 — do chọn nền giấy (§28) | — |

add-it-up kéo được "% pixel đổi" nhờ phủ mực toàn khổ, nạp giấy và dải lớn quét ngang; YDIF trung vị vẫn thấp vì
phần lớn khung là vật nhỏ động trên tờ giấy đứng.

Nền mờ trôi không kéo được hai chỉ số này (đã thử ba lần ở 99-intro). Cần **vật thể lớn, tương phản cao chuyển
động qua khung** ở các cú nổ — `typeobj.textWall/textPlane`, camera bay qua vật (LESSONS §11, `VISUAL-RESEARCH.md` §8).
Chỉ số không đo được ý nghĩa: đừng đổi một cảnh có nghĩa lấy số.
