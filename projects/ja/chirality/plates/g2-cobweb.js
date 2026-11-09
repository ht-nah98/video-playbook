// g2 · 曲線を何度もたどる (p2, câu 92–102) — KHUNG LAB 1 (tools/lab/awasekagami.html khung 1) dựng lại bằng kit.graph:
//  gương = trục dọc; lưới + trục ở FROM; 「数学の目」 → đường thẳng (nét đứt, f1); x / y nghĩa là gì (cột phải);
//  ダンス → いちばん単純な式 → y＝2x/(1+x²) (đường cong hổ phách / azure); 「出てきた y を、次の x へ」; nhãn 「モデル」 (nền xương)
//  trên mặt bàn; 「実験 1995」 (khung bạc, SOAI_1995) ở cột phải để so; 2% → mạng nhện bước đúng từng chữ số 4…99% (MODEL),
//  dãy số chạy dọc mặt bàn; mascot `pointer` (không nói) mép TRÁI cầm que chỉ trong câu 97–98;
//  ほぼ2倍 / ねずみ算 (trái) → câu 100: vòng bạc quanh điểm 0; ゼロのまま; lệch nhỏ → hai mũi tên đẩy ra;
//  bút chì dựng trên đầu nhọn ở 0 (nửa hổ phách / nửa azure) lắc rồi đổ — 「不安定なつり合い」.
import { W, H, C, MX, JP, MIN, MODEL, SOAI_1995, f, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, mirror, write, telop, title,
  measure, arrow, graph, figure, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// một ô chữ thay phiên (mục cũ trượt lên khỏi dải). items: [[mốc, chữ | null, opts?]] tăng dần.
function slot(g, t, items, x, y, o = {}) {
  let i = -1; for (let j = 0; j < items.length; j++) if (t >= items[j][0]) i = j;
  const size = o.size ?? 44;
  const draw = (it, dy, k) => { const [, s, oo = {}] = it; if (!s) return;
    g.save(); g.beginPath(); g.rect(0, y - size * 1.3, W, size * 1.75); g.clip(); g.translate(0, -dy);
    telop(g, s, x, y, k, { ...o, ...oo }); g.restore(); };
  if (i >= 1) { const e = out(t, items[i][0], 0.35); if (e < 1) draw(items[i - 1], size * 1.7 * e, 1); }
  if (i >= 0) draw(items[i], 0, prog(t, items[i][0], items[i][0] + 0.5));
}
// bút chì: đầu nhọn tại (x, y), thân hướng lên, nghiêng ang (rad, + = sang phải). Nửa trái hổ phách, nửa phải azure.
function pencil(g, x, y, len, ang, k) {
  if (k <= 0) return;
  const e = outBack(clamp(k)), w = 30, cone = 50;
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(e, e);
  g.fillStyle = '#D8C3A0'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-w / 2, -cone); g.lineTo(w / 2, -cone); g.closePath(); g.fill();
  g.fillStyle = '#1A2133'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-w * 0.17, -cone * 0.34); g.lineTo(w * 0.17, -cone * 0.34); g.closePath(); g.fill();
  g.fillStyle = C.L; g.fillRect(-w / 2, -len, w / 2, len - cone);
  g.fillStyle = C.R; g.fillRect(0, -len, w / 2, len - cone);
  g.fillStyle = C.silver; g.fillRect(-w / 2, -len - 16, w, 16);
  g.strokeStyle = 'rgba(14,20,36,0.85)'; g.lineWidth = 2; g.strokeRect(-w / 2, -len - 16, w, len - cone + 16);
  g.restore();
}

const OY = 800, PW = 400, PH = 500, sx = v => MX + v * PW, sy = v => OY - v * PH;     // = mặc định của kit.graph
const BX = 1440, BW = 384;                                                                // cột phải

export default class Cobweb {
  static ERA = 'mirror';
  static POSES = ['pointer'];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2-cobweb');
    const S = i => L(i).start;
    this.T = {
      sugaku: w(92, '数学'),
      x93: w(93, 'x'), y93: w(93, 'y'),
      dance: w(94, 'ダンス'), tanjun: w(94, '単純'), shiki: w(94, '式'), formula: w(94, 'y＝2x/(1+x²)'),
      y95: w(95, 'y'), kuri95: w(95, '繰り返す'), model: w(95, 'モデル'),
      jikken: w(96, '実験'), p2: w(96, '2%'),
      steps: [w(97, '4%'), w(97, '8%'), w(97, '16%'), w(97, '31%'), w(98, '56%'), w(98, '86%'), w(98, '99%')],
      l97: S(97),
      nibai: w(99, '2倍'), nezumi: w(99, 'ねずみ算'),
      l100: S(100), zero100: w(100, 'ゼロ'),
      zero101: w(101, 'ゼロ', 2), zureru: w(101, 'ずれる'),
      enpitsu: w(102, '鉛筆'), fuantei: w(102, '不安定'),
    };
    this.START = S(92);
    this.FROM = Math.max(this.START - 1.2, L(91).end + 0.5);
    this.NUM = MODEL.map(v => Math.round(v * 100));
    must(`'${this.NUM.join()}'`, '2,4,8,16,31,56,86,99');                 // dãy MÔ HÌNH (nhãn 「モデル」)
    must(`'${SOAI_1995.join()}'`, '2,10,57,81,88');                       // số THÍ NGHIỆM (nhãn 「実験」)
    // "毎回ほぼ2倍": 4 bước đầu tỉ số trong [1.9, 2.0]
    must(`${MODEL.slice(1, 5).every((v, i) => v / MODEL[i] > 1.9 && v / MODEL[i] <= 2)}`, true);
    this.POINT = { cx: 150, h: 800 };
    must(`${f(0.5)}`, 0.8);                                                // bước bàn giao mẫu: x 0.5 → y 0.8 → x mới 0.8
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.sugaku, 'tick', -6), cue(T.x93, 'telop'), cue(T.y93, 'telop', -4),
      cue(T.dance, 'telop', -4), cue(T.formula, 'telop'),
      cue(T.y95, 'telop', -4), cue(T.kuri95, 'tick', -6), cue(T.model, 'telop'),
      cue(T.jikken, 'page'), cue(T.p2, 'web', -8),
      ...T.steps.slice(0, 6).map((a, i) => cue(a, 'web', -8 + i)), cue(T.steps[6], 'web99'),
      cue(T.nibai, 'telop', -4), cue(T.nezumi, 'telop'),
      cue(T.zero100, 'telop', -4), cue(T.zero101, 'telop', -4), cue(T.zureru, 'whoosh', -8),
      cue(T.enpitsu, 'tick', -4), cue(T.fuantei, 'telop'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    mirror(g);

    // ── đồ thị (không zoom: z 1.2 đẩy nhãn trục y vào bóng tiêu đề) ──
    const steps = T.steps.reduce((s, a) => s + prog(t, a - 0.35, a + 0.15), 0);
    graph(g, { axes: prog(t, F + 0.1, F + 0.9), line: prog(t, T.sugaku - 0.2, T.sugaku + 0.8), curve: prog(t, T.shiki - 0.2, T.formula + 0.6),
      web: t >= T.p2 ? { x0: 0.02, k: steps / 7, labels: true } : null, mirror: false });
    const k2 = prog(t, T.p2, T.p2 + 0.4);
    if (k2 > 0) {                                                              // điểm xuất phát 2% (và ảnh gương mờ)
      for (const [sg, col, a] of [[-1, C.L, 0.55], [1, C.R, 1]]) { g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.arc(sx(sg * 0.02), sy(0), 7 * outBack(k2), 0, 7); g.fill(); g.restore(); }
      write(g, '2%から', sx(0.02) + 36, sy(0) - 14, k2 * (1 - prog(t, T.steps[2], T.steps[2] + 0.4)), { font: `700 28px ${JP}`, color: '@R' });
    }
    // câu 100: vòng bạc quanh điểm 0
    const kz = prog(t, T.zero100 - 0.2, T.zero100 + 0.5);
    if (kz > 0) { g.save(); g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.arc(MX, OY, 34 + 3 * Math.sin(4 * (t - T.zero100)), -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * smooth(kz)); g.stroke(); g.restore(); }
    // câu 101: lệch nhỏ → đẩy ra hai phía
    const kd = prog(t, T.zureru - 0.1, T.zureru + 0.8);
    arrow(g, [[MX - 22, OY - 16], [MX - 190, OY - 16]], kd, { color: C.L, w: 4 });
    arrow(g, [[MX + 22, OY - 16], [MX + 190, OY - 16]], kd, { color: C.R, w: 4 });
    // câu 102: bút chì dựng trên đầu nhọn, lắc rồi đổ
    const kp = prog(t, T.enpitsu - 0.2, T.enpitsu + 0.4);
    const ang = 0.04 * Math.sin(5 * (t - T.enpitsu)) * kp + 1.25 * prog(t, T.fuantei + 0.4, T.fuantei + 3.4) ** 2;
    pencil(g, MX, OY - 2, 260, ang, kp);
    // câu 95: một bước bàn giao mẫu (bạc): x = 0.5 → lên đường cong (y) → ngang sang đường chéo (y thành x mới); rút về ở 実験
    const back = prog(t, T.jikken - 0.3, T.jikken + 0.3);
    arrow(g, [[sx(0.5), sy(0)], [sx(0.5), sy(f(0.5))]], prog(t, T.y95 - 0.2, T.y95 + 0.5) * (1 - back), { color: C.silver, w: 3 });
    arrow(g, [[sx(0.5), sy(f(0.5))], [sx(f(0.5)), sy(f(0.5))]], prog(t, T.kuri95 - 0.1, T.kuri95 + 0.6) * (1 - back), { color: C.silver, w: 3 });

    // ── nhãn 「モデル」 + dãy mô hình trên mặt bàn ──
    const kM = prog(t, T.model, T.model + 0.5);
    if (kM > 0) {
      const font = `700 30px ${JP}`, tw = measure(g, 'モデル', font), y = 962;
      g.save(); g.fillStyle = C.bone; g.beginPath(); g.roundRect(MX - 162, y - 34, (tw + 24) * outCubic(clamp(kM * 2)), 46, 6); g.fill(); g.restore();
      write(g, 'モデル', MX - 150, y, clamp(kM * 2 - 0.6), { font, color: C.bg, shadow: false });
    }
    if (k2 > 0) {
      const y = 962, font = `700 36px ${JP}`; let x = MX + 44;
      this.NUM.forEach((v, i) => {
        const k = i === 0 ? k2 : clamp(steps - i + 1), s = i === 7 ? `${v}%` : `${v}`;
        write(g, s, x, y, k, { font, color: i === 7 ? '@ink' : '@R' }); x += measure(g, s, font);
        if (i < 7) { arrow(g, [[x + 10, y - 12], [x + 36, y - 12]], clamp(steps - i), { color: C.dim, w: 2.5, head: 10 }); x += 46; }
      });
    }

    // ── cột phải: x / y, công thức, bước lặp, 実験 1995 → rời ở câu 100 ──
    const oR = out(t, T.l100 - 0.3, 0.6);
    if (oR < 1) {
      g.save(); g.translate(600 * oR, 0);
      slot(g, t, [[T.dance, 'ダンスのたとえを', { size: 32, color: '@dim' }], [T.tanjun, 'いちばん単純な式に', { size: 32, color: '@dim' }],
        [T.formula, 'y＝2x/(1+x²)', { size: 44 }]], BX, 290, { size: 44 });
      telop(g, 'x：入れたかたより', BX, 360, prog(t, T.x93, T.x93 + 0.5), { size: 30 });
      telop(g, 'y：出てきたかたより', BX, 405, prog(t, T.y93, T.y93 + 0.5), { size: 30 });
      telop(g, '出てきた y を、次の x へ', BX, 460, prog(t, T.y95, T.y95 + 1.0), { size: 30, color: '@dim' });
      const kb = prog(t, T.jikken - 0.2, T.jikken + 0.5);
      if (kb > 0) {
        const y0 = 500, by = 820, bh = 200, bx0 = BX + 40, bw = 50, gap = (BW - 80 - 5 * bw) / 4;
        g.save(); g.translate(0, Math.round((1 - outCubic(kb)) * 120));
        g.fillStyle = 'rgba(8,12,22,0.75)'; g.strokeStyle = C.silver; g.lineWidth = 2; g.beginPath(); g.roundRect(BX, y0, BW, 380, 10); g.fill(); g.stroke();
        write(g, '実験 1995', BX + 24, y0 + 45, kb, { font: `700 34px ${MIN}` });
        write(g, '硤合反応', BX + BW - 24, y0 + 45, kb, { font: `500 28px ${JP}`, color: '@dim', align: 'right' });
        SOAI_1995.forEach((v, i) => {
          const X = bx0 + i * (bw + gap), kk = smooth(prog(t, T.jikken + 0.2 + i * 0.15, T.jikken + 0.7 + i * 0.15)), hh = bh * v / 100 * kk;
          const gr = g.createLinearGradient(0, by - hh, 0, by); gr.addColorStop(0, '#E8EDF5'); gr.addColorStop(1, '#8A93A6'); g.fillStyle = gr; g.fillRect(X, by - hh, bw, hh);
          write(g, `${v}%`, X + bw / 2, by - bh * v / 100 - 12, kk >= 1 ? 1 : 0, { font: `700 28px ${JP}`, align: 'center' });
          write(g, i === 0 ? '最初' : `${i}回`, X + bw / 2, by + 38, kb, { font: `500 28px ${JP}`, color: '@dim', align: 'center' });
        });
        g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); g.moveTo(BX + 28, by + 0.5); g.lineTo(BX + BW - 28, by + 0.5); g.stroke();
        g.restore();
      }
      g.restore();
    }

    // ── kính lúp (câu 97): các bước đầu 2→4→8→16 nằm sát / sau gương — phóng ×3 quanh (975, 760) vào vòng ở (600, 560),
    //    nơi que chỉ của mascot hướng tới; chỉ hình, không chữ ──
    const kl = prog(t, T.l97 - 0.4, T.l97 + 0.2) * (1 - prog(t, T.steps[4] - 0.4, T.steps[4] + 0.1));
    if (kl > 0) {
      const LX = 600, LY = 560, SC = 3, FX = 975, FY = 760, R = 140 * outCubic(kl), r = R / SC;
      g.save(); g.strokeStyle = 'rgba(201,210,224,0.7)'; g.lineWidth = 2; g.setLineDash([6, 6]);
      g.beginPath(); g.arc(FX, FY, r, 0, 7); g.stroke();
      g.beginPath(); g.moveTo(FX - r * 0.7, FY - r * 0.7); g.lineTo(LX + R * 0.7, LY + R * 0.7); g.stroke(); g.restore();
      g.save(); g.beginPath(); g.arc(LX, LY, R, 0, 7); g.clip(); g.fillStyle = C.bg; g.fillRect(LX - R, LY - R, 2 * R, 2 * R);
      g.translate(LX, LY); g.scale(SC, SC); g.translate(-FX, -FY);
      mirror(g);
      graph(g, { axes: 1, line: 1, curve: 1, web: { x0: 0.02, k: steps / 7, labels: false, echo: false }, mirror: false });
      g.fillStyle = C.R; g.beginPath(); g.arc(sx(0.02), sy(0), 4, 0, 7); g.fill();
      g.restore();
      g.save(); g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.arc(LX, LY, R, 0, 7); g.stroke(); g.restore();
    }

    // ── mascot pointer (mép trái, không nói) — câu 97 → đầu câu 98 ──
    const oP = out(t, T.steps[4] - 0.3, 0.6);
    if (t > T.l97 - 0.6 && oP < 1) {
      const { cx, h } = this.POINT;
      g.save(); g.translate(0, 900 * oP);
      figure(g, 'pointer', cx, H, h, prog(t, T.l97 - 0.5, T.l97 + 0.1), { talk: false });
      g.restore();
    }

    // ── chữ trái: ほぼ2倍 / ねずみ算 (câu 99) → rời ở câu 100; ゼロのまま / 広がる / 不安定 (câu 101–102) ──
    const oL = out(t, T.l100 - 0.3, 0.5);
    if (t > T.nibai - 0.2 && oL < 1) {
      g.save(); g.translate(-700 * oL, 0);
      telop(g, '毎回ほぼ2倍', 120, 420, prog(t, T.nibai, T.nibai + 0.5), { size: 48 });
      telop(g, 'ねずみ算', 120, 510, prog(t, T.nezumi, T.nezumi + 0.5), { size: 56, mincho: true });
      g.restore();
    }
    telop(g, 'ゼロなら、ゼロのまま', 120, 420, prog(t, T.zero101, T.zero101 + 0.7), { size: 36 });
    telop(g, 'ずれると、広がる', 120, 480, prog(t, T.zureru, T.zureru + 0.6), { size: 36 });
    telop(g, '不安定なつり合い', 120, 600, prog(t, T.fuantei, T.fuantei + 0.7), { size: 52, mincho: true });

    title(g, '曲線を何度もたどる', t, F + 0.15);
  }
}
