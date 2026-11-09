// Looking back (SCRIPT.md § Looking back, p2 câu 119–129) — ra khỏi lỗ (terminal), trở lại trang giấy. DNA §1 "Kết".
//   119      lỗ ở nhà (960, 640) có số "0" bên trong · "one of the most important inventions"
//   120      ba thứ nối về số 0: gốc toạ độ, d/dx, terminal ">_"
//   121      "boundary attached": rào đỏ quanh lỗ · "÷ 0" gạch đỏ · mascot halt (phải, lòng bàn tay hướng về lỗ)
//   122–125  ba lỗ khác (3 − 5, 7 ÷ 2, √−1) — "?" khoanh đỏ khi phép "ran out", miếng vá −2, 7/2, i dán băng keo;
//            "old rules kept working": phép thử lại tính bằng code + dấu tích mực
//   126      miếng vá "∞" trượt tới lỗ 0 và RƠI TUỘT (thu nhỏ, xoay, tối dần) — vọng lại miếng vá ở mở bài
//   127      "made them pay": hoá đơn (mặt cầu Riemann: ∞ không dấu, 0 × ∞ và ∞ − ∞ vẫn không định nghĩa)
//   128      "an arbitrary ban" — chữ "ban" gạch đỏ
//   129      hoá đơn + "ban" rời khung; lỗ nở ra; lưới giấy kẻ đậm lại từ lỗ toả ra ("woven together"), lỗ vẫn tối
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, lookup, hole, strike, cross, ring, arrow, figure, GRID } from '../kit.js';

const E = ERA.page;
const HX = 960, HY = 640, HR = 64;                                // lỗ ở nhà
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;
const fmt = n => (n < 0 ? '−' : '') + Math.abs(n);

// ── ba lỗ đã được vá: phép tính ra hết đáp án → loại số mới; kiểm bằng code ──
const cmul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const ROW = (() => {
  const neg = 3 - 5, half = 7 / 2, ii = cmul([0, 1], [0, 1]);
  if (neg !== -2 || neg + 5 !== 3) throw new Error('d3: 3 − 5');
  if (half !== 3.5 || half * 2 !== 7) throw new Error('d3: 7 ÷ 2');
  if (ii[0] !== -1 || ii[1] !== 0) throw new Error('d3: i × i');
  return [
    { x: 480,  q: '3 − 5 = ?', patch: fmt(neg),  kind: 'NEGATIVE NUMBERS', check: `${fmt(neg)} + 5 = ${fmt(neg + 5)}` },
    { x: 960,  q: '7 ÷ 2 = ?', patch: '7/2',     kind: 'FRACTIONS',        check: `7/2 × 2 = ${fmt(half * 2)}` },
    { x: 1440, q: '√−1 = ?',   patch: 'i',       kind: 'COMPLEX NUMBERS',              check: `i × i = ${fmt(ii[0])}` },
  ];
})();
const RY = 340, RR = 50;                                          // hàng lỗ phía trên

// miếng giấy vá: giấy kem, viền mờ, bốn góc băng keo; chữ ở giữa
function patch(g, x, y, s, rot, label, color, dark = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(-82, -54, 172, 116);
  g.fillStyle = '#F7F1DE'; g.fillRect(-86, -58, 172, 116);
  g.strokeStyle = 'rgba(28,38,64,.28)'; g.lineWidth = 2; g.strokeRect(-86, -58, 172, 116);
  g.font = A(64); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = color; g.fillText(label, 0, 4);
  g.fillStyle = 'rgba(232,214,150,0.72)';
  for (const [cx, cy, a] of [[-86, -58, -0.75], [86, -58, 0.75], [86, 58, -0.75], [-86, 58, 0.75]]) {
    g.save(); g.translate(cx, cy); g.rotate(a); g.fillRect(-30, -11, 60, 22); g.restore();
  }
  if (dark > 0) { g.fillStyle = `rgba(10,10,13,${dark})`; g.fillRect(-100, -72, 200, 144); }
  g.restore();
}
// dấu tích viết tay (mực — "vẫn đúng", không phải đỏ)
const tick = (g, x, y, k, seed) => hand(g, [[x, y], [x + 8, y + 10], [x + 12, y + 14], [x + 20, y], [x + 30, y - 18]], { w: 4, color: E.ink, seed, k });

export default class Back {
  static ERA = 'page';
  static POSES = ['halt'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd3');
    this.T = {
      zero: w(119, 'zero'), important: w(119, 'important'), e119: L(119).end,
      origin: w(120, 'origin'), calculus: w(120, 'calculus'), computer: w(120, 'computer'),
      boundary: w(121, 'boundary'), attached: w(121, 'attached'), cannot: w(121, 'cannot'), divide: w(121, 'divide'), e121: L(121).end,
      l122: L(122).start, holes: w(122, 'holes'), before: w(122, 'before'),
      subtraction: w(123, 'subtraction'), negative: w(123, 'negative'), numbers: w(123, 'numbers'),
      division: w(123, 'division'), fractions: w(123, 'fractions'),
      square: w(124, 'square'), invented3: w(124, 'invented'), i: w(124, 'i'),
      kind: w(125, 'kind'), filled: w(125, 'filled'), old: w(125, 'old'), kept: w(125, 'kept'), working: w(125, 'working'),
      dividing: w(126, 'dividing'), oneHole: w(126, 'hole'), four: w(126, 'four'), no: w(126, 'no'), fill: w(126, 'fill'), free: w(126, 'free'),
      step: w(127, 'step'), system: w(127, 'system'), made: w(127, 'made'), pay: w(127, 'pay'), giving: w(127, 'giving'), rule: w(127, 'rule'), exchange: w(127, 'exchange'),
      arbitrary: w(128, 'arbitrary'), ban: w(128, 'ban'),
      hole129: w(129, 'hole'), filled129: w(129, 'filled'), tightly: w(129, 'tightly'), woven: w(129, 'woven'), together: w(129, 'together'),
    };
    this.START = L(119).start;
    this.FROM = this.START - 1.2;
    this.WIPE = [HX, HY];                                          // ra khỏi lỗ: trang loang từ tâm lỗ
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md (ra khỏi lỗ: giữ whoosh-long mặc định)
    const T = this.T;
    return [
      { t: T.zero - 0.1, kind: 'pen' },          // "0" sáng trong lỗ
      { t: T.origin - 0.35, kind: 'pen' },       // gốc toạ độ · d/dx · terminal
      { t: T.divide + 0.35, kind: 'error' },     // ✗ đỏ "÷ 0"
      { t: T.holes - 0.1, kind: 'pop' },         // ba lỗ khác
      { t: T.negative - 0.15, kind: 'pop' },     // miếng vá −2
      { t: T.fractions - 0.15, kind: 'pop' },    // miếng vá 7/2
      { t: T.invented3 - 0.15, kind: 'pop' },    // miếng vá i
      { t: T.kept - 0.1, kind: 'correct' },      // ✓ luật cũ vẫn chạy
      { t: T.no - 0.1, kind: 'pop' },            // miếng vá ∞ trượt tới
      { t: T.free - 0.05, kind: 'whoosh' },      // miếng vá ∞ rơi tuột qua lỗ
      { t: T.system - 0.2, kind: 'pop' },        // hoá đơn trượt vào
      { t: T.tightly - 0.2, kind: 'shimmer' },   // lưới kẻ đậm lại — "woven together"
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'page');

    // ── 129: lưới giấy kẻ đậm lại từ lỗ toả ra (ý 'woven' của a0-open, chép tại chỗ) — DƯỚI mực ──
    const wv = prog(t, T.tightly - 0.2, T.together + 0.4);
    if (wv > 0) {
      g.save(); g.globalAlpha = 0.4; g.strokeStyle = E.ink; g.lineWidth = 1.6;
      const R = 1300 * outCubic(wv);
      for (let x = 24; x < W; x += GRID) { const d = Math.abs(x - HX); if (d > R) continue; const h = Math.sqrt(R * R - d * d); g.beginPath(); g.moveTo(x, HY - h); g.lineTo(x, HY + h); g.stroke(); }
      for (let y = 12; y < H; y += GRID) { const d = Math.abs(y - HY); if (d > R) continue; const h = Math.sqrt(R * R - d * d); g.beginPath(); g.moveTo(HX - h, y); g.lineTo(HX + h, y); g.stroke(); }
      g.restore();
    }

    card(g, 'page', prog(t, this.FROM + 0.4, this.FROM + 1.8), 'ACT THREE · THE PRICE', 'Looking back');

    // ── 119–120: nhóm "phát minh" — trượt lên rời khung khi sang câu 122 ──
    const upA = outCubic(prog(t, T.l122 - 0.15, T.l122 + 0.5)) * -760;
    if (upA > -760) {
      g.save(); g.translate(0, upA);
      typed(g, 'one of the most important inventions', HX, 790, prog(t, T.important - 0.2, T.e119), I(44), E.ink, { align: 'center' });
      // gốc toạ độ: hai trục, chấm ở gốc
      const ko = prog(t, T.origin - 0.35, T.origin + 0.2), ox = 600, oy = 330;
      hand(g, seg(ox - 80, oy, ox + 80, oy, 10), { w: 3, color: E.ink, seed: 201, k: ko });
      hand(g, seg(ox, oy + 70, ox, oy - 70, 10), { w: 3, color: E.ink, seed: 202, k: ko });
      if (ko >= 1) { hand(g, [[ox + 66, oy - 9], [ox + 80, oy], [ox + 66, oy + 9]], { w: 3, color: E.ink, seed: 203 }); hand(g, [[ox - 9, oy - 56], [ox, oy - 70], [ox + 9, oy - 56]], { w: 3, color: E.ink, seed: 204 }); }
      if (ko > 0.6) { g.fillStyle = E.ink; g.beginPath(); g.arc(ox, oy, 7, 0, 7); g.fill(); typed(g, '0', ox - 26, oy + 34, ko * 3 - 2, I(40), E.ink); }
      typed(g, 'ORIGIN', ox, oy + 112, prog(t, T.origin, T.origin + 0.4), M(22), E.dim, { align: 'center' });
      arrow(g, ox + 70, oy + 70, HX - 70, HY - 62, prog(t, T.origin + 0.1, T.origin + 0.5), { color: E.dim, w: 3, bend: 30, seed: 205 });
      // calculus: d/dx
      const kc = prog(t, T.calculus - 0.25, T.calculus + 0.25), cx = 1270, cy = 330;
      typed(g, 'd/dx', cx, cy, kc, I(72), E.ink, { align: 'center' });
      typed(g, 'CALCULUS', cx, cy + 50, prog(t, T.calculus, T.calculus + 0.4), M(22), E.dim, { align: 'center' });
      arrow(g, cx - 60, cy + 80, HX + 68, HY - 62, prog(t, T.calculus + 0.1, T.calculus + 0.5), { color: E.dim, w: 3, bend: -30, seed: 206 });
      // computer: terminal ">_" — một mẩu bóng tối giống trong lỗ
      const kt = prog(t, T.computer - 0.3, T.computer + 0.15), tx = 470, ty = 650;
      if (kt > 0) { const s = outBack(kt); g.save(); g.translate(tx, ty); g.scale(s, s);
        g.fillStyle = ERA.void.bg; g.fillRect(-90, -52, 180, 104); g.strokeStyle = E.ink; g.lineWidth = 3; g.strokeRect(-90, -52, 180, 104);
        g.font = M(34); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = ERA.void.accent; g.fillText('>_', 0, 2); g.restore(); }
      typed(g, 'COMPUTER', tx, ty + 96, prog(t, T.computer, T.computer + 0.4), M(22), E.dim, { align: 'center' });
      arrow(g, tx + 104, ty - 4, HX - HR - 18, HY, prog(t, T.computer + 0.1, T.computer + 0.45), { color: E.dim, w: 3, bend: 0, seed: 207 });
      g.restore();
    }

    // ── 121: rào đỏ quanh lỗ + "÷ 0" gạch đỏ ──
    const pulse = outBack(prog(t, T.hole129 - 0.15, T.hole129 + 0.35)) * 12;          // "a hole that cannot be filled": lỗ nở
    const hr = HR * outBack(prog(t, this.FROM, this.FROM + 0.6)) + pulse;
    ring(g, HX, HY, hr + 34, hr + 30, prog(t, T.boundary - 0.1, T.attached + 0.3), { w: 5, seed: 211 });
    typed(g, '÷ 0', HX + 150, HY + 22, prog(t, T.divide - 0.2, T.divide + 0.3), A(72), E.ink);
    cross(g, HX + 205, HY - 4, 54, prog(t, T.divide + 0.35, T.e121 + 0.2), { seed: 212 });

    // ── 122–125: ba lỗ khác, vá bằng loại số mới ──
    const ran = [T.subtraction, T.division, T.square], inv = [T.negative, T.fractions, T.invented3];
    ROW.forEach((c, i) => {
      const ap = T.holes - 0.1 + i * 0.28;
      const r = RR * outBack(prog(t, ap, ap + 0.4));
      if (r <= 0) return;
      hole(g, c.x, RY, r, null, { seed: 20 + i });
      typed(g, c.q, c.x, RY - 96, prog(t, ap + 0.1, ap + 0.6), A(56), E.ink, { align: 'center' });
      g.save(); g.font = A(56); const qw = g.measureText(c.q).width, qmw = g.measureText('?').width; g.restore();
      ring(g, c.x + qw / 2 - qmw / 2, RY - 116, 30, 36, prog(t, ran[i] + 0.1, ran[i] + 0.5), { w: 4, seed: 220 + i });
      // miếng vá trượt lên từ dưới, xoay về, dán
      const pk = prog(t, inv[i] - 0.15, inv[i] + 0.45);
      const press = Math.sin(clamp(prog(t, T.filled - 0.1 + i * 0.12, T.filled + 0.25 + i * 0.12)) * Math.PI) * 0.04;
      if (pk > 0) { const e = outCubic(pk);
        patch(g, c.x, RY + (1 - e) * 700, 1 - press, (-0.05 + 0.04 * i) + (1 - e) * 0.5 * (i % 2 ? 1 : -1), c.patch, E.ink); }
      typed(g, c.kind, c.x, RY + 112, prog(t, T.kind - 0.2 + i * 0.25, T.kind + 0.3 + i * 0.25), M(22), E.dim, { align: 'center' });
      typed(g, c.check, c.x - 18, RY + 162, prog(t, T.old - 0.25 + i * 0.22, T.old + 0.35 + i * 0.22), M(24), E.ink, { align: 'center' });
      g.save(); g.font = M(24); const cw = g.measureText(c.check).width; g.restore();
      tick(g, c.x - 18 + cw / 2 + 14, RY + 156, prog(t, T.kept - 0.1 + i * 0.2, T.kept + 0.15 + i * 0.2), 230 + i);
    });

    // ── lỗ 0 (trên lưới, dưới miếng vá rơi): số "0" sáng trong bóng tối ──
    if (hr > 0) hole(g, HX, HY, hr, (r) => {
      typed(g, '0', 0, r * 0.42, prog(t, T.zero - 0.1, T.zero + 0.3), I(120), ERA.void.ink, { align: 'center' });
    }, { seed: 5 });

    // ── 126: miếng vá "∞" trượt tới, rơi tuột qua lỗ ──
    const ik = prog(t, T.no - 0.1, T.fill + 0.1), ifall = prog(t, T.free - 0.05, T.free + 1.3);
    if (ik > 0 && ifall < 1) {
      const e = outCubic(ik), f = ifall * ifall;
      patch(g, HX + (1 - e) * 1100, HY - (1 - e) * 160, 1 - outCubic(ifall) * 0.94, 0.06 - (1 - e) * 0.4 + ifall * 2.4, '∞', E.accent, Math.min(0.9, f * 1.3));
    }
    typed(g, 'NO NEW NUMBER FILLS IT FOR FREE', HX, HY + 190, prog(t, T.oneHole - 0.1, T.four + 0.5) * (1 - prog(t, T.arbitrary - 0.6, T.arbitrary - 0.3)), M(24), E.dim, { align: 'center' });

    // ── 127: hoá đơn — nhích ra khi "the system", in từng dòng ở "pay" / "giving up another rule" ──
    const rOut = outCubic(prog(t, T.hole129 - 0.4, T.hole129 + 0.3));
    const rIn = outCubic(prog(t, T.system - 0.2, T.system + 0.4));
    if (rIn > 0 && rOut < 1) {
      const x0 = 1330 + (1 - rIn) * 700 + rOut * 700, y0 = 590, rw = 330;
      const lines = [
        ['RIEMANN SPHERE', E.dim, T.system + 0.1],
        ['1 ÷ 0 = ∞', E.ink, T.made],
        ['PAID WITH:', E.dim, T.pay],
        ['∞ HAS NO SIGN', E.accent, T.giving],
        ['0 × ∞ UNDEFINED', E.accent, T.rule],
        ['∞ − ∞ UNDEFINED', E.accent, T.exchange],
      ];
      const shown = lines.filter(l => t >= l[2] - 0.2).length, rh = 70 + Math.max(1, shown) * 44 + 20;
      g.save(); g.translate(x0, y0); g.rotate(-0.03);
      g.fillStyle = 'rgba(0,0,0,0.14)'; g.fillRect(10, 12, rw, rh);
      g.fillStyle = '#FFFDF6'; g.beginPath(); g.moveTo(0, 0); g.lineTo(rw, 0); g.lineTo(rw, rh);
      for (let i = 0; i <= 16; i++) g.lineTo(rw - i * rw / 16, rh + (i % 2 ? -9 : 0));
      g.closePath(); g.fill(); g.strokeStyle = 'rgba(28,38,64,.3)'; g.lineWidth = 1.5; g.stroke();
      typed(g, 'THE PRICE', 24, 46, prog(t, T.system, T.system + 0.4), M(26), E.ink);
      hand(g, seg(24, 62, rw - 24, 62, 10), { w: 2, color: E.dim, seed: 240, k: prog(t, T.system + 0.1, T.system + 0.5) });
      lines.forEach(([s, c, a], i) => typed(g, s, 24, 104 + i * 44, prog(t, a - 0.2, a + 0.35), M(22), c));
      g.restore();
    }

    // ── 128: "an arbitrary ban" — "ban" gạch đỏ ──
    const bOut = outCubic(prog(t, T.hole129 - 0.4, T.hole129 + 0.3));
    if (bOut < 1) {
      const bx = 230 - bOut * 900, by = 720, s1 = 'an arbitrary ', s2 = 'ban';
      typed(g, s1 + s2, bx, by, prog(t, T.arbitrary - 0.3, T.ban + 0.1), I(64), E.ink);
      g.save(); g.font = I(64); const w1 = g.measureText(s1).width, w2 = g.measureText(s2).width; g.restore();
      strike(g, bx + w1 - 8, by - 18, bx + w1 + w2 + 10, by - 26, prog(t, T.ban + 0.15, T.ban + 0.45), { seed: 250 });
    }

    // ── mascot halt: "boundary attached. You cannot divide by it." — phải, lòng bàn tay hướng về lỗ ──
    const mIn = prog(t, T.boundary - 0.3, T.boundary + 0.05), mOut = outCubic(prog(t, T.l122 + 0.9, T.l122 + 1.5));
    if (mIn > 0 && mOut < 1) figure(g, 'halt', 1660, H + mOut * 760, 700, 'page', mIn);
  }
}
