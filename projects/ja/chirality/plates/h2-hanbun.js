// h2 · ぴったり半分は、むずかしい (p2 câu 113–119). DNA: 100 đồng xu, phân bố nhị thức, cột giữa 50 ≈ 8%; ずれ → mạng nhện nhỏ
// đẩy ra; lưu ý uỷ ban 「人工的」「水の中では進まない」.
//  113 đồng xu quay → 「コインを100回」; 表 = phía 左, 裏 = phía 右; cột P(k 表) mọc lên, trục giữa = gương, cột 50 bạc (đứng
//      TRƯỚC gương) 「ぴったり50回ずつ」 → 「≈ 8%」 (must C(100,50)/2¹⁰⁰)
//  114 nhãn trục 表/裏 → 左/右; 分子の数が多いほど: số lần N tăng (100 → 10 000, phân bố chuẩn) — mọi cột thấp xuống, cột giữa
//      gần như mất 「ぴったり同じ数は、まずない」
//  115 cột rời; đồ thị kit (CÙNG oy/pw/ph) + mạng nhện từ 2% 「モデル」: 「わずかなずれ」→「自己触媒が押し広げる」
//  116 đồng xu lớn bên trái quay, tung MỘT lần rồi nằm: 「生命が片手を選んだのも」「遠い昔の」「一回のコイン投げ？」
//  117–118 bên phải: 「ノーベル委員会の注意」 + ba dòng 人工的 / 水の中では進まない / 生命の道とはちがう
//  119 đồng xu rơi vào ống nghiệm; hạt trong ống chuyển dần về một tay: 「わずかな偶然」「→ 片手だけの世界」「試験管の中で」
import { W, H, C, MX, JP, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, telop, title, graph, coin, tube,
  floorShadow, arrow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// xác suất đúng 50 / 50 khi tung 100 đồng (CONTENT: C(100,50)/2¹⁰⁰ ≈ 7.96%) — tính bằng BigInt, hiện làm tròn 8%
const C100 = '[...Array(50).keys()].reduce((a, i) => a * BigInt(51 + i) / BigInt(i + 1), 1n)';
const P50 = Number(Function(`return ${C100}`)()) / 2 ** 100;
// cột: d = (số 表) − N/2, x = MX − d·DX (nhiều 表 → bên trái); chiều cao ~ phân bố chuẩn của N lần (N = 100 khớp C(100,·) tới 0.3%)
const DX = 20, DMAX = 18, BASE = 800, SCALE = 380 / 0.0796;
const pN = (d, N) => Math.sqrt(2 / (Math.PI * N)) * Math.exp(-2 * d * d / N);

export default class Hanbun {
  static ERA = 'mirror';
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l113: S(113), n100: w(113, '100回'), omote: w(113, '表'), ura: w(113, '裏'), pittari: w(113, 'ぴったり'), n50: w(113, '50回'), p8: w(113, '8%'),
      l114: S(114), bunshi: w(114, '分子'), ooi: w(114, '多い'), migi: w(114, '右'), hidari: w(114, '左'), onaji: w(114, '同じ'), mazu: w(114, 'まず'), e114: E(114),
      l115: S(115), jiko: w(115, '自己'), zure: w(115, 'ずれ'), oshi: w(115, '押し広げて'), e115: E(115),
      l116: S(116), seimei: w(116, '生命'), toi: w(116, '遠い'), ikkai: w(116, '一回'), koin: w(116, 'コイン'), e116: E(116),
      l117: S(117), nobel: w(117, 'ノーベル'),
      l118: S(118), jinko: w(118, '人工的'), mizu: w(118, '水'), seimei2: w(118, '生命'), chigai: w(118, 'ちがいます'),
      l119: S(119), guzen: w(119, '偶然'), katate: w(119, '片手'), sekai: w(119, '世界'), shiken: w(119, '試験'), end: E(119),
    };
    this.START = S(113);
    this.FROM = Math.max(this.START - 1.2, E(112) + 0.5);
    must(`Math.round(Number(${C100}) / 2^100 * 100)`, 8);
    must(`Math.abs(${pN(0, 100)} - ${P50}) < 0.001`, true);                  // chuẩn ≈ nhị thức ở N = 100
    this.PCT = `≈ ${Math.round(P50 * 100)}%`;
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.7, 'coin', -4), cue(T.n100, 'telop'), cue(T.omote, 'telop', -4), cue(T.n50, 'telop'), cue(T.p8, 'telop'),
      cue(T.bunshi, 'telop', -4), cue(T.mazu, 'telop'),
      cue(T.zure, 'web'), cue(T.zure + 0.6, 'web', -6), cue(T.oshi, 'telop'),
      cue(T.seimei, 'telop', -4), cue(T.koin, 'coin'),
      cue(T.nobel, 'page'), cue(T.jinko, 'telop'), cue(T.mizu, 'telop'), cue(T.chigai, 'telop'),
      cue(T.guzen, 'telop'), cue(T.sekai, 'tube'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    title(g, 'ぴったり半分は、むずかしい', t, this.FROM + 0.2, { size: 54 });

    // ── 113–114: cột phân bố (trục giữa = gương) ──
    const oB = out(t, T.l115 - 0.4, 0.6);
    const kB = smooth(prog(t, T.omote - 0.1, T.pittari + 0.2));
    const m = smooth(prog(t, T.bunshi, T.mazu + 0.3)), N = 100 * 100 ** m;           // 100 → 10 000
    const bars = () => {
      for (let d = -DMAX; d <= DMAX; d++) {
        if (d === 0) continue;
        const x = MX - d * DX, h = pN(d, N) * SCALE * kB;
        g.fillStyle = d > 0 ? C.L : C.R; g.globalAlpha = 0.9; g.fillRect(x - 7, BASE - h, 14, h); g.globalAlpha = 1;
      }
      g.strokeStyle = C.bone; g.lineWidth = 2.5; g.beginPath(); g.moveTo(MX - DMAX * DX - 20, BASE); g.lineTo(MX + DMAX * DX + 20, BASE); g.stroke();
    };
    const mid = () => {                                       // cột 50 / 50: bạc, đứng TRƯỚC gương
      const h = pN(0, N) * SCALE * kB, hi = prog(t, T.pittari, T.n50 + 0.3);
      if (h <= 0) return;
      g.fillStyle = C.silver; g.fillRect(MX - 10, BASE - h, 20, h);
      if (hi > 0) { g.strokeStyle = C.text; g.lineWidth = 3; g.globalAlpha = hi; g.strokeRect(MX - 14, BASE - h - 4, 28, h + 4); g.globalAlpha = 1; }
    };
    if (oB < 1 && t > T.omote - 0.3) { g.save(); g.translate(0, 720 * oB); bars(); g.restore(); }

    // 113 mở: đồng xu (vật của h1) quay giữa nửa trái, rơi khỏi khung khi cột mọc
    const oC = out(t, T.omote - 0.3, 0.6);
    if (oC < 1) {
      const kc = prog(t, this.FROM, this.FROM + 0.4), y = 600 + 600 * oC + 30 * Math.sin((t - this.FROM) * 2.2);
      coin(g, 560, y, 80, kc, { spin: (t - this.FROM) * 5 });
    }
    // chữ trái (113–114)
    if (oB < 1) {
      g.save(); g.translate(-900 * oB, 0);
      telop(g, 'コインを100回', 120, 330, prog(t, T.n100, T.n100 + 0.5), { size: 44 });
      const kp = prog(t, T.n50, T.n50 + 0.6);
      telop(g, 'ぴったり50回ずつ', 120, 420, kp, { size: 44, mincho: true });
      arrow(g, [[450, 440], [700, 400], [MX - 18, BASE - pN(0, N) * SCALE * kB - 6]], prog(t, T.n50 + 0.3, T.n50 + 0.9), { color: C.text });
      telop(g, this.PCT, 120, 530, prog(t, T.p8, T.p8 + 0.4), { size: 80, font: `700 80px ${JP}` });
      telop(g, '（100回のとき）', 124, 590, prog(t, T.bunshi, T.bunshi + 0.5), { size: 28, color: '@dim' });
      telop(g, '分子の数が多いほど', 120, 665, prog(t, T.bunshi, T.ooi + 0.4), { size: 40, mincho: true });
      telop(g, 'ぴったり同じ数は', 120, 735, prog(t, T.onaji - 0.6, T.onaji + 0.3), { size: 40, mincho: true });
      telop(g, 'まずない', 120, 815, prog(t, T.mazu, T.mazu + 0.4), { size: 56, mincho: true });
      g.restore();
      // nhãn trục: 表 / 裏 → 左 / 右 (chữ cũ xoá ngược, chữ mới viết ra)
      g.save(); g.translate(0, 720 * oB);
      const sw = prog(t, T.migi - 0.2, T.hidari + 0.3), kO = prog(t, T.omote, T.omote + 0.4), kU = prog(t, T.ura, T.ura + 0.4);
      telop(g, '表が多い', MX - 230, 880, Math.min(kO, 1 - sw * 2), { size: 36, color: '@L', align: 'center' });
      telop(g, '裏が多い', MX + 230, 880, Math.min(kU, 1 - sw * 2), { size: 36, color: '@R', align: 'center' });
      telop(g, '左が多い', MX - 230, 880, clamp(sw * 2 - 1), { size: 36, color: '@L', align: 'center' });
      telop(g, '右が多い', MX + 230, 880, clamp(sw * 2 - 1), { size: 36, color: '@R', align: 'center' });
      g.restore();
    }

    // ── 115: đồ thị + mạng nhện (mô hình) ──
    const kG = prog(t, T.l115 - 0.3, T.l115 + 0.4), oG = out(t, T.l116 - 0.3, 0.6);
    if (kG > 0 && oG < 1) {
      g.save(); g.translate(0, Math.round(720 * (1 - outCubic(kG)) + 720 * oG));
      graph(g, { axes: 1, curve: prog(t, T.jiko, T.jiko + 0.8), web: { x0: 0.02, k: prog(t, T.zure, T.oshi + 1.2) }, mirror: false });
      telop(g, 'モデル', 1440, 340, 1, { size: 36, color: '@dim' });
      g.restore();
      g.save(); g.translate(-900 * oG, 0);
      telop(g, 'わずかなずれ', 120, 400, prog(t, T.zure, T.zure + 0.5), { size: 44, mincho: true });
      telop(g, '自己触媒が', 120, 490, prog(t, T.oshi - 0.3, T.oshi + 0.2), { size: 44, mincho: true });
      telop(g, '押し広げる', 120, 570, prog(t, T.oshi, T.oshi + 0.5), { size: 56, mincho: true });
      g.restore();
    }

    // ── 116–119: đồng xu lớn bên trái → rơi vào ống nghiệm ──
    if (t > T.l116 - 0.6) {
      const kc = prog(t, T.l116 - 0.4, T.l116 + 0.2);
      const toss = prog(t, T.ikkai, T.ikkai + 1.6), land = smooth(prog(t, T.ikkai + 1.4, T.ikkai + 1.8));
      const drop = smooth(prog(t, T.guzen - 0.6, T.guzen + 0.3));                     // 119: rơi vào miệng ống
      const cx = 560, cy0 = 430, hop = 4 * toss * (1 - toss) * 260;
      const spin = toss < 1 ? (t - T.l116) * 3 + toss * 18 : 0;
      const tiltC = 1 - 0.75 * land * (1 - drop);
      const cy = cy0 - hop + 330 * land * (1 - drop) - 40 * drop;
      if (drop < 1) { floorShadow(g, cx, 120 * kc * (1 - drop)); coin(g, cx, cy, 90 * (1 - 0.7 * drop), kc, { spin: toss < 1 && toss > 0 ? spin : (t - T.l116) * 1.2 * (1 - land), tilt: tiltC }); }
      // ống nghiệm (119): hạt chuyển dần về một tay (左) — tự xúc tác
      const kt = prog(t, T.guzen - 0.8, T.guzen - 0.2);
      if (kt > 0) { floorShadow(g, cx, 90); tube(g, cx, 800, 380, kt, { fill: 0.6, mix: 0.55 + 0.45 * smooth(prog(t, T.katate, T.sekai + 0.6)), n: 30, seed: 3 }); }
    }

    // chữ phải (116): 生命 … 一回のコイン投げ？
    const oR1 = out(t, T.l117 - 0.4, 0.5);
    if (t > T.l116 - 0.3 && oR1 < 1) {
      g.save(); g.translate(0, -700 * oR1);
      telop(g, '生命が片手を選んだのも', 1000, 400, prog(t, T.seimei, T.seimei + 1.0), { size: 48, mincho: true });
      telop(g, '遠い昔の', 1000, 490, prog(t, T.toi, T.toi + 0.4), { size: 40, color: '@dim', mincho: true });
      telop(g, '一回のコイン投げ？', 1000, 590, prog(t, T.ikkai, T.koin + 0.6), { size: 56, mincho: true });
      g.restore();
    }
    // 117–118: lưu ý của uỷ ban
    const oR2 = out(t, T.l119 - 0.4, 0.5);
    if (t > T.l117 - 0.4 && oR2 < 1) {
      g.save(); g.translate(0, -800 * oR2);
      telop(g, 'ノーベル委員会の注意', 1000, 380, prog(t, T.nobel, T.nobel + 0.8), { size: 48, mincho: true });
      g.fillStyle = C.bone; g.fillRect(1000, 410, 460 * outCubic(prog(t, T.nobel + 0.5, T.nobel + 1.0)), 2);
      telop(g, '・人工的な反応', 1000, 500, prog(t, T.jinko, T.jinko + 0.5), { size: 44 });
      telop(g, '・水の中では進まない', 1000, 590, prog(t, T.mizu, T.mizu + 0.8), { size: 44 });
      telop(g, '・生命がたどった道とはちがう', 1000, 680, prog(t, T.seimei2, T.chigai + 0.3), { size: 44 });
      g.restore();
    }
    // 119: kết
    if (t > T.l119 - 0.3) {
      telop(g, 'わずかな偶然が', 1000, 420, prog(t, T.guzen - 0.3, T.guzen + 0.3), { size: 52, mincho: true });
      telop(g, '片手だけの世界を', 1000, 520, prog(t, T.katate, T.sekai + 0.3), { size: 52, mincho: true });
      telop(g, '試験管の中で', 1000, 620, prog(t, T.shiken, T.shiken + 0.5), { size: 40, color: '@dim', mincho: true });
    }

    mirror(g);
    if (oB < 1 && t > T.omote - 0.3) { g.save(); g.translate(0, 720 * oB); mid(); g.restore(); }
  }
}
