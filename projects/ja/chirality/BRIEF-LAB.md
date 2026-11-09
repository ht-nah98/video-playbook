# Brief: bàn thử phong cách (DNA) cho ja/chirality — mỗi agent MỘT hướng

Video bài học kênh **99の発見** (tiếng Nhật, giọng Jaikyu): 「鏡の中の分子 ― 2026年ノーベル化学賞」 — phân tử có tay trái /
tay phải (鏡像異性体), sự sống chỉ dùng một tay, phòng thí nghiệm luôn ra 50/50; Nobel Hoá 2026: Kagan (非線形効果, 1986)
+ 硤合憲三 (不斉自己触媒, 1995/2003). Bài HOÁ đầu tiên của kênh toán — giữ góc toán (đường cong phi tuyến, dãy lặp, đồng xu).
Đọc `projects/ja/chirality/SCRIPT.md` (đã duyệt) và `CONTENT.md`; ý tưởng hình: `research/R3-visual.md` §2–3.
Người dùng sẽ SO 3 hướng rồi chọn một (như `projects/ja/2048/styleframes-compare.jpg`) → hai khung phải đẹp như khung thật.

**Vật xuyên suốt: MỘT tấm gương / đường gương** chia khung thành trái–phải; mọi thứ "tay trái" ở bên trái gương, "tay
phải" bên phải (vị trí là dấu hiệu thứ hai ngoài màu — an toàn mù màu). Trong chất liệu của bạn, gương đó LÀ gì?
Hai khung phải cho thấy cùng một gương. KHÔNG giống DNA các bài trước (ja/pi trời chàm 天球, ja/2048 bàn gỗ 盤上, sudoku kính
màu, solid-geometry giấy kem + đèn).

## Việc của bạn
Viết `tools/lab/<tên hướng>.html`: canvas 1920×1080, `window.__intro = { ready, still, frame, DUR: 2 }`, khung 0 khi
t < 1, khung 1 khi t ≥ 1. Mẫu cấu trúc (đọc hết trước khi viết): `tools/lab/banjo.html` (bài Nhật gần nhất — font Nhật,
nạp font, mascot), `tools/lab/shadowbox.html` (chiếu 3D). Chụp:
```bash
cd <repo>
node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>
```
Mở CẢ HAI ảnh ở độ phân giải gốc (Read file .png), sửa đến khi không còn lỗi: chữ chạm mép / đè nhân vật / chồng chữ,
tương phản thấp, ký tự rơi về font khác, khoảng trống vô nghĩa, phân tử méo.

**Phân tử 3D thật:** `projects/ja/chirality/data/molecules/*.json` (atoms el,x,y,z Å quanh tâm; bonds a,b,order; R/S).
Nạp MỘT file, vẽ đối tác bằng phản chiếu x → −x (đúng tuyệt đối). Chiếu phối cảnh, quả cầu sắp theo z (xa vẽ trước),
màu nguyên tố theo DNA của bạn (giữ phân biệt C, H, F, Cl, Br / O, N).

**Khung 0 — ACT 1 「手の形をした分子」.** Câu: 「その先に、4種類のちがう原子や原子団がつくと、鏡に映した姿を、どう
回しても重なりません。」 + 「どれか2つを入れかえると、ちょうど鏡の中の分子になります。」 Hiện: CHFClBr
(`R-CHFClBr.json`) bên trái gương, ảnh gương bên phải; một bản sao xoay thử chồng lên cho thấy chỉ khớp 2/4 nhóm (✗ ở
nhóm lệch); nhãn 「不斉炭素原子」 và 「鏡像異性体」. Mascot `assets/character-v2/cut/pose-halt.png` (giơ lòng bàn tay —
"hai bàn tay" của mở bài) ở một mép khung, KHÔNG đè phân tử; luật cắt khung: `assets/character-v2/POSES.md`.

**Khung 1 — ACT 6 「曲線を何度もたどる」.** Câu: 「ダンスのたとえを、いちばん単純な式にすると、y＝2x/(1+x²)」 +
「2%から始めると…99%」. Hiện: đồ thị trục ngang 「触媒のかたより」, trục dọc 「できた分子のかたより」 (0–100%), đường
chéo y = x (直線) và đường cong y = 2x/(1+x²); đồ thị mạng nhện (階段) từ x = 0.02 tới ~0.99 với nhãn các bước
2→4→8→16→31→56→86→99% và chữ 「モデル」; ô phụ nhỏ 「実験 1995」 hiện dãy THẬT 2 → 10 → 57 → 81 → 88% (4 vòng). Gương
của bạn phải có mặt (vd. đồ thị đối xứng −100…+100%, hoặc gương chia hai nửa trái/phải của trục). Mascot
`pose-pointer.png` (que chỉ) ở mép đối diện.

MỌI con số tính bằng code + `must(biểu thức, giá trị)` ném lỗi nếu sai: dãy lặp (làm tròn hiển thị = 2,4,8,16,31,56,86,99),
dãy 1995 là hằng số nguồn (không tính). Nhãn R/S đọc từ file phân tử, `must` đúng.

## Luật chung (docs/CRAFT.md, docs/lesson/LESSON-VIDEO.md, channels/ja/PIPELINE.md)
- Vùng an toàn chữ x 96–1824, y 64–1016. Chữ không đè nhân vật. Tương phản ĐO bằng số (≥ 4.5:1 chữ nhỏ). Chữ Nhật ≥ 28 px.
- Tất định: không `Math.random`/`Date.now`; ngẫu nhiên → `hash(i)` (`engine/lib.js`). `Promise.all` mọi font trước vẽ.
  Không `ctx.filter` trong lúc vẽ khung (chỉ một lần lúc nạp để làm sprite mờ sẵn).
- Font Nhật: Noto Sans JP [wght] (nhãn, công thức) + Shippori Mincho (tiêu đề) trong `assets/fonts/` — xem
  `channels/ja/channel.json` `fonts`. **Shippori THIẾU ⇌ α ≠ ≈ ∝ ₂ ₃ √ π θ; Noto thiếu ₂ ₃** → công thức bằng Noto, chỉ số dưới
  vẽ tay. Kiểm bằng fontTools `getBestCmap`.
- Không logo, không giao diện thật, không hình của Nobel/KVA. Đỏ (nếu có) chỉ cho cái sai / ✗.
- Đầu file: khối chú thích 6–10 dòng tiếng Việt = **DNA tóm tắt**: ý trung tâm (vì sao chất liệu hợp bài), gương là gì,
  bảng màu (hex, trái/phải), chữ, tiếng hiệu ứng hợp chất liệu (thư viện `assets/sfx/library.json`), các phần khác của
  bài sẽ trông thế nào (Pasteur tách tinh thể + 偏光, carvone mùi, thalidomide — điềm tĩnh, không hình nạn nhân, phân tử
  phẳng hai mặt, ba ô điều kiện của Frank, sàn nhảy cặp 56/38/6, đồng xu 37 lần 19/18, まとめ).
- Chỉ tạo `tools/lab/<tên>.html` và ảnh trong `out/_lab/<tên>/`. Không sửa file khác, KHÔNG commit, không gọi agent,
  KHÔNG dùng `pkill -f` / `killall` (LESSONS §19) — nếu cần dừng tiến trình, theo PID.

## Báo cáo (ngắn, ≤ 15 dòng)
Đường dẫn file + 2 ảnh, DNA tóm tắt, chỗ còn băn khoăn.
