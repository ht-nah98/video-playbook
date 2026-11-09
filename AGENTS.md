# Đọc file này trước khi làm bất cứ việc gì

Repo làm video YouTube bằng code cho ba dòng nội dung:
- **Video bài học toán từ số 0**: kênh tiếng Anh (*99% from scratch*) và kênh tiếng Nhật (*99の発見*). Có lời đọc, hình 2D vẽ bằng
  `engine/` (JS + Canvas, không build step).
- **MV ca nhạc toán**: cân nhắc 3D trước, `studio3d/` (three.js).
- **Kể chuyện lịch sử** (`channels/hist/`): bản **2D** (người dẫn vẽ nét bằng code, ảnh / phim tư liệu thật PD-CC0, bản đồ).

Mascot cố định; **mỗi video một DNA riêng**. Cái dùng lại là QUY TRÌNH, engine, công cụ và bài học, không phải phong cách.
Bản chia sẻ này không gồm giọng đọc, nhạc, video đã render và số liệu kênh; mọi lệnh render cần bạn tự có giọng / nhạc của mình.

## Vào việc — đọc gì, gọi gì

Luôn đọc `docs/CRAFT.md` (luật nghề, mỗi luật dẫn tới bằng chứng `LESSONS §n`). Rồi theo việc:

| việc | skill (`.claude/skills/`) | đọc | tra bài học |
|---|---|---|---|
| video bài học mới (từ script) | `lesson-video` | `docs/lesson/LESSON-VIDEO.md`, `PACKAGING.md`, `channels/<kênh>/` | `kb.py --craft 1`, `--craft 8b` |
| soát hình một bài (chụp, quét, review) | `lesson-qa` | `docs/ENGINE.md` §7 | `kb.py --group "Đo & QA"` |
| viết / sửa cảnh, kit của một bài | `lesson-qa` §2 | `projects/<p>/DNA.md`, `BRIEF-PLATES.md`, `docs/ENGINE.md` §7 | `kb.py --file <file sắp sửa>` |
| thumbnail, title, gói đăng | agent `thumbnail-artist` (`.claude/agents/`) | `docs/TITLE.md` · `docs/lesson/PACKAGING.md` · kênh sử `channels/hist/PLAYBOOK.md` | `kb.py thumbnail` |
| refactor engine / tools | `safe-refactor` | `docs/MAP.md`, `docs/ENGINE.md` | `kb.py --group "Tất định"` |
| đúc kết sau một bài | `wrap-up` | đầu `docs/LESSONS.md` | `kb.py --recent 10` |
| MV ca nhạc | — | `docs/mv/NEW-MV.md` (+ `PIPELINE.md`, `SYNC.md`, `REFERENCE-TEARDOWN.md`), `docs/MEDIUM.md`, `studio3d/README.md`; 3D: `docs/mv/NEW-3D.md` | `kb.py --group 3D` |
| số liệu kênh, vòng học | — | `docs/analytics/PLAN.md`, `DATA.md`; công cụ `tools/yt/` (YouTube API, chỉ đọc) | `kb.py --group "Số liệu kênh"` |
| học video mẫu | — | `docs/study/README.md` | — |
| kênh lịch sử (tập mới, lời, người dẫn, dàn nhân vật, bản đồ) | — | `channels/hist/CHANNEL.md` → `PLAYBOOK.md` → `PACKAGING.md`, `PIPELINE.md`, `WRITING.md`, `EDITING.md`, `CHARACTER.md`; `docs/study/15-thanh-pahm-editing.md` | `kb.py nguoi dan` |
| nhân vật, tư thế, miệng nói | `stickman-animation` | `docs/character/`, `docs/stick/`, `channels/hist/CHARACTER.md` | `kb.py mascot`, `kb.py nguoi que` |
| Shorts, tiếng hiệu ứng / nhạc | — | `docs/lesson/SHORTS.md`, `docs/lesson/SFX.md` | `kb.py --group "Âm thanh"` |
| chữ làm vật thể, chất liệu nhân vật, DNA | — | `docs/TEXT-AS-OBJECT.md`, `docs/character/MASCOT-MATERIALS.md`, `docs/DNA.md` | — |

Cây thư mục, công cụ, tài nguyên ngoài repo: `docs/MAP.md`.

## Ba luật không được phá

1. **Gói + kịch bản + DNA trước code.** Bài học: thumbnail/title/30 s đầu → `SCRIPT.md` → `DNA.md` được duyệt rồi mới
   viết render (MV: `TREATMENT.md`). Bản tối ưu chỉ số YDIF từng vượt video mẫu mà bị bác vì vô nghĩa.
2. **Render TẤT ĐỊNH.** Mọi khung là hàm thuần của `t`; cấm `Math.random` / `Date.now` / `performance.now`, cấm
   `shadowBlur` / `ctx.filter` trong render; ngẫu nhiên → `hash(i)`. Bài học: `node engine/render/shoot.js check --page
   projects/<p>/p2.html`; đổi engine / kit → `python3 tools/qa/lesson_golden.py check <p>`. MV: `tools/qa/determinism.sh`,
   `tools/qa/golden.sh check`.
3. **Nhìn ảnh, đừng chỉ tin số.** Kiểm tự động xác nhận mốc đúng, không xác nhận cảnh có nội dung — màn hình trống vẫn
   "hợp lệ" với mọi assertion.

## Cách làm việc (đã kiểm qua nhiều video)

- **DNA luôn đổi mới** (`docs/CRAFT.md` §0, LESSONS §218): dùng lại quy trình / công cụ / phép đo, KHÔNG dùng lại nền, bố cục, dáng,
  phong cách. Ngoại lệ: video toán kênh Anh dùng MỘT hệ hình cố định cả kênh (`channels/en/CHANNEL.md`, LESSONS §245).
  Thumbnail A/B: 1 bản bối cảnh video + 2 bản thế giới khác hẳn; đọc `channels/THUMB-LOG.md` trước khi thiết kế.
- **Theo kênh**: `projects/<kênh>/<p>` ↔ `out/<kênh>/<p>`; mã dự án luôn có kênh (`en/pi`, `ja/pi`, `hist/sarajevo`, `mv/exp-log`);
  ảnh kiểm tra → `out/<kênh>/<p>/qa/` (`tools/channel.py qa_dir`). Bài đã đăng → `out/<kênh>/<p>_public/` (`tools/channel.py out_dir`).
- Shell zsh: lặp tham số bằng `while read a b; do …; done <<'EOF'` (§192); lệnh trong `while read` luôn `</dev/null` (§203 §219);
  không `pkill -f` / `killall`. Muốn xem cách dùng một script → `-h` hoặc `sed -n 1,15p`, không chạy trần (§135).
- Giọng đọc: OmniVoice (giữ ~11 GB VRAM — tắt khi không đọc). Ảnh lịch sử: tự lấy từ Wikimedia Commons (API) — ảnh PD / CC0.
- **Không tải hàng loạt từ YouTube** (yt-dlp) — vài video một buổi là trần, dễ bị chặn IP (§160).

## Harness — tra nhanh thay vì đọc hết

**Sổ năng lực** `tools/qa/capabilities.json`: kỹ thuật ĐÃ CÓ theo vùng (thư viện + lối vào phải dùng); `test_capabilities.py` đỏ nếu lối vào bỏ dùng.

```bash
python3 tools/kb.py <từ khoá…>             # mục LESSONS chứa MỌI từ (bỏ dấu); -v in nguyên văn
python3 tools/kb.py 127 §60                # in nguyên mục
python3 tools/kb.py --file engine/sfx.js   # bài học đã trả giá về file này — chạy TRƯỚC khi sửa
python3 tools/kb.py --craft 8b             # một mục CRAFT + các §LESSONS nó dẫn
python3 tools/kb.py --groups | --group "Âm thanh" | --recent 10
python3 tools/kb.py --check                # chỉ mục đủ, §n được dẫn có thật
tools/test/run.sh                          # mọi unit test (node + python)
```

## Lệnh hay dùng

```bash
tools/new-lesson.sh <p> "<Tên video>" [--channel ja]                # video bài học mới (khung từ templates/lesson/)
python3 tools/voice/narrate.py <p> --from "…" --to "…" --out p1    # giọng; rồi align.py, mouth_env.py
node engine/render/shoot.js stills --page "projects/<p>/p2.html" --t 12.5,30 --outdir out/<p>/qa/x
node engine/render/shoot.js check --page projects/<p>/p2.html     # chạy khô mọi khung, mã 1 = lỗi JS / must()
python3 tools/lesson/build.py <p> [--keep]                         # bản cuối + out/<p>/youtube/
python3 tools/voice/publish.py <p>                                 # dựng lại SRT + chương
python3 tools/thumb/check.py <ảnh>                                 # thử thumbnail: 50% TV, 250/168 px, góc phải dưới
python3 tools/shorts/short.py <p> [tên…]                           # Shorts dọc từ bản cuối
tools/new-mv.sh <p> "<Tên bài>" <thời lượng> <bpm> <downbeat>     # MV mới; render: tools/render.sh full|part|final
```
