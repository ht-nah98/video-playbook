from gen import *
# Theo bản ĐANG CHẠY trên YouTube (4h4kNno6OC8, snapshot analytics 2026-10-25): title có "!", mô tả người dùng đã rút gọn —
# bỏ danh sách "In this video" (chỉ giữ câu định lý cơ bản) và bỏ credit ảnh → không dùng desc() của gen.
S = '0:00 1:08 1:28 1:50 2:06 2:31 2:43 2:55 3:20 3:42 4:04 4:24 4:51 5:13 5:44 6:00 6:22 6:53 7:07 7:37 7:49 8:06 8:28'.split()
def body(code, intro, names, ftc, new, tags):
    c = C[code]
    return '\n\n'.join([intro.strip(), c['sub'], c['ch'] + '\n' + chapters(S, names), ftc, new, tags])
D = {}
D['es'] = ('¡La pregunta imposible que dio origen al cálculo!', body('es',
"""¿Qué tan empinada es una colina justo en el punto donde está tu pie? La pendiente es subida sobre avance, y eso necesita dos puntos. Un solo punto no tiene ninguna de las dos: la subida es 0, el avance es 0, y 0 ÷ 0 no significa nada. Durante siglos, preguntas como esta eran imposibles. Intentar responderlas es como nació el cálculo.

Respondemos tres preguntas: ¿cómo puede un solo punto tener pendiente? ¿Qué es un límite y cómo le saca una respuesta a 0/0? ¿Y por qué las derivadas y las integrales son en realidad dos caras de la misma moneda?""",
['Introducción', 'Un cuenco', 'La secante', 'Un promedio', 'El punto se desliza', 'Se alinea', 'La recta gira', 'La tangente', 'Hacia dónde va', 'Acercándose sin llegar', 'Un agujero en la recta', 'De vuelta al cuenco', 'Todos los puntos a la vez', 'El velocímetro', 'El área bajo el cuenco', 'Cuatro franjas', 'Cada vez más finas', 'Arquímedes', 'El área que crece', 'Compruébalo', 'El coche, otra vez', 'Todo junto', 'La próxima vez'],
'El teorema fundamental del cálculo: el área crece al ritmo de la altura de la curva, así que derivadas e integrales se deshacen mutuamente, como un velocímetro y un cuentakilómetros.',
'¿Eres nuevo? Este canal reconstruye las matemáticas desde cero, una idea conocida a la vez, con el «porqué» detrás. Suscríbete para el próximo video.',
'#cálculo #derivadas #integrales'))

D['pt-BR'] = ('A pergunta impossível que criou o cálculo!', body('pt-BR',
"""Qual é a inclinação de um morro exatamente no ponto onde está o seu pé? Inclinação é subida sobre avanço, e isso precisa de dois pontos. Um ponto só não tem nenhum dos dois: a subida é 0, o avanço é 0, e 0 ÷ 0 não significa nada. Durante séculos, perguntas assim eram impossíveis. Foi tentando respondê-las que o cálculo nasceu.

Respondemos três perguntas: como um único ponto pode ter inclinação? O que é um limite e como ele arranca uma resposta de 0/0? E por que derivadas e integrais são, na verdade, dois lados da mesma moeda?""",
['Introdução', 'Uma tigela', 'A secante', 'Uma média', 'O ponto desliza', 'Alinhando', 'A reta gira', 'A tangente', 'Para onde está indo', 'Chegando de mansinho', 'Um buraco na reta', 'De volta à tigela', 'Todos os pontos de uma vez', 'O velocímetro', 'A área sob a tigela', 'Quatro faixas', 'Cada vez mais finas', 'Arquimedes', 'A área que cresce', 'Confira', 'O carro, de novo', 'Juntando tudo', 'Na próxima'],
'O teorema fundamental do cálculo: a área cresce no ritmo da altura da curva, então derivadas e integrais desfazem uma à outra, como um velocímetro e um hodômetro.',
'É novo por aqui? Este canal reconstrói a matemática do zero, uma ideia conhecida de cada vez, com o "porquê" por trás. Inscreva-se para o próximo.',
'#cálculo #derivadas #integrais'))

D['hi'] = ('वह असंभव सवाल जिससे कैलकुलस का जन्म हुआ!', body('hi',
"""जिस जगह आपका पैर टिका है, ठीक उसी बिंदु पर पहाड़ी कितनी खड़ी है? ढलान का मतलब है ऊँचाई में बदलाव ÷ आगे की दूरी, और इसके लिए दो बिंदु चाहिए। एक अकेले बिंदु के पास दोनों में से कुछ नहीं: ऊँचाई का बदलाव 0, दूरी 0, और 0 ÷ 0 का कोई मतलब ही नहीं। सदियों तक ऐसे सवाल असंभव थे। इन्हें हल करने की कोशिश से ही कैलकुलस का जन्म हुआ।

हम तीन सवालों के जवाब देते हैं: एक अकेले बिंदु की ढलान कैसे हो सकती है? लिमिट क्या है, और यह 0/0 से जवाब कैसे निकालती है? और डेरिवेटिव और इंटीग्रल असल में एक ही सिक्के के दो पहलू क्यों हैं?""",
['परिचय', 'एक कटोरा', 'सीकेंट रेखा', 'एक औसत', 'बिंदु खिसकता है', 'रेखा सीध में आती है', 'रेखा घूमती है', 'स्पर्श रेखा (टैंजेंट)', 'यह कहाँ जा रहा है', 'धीरे-धीरे पास आना', 'रेखा में एक छेद', 'वापस कटोरे पर', 'हर बिंदु एक साथ', 'स्पीडोमीटर', 'कटोरे के नीचे का क्षेत्रफल', 'चार पट्टियाँ', 'और पतली, और पतली', 'आर्किमिडीज़', 'बढ़ता क्षेत्रफल', 'जाँचिए', 'फिर से कार', 'सब एक साथ', 'अगली बार'],
'कैलकुलस का मूलभूत प्रमेय: क्षेत्रफल उसी दर से बढ़ता है जितनी वक्र की ऊँचाई है, इसलिए डेरिवेटिव और इंटीग्रल एक-दूसरे को उलट देते हैं, जैसे स्पीडोमीटर और ओडोमीटर।',
'पहली बार आए हैं? यह चैनल गणित को शुरुआत से दोबारा बनाता है, एक-एक जानी-पहचानी बात से, हर बात के पीछे का "क्यों" समझाते हुए। अगले वीडियो के लिए सब्सक्राइब करें।',
'#कैलकुलस #गणित #calculus'))

D['id'] = ('Pertanyaan Mustahil yang Melahirkan Kalkulus!', body('id',
"""Seberapa curam sebuah bukit tepat di titik tempat kakimu berpijak? Kemiringan adalah naik dibagi maju, dan itu butuh dua titik. Satu titik tidak punya keduanya: naiknya 0, majunya 0, dan 0 ÷ 0 tidak berarti apa-apa. Selama berabad-abad, pertanyaan seperti ini mustahil dijawab. Upaya menjawabnyalah yang melahirkan kalkulus.

Kita menjawab tiga pertanyaan: bagaimana satu titik bisa punya kemiringan? Apa itu limit, dan bagaimana limit memeras jawaban dari 0/0? Dan mengapa turunan dan integral sebenarnya dua sisi dari koin yang sama?""",
['Pendahuluan', 'Sebuah mangkuk', 'Garis sekan', 'Sebuah rata-rata', 'Titiknya bergeser', 'Mulai sejajar', 'Garisnya berputar', 'Garis singgung', 'Ke mana arahnya', 'Mendekat diam-diam', 'Lubang di garis', 'Kembali ke mangkuk', 'Semua titik sekaligus', 'Spidometer', 'Luas di bawah mangkuk', 'Empat pita', 'Makin tipis dan makin tipis', 'Archimedes', 'Luas yang bertambah', 'Cek', 'Mobil itu lagi', 'Menyatukan semuanya', 'Berikutnya'],
'Teorema dasar kalkulus: luas bertambah dengan laju setinggi kurvanya, jadi turunan dan integral saling membatalkan, seperti spidometer dan odometer.',
'Baru di sini? Channel ini membangun ulang matematika dari nol, satu ide yang sudah kamu kenal setiap kali, lengkap dengan "kenapa"-nya. Subscribe untuk video berikutnya.',
'#kalkulus #turunan #integral'))

D['de'] = ('Die unmögliche Frage, aus der die Infinitesimalrechnung entstand!', body('de',
"""Wie steil ist ein Hügel genau an der Stelle, an der dein Fuß steht? Steigung ist Höhenunterschied durch Strecke, und dafür braucht man zwei Punkte. Ein einzelner Punkt hat beides nicht: Der Höhenunterschied ist 0, die Strecke ist 0, und 0 ÷ 0 bedeutet überhaupt nichts. Jahrhundertelang waren solche Fragen unmöglich. Aus dem Versuch, sie zu beantworten, entstand die Infinitesimalrechnung.

Wir beantworten drei Fragen: Wie kann ein einzelner Punkt eine Steigung haben? Was ist ein Grenzwert, und wie presst er aus 0/0 eine Antwort heraus? Und warum sind Ableitung und Integral eigentlich zwei Seiten derselben Medaille?""",
['Einleitung', 'Eine Schüssel', 'Die Sekante', 'Ein Durchschnitt', 'Der Punkt rutscht heran', 'Sie richtet sich aus', 'Die Gerade dreht sich', 'Die Tangente', 'Wohin es geht', 'Heranschleichen', 'Ein Loch in der Geraden', 'Zurück zur Schüssel', 'Alle Punkte auf einmal', 'Der Tacho', 'Die Fläche unter der Schüssel', 'Vier Streifen', 'Immer dünner', 'Archimedes', 'Die wachsende Fläche', 'Die Probe', 'Noch einmal das Auto', 'Alles zusammen', 'Beim nächsten Mal'],
'Der Hauptsatz der Differential- und Integralrechnung: Die Fläche wächst mit der Rate der Kurvenhöhe, also heben Ableitung und Integral einander auf, wie Tacho und Kilometerzähler.',
'Neu hier? Dieser Kanal baut Mathematik von Grund auf neu auf, eine vertraute Idee nach der anderen, mit dem „Warum“ dahinter. Abonniere für das nächste Video.',
'#Analysis #Ableitung #Integral'))

D['fr'] = ('La question impossible qui a fait naître le calcul infinitésimal !', body('fr',
"""Quelle est la pente d’une colline à l’endroit exact où se trouve votre pied ? La pente, c’est la montée divisée par l’avancée, et il faut deux points pour ça. Un seul point n’a ni l’une ni l’autre : la montée vaut 0, l’avancée vaut 0, et 0 ÷ 0 ne veut rien dire. Pendant des siècles, ce genre de question était impossible. C’est en essayant d’y répondre qu’est né le calcul infinitésimal.

Nous répondons à trois questions : comment un seul point peut-il avoir une pente ? Qu’est-ce qu’une limite, et comment arrache-t-elle une réponse à 0/0 ? Et pourquoi dérivées et intégrales sont-elles en fait les deux faces d’une même pièce ?""",
['Introduction', 'Un bol', 'La sécante', 'Une moyenne', 'Le point glisse', 'Elle s’aligne', 'La droite tourne', 'La tangente', 'Où ça va', 'Approcher en douce', 'Un trou dans la droite', 'Retour au bol', 'Tous les points à la fois', 'Le compteur de vitesse', 'L’aire sous le bol', 'Quatre bandes', 'De plus en plus fines', 'Archimède', 'L’aire qui grandit', 'Vérifions', 'La voiture, encore', 'Tout assembler', 'La prochaine fois'],
'Le théorème fondamental de l’analyse : l’aire grandit au rythme de la hauteur de la courbe, donc dérivées et intégrales se défont l’une l’autre, comme un compteur de vitesse et un compteur kilométrique.',
'Nouveau ici ? Cette chaîne reconstruit les maths à partir de zéro, une idée familière à la fois, avec le « pourquoi » derrière. Abonnez-vous pour la prochaine vidéo.',
'#calcul #dérivées #intégrales'))

D['ar'] = ('السؤال المستحيل الذي أنجب التفاضل والتكامل!', body('ar',
"""ما مدى انحدار تلّة عند النقطة التي تقف عليها قدمك بالضبط؟ الميل هو الارتفاع مقسومًا على المسافة الأفقية، وهذا يحتاج إلى نقطتين. أما النقطة الواحدة فليس لها أيٌّ منهما: الارتفاع 0، والمسافة 0، و0 ÷ 0 لا تعني شيئًا على الإطلاق. لقرون، كانت أسئلة كهذه مستحيلة. ومن محاولة الإجابة عنها وُلد التفاضل والتكامل.

نجيب عن ثلاثة أسئلة: كيف يمكن لنقطة واحدة أن يكون لها ميل؟ ما هي النهاية، وكيف تنتزع جوابًا من 0/0؟ ولماذا المشتقات والتكاملات في الحقيقة وجهان لعملة واحدة؟""",
['مقدمة', 'وعاء', 'القاطع', 'متوسط', 'النقطة تنزلق', 'تصطفّ', 'المستقيم يدور', 'المماس', 'إلى أين يتجه', 'الاقتراب خلسة', 'ثقب في المستقيم', 'عودة إلى الوعاء', 'كل النقاط دفعة واحدة', 'عدّاد السرعة', 'المساحة تحت الوعاء', 'أربعة أشرطة', 'أرفع فأرفع', 'أرخميدس', 'المساحة التي تنمو', 'لنتحقق', 'السيارة من جديد', 'نجمع كل شيء', 'في المرة القادمة'],
'المبرهنة الأساسية في التفاضل والتكامل: تنمو المساحة بمعدل يساوي ارتفاع المنحنى، لذا يلغي التفاضل والتكامل أحدهما الآخر، مثل عدّاد السرعة وعدّاد المسافة.',
'جديد هنا؟ هذه القناة تعيد بناء الرياضيات من الصفر، فكرة مألوفة في كل مرة، مع "لماذا" وراء كل شيء. اشترك ليصلك الدرس القادم.',
'#تفاضل_وتكامل #رياضيات #calculus'))

D['vi'] = ('Câu hỏi bất khả thi đã khai sinh ra giải tích!', body('vi',
"""Ngọn đồi dốc đến mức nào ở đúng chỗ chân bạn đang đứng? Độ dốc là độ cao tăng thêm chia cho quãng đi ngang, và cần tới hai điểm. Một điểm duy nhất thì không có cả hai: độ cao tăng 0, quãng đi 0, và 0 ÷ 0 chẳng có nghĩa gì cả. Suốt nhiều thế kỷ, những câu hỏi như vậy là bất khả thi. Chính nỗ lực trả lời chúng đã khai sinh ra giải tích.

Video trả lời ba câu hỏi: làm sao một điểm duy nhất lại có độ dốc? Giới hạn là gì, và nó vắt ra câu trả lời từ 0/0 thế nào? Và vì sao đạo hàm và tích phân thực ra là hai mặt của cùng một đồng xu?""",
['Mở đầu', 'Cái bát', 'Cát tuyến', 'Một giá trị trung bình', 'Trượt lại gần', 'Thẳng hàng', 'Đường thẳng xoay', 'Tiếp tuyến', 'Nó đang tiến về đâu', 'Rón rén lại gần', 'Một lỗ thủng trên đường thẳng', 'Trở lại cái bát', 'Mọi điểm cùng lúc', 'Đồng hồ tốc độ', 'Diện tích dưới cái bát', 'Bốn dải', 'Mỏng dần, mỏng dần', 'Archimedes', 'Diện tích lớn dần', 'Kiểm tra lại', 'Lại là chiếc xe', 'Ghép tất cả lại', 'Lần sau'],
'Định lý cơ bản của giải tích: diện tích lớn lên với tốc độ bằng chiều cao của đường cong, nên đạo hàm và tích phân là hai phép ngược nhau, như đồng hồ tốc độ và đồng hồ đo quãng đường.',
'Bạn mới ghé kênh? Kênh này xây lại toán học từ con số 0, mỗi lần một ý tưởng quen thuộc, kèm theo câu trả lời cho "vì sao". Đăng ký để xem bài tiếp theo.',
'#giảitích #đạohàm #tíchphân'))

D['tr'] = ('Kalkülüsü Doğuran İmkânsız Soru!', body('tr',
"""Bir tepe, ayağınızın bastığı noktada tam olarak ne kadar diktir? Eğim, yükselişin ilerleyişe oranıdır ve bunun için iki nokta gerekir. Tek bir noktada ikisi de yoktur: yükseliş 0, ilerleyiş 0’dır ve 0 ÷ 0 hiçbir şey ifade etmez. Yüzyıllar boyunca bu tür sorular imkânsızdı. Kalkülüs, onları yanıtlama çabasından doğdu.

Üç soruyu yanıtlıyoruz: Tek bir noktanın eğimi nasıl olabilir? Limit nedir ve 0/0’dan nasıl bir cevap söküp alır? Ve türev ile integral neden aslında aynı madalyonun iki yüzüdür?""",
['Giriş', 'Bir kâse', 'Kesen doğru', 'Bir ortalama', 'Nokta kayıyor', 'Hizalanıyor', 'Doğru dönüyor', 'Teğet', 'Nereye gidiyor', 'Sessizce yaklaşmak', 'Doğrudaki delik', 'Kâseye dönüş', 'Bütün noktalar aynı anda', 'Hız göstergesi', 'Kâsenin altındaki alan', 'Dört şerit', 'İnceldikçe incelir', 'Arşimet', 'Büyüyen alan', 'Kontrol edelim', 'Yine araba', 'Hepsini birleştirmek', 'Bir dahaki sefere'],
'Kalkülüsün temel teoremi: alan, eğrinin yüksekliği hızında büyür; bu yüzden türev ve integral birbirini geri alır, tıpkı hız göstergesi ile kilometre sayacı gibi.',
'Yeni misiniz? Bu kanal matematiği sıfırdan yeniden kuruyor, her seferinde tanıdık bir fikirle ve ardındaki “neden” ile. Bir sonraki video için abone olun.',
'#kalkülüs #türev #integral'))

D['ko'] = ('미적분을 탄생시킨 불가능한 질문!', body('ko',
"""지금 발을 딛고 있는 바로 그 지점에서 언덕은 얼마나 가파를까요? 기울기는 올라간 높이를 나아간 거리로 나눈 값이고, 그러려면 점이 두 개 필요합니다. 점 하나에는 둘 다 없습니다. 높이 변화도 0, 거리도 0, 그리고 0 ÷ 0은 아무 의미가 없습니다. 수백 년 동안 이런 질문은 답할 수 없는 것이었습니다. 그 답을 찾으려는 시도에서 미적분이 태어났습니다.

세 가지 질문에 답합니다. 점 하나가 어떻게 기울기를 가질 수 있을까? 극한이란 무엇이고, 어떻게 0/0에서 답을 짜낼까? 그리고 미분과 적분은 왜 사실 같은 동전의 양면일까?""",
['들어가며', '그릇', '할선', '평균', '점을 미끄러뜨리기', '나란히 맞춰지다', '직선이 돈다', '접선', '어디로 향하는가', '살금살금 다가가기', '직선에 난 구멍', '다시 그릇으로', '모든 점을 한꺼번에', '속도계', '그릇 아래의 넓이', '네 개의 띠', '점점 더 얇게', '아르키메데스', '자라나는 넓이', '확인하기', '다시 자동차', '하나로 합치기', '다음 영상'],
'미적분학의 기본 정리: 넓이는 곡선의 높이만큼의 속도로 자라므로, 미분과 적분은 서로를 되돌립니다. 속도계와 주행거리계처럼요.',
'처음 오셨나요? 이 채널은 익숙한 아이디어 하나씩, 그 뒤의 "왜"와 함께 수학을 처음부터 다시 쌓아 올립니다. 다음 영상을 보려면 구독하세요.',
'#미적분 #미분 #적분'))
sys.exit(write('en/calculus', D))
