# Brief: dựng cảnh phần 2 của pemdas ("Is PEMDAS a Law of Math, or Just a Convention?")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học của kênh dạy toán "99% from scratch". Lời đọc
tiếng Anh đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/pemdas/DNA.md` — "Rules of the Road".
   - Cả video là một con đường nhìn từ trên xuống.
   - Biểu thức SƠN trên mặt đường; phép tính là BIỂN BÁO có hình và màu theo cấp (× ÷ tròn xanh, + − thoi cam,
     ^ tam giác tím, ( ) vuông than).
   - Xe vàng là người ĐỌC, chạy trái → phải. Tính một bước = sơn lại đoạn "a op b" thành kết quả.
   - ĐỎ chỉ dùng cho cái sai: rào chắn sọc đỏ, ✗, gạch.
   - Bảng "hình theo từng phần" trong DNA §1 là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/pemdas/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/pemdas/CONTENT.md`: mọi con số, năm, tên, kết quả máy tính lên hình PHẢI có ở đây.
5. `projects/en/pemdas/kit.js`, đọc hết, nhất là phần "ĐỒ NGHỀ ĐƯỜNG" cuối file:
   - `verge`, `road` (truyền MẢNG mọi đoạn nối nhau), `centerLine`, `paint`, `paintRow`, `sign`, `car`, `barrier`,
     `billboard`, `night`, `must`;
   - cùng `card`, `actTitle`, `typed`, `cross`, `strike`, `ring`, `arrow`, `figure`, `lookup`, `ROAD`, `LEVEL`.
6. Cảnh mẫu đã dựng: `plates/a0-open.js` (mở bài, trang p1). Học cách làm:
   - camera trượt dọc một con đường dài theo mốc chữ (`CAM` + `camX`);
   - xe chạy qua từng chữ đúng lúc đọc;
   - ngã ba;
   - `sfx()`.
   Khung phong cách: `styleframes-compare.jpg` (hàng giữa).
7. `projects/en/pemdas/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ`.

## Hợp đồng một cảnh

File `projects/en/pemdas/plates/<tên>.js`:

```js
import { ERA, W, H, ..., lookup } from '../../kit.js';
export default class Letters {
  static ERA = 'road';                   // 'road' — riêng cảnh màn hình (máy dẫn đường / bảng tính / terminal): 'screen'
  static POSES = ['shrug'];              // CHỈ tư thế được giao
  static IMAGES = {};                    // ảnh người dùng tải: xem "Ảnh" bên dưới
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n của từ
    this.T = { ... };                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(0).start;             // câu đầu của mục
    this.FROM = this.START - 1.2;        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.6)
    // this.WIPE = [x, y];               // chỉ khi ERA khác cảnh trước: nền mới loang từ đây
  }
  sfx() { return [{ t: this.T.x, kind: 'pop' }, ...]; }   // tiếng của chuyển động BÊN TRONG cảnh
  render(g, t) { verge(g); ... }         // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

**Tra mốc.**
- Từ trong `w(i, word)` viết chữ thường, giữ nháy/gạch nối như trong câu ("let's", "can't", "sixty-four").
- Sai từ → `lookup` ném lỗi có tên câu: sửa ngay.
- Số được đọc bằng chữ ("six", "twelve", "nineteen"). "PEMDAS" → `'pemdas'`.

**Chuyển cảnh.**
- Trang `p2.html` lo chuyển cảnh trong 0.9 s từ FROM:
  - cùng ERA → **camera trượt ngang**: cảnh cũ ra trái, cảnh mới vào từ phải;
  - khác ERA → nền mới loang từ WIPE.
- **Mối nối đường:** ở đầu cảnh (FROM … FROM + 0.9) và cuối cảnh (FROM của cảnh sau … +0.9), con đường chính phải
  nằm ngang ở y = 540, rộng 300, chạy hết bề ngang khung. Hai cảnh trượt qua nhau thì đường liền mạch. Ở giữa cảnh
  bạn tự do: ngã ba, cầu vượt, biên giới…
- Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START.

**Biển tên mục và thẻ hồi.**
- Biển tên mục: `card(g, 'road', k, 'ACT TWO · A CHOICE', 'Left to right')`, k bật vào từ FROM, góc trái trên
  (x 96–~800, y 64–196). Chừa vùng đó.
- Mục MỞ HỒI gọi thêm `actTitle(g, 'road', t, START, 'ACT TWO', 'The part that really is just a choice')`.

**Hình bám lời.**
- Mỗi câu (một dòng của SCRIPT) = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc.
- Không khung nào đứng yên quá 3 s: camera trôi chậm dọc đường cũng tính.
- Vật rời khung bằng chuyển động (camera đi qua, xe chạy đi, sơn bị phủ), không biến mất giữa khung.

**Toán.**
- Toán trên hình PHẢI đúng, TÍNH bằng code: `must('10 − 3 + 2', 9)` ném lỗi nếu sai.
- Kết quả hiện ra luôn là số do code trả về.
- Dấu trừ dùng "−" (U+2212), trừ trong terminal/bảng tính.
- ✓ và ✗ không có trong font: dùng `cross` hoặc vẽ tay.

**Tất định.** Không `Math.random`, `Date.now`; ngẫu nhiên → `hash(i)`.

**Chữ.**
- Archivo 800 cho chữ sơn và biển.
- Cormorant nghiêng 600 cho nhãn ven đường.
- Plex Mono 500 cho màn hình, nhãn nhỏ ≥ 20 px.
- CHỈ các cỡ đã nạp trong `p2.html` (dòng `fonts`: Archivo 150/120/92/72/64/56/46/38/30; Plex 34–18; Cormorant
  italic 600 120/96/72/64/54/44/40, 500 72/46).
- Nhãn đặt trên CỎ, không đè vạch đường. Mặt đường y 390–690 là nơi chữ sơn.

**Mascot.**
- CHỈ tư thế được giao, NỬA THÂN: `figure(g, pose, cx, H, h, 'road', k)` (CROP tự đúng).
- Một bên khung (x ≤ 380 hoặc ≥ 1540), h khoảng 620–760.
- Vào bằng k (trồi lên), ra bằng k giảm.
- Mỗi lần xuất hiện 3–8 s quanh đúng câu được giao.
- Mascot vẽ SAU khi `g.restore()` camera (toạ độ màn hình), như `a0-open.js`.

## Ảnh (người dùng đang tải, CHƯA có)

- Cảnh nào cần ảnh (trang La Géométrie, trang Lennes 1917, bàn phím APL): dựng **bảng quảng cáo ven đường** với nội
  dung CHỮ thay thế: tên sách hoặc tên bài + năm, vẽ trên tấm bảng trắng.
- Đặt `const PHOTOS = false;` ở đầu file, và một nhánh `if (PHOTOS) billboard(g, key, …)` để khi có ảnh tôi chỉ việc
  bật cờ và điền `IMAGES`.
- Không tự đi tìm ảnh.

## Tiếng hiệu ứng (docs/lesson/SFX.md — bảng tiếng ở cuối DNA)

| chuyển động | tiếng |
|---|---|
| biển cắm xuống | `pop` |
| sơn lại thành kết quả | `snap` |
| xe chạy qua một phép | `tick` |
| camera lướt nhanh / xe lướt | `whoosh` |
| ngã ba, "?" | `question` |
| ✓ | `correct` |
| rào đỏ / ✗ | `error` |
| máy hiện kết quả | `beep` |
| gõ vào máy | `typeCues(chữ, a, b)` |
| chốt ý lớn (hiếm) | `impact` |

- Chuyển cảnh giữa các file trang tự lo (whoosh): đừng thêm ở FROM.
- Không tiếng cho chuyển động phụ.
- Đích: khoảng 1 tiếng mỗi 4–5 s ngoài chùm gõ.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + 3.0 (LEAD). Mốc từng câu: data/lines.txt (cột 3 = bắt đầu, p2).
node engine/render/shoot.js stills --page "projects/en/pemdas/p2.html?plates=<các cảnh của bạn>" --dur 600 \
  --t <mốc trang,…> --outdir out/en/pemdas/qa/<tên>
python3 tools/qa/sheet.py out/en/pemdas/qa/<tên> out/en/pemdas/qa/<tên>.jpg
```

- Chụp ít nhất một khung mỗi câu, cộng khung ở FROM + 0.45 (giữa chuyển cảnh).
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png) và sửa hết các lỗi sau:
  - chữ chạm mép;
  - chữ đè nhân vật, vạch hay biển;
  - chữ chồng chữ;
  - tương phản thấp;
  - khung trống quá 3 s.
- Log có `[PAGE ERROR]` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác, và KHÔNG commit.
  Cần công cụ mới → viết hàm cục bộ trong file cảnh.
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh).
- Báo cáo cuối (ngắn): file đã viết, mỗi câu hình làm gì, khung nào đã soi ở độ phân giải gốc, chỗ còn băn khoăn.
