# Mascot v2 — bản nhận dạng (anime, theo phong cách video mẫu)

Nguồn: 11 ảnh ChatGPT người dùng gửi 2026-09-30, lưu nguyên bản ở
`assets/character-v2/src/`. **Thay thế** mô tả trong `projects/mv/99-intro/CHARACTER.md` (sơ mi olive,
kính trắng đục) — bản đó là nhân vật cũ, giữ để tra lịch sử.

## Bất biến (identity lock)

| bộ phận | mô tả |
|---|---|
| tóc | nâu đen, rối, bồng, mái dài phủ xuống kính; ánh xanh lam ở mép phải |
| kính | gọng tròn mảnh màu đen, **tròng TRONG** — thấy mắt |
| mắt | **mí trĩu, lim dim, đồng tử nhỏ** — deadpan là tính cách chính |
| trang phục | **áo blouse trắng-xám** (lab coat) mở, tay xắn · áo thun đen cổ tròn · quần jean đen ôm · giày thể thao đen đế trắng |
| da | kem ấm, má không ửng |
| nét vẽ | anime cel-shade, bóng đổ mềm, viền mảnh; tỉ lệ ~6 đầu |
| **ánh sáng viền cài sẵn** | viền **cam/vàng ấm bên trái**, viền **xanh lam bên phải** trên mọi ảnh — khoá luôn hướng ánh sáng cảnh: nguồn ấm ở trái, lạnh ở phải |

Tính cách: nhà khoa học trẻ deadpan, hoài nghi nhẹ, "đứng cùng phía người học".
Cảm xúc mạnh (giận, nhảy) là ngoại lệ có chủ đích — dùng như cú nhấn.

## Tài sản

| file | nội dung | dùng cho |
|---|---|---|
| `pose-wave.png` | vẫy tay, cười nhếch | chào, mở đầu |
| `pose-point.png` | chỉ tay sang phải, tay chống hông | trỏ vào chữ/vật — đặt nhân vật **bên trái** khung |
| `pose-crossed.png` | khoanh tay | hoài nghi, "chứng minh đi" |
| `pose-thumb.png` | giơ ngón cái | xác nhận, đúng rồi |
| `pose-startled.png` | lùi lại, hai tay đưa ra, vạch sốc | bất ngờ, phủ nhận |
| `pose-slump.png` | xụi lơ, vạch u ám trên đầu | nản, thất bại |
| `pose-angry.png` | nắm tay, dấu giận cam | bực, phản đối |
| `pose-jump.png` | nhảy dang tay, cười | vỡ oà, cao trào |
| `head-turnaround.png` | đầu 6 góc (thẳng, ¾, nghiêng, sau) | xoay đầu, sinh pose mới |
| `visemes-3x3.png` | **9 khẩu hình miệng**, cùng góc mặt, cùng khung | **hát nhép theo mốc từng từ** |
| `keyart-99loading.png` | ảnh bìa: bảng đen, công thức, vệt sáng vàng, "99% Loading" | tham chiếu bảng màu và ánh sáng — không cắt dùng làm nhân vật |

Kích thước: pose 1086×1448 (crossed 1122×1402), visemes 1254×1254 (ô ~418px),
turnaround 1448×1086.

## Bản đã tách nền — `assets/character-v2/cut/`

Sinh bằng `tools/cutout/cutout.py` (chạy lại được; venv riêng ở
`tools/cutout/.venv`). Thông số từng file trong `cut.json`. Ảnh kiểm tra:
`_review.png` (mọi pose trên nền navy + đỏ), `_lipsync.png` (9 miệng ghép lên mặt nền).

- **Model `isnet-anime`**, không phải `u2net`: so trên pose-wave/pose-jump, u2net
  để lại quầng trắng dày quanh tay và áo; isnet-anime sạch mép.
- **Khử nhiễm nền** ở pixel mép bán trong suốt `C = (I − (1−a)·BG) / a` → hết
  viền trắng khi đặt lên nền tối (đã zoom kiểm ở ngón tay, tóc).
- Model **xoá luôn vạch chuyển động vẽ sẵn** (`\ | /` quanh pose-jump,
  pose-startled, vạch u ám ở pose-slump). Dấu giận đỏ ở pose-angry vẫn còn.
  Muốn các vạch đó thì engine tự vẽ — lại còn bám được nhịp.
- `pose-*.png`: cắt sát bbox + đệm 12px. `pose-point` chạm mép trên ảnh gốc
  (tóc sát khung) — là do ảnh nguồn.
- `head-turnaround.png`: còn một vệt mờ giữa hai đầu hàng trên; chỉ dùng tham khảo.

### Hát nhép

Lưới 3×3 gốc **không đều**: mặt trượt 0 / 7 / 12 px theo cột. `viseme-1…9.png`
đã được căn theo ô 1 (tương quan pha trên dải mắt/kính); lệch vùng mắt giảm
~22–28 → 7–10, ngang mức nhiễu giữa hai ô vốn cùng cột (4–7).

Nhưng **không thay cả ô**: AI vẽ lại mọi nét, nên viền tóc/kính/cằm rung 1–2px
giữa các ô. Cách dùng đúng: vẽ `viseme-1.png` làm mặt nền, rồi đè
`mouth-N.png` tại `cut.json → mouth.box` (x 187, y 260 trong ô 418px). Mảng
miệng là elip mép mềm 6px — ghép thử cả 9, không thấy đường nối.

| ô | khẩu hình | âm |
|---|---|---|
| 1 | khép, trung tính | nghỉ, M/B/P |
| 2 | khép, hơi mím | nghỉ (biến thể) |
| 3 | răng khép, môi dẹt | S, Z, T, D |
| 4 | há vừa | A ngắn, ơ |
| 5 | há to | A, cao trào |
| 6 | tròn vừa | O |
| 7 | tròn nhỏ | U, OO, W |
| 8 | nhe răng, cười dẹt | I, EE |
| 9 | há, thấy răng trên | E, EH |

Chỉ hát nhép được ở **cận mặt thẳng** (từ `viseme-1`). Các pose toàn thân có
góc mặt/kích thước khác, không đè miệng được.

### Miệng nói (video bài học, từ sudoku 2026-10-09)

Tư thế toàn thân không đè viseme được (ở trên), nên bài học dùng cách khác — **mặc định từ bài sudoku** (LESSONS §86):
- `assets/character-v2/mouths.js`: neo miệng từng tư thế (tâm x/y, bề rộng w, góc tilt trong ảnh `cut/pose-*.png`;
  màu da để che nét gốc). Đã đo: ponder, point, calculator, ok, wave. Tư thế mới → phóng to vùng miệng 4× lưới 10 px,
  đo, thêm một dòng; thiếu dòng thì `drawMouth` ném lỗi.
- `engine/talk.js`: `drawMouth(g, pose, {x0, y0, s, flip}, open, imgW)` vẽ khẩu hình anime (khoang nâu đỏ, lưỡi hồng)
  đúng neo; `open < 0.12` thì không vẽ (giữ nét miệng gốc). `mouthOpen(env, t, k)` = 0 khi nhân vật chưa đứng hẳn.
- `tools/voice/mouth_env.py <p> p1 p2`: RMS 30 ms của `audio/<part>.dry.wav`, −30…−12 dB → 0…1, mở tức thì, khép
  ~70 ms → `data/<part>.mouth.json` (tất định). Chạy lại sau mỗi lần tổng hợp lại giọng; `build.py` dừng nếu độ dài lệch.
- Kit: `figure(…, { t })` (t = giờ timeline của cảnh) → nói; `{ talk: false }` → im (ví dụ nhân vật đang nghe). Trang
  gọi `setTalk(json)`. Đã có sẵn trong `templates/lesson/`.
- Bàn thử: `tools/lab/talk.html` (5 tư thế nói theo lời thật; lệnh ở đầu file).

## Bản v2.1 (2026-10-01): khung trung + hát nhép theo giọng

Người dùng gửi thêm 9 ảnh (giữ nguyên tên tiếng Việt trong `src/`; `cutout.py` đổi tên
qua bảng `ALIAS`). Tám tư thế **khung trung** — cắt ở giữa đùi, nên luôn đặt chân ảnh dưới
mép khung (y ≥ 1180) hoặc crop góc:

| file | nội dung | dùng cho |
|---|---|---|
| `pose-notebook.png` | cầm sổ + bút, cười nhếch | đoạn giấy P19 (trang giấy CHÍNH là trang sổ này) |
| `pose-pointer.png` | que chỉ dẫn, tay chống hông | giảng: động cơ P18, "y equals x" |
| `pose-offer.png` | chìa tay phải, cười nhếch | giới thiệu đồ thị (P20) |
| `pose-invite.png` | chìa tay trái mời gọi | "Look again" (P20), màn kết |
| `pose-pockets.png`, `pose-pockets2.png` | đút túi, lạnh lùng | bridge tối 155–168 |
| `pose-stand.png` | đứng thẳng trung tính | nền cho crop góc |
| `pose-tea.png` | cầm tách trà (hơi nước bị xoá khi tách nền — engine tự vẽ) | đông cứng "loading" 227 |

**Bảng miệng B** (`Bảng chín biểu cảm miệng anime.png` → `viseme-b-*`, `mouth-b-*`): cùng 9
khẩu hình theo cùng thứ tự với `visemes-3x3`, nhưng lưới đều hơn (các ô lệch 0–3px thay vì
0/7/12px; sai số dải mắt sau khi căn ~5.4 so với ~6.3). Mảng miệng `MOUTH_B` đo bằng mắt
(đo tự động bằng độ biến thiên giữa 9 ô không được — AI vẽ lại cả tóc, viền áo). Engine
dùng `new Face().load(base, { set: 'b' })`.

**Hát nhép v2**: `tools/analyze/vox_env.py` đo năng lượng dải 300–3400 Hz của stem lead-vocals mỗi
khung 1/60s → `data/vox.json` (0..255). `mouthAt(t, words, env)`: nguyên âm quyết định HÌNH
miệng như v1, mức giọng quyết định ĐỘ MỞ (giọng gần tắt → khép giữa âm tiết; lớn → há to;
ngân quá mốc cuối từ → giữ miệng mở). Không truyền env → y hệt v1. So A/B ở 47.0–48.6s:
v1 đứng im nhiều khung liền, v2 khép đúng chỗ ngắt hơi.

**Ảnh nạp vào canvas CPU** (`toCanvas` trong `engine/mascot.js`, cả `Face.base`): lấy mẫu
lưới ký hiệu từ `<img>` cho pixel khác nhau tuỳ ảnh đã từng vẽ lên canvas GPU hay chưa —
xem `LESSONS.md` §16.

## Bản v2.2 (2026-10-01): tư thế cho bridge → finale

Lượt ảnh thứ hai (5 ảnh mới; "chìa tay mời gọi" trùng `pose-invite` đã có). Cũng khung trung:

| file | nội dung | dùng cho (Kế hoạch 5) |
|---|---|---|
| `pose-ponder.png` | tay chống cằm, trầm tư | "Why does it work?" 207.44 — bước ra trước khung đông |
| `pose-sky.png` | chỉ lên trời, miệng mở | "No rules falling from the sky" 198.44 (tay phải vươn sát mép — đặt x ≤ 1520) |
| `pose-down.png` | chỉ xuống đất | "One height / crossing / exponent there" 173.6 |
| `pose-halt.png` | giơ lòng bàn tay chặn | "No second answer" 175.94, "No tricks / No guessing" 196.86 |
| `pose-chalk.png` | thầy giáo cầm phấn, tay kia ngửa | "That's why the question had an answer…" — bảng đen 177.91 |

**Mặt đối xứng** (`projects/mv/exp-log/duet.js`): trục mũi của ô viseme nằm ở x = 222/418, không
ở giữa ô. Lật ngang quanh trục mũi và mỗi bên chỉ vẽ nửa phía mình → một gương mặt đối xứng
tuyệt đối (P21 "they become the same"). Ánh viền sẵn có của ảnh: vàng bên trái, xanh bên phải.

## Áp dụng phân tích video mẫu (`mv/REFERENCE-TEARDOWN.md` §2)

- **Khi đứng:** ảnh màu sạch, sắc — đúng như pose đã có.
- **Mọi lần vào/ra:** chuyển chất liệu bằng ký tự/hạt, không cắt cứng. Ký tự
  lấy màu và độ sáng từ chính ảnh pose. Ở kênh toán, ký tự nên là **ký hiệu toán**
  (∑ ∫ π √ ∞ = + x y 0–9) thay cho a/u/v/w của video mẫu.
- **Mở và kết:** chân dung dựng hoàn toàn bằng ký tự (khung sách) — dùng ảnh
  thẳng mặt từ `visemes-3x3.png` hoặc `head-turnaround.png`.
- **Tương phản với nền:** tóc và quần áo tối, áo blouse sáng → nền **không** được
  là đen tuyền (tóc chìm) và **không** được là trắng tinh (áo chìm). Nền tối có
  quầng sáng sau lưng nhân vật, hoặc nền giấy sáng có bóng đổ. Xem
  `LESSONS.md` §13.
- Ánh sáng viền cài sẵn (ấm trái, lạnh phải) → nguồn sáng của cảnh phải khớp,
  nếu không nhân vật trông như dán lên.
