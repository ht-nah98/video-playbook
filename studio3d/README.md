# studio3d — công nghệ MV 3D (TypeScript + three.js, bun + Vite)

Chép **nguyên khối** (chỉ sửa cờ GPU trong `app/scripts/render.ts`, xem dưới) từ [github.com/mexicat/pdoom-video](https://github.com/mexicat/pdoom-video) (commit `bdbad53`,
2026-10-09) — MV "I'm Upping My P(doom)" của Giacomo Magnanini. Code là **MIT** (`LICENSE`, giữ nguyên dòng bản
quyền). README gốc: `README.upstream.md`. Tổng quan tiếng Việt: `docs/OVERVIEW.vi.md`; engine: `docs/ENGINE.md`;
treatment mẫu mực thước: `docs/TREATMENT.md`.

**Khi nào dùng:** MV ca nhạc — cân nhắc 3D TRƯỚC (`docs/mv/NEW-MV.md`). Video bài học vẫn dùng engine 2D (`engine/`).

## Không có trong git

| thứ | vì sao | lấy ở đâu |
|---|---|---|
| `audio/pdoom.mp3`, `lyrics/`, `data/lyrics*.json` | bài hát và lời KHÔNG thuộc MIT (xem Credits trong `README.upstream.md`) | clone repo gốc, chép `audio/ lyrics/ data/` sang |
| `app/node_modules/` | cài lại được | `cd app && bun install` |
| `analysis/.venv` (~6 GB) | venv Demucs/torch/whisper — `tools/analyze` của repo cũng dùng (`tools/config.py`) | `cd analysis && uv venv && uv pip install --python .venv/bin/python -r ../../tools/analyze/requirements.lock.txt` (`uv sync` thiếu faster-whisper) |

## Chạy mẫu

Cần [bun](https://bun.sh), Google Chrome, ffmpeg (libx264).

```sh
cd studio3d/app
bun install
bunx vite                                                     # xem trước ở trình duyệt
bun scripts/render.ts video --samples 4 --out ../out/draft.mp4   # bản nháp nhanh
bun scripts/render.ts video --samples auto --shutter 0.2 --out ../out/pdoom.mp4
```

**GPU — kiểm trước mỗi máy mới:** `bun scripts/render.ts gpu` phải in tên card thật (máy này: `ANGLE (NVIDIA, Vulkan …
RTX 4070 Ti)`). Nếu in `SwiftShader` là Chrome đang vẽ bằng CPU — vẫn ra hình đúng nhưng chậm ~25 lần (206 ms so với 8 ms
mỗi khung phụ; 5 s video: >15 phút so với 30 s). Bản gốc cứng `--use-angle=metal` (chỉ macOS) nên trên Linux rơi vào
SwiftShader trong im lặng; đã sửa (2026-10-09): macOS `metal`, nơi khác `vulkan`, đổi bằng `--angle <backend>` hoặc
`PDOOM_ANGLE` (`gl` cũng dùng GPU nhưng chậm hơn vulkan ~6 lần). Trên máy này cả bài 1080p, `--samples auto`: ~15 phút.

Render theo quy ước của repo: bản cuối `out/<p>/<p>.mp4` (`--set <p>`), ảnh kiểm và mẫu p(doom) vào `out/_lab/3d/` (không commit). Các chế độ khác (`stills`, `sheet`, `perf`, `plates`, 4K `--scale 2`):
`README.upstream.md`.

## Làm MV 3D mới

Chưa tách engine khỏi cảnh (chọn chép nguyên khối, 2026-10-09). Cảnh p(doom) nằm ở `app/src/scenes/`, mốc cảnh ở
`app/src/timeline.ts`, đường dẫn bài hát ở `app/src/main.ts` và `app/scripts/render.ts` (`audio/pdoom.mp3`). Engine
(`app/src/engine/`) không import cảnh — `timeline.ts` nạp qua `import.meta.glob('./scenes/*.ts')` — nên khi có MV 3D
thứ hai, tách `app/src/engine/` thành engine dùng chung là việc nhẹ.
