# tools/analyze — bóc tách nhạc thành dữ liệu cho đạo diễn

**Input:** một file mp3 (Suno hoặc bất kỳ) + lyrics dạng text (tuỳ chọn).
**Output:** `projects/<tên>/data/music.json` — mọi thứ đạo diễn cần để quyết
định chữ nào hiện lúc nào, hiệu ứng nhanh hay chậm.

## Chạy

```bash
cd "$(git rev-parse --show-toplevel)"   # gốc repo mascot-mv
./tools/analyze/run.sh projects/<tên>/audio/bai.mp3 [lyrics.txt]
```

Mất 2–5 phút (Demucs tách stem là bước lâu nhất).

## Output — `music.json`

```jsonc
{
  "duration": 25.968,
  "bpm": 78.97,              // xác minh bằng grid-energy, KHÔNG tin metadata
  "bpm_confidence": 3.71,    // × baseline; < 2.0 là đáng ngờ
  "beat_period": 0.7598,
  "beats":     [0.731, 1.491, ...],   // mọi beat
  "downbeats": [0.731, 3.770, ...],   // đầu mỗi ô nhịp
  "sections":  [{"name":"intro","start":0,"end":6.9,"energy":0.31}, ...],
  "fps": 100,
  "env": {                   // đường bao 100fps, chuẩn hoá 0-1
    "rms": [...],            // tổng năng lượng — dùng cho scale/zoom
    "low": [...],            // <150Hz  — kick, dùng cho rung/nhấn
    "mid": [...],            // 150-2k  — thân nhạc
    "high": [...],           // >4k     — hat, dùng cho nhấp nháy nhanh
    "vocal": [...],          // stem giọng — dùng cho chữ
    "drums": [...], "bass": [...], "other": [...]
  },
  "onsets": {
    "kick":  [0.73, 1.49, ...],   // cú đóng, rung khung
    "snare": [1.11, 1.87, ...],   // cú cắt cảnh
    "hat":   [...],               // nhấp nháy dày
    "vocal": [...]                // mỗi nốt hát
  },
  "words": [                 // forced alignment — chữ bám cái này
    {"w":"start","start":8.843,"end":9.083,"conf":0.91,"line":2},
    ...
  ],
  "lines": [                 // gom từ thành câu
    {"text":"start with a question","start":8.843,"end":9.763,"words":[8,9,10,11]}
  ],
  "vocal_gaps": [            // khoảng KHÔNG có giọng — chỗ cho hình thở
    {"start":1.30,"end":4.28,"dur":2.98}
  ]
}
```

## Vì sao cần từng trường

| trường | đạo diễn dùng để |
|---|---|
| `words` | chữ hiện đúng lúc từ đó được hát — **không bao giờ gõ số tay** |
| `beats` / `downbeats` | nền, lưới, hạt bám nhịp; cắt cảnh trên downbeat |
| `onsets.kick` | rung khung, cú đóng dấu, vật chạm đất |
| `onsets.snare` | cắt cảnh, lật, whip-pan |
| `env.vocal` | độ đậm của chữ theo cường độ giọng |
| `env.low` | scale/zoom theo bass |
| `sections` | mỗi section một cảnh; đổi bảng màu/bố cục |
| `vocal_gaps` | chỗ đặt hình thuần tuý, không chữ |

## Cảnh báo

- **Không tin BPM trong metadata.** Bài 99% khai 118, thật là 78.97.
  `bpm_confidence` < 2.0 → nghi ngờ, kiểm tay.
- **Không tin lyrics trong metadata.** Bài 99% thiếu hẳn một câu và thừa một câu.
  Script luôn nghe lại bằng whisper; lyrics bạn đưa chỉ dùng để *đối chiếu*.
- **Giọng rap thường KHÔNG rơi vào beat.** Bài 99% chỉ 22%. Nên chữ bám `words`,
  nền bám `beats` — hai hệ tách biệt.

## Pipeline dữ liệu của một bài — thứ tự đã dùng cho exp-log

Mỗi bước đọc/ghi trong `projects/<p>/`. Kết quả (`data/*.json`) được commit; engine chỉ đọc file, nên render
vẫn tất định. Các bước 2–6 đã kiểm: chạy lại trên dữ liệu exp-log cho ra đúng từng byte file đã commit.

| # | lệnh | ra | ghi chú |
|---|---|---|---|
| 1 | `./tools/analyze/run.sh projects/<p>/audio/song.mp3 lyrics.txt` | `data/music.json`, words.json | BPM, beat, section, envelope; Demucs + whisper + CTC |
| 2 | `python3 tools/analyze/lyrics_map.py projects/<p> <words.json>` | `data/timeline.raw.json` | ghép LỜI GỐC (`lyrics.raw.txt`, có `[Section]`) với mốc nghe được |
| 3 | `<venv>/python tools/analyze/ctc_check.py projects/<p> audio/stems/lead-vocals.wav` | `data/timeline.ctc.json` | nguồn thứ hai để phân xử câu lệch (venv: xem `run.sh`) |
| 4 | sửa tay `data/overrides.json`, rồi `python3 tools/analyze/overrides.py projects/<p>` | `data/timeline.json`, `timeline.txt` | đọc bản RAW → chạy lại tuỳ ý; dời câu (`starts`), lời ghi sai số lần hát (`repeat`) — ghi LÝ DO từng dòng |
| 5 | `python3 tools/analyze/stems.py projects/<p>` | `data/stems.json` | cần stem Suno trong `audio/stems/` — nguồn mốc NHẠC CỤ |
| 6 | `python3 tools/analyze/vox_env.py projects/<p>` | `data/vox.json` | đường bao giọng cho hát nhép |

Engine đọc lời qua `engine/timeline.js`: `tl.at('câu', n)`, `tl.line('câu', n).words` — không bao giờ gõ tay mốc lời
(mốc nhạc cụ từ `stems.json` thì khai báo hằng số kèm nguồn).
