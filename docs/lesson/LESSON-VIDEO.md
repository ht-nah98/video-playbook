# Video bài học — playbook

> Người dùng (2026-10-05): *"Video sắp tới, tôi sẽ chỉ đưa bạn nội dung bài học… bạn sẽ giúp tôi bóc tách nội dung,
> lấp đầy thông tin nếu cần thiết, xây dựng timestamp, sử dụng omnivoice… lồng tiếng sau đó ghép với hình ảnh."*
> Chọn: **tiếng Anh**; **giọng, mốc, ghép theo hkt-project; hình vẽ bằng engine canvas của repo này**; phong cách linh
> hoạt theo nội dung, mascot làm điểm nhấn, lồng intro tự nhiên. **Intro: từ 2026-10-09 bài MỚI dùng intro 3D của kênh `out/en/intro/intro.mp4` (`projects/en/intro`,
> render bằng studio3d — `docs/mv/NEW-3D.md`); 8 bài cũ giữ `hkt-project/work/brand/intro.mp4`.** Cả hai −14.5 LUFS, 26 s, từ/về đen.
> **Từ 2026-10-19 kênh Anh KHÔNG lồng intro** (`channels/en/channel.json` `"intro": null`, p1 nối thẳng p2); kênh Nhật giữ intro.

Kênh "99% from scratch". Đã làm 12 video kênh Anh + 5 kênh Nhật — trạng thái và nhật ký sản xuất: `docs/STATUS.md`. Khởi tạo: `tools/new-lesson.sh <p> "<Tên>"`
(`templates/lesson/`). Mẫu tham chiếu mới nhất: `projects/en/logarithm/` — `CONTENT.md`, `SCRIPT.md` (gói đăng sau `---`),
`DNA.md`, `BRIEF-LAB.md`, `kit.js` + `kit-test.html` (bóng sprite, không shadowBlur), `plates/a0-open.js` (cold open =
thumbnail đang chuyển động), `BRIEF-PLATES.md`, `spoken.json`, `YOUTUBE.md`; mẫu soát sự kiện / nguồn là lời bình kênh khác: `projects/en/pi/`. Hợp đồng cảnh: `docs/ENGINE.md` § "Cảnh
bài học". Luật chung: `docs/CRAFT.md`. Mỗi video một DNA (`docs/DNA.md`) — tham khảo bài cũ, KHÔNG chép phong cách.
Ống nối không mang DNA của kit (`lookup`, `must`/`fix`, `prog` ném lỗi, `mk`, `loadImages`, `CROP`, `typeCues`) ở
`engine/lesson.js` — kit mới import từ đó (mẫu `templates/lesson/kit.js`); kit bài đã xong giữ bản chép, không đổi pixel.

## Đường ống (lệnh thật)

```bash
cd ~/OmniVoice-Studio && uv run python backend/main.py &                  # máy giọng, cổng 3900 (AGPL — chỉ HTTP)
python3 tools/voice/narrate.py <p> --from "dòng đầu" --to "dòng cuối" --out p1   # trước intro; --to = ĐẦU một dòng SCRIPT
python3 tools/voice/narrate.py <p> --from "dòng đầu p2" --out p2                   # sau intro
python3 tools/voice/estimate.py <p> --from … --to … --out p2               # mốc TẠM khi muốn dựng cảnh trước khi có giọng
PY=$(python3 tools/config.py analysis_py)        # venv phân tích — tools/config.py (MASCOT_ANALYSIS_PY)
$PY tools/voice/align.py <p> --out p1   # mốc từng từ (CTC) + whisper nghe lại TỪNG câu (rồi --out p2)
python3 tools/voice/mouth_env.py <p> p1 p2   # miệng nói: data/<part>.mouth.json — chạy lại sau MỌI lần tổng hợp lại giọng (§86)
node engine/render/shoot.js stills --page "projects/<p>/p2.html?plates=a,b" --dur 700 --t 12.5,30 --outdir out/<p>/qa/x
node engine/render/shoot.js cues --page "projects/<p>/p2.html" --out out/<p>/qa/p2-cues.json   # đếm tiếng theo loại
python3 tools/qa/lookups.py <p>                                             # từ lặp trong câu: đọc TỪNG dòng (§59)
node engine/render/shoot.js check --page "projects/<p>/p2.html"            # chạy khô MỌI khung; mã 1 = lỗi JS / must() (§70)
python3 tools/qa/lesson_golden.py record|check <p>   # băm canvas cả bài → projects/<p>/golden.json (refactor kit/engine)
python3 tools/lesson/build.py <p>            # tự chạy check, rồi render song song + intro + tiếng hiệu ứng + nhạc + SRT + chương
python3 tools/lesson/build.py <p> --keep     # chỉ trộn lại tiếng/nhạc trên đoạn hình đã render (~3 phút)
python3 tools/lesson/build.py <p> --migrate-meta   # một lần: ghi *.meta cho đoạn render trước khi có meta (không render)
python3 tools/voice/publish.py <p>           # chỉ dựng lại SRT + chương (sau khi thêm số vào projects/<p>/spoken.json)
```
Ra: `out/<p>/<p>.mp4` (KHÔNG phụ đề trong hình) + `out/<p>/youtube/` (`subtitles-<lang>.srt`, `chapters.txt`, gói đăng).
`--page` của `shoot.js` là BẮT BUỘC (§60). `out/<p>/parts/`: đoạn hình `*.mp4` + `*.meta` (độ tươi so với nguồn) GIỮ lại
cho `--keep`; `tools/qa/clean.sh <p>` chỉ xoá trung gian (`*.wav`, `video.mp4`, `*.log`).

## Kênh khác: 99の発見 (tiếng Nhật)

`tools/new-lesson.sh <tên> "…" --channel ja` → dự án `projects/ja/<tên>` (mã `ja/<tên>`); đọc `channels/ja/WRITING.md` (luật lời đọc)
và `channels/ja/PIPELINE.md` (chỗ khác quy trình) trước khi viết SCRIPT. Hai kênh: `channels/README.md`.
Công cụ giọng tự chọn ngôn ngữ theo `build.json` `voice.lang`; phụ đề ra `subtitles-ja.srt`.

## Đường mặc định cho bài ≤ 12 phút — trig, §126

> Từ 2026-10-22 mặc định làm TUẦN TỰ (đạo diễn tự làm lab, kit, cảnh, quét lệch mốc — skill `lesson-video`); các bước
> "agent" dưới đây chỉ dùng khi người dùng đồng ý dùng nhiều agent.

Gói A duyệt → CONTENT + SCRIPT duyệt → giọng p1/p2 chạy nền **cùng lúc** 3 agent lab (mỗi hướng 2 khung, ghép
`styleframes-compare.jpg`) → người dùng chọn → **một** agent làm kit + kit-test + trang + a0 + tự viết BRIEF-PLATES →
4 nhóm song song (4 lệnh Agent) → gộp order + chạy khô → quét 10 s → reviewer lệch mốc → sửa → build. Trong lúc chờ:
ảnh Commons, nhạc dùng lại, prompt thumbnail, title/tags. Kit mới: không `shadowBlur` (bóng sprite, §127). Sau build:
`publish.py` báo số còn viết bằng chữ trong SRT (§128). Người dùng nhắn giữa chừng → kiểm agent nền bị dừng (§131).

## Đường nhanh cho bài dài (≥ 15 phút) — solid-geometry, §85

DNA duyệt → kit (chép lõi từ trang lab đã chọn) → MỘT cảnh mẫu thật của đạo diễn → BRIEF-PLATES có bảng hạn mức cộng
sẵn + chỉ số câu đầu/cuối từng nhóm → **9 nhóm song song** → điền `*-order.js` + `lookups.py` → chụp mối nối (khung ở
START − 0.6 và + 1.2 mọi mục) → chạy khô cả trang → build. Trước khi giao: mọi vật xuất hiện ở ≥ 2 cảnh vào kit (§83);
mốc kit tính từ FROM thật (§82). Render lâu → đọc `frame=` trong log, báo người dùng thời gian còn lại (§84).

## Các pha — luật đang dùng

**Pha 0 — Bóc tách nội dung** → `CONTENT.md`.
- Lưu bản gốc người dùng nguyên văn ở `SCRIPT.vi.md` — người dùng đem ra so.
- **Soát sự kiện cả câu khẳng định rộng nhất, không chỉ số** (§48); chạy lệnh thật khi được (pemdas: node từ chối
  `-2**2`). Mỗi lỗi: câu sai → câu đúng → nguồn. Mọi số/năm/tên lên hình PHẢI có trong CONTENT.
- **Nhiều video nguồn** (sudoku: 3 video Numberphile): việc chính là MẠCH (một câu hỏi xuyên suốt, mỗi hồi một bậc) và
  DỮ LIỆU GỐC (câu đố lấy từ SudokuPad, mọi số do code tính + `must`); câu khẳng định về một trường hợp cụ thể kiểm
  trên chính dữ liệu đó (§87). Credit tác giả + kênh nguồn trong mô tả.
- **Nguồn là lời bình của kênh khác** (pi): dùng làm tư liệu, kịch bản viết lại bằng lời của mình, sắp lại mạch, sửa lỗi
  (video π mẫu sai hai chỗ: "độ cong thay đổi đều", nhân quả ngược của cầu phương).
- Lấp bằng dữ liệu thật thay cho "nhiều người đã…" (fifty-percent: Buffon/Pearson/Kerrich), và tìm ví dụ cực đoan có số
  tròn (pi: xích đạo quanh cực Bắc, C/d = 2).
- **Ví dụ đời thường hình học** (phòng, sách, thang, cầu): đặt toạ độ thật trước khi viết SCRIPT — "đúng một nửa" chỉ
  lộ ở toạ độ; biến nó thành khoảnh khắc "careful" trên hình (§79).
- **Tiếng hiệu ứng:** liệt kê khoảnh khắc mà 24 loại trong `assets/sfx/` chưa phủ → TỰ tải CC0 (`docs/lesson/SFX.md`),
  không tìm được mới hỏi. Tiếng sóng/âm thuần thì tự tổng hợp bằng ffmpeg.
- **Ảnh:** ảnh có trên Wikipedia / Commons → TÔI tự tải (người dùng cho phép 2026-10-07): file gốc qua
  `upload.wikimedia.org/wikipedia/commons/<md5[0]>/<md5[0:2]>/<tên>`, User-Agent mô tả, ~4 s/ảnh (API `w/api.php` trả 429
  khi gọi dồn), soi từng ảnh, ghi INDEX.md. Ảnh ngoài Wikipedia: tôi cũng tự lấy (trang web / PDF bằng Chrome headless, LESSONS §119); người dùng KHÔNG tải. Ghi **TÊN ĐẦY ĐỦ + nghề + năm sinh–mất + loại** (thật / tưởng tượng /
  hiện vật) — "Lindemann" từng ra ảnh ca sĩ Till Lindemann. Không hỏi link nguồn (mặc định Wikipedia / Commons). Soi
  từng ảnh nhận về: đúng người, cỡ (ảnh ≤ 300 px → khung nhỏ). Thứ vẽ được bằng code thì tự vẽ.
- **Tư thế mascot:** liệt kê tư thế có sẵn hợp bài + đề xuất 1–2 tư thế mới ngay pha 0 (người dùng tạo ảnh song song).

**Pha 1 — Kịch bản (CỔNG 1)** → `SCRIPT.md` theo khuôn `templates/lesson/SCRIPT.md`. Viết 4 dòng gói TRƯỚC lời
(thumbnail → title → 5 s đầu → 30 s đầu, mục "Package first" của khuôn) và kèm 2–3 hướng title + thumbnail khi xin
duyệt — `docs/lesson/PACKAGING.md` §0–§1.
- **Văn xuôi có hồn, không chặt câu theo nhịp hình.** Một dòng = một hơi đọc (0.35 s); dòng trống = hết ý (0.95 s);
  `##` 1.6 s; `# ACT` 2.4 s. Nhịp hình lấy từ MỐC TỪ.
- **Mở bài hứa với người xem** và nêu 2–3 câu hỏi đánh số (lên hình như mục lục); câu treo cho intro. Câu đầu chạm
  vào lời hứa của tiêu đề / thumbnail (hikari, 2048 từng lệch — `docs/study/01-mrbeast-retention.md`). Mở đầu chậm để truyền thông điệp là
  bình thường với bài giảng; intro kênh giữ nguyên (người dùng 2026-10-14).
- Hiểu lầm nói ra rồi sửa; trực giác không phải chứng minh thì nói thẳng; "Putting it together" + "Next time" trước lời
  cảm ơn (học từ video mẫu số Pi, mục dưới). Kết ấm ngay sau lời đáp lớn; まとめ / 次回 gọn — đừng để hai đoạn chậm
  kéo dài sau đỉnh (`docs/study/01-mrbeast-retention.md`).
- Không ký hiệu trong lời (số/ký hiệu viết bằng chữ — engine câm, CTC không có chữ số).
- Duyệt xong là **bắt đầu lồng tiếng ngay**, song song với bước DNA.

**DNA + khung phong cách.**
- Trước 3 hướng: đọc 3–5 phong cách gần đề tài trong thư viện `~/lemo-opuscar/styles/` (plugin lemo-opuscar, docs/study/11):
  bản chất, *native moves* hợp nội dung, ngữ pháp camera, âm thanh, bẫy. Mỗi hướng ghi technique base (DNA §0).
- Sau DNA duyệt: **`SHOTS.md`** — shot list có lý do, cue map, bảng âm thanh, khoảng lặng, ≥ 4/6 khác bài trước (khung
  `DIRECTOR.md` của lemo-opuscar, chỉnh cho bài giảng dài).
- Dựng **3 hướng** ở `tools/lab/<hướng>.html`, mỗi hướng CÙNG hai cảnh nội dung, ghép `styleframes-compare.jpg`
  (brief mẫu mới nhất: `projects/en/logarithm/BRIEF-LAB.md`; bảng lab nào thành DNA bài nào: `tools/lab/README.md`). Người dùng chọn. Đề xuất của tôi đi kèm một câu lý do; người dùng chọn khác thì
  làm đúng cái họ chọn.
- Ghép hai phương án ("B + mượn ý A") → nói lại phạm vi một câu, chờ xác nhận, ghi lên đầu `DNA.md` (§49).
- **Một ý trung tâm** điều khiển mọi cảnh (fifty-percent: ánh sáng = thông tin; pi: cả bài là bộ bản vẽ) + **vật xuyên
  suốt** biến hình qua các hồi (pi: vòng tròn compa xanh).
- Đồ nghề riêng của DNA nằm ở **kit của dự án**; ô chữ cố định (khung tên, nhãn) ĐO bằng `measureText`, ghi giới hạn
  vào brief (§56). Kiểm ký tự bằng fontTools (`getBestCmap`) — θ ✓ ✗ ⅑ ⟶ τ không có ở font nào.

**Pha 2 — Giọng.** Whisper báo khác → phân loại (chính tả Anh–Mỹ / viết liền / đồng âm / ĐỌC SAI); câu nghi đọc sai thì
tổng hợp lại take đó (dời wav khỏi `audio/voice/`, chạy lại narrate) trước khi kết luận; tên biến một chữ cái cạnh
mạo từ "a" → tách bằng dấu phẩy / "call it" (§80). Chạy nền với timeout dài (mặc định 30 phút là quá ngắn; cache giữ phần đã xong). p1 và p2 tổng hợp
riêng. Whisper nghe lại **từng câu**, không cả file (nghe file dài nó bịa "thank you for watching"). Câu báo khác biệt:
nghe lại đúng take đó trước khi kết luận (pi: whisper không nghe ra "Two." vì take bắt đầu bằng chính chữ đó).
Từ chỉ màu/chất liệu trong lời phải chốt theo DNA TRƯỚC pha này (§88). Xong giọng → `mouth_env.py` (mascot nói, mặc
định từ sudoku — `docs/character/CHARACTER-V2.md` § Miệng nói; tư thế chưa có trong `mouths.js` thì đo thêm trước khi giao cảnh).

**Pha 3 — Hình, song song.**
- Đạo diễn tự dựng `kit.js` + cảnh mở (a0, trang p1) làm MẪU — cảnh mẫu cũng qua review.
- Trước khi giao: một tờ thử mọi hàm kit có tham số k ở 0.25 / 0.5 / 0.75 / 1 (§89); grep BRIEF tìm tên cảnh, ERA,
  hàm kit đã đổi; BRIEF có cột "nối tiếp cảnh trước?" → `CONTINUES` (§90).
- `data/lines.txt` (chỉ số câu → mục → chữ) cho agent tra mốc.
- Giao 5–6 agent, mỗi agent 2–3 mục LIỀN NHAU (mối nối trong tay một người; cặp `CONTINUES` cùng một agent). Lời giao
  việc ghi: dòng câu, mục mở hồi, ảnh (key + file + nhãn), tư thế mascot, **bảng hạn mức tiếng có hàng TỔNG ≤ trần
  DNA** (§51, §55, §66), và **vật dùng chung giữa các nhóm** — hằng số/hình học đặt trong kit hoặc bảng DNA TRƯỚC khi
  giao, brief nhóm sau ghi "vẽ lại đúng như <cảnh>" (§71).
- **Review độc lập trước render:** 2 reviewer chỉ-đọc chia đôi video (pi: cảnh mở + hồi 1–2 / hồi 3–5), mỗi người tự
  chụp, xếp HIGH/MED/LOW kèm file:dòng và cách sửa. Sửa thì **gửi lại đúng agent đã viết cảnh** (SendMessage — còn nguyên
  ngữ cảnh, mỗi lượt sửa ~1–2 phút); lỗi cảnh mẫu đạo diễn tự sửa.
- **Quét đạo diễn trước review (ja/gacha, LESSONS §122):** gộp order → `shoot.js check` cả trang → stills MỖI 10 s cả bài →
  sheet 24 khung/tờ → đạo diễn đọc hết, trả lỗi theo mốc về đúng nhóm. Reviewer độc lập sau đó quét LỆCH mốc (2, 12, 22…) +
  đối chiếu `data/lines.txt`; chỉ render khi verdict RENDER. Báo cáo "đã soi" của nhóm không thay được hai lượt này.
- Review luôn bắt được thứ người viết không thấy: chỗ GIAO giữa hai người (§44, §50), hình mâu thuẫn giữa hai cảnh (§57),
  đỏ trên câu đúng (§58), chữ tràn ô (§56).
- **Đổi hình là bố cục / camera / vật chuyển động** — gõ thêm chữ trên bố cục cũ không tính. Sau build soi đoạn đứng yên
  dài bằng `python3 tools/study/pace.py out/<p>/<p>.mp4` (công cụ soi, không phải ngưỡng; bài Nhật đo 52–60%, đoạn
  dài nhất 22–32 s — `docs/study/01-mrbeast-retention.md`).
- Soi tổng thể trước review: 1 khung / 6 s cả trang (`out/<p>/qa/ov/`); khung tĩnh đo bằng điểm ảnh đổi ở 960×540,
  không đo trung bình ở 320×180 (báo nhầm 78 đoạn, thật 6 — §12).
- Đóng băng nguồn trước render: mọi agent báo xong, commit, `git status` sạch (§52); chạy khô `shoot.js check` cả hai
  trang (build.py cũng tự chạy) — ảnh chụp từng câu không trúng khung chuyển tiếp (§70).

**Pha 4 — Ghép (CỔNG 2).**
- `build.py`: chạy khô `check` trước, render song song, mỗi đoạn cache theo nguồn (`parts/*.meta`, §46); tiếng dựng MỘT track riêng, cắt đúng số khung; lời −16
  LUFS; intro hạ cho khớp. Xem lại FILE THẬT (1 khung / 20 s + hai mối nối intro) trước khi báo.
- Nhạc / mức đổi sau → sửa `music` / `sfx_db` trong `build.json` rồi `--keep` (`docs/lesson/SFX.md`).
- Phụ đề: số đọc bằng chữ của bài mới thêm vào `projects/<p>/spoken.json` (`[["đọc", "viết"], …]`, RIÊNG bài đó — không
  đổi SRT bài cũ; cụm dài tự áp trước, khỏi xếp tay; `projects/_shared/spoken.json` chỉ cho mục thật sự chung như tên kênh;
  cụm bị cắt ngang hai cue thì thêm cả bản ngắn), rồi `publish.py <p>` + `python3 -m unittest tools/voice/test_publish.py`;
  grep SRT tìm số còn viết bằng chữ.
- **Gói đăng là một phần của "xong"**: có nhạc → làm luôn `title.txt`, `description.txt`, `tags.txt`, `problems.txt`
  trong `out/<p>/youtube/`, soát bằng `tools/lesson/pack_check.py <p>` (build.py tự gọi, §254), đếm ký tự bằng code (§42), mô tả không có `<` `>`. Title/thumbnail có thể đã chốt ở phiên
  khác (`~/Desktop/yt-studio/lessons/…`) — đọc trước, dùng đúng bản đã chốt; chưa có thì đề xuất + 3 dự phòng.

## Học từ video mẫu

Bài học từ video mẫu nằm ở `docs/study/` (00 = video Pi kênh "median": mục lục lời hứa, tóm tắt bằng hình cũ, vật xuyên suốt,
gạch → sửa, kết bằng việc người xem tự làm). Quy trình học: `docs/study/README.md`.

## Intro

- Không ở giây 0; đặt sau câu treo của mở bài. Hai mối nối đều đen–đen: p1 khép về một hình của DNA (math-30k: màn chập
  về vạch khắc; pi: mực xanh loang kín vòng compa rồi thu về 0) → intro → p2 mở từ đen đúng hình đó, CÙNG tâm.
- Intro −14.5 LUFS → hạ 1.5 dB cho khớp lời −16. Nhạc nền nghỉ trong lúc intro.

## Bẫy đã gặp

Font thiếu ký tự / số kiểu cổ: LESSONS §35 (θ ✓ ✗ ⅑ ⟶ τ ℝ ℕ ∛ ↦ α β ∈ ψ ℏ không có trong Archivo/Plex/Cormorant). SRT
cạnh video: §37. Riêng ở đây: hàm nhãn của kit viết HOA (π → Π) — biến/công thức cần hàm giữ hoa/thường của kit;
OmniVoice: server không tự chạy, ký hiệu ngoài bảng câm, căn từ của server hỏng → CTC, đổi giọng mất cache.

## Đăng YouTube

**Đọc `docs/lesson/PACKAGING.md` trước** (lời hứa, thumbnail, mở đầu, kết); thumbnail giao agent `thumbnail-artist`.

- Gói đăng: `projects/<p>/YOUTUBE.md` (mẫu `templates/lesson/`) → bản dán ở `out/<p>/youtube/`.
- **Thumbnail người dùng làm**; lưu `projects/<p>/thumbnail.png`. Ảnh người dùng gửi đều > 2 MB (pi 2.4, neg-times-neg
  2.25, zero-power 2.2) → luôn xuất thêm `out/<p>/youtube/thumbnail.jpg` (q95, ≤ 2 MB, ~0.5 MB) làm bản đăng; title chốt
  ghi vào `out/<p>/youtube/title.txt`.
- **Cặp thumbnail – title đã chạy** (pi, neg-times-neg): thumbnail = vật của DNA + một CÂU HỎI ngắn ("WHY 3.14?",
  "WHO DECIDED?", zero-power: màn LCD "0⁰ = 1 OR 0?"); title = câu người xem gõ tìm + câu TRẢ LỜI lật hiểu lầm ("…It's Not a Convention"). Soát thumbnail
  như soát hình: chữ số / công thức AI vẽ có thể sai (π sai sau 27 chữ số) → báo người dùng; vật mang khái niệm chính phải đúng
  khái niệm (ja/chirality: cặp L/D phải là ảnh gương, §105); xem ở 336 px; góc phải dưới bị nhãn thời lượng che.
- **Title bổ sung thumbnail, không lặp lại**; câu hỏi cụ thể có trả lời SỚM trong video (math-30k: "Why Is an Hour 60
  Minutes?…", đoạn Sumer ở 2:37).
- Mô tả: hai câu đầu = móc mở bài; chương chép nguyên; ghi chú ảnh tưởng tượng / tượng hiện đại; credit ảnh cuối.
- Problems: mốc lúc lời giải thích bắt đầu (lấy từ SRT), ≤ 800 ký tự (§42).
- Cài đặt: English, Education, Academic system United States, "Altered or synthetic content" = Yes (giọng AI).

## Tiếng hiệu ứng — `docs/lesson/SFX.md`

Mỗi chuyển động có nghĩa = MỘT tiếng, cùng loại chuyển động = cùng loại tiếng, ≤ 1 tiếng / 3 s ngoài chùm gõ. Thư
viện CC0 `assets/sfx/` (24 loại). Mức hiện hành: `sfx_db −6`, nhạc −38 LUFS (bảng ở SFX.md). Cảnh khai báo `sfx()`;
chuyển cảnh tự có tiếng, cắt thẳng `CONTINUES` thì im. Trần loại hiếm là của CẢ VIDEO — chia theo nhóm, bảng có hàng
tổng (§51, §55, §66). Tiếng đặt ngay lúc dựng cảnh (brief cảnh có mục tiếng) — không còn brief SFX riêng.

## Kết bài — tên kênh (người dùng 2026-10-06)
Biển **"99% from scratch"** to, đứng yên (toạ độ màn hình), từ câu cảm ơn tới hết (≥ 4 s), kèm SUBSCRIBE; không logo
YouTube. Mẫu: `projects/en/pemdas/plates/f2-answer.js` `board()`, `projects/en/pi/plates/f2-next.js` (khung tên bản vẽ).

## Mascot
Kho có hai khung ảnh (toàn thân / giữa đùi) — video bài học dùng **nửa thân**: `figure(…, { crop })`, bảng `CROP` của
kit (toàn thân 0.45, giữa đùi 1; giật mình / nhảy: toàn thân không cắt). Tư thế mới: tách nền `tools/cutout/cutout.py`
(thêm ALIAS), ghi `assets/character-v2/POSES.md`, soi trên nền tối. Mỗi tư thế gắn MỘT khoảnh khắc của lời, 3–8 s,
một bên khung; vật cầm tay / vệt chuyển động vẽ bằng code (`figure` trả hàm đổi toạ độ ảnh → khung). Ngoại lệ 3–8 s:
mascot GIỮ vật của cảnh (fifty-percent: úp đồng xu ~50 s ở mở bài) — nói với người dùng.

## Cần người dùng đưa

| | ghi chú |
|---|---|
| nội dung bài học | văn bản; ngôn ngữ nào cũng được, lời đọc tiếng Anh |
| ảnh lịch sử | KHÔNG cần: tôi tự lấy hết (Commons API; trang web / PDF bằng Chrome headless — §119), ghi `assets/photos/INDEX.md` |
| tư thế mascot mới (tuỳ) | tôi đề xuất ở pha 0 |
| nhạc nền | KHÔNG cần: tôi chọn lại một bản Suno cũ hợp DNA (khác bài liền trước, không trùng âm sắc tiếng hiệu ứng) — người dùng 2026-10-08; chỉ viết prompt mới khi người dùng muốn (`docs/lesson/SFX.md` "Nhạc nền") |
| thumbnail | người dùng render từ prompt của tôi (`projects/<p>/thumbnail/prompt-*.md` + khung 0.5 s); tôi chấm `tools/thumb/check.py` và lưu |
| (tuỳ) giọng | mặc định Atlas `03572937` |

## Nhật ký

Đã chuyển sang `docs/STATUS.md` (bảng trạng thái + nhật ký sản xuất từng bài).
