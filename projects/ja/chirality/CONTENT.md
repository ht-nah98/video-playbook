# ja/chirality — Pha 0: bóc tách nội dung

**Chủ đề:** 鏡の中の分子 ― 2026年ノーベル化学賞 (tên tạm) · lời đọc tiếng Nhật, giọng Jaikyu · nguồn: người dùng gửi
2026-10-13 bản bóc lời một video tiếng Việt về Nobel Hóa 2026 — nguyên văn ở `SCRIPT.vi.md`.
**Người dùng giao:** tìm kiếm, hoàn thiện, bổ sung; giải thích đầy đủ, rõ; mở rộng sang hoá học; tự nghiên cứu hình.
**Kênh:** 99の発見 (người dùng chọn 2026-10-13). Bài đầu tiên của kênh về HOÁ — giữ góc toán của kênh (đường cong phi
tuyến, dãy lặp, đồng xu) làm xương sống.

**Nghiên cứu (đầy đủ, có URL):** `research/R1-nobel.md` (tư liệu Nobel chính thức + báo Nhật), `research/R2-science.md`
(lịch sử + hoá + thuốc, mỗi ý gắn [V] đọc tận nguồn / [S] tóm tắt / [M] trí nhớ), `research/R3-visual.md` (hình, DNA, ảnh).
Phân tử 3D thật (PubChem, R/S kiểm lại bằng RDKit, gương x→−x khớp ≤ 0.01 Å quanh tâm bất đối): `data/molecules/*.json`.
Nguồn sơ cấp đã tải: press release, popular background, scientific background của KVA (bản sao ở scratchpad, không commit).

**Độ dài ước:** ~16 phút (mạch 9 phần dưới; đo lại theo mora khi có SCRIPT).

## Mạch bài — một câu hỏi xuyên suốt: 「鏡の中のもう一人を、化学はどうやって追い出したのか」
| # | phần | ý | trả lời câu hứa |
|---|---|---|---|
| 0 | mở bài | hai bàn tay, không chồng khít; phân tử cũng có tay; sự sống chỉ dùng một tay, phòng thí nghiệm luôn ra 50/50 → "bí ẩn hơn một thế kỷ" (Linke). 7/10/2026 Nobel: Kagan (95) + 硤合憲三 (76) — người Nhật thứ 10 đoạt Nobel Hoá, nghe tin lúc đi chợ gần nhà. **3 câu hỏi** | — |
| 1 | 鏡の中の分子 | Pasteur 1848 (25 tuổi): muối natri-amoni của axit racemic, tinh thể hai dạng gương, nhíp, phân cực ánh sáng ngược nhau bằng nhau; Kelvin 1893 đặt "chiral" (χείρ = tay); van 't Hoff & Le Bel 1874: carbon tứ diện + 4 nhóm khác nhau → ảnh gương không chồng khít (đổi 2 nhóm = ra ảnh gương). Ẩn dụ thợ khoá của uỷ ban: chìa luôn ra hai bản gương, chỉ một vừa ổ | nền |
| 2 | 体は鏡を見分ける | sự sống đồng thủ tính: axit amin dạng L, đường trong DNA/RNA dạng D; thụ thể = găng tay. Carvone: R = bạc hà, S = thì là (caraway). Thalidomide: Đức 10/1957, Nhật 1/1958 (イソミン); > 1 vạn trẻ (ước tính) toàn cầu; Nhật dừng 9/1962 — trễ 10 tháng so với Tây Đức; Nhật công nhận 309 nạn nhân. **Hai dạng tự chuyển qua lại trong cơ thể** (vài giờ) → thuốc tinh khiết một dạng cũng không cứu được; cereblon tìm ra 2010 bởi nhóm Nhật (伊藤・半田, 東京工業大学); nay dùng trị đa u tuỷ (Nhật duyệt lại 2008) | câu 1 |
| 3 | なぜ半分ずつになるのか | phân tử phẳng bị tấn công từ hai mặt, hai đường năng lượng bằng nhau tuyệt đối → 50/50 (racemic). Muốn lệch: chất xúc tác bất đối = kim loại (động cơ) + phối tử bất đối (tay lái). DIOP — Kagan 1971, làm từ axit tartaric (vòng lại Pasteur!). Nobel 2001: Knowles, 野依良治, Sharpless; Takasago làm l-menthol bằng BINAP ~1 000 t/năm ≈ 1/3 nhu cầu thế giới (Noyori 2001). Kagan không có tên năm ấy; Nature 2001 ghi phản đối của Pháp | nền cho câu 3 |
| 4 | 紙の上の答え (1953) | F. C. Frank, nhà vật lý lý thuyết Bristol: 3 điều kiện cho đồng thủ tính tự phát — ① xúc tác bất đối + phản ứng bất đối ② một dạng được tăng, dạng kia bị kìm ③ phản ứng tự tạo ra chất xúc tác của mình (tự xúc tác) → tăng theo hàm mũ. Ba ô đánh dấu theo suốt bài (uỷ ban dùng đúng cách này) | khung câu 2 |
| 5 | 非線形効果 (Kagan 1986) | trước đó ai cũng giả định: độ tinh khiết sản phẩm tỉ lệ THẲNG với độ tinh khiết xúc tác. Kagan 1986 (JACS 108, 2353; 3 phản ứng): đường CONG. Cơ chế cặp: phối tử 75:25 ghép đôi ngẫu nhiên → RR 56%, LR 38%, LL 6%; cặp lẫn (LR) gần như đứng yên → phản ứng chạy như 90:10 (ví dụ minh hoạ của uỷ ban). Noyori 1989: xúc tác 15% ee → sản phẩm 95% ee. Ô ② được đánh dấu | câu 2 (nửa) |
| 6 | 自分をコピーする分子 (Soai 1995 → 2003) | Soai thấy xúc tác và sản phẩm giống nhau → sản phẩm tự làm xúc tác cho chính nó. 1995 (Nature 378, 767): 2% → 10 → 57 → 81 → 88% sau 4 vòng (bảng của chính bài báo). 2003: 0.00005% → 57 → 99 → > 99.5% sau 3 vòng; dạng chiếm đa số nhân ~630 000 lần, dạng kia < 1 000 lần. Dãy lặp xₙ₊₁ = f(xₙ) + đồ thị mạng nhện; Ô ③ đánh dấu. Mô hình kênh: lặp đường cong Kagan y = 2x/(1+x²) → 2 → 4 → 8 → 16 → 31 → 56 → 86 → 99% (ghi rõ 「モデル」) | câu 2 |
| 7 | コインを投げる (対称性の破れ) | không thêm gì bất đối: 37 lần chạy → S 19, R 18 — như tung đồng xu; tung 100 đồng ra đúng 50/50 chỉ ~8% → luôn có một chút lệch, phản ứng phóng đại nó. Mồi lệch nhỏ từ thạch anh (1999), deuteri (2000), ánh sáng phân cực tròn (2005), ¹³C (2009). Uỷ ban nói rõ: phản ứng Soai là nhân tạo, không chạy trong nước, không phải cách sự sống đã làm | **bất ngờ** của câu 3 |
| 8 | 薬はどう変わったのか | FDA 1992 chính sách đồng phân lập thể → thuốc mới gần như luôn là một dạng; công ty phải thử cả hai dạng. Hiệu ứng phi tuyến thành CÔNG CỤ chẩn đoán: đường cong cho biết phản ứng chạy thế nào → tối ưu để ra dạng tinh khiết (uỷ ban). Thẳng thắn: viên thuốc không làm bằng phản ứng Soai; điều đổi là hiểu biết | câu 3 |
| 9 | まとめ | trả lời 3 câu; 2% → gần như toàn bộ; giấc mơ trên giấy 1953 thành ống nghiệm; Soai: 「暗い地面を…ヘッドライトだけ」「まだまだ分からない。面白いことがあるはず」; câu hỏi: nếu sự sống bắt đầu lại, đồng xu sẽ rơi mặt nào? Biển 99の発見 | — |

**Ba câu hứa (đề xuất, sửa từ bản gốc):**
① 同じ原子でできた「鏡の双子」を、なぜ体は見分けられるのか
② たった数%の差が、どうして「ほぼ全部」になるのか
③ この発見は、私たちの薬をどう変えたのか ― 答えは少し意外です
(Bất ngờ: chính phản ứng được giải không vào viên thuốc; điều nó cho thấy là dạng tay sự sống chọn có thể chỉ do
một lần "tung đồng xu" được phóng đại — và hiệu ứng của Kagan mới là công cụ hằng ngày của nhà hoá học.)

## Soát sự kiện — CẦN SỬA (câu sai → câu đúng → nguồn)
1. **"Soai tạo DIOP đầu thập niên 1970"** → DIOP là của **Kagan** (Dang & Kagan, Chem. Commun. 1971, 481; JACS 94,
   6429, 1972); Knowles ghi công Kagan trong bài giảng Nobel. Soai lúc đó chưa có tiến sĩ (1979).
2. **"2% → khoảng 87% sau vài vòng"** → **2 → 10 → 57 → 81 → 88% sau 4 vòng** (Soai et al., Nature 378, 767, 1995,
   Table 1). Popular background của Nobel làm tròn 87%; lên hình dùng số của bài báo.
3. **"Đến 2003 gần như chỉ một dạng"** → đúng, kèm số: 0.00005% → 57 → 99 → > 99.5% sau 3 vòng (Angew. Chem. 42,
   315, 2003; popular background hình 6). Press release: "In 2003, he finally succeeded".
4. **Thalidomide "hai dạng tác động khác nhau"** → bổ sung: hai dạng **chuyển qua lại trong cơ thể** (bán thời gian
   cỡ vài giờ; Eriksson et al., Chirality 1995 — "abolished by rapid interconversion in vivo"); scientific background
   của Nobel cũng ghi "can interconvert in the body". KHÔNG nói "chỉ cần bán dạng tốt là tránh được".
5. **"Hơn 10 000 trẻ"** → 「1万人以上と推定」 (Wikipedia "Thalidomide scandal": > 10 000, có thể tới 20 000; 厚労省 /
   いしずえ: 数千人～1万人). Không dùng con số "40% tử vong" (chỉ có nguồn thứ cấp).
6. **"Bị thu hồi năm 1961"** → Tây Đức 11/1961 (sau cảnh báo của Lenz); **Nhật 9/1962** (厚労省) — điểm bản địa hoá.
7. **"Kagan bị bỏ vì giải chỉ tối đa 3 người"** → không nguồn nào nói đó là lý do (hồ sơ niêm phong tới 2051). Lời đọc:
   năm 2001 tên ông không có trong danh sách; giới hoá học Pháp phản đối (Nature 414, 239, 2001); 25 năm sau ông được
   gọi tên ở tuổi 95.
8. **Câu Linke** → đúng nguyên văn: "a chemical mystery that is over a century old: how homochirality can emerge
   spontaneously" (press release). **Câu Somfai** → AP: "This is probably the coolest experiment in organic
   chemistry" → 「有機化学でいちばん面白い実験」 kèm 「〜と評しました」.
9. **"Axit lấy từ cặn rượu vang"** → axit racemic không có sẵn trong nước nho; nó xuất hiện trong xưởng làm axit tartaric
   (Kestner, Thann, 1822). Lời đọc: 「ワイン造りから得られる酒石酸の仲間」.
10. **"Đường trong ADN dạng tay phải / axit amin tay trái"** → giữ hình ảnh "tay" nhưng gọi đúng tên L/D;
    **L/D không phải chiều quay ánh sáng** (L-alanine quay phải; D-fructose quay trái). Không nói "L = làm lệch trái".
11. **Tuổi Soai** — 76 (sinh 3/5/1950, Wikipedia; Nobel: "born 1950 in Hiroshima"). AP từng ghi nhầm 95, đã sửa 8/10.

## Đúng — giữ nguyên (đã kiểm)
| câu | kiểm |
|---|---|
| 7/10/2026, Viện Hàn lâm KH Hoàng gia Thuỵ Điển; "for the discovery of non-linear effects and autocatalysis in asymmetric organic synthesis"; mỗi người 1/2; 12 triệu SEK | press release KVA |
| Kagan sinh 15/12/1930, Boulogne-Billancourt; TS 1960 Collège de France; Université Paris-Sud | press release; nobelprize.org facts |
| 硤合憲三 (そあい けんぞう), sinh 1950 Hiroshima; TS 1979 ĐH Tokyo; 名誉教授 東京理科大学 (栄誉教授 từ 8/10/2026) | press release; 東京理科大学 |
| người Nhật thứ 10 đoạt Nobel Hoá; năm thứ 2 liên tiếp (sau 北川進 2025) | nippon.com, 日経 |
| nghe tin khi đi chợ gần nhà; 「受賞できても文句は言われないとは」; 「暗い地面を頭にヘッドライトだけを着けて」; 「まだまだ分からない。面白いことがあるはず」; 「学生の存在があって到達できた」 | Reuters JP, 産経, JST, 東京理科大学 (R1) |
| Pasteur trình bày 22/5/1848, 25 tuổi; muối natri-amoni racemate; chỉ tách thành hai dạng tinh thể dưới ~27 °C (may mắn về chất + điều kiện); quay ánh sáng bằng nhau, ngược chiều; trộn lại → không quay | R2-A; popular background |
| Kelvin, Robert Boyle Lecture, Oxford, 16/5/1893 (in 1894) đặt "chiral"; χείρ = bàn tay | R2-B (nguyên văn bài giảng) |
| van 't Hoff (1874) và Le Bel (1874) độc lập: carbon tứ diện | R2-C |
| carvone (R)-(−) = spearmint (bạc hà lục), (S)-(+) = caraway/thì là | R2-E |
| Frank 1953, Biochim. Biophys. Acta 11, 459; 3 điều kiện (nguyên văn popular background) | popular background; R2-J |
| ví dụ uỷ ban 75:25 → 56 / 38 / 6 → hiệu dụng 90:10 | popular background fig. 4; tính: 0.75² = 0.5625, 2·0.75·0.25 = 0.375, 0.25² = 0.0625; (0.5625−0.0625)/(0.5625+0.0625) = 80% ee → đúng 90:10 |
| Kagan 1986: Puchot, Samuel, Duñach, Zhao, Agami, Kagan, JACS 108, 2353; 3 phản ứng | R2-G; popular background |
| Noyori 1989 (JACS 111, 4028): DAIB 15% ee → 95% ee; cặp lẫn bền, không hoạt động | R2-G |
| Soai 1990: xúc tác 86% ee → sản phẩm chỉ 35% (chưa khuếch đại) | R2-I |
| 2003: đa số ×~630 000, thiểu số < 1 000 lần | BCSJ 2011; Soai Research Work |
| không mồi: S 19 / R 18 (37 lần) — Tetrahedron: Asymmetry 2003 | R1, R2-I |
| tung 100 đồng xu ra đúng 50 sấp 50 ngửa: C(100,50)/2¹⁰⁰ ≈ 7.96% | tính |
| mồi: thạch anh 1999, D 2000, CPL 2005, ¹³C Science 2009 | R2-I |
| cơ chế dimer: Blackmond, Brown et al. JACS 2001; Blackmond PNAS 2004 gọi Soai là xác nhận thực nghiệm mô hình Frank | R2-I |
| phản ứng Soai "is artificial, different to the chemistry of life"; không chạy trong nước | popular background; R1 |
| Nobel 2001: Knowles ¼, Noyori ¼, Sharpless ½; Wolf Prize 2001 chung Kagan–Noyori–Sharpless | R1 |
| Takasago l-menthol (BINAP–Rh) ~1 000 t/năm, ~1/3 nhu cầu thế giới | bài giảng Nobel của Noyori 2001 |
| Thalidomide: Contergan 10/1957; イソミン 1/1958; Nhật dừng bán + thu hồi 9/1962; 309 nạn nhân được công nhận | 厚労省 (R2-F) |
| cereblon: Ito, Handa et al., Science 327, 1345 (2010), 東京工業大学 | R2-F |
| thalidomide được dùng lại: Mỹ 1998 (phong), 2006 (đa u tuỷ); Nhật 16/10/2008 (đa u tuỷ) | R2-F |
| FDA policy 1/5/1992 về thuốc đồng phân lập thể | R2-K |
| Mỹ, thuốc mới tổng hợp hoá học (NME phân tử nhỏ) duyệt 2013–2022: racemic 3.6% (2003–2012: 11%) | McVicker & O'Boyle 2024 (R2-K) |
| thalidomide được dùng cho phụ nữ mang thai bị ốm nghén (つわり) | Wikipedia "Thalidomide scandal" |
| caraway (キャラウェイ) là gia vị của bánh mì lúa mạch đen (ライ麦パン) | Wikipedia "Caraway" |
| 野依良治 — 名古屋大学 khi nhận Nobel 2001 | nobelprize.org 2001 |
| Frank viết bài 1953 vì đồng nghiệp nói hoá học chưa giải thích được, lời giải toán sẽ giúp | popular background KVA tr.3 |

## Lấp thông tin (đề xuất — đã có trong mạch)
1. **Vì sao 50/50** (bản gốc chỉ nói "luôn 50/50"): hai mặt của phân tử phẳng đối xứng gương → hai đường năng lượng y
   hệt → xác suất bằng nhau. Đây là chỗ bắc cầu sang toán (xác suất, đối xứng).
2. **Frank 1953 là MỘT BÀI TOÁN** — đúng chất kênh: nhà vật lý đưa lời giải trên giấy, hoá học mất 50 năm làm thật.
   Ba ô đánh dấu (① thế kỷ 20 / 2001, ② Kagan 1986, ③ Soai 1995–2003) là xương sống hình của cả bài.
3. **Đường thẳng vs đường cong** — vẽ y = x (giả định cũ) cạnh đường của Kagan; mô hình đơn giản y = 2x/(1+x²) (cặp lẫn
   hoàn toàn không hoạt động, ghép đôi ngẫu nhiên): ee_xt = x → RR−LL ∝ x, RR+LL ∝ (1+x²)/2. Ghi 「単純なモデル」.
4. **Dãy lặp và đồ thị mạng nhện** — Soai = áp đường cong lên chính nó nhiều lần; x = 0 là điểm cân bằng KHÔNG bền,
   ±100% là điểm bền → giải thích vì sao lệch nhỏ nào cũng bị đẩy ra một phía.
5. **Đồng xu** — 37 lần ra 19/18; tung 100 đồng chỉ ~8% ra đúng 50/50 → "hoàn toàn cân bằng" mới là hiếm.
6. **Bản địa hoá Nhật** (dưới).

## Bản địa hoá
1. **硤合憲三** — người Nhật thứ 10 đoạt Nobel Hoá, năm thứ hai liên tiếp sau 北川進; đi chợ ở 志木 khi nghe tin; câu
   "đèn đội đầu" để kết.
2. **野依良治 (Nobel 2001) + Takasago menthol** — người Nhật đã mở cửa xúc tác bất đối; bạc hà trong kẹo cao su là
   menthol một dạng tay → nối với carvone.
3. **サリドマイド薬害 ở Nhật** — trễ 10 tháng, 309 nạn nhân, kiện tụng 1974 (国・大日本製薬); cereblon do nhóm 東工大 tìm
   ra 2010. Nói điềm tĩnh, không hình nạn nhân.
4. **Thuật ngữ:** 鏡像異性体 (エナンチオマー), キラル / キラリティー, ホモキラリティー, 不斉合成, 不斉触媒, 不斉自己触媒,
   非線形効果, 鏡像体過剰率 (ee — nói 「差」 trước, thuật ngữ sau), 自己触媒, 対称性の破れ, ラセミ体.
5. **Văn phong:** です/ます, câu ngắn một hơi, 皆さん, 3 câu hỏi đánh số như các bài trước.

## Tiếng hiệu ứng (docs/lesson/SFX.md — kênh ja dày ~1 tiếng / 3 s)
| khoảnh khắc | loại có sẵn / cần thêm | ghi chú |
|---|---|---|
| gương lật, phân tử xoay | whoosh / shimmer (có) | |
| nhíp gắp tinh thể | tick / click thuỷ tinh | kiểm thư viện, thiếu thì tự tải CC0 |
| ống nghiệm, rót, sủi | glass clink, pour, bubble | cần tải CC0 |
| ô đánh dấu Frank | chime / stamp (có) | |
| tung đồng xu | coin flip | cần tải CC0 |
| bộ đếm vòng Soai | tick tăng dần | |

## Ảnh (Wikimedia Commons → tôi tự tải và soi; còn lại người dùng tải) — chi tiết + giấy phép ở `research/R3-visual.md`
| file | nội dung | loại | ghi chú |
|---|---|---|---|
| Louis Pasteur (nhà hoá học & vi sinh Pháp, 1822–1895) | chân dung | thật, PD | Commons |
| William Thomson, 1st Baron Kelvin (nhà vật lý Anh, 1824–1907) | chân dung | thật, PD | Commons |
| tinh thể tartrate thật của Pasteur (Musée Pasteur) | hiện vật | CC BY 4.0 | ghi credit |
| polarimeter Laurent (khắc gỗ) | hiện vật | PD | |
| lọ Kevadon 1960 (FDA), Frances Oldham Kelsey với JFK 1962 | lịch sử thalidomide | PD | không hình nạn nhân |
| Henri B. Kagan (nhà hoá học Pháp, sinh 1930) — `File:Henri Kagan (2014).jpg` | chân dung | CC BY-SA 2.0 | ghi credit |
| 硤合憲三 Kenso Soai (nhà hoá học Nhật, sinh 1950) | chân dung | Commons chỉ có bản 100×135 (CC BY 4.0) | **người dùng tải** ảnh dùng được (vd. trang 東京理科大学) hoặc vẽ không cần ảnh |
| Frederick Charles Frank (nhà vật lý Anh, 1911–1998) | chân dung | không có bản tự do | bỏ ảnh, dùng trang bài báo vẽ lại |
| hình của Nobel/KVA | tham khảo | © KVA | KHÔNG lên hình — tự vẽ lại |

## Hình cần đúng (tính trong code, ném lỗi nếu sai)
- phân tử lấy từ `data/molecules/*.json` (PubChem 3D); dạng gương VẼ BẰNG phép phản chiếu một file (đúng tuyệt đối);
  `must` nhãn R/S đúng file.
- tứ diện CHFClBr: xoay mọi hướng không chồng khít ảnh gương (kiểm bằng định thức dấu của 3 vector nhóm).
- 0.75² / 2·0.75·0.25 / 0.25² → 56 / 38 / 6 (làm tròn) và 90:10 hiệu dụng.
- dãy 1995 = [2, 10, 57, 81, 88] (số bài báo, không tính); dãy 2003 = [0.00005, 57, 99, >99.5]; dãy mô hình lặp
  y = 2x/(1+x²) từ 0.02 tính trong code, nhãn 「モデル」.
- C(100,50)/2¹⁰⁰ ≈ 0.0796; 19 + 18 = 37.

> Mọi con số / năm / tên lên hình PHẢI có ở file này (DNA: không thêm sự kiện không nguồn).
