# Video bằng code: quy trình + công cụ + bài học

Quy trình, công cụ và **hơn 250 bài học đã trả giá** khi làm video YouTube hoàn toàn bằng code (với trợ lý AI là Claude Code):

| dòng nội dung | công nghệ | ở đâu |
|---|---|---|
| video bài học toán từ số 0 — kênh tiếng Anh *99% from scratch* và kênh tiếng Nhật *99の発見* | 2D: JS ES module + Canvas 2D, không build step | `engine/`, `projects/en/`, `projects/ja/` |
| MV ca nhạc toán | 3D: TypeScript + three.js (`studio3d/`, gốc từ pdoom-video — MIT) · 2D như bài học | `studio3d/`, `projects/mv/` |
| kể chuyện lịch sử — bản 2D (người dẫn vẽ nét bằng code, ảnh / phim tư liệu PD-CC0, bản đồ) | như bài học | `channels/hist/`, `projects/hist/` |

Mỗi khung là hàm thuần của thời gian, render bằng Chrome headless + ffmpeg. Mỗi video có DNA hình ảnh riêng
(`projects/<kênh>/<p>/DNA.md`); cái dùng lại là quy trình + engine + công cụ + bài học.

> Tài liệu viết bằng **tiếng Việt**. *English summary: a Vietnamese playbook for making YouTube math lessons (EN/JA channels),
> math music videos and 2D history storytelling entirely in code — workflow docs, a deterministic Canvas/three.js render engine,
> QA tools, and 250+ hard-won lessons (`docs/LESSONS.md`, searchable with `python3 tools/kb.py <keyword>`).*

## Đọc từ đâu

1. `AGENTS.md` — điểm vào (cho người và cho AI): việc gì đọc gì, ba luật, lệnh hay dùng.
2. `docs/CRAFT.md` — luật nghề chung cho MỌI dạng video, mỗi luật dẫn tới bằng chứng trong `docs/LESSONS.md`.
3. Theo dòng nội dung:
   - bài học toán: `docs/lesson/LESSON-VIDEO.md` (quy trình), `docs/lesson/PACKAGING.md` (thumbnail + title + 30 s đầu), `docs/TITLE.md`;
   - MV: `docs/mv/NEW-MV.md`, `docs/MEDIUM.md`;
   - kênh sử: `channels/hist/PLAYBOOK.md` (gồm gói đăng), `PIPELINE.md`, `WRITING.md`, `EDITING.md`, `CHARACTER.md`.
4. `docs/study/` — phân tích video của người giỏi (MrBeast, 3Blue1Brown, OverSimplified, …) đã rút thành luật.
5. `.claude/skills/` — quy trình đóng gói cho AI (bài học mới, soát hình, refactor an toàn, đúc kết, hoạt hình người que).

Tra bài học: `python3 tools/kb.py <từ khoá>` · `python3 tools/kb.py --file <file sắp sửa>` · `python3 tools/kb.py --craft 8b`.

## Bắt đầu

```bash
tools/new-lesson.sh <tên> "<Tên video>" [--channel ja]              # bài học → docs/lesson/LESSON-VIDEO.md
tools/new-mv.sh <tên> "<Tên bài>" <thời lượng> <bpm> <downbeat>   # MV → docs/mv/NEW-MV.md
tools/test/run.sh                                                   # mọi unit test
```

## Yêu cầu

Node ≥ 18, Chrome, ffmpeg, Python 3 (numpy, Pillow). MV 3D thêm [bun](https://bun.sh). Căn mốc lời / bóc nhạc cần venv phân tích
(torch, Demucs, whisper — [uv](https://docs.astral.sh/uv/)):

```bash
cd studio3d/analysis && uv venv && uv pip install --python .venv/bin/python -r ../../tools/analyze/requirements.lock.txt
```

Đường dẫn ngoài repo gom ở `tools/config.py` (biến môi trường `MASCOT_HKT`, `MASCOT_ANALYSIS_PY`). Giọng đọc dùng
OmniVoice-Studio (AGPL) chạy riêng, gọi qua HTTP `127.0.0.1:3900`.

## Không có trong repo này

- Giọng đọc (giọng clone riêng), nhạc (bản tự tạo), video đã render (`out/`), số liệu kênh và token API — bạn dùng giọng / nhạc / tài khoản của mình.
- Ảnh tư liệu trong `projects/*/assets/` lấy từ Wikimedia Commons (public domain hoặc giấy phép tự do); nguồn và giấy phép từng ảnh ghi trong
  `INDEX` / `meta.json` / `SOURCES` của bài — dùng lại thì theo đúng giấy phép đó.
  Tiếng hiệu ứng `assets/sfx/` là CC0 (`assets/sfx/SOURCES.md`). Font trong `assets/fonts/` theo giấy phép của từng font (SIL OFL).
- Kênh sử ở đây là bản 2D (đến 2026-11-02); các bản sau không nằm trong bản chia sẻ này.

## Giấy phép

MIT (`LICENSE`) cho code, tài liệu và hình mascot. Phần của bên thứ ba giữ giấy phép riêng: `studio3d/` (MIT gốc), font (SIL OFL),
tiếng hiệu ứng (CC0), ảnh tư liệu Commons (theo từng ảnh).
