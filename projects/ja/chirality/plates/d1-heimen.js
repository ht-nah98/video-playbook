// d1 · 平らな分子の二つの面 (p2, câu 42–47) — mở hồi 3「なぜ半分ずつになるのか」. DNA d1:
//  ① thẻ hồi; phân tử PHẲNG (tấm tam giác) đứng TRONG mặt phẳng gương ở x = 930: một mặt nhìn sang phải (表), một mặt sang trái (裏)
//  ② 別の分子 (hạt bạc) ở hai phía; 右か左の形 = hai bàn tay nét đứt chờ; 表から → sản phẩm 右 (CHFClBr bản gương, azure, phải);
//     裏から → sản phẩm 左 (file chính, hổ phách, trái); 鏡うつし: đường chấm nối từng nguyên tử qua gương
//  ③ 片手でないかぎり: hai sườn năng lượng đối xứng qua gương, hai thanh cao BẰNG nhau → 「同じ」
//  ④ だから: hạt rơi từ tấm phẳng vào hai ống nghiệm (tube, a0 → d1), bộ đếm 19 / 21 (hash, must) — 「いつも半分ずつ？」 gạch →
//     「ほぼ同じ数」; 「ラセミ体 ← ラセミ酸」.
// Vật thiếu trong kit: tấm phân tử phẳng (MOLS không có phân tử phẳng) — vẽ cục bộ flatMol(): tấm kính + 3 nhóm thế là hình
// PHẲNG (lục giác / vuông / tam giác), không vẽ quả cầu nguyên tử.
import { C, MX, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, hash, ground, mirror, title, actCard, actCues, actTimes,
  telop, wrong, strike, arrow, molecule, hand, tube, floorShadow, cue, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const N = 40, SEED = 6;                                               // 40 hạt; seed chọn để hai phía lệch nhẹ (ほぼ, không bằng hẳn)
const SIDE = Array.from({ length: N }, (_, i) => (hash(i * 7.3 + SEED) < 0.5 ? 'L' : 'R'));
const TUBE = { L: 560, R: 2 * MX - 560, y: 840, h: 360 };

/** Tấm phân tử phẳng (trigonal) nằm trong mặt phẳng gương, xoay nhẹ quanh trục đứng (yaw) để thấy hai mặt.
 *  face 0..1: hai mặt sáng lên (trái hổ phách / phải azure). Trả về toạ độ ba đỉnh. */
function flatMol(g, x, y, s, k, yaw, face = 0) {
  if (k <= 0) return [];
  const e = outCubic(clamp(k)), sw = Math.sin(yaw), cw = Math.cos(yaw);
  const P = [[1, 0], [-0.5, -0.866], [-0.5, 0.866]].map(([Y, Z]) => [x + Z * sw * s * e, y - Y * s * e + Z * cw * 0.16 * s * e]);
  const plate = P.map(([px, py]) => [x + (px - x) * 1.3, y + (py - y) * 1.3]);
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath(); plate.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath();
  g.fillStyle = 'rgba(201,210,224,0.12)'; g.fill(); g.strokeStyle = 'rgba(201,210,224,0.75)'; g.lineWidth = 2; g.stroke();
  if (face > 0) for (const [sgn, col] of [[-1, '242,165,65'], [1, '75,163,227']]) {               // mặt 裏 (trái) / 表 (phải)
    g.save(); g.beginPath(); plate.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.clip();
    g.fillStyle = `rgba(${col},${0.32 * clamp(face)})`; g.fillRect(sgn < 0 ? x - 400 : x, y - 400, 400, 800); g.restore();
  }
  for (const p of P) { g.strokeStyle = '#2A3246'; g.lineWidth = 13; g.beginPath(); g.moveTo(x, y); g.lineTo(...p); g.stroke();
    g.strokeStyle = C.bone; g.lineWidth = 7; g.beginPath(); g.moveTo(x, y); g.lineTo(...p); g.stroke(); }
  const shapes = [6, 4, 3], cols = [C.silver, C.bone, C.dim];
  P.forEach(([px, py], i) => { const n = shapes[i], r = 24 * e;
    g.beginPath(); for (let j = 0; j < n; j++) { const a = j / n * TAU - Math.PI / 2; j ? g.lineTo(px + r * Math.cos(a), py + r * Math.sin(a)) : g.moveTo(px + r * Math.cos(a), py + r * Math.sin(a)); }
    g.closePath(); g.fillStyle = '#2A3246'; g.fill(); g.strokeStyle = cols[i]; g.lineWidth = 3.5; g.stroke(); });
  g.beginPath(); g.arc(x, y, 15 * e, 0, TAU); g.fillStyle = '#4A5366'; g.fill(); g.strokeStyle = C.silver; g.lineWidth = 2.5; g.stroke();
  g.restore();
  return P;
}
/** Hạt "別の分子": hình thoi bạc nhỏ. */
function token(g, x, y, k) {
  if (k <= 0) return;
  const r = 16 * outCubic(clamp(k));
  g.save(); g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y); g.lineTo(x, y + r); g.lineTo(x - r, y); g.closePath();
  g.fillStyle = '#9AA4B6'; g.fill(); g.strokeStyle = '#F4F7FB'; g.lineWidth = 2; g.stroke(); g.restore();
}
const quad = (p, u) => { const a = (1 - u) ** 2, b = 2 * u * (1 - u), c = u * u; return [a * p[0][0] + b * p[1][0] + c * p[2][0], a * p[0][1] + b * p[1][1] + c * p[2][1]]; };
/** Sườn năng lượng (0 → đỉnh 1 ở u = 0.45 → sản phẩm −0.25 ở u = 1). */
const hill = u => (u < 0.45 ? smooth(u / 0.45) : 1 - 1.25 * smooth((u - 0.45) / 0.55));

export default class Heimen {
  static ERA = 'mirror';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    const S = i => L(i).start;
    this.T = {
      l42: S(42), tsukurenai: w(42, '作れない'),
      taira: w(43, '平ら'), betsu: w(43, '別'), migi43: w(43, '右'), hidari43: w(43, '左'),
      omote: w(44, '表'), migite: w(44, '右手'), ura: w(44, '裏'), hidarite: w(44, '左手'),
      l45: S(45), kagami: w(45, '鏡'),
      l46: S(46), katate: w(46, '片手'), dochira: w(46, 'どちら'), hitsuyou: w(46, '必要'), onaji46: w(46, '同じ'),
      dakara: S(47), migi47: w(47, '右'), hobo: w(47, 'ほぼ'), racemi: w(47, 'ラセミ'), end: L(47).end,
    };
    this.START = S(42);
    this.FROM = Math.max(this.START - 2.6, L(41).end + 0.5);          // mở hồi: lead 2.6; c3 kết + 0.5
    this.TA = actTimes(this.FROM, this.START);
    // hạt rơi: hạt i bay lúc t0 + i·dt, chạm ống sau FLY giây; bộ đếm hai phía (số trên hình — must ở trạng thái xong)
    this.t0 = this.T.migi47; this.dt = 2.9 / N; this.FLY = 0.55;
    const nL = SIDE.filter(s => s === 'L').length, nR = N - nL;
    must(`${nL}`, 19); must(`${nR}`, 21); must(`${nL} + ${nR}`, N);
    must(`${this.t0 + (N - 1) * this.dt + this.FLY < this.T.racemi}`, true);   // đếm xong trước 「ラセミ体」
  }
  sfx() {
    const T = this.T;
    // trần d1: (2 thẻ hồi + 2 chuyển cảnh trang) + 9 ≤ 34.7 ÷ 2.5
    return [
      ...actCues(this.FROM, this.START),
      cue(T.tsukurenai, 'telop'), cue(T.betsu, 'tweezers'), cue(T.migite, 'mol'), cue(T.kagami, 'telop', -4),
      cue(T.katate, 'telop'), cue(T.dochira, 'tick', -6), cue(T.onaji46, 'telop'), cue(T.hobo, 'mismatch'), cue(T.racemi, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    mirror(g);

    // tấm phẳng: giữa gương; lên cao ở câu 46 để nhường chỗ cho sườn năng lượng / ống nghiệm
    const up = smooth(prog(t, T.l46 - 0.5, T.l46 + 0.3)), py = 440 - 140 * up, ps = 150 - 30 * up;
    const yaw = 0.9 + 0.1 * Math.sin(0.5 * (t - this.START));
    const kP = prog(t, this.FROM + 0.3, this.FROM + 0.9);
    const face = prog(t, T.l45, T.l45 + 0.5) * (1 - prog(t, T.l46 - 0.5, T.l46));
    const pulse = 1 + 0.12 * Math.sin(Math.PI * prog(t, T.taira, T.taira + 0.6));

    // ── tiêu đề (sau thẻ hồi) ──
    title(g, '平らな分子の二つの面', t, this.TA.o1, { act: 3 });

    // ── câu 42: câu hỏi chân khung ──
    // rút chữ (viết ngược) trước khi cụm rời khung — chữ không trượt ra ngoài vùng an toàn
    if (t < T.taira) telop(g, 'なぜ、片方だけを作れない？', MX, 990, prog(t, T.tsukurenai, T.tsukurenai + 0.6) * (1 - prog(t, T.taira - 0.6, T.taira - 0.2)), { size: 48, align: 'center', mincho: true });

    // ── ① ② câu 43–45: tác nhân từ hai mặt → hai sản phẩm gương ──
    const oA = out(t, T.l46 - 0.35, 0.6), kx = 1 - prog(t, T.l46 - 0.75, T.l46 - 0.35);
    let pts = null;
    if (oA < 1) {
      g.save(); g.translate(0, 700 * oA);
      // nhãn 「平らな分子」 (viết ra ở 平ら, rút lại trước 表から)
      telop(g, '平らな分子', 1070, 476, kx * prog(t, T.taira, T.taira + 0.5) * (1 - prog(t, T.omote - 0.5, T.omote)), { size: 40, mincho: true });
      // hai đường tới: phải (表, azure) / trái (裏, hổ phách); hạt 「別の分子」 ở đầu đường, bay theo đường
      const RP = [[1240, 250], [1060, 240], [990, py - 20]], LP = RP.map(([x, y]) => [2 * MX - x, y]);
      const kRa = prog(t, T.omote, T.omote + 0.6), kLa = prog(t, T.ura, T.ura + 0.6);
      const kTok = prog(t, T.betsu, T.betsu + 0.4);
      arrow(g, RP, kRa, { color: C.R, w: 5 }); arrow(g, LP, kLa, { color: C.L, w: 5 });
      const uR = smooth(prog(t, T.omote, T.omote + 0.6)), uL = smooth(prog(t, T.ura, T.ura + 0.6));
      if (uR < 1) token(g, ...quad(RP, uR), kTok); if (uL < 1) token(g, ...quad(LP, uL), kTok);
      telop(g, '別の分子', 1280, 262, kx * prog(t, T.betsu, T.betsu + 0.5), { size: 36, color: '@dim' });
      telop(g, '表から', 1140, 350, kx * prog(t, T.omote, T.omote + 0.4), { size: 44, color: '@R', mincho: true });
      telop(g, '裏から', 2 * MX - 1140, 350, kx * prog(t, T.ura, T.ura + 0.4), { size: 44, color: '@L', mincho: true, align: 'right' });
      // 右か左の形: hai bàn tay nét đứt chờ chỗ → sản phẩm thế chỗ
      const HXR = 2 * MX - 520, HXL = 520, HY = 640;
      const gR = prog(t, T.migi43, T.migi43 + 0.4) * (1 - prog(t, T.migite - 0.1, T.migite + 0.3));
      const gL = prog(t, T.hidari43, T.hidari43 + 0.4) * (1 - prog(t, T.hidarite - 0.1, T.hidarite + 0.3));
      hand(g, HXR, HY + 40, 70, gR, { side: 'R', ghost: true }); hand(g, HXL, HY + 40, 70, gL, { side: 'L', ghost: true });
      const rot = 0.35 * Math.sin(0.45 * (t - T.migite)), kmR = prog(t, T.migite - 0.1, T.migite + 0.5), kmL = prog(t, T.hidarite - 0.1, T.hidarite + 0.5);
      floorShadow(g, HXR, 150 * Math.min(1, kmR)); floorShadow(g, HXL, 150 * Math.min(1, kmL));
      const AR = molecule(g, 'R-CHFClBr', { x: HXR, y: HY, scale: 80, rot, mirror: true, k: kmR });
      const AL = molecule(g, 'R-CHFClBr', { x: HXL, y: HY, scale: 80, rot, k: kmL });
      telop(g, '右手の形', HXR, 880, kx * prog(t, T.migite, T.migite + 0.5), { size: 44, color: '@R', align: 'center', mincho: true });
      telop(g, '左手の形', HXL, 880, kx * prog(t, T.hidarite, T.hidarite + 0.5), { size: 44, color: '@L', align: 'center', mincho: true });
      // 鏡うつし: đường chấm nối từng nguyên tử tương ứng qua gương
      const kd = prog(t, T.kagami - 0.2, T.kagami + 0.8);
      if (kd > 0 && AR.length && AL.length) {
        g.save(); g.setLineDash([6, 10]); g.strokeStyle = C.silver; g.lineWidth = 2;
        AL.forEach((a, i) => { const b = AR[i]; if (!a || !b) return; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(a.x + (b.x - a.x) * outCubic(kd), a.y + (b.y - a.y) * outCubic(kd)); g.stroke(); });
        g.restore();
      }
      telop(g, '鏡うつし', MX, 990, kx * prog(t, T.kagami, T.kagami + 0.5), { size: 52, align: 'center', mincho: true });
      g.restore();
    }

    // ── ③ câu 46: hai sườn năng lượng đối xứng, hai thanh bằng nhau ──
    const oB = out(t, T.dakara + 0.3, 0.5), kxB = 1 - prog(t, T.dakara - 0.1, T.dakara + 0.3);
    if (t > T.l46 - 0.3 && oB < 1) {
      g.save(); g.translate(0, 700 * oB);
      const base = 820, amp = 300, span = 420, kH = smooth(prog(t, T.l46, T.l46 + 1.2));
      const X = (sgn, u) => MX + sgn * u * span, Y = u => base - amp * hill(u);
      g.save(); g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); g.moveTo(MX - span - 30, base + 90); g.lineTo(MX + span + 30, base + 90); g.stroke(); g.restore();
      for (const [sgn, col] of [[-1, C.L], [1, C.R]]) {
        g.save(); g.strokeStyle = col; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
        const n = Math.max(1, Math.round(80 * kH)); for (let i = 0; i <= n; i++) { const u = i / 80; i ? g.lineTo(X(sgn, u), Y(u)) : g.moveTo(X(sgn, u), Y(u)); }
        g.stroke(); g.restore();
      }
      // どちらから近づいても: hai chấm leo hai sườn cùng lúc
      const ud = 0.45 * smooth(prog(t, T.dochira, T.dochira + 1.6));
      if (t > T.dochira - 0.1) for (const [sgn, col] of [[-1, C.L], [1, C.R]]) { g.fillStyle = col; g.beginPath(); g.arc(X(sgn, ud), Y(ud) - 12, 11, 0, TAU); g.fill(); }
      // 必要なエネルギー: hai thanh cao bằng nhau dưới hai đỉnh + nét đứt nối hai đỉnh
      const kb = outCubic(prog(t, T.hitsuyou, T.hitsuyou + 0.7));
      if (kb > 0) {
        for (const [sgn, col, rgb] of [[-1, C.L, '242,165,65'], [1, C.R, '75,163,227']]) {
          const bx = X(sgn, 0.45) - 22, top = base - amp * kb;
          g.fillStyle = `rgba(${rgb},0.30)`; g.fillRect(bx, top, 44, base - top); g.strokeStyle = col; g.lineWidth = 2.5; g.strokeRect(bx, top, 44, base - top);
        }
        if (kb >= 1) { g.save(); g.setLineDash([10, 8]); g.strokeStyle = C.silver; g.lineWidth = 2; g.beginPath(); g.moveTo(X(-1, 0.45) - 40, base - amp); g.lineTo(X(1, 0.45) + 40, base - amp); g.stroke(); g.restore(); }
      }
      telop(g, '必要なエネルギー', 150, 560, kxB * prog(t, T.hitsuyou, T.hitsuyou + 0.6), { size: 40 });
      telop(g, '同じ', MX, 990, kxB * prog(t, T.onaji46, T.onaji46 + 0.4), { size: 56, align: 'center', mincho: true });
      g.restore();
    }
    if (t > T.katate - 0.1) telop(g, '相手が片手でなければ', 1040, 240, prog(t, T.katate, T.katate + 0.7) * (1 - prog(t, T.dakara, T.dakara + 0.4)), { size: 40 });

    // ── ④ câu 47: hạt rơi vào hai ống nghiệm, đếm ~ bằng nhau ──
    if (t > T.dakara - 0.3) {
      const kt = prog(t, T.dakara + 0.8, T.dakara + 1.3);
      let cL = 0, cR = 0;
      for (let i = 0; i < N; i++) if (t >= this.t0 + i * this.dt + this.FLY) SIDE[i] === 'L' ? cL++ : cR++;
      for (const s of ['L', 'R']) {
        const x = TUBE[s], c = s === 'L' ? cL : cR;
        floorShadow(g, x, 90 * Math.min(1, kt));
        tube(g, x, TUBE.y, TUBE.h, kt, { fill: 0.08 + 0.72 * c / 21, mix: s === 'L' ? 1 : 0, n: c, seed: s === 'L' ? 3 : 4 });
      }
      const kc = prog(t, T.dakara + 0.8, T.dakara + 1.2);
      telop(g, `左　${cL}`, TUBE.L, 440, kc, { size: 48, color: '@L', align: 'center' });
      telop(g, `右　${cR}`, TUBE.R, 440, kc, { size: 48, color: '@R', align: 'center' });
      wrongBlock(g, t, T);
      telop(g, [['ラセミ体', `700 56px ${MIN}`], ['　←ラセミ酸', `700 36px ${JP}`, '@dim']], MX, 1000, prog(t, T.racemi, T.racemi + 0.8), { align: 'center' });
    }

    // tấm phẳng vẽ SAU gương (nằm trên mép gương)
    const P = flatMol(g, MX, py, ps * pulse, kP, yaw, face);
    // hạt đang bay (trên tấm)
    if (P.length && t > this.t0) for (let i = 0; i < N; i++) {
      const u = (t - this.t0 - i * this.dt) / this.FLY; if (u < 0 || u >= 1) continue;
      const s = SIDE[i], ex = TUBE[s], ey = TUBE.y - TUBE.h + 30, sx = MX + (s === 'L' ? -30 : 30), sy = py + 40;
      const e = smooth(u), x = sx + (ex - sx) * e, y = sy + (ey - sy) * e - 50 * Math.sin(Math.PI * e);
      g.fillStyle = s === 'L' ? C.L : C.R; g.beginPath(); g.arc(x, y, 8, 0, TAU); g.fill();
    }

    actCard(g, t, this.FROM, this.START, 3);
  }
}
// 「いつも半分ずつ？」 xám, gạch ở ほぼ, 「ほぼ同じ数」 ngay dưới.
function wrongBlock(g, t, T) {
  const b = wrong(g, 'いつも半分ずつ？', 1380, 250, prog(t, T.dakara + 0.6, T.dakara + 1.2), { size: 44, align: 'center', mincho: true });
  strike(g, b, prog(t, T.hobo, T.hobo + 0.35));
  telop(g, 'ほぼ同じ数', 1380, 336, prog(t, T.hobo + 0.1, T.hobo + 0.7), { size: 52, align: 'center', mincho: true });
}
