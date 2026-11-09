# 99の発見 — quy trình một bài (chỗ khác kênh tiếng Anh)

Quy trình chung: `docs/lesson/LESSON-VIDEO.md`. File này chỉ ghi chỗ KHÁC. Mã dự án: `ja/<tên>` (thư mục `projects/ja/<tên>`).

## Đường ống mascot-mv — chỗ từng giả định tiếng Anh (đã sửa ở §5)

| chỗ | trước | giờ |
|---|---|---|
| `narrate.py` | `language='en'`, Atlas, `TEMPO 1.08` cứng | giọng của KÊNH (`channels/ja/channel.json`), `build.json` ghi đè được; ja gửi phần ĐỌC của chú âm, `check_spoken` chặn trước take; khoá cache tiếng Anh y hệt cũ (151/151 câu sudoku trúng) |
| `leaked_prefix` (hkt) | tách dấu cách → mù với tiếng Nhật | thay bằng `ja.compare` trong align.py: whisper ja, so THEO KANA, bắt chữ thừa đầu câu |
| `align.py` | regex Latin → 0 từ; whisper `en` | từ = `ja.words` (unidic + gộp), CTC MMS_FA trên romaji của cách phát âm; lệch whisper word-timestamps 0.1–0.3 s |
| `estimate.py` | 174 wpm | 6.6 mora/s (trung vị 21 take; ước lệch thật ≤ 13% trên bài mẫu) |
| `publish.py` | ngắt theo dấu cách, `subtitles-en.srt` | cue ≤ 36 ký tự, ≤ 2 dòng × 18, cắt sau 、。, `subtitles-ja.srt`, chương đầu「はじめに」 |
| font | không có glyph Nhật | `assets/fonts`: Noto Sans JP [wght] (đủ ký tự toán) + Shippori Mincho Regular/Bold (明朝, THIẾU √ π θ — dùng cho tiêu đề) — OFL |
| venv phân tích | không có công cụ Nhật | fugashi + unidic-lite + pykakasi (`tools/analyze/requirements.lock.txt`) |
| `shoot.js` | lỗi cú pháp trang → chờ hết 60 s | báo ngay (`trang lỗi cú pháp`) |
| `mouth_env.py`, `talk.js`, SFX, build.py | — | không phụ thuộc ngôn ngữ, dùng nguyên |

## Quy trình một bài tiếng Nhật

```bash
tools/new-lesson.sh <tên> "<タイトル>" --channel ja   # → projects/ja/<tên>; giọng + intro + font từ channels/ja/channel.json,
                                                     # SCRIPT/YOUTUBE từ channels/ja/templates/
PY=$(python3 tools/config.py analysis_py)
$PY tools/voice/estimate.py ja/<tên> --from … --to … --out p2    # mốc tạm theo mora (cần venv: unidic)
python3 tools/voice/narrate.py ja/<tên> --to "…" --out p1        # check_spoken chặn số Hán / ký hiệu / Latin / 他の
$PY tools/voice/align.py ja/<tên> --out p1                       # mốc + whisper ja so kana → data/p1.redo.json
python3 tools/voice/narrate.py ja/<tên> --to "…" --out p1 --redo # đọc lại đúng các câu bị báo (take cũ → *.old.wav)
$PY tools/voice/align.py ja/<tên> --out p1                       # căn lại sau redo
python3 tools/voice/mouth_env.py ja/<tên> p1 p2                  # miệng nói (build.py chặn nếu lệch độ dài)
$PY -m unittest tools/voice/test_ja.py                      # luật đọc + so kana (9 test)
```
Cảnh tra mốc bằng CHỮ HIỆN: `w(i, '三角形')`, `w(i, 'x²')` — xem từ trong `data/<part>.timeline.json`. Kit của DNA
phải đưa font Nhật vào danh sách nạp (luật tất định: Promise.all mọi font trước init).
Kênh: `CHANNEL.md`; biển cuối「99の発見」+「チャンネル登録」 (`channel.json` outro).

## Rút từ bài đầu (ja/pi 18:14, 2026-10-11 — LESSONS §91–§97)

| bước | làm thế này | vì |
|---|---|---|
| SCRIPT | một reviewer đọc tiếng Nhật soát toán + 翻訳調 TRƯỚC khi đọc giọng; nguồn của người dùng giữ ở `SCRIPT.vi.md` | bản nguồn có 3 lỗi toán (§91) |
| align xong | đọc `data/<part>.redo.json`, NGHE từng take bị báo, phân loại: bộ so sai → thêm `_HEARD` (`ja.py`) + test; giọng sai → `--redo`; hỏng 2 lần → viết lại cụm | 9 câu còn báo ở lượt cuối p2 (`p2.redo.json`) đều là 角形, tên người chữ Hán, số bắt đầu bằng 0 (§92) |
| align xong | `python3 tools/voice/publish.py ja/<tên>` dựng thử SRT + chương (vài giây) | `publish` từng vỡ sau 2.5 giờ render (§93) |
| brief | kit giữ cỡ chữ Nhật ≥ 28 px, màu nghĩa qua hàm, kicker từng hồi trong kit; "≤ 3 s không có テロップ mới", "phần tử chính từ FROM + 0.3" | ~30 lỗi cỡ/màu + 7 chỗ thưa ở review (§95, §96) |
| cảnh có số | cận làm tròn theo hướng an toàn, `must` trên chuỗi hiện | 「> 3.106」 sai chặt chẽ (§94) |
| sau review | danh sách sửa ra `out/_lab/<tên>/fix/<nhóm>.md` → agent MỚI (agent Workflow không nhận tin sau khi xong) | §97 |
| brief tiếng | trần bằng SỐ mỗi cảnh: thời lượng ÷ 4 ≤ số tiếng ≤ thời lượng ÷ 2.5; テロップ phụ không tiếng; đếm `shoot.js cues --out` | 7 nhóm ra 1/1.7 s, tỉa lại thủng lặng 4–7 s (§99) |
| nguồn là video kênh khác | số thí nghiệm không tự đo → 「〜実験があります」, CONTENT tách bảng "chưa kiểm được", mô tả 構成参考 | ja/2048 (§101) |
| commit | `git diff --cached --stat` trước commit; wav nằm ở `projects/ja/<tên>/audio` (đã ignore từ 69de1ec) | dính 300 MB (§97) |
| SCRIPT v1 | từ khoá Hán ít gặp chú âm sẵn (`{光子|こうし}`); sau khi cắt độ dài, bảng lời hứa → dòng trả lời | ja/hikari (§107, §109) |
| redo đổi chữ | grep chữ cũ trong `plates/` + BRIEF, `lookups.py`, check | f5 chết khi nạp (§109) |
| vòng sửa | `SendMessage` cho agent đã viết nhóm (giữ ngữ cảnh, 6–9 phút/nhóm); kit sửa trước | ja/hikari (§110) |


Render: ja/pi (18:14) ~2.5 giờ; ja/chirality (17:00) 39 phút sau khi build.py render song song — ước theo số đo mới nhất (§84, §106).
