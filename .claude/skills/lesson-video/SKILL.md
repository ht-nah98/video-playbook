---
name: lesson-video
description: Làm một video bài học mới (kênh Anh 99% from scratch hoặc kênh Nhật 99の発見) từ script người dùng gửi — gói đăng trước lời, kịch bản, giọng OmniVoice, 3 lab DNA, kit, nhóm cảnh song song, quét + review, build, gói YouTube. Dùng khi người dùng gửi nội dung bài mới hoặc nói "làm video tiếp theo".
---

# Video bài học mới — đường mặc định (LESSONS §126, §134)

Luật đầy đủ: `docs/lesson/LESSON-VIDEO.md` (các pha), `docs/lesson/PACKAGING.md` §0b (gói), `docs/CRAFT.md`. Skill này
là danh sách việc + cổng; chi tiết luôn đọc ở tài liệu gốc. Mẫu mới nhất: `projects/en/calculus/` (Anh), `projects/ja/gacha/` (Nhật).

## 0. Trước khi bắt đầu
- `git status --short --branch`; `python3 tools/kb.py --recent 10`; `docs/STATUS.md` (bài liền trước dùng DNA / nhạc gì).
- Kênh Nhật: đọc `channels/ja/WRITING.md` + `PIPELINE.md` trước SCRIPT.

## 1. Cổng ý tưởng + gói (hỏi người dùng bằng AskUserQuestion)
- Kênh nào; đề tài có qua cổng PACKAGING §1 không — đề tài "tên chương" → kéo câu "không thể / luôn đúng" trong bài lên 0:00 (§124).
- 2–3 gói (thumbnail CHO THẤY + title NÓI nửa còn lại, **không chung từ khoá** — chấm ngay, §125). Người dùng chọn.
- `tools/new-lesson.sh <p> "<Title>" [--channel ja]`. Lưu bản gốc người dùng nguyên văn ở `SCRIPT.vi.md`.

## 2. CONTENT.md (soát sự kiện)
- Câu khẳng định rộng nhất soát trước (§48, §107); cơ chế → mô phỏng bằng code (§117); số không tự đo → gán đúng chủ (§101).
- MỌI số lên hình nằm trong CONTENT, tính bằng code. Danh sách ảnh (tự lấy — Commons API / Chrome headless, §119).

## 3. SCRIPT.md (CỔNG 1 — người dùng duyệt)
- Khuôn `templates/lesson/SCRIPT.md`: 4 dòng gói TRƯỚC lời; 30 s đầu bốn nhịp; văn xuôi, dòng = hơi đọc.
- Độ dài = số từ ÷ 190 phút (Anh, §129) — báo con số khi xin duyệt. Viết tắt đọc như từ → viết thường cách nhau (§128).

**Chế độ làm (người dùng 2026-10-22):** mặc định TUẦN TỰ — đạo diễn tự làm mọi bước 4–7 trong luồng chính, xong mỗi bước
báo người dùng một dòng. Chế độ NHIỀU AGENT (cột "nhiều agent") chỉ khi người dùng đồng ý cho bài đó — hỏi trước bằng
AskUserQuestion nếu thấy đáng (bài dài, gấp).

## 4. Giọng + lab DNA
- Giọng chạy nền (OmniVoice: `cd ~/OmniVoice-Studio && uv run python backend/main.py`, đợi cổng 3900): `narrate.py` p1/p2
  (`--to` tính CẢ dòng đó) → `align.py` (venv `tools/config.py analysis_py`) → `mouth_env.py`. Xong → TẮT OmniVoice.
  `data/lines.txt` dựng từ hai timeline (mẫu `projects/en/calculus/data/lines.txt`).
- Trước lab: đọc 3–5 `~/lemo-opuscar/styles/<slug>/STYLE.md` gần đề tài (mục lục `styles/README.md`, docs/study/11) —
  mỗi hướng lab ghi technique base + native move mượn (DNA §0); thực đơn ý tưởng, không chép demo.
- Lab theo `BRIEF-LAB.md` (mẫu `projects/en/calculus/BRIEF-LAB.md`; số chép từ CONTENT bằng code, §132), 2–3 hướng
  `tools/lab/<hướng>.html` → ghép `out/_lab/<p>-styleframes-compare.jpg` → người dùng chọn DNA.
  Tuần tự: tự viết từng lab trong lúc giọng chạy nền. Nhiều agent: 3 agent lab (opus) cùng lúc.

## 5. Kit + cảnh mẫu
- Sau DNA duyệt: `SHOTS.md` (shot list có lý do, ≥ 4 kiểu camera + 1 signature shot, cue map, ≥ 2 khoảng lặng, J/L-cut,
  bảng âm thanh theo chất liệu, ≥ 4/6 khác bài trước) — TRƯỚC khi viết plates.
- `DNA.md`, `kit.js` (bóng sprite, không shadowBlur §127; `must` cho mọi số; cỡ chữ tối thiểu giữ bằng code §95),
  `kit-test.html` (soi ký hiệu dễ nhầm ln/In §133), p1/p2.html, `plates/a0-open.js` (khung 0.5 s = thumbnail).
  Nhiều agent: thêm `BRIEF-PLATES.md` (4 nhóm cân giây, bảng hạn mức tiếng có TỔNG, cấm pkill -f).

## 6. Cảnh p2
- Tuần tự: đạo diễn viết cảnh theo thứ tự hồi, sau mỗi hồi `shoot.js check --page "…p2.html?plates=…"` + chụp mỗi câu, soi.
- Nhiều agent: 4 nhóm (sonnet, 4 lệnh Agent — không Workflow); người dùng nhắn giữa chừng → kiểm agent nền bị dừng (§131).
- Gộp `*-order.js` → `python3 tools/qa/lookups.py <p>` → `shoot.js check` cả hai trang.

## 7. Soát (skill `lesson-qa`) → sửa → đóng băng
- Quét đạo diễn mỗi 10 s → sửa → quét LỆCH mốc (2, 12, 22…; tuần tự: đạo diễn tự làm lượt này như một reviewer mới, đọc
  lại `lines.txt`; nhiều agent: reviewer opus) → check sạch → commit. Sửa song song (nhiều agent) CHỈ khi chia theo file (§134).

## 8. Build + gói đăng (CỔNG 2)
- Tiếng hiệu ứng theo chất liệu DNA: `python3 tools/sfx/material.py <p> --material <paper|…>` (docs/lesson/SFX.md; chất liệu mới → thêm + A/B).
- Nhạc: dùng lại bản Suno cũ hợp DNA, khác bài liền trước (`build.json` `music`). `python3 tools/lesson/build.py <p>`.
- Soi file thật: loudness ≈ −16.7 LUFS, khung 0.5 s, mối nối p1→p2. `spoken.json` đủ — publish.py không còn cảnh báo số chữ.
- `out/<p>/youtube/`: title.txt + title-b.txt, description, tags, problems, chapters, SRT — đếm ký tự bằng code (§42).
- Prompt thumbnail `projects/<p>/thumbnail/prompt-v1-*.md` (cỡ mascot ĐẦU prompt, đính khung 0.5 s — §123) cho người dùng render.
- Cập nhật `docs/STATUS.md`; commit local. Rồi skill `wrap-up` nếu người dùng muốn đúc kết.
