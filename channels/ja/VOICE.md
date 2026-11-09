# 99の発見 — giọng Jaikyu và OmniVoice với tiếng Nhật (nghiên cứu 2026-10-10)

Người dùng chốt: **giữ giọng Jaikyu** (`49f48276`, không clone lại). Mọi số đo trên máy này ngày 2026-10-10. Nguồn: mã
OmniVoice-Studio (`~/OmniVoice-Studio`, chỉ đọc), phiên hkt-project tạo giọng, `hkt-project/docs/OMNIVOICE_HANDOFF.md`,
phép thử của phiên mascot-mv. Luật VIẾT lời đọc rút từ đây: `WRITING.md`.

## Giọng Jaikyu

| | |
|---|---|
| profile | `49f48276` "Jaikyu Voice", `language: ja`, kind clone |
| tham chiếu | `~/.omnivoice/voices/49f48276.wav`, 13.05 s, 24 kHz, một câu trọn ("でもそうだよね。…下がっていっちゃうじゃん。") — podcast nói chuyện THÂN MẬT |
| đo tham chiếu | f0 trung vị 126 Hz, biên độ cao độ 13.9 st, nền ồn p5 −62.5 dB (astats −52) |
| đo bản tổng hợp (12 câu hkt) | nền ồn −62…−68 dB (đủ dưới room tone −64 của narrate); hai lần cùng câu chênh 1–3% thời lượng; ~6.6 mora/s (hkt đo) |
| tiếng Anh | đọc đúng chữ nhưng giọng Nhật rất nặng (whisper tự nhận "ja" p = 0.78–0.86) → chỉ dùng cho tiếng Nhật |

Chú ý: f0 trung vị giữa CÁC CÂU khác nhau nhiều (99 Hz ↔ 144 Hz, ~6 nửa cung), hai lần cùng câu thì khớp — cao độ
do chữ quyết định. Tai người dùng phải nghe một đoạn liền nhiều câu, không chỉ câu lẻ.

**Chưa đo được, tai người bản xứ mới quyết:** (1) trọng âm cao độ (pitch accent) — đúng chữ mà sai trọng âm vẫn nghe
lạ; (2) phong cách — tham chiếu thân mật (ね, さ, じゃん), clone chép cả phong cách; lời giảng です/ます có thể nghe như
nói chuyện phiếm. Sửa: clone lại từ một đoạn người đó nói trang trọng (luật cắt: handoff §4 — biên trên khoảng lặng
đo bằng `silencedetect`, câu trọn, 5–15 s, ref_text nguyên văn).

## OmniVoice với tiếng Nhật (đọc mã, file:dòng ở `~/OmniVoice-Studio`)

- **Phải gửi `"language": "ja"` mỗi request.** `/v1/audio/speech` chỉ chuyển `language` khi request có
  (`backend/api/routers/openai_compat.py:343`), KHÔNG đọc ngôn ngữ của profile. Với model, `language` chỉ là token
  phong cách, không đổi xử lý chữ.
- **Không chuẩn hoá chữ cho ja:** ja bị loại khỏi num2words có chủ ý (`text_normalization.py`, `_NUM2WORDS_LANGS`:
  "their engines read digits natively"); không G2P (không pyopenjtalk/MeCab), ký tự thô vào tokenizer. Ký hiệu
  ×÷=²√ và chữ Latin đi thẳng vào model. Từ điển phát âm `[[…]]` không áp cho `/v1`.
- **`seed` không có tác dụng trên `/v1`** với engine omnivoice (`tts_backend.py` không đọc seed) → mỗi take khác nhau,
  không tái lập được; cache theo chữ là cách giữ take tốt.
- **`instruct` không phải văn bản tự do:** chỉ từ vựng cố định (giới tính, tuổi, cao độ, thì thầm, accent…);
  "polite teaching tone" → lỗi 500.
- Chia đoạn chỉ khi ước > 30 s; điểm cắt `。！？` và dấu ASCII — **`、` không phải điểm cắt**. Câu của mình ngắn, không chạm.
- **`/v1/audio/transcriptions` bỏ qua `language`** và `verbose_json` **bỏ mảng `words`**; nối segment bằng dấu cách
  (chèn cách vào tiếng Nhật). Không dùng route này để kiểm/căn — chạy faster-whisper riêng với `language="ja"`.
- Tài liệu OmniVoice không nói gì về chất lượng tiếng Nhật; hkt-project docs/engine-acceptance.md (file nay không còn) gợi ý cosyvoice/indextts2 cho
  "Chinese/Japanese expressiveness" (chưa cài; VRAM 12 GB đã bị OmniVoice chiếm ~11.7 GB).

