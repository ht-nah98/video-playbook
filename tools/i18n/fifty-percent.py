from gen import *
S = '0:00 1:21 2:29 3:17 3:46 4:12 4:43 5:01 6:19 8:08 8:32 9:12 10:11 10:45 11:36 12:40 13:03 13:37'.split()
D = {}
D['es'] = ('La moneda ya cayó. Entonces, ¿qué describe ese 50 %?', desc('es',
"""Acabo de lanzar una moneda y la he tapado en el dorso de la mano. ¿Qué probabilidad hay de que haya salido cara? Cincuenta por ciento, dices. Pero la moneda ya cayó. Ya es cara, o ya es cruz. Entonces, ¿qué describe en realidad ese cincuenta por ciento?

Este video sigue las dos grandes respuestas a esa pregunta, la probabilidad como frecuencia y la probabilidad como creencia, a través de casinos, pronósticos del tiempo, un SMS de estafa y una prueba médica, hasta llegar a una máquina de lanzar monedas que demuestra que la moneda nunca fue aleatoria.""", S,
['Introducción', 'Lánzala otra vez, y otra', 'El mundo que funciona con frecuencias', 'Cosas que pasan una sola vez', 'Una salida ingeniosa', 'De vuelta a la moneda bajo mi mano', 'Una propiedad tuya, no de la moneda', 'Creencias con reglas', 'La evidencia no dice si aciertas o fallas: inclina la balanza', 'Una prueba positiva', 'Cuenta personas reales', 'Por qué nos engaña', 'Tres reglas', 'Reglas, no significado', 'Una moneda es una máquina', 'El azar como información que falta', 'El único lugar donde la historia no está cerrada', 'La distancia entre tú y la moneda'],
['Buffon, Pearson y Kerrich: qué pasa de verdad cuando lanzas una moneda miles de veces',
 'Por qué a un casino no le hace falta saber quién gana esta noche',
 'Qué significa «70 % de probabilidad de lluvia» si mañana solo ocurre una vez',
 'Ramsey, de Finetti y la apuesta holandesa: por qué las creencias deben seguir reglas',
 'La regla de Bayes como una balanza: cómo la evidencia cambia las probabilidades',
 'Una prueba con 99 % de precisión da positivo. ¿Por qué la probabilidad de que estés enfermo es solo de un 2 %?',
 'Los tres axiomas de Kolmogórov, y por qué no te dicen qué significa la probabilidad',
 'La máquina de lanzar monedas de Diaconis y el sesgo del 51 %, comprobado con 350 757 lanzamientos',
 'El único lugar donde el azar podría ser real: la mecánica cuántica'], [],
'#probabilidad #teoremadebayes #matemáticas', 'Foto de Kolmogórov: Konrad Jacobs, CC BY-SA 2.0 de. Otras imágenes: Wikipedia / Wikimedia Commons (dominio público o uso educativo).'))

D['pt-BR'] = ('A moeda já caiu. Então o que esses 50% estão descrevendo?', desc('pt-BR',
"""Acabei de jogar uma moeda e cobri com a mão. Qual é a probabilidade de ter dado cara? Cinquenta por cento, você diz. Mas a moeda já caiu. Já é cara, ou já é coroa. Então o que esses cinquenta por cento estão realmente descrevendo?

Este vídeo segue as duas grandes respostas a essa pergunta, probabilidade como frequência e probabilidade como crença, passando por cassinos, previsão do tempo, uma mensagem de golpe e um exame médico, até uma máquina de jogar moedas que mostra que a moeda nunca foi aleatória.""", S,
['Introdução', 'Jogue de novo, e de novo', 'O mundo que funciona com frequências', 'Coisas que acontecem uma vez só', 'Uma saída esperta', 'De volta à moeda debaixo da minha mão', 'Uma propriedade sua, não da moeda', 'Crença com regras', 'A evidência não diz certo ou errado, ela mexe na balança', 'Um exame positivo', 'Conte pessoas de verdade', 'Por que isso nos engana', 'Três regras', 'Regras, não significado', 'Uma moeda é uma máquina', 'Aleatoriedade como informação que falta', 'O único lugar onde a história não está fechada', 'A distância entre você e a moeda'],
['Buffon, Pearson e Kerrich: o que acontece de verdade quando você joga uma moeda milhares de vezes',
 'Por que um cassino não precisa saber quem vai ganhar hoje à noite',
 'O que significa "70% de chance de chuva" quando o amanhã só acontece uma vez',
 'Ramsey, de Finetti e o Dutch book: por que crenças precisam seguir regras',
 'A regra de Bayes como uma balança: como a evidência muda as chances',
 'Um exame 99% preciso dá positivo. Por que a chance de você estar doente é só de uns 2%?',
 'Os três axiomas de Kolmogorov, e por que eles não dizem o que probabilidade significa',
 'A máquina de jogar moedas de Diaconis e o viés de 51%, testado com 350.757 lançamentos',
 'O único lugar onde a aleatoriedade pode ser real: a mecânica quântica'], [],
'#probabilidade #teoremadebayes #matemática', 'Foto de Kolmogorov: Konrad Jacobs, CC BY-SA 2.0 de. Outras imagens: Wikipedia / Wikimedia Commons (domínio público ou uso educacional).'))

D['hi'] = ('सिक्का गिर चुका है। तो फिर 50% किस बात का है?', desc('hi',
"""मैंने अभी एक सिक्का उछाला और हाथ के पीछे दबा दिया। हेड आने की प्रायिकता क्या है? आप कहेंगे पचास प्रतिशत। लेकिन सिक्का तो गिर चुका है। वह या तो हेड है या टेल। तो वह पचास प्रतिशत असल में किस चीज़ का वर्णन कर रहा है?

यह वीडियो इस सवाल के दो बड़े जवाबों को देखता है — प्रायिकता यानी बारंबारता, और प्रायिकता यानी विश्वास — कैसीनो, मौसम पूर्वानुमान, एक ठगी वाले मैसेज और एक मेडिकल टेस्ट से होते हुए, उस मशीन तक जो सिक्का उछालती है और दिखाती है कि सिक्का कभी रैंडम था ही नहीं।""", S,
['परिचय', 'बार-बार उछालिए', 'बारंबारता पर चलती दुनिया', 'जो बातें एक ही बार होती हैं', 'एक चतुर रास्ता', 'मेरे हाथ के नीचे वाला सिक्का', 'यह आपका गुण है, सिक्के का नहीं', 'नियमों वाला विश्वास', 'सबूत सही-गलत नहीं बताता, तराज़ू झुकाता है', 'एक पॉज़िटिव टेस्ट', 'असली लोगों को गिनिए', 'हम धोखा क्यों खाते हैं', 'तीन नियम', 'नियम, अर्थ नहीं', 'सिक्का एक मशीन है', 'रैंडमनेस यानी अधूरी जानकारी', 'जहाँ कहानी अभी तय नहीं', 'आपके और सिक्के के बीच की दूरी'],
['बफ़ॉन, पियर्सन और केरिच: हज़ारों बार सिक्का उछालने पर असल में क्या होता है',
 'कैसीनो को यह जानने की ज़रूरत क्यों नहीं कि आज रात कौन जीतेगा',
 '"70% बारिश की संभावना" का क्या मतलब, जब कल एक ही बार आता है',
 'रैम्ज़ी, डी फ़िनेटी और डच बुक: विश्वास को नियम क्यों मानने पड़ते हैं',
 'बेज़ का नियम एक तराज़ू की तरह: सबूत संभावना को कैसे बदलता है',
 '99% सटीक टेस्ट पॉज़िटिव आया। फिर भी बीमार होने की संभावना सिर्फ़ लगभग 2% क्यों?',
 'कोल्मोगोरोव के तीन स्वयंसिद्ध, और वे प्रायिकता का अर्थ क्यों नहीं बताते',
 'डायकोनिस की सिक्का-उछाल मशीन और 51% झुकाव, 3,50,757 उछालों से जाँचा गया',
 'जहाँ रैंडमनेस सचमुच असली हो सकती है: क्वांटम यांत्रिकी'], [],
'#probability #प्रायिकता #गणित', 'कोल्मोगोरोव की फ़ोटो: Konrad Jacobs, CC BY-SA 2.0 de। अन्य चित्र: Wikipedia / Wikimedia Commons (पब्लिक डोमेन या शैक्षिक उपयोग)।'))

D['id'] = ('Koinnya Sudah Jatuh. Lalu 50% Itu Menggambarkan Apa?', desc('id',
"""Saya baru saja melempar koin dan menutupnya di punggung tangan. Berapa peluang hasilnya angka? Lima puluh persen, katamu. Tapi koinnya sudah jatuh. Hasilnya sudah angka, atau sudah gambar. Jadi sebenarnya lima puluh persen itu menggambarkan apa?

Video ini mengikuti dua jawaban besar untuk pertanyaan itu, peluang sebagai frekuensi dan peluang sebagai keyakinan, melewati kasino, prakiraan cuaca, SMS penipuan, dan tes medis, sampai ke mesin pelempar koin yang menunjukkan bahwa koin itu sebenarnya tidak pernah acak.""", S,
['Pendahuluan', 'Lempar lagi, dan lagi', 'Dunia yang berjalan dengan frekuensi', 'Hal yang terjadi sekali saja', 'Jalan keluar yang cerdik', 'Kembali ke koin di bawah tanganku', 'Sifat dirimu, bukan sifat koin', 'Keyakinan yang punya aturan', 'Bukti tidak bilang benar atau salah, ia menggeser timbangan', 'Tes yang positif', 'Hitung orang sungguhan', 'Kenapa kita tertipu', 'Tiga aturan', 'Aturan, bukan makna', 'Koin adalah mesin', 'Keacakan sebagai informasi yang hilang', 'Satu-satunya tempat ceritanya belum selesai', 'Jarak antara kamu dan koin'],
['Buffon, Pearson, dan Kerrich: apa yang benar-benar terjadi saat koin dilempar ribuan kali',
 'Kenapa kasino tidak perlu tahu siapa yang menang malam ini',
 'Apa arti "peluang hujan 70%" kalau besok hanya terjadi sekali',
 'Ramsey, de Finetti, dan Dutch book: kenapa keyakinan harus mengikuti aturan',
 'Aturan Bayes sebagai timbangan: bagaimana bukti menggeser peluang',
 'Tes dengan akurasi 99% hasilnya positif. Kenapa peluang kamu benar-benar sakit hanya sekitar 2%?',
 'Tiga aksioma Kolmogorov, dan kenapa aksioma itu tidak menjelaskan arti peluang',
 'Mesin pelempar koin Diaconis dan bias 51%, diuji dengan 350.757 lemparan',
 'Satu-satunya tempat keacakan mungkin benar-benar ada: mekanika kuantum'], [],
'#peluang #teoremabayes #matematika', 'Foto Kolmogorov: Konrad Jacobs, CC BY-SA 2.0 de. Gambar lain: Wikipedia / Wikimedia Commons (domain publik atau penggunaan wajar untuk pendidikan).'))

D['de'] = ('Die Münze ist schon gefallen. Was beschreiben dann die 50 %?', desc('de',
"""Ich habe gerade eine Münze geworfen und sie auf meinem Handrücken zugedeckt. Wie groß ist die Wahrscheinlichkeit für Kopf? Fünfzig Prozent, sagst du. Aber die Münze ist schon gefallen. Sie zeigt bereits Kopf oder bereits Zahl. Was beschreiben diese fünfzig Prozent also eigentlich?

Dieses Video folgt den beiden großen Antworten auf diese Frage – Wahrscheinlichkeit als Häufigkeit und Wahrscheinlichkeit als Überzeugung – durch Casinos, Wettervorhersagen, eine Betrugs-SMS und einen medizinischen Test bis hin zu einer Münzwurfmaschine, die zeigt, dass die Münze nie zufällig war.""", S,
['Einleitung', 'Wirf noch einmal, und noch einmal', 'Die Welt, die von Häufigkeiten lebt', 'Dinge, die nur einmal passieren', 'Ein cleverer Ausweg', 'Zurück zur Münze unter meiner Hand', 'Eine Eigenschaft von dir, nicht der Münze', 'Überzeugung mit Regeln', 'Evidenz sagt nicht richtig oder falsch, sie verschiebt die Waage', 'Ein positiver Test', 'Zähl echte Menschen', 'Warum es uns täuscht', 'Drei Regeln', 'Regeln, keine Bedeutung', 'Eine Münze ist eine Maschine', 'Zufall als fehlende Information', 'Der eine Ort, an dem die Geschichte offen ist', 'Der Abstand zwischen dir und der Münze'],
['Buffon, Pearson und Kerrich: Was wirklich passiert, wenn man eine Münze tausende Male wirft',
 'Warum ein Casino nie wissen muss, wer heute Abend gewinnt',
 'Was „70 % Regenwahrscheinlichkeit“ bedeutet, wenn es morgen nur einmal gibt',
 'Ramsey, de Finetti und das Dutch Book: Warum Überzeugungen Regeln folgen müssen',
 'Die Bayes-Regel als Waage: wie Evidenz die Chancen verschiebt',
 'Ein zu 99 % genauer Test ist positiv. Warum liegt die Chance, dass du krank bist, nur bei etwa 2 %?',
 'Kolmogorows drei Axiome – und warum sie nicht sagen, was Wahrscheinlichkeit bedeutet',
 'Die Münzwurfmaschine von Diaconis und die 51-%-Verzerrung, getestet mit 350.757 Würfen',
 'Der eine Ort, an dem Zufall echt sein könnte: die Quantenmechanik'], [],
'#wahrscheinlichkeit #bayes #mathematik', 'Foto von Kolmogorow: Konrad Jacobs, CC BY-SA 2.0 de. Weitere Bilder: Wikipedia / Wikimedia Commons (gemeinfrei oder Bildungszweck).'))

D['fr'] = ('La pièce est déjà tombée. Alors, que décrit ce 50 % ?', desc('fr',
"""Je viens de lancer une pièce et de la plaquer sur le dos de ma main. Quelle est la probabilité qu'elle soit tombée sur pile ? Cinquante pour cent, dites-vous. Mais la pièce est déjà tombée. Elle est déjà pile, ou déjà face. Alors, que décrit vraiment ce cinquante pour cent ?

Cette vidéo suit les deux grandes réponses à cette question, la probabilité comme fréquence et la probabilité comme croyance, à travers les casinos, la météo, un SMS d'arnaque et un test médical, jusqu'à une machine à lancer des pièces qui montre que la pièce n'a jamais été aléatoire.""", S,
['Introduction', 'Relancez-la, encore et encore', 'Le monde qui tourne aux fréquences', "Ce qui n'arrive qu'une fois", 'Une échappatoire astucieuse', 'Retour à la pièce sous ma main', 'Une propriété de vous, pas de la pièce', 'Une croyance avec des règles', 'Les indices ne disent pas vrai ou faux, ils font pencher la balance', 'Un test positif', 'Comptez de vraies personnes', 'Pourquoi on se fait piéger', 'Trois règles', 'Des règles, pas un sens', 'Une pièce est une machine', "Le hasard comme information manquante", "Le seul endroit où l'histoire n'est pas réglée", 'La distance entre vous et la pièce'],
['Buffon, Pearson et Kerrich : ce qui se passe vraiment quand on lance une pièce des milliers de fois',
 "Pourquoi un casino n'a jamais besoin de savoir qui gagnera ce soir",
 "Ce que veut dire « 70 % de risque de pluie » quand demain n'arrive qu'une fois",
 'Ramsey, de Finetti et le pari hollandais : pourquoi les croyances doivent suivre des règles',
 'La règle de Bayes comme une balance : comment les indices déplacent les chances',
 "Un test fiable à 99 % est positif. Pourquoi la probabilité d'être malade n'est-elle que d'environ 2 % ?",
 "Les trois axiomes de Kolmogorov, et pourquoi ils ne disent pas ce que signifie une probabilité",
 'La machine à lancer de Diaconis et le biais de 51 %, testé sur 350 757 lancers',
 'Le seul endroit où le hasard pourrait être réel : la mécanique quantique'], [],
'#probabilités #bayes #mathématiques', 'Photo de Kolmogorov : Konrad Jacobs, CC BY-SA 2.0 de. Autres images : Wikipédia / Wikimedia Commons (domaine public ou usage pédagogique).'))

D['ar'] = ('العملة سقطت بالفعل. إذن ماذا تصف نسبة 50%؟', desc('ar',
"""رميت عملة للتو وغطيتها على ظهر يدي. ما احتمال أن تكون صورة؟ ستقول خمسون بالمئة. لكن العملة سقطت بالفعل؛ فهي إما صورة أو كتابة. إذن ماذا تصف نسبة الخمسين بالمئة هذه حقًا؟

يتتبع هذا الفيديو الإجابتين الكبريين عن هذا السؤال: الاحتمال بوصفه تكرارًا، والاحتمال بوصفه اعتقادًا، مرورًا بالكازينوهات وتوقعات الطقس ورسالة احتيال وفحص طبي، وصولًا إلى آلة لرمي العملات تُظهر أن العملة لم تكن عشوائية أصلًا.""", S,
['مقدمة', 'ارمها مرة بعد مرة', 'عالم يعمل بالتكرارات', 'أشياء تحدث مرة واحدة', 'مخرج ذكي', 'عودة إلى العملة تحت يدي', 'صفة فيك أنت لا في العملة', 'اعتقاد له قواعد', 'الدليل لا يقول صح أو خطأ، بل يحرّك الميزان', 'فحص إيجابي', 'عُدّ أشخاصًا حقيقيين', 'لماذا نقع في الفخ', 'ثلاث قواعد', 'قواعد لا معنى', 'العملة آلة', 'العشوائية معلومات ناقصة', 'المكان الوحيد الذي لم تُحسم فيه القصة', 'المسافة بينك وبين العملة'],
['بوفون وبيرسون وكيريتش: ماذا يحدث فعلًا عندما ترمي عملة آلاف المرات',
 'لماذا لا يحتاج الكازينو أبدًا إلى معرفة من سيفوز الليلة',
 'ماذا يعني «احتمال المطر 70%» عندما لا يأتي الغد إلا مرة واحدة',
 'رامزي ودي فينيتي و«الكتاب الهولندي»: لماذا يجب أن تتبع المعتقدات قواعد',
 'قاعدة بايز كميزان: كيف يغيّر الدليل الاحتمالات',
 'فحص دقته 99% جاء إيجابيًا. فلماذا احتمال أنك مريض نحو 2% فقط؟',
 'مسلّمات كولموغوروف الثلاث، ولماذا لا تخبرك ما معنى الاحتمال',
 'آلة دياكونيس لرمي العملات وانحياز 51%، مختبر على 350,757 رمية',
 'المكان الوحيد الذي قد تكون فيه العشوائية حقيقية: ميكانيكا الكم'], [],
'#احتمالات #رياضيات #probability', 'صورة كولموغوروف: Konrad Jacobs، CC BY-SA 2.0 de. صور أخرى: ويكيبيديا / ويكيميديا كومنز (ملكية عامة أو استخدام تعليمي).'))

D['vi'] = ('Đồng xu đã rơi rồi. Vậy 50% đang mô tả điều gì?', desc('vi',
"""Mình vừa tung một đồng xu và úp nó lên mu bàn tay. Xác suất ra mặt ngửa là bao nhiêu? Năm mươi phần trăm, bạn nói. Nhưng đồng xu đã rơi rồi. Nó đã là ngửa, hoặc đã là sấp. Vậy năm mươi phần trăm ấy thật ra đang mô tả điều gì?

Video này đi theo hai câu trả lời lớn cho câu hỏi đó, xác suất là tần suất và xác suất là niềm tin, qua sòng bạc, dự báo thời tiết, một tin nhắn lừa đảo và một xét nghiệm y khoa, cho tới cỗ máy tung đồng xu cho thấy đồng xu chưa bao giờ ngẫu nhiên cả.""", S,
['Mở đầu', 'Tung lại, tung nữa', 'Thế giới chạy bằng tần suất', 'Những chuyện chỉ xảy ra một lần', 'Một lối thoát khéo léo', 'Quay lại đồng xu dưới tay mình', 'Thuộc tính của bạn, không phải của đồng xu', 'Niềm tin có luật', 'Bằng chứng không nói đúng sai, nó nghiêng cán cân', 'Một xét nghiệm dương tính', 'Đếm người thật', 'Vì sao ta bị lừa', 'Ba quy tắc', 'Quy tắc, không phải ý nghĩa', 'Đồng xu là một cỗ máy', 'Ngẫu nhiên là thông tin còn thiếu', 'Nơi duy nhất câu chuyện chưa ngã ngũ', 'Khoảng cách giữa bạn và đồng xu'],
['Buffon, Pearson và Kerrich: chuyện gì thật sự xảy ra khi tung đồng xu hàng nghìn lần',
 'Vì sao sòng bạc không bao giờ cần biết ai thắng tối nay',
 '"Khả năng mưa 70%" nghĩa là gì khi ngày mai chỉ xảy ra một lần',
 'Ramsey, de Finetti và Dutch book: vì sao niềm tin phải theo luật',
 'Quy tắc Bayes như một cái cân: bằng chứng dịch chuyển khả năng thế nào',
 'Xét nghiệm chính xác 99% báo dương tính. Vì sao khả năng bạn bị bệnh chỉ khoảng 2%?',
 'Ba tiên đề của Kolmogorov, và vì sao chúng không nói xác suất nghĩa là gì',
 'Cỗ máy tung đồng xu của Diaconis và độ lệch 51%, kiểm bằng 350.757 lần tung',
 'Nơi duy nhất sự ngẫu nhiên có thể là thật: cơ học lượng tử'], [],
'#xácsuất #bayes #toánhọc', 'Ảnh Kolmogorov: Konrad Jacobs, CC BY-SA 2.0 de. Các ảnh khác: Wikipedia / Wikimedia Commons (phạm vi công cộng hoặc sử dụng hợp lý cho giáo dục).'))

D['tr'] = ('Para Çoktan Düştü. Peki %50 Neyi Anlatıyor?', desc('tr',
"""Az önce bir para attım ve elimin üstüne kapattım. Yazı gelme olasılığı nedir? Yüzde elli diyorsun. Ama para çoktan düştü. Ya yazı geldi ya tura. Peki o yüzde elli aslında neyi anlatıyor?

Bu video, bu soruya verilen iki büyük cevabı, frekans olarak olasılığı ve inanç olarak olasılığı, kumarhaneler, hava tahminleri, bir dolandırıcılık mesajı ve bir tıbbi test üzerinden takip ediyor; sonunda paranın hiçbir zaman rastgele olmadığını gösteren bir para atma makinesine varıyor.""", S,
['Giriş', 'Tekrar at, tekrar', 'Frekanslarla dönen dünya', 'Bir kez olan şeyler', 'Akıllıca bir kaçış', 'Elimin altındaki paraya dönüş', 'Paranın değil, senin bir özelliğin', 'Kuralları olan inanç', 'Kanıt doğru ya da yanlış demez, teraziyi oynatır', 'Pozitif bir test', 'Gerçek insanları say', 'Neden yanılıyoruz', 'Üç kural', 'Anlam değil, kurallar', 'Para bir makinedir', 'Eksik bilgi olarak rastgelelik', 'Hikâyenin kapanmadığı tek yer', 'Seninle para arasındaki mesafe'],
['Buffon, Pearson ve Kerrich: bir parayı binlerce kez atınca gerçekte ne olur',
 'Bir kumarhane bu gece kimin kazanacağını neden bilmek zorunda değil',
 "Yarın yalnızca bir kez yaşanacaksa \"%70 yağmur ihtimali\" ne demek",
 'Ramsey, de Finetti ve Hollanda kitabı: inançlar neden kurallara uymalı',
 'Bir terazi olarak Bayes kuralı: kanıt olasılıkları nasıl kaydırır',
 '%99 doğru bir test pozitif çıktı. Hasta olma ihtimalin neden sadece yaklaşık %2?',
 "Kolmogorov'un üç aksiyomu ve neden olasılığın ne anlama geldiğini söylemedikleri",
 "Diaconis'in para atma makinesi ve 350.757 atışla test edilen %51 sapma",
 'Rastgeleliğin gerçek olabileceği tek yer: kuantum mekaniği'], [],
'#olasılık #bayesteoremi #matematik', 'Kolmogorov fotoğrafı: Konrad Jacobs, CC BY-SA 2.0 de. Diğer görseller: Wikipedia / Wikimedia Commons (kamu malı veya eğitim amaçlı kullanım).'))

D['ko'] = ('동전은 이미 떨어졌다. 그럼 50%는 무엇을 말하는 걸까?', desc('ko',
"""방금 동전을 던져서 손등 위에 덮었습니다. 앞면이 나왔을 확률은? 50%라고 하시겠죠. 그런데 동전은 이미 떨어졌습니다. 이미 앞면이거나 이미 뒷면입니다. 그렇다면 그 50%는 도대체 무엇을 말하는 걸까요?

이 영상은 이 질문에 대한 두 가지 큰 답, 빈도로서의 확률과 믿음으로서의 확률을 따라 카지노, 일기예보, 사기 문자, 의학 검사를 거쳐, 동전이 애초에 무작위가 아니었음을 보여 주는 동전 던지기 기계까지 갑니다.""", S,
['들어가며', '던지고, 또 던지고', '빈도로 돌아가는 세상', '단 한 번 일어나는 일', '영리한 탈출구', '다시, 내 손 아래의 동전', '동전이 아니라 당신의 성질', '규칙이 있는 믿음', '증거는 옳고 그름이 아니라 저울을 기울인다', '양성 판정', '실제 사람 수로 세기', '우리가 속는 이유', '세 가지 규칙', '의미가 아니라 규칙', '동전은 기계다', '부족한 정보로서의 무작위성', '아직 결론이 나지 않은 단 한 곳', '당신과 동전 사이의 거리'],
['뷔퐁, 피어슨, 케리치: 동전을 수천 번 던지면 실제로 무슨 일이 일어날까',
 '카지노는 왜 오늘 밤 누가 이길지 알 필요가 없을까',
 '내일은 단 한 번뿐인데 "비 올 확률 70%"는 무슨 뜻일까',
 '램지, 드 피네티, 더치북: 믿음은 왜 규칙을 따라야 할까',
 '저울로 보는 베이즈 정리: 증거가 확률을 어떻게 움직이는가',
 '정확도 99% 검사에서 양성. 그런데 실제로 아플 확률은 왜 2% 정도일까?',
 '콜모고로프의 세 공리, 그리고 그것이 확률의 의미를 말해 주지 않는 이유',
 '디아코니스의 동전 던지기 기계와 51% 편향, 350,757번 던져 검증',
 '무작위성이 진짜일 수도 있는 유일한 곳: 양자역학'], [],
'#확률 #베이즈정리 #수학', '콜모고로프 사진: Konrad Jacobs, CC BY-SA 2.0 de. 기타 이미지: 위키백과 / 위키미디어 공용 (퍼블릭 도메인 또는 교육 목적 공정 이용).'))
sys.exit(write('en/fifty-percent', D))
