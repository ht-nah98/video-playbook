---
name: stickman-animation
context: fork
description: Thiết kế, dựng và QA chuyển động người que bằng pose-to-pose hybrid rig; dùng khi tạo hoặc review action stickman mới.
---

# Stickman Animation Skill

Đầu mối: `docs/stick/README.md` (vòng tối ưu mẫu → từ điển → dàn cảnh → ghép cặp với mẫu → duyệt). Dáng lấy từ `engine/stick-dict.js`, dàn bằng `stage()`, vẽ `hero(..., { soft: true })`. Dùng `docs/study/STICKMAN-ANIMATION-SYSTEM.md` và `docs/study/14-stick-repository-lessons.md` trước khi bắt đầu. Đọc thêm `docs/study/08-stick-animation.md`, `docs/character/CHARACTER-STICK.md`, `docs/CRAFT.md` và các lesson liên quan bằng `python3 tools/kb.py --file <file>`.

## Gate bắt buộc

- Không bắt đầu bằng video dài.
- Không gọi numeric QA là animation đạt.
- Không dùng procedural actor duy nhất cho mọi action.
- Mỗi action mới phải có clip lab 3–8 giây và được review ở tốc độ thật.
- IK chỉ khóa điểm tiếp xúc đã đặt trong key pose; không tự quyết định toàn bộ acting.
- Không tích hợp action chưa được duyệt vào lesson production.
- Limb cong là vấn đề renderer: không dùng easing hoặc một curve chung để che polyline. Đã có: `hero` `soft` (người dùng chọn kiểu C 2026-10-26).
- Học từ mẫu: luôn ghép cặp cùng mốc (`tools/study/stick_dict_pairs.py`, hstack cạnh bản gốc) — LESSONS §171.

## Capability matrix trước khi chọn repository

Nếu cân nhắc repo mới, lập bảng và kiểm chứng bằng source/demo trước khi dùng: pose/keyframe, timeline/easing, rig/FK/IK, onion skin/motion path, export, determinism, offline và license. README, tên repo hoặc video demo không đủ làm bằng chứng. Tách phần có thể học (document/rig/renderer/UI/import-export) khỏi phần không nên kéo vào dependency (runtime/editor/cloud).

## Quy trình

1. **Beat** — viết nhân vật muốn gì, chịu lực gì, khán giả phải đọc gì.
2. **Key pose** — đặt 3–7 key/extreme poses có tên; kiểm silhouette ở 1920×1080.
3. **Contact map** — đặt `(joint, x, y, t, lock)` cho chân/tay; xác định chân trụ.
4. **Breakdown** — chọn arc, bend, hip path, head delay, overlap và asymmetry.
5. **Timing** — ghi hold, snap, slow-in/out, hit-stop, follow-through và settle riêng.
6. **In-between** — nội suy góc/curve; không nội suy target tay như dây kéo.
7. **Lab** — chạy onion-skin/motion-path view, scrub và render clip ngắn.
8. **QA** — numeric every-frame: finite, lengths, foot lock, ground, knee, contact; visual: silhouette, weight, spacing, arcs, overlap.
9. **Review** — ghi verdict và frame/time lỗi; chỉ pass khi người xem duyệt.

## Checklist trước khi báo đạt

- [ ] Có beat và action name.
- [ ] Có key/extreme/breakdown; không chỉ có start/end.
- [ ] Hip path và foot contact map tồn tại.
- [ ] Head/chest/arms có offset hoặc lý do không offset.
- [ ] Có hold và settle; không chuyển đều mọi frame.
- [ ] Pose bất đối xứng có chủ ý.
- [ ] Clip xem ở tốc độ thật, không chỉ contact sheet.
- [ ] Numeric QA xanh và visual review đã ghi riêng.
- [ ] Không có action production nào bị thay đổi ngoài phạm vi.

## Mẫu báo cáo review

```text
Action: <name>
Clip: <path>
Key poses: <names>
Contact: <joint/time>
Numeric: PASS/FAIL (<command>)
Visual: PASS/FAIL
Lỗi theo thời gian: <timestamps + mô tả>
Sửa ở: key / breakdown / timing / contact / renderer
Verdict: ACCEPT / REVISE
```

## Những lỗi phải dừng và sửa nguyên nhân

- “Cứng”: kiểm spacing/holds/overlap trước khi đổi easing.
- “Dẹo”: kiểm silhouette, hip/foot relationship và shoulder origin.
- “Trượt”: kiểm contact map, không chỉ hạ hông theo chân.
- “Không có lực”: thêm anticipation, load, contact, recoil và settle.
- “Đạt số nhưng xấu”: numeric gate không đủ; tạo onion-skin và clip review.
- “Tay chân như đoạn thẳng”: kiểm centerline/control point và stroke renderer; không sửa bằng cách đổi easing.
