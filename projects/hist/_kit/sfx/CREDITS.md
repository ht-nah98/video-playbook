# Thư viện tiếng hiệu ứng kênh lịch sử (dùng chung mọi tập — `tools/hist/mix.py` tìm ở `projects/<tập>/assets/sfx/` trước, rồi ở đây)

# Tiếng hiệu ứng — One Wrong Turn (chọn 2026-10-27, người dùng giao toàn quyền)
Mạng trước, tự tạo sau (PIPELINE §Tiếng). Mọi file mạng CC0 / public domain — không cần ghi tên.
| file | nguồn | giấy phép |
|---|---|---|
| gun | OpenGameArt "Gunshot sounds" (CZ) | CC0 |
| boom | Wikimedia Commons "Explosion 10" | PD |
| honk | Wikimedia Commons "Car Horn" | CC0 |
| engine | OpenGameArt "Car engine start 01" | CC0 |
| boing | OpenGameArt "Boing" | CC0 |
| cricket | OpenGameArt "Cricket sounds" | CC0 |
| fuse | OpenGameArt "Simple fuse sound" | CC0 |
| ding | OpenGameArt "100 CC0 SFX" | CC0 |
| bonk | OpenGameArt "37 hits/punches" | CC0 |
| cheer | Wikimedia Commons "Applause i" (vỗ tay — chưa có bản reo CC0) | PD |
| whoosh, snap, pop, impact | thư viện chung `assets/sfx/` | CC0 |
Bỏ `dun` (2026-10-27): người dùng "lạc quẻ, không map với video" ở 2:20 và 3:05 — đừng dùng lại tiếng sting tự tạo.

## Bổ sung 2026-10-27 (đợt "tiếng theo hình", SFX-PLAN.md) — tất cả CC0 / PD, đã kiểm giấy phép từng mục
Xử lý chung: cắt lặng (< −40 dB so với đỉnh), lọc thấp 30 Hz, mono 48 kHz, đỉnh −6 dBFS, fade đuôi 80 ms.
| file | tên gốc | tác giả | giấy phép | nguồn |
|---|---|---|---|---|
| boom-deep | Explosion-LS100155.ogg | Fg2 | Public domain | https://commons.wikimedia.org/wiki/File:Explosion-LS100155.ogg |
| thud | Dull thud.ogg | gregoryweir | Public domain | https://commons.wikimedia.org/wiki/File:Dull_thud.ogg |
| whoosh-long | Air whoosh (whoosh2_0.wav, cắt 1 nhịp 0.78–1.83 s) | pyranostudios | CC0 | https://opengameart.org/content/air-whoosh |
| whoosh-short | Swishes Sound Pack — swish-4 | artisticdude | CC0 | https://opengameart.org/content/swishes-sound-pack |
| shutter | Holga shuttersound.ogg (lọc 200 Hz–5 kHz cho bớt chói) | Doitashimashite (nl.wikipedia) | Public domain | https://commons.wikimedia.org/wiki/File:Holga_shuttersound.ogg |
| typewriter | Typewriter sounds — typewriter1.wav | Cassie-OrbitGames | CC0 | https://opengameart.org/content/typewriter-sounds |
| morse | F morse code.ogg | JoeDeRose | Public domain | https://commons.wikimedia.org/wiki/File:F_morse_code.ogg |
| hurray | Hurray.ogg | starlite | Public domain | https://commons.wikimedia.org/wiki/File:Hurray.ogg |
| crowd-murmur | Festival concert people crowd.ogg (đoạn 10–16 s) | stephan | Public domain | https://commons.wikimedia.org/wiki/File:Festival_concert_people_crowd.ogg |
| slam-paper | Kenney "RPG Audio" — bookPlace1 | Kenney | CC0 | https://kenney.nl/assets/rpg-audio |
| stamp | Kenney "Impact Sounds" — impactPunch_heavy_000 | Kenney | CC0 | https://kenney.nl/assets/impact-sounds |
Chưa tìm được bản CC0 / PD: kim đĩa rít (record scratch), còi trượt, xe chết máy, máy điện báo (sounder) — ba bản tự tạo đã BỎ
(người dùng chê tiếng tự tạo, LESSONS §195; tìm lại khi cần); `morse` là tiếng bíp Morse, không phải tiếng gõ máy điện báo. Không đè file cũ nào.

## Bổ sung 2026-10-28 (đợt nhạc nền + không khí; xem music/CREDITS.md) — CC0 / PD, đã kiểm giấy phép từng mục
Mono 48 kHz WAV, vòng lặp (loop) có crossfade đẳng công suất.
| file | nguồn | tác giả | giấy phép | URL | xử lý |
|---|---|---|---|---|---|
| amb-crowd-murmur-loop (30 s, −24 LUFS) | "Festival concert people crowd.ogg" (đoạn 16–56 s) | stephan | Public domain | https://commons.wikimedia.org/wiki/File:Festival_concert_people_crowd.ogg | HP 90 Hz, LP 4.5 kHz, crossfade 3 s. CẢNH BÁO: thu năm 2007, tiếng người không rõ lời nhưng chưa xác minh không có tạp âm hiện đại (nhạc/điện thoại) — cần nghe thử |
| amb-wind-drone-loop (30 s, −28 LUFS) | "20090610 0 ambience.ogg" (rừng, đoạn 20–70 s) | nille | Public domain | https://commons.wikimedia.org/wiki/File:20090610_0_ambience.ogg | LP 650 Hz bậc 6 (loại tiếng chim), HP 40 Hz, crossfade 4 s |
| tex-crackle-78rpm-loop (20 s, −31 LUFS) | TỰ TẠO (numpy, hạt giống 1914): xì xì + lách tách Poisson + thump vòng quay 78 rpm, dựng tuần hoàn nên nối liền | của mình | CC0 | — | không tìm được bản CC0/PD thật (Commons không có kết quả, Openverse hết thời gian chờ) |
| whoosh-soft (0.47 s) | whoosh-long.wav (pyranostudios, CC0) cắt 0.25–0.72 s | pyranostudios | CC0 | https://opengameart.org/content/air-whoosh | LP 2.2 kHz x2, fade vào 0.12 s |
| typewriter-soft (0.63 s) | typewriter.wav (Cassie-OrbitGames, CC0) | Cassie-OrbitGames | CC0 | https://opengameart.org/content/typewriter-sounds | LP 6 kHz + 3.6 kHz |
| fuse-soft (0.54 s) | fuse.wav (OpenGameArt "Simple fuse sound", CC0) | — | CC0 | https://opengameart.org/ (xem hàng fuse ở trên) | LP 3.5 kHz x2, +10.5 dB về đỉnh −6 |

## Bổ sung 2026-10-28 (đợt tiếng cho One Wrong Turn) — tất cả Public domain (Wikimedia Commons, extmetadata LicenseShortName đã kiểm từng mục)
Xử lý chung: cắt đoạn, bỏ lặng đầu (< −45 dB), mono 48 kHz, đỉnh −3 dBFS, fade đuôi 60 ms.
| file | tên gốc | tác giả | giấy phép | nguồn |
|---|---|---|---|---|
| splash | Bathtub water splashes.ogg (một tiếng bắn nước, 3.3–4.7 s) | gradha | Public domain | https://commons.wikimedia.org/wiki/File:Bathtub_water_splashes.ogg |
| clock-tick | Clock ticking.ogg (0–3.3 s, 4 tích) | natalie | Public domain | https://commons.wikimedia.org/wiki/File:Clock_ticking.ogg |
| paper-crumple | Food wrapper crumpling.ogg (0–2.8 s; giấy bọc, nghe gần giấy vò) | stilgar | Public domain | https://commons.wikimedia.org/wiki/File:Food_wrapper_crumpling.ogg |
| page-flip | Book paper pages assorted.ogg (một lần lật, 13.5–14.6 s) | stephan | Public domain | https://commons.wikimedia.org/wiki/File:Book_paper_pages_assorted.ogg |
| pen-sign | Writing with inkpen.ogg (5–8.3 s) | stephan | Public domain | https://commons.wikimedia.org/wiki/File:Writing_with_inkpen.ogg |
| pour | Pouring wine.ogg (4.4–8 s, rót vào ly) | cori | Public domain | https://commons.wikimedia.org/wiki/File:Pouring_wine.ogg |
| glass-clink | Wine glass.ogg (1.2–3.1 s, khuếch đại +20 dB — nền ồn, chưa nghe thử) | hugh | Public domain | https://commons.wikimedia.org/wiki/File:Wine_glass.ogg |
| cash-register | Cash register.ogg (nguyên bản 2.2 s) | "Me" (người tải lên Commons) | Public domain | https://commons.wikimedia.org/wiki/File:Cash_register.ogg |
Chưa tìm được bản CC0 / PD: brake-screech (OpenGameArt chỉ có CC-BY 3.0), rewind (Commons "VHS SFX.flac" CC0 nhưng 72 s toàn nhiễu nền, không xác minh được nội dung), record-scratch (OGA "scratch speed" CC-BY), crowd-gasp, dominoes, telegraph (`morse` chỉ là bíp). punch: dùng `bonk` (OGA "37 hits/punches") / `impact` / `stamp` đã có.

## Bổ sung 2026-10-30 (tập pearl)
| file | tên gốc | tác giả | giấy phép | nguồn |
|---|---|---|---|---|
| alarm-ring | Mechanical Clock Ring (Directory.Audio).mp3 (cắt 2.2 s đầu sau lặng) | Yoo-toob-FX / directory.audio | CC0 | https://commons.wikimedia.org/wiki/File:Mechanical_Clock_Ring_(Directory.Audio).mp3 |
