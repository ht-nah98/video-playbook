---
name: safe-refactor
description: Refactor engine/, tools/ hoặc templates/ của mascot-mv mà không đổi hình bài đã xong và không phá công cụ — golden trước/sau, unit test, tra bài học theo file. Dùng khi sửa module dùng chung, dọn code, đổi công cụ build/voice/publish.
---

# Refactor an toàn (CRAFT §3, §8; LESSONS §46, §60, §115, §135)

## Trước khi sửa
1. `git status --short` sạch (hoặc biết rõ file nào của người dùng — không đụng).
2. `python3 tools/kb.py --file <đường dẫn sắp sửa>` — đọc mọi bài học về file đó.
3. `tools/test/run.sh` xanh. Bài học nào import module sắp sửa:
   `git grep -l "<module>" projects/*/*/kit.js projects/*/*/plates`.
4. Bài đó có `projects/<p>/golden.json`? Chưa → `python3 tools/qa/lesson_golden.py record <p>` và commit golden TRƯỚC.

## Luật
- Kit của bài đã xong giữ bản chép (`engine/lesson.js` dòng đầu) — **không đổi pixel**, không chuyển kit cũ sang import.
- Hàm dùng chung mới vào `engine/` (JS) hoặc `tools/common.py` (Python: `ROOT`, `duration`) — đừng chép thêm bản mới.
- Không thêm nguồn phá tất định (Math.random, Date.now, shadowBlur, ctx.filter, trạng thái module giữa các khung).
- Công cụ ghi / xoá file: không tham số = chỉ in cách dùng (§135); mọi chế độ ghi file đòi đường ra (§98).
- Không chạy `build.py` / `narrate.py` chỉ để thử — dùng test, `--help`, `publish.py` (rẻ) và `--keep`.

## Sau khi sửa
```bash
tools/test/run.sh
python3 tools/qa/lesson_golden.py check <p>     # mọi bài import module đã đổi (golden.json có ở 16/17 bài; ja/chirality không — shadowBlur §127, kiểm bằng mắt)
node engine/render/shoot.js check --page projects/<p>/p2.html
python3 tools/kb.py --check                     # nếu đã sửa tài liệu
```
- Golden khác: đổi KHÔNG chủ ý → sửa code; có chủ ý (bài đang làm) → `record` lại và ghi lý do trong commit.
- Sửa tools Python: chạy `python3 tools/voice/publish.py <p>` trên một bài, `cmp` với bản trước.
- Cập nhật `docs/MAP.md` nếu thêm / dời công cụ. Commit local, mỗi pha một commit.
