# Nhân vật kênh lịch sử

Người dẫn + dàn nhân vật dùng cho MỌI tập. Cách dùng trong câu chuyện: `PLAYBOOK.md` §3. Kỹ thuật học từ Thanh Pahm:
`docs/study/15-thanh-pahm-editing.md`.

## 1. Người dẫn — VẼ NÉT bằng code (`projects/hist/_kit/narrator.js`, người dùng duyệt 2026-10-27/28, §198)
Thiết kế v2 (cảm hứng ảnh người dùng gửi, vẽ riêng — không chép tranh người khác): búi tóc đen trên đỉnh, nửa đầu cạo xám có
vạch, mắt lờ đờ đểu, cười toe lộ răng, má hồng, khuyên tai, hoodie đen có túi. Bảng xem: `projects/hist/_lab/narrator.html`
(t 20 = thiết kế + miệng, t 21 = các bộ đồ).
```js
narrator(x, yĐếGiày, h, { outfit, arms, mood, mouth, look, crouch, lean, t, v })   // v: 'B' toàn thân (mặc định) | 'C' bán thân biếm hoạ
cornerHost(X, mouthAt(X))   // nói ở góc phải, nhép theo giọng (S.lipHost trong stage.js)
```
- `outfit`: plain · suit (áo đen + cà vạt — hợp sát thủ / quan chức) · bowler (dân 1914) · soldier · officer · protest · reporter ·
  waiter (nơ, người hầu) · austro (áo xanh Áo) · serb (áo ô liu). Bộ có mũ giấu tóc theo danh sách `HATTED` (§210).
- `arms`: rest · point · wave · flag · cover · shrug · thumb · cup · hatchest · run · pockets; `crouch` 0..1 (núp), `lean`.
- `mouth`: rest · small · mid · wide · grin · grit · o · smile — `mouthAt(t)` đổi ≤ 12 lần / s theo `data/narration.mouth.json`.
- Bản ảnh anime cũ (`assets/hist-host/`) chỉ còn cho thumbnail / avatar.

**Tính cách (dùng khi viết lời — WRITING §3):** người từ 2026 lạc vào lịch sử, biết kết cục nên thấy rõ mọi cái sai mà vẫn
bất lực. Châm biếm khô, không ác; hoảng thật khi nguy hiểm; nghiêm khi có người chết.

**Ba chế độ trên hình** (chi tiết + tần suất: PLAYBOOK §3, EDITING A1 A5 A7):
| chế độ | hình | khi nào |
|---|---|---|
| nói ở góc | bán thân góc phải, cách mép 0.04 W, thấy vai + ngực, nhép miệng | giải thích, bản đồ, chuyển ý |
| cận mặt phản ứng | `S.bigFace` cả khung | ≤ 1.2 s ngay sau cú chốt |
| nhập vai | toàn thân TRONG cảnh, đúng đồ, cùng cỡ người xung quanh, không nhãn, không lời tự xưng | ~1 lần / 1–1.5 phút cạnh sự kiện quan trọng: thay một người trong nhóm kín (1 trong 6 sát thủ), lẫn trong đám đông vẫy cờ, hàng lính, hội nghị |

## 2. Dàn nhân vật lịch sử (đồ nghề trong `projects/hist/_kit/stage.js`)
| loại | cách làm | công cụ |
|---|---|---|
| nhân vật thật quyền lực (FF, Sophie, Potiorek) | **vẽ đầu tròn kiểu B** (§2b) trong mọi cảnh hành động; ảnh bán thân cắt nền chỉ ở cảnh tư liệu riêng (tập mẫu sarajevo còn dùng `S.carPhoto` — kiểu cũ) | `C.folk` · `tools/hist/cutout.py` |
| người thật — giới thiệu | ảnh thật + thẻ tên (+ tuổi) trên nền tối, chỉ để giới thiệu ai là ai | `S.photo`, `S.nameTag` |
| kẻ ám sát / nhóm kín | **vẽ tay**: thân đen, mặt tròn, mắt xếch, mũ quả dưa, tay một nét (`arm` ném / `gun` cầm súng) — §189 | `S.assassin` |
| đám đông | **người đầu tròn** (mũ 1914: quả dưa / fez / lưỡi trai / khăn), vẫy cờ, hoảng — đậu trơn bị chê "như con ma" | `S.person`, `S.crowdRow` (`skip` chừa chỗ cho người dẫn) |
| quốc gia | khối bản đồ tô cờ + mặt biểu cảm; đeo găng đấm nhau | `mapkit.js` `mapFace`, `cutout` · `S.boxer` |
| lớp mặt meme | mồ hôi, gân giận, lệ, khói | `S.sweat`, `S.vein`, `S.tear`, `S.smoke` |
| nhân vật thật VẼ LẠI (biếm hoạ) | đầu to mặt hoạt hình theo ảnh PD, thân đơn giản — khi cần diễn nhiều dáng | xin người dùng tạo (§3) → `tools/hist/sticker.py` |
| meme | ưu tiên meme trên mạng → không thấy thì nhờ người dùng tìm gửi → cuối cùng tự vẽ / cắt ghép (PLAYBOOK §8.5) | ảnh / code |

**Vật, nơi chốn, vụ nổ = ảnh đời thật CC0 / PD** (xe cổ cắt nền, phố, bệnh viện, vụ nổ thật, tranh biếm hoạ thời đó) — không vẽ giả
(§188) — ở cảnh tư liệu / nền nơi chốn. Cảnh có nhân vật vẽ hành động: vật cũng VẼ (§2b, §207). Ba chất liệu trong một TẬP: ảnh thật =
"chuyện có thật", vẽ phẳng = "ai với ai", hoạt hình = "cảm xúc" (study 15 §10) — nhưng một khung chỉ một chất liệu nhân vật.
Đúng sử khi gán vai: không vẽ một NƯỚC ra lệnh cho việc một nhóm làm (Thanh Pahm vẽ "Serbia: Kill him" — sai; ta vẽ hội kín).

## 2b. Kiểu nhân vật lịch sử (chốt với người dùng 2026-10-28, bàn thử `projects/hist/_lab/cast.html`)
- **Chính: B — vẽ đầu tròn + nét nhận dạng** (`_kit/cast.js` `folk` + `feat` râu / tóc + `wear` mũ + `eyes` / `mouth`): cùng nét
  mềm viên thuốc với quần chúng và người dẫn, code đổi biểu cảm. Dàn wrong-turn: ff, sophie, potiorek, princip, cabri, Lojka
  (`driver`), mayor, fj, wilhelm, tsar.
- A — đầu ẢNH thật trên thân viên thuốc (`figure`, `heads/<k>.png` cắt bằng `tools/hist/headcut.py`): giới thiệu / ra quyết định.
- C — đầu ảnh trên người que (`figure … { style: 'stick' }`): gag nhân vật phụ chen ngang.
- Chân dung vẽ màu (người dùng gen): chỉ thumbnail / thẻ mở đầu.
- **Không** dán ảnh thật vào giữa cảnh vẽ (xe ảnh thật trên phố vẽ — người dùng: "trông kì"). Vật trong cảnh vẽ thì VẼ cùng nét
  (`car1914`, `_kit/backdrop.js`); ảnh thật = cảnh "tư liệu" riêng (toàn khung, chú thích ngày giờ).
- Thân vuông / thang (bản đầu 10-28) bị chê "thô, lạc style" — mọi thân dùng chung đường viên thuốc của `folk`.

## 3. Xin hình từ người dùng (thumbnail, biếm hoạ) — quy cách
Một nhân vật / ảnh · nền trắng phẳng · KHÔNG hiệu ứng / ký hiệu quanh người (vẽ dính là không tách được, §184) · toàn thân, chừa
mép · cao ≥ 1000 px · đạo cụ để trơn. Nhận ảnh → `tools/hist/sticker.py` (`--border 12 --tol 24`) → PNG nền trong.

**Biếm hoạ nhân vật lịch sử** (kèm 1 ảnh PD của người đó + 1 ảnh mẫu nét):
> Cartoon caricature of <NAME> based on the attached public-domain photo: recognisable face (keep <đặc điểm>), big head on a
> small simple body, wearing <trang phục đúng thời>, same flat colours and bold black outline as the second reference image.
> ONE character, full body, pure flat white background, NO text, NO effects, NO shadow. Portrait 1024×1536. Pose: <dáng>.

## 4. Đã thử và bỏ
- Người que nét mảnh mũ chóp (2026-10-24) · người que thân dày (§158) · áo khối hình thang (§157).
- Người dẫn ảnh anime dán vào cảnh (2026-10-27 sáng) — không hoà cảnh, thay bằng bản vẽ nét (§198).
- Người dẫn v1 có "cục đen sau đầu" — thiết kế lại v2 (2026-10-28).
- Câu tự xưng "How do I know? I was…" + nhãn "that's me" + người dẫn ở mọi cảnh (bản 6) — bỏ (§200).

## Biểu cảm + mũ mới (2026-10-30, người dùng: "thêm biểu cảm, trang phục, chi tiết")
`narrator(..., { mood, mouth, fx })` thêm: mood `wink` · `joy` (mắt cười ^^) · `star` · `dizzy` · `teary` (khóc dòng) · `side` (liếc);
mouth `tongue` · `wavy` · `pout`; `fx: ['sweat', 'vein', 'blush', 'shine']`. Mũ: `hatOn(x, y, h, kind, { v })` gọi SAU narrator —
`straw` · `pith` · `bicorne` · `crown` · `viking` · `laurel` · `night`. Bảng xem: `projects/hist/_lab/avatar.html` t 10.5
(`channels/hist/brand/looks-sheet.png`). Mỗi tập chọn mũ / biểu cảm hợp tình huống, không lặp (bộ nhớ hist-playful-props).

## Biểu cảm kiểu meme + nhân vật nổi tiếng (2026-10-30, người dùng: "hay đấy, ổn đấy — ghi nhớ kĩ thuật tạo hình")
- **Meme vẽ lại** (`_kit/narrator.js`, bàn thử `_lab/meme-faces.html`): mood `epic | void | sus | derp | sob`, miệng `epic | flat |
  smirk | wail | scream | kiss`, tay `facepalm | cheeks | kiss | think | cross`, fx `boom | qmark | gloom`. Vẽ lại TINH THẦN, không
  chép nét gốc (khuôn / kiểu biểu cảm không có bản quyền, bức hình cụ thể thì có — §231). Ảnh Google / Pinterest ≠ được dùng.
- **Nhân vật nổi tiếng đầu tròn** (`_kit/famous.js`, bàn thử `_lab/famous.html`): `famous(x, yĐế, h, who, { eyes, mouth, arms, look })`,
  who = hitler | napoleon | stalin | churchill | lincoln | einstein | caesar | cleopatra | victoria | antoinette. Công thức: đầu tròn kem
  + mắt chấm + **1–3 nét nhận dạng** (tóc / râu / mũ) + áo có chi tiết (ve, túi, cúc, cầu vai) + **đạo cụ riêng** (tẩu, xì gà + chữ V,
  bảng E=mc², bánh) → nhận ra cả ở 90 px. Thêm người mới: một mục trong `WHO` (back / front / hat / det / arms) + kiểm ở 150 và 90 px.
- Hitler: băng tay đỏ TRƠN mặc định — có chữ thập ngoặc hay không do người dùng quyết theo tập (ngữ cảnh giáo dục); đồ nhận diện kênh
  luôn không có. Truyền thuyết (Marie Antoinette "cake") → nói rõ là chuyện đồn.
- Là VỐN để phối theo tình huống, không phải bộ cố định (CRAFT §0); mỗi tập đổi biểu cảm / tư thế / đồ theo câu chuyện.

## Đồ theo thời kỳ + phe (hist/hitler, 2026-11-02 — LESSONS §234 §235)
- `famous(..., { coat, pants, det })` đổi đồ; khai báo theo thời kỳ trong `common.js` của tập (mẫu `YOUNG`, `PUTSCH`). Thêm người: Göring, Hindenburg, Rommel, Paulus.
- Người dẫn: outfit `officer` (mũ phủ kín đầu, bản 11-02) · `wehr` (mũ sắt Đức). Dân Đức WW2: `folk(..., { coat: 'german', wear: 'stahl' })`. `aide` ở hitler `common.js`: `mirror: true` để tay chỉ sang trái.
- Giọt mồ hôi `fx: ['sweat']` bị vành mũ che → không dùng với `officer`.
