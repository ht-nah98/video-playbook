# DICTIONARY — từ điển dáng người que

Code: `engine/stick-dict.js` (`DICT`, `pose(name, over)`). Bảng: `tools/lab/stick-dict.html` → `out/_lab/stick-dict/t_0.10.png`.
Cặp mẫu ↔ ta: `python3 tools/study/stick_dict_pairs.py` → `out/_lab/stick-dict/pairs.png`.
Dáng là ĐIỂM XUẤT PHÁT để sáng tạo (CHARACTER-STICK: "đừng bao giờ cố định fix cứng") — ghi đè góc tại chỗ:
`pose('think', { x: 820, head: 20 })` (góc tính bằng độ).

## 1. Quy ước một dáng

Góc theo `engine/stick.js`: vai / hông đo từ phương thẳng xuống, + = về phía mặt (dir); khuỷu + gập về trước; gối + gập về
sau; `lean` + = cúi; `head` + = gật. L = chi phía sau (dáng nghiêng) / bên trái (chính diện, góc âm).
Đặt thân theo đơn vị h: `hy` hông cao; `fe` khoá hai chân bằng IK tại `x + dir·fl`, `x + dir·fr`; `fb` chân sau vẽ theo góc
(quỳ: gối chạm đất — IK chọn nhầm phía, LESSONS §169); `rot` xoay cả người (nằm); `front` chính diện; `armK` giãn tay; `curl` cong lưng (độ, + gù, − ưỡn; bỏ trống = theo lean).

**Luật đứng (từ cặp mẫu):** Becker không bao giờ đứng hai chân khép, hai tay đối xứng — luôn dồn trọng tâm (fl ≠ −fr) và
dạng chân rộng hơn ta tưởng (đứng mở ±0.13 h, sải bước ±0.2 h, lao −0.37/+0.2 h). Khi một dáng trông "cà kheo", mở chân trước.

## 2. Danh mục (34 dáng, v1 2026-10-26)

| nhóm | dáng | dùng khi | mẫu |
|---|---|---|---|
| đứng | `idle` | đứng chờ — contrapposto | coding@12.5 |
| | `idleOpen` | đứng nghe, thả lỏng | math@68 |
| | `think` | chống cằm | math@88 |
| | `scratch` | gãi đầu, bối rối (armK 1.15) | math@12 |
| | `facepalm` | "ôi trời" | math@24 |
| | `shrug` | nhún vai, chính diện | math@28 |
| | `point` | chỉ về trước | math@128 |
| | `cheer` | mừng / ngạc nhiên lớn, chính diện (armK 1.3) | math@40 |
| | `sad` | rũ | coding@432.5 |
| | `leanCross` | tựa, khoanh tay, chân chéo | math@220 |
| cầm | `hold` | ôm vật trước bụng (tay IK vào vật) | coding@52.5 |
| | `holdUp` | giơ vật lên nhìn | coding@67.5 |
| | `overhead` | vác nặng qua đầu (armK 1.4) | coding@350 |
| | `holdOut` | chìa vật nhỏ | math@320 |
| sàn | `lieBack` | nằm ngửa | coding@5 |
| | `propBack` | ngồi ngả chống tay, vừa tỉnh | coding@7.5 |
| | `hugKnees` | ngồi ôm gối | math@72 |
| | `prone` | nằm sấp, bị văng / trượt | coding@160 |
| | `crawl` | bò | math@112 |
| quỳ | `kneelType` | quỳ một gối làm việc dưới đất | coding@25 |
| | `hunch` | quỳ hai gối gập sát vật | coding@40 |
| | `sitHeels` | ngồi trên gót | coding@447.5 |
| | `sitHeelsSad` | ngồi gót gục đầu | coding@442.5 |
| | `squat` | ngồi xổm — pha giữa đứng ↔ ngồi | coding@37.5 |
| | `pick` | cúi nhặt | coding@22.5 |
| hành động | `stride` | sải bước (khung contact; đi thật dùng `gait`) | coding@20 |
| | `sprint` | chạy nước rút | coding@190 |
| | `push` | đẩy vật nặng | coding@315 |
| | `lunge` | lao / sau cú ném | math@444 |
| | `windup` | lấy đà ném | math@448 |
| | `dodge` | né | math@280 |
| | `recoil` | bị đập vào mặt | coding@34.5 |
| | `fallBack` | văng ngửa trên không | coding@162.5 |
| | `hang` | treo / với cao, chính diện (armK 1.55) | coding@235 |

## 3. Thêm / sửa một dáng

1. Tìm mốc trong mẫu (`out/_lab/stick-ref/<video>/sheet-*.png`, ô ghi giây).
2. Thêm một dòng `E(nhóm, '<video>@<giây>', 'dùng khi…', { góc }, { đặt thân })` vào `DICT`.
3. Chụp bảng + `stick_dict_pairs.py`; soi cặp ở cỡ gốc. Đạt khi đọc cùng một Ý (cảm xúc, lực, trọng tâm) — không cần trùng góc.
4. Ghi vào bảng §2 (và video dùng nó vào §4).

## 4. Đã dùng trong video

| video | dáng |
|---|---|
| lab `becker-redo` (60 s làm lại Coding) | lie, sitUp/sitRub, squat, stand, chin, scratch, lookL, pick, hold/holdUp, jolt, kneel, kneelIn, recoil, daze (bản riêng của lab, tiền thân của từ điển) |
