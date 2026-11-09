# Làm một video 3D (MV / intro) — playbook BẢN TẠM

> **Tạm:** quy trình này mới chạy trọn **một lần** (`projects/en/intro`, 2026-10-09, hai bản dài/ngắn). Người dùng:
> "OK hơn rồi đó… chỉ tạm thời ok hơn thôi". Sửa file này sau mỗi video 3D. Chọn 3D hay 2D: `docs/MEDIUM.md`.
> Công nghệ: `studio3d/` (TS + three.js, bun + Vite; `studio3d/README.md`, `studio3d/docs/ENGINE.md`).

Mỗi pha có đầu vào, việc làm, và điều kiện xong. Luật chung mọi video (`docs/CRAFT.md`) vẫn áp dụng.

## Pha 0 — Máy và công cụ (một lần mỗi máy)

- `cd studio3d/app && bun install`. Chưa có bun: `npm i -g bun`.
- **`bun scripts/render.ts gpu` phải in tên card thật.** Nếu in `SwiftShader` là Chrome đang vẽ bằng CPU (chậm ~25 lần,
  LESSONS §72). Đổi backend bằng `--angle` hoặc `PDOOM_ANGLE`.

## Pha 1 — Dữ liệu (`projects/<p>/data3d/`)

- Nhạc + lời → `audio.json` (beats, downbeats, sections, đường bao) và `lyrics.json` (**mốc từng từ**). Lấy từ forced
  alignment (`docs/mv/PIPELINE.md`) hoặc dữ liệu có sẵn. Thêm `mix.m4a` để xem trước.
- Vật thể dựng sẵn bằng Python, lưu JSON (không giải mã ảnh trong trình duyệt lúc render, LESSONS §16):
  mascot voxel, chữ voxel cho **từng từ của lời**, ảnh 2D sạch của các tư thế. Mẫu: `projects/en/intro/data3d.py`.
- **Xong khi:** mọi từ trong lời có mốc, mọi từ có khối chữ.

## Pha 2 — Khung mẫu THẬT (trước DNA)

- Dựng 2 không khí khác nhau, mỗi cái 3–4 khung ở mốc thật của nhạc, ghép thành một ảnh cho người dùng chọn.
  Scene có thể đọc `?look=` (`--query look=…`).
- Nếu người dùng nhắc tới video tham chiếu, **hỏi lại đúng nghĩa** (giữ không khí đã chọn hay đổi hẳn) trước khi làm
  tiếp (LESSONS §73).
- **Xong khi:** người dùng chọn một không khí.

## Pha 3 — DNA + TREATMENT (người dùng duyệt)

- `projects/<p>/DNA.md` theo `docs/DNA.md`, cộng thêm phần riêng của 3D: nền, ánh sáng, hậu kỳ (bloom, grain), nhân
  vật 2D→3D.
- `projects/<p>/TREATMENT.md` là **bảng theo TỪ**: mỗi câu một dòng, mỗi từ của câu có hình. Ghi rõ:
  - chữ hiện kiểu gì, động từ của câu;
  - camera hoặc cú chuyển;
  - đoạn không lời: một sự kiện mỗi beat;
  - mỗi đầu ô nhịp: một whip hoặc chớp.
- Bản ngắn (nếu có): cắt đầu bài chứ không cắt đuôi, vào ngay trước một từ (đo năng lượng ở điểm cắt), fade 20 ms.
- **Xong khi:** người dùng duyệt. Không code trước bước này (CRAFT §1).

## Pha 4 — Code cảnh `projects/<p>/scene3d.ts`

Chạy bằng `--set <p>` (trang: `?set=<p>`). Engine nạp `projects/<p>/data3d/` và một mục timeline là `projects/<p>/scene3d.ts`;
import engine bằng `@3d/engine/…`. Mẫu p(doom) của studio3d vẫn ở `studio3d/app/src/scenes/`. Các khối đã dùng ở intro
(chép và sửa, chưa tách thành module):
- **Hệ chữ:** mỗi từ gồm `tIn/tOut` (tra từ `lyrics.json`), vị trí, góc, cỡ, kiểu vào (`slam/drop/rise/groups`), kiểu
  ra (`shatter/sink/collapse`) và `fx` (chuyển động theo nghĩa). **Xếp hàng bằng bề rộng thật** của dữ liệu
  (`row()`), không ước lượng (LESSONS §75).
- **Nhân vật 2D vào, 3D ra:** tấm ảnh sạch, rồi lưới ô cùng màu nổi thành khối, xoay vào phối cảnh và bay đi; đảo
  ngược được (3D → 2D).
- **Camera:** danh sách shot `[mốc, thời gian blend, pose(t)]`; blend 0 là cắt cứng.
- **Vật liệu phát sáng theo màu từng khối:** `glowMat(k)`, k ghi thẳng vào shader. **Mọi `Euler.set` phải ghi rõ thứ
  tự trục** (LESSONS §74).
- Số trên hình (LOADING…) phải **assert** bằng đúng trạng thái đang vẽ.

## Pha 5 — Kiểm (trước mỗi lần render trọn)

| kiểm | lệnh / cách |
|---|---|
| nhìn | `bun scripts/render.ts sheet --set <p> --times …` (→ `out/_lab/3d/<p>/`) mỗi dòng TREATMENT một khung, rồi **NHÌN**: chữ có bị cắt khung, bị mảnh vụn che, bị nhìn cạnh không |
| tất định | `stills` cùng các mốc theo **hai thứ tự**, và **một mốc render hai lần trong một phiên**; `cmp` từng file. Shell zsh: viết lệnh `cmp` tường minh, không `set -- $p` (LESSONS §76) |
| nhịp | `python3 tools/qa/still_windows.py out.mp4 --skip <khoảng lặng>` báo OK |
| số đúng | assert trong scene; render trọn tự chạy assert ở mọi khung |
| độ dài | `ffprobe` hình = tiếng = độ dài nhạc |

## Pha 6 — Render

```sh
cd studio3d/app
bun scripts/render.ts video --set <p> --samples auto --shutter 0.2          # → out/<p>/<p>.mp4, tiếng projects/<p>/data3d/mix.m4a
# bản ngắn: render không tiếng rồi ghép tiếng kèm fade 20 ms (từ gốc repo)
bun scripts/render.ts video --set <p> --query short=1 --noaudio --from <cắt> --samples auto --shutter 0.2 --out ../../out/<p>/<p>-short.noaudio.mp4
ffmpeg -i out/<p>/<p>-short.noaudio.mp4 -ss <cắt> -t <dài> -i projects/<p>/data3d/mix.m4a -map 0:v -map 1:a -c:v copy -af afade=t=in:d=0.02 -c:a aac -b:a 320k -shortest out/<p>/<p>-short.mp4
```

Render chạy nền (`run_in_background`), mất ~5 phút cho 26 s. Bản cuối là `out/<p>/<p>.mp4`, mọi thứ thử khác vào `out/_lab/`. Tự chụp khung từ chính file mp4 để kiểm, rồi mới báo.

## Pha 7 — Duyệt và đúc kết

- Người dùng xem, nhận xét. Mỗi nhận xét về **cách làm** (không phải sửa một khung) ghi vào `docs/MEDIUM.md`, file này,
  hoặc LESSONS.

## Còn thiếu (biết rồi, chưa làm)

- Chưa có template / lệnh tạo dự án 3D mới (chép `projects/en/intro/scene3d.ts` + `data3d.py`).
- Hệ chữ, voxel, 2D→3D chưa tách thành module dùng chung.
- Từ quá ngắn (< 0.25 s, rap nhanh) đọc chưa kịp; chưa có luật gom từ.
- Chưa có tiếng hiệu ứng cho video 3D.
- Chưa có công cụ ghép cú 3D vào giữa video bài học 2D (`docs/MEDIUM.md`).
