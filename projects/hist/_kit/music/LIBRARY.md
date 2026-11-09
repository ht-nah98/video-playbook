# Thư viện nhạc nền kênh lịch sử Blunderstory — TRA Ở ĐÂY TRƯỚC khi xin người dùng gen nhạc mới

Người dùng (2026-10-29): "update các nhạc nền cho kênh… sau này nếu video dùng được các nhạc nền đã có thì đỡ phải gen lại".
Quy trình tập mới: đọc bảng → chọn bản hợp không khí từng đoạn (gán trong `data/cues.py` bằng `_music`, có `from` để vào giữa bài
và tránh nghe lặp với tập trước) → CHỈ đoạn nào không có bản hợp mới viết prompt (`MUSIC.md` của tập) → bản mới thêm vào đây.
Tất cả không lời, nằm dưới giọng đọc; `tools/hist/mix.py` cân RMS + lặp nối chéo 2 s nên độ dài / mức gốc không quan trọng.
Nguồn gốc file người dùng gen: `~/Desktop/History music` (giữ bản gốc ở đó). Nhạc PD (thu âm cũ): `CREDITS.md`.

## Bản người dùng gen (Suno, của kênh)
| file | dài | đo (bpm · độ sáng · dải động) | không khí — hợp đoạn nào | đã dùng |
|---|---|---|---|---|
| `gen/bw-1-coldopen.mp3` | 104 s | ~80 (đo 161 = gấp đôi) · tối 0.6 kHz · 14 dB | bí ẩn tò mò, synth pad 80s + tích tắc, hài khô — mở bài, câu hỏi lớn | berlin mở |
| `gen/bw-2-divided.mp3` | 112 s | 99 · 0.8 kHz · 13 dB | lém lỉnh kiểu gián điệp, pizzicato + arpeggio synth — bối cảnh, giải thích bản đồ, "chủ đề" Chiến tranh Lạnh | berlin chia 4 + Reagan · pearl dầu mỏ (từ 30 s) |
| `gen/bw-3-wall.mp3` | 197 s | chậm (đo 129 không tin) · tối 0.6 kHz · 11 dB | lạnh nặng, drone + dây trầm — đêm, chia cắt, đàn áp, mất mát | berlin dây thép gai · pearl trận tấn công (từ 60 s) |
| `gen/bw-4-leak.mp3` | 133 s | 103 · 1.2 kHz · 10 dB | chuyển động, rạn nứt, lạc quan len vào — phong trào, biểu tình, chuỗi sự kiện dồn | berlin mùa hè 1989 |
| `gen/bw-5-press.mp3` | 87 s | 92 · tối 0.6 kHz · 16 dB | văn phòng buồn ngủ → bối rối hài, kèn tắt tiếng + tích tắc — quan chức, họp hành, giấy tờ, ngớ ngẩn hành chính | berlin họp báo · pearl Tyler / Fort Shafter |
| `gen/bw-6-gate.mp3` | 167 s | 76→112 · sáng 1.6 kHz · 9 dB | căng dần rồi bùng nổ vui ấm — cao trào có hậu, đám đông vỡ oà | berlin Bornholmer |
| `gen/bw-7-reflect.mp3` | 178 s | chậm (đo 136 không tin) · 0.7 kHz · 6 dB | lắng, suy tư, ấm lại cuối — cái giá, kết tập, hậu quả | berlin kết · pearl kết (từ 30 s) |
| `../../wrong-turn/assets/music/wt-1-coldopen.m4a` | 94 s | — | bí ẩn tò mò, pizzicato + clarinet, hơi hài — mở bài (đầu thế kỷ 20) | wrong-turn mở + Thái tử (từ 47 s) · pearl mở (từ 20 s) |
| `../../wrong-turn/assets/music/wt-2-theme.m4a` | 49 s | — | chủ đề kênh hài khô, bassoon + tuba, chất châu Âu 1900 | wrong-turn bàn tiệc, toà thị chính |
| `../../wrong-turn/assets/music/wt-3-conspiracy.m4a` | 67 s | — | rón rén âm mưu, trombone tắt tiếng — mật đàm, hội kín | wrong-turn sát thủ, bữa trưa Potsdam · pearl tàu sân bay rời vịnh |
| `../../wrong-turn/assets/music/wt-4-bumbling.m4a` | 42 s | — | vụng về hỗn loạn hài kiểu phim câm — kế hoạch đổ bể | wrong-turn ném bom hụt · pearl "Japan hits snooze" |
| `../../wrong-turn/assets/music/wt-5-suspense.m4a` | 113 s | — | căng dần, tích tắc, nhịp tim — trước cú sự kiện lớn | wrong-turn cú rẽ · pearl tàu Ward + bức điện (từ 40 s) |
| `../../wrong-turn/assets/music/wt-6-escalation.m4a` | 98 s | — | hành khúc leo thang, nặng dần — chiến tranh lan rộng | wrong-turn domino · pearl tuyên chiến |
| `../../wrong-turn/assets/music/wt-7-reflect.m4a` | 173 s | — | lắng, kèn horn ấm — kết | wrong-turn kết |
Bản `wt-*` nằm trong thư mục tập wrong-turn (tập đã xong — không dời file). Nhóm theo không khí: **mở / tò mò** bw-1, wt-1 ·
**hài / giải thích** bw-2, wt-2, bw-5 · **âm mưu / căng** wt-3, wt-5 · **hỗn loạn hài** wt-4 · **nặng / đàn áp** bw-3 · **chuyển động / phong trào** bw-4 ·
**leo thang chiến tranh** wt-6 · **cao trào có hậu** bw-6 · **kết lắng** bw-7, wt-7. Chất thời đại: bw = synth 80s (thế kỷ 20 muộn),
wt = gỗ / đồng kiểu 1900 (thế kỷ 19–đầu 20) — đề tài khác thời vẫn dùng được nếu không khí hợp, nhưng ưu tiên chất gần thời đại.

## Nhạc PD thu âm cũ (CREDITS.md)
`m-opening-slippery-place.ogg` ragtime ấm · `m-opening-alt-trombone-johnsen.ogg` cakewalk tếu · `m-march-fall-in-line.ogg` hành khúc
1914 · `m-sombre-chopin-funeral.ogg` piano tang lễ · `m-sting-end-card.ogg` 4 s "ta-da" thẻ kết (dùng ở mọi tập).

## Lịch sử dùng
hitler (2026-11-02): 24 đoạn chỉ từ thư viện, không gen mới — nhiều nhất `wt-6-escalation` ×4, `bw-3-wall` ×4, `wt-2-theme` ×3, `wt-4-bumbling` ×3 (`hitler/data/cues.py`); tập sau đổi `from`.
