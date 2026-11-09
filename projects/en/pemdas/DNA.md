# DNA của `pemdas` — "Is PEMDAS a Law of Math, or Just a Convention?" (video bài học, lời đọc)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md`).
> - Khung phong cách: `styleframes-compare.jpg`, hàng giữa (bàn thử `tools/lab/road.html`).
> - Người dùng chọn phương án B (2026-10-06) trong ba phương án: A bàn chơi (`table.html`), B luật giao thông,
>   C áp phích chữ (`poster.html`).
> - Hai bài trước để tham khảo, KHÔNG chép.

1. **Ý trung tâm — "Rules of the Road".** Chính bài đã so sánh PEMDAS với luật lái xe bên trái hay bên phải. Vì vậy cả
   video là **một con đường nhìn từ trên xuống**.
   - **Biểu thức** được **sơn trên mặt đường** (chữ sơn hơi mòn).
   - **Phép tính** là **biển báo** cắm bên đường. **Hình dạng và màu biển = cấp ưu tiên.**
   - **Đọc trái → phải** = **chiều xe chạy**. Chiếc xe vàng là "người đọc".
   - **Tính một bước:** xe chạy qua một đoạn "a op b", đoạn đó được **sơn lại** thành kết quả.
   - **Bài viral** là một **ngã ba không có biển**: nhánh này ra 9, nhánh kia ra 1. Không ai sai luật, vì luật không
     cắm biển ở đó.
   - **Ngoặc** là **làn ưu tiên có rào** (vạch ngoặc to ôm đoạn đường); xe phải đi hết làn rào trước.
   - **Kết:** "Brackets are the real tool" = rào chắn dựng lên, ngã ba hết mơ hồ.

   Hình theo từng phần:

   | phần | hình |
   |---|---|
   | ACT 1 | biển PEMDAS: cột biển 4 tầng (P, E, MD, AS); 10 − 3 + 2 và 8 ÷ 4 × 2 xe chạy trái → phải, lối rẽ sai bị chặn đỏ |
   | ACT 2 trái → phải | đường xứ chữ viết phải → trái; APL = xe chạy ngược chiều; tháp luỹ thừa = **cầu vượt / đường dốc** đi từ trên xuống (512, không phải 64) |
   | ACT 2 ngoặc | đặt rào thì xe đi đoạn cộng trước; không rào = luật mặc định |
   | ACT 2 nhiều tên | **biên giới**: Anh (BODMAS, xe chạy bên TRÁI), Canada (BEDMAS, bên PHẢI), Mỹ (PEMDAS). Biển khác, đường giống. Đúng ví dụ lái xe của bài |
   | ACT 2 lịch sử | ảnh người dùng tải dán trên **bảng quảng cáo ven đường**: trang La Géométrie, trang Lennes 1917, bàn phím APL |
   | ACT 3 đa thức | đường sạch 3x² + 2x + 1, so với cùng đường **ngổn ngang cọc rào** (3x²) + (2x) + 1 |
   | ACT 3 phân phối | a(b + c) tách làn thành ab + ac |
   | ACT 3 cái thang | **phân cấp đường**: hẻm (+) → đường lớn (×) → cao tốc (^), mỗi cấp gộp nhiều xe cấp dưới: 3 × 4 = 4 + 4 + 4, 4³ = 4 · 4 · 4 |
   | ACT 4 | trở lại ngã ba; máy tính TI đời cũ / đời sau = **hai máy dẫn đường** chỉ hai lối; gạch phân số = **cầu vượt** tách hai tầng (6 ở trên, 2 × 3 ở dưới), hết ngã ba |
   | ACT 5 | màn hình **máy dẫn đường / bảng điều khiển**: Excel (ô bảng tính chung chung), Python, node. Kết: rào ngoặc dựng lên, xe đi một đường |

2. **Màu và hình biển = cấp ưu tiên.**

   | vai | màu / hình | ghi chú |
   |---|---|---|
   | cỏ ven đường | `#3E4A34` + hạt | |
   | mặt nhựa | `#34373C` + hạt đá | vạch biên trắng `#E9E7DF` |
   | vạch giữa | vàng `#F2C230`, đứt | nhường chỗ chữ sơn |
   | chữ sơn | `#EDEBE3`, alpha 0.92 | Archivo 800 |
   | ( ) ngoặc | biển vuông than `#26262B` + vạch ngoặc trắng to trên đường | mạnh nhất |
   | ^ luỹ thừa | biển **tam giác** tím `#7A4FB0` | |
   | × **và** ÷ | biển **tròn** xanh `#2160B0` | cùng hình + cùng màu = cùng cấp |
   | + **và** − | biển **thoi** cam `#E07F22` | |
   | xe (người đọc), kết quả đúng, ✓ | vàng `#E9BE4E` | |
   | **đỏ** | `#D2402F` | CHỈ cái sai: ✗, rào chặn lối sai, kết quả sai |
   | màn hình | `ERA.screen` | máy dẫn đường / bảng điều khiển ở ACT 4–5 |

   Đo tương phản ở khung thật: chữ sơn trên nhựa khoảng 9:1; vàng trên nhựa khoảng 7:1.
3. **Chữ.**
   - Chữ sơn: Archivo 800.
   - Biển báo: Archivo 800 trắng.
   - Nhãn: Cormorant nghiêng, bản LN.
   - Màn hình: Plex Mono.
   - ĐÃ KIỂM: ÷ × − ² ³ → ? có đủ. ✓ và ✗ vẽ tay.
4. **Nhịp.** Hình bám từ đọc (`kit.lookup`).
   - Xe chạy theo lời: xe tới phép nào thì lời đang đọc phép đó.
   - Mỗi bước tính là một lần sơn lại.
   - Không khung nào đứng yên quá 3 s: camera **trôi dọc đường** theo xe, kể cả lúc chỉ nói.
   - Phép sai bị **chặn rào đỏ + ✗**, không mờ dần.
5. **Nhân vật — 6 tư thế, nửa thân**, đứng trên cỏ ven đường như người điều khiển giao thông:

   | tư thế | khoảnh khắc |
   |---|---|
   | `twoways` | "Half the internet swears… nine. The other half… one." (đứng ở ngã ba, chỉ hai nhánh) |
   | `point` | "Here is where I stand." |
   | `crossed` | "Excel gives you plus four." (`startled` chỉ có toàn thân, không dùng) |
   | `shrug` | "the problem is not about who is smarter." |
   | `thumb` | "It is a shortcut. Brackets are the real tool." |
   | `peace-back` | lời chào cuối |

6. **Intro.** Sau câu treo "…remember it slightly wrong", **trời tối**: mặt đường tối dần, chỉ còn vệt đèn xe, đèn xe tắt
   → đen → intro → **trời sáng** trên đoạn đường mới, mở thẻ ACT ONE. Hai mối nối đen–đen.
7. **Camera / chuyển cảnh.**
   - Cùng chất liệu: **camera trượt dọc đường** sang đoạn mới, kèm whoosh. Mục mới = đoạn đường mới, có biển tên mục
     cắm ven đường.
   - Đổi chất liệu (đường ↔ màn hình): zoom vào màn hình máy dẫn đường đặt trên xe.
   - Mối nối giữa p1 và p2 có lối ra (LESSONS §36).
8. **Hiện vật.** Ảnh người dùng tải dán trên bảng quảng cáo ven đường, có bóng đổ.
   - Không chân dung bịa.
   - Máy tính TI, Excel: dạng chung, không logo.
   - Thiếu ảnh thì cảnh đó dùng chữ sơn (tên sách + năm).
9. **CẤM:**
   - kết quả gõ tay: mọi số do code tính, ném lỗi nếu sai (`CONTENT.md`);
   - × và ÷ (hoặc + và −) khác hình hay khác màu biển;
   - đỏ dùng để trang trí;
   - logo thật;
   - terminal ghi khác node/python thật;
   - chữ mờ dần;
   - ký tự rơi về font khác;
   - xe đi ngược chiều, trừ cảnh APL, nơi đó chính là ý của cảnh.
10. **Chỉ số sàn:** "không khung đứng yên > 3 s" áp dụng ngay; sàn khác đặt sau đoạn thử (LESSONS §28).

**Tiếng (docs/lesson/SFX.md):**

| hình | tiếng |
|---|---|
| biển cắm xuống | `pop` |
| sơn lại thành kết quả | `snap` |
| xe chạy qua một phép | `tick` |
| camera trượt sang đoạn mới / xe lướt | `whoosh` |
| đổi chất liệu | `whoosh-long` |
| ngã ba, "= ?" | `question` |
| ✓ | `correct` |
| rào đỏ / ✗ | `error` |
| máy dẫn đường hiện kết quả | `beep` |
| gõ vào máy | `type` |
| "Brackets are the real tool" | `impact` |
