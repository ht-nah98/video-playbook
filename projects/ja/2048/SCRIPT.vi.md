# Bản gốc người dùng gửi (2026-10-12) — nguyên văn, KHÔNG sửa

> Lời bình một video của kênh khác (câu cuối: "hãy theo dõi Ratio"). Người dùng chốt: **bám sát bản gốc, không chạy lại
> mô phỏng**; viết lại bằng lời của kênh 99の発見, bổ sung nếu cần, tối ưu cho người Nhật (`CONTENT.md`).

Bốn hàng, bốn cột và chỉ hai luật. Vuốt một cái, mọi ô trượt về một phía. Hai ô
giống nhau chạm vào nhau thì gộp làm một bằng tổng của chúng. Rồi một ô mới hiện
ra ở một chỗ trống bất kỳ.

Năm 2014, Gabriele Cirulli, một sinh viên 19 tuổi người Ý, viết trò này trong
đúng một cuối tuần. Chưa đầy một tuần sau, trò chơi đã có hơn 4 triệu lượt truy
cập và phần lớn người chơi đều thua.

Tôi cho máy tính bấm bừa 200.000 ván. Không một ván nào chạm được tới ô 1024,
chứ đừng nói đến ô 2048.

Nhưng có những cỗ máy không bấm bừa, mà tính. Chúng vượt qua 2048 từ lâu, lên
ô 32.000, rồi cả ô 65.000. Và toán học chỉ ra rằng, phía trên vẫn còn một bức
tường. Trên bàn 4x4, ô lớn nhất có thể tạo ra là 131.072, không thể hơn. Vậy
điều gì đang ẩn sau 16 ô vuông này và vì sao ta lại thua?

Phần 1: Tổng không bao giờ mất

Bắt đầu bằng một quan sát rất nhỏ. Hãy cộng tất cả các số trên bàn lại. Khi hai
ô hai gộp thành ô 4, tổng không đổi, vì 2+2 vẫn là 4. Trượt qua trượt lại, tổng
cũng không đổi.

Chỉ có một thứ làm tổng tăng lên, đó là ô mới. 9 lần trên 10, nó là ô 2. Một lần
trên 10, nó là ô 4. Tính trung bình, mỗi lượt đi, tổng trên bàn tăng thêm
đúng 2,2. Đây là một định luật bảo toàn, giống như năng lượng trong vật lý. Giá
trị trên bàn không tự sinh ra, cũng không tự mất đi, nó chỉ được gộp lại thành
những ô lớn hơn.

Và định luật ấy cho ta một phép tính bất ngờ. Muốn có ô 2048, tổng trên bàn ít
nhất phải bằng 2048. Chia cho 2,2, ta cần trung bình khoảng 930 lượt đi. Máy của
tôi đo được còn nhiều hơn thế, trung bình 1018 lượt, vì trên bàn lúc nào cũng
còn những ô nhỏ chưa kịp gộp. Nghĩa là mỗi ván 2048 là gần 1.000 quyết định liên
tiếp.

Phần 2: Bức tường 131.072

Vậy nếu cứ chơi mãi, ô có lớn mãi không? Không.

Hãy thử xây ô lớn nhất có thể. Muốn có một ô, bạn cần hai ô bằng một nửa nó đứng
sát cạnh nhau. Nhưng khi ô thứ nhất đã nằm đó, muốn có ô thứ hai, bạn lại cần
hai ô nhỏ hơn một nửa nữa.

Cứ thế đi xuống, ngay trước khi ô lớn ra đời, trên bàn phải có cả một bậc thang.
Mỗi lũy thừa của hai một ô, và ở bậc thấp nhất, hai ô giống nhau. Bàn chỉ có 16
ô, bậc thang cao nhất vừa khít 16 ô là 4, 4, 8, 16, cứ thế nhân đôi tới 65.536.

Gộp dần từ dưới lên, cả bậc thang thu lại thành một ô duy nhất 131.072. Đây là
một cấp số nhân: 4+4+8+16+...+65.536 đúng bằng 2 mũ 17.

Vì sao bậc thấp nhất lại là hai ô 4, chứ không phải hai ô 2? Vì ô mới có thể
là 4. Nếu trò chơi chỉ sinh ra ô 2, bậc thang phải bắt đầu từ 2 và bức tường sẽ
hạ xuống còn 65.536. Còn ô lớn hơn nữa thì cần một bậc thang 17 ô. Bàn không có
ô thứ 17. Và theo định luật bảo toàn ở phần trước, muốn chạm tới bức tường, bạn
cần trung bình gần 60.000 lượt đi.

Phần 3: Vì sao phải dồn vào góc

Bậc thang ấy không chỉ là giới hạn, nó còn là bí quyết. Những người chơi giỏi
đều làm một việc giống nhau: giữ ô lớn nhất ở một góc và xếp các ô còn lại giảm
dần uốn lượn như một con rắn. Lý do nằm ngay trong bậc thang.

Một ô chỉ lớn thêm khi ô bằng nó đi tới sát bên cạnh. Nếu các ô xếp đúng thứ tự,
một lần gộp ở cuối đuôi sẽ kéo theo cả một chuỗi gộp dây chuyền chạy ngược về
góc. Còn khi ô lớn nằm giữa bàn, nó chắn đường. Những ô nhỏ bị nhốt sau lưng nó
không bao giờ gặp được nhau.

Tôi cho máy thử một luật thật đơn giản: ưu tiên vuốt xuống, rồi sang trái, bất
đắc dĩ mới sang phải và chỉ vuốt lên khi không còn cách nào khác. Không suy nghĩ
gì thêm. Trong 200.000 ván, luật dồn góc này chạm ô 512 nhiều gấp khoảng 200 lần
so với bấm bừa. Nhưng ô 1024 thì vẫn chỉ xuất hiện đúng 5 lần. Một luật cố định
là chưa đủ, vì trò chơi này có một đối thủ.

Phần 4: Đối thủ tên là may rủi

Đối thủ ấy là ô mới. Nó không cố ý hại bạn, nó chỉ ngẫu nhiên. Nhưng một ô 2 rơi
đúng vào góc bạn đang giữ là đủ phá cả bậc thang. Mỗi lượt, bạn có bốn hướng để
vuốt. Sau đó, ô mới có thể hiện ra ở bất kỳ chỗ trống nào, là ô 2 hoặc ô 4.

Với 15 chỗ trống, đó là 30 khả năng. Số thế cờ của cả bàn còn khủng khiếp hơn.
Mỗi ô có thể trống hoặc mang một trong 17 lũy thừa của 2, 18 trạng thái. 18
mũ 16, hơn 120 tỉ tỉ thế cờ, không máy nào duyệt hết được.

Năm 1966, nhà khoa học máy tính người Anh Donald Michie chỉ đề xuất một cách
nghĩ cho những trò chơi có may rủi. Cây trò chơi có hai loại nút. Ở nút của ta,
ta chọn nước tốt nhất. Ở nút của may rủi, không ai chọn cả, ta lấy trung bình
theo xác suất, 9/10 cho ô 2, 1/10 cho ô 4. Thuật toán ấy gọi là Expectimax.

Tôi cài nó vào máy, kèm một cách chấm điểm đơn giản: thưởng cho ô trống, cho
những ô bằng nhau nằm cạnh nhau và cho bàn xếp đúng thứ tự.

Expectimax - Mô phỏng 1.000 ván mỗi mức. Chỉ nhìn trước một nước, 71,5% số ván
đã chạm ô 2048. Nhìn trước hai nước, con số ấy lên gần 96%. Nhưng mỗi lần nhìn
xa thêm một nước, cây lại phình ra cả trăm lần. Muốn mạnh hơn nữa, máy cần một
cách khác. Nó phải tự học.

Phần 5: Cỗ máy tự học

Thay vì tính trước từng nhánh, ta để máy tự chơi hàng triệu ván và tự rút ra bản
nào là bản tốt. Ý tưởng then chốt là chấm điểm đúng lúc. Máy không chấm bàn cờ
sau khi ô mới đã rơi, mà chấm ngay sau khi nó vuốt, lúc may rủi chưa kịp chen
vào. Nhờ vậy, phần quyết định được tách khỏi phần ngẫu nhiên.

Cách học ấy gọi là học sai phân thời gian. Mỗi lượt, máy so điểm nó đoán cho bàn
hiện tại với điểm nó đoán cho bàn kế tiếp cộng với phần thưởng vừa nhận. Chênh
lệch nào cũng được dùng để sửa lại phỏng đoán, từng chút một.

Năm 2014, hai nhà nghiên cứu Ba Lan, Szubert và Jaśkowski dạy máy chơi theo cách
này. Chương trình của họ chạm ô 2048 trong 97% số ván.

Năm 2016, một nhóm ở Đài Loan chia ván chơi thành nhiều chặng, mỗi chặng một bộ
não riêng. Theo các tác giả, lần đầu tiên một chương trình tạo ra được ô 65.536.

Đến năm 2021, các chương trình kết hợp tự học với tìm kiếm đã chạm ô 32.768
trong 72% số ván.

Phần 6: Có thắng mãi được không?

Còn cỗ máy mạnh nhất hiện nay thì sao? Kết hợp tìm kiếm với những bảng tra khổng
lồ tính sẵn, 1.200 ván (2025), nó chạm ô 16.384 trong gần như mọi ván, chạm
ô 32.768 trong 86% và ô 65.536 trong 8,4%.

Tức là ngay cả cỗ máy giỏi nhất, cứ khoảng 12 ván mới có một ván tới
được 65.536. Vì sao không thể thắng mọi ván?

Vì càng về cuối, bậc thang càng chiếm gần hết 16 ô, chỉ còn một hai chỗ trống để
xoay sở. Lúc ấy, một ô mới rơi sai chỗ là đủ khóa chặt cả bàn. Và hãy nhìn lại
bức tường: Bậc thang cuối cùng kín đủ 16 ô. Số ô trên bàn chỉ tăng khi có ô mới,
nên ô thứ 16 chắc chắn là một ô vừa rơi xuống. Trong bậc thang không có ô 2 nào,
nên ô ấy bắt buộc phải là ô 4.

Nghĩa là dù bạn đi hoàn hảo suốt gần 60.000 nước, ở khoảnh khắc cuối cùng, bạn
vẫn phải chờ một lần may, xác suất 1/10.

Bốn hàng, bốn cột, hai luật. Bên trong là một định luật bảo toàn, một cấp số
nhân dựng nên bức tường, và một cây xác suất lớn hơn mọi thứ máy tính có thể
duyệt hết. Lần tới bạn thua một ván 2048, hãy nhớ: mỗi lần chạm được ô 2048, bạn
đã đi gần 1.000 nước liên tiếp đấu với may rủi. Bạn không thể khiến may rủi biến
mất, nhưng toán học chỉ cho bạn cách đứng về phía có lợi của nó.

Nếu bạn thích cách nhìn này, hãy theo dõi Ratio. Hẹn gặp bạn ở video sau.
