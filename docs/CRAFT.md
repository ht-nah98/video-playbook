# CRAFT — luật nghề đúng cho MỌI dạng video

Rút từ ba MV (99-intro, exp-log, add-it-up), mười hai video bài học tiếng Anh (math-30k … logarithm), năm bài Nhật (ja/pi … ja/gacha) và từ hkt-project (16 tập bài giảng). Cập nhật lần cuối 2026-10-21 (tới LESSONS §134). Đây là lớp CHUNG: MV ca nhạc,
video bài học, hay dạng nào sau này cũng phải giữ. Phong cách thì KHÔNG có ở đây — phong cách là DNA của từng
video (`docs/DNA.md`). Bằng chứng từng luật nằm ở mục được dẫn (`LESSONS §n`, hoặc tài liệu hkt).

## 0. DNA luôn linh hoạt — không bao giờ cố định (người dùng 2026-10-29: "bạn quên rồi tôi buồn lắm")

Áp cho CẢ HỆ THỐNG: kênh Anh, kênh Nhật, kênh sử, MV — video, thumbnail, banner, Shorts, mọi thứ có phong cách.

- **Dùng lại QUY TRÌNH, công cụ, phép đo — không bao giờ dùng lại nền, bố cục, dáng, phong cách.** Mỗi video, mỗi thumbnail,
  mỗi bộ A/B là một lần sáng tạo mới theo nội dung của nó. Một lựa chọn hợp cho MỘT bài không tự thành luật cho bài sau (§218,
  lặp ×3: exp-log "thế giới liên kết", "ví dụ ≠ yêu cầu", thumbnail "3 phong cách chung" §217).
- Thấy mình viết "chung / mọi bài / luôn / cố định" cho một thứ thuộc về PHONG CÁCH mà người dùng không nói → dừng, hỏi.
- Trước khi thiết kế một bộ mới, đọc sổ những gì đã làm (thumbnail: `channels/THUMB-LOG.md`) và đừng lặp bài gần đây.
- **Trước khi viết file / lối vào mới, xem sổ năng lực `tools/qa/capabilities.json` của vùng đó và dùng lại.** Đúc kết kỹ thuật = thêm dòng vào sổ, không chỉ ghi LESSONS (§294 §295).

## 1. Nội dung trước hình

- **Chọn công cụ trước:** 2D, 3D hay kết hợp theo `docs/MEDIUM.md`. Cần ĐỌC thì 2D; cần CẢM, hoặc không gian là nội
  dung, thì 3D (LESSONS §77).
- **Gói trước lời** (bài học): thumbnail → title → 0–5 s → 0–30 s viết và duyệt TRƯỚC kịch bản (`docs/lesson/PACKAGING.md`
  §0b). Làm sau render là làm lại mở đầu (§111); làm trước thì không phải sửa gì (§116). Chi tiết đóng gói: §11 dưới.
- **Kịch bản trước code.** MV: TREATMENT từ lời bài. Bài học: kịch bản lời đọc từ nội dung bài. Không viết dòng
  render nào trước khi người dùng duyệt (LESSONS §1).
- **Khung phong cách THẬT trước khi duyệt** — chụp từ bàn thử, không mô tả bằng chữ (§31).
- **Tắt tiếng đi, khán giả có hiểu cảnh nói gì?** Không → cảnh là trang trí.
- **Trang / công cụ cho người dùng đọc: câu hỏi trước biểu đồ.** Mỗi khối = câu hỏi → câu trả lời tính từ số → một biểu
  đồ → việc nên làm; viết danh sách câu hỏi trước khi vẽ (`site/DESIGN.md`, §141).
- **Một nguồn số: `CONTENT.md`.** Mọi số khác (brief giao agent, thẻ trên hình, chữ trên ảnh nguồn) chép từ đó BẰNG CODE
  và đối chiếu với câu đang đọc, không chỉ với CONTENT (§118, §132).
- **Cơ chế trong kịch bản → mô phỏng bằng code TRƯỚC khi viết**; CONTENT ghi mô hình sinh ra mỗi số, brief ghi hồi nào dùng
  mô hình nào (§117). Hình "đang chơi / đang chạy" theo đúng luật của nó, kể cả cảnh minh hoạ (§100). Cặp đối lập (trái/
  phải, lam/tím) lần theo CẢ chuỗi nhân quả qua các cảnh; kit có `must` cho từng cặp (§103, §108).
- **Soát nguồn:** câu "mọi X đều…" soát đầu tiên (§48, §107); số không tự đo → gán đúng chủ, không nhận ngôi thứ nhất
  (§101, §112); title cực đoan phải có ≥ 1 sự thật trong video chứng minh (§124). Sau mỗi lần cắt độ dài, lập lại bảng
  lời hứa → dòng trả lời (§107).
- **Toán trên hình phải đúng** — có unit test cho mọi đẳng thức, đồ thị, phép dựng hình (`tools/test/`). Số làm tròn
  của một CẬN đi theo hướng an toàn (cận dưới xuống, cận trên lên) và `must` kiểm chính chuỗi hiện trên hình (§94).
- **Chỉ số là sàn, không là mục tiêu.** YDIF đo màn hình có rung, không đo hình có nghĩa (§1). Đặt sàn SAU khi chọn
  chất liệu (§28).

## 2. Mốc thời gian lấy từ dữ liệu, không gõ tay

- Mốc hình bám **từ được nói/hát** (forced alignment), không bám RMS của bản trộn (§21, §27).
- Tra câu theo chữ thì câu LẶP phải ghi lần thứ n (§25; `tools/qa/lookups.py`).
- Kiểm chứng bằng **nguồn độc lập** (nghe lại, ASR), không bằng bảng mốc của chính mình (§5).

## 3. Render tất định

- Mỗi khung là hàm thuần của `t`. Cấm `Math.random`/`Date.now`; cần ngẫu nhiên → `hash(i)`.
- Trạng thái dùng chung giữa các lần vẽ (đối tượng tạm của three.js, Euler giữ thứ tự trục…) phải được đặt lại đầy
  đủ mỗi lần. Kiểm tất định gồm cả "cùng một mốc render hai lần trong một phiên" (LESSONS §74).
- Năm nguồn phá tất định đã gặp: vòng preview, đua font, giải mã ảnh GPU, bộ đệm dùng chung, `shadowBlur`/`ctx.filter`
  (cache theo thứ tự khung → bóng = sprite vẽ sẵn, §127) (§6, §16, §18;
  `docs/ENGINE.md` §5). MV: kiểm xuôi lẫn ngược (`tools/qa/determinism.sh`), refactor → `tools/qa/golden.sh`. Bài
  học: `node engine/render/shoot.js check --page …`, refactor → `tools/qa/lesson_golden.py`. Dời thư mục cũng là refactor: golden
  mọi bài trước + sau, khớp 100% mới commit; công cụ viết lại đường dẫn chỉ chạm chuỗi có đích đã dời (§159).

## 4. Nhìn ảnh — đúng độ phân giải

- Kiểm tự động xác nhận mốc đúng, KHÔNG xác nhận cảnh có nội dung. Chụp từng cảnh và NHÌN (§7).
- Kết luận về chất liệu/chữ phải soi **độ phân giải gốc**; tờ xem thu nhỏ chỉ để định vị (§12, §15, §32).
- Ảnh mâu thuẫn với tính toán → nghi hạ tầng trước logic (§6). Công cụ phải đếm số ảnh trước khi so (§20).
- **"Nhóm báo đã kiểm" ≠ đã nhìn.** Sau khi gộp: đạo diễn quét cả bài mỗi 10 s, trả lỗi theo mốc về đúng nhóm; rồi
  reviewer độc lập quét LỆCH mốc (2, 12, 22…) + đối chiếu `lines.txt` (§122). Chữ tí hon trong ảnh quét thường là
  pop-in dở dang → chụp ±0.5 s trước khi giao sửa (§130). `stills --t` là giờ TRANG = giờ timeline + LEAD (§102).
- **Kênh sử: độ giàu hình là tiêu chuẩn, không phải phần thêm** (§238 §239 §240 §241 §242): trailer nhanh thay đứng chào, ngoài trailer mỗi hình đủ lâu để hiểu (≥ ~1 s), phim + ảnh PD trước khi vẽ, `tools/hist/motion.py` trước khi giao; đúng sử + đúng mốc mà hình nghèo vẫn bị chê.
- **QA độc lập xem ảnh CỠ THẬT là bước cố định — kể cả khi tự làm một mình** (§209, §222, §227 — lặp ×3: tự xem bảng ảnh
  thu nhỏ sót 4 → 27 lỗi → 141 mục). Từ 2026-11-02 người dùng không cho subagent: vẫn là LƯỢT RIÊNG do mình làm, cỡ thật, ghi lỗi ra file, báo rõ là tự soát (§237); subagent chỉ khi người dùng cho phép. Ảnh QA phải đúng giờ, không `fps=1/n` (§232). Khung QA: mỗi ~6 s + 0.3–0.8 s sau mỗi đầu cảnh (chỗ cảnh còn trống).

- **Soát giao diện như người dùng:** chụp ở ĐÚNG độ rộng màn hình người dùng, đọc từng khối "trả lời câu gì?"; "không
  lỗi JS" chưa phải xong (§141, lặp §4).

## 5. Bố cục và tương phản

- **Font phải có ký tự**: kiểm cmap mọi ký tự ngoài ASCII trước khi viết; thiếu → viết khác/vẽ tay; số thẳng hàng (§35).
  Có ký tự chưa đủ: ký hiệu dễ nhầm (ln/In, l/1/I, O/0, x/×) kiểm bằng MẮT ở kit-test (§133).
- **Nhãn của một cụm bật ở từ ĐẦU cụm, sống ≥ 1.5 s** (§130). **Cảnh đọc được nghĩa từ 0.5 s đầu**: vật / nhãn CHÍNH hiện ngay; mốc theo từ chỉ cho điểm nhấn (§227 — 5 cảnh trống 2–7 s). Cỡ chữ tối thiểu ghi ở DNA (kênh Nhật ≥ 28 px §95;
  logarithm: chữ ≥ 28 px, số ≥ 30 px) và kit giữ bằng code.
- **Vùng an toàn:** mọi chữ và nhãn trong x 96–1824, y 64–1016 — kể cả nhãn gắn vào hình (§32).
- **Chữ không đè nhân vật:** chọn chỗ đứng nhân vật trước, chữ ở nửa kia; buộc phải đè → nền sáng đặc sau chữ (§32).
- **Tương phản đo bằng số ở nền TẠI CHỖ** — chữ/nền, chữ/nhân vật, vật/nền — không theo bảng màu thương hiệu (§13,
  `mascot-contrast-trap`).
- Hiệu ứng nở ra ngoài hình → tính chỗ trống bằng số trước khi gắn (§14).
- Camera chỉ có nghĩa khi cảnh có vật lớn để đi qua (§24).
- **Màu mang nghĩa không làm màu nhấn:** khoanh / gạch chân / viền chọn bằng màu trung tính; brief ghi danh sách màu
  nhấn được phép (§61).
- **Gạch / đỏ chỉ chạm đúng CHỮ sai**, kết luận đúng không bao giờ mang màu "sai"; đẳng thức đúng mà "hỏng khi bỏ luật"
  thì nứt qua dấu "=" + nhãn điều kiện, không gạch (§58, §62).

## 6. Liền mạch

- Ranh giới cảnh là nơi mọi thứ tắt cứng ngoài ý muốn. Vật rời đi bằng chuyển động; cảnh sau dâng từ giá trị cuối
  của cảnh trước; không `if (t < mốc) vẽ()` giữa cảnh (§17, §26; `tools/qa/seams.py`).
- Cắt cứng chỉ ở chỗ DNA đã liệt kê, mỗi cú gắn một nhịp nội dung.
- Ghép nhiều trang/đoạn: trang có trang sau phải có lối ra; đo bước sáng ở MỌI mối nối sau khi ghép (§36).
- Nhiều người viết cảnh song song: brief ghi rõ ai sở hữu mỗi mối nối đặc biệt; cảnh sau tính FROM từ mốc KẾT của cảnh trước; review độc lập chụp dày quanh mọi FROM (§44).
- Vật xuất hiện ở ≥ 2 nhóm (lưới, lớp học, bộ bài): hằng số + hình học vào kit / bảng DNA TRƯỚC khi giao; brief nhóm sau
  ghi "vẽ lại đúng như <cảnh>" (§71).
- Luật đo được (cỡ chữ tối thiểu, màu mang nghĩa, dòng kicker từng hồi) để KIT giữ bằng code, không để brief giữ bằng
  lời — brief bị phá ở gần mọi nhóm (§95).

## 7. Nhân vật (mascot)

- **Tiết chế:** mỗi video chỉ vài tư thế hợp ý, vừa đủ tạo điểm nhấn (`assets/character-v2/POSES.md`).
- Nhân dạng cố định (`docs/character/CHARACTER-V2.md`); chất liệu và cách vào/ra là của DNA từng video.
- Ảnh nhân vật đặc ngay khi xuất hiện; alpha 0→1 trên nền sáng thành bóng ma (§13).
- Bài học: mascot NÓI ở câu có mascot (`engine/talk.js`, §86). Thumbnail mascot vẽ nét: mặt đọc được ở 168 px (≈ 40% cao
  khung, §216) nhờ máy quay gần — dáng, cỡ, góc máy đổi theo tình huống từng bản (§217); "mascot ≤ 25%" (§113) chỉ còn cho
  mascot làm dấu phụ.
- **Kênh Anh từ 2026-11-02 (ghi đè mục mascot vẽ nét ngay dưới; §243 §244 §247):** 5–30 s đầu là lát cắt; hình toán tự diễn phần lớn thời lượng; mascot anime là người dẫn ở góc + thumbnail; ký tự λ chỉ biểu cảm trong đoạn chen ngắn, không chạm hình toán (`docs/study/16b-3blue1brown.md`). Video toán dùng một hệ hình cố định cả kênh, ngoại lệ của §0 (§245). Học theo kênh nào thì nghiên cứu trước khi dựng (§249). Công thức: `channels/en/CHANNEL.md`.
- **Nhân vật trong video kênh Anh = MASCOT VẼ NÉT** (người dùng 2026-10-29, `docs/character/CHARACTER-MASCOT.md`): vừa DẪN (góc, nhép
  miệng), vừa DIỄN (nguyên nhân làm con số / vật đổi), vừa PHẢN ỨNG (cận mặt ở khoảnh khắc lộ kết quả). **Không dùng người que
  cho video mới**; cậu bé anime không vào video mới. Luật diễn kế thừa từ người que: chỉ ở sự kiện quan trọng, nhân vật là
  NGUYÊN NHÂN (che đi cảnh mất nghĩa), hành động trọn ≥ 2–3 s, cảnh nhịp nhanh không chen nhân vật, chỉ / gật theo câu = "cho
  có" (§175); hành động hợp tầm tay rig (§176); chữ / số là VẬT có vật lý, lấy đà → làm → đà theo. Nhận dạng khoá (tóc rối,
  kính tròn, blouse trắng); đạo cụ / trang phục theo DNA bài. Hành động kiểu mới → clip ngắn người dùng duyệt (§136).
  Rig: `engine/mascot-line.js` `mascot()` — CHỈ GÓC THẲNG, tay ống blouse dày kiểu người dẫn kênh sử, diễn bằng `hands` / `crouch` /
  `lift` / `lean` (bảng dáng `projects/en/_lab/mascot-poses.html`); KHÔNG bọc lên khung người que (`skin` — dáng quái dị, §219);
  người dẫn và người diễn cùng một mascot → một bản trên khung (`actorOn`). Xoay 3/4: `yaw` (mặt chiếu khối cầu, thân khối trụ,
  vai + tay theo thân — §220), dùng ở khoảnh khắc NHÌN vật / đi bộ, còn lại nhìn thẳng. Diễn viên trong cảnh: `engine/mascot-actor.js`
  (khoá `F({...})` + `walks` / `hold` / `grip`). Xoay / đổi một bộ phận → soi mọi bộ phận gắn vào nó, bàn thử có CLIP chuyển động (§220).
  (Lịch sử: 2026-10-22 → 10-29 người que khăn đỏ là diễn viên, `docs/character/CHARACTER-STICK.md` — giữ làm tư liệu.)
- **Hoạt ảnh nhân vật (người que…) = ĐẠO DIỄN tư thế** (§137, `docs/study/08-stick-animation.md`): tư thế chính đặt tay
  (`engine/stickmove.js` `keys`) + nội suy ease; đi bộ theo bản đồ bước (`gait`: chân trụ khoá, hông theo đường mượt); IK
  chỉ để KHOÁ chân / tay đã đặt, không để sinh tư thế; dốc > 35° đổi hành động (leo, đứng, ngồi). Mỗi nhân vật mới: gác
  số mọi khung (mẫu `tools/lab/stick2-qa.mjs`, trượt khi NaN — §138) → clip tốc độ thật người dùng duyệt (§136).
- **Người que mượt = nhịp, không phải số khung** (study 10, §152): render 60 hình/giây nội suy (người dùng chọn); động
  tác lớn nhanh gắt 3–6 khung-24 rồi GIỮ, cảm xúc BẬT dáng, khựng khi chạm (hit-stop + khung loé), giữ dáng vẫn có cái
  động (thở, khăn, chớp mắt, camera trôi). Mẫu `tools/lab/fight-scene.js`. Duyệt nhân vật mới bằng dáng CHẠM GIỚI HẠN tỉ
  lệ (giơ tay qua đầu, chính diện, ôm vật to) — §148–149.

- **Model sheet của người que là một nguồn cấu hình duy nhất** (§166): mọi lab, actor, renderer và production phải nhận cùng tỉ lệ đã duyệt (tay, đầu, nét, vai); override cục bộ không được coi là cấu hình chung; test phải bắt continuity trước render dài.
- **Stick repo dùng ở ranh giới editor → frame sequence** (§167): có thể author/review bằng timeline + onion skin rồi xuất PNG/SVG sequence; không nhúng runtime GPL/Electron/WebGPU hoặc native format vào production khi chưa audit license, determinism và round-trip.
- **Độ cong của limb thuộc renderer hình học** (§168): không chữa nét đoạn thẳng bằng easing hoặc một curve chung; giữ pose/joint độc lập với centerline, thử nghiệm renderer phải tùy chọn và qua numeric + visual gate trước khi đổi default.
- **Hệ người que = `docs/stick/`** (từ 2026-10-26): nét mềm `hero(..., { soft: true })`, dáng lấy từ từ điển
  `engine/stick-dict.js` (mỗi dáng có mốc mẫu Becker), dàn bằng `stage()` (overlap đầu/tay trễ sau thân). Chi cong theo góc
  gập, quỳ chân sau theo góc (§169); dáng vươn cao giãn tay riêng, không kéo dài tay chung (§170); học từ mẫu luôn có ảnh /
  clip ghép cặp cùng mốc (§171). Thân cũng cong: xương hai đốt `curl` (gù khi cúi, ưỡn khi ngả, lưng trễ theo quán
  tính — §172); soi cặp theo MỌI bộ phận một lần, đừng chờ người dùng chê từng phần.

## 8. Quy trình và công cụ

- Đọc repo = liệt kê **năng lực dùng được** ("repo này cho tôi a, b, c"), đừng tự chế cái đã có (§3, §4).
- Sửa nguyên nhân, đừng vứt kỹ thuật; kỹ thuật hỏng có thể vì sai tỉ lệ dùng (§2, §11).
- **Học mẫu / tutorial:** đo mẫu và ta bằng CÙNG một công thức, đối chiếu lời hứa với file thật của repo, đề xuất kèm giá thật (§251, §249). Lớp đẹp phải còn đọc ra nội dung; số đẹp không xác nhận cảnh đẹp (§252).
- Đo từng phần trước khi chỉnh tham số toàn cục (§8). So với một mốc thật trước khi tối ưu (§9).
- Nháp ở bản sao → kế hoạch nhúng code đã chạy → thực thi so md5 (§23).
- **Review độc lập (model mạnh nhất) TRƯỚC khi render trọn** (§29).
- **Trước render: đóng băng nguồn** (mọi agent xong, commit, `git status` sạch) **và chạy khô mọi khung** — ảnh chụp
  từng câu không trúng khung chuyển tiếp; `must()` chỉ ở trạng thái đã xong (§52, §70).
- Bước rẻ ở cuối đường ống (SRT, chương) chạy thử ngay khi có dữ liệu trung gian, trước bước đắt (§93).
- Việc nhiều bước viết thành script bash; zsh không tách từ biến, `pkill -f` / `pgrep -f … | kill` tự giết shell —
  tìm PID bằng `ps -eo pid,cmd | grep -v zsh`, xem rồi `kill <pid>` (§19, §121). Lặp nhiều tham số: `while read a b; do …; done <<'EOF'`, KHÔNG `set -- $x` (§192, lần 3). Mọi chế độ công cụ ghi file phải đòi
  đường ra (§98); chế độ không tham số của công cụ xoá/ghi đè là chế độ KHÔNG làm gì — xem usage bằng `sed -n 1,15p`, đừng chạy trần (§135).
- **Ước lượng bằng số đo**, không đoán: độ dài bản Anh = số từ ÷ 190 phút + ~4 s mỗi tiêu đề hồi (§129); render 2D ≈ 2.3 phút / phút video,
  3D chiếu ≈ 3.6 (§106). Sửa bài cũ: `git log --since=<ngày render> -- engine/` → module đổi không chạm hình thì
  `build.py --keep` (§115).
- Ghép: chép luồng hình, audio AAC (§22). Bản cuối duy nhất ở `out/<p>/<p>.mp4`.
- Tách đồ nghề ra kit → xoá bản chép trong trang cùng lúc; refactor hình = chụp ≥ 40 khung trước / sau, so md5 (§202).
- Lệnh xoá (`rm -rf`, `git rm`) chỉ đứng sau `&&` của bước kiểm ngay trước, KHÔNG sau `;`; ffmpeg trong vòng `while read` cần `-nostdin` (§203).
- Đổi lời / mốc giọng → dừng mọi lệnh nền đang render bản cũ (chuỗi render → mix ghi đè bản cuối). Video dài: `shoot.js video
  --from a --to b` nhiều đoạn song song, tổng số khung = trang, rồi `ffmpeg -f concat` (§192).

## 8b. Giao việc cho agent

- **Mặc định tuần tự** (người dùng 2026-10-22): đạo diễn tự làm trong luồng chính, báo từng bước. Mọi mục dưới đây chỉ áp
  dụng khi người dùng ĐỒNG Ý dùng nhiều agent cho việc đó.

- **Đạo diễn ghép, quét, giao lỗi — không tự vẽ cảnh** (§126). Đường mặc định ≤ 12 phút: `docs/lesson/LESSON-VIDEO.md`.
- Model theo việc: code theo brief / danh sách lỗi → sonnet; tra, đếm → haiku; kịch bản, DNA, lab, kit, review độc lập →
  opus. ≤ 4 agent song song (§104). Nhóm song song gọi bằng các lệnh Agent; Workflow chỉ khi người dùng yêu cầu (§131).
- Vòng sửa: gửi lại đúng agent đã viết (còn ngữ cảnh) (§110); sửa song song chỉ khi chia được theo FILE, agent giữ kit
  chạy khô cả hai trang sau khi sửa (§134). Agent tiếp sức: "đọc diff, đừng hoàn tác" (§104).
- Người dùng nhắn giữa chừng → mọi agent nền bị dừng: kiểm thông báo, chạy lại agent dở, bảo nó dùng lại ảnh đã chụp (§131).
- Brief cho nhóm song song cấm `pkill -f` / `killall` (§98) và ghi hạn mức bằng SỐ (§99).

## 9. Âm thanh (từ hkt-project — áp dụng khi có lời đọc)

- Tiếng hiệu ứng chỉ đi kèm một việc NHÌN THẤY trên hình; không sting tự tạo; nhạc cắt 1.5–3 s đúng câu đùa là hiệu ứng
  mạnh nhất; kênh lịch sử 6–12 / phút (§195, lặp §156 §186 — `channels/hist/EDITING.md` C1–C6).
- Ký hiệu toán engine giọng không đọc được thì **câm**, không báo lỗi → viết biểu thức trong backtick và chuyển
  thành chữ trước khi tổng hợp (`OMNIVOICE_HANDOFF.md` §6).
- Dấu câu gần như không tạo ngắt → nhịp ngắt khai báo bằng pause, không bằng dấu phẩy (§9 của handoff).
- Khoảng lặng số 0 giữa câu nghe như tiếng click → lót room tone (§9 của handoff).
- Một cơ chế kiểm trong cô lập là chưa kiểm: phải chỉ được đầu ra của nó trên bản thật.
- **Trần tiếng bằng số từng cảnh, có cả trần dưới** (số tiếng ≤ thời lượng ÷ 2.5, ≥ ÷ 4; khoảng lặng dài nhất ≤ 4 s) và
  trần tỉ lệ mỗi loại ≤ 25% tổng; đếm bằng `shoot.js cues --out` sau mỗi vòng sửa (§51, §99, §110).

## 9b. Lời đọc (bài học)

- Văn xuôi có hồn theo giọng bản gốc của người dùng; mở bài hứa với người xem; dòng = hơi đọc, dòng trống = hết ý (§34).
  Lời KHÔNG cắt theo nhịp hình; mảnh câu chỉ cho punchline — `tools/voice/script_check.py <p>` phải ✓ trước khi đưa duyệt (§182, lặp §34).
- Lời kể sự kiện thật (kênh lịch sử, câu "ai làm gì, năm nào"): một reviewer ĐỘC LẬP soát từng dòng + số / ngày / câu trích
  trên hình trước khi đọc giọng; tự soát vẫn sót (§191). Viết "theo mẫu" không kế thừa dữ kiện của mẫu.
- Whisper nghe lại TỪNG câu, không cả file (§38). Phụ đề/chương là file để tải lên — `out/<p>/youtube/`, tên khác video (§37).
- Thuật ngữ khoá dễ đọc lệch: chú âm / viết lại ngay ở SCRIPT v1; cụm hỏng hai lần → viết lại câu, đừng đọc lần ba;
  redo đổi chữ → `grep` chữ cũ trong `plates/` + `lookups.py` (§109, §120). Tiếng Anh: chữ cái đọc lệch nghĩa ("r" →
  "our") → viết lại câu bằng số cụ thể (§132); viết tắt đọc như từ → viết thường cách nhau ("soh cah toa") (§128).
- **`spoken.json` điền trước publish**: SRT không còn số viết bằng chữ — publish.py cảnh báo (§128).

## 10. Làm việc với người dùng

- Người dùng giao quyền đạo diễn hình ảnh: tự quyết, ghi lý do. Báo cáo tiếng Việt. Không làm lại việc đã xong.
- Chỉ commit local; không push/merge/PR khi chưa được bảo.
- Nhận xét của người dùng ("vẫn chưa khớp", "khó đọc") thắng số đo của mình (§5).
- Không đưa danh tính người dùng ra dịch vụ ngoài (§41). LLM ngoài chỉ chạy nền khi người dùng cho phép gửi nội dung (§106).
- **Ảnh: mình tự lấy hết** (Commons API, trang web / PDF bằng Chrome headless → `assets/photos|web/INDEX.md`); ảnh trong
  game / bài SNS người thật → tự vẽ (§119). Người dùng không tải ảnh.
- Độ dài người dùng nói ("khoảng 1 phút") là ước lượng — viết theo nội dung, báo độ dài thật, KHÔNG hỏi "giữ hay ép" (§187,
  người dùng: "làm bao lần rồi").
- Ví dụ người dùng kể là MINH HOẠ ý, không phải danh sách phải nhét hết; ý tưởng mới có ≥ 2 cách hiểu → hỏi (2–3 phương án cụ thể)
  TRƯỚC khi sửa lời / dựng; thiết bị thị giác làm bằng hình, không thêm lời giải thích (§200, người dùng: "mỗi thứ nhét 1 ít…").
- Người dùng giao toàn quyền ("tự chủ… tôi review kết quả cuối") → chạy hết đường, không dừng hỏi; báo cáo một lần ở cuối,
  kèm chỗ còn nhỏ đã chấp nhận (§134).

- **Số liệu nền tảng:** phân tích bằng thứ ĐANG HIỆN trên nền tảng (thumbnail, title, số qua API), ghi nguồn + độ trễ;
  không có số thì để trống, không số mẫu (§142, §143).

## 11. Đóng gói (bài học — chi tiết `docs/lesson/PACKAGING.md`)
- **Thumbnail A/B = ba bản khác nhau THẬT** (§217): chỉ bản A dùng bối cảnh của video; B, C là thế giới + bố cục khác hẳn,
  mascot làm hành động trong đó; ghi mỗi bản vào `channels/THUMB-LOG.md`, không lặp thế giới / bố cục / dáng của các bài gần đây (§218).

- Thumbnail CHO THẤY, title NÓI nửa còn lại; không chung từ khoá chính — chấm cặp ngay lúc đề xuất, kể cả phương án của
  mình (§114, §125). Đề tài "tên chương" → kéo câu "không thể / luôn đúng" sẵn trong bài lên 0:00 (§124).
- **Thumbnail không bao giờ giao một mình:** mỗi bản kèm title của nó (combo), đo `tools/thumb/check.py --pair` (§297).
- 30 s đầu bốn nhịp: lời hứa → bằng chứng → "không phải X, mà Y" → lời hứa lớn hơn; khung 0.5 s = thế giới thumbnail.
- Soát thumbnail như soát cảnh: vật mang khái niệm phải đúng khái niệm, báo lỗi khái niệm trước thẩm mỹ; xem ở 168/336 px;
  chừa góc phải dưới (§105). Prompt: ràng buộc cỡ ĐẦU prompt, so với vật, đính khung 0.5 s làm tham chiếu (§113, §123).
- Ô nền tảng (mô tả ≤ 5000, tags ≤ 500, problems ≤ 800) đo bằng code (§42, §56).
- Gói đăng soát bằng code, không bằng trí nhớ: `tools/lesson/pack_check.py <p>` (đủ file, giới hạn ô, mô tả đúng chương sau khi build lại). §214 §254
- **Số thật thắng cảm nhận:** title hứa thứ người xem NHẬN / điều họ đang hiểu SAI, ngôi "you" — gói kể chuyện trừu tượng
  CTR 0.8–1.2% vs 3–5% (§144). Short luôn dẫn về video dài, kiểm sau 48 h (§145); video dài kết bằng một video tiếp theo
  cụ thể (§146).
