# Làm một tập kênh lịch sử — các bước

Mỗi bước có cổng người dùng duyệt; không nhảy bước (luật 1 AGENTS: gói + kịch bản trước code). Tập mẫu: `projects/hist/sarajevo/`.
Đọc `PLAYBOOK.md` trước (DNA hợp tuyển, người dẫn, hệ hình + tiếng đã có).

| # | bước | ra — NGUỒN trong `projects/hist/<tập>/`, SẢN PHẨM (video, gói đăng, ảnh kiểm) trong `out/hist/<tập>/` (AGENTS: projects ↔ out, §226) | kiểm / cổng |
|---|---|---|---|
| 1 | Gói + kịch bản (+ ghi chú cảnh ở đầu từng cảnh trong trang) | `README.md` (gói, dữ kiện + nguồn), `SCRIPT.md` | `tools/voice/script_check.py hist/<tập>` ✓ · **agent soát sử độc lập** từng dòng + số / ngày trên hình (§191) · người dùng duyệt lời |
| 2 | Ảnh tư liệu + bản đồ | `assets/{photos,web,cut}/` + `meta.json` | CC0 / PD, mình tự lấy; cắt nền `cutout.py`; người dẫn vẽ bằng code (không xin hình) |
| 3 | Đọc giọng | `audio/narration.wav`, `data/narration.timeline.json` | `align.py` — whisper nghe lại; câu lỗi `--redo` · **người dùng nghe** |
| 4 | Dựng cảnh theo mốc giọng | `episode.html` (import `_kit/stage.js`, `narrator.js`, `mapkit.js`); tập dài: `scenes/aN.js` + `scenes/common.js` (+ `BRIEF-SCENES.md` khi giao agent, PLAYBOOK §6; tự làm tuần tự thì ghi chú ý đồ một dòng trên đầu mỗi cảnh); bản đồ mới → bàn thử `_lab/map*.html` đặt sẵn ghim (§228) | `shoot.js check` 0 lỗi + ảnh từng cảnh (luật 3: nhìn ảnh) · QA ĐỘC LẬP xem ảnh cỡ thật (không thay bằng bảng ảnh thu nhỏ của người giao việc — §222): nhãn / địa danh / mặt trên bản đồ nằm trong vùng, vật đọc ra nghĩa (§209, §223) |
| 5 | Tiếng hiệu ứng + nhạc | `data/cues.py` → `data/cues.json` (mốc theo TỪ); tiếng ở `_kit/sfx/`, nhạc: tra `_kit/music/LIBRARY.md` trước (thư viện kênh), thiếu mới xin gen (tiếng riêng của tập: `assets/sfx/`) | mạng trước, tự tạo sau (§Tiếng) · **người dùng nghe** |
| 4b | Trailer + phim | trailer 7 s, phim PD chèn theo câu, lớp sống (`EDITING.md` "Độ giàu hình") | mỗi tập khung riêng |
| 5b | Soát trước render | `python3 tools/hist/frames.py hist/<tập> --video <bản nháp>` → `qa/findings.md` | lượt riêng cỡ thật theo `EDITING.md` "Soát trước render" (§237) — không dùng `fps=1/n` (§232); `tools/hist/motion.py` trên bản nháp (§241) |
| 6 | Render + trộn | `out/hist/<tập>/<tập>.mp4` | **người dùng xem bản cuối** (http://localhost:8791/…) |
| 6b | Gói đăng YouTube | **`out/hist/<tập>/youtube/`** (UPLOAD.md, titles, description, tags, problems, SRT, thumb-*.jpg, ghim) — KHÔNG để trong projects/; SRT + danh sách chương: `python3 tools/hist/srt.py hist/<tập>` | đo giới hạn ô bằng code · dán nguyên văn cho người dùng |
| 7 | Đúc kết | LESSONS + `channels/hist/` | skill `wrap-up` |

```bash
python3 tools/voice/script_check.py hist/<tập>                         # bước 1 — nhịp câu + cảnh báo câu trích dài giữa dòng (§208)
cd ~/OmniVoice-Studio && uv run python backend/main.py                 # bước 3 — chạy nền, chờ cổng 3900; take đầu có thể hết giờ → chạy lại
python3 tools/voice/narrate.py hist/<tập>                              # giọng kênh (channel.json); --out khác → bắt buộc --from/--to
#   TẮT OmniVoice (ps -eo pid,cmd | grep backend/main.py → kill) TRƯỚC align (VRAM, §151)
"$(python3 tools/config.py analysis_py)" tools/voice/align.py hist/<tập>
node engine/render/shoot.js check --page projects/hist/<tập>/episode.html
python3 projects/hist/<tập>/data/cues.py                               # kế hoạch tiếng theo từ → data/cues.json
# render 4 phần song song (--from/--to là giờ trang; --to quá DUR tự kẹp), đếm khung tổng = DUR × 60, rồi ghép:
node engine/render/shoot.js video --page projects/hist/<tập>/episode.html --silent --from 0 --to 60 --out out/hist/<tập>/parts/p1.mp4
ffmpeg -f concat -safe 0 -i out/hist/<tập>/parts/list.txt -c copy out/hist/<tập>/silent.mp4      # list: tên file tương đối
python3 tools/hist/mix.py hist/<tập> --video out/hist/<tập>/silent.mp4 --out out/hist/<tập>/mix.mp4 --music-db -16
ffmpeg -i out/hist/<tập>/mix.mp4 -c:v copy -af loudnorm=I=-15:TP=-1.5 -ar 48000 -c:a aac -b:a 256k out/hist/<tập>/<tập>.mp4
```

## Hình
- **Học mẫu trước khi dựng** (§190): mở dải khung đoạn tương ứng (`out/_lab/study/12-thanh-pahm-ww1/strip-*.jpg`), ghi cảnh mẫu
  dùng chất liệu gì, làm đúng chất liệu đó.
- **Ảnh đời thật cho vật / nơi / hiệu ứng** (§188): `python3 tools/hist/openverse.py search "<từ khoá>"` (CC0 + PD: Flickr Commons,
  rawpixel, Met…) → `get <id> projects/hist/<tập>/assets/web/<tên>.jpg`; Commons: `tools/hist/commons.py search|get` (chậm, có
  nghỉ). Cắt nền: `tools/cutout/.venv/bin/python tools/hist/cutout.py <ảnh> <out.png> --cut 1 [--color]` (xe, tàu, vụ nổ — venv riêng có rembg; python3 hệ thống / analysis không có). Nguồn tự ghi `meta.json`.
- **Imperial War Museums (IWM)** (người dùng gợi ý 2026-10-28): kho ảnh / phim WW1–WW2 lớn nhất, nhưng giấy phép IWM Non Commercial
  KHÔNG phủ kênh kiếm tiền và video YouTube của họ có bản quyền — không cắt hình / tiếng từ video IWM. Cách dùng hợp lệ: tìm ảnh ở
  iwm.org.uk (mã `Q…`), rồi lấy CÙNG ảnh trên Commons nơi nó mang nhãn PD (Crown copyright hết hạn), vd. `File:Archduke Franz
  Ferdinand in Sarajevo, June 1914 Q91848.jpg` → `commons.py search "<chủ đề> Q"`. Bài viết lịch sử iwm.org.uk = nguồn chữ để soát sử;
  video IWM (vd. "How did WW1 Start?" 9:20) = tham khảo cấu trúc, xem trên trình duyệt, không tải.
- Người dẫn: `_kit/narrator.js` vẽ bằng code (CHARACTER §1; nhập vai PLAYBOOK §3). Nhân vật thật: ảnh Commons tự lấy (ghi `assets/meta.json`), cắt bằng
  `cutout.py` / `headcut.py`. Bản đồ: `projects/hist/_kit/mapkit.js` + `tools/hist/geo.py` (historical-basemaps, GPL-3.0, ghi nguồn).
- Ngữ pháp cắt (study 15 §6): ~3 s / hình; trượt vào có nhoè; màn đen chỉ có tiếng; khử màu khi nghiêm; gài → trả.

## Tiếng (người dùng 2026-10-27: "ưu tiên sound trên mạng, không có mới tự tạo")
1. Xem thư viện chung trước: `projects/hist/_kit/sfx/` (+ `CREDITS.md`), nhạc `projects/hist/_kit/music/`.
2. Thiếu → tìm bản **CC0 / public domain**: OpenGameArt (lọc CC0, kiểm `license-name` trên trang mục), Kenney, Wikimedia
   Commons (API `extmetadata.LicenseShortName`), Openverse. Thêm vào `_kit/sfx/` + dòng CREDITS. Không lấy tiếng meme nổi
   tiếng không rõ nguồn (Content ID). CC-BY chỉ khi người dùng đồng ý ghi tác giả trong mô tả.
3. Không có → tự tạo (`tools/sfx/material.py`), đo phổ trước khi cho nghe (§156, §186) — tiếng tự tạo từng bị chê, dùng ít.
4. Đặt theo NGHĨA khoảnh khắc trong `data/cues.py`, mỗi tiếng gắn một việc nhìn thấy (EDITING C, PLAYBOOK §5).
