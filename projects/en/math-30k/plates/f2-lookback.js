// "Looking back" (SCRIPT.md) — trở lại nền xương. Câu 208–224 của p2.
//   208–210 vạch trên xương ↔ cùng vạch trên băng, một sợi chỉ nối · 211 ngoặc "valid" mở rộng ra
//   212–217 ba danh sách lớn dần theo lời: số · hình học · chứng minh · 218 "FIXED RULES" ép xuống thực tại — bị gạch
//   219–224 toà nhà: mỗi tầng một chất liệu thời đại, tầng mới, giàn giáo "?" · Riemann 1859 · người dẫn đường chỉ (một lần)
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, figure, stamp, lookup } from '../kit.js';

const E = ERA.bone;
const NOTCH = Array.from({ length: 5 }, (_, i) => 300 + i * 52);
const TX = 1110, CW = 112, TY = 600;                       // băng: 6 ô
const FLOORS = [['bone', '| | | |'], ['clay', '60'], ['papyrus', '½'], ['sand', 'a² + b² = c²'], ['parchment', '0'], ['paper', '∫ f(x) dx'], ['chalk', '∞'], ['screen', '1 0 1 1']];
const BX = 760, BW = 500, FH = 64, BOT = 990;
const fy = j => BOT - (j + 1) * FH;

function bone(g) {
  g.save(); g.translate(150, TY);
  g.fillStyle = '#E3D5B8';
  for (const [x, y, r] of [[14, -20, 28], [16, 20, 27], [520, -18, 26], [518, 19, 25]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.beginPath(); g.moveTo(20, -28); g.bezierCurveTo(160, -14, 360, -16, 524, -26); g.lineTo(524, 24); g.bezierCurveTo(360, 14, 160, 16, 20, 28); g.fill();
  g.restore();
}
const tmark = (g, x, k, seed, color = E.ink) => hand(g, seg(x - 2, TY - 36, x + 2, TY + 36, 8), { w: 9, color, jit: 2, seed, k });

export default class LookBack {
  static ERA = 'bone';
  static IMAGES = {};
  static POSES = ['point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      s208: L(208).start, thirty: w(208, 'thirty'), scratched: w(208, 'scratched'), bone: w(208, 'bone'),
      today: w(209, 'today'), machine: w(209, 'machine'), reads: w(209, 'reads'), tape: w(209, 'tape'), billions: w(209, 'billions'),
      between: w(210, 'between'), one: w(210, 'one'), thread: w(210, 'thread'),
      s211: L(211).start, widened: w(211, 'widened'), valid: w(211, 'valid'),
      counting: w(212, 'counting'), zero: w(213, 'zero'), negative: w(213, 'negative'), fractions: w(213, 'fractions'), irrational: w(213, 'irrational'),
      complex: w(213, 'complex'), infinity: w(213, 'infinity'), infinities: w(213, 'infinities'),
      flat: w(214, 'flat'), geometry: w(214, 'geometry'), curved: w(215, 'curved'), dimensions: w(215, 'dimensions'), picture: w(215, 'picture'),
      proof: w(216, 'proof'), everything: w(216, 'everything'), godel: w(217, 'gödel'), limits: w(217, 'limits'),
      s218: L(218).start, fixed: w(218, 'fixed'), rules: w(218, 'rules'), pressed: w(218, 'pressed'), reality: w(218, 'reality'), e218: L(218).end,
      s219: L(219).start, building: w(219, 'building'), construction: w(219, 'construction'),
      adds: w(220, 'adds'), look: w(220, 'look'), themselves: w(220, 'themselves'),
      you: w(221, 'you'), going: w(221, 'going'), up: w(221, 'up'),
      unsolved: w(222, 'unsolved'), riemann: w(222, 'riemann'), eighteen: w(222, 'eighteen'), cracked: w(222, 'cracked'),
      branches: w(223, 'branches'), decades: w(223, 'decades'),
      thought: w(224, 'thought'),
    };
    this.START = this.T.s208;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'bone');
    card(g, 'bone', prog(t, this.FROM + 0.1, this.START + 1.0), 'LOOKING BACK', '30,000 YEARS', 'one thread');

    // ── 208–210: xương ↔ băng, một sợi chỉ; 211 thu nhỏ lên trên; 218 trượt khỏi khung ──
    const shrink = outCubic(prog(t, T.s211 - 0.1, T.s211 + 0.7)), gone = outCubic(prog(t, T.s218 - 0.1, T.s218 + 0.5));
    if (gone < 1) {
      g.save(); g.translate(960, TY + (380 - TY) * shrink - gone * 600); g.scale(1 - 0.5 * shrink, 1 - 0.5 * shrink); g.translate(-960, -TY);
      const kb = prog(t, T.s208 - 0.1, T.s208 + 0.4);
      if (kb > 0) { g.save(); g.translate(0, (1 - outCubic(kb)) * 500); bone(g); g.restore(); }
      NOTCH.forEach((x, i) => { const a = T.scratched + i * 0.12; hand(g, seg(x, TY - 20, x + 2, TY + 18, 6), { w: 4, color: '#5A3E28', jit: 0.8, seed: i, k: prog(t, a, a + 0.12) }); });
      // băng: 6 ô, 5 vạch như trên xương
      const kt = prog(t, T.tape - 0.6, T.tape + 0.2);
      for (let i = 0; i <= 6; i++) hand(g, seg(TX + i * CW, TY - 60, TX + i * CW, TY + 60, 4), { w: 3, color: E.dim, jit: 0.4, seed: 20 + i, k: prog(kt, i / 8, i / 8 + 0.3) });
      hand(g, seg(TX, TY - 60, TX + 6 * CW, TY - 60, 12), { w: 3, color: E.dim, jit: 0.4, seed: 31, k: kt });
      hand(g, seg(TX, TY + 60, TX + 6 * CW, TY + 60, 12), { w: 3, color: E.dim, jit: 0.4, seed: 33, k: kt });
      for (let i = 0; i < 5; i++) { const a = T.tape + 0.1 + i * 0.08; tmark(g, TX + i * CW + CW / 2, prog(t, a, a + 0.12), i); }
      // đầu đọc: vào ở "reads", chạy rất nhanh từ "billions"
      const kh = prog(t, T.reads - 0.1, T.reads + 0.3);
      if (kh > 0) {
        const run = Math.max(0, t - T.billions), p = 2.5 + 2.5 * Math.sin(run * 9 - Math.PI / 2) * Math.min(1, run * 2), hx = TX + CW / 2 + p * CW;
        g.save(); g.strokeStyle = E.accent; g.lineWidth = 5; g.globalAlpha = kh; g.strokeRect(hx - CW / 2 - 5, TY - 66, CW + 10, 132);
        g.fillStyle = E.accent; g.beginPath(); g.moveTo(hx, TY - 78); g.lineTo(hx - 16, TY - 104); g.lineTo(hx + 16, TY - 104); g.fill(); g.restore();
      }
      // sợi chỉ duy nhất
      const pts = Array.from({ length: 41 }, (_, i) => { const s = i / 40; return [690 + (TX - 10 - 690) * s, TY + Math.sin(s * Math.PI * 3) * 14]; });
      hand(g, pts, { w: 5, color: E.accent, jit: 1, seed: 41, k: prog(t, T.one - 0.1, T.thread + 0.4) });
      g.restore();
      const lo = outCubic(prog(t, T.s211 - 0.2, T.s211 + 0.3)) * 600;
      typed(g, '30,000 YEARS AGO', 150, 720 + lo, prog(t, T.thirty, T.thirty + 0.6), '500 22px "IBM Plex Mono"', E.dim);
      typed(g, 'TODAY · BILLIONS OF TIMES A SECOND', TX, 720 + lo, prog(t, T.today, T.billions + 0.6), '500 22px "IBM Plex Mono"', E.dim);
    }

    // ── 211–217: cái được gọi là "hợp lệ" rộng dần ──
    const lOut = outCubic(prog(t, T.s218 - 0.1, T.s218 + 0.5));
    if (t >= T.widened - 0.2 && lOut < 1) {
      g.save(); g.translate(0, lOut * 800);
      const ow = outCubic(prog(t, T.widened - 0.1, T.widened + 0.8)), xl = 900 - 780 * ow, xr = 1020 + 780 * ow;
      hand(g, [[xl + 26, 450], [xl, 450], [xl, 990], [xl + 26, 990]], { w: 5, color: E.accent, jit: 1, seed: 51 });
      hand(g, [[xr - 26, 450], [xr, 450], [xr, 990], [xr - 26, 990]], { w: 5, color: E.accent, jit: 1, seed: 53 });
      typed(g, 'WHAT COUNTS AS VALID', 960, 482, prog(t, T.valid - 0.2, T.valid + 0.4), '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
      // số
      typed(g, 'NUMBERS', 160, 585, prog(t, T.s211 + 1.0, T.counting), '500 22px "IBM Plex Mono"', E.dim);
      const NUM = [['1, 2, 3', T.counting], ['0', T.zero], ['−1', T.negative], ['½', T.fractions], ['√2', T.irrational], ['i', T.complex], ['∞', T.infinity]];
      g.save(); g.font = 'italic 600 54px "Cormorant Garamond"';
      let x = 390, end = 390;
      NUM.forEach(([s, a]) => { const k = prog(t, a - 0.05, a + 0.25); typed(g, s, x, 590, k, 'italic 600 54px "Cormorant Garamond"', E.ink); g.font = 'italic 600 54px "Cormorant Garamond"'; const wd = g.measureText(s).width; if (k > 0) end = x + wd * k; x += wd + 74; });
      [[40, 0], [54, 1], [64, 2]].forEach(([px, j]) => { const a = T.infinities - 0.3 + j * 0.15, k = prog(t, a, a + 0.15);
        typed(g, '∞', x, 590, k, `italic ${px === 54 ? 600 : px === 40 ? 600 : 600} ${px}px "Cormorant Garamond"`, E.accent); g.font = `italic 600 ${px}px "Cormorant Garamond"`; const wd = g.measureText('∞').width; if (k > 0) end = x + wd; x += wd + 16; });
      g.restore();
      hand(g, seg(390, 612, Math.max(392, end), 612, 30), { w: 3, color: E.accent, jit: 0.6, seed: 57 });
      // hình học
      typed(g, 'GEOMETRY', 160, 715, prog(t, T.flat - 0.4, T.flat), '500 22px "IBM Plex Mono"', E.dim);
      const icon = (cx, a, lab, draw) => { const k = prog(t, a - 0.05, a + 0.3); if (k <= 0) return;
        g.save(); g.translate(cx, 700); g.scale(outBack(k), outBack(k)); g.strokeStyle = E.ink; g.lineWidth = 3; draw(); g.restore();
        typed(g, lab, cx, 788, k, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' }); };
      icon(470, T.flat, 'FLAT', () => { g.beginPath(); g.moveTo(-60, 26); g.lineTo(36, 26); g.lineTo(60, -26); g.lineTo(-36, -26); g.closePath(); g.stroke();
        g.beginPath(); for (let i = 1; i < 4; i++) { g.moveTo(-60 + i * 24, 26); g.lineTo(-36 + i * 24, -26); } g.moveTo(-48, 0); g.lineTo(48, 0); g.stroke(); });
      icon(740, T.curved, 'CURVED', () => { g.beginPath(); g.arc(0, 0, 44, 0, 7); g.stroke(); g.beginPath(); g.ellipse(0, 0, 44, 13, 0, 0, 7); g.ellipse(0, 0, 16, 44, 0, 0, 7); g.stroke(); });
      icon(1030, T.dimensions, 'MANY DIMENSIONS', () => { const sq = (o, s) => g.strokeRect(o - s / 2, -o - s / 2, s, s); sq(-14, 70); sq(14, 70); sq(0, 30);
        g.beginPath(); for (const [a, b] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { g.moveTo(-14 + a * 35, 14 + b * 35); g.lineTo(14 + a * 35, -14 + b * 35); g.moveTo(a * 15, b * 15); g.lineTo(-14 + a * 35, 14 + b * 35); } g.stroke(); });
      icon(1340, T.picture, 'BEYOND PICTURING', () => { g.setLineDash([8, 8]); g.beginPath(); g.arc(0, 0, 46, 0, 7); g.stroke(); g.setLineDash([]);
        g.fillStyle = E.accent; g.font = '800 46px "Archivo"'; g.textAlign = 'center'; g.fillText('?', 0, 16); });
      // chứng minh
      typed(g, 'PROOF', 160, 915, prog(t, T.proof - 0.3, T.proof), '500 22px "IBM Plex Mono"', E.dim);
      const k1 = prog(t, T.everything - 0.1, T.everything + 0.3);
      if (k1 > 0) { g.save(); g.fillStyle = E.ink; g.globalAlpha = 0.9; g.beginPath(); g.arc(420, 900, 26 * outBack(k1), 0, 7); g.fill(); g.restore(); }
      typed(g, 'everything', 462, 918, k1, 'italic 600 54px "Cormorant Garamond"', E.ink);
      const k2 = prog(t, T.limits - 0.2, T.limits + 0.4);
      if (k2 > 0) {
        hand(g, Array.from({ length: 31 }, (_, i) => [800 + 26 * Math.cos(i / 30 * 7), 900 + 26 * Math.sin(i / 30 * 7)]), { w: 3, color: E.ink, seed: 61, k: k2 });
        hand(g, seg(854, 866, 854, 934, 6), { w: 5, color: E.accent, jit: 0.8, seed: 63, k: k2 });   // vách giới hạn giữa hệ và G
        typed(g, 'G', 868, 914, k2, 'italic 600 44px "Cormorant Garamond"', E.accent);
      }
      typed(g, 'has limits', 940, 918, k2, 'italic 600 54px "Cormorant Garamond"', E.accent);
      typed(g, 'GÖDEL, 1931', 1200, 912, prog(t, T.godel, T.godel + 0.4), '500 22px "IBM Plex Mono"', E.dim);
      g.restore();
    }

    // ── 218: không phải bộ luật cố định ép lên thực tại ──
    const rOut = outCubic(prog(t, T.s219 - 0.1, T.s219 + 0.5));
    if (t >= T.fixed - 0.2 && rOut < 1) {
      g.save(); g.translate(0, rOut * 800);
      hand(g, seg(520, 700, 1400, 700, 30), { w: 4, color: E.dim, jit: 1.5, seed: 71, k: prog(t, T.rules - 0.2, T.rules + 0.5) });
      typed(g, 'REALITY', 960, 750, prog(t, T.reality - 0.1, T.reality + 0.4), '500 22px "IBM Plex Mono"', E.dim, { align: 'center' });
      const kf = prog(t, T.fixed - 0.2, T.fixed + 0.3), press = outCubic(prog(t, T.pressed - 0.1, T.pressed + 0.25));
      if (kf > 0) {
        const y = 420 + 210 * press + (1 - outBack(kf)) * -300;
        g.save(); g.strokeStyle = E.ink; g.lineWidth = 5; g.strokeRect(720, y - 60, 480, 120);
        g.font = '800 64px "Archivo"'; g.fillStyle = E.ink; g.textAlign = 'center'; g.fillText('FIXED RULES', 960, y + 22); g.restore();
      }
      const kx = prog(t, T.e218 - 0.4, T.e218 + 0.1);
      hand(g, seg(700, 560, 1220, 700, 8), { w: 9, color: E.accent, jit: 2, seed: 75, k: clamp(kx * 2) });
      hand(g, seg(1220, 560, 700, 700, 8), { w: 9, color: E.accent, jit: 2, seed: 77, k: clamp(kx * 2 - 1) });
      g.restore();
    }

    // ── 219–224: toà nhà đang xây ──
    if (t < T.building - 0.3) return;
    // khi người dẫn đường rời khung ("Riemann"), cả toà nhà trượt về giữa khung
    const shift = 260 * outCubic(prog(t, T.riemann - 0.2, T.riemann + 0.8));
    g.save(); g.translate(-shift, 0);
    const nF = 7 + outCubic(prog(t, T.adds - 0.1, T.adds + 0.4));      // số tầng (để đặt giàn giáo)
    const look = prog(t, T.look - 0.1, T.themselves + 0.6), lookF = look > 0 && look < 1 ? 7 - Math.floor(look * 8) : -1;
    FLOORS.forEach(([era, sym], j) => {
      const a = j < 7 ? T.building + j * 0.12 : T.adds - 0.1, k = prog(t, a, a + 0.4); if (k <= 0) return;
      const F = ERA[era], y = fy(j) - (1 - outCubic(k)) * 700;
      g.save(); g.fillStyle = F.bg; g.fillRect(BX, y, BW, FH); g.strokeStyle = j === lookF ? E.accent : E.ink; g.lineWidth = j === lookF ? 5 : 3; g.strokeRect(BX, y, BW, FH);
      g.font = era === 'screen' ? '500 26px "IBM Plex Mono"' : 'italic 600 44px "Cormorant Garamond"'; g.fillStyle = F.ink; g.textAlign = 'center'; g.fillText(sym, BX + BW / 2, y + 44);
      g.restore();
    });
    // giàn giáo trên cùng: "under construction" — "?" ở "hasn't been thought of yet"
    const sy = BOT - (nF + 1) * FH, ks = prog(t, T.construction - 0.2, T.construction + 0.5);
    if (ks > 0) {
      const sc = [[BX, sy + FH, BX, sy], [BX + BW, sy + FH, BX + BW, sy], [BX, sy, BX + BW, sy], [BX + BW / 2, sy + FH, BX + BW / 2, sy],
        [BX, sy + FH, BX + BW / 2, sy], [BX + BW / 2, sy + FH, BX + BW, sy]];
      sc.forEach(([a, b, c, d], i) => hand(g, seg(a, b, c, d, 8), { w: 3, color: E.dim, jit: 1, seed: 81 + i, k: prog(ks, i / 8, i / 8 + 0.4) }));
    }
    typed(g, '?', BX + BW * 0.75, sy + 54, prog(t, T.thought - 0.1, T.thought + 0.2), '800 64px "Archivo"', E.accent, { align: 'center' });
    // "still going up": cần cẩu mọc lên từ giàn giáo
    const kc = prog(t, T.going - 0.2, T.up + 0.4);
    if (kc > 0) {
      const mx = BX + BW - 30, top = sy - 160 * outCubic(kc);
      hand(g, seg(mx, sy, mx, top, 8), { w: 4, color: E.ink, jit: 0.8, seed: 91 });
      if (kc > 0.5) { const kj = prog(kc, 0.5, 1); hand(g, seg(mx + 40, top, mx - 260 * kj + 40, top, 8), { w: 4, color: E.ink, jit: 0.8, seed: 93 });
        if (kj >= 1) hand(g, seg(mx - 200, top, mx - 200, top + 50, 3), { w: 2, color: E.dim, jit: 0.4, seed: 95 }); }
    }
    // problemas cũ còn mở · Riemann 1859 · nhánh mới vài chục năm
    [3, 4].forEach((j, i) => typed(g, '?', BX + BW - 36, fy(j) + 46, prog(t, T.unsolved + i * 0.15, T.unsolved + 0.2 + i * 0.15), '800 46px "Archivo"', E.accent, { align: 'center' }));
    const ry = fy(6) + 32;
    hand(g, seg(BX + BW + 6, ry, 1300, ry, 8), { w: 3, color: E.accent, jit: 0.6, seed: 97, k: prog(t, T.riemann - 0.2, T.riemann + 0.2) });
    typed(g, 'RIEMANN HYPOTHESIS', 1310, ry + 8, prog(t, T.riemann, T.riemann + 0.5), '500 20px "IBM Plex Mono"', E.ink);
    typed(g, '· 1859', 1536, ry + 8, prog(t, T.eighteen, T.eighteen + 0.3), '500 20px "IBM Plex Mono"', E.ink);
    typed(g, '· UNSOLVED', 1622, ry + 8, prog(t, T.cracked - 0.1, T.cracked + 0.3), '500 20px "IBM Plex Mono"', E.accent);
    const kbr = prog(t, T.branches - 0.1, T.branches + 0.3), y7 = fy(7);
    if (kbr > 0) { g.save(); g.strokeStyle = E.ink; g.lineWidth = 3; g.fillStyle = ERA.screen.bg;
      for (const [x, y, w, h] of [[BX + BW, y7 + 10, 54, 46], [BX + BW + 54, y7 + 22, 40, 34]]) { const s = outBack(kbr); g.fillRect(x, y + h * (1 - s), w, h * s); g.strokeRect(x, y + h * (1 - s), w, h * s); }
      g.restore(); }
    typed(g, 'A FEW DECADES OLD', BX + BW + 110, y7 + 44, prog(t, T.decades - 0.1, T.decades + 0.4), '500 20px "IBM Plex Mono"', E.dim);
    g.restore();
    // người dẫn đường chỉ vào toà nhà: "you are living at a moment…" — tụt xuống ở "Riemann"
    const mOut = outCubic(prog(t, T.riemann - 0.3, T.riemann + 0.2));
    if (t >= T.you - 0.3 && mOut < 1) { g.save(); g.translate(0, mOut * 800); figure(g, 'point', 400, 1080, 640, 'bone', prog(t, T.you - 0.3, T.you + 0.1)); g.restore(); }
  }
}
