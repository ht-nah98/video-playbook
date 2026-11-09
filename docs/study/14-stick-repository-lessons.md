# Repository Lessons for Stickman Animation

## Câu hỏi

Các repository vừa khảo sát có giúp làm người que tốt hơn không, và nên áp dụng ở tầng nào?

## Kết luận nhanh

Có, nhưng không phải bằng cách bê nguyên một repo vào pipeline. Repository tốt nhất cho ta ở ba tầng:

1. **Cấu trúc dữ liệu:** document → rig → named keyframes → curves/easing → clips → render/export.
2. **Công cụ review:** timeline, scrub, onion skin, layers, reusable movieclips, pose/arc visibility.
3. **Kỷ luật authoring:** action được lưu thành asset có thể xem lại, chỉnh timing và tái sử dụng.

Repo không tự dạy acting. Chuyển động mềm vẫn đến từ key pose, spacing, hold, anticipation, overlap, weight và visual review.

## `blixvip/stick`

Theo source/README được khảo sát, repo tổ chức quanh document/rig/render/UI/import-export, có keyframes, easing, layers, reusable movieclips và onion-skin workflow. Đây là cấu trúc phù hợp để học cách xây **animation lab/editor**.

### Áp dụng được

- Tách `Document` (scene/action data) khỏi `Rig` (bone/joint constraints) và `Renderer` (Canvas/video).
- Lưu keyframe có tên và thời gian; không rải góc khớp trực tiếp trong hàm `actor(t)`.
- Cho phép clip tái sử dụng: `look`, `weightShift`, `walk`, `reach`, rồi override timing/prop/contact theo cảnh.
- Có layer debug: skeleton, contact points, onion skin, motion paths.
- Export JSON để review/chỉnh lại mà không phải sửa code render.

### Không nên bê nguyên

- WebGPU/Electron/UI của repo chưa chứng minh determinism và tương thích với Node/Canvas renderer hiện tại.
- Không biến nó thành dependency trước khi kiểm tra license, build offline, frame determinism và export thực tế.
- Không coi easing/keyframe system là giải pháp tự động cho acting.

## `Stickman-Studio`

`saiedpod-bot/Stickman-Studio` là pipeline script/storyboard → ảnh AI → slideshow Ken Burns hoặc Veo → TTS → FFmpeg → upload. Nó hữu ích cho orchestration và assembly, nhưng không có bằng chứng về bone rig, pose editor, onion skin, keyframe timeline hay deterministic Canvas animation.

**Áp dụng:** chỉ tham khảo phân tầng pipeline sản xuất và tách phase. **Không áp dụng:** lõi chuyển động người que.

## Các repo/ứng dụng đối chiếu

- [Stick Nodes](https://sticknodes.com/page/index.htm): segment editing, onion skin, tweening — học workflow chỉnh frame và review.
- [Pivot Animator onion skins](https://pivotanimator.net/pivothelp/onion_skins.htm): học ghost frame và spacing.
- [OpenToonz cutout animation](https://github.com/opentoonz/opentoonz_docs/blob/master/source/creating_cutout_animation.rst): học hierarchy, pivot, parent-child, keyframe.
- [Cani2D](https://github.com/skeskinen/Cani2D): ứng viên skeletal Canvas/keyframe, cần audit source trước khi dùng.
- [stick-motion](https://github.com/cafermutluozkan/stick-motion): ứng viên FK/IK/foot-locking, cần audit source và license.
- [hmelberg/stick](https://github.com/hmelberg/stick): JSON timeline và pinned feet đáng tham khảo dù output SVG.

## Áp dụng cho nội dung/acting

Repository chỉ thay đổi **cách ta chuẩn bị và xem action**; nó không thay đổi DNA của video. Khi viết nội dung:

- Mỗi beat lời nói phải ánh xạ thành một action có nguyên nhân/kết quả.
- Chọn clip theo ý định: `look` cho nhận ra, `weightShift` cho do dự/chịu lực, `reach/grip` cho tương tác, `recoil` cho phản ứng.
- Đạo cụ là vật có khối lượng: action data phải ghi contact, load, carry, release.
- Hai nhân vật phải có event causality: A chạm/đẩy trước, B phản ứng sau.
- Camera theo action và giữ silhouette đọc được; không dùng editor để che một pose yếu.
- Mỗi lesson chỉ dùng những clip đã được review; clip library không được biến nhân vật thành chuyển động lặp vô nghĩa.

## Áp dụng cho cách làm

```text
content beat
  → action brief
  → named key/extreme poses
  → breakdown + contact map
  → timing/spacing + overlap
  → onion-skin review
  → numeric + real-speed clip review
  → reusable approved clip
  → production lesson
```

## Quy tắc chọn repository trong tương lai

Trước khi chọn một repo làm lõi, lập capability matrix và kiểm chứng từng ô:

| Năng lực | Phải kiểm chứng |
|---|---|
| Pose/keyframe | Có dữ liệu frame/joint thật, không chỉ screenshot |
| Timeline/easing | Có playback và spacing có thể quan sát |
| Rig/FK/IK | Có hierarchy, limits, bend/contact rõ |
| Onion skin | Có ghost frame hoặc motion path thực |
| Export | Có JSON/SVG/Canvas/frames dùng được |
| Determinism | Cùng input cho cùng hash ở mọi frame |
| Offline | Chạy không cần API/cloud |
| License | Cho phép dùng/đọc lại theo project |

Tên repo, README marketing hoặc video demo không đủ làm bằng chứng.

## Audit tích hợp source thật — `blixvip/stick` (2026-10-26)

Audit source tại commit shallow clone ở `/tmp/blixvip-stick-audit` đã xác nhận repo này là phần mềm animation thật, không chỉ demo:

- `README.md`: GPL-3.0-or-later; app chạy Windows/Linux/Web; timeline/layers/onion skin/IK/easing/movieclips; export MP4, GIF, PNG/JPEG/SVG sequence và Pivot/Stick formats.
- `src/export-flow.mjs`, `src/export-frame-core.mjs`, `src/export-frame-renderer.mjs`: renderer có API render theo frame (`renderFrame`/`renderTick`) và export frame sequence/native video.
- `src/image-export.mjs`, `src/native-video-export.mjs`: callback render theo chỉ số frame, `fps`, `totalFrames`; có đường xuất PNG sequence và native video.
- `docs/document-exports.md`, `backend/native_format.py`: document/rig có format native STYK/STKZ/STMV và binary sectioned transport; không phải JSON pose API nhỏ sẵn để import vào engine hiện tại.
- `desktop/README.md`, `desktop/main.cjs`: desktop dùng Electron + sandboxed WebGPU renderer + loopback Python codec service; phần này là runtime của app, không phải điều kiện bắt buộc cho ý tưởng document/timeline.
- `package.json`: app GPL-3.0-or-later, Electron/WebGPU/browser build; không phải thư viện MIT/Apache có API ổn định để thêm trực tiếp vào repo này.

### Ma trận khả năng tích hợp

| Cách dùng | Kết luận | Lý do |
|---|---|---|
| Nhúng nguyên app/Electron/WebGPU | Không nên | GPL copyleft, runtime lớn, phụ thuộc Electron/GPU/Python codec; thay đổi pipeline và không cần cho render Canvas hiện tại. |
| Dùng app Stick như editor thủ công rồi xuất PNG/SVG/MP4 | Có thể, phù hợp review | Người làm có timeline/onion skin/IK; export sequence là ranh giới sạch. Cần giữ model sheet và kiểm frame ngoài app. |
| Đọc native STYK/STKZ trực tiếp trong engine | Không nên ở vòng này | Format sectioned/compressed có document semantics lớn; phải port parser và evaluator, chi phí cao hơn lợi ích. |
| Port các ý tưởng document/timeline/clip vào engine hiện tại | Nên làm | Có thể giữ Canvas/Node determinism, chọn API nhỏ: named keyframes, timing, clip library, motion paths, contact map. |
| Dùng repo làm runtime render production | Chưa chứng minh | Repo có frame callback và export, nhưng chưa chạy build/browser/Desktop trong môi trường project; WebGPU/editor render vẫn cần audit determinism riêng. |

### Kết luận áp dụng

`blixvip/stick` giúp **cách làm**: dùng editor thật để đặt pose, xem onion skin, chỉnh spacing và export PNG sequence; giúp **cách tổ chức code**: tách document/rig/evaluator/renderer/export. Nó không tự giải quyết acting và không nên thay thế Canvas renderer hiện tại.

Thử nghiệm hợp lý tiếp theo (khi người dùng yêu cầu) là một round-trip nhỏ: tạo một action 3–5 giây trong Stick, xuất PNG sequence hoặc SVG sequence, đưa vào lab review; không dùng native format, không thêm dependency, không tích hợp production. Cần ghi rõ license/GPL nếu assets hoặc code của repo được phân phối cùng sản phẩm.
