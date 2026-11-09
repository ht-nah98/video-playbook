# Học từ người giỏi — cách ta học một video mẫu

Người dùng gửi video của những người làm nội dung giỏi nhất. **Video mẫu là THAM KHẢO** — ta làm bài giảng, tối ưu theo
cách riêng và cảm nhận của kênh mình, không bê luật của dạng nội dung khác (người dùng 2026-10-14). Mỗi video mẫu được rút thành **bài học có số đo**,
đối chiếu với video THẬT của ta, và chỉ thành luật khi người dùng duyệt. Đây không phải tóm tắt lại video:
ta tóm tắt để biết họ nói gì, nhưng giá trị nằm ở bước 4–5.

## Sáu bước

1. **Chuẩn bị** — `tools/study/prep.sh <video.mp4> <slug> [en|ja]` → `out/_lab/study/<slug>/`: lời (whisper
   large-v3), ảnh mỗi 5 s ghép bảng `sheet*.jpg`, nhịp hình `pace.txt`. Không commit thứ gì trong đó (lời và
   ảnh là của tác giả video).
2. **Xem hết** — đọc toàn bộ lời VÀ nhìn mọi bảng ảnh. Ghi lại cả cách video TỰ làm (nó có làm đúng điều nó dạy
   không?), không chỉ lời nó nói.
3. **Đánh giá nguồn** — chỗ nào có bằng chứng (trích lời gốc, số liệu thật), chỗ nào là phóng đại hay khái quát
   từ vài ví dụ. Con số giật gân (vd. "70% mọi video") phải ghi rõ là chưa kiểm chứng.
4. **Đo khoảng cách với ta** — chạy cùng thước đo lên video của ta (`python3 tools/study/pace.py out/…mp4`,
   chương, câu đầu, giờ bắt đầu thân bài). Bài học không có số đo của ta đi kèm thì chưa xong.
5. **Đề xuất** — mỗi đề xuất ghi rõ: đổi ở bước nào của quy trình (SCRIPT, DNA, plates, build, QA), giá bao
   nhiêu, và cái gì KHÔNG bắt chước (dạng video, giọng, phong cách khác ta).
6. **Người dùng duyệt** → luật được duyệt vào đúng nhà của nó (`docs/CRAFT.md`, `docs/lesson/LESSON-VIDEO.md`,
   `channels/<kênh>/WRITING.md`, công cụ QA). File học ở đây giữ bằng chứng và lý do.

## Kiểm bằng dữ liệu thật

Lý thuyết của người khác là giả thuyết. Thước đo cuối là **biểu đồ giữ chân người xem trong YouTube Studio** của
chính các video ta đã đăng: so điểm rơi trên biểu đồ với giờ trong video (`out/<p>/youtube/chapters.txt`).

## Đã học

| # | video mẫu | file | trạng thái |
|---|---|---|---|
| 00 | kênh "median" — "Bản chất thật của số Pi" (11:17) | `00-pi-median.md` · [▶](https://youtu.be/UXk8T9fpcWQ) | áp vào pi 2026-10-07, đã vào templates/lesson |
| 01 | April Lynne Alter — "How MrBeast Solved YouTube Retention" (14:10) | `01-mrbeast-retention.md` · [▶](https://youtu.be/5zu8s38ZwtQ) | người dùng duyệt 2026-10-14: tham khảo, áp mềm (§5 của file) |
| 02 | April Lynne Alter — "give me 9 minutes, I'll make your thumbnails 81% better" (9:55) | `02-thumbnails.md` · [▶](https://youtu.be/KE4zqD0ONDI) | thử ngay 3 thumbnail hikari, chờ người dùng |
| 03 | April Lynne Alter — "how to make an EVEN MORE killer youtube intro" (25:02) | `03-intro.md` · [▶](https://youtu.be/eRWyf-oDdCI) | đề xuất mềm, chờ người dùng |
| 04 | Aprilynne Alter — "I Watched Every MrBeast Interview" (27:07) — chỉ đọc lời | `04-mrbeast-interviews.md` · [▶](https://youtu.be/5wvmDSMH9AM) | người dùng duyệt 2026-10-15: áp cho video sau — gom vào `docs/lesson/PACKAGING.md` |
| 05 | Aprilynne Alter — "Stuck in 'The YouTube Dip'?" (20:07) — lời + 32 khung ví dụ + số view thật 20 video kênh Anh | `05-youtube-dip.md` · [▶](https://youtu.be/mOFJLBV0LbM) | ý A–D gom vào PACKAGING 2026-10-16; E `tools/study/channel.py`; F đổi gói fifty-percent (người dùng duyệt) |
| 06 | Alan Becker — "Animation vs. Geometry" (9:02, không lời) — 181 khung | `06-stick-geometry.md` · [▶](https://youtu.be/VEJWE6cpqw0) | đã dựng `engine/stick.js` + bàn thử; đề xuất vai "người que = diễn viên trong hình toán" chờ người dùng |
| 07 | median — "Giải tích là gì?" (15:36) — 234 khung; nhiều khả năng là nguồn kịch bản calculus | `07-median-calculus-stick.md` · [▶](https://youtu.be/ptPvraS02Eg) | người que tương tác với CHỮ / giao diện / ví dụ đời thường; đề xuất chờ người dùng |
| 08 | Alan Becker (6 video hướng dẫn: người que, đi, chạy, 12 nguyên lý) + Ano + nguồn web — sau khi người que calculus bị chê | `08-stick-animation.md` | nguyên nhân gốc + luật đề xuất; bàn thử `tools/lab/stick2.html` (`engine/stickmove.js`, gác `stick2-qa.mjs`) chờ người dùng xem clip |
| 09 | Đề tài xác suất: 3Blue1Brown Bayes (6.0M) + Math Antics Basic Probability (4.8M) + 5 video lớn, hkt-project series probability, nghiên cứu hiểu lầm | `09-probability.md` · [▶](https://youtu.be/HZGCoVF3YvM) [▶](https://youtu.be/KzfWUEJjG18) | nghiên cứu cho bài xác suất tiếp theo; chọn gói chờ người dùng |
| 10 | Người que đánh nhau: Alan Becker (*Animation vs. Math*, *AvA 4*, *Ricochet*) + DV Animations + Stick Nodes + Pencilmation — đo nhịp hình 6 video + clip của ta | `10-stick-fight.md` · [▶](https://youtu.be/B1J6Ou4q8vE) | mượt ≠ số khung; người dùng chọn 60 hình/giây (clip `out/_lab/fight-AB.mp4`); A, C–F áp cho người que khăn đỏ |
| 11 | lemo-opuscar (LemoLab) — plugin Claude Code, 59 phong cách phim dựng bằng code: DIRECTOR / TECHNIQUE, STYLE.md, âm thanh tổng hợp, readcheck, 70 tư thế người que | `11-lemo-opuscar.md` · [repo](https://github.com/lemomo-ai/lemo-opuscar) | 3 hướng tận dụng A/B/C chờ người dùng |
| 12 | War-Animation "Battle of Surabaya" (2:12, người que chiến tranh) + Thanh Pahm "Thế Chiến 1" (17:59, 14 tr view, cách kể) | `12-ww1-stick-and-thanh-pahm.md` · [▶](https://youtu.be/weWQ6sb9R30) [▶](https://youtu.be/iCAdtp_CNno) | đề xuất kết hợp cho kênh kể chuyện lịch sử, chờ người dùng |
| 13 | Đợt seminar tối ưu YouTube: 8 video Aprilynne Alter (title, thumbnail cho TV, intro, 0→100K), Creator Insider (Todd Beaupré — thuật toán 2026; Paddy Galloway + Amjad Hanif — A/B, Ask Studio), YouTube Help, Quan Ngo (thiết lập kênh), video Facebook (nuôi nhiều kênh — cảnh báo) | `13-youtube-optimization-seminar.md` | đã gom vào PACKAGING §3a, §8a, §10 (2026-10-24) |
| 14 | Stickman Animation System + repository audit — pose-to-pose, rig hybrid, timing/spacing, onion-skin, model sheet một nguồn, curved-limb renderer và editor → frame sequence | `STICKMAN-ANIMATION-SYSTEM.md` · `14-stick-repository-lessons.md` | mẫu weight-shift 10s tốt hơn; curved-limb renderer chưa triển khai; chưa áp production |
| 15 | Thanh Pahm "Thế Chiến 1" — mổ kỹ thuật DỰNG: 260 cảnh, người dẫn 4 vai (trình bày / cận mặt đơ / nhập vai / bình luận), mặt ảnh thật ghép thân vẽ, lính chibi trên bản đồ, ngữ pháp cắt + khoảng lặng | `15-thanh-pahm-editing.md` · [▶](https://youtu.be/iCAdtp_CNno) | công thức dựng một tập + đồ nghề cần làm, chờ người dùng |
| 16 | Oversimplified "WW1 (Part 1)" (6:23) — học DỰNG HÌNH + TIẾNG: 3 loại nền (bản đồ 48 % / vẽ phẳng 26 % / đen 20 %), 1 kiểu bản đồ, cỡ chủ thể chuẩn, cutout giữ tỉ lệ thật, không người dẫn; hiệu ứng ~6–8/phút (ta 35), cắt nhạc đúng gag; ảnh so sánh với sarajevo v3 | `16-oversimplified-ww1.md` | 14 luật hình + 6 luật tiếng, chờ người dùng |
| 16b | 3Blue1Brown — nội dung, hình ảnh, thương hiệu nhân vật (kênh Anh: λ biểu cảm, mascot dẫn góc) | `16b-3blue1brown.md` | 11-02: áp vào channels/en |
| 17 | OverSimplified "The American Revolution (Part 1)" (15:07) — DNA một tập 15 phút: cold open sketch, ~17 mạch 30–60 s mỗi mạch một "nút", gag ~17 s/lần (trận đánh kể thẳng), sketch thoại khô ↔ bản đồ cờ, mặt chân dung thật trên thân phẳng, thoại bằng chữ không nhép miệng, im trước cú chốt; âm thanh: ~3 SFX/phút theo hành động, nhạc dưới giọng 15–25 dB | `17-oversimplified-american-revolution.md` | 12 đề xuất (WRITING / CHARACTER / PIPELINE / kit / mix.py), chờ người dùng |
| 17b | So mở bài 0–60 s video khái niệm toán (STEM in Motion…) — "mở đầu khá chậm" | `17b-openings.md` | 11-02 |
| 22 | "Levels of Pirate Cannonballs" học từng khung — 127 khung, lời, cắt cảnh: ít nơi dựng kỹ, nền sáng nhiều lớp, máy rộng thấp có tiền cảnh + lướt liên tục (~6 cú cắt / 63 s), cỡ cảnh trung 45 % / cận 8 %, vật có mặt (túi thuốc súng), nhãn trên vật; carrots so mẫu; bộ skill cartoon-audio-short | `22-pirate-cannonballs-frames.md` | 11-04: carrots bị chấm ~2 điểm |


**Không tải hàng loạt từ YouTube (LESSONS §160):** ~40 lượt yt-dlp một buổi → YouTube chặn địa chỉ mạng ("not a bot"),
người dùng lo cho kênh. Mỗi buổi tối đa vài video, cách nhau; nhiều hơn → người dùng mở "Hiện bản chép lời" rồi dán, hoặc
dùng nguồn chữ (YouTube Help, blog). Không bao giờ dùng cookie tài khoản người dùng cho yt-dlp.

**Video hướng dẫn (dạy kỹ thuật):** lời có sẵn → `yt-dlp --skip-download --write-auto-subs --sub-langs "en.*"` nhanh hơn
whisper (một vài video, không hàng loạt); vẫn tải 480p và ghép bảng khung (`ffmpeg … tile`) để NHÌN tư thế — lời dạy một đằng, hình mới cho số đo (08).
