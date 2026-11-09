# ja/2048 — Pha 0: bóc tách nội dung

**Chủ đề:** 2048の数学 ― なぜ私たちは負けるのか (tên tạm) · lời đọc tiếng Nhật, giọng Jaikyu · nguồn: người dùng gửi
2026-10-12 lời bình một video của kênh khác ("Ratio") — nguyên văn ở `SCRIPT.vi.md`.
**Người dùng chốt 2026-10-12:** bám sát bản gốc, KHÔNG chạy lại mô phỏng; viết lại bằng lời của kênh, bổ sung nếu cần,
tối ưu cho người Nhật, thành đúng chất 99の発見.

**Độ dài ước:** 132 dòng, 5 121 mora ÷ 6.6 ≈ 12.9 phút lời + ngắt ≈ **~14 phút** (+ intro 20.7 s). Mở bài 20 dòng ≈ 1.7 phút.

## Mạch bài (giữ 6 phần của bản gốc)
| # | phần | ý | trả lời câu hứa |
|---|---|---|---|
| 0 | mở bài | (2026-10-19) 1時間 vs 1000時間: hai bàn chơi thật — khác ở 並べ方, sau đó là toán; 4×4, 2 luật; Cirulli 2014, 19 tuổi, một cuối tuần, > 4 triệu lượt trong < 1 tuần (Threes! / 1024 chỉ ở mô tả); bấm bừa 200 000 ván không tới 1024; máy "biết tính" tới 32768, 65536; tường 131072. **3 câu hỏi** | — |
| 1 | 合計は消えない | tổng bảo toàn khi gộp/trượt; chỉ ô mới thêm, trung bình +2.2/lượt (保存則, như 質量保存の法則); 2048/2.2 ≈ 930 lượt, đo thật 1018 → ~1000 quyết định | câu 1 |
| 2 | 131072の壁 | bậc thang: ô 2^k cần hai 2^(k−1) kề nhau, đệ quy → mỗi luỹ thừa một ô + đáy hai ô; 16 ô: 4,4,8,…,65536 → 2^17 (等比数列); đáy là 4 vì ô mới có thể là 4 (chỉ 2 → 65536); lớn hơn cần 17 ô; ~60 000 lượt | câu 2 |
| 3 | なぜ角に集めるのか | dồn góc + hình rắn = bậc thang xếp sẵn, gộp dây chuyền; ô lớn giữa bàn chắn đường; luật cố định ↓←→↑: 512 nhiều gấp ~200 lần bấm bừa, 1024 chỉ 5 lần / 200 000 | câu 1 |
| 4 | 相手の名は「運」 | ô mới ngẫu nhiên; 4 hướng × (15 ô trống × 2 giá trị = 30); 18^16 ≈ 1.2×10^20 (1.2垓); 将棋AI = minimax ↔ Michie 1966 nút may rủi lấy kỳ vọng → Expectimax; 1 nước 71.5%, 2 nước ~96%, mỗi tầng ×~100 | câu 3 |
| 5 | 自分で学ぶ機械 | tự chơi hàng triệu ván; chấm afterstate (trước khi ô mới rơi); TD learning; Szubert & Jaśkowski 2014 97%; 松崎公紀 (高知工科大学); Đài Loan 2016 nhiều chặng, 1 ván 65536 / 10 000; 2021 72% tới 32768 | câu 3 |
| 6 | 勝ち続けることはできるのか | dự án bảng tra + tìm kiếm: 16384 99.9%, 32768 86.1%, 65536 8.4% (1 200 ván) → ~1/12; cuối ván còn 1–2 ô trống; ô thứ 16 phải là ô 4 vừa rơi → chờ may 1/10 | câu 1 |
| 7 | まとめ / 次回 | trả lời 3 câu; thử chơi dồn góc; biển 99の発見 | — |

## Soát sự kiện — ĐÃ SỬA (trong SCRIPT.md)
1. **"Phần lớn người chơi đều thua"** — không nguồn → bỏ.
2. **"32.000", "65.000"** → 32768, 65536 (tên ô đúng).
3. **Đài Loan 2016** (Yeh, Wu và cộng sự, "Multi-Stage Temporal Difference Learning for 2048-like Games", IEEE TCIAIG
   9, arXiv 1606.07374): 32768 đạt 31.75% / 10 000 ván, MỘT ván ra 65536 — "lần đầu tiên, theo hiểu biết của tác giả".
   Lời đọc thêm "1万回のうち、たった1回" + 「著者たちによれば」.
4. **Expectimax:** Michie 1966 ("Game-playing and game-learning automata", Machine Intelligence) đề xuất cách tính nút
   may rủi trong cây trò chơi (expectiminimax — Wikipedia, tài liệu giáo trình AIMA). Trò một người (2048) chỉ có nút
   ta + nút may rủi → gọi là expectimax. Lời đọc: Michie đưa ra CÁCH ĐỌC, dùng cho trò một người thì gọi エクスペクティマックス.
5. **Bản mạnh nhất "2025":** GitHub `game-difficulty/2048EndgameTablebase` — README: "Tested over 1,200 games", độ sâu
   tìm 1–9, không undo; 16k 99.9%, 32768 86.1%, 65536 8.4%; tìm kiếm + bảng tính sẵn. **Tự công bố**, trang không ghi
   năm → lời đọc 「開発者が公開した記録」, không nói năm.
6. **Ngôi "tôi cho máy chạy":** số mô phỏng (200 000 ván, 1018 lượt, ×200, 5 lần, 71.5%, 96%) là của video gốc, ta không
   chạy lại (người dùng chốt) → lời đọc không nhận là của kênh: 「〜させた実験があります」, 「シミュレーションで測ると」.

## Đúng — giữ nguyên (đã kiểm)
| câu | kiểm |
|---|---|
| Cirulli, người Ý, 19 tuổi ("web developer" — không phải "sinh viên" như bản gốc), viết trong một cuối tuần, 3/2014; > 4 triệu lượt trong chưa đầy một tuần | Wikipedia "2048 (video game)"; Cirulli trên Hacker News |
| lấy cảm hứng từ 1024, 1024 từ Threes! | Wikipedia; TechCrunch 24/3/2014; Cirulli: "a clone of Threes, although an indirect one" |
| kỳ vọng ô mới 0.9·2 + 0.1·4 = 2.2 | tính |
| 2048 / 2.2 = 930.9 | tính |
| 4+4+8+…+65536 = 4 + (2^17 − 4) = 2^17 = 131072; 16 ô (hai ô 4 + 2^3…2^16 là 14 ô) | tính |
| chỉ ô 2: 2+2+4+…+32768 = 2^16 = 65536 | tính |
| 131072 / 2.2 ≈ 59 578 → "gần 6 vạn" | tính |
| 15 ô trống × 2 = 30; 18^16 = 1.214×10^20 = 1.2垓 (> 10^8·10^8·10^4) | tính |
| mỗi tầng: 4 hướng × tới 30 kết quả ≈ ×100 | ước — đúng bậc |
| 1/0.084 ≈ 11.9 → "khoảng 12 ván" | tính |
| Szubert & Jaśkowski, ĐH Kỹ thuật Poznań (Ba Lan), CIG 2014: afterstate TD + n-tuple, > 97% thắng | trang dự án cs.put.poznan.pl |
| 2021: Guei, Chen, Wu, "Optimistic TD Learning for 2048" (IEEE Trans. Games): 72% tới 32768, có expectimax + nhiều chặng | arXiv 2111.11090 |
| 松崎公紀 (高知工科大学 情報学群): nhiều bài về AI 2048 (TD, multi-staging, backward temporal coherence — ACG 2017) | kutarr.kochi-tech.ac.jp; LNCS 10664 |
| ô thứ 16 phải là ô 4 mới rơi: số ô chỉ tăng khi sinh ô (gộp làm giảm, trượt giữ nguyên); bậc thang không có ô 2 | lập luận — đúng |

**Chưa kiểm được (của video gốc, người dùng chốt giữ):** 200 000 ván bấm bừa không tới 1024; trung bình 1018 lượt tới
2048; luật dồn góc ×200 tới 512, 5 lần tới 1024; expectimax 1 nước 71.5%, 2 nước ~96% (phụ thuộc hàm chấm điểm). Hợp
lý về bậc; nếu sau này cần, mô phỏng lại ~1 giờ.

## Bản địa hoá
1. **保存則 ↔ 質量保存の法則** (理科 中2 — người Nhật học "化学変化と質量保存") thay "năng lượng trong vật lý".
2. **1.2垓** — đơn vị đếm Nhật (万・億・兆・京・垓), kèm 「1億の1億倍の、さらに1万倍を超える」 cho dễ hình dung.
3. **将棋AI ↔ ミニマックス法:** người Nhật quen AI cờ tướng Nhật (thắng kỳ thủ chuyên nghiệp); đối thủ của 2048 không
   chơi tối ưu mà "gieo xúc xắc" — làm rõ vì sao cần kỳ vọng.
4. **松崎公紀 (高知工科大学):** người Nhật trong nghiên cứu AI 2048 (như 和算 trong bài π) — một câu, không phóng đại.
5. **Thuật ngữ:** 等比数列 (数学B), べき乗, 確率, 期待値 (数学A/B), 時間差分学習 (TD学習), 局面.
6. **Văn phong:** です/ます điềm tĩnh, câu ngắn một hơi, không あなた (皆さん), 3 câu hỏi đánh số như bài π.

## Credit (mô tả YouTube)
Video gốc (kênh Ratio) là nguồn mạch ý và số mô phỏng → ghi 「参考」 trong mô tả. Bài báo: Szubert & Jaśkowski 2014;
Yeh et al. 2016; Guei et al. 2021; 2048EndgameTablebase (GitHub); Michie 1966.

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
- mọi bàn cờ hiện trên hình chạy bằng luật 2048 thật (trượt + gộp một lần mỗi ô mỗi lượt), ô mới bằng `hash(i)`.
- tổng bàn trước/sau gộp bằng nhau; 0.9·2 + 0.1·4 = 2.2; 2048/2.2; bậc thang 16 ô cộng = 131072; 18^16.

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
