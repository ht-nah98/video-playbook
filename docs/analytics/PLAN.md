# Phân tích kênh: trang web học và tối ưu (kế hoạch v2, 2026-10-23)

## 0. Ý tưởng cốt lõi (người dùng, 2026-10-23)

Một **trang web** (không phải báo cáo chữ) xem dữ liệu ĐỘNG của **mọi kênh** (hiện 2, sau có thể 3–4), có biểu đồ và
hình ảnh, phục vụ một **vòng học khép kín cho từng video**:

```
   đăng video ──► phân tích ──► tối ưu ──► đúc kết ──► đăng video sau
       ▲            (số thật)    (thí nghiệm)  (bài học)       │
       └────────────────────────────────────────────────────────┘
          + kiến thức: CHỦ YẾU từ video mẫu ta học và đúc kết (docs/study/: MrBeast, Aprilynne Alter, median,
            Alan Becker…), cộng số thật của kênh và Google — mỗi điều ghi "đã kiểm trên kênh mình chưa"
```

Trọng tâm là **kênh Anh** (kênh Nhật còn quá ít số để tối ưu). Kênh Anh đang chờ chủ kênh mời vào Brand Account (§6).

## 1. Nguồn dữ liệu (chi tiết: `DATA.md`, bản trình bày: `YOUTUBE-DATA.pdf`)

| tầng | nguồn | lấy | nhịp |
|---|---|---|---|
| 1 | Analytics API v2 | views, **lượt xem thật**, phút xem, giữ chân, nguồn + từ khoá, nơi phát, thiết bị, quốc gia… | tự động hằng ngày (`sync.py`) |
| 1 | Reporting API | **impressions + CTR** theo ngày × video × nguồn; đã/chưa sub | tự động hằng ngày (file chỉ giữ 60 ngày) |
| 1 | Data API v3 | danh sách video, title, mô tả, tags, độ dài, bình luận | tự động |
| 2 | Studio (tay) | người xem mới/quay lại, "khán giả cũng xem", realtime 48 h, A/B thumbnail | hằng tuần ~5 phút |
| 3 | extension Studio (sau) | đúng phần tầng 2, chỉ đọc trang người dùng tự mở | khi tầng 1–2 đã quen |

Luật đọc số (LESSONS §139): đánh giá video bằng lượt xem thật + phút xem WATCH + CTR, không bằng `views`; mọi số ghi nguồn.

## 2. Kiến trúc

```
channels/<ch>/channel.json   kênh (youtube_id) — thêm kênh = thêm thư mục, không sửa code
channels/<ch>/videos.json    id video → projects/<p> (nối số liệu với DNA, title, thumbnail, kịch bản của bài)

tools/yt/                    THU THẬP (chỉ đọc YouTube)
  auth.py                    danh sách kênh, token mỗi kênh, chặn token sai kênh theo ID
  sync.py                    lệnh hằng ngày = pull + reporting + db cho mọi kênh có token (cron 9:17)
  live.py                    bộ đếm công khai mỗi giờ (cron phút 7) → 48 h đầu video mới; crontab ở live.cron
  pull.py · reporting.py     Analytics API · Reporting API → analytics/raw/<ch>/
  live.py                    bộ đếm công khai mỗi giờ → 48 h đầu video mới (Analytics API trễ ~2 ngày)
  db.py                      raw → analytics/yt.sqlite (dựng lại từ đầu, --sql để truy vấn)
  stats.py                   xem nhanh trên terminal; --login, --remote (cấp quyền từ xa cho chủ kênh)
  live.cron                  crontab: live mỗi giờ + sync 9:17 hằng ngày, kèm dựng lại trang
tools/i18n/push.py           GHI duy nhất: bản dịch title/mô tả (--dry-run, người dùng duyệt)

analytics/                   DỮ LIỆU riêng tư — không commit
  raw/<ch>/<ngày>/…          nguyên văn API mỗi lần kéo
  raw/<ch>/reporting/<loại>/ CSV Reporting API
  raw/<ch>/studio/           số ghi tay / extension (tầng 2–3)
  yt.sqlite                  kho truy vấn

docs/analytics/              TRI THỨC — commit
  PLAN.md · DATA.md · YOUTUBE-DATA.pdf
  loop/experiments.json      vòng học: mỗi thí nghiệm (giai đoạn 2)
  loop/knowledge.json        kiến thức: từ số của mình + từ Google, kèm trạng thái kiểm chứng (giai đoạn 2)

site/serve.py                trang + HỎI ĐÁP AI: POST /api/ask → `claude -p` trong repo, CHỈ ĐỌC (Read/Grep/Glob + db.py) →
                             python3 site/serve.py → http://127.0.0.1:8765/analytics/site/  (?ask=… = link hỏi thẳng)
docs/analytics/weekly/<YYYY>-W<nn>.md   báo cáo tuần — trang "Việc tuần" hiện bản mới nhất
site/build.py + template.html  TRANG WEB (bản phác 2026-10-23) → analytics/site/index.html (không commit: có số liệu)
                             python3 site/build.py && xdg-open analytics/site/index.html
```

Tách như vậy vì số liệu thô là thông tin riêng của kênh (kênh Anh còn là kênh của người khác) nên ở ngoài git;
còn kết luận, thí nghiệm, kiến thức là tri thức của repo nên commit, giống `LESSONS.md`.

## 3. Trang web: các màn hình (bản phác, chốt cùng người dùng trước khi code)

| màn | nội dung | biểu đồ |
|---|---|---|
| **Sức khoẻ kênh** | KPI + so kỳ trước (7/28/90 ngày); lượt xem thật ↔ tự phát theo ngày có mốc ngày đăng; nguồn theo ngày + phút/view; giờ xem; sub ±; 7 ngày đầu từng video so trung vị; vòng đời 28 ngày; CTR × % xem; từ khoá toàn kênh; video NGOÀI dẫn tới (kênh mình đứng cạnh); quốc gia, thiết bị, HĐH, tuổi, Shorts; nhận định tự động | KPI, cột chồng, đường, bóng |
| **Dữ liệu & nguồn** | mỗi số đến từ đâu, đồng bộ lúc nào, thumbnail tải từ YouTube bao nhiêu, Reporting có file chưa, còn thiếu gì | bảng |
| **Tổng quan** | mọi kênh cạnh nhau: lượt xem thật, phút xem, sub, CTR 28 ngày; video nào ĐANG được YouTube thử | thẻ số + đường xu hướng nhỏ |
| **Kênh** | mọi video: thumbnail, title, ngày đăng, lượt xem thật, CTR, % xem, giữ chân 0:30 | bảng sắp xếp được + đồ thị phân tán CTR × % xem |
| **Video** | vòng đời 28 ngày đầu; nguồn traffic theo ngày; WATCH ↔ BROWSE; đường giữ chân + mốc chương / câu kịch bản; từ khoá search; video dẫn tới | đường, cột chồng, đường giữ chân có chú thích |
| **So sánh** | hai video bất kỳ (cùng kênh hoặc khác kênh, vd. π Anh ↔ π Nhật) | chồng đường |
| **Vòng học** | bảng thí nghiệm: giả thuyết → thay đổi → kết quả 7 / 28 ngày → bài học | thẻ theo cột trạng thái |
| **Kiến thức** | điều đã học (LESSONS §n, PACKAGING) + nguồn Google; mỗi điều: "đã kiểm / chưa kiểm / bác bỏ trên kênh mình" | — |
| **Việc tuần** | 3 kết luận + 1–2 thí nghiệm tuần này; video sắp đăng cần áp luật gì | — |

Điểm khác biệt: số liệu nối với **nội dung bài** (`videos.json` → `projects/<p>`). Đường giữ chân hiện kèm câu kịch
bản đang đọc ở giây đó, nên thấy được người xem bỏ đi ở CÂU nào, không chỉ ở giây nào.

## 4. Vòng học: quy trình

1. **Đăng**: thêm id vào `channels/<ch>/videos.json`; ghi thí nghiệm nếu video thử điều mới (title kiểu mới, mở đầu mới…).
2. **Phân tích**: 48 h đầu (realtime Studio + Browse theo ngày), 7 ngày, 28 ngày, xem trên trang Video.
3. **Tối ưu**: video đang chạy (đổi title/thumbnail, A/B) hoặc video sau. Mỗi thay đổi là một thí nghiệm có giả thuyết.
4. **Đúc kết**: kết quả 7 / 28 ngày → `knowledge.json`; điều chắc chắn → `PACKAGING.md` / `channels/<ch>/` / `LESSONS.md` (skill wrap-up).
5. **Đăng video sau**: skill `lesson-video` / `thumbnail-artist` đọc kiến thức đã kiểm trước khi làm gói.

Kiến thức (`knowledge.json`, người dùng 2026-10-23): nguồn chính là **video mẫu ta học và đúc kết** (`docs/study/`, quy
trình 6 bước ở `docs/study/README.md`); Google chỉ là một phần; thứ ba là số thật của kênh. Mỗi điều có trạng thái
(chưa kiểm / đang kiểm / đã thành luật — chờ số kiểm / đã xác nhận trên kênh / không dùng làm luật) và chỉ thành luật
chắc khi số của kênh mình xác nhận. Học xong một video mẫu → thêm thẻ vào `knowledge.json`.

## 5. Nhịp

- **Hằng ngày**: `tools/i18n/.venv/bin/python tools/yt/sync.py` (~1 phút), trang web tự cập nhật.
- **Video mới**: chụp Studio Realtime ở 2 h / 24 h / 48 h (tầng 2).
- **Hằng tuần**: cùng đọc số mới → `docs/analytics/weekly/<tuần>.md` (ghép số với dữ liệu sản xuất — thứ Studio không
  biết) → cập nhật `loop/experiments.json` + `knowledge.json` → hỏi thêm ở cột AI. Bản đầu: 2026-W43.

## 6. Trạng thái và lộ trình

| giai đoạn | việc | trạng thái |
|---|---|---|
| 1. Thu thập | `auth` · `pull` · `reporting` · `db` · `sync`; kênh Nhật kéo trọn lịch sử; 3 job Reporting (tạo 2026-10-23, file đầu ~25/10) | ✓ |
| 1. Kênh Anh | người dùng chỉ là **Manager trong Studio**, API không nhận → chờ chủ kênh mời vào **Brand Account** → `stats.py --ch en --login` → `reporting.py en --create` → `sync.py` | ⏳ chờ chủ kênh |
| 2. Trang web | ✓ bản phác 7 màn (`site/`), kênh Nhật số thật, kênh Anh số MẪU → người dùng góp ý → bản thật khi có số kênh Anh + CTR Reporting | ⏳ chờ góp ý |
| 3. Studio | mẫu ghi tay tuần → extension chỉ đọc | ☐ |
| 4. Tự động | cảnh báo "video đang được thử / vừa dừng"; gợi ý thí nghiệm | ☐ |

## 7. An toàn và giới hạn

- Mọi công cụ chỉ ĐỌC YouTube, trừ `push.py` (bản dịch; `--dry-run` trước, người dùng duyệt).
- Token `~/.config/mascot-mv/youtube-token-<ch>.json` (600), thu hồi ở myaccount.google.com/permissions.
- App OAuth ở chế độ Testing: refresh token hết hạn sau 7 ngày → đăng nhập lại (`stats.py --ch <ch> --login`).
- Analytics API: `subscribedStatus`, cards, sharingService trả lỗi trên kênh mình → lấy từ Reporting API; lỗi 5xx tạm
  thời được `pull.py` thử lại 3 lần.
- Trang web chạy trên máy; muốn chia sẻ ra ngoài thì hỏi chủ kênh Anh trước (số liệu của kênh họ).
