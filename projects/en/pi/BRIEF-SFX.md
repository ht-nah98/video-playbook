# Brief: đặt tiếng hiệu ứng cho pi ("What Is Pi, Really?")

> Mẫu brief cho trợ lý đặt `sfx()` (dùng cho video đã dựng xong, hoặc sau khi dựng cảnh). Bảng
> tiếng theo DNA của bài. Bản đã chạy: `projects/en/zero-div/BRIEF-SFX.md`. Quy trình: `docs/lesson/SFX.md`.

Video đã dựng xong và người dùng đã duyệt hình (`out/en/pi/pi.mp4`). Hình KHÔNG được đổi. Việc của bạn:
thêm `sfx()` vào từng cảnh để `build.py` trộn tiếng dưới giọng đọc. Đọc theo thứ tự:

1. `docs/lesson/SFX.md`: luật tiếng (mỗi chuyển động có nghĩa = một tiếng, cùng loại chuyển động = cùng loại tiếng),
   cú pháp `sfx()`, `typeCues`, và mục "Mật độ và cân loại" (bài học pemdas: QUÁ DÀY là lỗi).
2. `projects/en/pi/DNA.md`: chất liệu "trang giấy kẻ ô có lỗ thủng ở điểm 0".
3. Từng file `projects/en/pi/plates/*.js` (thứ tự ở `plates/p1-order.js`, `plates/p2-order.js`): đọc `init()`
   (mốc `this.T` lấy từ chữ đọc) và `render()` để biết lúc nào cái gì hiện ra, bị gạch, rơi, rách.
4. `projects/en/pi/SCRIPT.md` nếu cần hiểu câu.

## Bảng tiếng của pi (VÍ DỤ của zero-div — DNA trang giấy; viết lại theo DNA bài)

| hình | tiếng (`kind`) |
|---|---|
| chuyển cảnh trang trượt lên (cùng ERA) | `page` — đặt `TRANSITION = 'page';` (field lớp) ở MỌI cảnh ERA `page` đứng sau một cảnh `page`. Cảnh đổi ERA (vào/ra `void` — terminal trong lỗ) giữ mặc định `whoosh-long` |
| phép tính/chữ lớn được VIẾT ra bằng nét bút | `pen` — MỘT tiếng ở lúc bắt đầu viết cụm đó, không phải mỗi ký tự |
| chữ gõ trong terminal (Hồi 3, `d2-computer`) | `typeCues(chuỗi, a, b)` khớp đúng `typed(..., prog(t, a, b))` trong render |
| terminal in kết quả | `beep` |
| vật thể xuất hiện (táo, quả, miếng vá, hiện vật dán) | `pop` |
| biểu thức gộp/đổi dạng (kết quả hiện ra) | `snap` |
| bút đỏ gạch, ✗, "UNDEFINED", sai | `error` (hiếm, chỉ chỗ quan trọng) |
| câu hỏi treo, "?" lớn | `question` (hiếm) |
| trang RÁCH khi ép 1 = 2 | `tear` (đúng một lần) |
| táo/miếng vá rơi tuột qua lỗ, camera lao vào lỗ | `whoosh` |
| khoảnh khắc "à ra thế" | `shimmer` (rất hiếm) |
| chốt ý lớn | `impact` (tối đa 2 cả video) |

## Luật đặt

- Mốc lấy từ `this.T` / mốc đã dùng trong render (giờ TIMELINE, như T) — KHÔNG gõ giây tay. Nếu render dùng
  `prog(t, a, b)` thì tiếng đặt ở `a` (lúc chuyển động bắt đầu), trừ `snap`/kết quả đặt lúc nó hiện rõ.
- **Mật độ: ≤ 1 tiếng / 3 s** trên cả trang, KHÔNG tính chùm gõ terminal. Ưu tiên những chuyển động mang nghĩa;
  chuyển động phụ (trôi, thở, lưới) không tiếng. Im lặng là một phần nhịp.
- **Trần từng loại (cả video):** `error` ≤ 10, `impact` ≤ 2, `tear`/`shimmer` ≤ 4, `question` ≤ 6. Thừa thì giữ chỗ
  quan trọng nhất, chỗ còn lại im.
- Không đặt tiếng ở `FROM` (chuyển cảnh tự có).
- Không tiếng nào chồng lên trong 0.25 s với tiếng khác (trừ chùm gõ).
- Chỉ thêm `sfx()`, `TRANSITION` và import `typeCues` nếu cần (kit.js đã export `typeCues`). Không sửa `render`,
  `init`, mốc, `kit.js`, trang `.html`. Không commit, không render video.

## Kiểm (bắt buộc)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
node engine/render/shoot.js cues --page projects/en/pi/p1.html --out /tmp/claude-1000/zd-p1.json
node engine/render/shoot.js cues --page projects/en/pi/p2.html --out /tmp/claude-1000/zd-p2.json
```

Lỗi `loại tiếng lạ` hoặc `[PAGE ERROR]` = sửa. Đếm: số tiếng mỗi trang, số tiếng ngoài chùm gõ / thời lượng trang
(DUR ≈ mốc cuối), khoảng cách nhỏ nhất giữa hai tiếng không phải gõ. Báo cáo cuối (ngắn): mỗi cảnh bao nhiêu tiếng,
loại gì gắn với hình nào, mật độ mỗi trang, chỗ còn băn khoăn.
