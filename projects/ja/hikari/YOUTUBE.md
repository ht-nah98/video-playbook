# ja/hikari — gói đăng YouTube (kênh 99の発見, tiếng Nhật)

Như `YOUTUBE.md` (đếm ký tự bằng code — LESSONS §42), khác ở:
- **Tiêu đề / mô tả / tags / problems viết tiếng Nhật.** YouTube đếm ký tự, không đếm byte: tiêu đề ≤ 100 (hiện đủ ~30–35
  ký tự Nhật trên di động — móc chính đặt ĐẦU), mô tả ≤ 5000, tags ≤ 500.
- Mô tả: hai câu móc + lời hứa · 目次 (chép `chapters.txt`) · この動画で · lời mời kênh「チャンネル登録して、新しい発見に出会って
  ください！」· 3 hashtag (#数学 #科学 #数学の面白さ + một tag riêng bài) · credit ảnh · ghi chú giọng tổng hợp
  (「ナレーションは合成音声です」).
- Phụ đề: `out/<p>/youtube/subtitles-ja.srt`.
- Cài đặt: 日本語 · Education · "Altered or synthetic content" = Yes.

## Thumbnail
Người dùng làm; lưu `projects/ja/hikari/thumbnail.png` + `out/ja/hikari/youtube/thumbnail.jpg` (≤ 2 MB). Chưa có.
Playlist: 「なぜ？を解いたノーベル賞」. Cài đặt: 日本語 · Education · "Altered or synthetic content" = Yes.
Phụ đề: `out/ja/hikari/youtube/subtitles-ja.srt`.
## タイトル → `title.txt`
1. なぜ世界は見えるのか？ アインシュタインのノーベル賞でわかる、光の正体と虹・空の青・色の秘密 (46 ký tự)
2. 光の正体は波か粒か？ 2000年の論争の答えと、「色は頭の中にある」理由 (36 ký tự)
3. 空はなぜ青い？ 虹は本当に七色？ 光の正体から「色が見える」しくみまで (35 ký tự)

Khuyên chọn **1** (có ノーベル): playlist là 「なぜ？を解いたノーベル賞」 nên title cùng chủ đề; "アインシュタインのノーベル賞" là
cụm người xem Nhật quen, và móc có thật trong video (4:49, giải 1921 = 光電効果, không phải tương đối luận). Mở bằng
câu hỏi なぜ… (móc chính ở ~30 ký tự đầu trên di động). Không viết "ノーベル賞が解いた" cho cả bài vì cầu vồng/trời xanh/
màu sắc không phải thành tựu Nobel. 2 = móc ⟨波か粒か⟩ + câu chốt cuối bài, không Nobel; 3 = móc tìm kiếm (空はなぜ青い,
虹は七色) không Nobel, hợp nếu thumbnail đã mang Einstein. Giữ tên của thumbnail bổ sung, không lặp.
## 説明 → `description.txt`
Giữ khuôn chirality/pi: 2 câu móc + 4 câu hỏi · 目次 (chép nguyên `chapters.txt` từ dry-run; build sẽ tạo lại — nếu mốc đổi, chép lại) · 補足 (số liệu từ CONTENT: Nobel 1921 tin 11/1922 trên đường sang Nhật, Planck 1900, LED xanh 2014, Millikan 1916, Mặt Trời 1500 vạn/5500 độ, 380–780 nm) · credit ảnh (mọi CC BY/BY-SA đều ghi tác giả; INDEX § cuối) + 2 ảnh tưởng tượng (Ibn al-Haytham 1647, Newton–Grusche) · nhạc · giọng tổng hợp · lời mời kênh · 3 hashtag. Mốc 1:35 là chương đầu sau intro.

Số đã đối chiếu CONTENT: 1921 (N1), 1922/11, 1900 (Planck [V]), 2014 + 赤崎・天野・中村 (N5), 1916 (Millikan [S] — nói mềm), 約1500万度/約5500度 (§Soát #18), 380–780 nm (#23).
## タグ → `tags.txt`
212 ký tự (≤ 500).
## Problems → `problems.txt`
401 ký tự (≤ 800). Mốc = đầu chương có lời giải thích (đã gồm intro, như chirality); 18 mục chọn từ 25 chương. Nếu build đổi mốc → cập nhật.


Độ dài đo bằng code: title 46/36/35 · description 1309 · tags 212 · problems 401.

## Title chốt (người dùng, 2026-10-14)

あなたが見ている「色」は、実は脳が作り出しているものです！！光の正体とは何でしょうか？

## Title + thumbnail chốt lại (người dùng, 2026-10-14, sau docs/study/02–03)

光の本質とは何でしょうか？リンゴが「赤く」見える本当の理由とは。

Thumbnail: 「このリンゴ、赤くない。」 (`thumbnail/v1-ringo-akakunai.png`, prompt `thumbnail/prompt-v1-ringo-akakunai.md`); bản cũ 「色は脳が作る？」 → `thumbnail/v0-iro-wa-nou.png`. Thumbnail nêu nghịch lý, title hứa giải thích — không lặp nhau.
