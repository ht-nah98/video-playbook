# Lấy thumbnail impressions + CTR từ API YouTube

Đã chạy thử thật trên kênh của chúng tôi ngày 2026-11-02. Code mẫu: `reach_example.py` (cùng thư mục).

## Tóm tắt

- **YouTube Analytics API (`reports.query`): không có** thumbnail impressions và CTR. Các metric `cardImpressions`, `adImpressions`, `annotationImpressions` là thứ khác.
- **YouTube Reporting API: có**, từ 2026-01-15, qua nhóm "Reach reports". Tài liệu hoặc kinh nghiệm cũ hơn ngày này sẽ nói là không lấy được.
- **Quyền:** phải là tài khoản chủ kênh (hoặc Manager / Owner của Brand Account). Người được mời trong Studio → Settings → Permissions không dùng được API.

Bản PDF kèm kết quả gọi thử: `CTR-IMPRESSIONS-API.pdf`. Gọi Analytics API với `videoThumbnailImpressions` / `videoThumbnailImpressionsCtr` (như một số câu trả lời AI gợi ý) đều lỗi 400 trên kênh thật.

## Báo cáo

| reportTypeId | Chiều | Metric |
|---|---|---|
| `channel_reach_basic_a1` | date, channel_id, video_id | `video_thumbnail_impressions`, `video_thumbnail_impressions_ctr` |
| `channel_reach_combined_a1` | date, channel_id, video_id, traffic_source_type, traffic_source_detail, operating_system, device_type | như trên |
| `content_owner_reach_basic_a1`, `content_owner_reach_combined_a1` | dành cho content owner (chưa thử) | như trên |

## Các bước

1. Bật **YouTube Reporting API** trong Google Cloud, tạo OAuth client.
2. Xin OAuth với scope `https://www.googleapis.com/auth/yt-analytics.readonly`, đăng nhập bằng tài khoản chủ kênh, chọn đúng kênh. Lưu refresh token.
3. Tạo job, mỗi loại báo cáo một lần: `POST /v1/jobs` với `{"reportTypeId": "channel_reach_basic_a1", "name": "..."}`. YouTube chỉ bắt đầu tạo báo cáo sau bước này.
4. Sau tối đa 48 giờ, liệt kê: `GET /v1/jobs/{jobId}/reports`.
5. Tải CSV: GET vào `downloadUrl` của từng báo cáo, kèm OAuth token.
6. Lưu file về máy hằng ngày.

## Định dạng

```csv
date,channel_id,video_id,video_thumbnail_impressions,video_thumbnail_impressions_ctr
20261031,UC...,VIDEO_ID,13,0
```

## Bẫy

Mục "chính thức" theo tài liệu Google; mục "thực tế" do chúng tôi quan sát.

- **Đếm trùng (thực tế):** 10 / 40 ngày có 2 báo cáo cho cùng ngày. Cộng hết thì sai, có video tăng 73%. Mỗi `startTime` chỉ giữ báo cáo có `createTime` mới nhất. Google có mô tả backfill sinh báo cáo với ID mới.
- **CTR là phân số 0–1 (thực tế):** ví dụ `0.102` = 10,2%.
- **Không lấy trung bình CTR theo ngày (nguyên tắc tính):** phải có trọng số: `tổng(impressions × ctr) / tổng(impressions)`.
- **Trễ (chính thức):** báo cáo của một ngày thường có sau khoảng 2 ngày.
- **Lịch sử có hạn (chính thức):** job mới có dữ liệu 30 ngày trước ngày tạo. Không lấy được xa hơn; cần cũ hơn thì export từ Studio.
- **File hết hạn (chính thức):** báo cáo thường còn 60 ngày, báo cáo lịch sử 30 ngày. Không tải đều là mất.
- **Token hết hạn (thực tế):** token của chúng tôi hết hạn làm dữ liệu dừng 3 ngày mà không báo. Nên cảnh báo khi job tải thất bại.
- **Giá trị rỗng (thực tế):** coi như 0 khi cộng.
- **Lệch Studio:** chưa đối chiếu từng số với Studio. Nên so một video trước khi tin.

## Nguồn

- Reach reports được thêm 2026-01-15: https://developers.google.com/youtube/reporting/revision_history
- Danh sách báo cáo kênh: https://developers.google.com/youtube/reporting/v1/reports/channel_reports
- Quy trình, lịch sử, thời hạn file: https://developers.google.com/youtube/reporting/v1/reports
- Metric của Analytics API: https://developers.google.com/youtube/analytics/metrics
- Giới hạn API với người được mời: https://support.google.com/youtube/answer/9367690
