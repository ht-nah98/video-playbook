// c1 · 生命は片手だけ (p2 câu 22–26, mở hồi 2「体は鏡を見分ける」). DNA §1: L-alanine phía 左 (bản gương bên 右 chỉ là bóng
// nét đứt — sự sống không dùng), đường D / DNA xoắn phía 右 (biểu tượng); 「ホモキラリティー」; 受容体 = găng tay tay phải
// bên 右: tay phải vào khít (✓), bản xoay thử nét đứt của tay trái trượt sang → ngón cái lệch (✗ 「入らない」);
// kết: 「鏡の双子を見分ける」.
import { C, MX, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, title, telop, mismatch, molecule, stereo, hand,
  tick, cross, badge, actCard, actCues, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// DNA xoắn kép (biểu tượng, azure): hai sợi + bậc thang, lộ dần từ dưới lên theo k; xoay chậm theo t
function helix(g, x, y, h, k, t) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), n = 60, amp = 62, turns = 2.2, top = y - h / 2;
  const P = (i, ph) => { const u = i / n, a = u * turns * TAU + ph + t * 0.5; return { x: x + Math.sin(a) * amp, y: top + h - u * h, z: Math.cos(a) }; };
  const m = Math.round(n * e);
  g.save(); g.lineCap = 'round';
  for (let i = 0; i <= m; i += 3) { const a = P(i, 0), b = P(i, Math.PI);
    g.strokeStyle = 'rgba(174,182,198,0.55)'; g.lineWidth = 3; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
  for (const ph of [0, Math.PI]) for (let i = 1; i <= m; i++) { const a = P(i - 1, ph), b = P(i, ph);
    g.strokeStyle = `rgba(75,163,227,${0.45 + 0.55 * (a.z + 1) / 2})`; g.lineWidth = 4 + 3 * (a.z + 1) / 2; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
  g.restore();
}

export default class Seimei {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    const S = i => L(i).start;
    this.T = {
      l22: S(22), karada: w(22, '体'), katahou: w(22, '片方'),
      l23: S(23), tanpaku: w(23, 'タンパク質'), amino: w(23, 'アミノ酸'), ltype: w(23, 'l型'), dna: w(23, 'dna'), tou: w(23, '糖'), dtype: w(23, 'd型'),
      l24: S(24), seimei: w(24, '生命'), katahou24: w(24, '片方'), tsukau: w(24, '使う'), homo: w(24, 'ホモキラリティー'),
      l25: S(25), juyou: w(25, '受容'), katate: w(25, '片手'), tebukuro: w(25, '手袋'),
      l26: S(26), migiyou: w(26, '右手用'), hidari: w(26, '左手'), hairanai: w(26, '入りません'), dakara: w(26, 'だ'), kagami: w(26, '鏡'), miwake: w(26, '見分けられる'), end: L(26).end,
    };
    this.START = S(22);
    this.FROM = Math.max(this.START - 2.6, L(21).end + 0.5);      // mở hồi 2
    // L-alanine = S (CIP), bản gương = R; đường của DNA là D — chỉ chữ, không vẽ phân tử
    must(`'${stereo('L-alanine')[0].cip}${stereo('L-alanine', { mirror: true })[0].cip}'`, 'SR');
    this.HX = 480; this.RX = 2 * MX - 480;
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START),
      cue(T.katahou, 'telop', -4), cue(T.amino, 'telop', -4), cue(T.dna, 'mol', -4), cue(T.katahou24, 'telop', -6),
      cue(T.homo, 'telop'), cue(T.juyou, 'telop', -4), cue(T.tebukuro, 'telop', -6),
      cue(T.migiyou + 0.3, 'match', -4), cue(T.hairanai, 'mismatch', -4), cue(T.miwake - 0.3, 'telop', -2),
    ];
  }
  render(g, t) {
    const T = this.T, { HX, RX } = this;
    ground(g, 'mirror', t);
    title(g, '生命は片手だけ', t, T.karada - 0.3);

    // ── A: L-alanine (左) · bóng gương (右) → DNA (右) · ホモキラリティー (câu 22–24), rời ở câu 25 ──
    const oA = out(t, T.l25 - 0.5, 0.6);
    if (oA < 1) {
      g.save(); g.translate(0, 760 * oA);
      const km = prog(t, this.FROM + 0.05, this.FROM + 0.6), rot = 0.6 + 0.22 * (t - this.FROM);
      floorShadow(g, HX, 160 * km);
      molecule(g, 'L-alanine', { x: HX, y: 480, scale: 72, rot, k: km });
      const oG = out(t, T.dna - 0.5, 0.5);                                     // bóng gương chìm xuống khi DNA tới
      if (oG < 1) { g.save(); g.translate(0, 600 * oG); molecule(g, 'L-alanine', { x: RX, y: 480, scale: 72, rot, k: km, mirror: true, ghost: true }); g.restore(); }
      telop(g, '片方の手', HX, 290, prog(t, T.katahou, T.katahou + 0.5), { size: 48, color: '@L', align: 'center', mincho: true });
      telop(g, 'タンパク質をつくる', HX, 700, prog(t, T.tanpaku, T.tanpaku + 0.6), { size: 32, color: '@dim', align: 'center' });
      telop(g, 'アミノ酸', HX, 765, prog(t, T.amino, T.amino + 0.4), { size: 48, align: 'center', mincho: true });
      telop(g, 'ほぼすべてL型', HX, 840, prog(t, T.ltype - 0.2, T.ltype + 0.5), { size: 52, color: '@L', align: 'center' });
      helix(g, RX, 470, 380, prog(t, T.dna - 0.3, T.dna + 0.9), t);
      telop(g, 'DNAをつくる', RX, 700, prog(t, T.dna, T.dna + 0.5), { size: 32, color: '@dim', align: 'center' });
      telop(g, '糖', RX, 765, prog(t, T.tou, T.tou + 0.3), { size: 48, align: 'center', mincho: true });
      telop(g, 'D型', RX, 840, prog(t, T.dtype - 0.1, T.dtype + 0.4), { size: 52, color: '@R', align: 'center' });
      telop(g, '片方の手だけを使う', RX, 950, prog(t, T.katahou24, T.tsukau + 0.4), { size: 40, color: '@dim', align: 'center' });
      telop(g, 'ホモキラリティー', HX, 950, prog(t, T.homo, T.homo + 0.7), { size: 56, align: 'center', mincho: true });
      g.restore();
    }

    // ── B: 受容体 = găng tay tay phải (右) · tay trái không vào (câu 25–26) ──
    if (t > T.l25 - 0.3) {
      const GY = 600, GS = 90;
      const kg = prog(t, T.l25 + 0.1, T.l25 + 0.7);
      floorShadow(g, RX, 200 * kg);
      hand(g, RX, GY, GS, kg, { side: 'R', glove: true });
      telop(g, '受容体', HX, 300, prog(t, T.juyou, T.juyou + 0.4), { size: 56, align: 'center', mincho: true });
      telop(g, '片手の分子でできた', HX, 365, prog(t, T.katate, T.katate + 0.7), { size: 36, color: '@dim', align: 'center' });
      telop(g, 'いわば手袋', HX, 430, prog(t, T.tebukuro - 0.3, T.tebukuro + 0.4), { size: 48, align: 'center', mincho: true });
      // 右手用 ✓ (khớp)
      const kr = prog(t, T.migiyou, T.migiyou + 0.4);
      telop(g, '右手用', RX, 830, kr, { size: 44, color: '@R', align: 'center', mincho: true });
      // tay phải (nét đứt azure) trồi vào găng → ✓; rút xuống khi tay trái tới (✓ rút theo)
      const ki = smooth(prog(t, T.migiyou - 0.4, T.migiyou + 0.25)), ko = smooth(prog(t, T.hidari - 0.1, T.hidari + 0.4));
      if (ki > 0 && ko < 1) hand(g, RX, GY + (1 - ki) * 320 + ko * 420, GS, 1, { side: 'R', ghost: true });
      const kt = prog(t, T.migiyou + 0.3, T.migiyou + 0.7) * (1 - ko);
      if (kt > 0) { badge(g, RX + 190, GY - 120, 30 * Math.min(1, kt * 3), { stroke: C.silver }); tick(g, RX + 190, GY - 118, 18, kt); }
      // 左手: tay trái bên 左, bản xoay thử nét đứt trượt sang găng → ngón cái lệch
      const kl = prog(t, T.hidari - 0.2, T.hidari + 0.4);
      floorShadow(g, HX, 180 * kl);
      hand(g, HX, 680, 85, kl, { side: 'L' });
      telop(g, '左手', HX, 860, prog(t, T.hidari, T.hidari + 0.4), { size: 44, color: '@L', align: 'center', mincho: true });
      const ks = smooth(prog(t, T.hidari + 0.3, T.hairanai));
      if (ks > 0) hand(g, HX + (RX - HX) * ks, 680 + (GY - 680) * ks, 85 + (GS - 85) * ks, 1, { side: 'L', ghost: true });
      const kx = prog(t, T.hairanai, T.hairanai + 0.4);
      if (kx > 0) { cross(g, RX + GS * 1.45, GY - GS * 0.55, 16, kx); cross(g, RX - GS * 1.45, GY - GS * 0.55, 16, kx); }
      mismatch(g, '入らない', RX, 950, kx, { size: 48, align: 'center', mincho: true });
      telop(g, '体は鏡の双子を見分ける', HX, 970, prog(t, T.dakara, T.miwake), { size: 44, align: 'center', mincho: true });
    }

    mirror(g);
    actCard(g, t, this.FROM, this.START, 2);
  }
}
