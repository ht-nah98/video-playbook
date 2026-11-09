# gacha — Pha 0: bóc tách nội dung

**Chủ đề:** ガチャの罠 (xác suất + thiết kế tâm lý + luật) · lời đọc tiếng Nhật (99の発見) · nguồn: kịch bản người dùng 2026-10-19,
nguyên văn `SCRIPT.vi.md`. Người dùng chốt: giữ mạch 6 phần, sửa sự kiện, mở đầu theo PACKAGING §0b; dùng NHIỀU ảnh thật.

## Cổng ý tưởng (docs/lesson/PACKAGING.md §1) — trả lời TRƯỚC khi bóc mạch bài
- Thumbnail phác được chưa: **một vật + ≤ 3 từ** → CÓ: nút ガチャ cầu vồng / màn 3 giây trước kết quả + 「0.6%」 (loại LẠ /
  KHOẢNH KHẮC) hoặc màn ガチャ ↔ máy slot đặt cạnh nhau (loại SO SÁNH). Chi tiết: SCRIPT.md `## Gói trước`.
- **3 câu hỏi có mâu thuẫn** → 1. 0.6% ghi rõ trên bảng tỉ lệ — vì sao vẫn quay? 2. Bảng tỉ lệ không nói gì (天井 / tỉ lệ
  tăng từ lần 74)? 3. Thứ đang được bán thật ra là gì — và ai thiết kế cho ai?
- **Người lạ có quan tâm?** CÓ — ガチャ là trải nghiệm đại chúng ở Nhật (ソシャゲ, 親ガチャ thành thành ngữ); không cần biết toán.
- **Trần + ngoại lệ** (yt-dlp ytsearch 2026-10-19): 「【2ch】元ソシャゲ運用者ですガチャ確率の闇」 590K; 「【数学】確率1%のスマホガチャを
  100回まわした時にあたる確率」 (サルの思考) 484K; 鈴木貫太郎 ガチャ確率 459K; QuizKnock コンプ確率 133K; 「無課金勢は客じゃなかった」
  110K. Trần CAO. Khoảng trống: các video toán chỉ dừng ở "1% × 100 = 63%"; video tâm lý không có toán. Ta = toán + 天井 +
  tâm lý + luật trong một video.
- **80%** khán giả bài trước (2048 — trò chơi + toán) có quan tâm? CÓ: cùng "trò chơi ai cũng chơi → toán phía sau";
  vào playlist đề xuất 「知ってるつもりの数学」.

## Mạch bài
| # | mốc / ý | phát minh / khái niệm | "vì sao quan trọng" |
|---|---|---|---|

## Soát sự kiện — CẦN SỬA (agent soát 2026-10-19; nguồn đã mở ghi kèm)

| kịch bản gốc | sửa thành | nguồn |
|---|---|---|
| "từ lần 74 tỉ lệ vọt lên ~32% mỗi lần" | ước tính cộng đồng: 74 → 6.6%, mỗi lần +6% (78 ≈ 30.6%, 82 ≈ 54.6%), 90 = 100%; HoYoverse KHÔNG công bố → nói 「プレイヤーの集計によると」 | keqingmains gacha evidence; gamevika.com/en/genshin/pity |
| "hơn 115 lần mới vượt nửa" | 116 lần (115: 49.95%, 116: 50.25%) | tính: 1 − 0.994ⁿ |
| Skinner 1938 + bồ câu | 1938 (The Behavior of Organisms) = chuột; lịch thưởng biến thiên với bồ câu = Ferster & Skinner 1957 *Schedules of Reinforcement* | chưa mở nguồn gốc — kiến thức chung; kiểm trước SCRIPT v1 |
| dopamine "trong phòng thí nghiệm" | Fiorillo, Tobler & Schultz 2003 (Science 299:1898): KHỈ, thưởng nước ép; hoạt động kéo dài cực đại ở xác suất 0.5 | PubMed 12649484 |
| "~1/2 tiền từ < 2% người chơi" | Swrve, báo cáo 2/2014 (số liệu 1/2014): ~1.5% người chơi trả tiền; 0.15% tạo NỬA doanh thu (7/2014 khác: 1.35%, 0.13% → 62% — KHÔNG dùng) | destructoid.com 2014-02-26; gamesbeat.com 2014-09-22 ("1.5 percent in January") |
| 90 lần = 4.5 triệu đồng | 14,400 創世結晶 ≈ 約3万円 (iOS 6480 = 15,000円 → ~33,000円; PC 6480 = 12,000円 → ~26,700円) | inside-games.jp 2023/05/09; game8.jp/genshin/344492 |
| Hà Lan 2018 "cấm" | Ksa 4/2018: loot box là cờ bạc KHI vật phẩm chuyển nhượng được; Raad van State 9/3/2022 huỷ phạt EA | Wikipedia Loot box; nos.nl |
| Nhật "cấm Kompu Gacha 2012" | 5/2012 消費者庁 coi コンプガチャ vi phạm 景品表示法 (không có luật mới) | Wikipedia Loot box |
| bối cảnh VN (xe máy cũ, phòng trọ, triệu đồng) | quy đổi kiểu Nhật: 3万円 = ~30 bữa trưa 1,000円, … (chọn khi viết SCRIPT) | — |

**Đợt soát 2 (2026-10-19, nguồn đã mở):**
- Clark et al. 2009 (Neuron 61:481): near-miss bị đánh giá KÉM dễ chịu nhưng TĂNG muốn chơi tiếp (khi người chơi tự
  bắt đầu lượt); kích hoạt striatum/insula như khi thắng tiền (PMC2658737).
- Review độc lập 2026-10-19 (24 mục, đã sửa): đường 1 − 0.994ⁿ dốc NHẤT ở đầu; bỏ "gacha cố ý dừng sát trúng", "相手は
  やめられない人", "phần làm nội dung chỉ là nhánh nhỏ" (không nguồn); Swrve không phải "công ty Mỹ"; ★5 bất kỳ ≠ nhân vật muốn.
- Eyal *Hooked*: Trigger · Action · Variable Reward · Investment (nirandfar.com/hooked) — năm sách KHÔNG nói trong lời.
- Near-miss: Nevada Gaming Commission 1989 — thuật toán làm dừng sát đường thắng của một hãng bị coi là "unacceptable";
  virtual reel mapping vẫn được phép (Harrigan 2008, IJMHA — chỉ abstract). KHÔNG nói "Nevada cấm near-miss".
- Ferster & Skinner 1957: bồ câu; lịch tỉ lệ biến thiên → nhịp nhanh, đều, bền nhất khi ngừng thưởng (Wikipedia
  Schedule of reinforcement). "1938 = chuột" chưa có nguồn mở → lời nói 「動物」.
- Nhật: CESA (không phải JOGA) hướng dẫn hiệu lực 27/4/2016 — nguyên tắc hiện TOÀN BỘ xác suất; không có trần chi tiêu
  (gamebiz.jp/news/160735).
- Phí cửa hàng Nhật sau MSCA (18/12/2025): Apple 21% (+5% xử lý), 10% nhóm nhỏ; trước đây 30% (developer.apple.com/support/app-distribution-in-japan).
- Tuổi 原神 ở Nhật: App Store 13+, Google Play 16+ (trang store JP).
- 国民生活センター 13/3/2024: FY2022 4,024 vụ tư vấn về game online của học sinh tiểu học–THPT, trung bình ~33万円.
- Tỉ lệ gộp 1.6%: KHÔNG mở được trang chính thức; mô hình cộng đồng (74 → +6%/lần) cho trung bình 62.3 lần = 1.61% —
  lời KHÔNG nói "chính thức 1.6%". Mô hình: ≤ 73: 35.6% · 74–80: 56.3% · trung vị 76 · 200 người: ~3.6 trúng ≤ 3 lần,
  ~16 còn chờ ở lần 80.

## Ảnh (Commons — mình tải; credit CC BY/BY-SA trên màn hình)
| file | giấy phép | tác giả | dùng |
|---|---|---|---|
| Slot machine.jpg | CC BY-SA 2.0 | Jeff Kubina | ACT 4, cold open |
| Casino Aboard the Celebrity Equinox before Christmas (6690336353).jpg | CC BY-SA 2.0 | Joe Ross | ACT 4 |
| Skinner boxes 01.jpg | PD | Luis Dantas | ACT 3 |
| Skinner box scheme 01.svg | CC BY-SA 3.0 | AndreasJS / Pixelsquid | ACT 3 |
| Belgium in Europe (-rivers -mini map).svg · Netherlands in Europe (…).svg | CC BY-SA 3.0 | TUBS | ACT 4 |
| Gashapon Machines.jpg | CC BY-SA 4.0 | Ominae | gốc chữ ガチャ (ガシャポン) |
| August 2007 pachinko in Osaka.jpg | CC0 | Syced | ACT 4 (Nhật) |
| B.F. Skinner at Harvard circa 1950.jpg | CC BY 3.0 (quyền tác giả đáng ngờ) | — | TRÁNH; dùng tên + hộp |

## Ảnh chụp trang nguồn (mình tự chụp — người dùng 2026-10-19: không đọc được tiếng Nhật, nhờ lấy hộ)
`assets/web/INDEX.md`: báo cáo Bỉ + Hà Lan 2018 (trang 1), ITmedia 2012 コンプガチャ, gamebiz 2016 CESA, 国民生活センター 2024,
GamesBeat Swrve 2014, bìa *Hooked*, Apple Japan 2025. Màn ガチャ / bảng 祈願詳細 / sao vàng: TỰ VẼ (không chụp game — bản quyền).
Ảnh SNS 「神引き」: tự vẽ màn bảng tin giả lập (không dùng bài thật của người thật).

## Đúng — giữ nguyên (đã kiểm)
0.6% · 天井 90 · 1000 người → 6 · 10 lần 5.84% · 50 lần 25.99% · 100 lần trắng tay 54.78% · Bỉ 4/2018 (FIFA 18, Overwatch,
CS:GO; phạt tới 800,000 EUR) · Trung Quốc công bố xác suất (hiệu lực 5/2017) · UK 7/2022 không đổi luật · Clark 2009
(Neuron) near-miss kích hoạt vùng thưởng.

## Lấp thông tin (đề xuất)

## Tiếng hiệu ứng (docs/lesson/SFX.md)
| khoảnh khắc | loại có sẵn / cần thêm | đã tải (nguồn CC0) hoặc hỏi người dùng |
|---|---|---|

## Ảnh (có trên Wikipedia/Commons → tôi tự tải và soi; ảnh ngoài Wikipedia → người dùng tải)
> Ghi **TÊN ĐẦY ĐỦ** + nghề + năm sinh–mất (vd. "Carl Louis Ferdinand von Lindemann, nhà toán học Đức, 1852–1939"),
> không chỉ họ: bài pi người dùng tìm "Lindemann" ra ca sĩ Till Lindemann. Nguồn: Wikipedia / Wikimedia Commons.
| file | nội dung | loại (thật / hiện vật / tưởng tượng) | gợi ý tìm |
|---|---|---|---|

## Hình cần đúng (tính trong code, ném lỗi nếu sai)

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
