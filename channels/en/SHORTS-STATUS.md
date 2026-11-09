# Shorts kênh Anh — đã đăng / chưa đăng (đối chiếu API 2026-10-30)

Nguồn: `analytics/raw/en/2026-10-30/videos.json` (API, mọi video kể cả private) ↔ `out/en/<p>/shorts/SHORTS.md`.
Kênh có **25 Short public**, không có Short nào đang hẹn giờ. Máy có **56 Short** → **31 chưa đăng**.
Ghép id ↔ bài: `channels/en/shorts.json`. Đối chiếu lại: `tools/yt/pull.py` rồi `python3 tools/yt/map_shorts.py en`.
File Short: `out/en/<p>/shorts/<file>.mp4` (+ `.jpg` ảnh bìa); **đã đăng → `<file>_public.mp4` / `.jpg`** (đổi tên 10-30, như thư mục `_public`); title + mô tả ở `SHORTS.md` cùng thư mục.

## Chưa đăng — 31

### Đăng được ngay (video dài đã public) — 19
| bài | file | title gợi ý (SHORTS.md) |
|---|---|---|
| zero-div | `computer-nan` | What Happens When a Computer Divides by Zero? |
| zero-div | `plus-or-minus-infinity` | Is 1 ÷ 0 Plus Infinity or Minus Infinity? |
| zero-div | `riemann-sphere` | Where Dividing by Zero Is Actually Allowed |
| calculus | `area-is-one-third` | The Area Under x² Is Exactly 1/3. Here's Why |
| calculus | `hole-at-five` | What Is a Limit? A 0/0 That Still Has an Answer |
| calculus | `closing-in-on-two` | How Can a Single Point Have a Slope? |
| solid-geometry | `laptop-120-is-60` | A Laptop Open at 120° Is a 60° Angle — Here's Why |
| solid-geometry | `skew-lines` | Skew Lines: Never Meet, Never Parallel |
| solid-geometry | `archimedes-tomb` | The Math Archimedes Wanted on His Tomb |
| pi | `pi-without-circles` | Why Pi Shows Up Where There Are No Circles |
| pi | `pi-is-turning` | Pi Isn't About Circles. It's About Turning. |
| zero-power | `machines-disagree` | Python Says 0⁰ = 1. Excel Says Error. Who Is Right? |
| zero-power | `zero-boxes` | How Many Ways Can You Fill Zero Boxes? (Why 0⁰ = 1) |
| zero-power | `multiply-zero-times` | What Does It Mean to Multiply Zero Times? |
| fifty-percent | `scam-otp` | The One Line That Gives a Scam Message Away |
| fifty-percent | `coin-flipped-24000` | They Flipped a Coin 24,000 Times |
| math-30k | `parallel-lines` | How Many Parallel Lines? 0, 1, or Infinitely Many |
| math-30k | `godel-limits` | Gödel Proved That Math Has Limits |
| math-30k | `algebra-algorithm` | "Algebra" and "Algorithm" Come From One Man |

### Chờ video dài public — 12 (video dài đang **private**)
| bài | video dài | file |
|---|---|---|
| neg-times-neg | `QQh0zF1f6pw` private | `stendhal-question`, `break-arithmetic`, `called-fictitious`, `proof-neg-neg`, `pattern-not-proof`, `quarter-turn` |
| pemdas | `wydpLQa5e80` private | `viral-sum`, `minus-two-squared`, `m-before-d`, `calculators-disagree`, `left-to-right`, `why-multiply-first` |

Short trỏ "Full video" về bài dài — đăng Short khi bài dài còn private thì link chết. Thứ tự đúng: public video dài trước.

## Đã đăng — 25 (public)
| ngày | id | bài | file | view 10-30 |
|---|---|---|---|---|
| 10-07 | `4vbmzDsnJE4` | math-30k | florence-ban_public | 3000 |
| 10-08 | `WWOfZho-0CM` | math-30k | sixty-minutes_public | 925 |
| 10-09 | `0p2lt5AGbPc` | math-30k | i-quarter-turn_public | 1063 |
| 10-10 | `kxsbVINhems` | fifty-percent | coin-under-hand_public | 1044 |
| 10-11 | `jnC1OjWDcPc` | fifty-percent | coin-not-fifty_public | 142 |
| 10-12 | `TlFeF7PMSic` | fifty-percent | two-fair-bets_public | 76 |
| 10-13 | `6aCW1CMnBUk` | math-30k | russell-paradox_public | 72 |
| 10-14 | `tkYvPU8Daik` | zero-power | two-paths_public | 268 |
| 10-15 | `sSF7iFV2Cuo` | zero-power | staircase_public | 28 |
| 10-16 | `aV5RjRq88PM` | zero-power | knuth-no_public | 607 |
| 10-17 | `RgXatDg1cQY` | fifty-percent | positive-test_public | 87 |
| 10-18 | `ixfQlnzWyZ4` | math-30k | bigger-infinity_public | 792 |
| 10-19 | `Y4IkLUsFvG4` | pi | nobody-chose-pi_public | 4750 |
| 10-20 | `_-4av4l8LKQ` | pi | circle-ratio-two_public | 1223 |
| 10-21 | `Il2rM7gnYD4` | pi | archimedes-squeeze_public | 2028 |
| 10-22 | `uPmJQzRCA4s` | pi | why-pi-never-ends_public | 2928 |
| 10-23 | `WvW7CvnjL3g` | solid-geometry | pyramid-one-third_public | 4149 |
| 10-24 | `F28gggAZKVo` | solid-geometry | stool-never-wobbles_public | 1071 |
| 10-25 | `FaIPLAd5BnM` | solid-geometry | only-five-solids_public | 1211 |
| 10-26 | `eBENHajkgQw` | calculus | car-does-calculus_public | 878 |
| 10-27 | `NcJ1Yg7H5Kc` | calculus | two-sides-one-coin_public | 194 |
| 10-28 | `lt9PdZKNK24` | calculus | impossible-question_public | 1252 |
| 10-28 | `HKScigtB2_M` | zero-div | twelve-over-zero_public | 1311 |
| 10-29 | `3CH8nkQPp-8` | zero-div | romans-no-zero_public | 1079 |
| 10-29 | `YpaZtsOIlb4` | zero-div | one-equals-two_public | 387 |

Playlist Shorts `PLcP1GoxbXGrM` có 22 bản đầu; **3 Short zero-div (`HKScigtB2_M`, `3CH8nkQPp-8`, `YpaZtsOIlb4`) chưa vào playlist**.
Bài chưa có Short: logarithm (bản mới chưa đăng), intuition (video dài private), probability, sudoku, trig.
