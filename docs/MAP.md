# MAP — repo này có gì, nằm ở đâu

Bản đồ cho người / AI cần tìm file. Cách làm việc: `AGENTS.md`. Trạng thái video: `docs/STATUS.md`.

## Cây thư mục

```
engine/            dùng chung MỌI video, không biết gì về một bài, không áp phong cách — docs/ENGINE.md
  main.js          Show: thứ tự cảnh, nền chung, camera từng cảnh
  timeline.js      mốc lời theo CHỮ: tl.at('câu', n)
  lyric.js glyphs.js     chữ để đọc: giải mã / vỡ thành ký hiệu, lời chân khung (footerPlan/footerLine)
  transit.js mascot.js face.js visemes.js   nhân vật: vào/ra bằng ký hiệu, tư thế, mặt cận hát nhép
  talk.js          miệng NÓI cho tư thế toàn thân (bài học): neo assets/character-v2/mouths.js, đường bao tools/voice/mouth_env.py
  shade.js         bóng mờ / hào quang tất định (sprite thay shadowBlur, LESSONS §127) — mẫu kit bài học re-export
  stick.js         người que tất định: tư thế, đi bộ bám đường cong, IK tay/chân chạm điểm (docs/study/06)
  mascot-line.js   mascot kênh Anh VẼ NÉT: mascot() góc thẳng + yaw 3/4, head(), talkMouth, blinkAt (§219 §220)
  mascot-actor.js  mascot DIỄN trong cảnh: actor({base, mh}).draw — khoá F() + walks / hold / grip, HANDS
  stickmove.js     hoạt ảnh người que: keys (khoá + ease), gait (bản đồ bước), snap / fast (nhịp Becker), reach, leadOf, NOOP
  poses-sport.js   70 tư thế người que thể thao (sport(name) → tư thế + dx/dy) — chuyển từ lemo-opuscar pictogram, MIT
  hero.js          người que khăn đỏ — nhân vật xuyên suốt của kênh (docs/character/CHARACTER-STICK.md): mắt, khăn, màu trạng thái, ARM
  morph.js mirror.js stage.js fill.js typeobj.js crt.js   chuyển cảnh, gương/gập, sân khấu, chữ làm vật thể, CRT
  riso.js sheets.js tape.js   chất liệu in riso, Show nạp giấy, lời ba giọng (add-it-up)
  sfx.js           tiếng hiệu ứng bài học: KINDS, typeCues, collectCues
  lib.js mosaic.js draw.js charts.js hatch.js backdrop.js
  render/shoot.js  video (--silent) · stills · cues · check (chạy khô + luật chuyển cảnh) · readcheck (chữ đủ lâu để đọc) — luôn kèm --page; trang dọc `--w 1080 --h 1920`, WebGL trên card thật `--gpu` (§72), `--raw` pixel thô thay PNG + `--nvenc` (§260); song song + ghép: `tools/render/par.py`
studio3d/          MV 3D (TS + three.js, bun + Vite) — chép nguyên khối từ pdoom-video (MIT, Giacomo Magnanini), studio3d/README.md
  app/src/engine/  renderer, post (bloom/grain), chữ, nét · app/src/scenes/ cảnh p(doom) mẫu · app/scripts/render.ts xuất video
  analysis/        Demucs/CTC/whisper (pyproject + uv.lock) — venv .venv dùng chung với tools/analyze (tools/config.py)
  docs/            ENGINE, TREATMENT (mẫu mực thước), OVERVIEW.vi · nhạc/lời p(doom) KHÔNG commit
  (video 3D của một bài nằm trong bài đó: projects/<p>/scene3d.ts + data3d/, chạy bằng `--set <p>` — docs/mv/NEW-3D.md)
channels/<kênh>/   RIÊNG một kênh: channel.json (giọng, intro, font, tên kênh — MỘT nguồn), CHANNEL.md, templates/, luật viết lời (ja: WRITING, VOICE, PIPELINE, VIDEOS) — channels/README.md
projects/<kênh>/<p>/   MỌI dự án theo kênh (2026-10-24): en/ (toán Anh + intro 3D) · ja/ (toán Nhật) · hist/ (lịch sử: <tập>/,
                   — mọi công cụ nhận mã này; projects/_shared/ = bảng đọc số + thư viện nhạc bài học (music/LIBRARY.md) dùng chung
                   3D (nếu có): scene3d.ts data3d/ (+ script dựng dữ liệu, vd intro/data3d.py) — render bằng studio3d `--set <p>`
                   MV: DNA.md TREATMENT.md song.js index.html kit.js plates/ data/ audio/
                   bài học: CONTENT SCRIPT DNA BRIEF-PLATES YOUTUBE .md, kit.js p1/p2.html build.json spoken.json plates/ data/ audio/ assets/
templates/mv/      khung MV mới (tools/new-mv.sh)
templates/lesson/  khung VIDEO BÀI HỌC mới (tools/new-lesson.sh [--channel ja]): CONTENT/SCRIPT/DNA/SHOTS/YOUTUBE, kit.js, part.html (→ p1/p2), build.json, BRIEF-PLATES; channels/<kênh>/templates/ phủ lên
assets/            character-v2/ (nhân vật, POSES.md) · fonts/ · sfx/ (thư viện tiếng CC0, library.json, SOURCES.md)
tools/
  new-mv.sh        dựng khung MV mới (→ projects/mv/<p>)
  new-lesson.sh    dựng khung video bài học mới (→ projects/en/<p>; --channel ja → projects/ja/<p>)
  backup.sh        sao lưu ra HDD cạnh out/: git bundle (4 bản) + giọng projects/**/audio + analytics + bộ nhớ Claude — không push
  git-hooks/       pre-commit chặn Claude commit file người dùng đang sửa (PROTECTED); bật: git config core.hooksPath tools/git-hooks
  channel.py       kênh của một dự án: channel_of(p), out_dir(p), qa_dir(p), final_mp4(p) — đọc channels/<kênh>/channel.json
  voice/           giọng bài học: narrate (OmniVoice qua HTTP) · estimate (mốc tạm) · align (CTC + whisper) · mouth_env (miệng nói) · publish (SRT, chương) · ja (tiếng Nhật)
  lesson/build.py  bản cuối bài học: chạy khô check → render song song (parts/*.meta) + intro + tiếng/nhạc + youtube/{srt, chương}
  sfx/             add.sh (thêm tiếng vào thư viện), mix.py (trộn cue → track tiếng; --lib bộ của bài), material.py (tiếng tổng hợp theo chất liệu DNA → projects/<p>/assets/sfx)
  shorts/          short.py, sheet.py — Shorts dọc từ bản cuối (docs/lesson/SHORTS.md)
  render.sh        MV: render đoạn / trọn bài song song / ghép bản cuối theo quy ước out/<p>/
  analyze/         dữ liệu: nhạc, lời ghép mốc, phân xử, stem, đường bao giọng — README § Pipeline dữ liệu
  study/           học video mẫu: prep.sh (lời + bảng ảnh + nhịp), pace.py (% màn hình đứng yên, cắt cảnh), cadence.py (nhịp vẽ từng khung, --roi vùng nhân vật), channel.py (view × trung vị cả kênh)
  thumb/check.py   thử thumbnail một lệnh: 50% TV, 250/168 px, góc phải dưới, bản đăng 1280×720
  yt/              số liệu kênh qua API (CHỈ ĐỌC): auth (danh sách kênh, token, chặn sai kênh) · **sync (lệnh hằng ngày)** · topic_titles (khuôn title nào thắng trong một đề, docs/TITLE.md) · pull (→ analytics/raw/, không commit) · db (→ analytics/yt.sqlite) · stats (xem nhanh) · reporting (impressions/CTR, tải hằng ngày) — docs/analytics/{PLAN,DATA}.md
  site/            (gốc repo) Channel Lab: build.py → analytics/site/; serve.py = trang + hỏi đáp AI (claude -p chỉ đọc); DESIGN.md
  i18n/            bản dịch title/mô tả 10 ngôn ngữ; push.py gắn lên YouTube (--dry-run trước); captions.py + subs/ phụ đề dịch
  qa/              MV: stills, same, determinism, golden, seams.py, addscene.py · bài học: lesson_golden.py · 3D: still_windows.py (đoạn đứng yên) · chung: sheet.py, lookups.py, clean.sh
  cutout/          tách nền ảnh nhân vật (venv riêng)
  review.mjs stitch.mjs   chấm 8 chỉ số · ghép đoạn render (check-timing.mjs: chỉ cho kiểu 99-intro)
  lab/  test/      bàn thử chất liệu · unit test (node --test tools/test/*.test.mjs)
docs/              CHUNG mọi dạng: CRAFT, DNA, MEDIUM, ENGINE, LESSONS, STATUS, chữ-vật thể · character/ (nhân vật kênh toán + MV) · review/ (tự review hệ thống)
  mv/              RIÊNG MV ca nhạc: NEW-MV, PIPELINE (bóc nhạc), SYNC, nghiên cứu video mẫu, reference/
  lesson/          RIÊNG video bài học: LESSON-VIDEO (giọng, mốc lời đọc, intro), SFX (tiếng hiệu ứng), SHORTS (cắt Shorts dọc), PACKAGING (title/thumbnail/mở đầu/giữ chân)
  study/           học từ video mẫu của người giỏi: README (cách học), NN-<slug>.md (bài học + số đo + đề xuất)
out/               KHÔNG commit (symlink sang HDD) — mirror projects/: out/<kênh>/<p>/ (dưới đây <p> = mã có kênh, vd en/pi):
  <p>/<p>.mp4      bản cuối — file duy nhất để xem / đăng
  <p>/parts/       MV: đoạn render chờ ghép (xoá sau khi có bản cuối) · bài học: GIỮ *.mp4 + *.meta cho build.py --keep
                   (clean.sh <p> chỉ xoá *.wav, video.mp4, *.log)
  <p>/youtube/ <p>/shorts/   bài học: gói đăng (SRT, chương, title, mô tả…) · Shorts
  <p>/qa/          ảnh kiểm tra, golden, log CỦA BÀI ĐÓ (tools/channel.py qa_dir) — xoá lúc nào cũng được
  <p>_public/      bài ĐÃ ĐĂNG — cùng cấu trúc, chỉ đổi tên thư mục (tools/channel.py out_dir tự tìm)
  _lab/            bàn thử chung (tools/lab/), nghiên cứu (study), thư viện tiếng thử — không thuộc bài nào
```
Cái gì của MỘT bài thì nằm trong `projects/<kênh>/<p>/` (kể cả `plans/` — kế hoạch từng đoạn); `docs/` chỉ chứa thứ dùng
chung. File lạ ở gốc `out/` là rác: `tools/qa/clean.sh` liệt kê ra.

Công cụ thêm (ít dùng): `tools/kb.py` (tra LESSONS/CRAFT), `tools/test/run.sh` (mọi unit test), `tools/common.py`
(ROOT, duration — dùng chung cho tools Python), `tools/llm/nim.py` (LLM ngoài, cần người dùng cho phép gửi nội dung),
`tools/check-timing.mjs` (chỉ 99-intro), `tools/lab/README.md` (bàn thử: lab nào thành DNA bài nào, archive/).

## Lệnh MV (2D — `projects/mv/exp-log`, `add-it-up`, `99-intro`)

```bash
tools/qa/stills.sh <p> 1,5,9 out/_lab/x && python3 tools/qa/sheet.py out/_lab/x out/_lab/x.jpg   # chụp + NHÌN
python3 tools/qa/seams.py <p> <mốc vào cảnh,…>                     # cặp khung ở ranh giới cảnh
python3 tools/qa/lookups.py <p>                                    # MV: L("câu") lặp tra thiếu lần thứ n
tools/qa/determinism.sh <p> 5,9,13                                 # tất định (xuôi = ngược)
tools/qa/golden.sh record|check <p>                                # refactor — hình cả bài không đổi
tools/render.sh full <p> 53.5,112.86                              # trọn bài song song ở các mốc, tự ghép
tools/render.sh part <p> a b                                      # một đoạn → out/<p>/parts/a-b.mp4
tools/render.sh final <p>                                         # ghép mọi đoạn → out/<p>/<p>.mp4
node tools/review.mjs out/<p>/<p>.mp4                             # 8 chỉ số
tools/qa/clean.sh <p>                                             # MV: xoá parts/ khi đã có bản cuối (out/_lab: --qa)
```
MV 3D: `studio3d/README.md`, `docs/mv/NEW-3D.md` (`bun scripts/render.ts video --set <p>`).

## Intro kênh

`projects/en/intro` (3D, studio3d) → `out/en/intro/intro.mp4` (26 s, −14.5 LUFS, từ/về đen) và `out/en/intro/intro-short.mp4`
(11.3 s). Lồng qua `build.json` `"intro": "${REPO}/out/en/intro/intro.mp4"` — kênh Anh tắt từ 2026-10-19
(`channels/en/channel.json` `"intro": null`); 8 bài đầu dùng intro hkt (`hkt-project/work/brand/intro.mp4`). Kênh Nhật:
`projects/ja/intro` → `out/ja/intro/intro.mp4` (漆と金).

## Tài nguyên ngoài repo

Đường dẫn ngoài repo gom ở `tools/config.py` — đổi máy thì đặt biến môi trường, không sửa code.

- **Forced alignment**: venv `studio3d/analysis/.venv` — Demucs, torch, MMS_FA, whisper (`uv` tạo nên KHÔNG có pip;
  máy mới: dựng theo `tools/analyze/requirements.lock.txt` (có faster-whisper, không có trong `uv.lock`), hoặc đặt
  `MASCOT_ANALYSIS_PY`). `tools/analyze/run.sh`, `ctc_check.py`,
  `tools/voice/align.py` dùng venv này.
- **Treatment mẫu mực thước**: `studio3d/docs/TREATMENT.md`
- **hkt-project** (mặc định thư mục `hkt-project` nằm cạnh repo; đổi bằng `MASCOT_HKT`): hệ thống bài giảng manim của kênh (16 tập). Video bài học của
  repo này mượn từ đó: giọng (`src/hkt/voice/`), chèn intro (`scripts/insert_signature.py`), intro
  `work/brand/intro.mp4` (26 s, 1080p60, tự tối từ/về đen). Đọc `hkt-project/docs/OMNIVOICE_HANDOFF.md` trước khi tổng hợp giọng.
- **OmniVoice-Studio** (`~/OmniVoice-Studio`, AGPL — chỉ gọi qua HTTP `127.0.0.1:3900`, không import):
  `uv run python backend/main.py`. Giọng mặc định Atlas `03572937`.
