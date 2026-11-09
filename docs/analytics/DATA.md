# Dữ liệu kênh — có gì, không có gì, bù bằng gì (kiểm 2026-10-23)

Nguồn: tài liệu Google (Analytics API metrics/dimensions, Reporting API channel reports) + **gọi thử thật trên kênh
Nhật** (`r2jFvEc5yQI`, π). "✓ thử" = đã trả số thật; "✗ thử" = API báo lỗi trên kênh mình.

## 1. Có — Analytics API (truy vấn tức thì, mọi khoảng ngày, toàn lịch sử)

| nhóm | chỉ số / chiều | ghi chú |
|---|---|---|
| lượt xem | `views`, **`engagedViews`** ✓ thử | engaged = xem qua mấy giây đầu. π: 559 views nhưng chỉ **85 engaged** |
| thời gian xem | phút xem, xem TB, % xem TB | |
| tương tác | like, comment, share, sub +/−, thêm vào playlist | |
| **giữ chân** | `audienceWatchRatio`, `relativeRetentionPerformance` theo 100 điểm (0.01→1.0) | chỉ lọc được ORGANIC/quảng cáo; video ít view → rỗng (Chirality, 2048 rỗng) |
| nguồn traffic | 22 loại + **chi tiết**: từ khoá search, video gợi ý dẫn tới, trang ngoài, hashtag, end screen, tính năng Browse (`what-to-watch` = trang chủ) ✓ thử | |
| **nơi phát** | `insightPlaybackLocationType`: WATCH / BROWSE / EMBEDDED… ✓ thử | **BROWSE = phát ngay trên trang chủ (autoplay xem trước)** — xem §4 |
| thiết bị | loại thiết bị, hệ điều hành ✓ thử | |
| địa lý | quốc gia (+ tỉnh Mỹ, thành phố) | thành phố rỗng khi ít view |
| khán giả | tuổi × giới (`viewerPercentage`) | rỗng khi ít view (ngưỡng riêng tư) |
| dạng nội dung | `creatorContentType`: video / Shorts / live | |
| thời gian | theo **ngày** (hoặc tháng) | **không có theo giờ** |
| thumbnail | Data API `snippet.thumbnails.maxres` — bản ĐANG hiện trên YouTube | `pull.py` tải mỗi lần đồng bộ → `analytics/raw/<ch>/thumbs/<id>/<sha>.jpg` + `history.json` (đổi thumbnail / A/B → thấy lịch sử). KHÔNG dùng file trong máy cho phân tích (thumbnail trên YouTube hay khác bản trong `out/`) |

## 2. Có — Reporting API (file CSV mỗi ngày; kênh Nhật: 3 job tạo 2026-10-23, `tools/yt/reporting.py`)

| báo cáo | chỉ số | chiều |
|---|---|---|
| `channel_reach_basic_a1` | **impressions thumbnail, CTR** | ngày × video |
| `channel_reach_combined_a1` | **impressions, CTR** | ngày × video × **nguồn traffic** (+ chi tiết) × thiết bị × HĐH |
| `channel_basic_a3`, `channel_traffic_source_a3`, `channel_combined_a3`, `channel_end_screens_a2`, `channel_subtitles_a3`… | như Analytics API nhưng tách sẵn theo ngày + **đã/chưa sub** + quốc gia | |

Giới hạn: job mới có **30 ngày lịch sử trước ngày tạo**; báo cáo trễ ~2 ngày; file giữ 60 ngày (lịch sử: 30) → phải
**tải về hằng ngày** và lưu ở `analytics/raw/<ch>/reporting/`. Dòng dưới ngưỡng riêng tư (~10 view) gộp thành NULL.
Kênh Nhật bắt đầu 2026-10-12 → tạo job trước **2026-11-11** thì giữ được impressions/CTR từ ngày đầu.

## 3. Không có qua API — và cách bù

| thiếu | vì sao quan trọng | bù bằng |
|---|---|---|
| **unique viewers** (người xem duy nhất) | phân biệt 1 người xem 5 lần với 5 người | Studio (extension / chụp màn hình); tạm: `engagedViews` |
| **người xem mới / quay lại / thường xuyên** | kênh có đang giữ được khán giả không | Studio (tab Audience) |
| **"khán giả cũng xem"** (kênh / video khác họ xem) | biết mình nằm cạnh ai trong đề xuất | Studio tab Audience — cần đủ dữ liệu |
| **realtime theo giờ** (48 h / 60 phút) | vòng thử 48 h đầu của video mới | Studio Realtime; API chỉ theo ngày |
| **kết quả A/B thumbnail** (Test & Compare) | chọn thumbnail bằng số thật | Studio (đọc khi test xong) |
| **Research tab** (người xem của bạn tìm gì) | ý tưởng bài mới | Studio |
| impressions **trước ngày tạo job − 30** | lịch sử CTR video cũ | Studio Advanced mode → Export CSV (một lần) |
| retention **tách theo nơi phát** (WATCH vs BROWSE) | xem §4 | không có ở đâu; ước bằng phút xem chia theo nơi phát |
| bình luận / cảm xúc | | Data API `commentThreads` (có, chưa kéo) |
| doanh thu | | ✗ (kênh chưa bật kiếm tiền; token không có quyền) |
| `subscribedStatus` qua Analytics API | | ✗ thử (lỗi 500) → lấy từ Reporting API |
| thẻ (cards), share theo nền tảng | | ✗ thử (lỗi nội bộ) → Reporting API |

Nguyên tắc: **mọi con số trong báo cáo ghi rõ nguồn** (API / Reporting / Studio + ngày chụp). Thiếu dữ liệu → ghi "không
có", không suy ra từ chỉ số khác mà không nói.

## 4. Bẫy đã gặp: "views" gồm cả autoplay trên trang chủ

Video π (Nhật), toàn bộ lịch sử:

| nơi phát | views | phút xem | xem TB |
|---|---|---|---|
| BROWSE (trang chủ, phát tự động khi lướt) | **470** | 71 | ~9 s |
| WATCH (bấm vào trang xem) | 88 | 199 | ~2:16 |

Cộng với `engagedViews` = 85 và Studio CTR 2.8% × 2 398 impressions ≈ 67 lượt bấm → **người xem thật ≈ 70–90, không
phải 559**. "Browse 530 views" trong nguồn traffic phần lớn là autoplay xem trước. Đường giữ chân API trộn cả hai nhóm
→ cú rơi 0:11–0:33 có thể là autoplay dừng khi người ta lướt qua, KHÔNG chắc là do lời mở đầu (sửa lại kết luận
2026-10-23 trước đó).

Lưu ý: **thời lượng xem TB của YouTube đã loại lượt tự phát** ở mẫu số — π: 270 phút ÷ ~89 lượt WATCH ≈ 3:02 ≈
`averageViewDuration` 2:59, còn 270 ÷ 559 views chỉ 0:29. Lấy số tổng YouTube trả (`v_total`), đừng tự chia phút cho views.

**Luật:** đánh giá video bằng `engagedViews`, phút xem nơi phát WATCH, và impressions/CTR (Reporting) — không bằng
`views` thô. Báo cáo tuần luôn tách WATCH vs BROWSE.

## 5. Quyền truy cập theo kênh (LESSONS §140)

| loại quyền | Studio web | API |
|---|---|---|
| chủ kênh (Owner — kênh cá nhân hoặc Brand Account) | ✓ | ✓ |
| Manager / Owner của **Brand Account** (kiểu cũ — các kênh HG share theo cách này, hiện trong bảng "Choose your account or a brand account") | ✓ | ✓ |
| Manager / Editor / Viewer trong **Studio → Settings → Permissions** | ✓ | ✗ — Google: *"They can't manage via YouTube APIs"* ([9367690](https://support.google.com/youtube/answer/9367690)); Metricool: chỉ Owner kết nối được |

Công cụ bên thứ ba (vd. Channel Management của công ty người dùng) "lấy được data" vì người bấm cấp quyền là
**tài khoản chủ kênh** (trình duyệt đăng nhập sẵn Gmail chủ kênh), không phải tài khoản Manager.

- 99の発見: kênh cá nhân của người dùng → ✓.
- 99% from scartch: chủ kênh ở nước ngoài, người dùng là Studio Manager → **cấp quyền từ xa**: thêm Gmail chủ kênh vào
  Test users (Google Auth Platform → Audience) → `stats.py --ch en --remote` in link → chủ kênh đăng nhập, Cho phép,
  copy địa chỉ `localhost:8790/?…code=…` gửi lại trong 10 phút → `stats.py --ch en --remote-finish '<địa chỉ>'` (kiểm
  `youtube_id` rồi mới lưu token). Chủ kênh thu hồi được ở myaccount.google.com/permissions.

## 6. Export Studio (CSV) — bù phần API không có (2026-10-23)

Studio → Analytics → Advanced mode → khoảng thời gian → tab chiều (Content, Traffic source, Geography, Audience by watch
behavior, Subscription source/status, Viewer age, Device, Content type, Subtitles, Cities, Video info language) → Export →
CSV. Mỗi zip có `Table data.csv` (theo chiều), `Chart data.csv` (theo ngày), `Totals.csv`.
Chép zip vào `analytics/raw/<ch>/studio/export-<ngày>/zip/`, giải nén ra `csv/<chiều>/` → `tools/yt/db.py` nạp MỌI file
thành `studio_<chiều>_<table|chart|totals>` (cột slug, "h:mm:ss" → giây). Trang dùng export mới nhất: lần hiện + CTR +
người xem mới / quay lại + ở lại xem theo video; nguồn / quốc gia / nguồn sub / tuổi / phụ đề cấp kênh.
Chỉ Studio có: **Thumbnail impressions + CTR theo nguồn**, **New / Casual / Regular / Returning viewers**, **Stayed to watch**,
**Unique viewers / reach**, end screen. Lưu ý: cột Subscribers theo quốc gia trong export = 0 hết (Studio không chia) — đừng dùng.
