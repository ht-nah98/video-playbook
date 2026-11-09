// i1 · 化学者の目 (p2 câu 120–127, mở hồi 8). DNA: 「反応で作られているわけではない」; đồ thị thẳng / cong như dụng cụ đo
// (kính lúp); 3.6% (thuốc tổng hợp mới, Mỹ, 10 năm gần đây — SCRIPT nguồn McVicker & O'Boyle 2024).
//  120 thẻ hồi 第八幕; ô kính ③ (câu hỏi a0) trượt ra từ gương ở 3つ目
//  121 mascot `ponder` (NÓI) bên trái 「意外かもしれませんが」; ô ③ rút vào gương; viên thuốc + 「硤合反応でつくる薬？」 xám, gạch
//  122 ngay dưới: 「変わったのは 化学者の「見る目」」
//  123 đồ thị kit (trục = gương, CÙNG oy/pw/ph): trục ở 触媒, 直線 (nét đứt) ở 直線, cong ở 曲線
//  124 kính lúp trượt lên chỗ phồng của đường cong; trong kính: cặp xúc tác (đồng tay chạy / cặp lẫn đứng) — 「見えない反応の中」
//      「触媒の働きがわかる」「手がかり」
//  125 ống nghiệm trái: hạt chuyển về một tay 「しくみがわかれば」「より純粋に」
//  126–127 lưới 1000 viên thuốc (nửa trái); 「アメリカ・最近の10年間」「化学合成の新薬」; 36 viên hai màu 「混ざったまま」 → 「3.6%」
import { W, H, C, MX, JP, QUESTIONS, clamp, prog, lookup, must, outCubic, smooth, hash, ground, mirror, telop, wrong, strike, title,
  actCard, actCues, pane, PANES, graph, tube, figure, floorShadow, zoom, cue, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// lưới 1000 viên: 40 × 25, 36 viên còn "hai tay" (3.6%), chọn cố định bằng hash
const GC = 40, GR = 25, GN = GC * GR, MIXN = 36, GX = 140, GY = 380, GS = 18;
const MIXED = new Set(Array.from({ length: GN }, (_, i) => [hash(i * 3.17 + 0.9), i]).sort((a, b) => a[0] - b[0]).slice(0, MIXN).map(p => p[1]));

// viên thuốc con nhộng (vật cục bộ — chỉ i1): hai nửa trung tính
function capsule(g, x, y, s, k, rot = -0.5) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 140); g.rotate(rot); g.scale(e, e);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.roundRect(-s + 8, -s * 0.42 + 10, 2 * s, s * 0.84, s * 0.42); g.fill();
  g.save(); g.beginPath(); g.roundRect(-s, -s * 0.42, 2 * s, s * 0.84, s * 0.42); g.clip();
  g.fillStyle = C.silver; g.fillRect(-s, -s, s, 2 * s); g.fillStyle = '#5D6678'; g.fillRect(0, -s, s, 2 * s);
  g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(-s * 0.8, -s * 0.3, s * 1.6, s * 0.1); g.restore();
  g.strokeStyle = C.text; g.lineWidth = 2; g.beginPath(); g.roundRect(-s, -s * 0.42, 2 * s, s * 0.84, s * 0.42); g.stroke();
  g.restore();
}
// kính lúp: vòng kính + cán; inner(g) vẽ trong vòng (đã clip)
function lens(g, x, y, r, k, inner) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y); g.scale(e, e); g.translate(-x, -y);
  g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip(); g.fillStyle = 'rgba(14,20,36,0.82)'; g.fillRect(x - r, y - r, 2 * r, 2 * r); inner(); g.restore();
  g.strokeStyle = '#3A4256'; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + r * 0.74, y + r * 0.74); g.lineTo(x + r * 1.45, y + r * 1.45); g.stroke();
  g.strokeStyle = C.silver; g.lineWidth = 7; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.4)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r - 9, -2.6, -1.6); g.stroke();
  g.restore();
}

export default class Me {
  static ERA = 'mirror';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'i1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l120: S(120), mittsu: w(120, '3つ目'),
      l121: S(121), igai: w(121, '意外'), kusuri: w(121, '薬'), soai: w(121, '硤合'), arimasen: w(121, 'ありません'), e121: E(121),
      l122: S(122), kawatta: w(122, '変わった'), kagakusha: w(122, '化学者'), me: w(122, '目'),
      l123: S(123), shokubai: w(123, '触媒'), hakaru: w(123, '測る'), chokusen: w(123, '直線'), kyokusen: w(123, '曲線'),
      l124: S(124), mienai: w(124, '見えない'), hataraite: w(124, '働いて'), wakaru: w(124, 'わかる'), tegakari: w(124, '手がかり'),
      l125: S(125), shikumi: w(125, 'しくみ'), hoshii: w(125, '欲しい'), junsui: w(125, '純粋'), tsukureru: w(125, '作れる'),
      l126: S(126), america: w(126, 'アメリカ'), nen10: w(126, '10年間'), kagaku: w(126, '化学'), shinyaku: w(126, '新薬'),
      l127: S(127), mazatta: w(127, '混ざった'), p36: w(127, '3.6%'), end: E(127),
    };
    this.START = S(120);
    this.FROM = Math.max(this.START - 2.6, E(119) + 0.5);
    must(`${MIXED.size} / ${GN} * 100`, 3.6);
    this.PCT = `${(MIXED.size / GN * 100).toFixed(1)}%`;
    must(`'${this.PCT}'`, '3.6%');
    this.FIG = { cx: 300, h: 700 };
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START), cue(T.mittsu, 'glass', -6),
      cue(T.kusuri, 'telop', -4), cue(T.soai, 'telop'), cue(T.arimasen, 'pen'), cue(T.kagakusha, 'telop'),
      cue(T.shokubai, 'tick'), cue(T.chokusen, 'pen'),
      cue(T.mienai, 'glass'), cue(T.wakaru, 'telop'),
      cue(T.shikumi, 'tube'), cue(T.hoshii, 'tick', -8), cue(T.junsui, 'telop', -4), cue(T.america, 'page'), cue(T.shinyaku, 'tick', -4),
      cue(T.mazatta, 'telop'), cue(T.p36, 'telop', 0),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    title(g, '化学者の目', t, T.l121 - 0.6);

    // ── 120–121: ô kính ③ trượt ra / rút vào gương ──
    const kP = prog(t, this.FROM + 0.1, this.FROM + 0.8) * (1 - prog(t, T.kusuri - 0.5, T.kusuri + 0.1));
    if (kP > 0) pane(g, 3, PANES.x, PANES.y0 + 2 * (PANES.h + PANES.gap), PANES.w, PANES.h, kP, { text: QUESTIONS[2], kText: prog(t, T.mittsu, T.mittsu + 1.4) });

    // ── 121: mascot ponder (NÓI) ──
    const oM = out(t, T.l122 + 0.2, 0.5);
    if (t > T.igai - 0.6 && oM < 1) {
      const { cx, h } = this.FIG;
      g.save(); g.translate(0, 760 * oM);
      figure(g, 'ponder', cx, H, h, prog(t, T.igai - 0.4, T.igai + 0.2), { t });
      g.restore();
    }

    // ── 121–122: viên thuốc, hiểu lầm gạch → sửa ngay dưới ──
    const oW = out(t, T.l123 + 0.4, 0.5);
    if (t > T.kusuri - 0.4 && oW < 1) {
      g.save(); g.translate(0, -760 * oW);
      capsule(g, 1380, 360, 70, prog(t, T.kusuri - 0.1, T.kusuri + 0.4));
      const b = wrong(g, '硤合反応でつくる薬？', 1000, 540, prog(t, T.soai, T.soai + 0.8), { size: 48, mincho: true });
      strike(g, b, prog(t, T.arimasen, T.arimasen + 0.4));
      telop(g, '変わったのは', 1000, 640, prog(t, T.kawatta, T.kawatta + 0.5), { size: 40, color: '@dim', mincho: true });
      telop(g, '化学者の「見る目」', 1000, 730, prog(t, T.kagakusha, T.me + 0.3), { size: 60, mincho: true });
      g.restore();
    }

    // ── 123–125: đồ thị = dụng cụ đo ──
    const kG = prog(t, T.l123 - 0.3, T.l123 + 0.4), oG = out(t, T.l126 - 0.4, 0.6);
    if (kG > 0 && oG < 1) {
      g.save(); g.translate(0, Math.round(720 * (1 - outCubic(kG)) + 720 * oG));
      const axes = prog(t, T.shokubai - 0.1, T.hakaru + 0.3);
      graph(g, { axes, line: prog(t, T.chokusen, T.chokusen + 0.8), curve: prog(t, T.kyokusen, T.kyokusen + 0.8), mirror: false });
      telop(g, '直線か', 1420, 430, prog(t, T.chokusen, T.chokusen + 0.4), { size: 48, color: '@bone', mincho: true });
      telop(g, '曲線か', 1420, 520, prog(t, T.kyokusen, T.kyokusen + 0.4), { size: 48, mincho: true });
      telop(g, '（モデル）', 1420, 575, prog(t, T.kyokusen + 0.4, T.kyokusen + 0.8), { size: 28, color: '@dim' });
      // kính lúp lên chỗ phồng (x = 0.4 → f = 0.69) — trong kính: cặp xúc tác (đồng tay chạy, cặp lẫn đứng yên)
      const kl = prog(t, T.mienai - 0.3, T.mienai + 0.5), lx = 1090 + 120 * (1 - smooth(kl)), ly = 455;
      lens(g, lx, ly, 120, kl, () => {
        g.save(); zoom(g, 1.5, lx, ly);
        g.strokeStyle = C.R; g.lineWidth = 4; g.beginPath(); for (let i = 0; i <= 40; i++) { const v = 0.2 + 0.4 * i / 40, px = MX + v * 400, py = 800 - 500 * (2 * v / (1 + v * v)); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
        g.restore();
        const tt = t - T.mienai, pairs = [[C.R, C.R, 1], [C.L, C.R, 0], [C.R, C.R, 1]];
        pairs.forEach(([a, b, run], i) => {
          const px = lx - 60 + i * 60 + (run ? 10 * Math.sin(tt * 4 + i) : 0), py = ly - 40 + i * 40 + (run ? 8 * Math.cos(tt * 5 + i * 2) : 0);
          for (const [dx, col] of [[-10, a], [10, b]]) { g.fillStyle = col; g.beginPath(); g.arc(px + dx, py, 10, 0, TAU); g.fill(); }
          g.strokeStyle = C.text; g.lineWidth = 2; g.beginPath(); g.moveTo(px - 2, py); g.lineTo(px + 2, py); g.stroke();
        });
      });
      g.restore();
    }
    // chữ trái 124 (đồ thị chiếm giữa), rời ở 125
    const oL = out(t, T.l125 - 0.4, 0.5);
    if (t > T.l124 - 0.3 && oL < 1) {
      g.save(); g.translate(-900 * oL, 0);
      telop(g, '見えない反応の中', 120, 380, prog(t, T.mienai, T.mienai + 0.6), { size: 40, mincho: true });
      telop(g, '触媒の働きが', 120, 470, prog(t, T.hataraite - 0.4, T.hataraite + 0.2), { size: 40, mincho: true });
      telop(g, 'わかる', 120, 560, prog(t, T.wakaru, T.wakaru + 0.3), { size: 52, mincho: true });
      telop(g, '手がかり', 120, 680, prog(t, T.tegakari, T.tegakari + 0.4), { size: 64, mincho: true });
      g.restore();
    }
    // 125: ống nghiệm trái — hạt về một tay
    const oT = out(t, T.l126 - 0.4, 0.6);
    if (t > T.l125 - 0.4 && oT < 1) {
      g.save(); g.translate(0, 720 * oT);
      telop(g, 'しくみがわかれば', 120, 360, prog(t, T.shikumi, T.shikumi + 0.6), { size: 40, mincho: true });
      floorShadow(g, 300, 90);
      tube(g, 300, 800, 380, prog(t, T.shikumi - 0.2, T.shikumi + 0.4), { fill: 0.6, mix: 0.6 + 0.4 * smooth(prog(t, T.hoshii, T.junsui + 0.4)), n: 30, seed: 5 });
      telop(g, 'より純粋に', 300, 900, prog(t, T.junsui, T.junsui + 0.4), { size: 44, mincho: true, align: 'center' });
      g.restore();
    }

    // ── 126–127: lưới 1000 viên thuốc (nửa trái) ──
    if (t > T.shinyaku - 0.6) {
      const kg = prog(t, T.shinyaku - 0.4, T.shinyaku + 0.8), km = prog(t, T.mazatta, T.mazatta + 0.8);
      for (let i = 0; i < GN; i++) {
        const r = Math.floor(i / GC), c = i % GC, ki = clamp(kg * 1.6 - r / GR * 0.6);
        if (ki <= 0) continue;
        const x = GX + c * GS + GS / 2, y = GY + r * GS + GS / 2, rad = 6.5 * outCubic(ki);
        if (MIXED.has(i) && km > 0) {
          const rr = rad * (1 + 0.5 * km);
          g.fillStyle = C.L; g.beginPath(); g.arc(x, y, rr, Math.PI / 2, Math.PI * 1.5); g.fill();
          g.fillStyle = C.R; g.beginPath(); g.arc(x, y, rr, -Math.PI / 2, Math.PI / 2); g.fill();
        } else { g.fillStyle = MIXED.has(i) ? C.bone : `rgba(174,182,198,${0.55 - 0.25 * km})`; g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill(); }
      }
    }
    if (t > T.l126 - 0.3) {
      telop(g, 'アメリカ', 1000, 380, prog(t, T.america, T.america + 0.4), { size: 44 });
      telop(g, '最近の10年間に承認', 1000, 460, prog(t, T.nen10, T.nen10 + 0.8), { size: 44 });
      telop(g, '化学合成の新薬', 1000, 540, prog(t, T.kagaku, T.shinyaku + 0.3), { size: 44, mincho: true });
      telop(g, '右と左が混ざったまま', 1000, 680, prog(t, T.mazatta - 0.5, T.mazatta + 0.4), { size: 44, mincho: true });
      telop(g, this.PCT, 1000, 850, prog(t, T.p36, T.p36 + 0.4), { size: 120, font: `900 120px ${JP}` });
    }

    mirror(g);
    actCard(g, t, this.FROM, this.START, 8);
  }
}
