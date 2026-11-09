from gen import *
# Theo bản ĐANG CHẠY trên YouTube (H2_mOmoOx6Q, tải lại 2026-10-27 — bản 2 không intro; đọc qua API cùng ngày).
S = '0:00 0:55 2:46 3:35 4:37 5:54 7:12 8:26 9:41'.split()
D = {}
D['es'] = ('¿Por qué no se puede dividir entre cero? No es solo una regla', desc('es',
"""Escribe uno entre cero en cualquier calculadora y se niega. Todas las demás divisiones tienen respuesta. Esta no, y no es una regla que alguien inventó: es un agujero en la propia aritmética, y en casi 1.400 años nadie ha logrado taparlo.

En este video: por qué costó tanto aceptar el cero como número, por qué dividir entre cero no tiene sentido se mire como se mire, qué hace de verdad tu computadora cuando se lo pides igualmente, y por qué ese único agujero es la mejor prueba de que las matemáticas son un sistema y no un montón de reglas arbitrarias.""", S,
['Introducción', 'Por qué el cero llegó tan tarde', 'Los dos trabajos del cero', 'Todo funciona, excepto la división', 'Qué es realmente dividir', 'Acercándose a cero', '¿Por qué no llamarlo simplemente infinito?', 'Qué hace tu computadora', 'Mirando atrás'],
['Por qué los romanos nunca necesitaron el cero, y por qué 305 sí lo necesita',
 'Las reglas de Brahmagupta para el cero (628) y el «khahara» de Bhaskara',
 'Por qué 12 ÷ 0 no tiene respuesta, y 0 ÷ 0 tiene demasiadas',
 'Límites: por qué 1/x se dispara hacia +∞ y −∞ a la vez',
 'Por qué 1 ÷ 0 = ∞ lleva a 1 = 2, y la esfera de Riemann, donde sí está permitido',
 'Qué hace tu computadora: Infinity, −Infinity, +0, −0 y NaN'],
['Video anterior: La pregunta imposible que dio origen al cálculo, donde 0 ÷ 0 aún obtiene una respuesta exacta.'],
'#matemáticas #dividirentrecero #cero', ''))

D['pt-BR'] = ('Por que não dá para dividir por zero? Não é só uma regra', desc('pt-BR',
"""Digite um dividido por zero em qualquer calculadora e ela se recusa. Toda outra divisão tem resposta. Esta não, e não é uma regra que alguém inventou: é um buraco na própria aritmética, e em quase 1.400 anos ninguém conseguiu tapá-lo.

Neste vídeo: por que foi tão difícil aceitar o zero como número, por que dividir por zero não faz sentido de nenhum ângulo, o que o seu computador realmente faz quando você pede mesmo assim, e por que esse único buraco é a melhor prova de que a matemática é um sistema, não um monte de regras arbitrárias.""", S,
['Introdução', 'Por que o zero chegou tão tarde', 'Os dois trabalhos do zero', 'Tudo funciona, menos a divisão', 'O que dividir realmente é', 'Chegando perto do zero', 'Por que não chamar de infinito?', 'O que o seu computador faz', 'Olhando para trás'],
['Por que os romanos nunca precisaram do zero, e por que 305 precisa',
 'As regras de Brahmagupta para o zero (628) e o "khahara" de Bhaskara',
 'Por que 12 ÷ 0 não tem resposta, e 0 ÷ 0 tem respostas demais',
 'Limites: por que 1/x dispara para +∞ e −∞ ao mesmo tempo',
 'Por que 1 ÷ 0 = ∞ leva a 1 = 2, e a esfera de Riemann, onde isso é permitido',
 'O que o seu computador faz: Infinity, −Infinity, +0, −0 e NaN'],
['Vídeo anterior: A pergunta impossível que criou o cálculo, onde 0 ÷ 0 ainda ganha uma resposta exata.'],
'#matemática #divisãoporzero #zero', ''))

D['hi'] = ('शून्य से भाग क्यों नहीं दे सकते? यह सिर्फ़ एक नियम नहीं है', desc('hi',
"""किसी भी कैलकुलेटर में एक को शून्य से भाग दीजिए, वह मना कर देता है। बाकी हर भाग का एक उत्तर होता है। इसका नहीं, और यह किसी का बनाया नियम नहीं है: यह खुद अंकगणित में एक छेद है, और लगभग 1,400 सालों में कोई इसे भर नहीं पाया।

इस वीडियो में: शून्य को संख्या मानना इतना कठिन क्यों था, शून्य से भाग देना किसी भी नज़र से अर्थहीन क्यों है, जब आप फिर भी कहते हैं तो आपका कंप्यूटर असल में क्या करता है, और यह एक छेद इस बात का सबसे अच्छा सबूत क्यों है कि गणित एक व्यवस्था है, मनमाने नियमों का ढेर नहीं।""", S,
['परिचय', 'शून्य इतनी देर से क्यों आया', 'शून्य के दो काम', 'सब कुछ चलता है, भाग को छोड़कर', 'भाग असल में क्या है', 'शून्य के और पास', 'इसे बस अनंत क्यों न कह दें?', 'आपका कंप्यूटर क्या करता है', 'पीछे मुड़कर'],
['रोमनों को कभी शून्य की ज़रूरत क्यों नहीं पड़ी, और 305 को क्यों पड़ती है',
 'ब्रह्मगुप्त के शून्य के नियम (628) और भास्कर का "खहर"',
 '12 ÷ 0 का कोई उत्तर क्यों नहीं, और 0 ÷ 0 के बहुत सारे क्यों',
 'लिमिट: 1/x एक साथ +∞ और −∞ की ओर क्यों भागता है',
 '1 ÷ 0 = ∞ मानने से 1 = 2 क्यों हो जाता है, और रीमान स्फ़ीयर, जहाँ इसकी अनुमति है',
 'आपका कंप्यूटर क्या करता है: Infinity, −Infinity, +0, −0 और NaN'],
['पिछला वीडियो: वह असंभव सवाल जिससे कैलकुलस का जन्म हुआ, जहाँ 0 ÷ 0 को भी एक सटीक उत्तर मिलता है।'],
'#गणित #शून्य #dividebyzero', ''))

D['id'] = ('Kenapa Tidak Bisa Membagi dengan Nol? Bukan Sekadar Aturan', desc('id',
"""Ketik satu dibagi nol di kalkulator mana pun, dan kalkulator itu menolak. Setiap pembagian lain punya jawaban. Yang ini tidak, dan ini bukan aturan buatan seseorang: ini lubang di dalam aritmetika itu sendiri, dan selama hampir 1.400 tahun tidak ada yang berhasil menambalnya.

Di video ini: kenapa nol begitu sulit diterima sebagai bilangan, kenapa membagi dengan nol tidak masuk akal dari sudut mana pun, apa yang sebenarnya dilakukan komputermu kalau kamu tetap memintanya, dan kenapa satu lubang itu adalah bukti terbaik bahwa matematika adalah sebuah sistem, bukan tumpukan aturan sembarangan.""", S,
['Pendahuluan', 'Kenapa nol datang begitu terlambat', 'Dua tugas nol', 'Semua berjalan, kecuali pembagian', 'Apa sebenarnya pembagian itu', 'Makin dekat ke nol', 'Kenapa tidak disebut tak hingga saja?', 'Apa yang dilakukan komputermu', 'Menengok ke belakang'],
['Kenapa bangsa Romawi tidak pernah butuh nol, dan kenapa 305 butuh',
 'Aturan Brahmagupta untuk nol (628) dan "khahara" Bhaskara',
 'Kenapa 12 ÷ 0 tidak punya jawaban, dan 0 ÷ 0 punya terlalu banyak',
 'Limit: kenapa 1/x melesat ke +∞ dan −∞ sekaligus',
 'Kenapa 1 ÷ 0 = ∞ membuat 1 = 2, dan bola Riemann, tempat hal itu diizinkan',
 'Apa yang dilakukan komputermu: Infinity, −Infinity, +0, −0, dan NaN'],
['Video sebelumnya: Pertanyaan Mustahil yang Melahirkan Kalkulus, saat 0 ÷ 0 tetap mendapat jawaban yang tepat.'],
'#matematika #pembagiandengannol #nol', ''))

D['de'] = ('Warum kann man nicht durch null teilen? Es ist nicht nur eine Regel', desc('de',
"""Tipp eins geteilt durch null in irgendeinen Taschenrechner, und er verweigert. Jede andere Division hat eine Antwort. Diese nicht, und das ist keine Regel, die sich jemand ausgedacht hat: Es ist ein Loch in der Arithmetik selbst, und in fast 1.400 Jahren hat es niemand geschafft, es zu stopfen.

In diesem Video: warum es so schwer war, die Null überhaupt als Zahl zu akzeptieren, warum Teilen durch null von keiner Seite aus Sinn ergibt, was dein Computer wirklich tut, wenn du es trotzdem verlangst, und warum gerade dieses eine Loch der beste Beweis dafür ist, dass Mathematik ein System ist und kein Haufen willkürlicher Regeln.""", S,
['Einleitung', 'Warum die Null so spät kam', 'Die zwei Aufgaben der Null', 'Alles funktioniert, außer der Division', 'Was Teilen wirklich ist', 'Immer näher an die Null', 'Warum nicht einfach unendlich?', 'Was dein Computer tut', 'Rückblick'],
['Warum die Römer nie eine Null brauchten und warum 305 eine braucht',
 'Brahmaguptas Regeln für die Null (628) und Bhaskaras „khahara“',
 'Warum 12 ÷ 0 keine Antwort hat und 0 ÷ 0 zu viele',
 'Grenzwerte: warum 1/x gleichzeitig nach +∞ und −∞ davonläuft',
 'Warum 1 ÷ 0 = ∞ zu 1 = 2 führt, und die Riemannsche Zahlenkugel, auf der es erlaubt ist',
 'Was dein Computer tut: Infinity, −Infinity, +0, −0 und NaN'],
['Voriges Video: Die unmögliche Frage, aus der die Infinitesimalrechnung entstand – dort bekommt 0 ÷ 0 sogar eine exakte Antwort.'],
'#Mathematik #DurchNullTeilen #Null', ''))

D['fr'] = ('Pourquoi ne peut-on pas diviser par zéro ? Ce n’est pas qu’une règle', desc('fr',
"""Tapez un divisé par zéro sur n’importe quelle calculatrice : elle refuse. Toutes les autres divisions ont une réponse. Celle-ci non, et ce n’est pas une règle inventée par quelqu’un : c’est un trou dans l’arithmétique elle-même, et en près de 1 400 ans personne n’a réussi à le boucher.

Dans cette vidéo : pourquoi il a été si difficile d’accepter zéro comme un nombre, pourquoi diviser par zéro n’a de sens sous aucun angle, ce que fait vraiment votre ordinateur quand vous le lui demandez quand même, et pourquoi ce trou unique est la meilleure preuve que les mathématiques sont un système, pas un tas de règles arbitraires.""", S,
['Introduction', 'Pourquoi le zéro est arrivé si tard', 'Les deux rôles du zéro', 'Tout marche, sauf la division', 'Ce qu’est vraiment une division', 'S’approcher de zéro', 'Pourquoi ne pas simplement dire l’infini ?', 'Ce que fait votre ordinateur', 'Un regard en arrière'],
['Pourquoi les Romains n’ont jamais eu besoin du zéro, et pourquoi 305 en a besoin',
 'Les règles de Brahmagupta pour le zéro (628) et le « khahara » de Bhaskara',
 'Pourquoi 12 ÷ 0 n’a pas de réponse, et 0 ÷ 0 en a trop',
 'Les limites : pourquoi 1/x file à la fois vers +∞ et −∞',
 'Pourquoi 1 ÷ 0 = ∞ mène à 1 = 2, et la sphère de Riemann, où c’est permis',
 'Ce que fait votre ordinateur : Infinity, −Infinity, +0, −0 et NaN'],
['Vidéo précédente : La question impossible qui a fait naître le calcul infinitésimal, où 0 ÷ 0 obtient malgré tout une réponse exacte.'],
'#mathématiques #divisionparzéro #zéro', ''))

D['ar'] = ('لماذا لا يمكنك القسمة على صفر؟ إنها ليست مجرد قاعدة', desc('ar',
"""اكتب واحدًا مقسومًا على صفر في أي آلة حاسبة، وسترفض. كل قسمة أخرى لها جواب. هذه لا، وهي ليست قاعدة اخترعها أحد: إنها ثقب في الحساب نفسه، ولم ينجح أحد في سدّه منذ نحو 1400 عام.

في هذا الفيديو: لماذا كان قبول الصفر كعدد أمرًا صعبًا إلى هذا الحد، ولماذا لا معنى للقسمة على صفر من أي زاوية نظرت إليها، وماذا يفعل حاسوبك فعلًا عندما تطلبها منه رغم ذلك، ولماذا يُعدّ هذا الثقب الوحيد أفضل دليل على أن الرياضيات نظام، لا كومة من القواعد الاعتباطية.""", S,
['مقدمة', 'لماذا تأخر الصفر كثيرًا', 'وظيفتا الصفر', 'كل شيء يعمل، إلا القسمة', 'ما هي القسمة حقًا', 'الاقتراب من الصفر', 'لماذا لا نسميه اللانهاية ببساطة؟', 'ماذا يفعل حاسوبك', 'نظرة إلى الوراء'],
['لماذا لم يحتج الرومان إلى الصفر أبدًا، ولماذا يحتاجه العدد 305',
 'قواعد براهماغوبتا للصفر (628) و"خاهارا" عند بهاسكارا',
 'لماذا ليس لـ 12 ÷ 0 جواب، ولـ 0 ÷ 0 أجوبة كثيرة جدًا',
 'النهايات: لماذا تنطلق 1/x نحو +∞ و−∞ في الوقت نفسه',
 'لماذا يؤدي 1 ÷ 0 = ∞ إلى 1 = 2، وكرة ريمان حيث يُسمح بذلك',
 'ماذا يفعل حاسوبك: Infinity و−Infinity و+0 و−0 وNaN'],
['الفيديو السابق: السؤال المستحيل الذي أنجب التفاضل والتكامل، حيث تحصل 0 ÷ 0 مع ذلك على جواب دقيق.'],
'#رياضيات #القسمة_على_صفر #الصفر', ''))

D['vi'] = ('Vì sao không thể chia cho 0? Không chỉ là một quy tắc', desc('vi',
"""Gõ một chia cho không vào bất kỳ máy tính nào, nó sẽ từ chối. Mọi phép chia khác đều có đáp án. Phép này thì không, và đó không phải quy tắc ai đó đặt ra: đó là một lỗ thủng ngay trong số học, và gần 1.400 năm qua chưa ai vá được.

Trong video này: vì sao con số 0 lại khó được chấp nhận là một con số đến vậy, vì sao chia cho 0 vô nghĩa dù nhìn từ phía nào, máy tính của bạn thực sự làm gì khi bạn vẫn cứ bắt nó chia, và vì sao chính lỗ thủng đó là bằng chứng tốt nhất rằng toán học là một hệ thống, không phải một đống quy tắc tuỳ tiện.""", S,
['Mở đầu', 'Vì sao số 0 đến muộn thế', 'Hai việc của số 0', 'Mọi thứ đều chạy, trừ phép chia', 'Phép chia thực ra là gì', 'Tiến sát về 0', 'Sao không gọi luôn là vô cực?', 'Máy tính của bạn làm gì', 'Nhìn lại'],
['Vì sao người La Mã chưa bao giờ cần số 0, còn số 305 thì cần',
 'Các quy tắc về số 0 của Brahmagupta (năm 628) và "khahara" của Bhaskara',
 'Vì sao 12 ÷ 0 không có đáp án, còn 0 ÷ 0 thì có quá nhiều',
 'Giới hạn: vì sao 1/x lao về +∞ và −∞ cùng một lúc',
 'Vì sao 1 ÷ 0 = ∞ dẫn tới 1 = 2, và mặt cầu Riemann, nơi điều đó được phép',
 'Máy tính của bạn làm gì: Infinity, −Infinity, +0, −0 và NaN'],
['Video trước: Câu hỏi bất khả thi đã khai sinh ra giải tích, nơi 0 ÷ 0 vẫn có một đáp án chính xác.'],
'#toánhọc #chiachokhông #sốkhông', ''))

D['tr'] = ('Neden Sıfıra Bölünmez? Bu Sadece Bir Kural Değil', desc('tr',
"""Herhangi bir hesap makinesine bir bölü sıfır yazın, reddeder. Diğer her bölmenin bir cevabı vardır. Bunun yoktur ve bu birinin uydurduğu bir kural değildir: aritmetiğin kendisinde bir deliktir ve yaklaşık 1.400 yıldır kimse onu kapatamadı.

Bu videoda: sıfırı bir sayı olarak kabul etmek neden bu kadar zordu, sıfıra bölmek neden hangi açıdan bakarsanız bakın anlamsız, yine de isterseniz bilgisayarınız aslında ne yapar ve neden bu tek delik, matematiğin keyfi kurallar yığını değil bir sistem olduğunun en iyi kanıtıdır.""", S,
['Giriş', 'Sıfır neden bu kadar geç geldi', 'Sıfırın iki görevi', 'Her şey çalışıyor, bölme hariç', 'Bölme aslında nedir', 'Sıfıra yaklaşmak', 'Neden sadece sonsuz demiyoruz?', 'Bilgisayarınız ne yapar', 'Geriye bakış'],
['Romalılar neden hiç sıfıra ihtiyaç duymadı ve 305 neden duyar',
 'Brahmagupta’nın sıfır kuralları (628) ve Bhaskara’nın “khahara”sı',
 '12 ÷ 0’ın neden cevabı yok, 0 ÷ 0’ın ise neden çok fazla cevabı var',
 'Limitler: 1/x neden aynı anda +∞ ve −∞’a kaçar',
 '1 ÷ 0 = ∞ neden 1 = 2’ye götürür ve buna izin verilen Riemann küresi',
 'Bilgisayarınız ne yapar: Infinity, −Infinity, +0, −0 ve NaN'],
['Önceki video: Kalkülüsü Doğuran İmkânsız Soru; orada 0 ÷ 0 bile kesin bir cevap alıyor.'],
'#matematik #sıfırabölme #sıfır', ''))

D['ko'] = ('왜 0으로 나눌 수 없을까? 단순한 규칙이 아니다', desc('ko',
"""아무 계산기에나 1 나누기 0을 입력해 보세요. 계산기는 거부합니다. 다른 모든 나눗셈에는 답이 있습니다. 이것만은 없습니다. 그리고 이건 누군가 지어낸 규칙이 아닙니다. 산수 그 자체에 난 구멍이고, 거의 1,400년 동안 아무도 메우지 못했습니다.

이 영상에서는 0을 수로 받아들이기가 왜 그렇게 어려웠는지, 0으로 나누기가 어느 쪽에서 보아도 왜 말이 안 되는지, 그래도 시키면 컴퓨터는 실제로 무엇을 하는지, 그리고 왜 이 구멍 하나가 수학이 제멋대로인 규칙 더미가 아니라 하나의 체계라는 가장 좋은 증거인지 이야기합니다.""", S,
['들어가며', '0은 왜 그렇게 늦게 왔을까', '0이 하는 두 가지 일', '나눗셈만 빼고 모두 된다', '나눗셈이란 정말 무엇인가', '0에 가까이', '그냥 무한대라고 하면 안 될까?', '컴퓨터는 무엇을 하나', '돌아보며'],
['로마인에게 0이 필요 없었던 이유, 그리고 305에는 필요한 이유',
 '브라마굽타의 0 규칙(628년)과 바스카라의 "카하라"',
 '12 ÷ 0에는 답이 없고, 0 ÷ 0에는 답이 너무 많은 이유',
 '극한: 1/x가 왜 +∞와 −∞로 동시에 달아나는가',
 '1 ÷ 0 = ∞이라 하면 왜 1 = 2가 되는가, 그리고 그것이 허용되는 리만 구',
 '컴퓨터가 하는 일: Infinity, −Infinity, +0, −0, NaN'],
['이전 영상: 미적분을 탄생시킨 불가능한 질문. 그곳에서는 0 ÷ 0도 정확한 답을 얻습니다.'],
'#수학 #0으로나누기 #영', ''))
sys.exit(write('en/zero-div', D))
