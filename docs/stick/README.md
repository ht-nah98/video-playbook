# Hệ người que — đầu mối (reference → từ điển → dàn cảnh → so với mẫu)

Người dùng 2026-10-26: "xây 1 hệ reference, 1 hệ tài liệu người que — sau này các video của chúng ta sẽ thêm vào"; "liên tục
tối ưu tư thế, phong cách, cách triển khai, độ mượt mà, mềm mại". Mẫu chuẩn: Alan Becker (Animation vs. Coding / Math).
Nhân vật: người que khăn đỏ (`docs/character/CHARACTER-STICK.md` — vai, nhận dạng, cách diễn). Thư mục này là phần KỸ THUẬT.

| tài liệu | trả lời câu hỏi | code / công cụ |
|---|---|---|
| [STYLE.md](STYLE.md) | người que trông ra sao (tỉ lệ, nét, đường cong) — số đo Becker vs ta | `engine/hero.js` (`soft`, `SOFT_ARM`, `SOFT_TORSO`) |
| [DICTIONARY.md](DICTIONARY.md) | có những dáng nào, dùng khi nào, học từ khung nào | `engine/stick-dict.js` (`DICT`, `pose`), bảng `tools/lab/stick-dict.html` |
| [MOTION.md](MOTION.md) | nối dáng thành chuyển động mềm: nhịp, overlap, chân khoá, cầm vật | `stage()` trong `engine/stick-dict.js`, `engine/stickmove.js` |
| [REFERENCE.md](REFERENCE.md) | video mẫu nào, mốc nào, cắt ảnh lại thế nào | `tools/study/stick_ref.py`, `tools/study/stick_dict_pairs.py` |

Tài liệu nền (đọc khi cần sâu): `docs/study/08-stick-animation.md` (đạo diễn tư thế, walk cycle), `10-stick-fight.md` (vì
sao Becker "mượt"), `14-stick-repository-lessons.md` (repo ngoài), `STICKMAN-ANIMATION-SYSTEM.md` (quy trình key → breakdown
→ in-between), LESSONS §136–§138, §148–§149, §152, §157–§158, §164–§171 (`python3 tools/kb.py nguoi que`).

## Vòng tối ưu (mỗi video mới / mỗi mẫu mới đi qua đúng vòng này)

1. **Mẫu** — có video Becker mới (tối đa 1–2 video một buổi, LESSONS §160) → `stick_ref.py <video> --slug <x> --color <màu>`
   → bảng dáng có mốc giờ ở `out/_lab/stick-ref/<x>/`. Ghi mốc đáng học vào REFERENCE.md.
2. **Từ điển** — dáng mới / dáng sửa → `engine/stick-dict.js` (một dòng, kèm `ref: '<x>@<giây>'`). Chụp bảng
   (`shoot.js stills --page tools/lab/stick-dict.html --t 0.1 --outdir out/_lab/stick-dict`) rồi `stick_dict_pairs.py` → **soi
   cặp mẫu ↔ ta** (`out/_lab/stick-dict/pairs.png`). Chỉnh tới khi cặp đọc cùng một ý (không cần giống từng góc).
3. **Chuyển động** — dàn bằng `stage()` (overlap sẵn) theo MOTION.md; nếu làm lại một đoạn mẫu → đặt cạnh bản gốc cùng giờ
   (mẫu: `tools/lab/becker-redo.html` + `out/_lab/becker-redo/compare.mp4`). Soi khung cùng mốc hai bên: lệch giờ, biên độ, trọng tâm.
4. **Duyệt** — clip tốc độ thật người dùng xem (LESSONS §136, §164); số đo xanh KHÔNG phải duyệt.
5. **Đúc kết** — điều học được → LESSONS + dòng tương ứng ở STYLE / DICTIONARY / MOTION; video nào dùng dáng nào ghi ở
   DICTIONARY §"đã dùng".

## Trạng thái (2026-10-26)

| phần | trạng thái |
|---|---|
| nét mềm C (chi cong, thân cong) | người dùng chọn ("kiểu C ok") — `hero(..., { soft: true })`, bài cũ không đổi pixel |
| tỉ lệ soft: tay 0.85, thân 1.2 | người dùng: "tay ngắn thêm, người dài thêm", "tay dài quá nửa thân" — đã áp, **chờ xem lại** |
| từ điển 34 dáng + bảng cặp với mẫu | v1, chưa duyệt |
| thân hai đốt cong (`curl`, lưng uốn theo quán tính) | người dùng 10-27: "thân cứng đơ như đoạn thẳng" — đã áp, **chờ xem lại** |
| overlap (đầu/tay trễ) trong `stage()` | v1, đã áp vào becker-redo |
| làm lại 60 s "Animation vs. Coding" | người dùng: "tổng thể tốt" (bản trước tỉ lệ mới) — `out/_lab/becker-redo/compare.mp4` |
