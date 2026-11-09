// c5 · Feeling is not proof (câu 40–43). Bốn cách giải thích vừa xem thu nhỏ thành bốn thẻ xếp hàng (DEBTS · PATTERN ·
// ABOUT-TURN · EULER — KHÔNG gạch, §58) → "FEELS RIGHT ≠ PROVED" → thẻ nhấc khỏi thảm lúc "feelings / stories / trust"
// → khay "PROOF" trống mở ra: bốn ô "already agreed to" → một lối ra duy nhất (dẫn sang hồi III, d1 dán bốn thẻ luật).
import { W, C, ARC, clamp, prog, outCubic, ground, drift, card, typed, label, eq, num, tile, line, arrow, must,
  lookup } from '../kit.js';

const CW = 380, CH = 230, CY = 250, CX = i => (W - (4 * CW + 3 * 36)) / 2 + i * (CW + 36);

function panel(g, x, y, w, h, { dash = [], color = C.dim, fill = 'rgba(14,21,30,0.5)', lw = 2 } = {}) {
  g.save(); g.fillStyle = fill; g.beginPath(); g.roundRect(x, y, w, h, 12); g.fill();
  g.strokeStyle = color; g.lineWidth = lw; g.setLineDash(dash); g.stroke(); g.restore();
}
const rectPath = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];

export default class Feeling {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c5');
    this.T = {
      all: w(40, 'all'), these: w(40, 'these'), rule: w(40, 'rule'), feel: w(40, 'feel'), reasonable: w(40, 'reasonable'),
      feeling: w(40, 'feeling'), right: w(40, 'right'), not: w(40, 'not'), proved: w(40, 'proved'),
      lean: w(41, 'lean'), feelings: w(41, 'feelings'), stories: w(41, 'stories'), trust: w(41, 'trust'),
      it: w(42, 'it'), starts: w(42, 'starts'), only: w(42, 'only'), things: w(42, 'things'), agreed: w(42, 'agreed'), shows: w(42, 'shows'),
      conclusion: w(42, 'conclusion'), has: w(42, 'has'), no: w(42, 'no'), out: w(42, 'out'),
      so: w(43, 'so'), do: w(43, 'do'), now: w(43, 'now'),
    };
    // dãy của c2: a × (−2) với a = 3 … −1, mỗi bậc +2
    this.SEQ = [3, 2, 1, 0, -1].map(a => must(`${a} * (-2)`, [-6, -4, -2, 0, 2][3 - a]));
    this.START = L(40).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.all, kind: 'chip' },                       // bốn thẻ rơi xuống thảm (một tiếng cho cả hàng)
      { t: T.proved, kind: 'tick' },                    // FEELS RIGHT ≠ PROVED
      { t: T.starts, kind: 'snap' },                    // khay PROOF mở
      { t: T.conclusion, kind: 'tick' },                // lối ra duy nhất
    ];
  }
  render(g, t) {
    const c = drift(t, this.FROM, { vx: 2, vy: 1, max: 40 });
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    this.cards(g, t); this.verdict(g, t); this.tray(g, t);
    g.restore();
    card(g, prog(t, this.FROM + 0.4, this.FROM + 1.8), 'ACT II', 'FEELING IS NOT PROOF');
  }
  cards(g, t) {
    const T = this.T, drop = [T.all, T.these, T.rule, T.feel - 0.1], away = [T.stories, T.feelings, T.feelings + 0.25, T.trust];
    ['debts', 'pattern', 'about-turn', 'euler'].forEach((name, i) => {
      const kin = prog(t, drop[i] - 0.15, drop[i] + 0.3), kout = outCubic(prog(t, away[i], away[i] + 0.55));
      if (kin <= 0 || kout >= 1) return;
      const x = CX(i), y = CY, e = outCubic(kin);
      g.save(); g.translate(x + CW / 2, y + CH / 2 - (1 - e) * 60 - kout * 760); g.rotate((i % 2 ? 0.012 : -0.015) * e + kout * (i % 2 ? 0.2 : -0.2));
      g.scale(1 + (1 - e) * 0.08, 1 + (1 - e) * 0.08); g.translate(-CW / 2, -CH / 2); g.globalAlpha = clamp(kin * 3);
      g.save(); g.shadowColor = 'rgba(5,10,18,0.5)'; g.shadowBlur = 16 + kout * 20; g.shadowOffsetY = 8 + kout * 20;
      panel(g, 0, 0, CW, CH); g.restore();
      label(g, name, 24, 42, 1, { color: C.ink, size: 20 });
      this.mini(g, i, CW / 2, 130);
      label(g, 'feels right', 24, CH - 22, prog(t, T.feel + i * 0.15, T.reasonable + 0.3 + i * 0.15), { size: 18 });
      g.restore();
    });
  }
  mini(g, i, cx, cy) {                                // hình thu nhỏ của từng cách giải thích (c1, c2, c3, c4)
    if (i === 0) for (let j = 0; j < 3; j++) tile(g, cx - 75 + j * 52, cy - 22, 44, 'n');
    if (i === 1) eq(g, this.SEQ.map((v, j) => [num(v) + (j < 4 ? '  ' : '?'), v > 0 ? C.posT : v < 0 ? C.negT : C.ink]), cx, cy + 12, 32, 1, { align: 'center' });
    if (i === 2) {
      line(g, [[cx - 130, cy + 30], [cx + 130, cy + 30]], C.dim, 2);
      line(g, [[cx, cy + 20], [cx, cy + 40]], C.dim, 2.5);
      arrow(g, cx + 80, cy + 18, cx - 80, cy + 18, 1, { color: C.ink, bend: 70, w: 3 });
    }
    if (i === 3) {
      [['ab', C.posT], ['−ab', C.negT]].forEach(([s, col], j) => {
        const bx = cx - 130 + j * 140;
        g.save(); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([7, 6]); g.beginPath(); g.roundRect(bx, cy - 40, 120, 76, 10); g.stroke(); g.restore();
        eq(g, [[s, col]], bx + 60, cy + 12, 36, 1, { align: 'center' });
      });
    }
  }
  verdict(g, t) {                                     // FEELS RIGHT ≠ PROVED — trượt xuống khỏi thảm khi khay mở
    const T = this.T, k = outCubic(prog(t, T.it - 0.1, T.it + 0.5));
    if (k >= 1) return;
    g.save(); g.translate(0, k * 560);
    const font = `800 72px ${ARC}`, y = 660;
    g.save(); g.font = font; g.letterSpacing = '2px'; const wa = g.measureText('FEELS RIGHT ').width, wb = g.measureText('≠ ').width,
      wc = g.measureText('PROVED').width; g.restore();
    const x0 = W / 2 - (wa + wb + wc) / 2;
    typed(g, 'FEELS RIGHT', x0, y, prog(t, T.feeling, T.right + 0.3), font, C.ink, { ls: 2 });
    typed(g, '≠', x0 + wa, y, prog(t, T.not, T.not + 0.15), font, C.ink, { ls: 2 });
    typed(g, 'PROVED', x0 + wa + wb, y, prog(t, T.proved, T.proved + 0.35), font, C.ink, { ls: 2 });
    g.restore();
  }
  tray(g, t) {                                        // khay PROOF: viền mở theo chu vi, bốn ô trống → một lối ra
    const T = this.T, kt = prog(t, T.starts - 0.1, T.only + 0.5);
    if (kt <= 0) return;
    const X = 160, Y = 300, Wd = W - 320, Hd = 440;
    g.save(); g.fillStyle = 'rgba(14,21,30,0.35)'; g.globalAlpha = clamp(kt * 2); g.beginPath(); g.roundRect(X, Y, Wd, Hd, 16); g.fill(); g.restore();
    line(g, rectPath(X, Y, Wd, Hd), C.ink, 3, { k: kt });
    line(g, rectPath(X + 12, Y + 12, Wd - 24, Hd - 24), `rgba(${C.grid},0.45)`, 1.5, { k: kt });
    label(g, 'proof', X + 40, Y + 58, prog(t, T.starts, T.starts + 0.4), { color: C.ink, size: 28 });
    const sy = Y + 110, sw = 250, sh = 200, solid = prog(t, T.do, T.now + 0.3);
    for (let i = 0; i < 4; i++) {
      const k = prog(t, T.things - 0.2 + i * 0.25, T.things + 0.2 + i * 0.25), sx = X + 40 + i * (sw + 30);
      if (k <= 0) continue;
      line(g, rectPath(sx, sy, sw, sh), C.dim, 2, { dash: [9, 7], k });
      const ks = clamp(solid * 4 - i);
      if (ks > 0) line(g, rectPath(sx, sy, sw, sh), C.ink, 2.5, { k: ks });
    }
    label(g, 'already agreed to', X + 40 + (4 * sw + 3 * 30) / 2, sy + sh + 50, prog(t, T.agreed - 0.4, T.agreed + 0.4), { align: 'center', size: 20 });
    const ax0 = X + 40 + 4 * sw + 3 * 30 + 20, ox = ax0 + 120, ow = X + Wd - 40 - ox;
    arrow(g, ax0, sy + sh / 2, ox - 14, sy + sh / 2, prog(t, T.shows, T.conclusion), { color: C.ink, w: 3 });
    const ko = prog(t, T.conclusion - 0.1, T.conclusion + 0.3);
    if (ko > 0) line(g, rectPath(ox, sy, ow, sh), C.ink, 2.5, { k: ko });
    eq(g, [['(−a)', C.negT], [' × '], ['(−b)', C.negT]], ox + ow / 2, sy + sh / 2 + 14, 38, prog(t, T.conclusion, T.has + 0.2), { align: 'center' });
    label(g, 'no other way out', ox + ow / 2, sy + sh + 50, prog(t, T.no, T.out + 0.3), { align: 'center', size: 20, color: C.ink });
  }
}
