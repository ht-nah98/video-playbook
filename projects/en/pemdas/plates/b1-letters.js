// ACT ONE · "The letters" (p2, câu 0–2). Mở HỒI MỘT: trời sáng lại sau intro, thẻ ACT ONE, rồi đoạn đường mới.
//   câu 0  "PEMDAS" sơn to giữa đường; "a string of initials" ven đường
//   câu 1  mỗi chữ cái nở thành từ đúng lúc đọc + biển cấp bật lên bên đường (M, D cùng biển tròn xanh; A, S cùng thoi cam);
//          camera trôi theo từ đang đọc; hết câu các từ thu lại thành chữ cái
//   câu 2  sơn lại từng chữ: PEMDAS → BODMAS (Britain) → BEDMAS (Canada); biển cấp KHÔNG đổi = "the idea stays the same"
// Toạ độ THẾ GIỚI: đường chính y = 540; camera = cửa sổ 1920 px bắt đầu ở camX(t).
import { W, clamp, hash, prog, smooth, outBack, outCubic, ROAD, verge, road, centerLine, paint, sign, card,
  actTitle, typed, night, hand, lookup } from '../kit.js';

const Y = 540, BIG = 150, SMALL = 64, GAP = 54, SIGN_Y = 292;
const LET = ['P', 'E', 'M', 'D', 'A', 'S'];
const WORD = ['Parentheses', 'Exponents', 'Multiplication', 'Division', 'Addition', 'Subtraction'];
const KIND = ['P', 'E', 'MD', 'MD', 'AS', 'AS'];
const GLYPH = ['( )', 'x²', '×', '÷', '+', '−'];
const MAIN = g => { g.moveTo(-4000, Y); g.lineTo(9000, Y); };

export default class Letters {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      pemdas: w(0, 'pemdas'), string: w(0, 'string'), initials: w(0, 'initials'),
      words: [w(1, 'parentheses'), w(1, 'exponents'), w(1, 'multiplication'), w(1, 'division'), w(1, 'addition'), w(1, 'subtraction')],
      end1: L(1).end, britain: w(2, 'britain'), bodmas: w(2, 'bodmas'), canada: w(2, 'canada'), bedmas: w(2, 'bedmas'),
      letters: w(2, 'letters'), country: w(2, 'country', 2), idea: w(2, 'idea'), same: w(2, 'same'), end2: L(2).end,
    };
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                                     // mở hồi
    this.M = null;                                                    // số đo chữ (đo lần đầu render, font đã nạp)
  }
  sfx() {
    const T = this.T, c = [{ t: T.pemdas + 0.15, kind: 'type' }];
    T.words.forEach(t => c.push({ t, kind: 'pop' }));
    c.push({ t: T.end1 + 0.05, kind: 'whoosh' }, { t: T.bodmas, kind: 'type' }, { t: T.bodmas + 0.3, kind: 'snap' },
      { t: T.bedmas, kind: 'type' }, { t: T.letters, kind: 'tick' }, { t: T.idea, kind: 'pop' });
    return c;
  }
  measure(g) {
    if (this.M) return this.M;
    g.save();
    g.font = `800 ${BIG}px "Archivo"`;
    const lw = s => g.measureText(s).width;
    const slot = [Math.max(lw('P'), lw('B')), Math.max(lw('E'), lw('O')), Math.max(lw('M'), lw('D')), Math.max(lw('M'), lw('D')), lw('A'), lw('S')];
    g.font = `800 ${SMALL}px "Archivo"`;
    const ww = WORD.map(s => g.measureText(s).width);
    g.restore();
    const total = slot.reduce((a, b) => a + b, 0) + GAP * 5;
    return (this.M = { slot, ww, x0: 960 - total / 2 });
  }
  // độ nở của chữ cái i (0 = chữ cái to, 1 = cả từ nhỏ): nở lúc đọc từ, thu lại sau câu 1
  E(i, t) { const T = this.T; return outCubic(prog(t, T.words[i] - 0.05, T.words[i] + 0.4)) * (1 - smooth(prog(t, T.end1 + 0.05, T.end1 + 0.6))); }
  layout(t) {
    const M = this.M, out = []; let x = M.x0;
    for (let i = 0; i < 6; i++) { const e = this.E(i, t), w = M.slot[i] + (M.ww[i] - M.slot[i]) * e; out.push({ l: x, w, c: x + w / 2, e }); x += w + GAP; }
    return out;
  }
  camX(t, S) {
    const T = this.T, wt = T.words;
    let r = 2.5;                                                       // vị trí đọc (chỉ số chữ, liên tục)
    if (t > wt[0] - 0.3) { r = 0; for (let i = 0; i < 5; i++) r += smooth(prog(t, wt[i + 1] - 0.25, wt[i + 1] + 0.25)); }
    const back = smooth(prog(t, T.end1 + 0.05, T.end1 + 0.6)); r = r + (2.5 - r) * back;
    const i0 = Math.min(4, Math.floor(r)), f = r - i0, focus = S[i0].c + (S[i0 + 1].c - S[i0].c) * f;
    const lo = S[0].l - 140, hi = S[5].l + S[5].w + 140 - W;
    const base = hi < lo ? (lo + hi) / 2 : clamp(focus - W / 2, lo, hi);
    return base + 9 * (t - this.FROM) - 70;                             // trôi chậm dọc đường
  }
  render(g, t) {
    const T = this.T, M = this.measure(g), S = this.layout(t), cx = this.camX(t, S);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, MAIN); centerLine(g, MAIN);

    // ── chữ sơn: câu 0 sơn PEMDAS; câu 1 nở/thu; câu 2 sơn lại BODMAS → BEDMAS ──
    const kP = prog(t, T.pemdas + 0.15, T.pemdas + 0.75);
    const sweep = (at) => prog(t, at, at + 0.28);
    const k0 = sweep(T.bodmas), k1 = sweep(T.bodmas + 0.14), k1b = sweep(T.bedmas + 0.05);
    const kSw = smooth(prog(t, T.bodmas + 0.3, T.bodmas + 0.75));          // M ⇄ D đổi chỗ (cùng biển tròn xanh)
    for (let i = 0; i < 6; i++) {
      const s = S[i], kk = clamp(kP * 6 - i);                          // sơn vào từng chữ
      if (kk <= 0) continue;
      if (i === 0) repaint(g, () => slotText(g, s, 'P', WORD[0], kk), () => slotText(g, s, 'B', '', 1), s.l - 10, s.l + s.w + 10, k0);
      else if (i === 1) {
        if (k1b > 0) repaint(g, () => slotText(g, s, 'O', '', 1), () => slotText(g, s, 'E', '', 1), s.l - 10, s.l + s.w + 10, k1b);
        else repaint(g, () => slotText(g, s, 'E', WORD[1], kk), () => slotText(g, s, 'O', '', 1), s.l - 10, s.l + s.w + 10, k1);
      } else if (i === 2 || i === 3) {
        if (kSw <= 0) slotText(g, s, LET[i], WORD[i], kk);
        else {                                                         // chữ của ô này bay sang ô kia theo cung (M lên trên, D xuống dưới)
          const o = S[i === 2 ? 3 : 2], dx = (o.c - s.c) * kSw, dy = Math.sin(kSw * Math.PI) * (i === 2 ? -62 : 62);
          g.save(); g.translate(dx, dy); slotText(g, s, LET[i], '', 1); g.restore();
        }
      } else slotText(g, s, LET[i], WORD[i], kk);
    }

    // ── biển cấp bật lên bên đường lúc đọc từ (hình + màu theo cấp, DNA §2) ──
    for (let i = 0; i < 6; i++) {
      const k = prog(t, T.words[i] - 0.05, T.words[i] + 0.3);
      const r = KIND[i] === 'E' ? 57.5 : 53.4;                          // cỡ chữ biển = 46 / 56 px (cỡ đã nạp)
      sign(g, KIND[i], GLYPH[i], S[i].c, SIGN_Y, r, k);
    }
    // "the idea stays the same": khung vàng ôm cả dãy biển — chữ đổi, biển không đổi
    const kI = prog(t, T.idea - 0.1, T.same + 0.2);
    if (kI > 0) {
      const x0 = S[0].c - 86, x1 = S[5].c + 86, y0 = SIGN_Y - 78, y1 = SIGN_Y + 66;
      hand(g, rectPts(x0, y0, x1, y1), { w: 6, color: ROAD.gold, jit: 1.2, seed: 4, k: kI });
      typed(g, 'same levels', x1 + 30, SIGN_Y + 16, prog(t, T.same - 0.1, T.same + 0.5), 'italic 600 54px "Cormorant Garamond"', ROAD.gold);
    }

    // ── nhãn ven đường (cỏ dưới) ──
    typed(g, 'just a string of initials', 960, 832, prog(t, T.string - 0.1, T.initials + 0.5), 'italic 600 54px "Cormorant Garamond"', ROAD.edge, { align: 'center' });
    placard(g, 'BRITAIN', 'BODMAS', S[0].l - 150, 820, prog(t, T.britain, T.britain + 0.35), prog(t, T.bodmas, T.bodmas + 0.4));
    placard(g, 'CANADA', 'BEDMAS', S[5].l + S[5].w + 150, 820, prog(t, T.canada, T.canada + 0.35), prog(t, T.bedmas, T.bedmas + 0.4));
    // "the letters change a little": gạch vàng dưới các ô khác PEMDAS (B, rồi D ⇄ M)
    [0, 2, 3].forEach((i, j) => {
      const k = prog(t, T.letters + j * 0.16, T.letters + j * 0.16 + 0.3); if (k <= 0) return;
      hand(g, [[S[i].c - 46, 640], [S[i].c + 46, 640]], { w: 8, color: ROAD.gold, jit: 1, seed: 20 + i, k });
    });
    g.restore();

    // thẻ HỒI + biển tên mục (toạ độ màn hình)
    actTitle(g, 'road', t, this.START, 'ACT ONE', 'What PEMDAS really says');
    card(g, 'road', prog(t, this.START + 0.05, this.START + 1.1), 'ACT ONE · THE RULE', 'The letters');
    // trời sáng lại sau intro (mối nối đen–đen, DNA §6)
    night(g, 1 - smooth(prog(t, this.FROM - 0.42, this.FROM + 0.35)), W / 2, Y, 620);
  }
}

// chữ trong một ô: chữ cái (to → nhỏ theo e) + phần còn lại của từ hiện dần; k = sơn vào (0…1)
function slotText(g, s, letter, rest, k) {
  if (k <= 0) return;
  const e = rest ? s.e : 0, size = BIG + (SMALL - BIG) * e;
  g.save(); g.font = `800 ${BIG}px "Archivo"`; const lw = g.measureText(letter).width;
  const lx = (s.c - lw / 2) + (s.l - (s.c - lw / 2)) * e, base = Y + 0.36 * size;
  // phủ vạch giữa dưới chữ (như paint): một vệt nhựa ngang
  const ww = lw * size / BIG + (rest && e > 0 ? (() => { g.font = `800 ${SMALL}px "Archivo"`; const v = g.measureText(rest.slice(1, 1 + Math.round((rest.length - 1) * clamp(e * 1.4 - 0.35)))).width; g.font = `800 ${BIG}px "Archivo"`; return v; })() : 0);
  g.fillStyle = asphalt(g); g.fillRect(lx - 14, Y - 9, (ww) * Math.min(1, k * 1.02) + 28, 18);   // vạch giữa nhường chỗ chữ (như paint)
  g.fillStyle = ROAD.paint;
 
  g.save(); g.translate(lx, base); g.scale(size / BIG, size / BIG); g.textBaseline = 'alphabetic';
  if (k < 1) { g.save(); g.beginPath(); g.rect(0, -400, lw * k * 1.02, 800); g.clip(); g.fillText(letter, 0, 0); g.restore(); }
  else g.fillText(letter, 0, 0);
  g.restore();
  const n = Math.round((rest.length - 1) * clamp(e * 1.4 - 0.35));
  if (n > 0) { g.font = `800 ${SMALL}px "Archivo"`; g.textBaseline = 'alphabetic'; g.fillText(rest.slice(1, 1 + n), lx + lw * size / BIG, base); }
  g.restore();
}
// vân nhựa giống hệt kit (cùng hạt, cùng hash) — để vạch giữa nhường chỗ chữ mà không lộ miếng vá
let ASP = null;
function asphalt(g) {
  if (ASP) return ASP;
  const n = 512, c = document.createElement('canvas'); c.width = c.height = n; const x = c.getContext('2d'), d = x.createImageData(n, n);
  const b = [1, 3, 5].map(i => parseInt(ROAD.asphalt.slice(i, i + 2), 16));
  for (let i = 0; i < n * n; i++) { const v = (hash(i * 0.613 + 2) - 0.5) * 22; for (let k = 0; k < 3; k++) d.data[i * 4 + k] = b[k] + v; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return (ASP = g.createPattern(c, 'repeat'));
}
// sơn lại: con lăn quét trái → phải; bên phải con lăn còn chữ cũ, bên trái là chữ mới
function repaint(g, drawOld, drawNew, x0, x1, k) {
  if (k <= 0) { drawOld(); return; }
  if (k >= 1) { drawNew(); return; }
  const sx = x0 + (x1 - x0) * outCubic(k);
  g.save(); g.beginPath(); g.rect(sx, -5000, 20000, 10000); g.clip(); drawOld(); g.restore();
  g.save(); g.beginPath(); g.rect(-20000, -5000, sx + 20000, 10000); g.clip(); drawNew(); g.restore();
  g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(sx - 8, Y - 96, 16, 192, 7); g.fill(); g.restore();
}
// bảng tên nước ven đường: trắng, chữ than; bật lên (k), dòng dưới sơn vào (k2)
function placard(g, top, word, x, y, k, k2) {
  if (k <= 0) return;
  const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(p, p);
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#F4F1EA';
  g.beginPath(); g.roundRect(-130, -62, 260, 124, 12); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.ink; g.lineWidth = 3; g.beginPath(); g.roundRect(-122, -54, 244, 108, 8); g.stroke();
  g.fillStyle = ROAD.ink; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '500 22px "IBM Plex Mono"'; g.fillText(top, 0, -26);
  g.restore();
  typed(g, word, x, y + 34 + 4, k2, '800 46px "Archivo"', ROAD.ink, { align: 'center' });
}
function rectPts(x0, y0, x1, y1) {
  const P = [], n = 16;
  for (const [a, b, c, d] of [[x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]])
    for (let i = 0; i < n; i++) P.push([a + (c - a) * i / n, b + (d - b) * i / n]);
  P.push([x0, y0]); return P;
}
