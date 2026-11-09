# Blunderstory — kênh kể chuyện lịch sử (@blunderstorytv, tạo 2026-10-29, CHƯA đăng video — người dùng ngâm kênh)

Tiếng Anh, khán giả Mỹ. DNA = hợp tuyển các video thành công (Thanh Pahm, OverSimplified, …), linh hoạt theo từng tập
(`PLAYBOOK.md` §0): ảnh tư liệu thật + người đầu tròn + quốc gia biết diễn + bản đồ + meme, người dẫn vẽ nét nhập vai trong
sự kiện, giọng kể nhanh, châm biếm nhưng đúng sử.
Nghiên cứu: `docs/study/12-ww1-stick-and-thanh-pahm.md` (định dạng, cách viết §5), `docs/study/15-thanh-pahm-editing.md`
(kỹ thuật dựng: người dẫn 4 vai, mặt ảnh thật, lính chibi, ngữ pháp cắt).

## Tài liệu kênh — đọc theo việc
| việc | file |
|---|---|
| nghiên cứu thị trường, tiêu chí chọn chủ đề; chỉ triển khai sau duyệt | `market/README.md` (hệ phân tích, `METHOD.md` tiêu chí, mỗi đợt một thư mục ngày) |
| **đúc kết + DNA hợp tuyển + đề xuất tập đầu — đọc TRƯỚC** | `PLAYBOOK.md` |
| làm một tập (7 bước, lệnh, hình, tiếng) | `PIPELINE.md` |
| viết lời (đúng sử + thú vị + châm biếm; văn xuôi, không ngắt ngắt) | `WRITING.md` |
| dựng hình + tiếng (cỡ, khung, nền, người dẫn góc, mật độ tiếng) | `EDITING.md` |
| người dẫn, dàn nhân vật, xin hình + câu khoá prompt | `CHARACTER.md` |
| giọng (adam `f9997cc2` ×1.1) | `voice/VOICE.md`, `channel.json` |
| **thương hiệu** (tên, handle, avatar, banner, màu, mô tả kênh) | `BRAND.md`, file đăng ở `brand/` |
| **cài kênh trong Studio + token API** (Gmail kinh doanh) | `STUDIO-SETUP.md` |

## Thư mục
| | |
|---|---|
| `projects/hist/_kit/` | đồ nghề dùng chung — tập IMPORT, không chép: `stage.js` (ảnh, người đầu tròn, sát thủ, xe, vụ nổ, chữ, meme), `narrator.js` (người dẫn vẽ nét), `mapkit.js` (bản đồ + mặt quốc gia), `maps/` (1914 châu Âu, thế giới), `sfx/` (thư viện tiếng CC0 / PD), `music/` (nhạc PD theo đoạn) |
| `projects/hist/_lab/` | bàn thử: `narrator.html` (bảng thiết kế + đồ người dẫn), `map.html`, `cast.html`, `avatar.html`, `banner.html` (ảnh ra `out/hist/_lab/`, dựng lại được) |
| `projects/hist/<tập>/` | một tập: `README.md` (trạng thái, dữ kiện + nguồn, lệnh) · `PACKAGING.md` (title + prompt thumbnail) · `thumbs/` · `SCRIPT.md` · `episode.html` · `data/` (timeline, mouth, `cues.py` → `cues.json`) · `assets/` (ảnh riêng + `meta.json`) |
| `assets/hist-host/` | bản ảnh anime của người dẫn — chỉ cho thumbnail / avatar |
| `tools/hist/` | `openverse.py` / `commons.py` tìm + tải ảnh CC0 / PD · `cutout.py` cắt nền · `headcut.py` · `sticker.py` · `geo.py` bản đồ (historical-basemaps) · `mix.py` trộn lời + tiếng + nhạc |
| `channels/hist/market/` | nghiên cứu thị trường: `README.md`, `METHOD.md`, `rivals.json`, mỗi đợt `<ngày>/` (số thô API ở `out/hist/market/raw/`) |
| `out/hist/<tập>/` | đầu ra; `parts/` phần render, ảnh kiểm ở `qa/` |

## Tập
| tập | trạng thái |
|---|---|
| `sarajevo` — World War I phần 1 (233 s, tập MẪU) | **bản 8** `out/hist/sarajevo/sarajevo.mp4` — người dùng: "hầu hết ổn rồi" (2026-10-28). Đúc kết: `PLAYBOOK.md` |
| **`wrong-turn`** — TẬP 1: cú rẽ nhầm Sarajevo → WW1 | **SẴN SÀNG ĐĂNG** (2026-10-29): `out/hist/wrong-turn/wrong-turn.mp4` 13:14 + gói `out/hist/wrong-turn/youtube/` (checklist `UPLOAD.md`) |
| **`berlin`** — TẬP 2: Schabowski đọc memo → Tường Berlin mở | bản 2 + gói `out/hist/berlin/youtube/` (2026-10-29) — chờ đăng sau tập 1 |
| **berlin: nguồn đi trước video** (2026-11-02) | người dùng chốt `berlin.mp4` hiện tại (12:27), không render lại. Nguồn đã bỏ nháy trắng + hết đứng hình ~0,5 s ở 3 đoạn phim 1:58–2:07 (§242); video còn hai lỗi nhỏ này cho tới lần render sau. `parts/` đã dọn: lần sau render đủ 4 phần rồi ghép |
| **Cách tối ưu tập đã render** (người dùng 11-02) | chỉ sửa đoạn chưa ổn, không render lại cả tập, không dựng lại `parts/` cũ: `shoot.js video --from --to` đúng đoạn sửa → ghép vào hình tách từ bản cuối, cắt đúng khung → `mix.py` → loudnorm; đếm tổng khung |
| **Hàng đợi tối ưu theo mẫu berlin v3** (2026-11-02) | hitler (trailer xong; còn phim + nền, 54% đứng yên, người dùng hẹn quay lại) · pearl (45%, đoạn 15 s tệ: 1:15, 2:00–2:30, 7:30) · wrong-turn (23%; 25% nền phẳng, tệ ở 8:00, 9:30–10:15) — mỗi tập trailer + phim PD riêng |
| **`pearl`** — TẬP 3: Pearl Harbor, ba lời cảnh báo bị bấm snooze | bản 1 `out/hist/pearl/pearl.mp4` 9:52 + gói `out/hist/pearl/youtube/` (2026-10-30) — chờ người dùng xem; đăng trước 7/12 |
| **`hitler`** — TẬP 4 (thử dạng tiểu sử dài): mọi sai lầm khiến Hitler thua WW2 | `out/hist/hitler/hitler.mp4` 12:17 + gói `youtube/` (2026-11-02) — chờ người dùng xem; thứ tự đăng: pearl → Zimmermann (chưa làm) → hitler |
| ~~`ww1-full`~~ | đã xoá 2026-10-29 (bị `wrong-turn` thay; lấy lại: `git log -- projects/hist/ww1-full`) |

**Tập đầu tiên đăng kênh:** cú rẽ nhầm Sarajevo → WW1 (chốt 2026-10-28); DNA khác biệt + luận đề kênh "tiny stupid mistakes →
biggest disasters": `PLAYBOOK.md` §0b; tập: `projects/hist/wrong-turn/`; số liệu: `market/2026-10-28/VIRAL.md`; đề xuất nâng cấp ở `PLAYBOOK.md` §8.
**Loạt ra mắt (người dùng chọn tập 2 = Berlin 1989, 2026-10-29):** wrong-turn → berlin (Schabowski họp báo) → **pearl** (radar "don't worry about it", 10-30) → kế: **Zimmermann 1917** (người dùng chọn 10-30 theo tiêu chí MỚI: càng nhiều ảnh / tài liệu thật PD càng quý — scan bức điện NARA, báo 1917; móc cuối tập 3 đã đổi sang) · để sau: Constantinople 1453 (chỉ tranh cổ + truyền thuyết Doukas). Bằng chứng khuôn "mistake": `market/2026-10-28/outliers.csv` (Bin Laden ×2.1, Dumbest Decision ×1.8, Pearl Harbor ×3.9); 28 kênh đối thủ chưa ai làm Schabowski trong 24 tháng.
**Khi lên YouTube:** ra mắt 4–5 tập cùng lúc, nối nhau bằng màn hình kết thúc, cùng một "luận đề" của kênh (PACKAGING §10,
study 13). Đã có (10-29): tên, handle, avatar, banner, mô tả, từ khoá, mặc định tải lên, youtube_id. Thêm 10-30: avatar + banner nền trắng, watermark PNG (`brand/`, BRAND.md). Chưa có: trailer kênh, token API kênh hist.
