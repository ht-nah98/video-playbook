# MOTION — nối dáng thành chuyển động mềm

Code: `stage(t, { h, ground, keys, walks, dirAt })` (`engine/stick-dict.js`) — khoá dáng + lượt đi + hướng + overlap +
"giữ mà vẫn sống". Mẫu đầy đủ một cảnh 60 s: `tools/lab/becker-redo-scene.js` (đối chiếu `out/_lab/becker-redo/compare.mp4`).
Nền lý thuyết: `docs/study/08`, `10`, `STICKMAN-ANIMATION-SYSTEM.md`.

## 1. Nhịp Becker đo được (Animation vs. Coding 0:03–1:03, khung 24 fps)

| nhịp | thời lượng | cách làm của ta |
|---|---|---|
| tỉnh: nằm → bật ngồi | **0.2 s** (bật, không ease vào) | khoá `fast`, quá đà 1 khoá rồi về |
| ngồi → đứng | ~0.33 s qua ngồi xổm | `squat` 0.2 s → đứng `fast` → `stand` 0.2 s |
| nhìn quanh / gãi đầu | mỗi dáng giữ 0.4–0.8 s | giữ bằng hai khoá cùng dáng, đổi `head` nhẹ giữa chúng |
| cúi nhặt vật | ~0.6 s (với 0.25 → nhấc 0.4) | `pick` → `holdUp` (`fast`) → `hold` |
| giật mình (lỗi) | **1 khung** + vật đổi màu | khoá `snap` (hai khoá cùng giờ ± 0.08 s), mắt `wide` |
| bỏ đi / quay lại | bước ~0.3 s, quay lưng khi đang đứng | `gait` dir −1, nối bằng `leadOf` nếu hai lượt liền |
| bị đập vào mặt | bật **1 khung**, loạng choạng ~1 s | `recoil` `snap` + camera rung 0.4 s + vật văng theo cung |
| quỳ xuống | ~0.3 s | `stand` → `kneel` (chân sau `fb`) |
| giữ lâu khi gõ | đầu gật, tay gõ lệch nhịp | tay phải rung tất định `sin(37t)`, đầu đổi 4–6° mỗi 1–2 s |

Quy tắc nhịp: **vào nhanh, ra chậm** (snap/fast vào dáng, ease ra); **giữ đọc được** (≥ 0.4 s mỗi dáng có ý); hành động
bất ngờ không có khung đệm.

## 2. Overlap / follow-through (độ mềm)

`stage()` lấy thân (hông, lean, chân) ở t, **nửa trên thân ở t − 0.05 s** (`curl += lean(t − 0.05) − lean(t)`, kẹp ±30° — lưng uốn
theo quán tính rồi đuổi kịp), **đầu ở t − 0.05 s, tay ở t − 0.09 s** (`DRAG`). Thân dẫn, đầu theo, tay theo
sau nữa — đây là phần "mềm" Becker có mà nội suy đồng thời không có. Tắt cho một khoá đặc biệt: `drag: { head: 0, arms: 0 }`.
Thêm cho khăn: `wind` (hero) tăng khi chuyển động mạnh.

## 3. Giữ mà vẫn sống (moving hold)

Đầu trôi ±1.2°, hai vai ±1.5° lệch pha (`breathe`). **Không nhún hông** (LESSONS §158 — "nhún nhún trông ngốc").

## 4. Chân khoá đất

- Dáng đứng / quỳ / xổm có `fe` → hai bàn chân IK xuống mặt đất tại `fl`, `fr` (không trượt khi thân nghiêng).
- Quỳ: chân sau `fb` vẽ theo góc (đùi thẳng đứng, cẳng nằm sau) — IK hai đoạn chọn sai phía, gối vểnh lên (§169).
- Nối `gait` ↔ khoá: chân lúc dừng ở `x1 ∓ 0.035 h` = dáng đứng mặc định (`fl −0.035, fr 0.035`) → không giật.

## 5. Cầm vật

Vật có máy trạng thái riêng theo t (đất → đang nhấc → trên tay → rơi / văng → đất). Trên tay: vị trí vật suy từ HÔNG (không
từ tay — tránh vòng phụ thuộc), tay IK vào hai điểm nắm của vật, trộn với tay FK bằng hệ số `k` khi với tới / buông
(mẫu `laptop()` + phần `hands` trong `becker-redo-scene.js`). Đích ngoài tầm → `reach()` kéo về mép tầm (§148).

## 6. Camera

Khoá `{x, y, z}` theo nhịp truyện (zoom vào khi gõ / suy nghĩ, lùi ra khi đi). Rung khi va chạm: sin tất định, tắt dần
0.4 s. Becker đẩy camera nhiều hơn ta — chỗ còn tối ưu.

**Gác tầm với (LESSONS §176):** điểm nắm tính từ khớp FK (`grip(t, A, J)` — cổ, đầu), không từ hông; đang nắm mà điểm nắm
cách cổ > 1.12 × tầm → `throw` (mẫu `projects/en/logarithm/actor.js`) → `shoot.js check` trượt. Tay ngắn (SOFT_ARM) → chọn
hành động ôm / hất / đội đầu / leo; vác vật qua đầu chỉ khi dáng có `armK` giãn đủ.

## 7. Trước khi đưa người dùng xem

`shoot.js check` (mọi khung không lỗi, gồm gác tầm với) → bảng ảnh các mốc → **soi cỡ gốc** những dáng sàn / quỳ (nơi IK hay hỏng) → nếu làm
lại mẫu: ghép cạnh mẫu cùng giờ, xem khung cùng mốc (lệch 2.5 s ở bản đầu chỉ lộ ra khi đặt cạnh nhau — §171) → clip.

Clip duyệt một đoạn trong bài dài (giờ TRANG, tiếng lệch LEAD): `shoot.js video --page <p2.html> --from 146 --to 160 --silent
--out x.mp4` rồi `ffmpeg -i x.mp4 -ss <146 − LEAD> -t 14 -i audio/p2.wav -map 0:v -map 1:a -c:v copy -c:a aac out.mp4` + trang
`index.html` có `<video>` → báo URL đầy đủ `http://localhost:8791/out/…/index.html` (§174).

