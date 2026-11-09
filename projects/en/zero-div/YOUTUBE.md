# zero-div — gói đăng YouTube

Mẫu: `templates/lesson/YOUTUBE.md`. Đếm ký tự bằng code (LESSONS §42) — mọi ô ≤ 90% giới hạn.
Bản dán: `out/zero-div/youtube/{description.txt, tags.txt, problems.txt, subtitles-en.srt, chapters.txt}`.
Video: `out/zero-div/zero-div.mp4` (11:06, 1080p60, −16.5 LUFS).

## Thumbnail
Người dùng làm. Gợi ý: trang giấy kẻ ô, một LỖ thủng đen ở giữa, "1 ÷ 0 = ?" bút đỏ chấm bài, mascot nhún vai (pose-shrug).
Lưu `projects/zero-div/thumbnail.png` + bản sao ở `out/zero-div/youtube/`.

## Title (51/100)
**Đề xuất:** `Why You Can't Divide by Zero (It's Not Just a Rule)`

Dự phòng:
- `Why Can't You Divide by Zero? A 1,400-Year-Old Problem` (54)
- `The Hole in Arithmetic: Why You Can't Divide by Zero` (52)
- `Why 1 ÷ 0 Breaks Mathematics` (28)

## Description (1255/5000)
```
Imagine a world without zero. For thousands of years, most of humanity lived in one, and when zero finally arrived, it brought a hole into division that nobody has managed to patch in almost 1,400 years.

In this video: why zero was so hard to accept as a number, why dividing by zero makes no sense no matter which way you look at it, and why that one hole is the best proof that mathematics is a system, not a pile of arbitrary rules.

0:00 Introduction
1:26 Why zero came so late
3:16 The two jobs of zero
4:05 Everything works, except division
5:07 What division really is
6:24 Getting closer to zero
7:42 Why not just call it infinity?
8:56 What your computer does
10:12 Looking back

In this video:
• Why the Romans never needed zero, and why 305 does
• Brahmagupta's rules for zero (628) and Bhaskara's "khahara"
• Why 12 ÷ 0 has no answer, and 0 ÷ 0 has too many
• Limits: why 1/x runs off to +∞ and −∞ at the same time
• Why 1 ÷ 0 = ∞ makes 1 = 2, and the Riemann sphere, where it is allowed
• What your computer does: Infinity, −Infinity, +0, −0 and NaN

Previous video: 30,000 years of math, from a wolf bone to your phone.

99% from scratch — maths, built from the ground up. Subscribe for the next deep dive.

#math #dividebyzero #mathematics
```

## Tags (292/500)
```
divide by zero, why can't you divide by zero, dividing by zero, 1 divided by 0, 0 divided by 0, zero, history of zero, brahmagupta, bhaskara, undefined vs indeterminate, indeterminate form, limit of 1/x, infinity, riemann sphere, NaN, IEEE 754, negative zero, math explained, 99% from scratch
```

## Problems (581/800) — mốc = câu bắt đầu lời giải thích (mốc chữ thật)
```
1:56 Why do we need a zero to write 305?
2:52 What were Brahmagupta's rules for zero?
4:09 What happens when you add or multiply by zero?
5:12 What is division, really?
5:30 Why is 12 ÷ 0 undefined?
5:48 Why is 0 ÷ 0 undefined too?
6:33 What happens as you divide by numbers near zero?
7:11 Why does the limit of 1/x at 0 not exist?
7:19 Why is 0/0 an indeterminate form?
7:42 Why can't 1 ÷ 0 just be infinity?
8:32 Where is 1 ÷ 0 = ∞ actually allowed?
9:00 What does a computer do when you divide by zero?
9:30 Why do computers have +0 and −0?
9:42 Why is NaN not equal to itself?
```

## Cài đặt
English · Education · Academic system: United States · tải `subtitles-en.srt` · "Altered or synthetic content" = Yes (giọng tổng hợp).
Chương: 9 (bỏ "Outro" vì chỉ 6 s — YouTube cần mỗi chương ≥ 10 s, kể cả chương cuối; `publish.py` đã tự kiểm).
Không có ảnh bên ngoài → không cần credit ảnh.
