# R2: Phổ điện từ, khúc xạ/cầu vồng, thị giác (fact-check Phần 4–6 của SCRIPT.vi.md)

Nghiên cứu ngày 2026-10-13. Mỗi dòng có nguồn xác nhận. **[V]** = đã kiểm trong chính văn bản nguồn (đọc trang hoặc trích
nguyên văn). **[S]** = chỉ xác nhận qua tóm tắt tìm kiếm hoặc trang thứ cấp. **[M]** = theo trí nhớ hoặc tự tính,
chưa có nguồn. Các phép tính tự làm bằng Python ghi **[calc]**; công thức đi kèm để kiểm lại.

Hằng số dùng để tính: c = 299 792 458 m/s; E(eV) = 1239.84 / λ(nm).

---

## Phần 4: Phổ điện từ

### 4.0 Ranh giới các dải (không có ranh giới "chính thức" duy nhất)
- Wikipedia "Electromagnetic spectrum": vi sóng được mô tả là "radio waves of short wavelength", tức là một **tập con của
  sóng vô tuyến** (bảng tham chiếu ITU). Bảng: vi sóng **1 m – 1 mm** (300 MHz – 300 GHz), hồng ngoại **1 mm – 750 nm**,
  khả kiến **380–760 nm** (bảng ghi 400–700; bảng màu ghi 380–750), tử ngoại **~400 – 10 nm**, tia X **~10 nm – 100 pm**
  (0.01–10 nm), gamma **< ~10 pm**, "no defined lower limit". [V] https://en.wikipedia.org/wiki/Electromagnetic_spectrum
- **Tia X và gamma phân theo NGUỒN, không theo bước sóng** (vật lý hạt nhân: gamma đến từ hạt nhân, X đến từ electron;
  thiên văn thì gọi < 100 keV là X). Hai dải chồng lên nhau. [V] cùng trang. → Kịch bản nói "0.01–10 nm" và "dưới 0.01 nm"
  thì chấp nhận được nếu thêm chữ "khoảng".
- Ở Nhật, sách giáo khoa và từ điển hay ghi **可視光線 ≈ 380–780 nm** (theo JIS/CIE). [S] https://www.weblio.jp/content/可視光
  → Dùng **「およそ380〜780ナノメートル」** hoặc gọn hơn **「およそ400〜700」**. Đừng ghi "380–700" (trộn hai quy ước).

### 4.1 Sóng vô tuyến: "vài mét đến hàng km", và Wi-Fi
- Dải radio thật ra trải từ khoảng 1 mm (300 GHz) tới hàng chục nghìn km (theo nghĩa ITU, gồm cả vi sóng). Nếu tách vi sóng
  riêng như kịch bản thì radio là **> ~1 m (< 300 MHz)**. Câu "vài mét đến hàng km" vì vậy đúng với AM/FM/sóng dài. [V] Wikipedia EM.
- **Wi-Fi KHÔNG thuộc dải "vài mét"**: 2.4 GHz → **12.5 cm**, 5 GHz → **6.0 cm** [calc]. Đó là **vi sóng**, cùng dải với lò vi sóng
  (2.45 GHz → 12.2 cm) [calc]. Liên lạc vệ tinh (GPS ~19 cm, truyền hình vệ tinh vài cm) cũng là vi sóng. [M]
- **Sửa:** chuyển Wi-Fi, điện thoại, vệ tinh sang mục vi sóng. Hoặc nói "sóng vô tuyến, kể cả vi sóng". Mục radio chỉ giữ phát thanh, truyền hình.
- Ví dụ "hàng km" kiểu Nhật: **電波時計 / 標準電波 JJY**. NICT phát từ おおたかどや山 (Fukushima, **40 kHz**) và はがね山
  (ranh giới Saga–Fukuoka, **60 kHz**). [S] https://www.nict.go.jp/pamphlet/long_wJ-panf.pdf ·
  https://www.seikowatches.com/instructions/html/SEIKO_7B75_JP/CWVVSYxxhbpilh
  → bước sóng **7.5 km và 5.0 km** [calc]. Đồng hồ treo tường nhà nào cũng có, rất hợp làm móc.
- FM Nhật 76–95 MHz (~3.5 m) [M]; 地デジ UHF 470–710 MHz (~0.5 m) [M].
- "Xuyên qua hầu hết vật liệu": nên làm mềm thành "xuyên qua tường, cơ thể". Kim loại thì phản xạ sóng radio. [M]

### 4.2 Vi sóng và lò vi sóng: chuyện "cộng hưởng của nước" là HUYỀN THOẠI
- "The microwaves in a microwave oven are not tuned to a resonant frequency of water." Trích Ron Schmitt, *Electromagnetics
  Explained*: "There is a popular myth that explains microwave ovens as operating at a special resonance of water
  molecules… The first resonant peak occurs above 1THz… There is no special significance of 2.45 GHz… it is allocated by the
  FCC." Cơ chế: điện trường làm phân tử quay để thẳng hàng với trường, và "Many types of molecules in the food absorb energy…
  not just water". [V] https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/
- Độ hấp thụ điện môi của nước lỏng là một đỉnh **rộng**, ở cỡ vài chục GHz (nhiệt độ phòng). Nếu hấp thụ mạnh cộng hưởng thì
  vi sóng chỉ nung lớp mặt. Tần số thấp hơn đỉnh giúp sóng vào sâu vài cm. 2.45 GHz là dải **ISM** (dải công nghiệp–khoa học–y tế,
  không cần cấp phép). [S] https://maketecheasier.com/how-microwave-ovens-heat-food/
- **"Nấu từ bên trong"** là cách nói sai. Vi sóng chỉ vào sâu **cỡ 1–vài cm** [M, số ước tính]. Lớp ngoài cùng ấy nóng trực tiếp,
  phần lõi của miếng thức ăn to vẫn nóng nhờ dẫn nhiệt. Ý đúng: "làm nóng thẳng các phân tử nước trong lớp ngoài dày vài cm,
  thay vì đợi nhiệt truyền từ bề mặt vào".
- Nhật: **2450 MHz là chuẩn quốc tế**: 「電子レンジで使われるマイクロ波は，国際的に2450MHz（1秒間に24億5 000万回の振動）と定められている」 [S]
  https://www.jsme.or.jp/mechalife/jp/student/mechaland/0306.pdf
- Nhật còn có một bài báo giáo dục **chuyên bác bỏ cách giải thích "ma sát"**: 中村聡「電子レンジの加熱原理に関する誤解」
  『物理教育』54巻2号 (2006). Bài viết nói thuyết nhiệt ma sát giữa các phân tử nước "đã lan vào cả trường học". [S]
  (qua bài trích của ねとらぼ https://nlab.itmedia.co.jp/cont/articles/3770559/; chưa đọc được nguyên văn J-STAGE).
  → Lời đọc tiếng Nhật nên tránh 「水分子どうしの摩擦熱」. Viết: 「水分子が電場の向きにそろおうと回り、そのエネルギーが熱になる」.
- Móc chung cho cả 4.1 và 4.2: ở Nhật ai cũng biết **bật lò vi sóng thì Wi-Fi 2.4 GHz chập chờn**, vì hai thứ dùng cùng dải.
  Hướng dẫn router Elecom có cảnh báo dải 2.4 GHz dùng chung với lò vi sóng. [S]
  https://www.elecom.co.jp/support/manual/network/wireless-lan/router/wrc-x1800gs2/usersmanual/07/section02-3.html

### 4.3 Bức xạ nền vũ trụ (CMB)
- ESA: trong khoảng 380 000 năm đầu, photon va chạm liên tục với electron tự do. Sau khi electron và proton kết hợp thành
  hydro, photon bay tự do. Giãn nở kéo dài chúng thành vi sóng, nhiệt độ ~2.7 K. [S]
  https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_and_the_cosmic_microwave_background
- "Ánh sáng cổ nhất": đúng theo nghĩa ánh sáng cổ nhất **còn quan sát được**. "Bằng chứng trực tiếp của Big Bang": nên nói
  **"bằng chứng mạnh nhất"**. [M]
- Lưu ý: lúc mới phát ra, ánh sáng này **không phải vi sóng**. Nó là ánh sáng khả kiến/hồng ngoại gần, nhiệt độ ~3000 K, rồi bị
  vũ trụ giãn nở kéo thành vi sóng [M]. Đây là chi tiết hay, hợp với chủ đề "cùng một thứ, chỉ khác bước sóng".

### 4.4 Hồng ngoại
- 700 (hoặc 750/780) nm – 1 mm: đúng. [V] Wikipedia EM.
- Đỉnh phát xạ của cơ thể theo định luật Wien: 2898 µm·K / 310 K = **9.3 µm**; da ~33 °C → **9.5 µm** [calc]. Có thể nói "khoảng 10 µm".
  Camera nhiệt thường làm việc ở 8–14 µm. [M]
- "Mọi vật trên độ không tuyệt đối đều phát hồng ngoại": nói chính xác thì mọi vật đều phát bức xạ nhiệt. Ở nhiệt độ thường,
  bức xạ đó gần như toàn bộ là hồng ngoại. Chấp nhận được. [M]
- Điều khiển TV dùng LED ~940 nm (hồng ngoại gần). [S] https://jp.rs-online.com/web/c/displays-optoelectronics/leds-light-emitting-diodes/ir-leds
  Thí nghiệm quen thuộc ở Nhật: 「リモコンをスマホのカメラで見ると光って見える」. **Tuỳ máy** (nhiều camera sau có kính lọc IR,
  camera trước thường thấy). Ghi rõ là tuỳ máy, đừng hứa chắc. [M]

### 4.5 Tử ngoại
- Dải chuẩn (CIE/ISO): **UVA 315–400, UVB 280–315, UVC 100–280 nm** (định nghĩa rộng của UV: 10–400 nm). [S]
  https://ec.europa.eu/health/scientific_committees/opinions_layman/artificial-light/en/glossary/tuv/ultraviolet-radiation.htm ·
  https://docs.r4photobiology.info/photobiologyWavebands/reference/UVB.html
- ARPANSA (cơ quan bức xạ Úc): UVB "causes sunburn and is the major cause of skin cancer"; UVA gây tổn thương dẫn tới "premature
  skin ageing" và "can also cause skin cancer"; UVC bị hấp thụ trước khi tới mặt đất. [S]
  https://www.arpansa.gov.au/sites/default/files/electromagnetic_radiation_from_the_sun.pdf
  → Kịch bản đúng về ý chính. Nên thêm "UVA cũng góp phần gây ung thư da".
- "Đủ năng lượng phá vỡ liên kết ADN": cơ chế chính của UVB là tạo **dimer pyrimidine** (hai base cạnh nhau dính vào nhau), không
  phải "bẻ gãy" sợi. Nói "làm hỏng ADN" là an toàn. [M]
- **Tầng ozone**: tia UVC bị **cả oxy (O₂) lẫn ozone** chặn hết. Tia UVB bị chặn phần lớn (~90%) nhưng vẫn lọt một phần. UVA gần như đi qua hết.
  "all UVC and approximately 90% of UVB radiation is absorbed by ozone, water vapour, oxygen and carbon dioxide" [S]
  https://www.who.int/uv/faq/whatisuv/en/index2.html (WHO, 2016: "all UVC and most UVB").
- **"Không có ozone thì bề mặt Trái Đất bị tiệt trùng"**: nói quá. Ngay cả khi không có ozone, O₂ vẫn chặn phần UV ngắn nhất.
  Sự sống đã có trong đại dương từ trước khi tầng ozone hình thành (nước biển chặn UV) [M]. Câu đúng: **"nếu không có tầng ozone,
  tia UV mạnh sẽ chiếu thẳng xuống mặt đất, và sinh vật trên cạn như hiện nay khó sống nổi"**.
- Ong: ba loại thụ thể của ong mật có đỉnh **344, 436, 544 nm** [S] https://pollinationecology.org/index.php/jpe/article/download/482/168/1850 ;
  vân dẫn mật hấp thụ UV ("nectar guides", dạng hồng tâm) phổ biến ở thực vật có hoa và đã được thử với ong hoang dã trên hoa *Rudbeckia*. [S]
  https://pmc.ncbi.nlm.nih.gov/articles/PMC4001241 → Câu trong kịch bản đúng. Ong **không thấy màu đỏ** như ta: chi tiết đối xứng đẹp. [M]

### 4.6 Tia X
- 0.01–10 nm: đúng ở mức "khoảng" (xem 4.0). [V]
- "Mô mềm cho qua, xương hấp thụ": đúng (canxi có số nguyên tử cao hơn). [M]
- **"sao nơi trong" = gõ nhầm của "sao neutron"**. Sao neutron ăn vật chất từ sao đồng hành tạo ra cột bồi tụ ở hai cực và phát tia X.
  Đã biết hơn 200 pulsar tia X. [S] https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/m31pulsar_xmm.html ·
  https://ntrs.nasa.gov/citations/20180006096
  Thêm: tàn dư siêu tân tinh và đĩa bồi tụ quanh hố đen cũng phát tia X. [M]

### 4.7 Tia gamma: "gấp hàng tỷ lần"?
- Photon khả kiến: **1.8 eV (đỏ 700 nm) – 3.1 eV (tím 400 nm)**, ~2.25 eV ở 550 nm [calc].
- Gamma từ phân rã phóng xạ: Cs-137 **0.662 MeV**, Co-60 **1.17 và 1.33 MeV** [S]
  https://web.as.uky.edu/biology/faculty/cooper/Gamma%20knife-Nuclear%20medicine/ppt%20content%20on%20Gamma%20knife.pdf (Co-60)
  → gấp khoảng **300 000 – 750 000 lần** [calc]. Tức là **"hàng trăm nghìn đến một triệu lần"**, KHÔNG phải tỷ lần.
- "Tỷ lần" chỉ đúng với gamma vũ trụ năng lượng cỡ GeV: 1 GeV / 2.25 eV ≈ **4.4 × 10⁸** [calc]. Wikipedia nêu photon gamma năng lượng nhất
  "around a billion electron volts" là mốc thiên văn thường dùng [V Wikipedia EM]. Thực tế còn có photon cao hơn nhiều (TeV–PeV) [M].
- **Sửa:** "Photon gamma từ chất phóng xạ mang năng lượng gấp **khoảng một triệu lần** photon ánh sáng. Gamma từ vũ trụ có thể gấp **hàng tỷ lần**."
- **Xạ trị**: phần lớn xạ trị ngoài ngày nay dùng **tia X megavolt từ máy gia tốc tuyến tính (linac)**. Riêng **Gamma Knife** dùng
  **192 nguồn Co-60** (đời cũ 201 nguồn). [S] https://images.radiopaedia.org/articles/gamma-knife?lang=us ·
  https://web.as.uky.edu/biology/faculty/cooper/Gamma%20knife-Nuclear%20medicine/ppt%20content%20on%20Gamma%20knife.pdf
  Câu "phần lớn là linac" chưa có số liệu tỉ lệ [M]. Câu an toàn: **"y học dùng tia gamma và tia X năng lượng cao để diệt tế bào ung thư"**.

---

## Phần 5: Khúc xạ, tán sắc, cầu vồng, bầu trời

### 5.1 Tốc độ trong nước
- n(nước) ≈ 1.333 → v = c/n = **224 900 km/s**, chậm hơn **25.0%** [calc]. Kịch bản đúng.
- Đáy hồ trông nông hơn: độ sâu biểu kiến = độ sâu thật / n ≈ **3/4** (khi nhìn gần thẳng đứng). "A 1m deep pond would only appear to be
  0.75 m deep when viewed from directly above." [S] https://www.schoolphysics.co.uk/animations/Real_and_apparent_depth/real_and_apparent_depth.doc
  Nhìn càng xiên thì trông càng nông hơn. [M] → Có thể đưa con số "hồ sâu 2 m trông như 1.5 m" lên hình.
- Chiếc đũa gãy: giải thích đúng. [M]
- **Ví dụ xe chạy xuống cát**: đây là phép so sánh chuẩn trong sách giáo khoa (cùng loại với "đội diễu hành", "bánh xe lăn vào thảm cỏ").
  Nó minh hoạ đúng việc mặt sóng đổi hướng, kể cả chiều quay: đi vào môi trường chậm thì lệch về phía pháp tuyến. Giới hạn: ánh
  sáng chậm lại không phải vì "ma sát". Không cần nói thêm trong video. [M]
- Ở Nhật, 中1 理科 dạy 光の反射・屈折 bằng ví dụ 「水中の物が浮き上がって見える」 và 「コップの中のストローが折れて見える」 [M]
  (xem mục J2): đúng thứ người xem đã học.

### 5.2 Tán sắc và Newton
- Wikipedia "Isaac Newton": "In 1666, Newton observed that the spectrum of colours exiting a prism… is oblong". Ông kết luận "colour is
  a property intrinsic to light", và phổ "could be recomposed into white light by a lens and a second prism". Bài báo năm **1672**
  (Philosophical Transactions) "forms the basis for all work that followed on colour". [V] https://en.wikipedia.org/wiki/Isaac_Newton
- **Newton có phải "người đầu tiên chứng minh"?** Hiện tượng lăng kính tạo ra màu đã được biết từ lâu. **Descartes, Hooke (và Marci)**
  cũng đã làm thí nghiệm lăng kính, nhưng họ cho rằng **lăng kính làm biến đổi ánh sáng**. Cái mới của Newton là **experimentum crucis**:
  tách riêng một màu, cho qua lăng kính thứ hai, màu ấy **không đổi nữa**. Thêm vào đó ông gộp các màu trở lại thành trắng.
  "Descartes had thought that passing through a prism actually modified the light." [S]
  https://wwwe.lib.cam.ac.uk/CUL/exhibitions/Footprints_of_the_Lion/work.pdf · https://charlesreid1.com/wiki/Essay_Newton
  (Vai trò của Marci [M]: *Thaumantias*, 1648.)
- **Sửa:** "Newton không phải người đầu tiên thấy cầu vồng trong lăng kính. Ông là người đầu tiên chứng minh rằng **màu sắc vốn đã có
  sẵn trong ánh sáng trắng**, lăng kính chỉ tách chúng ra." Có thể kèm hai lăng kính (experimentum crucis, 1666; công bố 1672).

### 5.3 Cầu vồng
- Cầu vồng chính ~**42°** tính từ **điểm đối nhật** (bóng đầu của bạn). Góc của tím ~40.7°, của đỏ ~42.4° (Wikipedia ghi 40.89–42°).
  Một lần phản xạ trong. Cầu vồng phụ ở **~50–53°**, hai lần phản xạ, màu đảo ngược (đỏ ở trong). Cầu vồng phụ mờ hơn vì
  "more light escapes after two reflections" và vì nó trải trên vùng trời rộng hơn. [V] https://en.wikipedia.org/wiki/Rainbow
- Câu "42° so với hướng ánh sáng Mặt Trời đi vào" đúng về hình học (tia bị bẻ ngược 138°, 180−138 = 42), nhưng khó hình dung.
  Nên nói: **"42° quanh cái bóng đầu của bạn"**.
- **Dải tối Alexander** (giữa hai cầu vồng, do Alexander xứ Aphrodisias mô tả ~năm 200): [V] Wikipedia Rainbow ·
  [S] https://www.astronomy.com/science/rare-rainbow-phenomena/ . Tiếng Nhật: **アレキサンダーの暗帯** [V ja.wikipedia 虹].
- "Mỗi giọt nước chỉ gửi đến mắt bạn một màu": **gần đúng, nên giữ** (có ghi chú). Mỗi giọt tung đủ màu ra các hướng khác nhau.
  Tia đi đúng vào mắt bạn ra ở một góc duy nhất, nên mang một dải màu hẹp. Giọt rơi xuống thì "màu của nó" đổi theo. [M, suy từ hình học trên]
- Cầu vồng gắn với người nhìn: "each observer's two eyes, never see exactly the same rainbow". [V] Wikipedia Rainbow. Kịch bản đúng.
- Lịch sử (để ngỏ, có thể bỏ): Theodoric xứ Freiberg (~1307) và Kamāl al-Dīn al-Fārisī (~1309) giải thích cầu vồng chính và phụ.
  **Descartes (1637)** tính đúng cả hai góc. [V] Wikipedia Rainbow.
- **Bảy màu**: Newton năm 1672 chia phổ thành 5 màu, sau thêm cam và chàm cho đủ **7, để khớp với 7 nốt nhạc**. [V] Wikipedia Rainbow,
  [V] ja.wikipedia 虹. → xem móc J1.

### 5.4 Bầu trời xanh: (700/450)⁴, và vì sao trời không tím
- (700/450)⁴ = **5.86** → "gần 6 lần" là đúng [calc]. Ánh sáng tím 400 nm: (700/400)⁴ = **9.4 lần** [calc].
- **Vì sao trời không màu tím** dù tím tán xạ mạnh nhất: (1) Mặt Trời phát ít tím hơn xanh lam (sau khi qua khí quyển). (2) Mắt kém
  nhạy với tím. (3) Ánh sáng từ bầu trời là hỗn hợp nhiều bước sóng, và cả ba loại tế bào nón cùng "đọc" hỗn hợp đó thành xanh lam nhạt.
  [S] https://www.weather.gov/fgz/SkyBlue · https://bigthink.com/starts-with-a-bang/why-the-sky-is-blue-according-to-science/
  → Nên thêm một câu, vì người xem tinh ý sẽ hỏi. Câu này cũng nối thẳng sang Phần 6: màu nằm trong đầu bạn.
- "Phân tử nhỏ hơn nhiều so với bước sóng": đúng, là điều kiện của tán xạ Rayleigh. Mây trắng vì giọt nước to, tán xạ mọi màu như nhau
  (tán xạ Mie) [M]. Đây là chi tiết đối chứng hay.
- Hoàng hôn: giải thích đúng (đường đi dài qua khí quyển làm mất màu xanh). [S] https://kids.rurubu.jp/article/159432/ ·
  https://shokabo.co.jp/sp_e/x-ray/familiar/sky/sky.htm . Bụi và sol khí làm màu đậm hơn. [S] cùng trang Shokabo.
  Kịch bản viết "chiếu thẳng đến mắt bạn qua Mặt Trời", nên viết lại: **"ánh sáng đi thẳng từ Mặt Trời tới mắt"**.

---

## Phần 6: Vì sao thấy màu

### 6.1 Quả táo
- Hấp thụ phần lớn bước sóng ngắn và trung bình, phản xạ **một dải** bước sóng dài (không phải "bước sóng đỏ" duy nhất). [M]
- Câu "quả táo không có màu đỏ" dễ gây tranh cãi. Nên chia ra: **tính chất phản xạ nằm ở quả táo; cảm giác "đỏ" nằm trong não**.

### 6.2 Giác mạc và thủy tinh thể
- Giác mạc ~**43 D**, khoảng **2/3** tổng công suất khúc xạ của mắt (~60 D). Thủy tinh thể ~**15–20 D**, là phần **điều chỉnh được** (điều tiết).
  "the cornea refracts light, accounting for approximately two-thirds of the eye's total optical power… approximately 43 dioptres" [S]
  https://kiwix.lema.org/wikipedia_en_all_mini_2024-02/A/Cornea · https://www.lens.com/what-is/ocular-dioptrics/
- **Thêm vào kịch bản**: "phần lớn việc bẻ ánh sáng là do **giác mạc** làm, thủy tinh thể chỉ **tinh chỉnh** để lấy nét". Kịch bản hiện tại
  ngầm để thủy tinh thể làm hết việc hội tụ.

### 6.3 Số tế bào que và tế bào nón
- Nghiên cứu chuẩn (Curcio et al. 1990, *J Comp Neurol*, 8 võng mạc người 27–44 tuổi): **tế bào que trung bình 92 triệu (77.9–107.3 triệu);
  tế bào nón 4.6 triệu (4.08–5.29 triệu)**. [S] https://pubmed.ncbi.nlm.nih.gov/2324310/
- Sách giáo khoa thường ghi "~120 triệu que, ~6 triệu nón" (đây là gốc của con số "130 triệu" trong kịch bản). Một nghiên cứu khác đếm
  được ~60 triệu que và ~3.2 triệu nón. [S] (cùng kết quả tìm kiếm). Con số khác nhau tuỳ phương pháp và từng người.
- **Sửa:** "khoảng **100 triệu** tế bào que và khoảng **5 triệu** tế bào nón" (hoặc 「約1億個」「約500万個」). Con số "nón 6–7 triệu" trong kịch bản
  hơi cao; "130 triệu" tổng chỉ là số tròn của sách cũ.

### 6.4 Ba loại tế bào nón
- Bowmaker & Dartnall (1980), đo vi phổ trên võng mạc người: L **562.8 ± 4.7 nm**, M **533.8 ± 3.7**, S **420.3 ± 4.7**. [S]
  (abstract qua tìm kiếm, https://pmc.ncbi.nlm.nih.gov/articles/PMC1279132). Wikipedia Photopsin: S ~420, M ~534, L ~564 nm. [V]
  https://en.wikipedia.org/wiki/Photopsin
- **Đỉnh của nón L ~560 nm là màu vàng–lục, KHÔNG phải đỏ.** Nón L chỉ là loại nhạy nhất ở **vùng đỏ** so với hai loại kia.
  Màu đỏ được "đọc" ra từ **tỉ lệ L > M** (L mạnh, M yếu hơn). Táo đỏ kích thích L mạnh nhất, M yếu hơn, S gần như không: đúng như kịch bản.
- Nhật: SGK 生物 gọi ba loại là 「青錐体・緑錐体・赤錐体」 [S] (kết quả tìm kiếm tiếng Nhật ở 6.6). → Có thể dùng, nhưng nên kèm câu
  「赤錐体といっても、いちばん感じやすいのは黄緑のあたり」. Hoặc gọi trung tính **「L錐体・M錐体・S錐体」**.

### 6.5 Rhodopsin là của tế bào QUE, không phải tế bào nón (lỗi trong kịch bản)
- Wikipedia Photopsin: opsin của tế bào nón gọi là **photopsin**; khi gắn retinal thì gọi là **iodopsin** (nhóm opsin nón). Opsin của tế bào que
  (scotopsin) gắn retinal thì thành **rhodopsin**, đỉnh ~500 nm, dùng cho nhìn trong tối. Cả hai loại đều dùng sắc tố **11-cis-retinal**.
  Ánh sáng làm nó **đồng phân hoá sang all-trans** và khởi động chuỗi truyền tín hiệu. [V] https://en.wikipedia.org/wiki/Photopsin
- Kịch bản viết "photon từ quả táo đập vào phân tử Rhodopsin" là **sai**: màu đỏ của táo là do **tế bào nón** đọc, qua **opsin nón**.
  Sửa: "photon chạm vào **sắc tố thị giác** trong tế bào nón (ở tế bào que thì đó là rhodopsin)".
  Cách đơn giản nhất cho video: nói về **retinal**, phân tử chung của mọi sắc tố thị giác, bị ánh sáng **bẻ thẳng ra** (11-cis → all-trans).
  Đây là "khoảnh khắc ánh sáng biến thành hoá học". Quá trình đồng phân hoá diễn ra trong vài trăm femto giây. [S] https://www.biophysics.org/Portals/0/BPSAssets/Articles/Phototransduction.pdf
- Chuỗi phản ứng: opsin hoạt hoá → transducin → cGMP giảm → kênh cation **đóng** → tế bào thụ cảm **phân cực mạnh hơn** (hyperpolarization)
  → giảm giải phóng chất dẫn truyền. [S] https://geneglobe.qiagen.com/knowledge/pathways/phototransduction-pathway
- **Tín hiệu đầu tiên là tín hiệu biến thiên liên tục (graded), không phải xung.** Xung điện (điện thế hoạt động) bắt đầu ở **tế bào hạch**,
  rồi sợi trục của chúng chạy về não thành dây thần kinh thị giác. [S] cùng nguồn + kết quả tìm kiếm. Điều thú vị: tế bào thụ cảm
  **giảm** tín hiệu khi có ánh sáng ("trong tối chúng 'nói' nhiều hơn") [M]. Có thể dùng làm chi tiết bất ngờ.
- Câu "ánh sáng kết thúc hành trình tại võng mạc, sau đó chỉ còn xung điện" chấp nhận được, vì võng mạc là nơi photon bị hấp thụ.
  Nếu muốn chính xác thì nói "chỉ còn tín hiệu điện–hoá".
- Lưu ý nhỏ: ánh sáng đi **xuyên qua các lớp tế bào thần kinh** của võng mạc trước khi tới tế bào thụ cảm nằm ở lớp sau cùng (võng mạc "lộn ngược"). [M]

### 6.6 "Màu sắc ở trong đầu bạn"
- Đúng về mặt khoa học, với điều kiện chia rõ: **bước sóng là vật lý; màu là nhận thức**. Ví dụ đối chứng mạnh nhất có sẵn trong video:
  **trời xanh chứ không tím** (5.4), và **màu hồng cánh sen/tím đỏ (magenta) không có trong cầu vồng**, vì nó là não tạo ra khi nón S và nón L
  cùng bị kích thích [M]. Chỉ nên dùng nếu còn thời gian.

---

## J. Móc bản địa hoá tiếng Nhật (đã kiểm chứng)

**J1. 虹は七色.** ja.wikipedia 虹 viết: thời Edo người ta viết 「紅緑の虹」, tranh của 西川如見 có cầu vồng tô 4 màu. Quan niệm
"cầu vồng bảy màu" vào Nhật **cùng khoa học Âu–Mỹ cuối Edo – đầu Minh Trị** (sách nhập môn 『理学初歩』). Từ 1952 giới chuyên môn đã chuyển
sang 6 màu, nhưng hầu hết SGK kiểm định vẫn ghi 7. Ở các nước khác: Mỹ (và một số vùng của Anh) 6 màu (từ 1948, theo Bertha Morris Parker),
Đức và Trung Quốc 5 màu, tiếng Shona 3, tiếng Bassa 2. [V] https://ja.wikipedia.org/wiki/虹 · 板倉聖宣: 「多くの日本人は『虹は七色』と思っています。
ところが、今の大多数の米国人は『虹は六色』と思っています」 [S] https://www.lib.hit-u.ac.jp/images/2019/12/tz_009.pdf (trích qua tìm kiếm).
→ **Móc mạnh nhất cho Phần 5**: "Bảy màu là do Newton đếm theo bảy nốt nhạc. Ánh sáng thì liên tục, không có ranh giới." Gắn đúng
với kết luận "màu ở trong đầu bạn". Gợi ý lời đọc: 「虹は七色、と習いました。でも七つに分けたのはニュートンで、音階の『ドレミファソラシ』に合わせたからです。
アメリカでは六色、ドイツでは五色と数えます。光そのものに、境目はありません。」 (giữ 「ドイツ」 nhưng tránh nêu thêm nước nếu chưa chắc).

**J2. Chương trình học ở Nhật** (để lời đọc khớp với những gì khán giả đã học):
- **中1 理科 「光と音」**: 光の反射・屈折 (học quy luật ở mặt phân cách nước/thuỷ tinh), 凸レンズのはたらき. Từ chương trình 平成29年告示,
  mục phản xạ–khúc xạ có thêm **（光の色を含む）**, tức là có tách ánh sáng trắng bằng lăng kính. [S]
  https://britannica.co.jp/cms/wp-content/uploads/2025/04/009_中1_理科_光の屈折.pdf · https://www.pref.kochi.lg.jp/doc/2023070400073/file_contents/file_2024111493556_1.pdf
  → Người Nhật đã học 屈折, 全反射, 「浮き上がって見える」 từ năm 13 tuổi. Có thể nói 「中学1年で習った屈折」.
- **中2 理科 「刺激と反応」**: cấu tạo mắt, gồm 角膜・虹彩・水晶体・網膜・視神経. Hay có bài mổ mắt lợn. [S]
  https://www.pref.chiba.lg.jp/kyouiku/shidou/gakuryoku/yaruki/rika/documents/18r02.pdf · https://www1.iwate-ed.jp/07tantou/kagaku/h26_kagakutoningen/kagakutoningen_support/04_seimei/20_buta_me.pdf
- **高校物理 (môn 物理, không phải 物理基礎)**: 光の性質 (分散・偏光) → 光の伝わり方 (屈折・全反射・散乱) → 回折と干渉 (ヤングの実験,
  回折格子, 薄膜). [S] https://www.jasso.go.jp/ryugaku/eju/examinee/syllabus/science_phy.html · https://www.metro.ed.jp/minamidaira-h/assets/【物理演習】.pdf
  光電効果 nằm ở phần 原子 của môn 物理 [M]. → Thí nghiệm Young ở Phần 1 và hiệu ứng quang điện ở Phần 2 = "những gì bạn học ở 高校物理".
- **高校生物**: 視細胞 = 錐体細胞 (sáng, nhìn màu, tập trung ở 黄斑・中心窩) + 桿体細胞 (tối, có ロドプシン, nhiều ở vùng rìa).
  Đề thi đại học hay hỏi "vì sao nhìn lệch đi trong tối lại thấy rõ hơn". [S] https://www.gifu-u.ac.jp/uploads/seibutuR7%20zenki.pdf ·
  https://www.weblio.jp/content/Rod+Cell → Mẹo "nhìn sao mờ bằng khoé mắt" (averted vision) là móc thực tế tốt cho đoạn tế bào que.

**J3. 電子レンジ 2450MHz** (4.2) + **電子レンジでWi-Fiが切れる** (4.1–4.2): cả hai đã có nguồn ở trên. Đây là móc Phần 4 tốt nhất
cho người Nhật: "lò vi sóng và Wi-Fi nhà bạn là cùng một loại ánh sáng".

**J4. 電波時計 / JJY 40・60 kHz** (4.1): sóng dài 5–7.5 km phát từ hai ngọn núi ở Nhật.

**J5. 夕焼け / 赤富士**: 赤富士 là cảnh núi Phú Sĩ đỏ rực dưới nắng sớm, thường vào cuối hè đầu thu; tranh 凱風快晴 của 北斎 vẽ cảnh này
[M, chưa tra]. Nó minh hoạ đúng cơ chế hoàng hôn: ánh sáng đi xiên qua lớp khí quyển dày, còn lại màu đỏ. Thêm 「夕焼けの翌日は晴れ」
(tục ngữ thời tiết, [M]). **Kiểm lại trước khi lên hình**: mùa nào, giờ nào, và tranh nào là 凱風快晴.

**J6. Ví dụ hằng ngày ở Nhật cho tia UV**: 日焼け止め có ghi **SPF** (chặn UVB) và **PA+〜PA++++** (chặn UVA). Hệ PA là chuẩn của Nhật [M].
Rất hợp để gắn UVA ↔ 老化 (lão hoá), UVB ↔ 日焼け (cháy nắng). Kiểm lại nguồn (日本化粧品工業連合会) trước khi đưa vào lời đọc.

### J7. Thuật ngữ: chữ hiện trên hình và cách đọc khuyến nghị

| khái niệm | chữ hiện (theo SGK) | cách đọc (kana) | ghi chú |
|---|---|---|---|
| sóng điện từ | 電磁波 | でんじは | |
| sóng vô tuyến | 電波 | でんぱ | Luật 電波法 định nghĩa 電波 là sóng điện từ ≤ 3 THz [M]. Vì vậy 「電波」 bao cả vi sóng |
| vi sóng | マイクロ波 | マイクロは | không dùng 「マイクロウェーブ」 |
| hồng ngoại | 赤外線 | せきがいせん | |
| ánh sáng khả kiến | 可視光線 (hoặc 可視光) | かしこうせん | |
| tử ngoại | 紫外線 | しがいせん | UVA/UVB/UVC đọc ユーブイエー… → chú âm |
| tia X | X線 | エックスせん | chú âm `{X線|エックスせん}` theo luật WRITING #3 |
| tia gamma | γ線 / ガンマ線 | ガンマせん | hiện ガンマ線 cho dễ đọc |
| bức xạ nền vũ trụ | 宇宙マイクロ波背景放射 | うちゅうマイクロははいけいほうしゃ | dài, có thể nói 「宇宙の最初の光」 |
| bước sóng / tần số | 波長 / 振動数 (SGK) · 周波数 (điện) | はちょう / しんどうすう · しゅうはすう | SGK vật lý dùng 振動数 cho ánh sáng |
| khúc xạ / chiết suất | 屈折 / 屈折率 | くっせつ / くっせつりつ | |
| phản xạ toàn phần | 全反射 | ぜんはんしゃ | |
| tán sắc | (光の)分散 | ぶんさん | |
| tán xạ (Rayleigh) | 散乱 (レイリー散乱) | さんらん | |
| lăng kính / quang phổ | プリズム / スペクトル | | |
| cầu vồng chính / phụ | 主虹 / 副虹 | しゅにじ / ふくにじ | **chú âm**: ja.wikipedia ghi cả しゅこう/しゅにじ |
| dải tối Alexander | アレキサンダーの暗帯 | アレキサンダーのあんたい | |
| hoàng hôn | 夕焼け | ゆうやけ | |
| giác mạc / mống mắt | 角膜 / 虹彩 | かくまく / こうさい | |
| thủy tinh thể / thể thủy tinh | 水晶体 / ガラス体 (硝子体) | すいしょうたい / ガラスたい | |
| võng mạc / dây thần kinh thị giác | 網膜 / 視神経 | もうまく / ししんけい | |
| tế bào thụ cảm | 視細胞 | しさいぼう | |
| tế bào nón / tế bào que | 錐体細胞 / 桿体細胞 | すいたいさいぼう / かんたいさいぼう | **luôn chú âm** 桿 (かん). Chữ hiếm, giọng dễ đọc sai |
| rhodopsin / sắc tố thị giác | ロドプシン / 視物質 | ろどぷしん / しぶっしつ | 視物質 là từ trung tính, dùng được cho cả nón |
| retinal | レチナール | | |
| hoàng điểm / hố trung tâm | 黄斑 / 中心窩 | おうはん / ちゅうしんか | |
| hiệu ứng quang điện | 光電効果 | こうでんこうか | |
| giao thoa / nhiễu xạ | 干渉 / 回折 | かんしょう / かいせつ | |

---

## SỬA CHO SCRIPT

| # | câu nguồn (SCRIPT.vi.md) | điều đúng | lời đọc gợi ý (đơn giản) |
|---|---|---|---|
| 1 | "Bước sóng từ khoảng 380 đến 700 nanomet" | Ranh giới mờ; SGK Nhật ghi ~380–780 nm | 「およそ400〜700ナノメートル。ほんの一握りの幅です」 hoặc 「380〜780」 |
| 2 | Radio "vài mét đến hàng km… phát thanh, truyền hình, **Wifi** và liên lạc vệ tinh" | Wi-Fi 12.5 cm / 6 cm, vệ tinh vài cm: là **vi sóng** | Radio: "phát thanh, truyền hình, đồng hồ sóng radio (5–7.5 km)". Chuyển Wi-Fi và vệ tinh sang vi sóng |
| 3 | "Tần số này bị phân tử nước hấp thụ mạnh… kích thích phân tử nước **từ bên trong**" | 2.45 GHz **không** phải cộng hưởng của nước (đỉnh ở cỡ chục GHz trở lên). Nó là dải ISM được cấp phép. Cơ chế là đốt nóng điện môi: phân tử phân cực quay theo điện trường đổi chiều 2.45 tỷ lần/giây. Sóng vào sâu vài cm; lõi nóng nhờ dẫn nhiệt | "Điện trường đổi chiều 2.45 tỷ lần mỗi giây. Phân tử nước cứ xoay theo, và chuyển động đó thành nhiệt. Sóng vào sâu vài centimet, chứ không phải nấu từ tâm ra." Tránh nói "ma sát giữa các phân tử" (xem 中村 2006) |
| 4 | CMB "là bằng chứng trực tiếp của vụ nổ lớn" | Là bằng chứng mạnh nhất. Lúc phát ra là ánh sáng ~3000 K, sau đó bị giãn thành vi sóng | "Lúc sinh ra nó là ánh sáng đỏ cam. Vũ trụ giãn ra 13.8 tỷ năm, kéo nó dài thành vi sóng." |
| 5 | (IR) "Cơ thể bạn đang phát ra hồng ngoại" | Đúng; đỉnh ≈ 9.4 µm | "Cơ thể bạn đang phát sáng, ở bước sóng khoảng 10 micromet." |
| 6 | "UVA xuyên qua da, gây lão hóa; UVB… nguyên nhân chính của ung thư da" | Đúng; thêm: UVA cũng góp phần gây ung thư da | giữ; thêm 「UVAも皮膚がんの原因になります」 |
| 7 | "phá vỡ liên kết trong phân tử ADN" | UVB làm ADN dính sai (dimer), không phải bẻ gãy | "Đủ mạnh để làm hỏng ADN." |
| 8 | "Tầng ozone hấp thụ hầu hết tia UVC… Nếu không có tầng ozone, bề mặt Trái Đất sẽ bị tiệt chủng" | UVC bị O₂ + O₃ chặn **toàn bộ**; ozone chặn phần lớn UVB. "Tiệt chủng/tiệt trùng" là nói quá | "Oxy và ozone chặn hết UVC, ozone chặn phần lớn UVB. Không có tầng ozone, sinh vật trên cạn như hiện nay khó sống nổi." |
| 9 | "từ **sao nơi trong**" | gõ nhầm → **sao neutron** | 「中性子星」 (ちゅうせいしせい) |
| 10 | Tia X "0,01 đến 10 nm"; gamma "dưới 0,01 nm" | Đúng ở mức "khoảng". Thực ra X và gamma phân theo nguồn (electron hay hạt nhân), hai dải chồng nhau | giữ, thêm 「およそ」 |
| 11 | Gamma "năng lượng gấp **hàng tỷ lần** photon khả kiến" | Gamma phóng xạ (0.66–1.33 MeV) ÷ ~2 eV ≈ **30 vạn – 75 vạn lần**. Chỉ gamma vũ trụ ≥ GeV mới gấp ~tỷ lần | "Gamma từ chất phóng xạ: mạnh gấp khoảng một triệu lần ánh sáng thường. Gamma từ vũ trụ: có khi gấp hàng tỷ lần." |
| 12 | "y học dùng tia gamma trong xạ trị ung thư" | Phần lớn xạ trị ngày nay dùng tia X năng lượng cao từ máy gia tốc; Gamma Knife dùng 192 nguồn Co-60 | "Y học dùng tia gamma và tia X năng lượng cao để diệt tế bào ung thư." |
| 13 | "trong nước chậm hơn khoảng 25%, còn khoảng 225.000 km/s" | Đúng (224 900 km/s, n = 1.333) | giữ |
| 14 | "đáy hồ bơi trông nông hơn thực tế… ảo giác khoảng cách" | Đúng; độ sâu biểu kiến ≈ 3/4 | "Hồ sâu 2 mét nhìn từ trên xuống chỉ như 1.5 mét." (khớp 「浮き上がって見える」 trong SGK 中1) |
| 15 | "**Newton là người đầu tiên chứng minh** điều này" (tán sắc) | Lăng kính tạo màu đã được biết từ trước (Descartes, Hooke, Marci). Họ tin lăng kính **sinh ra** màu. Newton (1666, công bố 1672) chứng minh màu **có sẵn** trong ánh sáng trắng: một màu qua lăng kính thứ hai không đổi, gộp lại thì thành trắng | "Trước Newton, người ta nghĩ lăng kính tô màu cho ánh sáng. Newton dùng lăng kính thứ hai và chứng minh: màu vốn đã nằm sẵn trong ánh sáng trắng." |
| 16 | "đỏ… 42 độ so với hướng ánh sáng Mặt Trời đi vào, tím… 40 độ" | Đúng về hình học; dễ hiểu hơn: 42° quanh điểm đối nhật | "Quay lưng về phía Mặt Trời. Cầu vồng là vòng tròn 42 độ quanh cái bóng đầu của bạn." |
| 17 | "Mỗi giọt nước chỉ gửi đến mắt bạn **một** bước sóng duy nhất" | Gần đúng: mỗi giọt tung mọi màu, nhưng chỉ một màu đi đúng vào mắt bạn | "Mỗi giọt bắn đủ màu ra mọi phía, nhưng chỉ một màu bay đúng vào mắt bạn." |
| 18 | Cầu vồng phụ: "Mỗi lần phản xạ mất bớt năng lượng nên… mờ hơn… đảo ngược" | Đúng (thêm: nó trải rộng hơn) | giữ; có thể thêm アレキサンダーの暗帯 |
| 19 | "đỏ, cam, vàng, lục, lam, chàm đến tím" | Bảy màu là quy ước Newton đặt theo 7 nốt nhạc | móc J1: 「七色はニュートンが音階に合わせて決めた数」 |
| 20 | "xanh dương ~450 nm… mạnh gấp gần 6 lần… đỏ 700 nm" | (700/450)⁴ = 5.86: đúng | giữ |
| 21 | (thiếu) vì sao trời không tím | Tím tán xạ mạnh hơn nữa (9.4×), nhưng ánh nắng có ít tím và mắt kém nhạy với tím | **thêm**: "Tím còn bị tán xạ mạnh hơn. Nhưng ánh nắng ít tím, và mắt ta kém nhạy với tím. Não đọc hỗn hợp đó thành xanh." |
| 22 | "chiếu thẳng đến mắt bạn **qua** Mặt Trời" | lỗi chữ | "đi thẳng từ Mặt Trời tới mắt bạn" |
| 23 | "Quả táo… phản xạ lại bước sóng dài tương ứng với đỏ… quả táo không có màu đỏ" | Phản xạ một **dải** bước sóng dài. Tính chất phản xạ thuộc về quả táo, cảm giác "đỏ" thuộc về não | "Quả táo trả lại phần ánh sáng bước sóng dài. Chữ 'đỏ' là cái tên não đặt cho phần ánh sáng đó." |
| 24 | "đi qua giác mạc, qua thủy tinh thể… lấy nét" | Giác mạc làm ~2/3 việc hội tụ; thủy tinh thể tinh chỉnh | "Giác mạc bẻ ánh sáng nhiều nhất. Thủy tinh thể đổi độ dày để chỉnh nét." (khớp 中2) |
| 25 | "khoảng 130 triệu tế bào cảm quang… que (khoảng 120 triệu)… nón (khoảng 6-7 triệu)" | Curcio 1990: que 92 triệu (78–107), nón 4.6 triệu (4.1–5.3); sách cũ ghi 120/6 | "Khoảng 100 triệu tế bào que, khoảng 5 triệu tế bào nón." 「約1億個」「約500万個」 |
| 26 | "L nhạy bước sóng dài (**đỏ**)" | Đỉnh của L ~560 nm = vàng–lục. "Đỏ" là do L mạnh hơn M | "Loại L nhạy nhất ở vùng vàng–lục, nhưng là loại duy nhất còn bắt tốt ánh sáng đỏ." Hoặc gọi L/M/S, không gắn tên màu |
| 27 | "photon va vào phân tử **Rhodopsin**" (nói về photon từ quả táo, tức là tế bào nón) | Rhodopsin chỉ có ở **tế bào que**; tế bào nón dùng opsin nón (photopsin). Cả hai mang **retinal**, bị ánh sáng bẻ 11-cis → all-trans | "Photon chạm vào một phân tử nhỏ tên là retinal và bẻ thẳng nó ra. Đó là khoảnh khắc ánh sáng biến thành hoá học." Chỉ nói 「ロドプシン」 khi bàn về tế bào que/nhìn trong tối |
| 28 | "kích hoạt chuỗi phản ứng hóa học tạo tín hiệu điện… Tín hiệu truyền qua dây thần kinh thị giác" | Tế bào thụ cảm **hyperpolarize** (tín hiệu biến thiên, không phải xung). Xung bắt đầu ở **tế bào hạch**; sợi trục của chúng là dây thần kinh thị giác | "Tín hiệu đi qua vài lớp tế bào trong võng mạc, rồi mới thành xung điện chạy về não." |
| 29 | Kết luận: "hội tụ xuống võng mạc và vào phân tử Rhodopsin" | như #27 | "…vào sắc tố thị giác trong tế bào nón" / 「視細胞の中の視物質」 |
| 30 | "Màu sắc không có trong vật lý, nó có trong đầu bạn" | Đúng nếu nói rõ: bước sóng thuộc vật lý, màu thuộc nhận thức | "Vật lý chỉ có bước sóng. Màu là thứ não bạn vẽ lên." Bằng chứng ngay trong video: trời xanh chứ không tím (#21), cầu vồng 7 màu là quy ước (#19) |
