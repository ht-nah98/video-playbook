from gen import *
S = '0:00 1:27 2:17 3:05 3:50 4:45 5:49 6:45 7:35 8:47 9:31 10:21 11:21 12:14 13:47 14:17 15:31 16:18 16:56 18:02 19:10'.split()
def yrs(L):  # [intro, 30k, 3000BC, 1800-1600BC, 300BC, 'Brahmagupta y el cero', ...] with year prefixes added
    Y = [None, None, None, None, None, '628', None, '1202', '1545', '1585', '1637', None, None, '1829', '1854', '1874', '1901', '1931', '1936', None, None]
    return [(f'{y} — {n}' if y else n) for y, n in zip(Y, L)]
D = {}
D['es'] = ('Cómo la humanidad inventó las matemáticas, una idea prohibida a la vez', desc('es',
"""En 1299, los banqueros de Florencia prohibieron los números que usas todos los días. El cero se consideraba nada, los números negativos se llamaban ficticios y la raíz cuadrada de menos uno se descartaba como inútil. Hoy, cada una de esas ideas está en un libro de texto escolar.

Este video recorre toda la línea de tiempo de 30 000 años de las matemáticas, desde un hueso de lobo con muescas hasta el teléfono de tu bolsillo: quién inventó cada idea, por qué hacía falta y por qué tantas de ellas fueron combatidas antes de ser aceptadas.""", S, yrs(
['Introducción', 'Hace unos 30 000 años — una marca en un hueso', 'Hacia el 3000 a. C. — Sumeria', 'Hacia 1800–1600 a. C. — Babilonia y Egipto', 'Hacia el 300 a. C. — Euclides', 'Brahmagupta y el cero', 'Hacia el 820 — Al-Juarismi', 'Fibonacci, y una prohibición', 'Cardano: negativos e imaginarios', 'Stevin y los decimales', 'Descartes: coordenadas', '1665–1684 — Newton y Leibniz: el cálculo', '1799–1831 — el plano complejo', 'Geometría no euclidiana', 'Riemann: el espacio curvo', 'Cantor: tamaños de infinito', 'La paradoja de Russell', 'Gödel: incompletitud', 'Turing', 'Mirando atrás', 'Cierre']),
['Por qué una hora tiene 60 minutos (la base 60 de Sumeria)', 'Cómo el cero se convirtió en un número (Brahmagupta, 628)', 'De dónde vienen las palabras «álgebra» y «algoritmo»', 'Por qué Florencia prohibió los números indoarábigos', 'Números imaginarios, cálculo, espacio curvo y distintos tamaños de infinito', 'Gödel, Turing y los límites de lo que las matemáticas pueden demostrar'],
['Los retratos marcados «IMAGINED» son impresiones de artistas posteriores; no se conserva ninguna imagen real de esa persona.'],
'#matemáticas #historiadelasmatemáticas #math', 'Imágenes históricas: Wikimedia Commons (dominio público y licencias Creative Commons; autores y licencias en la página de cada archivo en Commons).'))

D['pt-BR'] = ('Como a humanidade inventou a matemática, uma ideia proibida de cada vez', desc('pt-BR',
"""Em 1299, os banqueiros de Florença proibiram os números que você usa todo dia. O zero era tratado como nada, os números negativos eram chamados de fictícios e a raiz quadrada de menos um era descartada como inútil. Hoje, cada uma dessas ideias está num livro didático.

Este vídeo percorre toda a linha do tempo de 30.000 anos da matemática, de um osso de lobo com entalhes até o celular no seu bolso: quem inventou cada ideia, por que ela era necessária e por que tantas delas foram combatidas antes de serem aceitas.""", S, yrs(
['Introdução', 'Há cerca de 30.000 anos — um risco num osso', 'Por volta de 3000 a.C. — Suméria', 'Por volta de 1800 a 1600 a.C. — Babilônia e Egito', 'Por volta de 300 a.C. — Euclides', 'Brahmagupta e o zero', 'Por volta de 820 — Al-Khwarizmi', 'Fibonacci, e uma proibição', 'Cardano: negativos e imaginários', 'Stevin e os decimais', 'Descartes: coordenadas', '1665 a 1684 — Newton e Leibniz: o cálculo', '1799 a 1831 — o plano complexo', 'Geometria não euclidiana', 'Riemann: espaço curvo', 'Cantor: tamanhos de infinito', 'O paradoxo de Russell', 'Gödel: incompletude', 'Turing', 'Olhando para trás', 'Encerramento']),
['Por que uma hora tem 60 minutos (a base 60 da Suméria)', 'Como o zero virou um número (Brahmagupta, 628)', 'De onde vêm as palavras "álgebra" e "algoritmo"', 'Por que Florença proibiu os algarismos indo-arábicos', 'Números imaginários, cálculo, espaço curvo e tamanhos diferentes de infinito', 'Gödel, Turing e os limites do que a matemática consegue provar'],
['Os retratos marcados "IMAGINED" são interpretações de artistas posteriores; nenhuma imagem real dessa pessoa sobreviveu.'],
'#matemática #históriadamatemática #math', 'Imagens históricas: Wikimedia Commons (domínio público e licenças Creative Commons; autores e licenças estão na página de cada arquivo no Commons).'))

D['hi'] = ('इंसानों ने गणित कैसे खोजा — एक-एक "वर्जित" विचार के साथ', desc('hi',
"""1299 में फ़्लोरेंस के बैंकरों ने वे अंक प्रतिबंधित कर दिए जिन्हें आप रोज़ इस्तेमाल करते हैं। शून्य को "कुछ नहीं" माना जाता था, ऋणात्मक संख्याओं को काल्पनिक कहा जाता था, और ऋण एक के वर्गमूल को बेकार कहकर ठुकरा दिया गया था। आज ये सारे विचार स्कूल की किताबों में हैं।

यह वीडियो गणित की 30,000 साल की पूरी यात्रा दिखाता है — खाँचों वाली भेड़िये की हड्डी से लेकर आपकी जेब के फ़ोन तक: हर विचार किसने खोजा, उसकी ज़रूरत क्यों पड़ी, और इतने विचारों को स्वीकार होने से पहले लड़ाई क्यों लड़नी पड़ी।""", S, yrs(
['परिचय', 'लगभग 30,000 साल पहले — हड्डी पर एक खरोंच', 'लगभग 3000 ई.पू. — सुमेर', 'लगभग 1800–1600 ई.पू. — बेबीलोन और मिस्र', 'लगभग 300 ई.पू. — यूक्लिड', 'ब्रह्मगुप्त और शून्य', 'लगभग 820 — अल-ख़्वारिज़्मी', 'फ़िबोनाची, और एक प्रतिबंध', 'कार्डानो: ऋणात्मक और काल्पनिक', 'स्टेविन और दशमलव', 'देकार्त: निर्देशांक', '1665–1684 — न्यूटन और लाइबनिज़: कलन', '1799–1831 — सम्मिश्र तल', 'अयूक्लिडीय ज्यामिति', 'रीमान: वक्र स्पेस', 'कैंटर: अनंत के आकार', 'रसेल का विरोधाभास', 'गोडेल: अपूर्णता', 'ट्यूरिंग', 'पीछे मुड़कर', 'समापन']),
['एक घंटे में 60 मिनट क्यों होते हैं (सुमेर का आधार 60)', 'शून्य संख्या कैसे बना (ब्रह्मगुप्त, 628)', '"अलजेब्रा" और "एल्गोरिदम" शब्द कहाँ से आए', 'फ़्लोरेंस ने हिंदू-अरबी अंकों पर प्रतिबंध क्यों लगाया', 'काल्पनिक संख्याएँ, कलन, वक्र स्पेस और अनंत के अलग-अलग आकार', 'गोडेल, ट्यूरिंग और गणित क्या सिद्ध कर सकता है उसकी सीमाएँ'],
['"IMAGINED" लिखे चित्र बाद के कलाकारों की कल्पना हैं; उस व्यक्ति की कोई असली छवि नहीं बची।'],
'#गणित #इतिहास #math', 'ऐतिहासिक चित्र: Wikimedia Commons (पब्लिक डोमेन और Creative Commons लाइसेंस; लेखक और लाइसेंस हर फ़ाइल के Commons पेज पर)।'))

D['id'] = ('Bagaimana Manusia Menemukan Matematika, Satu Ide Terlarang demi Satu', desc('id',
"""Pada tahun 1299, para bankir Florence melarang angka-angka yang kamu pakai setiap hari. Nol dianggap ketiadaan, bilangan negatif disebut fiktif, dan akar kuadrat dari minus satu dibuang karena dianggap tidak berguna. Hari ini, semua ide itu ada di buku pelajaran sekolah.

Video ini menelusuri seluruh garis waktu 30.000 tahun matematika, dari tulang serigala bertakik sampai ponsel di sakumu: siapa yang menemukan setiap ide, kenapa ide itu dibutuhkan, dan kenapa banyak di antaranya ditentang sebelum akhirnya diterima.""", S, yrs(
['Pendahuluan', 'Sekitar 30.000 tahun lalu — goresan di tulang', 'Sekitar 3000 SM — Sumeria', 'Sekitar 1800–1600 SM — Babilonia dan Mesir', 'Sekitar 300 SM — Euclid', 'Brahmagupta dan nol', 'Sekitar 820 — Al-Khawarizmi', 'Fibonacci, dan sebuah larangan', 'Cardano: negatif dan imajiner', 'Stevin dan desimal', 'Descartes: koordinat', '1665–1684 — Newton dan Leibniz: kalkulus', '1799–1831 — bidang kompleks', 'Geometri non-Euclid', 'Riemann: ruang melengkung', 'Cantor: ukuran ketakhinggaan', 'Paradoks Russell', 'Gödel: ketaklengkapan', 'Turing', 'Menengok ke belakang', 'Penutup']),
['Kenapa satu jam ada 60 menit (basis 60 dari Sumeria)', 'Bagaimana nol menjadi bilangan (Brahmagupta, 628)', 'Dari mana kata "aljabar" dan "algoritma" berasal', 'Kenapa Florence melarang angka Hindu-Arab', 'Bilangan imajiner, kalkulus, ruang melengkung, dan ukuran ketakhinggaan yang berbeda', 'Gödel, Turing, dan batas dari apa yang bisa dibuktikan matematika'],
['Potret bertanda "IMAGINED" adalah gambaran seniman di masa kemudian; tidak ada wajah asli tokoh tersebut yang tersisa.'],
'#matematika #sejarahmatematika #math', 'Gambar sejarah: Wikimedia Commons (domain publik dan lisensi Creative Commons; penulis dan lisensi tercantum di halaman Commons setiap berkas).'))

D['de'] = ('Wie die Menschheit die Mathematik erfand – eine verbotene Idee nach der anderen', desc('de',
"""1299 verboten die Bankiers von Florenz die Ziffern, die du jeden Tag benutzt. Die Null galt als Nichts, negative Zahlen nannte man erfunden, und die Wurzel aus minus eins wurde als nutzlos abgetan. Heute steht jede dieser Ideen in einem Schulbuch.

Dieses Video geht die gesamte 30.000-jährige Zeitleiste der Mathematik ab, von einem eingekerbten Wolfsknochen bis zum Handy in deiner Tasche: wer jede Idee erfunden hat, warum sie gebraucht wurde und warum so viele von ihnen bekämpft wurden, bevor man sie akzeptierte.""", S, yrs(
['Einleitung', 'Vor etwa 30.000 Jahren – ein Kratzer auf einem Knochen', 'Um 3000 v. Chr. – Sumer', 'Um 1800 bis 1600 v. Chr. – Babylon und Ägypten', 'Um 300 v. Chr. – Euklid', 'Brahmagupta und die Null', 'Um 820 – al-Chwarizmi', 'Fibonacci und ein Verbot', 'Cardano: negativ und imaginär', 'Stevin und die Dezimalzahlen', 'Descartes: Koordinaten', '1665 bis 1684 – Newton und Leibniz: Analysis', '1799 bis 1831 – die komplexe Ebene', 'Nichteuklidische Geometrie', 'Riemann: gekrümmter Raum', 'Cantor: Größen der Unendlichkeit', 'Die Russellsche Antinomie', 'Gödel: Unvollständigkeit', 'Turing', 'Rückblick', 'Abspann']),
['Warum eine Stunde 60 Minuten hat (das Sechzigersystem der Sumerer)', 'Wie die Null zur Zahl wurde (Brahmagupta, 628)', 'Woher die Wörter „Algebra“ und „Algorithmus“ kommen', 'Warum Florenz die indisch-arabischen Ziffern verbot', 'Imaginäre Zahlen, Analysis, gekrümmter Raum und verschieden große Unendlichkeiten', 'Gödel, Turing und die Grenzen dessen, was Mathematik beweisen kann'],
['Mit „IMAGINED“ markierte Porträts sind Vorstellungen späterer Künstler; kein echtes Bildnis der Person ist erhalten.'],
'#mathematik #geschichte #math', 'Historische Bilder: Wikimedia Commons (gemeinfrei und Creative-Commons-Lizenzen; Urheber und Lizenzen stehen auf der Commons-Seite jeder Datei).'))

D['fr'] = ('Comment l’humanité a inventé les maths, une idée interdite à la fois', desc('fr',
"""En 1299, les banquiers de Florence ont interdit les chiffres que vous utilisez tous les jours. Le zéro était vu comme un néant, les nombres négatifs étaient dits fictifs, et la racine carrée de moins un était rejetée comme inutile. Aujourd'hui, chacune de ces idées figure dans un manuel scolaire.

Cette vidéo parcourt toute la frise de 30 000 ans des mathématiques, d'un os de loup entaillé jusqu'au téléphone dans votre poche : qui a inventé chaque idée, pourquoi on en avait besoin, et pourquoi tant d'entre elles ont été combattues avant d'être acceptées.""", S, yrs(
['Introduction', "Il y a environ 30 000 ans — une entaille sur un os", 'Vers 3000 av. J.-C. — Sumer', 'Vers 1800 à 1600 av. J.-C. — Babylone et l’Égypte', 'Vers 300 av. J.-C. — Euclide', 'Brahmagupta et le zéro', 'Vers 820 — Al-Khwârizmî', 'Fibonacci, et une interdiction', 'Cardan : négatifs et imaginaires', 'Stevin et les décimales', 'Descartes : les coordonnées', '1665 à 1684 — Newton et Leibniz : le calcul infinitésimal', '1799 à 1831 — le plan complexe', 'La géométrie non euclidienne', "Riemann : l'espace courbe", "Cantor : les tailles de l'infini", 'Le paradoxe de Russell', 'Gödel : l’incomplétude', 'Turing', 'Regard en arrière', 'Conclusion']),
['Pourquoi une heure dure 60 minutes (la base 60 de Sumer)', 'Comment le zéro est devenu un nombre (Brahmagupta, 628)', "D'où viennent les mots « algèbre » et « algorithme »", 'Pourquoi Florence a interdit les chiffres indo-arabes', "Nombres imaginaires, calcul infinitésimal, espace courbe et différentes tailles d'infini", 'Gödel, Turing et les limites de ce que les maths peuvent démontrer'],
["Les portraits marqués « IMAGINED » sont des représentations d'artistes ultérieurs ; aucun visage authentique de la personne n'a survécu."],
'#mathématiques #histoiredesmaths #math', 'Images historiques : Wikimedia Commons (domaine public et licences Creative Commons ; auteurs et licences indiqués sur la page Commons de chaque fichier).'))

D['ar'] = ('كيف اخترع البشر الرياضيات، فكرةً محظورةً تلو الأخرى', desc('ar',
"""في عام 1299 منع مصرفيو فلورنسا الأرقام التي تستخدمها كل يوم. كان الصفر يُعدّ لا شيء، وكانت الأعداد السالبة تُسمّى وهمية، ورُفض الجذر التربيعي لسالب واحد بوصفه عديم الفائدة. واليوم توجد كل هذه الأفكار في الكتب المدرسية.

يسير هذا الفيديو على الخط الزمني الكامل للرياضيات عبر 30,000 عام، من عظمة ذئب محفورة إلى الهاتف في جيبك: من اخترع كل فكرة، ولماذا احتاج إليها الناس، ولماذا حورب كثير منها قبل أن يُقبل.""", S, yrs(
['مقدمة', 'قبل نحو 30,000 عام — خدش على عظمة', 'نحو 3000 ق.م — سومر', 'نحو 1800–1600 ق.م — بابل ومصر', 'نحو 300 ق.م — إقليدس', 'براهماغوبتا والصفر', 'نحو 820 — الخوارزمي', 'فيبوناتشي، وحظر', 'كاردانو: السالب والتخيلي', 'ستيفن والكسور العشرية', 'ديكارت: الإحداثيات', '1665–1684 — نيوتن ولايبنتس: التفاضل والتكامل', '1799–1831 — المستوى المركب', 'الهندسة اللاإقليدية', 'ريمان: الفضاء المنحني', 'كانتور: أحجام اللانهاية', 'مفارقة راسل', 'غودل: عدم الاكتمال', 'تورنغ', 'نظرة إلى الوراء', 'الخاتمة']),
['لماذا تتكون الساعة من 60 دقيقة (النظام الستيني في سومر)', 'كيف أصبح الصفر عددًا (براهماغوبتا، 628)', 'من أين جاءت كلمتا «الجبر» و«الخوارزمية»', 'لماذا حظرت فلورنسا الأرقام الهندية العربية', 'الأعداد التخيلية والتفاضل والتكامل والفضاء المنحني وأحجام مختلفة من اللانهاية', 'غودل وتورنغ وحدود ما تستطيع الرياضيات إثباته'],
['الصور المعلَّمة بكلمة «IMAGINED» تصورات رسمها فنانون لاحقون؛ لا توجد صورة حقيقية لذلك الشخص.'],
'#رياضيات #تاريخ_الرياضيات #math', 'الصور التاريخية: ويكيميديا كومنز (ملكية عامة وتراخيص المشاع الإبداعي؛ المؤلفون والتراخيص في صفحة كل ملف على كومنز).'))

D['vi'] = ('Loài người đã phát minh ra toán học thế nào — từng ý tưởng "bị cấm" một', desc('vi',
"""Năm 1299, giới ngân hàng Florence cấm dùng chính những chữ số bạn dùng mỗi ngày. Số 0 bị coi là hư không, số âm bị gọi là số giả, còn căn bậc hai của âm một bị gạt đi vì vô dụng. Ngày nay, tất cả những ý tưởng ấy đều nằm trong sách giáo khoa.

Video này đi hết dòng thời gian 30.000 năm của toán học, từ một khúc xương sói có khắc vạch tới chiếc điện thoại trong túi bạn: ai nghĩ ra từng ý tưởng, vì sao người ta cần nó, và vì sao nhiều ý tưởng phải trải qua tranh cãi rồi mới được chấp nhận.""", S, yrs(
['Mở đầu', 'Khoảng 30.000 năm trước — vết khắc trên xương', 'Khoảng 3000 TCN — Sumer', 'Khoảng 1800–1600 TCN — Babylon và Ai Cập', 'Khoảng 300 TCN — Euclid', 'Brahmagupta và số 0', 'Khoảng năm 820 — Al-Khwarizmi', 'Fibonacci, và một lệnh cấm', 'Cardano: số âm và số ảo', 'Stevin và số thập phân', 'Descartes: hệ tọa độ', '1665–1684 — Newton và Leibniz: giải tích', '1799–1831 — mặt phẳng phức', 'Hình học phi Euclid', 'Riemann: không gian cong', 'Cantor: các cỡ vô hạn', 'Nghịch lý Russell', 'Gödel: tính không đầy đủ', 'Turing', 'Nhìn lại', 'Kết']),
['Vì sao một giờ có 60 phút (hệ cơ số 60 của Sumer)', 'Số 0 trở thành một con số thế nào (Brahmagupta, 628)', 'Từ "đại số" (algebra) và "thuật toán" (algorithm) từ đâu ra', 'Vì sao Florence cấm chữ số Hindu-Ả Rập', 'Số ảo, giải tích, không gian cong và những cỡ vô hạn khác nhau', 'Gödel, Turing và giới hạn của những gì toán học chứng minh được'],
['Chân dung có nhãn "IMAGINED" là tranh do họa sĩ đời sau tưởng tượng; không còn hình ảnh thật nào của người đó.'],
'#toánhọc #lịchsửtoánhọc #math', 'Hình ảnh lịch sử: Wikimedia Commons (phạm vi công cộng và giấy phép Creative Commons; tác giả và giấy phép ghi ở trang Commons của từng tệp).'))

D['tr'] = ('İnsanlık Matematiği Nasıl İcat Etti? Her Seferinde Bir Yasak Fikir', desc('tr',
"""1299'da Floransa'nın bankacıları her gün kullandığınız rakamları yasakladı. Sıfır hiçlik sayılıyordu, negatif sayılara uydurma deniyordu ve eksi birin karekökü işe yaramaz diye bir kenara atılıyordu. Bugün bu fikirlerin hepsi okul kitaplarında.

Bu video, matematiğin 30.000 yıllık zaman çizelgesinin tamamını dolaşıyor; çentikli bir kurt kemiğinden cebinizdeki telefona kadar: her fikri kim icat etti, neden gerekliydi ve neden pek çoğu kabul edilmeden önce mücadele görmek zorunda kaldı.""", S, yrs(
['Giriş', 'Yaklaşık 30.000 yıl önce — kemikte bir çentik', 'MÖ 3000 civarı — Sümer', 'MÖ 1800–1600 civarı — Babil ve Mısır', 'MÖ 300 civarı — Öklid', 'Brahmagupta ve sıfır', '820 civarı — Harezmî', 'Fibonacci ve bir yasak', 'Cardano: negatif ve sanal', 'Stevin ve ondalık sayılar', 'Descartes: koordinatlar', '1665–1684 — Newton ve Leibniz: kalkülüs', '1799–1831 — karmaşık düzlem', 'Öklid dışı geometri', 'Riemann: eğri uzay', 'Cantor: sonsuzluğun büyüklükleri', 'Russell paradoksu', 'Gödel: eksiklik', 'Turing', 'Geriye bakış', 'Kapanış']),
['Bir saat neden 60 dakika (Sümerlerin 60 tabanı)', 'Sıfır nasıl bir sayı oldu (Brahmagupta, 628)', '"Cebir" ve "algoritma" kelimeleri nereden geliyor', 'Floransa Hint-Arap rakamlarını neden yasakladı', 'Sanal sayılar, kalkülüs, eğri uzay ve farklı büyüklükteki sonsuzluklar', 'Gödel, Turing ve matematiğin kanıtlayabileceklerinin sınırları'],
['"IMAGINED" işaretli portreler sonraki dönem sanatçılarının yorumlarıdır; o kişinin gerçek bir görüntüsü günümüze ulaşmamıştır.'],
'#matematik #matematiktarihi #math', 'Tarihî görseller: Wikimedia Commons (kamu malı ve Creative Commons lisansları; yazarlar ve lisanslar her dosyanın Commons sayfasında).'))

D['ko'] = ('인류는 수학을 어떻게 발명했을까 — 금지된 아이디어 하나씩', desc('ko',
"""1299년, 피렌체의 은행가들은 여러분이 매일 쓰는 숫자를 금지했습니다. 0은 '없음'으로 취급됐고, 음수는 가짜 수라 불렸으며, -1의 제곱근은 쓸모없다며 버려졌습니다. 오늘날 이 아이디어들은 모두 교과서에 실려 있습니다.

이 영상은 눈금이 새겨진 늑대 뼈부터 주머니 속 스마트폰까지, 3만 년에 걸친 수학의 연대기를 따라갑니다. 누가 각 아이디어를 만들었는지, 왜 필요했는지, 그리고 왜 그토록 많은 아이디어가 받아들여지기 전에 반대에 부딪혔는지.""", S, yrs(
['들어가며', '약 3만 년 전 — 뼈에 새긴 눈금', '기원전 3000년경 — 수메르', '기원전 1800~1600년경 — 바빌로니아와 이집트', '기원전 300년경 — 유클리드', '브라마굽타와 0', '820년경 — 알콰리즈미', '피보나치, 그리고 금지령', '카르다노: 음수와 허수', '스테빈과 소수', '데카르트: 좌표', '1665~1684 — 뉴턴과 라이프니츠: 미적분', '1799~1831 — 복소평면', '비유클리드 기하학', '리만: 휘어진 공간', '칸토어: 무한의 크기', '러셀의 역설', '괴델: 불완전성', '튜링', '돌아보며', '마치며']),
['한 시간은 왜 60분일까 (수메르의 60진법)', '0은 어떻게 수가 되었나 (브라마굽타, 628년)', "'대수(algebra)'와 '알고리즘'이라는 말의 기원", '피렌체는 왜 인도-아라비아 숫자를 금지했나', '허수, 미적분, 휘어진 공간, 그리고 크기가 다른 무한들', '괴델, 튜링, 그리고 수학이 증명할 수 있는 것의 한계'],
['"IMAGINED" 표시가 있는 초상화는 후대 화가의 상상화이며, 그 인물의 실제 모습은 남아 있지 않습니다.'],
'#수학 #수학의역사 #math', '역사 이미지: 위키미디어 공용 (퍼블릭 도메인 및 크리에이티브 커먼즈 라이선스; 저작자와 라이선스는 각 파일의 공용 페이지에 있습니다).'))
sys.exit(write('en/math-30k', D))
