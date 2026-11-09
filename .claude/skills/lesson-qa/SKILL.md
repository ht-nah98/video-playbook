---
name: lesson-qa
description: Soát hình một video bài học trước render — chạy khô, quét đạo diễn mỗi 10 s, reviewer độc lập lệch mốc, giao lỗi về đúng file. Dùng sau khi các nhóm cảnh báo xong, sau mỗi vòng sửa, hoặc khi người dùng hỏi "video có lỗi hình không".
---

# Soát hình bài học (LESSONS §122, §130, §102; CRAFT §4)

"Nhóm báo đã kiểm" ≠ đã nhìn. Ba lượt, theo thứ tự; chỉ render khi lượt cuối nói RENDER.

## 1. Máy kiểm
```bash
python3 tools/qa/lookups.py <p>                                   # w(i,'từ') của từ lặp
node engine/render/shoot.js check --page projects/<p>/p1.html    # chạy khô mọi khung; mã 1 = lỗi JS / must()
node engine/render/shoot.js check --page projects/<p>/p2.html
node engine/render/shoot.js cues --page projects/<p>/p2.html --out out/<p>/qa/p2-cues.json   # trần tiếng (§99, §110)
node engine/render/shoot.js readcheck --page projects/<p>/p2.html   # chữ trên hình giữ đủ lâu để đọc (≥ ký tự/15 + 1.5 s) — CẢNH BÁO: xem từng dòng, sửa câu dài hiện quá ngắn (study 11)
```

## 2. Quét đạo diễn (luồng chính tự làm)
- `--t` là giờ TRANG = giờ timeline + LEAD (đọc `build.json`) (§102). Chụp mỗi 10 s cả hai trang:
  `node engine/render/shoot.js stills --page projects/<p>/p2.html --t 3,13,23,… --outdir out/<p>/qa/sweep`
- Ghép tờ: `python3 tools/qa/sheet.py out/<p>/qa/sweep out/<p>/qa/sweep.jpg`, rồi mở ảnh GỐC (Read .png) ở mọi khung nghi.
- Tìm: chữ chạm mép / ngoài vùng x 96–1824, y 64–1016; chữ đè chữ / đè mascot; khung gần trống; nhãn < 28 px; "ln"→"In";
  màu nghĩa dùng sai (đỏ trên câu đúng); số trên thẻ khác câu đang đọc (`data/lines.txt`).
- Chữ tí hon → chụp ±0.5 s trước khi kết luận (pop-in dở dang, §130).
- Ghi lỗi theo mốc → file plate → sửa (tuần tự: tự sửa; nhiều agent — chỉ khi người dùng đồng ý: gửi lại đúng agent đã viết, §110).

## 3. Quét lệch mốc (reviewer độc lập — tuần tự: đạo diễn tự làm; nhiều agent: agent opus chỉ đọc)
- Brief: quét LỆCH mốc (2, 12, 22…), đối chiếu MỌI thẻ số với câu đang đọc (không chỉ CONTENT, §132), xếp BLOCKER / MAJOR /
  MINOR kèm file:dòng + cách sửa, verdict RENDER / FIX.
- Nhiều agent: sửa song song chỉ khi chia được theo FILE (§134); agent giữ kit chạy check cả hai trang sau khi sửa.
- Sau sửa: một lượt quét lệch mốc nữa (luồng chính) → check sạch → commit → build.

## 4. Sau build
- `python3 tools/study/pace.py out/<p>/<p>.mp4` (đoạn đứng yên dài); khung 0.5 s = thumbnail; mối nối p1→p2 bằng pixel.
