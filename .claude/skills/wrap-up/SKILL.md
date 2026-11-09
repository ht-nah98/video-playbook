---
name: wrap-up
description: Đúc kết sau một video (hoặc một đợt việc) — ghi bài học mới vào docs/LESSONS.md, đưa luật lặp lại vào CRAFT, cập nhật STATUS, playbook, template, bộ nhớ. Dùng khi người dùng nói "đúc kết", "rút kinh nghiệm", "tổng kết bài này".
---

# Đúc kết (mẫu: §124–§134 sau trig / logarithm; đợt lớn 2026-10-21)

## 1. Gom nguyên liệu
- Lỗi đã gặp trong bài: quét đạo diễn, reviewer, người dùng chê, công cụ hỏng, thời gian mất. Chỉ lỗi THẬT có bằng chứng.
- `python3 tools/kb.py <từ khoá>` cho từng lỗi — đã có mục chưa? Có → đây là LẶP LẠI: ghi "lặp lại §n" và nâng thành
  luật cứng (kit / công cụ chặn bằng code), đừng viết mục mới y hệt.

## 2. Viết mục LESSONS
- Cuối `docs/LESSONS.md`: `## N. <bài học một dòng> (<bài>, <YYYY-MM-DD>)`, thân: chuyện gì xảy ra (số đo), vì sao, **Luật:**.
- Thêm `§N <mô tả ngắn> [BH|MV|chung]` vào đúng nhóm trong bảng chỉ mục đầu file (`→ CRAFT §x` nếu đã thành luật ngắn).
- `python3 tools/kb.py --check` phải ✓.

## 3. Nâng luật
- Luật đúng cho mọi video, đã gặp ≥ 2 lần hoặc đắt → một gạch đầu dòng trong `docs/CRAFT.md` (dẫn `§N`), sửa marker ở chỉ mục.
- Luật của một pha → `docs/lesson/LESSON-VIDEO.md` / `PACKAGING.md` / `SFX.md` / `channels/<kênh>/`.
- Luật kiểm được bằng code → đưa vào `templates/lesson/` (kit, BRIEF-PLATES, SCRIPT) hoặc công cụ — mạnh hơn lời dặn (§95).

## 4. Trạng thái + bộ nhớ
- `docs/STATUS.md`: dòng của bài (title, dài, DNA, còn chờ) + nhật ký sản xuất.
- Bộ nhớ: chỉ thứ repo không ghi được (sở thích / phản hồi của người dùng); trạng thái bài ở `docs/STATUS.md` (bộ nhớ Claude `lesson-videos-status` chỉ là bản tóm tắt).
- Commit local một commit "lessons from <p> (§a–§b): …". Báo người dùng tiếng Việt: các mục mới, luật nâng, việc còn chờ.
