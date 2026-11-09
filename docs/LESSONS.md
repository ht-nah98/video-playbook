# LESSONS — sai lầm đã trả giá

Mỗi mục là một lỗi THẬT, kèm cách phát hiện. Đọc trước khi lặp lại chúng.

## Chỉ mục theo chủ đề

Số mục KHÔNG đổi (CRAFT và tài liệu khác dẫn theo số). [MV] = rút từ MV ca nhạc, [BH] = từ video bài học, [chung] =
đúng mọi dạng; "→ CRAFT §x" = đã thành luật ngắn ở `docs/CRAFT.md`. Mục bị gộp/thay vẫn giữ, có dòng ghi chú ở đầu.

| nhóm | mục |
|---|---|
| Quy trình & duyệt | §272 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §1 kịch bản trước visual [chung] → CRAFT §1 · §2 sửa nguyên nhân, đừng vứt kỹ thuật [chung] → CRAFT §8 · §3 đọc repo = năng lực dùng được [chung] → CRAFT §8 · §9 biết khi nào dừng tối ưu [chung] → CRAFT §8 · §11 kỹ thuật dùng quá / bỏ hẳn [MV] → CRAFT §8 · §23 nháp → kế hoạch → so md5 [MV] → CRAFT §8 · §28 chỉ số sàn sau chất liệu [chung] → CRAFT §1 · §29 review độc lập trước render [chung] → CRAFT §8 · §31 khung phong cách thật [chung] → CRAFT §1 · §49 "B + mượn ý A" nói lại phạm vi [chung] · §88 lời gọi tên màu trước khi chọn DNA [BH] · §91 bản địa hoá ≠ dịch; nguồn người dùng cũng soát [BH] · §107 cắt độ dài mồ côi lời hứa [BH] → CRAFT §1 · §111 gói đăng làm sau render → làm lại mở đầu [BH] → CRAFT §1 · §116 gói trước lời: bài đầu tiên chạy đúng thứ tự [BH] → CRAFT §1 · §122 quét đạo diễn mỗi 10 s + reviewer lệch mốc [BH] → CRAFT §4 · §124 đề tài tên chương: kéo câu KHÔNG THỂ trong bài lên 0:00 [BH] → CRAFT §11 · §126 video Anh trọn quy trình một phiên [BH] → CRAFT §8b · §131 tin nhắn người dùng dừng agent nền [chung] → CRAFT §8b · §134 toàn quyền: sửa song song chia theo file [BH] → CRAFT §8b · §160 tải hàng loạt từ YouTube (yt-dlp) → bị chặn IP, người dùng lo cho kênh: không tải hàng loạt [chung] · §161 đúc kết nhiều nguồn: soát ý trước, ý lớn không nén thành một dòng (người dùng bắt) [chung] · §187 tập thử bắt đầu từ ĐẦU chuyện (mở bài + bối cảnh), độ dài theo nội dung [chung] → CRAFT §10 · §190 học mẫu: soi dải khung từng đoạn trước khi dựng [chung] → channels/hist/PIPELINE · §205 đề tài kèm lời hứa video lớn không có + DNA nhận ra trong 5 s [chung] → channels/hist/PLAYBOOK |
| Đo & QA | §274 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §252 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §242 cú máy < 1 s sau trailer, hình vẽ chớp giữa phim [hist] → EDITING, motion.py · §241 đo cả kho bằng motion.py, bản song song để chọn [hist] → tools · §238 đo đứng yên / nền trống / tỉ lệ ảnh thật trên video [hist] → EDITING · §237 không subagent: QA vẫn là lượt riêng cỡ thật, theo bảng mục, ghi file [hist] → CRAFT · §232 trích ảnh fps=1/n lệch n/2 s, QA dài ghi file ngay [chung] → tools/hist/frames.py · §233 nhãn ngày khớp ngày của ảnh [hist] → EDITING · §4 chạy được ≠ đúng [chung] → CRAFT §8 · §5 đừng kiểm bằng chính giả định [chung] → CRAFT §2 · §7 regex sửa hàng loạt bỏ sót [chung] → CRAFT §4 · §8 đo từng phần trước [chung] → CRAFT §8 · §10 chọn sai phân vị [MV] · §12 độ phân giải đo quá thô (gặp lại §38b) [chung] → CRAFT §4 · §15 kết luận chất liệu từ ảnh thu nhỏ [chung] → CRAFT §4 · §20 công cụ im lặng bỏ qua lỗi [chung] → CRAFT §4 · §38 kiểm đúng đơn vị, kiểm bộ kiểm [chung] → CRAFT §9b · §39 lệnh nền 30 phút [chung] · §136 hoạt ảnh nhân vật mới phải qua bàn thử người dùng duyệt [BH] → CRAFT §7 · §138 gác hoạt ảnh mọi khung, trượt khi NaN (lặp lại §38, §20) [chung] → CRAFT §7 · §152 trung bình cả khung bỏ sót nhân vật nhỏ — đo theo vùng (cadence --roi) [chung] · §154 nhập thư viện tư thế: test từng mục, ô trống trên bảng là lỗi [chung] · §155 bộ kiểm suy từ lệnh vẽ = cảnh báo; mẩu chữ = nội dung + font [BH] · §159 dời thư mục: golden trước/sau; viết lại đường dẫn chỉ chạm đích đã dời, không chuẩn hoá [chung] · §164 numeric QA xanh nhưng animation vẫn cứng: onion-skin + clip tốc độ thật [chung] → CRAFT §7 · §165 repo có chữ stickman chưa chắc là animation system [chung] → CRAFT §8 · §166 model sheet phải là một nguồn cấu hình duy nhất [chung] → CRAFT §7 · §167 Stick dùng ở ranh giới editor → frame sequence, không nhúng runtime [chung] → CRAFT §8 · §168 limb cong là hình học renderer, không chỉ là easing [chung] → CRAFT §7 · §171 làm lại mẫu: đặt cạnh nhau cùng giờ mới lộ lệch nhịp + biên độ [chung] · §227 QA độc lập cỡ thật bắt buộc kể cả khi tự làm (lặp ×3); cảnh trống chờ từ (lặp §130) [chung] → CRAFT §4 §5 · §229 lớp phủ trên ảnh zoom tính theo toạ độ ảnh [chung] → channels/hist/EDITING |
| Tất định & hạ tầng render | §268 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §260 render nghẽn ở chụp PNG → `--raw` + `par.py` (19 phút → 43 s); ghép chỉ hình, độ dài chính xác [chung] → channels/hist/PIPELINE · §6 lỗi hạ tầng làm phép đo vô nghĩa [chung] → CRAFT §4 · §16 giải mã ảnh phá tất định [chung] → CRAFT §3 · §18 shatter một bộ đệm [MV] → CRAFT §3 · §19 bẫy shell zsh, pkill -f [chung] → CRAFT §8 · §22 ghép: chép hình, audio AAC [chung] → CRAFT §8 · §30 bẫy shell mới — đã gộp §19 [chung] · §33 render lấy nhạc mặc định — đã gộp §60 [BH] · §46 cache đoạn render so với nguồn [BH] · §52 đóng băng nguồn trước render [BH] → CRAFT §8 · §53 kit trả cùng kiểu; sprite mờ [BH] · §60 mặc định nguy hiểm phải bị chặn [chung] · §135 chạy công cụ không tham số để xem usage = chạy thật [chung] → CRAFT §8 · §70 must() ở khung chuyển tiếp; chạy khô [BH] → CRAFT §8 · §93 bước rẻ ở cuối chạy thử trước render [BH] → CRAFT §8 · §97 thư mục lồng: .gitignore, agent mới, prog NaN [chung] · §98 pkill nhóm khác, mặc định ghi đè, split p1 [chung] → CRAFT §8b · §102 `--t` là giờ trang (LEAD) [BH] → CRAFT §4 · §106 ước lượng từ số đo; sheet.py im lặng; LLM ngoài cần quyền [chung] → CRAFT §8 · §108 màu phổ: kiểm cặp lời đọc so [BH] → CRAFT §1 · §115 sửa một phần bài cũ: module chung đổi → `--keep`; dữ liệu "chơi thật" sinh bằng node import kit [BH] → CRAFT §8 · §119 tự lấy ảnh: Chrome headless chụp trang / PDF, cắt quảng cáo [chung] → CRAFT §10 · §121 `pgrep -f` + kill tự giết shell (lặp §19) [chung] → CRAFT §8 · §127 shadowBlur không tất định theo thứ tự khung → sprite [BH] → CRAFT §3 · §173 so trước/sau = hai lần render cùng phiên, không so ảnh cũ trên đĩa [chung] · §178 script ghi file lỗi giữa chừng làm rỗng STATUS.md và commit luôn — kiểm rồi mới mở ghi, đọc --stat sau commit [chung] · §180 ghi lên YouTube bị auto mode chặn → script --dry-run + idempotent + `!`; playlist mới tạo trả 404, chạy tiếp bằng ID [chung] · §192 zsh `set --` lần 3 → `while read`; dừng render chuỗi cũ khi đổi mốc; render song song theo đoạn [chung] → CRAFT §8 · §202 tách đồ nghề ra kit thì xoá bản chép; không chèn code vào dòng có chú thích; refactor = md5 khung [chung] → CRAFT §8 · §203 xoá chỉ sau `&&` của bước kiểm; ffmpeg trong vòng lặp `-nostdin`; shoot.js kẹp --to [chung] → CRAFT §8 |
| Mốc thời gian | §259 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §236 viết tắt trong lời đọc sai (RAF → raft) [hist] · §21 mốc đo trên giọng, không RMS [MV] → CRAFT §2 · §25 câu lặp tra ra lần đầu [MV] → CRAFT §2 · §27 lời Suno đếm sai câu hô [MV] → CRAFT §2 · §59 từ lặp trong câu; prog b < a [BH] · §80 whisper khác: phân loại, tổng hợp lại; tên biến một chữ [BH] · §92 whisper ja: dạy bộ so, hai lần hỏng thì viết lại [BH] · §109 chú âm từ khoá trước take; redo đổi chữ → grep plates [BH] → CRAFT §9b · §120 cụm Nhật hỏng 2 lần: 誤謬, số đầu câu, の nuốt [BH] → CRAFT §9b · §129 độ dài bản Anh = số từ ÷ 190 [BH] → CRAFT §8 · §150 công cụ chạy lại thiếu phạm vi ghi đè cả kịch bản — nhớ phạm vi theo --out [BH] · §151 OmniVoice + align song song sập VRAM — align tự chặn [BH] · §153 chuyển hồi cắt đuôi câu trước: luật FROM có sẵn trong BRIEF mà không theo (lặp lại) [BH] · §177 đọc lại lời một cảnh mà giữ mốc cũ: chuyển động 0.03 s / sai chữ / không bao giờ hiện — viết lại bảng mốc + throw [BH] |
| Mối nối & chuyển cảnh | §17 ranh giới cảnh tắt cứng [MV] → CRAFT §6 · §26 nối liền mang theo mọi thứ [MV] → CRAFT §6 · §36 mối nối giữa hai trang [BH] → CRAFT §6 · §47 nền tràn + trượt = cắt cứng [BH] · §50 cùng bố cục + trượt = hình nhân đôi [BH] · §64 luật FROM (một công thức) [BH] · §194 người / vật giữ chỗ + cỡ qua các cảnh liền nhau cùng nơi [chung] → channels/hist/EDITING · §197 cận mặt người dẫn chỉ là phản ứng ≤ 1.2 s; lúc kể hình phải minh hoạ câu [chung] → channels/hist/EDITING |
| Bố cục / chữ / màu | §13 bảng màu chung vs nền cảnh [chung] → CRAFT §5 · §14 hiệu ứng nở ra ngoài: tính trước [MV] → CRAFT §5 · §24 camera cần cảnh giàu vật [chung] → CRAFT §5 · §32 vùng an toàn, chữ đè nhân vật [chung] → CRAFT §5 · §35 font thiếu ký tự, số kiểu cổ [chung] → CRAFT §5 · §56 giới hạn ô chữ phải đo [BH] → CRAFT §11 · §61 màu nghĩa ≠ màu nhấn [BH] → CRAFT §5 · §63 khung đầu cảnh trống [BH] · §68 thẻ mục + nội dung cuộn [BH] · §69 DNA không font: đủ glyph [BH] · §81 tách nền: mảng sót xoá theo vùng [chung] · §96 lời Nhật chậm → mỗi 3 s một テロップ [BH] · §100 bàn "đang chơi" theo đúng luật [BH] → CRAFT §1 · §188 vật / nơi = ảnh đời thật CC0 / PD ghép vào, không vẽ giả [chung] → channels/hist/EDITING · §193 edit: ảnh = vật trên nền, cỡ chuẩn, cutout đúng tỉ lệ, một kiểu bản đồ (study 16) [chung] → channels/hist/EDITING · §223 bản đồ nói Ở ĐÂU, cận cảnh nói CÁI GÌ — vật phải tự đọc ra nghĩa không cần lời [chung] → channels/hist/EDITING · §228 bản đồ lịch sử: dữ liệu thiếu đảo, kinh tuyến 180°, cos theo file — bàn thử đặt sẵn ghim [chung] → channels/hist/EDITING |
| Nội dung đúng toán | §34 kịch bản chặt nhịp hình [BH] → CRAFT §9b · §48 soát cả câu khẳng định rộng [BH] · §54 thang mã hoá số [BH] · §57 dụng cụ đúng lời đọc [BH] · §58 đỏ chỉ chạm chữ sai [BH] → CRAFT §5 · §62 "hỏng khi bỏ luật" ≠ sai [BH] → CRAFT §5 · §67 ô mang biến ≠ giá trị [BH] · §79 ví dụ đời thường soát bằng toạ độ [BH] · §87 nhiều video nguồn: mạch + dữ liệu gốc; câu về một trường hợp kiểm trên dữ liệu đó [BH] · §101 số thí nghiệm của video nguồn: gán đúng chủ [BH] → CRAFT §1 · §103 chiều đối quang lần theo cả chuỗi [BH] → CRAFT §1 · §117 kịch bản nêu cơ chế → mô phỏng bằng code; mỗi hồi một mô hình [BH] → CRAFT §1 · §118 ảnh chụp nguồn phải ghi ĐÚNG con số được đọc [BH] → CRAFT §1 · §132 số trong brief chép bằng code; reviewer đối chiếu thẻ số với câu đọc [BH] → CRAFT §1 · §94 cận làm tròn sai hướng [BH] → CRAFT §1 · §182 lời "quá AI, ngắt ngắt" — lặp §34: viết theo nhịp cắt hình; chặn bằng `script_check.py` [chung] → CRAFT §9b · §191 kịch bản sự kiện thật: agent soát sử độc lập trước khi đọc giọng [chung] → CRAFT §9b · §224 số Wikipedia cũng sai, phép tính ngày bằng code; soát sử độc lập bắt 9 chỗ (lặp §191) [chung] → channels/hist/PLAYBOOK |
| Giao việc song song | §40 mốc tạm + brief + review [BH] · §44 chỗ giao giữa hai người [BH] → CRAFT §6 · §71 vật dùng chung giữa các nhóm [BH] → CRAFT §6 · §82 mốc brief tính từ FROM thật [BH] · §83 cảnh import cảnh = kit thiếu vật [BH] · §85 kit + một cảnh mẫu + 9 nhóm [BH] · §89 hàm kit thử ở k dở dang [BH] · §90 brief cũ; quên CONTINUES [BH] · §95 luật đo được để kit giữ, không để brief giữ [BH] → CRAFT §6 · §104 model theo việc, ≤ 4 agent [chung] → CRAFT §8b · §110 sửa qua agent cũ; trần tỉ lệ mỗi loại tiếng [BH] → CRAFT §8b · §130 nhãn tí hon = pop-in dở dang; bật ở từ đầu cụm [BH] → CRAFT §4 · §133 glyph dễ nhầm (ln/In) kiểm bằng mắt ở kit-test [BH] → CRAFT §5 · §209 tập 13 phút: 5 agent theo brief + QA độc lập bắt sai sự thật trên hình; vai / đạo cụ chung vào common.js trước khi giao (lặp §71) [chung] → channels/hist/PIPELINE · §222 dựng song song lần 2 bỏ QA độc lập (lặp lại §209) → người dùng bắt 4 lỗi: nhãn/mặt bản đồ lệch vùng, vật co thành "que", chữ tràn ô [chung] |
| Âm thanh | §45 đo bằng phổ, duyệt bằng tai — thay bởi §65 + SFX.md [BH] · §51 hạn mức tiếng: trần cả video (luật gộp) [BH] · §55 cộng hạn mức — đã gộp §51 [BH] · §65 đo mức từng loại, hỏi tai [BH] · §66 cộng hạn mức (lần 2) — đã gộp §51 [BH] · §99 trần tiếng bằng số từng cảnh, giữ cả trần dưới [BH] → CRAFT §9 · §156 tiếng tổng hợp: khớp trọng tâm phổ + RMS thư viện trước khi cho nghe [BH] · §185 giọng clone đã nhanh + speed 1.2 → nuốt chữ; speed theo từng giọng, whisper nghe lại [chung] · §186 tiếng: CC0 / PD trên mạng trước, tự tạo sau (đo phổ — lặp §156) [chung] → channels/hist/PIPELINE · §195 sting tự tạo "lạc quẻ" (lặp §156 §186); tiếng chỉ kèm việc nhìn thấy, 6–12 / phút, im lặng là hiệu ứng [chung] → CRAFT §9 · §199 làm lại tiếng bằng agent: SFX-PLAN từng dòng, cue riêng, hush, khung giờ [chung] → channels/hist/EDITING · §201 mốc tiếng = script theo từ (cues_v6.py), `end` cho nền dài, nhạc theo đoạn [chung] → channels/hist/EDITING · §208 câu trích dài giữa dòng bị TTS nuốt → dòng riêng (script_check cảnh báo) [chung] · §211 nhạc dưới lời: không piano chạy nốt; nhạc gen ngắn lặp có nối chéo (mix.py loop_to, `from`) [chung] → channels/hist/PLAYBOOK |
| 3D (studio3d) | §295 quên kỹ thuật đã đúc kết là lỗi CƠ CHẾ, không sửa bằng lời hứa: sổ năng lực tools/qa/capabilities.json + test (lối vào phải còn gọi thư viện) + hook tạo file mới / mở phiên in sổ; ngay lần chạy đầu bắt thêm finish.sh, run_set.sh lạc khỏi bản đồ [chung] → AGENTS Harness · §294 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §293 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §292 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §291 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §290 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §289 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §288 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §287 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §286 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §285 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §284 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §283 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §282 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §281 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §280 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §279 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §278 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §277 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §276 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §265 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §266 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §271 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §270 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §269 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §267 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §264 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §263 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §262 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §261 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §256 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §257 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §258 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §72 GPU rơi về CPU im lặng [chung] (nay là cờ `shoot.js --gpu`) · §73 lời phải lên hình, nhịp dày [MV] → MEDIUM · §74 trạng thái three.js rò giữa khung [chung] → CRAFT §3 · §75 bề rộng chữ khối đo từ dữ liệu [MV] · §76 zsh `set --` không tách từ [chung] · §77 3D không mặc định tốt hơn [chung] → MEDIUM · §78 không gian là nội dung → 2D + 3D chiếu [BH] → MEDIUM · §84 render 3D chiếu chậm, báo thời gian [BH] |
| Nhân vật | §308 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §307 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §306 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §305 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §304 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §303 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §302 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §273 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §253 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §235 tạo hình theo công thức, đồ theo thời kỳ, chiều mày [hist] → CHARACTER · §234 đồ đúng phe + đúng thời, mũi tên theo toạ độ [hist] → EDITING · §81 tách nền: mảng sót xoá theo vùng [chung] · §86 mascot nói trên tư thế toàn thân (talk.js, mouths.js) [BH] → CRAFT §7 · §137 hoạt ảnh: đạo diễn tư thế, IK chỉ khoá chân, bản đồ bước [chung] → CRAFT §7 · §148 người que khăn đỏ: đầu to ngoài tầm tay, nối hai lượt đi, đích tay ngoài tầm [chung] · §149 tỉ lệ nhân vật phải cho phép mọi dáng cơ bản (giơ tay qua đầu) — thử dáng khó trước khi duyệt [chung] · §157 người que mặc áo khối + bản tạm bỏ quy trình chuyển động → cứng, xấu (lặp lại §136–138) [chung] · §158 người dẫn mảnh giữa cast dày + nhún hông liên tục → trông ngốc [chung] · §169 chi cong qua khớp phình ở gập gắt; IK chân quỳ chọn sai phía [chung] · §170 tay ngắn + đầu to: giãn tay theo dáng, không kéo dài chung [chung] · §172 chi mềm nhưng thân thẳng → vẫn cứng: thân hai đốt + curl; soi mọi bộ phận một lần [chung] → CRAFT §7 · §175 người que chỉ vào khi LÀM việc với vật ở sự kiện quan trọng; chỉ/gật theo từng câu = "cho có" [BH] → CRAFT §7 · §176 tay ngắn: vác qua đầu → vật lơ lửng (lặp lại §148 §149 §170); gác tầm với trong code bắt 165 khung ảnh chụp bỏ sót [chung] → CRAFT §7 · §183 ghép đầu ảnh thật lên thân vẽ: đo tay 4 mốc, mặt nạ trứng + vòm tóc theo tóc thật, cỡ theo diện tích mặt, mốc cằm [chung] · §184 ảnh nhân vật AI: hiệu ứng vẽ dính người không tách được, mũ theo cảnh trước — câu khoá prompt [chung] → channels/hist/CHARACTER · §189 dân = người đầu tròn (đậu trơn = "con ma"); sát thủ vẽ, ảnh thật chỉ giới thiệu [chung] → channels/hist/CHARACTER · §196 người dẫn bán thân nhỏ ở góc + nhép miệng (vùng miệng ghép lên một ô gốc) [chung] → channels/hist/EDITING · §198 mascot ảnh chi tiết không hoà cảnh → người dẫn vẽ nét bằng code (kit narrator.js) [chung] · §200 người dẫn trong sự kiện = HÌNH (thay 1 người trong nhóm), không câu "I was there"; ví dụ ≠ danh sách bắt buộc; chưa hiểu → hỏi [chung] → CRAFT §10, WRITING §1c · §204 nhập vai ≈ 1 / 1–1.5 phút cạnh sự kiện quan trọng (nhóm kín, đám đông) [chung] → PLAYBOOK §3 · §207 một khung một chất liệu nhân vật; người thật không ghép vào cảnh vẽ [chung] → CHARACTER §2b · §210 đồ phụ gần mắt đọc thành mắt; luật outfit bằng danh sách dương [chung] → channels/hist/CHARACTER · §219 bọc mascot lên khung người que = dáng quái dị → mascot chỉ diễn dáng góc thẳng của chính nó [BH] → CRAFT §7 · §220 xoay 3/4 bằng chiếu khối cầu (đầu) + khối trụ (thân); quay thân mà vai/tay đứng yên → người dùng bắt ngay [chung] → CRAFT §7 · §221 "X trước, Y sau" → Y ghi vào STATUS còn chờ ngay, đừng để người dùng phải hỏi [chung] |
| Xuất bản & người dùng | §301 công thức title thành luật chung mọi kênh `docs/TITLE.md` (6 khuôn, phép thử câu hỏi, sổ ví dụ); trig: câu của chính lời làm câu đố [chung] → docs/TITLE.md · §300 title đúng công thức vẫn chán: áp khuôn như điền chữ → mỗi title kèm CÂU HỎI người xem tự hỏi, móc = chi tiết ngược đời có thật trong lời, ≥ 8 phương án [chung] → channels/hist/PACKAGING §2 · §299 ghi đè ảnh cùng tên → trình duyệt hiện bản cũ; ảnh cận đầu trang bị tưởng là thumbnail → trang xem: sản phẩm trọn khung trước, `?v=N` [chung] → channels/hist/PACKAGING §6 · §298 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §297 giao thumbnail không kèm title (người dùng nhắc combo) → thumbnail = combo, `tools/thumb/check.py --pair` chặn trùng từ khoá [BH] → CRAFT §11 · §296 A/B zero-div bản không anime thắng 58,6 % (chưa chắc, title cũng khác) → thumbnail λ gọn; đổi một thứ để BIẾT, combo để CHỌN [BH] → channels/en/CHANNEL · §275 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §254 gói đăng soát bằng code, Shorts + phụ đề 10 ngôn ngữ qua API [BH] → CRAFT §11, PACKAGING · §251 (bản riêng — mục về phần không nằm trong bản chia sẻ) · §250 mở bài nhanh, tư liệu thật, mốc đầu câu phải duy nhất [en] · §249 "học theo X": nghiên cứu trước khi dựng, bản xấu tự bỏ [en] · §248 canvas đệm cho đoạn chen; đổi kịch bản phải dời số câu [BH] · §247 ký tự chỉ biểu cảm, không tương tác; mascot là người dẫn; đọc study 16 [en] → AGENTS · §246 kênh Anh bỏ người que: cặp số 99 + nền sáng + thẻ [en] → AGENTS · §245 kênh toán Anh: một hệ hình cố định cả kênh, ngoại lệ của §218 [en] → AGENTS · §244 công thức video toán mới: lát cắt 5–30 s, người que vai pi creature [en] → channels/en/CHANNEL · §243 kênh Anh đổi hướng sau logarithm 0,7% CTR [en] · §239 mở video bằng trailer dựng nhanh [hist] → EDITING · §240 phim tư liệu PD chèn theo câu [hist] → EDITING, film.py · §37 SRT trùng tên cạnh video [BH] → CRAFT §9b · §41 không gửi danh tính ra ngoài [chung] → CRAFT §10 · §42 ô nhập nền tảng có giới hạn [BH] → CRAFT §11 · §43 chương cuối ≥ 10 s [BH] · §105 thumbnail: đối quang là ảnh gương, xem 336 px, chừa góc nhãn giờ [BH] → CRAFT §11 · §112 "1000 giờ": công sức phải thật, không thì viết thành so sánh [BH] → CRAFT §1 · §113 thumbnail: mascot nhỏ, đối lập bằng MÀU [BH] → CRAFT §11 · §114 title lặp chữ thumbnail = phí một móc [BH] → CRAFT §11 · §123 thumbnail đạt lần đầu: cỡ ở đầu prompt + khung 0.5 s làm tham chiếu [BH] → CRAFT §11 · §125 chấm cặp thumbnail ↔ title ngay lúc đề xuất [BH] → CRAFT §11 · §128 phụ đề: spoken.json trước publish, viết tắt toàn hoa [BH] → CRAFT §9b · §144 gói quy trình mới CTR 1.34% vs 3.12% video cũ: title hứa cái người xem nhận / đang hiểu sai, ngôi "you" [BH] → CRAFT §11, PACKAGING §2 · §145 Shorts không thành sub, sai khán giả VN, Related video không được làm (lặp SHORTS §5) [BH] → SHORTS §5 · §146 không có khán giả quay lại: kết bằng một video tiếp theo cụ thể [BH] → PACKAGING §7 · §162 người dùng không mở được link claude.ai → bản xem chạy local [chung] · §174 link local: curl đúng URL đầy đủ trước khi báo (cổng bị server cũ chiếm) [chung] · §179 đổi @handle: link @ cũ hỏng, tên + handle khoá ~14 ngày — đổi cùng lúc, sửa link ngay [BH] · §181 kiểm playlist bằng API: video kênh khác / đã xoá / private cũ; video mạnh nhất đầu rồi lộ trình [BH] → PACKAGING §7 · §206 thumbnail kênh sử: dựng theo công thức kênh thắng từ dàn nhân vật, không ảnh AI điện ảnh [chung] → PLAYBOOK §0b · §212 nhận diện kênh = cả kênh, không theo tập đầu; lấp đủ banner [chung] → channels/hist/BRAND.md · §213 tên kênh: dò trùng API, tên ghép tự đặt, handle khớp tên [chung] · §214 chữ để dán → dán nguyên văn trong câu trả lời; gói Education có Problems [chung] · §215 cài kênh: quốc gia thật, khai giọng clone, danh mục đo theo ngách [chung] → STUDIO-SETUP · §216 thumbnail mascot vẽ nét: đo MẶT ở 168 px (≈ 40% cao khung), khung cắt theo việc [BH] → PACKAGING §1 · §217 thumbnail sinh từ thế giới của video + mascot làm gì trong đó; A/B = 1 bản bối cảnh video + 2 thế giới khác [BH] → PACKAGING §1 · §218 DNA linh hoạt: không biến lựa chọn một lần thành khuôn (lặp ×3) [chung] → CRAFT §0 · §225 tài sản dùng lại của KÊNH: thư viện nhạc, bản đồ thời đại vào kit, gợi ý tìm kiếm YouTube thay vidIQ [chung] → channels/hist/PLAYBOOK · §226 sản phẩm (gói đăng, video) luôn ở out/; kênh không có công cụ build → đối chiếu AGENTS/MAP, không chép tiền lệ [chung] → channels/hist/PIPELINE · §230 nhận diện: watermark tách alpha hai nền, avatar căn từng biến thể, biểu cảm / mũ thêm kit kiểu cộng [chung] → channels/hist/CHARACTER · §231 vật có tên = ảnh thật PD, số đông = vẽ, meme vẽ lại khuôn bằng nhân vật kênh (lặp tinh thần §188) [chung] → channels/hist/EDITING A14 |
| Số liệu kênh | §255 giờ đăng long: đo độ trễ phân phối từ bộ đếm giờ trước khi chọn; sóng đề xuất tới sau 12–30 h [en] → SHORTS · §139 views gồm autoplay trang chủ: đánh giá bằng lượt xem thật / WATCH / CTR; kết luận từ số thô sai 2 lần [chung] · §140 quyền API: Studio Manager ≠ Brand Account; chặn token sai kênh theo ID [chung] · §141 trang phân tích dựng từ câu hỏi, không từ dữ liệu có sẵn; soát ở đúng màn người dùng (lặp §1, §4) [chung] → CRAFT §1, §4 · §142 phân tích dùng thứ đang hiện trên nền tảng, không bản trong máy; không số mẫu [chung] → CRAFT §10 · §143 API trễ ~2 ngày → bộ đếm mỗi giờ cho 48 h đầu [chung] · §147 báo cáo tuần = API + export Studio + dữ liệu sản xuất [chung] → docs/analytics/PLAN.md §5 · §163 đọc số theo lời YouTube: thuật toán kéo theo người xem; vài giờ đầu không quyết định; hiển thị cao + CTR thấp là tốt; nguồn cấp kênh đăng ký là lát cắt sạch [chung] → PACKAGING §8a, §10 |

---

## 1. Kịch bản trước visual — đừng tối ưu chỉ số thay cho nội dung

Bản v2 đạt YDIF trung vị **3.64**, vượt cả video mẫu (3.50). Vẫn bị bác bỏ:
> *"các hạt tụ lại thì chả tạo ra được cái gì rõ ràng"*
> *"video thì lại không chạy theo lyrics"*

**YDIF đo màn hình CÓ RUNG, không đo hình ảnh CÓ NGHĨA.** Tôi đã tối ưu một
chỉ số thay cho việc có kịch bản. Lyrics nằm sẵn trong metadata mp3 suốt thời
gian đó mà tôi chưa từng đọc.

→ Viết TREATMENT trước. Dùng chỉ số làm ngưỡng sàn, không làm mục tiêu.

---

## 2. Sửa NGUYÊN NHÂN, đừng vứt KỸ THUẬT

Ở v2 mascot dựng bằng text-mosaic bị chìm. Tôi chẩn đoán **đúng** nguyên nhân
(`mosaic.js:108` tô vùng tối bằng đúng màu vàng của trường hạt nền; mascot có
trung vị sáng 0.239 → quá nửa nhân vật trùng màu nền), rồi kết luận **sai**:
bỏ hẳn mosaic, còn ghi vào TREATMENT là "không dùng cho mascot".

Khách chỉ ra: bản họ làm dùng đúng mosaic đó trên nền sạch → nhân vật **nổi
bật**, và có hiệu ứng "hiện ra/tan đi bằng ký hiệu toán" mà PNG đặc không có.

→ Trước khi loại một kỹ thuật, viết ra: *"nó hỏng VÌ ___"*. Nếu chỗ trống điền
được bằng nguyên nhân sửa được (màu, kích thước, tham số) thì sửa nguyên nhân.

---

## 3. Đọc repo = liệt kê NĂNG LỰC DÙNG ĐƯỢC, không phải viết tóm tắt

Tôi viết `docs/OVERVIEW.vi.md` (539 dòng) mô tả pdoom, trong đó có hẳn một mục
về forced alignment với Demucs, hai acoustic model, garbage star token. Rồi
**bốn lần liền** tự chế cách đo lời bằng năng lượng, sai tới 4.22 giây.

Tôi lưu `analysis/` vào đầu như *một chương trong bản mô tả*, không phải *một
công cụ tôi có trong tay*.

→ Đọc xong repo, phải có trong đầu danh sách: *"repo này cho tôi (a)... (b)..."*

---

## 4. Một lời giải CHẠY ĐƯỢC không phải bằng chứng nó ĐÚNG

Tôi viết được STFT, ra ngay bảng số trông rất khoa học. Nó *chạy*, nên tôi
không dừng lại hỏi "có cách đúng hơn không?". Nếu tôi bí, tôi đã phải đi tìm.

→ Khi tự chế phương pháp cho bài toán đã có lời giải chuẩn, đó không phải sáng
tạo mà là bỏ sót.

---

## 5. Đừng kiểm chứng bằng chính giả định sinh ra kết quả

Tôi báo "lệch trung bình 0 ms" trong khi thực tế lệch 4.22 giây. Con số không
sai — nó đo mốc cảnh so với **bảng mốc của chính tôi**, mà bảng đó sai.

→ Kiểm chứng phải dùng **nguồn độc lập**: whisper nghe lại, hoặc tai người.

→ Khi khách nói "vẫn chưa khớp" mà số của tôi nói "khớp 0ms", **số của tôi sai**.

---

## 6. Lỗi hạ tầng làm mọi phép đo vô nghĩa

| lỗi | triệu chứng | cách phát hiện |
|---|---|---|
| **Vòng preview tranh canvas** | ảnh chụp là frame ngẫu nhiên, không phải thời điểm yêu cầu | tính toán nói reveal=1.0 mà ảnh hiện dở |
| **Đua font** | bố cục khoá vào font dự phòng, hai lần chạy khác nhau | md5 hai lần chụp không trùng |
| **Font không cài** | Chrome âm thầm rơi về font khác, không báo lỗi | `fc-list \| grep -i archivo` |
| **Cảnh tô đè lớp nền** | thêm lớp nền mà độ sáng không tăng | đo TỪNG CẢNH, thấy chênh lệch |
| **Ablation để lại `if(false)`** | mất một lớp trong im lặng | đếm số lớp sau mỗi script sửa hàng loạt |
| **Chrome headless sót** | render treo, `eta` vẫn đếm ngược | so mốc thời gian file với hiện tại |

→ Khi ảnh chụp mâu thuẫn với tính toán, **nghi ngờ hạ tầng trước khi sửa logic**.
Cô lập module vào một trang tối giản là cách phân định nhanh nhất.

---

## 7. Regex sửa hàng loạt luôn bỏ sót

Nắn mốc thời gian bằng regex tìm `const T_* = <số>` đã bỏ qua mốc nằm trong
MẢNG (`const WORDS = [['Why', 15.65], ...]`). Cảnh "Why does it work?" render ra
**màn hình trống**, không lỗi nào báo.

→ Sau mọi thay đổi cấu trúc: quét cả ba dạng (`const X =`, `prog(t, a, b)`,
`['tên', số]`), rồi **chụp một khung mỗi cảnh và NHÌN**.

---

## 8. Đo TỪNG PHẦN trước khi chỉnh tham số

Thêm lớp nền mạnh mà độ sáng trung bình chỉ tăng 23.8 → 26.0. Tôi định tăng
cường độ tiếp — sai hướng. Đo từng cảnh mới lộ: cảnh tôi viết sáng 34-35, cảnh
agent viết chỉ 22-24 (vì chúng tô đè nền).

→ Khi một thay đổi toàn cục không có tác dụng, chênh lệch giữa các phần chỉ ra
thủ phạm.

---

## 9. Biết khi nào DỪNG tối ưu

Tôi lo 16MB là quá nặng, định tiếp tục giảm. Đo ra **4.9 Mbps — ngang hệt pdoom
(5.0 Mbps)**, video đã lên YouTube thành công, và thấp hơn khuyến nghị YouTube
(12 Mbps).

→ Trước khi tối ưu, so với một mốc THẬT đã hoạt động.

---

## 10. Chọn sai phân vị làm hỏng phép đo

Sau khi thêm cảnh đảo nền, công cụ tự chấm báo "biên độ 6.3, chưa đạt" — trong
khi cảnh đó chạy hoàn hảo (p95 = 194.1, ngang pdoom).

Nguyên nhân: tôi đo biên độ bằng **p90 − p10**. Cảnh đảo nền chỉ chiếm **8%**
thời lượng, nên nó nằm ngoài p90 và hoàn toàn vô hình với phép đo.

Đúng là **p95 − p5** → 161.4, ngang video mẫu (161.8).

→ Khi một tính năng chiếm tỉ lệ nhỏ của thời lượng, phân vị dùng để đo phải
**hẹp hơn tỉ lệ đó**. Đo bằng phân vị rộng hơn thì tính năng biến mất khỏi số.

→ Triệu chứng nhận biết: mắt thấy hiệu ứng rõ ràng mà số nói "không có gì".
Nghi ngờ phép đo trước khi sửa tiếp nội dung.

---

## 11. Một kỹ thuật có thể vừa bị DÙNG QUÁ vừa bị BỎ HẲN

Mosaic cho mascot, ba lần sai liên tiếp:

| bản | cách dùng | kết quả |
|---|---|---|
| v2 | mosaic làm **chất liệu mặc định** | nhân vật chìm vào nền hạt vàng — bị bác |
| v3 | **bỏ hẳn**, chỉ PNG đặc | mất hiệu ứng "hiện ra/tan đi" — bị bác |
| v4 (bản 1 teardown) | PNG đặc ≥70%, mosaic <10% "đúng khoảnh khắc" | dựa trên đo sai — xem §15 |
| đúng | **ảnh đặc khi đứng (~75%), ký tự ở MỌI lần vào/ra (~25%)** | — |

Bản 1 teardown ghi "trong 10.5 giây, mosaic chỉ hiện một khung, lúc MONSTER".
Đo lại ở độ phân giải gốc: ≥ 30 lần chuyển chất liệu trong 300s, gần như mỗi
câu hát một lần. Con số "một khung" là do lấy mẫu thưa bỏ lỡ các chuyển dài 2–18 khung.

→ Khi một kỹ thuật cho kết quả xấu, có **ba** khả năng, không phải hai:
sai kỹ thuật · sai tham số · **sai TỈ LỆ dùng**. Tôi chỉ xét hai khả năng đầu.

→ Cách kiểm: đo **tỉ lệ thời lượng** của kỹ thuật đó trong tài liệu tham chiếu,
trước khi quyết định dùng nhiều hay bỏ.

---

## 12. Đo ở độ phân giải quá thô làm chỉ số vô nghĩa

> Gặp lại ở bài học: §38(b) (khung tĩnh đo ở 320×180 báo 78 đoạn, thật 6).

Tôi đo YDIF ở **160×90** (thu nhỏ 12 lần từ 1920×1080). Ở kích thước đó, chữ và
nét mảnh biến mất hoàn toàn.

| đo ở | video mẫu | pdoom | bản của tôi |
|---|---|---|---|
| 160×90 | 3.50 | 1.51 | 0.27 |
| **640×360** | **5.49** | **3.04** | **0.65** |

Ở 160×90 tôi kết luận "pdoom chỉ 1.51 mà vẫn tốt, nên 0.27 không sao". Ở độ
phân giải đúng: tôi kém pdoom **5 lần**, không phải "gần bằng".

Thêm nữa: đo riêng vùng chữ được YDIF **0.04** — thêm hiệu ứng gõ từng ký tự
không làm chỉ số tổng đổi chút nào, vì chữ chỉ chiếm vài pixel.

→ Trước khi tin một chỉ số, kiểm xem **thứ mình quan tâm có sống sót qua phép
thu nhỏ không**. Chọn độ phân giải theo kích thước chi tiết nhỏ nhất cần đo.

→ Triệu chứng: thêm một tính năng rõ ràng mà chỉ số không nhúc nhích.

---

## 13. Bảng màu chung không đủ — phải xem nền CỦA CẢNH ĐÓ

Bẫy xung đột màu tái xuất hiện mỗi khi thêm một chất liệu mới.

- **v2**: mosaic vàng trên nền hạt vàng → mascot chìm. (Đã ghi ở §3.)
- **v11, P7**: `chalk()` màu `goldHot` trên nền GIẤY SÁNG (`paperGround`) →
  nét chìm hoàn toàn, y hệt lỗi cũ ở một chất liệu khác.

Kèm theo, cùng cảnh đó: cho `alpha` thân người chạy 0→1 trên nền sáng thì
giấy lọt xuyên qua người, nhìn như **bóng ma**. PNG phải đặc ngay; thứ được
phép fade là lớp nét phủ lên trên.

**Cách tránh:** trước khi gọi bất kỳ chất liệu nào, hỏi "cảnh này nền sáng hay
tối?" rồi chọn màu tương phản với nền TẠI CHỖ, không theo bảng màu thương hiệu.

## 14. Hiệu ứng nở ra ngoài silhouette phải tính bằng số trước

`shatter`, `mirror`, `frame` đều vẽ RA NGOÀI hình nhân vật. Nếu nhân vật đứng
sát mép khung thì hiệu ứng bị cắt — trông như lỗi render.

- `shatter` `spread 0.7` tại `mx = W*0.105`: hạt bay tới `x = −10`, mất nửa số
  hạt. Điều kiện: `mx − spread·hpx > 0`. Dùng 0.28 mới vừa.
- `mirror`: P1/P2/P9 đặt chân ở `H*0.985–0.99`, chỉ còn 11–16px tới đáy, mà
  bóng cần ~200px. **Bỏ kỹ thuật**, không nâng nhân vật lên phá bố cục đã duyệt.

**Cách tránh:** chạy một lệnh python ngắn tính `mx − spread·hpx` và `H − footY`
TRƯỚC khi gắn. Không đủ chỗ thì bỏ hiệu ứng, giữ bố cục.

---

## 15. Kết luận chất liệu từ ảnh thu nhỏ

Bản 1 `mv/REFERENCE-TEARDOWN.md` kết luận nhân vật video mẫu là "PNG đặc, nét
sạch, không hiệu ứng" và "mosaic chỉ một khung". Khách chỉ ra ngay: mở đầu nhân
vật dựng hoàn toàn bằng hàng ký tự ASCII. Kết luận sai đã thành luật trong
`DNA.md` §3 (draw ≥ 70%, mosaic < 10%).

Nguyên nhân: ở ô contact sheet 320px, chân dung ASCII trông y hệt ảnh thường;
các chuyển chất liệu chỉ dài 2–18 khung nên lấy mẫu 1fps bỏ lỡ gần hết. Phần
**số đo** (sáng, bão hoà, YDIF) thì đúng — sai nằm ở phần phải **nhìn**.

→ Kết luận về CHẤT LIỆU (không phải bố cục) phải có ảnh zoom khung gốc: crop
240×135, phóng 4× `flags=neighbor`, và chuỗi 6fps qua mọi lần chuyển trạng thái.
Contact sheet chỉ để định vị. Phương pháp: `mv/reference/METHOD.md`.

## 16. Trạng thái giải mã ảnh của trình duyệt phá tất định

Khung 35.50 cho md5 khác nhau tuỳ thứ tự chụp: chụp lẻ ≠ chụp sau 34.5. Chia đôi bằng cách
tắt từng thứ: thủ phạm là nhân vật P08. `Mascot.grid()` dựng lưới ký hiệu bằng
`drawImage` thu nhỏ một `<img>` ở LẦN DÙNG ĐẦU, và Chrome cho pixel khác nhau tuỳ ảnh đó đã
từng được vẽ lên canvas chính (GPU) hay chưa. Không phải font — đã thử "làm nóng" mọi ký
hiệu, không đổi.

**Cách tránh:** nạp ảnh xong thì chép ngay sang canvas CPU (`willReadFrequently`) và chỉ dùng
canvas đó (`toCanvas`). Render tuần tự vốn tự nhất quán nên lỗi chỉ lộ ở ảnh chụp lẻ và ở
chỗ ghép hai đoạn render — đúng những chỗ ta dùng để KIỂM. Kiểm tất định phải chạy cả xuôi
lẫn ngược thứ tự.

Kèm theo: trong zsh, `$CMD` chứa cả lệnh không tách từ → lệnh không chạy, và `diff` hai danh
sách rỗng báo "giống nhau". Phép kiểm phải tự đếm số ảnh trước khi so.


---

## 17. Ranh giới cảnh là nơi mọi thứ tắt cứng (ngoài ý muốn)

Áp dụng khi DNA của MV không chọn cắt cứng ở chỗ đó (exp-log: chữ không fade, cắt cứng chỉ 8 chỗ).

Ba lần review độc lập (exp-log Kế hoạch 3, 4, 5) bắt được 6 + 6 + 7 chỗ "biến mất trong một khung", gần như
toàn ở ranh giới cảnh hoặc ở lối ra của một vật giữa cảnh. Năm dạng lặp lại:
- vật vẽ trong `if (t < mốc)` / `return` sớm → tắt cứng đúng mốc (laser, nhãn, dấu ✗);
- chữ không đi qua `burstText`/`footer` mà `fillText` thẳng → hiện/tắt cứng;
- tham số NỀN của cảnh sau khác cảnh trước (sàn ký hiệu, bokeh, vị trí quầng);
- CAMERA khung đầu cảnh sau ≠ khung cuối cảnh trước (`s`, `r` lệch 1–3%);
- vật dùng chung vẽ ở độ đậm/cỡ khác nhau giữa hai cảnh.

**Cách tránh:** cảnh sau DÂNG từ giá trị cuối của cảnh trước trong 0.3s; vật rời đi bằng vỡ/co/rút/bay;
`python3 tools/qa/seams.py <p> <các mốc vào cảnh>` rồi NHÌN tờ cặp khung. Giới hạn còn lại: `footer` tắt dòng khi
khoảng nghỉ sau dòng > 0.6s (hành vi `lineAt`) — chưa sửa.

---

## 18. `shatter()` có một bộ đệm

`shatter(g, paint, k)` vẽ `paint` vào bộ đệm chung rồi đọc pixel. Gọi `shatter` trong `paint` của `shatter` khác,
hoặc để hai cửa sổ `shatter` chồng nhau trong một khung, thì lần sau ghi đè lần trước — mất hình không báo lỗi.
Thêm: ô có alpha < 60/255 bị bỏ qua, nên nét rất mờ (đường quét CRT 0.08) TẮT CỨNG khi cảnh bắt đầu vỡ.

**Cách tránh:** mỗi cảnh: vỡ thế giới cũ ở 0.3s ĐẦU, vỡ thế giới của mình ở 0.35s CUỐI — không chồng. Hàm cần bộ
đệm khác (`tinted`, `drawReflected`, `fillWord`, `crtOff`) mỗi cái một bộ đệm riêng. Nét mờ vẽ ngoài `shatter`,
nhân `1 − k`.

---

## 19. Bẫy shell đã làm phép kiểm sai

- zsh không tách từ biến: `$CMD` chứa cả lệnh → không chạy; phép so "giống nhau" vì cả hai bên rỗng.
- zsh mở rộng glob trong tham số: `grep --include=*.js` → "no matches found" trước khi grep chạy.
- `pkill -f "shoot.js video"` khớp luôn chính shell đang chạy lệnh → mã thoát 144 (vô hại, nhưng dễ tưởng lỗi).
- `source` một thư viện bash (`set -euo pipefail`, `cd`) trong zsh → đổi thư mục làm việc của cả phiên.
- zsh `set -- $r` không tách chuỗi → 6 đoạn render không chạy cái nào, không báo lỗi (từ §30).
- `pkill -f <mẫu>` / `pgrep -f` khớp CHÍNH dòng lệnh shell đang chạy nó → tự giết shell, mã 144 (gặp 3 lần: §19, §30,
  §43).

**Cách tránh:** chạy kiểm bằng script bash có sẵn (`tools/qa/*.sh`, `tools/render.sh full`), không ghép lệnh bằng
biến; grep đệ quy dùng `--exclude-dir` hoặc python; pkill dùng mẫu có ngoặc (`pkill -f "render/shoo[t].js"`) hoặc giết
theo PID từ script riêng.

---

## 20. Công cụ im lặng bỏ qua lỗi

`shoot.js stills` bỏ qua khung lỗi mà không báo; `cut.json`/report giữ khoá cũ; `diff` hai danh sách rỗng báo
trùng. Một lần, phép kiểm "phần cũ không đổi" pass mà không chụp được ảnh nào.

**Cách tránh:** mọi phép chụp đếm số ảnh = số mốc (`tools/qa/_lib.sh shoot`), so md5 chỉ khi có ảnh.

---

## 21. Mốc hình đo trên GIỌNG/STEM, không trên RMS của mix

99-intro lấy mốc cảnh từ khoảng lặng của đường bao RMS 0.5s → 7/9 cảnh lệch −0.92 … +1.47s ("hình lúc đi trước
lời lúc đi sau"). RMS đo năng lượng TỔNG — trống át giọng — và 0.5s quá thô so với ngưỡng lệch tiếng-hình ~50ms.

**Cách tránh:** lời: forced alignment từng từ (`data/timeline.json`). Nhạc cụ: stem riêng (`data/stems.json` —
exp-log: ka-ching 64.49, mỗi cú percussion một nét bút, band vào lại 116.42). Bản đồ năng lượng của TREATMENT
lập từ stem. Không gõ tay mốc trong cảnh.

---

## 22. Ghép video: chép luồng hình, audio phải tương thích

`tools/stitch.mjs` chép luồng hình (cắt đúng khung khoá) và gắn audio gốc một lần. Audio gốc của Suno là Opus;
Opus trong `.mp4` nhiều trình phát không đọc. **Cách tránh:** sau khi ghép, `ffmpeg -c:v copy -c:a aac`.

---

## 23. Nháp ở bản sao → kế hoạch nhúng code → thực thi so md5

Viết kế hoạch trước rồi mới code thì kế hoạch đoán sai chỗ khó; code thẳng vào repo thì mất dấu vì sao. Cách đã
chạy 5 lần ở exp-log: dựng cảnh ở bản sao, chụp NHÌN từng câu, rồi kế hoạch nhúng NGUYÊN VĂN code đã chạy; khi
thực thi, ảnh repo phải trùng md5 ảnh nháp ở cùng mốc ("SAME") — thay cho xem lại từng ảnh. Refactor về sau dùng
`tools/qa/golden.sh check`: code đổi, hình không được đổi.

---

## 24. Camera chỉ có nghĩa khi cảnh giàu vật

Lát cắt exp-log P01–P08: camera đẩy/kéo/đập beat trên nền navy trống — YDIF tăng 0.22 → 0.87 nhưng người dùng
bác: hình lắc, không thêm nghĩa. Camera đẹp khi có thứ để "đi qua": vật lớn, tàu lượn trên đường cong (P22),
vòng quanh động cơ (P18), lật cả tờ giấy (P20). **Cách tránh:** camera mạnh chỉ khi cảnh có vật lớn để đi qua; YDIF thấp thì thêm vật lớn chuyển động, không
thêm rung. (Nhịp camera — exp-log chọn "đoạn lặng trôi nhẹ, cú nổ mới bùng" — là của DNA từng bài.)

---
*§25–§31: rút từ add-it-up ("Add It Up", 233s, 24 cảnh, xưởng in riso — 2026-10-01).*

## 25. Câu LẶP trong lời: tra theo chữ ra lần ĐẦU

`tl.at('Piece by piece—')` trả 54.42 (điệp khúc 1), không phải 107.22 (pre 2): khi so, dấu câu bị bỏ nên
"piece by piece." · "Piece by piece—" · "Piece by piece," là MỘT câu, lặp 5 lần. Cùng lỗi ba lần trong một bài:
"Same machine—" khớp "Same machine.", và một hàm viết tắt `const L = x => s.tl.at(x)` nuốt mất tham số n
(`L('Add it up,', 3)` ra 53.50 → cả bridge mất lời, không báo lỗi gì). **Cách tránh:** `tools/qa/lookups.py <p>`
liệt kê mọi câu lặp tra không ghi n và mọi hàm `L` nuốt n — nhìn từng dòng; câu tra ngay sau một câu khác thì lấy
`tl.lines[indexOf(l1) + 1]` thay vì tra lại theo chữ.

## 26. Ranh giới NỐI LIỀN phải mang theo mọi thứ — kể cả dòng lời

Ba chỗ nối không nạp giấy của add-it-up (cùng bố cục, feed 0) đều tắt cứng: mảng sai số, con dấu, nét đồ thị,
nhãn, và DÒNG LỜI (cảnh trước để dòng cuối "ở lại tới hết cảnh", nhưng không có tờ giấy nào mang nó đi). Cả độ rung
lệch khuôn cũng nhảy (amp 2.6 → 1.4). Thêm một họ khác: `if (t < mốc) vẽ()` giữa cảnh — con lăn, chiếc xe, ba chữ
khổng lồ biến mất giữa khung. **Cách tránh:** cảnh nối liền vẽ lại mọi vật của khung cuối cảnh trước rồi cho chúng
RỜI ĐI (bay, trượt, xén); lời: `lyrics(from = dòng cuối cảnh trước)` để nó bị xén ở đúng chỗ cũ; tham số nền dâng
từ giá trị cũ. Mọi vật tắt giữa cảnh phải ra khỏi khung bằng chuyển động. `seams.py` + NHÌN cặp khung bắt được cả
hai họ (review độc lập bắt thêm 8 chỗ giữa cảnh). Mở rộng §17.

## 27. Lời gốc Suno lại đếm sai câu hô; từ ngắn bị ghép 0.13s

Lần hai liên tiếp: lời gốc ghi "From scratch!" 2 lần, hát thật 4 lần (exp-log: 2 → 3). "Geometry" (4 âm tiết) được
ghép vào 0.13s vì whisper nghe "integral" thành "thing to grow". **Cách tránh:** đoạn hô và đoạn hook dồn từ luôn
soi đường bao dải 300–3400Hz của stem lead VÀ backing ở 0.05s (đếm cụm bật sau trũng), rồi ghi `repeat`/`starts`
vào `overrides.json` có lý do.

## 28. Chỉ số sàn phải đặt SAU khi chọn chất liệu

`review.mjs` được hiệu chỉnh trên video mẫu nền tối. DNA nền giấy (add-it-up) trượt hai chỉ số một cách có hệ thống:
"thời lượng nền sáng" 95% (mục tiêu 6–20%) và "biên độ độ sáng" 74 (≥ 90) — sửa được chỉ bằng cách bỏ chính phong
cách đã duyệt. DNA đã hứa "≥ 7/8" trước khi đo; ra 5/8. **Cách tránh:** chụp khung phong cách, chạy `review.mjs` trên
một đoạn thử, rồi mới ghi chỉ số sàn vào DNA — ghi rõ chỉ số nào không áp dụng cho chất liệu này và vì sao. YDIF
vẫn là nợ thật (0.40): đa số khung là vật nhỏ động trên nền đứng — §11, §24.

## 29. Review độc lập TRƯỚC khi render trọn bài

add-it-up chạy review song song với lượt render đầu → review ra 2 HIGH + 10 MEDIUM, lượt render (≈ 10 phút × 6
luồng) bỏ đi. **Cách tránh:** thứ tự là chụp/NHÌN → `lookups.py` → `seams.py` → `determinism.sh` → review độc lập
(model mạnh nhất) → sửa → MỚI `render.sh full`.

## 30. Bẫy shell mới: `set -- $r` và `pkill -f`

> Đã gộp vào §19.

Trong zsh `set -- $r` không tách chuỗi (6 đoạn render không chạy cái nào, không báo lỗi). `pkill -f "render/shoot.js"`
khớp luôn dòng lệnh của chính shell đang chạy nó → tự giết (mã 144). **Cách tránh:** việc nhiều bước viết thành
script bash (`tools/render.sh full`); pkill dùng mẫu có ngoặc `pkill -f "render/shoo[t].js"`.

## 31. Khung phong cách THẬT trước khi duyệt — và nó bắt lỗi chất liệu sớm

Người dùng duyệt DNA riso ngay khi thấy 4 khung chụp từ bàn thử (`styleframes.jpg`), không phải mô tả chữ. Bàn thử
cũng lộ hai lỗi chất liệu trước khi có cảnh nào: bóng in nằm DƯỚI cả người (multiply → áo blouse nhuộm hồng/vàng) và
nhân vật chìm trên nền phủ mực. Sửa bằng ĐỤC LỖ (riso không có mực trắng): bóng chỉ lộ ngoài silhouette, mọi lớp phủ
khoét chừa nhân vật + 10px. **Cách tránh:** chất liệu mới → bàn thử `tools/lab/` → chụp → soi ở độ phân giải gốc
(§15) → ghép tờ khung phong cách vào project → mới viết TREATMENT chi tiết.

## 32. Chữ sát mép khung và chữ đè lên nhân vật — người dùng thấy, tờ xem thu nhỏ không thấy

Người dùng chỉ ra hai chỗ ở add-it-up (sau khi đã chụp, seams, review đều qua):
- **Sát mép:** nhãn "TOTAL" ở đầu ra cỗ máy ∫ (P09b/P13b, đáy ≈ y 1040) chạm mép dưới — nhãn đặt theo toạ độ của
  hình (đuôi chữ S), không theo khung; cỗ máy cao 760 đặt ở y 230 nên đuôi rơi ra ngoài vùng an toàn.
- **Trùng màu:** băng lời rap "EVERY CROSS-SECTION" (P17) chạy qua áo thun ĐEN của nhân vật — chữ mực key trên vùng
  mực key (tương phản ≈ 1); đã đo tương phản chữ/giấy, chữ/vàng nhưng không đo chữ/NHÂN VẬT. Thêm: hai dòng chồng nhau
  lúc dòng cũ đang bị xén càng khó đọc.

Tờ xem 384px không lộ cả hai: chữ vẫn "có mặt", chỉ là không đọc được. **Cách tránh (MV sau):**
1. Vùng an toàn: mọi chữ và nhãn nằm trong x 96–1824, y 64–1016 (5–6% mép) — kể cả nhãn GẮN VÀO hình (đầu/đuôi
   đường, đáy cột, nhãn trục). Đặt nhãn theo khung (clamp vào vùng an toàn), không theo toạ độ vật.
2. Lời và nhân vật không chia nhau một vùng: chọn chỗ đứng nhân vật TRƯỚC, rồi đặt băng lời ở nửa kia; cảnh có
   nhân vật bên phải thì lời không được vượt quá mép trái silhouette − 40px. Bắt buộc phải đè thì băng lời có nền
   GIẤY/ mực sáng đặc phía sau (đục lỗ chỗ nhân vật dưới băng), không để chữ key trên áo/tóc key.
3. Kiểm bằng mắt ở ĐỘ PHÂN GIẢI GỐC mỗi câu có nhân vật, và mép dưới/trên của mọi cảnh có nhãn (crop 1920×200 ở
   đáy + đỉnh) — không chỉ tờ xem (§15).


---
*§33: rút từ math-30k (video bài học đầu tiên — 2026-10-05).*

## 33. Render video lấy NHẠC MẶC ĐỊNH của trang khác — treo im lặng

> Đã gộp vào §60 (mặc định nguy hiểm của công cụ phải bị chặn).

`shoot.js video` không có `--audio` thì dùng `projects/mv/99-intro/audio/loading.mp3` (26 s). Với `-shortest`, ffmpeg đóng ở
giây 26, còn vòng chụp đứng chờ `drain` mãi — 10 phút không lỗi, file đứng yên ở 4 MB. **Cách tránh:** `shoot.js` giờ
dừng ngay nếu trang khác 99-intro mà thiếu `--audio`; video bài học truyền file lời đã trộn (lệch LEAD, đệm đủ dài).
Dấu hiệu chung (§6): file đầu ra không lớn thêm mà tiến trình vẫn chạy → kiểm tiến trình con trước khi chờ tiếp.

## 34. Kịch bản chặt theo nhịp hình đọc lên như liệt kê

v2 của math-30k: mỗi dòng một câu ngắn để mỗi dòng = một nhịp hình. Người dùng đặt cạnh bản gốc tiếng Việt của họ:
bản gốc "viết rất có hồn, có dẫn dắt, cách đặt câu dấu câu và nối câu nghe rất người"; bản tôi "đâm thẳng vào kiến
thức", "audience còn chưa xác định rõ tôi nghe xem video này để làm gì". Nhưng cũng không phải viết cả đoạn không dấu
chấm: "cần sắp xếp câu, dấu phẩy, dấu chấm… ngắt nghỉ giữa các câu, các ý cho phù hợp". **Cách tránh:** văn xuôi theo
giọng bản gốc; một dòng = một HƠI ĐỌC, dòng trống = hết ý; mở bài: gợi tò mò → nhận định → hứa ("video này sẽ…") → câu
treo cho intro. Nhịp hình lấy từ mốc TỪ (căn CTC), không từ ngắt dòng.

## 35. Font thiếu ký tự thì rơi về font khác — không báo lỗi; Cormorant mặc định số kiểu cổ

Review độc lập bắt 5 ký hiệu (ℝ ℕ ∛ ↦ α β ⁻) không có trong Archivo/Plex/Cormorant — Chrome vẽ bằng font hệ thống,
lẫn giữa khung. Riêng Cormorant: chữ số mặc định kiểu cổ (old-style), "0" trông như chữ "o" — đúng trong cảnh nói về
số 0. **Cách tránh:** trước khi viết, kiểm `fontTools getBestCmap()` cho mọi ký tự ngoài ASCII của cảnh; thiếu → viết
cách khác hoặc vẽ tay. Số: dùng `CormorantGaramond*-LN[wght].ttf` (cmap trỏ thẳng `zero.lf`… — đóng băng số thẳng hàng).

## 36. Mối nối giữa hai trang render riêng là cắt cứng nếu không ai lo lối ra

Bản cuối math-30k: giây 184.2, cảnh đồng hồ Sumer (trang part1b) cắt thẳng sang nền đất sét trống (trang part2) —
mỗi trang tự đúng, chuyển cảnh tự động của trang chỉ chạy GIỮA cảnh của chính nó. Đo được bằng bước sáng qua 13 mối nối
(chỉ mối này lệch). **Cách tránh:** trang nào có trang khác theo sau phải có lối RA trong phần đuôi (nạp giấy, màn
chập); sau khi ghép, đo bước sáng ở MỌI mối nối đoạn/trang (khung n−2, n−1, n) — mở rộng §17, §26.

## 37. Đồ dùng kèm video gây hiểu nhầm: SRT trùng tên nằm cạnh video

`out/<p>/<p>.srt` cạnh `<p>.mp4` → trình phát tự bật như phụ đề; người dùng tưởng phụ đề bị lồng vào hình ("cản trở
việc xem visual"). **Cách tránh:** thứ để tải lên nơi khác (SRT, chương) nằm ở `out/<p>/youtube/` với tên KHÁC video.

## 38. Kiểm tự động phải đúng đơn vị đo — và kiểm chính bộ kiểm

> (b) là §12 gặp lại ở bài học.

Ba lần trong một video: (a) whisper nghe CẢ file dài → bịa "thank you for watching" ở chỗ lặng, lặp cụm → nghe TỪNG
câu; (b) đo khung tĩnh bằng trung bình độ sáng ở 320×180 → báo 78 đoạn tĩnh, đo bằng số điểm ảnh đổi ở 960×540 → 6
(§12); (c) phép so khung qua `select=eq(n,…)` trả rỗng không lỗi → so bằng ảnh tách ra. **Cách tránh:** trước khi tin
một kết quả bất thường, thử bộ kiểm trên một mẫu đã biết đáp án.

## 39. Lệnh nền có giới hạn 30 phút — việc dài phải tiếp được

Tổng hợp 227 câu (≈ 50 phút) bị dừng ở câu 162. Cache theo câu nên chạy lại chỉ làm phần thiếu. **Cách tránh:** việc
dài đặt timeout dài từ đầu; mọi công cụ dài phải giữ kết quả từng phần (cache giọng, đoạn render có "xong:").

## 40. Dựng song song nhờ mốc tạm + giao việc bằng văn bản + review độc lập

18 mục do 6 agent dựng trong lúc giọng còn tổng hợp: mốc TẠM (`tools/voice/estimate.py`) cùng định dạng mốc thật,
cảnh tra mốc theo CHỮ nên đổi mốc không vỡ; mỗi agent một nhóm file, một bản giao việc chung (`BRIEF-PLATES.md`) + ghi
chú đạo diễn riêng. Review độc lập sau đó vẫn bắt 6 lỗi HIGH người viết cảnh không thấy (chữ "x" đặt ở năm 820 trái
với soát sự kiện; ký hiệu rơi font). **Cách tránh:** song song được — nhưng review độc lập TRƯỚC render là bắt buộc (§29).

## 41. Không gửi danh tính người dùng ra dịch vụ ngoài

Lần thử API Wikimedia, tôi đặt email người dùng vào User-Agent — dữ liệu cá nhân gửi tới bên thứ ba không cần thiết.
**Cách tránh:** header/URL/payload gửi ra ngoài chỉ chứa định danh chung của công cụ. Ảnh tham khảo: liệt kê tên để người
dùng tự tải (rẻ hơn, người dùng chọn được nguồn).

## 42. Ô nhập của nền tảng có giới hạn — đếm trước khi giao

Danh sách "Problems" cho YouTube: 16 câu hỏi đầy đủ, 1082 ký tự — ô chỉ nhận 800, người dùng dán vào mới thấy lỗi.
Tôi đã đếm mô tả và tags nhưng không tra giới hạn của ô mới. **Cách tránh:** mọi văn bản để dán vào nền tảng (title,
mô tả, tags, problems, chương) phải đo bằng code so với giới hạn của ô TRƯỚC khi giao, chừa ~10%; bảng giới hạn ở
`projects/en/math-30k/YOUTUBE.md`. Không biết giới hạn → hỏi hoặc viết bản ngắn trước.

## 43. Chương CUỐI cũng phải ≥ 10 s

`publish.py` chỉ kiểm khoảng cách giữa các chương; zero-div có "Outro" 6 s trước hết video → YouTube coi cả danh sách
chương là không hợp lệ (mỗi chương ≥ 10 s, kể cả chương cuối). **Cách tránh:** `publish.py` đo độ dài bản cuối
(ffprobe) và bỏ chương cuối nếu < 10 s. Khi sửa công cụ chung, chạy lại trên dự án cũ và so (math-30k vẫn 21 chương).
Kèm (đã gộp vào §19): `pkill -f <mẫu>` / `pgrep -f` trong cùng lệnh shell khớp CHÍNH lệnh đó và tự giết shell (exit 144) — giết theo
PID từ script riêng.

## 44. Chỗ GIAO giữa hai người viết cảnh là chỗ hỏng

> Công thức FROM chốt ở §64 (thay cho `Math.max(START − 1.2, …)` dưới đây).

zero-div: 5 agent, mỗi agent tự soi kỹ cảnh của mình; review độc lập vẫn bắt 3 HIGH. Lỗi nặng nhất nằm ở mối nối
d1 → d2 (hai agent khác nhau): d1 cho camera lao vào lỗ tới 449.99, d2 lấy FROM = START − 1.2 = 449.02 theo brief →
trang loang sang cảnh mới giữa cú lao, nền bật về cỡ thường. Không agent nào sai theo brief của mình; brief không nói
ai sở hữu mối nối. **Cách tránh:** brief ghi rõ mọi mối nối ĐẶC BIỆT (lao vào, loang, mở từ đen) và cảnh SAU tính FROM
từ mốc kết thúc của cảnh trước (`Math.max(START − 1.2, L(i).end + dive)`); review độc lập chụp dày quanh mọi FROM.
Kèm: render chỉ sau khi đã sửa review (§40) — chạy song song rồi sửa là vứt lượt render.

## 45. Âm thanh: tôi không nghe được — đo bằng phổ, người dùng duyệt bằng tai

> Thay bởi §65 + `docs/lesson/SFX.md` (bảng mức hiện hành, cách đo). Giữ làm lịch sử hiệu chỉnh.

Học SFX từ video mẫu: tôi chỉ có phổ và số. Tách đúng lớp mới đo được: Demucs 2 stem (giọng) rồi 4 stem trên phần còn
lại — SFX nằm ở `drums` (lọc > 300 Hz), nhạc ở `other`; đo trên cả phần còn lại thì nhạc nền trộn vào, mức và số tiếng
đều sai. Ghép mỗi cụm tiếng với khung hình quanh nó mới ra luật "chuyển động nào ↔ tiếng nào". Chọn tiếng thay thế:
phổ cho biết ngắn/dài, gắt/mềm, có cao độ hay không (swish tải về 0.1 s ≠ whoosh mẫu 0.5 s) — nhưng "nghe hay" thì
không. **Cách làm:** hiệu chỉnh mức bằng cách phát lại ĐÚNG các mốc của mẫu bằng thư viện mình rồi so LUFS (−11 → thấp
hơn giọng 17.8 LU, mẫu ~17); mọi bộ tiếng mới → file nghe thử có đoạn mẫu ở đầu + bảng mốc → người dùng duyệt. Chỉ
nguồn CC0 (CC-BY buộc ghi nguồn). Nhạc nền là gu — để người dùng chọn. Kèm: ffmpeg đổi
mono→stereo (`aformat`/`-ac 2`) tự hạ −3 dB mỗi kênh nên LUFS giữ nguyên — tôi "bù" thêm −3 dB theo lý thuyết, bản thử
ra −19.4 thay vì −16. Đo bản cuối, đừng suy ra mức từ lý thuyết.

## 46. Cache đoạn render chỉ xét "đã có file" → build lại ra video CŨ, im lặng (pemdas, 2026-10-06)
Sửa biển kênh ở cảnh outro, chạy `build.py` → video vẫn biển cũ: đoạn `parts/*-p2-10.mp4` có sẵn nên được giữ.
Sửa: đoạn cũ hơn nguồn của trang (trang, kit, giọng, mốc, cảnh trong `<page>-order.js`) thì render lại; KHÔNG tính
`build.json` (đổi nhạc/sfx không được kéo render hình — lần đầu tính vào là mất 15 phút render lại vô ích). `--keep` để
dùng lại đoạn cũ bất kể. Bài học: cache phải so với NGUỒN, và luôn soi khung đúng chỗ vừa sửa trong file CUỐI.

## 47. Nền tràn khung + chuyển cảnh trượt = cắt cứng, không ai thấy (pemdas, 2026-10-06)
Cảnh tô nền bằng pattern tràn khung (để camera trượt không lộ mép). Trang chuyển cảnh trượt bằng `translate` mà không
clip → cảnh MỚI tô kín cả khung, cảnh cũ biến mất trong một khung hình ở cả 12 mối nối. 5 người viết cảnh đều chụp
cảnh của mình lẻ hoặc ở giữa mục nên không thấy; review độc lập chụp FROM ± 0.05 mới bắt được. Sửa: clip mỗi cảnh vào
ô của nó + làm tròn độ dịch (dịch lẻ để vệt 1 px) — đã vào `templates/lesson/part.html`. Cùng họ với §44: lỗi sống ở
MỐI NỐI giữa hai người viết, và ở TRANG mà không ai "sở hữu". Chụp mỗi mối nối ở FROM−0.04 / +0.06 trước render.
Thêm: thứ phải ĐỨNG YÊN trên màn (biển kênh, nhãn chính) vẽ ở toạ độ MÀN HÌNH, không ở toạ độ thế giới — camera trôi
kéo nó vào dưới biển tên mục.

## 48. Kịch bản người dùng đúng số nhưng KHÁI QUÁT quá tay (fifty-percent, 2026-10-06)
Bản tiếng Việt đúng mọi con số (99/5094 = 1,94% chạy lại bằng python), nhưng có 4 chỗ người xem am hiểu sẽ bắt lỗi:
"ngẫu nhiên = thiếu thông tin" cho CẢ thế giới (Bell, Nobel 2022 → thêm hai câu thừa nhận lượng tử); Ramsey/de Finetti
sai thập niên; vé cược Dutch book phải trông CÔNG BẰNG thì mới là bẫy (0,70 + 0,50 = 1,20 trả, nhận 1). Soát sự kiện
không chỉ là soát số: soát cả câu khẳng định rộng nhất của bài. **Kèm:** số minh hoạ do HÌNH thêm (cán cân Bayes, ô
3/10, 7/10 ngày) cũng phải vào `CONTENT.md` mục riêng, tính bằng code — tay tôi viết 1,07:99, code ra 1,06.

## 49. "B + mượn ý A" — lựa chọn ghép phải nói lại phạm vi bằng một câu (fifty-percent)
Tôi hiểu "B + mượn ý A" thành chuyển hẳn sang cảnh bàn nỉ (A) ở đoạn cá cược; người dùng phải nói lại hai lần: B là
chất liệu duy nhất, A chỉ góp PHỈNH dưới một ngọn ĐÈN BÀN trong đêm. **Cách tránh:** khi người dùng ghép hai phương án,
viết lại phạm vi trong một câu cụ thể ("toàn video là đêm; từ A chỉ lấy X, đặt ở Y") và hỏi xác nhận TRƯỚC khi viết
DNA; ghi câu đó lên đầu `DNA.md`.

## 50. Hai cảnh cùng bố cục + chuyển cảnh trượt = "hình nhân đôi" (fifty-percent)
e1 → e2 (cùng cán cân) và g1 → g2 (cùng ba ngọn đèn): cảnh sau vẽ tiếp đúng vật của cảnh trước, camera trôi ngang 0.9 s
→ hai cán cân cùng lúc trên màn. Mỗi agent soi cảnh mình thấy đúng; review độc lập bắt (HIGH). Sửa: trường
`CONTINUES = true` trên cảnh sau → trang cắt thẳng, khớp từng khung (đã vào `templates/lesson/part.html`). Cùng họ
§44/§47: brief phải liệt kê mối nối nào là "trôi sang chỗ mới" và mối nối nào là "tiếp tục cùng vật".

## 51. Trần từng loại tiếng là trần CẢ VIDEO — agent chỉ thấy nhóm mình (fifty-percent)
Brief ghi `shimmer` ≤ 6 cả video; 6 nhóm mỗi nhóm dùng 1–3 hợp lý → tổng 12. **Cách tránh:** chia hạn mức theo nhóm
ngay trong lời giao việc (vd. "nhóm bạn: shimmer ≤ 1, coin ≤ 2"), và sau khi gộp chạy `shoot.js cues` trên cả trang,
đếm theo loại TRƯỚC render.
**Luật gộp (sau §55, §66 — quên hai lần):** bảng hạn mức nhóm × loại có hàng TỔNG; đạo diễn CỘNG từng cột ≤ trần DNA
TRƯỚC khi gửi lời giao việc (mẫu bảng: `templates/lesson/BRIEF-PLATES.md`); sau khi gộp, đếm bằng `shoot.js cues` cả
hai trang, không tin số tự báo của agent.

## 52. Đóng băng nguồn trước render (fifty-percent)
Một agent sửa e2 đúng lúc `build.py` bắt đầu → không rõ đoạn nào render bản nào. Lần này may: commit, build lại (đoạn
không đổi), so khung (sai khác trung bình 1.55/255). **Cách tránh:** trước render: mọi agent đã báo xong, `git status`
sạch, commit; rồi mới chạy build.

## 53. Đồ nghề kit phải trả về cùng kiểu dù vô hình; ánh sáng mềm = sprite vẽ sẵn (fifty-percent)
`figure()` trả `undefined` khi k ≤ 0 → cảnh gọi `.x` lỗi đúng ở khung mascot chưa vào. Hàm vẽ trả khung thì trả MỌI
lúc. Chùm đèn vẽ bằng 5 lớp hình nêm gradient → sọc cứng; `ctx.filter = blur` thì chậm khi render → vẽ MỘT sprite mờ
sẵn lúc nạp rồi kéo giãn (`beamSprite`, `fogBank`).

## 54. Hình mã hoá số phải chọn thang trước khi giao (fifty-percent)
Cán cân Bayes nghiêng theo tỉ lệ, kẹp ở 0.42 rad: OTP (≈ 8,6:1) và "1:1 000 000 × 800 → 1:1 250" đều chạm trần, hai
khoảnh khắc khác nhau 3 bậc độ lớn trông như nhau (phải chữa bằng cú nảy). Tỉ lệ trải nhiều bậc → ánh xạ theo
log(tỉ lệ), ghi thang vào brief cùng các số cần hiện.

## 55. Hạn mức tiếng chia theo nhóm phải CỘNG LẠI ≤ trần (pi)
> Đã gộp vào §51.

§51 dạy chia hạn mức theo nhóm; ở pi tôi chia `shimmer` 1 cho 5 nhóm và `error` 1–2 cho 3 nhóm, cộng với 2 `error` của
cảnh mở → 5 / 5, trong khi DNA ghi trần 3 / 4. Agent làm đúng hạn mức được giao, lỗi nằm ở phép cộng của đạo diễn.
**Cách tránh:** viết bảng hạn mức một lần (nhóm × loại) kèm hàng TỔNG, so với trần trong DNA trước khi gửi lời giao việc;
sau khi gộp vẫn chạy `shoot.js cues` đếm theo loại (§51).

## 56. Giới hạn chữ trong ô cố định phải ĐO, không đoán (pi)
Brief ghi "tên mục ≤ 22 ký tự" cho khung tên PLATE; thật ra ô chỉ chứa ~12–16 ký tự (Archivo 700 26 px, giãn 2 px,
284 px). 5/6 nhóm phải tự rút tên giữa chừng, mỗi nhóm một kiểu ("NOT CIRCLES", "WOULDN'T DIE"…), một nhóm vẫn tràn
(e2 "FLAT SPACE · EINSTEIN 1915" ra x 1872). **Cách tránh:** khi viết kit, đo `measureText` của hàng chữ dài nhất cho
mỗi ô cố định (khung tên, nhãn, NOTES) và ghi con số đo được vào brief; tốt hơn: hàm của kit tự co cỡ hoặc ném lỗi khi tràn.

## 57. Dụng cụ trên hình phải làm đúng điều lời đọc nói (pi)
Lời: "walk along its edge a distance of exactly one radius" (độ dài CUNG). Cảnh c3 vẽ compa đo (dividers) đặt hai đầu ở
góc a và a + 1 rad → khẩu độ là DÂY CUNG 0.96R, và cảnh b2 lại dùng compa bước đúng một bán kính để dựng lục giác (3
bước = nửa vòng, không dư). Hai cảnh mâu thuẫn; người viết c3 tự nghi ngờ nhưng vẫn giao; review độc lập bắt (HIGH).
**Sửa:** sợi chỉ dài đúng một bán kính, quấn lên vành. **Cách tránh:** khi lời đọc mô tả một phép đo, brief ghi luôn
DỤNG CỤ đúng (thước thẳng đo dây cung; dây/thước dẻo đo cung) — và cảnh nào đã dùng cùng dụng cụ ở hồi trước.

## 58. "Gạch hiểu lầm → sửa" bị dùng quá tay: gạch cả câu ĐÚNG (pi)
> Đi cặp với §62 (đẳng thức đúng nhưng "hỏng khi bỏ luật").

Kỹ thuật học từ video mẫu (LESSON-VIDEO "Học từ video mẫu số Pi") lan ra: gạch đỏ cả "π = C ÷ d" (lời: "not JUST"),
✗ đỏ lên "STOP / LOOP" ngay dưới "EVERY FRACTION:" (đọc thành "phân số không dừng không lặp"), chữ "NOT A FRACTION"
(ý đúng) tô đỏ. **Luật:** đỏ chỉ chạm đúng CHỮ sai ("just", "a hunch"); kết luận đúng viết xanh; nếu câu đúng chỉ thiếu
ý thì gạch từ gây hiểu sai, không gạch cả công thức.

## 59. Bẫy tra mốc: từ lặp trong câu + `prog(t, a, b)` với b < a im lặng (pi)
a0: `w(4, 'is')` lấy chữ "is" ĐẦU câu ("that definition is true…") thay vì chữ cuối ("…what pi is") → `prog(t, 24.47,
21.22)`: mẫu số âm, với t < 21.22 ra giá trị dương → ghi chú "≠ what π is" hiện sớm 4 s, không lỗi nào. **Sửa ở kit:**
`prog` ném lỗi khi b < a (đã vào template). `tools/qa/lookups.py` liệt kê mọi từ lặp — đọc từng dòng, đừng chỉ đếm.

## 60. Lệnh mặc định nguy hiểm phải bị chặn, không chỉ ghi chú (pi)
Một reviewer (chỉ được đọc) chạy `node engine/render/shoot.js` không tham số để xem cách dùng → mặc định là render MV
99-intro đè `out/en/intro.mp4` (bản render cuối của MV khác). **Sửa:** `--page` bắt buộc, thiếu thì in cách dùng và thoát 2.
Cùng họ §33: công cụ có giá trị mặc định ghi ra file thật thì mặc định đó phải là "không làm gì".

## 61. Màu mang nghĩa thì MỌI nét nhấn phải trung tính (neg-times-neg)
DNA "vàng = dương, đỏ = âm, băng = sai". Review bắt 5 chỗ dùng màu nghĩa để TRANG TRÍ: vòng khoanh đỏ quanh chữ
"distributive law", số khay "2" tô đỏ (2 không âm), vòng khoanh vàng ở chỗ trống, viền vàng cho ô được chọn, nét gạch đỏ
dưới chữ. Người viết cảnh nghĩ "màu nhấn", người xem đọc "số âm". **Luật:** khi màu mang nghĩa, khoanh / gạch chân /
viền chọn / số thứ tự dùng màu mực (ngà). Brief ghi rõ danh sách màu NHẤN được phép; reviewer soát riêng mục này.

## 62. Đẳng thức đúng nhưng "hỏng khi bỏ luật" → đừng gạch nó (neg-times-neg)
> Đi cặp với §58 (đỏ chỉ chạm chữ sai).

"Bỏ phân phối thì tính nhẩm hỏng": cảnh gạch băng lên "23 × 7 = 140 + 21" và "(a + b)²" → người xem đọc là hai đẳng
thức SAI. **Sửa:** viết đủ bước dùng luật (23 × 7 = 20 × 7 + 3 × 7), vết nứt chạy qua đúng dấu "=", nhãn điều kiện
"WITHOUT THE DISTRIBUTIVE LAW · NO LONGER GUARANTEED". Mở rộng §58: gạch = SAI; "không còn được bảo đảm" là thứ khác.

## 63. Khung đầu cảnh và sau mỗi lần camera chuyển vùng hay trống (neg-times-neg)
Review A + B đếm 15 chỗ trống 1.5–6 s: FROM+0.45 chỉ có thẻ mục đang gõ; camera xuống vùng mới rồi chờ tới chữ được
đọc. **Luật trong brief:** phần tử đầu tiên vẽ từ FROM + 0.3 (trong lúc trượt); vùng mới có sẵn "ô chờ" (viền đứt, viên
ma, khung bảng) ngay khi camera tới, rồi mới lấp theo lời. Soi FROM+0.45 và PAN+1.0 của MỌI cảnh trước khi báo xong.

## 64. Mở hồi FROM = START − 2.6 cắt mất khung giữ kết luận của cảnh trước (neg-times-neg)
e3 viết xong "no other way for it to come out" đúng lúc f1 (mở hồi) bắt đầu trượt; f1 "= 6" giữ 0.8 s rồi f2 vào.
**Luật (bản đầu, đã thay bằng công thức dưới):** FROM mở hồi không được cắt khung kết luận của cảnh trước.
Kết luận của cảnh viết xong TRƯỚC câu cuối của nó, không phải đúng lúc câu cuối hết.
**Một công thức (gộp §44, chốt 2026-10-08):** `FROM = max(START − lead, KẾT cảnh trước + 0.5)`, lead = 1.2 (cảnh
thường) / 2.6 (mở hồi); KẾT = `end` câu cuối của cảnh trước, hoặc mốc kết chuyển động đặc biệt của nó (lao vào, loang)
nếu muộn hơn.

## 65. Đo mức từng loại tiếng trong bản trộn trước khi giao — và hỏi tai người dùng (neg-times-neg)
"Tiếng gõ bàn phím hơi bé quá, tôi không nghe được": đo thì đỉnh `type` −21 dBFS (giọng −1.5), 324 tiếng gần như
không nghe thấy — thư viện đặt `type` −6 từ bài trước, chưa ai đo lại. Sau đó "nhạc hơi to, tăng sound effect".
**Luật:** sau build, đo đỉnh 60–100 ms của mỗi loại so với giọng (§ cách đo ở docs/lesson/SFX.md); loại nào thấp hơn
giọng > 17 dB là không nghe được. Mức chung của bài (sfx_db, music lufs) chỉnh bằng `build.py --keep` (~3 phút).

## 66. Hạn mức tiếng giao cho từng nhóm phải CỘNG lại ≤ trần cả video (zero-power)
> Đã gộp vào §51.

DNA đặt trần (correct ≤ 8, question ≤ 8, error ≤ 7) nhưng tôi giao mỗi nhóm "correct ≤ 2" cho 7 nhóm = 14. Nhóm nào
cũng đúng hạn mức, cả video vẫn vượt (correct 12, question 11, error 8) — reviewer B bắt được, phải sửa ở 9 cảnh.
**Luật** (nhắc lại §51/§55 vì đã quên): bảng hạn mức trong lời giao việc có hàng TỔNG; trước khi gửi, cộng cột ≤ trần.
Sau sửa, đếm bằng `shoot.js cues` cả hai trang, không tin số tự báo của agent.

## 67. Ô mang một biến không được hiện GIÁ TRỊ của biểu thức (zero-power)
c5: dải ô số mũ [0] [1] [2] [3] [4]; lúc "a⁰ bị ép bằng 1" agent ghi số 1 lam vào ô 0 → hình đọc thành "số mũ là 1",
ngược với "A⁰ = 1" bên cạnh. Cùng họ: d2 gọi lại khung "A^M ≠ 0 → DIVIDE" của c2 nhưng không cho thấy điều kiện đó
GÃY khi a = 0. **Luật:** ô / nhãn của một biến giữ đúng biến đó, giá trị viết ở chỗ khác ("A⁰ = 1" dưới ô). Lời gọi lại
một điều kiện → hình đổi trạng thái của điều kiện (vết nứt qua "≠" + "A^M = 0 → CAN'T DIVIDE"), không chỉ hiện lại.

## 68. Thẻ mục đứng yên + nội dung cuộn → nội dung trượt QUA thẻ (zero-power)
Hai cảnh cuộn trang trong cảnh (c4, d2) để chữ của trang cũ chạy ngang thẻ mục góc trên trong 0.9 s. **Luật:** cảnh
có camera / cuộn: clip phần cuộn ở y > (đáy thẻ + 10) trước khi vẽ, thẻ vẽ ngoài clip. Đưa vào brief của DNA có cuộn.

## 69. DNA không dùng font: kit phải đủ glyph, và số mũ phải ĐÓNG (zero-power)
DNA LCD vẽ mọi chữ bằng ma trận điểm tự định nghĩa → mỗi ký tự thiếu là một lỗi (≠, Ö, –); kit ném lỗi nên không
lọt, nhưng agent phải tự chế glyph cục bộ. Cảnh mẫu của tôi viết `'0^0'` không đóng `^` → cả phần chữ sau thành số mũ.
**Luật:** lúc dựng kit, chạy toàn bộ chữ của SCRIPT.md + CONTENT.md (tên riêng có dấu) qua bảng glyph; quy ước số mũ
mở–đóng ghi ngay trong chú thích hàm, và soi khung đầu tiên có số mũ ở độ phân giải gốc.

## 70. `must()` trong khung chuyển tiếp làm render chết giữa chừng (intuition)
b5 kiểm "OPENED 98" từ `t >= OPEN_END`, nhưng hai cửa cuối mới mở được nửa → khung đó đếm 96, `must` ném lỗi, đoạn
render số 3 dừng ở 10 s / 61 s; ảnh chụp (một khung mỗi câu) không bao giờ trúng khung đó. Mất một lượt render lại.
**Luật:** kiểm số trên hình chỉ đặt ở trạng thái ĐÃ XONG (sau chuyển động + biên an toàn), không ở mốc bắt đầu của
nó; và trước `build.py`, chạy khô `render(t)` của mọi khung (không mã hoá) để bắt lỗi JS / `must` trong 1–2 phút.

## 71. Sáu nhóm cảnh song song → vật dùng chung lệch nhau (intuition)
Lưới 100 cửa: b5 chọn cửa 34 / chừa 78, b9 và d1 tự đặt 57 và cửa 1; lớp học phim 21 vẽ hai kiểu ở b1 và b7. Mỗi
nhóm đúng một mình, sai khi xếp cạnh nhau. **Luật:** vật xuất hiện ở ≥ 2 nhóm (lưới, lớp học, bộ bài) → hằng số và
hình học đặt trong kit (hoặc bảng trong DNA) TRƯỚC khi giao việc; brief của nhóm sau ghi rõ "vẽ lại đúng như <cảnh>".

## 72. Chrome headless trên Linux vẽ 3D bằng CPU mà không báo gì (studio3d, 2026-10-09)
`render.ts` của p(doom) ép `--use-angle=metal`, cờ này chỉ có trên macOS. Trên Linux, Chrome lặng lẽ chuyển sang
SwiftShader: hình vẫn đúng, nhưng 206 ms mỗi khung phụ thay vì 8 ms, nên 5 s video chạy 15 phút vẫn chưa xong. Dòng
log `GL_CLOSE_PATH_NV` trông như có card NVIDIA nhưng chỉ là tên hằng. **Luật:** máy mới, trước mọi render 3D,
chạy `bun scripts/render.ts gpu`, phải in tên card thật. Đã sửa: macOS dùng `metal`, các máy khác `vulkan`, đổi
bằng `--angle`.

## 73. Intro 3D bản 1: lời không lên hình, nhịp thưa (intro, 2026-10-09)
Bản 1 (khối đất sét sáng) có ~20 sự kiện trong 26 s, gần như không có chữ của lời, mascot chiếm ~40% thời lượng.
Người dùng: *"Lyrics và hình ảnh luôn đi kèm với nhau… effect hiệu ứng chuyển động có tần suất diễn ra nhiều hơn
nhiều"*. Thước đo đã có sẵn từ trước mà tôi không dùng: p(doom) đổi khung theo từng từ (~0.27 s), video mẫu nhân vật
2D vỡ thành 3D. Sau đó người dùng nói "thích style kiểu p(doom)…" và tôi phải hỏi lại: là đổi hẳn sang nền tối, dù
khung mẫu trước đó đã chọn clay. **Luật:** treatment MV/intro là bảng theo TỪ; mỗi từ hoặc beat là một sự kiện; đo
bằng `tools/qa/still_windows.py` (bản 1 có 8 đoạn đứng yên, bản 2 không còn đoạn nào); mascot ≤ 25%
(`docs/MEDIUM.md`).

## 74. Trạng thái three.js rò giữa các khung: Euler giữ thứ tự trục cũ (intro, 2026-10-09)
`this.e.set(x, y, z, 'YXZ')` ở hàm vẽ chữ đổi luôn thứ tự trục của đối tượng Euler dùng chung. `put()` gọi
`this.e.set(rx, ry, rz)` không ghi thứ tự nên kế thừa `'YXZ'` từ khung TRƯỚC. Hậu quả: cùng một `t`, khung đầu
phiên khác khung render lần hai, ở các khối đang xoay (hạt bụi, mascot vỡ). Kiểm hai thứ tự ban đầu chỉ bắt được
một nửa: khung 10.3 s giống nhau vì khung trước nó cũng có chữ. Hai giả thuyết sai trước khi nhìn ảnh phóng to
(uniform `onBeforeCompile`, bóng ngoài vùng shadow map). **Luật:** mọi `Euler.set` ghi rõ thứ tự trục; kiểm tất
định gồm cả "cùng một mốc render hai lần trong một phiên"; khác biệt thì **phóng to chỗ khác** trước khi đoán.

## 75. Ước lượng bề rộng chữ khối sai gấp rưỡi: chữ bị cắt khung (intro, 2026-10-09)
Tôi đặt camera theo trí nhớ "chữ cao ~2 đơn vị", nhưng "NUMBERS" rộng ~10 đơn vị, nên QUESTION, NUMBERS và NO TRICKS
đều bị cắt khung. Khi camera nhìn từ trên, chữ đứng thì bị nhìn cạnh và mất hẳn (NO GUESSING). **Luật:** xếp hàng
chữ bằng bề rộng thật từ dữ liệu voxel (`row()`); đặt camera theo hàng đó; soi sheet mọi dòng của TREATMENT trước
khi render trọn.

## 76. zsh: `set -- $p` không tách từ, nên phép so sánh báo DIFF giả (2026-10-09)
Vòng `for p in "a b f"; do set -- $p; cmp $1/$3 $2/$3` trong zsh: `$p` không bị tách, `$1` = "a b f" và `$3` rỗng,
nên `cmp` so hai file không tồn tại và in DIFF. Suýt kết luận sai về tính tất định (cùng họ với §19). **Luật:** trong
lệnh kiểm, viết từng `cmp` tường minh, hoặc dùng `${=p}` trong zsh. Lệnh kiểm in ra tên file đã so, để thấy ngay
khi tên bị rỗng.

## 77. 3D không mặc định tốt hơn 2D (fifty-percent, 2026-10-09)
Tôi dựng lại đoạn 32 s (Buffon, Pearson, Kerrich) bằng 3D: đèn bão, sương, camera bay. Kỹ thuật đạt, nhưng người
dùng thấy bản 2D đang đăng "rõ ràng hơn, clear hơn". Bài này là bài ĐỌC SỐ: phối cảnh làm chữ nhỏ và nghiêng, sương
làm giảm tương phản, camera bay tranh sự chú ý với lời đọc. **Luật:** chọn 2D/3D theo `docs/MEDIUM.md`: cần đọc
thì 2D, cần cảm hoặc không gian là nội dung thì 3D.

## 78. Không gian là nội dung → 2D + hình 3D CHIẾU, không cần engine 3D (solid-geometry, 2026-10-09)
Bài hình học không gian 19:21 dựng hoàn toàn bằng engine 2D (canvas) với một bộ chiếu 3D tự viết trong kit
(`projects/en/solid-geometry/kit.js`: camera yaw/pitch, painter, tô mặt theo pháp tuyến, cạnh khuất nét đứt, bóng từ
một đèn cố định). Người dùng: *"bài này hay"*. Khác §77: ở đây hình khối LÀ nội dung, còn chữ và nhãn vẫn phẳng,
hướng màn hình, đặt cạnh điểm chiếu. Giữ được trọn đường ống bài học (giọng, chạy khô, SFX, build.py), điều mà
studio3d chưa có. Ý trung tâm "cái bóng = hình chiếu" đến từ chính chất liệu: đèn rọi thẳng xuống, bóng b′ là thật.
**Luật:** bài học có không gian là nội dung → 2D + 3D chiếu (`docs/MEDIUM.md`); chọn một chất liệu có ánh sáng thật
để hình chiếu, góc, khoảng cách hiện ra bằng bóng; chữ không bao giờ đi theo phối cảnh.

## 79. Ví dụ đời thường cũng phải soát bằng hình học, không chỉ số (solid-geometry, 2026-10-09)
Kịch bản gốc: "cạnh trên của bức tường trước mặt và cạnh dọc của tường bên hông không bao giờ gặp nhau". Tường bên
có HAI cạnh dọc; cạnh ở góc xa cắt cạnh trên ngay tại góc. Cùng bài: "góc giữa hai mặt phẳng lấy 0–90°" đi kèm ví dụ
laptop/sách mở, thường > 90°. Hai câu nghe đúng, chỉ lộ khi đặt toạ độ thật (`ROOM.edges.nearVertical/farVertical`).
Sửa thành khoảnh khắc trên hình: dải xé "skew?" → "THEY MEET"; "120°" → "60°". **Luật:** pha 0 dựng toạ độ cho mọi ví
dụ hình học đời thường (phòng, sách, thang, cầu) trước khi viết SCRIPT; ví dụ sai một nửa là cơ hội dạy, không chỉ
là lỗi để giấu (bổ sung §48).

## 80. Whisper báo khác: phân loại trước, tổng hợp lại sau; tên biến một chữ cái làm dính từ (solid-geometry, 2026-10-09)
23/212 câu bị whisper báo khác. Phần lớn vô hại: chính tả Anh–Mỹ (meters/metres), viết liền (onethird), đồng âm
(plane/plain). Năm câu đáng ngờ (line→lion, planes→players, bases→databases, gives us→given as, a lying→aligning):
tổng hợp lại năm take đó (dời wav cũ, chạy lại narrate, chỉ take mất cache mới gọi OmniVoice) thì bốn câu hết lỗi. Câu
thứ năm hỏng do CHỮ: "take a line a lying in plane P" đọc dính; sửa thành "take a line, call it a, lying in plane P".
**Luật:** lọc khác biệt theo loại; với câu nghi đọc sai thì tổng hợp lại take trước khi kết luận; tên biến một chữ cái
đứng cạnh mạo từ "a" phải tách bằng dấu phẩy hoặc "call it".

## 81. Tách nền: mảng nền sót trong khe, không xoá được theo màu (solid-geometry, 2026-10-09)
`pose-stool` và `pose-icosa` (nền xám nhạt) còn sợi xám sau đỉnh tóc và một mảng nền đục giữa quần và vạt áo. Chỉ
thấy khi ghép lên nền TỐI. Không xoá theo màu toàn ảnh được vì áo blouse trắng cùng màu nền (dò thấy 19 mảng trùng màu
nằm trong áo). **Luật:** soi ảnh cắt trên nền tối trước khi commit; mảng sót xoá theo VÙNG + màu bằng bảng `ERASE`
trong `tools/cutout/cutout.py` (toạ độ ảnh nguồn).

## 82. Kit giả định một mốc mà luật FROM làm sai: 6 nhóm tự vá cùng một chỗ (solid-geometry, 2026-10-09)
Brief bảo "đèn chớp + shimmer ở START − 2.4" cho cảnh mở hồi. Nhưng FROM = max(START − 2.6, KẾT cảnh trước + 0.5), mà
khoảng lặng trước hồi thường < 2.6 s, nên mốc đó rơi TRƯỚC FROM, lúc cảnh chưa hiện. 6/9 nhóm gặp, mỗi nhóm tự dời
về FROM + 0.35…0.95; thẻ hồi bắt đầu viết khi trang còn đang lật. **Luật:** mốc trong brief/kit phải tính từ FROM
thật (`max(START − 2.4, FROM + 0.95)`) và đặt sẵn trong hàm kit (`actCard`), không ghi số tuyệt đối trong brief.
Đạo diễn thử luật trên cảnh mở hồi có khoảng lặng NGẮN nhất trước khi giao.

## 83. Cảnh import cảnh: dấu hiệu kit thiếu vật dùng chung (solid-geometry, 2026-10-09)
Hợp đồng cấm cảnh import cảnh, vậy mà 5 chỗ làm vậy: c4 ← c1 (bản đồ), f3/f5 ← f1/f2/f4 (thang, sách, laptop), k3/k4
← a0 (ghế, thẻ chữ A, phòng thu nhỏ). Tệ hơn: ghế đẩu ba chân có HAI bản vẽ khác nhau (a0 `drawStool`, b2 `ST`) vì
hai nhóm không thấy nhau. §71 đã nói "vật dùng chung vào kit trước khi giao", nhưng DNA chỉ liệt kê vật xuyên suốt
(căn phòng). **Luật:** trước khi giao, đạo diễn quét bảng "hình theo từng phần" của DNA, liệt kê mọi vật xuất hiện ở
≥ 2 cảnh (ghế, sách, thang, thẻ, bản đồ) và đưa vào kit. Thấy cảnh import cảnh lúc ghép thì gom vào kit ngay.

## 84. Render 3D chiếu chậm 15–20 lần; người dùng tưởng đã xong (solid-geometry, 2026-10-09)
Bài 2D trước render vài phút. Bài này ~1.5 khung/s mỗi đoạn, khoảng 70 phút cho 19 phút video. Lý do: mỗi khung tính
bóng mềm 16 mẫu × bao lồi cho mỗi khối, painter, kết cấu giấy từng mặt. Tôi báo "đang render" mà không nói bao lâu;
người dùng hỏi "bạn xong chưa?" vì tưởng đã ở bước ghép. **Luật:** sau 2–3 phút render, đọc `frame=` trong log từng
đoạn, ước thời gian còn lại và báo con số. Tối ưu sau: giảm mẫu bóng khi vật đứng yên, cache bóng của vật tĩnh theo cảnh.

## 85. Đường nhanh cho bài dài: kit + MỘT cảnh mẫu + 9 nhóm song song (solid-geometry, 2026-10-09)
Người dùng: *"làm video nay hơi lâu rồi đó"*. Từ lúc DNA được duyệt: viết kit 3D (chép lõi từ trang lab đã được
chọn), một cảnh mẫu có thật (e3, chạy theo từ), BRIEF-PLATES riêng có bảng hạn mức tiếng cộng sẵn, rồi 9 agent song
song (1–2 hồi mỗi nhóm, kèm chỉ số câu đầu/cuối). 40 cảnh xong trong ~35 phút; chạy khô 68 127 khung, 0 lỗi; tổng
tiếng đúng trần ngay lần đầu. Cái giá là bỏ review độc lập và có lỗi §83. **Luật:** bài ≥ 15 phút → đường này; lab
được chọn chính là nguồn của kit; review độc lập chạy SONG SONG với render nếu người dùng cần nhanh.

## 86. Mascot NÓI trên tư thế toàn thân: không đè viseme được, vẽ miệng theo neo đo tay (sudoku, 2026-10-09)
Người dùng: *"cho nhân vật cử động miệng khi xuất hiện và khi nói"*. Bộ viseme có sẵn chỉ khớp mặt cận thẳng
(CHARACTER-V2), còn các tư thế bài học (ponder, point, ok…) có góc mặt và cỡ khác nhau, miệng chỉ rộng 9–35 px ảnh
gốc. Cách làm: đo tay tâm/bề rộng/góc nét miệng gốc từng tư thế (`assets/character-v2/mouths.js`, phóng 4× lưới
10 px), vẽ khẩu hình anime thủ tục (`engine/talk.js`), độ mở = đường bao giọng bản DRY (`tools/voice/mouth_env.py`).
Ba lần chỉnh trước khi đạt: ánh xạ −42…−16 dB làm miệng gần như luôn mở, đổi sang −30…−12 (trung vị lời OmniVoice
−25); lưỡi hiện thành vòng vì nét viền vẽ lên đường elip của lưỡi (dựng lại đường khoang trước stroke); người dùng
bảo *"mở to ra hơn"* → hh 0.2+0.6·open. Chỉ nói khi đã đứng hẳn (k ≥ 0.95), không thì miệng nhấp nháy lúc trồi lên.
**Luật:** chỉnh miệng trên bàn thử `tools/lab/talk.html` với lời thật, xin người dùng duyệt nhịp + cỡ TRƯỚC khi giao
cảnh; tư thế mới phải thêm dòng vào `mouths.js` (thiếu → ném lỗi); tổng hợp lại take nào thì chạy lại `mouth_env.py`
(build.py chặn khi độ dài lệch).

## 87. Nguồn là nhiều video của kênh khác: việc của mình là MẠCH + DỮ LIỆU GỐC, không chép lời (sudoku, 2026-10-09)
Người dùng gửi lời thoại 3 video Numberphile và nói *"rất cần bạn hoàn thiện nội dung, tuyến nội dung sắp xếp ý"*.
Ba video là ba cuộc trò chuyện riêng, mỗi cái tự giới thiệu lại sudoku. Làm: một mạch 6 hồi đi từ "đếm" (Phistomefel)
→ "đếm có biến" (5×5 − 4×4) → câu đố → giới hạn (17 gợi ý) → câu hỏi mở; viết lại bằng lời kênh, credit tác giả câu
đố + kênh nguồn trong mô tả. Phần giải chi tiết dựng từ DỮ LIỆU GỐC (SudokuPad: "scl" + lz-string base64 →
`data/difference-of-squares.sudokupad.txt`), mọi số trên hình do code tính và `must`. Bắt được một câu sai nhờ vậy:
"hình chữ nhật 7/9 trong lưới lời giải" không tồn tại trên lưới này; f4 dùng lưới đổi nhãn 7↔8 (phép đổi hợp lệ f3
vừa dạy) và ghi chú trên hình. **Luật:** câu khẳng định về MỘT trường hợp cụ thể (lưới này, hình này) kiểm trên chính
dữ liệu đó trước khi khoá lời; nguồn là lời thoại thì giữ bản gốc ở `SCRIPT.vi.md`, ghi rõ trong CONTENT câu nào mình
thêm/sửa.

## 88. Lời đọc gọi tên màu mà DNA chưa chọn (sudoku, 2026-10-09)
SCRIPT duyệt trước DNA nói "red and green" (theo video gốc). DNA kính màu chọn đỏ + xanh lam (khác độ sáng, an toàn
cho người mù đỏ–lục), nên phải sửa lời "green"→"blue" và tổng hợp lại riêng các câu đó. Rẻ vì chưa có cảnh nào, đắt
nếu đã render. **Luật:** từ chỉ màu / chất liệu trong SCRIPT là phụ thuộc vào DNA: đánh dấu khi viết, chốt sau khi chọn
DNA và TRƯỚC khi tổng hợp giọng; màu tập hợp đo bằng số (khác độ sáng ≥ 20% hoặc có hoạ tiết).

## 89. Hàm kit chỉ được thử ở k = 0 và k = 1: trạng thái dở dang hỏng ở mọi nhóm (sudoku, 2026-10-09)
Cảnh mẫu của đạo diễn (c4) chỉ dùng ô kính đã hiện hẳn. Khi các nhóm dùng `pane` với 0 < k < 1 thì khung chì phía
sau lộ qua ô đang mờ dần; `roundel` (ô kính tròn chữ chạy) có công thức tiến độ sai, nên dòng thứ ba trở đi không bao
giờ viết xong. Cả hai lộ ra lúc soát ảnh SAU khi 7 nhóm đã nộp, phải sửa trong kit rồi chụp lại. **Luật:** trước khi
giao, đạo diễn chụp một tờ thử mọi hàm kit có tham số k ở k = 0.25 / 0.5 / 0.75 / 1 (và hàm nhiều dòng với ≥ 3
dòng); "cảnh mẫu chạy đúng" không chứng minh hàm kit đúng ở mọi trạng thái (bổ sung §85).

## 90. Brief cũ sau khi đạo diễn đổi kit; quên CONTINUES ở mối nối cùng bố cục (sudoku, 2026-10-09)
Sau khi viết lại kit và cảnh mẫu, BRIEF-PLATES vẫn nhắc tên cảnh cũ (`e3-three`) và một ERA không còn (`desk`); bắt
được trước khi giao nhờ grep. Lúc ghép, e3 → e4 cùng ô cửa, cùng lưới nhưng e4 thiếu `CONTINUES`, nên trang trượt hai
bản cùng bố cục (§50). **Luật:** sửa kit/cảnh mẫu xong thì grep BRIEF tìm mọi tên cảnh, ERA, hàm kit và đối chiếu
với code; trong BRIEF ghi sẵn cột "nối tiếp cảnh trước?" để nhóm đặt `CONTINUES`; soát mối nối bằng so pixel khung
cuối/khung đầu (trùng tuyệt đối → cần CONTINUES).

## 91. Bài Nhật không phải bài Anh dịch lại; nguồn của người dùng cũng phải soát toán (ja/pi, 2026-10-10)
Người dùng gửi nội dung tiếng Việt và nhờ "chỉnh sang script tiếng Nhật chuẩn người Nhật". Giữ mạch của `projects/en/pi`
(đã soát sự kiện), nhưng viết lại từng câu bằng cách người Nhật giảng (です/ます, câu ngắn, 「」 cho khái niệm), và bản
địa hoá phần MÓC: lớp 6 → 小学5年 (đúng chương trình Nhật), tin đồn「円周率は3」, đề 東大 2003「3.05より大きい」 giải
ngay trên hình, 和算 (村松・関・建部) thay van Ceulen, người Nhật giữ kỷ lục tính π, thuật ngữ và thứ tự công thức theo
SGK (円周＝直径×円周率). Soát độc lập bản Nhật bắt ba lỗi toán có từ bản nguồn: "chữ số không hết" KHÔNG phải lý do
cầu phương bất khả (√2 cũng không hết mà dựng được — lý do là siêu việt); số dư của 1÷7 lặp muộn nhất ở bước 7, không
phải "trong 6 bước"; 「辺を2倍」 phải là 「辺の数を2倍」. **Luật:** nguồn của người dùng soát như nguồn ngoài (CONTENT ghi
câu nào thêm/sửa, giữ bản gốc ở `SCRIPT.vi.md`); bản địa hoá đổi VÍ DỤ, NGƯỜI, ĐỀ THI và THUẬT NGỮ, không đổi mạch; một
reviewer đọc tiếng Nhật soát SCRIPT trước khi đọc giọng.

## 92. Whisper tiếng Nhật báo khác: phần lớn là chữ Hán đoán sai, không phải giọng đọc sai (ja/pi, 2026-10-10)
`ja.compare` so theo kana vẫn báo sai ở: tên người viết bằng chữ Hán (劉徽, 祖沖之, 建部賢弘 — whisper đoán chữ khác cùng
âm), số 0 (れい ↔ ぜろ), trợ từ đếm (3つ = みっつ, unidic đọc さんつ), 角形 (かっけい ↔ かくがた), 1辺 (いっぺん ↔ いちへん).
Đọc lại các câu đó không đổi gì; sửa đúng chỗ là dạy bộ so (`_HEARD` trong `tools/voice/ja.py`) rồi test. Ngược lại có
một lỗi THẬT mà đọc lại không chữa: giọng nuốt 「4分の1回転」 ba take liền; viết lại thành 「直角は、π/2です」 thì đọc đúng
ngay (hình vẫn vẽ một phần tư vòng). **Luật:** báo khác → nghe take đó trước, phân loại (bộ so sai / giọng sai); bộ so
sai thì thêm mẫu vào `_HEARD` + test, không đọc lại; cùng một cụm hỏng hai lần đọc lại thì VIẾT LẠI cụm, đừng thử lần ba
(bổ sung §80 cho tiếng Nhật).

## 93. Bước rẻ nhất hỏng ở cuối: phụ đề vỡ sau 2.5 giờ render (ja/pi, 2026-10-11)
`build.py` render xong, ghép intro + tiếng, rồi `publish.py` dừng vì không tìm thấy từ 「でしたで」 trong câu: `ja.words`
gộp trợ từ て/で vào từ đứng trước kể cả khi giữa chúng có 。 ("でした。でも"). Lỗi có từ lúc `align.py`, nhưng chỉ bước
CUỐI mới đọc lại chữ của từng từ. Sửa: `words()` không gộp qua dấu câu (cho bài sau); `publish` chấp nhận dấu câu xen
giữa ký tự khi tìm từ (cho timeline cũ) — nên không phải căn lại mốc và render lại. **Luật:** sau `align.py` chạy ngay
`publish.py <p>` (vài giây) để dựng thử SRT + chương; mọi bước rẻ ở cuối đường ống phải chạy thử được trên dữ liệu
trung gian TRƯỚC bước đắt (bổ sung §70).

## 94. Số làm tròn sai hướng biến chứng minh đúng thành sai (ja/pi, 2026-10-11)
Hai lỗi cùng gốc, reviewer bắt sau khi các nhóm nộp. (1) Chuỗi giải đề 東大 ghi 「円周率 > 3.106 > 3.05」 + dấu 証明終,
nhưng 12·sin15° = 3.10583: `toFixed(3)` làm tròn LÊN một cận DƯỚI, nên bước đầu sai. Sửa: 「> 3.1058… > 3.05」 + `must(12*sin(π/12)
> 3.105)`. (2) Bảng 正96角形 ghi 3.1410 / 3.1427 (giá trị thật) nhưng kết luận ghi 3.1408 < π < 3.1429 (phân số của
Archimedes) — người xem thấy mâu thuẫn. Sửa: dây dẫn từ số thật sang phân số + テロップ 「分数で安全側に丸めた」. Cùng đợt:
bảng 1÷7 đánh dấu 「7回目」 ở dòng thứ 6 vì thiếu dòng số dư ban đầu; テロップ 「どんな整数でも解にならない」 đọc như "π
không phải số nguyên". **Luật:** cận dưới làm tròn XUỐNG, cận trên làm tròn LÊN (`Math.floor/ceil` theo số chữ số), và
`must` kiểm chính CHUỖI hiện trên hình so với hướng bất đẳng thức; hai con số cùng đại lượng trên một khung phải có câu
nối giải thích vì sao khác; bảng đếm bước đối chiếu số dòng với số lời đọc nói.

## 95. Luật brief bị phá ở mọi nhóm: cỡ chữ, màu son, dòng kicker (ja/pi, 2026-10-11)
BRIEF ghi "chữ ≥ 28 px" và "son 朱 chỉ cho π và đáp án đã chứng minh". Review hai nửa video vẫn đếm ~30 chỗ: chữ 22–26 px ở
6/7 nhóm (chữ Hán nét dày nên nhỏ hơn chữ Latin cùng cỡ là khó đọc hơn), son ở 判子「必ず」, thước dưới bất đẳng thức,
thanh nửa chu kỳ, các cận đúng tô màu thép (màu của cái SAI, §58); mỗi nhóm tự viết dòng kicker của hồi nên một hồi có
ba cách ghi. Chính kit của đạo diễn cũng để kicker/nhãn ảnh 22–26 px. **Luật:** luật đo được thì máy giữ, không để brief
giữ: hàm chữ của kit (telop, engrave, heading) ném lỗi khi chữ Nhật (JP/MIN) < 28 px — số mũ và vạch chia MONO được miễn, màu nghĩa chỉ ra qua hàm có tên nghĩa (`pi()`, `answer()`), bảng kicker từng
hồi nằm trong kit (`ACTS`). Trước review chạy grep `grep -nE "\b(1[0-9]|2[0-7])px|size: ?(1[0-9]|2[0-7])\b" plates/*.js kit.js` (bản cuối ja/pi
còn 21 dòng, đều là số mũ, phím máy tính, vạch chia — xem từng dòng, không cấm mù) và tìm mọi chỗ dùng màu nghĩa ngoài
hàm của nó (bổ sung §61, §71).

## 96. Lời Nhật chậm hơn, cảnh thưa hơn: mỗi ~3 s một テロップ, và mỗi テロップ có tiếng (ja/pi, 2026-10-11)
Lời Nhật ~6.6 mora/s, câu dài hơi; cùng một ý chiếm nhiều giây hơn bản Anh. Review bắt bảy chỗ hình đứng yên 3–30 s:
đầu cảnh chỉ có tiêu đề + hộp テロップ rỗng (b4, c1, c4), d3 tĩnh ~30 s qua bảy câu, biển cuối lệch trái với nửa phải
trống 11 s, ô kính nhỏ trống ~20 s. Cùng lúc người dùng muốn tiếng hiệu ứng dày hơn (~1 tiếng / 3 s, mỗi テロップ có
tiếng — `channels/ja/CHANNEL.md`). Hai luật là một: nhịp テロップ quyết định nhịp tiếng. **Luật:** kênh Nhật, brief ghi
"không quá 3 s không có テロップ/vật mới" và "phần tử chính hiện từ FROM + 0.3"; reviewer đo khoảng trống bằng danh sách
cue (`shoot.js cues`) — khoảng giữa hai cue > 4 s là chỗ cần xem ảnh.

## 97. Hạ tầng cho thư mục lồng: .gitignore, agent không tiếp tục được, mốc vô hạn (ja/pi, 2026-10-11)
(1) Mẫu .gitignore viết cho `projects/<p>/audio` không phủ `projects/ja/<p>/audio`: commit dính ~300 MB wav; một dòng
có chú thích cuối dòng làm mẫu đó vô hiệu (git không có chú thích cuối dòng). Gỡ bằng `git reset --soft`, thêm mẫu
`projects/*/*/audio/…`. (2) Agent của Workflow không nhận SendMessage sau khi xong: sửa sau review phải viết danh sách sửa
ra file (`out/<p>/qa/fix/<nhóm>.md`, file:dòng + cách sửa) rồi giao agent MỚI. (3) f1: chặng cuối `[mốc, Infinity]` đưa
vào `prog(t, b, b + 0.6)` → NaN → `translate(NaN)` nên π không hiện; chạy khô không báo vì không có lỗi JS. Nay
`engine/lesson.js prog` ném lỗi khi kết quả NaN (và `prog(t, a, a)` trả 0/1 thay vì NaN). **Luật:** đổi bố cục thư mục
thì `git check-ignore -v` thử một file mẫu ở chỗ mới; trước commit xem `git diff --cached --stat` (file > 10 MB là sai);
chú thích .gitignore đứng dòng riêng.

## 98. Việc song song: một lệnh "dọn dẹp" của nhóm này giết lệnh của nhóm khác; mặc định ghi đè; một đoạn render nghẽn cả bài (ja/2048, 2026-10-12)
(1) Bảy nhóm viết cảnh chạy `shoot.js check` cùng lúc; một nhóm gõ `pkill -f "shoot.js check"` (§19) và giết check của hai
nhóm khác (mã 144) — họ phải chạy lại qua `setsid`. (2) Người soát chạy `shoot.js cues` không có `--out`: mặc định là
`out/en/intro.mp4`, tệp JSON đè lên đó (may là tệp lạc, intro thật ở `out/en/intro/`). Nay `cues` thiếu `--out` thì dừng (§60).
(3) `build.json` mẫu render p1 bằng MỘT tiến trình (`split: 1`): p1 dài 2 phút = 7 300 khung, mười đoạn p2 mỗi đoạn 4 700
khung, cùng 1.6 khung/s ⇒ p1 quyết định giờ xong (~75 phút thay vì ~50). **Luật:** brief cho nhóm song song cấm `pkill -f`
/ `killall` (ghi ở `templates/lesson/BRIEF-PLATES.md`); mọi chế độ công cụ ghi file phải đòi đường ra; `split` của từng
trang ≈ số khung trang ÷ số khung một đoạn p2 (mẫu nay p1 `split: 2`).

## 99. "Mỗi テロップ một tiếng" × 7 nhóm = gấp đôi trần tiếng; tỉa thì phải giữ trần dưới (ja/2048, 2026-10-12)
DNA ghi ~1 tiếng / 2.5–3.5 s; brief ghi "mỗi テロップ có tiếng". Mỗi nhóm tuân thủ câu sau và ra 1 tiếng / 1.2–1.9 s
(`pen` chiếm 40%), cả hai người soát cùng nói "ồn". Tỉa theo danh sách thì lại thủng khoảng lặng 4–7 s ở 4 chỗ (phải thêm
tiếng trả lại). **Luật:** brief ghi trần bằng SỐ cho từng cảnh (số tiếng ≤ thời lượng ÷ 2.5, ≥ thời lượng ÷ 4) và cách
đếm (`shoot.js cues --out`), không chỉ "mỗi テロップ"; テロップ phụ (@dim) không có tiếng; khi tỉa, sửa song song hai điều
kiện: mật độ và khoảng lặng dài nhất ≤ 4 s.

## 100. Bàn cờ "đang chơi" trên hình phải theo đúng luật, kể cả ở cảnh minh hoạ (ja/2048, 2026-10-12)
DNA cấm "bàn mini ở trạng thái không hợp lệ" và kit có `slide`/`spawn` thật, vậy mà review bắt: d1 dây chuyền sáu lượt
vuốt không có quân mới rơi (cuối cùng một quân 256 trên bàn trống — không thể có), a0/b1/c2 cũng vuốt liên tiếp không
spawn. g2 「まずい場所に1枚」 trên bàn chỉ còn MỘT ô trống — không có "chỗ tốt" để so nên câu không còn nghĩa (sửa: hai ô
trống, `must` ô A thì thua chắc, ô B thì còn đường). **Luật:** hình đã dựng là "ván thật" (có quân mới rơi ở trước đó) thì
mọi lượt vuốt sau đều `spawn`; chuỗi bỏ spawn chỉ được dùng ở cảnh khái niệm và ghi chữ rõ (vd 「たたむと」); câu so sánh
("chỗ xấu", "nước tốt nhất") cần ít nhất hai lựa chọn trên hình, có `must` cho cả hai.

## 101. Nguồn là lời một video kênh khác có số thí nghiệm riêng (ja/2048, 2026-10-12)
Bản gốc nói "tôi cho máy chạy 200 000 ván…", "71.5%"; người dùng chốt bám sát, không chạy lại. Viết lại thì không được để
ngôi "tôi/私たち" nhận thí nghiệm đó: lời đọc 「〜させた実験があります」, 「シミュレーションで測ると」; CONTENT tách bảng "đã kiểm"
và "chưa kiểm được (của video gốc)"; mô tả YouTube ghi 「構成参考」 + câu số thí nghiệm là của video đó. Các sự kiện kiểm được
thì vẫn kiểm (bản 2025 hoá ra là dự án GitHub tự công bố, không ghi năm → bỏ năm; nhóm Đài Loan 2016 là MỘT ván 65536
trong 10 000; Cirulli là lập trình viên, không phải sinh viên). **Luật:** bổ sung §87 — số liệu mình không tự đo thì gán
đúng chủ, không nói ngôi thứ nhất; câu nguồn chưa kiểm được ghi riêng trong CONTENT để người dùng biết.


## 102. `stills --t` là giờ TRANG, brief ghi giờ timeline (ja/chirality, 2026-10-13)
Brief cảnh bảo các nhóm chụp `shoot.js stills --t <giờ timeline>`; trang p2 có LEAD (p2 +3.0 s, p1 +0.6 s) nên mọi ảnh
lệch 3 s — nhóm nhìn khung SAI rồi kết luận "sạch". Cả hai người soát cùng bắt. **Luật:** brief ghi rõ 「`--t` = giờ
timeline + LEAD」 kèm số LEAD từng trang; tên file ảnh là giờ trang, báo cáo ghi cả hai giờ.

## 103. Hình hoá học: chiều trái/phải phải lần theo CẢ chuỗi, review mới bắt (ja/chirality, 2026-10-13)
Hai lỗi HIGH đều là chiều: tinh thể mặt-phải lại quay ánh sáng sang trái và nằm ở đống trái (Pasteur), DIOP lấy từ đống
ngược thay vì 酒石酸 tự nhiên (quay phải). Mỗi khung riêng đều "hợp lý", chỉ sai khi nối mặt tinh thể → đống → ống →
mặt đồng hồ → nguyên liệu cảnh sau. **Luật:** cảnh có cặp đối quang thì brief ghi CHUỖI nhân quả một dòng (vd. mặt phải
= quay phải = tự nhiên = đống xanh bên phải = DIOP), người soát lần theo chuỗi đó qua các cảnh; kit giữ bảng màu-bên.

## 104. 8 agent Opus song song chạm giới hạn phiên; chọn model theo việc (ja/chirality, 2026-10-13)
Vòng sửa gửi 8 agent cùng lúc, không ghi `model` → thừa hưởng Opus của luồng chính; 7/8 chết giữa chừng (HTTP 429), mất
cả vòng. Chạy lại bằng Sonnet, 4 agent một lượt, đọc `git diff` phần dở để làm tiếp: xong trong ~30 phút, ~90–125k token
mỗi agent, 0 lỗi. **Luật:** việc code theo brief/danh sách review → `sonnet`; tra/đếm → `haiku`; kịch bản, DNA, review
độc lập → `opus`; ≤ 4 agent song song; brief cho agent tiếp sức nói rõ "đọc diff, đừng hoàn tác". Phụ: `clean.sh` tìm
`out/ja/<p>/ja/<p>.mp4` (mã có dấu `/`) — đã sửa dùng `${1##*/}`.

## 105. Thumbnail AI: cặp đối quang phải là ẢNH GƯƠNG, xem ở cỡ điện thoại (ja/chirality, 2026-10-13)
Người dùng gửi hai thumbnail AI vẽ. Bản đẹp hơn về chất liệu (thư pháp vàng, hợp 漆と金) lại vẽ hai phân tử L/D **cùng
một dạng**, chỉ khác màu — ảnh tịnh tiến, không phải ảnh gương; video nói đúng điều ngược lại. Bản được chọn có hai phân
tử lật trái–phải (nguyên tử đỏ dưới-phải ↔ dưới-trái) và màu chữ 生命 xanh = phía L, 片方 vàng = phía D. Thu nhỏ còn
336 px rộng mới thấy: chi tiết nhỏ (bàn tay L/D-form, "Chiral", đồng xu) mất hết; chữ cuối 「？」 nằm ở góc phải dưới —
đúng chỗ YouTube đè nhãn "17:00". **Luật:** soát thumbnail như soát cảnh nội dung: vật mang KHÁI NIỆM chính (đối quang,
công thức, chữ số) phải đúng khái niệm; xem bản 336 px; chừa góc phải dưới. Báo người dùng lỗi khái niệm trước khi nói
về thẩm mỹ.

## 106. Ước lượng từ số đo; công cụ im lặng; LLM ngoài chậm và cần quyền (ja/chirality, 2026-10-13)
- Tôi báo render "~2.5 giờ", thực tế 39 phút (17:00, `build.py` song song). Số đo cũ có sẵn trong nhật ký (sudoku ~30
  phút / 11 phút video). **Luật:** ước lượng = thời lượng × tốc độ đo được ở bài trước cùng loại (2D phẳng ≈ 2.3 phút
  render / phút video; 3D chiếu ≈ 3.6), không đoán.
- `tools/qa/sheet.py` chỉ đọc `*.png`; đưa thư mục ảnh `.jpg` → ra tờ đen ~11 KB, mã 0 (lặp lại §20). Đã sửa: đọc cả
  `.jpg`, không có ảnh thì mã 1.
- `tools/qa/clean.sh <p>` xoá CẢ `out/_lab` (mọi bài) — đúng quy ước "xoá lúc nào cũng được", nhưng ảnh soát cần giữ để
  so thì chép ra trước.
- NVIDIA NIM (`tools/llm/nim.py`, GLM-5.3): bản thử mất 174 s cho một câu ngắn; lệnh gửi SCRIPT/CONTENT ra máy chủ ngoài bị
  auto mode chặn (đưa dữ liệu ra ngoài) — không lách. **Luật:** LLM ngoài chỉ làm người soát thứ hai chạy nền, khi người
  dùng đã cho phép gửi nội dung; không đặt vào đường găng (viết cảnh, sửa lỗi).

## 107. Cắt cho vừa độ dài làm mồ côi một lời hứa ở mở bài (ja/hikari, 2026-10-14)
SCRIPT v1 hứa 4 câu hỏi; câu ③ 「宇宙を飛び交う光のほとんどが、なぜ見えないのか」. Để giữ +5 % độ dài, tôi cắt bức xạ
nền vũ trụ — đúng thứ làm câu ③ đúng nghĩa đen — và hồi 4 thành chuyến tham quan phổ, không trả lời "vì sao". Người soát
độc lập bắt (HIGH); sửa bằng 5 dòng "cửa sổ" (đỉnh phổ Mặt Trời, photon vừa đủ đổi hình phân tử) + nói lại câu hỏi.
Cùng bài: nguồn người dùng gộp mọi nguồn sáng vào "electron nhảy bậc" — Mặt Trời/nến/dây tóc sáng vì NÓNG (bức xạ nhiệt).
**Luật:** sau mỗi lần cắt, lập bảng lời hứa → câu trả lời (dòng SCRIPT) và kiểm lại từng dòng; câu khẳng định "mọi X đều
…" trong nguồn là chỗ soát đầu tiên.

## 108. Màu phổ: kiểm CẶP màu lời đọc đem ra so, không kiểm từng màu (ja/hikari, 2026-10-14)
`wl2rgb` theo bảng CIE 1931 qua cắt gam sRGB cho 450 nm = RGB(89,4,255), gần như 紫 RGB(124,3,255). Dải thử ở khung
phong cách "trông đúng", hue `must` từng bước sóng đều qua — nhưng đúng cảnh 「空はなぜ青い — sao không tím」 hai thanh
「青」「紫」 giống nhau. Người soát A đo pixel mới thấy. Sửa trong kit: neo hue < 470 nm + `must` khoảng cách hue
tím–lam–lục lam ≥ 25°/40°. **Luật:** kit màu có `must` cho mọi CẶP mà kịch bản đối chiếu (lam/tím, đỏ/cam…); cảnh so
sánh màu lấy bước sóng đại diện rõ (lam 470), chiều cao/số liệu vẫn theo bước sóng thật.

## 109. Từ khoá vật lý bị giọng đọc lệch: chú âm TRƯỚC take đầu (ja/hikari, 2026-10-14)
「光子」 bị Jaikyu đọc thành キーコ/カツコ/ミツコ/軽子/教師… ở ~10 câu; lượt redo đầu vẫn sai 5 câu; chỉ hết khi đổi thành
`{光子|こうし}`. 「空じゅう」 → コラジュー hai lần → viết lại 「空のあちこち」 — và cảnh f5 neo `w(107,'空じゅう')` chết khi
nạp (G7 bắt hộ). OmniVoice lần này bỏ qua SIGINT, phải `kill -TERM` PID python con. **Luật:** thuật ngữ khoá của bài (từ
Hán 2 chữ ít gặp) chú âm ngay trong SCRIPT v1; khi redo đổi chữ, `grep` chữ cũ trong `plates/` và BRIEF rồi chạy
`lookups.py` + check trước khi coi là xong.

## 110. Vòng sửa: gửi lại đúng agent đã viết; "giảm pop" thành "dồn sang tick" (ja/hikari, 2026-10-14)
Vòng sửa gửi `SendMessage` cho chính 7 agent Sonnet đã viết nhóm (còn ngữ cảnh): mỗi nhóm 6–9 phút, ~10 tool call, so với
~25 phút viết mới; kit sửa trước bằng một agent riêng rồi mới tới nhóm. Nhưng lệnh "thay một nửa pop bằng loại hợp nghĩa"
làm pop 45 % → 16 % còn tick 4 % → 35 %. Soát cuối của luồng chính (tờ 48 ảnh + soi một khung lạ) còn bắt một テロップ
chỉ đọc được ~1 s và chữ trượt qua vách 雨戸 mà hai reviewer bỏ qua (ảnh rải 2.5 s rơi đúng giữa hai lần). **Luật:**
brief tiếng ghi trần TỈ LỆ mỗi loại (≤ 25 % tổng), đếm bằng code sau vòng sửa; luật "mỗi テロップ đọc được ≥ 2 s, không
vật gì đi qua vách" nên thành `must` của kit thay vì dặn từng nhóm.

## 111. Gói đăng làm SAU render → phải làm lại mở đầu (ja/2048, 2026-10-19)
ja/2048 render 2026-10-12, trước khi có PACKAGING. Soát trước khi đăng: 0–5 s là bàn trống + 「縦に4マス…ルールは、たった2つ
です」 (luật chơi — không lời hứa, không vật của thumbnail); lời hứa「131072、それより大きくは決してなりません」 tới 1:30;
lịch sử Cirulli / Threes / 1024 chiếm 25 s của mở đầu; title 36 ký tự không khớp câu đầu. Sửa: 5 câu mới (hai bàn
「1時間 | 1000時間」 chơi thật), lịch sử 3 câu → 1, câu hỏi ① đổi theo title; đọc 7 take, căn, render lại — hơn 2 giờ.
Cùng chỗ hở ở fifty-percent (6 view / 7 ngày → đổi gói sau khi đăng). **Luật:** 4 dòng gói (thumbnail → title → 0–5 s →
0–30 s, PACKAGING §0) viết và duyệt TRƯỚC lời đọc; bài cũ chưa đăng soát 4 dòng đó trước khi đăng (PACKAGING §0b).

## 112. "Tôi đã chơi 1000 giờ" — cực đoan bằng công sức chỉ khi công sức có THẬT (ja/2048, 2026-10-19)
Người dùng muốn title kiểu "1000 giờ chơi 2048 và tôi tìm ra…". Kênh không chơi; số thí nghiệm của video là của kênh
Ratio (§101). Nhận công sức không có là phản bội người xem và tự đặt bẫy cho bình luận. Cách giữ ý mà vẫn đúng: viết
thành **so sánh** (「1時間やった人と、1000時間やった人。」 — không nhận là mình), hình minh hoạ bằng ván chơi THẬT theo luật
(trái `kit.play` bấm bừa thua 4 ván; phải bot dồn góc tới 2048). **Luật:** "lý do tin" kiểu công sức (PACKAGING §2) phải
có trong video và là của kênh; không có thì dùng so sánh, con số của nguồn (ghi đúng chủ), hoặc tự làm thật (máy chạy
"1000 giờ người chơi" ≈ 3.6 triệu nước chỉ mất vài giờ).

## 113. Thumbnail: mascot to giữa khung, hai bên cùng tông → đối lập chỉ nằm ở chữ (ja/2048, 2026-10-19)
v2 (gpt-image theo prompt của ta): mascot ~30% bề ngang đứng giữa, hai bàn cùng gỗ nâu ấm — che chữ thì không thấy bên
nào thua. Người dùng: "mascot quá to trong khi audience chưa rõ bộ nhận diện… dùng nội dung để kể; ít nhất 2 tư thế:
bối rối ↔ khám phá; đánh vào tương phản màu sắc." v3: chéo lạnh xám-xanh ↔ ấm vàng, 2 tư thế, 2048 phát sáng có ngón tay
chỉ — đọc được ở 168 px. Nhưng model ảnh vẫn vẽ mascot phải ~½ chiều cao dù prompt ghi 22%. **Luật:** PACKAGING §3
(mascot ≤ ~25%, không ở giữa; đối lập bằng MÀU + hình); ràng buộc cỡ đặt ĐẦU prompt và so với vật ("no taller than one
board"), không chỉ bằng %.

## 114. Title lặp chữ của thumbnail = phí một móc (ja/2048, 2026-10-19)
Hai title đã chốt cho A/B — 「2048、1時間の人と1000時間の人は何が違う？」 và 「同じ2048なのに…1時間と1000時間で何が変わる？」 —
lặp đúng 「1時間 / 1000時間」 trên thumbnail; người xem đọc title không biết thêm gì. Gate A4 đã có nhưng bị bỏ qua vì
title viết theo hướng người dùng đặt cho THUMBNAIL. Đề xuất sau: thumbnail CHO THẤY đối lập, title NÓI nửa còn lại —
khẳng định trái niềm tin + lời hứa toán: 「2048は運ゲーじゃない。上級者の並べ方は数学で説明できる」. **Luật:** chấm title
và thumbnail như MỘT cặp (PACKAGING §2a): không chung từ khoá chính; một bên cho thấy, một bên nói vì sao.

## 115. Sửa một phần bài cũ: module chung đã đổi → p2 render lại vô ích; dữ liệu "chơi thật" bằng node (ja/2048, 2026-10-19)
Chỉ p1 đổi, nhưng build báo "đoạn giữ lại 0/14": src_hash của p2 gồm `engine/sfx.js`, đã sửa sau đó cho ja/chirality,
ja/hikari (loại tiếng mới) → 10 đoạn p2 render lại (~45 phút thừa, 1.5 khung/s mỗi job khi 14 job chạy chung). **Luật:**
sửa bài cũ → `git log --since=<ngày render> -- engine/`; module đổi không chạm hình của trang kia thì `build.py --keep`
(giữ theo from/to/dur/lead; trang đổi độ dài vẫn tự render lại). Kèm: cảnh "chơi thật" sinh dữ liệu bằng node import
thẳng `kit.js` (`projects/ja/2048/data/opening.mjs`), cảnh đọc lại bằng `slide`/`spawn` và ném lỗi ở nước không hợp lệ —
dữ liệu và luật không thể lệch nhau.

## 116. Gói trước lời: bài đầu tiên chạy đúng thứ tự — không phải làm lại mở đầu (ja/gacha, 2026-10-19)
Quy trình PACKAGING §0b từ ngày đầu: cổng ý tưởng (đo trần bằng `yt-dlp "ytsearch25:ガチャ 確率 数学"` — 590K / 484K /
459K, chỗ trống = các video chỉ dừng ở "1% × 100 = 63%"), 3 cặp thumbnail + title khác CƠ CHẾ duyệt trước khi viết lời,
0–5 s viết là "thumbnail đang chuyển động", 30 s bốn nhịp. Kết quả: không sửa mở đầu sau render; thumbnail người dùng
render đạt cả 4 phép thử ngay lần đầu. So với ja/2048 (§111: hơn 2 giờ làm lại). **Luật:** giữ nguyên thứ tự này.

## 117. Kịch bản nêu một cơ chế → mô phỏng nó bằng code TRƯỚC khi viết; mỗi hồi một mô hình (ja/gacha, 2026-10-19)
Kịch bản nguồn có lỗi số ("từ lần 74 tỉ lệ ~32%" — thật là 6.6% rồi +6%/lần; Skinner 1938 + bồ câu — 1938 là chuột, bồ
câu là 1957; "< 2% tạo nửa doanh thu" — thật là 0.15%) VÀ một mâu thuẫn ẩn: "quay 100 lần, 55% trắng tay" sai với game có
天井 90. Mô phỏng mô hình 天井 (10 dòng Python) cho phát hiện mạnh hơn bản gốc: 36% trúng trước 74, quá nửa quay ≥ 76, trung
bình 62.3 = đúng tỉ lệ gộp 1.6%. Sau đó vẫn lọt một lỗi: cảnh b4 (ACT 1 "表の数字どおり") hiện 「80回を過ぎても 16人」 — số
của mô hình 天井 trong hồi đang dạy mô hình 0.6% đều (đúng phải ≈ 124). **Luật:** cơ chế trong kịch bản → mô phỏng, đặt
mọi số vào CONTENT kèm mô hình sinh ra nó; brief ghi rõ hồi nào dùng mô hình nào; câu "nếu đúng như bảng" phải có trên
màn hình trước khi mô hình đổi.

## 118. Ảnh chụp nguồn phải ghi ĐÚNG con số được đọc (ja/gacha, 2026-10-19)
Ảnh GamesBeat (9/2014) có tiêu đề "only 1.35%" đặt cạnh テロップ 「約1.5%」 và lời 「およそ1.5%」 — cùng một bài, số tháng 7 khác
số tháng 1. Reviewer độc lập bắt. Thay bằng Destructoid 26/2/2014 "0.15% of mobile gamers bring in 50% of F2P revenue"
(đúng báo cáo Swrve số liệu tháng 1). **Luật:** trước khi chụp, tìm con số trong VĂN BẢN trang (curl + grep); ảnh nguồn
chỉ dùng khi chữ to nhất trên ảnh khớp lời; nhãn ảnh ghi thời điểm của số liệu.

## 119. Tự lấy ảnh: Chrome headless chụp trang và trang đầu PDF (ja/gacha, 2026-10-19)
Người dùng không đọc tiếng Nhật, không biết tải → mình lấy hết. `google-chrome --headless=new --screenshot` với
`--window-size=1600,1000`; trang nặng treo → thêm `--user-data-dir=$(mktemp -d) --timeout=20000` và `timeout 150`. PDF →
`pdftoppm -r 110 -f 1 -l 1`; link chết → bản `web.archive.org/web/2019id_/…`. Cắt bỏ quảng cáo, banner cookie, tranh có
bản quyền trong bài. Ảnh trong game / bài SNS người thật → TỰ VẼ. Lưu `assets/web/` + INDEX (nguồn, ngày). 16 ảnh thật
(8 Commons + 8 trang nguồn) cho một bài.

## 120. Cụm tiếng Nhật hỏng hai lần — viết lại, đừng đọc lần ba (ja/gacha, 2026-10-19)
Hỏng 2 lần liền: 「{誤謬|ごびゅう}」 (whisper nghe 語尾) → 「思い込み」; 「{2018年|…}{4月|…}、」 ĐẦU câu (nghe 2010年) → dời vào
giữa câu; 「{1000円|せんえん}のランチ」 (nuốt の → ぞ/ソ) → 「ランチが1回1000円なら」; 「あの{数秒|…}」 mất あの → bỏ あの; 「{70回|…}
から{80回|…}分」 ba lần (からは10回) → 「76回前後」; số ĐẦU câu 「{0.6%|…}。…」 mất âm đầu → dời số ra cuối câu. Đa số khác
(chữ số ↔ chữ Hán, 飽き ↔ 開き) là bộ so bắt nhầm. **Luật** (thêm vào `channels/ja/WRITING.md`): không mở câu bằng số
hoặc năm; tránh 「数字+の+danh từ」 sát nhau; từ Hán hiếm đọc khó → từ thường, để chữ Hán trên テロップ.

## 121. `pgrep -f "backend/main.py"` + kill tự giết shell — lặp lại §19 (ja/gacha, 2026-10-19)
Lệnh tắt OmniVoice gồm chuỗi "backend/main.py" trong chính dòng lệnh zsh → pgrep khớp cả shell → exit 144. **Luật:** tìm PID
bằng `ps -eo pid,cmd | grep -v zsh`, xem rồi `kill <pid>`; không gộp pgrep -f và kill trong một lệnh.

## 122. Báo cáo nhóm "đã kiểm" ≠ đã nhìn; quét đạo diễn mỗi 10 s + reviewer lệch mốc (ja/gacha, 2026-10-19)
4 nhóm đều báo check 0 lỗi và "đã soi", nhưng nhiều khung chỉ xem ở sheet nhỏ. Quét cả bài mỗi 10 s (91 khung, đủ mọi cảnh)
tìm 17 lỗi: chữ tràn mép khi trượt, テロップ chồng nhau, thẻ chữ rỗng, khung gần trống, giá gói tự bịa trên sao kê. Quét
lần hai LỆCH mốc (2, 12, 22…) bằng reviewer mới tìm thêm 2 lỗi SỐ (b4 16人, ảnh 1.35%). **Luật:** sau khi gộp nhóm: (1) đạo
diễn quét mỗi 10 s, trả lỗi theo mốc về đúng nhóm; (2) reviewer độc lập quét lệch mốc + đối chiếu lines.txt; chỉ render khi
verdict RENDER.

## 123. Thumbnail đạt lần đầu: ràng buộc cỡ ĐẦU prompt + khung 0.5 s làm ảnh tham chiếu (ja/gacha, 2026-10-19)
Prompt v1 「同じ？」: câu đầu "SIZE RULE FIRST: the boy is SMALL — no taller than the phone, ~30%", đính khung 0.5 s của video
(cùng vật, cùng màu). Ảnh về: mascot nhỏ góc trái dưới, điện thoại pastel ↔ slot son, chéo màu, 「同じ？」 đọc được ở 168 px,
góc phải dưới trống — đạt cả 4 phép thử, không vòng sửa (2048 cần 3 vòng). **Luật:** mẫu prompt này
(`projects/ja/gacha/thumbnail/prompt-v1-onaji.md`) là khung mặc định cho thumbnail SO SÁNH.


## 124. Đề tài "tên chương" được cứu bằng câu hỏi KHÔNG THỂ nằm sẵn trong chính bài (trig, 2026-10-20)
Script người dùng "Bản chất của lượng giác" = "The Essence of Trigonometry" — đúng kiểu đã thua 3 lần trên kênh Anh (§1
PACKAGING). Không đổi nội dung: câu hỏi mạnh nhất đã có ở Phần 3 (phút 3:20) — "sin 120° là gì khi không tam giác vuông nào
có góc 120°?" — kéo lên 0:00 thành móc "máy tính trả lời 0.866, tam giác gãy". Title cực đoan "Sine Was Never About
Triangles" được làm cho ĐÚNG bằng một sự thật thêm vào (jyā = dây cung; bảng Hipparchus là bảng dây cung trong đường tròn).
**Luật:** cổng ý tưởng trượt → tìm trong bài câu "không thể / luôn đúng" sớm nhất và dời lên đầu trước khi đổi đề tài; title
cực đoan phải có ≥ 1 sự thật trong video chứng minh nó, ghi vào CONTENT.

## 125. Cặp thumbnail ↔ title chấm NGAY khi đề xuất, kể cả đề xuất của mình (trig, 2026-10-20)
Bản xem trước gói A (do mình vẽ) đặt chữ thumbnail "NO TRIANGLE?" cạnh title "…About Triangles" — người dùng chọn đúng bản
đó; lúc viết SCRIPT mới thấy trùng từ khoá (§114) → đổi thành 「HOW?」 và báo lại. **Luật:** mỗi phương án gói đưa cho người
dùng đã qua bảng §2a (không chung từ khoá) trước khi đưa; 10 title + chữ thumbnail chấm cùng một bảng trong SCRIPT `---`.

## 126. Một video Anh 10 phút trọn quy trình trong một phiên (trig, 2026-10-20)
Thứ tự đã chạy: gói A (AskUserQuestion) → CONTENT + SCRIPT duyệt → giọng p1/p2 chạy nền CÙNG LÚC 3 agent lab (opus, mỗi
hướng 2 khung) → ghép `styleframes-compare` → người dùng chọn → MỘT agent opus làm kit + kit-test + trang + a0 + tự viết
BRIEF-PLATES (19 mục, 4 nhóm cân giây, bảng hạn mức tiếng có TỔNG) → 4 nhóm sonnet song song (~20 phút) → gộp order + chạy
khô → quét 10 s (8 lỗi) → reviewer opus lệch mốc (1 BLOCKER + 3 MAJOR) → sửa qua agent sonnet → build (12 đoạn, ~25 phút).
Ảnh Commons + nhạc dùng lại làm trong lúc chờ agent. **Luật:** đường này là mặc định cho bài ≤ 12 phút; việc của đạo diễn
là ghép, quét, giao lỗi — không tự vẽ cảnh.

## 127. `shadowBlur` không tất định theo THỨ TỰ khung → bóng sprite vẽ sẵn (trig, 2026-10-20)
Chụp cùng khung theo hai thứ tự khác nhau: bóng mờ lệch tới 6/255 (Chrome cache bóng) → mối nối giữa các đoạn render song
song có thể nhảy. Sửa trong kit: bóng chữ nhật bo góc = sprite 9 mảnh vẽ MỘT lần lúc nạp (cache theo bo góc / độ mờ / màu),
hào quang = gradient tròn; `shade(g, fn, {box})`. Hai thứ tự chụp ra giống từng byte. **Luật:** kit mới không dùng
`shadowBlur` / `ctx.filter` trong render (§53 mở rộng); kiểm tất định = chụp 8 khung xuôi + ngược rồi `cmp`.

## 128. Phụ đề: điền spoken.json TRƯỚC publish; viết tắt toàn hoa (trig, 2026-10-20)
SRT đầu ra "zero point eight six six", "one hundred and twenty degrees" và "sOH-CAH-TOA": OmniVoice đọc "SOH-CAH-TOA" thành
"sosh kash toe" nên lời viết "soh cah toa", rồi `_keep_case` của publish.py giữ chữ thường đầu cụm. Sửa: spoken.json 22 cặp
(120°, 0.866, −½, 1,000°, π/180, 2π…), publish.py giữ nguyên cách viết toàn hoa. **Luật:** viết tắt đọc như từ → viết
thường cách nhau trong SCRIPT + một dòng spoken.json; sau build `grep -n -i "zero point\|hundred\|thousand" subtitles-*.srt`
phải rỗng (trừ chỗ cố ý) — từ 2026-10-20 `publish.py` tự cảnh báo khi SRT còn số viết bằng chữ.

## 129. Ước lượng độ dài bản Anh bằng số từ, không theo mốc giờ bản Việt (trig, 2026-10-20)
Bản Việt ghi 0:00–12:58; SCRIPT Anh 1,954 từ → giọng Atlas đọc 609 s (~192 từ/phút) → video 10:14. **Luật:** độ dài =
số từ lời ÷ 190 phút + ~4 s mỗi `#`/`##`; báo người dùng con số này lúc duyệt SCRIPT.

## 130. Nhãn "tí hon" trong ảnh quét thường là pop-in dở dang hoặc bật ở từ cuối (trig, 2026-10-20)
4/8 lỗi quét (ONE NUMBER, IS COSINE, COSINE: HOW FAR ACROSS, vé Almagest) là vé đang bật / đang rời ở đúng khung chụp; hai
trong số đó bật ở TỪ CUỐI của cụm nên chỉ sống < 1 s. **Luật:** nhãn của một cụm bật ở từ ĐẦU cụm và sống ≥ 1.5 s; khi
quét thấy chữ nhỏ, chụp ±0.5 s trước khi giao sửa.

## 131. Tin nhắn người dùng giữa chừng dừng MỌI agent nền (trig, 2026-10-20)
Người dùng nhắn "OK tiếp tục" khi reviewer đang chụp → 6 agent nền bị dừng, reviewer mất kết quả (chỉ còn ảnh p1). **Luật:**
sau mỗi tin nhắn người dùng trong lúc có agent nền, kiểm thông báo dừng và chạy lại agent đang dở (giữ ảnh đã chụp, bảo
agent dùng lại). Bốn nhóm song song gọi bằng 4 lệnh Agent; công cụ Workflow chỉ khi người dùng yêu cầu.

## 132. Brief agent sai số → agent bắt; brief cũng là "nguồn" phải tính bằng code (logarithm, 2026-10-20)
BRIEF-LAB ghi "log₁₀(150e6 mg / 3 mg)" — 150 tấn là 1.5·10¹¹ mg; cả 3 agent lab đều bắt và dùng số đúng của CONTENT. Cùng
bài: thẻ "69.3 ÷ 6%" (sai toán, lời nói "÷ 6"), chồng xu "TWICE A YEAR" tiếp tục lớn tới $2.72 (lời nói $2.25) — reviewer
lệch mốc bắt cả hai. Cũng ở bài này: OmniVoice đọc "r percent" thành "our percent" → viết lại câu bằng số cụ thể (6% → 11.55 năm).
**Luật:** số trong brief chép từ CONTENT bằng code (không gõ tay); reviewer đối chiếu MỌI thẻ số
với câu đang đọc, không chỉ với CONTENT.

## 133. Archivo: "ln" đọc thành "In" — glyph phân biệt phải kiểm, không chỉ cmap (logarithm, 2026-10-20)
Font có đủ ký tự (cmap đạt) nhưng l thường và I hoa trùng hình → "ln" thành "In" ở 3 cảnh. Sửa trong kit: mọi chuỗi có
"ln" vẽ bằng Cormorant Italic. **Luật:** ký hiệu toán dễ nhầm (ln, l/1/I, O/0, x/×) kiểm bằng mắt ở kit-test trước khi
giao nhóm; DNA §Chữ ghi font cho từng ký hiệu.

## 134. Toàn quyền từ DNA: 18 cảnh + 2 vòng sửa + render trong ~2 giờ (logarithm, 2026-10-20)
Người dùng: "tự chủ triển khai toàn bộ… review kết quả cuối". Đường §126 chạy không dừng: kit + a0 (1 agent opus) →
4 nhóm sonnet bằng 4 lệnh Agent (~15 phút) → quét 10 s → 1 agent sửa → reviewer opus lệch mốc → 2 agent sửa SONG SONG
chia theo file (một agent giữ kit + a0 + b17, một agent giữ các cảnh còn lại — không đụng file nhau) → quét lệch mốc lần
hai → build. **Luật:** sửa song song chỉ khi chia được theo FILE; agent giữ kit chạy check cả hai trang sau khi sửa.

## 135. Chạy công cụ không tham số "để xem cách dùng" = chạy thật (dọn repo, 2026-10-21)
Khảo sát dung lượng, tôi gõ `tools/qa/clean.sh` không tham số để đọc usage — script xoá ngay `out/_lab` (3 GB: ảnh quét
trig/logarithm/gacha, bàn thử, `out/_lab/study`). Đúng quy ước "xoá lúc nào cũng được", nhưng không phải ý định. Lặp lại
§60 (mặc định nguy hiểm). Sửa: không tham số → chỉ in cách dùng + liệt kê file lạ; xoá `_qa` phải gõ `--qa`; `<p>` chỉ dọn
parts. **Luật:** muốn xem cách dùng → `sed -n 1,15p <script>` hoặc `--help`, không chạy trần; công cụ có xoá/ghi đè thì chế
độ mặc định (không tham số) là chế độ KHÔNG làm gì.

## 136. Hoạt ảnh nhân vật mới chưa qua bàn thử được người dùng duyệt thì không vào video (calculus, 2026-10-22)

Sau khi học "Animation vs. Geometry" và video median, tôi viết `engine/stick.js` (tư thế + IK tự tính) và đưa người que
vào calculus bản 2: thay người leo núi, 6 khoảnh khắc. Bàn thử của tôi chỉ có đường cong thoải và tôi tự chấm "đọc được"
qua ảnh crop; trên dốc gắt của bài thật (dốc màn hình ~50–60°), IK chân ép hông thấp → chân gập, tay chồng thân, dáng
"dị tật". Người dùng: "làm mà xấu… trông dị tật như thế này thì bỏ qua các hoạt ảnh thôi". Bỏ hết, trả bản v1 + tông
muted; mất ~2 vòng build. **Luật:** nhân vật / hoạt ảnh MỚI phải qua bàn thử riêng với tình huống KHÓ nhất của bài thật
(dốc gắt, cận cảnh, đang đi) + một clip ngắn người dùng xem và duyệt TRƯỚC khi gắn vào video; "đọc được" trong ảnh crop
của chính mình không phải chuẩn — chuẩn là dáng đẹp ở cỡ xem thật. Thà không có hoạt ảnh còn hơn hoạt ảnh xấu.

## 137. Hoạt ảnh nhân vật: ĐẠO DIỄN tư thế, không mô phỏng — IK chỉ để khoá chân (người que, 2026-10-22)

Sau §136 tôi học 6 video hướng dẫn của Alan Becker (người que, đi, chạy, 12 nguyên lý) + nguồn web (`docs/study/08-
stick-animation.md`) và tìm ra nguyên nhân gốc của dáng "dị tật": `engine/stick.js` tự SINH mọi khung bằng IK + một
sin cho bước đi — không có tư thế nào được đặt tay để duyệt; hông đặt theo bàn chân THẤP hơn (`stick.js:85` cũ) nên
trên dốc gắt chân phía trên gập tới ngực; chân đặt theo pha còn thân trôi theo t → trượt chân. Người làm nghề thì:
pose-to-pose (tư thế chính → khung giữa có ease), bước đi 4 tư thế contact / down / passing / up, lên bản đồ BƯỚC CHÂN
trước khi cho đi ngang màn hình, mỗi tình huống một bộ tư thế (dốc gắt = leo, không ép dáng đi). Bản 2
(`engine/stickmove.js`): `gait()` đặt chân theo bản đồ bước (chân trụ đứng yên 0 px), hông theo spline qua trung điểm hai
chân ở mỗi lần chạm đất, độ cao hông hạ đúng mức để chân với tới; tay suy từ vị trí THẬT của hai bàn chân (luôn ngược
chân); `keys()` cho tư thế đặt tay. Nối FK ↔ khoá IK (bật nhảy, tiếp đất, ngồi) phải nội suy điểm, không bật công tắc —
không thì chân giật một khung. **Luật:** nhân vật diễn bằng TƯ THẾ CHÍNH đặt tay + nội suy có ease; IK chỉ để khoá bàn
chân / bàn tay đã đặt; đi bộ theo bản đồ bước; dốc > 35° đổi hành động; chọn hành động hợp vật lý của cảnh trước khi
chỉnh tham số.

## 138. Gác chất lượng hoạt ảnh chạy MỌI khung bắt cái ảnh tĩnh bỏ sót — và phải tự trượt khi gặp NaN (người que, 2026-10-22)

> Lặp lại §38 (kiểm chính bộ kiểm) và §20 (công cụ im lặng) ở hoạt ảnh.

`tools/lab/stick2-qa.mjs` chạy `actor(t)` ở 30 fps, đo trên khớp thật engine trả về: góc gối, chân trụ trượt, độ dài
chi, chân lún đất, tay cắt thân, đầu nhảy px/khung. Lần chạy đầu bắt 3 lỗi mà 18 ảnh tĩnh không lộ: cú nhảy 58 px/khung
(thẻ quá cao), chân xuyên mặt thẻ khi ngồi (FK → khoá đổi đột ngột), và tư thế khoá thiếu trường hông → mọi số đo NaN mà
bộ gác vẫn in "✓ đạt" (so sánh với NaN luôn sai → không vi phạm nào). Đã sửa: tư thế khoá luôn trải từ `P.stand`; gác
coi khớp không hữu hạn là lỗi. **Luật:** hoạt ảnh nhân vật mới có gác số chạy mọi khung TRƯỚC khi chụp ảnh nhìn; mọi bộ
gác số phải trượt khi gặp NaN / rỗng; ảnh tĩnh crop + gác số vẫn chưa đủ — clip ở tốc độ thật cho người dùng (§136).

## 139. "Views" gồm cả autoplay trang chủ — đánh giá video bằng lượt xem thật, WATCH và CTR (phân tích kênh, 2026-10-23)

Phân tích video π kênh Nhật, mình kết luận sai HAI lần từ số thô: (1) "566 views / 74 người xem → xem lặp bất
thường" — 74 là số ước tính cũ của tab Reach, tab Device ghi 461 người; (2) "giữ chân rơi 81% → 58% ở giây 22–33 vì mở
đầu lệch title". Khi kéo API: nơi phát BROWSE (tự phát khi lướt trang chủ) 470 views / 71 phút (~9 s mỗi lượt), WATCH
88 views / 199 phút; `engagedViews` 85; CTR Studio 2.8% × 2 398 impressions ≈ 67 lượt bấm → người xem thật ≈ 70–90.
Đường giữ chân API trộn cả lượt tự phát, nên cú rơi đầu video không chứng minh được lời mở đầu dở. **Luật:** đánh giá
video bằng `engagedViews` + phút xem WATCH + impressions/CTR (Reporting API), không bằng `views`; báo cáo luôn tách
WATCH ↔ BROWSE; mọi số ghi nguồn (API / Reporting / Studio + ngày); số Studio mâu thuẫn nhau → kéo API trước khi kết
luận. Chi tiết: `docs/analytics/DATA.md`. Thêm: thời lượng xem TB của YouTube đã LOẠI lượt tự phát ở mẫu số (π: 270
phút ÷ ~89 lượt WATCH ≈ 2:59) — lấy số tổng YouTube trả, đừng tự chia phút cho views.

## 140. Quyền API theo kênh: Manager trong Studio không dùng được — chặn token sai kênh theo ID (phân tích kênh, 2026-10-23)

Đăng nhập OAuth cho kênh Anh ba lần đều trả về kênh Nhật: Google tự chọn lại tài khoản đã cấp quyền, và người dùng
chỉ là **Manager trong Studio** của kênh Anh (kênh của người khác) — quyền này không hiện trong bảng chọn OAuth; API chỉ
nhận chủ kênh hoặc Manager của **Brand Account**. Tên kênh thật ("99% from scartch") còn khác `channel.json`
("scratch") nên so theo tên cũng sai. Đã sửa: `tools/yt/auth.py` ép `prompt=select_account`, so `youtube_id` trong
`channels/<ch>/channel.json`, sai thì KHÔNG lưu token. Kênh cá nhân (như 99の発見) không có mục "Add or remove
manager(s)" — chuyển sang Brand Account chỉ khi cần thêm người cùng quản lý. **Luật:** công cụ ghi/đọc theo kênh phải
xác minh kênh bằng ID trước khi lưu thông tin đăng nhập; hỏi loại quyền (chủ / Brand Account / Studio) trước khi hứa
dùng API cho kênh của người khác. **Cập nhật 2026-10-23:** "mời vào Brand Account" là đường cũ — kênh đã chuyển sang
channel permissions thì Brand Account không còn áp dụng; đường chắc là CHỦ KÊNH cấp quyền một lần (từ xa: `stats.py --remote`). **Kết quả:** chủ kênh Anh chuyển kênh sang "managing
channel permissions through a Brand account" và thêm người dùng vào Brand Account → OAuth hiện bảng "Choose your
account or a brand account" → chạy. Công cụ công ty người dùng "lấy được" vì người bấm là tài khoản chủ kênh.

## 141. Trang phân tích dựng từ DỮ LIỆU CÓ SẴN bị chê hai lần — dựng từ CÂU HỎI (Channel Lab, 2026-10-23) — lặp lại §1, §4

Bản phác v1 và v2 đổ mọi báo cáo API thành biểu đồ: 45 nhãn ngày đăng đè kín biểu đồ, biểu đồ không nói ý nghĩa, ô cạnh
nhau cao lệch, nút Shorts chỉ lọc nửa dưới trang. Người dùng: "bạn nghĩ ai có thể theo dõi và ra được thông tin… chưa rõ
mục tiêu, biểu đồ giải quyết được vấn đề gì". Mình tự soát bằng "không có lỗi hiển thị" + ảnh chụp cửa sổ hẹp, nên
không thấy. Bản v3 làm theo nghiên cứu (YouTube Studio key moments, vidIQ/Vamos outlier, sách dashboard) và `site/DESIGN.md`:
mỗi khối = câu hỏi → câu trả lời TÍNH từ số → một biểu đồ → việc nên làm; bộ lọc áp toàn trang; không chữ trên biểu đồ;
so với chính kênh (hệ số so trung vị). **Luật:** công cụ / trang cho người dùng đọc: viết danh sách câu hỏi + câu trả lời
mẫu TRƯỚC khi vẽ (như gói + kịch bản trước code, §1); tự soát bằng ảnh chụp ở ĐÚNG độ rộng màn hình người dùng và đọc
như người dùng — mỗi khối trả lời câu gì? "Chạy không lỗi" chưa phải xong (§4).

## 142. Phân tích phải dùng thứ ĐANG HIỆN trên nền tảng, không bản trong máy (Channel Lab, 2026-10-23)

Bản phác v1 lấy thumbnail trong `out/<p>/youtube/` — cả 3 video Nhật đã đổi thumbnail trên YouTube, title cũng khác
`title.txt`. Người dùng đối chiếu Studio, mất tin vào việc "có lấy data từ YouTube không". Đã sửa: `pull.py` tải
thumbnail `maxres` từ Data API mỗi lần đồng bộ, lưu theo sha + lịch sử (thấy A/B), trang KHÔNG còn đường dự phòng về file
trong máy; video nối về bài bằng `channels/<ch>/videos.json` (id), không bằng title; trang có màn "Dữ liệu & nguồn".
**Luật:** mọi thứ đem ra phân tích (thumbnail, title, mô tả, số) lấy từ nền tảng, kèm nguồn + ngày; file trong máy chỉ
là bản nháp lúc làm. Không có số thật thì để trống / "chưa có quyền", không số mẫu.

## 143. Analytics API trễ ~2 ngày — 48 h đầu video mới đo bằng bộ đếm công khai chụp mỗi giờ (Channel Lab, 2026-10-23)

Lúc 11:55 ngày 23/10, Analytics API mới có số đến hết 20/10 (YouTube chốt ngày theo giờ Pacific rồi xử lý ~2 ngày);
Reporting API cũng vậy; Studio Realtime không có API. Hai Short đăng 21–22/10 đã ~1.7K views mà trang không thấy. Đã làm:
`tools/yt/live.py` chụp `statistics.viewCount` (Data API, ~2 đơn vị / kênh) mỗi giờ qua cron, trang tính views / giờ;
cron không bao giờ mở trình duyệt (token hết hạn → ghi log). Lần chụp đầu đã lộ: video dài Pyramid 11 views / 2 ngày
cạnh hai Short ~1.7K. **Luật:** mỗi số trên trang ghi độ trễ của nguồn; video < 3 ngày đọc bằng bộ đếm giờ, không so
"7 ngày đầu" khi chưa đủ 7 ngày số (`full7`). App OAuth chế độ Testing → refresh token hết hạn 7 ngày: cron sẽ báo lỗi.

## 144. Quy trình mới làm NỘI DUNG tốt hơn nhưng GÓI kéo bấm kém hơn: CTR 1.34% vs 3.12% (báo cáo tuần W43, 2026-10-23)

Số thật kênh Anh (Studio export 03/08–22/10, video dài đủ 7 ngày): video làm theo quy trình hiện tại xem TB 4:32 vs 1:50
của 17 video cũ (gấp 2.5), % xem 33.5% vs 21.1% dù dài hơn — nhưng CTR **1.34% vs 3.12%**. Gói yếu nhất: math-30k
"How Humans Invented Math, One Forbidden Idea at a Time" **1.24%** / 2,991 lần hiện; fifty-percent "The Coin Already
Landed. So What Is 50% Describing?" **0.81%** / 617. Gói khá nhất của quy trình: π "π Is Not Just 3.14 — You've Been
Thinking About It Wrong" 3.2%. Video cũ cao nhất: "The Derivative Is More Than a Number" 5.24%, "The Strange Orthocentre
Trick Nobody Taught You" 5.17%, "How to Draw a Curve You've Never Seen?" 5.01%, "You Only Need These 2 Formulas…" 4.83%.
Khác biệt đọc được: title thắng nói điều NGƯỜI XEM được / bị sửa sai (you, never taught, only need, more than); title thua
kể một câu chuyện trừu tượng (lịch sử, "describing"). Vì sao lọt: 5 tiêu chí title (PACKAGING §2) chấm bằng cảm nhận,
chưa đối chiếu CTR thật. **Luật:** title phải hứa cái người xem NHẬN hoặc điều họ đang HIỂU SAI, ở ngôi "you"; title kể
chuyện / lịch sử chỉ đi kèm lợi ích cụ thể. Mọi gói mới chấm thêm bằng bảng CTR thật của kênh (Channel Lab, câu hỏi
"Thumbnail + title có kéo người bấm không?"); gói < 60% trung vị kênh sau 7 ngày → Test & Compare.

## 145. Shorts: lượt xem không thành sub, thử sai khán giả, và luật "Related video" có mà không được làm (W43, 2026-10-23) — lặp lại luật SHORTS §5

Shorts 85% lượt xem thật nhưng **1.9 sub / 1.000** (video dài 23.4); lượt xem video dài đến từ link trong Shorts: **9**
(toàn thời gian) — dù `SHORTS.md` §5 đã ghi "Related video = video gốc". 8/11 Short ≥ 80% người xem ở Việt Nam (kênh đặt
US / en-US); người VN chỉ ở lại xem **29%** (Mỹ 63%, Ấn 56%, Đức 57%). Short thắng: "In 1299, Florence Banned the
Numbers You Use Every Day" 1,467 lượt xem thật / 7 ngày, "Why Is Pi 3.14? Nobody Chose It" 1,442; Short thua gọi tên khái
niệm: "Why Is 2 to the Power of 0 Equal to 1?" 9, "Two Fair Bets…" 12. **Luật:** (1) việc của Short là độ phủ, việc của
video dài là sub — Short nào cũng phải dẫn về video dài; Related video trở thành BƯỚC KIỂM sau khi đăng (Channel Lab:
nguồn "Link trong Shorts" > 0 sau 48 h), không chỉ lời dặn; (2) 24 h đầu tài khoản / đội ở VN không xem, like, share
Short tiếng Anh; (3) title Short = một sự thật bất ngờ nói bằng đời thường (năm, nơi, "không ai chọn"), không gọi tên khái
niệm.

## 146. Kênh chưa có khán giả quay lại: 99.5% lượt xem là người mới, end screen 1.2% (W43, 2026-10-23)

Studio: người xem mới 8,644 / 8,688 lượt xem thật, thỉnh thoảng 42, thường xuyên 0; người đã sub 1% lượt xem thật; end
screen 335 lần hiện → 4 lần bấm; π: 48 lần hiện → 0. Mỗi video bắt đầu từ 0 — không có tín hiệu "người xem kênh này
quay lại" cho YouTube. Video gợi ý là nguồn giữ người lâu nhất (17,500 lần hiện, xem TB 3:02). **Luật:** mỗi video dài
kết bằng MỘT video tiếp theo cụ thể cùng chủ đề — câu mời trong kịch bản (nêu tên câu hỏi của video kia) + end screen trỏ
đúng video đó + video thuộc một playlist chủ đề; đo bằng end screen CTR và returning viewers mỗi tuần.

## 147. Số liệu: API trễ, Studio mới có lần hiện / CTR / người quay lại — báo cáo tuần ghép số với dữ liệu sản xuất (W43, 2026-10-23)

Báo cáo tuần đầu cần BA nguồn: Analytics API (lượt xem thật, giữ chân, nguồn — trễ ~2 ngày), bộ đếm công khai mỗi giờ
(48 h đầu), và **export CSV Studio** (12 chiều: lần hiện + CTR theo video / nguồn, người xem mới / quay lại, ở lại xem,
nguồn sub, tuổi, phụ đề) — đúng các con số làm đổi kết luận (§144, §146). Thứ Studio KHÔNG biết là video làm thế nào
(quy trình, DNA, intro, Short cắt từ bài nào): `channels/<ch>/videos.json` + `shorts.json` ghép số với bài, nhờ đó so được
nhóm "quy trình hiện tại" với "video cũ". **Luật:** báo cáo tuần = sync API + export Studio mới + ghép với dữ liệu sản xuất;
mỗi kết luận có nguồn + số; việc nên làm xếp theo giá trị / công sức và ghi thành thí nghiệm (`loop/experiments.json`).

## 148. Nhân vật mới: tỉ lệ đổi thì tầm với đổi, hai lượt đi nối nhau phải giữ chân, đích tay phải trong tầm (người que khăn đỏ, 2026-10-23)

> Lặp lại §138: gác số bắt lỗi ảnh tĩnh không thấy.

Người dùng chọn người que khăn đỏ làm khán giả xuyên suốt (`docs/character/CHARACTER-STICK.md`). Clip thử 11.5 s
(`tools/lab/hero-scene.js`), lần chạy gác đầu: (1) chân trụ trượt 16 px ĐÚNG khung nối giữa đứng → lượt đi kế (`gait` mới
luôn đặt chân 0 phía sau, lượt trước kết thúc với chân 0 phía trước → hai chân đổi chỗ = 2 · gap); (2) tay cách thẻ 3–9 px
khi khom nhặt / đặt (đích nội suy FK → thẻ đi qua vùng ngoài tầm tay); (3) tay kéo tay bản sao sát giới hạn (73 px vs tầm
70). Soi bằng mắt còn thấy: đầu ×1.45 cao hơn tầm tay (đỉnh đầu 0.33 h trên cổ, tay 0.305 h) → kế hoạch "giơ thẻ qua đầu"
không thể làm; thẻ vẽ sau người che hết tay → như thẻ tự bay. Đã sửa: `leadOf` chọn chân bước trước theo chân đang ở
sau; `reach()` kéo đích về mép tầm; bản sao cách 0.56 h; ôm thẻ trước ngực, kẹp hai mép, vẽ nắm tay đè lên mép thẻ.
**Luật:** đổi tỉ lệ nhân vật (đầu to, tay ngắn) → tính lại tầm với trước khi viết hành động; mọi lượt đi nối tiếp chọn
chân bước trước từ tư thế cuối của lượt trước; đích tay luôn qua `reach()`; vật cầm phải thấy tay chạm.

## 149. Duyệt nhân vật bằng dáng DỄ thì lỗi tỉ lệ lộ ra ở dáng khó: đầu to + tay ngắn = không giơ tay qua đầu được (người que khăn đỏ, 2026-10-23)

> Lặp lại §148 (tầm với), nặng hơn: §148 né được bằng đổi hành động; lỗi này chặn cả một nhóm dáng.

Bảng 3 phương án và clip đầu chỉ có đứng, tò mò, bị rơi trúng, ôm thẻ, kéo tay ngang — không dáng nào giơ tay cao. Clip
đánh nhau (study 10) cần reo chiến thắng: tay 0.305 h, đỉnh đầu 0.33 h trên cổ → hai tay chỉ tới ngang mặt, đè lên đầu;
`P.cheer` của engine bị đầu che MẤT một tay (tay sau vẽ trước đầu). Sửa: `stick()` thêm `arm` (hệ số dài tay, mặc định 1 —
bài cũ không đổi pixel), người que khăn đỏ `ARM = 1.3` (≈ dài chân, đúng tỉ lệ người que Becker); dáng chính diện vẽ cả hai
tay sau đầu (`front`). **Luật:** bảng duyệt nhân vật mới phải có các dáng CHẠM GIỚI HẠN tỉ lệ — giơ hai tay qua đầu, chạm
đầu, ôm vật to, ngồi, nằm, nhìn chính diện + nghiêng — trước khi người dùng chốt nhận dạng.

## 150. Chạy lại một bước với tham số thiếu thì công cụ "mặc định cả bài" — p1 thành toàn bộ kịch bản (probability, 2026-10-23)

`narrate.py probability --out p1 --redo` (quên `--from/--to`): công cụ hiểu "không phạm vi = cả kịch bản" và ghi 109 câu
vào `p1` (p1 thật có 16 câu) — timeline, mốc từ, miệng p1 hỏng theo. Phải chạy lại có phạm vi từ cache. **Luật:** bước
chạy lại (redo, retake) không được dựa vào trí nhớ người gõ — công cụ NHỚ tham số của lần chạy đầu. Đã sửa:
`narrate.py` ghi `data/<out>.range.json`; thiếu phạm vi → dùng lại phạm vi đã nhớ; `--out` khác `narration` mà chưa từng có
phạm vi → dừng báo lỗi thay vì đọc cả bài.

## 151. OmniVoice (~11 GB VRAM) + align (whisper + CTC) chạy song song → OmniVoice sập giữa chừng (probability, 2026-10-23)

Để tiết kiệm thời gian tôi cho align p1 chạy khi OmniVoice còn đọc p2: GPU hết bộ nhớ, OmniVoice chết giữa câu, phải bật
lại (lần gọi đầu sau khi bật lại nạp model → hết giờ chờ). Mất ~15 phút. **Luật:** đọc giọng và căn mốc TUẦN TỰ; tắt
OmniVoice trước align. Đã sửa: `align.py` kiểm cổng 3900, OmniVoice đang chạy → dừng báo lỗi (`--force` nếu cố tình).

## 152. Trung bình |khác biệt| cả khung bỏ sót nhân vật nhỏ: clip người que báo "76% khung trùng" dù nhân vật đổi ở mọi khung (study 10, 2026-10-23)

So nhịp vẽ của ta với Alan Becker, công cụ đo báo clip người que 60 fps có 76% khung "trùng" — tưởng engine nhân đôi khung.
Đo riêng vùng nhân vật: khác biệt 7–10 / khung ở MỌI khung. Người que 230 px trên nền giấy tĩnh chỉ chiếm vài % diện tích
nên trung bình cả khung dưới ngưỡng. Cùng lỗi làm "giây hành động mạnh nhất" của *Animation vs. Math* trỏ vào cảnh camera
lia chậm (cả khung đổi ít) thay vì cảnh đánh nhau. **Luật:** số đo toàn khung chỉ so được video cùng bố cục; so NHÂN VẬT →
đo trong vùng nhân vật; trước khi kết luận từ một số lạ, soi khung gốc (CRAFT §3). Công cụ: `tools/study/cadence.py --roi`.

## 153. Chuyển hồi cắt đuôi câu trước 0.5 s — luật FROM đã có trong BRIEF-PLATES mà plate tự chế công thức khác (probability, 2026-10-23)

> Lặp lại: `templates/lesson/BRIEF-PLATES.md` "FROM — một luật": `FROM = max(START − lead, KẾT cảnh trước + 0.5)`.

Thẻ hồi ở probability dùng `max(L(n−1).end + 0.15, S(n) − 2.4)`: lead 2.4 s + đệm 0.15 → thẻ hồi phủ lên đuôi câu cuối của
hồi trước ở 3 chỗ; quét lệch mốc mới bắt (chữ đang đọc biến mất trước khi câu dứt). **Luật:** dùng đúng luật FROM của
BRIEF (đệm ≥ 0.5 s); viết tay luật khác là lỗi. Gác bằng code: trang khuôn (`templates/lesson/part.html`) lộ
`window.__intro.transitions`, `shoot.js check` báo LỖI + mã 1 khi FROM < kết câu trước + 0.5 — lần chạy đầu bắt 4 chỗ còn
sót ở probability (một chỗ ở p1 chưa từng ai thấy).


## 154. Chuyển 70 tư thế từ rig người khác: bảng "trông ổn" mà một ô trống, hai tư thế quay nhiều vòng — test từng mục mới bắt (study 11, 2026-10-23)

Tư thế pictogram (lemo-opuscar) trích bằng `pose(iconU)` rồi đổi góc sang `engine/stick.js`; bảng 70 ô được duyệt, chuyển
vào engine giống từng pixel. Khi viết unit test cho mọi mục (`tools/test/hero.test.mjs`): `highjump` = mọi góc 0, `dx` 100
— ở nguồn, khoảnh khắc icon do một hình LẬT GƯƠNG vẽ trong `front()`, hình chính bị đẩy ra ngoài (x = 100), nên ô của nó
trên bảng trống mà không ai để ý giữa 69 ô có hình; `triathlon` (tay −405°, −585°) và `breaking` (hông 469°) cộng dồn
vòng — vẽ đúng (góc tuần hoàn) nhưng nội suy từ dáng đứng sẽ quay tít. **Luật:** nhập một thư viện từ hệ khác → test
TỪNG mục (hữu hạn, góc trong một vòng, dời hông trong tầm, không mục nào bằng mặc định) trước khi coi bảng ảnh là bằng
chứng; ô trống trên bảng nhiều ô là lỗi chứ không phải "tư thế nằm ngoài" (CRAFT §3 — màn trống vẫn "hợp lệ").

## 155. Bộ kiểm "chữ đủ lâu để đọc" báo động giả ở bộ đếm, chữ đang gõ, chữ trượt — nhận dạng mẩu chữ phải theo nội dung + font (study 11, 2026-10-23)

`shoot.js readcheck` (chuyển từ lemo-opuscar `readcheck.mjs`) móc `fillText` khi chạy khô. Bản đầu coi mỗi chuỗi khác
là một mẩu: số đếm 1→2→3, chữ gõ từng ký tự, trang trượt (cùng chữ, x đổi) đều thành hàng trăm mẩu "giữ 1 khung". Ba vòng
sửa: mẩu = chữ + font (trượt giữ danh tính); chữ thay TẠI CHỖ (< 160 px) xét theo giá trị cuối; bỏ nhãn < 3 ký tự. Còn
45/348 mẩu ngắn ở probability p2, phần lớn thật ("(only if they cannot both happen)" 0.7 s / cần 3.4 s). **Luật:** bộ
kiểm suy luận từ lệnh vẽ là CẢNH BÁO (mặc định mã 0, `--strict` mới mã 1), người xem từng dòng — không tự sửa hàng loạt.

## 156. Tiếng tổng hợp bản đầu chói (xé giấy trọng tâm 12 kHz, gỗ 8 kHz) — khớp phổ + RMS với thư viện đã duyệt trước khi cho nghe (study 11, 2026-10-23)

`tools/sfx/material.py` bản đầu tổng hợp đúng "hình" tiếng nhưng sáng gấp 2–3 thư viện chung mà người dùng đã chỉnh mức
bằng tai. Đo trọng tâm phổ từng loại so với `assets/sfx/<kind>` trước khi gửi A/B → kéo về dải; RMS khớp trung bình
thư viện để mức `db` trong `library.json` giữ nghĩa. Người dùng nghe A/B: "mới hay hơn, dùng". **Luật:** tiếng mới thay
tiếng cũ → khớp trọng tâm phổ (≤ 1.5× thư viện) + RMS, rồi mới cho tai người dùng; `tools/sfx/test_material.py` gác cả
hai + giữ nguyên bộ đã sinh của bài cũ.

## 157. Người que mặc áo hình khối + bản dựng "tạm" bỏ quy trình chuyển động → "thân vuông, cứng, xấu, không như Alan Becker" (hist-pilot, 2026-10-24)

> Lặp lại §136–§138: nhân vật / hoạt ảnh mới phải qua bàn thử + gác số + clip duyệt — "chỉ là bản tạm để xem hình" không miễn.

Phim thử kênh kể chuyện: quần áo vẽ bằng hình thang tô màu + tay áo dày → thân que thành cái hộp, tay mọc ra như que cắm;
tư thế đoán góc bằng mắt, đối xứng, chỉ nội suy giữa vài dáng đứng (WAAF gập người tay thẳng đơ, tay giơ cắt ngang mặt);
đầu ×1.75 nặng; người que đứng đè lên ảnh lưu trữ rối nên chìm. Người dùng: "tư thế xấu… thân hình vuông… cứng không có
sự mềm mại… còn không bằng người que khăn". Làm lại cảnh trao mũ đúng quy trình (`projects/hist/_lab/traveler-scene.js`): thân vẫn
là NÉT (quần áo = màu nét vai → khuỷu + phụ kiện nhỏ), dáng lệch hông có đường cong hành động, nhịp Becker (giữ có thở →
bật snap/fast → khựng khi bắt → lấy đà → nhảy co gối → tiếp đất dồn → vượt), tóc trễ theo đầu (lò xo), gác số đạt; nửa
dưới ảnh phông mờ dần thành giấy. **Luật:** người que không bao giờ mặc "khối" — trang phục đọc qua màu nét + mũ / kính /
ria; mọi cảnh có nhân vật, kể cả bản tạm, đi qua stickmove + gác số; ảnh thật sau nhân vật phải có vùng nền sạch.

## 158. Người dẫn que MẢNH giữa dàn diễn viên que DÀY + nhún hông liên tục → "nghiêng nghiêng nhún nhún, trông ngốc" (hist-ww1, 2026-10-24)

Phim thử WW1: người dẫn (traveler-draw, nét mảnh, đầu ×1.6) đứng góc màn hình, thở bằng hông nhún sin 2.2 px chu kỳ 1.6 s
suốt phim; dáng nghỉ chân chữ X (hông −12 / +8, một gối gập 16°), người nghiêng; trong khi cast Sarajevo là người que đặc
kiểu War-Animation → hai kiểu vẽ lệch nhau, người dẫn như cây kẹo mút lắc lư. Gác số vẫn "đạt" vì nó đo khớp, không đo
"trông ngốc". Làm lại `projects/hist/_kit/host.js`: cùng ngôn ngữ thân dày với actkit (chi 0.075 H, một màu riêng + quần
tối + giày trắng, tóc hai lọn giữ nhận diện), đứng VỮNG chính diện (hai chân thẳng, hông ±9°, gối 0), thở = khuỷu ±2°
không đụng hông, cử chỉ rõ bóng (chống hông khuỷu xoè, chỉ, khoanh tay, ôm đầu khuỷu xoè); tay trước có viền mực mảnh vì
cùng màu đầu — không viền thì ôm đầu dính thành một khối. **Luật:** người dẫn dùng cùng kiểu vẽ với dàn diễn viên của phim;
không chuyển động "cho có sống" lặp lại ở hông / thân (nhún, lắc) — sống bằng cử chỉ đúng chữ và giữ dáng; chi cùng màu
với thân / đầu phải có viền khi vắt ngang qua.
**Cập nhật cùng ngày:** người dùng chỉ ra gốc lỗi sâu hơn — `engine/stick.js` mọc tay ở CỔ ngay dưới đầu nên hai tay chung
một gốc, thân dày càng lộ ("tay liền cùng gốc trông dị tật"). Sửa: tuỳ chọn `shoulder` (gốc tay dưới cổ, mặc định 0 giữ
nguyên mọi bài cũ) + cổ lộ ra; chốt NÉT MẢNH cho người dẫn và cả cast, mũ chóp + cà vạt đỏ — `channels/hist/CHARACTER.md`.

## 159. Dời thư mục 1 237 file: golden TRƯỚC, chuẩn hoá đường dẫn làm rơi dấu `/` cuối — so file với HEAD mới bắt (relayout theo kênh, 2026-10-24)

Người dùng: ba kênh mà `projects/` phẳng lẫn lộn, `out/_qa` / lab "tùm lum" → dời hết theo kênh (`projects/<kênh>/<p>` ↔
`out/<kênh>/<p>`, qa trong bài). 683 đường dẫn tương đối trong bài đã đăng phải sâu thêm một cấp. Làm đúng: (1) golden mọi
bài TRƯỚC khi dời (2 bài chưa có → `record` + commit trước); bài có golden cũ sẵn lệch (zero-div, người dùng đang sửa dở)
→ lưu băm hiện tại làm mốc riêng; chạy 4 bài song song (20 nhân) thay vì tuần tự 80 phút; (2) viết lại tương đối bằng
cách GIẢI đường dẫn từ chỗ cũ rồi tính lại từ chỗ mới (không cộng "../" mù); (3) đổi tên `projects/<cũ>` khắp repo với
biên từ. Sai lầm: lần dời thứ hai (gom đồ kênh lịch sử) dùng script nhanh có `os.path.normpath` — nó chuẩn hoá MỌI đường
dẫn tương đối của mọi file, làm rơi dấu `/` cuối (`'./plates/' + n` → `'./plates' + n`, `cut/` → `cut`) ở 90 file
không liên quan, đúng lúc golden đang chạy. Bắt được nhờ đọc diff một bài không định sửa; khôi phục bằng cách lấy nội
dung HEAD + chạy lại đúng các phép biến đổi tất định; kiểm cuối = đếm đường dẫn kết thúc bằng `/` trước/sau từng file.
Bẫy phụ: lượt kiểm qua `lesson_golden.py` cũ tạo `out/en/pi/qa` cạnh `out/en/pi_public` (ghép đường dẫn tay thay vì
`channel.out_dir`). **Luật:** dời thư mục = golden trước, golden sau, khớp 100% mới commit; công cụ viết lại đường dẫn
chỉ chạm chuỗi có ĐÍCH thuộc thứ đã dời, giữ nguyên nguyên văn mọi chuỗi khác (không chuẩn hoá); sau khi viết lại hàng
loạt, đọc diff của một file KHÔNG định sửa; đường ra của bài luôn qua `channel.out_dir` / `qa_dir`.

## 160. Tải lời ~40 video bằng yt-dlp trong một buổi → YouTube chặn địa chỉ mạng ("not a bot"); người dùng sợ "hại kênh" (seminar YouTube, 2026-10-24)

Học video cho slide: phụ đề + âm thanh (để Whisper chép lời) của ~40 video liên tiếp, có `sleep 4` giữa mỗi video. Sau
khoảng 30 lượt: HTTP 429, rồi `Sign in to confirm you're not a bot` cho mọi video, cả phụ đề lẫn âm thanh; vidIQ (lấy lời
qua MCP) hết credit. Chặn theo địa chỉ mạng, ẩn danh (yt-dlp không đăng nhập, không cookie) — không gắn với tài khoản hay
kênh, thường tự gỡ sau vài giờ. Nhưng người dùng hoảng: "sợ thế hại kênh thế. Có bị sao không?" — và tải bằng công cụ
ngoài vốn không nằm trong điều khoản YouTube. Cách đã chạy: người dùng mở "Hiện bản chép lời" của 2 video quan trọng nhất
rồi dán; phần còn lại dùng YouTube Help (định nghĩa Key moments chính thức). **Luật:** không tải hàng loạt từ YouTube —
vài video một buổi là trần; cần nhiều hơn thì chọn 2–3 video quan trọng nhất cho người dùng dán lời, phần còn lại lấy từ
nguồn chữ. Không bao giờ dùng cookie tài khoản người dùng cho yt-dlp. Số liệu kênh mình vẫn qua YouTube Data API chính thức
(đường riêng, có hạn mức). Ghi ở `docs/study/README.md`.

## 161. Đúc kết nhiều nguồn vào một bộ slide: ý lớn bị nén thành một dòng bảng → "bạn đã bỏ rất nhiều kiến thức" (seminar YouTube, 2026-10-24)

Bản 37 slide gom 12 video + sổ tay PACKAGING. Người dùng nhớ một video nói YouTube đang chuyển sang TV và thumbnail phải
làm khác — trong slide ý đó chỉ còn MỘT dòng ("che nửa dưới") của bảng 6 phép thử; hook 5 s / 30 s, cặp title–thumbnail,
kết dẫn sang một video, thuật toán cũng mờ. Nguyên nhân: viết slide theo dàn ý trước rồi nhét ý vào, không có danh sách ý
để đối chiếu; ưu tiên "vừa 60 phút" hơn đủ ý. Sửa: liệt kê mọi ý từ PACKAGING + lời từng video → đánh dấu ý nào đã có slide
→ bổ sung 11 slide (TV có slide riêng với số đo và cách kiểm) và một danh sách "bỏ slide nào nếu chỉ có 60 phút". **Luật:**
đúc kết nhiều nguồn = lập danh sách ý TRƯỚC, đối chiếu từng ý với sản phẩm; ý lớn có chỗ riêng, không nén vào một dòng bảng;
độ dài giải quyết bằng danh sách rút gọn, không bằng cắt kiến thức.

## 162. Người dùng không mở được link Artifact claude.ai → bản xem chạy local (seminar YouTube, 2026-10-24)

Bộ slide khởi đầu là Artifact kiểu Slides trên claude.ai; người dùng: "Tôi không xem được https claude của bạn đâu, bạn chạy
dưới local". Chuyển sang `~/Desktop/seminar-youtube/`: mỗi slide một file HTML (định dạng section inline), `build.py` ghép
`index.html` (phím ← →, N ghi chú, F, O), ảnh trong `img/`, `python3 -m http.server 8790`; tự chụp mọi slide bằng Chrome
headless để soát tràn chữ trước khi báo (bắt được 2 lỗi đè chân trang). **Luật:** sản phẩm để người dùng XEM (slide, trang,
bảng) làm thành file local + server local, báo đường dẫn `http://localhost:<cổng>`; không dựa vào link claude.ai.

## 163. Đọc số theo lời chính YouTube: thuật toán "kéo" theo từng người xem; giờ đầu không quyết định; hiển thị cao + CTR thấp là tốt (seminar YouTube, 2026-10-24)

Todd Beaupré (Growth & Discovery, YouTube — Creator Insider 2026): đề xuất xếp hạng riêng từng người lúc họ mở app, không có
"điểm chung" của video; không có chuyện "thử với sub trước, sub chê là chết"; video evergreen có thể lấy phần lớn view sau ≥ 1
tháng; CTR tự giảm khi video ra khán giả rộng; nguồn cấp kênh đăng ký là lát cắt gần như không qua thuật toán (CTR ≤ 10% là
bình thường). YouTube Help: Key moments (Intro % ở 0:30, Top moments, Spike, Dip). Paddy Galloway: view → giữ chân → chỉ số
khác → "ba điều video này dạy". Liên quan §139, §143, §144 (gói là nút thắt của ta): trước đây ta đọc số thô vài giờ đầu và
so CTR tổng. **Luật:** đọc số theo PACKAGING §8a — không phán xét vài giờ đầu; chỉ đổi gói khi view + hiển thị + CTR cùng
thấp sau cửa sổ bứt lên; so ở nguồn cấp kênh đăng ký và Key moments; mỗi video ghi "ba điều video này dạy".

## 164. Numeric QA xanh nhưng người que vẫn cứng: phải kiểm onion-skin và clip tốc độ thật (stickman reference v1, 2026-10-26)
Bản reference người que v1 (`tools/lab/stickman-reference-actor.js`, 120 giây) đạt contract test, full-frame render check và numeric finite check, nhưng người dùng xem và đánh giá: "quá cứng nhắc thiếu sự mềm mại, quá kém so với 2 bản tôi gửi". Nguyên nhân đã xác định: actor procedural dùng các góc pose tĩnh và nội suy số; không có editor/timeline onion-skin, motion paths được đạo diễn, holds/spacing/follow-through/overlap đủ rõ; QA chỉ kiểm độ dài chi, tiếp đất và NaN nên không thể kết luận acting đạt. **Luật:** numeric pass không được báo animation đạt; mỗi action mới phải có pose sheet full-size, onion-skin/motion-path view và clip 3–8 giây ở tốc độ thật để review trước khi mở rộng hoặc tích hợp production. Lõi nên là hybrid: key/extreme/breakdown thủ công + rig giữ tỉ lệ + IK chỉ khóa contact.


## 165. Repository có chữ stickman chưa chắc là animation system (nghiên cứu Stickman-Studio, 2026-10-26)
Kiểm tra `saiedpod-bot/Stickman-Studio` qua README và GitHub tree cho thấy pipeline là script/storyboard Gemini → ảnh Imagen → slideshow Ken Burns hoặc Veo → TTS → FFmpeg → upload; không có bằng chứng về pose editor, bone rig, keyframe timeline, onion skin hoặc Canvas renderer. **Luật:** trước khi chọn repository làm lõi, phải lập bảng năng lực đã kiểm chứng (pose, timeline, FK/IK, contact, interpolation, export, license, offline); không suy luận từ tên repo hay README marketing.



## 166. Model sheet không phải override của một clip: tay ngắn ở lab nhưng tay dài ở reference (stickman v1/v2, 2026-10-26)
Bản `stickman-weight-shift-extended` truyền `arm: 0.94` riêng trong trang lab, nhưng `stickman-reference.html` đi qua pipeline `actorsAt → drawActor → hero` mà không truyền cùng cấu hình; `hero` quay về `ARM = 1.3`. Engine đã cho phép override nhưng không biến override thành cấu hình nhân vật chung, nên hai video dùng hai hình thể mà không có test bắt continuity. **Luật:** mọi thay đổi model sheet được duyệt (chiều dài tay, đầu, nét, tỉ lệ) phải nằm ở một nguồn cấu hình duy nhất; mọi renderer/lab/actor nhận cấu hình đó qua interface bắt buộc; test phải so model sheet với từng output path trước khi render dài. Không gọi “cho phép override” là “đã áp dụng”.

## 167. `blixvip/stick` tích hợp tốt ở ranh giới editor → frame sequence, không phải dependency runtime (audit source, 2026-10-26)
Audit source xác nhận Stick có document/rig/timeline/onion skin/IK/easing, callback render theo frame và export PNG/SVG sequence/native video; app là GPL-3.0-or-later và desktop dùng Electron/WebGPU/Python codec. **Luật:** nếu dùng, dùng như editor ngoài để author/review rồi xuất sequence; hoặc port ý tưởng document/timeline vào engine hiện tại. Không nhúng nguyên app/native format vào production trước khi kiểm license, determinism, build và round-trip thực tế.


## 168. Nét limb là hình học renderer, không chỉ là easing (Animation vs. Coding, 2026-10-26)
Video `Animation vs. Coding.mp4` làm lộ một lỗi khác với timing: `engine/stick.js` và `engine/hero.js` nối các khớp bằng `moveTo`/`lineTo`, nên tay và chân hiện ra như các đoạn thẳng dù pose và easing có thể đúng. Thêm một đường cong chung cho mọi action sẽ chỉ che lỗi và làm sai silhouette; độ cong phải đi cùng bend của khuỷu/gối, hướng lực, overlap và contact. **Luật:** tách dữ liệu joint/pose khỏi centerline và stroke renderer; thử nghiệm curved limb phải là renderer tùy chọn, giữ default production nguyên vẹn, có control point/bend xác định từ pose, kiểm tất định và so sánh visual ở clip tốc độ thật trước khi tích hợp.

## 169. Chi cong đi QUA khớp phình như bóng khi gập gắt; IK chân quỳ chọn sai phía (người que nét mềm, 2026-10-26)
Kiểu C (người dùng chọn) vẽ mỗi chi bằng một cung bậc hai có điểm điều khiển `2m − (a + e)/2` để cung đi đúng qua khuỷu/gối.
Đẹp ở gập nhẹ, nhưng khi dựng 60 s làm lại "Animation vs. Coding", mọi dáng quỳ / ngồi (gối 90°+) thành cẳng chân phình
cong như vòi; thêm vào đó dáng quỳ khoá chân bằng IK hai đoạn thì chân SAU chọn nghiệm gối vểnh lên trời (đúng hình học,
sai giải phẫu) — trông như bò. Chỉ thấy khi soi cỡ gốc từng dáng sàn/quỳ; bảng thu nhỏ chỉ thấy "hơi lạ". **Luật:** độ cong
theo góc gập — β = 1 khi gập ≤ 30°, giảm tới 0.3 ở 120° (`engine/hero.js` soft); quỳ: chân sau vẽ theo góc (`fb`, đùi
thẳng đứng, cẳng nằm sau), chỉ chân trước khoá IK. Soi cỡ gốc mọi dáng sàn/quỳ trước khi dựng clip (docs/stick/MOTION §7).

## 170. Tay ngắn + đầu to không vươn qua đầu: giãn tay theo dáng, không kéo dài tay chung (từ điển người que, 2026-10-26)
Người dùng hai lần bảo tay ngắn lại ("tay dài quá nửa thân") → `SOFT_ARM` 1.3 → 0.85. Bảng từ điển 34 dáng lộ ngay hậu quả
§149 đã biết: cheer / overhead / hang — tay bị cái đầu to che mất hoặc vắt ngang mặt. Kéo dài tay chung lại là trái ý
người dùng. Becker giải bằng squash & stretch: chi DÀI RA trong động tác vươn. **Luật:** tỉ lệ buông (model sheet) giữ ngắn;
mỗi dáng vươn cao mang `armK` riêng (`engine/stick-dict.js`) — nội suy nên tay dài dần khi vươn, về ngắn khi buông; góc tay
qua đầu mở ≥ 128° để tay đi CẠNH đầu chứ không qua mặt.

## 171. Làm lại một đoạn mẫu: chỉ đặt cạnh nhau cùng giờ mới lộ lệch nhịp và biên độ (becker-redo + từ điển, 2026-10-26)
Bản làm lại 60 s đầu "Animation vs. Coding" đọc nhịp từ bảng chụp có mốc; một bảng cắt từ giây 3 nhưng tôi đọc mốc như giờ
cảnh → đoạn nhặt laptop / gõ chữ của ta đi SỚM 2.5 s mà bảng ảnh riêng lẻ và `check` 3600 khung không báo gì. Chỉ khi ghép
video cạnh bản gốc (hstack, cùng t) và chụp khung cùng mốc hai bên mới thấy. Tương tự bảng từ điển: từng dáng "trông ổn",
nhưng ghép cặp với khung mẫu cùng mốc mới thấy ta đứng khép chân như cà kheo trong khi Becker dạng chân rộng gấp đôi.
**Luật:** học từ mẫu thì luôn có ảnh/clip GHÉP CẶP cùng mốc (`tools/study/stick_dict_pairs.py`, `compare.mp4` của
`becker-redo`); đọc mốc ghi rõ gốc thời gian (giờ gốc hay giờ cảnh) ngay trong code.

## 172. Chi mềm mà thân vẫn là một đoạn thẳng → cả người vẫn cứng (người dùng 2026-10-27)
Sau khi chi cong (§168–169), người dùng gửi 3 ảnh ghép với Becker: "tay với chân mềm mại rồi, nhưng cái thân lúc nào cũng
cứng đơ như một đoạn thẳng". Thân cũ = một khúc hông → cổ xoay theo `lean`; phần "phình" vẽ thêm chỉ 0.06 h nên nhìn vẫn
như que. Becker: cúi nhặt là lưng GÙ chữ C, bị đập là ƯỠN, đứng thẳng cũng hơi khom vai. **Luật:** thân là xương hai
đốt — `curl` (engine/stick.js: nửa dưới `lean − curl/2`, nửa trên `lean + curl/2`, đầu đặt theo nửa trên), mặc định
`curlOf(lean)` (gù khi cúi, ưỡn khi ngả, +10° khi đứng); dáng mạnh ghi `curl` riêng trong từ điển; khi đổi dáng nhanh
nửa trên trễ sau hông (`DRAG.chest`) → lưng uốn theo quán tính. Chỉ bật với `hero soft` → bài cũ không đổi pixel.
Chung hơn: sửa chi xong thì bộ phận cứng TIẾP THEO (thân) lộ ra — người dùng phải chê từng bộ phận một. Khi học mẫu, soi
cặp theo bảng bộ phận (đầu · cổ · thân · vai · chi · bàn tay/chân · nét) cùng một lần, đừng chỉ chữa chỗ vừa bị chê.

## 173. So trước/sau bằng hai lần render cùng phiên, không so với ảnh cũ nằm trên đĩa (thân cong, 2026-10-27)
Sau khi thêm `curl`, tôi so ảnh hero-clip mới với ảnh `out/_lab/hero-clip/t_*.png` có sẵn → báo DIFF 2/3 mốc, tưởng
phá bài cũ. Thật ra ảnh trên đĩa là bản chụp của một phiên cũ hơn; `git stash` phần engine, render lại cùng mốc → giống
từng byte. **Luật:** kiểm "không đổi pixel" = render TRƯỚC (stash / golden đã chốt) và SAU trong cùng phiên, cùng lệnh;
ảnh lab trên đĩa không phải golden (cùng tinh thần §159).

## 174. Link xem local: thử đúng URL đầy đủ trước khi báo — cổng có thể đang bị server cũ chiếm (hệ người que, 2026-10-26)
Tôi báo `http://localhost:8791` cho bàn thử nét mềm; người dùng mở thấy danh sách thư mục repo ("tôi có xem được đâu?")
vì một `http.server` cũ đã phục vụ gốc repo ở cổng đó. **Luật:** trước khi báo, `curl -sI` đúng URL đầy đủ (tới file
`index.html`) phải 200 và đúng nội dung; báo đường dẫn đầy đủ, không báo gốc cổng (bổ sung §162).


## 175. Người que chỉ vào khi nó LÀM một việc với vật ở sự kiện quan trọng — chỉ / gật theo từng câu là "xuất hiện cho có" (logarithm, 2026-10-27)
Làm lại người que mở đầu logarithm (25 s) bằng nét mềm + từ điển dáng: 30 khoá dáng bám chữ — chạy vào, chỉ 72, chìa tay
theo chồng xu, chỉ từng chồng nhỏ, gật ở mỗi đáp án, đổi chỗ khi khối trượt, đếm khối, nhún vai, gãi đầu, quay người. Số
xanh, dáng đẹp, không vướng hình. Người dùng: "người que không mang ý nghĩa gì… xuất hiện cho có, chả có giá trị tương tác
thực tế nào… các event diễn ra nhanh nên người que bị speed up quá nhìn trông chán". Gốc: tôi đo "có diễn" bằng số khoá
dáng / câu; vật toán vẫn tự rơi, tự lớn — người que chỉ CHỈ vào cái đã xảy ra (người xem bỏ nó đi không mất gì), và đổi
dáng mỗi 0.5–1 s theo nhịp cảnh nên thành giật. **Luật:** (1) người que chỉ vào ở vài sự kiện QUAN TRỌNG của bài, và ở đó
nó là NGUYÊN NHÂN — tự nhấc / đặt / gỡ / vác / đẩy vật, vật không tự chuyển động; (2) phép thử: che người que đi, cảnh
phải mất nghĩa; nếu không mất → bỏ người que; (3) mỗi lần một hành động trọn (lấy đà → làm → đà theo) ≥ 2–3 s, cảnh nhường
nhịp cho nó (giãn hành động vật theo người que), không ép người que theo nhịp cảnh nhanh; (4) cảnh nhịp nhanh (mở đầu, liệt
kê) → không người que. Chọn sự kiện TRƯỚC khi dựng, người dùng duyệt danh sách. (bổ sung CRAFT §7 "người que mọi video")

## 176. Người que vác vật xa tầm tay → vật lơ lửng; ảnh chụp từng mốc không bắt, gác tầm với trong code bắt 165 khung (logarithm, 2026-10-27)
> Lặp lại §148–§149 (tầm với) lần ba → thành luật cứng bằng code.
b07 bản đầu: người que vác tháp 3 khối (cao hơn nó) qua đầu sang tháp 2 — tay mềm ngắn (SOFT_ARM 0.85) không với tới đáy
tháp đã nhấc 230 px → tháp bay lơ lửng cách tay ~100 px; chỉ thấy khi soi ảnh phóng to. Đổi hành động theo tầm tay: ÔM chân
tháp → nén → HẤT (tay chỉ cần chạm chân tháp, tháp bay vòng cung). Sau đó thêm gác vào `projects/en/logarithm/actor.js`:
đang nắm (k > 0.98) mà điểm nắm cách cổ > 1.12 × tầm → ném lỗi → `shoot.js check` trượt. Chạy lần đầu bắt **165 khung / 9
đoạn** ở cả 4 cảnh đã qua soi ảnh (thẻ 8 giơ cao quá ở b02, cột chữ đầu ở b08, khối trên đầu khi người que khuỵu ở b12 —
điểm nắm tính từ HÔNG nên lệch khi thân nghiêng). **Luật:** (1) chọn hành động theo rig: tay ngắn → ôm / hất / đội đầu / leo,
không vác qua đầu; (2) điểm nắm tính từ khớp FK (cổ, đầu — `grip(t, A, J)`), không đoán từ hông; (3) mọi vai có cầm vật
chạy qua gác tầm với — số 0 lỗi mới đưa clip. Đưa gác này vào `engine/` khi bài thứ hai dùng `actor.js`.

## 177. Viết lại lời mở đầu mà giữ mốc cảnh cũ: 5 chuyển động chết im lặng — 0.03 s, sai chữ, không bao giờ hiện (logarithm, 2026-10-26/27)
Mở đầu logarithm đọc lại (12 câu → 5 câu); plate a0 đổi `w(…)` sang chữ mới nhưng giữ cấu trúc cũ. `check` xanh, nhưng:
「72」 bay đi ở "money" TRƯỚC khi đọc "seventy-two"; 9 khối năm rơi trong **0.03 s** (`Y0 = about + 0.25` > `Y1 = nine`); chồng
12% hiện ở chữ "twelve" của đáp án 6%; khối trượt sang S2 ở "not" nên "9 YEARS + 2 DAYS" (S2) không bao giờ lên hình; 4 thẻ
"72 ÷ r" có cửa sổ hiện SAU cửa sổ ẩn → chết. Lộ ra khi đặt người que vào và soi ảnh từng câu. **Luật:** đọc lại lời một cảnh
= viết lại BẢNG MỐC của cảnh: mỗi chuyển động ghi [chữ bắt đầu, chữ kết thúc] và `throw` khi cửa sổ < 0.3 s hoặc nằm ngoài
khung con đang hiện (mẫu: `if (b < a + 0.2) throw` của RACE, `SW + 0.9 > exact2` ở a0). Chụp mỗi câu một ảnh trước khi báo.
(bổ sung §7 nắn mốc bỏ sót, §97 mốc vô hạn)

## 178. Lệnh python ghi file lỗi giữa chừng làm RỖNG STATUS.md — và commit luôn file rỗng (2026-10-27)
`open(p, 'w').write(s.replace(...),)` — dấu phẩy thừa biến đối số thành tuple → TypeError SAU khi `open(..., 'w')` đã cắt file
về 0 byte; lệnh `&& git commit` vẫn chạy (lỗi ở heredoc python không chặn được chuỗi) → commit "−116 dòng". Phát hiện nhờ
đọc `--stat` của commit. Khôi phục `git show HEAD~1:docs/STATUS.md`, amend. **Luật:** sửa file bằng script: tính nội dung
xong, kiểm (`assert`), RỒI mới mở ghi; với tài liệu dài dùng Edit; sau mỗi commit đọc `git show --stat HEAD` — số dòng xoá
bất thường = dừng.

## 179. Đổi @handle kênh: link @ cũ không chuyển hướng, và tên + handle bị khoá ~14 ngày sau mỗi lần đổi (kênh Anh, 2026-10-27)
Người dùng đổi handle @99fromscartch → @99fromscratch nhưng chưa đổi tên hiển thị ("99% from scartch") → YouTube khoá đổi thêm
12 ngày. Hệ quả ngay: link "Subscribe" ở Customization → Links, chân trang Upload defaults, mô tả 10 video (+ bản dịch) đều trỏ
@ cũ → hỏng. Cùng đợt: viết welcome / guideline cộng đồng quá dài vì không tra trước giới hạn ô (85 / 60 ký tự — lặp lại §42).
**Luật:** (1) đổi tên + handle CÙNG một lần, sau khi kiểm handle còn trống; (2) trước khi đổi: liệt kê mọi chỗ có link @
(Links, Upload defaults, mô tả video, bản dịch, trang ngoài) và sửa ngay sau đổi — link /channel/UC… không bao giờ hỏng, dùng
nó ở chỗ khó sửa; (3) ô Studio mới → hỏi / tra giới hạn TRƯỚC khi viết, đo bằng code (§42).

## 180. Lệnh GHI lên YouTube bị auto mode chặn → script có --dry-run, người dùng tự chạy bằng `!`; playlist vừa tạo trả 404 (kênh Anh, 2026-10-27)
Tạo playlist Shorts qua API: lệnh chạy script ghi (playlists.insert + 22 playlistItems.insert) bị bộ phân loại auto mode của
Claude Code chặn — đọc API thì được, ghi lên kênh thì không. Không lách: viết `tools/yt/playlist_shorts.py` (kiểm tên kênh,
`--dry-run`, chạy lại an toàn), người dùng chạy `! …`, kết quả vào hội thoại. Lần chạy thật dừng ngay sau `playlists.insert`:
`playlistItems.list` trên playlist VỪA tạo (rỗng) trả **404 playlistNotFound**; chạy lại theo title có thể chưa thấy playlist mới →
tạo TRÙNG. Sửa: bắt 404 = rỗng, thêm `--pid=` để chạy tiếp đúng playlist. **Luật:** việc ghi lên kênh = script có `--dry-run`
in kênh + việc sẽ làm, idempotent (bỏ qua cái đã có), chạy tiếp được bằng ID; người dùng chạy bằng `!` nếu auto mode chặn;
đọc lại sau khi ghi. API mới tạo xong chưa chắc đọc thấy ngay — đừng dò lại bằng tên.

## 181. Kiểm playlist bằng API: video kênh khác, video đã xoá, bản private cũ nằm trong playlist; video cầu nối bị thiếu (kênh Anh, 2026-10-27)
3 playlist / 34 mục: 3 video KÊNH KHÁC (Alan Becker "Animation vs. Geometry" trong playlist hình học — đẩy người xem sang kênh
khác), 1 video đã xoá, bản zero-div cũ private nằm cạnh bản mới; playlist chính trộn calculus + luỹ thừa + logarithm; video
calculus mở đầu và kim tự tháp không nằm trong playlist chủ đề của chúng; 21 Shorts không thuộc playlist nào. Sửa: 4 playlist =
4 lộ trình (quy tắc / calculus / hình học / Shorts theo nhóm chủ đề), title + mô tả đi đúng thứ tự video
(`channels/en/PLAYLISTS.md`). Chưa đối chiếu luật PACKAGING §7 "video mạnh nhất (giữ chân) đứng đầu" — playlist A đề xuất mở
bằng video lịch sử 19 phút (232 lượt) thay vì π (1 137). **Luật:** mỗi lần đăng / đổi gói, đọc lại playlist bằng API
(`out/_lab/playlists/`): chỉ video của kênh, không mục đã xoá / private thay thế, Shorts tách riêng, mỗi video dài thuộc ≥ 1
playlist chủ đề; thứ tự: video giữ chân mạnh nhất đứng đầu, sau đó theo lộ trình dễ → khó.

## 182. Kịch bản lịch sử "quá AI, ngắt ngắt" — lặp lại §34: viết theo nhịp cắt hình thành mảnh câu (hist/sarajevo, 2026-10-27)
Kịch bản 60 s "One Wrong Turn" (17 dòng, 144 từ) người dùng duyệt, nghe giọng rồi chê: "bạn viết script quá AI, quá kém, câu
cứ đọc 1 tý thì ngắt ngắt". Đo: **54% câu là mảnh** (< 5 từ: "Nineteen.", "Sarajevo.", "Two shots."), chuỗi 6 mảnh liền
nhau, trung vị **4 từ/câu**; bài Anh đã duyệt: 10–18% mảnh, chuỗi ≤ 4, trung vị 9–11. Vì sao: tôi viết lời CÙNG LÚC với bảng
cảnh cắt ~3 s (study 15) → mỗi nhịp hình một mảnh lời; học "punchline ngắn" của Thanh Pahm rồi dùng cho MỌI câu. Đây là §34
(math-30k: "kịch bản chặt nhịp hình đọc lên như liệt kê") lặp lại ở kênh mới — lời dặn ở CRAFT §9b không đủ. **Luật:** lời là
văn xuôi kể chuyện, hình cắt theo lời chứ lời không cắt theo hình; mảnh câu chỉ cho punchline. Chặn bằng code:
`tools/voice/script_check.py <p>` (mã 1 khi mảnh > 25%, chuỗi ≥ 5, trung vị < 7) — chạy trước khi đưa người dùng duyệt và
trước khi đọc giọng; luật viết kênh lịch sử `channels/hist/WRITING.md`.

## 183. Ghép đầu ảnh thật lên thân vẽ: dò mặt tự động lệch cỡ, chuẩn theo mắt→cằm làm mặt dài nhỏ đi, khuôn tóc cố định gọt tóc (hist/_lab cast, 2026-10-27)
Bản 1 cắt đầu bằng rembg + thẳng ngang ngực → đầu dính vai, nằm lệch dưới cổ ("vị trí chưa đúng cổ"), đầu Sophie nhỏ hơn thân.
Bản 2 dò mặt Haar: khung lệch cỡ giữa các ảnh (Sophie chặt, Franz Ferdinand rộng) → mặt to nhỏ không đều, cằm dính cổ áo; bậc
"cây nấm" ở đường mắt vì tóc rộng hơn hàm. Bản 3 đo tay 4 mốc + chuẩn theo mắt→cằm: FF mặt dài → nhỏ hơn Sophie ("kích thước
phải cân bằng"); vòm tóc 1.5× hàm gọt tóc bù xù của Princip ("cắt trông hơi kì"). **Luật:** `tools/hist/headcut.py --lm
cx,mắt,cằm,nửa-hàm` (đo trên ảnh lưới, mỗi nhân vật một lần): mặt nạ hình trứng (hàm bầu dục + vòm tóc đo theo độ rộng tóc
THẬT ở mức trán), cỡ theo DIỆN TÍCH mặt √(mắt→cằm × nửa hàm), ghi `.json` mốc cằm → thân vẽ đặt cổ đúng điểm cằm, rộng theo
hàm. Soi ba đầu cạnh nhau ở cùng cỡ trước khi giao.

## 184. Ảnh nhân vật AI: hiệu ứng vẽ dính người không tách được; mũ khác cảnh trước (hist-host, 2026-10-27)
Hai bản "núp vụ nổ" người dùng tạo: khói / lửa / đá vẽ CHẠM thân → `sticker.py` (giữ mảng lớn nhất nối liền) giữ cả đám khói;
đội mũ sĩ quan trong khi cảnh trước người dẫn đội mũ quả dưa lẫn vào đám đông 1914. Ký hiệu RỜI người (tam giác, cụm rối, đám
mây thở) thì máy tự bỏ được. **Luật:** prompt xin hình bắt đầu bằng câu khoá cấm hiệu ứng / ký hiệu quanh người
(`channels/hist/CHARACTER.md` §3); ghi rõ mũ / trang phục theo cảnh liền trước; hiệu ứng vẽ bằng code đúng lúc. Kiểm mỗi ảnh
bằng cách cắt thử ngay khi nhận, báo người dùng kèm prompt sửa.

## 185. Giọng clone đã nhanh + tăng tốc như giọng cũ → nuốt chữ; tốc độ đặt theo từng giọng (hist/sarajevo, 2026-10-27)
Người dùng chê giọng `d589c5a8` "chán" → clone "adam" `f9997cc2` từ 13.9 s (2 câu trọn, cắt ở lặng −64 dB, tránh đoạn mở
bằng "So" — §4a handoff). Nguồn đã ~164 từ/phút; đọc ×1.2 như giọng cũ → whisper bắt **nuốt chữ "Ferdinand"**; ×1.0 sạch (1
câu "turn" nhoè → `--redo` riêng câu). Người dùng chọn ×1.1. Phụ: `narrate.py --out <tên khác>` bắt buộc `--from/--to`; take
đầu sau khi bật OmniVoice hết giờ (mô hình đang nạp) — chạy lại. **Luật:** đo nhịp nguồn trước khi chọn speed; mỗi lần đổi
speed chạy `align.py` (whisper nghe lại) — câu nuốt chữ là lỗi thật, "One"→"I" là vô hại; đưa người dùng A/B 2–3 tốc độ.

## 186. Tiếng hiệu ứng: người dùng muốn tiếng trên mạng trước; tự tạo bản đầu chói 4/13 loại (lặp §156) (hist/sarajevo, 2026-10-27)
Bộ `cartoon` tự tạo (13 loại) đo phổ: nổ trọng tâm 7.8 kHz, súng 10 kHz, ngòi 13 kHz, còi 4 kHz → chói / mỏng; sửa lọc còn
0.5 / 2 / 5.6 / 0.9 kHz trước khi cho nghe (§156 đã dặn — vẫn phải đo lại mỗi bộ mới). Người dùng thấy tiếng Thanh Pahm "rất
hay, có vẻ sound trên mạng" → "ưu tiên lấy sound trên mạng trước, khi không có mới tự tạo". Tìm CC0 / PD (OpenGameArt lọc CC0
+ kiểm trang mục, Commons API `LicenseShortName`): có 10/14 loại (súng, nổ, còi xe, máy xe, boing, dế, ngòi, chuông, bốp, vỗ
tay); không có CC0: đám đông reo, kim đĩa rít, còi trượt, "dun dun" (chỉ CC-BY). **Luật:** tiếng mới → tìm CC0 / PD trước,
bảng nghe "mạng vs tự tạo" để người dùng chọn; tiếng meme nổi tiếng không rõ nguồn không dùng (Content ID); CC-BY chỉ khi
người dùng đồng ý ghi tác giả; tự tạo thì đo phổ so thư viện trước khi giao. Quy trình: `channels/hist/PIPELINE.md` §Tiếng.

## 187. Tập thử phải bắt đầu từ ĐẦU câu chuyện, như video mẫu — không cắt một khúc giữa (hist/sarajevo, 2026-10-27)
Bản 1 (92 s) mở thẳng bằng Sarajevo. Người dùng xem xong hỏi "bản này là do chúng ta chưa bắt đầu từ đoạn đầu tiên đúng không…
bỏ qua mấy câu joke rất hay ngay mở đầu": Thanh Pahm mở bằng chào → một câu châm toàn cảnh ("các quốc gia quyết định sẽ đấm
nhau") → tên trận → bối cảnh (bản đồ nay / xưa, đế quốc, hai băng) RỒI mới tới vụ ám sát. Thiếu khung đó, câu chuyện mất móc
và người xem không hiểu vì sao một vụ giết người kéo cả châu Âu. Đi kèm: hỏi "giữ 87 s hay ép 60 s" bị chê — "khoảng 1p" chỉ
là ước lượng. **Luật:** tập thử = phần đầu trọn vẹn của tập thật (mở bài + bối cảnh + sự kiện), độ dài theo nội dung, không
hỏi lại số giây. Bản 3: 34 dòng, 208 s.

## 188. Vật và nơi chốn phải là ẢNH ĐỜI THẬT ghép vào — xe / phố / bệnh viện vẽ tay bị chê "vừa xấu vừa lỏ, khán giả quit" (hist/sarajevo, 2026-10-27)
Bản 1 vẽ xe mui trần, phố vàng phẳng, biển bệnh viện, bánh xe que. Người dùng: "các hình ảnh như oto, bệnh viện, đường…
kiếm các ảnh trên mạng phù hợp để ghép vào chứ đừng vẽ như thế" và "đã học thành palm thì phải học cẩn thận… đưa các cảnh
thật, hình ảnh đời thật sẽ gần gũi hơn". Soi lại dải khung study 12: Thanh Pahm dùng ảnh xe cổ thật cắt nền (vào bằng nhoè),
ảnh phố / rừng / đồng cỏ thật, ảnh đen trắng đời thường sau lưng người dẫn, VỤ NỔ THẬT chồng lên bản đồ cũ, sàn đấu thật.
**Luật:** vật / nơi / hiệu ứng lớn = ảnh CC0 / PD cắt nền (`tools/hist/openverse.py` — gom Flickr Commons, rawpixel, Met;
`tools/hist/commons.py` chậm rãi vì Commons chặn gọi dồn; `tools/hist/cutout.py --cut 1` cắt xe, vụ nổ); chỉ NGƯỜI và quốc
gia là vẽ; bản đồ vẽ từ dữ liệu thật (historical-basemaps). Ghi nguồn từng ảnh ở `meta.json` + chữ nhỏ góc khung.

## 189. Dân thường kiểu đậu trơn trông "như con ma"; dùng người ĐẦU TRÒN như Thanh Pahm, sát thủ vẽ — ảnh thật chỉ để giới thiệu (hist/sarajevo, 2026-10-27)
Đám đông bản 1 là khối con nhộng trắng hai chấm mắt → "chả khác gì mấy con ma". Thanh Pahm: đầu tròn TÁCH khỏi thân (có cổ
áo / vai), mũ thời đó; sát thủ thân đen, mặt tròn da, mắt xếch, mũ quả dưa, tay một nét thẳng cầm súng đen. Bản 1 lại dùng
đầu ảnh thật trên thân đậu cho Čabrinović / Princip khi hành động — người dùng thích kiểu vẽ hơn, "thêm một hình ảnh sát thủ
để giới thiệu… còn dùng hình ảnh chính là người que tròn tròn… thú vị và nhất quán". **Luật:** `person()` đầu tròn + mũ cho
dân; `assassin()` (tay ném / tay súng) khi hành động; ảnh thật = thẻ giới thiệu (ảnh + tên + tuổi) một lần; người quyền lực
(FF, Sophie, Potiorek) = ảnh bán thân cắt nền dán vào cảnh / ngồi trong xe ảnh thật.

## 190. Học video mẫu: soi DẢI KHUNG từng đoạn trước khi dựng, không dựng theo trí nhớ bản phân tích (hist/sarajevo, 2026-10-27)
Study 12 / 15 đã có dải khung (`out/_lab/study/12-thanh-pahm-ww1/strip-*.jpg`) nhưng khi dựng bản 1 mình làm theo bảng kỹ
thuật tóm tắt → bỏ mất chất liệu (ảnh thật, vụ nổ thật, mở bài). Người dùng phải gửi lại 7 ảnh chụp + link trang study.
**Luật:** trước khi viết `episode.html` của một tập theo mẫu: mở dải khung đoạn tương ứng, liệt kê từng cảnh mẫu dùng chất
liệu gì (ảnh / vẽ / bản đồ / hiệu ứng), dựng bảng cảnh theo đúng chất liệu đó rồi mới code; soi ảnh mình cạnh dải khung mẫu.

## 191. Kịch bản sự kiện thật: tự soát vẫn sót — agent soát sử độc lập bắt 2 lỗi trước khi đọc giọng (hist/sarajevo, 2026-10-27)
Mình đã đối chiếu Wikipedia cho phần Sarajevo (sông 13 cm, xyanua, "Wrong way"), nhưng phần bối cảnh viết thêm vẫn sai hai chỗ:
"Đức rủ Ý vào băng" (thật ra 1882 Ý tự xin vào vì cay Pháp chiếm Tunisia) và "một tài xế bối rối rẽ sai" (xe DẪN ĐẦU rẽ sai
trước, Lojka chỉ đi theo vì không ai báo). Agent opus đọc riêng SCRIPT.md + README nguồn, không thấy lý lẽ của mình → bắt được
trong ~1 phút; mỗi lỗi sửa xong chỉ đọc lại đúng câu đó (cache giọng). Video mẫu Thanh Pahm cũng sai ~7 chỗ (WRITING §6) — viết
"theo mẫu" là kế thừa luôn lỗi nếu không soát. **Luật:** kịch bản kênh lịch sử (và mọi câu "ai làm gì, năm nào") → một reviewer
độc lập soát từng dòng + mọi con số / ngày / câu trích trên hình TRƯỚC khi đọc giọng; sửa giữ nhịp câu (`script_check.py` lại).

## 192. zsh `set -- $x` không tách — lần thứ ba (lặp §30 §76); render chuỗi cũ suýt ghi đè bản cuối (hist/sarajevo, 2026-10-27)
Tải 3 ảnh bằng `for x in "id tên"…; do set -- $x` → cả chuỗi thành một tham số, 3 lệnh hỏng. Cùng đợt: đổi lời → mốc giọng mới,
nhưng lệnh nền "render → mix → ghi sarajevo.mp4" của mốc CŨ vẫn chạy — để nó chạy hết là ghi đè bản cuối bằng hình lệch tiếng;
phải dừng (TaskStop) trước khi dựng lại. Render bản 3 (12 997 khung) chia 4 đoạn `shoot.js video --from a --to b` chạy song
song → nhanh ~4×; kiểm tổng số khung các đoạn = trang rồi `ffmpeg -f concat` (đường dẫn trong list tính từ thư mục file list).
**Luật:** lặp nhiều tham số trong shell → `while read a b; do …; done <<'EOF'` (đã ghi AGENTS); đổi mốc giọng / lời → dừng mọi
lệnh nền đang render bản cũ; video dài → render theo đoạn song song + đối chiếu số khung.

## 193. Edit nghiệp dư: ảnh thật làm sân khấu rồi dán chồng lớp, cỡ lộn xộn, 5 kiểu bản đồ (hist/sarajevo, 2026-10-27)
Người dùng đặt cảnh xe của ta cạnh OverSimplified: "đây là bạn edit, còn đây là chuyên nghiệp edit — một kích thước, khung
hình phù hợp, vị trí phù hợp, size phù hợp". Đo (study 16): cảnh xe v3 ~22 phần tử, đầu Thái tử ghép to ~4× tỉ lệ thật trên
xe nhỏ, ảnh phố tràn khung + hàng người đầu tròn + người dẫn — ba chất liệu chồng nhau; họ: một cutout xe CÓ SẴN người ngồi,
0.36–0.43 H, trên nền đen, dùng lại 6 cảnh. Họ: nền bản đồ 48 % / vẽ phẳng 26 % / đen 20 % / ảnh tràn khung 3 %; một kiểu
bản đồ. Ta: năm kiểu bản đồ, sơ đồ phố be "lạc quẻ, trông tệ"; cảnh bệnh viện không có người bệnh. **Luật:**
`channels/hist/EDITING.md` (A3–A4 có hiệu lực; B1–B12 đề xuất): ảnh = vật đặt trên nền, cỡ chuẩn theo loại khung, cutout giữ
tỉ lệ, ≤ 3 nhóm / khung, một kiểu bản đồ, sự kiện ở một chỗ → cảnh vẽ nói đúng câu.

## 194. Người dẫn nhập vai đổi chỗ + đổi cỡ giữa hai cảnh liền nhau cùng nơi (hist/sarajevo, 2026-10-27)
Cảnh đón xe: người dẫn đứng giữa đám đông vẫy cờ (x 1300, cao 330 ≈ 1.4× người dân); cảnh kế (cùng phố) bom nổ → dáng núp
dán ở góc phải dưới, cao 330. Người dùng: "lúc đầu đang đứng cùng người dân, sao sau bom nổ lại ra một góc… ảnh phải nhất
quán, lúc đầu vẫy cờ thì sau ngồi ở chỗ đó… thu nhỏ phù hợp với các nhân vật khác". **Luật:** vị trí người / vật trong các
cảnh liền nhau cùng nơi là HẰNG SỐ trong code (`HOSTX`), đổi dáng tại chỗ; người dẫn nhập vai cao bằng người xung quanh ±10 %;
soi khung cuối cảnh trước cạnh khung đầu cảnh sau.

## 195. Sting tự tạo không gắn hình bị chê "lạc quẻ" — lặp §156 §186; ta dày tiếng gấp ~5 lần mẫu (hist/sarajevo, 2026-10-27)
`dun` (bộ `cartoon` tự tạo, 1.9 s) đặt lúc hiện chữ BLACK HAND và lúc lộ mặt Princip → "không thích tí nào, nghe lạc quẻ,
không map với video" (2:20, 3:05). Đo (study 16 §7, study 17 §6b): OverSimplified ~3–8 hiệu ứng / phút, mỗi tiếng gắn một
việc nhìn thấy (vật bật ra, lia, cắm, nổ), "hiệu ứng" mạnh nhất là CẮT NHẠC 1.5–3 s đúng câu đùa; v3 của ta 125 cue / 3.6
phút ≈ 35 / phút, gần như không có chỗ lặng. **Luật:** tiếng chỉ đi với việc nhìn thấy; không sting tự tạo; 6–12 / phút;
im lặng là hiệu ứng (EDITING A5, C1–C6). Đã xoá `dun` khỏi tập. Không cắt tiếng từ video mẫu (bản trộn có bản quyền) — tìm
bản CC0 / PD tương đương theo từ khoá trong study.

## 196. Người dẫn ảnh tĩnh to + miệng cứng → "khô"; bán thân nhỏ ở góc + nhép miệng từ tấm sprite (hist/sarajevo, 2026-10-27)
Người dẫn v3 toàn thân cao 0.56–0.62 H, có mặt ~32 % thời lượng, miệng là một bức ảnh. Người dùng: "cho bé đi một xíu và
nằm ở rìa góc để đỡ mất thông tin… lúc nói chuyện nên nhép miệng chứ đừng để miệng cứng". Làm: tấm sprite 4×4 người dùng
tạo → cắt 16 ô (`tools/hist/sticker.py`), ô vẽ tay lệch tóc nhau → giữ MỘT ô gốc, chỉ ghép vùng miệng (mặt nạ elip mép mềm, tìm
bằng hiệu giữa các ô) → không rung tóc; mức mở từ `tools/voice/mouth_env.py` (4 mức, ≤ 12 lần đổi / s, chọn ngẫu nhiên tất
định trong mức). **Luật:** EDITING A1; xin sprite nhép miệng cho mỗi trang phục người dẫn mới; ghi nguồn ảnh sang góc trái.

## 197. Cận mặt người dẫn đứng một mình 3.5 s giữa câu kể → "sao có mỗi cái mặt" (hist/sarajevo, 2026-10-27)
Bản 4 đặt cận mặt (vai B) suốt nửa đầu câu "to figure out who was the strongest kid on the playground…" (10–13.5 s) — hình
không nói gì về câu. Thanh Pahm dùng mặt đơ 0.5–1 s NGAY SAU câu vô lý, như một phản ứng. **Luật:** cận mặt chỉ là phản ứng
≤ 1.2 s sau cú chốt (EDITING B12 → có hiệu lực); trong lúc lời đang kể, hình phải minh hoạ câu (ở đây: các nước ra oai trên sân
→ tới chữ "punch" thì đấm). Soát: mỗi cảnh có người dẫn chiếm > 40 % khung phải ≤ 1.2 s.

## 198. Mascot ảnh anime chi tiết không hoà vào cảnh; người dẫn VẼ NÉT bằng code thắng (hist/sarajevo, 2026-10-27)
Người dùng: "nếu làm mascot nét vẽ đơn giản như Thanh Pahm thì những video chiến tranh, biểu tình… đội mũ, mặc áo, rất đơn
giản mà hoà mình vào video hơn". Bàn thử `projects/hist/_lab/host2.html` (3 kiểu nét, 6 bộ đồ, nhép miệng vẽ, clip đám đông)
→ "quá đẹp, tuyệt vời" → kit `projects/hist/_kit/narrator.js`. Lợi: cùng nét với dân (EDITING B5), đồ / dáng / miệng sinh bằng
code (hết vòng xin ảnh – cắt – lệch mũ §184), tất định. Giữ dấu nhận diện Concept B (tóc hai màu, mắt lờ đờ, nanh, hoodie);
bản anime để dành cho thumbnail / avatar. **Luật:** nhân vật xuất hiện nhiều dáng / nhiều bối cảnh → dựng bằng code, nét chung
với cast; ảnh tạo sẵn chỉ cho vật tĩnh / thương hiệu. Bàn thử 3 phương án trước khi đổi cả tập.

## 199. Làm lại âm thanh bằng một agent: kế hoạch theo từng dòng + nguồn CC0 + mix.py hush (hist/sarajevo, 2026-10-27)
Agent đọc study 16–17 → `SFX-PLAN.md` (mỗi tiếng gắn một từ + một việc trên hình) + `data/cues.plan.json` (thử bằng
`mix.py --cues` không đụng trang); 125 → 43 cue (≈ 12 / phút), 5 `hush` trước câu đùa; 11 tiếng mới CC0 / PD (Commons,
OpenGameArt, Kenney — kiểm giấy phép từng trang). Openverse audio API 504 suốt buổi → chưa có kim đĩa / còi trượt / bõm nước;
`thud` trọng tâm 40 Hz có thể tắt trên loa điện thoại. Mốc súng / nổ của kế hoạch trùng đúng mốc trang (đối chiếu số). Agent
chạy 37 phút → phải nhắn đóng khung 15 phút. **Luật:** việc tìm tiếng giao agent kèm khung giờ; kế hoạch tiếng là file riêng
đối chiếu với mốc trang trước khi trộn; tiếng tự tạo còn lại bỏ nếu có khoảng lặng thay được (kim đĩa ở "But no.").


## 200. Hiểu sai ý "người dẫn trong sự kiện" HAI lần → nhét câu "I was there" + người dẫn mọi cảnh; người dùng: "chả tới cái gì cả" (hist/sarajevo, 2026-10-28)
Người dùng nói "người dẫn như một nhân vật xuất hiện ở các sự kiện" và kể VÍ DỤ (sát thủ đứng hóng, xem xe, ngồi cạnh tài xế,
tiếp viên). Mình biến ví dụ thành danh sách bắt buộc + viết 3 câu tự xưng ("How do I know? I was the seventh guy", "I was in that
crowd", "I was sitting next to the driver") + nhãn "that's me", "passenger seat: me" + người dẫn ở 6 cảnh (hàng sát thủ, đám
đông, toà thị chính, 3 cảnh xe — bán thân bị cắt nửa đầu sau cửa xe). Người dùng: "xuất hiện suốt video thì nhàm chán, lặp lại,
vô nghĩa… mỗi thứ nhét 1 ít xong chả có cái gì ra hồn… nếu không hiểu ý tưởng thì cần hỏi tôi chứ tự ý làm". Sửa (bản 7): cắt
3 câu khỏi giọng có sẵn (không đọc lại, 248.8 → 232.4 s), người dẫn chỉ còn LÀ một trong sáu sát thủ (áo đen, cùng cỡ, mặt
đắc ý), bỏ mọi nhãn và các cảnh xe / đám đông / toà thị chính. **Luật:** (1) ví dụ của người dùng ≠ yêu cầu nhét hết — chọn chỗ
có nghĩa (chuyện chỉ người trong cuộc biết), cảnh công khai bỏ; (2) thiết bị thị giác thì làm bằng HÌNH, không viết thêm lời
giải thích; (3) một ý tưởng mới có nhiều cách hiểu → hỏi người dùng (AskUserQuestion, 2–3 cách hiểu kèm ví dụ) TRƯỚC khi sửa
lời / dựng; (4) làm ít mà ra hồn hơn nhiều mà nửa vời. WRITING §1c, EDITING A7.

## 201. Âm thanh v6: mốc tiếng viết bằng TỪ trong script Python, nền phố + rè đĩa + nhạc theo đoạn (hist/sarajevo, 2026-10-28)
Viết lại lời làm lệch mọi giây của 51 cue v5. Thay vì dời tay, `data/cues_v6.py` đặt từng tiếng bằng (đầu câu, từ) trên
`narration.timeline.json` → chạy lại sau mỗi lần đọc giọng. Bẫy: so khớp `startswith` bắt nhầm "they"/"their" cho "the" →
so khớp ĐÚNG từ. Áp REVIEW-v5 §C: bỏ 8 cue không việc, súng vào khoảng lặng trước "He fires twice", một `_quiet` liền qua nhịp
chết, 4 hush, nổ bom +5 dB cắt 0.8 s (`end` mới trong `mix.py`: lặp / cắt + mép mềm 0.4 s — dùng cho nền phố, gió bản đồ, rè
78 vòng −36 dB dưới lời), 5 bản nhạc PD theo đoạn (ragtime → hành khúc 1914 từ "So Europe split" → lặng → Chopin → ragtime →
sting), `--music-db −16`. 43 tiếng / 4.1 phút ≈ 10.4 / phút. **Luật:** kế hoạch tiếng của tập là script theo từ (không JSON giây
tay); mọi tiếng nền dài dùng `end`.

## 202. Trang tập chép 180 dòng đồ nghề của kit → hai bản lệch nhau; một lần sửa một dòng làm mất khung biểu đồ (hist/sarajevo, 2026-10-28)
`_kit/stage.js` được TÁCH từ `episode.html` nhưng trang vẫn giữ bản chép (37 hàm). So từng hàm: 35 giống hệt, 2 lệch (`tear`,
`bars`). `bars` lệch vì lần sửa "dời khung xuống góc" chèn `g.translate(780, 60); // …` vào ĐẦU dòng có sẵn code → phần
`fillRect` / `strokeRect` khung nền nằm sau `//` thành chú thích: bản 7 chữ biểu đồ thép nằm trơ trên bản đồ, không ai thấy
qua 2 lần review ảnh. Refactor: trang import kit (−180 dòng), kit nhận bản `bars` đúng; chụp 44 khung trước / sau, md5 44/44
giống hệt, cảnh biểu đồ soi riêng. **Luật:** tách đồ nghề ra kit thì XOÁ bản chép cùng lúc (tập import, không chép); không
chèn code vào dòng đã có chú thích cuối dòng; refactor hình = so md5 khung trước / sau.

## 203. Chuỗi lệnh `a && b; rm -rf …` xoá nhầm thư mục nhạc khi `b` lỗi; `--to 999` render 822 s cho phim 233 s (hist, 2026-10-28)
(1) `git mv sfx … && git rm stall.wav … && ffmpeg … ; rm -rf assets/music` — `git rm` báo lỗi (file đã stage) nên chuỗi `&&`
dừng nhưng `;` vẫn chạy `rm -rf`: mất 5 bản nhạc chưa chuyển đổi; may đã commit nên `git checkout HEAD --` lấy lại. (2) Vòng
`while read …; do ffmpeg …; done <<EOF` — ffmpeg đọc stdin, nuốt mất các dòng còn lại (2/5 file, 1 file cụt). (3) Phần cuối
render `--to 999` chạy quá DUR 3.5 lần (shoot.js không kẹp) — 12 phút máy phí. Sửa: `shoot.js` kẹp `--to` về DUR.
**Luật:** bước xoá chỉ đứng sau `&&` của bước kiểm tra ngay trước nó, không bao giờ sau `;`; ffmpeg trong vòng lặp đọc heredoc
phải `-nostdin`; đếm số file / thời lượng sau mỗi lần chuyển đổi hàng loạt.

## 204. Tần suất người dẫn nhập vai: hơi nhiều hơn Thanh Pahm, đặt cạnh sự kiện quan trọng (hist/sarajevo bản 8, 2026-10-28)
Bản 7 (sau §200) chỉ còn người dẫn trong hàng sát thủ → người dùng: "hầu hết ổn rồi… tôi cũng muốn mascot xuất hiện ở đám đông…
tăng nhẹ tần xuất… thay vì 4 lần trong 18 phút thì nên cân nhất các sự xuất hiện bên cạnh các sự kiện quan trọng, có thể cảnh
đám đông vẫy vẫy hoặc 1 cảnh nào đó có nhiều nhân vật". Bản 8: người dẫn đội mũ quả dưa đứng trong đám đông vẫy cờ khi xe
qua, cảnh bom giữ đúng chỗ đó rồi núp (A2 nhất quán) — không nhãn, không lời; chỉ render lại phần 3. **Luật:** nhập vai ≈ 1 lần /
1–1.5 phút, ở cảnh nhóm kín hoặc đông người cạnh sự kiện quan trọng, mỗi lần một vai (PLAYBOOK §3) — §200 là "không lời, có
chọn lọc", không phải "càng ít càng tốt".

## 205. Nghiên cứu thị trường ra từ khoá + đề tài nổ chưa đủ — phải trả lời "vì sao xem MÌNH thay vì video triệu view" (hist/wrong-turn, 2026-10-28)
Báo cáo của agent khác (đề tài "America vs Iran") và bản của mình (28 kênh, `market/2026-10-28/VIRAL.md`) đều dừng ở "từ khoá dễ
nổ". Người dùng: "kênh mình có gì khác biệt so với các video đã nổ? … cùng search cùng tìm thì audience ưu tiên các video nhiều
views". Chốt sau đó: ảnh thật + hoạt hình, người dẫn du hành thời gian trốn trong sự kiện, luận đề kênh "tiny stupid mistakes →
biggest disasters", tập 1 = cú rẽ nhầm Sarajevo (PLAYBOOK §0b). **Luật:** đề xuất đề tài luôn kèm (1) lời hứa mà video lớn cùng đề
tài KHÔNG có, (2) DNA nhận ra được trong 5 giây đầu; title + thumbnail duyệt trước khi viết lời (CRAFT §1).

## 206. Thumbnail kênh sử: prompt ảnh AI "điện ảnh" thua — kênh thắng dựng từ chính dàn nhân vật + cắt ghép meme (hist/wrong-turn, 2026-10-28)
Hai vòng prompt ảnh thật (con phố, xe, mũi tên đỏ) → ảnh người dùng gen "không nổi bật", "trông không thể nào hấp dẫn bằng các kênh
khác". Người dùng soi thumbnail Thanh Pahm / OverSimplified: "họ không bao giờ generate các ảnh thật, họ chỉ cắt ghép meme và vẽ".
Mình tự dựng 6 hướng trong `projects/hist/wrong-turn/thumbs.html` (A tách đôi, D kiểu Thanh Pahm, E kiểu OverSimplified, F domino…)
→ người dùng chọn A + D + F làm A/B. Bẫy phụ: người dùng mở trang bằng `file://` → ảnh nạp lỗi CORS, thumbnail "đen xì" (lặp
§162: luôn đưa `http://localhost:<cổng>`). **Luật:** trước khi viết prompt, mổ 10+ thumbnail của kênh đang thắng cùng ngách và
dựng theo CÔNG THỨC của họ; kênh có dàn nhân vật riêng thì thumbnail dựng từ dàn đó bằng code, ảnh AI chỉ làm nền khi cần.

## 207. Ba chất liệu nhân vật trong một khung (đầu ảnh cắt vuông, thân pill, ảnh thật đóng khung) → "sai và kì"; chốt người đầu tròn VẼ (hist/wrong-turn, 2026-10-28)
Bàn thử hình: nhân vật đầu ảnh thật cắt khối chữ nhật đứng cạnh đám đông nét mềm ("sao các nhân vật ghép đầu nét vuông chữ nhật
thô thế"); ảnh thật vợ chồng Thái tử trong xe dán vào cảnh vẽ ("2 ông bà này đang ngồi xe hay làm khán giả?"); ảnh trong-xe
đóng khung đặt giữa phố vẽ ("trông kì lắm"). rembg mất cả người ngồi khi cắt xe (7aaf79f). Người dùng chọn B: VIP vẽ đầu tròn
có nét nhận dạng (ria FF, mũ Sophie, fez thị trưởng) cùng nét với dân; xe vẽ `C.car1914` có người ngồi. **Luật:** một khung =
một chất liệu nhân vật; ảnh thật chỉ ở cảnh tư liệu RIÊNG (khung ảnh trên nền trơn, khử màu), không ghép người thật vào cảnh vẽ;
đầu ảnh thật (kiểu A) chỉ để giới thiệu ai là ai (`channels/hist/CHARACTER.md` §2b). Thay luật "vật/nơi = ảnh thật" của §188 ở
cảnh có nhân vật vẽ hành động.

## 208. TTS nuốt câu trích dài đi sau lời kể trên cùng một dòng; đọc lại vẫn nuốt — tách câu trích thành dòng riêng (hist/wrong-turn, 2026-10-28)
`Franz Ferdinand cut him off, furious: "Mister Mayor, I come here on a visit, and I am greeted with bombs! …"` — whisper báo mất 6
từ đầu câu trích; `--redo` đọc lại vẫn nhồi 6 từ vào 0.8 s. Tách thành hai dòng (lời kể / câu trích, bỏ dấu hai chấm) → đủ chữ
ngay lần đầu. Các báo khác của whisper (Josef, Willie, II, gonna) là khác chính tả, vô hại. **Luật:** câu trích ≥ 8 từ đứng riêng
một dòng hơi; `tools/voice/script_check.py` cảnh báo "trích lời giữa dòng" (không chặn); sau đọc giọng luôn đọc `narration.redo.json`.

## 209. Tập 13 phút dựng song song 5 agent theo brief + QA độc lập: QA bắt 2 lỗi SAI SỰ THẬT TRÊN HÌNH và vật chung lệch giữa các hồi (lặp §71) (hist/wrong-turn, 2026-10-29)
Kiến trúc: `episode.html` chỉ nạp + ghép, cảnh theo hồi ở `scenes/a0–a8.js` (`export default K => [[giờ, (t, X) => …]]`, mốc
`LT`/`wd` theo đầu câu + từ), gag chung ở `scenes/common.js`, hợp đồng `BRIEF-SCENES.md`. Agent QA độc lập xem 198 khung: 2 lỗi
chặn là sự thật trên hình — chữ PARIS / LONDON đè cổng Brandenburg (Berlin), dấu ✗ trên tối hậu thư đặt sai điều khoản — và 11
lỗi lớn: cảnh đứng 16 s, khung "?" trống 9 s, người dẫn khách ăn to gấp đôi, ảnh vụ nổ hình nấm cho bom tay, bảng MISTAKES mỗi
hồi một cỡ (đạo cụ chung chưa vào `common.js` trước khi giao — lặp §71 §83), ba hồi tự chép hàm vẽ FF / Sophie / sát thủ (gộp vào
`common.js` `P.*` sau, 53/53 khung md5 giống hệt). Trang hỏng khi `meta.json` liệt kê ảnh không có file → loader bỏ qua + ghi
`window.__missing`. **Luật:** (1) trước khi giao: đạo cụ / vai lặp ≥ 2 hồi vào `common.js`; (2) QA hình đối chiếu nhãn, địa danh,
số trên hình với ghi chú dữ kiện của SCRIPT, không chỉ bố cục; (3) loader tập không chết vì một ảnh thiếu.

## 210. Đồ phụ trên mặt đọc thành mắt thứ hai; bộ đồ không mũ mất tóc (hist kit, 2026-10-29)
Kính tài xế hai vòng tròn trên mũ → QA đọc "tài xế có bốn mắt"; vẽ lại thành dây nâu + hai mắt kính dẹt mờ (`_kit/cast.js`). Thêm
outfit `waiter` / `austro` / `serb` cho người dẫn: luật tóc cũ giấu tóc với mọi outfit ≠ hoodie → người hầu trọc; sửa bằng danh
sách `HATTED` (chỉ bộ có mũ giấu tóc), outfit cũ giữ nguyên pixel (cast.html 0 lỗi). **Luật:** chi tiết tròn đặt gần mắt phải
khác hình mắt (dẹt / đậm / khác màu); luật hiển thị theo outfit viết bằng danh sách dương (có mũ), không "mọi thứ trừ X".

## 211. Nhạc nền piano ragtime đè giọng bị chê "ồn ào"; nhạc gen ngắn phải lặp có nối chéo (hist/wrong-turn, 2026-10-29)
Bản PD tạm (ragtime piano dày nốt) chạy dưới lời → người dùng: "mấy tiếng piano nghe khá ồn ào". Mình viết 7 prompt Suno theo ĐOẠN
(`projects/hist/wrong-turn/MUSIC.md`: instrumental, "no piano", phối thưa, "background under narration"), người dùng gen về 42–173 s.
Bản ngắn hơn đoạn → `mix.py` cũ `np.tile` lặp cả đuôi fade-out của Suno (hụt tiếng ở mối lặp). Sửa `loop_to`: bỏ đuôi (sau điểm cuối
RMS 0.5 s ≥ trung vị − 8 dB) + nối chéo 2 s công suất đều; `_music` thêm `from` (vào giữa bài để đỡ lặp chủ đề). Đo mối lặp: điểm thấp nhất
nằm giữa bài nhạc, không ở mối nối. Chỉ trộn lại tiếng trên `silent.mp4` (~10 phút), không render hình. **Luật:** nhạc dưới lời kể = không
nhạc cụ chạy nốt dày ở dải giọng; nhạc theo đoạn, mỗi bản ≥ 2 phút hoặc lặp có nối chéo; tên file người dùng gửi khác tên prompt → ghi
giả định ánh xạ và báo.

## 212. Đồ nhận diện kênh làm theo TẬP ĐẦU + người dẫn chỉ có cái đầu → chê 3 vòng (hist Blunderstory, 2026-10-29)
Banner v1: đầu người dẫn to + domino WW1 → "cái đồ to bự trông ngố", hai mép desktop trống. v2: xe 1914 + domino → "đừng fix cứng ý
tưởng ở bài 1… bạn làm 1 kênh chỉ đăng đúng 1 bài à". v3: người dẫn toàn thân + dòng đồ vật các thời đại (dải desktop) → "ổn hơn, trên
dưới trống" → v4: lớp TV trên = quốc gia biết diễn, dưới = dòng thời gian người nổi tiếng + năm (Caesar → Apollo 13). Mô tả kênh v1 cũng
mở bằng chuyện 1914. **Luật:** nhận diện kênh (banner, avatar, mô tả, trailer) dùng mô-típ CẢ kênh — nhiều thời đại, luận đề, dàn nhân vật
— tập đầu chỉ là một ví dụ; lấp đủ 2560×1440 (vùng an toàn 1546×423 cho chữ + người dẫn; dải desktop 2560×423; phần TV trên / dưới);
người dẫn toàn thân cỡ như trong video; biểu tượng thù ghét (chữ thập ngoặc) không đặt trên đồ nhận diện dù vẽ nhân vật lịch sử. Bàn
`projects/hist/_lab/banner.html` (4 mảnh 1920×1080 ghép PIL vì shoot.js chụp 1920×1080).

## 213. Đặt tên kênh: dò trùng bằng API, tên mô tả đều đã bị chiếm — tên ghép tự đặt thắng (hist, 2026-10-29)
Dò ~30 tên bằng `search.list type=channel` + `channels.list forHandle`: Tiny Mistakes History, Historical Blunders, Domino History,
Hindsight History (kênh 393k), History Unscripted (người dùng đề xuất — 6+ kênh, một kênh cùng ngách đăng đều, cả 4 handle mất),
Blunder History (@blunderhistory có chủ)… đều trùng. Tên ghép "Blunderstory" + "Whoopstory": 0 kênh, handle trống. Người dùng gõ thử
handle `@Blunderst0ry` (số 0) → khuyên không dùng (khó gõ, giống kênh giả); chốt `@blunderstorytv`. `forHandle` không thấy kênh ≠ handle
dùng được (YouTube giữ chỗ) → luôn đưa 2–3 phương án dự phòng. **Luật:** tên kênh = nghĩa luận đề + chưa ai dùng + handle khớp tên; trình
bày số liệu trùng (sub, số video, handle) khi phản biện tên người dùng đề xuất; chữ khoá tìm kiếm ("History") đặt ở khẩu hiệu / mô tả.

## 214. Gói đăng kênh sử thiếu Problems; trỏ tên file thay vì dán nội dung → người dùng hỏi lại 3 lần (hist, 2026-10-29)
"Thông tin mô tả kênh của tôi đâu???", "phần từ khoá viết kiểu gì để copy paste", "còn mô tả default thì sao", "cần thêm problems chứ" —
mình trỏ `channels/hist/channel-description.txt` thay vì dán; từ khoá viết kiểu ngoặc kép cũ trong khi Studio mới tách bằng DẤU PHẨY;
quên ô Problems (kênh toán có từ lâu — bộ nhớ "gói đăng là xong"). **Luật:** mọi chữ người dùng phải dán vào Studio → dán NGUYÊN VĂN trong
khối code ngay trong câu trả lời (kèm số ký tự / giới hạn), file chỉ là bản lưu; gói đăng video Education luôn có `problems.txt`
(`M:SS câu hỏi`, ≤ 800); soi ảnh Studio người dùng gửi để khớp định dạng ô (dấu phẩy, nhãn tiếng Việt).

## 215. Cài kênh: quốc gia cư trú phải thật; giọng clone phải khai "nội dung tổng hợp"; danh mục theo ngách đo bằng API (hist, 2026-10-29)
Ảnh Studio: quốc gia cư trú "Hoa Kỳ" → nhắc chọn nơi sống thật (thuế, AdSense, xác minh). Chính sách YouTube (help 14328491): tạo /
clone giọng người để dẫn chuyện nằm trong ví dụ PHẢI khai altered/synthetic — khai không giảm tiếp cận / kiếm tiền. Danh mục: 10 video
gần nhất của 10 kênh cùng ngách → Education 8/10 kênh (OverSimplified 8/10 video, Kurzgesagt, RealLifeLore, Simple History…), Thanh Pahm
People & Blogs. Kênh nằm ở Gmail kinh doanh khác → token API riêng (`channels/hist/channel.json` youtube_id, thêm Test user, `stats.py
--ch hist --login`). **Luật:** checklist cài kênh + đăng tập ở `channels/hist/STUDIO-SETUP.md` / `out/hist/<tập>/youtube/UPLOAD.md`;
chính sách nền tảng tra bản hiện hành trước khi khuyên.

## 216. Thumbnail mascot vẽ nét: đo cỡ MẶT ở 168 px, không đo thân — mặt ≈ 40% cao khung, khung cắt theo việc (en thumbs v3, 2026-10-29)
Thumbnail AI của kênh Anh không đạt (60 / 11 / 232 view) → v3 vẽ nét bằng `projects/en/_kit/mascot.js`. Ba vòng cỡ: nháp 1 mascot
bán thân to giữa khung ("hơi to"), nháp 2 toàn thân ~35% ở góc ("trống quá"), nháp 3 toàn thân ~58% — đo: mặt chỉ 21–25% cao khung →
**~21 px ở 168 px, mắt kính ~5 px**: biểu cảm mất, còn "cậu bé đeo kính"; thân quần đen chiếm chỗ không kể gì. Người dùng: "biểu cảm
là một phần móc… không phải lúc nào toàn thân hay nửa thân". Bản 4: đường kính mặt ≈ 40% cao khung (r ≈ 210 ở 1920×1080, hàm
`bust(x, hy, r)`) → ~38 px ở 168: mắt sốc, miệng há, mặt đắc ý đọc được. Kèm: hook ở nửa trên (phép thử TV), mặt né góc phải dưới
(nhãn giờ), ≤ 3 cụm chữ, bỏ chữ phụ (÷2, nhãn năm, dòng code) vì ở 168 px không đọc được.
**Luật:** mascot vẽ nét mà biểu cảm là nửa móc → đo MẶT (≥ ~35–40% cao khung) bằng ảnh 168 px trước khi báo; khung cắt theo việc:
cận đầu khi phản ứng là móc, bán thân khi tay làm việc với vật, toàn thân chỉ khi dáng người là móc. Luật "mascot ≤ 25%" (§113)
chỉ còn cho mascot làm dấu phụ.

## 217. Thumbnail sinh từ THẾ GIỚI của video, mascot đang LÀM GÌ trong đó — không khuôn nền chung (en thumbs v3 → logarithm v4, 2026-10-29)
v3 khoá "3 phong cách dùng chung" (bảng phấn / truyện tranh chia chéo / đèn chiếu) + mascot bán thân nhìn thẳng cho mọi bài để
"A/B biết phong cách nào thắng". Sau 6 bài (16 khung) người dùng: "bí ý tưởng, quay đi quay lại vài khung hình… chỉ có bảng, có
hiệu ứng… trong khi chính nội dung video liên tục đổi mới, xây background mà thumbs không làm được. Cả tư thế mặt của mascot nữa".
Nguyên nhân: biến một biến số thử nghiệm (phong cách) thành khuôn; hiểu luật "mặt ≈ 40%" (§216) thành "luôn bán thân đứng yên".
v4 logarithm dựng bằng chính kit của bài (`projects/en/logarithm/thumbnail/thumbs-v4.html`: tường đục lỗ, bàn bạch dương, 「72」
gỗ, chồng xu, lịch khối) + mascot dáng động bọc lên khung người que (`engine/mascot-line.js` skin + từ điển dáng): bị 72 đè gồng
tay đỡ · ôm tháp xu vọt trần · cận mặt + kính lúp soi "+2 DAYS".
**Luật:** mỗi thumbnail = (1) một TÌNH HUỐNG trong thế giới DNA của bài, vẽ bằng kit / đạo cụ của bài, (2) mascot đang làm một
hành động với vật (đỡ, đu, soi, bị đè, ném…) — dáng, góc máy, cỡ khung khác nhau giữa các bản, (3) mặt vẫn đọc được ở 168 px
(§216) bằng cách đưa máy quay gần, không bằng cách đóng khung bán thân.
**Luật A/B (người dùng cùng ngày):** "A/B testing tức là không phải chỉ lấy 1 bối cảnh rồi test với title và chữ khác… CHỈ MỘT thumbs
 cùng background với bài video, 2 thumbs còn lại phải sáng tạo, tìm cách thiết kế và bố cục" — bản A = thế giới của video; bản B, C =
 thế giới + bố cục khác hẳn (logarithm: B đồng hồ cát xu vàng nền tối, C cả khung là tờ tiền có chân dung mascot). Soi từng bản ở
 độ phân giải gốc trước khi báo — bản đầu v4 có tay vắt qua mặt, cán kính không ai cầm, người dùng thấy trước mình (lặp §216: nhìn ảnh).

## 218. DNA luôn linh hoạt — đừng biến lựa chọn của MỘT lần thành khuôn (lặp lại lần ba → luật nền CRAFT §0) (en thumbs, 2026-10-29)
> Lặp lại: "mỗi video một DNA" (`docs/DNA.md`, CRAFT đầu trang), exp-log "thế giới có liên kết" suýt thành luật cho mọi MV,
> "ví dụ ≠ yêu cầu" (kênh sử 10-28). Lần này ở thumbnail.
Mình tự đặt "3 phong cách thumbnail dùng chung để A/B" rồi lặp cho 6 bài / 16 khung; luật "mặt ≈ 40%" (§216) bị mình hiểu
thành "luôn bán thân nhìn thẳng". Người dùng: *"DNA của chúng ta luôn flexible, sáng tạo, đổi mới chứ không bao giờ lặp lại hay
cố định cả, bạn quên rồi tôi buồn lắm."* Cùng lúc video bên trong mỗi bài có thế giới riêng — chỉ phần mình tự "hệ thống hoá" là
đông cứng. Dấu hiệu nhận ra sớm: một quyết định mang chữ "chung / mọi bài / luôn / cố định" mà KHÔNG do người dùng nói; một bộ
sản phẩm mới trông giống bộ trước.
**Luật (CRAFT §0):** thứ được dùng lại là QUY TRÌNH, công cụ, phép đo (vd. đo mặt ở 168 px); KHÔNG BAO GIỜ là nền, bố cục, dáng,
phong cách. Trước khi thiết kế một bộ mới: đọc sổ những gì đã làm (`channels/THUMB-LOG.md` cho thumbnail) và tránh lặp
thế giới / bố cục / dáng của các bài gần đây. Muốn biến một lựa chọn thành "chung" → hỏi người dùng, không tự đặt.

## 219. BỌC mascot đầu to nhìn thẳng lên khung người que = dáng quái dị — mascot diễn bằng dáng GÓC THẲNG của chính nó (logarithm bản 3, 2026-10-29)
Bản 3 dựng `skin(J)`: vẽ tóc / kính / blouse lên khớp `stick()` để giữ chuyển động người que đã duyệt. Mình duyệt clip 56 s rồi build
cả bài; người dùng xem bản cuối: *"tay của nhân vật mới trông kì… không được như bên kênh lịch sử… người nào làm được tư thế này
vậy? … trời ơi là trời… Nếu không làm được góc nghiêng thì mình chỉ làm góc thẳng thôi cũng được mà"*. Nguyên nhân: tỉ lệ người
que (chân dài, thân mảnh, dáng NGHIÊNG đi / trèo / ngồi) + đầu chibi to NHÌN THẲNG + tay là ống mảnh gập theo IK → thân xoắn,
đứng một chân, tay que, đầu thẳng trên thân nghiêng. Ưu tiên "dùng lại chuyển động" hơn "nhân vật trông đúng". Mình tự duyệt
clip — lặp luật 3 AGENTS "nhìn ảnh" và §136 (người dùng duyệt clip): clip gửi kèm lời "đạt" của mình làm người dùng tin theo.
Sửa: `engine/mascot-line.js` `mascot()` viết lại theo người dẫn kênh sử (`projects/hist/_kit/narrator.js`): CHỈ GÓC THẲNG, tay =
MỘT ống tay blouse dày liền bàn tay tròn (+ vòng cổ tay), diễn bằng `hands` (đích tay), `crouch`, `lift`, `lean`; bảng dáng
`projects/en/_lab/mascot-poses.html` (đứng nói, chỉ, khuỵu, bật nhảy, bước nhún, bê khối, đỡ khối, hất khối, viết, sốc) duyệt TRƯỚC.
Bẫy phụ: người dẫn + người diễn cùng một mascot → một bản trên khung (`actorOn`); `while read … node …` nuốt stdin → `</dev/null` (LẶP LẠI §203 → luật cứng AGENTS: mọi lệnh trong vòng `while read` thêm `</dev/null`).
**Luật:** nhân vật mới diễn bằng bộ dáng của CHÍNH nó, vẽ theo góc nó vẽ được (mascot vẽ nét = góc thẳng); không đội rig của nhân
vật khác. Bảng dáng tĩnh → người dùng duyệt → clip → người dùng duyệt → mới vào video; không tự gắn chữ "đạt" lên clip.

## 220. Xoay 3/4 nhân vật vẽ nét: chiếu nét mặt lên KHỐI CẦU, thân lên KHỐI TRỤ — quay thân thì VAI + TAY phải quay theo (logarithm bản 5, 2026-10-29)
Người dùng chọn "góc thẳng trước, 3/4 sau" (§219) rồi hỏi "3D với 3/4 đâu". `engine/mascot-line.js` thêm `yaw` (rad, ±1 ≈ ±57°):
`faceMap` chiếu mắt / kính / miệng / tai / mái lên khối cầu đầu (điểm ra sau đầu bám mép, co ngang k = z'/z), mũi chỉ hiện khi
|yaw| > 0.12, tai quay ra trước vẽ đè mặt; thân: chi tiết mặt trước (áo thun, ve áo, túi) trượt trên khối trụ ×0.4, mép áo giữ
bóng. Bản đầu quay thân mà vai cố định → người dùng: "quay cả thân mà tay lại không quay theo à?". Sửa: vai trượt trên khối trụ
(góc ±1.17 + yaw×0.6), vai quay ra sau (cos < 0.3) → tay vẽ TRƯỚC thân (khuất sau vạt áo). Bẫy phụ: vẽ tay trước thân làm rò
`strokeStyle` sang thân (áo mất viền) → hàm vẽ thân tự đặt lại bút. Trong bài: `actor.js` trường `yaw` (nội suy), đi bộ tự quay
0.6 về hướng đi; xoay ở khoảnh khắc NHÌN vật (dõi tháp bay, cúi viết, hất khối), còn lại nhìn thẳng.
**Luật:** xoay một bộ phận → soi mọi bộ phận gắn vào nó (vai, tay, đạo cụ cầm) trong cùng lượt; bàn thử phải có clip CHUYỂN ĐỘNG,
không chỉ dải ảnh tĩnh — lỗi "tay không quay theo" chỉ lộ khi xem quay.

## 221. Người dùng chọn "X trước, Y sau" → ghi Y vào STATUS "còn chờ" NGAY và nhắc khi X xong (logarithm bản 4→5, 2026-10-29)
Người dùng chọn "Góc thẳng trước, 3/4 sau". Mình làm xong góc thẳng, gửi clip v4 xin duyệt mà không nhắc phần 3/4 → người dùng
phải hỏi "Thế còn 3D với 3/4 mà bạn bảo thì ở đâu nhỉ". Phần "sau" chỉ nằm trong ngữ cảnh hội thoại, không ở file nào.
**Luật:** lựa chọn hoãn (Y) → một dòng "còn chờ" trong `docs/STATUS.md` (hoặc kế hoạch của mảng đó) ngay lúc người dùng chọn;
câu hỏi duyệt X kèm một dòng "tiếp theo: Y" để người dùng chọn làm ngay hay để sau.


## 222. Tập 11 phút dựng song song lần 2: bỏ QA độc lập (lặp lại §209) → người dùng bắt 4 lỗi mình xem lướt bỏ sót (hist/berlin, 2026-10-29)
Làm đúng phần đầu của §209: `common.js` có sẵn vai kiểu B (`P.schab/honecker/krenz/jaeger/guard/vopo`), tờ `memo()` xuyên suốt,
phòng họp báo, `wall()`, bản đồ kit `europe1960/1994`; mỗi agent một thư mục ảnh riêng (`assets/photos/<A–E>/` — tránh 5 agent
ghi chung một `meta.json`); 5 agent sonnet dựng 11 hồi trong ~1 giờ, check 0 lỗi. Nhưng QA chỉ là MÌNH xem bảng ảnh thu nhỏ
(12–16 khung / hồi, 480×270) — bắt được cờ Mỹ/Anh/Pháp vẽ thành cờ ba sọc ngang và chữ trích chồng dòng, mà sót 4 lỗi người
dùng chỉ ra ngay ở lượt xem đầu: chữ "US" nằm trên ranh giới FR/US (đặt bằng kinh/vĩ đoán), mặt Đông Đức lòi ra ngoài lãnh
thổ (dời mặt bằng px `dx/dy` cố định khi zoom đổi), "mấy cái que" (hàng rào + kìm vẽ 1–2 % khung trên bản đồ — không ai đọc ra
nghĩa), chữ PRESS tràn khỏi thẻ trên mũ (lỗi KIT có từ trước, `fillText` trong ô cố định không đo chữ). **Luật:** (1) tập dựng
song song luôn có lượt QA ĐỘC LẬP xem ảnh cỡ thật (§209) — bảng ảnh thu nhỏ của chính người giao việc không thay được;
(2) nhãn / mặt / ghim trên bản đồ đặt tại điểm TRONG vùng (kinh/vĩ tâm vùng, hoặc `V.pt(ll(…))` tính lại mỗi khung), không dời
bằng px cố định; (3) chữ trong ô → `measureText` rồi mới vẽ ô (soát `fillText` + `fillRect` cố định trong kit).

## 223. Hành động trên bản đồ thu nhỏ thành "que": bản đồ nói Ở ĐÂU, cận cảnh nói CÁI GÌ (hist/berlin, 2026-10-29)
Agent vẽ "Hungary cắt hàng rào" ngay trên bản đồ zoom 5: cột rào + kìm cao ~110 px dọc một đoạn biên giới ngắn → người dùng:
"mấy cái que này là gì, có ý nghĩa gì?". Vật thật trên bản đồ bị co theo tỉ lệ bản đồ, mất hình dạng nhận diện (kìm = 2 vạch).
Sửa: hai nhịp — bản đồ chỉ vẽ ký hiệu đọc được ở cỡ nhỏ (đường dây thép gai có ngạnh ✕ + nhãn "BORDER FENCE"), rồi cắt sang
cận mặt đất: hàng rào cột xám ba dây thép gai ngang khung, lính biên phòng cầm kìm cán đỏ, "SNIP!", cột đổ nằm. **Luật:** vật /
hành động phải tự đọc ra nghĩa KHÔNG cần lời (thử: che tiếng, mô tả được không?). Trên bản đồ chỉ để ký hiệu + nhãn; hành động
cần thấy đồ vật → cận cảnh riêng ≥ 1.5 s.

## 224. Số trên Wikipedia cũng sai — phép tính ngày làm bằng code; soát sử độc lập bắt 9 chỗ (lặp lại §191, đúng quy trình) (hist/berlin, 2026-10-29)
Mình tự soát lời theo Wikipedia rồi mới giao agent opus soát độc lập (tự tra nguồn, không đọc README của mình): 9 chỗ phải sửa —
"339 days" (Wikipedia ghi; 9/11/1989 → 3/10/1990 thật là 328 ngày, `date` trừ ra ngay), "ninety-nine and three-quarter years" (từ
19/1 tới 9/11/1989 là 0.8 năm → "ninety-nine years and two months"), "at least 136 killed trying" (số mới ≥ 140, chỉ ~100 khi
đang vượt), "100,000 tried" là cả biên giới nội Đức chứ không riêng Berlin, Schabowski "went home" (thật ra ngồi phỏng vấn NBC
ngay sau), câu Honecker thiếu vế điều kiện, "has not read it" (nguồn chỉ nói đọc lướt). **Luật:** (1) mọi con số suy ra (số ngày,
số năm, tỉ lệ) tính bằng code, không chép; (2) câu đùa dựa trên số (phép trừ, so sánh) soát như dữ kiện; (3) bước soát sử độc
lập trong PIPELINE giữ nguyên — lần này nó trả giá đúng chỗ.

## 225. Tài sản dùng lại của KÊNH: thư viện nhạc + bản đồ thời đại + gợi ý tìm kiếm thay vidIQ (hist/berlin, 2026-10-29)
- Người dùng: "update các nhạc nền cho kênh… sau này nếu video dùng được các nhạc nền đã có thì đỡ phải gen lại" →
  `projects/hist/_kit/music/LIBRARY.md` (14 bản gen + 5 PD, không khí / đoạn hợp / đã dùng; số đo bpm-độ sáng-dải động),
  file mới ở `_kit/music/gen/`; `cues.py` tự dùng bản trong thư viện, thiếu thì rơi về bản PD tạm (render xem trước không chờ nhạc).
- Bản đồ thời đại vào kit một lần, dùng mọi tập: `tools/hist/geo.py` + historical-basemaps `world_1960` / `world_1994` →
  `_kit/maps/europe1960.json` / `europe1994.json`, cờ + điểm đặt mặt thêm vào `mapkit.js` (chỉ THÊM tên — tập cũ không đổi pixel).
- vidIQ hết credit → gợi ý tìm kiếm công khai của YouTube (`suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=en&gl=us&q=…`,
  không danh tính) cho thấy người xem tự gõ "berlin wall mistake", "… press conference mistake" → chọn góc title C. Chỉ là tín hiệu
  có / không, không phải khối lượng.
**Luật:** tài sản sinh ra trong một tập mà tập sau dùng được (nhạc, bản đồ, vai, phông) → đưa về `_kit/` + bảng tra ngay khi
làm, không để trong thư mục tập.

## 226. Kênh mới không có công cụ build → làm theo tiền lệ gần nhất thay vì kiến trúc repo: gói YouTube kênh sử nằm sai trong projects/ (hist, 2026-10-30)
Người dùng bắt: gói đăng `youtube/` của wrong-turn, berlin, pearl nằm trong `projects/hist/<tập>/` trong khi mọi bài khác (25 bài
en/ja) và luật AGENTS ("projects/<kênh>/<p> ↔ out/<kênh>/<p>"), `docs/MAP.md` ("<p>/youtube/ gói đăng" dưới out/), STATUS dòng 5
đều đặt ở `out/<kênh>/<p>/youtube/`. Nguyên nhân gốc (không cố ý):
1. Ở kênh bài học, đường out/ do CÔNG CỤ ép (`tools/lesson/build.py` tự ghi `out/<p>/youtube/`) — luật chưa bao giờ phải nhớ. Kênh
   sử không có build.py; gói đăng viết TAY → luật chỉ sống trong công cụ thì mất ngay khi làm tay.
2. Tài liệu kênh sử dạy sai: cột bảng `channels/hist/PIPELINE.md` ghi "ra (trong `projects/hist/<tập>/`)" cho MỌI bước; PLAYBOOK /
   PACKAGING / UPLOAD.md ghi đường tương đối `youtube/` → đọc hiểu là trong projects.
3. Tập 1 (wrong-turn) đặt gói ở projects/ (+ một bản chép lệch trong out/); tập 2, 3 mình sao theo TIỀN LỆ gần nhất mà không đối
   chiếu kiến trúc chung (AGENTS / MAP) — chép lại lỗi hai lần.
Đã sửa: dời 3 gói về `out/hist/<tập>/youtube/` (gộp bản chép lệch của wrong-turn), xoá khỏi projects, sửa mọi đường dẫn (PLAYBOOK,
PACKAGING, README, UPLOAD.md, THUMB-LOG, §214), PIPELINE thêm bước 6b + cột tách NGUỒN (projects) / SẢN PHẨM (out).
**Luật:** sản phẩm (video, gói đăng, thumbnail xuất, ảnh kiểm) LUÔN ở `out/<kênh>/<p>/`; projects/ chỉ chứa nguồn (lời, cảnh, dữ
kiện, asset vào). Kênh / dạng việc mới chưa có công cụ → đối chiếu AGENTS + MAP trước khi tạo thư mục đầu tiên, không theo tiền lệ
của tập trước. Đường dẫn trong tài liệu viết ĐẦY ĐỦ (`out/hist/<tập>/youtube/`), không tương đối.

## 227. Tự làm tuần tự + tự xem bảng ảnh từng hồi vẫn sót 27 lỗi — QA độc lập ảnh cỡ thật là bắt buộc (lặp §209 §222 lần 3); cảnh "trống chờ từ" (lặp §130) (hist/pearl, 2026-10-30)
Tập 3 mình dựng MỘT MÌNH (người dùng chọn tuần tự), mỗi hồi tự chụp 6–19 khung, xem bảng ảnh 640 px và sửa ~20 chỗ. Agent QA độc
lập xem ~150 khung CỠ THẬT vẫn bắt 27 lỗi: 6 chữ tràn ô / ra ngoài vùng an toàn (đo được bằng mắt chỉ ở cỡ thật), bản đồ thiếu đảo
(§228), vòng khoanh lệch trên ảnh đang zoom (§229), vật đọc không ra (cờ-lê là "que", xe hơi không thấy xe, cáp cẩu lơ lửng), và
**5 cảnh trống 2–7 s** vì nội dung chính được hẹn hiện ở MỘT TỪ cuối câu (nhãn "ALL 3 CARRIERS: AWAY" ở từ "away" → 7 s chỉ có ô
nét đứt; kính lúp ở "sabotage"; tường thành ở "walls"; chữ trong khung tranh ở "four"). Bảng ảnh tự chụp chọn đúng giờ mình nghĩ
cảnh đã đủ → không bao giờ thấy khoảng trống trước từ đó.
**Luật:** (1) QA độc lập xem ảnh cỡ thật mỗi ~6 s + 0.3–0.8 s sau mỗi đầu cảnh là bước cố định của MỌI tập, kể cả khi tự làm
(PIPELINE bước 4). (2) Mỗi cảnh phải đọc được nghĩa từ 0.5 s đầu: vật / nhãn CHÍNH hiện ngay đầu cảnh; mốc theo từ chỉ dùng cho
điểm nhấn (dấu đóng, khoanh, chuyển trạng thái) — lặp §130 ("nhãn bật ở từ ĐẦU cụm"). Tự kiểm: chụp thêm khung ở đầu cảnh + 0.5 s.

## 228. Bản đồ lịch sử: dữ liệu thiếu đảo nhỏ, vùng vắt qua kinh tuyến 180°, hệ số cos cứng — ghim rơi ra biển (hist/pearl, 2026-10-30)
historical-basemaps 1938 KHÔNG có Oahu / Kauai (chỉ vài đảo Hawaii) → ghim "PEARL HARBOR", 6 tàu sân bay đặt sai, QA bắt. Thái Bình
Dương vắt qua 180° → `geo.py` cắt theo kinh độ phải đổi kinh âm +360 trước. `mapkit.ll()` nhân cos(50°) cố định cho mọi bản đồ
(đúng cho châu Âu, sai cho lat0 25° / 21°). Đã sửa: ghép bờ biển Hawaii từ Natural Earth 10m (PD) vào `pacific1938.json`, Oahu riêng
`oahu.json`; `ll` dùng `M.cosl` nếu file có (bản đồ cũ không có → giữ C50, không đổi pixel tập cũ).
**Luật:** bản đồ mới → bàn thử (`projects/hist/_lab/map*.html`) ở ĐÚNG mức zoom sẽ dùng, đặt sẵn mọi ghim / mặt của tập, nhìn ảnh
xác nhận mỗi điểm nằm TRÊN polygon của nó trước khi dựng cảnh. Thiếu đảo / bờ → ghép Natural Earth (PD), ghi nguồn. File bản đồ mới
luôn có `cosl`.

## 229. Lớp phủ trên ảnh đang zoom phải tính theo toạ độ ẢNH, không toạ độ màn hình (hist/pearl, 2026-10-30)
Vòng đỏ khoanh "7:02" trên bản vẽ radar thật đặt cố định (1050, 370) trong khi ảnh phóng 1.9 → 2.0 theo t và lệch tâm → vòng khoanh
giấy trắng. Sửa: tâm vòng = gốc ảnh + phân số ảnh (0.556, 0.253) × cỡ ảnh hiện tại.
**Luật:** khoanh / mũi tên / nhãn chỉ vào chi tiết của ẢNH → lưu vị trí bằng phân số của ảnh, vẽ qua cùng phép biến đổi (hoặc dùng
hàm trả về của `S.photoBg` (ix, iy) → màn hình). Kiểm bằng khung ĐẦU và CUỐI cảnh (lúc zoom khác nhau nhất).

## 230. Nhận diện + nhân vật kênh sử: watermark tách alpha hai nền, biến thể avatar căn lại từng bản, biểu cảm / mũ thêm vào kit kiểu CỘNG (hist brand, 2026-10-30)
Người dùng: avatar + banner nền trắng, watermark PNG; thích người dẫn đội mũ rơm ở tập Berlin → "thêm biểu cảm, trang phục, chi tiết".
- Watermark: vẽ 2 lần trên nền trắng / đen, alpha = 1 − (trắng − đen)/255 → PNG trong suốt không viền răng cưa; vẽ nhỏ rồi phóng để
  nét dày (cỡ hiện ~60 px).
- Biến thể avatar dùng chung một vị trí đầu → bản mũ thấp (phóng viên) "thụt xuống, trên trống" (người dùng chỉ ra) → mỗi bản có `FIT`
  (dịch + phóng) để khối đầu + mũ cân giữa vòng tròn. Mũ rơm bản đầu "đội lệch" (chóp không trùm búi tóc).
- Biểu cảm mới (wink, joy, star, dizzy, teary, side; miệng tongue / wavy / pout; fx sweat / vein / blush / shine) + `hatOn` (7 mũ) thêm
  vào `_kit/narrator.js` bằng TÊN MỚI; so pixel 3 khung tập berlin trước / sau = trùng → tập cũ không đổi.
**Luật:** biến thể ảnh nhận diện xem ở cỡ thật VÀ 176 / 88 px, căn từng bản theo khối hình thực tế (không dùng chung toạ độ). Mở rộng
kit nhân vật = thêm tên mới, không sửa nhánh cũ; chứng minh bằng so pixel một tập đã xong. Mỗi tập chọn mũ / biểu cảm hợp tình huống,
không lặp (bộ nhớ hist-playful-props, CRAFT §0).

## 231. Vật CÓ TÊN dùng ảnh thật, số đông thì vẽ, meme VẼ LẠI khuôn — người dùng chỉ ra sau bản 1 (hist/pearl, 2026-10-30)
Bản 1 vẽ hết xe / tàu / máy bay, kể cả những vật cụ thể có ảnh PD (chính tàu USS Ward, radar SCR-270 ở Opana, đoàn B-17 ngày 7/12,
cảnh O'Brien chữa cháy Ward năm 1944). Người dùng: "máy bay / xe / tàu đặc biệt thì ghép ảnh thật, dàn chung chung thì vẽ… thêm meme vào
các khoảnh khắc thì càng vui". Bản 2 đổi 4 chỗ sang ảnh thật (1 cắt nền rembg, 3 khung / tràn khung) + 3 meme dựng lại KHUÔN bằng người
dẫn / Tyler (hai ô chê–duyệt, bình tĩnh giữa đám cháy, kế hoạch–thực tế) — không dùng ảnh meme gốc có bản quyền (Content ID, §186).
Sửa cục bộ → chỉ render lại các phần chứa cảnh đổi (3/4 phần), giữ phần 0–150 s.
Vướng: `cutout.py` cần rembg — chỉ có trong `tools/cutout/.venv`, python hệ thống / analysis báo thiếu module (đã ghi PIPELINE).
**Luật:** lúc viết lời đã đánh dấu vật có tên trong câu → tìm ảnh PD của CHÍNH vật đó trước khi vẽ (lặp tinh thần §188: vật / nơi
thật thì ảnh thật); số đông vô danh mới vẽ. Mỗi tập 2–3 meme ở cú chốt, dựng lại khuôn bằng nhân vật kênh (EDITING A14).

## 232. Trích ảnh QA bằng `fps=1/n` lệch n/2 giây — mốc giờ sai thì QA báo "hình sớm" toàn giả (hist/hitler, 2026-11-02)
`ffmpeg -ss 2 -vf fps=1/4` trả `f_037` đúng giây 148 chứ không phải 146 (so ảnh: lệch 1,97 so với 80,9). Hàng loạt mục QA "hình sớm ~2 s so với lời"
là báo sai; suýt sửa nhầm các mốc đúng. **Luật:** cần ảnh ở giờ chính xác → `shoot.js stills --t` hoặc `-ss t -frames:v 1`; mục "lệch giờ" của QA
phải đo lại một khung trước khi tin. Cũng trong đợt này: QA một agent chạy quá dài chết vì "Prompt is too long" mất sạch phát hiện → QA dài phải ghi lỗi ra file ngay khi thấy.

## 233. Nhãn ngày trên ảnh thật phải khớp ngày CỦA ẢNH — tra metadata, đừng lấy ngày sự kiện trong lời (hist/hitler, 2026-11-02)
Ảnh cổng Bürgerbräukeller ghi "8 NOV 1923" nhưng Commons ghi chụp 1933; bản đồ West Point (8–12/1941, thấy rõ "1 Oct", "5 Dec") bị dán "22 JUNE 1941"; ảnh tù binh 1943 dán "STALINGRAD · 1942".
Người xem không biết, nhưng là sai sử trên hình của một kênh sử. **Luật:** mọi ảnh thật có nhãn ngày → đối chiếu `DateTimeOriginal` / chú thích Commons; ảnh khác thời điểm với lời → nhãn nói đúng ("THE AFTERMATH", "HOW FAR THEY GOT") hoặc tách cảnh vẽ cho mốc lời.

## 234. Đồ đúng phe + đúng thời, bản đồ đúng địa lý: code vẽ không tự biết — soát riêng (hist/hitler, 2026-11-02)
Lặp lại §227 (QA độc lập bắt được thứ người dựng không thấy): 141 mục, trong đó tướng 1940 đội Pickelhaube, lính Đức đội mũ Anh (`helmet`), Hitler 1919 có băng tay đảng; gọng kìm Stalingrad vẽ sai hướng (thật: gặp ở Kalach PHÍA TÂY thành phố); mũi tên bom Đức xuất phát từ Thuỵ Điển; xe tăng dự bị D-Day và Dunkirk sai vị trí; Nga bị bbox dữ liệu cắt thẳng thành "biển" (`eastLand`); đám đông mặc định có fez (Sarajevo) lọt vào Munich; dấu gân giận 4 nét trên đầu Hitler gợi chong chóng chữ thập ngoặc → bỏ. Đặt đế `famous` > 1060 cắt giày (đế lòi y + 0,014 h).
**Luật:** mỗi tập soát bảng: người nào / phe nào / năm nào đội gì; mỗi mũi tên bản đồ đặt bằng `P(V, lon, lat)` theo nguồn, không gõ pixel; đám đông truyền `wears` theo bối cảnh; biểu tượng vẽ gần Hitler xem kỹ hình dáng.

## 235. Tạo hình nhân vật theo công thức: đổi đồ theo thời kỳ, kiểm chiều mày, biểu cảm meme vẽ lại (hist/hitler + kit, 2026-10-30 → 11-02)
Người dùng khen "hay đấy, ổn đấy" công thức đầu tròn + 1–3 nét nhận dạng + đạo cụ (`famous.js`) và mặt meme vẽ lại (`narrator.js`). Lỗi thật trên đường: Hitler 1907 mặc quân phục (mặc định `WHO` chỉ đúng một thời) → thêm `coat / pants / det` theo thời kỳ; mày giận và mày buồn bị đảo chiều; tay vẽ trước mũ bị vành đè; mũ sĩ quan bản đầu lộ đỉnh sọ, giọt mồ hôi nằm dưới vành chỉ còn mẩu xanh như lỗi vẽ.
**Luật:** nhân vật sống qua nhiều năm → khai báo đồ cho TỪNG thời kỳ trong `common.js` của tập (`YOUNG`, `PUTSCH`…) trước khi dựng; biểu cảm + mũ mới thử trên bàn lab ở 3 cỡ, nhìn mặt có đọc đúng cảm xúc không; fx mặt không đặt vào vùng bị mũ che.

## 236. Viết tắt trong lời: máy đọc sai âm, whisper nghe lại mới lộ — viết nguyên cụm (hist/hitler, 2026-10-30)
"RAF" được OmniVoice đọc thành "raft" (lặp tinh thần §80: nghe lại bằng whisper); đổi thành "British air force" là hết. Còn lại khác biệt vô hại (Göring, armies/army) đã phân loại, không đọc lại. **Luật:** kênh sử: viết tắt quân sự / tổ chức trong SCRIPT → viết nguyên cụm hoặc viết theo âm đọc ngay từ bản lời, `script_check` không bắt được.

## 237. Bỏ subagent thì QA vẫn phải là một LƯỢT riêng: cỡ thật, theo bảng mục, ghi lỗi ra file (hist/hitler, 2026-11-02)
Số đo: tự xem bảng ảnh khi dựng đã sửa nhiều lỗi, nhưng 3 agent xem 184 ảnh cỡ thật vẫn báo 141 mục (38 phải sửa; đã loại nhóm "hình sớm" giả, §232). Đắt nhất là SAI SỬ và ĐỒ SAI PHE, không phải lỗi bố cục — các mục này cần đối chiếu nguồn, nhìn bảng ảnh thu nhỏ không thấy. Agent QA đầu chết vì hết hạn mức rồi vì quá dài, mất sạch phát hiện. Người dùng 11-02: "Đừng dùng subagent nữa, làm tuần tự".
**Luật:** khi không dùng agent: sau khi dựng xong chạy lượt QA riêng do chính mình làm, ảnh đúng giờ từ `tools/hist/frames.py` ở CỠ THẬT, từng hồi một, soi theo `channels/hist/EDITING.md` mục "Soát trước render" và ghi lỗi vào `qa/findings.md` ngay khi thấy. Không có mắt độc lập nên phải chấp nhận rủi ro sót còn cao hơn, báo thẳng điều đó với người dùng.

## 238. Đúng sử + đúng mốc mà hình nghèo: đo độ đứng yên, nền trống, tỉ lệ cảnh có ảnh thật ngay trên video (hist/hitler, 2026-11-02)
Người dùng: cảnh trong video "tự vẽ nhiều, background trống, thiếu animation". Đo bản cuối: 20/99 cảnh có ảnh thật, 54% thời lượng gần đứng yên (lệch khung < 0,3 ở 160×90, 2 fps), 44% khung ≥ 70% một màu. Nguyên nhân: mỗi cảnh một ý "đúng từ này vật bật ra" rồi đứng chờ hết câu (TB 7,4 s); nền bỏ qua vì mọi thứ vẽ bằng code; chỉ tìm ảnh, không hề tìm phim PD; luật "ảnh là vật trên nền" hiểu thành nền trơn; chạy khô và QA ảnh 4 s một lần không thấy được chuyển động. Trailer mở đầu (nhiều ảnh thật, cắt nhanh, luôn có thứ chuyển động) được người dùng khen ngay.
**Luật:** kênh sử — tìm phim tư liệu + nhiều ảnh PD từ đầu; cảnh có nền thật hoặc nền có chi tiết; cảnh dài có chuyển động liên tục hoặc chia nhịp; đo độ đứng yên + nền trống trên video đã render và nhìn cả clip, không chỉ ảnh tĩnh. Mở video: người dẫn không đứng chào, lời giữ + hình trailer nhanh.

## 239. Mở video bằng trailer dựng nhanh, không để người dẫn đứng chào (hist/hitler + berlin, 2026-11-02)
Người dùng: 6 s đầu lặp intro kênh "phí thời gian", khán giả có thể đi ngay; muốn lát cắt lịch sử tua ngược / xuôi, chiếu nhanh, có effect, có mascot. Giữ nguyên lời chào, chỉ đổi hình: hitler tua ngược 1945 → 1907 bằng ảnh; berlin TV đời cũ chuyển kênh 1948 → 1987 bằng phim thật, người dẫn ăn bỏng ngô. Người dùng: "intro hay hơn nhiều".
**Luật:** khoảng 7 s đầu: mỗi từ khoá một nhịp hình ("disasters" chữ sập, "tiny" / "stupid" / "mistakes" mỗi từ một gag), cắt 0,3–0,4 s, nhiễu / chớp giữa cắt, tiếng bám từng cắt, logo cuối, người dẫn phản ứng ở góc. Khung dựng lấy từ thế giới của tập, không chép tập trước. Ảnh đoạn nghiêm không đưa vào trailer. Chưa có số giữ chân để chứng minh: đối chiếu retention sau khi đăng.

## 240. Phim tư liệu PD có sẵn nhiều hơn tưởng; chèn theo câu trên cảnh vẽ làm tập sống hẳn (hist/berlin, 2026-11-02)
Trước đó chỉ tìm ảnh, không hề tìm phim. Commons `filetype:video` có ngay bản tin "The Wall" 1962, "Berlin Airlift", phim JFK 1963, Reagan 1987, phim quay từ trên cao 1961. Canvas tất định không dùng được thẻ `<video>` → cắt khung JPG. Không viết lại cảnh: thêm một lớp đè theo thời gian (`scenes/life.js` INSERTS) trong `frame()`, nên 11 đoạn phim xong trong một buổi. Berlin đứng yên 35% → 19%, đổi hình mạnh 301 → 428; người dùng chọn bản này.
Vấp: gọi Commons dồn bị 429 (phải nghỉ); phim gốc có cảnh tối (chỉnh `eq`) và logo (crop); sự kiện gần đây không có phim PD (họp báo DDR 1989); phim khác năm / khác giờ với lời (ban ngày 1962 cho câu "nửa đêm 1961") nên ghi nguồn đúng và tránh gắn nhãn năm giả.
**Luật:** kênh sử tìm phim PD ngay ở bước gói; ưu tiên nguồn chính phủ Mỹ / Anh, NARA. Lớp chèn đè trước, chỉ viết lại cảnh khi thật cần. Quy trình: `tools/hist/film.py`, EDITING "Phim tư liệu". Không cắt từ video YouTube / kênh khác.

## 241. Có số đo thì so được: dựng bản riêng cho người dùng chọn, đo cả kho tìm việc đáng làm (hist/berlin, 2026-11-02)
`tools/hist/motion.py` đứng yên / đổi hình / nền phẳng: wrong-turn 23 / 380 / 25%, berlin v3 19 / 428 / 5%, pearl 45 / 112 / 30%, hitler 54 / 146 / 44%. Người dùng chê tập 54% ngay, còn chọn tập 19%. Người dùng chọn "1 bản riêng để so sánh": copy dự án sang `<tập>-v3`, giữ bản cũ tới khi chốt, chốt xong gộp về tên chính và xoá bản copy.
**Luật:** nâng cấp lớn có rủi ro thì dựng bản song song. Trước khi người dùng xem, chạy `motion.py`; đoạn 15 s > 60% đứng yên phải có lý do (đoạn nghiêm, thẻ kết). Đây là ngưỡng thực nghiệm từ 4 tập, không phải chân lý; số không thay được xem clip.

## 242. Phim chèn theo câu để hở khoảng nghỉ: hình vẽ chớp 0,5 s giữa hai đoạn phim, như lỗi edit (hist/berlin, 2026-11-02)
Người dùng ở 2:05–2:08: hình vẽ "chớp mắt 1 cái là đổi, chớp cái nữa lại về tư liệu… chưa kịp hiểu hình ảnh đã sang chỗ khác". Nguyên nhân do lớp chèn §240: mỗi đoạn phim kết thúc ở cuối câu, đoạn sau bắt đầu ở đầu câu sau, nên trong khoảng nghỉ 0,47–0,59 s cảnh vẽ bên dưới lộ ra. Đo: 8 mẩu vẽ 0,18–0,59 s (có chỗ hai cảnh trong 0,53 s), cộng một mẩu phim 0,6 s dính cắt cảnh gốc. Tất cả nằm trong đoạn có lớp chèn; số "đổi hình" §241 còn tính chúng là điểm cộng.
**Luật:** (1) nhiều nhịp cắt chỉ có giá trị khi mỗi hình đủ lâu để hiểu; ngoài trailer, mỗi hình mới phải có lý do và ≥ ~1 s. (2) Hai đoạn phim cách nhau < 1,5 s thì nối liền; đầu / cuối chèn ăn trọn mẩu cảnh vẽ < 1 s. (3) Tra cắt cảnh của phim nguồn trước khi chọn giây; thiếu độ dài thì chạy chậm nhẹ (`film.py --speed`, ≥ ~0,8), không nhét cú máy khác. (4) Sau render, `motion.py` liệt kê cú máy < 1 s sau trailer; xem từng chỗ.
(5) Vào phim bằng cắt thẳng, không nháy trắng: nối phim mà mỗi chỗ nối có 2–3 khung gần trắng vẫn thành giật. (6) Soát chỗ nối theo từng khung (60 fps), không lấy mẫu 4–8 ảnh / s; `film.py --speed` từng cắt `-t` sau `-i` nên phim chậm bị cụt, đứng hình ~0,5 s — đếm số khung so với cửa sổ. (7) Báo xem đúng MỘT link bản chính, có `?v=` khi thay file cùng URL; bản so sánh chỉ đưa khi người dùng cần và ghi rõ là bản cũ. 11-02: người dùng mở nhầm bản "trước sửa" tôi đưa kèm, thấy lỗi cũ và tốn một lượt phản hồi. Hỏi lại đang xem file nào trước khi kết luận "vẫn lỗi" hay "đã hết".

## 243. Kênh Anh đổi hướng sau logarithm: thumbnail mascot vẽ nét đạt 0,7% CTR, quay lại cậu bé anime và người que tương tác (en/logarithm, 2026-11-02)
Theo người dùng: logarithm với bộ thumbnail v4 (mascot vẽ nét, thế giới của bài, §217) chỉ đạt 0,7% CTR. Quyết định: thumbnail quay lại cách cũ theo bản người dùng nâng cấp đang A/B (cậu bé anime, chữ câu hỏi lớn, một vật toán: `out/_lab/thumbs-user-2026-11/`); video bỏ kiểu mascot diễn, quay lại người que tương tác.
**Chưa chứng minh:** 0,7% là một video, chưa đối chiếu số hiển thị, nguồn traffic hay số trung bình kênh; A/B bộ mới chưa có kết quả. CTR cũng chỉ nói về thumbnail, không nói mascot trong video dở: phần nhân vật cần xem số giữ chân riêng.
**Luật:** ghi đè §217 và CHARACTER-MASCOT cho kênh Anh, chỉ về kiểu thumbnail và nhân vật; luật không lặp (§218) vẫn giữ. Người que vẫn theo §175 và §136. Có số A/B thì ghi vào `channels/THUMB-LOG.md` rồi mới chốt kiểu thắng.

## 244. Công thức video toán mới: lát cắt 5–30 s đầu, mascot chỉ ở thumbnail và góc màn hình, người que vai pi creature (kênh Anh, 2026-11-02)
Người dùng: 5–30 s đầu dùng kỹ thuật lát cắt như video sử để tạo hook, tò mò, hứa hẹn và nói được người xem sẽ có gì; mascot chỉ ở thumbnail và thi thoảng làm người dẫn ở góc màn hình; người que là nhân vật tương tác, tương tự pi của 3Blue1Brown: người tò mò, người thắc mắc, người tương tác với sự kiện.
**Luật:** công thức ở `channels/en/CHANNEL.md`. Mở rộng §175: ngoài làm nguyên nhân, người que được hỏi và phản ứng, với điều kiện câu hỏi / phản ứng mở ra ý tiếp theo; chỉ, gật theo câu vẫn là "cho có". Trailer dựng sau thân bài; lát cắt nhanh vẫn phải có chủ đích (§242). Chưa có số giữ chân kiểm chứng (§239).

## 245. Kênh toán Anh dùng một hệ hình cố định cả kênh, ngoại lệ của "DNA mỗi video một khác" (kênh Anh, 2026-11-02)
Người dùng đặt giả thuyết: đợt video why kém vì background đổi theo từng video, trong khi 3Blue1Brown và các kênh thành công luôn cùng một concept. Bằng chứng còn yếu: dạng cũ cùng phong cách có 15% view từ đề xuất so với 4%, nhưng người xem quay lại 13% so với 17%, và chủ đề, title, series cùng đổi. Cơ chế hợp lý là nhận diện và kỳ vọng của người xem, không phải YouTube đọc background. Người dùng chọn cố định cả kênh vì cược này rẻ.
**Luật:** video toán kênh Anh giữ cùng nền, màu, font, người que, kiểu trình bày; sáng tạo ở hình minh hoạ từng ý. Kênh sử, kênh Nhật, MV vẫn theo §218. Coi là giả thuyết: đo lại view đề xuất và người xem quay lại sau 4 bài.

## 246. Kênh toán Anh bỏ người que, dùng cặp nhân vật số 99 và nền sáng có thẻ (en/trig-explained, 2026-11-02)

Bản đầu trig-explained dùng người que nền tối (đã qua clip duyệt màu); xem cả bài, người dùng thấy tư thế "hơi thô và cứng", đề nghị nhân vật ký hiệu kiểu 3Blue1Brown. Thử λ, φ, 9 cùng diễn: λ đầu hẹp nên ít biểu cảm, số 9 có mặt lớn và gắn tên kênh; người dùng chọn 9 nét mảnh, làm cặp, và chọn nền sáng + thẻ sau khi xem MathVis (1.850 sub, 21.683 view một video; chưa chứng minh nhờ hình). Vẫn không kiểm chứng được bằng số; đo sau đợt bài.
**Luật:** nhân vật khó diễn khớp xương thì đổi sang nhân vật diễn bằng mắt và biến dạng, đừng tiếp tục đắp dáng; so bằng clip cùng kịch bản trước khi thay. Duyệt màu riêng không thay được xem nhân vật trong cả bài (§136). Skill `stickman-animation` tự chạy thành agent nền: gọi khi đang làm tuần tự phải đọc file thay vì gọi skill.

## 247. Đổi nhân vật mà giữ luật "tương tác với nội dung" là sai từ gốc; ký tự kiểu 3b1b chỉ để biểu cảm (en/trig-explained, 2026-11-02)

Thay người que bằng số 9 nhưng vẫn bắt số 9 kéo tam giác, húc cạnh, chạy quanh vành: người dùng chê xấu, và nhắc thoả thuận đã có là mascot làm người dẫn, ký tự chỉ là nơi biểu cảm. Chọn nhầm cả số 9. Nghiên cứu sau đó (`docs/study/16b-3blue1brown.md`): khoảng 20–30% thời lượng có nhân vật, gom ở cảnh chen riêng, diễn bằng mắt, không làm thay hình toán.
**Luật:** khi người dùng nói "học theo X", nghiên cứu X trước khi dựng; đổi phương tiện thì xem lại mọi nguyên tắc đi kèm. Luật "người que là nguyên nhân sự kiện" (§175) không áp cho ký tự biểu cảm. Mã của 3b1b là CC BY-NC-SA: không chép.

## 248. Đoạn chen thu nhỏ cảnh đang chạy: vẽ cảnh vào canvas đệm; đổi kịch bản thì mốc theo số câu phải dời (en/trig-explained, 2026-11-02)

Đoạn λ cần ô chiếu chính hình đang nói. Trang `p2.html` đặt lại transform mỗi khung nên không thu nhỏ trực tiếp được; sửa bằng cách cho mọi cảnh vẽ vào canvas đệm rồi `drawImage` ra khung chính hoặc vào ô (`plates/common.js` `chrome`). Chạy khô tăng từ 25 s lên 118 s cho 28.053 khung; chấp nhận được. Thêm 8 câu vào giữa kịch bản làm lệch toàn bộ số câu của 10 cảnh sau; bắt được nhờ `w()` ném lỗi và in đối chiếu số câu, nhưng `L(i)` thì không ném khi lệch.
Lỗi nhỏ cùng đợt: `(t + seed) % n` với t âm làm nhân vật nhắm mắt suốt khoảng LEAD, lộ đúng ở khung 0.5 s; `align.py` từ chối chạy khi OmniVoice bật (§151) và p2 chạy quá 500 s nên phải để nền; `shoot.js video` trang lab cần `--silent`.
**Luật:** đổi kịch bản sau khi đã có cảnh → in lại bảng số câu rồi mới sửa mốc. Modulo theo t luôn chuẩn hoá về dương. Đoạn phải đóng khung lại hình khác → canvas đệm, không gọi lại render với transform.

## 249. Người dùng nói "học theo X": nghiên cứu X trước, đề xuất dựa trên số đo, bản xấu tự bỏ trước khi gửi (en/trig-explained, 2026-11-02)

Bài này dựng ba lần: người que nền tối → số 9 tương tác → λ biểu cảm. Hai lần đầu tốn render vì dựng theo cách hiểu của mình về pi creature, trong khi người dùng đã nói từ đầu "mascot dẫn, ký tự biểu cảm". Chỉ khi đọc kho mã công khai của 3b1b mới có số: 20–23% cảnh có nhân vật từ 2023 đến nay, `look_at` 446 lần, 46% câu trong bong bóng là câu hỏi, tách ở file `supplements`. Đề xuất số 9 của mình cũng sai về thẩm mỹ dù có lý về thương hiệu: "đúng tên kênh" không bù được "xấu". Bản λ đầu (thân phình) tự soát thấy xấu nên vẽ lại trước khi gửi, và bản sau được duyệt ngay. Soát kịch bản sau khi nghiên cứu cũng tìm ra phần thiếu thật (tên chuẩn, đổi đơn vị, góc đặc biệt).
Khảo sát có giới hạn: mới phân tích mã, thumbnail và 3 ảnh nhỏ mỗi video, chưa đo nhịp dựng thực tế.
Skill có `context: fork` (`stickman-animation`) tự chạy thành agent nền, trái thoả thuận làm tuần tự: đọc SKILL.md thay vì gọi.
**Luật:** "học theo X" → nghiên cứu trước khi dựng, lấy số từ nguồn gốc (mã, dữ liệu), báo rõ giới hạn; nhắc lại thoả thuận cũ trước khi đổi hướng. Đề xuất nhân vật phải kèm hình để so, và nhìn ảnh trước khi gửi: lý do hay không cứu được hình xấu.

## 250. Mở bài bị chê chậm: bỏ mục lục, mỗi câu một hình; tư liệu thật vào mọi chỗ có trích dẫn; mốc theo chữ đầu câu cũng có thể khớp nhầm (en/imaginary, 2026-11-02)
Bản 1 vào thân bài ở 0:44, đứng yên 14 s đầu, 3 thẻ câu hỏi mất 13 s; người dùng: "mở đầu cũng khá chậm". Bản 2 còn 0:30, bỏ thẻ. Người dùng: chỗ trích dẫn đưa tài liệu, ảnh thực tế chứ không chỉ chữ và hình tự vẽ. Lấy mẫu mở bài bằng yt-dlp: video thứ hai đã 429, dừng ngay (§160); chỉ một mẫu, không kết luận chung (`docs/study/17b-openings.md`). Lỗi kỹ thuật: `at('And it')` khớp câu sớm hơn nên bìa Argand không bao giờ hiện, check vẫn 0 lỗi, chỉ ảnh mới lộ. Tắt OmniVoice bằng `kill` tên cha có thể kẹt ở shutdown, giữ VRAM; và mẫu grep khớp cả dòng lệnh của chính shell thì tự diệt: lọc theo cột chương trình.
**Luật:** kênh Anh: vào đề trong ≤ 30 s, không đứng yên quá 3 s đầu, mỗi câu mở bài một hình, không thẻ mục lục dài. Nhắc người, sách, năm, máy móc thật → có tư liệu thật PD/CC0 kèm chú thích, ảnh gốc giữ màu. Tra mốc theo chữ đầu câu phải đủ dài để là duy nhất.

## 251. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 252. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 253. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 254. Gói đăng lại thiếu Problems, mô tả mang chương cũ: lặp lại §214 nên chặn bằng code; phụ đề API cần quyền riêng (en/imaginary, 2026-11-03)
Người dùng: "Bạn thiếu problem của tôi" (lặp lại §214 dù đã có luật). Bản 2 dời mốc 15 s, `chapters.txt` tự cập nhật còn `description.txt` vẫn mang chương bản 1; suýt đăng nếu không tự soát. Đã thêm `tools/lesson/pack_check.py`, build.py tự gọi cuối bước.
Dán 18 câu Problems: lần đầu 844/800 vì mốc giờ cũng tính ký tự. Shorts: hook 22–23 ký tự chạm hoặc tràn mép, `short.py` nay cảnh báo; khung kết `i-to-the-100` lộ cảnh sau (`tail` âm), λ thò vào góc (thu cửa sổ crop).
Phụ đề: quyền `youtube` KHÔNG đủ cho captions API (403 insufficient scopes), cần `youtube.force-ssl`. Thêm vào `SCOPES` mà token nạp theo `SCOPES` thì token cũ lỗi `invalid_scope` khi refresh, làm hỏng cron kênh khác; nên token nạp theo quyền đã cấp, chỉ `captions.py --login` xin thêm. Dịch theo câu rồi chia cue theo tỉ lệ ký tự: cắt từ đầu câu để lại cue cuối 0,17 s; chia đều số cụm thì ngắn nhất 1,37 s. Mới soát qua API (`serving`), chưa xem chạy thật.
Người dùng đổi title khi đăng và bỏ dòng lịch sử + nguồn ảnh; dịch theo bản đọc từ API nên khớp. Ghi nhớ cũ "link đúng là @99fromscratch" đã sai: API + HTTP cho thấy `@99fromscartch` là đúng.
**Luật:** luật "đừng quên" đã lặp thì viết thành bước kiểm trong công cụ. Sau build lại, mô tả chép tay phải chép lại chương. Đổi quyền OAuth dùng chung phải giữ token kênh khác chạy được. Điều nhớ về trạng thái ngoài (handle, title) đọc lại từ API trước khi nói. Soát phụ đề bản thật trên video một lần sau khi công khai.

## 255. Đề xuất giờ đăng long mà chưa đo độ trễ phân phối (kênh Anh, 2026-11-03)
Đề xuất đầu chỉ đọc biểu đồ "When your viewers are on YouTube" (5/10–1/11, ~90% view là Shorts) rồi đặt long trước đỉnh 1 giờ. Người dùng hỏi: "đã tính thời gian phân phối cho video long chưa?" — chưa. Đo lại bằng bộ đếm giờ (`analytics/raw/en/live/`, §143) + nguồn traffic theo ngày: calculus (`4h4kNno6OC8`) gần như đứng 0–11 h (≤ 6 view) rồi nhảy lên 93 lúc 12 h, 398 lúc 21 h, nguồn chính SUBSCRIBER (= Browse features, 249 view ngày đầu) trước khi quảng cáo chạy; zero-div (`H2_mOmoOx6Q`) ≤ 10 view trong 28 h đầu, sóng Browse từ ~29 h, nhanh nhất 39–57 h (~25 view / giờ), Browse 89 → 200 → 129 view ba ngày PT. Chỉ hai video, calculus có quảng cáo, bộ đếm công khai cập nhật theo đợt: số là hướng, không phải hằng số.
**Luật:** với long, giờ đăng chỉ quyết định vài giờ đầu (thông báo, người đăng ký ~1,4% thời gian xem); sóng đề xuất tới sau 12–30 h và kéo 2–3 ngày, nên chọn NGÀY để sóng rơi vào khung khán giả đông (T7–CN), giờ chỉ là phụ. Trước khi đề xuất lịch, đo độ trễ từ dữ liệu của chính kênh; thêm video mới thì đo lại.

## 256. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 257. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 258. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 259. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 260. Render bị nghẽn ở chụp PNG, không phải GPU; ghép phần có tiếng câm làm hình trễ 21 ms (render, 2026-11-03)
Short 3D: chạy khô ~700 khung/s mà render chỉ 4,2 khung/s vì mỗi khung đi qua `Page.captureScreenshot` (PNG, base64 qua CDP) rồi ffmpeg giải PNG. Sửa: `shoot.js --raw` đọc `getImageData` của canvas, POST nhị phân về server của chính `shoot.js` (vẽ khung n+1 trong lúc truyền khung n), ffmpeg nhận `rawvideo`; `--nvenc` mã hoá bằng card; `tools/render/par.py` chạy N phần song song. Đo: cả Short 4.862 khung **19 phút → 43 s**; tập 2D wrong-turn 10 s phim 58 s → 14 s một luồng. Mã hoá lossless: khung `--raw` trùng khung PNG (6/6 ở cả 3D lẫn 2D); `--raw` tự so khung đầu với ảnh chụp thật, khác thì dừng (trang có lớp HTML ngoài canvas).
Ghép: (1) NVENC có B-frame → dts âm, ghép `-c copy` xáo thứ tự khung → tắt B-frame. (2) Phần còn tiếng câm AAC → hình bản ghép bắt đầu ở 0,021 s (mồi AAC 1024 mẫu), tức hình trễ tiếng 21 ms; cách ghép tay cũ trong PIPELINE cũng dính (tập đã đăng lệch ~1 khung, không nghe thấy). (3) concat tự đọc độ dài làm tròn ms → mốc giờ trôi 0,33 ms mỗi mối nối. Sửa: ghép CHỈ hình, ghi `duration` chính xác từng phần, kiểm số khung + giờ bắt đầu = 0. Bẫy đo: so PSNR theo giờ ghép nhầm cặp khung khi mốc lệch nhỏ (PSNR 22 dB dù khung đúng); so theo chỉ số (`setpts=N`) mới thấy đúng, rồi mới tìm ra lệch giờ thật. Bản tham chiếu cắt bằng `-ss` cũng lệch khung.
**Luật:** đo nút cổ chai trước khi mua thêm phần cứng / thêm luồng (chạy khô vs render). Render tập kênh sử bằng `tools/render/par.py … -- --raw` (bản nháp thêm `--nvenc`). Kiểm video ghép bằng số khung + giờ bắt đầu + so từng khung theo GIỜ với bản một luồng.

## 261. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 262. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 263. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 264. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 265. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 266. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 267. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 268. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 269. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 270. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 271. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 272. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 273. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 274. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 275. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 276. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 277. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 278. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 279. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 280. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 281. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 282. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 283. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 284. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 285. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 286. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 287. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 288. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 289. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 290. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 291. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 292. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 293. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 294. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 295. Quên kỹ thuật đã đúc kết là lỗi CƠ CHẾ: sổ năng lực + test + hook (chung, 2026-11-06)
Người dùng (11-06): "lần nào bạn cũng bỏ quên những gì chúng ta đã làm, đã đúc kết rồi cứ dẫn đi 1 trời mới". Đúng: §294 clip.py bỏ qua
motion.py; soát tiếp thì assemble.py (11-05) cũng viết lại một phần của `finish.sh` (hậu kỳ lời + nhạc + SFX + −14 LUFS) — cả hai đều CÓ
trong tài liệu nhưng không được mở đúng lúc viết file mới. Claude không nhớ giữa phiên / sau nén: chỉ biết thứ nằm trong ngữ cảnh lúc đó.
Sửa: (1) `tools/qa/capabilities.json` — mỗi kỹ thuật: tên, thư viện, §, lối vào BẮT BUỘC dùng (chuỗi phải có trong file);
(2) `tools/qa/test_capabilities.py` — lối vào bỏ dùng thư viện / thư viện mất / script Blender không có trong bản đồ README → test đỏ, không commit được;
(3) hook `.claude/settings.json` → `tools/hooks/capability_guard.py`: tạo FILE MỚI trong một vùng → đưa sổ của vùng + file cùng thư mục vào
ngữ cảnh; mở / nén phiên → in tóm tắt sổ. Lần chạy đầu test đã bắt `finish.sh`, `run_set.sh` không có trong bản đồ.
**Luật:** đúc kết một kỹ thuật = thêm dòng vào capabilities.json (kèm lối vào phải dùng), không chỉ viết LESSONS. Viết lối vào mới
cho việc đã có → mở rộng file cũ; nếu buộc phải tách thì thêm file mới vào `used_by`.

## 296. A/B zero-div: bản KHÔNG anime thắng 58,6 % → thumbnail kênh Anh thử ký tự λ, gọn (en/zero-div → en/trig-explained, 2026-11-06)
Test & Compare 10-27 → 11-05, 480 view: A = cậu bé anime + máy tính 1÷0 ERROR (41,4 % thời gian xem); B = lỗ giấy rách đen +
màn terminal `1/0 Infinity`, `0/0 NaN` + người que nhỏ (58,6 %). YouTube ghi "They all performed well" (chưa chắc ý nghĩa
thống kê) và title hai bản KHÁC nhau → không tách được thumbnail hay title thắng. Người dùng đọc: khán giả thích gọn, không mascot
→ thumbnail trig-explained dùng λ (`projects/en/_kit/lambda.js`): 2 bản vẽ bằng code (`thumbnail/thumbs-lambda.html` →
`shoot.js stills`; A tối kiểu terminal học bản thắng, B nền lưới sáng của video) + 1 prompt AI có bảng mẫu λ đính kèm
(`lambda-reference.png` — AI hay mọc tay chân cho chữ). Bản vẽ đầu lỗi 3 chỗ (số tràn màn, chữ tràn thẻ, λ đè thẻ) — chỉ thấy khi
chụp và nhìn ở 168 px.
**Luật:** thumbnail kênh Anh hiện thử hướng λ + một vật toán + chữ ≤ 3 từ, không cậu bé anime; muốn BIẾT yếu tố nào thắng thì
mỗi test đổi một thứ, muốn CHỌN bản tốt nhất thì test combo; ghi rõ kiểu test cạnh kết quả trong `channels/THUMB-LOG.md`.

## 297. Giao thumbnail không kèm title — người dùng nhắc "không tạo title để làm combo hoàn chỉnh à?" (en/trig-explained, 2026-11-06)
Lặp lại hướng §114 §125 (cặp thumbnail ↔ title): được giao "làm thumbs", mình làm 3 ảnh + gợi ý dùng CHUNG một title cũ, không
viết title riêng cho từng bản. Một thumbnail chỉ nói nửa câu chuyện; Test & Compare "Title and thumbnail" cần 3 cặp. Sửa: 3 title
mới, đo bằng code (≤ 100, lời hứa trong 50 ký tự đầu, không chung từ khoá) → `out/en/trig-explained/youtube/thumb-tests/v2-lambda/COMBOS.md`.
**Luật:** "thumbnail" = COMBO thumbnail + title; mỗi bản giao kèm title của nó, qua `python3 tools/thumb/check.py --pair "<chữ trên ảnh>" "<title>"`
(mã 1 nếu trùng từ khoá / quá dài), ghi `COMBOS.md` + cột title trong THUMB-LOG.

## 298. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 299. Ghi đè ảnh cùng tên → trình duyệt hiện bản cũ, người dùng tưởng "chưa update"; ảnh cận đặt đầu trang bị tưởng là thumbnail (hist/pearl, 2026-11-06)
Thumbnail pearl v7 đã ghi đè `thumb3d-*.jpg` nhưng trang xem localhost vẫn hiện v3 (bộ nhớ đệm) — người dùng: "những thumbs này chưa có các phần update
vừa rồi???". Trước đó dải ảnh CẬN soi chi tiết mũ đặt trên cùng trang → "sao tạo có 1 góc thế?". File trên đĩa đúng cả hai lần; lỗi ở cách GIAO.
**Luật:** trang xem đặt sản phẩm TRỌN khung + tên file + title lên đầu, ảnh soi ở "Phụ lục" ghi rõ; mỗi lần ghi đè ảnh đổi `?v=N` trong trang
(`channels/hist/PACKAGING.md` §6). Người dùng báo "chưa đổi" → kiểm file trên đĩa trước, rồi nghĩ tới bộ nhớ đệm.

## 300. Title đúng công thức mà vẫn chán: áp khuôn như điền chữ, không thử "câu hỏi nào bật ra" (hist/pearl, 2026-11-06)
Bộ title chọn theo 3 công thức tò mò — *The 4 Words Said Right Before Pearl Harbor* · *…It Didn't Matter* · *…All Three Were Ignored* — người dùng:
"đọc title không có 1 tý hấp dẫn nào… không có khoảng trống tò mò… học bao nhiêu kiến thức mà đặt title chán quá". Cả ba KỂ LẠI sự kiện bằng động từ
trung tính, hoặc chứa luôn đáp án. Chi tiết móc có sẵn trong lời mà bỏ phí: biết trước 53 phút, phòng thông tin đi ăn sáng, cảnh báo cuối đi xe máy tới sau bom,
Mỹ bắn phát súng đầu tiên. Bộ mới: *The Most Expensive Sentence in American History* · *Radar Saw Pearl Harbor Coming 53 Minutes Early. Then Came Breakfast.* ·
*Pearl Harbor's Final Warning Came by Motorcycle. After the Bombs.* Lúc viết mô tả mới suýt thêm giờ "7:20" không có trong lời đã soát — bỏ.
**Luật:** mỗi title viết kèm CÂU HỎI người xem tự hỏi; không viết được / title chứa đáp án → bỏ. Nguyên liệu = chi tiết ngược đời có thật trong SCRIPT,
≥ 8 phương án rồi chấm (`channels/hist/PACKAGING.md` §2). Dữ kiện trong title / mô tả chỉ lấy từ lời đã soát.

## 301. Công thức title thành luật chung mọi kênh: docs/TITLE.md; áp ngay cho kênh Anh trig (chung, 2026-11-06)
Người dùng: "title đỡ hơn rồi… đúc kết… công thức này luôn thú vị hơn", rồi viết lại 3 title video Anh trig. Công thức nằm rải rác (hist PACKAGING §2,
docs/lesson/PACKAGING §2, CRAFT §11) → gom một chỗ `docs/TITLE.md` (phép thử câu hỏi bật ra, nguyên liệu = chi tiết ngược đời có thật, 6 khuôn,
luật cứng, chấm 5 tiêu chí, sổ ví dụ); các file kia trỏ về. Trig: bộ cũ có cùng lỗi pearl (tên chương / lộ đáp án / nhắc lại ảnh); bộ mới lấy câu
CỦA CHÍNH LỜI ("We just never told it how far to walk") làm câu đố + câu Why người học thật sự thắc mắc (nút DEG/RAD).
**Luật:** title mọi kênh theo `docs/TITLE.md`; mỗi bài thêm một dòng sổ ví dụ §6 (bị chê / chốt / khuôn) và kết quả CTR khi có.

## 302. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 303. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 304. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 305. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 306. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 307. (bản riêng — mục về phần không nằm trong bản chia sẻ)

## 308. (bản riêng — mục về phần không nằm trong bản chia sẻ)

