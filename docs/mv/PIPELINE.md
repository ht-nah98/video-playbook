# PIPELINE — làm một MV từ đầu

Thứ tự này KHÔNG được đảo. Mỗi bước sai làm hỏng mọi bước sau.

---

## Bước 0 — Nghe bài hát, lấy lời THẬT

**Đừng tin metadata mp3.** Ở bài 99%, tag `lyrics-eng` thiếu hẳn câu
"uh loading loading yeah" và ghi "From scratch" hai lần trong khi bài chỉ hát
một. Nếu dùng lời sai, bạn sẽ dựng cảnh cho những câu **không tồn tại**.

```bash
ffprobe -v error -print_format json -show_format bai.mp3   # tham khảo, KHÔNG tin
```

---

## Bước 1 — Căn lời bằng forced alignment (KHÔNG ước lượng năng lượng)

Công cụ có sẵn ở `studio3d/analysis/` (venv do `uv` tạo — `tools/config.py`, dựng lại theo `tools/analyze/requirements.lock.txt`;
**không có pip** — dùng `uv pip install --python ./.venv/bin/python`).

```bash
cd studio3d/analysis
ffmpeg -i bai.mp3 -ar 44100 -ac 2 song.wav
./.venv/bin/python -m demucs --two-stems=vocals -n htdemucs -o stems song.wav
# → whisper large-v3 trên stems/htdemucs/song/vocals.wav (word_timestamps=True)
#   nghe ra LỜI THẬT + mốc từng từ
# → CTC forced alignment MMS_FA(with_star=True), cột star = max(E) - margin
#   chèn star giữa MỌI từ để hấp thụ khoảng lặng
# → hợp nhất: CTC nơi conf ≥ 0.45 (biên từ sắc hơn), whisper nơi còn lại
```

Ở repo này các bước trên đã đóng gói: `tools/analyze/run.sh` → `lyrics_map.py` (ghép LỜI GỐC với mốc nghe được)
→ `ctc_check.py` (nguồn thứ hai) → phân xử `overrides.json` → `overrides.py`. Kết quả → `projects/<tên>/data/timeline.json`,
engine đọc qua `engine/timeline.js` (`tl.at('câu')`). Bảng đầy đủ: `tools/analyze/README.md` § Pipeline dữ liệu.

**Vì sao không đo năng lượng:** đã thử hai lần, cả hai đều sai.

| cách | lệch trung bình |
|---|---|
| khoảng lặng RMS @0.5s | 324 ms (tệ nhất 1.47s) |
| tỉ lệ dải giọng 300–3400Hz trên bản trộn | **1.68 s** (tệ nhất 4.22s) |
| **forced alignment** | **0 ms** |

Cách thứ hai tệ hơn cách thứ nhất vì đo trên bản TRỘN — trống và tiếng đệm bị
tính là giọng hát.

**Bẫy kỹ thuật:**
- `torchaudio.load` cần torchcodec → đọc wav bằng module `wave` chuẩn
- tensor từ `inference_mode` không sửa tại chỗ → `.clone()` trước
- `AF.forced_align` trả về **nhãn token** mỗi khung, KHÔNG phải chỉ số trong
  chuỗi đích → phải tự lần con trỏ khi nhãn đổi
- thiếu star token → mọi từ bị dồn về đầu bài

---

## Bước 2 — Xác minh BPM (đừng tin metadata)

```python
# grid-energy scoring: đặt lưới beat lên onset envelope, đo năng lượng rơi trúng
def score(bpm):
    per = 60/bpm*fps; best = 0
    for off in np.arange(0, per, per/24):
        idx = np.arange(off, len(flux)-1, per).astype(int)
        best = max(best, flux[idx].sum()/len(idx))
    return best / flux.mean()
```

Bài 99%: **78.97 BPM đạt 3.71×** baseline, trong khi metadata khai 118 BPM chỉ
đạt 1.76×. Một bản dựng khác dùng 117.45 BPM (1.27×) — hiệu ứng trôi dần khỏi
beat vì 117.45 không phải bội/ước của nhịp thật.

---

## Bước 3 — Viết TREATMENT (kịch bản) TRƯỚC KHI CODE

Mẫu: `studio3d/docs/TREATMENT.md` (23.8K, bản mực thước).
Bản đã dùng thật cho cả một bài: `projects/mv/exp-log/TREATMENT.md` (có bản đồ năng lượng từ stem và ghi chú
"Thực hiện" ở mỗi cảnh). Khung trống: `templates/mv/TREATMENT.md`.

Bắt buộc có:
1. **The idea in one paragraph** — một mô-típ trung tâm xuyên suốt
2. **Tone** + danh sách CẤM của bài (DNA riêng của MV — `docs/DNA.md`)
3. **Bảng phân bổ từng từ** — mỗi cụm từ ↔ một sự kiện hình học cụ thể
4. **Plates** — mỗi cảnh một Ý TƯỞNG THỊ GIÁC GỌI TÊN ĐƯỢC
5. **Mascot integration** — luật bằng SỐ

Mỗi cảnh phải trả lời được: *"tắt tiếng đi, khán giả có hiểu cảnh này nói gì?"*

**Không viết một dòng render nào trước khi có kịch bản được duyệt.**

---

## Bước 4 — Dựng project

```bash
tools/new-mv.sh <tên> "<Tên bài>" <thời lượng> <bpm> <downbeat>   # templates/mv → projects/<tên>, chạy được ngay
```

Hợp đồng cảnh (`t0`, `init`, `render`, `backdrop`/`backdropAt`, `camera`), bản đồ module và các luật bộ đệm:
**`docs/ENGINE.md`**. Thêm cảnh: `python3 tools/qa/addscene.py <tên> P02 p02-x.js "tl.at('câu đầu cảnh')"`.

**Cảnh KHÔNG được tô nền toàn khung** khi dùng nền chung — tô đè sẽ xoá sạch. Cần nền riêng thì `backdrop = false`.

---

## Bước 5 — Kiểm tra trước khi render

```bash
tools/qa/stills.sh <tên> 1,5,9,13 out/_lab/x && python3 tools/qa/sheet.py out/_lab/x out/_lab/x.jpg   # NHÌN
python3 tools/qa/seams.py <tên> <mốc vào cảnh 1>,<mốc 2>,…     # cặp khung ở mỗi ranh giới cảnh
tools/qa/determinism.sh <tên> 5,9,13                          # xuôi = ngược
```

**NHÌN từng ảnh.** Kiểm tra tự động chỉ xác nhận mốc đúng, không xác nhận cảnh có nội dung — một cảnh render ra
màn hình trống vẫn "hợp lệ" với mọi assertion.

---

## Bước 6 — Render (theo đoạn) và ghép

```bash
tools/render.sh part  <tên> 0 a      # → out/<tên>/parts/0-a.mp4 (+ .log)
tools/render.sh part  <tên> a b      # → out/<tên>/parts/a-b.mp4
tools/render.sh final <tên>          # stitch.mjs các parts theo thứ tự + AAC → out/<tên>/<tên>.mp4
```
Bên dưới là `shoot.js video --from --to` và `tools/stitch.mjs` (đọc đầu file để ghép tay khi cần).
Mỗi khung là hàm thuần của t và được đánh số round(t·fps), nên đoạn render riêng ghép liền từng bit — chỉ khi
code của phần cũ KHÔNG đổi: `tools/qa/golden.sh check <tên>` trước khi ghép. Render ~5.7 khung/giây.

**Theo dõi bằng ĐỘ TƯƠI CỦA FILE, không bằng `eta`:**
```bash
age=$(( $(date +%s) - $(stat -c %Y out/<tên>/parts/<a>-<b>.log) ))
[ "$age" -gt 90 ] && echo "TREO"
```
`eta` do ffmpeg tính từ tốc độ trung bình — nó không biết tiến trình đã đứng.

**Nếu treo:** dọn Chrome headless sót lại từ phiên trước.
```bash
for pid in $(pgrep -x chrome); do
  tr '\0' ' ' < /proc/$pid/cmdline 2>/dev/null | grep -q remote-debugging-port && kill -9 $pid
done
```

---

## Bước 7 — Đo và đối chiếu

```bash
node tools/review.mjs out/<tên>/<tên>.mp4          # 8 chỉ số, đo ở 640×360 (LESSONS §12)
ffmpeg -i out/<tên>/<tên>.mp4 -vf fps=6,scale=192:-1,tile=20x26 -frames:v 1 out/_lab/sheet.jpg
tools/qa/golden.sh save <tên>                      # ảnh chuẩn cả bài cho mọi refactor sau
tools/qa/clean.sh <tên>                            # dọn: chỉ còn out/<tên>/<tên>.mp4
```
Ngưỡng in kèm trong `review.mjs`; sàn chấp nhận do DNA của MV quyết. Chỉ số không đo được ý nghĩa — xem tờ 6fps.
