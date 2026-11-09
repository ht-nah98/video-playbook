# Tiếng hiệu ứng (SFX) cho video bài học

> Người dùng (2026-10-06): học **âm thanh hiệu ứng** (không phải hình) từ video mẫu của anh mình — *"PEMDAS Là Gì?"*,
> 9:54, chữ trắng trên nền đen, motion typography. Duyệt bộ tiếng: *"OKK ổn rồi đó"*.

## Mức hiện hành (một bảng duy nhất — đổi ở đây khi người dùng đổi)

| khoá `build.json` | giá trị | từ khi | ghi chú |
|---|---|---|---|
| `lufs` (giọng) | −16 | math-30k | intro hạ `intro_gain_db −1.5` cho khớp |
| `sfx_db` | **−6** | neg-times-neg, 2026-10-07/08 (tai người dùng) | mẫu `templates/lesson/build.json` |
| `music.lufs` | **−38** | neg-times-neg, 2026-10-08 (tai người dùng: "nhạc hơi to") | `{"file": "assets/music.m4a", "lufs": -38, "loop": [a, b], "xfade": 2.0}` |
| `library.json` `type.db` | 0 | neg-times-neg 2026-10-07 ("tiếng gõ bé quá") | các loại khác: đo theo §65 |

Nhạc: chọn lại bản Suno CŨ hợp DNA (người dùng 2026-10-08: "dùng các bài nhạc cũ, chúng ta có đủ nhiều rồi") — khác bản
của bài liền trước, không trùng âm sắc tiếng hiệu ứng của bài; `loop` đo lại theo bản đã chọn (mục "Nhạc nền"). Đổi mức
chỉ cần `build.py <p> --keep` (~3 phút, không render hình).

**Lịch sử mức** (bài cũ giữ mức của nó, không render lại): `sfx_db` −11 (hiệu chỉnh theo mẫu, ~17.8 LU dưới giọng) → −9
(pemdas, người dùng xin +2 dB, 2026-10-06) → −6; nhạc −35 (theo mẫu, pemdas → zero-div, fifty-percent, pi) → −38.

## Bộ tiếng theo CHẤT LIỆU của bài (từ 2026-10-23 — học lemo-opuscar, docs/study/11; người dùng: "tiếng hiệu ứng theo chất liệu hay nhé", nhạc vẫn của kênh)

`python3 tools/sfx/material.py <p> --material paper` → `projects/<p>/assets/sfx/<kind>/NN.wav` + `library.json`: tổng hợp
bằng code (ma sát bút = nhiễu dải × hạt bám-trượt, gõ = xung + cộng hưởng, lật trang = nhấc + vút + đập), nhiều biến thể
(`pen` 12 — probability có 55 cú bút mà thư viện chung chỉ 3 biến thể → nghe lặp như súng máy), tất định theo tên bài.
Mỗi biến thể khớp RMS trung bình của loại đó trong thư viện chung → mức `db` đã chỉnh theo tai giữ nguyên nghĩa. Đè thư
viện chung ĐÚNG các loại có trong bộ (`mix.py --lib`, `build.py` tự dùng khi có thư mục); loại mang tính nhạc (correct,
error, question, shimmer, impact, beep) vẫn lấy thư viện chung. Chất liệu hiện có: `paper` (vở nháp: pen, tick, pop,
whoosh, page, tear, card, dice, wood). Chất liệu mới (gỗ, kính, kim loại, phấn…) → thêm vào `MATERIALS`, đo độ sáng
(trọng tâm phổ) so với thư viện chung trước khi đưa người dùng nghe — bản đầu `tear` 12 kHz, `wood` 8 kHz là rít tai.
Duyệt bằng tai: file A/B cũ ↔ mới `out/_lab/sfx/<p>-<material>-AB.wav`. **Người dùng nghe A/B probability 2026-10-23: "mới
hay hơn, dùng"** → mỗi bài mới sinh bộ chất liệu của DNA (chất liệu chưa có → thêm vào `MATERIALS`, đo độ sáng, A/B).

## Bài học rút từ video mẫu (đo, không đoán)

Cách bóc: Demucs `--two-stems vocals` tách giọng → Demucs 4 stem trên phần còn lại: **SFX rơi vào stem `drums`**
(lọc > 300 Hz bỏ tiếng trầm ù), nhạc nền rơi vào `other`. Dò onset → gom cụm (MFCC) → chụp hình −0.4/+0.1/+0.6 s quanh
mỗi tiếng + phổ. Công cụ ở `studio3d/analysis/.venv` (`tools/config.py`).

| đo được | giá trị |
|---|---|
| giọng | −15.5 LUFS |
| SFX | ~−32 LUFS → **thấp hơn giọng ~17 LU**: nghe rõ, không bao giờ tranh lời |
| nhạc nền | ambient pad + bass, không trống, thưa nốt, ~−35 LUFS, chạy suốt |
| mật độ | ~130 tiếng / 10 phút ≈ **1 tiếng / 4–5 s** (gõ phím tính là một chùm) |

**Luật của mẫu:** MỖI chuyển động có nghĩa = MỘT tiếng, và CÙNG loại chuyển động luôn CÙNG loại tiếng:

| hình | tiếng (`kind`) |
|---|---|
| chữ gõ ra / xoá từng ký tự | `type` — mỗi ký tự một phím; xoá nhanh hơn |
| danh sách bung, chữ bay, chuyển cảnh | `whoosh` (0.4–0.6 s) |
| cả khung tan ra / mở cảnh mới, đổi chất liệu | `whoosh-long` (~1 s) |
| chữ nhô lên, tô sáng, nhấn | `tick` |
| vật thể xuất hiện | `pop` |
| biểu thức gộp lại (3×3 → 9), đổi dạng (÷ → phân số) | `snap` |
| chữ vỡ ra rồi ghép lại, khoảnh khắc "à ra thế" | `shimmer` |
| khoảnh khắc lớn, chốt ý | `impact` (hiếm) |
| sai, mâu thuẫn, bút đỏ gạch | `error` (hiếm) |
| đúng, dấu ✓, đáp án được xác nhận (thêm ở pemdas) | `correct` (hiếm — đối của `error`) |
| dấu "?", câu hỏi treo, biểu thức mơ hồ (thêm ở pemdas) | `question` (hiếm) |
| máy tính bỏ túi / ô bảng tính hiện kết quả (thêm ở pemdas) | `beep` |
| bút viết ra một cụm (thêm ở zero-div, DNA giấy) | `pen` — MỘT tiếng mỗi cụm, không mỗi ký tự |
| trang trượt / lật (thêm ở zero-div) | `page` — thay `whoosh` chuyển cảnh: `TRANSITION = 'page'` |
| giấy rách (thêm ở zero-div) | `tear` (một lần cả video) |
| đồng xu búng / rơi (thêm ở fifty-percent) | `coin` |
| đặt phỉnh cược, ván cược (thêm ở fifty-percent) | `chip` |
| bảng số lật split-flap lật ô (thêm ở intuition, DNA gameshow) | `flap` — MỘT tiếng mỗi cụm lật |
| còi SAI kiểu game show (thêm ở intuition) | `buzzer` (hiếm — thay `error` trong DNA gameshow) |
| cửa sân khấu mở (thêm ở intuition) | `door` |
| dê lộ ra sau cửa (thêm ở intuition) | `goat` (≤ 2 lần cả video — điểm nhấn hài) |
| rút / đặt / lật lá bài (thêm ở intuition) | `card` |
| quân 駒 trượt / đặt xuống bàn gỗ — 駒音「パチッ」(thêm ở ja/2048) | `koma` — một tiếng mỗi lượt vuốt / mỗi quân đặt; `db` −3 (đo cửa sổ 100 ms ngang `wood`/`pop`) |
| xúc xắc lăn (thêm ở solid-geometry; ja/2048 dùng cho cây may rủi tách nhánh) | `dice` (Kenney CC0, 0.36–0.57 s) |
| gõ thuỷ tinh: ống nghiệm, phân tử / tinh thể hiện trên gương (thêm ở ja/chirality) | `glass` (Kenney CC0, ~0.2 s) |
| gương / kính rạn — hai ảnh KHÔNG chồng khít (thêm ở ja/chirality) | `crack` (Kenney CC0; hiếm, ≤ 1 lần mỗi cảnh) |
| ván 雨戸 trượt trong rãnh gỗ — chuyển cảnh khép/mở (thêm ở ja/hikari) | `amado` (OpenGameArt CC0, ngăn kéo gỗ 0.7–0.9 s; `db` −7 đo cửa sổ 100 ms ngang `error`/`pop`) |
| tia lửa điện nhỏ — electron bật khỏi kim loại (thêm ở ja/hikari) | `zap` (OpenGameArt CC0, 0.22 s; `db` +1) |
| núm máy gashapon vặn, chuỗi click ratchet 0.9–1.0 s (thêm ở ja/gacha) | `gacha` (OpenGameArt CC0, tời xích cắt 1.2 s; `db` −3)|
| guồng slot quay lách cách / dừng cái "cộp" (thêm ở ja/gacha) | `reel` (OpenGameArt CC0, 0.65–0.75 s; `db` −4)|

Không có tiếng: chuyển động phụ (nhịp thở, trôi nền), mọi thứ lặp liên tục. Im lặng là một phần nhịp.

## Thư viện — `assets/sfx/`

`<kind>/NN.wav` (48 kHz stereo 16-bit, cắt lặng đầu/cuối, đỉnh −6 dBFS) + `library.json` (`db` bù cảm nhận theo loại,
`gap` giây tối thiểu giữa hai tiếng cùng loại). Nguồn và giấy phép: `SOURCES.md` — **chỉ CC0** (Kenney, OpenGameArt)
hoặc tự tạo (`synth.py`: whoosh = nhiễu lọc dải quét tần; shimmer = sin cao tắt dần, rải ngẫu nhiên; `synth_ja.py`: hyoshigi, soroban, hanko, suzu, taiko cho 99の発見, koma cho ja/2048 — tổng hợp theo mode). CC-BY/CC-BY-SA
phải ghi nguồn trong mô tả → tránh.

Thêm tiếng: tải (CC0) → `tools/sfx/add.sh <kind> <file>…` (loại mới: thêm vào `KINDS` của `engine/sfx.js` + `library.json`, chỉnh `db` bằng đo cửa sổ 100 ms so với `error`/`pop`) (chuẩn hoá + đánh số) → ghi `SOURCES.md` → **dựng file nghe thử cho người dùng
duyệt** (tôi chỉ "nhìn" được phổ, không nghe được — tai người dùng là bước duyệt).

## Dùng trong video

```js
import { ..., typeCues } from '../kit.js';
export default class Ops {
  // TRANSITION = 'snap';          // đổi tiếng chuyển cảnh mặc định; = null để tắt
  sfx() {                          // giờ TIMELINE (như T); trang tự cộng LEAD
    const T = this.T;
    return [...typeCues('12 ÷ 0', T.twelve, T.twelve + 0.5),   // khớp kit.typed(g, s, …, prog(t, a, b))
            { t: T.zero, kind: 'pop' }, { t: T.wrong, kind: 'error', db: -2 }];
  }
}
```

- Chuyển cảnh **tự có tiếng** (`engine/sfx.js collectCues`): cùng ERA (trang trượt) → `whoosh`, khác ERA (loang) →
  `whoosh-long`. Cảnh chỉ khai báo tiếng của chuyển động BÊN TRONG nó.
- `build.json` có `"sfx_db"` (mức: bảng "Mức hiện hành") → `build.py` gom cue (`shoot.js cues`) → `tools/sfx/mix.py` → trộn dưới giọng, tiếng
  ra stereo (ffmpeg đổi mono→stereo tự hạ −3 dB/kênh → LUFS giữ nguyên, đừng bù). Không có khoá → chỉ giọng (math-30k dựng lại y cũ).
- Hiệu chỉnh gốc: phát lại đúng 245 mốc của video mẫu → `-11` ≈ −33.8 LUFS (thấp hơn giọng 17.8 LU, mẫu ~17); các
  bước sau đó: bảng "Lịch sử mức". Đổi mức cả video bằng `sfx_db`; đổi một tiếng bằng `db` của cue.
- Tất định: biến thể chọn theo seed cố định, không lặp liền nhau, lệch ±1 dB. Sửa `sfx()` không cần render lại hình —
  `build.py` gom cue mỗi lần chạy (xoá `out/<p>/parts/*.mix.wav` không cần: luôn ghi đè).
- Soát: `node engine/render/shoot.js cues --page projects/<p>/p2.html --out /tmp/c.json` → đếm mật độ (~1 tiếng / 4–5 s
  ngoài các chùm gõ); dày hơn nhiều là ồn.

## Bài mới cần tiếng chưa có (người dùng: "chủ động tải; không tìm được thì hỏi")

Ở Pha 0, tôi tự tìm và tải — không đợi người dùng. Nguồn CC0 tải được bằng lệnh (đã thử 2026-10-06):
- Kenney: trang `https://kenney.nl/assets/<gói>` có link `.zip` trực tiếp (grep `\.zip`); gói âm thanh: interface-sounds,
  impact-sounds, ui-audio, digital-audio, casino-audio, rpg-audio, sci-fi-sounds, music-jingles.
- OpenGameArt: `https://opengameart.org/art-search-advanced?keys=<từ>&field_art_type_tid[]=13&field_art_license_tid[]=4`
  (13 = âm thanh, 4 = CC0); trang từng mục có `license-name'>CC0` và link file. LUÔN kiểm giấy phép trên trang mục.
- Tự tạo (`synth.py`) cho tiếng trừu tượng (whoosh, shimmer, riser).
Không có bản CC0 hợp, hoặc là gu (nhạc nền) → hỏi người dùng, nêu tên tiếng + mô tả + gợi ý từ khoá Pixabay.

## Nhạc nền (từ pemdas, 2026-10-06)

**Luật hiện hành:** chọn lại một bản trong thư viện `projects/_shared/music/` (`LIBRARY.md`, gom 2026-11-03) hợp DNA (bảng "Mức hiện hành"); KHÔNG chép file vào bài. Đã
dùng: "Steady Groove" (pemdas, intuition), "Mathematical Warmth" (zero-div, zero-power), "Nocturne in Warm Felt"
(fifty-percent), "Daylight Study" (pi), "Late-Evening Study" (neg-times-neg). Prompt Suno mới chỉ khi người dùng muốn
bản mới — mẫu bên dưới; prompt cần: Instrumental, nhịp đều, KHÔNG cao trào, không vocal, nằm dưới giọng.

Bật nhạc bằng khoá `music` trong `build.json`:
```json
"music": {"file": "../../_shared/music/steady-groove.m4a", "lufs": -38, "loop": [9.0, 150.0], "xfade": 2.0}
```

`build.py` bước 2c xử lý như sau:
- Lặp đoạn `[a, b]`: chọn `a` sau phần mở nhỏ của bản nhạc, `b` ≤ độ dài. Mỗi chỗ nối được trộn chéo `xfade` giây,
  vì bản Suno cắt ngang ở cuối.
- Chuẩn hoá cả dải về `lufs` (hiện −38; mẫu gốc −35 ≈ thấp hơn giọng −16 khoảng 19 LU), không át lời và tiếng hiệu ứng.
- Một dải chạy liền qua p1 → p2 và NGHỈ trong lúc intro chạy.
- Mỗi phần vào dần 2.5 s và ra dần 2.0 s, khớp màn đen ở hai đầu intro.
- Đổi nhạc hoặc mức không render lại hình: `build.json` không nằm trong nguồn của đoạn hình (LESSONS §46).

Đo: tách `parts/<tl>.music.wav` ra đo ebur128 (pemdas: p1 −34.8, p2 −35.1).

Mẫu prompt Suno đã dùng ("Steady Groove"):
- Style: warm lo-fi chillhop, Rhodes, muted acoustic guitar, upright bass, brushed shaker, 85 BPM, consistent low
  energy, no build-ups, loopable, made to sit under a voiceover.
- Exclude: vocals, heavy drums, EDM, crescendo, sound effects.

Mẫu thứ hai ("Nocturne in Warm Felt", fifty-percent, DNA đêm):
- Style: warm ambient nocturne, soft felt piano, gentle sustained string pads, soft pizzicato upright bass pulse,
  72 BPM, calm and curious, slightly mysterious but warm, ambiguous between major and minor, consistent low energy
  throughout, no build-ups, no drops, sparse, loopable, made to sit under a voiceover.
- Exclude: vocals, drums, percussion, bells, celesta, music box, chimes, crescendo, sound effects, EDM.
- **Loại nhạc cụ trùng âm sắc với tiếng hiệu ứng của bài**: bài có `coin`/`shimmer` (kim loại, lấp lánh) → cấm chuông,
  celesta, hộp nhạc; bài có `chip` → cấm trống. Có một lớp bass gảy đều để 14 phút không ru ngủ.
- Kết quả: 134.8 s, đều từ 14 s tới 129 s (RMS từng giây, hai đầu cùng −14 dB) → `loop [14, 129]`, 8 vòng; p1 −35.6,
  p2 −35.0, cả bài −16.7 LUFS. Đo RMS từng giây bằng numpy/array trên PCM; `astats reset=` của ffmpeg đếm theo
  KHUNG, không theo mẫu → ra giá trị cộng dồn, đừng tin.

Mẫu thứ ba ("Daylight Study", pi, DNA bàn dựng hình — sáng, ban ngày, KHÁC hẳn bản đêm của fifty-percent):
- Style: warm minimalist instrumental, soft felt piano playing a gentle repeating circular arpeggio, sustained cello and
  viola pads, light analog warmth, 76 BPM, calm, curious and quietly hopeful, daylight study mood, major key with soft
  suspended chords, consistent low energy throughout, no build-ups, no drops, sparse and airy, loopable, made to sit
  under a voiceover.
- Exclude: vocals, choir, drums, percussion, pizzicato, ticking clock, woodblock, marimba, typewriter, bells, celesta,
  music box, chimes, crescendo, epic, cinematic swell, sound effects, EDM. (Tiếng của bài là `tick` / `pen` / `snap` →
  cấm mọi thứ gõ/tích tắc; bass gảy của bản trước cũng bỏ vì gần `tick`.)
- Lyrics: `[Instrumental]` + `[steady, same energy from start to end, no climax]`.
- Kết quả: 117.5 s, −14.1 LUFS; đều 25–91 s (RMS từng giây ≈ −12 dB), có một nhịp lắng 63–68 s (−21…−25 dB, giữ — nghe
  như hơi thở), kết từ 92 s → `loop [25, 91]`, 10 vòng; p1 −35.8, p2 −35.0, cả bài −16.7 LUFS.
Mẫu thứ tư ("Late-Evening Study", neg-times-neg, DNA thảm cắt xanh than — tối, ấm, tò mò):
- Style: warm minimalist instrumental, mellow Rhodes electric piano playing slow gentle chord voicings, soft analog synth
  pad, bowed double bass drone, subtle tape warmth, 78 BPM feel without drums, curious, logical and quietly playful,
  late-evening study desk mood, minor-to-major gentle lift, consistent low energy throughout, no build-ups, no drops,
  sparse and airy, loopable, made to sit under a voiceover.
- Exclude: như mẫu ba + hi-hat, clap, xylophone, plucked guitar, harp (tiếng của bài là `chip` / `pop` / `type` / `snap`).
- Kết quả: 159.6 s, −14.9 LUFS; lặng 41–48 s, nhỏ dần từ 128 s → `loop [50, 126]`, 9 vòng; cả bài −16.6 LUFS.
- Mỗi video một không khí: viết prompt mới theo DNA — NHƯNG người dùng (2026-10-08): "dùng các bài nhạc cũ, chúng ta có
  đủ nhiều rồi" → từ zero-power chọn lại bản cũ hợp DNA (không trùng âm sắc tiếng hiệu ứng, không trùng bài liền trước),
  chỉ hỏi prompt Suno khi người dùng muốn bản mới. zero-power dùng lại nhạc zero-div (felt piano, không gõ), `loop [6, 128]`,
  mức như neg-times-neg (nhạc −38, sfx_db −6 — tai người dùng 2026-10-08).

## Mật độ và cân loại (pemdas)

- **Mật độ:** 294 tiếng / 10 phút ≈ 1 tiếng mỗi 2 s, GẤP ĐÔI video mẫu. Thủ phạm: `whoosh` mỗi lần camera lướt (58)
  và `pop` (75). Bài sau đặt sàn "≤ 1 tiếng / 3 s ngoài chùm gõ" trong brief, và cho camera lướt NHẸ thì không whoosh.
- **Cân loại**, đo trong bản trộn (đỉnh 100 ms so với giọng khi nói):
  - `whoosh` to nhất: thấp hơn giọng 9 dB;
  - `snap`, `correct`: 13.5 dB;
  - `pop`, `beep`: 16 dB;
  - `type`: 17 dB;
  - `tick`: 19 dB.
- **Đề xuất (chờ tai người dùng):** whoosh −3, tick +3, type +2, pop/beep +1.
- **Tai người dùng (2026-10-07, neg-times-neg):** "tiếng gõ bàn phím hơi bé quá, tôi không nghe được" — đo: đỉnh `type`
  −21 dBFS (giọng −1.5) → `type` db −6 → **0** (đỉnh −15 dBFS, ngang tick/snap). Các video trước dùng mức cũ.
- **Đổi `db` trong `library.json`** chỉ trộn lại tiếng, khoảng 1–2 phút, không render hình. Nếu từ lần render trước có sửa cảnh mà KHÔNG đổi hình (dọn import, chú thích), chạy `build.py <p> --keep`. Cách đo (K-weighting xấp
  xỉ, cửa sổ 100 ms) xem lịch sử phiên pemdas; pyloudnorm không có trong venv.

## Gắn tiếng + nhạc cho video ĐÃ XONG (zero-div, 2026-10-06)

Video đã duyệt hình, chưa có tiếng. Làm trọn trong một buổi, hình không đổi một điểm ảnh.

**Quy trình (theo thứ tự):**
1. **Nối trang:** `p1/p2.html` theo `templates/lesson/part.html` — import `collectCues`, đọc LEAD/TAIL từ `build.json`,
   `CUES = collectCues(plates, LEAD)`, getter `cues`; `kit.js` export `typeCues`. Thử `shoot.js cues` ngay (chỉ có tiếng
   chuyển cảnh) trước khi đụng cảnh.
2. **Bảng tiếng theo chất liệu DNA**, không bê bộ tiếng của bài trước: trang giấy → `page` (lật), `pen` (bút), `tear`
   (rách). Tự tải CC0 (Kenney RPG Audio `bookFlip`, OpenGameArt "Pencil sounds", "Various paper sound effects"); mẫu dài
   (bút 1.4 s) cắt thành nét 0.4 s có fade trước khi `add.sh`. Bỏ file không rõ nội dung thay vì đoán.
3. *(cũ — nay dùng lại nhạc cũ, mục "Nhạc nền")* **Gửi người dùng prompt Suno NGAY** (nhạc theo DNA: zero-div = "curious, slightly mysterious but warm, felt piano,
   pizzicato") — họ tạo nhạc song song lúc tôi làm tiếng.
4. **Giao một trợ lý đặt `sfx()`** bằng brief (bản thật `projects/en/zero-div/BRIEF-SFX.md`; mẫu đã bỏ khỏi
   `templates/lesson/` 2026-10-08 — bài mới đặt tiếng ngay lúc dựng cảnh, theo mục tiếng của `BRIEF-PLATES.md`):
   chỉ thêm `sfx()`/`TRANSITION`, không sửa render/mốc; tự chạy `shoot.js cues` và báo mật độ.
5. **Đọc báo cáo, cắt bớt** loại vượt trần, rồi render MỘT lần (`build.py`, ~6 phút, giữ `parts/`).
6. **Nhạc tới → chỉ trộn lại** (`build.py --keep`, ~1 phút).
7. Đo: LUFS cả bài (−16.5), từng dải nhạc (−35.2 / −35.0).

**Bài học:**
- **Trần mật độ trong brief có tác dụng:** "≤ 1 tiếng / 3 s ngoài chùm gõ" → lần đầu ra 1 / 4 s (pemdas không có trần:
  1 / 2 s).
- **Trần TỔNG mật độ chưa đủ, phải có trần từng loại:** `error` trôi lên 17 lần cho "hiếm" (mỗi dấu đỏ một tiếng). Brief
  sau ghi số: `error` ≤ 10, `impact` ≤ 2, `tear`/`shimmer` ≤ 4, `question` ≤ 6.
- **Luật 0.25 s giữa hai tiếng khác loại** bắt được phím gõ cuối đè `beep` kết quả (0.19 s) → bỏ phím rơi trong 0.25 s
  trước dòng kết quả.
- **Tiếng gắn ĐÚNG chữ đọc, không đúng mô tả trong brief:** brief ghi "rách khi ép 1 = 2", nhưng hình rách mạnh nhất ở
  chữ "crack" → trợ lý đặt ở đó và nêu lý do. Bảng tiếng là ý đạo diễn; mốc thật là hình.
- **Chọn đoạn lặp nhạc bằng số:** đo RMS từng giây, chọn `[a, b]` bỏ phần mở và phần nhỏ dần cuối bài (Suno thường tắt
  dần 10–15 s cuối). "Mathematical Warmth": −14 LUFS gốc, đều từ 6 s đến ~128 s → `loop [6, 128]`.
- **Lần đầu gắn tiếng phải render lại toàn bài** (zero-div không còn `parts/`). Từ nay GIỮ đoạn hình
  `out/<p>/parts/*.mp4` + `*.meta` của mọi bài để sửa tiếng/nhạc khỏi render hình (`tools/qa/clean.sh <p>` chỉ xoá
  trung gian `*.wav`, `video.mp4`, `*.log`). Sao lưu bản cũ trước khi ghi đè.
