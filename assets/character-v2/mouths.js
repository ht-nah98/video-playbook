// Neo MIỆNG của từng tư thế (toạ độ trong ảnh cắt assets/character-v2/cut/pose-*.png, px) — cho miệng nói (engine/talk.js).
// Đo bằng mắt trên ảnh phóng to 4× lưới 10 px (2026-10-09, bài sudoku). x, y = tâm nét miệng gốc; w = bề rộng nét miệng
// gốc; tilt = góc nét (độ, dương = xuôi xuống phải, theo góc mặt); skin = màu da quanh miệng (che nét gốc khi mở).
// Tư thế mới: phóng to vùng miệng, đo, thêm một dòng. Thiếu dòng → talk.js ném lỗi (không im lặng bỏ qua).
export const MOUTHS = {
  ponder:     { x: 406, y: 459, w: 22, tilt: 18, skin: [254, 207, 170] },
  point:      { x: 324, y: 243, w: 9,  tilt: 6,  skin: [253, 205, 172] },
  calculator: { x: 395, y: 478, w: 35, tilt: 21, skin: [253, 202, 166] },
  ok:         { x: 258, y: 210, w: 10, tilt: 25, skin: [253, 209, 185] },
  wave:       { x: 297, y: 252, w: 29, tilt: 4,  skin: [253, 209, 180] },
  // 2026-10-19 (ja/gacha): đo trên ảnh phóng to 4× lưới 10 px; halt + coin-flip là miệng mở sẵn (w = bề rộng viền)
  pointer:    { x: 474, y: 446, w: 13, tilt: 11, skin: [254, 201, 165] },
  phone:      { x: 559, y: 449, w: 40, tilt: 31, skin: [253, 211, 177] },
  'coin-flip': { x: 390, y: 314, w: 7,  tilt: 0,  skin: [255, 205, 170] },
  halt:       { x: 456, y: 451, w: 33, tilt: 0,  skin: [254, 202, 168] },
};
