// Phông VẼ cho kênh lịch sử (2026-10-28): nơi chốn vẽ phẳng nét đen dày, trời một màu — khi ảnh thật không hợp làm sân khấu
// (EDITING: ảnh thật = tư liệu / vật, phông vẽ = sân khấu cho dàn nhân vật). Tất định; tập import, không chép.
//   import * as B from '../_kit/backdrop.js';  B.bindBackdrop(g);  B.place('quay' | 'cityhall' | 'latin' | 'palace', { night, cam })
import { INK } from './mapkit.js';
import { hash } from './stage.js';
let g = null; const W = 1920, H = 1080;
export function bindBackdrop(ctx) { g = ctx; }
const LW = 9;
function box(x, y, w, h, fill) { g.fillStyle = fill; g.fillRect(x, y, w, h); g.strokeRect(x, y, w, h); }
function win(x, y, w, h, o = {}) { g.fillStyle = o.lit ? '#F5E39A' : o.col ?? '#2A2D33'; g.beginPath(); if (o.arch) { g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); } else g.rect(x, y, w, h); g.fill(); g.stroke(); }
function sky(c0, c1) { const gr = g.createLinearGradient(0, 0, 0, H * 0.7); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
function ground(y, col = '#7C7A78') { g.fillStyle = col; g.fillRect(0, y, W, H - y); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
/** hàng nhà phố Áo-Hung: mặt tiền vàng / kem / hồng, cửa sổ, mái */
function rowHouses(x0, x1, base, hMin, hMax, seed) { let x = x0, i = 0;
  while (x < x1) { const k = seed + i++, w = 230 + 110 * hash(k), h = hMin + (hMax - hMin) * hash(k + 1), col = ['#E8CF7A', '#EDE0C0', '#E7B7A2', '#D9C29A'][Math.floor(hash(k + 2) * 4)];
    box(x, base - h, w, h, col); g.fillStyle = ['#8D3B32', '#4B5563', '#3E4A6B'][Math.floor(hash(k + 3) * 3)]; g.beginPath(); g.moveTo(x - 10, base - h); g.lineTo(x + w / 2, base - h - 70 - 40 * hash(k + 4)); g.lineTo(x + w + 10, base - h); g.closePath(); g.fill(); g.stroke();
    const cols = Math.max(2, Math.floor(w / 80)), rows = Math.max(2, Math.floor((h - 60) / 110));
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) win(x + (c + 0.5) * w / cols - 18, base - h + 40 + r * 110, 36, 62, { arch: r === 0 && hash(k + 5) > 0.5 });
    x += w; } }
const PLACES = {
  /** bờ sông Appel (Sarajevo): sông Miljacka phía trước, lan can, phố bên kia, đồi + tháp minaret */
  quay(o) { sky('#7FB3DE', '#CFE4F2'); g.fillStyle = '#7FA36A'; g.beginPath(); g.moveTo(0, 520); for (let x = 0; x <= W; x += 120) g.lineTo(x, 470 - 60 * Math.sin(x / 300) - 30 * hash(x)); g.lineTo(W, 620); g.lineTo(0, 620); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#F1ECE0'; g.fillRect(1380, 300, 34, 260); g.strokeRect(1380, 300, 34, 260); g.beginPath(); g.moveTo(1372, 300); g.lineTo(1397, 230); g.lineTo(1422, 300); g.closePath(); g.fill(); g.stroke();
    rowHouses(-40, W + 40, 700, 260, 420, 11); g.fillStyle = '#6E9CC2'; g.fillRect(0, 700, W, 120); g.beginPath(); g.moveTo(0, 700); g.lineTo(W, 700); g.stroke();
    g.strokeStyle = '#FFFFFF'; g.lineWidth = 5; for (let i = 0; i < 14; i++) { const x = hash(i + 40) * W, y = 730 + hash(i + 41) * 70; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 60, y); g.stroke(); } g.strokeStyle = INK; g.lineWidth = LW;
    ground(820, '#8C8A86'); for (let x = 0; x < W; x += 70) { g.beginPath(); g.moveTo(x, 790); g.lineTo(x, 820); g.stroke(); } g.beginPath(); g.moveTo(0, 790); g.lineTo(W, 790); g.stroke(); },
  /** toà thị chính Sarajevo (Vijećnica): sọc đỏ-vàng kiểu Moorish, vòm nhọn, tháp góc */
  cityhall(o) { sky('#86B8E0', '#D6E8F4'); const x0 = 360, w = 1200, top = 220, base = 860;
    for (let i = 0; i < 18; i++) { g.fillStyle = i % 2 ? '#E9C46A' : '#C8553D'; g.fillRect(x0, top + i * (base - top) / 18, w, (base - top) / 18); } g.strokeRect(x0, top, w, base - top);
    for (const tx of [x0 - 90, x0 + w - 10]) { box(tx, top - 80, 100, base - top + 80, '#E9C46A'); g.fillStyle = '#C8553D'; g.beginPath(); g.moveTo(tx - 10, top - 80); g.lineTo(tx + 50, top - 190); g.lineTo(tx + 110, top - 80); g.closePath(); g.fill(); g.stroke(); }
    g.fillStyle = '#8B3A2E'; g.beginPath(); g.moveTo(x0 - 20, top); g.lineTo(x0 + w / 2, top - 70); g.lineTo(x0 + w + 20, top); g.closePath(); g.fill(); g.stroke();
    for (let c = 0; c < 7; c++) for (let r = 0; r < 2; r++) win(x0 + 70 + c * 160, top + 80 + r * 230, 80, 150, { arch: true, col: '#3A2E2A' });
    win(x0 + w / 2 - 90, base - 220, 180, 220, { arch: true, col: '#2A1E1A' }); ground(base, '#9A948C'); },
  /** góc cầu Latin + tiệm Schiller (nơi xe dừng): cầu đá vòm, góc phố có biển tiệm trơn (không chữ) */
  latin(o) { sky('#8FC0E4', '#DCEBF5'); g.fillStyle = '#6E9CC2'; g.fillRect(0, 640, 900, 140);
    g.fillStyle = '#CFC6B4'; g.beginPath(); g.moveTo(-20, 600); g.quadraticCurveTo(450, 470, 920, 600); g.lineTo(920, 660); g.lineTo(-20, 660); g.closePath(); g.fill(); g.stroke();
    for (const [cx, rr] of [[180, 90], [450, 120], [720, 90]]) { g.fillStyle = '#6E9CC2'; g.beginPath(); g.arc(cx, 700, rr, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
    box(940, 230, 980, 600, '#EDE0C0'); g.fillStyle = '#8D3B32'; g.fillRect(920, 200, 1020, 40); g.strokeRect(920, 200, 1020, 40);
    for (let c = 0; c < 6; c++) win(1000 + c * 150, 290, 60, 100); box(990, 560, 880, 70, '#7A3E2C');
    win(1010, 650, 260, 180, { col: '#3B4A5A' }); win(1320, 650, 120, 180, { col: '#2A1E1A' }); win(1490, 650, 340, 180, { col: '#3B4A5A' }); ground(830, '#8C8A86'); },
  /** cung điện Vienna (Hofburg / Schönbrunn giản lược): mặt tiền vàng dài, mái xanh, cột */
  palace(o) { sky(o.night ? '#1F2B4D' : '#7FB3DE', o.night ? '#3A4A72' : '#CFE4F2'); const base = 860;
    box(80, 330, 1760, base - 330, '#F0D27A'); g.fillStyle = '#4C7A6A'; g.beginPath(); g.moveTo(60, 330); g.lineTo(200, 250); g.lineTo(1720, 250); g.lineTo(1860, 330); g.closePath(); g.fill(); g.stroke();
    box(760, 160, 400, 170, '#F0D27A'); g.fillStyle = '#4C7A6A'; g.beginPath(); g.ellipse(960, 160, 200, 110, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    for (let c = 0; c < 16; c++) for (let r = 0; r < 3; r++) win(130 + c * 108, 380 + r * 150, 46, 90, { arch: r === 0, lit: o.night && hash(c * 3 + r) > 0.4 });
    for (let c = 0; c < 6; c++) box(700 + c * 100, 360, 26, base - 360, '#E7DCC0'); ground(base, '#A8A296'); },
};
export function place(k, o = {}) { g.save(); g.lineWidth = LW; g.strokeStyle = INK; g.lineJoin = 'round'; PLACES[k](o); g.restore(); }
export const PLACE_KEYS = Object.keys(PLACES);
