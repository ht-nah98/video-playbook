# Nhạc nền berlin — prompt cho người dùng gen (2026-10-29)

DNA tiếng của tập (khác tập 1 — 1914 dùng bassoon / pizzicato / tuba): **Chiến tranh Lạnh 1961–1989** — synth analog thập niên 80,
đèn đường đêm, máy telex, tiếng tích tắc; ấm dần lên thành hy vọng ở đêm mở cổng. Luật chung (như tập 1): không lời; nhạc NẰM DƯỚI
giọng đọc (không giai điệu chính dày, không piano chạy nốt, dải giữa 300–3000 Hz thưa); nhịp đều, không cao trào đột ngột (cắt /
lặp theo đoạn ở `data/cues.py` → `mix.py`, dưới lời ~16 dB). Gen: bật **Instrumental**, mỗi prompt 2 bản, dài ≥ 2 phút.
Tên file gửi về = cột "file".

| # | file | đoạn (giờ trong tập) | không khí |
|---|---|---|---|
| 1 | `bw-1-coldopen` | 0:00–0:55 mở bài (tờ giấy rơi, họp báo đóng băng) | bí ẩn, tò mò, có chút hài khô |
| 2 | `bw-2-divided` | 0:55–1:50 Berlin chia 4, người bỏ đi; quay lại ở 2:55–3:28 Reagan / Honecker | chủ đề kênh thời Chiến tranh Lạnh: lém lỉnh, hơi gián điệp |
| 3 | `bw-3-wall` | 1:50–2:55 Chủ nhật dây thép gai + người chết ở Tường | lạnh, nặng, nghiêm |
| 4 | `bw-4-leak` | 3:28–6:06 mùa hè 1989 (picnic, Prague, nến Leipzig) + tờ memo | chuyển động, rạn nứt, hồi hộp nhẹ, lạc quan len vào |
| 5 | `bw-5-press` | 6:06–8:03 họp báo + "nobody read the memo" | văn phòng buồn ngủ → bối rối hài hước, tích tắc |
| 6 | `bw-6-gate` | 8:03–9:27 trạm Bornholmer: căng dần → cổng mở → vỡ oà | căng dần rồi bùng nổ vui, ấm |
| 7 | `bw-7-reflect` | 9:27–11:05 cái giá + kết | lắng, suy tư, ấm lại ở câu cuối |

## Prompt (dán vào ô Style, bật Instrumental)
1. `bw-1-coldopen` — `instrumental cold war documentary cold open, mysterious and curious with dry humor, warm analog synth pads, soft ticking clock, gentle muted bass pulse, sparse 1980s spy atmosphere, slow 82 bpm, low dynamics, no piano, no vocals, background music under narration`
2. `bw-2-divided` — `instrumental playful cold war underscore, sly spy-comedy feel, pizzicato strings with soft 1980s analog synth arpeggio, light brushed snare, walking bass, steady 100 bpm, simple repeating motif, sparse arrangement, no busy piano, no vocals, sits under voice-over`
3. `bw-3-wall` — `instrumental cold somber underscore, low sustained strings and dark analog synth drone, distant metallic hits, night in a divided city, heavy and serious, 66 bpm, no melody, no piano, no vocals, background under narration`
4. `bw-4-leak` — `instrumental documentary underscore about a regime cracking, pulsing analog synth sequence, soft kick, rising string pad, tense but hopeful, 1989 Eastern Europe on the move, 104 bpm, minimal mid range, no piano runs, no vocals, background under narration`
5. `bw-5-press` — `instrumental awkward comedic underscore, sleepy office, soft muted trumpet and clarinet, ticking clock, light plucked bass, a bureaucrat shuffling papers on live TV, stop-and-go rhythm, 92 bpm, quiet and restrained, no piano, no vocals, background under narration`
6. `bw-6-gate` — `instrumental slow-building underscore that becomes joyful, starts with tense low strings and heartbeat drum at night, then opens into warm uplifting strings, bright synth and soft drums, crowd celebration feel, 1989 Berlin, 76 to 110 bpm, cinematic but not loud, no vocals, background under narration`
7. `bw-7-reflect` — `instrumental reflective documentary ending, warm strings and soft french horn with a faint 1980s synth pad, gentle and bittersweet, hopeful lift near the end, 66 bpm, very sparse, no piano, no vocals, background under narration`

Sting thẻ kết: giữ bản PD `projects/hist/_kit/music/m-sting-end-card.ogg` (như tập 1) trừ khi người dùng gen bản mới.
