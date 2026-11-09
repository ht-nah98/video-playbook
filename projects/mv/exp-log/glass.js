// Tấm kính quầy giao dịch của ngân hàng — P16 khắc câu hỏi lên kính và cho nó rạn theo trống dồn,
// P17 (98.88) đập vỡ nó. Vết rạn là hàm thuần của (danh sách cú đập, t): mỗi cú một chùm tia gãy khúc.
import { clamp, prog, smooth, hash, outBack } from '../../../engine/lib.js';
import { PAL, beat } from './song.js';

export const GLASS = { x0: 150, y0: 64, x1: 1770, y1: 936 };

/** Các cú đập: mỗi beat trong [t0, t1); ô nhịp cuối dồn nửa beat. Điểm đập dồn dần về tâm khung. */
export function crackHits(t0, t1, roll) {
  const hits = [];
  for (let k = Math.ceil((t0 - beat.T0) / beat.BEAT); ; k++) {
    const tk = beat.beatT(k);
    if (tk >= t1) break;
    hits.push(tk);
    if (tk >= roll && tk + beat.BEAT / 2 < t1) hits.push(tk + beat.BEAT / 2);
  }
  return hits.map((tk, i) => {
    const c = i / Math.max(1, hits.length - 1);                  // về sau: gần tâm hơn
    const r = (1 - 0.75 * c) * 620, a = hash(i * 4.7 + 1) * Math.PI * 2;
    return { t: tk, x: 960 + Math.cos(a) * r * hash(i * 2.3), y: 500 + Math.sin(a) * r * 0.55 * hash(i * 6.1), seed: i };
  });
}

/** Một chùm rạn: 6–9 tia gãy khúc + nhánh, dài ra trong 0.12s. */
function crack(g, h, t) {
  const grow = smooth(clamp((t - h.t) / 0.12));
  if (grow <= 0) return;
  const n = 6 + Math.floor(hash(h.seed * 3.3) * 4);
  g.beginPath();
  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2 + hash(h.seed * 9.1 + i) * 0.7, x = h.x, y = h.y;
    const L = (140 + 260 * hash(h.seed * 5.3 + i * 1.7)) * grow;
    g.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      a += (hash(h.seed * 13 + i * 7 + s) - 0.5) * 0.7;
      x += Math.cos(a) * L / 4; y += Math.sin(a) * L / 4; g.lineTo(x, y);
      if (s === 1 && hash(h.seed + i * 3 + s) > 0.5) {           // nhánh
        const b = a + (hash(h.seed * 2 + i) > 0.5 ? 0.8 : -0.8);
        g.moveTo(x, y); g.lineTo(x + Math.cos(b) * L * 0.3, y + Math.sin(b) * L * 0.3); g.moveTo(x, y);
      }
    }
  }
  // vòng vỡ quanh điểm đập
  const R = 26 + 20 * hash(h.seed * 8.8);
  for (let i = 0; i < 7; i++) {
    const a0 = i / 7 * Math.PI * 2, a1 = a0 + Math.PI * 2 / 7;
    g.moveTo(h.x + Math.cos(a0) * R * grow, h.y + Math.sin(a0) * R * grow);
    g.lineTo(h.x + Math.cos(a1) * R * grow * 1.15, h.y + Math.sin(a1) * R * grow * 1.15);
  }
  g.stroke();
}

/** Tấm kính: ánh xanh nhạt + vệt phản chiếu trôi chậm + khung thép + vết rạn đã có tới t. */
export function glassPane(g, t, { alpha = 1, hits = [], strain = 0 } = {}) {
  if (alpha <= 0) return;
  const { x0, y0, x1, y1 } = GLASS;
  g.save(); g.globalAlpha = alpha;
  g.save(); g.beginPath(); g.rect(x0, y0, x1 - x0, y1 - y0); g.clip();
  g.fillStyle = 'rgba(63,184,255,0.05)'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
  for (let i = 0; i < 3; i++) {                                    // vệt phản chiếu chéo trôi theo t
    const x = x0 - 600 + (((t * 22 + i * 640) % 2600));
    const gr = g.createLinearGradient(x, 0, x + 260, 0);
    gr.addColorStop(0, 'rgba(244,241,234,0)'); gr.addColorStop(0.5, `rgba(244,241,234,${0.06 + 0.03 * i})`); gr.addColorStop(1, 'rgba(244,241,234,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x, y1); g.lineTo(x + 260, y1); g.lineTo(x + 560, y0); g.lineTo(x + 300, y0); g.fill();
  }
  g.strokeStyle = `rgba(244,241,234,${0.55 + 0.35 * strain})`; g.lineWidth = 2; g.lineCap = 'round'; g.lineJoin = 'round';
  g.shadowColor = PAL.backCore; g.shadowBlur = 6;
  for (const h of hits) if (t >= h.t) crack(g, h, t);
  g.restore();
  // khung thép quầy giao dịch + khe nói ở dưới
  g.strokeStyle = '#33456F'; g.lineWidth = 22; g.strokeRect(x0, y0, x1 - x0, y1 - y0);
  g.strokeStyle = '#4A5F8E'; g.lineWidth = 3; g.strokeRect(x0 + 13, y0 + 13, x1 - x0 - 26, y1 - y0 - 26);
  g.fillStyle = '#4A5F8E';
  for (const [x, y] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) { g.beginPath(); g.arc(x, y, 9, 0, Math.PI * 2); g.fill(); }
  g.restore();
}

/** Chữ khắc mờ trên kính: viền sáng + ruột rất nhạt. */
export function etch(g, text, x, y, font, k, { col = PAL.truth } = {}) {
  if (k <= 0) return;
  g.save(); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  const w = g.measureText(text).width;
  g.beginPath(); g.rect(x - w / 2 - 10, y - 200, (w + 20) * k, 400); g.clip();          // khắc từ trái sang phải
  g.fillStyle = 'rgba(244,241,234,0.12)'; g.fillText(text, x, y);
  g.strokeStyle = col; g.lineWidth = 2.5; g.shadowColor = col; g.shadowBlur = 10; g.strokeText(text, x, y);
  g.restore();
}

/** Ô vuông khắc trên kính (□ đỏ của câu hỏi / xanh của câu trả lời). */
export function glassBox(g, x, y, s, col, a = 1) {
  g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = Math.max(6, s * 0.09); g.shadowColor = col; g.shadowBlur = 20;
  g.strokeRect(x - s / 2, y - s / 2, s, s); g.restore();
}

/** Mặt sau dòng chữ trên kính: □ = log₁.₀₇ 2; từ `foundAt` □ hoá xanh chứa 10.2. (P16 vẽ, P17 phá vỡ.) */
export function glassAnswer(g, t, foundAt) {
  const found = t >= foundAt;
  glassBox(g, 700, 200, 112, found ? PAL.back : PAL.block);
  if (found) {
    const s = outBack(clamp((t - foundAt) / 0.25));
    g.save(); g.translate(700, 204); g.scale(s, s); g.font = '900 52px "Archivo"'; g.fillStyle = PAL.backCore;
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('10.2', 0, 0); g.restore();
  }
  etch(g, '=', 850, 210, '900 120px "Archivo"', 1);
  etch(g, 'log', 1040, 210, '900 120px "Archivo"', 1, { col: PAL.backCore });
  etch(g, '1.07', 1185, 260, '900 56px "Archivo"', 1, { col: PAL.backCore });
  etch(g, '2', 1295, 210, '900 120px "Archivo"', 1, { col: PAL.backCore });
}
