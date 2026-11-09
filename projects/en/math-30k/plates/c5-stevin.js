// Hồi 3 · "1585 — Stevin and decimals" (SCRIPT.md) — giấy in (thời in ấn). Câu 80–88 của p2.
//   1 (80–82) Stevin (khắc đồng) + trang bìa De Thiende · 1/3, 2/7, 5/12 mỗi phân số một kiểu viết · cộng/trừ phải quy đồng
//   2 (83–84) cùng một dạng: 0.333333…, 0.285714…, 0.416666… (chia dài trong code) · cột 1/10 · 1/100 · 1/1000
//             · thế giới Hồi giáo → châu Âu
//   3 (85–88) một trục 0–1, ba điểm đúng chỗ · 2/7 < 1/3 < 5/12 · cộng cột thập phân, + − × ÷ cùng một cách
//             · "1/3 → 0.333…" thay đổi nhỏ, hệ quả lớn · khoa học · kỹ thuật · kinh doanh
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, portrait, stamp, lookup } from '../kit.js';

const E = ERA.paper;

// ── toán: tính bằng số ──
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const lcm = (a, b) => a / gcd(a, b) * b;
const FR = [[1, 3, 'stack'], [2, 7, 'slash'], [5, 12, 'roman']];
const digits = (n, d, k) => { let s = '', r = n % d; for (let i = 0; i < k; i++) { r *= 10; s += Math.floor(r / d); r %= d; } return s; };
function math() {
  const dec = FR.map(([n, d]) => '0.' + digits(n, d, 6));
  if (dec.join() !== '0.333333,0.285714,0.416666') throw new Error('c5: chia dài sai ' + dec);
  // cộng: 1/3 + 2/7 (quy đồng 21) · trừ: 5/12 − 1/3 (quy đồng 12)
  const m1 = lcm(3, 7), a1 = 1 * m1 / 3, b1 = 2 * m1 / 7, s1 = a1 + b1, g1 = gcd(s1, m1);
  const m2 = lcm(12, 3), a2 = 5 * m2 / 12, b2 = 1 * m2 / 3, s2 = a2 - b2, g2 = gcd(s2, m2);
  const add = `1/3 + 2/7 = ${a1}/${m1} + ${b1}/${m1} = ${s1 / g1}/${m1 / g1}`;
  const sub = `5/12 − 1/3 = ${a2}/${m2} − ${b2}/${m2} = ${s2 / g2}/${m2 / g2}`;
  if (add !== '1/3 + 2/7 = 7/21 + 6/21 = 13/21' || sub !== '5/12 − 1/3 = 5/12 − 4/12 = 1/12') throw new Error('c5: quy đồng sai');
  // thứ tự trên trục
  const v = FR.map(([n, d]) => n / d);
  if (!(v[1] < v[0] && v[0] < v[2])) throw new Error('c5: thứ tự 2/7 < 1/3 < 5/12 sai');
  // cộng cột (làm tròn 4 chữ số) khớp tổng thật 87/84 làm tròn
  const r4 = v.map(x => Math.round(x * 1e4)), sum = r4.reduce((a, b) => a + b, 0);
  const trueSum = Math.round(v.reduce((a, b) => a + b, 0) * 1e4);
  if (sum !== trueSum || Math.abs(v[0] + v[1] + v[2] - 87 / 84) > 1e-12) throw new Error('c5: cộng cột sai');
  const f4 = x => (x / 1e4).toFixed(4);
  return { dec, add, sub, v, col: r4.map(f4), sum: f4(sum) };
}
const M = math();

// phân số theo "kiểu riêng": chồng · gạch chéo · chữ La Mã
function frac(g, kind, n, d, x, y, k, color) {
  if (k <= 0) return;
  const s = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color; g.strokeStyle = color; g.textAlign = 'center';
  if (kind === 'stack') {
    g.font = 'italic 600 64px "Cormorant Garamond"'; g.fillText(String(n), 0, -14);
    g.lineWidth = 4; g.beginPath(); g.moveTo(-26, 0); g.lineTo(26, 0); g.stroke(); g.fillText(String(d), 0, 48);
  } else if (kind === 'slash') {
    g.font = '800 64px "Archivo"'; g.fontStretch = 'condensed'; g.fillText(`${n}/${d}`, 0, 22);
  } else {
    g.font = 'italic 600 54px "Cormorant Garamond"'; g.fillText('v', -36, -6); g.lineWidth = 3;
    g.beginPath(); g.moveTo(-14, 20); g.lineTo(6, -34); g.stroke(); g.fillText('xii', 40, 26);
  }
  g.restore();
}
// trục 0–1 (phần 3)
const LX0 = 260, LX1 = 1660, LY = 520, lx = v => LX0 + (LX1 - LX0) * v;
const slide = (g, dx, dy, fn) => { if (Math.abs(dx) >= 2000 || Math.abs(dy) >= 1300) return; g.save(); g.translate(dx, dy); fn(); g.restore(); };

export default class Stevin {
  static ERA = 'paper';
  static IMAGES = {
    stevin: './assets/history/Simon-stevin.jpeg',
    dethiende: './assets/history/De_Thiende_(title_page).jpg',
  };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 's5');
    this.T = {
      s80: L(80).start, simon: w(80, 'simon'), thiende: w(80, 'thiende'), tenth: w(80, 'tenth'),
      fractions: w(81, 'fractions'), clumsy: w(81, 'clumsy'), third: w(81, 'third'), sevenths: w(81, 'sevenths'),
      twelfths: w(81, 'twelfths'), way: w(81, 'way'),
      adding: w(82, 'adding'), subtracting: w(82, 'subtracting'), nightmare: w(82, 'nightmare'),
      s83: L(83).start, showed: w(83, 'showed'), format: w(83, 'format'), tenths: w(83, 'tenths'),
      hundredths: w(83, 'hundredths'), thousandths: w(83, 'thousandths'),
      decimal: w(84, 'decimal'), islamic: w(84, 'islamic'), europe: w(84, 'europe'),
      s85: L(85).start, every: w(85, 'every'), number: w(85, 'number'), same: w(85, 'same'), line: w(85, 'line'),
      glance: w(86, 'glance'), added: w(86, 'added'), subtracted: w(86, 'subtracted'), multiplied: w(86, 'multiplied'),
      divided: w(86, 'divided'), method: w(86, 'method'),
      small: w(87, 'small'), form: w(87, 'form'), enormous: w(87, 'enormous'),
      scientific: w(88, 'scientific'), engineering: w(88, 'engineering'), business: w(88, 'business'), decimals: w(88, 'decimals'),
    };
    this.START = this.T.s80;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');
    card(g, 'paper', prog(t, this.FROM, T.s80 + 1.0), 'ACT THREE · THE NUMBERS GROW', '1585', 'Stevin, De Thiende');
    ruler(g, 'paper', 1585, prog(t, this.FROM + 0.4, T.s80 + 0.4));

    // ── chân dung + De Thiende (phần 1–2), trượt ra phải khi vào trục số ──
    const pOut = outCubic(prog(t, T.s85 - 0.2, T.s85 + 0.4)) * 1000;
    slide(g, pOut, 0, () => {
      if (t >= T.simon - 0.2) portrait(g, 'stevin', 'paper', 1060, 100, 480, prog(t, T.simon - 0.2, T.simon + 0.35),
        { style: 'engrave', label: { name: 'Simon Stevin', life: '1548–1620' } });
      if (t >= T.thiende - 0.2) {
        portrait(g, 'dethiende', 'paper', 1490, 140, 440, prog(t, T.thiende - 0.2, T.thiende + 0.3), { style: 'engrave', rot: 0.015 });
        typed(g, 'DE THIENDE · 1585', 1490, 640, prog(t, T.thiende + 0.1, T.thiende + 0.6), '500 20px "IBM Plex Mono"', E.ink);
        typed(g, 'THE TENTH', 1490, 670, prog(t, T.tenth - 0.05, T.tenth + 0.4), '500 20px "IBM Plex Mono"', E.accent);
      }
    });

    // ── phần 1–2: phân số → thập phân (cả khối trượt lên khi vào trục số) ──
    const tOut = outCubic(prog(t, T.s85 - 0.2, T.s85 + 0.45)) * -1000;
    slide(g, 0, tOut, () => {
      const before = 'BEFORE STEVIN: FRACTIONS', after = 'STEVIN: ONE FORMAT';
      const kAfter = prog(t, T.showed - 0.1, T.showed + 0.4);
      // đầu mục: chữ cũ bị gạch, chữ mới viết bên dưới — không biến mất
      typed(g, before, 110, 410, prog(t, T.fractions - 0.2, T.fractions + 0.4), '500 24px "IBM Plex Mono"', E.dim);
      hand(g, seg(104, 402, 470, 402, 8), { w: 3, color: E.dim, jit: 0.6, seed: 2, k: kAfter });
      typed(g, after, 110, 446, kAfter * 1.4, '500 24px "IBM Plex Mono"', E.accent);
      // ba phân số: hàng ngang → cột của bảng
      const kMove = outCubic(prog(t, T.showed, T.format));
      const words = [T.third, T.sevenths, T.twelfths];
      FR.forEach(([n, d, kind], i) => {
        const x = 200 + i * 250 + (190 - 200 - i * 250) * kMove, y = 560 + (600 + i * 120 - 560) * kMove;
        frac(g, kind, n, d, x, y, prog(t, words[i] - 0.25, words[i] + 0.1), E.ink);
      });
      // "clumsy": ba kiểu viết, chú thích nhỏ (lau đi bằng trượt cùng khối cộng/trừ)
      const wOut = outCubic(prog(t, T.s83 - 0.1, T.s83 + 0.45)) * -1100;
      slide(g, wOut, 0, () => {
        ['STACKED', 'SLASHED', 'ROMAN'].forEach((s, i) => typed(g, s, 200 + i * 250, 650, prog(t, T.way - 0.3 + i * 0.12, T.way + i * 0.12), '500 18px "IBM Plex Mono"', E.dim, { align: 'center' }));
        typed(g, M.add, 110, 760, prog(t, T.adding - 0.1, T.adding + 0.9), 'italic 600 54px "Cormorant Garamond"', E.ink);
        typed(g, M.sub, 110, 850, prog(t, T.subtracting - 0.1, T.subtracting + 0.9), 'italic 600 54px "Cormorant Garamond"', E.ink);
        // mỗi phép cộng/trừ phải quy đồng lại từ đầu
        stamp(g, 'NIGHTMARE', 640, 950, prog(t, T.nightmare, T.nightmare + 0.25), '800 46px "Archivo"', E.accent, { rot: -0.05 });
      });
      // bảng thập phân: "= 0.333333…" viết ra từng chữ số, cột 1/10 · 1/100 · 1/1000
      const PX = 350, PIT = 56;
      M.dec.forEach((s, i) => {
        const y = 620 + i * 120, chars = ['≈', ...s.split('')], k = prog(t, T.format - 0.2 + i * 0.25, T.tenths - 0.1 + i * 0.25);
        const n = Math.round(chars.length * k);
        g.save(); g.font = 'italic 600 64px "Cormorant Garamond"'; g.textAlign = 'center';
        chars.slice(0, n).forEach((c, j) => { g.fillStyle = j === 2 ? E.accent : E.ink; g.fillText(c, j === 0 ? 290 : PX + (j - 1) * PIT, y); });
        g.restore();
      });
      [['1/10', T.tenths], ['1/100', T.hundredths], ['1/1000', T.thousandths]].forEach(([lab, a], c) => {
        const x = PX + (c + 2) * PIT, k = prog(t, a - 0.05, a + 0.3);
        typed(g, lab, x, c === 1 ? 512 : 542, k * 1.5, '500 18px "IBM Plex Mono"', E.accent, { align: 'center' });
        hand(g, [[x - 24, 555], [x + 24, 555], [x + 24, 860], [x - 24, 860], [x - 24, 555]], { w: 3, color: E.accent, jit: 1, seed: 30 + c, k });
      });
      // thế giới Hồi giáo → châu Âu
      typed(g, 'ISLAMIC WORLD', 110, 960, prog(t, T.islamic - 0.1, T.islamic + 0.4), '500 24px "IBM Plex Mono"', E.ink);
      hand(g, seg(330, 952, 480, 952, 8), { w: 3, color: E.accent, jit: 0.6, seed: 4, k: prog(t, T.islamic + 0.4, T.europe) });
      typed(g, 'EUROPE, 1585', 500, 960, prog(t, T.europe - 0.1, T.europe + 0.4), '500 24px "IBM Plex Mono"', E.accent);
    });

    // ── phần 3: một trục số; so sánh; cùng một phép tính ──
    if (t >= T.s85 - 0.1) {
      const kl = prog(t, T.every - 0.1, T.line + 0.2);
      hand(g, seg(LX0, LY, LX1, LY, 40), { w: 4, color: E.ink, jit: 1, seed: 6, k: kl });
      for (let i = 0; i <= 10; i++) { const k = prog(t, T.every + i * 0.06, T.every + i * 0.06 + 0.15), big = i % 5 === 0;
        hand(g, seg(lx(i / 10), LY - (big ? 18 : 10), lx(i / 10), LY + (big ? 18 : 10), 2), { w: big ? 3 : 2, color: E.ink, jit: 0.4, seed: 50 + i, k });
        if (big) typed(g, ['0', '0.5', '1'][i / 5], lx(i / 10), LY + 60, k, 'italic 600 44px "Cormorant Garamond"', E.dim, { align: 'center' }); }
      // ba điểm đúng vị trí thật; nhãn phân số trên, thập phân dưới (so le cho khỏi chồng)
      const dy = [575, 610, 575], lab = M.dec.map(s => '≈ ' + s.slice(0, 6));
      FR.forEach(([n, d], i) => { const a = T.number + i * 0.3, k = prog(t, a, a + 0.25), x = lx(M.v[i]); if (k <= 0) return;
        g.save(); g.fillStyle = E.accent; g.beginPath(); g.arc(x, LY, 10 * outBack(k), 0, 7); g.fill(); g.restore();
        typed(g, `${n}/${d}`, x, LY - 34, k * 1.5, 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
        typed(g, lab[i], x, dy[i] + 30, k * 1.5 - 0.3, '500 20px "IBM Plex Mono"', E.accent, { align: 'center' }); });
      // "compared at a glance": cung nối điểm nhỏ → lớn, và dòng thứ tự
      const ord = [1, 0, 2];
      for (let j = 0; j < 2; j++) { const a = lx(M.v[ord[j]]), b = lx(M.v[ord[j + 1]]), k = prog(t, T.glance - 0.3 + j * 0.25, T.glance + j * 0.25);
        const pts = Array.from({ length: 17 }, (_, i) => { const u = i / 16; return [a + (b - a) * u, LY - 90 - Math.sin(u * Math.PI) * 40]; });
        hand(g, pts, { w: 3, color: E.accent, jit: 0.6, seed: 70 + j, k }); }
      typed(g, '2/7 < 1/3 < 5/12', LX0, 740, prog(t, T.glance - 0.1, T.glance + 0.5), 'italic 600 54px "Cormorant Garamond"', E.ink);
      typed(g, `${lab[1]} < ${lab[0]} < ${lab[2]}`, LX0, 790, prog(t, T.glance + 0.2, T.glance + 0.8), '500 22px "IBM Plex Mono"', E.accent);
      // cộng cột thập phân
      const CX = 1420, kc = i => prog(t, T.added - 0.15 + i * 0.15, T.added + 0.15 + i * 0.15);
      M.col.forEach((s, i) => { typed(g, (i ? '+ ' : '  ') + s, CX, 700 + i * 50, kc(i) * 1.4, '500 34px "IBM Plex Mono"', E.ink, { align: 'right' }); });
      hand(g, seg(CX - 170, 820, CX + 4, 820, 8), { w: 3, color: E.ink, jit: 0.5, seed: 81, k: kc(3) });
      typed(g, '≈ ' + M.sum, CX, 870, prog(t, T.subtracted - 0.2, T.subtracted + 0.3), '500 34px "IBM Plex Mono"', E.accent, { align: 'right' });
      typed(g, '= 87/84', CX + 20, 870, prog(t, T.subtracted, T.subtracted + 0.4), '500 20px "IBM Plex Mono"', E.dim);
      // + − × ÷ cùng một cách
      [['+', T.added], ['−', T.subtracted], ['×', T.multiplied], ['÷', T.divided]].forEach(([s, a], i) => {
        const k = prog(t, a - 0.05, a + 0.2); if (k <= 0) return;
        g.save(); g.translate(1640 + (i % 2) * 70, 720 + Math.floor(i / 2) * 80); g.scale(outBack(k), outBack(k));
        g.font = '800 46px "Archivo"'; g.textAlign = 'center'; g.fillStyle = E.accent; g.fillText(s, 0, 0); g.restore(); });
      hand(g, [[1600, 670], [1590, 670], [1590, 840], [1600, 840]], { w: 3, color: E.ink, jit: 0.5, seed: 83, k: prog(t, T.method - 0.3, T.method + 0.1) });
      typed(g, 'ONE METHOD', 1600, 880, prog(t, T.method - 0.2, T.method + 0.4), '500 20px "IBM Plex Mono"', E.ink);
      // "a small change in form": 1/3 → 0.333…, gạch chân dài ở "enormous effect"
      typed(g, '1/3', 1000, 200, prog(t, T.small - 0.1, T.small + 0.2), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, '→', 1100, 200, prog(t, T.form - 0.2, T.form), 'italic 600 64px "Cormorant Garamond"', E.accent);
      typed(g, '≈ ' + M.dec[0].slice(0, 5), 1180, 200, prog(t, T.form - 0.1, T.form + 0.3), 'italic 600 64px "Cormorant Garamond"', E.ink);
      hand(g, seg(1000, 228, 1810, 222, 30), { w: 5, color: E.accent, jit: 1.2, seed: 85, k: prog(t, T.enormous - 0.1, T.enormous + 0.5) });
      // khoa học · kỹ thuật · kinh doanh
      [['SCIENCE', 1000, T.scientific], ['ENGINEERING', 1200, T.engineering], ['BUSINESS', 1460, T.business]].forEach(([s, x, a]) =>
        typed(g, s, x, 290, prog(t, a - 0.1, a + 0.35), '500 24px "IBM Plex Mono"', E.ink));
      // "runs on decimals": khoanh cột dấu chấm của phép cộng
      const kd = prog(t, T.decimals - 0.1, T.decimals + 0.4);
      if (kd > 0) { g.save(); g.font = '500 34px "IBM Plex Mono"'; const cw = g.measureText('0').width; g.restore();
        const px = CX - cw * 4.5;
        hand(g, Array.from({ length: 41 }, (_, i) => [px + 4 + 12 * Math.cos(i / 40 * 6.6), 788 + 120 * Math.sin(i / 40 * 6.6)]), { w: 3, color: E.accent, jit: 1.2, seed: 87, k: kd }); }
    }
  }
}
