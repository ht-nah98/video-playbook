# 11 — lemo-opuscar: thư viện 59 phong cách phim dựng bằng code (LemoLab)

Người dùng 2026-10-23: "repo siêu hay… giúp bổ não, giúp đạo diễn có nhiều ý tưởng, nhiều sáng tạo, nhiều cách triển khai…
nghiên cứu thật kĩ, hình như cài vào claude được… xem có thể tích hợp, sử dụng hoặc tối ưu". Nguồn:
<https://github.com/lemomo-ai/lemo-opuscar> (commit `3961ddb`, 2026-10-22; ~5.9k sao). Bản clone đọc ở scratchpad (187 MB,
không chạy code, không commit). Giấy phép: **code + tài liệu MIT**; phim / ảnh demo CC BY 4.0 (ghi công LemoLab); 3 giọng đọc
loại trừ.

## 1. Nó là gì

Một **plugin Claude Code** (`claude plugin marketplace add lemomo-ai/lemo-opuscar` → `claude plugin install
lemo-opuscar@lemolab`) + thư viện: chọn một phong cách, đưa đề tài, agent đạo diễn, vẽ, soạn nhạc, trộn — phim 30–60 s,
1920×1080 @ 24 fps, mỗi phim 30–60 phút. Không model video, không stock.

| phần | nội dung | so với ta |
|---|---|---|
| `DIRECTOR.md` (137 dòng) | đạo diễn: benchmark trước, 3 cấu trúc ứng viên, shot list có LÝ DO, beat sheet, cue map, bảng âm thanh; ≥ 4 kiểu camera + 1 signature shot; ≥ 2 khoảng lặng thật; âm thanh làm chuyển cảnh (J/L-cut) ≥ 2 lần; giữ chữ ≥ chữ/15 + 1.5 s; "không lặp demo" ≥ 4/6 khác | ta có SCRIPT → DNA → plates, nhưng KHÔNG có shot list / cue map / bảng âm thanh / luật camera + khoảng lặng bằng số |
| `TECHNIQUE.md` (162 dòng) | một timeline nuôi hình + nhạc + tiếng + phụ đề; trang `render(t)`, `EV`, `TEXTS(t)`; render nhiều worker, ảnh JPEG; grain thêm ở ffmpeg | kiến trúc **giống hệt ta** (render(t) tất định, headless, timeline một nguồn) — ta đi đúng đường |
| 61 `styles/<slug>/STYLE.md` (~11 mục chuẩn) | bản chất + "không phải là", chất liệu, **logic màu**, chữ, chuyển động, **bảng ngữ pháp camera (động tác → ý nghĩa → dùng khi)**, bảng âm thanh, **"native moves" kèm "hợp với nội dung như…"**, bẫy, không gian biến thể | tương đương `DNA.md` của ta nhưng chuẩn hoá + có thực đơn ý tưởng — đây là phần "bổ não" |
| `DEMO.md` + `demo/` mỗi style | cách làm demo, bẫy đã gặp, engine (bút whiteboard giải tốc độ cho kịp chữ, rig nhân vật, khẩu hình…) | như `LESSONS` + lab của ta, theo từng phong cách |
| `MY-STYLES.md` | tự tạo phong cách: thay đổi chia 3 nhóm (an toàn / đổi tính cách / không được đổi), ≤ 5 thay đổi / vòng, `CHANGES.md`, khung so với gốc, demo 15–30 s | quy trình 3 lab DNA của ta, nhưng có khung quyết định rõ hơn |
| `core/audio/sfx.py` | tiếng hiệu ứng **tổng hợp bằng code** theo chất liệu (click, gỗ, giấy, kim loại…) đặt đúng khung từ `EV` | ta dùng 17 loại file CC0 — ít biến thể, không theo chất liệu từng DNA |
| `core/audio/sampler.py` + `pluck.py` | **nhạc gốc** từ thư viện nhạc cụ miễn phí (VSCO 2 CE, VCSL, Salamander…), viết theo cue map, khớp nhịp hình | ta dùng lại bản Suno cũ — không bám nhịp hình |
| `core/render/readcheck.mjs` | kiểm MỌI dòng chữ trên hình giữ đủ lâu để đọc | ta chưa kiểm (chỉ phụ đề) |
| `core/render/video.mjs` | 3–6 worker, mỗi worker một trình duyệt, JPEG → ffmpeg, nối không mất | `shoot.js` một trình duyệt, PNG — chậm hơn nhiều |
| pictogram-motion `demo/poses/` | **70 tư thế người que thể thao** khoá theo nhịp, quy ước góc gần `engine/stick.js` (từ thẳng xuống, 90° = trước) | thư viện tư thế người que khăn đỏ đang 34 + vài dáng tự chế |

Hình (`docs/frames/`): whiteboard, one-line, crayon, dataviz, isometric, pictogram, rubber-hose, sci-fi toon, Swiss,
pop-up giấy, engraving, microgame — chất lượng cao, mỗi cái một ngữ pháp riêng. Nhiều hướng **trùng với lab DNA ta đã
tự đi** (engraving, riso, gameshow, kính màu, bảng dựng hình) → xác nhận cách làm, và họ đã viết sẵn bẫy + thực đơn.

## 2. Kiểm an toàn trước khi cài

`plugin/skills/lemo-opuscar/scripts/setup.sh`: `git clone --sparse` vào `~/lemo-opuscar`, `npm install`, Playwright
chromium headless, `.venv` Python; tầng voice tải Kokoro (~0.55 GB), nhạc cụ 70–400 MB / bộ. Không sudo, không sửa hệ
thống; mọi thứ trong `~/lemo-opuscar`. Gỡ: `claude plugin uninstall` + xoá thư mục. Plugin tự cập nhật thư viện mỗi phim
(`git reset --hard` trong clone của nó) — chỉ nên đọc, không sửa trong đó.

## 3. Ba cách tận dụng (đề xuất — chờ người dùng chọn)

**A. Dùng như THƯ VIỆN Ý TƯỞNG trong quy trình của ta (khuyên).** Không đổi engine; bổ não ở bước DNA + đạo diễn:
1. Bước DNA (`lesson-video`): trước 3 lab, đọc 3–5 `STYLE.md` gần đề tài — lấy *bản chất*, *native moves* hợp nội dung,
   *ngữ pháp camera*, *bẫy*; mỗi lab ghi "technique base: <slug>" (như MY-STYLES). Ví dụ probability: whiteboard
   (viết đúng lúc lời đọc, bút dẫn camera), dataviz, microgame.
2. Đưa khung đạo diễn vào `templates/lesson/`: shot list có lý do, cue map, bảng âm thanh; luật số: ≥ 4 kiểu camera,
   1 signature shot, ≥ 2 khoảng lặng, J/L-cut, "không lặp bài trước" ≥ 4/6.
3. Port công cụ MIT (ghi bản quyền): `readcheck` (ta lộ `window.__intro.texts(t)` từ kit) vào `shoot.js check`;
   ý tưởng render nhiều worker + JPEG cho `shoot.js video` (ta render 60 fps — dễ nhanh gấp 3–4 lần).
4. Thư viện tư thế: chuyển 70 tư thế pictogram sang quy ước `engine/stick.js` (cẳng tay / cẳng chân của họ là góc TUYỆT
   ĐỐI, ta là tương đối) → bàn thử, gác `stick2-qa`, người dùng duyệt clip.

**B. Cài plugin để làm phim ngắn ngoài quy trình bài học.** Shorts, teaser, intro, MV ngắn theo phong cách thư viện
(vd. Shorts dọc 1080×1920 bằng `--size`). Đánh đổi: hai hệ song song (giọng Kokoro ≠ OmniVoice của kênh, 24 fps ≠ 60, không
người que / mascot của ta) — dùng cho thử nghiệm, không thay quy trình bài học.

**C. Âm thanh gốc.** Thử `sfx.py` (tiếng theo chất liệu DNA) + `sampler.py` (nhạc gốc theo cue map của bài) trên một
bài — thay Suno dùng lại. Cần tầng `deps music` + 1–2 bộ nhạc cụ; mốc nhạc khớp hình là điểm ta đang yếu (§146 người
xem không quay lại — nhịp hình / âm thanh là một nghi phạm).

## 4. Không bắt chước
Ký hiệu / tên LemoLab trong phim của ta; truyện, cảnh, giai điệu của demo (`DIRECTOR.md` §12 cũng cấm); 24 fps cho người
que (người dùng chọn 60); phim 30–60 s làm khuôn cho bài 10 phút — bài giảng có lời đọc dài cần nhịp riêng (study 10 §4,
CRAFT §7); ba giọng loại trừ khỏi CC BY.

## 5. Người dùng chọn A + B + C (2026-10-23) — đã làm

- **B** plugin đã cài (`lemo-opuscar@lemolab`, phạm vi user) + thư viện `~/lemo-opuscar` (lõi deps đã cài, 265 MB);
  `/lemo-opuscar:lemo-opuscar` dùng được sau khi khởi động lại Claude Code.
- **A** khung đạo diễn: `templates/lesson/DNA.md` §0 technique base (đọc `~/lemo-opuscar/styles`), `templates/lesson/SHOTS.md`
  (shot list có lý do, cue map, khoảng lặng, bảng âm thanh, ≥ 4/6 khác bài trước); playbook + skill `lesson-video`.
- **A** `shoot.js readcheck` (chữ giữ đủ lâu để đọc; skill `lesson-qa`) — probability p2: 45/348 mẩu ngắn, phần lớn thật.
- **A** 70 tư thế thể thao → `engine/poses-sport.js` (người dùng: "đưa cả bộ vào"; bảng `tools/lab/sport-poses.html`, giống pixel sau khi chuyển; sau đó test từng mục bắt highjump trống + 2 tư thế cộng dồn vòng → sửa, LESSONS §154; dựng lại: `tools/lab/picto-extract.mjs`).
- **C** (người dùng: "nhạc gốc vẫn là nhạc của chúng ta nhưng tiếng hiệu ứng theo chất liệu hay nhé") →
  `tools/sfx/material.py` (bộ `paper`), `mix.py --lib`, `build.py`; A/B `out/_lab/sfx/probability-paper-AB.wav` — người dùng: "mới hay hơn, dùng" → mặc định mỗi bài.
- Bài học của đợt: LESSONS §154 (nhập thư viện tư thế), §155 (readcheck), §156 (tiếng tổng hợp). Test: `tools/test/hero.test.mjs`,
`tools/sfx/test_material.py`.

Còn chờ: render nhiều worker cho `shoot.js video` (họ: 3–6 trình duyệt + JPEG); thêm chất liệu (gỗ, kính, phấn, kim loại).

## 6. Cách dùng (sau khi khởi động lại Claude Code)

| muốn | làm |
|---|---|
| ý tưởng DNA cho bài mới | đọc `~/lemo-opuscar/styles/README.md` → 3–5 `styles/<slug>/STYLE.md` gần đề tài (bản chất, native moves, camera, bẫy); ghi "technique base" ở `DNA.md` §0 — skill `lesson-video` đã dặn |
| đạo diễn sau DNA | `templates/lesson/SHOTS.md` (tạo sẵn khi `tools/new-lesson.sh`) |
| chữ có kịp đọc không | `node engine/render/shoot.js readcheck --page projects/<p>/p2.html` (cảnh báo; `--strict` mã 1) — skill `lesson-qa` |
| tiếng hiệu ứng theo chất liệu | `python3 tools/sfx/material.py <p> --material paper` (chất liệu mới → thêm vào `material.py` + A/B cho người dùng nghe); `build.py` tự dùng |
| tư thế thể thao cho người que | `import { sport } from 'engine/poses-sport.js'` → `{ ...P.stand, ...sport('javelin') }` (dx/dy = dời hông theo chiều cao); hành động mới vẫn gác `stick2-qa` + clip duyệt |
| phim ngắn theo phong cách thư viện (Shorts, teaser — ngoài quy trình bài học) | `/lemo-opuscar:lemo-opuscar` trong Claude Code; giọng Kokoro, 24 fps, không người que / mascot của ta → chỉ thử nghiệm |
| cập nhật / gỡ | `claude plugin update lemo-opuscar@lemolab` · `claude plugin uninstall lemo-opuscar@lemolab` + xoá `~/lemo-opuscar`; KHÔNG sửa trong `~/lemo-opuscar` (plugin `git reset --hard`) |

Còn chờ: render nhiều worker cho `shoot.js video`; thêm chất liệu (gỗ, kính, phấn, kim loại).
