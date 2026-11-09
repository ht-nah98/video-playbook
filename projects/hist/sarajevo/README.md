# hist/sarajevo — World War I, phần 1 (233 s) — TẬP MẪU của kênh lịch sử

Tập thử để dựng hệ thống kênh (lời, người dẫn, hình, tiếng). 8 bản trong 2026-10-24 → 10-28; bản 8 người dùng: "hầu hết ổn
rồi". Đúc kết: `channels/hist/PLAYBOOK.md` (hành trình từng bản §1), LESSONS §182–§204.

## Gói (thử)
Title **How One Wrong Turn Started World War I** · thumbnail: người dẫn mặt sốc chỉ vào chiếc xe cổ rẽ nhầm, mũi tên đỏ
"WRONG WAY", chữ "1914".

## Trạng thái — bản 8 (2026-10-28) `out/hist/sarajevo/sarajevo.mp4`
- Lời `SCRIPT.md` 38 dòng (bản 6 bỏ 3 câu tự xưng "I was…" — §200), giọng adam ×1.1, 232.4 s + thẻ kết 0.8 s.
- Người dẫn: nói ở góc (nhép miệng) · nhập vai 2 lần: lẫn trong đám đông vẫy cờ rồi núp khi bom nổ, là 1 trong 6 sát thủ.
- Tiếng: `data/cues.py` → `data/cues.json` (40 tiếng ≈ 10 / phút, 4 hush, nền phố + rè đĩa, 5 bản nhạc theo đoạn).
- Còn có thể làm: tách cảnh > 8 s cho nhịp nhanh hơn; người dẫn nhập vai thêm ~1 lần (hàng lính / hội nghị) nếu lời có chỗ.

## File
| | |
|---|---|
| `SCRIPT.md` | lời (dòng = một hơi; `##` = ngừng 1.6 s) + bản 1 làm ví dụ xấu |
| `episode.html` | dựng hình — import `../_kit/{stage,narrator,mapkit}.js`; cảnh tìm dòng bằng ĐẦU CÂU (`PRE`, `LT`) |
| `data/narration.timeline.json`, `narration.mouth.json` | mốc từ (align.py) + đường bao miệng (mouth_env.py) |
| `data/cues.py` → `cues.json` | kế hoạch tiếng theo từ (sửa ở đây, chạy lại) |
| `assets/photos`, `assets/web` (+ `meta.json` nguồn), `assets/cut` (cắt nền) | ảnh CC0 / PD của tập |
| `audio/` (không commit) | `narration.wav`, cache take `voice/` |

## Lệnh
```bash
node engine/render/shoot.js check --page projects/hist/sarajevo/episode.html
python3 projects/hist/sarajevo/data/cues.py
# render 4 phần (0–59, 59–118, 118–177, 177–hết) → out/hist/sarajevo/parts/, ghép, trộn: channels/hist/PIPELINE.md
python3 tools/hist/mix.py hist/sarajevo --video out/hist/sarajevo/silent.mp4 --out out/hist/sarajevo/mix.mp4 --music-db -16
```

## Dữ kiện + nguồn
- Phần mở bài + bối cảnh (bản 3): H. G. Wells, "The War That Will End War" (1914); Đức thống nhất 1871; thép 1913: Đức 17.6,
  Anh 7.7 triệu tấn (P. Kennedy, *The Rise and Fall of the Great Powers*, bảng 21); Đế quốc Anh ≈ 1/5 diện tích đất (≈ 1913);
  Bülow 1897 "we demand our own place in the sun"; Liên minh Tam cường 1882 (Đức, Áo-Hung, Ý), Hiệp ước Tam cường hoàn tất 1907;
  Áo-Hung sáp nhập Bosnia 1908 (khủng hoảng Bosnia), Serbia phản đối — [Triple Entente](https://en.wikipedia.org/wiki/Triple_Entente),
  [Bosnian crisis](https://en.wikipedia.org/wiki/Bosnian_Crisis).
- Sarajevo 28/6/1914; sáu người ám sát rải dọc tuyến đường; bom Čabrinović nảy khỏi mui gập, nổ dưới xe sau; đại công tước
  thăm người bị thương; tài xế không được báo đổi lộ trình, rẽ nhầm, chết máy khi lùi ở gần tiệm Schiller; Princip (sinh
  25/7/1894, 19 tuổi) bắn hai phát; Franz Ferdinand và Sophie chết —
  [Assassination of Archduke Franz Ferdinand](https://en.wikipedia.org/wiki/Assassination_of_Archduke_Franz_Ferdinand).
- Nhóm Young Bosnia, được hội kín **Black Hand** (Serbia) cấp vũ khí — KHÔNG vẽ "nước Serbia ra lệnh" như Thanh Pahm.
- Čabrinović nuốt xyanua quá hạn (chỉ nôn) và nhảy xuống sông Miljacka sâu ~13 cm (≈ 5 inch); ở toà thị chính FF ngắt
  lời thị trưởng: đến thăm mà bị đón bằng bom; Potiorek la tài xế Lojka đi sai đường; xe chết máy khi lùi; Princip cách
  ~1.5 m (≈ 5 ft); hai phát — Sophie, rồi FF; cả hai chết trong vòng một giờ. Chuyện Princip đi mua bánh mì kẹp là huyền
  thoại về sau (cùng trang Wikipedia trên; [Smithsonian — sandwich myth](https://www.smithsonianmag.com/history/gavrilo-princips-sandwich-79480741/)); hai người chết trước 11:30 (Wikipedia, McMeekin 2013). Đã đối chiếu 2026-10-27.
- Áo-Hung tuyên chiến Serbia 28/7/1914; Anh tham chiến 4/8 (một tuần sau — "within a week, half of Europe") — [July Crisis](https://en.wikipedia.org/wiki/July_Crisis).
