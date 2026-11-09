# logarithm — Pha 0: bóc tách nội dung

**Chủ đề:** One Number Tells You When Your Money Doubles · lời đọc tiếng Anh · nguồn: bài người dùng gửi 2026-10-20
"Bản chất của logarit" — nguyên văn ở `SCRIPT.vi.md`. Người dùng chọn kênh Anh + gói A (quy tắc 72) 2026-10-20.

## Cổng ý tưởng (docs/lesson/PACKAGING.md §1)
- **Góc nhìn gốc trượt cổng:** "Bản chất của logarit" = tên chương. Cứu bằng móc CÓ SẴN của người dùng (LESSONS §124):
  quy tắc 72 — "một con số nói khi nào tiền gấp đôi", kiểu LUÔN ĐÚNG đến khó tin (8% → 9 năm 2 ngày).
- **Thumbnail một vật + ≤ 3 từ:** chồng xu → chồng gấp đôi, ×2, số 「72」 rất to.
- **3 câu hỏi có mâu thuẫn:** 1. Logarit thật ra là gì? 2. Vì sao nó biến nhân thành cộng, và vì sao điều đó đáng giá
  400 năm trước? 3. 72 từ đâu ra (khi toán nói 69.3)?
- **Người lạ có quan tâm?** Ai cũng có tiền tiết kiệm / lãi suất → có.
- **Trần + ngoại lệ:** chưa đo (vidIQ hết hạn). "Rule of 72" là cụm người ta tìm; đo lại trước khi đăng.
- **80% khán giả bài trước:** cùng chuỗi "điều quen → toán phía sau" (pi, trig). Đạt.

## Mạch bài (giữ 5 phần của người dùng, đổi mở đầu)
| # | phần gốc | hồi | trả lời |
|---|---|---|---|
| 0 | Giới thiệu (8% → 9 năm) | Cold open bốn nhịp: 8% → 9 năm; 6/12/3% → 12/6/24; 72 ÷ lãi; thật = 9 năm 2 ngày → "không phải mẹo, là logarit 400 tuổi" → động đất / âm thanh / chanh / kiến–cá voi | hứa cả 3 |
| 1 | P1 câu hỏi ngược | ACT ONE The question, backwards (viên gạch) | **Q1** |
| 2 | P2 đo theo bậc | ACT TWO Counting zeros (kiến ↔ cá voi 11 bậc) | Q1 (vì sao hữu ích) |
| 3 | P3 nhân → cộng | ACT THREE Multiplication becomes addition (Napier 1614, Briggs, bảng, thước trượt) | **Q2** |
| 4 | P4 thang logarit | ACT FOUR Rulers that count powers (động đất, dB, pH, giác quan) | mở rộng |
| 5 | P5 số e | ACT FIVE Where seventy-two comes from (Bernoulli 1683, e, ln 2, 69.3, vì sao 72) | **Q3** (lời hứa title) |
| 6 | Kết | ACT SIX Putting it together + Next time | |

## Soát sự kiện — CẦN SỬA
- "Quy tắc 72 (thực tế là 69,3 được làm tròn lên để dễ tính nhẩm)" — chỉ đúng một nửa. Thời gian gấp đôi với lãi nhập
  gốc MỖI NĂM: t = ln 2 / ln(1 + r/100) ≈ 69.3/r + 0.35 năm (chậm hơn lãi liên tục khoảng 1/3 năm). 72/r khớp đúng
  ở r ≈ 7.8–7.9% (tính bằng code). Ngoài ra 72 chia hết cho 2, 3, 4, 6, 8, 9, 12. → SCRIPT nói cả hai lý do + "drifts
  at extreme rates" (36% → 72 nói 2 năm, thật 2.25; 72% → 1 vs 1.28).
- Tiền "triệu đồng" → đô la (kênh Anh): $1,000 ở cold open, $1 ở ví dụ e.
- "Cảm giác hoạt động theo logarit" → giữ "seem to" (định luật Weber–Fechner là xấp xỉ, không chính xác mọi mức).

## Đúng — giữ nguyên (đã kiểm bằng code 2026-10-20)
| sự kiện | giá trị | ghi chú |
|---|---|---|
| 8% gấp đôi (lãi năm) | 9.006 năm = 9 năm 2.4 ngày → "nine years and two days" | ln 2 / ln 1.08 |
| 72 ÷ 6 / 12 / 3 | 12 / 6 / 24 (thật 11.90 / 6.12 / 23.45) | "Six percent? Twelve years…" |
| 2³ = 8 · log₂ 8 = 3 · log₁₀ 1000 = 3 · log₃ 81 = 4 · log₅ 5 = 1 · log 1 = 0 · log₂(1/8) = −3 | | |
| log₁₀ 5000 = 3.70 (giữa 3 và 4) | | |
| kiến vài mg (1–5 mg) ↔ cá voi xanh > 100 tấn (tới ~150–190 t) | 3 mg ↔ 150 t = 10^10.7 → "about eleven steps"; 1 mg ↔ 100 t = 10^11 = "a hundred billion" | |
| 8 × 4 = 32 · log₂ 32 = 5 = 3 + 2 | | |
| John Napier (nhà toán học Scotland, 1550–1617), "Mirifici Logarithmorum Canonis Descriptio", 1614 | | MacTutor "Napier" |
| Henry Briggs (nhà toán học Anh, 1561–1630), bảng log cơ số 10 đầu tiên 1617, "Arithmetica Logarithmica" 1624 | "within a few years" | MacTutor "Briggs" |
| bảng log + thước trượt (Gunter ~1620, Oughtred ~1622) dùng tới máy tính bỏ túi thập niên 1970 | ≈ 350 năm → "three and a half centuries" | |
| Laplace: logarit "doubled the life of the astronomer" | lời thường được trích, nói "is often quoted as saying" | |
| Độ lớn động đất +1 → biên độ ×10, năng lượng ×10^1.5 ≈ 31.6 ≈ "about thirty-two" | USGS | |
| dB: ngưỡng nghe 0 dB ↔ ngưỡng đau ~120–130 dB → ×10^12 = "about a trillion"; +10 dB = ×10 cường độ | | |
| pH nước tinh khiết 7 (25 °C), nước chanh ~2 (2.0–2.6) → 10^5 = "a hundred thousand" | | |
| Jacob Bernoulli (nhà toán học Thuỵ Sĩ, 1655–1705), bài toán lãi kép 1683 → e | MacTutor "e" | |
| (1+1/n)^n: n=1 → 2 · 2 → 2.25 · 12 → 2.613 · 365 → 2.7146 · 8760 → 2.71813 · giới hạn e = 2.71828 | "about two dollars and seventy-two cents" | |
| ln 2 = 0.693 → 69.3 / r | | |
| Logarit "hơn 400 năm" | 1614 → 2026 = 412 năm | |

## Tiếng hiệu ứng
Chờ DNA.

## Ảnh (tự lấy — Commons API)
| key | nội dung | loại |
|---|---|---|
| napier | chân dung John Napier (1550–1617) | thật (tranh đời đó / sau) |
| descriptio | trang tên "Mirifici Logarithmorum Canonis Descriptio" 1614 | hiện vật |
| logtable | trang bảng logarit in (Briggs hoặc bảng thế kỷ 19–20) | hiện vật |
| sliderule | thước trượt (slide rule) | hiện vật |
| seismogram | băng địa chấn thật | thật |
| bernoulli | chân dung Jacob Bernoulli | thật |
| bluewhale / ant | cá voi xanh, con kiến (ảnh thật, tuỳ DNA) | thật |

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
Mọi số ở bảng "Đúng" ở trên; 72 ÷ r cho r = 3, 6, 8, 12; ln 2 / ln(1 + r) cho cùng r; 9 năm + 2 ngày; 10^1.5 ≈ 32;
10^12; 10^5; (1 + 1/n)^n cho n = 1, 2, 12, 365; ln 2 = 0.693.
- 69.3 ÷ 6 = 11.55 năm (lãi liên tục 6%) → "about eleven and a half years" (SCRIPT ACT FIVE, thay câu chữ r vì OmniVoice đọc r thành "our").
- Dựng cảnh (2026-10-20): "+2.7" = 72 − 69.3 (miếng vá ở b16) · "≈ 350 YEARS" = three and a half centuries (b17) · 36% → 72 nói 2 năm, thật 2.25; 72% → 1 vs 1.28 (b16).
