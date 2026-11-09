# pdoom-video — Tổng quan toàn hệ thống

> Tài liệu đúc kết từ khảo sát toàn bộ repository.
> Nhánh `main`, commit `bdbad53`, ngày 2026-09-29.
> Nguồn: `README.md`, `docs/ENGINE.md`, `docs/TREATMENT.md`, và toàn bộ mã nguồn.

---

## 1. Đây là gì

Một **music video hoàn chỉnh được render bằng code** cho bài hát *"I'm Upping My P(doom)"* (2:36, chính xác 156.651 giây) — bài hát châm biếm về AI safety / AI doom.

**Không có file video nào trong repo.** Video là *output* của code.

Nguyên lý cốt lõi chi phối toàn bộ kiến trúc:

> **Mỗi frame là một hàm thuần túy (deterministic) của thời gian bài hát `t`.**

Hệ quả:
- Preview trong trình duyệt và bản export offline cho ra **hình ảnh y hệt nhau**.
- Có thể render bất kỳ khoảnh khắc nào mà không cần chạy từ đầu.
- Có thể render song song nhiều đoạn rồi ghép lossless.
- Cho phép **adaptive motion blur** (xem mục 5) — thứ chỉ khả thi khi frame là hàm thuần túy.

**Video đã public:** https://www.youtube.com/watch?v=5EoO5413dBY
Lưu ý: bản trên YouTube là bản render **cũ hơn** — chỉ 4 sub-frame/frame nên chuyển động nhanh bị giật thành nhiều bản sao, và nén của YouTube làm nhòe film grain. Code hiện tại dùng tới 324 sub-frame/frame ở những chỗ cần.

**Bối cảnh:** toàn bộ dự án (concept, treatment, alignment lyric, renderer, từng scene, các bản render) được làm cùng Claude Opus 5.5 trong Claude Code. Repo là một showcase cho điều đó.

**Giấy phép:** code là MIT. Font giữ giấy phép riêng (OFL). **Bài hát và lời hát KHÔNG thuộc MIT** — `audio/`, `lyrics/`, `data/lyrics.json` thuộc về tác giả của chúng (xem mục 10).

---

## 2. Kiến trúc — 3 tầng tách biệt

```
┌─ analysis/  (Python + uv)  ─── chạy MỘT LẦN ───▶ data/*.json
│  Demucs tách stem
│  → CTC forced alignment (2 acoustic model)
│  → cross-check bằng Whisper
│  → phân tích beat / downbeat / onset
│
├─ data/  (đã commit, ~790KB)  ─── THE CONTRACT ───
│  lyrics.json : 46 dòng, 227 từ, timing từng-từ
│  audio.json  : tempo, beat grid, sections, envelope, onsets
│
└─ app/  (TypeScript + three.js, bun + Vite)  ─── THE RENDERER ───
   src/engine/   12 module  — lõi renderer
   src/scenes/   40 module  — 17 "plate" nội dung
   src/timeline.ts          — bản dựng (the edit)
   scripts/render.ts        — renderer offline
```

**Điểm quan trọng nhất về vận hành:**
`data/*.json` đã được commit sẵn. Renderer **chỉ cần chúng**. Không cần chạy lại Python — vốn đòi ~4GB model weights và các stem audio *không có* trong repo.

### Cấu trúc thư mục

| Đường dẫn | Nội dung |
|---|---|
| `audio/pdoom.mp3` | Bài hát (bản "Claude-Pop", 3.4MB) |
| `lyrics/lyrics.src.js` | Lời gốc theo dòng, timing xấp xỉ |
| `analysis/` | 12 file Python — pipeline sinh timing data |
| `data/` | 4 file JSON — output của analysis, input của renderer |
| `app/src/engine/` | Lõi renderer |
| `app/src/scenes/` | 40 module scene |
| `app/public/fonts/` | Archivo, IBM Plex Mono, Cormorant + font nét đơn |
| `app/public/plates/` | 14 ảnh JPEG cho montage tua ngược ở outro |
| `app/scripts/render.ts` | Renderer offline (headless Chrome → ffmpeg) |
| `docs/TREATMENT.md` | Style bible / kịch bản hình ảnh (127 dòng) |
| `docs/ENGINE.md` | Hướng dẫn engine cho người viết scene (103 dòng) |
| `out/` | Các bản render — **không** có trong repo (`.gitignore`) |

### Quy mô mã nguồn (~24,200 dòng)

| Phần | Dòng |
|---|---|
| `src/scenes/` (40 file) | ~17,000 |
| `src/engine/` (12 file) | ~1,800 |
| `analysis/` (12 file Python) | ~1,500 |
| `scripts/render.ts` | 216 |
| `src/timeline.ts` | 82 |
| `docs/` | 230 |

File scene lớn nhất: `room.ts` (1461), `open.ts` (1175), `bureau.ts` (1108), `fuse.ts` (1079), `loss.ts` (1051).

---

## 3. Tầng phân tích âm thanh (`analysis/`)

Phần công phu ít ai để ý. Nó giải bài toán: *làm sao biết chính xác mili-giây nào từng từ được hát?*

### Pipeline alignment (`align.py` → `data/lyrics.json`)

1. **`ctc_emissions.py`** — CTC log-probs theo frame từ **hai** acoustic model độc lập (MMS_FA và wav2vec2 LV60K) chạy trên vocal stem đã tách bằng Demucs `htdemucs_ft`.
2. **`whisper_run.py`** — Whisper large-v3-turbo (mlx) lấy word timestamp để đối chiếu chéo.
3. **`vocal_feats.py`** — RMS / pitch / onset của vocal stem, hop 5ms.
4. **`align.py`** — một lượt **constrained CTC Viterbi toàn cục** trên toàn bài, dùng emission đã fuse, với "garbage star token" chèn giữa các dòng; cộng anchor thủ công cho chỗ khó; rồi tinh chỉnh biên từ bằng tín hiệu và chấm điểm confidence.

Emission chính là `fused6` (trộn 2 model trên tổng mono + kênh trái + kênh phải — các đoạn chorus được thu double-track L/R). Các biến thể khác (`mms`, `lv60k`, `fused_vocL`, `fused_vocR`, `fused_lead`) dùng để tính confidence theo mức độ đồng thuận.

**Sửa tay được ghi chú tỉ mỉ.** Ví dụ thực tế trong code:
- Dòng 5 *"don't eat me alive"*: nguyên âm legato dài, CTC đặt "eat"/"alive" lệch. Đặt lại theo t-release tại 20.26s và pitch drop tại 21.35s.
- Dòng 40 (chorus cuối, *"I'm upping my P(doom)"*): giọng lead bị chìm dưới lớp backing "ah" kéo dài (122.8–125.8s), **CTC không tìm thấy gì**. Đặt tay từ spectrogram lọc median + karaoke lead stem, nhịp copy từ chorus 3, confidence hạ xuống 0.35–0.45.

### Pipeline âm nhạc (`analyze.py` → `data/audio.json`)

- **Beat grid tempo hằng số**: 132.007 BPM (chu kỳ 0.45452s), fit trên toàn bài bằng onset envelope của drum + mix. Không trôi — độ lệch phase mỗi 15s ≤ 2ms. Phase tinh chỉnh theo thời điểm kick attack. Beat đầu tiên: 0.238s.
- **Downbeat**: phase bar xác định từ snare ở beat 2 & 4; nhập nhằng nửa bar được **giải bằng hòa âm** — vòng Eb–Bb–Cm–Ab (2 bar mỗi hợp âm) đổi hợp âm đúng tại beat index ≡ 0 mod 8, và mọi chorus đều rơi chữ "DOOM" vào downbeat.
- **Envelope 100fps**: `rms`, `low` (<150Hz), `mid` (150–2000Hz), `high` (>4kHz) của bản mix, cộng `vocal`/`drums`/`bass`/`other` từ stem. Cửa sổ RMS 46ms, smoothing một cực (attack 10ms / release 90ms), chuẩn hóa theo phân vị 99 của chính nó.
- **Onsets**: kick (277 điểm, attack dải <120Hz), snare (132, attack 1.5–5kHz có đuôi noise), hat (254, >7kHz không trùng snare/kick), vocal (note onset từ log-mel flux + nhảy pitch >0.8 semitone).

### Chi tiết dễ bỏ sót: timeline offset

Mọi thời gian nằm trong **timeline của bản decode mp3 gapless**. Stem của Demucs bị dịch **−23.0 ms** (LAME encoder delay) để khớp. Hằng số này ở `common.STEM_OFFSET_SEC`.

### Nội dung `data/`

| File | Kích thước | Nội dung |
|---|---|---|
| `lyrics.json` | 32K | 46 dòng, 227 từ; 17 từ có cả timing syllable; confidence trung bình **0.836** |
| `audio.json` | 740K | duration 156.651, bpm 132.007, 345 beats, 87 downbeats, 14 sections, 8 envelope × 15,666 mẫu, 4 nhóm onset |
| `lyrics.approx.json` | 28K | Fallback timing xấp xỉ theo dòng |
| `audio.approx.json` | 8K | Fallback beat grid xấp xỉ (129.2 BPM) |

Bản `.approx` là fallback khi file chính vắng — `Lyrics.load()` thử `lyrics.json` trước, rồi tới `lyrics.approx.json`.

**14 sections:** `intro`, `verse1`, `pre1`, `chorus1`, `break1`, `verse2`, `pre2`, `chorus2`, `verse3`, `pre3`, `chorus3`, `bridge`, `chorus4`, `outro`.

Field `notes` trong `audio.json` là **một tài liệu kỹ thuật tự mô tả dài** — giải thích mọi quyết định phân tích. Đáng đọc trước khi động vào data.

---

## 4. Tầng renderer (`app/`)

### Stack
TypeScript 7 + three.js 0.186 + bun + Vite 8, cộng `opentype.js` (đọc outline font) và `playwright-core` (điều khiển Chrome headless).

### Engine (`src/engine/`)

| Module | Vai trò |
|---|---|
| `engine.ts` (375) | Timeline, load scene lazy, composite, transition, **adaptive motion blur** |
| `gl.ts` (224) | `FSPass` (fullscreen GLSL3), `Compositor`, `Layer2D` (Canvas2D→texture), `makeRT` |
| `post.ts` (218) | bloom, halation, CA, tone shoulder, film grain, vignette, fade/flash/shake/zoom |
| `type.ts` (225) | Archivo (trục width 62–125, weight 300–900) / IBM Plex Mono / Cormorant; kerning thật |
| `stroke.ts` (324) | Font nét đơn (plotter/engraving) + **optical kerning tự tính** (font này không có bảng kern) |
| `lines.ts` (148) | `LineBatch` — capsule segment trên GPU, 2D hoặc 3D, 10k–200k segment |
| `lyrics.ts` (121) | API karaoke: `wordProgress`, `lineCharProgress`, tra dòng theo nội dung |
| `audio.ts` (149) | `beatAt`, `barAt`, `timeOfBeat`, `env()`, `hit()`, `events()` |
| `hud.ts` (181) | Crop marks + đồng hồ P(doom) (`PDoom`, `formatPDoom`, `drawReadout`) |
| `glsl/common.ts` (164) | Palette const, `hash*`, `snoise`, `fbm`, `curl2`, SDF, `hatch`, `engrave`, `heat` |
| `util.ts` (173) | `clamp`, `lerp`, `ease.*`, `keys()`, `springStep`, `mulberry32`, `hash`, `frameIdx` |
| `scene.ts` (82) | API `Scene` + interface `Frame` |
| `scale.ts` (11) | Hệ số độ phân giải đọc từ `?scale=` |

### Scene API

Mỗi scene là một class kế thừa `Scene`, default-export từ `src/scenes/<tên>.ts`:

```ts
export default class MyScene extends Scene {
  async init() { /* dựng geometry, precompute outline chữ */ }
  render(f: Frame, out: THREE.WebGLRenderTarget): PostOverrides | void {
    // phải ghi đè hoàn toàn `out`
    return { bloom: 0.7 };  // override post tùy chọn
  }
}
```

`Frame` mang sẵn mọi thứ scene cần:
- `t` (thời gian bài hát), `dt`, `lt` (thời gian cục bộ), `p` (tiến độ 0..1)
- `beat`, `bar`, `beatPhase`, `barPhase`
- `a` — mẫu audio: `{rms, low, mid, high, vocal, drums, bass, other, kick, snare, hat, vonset}`
- `under`, `tin`, `tout` — cho transition
- `seeked`, `preroll` — cho scene có state

### Scenes — 17 "plate", 40 module

Nhiều plate được tách thành nhiều file phụ (`<tên>-*.ts`): ví dụ `room.ts` + `room-geo.ts` + `room-shrooms.ts`, hay `leftturn.ts` + `leftturn-map.ts` + `leftturn-gantt.ts`. Các file `*-glsl.ts` chứa shader raymarch riêng.

`_motifs.ts` giữ các motif dùng chung để chúng trông **giống hệt nhau** qua các plate: `sparkHead`, `sparkParticles`, `drawMask2D`, `GLSL_MASK`.

### Timeline (`src/timeline.ts`) — bản dựng

**Không hard-code thời gian.** Mỗi cut được tra theo **nội dung lời hát** rồi snap vào beat grid:

```ts
/** Cut ở beat cuối tại/trước từ đầu tiên của dòng khớp (không bao giờ sau từ đó). */
const cut = (q: string, nth = 0, tol = 0.02) => {
  const s = ly.get(q, nth).words[0]!.start;
  return au.timeOfBeat(Math.floor(au.beatAt(s + tol)));
};

const b = {
  loss:  cut('There was a sudden drop'),
  hook1: cut("I'm upping", 0),
  dense: cut('Post-Chinchilla', 0, 0.05), // 'Post' bắt đầu sớm 32ms trước beat của nó
  ...
};
```

Nghĩa là: **nếu data alignment được cải thiện, bản dựng tự điều chỉnh theo.** Đây là lý do `timeline.ts` chỉ có 82 dòng mà mô tả được cả bản dựng 2:36.

Module scene được nạp **lazy** qua `import.meta.glob`, nên một scene lỗi/thiếu không làm hỏng cả build.

23 entry timeline (một số scene dùng lại một module với `params` khác nhau — `prompt` ×3, `hook` ×4).

---

## 5. Điểm kỹ thuật ấn tượng nhất: Adaptive motion blur

Đây là phần có giá trị kỹ thuật cao nhất trong repo.

Mỗi frame export là **trung bình của nhiều sub-frame** trải trên shutter (`--shutter 0.2` = một phần năm thời gian frame), lấy trung bình **trước** khi post-process. Số sub-frame **được chọn tự động cho từng frame**, đi theo dãy **4 → 12 → 36 → 108 → 324**.

### Vì sao dùng dãy tam phân (`ternaryOffsets`)

Mỗi bước chèn thêm một sub-frame **hai bên** mỗi sub-frame cũ. Nhờ vậy *mọi* prefix `4·3ᴸ` đều trải đều và **đối xứng quanh thời điểm frame** — và tập mới của mỗi bước cũng vậy.

> Nếu dùng phép nhân đôi thông thường, nửa mới sẽ nằm lệch nửa bước về sau, và **bất kỳ chuyển động nào cũng bị đọc nhầm thành sai số**. Dãy tam phân khiến phép so sánh đo đúng *sai số lấy mẫu*, không phải độ dịch thời gian.

### Tiêu chí dừng

Sau mỗi bước, engine so trung bình tập sub-frame mới với tập cũ, trên từng block 2×2 logical px, **ở giá trị hiển thị** (đã qua tone shoulder và chuyển sang sRGB), lấy block tệ nhất.

- Bản sao giật cục của một cạnh đang chuyển động thì **khác nhau** giữa hai tập.
- Một vệt đã hội tụ, hay một ảnh tĩnh, thì **không khác**.
- Sai số giảm theo 1/count, nên phần còn lại ≈ **một nửa** thay đổi mà bước cuối tạo ra (e·(1/3 + 1/9 + …)).
- Dừng khi con số đó dưới `--tol` (mặc định 3 mức trên 255).

### Kết quả thực tế

| Loại frame | Sub-frame |
|---|---|
| Frame tĩnh | 12 |
| Chuyển động camera thường | 36 |
| Whip, slam, zoom nhanh | 108 hoặc 324 |

Ở tỉ lệ 1:1 tại 4K, 108 không phân biệt được với 324; còn 36 vẫn thấy vệt sọc mờ ở các cạnh nhanh nhất.

### Các chi tiết đúng đắn đi kèm

- **Pixel NaN lẻ bị loại khỏi tổng.** Một NaN lạc từ shader nào đó trong một sub-frame trên hàng trăm sẽ đầu độc trung bình rồi **nở thành một đĩa sáng** qua bloom. Shader `accum` kiểm tra `abs(c) <= 6e4` và bỏ pixel hỏng.
- **Shader tự supersample chia 4 tap qua các sub-frame** (`SS_TAP`), xoay theo `k/4` để một tap không luôn rơi vào cùng một phần shutter — cùng kết quả với 1/4 chi phí.
- **Post params đọc tại đúng một điểm**: 1/8 shutter *sau* thời điểm frame — nơi video được tinh chỉnh, và là điểm mà *mọi* tập sub-frame đều chứa.
- **Scene có state không dùng được adaptive sampling** — engine sẽ *ném lỗi* chứ không âm thầm cho ra kết quả sai.
- **`maxSamples` theo entry**: `shoggoth` bị giới hạn 108 vì G-buffer nửa độ phân giải của nó lấp lánh dọc silhouette — nhiễu mà sampler sẽ đuổi tới 324 vô ích.

---

## 6. Repository này làm được gì

### Preview trực tiếp

```sh
cd app
bun install
bunx vite
# mở http://localhost:5173  (?t=23 để bắt đầu tại giây 23)
```

| Phím | Tác dụng |
|---|---|
| `space` | play / pause |
| `←` `→` | seek ±1s (±5s với shift) |
| `,` `.` | lùi/tới một frame |
| `[` `]` | scene trước / sau |
| `l` | loop scene hiện tại |
| `h` | ẩn UI |

Preview chạy realtime trên Mac đời mới. Có Vite HMR: sửa file scene thì scene đó tự nạp lại.

### Render video

```sh
# 1080p60
bun scripts/render.ts video --samples auto --shutter 0.2 --out ../out/pdoom.mp4

# 4K60 thật (không upscale)
bun scripts/render.ts video --scale 2 --samples auto --shutter 0.2 \
    --x264 aq-mode=3:rc-lookahead=30 --out ../out/pdoom-4k.mp4
```

Output: 1920×1080 (hoặc 3840×2160) @ 60fps, x264 CRF 16, `-tune grain`, AAC 320k, `+faststart`.

### Tất cả các mode của `render.ts`

| Mode | Công dụng |
|---|---|
| `video` | Render video (có `--from`/`--to` để chia đoạn) |
| `stills` | PNG tại các thời điểm chỉ định (`--t 12.5,13.0,14.2`) |
| `sheet` | Contact sheet một khoảng thời gian; `--cuts` lấy quanh **mọi** ranh giới scene |
| `plates` | Sinh lại 14 JPEG trong `public/plates/` (montage tua ngược ở outro) |
| `perf` | Đo ms/frame — avg / p50 / p95 / max (mục tiêu <25ms) |
| `gpu` | In tên GPU mà Chrome headless đang dùng |

Cờ dùng chung: `--only a,b` (chỉ nạp vài scene — nhanh, và cách ly khỏi scene hỏng của người khác), `--scale N`, `--samples N|auto`, `--shutter`, `--url`, `--headed`.

### Cách hoạt động của renderer offline

1. Khởi động Vite dev server (hoặc dùng cái đang chạy tại `--url`).
2. Mở Chrome headless qua playwright-core tới `?export=1`.
3. Trang expose `window.__pdoom` với `still()`, `png()`, `stream()`.
4. `stream()` render từng frame, đọc pixel bằng `readPixelsAsync` (qua pixel-pack buffer + fence: nhanh gấp vài lần `readPixels` — ~15ms thay vì ~40ms ở 1080p, ~150ms ở 4K).
5. Frame RGBA thô được đẩy qua **WebSocket** vào `stdin` của ffmpeg.
6. Có **backpressure**: receiver ack từng frame, trang giữ tối đa 4 frame chưa ack → bộ nhớ có biên ngay cả ở 4K.

**Xử lý màu:** frame là sRGB. Chuỗi filter `vflip,scale=out_color_matrix=bt709,setparams=color_primaries=bt709:color_trc=bt709` — nếu không, ffmpeg chuyển bằng BT.601 trong khi player và YouTube giải mã HD không tag theo BT.709. (Đây chính là nội dung 2 commit gần nhất.)

### Sinh lại timing data

```sh
cd analysis
uv run python align.py      # → data/lyrics.json
uv run python analyze.py    # → data/audio.json
```

Cần các thứ **không có** trong repo: stem Demucs `htdemucs_ft`, lead vocal từ model mel-band-roformer karaoke, và intermediate trong `analysis/work/`. Model tải về ~4GB weights vào `analysis/.cache/`.

### Chi phí render 4K

- **Tốc độ:** 40ms (frame tĩnh) đến hơn 10s (phòng raymarch ở 108–324 sub-frame) mỗi frame.
- **Tổng:** cả bài ~2.5 giờ trên M5 Pro, chia 2 pipeline song song (`--from`/`--to`) rồi concat lossless.
- **RAM:** ~5GB cho Chrome headless + ~4GB cho ffmpeg, mỗi pipeline.
- **Bitrate:** film grain render theo từng pixel 4K nên rất tốn bit — CRF 16 ≈ 670 Mbit/s (13GB, gấp 8 lần bản 1080p); `--crf 18` ≈ 450 Mbit/s; `--crf 20` ≈ 230 Mbit/s.

---

## 7. Kiểm tra môi trường trước khi chạy

Chạy nhanh để biết máy đã đủ điều kiện chưa:

```sh
for c in bun ffmpeg google-chrome uv; do
  printf '%-16s %s\n' "$c" "$(command -v $c || echo 'THIẾU')"
done
ls app/node_modules >/dev/null 2>&1 && echo "node_modules  OK" || echo "node_modules  THIẾU → cd app && bun install"
```

| Công cụ | Bắt buộc cho | Ghi chú |
|---|---|---|
| **`bun`** | preview **và** render | Không thể thay bằng `node` — xem cảnh báo dưới |
| `google-chrome` | render offline | Được lái headless qua `playwright-core` |
| `ffmpeg` (libx264) | render video | Cần encoder `libx264` và `aac` |
| `uv` | **chỉ** khi sinh lại `data/*.json` | Renderer không cần |

Tài sản đã có sẵn trong repo (không cần tạo lại): `audio/pdoom.mp3`, 4 file `data/*.json`, 14 ảnh `app/public/plates/`. Thư mục `out/` được `.gitignore` nên vắng là bình thường.

### ⚠️ `bun` không thể thay bằng `node`

`scripts/render.ts` dùng `Bun.spawn`, `Bun.serve`, `Bun.write`, `Bun.file`, `Bun.sleep` — đều là API riêng của bun, không có tương đương trực tiếp trong node. Nếu thiếu `bun`, cả preview lẫn render đều không chạy được.

```sh
curl -fsSL https://bun.sh/install | bash
cd app && bun install
```

Ngoài ra `bun.lock` đã có sẵn trong repo nên `bun install` sẽ cài đúng phiên bản đã khóa.

### Trạng thái git

- Nhánh `main`, đồng bộ với `origin/main`.
- **11 commit** tổng cộng.
- Chỉ có `.omc/` chưa track (thư mục state của công cụ, không thuộc dự án).
- Lịch sử: `c4299a2` (commit gốc, cả video) → typography pass → adaptive motion blur → MIT license → sửa Windows symlink → xử lý màu BT.709.

---

## 8. Nội dung sáng tạo (`docs/TREATMENT.md`)

Đây **không** phải tài liệu kỹ thuật mà là **style bible** — và nó ràng buộc code rất chặt.

### Ý tưởng cốt lõi

Video được trình bày như **các "plate" (bản in minh họa) từ một chuyên khảo về ngày tận thế**. Mỗi set piece có nhạc cụ, ngôn ngữ hình ảnh và kiểu hài hước riêng.

Giá trị **P(doom)** tăng mỗi lần ca sĩ hát câu hook:
`0.02 → 0.15 → 0.42 → 0.81 → 0.99 → NaN`
— và được **dàn dựng bên trong hình ảnh**, không phải hiện ở góc màn hình.

Xuyên suốt toàn bộ video là **tia lửa (the spark)**: một điểm sáng cam kéo theo một đường mảnh. Nó lần lượt:
viết lời hát đầu tiên → vẽ đường loss → thành biểu đồ chứng khoán → uốn thành cái kẹp giấy đầu tiên → lộ ra là **ngòi nổ đang cháy** → và cuối cùng phát nổ.

### Palette — cực kỳ hạn chế

| Tên | Hex | Dùng cho |
|---|---|---|
| `ink` | `#0A0A0B` | nền đen (hơi ấm) |
| `ink2` | `#151517` | panel, đen nâng |
| `graphite` | `#5E5B57` | đường mờ, chữ phụ |
| `ash` | `#9C978F` | xám trung |
| `bone` | `#EEE9DF` | giấy, chữ chính |
| `signal` | `#FF4D12` | **cam hazard** — tia lửa, P(doom), từ đang hát |
| `ember` | `#FF8A3D` | lõi nóng |
| `blood` | `#C21D0B` | bóng sâu của cam |
| `acid` | `#D8FF3C` | **duy nhất một màu nhấn hiếm** — chỉ cho cảnh nấm, ~2 giây |

Không màu nào khác. Chỉ `signal`/`ember` được vượt ~0.85 linear (tức được bloom). Chữ `bone` phải luôn sắc nét, **không bao giờ** bloom.

Một số plate đảo sang **giấy bone, nét ink** (hành chính, blueprint, biểu đồ) — tạo nhịp sáng/tối cho bản dựng. Cam vẫn là cam ở cả hai.

### Typography

- **Archivo** (grotesk, trục width 62–125, weight 300–900) — giọng của **lời hát**. To, chặt, tự tin. Animate cả width lẫn weight để biểu cảm (giãn ở nốt ngân, nén khi bị ép).
- **IBM Plex Mono** — giọng của **máy**: token, nhãn, HUD, biểu mẫu, xác suất, chú thích.
- **Cormorant Garamond** (đặc biệt bản nghiêng) — giọng **thiêng/tiên tri**, dùng hiếm (Omega Point, Loom, "What did Ilya see?").
- **Font nét đơn** — chữ được *viết ra* bởi tia lửa hoặc bút plotter.

Craft (revision 5): mọi dòng chữ tỉ lệ đều được kern bằng bảng kern của chính font, áp theo từng glyph; font nét đơn được kern quang học vì không có bảng kern; dấu câu kiểu chữ (’ “ ” … – — × −) trừ giọng mono; không glyph ngoài 4 họ font; **không chữ viền, không chữ có quầng sáng**.

### Luật karaoke (mọi plate)

- Mọi dòng lời phải **đọc được** và **sync từng từ**: từ xuất hiện/sáng lên đúng `start`, hoàn tất trước `end`.
- Cho phép báo trước (hiện mờ sớm ~0.4s) nhưng **highlight không bao giờ chạy trước giọng hát**.
- Mỗi plate tích hợp lời hát vào hình **theo cách khác nhau**: được tia lửa viết ra, cưỡi trên đường cong, gõ thành token, đóng dấu lên biểu mẫu, dệt vào vải, che thành `[MASK]`… Chữ là **một phần của hình**, không phải phụ đề dán lên.
- Giữ trong title-safe (≥96px từ mép) và tránh góc HUD.

### Những gì bị CẤM

Tài liệu ghi rõ, rất đáng trích:

> **Không slop:** không neon tím/cyan cyberpunk, không não phát sáng, không mưa code Matrix, không lens-flare soup, không tinh vân hạt generic, không hình ảnh "AI" kiểu stock. **Không gì trông như do AI tạo ra.**

> **Không sao chép:** không copy tác phẩm có sẵn, tranh meme hay video khác. Shoggoth là **thiết kế riêng của dự án** (không phải hình meme quen thuộc); "shinigami eyes" chỉ lấy *ý tưởng* nhìn thấy nhãn — **không vẽ bất kỳ nhân vật anime/manga nào**. Tên model (ChatGPT, Sydney, Gato) chỉ xuất hiện như chữ trong lời hát: không logo, không nhái UI sản phẩm thật.

> Hài hước kiểu **một nhà khoa học mặt tỉnh**: caption deadpan, chú thích nhỏ, con dấu hành chính, thanh xác suất. Không emoji, không mặt hoạt hình (trừ đúng một chiếc mặt nạ "assistant smile" cố tình nhạt nhẽo), không linh vật.

> **Mắt**: chỉ còn mắt basilisk và mắt shoggoth. Revision 2 đã bỏ con mắt người khắc tả thực — *khách thấy rợn*. Không mắt hay mặt người tả thực ở bất cứ đâu.

### 17 plate

| id | Nội dung |
|---|---|
| `open` | "Sparks of AGI" — bút plotter vẽ unicorn TikZ trên giấy dựng hình |
| `loss` | Đường loss tụt đột ngột → bổ nhào vào phong cảnh loss 3D đường đồng mức |
| `prompt` ×3 | Trường prompt; lời cầu xin gõ thành token, kèm phân phối next-token nhỏ |
| `hook` ×4 | "I'M / UPPING / MY / P(DOOM)" — mỗi từ một cú slam toàn khung |
| `room` | FOOM nổ nhánh cấp số nhân → phòng Trung Hoa, camera lao dọc kệ sách |
| `shoggoth` | Mặt nạ bone bị quét x-ray, lộ ra shoggoth khắc nét — nhiều mắt |
| `spacetime` | Oscilloscope → hố đen sinh ra từ chữ O của NOW → xoáy → các nguyên tử xếp lại thành kẹp giấy |
| `ascent` | Mắt rắn basilisk → biểu đồ chứng khoán → mặt trăng khắc kiểu tiền giấy → đồng hồ đo 31 chữ số |
| `bureau` | Giấy bone, nét ink: Form 7-B, con dấu cam **SAFE ENOUGH**, sơ đồ MLP, von Neumann bị gạch bỏ |
| `leftturn` | Bản đồ lộ trình kỹ thuật → whip-pan rẽ trái → bản đồ "Terra incognita" hóa ra là mặt nạ; lịch Gantt thiếu CDR |
| `paperclips` | Tia lửa uốn thành kẹp giấy, nhân đôi mỗi beat thành mạng tinh thể raymarch vô tận; thư auto-reply "Killswitch guy's on PTO" |
| `fuse` | Dòng chữ hóa ra là ngòi nổ đang cháy, chữ **cháy thành tro**; biểu đồ orthogonality với dây đàn bend theo cao độ thật của ca sĩ |
| `stack` | Ngăn xếp block transformer vô tận, camera rơi một block mỗi beat; từ "disobey" **bất tuân chính luật karaoke** |
| `dense` | Áp lực typography: chữ nén lại mỗi kick cho tới khi title-safe thành khối đặc; hàng rào an toàn chính là các vùng safe-area của video, bị phá vỡ từng cái |
| `loom` | Cây continuation sinh từng token với xác suất; chữ hiện ra dưới dạng khối `[MASK]`; đệ quy Droste |
| `ilya` | Phòng raymarch nét trắng, một laptop nhìn từ sau; màn hình REDACTED; nhà hát trống, đèn rọi vào hư không |
| `outro` | Nổ → P(DOOM) 1.00 → số tiếp tục tăng mỗi beat → ∞ → **rút gọn từng bước** thành 8 → 0/0 → **NaN¹** → nút "↻ Regenerate", mọi plate tua ngược, và **dừng đúng frame đầu tiên của video** |

### Lịch sử revision ghi ngay trong văn bản

- **Rev 2**: bỏ caption FIG.; bỏ plate ultramarine "blues" (đọc thấy uncanny); bỏ mắt người tả thực; `dense`, `spacetime`, `loom`, `ilya` được viết lại.
- **Rev 3**: `leftturn` thêm đoạn "and there you are"; `dense` thêm đoạn bàn nghiêng RLHF.
- **Rev 4**: khung crop marks **chỉ còn ở hai đầu** — quanh tờ giấy mở đầu và quanh nút Regenerate cuối — để frame đầu và frame cuối khớp nhau và **video loop liền mạch**.
- **Rev 5**: pass typography toàn diện; sticker trên laptop của `ilya` giảm sáng 1/3.

---

## 9. Quy ước bắt buộc khi viết/sửa scene

Trích từ `docs/ENGINE.md` — quan trọng nếu định động vào code.

### Tính deterministic (nghiêm ngặt)

- **Cấm** `Math.random()`, `Date.now()`, `performance.now()` cho bất cứ thứ gì ảnh hưởng hình ảnh. Dùng `mulberry32(seed)`, `hash(...)`.
- Nhấp nháy/rung theo frame phải dùng **`frameIdx(t)`**, *không* dùng `Math.floor(t * 60)`.
  > `frameIdx` hằng số trong suốt shutter của frame; `floor` chuyển trạng thái đúng tại thời điểm frame và **phơi sáng kép hai trạng thái trong mỗi frame**.
- Nhiễu biến thiên theo `t` liên tục sẽ bị lấy mẫu lại ở mỗi sub-frame — nó *có* trung bình ra, nhưng chậm, và khiến sampler phải làm việc nhiều hơn. Seed bằng `frameIdx(t)` trừ khi cố ý muốn nó mượt đi.
- Emitter tia lửa có tốc độ thay đổi phải truyền tốc độ **như một hàm của thời điểm sinh**, kèm giá trị max.

### Render

- `render()` phải **ghi đè hoàn toàn** `out` (HalfFloat, linear HDR).
- Màu là **linear**; giá trị >~0.85 sẽ bloom. Dùng hằng palette (`C_INK`, `C_BONE`, `C_SIGNAL` trong GLSL; `LIN.signal` trong TS; `rgba('signal', a)` cho Canvas2D).
- Scene có state (particle, feedback buffer): đặt `stateful = true`, reset trong `reset()`, tích phân theo `f.dt`. **Nhưng khi đó không dùng được adaptive sampling** — chỉ export được với `--samples` cố định.
- Hiệu năng: mục tiêu **<25ms/frame**. Mỗi `Layer2D` tốn ~2–4ms để upload; không quá 2–3 layer mỗi scene. Precompute trong `init()`.

### Transition

Mặc định engine crossfade các entry chồng nhau. Đặt `handlesTransition = true` để tự composite `f.under` bằng `f.tin`. **Phần lớn cut nên là cut cứng trên downbeat** — đó là mặc định khi hai cửa sổ chạm nhau.

### Ranh giới quyền sửa file

- Chỉ sửa file scene của mình và file phụ `scenes/<tên>-*.ts`.
- **Không sửa `src/timeline.ts`.**
- Thay đổi engine hay `_motifs.ts`: phải hỏi lead.
- Tra dòng lời qua API `Lyrics` **theo nội dung**, không hard-code thời gian trong scene.

### Hỗ trợ 4K

Scene luôn layout theo **logical 1920×1080** (`W`, `H`, `ctx.W`, `ctx.H` không bao giờ đổi). Engine lo phần còn lại:
- `Layer2D` có canvas lớn gấp `SCALE` lần và context được pre-scale — code vẽ vẫn viết theo logical px.
- `LineBatch` giữ tọa độ và độ rộng ở logical; feather AA và sàn hairline làm việc ở physical px.
- Trong GLSL: dùng `FRAG_PX` thay `gl_FragCoord.xy` khi kết hợp với kích thước logical; dùng `pxLine`/`rampLine` thay cho idiom `fwidth` thủ công (nếu không, hairline sẽ mảnh và nhạt đi ở 4K).
- Canvas offscreen dùng làm texture giữ kích thước riêng — phải tự nhân `SCALE` nếu hiển thị lớn.

---

## 10. Credits và giấy phép

### Bài hát — KHÔNG thuộc MIT

*"I'm Upping My P(doom)"*:
- Lời: [osmarks](https://docs.osmarks.net/hypha/p%28doom%29_song_objectively_correct_interpretation), dựa trên verse mở đầu và chorus của [MusicPerson](https://www.udio.com/creators/MusicPerson), với các câu gợi ý từ EleutherAI Discord và sự hỗ trợ của Claude cho phần outro và chorus cuối.
- Bản gốc tạo bằng Udio, phát hành 11/2024 ([YouTube](https://www.youtube.com/watch?v=uEB5E67vcPA)).
- Video này dùng bản **"Claude-Pop"** làm bằng Suno, đăng bởi [deckard (@slimer48484)](https://x.com/slimer48484/status/2097752569212756134) tháng 9/2026.

### Font
Archivo, IBM Plex Mono, Cormorant Garamond (SIL Open Font License). Font nét đơn EMS và Hershey qua package `hersheytext` (OFL / public domain).

### Code
MIT License.

---

## 11. Đánh giá tổng kết

**Quy mô:** nhỏ (24k dòng, 11 commit) nhưng **mật độ rất cao**.

**Điểm mạnh nổi bật:**

1. **Tài liệu xuất sắc.** `ENGINE.md` và `TREATMENT.md` viết tốt đến mức gần như không cần đọc code để hiểu hệ thống — hiếm gặp. Field `notes` trong `audio.json` cũng vậy.
2. **Ba tầng tách bạch sạch sẽ** qua một contract rõ ràng là `data/*.json`. Đổi renderer không đụng analysis và ngược lại.
3. **Adaptive sampling là kỹ thuật thực sự chỉn chu** — không phải trang trí. Lý do chọn dãy tam phân, cách ước lượng sai số, việc loại NaN, cách chia tap supersample: từng chi tiết đều có lý do đúng và được ghi lại.
4. **Timeline suy ra từ nội dung** thay vì hard-code thời gian — 82 dòng mô tả cả bản dựng 2:36, và tự thích ứng khi data cải thiện.
5. **Ràng buộc sáng tạo được viết thành luật rõ ràng** (palette, typography, những gì bị cấm) rồi thực thi trong code qua hằng số dùng chung.
6. **Trung thực về giới hạn**: README nói thẳng bản YouTube kém hơn bản render local và giải thích vì sao.

**Điểm cần lưu ý:**

- Phụ thuộc chặt vào **bun** (không thay bằng node được) và **Chrome** (`--use-angle=metal` gợi ý pipeline được tinh chỉnh cho macOS).
- Render 4K rất tốn: ~2.5 giờ và ~9GB RAM mỗi pipeline.
- Không có test tự động — kiểm chứng bằng mắt qua `stills`/`sheet`, đúng với bản chất của loại dự án này.
- Không tái tạo được data timing nếu không có stem (không có trong repo) và ~4GB model weights.

**Tình trạng hiện tại:** repo hoàn chỉnh và sạch, chỉ thiếu **`bun`** để chạy được ngay trên máy này.
