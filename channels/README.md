# Kênh — mỗi kênh một thư mục

Repo làm video cho BA kênh. Quy trình, engine, công cụ dùng chung (`docs/`, `engine/`, `tools/`); cái gì của RIÊNG một
kênh (giọng, intro, tên trên biển cuối, luật viết lời, danh sách video, nhân vật) nằm ở `channels/<kênh>/`.

**Một quy ước cho mọi kênh (từ 2026-10-24):** `projects/<kênh>/<bài>` ↔ `out/<kênh>/<bài>` (bài đã đăng:
`out/<kênh>/<bài>_public`), ảnh kiểm tra / golden / log của bài trong `out/<kênh>/<bài>/qa/`. Bàn thử chung (không
thuộc bài nào): `tools/lab/` → `out/_lab/`.

| kênh | thư mục | dự án | đầu ra | giọng | intro |
|---|---|---|---|---|---|
| **99% from scratch** (toán, tiếng Anh) | `channels/en/` | `projects/en/<p>` (14 bài + intro 3D) | `out/en/<p>/<p>.mp4` | Atlas `03572937` ×1.08 | KHÔNG từ 2026-10-19 (bài 10-09 → 10-18 dùng `out/en/intro/intro.mp4`) |
| **99の発見** (toán, tiếng Nhật) | `channels/ja/` | `projects/ja/<p>` | `out/ja/<p>/<p>.mp4` | Jaikyu `49f48276` ×1.0 | `projects/ja/intro` → `out/ja/intro/intro.mp4` |
| **Blunderstory** (kể chuyện lịch sử, @blunderstorytv, chưa đăng video) | `channels/hist/` | `projects/hist/<tập>` + `_kit/` (đồ nghề chung) + `_lab/` | `out/hist/<tập>/` | adam `f9997cc2` ×1.1 | không |
| MV ca nhạc (không phải kênh riêng) | — | `projects/mv/<p>` | `out/mv/<p>/<p>.mp4` | — | — |

**Một nguồn:** `channels/<kênh>/channel.json` (giọng, intro, font, tên kênh trên biển cuối). Đọc qua
`tools/channel.py` (`channel_of(p)`, `out_dir(p)`, `final_mp4(p)`); `narrate.py` lấy giọng, `build.py` lấy intro,
`new-lesson.sh` lấy font + intro + mẫu `channels/<kênh>/templates/`. `build.json` của một bài ghi đè được.

**Mã dự án** là đường dẫn dưới `projects/`, LUÔN có tiền tố kênh: `en/pemdas`, `ja/pi`, `hist/sarajevo`, `mv/exp-log`.
Mọi lệnh nhận mã này: `tools/voice/narrate.py en/pemdas …`, `tools/lesson/build.py ja/pi`,
`python3 tools/qa/lesson_golden.py check en/trig`, `shoot.js --page projects/en/trig/p2.html`.
3D: `bun scripts/render.ts video --set en/intro`.

## Bài mới
```bash
tools/new-lesson.sh <tên> "<Title>"                  # 99% from scratch → projects/en/<tên>
tools/new-lesson.sh <tên> "<タイトル>" --channel ja   # 99の発見 → projects/ja/<tên>   (--ja = viết tắt)
tools/new-mv.sh <tên> "<Tên bài>" …                  # MV → projects/mv/<tên>
```
Rồi `docs/lesson/LESSON-VIDEO.md` (chung) + `channels/<kênh>/` (riêng kênh). Tập lịch sử: `channels/hist/CHANNEL.md`.

## Thêm một kênh
`channels/<id>/channel.json` (chép của ja), `CHANNEL.md`, `templates/` (SCRIPT.md, YOUTUBE.md phủ lên `templates/lesson/`),
`projects/<id>/`. Công cụ YouTube (`tools/yt/`) tự nhận kênh khi `channel.json` có `youtube_id` + token.
