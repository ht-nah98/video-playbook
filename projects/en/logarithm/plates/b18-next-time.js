// b18 · Next time (câu 82–84, OUTRO) — DNA blocks. Câu 82: ván thước ×10 thu nhỏ (kiến ↔ cá voi, ≈ 11 STEPS OF ×10) rồi × xoay thành +
// ("HARD" → "EASY"); câu 83: ba cột — MAGNITUDE 7 / 100 DECIBELS / 6% SAVINGS — mỗi cột một tháp gạch, "try counting the bricks" → sticker
// đếm tầng; câu 84: tháp khối "99% from scratch" + SUBSCRIBE (navy) + LIKE, đứng yên ≥ 4 s tới hết (kể cả TAIL 2 s); mascot pose-wave nói.
import { H, C, AR, clamp, prog, lookup, must, outCubic, ground, block, tower, coinStack, tag, secTag, text, rr, icon, logBoard, brace, animal,
  figure, ANT_MG, STEPS, BOARD, COIN_SM, BASE_Y } from '../kit.js';

const lerp = (a, b, u) => a + (b - a) * u;
const nudge = (t, a) => 1 + 0.18 * Math.sin(Math.PI * prog(t, a, a + 0.35));
const scaled = (g, x, y, s, fn) => { g.save(); g.translate(x, y); g.scale(s, s); g.translate(-x, -y); fn(); g.restore(); };
const gold = { color: C.goldInk, edge: C.gold };
const COLS = [760, 1160, 1560];

export default class NextTime {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b18');
    this.START = L(82).start;
    this.FROM = Math.max(this.START - 1.2, L(81).end + 0.5);
    this.END = L(84).end;
    this.T = {
      shrink: w(82, 'shrink'), enormous: w(82, 'enormous'), tiny: w(82, 'tiny'), size: w(82, 'size'), hard: w(82, 'hard'), mult: w(82, 'multiplying'),
      easy: w(82, 'easy'), adding: w(82, 'adding'),
      magnitude: w(83, 'magnitude'), sound: w(83, 'sound'), savings: w(83, 'savings'), try_: w(83, 'try'), counting: w(83, 'counting'), bricks: w(83, 'bricks'),
      thanks: w(84, 'thanks'), watching: w(84, 'watching'), enjoyed: w(84, 'enjoyed'), like: w(84, 'like'), subscribe: w(84, 'subscribe'),
    };
    const T = this.T;
    this.RULER_OUT = [T.hard - 0.4, T.hard + 0.4];
    this.CLEAR1 = [T.easy + 1.5, T.easy + 2.2];                       // × / + / HARD / EASY bay đi
    this.CLEAR2 = [L(83).end + 0.3, L(83).end + 0.9];               // ba cột bay đi
    this.MASC = [T.thanks - 0.1, this.END + 2.0];
    must(`Math.round(${STEPS})`, 11); must('Math.round(7)', 7);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.enormous + 0.05, 'pop'), c(T.tiny + 0.05, 'pop'), c(T.size + 0.1, 'pen'),
      c(T.hard + 0.05, 'card'), c(T.mult + 0.05, 'wood'), c(T.adding + 0.2, 'tick'), c(T.magnitude, 'card'), c(T.sound + 0.05, 'beep'), c(T.savings + 0.05, 'coin'),
      c(T.counting + 0.1, 'tick'), c(T.thanks + 0.5, 'wood'), c(T.watching + 0.5, 'wood'), c(T.like, 'pop'), c(T.subscribe + 0.1, 'wood')];
  }
  /** Dấu × (đỏ = cơ số) xoay thành + (tím = logarit): hai thanh bo góc, quay -45° (kit.promiseBlock ②, phóng to). */
  cross(g, cx, cy, turn, k) {
    if (k <= 0) return;
    const e = outCubic(clamp(k)), tn = turn >= 0.5;
    g.save(); g.translate(cx, cy); g.rotate(-Math.PI / 4 * turn * turn * (3 - 2 * turn)); g.scale(e * 1.5, e * 1.5);
    g.fillStyle = 'rgba(40,60,80,0.2)'; for (const a of [Math.PI / 4, -Math.PI / 4]) { g.save(); g.translate(5, 7); g.rotate(a); g.fill(rr(-90, -20, 180, 40, 12)); g.restore(); }
    g.fillStyle = tn ? C.log : C.base; for (const a of [Math.PI / 4, -Math.PI / 4]) { g.save(); g.rotate(a); g.fill(rr(-90, -20, 180, 40, 12)); g.restore(); }
    g.restore();
  }
  render(g, t) {
    const T = this.T, S = this.START, base = BASE_Y;
    ground(g, 'table');
    secTag(g, 'Next time', { k: prog(t, S, S + 0.4), t });
    // ── câu 82: ván thước thu nhỏ ──
    const rk = prog(t, this.FROM + 0.3, this.FROM + 1.1) - prog(t, ...this.RULER_OUT);
    if (rk > 0) {
      const { X, Y, PT } = logBoard(g, { k: rk, towers: 11 * prog(t, T.shrink - 0.2, T.shrink + 0.6), labels: 0 });
      const ax = X(0) + Math.log10(ANT_MG) * BOARD.step;
      animal(g, 'whale', X(11) - 34, Y(11) - 12, 0.58, { k: prog(t, T.enormous, T.enormous + 0.3) });
      animal(g, 'ant', ax, PT - 10, 1, { k: prog(t, T.tiny, T.tiny + 0.3) });
      const kb = prog(t, T.size, T.size + 0.5) * rk;
      brace(g, 300, Y(11), PT, kb);
      if (rk >= 1) { const ks = prog(t, T.size, T.size + 0.35);
        text(g, `≈ ${Math.round(STEPS)} STEPS`, 340, 236, { font: `900 64px ${AR}`, color: C.logInk, k: ks }); text(g, 'OF ×10', 340, 300, { font: `900 64px ${AR}`, color: C.baseInk, k: prog(t, T.size + 0.25, T.size + 0.5) }); }
    }
    // × → + (HARD → EASY)
    const c1 = outCubic(prog(t, ...this.CLEAR1)) ** 1.4 * 1000;
    if (c1 < 1000) { g.save(); g.translate(0, -c1);
      this.cross(g, 960, 620, prog(t, T.adding - 0.05, T.adding + 0.45), prog(t, T.mult, T.mult + 0.4));
      tag(g, 'HARD', 640, 620, { size: 48, k: prog(t, T.hard, T.hard + 0.3) });
      tag(g, 'EASY', 1290, 620, { size: 48, k: prog(t, T.easy, T.easy + 0.3), edge: C.log, color: C.logInk });
      g.restore(); }
    // ── câu 83: ba cột ──
    const c2 = outCubic(prog(t, ...this.CLEAR2)) ** 1.4 * 1100;
    if (c2 < 1100) {
      g.save(); g.translate(0, -c2);
      const cnt = 3 * prog(t, T.counting, T.counting + 0.8);
      [[T.magnitude, 'MAGNITUDE 7', 'quake'], [T.sound, '100 DECIBELS', 'speaker'], [T.savings, '6% SAVINGS', 'coin']].forEach(([a, label, kind], i) => {
        const x = COLS[i], b0 = T.magnitude - 0.1 + i * 0.2, kd = prog(t, b0, b0 + 0.45);   // ba cột rơi gần như cùng lúc; nhãn bật ở từ của nó
        tower(g, x, base, 3, { s: 70, k: 3 * kd, count: cnt });
        const ki = prog(t, b0 + 0.3, b0 + 0.65);
        if (kind === 'coin') { if (ki > 0) coinStack(g, x, 610, 2 * ki, { ...COIN_SM, seed: 7 }); } else icon(g, kind, x, 556, 54, ki);
        tag(g, label, x, base + 72, { size: 38, ...(kind === 'coin' ? gold : {}), k: prog(t, a, a + 0.3) });
      });
      g.restore();
    }
    // ── câu 84: outro "99% from scratch" + LIKE + SUBSCRIBE (đứng yên từ "subscribe" tới hết) ──
    const k1 = prog(t, T.thanks + 0.25, T.thanks + 0.65), k2 = prog(t, T.watching + 0.05, T.watching + 0.45), pu = nudge(t, T.enjoyed);
    scaled(g, 970, base - 70, pu, () => {
      block(g, 700, base, 140, { w: 230, color: C.birch, label: '99%', k: k1 });
      block(g, 1085, base, 140, { w: 540, color: C.birch, label: 'from scratch', k: k2 });
    });
    block(g, 970, base - 140, 110, { w: 600, color: C.ink, label: 'SUBSCRIBE', k: prog(t, T.subscribe - 0.3, T.subscribe + 0.1) });
    tag(g, 'LIKE', 1560, 700, { size: 52, k: prog(t, T.like, T.like + 0.3) });
    const km = prog(t, this.MASC[0], this.MASC[0] + 0.5);
    if (km > 0) figure(g, 'wave', 200, H, 262, km, { t });
  }
}
