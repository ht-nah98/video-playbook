# TREATMENT — `ja/intro` (0–20.69 s)

Nhạc: `audio/intro-ja.m4a`, 97.97 BPM, beat 0.612 s, ô nhịp 2.45 s (0.38 · 2.83 · 5.28 · 7.73 · 10.18 · 12.63 · 15.08 ·
17.53 · 19.98). Đoạn: intro 0.38–5.28 · build 5.28–10.18 · main 10.18–17.53 · drop 17.53–19.98 · outro 19.98–20.69.
Mốc cụm lời: `data3d/lyrics.json` (lời người dùng, mốc whisper — `data3d.py`). Mọi mốc trong cảnh tra từ dữ liệu.

| # | mốc | lời / nhịp | hình | camera |
|---|---|---|---|---|
| 1 | 0–0.38 | — | đen → sàn sơn mài hiện | từ trên nhìn xuống |
| 2 | 0.38 | beat | **giọt vàng** rơi chạm sàn, gợn vàng loang | hạ dần |
| 3 | 0.99 · 1.61 · 2.22 | beat ×3 | mỗi beat **một nét cọ vàng** vẽ 1/3 vòng **円相** trên sàn | tiếp tục hạ, xoay nhẹ |
| 4 | 2.50 | **なぜ？** | chữ son rơi đập vào tâm 円相, gợn vàng, rung khung | thấp, chính diện |
| 5 | 3.14 | **どうして？** | chữ vàng đập bên phải; **なぜ？ nứt kintsugi** (vết vàng chạy trên mặt chữ) | đẩy nhẹ |
| 6 | 3.76 | **答えを** | chữ ngà trồi lên dưới trái | — |
| 7 | 4.18 | **探せ！** | chữ vàng to; camera **lao xuyên qua dấu ？** | dive → cắt ở 4.72 |
| 8 | 4.72 | **数字の** | **tường chữ số vàng** đập vào theo hàng (hạt bàn tính) | chéo, lùi chậm |
| 9 | 5.54 | **裏に** | từng cột chữ số **úp xuống chìm vào sơn mài**, lộ vườn đá: đá đen, vân cát vàng loang | vòng nhẹ |
| 10 | 5.82 | **隠れた** | chữ ngà | — |
| 11 | 6.50 | **世界** | chữ vàng **trồi từ sàn** | — |
| 12 | 7.33 | **見える** | vân cát **dựng đứng lên thành đường hầm vòng vàng** | lên trục đường hầm |
| 13 | 7.72 | **ビジュアル** | chữ vàng trượt vào giữa đường hầm; vòng gợn sóng sin | — |
| 14 | 8.28 | **ひらめく** | **chớp trắng** + tia sét vàng đánh xuống | rung |
| 15 | 8.86 | **未来！** | lao qua đường hầm tới chữ 未来！ phát sáng | bay tới, cắt ở 9.44 |
| 16 | 9.44 | **99** | **con dấu 朱印** đóng xuống, chớp, rung (ナインティナイン kéo dài 1.5 s: dấu nảy theo beat) | thấp |
| 17 | 10.18 | ô nhịp | dấu để lại **vết mực son** loang trên sàn | đẩy |
| 18 | 10.92 · 11.10 | **の · 発見！** | chữ vàng trồi bên phải dấu | — |
| 19 | 11.64 | **数学も** | trái: **vật toán vàng** (vòng xuyến, khối lập phương, cầu lưới) xoay | rộng |
| 20 | 12.50 | **科学も** | phải: **nguyên tử son** (hạt nhân + 3 quỹ đạo) quay | — |
| 21 | 13.12 | **もっと** | hai nửa lao về camera | đẩy nhanh |
| 22 | 13.56 | **面白い！** | **hoa giấy cắt bùng nổ** (vàng + son, rơi có trọng lực), chữ son đập | rung, chớp |
| 23 | 14.50 | **知るほど、** | hàng **đèn lồng giấy** sáng lần lượt theo beat; chữ ngà | trượt ngang |
| 24 | 15.57 | **世界は** | chữ vàng; đèn sáng hết | — |
| 25 | 16.04 | **面白い！** | chữ son; đèn bừng sáng | — |
| 26 | 16.90 | **99** | **mascot `wave` ảnh 2D** trong khung vàng bên trái; số **99 vàng khổng lồ** đập giữa | thấp, kiểu anh hùng |
| 27 | 17.53 | drop | mascot **vỡ thành khối vàng** bay quét qua khung, rung | rung theo kick |
| 28 | 18.20 · 18.38 | **の · 発見！** | ghép thành hàng **99の発見** | lùi |
| 29 | 19.02 · 19.56 | **Let's · go!** | chữ son nhỏ bật lên theo từ | — |
| 30 | 19.37–20.69 | logo | khung logo: **99の発見** + 「知るほど、世界は面白い」+ triện 発 đóng ở 19.98 (chớp) | lùi chậm, đứng → tắt dần đúng 20.69 |

## Kiểm trước khi báo xong
- Sheet một khung cho mỗi dòng; mỗi cụm lời có vật thể trong ±2 khung quanh mốc hát.
- `tools/qa/still_windows.py` không báo đoạn đứng yên > 0.5 s (trừ khung logo cuối).
- Tất định: cùng mốc render hai thứ tự + một mốc render hai lần.
- Độ dài hình = tiếng = 20.69 s.
