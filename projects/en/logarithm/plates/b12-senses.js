// b12 · Your own senses — DNA blocks. "curious" ? → "senses" + khối log tím → khối 10 kg, thêm khối +1 (rung — "feel it") → khối 100 kg,
// thêm +1 (không rung — "barely notice") → +1 nhấc đi, khối +10 rơi (rung) → "RATIOS" / "DIFFERENCES" bị băng keo xám gạch → loa +
// sóng âm ("decibels … the way we hear"). Mascot ponder (phải) nói cả mục.
import { H, C, AR, prog, lookup, outCubic, ground, block, tag, tape, icon, figure, secTag, line, clamp, actorOn } from '../kit.js';
import { draw, F, HANDS, fast } from '../actor.js';

const sway = (t, ph = 0) => 0.018 * Math.sin(t * 2.1 + ph);
const wob = (t, a, amp) => { const u = prog(t, a, a + 1.0); return amp * Math.sin(t * 42) * (1 - u) * (u > 0 ? 1 : 0); };

export default class Senses {
  static ERA = 'table';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b12');
    this.T = {
      curious: w(55, 'curious'), senses: w(55, 'senses'), logs: w(55, 'logarithms'),
      ten: w(56, 'ten'), kil: w(56, 'kilograms'), one: w(56, 'one'), feel: w(56, 'feel'),
      hund: w(57, 'hundred'), kil2: w(57, 'kilograms'), one2: w(57, 'one'), barely: w(57, 'barely'),
      feel3: w(58, 'feel'), add3: w(58, 'add'), ten3: w(58, 'ten'),
      notice4: w(59, 'notice'), ratios: w(59, 'ratios'), diff: w(59, 'differences'), decib: w(59, 'decibels'), hear: w(59, 'hear'),
    };
    this.START = L(55).start;
    this.FROM = Math.max(this.START - 1.2, L(54).end + 0.5);
    this.END = L(59).end;
    this.OUT = this.T.senses + 2.0;                                  // thẻ "?" / "YOUR SENSES" / log bay đi trước khối 10 kg
    // ── MASCOT là giác quan (LESSONS §175): đỡ khối trên đầu; +1 lên 10 kg → oằn gối; +1 lên 100 kg → chỉ chớp mắt; +10 → oằn ──
    const T = this.T, XS = 820;
    const D10 = [T.ten - 0.3, T.ten + 0.05], TS10 = [T.hund - 0.75, T.hund - 0.2], D100 = [T.hund - 0.3, T.hund + 0.08], TS100 = [T.notice4, T.notice4 + 0.6];
    const OUTW = [TS100[1] + 0.45, TS100[1] + 1.95];
    Object.assign(this, { D10, TS10, D100, TS100, WIN: [T.senses - 0.2, OUTW[1]] }); actorOn(...this.WIN);
    // mascot góc thẳng (bản 4): hai tay đỡ khối trên đỉnh tóc (actor `hold`), khuỵu theo sức nặng — +1 lên 10 kg khuỵu sâu, +1 lên 100 kg chỉ chớp mắt
    const up = (o = {}) => F({ x: XS, ...HANDS.up, lookY: -0.4, mood: 'angry', mouth: 'flat', ...o });
    this.ACT = ({
      keys: [
        [T.senses + 1.5, F({ x: XS })],
        [D10[0] - 0.1, F({ x: XS, lookY: -1, mood: 'shock', mouth: 'o' })],                         // ngước: có gì đang rơi
        [D10[0] + 0.2, up({ mood: 'shock', mouth: 'o' }), fast],                                      // giơ tay đón
        [D10[1] + 0.06, up({ c: 0.35 }), fast],                                                       // đỡ: nhún
        [D10[1] + 0.4, up({ c: 0.15 })],
        [T.one + 0.05, up({ c: 0.15 })],
        [T.one + 0.2, up({ c: 0.65, mouth: 'wavy', sweat: 1, lookY: 0.2 }), fast],                   // +1 → KHUỴU SÂU ("you feel it")
        [T.feel + 0.3, up({ c: 0.55, mouth: 'wavy', sweat: 1, lookY: 0.2 })],
        [TS10[0], up({ c: 0.4, lean: -0.04 })],
        [TS10[0] + 0.25, F({ x: XS, lean: -0.1, ax: -0.55, ay: 0.95, bx: -0.15, by: 1.1, look: -1, lookY: -0.5, yaw: -0.5, mood: 'happy', mouth: 'grin' }), fast],   // hất sang trái
        [D100[0] + 0.05, F({ x: XS, lookY: -1, mood: 'shock', mouth: 'o' })],                         // lại có gì rơi
        [D100[1] - 0.02, up({ mood: 'shock', mouth: 'o' }), fast],
        [D100[1] + 0.1, up({ c: 0.55, sweat: 1 }), fast],                                             // 100 kg: nhún sâu hơn
        [D100[1] + 0.5, up({ c: 0.4, sweat: 1 })],
        [T.one2 + 0.3, up({ c: 0.4, mood: 'deadpan' })],                                              // +1: không đổi gì — chỉ chớp mắt
        [T.ten3 + 0.05, up({ c: 0.4, mood: 'deadpan' })],
        [T.ten3 + 0.2, up({ c: 0.75, mouth: 'wavy', sweat: 1, lookY: 0.2 }), fast],                  // +10 → khuỵu sâu
        [TS100[0], up({ c: 0.6, lean: 0.04, sweat: 1 })],
        [TS100[0] + 0.3, F({ x: XS, lean: 0.1, ax: 0.15, ay: 1.1, bx: 0.55, by: 0.95, look: 1, lookY: -0.5, yaw: 0.5, mood: 'happy', mouth: 'grin' }), fast],    // hất sang phải
        [OUTW[0], F({ x: XS, look: -0.8, yaw: -0.6, mood: 'smug', mouth: 'smirk' })],
        [OUTW[1], F({ x: -120, look: -0.8, yaw: -0.6 })],
      ],
      walks: [[-120, XS, T.senses - 0.2, T.senses + 1.5], [XS, -120, ...OUTW]],
      hold: t => clamp(prog(t, D10[1] - 0.1, D10[1]) - prog(t, TS10[0] + 0.1, TS10[0] + 0.2) + prog(t, D100[1] - 0.05, D100[1]) - prog(t, TS100[0] + 0.15, TS100[0] + 0.25)),
    });
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.curious, 'question'), c(T.logs + 0.1, 'wood'), c(this.D10[1], 'impact'), c(T.one + 0.1, 'impact'), c(this.TS10[1], 'wood'), c(this.D100[1], 'impact'), c(this.TS100[1], 'wood'), c(T.one2 + 0.1, 'tick'),
      c(T.ten3 + 0.05, 'impact'), c(T.diff + 0.4, 'tear'), c(T.decib, 'beep')];
  }
  render(g, t) {
    const T = this.T, L1 = 500, R1 = 1150, base = 860;
    ground(g, 'table');
    // ô chờ hai chồng
    const ks = prog(t, this.FROM + 0.3, this.FROM + 0.7), kd = prog(t, this.START + 0.35, this.START + 0.65);
    if (ks > 0 && kd < 1) { g.save(); g.globalAlpha = ks; g.setLineDash([10, 9]); g.strokeStyle = 'rgba(34,48,60,0.5)'; g.lineWidth = 3;
      g.strokeRect(L1 - 130, base - 6, 260, 10); g.strokeRect(R1 - 210, base - 6, 420, 10); g.restore(); }
    // mở: ? + YOUR SENSES + log
    const out = outCubic(prog(t, this.OUT, this.OUT + 0.6)), up = out ** 1.5 * 800;
    if (out < 1) {
      tag(g, '?', 640, 420 - up, { size: 64, k: prog(t, this.START + 0.1, this.START + 0.45), rot: sway(t, 1) });
      const ks2 = prog(t, T.senses, T.senses + 0.4);
      if (ks2 > 0) line(g, 1000, -10, 1000, 366 - up, C.string, 2.5);
      tag(g, 'YOUR SENSES', 1000, 400 - up, { size: 48, k: ks2, rot: sway(t, 2) });
    }
    block(g, 1400, base, 130, { color: C.log, label: 'log', k: prog(t, T.logs, T.logs + 0.4), lift: out });
    // người que đỡ khối trên đầu: vẽ người trước, khối đặt lên ĐỈNH ĐẦU thật (J.C, J.r) — khối nhún theo gối người que
    const on = t > this.WIN[0] && t < this.WIN[1], J = on ? draw(g, this.ACT, t) : null, hx = J ? J.C[0] : 820, ht = J ? J.C[1] - J.r - 4 : base;
    const fall = (a, y) => y - 700 * (1 - prog(t, a[0], a[1]) ** 2);                                   // rơi thẳng xuống đầu (gia tốc)
    const toss = (a, x0, y0, x1) => { const u = prog(t, a[0], a[1]); return [x0 + (x1 - x0) * u, y0 + (base - y0) * u * u - 140 * Math.sin(Math.PI * u)]; };
    // trái: 10 kg + 1 — rơi xuống đầu, +1 rơi lên, hất sang trái (L1 − 80) nằm lại làm mốc
    const [x10, y10] = t < this.D10[1] ? [hx, fall(this.D10, ht)] : t < this.TS10[0] ? [hx, ht] : toss(this.TS10, hx, ht, L1 - 80);
    if (t > this.D10[0]) {
      block(g, x10, y10, 0, { w: 260, h: 150, d: 30, color: C.birch, label: '10 kg' });
      if (t > T.one - 0.3) block(g, x10, t < T.one ? fall([T.one - 0.3, T.one], y10 - 150) : y10 - 150, 0, { w: 100, h: 70, d: 14, color: C.birch, label: '+1' });
    }
    tag(g, 'YOU FEEL IT', 1240, 470, { size: 40, k: prog(t, T.feel, T.feel + 0.35) - prog(t, this.TS10[0], this.TS10[0] + 0.3), rot: sway(t, 3), string: [1240, -10] });
    // phải: 100 kg + 1, rồi +10 — rơi xuống đầu; ratios → hất sang phải (R1)
    const sw = prog(t, T.add3, T.add3 + 0.4);
    const [x1, y1] = t < this.D100[1] ? [hx, fall(this.D100, ht)] : t < this.TS100[0] ? [hx, ht] : toss(this.TS100, hx, ht, R1);
    if (t > this.D100[0]) {
      block(g, x1, y1, 0, { w: 420, h: 250, d: 40, color: C.birch, label: '100 kg' });
      if (t > T.one2 - 0.3) block(g, x1, t < T.one2 ? fall([T.one2 - 0.3, T.one2], y1 - 250) : y1 - 250, 0, { w: 100, h: 70, d: 14, color: C.birch, label: '+1', lift: sw });
      if (t > T.ten3 - 0.3) block(g, x1, t < T.ten3 ? fall([T.ten3 - 0.3, T.ten3], y1 - 250) : y1 - 250, 0, { w: 190, h: 70, d: 14, color: C.birch, label: '+10' });
    }
    tag(g, 'BARELY NOTICE', 1300, 420, { size: 40, k: prog(t, T.barely, T.barely + 0.35) - prog(t, T.ratios - 0.3, T.ratios), rot: sway(t, 4), string: [1300, -10] });
    // ratios, not differences
    const kr = prog(t, T.ratios, T.ratios + 0.35), kdf = prog(t, T.diff, T.diff + 0.3);
    tag(g, 'RATIOS', 860, 230, { size: 52, edge: C.log, color: C.logInk, k: kr, rot: sway(t, 5), string: [760, -10] });
    if (kdf > 0) { const tb = tag(g, 'DIFFERENCES', 860, 330, { size: 48, edge: C.bad, color: C.badInk, k: kdf, rot: sway(t, 6), string: [760, 262] });
      tape(g, tb.x - 12, 346, tb.x + tb.w + 12, 338, prog(t, T.diff + 0.4, T.diff + 0.8), { w: 14 }); }
    // loa + sóng âm
    const ki = prog(t, T.decib, T.decib + 0.4), sx = 1620, sy = 420;
    if (ki > 0) {
      for (let j = 0; j < 3; j++) { const u = (t * 0.7 + j / 3) % 1; g.save(); g.globalAlpha = (1 - u) * 0.5 * ki; g.strokeStyle = C.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(sx, sy, 90 + u * 120, -0.7, 0.7); g.stroke(); g.restore(); }
      icon(g, 'speaker', sx - 40, sy, 80, ki);
    }
    secTag(g, 'Your own senses', { k: prog(t, this.START, this.START + 0.4), t });
    const a = T.ten - 0.3, mk = prog(t, a, a + 0.5), mo = outCubic(prog(t, this.END, this.END + 0.5));
    if (mk > 0 && mo < 1) { g.save(); g.translate(0, mo * 300); figure(g, 'ponder', 1730, H, 262, mk, { t, flip: true }); g.restore(); }
  }
}
