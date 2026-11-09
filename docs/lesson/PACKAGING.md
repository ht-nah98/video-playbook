# Đóng gói và giữ chân — title, thumbnail, mở đầu, thân, kết

Một file gom mọi điều đã học về **người xem có bấm vào và có ở lại không**. Đọc ở ba lúc: trước khi viết SCRIPT (lời
hứa), trước khi giao plates (hình), và khi làm gói đăng (title + thumbnail). Bằng chứng và lý do nằm ở `docs/study/` (01–04)
(bảng cuối file); file này chỉ giữ cái cần LÀM. Bằng chứng mạnh nhất là dữ liệu kênh ta (05 §3).

**Tinh thần (người dùng 2026-10-14, nhắc lại 2026-10-15):** ta làm **bài giảng khoa học**, không phải giải trí. Video
mẫu là THAM KHẢO — lấy nguyên lý, tối ưu theo cách và cảm nhận của kênh mình. Mở đầu chậm để truyền thông điệp là bình
thường; intro kênh giữ nguyên. Không có cổng số nào ngoài các phép thử thumbnail. **Mỗi video sửa thêm một thứ** — thước
đo thật là biểu đồ giữ chân trong YouTube Studio của chính video ta.

## 0. Một trang — việc gì, ở pha nào

| pha | việc | xem |
|---|---|---|
| **CONTENT** | Cổng ý tưởng: phác được thumbnail **một vật + ≤ 3 từ**? viết được **3 câu hỏi có mâu thuẫn**? **Người lạ có quan tâm** (không cần biết tên chương)? **Trần + ngoại lệ** của chủ đề trên YouTube? **80%** khán giả bài trước có quan tâm? Chưa → đổi góc nhìn bài, đừng cứu bằng hình | §1 |
| **SCRIPT v1** | Viết **4 dòng gói TRƯỚC lời đọc**: thumbnail → title → 5 s đầu (THẤY gì + phụ đề nói gì) → 30 s đầu (hứa gì). Xin duyệt kèm 2–3 hướng title + thumbnail | §1 §4 §5 |
| **SCRIPT** | Câu đầu = lời hứa, có vật của thumbnail trong ~3 s; khớp rồi VƯỢT kỳ vọng (mục lục câu hỏi); cột "người xem THẤY" | §4 §5 |
| **plates** | Khung 0–5 s = vật + màu của thumbnail; hình đẹp nhất hé 2–3 s trong mở đầu; thân bài đổi hình bằng bố cục / camera | §4 §6 |
| **build** | Ảnh 0.5 / 2.5 / 5 s + 2 câu phụ đề đầu đặt cạnh thumbnail + title; `pace.py` soi đoạn đứng yên dài | §4 §6 |
| **đăng** | Thumbnail qua 3 phép thử (`tools/thumb/check.py`), 3 cách viết chữ để A/B; 10 title chấm 5 tiêu chí (không ngừng nghĩ, cực đoan mà đúng, đủ lớn cho độ dài video, lời hứa ≤ 50 ký tự, lý do tin); thumbnail che chữ vẫn gợi câu hỏi; màn hình kết thúc trỏ bài cùng playlist | §2 §3 §7 |
| **đăng (TV)** | Thiết bị TV ≥ 10% → phép thử 50% là cổng cứng; 3 bản thumbnail khác ý tưởng, 30 title | §3a §2 |
| **sau đăng** | Không phán xét vài giờ đầu; 24–48 h: chỉ đổi gói khi view + hiển thị + CTR cùng thấp; nguồn cấp kênh đăng ký; Key moments; lỗi bấm / xem / ý tưởng; ghi "ba điều video này dạy" | §8 §8a |

## 0b. Bản chuẩn cho MỌI video mới (đúc kết 2026-10-19, sau 14 bài hai kênh + 5 video mẫu)

Năm thứ dưới đây là "diện mạo" chung của kênh — DNA hình mỗi bài vẫn riêng. Viết vào SCRIPT (phần `---`) TRƯỚC lời đọc,
duyệt cùng người dùng, rồi mới làm plates.

**1. Cặp thumbnail + title — hai nửa của MỘT móc** (§2a, §3)
- Thumbnail **CHO THẤY**: một hiện tượng / đối lập / con số lạ bằng HÌNH + ≤ 3 cụm chữ. Che chữ vẫn hỏi được.
- Title **NÓI nửa còn lại**: khẳng định trái niềm tin, cực đoan mà đúng + lời hứa (toán / vì sao). Không lặp từ khoá
  của thumbnail (2048: thumbnail 1時間 | 1000時間 → title 「…運ゲーじゃない。…数学で説明できる」).
- Mascot nhỏ (≤ ~25% chiều cao, không ở giữa); đối lập bằng MÀU (lạnh/xỉn ↔ ấm/sáng); cùng thế giới với 0–5 s.
- **Ngoại lệ — mascot vẽ nét có biểu cảm là nửa móc** (thumbnail v3 kênh Anh, LESSONS §216): đo MẶT, không đo thân — đường kính
  mặt ≈ 40% cao khung (đọc được ở 168 px), mặt ở nửa trên, né góc nhãn giờ; khung cắt theo việc (cận đầu / bán thân / hiếm khi
  toàn thân); ~~3 phong cách chung~~ BỎ (§217, người dùng 10-29: "lối mòn") — mỗi bản là một tình huống trong THẾ GIỚI của video (kit bài + mascot dáng động `skin()`), góc máy / dáng / cỡ khác nhau; mẫu `projects/en/logarithm/thumbnail/thumbs-v4.html`. A/B: CHỈ bản A dùng bối cảnh video; B, C khác hẳn thế giới + bố cục (§217).

**2. 0–5 s = thumbnail đang chuyển động** (§4)
- Khung 0.5 s đã là vật + màu của thumbnail (sudoku vòng đỏ, 2048 hai bàn). Câu đầu = lời hứa, có tên vật, KHÔNG câu dẫn.
- Kiểm tự phát không tiếng: chỉ nhìn hình + phụ đề 5 s đầu, người lạ có hiểu video hứa gì không?

**3. 0–30 s — khuôn bốn nhịp** (§5)

| giây | việc | ví dụ ja/2048 (sau sửa) |
|---|---|---|
| 0–5 | lời hứa + vật của thumbnail chạy thật | hai bàn 1時間 / 1000時間 chơi thật |
| 5–15 | leo thang bằng chứng: điều khó tin hiện ra trước mắt | trái thua 4 ván liên tiếp, phải gộp lên 2048 ở góc |
| 15–25 | lật hiểu lầm: "không phải X — là Y" | 指の速さ (gạch) → 並べ方 (朱) |
| 25–30 | hứa thứ lớn hơn (vượt kỳ vọng) | 並べ方の裏に、数学 |

Sau 30 s: bối cảnh ≤ ~20 s (lịch sử / tên người — phần dư dời vào thân), một kết quả gây sốc (Jenga), mục lục 3 câu
hỏi, một câu treo → intro. **Mục tiêu tới intro ≤ ~1:30** (ja/pi mở đầu 2:25 mất 35 điểm giữ chân trước intro — §8);
đây là mục tiêu, không phải cổng.

**4. Nhịp hình** — mọi con số đã đo ở bài thật

| chỗ | luật | nguồn |
|---|---|---|
| mở đầu (đến intro) | mỗi câu = một thứ MỚI để thấy; ≥ 1 vật chuyển động thật (không chỉ chữ hiện) | 04, §4 |
| thân bài, kênh Anh | không khung đứng yên > 3 s; đổi hình = bố cục / camera / vật, không phải thêm chữ | BRIEF-PLATES, §6 |
| thân bài, kênh Nhật | ≤ 3 s có テロップ hoặc vật mới; phần tử chính hiện từ FROM + 0.3 | LESSONS §96 |
| tiếng hiệu ứng | Nhật ~1 / 2.5–4 s mỗi cảnh, khoảng lặng ≤ 4 s; Anh theo trần DNA | LESSONS §99, SFX.md |
| soi sau build | `python3 tools/study/pace.py out/<p>/<p>.mp4` (đoạn đứng yên dài) + `shoot.js cues --out` (khoảng giữa cue > 4 s) | §6 |
| 2–3 phút sau intro | dồn hình đẹp nhất + mạch phụ (vật xuyên suốt quay lại) — người xem đầu bỏ nhiều hơn cuối | 04, §6 |

**5. Đăng + đo** (§7, §8)
- `tools/thumb/check.py` (che chữ, 50% TV, 168/250 px, góc phải dưới) · title A/B (Test & Compare) — hai title khác
  CƠ CHẾ (vd. khẳng định vs con số), không chỉ khác chữ · màn hình kết thúc trỏ bài cùng playlist.
- Sau 1–2 tuần: giữ chân 30 s đầu + CTR + kết quả A/B → một dòng vào bảng "mỗi video sửa một thứ" (§8).

## 1. Lời hứa — quyết TRƯỚC khi viết kịch bản

- MrBeast hỏi theo đúng thứ tự, trước khi làm: **thumbnail là gì? video là gì? 5 giây đầu là gì? 30 giây đầu là gì?**
  (04). Ta làm ngược suốt 10 bài đầu (title/thumbnail chốt sau render). Từ nay 4 dòng này đứng đầu phần sau `---` của
  SCRIPT và được viết trước lời.
- **Không phác được thumbnail = ý chưa đủ hay.** Nhóm MrBeast bỏ ~70% ý vì không ra thumbnail (04); không viết nổi 3 câu
  hỏi có mâu thuẫn cũng vậy (03). Sửa ở CONTENT bằng góc nhìn khác, không phải ở plates.
- Title và thumbnail là HAI móc khác nhau vào cùng một video — không lặp chữ (gate A4). Cặp đã chạy: thumbnail = vật
  của DNA + một câu ngắn; title = câu người xem gõ tìm + câu trả lời lật hiểu lầm.
- Lời hứa trả SỚM ít nhất một phần, và trọn vẹn ở cuối (2048: chữ 「勝てない」 của title tới 13:06 mới được đọc — 01).
- **Ai cũng quan tâm được** (05): ý tưởng đặt TRẦN, cách làm chỉ quyết định kết quả dưới trần đó. Ba câu: người chưa
  từng nghe về ta có quan tâm không? Có cần biết tên chương sách mới thấy lạ không? Có nối với điều ai cũng gặp không?
  Kênh Anh: ba bài thua đều là tên chương ("Perpendicularity in 3D Space", "The Essence of Probability" — 6 view / 7
  ngày). **Trần + ngoại lệ:** tìm chủ đề trên YouTube, sắp theo view, ghi video cao nhất và có video nào ≥ 3× kênh của
  nó không.
- **Cứu đề tài tên chương** (trig, LESSONS §124): đừng vứt bài — tìm trong chính kịch bản câu "không thể / luôn đúng"
  sớm nhất (trig: sin 120° ở Phần 3) và dời lên 0:00; title cực đoan cần ≥ 1 sự thật trong video chứng minh.
- **Định dạng thắng của kênh Anh** (05 §3, đo trên 20 video): **một điều quen thuộc của toán có vẻ KHÔNG THỂ, hoặc LUÔN
  đúng một cách khó tin, rồi hỏi "vì sao?"**: "Why 2^√2 Is Not What You Think" (7.5× trung vị), "Three Centres of a
  Triangle Always Line Up — Why?" (2.9×). Sudoku (ALWAYS EQUAL) đúng khuôn này. Lặp động cơ, không lặp hình.
- **Kênh là một chương trình** (05): DNA mỗi video khác nhau, nhưng **dấu gói đăng** cố định (mascot + một vật + ≤ 3
  từ) để người xem nhận ra. Luật 80%: khán giả bài trước có quan tâm bài sau không.
- Thumbnail cuối do người dùng làm; prompt do agent `thumbnail-artist` (`.claude/agents/`).

## 2. Title — hay tới mức không ngừng nghĩ về nó

> **Từ 2026-11-06: công thức chung mọi kênh ở `docs/TITLE.md`** (phép thử câu hỏi bật ra, 6 khuôn, bộ test 3 khuôn, chấm 5 tiêu chí).
> Mục này giữ luật riêng của bài học toán; mâu thuẫn → theo `docs/TITLE.md`.

Người dùng 2026-10-15: "title phải thật hay, thú vị và không thể ngừng nghĩ về nó — cực đoan, thú vị, thể hiện đúng độ
dài video." Năm tiêu chí (bốn của MrBeast, 04; một của 05), chấm từng title:

| tiêu chí | câu hỏi khi chấm | với kênh ta |
|---|---|---|
| **Không thể ngừng nghĩ** | đọc xong có bứt rứt "mình phải biết" không? Người xem có tự hỏi lại trong đầu sau khi lướt qua? | một khoảng trống có thật: điều trái trực giác, câu hỏi chưa có đáp, con số lạ |
| **Cực đoan** | đã nói ở mức MẠNH NHẤT mà vẫn ĐÚNG chưa? ("I like bananas" → "the best food on the planet") | cực đoan bằng SỰ THẬT, không bằng tính từ rỗng: every / always / never / impossible, con số lớn nhất – nhỏ nhất, "2,000 năm", "7 triệu giờ". Cấm "insane", "mind-blowing", 衝撃 |
| **Đúng độ dài video** | lời hứa có đủ lớn cho 10–20 phút không? | một bí ẩn / một câu hỏi lớn, không phải một mẹo nhỏ ("I stepped on a bug" cho video 20 phút → CTR thấp) |
| **Ngắn** | lời hứa có nằm trong 50 ký tự đầu không? (quá đó dễ bị "…") | cả title nên ≤ ~55 ký tự; kênh Nhật ~25 ký tự. Phần sau "—" / trong ngoặc chỉ là phụ, có thể bị cắt |
| **Lý do tin** (05) | vì sao người lạ tin video này đáng bấm, khi kênh còn ít view? | tín hiệu của ta: **lịch sử / công sức** (30,000 năm, 2,000 năm, 7 triệu giờ), **nguồn** (giải Nobel, bài báo gốc), **bằng chứng** (kết quả thấy được). Đặt ở title HOẶC thumbnail. Không dùng đời tư / thu nhập |

**Số thật của kênh (Studio 03/08–22/10, LESSONS §144) — chấm thêm tiêu chí thứ 6: "người xem NHẬN gì / đang hiểu sai gì?"**

| CTR | title |
|---|---|
| 5.24% | The Derivative Is More Than a Number — Here's What It Really Means |
| 5.17% | The Strange' Orthocentre Geometry Trick Nobody Taught You |
| 4.83% | You Only Need These 2 Formulas to Solve Any Triangle! |
| 3.2% | π Is Not Just 3.14 — You've Been Thinking About It Wrong (gói tốt nhất của quy trình hiện tại) |
| 1.24% | How Humans Invented Math, One Forbidden Idea at a Time |
| 0.81% | The Coin Already Landed. So What Is 50% Describing? |

Thắng = hứa thứ người xem được / sửa điều họ hiểu sai, ngôi "you" (only need, nobody taught you, more than, thinking
wrong). Thua = kể chuyện trừu tượng. Câu chuyện / lịch sử chỉ đứng sau lợi ích cụ thể. Trung vị gói quy trình mới 1.34%
vs video cũ 3.12% → gói là nút thắt, không phải nội dung.

**Cách làm:** viết **10 title** (tốt hơn: **30 title trong 20 phút** — 5′ tự nghĩ · 5′ năm “kênh mẫu” khán giả khác cùng kiểu
giá trị · 5′ outlier cùng đề tài · 5′ AI cho thêm biến thể; study 13) → chấm 5 tiêu chí + tiêu chí 6 → giữ 3 → ghép với thumbnail (không lặp chữ, gate A4) → người dùng
chọn. Thêm hai kiểm của kênh ta:
- **Title = câu phụ đề đầu** của video (§4) — người xem bấm vì title thì 5 s đầu phải nói đúng điều đó.
- **Video trả được lời hứa** — cực đoan nhưng sai là phản bội người xem; mọi con số trong title phải có trong CONTENT.

Ví dụ (sudoku, 2026-10-15): bản cũ "The Hidden Ring Inside Every Sudoku (and Why 17 Clues Is the Minimum)" — 69 ký
tự, nửa sau bị cắt, "Minimum" nhạt. Hướng mới: "Every Sudoku You've Ever Solved Hides a Secret" (46) — "every…ever"
cực đoan và đúng, khớp câu đầu "true of every sudoku you have ever finished", thumbnail ALWAYS EQUAL cho thấy bí mật.

## 2a. Chấm title và thumbnail như MỘT cặp (LESSONS §114)

| câu hỏi | đạt khi |
|---|---|
| Chung từ khoá chính? | KHÔNG — mỗi bên mang một nửa thông tin |
| Ai cho thấy, ai nói? | thumbnail cho thấy (hiện tượng, đối lập), title nói (vì sao / khẳng định / lời hứa) |
| Đọc cả hai, khoảng trống còn không? | còn — biết "cái gì" mà chưa biết "vì sao" |
| Khớp 5 s đầu? | câu phụ đề đầu nói đúng title, khung đầu là vật của thumbnail |
| Công sức / con số có thật? | công sức là của kênh và có trong video; số của nguồn ghi đúng chủ (LESSONS §112) |

## 3. Thumbnail

- Bắt đầu từ **người xem sẽ thắc mắc gì / cảm thấy gì**, rồi mới tới "cho thấy gì". Cơ chế mạnh với kênh ta: **mâu
  thuẫn** (vật ai cũng biết + câu phủ nhận), con số lạ, câu hỏi "なぜ…？".
- **Đẹp ≠ bấm được** (05). Cú bấm do khoảng trống thông tin. **Che chữ đi: hình một mình gợi câu hỏi gì?** Gọi tên
  loại: **kết quả** ("làm sao được thế?"), **biến đổi** (trước → sau), **so sánh** ("cái nào?" — 0⁰: 1 OR 0?), **lạ**
  ("khoan, cái gì?" — 2^√2 = ?, mạnh nhất của kênh Anh), **khoảnh khắc** ("rồi sao?"). Không gọi tên được loại nào thì
  làm lại (fifty-percent "THE NATURE OF PROBABILITY": đồng xu đẹp, không câu hỏi). Dấu "?" không thay được hình biết
  hỏi: 13/20 thumbnail kênh Anh có "?", cả thắng lẫn thua.
- **Mascot NHỎ, nội dung kể chuyện** (người dùng 2026-10-19, sau thumbnail ja/2048 v2): người xem chưa biết nhận diện
  kênh → mascot chỉ là dấu phụ, **≤ ~25% chiều cao khung, không đứng giữa, không che vật chính**; ≥ 70% diện tích cho
  vật + chữ. Thumbnail tương phản (trước → sau, cái nào?) dùng **2 tư thế** mascot (vd. bối rối ↔ khám phá ra) và
  **tương phản MÀU** (lạnh/xỉn ↔ ấm/sáng) — đối lập phải thấy được khi che chữ, không chỉ nằm ở chữ. Mắt khoá nhân dạng
  giữ nguyên; biểu cảm qua đầu, tay, miệng.
- **Một vật chính** mang khái niệm; mascot là dấu nhận diện. **Mỗi phần tử phải tách bạch và có lý do** — không màu lẫn
  vào nhau, không chi tiết thừa (04: cảnh sát áo vàng không ra cảnh sát; hikari bản đầu: mắt + não + lăng kính + cầu
  vồng + sóng — rối).
- **Sáng hơn tối**; lướt qua là hiểu ngay (04).
- **Prompt ảnh:** ràng buộc CỠ mascot đặt ĐẦU prompt và so với vật ("each boy no taller than one board") — model ảnh
  bỏ qua con số % (ja/2048 v3 ghi 22%, ra ~½ khung; LESSONS §113).
- **Cùng thế giới với video** (gate C5): vật và màu người xem gặp sau khi bấm — tốt nhất là vật của 5 giây đầu.
- **Vật chính được GIƠ lên**, không đặt trên bàn — model ảnh kéo vật trên bàn xuống nửa dưới (hikari, chirality).
- **Bốn phép thử trước khi đăng:** che chữ (hình còn hỏi được, 05), 50% TV (che nửa dưới vẫn hiểu), 168 / 250 px, gate
  `~/.claude/skills/thumbnail-prompt/references/gate.md` — một lệnh:
  `python3 tools/thumb/check.py <mới> <cũ> -o out/<p>/youtube/thumb-tests/check.jpg`.
- **Khung prompt mặc định cho thumbnail SO SÁNH:** `projects/ja/gacha/thumbnail/prompt-v1-onaji.md` (cỡ mascot ở câu đầu,
  đính khung 0.5 s của video) — đạt lần đầu (LESSONS §123).
- **3 cách viết chữ** cho mỗi ý → YouTube Test & Compare, đọc kết quả sau ~2 tuần.
- Bí ý: kho mẫu 5 nguồn (video vượt trội của kênh — hiện là 2^√2, 2 formulas, 3 centres, cùng chủ đề, cùng dạng, thumbnail tự lưu, poster / bìa sách) — lấy
  CƠ CHẾ, không chép hình (02).

## 3a. Thumbnail cho TV và cho giao diện mới (study 13, 2026-10-24)

- **Kiểm TV trước:** Studio → Khán giả → Loại thiết bị. TV ≥ 10% thời gian xem → phép thử 50% (che nửa dưới) là cổng cứng:
  giao diện TV chỉ lộ NỬA TRÊN thumbnail ở trang chủ và đề xuất, phải bấm xuống mới thấy đủ. Sửa: vật chính lên trên, hoặc
  chữ ở 1/3 trên. Video dài của ta (10–20 phút, evergreen) đúng loại người ta xem trên TV.
- **Title đang co lại, thumbnail to ra** trên mọi giao diện → thumbnail phải tự gợi câu hỏi / cảm xúc khi che title
  (phép thử che chữ §3 giữ nguyên, nay là bắt buộc).
- **Thiên kiến quen thuộc:** mặt người lạ yếu hơn mặt quen — mascot của ta chưa ai biết, nên giữ nhỏ (§3) và để VẬT kể
  chuyện; thứ ai cũng nhận ra (đồ vật, giao diện quen) là thứ dừng lướt tốt cho kênh nhỏ.
- **Ba bản mỗi video:** phác 10–15 ý (phác xấu cũng được) → làm đẹp 3 → đăng 1, giữ 2 để thay (§8a). Biến thể khác Ý TƯỞNG,
  không chỉ màu — A/B khác biệt nhỏ gần như không đổi gì (YouTube + Paddy Galloway).
- **Thumbnail động** (Made on YouTube 2026, triển khai theo đợt): khi kênh có, tải 3 thumbnail — YouTube tự chọn bản hợp từng
  người xem (người quen thấy mascot, người mới thấy vật). Ba bản ở trên dùng luôn cho việc này.
- Tương phản cả với các thumbnail XUNG QUANH trong ngách (ai cũng tối → thử sáng), không chỉ trong khung.

## 4. Năm giây đầu — thay chỗ thumbnail

- Trang chủ **tự phát không tiếng, có phụ đề**: nhiều người không kịp thấy thumbnail. 5 giây đầu phải vừa khiến người ta
  **bấm**, vừa khiến họ **xem tiếp** (04).
- **Hình:** vật + màu chủ đạo của thumbnail có ngay từ khung đầu (sudoku sau sửa: vòng đỏ + 4 góc xanh từ 0.5 s).
- **Phụ đề:** 1–2 câu đầu nói đúng lời hứa, có tên vật. Câu đầu không mở bằng câu dẫn ("Here's something…", "今日は…")
  — vật của thumbnail được nói trong ~3 s.
- **Kiểm sau build:** ảnh 0.5 / 2.5 / 5 s + 2 câu đầu `out/<p>/youtube/subtitles-*.srt`, đặt cạnh thumbnail + title —
  bốn thứ nói cùng một vật, một lời hứa.

## 5. Mở đầu (đến intro kênh)
> Kênh Anh từ 2026-11-02: 5–30 s đầu là lát cắt, xem `channels/en/CHANNEL.md` (§244).

- **Khớp rồi VƯỢT kỳ vọng:** nói đúng điều đã hứa, rồi cho thêm điều người xem không ngờ (04). Mục lục 2–4 câu hỏi
  đánh số của ta chính là phần "vượt" — giữ.
- **Không thừa chữ, có căng thẳng:** mỗi câu đem tới một thứ mới để THẤY (04: "I tied up an FBI agent… Here's a knife.
  Good luck.").
- **Tò mò có ba cách** (03): mâu thuẫn, nói câu hỏi thành lời, **bắt đầu trả lời rồi cắt ngang** (ta chưa dùng — vd.
  con số bắt đầu hiện thì cắt sang intro).
- **Bối cảnh vừa đủ**, phần còn lại rải vào thân (thủ phạm số 1 làm mở đầu dài — 03).
- **Lý do xem video NÀY** nói thành một câu: nguồn, công sức, độ chính xác (「ノーベル賞の論文から」). Cá tính điềm tĩnh,
  phân tích — giữ.
- **Dồn chất lượng lên đầu:** hình đẹp nhất của bài có bản 2–3 s trong mở đầu (hikari: cầu vồng vào táo chỉ có ở 14:30).
- **Jenga:** người xem thường đã biết đáp án (π = 3.14) — cái họ muốn là VÌ SAO. Hé kết quả 2 s là chứng minh có câu
  chuyện, không phải lộ nội dung.
- **Cột THẤY:** SCRIPT có mục `## Cold open — what the viewer SEES` (sau `---`): mỗi dòng mở đầu → người xem thấy gì.

## 6. Thân bài

- **Đổi hình = bố cục / camera / vật chuyển động.** Gõ thêm chữ trên bố cục cũ không tính. Luật ≤ 3 s đứng yên ở
  `templates/lesson/BRIEF-PLATES.md`; soi sau build bằng `python3 tools/study/pace.py out/<p>/<p>.mp4` — công cụ soi,
  không phải ngưỡng (bài ta 50–60% đứng yên, video mẫu 0.5–14%). Camera đẩy vào đúng ô đang đọc: `lens()` trong
  `projects/en/sudoku/kit.js`.
- **Đầu cố hơn cuối:** người xem càng lâu càng ít bỏ (04) — dồn sức hình vào 2–3 phút đầu sau intro.
- **Chu kỳ năng lượng:** mỗi hồi mở bằng điều mới, giải thích, rồi điều mới — chương 30–90 s của ta đã là chu kỳ ngắn.
- **Mạch phụ / tương phản:** video > 10 phút cần thứ kéo người xem lại giữa chừng (04, 01) — ảnh lịch sử ↔ hình vẽ,
  mascot nói ↔ sơ đồ, một vật xuyên suốt quay lại vài lần, phần thưởng treo tới cuối (câu hỏi số 3 của mục lục).
- Gạch hiểu lầm → sửa, mỗi khung một ý (LESSON-VIDEO § Học từ video mẫu số Pi).

## 7. Kết

Lời đáp lớn → một câu ấm / bất ngờ → biển kênh ≥ 4 s; màn hình kết thúc trỏ bài liên quan (cùng playlist).
**Một video tiếp theo cụ thể (LESSONS §146):** 99.5% lượt xem là người mới, end screen 335 lần hiện → 4 lần bấm. Câu
cuối kịch bản nêu CÂU HỎI của đúng một video tiếp theo cùng chủ đề; end screen trỏ đúng video đó; video vào một playlist
chủ đề. Không dùng "watch more videos" chung chung. まとめ /
Putting it together gọn (≤ ~20 s), 次回 / Next time một câu. Đừng để hai đoạn chậm kéo dài sau đỉnh (01).

**Playlist** (2026-10-19): tên playlist hứa ĐỊNH DẠNG, không hứa một chủ đề — mỗi bài mới vào được. Kênh Nhật đề
xuất 「知ってるつもりの数学」 (π, 2048, 0.999…, 50%: thứ quen → toán phía sau; chờ người dùng chốt) bên cạnh
「なぜ？を解いたノーベル賞」. Mô tả: dòng 1 chuỗi vật quen · dòng 2 khoảng trống ("thấy hằng ngày mà ít ai giải thích
được vì sao") · 3 lời hứa · slogan kênh. Video mạnh nhất (theo giữ chân) đứng đầu.
Kiểm playlist bằng API mỗi lần đăng (LESSONS §181): chỉ video của kênh, không mục đã xoá / bản private bị thay, Shorts
tách playlist riêng (nhóm theo chủ đề), mỗi video dài ≥ 1 playlist chủ đề; mô tả đi đúng thứ tự video. Kênh Anh: `channels/en/PLAYLISTS.md`.

## 8. Sau khi đăng — mỗi video sửa một thứ

- "Làm 100 video, mỗi video sửa một thứ" (04). Ta đã làm qua đúc kết LESSONS sau mỗi bài; còn thiếu vế **số đo thật**.
- **Hằng tuần (từ 2026-10-23):** `tools/yt/sync.py` (cron) + export CSV Studio (DATA.md §6) → Channel Lab
  (`python3 site/serve.py`) → báo cáo `docs/analytics/weekly/` (LESSONS §147). Thay cho việc xin ảnh biểu đồ.
- **48 h sau khi đăng, kiểm:** Short có nguồn "Link trong Shorts" > 0 (Related video đã gắn — §145); video dài có CTR ≥ 60%
  trung vị kênh, không thì chuẩn bị Test & Compare.
- Sau ~1 tuần: xem **biểu đồ giữ chân** (nhất là 30 s đầu) + **CTR** trên trang video của Channel Lab; so điểm rơi với
  `out/<p>/youtube/chapters.txt`; ghi một dòng vào `docs/study/` hoặc memory của bài: lần này sửa gì → kết quả ra sao.
- **Soi kênh mỗi ~5 video:** `python3 tools/study/channel.py @99fromscartch` → view, × trung vị, ngày; ≥ 3× là ngoại lệ —
  bóc động cơ tò mò của nó, lặp lại ở bài sau (05). Video < 7 ngày đánh dấu "mới", chưa đọc.
- Chất lượng hơn số lượng, không chạy theo lịch đăng cứng (04).
- **Test & Compare: mỗi lần chỉ đổi MỘT thứ** (zero-div 10-27 → 11-05: đổi cả title lẫn thumbnail, bản B thắng 58,6% thời gian xem nhưng không biết nhờ cái nào; 480 view, YouTube báo "They all performed well" = chưa chắc). Thử thumbnail thì giữ nguyên title; kết quả ghi `channels/THUMB-LOG.md` cột cuối.
- **Bản dịch title + mô tả** (Studio > Languages, người dùng 2026-10-22): kênh Anh dịch sang 10 ngôn ngữ — es, pt-BR,
  hi, id, de, fr, ar, vi, tr, ko (bỏ ja: kênh Nhật riêng). Nguồn `tools/i18n/<p>.py` (bản dịch viết tay, giữ mốc chương,
  thêm câu "video tiếng Anh, bật CC tự dịch") → `out/<p>/youtube/languages/NN-<mã>.txt`; `gen.py` đo title ≤ 100 ký tự,
  mô tả ≤ 5000 **byte** (tiếng Hindi/Ả Rập ~3 byte/chữ → rút gạch đầu dòng), cấm `<` `>`, hashtag không có dấu nháy.
  Title dịch theo title ĐANG CHẠY trên YouTube (đọc qua API), không theo `title.txt` nếu người dùng đã đổi.
- **Phụ đề 10 ngôn ngữ** (người dùng 2026-11-03): tự dịch theo câu vào `tools/i18n/subs/<kênh>-<bài>/<mã>.txt` (mỗi dòng một câu, đúng thứ tự p1 + p2),
  `tools/i18n/captions.py <p> --dry-run` rồi gửi thật; ~400 đơn vị quota mỗi ngôn ngữ. Có phụ đề thật thì câu đầu mô tả báo "bật CC", không nói "tự động dịch". Thứ tự sau khi người dùng báo đăng:
  `videos.json` → `mv out/<p> out/<p>_public` → title/mô tả (`tools/i18n/<p>.py`, `push.py`) → phụ đề (LESSONS §254).

## 8a. Đọc số sau khi đăng — theo lời YouTube và Paddy Galloway (study 13, 2026-10-24)

| khi nào | nhìn gì | kết luận |
|---|---|---|
| vài giờ đầu | không phán xét | bài evergreen của ta có thể lấy phần lớn view sau ≥ 1 tháng; người xem dài hay để tối xem trên TV |
| 24–48 h | CTR + lượt hiển thị (+ view) so với video khác của kênh | CẢ BA thấp → thay thumbnail / title dự phòng (§3a). Hiển thị CAO mà CTR thấp = đang ra ngoài khán giả quen → **đừng đổi** |
| sau “cửa sổ bứt lên” | dải xám *Typical* trong Analytics của video, chỗ đổi độ dốc | trước điểm đó không đổi gì lớn |
| 2–7 ngày | **Nguồn cấp kênh đăng ký** (Nguồn lưu lượng → Tính năng duyệt) | lát cắt gần như không qua thuật toán: CTR / thời gian xem ở đây kém video khác → lỗi ở nội dung / gói, không phải “không được đẩy”. CTR ≤ 10% ở đây là bình thường |
| ≥ 100 view, video ≥ 60 s | **Key moments**: Intro (% còn ở 0:30), Top moments, Spike, Dip, phẳng / dốc dần; so 10 video cùng độ dài; tách người mới / quay lại | Intro thấp → gói không khớp mở đầu (§4–5). Top moment ở cuối → bài sau đưa lên sớm. Dip → xem đúng giây đó. Người mới rơi nhanh hơn → bối cảnh tối thiểu |
| flop | lỗi **BẤM** (CTR + hiển thị) / lỗi **XEM** (AVD, giữ chân) / lỗi **Ý TƯỞNG** (cả hai ổn mà vẫn ít) | bấm → gói; xem → đường giữ chân; ý tưởng → thêm một luật vào cổng CONTENT (§1) |

Quy trình Paddy cho mỗi video: lượt xem → đường giữ chân → chỉ số khác (CTR, AVD trong bối cảnh) → **ba điều video này dạy**
— ghi vào nhật ký dưới. Khi YouTube mở A/B video cho video dài (hiện ở Shorts): thử hai mở đầu của cùng bài — phép đo trực
tiếp cho §144.

**Mỗi video sửa một thứ — nhật ký** (điền khi có số):

| video | lần này sửa | kết quả (giữ chân 30 s / CTR / A/B) |
|---|---|---|
| sudoku (en) | vòng đỏ + 4 góc xanh từ khung 0.5 s; title "Every Sudoku You've Ever Solved Hides a Secret" | chờ |
| fifty-percent (en) | đổi gói sau 6 view / 7 ngày: title "The Coin Already Landed…", thumbnail 50% OF WHAT? | **CTR 0.81% / 617 lần hiện, 7 lượt xem thật** (Studio 22/10) — đổi gói chưa cứu; làm lại theo tiêu chí 6 + Test & Compare |
| math-30k (en) | gói lịch sử "How Humans Invented Math, One Forbidden Idea at a Time" | **CTR 1.24% / 2,991 lần hiện**; Short Florence 1299 thắng (1,467) → lấy móc đó cho gói mới |
| pi (en) | "π Is Not Just 3.14 — You've Been Thinking About It Wrong" | **CTR 3.2% / 3,809**, 161 lượt xem thật, giữ chân 63% ở 0:30; end screen 0/48 |
| ja/gacha | bài đầu tiên làm gói TRƯỚC lời (§0b): 0–5 s = thumbnail 「同じ？」 đang chuyển động; title A (luật) / B (tâm lý); thumbnail đạt lần đầu (LESSONS §116, §123) | chờ |
| trig (en) | đề tài tên chương → kéo câu "sin 120° khi không tam giác nào có 120°" (Phần 3) lên 0:00; gói trước lời; thumbnail HOW? (đổi từ NO TRIANGLE? vì trùng title); title A khẳng định / B bí mật (LESSONS §124–§125) | chờ |
| ja/2048 | mở đầu 1時間 / 1000時間 chơi thật, lịch sử 3 câu → 1, thumbnail v3 (mascot nhỏ ×2, chéo lạnh/ấm), title A/B | chờ |

**Dữ liệu thật đã có** (đọc từ ảnh biểu đồ, ±2%; đường đi theo bậc ~3% → ít người xem, đọc xu hướng):

| video | 0:30 | trước intro kênh | sau intro | thân bài | cuối | ghi chú |
|---|---|---|---|---|---|---|
| ja/pi (18:15), 2026-10-15 | 62% (YouTube: "typical") | 34% ở 2:34 (mở đầu dài 2:25) | **27%** ở 2:56 — intro 20.7 s (2:28–2:49) mất ~7 điểm | **phẳng 27% từ 3:00 tới 8:45** | 20% | mất nhiều nhất trong mở đầu 0:30–2:56 (62 → 27); đỉnh xem lại 9:07–9:29 (24 → 30%) = "π là thước đo nửa vòng quay"; sau đó 30 → 20% ở 9:51 rồi phẳng tới hết, まとめ/次回 không rơi |

## 9. Nguồn

| # | video mẫu | lấy gì |
|---|---|---|
| 01 | "How MrBeast Solved YouTube Retention" | khung 5 s / 20 s / thân / kết; đổi hình; kết ở đỉnh |
| 02 | "…make your thumbnails 81% better" | thắc mắc / cảm thấy trước; kho mẫu 5 nguồn; A/B 3 chữ |
| 03 | "how to make an EVEN MORE killer youtube intro" | lời hứa trước; 5 s không tiếng; tò mò 3 cách; USP; Jenga; dồn chất lượng |
| 04 | "I Watched Every MrBeast Interview" | tự phát + phụ đề; thứ tự thumbnail → video → 5 s → 30 s; bỏ ý không ra thumbnail; title 50 ký tự; khớp rồi vượt; sửa một thứ mỗi video |
| 05 | "Stuck in "The YouTube Dip"?" + số view thật 20 video kênh Anh | ai cũng quan tâm (trần + ngoại lệ); kênh = chương trình (80%); định dạng thắng của ta; lý do tin; che chữ + 5 loại thumbnail |
| 13 | đợt seminar: 8 video Aprilynne (2023–2026), Creator Insider (Todd Beaupré — thuật toán; Paddy Galloway + Amjad Hanif — A/B), YouTube Help, Quan Ngo | TV + 3 bản thumbnail (§3a); 30 title; đọc số sau đăng (§8a); thuật toán (§10) |

## 10. Thuật toán — điều YouTube tự nói (study 13)

- **Kéo, không đẩy:** khi một người mở app / bật TV, hệ thống xếp hạng video cho RIÊNG người đó (lịch sử, giờ, thiết bị).
  Không có “điểm chung” của video, không có chỉ số thần; trọng số khác theo người và thiết bị. Đích: giá trị lâu dài cho
  người xem — đo bằng cả “valued watchtime” (khảo sát 1–5 sao, chỉ 4–5 sao tính).
- **Không thử với người đăng ký trước rồi “chết”:** giờ đầu đã có người mới; hệ thống học riêng từng nhóm.
- **Xét từng video:** đổi chủ đề không bị phạt; kênh nên khớp một nhóm khán giả như một thương hiệu (lý do ta có ba kênh).
- Đừng tắt thông báo cho người đăng ký; tắt bình luận không bị phạt; lưu lượng từ nhúng / quảng cáo ít ảnh hưởng trang chủ.
- Video dài lên vì người xem trên TV muốn xem lâu, ít phải chọn — không phải YouTube “ưu tiên”.
- Ra mắt kênh mới bằng 4–5 video nối nhau bằng màn hình kết thúc (kênh lịch sử, `channels/hist/CHANNEL.md`).

Video mẫu mới: `docs/study/README.md` (6 bước; người dùng có thể chỉ cần lời — `prep.sh` cắt ảnh là tuỳ chọn).


## Avatar + banner kênh (LESSONS §212 §230 §275)
- **Avatar:** một thứ to (gương mặt ngố cận / chữ cái) trên MỘT nền phẳng. Không mũ + đạo cụ + tia sáng + viền cùng lúc.
  Đưa 2–3 bản, xem ở 98 / 40 px trên nền #FFFFFF và #0F0F0F, để người dùng chọn.
- **Banner:** 2560×1440. Mặt người + tên nằm trong dải 1546×423. Xuất kèm ảnh cắt dải điện thoại + máy tính. Chữ đặt theo `measureText`.
