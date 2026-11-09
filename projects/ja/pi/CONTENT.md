# ja/pi — Pha 0: bóc tách nội dung (bài đầu tiên của 99の発見)

**Chủ đề:** 円周率の正体 ― なぜπは3.14なのか (tên tạm) · lời đọc tiếng Nhật, giọng Jaikyu · nguồn: người dùng gửi lại
2026-10-10 đúng bản tiếng Việt đã dùng cho bài tiếng Anh `projects/en/pi` (lời bình video mẫu "Bản chất thật của số Pi",
kênh khác) — nguyên văn ở `SCRIPT.vi.md`. **Dùng làm tư liệu, không dịch câu:** kịch bản viết mới bằng tiếng Nhật.

**Soát sự kiện:** đã làm kỹ ở `projects/en/pi/CONTENT.md` (mục sửa 1–10, bảng "Đúng — giữ nguyên" đã kiểm bằng python) —
áp NGUYÊN cho bài này, không chép lại. Ở đây chỉ ghi phần KHÁC: bản địa hoá cho người xem Nhật và sự kiện mới thêm.

**Độ dài ước:** 6 584 mora ÷ 6.6 mora/s ≈ 16.6 phút lời + ngắt (172 dòng) ≈ **18 phút** (+ intro 20.7 s). Mở bài ≈ 2.2 phút.
Tiếng Nhật chở ít ý hơn mỗi giây so với tiếng Anh (bài tiếng Anh cùng mạch: 10:44); phần thêm (東大, 和算, kỷ lục) ≈ 2.5 phút.
**Người dùng chốt 2026-10-10: GIỮ ~18 phút.** (Phương án cắt nếu cần: bỏ mục「100兆桁の先へ」(−0.9 phút) và rút「海を越えたアイデア」còn 3 câu (−0.8 phút).)

## Mạch bài (giữ mạch bài tiếng Anh, thêm 3 mục Nhật)
| # | phần | ý (tiếng Việt) | trả lời câu hứa |
|---|---|---|---|
| 0 | mở bài | "1+1 vì sao bằng 2?" → hai hòn đá; "π vì sao 3.14?" → im lặng, "máy tính hiện thế". Học ở **lớp 5 tiểu học Nhật**. Định nghĩa SGK chỉ cách ĐO. **Mới:** đầu những năm 2000 cả nước Nhật bàn tán "sắp dạy π = 3"; cũng thời đó đề 東大 hỏi "chứng minh π > 3.05" — "viết vì π = 3.14 thì 0 điểm, nhưng nửa đầu video này bạn sẽ giải được". 3 câu hỏi đánh số. Không ai chọn 3.14; số "xấu xí" nhưng vũ trụ chọn nó. Câu treo → intro | — |
| 1 | kẹp hình tròn | người xưa ĐO (Babylon 3 và 3.125, Ai Cập ≈ 3.16 — Rhind); Archimedes kẹp 6 → 96 cạnh, 3.1408 < π < 3.1429, 22/7. **Mới: giải đề 東大** — lục giác trong đường tròn đường kính 1 có chu vi đúng 3 (chưa đủ), 12 giác ≈ 3.106 (cạnh tính bằng 三平方の定理) ⇒ π > 3.05. **Mới: "ý tưởng vượt biển"** — 劉徽 (thế kỷ 3), 祖沖之 (7 chữ số, 355/113), rồi **和算 thời Edo**: 村松茂清 1663 (hơn 30 000 cạnh, 7 chữ số), 関孝和, 建部賢弘 1722 (phát hiện quy luật trong dãy chu vi, hơn 40 chữ số). π là **極限** (giới hạn) — ranh giới thẳng/cong | câu 1 |
| 2 | π là về sự quay | hiểu lầm "π là số của hình tròn" → gạch → **回転**. 360° là quy ước (Babylon cơ số 60, "được cho là"); **弧度法** (gặp ở cấp 3 Nhật — 数学II); 1 rad ≈ 57.3°; nửa vòng = π; τ = 2π một câu. Bóng của điểm quay = sóng sin → con lắc (2π trong chu kỳ), âm thanh, điện xoay chiều (cuộn dây quay trong máy phát) | câu 1 (trọn) |
| 3 | vì sao không bao giờ hết | 1/3 (Nhật ghi số lặp bằng **dấu chấm trên đầu** — đúng ký hiệu SGK Nhật), 1/7: số dư chỉ 6 khả năng ⇒ phải lặp; mọi phân số là **有限小数 hoặc 循環小数** (thuật ngữ SGK Nhật). Lambert 1761, Lindemann 1882 siêu việt; không có lý do một dòng (Niven 1947); hệ quả: **円積問題** không thể. **Mới: "100兆桁の先へ"** — 金田康正 (ĐH Tokyo, nhiều lần kỷ lục, 2002 vượt 1 nghìn tỉ chữ số), 近藤茂 (nhân viên văn phòng ở Nagano, máy tính ở nhà, cùng Alexander Yee, 10 nghìn tỉ chữ số 2011), 岩尾エマはるか (2022, 100 nghìn tỉ chữ số) — tính đến đâu cũng không lặp, vì đã chứng minh | câu 2 |
| 4 | khi C/d không bằng π | vòng tròn trên quả cầu: C/d < π; xích đạo quanh cực Bắc: đúng 2; yên ngựa: > π. Công thức SGK Nhật **「円周＝直径×円周率」** chỉ đúng trên mặt phẳng; vũ trụ phẳng (sai số < 1%); Einstein 1915, hố đen. "π không đổi — thế giới đổi" | câu 3 |
| 5 | まとめ | 4 câu gói 4 ý trên đúng hình của từng hồi | — |
| 6 | 次回 | thấy π trong công thức (√(2π) trong phân phối chuẩn, 1 + 1/4 + 1/9 + … = π²/6) → tìm vòng quay đang trốn. Cảm ơn + biển「99の発見」「チャンネル登録」 | — |

## Bản địa hoá — vì sao từng thay đổi
1. **"Lớp 6" → 小学5年:** chương trình Nhật dạy 円周率 3.14 ở lớp 5 tiểu học (学習指導要領 算数 第5学年); chữ π gặp ở
   lớp 7 (中1). Câu "bạn học từ lớp 6" sai với người Nhật.
2. **Móc 東大 2003:** đề 理系前期 第6問 (3/2003)「円周率が3.05より大きいことを証明せよ」 là giai thoại toán học nổi
   tiếng nhất Nhật về π; người xem Nhật biết. Nó **biến hồi 1 thành lời giải thật**: cách của Archimedes giải đúng đề
   này (lục giác = 3; 12 giác 12·sin 15° = 3.1058 > 3.05 — đã tính; 8 giác 3.0615 cũng đủ nhưng 12 nối tiếp mạch nhân đôi
   từ lục giác). Chuyện「円周率は3」: chương trình 1998 (áp dụng 2002) cho phép "tuỳ mục đích, dùng 3 để tính", báo chí
   và quảng cáo trường luyện thi loan thành "π sẽ là 3". Kịch bản chỉ nói "người ta bàn tán rằng sắp dạy π = 3" (đúng là
   tin đồn) và "cũng thời đó" có đề 東大 — **không khẳng định 東大 ra đề để phản đối** (chỉ là cách hiểu phổ biến).
3. **Van Ceulen → 和算:** người xem Nhật gần với 関孝和 (có trong SGK lịch sử) hơn một người Hà Lan. Ý giữ nguyên:
   cách của Archimedes sống gần 2 000 năm (250 TCN → 1722).
4. **Kỷ lục tính π:** ba người Nhật thật, số đã kiểm (nguồn dưới). Trả lời tự nhiên "nếu chữ số không hết thì sao người
   ta vẫn tính?" và cho người xem tự hào hợp lý. Không nhắc kỷ lục hiện tại (đổi liên tục; sau 2022 đã có bản dài hơn).
5. **Thuật ngữ SGK Nhật:** 極限 (giới hạn), 弧度法 (radian), 有限小数・循環小数, 三平方の定理, 円積問題, 超越数, công
   thức「円周＝直径×円周率」 đúng thứ tự Nhật dạy.
6. **Văn phong:** です/ます điềm tĩnh, câu ngắn một hơi, 「」 bao khái niệm, câu hỏi tu từ「〜でしょうか」 — hợp "sang, mịn"
   của kênh, không dùng giọng suồng sã (giọng Jaikyu vốn clone từ podcast thân mật — `channels/ja/VOICE.md`; người
   dùng nghe đoạn đầu để quyết).

## Sự kiện mới — đã kiểm (2026-10-10)
| câu trong kịch bản | kiểm | nguồn |
|---|---|---|
| 東大 2003「円周率が3.05より大きいことを証明せよ」 | ✓ 理系前期 第6問, 3/2003 | [北大 中村, pi031102.pdf](https://www.math.sci.hokudai.ac.jp/~nakamura/pi031102.pdf), [Wikipedia "Pi is 3"](https://en.wikipedia.org/wiki/Pi_is_3) |
| lục giác = 3, 12 giác ≈ 3.106 | ✓ python: 6·sin30° = 3; 12·sin15° = 3.10583 | tính |
| 劉徽 thế kỷ 3 (263), 祖沖之 thế kỷ 5, 7 chữ số, 355/113 đúng 6 chữ số | ✓ (`projects/en/pi/CONTENT.md` mục 4) | |
| 村松茂清『算俎』1663, nhân đôi từ hình vuông tới 2¹⁵ = 32 768 cạnh, đúng 7 chữ số | ✓ (tài liệu ghi 3.1415926; một nguồn nói "tính 21 chữ số, đúng 7") | [北大 中村, pi041205.pdf](https://www.math.sci.hokudai.ac.jp/~nakamura/pi041205.pdf), [九工大](https://www.kyutech.ac.jp/archives/015/202403/R6ao1_kadai.pdf), [NDL](https://www.ndl.go.jp/math/s1/c4.html) |
| 関孝和 đẩy tiếp (『括要算法』1712, tới 2¹⁷ cạnh) | ✓ | như trên |
| 建部賢弘 1722『綴術算経』, gia tốc dãy chu vi (累遍増約術 ≈ ngoại suy Richardson), **hơn 40 chữ số** | ✓ — nguồn ghi 40, 41 hoặc 42 → kịch bản nói「40桁以上」 | [RIMS 講究録 1130-20 (小松)](https://www.kurims.kyoto-u.ac.jp/~kyodo/kokyuroku/contents/pdf/1130-20.pdf), [数学会 Takebe](https://www.mathsoc.jp/publication/tushin/1901/kaiho191-TakebeConference.pdf) |
| 金田康正 (ĐH Tokyo) nhiều lần kỷ lục, 2002 ≈ 1.24 nghìn tỉ chữ số | ✓ | [ITmedia](https://blogs.itmedia.co.jp/mohno/2006/10/post_37fc.html) |
| 近藤茂, Nagano, máy ở nhà, cùng Alexander Yee (Mỹ), 10 nghìn tỉ chữ số, 10/2011 | ✓ | [Gizmodo](https://gizmodo.com/io9/page/4269) |
| 岩尾エマはるか, Google Cloud, 100 nghìn tỉ chữ số, công bố 6/2022 (2019: 31.4 nghìn tỉ) | ✓ | [Google blog JP](https://blog.google/intl/ja-jp/company-news/technology/2022_06_new-digit-pi-2022/) |
| 円周率 3.14 dạy ở lớp 5 tiểu học | ✓ 学習指導要領 算数 第5学年 | chỉ dẫn giảng dạy lớp 5 (Hiroshima), Wikipedia "Pi is 3" |

## Lời đọc — bẫy đã chặn (channels/ja/WRITING.md)
- `ja.check_spoken`: 0 lỗi trên 172 dòng (không ký hiệu, không chữ Latin, không số Hán nhiều chữ).
- Số thập phân, phân số, công thức đều chú âm: `{3.14|さんてんいちよん}`, `{22/7|ななぶんのにじゅうに}` (phân số Nhật đọc
  MẪU trước), `{π²/6|ろくぶんのパイにじょう}`.
- Trợ từ đếm unidic đọc sai (1つ → いちつ, 1辺 → いちへん, 6歩 → ろくほ, 角形 → かくがた, 第7位 → だいなない) → chú âm
  hết: `{1つ|ひとつ}`, `{1辺|いっぺん}`, `{正96角形|せいきゅうじゅうろっかっけい}`…
- Tên Trung/Nhật cổ chú âm: 劉徽 りゅうき, 祖沖之 そちゅうし, 村松茂清 むらまつしげきよ, 関孝和 せきたかかず,
  建部賢弘 たけべかたひろ, 金田康正 かなだやすまさ, 近藤茂 こんどうしげる.
- Còn để whisper so có thể báo nhầm (unidic đọc 割ると → われると, 1650年ごろ → としごろ): là lỗi của bộ SO, không phải
  của giọng — khi align báo các câu này thì nghe take trước khi đọc lại.

## Ảnh (tự tải từ Wikimedia Commons khi vào pha hình) → `assets/history/`
Dùng lại 4 ảnh đã có ở `projects/en/pi/assets/history/` (Archimedes — tranh Fetti, nhãn「想像図」; sách cói Rhind; Lambert;
Lindemann). Thêm nếu Commons có, giấy phép sạch: trang sách『括要算法』hoặc『綴術算経』(hiện vật, công khai), tượng
関孝和 (ảnh tượng — nhãn「像」). Không dùng ảnh người còn sống (金田, 近藤, 岩尾) — chỉ tên + năm + số chữ số trên hình.

## Mascot — tư thế
Như bài tiếng Anh: `ok`, `three`, `point`, `startled` (C/d = 2), `shrug` ("máy tính hiện thế"), `peace-back`; mascot
NÓI (`engine/talk.js`). Đề xuất mới (tuỳ): `exam` — cầm bút, cúi nhìn tờ đề thi (khoảnh khắc 東大).

## Câu hỏi để người dùng quyết
- Độ dài ~17–18 phút có ổn cho video đầu kênh, hay cắt còn ~15 (xem dòng "Muốn ≤ 15 phút" ở trên)?
- Nhờ một người Nhật đọc soát kịch bản trước khi lồng tiếng thì tốt nhất: máy kiểm được cách ĐỌC, không kiểm được độ
  tự nhiên.
