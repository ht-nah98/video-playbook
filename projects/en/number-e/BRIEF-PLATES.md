# Brief: dựng cảnh phần 2 của number-e ("The Number e, Explained: Why 2.718 Keeps Showing Up")

> MẪU — đạo diễn sửa theo DNA của bài trước khi giao (bản đã chạy thật: `projects/en/intuition/BRIEF-PLATES.md`,
> `projects/en/pi/BRIEF-PLATES.md`). Những chỗ `‹…›` phải điền; luật nào chỉ đúng với DNA có tính chất X thì ghi "nếu DNA
> có X". Tên hàm dưới đây là của kit mẫu (`templates/lesson/kit.js`) — kit của bài có thể khác. Hợp đồng cảnh đầy đủ:
> `docs/ENGINE.md` § "Cảnh bài học".

Bạn dựng MỘT NHÓM cảnh (ghi trong lời giao việc) cho video bài học kênh dạy toán "99% from scratch". Lời đọc tiếng Anh
đã thu xong, mốc từng chữ là THẬT (`data/p2.timeline.json`). Đọc theo thứ tự, đừng bỏ bước nào:

1. `projects/en/number-e/DNA.md` — ‹tên DNA›: ý trung tâm, vật xuyên suốt, màu mang nghĩa gì, màu NHẤN được phép.
   Bảng "hình theo từng phần" là ý đạo diễn cho mục của bạn: theo nó, chi tiết tự quyết.
2. `docs/CRAFT.md` §5: vùng an toàn chữ x 96–1824, y 64–1016; chữ không đè nhân vật; tương phản đo bằng số.
3. `projects/en/number-e/SCRIPT.md`: lời của mục bạn làm (người xem NGHE gì thì hình nói cùng ý, đúng lúc).
4. `projects/en/number-e/CONTENT.md`: mọi con số, năm, tên lên hình PHẢI có ở đây.
5. `projects/en/number-e/kit.js` — đọc HẾT.
6. Cảnh mẫu của đạo diễn: `plates/a0-open.js` + khung chụp ‹đường dẫn›; bàn thử phong cách `tools/lab/‹hướng›.html`.
7. `projects/en/number-e/data/lines.txt`: các dòng `p2 i bắt-đầu kết-thúc chữ` (chữ thường, đúng như lookup cần).
8. `projects/en/number-e/assets/history/INDEX.md`: ảnh lịch sử có sẵn (key, file, cỡ, nhãn bắt buộc).

## Mascot vẽ nét (DNA §5b, `docs/character/CHARACTER-MASCOT.md`) — từ 2026-10-29 thay người que

Cảnh nào DNA §5b giao mascot DIỄN: dựng bằng `engine/mascot-actor.js` (mẫu: `projects/en/logarithm/actor.js` + plates b02 b07 b08 b12):

```js
import { actor, F, HANDS, fast } from '../../../../engine/mascot-actor.js';
const A = actor({ base: BASE_Y, mh: 250 });                      // mặt sàn của kit + chiều cao mascot
this.ACT = { keys: [[t, F({ x, y, c, l0, l1, lean, yaw, ...HANDS.up, look, lookY, mood, mouth }), fast], …],
             walks: [[x0, x1, t0, t1]], hold: t => 0..1, grip: (t, P) => [[x, y] | null, [x, y] | null, k] };
const J = A.draw(g, this.ACT, t);                                // J.C tâm đầu, J.r tới đỉnh tóc, J.armL.e / J.armR.e bàn tay
```

Luật: CHỈ góc thẳng + xoay 3/4 `yaw` ở khoảnh khắc nhìn vật / đi bộ (§219 §220); tư thế = đích bàn tay (`HANDS` hoặc tự đặt
trong tầm với, gác §176), khuỵu `c`, nhấc chân `l0/l1`, nghiêng `lean`; lấy đà → làm → đà theo; vào / ra khung bằng đi (`walks`,
không fade); khoá thời gian tăng dần (ném lỗi nếu lùi giờ). Người dẫn góc lặn khi mascot diễn (`actorOn` trong kit). Dáng kiểu
mới → thêm vào bảng dáng `projects/en/_lab/mascot-poses.html` → người dùng duyệt → clip vài cảnh → người dùng duyệt → mới build
(KHÔNG tự gắn "đạt"). Soi ảnh 0.5 s một khung quanh mọi hành động trước khi gửi clip.

## Hợp đồng một cảnh

File `projects/en/number-e/plates/<tên>.js` (tên trong lời giao việc), một mục `##` của SCRIPT.md = một file:

```js
import { W, H, ground, card, actTitle, typed, prog, lookup, must, typeCues } from '../kit.js';
export default class Euclid {
  static ERA = '‹chất liệu›';                            // khoá của kit.ERA
  static IMAGES = { euclid: './assets/history/euclid.jpeg' };   // ảnh cần nạp (đường dẫn tương đối trang)
  static POSES = ['point'];                              // CHỈ tư thế được giao (assets/character-v2/cut/pose-*.png)
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');                   // L(i) = câu i của p2; w(i, 'từ', n) = lúc bắt đầu lần thứ n
    this.T = { e: w(11, 'elements'), x: w(12, 'five') }; // MỌI mốc lấy từ chữ — không gõ giây tay
    this.START = L(11).start;                            // câu đầu của mục
    this.FROM = Math.max(this.START - 1.2, L(10).end + 0.5);   // luật FROM bên dưới (mở HỒI: 2.6 thay 1.2)
    // this.CONTINUES = true;                            // cảnh vẽ TIẾP đúng hình của cảnh trước → cắt thẳng (§50)
  }
  sfx() { const T = this.T; return [...typeCues('ELEMENTS', T.e, T.e + 0.6), { t: T.x, kind: 'pop' }]; }
  render(g, t) { const T = this.T; ground(g, Euclid.ERA); /* … */ }   // t = giây trong p2 (0 = câu 0); tự tô nền toàn khung
}
```

**Tra mốc.** Từ viết chữ thường, giữ nháy/gạch nối như `lines.txt` ("doesn't", "thirty-seven"). Sai từ → `lookup` ném lỗi.
Từ LẶP trong câu → truyền n; `prog(t, a, b)` ném lỗi khi b < a (LESSONS §59). Chạy `python3 tools/qa/lookups.py en/number-e`
và đọc TỪNG dòng "LẶP" — công cụ chỉ đọc lời gọi dạng `w(<số>, '<từ>'[, n])` (nháy ĐƠN, chỉ số là số viết thẳng);
viết khác (nháy kép, biến) thì nó không thấy.

**FROM — một luật.** `FROM = max(START − lead, KẾT của cảnh trước + 0.5)`; lead = 1.2 (cảnh thường) / 2.6 (mục MỞ HỒI);
KẾT = `end` câu cuối của cảnh trước, hoặc mốc kết chuyển động đặc biệt của nó (lao vào, loang) nếu muộn hơn (§44, §64).

**Chuyển cảnh.** Trang `p2.html` lo trong 0.9 s từ FROM: khác ERA → nền mới loang từ `WIPE`; cùng ERA → ‹chuyển cảnh
cùng ERA của DNA: nạp giấy trượt lên / màn nhung khép–mở / …›, có tiếng tự động. Cảnh phải ĐẸP ở mọi
t ∈ [FROM, cảnh sau.FROM + 0.9], kể cả trước START. `CONTINUES`: khung đầu của bạn phải TRÙNG khung cuối cảnh trước
(cắt thẳng, không tiếng). Mối nối đặc biệt của nhóm bạn: ‹liệt kê — ai sở hữu›.

**Biển tên mục / thẻ hồi.** ‹hàm, vị trí, vùng phải chừa›. Ô chữ cố định chứa tối đa **‹N› ký tự** (đạo diễn ĐO bằng
`measureText`, §56) — tên dài hơn thì rút gọn, đừng để tràn. Mục MỞ HỒI gọi thêm `actTitle(…)`.

**Vật dùng chung với nhóm khác** (§71). ‹vật — hằng số/hàm trong kit hoặc bảng DNA›. Vật đã xuất hiện ở cảnh nhóm khác:
"vẽ lại đúng như ‹cảnh›" (cùng số, cùng hình học, cùng màu) — không tự đặt lại.

**Hình bám lời.**
- Mỗi câu = ít nhất một thay đổi trên hình, bám đúng TỪ được đọc. Không khung nào đứng yên quá 3 s (camera trôi chậm
  không đủ nếu hình đã vẽ xong; gõ thêm dòng chữ trên bố cục cũ cũng không đủ — đổi bố cục, đẩy camera, hay cho vật
  chuyển động; `docs/study/01`). Cảnh MỞ phải chuyển động từ giây đầu.
- Vật rời khung bằng chuyển động, không biến mất giữa khung. Chữ hiện theo cách của DNA, không fade.
- Mỗi khung MỘT ý chính. Hiểu lầm lời nói ra → gạch / đánh dấu SAI đúng CHỮ sai, ý đúng viết ngay dưới; KHÔNG gạch câu
  đúng, KHÔNG tô màu "sai" lên kết luận đúng (§58). Đẳng thức đúng nhưng "hỏng khi bỏ luật" → nứt qua dấu "=" + nhãn
  điều kiện, KHÔNG gạch (§62).
- Dụng cụ trên hình làm ĐÚNG phép đo lời đọc nói và khớp với cảnh trước đã dùng nó (§57).
- **Vật xuyên suốt** (DNA §1): vẽ đúng trạng thái của hồi bằng hàm chung của kit. **Mục tóm tắt**: vẽ lại thu nhỏ hình
  của từng hồi, không vẽ hình mới.
- Vật phải đứng yên (biển kênh, nhãn chốt) vẽ ở toạ độ MÀN HÌNH, sau khi `restore` camera. Nếu DNA có cuộn / camera:
  clip phần cuộn ở y > đáy thẻ mục + 10, kẻo nội dung trượt QUA thẻ (§68).
- Nếu DNA có ô mang biến: ô / nhãn của một BIẾN giữ đúng biến đó, giá trị viết chỗ khác; gọi lại một điều kiện → cho
  thấy nó đổi trạng thái (§67).
- **Màu mang nghĩa không làm màu nhấn** (§61): khoanh / gạch chân / viền chọn / số thứ tự bằng ‹màu nhấn được phép›.
- **Không khung trống** (§63): phần tử đầu tiên vẽ từ FROM + 0.3; vùng mới sau camera có sẵn ô chờ ngay khi tới.
  Kết luận viết xong TRƯỚC câu cuối của cảnh (§64).
- **Mascot NÓI** (§86): `figure(g, pose, …, k, { t })` — truyền `t` của cảnh thì miệng mở theo lời đọc khi đã đứng
  hẳn; đặt mascot ở câu mà nó "nói", `{ talk: false }` nếu nó chỉ nghe. Tư thế chưa có trong
  `assets/character-v2/mouths.js` → ném lỗi: báo đạo diễn, đừng tự đo.

**Toán / số.** Mọi số lên hình tính bằng code (`must`); chỉ số liệu trong CONTENT.md; làm tròn ghi "≈". `must()` chỉ
đặt ở trạng thái ĐÃ XONG (sau chuyển động + biên an toàn), không ở mốc bắt đầu của chuyển động — khung chuyển tiếp
ném lỗi làm chết render giữa chừng (§70).

**Tất định.** Không `Math.random`/`Date.now` (→ `hash(i)`); không `ctx.filter` trong render (sprite mờ vẽ sẵn).

**Chữ.** ‹mặt chữ / cỡ đã nạp trong `p2.html` (dòng `fonts`), hàm chữ của kit — đừng chép hàm chữ riêng vào cảnh›.
Ký tự ngoài ASCII kiểm fontTools `getBestCmap` (DNA không dùng font: bảng glyph của kit, §69); thiếu → vẽ tay. Chữ nhỏ
≥ 4.5:1 trên nền thật.

**Mascot.** CHỈ tư thế được giao, một bên khung (cx ≤ 380 hoặc ≥ 1540), cỡ ‹h theo DNA›, chân chạm đáy, 3–8 s quanh
đúng câu, vẽ sau khi `restore` camera. **Chân dung**: nhãn tên + năm (chỉ năm có trong CONTENT) + note bắt buộc cho
ảnh tưởng tượng.

## Tiếng hiệu ứng (DNA cuối file; docs/lesson/SFX.md)

‹bảng chuyển động → tiếng của DNA›
- Chuyển cảnh tự có tiếng — đừng thêm ở FROM. Không tiếng cho chuyển động phụ.
- **Mật độ ≤ 1 tiếng / 3 s** trên mỗi cảnh (ngoài chùm gõ); không hai tiếng trong 0.25 s.
- Hạn mức loại hiếm của NHÓM BẠN: hàng của bạn trong bảng dưới. Báo số đã dùng theo loại.

| nhóm (cảnh) | ‹loại hiếm 1› | ‹loại hiếm 2› | ‹…› |
|---|---|---|---|
| a0 (đạo diễn) | | | |
| g1 ‹cảnh› | | | |
| g2 ‹cảnh› | | | |
| … | | | |
| **TỔNG** (đạo diễn cộng TRƯỚC khi gửi) | **≤ trần DNA** | **≤ trần DNA** | |

(§51, §55, §66: mỗi nhóm đúng hạn mức mà cả video vẫn vượt — lỗi là phép cộng của đạo diễn. Sau khi gộp, đếm lại bằng
`shoot.js cues` cả hai trang.)

## Chụp, chạy khô và NHÌN (bắt buộc trước khi báo xong)

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
#  thời gian TRANG = mốc p2 + LEAD (build.json, phần p2). Mốc từng câu: data/lines.txt (cột 3).
node engine/render/shoot.js stills --page "projects/en/number-e/p2.html?plates=<cảnh trước>,<các cảnh của bạn>" --dur 900 \
  --t <mốc trang,…> --outdir out/_lab/en/number-e/<nhóm>
python3 tools/qa/sheet.py out/_lab/en/number-e/<nhóm> out/_lab/en/number-e/<nhóm>.jpg
node engine/render/shoot.js check --page "projects/en/number-e/p2.html?plates=<các cảnh của bạn>"   # chạy khô MỌI khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js cues --page "projects/en/number-e/p2.html?plates=<các cảnh của bạn>" --out /tmp/claude-1000/<nhóm>-cues.json
python3 tools/qa/lookups.py en/number-e
```
- Ít nhất một khung mỗi câu, cộng FROM + 0.45 (nạp CẢ cảnh trước) và khung cuối cảnh.
- Mở ít nhất 3 khung ở ĐỘ PHÂN GIẢI GỐC (Read file .png), sửa hết: chữ chạm mép / tràn ô; chữ đè nhân vật / chồng chữ;
  tương phản thấp; khung đứng im > 3 s; vật biến mất giữa khung; ký tự rơi về font khác. `[PAGE ERROR]` = lỗi JS.
- `shoot.js check` phải thoát 0 — ảnh chụp từng câu không trúng khung chuyển tiếp, chạy khô thì trúng (§70).

## Giới hạn

- Chỉ tạo/sửa file cảnh của nhóm bạn. KHÔNG sửa `kit.js`, `p2.html`, `p2-order.js`, cảnh nhóm khác; KHÔNG commit;
  KHÔNG gọi agent khác. Cần công cụ mới → hàm cục bộ trong file cảnh (rồi báo, để đạo diễn đưa vào kit nếu dùng chung).
- Không gọi OmniVoice, không render video (chỉ ảnh tĩnh / chạy khô). `shoot.js` luôn kèm `--page`.
- **KHÔNG `pkill -f` / `killall`**: nhiều nhóm chạy `shoot.js check` cùng lúc, `pkill -f "shoot.js"` giết lệnh của nhóm khác
  (LESSONS §98). Dừng lệnh của mình bằng PID nó in ra.
- Báo cáo cuối (≤ 20 dòng): file đã viết, mỗi câu hình làm gì, khung đã soi ở độ phân giải gốc, kết quả `check`, số
  tiếng theo loại, cỡ font cần thêm, chỗ còn băn khoăn.
