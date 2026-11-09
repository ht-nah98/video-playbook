# zero-power — 6 Shorts

Cắt bằng `python3 tools/shorts/short.py zero-power [tên…]` từ `out/en/zero-power/zero-power.mp4` (cấu hình
`shorts.json`, quy trình docs/lesson/SHORTS.md). Ra `out/en/zero-power/shorts/<tên>.mp4` (1080×1920, 60 fps).

**Khi đăng:** Related video = video gốc "Why Is Anything to the Power of Zero Equal to 1? (And What Is 0⁰?)" ·
Altered or synthetic content = Yes · Education · English.
**Lịch:** 3 Short / tuần cách ngày (T2–T4–T6), theo thứ tự dưới (mạnh nhất trước, xen kẽ máy móc/đời thường ↔ hack não).

| # | File | Dài | Gốc | Title (≤ 100) | Mô tả |
|---|---|---|---|---|---|
| 1 | machines-disagree | 21 s | 0:30 + 10:09 | Python Says 0⁰ = 1. Excel Says Error. Who Is Right? (51) | The machines that say 1 are doing algebra; the ones that error are holding up a warning sign. |
| 2 | staircase | 33 s | 1:41 + 2:17 | Why Is 2 to the Power of 0 Equal to 1? (38) | Walk down the powers of two and the staircase lands on 1. |
| 3 | zero-boxes | 29 s | 6:17 | How Many Ways Can You Fill Zero Boxes? (Why 0⁰ = 1) (51) | In counting, 0⁰ isn't a convention: you count, and you get one. |
| 4 | multiply-zero-times | 40 s | 0:18 + 3:49 | What Does It Mean to Multiply Zero Times? (41) | Adding starts from 0, multiplying starts from 1, and that is where zero multiplications leave you. |
| 5 | two-paths | 39 s | 8:11 | Why 0⁰ Is an Indeterminate Form: Two Paths, Two Answers (55) | Slide x and y towards zero along different paths and x^y heads to 1, 0, or even 2. |
| 6 | knuth-no | 25 s | 7:32 | Donald Knuth on 0⁰: "No, No, Ten Thousand Times No" (51) | Why Knuth, and Python and JavaScript, say 0⁰ = 1. |

Mỗi mô tả thêm hai dòng cuối:

```
Full video: Why Is Anything to the Power of Zero Equal to 1? (And What Is 0⁰?) — linked above.
#shorts #math #exponents
```

(số trong ngoặc sau title = số ký tự, đếm bằng `len()` của Python.)

Ghi chú cắt:
- machines-disagree bắt đầu từ "Python says one" (bỏ "It gets stranger. Try zero to the power of zero." — khung gốc
  còn trống, hook đã nói 0⁰), nối sang lời giải ở Act VI (10:09).
- staircase: mẩu cuối `tail` 0 — đuôi 0.3 s làm lọt cảnh trượt sang "pattern is not a proof" vào khung CTA.
- Crop rộng 1500–1920 vì chữ gốc trải ngang cả khung (bảng máy, lưới 8 cách điền, đồ thị hai đường).
