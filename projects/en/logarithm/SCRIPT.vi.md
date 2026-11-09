# Bản gốc của người dùng (2026-10-20) — "BẢN CHẤT CỦA LOGARIT"

Lưu nguyên văn. Bản lời đọc tiếng Anh ở `SCRIPT.md`; chỗ sửa / thêm ghi ở `CONTENT.md`.

0:00 - 0:27 | GIỚI THIỆU

- Giả sử bạn gửi tiết kiệm với lãi suất 8%/năm và tiền lãi cứ thế được nhập vào gốc. Vậy phải mất bao lâu thì số tiền của bạn tăng gấp đôi? Nếu hỏi dân tài chính, họ có thể trả lời bạn gần như ngay lập tức: khoảng 9 năm.
- Bí mật đằng sau phép tính nhẩm đó nằm ở logarit, một ý tưởng toán học ra đời cách đây hơn 400 năm. Logarit không chỉ giúp chúng ta giải quyết những bài toán về lãi suất, mà còn có mặt trong rất nhiều hiện tượng quen thuộc của đời sống. Vậy logarit thực sự là gì?

0:28 - 2:18 | PHẦN 1: CÂU HỎI NGƯỢC CỦA PHÉP LŨY THỪA

- Chúng ta hãy bắt đầu từ một thứ quen thuộc là phép nhân lặp lại. Nếu bạn bắt đầu từ số 1 nhân với 2, rồi nhân tiếp với 2, rồi nhân tiếp với 2, bạn được 8. Chúng ta viết gọn điều này là 2^3 = 8. Con số 3 ở đây cho biết bạn đã nhân với 2 ba lần.
- Phép lũy thừa trả lời một câu hỏi theo chiều xuôi: "Nếu bắt đầu từ số 1 và nhân với 2 ba lần, mình được bao nhiêu?". Câu trả lời là 8.
- Logarit trả lời câu hỏi theo chiều ngược lại: Bạn đã có sẵn con số 8 và bạn muốn biết cần nhân số 2 bao nhiêu lần để tới được 8. Câu trả lời là 3. Người ta viết điều này là \log_2(8) = 3.
- Như vậy, trong logarit có hai nhân vật: cơ số là viên gạch mà bạn dùng để nhân, con số bên trong là đích đến, còn kết quả của logarit chính là số viên gạch bạn cần.
- Hãy thử thêm vài ví dụ:
  - \log_{10}(1000) = 3, vì 1000 = 10 \times 10 \times 10.
  - \log_3(81) = 4, vì 4 số 3 nhân với nhau được 81.
  - \log_5(5) = 1, vì bạn chỉ cần dùng số 5 đúng một lần.
- Có một trường hợp khá thú vị là logarit của 1, với cơ số nào cũng vậy, miễn là số dương khác 1, logarit của 1 luôn bằng 0. Lý do là khi bạn chưa nhân lần nào cả, bạn vẫn đang đứng ở vạch xuất phát, và vạch xuất phát của phép nhân chính là số 1.
- Tương tự, khi con số bên trong nhỏ hơn 1, ví dụ như \log_2(1/8) = -3. Dấu âm ở đây có nghĩa là bạn phải chia cho 2 ba lần thay vì nhân.
- Bạn có thể hình dung logarit như một cái trục và số 1 nằm ở vị trí gốc. Đi về phía lớn hơn thì logarit dương, đi về phía nhỏ hơn thì logarit âm.

2:18 - 3:39 | PHẦN 2: LOGARIT ĐO ĐỘ LỚN THEO BẬC

- Bây giờ, chúng ta thử làm một việc nhỏ. Bạn hãy nhìn vào các số: 10, 100, 1000, 10000. Logarit cơ số 10 của chúng lần lượt là 1, 2, 3, 4. Kết quả này chính là số chữ số 0 đứng sau số 1.
- Từ đó, ta rút ra một cách nhìn rất trực quan và thiết thực về logarit: Logarit cơ số 10 của một số cho bạn biết con số đó to cỡ nào theo bậc. Một số có 4 chữ số, ví dụ như 5000, sẽ có logarit từ 3 đến dưới 4. Một số có 10 chữ số sẽ có logarit từ 9 đến dưới 10.
- Cách nhìn này giúp chúng ta so sánh những thứ có kích thước chênh lệch khổng lồ. Hãy lấy ví dụ về cân nặng: Một con kiến chỉ nặng vài mg, còn một con cá voi xanh có thể lên tới cả trăm tấn. Nếu vẽ hai con số này trên cùng một thước đo thông thường, con kiến gần như biến mất. Nhưng nếu dùng logarit, bạn chỉ cần đếm bậc và sẽ thấy khoảng cách giữa chúng chỉ khoảng 11 bậc của 10. Con số 11 dễ hình dung hơn nhiều so với con số 100 tỷ. Đây chính là điểm cốt lõi: Logarit giúp thu nhỏ những con số khổng lồ hoặc cực kỳ bé thành những giá trị vừa tay, dễ hình dung và so sánh với nhau hơn.

3:39 - 5:10 | PHẦN 3: BIẾN PHÉP NHÂN THÀNH PHÉP CỘNG

- Tính chất nổi tiếng nhất của logarit là \log_a(bc) = \log_a(b) + \log_a(c). Nếu bạn nhìn theo cách đếm viên gạch ở phần đầu, nó gần như là điều hiển nhiên.
- Giả sử bạn lấy 8 nhân 4. Số 8 là số 2 được nhân 3 lần, số 4 là số 2 được nhân 2 lần. Khi nhân 8 với 4, bạn đang gộp tất cả các viên gạch lại và tổng cộng bạn có 5 lần nhân với 2. Kết quả là 32, và \log_2(32) = 5, tức 3 cộng 2.
- Nói cách khác, số viên gạch của một tích bằng tổng số viên gạch của từng thừa số. Với phép chia, logarit chuyển thành phép trừ. Chia cho một số nghĩa là gỡ bớt đi đúng số viên gạch của số đó.
- Tính chất này từng có giá trị cực kỳ lớn trong lịch sử. Vào năm 1614, nhà toán học John Napier công bố công trình đầu tiên về logarit. Thời đó chưa có máy tính, các nhà thiên văn, hàng hải phải nhân những con số rất lớn bằng tay, tốn nhiều thời gian và dễ sai. Logarit là một đường tắt: Người tính chỉ việc tra logarit của từng số trong bảng, cộng chúng lại, rồi tra ngược bảng để tìm kết quả. Một phép nhân khó được thay bằng một phép cộng dễ. Ngày nay ta có máy tính nên không cần dùng bảng nữa, nhưng ý tưởng biến nhân thành cộng vẫn còn nguyên giá trị.

5:10 - 7:21 | PHẦN 4: NHỮNG THANG ĐO LOGARIT QUANH CHÚNG TA

- Khi một đại lượng có thể thay đổi từ rất nhỏ tới rất lớn, người ta thường đo nó bằng thang logarit. Ví dụ như động đất: Các thang đo từ Richter ban đầu cho tới thang độ lớn mô-men mà các nhà địa chấn học dùng hiện nay đều là thang logarit. Mỗi khi độ lớn tăng thêm 1 đơn vị, biên độ rung của mặt đất tăng khoảng 10 lần và năng lượng giải phóng tăng khoảng 32 lần. Một trận động đất độ lớn 7 không chỉ mạnh hơn một chút so với trận độ 6, mà nó giải phóng năng lượng gấp 32 lần.
- Ví dụ thứ hai là độ to của âm thanh, đo bằng decibel (dB). Cường độ âm thanh giữa ngưỡng nghe được nhỏ nhất và âm thanh gây đau tai chênh nhau tới khoảng 1000 tỷ lần. Thang decibel dùng logarit để gói khoảng chênh lệch đó vào một dải số từ 0 đến 120. Cứ mỗi 10 dB tăng thêm, cường độ âm thanh tăng gấp 10 lần.
- Ví dụ thứ ba là độ pH, chỉ số ta hay gặp khi nói về nước uống hay đất trồng. Độ pH được tính dựa trên logarit của nồng độ ion hydro kèm theo một dấu trừ. Nước tinh khiết có pH bằng 7, nước chanh có pH khoảng 2. Khoảng cách 5 đơn vị này có nghĩa là nồng độ ion hydro trong nước chanh cao hơn khoảng 100.000 lần so với nước tinh khiết.
- Có một điều thú vị là chính các giác quan của chúng ta dường như cũng hoạt động theo kiểu logarit. Khi bạn đang nâng thanh tạ 10 kg, lắp thêm 1 kg là thấy nặng hơn ngay. Nhưng khi thanh tạ nặng 100 kg, lắp thêm 1 kg thì bạn gần như không cảm thấy gì. Để cảm nhận được sự khác biệt tương đương, bạn cần lắp thêm khoảng 10 kg. Vì thế, các thang đo logarit như decibel khớp khá tốt với cảm nhận tự nhiên của con người.

7:21 - 8:47 | PHẦN 5: SỐ E VÀ LOGARIT TỰ NHIÊN

- Bạn có thể thắc mắc vì sao trong toán học có một loại logarit được gọi là "logarit tự nhiên", ký hiệu là ln, với cơ số là một con số khá lạ, vào khoảng 2,718. Con số này được gọi là số e.
- Để hiểu số e, hãy nghĩ tới sự tăng trưởng. Giả sử bạn gửi 1 triệu đồng với lãi suất 100% mỗi năm. Nếu ngân hàng tính lãi một lần cuối năm, bạn có 2 triệu. Nếu chia ra tính lãi hai lần, mỗi lần 50%, bạn có khoảng 2,25 triệu. Nếu tính lãi hàng tháng, hàng ngày, hàng giờ, số tiền cuối năm không tăng vô hạn mà tiến dần tới một giới hạn là khoảng 2,718 triệu đồng. Con số đó chính là số e.
- Số e là số lần gấp lên khi tăng trưởng 100% một cách liên tục trong một đơn vị thời gian. Logarit tự nhiên trả lời câu hỏi ngược lại: Muốn số tiền gấp lên bao nhiêu lần thì phải chờ bao lâu? Logarit tự nhiên của 2 vào khoảng 0,693, nghĩa là với tốc độ tăng trưởng liên tục 100%, số tiền cần khoảng 0,693 đơn vị thời gian để gấp đôi. Nếu tốc độ tăng chỉ là r% thay vì 100%, thời gian cần thiết sẽ dài ra là 69,3 chia cho r. Từ đó, chúng ta có một mẹo nhỏ rất được dân tài chính yêu thích, gọi là Quy tắc 72 (thực tế là 69,3 được làm tròn lên để dễ tính nhẩm).

8:48 - 10:45 | KẾT THÚC

- Logarit hóa ra không có gì bí ẩn. Nó chỉ là câu hỏi ngược của phép lũy thừa: Cần bao nhiêu viên gạch để tới được đích đến? Nhưng từ câu hỏi đơn giản đó, chúng ta có cả một công cụ để đếm bậc và để đo những thứ thay đổi quanh mình.
- Bạn hãy nhớ: logarit thu nhỏ những con số khổng lồ hoặc cực kỳ bé thành những giá trị vừa tay. Đồng thời, nó biến các phép nhân/chia khó nhằn thành phép cộng/trừ đơn giản.
- Hy vọng sau video này, bạn đã hiểu thêm về logarit. Cảm ơn bạn đã theo dõi và hẹn gặp lại bạn trong những video tiếp theo!
