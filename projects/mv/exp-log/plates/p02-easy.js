// P02 easy — "2³ — dễ ợt" · 4.78 → 8.00 (TREATMENT P02)
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { decodeLine, burstText } from '../../../../engine/lyric.js';
import { drawTransit, presence } from '../../../../engine/transit.js';
import { PAL, CUE } from '../song.js';

const FACE_X = 1240, FACE_Y = 900, FACE_H = 760;
const CUBE = 92, OX = 300, OY = 820;              // gốc khối 2×2×2 (góc trước-dưới-trái)
const T_END = 8.00, OUT_DUR = 0.45;               // nhân vật rời trước khi cảnh sau vào
const T_BURST = 7.60, BURST_DUR = 0.35;          // chữ vỡ thành ký hiệu, không fade
const STAMP_X = 775, STAMP_Y = 385, SMIRK = 8;    // mouth-8: răng nhếch, dễ đọc hơn mouth-2

// Vị trí khối đơn vị thứ i trong khối 2×2×2, chiếu isometric đơn giản
const slot = i => {
  const x = i & 1, z = (i >> 1) & 1, y = (i >> 2) & 1;
  return [OX + x * CUBE + z * CUBE * 0.5, OY - y * CUBE - z * CUBE * 0.5];
};

function cube(g, x, y, a) {
  g.save(); g.globalAlpha = a;
  g.fillStyle = PAL.fwd; g.strokeStyle = PAL.bg; g.lineWidth = 3;
  g.beginPath(); g.rect(x, y - CUBE, CUBE, CUBE); g.fill(); g.stroke();                  // mặt trước
  g.fillStyle = PAL.fwdCore;
  g.beginPath(); g.moveTo(x, y - CUBE); g.lineTo(x + CUBE * .5, y - CUBE * 1.5); g.lineTo(x + CUBE * 1.5, y - CUBE * 1.5); g.lineTo(x + CUBE, y - CUBE); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = PAL.fwd;                                                                     // mặt phải, tối hơn
  g.beginPath(); g.moveTo(x + CUBE, y - CUBE); g.lineTo(x + CUBE * 1.5, y - CUBE * 1.5); g.lineTo(x + CUBE * 1.5, y - CUBE * .5); g.lineTo(x + CUBE, y); g.closePath(); g.fill();
  g.fillStyle = 'rgba(11,15,30,0.3)'; g.fill(); g.stroke();
  g.fillStyle = PAL.bg; g.font = '900 64px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('2', x + CUBE / 2, y - CUBE / 2 + 4);
  g.restore();
}

// Khối i rơi đúng nốt CUE.keysCubes[i]. Khối 0–1 rơi trước mốc P02 (4.78) nên P01 cũng gọi hàm này
// → một nơi vẽ, rơi liên tục qua đường cắt. Vẽ lớp sau → trước, dưới → trên để che đúng.
export function drawCubes(g, t, ids = [2, 3, 6, 7, 0, 1, 4, 5]) {
  for (const i of ids) {
    const ti = CUE.keysCubes[i];
    if (t < ti - 0.18) continue;
    const f = outBack(clamp((t - (ti - 0.18)) / 0.18));
    const [x, y] = slot(i);
    cube(g, x, y - (1 - f) * 260, clamp(f * 1.5));
  }
}

export default class P02 {
  backdrop = { glow: 0.8, haloX: FACE_X, haloY: 520 };
  async init(s) {
    this.m = s.mascot; this.face = s.face; this.tl = s.tl; this.beat = s.beat;
    this.q = s.tl.line('Two to the three?'); this.easy = s.tl.line('Easy.');
    this.tOut = T_END - OUT_DUR;
  }
  portrait(g, t) {
    // cùng ảnh (viseme-1 = pose 'face'), cùng x/y/h → không giật khi đổi giữa ký hiệu và mặt màu
    const p = presence(t, this.q.start, this.tOut, { inDur: 0.3, outDur: OUT_DUR });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FACE_X, FACE_Y, FACE_H, 'rows', 'in', 0.6 + 0.4 * p.k, { t, cell: 7, seed: 1 });
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FACE_X, FACE_Y, FACE_H, 'digits', 'out', p.k, { t, cell: 7, seed: 1 });
    else if (p.state === 'hold') this.face.draw(g, FACE_X, FACE_Y, FACE_H, t >= this.easy.start ? SMIRK : 1);
  }
  render(g, t) {
    this.portrait(g, t);
    // 2³ = ?
    decodeLine(g, this.tl.wordsOf(this.q), t, 180, 240, { font: '500 34px "IBM Plex Mono"', colBase: PAL.truth, colKey: PAL.fwd, keys: ['three'], burstAt: this.tOut });
    const B = { dur: BURST_DUR };
    burstText(g, '2', t, T_BURST, 180, 440, '900 150px "Archivo"', PAL.truth, { ...B, seed: 2 });
    burstText(g, '3', t, T_BURST, 270, 370, '900 80px "Archivo"', PAL.fwd, { ...B, seed: 3 });
    const eight = t >= this.easy.start;
    burstText(g, eight ? '= 8' : '= ?', t, T_BURST, 360, 440, '900 150px "Archivo"', eight ? PAL.fwd : PAL.truth, { ...B, seed: 4 });
    drawCubes(g, t);
    // "Easy." — con dấu vàng, cạnh `= 8`, không đè khối; hết lượt: khung co lại, chữ vỡ thành ký hiệu
    if (t >= this.easy.start) {
      const pop = 1 + 0.6 * (1 - smooth(prog(t, this.easy.start, this.easy.start + 0.12)));
      const s = pop * (1 - smooth(prog(t, T_BURST, T_BURST + BURST_DUR)));
      if (s > 0.01) {
        g.save(); g.translate(STAMP_X, STAMP_Y); g.rotate(-0.12);
        g.save(); g.scale(s, s); g.strokeStyle = PAL.fwd; g.lineWidth = 8; g.strokeRect(-115, -50, 230, 100); g.restore();
        burstText(g, 'EASY', t, T_BURST, 0, 26 * s, '900 74px "Archivo"', PAL.fwd, { dur: BURST_DUR, seed: 5, align: 'center' });
        g.restore();
      }
    }
  }
}
