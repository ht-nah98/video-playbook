# Mổ video thắng cùng ngách — số thật từ YouTube Data API (chụp 2026-10-28)

Hệ phân tích: `../README.md`; quyết định tập đầu: `projects/hist/wrong-turn/`. Dữ liệu: 28 kênh (`../rivals.json`), 2 351 video 24 tháng, 1 599 video dài → điểm vượt
trội ở `outliers.csv` (`tools/hist/market/pull.py` → `outliers.py`). Lưới thumbnail:
`out/hist/market/thumbs/sheet.jpg`. Chưa có khối lượng tìm kiếm (vidIQ hồi credit 30/10) và chưa có tốc độ (chụp lại 04/11).

## 1. Phát hiện chính
1. **Kênh hoạt hình MỚI thắng được — có bằng chứng thật.** `@animatedhistoryy` (lập 05/10/2025, 99k sub, 20 video):
   trung vị 583k view/video, 5 video > 900k. Khuôn: **"N Years of X History in M Minutes"** / "The ENTIRE History of X".
   `@heyhistorically` (1.6M sub): video dài trung vị 2.6M — "The ENTIRE History of ROME" 10.1M, CHINA 7.8M, "How WW2 Began" 3.8M,
   "WORLD WAR 1" 2.0M (dưới trung vị kênh).
2. **"[No AI]" là tín hiệu thị trường.** Historically gắn "[No AI]" vào MỌI video dài; Serious History đặt nhãn "NO AI" lên
   thumbnail; Epimetheus ghi "(no slop)". Khán giả ngách này chủ động tránh nội dung AI → rủi ro trực tiếp cho kênh mình
   (giọng clone AI). Hình của mình vẽ bằng code + ảnh thật (không phải ảnh AI) — điểm cần giữ và có thể nói ra.
3. **Iran–Mỹ: cầu có thật nhưng thuộc các kênh giải thích lớn.** RealLifeLore "How The US & Iran Became Arch-Enemies" 3.7M (494
   ngày — đúng câu hỏi agent kia đề xuất, đã có người làm); Johnny Harris 6.4M; fern 8.3M. Nhưng kênh hoạt hình: Animated History
   Iran 42k sau 5 ngày, Afghanistan 100k, Venezuela 76k — **các nước đang có thời sự là video YẾU NHẤT của kênh đó**; Israel /
   Nga / Trung / Đức (cường quốc, tò mò lâu dài) mới > 800k. Simple History "How the Biggest Global Powers have dealt with Iran"
   0.2× trung vị.
4. **Butler yếu, không phải tín hiệu.** Serious History Butler 479k = 0.35× trung vị kênh (1.38M). Kênh này thắng bằng
   **tuyển tập** ("Extreme Vigilante Justice" 7.5M, "Nice People Who Snapped" 3.7M), không bằng một nhân vật.
5. **Câu hỏi tò mò + nghịch lý** hiệu quả ở kênh vừa: SideQuest (677k sub) "What If You Invested in the Nazi Stock Market?"
   644k, "Why Didn't China Conquer Korea?" 699k; Mr Beat "Every Time the United States Overthrew a Foreign Government" 6.8×.
6. **Đời sống người thường** có bằng chứng ở kênh mới: Animistry (22k sub) "What Was Life Like In Medieval London?" 626k.

## 2. Khuôn thumbnail của ngách (lưới 23 thumbnail)
| khuôn | ai | đặc điểm |
|---|---|---|
| **trước / nay** | Animated History | khung tách đôi: trái nhân vật cổ + năm xưa, phải lãnh đạo nay + "2026", bản đồ đổi màu giữa; MỘT chữ to cuối ảnh "HOW? / WHY? / STOLEN? / Sh*t…" |
| **cảnh minh hoạ cảm xúc** | Historically | tranh vẽ đầy khung, nhân vật đầu tròn khóc / hoảng ở tiền cảnh, cảnh hỗn loạn sau lưng, KHÔNG chữ |
| **nền trắng + mũi tên** | Serious History | 1–2 nhân vật biếm hoạ, chữ đen hoa 2–3 từ ("KILLED RACISTS", "FATHER'S KILLER"), mũi tên đỏ, nhãn NO AI |
| bản đồ + cờ + mặt | RealLifeLore, Johnny Harris | bản đồ thật, ghim cờ, mặt người thật — hình của kênh tài liệu, không phải ngách mình |

Title: ngắn, có đối tượng to (đế chế / chiến tranh / quốc gia), cấu trúc "The ENTIRE History of…", "N Years of … in M Minutes",
"How X Began", "Why Didn't X…", "What If You…"; chữ HOA một từ nhấn. Độ dài video thắng: 20–38 phút (dài thắng), SideQuest 9–13 phút.

## 3. Ứng viên tập đầu sau vòng này (chờ vidIQ 30/10 đo tìm kiếm)
| | lời hứa | bằng chứng | rủi ro |
|---|---|---|---|
| **A. Thế chiến bắt đầu thế nào** (WW1 — "How a Wrong Turn Started World War 1") | một cú rẽ nhầm của tài xế → 20 triệu người chết | "How WW2 Began" 3.8M, short "WW1 was a family argument" 4.0M, WW1 dài 2.0M (Historically); đồ nghề Sarajevo sẵn → dồn sức vào độ chỉn chu | đề tài đông người làm; WW1 dài của Historically dưới trung vị |
| **B. "The ENTIRE History of X"** (X = một cường quốc/đế chế khán giả Mỹ tò mò, chưa bị Historically / Animated History làm) | cả nghìn năm trong 20–30 phút, kể hài | khuôn thắng ở CẢ kênh mới 99k sub lẫn kênh lớn; bền, không thời sự | khối lượng việc lớn nhất; phải chọn X không trùng |
| **C. Iran–Mỹ, góc nghịch lý hẹp** ("How America Accidentally Created Its Worst Enemy" — 1953 → 1979 → Iran-Contra) | Mỹ tự tay tạo kẻ thù | RealLifeLore 3.7M, Johnny Harris 6.4M, Mr Beat coups 6.8× | đúng câu đã có kênh lớn làm; chiến sự đang diễn ra; kênh hoạt hình làm nước thời sự thì yếu |

**Đề xuất của mình:** A hoặc B làm tập đầu, C để tập sau khi kênh đã có khán giả. Rủi ro chung phải bàn: nhãn "No AI" — giọng clone.
