// b1 · 測っていた時代 (p2, câu 0–6) — mở HỒI 1 (thẻ hồi「第一幕 円をはさみうちにする」), mở p2 từ ĐEN (DNA §6: sao hiện dần,
// vành sáng lên). Vành đồng thau bên phải = đĩa đo: giữa vành là GIÁ TRỊ đang biết, cuộn như mặt số (≈ ? → 3 → 3.125 →
// ≈ 3.16). Bên trái: hiện vật (bảng đất sét Babylon vẽ tay, sách cói Rhind ảnh thật khung đồng). Đáy khung: thước thời
// gian đồng thau — "giá trị" ở đầu trái (Babylon, Ai Cập), "理由" ở đầu phải còn trống (dấu ？ thép) → b2 Archimedes.
// Kết: 「測った値 ≠ 理由」.
import { W, H, C, MIN, JP, CG, TAU, clamp, prog, lookup, must, outCubic, smooth, hash, sk,
  ground, dark, ring360, circleLine, bead, engrave, telop, rule, heading, actCard, plate } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));            // 0 → 1 rời khung

// bảng đất sét (riêng b1): thân đất nung, mép vê tròn, hàng dấu nêm 楔形 tất định; k = trượt lên
function tablet(g, x, y, w, h, k) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * (H - y + 60), rot = (1 - outCubic(clamp(k))) * 0.06 + 0.035;
  g.save(); g.translate(x + w / 2, y + h / 2 + dy); g.rotate(rot); g.translate(-w / 2, -h / 2);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.beginPath(); g.roundRect(12, 16, w, h, 38); g.fill();
  const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#B8936A'); gr.addColorStop(0.45, '#94714C'); gr.addColorStop(1, '#5C4128');
  g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, w, h, 38); g.fill();
  g.strokeStyle = 'rgba(255,230,190,0.35)'; g.lineWidth = 2; g.beginPath(); g.roundRect(3, 3, w - 6, h - 6, 35); g.stroke();
  for (let i = 0; i < 220; i++) {                                         // rỗ đất
    const px = 14 + hash(i * 3.17 + 0.4) * (w - 28), py = 14 + hash(i * 5.91 + 0.8) * (h - 28);
    g.fillStyle = hash(i * 1.3) > 0.5 ? 'rgba(60,38,20,0.25)' : 'rgba(255,230,190,0.12)'; g.fillRect(px, py, 2, 2);
  }
  const rows = 6, rh = (h - 60) / rows;
  for (let r = 0; r < rows; r++) {
    const yy = 34 + r * rh;
    g.strokeStyle = 'rgba(55,34,16,0.45)'; g.lineWidth = 1; g.beginPath(); g.moveTo(24, yy + rh - 4); g.lineTo(w - 24, yy + rh - 4); g.stroke();
    let xx = 34;
    for (let j = 0; xx < w - 50; j++) {
      const hh = hash(r * 31.7 + j * 7.3), s = 9 + 7 * hash(r * 3.1 + j * 1.7);
      if (hh < 0.18) { xx += 16; continue; }
      const up = hh > 0.62;                                               // nêm đứng / nêm nằm
      g.fillStyle = 'rgba(48,30,14,0.85)'; g.beginPath();
      if (up) { g.moveTo(xx, yy + 4); g.lineTo(xx + s, yy + 4); g.lineTo(xx + s / 2, yy + 4 + s * 0.9); }
      else { g.moveTo(xx, yy + 6); g.lineTo(xx, yy + 6 + s); g.lineTo(xx + s * 0.9, yy + 6 + s / 2); }
      g.closePath(); g.fill();
      g.strokeStyle = 'rgba(48,30,14,0.7)'; g.lineWidth = 1.6; g.beginPath();
      if (up) { g.moveTo(xx + s / 2, yy + 4 + s * 0.8); g.lineTo(xx + s / 2, yy + rh - 10); } else { g.moveTo(xx + s * 0.8, yy + 6 + s / 2); g.lineTo(xx + s * 2.2, yy + 6 + s / 2); }
      g.stroke();
      xx += up ? s + 8 : s * 2.4 + 6;
    }
  }
  g.restore();
}

export default class Measured {
  static ERA = 'tenkyu';
  static IMAGES = { rhind: './assets/history/rhind-papyrus.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      daitai: w(0, 'だいたい'), riyuu0: w(0, '理由'), zutto: w(0, 'ずっと'), shirare: w(0, '知られて'),
      l1: S(1), hakatte: w(1, '測って'),
      l2: S(2), baby: w(2, 'バビロニア'), futsuu: w(2, 'ふつう'), n3: w(2, '3'), nendo: w(2, '粘土板'), n3125: w(2, '3.125'),
      l3: S(3), egypt: w(3, 'エジプト'), y1650: w(3, '1650'), rind: w(3, 'リンド'),
      l4: S(4), hatake: w(4, '丸い'), menseki: w(4, '面積'), motome: w(4, '求め方'), n316: w(4, '3.16'),
      l5: S(5), juubun: w(5, '十分'), hakatta: w(5, '測った'), riyuu5: w(5, '理由'),
      l6: S(6), naze: w(6, 'なぜ'), setsumei: w(6, '説明'), e6: E(6),
    };
    this.START = S(0);
    this.FROM = this.START - 2.6;                       // mở HỒI (đầu trang p2: không có cảnh trước)
    this.RING = [1450, 540, 220];
    must('3.125', 3.125); must('3.16', 3.16);           // giá trị đo (CONTENT.md hồi 1) — chỉ khắc, không tính ra
    must('1650', 1650);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.START - 2.3, 'hyoshigi'), c(this.START + 0.35, 'whoosh-long'),
      c(T.daitai, 'tick'), c(T.riyuu0, 'tick'), c(T.zutto + 0.1, 'tick'),
      c(T.hakatte, 'tick'),
      c(T.baby - 0.3, 'page'), c(T.n3, 'type'), c(T.nendo, 'tick'), c(T.n3125, 'type'),
      c(T.egypt - 0.3, 'page'), c(T.y1650, 'tick'),
      c(T.hatake, 'pen'), c(T.n316, 'type'),
      c(T.juubun, 'tick'), c(T.hakatta, 'tick'), c(T.riyuu5 + 0.1, 'tick'),
      c(T.naze, 'tick'), c(T.setsumei, 'question'),
    ];
  }
  render(g, t) {
    const T = this.T, [cx, cy, r] = this.RING;
    ground(g, 'tenkyu', t);

    // ── thẻ hồi (giữa khung, rút lên trước START) ──
    actCard(g, t, this.START, '第一幕', '円をはさみうちにする');
    heading(g, '第一幕　円をはさみうちにする', '測っていた時代', prog(t, this.START + 0.4, this.START + 1.8));

    // ── vành = đĩa đo: sáng lên sau thẻ hồi, quay một nấc khi "測っていた" ──
    const spin = 0.5 * smooth(prog(t, T.hakatte, T.hakatte + 1.4));
    const rot = t * 0.025 + spin;
    ring360(g, cx, cy, r, prog(t, this.START + 0.35, this.START + 2.2), { rot });
    // ruộng tròn (câu 4): luống cày mảnh trong đường tròn, sau giá trị
    const kf = prog(t, T.hatake, T.menseki + 0.4);
    if (kf > 0) {
      g.save(); g.beginPath(); g.arc(cx, cy, r - 4, 0, TAU); g.clip();
      g.strokeStyle = 'rgba(217,164,65,0.20)'; g.lineWidth = 1.2;
      const n = 22, sh = Math.round(n * kf);
      for (let i = 0; i < sh; i++) { const y = cy - r + (i + 0.5) * (2 * r / n); g.beginPath(); g.moveTo(cx - r, y); g.lineTo(cx + r, y); g.stroke(); }
      g.restore();
      circleLine(g, cx, cy, r, prog(t, T.menseki, T.menseki + 0.8), { w: 3 });
    }
    // giá trị giữa vành: cuộn lên như mặt số (cái cũ rời bằng chuyển động, bị vành che)
    const VAL = [
      [T.daitai, [['≈ ', `500 96px ${CG}`, C.dim], ['?', `500 120px ${CG}`, C.ivory]], ''],
      [T.n3, [['3', `600 150px ${CG}`, C.brassHi]], 'バビロニア・ふつう'],
      [T.n3125, [['3.125', `600 124px ${CG}`, C.brassHi]], 'ある粘土板'],
      [T.n316, [['≈ ', `500 96px ${CG}`, C.dim], ['3.16', `600 124px ${CG}`, C.brassHi]], 'エジプト'],
    ];
    g.save(); g.beginPath(); g.arc(cx, cy, r - 6, 0, TAU); g.clip();
    VAL.forEach(([a, parts, sub], i) => {
      if (t < a - 0.05) return;
      const nx = VAL[i + 1]?.[0], up = nx != null ? out(t, nx - 0.35, 0.45) : 0;
      if (up >= 1) return;
      g.save(); g.translate(0, -up * (r + 80));
      engrave(g, parts, cx, cy + 42, prog(t, a, a + 0.45), undefined, C.ivory, { align: 'center' });
      if (sub) engrave(g, sub, cx, cy + 108, prog(t, a + 0.2, a + 0.7), `500 28px ${JP}`, C.dim, { align: 'center', ls: 3, spark: false });
      g.restore();
    });
    g.restore();
    engrave(g, '紀元前1650年ごろ', cx, cy - 92, prog(t, T.n316 + 0.3, T.n316 + 1.0), `500 28px ${JP}`, C.brass, { align: 'center', ls: 3, spark: false });

    // ── thước thời gian (đáy): 値 ← ずっと前 … 理由 ──
    const RX0 = 140, RX1 = 1780, RY = 930;
    rule(g, RX0, RX1, RY, prog(t, T.riyuu0, T.zutto + 0.8), { a: 0.8 });
    const kWhy = prog(t, T.riyuu0 + 0.3, T.riyuu0 + 0.8);
    if (kWhy > 0) {
      bead(g, RX1 - 40, RY, 7, kWhy, { core: C.steelDim });
      engrave(g, '理由', RX1 - 40, RY + 52, kWhy, `700 32px ${MIN}`, C.ivory, { align: 'center', ls: 4, spark: false });
    }
    engrave(g, '値は、ずっと前から知られていた', RX0, RY - 22, prog(t, T.zutto, T.shirare + 0.8), `500 28px ${JP}`, C.dim, { ls: 3, spark: false });
    const PIN = [[T.baby, 360, 'バビロニア'], [T.egypt, 720, 'エジプト']];
    PIN.forEach(([a, x, s]) => {
      const k = prog(t, a, a + 0.4); if (k <= 0) return;
      bead(g, x, RY, 7, k);
      engrave(g, s, x, RY + 52, prog(t, a + 0.1, a + 0.6), `500 28px ${JP}`, C.brassHi, { align: 'center', ls: 3, spark: false });
    });
    // 「？」 thép ở đầu 理由: chưa ai giải thích được (câu 6)
    engrave(g, '？', RX1 - 40, RY - 28, prog(t, T.setsumei, T.setsumei + 0.4), `700 64px ${MIN}`, C.steel, { align: 'center', spark: false });

    // ── trái, câu 0–1: 値 / 測っていた ──
    const o1 = out(t, T.l2 - 0.6);
    if (o1 < 1) {
      g.save(); g.translate(-1100 * o1, 0);
      telop(g, [['だいたいの', `700 44px ${MIN}`], ['値', `700 44px ${MIN}`, C.brassHi]], 150, 430, prog(t, T.daitai, T.daitai + 0.7), { size: 44 });
      telop(g, [['人々は、', `700 52px ${MIN}`], ['測っていた', `700 52px ${MIN}`, C.brassHi]], 150, 600, prog(t, T.hakatte - 0.3, T.hakatte + 0.6), { size: 52 });
      g.restore();
    }

    // ── trái, câu 2–4: hiện vật (rời trái khi "測った値") ──
    const o2 = out(t, T.hakatta - 0.35, 0.7);
    if (t > T.baby - 0.5 && o2 < 1) {
      g.save(); g.translate(-1300 * o2, 0);
      tablet(g, 130, 300, 380, 290, prog(t, T.baby - 0.3, T.baby + 0.5));
      engrave(g, '古代バビロニア', 140, 668, prog(t, T.baby + 0.2, T.baby + 0.9), `700 32px ${MIN}`, C.ivory, { ls: 2 });
      engrave(g, '粘土板', 140, 712, prog(t, T.nendo, T.nendo + 0.4), `500 28px ${JP}`, C.dim, { ls: 3, spark: false });
      const kp = prog(t, T.egypt - 0.3, T.egypt + 0.4);
      plate(g, 'rhind', 600, 300, 280, kp);
      engrave(g, 'リンド・パピルス（大英博物館）', 600, 642, prog(t, T.rind, T.rind + 0.8), `700 30px ${MIN}`, C.ivory, { ls: 1 });
      engrave(g, '紀元前1650年ごろに書き写された', 600, 686, prog(t, T.y1650, T.y1650 + 0.9), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      telop(g, '丸い畑の面積から', 600, 820, prog(t, T.hatake, T.motome + 0.5), { size: 36 });
      telop(g, [['畑や倉には、', `700 36px ${MIN}`], ['十分', `700 36px ${MIN}`, C.brassHi]], 150, 820, prog(t, T.juubun - 0.2, T.juubun + 0.5), { size: 36 });
      g.restore();
    }

    // ── câu 5–6: 測った値 ≠ 理由 · なぜその数に？ ──
    const kN = prog(t, T.hakatta, T.riyuu5 + 0.5);
    if (kN > 0) {
      const NE = `700 64px ${MIN}`;
      engrave(g, [['測った値', NE, C.brassHi], ['  ≠  ', `500 70px ${JP}`, C.dim], ['理由', NE, C.ivory]], 150, 520, kN, NE, C.ivory, { ls: 4 });
      rule(g, 152, 760, 556, prog(t, T.riyuu5 + 0.3, T.riyuu5 + 0.9));
      telop(g, [['なぜ、その数になるのか', `700 40px ${MIN}`]], 150, 680, prog(t, T.naze, T.naze + 0.9), { size: 40 });
      engrave(g, '誰にも説明できなかった', 152, 790, prog(t, T.setsumei, T.setsumei + 0.9), `500 30px ${JP}`, C.dim, { ls: 4, spark: false });
    }

    // ── p2 mở từ đen: sao hiện dần (intro 漆と金 kết ở đen) ──
    dark(g, outCubic(prog(t, this.FROM - 0.8, this.FROM + 1.6)));
  }
}
