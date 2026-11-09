# Nghiên cứu thị trường kênh lịch sử

| file | là gì |
|---|---|
| `METHOD.md` | quy trình hai giai đoạn, tiêu chí, chuẩn bằng chứng (dùng lâu dài) |
| `rivals.json` | danh sách kênh đối thủ cho `tools/hist/market/pull.py` [{handle, group: niche / adjacent}] — sửa ở đây khi thêm kênh |
| `<YYYY-MM-DD>/` | MỘT đợt nghiên cứu — không ghi đè đợt cũ (snapshot cũ giữ để đo tốc độ) |
| `build.py` → `index.html` | trang đọc, dựng từ đợt MỚI NHẤT |

Đợt `2026-10-28/`: `PRELIM.md` (bản sơ bộ) → `REPORT.md` (31 kênh, 11 ngôn ngữ, 16 quan sát từ tracker) + `channels.*`,
`observations.*` → `VIRAL.md` (số thật Data API: 28 kênh, 1 599 video dài, mổ thumbnail; chọn tập đầu) + `outliers.csv`.

## Hệ phân tích (số thật, YouTube Data API chỉ ĐỌC dữ liệu công khai, token kênh en)
1. `tools/i18n/.venv/bin/python tools/hist/market/pull.py` — mọi video 24 tháng của các kênh trong `rivals.json` → số thô
   `out/hist/market/raw/<ngày>/` (HDD). ~1 đơn vị quota / 50 video; không `search.list`, không tải video.
2. `python3 tools/hist/market/outliers.py` — điểm vượt trội = views / trung vị video cùng kênh cùng tuổi (×0.5–×2) →
   `<ngày>/outliers.csv` + in top. Chụp lại sau ≥ 7 ngày → so hai đợt = tốc độ thật.
3. vidIQ (`keyword_research`, `outliers`, `similar_thumbnails`): khối lượng tìm kiếm + cạnh tranh — 150 credit / kỳ (≈ 30 lần
   gọi), dành cho câu hỏi đã lọc qua bước 1–2.
4. Mổ thắng: lưới thumbnail (`out/hist/market/thumbs/`), khuôn title, độ dài → ghi vào `<ngày>/VIRAL.md`.

Không yt-dlp hàng loạt, không cookie người dùng. Cần đọc lời một video → người dùng dán transcript.

## Trang đọc
```bash
python3 channels/hist/market/build.py
python3 -m http.server 8793 --bind 127.0.0.1 --directory channels/hist
```
Mở http://localhost:8793/market/ (bộ lọc kênh, tải CSV / JSON, quy trình).
