// Phần trên của ảnh tư thế được giữ khi vẽ mascot NỬA THÂN (figure() của kit bài học). Kho có hai khung
// (POSES.md): toàn thân → 0.45 (ngang hông), khung giữa đùi → 1 — đặt cạnh nhau thì cỡ đầu khớp (đo ở zero-div).
// Hợp các bảng CROP của projects/*/kit.js (2026-10-08); không có giá trị nào lệch giữa các kit.
// Kit đã xong giữ bản chép của mình — sửa ở đây không đổi pixel bài cũ. Tư thế mới: thêm vào đây.
export const CROP = {
  // toàn thân
  idle: 0.45, ok: 0.45, shrug: 0.45, point: 0.45, crossed: 0.45, thumb: 0.45, wave: 0.45, spin: 0.45,
  // khung giữa đùi
  startled: 1, jump: 1, three: 1, ponder: 1, halt: 1, twoways: 1, chalk: 1, invite: 1, notebook: 1, 'peace-back': 1,
  calculator: 1, pointer: 1, offer: 1, compass: 1, 'coin-cover': 1, 'coin-flip': 1, 'coin-peek': 1, phone: 1,
  icosa: 1, stool: 1,   // stool: toàn thân NGỒI, giữ cả ghế
};
