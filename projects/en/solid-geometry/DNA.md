# DNA của `solid-geometry` — "Solid Geometry from Scratch" (video bài học, lời đọc)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md` đã duyệt 2026-10-09). Khung phong cách: `styleframes.jpg`
> (`tools/lab/shadowbox.html`). Người dùng chọn (2026-10-09): **A "Shadowbox" — giấy và đèn**, trong 3 hướng
> (`styleframes-compare.jpg`). Công nghệ: **canvas 2D + hình 3D chiếu** (người dùng chốt; docs/MEDIUM.md).

1. **Ý trung tâm — MỘT NGỌN ĐÈN, VÀ CÁI BÓNG CỦA NÓ.** Cả video là đồ thủ công bằng giấy trên mặt bàn giấy kem, dưới
   **một ngọn đèn treo cố định**. Mọi khối, mọi mặt phẳng đều là bìa gấp; đèn đổ **bóng thật** (tính từ toạ độ) xuống
   mặt giấy. Bóng chính là hình chiếu, và bài nói đi nói lại: *mọi bài toán không gian kết thúc trên một tam giác phẳng*.
   Trên hình: lúc giải xong một bài, **tam giác cần tìm tô cam đất và nằm phẳng trên giấy**.
   - **Vật xuyên suốt: CĂN PHÒNG** = hộp bìa mở nắp (shadowbox) **12 × 4 × 3 m** (tỉ lệ), đèn treo giữa trần. Trần 3 m,
     đường chéo 13 m (3² + 4² + 12² = 13², kit `must`). Trạng thái theo hồi:

     | hồi | căn phòng |
     |---|---|
     | mở bài | hộp-phòng nhìn chéo từ trên, ghế đẩu ba chân ở trong, góc tường–trần sáng nhẹ |
     | 1 | **góc tường–trần** = giao tuyến (nét mực kẻ dọc mép gấp) |
     | 2 | hai cạnh **chéo nhau** (cạnh trên tường trước + cạnh dọc đầu gần); cặp góc xa **cắt nhau** ("careful"); sàn ∥ trần |
     | 4 | cột / tường ⊥ sàn: nét dọc của vách |
     | 6 | **trần cao 3 m**: đoạn vuông góc từ đèn xuống sàn |
     | 7 | căn phòng **chính là hình hộp**: đường chéo 13 = Pythagoras 3D |
     | 8 | xếp khối đơn vị vào hộp-phòng: 12 × 4 × 3 = **144** khối |
     | 10 | hộp-phòng thu nhỏ trên kệ cùng các mô hình khác |

   - **Mục lục lời hứa** = ba **thẻ gấp chữ A** đánh số 1 · 2 · 3 đứng trên bàn, mỗi thẻ đổ bóng; câu hỏi viết vào thẻ.
     Thẻ hồi ghi "ANSWERS 1 / 2 / 3" ở hồi 1, 5, 8.
   - **Gạch hiểu lầm → sửa:** **dải giấy xé** dán chéo lên cái sai (tiếng `tear`), câu đúng viết mực bên cạnh. KHÔNG có
     màu đỏ. Đúng bốn chỗ: (1) c2 "skew?" ở cặp góc xa → "THEY MEET"; (2) d3 "ONE LINE" → "TWO CROSSING LINES"; (3) f4
     "120°" → "60°"; (4) i2 "HEIGHT = SIDE EDGE" ở lăng trụ xiên.

   Hình theo từng phần (một mục `##` = một file cảnh; a0 ở trang p1, còn lại p2):

   | cảnh | mục | hình |
   |---|---|---|
   | a0-open | Cold open | đèn bật trên bàn giấy; bài hình không gian in mờ (hộp, chóp) + "this one isn't for me" viết rồi bị **gấp đôi tờ giấy lại**; ba ví dụ gấp lên: **ghế đẩu ba chân**, góc phòng (hộp-phòng), **cầu vượt** (hai dải bìa chéo, bóng cắt nhau mà dải không chạm); ba thẻ chữ A 1·2·3 với ba câu hỏi; câu treo "three ideas… doesn't even try to define them": một chấm mực, một sợi chỉ, một tờ giấy → đèn tắt dần về đen. Mascot `stool` (bên phải, đúng lúc "three-legged stool") |
   | b1-bricks | Point, line, plane | thẻ hồi I "THREE BRICKS · ANSWERS 1" (mở từ đen: đèn bật); điểm = chấm mực, đường = chỉ mực kéo dài hai đầu, **mặt phẳng = tờ bìa mặt hồ**, kéo giãn ra vô tận (mép mờ dần), mỏng "NO THICKNESS"; vẽ quy ước: hình bình hành + "P"; "AXIOMS" in |
   | b2-rules | Four rules | 4 thẻ luật đánh số; (1) 2 chấm → 1 sợi chỉ; (2) 3 chấm → 1 tờ bìa; **ghế ba chân** đứng vững trên sàn gồ ghề vs **ghế bốn chân cập kênh** (`wood`), chân máy ảnh; (3) thước kẻ hai đầu chạm bàn → cả thước áp; (4) hai tờ bìa gặp nhau theo nếp gấp = giao tuyến → góc tường–trần của hộp-phòng |
   | b3-pin | Three ways to pin a plane | ba ô: 3 chấm · đường + chấm ngoài · 2 đường cắt nhau → mỗi ô một tờ bìa đặt khít lên |
   | c1-map | The map | thẻ hồi II "WHERE THINGS CAN BE"; tấm bản đồ gấp 3 nếp, 3 cột: LINE–LINE · LINE–PLANE · PLANE–PLANE |
   | c2-lines | Two lines | trên tờ phẳng: cắt / song song; rồi nhấc vào không gian: **chéo nhau**; hộp-phòng: cạnh trên tường trước + cạnh dọc đầu gần (chéo, bóng hai cạnh không cắt nhau trên một mặt); "careful": cạnh góc xa → **dải xé "skew?" → "THEY MEET"**; **cầu vượt**: hai tim đường chéo, xe giấy chạy qua nhau |
   | c3-lineplane | A line and a plane | 3 ô: chỉ nằm trên bìa · **kim xuyên tờ giấy** · **sợi cáp căng** phía trên dải đường, bóng nó song song |
   | c4-planes | Two planes | **cuốn sách mở** (hai tờ bìa gặp ở gáy) · sàn và trần của hộp-phòng; quay lại bản đồ: cột 1 và 3 sáng → "NEXT: TWO OF THESE CASES" |
   | d1-standin | A stand-in | thẻ hồi III "PARALLEL"; d (chỉ lơ lửng trên bìa P) + **người đại diện d′** trong P (chỉ mực cùng hướng); bóng d rơi đúng lên d′ khi đèn ở trên; "d ∥ d′ ⊂ P ⇒ d ∥ P" |
   | d2-cut | Which way the cut goes | d ∥ P; một tờ bìa thứ hai chứa d hạ xuống cắt P → nếp cắt ∥ d; dao rọc giấy cắt một khối (thiết diện) theo hướng đó |
   | d3-lock | Two directions lock a plane | một sợi chỉ ∥ mặt kia: tờ bìa **xoay quanh như cánh cửa** chạm mặt dưới → **dải xé "ONE LINE"** → hai chỉ cắt nhau → tờ bìa khoá cứng song song (`snap`); mặt thứ ba cắt cả hai → hai nếp song song |
   | e1-every | Every line in the plane | thẻ hồi IV "PERPENDICULAR"; cột và vách hộp-phòng ⊥ sàn; một que đứng trên bìa, các sợi chỉ toả ra mọi hướng trong bìa, mỗi sợi một dấu vuông |
   | e2-two | Two are enough | vô số chỉ → chỉ giữ 2 sợi cắt nhau, hai dấu vuông → cả tờ bìa sáng "⊥ P"; "LIKE YOUR TIMES TABLES" |
   | e3-three | The theorem of three perpendiculars | **đúng khung lab 0**: tờ bìa P, a trong P, b xiên qua O, **đèn rọi thẳng xuống**, bóng **b′ cam đất**; hai dấu vuông; `a ⊥ b′ ⇔ a ⊥ b`; "SPACE → FLAT PAGE". Mascot `point` (bên trái, chỉ vào hình) |
   | e4-planes | Two planes at a right angle | vách hộp-phòng ⊥ sàn vì chứa nét dọc ⊥ sàn; hệ quả: trong mặt 1 kẻ đường ⊥ giao tuyến → đường đó ⊥ mặt 2 (dấu vuông kép) |
   | f1-between | In between | thẻ hồi V "ANGLES · ANSWERS 2"; **thang dựa tường** trong hộp-phòng; 3 thẻ: LINE–LINE · LINE–PLANE · PLANE–PLANE |
   | f2-lines | Two lines | hai chỉ chéo nhau; trượt một sợi (giữ hướng, vệt mờ đi theo) tới khi gặp sợi kia → đo góc; thước đo độ giấy "0°–90°" |
   | f3-lineplane | A line and a plane | thang: chấm trên thang, **dây dọi** xuống sàn → chân đường vuông góc; **bóng thang** trên sàn; **tam giác vuông cam đất** nằm phẳng; góc ghi số (tính) |
   | f4-planes | Two planes | **cuốn sách mở**: điểm trên gáy, hai nét ⊥ gáy trong hai trang → góc; laptop giấy mở **120°** → **dải xé "120°" → "60°"**; mái nhà (hộp-phòng có mái) |
   | f5-triangle | Every road leads to a triangle | ba bài vừa rồi thu nhỏ, mỗi bài chảy về **một tam giác cam đất phẳng** trên tờ giấy; "THEN: TRIGONOMETRY" |
   | g1-shortest | The shortest way | thẻ hồi VI "DISTANCE"; từ một điểm có nhiều sợi chỉ xuống sàn, sợi thẳng đứng ngắn nhất (độ dài từng sợi tính bằng code) |
   | g2-pointplane | A point and a plane | hộp-phòng: đèn → sàn = **3 m** (dây dọi); khó ở chỗ "WHERE IS THE FOOT?" → dùng hệ quả e4 (dựng lại nhanh). Mascot `compass` (bên phải) |
   | g3-any | Any point will do | chỉ ∥ bìa: nhiều dây dọi từ nhiều điểm, cùng một độ dài; hai tờ bìa song song: như vậy |
   | g4-skew | Two skew lines | hai chỉ chéo nhau; **đoạn vuông góc chung** (tính bằng code, hai dấu vuông); mẹo: tờ bìa chứa sợi 1, ∥ sợi 2 → dây dọi từ sợi 2 xuống tờ bìa = khoảng cách |
   | h1-faces | Faces, edges, vertices | thẻ hồi VII "SOLIDS · ANSWERS 3"; viên gạch, **xúc xắc**, kim tự tháp gấp giấy; ảnh **Giza** (`giza.jpg`, khung bìa, credit); nhãn FACE · EDGE · VERTEX chỉ vào một khối |
   | h2-prisms | Prisms | một đa giác giấy **đùn thẳng lên** để lại vệt = lăng trụ; đứng / đều; hộp; lập phương; **hộp-phòng 12 × 4 × 3, đường chéo 13**: d² = a² + b² + c² |
   | h3-pyramids | Pyramids | chóp gấp; chóp đều (đỉnh trên tâm đáy, dây dọi); **tứ diện 4 · 4 · 6** |
   | h4-five | Only five | **đúng khung lab 1**: 5 khối Platon giấy + nhãn; **vì sao chỉ 5**: các mặt gấp quanh một đỉnh: 3/4/5 tam giác gập lên được, 6 tam giác **nằm phẳng** (360°), 3 vuông / 4 vuông, 3 ngũ giác / 3 lục giác (bảng tổng góc tính bằng code); Euclid *Elements* XIII; **xúc xắc d4–d20** lăn (`dice`). Mascot `icosa` (bên phải) |
   | i1-room | How much room | thẻ hồi VIII "VOLUME"; một khối giấy đổ đầy nước (mực xanh nhạt dâng lên); đơn vị m³ / cm³ |
   | i2-stack | Stacking cubes | **xếp khối đơn vị vào hộp-phòng**: lớp đáy 12 × 4 = 48, 3 lớp → 144 (đếm bằng code); lăng trụ = đáy × cao; **lăng trụ xiên**: dải xé "HEIGHT = SIDE EDGE" → cao = khoảng cách hai mặt đáy (dây dọi) |
   | i3-third | The one third | lăng trụ tam giác giấy **mở ra 3 chóp** ba sắc giấy, cùng thể tích (định thức trong code); "× ⅓"; **Giza**: 2.59 vs 7.78 triệu m³ (hai thanh giấy) |
   | j1-turn | Turning a flat shape | thẻ hồi IX "SOLIDS THAT SPIN"; một hình giấy cắm trên que, quay → vệt quét thành khối |
   | j2-cylinder | The cylinder | chữ nhật quay quanh cạnh → trụ; πr²h (= lăng trụ đáy tròn); **bóc nhãn lon** (`tear`), trải phẳng thành chữ nhật 2πr × h |
   | j3-cone | The cone | tam giác vuông quay → nón; ốc quế, cọc giao thông, mũ sinh nhật (giấy); ⅓πr²h; đường sinh l; **khai triển thành hình quạt** |
   | j4-sphere | The sphere | nửa hình tròn quay quanh đường kính → cầu; "SAME DISTANCE r FROM THE CENTER"; 4πr², ⁴⁄₃πr³ |
   | j5-archimedes | Archimedes' favorite | cầu giấy trong ống trụ bìa, **bóng hai cái** trùng vòng; "SPHERE = ⅔ CYLINDER" (tính); tranh **Cicero tìm mộ** (`cicero-tomb.jpg`, Benjamin West 1797) |
   | k1-flat | Back to the flat page | thẻ hồi X; mọi mô hình trên kệ dưới đèn; mỗi bóng góc/khoảng cách co về một **tam giác cam đất**; câu hỏi "WHICH TRIANGLE? WHICH PLANE?" viết vào |
   | k2-chain | A chain, not a list | **chuỗi giấy** (vòng giấy móc nhau): POSITIONS → PARALLEL · PERPENDICULAR → ANGLES · DISTANCE → HEIGHT → VOLUME |
   | k3-together | Putting it together | ba thẻ chữ A 1·2·3 mở bài quay lại, mỗi thẻ lật ra câu trả lời trên hình đầu tiên giải thích nó (4 luật · tam giác cam · lăng trụ → 3 chóp) |
   | k4-next | Next time | ghế ba chân + góc hộp-phòng, mặt phẳng và đường thẳng ẩn hiện lên nét mực; mascot `stool` rồi `wave`; biển kênh **"99% FROM SCRATCH" + "SUBSCRIBE"** đứng yên ≥ 4 s tới hết |

2. **Chất liệu / màu** (đo WCAG trên giấy #F2EADB):
   - giấy bàn **kem `#F2EADB`** (vân sợi, tối nhẹ ở mép) · bìa **trắng ngà `#FBF6EC`**, mặt gấp sáng/tối theo pháp
     tuyến so với đèn (sáng ≥ 0.55, tối ≥ 0.35 để không ngả xám-be quá).
   - **mực xanh đậm `#1D3557` = nét, đường, chữ chính** (12.4:1).
   - **cam đất `#C0643A` = CÁI BÓNG / tam giác cần tìm** (chữ cam dùng `#9A4320`, 5.5:1). Chỉ bóng và tam giác cần tìm.
   - chì `#55606E` = chữ phụ, nét khuất (5.4:1) · đèn `#FFE7B0` = quầng sáng.
   - **xanh ngọc giấy `#2E7F7A`** = khối 20 mặt (hô ứng `pose-icosa`) và **chỉ một vật đang xét** mỗi cảnh khi cần
     phân biệt hai đường (ví dụ d với d′).
   - Không đỏ. Cái sai = dải giấy xé (§1).
   - **Bóng đổ của vật:** cam đất pha giấy, mép mềm (đèn nhiều điểm), alpha ≤ 0.45. Bóng chỉ "đậm cam" khi nó LÀ hình
     chiếu đang được nói đến (b′, bóng thang).
3. **Chữ** — Cormorant Garamond **LN nghiêng** (tên điểm/đường/mặt, lời dẫn, tiêu đề lớn) · IBM Plex Mono 500 (nhãn
   nhỏ, đếm, thẻ hồi). Thiếu ở cả ba font (fontTools, 2026-10-09): **⊥ ⇔ ∥ φ** (và ⅓ ở Cormorant) → kit vẽ tay
   (`perp`, `iff`, `para`), phân số ⅓ ⁴⁄₃ ⅔ vẽ bằng tử/mẫu. Có sẵn: π ² ³ √ ≈ ° ′ × · − → … .
4. **Nhịp** — hình bám từ được đọc: chấm/chỉ/bìa hiện đúng lúc gọi tên; mỗi câu ≥ 1 thay đổi; không khung đứng yên quá
   3 s (đèn đung đưa KHÔNG tính). Camera 3D trôi rất chậm (yaw ≤ 4°/s) khi đang giảng một hình, đứng yên khi người xem
   cần đọc nhãn (LESSONS §77). Xoay nhanh chỉ khi lời nói "in space" / "lift it into space".
5. **Nhân vật** — 5 tư thế, mỗi lần một khoảnh khắc: `stool` (a0 "three-legged stool"; k4), `point` (e3), `compass`
   (g2), `icosa` (h4), `wave` (k4 cuối). Một bên khung, chân chạm đáy; tay chỉ vào hình. Đứng ngoài vùng hình 3D.
6. **Intro** — a0 kết ở câu treo: chấm, chỉ, tờ giấy hiện; **đèn tắt** → đen kín → intro 3D (từ/về đen). p2 mở từ
   đen: **đèn bật** trên thẻ hồi I.
7. **Camera / chuyển cảnh** — mọi cảnh cùng ERA `desk`: chuyển bằng **lật tờ giấy** (tờ cũ trượt lên, `page`) do trang
   lo. Thẻ hồi: đèn chớp tắt–bật 0.3 s. Trong cảnh: camera 3D quay quanh hình (orbit) chậm; không zoom mạnh.
8. **Ảnh / hiện vật** — `assets/history/INDEX.md`: dán như **tấm ảnh in kẹp trên bìa**, có bóng; credit dưới ảnh:
   Giza "PHOTO: NINA · CC BY 2.5"; Cicero "BENJAMIN WEST · 1797 · YALE UNIVERSITY ART GALLERY".
9. **CẤM** — đỏ; màu thứ bảy ngoài bảng màu; chữ nghiêng theo phối cảnh 3D (chữ luôn phẳng, hướng màn hình); cạnh
   khuất vẽ liền; số nào lên hình mà không tính trong code hoặc không có trong CONTENT.md; cam đất cho thứ không phải
   bóng / tam giác cần tìm; chữ fade (viết vào hoặc gấp vào).
10. **Tiếng** — `page` (lật tờ, chuyển cảnh) · `pen` (kẻ nét mực, một tiếng mỗi cụm) · `flap` (gấp mặt bìa lên) ·
    `shimmer` (đèn bật / bóng hiện) · `tear` (dải xé — đúng 4 + bóc nhãn lon = 5) · `tick` (đếm mặt, đếm khối) ·
    `snap` (khối gấp khít, tờ bìa khoá) · `wood` (ghế cập kênh, que) · `dice` (5 khối Platon) · `chip` (khối đơn vị
    xếp vào — một tiếng mỗi lớp) · `correct` (tam giác cam hoàn tất). TRẦN cả video: tear ≤ 5, dice ≤ 2, wood ≤ 3,
    correct ≤ 8, shimmer ≤ 14 (một mỗi thẻ hồi + ít), whoosh-long ≤ 2; mật độ ≤ 1 tiếng / 3 s mỗi cảnh ngoài chùm đếm.
11. **Vật dùng chung (kit, TRƯỚC khi giao cảnh — LESSONS §71)**:
    - `cam()` + `P()` phép chiếu (yaw, pitch, dist, target, FOV 32°), **đèn cố định** `LAMP = [0, 0, 9]` (toạ độ thế giới) cho
      mọi bóng; `shadowOf(p)` chiếu lên z = 0 từ đèn (bóng vật) và `drop(p)` chiếu thẳng (hình chiếu vuông góc).
    - `solid(mesh)`: vẽ khối bìa (painter + tô theo pháp tuyến + cạnh khuất nét đứt chì), `sheet()` tờ bìa mặt phẳng,
      `thread()` chỉ mực, `dot()` chấm mực, `rightMark()`, `angleArc()`, `label()` chữ phẳng cạnh điểm chiếu.
    - Lưới khối: Platon (toạ độ chuẩn, φ), hộp, lăng trụ, chóp, trụ/nón/cầu (lưới tròn), **hộp-phòng 12 × 4 × 3** với
      các cạnh có tên (`ROOM.edges.topFront`, `nearVertical`, `farVertical`…).
    - `tornStrip()`, `tentCard()` (thẻ chữ A), `lampOn(k)`, `perp/iff/para` vẽ tay, `frac()`.
    - `must` mọi con số: V − E + F, cạnh bằng nhau, a·b′ = 0, 13, 144, 2.59 / 7.78, ⅔, tổng góc đỉnh Platon, 60°.
12. **Chỉ số sàn** — mỗi cảnh: ≥ 1 vật 3D có bóng; chữ ≥ 28 px trừ credit; nhãn không cách điểm quá 60 px; không khung
    đứng yên > 3 s; mascot ≤ 12% thời lượng p2.

> 2026-10-19: cold open a0 viết lại — đổ nước kim tự tháp → hộp (⅓ ×3), cặp cao-hẹp, cầu ⊂ trụ = ⅔, rồi 3 trục; không còn ghế đẩu / góc phòng / cầu vượt trong a0 (exports giữ cho k3/k4). Không intro kênh.
