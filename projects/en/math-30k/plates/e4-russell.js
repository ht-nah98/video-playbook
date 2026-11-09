// Hồi 5 · "1901 — Russell's paradox" (SCRIPT.md) — bảng đen, phấn. Câu 175–185 của p2.
//   175 vòng tròn "tập hợp" thủng một lỗ · 176 Russell (ảnh ghim) + "?" ở lỗ · 177 R = { x : x ∉ x }, các tập không chứa mình
//   178 R ∈ R ? (người dẫn đường trầm tư) · 179–180 vòng lặp CÓ → phải không / KHÔNG → phải có, R chui ra chui vào lỗ
//   181 dấu CONTRADICTION · 182 một trang, vòng tròn nứt: INCONSISTENT · 183 vòng mới hai lớp (tiên đề chặt): R bị chặn
//   184 Hilbert + kế hoạch ☐ COMPLETE ☐ CONSISTENT · 185 "WIR MÜSSEN WISSEN — WIR WERDEN WISSEN", 1930
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, stamp, lookup } from '../kit.js';

const E = ERA.chalk;
const C = { x: 1240, y: 600, r: 210 };             // vòng tròn tập hợp R
const YES = [290, 640], NO = [690, 640];          // hai nút của vòng lặp

function chalk(g, pts, { w = 4, color = E.ink, seed = 1, k = 1, jit = 2.2 } = {}) {
  hand(g, pts, { w, color, jit, seed, k });
  g.save(); g.globalAlpha = 0.3; hand(g, pts, { w: w * 0.6, color, jit: jit * 1.6, seed: seed + 50, k }); g.restore();
}
function ctext(g, s, x, y, k, font, color, opt = {}) {
  typed(g, s, x, y, k, font, color, opt);
  g.save(); g.globalAlpha = 0.28; typed(g, s, x + 1.5, y - 1.2, k, font, color, opt); g.restore();
}
const circ = (cx, cy, r, gap = 0, n = 80) => Array.from({ length: n + 1 }, (_, i) => { const a = gap / 2 + (Math.PI * 2 - gap) * i / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
const quad = ([x0, y0], [cx, cy], [x1, y1], n = 30) => Array.from({ length: n + 1 }, (_, i) => { const s = i / n, a = (1 - s) * (1 - s), b = 2 * s * (1 - s), c = s * s; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; });
function arrow(g, pts, k, color, seed) {
  if (k <= 0) return;
  chalk(g, pts, { w: 4, color, seed, k, jit: 1.4 });
  if (k < 1) return;
  const [x1, y1] = pts.at(-1), [x0, y0] = pts.at(-3), a = Math.atan2(y1 - y0, x1 - x0);
  chalk(g, [[x1 - 22 * Math.cos(a - 0.45), y1 - 22 * Math.sin(a - 0.45)], [x1, y1], [x1 - 22 * Math.cos(a + 0.45), y1 - 22 * Math.sin(a + 0.45)]], { w: 4, color, seed: seed + 3, jit: 1 });
}
// ∈ / ∉ không có trong ba phông đã nạp → vẽ tay bằng phấn
function elem(g, x, y, px, not, color) {
  const r = px * 0.19, cx = x + px * 0.34, cy = y - px * 0.25;
  g.save(); g.strokeStyle = color; g.lineWidth = Math.max(2.5, px * 0.06); g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx + r * 0.95, cy - r); g.lineTo(cx, cy - r); g.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, true); g.lineTo(cx + r * 0.95, cy + r);
  g.moveTo(cx - r, cy); g.lineTo(cx + r * 0.85, cy);
  if (not) { g.moveTo(cx + r * 0.7, cy - r * 1.7); g.lineTo(cx - r * 0.5, cy + r * 1.7); }
  g.stroke(); g.restore();
}
/** công thức Cormorant nghiêng, viết vào theo ký tự; ∈ ∉ vẽ tay */
function fml(g, s, x, y, k, px, color, { align = 'left' } = {}) {
  const n = Math.round(s.length * clamp(k)); if (!n) return;
  g.save(); g.font = `italic 600 ${px}px "Cormorant Garamond"`; g.fillStyle = color;
  const sym = c => c === '∈' || c === '∉', wOf = c => sym(c) ? px * 0.68 : g.measureText(c).width;
  let total = 0; for (const c of s) total += wOf(c);
  let cx = align === 'center' ? x - total / 2 : x;
  [...s].slice(0, n).forEach(c => { if (sym(c)) elem(g, cx, y, px, c === '∉', color); else g.fillText(c, cx, y); cx += wOf(c); });
  g.restore();
}
function token(g, s, x, y, k, color) {
  if (k <= 0) return;
  const sc = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(sc, sc);
  chalk(g, circ(0, 0, 30, 0, 30), { w: 3, color, seed: 9, jit: 1 });
  g.font = 'italic 600 44px "Cormorant Garamond"'; g.fillStyle = color; g.textAlign = 'center'; g.fillText(s, 0, 13);
  g.restore();
}
function cross(g, x, y, r, k, seed) {
  chalk(g, seg(x - r, y - r, x + r, y + r, 4), { w: 6, color: E.accent, seed, k: clamp(k * 2), jit: 1 });
  chalk(g, seg(x + r, y - r, x - r, y + r, 4), { w: 6, color: E.accent, seed: seed + 1, k: clamp(k * 2 - 1), jit: 1 });
}

export default class Russell {
  static ERA = 'chalk';
  static IMAGES = { russell: './assets/history/russell.jpeg', hilbert: './assets/history/Hilbert.jpg' };
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e4');
    this.T = {
      s175: L(175).start, idea: w(175, 'idea'), hole: w(175, 'hole'),
      s176: L(176).start, nineteen: w(176, 'nineteen'), british: w(176, 'british'), russell: w(176, 'russell'), question: w(176, 'question'),
      take: w(177, 'take'), set: w(177, 'set'), all: w(177, 'all'), sets: w(177, 'sets'), not177: w(177, 'not'), themselves: w(177, 'themselves'),
      s178: L(178).start, contain: w(178, 'contain'), itself: w(178, 'itself'),
      s179: L(179).start, does: w(179, 'does'), must179: w(179, 'must'), not179: w(179, 'not'),
      doesnt: w(180, "doesn't"), must180: w(180, 'must'), e180: L(180).end,
      contradiction: w(181, 'contradiction'),
      s182: L(182).start, one182: w(182, 'question'), page: w(182, 'page'), naive: w(182, 'naive'), inconsistent: w(182, 'inconsistent'),
      s183: L(183).start, rebuild: w(183, 'rebuild'), stricter: w(183, 'stricter'), allowed: w(183, 'allowed'), exist: w(183, 'exist'),
      s184: L(184).start, greatest: w(184, 'greatest'), hilbert: w(184, 'hilbert'), plan: w(184, 'plan'), prove: w(184, 'prove'),
      complete: w(184, 'complete'), consistent: w(184, 'consistent'),
      n1930: w(185, 'nineteen'), audience: w(185, 'audience'), must185: w(185, 'must'), will: w(185, 'will'), know2: w(185, 'know', 2), e185: L(185).end,
    };
    this.START = this.T.s175;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'chalk');
    card(g, 'chalk', prog(t, this.FROM + 0.1, this.START + 1.0), 'ACT FIVE · QUESTIONING THE FOUNDATIONS', '1901', "Russell's paradox");
    ruler(g, 'chalk', 1901, prog(t, this.START - 0.3, this.START + 0.7));

    // ── 175–182: bảng nghịch lý (cả bảng trượt xuống khỏi khung ở câu 183) ──
    const down = outCubic(prog(t, T.s183 - 0.1, T.s183 + 0.6));
    if (down < 1) {
      g.save(); g.translate(0, down * 1100);
      // vòng tròn "tập hợp" của Cantor — một lỗ mở ra ở "hole"
      const gap = 0.5 * outCubic(prog(t, T.hole, T.hole + 0.4));
      chalk(g, circ(C.x, C.y, C.r, gap), { w: 5, seed: 11, k: prog(t, T.idea - 0.4, T.idea + 0.5) });
      typed(g, 'A SET', C.x, C.y + C.r + 50, prog(t, T.idea, T.idea + 0.4) * (1 - prog(t, T.set - 0.2, T.set)), '500 22px "IBM Plex Mono"', E.dim, { align: 'center' });
      for (let i = 0; i < 6; i++) {           // bụi phấn rơi khỏi lỗ
        const a = T.hole + 0.05 * i, dt = t - a; if (dt <= 0 || dt > 1.6) continue;
        g.fillStyle = E.ink; g.beginPath(); g.arc(C.x + C.r + 6 + hash(i) * 26 + dt * 30, C.y - 20 + hash(i + 7) * 40 + 520 * dt * dt, 3 + hash(i + 3) * 3, 0, 7); g.fill();
      }
      // "one simple question": dấu hỏi phấn vàng ở đúng lỗ
      ctext(g, '?', C.x + C.r + 40, C.y + 24, prog(t, T.question, T.question + 0.2) * (1 - prog(t, T.take - 0.3, T.take)), '800 64px "Archivo"', E.accent);
      // 177: R = { x : x ∉ x } và vài tập không chứa chính nó
      const kR = prog(t, T.set, T.themselves + 0.4);
      fml(g, 'R = { x : x ∉ x }', 950, 230, kR, 64, E.ink);
      typed(g, 'R', C.x - C.r - 10, C.y - C.r + 20, prog(t, T.set, T.set + 0.3), '800 64px "Archivo"', E.accent, { align: 'right' });
      [['{1, 2}', -80, -90], ['{ }', 70, -40], ['{a, b, c}', -60, 80]].forEach(([s, dx, dy], i) => {
        const a = T.sets + i * 0.25; typed(g, s, C.x + dx, C.y + dy, prog(t, a, a + 0.3), 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' }); });
      // 178: R ∈ R ?
      fml(g, 'R ∈ R ?', C.x, 910, prog(t, T.s178, T.itself + 0.2), 64, E.accent, { align: 'center' });
      // R như một phần tử: chui vào (CÓ) / bị đẩy ra (phải không) / bị kéo vào (phải có) — qua đúng cái lỗ
      const xin = C.x + C.r - 80, xout = C.x + C.r + 90, t0 = T.e180 + 0.2;
      let tx = xout;
      if (t < T.does) tx = xout;
      else if (t < T.not179) tx = xout + (xin - xout) * outCubic(prog(t, T.does, T.does + 0.4));
      else if (t < T.must180) tx = xin + (xout - xin) * outCubic(prog(t, T.not179, T.not179 + 0.4));
      else if (t < t0) tx = xout + (xin - xout) * outCubic(prog(t, T.must180, T.must180 + 0.4));
      else tx = (xin + xout) / 2 + (xin - xout) / 2 * Math.cos((t - t0) * Math.PI * 2 / 2.4);
      token(g, 'R', tx, C.y, prog(t, T.contain, T.contain + 0.3), E.accent);
      // 179–180: vòng lặp hai mũi tên đuổi nhau
      const kY = prog(t, T.does - 0.1, T.does + 0.3), kN = prog(t, T.must179 - 0.1, T.must179 + 0.3);
      const node = ([x, y], word, f, k, seed) => { if (k <= 0) return;
        g.save(); g.translate(x, y); g.scale(outBack(k), outBack(k)); chalk(g, circ(0, 0, 74, 0, 40), { w: 4, seed });
        ctext(g, word, 0, -4, 1, '800 46px "Archivo"', E.ink, { align: 'center' }); fml(g, f, 0, 42, 1, 40, E.ink, { align: 'center' }); g.restore(); };
      node(YES, 'YES', 'R ∈ R', kY, 31); node(NO, 'NO', 'R ∉ R', kN, 37);
      const top = quad([345, 585], [490, 455], [635, 585]), bot = quad([635, 695], [490, 825], [345, 695]);
      arrow(g, top, prog(t, T.must179, T.not179 + 0.3), E.accent, 41);
      ctext(g, 'must not', 490, 492, prog(t, T.must179, T.not179 + 0.3), 'italic 600 44px "Cormorant Garamond"', E.accent, { align: 'center' });
      arrow(g, bot, prog(t, T.must180, T.must180 + 0.45), E.accent, 47);
      ctext(g, 'must', 490, 818, prog(t, T.must180, T.must180 + 0.3), 'italic 600 44px "Cormorant Garamond"', E.accent, { align: 'center' });
      // nút đang "đúng" được khoanh: theo vị trí của R
      const on = tx < (xin + xout) / 2 ? YES : NO;
      if (t >= T.does + 0.3) chalk(g, circ(on[0], on[1], 88, 0, 40), { w: 3, color: E.accent, seed: on === YES ? 51 : 53, jit: 1.6 });
      if (t >= t0) for (let j = 0; j < 2; j++) {    // hai chấm đuổi nhau quanh vòng
        const s = ((t - t0) / 2.4 + j * 0.5 + 0.75) % 1, p = s < 0.5 ? top : bot, q = (s % 0.5) * 2 * (p.length - 1), i = Math.floor(q), f = q - i;
        const [x0, y0] = p[i], [x1, y1] = p[Math.min(i + 1, p.length - 1)];
        g.fillStyle = E.accent; g.beginPath(); g.arc(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 10, 0, 7); g.fill();
      }
      stamp(g, 'CONTRADICTION', 490, 920, prog(t, T.contradiction, T.contradiction + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.06 });
      // 182: "one question" khoanh câu hỏi · "one page" khung trang · "naive" · "inconsistent": vòng tròn nứt
      chalk(g, circ(C.x, 893, 150, 0, 50).map(([x, y]) => [x, 893 + (y - 893) * 0.42]), { w: 3, color: E.accent, seed: 61, k: prog(t, T.one182, T.one182 + 0.4) });
      chalk(g, [[905, 150], [1800, 150], [1800, 985], [905, 985], [905, 150]], { w: 3, color: E.dim, seed: 63, k: prog(t, T.page - 0.1, T.page + 0.6) });
      typed(g, 'NAIVE SET THEORY', 1785, 180, prog(t, T.naive, T.naive + 0.5), '500 22px "IBM Plex Mono"', E.dim, { align: 'right' });
      chalk(g, [[1120, 400], [1180, 480], [1150, 540], [1240, 610], [1210, 690], [1300, 800]], { w: 6, color: E.accent, seed: 67, k: prog(t, T.inconsistent - 0.2, T.inconsistent + 0.2) });
      stamp(g, 'INCONSISTENT', C.x, C.y - 10, prog(t, T.inconsistent, T.inconsistent + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.1 });
      g.restore();
    }
    // Russell (ảnh ghim): vào ở "British", trượt trái ra ở "all"
    const rOut = outCubic(prog(t, T.all - 0.2, T.all + 0.4));
    if (t >= T.british - 0.2 && rOut < 1) {
      g.save(); g.translate(-rOut * 900, 0);
      portrait(g, 'russell', 'chalk', 140, 410, 300, prog(t, T.british - 0.2, T.russell + 0.3), { style: 'pin', rot: -0.02, label: { name: 'Bertrand Russell', life: '1872–1970', note: 'PHOTOGRAPH, LATER LIFE' } });
      g.restore();
    }
    // người dẫn đường trầm tư CHỈ ở "Does that set contain itself?" — trồi lên, rồi tụt xuống khỏi khung
    const mOut = outCubic(prog(t, T.s179 - 0.05, T.s179 + 0.45));
    if (t >= T.s178 - 0.3 && mOut < 1) {
      g.save(); g.translate(0, mOut * 900);
      figure(g, 'ponder', 430, 1080, 690, 'chalk', prog(t, T.s178 - 0.3, T.s178 + 0.1));
      g.restore();
    }

    // ── 183: dựng lại trên tiên đề chặt hơn — vòng hai lớp, chỉ tập "được phép" mới vào; R bị chặn ──
    const out183 = outCubic(prog(t, T.s184 - 0.1, T.s184 + 0.5));
    if (t >= T.s183 + 0.3 && out183 < 1) {
      g.save(); g.translate(0, out183 * 1000);
      const cx = 1180, cy = 650, kr = prog(t, T.s183 + 0.3, Math.max(T.s183 + 1.2, T.rebuild + 0.4));
      chalk(g, circ(cx, cy, 190), { w: 5, seed: 71, k: kr });
      chalk(g, circ(cx, cy, 206), { w: 5, color: E.accent, seed: 73, k: prog(t, T.stricter - 0.1, T.stricter + 0.6) });
      ctext(g, 'STRICTER AXIOMS', cx, 410, prog(t, T.stricter, T.stricter + 0.5), '500 26px "IBM Plex Mono"', E.accent, { align: 'center' });
      typed(g, 'WHICH SETS MAY EXIST?', cx, 920, prog(t, T.allowed - 0.4, T.exist + 0.2), '500 22px "IBM Plex Mono"', E.dim, { align: 'center' });
      [['{1, 2}', 1120, 600], ['{ }', 1250, 700]].forEach(([s, x1, y1], i) => {
        const a = T.allowed - 0.6 + i * 0.4, k = outCubic(prog(t, a, a + 0.8)); if (k <= 0) return;
        typed(g, s, 260 + (x1 - 260) * k, 650 + (y1 - 650) * k, 1, 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' }); });
      // R: lao tới vòng ngoài, bật ngược, bị gạch chéo
      const a = T.allowed + 0.3, p = prog(t, a, a + 1.0);
      if (p > 0) { const hit = 1180 - 206 - 40, x = p < 0.55 ? 260 + (hit - 260) * outCubic(p / 0.55) : hit - 160 * outCubic((p - 0.55) / 0.45);
        token(g, 'R', x, 650, 1, E.accent); cross(g, hit + 34, 650, 26, prog(t, a + 0.55, a + 0.95), 81); }
      g.restore();
    }

    // ── 184–185: Hilbert và kế hoạch lớn; câu nói năm 1930 ──
    if (t >= T.greatest - 0.3) {
      portrait(g, 'hilbert', 'chalk', 140, 400, 400, prog(t, T.greatest - 0.2, T.hilbert + 0.3), { style: 'pin', rot: 0.015, label: { name: 'David Hilbert', life: '1862–1943' } });
      ctext(g, 'THE PLAN: PROVE, ONCE AND FOR ALL,', 900, 470, prog(t, T.plan, T.prove + 0.9), '500 24px "IBM Plex Mono"', E.dim);
      ctext(g, 'THAT MATHEMATICS IS', 900, 506, prog(t, T.prove + 0.6, T.complete - 0.1), '500 24px "IBM Plex Mono"', E.dim);
      [[T.complete, 'COMPLETE', 590], [T.consistent, 'CONSISTENT', 680]].forEach(([a, s, y], i) => {
        const k = prog(t, a - 0.1, a + 0.4);
        chalk(g, [[900, y - 46], [946, y - 46], [946, y], [900, y], [900, y - 46]], { w: 4, seed: 91 + i, k });
        ctext(g, s, 970, y, k, '800 64px "Archivo"', E.ink); });
      ctext(g, '1930', 900, 790, prog(t, T.n1930, T.n1930 + 0.4), '500 26px "IBM Plex Mono"', E.accent);
      ctext(g, 'WIR MÜSSEN WISSEN —', 900, 850, prog(t, T.must185 - 0.1, T.must185 + 0.6), '800 46px "Archivo"', E.ink);
      ctext(g, 'WIR WERDEN WISSEN.', 900, 906, prog(t, T.will - 0.1, T.know2 + 0.3), '800 46px "Archivo"', E.ink);
      ctext(g, '“We must know, we will know.”', 900, 968, prog(t, T.know2 - 0.2, T.know2 + 0.9), 'italic 600 44px "Cormorant Garamond"', E.accent);
    }
  }
}
