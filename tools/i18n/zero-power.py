from gen import *
S = '0:00 1:38 2:04 2:26 2:40 3:01 3:29 3:45 4:18 4:46 5:03 5:41 6:12 6:44 7:32 7:56 8:11 8:48 9:12 9:35 10:25'.split()
D = {}
D['es'] = ('¿Por qué cualquier número elevado a cero da 1? (¿Y cuánto es 0⁰?)', desc('es',
"""Dos al cubo es 8. Dos a la uno es 2. Pero dos a la cero es 1: ¿por qué? Multiplicar cero veces suena a no hacer nada. Y cero a la cero es aún más raro: Python, JavaScript y Google dicen 1, una TI-84 dice error de dominio y Excel también da error.

En este video respondemos tres preguntas: por qué cualquier número elevado a cero es 1, si eso es una regla que alguien eligió o algo que se nos impone, y qué es realmente cero a la cero, y por qué las máquinas no se ponen de acuerdo.""", S,
['Introducción', 'Bajando por las potencias de dos', 'Prueba con otro número', 'Un patrón no es una demostración', 'La regla que ya conoces', 'Pon un cero', 'O divide', 'Multiplicar cero veces', 'Una elección, y luego ninguna', 'La escalera se detiene', 'La regla se queda callada', 'Dos patrones, una casilla', 'Contar las maneras', 'Fórmulas que lo necesitan', 'Diez mil veces no', 'Una forma, no un número', 'Dos caminos hacia la esquina', 'Qué significa indeterminado', 'Una vieja discusión', 'Todo junto', 'La próxima vez'],
['La escalera de potencias: 16, 8, 4, 2, 1 y 1000, 100, 10, 1. Una pista, no una demostración',
 'La regla a^m × a^n = a^(m+n) obliga a que a^0 = 1 para todo a excepto 0',
 'Multiplicar cero veces: sumar empieza en 0, multiplicar empieza en 1 (el producto vacío)',
 'Con base 0 la regla se calla: solo reduce 0^0 a 0 o 1',
 'Dos patrones se pelean por una casilla: una fila de unos, una columna de ceros',
 'Contar las maneras de llenar cero cajas da 1, así que al contar 0^0 = 1',
 'Los polinomios, el binomio de Newton y la serie de e^x necesitan 0^0 = 1',
 'Donald Knuth (1992): «¡No, no, diez mil veces no!»',
 'En cálculo, 0^0 es una forma indeterminada: distintos caminos dan 1, 0, 2 o cualquier número positivo',
 'Cauchy (1821), Libri (1833) y Möbius: una discusión de casi doscientos años',
 'En un examen, responde según lo defina tu curso: muchos libros escolares dicen que 0^0 no está definido'],
['¿Cuánto crees que debería valer cero a la cero: 1, 0 o indefinido? Cuéntamelo en los comentarios.'],
'#matemáticas #exponentes #math', 'Imágenes: Wikipedia / Wikimedia Commons. Dominio público: Augustin-Louis Cauchy (retrato de Jean Roller), portada del Cours d’analyse (1821), Guglielmo Libri (litografía de Alexis-Nicolas Noël), August Ferdinand Möbius (grabado de Adolf Neumann), Isaac Newton (retrato de Godfrey Kneller, 1689). Donald Knuth: foto de Alex Handy, CC BY-SA 2.0.'))

D['pt-BR'] = ('Por que qualquer número elevado a zero dá 1? (E quanto é 0⁰?)', desc('pt-BR',
"""Dois ao cubo é 8. Dois elevado a um é 2. Mas dois elevado a zero é 1 — por quê? Multiplicar zero vezes parece não significar nada. E zero elevado a zero é ainda mais estranho: Python, JavaScript e o Google dizem 1, uma TI-84 dá erro de domínio e o Excel também mostra erro.

Neste vídeo respondemos três perguntas: por que qualquer número elevado a zero é 1, se isso é uma regra que alguém escolheu ou algo que nos é imposto, e o que zero elevado a zero realmente é — e por que as máquinas discordam.""", S,
['Introdução', 'Descendo as potências de dois', 'Teste outro número', 'Um padrão não é uma prova', 'A regra que você já conhece', 'Coloque um zero', 'Ou divida', 'Multiplicar zero vezes', 'Uma escolha, depois nenhuma', 'A escada para', 'A regra fica em silêncio', 'Dois padrões, uma casa', 'Contando as maneiras', 'Fórmulas que precisam disso', 'Dez mil vezes não', 'Uma forma, não um número', 'Dois caminhos até o canto', 'O que significa indeterminado', 'Uma discussão antiga', 'Juntando tudo', 'Na próxima'],
['A escada das potências: 16, 8, 4, 2, 1 — e 1000, 100, 10, 1. Uma pista, não uma prova',
 'A regra a^m × a^n = a^(m+n) obriga a^0 = 1 para todo a, exceto 0',
 'Multiplicar zero vezes: somar começa em 0, multiplicar começa em 1 (o produto vazio)',
 'Com base 0 a regra se cala: ela só reduz 0^0 a 0 ou 1',
 'Dois padrões brigam por uma casa: uma linha de uns, uma coluna de zeros',
 'Contar as maneiras de preencher zero caixas dá 1, então na contagem 0^0 = 1',
 'Polinômios, o binômio de Newton e a série de e^x precisam de 0^0 = 1',
 'Donald Knuth (1992): "Não, não, dez mil vezes não!"',
 'No cálculo, 0^0 é uma forma indeterminada: caminhos diferentes dão 1, 0, 2 ou qualquer número positivo',
 'Cauchy (1821), Libri (1833) e Möbius: uma discussão de quase duzentos anos',
 'Na prova, responda como o seu curso define — muitos livros escolares dizem que 0^0 é indefinido'],
['Para você, quanto deveria ser zero elevado a zero: 1, 0 ou indefinido? Conta nos comentários.'],
'#matemática #potenciação #math', 'Imagens: Wikipedia / Wikimedia Commons. Domínio público: Augustin-Louis Cauchy (retrato de Jean Roller), folha de rosto do Cours d’analyse (1821), Guglielmo Libri (litografia de Alexis-Nicolas Noël), August Ferdinand Möbius (gravura de Adolf Neumann), Isaac Newton (retrato de Godfrey Kneller, 1689). Donald Knuth: foto de Alex Handy, CC BY-SA 2.0.'))

D['hi'] = ('किसी भी संख्या की घात 0 हो तो उत्तर 1 क्यों? (और 0⁰ क्या है?)', desc('hi',
"""2 का घन 8 है। 2 की घात 1 है 2। लेकिन 2 की घात 0 है 1 — क्यों? शून्य बार गुणा करना तो कुछ भी न करने जैसा लगता है। और 0 की घात 0 तो और भी अजीब है: Python, JavaScript और Google कहते हैं 1, TI-84 कहता है domain error, और Excel भी error दिखाता है।

इस वीडियो में तीन सवाल: कोई भी संख्या की घात 0 हो तो 1 क्यों आता है, यह किसी का चुना हुआ नियम है या मजबूरी, और 0⁰ असल में क्या है — मशीनें इस पर सहमत क्यों नहीं।""", S,
['परिचय', '2 की घातों में नीचे उतरना', 'दूसरी संख्या लेकर देखें', 'पैटर्न सबूत नहीं है', 'जो नियम आप जानते हैं', 'शून्य रखकर देखें', 'या भाग दें', 'शून्य बार गुणा', 'पहले चुनाव, फिर मजबूरी', 'सीढ़ी रुक जाती है', 'नियम चुप हो जाता है', 'एक खाना, दो पैटर्न', 'तरीके गिनना', 'जिन सूत्रों को इसकी ज़रूरत है', 'दस हज़ार बार ना', 'संख्या नहीं, एक रूप', 'कोने तक दो रास्ते', 'अनिर्धार्य का मतलब', 'एक पुरानी बहस', 'सब एक साथ', 'अगली बार'],
['घातों की सीढ़ी: 16, 8, 4, 2, 1 — इशारा, सबूत नहीं',
 'नियम a^m × a^n = a^(m+n) हर a (0 छोड़कर) के लिए a^0 = 1 तय कर देता है',
 'शून्य बार गुणा: जोड़ 0 से शुरू होता है, गुणा 1 से (खाली गुणनफल)',
 'आधार 0 पर नियम सिर्फ़ इतना कहता है कि 0^0 या तो 0 है या 1',
 'शून्य डिब्बे भरने के तरीके गिनें तो 1 आता है, इसलिए गिनती में 0^0 = 1',
 'बहुपद, द्विपद प्रमेय और e^x की श्रेणी को 0^0 = 1 चाहिए',
 'डोनाल्ड क्नुथ (1992): "नहीं, नहीं, दस हज़ार बार नहीं!"',
 'कलन में 0^0 अनिर्धार्य रूप है: अलग रास्ते 1, 0, 2 या कोई भी धनात्मक संख्या देते हैं',
 'कोशी (1821), लिब्री (1833) और मोबियस: लगभग दो सौ साल पुरानी बहस',
 'परीक्षा में वही लिखें जो आपकी किताब कहती है — कई स्कूली किताबें 0^0 को अपरिभाषित मानती हैं'],
['आपके हिसाब से 0⁰ क्या होना चाहिए: 1, 0 या अपरिभाषित? कमेंट में बताइए।'],
'#गणित #math #exponents', 'चित्र: Wikipedia / Wikimedia Commons (पब्लिक डोमेन)। Donald Knuth: photo by Alex Handy, CC BY-SA 2.0।'))

D['id'] = ('Kenapa Bilangan Apa Pun Pangkat Nol Hasilnya 1? (Lalu 0⁰ Berapa?)', desc('id',
"""Dua pangkat tiga itu 8. Dua pangkat satu itu 2. Tapi dua pangkat nol itu 1 — kenapa? Mengalikan nol kali terdengar seperti tidak melakukan apa-apa. Dan nol pangkat nol lebih aneh lagi: Python, JavaScript, dan Google bilang 1, TI-84 bilang domain error, dan Excel juga menampilkan error.

Di video ini kita menjawab tiga pertanyaan: kenapa bilangan apa pun pangkat nol hasilnya 1, apakah itu aturan yang dipilih seseorang atau sesuatu yang memang terpaksa, dan apa sebenarnya nol pangkat nol — serta kenapa mesin-mesin tidak sepakat.""", S,
['Pendahuluan', 'Menuruni pangkat dua', 'Coba bilangan lain', 'Pola bukanlah bukti', 'Aturan yang sudah kamu tahu', 'Masukkan nol', 'Atau bagi', 'Mengalikan nol kali', 'Pilihan, lalu bukan pilihan', 'Tangganya berhenti', 'Aturannya diam', 'Dua pola, satu kotak', 'Menghitung cara', 'Rumus yang membutuhkannya', 'Sepuluh ribu kali tidak', 'Bentuk, bukan bilangan', 'Dua jalan ke sudut', 'Arti tak tentu', 'Perdebatan lama', 'Menyatukan semuanya', 'Video berikutnya'],
['Tangga pangkat: 16, 8, 4, 2, 1 — dan 1000, 100, 10, 1. Petunjuk, bukan bukti',
 'Aturan a^m × a^n = a^(m+n) memaksa a^0 = 1 untuk semua a kecuali 0',
 'Mengalikan nol kali: penjumlahan mulai dari 0, perkalian mulai dari 1 (hasil kali kosong)',
 'Dengan basis 0 aturannya diam: hanya mempersempit 0^0 menjadi 0 atau 1',
 'Dua pola berebut satu kotak: satu baris angka satu, satu kolom angka nol',
 'Menghitung cara mengisi nol kotak menghasilkan 1, jadi dalam pencacahan 0^0 = 1',
 'Polinomial, teorema binomial, dan deret e^x membutuhkan 0^0 = 1',
 'Donald Knuth (1992): "Tidak, tidak, sepuluh ribu kali tidak!"',
 'Dalam kalkulus 0^0 adalah bentuk tak tentu: jalan berbeda memberi 1, 0, 2, atau bilangan positif apa pun',
 'Cauchy (1821), Libri (1833), dan Möbius: perdebatan yang umurnya hampir dua ratus tahun',
 'Saat ujian, jawab sesuai definisi di kelasmu — banyak buku sekolah menyebut 0^0 tidak terdefinisi'],
['Menurutmu nol pangkat nol seharusnya berapa: 1, 0, atau tidak terdefinisi? Tulis di kolom komentar.'],
'#matematika #eksponen #math', 'Gambar: Wikipedia / Wikimedia Commons. Domain publik: Augustin-Louis Cauchy (potret oleh Jean Roller), halaman judul Cours d’analyse (1821), Guglielmo Libri (litografi oleh Alexis-Nicolas Noël), August Ferdinand Möbius (ukiran oleh Adolf Neumann), Isaac Newton (potret oleh Godfrey Kneller, 1689). Donald Knuth: foto oleh Alex Handy, CC BY-SA 2.0.'))

D['de'] = ('Warum ist jede Zahl hoch null gleich 1? (Und was ist 0⁰?)', desc('de',
"""Zwei hoch drei ist 8. Zwei hoch eins ist 2. Aber zwei hoch null ist 1 – warum? Null-mal multiplizieren klingt, als würde gar nichts passieren. Und null hoch null ist noch seltsamer: Python, JavaScript und Google sagen 1, ein TI-84 meldet einen Definitionsbereichsfehler, und Excel zeigt ebenfalls einen Fehler.

In diesem Video beantworten wir drei Fragen: Warum ist jede Zahl hoch null gleich 1? Ist das eine Regel, die sich jemand ausgesucht hat, oder sind wir dazu gezwungen? Und was ist null hoch null wirklich – und warum sind sich die Maschinen uneinig?""", S,
['Einleitung', 'Die Zweierpotenzen hinunter', 'Eine andere Zahl', 'Ein Muster ist kein Beweis', 'Die Regel, die du schon kennst', 'Setz eine Null ein', 'Oder teile', 'Null-mal multiplizieren', 'Erst eine Wahl, dann keine', 'Die Treppe endet', 'Die Regel schweigt', 'Zwei Muster, ein Feld', 'Möglichkeiten zählen', 'Formeln, die es brauchen', 'Zehntausendmal nein', 'Eine Form, keine Zahl', 'Zwei Wege zur Ecke', 'Was unbestimmt bedeutet', 'Ein alter Streit', 'Alles zusammen', 'Nächstes Mal'],
['Die Potenztreppe: 16, 8, 4, 2, 1 – und 1000, 100, 10, 1. Ein Hinweis, kein Beweis',
 'Die Regel a^m × a^n = a^(m+n) erzwingt a^0 = 1 für jedes a außer 0',
 'Null-mal multiplizieren: Addieren beginnt bei 0, Multiplizieren bei 1 (das leere Produkt)',
 'Bei Basis 0 schweigt die Regel: Sie engt 0^0 nur auf 0 oder 1 ein',
 'Zwei Muster streiten um ein Feld: eine Zeile Einsen, eine Spalte Nullen',
 'Die Möglichkeiten zu zählen, null Kästchen zu füllen, ergibt 1 – beim Zählen gilt also 0^0 = 1',
 'Polynome, der binomische Lehrsatz und die Reihe für e^x brauchen 0^0 = 1',
 'Donald Knuth (1992): „Nein, nein, zehntausendmal nein!“',
 'In der Analysis ist 0^0 ein unbestimmter Ausdruck: Verschiedene Wege liefern 1, 0, 2 oder jede positive Zahl',
 'Cauchy (1821), Libri (1833) und Möbius: ein fast zweihundert Jahre alter Streit',
 'In der Prüfung so antworten, wie es dein Kurs definiert – viele Schulbücher nennen 0^0 nicht definiert'],
['Was sollte null hoch null deiner Meinung nach sein: 1, 0 oder nicht definiert? Schreib es in die Kommentare.'],
'#mathematik #potenzen #math', 'Bilder: Wikipedia / Wikimedia Commons. Gemeinfrei: Augustin-Louis Cauchy (Porträt von Jean Roller), Titelseite des Cours d’analyse (1821), Guglielmo Libri (Lithografie von Alexis-Nicolas Noël), August Ferdinand Möbius (Stich von Adolf Neumann), Isaac Newton (Porträt von Godfrey Kneller, 1689). Donald Knuth: Foto von Alex Handy, CC BY-SA 2.0.'))

D['fr'] = ('Pourquoi n’importe quel nombre puissance zéro vaut 1 ? (Et 0⁰ ?)', desc('fr',
"""Deux au cube, c'est 8. Deux puissance un, c'est 2. Mais deux puissance zéro, c'est 1 : pourquoi ? Multiplier zéro fois, ça ressemble à ne rien faire du tout. Et zéro puissance zéro est encore plus étrange : Python, JavaScript et Google répondent 1, une TI-84 affiche une erreur de domaine, et Excel renvoie aussi une erreur.

Dans cette vidéo, on répond à trois questions : pourquoi n'importe quel nombre puissance zéro vaut 1, si c'est une règle que quelqu'un a choisie ou quelque chose qui s'impose à nous, et ce que vaut vraiment zéro puissance zéro — et pourquoi les machines ne sont pas d'accord.""", S,
['Introduction', 'En descendant les puissances de deux', 'Essayez un autre nombre', "Un motif n'est pas une preuve", 'La règle que vous connaissez déjà', 'Mettez un zéro', 'Ou divisez', 'Multiplier zéro fois', 'Un choix, puis plus de choix', "L'escalier s'arrête", 'La règle se tait', 'Deux motifs, une case', 'Compter les façons', 'Les formules qui en ont besoin', 'Dix mille fois non', 'Une forme, pas un nombre', 'Deux chemins vers le coin', 'Ce que veut dire indéterminé', 'Une vieille dispute', 'Tout assembler', 'La prochaine fois'],
["L'escalier des puissances : 16, 8, 4, 2, 1 — et 1000, 100, 10, 1. Un indice, pas une preuve",
 'La règle a^m × a^n = a^(m+n) impose a^0 = 1 pour tout a sauf 0',
 'Multiplier zéro fois : une somme part de 0, un produit part de 1 (le produit vide)',
 'Avec la base 0, la règle se tait : elle réduit seulement 0^0 à 0 ou 1',
 'Deux motifs se disputent une case : une ligne de uns, une colonne de zéros',
 'Compter les façons de remplir zéro case donne 1, donc en dénombrement 0^0 = 1',
 'Les polynômes, le binôme de Newton et la série de e^x ont besoin de 0^0 = 1',
 'Donald Knuth (1992) : « Non, non, dix mille fois non ! »',
 'En analyse, 0^0 est une forme indéterminée : des chemins différents donnent 1, 0, 2 ou n’importe quel nombre positif',
 'Cauchy (1821), Libri (1833) et Möbius : une dispute vieille de près de deux cents ans',
 'En contrôle, répondez selon la définition de votre cours — beaucoup de manuels disent que 0^0 n’est pas défini'],
['Selon vous, combien devrait valoir zéro puissance zéro : 1, 0 ou indéfini ? Dites-le en commentaire.'],
'#mathématiques #puissances #math', 'Images : Wikipédia / Wikimedia Commons. Domaine public : Augustin-Louis Cauchy (portrait par Jean Roller), page de titre du Cours d’analyse (1821), Guglielmo Libri (lithographie d’Alexis-Nicolas Noël), August Ferdinand Möbius (gravure d’Adolf Neumann), Isaac Newton (portrait par Godfrey Kneller, 1689). Donald Knuth : photo d’Alex Handy, CC BY-SA 2.0.'))

D['ar'] = ('لماذا أي عدد أُسّه صفر يساوي 1؟ (وكم يساوي 0⁰؟)', desc('ar',
"""اثنان أُس ثلاثة يساوي 8، واثنان أُس واحد يساوي 2، لكن اثنين أُس صفر يساوي 1 — لماذا؟ الضرب صفر مرة يبدو وكأنه لا يعني شيئًا. وصفر أُس صفر أغرب من ذلك: Python وJavaScript وGoogle تقول 1، وآلة TI-84 تعطي خطأ مجال، وExcel يعرض خطأً أيضًا.

في هذا الفيديو نجيب عن ثلاثة أسئلة: لماذا أي عدد أُسّه صفر يساوي 1، وهل هذه قاعدة اختارها أحد أم أمر مفروض علينا، وما هو صفر أُس صفر حقًا — ولماذا تختلف الآلات.""", S,
['مقدمة', 'نزولًا في قوى العدد 2', 'جرّب عددًا آخر', 'النمط ليس برهانًا', 'القاعدة التي تعرفها', 'ضع صفرًا', 'أو اقسم', 'الضرب صفر مرة', 'اختيار ثم لا اختيار', 'الدرج يتوقف', 'القاعدة تصمت', 'نمطان وخانة واحدة', 'عدّ الطرق', 'صيغ تحتاج إليه', 'لا، عشرة آلاف مرة', 'شكل لا عدد', 'طريقان إلى الزاوية', 'معنى «غير معيّن»', 'جدال قديم', 'نجمع كل شيء', 'في المرة القادمة'],
['درج القوى: 16، 8، 4، 2، 1 — و1000، 100، 10، 1. تلميح لا برهان',
 'القاعدة a^m × a^n = a^(m+n) تفرض أن a^0 = 1 لكل a ما عدا 0',
 'الضرب صفر مرة: الجمع يبدأ من 0 والضرب يبدأ من 1 (الضرب الفارغ)',
 'عندما يكون الأساس 0 تصمت القاعدة: تحصر 0^0 في 0 أو 1 فقط',
 'نمطان يتنازعان خانة واحدة: صف من الآحاد وعمود من الأصفار',
 'عدد طرق ملء صفر صناديق هو 1، لذا في العدّ 0^0 = 1',
 'كثيرات الحدود ونظرية ذات الحدين ومتسلسلة e^x تحتاج إلى 0^0 = 1',
 'دونالد كنوث (1992): «لا، لا، عشرة آلاف مرة لا!»',
 'في التفاضل والتكامل 0^0 صيغة غير معيّنة: طرق مختلفة تعطي 1 أو 0 أو 2 أو أي عدد موجب',
 'كوشي (1821) وليبري (1833) وموبيوس: جدال عمره قرابة مئتي عام',
 'في الامتحان أجب وفق تعريف مقررك — كثير من الكتب المدرسية تعدّ 0^0 غير معرَّف'],
['برأيك، كم يجب أن يكون صفر أُس صفر: 1 أم 0 أم غير معرَّف؟ أخبرني في التعليقات.'],
'#رياضيات #الأسس #math', 'الصور: ويكيبيديا / ويكيميديا كومنز (ملكية عامة): كوشي، Cours d’analyse ‏(1821)، ليبري، موبيوس، نيوتن. Donald Knuth: photo by Alex Handy, CC BY-SA 2.0.'))

D['vi'] = ('Vì sao mọi số mũ 0 đều bằng 1? (Còn 0⁰ bằng bao nhiêu?)', desc('vi',
"""Hai mũ ba bằng 8. Hai mũ một bằng 2. Nhưng hai mũ không lại bằng 1 — vì sao? Nhân không lần nghe như chẳng làm gì cả. Còn không mũ không thì càng lạ: Python, JavaScript và Google nói 1, máy TI-84 báo lỗi miền xác định, Excel cũng báo lỗi.

Trong video này chúng ta trả lời ba câu hỏi: vì sao mọi số mũ 0 đều bằng 1, đó là quy ước ai đó chọn hay là điều bắt buộc, và 0 mũ 0 thật ra là gì — vì sao các máy lại không đồng ý với nhau.""", S,
['Mở đầu', 'Đi xuống các lũy thừa của 2', 'Thử số khác', 'Quy luật chưa phải chứng minh', 'Quy tắc bạn đã biết', 'Thay số 0 vào', 'Hoặc chia', 'Nhân không lần', 'Một lựa chọn, rồi hết lựa chọn', 'Cầu thang dừng lại', 'Quy tắc im lặng', 'Hai quy luật, một ô', 'Đếm số cách', 'Những công thức cần nó', 'Mười nghìn lần không', 'Một dạng, không phải một số', 'Hai đường tới góc', 'Vô định nghĩa là gì', 'Một cuộc tranh cãi cũ', 'Ghép lại tất cả', 'Lần sau'],
['Cầu thang lũy thừa: 16, 8, 4, 2, 1 — và 1000, 100, 10, 1. Một gợi ý, chưa phải chứng minh',
 'Quy tắc a^m × a^n = a^(m+n) buộc a^0 = 1 với mọi a trừ 0',
 'Nhân không lần: phép cộng bắt đầu từ 0, phép nhân bắt đầu từ 1 (tích rỗng)',
 'Với cơ số 0, quy tắc im lặng: nó chỉ thu hẹp 0^0 về 0 hoặc 1',
 'Hai quy luật tranh nhau một ô: một hàng toàn số 1, một cột toàn số 0',
 'Đếm số cách lấp đầy 0 cái hộp được 1, nên trong tổ hợp 0^0 = 1',
 'Đa thức, nhị thức Newton và chuỗi của e^x đều cần 0^0 = 1',
 'Donald Knuth (1992): "Không, không, mười nghìn lần không!"',
 'Trong giải tích 0^0 là dạng vô định: các đường khác nhau cho 1, 0, 2 hay bất kỳ số dương nào',
 'Cauchy (1821), Libri (1833) và Möbius: cuộc tranh cãi gần hai trăm năm',
 'Khi đi thi, hãy trả lời theo định nghĩa của chương trình — nhiều sách giáo khoa nói 0^0 không xác định'],
['Theo bạn 0 mũ 0 nên bằng bao nhiêu: 1, 0 hay không xác định? Bình luận cho mình biết nhé.'],
'#toánhọc #lũythừa #math', 'Hình ảnh: Wikipedia / Wikimedia Commons. Phạm vi công cộng: Augustin-Louis Cauchy (chân dung của Jean Roller), trang bìa Cours d’analyse (1821), Guglielmo Libri (tranh in đá của Alexis-Nicolas Noël), August Ferdinand Möbius (bản khắc của Adolf Neumann), Isaac Newton (chân dung của Godfrey Kneller, 1689). Donald Knuth: ảnh của Alex Handy, CC BY-SA 2.0.'))

D['tr'] = ('Neden Her Sayının Sıfırıncı Kuvveti 1? (Peki 0⁰ Kaç?)', desc('tr',
"""İkinin küpü 8. İkinin birinci kuvveti 2. Ama ikinin sıfırıncı kuvveti 1 — neden? Sıfır kez çarpmak hiçbir şey yapmamak gibi geliyor. Sıfırın sıfırıncı kuvveti ise daha da tuhaf: Python, JavaScript ve Google 1 diyor, TI-84 tanım kümesi hatası veriyor, Excel de hata gösteriyor.

Bu videoda üç soruyu cevaplıyoruz: her sayının sıfırıncı kuvveti neden 1, bu birinin seçtiği bir kural mı yoksa bize dayatılan bir şey mi, ve sıfırın sıfırıncı kuvveti gerçekte ne — makineler neden anlaşamıyor.""", S,
['Giriş', "2'nin kuvvetlerinde aşağı inmek", 'Başka bir sayı dene', 'Örüntü kanıt değildir', 'Zaten bildiğin kural', 'Sıfır koy', 'Ya da böl', 'Sıfır kez çarpmak', 'Önce seçim, sonra seçimsizlik', 'Merdiven bitiyor', 'Kural susuyor', 'İki örüntü, bir kare', 'Yolları saymak', 'Buna ihtiyaç duyan formüller', 'On bin kere hayır', 'Sayı değil, bir biçim', 'Köşeye giden iki yol', 'Belirsiz ne demek', 'Eski bir tartışma', 'Hepsini birleştirmek', 'Bir dahaki sefere'],
['Kuvvet merdiveni: 16, 8, 4, 2, 1 — ve 1000, 100, 10, 1. Bir ipucu, kanıt değil',
 "a^m × a^n = a^(m+n) kuralı 0 hariç her a için a^0 = 1 olmasını zorunlu kılar",
 "Sıfır kez çarpmak: toplama 0'dan, çarpma 1'den başlar (boş çarpım)",
 "Taban 0 olunca kural susar: 0^0'ı sadece 0 ya da 1'e daraltır",
 'İki örüntü tek bir kare için kavga eder: bir satır birler, bir sütun sıfırlar',
 'Sıfır kutuyu doldurmanın yollarını saymak 1 verir; yani saymada 0^0 = 1',
 "Polinomlar, binom teoremi ve e^x serisi 0^0 = 1'e ihtiyaç duyar",
 'Donald Knuth (1992): "Hayır, hayır, on bin kere hayır!"',
 'Analizde 0^0 belirsiz bir biçimdir: farklı yollar 1, 0, 2 ya da herhangi bir pozitif sayı verir',
 'Cauchy (1821), Libri (1833) ve Möbius: neredeyse iki yüz yıllık bir tartışma',
 "Sınavda dersinizin tanımına göre cevap verin — birçok okul kitabı 0^0'ı tanımsız kabul eder"],
['Sizce sıfırın sıfırıncı kuvveti ne olmalı: 1, 0 ya da tanımsız? Yorumlarda yazın.'],
'#matematik #üslüsayılar #math', 'Görseller: Wikipedia / Wikimedia Commons. Kamu malı: Augustin-Louis Cauchy (Jean Roller portresi), Cours d’analyse kapak sayfası (1821), Guglielmo Libri (Alexis-Nicolas Noël taş baskısı), August Ferdinand Möbius (Adolf Neumann gravürü), Isaac Newton (Godfrey Kneller portresi, 1689). Donald Knuth: Alex Handy fotoğrafı, CC BY-SA 2.0.'))

D['ko'] = ('왜 모든 수의 0제곱은 1일까? (그럼 0⁰은?)', desc('ko',
"""2의 세제곱은 8, 2의 1제곱은 2입니다. 그런데 2의 0제곱은 왜 1일까요? 0번 곱한다는 건 아무것도 안 한다는 뜻 같은데 말이죠. 0의 0제곱은 더 이상합니다. 파이썬, 자바스크립트, 구글은 1이라고 하고, TI-84 계산기는 정의역 오류, 엑셀도 오류를 냅니다.

이 영상에서는 세 가지 질문에 답합니다. 왜 모든 수의 0제곱은 1일까? 그건 누군가 정한 규칙일까, 아니면 그럴 수밖에 없는 걸까? 그리고 0의 0제곱은 정말 무엇이고, 기계들은 왜 서로 다른 답을 낼까?""", S,
['들어가며', '2의 거듭제곱 내려가기', '다른 수로 해 보기', '패턴은 증명이 아니다', '이미 알고 있는 규칙', '0을 넣어 보기', '아니면 나누기', '0번 곱하기', '선택, 그리고 선택의 여지 없음', '계단이 멈춘다', '규칙이 침묵한다', '두 패턴, 한 칸', '경우의 수 세기', '이것이 필요한 공식들', '만 번이라도 아니다', '수가 아니라 꼴', '모서리로 가는 두 길', '부정형이란', '오래된 논쟁', '정리하며', '다음 영상'],
['거듭제곱의 계단: 16, 8, 4, 2, 1 — 그리고 1000, 100, 10, 1. 힌트일 뿐 증명은 아니다',
 '지수법칙 a^m × a^n = a^(m+n) 때문에 0이 아닌 모든 a에 대해 a^0 = 1',
 '0번 곱하기: 덧셈은 0에서, 곱셈은 1에서 시작한다 (빈 곱)',
 '밑이 0이면 규칙은 침묵한다: 0^0이 0 아니면 1이라는 것까지만',
 '한 칸을 두고 두 패턴이 싸운다: 1로 된 행, 0으로 된 열',
 '상자 0개를 채우는 경우의 수는 1 — 그래서 경우의 수에서는 0^0 = 1',
 '다항식, 이항정리, e^x의 급수는 모두 0^0 = 1이 필요하다',
 '도널드 커누스(1992): "아니, 아니, 만 번이라도 아니다!"',
 '미적분에서 0^0은 부정형: 길에 따라 1, 0, 2 또는 어떤 양수도 나온다',
 '코시(1821), 리브리(1833), 뫼비우스: 200년 가까이 된 논쟁',
 '시험에서는 교과 과정의 정의를 따르세요 — 많은 교과서는 0^0을 정의하지 않습니다'],
['여러분은 0의 0제곱이 무엇이어야 한다고 생각하나요? 1, 0, 아니면 정의 불가? 댓글로 알려 주세요.'],
'#수학 #지수 #math', '이미지: 위키백과 / 위키미디어 공용. 퍼블릭 도메인: 오귀스탱 루이 코시 (장 롤러 초상화), Cours d’analyse 표지 (1821), 굴리엘모 리브리 (알렉시 니콜라 노엘 석판화), 아우구스트 페르디난트 뫼비우스 (아돌프 노이만 판화), 아이작 뉴턴 (고드프리 넬러 초상화, 1689). 도널드 커누스: Alex Handy 사진, CC BY-SA 2.0.'))
sys.exit(write('en/zero-power', D))
