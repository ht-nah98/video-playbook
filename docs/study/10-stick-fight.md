# 10 — Vì sao người que của Alan Becker "siêu mượt" (người que đánh nhau, kênh hoạt hình người que)

Người dùng 2026-10-23, sau khi duyệt người que khăn đỏ (`docs/character/CHARACTER-STICK.md`): "nghiên cứu các kênh làm video người
que animation… người que fighting, đánh nhau, và đặc biệt kênh của Alan Becker — họ làm người que siêu mượt".

Nguồn chọn bằng YouTube Data API (video nhiều view nhất của kênh Alan Becker + tìm "stick figure fight animation",
"stickman fight animation", 2026-10-23). Tải 720p ở `out/_lab/study/stick-fight/` (không commit), tờ khung từng khung ở
`strips/`. Đo nhịp hình bằng `scratchpad/study10/cadence.py` (khác biệt từng khung ở 192×108 xám).

| video | view | fps | khung trùng khi đang hành động | cắt cảnh / phút | năng lượng chuyển động (trung bình khác biệt / khung) |
|---|---|---|---|---|---|
| Alan Becker — *Animation vs. Math* (14:03) `B1J6Ou4q8vE` | 154M | 24 | **17%** | 5.7 | 2.81 |
| Alan Becker — *Animator vs. Animation 4* (13:37) `VufDd-QL1c0` | 204M | 24 | 26% | 9.4 | 2.67 |
| Alan Becker — *Ricochet* (0:40, dọc) `iBzLtNUspY0` | 94M | 24 | 41% | 3.0 | 2.81 |
| DV Animations Part 53 (4:53, Flash) `Nd-LNSb9cjk` | 107M | 60 | 13% | 4.5 | 4.39 |
| Mici Animations — Stick Nodes (13:17) `oc8e9KhlTZI` | 191M | 30 | 52% | 4.2 | 1.13 |
| Pencilmation — *Pencilmate Becomes A King!* (23:57) `kcsXWqhtGWU` | 138M | 24 | 34% | 2.8 | 2.58 |
| **ta** — clip người que khăn đỏ (11.5 s) | — | 60 | (vùng nhân vật: mỗi khung đều mới) | 0 | **0.21** |
| **ta** — probability (9:24) | — | 60 | — | 0 | **0.19** |

(*Animation vs. Minecraft Shorts Ep. 14*, 540M, bị YouTube chặn tải — bỏ.)

## 1. Kết luận gốc: "mượt" KHÔNG đến từ số khung

Becker vẽ 24 hình / giây, gần như mỗi khung một hình khi hành động (17–26% khung trùng) — ta đã render 60 hình / giây
thật (đo vùng nhân vật: khác biệt 7–10 / khung ở mọi khung). Ta có NHIỀU khung hơn mà vẫn kém. Năng lượng chuyển động
màn hình của họ gấp ~13–15 lần ta (2.6–2.8 vs 0.19–0.21), có 3–9 lần cắt cảnh mỗi phút (ta: 0). Cái "mượt" người xem
cảm thấy là **TƯƠNG PHẢN NHỊP + TƯ THẾ MẠNH + CẢ KHUNG HÌNH SỐNG**, không phải nội suy dày. DV Animations (60 fps nội suy
Flash, khoảng cách đều) cho thấy mặt trái: nhiều khung + ease đều tay → chuyển động trôi, "máy tính". Nội suy
smoothstep giữa mọi khoá của ta (`keys`) nghiêng về phía DV.

## 2. Họ làm gì — từng khung (tờ `strips/`)

1. **Giữ → bật nhanh → giữ** (*Math* 1:45, khung 0–47): giữ dáng 0.75 s (18 khung gần như yên), đổi dáng trong **6 khung
   (0.25 s)**, giữ tiếp 1 s. Động tác lớn hoàn tất trong 3–6 khung; thời gian còn lại là giữ cho người xem đọc.
2. **Mỗi khung một tư thế MẠNH, khoảng cách lớn** (*Math* 4:11): chạy ném — khung 7 → 8 nhân vật từ dáng đứng sang lao
   nằm ngang, không khung đệm; mắt người xem tự nối. Tư thế ở mỗi khung đọc được riêng (silhouette rõ).
3. **Phản ứng hài = BẬT dáng, 0 khung đệm** (*Ricochet* 0:10, khung 10): núp sau khiên → bật thẳng sang giơ hai tay giật
   mình → giữ 8 khung → bật về. Cảm xúc bật, hành động vật lý mới chuyển dần.
4. **Không khung nào chết hẳn**: khi nhân vật chính giữ dáng, nhân vật / vật khác vẫn chuyển (đỏ vẫn di khiên — *Ricochet*;
   e^iπ trôi — *Math* 1:45) hoặc **camera trôi chậm liên tục** (*AvA4* 4:05: cả màn hình dịch từng khung).
5. **Bị đánh văng → cuộn tròn lăn** (*Math* 4:11, khung 9–15): thân gập thành khối, lăn theo đà, rồi mới bung ra đứng dậy.
6. **Ký hiệu toán là NHÂN VẬT có vật lý** (*Math* suốt bài): người que đẩy "1" vào tạo 1+1=2, vác số, chen vào dấu "=",
   bị e^iπ đuổi; chữ "e" co giãn, duỗi thành roi "~"; người que chính là người LÀM phép tính.
7. **Vật lao nhanh để vệt** (*Math* 4:12: bức tường chữ L mọc lên có dải mờ chuyển màu phía sau) = smear vẽ bằng hình,
   không phải motion blur máy.
8. **Cỡ nhân vật đổi theo cảnh** (*Math* 4:30–5:00: toàn cảnh, người que tí hon; cận: chiếm nửa khung) + cắt cảnh đúng
   lúc chạm (nguồn web: cắt vào khoảnh khắc va chạm, khung chặt lên người bị đánh).
9. **Màu = danh tính** (*Ricochet*, *AvA4*: cam, đỏ, xanh lá, vàng, xanh lam) — mỗi người que một màu, không cần chi tiết khác.
10. **Pencilmation**: nhân vật vẽ trên GIẤY KẺ DÒNG, camera lia ngang dàn nhân vật — gần DNA vở nháp của probability;
    hài đến từ gag đời thường (cá mập cắn ván lướt), nhân vật đóng vai tình huống.

Nguồn web (thuật ngữ, chưa có số đo riêng của Becker): hit-stop — hai bên khựng vài khung khi chạm; impact frame — một
khung loé / tia nổ đánh dấu va chạm; smear 1–2 khung đặt GIỮA hai khoá, không đặt trên khoá va chạm; lấy đà dừng một nhịp
trước cú đánh làm cú đánh nặng hơn ([Prolific Studio — smear frames](https://blog.prolificstudio.co/blog/smear-frames/),
[RebusFarm — smear frames](https://static.rebusfarm.net/blog/smear-frames-in-animation-how-animators-create-fast-and-dynamic-motion),
[Gnomon — animating stylized attacks](https://bmc.thegnomonworkshop.com/workshops/animating-stylized-attacks-in-maya)).
Khoá học của Becker (Bloop Animation, trả phí) dùng Adobe Animate — không tải.

## 3. Đề xuất cho người que khăn đỏ (chờ người dùng duyệt)

| # | đổi gì | ở đâu | giá |
|---|---|---|---|
| A | **Nhịp khoá kiểu Becker**: động tác lớn 3–6 khung-24 (0.12–0.25 s) với ease-OUT gắt (không smoothstep đều), rồi GIỮ; cảm xúc = bật dáng 0–1 khung đệm. Thêm `snap` / `fast` vào `keys` | `engine/stickmove.js`, hero-scene | nhỏ |
| B | **Thử "vẽ trên 24"**: nhân vật lấy t lượng tử hoá về 1/24 s (nền / camera vẫn 60) → cảm giác vẽ tay, bớt trôi; clip A/B cho người dùng chọn | `hero()` tham số `step` | nhỏ, thử trước |
| C | **Giữ có sống**: khi giữ dáng → thở nhẹ / khăn phấp phới / mắt chớp / vật khác chuyển; không bao giờ cả khung đứng yên | kit bài, CHARACTER-STICK §5 | nhỏ |
| D | **Camera sống**: trôi chậm liên tục + đẩy vào khi chạm + cắt cận / toàn — hiện ta 0 cắt, năng lượng 0.2 vs 2.7 | `engine/stage.js` / plate | vừa |
| E | **Bộ va chạm**: hit-stop 2–4 khung, impact frame (tia nổ nét mực 1 khung), smear vẽ bằng hình (vệt kéo dài theo hướng bay), bụi khi tiếp đất, cuộn tròn khi bị văng | `engine/hero.js` + `tools/lab/fight-page.js` | vừa |
| F | **Ký hiệu là nhân vật**: số / chữ có squash, co giãn, đuổi, bị vác — đúng *Animation vs. Math*; người que LÀM phép tính | kit bài | theo bài |
| G | Đo lại bằng thước này mỗi bài (năng lượng chuyển động + cắt / phút cạnh `pace.py`) | `tools/study/` | nhỏ |

## Không bắt chước
Nền đen + người que cam (dấu riêng Becker); bạo lực thật / máu; định dạng không lời (ta có lời đọc — người que không được
cướp chú ý khỏi câu đang đọc, CRAFT §7); nhịp cắt 9 lần / phút trong đoạn giảng công thức.

## 4. Clip thử A/B (2026-10-23) — chờ người dùng xem

`tools/lab/fight-scene.js` (kịch bản) + `fight-page.js` (camera trôi / đẩy / rung / 2 lần cắt, vệt kéo, khung loé, bụi,
hơi bốc, giấy kẻ dòng để thấy camera chạy) → `out/_lab/fight-60.mp4`, `fight-24.mp4` (nhân vật lượng tử 1/24 s, camera
60), `fight-AB.mp4` (cạnh nhau). Người que khăn đỏ vs 49%: giật mình BẬT, lấy đà, đấm 5 khung, khựng + loé, bị đè bẹp,
giận đỏ người, chạy, bay đá, số văng tách 4 · 9 · %, nhảy mừng. Gác `stick2-qa.mjs`: đạt. Năng lượng chuyển động
1.48 (clip đầu 0.21, Becker ~2.7). Lộ lỗi thiết kế: tay ngắn hơn đầu → không giơ qua đầu được → tay × 1.3 (LESSONS §149).

**Người dùng chọn A (2026-10-23): người que nội suy 60 hình / giây.** Đề xuất B (vẽ trên 24) bỏ; nhịp Becker (A), giữ có
sống (C), camera (D), bộ va chạm (E), ký hiệu là nhân vật (F) giữ — áp ở 60 hình / giây.
