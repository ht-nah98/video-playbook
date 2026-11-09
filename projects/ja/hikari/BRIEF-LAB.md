# Bàn thử DNA「節穴の暗室」— ja/hikari (khung phong cách + tờ thử kit)

Hướng A đã được người dùng chọn (R3 §2) → không so ba hướng như chirality; bàn thử là `projects/ja/hikari/kit-test.html`, chạy
THẲNG trên `kit.js` (khung phong cách = khung thật, không có bản lab riêng phải chép sang kit sau).

## Chụp

```bash
cd <repo>
T=$(python3 -c "print(','.join(f'{i+0.5}' for i in range(25)))")
node engine/render/shoot.js stills --page projects/ja/hikari/kit-test.html --dur 25 --t $T --outdir out/_lab/hikari/lab
```
(Trang không có LEAD — `--t` là giờ trang = giờ khung; zsh: dùng python tạo danh sách, `seq` theo locale ra dấu phẩy.)

| giây | khung | nội dung |
|---|---|---|
| 0 | **SF1** mở bài | 節穴 trên tường trái → luồng sáng có bụi tới táo trên 卓袱台; bó sóng nhiều bước sóng trong luồng; 「毎秒 何十兆個もの / 光の粒」; `SUN_S` → 8分19秒; mascot `ponder` |
| 1 | **SF2** hồi 4 | thước log 10⁻¹² → 10³ m, dải không thấy xám gạch chéo, khe 可視光 sáng có khung; dải 380–780 nở ra phía trên; `pow10` |
| 2 | **SF3** hồi 5 | giọt mưa, tia Descartes đỏ 656 / tím 404.7 tính bằng vector Snell (`dropRay`), cung 42.4° / 40.6° (`must`); ảnh `rainbow-double` |
| 3 | dải thử | dải liên tục 380–780 + vạch H (656.1 / 486.0 / 433.9 / 410.1), Na (589.0 / 589.6), Ne + 9 chip có hex |
| 4–7 | A, k = .25/.5/.75/1 | `ladder` + `ladderDrop`, `photon` + eV, `wave`, `eye`, táo trắng / táo natri |
| 8–11 | B | `promiseCards` (sáng / lật), `photo` (mono + light), `wrong`+`strike`, ✓ ✗ mũi tên |
| 12–15 | C | `actCard` ở START −1.65 / −1.0 / −0.3 / +0.7 |
| 16–19 / 20–23 | D / E | chuyển cảnh cùng ERA (雨戸 khép–mở) / khác ERA (vòng sáng từ lỗ) |
| 24 | | ERA `day` + 雨戸 mở một nửa |

Ảnh đặt tên lại: `out/_lab/hikari/sf/sf1-coldopen.png`, `sf2-ruler.png`, `sf3-raindrop.png`, `sf4-spectrum-test.png`; tờ 1/4:
`out/_lab/hikari/sf-quarter.jpg`; tờ kit: `out/_lab/hikari/lab-kit-sheet.jpg`.

## Kiểm (đã làm 2026-10-14, NHÌN ở gốc và ở 1/4)

- Sắc phổ: 700/656 đỏ (#FF0000, không hồng — bản đầu ra #FF0031 vì pha trắng → sửa: chỉ pha trắng khi phần âm lớn), 589 vàng cam
  (#FF8000), 546 lục, 486 lam lục (#00CDFF), 450 lam (#4F00FF), 434/405/380 tím. Na hai vạch 0.6 nm thấy như MỘT vạch (đúng).
  Ne: nhóm đỏ cam dày + lục 540. H: hai tím, một lam lục, một đỏ.
- Chữ ≥ 28 px, trong vùng an toàn (kit ném lỗi — đã bắt kicker SF3 ra ngoài y 64 ở lượt đầu); không chữ nào mang màu phổ.
- 1/4: SF1 đọc được chùm + táo + chữ lớn; SF2 đọc được khe sáng giữa thước xám; SF3 đọc được giọt + hai tia + nhãn góc.

## Còn mở

- Trong giọt, tia đỏ và tím gần trùng (hình học thật: lệch < 2°) → ở 1/4 thành một vệt hồng tím; quạt chỉ tách ra NGOÀI giọt.
  Cảnh f3 có thể vẽ thêm bản phóng góc có nhãn 「角度は強調」 nếu cần cho dễ thấy.
- Dải liên tục / băng (không phải chip một vạch) có bao sáng `eyeFade` nhân SAU gamma: 0.25 ở 380 và 780, đủ sáng 440–650
  (sửa 2026-10-14 sau nhận xét "đỏ nặng, đầu 380 sáng như tím giữa"); đã nhìn lại sf2/sf4 ở gốc và 1/4.
- Tiếng `amado`, `zap` đã thêm (OpenGameArt CC0) nhưng chưa có người nghe duyệt.
