from gen import *
# Theo bản ĐANG CHẠY trên YouTube (wJjeuWERQbE, đọc qua API 2026-11-03): title "How Can the Square Root of −1 Actually Make Sense?".
# Có phụ đề dịch thật (tools/i18n/captions.py), nên dòng đầu báo bật CC thay cho câu "tự động dịch" của gen.C.
S = '0:00 0:32 1:03 1:44 2:30 3:24 4:24 4:54 5:51 6:31 7:51'.split()
LINK = 'https://www.youtube.com/@99fromscartch?sub_confirmation=1'
def body(code, intro, sub, names, bullets, tags):
    c = C[code]
    return '\n\n'.join([intro.strip(), sub, c['ch'] + '\n' + chapters(S, names),
                        c['inv'] + '\n' + '\n'.join('• ' + b for b in bullets), tags + ' #noAI', c['outro'] + '\n' + LINK])
D = {}
D['es'] = ('¿Cómo puede tener sentido la raíz cuadrada de −1?', body('es',
"""¿Qué número está justo a medio camino entre 1 y −1? En una línea recta es 0. Pero hay otra forma de llegar, y a mitad de ese camino hay un número que no está en la línea.

Este video explica los números imaginarios desde cero. Solo necesitas saber multiplicar. Veremos por qué ningún número común al cuadrado da −1, seguiremos la ecuación del siglo XVI que obligó a los matemáticos a usar √−1 de todos modos, y descubriremos qué es i en realidad: un cuarto de vuelta.""",
'Video en inglés con subtítulos en español: activa los subtítulos (CC).',
['Introducción', 'Multiplicar es un movimiento', 'La pregunta sin respuesta', 'Una respuesta de cuatro', 'Seguir adelante sin miedo', 'Salir de la línea', 'Cuatro giros y de vuelta a casa', 'Números en una hoja plana', 'Lo que Bombelli encontró de verdad', 'Las ondas son flechas que giran', 'Juntándolo todo'],
['Por qué multiplicar es un movimiento en la recta numérica, y −1 es una inversión', 'Por qué x³ = 15x + 4 necesita √−121 para llegar a la respuesta 4', 'Por qué i es un cuarto de vuelta, y qué hay a medio camino entre 1 y −1', 'Por qué i¹⁰⁰ = 1', 'La regla de los números complejos: las longitudes se multiplican, los ángulos se suman', 'Por qué dos ondas de 3 V y 4 V, separadas un cuarto de ciclo, alcanzan 5 V y no 7 V'],
'#matemáticas #númerosimaginarios #númeroscomplejos'))
D['pt-BR'] = ('Como a raiz quadrada de −1 pode fazer sentido?', body('pt-BR',
"""Qual número está exatamente no meio do caminho entre 1 e −1? Em uma linha reta, é 0. Mas existe outro jeito de chegar lá, e na metade desse caminho há um número que não está na linha.

Este vídeo explica os números imaginários do zero. Você só precisa saber multiplicar. Vamos ver por que nenhum número comum ao quadrado dá −1, seguir a equação do século XVI que obrigou os matemáticos a usar √−1 mesmo assim, e descobrir o que i realmente é: um quarto de volta.""",
'Vídeo em inglês com legendas em português: ative as legendas (CC).',
['Introdução', 'Multiplicar é um movimento', 'A pergunta sem resposta', 'Uma resposta igual a quatro', 'Seguindo em frente mesmo assim', 'Saindo da reta', 'Quatro giros e de volta ao início', 'Números em uma folha plana', 'O que Bombelli realmente encontrou', 'Ondas são setas girando', 'Juntando tudo'],
['Por que multiplicar é um movimento na reta numérica, e −1 é uma inversão', 'Por que x³ = 15x + 4 precisa de √−121 para chegar à resposta 4', 'Por que i é um quarto de volta, e o que fica no meio entre 1 e −1', 'Por que i¹⁰⁰ = 1', 'A regra dos números complexos: comprimentos se multiplicam, ângulos se somam', 'Por que ondas de 3 V e 4 V, defasadas em um quarto de ciclo, chegam a 5 V e não a 7 V'],
'#matemática #númerosimaginários #númeroscomplexos'))
D['hi'] = ('−1 का वर्गमूल आखिर समझ में कैसे आ सकता है?', body('hi',
"""1 और −1 के ठीक बीच में कौन सी संख्या है? सीधी रेखा पर यह 0 है। लेकिन वहाँ पहुँचने का एक और रास्ता है, और उस रास्ते के बीच में एक ऐसी संख्या है जो रेखा पर है ही नहीं।

यह वीडियो काल्पनिक संख्याओं को बिल्कुल शुरुआत से समझाता है। आपको बस गुणा आना चाहिए। हम देखेंगे कि कोई भी सामान्य संख्या वर्ग करने पर −1 क्यों नहीं देती, 16वीं सदी के उस समीकरण को समझेंगे जिसने गणितज्ञों को फिर भी √−1 इस्तेमाल करने पर मजबूर किया, और जानेंगे कि i असल में क्या है: एक चौथाई घुमाव।""",
'वीडियो अंग्रेज़ी में है, हिंदी सबटाइटल उपलब्ध हैं: सबटाइटल (CC) चालू करें।',
['परिचय', 'गुणा एक चाल है', 'वह सवाल जिसका जवाब नहीं था', 'जवाब चार है', 'सीधे आगे बढ़ते जाना', 'रेखा से बाहर निकलना', 'चार घुमाव और वापस घर', 'सपाट पन्ने पर संख्याएँ', 'बॉम्बेली ने असल में क्या पाया', 'तरंगें घूमते तीर हैं', 'सब कुछ एक साथ'],
['गुणा संख्या रेखा पर एक चाल क्यों है, और −1 एक पलटाव क्यों है', 'x³ = 15x + 4 को जवाब 4 तक पहुँचने के लिए √−121 की ज़रूरत क्यों पड़ती है', 'i एक चौथाई घुमाव क्यों है, और 1 और −1 के बीच में क्या आता है', 'i¹⁰⁰ = 1 क्यों है', 'सम्मिश्र संख्याओं का नियम: लंबाइयाँ गुणा होती हैं, कोण जुड़ते हैं', 'चौथाई चक्र के अंतर वाली 3 V और 4 V की तरंगें 7 V नहीं, 5 V तक क्यों पहुँचती हैं'],
'#गणित #काल्पनिकसंख्याएँ #सम्मिश्रसंख्याएँ'))
D['id'] = ('Bagaimana Akar Kuadrat dari −1 Bisa Masuk Akal?', body('id',
"""Bilangan apa yang tepat di tengah antara 1 dan −1? Di garis lurus, jawabannya 0. Tapi ada cara lain untuk sampai ke sana, dan di tengah rute itu ada bilangan yang sama sekali tidak ada di garis.

Video ini menjelaskan bilangan imajiner dari nol. Kamu hanya perlu bisa mengali. Kita lihat kenapa tidak ada bilangan biasa yang kuadratnya −1, mengikuti persamaan abad ke-16 yang memaksa para matematikawan tetap memakai √−1, lalu melihat apa sebenarnya i itu: seperempat putaran.""",
'Video berbahasa Inggris dengan subtitle Bahasa Indonesia: nyalakan subtitle (CC).',
['Pendahuluan', 'Mengali adalah gerakan', 'Pertanyaan tanpa jawaban', 'Jawabannya empat', 'Terus berjalan menembusnya', 'Meninggalkan garis', 'Empat putaran lalu pulang', 'Bilangan di bidang datar', 'Yang sebenarnya ditemukan Bombelli', 'Gelombang adalah panah berputar', 'Menyatukan semuanya'],
['Kenapa mengali adalah gerakan di garis bilangan, dan −1 adalah pembalikan', 'Kenapa x³ = 15x + 4 butuh √−121 untuk sampai ke jawaban 4', 'Kenapa i adalah seperempat putaran, dan apa yang ada di tengah antara 1 dan −1', 'Kenapa i¹⁰⁰ = 1', 'Aturan bilangan kompleks: panjang dikalikan, sudut dijumlahkan', 'Kenapa gelombang 3 V dan 4 V yang berselisih seperempat siklus mencapai puncak 5 V, bukan 7 V'],
'#matematika #bilanganimajiner #bilangankompleks'))
D['de'] = ('Wie kann die Wurzel aus −1 überhaupt Sinn ergeben?', body('de',
"""Welche Zahl liegt genau in der Mitte zwischen 1 und −1? Auf einer geraden Linie ist es die 0. Aber es gibt noch einen anderen Weg dorthin, und auf halber Strecke liegt eine Zahl, die gar nicht auf der Linie ist.

Dieses Video erklärt imaginäre Zahlen von Grund auf. Du musst nur multiplizieren können. Wir klären, warum keine gewöhnliche Zahl zum Quadrat −1 ergibt, folgen der Gleichung aus dem 16. Jahrhundert, die Mathematiker zwang, √−1 trotzdem zu benutzen, und sehen dann, was i wirklich ist: eine Vierteldrehung.""",
'Video auf Englisch mit deutschen Untertiteln: Untertitel (CC) einschalten.',
['Einführung', 'Multiplizieren ist eine Bewegung', 'Die Frage ohne Antwort', 'Die Antwort Vier', 'Einfach weiterrechnen', 'Die Linie verlassen', 'Vier Drehungen und zurück', 'Zahlen auf einer flachen Seite', 'Was Bombelli wirklich gefunden hat', 'Wellen sind drehende Pfeile', 'Alles zusammen'],
['Warum Multiplizieren eine Bewegung auf dem Zahlenstrahl ist und −1 ein Umklappen', 'Warum x³ = 15x + 4 auf dem Weg zur Antwort 4 √−121 braucht', 'Warum i eine Vierteldrehung ist und was in der Mitte zwischen 1 und −1 liegt', 'Warum i¹⁰⁰ = 1 ist', 'Die Regel für komplexe Zahlen: Längen multiplizieren sich, Winkel addieren sich', 'Warum Wellen von 3 V und 4 V, um einen Viertelzyklus versetzt, 5 V statt 7 V erreichen'],
'#Mathematik #ImaginäreZahlen #KomplexeZahlen'))
D['fr'] = ('Comment la racine carrée de −1 peut-elle avoir un sens ?', body('fr',
"""Quel nombre se trouve exactement à mi-chemin entre 1 et −1 ? Sur une ligne droite, c'est 0. Mais il existe un autre chemin, et à mi-parcours se trouve un nombre qui n'est pas du tout sur la ligne.

Cette vidéo explique les nombres imaginaires à partir de zéro. Il suffit de savoir multiplier. Nous verrons pourquoi aucun nombre ordinaire n'a −1 pour carré, nous suivrons l'équation du XVIe siècle qui a forcé les mathématiciens à utiliser √−1 malgré tout, puis nous verrons ce qu'est vraiment i : un quart de tour.""",
'Vidéo en anglais avec sous-titres français : activez les sous-titres (CC).',
['Introduction', 'Multiplier, c\'est un mouvement', 'La question sans réponse', 'Une réponse égale à quatre', 'Continuer tout droit', 'Quitter la droite', 'Quatre tours et retour au départ', 'Des nombres sur une page plate', 'Ce que Bombelli a vraiment trouvé', 'Les ondes sont des flèches qui tournent', 'Tout rassembler'],
['Pourquoi multiplier est un mouvement sur la droite numérique, et −1 un retournement', 'Pourquoi x³ = 15x + 4 a besoin de √−121 pour arriver à la réponse 4', 'Pourquoi i est un quart de tour, et ce qui se trouve à mi-chemin entre 1 et −1', 'Pourquoi i¹⁰⁰ = 1', 'La règle des nombres complexes : les longueurs se multiplient, les angles s\'additionnent', 'Pourquoi des ondes de 3 V et 4 V, décalées d\'un quart de cycle, culminent à 5 V et non à 7 V'],
'#mathématiques #nombresimaginaires #nombrescomplexes'))
D['ar'] = ('كيف يمكن أن يكون للجذر التربيعي لـ −1 أي معنى؟', body('ar',
"""ما العدد الذي يقع في منتصف المسافة تمامًا بين 1 و −1؟ على خط مستقيم هو 0. لكن هناك طريقًا آخر للوصول، وفي منتصف ذلك الطريق يوجد عدد ليس على الخط أصلًا.

يشرح هذا الفيديو الأعداد التخيلية من الصفر. كل ما تحتاجه هو الضرب. سنرى لماذا لا يوجد عدد عادي مربعه −1، ونتتبع معادلة من القرن السادس عشر أجبرت علماء الرياضيات على استخدام √−1 رغم ذلك، ثم نرى ما هو i حقًا: ربع دورة.""",
'الفيديو باللغة الإنجليزية مع ترجمة عربية: فعّل الترجمة (CC).',
['مقدمة', 'الضرب حركة', 'السؤال الذي لا جواب له', 'جواب يساوي أربعة', 'المضي قدمًا رغم ذلك', 'مغادرة الخط', 'أربع دورات والعودة', 'أعداد على صفحة مستوية', 'ما وجده بومبيلي حقًا', 'الموجات أسهم تدور', 'جمع كل شيء'],
['لماذا الضرب حركة على خط الأعداد، و −1 انقلاب', 'لماذا تحتاج x³ = 15x + 4 إلى √−121 في الطريق إلى الجواب 4', 'لماذا i ربع دورة، وما الذي يقع في منتصف المسافة بين 1 و −1', 'لماذا i¹⁰⁰ = 1', 'قاعدة الأعداد المركبة: الأطوال تُضرب والزوايا تُجمع', 'لماذا تبلغ موجتان 3 V و 4 V بينهما ربع دورة قمة 5 V لا 7 V'],
'#رياضيات #الأعداد_التخيلية #الأعداد_المركبة'))
D['vi'] = ('Căn bậc hai của −1 sao lại có nghĩa được?', body('vi',
"""Số nào nằm chính giữa 1 và −1? Trên một đường thẳng thì đó là 0. Nhưng còn một cách khác để đi tới đó, và ở giữa con đường ấy là một con số hoàn toàn không nằm trên đường thẳng.

Video này giải thích số ảo từ con số 0. Bạn chỉ cần biết phép nhân. Chúng ta sẽ xem vì sao không số thông thường nào bình phương lên bằng −1, lần theo phương trình thế kỷ 16 đã buộc các nhà toán học vẫn phải dùng √−1, rồi thấy i thực ra là gì: một phần tư vòng quay.""",
'Video tiếng Anh có phụ đề tiếng Việt: bật phụ đề (CC).',
['Mở đầu', 'Phép nhân là một chuyển động', 'Câu hỏi không có lời đáp', 'Đáp án bằng bốn', 'Cứ thế đi thẳng qua', 'Rời khỏi đường thẳng', 'Bốn lần quay rồi về nhà', 'Những con số trên mặt phẳng', 'Điều Bombelli thực sự tìm ra', 'Sóng là mũi tên đang quay', 'Ghép tất cả lại'],
['Vì sao phép nhân là một chuyển động trên trục số, và −1 là phép lật', 'Vì sao x³ = 15x + 4 cần √−121 trên đường đi tới đáp án 4', 'Vì sao i là một phần tư vòng quay, và điểm chính giữa 1 và −1 là gì', 'Vì sao i¹⁰⁰ = 1', 'Quy tắc của số phức: độ dài nhân với nhau, góc cộng với nhau', 'Vì sao hai sóng 3 V và 4 V lệch nhau một phần tư chu kỳ đạt đỉnh 5 V chứ không phải 7 V'],
'#toánhọc #sốảo #sốphức'))
D['tr'] = ('−1\'in Karekökü Nasıl Bir Anlam Taşıyabilir?', body('tr',
"""1 ile −1'in tam ortasında hangi sayı var? Düz bir çizgide bu 0. Ama oraya varmanın başka bir yolu da var ve o yolun ortasında çizginin üzerinde hiç olmayan bir sayı duruyor.

Bu video sanal sayıları sıfırdan anlatıyor. Tek ihtiyacınız çarpma bilmek. Hiçbir sıradan sayının karesinin neden −1 olmadığını görecek, matematikçileri yine de √−1 kullanmaya zorlayan 16. yüzyıl denklemini izleyecek ve i'nin aslında ne olduğunu göreceğiz: çeyrek dönüş.""",
'Video İngilizce, Türkçe altyazılı: altyazıları (CC) açın.',
['Giriş', 'Çarpma bir harekettir', 'Cevabı olmayan soru', 'Cevap dört', 'Dosdoğru devam etmek', 'Çizgiden çıkmak', 'Dört dönüş ve başa dönüş', 'Düz bir sayfada sayılar', 'Bombelli\'nin aslında bulduğu şey', 'Dalgalar dönen oklardır', 'Hepsini birleştirmek'],
['Çarpma neden sayı doğrusunda bir harekettir ve −1 neden bir ters çevirmedir', 'x³ = 15x + 4 denklemi 4 cevabına giderken neden √−121 gerektirir', 'i neden çeyrek dönüştür ve 1 ile −1\'in ortasında ne vardır', 'i¹⁰⁰ neden 1\'dir', 'Karmaşık sayıların kuralı: uzunluklar çarpılır, açılar toplanır', 'Çeyrek döngü farklı 3 V ve 4 V dalgaları neden 7 V değil 5 V tepeye ulaşır'],
'#matematik #sanalsayılar #karmaşıksayılar'))
D['ko'] = ('−1의 제곱근이 어떻게 말이 될 수 있을까?', body('ko',
"""1과 −1의 정확히 가운데에 있는 수는 무엇일까요? 직선 위에서는 0입니다. 하지만 그곳에 가는 다른 길이 있고, 그 길의 중간에는 직선 위에 전혀 없는 수가 있습니다.

이 영상은 허수를 처음부터 설명합니다. 곱셈만 알면 됩니다. 왜 보통의 수는 제곱해서 −1이 될 수 없는지 살펴보고, 그럼에도 수학자들이 √−1을 쓸 수밖에 없게 만든 16세기 방정식을 따라간 뒤, i가 실제로 무엇인지 확인합니다. 바로 4분의 1 회전입니다.""",
'영어 영상이며 한국어 자막이 있습니다. 자막(CC)을 켜세요.',
['들어가며', '곱셈은 움직임이다', '답이 없는 질문', '답은 4', '그대로 밀고 나가기', '직선을 벗어나기', '네 번 돌면 제자리', '평면 위의 수', '봄벨리가 실제로 찾은 것', '파동은 회전하는 화살표', '모두 정리하기'],
['곱셈이 왜 수직선 위의 움직임이고 −1은 왜 뒤집기인가', 'x³ = 15x + 4가 답 4에 이르는 길에 왜 √−121이 필요한가', 'i가 왜 4분의 1 회전이고 1과 −1의 가운데에는 무엇이 있는가', '왜 i¹⁰⁰ = 1인가', '복소수의 규칙: 길이는 곱하고 각도는 더한다', '4분의 1 주기 차이 나는 3 V와 4 V 파동의 최고점이 왜 7 V가 아니라 5 V인가'],
'#수학 #허수 #복소수'))
sys.exit(write('en/imaginary', D))
