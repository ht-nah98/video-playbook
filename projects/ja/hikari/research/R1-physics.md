# R1 — Kiểm chứng vật lý: ja/hikari (Mở đầu, Phần 1–3, vật lý của Kết luận) + móc Nobel

Tra ngày 2026-10-13. Nguồn đối chiếu: `projects/ja/hikari/SCRIPT.vi.md`. Mỗi dòng ghi nguồn đã xác nhận nó.
**[V]** = đã đọc trong chính văn bản nguồn (toàn văn hoặc bản plaintext của trang, không chỉ đoạn trích tìm kiếm).
**[S]** = chỉ có từ bản tóm tắt tìm kiếm hoặc trang thứ cấp. **[M]** = theo trí nhớ, chưa kiểm.
Lưu ý: nobelprize.org trả HTTP 403 cho cả WebFetch lẫn curl, nên lời trích dẫn giải Nobel lấy từ bảng của Wikipedia
(bảng này có chú thích dẫn về nobelprize.org). **Trước khi đưa lên hình, mở trang chính thức đối chiếu lại một lần.**

---

## 0. Mở đầu — các con số

- **Khoảng cách Mặt Trời:** 1 au = **149 597 870 700 m** (định nghĩa năm 2012), tức "khoảng 150 triệu km". Khoảng cách thật dao động **±2,5 triệu km** trong năm. Ánh sáng đi hết quãng đó mất **khoảng 8 phút 20 giây**. [V] https://en.wikipedia.org/wiki/Sun (mục Earth's orbit/au). Tính lại: 149,6e9 m / 2,998e8 m/s = **499 s = 8,3 phút**. → "8 phút", "150 triệu km": **ĐÚNG**.
- **Tốc độ ánh sáng:** c = **299 792,458 km/s** (đúng theo định nghĩa). "300.000 km/s" là con số làm tròn, chấp nhận được. [M — hằng số định nghĩa SI]
- **"Chúng xuất phát từ Mặt Trời 8 phút trước":** chỉ đúng **ngoài trời ban ngày**. Ngồi trong phòng hay ban đêm thì phần lớn photon vào mắt đến từ bóng đèn hoặc màn hình (đi mất vài nano giây). Kết luận của script tự nói điều này ("hoặc từ bóng đèn… vài phần tỷ giây trước"), nên Mở đầu cần một cụm "nếu bạn đang ở ngoài trời".
- **Móc hay để thêm (tùy chọn):** photon ta thấy rời **quang cầu** (photosphere) 8 phút trước. Còn năng lượng của nó được sinh ra trong lõi rồi phải "đi bộ ngẫu nhiên" ra ngoài mất cỡ **hàng vạn đến ~170 000 năm**. Các ước lượng dao động từ 2×10⁴ đến 1,5×10⁵ năm, còn Mitalas & Sills tính được ~170 000 năm. [S] https://www.universetoday.com/articles/what-would-happen-if-the-sun-stopped-part-3-the-photon-traffic-jam · https://kottke.org/13/06/a-photons-random-walk

### Ước lượng "hàng nghìn tỷ photon mỗi giây vào mắt" (Mở đầu + Kết luận)

"Nghìn tỷ" = 10¹² (= 1 兆). Cách tính: quang thông lọt qua đồng tử = độ rọi tại mắt (lux) × diện tích đồng tử. Đổi lumen ra watt theo 683 lm/W (giới hạn trên, ánh sáng 555 nm) hoặc ~300 lm/W (ánh sáng trắng thực tế). Photon 550 nm mang **3,6×10⁻¹⁹ J = 2,25 eV**. [tự tính, công thức chuẩn]

| tình huống | độ rọi tại mắt | đồng tử | photon/giây vào MỘT mắt |
|---|---|---|---|
| phòng khách | 200 lx | Ø 4 mm | **1,0–2,3 × 10¹³** |
| văn phòng | 500 lx | Ø 3 mm | **1,4–3,3 × 10¹³** |
| ngoài trời trời âm u | 5 000 lx | Ø 2,5 mm | **1,0–2,3 × 10¹⁴** |
| ngoài trời nắng | 30 000 lx | Ø 2 mm | **3,8–8,7 × 10¹⁴** |

→ **Kết luận:** "hàng nghìn tỷ photon mỗi giây" là **ĐÚNG, thậm chí còn khiêm tốn**: trong nhà khoảng **mười nghìn tỷ** (10¹³), ngoài nắng khoảng **vài trăm nghìn tỷ** (10¹⁴–10¹⁵).
Tiếng Nhật: trong nhà ≈ **毎秒 数十兆個**, ngoài nắng ≈ **毎秒 数百兆個**. Câu an toàn để đọc: 「毎秒、何十兆個もの光の粒が目に飛び込んでいる」.
(Đây là ước lượng bậc độ lớn, sai số cỡ ×3. Đừng đưa một con số chính xác lên hình.)

---

## 1. Phần 1 — "Ba thế kỷ tranh cãi"

### 1a. Tiêu đề "ba thế kỷ"
- Câu hỏi "ánh sáng / thị giác là gì" có từ Hy Lạp cổ đại: Democritus (~thế kỷ 5–4 TCN), Euclid (~300 TCN). Tính đến nay là **khoảng 2 400 năm**. [S] https://en.wikipedia.org/wiki/Emission_theory_(vision)
- Riêng cuộc tranh luận **hạt hay sóng**: Huygens viết *Traité de la Lumière* năm **1678** và in năm **1690** [V] https://en.wikipedia.org/wiki/Treatise_on_Light. Newton in *Opticks* năm **1704** [V] https://en.wikipedia.org/wiki/Corpuscular_theory_of_light. Einstein đưa ra lượng tử ánh sáng năm **1905** [V] https://en.wikipedia.org/wiki/Photoelectric_effect. Tính từ thập niên 1670 đến 1905 là **khoảng 230 năm**. Nếu tính đến khi ý "lưỡng tính" được chấp nhận (Compton 1923, de Broglie 1924 [M]) thì gần 250 năm.
- → "Ba thế kỷ" **không khớp** với nội dung, vì phần này mở bằng người Hy Lạp. Có hai cách sửa: (i) "hơn hai nghìn năm" cho cả phần; hoặc (ii) "hơn hai trăm năm hạt-đấu-sóng" nếu chỉ tính từ Newton/Huygens.

### 1b. Hy Lạp: hai phe
- Euclid và Ptolemy theo **thuyết phát xạ (extramission)**: mắt phát ra tia nhìn. [V] Wikipedia Ibn al-Haytham: "The first theory, the emission theory, was supported by such thinkers as Euclid and Ptolemy, who believed that sight worked by the eye emitting rays of light." https://en.wikipedia.org/wiki/Ibn_al-Haytham
- Phe **thu nhận (intromission)**: Democritus và Epicurus cho rằng vật bong ra những "bản sao mỏng" (eidola) bay vào mắt. [S] https://en.wikipedia.org/wiki/Emission_theory_(vision). Lưu ý: Wikipedia cũng xếp **Aristotle** vào phe intromission, dù theo kiểu khác ("forms" truyền qua môi trường) [V] Ibn_al-Haytham. Một số nguồn đọc Democritus theo hướng khác, nhưng cách xếp chuẩn vẫn là intromission. [S]
- "Cả hai đều sai, phe thứ hai gần đúng hơn": hợp lý, đây là cách tóm tắt sư phạm. **OK.**
- Ẩn dụ "đèn pin" cho tia nhìn: OK.

### 1c. Ibn al-Haytham
- Sinh **khoảng năm 965 ở Basra (Iraq)**, "trong một gia đình **gốc Ả Rập hoặc Ba Tư**". Sách *Kitāb al-Manāẓir* (**Book of Optics**, 7 tập) viết trong **1011–1021**. Người Latin gọi ông là Alhazen. [V] https://en.wikipedia.org/wiki/Ibn_al-Haytham · https://en.wikipedia.org/wiki/Book_of_Optics
- Ông đã làm gì: đưa ra **lập luận dựa trên thí nghiệm** chống thuyết phát xạ. Ví dụ: nhìn thẳng nguồn sáng mạnh như Mặt Trời thì mắt bị hại [V] Book_of_Optics. Ông đề xuất thuyết thu nhận hiện đại: "từ **mỗi điểm** của một vật được chiếu sáng, ánh sáng và màu đi ra theo **mọi đường thẳng**", và chỉ một phần lọt vào mắt [V] Ibn_al-Haytham. Ông cũng mô tả rõ buồng tối (camera obscura) đầu tiên [V].
- "Chứng minh **dứt điểm**" là **hơi quá**. Ông lập luận rất mạnh và đặt nền móng, nhưng ở châu Âu thuyết tia-từ-mắt vẫn sống tiếp. Lý thuyết ảnh trên võng mạc chỉ hoàn chỉnh với Kepler năm 1604. [M] Search summary cũng ghi "the debate continued well into the Middle Ages". [S]
- "Nhà khoa học Ả Rập": gốc gác **chưa chắc chắn** (Ả Rập hoặc Ba Tư). Ông viết bằng tiếng Ả Rập và làm việc ở Cairo. Nói an toàn: **"nhà bác học thế giới Hồi giáo / sinh ở Basra"**. Tiếng Nhật: イブン・アル＝ハイサム（ラテン名アルハゼン）、現在のイラク・バスラ生まれ.
- "Ánh sáng đi từ nguồn (Mặt Trời, ngọn lửa) đập vào vật, phản xạ vào mắt": đúng tinh thần. Nói chính xác hơn thì vật được chiếu sáng **toả ánh sáng từ mọi điểm ra mọi hướng**. **OK.**

### 1d. Newton (hạt) và Huygens (sóng)
- Newton dùng các thuyết hạt có sẵn. Ông chỉ công khai đứng hẳn về phía hạt trong *Opticks* (1704). [V] Corpuscular_theory_of_light. Từ "corpuscles" đúng. Thuyết hạt giải thích được "khúc xạ, phản xạ, truyền thẳng, và ở mức độ kém hơn là nhiễu xạ" [V] cùng nguồn. → "giải thích gọn gàng đường thẳng, bóng sắc nét, phản xạ góc đối xứng": **OK.**
- "Thế kỷ 17": ý tưởng của Newton có từ thập niên 1670 nhưng sách ra năm 1704. Chấp nhận được.
- **Huygens, người Hà Lan: đúng.** Ông đề xuất sóng lan trong một môi trường (ether). Sóng của ông là **xung, không tuần hoàn** [M]. Ông không giải thích được phân cực [V] Treatise_on_Light.
- **"Hai chùm sáng giao nhau mà không đâm vào nhau": ĐÚNG, do chính Huygens nêu.** Trích lời nói đầu *Treatise on Light* (bản dịch S. P. Thompson): "…how visible rays, coming from an infinitude of diverse places, **cross one another without hindering one another in any way**." Chương 1 còn viết: "…when some of them come from different or even from opposing sides, they produce their effect across one another without any hindrance… two persons can at the same time see one another's eyes." [V] https://www.gutenberg.org/files/14725/14725-0.txt. Lưu ý: Huygens dùng lập luận này để chống **Descartes**, không phải chống Newton.
- **"Ánh sáng uốn quanh góc vật thể" (nhiễu xạ): SAI nếu gán cho Huygens.** Nguyên lý Huygens "suy ra được phản xạ và khúc xạ… **nhưng không giải thích được** những chỗ lệch khỏi đường thẳng ở mép vật, khe, màn, tức hiệu ứng nhiễu xạ". Phải đến **Fresnel năm 1818** thêm nguyên lý giao thoa mới giải thích được nhiễu xạ. [V] https://en.wikipedia.org/wiki/Huygens%E2%80%93Fresnel_principle. Nhiễu xạ được Grimaldi quan sát và công bố năm 1665 [M]. Trớ trêu thêm: Newton bác thuyết sóng chính vì cho rằng **sóng thì phải uốn vào vùng bóng** (như âm thanh vòng qua góc tường), mà ông không thấy ánh sáng làm vậy [M].
- **"Suốt hơn 100 năm, thuyết hạt thống trị"**: *Opticks* 1704 → Young 1801 → Fresnel 1818–1821. Wikipedia viết "this theory came to dominate the conceptions of light in the eighteenth century", và "the dominance of Newtonian natural philosophy… was one of the decisive factors". [V] Corpuscular_theory_of_light → **"khoảng một thế kỷ" là công bằng.** "Uy tín đè bẹp mọi phản biện" chỉ hơi kịch tính. Nguồn ủng hộ ý chính, nên nói nhẹ đi: "uy tín của Newton khiến thuyết hạt đứng vững suốt thế kỷ 18".

### 1e. Young và giao thoa
- Young đọc các Bakerian Lecture năm **1800, 1801, 1803**. Bài năm **1801** ("On the Theory of Light and Colours") trình bày **nguyên lý giao thoa** và in năm **1802**. Ông minh hoạ bằng **bể sóng nước**. Năm **1803** ông mô tả một thí nghiệm **hai khe**, nhưng "**không rõ thí nghiệm nào Young thực sự làm và thí nghiệm nào chỉ là thí nghiệm tưởng tượng**". [V] https://en.wikipedia.org/wiki/Young%27s_interference_experiment
- Phiên bản ông chắc chắn đã làm (bài 1803, in **1804**, *Experiments and Calculations Relative to Physical Optics*): cho ánh nắng qua một **lỗ nhỏ**, rồi **dùng một tấm thẻ giấy mỏng chẻ đôi chùm sáng**, thấy vân sáng tối. [V] cùng nguồn + https://en.wikipedia.org/wiki/Thomas_Young_(scientist). Sách *Course of Lectures on Natural Philosophy* (**1807**) có hình vẽ giao thoa hai nguồn và nhắc tới "two very small holes or slits". [V]
- → "Năm 1801… chiếu qua hai khe hẹp" là **cách kể dân gian gộp ba mốc**. Nói đúng: "khoảng năm 1801–1803, Young cho ánh sáng tách làm hai rồi gặp lại, và thấy vân sáng tối". Thí nghiệm hai khe ngày nay là phiên bản sách giáo khoa của thí nghiệm đó. **Đừng đưa lên hình "1801 · hai khe" như một sự kiện đã kiểm chứng.**
- "Young phá vỡ thế thống trị": **quá sớm.** Năm 1803–04, Young bị Henry Brougham công kích nặng trên *Edinburgh Review* và mất uy tín với công chúng. [V] Young's_interference_experiment. Giới khoa học chỉ bị thuyết phục sau **Fresnel (1818) và đốm Arago/Poisson (1819)**: "This convinced most scientists of the wave-nature of light." [V] cùng nguồn. → Nên nói: "Young mở màn, Fresnel kết thúc ~1819".
- "Nếu là hạt thì sau hai khe chỉ có hai vệt sáng; chỉ sóng mới tạo vân": đây là **lập luận sách giáo khoa chuẩn**, dùng được. Cơ chế cộng/triệt (đỉnh+đỉnh sáng, đỉnh+đáy tối): **đúng**.

---

## 2. Phần 2 — Sóng điện từ và photon

- **Maxwell:** công trình 1861–1865 (*A Dynamical Theory of the Electromagnetic Field*, 1865). Từ các hằng số điện và từ đã đo, ông tính được tốc độ sóng điện từ xấp xỉ tốc độ ánh sáng (~310 000 km/s theo số liệu Weber–Kohlrausch). Ông kết luận ánh sáng là sóng điện từ. [M] Dạng "bốn phương trình" gọn ngày nay là do **Heaviside** viết lại (~1884) [M]. Hertz tạo và thu sóng điện từ năm **1887** [V] Photoelectric_effect. "Vận tốc trùng khớp chính xác" nên đổi thành "**trùng khớp** với tốc độ ánh sáng đã đo". Thời đó trùng khoảng vài %, không phải "chính xác".
- "Không cần môi trường": đúng theo vật lý hiện đại. Lưu ý **chính Maxwell vẫn tin có ether**. Ether bị bỏ sau Michelson–Morley (1887) và thuyết tương đối hẹp (1905) [M]. Câu "Maxwell phát hiện… không cần môi trường vật chất" **gán sai** cho Maxwell → sửa thành "về sau người ta hiểu ra rằng nó không cần môi trường".
- "Điện trường sinh ra từ trường, từ trường sinh ra điện trường": cách hình dung sư phạm chuẩn. **OK.**
- "Trong video về tốc độ ánh sáng, mình đã nói…": **kênh 99の発見 chưa có video này** (các bài ja đã làm: pi, 2048, chirality). Phải bỏ hoặc sửa câu tham chiếu chéo này.

### Hiệu ứng quang điện
- Hertz thấy hiệu ứng năm 1887. Hallwachs và Lenard nghiên cứu trong 1886–1902. **Năm 1902, Lenard thấy năng lượng của từng electron bật ra không phụ thuộc cường độ ánh sáng.** Điều này mâu thuẫn với thuyết sóng của Maxwell. [V] https://en.wikipedia.org/wiki/Photoelectric_effect · https://en.wikipedia.org/wiki/Philipp_Lenard
- Năm **1905**, Einstein đề xuất lượng tử ánh sáng, mỗi gói có E = hf. [V] Photoelectric_effect. Chữ "photon" ra đời muộn hơn, do **G. N. Lewis đặt năm 1926** [M]. Einstein gọi là *Lichtquant* (光量子).
- **Millikan:** đo trong 1914–1915 và công bố tháng 3/**1916** (*Phys. Rev.*, "A Direct Photoelectric Determination of Planck's 'h'"). Kết quả xác nhận phương trình của Einstein, đo được h = 6,57×10⁻²⁷ erg·s (sai số ~0,5 %). Dù vậy ông **vẫn không tin** ánh sáng là hạt. [S] https://resolver.caltech.edu/CaltechAUTHORS:20131203-155712735 · https://physics.aps.org/story/v3/st23. Wikipedia: "a corpuscular theory of light was for Millikan, at the time, 'quite unthinkable'" [V] Photoelectric_effect. → Móc hay: **người kiểm chứng Einstein lại muốn chứng minh Einstein sai.**
- **Các câu của script:**
  - "Cường độ không quan trọng": **nói quá.** Cường độ quyết định **số** electron bật ra (dòng tỉ lệ với cường độ) nhưng không quyết định **năng lượng** của từng electron, và không quyết định **có** bật ra hay không. [V] Photoelectric_effect: "the rate at which photoelectrons are ejected is directly proportional to the intensity". → "Cường độ không quyết định *có hay không*".
  - "Tăng 10 lần mà vẫn không bật ra nếu bước sóng không đúng": ý đúng, nhưng phải nói "nếu bước sóng **quá dài** (tần số dưới **ngưỡng**)". Không có bước sóng "đúng". Mọi bước sóng ngắn hơn ngưỡng đều làm electron bật ra. [V] cùng nguồn: "electrons are dislodged only when the light exceeds a certain frequency—regardless of the light's intensity".
  - "Sóng mạnh hơn lẽ ra phải mang nhiều năng lượng hơn, nhưng thực tế nó không": **SAI.** Ánh sáng mạnh hơn **có** mang nhiều năng lượng hơn tổng cộng. Chỉ là năng lượng ấy chia thành nhiều gói nhỏ, mà mỗi electron chỉ nuốt **một gói một lần**. Wikipedia: "an increase in the intensity of low-frequency light will only increase the number of low-energy photons… will not create any single photon with enough energy". [V]
  - "Tần số cao thì photon mạnh hơn, không thể chia nhỏ hơn": OK. E = hf, với h = 6,626×10⁻³⁴ J·s. Ánh sáng nhìn thấy mang **1,8–3,3 eV** mỗi photon (đỏ 650 nm = 1,9 eV; xanh 450 nm = 2,76 eV; tím ~380 nm = 3,3 eV). [tự tính, E(eV) = 1239,8/λ(nm)]
  - **Ẩn dụ sỏi/cửa kính:** có lỗ hổng. Trăm viên sỏi cộng dồn **vẫn có thể** làm vỡ kính (mỏi vật liệu), mà điểm mấu chốt lại là electron **không cộng dồn** được. Đề xuất ẩn dụ chặt hơn: **ném bóng qua bức tường cao**. Mỗi quả bóng là một photon, và phải ném một quả đủ mạnh để vượt qua. Ném nghìn quả yếu thì không quả nào qua, và các quả không chồng lên nhau được. Còn ném nhiều quả mạnh thì nhiều quả qua (= cường độ quyết định số electron). Nếu giữ ẩn dụ sỏi thì thêm "mỗi viên sỏi rơi xuống là hết, không cộng dồn".
  - "Newton đúng một phần, Huygens đúng một phần": cách tóm tắt sư phạm, chấp nhận được. Photon **không phải** hạt cổ điển kiểu Newton.

---

## 3. Phần 3 — Ánh sáng sinh ra từ đâu

- **Mức năng lượng rời rạc, nhảy xuống thì phát một photon có E = chênh lệch:** đúng. Mô hình Bohr (1913) [M]. Hình "electron quay quanh hạt nhân" là **mô hình Bohr, đã lỗi thời**. Hình "bậc thang năng lượng" thì vẫn đúng. Gợi ý hình ảnh: vẽ **thang năng lượng**, đừng vẽ quỹ đạo tròn như hành tinh.
- **Vạch phổ "vân tay":** đúng. Natri có vạch kép D ở **589,0 và 589,6 nm**, nên đèn natri áp suất thấp gần như đơn sắc vàng (trung bình 589,3 nm). [S] https://en.wikipedia.org/wiki/Sodium-vapor_lamp · https://www.rp-photonics.com/sodium_vapor_lamps.html. Neon phát ánh sáng **đỏ-cam** ("blaze of crimson light", Travers 1898). Đèn neon nhỏ phát "orange glow". [V] https://en.wikipedia.org/wiki/Neon_lamp. Vạch đỏ mạnh của neon nằm quanh ~640 nm [M]. Hydro có vạch H-α ở 656,3 nm [M].
  - Lưu ý 1: **biển "neon" màu khác đỏ thường không dùng neon** mà dùng argon + hơi thuỷ ngân + bột huỳnh quang. [S] https://edisontechcenter.org/NeonLamps.html → Chỉ nói "đèn neon **đỏ**".
  - Lưu ý 2: đèn đường natri ngày nay phần lớn là **natri cao áp** (vàng cam, phổ rộng hơn), và nhiều nơi (cả Nhật) đã thay bằng LED. Đèn **natri áp suất thấp** đơn sắc thì thấy ở **hầm đường bộ** (トンネルのオレンジ色の照明). [M] → Ví dụ Nhật hay: **ánh cam trong hầm đường cao tốc**. Đó là nguyên tử natri.
- **"Phần lớn photon trong vũ trụ sinh ra từ một sự kiện thay đổi năng lượng":** câu đúng nhưng rỗng. Thực ra **phần lớn photon trong vũ trụ là photon nền vi sóng vũ trụ** (~411 photon/cm³) [M], sinh ra từ plasma nóng thời sơ khai. Đó là bức xạ **nhiệt**, không phải electron nhảy bậc trong một nguyên tử. → Bỏ câu này.

### MẶT TRỜI, LỬA, BÓNG ĐÈN — lỗi lớn nhất của Phần 3
- **Lõi Mặt Trời ~15,7 triệu K**: đúng ("15 triệu độ" chấp nhận được). [V] https://en.wikipedia.org/wiki/Sun. **Nhưng ánh sáng ta thấy không đến từ lõi.** Nó rời **quang cầu**: nhiệt độ 4 400–6 600 K, nhiệt độ hiệu dụng **5 772 K ≈ 5 500 °C**. [V] https://en.wikipedia.org/wiki/Photosphere. Phổ Mặt Trời "xấp xỉ phổ của **vật đen ở 5 777 K**, xen các vạch hấp thụ". [V] Wikipedia Sun.
- Cơ chế phát sáng ở quang cầu: phổ liên tục chủ yếu do **ion H⁻**: "the visible light perceived is produced as electrons react with hydrogen atoms to produce H− ions". [V] Wikipedia Sun. Đây là **bức xạ nhiệt (phổ liên tục)**, không phải các vạch rời rạc do electron nhảy bậc trong nguyên tử. Lõi thì nóng mà ta **không thấy** được: năng lượng mất hàng vạn năm mới khuếch tán ra ngoài (xem §0).
  → "Mặt Trời phát sáng vì lõi nóng 15 triệu độ… photon phóng ra… ở mọi bước sóng" phải sửa thành: **nhiệt hạch ở lõi (15 triệu °C) cung cấp năng lượng; ánh sáng ta thấy toả ra từ "bề mặt" quang cầu ~5 500 °C, và phát sáng vì nóng**.
- **Lửa nến:** phần **vàng** là **muội than (hạt carbon) nóng đỏ rực**, tức bức xạ nhiệt. Phần **xanh lam** ở đáy ngọn lửa là phát xạ của các phân tử bị kích thích **C₂ và CH**, tức electron nhảy bậc trong phân tử. [S] https://en.wikipedia.org/wiki/Flame · https://www.chm.bris.ac.uk/~paulmay/webprojects2001/osullivan/fire2.htm. → "kích thích electron trong phân tử nhiên liệu" **chỉ đúng cho phần xanh**. Ánh sáng chính (vàng) là hạt muội nóng sáng.
- **Bóng đèn sợi đốt:** sợi wolfram (タングステン) chạy ở khoảng **2 700–3 000 K** (≈ 2 400–2 700 °C). Mức tối đa thực tế ~3 000 K là do wolfram bay hơi. **Dưới 10 %** năng lượng ra thành ánh sáng nhìn thấy. [S] https://hypertextbook.com/facts/1999/AlexanderEng.shtml · https://technav.ieee.org/topic/filament-lamps/. → "gần 3.000 độ" **đúng nếu là K**. Nếu là °C thì nên nói "khoảng 2.500 độ C". Cơ chế là **bức xạ nhiệt từ kim loại nóng** (electron dẫn chuyển động hỗn loạn và va chạm), phổ liên tục. **Không phải** "electron trong nguyên tử wolfram nhảy bậc".
- **"Mọi nguồn sáng… đều cùng một nguyên lý: electron nhảy lên rồi rơi xuống": KHÁI QUÁT HOÁ SAI.** Nói đúng là: **mọi ánh sáng đều sinh ra khi điện tích (chủ yếu electron) thay đổi trạng thái hoặc chuyển động có gia tốc.** Có **hai họ** nguồn sáng:
  1. **Nhảy bậc → màu riêng (vạch):** đèn neon, đèn natri, phần xanh của ngọn lửa, **LED** (nhảy qua vùng cấm), màn hình điện thoại (LED/OLED; màn LCD thì dùng đèn nền LED xanh + bột huỳnh quang).
  2. **Nóng → mọi màu (phổ liên tục, "bức xạ vật đen"):** Mặt Trời, muội than của nến, dây tóc bóng đèn, than hồng, cơ thể người (hồng ngoại). Màu của nó **do nhiệt độ quyết định** (≈3 000 K vàng cam, ≈5 800 K trắng).
  → Ví dụ "màn hình điện thoại" thực ra **đúng** với cơ chế nhảy bậc. Đây cũng là cầu nối sang **giải Nobel LED xanh 2014** (xem §N5).
- Đây cũng là chỗ dựa cho **Nobel Planck 1918**: Planck đưa ra lượng tử chính là để giải thích **phổ vật đen** (bức xạ nhiệt) năm 1900. [V] Photoelectric_effect: "In 1900, while studying black-body radiation… Planck suggested… energy… could only be released in packets". Nhờ vậy phần "Mặt Trời/bóng đèn phát sáng vì nóng" vừa đúng vật lý vừa có móc Nobel.

---

## N. MÓC NOBEL cho playlist なぜ？を解いたノーベル賞

| năm | người | lời tuyên dương (tiếng Anh, theo bảng Wikipedia trích nobelprize.org) | độ tin |
|---|---|---|---|
| **1918** | Max Planck (マックス・プランク) | "in recognition of the services he rendered to the advancement of Physics by his discovery of energy quanta" | [S] |
| **1921** | Albert Einstein (アルベルト・アインシュタイン) | "for his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect" | [S], wording khớp với [V] trong Photoelectric_effect |
| **1922** | Niels Bohr (ニールス・ボーア) | "for his services in the investigation of the structure of atoms and of the radiation emanating from them" | [S] |
| 1923 | Robert Millikan (ロバート・ミリカン) | "for his work on the elementary charge of electricity and on the photoelectric effect" | [V] Photoelectric_effect |
| 1904 | Lord Rayleigh (レイリー卿) | "for his investigations of the densities of the most important gases and for his discovery of argon in connection with these studies" | [S] |
| **2014** | 赤崎勇・天野浩・中村修二 | "for the invention of efficient blue light-emitting diodes which has enabled bright and energy-saving white light sources" | [V] trích trong Wikipedia Isamu_Akasaki + bảng |

Nguồn bảng: https://en.wikipedia.org/wiki/List_of_Nobel_laureates_in_Physics (đọc bản raw). Trang chính thức: https://www.nobelprize.org/prizes/physics/1921/summary/ (403 với công cụ, cần mở bằng trình duyệt).

- **N1. Einstein 1921.** Giải năm 1921 bị **hoãn** (năm đó Uỷ ban không chọn được ai) rồi trao vào **tháng 11/1922**, cùng lúc với giải 1922 của Bohr. Einstein nhận điện báo ở Berlin ngày **10/11/1922** (lúc ấy ông đang trên đường sang Nhật). Ông không dự lễ ở Stockholm, mà đọc bài giảng Nobel ở **Göteborg tháng 7/1923**. Lời tuyên dương **cố ý không nhắc thuyết tương đối**. Oseen đề cử ông cho "định luật hiệu ứng quang điện". [S] https://ar5iv.labs.arxiv.org/html/2112.13519 · https://content.time.com/time/specials/packages/article/0,28804,1936731_1936743_1936804,00.html · https://lenz.io/c/701f259f
  - **Móc Nhật:** Einstein biết tin đoạt giải trên tàu đi Nhật. Ông đến Kobe ngày 17/11/1922 và đi diễn giảng khắp Nhật khoảng 6 tuần. [M, nên kiểm trước khi dùng]
  - Tiếng Nhật: 1921年ノーベル物理学賞「理論物理学への貢献、特に光電効果の法則の発見に対して」. Đây là bản dịch tham khảo [M]. Nên lấy câu chữ từ nobelprize.org hoặc nguồn Nhật chính thống.
- **N2. Planck 1918:** lượng tử năng lượng ra đời để giải thích **phổ của vật nóng** (bức xạ vật đen). Hợp với ý sửa Phần 3 "Mặt Trời/bóng đèn sáng vì nóng". Giải 1918 cũng được trao muộn, vào năm 1919 [M].
- **N3. Bohr 1922:** mức năng lượng của nguyên tử và **ánh sáng nó phát ra**. Đây đúng là "bậc thang" của Phần 3.
- **N4. Rayleigh 1904:** giải Nobel là cho **khí argon**, **KHÔNG phải** cho việc giải thích trời xanh (tán xạ Rayleigh, khoảng 1871 [M]). Nếu Phần 5 nhắc Rayleigh thì không được nói "đoạt Nobel nhờ trời xanh". (Phụ: tỉ lệ tán xạ (700/450)⁴ = **5,86**, nên "gần 6 lần" ở Phần 5 là đúng.)
- **N5. LED xanh 2014: móc Nhật mạnh nhất, nối trực tiếp với "bậc thang quyết định màu".**
  - 赤崎勇 (Akasaki Isamu): sinh 30/1/1929 ở Chiran, Kagoshima [V]. Khi đoạt giải ông là giáo sư **名城大学**, kiêm 名古屋大学特別教授 [V/S]. Mất ngày 1/4/2021, thọ 92 tuổi [M].
  - 天野浩 (Amano Hiroshi): sinh 11/9/1960 ở Hamamatsu [V]. Giáo sư **名古屋大学** [V]. Là học trò của Akasaki ở Nagoya [S].
  - 中村修二 (Nakamura Shūji): sinh 22/5/1954 ở Ehime [M]. Từng làm ở **日亜化学工業** (Nichia, Tokushima). Từ 1999 là giáo sư **カリフォルニア大学サンタバーバラ校 (UCSB)**. **Quốc tịch Mỹ**: Nobel ghi quốc gia USA [V bảng].
  - Công bố ngày **7/10/2014**, trao giải ngày 10/12/2014. [S] https://scienceportal.jst.go.jp/newsflash/20141007_04/
  - **Vì sao LED xanh khó:** màu của LED = độ rộng **vùng cấm** (band gap) = năng lượng photon. Áp E(eV) = 1240/λ(nm): đỏ 650 nm cần **1,9 eV**, xanh 450 nm cần **2,76 eV**. Vậy cần vật liệu có vùng cấm rất rộng. GaN có vùng cấm **3,4 eV** [V] https://en.wikipedia.org/wiki/Gallium_nitride, còn LED xanh thực tế dùng InGaN để kéo về ~2,7 eV [M]. LED đỏ có từ thập niên 1960 [S JST]; xanh dương thì bị nói là "không thể trong thế kỷ 20" [S].
  - Hai rào cản: (1) **khó nuôi tinh thể GaN tốt**. Amano và Akasaki giải quyết năm **1986** bằng **lớp đệm AlN nuôi ở nhiệt độ thấp** trên nền sapphire (Amano et al., APL 48, 353). (2) **Không làm được GaN loại p**. Amano đạt được năm **1989** bằng Mg + chiếu chùm electron năng lượng thấp (LEEBI). Năm **1992** Nakamura tìm ra nguyên nhân là hydro thụ động hoá Mg, và chỉ cần ủ nhiệt trong N₂. Năm **1993** ông làm được LED xanh sáng gấp ~1000 lần các LED trước đó và đưa vào sản xuất. [V] Wikipedia Amano/Nakamura/Gallium_nitride · [S] https://www.nobelprize.org/uploads/2018/06/amano-lecture-slides.pdf · https://compoundsemiconductor.net/article/85376/20_years_and_counting_for_the_GaN_LED
  - **Ý nghĩa để kể:** có xanh thì mới có **đèn LED trắng** (LED xanh + bột huỳnh quang vàng) và **màn hình điện thoại**. "Màn hình điện thoại bạn đang nhìn" chính là electron nhảy qua một bậc thang do người Nhật tạo ra.
  - Tiếng Nhật, lời tuyên dương: 「明るく省エネルギーな白色光源を可能にした、高効率な青色発光ダイオードの発明」. Đây là cách dịch phổ biến trên báo Nhật [S]. Hội đồng Khoa học Nhật (日本学術会議) diễn đạt hơi khác. Nên lấy đúng một bản chuẩn trước khi lên テロップ.
- Phụ, **Lenard**: đoạt Nobel năm 1905 cho **tia âm cực**, không phải cho quang điện [V]. Về sau ông là người cầm đầu phong trào "Vật lý Đức" bài Einstein [M]. Tốt nhất không đưa Lenard lên hình, chỉ nói "các thí nghiệm khoảng năm 1902".

---

## SỬA CHO SCRIPT

Mỗi mục: **câu nguồn** → **nói đúng là** → *gợi ý câu đọc đơn giản hơn*.

1. **Mở đầu: "Chúng xuất phát từ Mặt Trời 8 phút trước"** → chỉ đúng ngoài trời ban ngày. Trong nhà, photon chủ yếu đến từ đèn hoặc màn hình. → *"Nếu bạn đang ở ngoài trời, phần lớn chúng rời Mặt Trời khoảng 8 phút trước…"*
2. **Mở đầu/Kết luận: "hàng nghìn tỷ photon mỗi giây"** → đúng, còn khiêm tốn: trong nhà ~10¹³/giây, ngoài nắng ~10¹⁴–10¹⁵/giây. → *「毎秒、何十兆個もの光の粒」* (giữ ở mức bậc độ lớn).
3. **Tiêu đề "Ba thế kỷ tranh cãi"** → câu hỏi kéo dài ~2 400 năm. Riêng hạt-đấu-sóng kéo dài ~230 năm (1670s→1905). → *"Hai nghìn năm tranh cãi"*, hoặc giữ phần Hy Lạp làm dạo đầu rồi gọi đoạn Newton→Einstein là *"hai trăm năm hạt đấu sóng"*.
4. **"nhà khoa học Ả Rập Ibn al-Haytham mới chứng minh dứt điểm"** → sinh ~965 ở Basra, gốc Ả Rập **hoặc** Ba Tư. *Book of Optics* viết 1011–1021. Ông đưa ra lập luận thực nghiệm mạnh nhất chống thuyết tia-từ-mắt, nhưng chưa "dứt điểm" ngay (Kepler 1604 mới hoàn chỉnh). → *"Đầu thế kỷ 11, nhà bác học Ibn al-Haytham sinh ở Basra (Iraq) đưa ra lập luận và thí nghiệm cho thấy: mắt không phát ra gì cả, mắt chỉ nhận ánh sáng."*
5. **Huygens: "Tại sao ánh sáng có thể uốn quanh góc vật thể?"** → Huygens **không** giải thích được nhiễu xạ. Fresnel làm được năm 1818. Còn ý "hai chùm sáng giao nhau mà không va vào nhau" thì đúng là của Huygens. → Bỏ vế "uốn quanh góc", chỉ giữ: *"Nếu ánh sáng là hạt, sao hai chùm sáng bắn chéo nhau lại không va vào nhau? Hai người vẫn nhìn được vào mắt nhau đấy thôi."* (gần nguyên văn Huygens).
6. **"uy tín của ông đè bẹp mọi phản biện. Suốt hơn 100 năm, thuyết hạt thống trị"** → khoảng một thế kỷ (Opticks 1704 → Young/Fresnel 1800–1820) là đúng. Nói nhẹ chữ "đè bẹp". → *"Newton quá nổi tiếng. Suốt thế kỷ 18, gần như ai cũng tin ánh sáng là hạt."*
7. **"Năm 1801, Thomas Young… chiếu ánh sáng qua hai khe hẹp"** → 1801 là bài giảng về giao thoa (in 1802). Thí nghiệm ông chắc chắn đã làm (1803, in 1804) là **dùng tấm thẻ mỏng chẻ đôi một chùm nắng**. Hình hai khe là phiên bản sách giáo khoa, và không rõ ông có thật làm hai khe. → *"Khoảng năm 1801–1803, Thomas Young cho một chùm sáng tách làm hai rồi gặp lại nhau…"*, và trên hình ghi "thí nghiệm hai khe (phiên bản ngày nay)".
8. **"Young phá vỡ thế thống trị đó"** → Young bị công kích, giới khoa học chưa tin. Phải đến Fresnel (1818) và đốm sáng Arago (1819) mới thắng. → *"Young mở màn. Mười mấy năm sau, Fresnel và Arago mới thuyết phục được cả giới khoa học."*
9. **"Maxwell phát hiện… sóng lan truyền… mà không cần môi trường vật chất"** → Maxwell vẫn tin có ether. Ý "không cần môi trường" được hiểu ra sau đó (cuối thế kỷ 19 – 1905). "Vận tốc trùng khớp chính xác" chỉ đúng là trùng khớp xấp xỉ. → *"Maxwell tính ra tốc độ của sóng điện từ, và nó trùng với tốc độ ánh sáng. Ánh sáng chính là sóng điện từ. Về sau người ta còn hiểu ra nó chẳng cần môi trường nào để lan đi."*
10. **"Trong video về tốc độ ánh sáng, mình đã nói…"** → kênh 99の発見 **chưa có** video đó. → Bỏ câu tham chiếu chéo.
11. **"Cường độ ánh sáng không quan trọng. Tăng 10 lần… nếu bước sóng không đúng"** → cường độ quyết định **số** electron, không quyết định **có** bật ra hay không. Điều kiện là bước sóng **ngắn hơn ngưỡng**, không có bước sóng "đúng". → *"Ánh sáng đỏ có mạnh gấp mười lần cũng không đánh bật được electron nào. Nhưng chỉ cần một tia tím yếu thôi, electron bật ra ngay."* (Lấy ví dụ màu cụ thể; với kẽm thì ngưỡng nằm trong vùng tử ngoại, nên trên hình chọn một kim loại kiềm như kali hoặc xesi hợp với ví dụ đỏ/tím [M].)
12. **"Sóng mạnh hơn, lẽ ra phải mang nhiều năng lượng hơn, nhưng thực tế nó không"** → ánh sáng mạnh **có** mang nhiều năng lượng hơn, nhưng chia thành nhiều gói nhỏ, và mỗi electron chỉ nhận một gói. → *"Tổng năng lượng thì nhiều, nhưng nó đến thành từng gói nhỏ, và mỗi electron chỉ nhận được một gói."*
13. **"Einstein giải thích… 'photon'"** → năm 1905 Einstein gọi là lượng tử ánh sáng (光量子). Chữ "photon" có từ năm 1926. → Đọc *"gói ánh sáng — ngày nay gọi là photon"*. Nên thêm móc **Nobel 1921 (trao năm 1922): "đặc biệt cho việc phát hiện định luật của hiệu ứng quang điện"**, nói rõ là **không phải** cho thuyết tương đối. Có thể thêm Millikan 1916: người muốn chứng minh Einstein sai cuối cùng lại xác nhận Einstein đúng.
14. **Ẩn dụ sỏi/cửa kính** → sỏi có thể cộng dồn làm vỡ kính, trong khi electron không cộng dồn được. → *Ném bóng qua tường cao: ném nghìn quả yếu thì không quả nào qua; một quả đủ mạnh là qua. Ném nhiều quả mạnh thì nhiều quả qua.*
15. **"Electron quay quanh hạt nhân… như bậc thang"** → giữ hình bậc thang, bỏ hình quỹ đạo như hành tinh (mô hình Bohr 1913 đã lỗi thời). → *"Electron trong nguyên tử chỉ được đứng trên những bậc năng lượng nhất định."* Móc: **Bohr, Nobel 1922**.
16. **"Phần lớn photon trong vũ trụ được sinh ra từ một sự kiện thay đổi năng lượng"** → câu rỗng. Thực ra phần lớn photon vũ trụ là bức xạ nền vi sóng, sinh ra theo cơ chế nhiệt. → Bỏ câu này.
17. **"Đèn Neon có màu khác đèn Natri ngoài đường"** → đúng với neon đỏ và natri áp suất thấp (589 nm). Biển "neon" màu khác thường là argon/thuỷ ngân + bột huỳnh quang. Đèn đường natri ở Nhật đang dần thay bằng LED. → *"Đèn neon đỏ rực, còn ánh cam trong hầm đường cao tốc là của nguyên tử natri. Mỗi nguyên tử một màu riêng."*
18. **"Mặt Trời phát sáng vì lõi của nó nóng đến 15 triệu độ… photon phóng ra… mọi bước sóng"** → lõi ~15,7 triệu K chỉ cung cấp năng lượng. Ánh sáng ta thấy toả ra từ quang cầu ~5 500 °C (5 772 K), phổ gần vật đen, tức **sáng vì nóng**, không phải các vạch nhảy bậc. Năng lượng từ lõi mất hàng vạn năm mới ra tới bề mặt. → *"Sâu trong lõi Mặt Trời, ở 15 triệu độ, năng lượng được tạo ra. Nhưng ánh sáng ta thấy đến từ lớp bề mặt khoảng 5.500 độ: Mặt Trời sáng vì nó nóng."*
19. **"Lửa… kích thích electron trong các phân tử nhiên liệu"** → màu vàng của nến là **hạt muội than nóng rực** (bức xạ nhiệt). Chỉ phần xanh ở đáy là phân tử C₂/CH bị kích thích. → *"Màu vàng của ngọn nến là những hạt muội than li ti bị nung nóng rực lên. Phần xanh nhỏ ở đáy mới là phân tử phát sáng."*
20. **"sợi Wolfram đến gần 3.000 độ. Electron… bị kích thích bởi nhiệt"** → khoảng 2 700–3 000 **K** (≈ 2 500 °C). Đây là bức xạ nhiệt của kim loại nóng, phổ liên tục, và dưới 10 % năng lượng thành ánh sáng nhìn thấy. → *"Dây tóc bóng đèn bị nung tới khoảng 2.500 độ C. Nóng đến thế thì nó tự phát sáng, giống thanh sắt nung đỏ."*
21. **"Mỗi nguồn sáng… đều hoạt động theo cùng một nguyên lý: electron nhảy lên rồi rơi xuống"** → có **hai** cách tạo ánh sáng: (a) electron nhảy bậc → màu riêng (neon, natri, LED, màn hình điện thoại); (b) vật nóng → đủ mọi màu (Mặt Trời, nến, bóng đèn sợi đốt). Điểm chung: ánh sáng sinh ra khi điện tích (electron) đổi trạng thái hoặc rung lắc. → *"Có hai cách làm ra ánh sáng: cho electron nhảy bậc, mỗi chất ra một màu riêng; hoặc nung thật nóng, ra đủ mọi màu. Màn hình điện thoại của bạn dùng cách thứ nhất."* Móc tiếp: **LED xanh, Nobel 2014: 赤崎勇・天野浩・中村修二**. Muốn ra màu xanh thì cần một "bậc" cao ~2,7 eV, gần gấp rưỡi bậc của màu đỏ, và người Nhật là những người làm được.
22. **Kết luận: "electron nhảy xuống… phóng ra một photon. Photon đó… có thể xuất phát từ Mặt Trời"** → với ánh sáng Mặt Trời thì câu này không đúng nguyên văn (xem mục 18). → *"Ở cấp nguyên tử, ánh sáng ra đời khi electron đổi trạng thái: nhảy bậc, hoặc rung lên vì nóng."*
23. (Đã kiểm, giữ nguyên) "150 triệu km", "8 phút", "300.000 km/s", "15 triệu độ" (nếu nói rõ là lõi), "giao thoa: đỉnh+đỉnh sáng, đỉnh+đáy tối", "E tỉ lệ với tần số", "mỗi nguyên tử có vạch phổ riêng".
