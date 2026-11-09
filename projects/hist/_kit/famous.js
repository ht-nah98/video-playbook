// Nhân vật lịch sử NỔI TIẾNG vẽ đầu tròn (2026-10-30, người dùng: "nhân vật đặc biệt nên có thiết kế để audience dễ nhận ra").
// Kiểu 2 người dùng chọn (ảnh mẫu Hitler đầu tròn 10-28): đầu tròn kem, mắt chấm, 1–3 nét nhận dạng (tóc, râu, mũ, đạo cụ),
// thân áo có chi tiết (ve, túi, cúc), chân quần + giày. Vẽ riêng của kênh, không chép tranh nào. Tất định, không ngẫu nhiên.
//   import { bindFamous, famous, WHO } from '../_kit/famous.js';  bindFamous(g);
//   famous(x, yĐế, h, 'napoleon', { eyes, mouth, arms, look })   — eyes: dot | angry | shock | happy | sad | side
// Bàn thử projects/hist/_lab/famous.html. Là VỐN để phối theo tình huống, không phải bộ cố định (CRAFT §0).
import { INK } from './mapkit.js';
let g = null;
export function bindFamous(ctx) { g = ctx; }
const SKIN = '#FBEEDC';
const P = (pts) => { g.beginPath(); pts.forEach(([a, b], i) => i ? g.lineTo(a, b) : g.moveTo(a, b)); g.closePath(); };
const fillStroke = (c) => { g.fillStyle = c; g.fill(); g.stroke(); };

function eyes(x, y, r, kind, look, lw, o = {}) { const lk = (kind === 'side' ? 1.6 : look) * r * 0.08;
  g.save(); g.fillStyle = INK; g.strokeStyle = INK; g.lineCap = 'round';
  for (const s of [-1, 1]) { const ex = x + s * r * 0.3;
    if (kind === 'shock') { g.lineWidth = lw * 0.8; g.fillStyle = '#FFF'; g.beginPath(); g.arc(ex, y, r * 0.15, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(ex, y, r * 0.045, 0, 7); g.fill(); continue; }
    if (kind === 'happy') { g.lineWidth = lw * 1.1; g.beginPath(); g.arc(ex, y + r * 0.05, r * 0.09, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); continue; }
    g.beginPath(); g.arc(ex + lk, y, r * 0.065, 0, 7); g.fill();
    if (o.liner) { g.lineWidth = lw * 1.1; g.beginPath(); g.moveTo(ex + s * r * 0.05, y); g.lineTo(ex + s * r * 0.2, y - r * 0.05); g.stroke(); }   // kẻ mắt Ai Cập
    if (kind === 'angry') { g.lineWidth = lw * 1.1; g.beginPath(); g.moveTo(ex - s * r * 0.15, y - r * 0.1); g.lineTo(ex + s * r * 0.1, y - r * 0.2); g.stroke(); }   // mày xếch: đầu trong thấp
    if (kind === 'sad') { g.lineWidth = lw * 1.1; g.beginPath(); g.moveTo(ex - s * r * 0.15, y - r * 0.2); g.lineTo(ex + s * r * 0.1, y - r * 0.1); g.stroke(); } }   // mày chau: đầu trong cao
  g.restore(); }
function mouth(x, y, r, k, lw) { if (!k) return; g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.lineCap = 'round'; g.fillStyle = '#7A2A2A';
  if (k === 'o') { g.beginPath(); g.ellipse(x, y, r * 0.09, r * 0.12, 0, 0, 7); g.fill(); g.stroke(); }
  if (k === 'frown') { g.beginPath(); g.arc(x, y + r * 0.12, r * 0.15, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  if (k === 'smile') { g.beginPath(); g.arc(x, y - r * 0.08, r * 0.15, 0.3, Math.PI - 0.3); g.stroke(); }
  if (k === 'grin') { g.beginPath(); g.arc(x, y - r * 0.06, r * 0.18, 0.15, Math.PI - 0.15); g.closePath(); g.fill(); g.stroke(); }
  if (k === 'flat') { g.beginPath(); g.moveTo(x - r * 0.12, y); g.lineTo(x + r * 0.12, y); g.stroke(); }
  if (k === 'smirk') { g.beginPath(); g.moveTo(x - r * 0.12, y + r * 0.02); g.quadraticCurveTo(x + r * 0.04, y + r * 0.05, x + r * 0.15, y - r * 0.06); g.stroke(); }
  g.restore(); }

// Mỗi nhân vật: coat (màu áo), pants (quần) | gown (váy dài), det (chi tiết thân), arms ([trái, phải]), back / front (tóc, râu, mũ quanh đầu),
// eyes / mouth mặc định, prop (đạo cụ trên tay phải / trái). Toạ độ đầu: (x, hy), bán kính r.
export const WHO = {
  hitler: { name: 'Adolf Hitler', coat: '#9C7A3C', pants: '#2A2A2C', det: ['lapel', 'tie', 'pockets', 'buttons', 'armband'], arms: ['down', 'down'], eyes: 'angry', mouth: null,
    front: (x, y, r) => { g.fillStyle = '#1A1A1C'; g.beginPath(); g.moveTo(x - r * 0.98, y + r * 0.08); g.arc(x, y - r * 0.04, r * 0.99, Math.PI * 1.03, Math.PI * 1.97);
      g.quadraticCurveTo(x + r * 0.2, y - r * 0.6, x - r * 0.2, y - r * 0.32); g.quadraticCurveTo(x - r * 0.45, y - r * 0.12, x - r * 0.62, y - r * 0.08); g.quadraticCurveTo(x - r * 0.85, y - r * 0.02, x - r * 0.98, y + r * 0.08); g.fill();
      g.strokeStyle = '#FBEEDC'; g.lineWidth = r * 0.03; g.beginPath(); g.moveTo(x + r * 0.35, y - r * 0.92); g.quadraticCurveTo(x + r * 0.3, y - r * 0.7, x + r * 0.42, y - r * 0.5); g.stroke(); g.strokeStyle = INK;
      g.fillStyle = '#1A1A1C'; g.fillRect(x - r * 0.1, y + r * 0.3, r * 0.2, r * 0.13); } },
  napoleon: { name: 'Napoleon', coat: '#24365F', pants: '#EFECE3', boots: '#151517', det: ['lapelW', 'vest', 'epaulettes', 'buttons'], arms: ['down', 'chest'], eyes: 'dot', mouth: 'flat',
    front: (x, y, r) => { g.fillStyle = '#4A3424'; g.beginPath(); g.arc(x, y - r * 0.1, r * 0.98, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fill();
      g.beginPath(); g.ellipse(x - r * 0.1, y - r * 0.45, r * 0.16, r * 0.1, -0.4, 0, 7); g.fill(); },
    hat: (x, y, r) => { const b = y - r * 0.55; g.fillStyle = '#141417'; g.beginPath(); g.moveTo(x - r * 1.55, b + r * 0.05); g.quadraticCurveTo(x, b - r * 1.6, x + r * 1.55, b + r * 0.05); g.quadraticCurveTo(x, b - r * 0.25, x - r * 1.55, b + r * 0.05); g.fill(); g.stroke();
      g.strokeStyle = '#D8B84A'; g.lineWidth = r * 0.05; g.beginPath(); g.moveTo(x - r * 1.45, b - r * 0.02); g.quadraticCurveTo(x, b - r * 1.45, x + r * 1.45, b - r * 0.02); g.stroke(); g.strokeStyle = INK;
      g.lineWidth = r * 0.03; [['#2B4C9B', 0.2], ['#FFF', 0.13], ['#D62B2B', 0.06]].forEach(([c, k]) => { g.fillStyle = c; g.beginPath(); g.arc(x + r * 0.55, b - r * 0.5, r * k, 0, 7); g.fill(); g.stroke(); }); } },
  stalin: { name: 'Joseph Stalin', coat: '#CFC6A6', pants: '#B9AF8E', boots: '#151517', det: ['standcollar', 'pockets', 'buttons'], arms: ['down', 'pipe'], eyes: 'dot', mouth: null,
    front: (x, y, r) => { g.fillStyle = '#3A3634'; g.beginPath(); g.moveTo(x - r * 0.95, y - r * 0.05); g.quadraticCurveTo(x - r * 1.05, y - r * 1.15, x, y - r * 1.12); g.quadraticCurveTo(x + r * 1.05, y - r * 1.15, x + r * 0.95, y - r * 0.05);
      g.quadraticCurveTo(x + r * 0.7, y - r * 0.55, x, y - r * 0.6); g.quadraticCurveTo(x - r * 0.7, y - r * 0.55, x - r * 0.95, y - r * 0.05); g.fill();
      g.strokeStyle = '#6A6460'; g.lineWidth = r * 0.04; for (const k of [-0.45, -0.15, 0.15, 0.45]) { g.beginPath(); g.moveTo(x + k * r, y - r * 0.62); g.quadraticCurveTo(x + k * r * 1.1, y - r * 0.9, x + k * r * 0.8, y - r * 1.08); g.stroke(); } g.strokeStyle = INK;
      g.fillStyle = '#2E2A28'; g.beginPath(); g.moveTo(x, y + r * 0.22); g.bezierCurveTo(x - r * 0.25, y + r * 0.12, x - r * 0.5, y + r * 0.2, x - r * 0.55, y + r * 0.42); g.bezierCurveTo(x - r * 0.3, y + r * 0.48, x - r * 0.12, y + r * 0.42, x, y + r * 0.38);
      g.bezierCurveTo(x + r * 0.12, y + r * 0.42, x + r * 0.3, y + r * 0.48, x + r * 0.55, y + r * 0.42); g.bezierCurveTo(x + r * 0.5, y + r * 0.2, x + r * 0.25, y + r * 0.12, x, y + r * 0.22); g.fill(); } },
  churchill: { name: 'Winston Churchill', coat: '#1C1C20', pants: '#1C1C20', det: ['lapel', 'vest', 'bowtie', 'chain'], arms: ['down', 'vsign'], eyes: 'dot', mouth: null, wide: 1.1,
    front: (x, y, r) => { g.fillStyle = '#C9B8A0'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.9, y - r * 0.15, r * 0.14, r * 0.3, s * 0.3, 0, 7); g.fill(); }
      g.strokeStyle = '#C9B8A0'; g.lineWidth = r * 0.03; g.beginPath(); g.moveTo(x - r * 0.2, y - r * 0.92); g.quadraticCurveTo(x, y - r * 1.1, x + r * 0.15, y - r * 0.9); g.stroke(); g.strokeStyle = INK;
      g.lineWidth = r * 0.03; g.beginPath(); g.arc(x, y + r * 0.42, r * 0.12, 0.2, Math.PI - 0.2); g.stroke();
      g.save(); g.translate(x + r * 0.08, y + r * 0.47); g.rotate(-0.25); g.fillStyle = '#7A4A26'; g.fillRect(0, -r * 0.05, r * 0.55, r * 0.1); g.strokeRect(0, -r * 0.05, r * 0.55, r * 0.1);
      g.fillStyle = '#F06A2A'; g.fillRect(r * 0.5, -r * 0.05, r * 0.07, r * 0.1); g.fillStyle = 'rgba(160,160,170,0.6)'; g.beginPath(); g.arc(r * 0.68, -r * 0.2, r * 0.08, 0, 7); g.arc(r * 0.78, -r * 0.38, r * 0.06, 0, 7); g.fill(); g.restore(); } },
  lincoln: { name: 'Abraham Lincoln', coat: '#151518', pants: '#151518', det: ['lapel', 'bowtieB'], arms: ['down', 'down'], eyes: 'dot', mouth: 'flat', tall: 1.1,
    front: (x, y, r) => { g.fillStyle = '#26201C'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.86, y - r * 0.2, r * 0.18, r * 0.32, 0, 0, 7); g.fill(); }
      g.beginPath(); g.arc(x, y, r * 1.0, 0.05, Math.PI - 0.05); g.arc(x, y + r * 0.1, r * 0.72, Math.PI - 0.25, 0.25, true); g.closePath(); g.fill(); },
    hat: (x, y, r) => { g.fillStyle = '#121214'; g.fillRect(x - r * 0.68, y - r * 2.15, r * 1.36, r * 1.5); g.strokeRect(x - r * 0.68, y - r * 2.15, r * 1.36, r * 1.5);
      g.fillStyle = '#2E2E33'; g.fillRect(x - r * 0.68, y - r * 0.95, r * 1.36, r * 0.18); g.fillStyle = '#121214'; g.beginPath(); g.ellipse(x, y - r * 0.68, r * 1.1, r * 0.16, 0, 0, 7); g.fill(); g.stroke(); } },
  einstein: { name: 'Albert Einstein', coat: '#8B8A84', pants: '#6A5844', det: ['collar', 'buttons'], arms: ['down', 'board'], eyes: 'dot', mouth: null,
    back: (x, y, r) => { g.fillStyle = '#F4F4F0'; g.beginPath(); const n = 22; for (let i = 0; i <= n; i++) { const a = Math.PI * (0.78 + 1.44 * i / n), out = i % 2 ? 1.05 : 1.4 + 0.2 * Math.abs(Math.cos(a)) + 0.1 * ((i * 5) % 3);
      g.lineTo(x + Math.cos(a) * r * out * 1.08, y - r * 0.05 + Math.sin(a) * r * out * 0.92); } g.closePath(); g.fill(); g.stroke(); },
    front: (x, y, r) => { g.fillStyle = '#F4F4F0'; g.beginPath(); g.moveTo(x - r * 0.42, y + r * 0.42); g.quadraticCurveTo(x - r * 0.4, y + r * 0.18, x, y + r * 0.22); g.quadraticCurveTo(x + r * 0.4, y + r * 0.18, x + r * 0.42, y + r * 0.42); g.quadraticCurveTo(x, y + r * 0.34, x - r * 0.42, y + r * 0.42); g.fill(); g.stroke();
      g.lineWidth = r * 0.05; g.beginPath(); g.moveTo(x - r * 0.45, y - r * 0.2); g.lineTo(x - r * 0.15, y - r * 0.24); g.moveTo(x + r * 0.15, y - r * 0.24); g.lineTo(x + r * 0.45, y - r * 0.2); g.stroke(); } },
  caesar: { name: 'Julius Caesar', coat: '#F4F1E8', legs: 'bare', det: ['toga'], arms: ['down', 'orate'], eyes: 'dot', mouth: 'smirk', bareArms: true,
    front: (x, y, r) => { g.fillStyle = '#5A4330'; g.beginPath(); g.arc(x, y - r * 0.12, r * 0.97, Math.PI * 1.08, Math.PI * 1.92); g.lineTo(x + r * 0.5, y - r * 0.55); g.lineTo(x - r * 0.5, y - r * 0.55); g.closePath(); g.fill();
      g.fillStyle = '#5FA055'; for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) { const a = Math.PI * (sd < 0 ? 1.06 + k * 0.075 : 1.94 - k * 0.075), lx = x + Math.cos(a) * r * 0.98, ly = y - r * 0.1 + Math.sin(a) * r * 0.98;
        g.beginPath(); g.ellipse(lx, ly, r * 0.17, r * 0.08, a + sd * 1.2, 0, 7); g.fill(); g.stroke(); } } },
  cleopatra: { name: 'Cleopatra', coat: '#F7F4EA', gown: '#F7F4EA', det: ['collarEg'], arms: ['down', 'down'], eyes: 'dot', liner: true, mouth: 'smile', bareArms: true,
    back: (x, y, r) => { g.fillStyle = '#121214'; g.beginPath(); g.moveTo(x - r * 1.12, y + r * 0.95); g.lineTo(x - r * 1.12, y - r * 0.2); g.arc(x, y - r * 0.2, r * 1.12, Math.PI, 0); g.lineTo(x + r * 1.12, y + r * 0.95); g.closePath(); g.fill(); g.stroke(); },
    front: (x, y, r) => { g.fillStyle = '#121214'; g.beginPath(); g.arc(x, y - r * 0.05, r * 0.99, Math.PI * 1.04, Math.PI * 1.96); g.lineTo(x + r * 0.8, y - r * 0.3); g.lineTo(x - r * 0.8, y - r * 0.3); g.closePath(); g.fill();
      g.fillStyle = '#E8B930'; g.fillRect(x - r * 0.98, y - r * 0.5, r * 1.96, r * 0.12); g.strokeRect(x - r * 0.98, y - r * 0.5, r * 1.96, r * 0.12);
      g.beginPath(); g.moveTo(x - r * 0.08, y - r * 0.5); g.quadraticCurveTo(x - r * 0.15, y - r * 0.75, x, y - r * 0.82); g.quadraticCurveTo(x + r * 0.15, y - r * 0.75, x + r * 0.08, y - r * 0.5); g.closePath(); fillStroke('#E8B930'); } },
  victoria: { name: 'Queen Victoria', coat: '#1B1B1F', gown: '#1B1B1F', det: ['sash'], arms: ['down', 'down'], eyes: 'dot', mouth: 'frown', short: 0.92,
    back: (x, y, r) => { g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(x - r * 1.05, y + r * 0.9); g.quadraticCurveTo(x - r * 1.25, y - r * 0.4, x - r * 0.5, y - r * 1.0); g.lineTo(x + r * 0.5, y - r * 1.0); g.quadraticCurveTo(x + r * 1.25, y - r * 0.4, x + r * 1.05, y + r * 0.9); g.closePath(); g.fill(); g.stroke(); },
    front: (x, y, r) => { g.fillStyle = '#9A958E'; g.beginPath(); g.arc(x, y - r * 0.08, r * 0.98, Math.PI * 1.02, Math.PI * 1.98); g.quadraticCurveTo(x + r * 0.5, y - r * 0.55, x, y - r * 0.68); g.quadraticCurveTo(x - r * 0.5, y - r * 0.55, x - r * 0.98, y - r * 0.08); g.fill();
      g.strokeStyle = '#6E6A64'; g.lineWidth = r * 0.03; g.beginPath(); g.moveTo(x, y - r * 1.05); g.lineTo(x, y - r * 0.7); g.stroke(); g.strokeStyle = INK; },
    hat: (x, y, r) => { const b = y - r * 0.9; g.lineWidth = r * 0.04; g.beginPath(); g.moveTo(x - r * 0.32, b); for (let k = 0; k <= 4; k++) { const px = x - r * 0.32 + k * r * 0.16; g.lineTo(px, b - r * (k % 2 ? 0.2 : 0.38)); if (k < 4) g.lineTo(px + r * 0.08, b - r * 0.16); } g.lineTo(x + r * 0.32, b); g.closePath(); fillStroke('#F2C230');
      g.fillStyle = '#C0262C'; g.beginPath(); g.arc(x, b - r * 0.1, r * 0.06, 0, 7); g.fill(); } },
  antoinette: { name: 'Marie Antoinette', coat: '#F3B7C8', gown: '#F3B7C8', det: ['bows'], arms: ['down', 'cake'], eyes: 'dot', mouth: 'smile', bareArms: true,
    back: (x, y, r) => { g.fillStyle = '#ECE8EE'; g.beginPath(); g.moveTo(x - r * 1.0, y + r * 0.1); g.quadraticCurveTo(x - r * 1.3, y - r * 1.4, x - r * 0.55, y - r * 2.3); g.quadraticCurveTo(x, y - r * 2.75, x + r * 0.55, y - r * 2.3); g.quadraticCurveTo(x + r * 1.3, y - r * 1.4, x + r * 1.0, y + r * 0.1); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = '#C9C3CC'; g.lineWidth = r * 0.04; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(x, y - r * (0.9 + k * 0.32), r * (0.75 - k * 0.07), Math.PI * 1.15, Math.PI * 1.85); g.stroke(); } g.strokeStyle = INK; g.lineWidth = r * 0.05;
      for (const s of [-1, 1]) for (let k = 0; k < 2; k++) { g.fillStyle = '#ECE8EE'; g.beginPath(); g.ellipse(x + s * r * 1.02, y + r * (0.05 + k * 0.32), r * 0.2, r * 0.15, 0, 0, 7); g.fill(); g.stroke(); } },
    front: (x, y, r) => { g.fillStyle = '#ECE8EE'; g.beginPath(); g.arc(x, y - r * 0.08, r * 0.98, Math.PI * 1.05, Math.PI * 1.95); g.quadraticCurveTo(x, y - r * 0.55, x - r * 0.95, y - r * 0.3); g.fill();
      g.fillStyle = INK; g.beginPath(); g.arc(x + r * 0.42, y + r * 0.32, r * 0.035, 0, 7); g.fill(); },
    hat: (x, y, r) => { g.fillStyle = '#E2577E'; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x + r * 0.35, y - r * 1.75); g.lineTo(x + r * 0.35 + s * r * 0.35, y - r * 1.95); g.lineTo(x + r * 0.35 + s * r * 0.35, y - r * 1.55); g.closePath(); g.fill(); g.stroke(); }
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(x - r * 0.3, y - r * 2.3); g.quadraticCurveTo(x - r * 0.1, y - r * 3.3, x + r * 0.45, y - r * 3.1); g.quadraticCurveTo(x + r * 0.05, y - r * 2.9, x - r * 0.12, y - r * 2.32); g.closePath(); g.fill(); g.stroke(); } },
};

// ── thêm 2026-10-30 cho tập hitler (kiểu cộng): mũ kê-pi sĩ quan Đức dùng chung + Göring, Hindenburg, Rommel, Paulus
const peak = (x, y, r, top = '#6E7480', o = {}) => { const b = y - r * 0.55; g.fillStyle = top; g.beginPath(); g.moveTo(x - r * 0.95, b - r * 0.05); g.quadraticCurveTo(x - r * 1.1, b - r * 0.75, x, b - r * 0.78);
  g.quadraticCurveTo(x + r * 1.15, b - r * 0.75, x + r * 1.0, b - r * 0.08); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#17171A'; g.fillRect(x - r * 0.9, b - r * 0.2, r * 1.8, r * 0.2); g.strokeRect(x - r * 0.9, b - r * 0.2, r * 1.8, r * 0.2);
  g.beginPath(); g.ellipse(x, b + r * 0.02, r * 0.75, r * 0.13, 0, 0, Math.PI); g.fill(); g.stroke(); g.fillStyle = '#D8C27A'; g.beginPath(); g.ellipse(x, b - r * 0.42, r * 0.16, r * 0.07, 0, 0, 7); g.fill();
  if (o.goggles) for (const s of [-1, 1]) { g.fillStyle = '#9ED0EA'; g.beginPath(); g.ellipse(x + s * r * 0.3, b - r * 0.5, r * 0.2, r * 0.13, 0, 0, 7); g.fill(); g.stroke(); } };
Object.assign(WHO, {
  goring: { name: 'Hermann Göring', coat: '#C9D0D8', pants: '#C9D0D8', boots: '#151517', det: ['buttons', 'medals', 'belt'], arms: ['down', 'baton'], eyes: 'dot', mouth: 'grin', wide: 1.28,
    front: (x, y, r) => { g.fillStyle = '#5A4632'; g.beginPath(); g.arc(x, y - r * 0.12, r * 0.98, Math.PI * 1.1, Math.PI * 1.9); g.closePath(); g.fill();
      g.fillStyle = 'rgba(232,150,140,0.35)'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.6, y + r * 0.35, r * 0.22, r * 0.13, 0, 0, 7); g.fill(); } },
    hat: (x, y, r) => peak(x, y, r, '#E6E8EC') },
  hindenburg: { name: 'Paul von Hindenburg', coat: '#5E6470', pants: '#3A3E46', boots: '#151517', det: ['buttons', 'medals', 'standcollar'], arms: ['down', 'down'], eyes: 'dot', mouth: null, tall: 1.05,
    front: (x, y, r) => { g.fillStyle = '#E8E8E4'; g.fillRect(x - r * 0.7, y - r * 1.02, r * 1.4, r * 0.32); g.strokeRect(x - r * 0.7, y - r * 1.02, r * 1.4, r * 0.32);
      g.beginPath(); g.moveTo(x, y + r * 0.2); g.bezierCurveTo(x - r * 0.4, y + r * 0.05, x - r * 0.8, y + r * 0.25, x - r * 0.85, y + r * 0.6); g.bezierCurveTo(x - r * 0.5, y + r * 0.45, x - r * 0.2, y + r * 0.5, x, y + r * 0.4);
      g.bezierCurveTo(x + r * 0.2, y + r * 0.5, x + r * 0.5, y + r * 0.45, x + r * 0.85, y + r * 0.6); g.bezierCurveTo(x + r * 0.8, y + r * 0.25, x + r * 0.4, y + r * 0.05, x, y + r * 0.2); g.fill(); g.stroke(); } },
  rommel: { name: 'Erwin Rommel', coat: '#5E6470', pants: '#3A3E46', boots: '#151517', det: ['buttons', 'medals', 'scarf'], arms: ['down', 'down'], eyes: 'dot', mouth: 'flat',
    hat: (x, y, r) => peak(x, y, r, '#5E6470', { goggles: true }) },
  paulus: { name: 'Friedrich Paulus', coat: '#5E6470', pants: '#3A3E46', boots: '#151517', det: ['buttons', 'standcollar'], arms: ['down', 'down'], eyes: 'sad', mouth: 'flat',
    hat: (x, y, r) => peak(x, y, r) },
});
/** một nhân vật nổi tiếng: x = giữa, y = đế, h = cao (chưa tính mũ / tóc cao). o: eyes, mouth, look, arms [trái, phải] */
export function famous(x, y, h0, who, o = {}) { const C = { ...WHO[who], ...(o.coat ? { coat: o.coat, pants: o.pants ?? WHO[who].pants } : {}), ...(o.det ? { det: o.det } : {}) },   // o.coat / o.det: đổi đồ theo thời kỳ (vd. Hitler 1907 thường phục)
  _u = 0, h = h0 * (C.short ?? 1), lw = Math.max(3, h * 0.022), r = h * 0.24, tall = C.tall ?? 1;
  const bw = h * (who === 'lincoln' ? 0.38 : 0.44) * (C.wide ?? 1), legH = h * 0.15 * tall, by = y - legH, sy = by - h * 0.42 * tall, hy = sy - r * 0.78, gown = !!C.gown;
  g.save(); g.lineWidth = lw; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  // chân / váy
  if (gown) { const wb = who === 'antoinette' ? bw * 1.9 : bw * 1.35; P([[x - bw * 0.42, sy + h * 0.16], [x + bw * 0.42, sy + h * 0.16], [x + wb / 2, y], [x - wb / 2, y]]); fillStroke(C.gown);
    if (C.det.includes('bows')) for (let i = 0; i < 3; i++) { const yy = sy + h * (0.24 + i * 0.1); g.fillStyle = '#E2577E'; g.beginPath(); g.moveTo(x, yy); g.lineTo(x - bw * 0.16, yy - bw * 0.08); g.lineTo(x - bw * 0.16, yy + bw * 0.08); g.closePath(); g.moveTo(x, yy); g.lineTo(x + bw * 0.16, yy - bw * 0.08); g.lineTo(x + bw * 0.16, yy + bw * 0.08); g.closePath(); g.fill(); g.stroke(); }
    if (who === 'antoinette') { g.strokeStyle = '#E79AB0'; g.lineWidth = lw * 0.8; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(x - wb / 2 + i * wb / 4 * 0.98, y - lw); g.quadraticCurveTo(x + (i - 2) * bw * 0.25, sy + h * 0.45, x + (i - 2) * bw * 0.12, sy + h * 0.2); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; } }
  else for (const s of [-1, 1]) { const lx = x + s * bw * 0.22 - bw * 0.17;
    g.fillStyle = C.legs === 'bare' ? SKIN : C.pants; g.fillRect(lx, by - lw, bw * 0.34, legH - h * 0.02); g.strokeRect(lx, by - lw, bw * 0.34, legH - h * 0.02);
    if (C.boots) { g.fillStyle = C.boots; g.fillRect(lx, by + legH * 0.35, bw * 0.34, legH * 0.62); g.strokeRect(lx, by + legH * 0.35, bw * 0.34, legH * 0.62); }
    if (C.legs === 'bare') { g.strokeStyle = '#7A5A3A'; g.lineWidth = lw * 0.8; for (const k of [0.45, 0.7]) { g.beginPath(); g.moveTo(lx, by + legH * k); g.lineTo(lx + bw * 0.34, by + legH * k - h * 0.01); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; }
    g.fillStyle = C.legs === 'bare' ? '#8A6A44' : '#232326'; g.beginPath(); g.ellipse(lx + bw * 0.17 + s * h * 0.012, y - h * 0.014, bw * 0.22, h * 0.028, 0, 0, 7); g.fill(); g.stroke(); }
  // thân
  const bh = by - sy; g.beginPath(); g.moveTo(x - bw / 2, by); g.lineTo(x - bw / 2, sy + bw * 0.25); g.quadraticCurveTo(x - bw / 2, sy, x - bw * 0.25, sy); g.lineTo(x + bw * 0.25, sy); g.quadraticCurveTo(x + bw / 2, sy, x + bw / 2, sy + bw * 0.25); g.lineTo(x + bw / 2, by); g.closePath();
  const body = new Path2D(); body.moveTo(x - bw / 2, by); body.lineTo(x - bw / 2, sy + bw * 0.25); body.quadraticCurveTo(x - bw / 2, sy, x - bw * 0.25, sy); body.lineTo(x + bw * 0.25, sy); body.quadraticCurveTo(x + bw / 2, sy, x + bw / 2, sy + bw * 0.25); body.lineTo(x + bw / 2, by); body.closePath();
  g.fillStyle = C.coat; g.fill(body); g.save(); g.clip(body); const D = C.det, lw2 = lw * 0.7;
  if (D.includes('vest')) { g.fillStyle = who === 'napoleon' ? '#F3F0E6' : '#3A3A40'; g.fillRect(x - bw * 0.2, sy, bw * 0.4, bh * 0.8); }
  if (D.includes('lapel') || D.includes('lapelW')) { g.fillStyle = D.includes('lapelW') ? '#F3F0E6' : '#FFFFFF'; P([[x - bw * 0.16, sy], [x + bw * 0.16, sy], [x, sy + bh * 0.4]]); g.fill();
    g.fillStyle = C.coat; g.lineWidth = lw2; for (const s of [-1, 1]) { P([[x + s * bw * 0.16, sy], [x + s * bw * 0.32, sy + bh * 0.08], [x + s * bw * 0.06, sy + bh * 0.48]]); g.fill(); g.stroke(); } g.lineWidth = lw; }
  if (D.includes('tie')) { g.fillStyle = '#6E5530'; P([[x - bw * 0.04, sy + bh * 0.06], [x + bw * 0.04, sy + bh * 0.06], [x + bw * 0.05, sy + bh * 0.36], [x, sy + bh * 0.42], [x - bw * 0.05, sy + bh * 0.36]]); g.fill(); }
  if (D.includes('pockets')) { g.lineWidth = lw2; g.fillStyle = C.coat; for (const s of [-1, 1]) { g.strokeRect(x + s * bw * 0.27 - bw * 0.1, sy + bh * 0.3, bw * 0.2, bh * 0.2); g.beginPath(); g.moveTo(x + s * bw * 0.27 - bw * 0.11, sy + bh * 0.3); g.lineTo(x + s * bw * 0.27 + bw * 0.11, sy + bh * 0.3); g.lineTo(x + s * bw * 0.27, sy + bh * 0.38); g.closePath(); g.fill(); g.stroke(); } g.lineWidth = lw; }
  if (D.includes('buttons')) { g.fillStyle = who === 'hitler' || who === 'einstein' ? '#2A2A2C' : '#D8B84A'; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(x + (D.includes('lapel') ? bw * 0.02 : 0), sy + bh * (0.5 + i * 0.13), lw * 0.9, 0, 7); g.fill(); } }
  if (D.includes('standcollar')) { g.fillStyle = C.coat; g.lineWidth = lw2; g.fillRect(x - bw * 0.18, sy - lw, bw * 0.36, bh * 0.08); g.strokeRect(x - bw * 0.18, sy - lw, bw * 0.36, bh * 0.08); g.beginPath(); g.moveTo(x, sy); g.lineTo(x, by); g.stroke(); g.lineWidth = lw; }
  if (D.includes('collar')) { g.fillStyle = '#FFFFFF'; g.lineWidth = lw2; for (const s of [-1, 1]) { P([[x, sy + bh * 0.04], [x + s * bw * 0.2, sy], [x + s * bw * 0.16, sy + bh * 0.14]]); g.fill(); g.stroke(); } g.lineWidth = lw; }
  if (D.includes('chain')) { g.strokeStyle = '#D8B84A'; g.lineWidth = lw * 0.8; g.beginPath(); g.moveTo(x - bw * 0.18, sy + bh * 0.62); g.quadraticCurveTo(x - bw * 0.05, sy + bh * 0.72, x + bw * 0.12, sy + bh * 0.6); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw; }
  if (D.includes('toga')) { g.fillStyle = '#8E2B47'; P([[x - bw * 0.5, sy + bh * 0.05], [x - bw * 0.36, sy - lw], [x + bw * 0.5, sy + bh * 0.75], [x + bw * 0.5, sy + bh * 0.92]]); g.fill();
    g.strokeStyle = '#CFC8B6'; g.lineWidth = lw2; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(x - bw * 0.3 + i * bw * 0.18, by); g.quadraticCurveTo(x - bw * 0.1 + i * bw * 0.15, sy + bh * 0.5, x - bw * 0.45 + i * bw * 0.2, sy + bh * 0.2); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; }
  if (D.includes('medals')) { for (let i = 0; i < 6; i++) { g.fillStyle = ['#C8262C', '#2E6FC2', '#E8B930', '#3EA45A', '#E8B930', '#C8262C'][i]; g.fillRect(x - bw * 0.38 + (i % 3) * bw * 0.09, sy + bh * (0.22 + Math.floor(i / 3) * 0.07), bw * 0.08, bh * 0.05); }
    g.fillStyle = '#E8B930'; g.beginPath(); g.arc(x + bw * 0.25, sy + bh * 0.35, bw * 0.06, 0, 7); g.fill(); g.stroke(); }
  if (D.includes('belt')) { g.fillStyle = '#3A2C20'; g.fillRect(x - bw / 2, sy + bh * 0.68, bw, bh * 0.08); g.fillStyle = '#D8B84A'; g.fillRect(x - bw * 0.06, sy + bh * 0.67, bw * 0.12, bh * 0.1); }
  if (D.includes('scarf')) { g.fillStyle = '#F2EFE6'; P([[x - bw * 0.2, sy], [x + bw * 0.2, sy], [x + bw * 0.08, sy + bh * 0.3], [x - bw * 0.05, sy + bh * 0.28]]); g.fill(); g.stroke(); }
  if (D.includes('sash')) { g.strokeStyle = '#3E6FC2'; g.lineWidth = bw * 0.12; g.beginPath(); g.moveTo(x - bw * 0.5, sy); g.lineTo(x + bw * 0.5, sy + bh); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw;
    g.fillStyle = '#F2C230'; g.beginPath(); g.arc(x + bw * 0.12, sy + bh * 0.6, bw * 0.07, 0, 7); g.fill(); g.stroke(); }
  g.restore(); g.stroke(body);
  if (D.includes('epaulettes')) for (const s of [-1, 1]) { g.fillStyle = '#D8B84A'; g.beginPath(); g.ellipse(x + s * bw * 0.4, sy + lw, bw * 0.16, bw * 0.07, 0, 0, 7); g.fill(); g.stroke(); g.lineWidth = lw * 0.6; for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(x + s * bw * 0.4 + k * bw * 0.05, sy + lw + bw * 0.06); g.lineTo(x + s * bw * 0.4 + k * bw * 0.055, sy + lw + bw * 0.14); g.stroke(); } g.lineWidth = lw; }
  if (D.includes('collarEg')) { for (let k = 3; k >= 1; k--) { g.fillStyle = ['#E8B930', '#2F6FB8', '#E8B930'][k - 1]; g.beginPath(); g.ellipse(x, sy + bh * 0.02, bw * (0.3 + k * 0.08), bh * (0.12 + k * 0.08), 0, 0, Math.PI); g.fill(); g.stroke(); } }
  // tay — nét tay áo dày + bàn tay tròn
  const arms = o.arms ?? C.arms, hr = Math.max(lw * 1.8, h * 0.03);
  arms.forEach((k, i) => { const s = i ? 1 : -1, sx = x + s * bw * 0.44, sy2 = sy + bh * 0.12; let hx, hy2, cx, cy;
    if (k === 'down') { hx = x + s * bw * 0.58; hy2 = by - bh * 0.05; cx = x + s * bw * 0.62; cy = sy + bh * 0.5; }
    else if (k === 'chest') { hx = x + bw * 0.08; hy2 = sy + bh * 0.38; cx = x + s * bw * 0.55; cy = sy + bh * 0.6; }
    else if (k === 'pipe') { hx = x + s * bw * 0.05; hy2 = sy + bh * 0.35; cx = x + s * bw * 0.6; cy = sy + bh * 0.62; }
    else if (k === 'vsign' || k === 'orate') { hx = x + s * bw * 0.95; hy2 = sy - h * 0.12; cx = x + s * bw * 0.9; cy = sy + bh * 0.15; }
    else if (k === 'board') { hx = x + s * bw * 0.8; hy2 = sy + bh * 0.95; cx = x + s * bw * 0.7; cy = sy + bh * 0.5; }
    else if (k === 'baton') { hx = x + s * bw * 0.62; hy2 = sy + bh * 0.42; cx = x + s * bw * 0.7; cy = sy + bh * 0.6; }
    else if (k === 'cake') { hx = x + s * bw * 0.9; hy2 = sy + bh * 0.3; cx = x + s * bw * 0.8; cy = sy + bh * 0.55; }
    g.strokeStyle = C.bareArms ? INK : C.coat; g.lineWidth = Math.max(lw * 2.4, h * 0.05);
    if (C.bareArms) { g.lineWidth = Math.max(lw * 2.4, h * 0.05) + lw * 2; g.beginPath(); g.moveTo(sx, sy2); g.quadraticCurveTo(cx, cy, hx, hy2); g.stroke(); g.strokeStyle = SKIN; g.lineWidth = Math.max(lw * 2.4, h * 0.05); }
    else { g.lineWidth = Math.max(lw * 2.4, h * 0.05) + lw * 2; g.strokeStyle = INK; g.beginPath(); g.moveTo(sx, sy2); g.quadraticCurveTo(cx, cy, hx, hy2); g.stroke(); g.strokeStyle = C.coat; g.lineWidth = Math.max(lw * 2.4, h * 0.05); }
    g.beginPath(); g.moveTo(sx, sy2); g.quadraticCurveTo(cx, cy, hx, hy2); g.stroke(); g.strokeStyle = INK; g.lineWidth = lw;
    if (i === 0 && D.includes('armband')) { const u = 0.32, px = (1 - u) ** 2 * sx + 2 * u * (1 - u) * cx + u * u * hx, py = (1 - u) ** 2 * sy2 + 2 * u * (1 - u) * cy + u * u * hy2,   // băng tay đỏ TRƠN trên bắp tay trái (người dùng 10-30: không biểu tượng)
      ang = Math.atan2(2 * (1 - u) * (cy - sy2) + 2 * u * (hy2 - cy), 2 * (1 - u) * (cx - sx) + 2 * u * (hx - cx)), aw = Math.max(lw * 2.4, h * 0.05) + lw * 2.2;
      g.save(); g.translate(px, py); g.rotate(ang); g.fillStyle = '#C8262C'; g.fillRect(-h * 0.03, -aw / 2, h * 0.06, aw); g.strokeRect(-h * 0.03, -aw / 2, h * 0.06, aw);
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(0, 0, Math.min(h * 0.022, aw * 0.3), 0, 7); g.fill(); g.restore(); }
    if (k === 'chest') return;                                                           // bàn tay giấu trong áo (Napoleon)
    if (who === 'cleopatra' || who === 'antoinette') { g.fillStyle = '#E8B930'; g.beginPath(); g.arc((cx + hx) / 2, (cy + hy2) / 2, hr * 0.7, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = SKIN; g.beginPath(); g.arc(hx, hy2, hr, 0, 7); g.fill(); g.stroke();
    if (k === 'vsign') { g.lineWidth = lw * 1.6; for (const a of [-0.25, 0.25]) { g.beginPath(); g.moveTo(hx, hy2 - hr * 0.5); g.lineTo(hx + Math.sin(a) * hr * 2.6, hy2 - hr * 2.6); g.stroke(); } g.strokeStyle = SKIN; g.lineWidth = lw * 0.7; for (const a of [-0.25, 0.25]) { g.beginPath(); g.moveTo(hx, hy2 - hr * 0.8); g.lineTo(hx + Math.sin(a) * hr * 2.4, hy2 - hr * 2.4); g.stroke(); } g.strokeStyle = INK; g.lineWidth = lw; }
    if (k === 'pipe') { g.strokeStyle = '#3A2A1C'; g.lineWidth = lw * 1.4; g.beginPath(); g.moveTo(hx, hy2); g.lineTo(hx - s * hr * 2.2, hy2 - hr * 0.6); g.stroke(); g.fillStyle = '#5A3A22'; g.strokeStyle = INK; g.lineWidth = lw; g.beginPath(); g.roundRect(hx - s * hr * 0.2 - hr * 0.55, hy2 - hr * 1.6, hr * 1.1, hr * 1.4, hr * 0.3); g.fill(); g.stroke(); }
    if (k === 'board') { const bwd = h * 0.3, bht = h * 0.2; g.fillStyle = '#2F4A3A'; g.fillRect(hx - bwd / 2, hy2 - bht * 0.9, bwd, bht); g.lineWidth = lw * 1.4; g.strokeStyle = '#8A6A44'; g.strokeRect(hx - bwd / 2, hy2 - bht * 0.9, bwd, bht);
      g.fillStyle = '#F4F4F0'; g.font = `700 ${bht * 0.4}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('E=mc²', hx, hy2 - bht * 0.4); g.strokeStyle = INK; g.lineWidth = lw; g.fillStyle = SKIN; g.beginPath(); g.arc(hx, hy2, hr, 0, 7); g.fill(); g.stroke(); }
    if (k === 'baton') { g.save(); g.translate(hx, hy2); g.rotate(-0.6); g.fillStyle = '#F2EFE6'; g.fillRect(-hr * 0.4, -hr * 2.6, hr * 0.8, hr * 3.4); g.strokeRect(-hr * 0.4, -hr * 2.6, hr * 0.8, hr * 3.4); g.fillStyle = '#D8B84A'; g.fillRect(-hr * 0.45, -hr * 2.7, hr * 0.9, hr * 0.5); g.restore(); g.fillStyle = SKIN; g.beginPath(); g.arc(hx, hy2, hr, 0, 7); g.fill(); g.stroke(); }
    if (k === 'cake') { const cw = h * 0.16; g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(hx, hy2 - hr * 0.6, cw * 0.75, cw * 0.14, 0, 0, 7); g.fill(); g.stroke();
      P([[hx - cw * 0.45, hy2 - hr * 0.7], [hx + cw * 0.45, hy2 - hr * 0.7], [hx + cw * 0.3, hy2 - hr * 0.7 - cw * 0.55], [hx - cw * 0.45, hy2 - hr * 0.7 - cw * 0.35]]); fillStroke('#F6E2B8');
      g.fillStyle = '#FFFFFF'; P([[hx - cw * 0.45, hy2 - hr * 0.7 - cw * 0.35], [hx + cw * 0.3, hy2 - hr * 0.7 - cw * 0.55], [hx + cw * 0.3, hy2 - hr * 0.7 - cw * 0.45], [hx - cw * 0.45, hy2 - hr * 0.7 - cw * 0.25]]); g.fill();
      g.fillStyle = '#D62B4B'; g.beginPath(); g.arc(hx - cw * 0.05, hy2 - hr * 0.7 - cw * 0.55, cw * 0.1, 0, 7); g.fill(); g.stroke(); } });
  // đầu
  if (C.back) C.back(x, hy, r);
  g.lineWidth = lw; g.fillStyle = SKIN; g.beginPath(); g.ellipse(x, hy, r * (C.wide ?? 1), r, 0, 0, 7); g.fill(); g.stroke();
  if (who === 'churchill') { g.fillStyle = 'rgba(232,150,140,0.35)'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * r * 0.55, hy + r * 0.3, r * 0.2, r * 0.12, 0, 0, 7); g.fill(); } }
  eyes(x, hy + r * 0.05, r, o.eyes ?? C.eyes, o.look ?? 0, lw, { liner: C.liner });
  if (C.front) C.front(x, hy, r);
  mouth(x, hy + r * 0.48, r, o.mouth !== undefined ? o.mouth : C.mouth, lw);
  if (C.hat) C.hat(x, hy, r);
  if (D.includes('bowtie') || D.includes('bowtieB')) { const ty = sy + lw * 2, tw = bw * 0.15; g.fillStyle = D.includes('bowtie') ? '#24365F' : '#121214'; for (const s of [-1, 1]) { P([[x, ty], [x + s * tw, ty - tw * 0.55], [x + s * tw, ty + tw * 0.55]]); g.fill(); g.stroke(); }
    if (D.includes('bowtie')) { g.fillStyle = '#FFFFFF'; for (const [dx, dy] of [[-0.6, -0.1], [0.6, 0.15], [-0.45, 0.3], [0.5, -0.25]]) { g.beginPath(); g.arc(x + dx * tw, ty + dy * tw, tw * 0.09, 0, 7); g.fill(); } } }
  g.restore(); return { head: [x, hy], r }; }
