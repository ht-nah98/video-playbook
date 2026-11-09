// b5 · 極限 (p2 câu 40–45) — cuối HỒI 1. ERA tenkyu (b4 sangaku → loang từ WIPE = tâm vành). Vành đồng thau (vật xuyên
// suốt, r 300) bên trái; cột phải đổi theo ý:
//  ① câu 40–41: 「アルキメデスの本当の贈り物」; cận 3.1408 < π < 3.1429 (b2) + 「桁の数」 gạch thép; 「この方法」 → lục giác
//     trong (đồng) / ngoài (thép) trong vành; 「円周率の正体を見せた」.
//  ② câu 42–43: 「ある手続きのゴール」; 辺の数を限りなく: đa giác nhân đôi LIÊN TỤC 6 → 3072, bộ đếm + cận trong/ngoài co lại;
//     たどり着く先 = đường tròn chỉ vàng sáng; 「極限」 khắc lớn (suzu).
//  ③ câu 44: khung chi tiết trên vành: nửa trái dây cung (まっすぐ) | nửa phải cung trơn (曲がった), π son ngồi đúng 境目.
//  ④ câu 45: 角ばった形 (lục giác) → bóng đa giác vừa trượt vừa nhân đôi → なめらかな形 (tròn); 「それが円周率」, π son giữa
//     vành (taiko — chốt hồi 1).
import { C, MIN, JP, CG, TAU, clamp, prog, lookup, must, fix, outCubic, smooth, sk,
  ground, ring360, circleLine, drawPoly, gap, engrave, telop, heading, leader, strikeSteel, measure, polyIn, ARCH } from '../kit.js';

// đa giác nhân đôi LIÊN TỤC (giống b4): mức s, 0 = n0-giác; nội suy bán kính theo góc giữa n-giác và 2n-giác
const polyR = (th, n, A, phi) => { const seg = TAU / n; let d = ((th - phi) % seg + seg) % seg; if (d > seg / 2) d -= seg; return A / Math.cos(d); };
function morph(cx, cy, r, s, n0, side, a0 = -Math.PI / 2) {
  const lv = Math.floor(s + 1e-9), f = smooth(clamp(s - lv)), n = n0 * 2 ** lv, N = Math.min(4 * n, 2048);
  const rho = (th, m) => side === 'in' ? polyR(th, m, r * Math.cos(Math.PI / m), a0 + Math.PI / m) : polyR(th, m, r, a0);
  return Array.from({ length: N }, (_, j) => { const th = a0 + TAU * j / N, p = rho(th, n) + (rho(th, 2 * n) - rho(th, n)) * f;
    return [cx + p * Math.cos(th), cy + p * Math.sin(th)]; });
}
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const CX = 700, CY = 590, R = 300, X = 1180, LEVELS = 9;          // 6 · 2^9 = 3072

export default class Limit {
  static ERA = 'tenkyu';
  static POSES = [];
  WIPE = [CX, CY];
  TRANSITION = 'whoosh';                               // khác ERA mặc định whoosh-long — hạn mức G2 = 0
  init({ tl }) {
    const { L, w } = lookup(tl, 'b5');
    this.T = {
      archi: w(40, 'アルキメデス'), okuri: w(40, '贈り物'), keta: w(40, '桁'), arimasen: w(40, 'ありません'),
      houhou: w(41, '方法'), shoutai: w(41, '正体'), misete: w(41, '見せて'),
      l42: L(42).start, aru: w(42, 'ある'), tetsuzuki: w(42, '手続き'), goal: w(42, 'ゴール'), hen: w(42, '辺'), kagiri: w(42, '限りなく'),
      fuyashite: w(42, '増やして'), tadori: w(42, 'たどり着く'),
      l43: L(43).start, kyokugen: w(43, '極限'),
      l44: L(44).start, massugu: w(44, 'まっすぐ'), magatta: w(44, '曲がった'), chodo: w(44, 'ちょうど'), sakaime: w(44, '境目'), kazu: w(44, '数'),
      l45: L(45).start, kakubatta: w(45, '角ばった'), nameraka: w(45, 'なめらか'), chikazuketa: w(45, '近づけた'), yukitsuku: w(45, '行き着く'),
      sore: w(45, 'それ'), end: L(45).end,
    };
    this.START = L(40).start;
    this.FROM = Math.max(this.START - 1.2, L(39).end + 0.5);
    const T = this.T;
    this.DBL = [T.hen, T.tadori];
    if (!(this.DBL[0] < this.DBL[1])) throw new Error('b5: 辺 phải trước たどり着く');
    // cận cũ của Archimedes (b2, cùng số)
    this.AB = [fix('223 / 71', 4), fix('22 / 7', 4)]; must(`${this.AB[0]}`, 3.1408); must(`${this.AB[1]}`, 3.1429);
    must(`${ARCH[0]} < Math.PI && Math.PI < ${ARCH[1]}`, true);
    // bảng nhân đôi 6 → 3072: chu vi / đường kính của đa giác trong / ngoài, 6 chữ số; cận hiển thị vẫn kẹp đúng π
    this.ROWS = Array.from({ length: LEVELS + 1 }, (_, i) => { const n = 6 * 2 ** i;
      const a = fix(`${n} * Math.sin(Math.PI / ${n})`, 6), b = fix(`${n} * Math.tan(Math.PI / ${n})`, 6);
      must(`${a} <= Math.PI && Math.PI <= ${b}`, true); return [n, a, b]; });
    must(`${this.ROWS.at(-1)[0]}`, 3072); must('6 * 2 ** 9', 3072);
    must(`'${this.ROWS[0][1]}'`, '3.000000');                                   // lục giác: đúng 3
  }
  level(t) { const [a, b] = this.DBL; return LEVELS * clamp((t - a) / (b - a)) ** 1.8; }   // chậm ở đầu: 6 · 12 · 24 còn thấy được
  sfx() {
    const T = this.T, c = (t, kind, db) => ({ t: +t.toFixed(3), kind: sk(kind), ...(db != null ? { db } : {}) });
    const [a, b] = this.DBL;
    return [
      c(T.archi, 'tick'), c(T.keta - 0.1, 'tick'), c(T.arimasen, 'snap'),
      c(T.houhou, 'pen'), c(T.shoutai, 'tick'),
      c(T.aru, 'tick'), ...[0.35, 0.8].map(u => c(a + (b - a) * u, 'soroban')),
      c(T.kyokugen, 'suzu'),
      c(T.l44 + 0.1, 'pen'), c(T.massugu, 'pen'), c(T.magatta, 'pen'), c(T.sakaime, 'tick'),
      c(T.kakubatta, 'pen'), c(T.nameraka, 'pen'), c(T.sore, 'taiko'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t);
    heading(g, '第一幕　円をはさみうちにする', '極限', prog(t, this.FROM + 0.3, this.START + 0.9));
    this.ring(g, t);
    this.gift(g, t);
    this.goal(g, t);
    this.border(g, t);
    this.finale(g, t);
  }
  // ── vành + đa giác trong/ngoài nhân đôi; たどり着く先 = đường tròn sáng; π son ở câu 45 ──
  ring(g, t) {
    const T = this.T, rot = t * 0.03;
    ring360(g, CX, CY, R, prog(t, this.FROM + 0.3, this.START + 0.6), { rot });
    const s = this.level(t), kp = prog(t, T.houhou - 0.1, T.houhou + 0.7);
    if (kp > 0) {
      const Pi = morph(CX, CY, R, s, 6, 'in'), Po = morph(CX, CY, R, s, 6, 'out');
      if (kp >= 1) gap(g, Pi, Po, 0.12 * (1 - clamp(s / LEVELS)) + 0.02);
      drawPoly(g, Po, kp, { color: C.steel, w: 1.6 }); drawPoly(g, Pi, kp, { color: C.brass, w: 2 });
    }
    circleLine(g, CX, CY, R, prog(t, T.tadori - 0.1, T.tadori + 0.9), { w: 3.4 });
    engrave(g, 'π', CX, CY + 80, prog(t, T.sore, T.sore + 0.35), `600 230px ${CG}`, C.shu, { align: 'center' });
  }
  // ── câu 40–41 ──
  gift(g, t) {
    const T = this.T, o = out(t, T.l42 - 0.45);
    if (t < T.archi - 0.2 || o >= 1) return;
    g.save(); g.translate(820 * o, 0);
    telop(g, [['アルキメデスの', `700 32px ${MIN}`, C.dim], ['本当の贈り物', `700 42px ${MIN}`]], X, 330, prog(t, T.archi, T.okuri + 0.5), { size: 42 });
    const fB = `500 48px ${CG}`;
    engrave(g, [[this.AB[0], fB, C.ivory], [' < ', fB, C.dim], ['π', `600 54px ${CG}`, C.shu], [' < ', fB, C.dim], [this.AB[1], fB, C.ivory]], X + 4, 450, prog(t, T.keta - 0.3, T.keta + 0.3), fB, C.ivory, { spark: false });   // cận đúng: ngà; chỉ 「桁の数」 bị phủ định (thép + gạch)
    const fK = `700 38px ${MIN}`, kw = measure(g, '桁の数', fK);
    engrave(g, '桁の数', X + 4, 528, prog(t, T.keta, T.keta + 0.4), fK, C.steel, { spark: false });
    strikeSteel(g, X - 8, 516, X + kw + 14, 510, prog(t, T.arimasen, T.arimasen + 0.35));
    // この方法 → dây dẫn tới đỉnh lục giác trên vành
    const B = telop(g, [['この方法', `700 42px ${MIN}`, C.brassHi], ['が', `700 34px ${MIN}`]], X, 652, prog(t, T.houhou, T.houhou + 0.6), { size: 42 });
    const vx = CX + R * Math.cos(-Math.PI / 6), vy = CY + R * Math.sin(-Math.PI / 6);
    leader(g, B.x - 4, B.y + B.h / 2, vx + 8, vy + 4, prog(t, T.houhou + 0.3, T.houhou + 0.9));
    telop(g, [['円周率の', `700 40px ${MIN}`], ['正体', `700 52px ${MIN}`, C.brassHi], ['を見せた', `700 34px ${MIN}`, C.dim]], X, 780, prog(t, T.shoutai - 0.3, T.misete + 0.5), { size: 46 });
    g.restore();
  }
  // ── câu 42–43 ──
  goal(g, t) {
    const T = this.T, o = out(t, T.l44 - 0.35);
    if (t < T.aru - 0.2 || o >= 1) return;
    g.save(); g.translate(820 * o, 0);
    telop(g, [['ある手続きの ', `700 38px ${MIN}`], ['ゴール', `700 46px ${MIN}`, C.brassHi]], X, 330, prog(t, T.aru, T.goal + 0.5), { size: 44 });
    engrave(g, [['辺の数を ', `500 30px ${JP}`, C.dim], ['限りなく', `700 36px ${MIN}`, C.ivory]], X + 4, 440, prog(t, T.hen, T.kagiri + 0.5), undefined, C.ivory, { spark: false });
    const s = this.level(t), [n, a, b] = this.ROWS[Math.round(s)], kc = prog(t, T.hen, T.hen + 0.4);
    engrave(g, [['正', `700 46px ${MIN}`], [String(n), `600 84px ${CG}`, C.brassHi], [' 角形', `700 46px ${MIN}`]], X + 4, 548, kc, undefined, C.ivory, { spark: false });
    const fV = `500 40px ${CG}`;
    engrave(g, [[a, fV, C.brass], [' < ', fV, C.dim], ['π', `600 48px ${CG}`, C.shu], [' < ', fV, C.dim], [b, fV, C.steel]], X + 4, 626, prog(t, T.fuyashite - 0.4, T.fuyashite + 0.2), fV, C.ivory, { spark: false });
    engrave(g, '数学では、これを', X + 4, 716, prog(t, T.l43, T.kyokugen), `500 30px ${JP}`, C.dim, { ls: 4, spark: false });
    engrave(g, '極限', X, 880, prog(t, T.kyokugen, T.kyokugen + 0.6), `700 150px ${MIN}`, C.brassHi, { ls: 24 });
    g.restore();
  }
  // ── câu 44: khung chi tiết — まっすぐ | 曲がった, π ở 境目 ──
  border(g, t) {
    const T = this.T, o = out(t, T.l45 - 0.4), kf = prog(t, T.l44 - 0.1, T.l44 + 0.6);
    if (kf <= 0 || o >= 1) return;
    // dấu trên vành (góc toán 20°) + dây dẫn sang khung — dời cùng khung
    const ma = 20 * Math.PI / 180, mx = CX + R * Math.cos(ma), my = CY - R * Math.sin(ma);
    g.save(); g.translate(820 * o, 0);
    const bx = 1180, by = 268, bw = 600, bh = 330;
    if (o <= 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 1.6; g.beginPath(); g.arc(mx, my, 30 * outCubic(kf), 0, TAU); g.stroke(); g.restore();
      leader(g, mx + 30, my - 4, bx, by + 170, kf); }
    g.save(); g.fillStyle = 'rgba(5,10,28,0.55)'; g.fillRect(bx, by, bw * outCubic(kf), bh); g.strokeStyle = C.brass; g.lineWidth = 1.2; g.globalAlpha = 0.9;
    g.strokeRect(bx, by, bw * outCubic(kf), bh); g.restore();
    // vành phóng to: tâm xa phía dưới, đỉnh cung ở giữa khung
    const Rb = 1000, ox = bx + bw / 2, oy = by + 170 + Rb, span = 0.27, P = a => [ox + Rb * Math.sin(a), oy - Rb * Math.cos(a)];
    g.save(); g.beginPath(); g.rect(bx + 2, by + 2, bw - 4, bh - 4); g.clip();
    const kl = prog(t, T.massugu, T.massugu + 0.5), kr = prog(t, T.magatta, T.magatta + 0.5);
    const ch = Array.from({ length: 5 }, (_, i) => P(-span + span * i / 4));
    if (kl > 0) {
      const m = kl * 4, full = Math.floor(m);
      g.strokeStyle = C.brass; g.lineWidth = 3; g.lineJoin = 'miter'; g.beginPath(); g.moveTo(...ch[0]);
      for (let i = 1; i <= Math.min(full, 4); i++) g.lineTo(...ch[i]);
      if (full < 4) { const [ax, ay] = ch[full], [cx, cy] = ch[full + 1], f = m - full; g.lineTo(ax + (cx - ax) * f, ay + (cy - ay) * f); }
      g.stroke();
      ch.slice(0, full + 1).forEach(([x, y]) => { g.fillStyle = C.brassHi; g.beginPath(); g.arc(x, y, 4.5, 0, TAU); g.fill(); });
    }
    if (kr > 0) { g.save(); g.shadowColor = 'rgba(243,223,162,0.45)'; g.shadowBlur = 8; g.strokeStyle = C.brassHi; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath(); for (let i = 0; i <= 60 * kr; i++) g.lineTo(...P(span * i / 60)); g.stroke(); g.restore(); }
    g.restore();
    const kb = prog(t, T.sakaime - 0.1, T.sakaime + 0.35), [px, py] = P(0);
    if (kb > 0) { g.save(); g.strokeStyle = C.dim; g.lineWidth = 1.4; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(px, by + bh - 70); g.lineTo(px, by + bh - 70 - (bh - 160) * outCubic(kb)); g.stroke(); g.restore(); }
    engrave(g, 'π', px, py - 26, prog(t, T.sakaime + 0.1, T.sakaime + 0.35), `600 72px ${CG}`, C.shu, { align: 'center', spark: false });
    engrave(g, 'まっすぐ', bx + 28, by + bh - 28, prog(t, T.massugu, T.massugu + 0.4), `500 30px ${JP}`, C.ivory, { ls: 3, spark: false });
    engrave(g, '曲がった', bx + bw - 28, by + bh - 28, prog(t, T.magatta, T.magatta + 0.4), `500 30px ${JP}`, C.brassHi, { align: 'right', ls: 3, spark: false });
    engrave(g, '境目', px, by + bh - 28, prog(t, T.sakaime, T.sakaime + 0.4), `500 30px ${JP}`, C.dim, { align: 'center', ls: 3, spark: false });
    telop(g, [['まっすぐ', `700 40px ${MIN}`], [' と ', `700 32px ${MIN}`, C.dim], ['曲がった', `700 40px ${MIN}`, C.brassHi]], X, 712, prog(t, T.massugu, T.magatta + 0.5), { size: 40 });
    telop(g, [['ちょうど ', `700 34px ${MIN}`, C.dim], ['境目', `700 48px ${MIN}`, C.brassHi], [' にある数', `700 34px ${MIN}`]], X, 836, prog(t, T.chodo, T.kazu + 0.2), { size: 44 });
    g.restore();
  }
  // ── câu 45: 角ばった形 → なめらかな形; それが円周率 ──
  finale(g, t) {
    const T = this.T;
    if (t < T.kakubatta - 0.3) return;
    const y = 410, xa = 1290, xb = 1650, r = 82;
    drawPoly(g, polyIn(xa, y, r, 6), prog(t, T.kakubatta, T.kakubatta + 0.6), { color: C.brass, w: 2.4, dots: t > T.kakubatta + 0.6 });
    engrave(g, '角ばった形', xa, y + 140, prog(t, T.kakubatta + 0.2, T.kakubatta + 0.7), `500 30px ${JP}`, C.ivory, { align: 'center', ls: 3, spark: false });
    circleLine(g, xb, y, r, prog(t, T.nameraka, T.nameraka + 0.6), { w: 2.6 });
    engrave(g, 'なめらかな形', xb, y + 140, prog(t, T.nameraka + 0.2, T.nameraka + 0.7), `500 30px ${JP}`, C.brassHi, { align: 'center', ls: 3, spark: false });
    // bóng đa giác vừa trượt vừa nhân đôi: lục giác → tròn (近づけた → 行き着く先)
    const km = smooth(prog(t, T.chikazuketa, T.yukitsuku + 0.5));
    if (km > 0) { const xm = xa + (xb - xa) * km; drawPoly(g, morph(xm, y, r, 6 * km, 6, 'in'), 1, { color: C.brassHi, w: 1.6 }); }
    leader(g, xa + r + 26, y - 120, xb - r - 26, y - 120, prog(t, T.chikazuketa, T.chikazuketa + 0.8));
    const ka = prog(t, T.chikazuketa + 0.6, T.chikazuketa + 0.8);
    if (ka > 0) { g.save(); g.fillStyle = C.brass; g.beginPath(); g.moveTo(xb - r - 14, y - 120); g.lineTo(xb - r - 28, y - 128); g.lineTo(xb - r - 28, y - 112); g.closePath(); g.fill(); g.restore(); }
    engrave(g, '行き着く先', xb, y - 140, prog(t, T.yukitsuku, T.yukitsuku + 0.5), `500 28px ${JP}`, C.dim, { align: 'center', ls: 4, spark: false });
    telop(g, [['それが ', `700 44px ${MIN}`], ['円周率', `700 54px ${MIN}`, C.brassHi]], X, 760, prog(t, T.sore, T.sore + 0.8), { size: 50 });
  }
}
