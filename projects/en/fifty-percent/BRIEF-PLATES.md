# Brief: dựng cảnh phần 2 của fifty-percent ("What Does 50% Actually Mean?")

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học của kênh dạy toán "99% from scratch". Lời đọc
tiếng Anh đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/fifty-percent/DNA.md` — "Đèn trong đêm": ÁNH SÁNG = THÔNG TIN.
   - Cả video là MỘT đêm (ERA `night`). Điều đã biết thì sáng, điều chưa biết là sương.
   - Con số xác suất luôn treo trong quầng đèn của NGƯỜI XEM (hổ phách), không treo trên vật.
   - Vàng `C.gold` = điều thật sự đúng. Đỏ `C.red` CHỈ cho cái sai / mất tiền / báo động nhầm.
   - Đoạn cá cược dùng PHỈNH dưới một ĐÈN BÀN trong đêm (`deskLamp`, `chip`) — vẫn là đêm, không đổi ERA.
   - Bảng "hình theo từng phần" trong DNA §1 là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/fifty-percent/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/fifty-percent/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây (kể cả mục "Ví dụ minh hoạ do
   hình thêm": số cán cân Bayes, độ đo 3/10, hiệu chỉnh 7/10).
5. `projects/en/fifty-percent/kit.js`, đọc HẾT, nhất là "ĐỒ NGHỀ ĐÊM" cuối file:
   `sky` (nền mọi cảnh, sương trôi theo t), `fogBank`, `glow`, `lantern`, `beam`, `dashes`, `coin`, `chip`, `deskLamp`,
   `channelBoard`, `text`, `label`, `fmt`, `C` (màu), cùng `card`, `actTitle`, `typed`, `figure` (mascot nhuộm đêm,
   trả về khung {x,y,w,h}), `portrait`, `cross`, `strike`, `ring`, `arrow`, `must`, `lookup`.
6. Cảnh mẫu đã dựng: `plates/a0-open.js` (mở bài, trang p1). Khung chụp: `out/en/fifty-percent/qa/a0c/t_31.50.png`.
   Bàn thử phong cách: `tools/lab/lantern.html` (khung 1 = cảnh đếm 100 000 người, dùng lại được cho f2-count),
   phỉnh: `tools/lab/felt.html`. Ảnh so: `styleframes-compare.jpg` (hàng B).
7. `projects/en/fifty-percent/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/fifty-percent/assets/history/INDEX.md`: ảnh lịch sử có sẵn.

## Hợp đồng một cảnh

File `projects/en/fifty-percent/plates/<tên>.js`:

```js
import { W, H, C, CG, MONO, sky, glow, ..., lookup } from '../../kit.js';
export default class Flips {
  static ERA = 'night';                  // MỌI cảnh
  static POSES = ['coin-flip'];          // CHỈ tư thế được giao
  static IMAGES = { ars: './assets/history/ars-conjectandi-1713.gif' };   // ảnh (đường dẫn tương đối trang)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1a');  // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n của từ
    this.T = { ... };                    // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(0).start;             // câu đầu của mục
    this.FROM = this.START - 1.2;        // lúc cảnh bắt đầu hiện (mở HỒI: START − 2.6)
  }
  sfx() { return [{ t: this.T.x, kind: 'coin' }, ...]; }   // tiếng của chuyển động BÊN TRONG cảnh
  render(g, t) { sky(g, t); ... }        // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

**Tra mốc.** Từ trong `w(i, word)` viết chữ thường, giữ nháy/gạch nối như trong `lines.txt` ("doesn't", "one-time",
"twenty-four"). Số đọc bằng chữ. Sai từ → `lookup` ném lỗi có tên câu: sửa ngay.

**Chuyển cảnh.** Trang `p2.html` lo chuyển cảnh trong 0.9 s từ FROM: camera TRÔI NGANG (cảnh cũ ra trái, cảnh mới vào
từ phải). Mỗi cảnh tự vẽ `sky(g, t)` nên sương nối liền. Cảnh phải ĐẸP ở mọi t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả
trước START. Vật quan trọng nên vào SAU FROM + 0.9 (khi camera đã dừng), bằng chuyển động.

**Biển tên mục và thẻ hồi.**
- Biển tên mục: `card(g, 'night', k, 'ACT ONE · FREQUENCY', 'Flip it again, and again')`, k từ FROM, góc trái trên
  (x 96–~820, y 64–196). Chừa vùng đó. Tên mục = tên `##` trong SCRIPT (rút gọn nếu > 34 ký tự).
- Mục MỞ HỒI gọi thêm `actTitle(g, 'night', t, START, 'ACT ONE', 'Probability as frequency')` (chữ từ `# ACT` của
  SCRIPT) và FROM = START − 2.6.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc.
- Không khung nào đứng yên quá 3 s. Sương trôi và lửa rung KHÔNG đủ: phải có vật vào/đổi/sáng lên theo lời, hoặc
  camera đẩy/trôi chậm (như a0: `push`).
- Vật rời khung bằng chuyển động (trôi ra, chìm vào sương, đèn tắt), không biến mất giữa khung. Chữ không "fade" thay
  cho chuyển động — chữ VIẾT vào bằng `typed`.
- Ánh sáng là ngữ pháp: thêm thông tin = đèn sáng thêm / sương tan; chưa biết = sương.

**Toán / số.** Mọi số lên hình tính bằng code: `must('99 / 5094 * 100', …)` ném lỗi nếu sai; hiển thị số code trả về
(`fmt` cho dấu phẩy nghìn). Chỉ số liệu trong CONTENT.md. Tỉ lệ/phần trăm làm tròn thì ghi "≈".

**Tất định.** Không `Math.random`, `Date.now`; ngẫu nhiên → `hash(i)`. KHÔNG `ctx.filter = 'blur(...)'` trong render
(chậm khi render): dùng `glow`, `fogBank`, `beam` (sprite vẽ sẵn). Cache canvas theo khoá cố định nếu cần.

**Chữ.**
- Cormorant Garamond **LN** 600 (số lớn) và nghiêng 500/600 (câu dẫn, tên). Plex Mono 500 cho nhãn (`label`, ≥ 20 px).
  Archivo 800 chỉ cho số trên phỉnh.
- CHỈ các cỡ đã nạp trong `p2.html` (dòng `fonts`); cần cỡ khác thì thêm vào DANH SÁCH TRONG BÁO CÁO, đừng sửa
  p2.html — dùng cỡ gần nhất trong lúc chờ.
- Ký tự lạ (✓ ✗ ∪ Ω ∑ ≥): kiểm fontTools `getBestCmap` hoặc vẽ tay. ✓ ✗ không có: `cross` / vẽ tay.
- Tương phản: chữ nhỏ ≥ 4.5:1 trên nền thật (sương làm nền sáng lên — đo ở chỗ có sương).

**Mascot.**
- CHỈ tư thế được giao, NỬA THÂN: `figure(g, pose, cx, H, h, 'night', k, { rim })` (rim = phía có đèn).
- Một bên khung (cx ≤ 380 hoặc ≥ 1540), h 700–780, chân chạm đáy. Vào bằng k (trồi lên), ra bằng k giảm.
- Mỗi lần xuất hiện 3–8 s quanh đúng câu được giao. Vẽ SAU mọi lớp camera (toạ độ màn hình).

**Ảnh lịch sử.** `portrait(g, key, 'night', x, y, h, k, { label: { name, life, note } })` — ảnh duotone ngà trên đêm.
Grundbegriffe: KHÔNG dùng ảnh (đó là bản in lại 1973) — dựng trang tên 1933 bằng chữ in. Không chân dung Bayes.

## Tiếng hiệu ứng (DNA cuối file; docs/lesson/SFX.md)

| chuyển động | tiếng |
|---|---|
| búng / đồng xu đập tay | `coin` |
| đèn bật, chấm sáng lên, sương tan | `shimmer` (hiếm) |
| đếm, bộ đếm, từng mục hiện ra | `tick` / `pop` |
| đặt / đẩy phỉnh | `chip` |
| tin nhắn hiện lên | `pop` |
| OTP, mất 20¢, báo động nhầm | `error` |
| cán cân nghiêng | `snap` |
| câu hỏi treo, "?" | `question` |
| gõ chữ vào máy (nếu có) | `typeCues(chữ, a, b)` |
| chốt ý lớn | `impact` — CHỈ f2-count ("≈ 2%") và h4-end ("the distance") |

- Chuyển cảnh tự có `whoosh-long`: đừng thêm ở FROM.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (không tính chùm gõ); không hai tiếng trong 0.25 s. Im lặng là nhịp.
- Trần cả video: `error` ≤ 6, `shimmer` ≤ 6, `coin` ≤ 8. Báo số đã dùng trong báo cáo.

## Chụp và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + 3.0 (LEAD). Mốc từng câu: data/lines.txt (cột 3 = bắt đầu, p2).
node engine/render/shoot.js stills --page "projects/en/fifty-percent/p2.html?plates=<các cảnh của bạn>" --dur 800 \
  --t <mốc trang,…> --outdir out/en/fifty-percent/qa/<tên>
python3 tools/qa/sheet.py out/en/fifty-percent/qa/<tên> out/en/fifty-percent/qa/<tên>.jpg
node engine/render/shoot.js cues --page "projects/en/fifty-percent/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<tên>-cues.json
```

- Chụp ít nhất một khung mỗi câu, cộng khung ở FROM + 0.45 (giữa chuyển cảnh) và cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png) và sửa hết: chữ chạm mép; chữ đè nhân vật / chữ chồng chữ;
  tương phản thấp (đêm + sương!); khung trống hoặc đứng im quá 3 s; vật biến mất giữa khung.
- Log có `[PAGE ERROR]` / `LỖI` = lỗi JS.

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit; KHÔNG
  gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh.
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh).
- Báo cáo cuối (ngắn, ≤ 20 dòng): file đã viết, mỗi câu hình làm gì (gọn), khung đã soi ở độ phân giải gốc, số tiếng
  theo loại, cỡ font cần thêm (nếu có), chỗ còn băn khoăn.
