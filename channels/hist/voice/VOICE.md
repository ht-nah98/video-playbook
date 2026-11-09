# Giọng người dẫn kênh lịch sử

## Đang dùng — "adam" `f9997cc2` (`hist-american-adam`), speed **1.1** (người dùng chọn 2026-10-27)
Ghi ở `channels/hist/channel.json` `voice` — `narrate.py` tự lấy theo kênh.
Clone 2026-10-27 từ "Vocal 2 - US - adam.mp3" người dùng gửi (giọng nam Mỹ trẻ, nhanh, có năng lượng) — người dùng chê giọng
cũ "chán quá".

| | |
|---|---|
| tham chiếu | `reference-adam.wav` — 2.99–16.91 s của tệp gốc, 13.9 s, 24 kHz mono; hai đầu cắt ở chỗ lặng −64 dB; 2 câu trọn |
| ref_text | The first thing that's definitely going to show you a difference is finding where your voice sits. So for a lot of people they don't really know how they should be using their voice and what strain-free singing feels like. |
| vì sao đoạn này | mở bằng "The" — tránh đoạn mở bằng "So" (giọng clone hay lặp chữ đầu tham chiếu vào đầu câu, hkt OMNIVOICE_HANDOFF §4a) |
| nhịp đo | nguồn ~164 từ/phút. Kịch bản Sarajevo 144 từ: ×1.0 = 60.7 s, ×1.2 = 51.9 s (nghỉ dòng ~11.7 s đã gồm) |
| lỗi đã gặp | ×1.2 **nuốt chữ "Ferdinand"** (whisper bắt) — nguồn đã nhanh, đừng tăng tốc như giọng cũ; ×1.0 có 1 câu "turn" nhoè → đọc lại riêng câu đó (`--redo`) |

Dựng lại profile nếu mất: bật OmniVoice rồi
`hkt-project/scripts/clone_voice.sh channels/hist/voice/reference-adam.wav "<ref_text>" hist-american-adam` → sửa `voice.id`.

## Giọng cũ (thôi dùng 2026-10-27) — `d589c5a8` (`hist-american-b`), speed 1.2
Profile OmniVoice **`d589c5a8`** (`hist-american-b`), ghi ở `channels/hist/channel.json` `voice.id` — `narrate.py` tự lấy theo kênh.
Clone 2026-10-24 từ tệp người dùng gửi "Vocal American (3m00-4m00).mp3" (giọng nam Mỹ kể chuyện, không nhạc nền).

| | |
|---|---|
| tham chiếu | `reference.wav` — 37.10–48.10 s của tệp gốc, 11.0 s, 24 kHz mono, cắt trong hai khoảng lặng, trọn câu |
| ref_text (nguyên văn) | So I had to go north to go back home, but I didn't know which direction was north. And by this time, my phone already died. It was dead. |
| đo nguồn | f0 112 Hz, biên độ cao độ 10.6 st, nền ồn −55…−63 dB, 164 wpm |
| đo clone (6 câu ww1) | f0 111–117 Hz (khớp nguồn), 7–12 st, 115–161 wpm (trung bình ~133), **0/6 câu rò chữ đầu** |

**Vì sao đoạn này (so với đoạn 26.20–37.08 "My school was in the Bronx…"):** đoạn kia clone xong rò "And/and" vào đầu **4/6 câu**
(luật clone: giọng nối tiếp tham chiếu — `hkt-project/docs/OMNIVOICE_HANDOFF.md` §4a) và kéo nhịp liệt kê tên riêng chậm; đã
xoá profile đó (`32f0602a`). Đoạn B là lời kể liền mạch, có cảm xúc ("It was dead.") — hợp kể chuyện.

**Tốc độ (người dùng chọn 2026-10-24): `speed` 1.2** trong `channel.json` — OmniVoice tự đọc nhanh hơn (tham số `speed` của
API), KHÔNG kéo file sau khi đọc (`tempo` giữ 1.0). Clone thường chỉ ~3.5 âm tiết/s (145 từ/phút); speed 1.2 → 4.1 âm/s,
171 từ/phút. Thanh Pahm đo được 5.2 âm/s tiếng Việt (âm tiết Việt ngắn hơn, không đuổi bằng số). Đã so 4 bản: speed 1.0 / 1.2 /
1.3, atempo 1.2 — người dùng chọn speed 1.2. Mẫu nghe đã duyệt: `sample-speed-1.2.wav` (6 câu ww1, nghỉ 0.35 s).
Không clone lại từ bản gốc đã tăng tốc: tạp âm kéo giãn bị học vào chất giọng (hkt `OMNIVOICE_HANDOFF.md` §3, `friend-fast108`).

Dựng lại profile nếu mất: `hkt-project/scripts/clone_voice.sh channels/hist/voice/reference.wav "<ref_text>" hist-american-b`
rồi sửa `voice.id`.
