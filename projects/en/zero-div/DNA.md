# DNA của `zero-div` — "Why You Can't Divide by Zero" (video bài học, lời đọc)

> Viết TỪ nội dung bài (`CONTENT.md`, `SCRIPT.md`). Khung phong cách: `styleframes.jpg` (bàn thử
> `tools/lab/hole.html`). Mẫu đã chạy: `projects/en/math-30k/DNA.md` (tham khảo, không chép).

1. **Ý trung tâm — "The Hole in the Page".** Cả video là MỘT TRANG GIẤY KẺ Ô, và ở điểm 0 của trục số có **một lỗ
   thủng thật** trên giấy — nhìn xuyên qua là khoảng tối. Bài là một lập luận, không phải dòng thời gian: mọi phép
   tính được viết lên trang này, và cái lỗ luôn ở đó. Lỗ là ô trống giữa 3 và 5 trong "305" (Hồi 1), là hố đen hút
   táo của phép nhân, là chỗ x không tồn tại / mọi x chen nhau rơi vào (Hồi 2), là khe giữa hai nhánh 1/x, là chấm
   rỗng trên đồ thị x/x (Hồi 2), là chỗ trang giấy RÁCH khi ép 1 = 2 (Hồi 3), và là nơi máy tính sống — terminal
   hiện TRONG lỗ (Hồi 3). Kết: các lỗ khác (trừ, chia, căn) được **vá bằng miếng giấy** ghi số âm, phân số, i —
   miếng vá cho lỗ 0 rơi tuột qua lỗ.
2. **Chất liệu / màu mang nghĩa.**
   | vai | màu | ghi chú |
   |---|---|---|
   | giấy kẻ ô | `#F2EEE3`, lưới `#C9D6E3` (ô 48 px), lề đỏ nhạt | hạt giấy sinh từ hash |
   | mực (bút bi) | `#1C2640` | mọi phép tính, chữ viết tay |
   | **đỏ bút chấm bài** | `#C8382A` | CHỈ cái hỏng / cái bị gạch: dấu ✗, gạch đè "= 0", vết rách, "UNDEFINED" |
   | khoảng tối trong lỗ | `#0A0A0D` | có viền giấy dày + bóng đổ vào trong |
   | terminal trong lỗ | chữ `#E6E2D6`, nhấn `#F2C94C` | chỉ Hồi 3 · máy tính |
   | hiện vật dán (Hồi 1) | bảng đất sét, chữ La Mã đóng dấu | dán băng keo lên trang như sổ tay |
   Đỏ = "chỗ này vỡ". Không dùng đỏ cho trang trí. Tương phản: mực/giấy ≈ 13:1, đỏ/giấy ≈ 4.8:1 (đo lại ở khung thật).
3. **Chữ.** Phép tính và nhãn lớn: Archivo condensed 800 (số to), Cormorant nghiêng (tên người, câu trích, "khahara"),
   Plex Mono (terminal, bảng số, nhãn nhỏ ≥ 20 px). Ký tự cần ÷ × − ∞ ≈ ≠ ² → ± — ĐÃ KIỂM: có đủ trong cả 4 font; ✗ KHÔNG có → vẽ tay bằng hai nét đỏ
   (bài trước ∛ ↦ rơi font im lặng). Chữ trên hình là phép tính + từ khoá, không phụ đề.
4. **Nhịp.** Hình bám từ đọc (`kit.lookup`): "seven plus zero" → viết "7 + 0" đúng lúc đọc. Mỗi câu một thay đổi;
   không khung đứng yên > 3 s. Phép tính được VIẾT ra (nét bút lộ dần), sai thì bị **gạch đỏ**, không fade.
5. **Nhân vật — 6 tư thế, ~10% thời lượng, MỘT khung: nửa thân trên** (toàn thân cắt ~45% trên, ngang hông —
   `assets/character-v2/POSES.md`), đứng ở mép khung đáy, ngoài vùng phép tính; bóng lệch đỏ nhạt.
   | tư thế | khoảnh khắc |
   |---|---|
   | `ponder` | "what exactly are you counting?" · "So what went wrong?" |
   | `ok` (mới) | vòng tròn ngón tay = số 0: "zero is not just a placeholder, it is a number" |
   | `shrug` (mới) | "a question with no answer to find" · "It simply isn't there" · NaN |
   | `twoways` (mới) | "plus infinity, or minus infinity? It depends on which side you come from." |
   | `halt` | "You cannot divide by it." |
   | `peace-back` | lời chào cuối |
   `idle` (mới) để dự phòng; `point` ở khung mẫu terminal thay bằng `twoways`/không mascot.
6. **Intro.** Sau "…when nobody needed zero at all.": camera **lao vào lỗ** → đen kín → intro → mở từ đen bằng iris
   ra cảnh người chăn cừu (Hồi 1). Hai mối nối đen–đen.
7. **Camera / chuyển cảnh.** Trang phẳng; chuyển mục = **lật/kéo trang** (trang mới trượt lên, lỗ luôn ở cùng một vị
   trí trên trang mới — lỗ xuyên qua cả xấp giấy). Camera chỉ zoom khi đi vào/ra lỗ (intro, terminal). **Bản 2 (2026-10-22):** thêm `lens()` (kit) đẩy camera vào
   phần đang đọc ở b2 / c3 / d2 — ba đoạn đứng yên dài nhất bản 1 (34 s, 34 s, 27 s); z = 1 ở đầu/cuối cảnh nên chuyển trang
   giữ nguyên. Không còn intro kênh: mở bài lao vào lỗ → đen → iris ra Hồi 1. Mối nối giữa
   p1/p2 có lối ra (LESSONS §36).
8. **Hiện vật / chân dung.** Brahmagupta, Bhaskara: KHÔNG có chân dung → tên viết tay + năm + tên sách, không vẽ mặt.
   Hiện vật có thể dùng lại từ math-30k (`assets/history/`): bản thảo Bakhshali (dấu chấm = số 0), Liber Abaci
   (Fibonacci). Bảng đất sét Babylon: vẽ bằng `wedge` (đã có), dấu giữ chỗ hai nêm nghiêng vẽ tay.
9. **CẤM:** ∞ viết như một con số bình thường mà không gạch đỏ (trừ mặt cầu Riemann, nơi nó hợp lệ); đồ thị vẽ tay
   sai (1/x, x/x, 2x/x, x²/x đều tính bằng hàm); terminal ghi kết quả khác node thật (`CONTENT.md`); chữ fade; chân
   dung bịa; ký hiệu rơi font.
10. **Chỉ số sàn:** "không khung đứng yên > 3 s" áp dụng ngay; sàn khác đặt sau đoạn thử (LESSONS §28).
