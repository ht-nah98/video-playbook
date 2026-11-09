# intuition — bản gốc người dùng gửi (2026-10-08), nguyên văn

> Người dùng thêm: "bài này rất hay vì nguyên tắc của bài này cũng áp dụng cho 1 bộ film nổi tiếng trên mạng. Nếu có
> thể lồng ghép các hình ảnh thì càng tuyệt càng trực quan." → chốt phim **21 (2008)**; mở bài dùng **hộp Bertrand**.

Bạn hãy nhìn lên màn hình và trả lời nhanh giúp mình câu này. Xác suất rút ra lá
màu đỏ là bao nhiêu phần trăm?

Mình đoán là trong đầu bạn vừa có một con số bật ra gần như tức thì. Và bạn thấy
nó hiển nhiên, chẳng cần nghĩ.

Vấn đề là, với rất nhiều bài toán, cái câu trả lời bật ra tức thì đó, có thể là
cái bẫy. Có những bài mà cả nghìn người thông minh, đọc xong vẫn cãi nhau. Bởi
vì họ tin vào trực giác của mình hơn cả phép tính.

Thế thì khi làm toán, trực giác có thật sự quan trọng không? Hay chỉ cần logic
thôi là đủ?

Để trả lời, mình sẽ mượn hai bài toán đánh lừa trực giác khá nổi tiếng. Hai bài
mà rất nhiều người từng vò đầu bứt tai. Bắt đầu nhé.

Phần 1: Monty Hall, khi trực giác dẫn bạn đi sai

Mình bắt đầu bằng bài Monty Hall, tên của nó lấy từ người dẫn một chương trình
truyền hình trò chơi của Mỹ, tên là "Let’s Make a Deal".

Luật chơi như thế này: Trước mặt bạn có ba cánh cửa, sau một cửa là một chiếc xe
hơi, sau hai cửa còn lại là hai con dê. Bạn chọn một cửa, ví dụ cửa số 1, nhưng
chưa mở vội. Người dẫn chương trình, vốn biết rõ xe nằm sau cửa nào, sẽ mở một
trong hai cửa bạn không chọn. Và cửa ông ấy mở, luôn là cửa có dê.

Giờ trên sân khấu còn lại hai cửa đóng, là cửa bạn chọn lúc đầu và một cửa nữa.
Ông ấy hỏi bạn: "Có muốn đổi sang cửa kia không?". Phản xạ của gần như tất cả
mọi người là: "Đổi hay không thì cũng vậy thôi. Còn có hai cửa, một có xe, một
có dê, nghĩa là 50/50, đổi cũng chẳng hơn gì".

Nghe có vẻ hợp lý, nhưng đáp án đúng là bạn nên đổi. Nếu đổi, xác suất trúng xe
của bạn là 2/3. Nếu giữ nguyên cửa cũ, xác suất chỉ là 1/3. Đổi cửa làm khả năng
thắng của bạn tăng gấp đôi.

Lý do nằm ở ngay lúc bạn chọn cửa đầu tiên. Khi đó bạn chưa có thông tin gì cả,
nên cửa bạn chọn có đúng 1/3 cơ hội là cửa có xe. 2/3 còn lại nằm ở hai cửa kia
gộp lại. Chỗ mấu chốt là người dẫn chương trình không mở cửa một cách bừa bãi.
Ông ấy biết xe ở đâu, và cố tình chỉ mở cửa có dê. Thế nên toàn bộ cái 2/3 của
hai cửa kia bây giờ dồn hết về một cửa duy nhất còn đóng. Cửa bạn chọn ban đầu
vẫn giữ nguyên 1/3, còn cửa còn lại ôm trọn 2/3.

Nếu nghe tới đây, bạn vẫn thấy lấn cấn, thì có một cách hình dung dễ hơn như
này: Thay vì ba cửa, bạn tưởng tượng có 100 cửa. Bạn chọn đại một cửa, khả năng
trúng xe của bạn là 1/100, rất thấp. Rồi người dẫn chương trình lần lượt mở
ra 98 cửa, toàn dê và chừa lại đúng một cửa bên cạnh cửa của bạn. Lúc này bạn sẽ
thấy rõ là cái cửa được ông ấy cẩn thận chừa lại kia, gần như chắc chắn có xe.
Còn cửa bạn chọn ban đầu thì vẫn chỉ là một phát đoán mò, 1/100. Đổi cửa là việc
hợp lý.

Bài ba cửa thật ra y hệt, chỉ là con số nhỏ nên trực giác dễ bị đánh lừa hơn.

Bạn cần chú ý một chi tiết quan trọng trước khi đi đến kết luận này: Đáp án 2/3
dựa trên giả định rằng người dẫn chương trình luôn biết xe ở đâu, luôn mở một
cửa có dê, và luôn mời bạn đổi. Nếu luật chơi khác đi, ví dụ ông ấy mở cửa một
cách ngẫu nhiên và đôi khi lỡ tay mở trúng cửa có xe thì cách tính sẽ khác và
con số 2/3 không còn đúng.

Bài toán này hay là vì vậy, kết quả phụ thuộc vào việc người mở cửa đang cố tình
giấu xe giúp bạn. Một chi tiết mà trực giác hay bỏ sót. Điểm thú vị của bài
Monty Hall là trực giác ban đầu dẫn chúng ta đến kết luận sai, nhưng nó không vô
dụng. Khi bạn đổi sang hình dung 100 cửa, chính trực giác lại quay ra đồng ý với
phép tính. Chỉ cần thay đổi cách nhìn nhận vấn đề một chút, thì trực giác lại
giúp bạn đi đúng đường.

Phần 2: 0,999... = 1, khi trực giác không chịu thua

Bài toán thứ hai thì hơi khác. Ở bài toán này, ngay cả sau khi nghe giải thích
xong, nhiều người vẫn thấy lấn cấn. Sự thật là 0,999... với dãy 9 kéo dài vô tận
bằng đúng số 1.

Phản ứng tự nhiên của nhiều người là không tin. Cảm giác mách bảo rằng 0,999...
vẫn còn thiếu một tí xíu nữa mới tới 1. Một khe hở nhỏ vô cùng nhưng vẫn là khe
hở. Cảm giác này rất mạnh, tới mức nghe giải thích xong, người ta vẫn lầm bầm
trong đầu là chắc vẫn hụt một chút.

Có vài cách lập luận quen thuộc cho thấy hai số bằng nhau. Cách thứ nhất là đi
từ phân số. Bạn biết 1/3 viết dưới dạng thập phân là 0,333... với dãy 3 kéo dài
mãi. Nhân cả hai vế với 3, vế trái thành 1, vế phải thành 0,999... Vậy 0,999...
bằng 1.

Cách thứ hai, dùng một mẹo đại số: Gọi x là 0,999... Nhân hai vế với 10, bạn
được 10x = 9,999... Lấy 10x trừ đi x thì phần đuôi vô tận triệt tiêu nhau, còn
lại 9x = 9, suy ra x = 1.

Hai cách trên dễ nhớ và khá thuyết phục, nhưng nói thật thì chúng hơi đi tắt, vì
chúng giả định sẵn rằng mình được phép cộng trừ, nhân chia thoải mái với một dãy
số vô tận, y như với số bình thường. Lý do gốc rễ thì nằm ở chỗ khác. Nó ở chính
câu hỏi: "0,999... thật ra nghĩa là gì?".

Khi viết dãy 9 kéo dài vô tận, cái mình đang nói tới là một dãy số càng lúc càng
dài. 0,9 rồi 0,99 rồi 0,999 cứ thế. Dãy này tiến lại gần 1 mỗi lúc một sát hơn.
Và bạn có thể ép nó sát 1 tới mức tùy ý, miễn là viết đủ nhiều chữ số 9. Trong
tập số thực mà chúng ta dùng hàng ngày, ký hiệu 0,999... được định nghĩa chính
là cái đích mà dãy đó tiến tới, và cái đích đó là 1. Hiểu theo nghĩa này
thì 0,999... đứng đúng ngay tại 1, chứ không lửng lơ ở đâu đó, sát ngay trước 1.

Có một cách khác để chúng ta cảm thấy yên tâm hơn. Hai số thực khác nhau thì
giữa chúng luôn có vô số số khác chen vào. Bạn thử tìm một số nằm giữa 0,999...
và 1 xem, tức là một số lớn hơn 0,999... và nhỏ hơn 1. Bạn sẽ không tìm ra. Đơn
giản vì không có số nào như thế. Mà nếu giữa hai số chẳng nhét được gì vào giữa
thì chúng đâu thể là hai số khác nhau.

Mình đoán là tới đây, nhiều bạn vẫn cảm thấy dường như còn một khe hở nhỏ xíu bị
bỏ sót đâu đó. Thật ra cái cảm giác đó không hề ngớ ngẩn. Vấn đề là trong tập số
thực, không tồn tại khoảng cách nào vừa khác 0, vừa nhỏ hơn mọi số dương, nên
không có chỗ nào để nhét cái khe hở đó vào.

Nhưng toán học cũng có những cách xây dựng số khác, trong đó những khoảng cách
cực nhỏ như vậy thật sự được phép tồn tại. Trực giác của bạn đang chỉ về phía
những hệ thống số kiểu đó. Chỉ có điều cái ký hiệu 0,999... mà chúng ta đang bàn
thì sống trong tập số thực quen thuộc, và ở đó nó bằng 1.

Điểm khác của bài này so với Monty Hall nằm ở đây: Ở Monty Hall, trực giác tính
sai xác suất theo nghĩa rõ ràng. Còn ở đây, trực giác về cái khe hở không hẳn là
sai, nó đang trả lời cho một câu hỏi hơi khác với câu hỏi mình đặt ra. Bạn đang
cảm nhận theo một thế giới có những khoảng cách cực nhỏ như vậy, trong khi định
nghĩa của 0,999... lại đặt trong tập số thực vốn không có thứ đó.

Một khi đã xác định rõ mình đang nói về hệ thống số nào, thì mọi tranh cãi cũng
tự nhiên biến mất.

Phần 3: Toán có cần trực giác không

Quay lại với câu hỏi lúc đầu: Liệu khi làm toán có cần tới trực giác không?

Hai ví dụ vừa rồi cho ta hai góc nhìn khác nhau. Giờ hãy ghép chúng lại nhé. Ở
bài Monty Hall, trực giác mắc lỗi thật sự, và logic là thứ kéo ta về đúng. Nhưng
làm xong phần logic rồi, ta lại có thể xây dựng một trực giác mới tốt hơn, kiểu
hình dung 100 cửa, để lần sau gặp bài tương tự thì trực giác không còn đánh lừa
ta nữa.

Ở bài 0,999..., lý lẽ logic không phủ nhận hoàn toàn cảm giác của bạn, mà giúp
bạn nhận ra rằng cảm giác ấy xuất phát từ một hệ thống số khác. Quan điểm của
mình sau khi nhìn hai ví dụ là như này: Toán có cần trực giác, nhưng không nên
để trực giác quyết định sau cùng. Trực giác là động cơ, nó giúp người ta cảm
nhận một bài toán là đúng hay sai, rồi đoán ra hướng đi, thường là từ trước khi
ta biết phải chứng minh ra sao. Còn logic và chứng minh chặt chẽ là phần kiểm
tra, là cái phanh giữ cho trực giác khỏi lao xuống vực, như trong bài Monty
Hall.

Nhà toán học Henri Poincaré từng nói đại ý rằng: "Người ta chứng minh bằng
logic, nhưng phát minh bằng trực giác". Mình thấy câu đó tới giờ vẫn đúng. Chúng
ta không nên tuyệt đối tin hay hoài nghi trực giác, mà là học cách nhận biết
mình đang rơi vào trường hợp nào, để biết khi nào nên tin và khi nào cần rà soát
lại cảm giác của mình.

Có những lúc giống Monty Hall, khi cảm giác chắc nịch của bạn lại đúng là chỗ
cần dừng lại kiểm tra kỹ nhất. Có những lúc giống bài 0,999..., khi cảm giác
phản kháng của bạn thật ra đang chỉ vào một câu hỏi sâu hơn, đáng để đào tiếp.
Phân biệt được hai kiểu đó mới là phần khó và thú vị.

Cảm ơn bạn đã theo dõi tới cuối, hẹn gặp lại ở video tiếp theo.
