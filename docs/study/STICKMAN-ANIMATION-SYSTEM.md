# Stickman Animation System

> Từ 2026-10-26 hệ thực thi nằm ở `docs/stick/` (STYLE, DICTIONARY, MOTION, REFERENCE) — tài liệu này là nền nguyên lý.

> Nghiên cứu và quy trình áp dụng cho người que khăn đỏ của kênh. Tài liệu này là chuẩn làm việc, không phải danh sách pose cố định.

## 1. Câu hỏi đã trả lời

**Làm thế nào để người que có cảm giác mềm, có trọng lượng và có acting?** Không dùng một công thức procedural duy nhất. Dùng hybrid 2D: animator đặt key pose và timing; rig giữ hierarchy/tỉ lệ; FK/IK chỉ hỗ trợ điểm tiếp xúc; review bằng onion skin, motion path và clip ở tốc độ thật.

## 2. Nguồn và mức độ tin cậy

### Đã kiểm chứng trong repo

- `docs/study/08-stick-animation.md`: pose-to-pose, contact/down/passing/up, foot map, arcs, ease, overlap, silhouette và giới hạn của IK.
- `docs/LESSONS.md §136–§138, §148–§149, §152, §157–§158`: các lỗi thật của dự án và kết quả review.
- `engine/stick.js`, `engine/stickmove.js`, `engine/hero.js`: engine hiện tại dùng pose góc, key interpolation, gait và IK; đây là code hiện có, không phải bằng chứng rằng chuyển động đã đạt.
- Hai video local người dùng gửi: `STRENGTH VS SPEED_ ROUND 2 _ StickNodes.mp4` và `Faces - An Actual Short.mp4`; frame review cho thấy silhouette, holds, asymmetric acting, impact/recovery và biểu cảm đầu–vai–thân là phần quyết định.

### Nguồn bên ngoài

- [Animation Mentor — 12 Principles](https://www.animationmentor.com/blog/tutorial-12-principles-of-animation/)
- [Animation Mentor — Anticipation](https://www.animationmentor.com/blog/anticipation-the-12-basic-principles-of-animation/)
- [Animation Mentor — Slow In/Slow Out](https://www.animationmentor.com/blog/slow-in-and-slow-out-the-12-basic-principles-of-animation/)
- [Animation Mentor — Straight Ahead/Pose to Pose](https://www.animationmentor.com/blog/straight-ahead-action-and-pose-to-pose-the-12-basic-principles-of-animation/)
- [Stick Nodes](https://sticknodes.com/page/index.htm): segment editing, onion skin và tweening được mô tả ở trang sản phẩm.
- [Pivot Animator onion skins](https://pivotanimator.net/pivothelp/onion_skins.htm): ghost frame trước/sau để kiểm spacing và arc.
- [FlipaClip onion skin](https://support.flipaclip.com/article/17-onion-skinning): frame-by-frame onion-skin workflow.
- [OpenToonz cutout animation](https://github.com/opentoonz/opentoonz_docs/blob/master/source/creating_cutout_animation.rst): hierarchy, pivot, parent-child và keyframes.
- [OpenToonz movements](https://github.com/opentoonz/opentoonz_docs/blob/master/source/creating_movements.rst): key/interpolation trên timeline.
- [Toon Boom timing](https://docs.toonboom.com/help/harmony-24/premium/timing/about-timing.html) và [onion skin](https://docs.toonboom.com/help/harmony-25/advanced/paperless-animation/about-onion-skin.html).
- [Blender IK](https://docs.blender.org/manual/en/5.0/animation/armatures/posing/editing/inverse_kinematics.html): IK là constraint trên pose/curves, không phải thay thế acting.
- [stick-motion](https://github.com/cafermutluozkan/stick-motion), [Cani2D](https://github.com/skeskinen/Cani2D), [skeleton-rig](https://github.com/frycz/skeleton-rig), [hmelberg/stick](https://github.com/hmelberg/stick): ứng viên để đọc kiến trúc; chưa được chọn làm dependency.
- [Stickman-Studio](https://github.com/saiedpod-bot/Stickman-Studio): pipeline AI storyboard/image/Veo/FFmpeg; không có bằng chứng là rig hoặc editor animation, nên không dùng làm lõi chuyển động.

## 3. Nguyên tắc đã đúc kết

### 3.1 Acting trước hình học

Mỗi action bắt đầu bằng câu: nhân vật muốn gì, đang chịu lực gì, và khán giả cần đọc điều gì. Key pose phải đọc được bằng silhouette ở kích thước gốc trước khi nội suy.

### 3.2 Pose-to-pose có 4 loại frame

1. **Key**: ý định/acting.
2. **Extreme**: giới hạn hình thể hoặc lực.
3. **Breakdown**: đường đi, trọng lượng, hướng xoay.
4. **In-between**: nối mượt, không tự phát minh acting mới.

Một action tối thiểu có anticipation → action/contact → follow-through → settle. Không phải action nào cũng cần đủ bốn pha dài, nhưng phải biết pha nào đang được giữ hoặc bỏ.

### 3.3 Timing/spacing là dữ liệu riêng

Không nội suy đều mọi khớp. Dùng hold để người xem đọc; snap để phản ứng; slow-in/out cho trọng lượng; hit-stop ngắn khi contact; offset cho head, chest, arms và scarf. Một chuyển động mềm thường có ít key pose tốt hơn nhiều key pose đều nhau.

### 3.4 Trọng tâm và arcs

Đạo diễn root/hip trước. Chân trụ khóa theo contact map; hông đi qua đường cong; đầu có arc nhỏ và không đổi hướng cùng lúc với hông; tay và cẳng tay có overlap. IK chỉ khóa foot/hand đã đặt, với bend và giới hạn rõ.

### 3.5 Asymmetry và overlap

Không mirror hai bên trừ khi chủ ý. Khi đổi hướng: hip đi trước hoặc giữ, chest trễ, head giữ hướng cũ một nhịp, vai/khuỷu/bàn tay theo sau. Thời gian trễ là lựa chọn diễn xuất, không phải nhiễu ngẫu nhiên.

### 3.6 Review bằng hình động

Numeric QA chỉ bắt lỗi hình học. Mỗi action phải qua: pose sheet full-size → onion-skin/motion-path view → clip 3–8 giây ở tốc độ thật → review. Contact sheet một mình không đủ.

### 3.7 Limb cong là một lớp hình học riêng

Video `Animation vs. Coding.mp4` cho thấy giới hạn hiện tại không chỉ nằm ở easing: `engine/stick.js` và `engine/hero.js` đang nối joint bằng polyline `lineTo`, nên tay/chân đọc như đoạn thẳng. Không được thay bằng một curve chung cho mọi pose. Giữ joint/pose làm nguồn acting; từ đó suy ra centerline có bend/control point theo khuỷu, gối, hướng lực, contact và silhouette; renderer stroke mới chịu trách nhiệm vẽ đường cong. Bản thử nghiệm phải là tùy chọn, tất định, có visual comparison ở tốc độ thật và không đổi default production trước khi duyệt.

## 4. Kiến trúc hệ thống đích

```text
rig (hierarchy, lengths, limits)
  → pose assets (named keys, reviewed)
  → motion curves (hip/head/hands/feet paths)
  → timing (holds, offsets, easing, hit-stop)
  → constraints (contact IK only)
  → renderer + onion-skin lab
  → numeric + visual review
```

Pose asset nên có tên, ví dụ `neutral`, `weight-left`, `look-left`, `look-right`, `settle`; không rải góc vô danh trong scene. Action data tách khỏi renderer để có thể scrub, chỉnh và export JSON.

## 5. Quy trình cho mỗi action mới

1. Viết beat và điều cần khán giả đọc.
2. Đặt 3–7 key/extreme poses ở full-size.
3. Vẽ motion paths cho hip, head, hands và feet; đặt contact map.
4. Thêm breakdowns với offset và arc.
5. Nội suy in-betweens; IK chỉ khóa contact.
6. Chạy numeric gate mọi frame.
7. Xem onion skin và clip thật; sửa key/breakdown, không vá từng frame ngẫu nhiên.
8. Review độc lập; chỉ sau khi đạt mới đưa vào lesson production.

## 6. Mẫu đầu tiên và tiêu chí đạt

Mẫu lab hiện giữ lại là **weight shift → look left → look right → settle**, 10 giây; bản 6 giây là bản thử trước đó và không phải chuẩn hiện tại. Đạt khi:

- chân trụ không trượt;
- hip đổi trọng lượng trước chest/head;
- head giữ hướng cũ rồi mới quay;
- hai tay không mirror cứng;
- có hold đọc được và settle không bật về;
- chuyển động xem ở 60 fps mềm hơn bản reference v1;
- nét limb được đánh giá riêng: curve renderer chưa được coi là đạt chỉ vì timing đã đúng;
- không có NaN, limb drift hoặc ground penetration.

Nếu mẫu này chưa đạt, không mở rộng sang walk/fight/object interaction.

## 7. Không được nhầm

- Smooth interpolation không tự tạo acting.
- IK không tự tạo trọng lượng.
- 60 fps không làm chuyển động mềm nếu spacing sai.
- Numeric pass không phải visual approval.
- `Stickman-Studio` là pipeline sản xuất video AI, không phải stickman rig.
