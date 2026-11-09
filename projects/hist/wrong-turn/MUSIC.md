# Nhạc nền wrong-turn — prompt cho người dùng gen (2026-10-29)

Người dùng: "nhạc background đoạn đầu, mấy tiếng piano, nghe khá ồn ào" → bản PD tạm (ragtime piano dày nốt) thay bằng 7 bản gen.
Luật chung mọi bản: không lời; nhạc NẰM DƯỚI giọng đọc (không giai điệu chính dày, không piano chạy nốt, dải giữa 300–3000 Hz
thưa); nhịp đều, không cao trào đột ngột (cắt / lặp theo đoạn ở `data/cues.py` → `mix.py`, dưới lời ~16 dB).
Gen: bật **Instrumental**, mỗi prompt 2 bản, dài ≥ 2 phút (sting: ngắn). Tên file gửi về = cột "file".

| # | file | đoạn (giờ trong tập) | không khí |
|---|---|---|---|
| 1 | `wt-1-coldopen` | 0:00–0:47 mở bài (khung đóng băng, 20 triệu, tua ngược) | bí ẩn tò mò, nhẹ, có chút hài |
| 2 | `wt-2-theme` | 0:47–3:56 thùng thuốc súng + Thái tử bị ghét; quay lại ở 6:17–7:33 | chủ đề kênh: hài khô, lém lỉnh |
| 3 | `wt-3-conspiracy` | 3:56–4:50 sáu sát thủ | rón rén âm mưu |
| 4 | `wt-4-bumbling` | 4:50–6:17 kế hoạch đổ bể, ném bom hụt | vụng về hỗn loạn hài |
| 5 | `wt-5-suspense` | 7:33–8:52 cú rẽ nhầm (trước hai phát súng — đoạn súng im lặng) | căng dần, tích tắc |
| 6 | `wt-6-escalation` | 8:52–12:24 năm tuần + domino các nước | hành khúc leo thang, nghiêm dần |
| 7 | `wt-7-reflect` | 12:24–13:09 cái giá + kết | lắng, suy tư, ấm lại ở câu cuối |
| (8) | sting cuối giữ bản PD `m-sting-end-card.ogg` | 13:09 thẻ kết | — |

## Prompt (dán vào ô Style, bật Instrumental)
1. `wt-1-coldopen` — `instrumental underscore for a history documentary cold open, mysterious and curious with a hint of dry humor, soft pizzicato strings, muted clarinet, light ticking percussion, sparse and airy, slow 80 bpm, low dynamics, no piano, no vocals, background music under narration`
2. `wt-2-theme` — `instrumental comedic documentary underscore, playful and cheeky, light bassoon and pizzicato strings, soft brushed snare, tuba bass, sly early 1900s European feel, steady 100 bpm, simple repeating motif, sparse arrangement, no busy piano, no vocals, sits under voice-over`
3. `wt-3-conspiracy` — `instrumental sneaky conspiracy underscore, tiptoe pizzicato low strings, muted trombone, soft timpani hits, dark but slightly comedic, secret meeting in a smoky cellar, 90 bpm, minimal, no piano, no vocals, background under narration`
4. `wt-4-bumbling` — `instrumental bumbling slapstick underscore, clumsy tuba and bassoon, woodblock and light snare, stop-and-go rhythm, silent-film chase energy but quiet and restrained, 110 bpm, sparse mid range, no piano runs, no vocals, background under narration`
5. `wt-5-suspense` — `instrumental slow-building suspense underscore, low sustained strings, soft ticking clock percussion, distant heartbeat drum, rising tension, cinematic but minimal, 70 bpm, no melody, no piano, no vocals, ends quiet, background under narration`
6. `wt-6-escalation` — `instrumental military escalation underscore, steady snare march, low brass and strings, starts light and grows heavier and more serious, 1914 Europe sliding into war, 96 bpm, restrained dynamics, no piano, no vocals, background under narration`
7. `wt-7-reflect` — `instrumental reflective documentary ending, solemn warm strings and soft french horn, slow and gentle, bittersweet, hopeful lift near the end, 66 bpm, very sparse, no piano, no vocals, background under narration`

## Đã dùng (2026-10-29)
Người dùng gửi 7 bản (`~/Desktop/History music`; "The First Question" = wt-1, "The Great Hoax" = wt-2) → `assets/music/`.
Đo: không lời, dài 42–173 s, cân như nhau; bản ngắn lặp bằng `mix.py` (bỏ đuôi tắt dần, nối chéo 2 s — đo mối lặp không hụt).
Gán đoạn ở `data/cues.py`: mở wt-1 · bàn tiệc châu Âu wt-2 · Thái tử wt-1 từ giây 47 · sát thủ wt-3 · an ninh + bom wt-4 · toà thị
chính wt-2 · cú rẽ wt-5 · năm tuần (bữa trưa Potsdam, séc khống) wt-3 · domino wt-6 · kết wt-7 · sting PD. Nếu nghe lặp ở wt-2 / wt-4:
gen "Extend" dài ≥ 2 phút rồi thay file cùng tên, chạy lại mix.
