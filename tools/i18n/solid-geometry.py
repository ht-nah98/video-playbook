from gen import *
S = '0:00 0:48 1:26 2:25 2:36 2:46 3:37 3:53 4:16 4:48 5:05 5:39 6:03 6:26 6:58 7:39 7:51 8:20 8:54 9:32 9:45 9:56 10:19 10:41 11:14 11:42 12:25 12:55 13:52 14:03 14:39 15:10 15:51 16:26 16:44 17:10 17:39 17:56 18:20'.split()
D = {}
D['es'] = ('Toda pirámide es exactamente ⅓ de una caja. ¿Por qué?', desc('es',
"""Llena una pirámide de agua y viértela en una caja con la misma base y la misma altura. Hacen falta exactamente tres, para cualquier pirámide y su caja. Y una esfera que encaja justa dentro de un cilindro ocupa exactamente dos tercios de él. ¿Por qué esos números?

Para verlo, construimos la geometría del espacio desde cero y respondemos tres preguntas: ¿cuáles son las pocas reglas simples sobre las que se levanta todo? ¿Cómo se mide un ángulo, o una distancia, entre cosas que nunca se tocan? ¿Y de dónde salen las fórmulas de volumen, incluido ese un tercio?""", S,
['Introducción', 'Punto, recta, plano', 'Cuatro reglas', 'Tres formas de fijar un plano', 'El mapa', 'Dos rectas', 'Una recta y un plano', 'Dos planos', 'Un sustituto', 'Hacia dónde va el corte', 'Dos direcciones fijan un plano', 'Todas las rectas del plano', 'Con dos basta', 'El teorema de las tres perpendiculares', 'Dos planos en ángulo recto', 'Entre medias', 'Dos rectas', 'Una recta y un plano', 'Dos planos', 'Todo camino lleva a un triángulo', 'El camino más corto', 'Un punto y un plano', 'Cualquier punto sirve', 'Dos rectas que se cruzan', 'Caras, aristas, vértices', 'Prismas', 'Pirámides', 'Solo cinco', 'Cuánto espacio', 'Apilar cubos', 'El tercio', 'Girar una figura plana', 'El cono', 'La esfera', 'El favorito de Arquímedes', 'De vuelta a la página plana', 'Una cadena, no una lista', 'Todo junto', 'La próxima vez'],
['Punto, recta y plano: las tres ideas que las matemáticas nunca definen, y los cuatro axiomas que las describen',
 'Por qué un taburete de tres patas nunca cojea y una silla de cuatro sí puede',
 'Rectas que se cruzan sin cortarse: por qué los coches de un paso elevado nunca chocan',
 'Rectas y planos paralelos: busca un sustituto; dos rectas que se cortan fijan un plano',
 'El teorema de las tres perpendiculares: cambia una recta en el espacio por su sombra',
 'Tres tipos de ángulo (de 0 a 90 grados), y por qué un portátil abierto a 120 grados forma un ángulo de 60 grados entre dos planos',
 'La distancia siempre es la perpendicular, incluso entre dos rectas que se cruzan',
 'Prismas, pirámides y una habitación cuya diagonal mide 13 (3² + 4² + 12² = 13²)',
 'Por qué solo hay cinco sólidos platónicos (Euclides, Elementos, libro XIII), y puedes lanzar los cinco como dados',
 'Volumen: apilar cubos unidad, y por qué una pirámide es un tercio de un prisma',
 'La Gran Pirámide de Guiza: unos 2,6 millones de metros cúbicos de piedra, frente a casi 7,8 millones para una caja',
 'Cilindro, cono y esfera, y el resultado favorito de Arquímedes: una esfera es dos tercios de su cilindro'],
['Todo ángulo y toda distancia en el espacio terminan dentro de un triángulo plano. ¿Qué parte te sorprendió más? Cuéntamelo en los comentarios.'],
'#matemáticas #geometría #geometríadelespacio', 'Imágenes: Wikipedia / Wikimedia Commons. Dominio público: Cicerón descubriendo la tumba de Arquímedes, Benjamin West, 1797 (Yale University Art Gallery). Gran Pirámide de Guiza: foto de Nina, CC BY 2.5. La voz de la narración es sintética.'))

D['pt-BR'] = ('Toda pirâmide é exatamente ⅓ de uma caixa. Por quê?', desc('pt-BR',
"""Encha uma pirâmide de água e despeje numa caixa com a mesma base e a mesma altura. São necessárias exatamente três, para qualquer pirâmide e sua caixa. E uma bola que cabe justinha dentro de um cilindro ocupa exatamente dois terços dele. Por que esses números?

Para enxergar isso, construímos a geometria espacial do zero e respondemos três perguntas: quais são as poucas regras simples em que tudo se apoia? Como medir um ângulo, ou uma distância, entre coisas que nunca se tocam? E de onde vêm as fórmulas de volume, incluindo esse um terço?""", S,
['Introdução', 'Ponto, reta, plano', 'Quatro regras', 'Três jeitos de fixar um plano', 'O mapa', 'Duas retas', 'Uma reta e um plano', 'Dois planos', 'Um substituto', 'Para que lado vai o corte', 'Duas direções travam um plano', 'Toda reta do plano', 'Duas bastam', 'O teorema das três perpendiculares', 'Dois planos em ângulo reto', 'No meio do caminho', 'Duas retas', 'Uma reta e um plano', 'Dois planos', 'Todo caminho leva a um triângulo', 'O caminho mais curto', 'Um ponto e um plano', 'Qualquer ponto serve', 'Duas retas reversas', 'Faces, arestas, vértices', 'Prismas', 'Pirâmides', 'Só cinco', 'Quanto espaço', 'Empilhando cubos', 'O um terço', 'Girando uma figura plana', 'O cone', 'A esfera', 'O favorito de Arquimedes', 'De volta à página plana', 'Uma corrente, não uma lista', 'Juntando tudo', 'Na próxima'],
['Ponto, reta e plano: as três ideias que a matemática nunca define, e os quatro axiomas que as descrevem',
 'Por que um banquinho de três pés nunca balança e uma cadeira de quatro pode balançar',
 'Retas reversas: por que os carros de um viaduto nunca batem nos de baixo',
 'Retas e planos paralelos: ache um substituto; duas retas concorrentes travam um plano',
 'O teorema das três perpendiculares: troque uma reta no espaço pela sua sombra',
 'Três tipos de ângulo (de 0 a 90 graus), e por que um notebook aberto a 120 graus forma 60 graus entre dois planos',
 'A distância é sempre a perpendicular, até entre duas retas reversas',
 'Prismas, pirâmides e uma sala cuja diagonal mede 13 (3² + 4² + 12² = 13²)',
 'Por que existem só cinco sólidos de Platão (Euclides, Os Elementos, Livro XIII), e dá para rolar os cinco como dados',
 'Volume: empilhando cubos unitários, e por que uma pirâmide é um terço de um prisma',
 'A Grande Pirâmide de Gizé: cerca de 2,6 milhões de metros cúbicos de pedra, contra quase 7,8 milhões de uma caixa',
 'Cilindro, cone e esfera, e o resultado favorito de Arquimedes: a esfera é dois terços do seu cilindro'],
['Todo ângulo e toda distância da geometria espacial terminam dentro de um triângulo plano. Qual parte mais te surpreendeu? Conta nos comentários.'],
'#matemática #geometria #geometriaespacial', 'Imagens: Wikipedia / Wikimedia Commons. Domínio público: Cícero descobrindo o túmulo de Arquimedes, Benjamin West, 1797 (Yale University Art Gallery). Grande Pirâmide de Gizé: foto de Nina, CC BY 2.5. A voz da narração é sintética.'))

D['hi'] = ('हर पिरामिड ठीक ⅓ डिब्बा होता है। क्यों?', desc('hi',
"""एक पिरामिड में पानी भरकर उसे उतने ही आधार और ऊँचाई वाले डिब्बे में डालिए। ठीक तीन बार लगते हैं — हर पिरामिड के लिए। और सिलेंडर में फ़िट गेंद उसका ठीक दो-तिहाई भरती है। ये संख्याएँ क्यों?

हम ठोस ज्यामिति शुरू से बनाते हैं और तीन सवालों के जवाब देते हैं: पूरा विषय किन कुछ सरल नियमों पर टिका है? जो चीज़ें कभी छूती नहीं, उनके बीच कोण या दूरी कैसे नापें? और आयतन के सूत्र — वह एक-तिहाई भी — कहाँ से आते हैं?""", S,
['परिचय', 'बिंदु, रेखा, तल', 'चार नियम', 'तल तय करने के तीन तरीके', 'नक्शा', 'दो रेखाएँ', 'रेखा और तल', 'दो तल', 'एक विकल्प', 'काट किस ओर', 'दो दिशाएँ तल तय करती हैं', 'तल की हर रेखा', 'दो काफ़ी हैं', 'तीन लंबों का प्रमेय', 'लंबवत दो तल', 'बीच में', 'दो रेखाएँ', 'रेखा और तल', 'दो तल', 'हर रास्ता त्रिभुज तक', 'सबसे छोटा रास्ता', 'बिंदु और तल', 'कोई भी बिंदु चलेगा', 'दो विषमतलीय रेखाएँ', 'फलक, किनारे, शीर्ष', 'प्रिज़्म', 'पिरामिड', 'सिर्फ़ पाँच', 'कितनी जगह', 'घन जमाना', 'एक-तिहाई', 'समतल आकृति घुमाना', 'शंकु', 'गोला', 'आर्किमिडीज़ का पसंदीदा', 'वापस समतल पन्ने पर', 'सूची नहीं, एक कड़ी', 'सब एक साथ', 'अगली बार'],
['बिंदु, रेखा, तल: तीन अपरिभाषित विचार और चार स्वयंसिद्ध',
 'तीन पैरों वाला स्टूल कभी नहीं डगमगाता, चार पैरों वाली कुर्सी डगमगा सकती है',
 'तीन लंबों का प्रमेय: स्पेस की रेखा को उसकी परछाईं से बदलिए',
 'हर दूरी लंब होती है, विषमतलीय रेखाओं के बीच भी',
 'सिर्फ़ पाँच प्लेटोनिक ठोस क्यों (यूक्लिड, एलिमेंट्स XIII)',
 'पिरामिड प्रिज़्म का एक-तिहाई क्यों; गीज़ा का महान पिरामिड',
 'आर्किमिडीज़ का पसंदीदा परिणाम: गोला अपने सिलेंडर का दो-तिहाई'],
['आपको सबसे ज़्यादा किस हिस्से ने चौंकाया? कमेंट में बताइए।'],
'#गणित #ज्यामिति #math', 'चित्र: Wikimedia Commons — Benjamin West, 1797 (पब्लिक डोमेन); गीज़ा पिरामिड: Nina, CC BY 2.5। आवाज़ सिंथेटिक है।'))

D['id'] = ('Setiap Limas Tepat ⅓ dari Sebuah Kotak. Kenapa?', desc('id',
"""Isi sebuah limas dengan air lalu tuangkan ke kotak yang alas dan tingginya sama. Butuh tepat tiga kali, untuk limas apa pun dan kotak pasangannya. Dan bola yang pas di dalam tabung mengisi tepat dua pertiganya. Kenapa angkanya begitu?

Untuk melihatnya, kita membangun geometri ruang dari nol dan menjawab tiga pertanyaan: aturan sederhana apa saja yang menjadi dasar seluruh pelajaran ini? Bagaimana mengukur sudut, atau jarak, antara benda yang tidak pernah bersentuhan? Dan dari mana rumus volume berasal, termasuk sepertiga itu?""", S,
['Pendahuluan', 'Titik, garis, bidang', 'Empat aturan', 'Tiga cara menentukan bidang', 'Petanya', 'Dua garis', 'Garis dan bidang', 'Dua bidang', 'Sebuah pengganti', 'Ke arah mana potongannya', 'Dua arah mengunci bidang', 'Setiap garis di bidang', 'Dua sudah cukup', 'Teorema tiga garis tegak lurus', 'Dua bidang saling tegak lurus', 'Di antaranya', 'Dua garis', 'Garis dan bidang', 'Dua bidang', 'Semua jalan menuju segitiga', 'Jalan terpendek', 'Titik dan bidang', 'Titik mana pun boleh', 'Dua garis bersilangan', 'Sisi, rusuk, titik sudut', 'Prisma', 'Limas', 'Hanya lima', 'Berapa banyak ruang', 'Menumpuk kubus', 'Sepertiga itu', 'Memutar bangun datar', 'Kerucut', 'Bola', 'Favorit Archimedes', 'Kembali ke halaman datar', 'Rantai, bukan daftar', 'Menyatukan semuanya', 'Video berikutnya'],
['Titik, garis, bidang: tiga ide yang tidak pernah didefinisikan matematika, dan empat aksioma yang menggambarkannya',
 'Kenapa bangku berkaki tiga tidak pernah goyang, sementara kursi berkaki empat bisa',
 'Garis bersilangan: kenapa mobil di jalan layang tidak pernah bertabrakan dengan yang di bawah',
 'Garis dan bidang sejajar: cari pengganti; dua garis berpotongan mengunci sebuah bidang',
 'Teorema tiga garis tegak lurus: tukar garis di ruang dengan bayangannya',
 'Tiga jenis sudut (0 sampai 90 derajat), dan kenapa laptop yang dibuka 120 derajat membentuk sudut 60 derajat antara dua bidang',
 'Jarak selalu garis tegak lurus, bahkan antara dua garis bersilangan',
 'Prisma, limas, dan ruangan yang diagonalnya 13 (3² + 4² + 12² = 13²)',
 'Kenapa hanya ada lima bangun ruang Platonik (Euclid, Elements, Buku XIII), dan kelimanya bisa dilempar seperti dadu',
 'Volume: menumpuk kubus satuan, dan kenapa limas adalah sepertiga prisma',
 'Piramida Agung Giza: sekitar 2,6 juta meter kubik batu, dibanding hampir 7,8 juta untuk sebuah kotak',
 'Tabung, kerucut, dan bola, serta hasil favorit Archimedes: bola adalah dua pertiga tabungnya'],
['Setiap sudut dan jarak dalam geometri ruang berakhir di dalam sebuah segitiga datar. Bagian mana yang paling mengejutkanmu? Tulis di kolom komentar.'],
'#matematika #geometri #geometriruang', 'Gambar: Wikipedia / Wikimedia Commons. Domain publik: Cicero Discovering the Tomb of Archimedes, Benjamin West, 1797 (Yale University Art Gallery). Piramida Agung Giza: foto oleh Nina, CC BY 2.5. Suara narasi adalah suara sintetis.'))

D['de'] = ('Jede Pyramide ist genau ⅓ eines Quaders. Warum?', desc('de',
"""Füll eine Pyramide mit Wasser und gieß es in einen Quader mit gleicher Grundfläche und gleicher Höhe. Es braucht genau drei Füllungen – bei jeder Pyramide und jedem passenden Quader. Und eine Kugel, die genau in einen Zylinder passt, füllt exakt zwei Drittel davon. Warum gerade diese Zahlen?

Um das zu sehen, bauen wir die Raumgeometrie von Grund auf und beantworten drei Fragen: Auf welchen wenigen einfachen Regeln steht das ganze Fach? Wie misst man einen Winkel oder einen Abstand zwischen Dingen, die sich nie berühren? Und woher kommen die Volumenformeln – einschließlich dieses einen Drittels?""", S,
['Einleitung', 'Punkt, Gerade, Ebene', 'Vier Regeln', 'Drei Arten, eine Ebene festzulegen', 'Die Karte', 'Zwei Geraden', 'Eine Gerade und eine Ebene', 'Zwei Ebenen', 'Ein Stellvertreter', 'In welche Richtung der Schnitt geht', 'Zwei Richtungen legen eine Ebene fest', 'Jede Gerade in der Ebene', 'Zwei reichen', 'Der Satz von den drei Loten', 'Zwei Ebenen im rechten Winkel', 'Dazwischen', 'Zwei Geraden', 'Eine Gerade und eine Ebene', 'Zwei Ebenen', 'Jeder Weg führt zu einem Dreieck', 'Der kürzeste Weg', 'Ein Punkt und eine Ebene', 'Jeder Punkt geht', 'Zwei windschiefe Geraden', 'Flächen, Kanten, Ecken', 'Prismen', 'Pyramiden', 'Nur fünf', 'Wie viel Platz', 'Würfel stapeln', 'Das eine Drittel', 'Eine ebene Figur drehen', 'Der Kegel', 'Die Kugel', 'Archimedes’ Lieblingsergebnis', 'Zurück zur flachen Seite', 'Eine Kette, keine Liste', 'Alles zusammen', 'Nächstes Mal'],
['Punkt, Gerade, Ebene: die drei Ideen, die die Mathematik nie definiert, und die vier Axiome, die sie beschreiben',
 'Warum ein dreibeiniger Hocker nie wackelt und ein vierbeiniger Stuhl schon',
 'Windschiefe Geraden: warum Autos auf einer Überführung nie mit denen darunter zusammenstoßen',
 'Parallele Geraden und Ebenen: such einen Stellvertreter; zwei sich schneidende Geraden legen eine Ebene fest',
 'Der Satz von den drei Loten: tausche eine Gerade im Raum gegen ihren Schatten',
 'Drei Arten von Winkeln (0 bis 90 Grad) und warum ein auf 120 Grad geöffneter Laptop einen 60-Grad-Winkel zwischen zwei Ebenen bildet',
 'Ein Abstand ist immer das Lot – sogar zwischen zwei windschiefen Geraden',
 'Prismen, Pyramiden und ein Raum, dessen Diagonale 13 ist (3² + 4² + 12² = 13²)',
 'Warum es nur fünf platonische Körper gibt (Euklid, Elemente, Buch XIII) – und man alle fünf als Würfel werfen kann',
 'Volumen: Einheitswürfel stapeln und warum eine Pyramide ein Drittel eines Prismas ist',
 'Die Cheops-Pyramide in Gizeh: etwa 2,6 Millionen Kubikmeter Stein, gegenüber fast 7,8 Millionen für einen Quader',
 'Zylinder, Kegel und Kugel – und Archimedes’ Lieblingsergebnis: Die Kugel ist zwei Drittel ihres Zylinders'],
['Jeder Winkel und jeder Abstand der Raumgeometrie endet in einem ebenen Dreieck. Was hat dich am meisten überrascht? Schreib es in die Kommentare.'],
'#mathematik #geometrie #raumgeometrie', 'Bilder: Wikipedia / Wikimedia Commons. Gemeinfrei: Cicero entdeckt das Grab des Archimedes, Benjamin West, 1797 (Yale University Art Gallery). Cheops-Pyramide: Foto von Nina, CC BY 2.5. Die Sprecherstimme ist synthetisch.'))

D['fr'] = ('Toute pyramide fait exactement ⅓ d’une boîte. Pourquoi ?', desc('fr',
"""Remplissez une pyramide d'eau et versez-la dans une boîte de même base et de même hauteur. Il en faut exactement trois, pour n'importe quelle pyramide et sa boîte. Et une boule qui tient pile dans un cylindre en occupe exactement les deux tiers. Pourquoi ces nombres ?

Pour le voir, on construit la géométrie dans l'espace à partir de zéro et on répond à trois questions : sur quelles quelques règles simples repose toute la matière ? Comment mesurer un angle, ou une distance, entre des objets qui ne se touchent jamais ? Et d'où viennent les formules de volume, y compris ce fameux tiers ?""", S,
['Introduction', 'Point, droite, plan', 'Quatre règles', 'Trois façons de fixer un plan', 'La carte', 'Deux droites', 'Une droite et un plan', 'Deux plans', 'Un remplaçant', 'Dans quel sens va la coupe', 'Deux directions verrouillent un plan', 'Toutes les droites du plan', 'Deux suffisent', 'Le théorème des trois perpendiculaires', 'Deux plans à angle droit', 'Entre les deux', 'Deux droites', 'Une droite et un plan', 'Deux plans', 'Tout chemin mène à un triangle', 'Le plus court chemin', 'Un point et un plan', "N'importe quel point convient", 'Deux droites non coplanaires', 'Faces, arêtes, sommets', 'Les prismes', 'Les pyramides', 'Seulement cinq', 'Combien de place', 'Empiler des cubes', 'Le tiers', 'Faire tourner une figure plane', 'Le cône', 'La sphère', "Le résultat préféré d'Archimède", 'Retour à la page plate', 'Une chaîne, pas une liste', 'Tout assembler', 'La prochaine fois'],
['Point, droite, plan : les trois idées que les maths ne définissent jamais, et les quatre axiomes qui les décrivent',
 "Pourquoi un tabouret à trois pieds ne boite jamais, alors qu'une chaise à quatre pieds peut boiter",
 'Droites non coplanaires : pourquoi les voitures sur un pont ne percutent jamais celles du dessous',
 'Droites et plans parallèles : trouvez un remplaçant ; deux droites sécantes verrouillent un plan',
 "Le théorème des trois perpendiculaires : échangez une droite de l'espace contre son ombre",
 "Trois sortes d'angles (de 0 à 90 degrés), et pourquoi un ordinateur portable ouvert à 120 degrés forme un angle de 60 degrés entre deux plans",
 'Une distance est toujours la perpendiculaire, même entre deux droites non coplanaires',
 'Prismes, pyramides, et une pièce dont la diagonale mesure 13 (3² + 4² + 12² = 13²)',
 "Pourquoi il n'existe que cinq solides de Platon (Euclide, Éléments, livre XIII), et on peut lancer les cinq comme des dés",
 "Le volume : empiler des cubes unité, et pourquoi une pyramide est le tiers d'un prisme",
 "La Grande Pyramide de Gizeh : environ 2,6 millions de mètres cubes de pierre, contre près de 7,8 millions pour une boîte",
 "Cylindre, cône et sphère, et le résultat préféré d'Archimède : une sphère vaut les deux tiers de son cylindre"],
["Chaque angle et chaque distance de la géométrie dans l'espace finit dans un triangle plat. Quelle partie vous a le plus surpris ? Dites-le en commentaire."],
'#mathématiques #géométrie #géométriedanslespace', "Images : Wikipédia / Wikimedia Commons. Domaine public : Cicéron découvrant la tombe d'Archimède, Benjamin West, 1797 (Yale University Art Gallery). Grande Pyramide de Gizeh : photo de Nina, CC BY 2.5. La voix de narration est synthétique."))

D['ar'] = ('كل هرم يساوي ⅓ صندوق بالضبط. لماذا؟', desc('ar',
"""املأ هرمًا بالماء واسكبه في صندوق له القاعدة نفسها والارتفاع نفسه. ستحتاج إلى ثلاث مرات بالضبط، مع أي هرم وصندوقه المطابق. والكرة التي تدخل تمامًا داخل أسطوانة تملأ ثلثيها بالضبط. لماذا هذه الأعداد؟

لنرى ذلك، نبني هندسة الفضاء من الصفر ونجيب عن ثلاثة أسئلة: ما القواعد البسيطة القليلة التي يقوم عليها هذا العلم كله؟ كيف نقيس زاوية أو مسافة بين أشياء لا تتلامس أبدًا؟ ومن أين تأتي صيغ الحجوم، ومنها ذلك الثلث؟""", S,
['مقدمة', 'النقطة والمستقيم والمستوى', 'أربع قواعد', 'ثلاث طرق لتثبيت مستوى', 'الخريطة', 'مستقيمان', 'مستقيم ومستوى', 'مستويان', 'بديل', 'في أي اتجاه يمضي القطع', 'اتجاهان يثبّتان مستوى', 'كل مستقيم في المستوى', 'اثنان يكفيان', 'مبرهنة الأعمدة الثلاثة', 'مستويان متعامدان', 'بين بين', 'مستقيمان', 'مستقيم ومستوى', 'مستويان', 'كل الطرق تؤدي إلى مثلث', 'أقصر طريق', 'نقطة ومستوى', 'أي نقطة تصلح', 'مستقيمان متخالفان', 'الأوجه والأحرف والرؤوس', 'المناشير', 'الأهرام', 'خمسة فقط', 'كم من الحيّز', 'رصّ المكعبات', 'الثلث', 'تدوير شكل مستوٍ', 'المخروط', 'الكرة', 'النتيجة المفضلة لأرخميدس', 'عودة إلى الصفحة المستوية', 'سلسلة لا قائمة', 'نجمع كل شيء', 'في المرة القادمة'],
['النقطة والمستقيم والمستوى: ثلاث أفكار لا تعرّفها الرياضيات، وأربع مسلّمات تصفها',
 'لماذا لا يهتز كرسي بثلاث أرجل أبدًا، بينما قد يهتز كرسي بأربع',
 'المستقيمات المتخالفة: لماذا لا تصطدم السيارات على الجسر بالسيارات تحته',
 'مبرهنة الأعمدة الثلاثة: استبدل مستقيمًا في الفضاء بظله',
 'ثلاثة أنواع من الزوايا، ولماذا يصنع حاسوب محمول مفتوح بزاوية 120 درجة زاوية 60 درجة بين مستويين',
 'المسافة هي دائمًا العمود، حتى بين مستقيمين متخالفين',
 'المناشير والأهرام وغرفة قطرها 13 ‏(3² + 4² + 12² = 13²)',
 'لماذا توجد خمسة مجسمات أفلاطونية فقط (إقليدس، الأصول، الكتاب الثالث عشر)',
 'الحجم: لماذا الهرم ثلث المنشور؛ والهرم الأكبر في الجيزة: نحو 2.6 مليون متر مكعب مقابل 7.8 مليون للصندوق',
 'الأسطوانة والمخروط والكرة، ونتيجة أرخميدس المفضلة: الكرة ثلثا أسطوانتها'],
['كل زاوية وكل مسافة في هندسة الفضاء تنتهي داخل مثلث مستوٍ. أي جزء فاجأك أكثر؟ أخبرني في التعليقات.'],
'#رياضيات #هندسة #math', 'الصور: ويكيبيديا / ويكيميديا كومنز. ملكية عامة: شيشرون يكتشف قبر أرخميدس، بنجامين وست، 1797 (معرض جامعة ييل للفنون). الهرم الأكبر في الجيزة: تصوير Nina، CC BY 2.5. صوت الراوي صوت اصطناعي.'))

D['vi'] = ('Mọi hình chóp đều đúng bằng ⅓ cái hộp. Vì sao?', desc('vi',
"""Đổ đầy nước vào một hình chóp rồi rót sang cái hộp cùng đáy, cùng chiều cao. Phải rót đúng ba lần — với mọi hình chóp và cái hộp tương ứng. Còn quả cầu vừa khít trong hình trụ thì chiếm đúng hai phần ba hình trụ. Vì sao lại là những con số đó?

Để thấy được, chúng ta xây hình học không gian từ con số 0 và trả lời ba câu hỏi: cả môn học dựa trên vài quy tắc đơn giản nào? Đo góc, hay khoảng cách, giữa những thứ không bao giờ chạm nhau bằng cách nào? Và các công thức thể tích từ đâu mà ra — kể cả con số một phần ba ấy?""", S,
['Mở đầu', 'Điểm, đường thẳng, mặt phẳng', 'Bốn quy tắc', 'Ba cách xác định một mặt phẳng', 'Tấm bản đồ', 'Hai đường thẳng', 'Đường thẳng và mặt phẳng', 'Hai mặt phẳng', 'Một vật thay thế', 'Vết cắt đi hướng nào', 'Hai hướng khóa một mặt phẳng', 'Mọi đường thẳng trong mặt phẳng', 'Hai là đủ', 'Định lý ba đường vuông góc', 'Hai mặt phẳng vuông góc', 'Ở giữa', 'Hai đường thẳng', 'Đường thẳng và mặt phẳng', 'Hai mặt phẳng', 'Mọi con đường dẫn tới tam giác', 'Đường ngắn nhất', 'Một điểm và một mặt phẳng', 'Điểm nào cũng được', 'Hai đường thẳng chéo nhau', 'Mặt, cạnh, đỉnh', 'Hình lăng trụ', 'Hình chóp', 'Chỉ có năm', 'Chứa được bao nhiêu', 'Xếp khối lập phương', 'Một phần ba', 'Xoay một hình phẳng', 'Hình nón', 'Hình cầu', 'Kết quả Archimedes yêu thích', 'Trở về trang giấy phẳng', 'Một chuỗi, không phải danh sách', 'Ghép lại tất cả', 'Lần sau'],
['Điểm, đường thẳng, mặt phẳng: ba khái niệm toán học không bao giờ định nghĩa, và bốn tiên đề mô tả chúng',
 'Vì sao ghế ba chân không bao giờ cập kênh, còn ghế bốn chân thì có thể',
 'Hai đường thẳng chéo nhau: vì sao xe trên cầu vượt không bao giờ đâm xe bên dưới',
 'Đường thẳng và mặt phẳng song song: tìm vật thay thế; hai đường cắt nhau khóa một mặt phẳng',
 'Định lý ba đường vuông góc: đổi một đường trong không gian lấy cái bóng của nó',
 'Ba loại góc (từ 0 đến 90 độ), và vì sao laptop mở 120 độ lại tạo góc 60 độ giữa hai mặt phẳng',
 'Khoảng cách luôn là đường vuông góc, kể cả giữa hai đường thẳng chéo nhau',
 'Lăng trụ, hình chóp, và căn phòng có đường chéo bằng 13 (3² + 4² + 12² = 13²)',
 'Vì sao chỉ có năm khối đa diện đều (Euclid, Cơ sở, Quyển XIII), và có thể tung cả năm như xúc xắc',
 'Thể tích: xếp các khối lập phương đơn vị, và vì sao hình chóp bằng một phần ba lăng trụ',
 'Đại kim tự tháp Giza: khoảng 2,6 triệu mét khối đá, so với gần 7,8 triệu nếu là cái hộp',
 'Hình trụ, hình nón, hình cầu, và kết quả Archimedes yêu thích: hình cầu bằng hai phần ba hình trụ của nó'],
['Mọi góc và mọi khoảng cách trong hình học không gian đều kết thúc trong một tam giác phẳng. Phần nào làm bạn bất ngờ nhất? Bình luận cho mình biết nhé.'],
'#toánhọc #hìnhhọc #hìnhhọckhônggian', 'Hình ảnh: Wikipedia / Wikimedia Commons. Phạm vi công cộng: Cicero Discovering the Tomb of Archimedes, Benjamin West, 1797 (Yale University Art Gallery). Đại kim tự tháp Giza: ảnh của Nina, CC BY 2.5. Giọng đọc là giọng tổng hợp.'))

D['tr'] = ('Her Piramit Bir Kutunun Tam ⅓’ü. Neden?', desc('tr',
"""Bir piramidi suyla doldurup aynı tabana ve aynı yüksekliğe sahip bir kutuya dökün. Tam üç kez gerekir; her piramit ve ona uyan kutu için. Bir silindirin içine tam oturan bir küre de silindirin tam üçte ikisini doldurur. Neden bu sayılar?

Bunu görmek için uzay geometrisini sıfırdan kuruyor ve üç soruyu cevaplıyoruz: Bütün konu hangi birkaç basit kurala dayanıyor? Hiç birbirine değmeyen şeyler arasındaki açıyı ya da uzaklığı nasıl ölçersiniz? Ve hacim formülleri, o üçte bir de dahil, nereden geliyor?""", S,
['Giriş', 'Nokta, doğru, düzlem', 'Dört kural', 'Bir düzlemi belirlemenin üç yolu', 'Harita', 'İki doğru', 'Bir doğru ve bir düzlem', 'İki düzlem', 'Bir vekil', 'Kesik hangi yöne gider', 'İki yön bir düzlemi kilitler', 'Düzlemdeki her doğru', 'İkisi yeter', 'Üç dikme teoremi', 'Dik açılı iki düzlem', 'Arada', 'İki doğru', 'Bir doğru ve bir düzlem', 'İki düzlem', 'Her yol bir üçgene çıkar', 'En kısa yol', 'Bir nokta ve bir düzlem', 'Herhangi bir nokta olur', 'Aykırı iki doğru', 'Yüzler, ayrıtlar, köşeler', 'Prizmalar', 'Piramitler', 'Sadece beş', 'Ne kadar yer', 'Küp dizmek', 'Üçte bir', 'Düz bir şekli döndürmek', 'Koni', 'Küre', 'Arşimet’in favorisi', 'Düz sayfaya dönüş', 'Liste değil, zincir', 'Hepsini birleştirmek', 'Bir dahaki sefere'],
['Nokta, doğru, düzlem: matematiğin hiç tanımlamadığı üç fikir ve onları anlatan dört aksiyom',
 'Üç ayaklı tabure neden hiç sallanmaz, dört ayaklı sandalye ise sallanabilir',
 'Aykırı doğrular: üst geçitteki arabalar neden alttakilerle hiç çarpışmaz',
 'Paralel doğrular ve düzlemler: bir vekil bulun; kesişen iki doğru bir düzlemi kilitler',
 'Üç dikme teoremi: uzaydaki bir doğruyu gölgesiyle değiştirin',
 "Üç tür açı (0'dan 90 dereceye) ve 120 derece açılmış bir dizüstü bilgisayarın iki düzlem arasında neden 60 derecelik açı yaptığı",
 'Uzaklık her zaman dikmedir, aykırı iki doğru arasında bile',
 'Prizmalar, piramitler ve köşegeni 13 olan bir oda (3² + 4² + 12² = 13²)',
 'Neden yalnızca beş Platon cismi var (Öklid, Elemanlar, XIII. kitap) ve beşini de zar gibi atabilirsiniz',
 'Hacim: birim küpleri dizmek ve piramidin neden prizmanın üçte biri olduğu',
 'Gize Büyük Piramidi: yaklaşık 2,6 milyon metreküp taş; aynı ölçüde bir kutu için ise yaklaşık 7,8 milyon',
 "Silindir, koni ve küre ile Arşimet'in en sevdiği sonuç: küre, silindirinin üçte ikisidir"],
['Uzay geometrisindeki her açı ve her uzaklık düz bir üçgenin içinde biter. Sizi en çok hangi kısım şaşırttı? Yorumlarda yazın.'],
'#matematik #geometri #uzaygeometrisi', 'Görseller: Wikipedia / Wikimedia Commons. Kamu malı: Cicero Discovering the Tomb of Archimedes, Benjamin West, 1797 (Yale University Art Gallery). Gize Büyük Piramidi: fotoğraf Nina, CC BY 2.5. Anlatıcı sesi sentetiktir.'))

D['ko'] = ('모든 각뿔은 정확히 상자의 ⅓이다. 왜일까?', desc('ko',
"""각뿔에 물을 가득 채워 밑면과 높이가 같은 상자에 부어 보세요. 정확히 세 번이 필요합니다. 어떤 각뿔이든, 그에 맞는 상자라면 언제나요. 그리고 원기둥에 꼭 맞게 들어가는 공은 원기둥의 정확히 3분의 2를 채웁니다. 왜 하필 이런 수일까요?

이를 보기 위해 공간도형을 처음부터 쌓아 올리며 세 가지 질문에 답합니다. 이 과목 전체는 어떤 몇 가지 간단한 규칙 위에 서 있을까? 서로 닿지 않는 것들 사이의 각도나 거리는 어떻게 잴까? 그리고 부피 공식은, 그 3분의 1까지 포함해서, 어디서 왔을까?""", S,
['들어가며', '점, 직선, 평면', '네 가지 규칙', '평면을 정하는 세 가지 방법', '지도', '두 직선', '직선과 평면', '두 평면', '대역 찾기', '자르는 방향', '두 방향이 평면을 고정한다', '평면 위의 모든 직선', '두 개면 충분하다', '삼수선 정리', '수직인 두 평면', '그 사이', '두 직선', '직선과 평면', '두 평면', '모든 길은 삼각형으로', '가장 짧은 길', '점과 평면', '어느 점이든 괜찮다', '꼬인 위치의 두 직선', '면, 모서리, 꼭짓점', '각기둥', '각뿔', '단 다섯 개', '얼마나 들어갈까', '정육면체 쌓기', '3분의 1', '평면도형 돌리기', '원뿔', '구', '아르키메데스가 가장 아낀 결과', '다시 평평한 종이로', '목록이 아니라 사슬', '정리하며', '다음 영상'],
['점, 직선, 평면: 수학이 정의하지 않는 세 개념과 이를 설명하는 네 공리',
 '다리가 셋인 의자는 절대 흔들리지 않는데 다리가 넷인 의자는 왜 흔들릴 수 있을까',
 '꼬인 위치: 고가도로 위의 차는 왜 아래 차와 절대 부딪히지 않을까',
 '평행한 직선과 평면: 대역을 찾아라, 만나는 두 직선이 평면을 고정한다',
 '삼수선 정리: 공간 속 직선을 그 그림자로 바꿔 보기',
 '세 종류의 각 (0도에서 90도), 그리고 120도로 펼친 노트북이 두 평면 사이에 60도를 만드는 이유',
 '거리는 언제나 수선 — 꼬인 위치의 두 직선 사이에서도',
 '각기둥, 각뿔, 그리고 대각선이 13인 방 (3² + 4² + 12² = 13²)',
 '정다면체는 왜 다섯 개뿐일까 (유클리드 『원론』 제13권) — 다섯 개 모두 주사위처럼 굴릴 수 있다',
 '부피: 단위 정육면체 쌓기, 그리고 각뿔이 각기둥의 3분의 1인 이유',
 '기자의 대피라미드: 약 260만 세제곱미터의 돌, 같은 크기의 상자라면 약 780만',
 '원기둥, 원뿔, 구 — 그리고 아르키메데스가 가장 아낀 결과: 구는 원기둥의 3분의 2'],
['공간도형의 모든 각과 거리는 결국 평면 위의 삼각형 안에서 끝납니다. 어떤 부분이 가장 놀라웠나요? 댓글로 알려 주세요.'],
'#수학 #기하 #공간도형', '이미지: 위키백과 / 위키미디어 공용. 퍼블릭 도메인: 「아르키메데스의 무덤을 발견한 키케로」, 벤저민 웨스트, 1797 (예일 대학교 미술관). 기자의 대피라미드: Nina 사진, CC BY 2.5. 내레이션 음성은 합성 음성입니다.'))
sys.exit(write('en/solid-geometry', D))
