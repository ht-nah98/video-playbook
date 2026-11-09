// Mở bài (SCRIPT.md § Cold open) — giấy in, "hôm nay".
//   c0–c3 bức tường ý tưởng BỊ CHÊ: chữ số bị Florence cấm · 0 · −1 · √−1 · |ℝ| > |ℕ|, mỗi cái một dấu phán xét
//   c4–c7 dấu bong ra, tất cả nằm yên trên trang vở; ký hiệu nào cũng có người và năm (CONTENT.md § mở bài v3)
//   c8–c10 nét vạch dài: từ vạch đầu tiên tới cái máy trong túi; màn chập khép về vạch đầu tiên → intro
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, stamp, figure, iris, lookup } from '../kit.js';

const E = ERA.paper;
const CARDS = [   // [ký hiệu, lời phán, từ hiện ký hiệu, từ đóng dấu]
  ['0', 'NOTHING AT ALL', [1, 'zero'], [1, 'nothing']],
  ['−1', 'FICTITIOUS', [1, 'negative'], [1, 'fictitious']],
  ['√−1', 'USELESS', [2, 'square'], [2, 'useless']],
  ['∞ > ∞', 'CORRUPTER OF YOUTH', [3, 'infinities'], [3, 'corrupter']],
];
const TAGS = [    // ký hiệu trên trang vở + ai, năm nào
  ['+', 'WIDMANN · 1489'], ['=', 'RECORDE · 1557'], ['√', 'RUDOLFF · 1525'], ['0', 'BRAHMAGUPTA · 628'], ['∫', 'LEIBNIZ · 1675'],
];
// đường thời gian (c8–c10): cùng thang log với thước ở thẻ mốc
const STOPS = [-30000, -3000, -1700, -300, 628, 820, 1202, 1545, 1585, 1637, 1670, 1806, 1829, 1854, 1874, 1901, 1931, 1936];
const LX0 = 150, LX1 = 1330, LY = 560;
const lx = y => { const a = Math.log(2030 + 30000), b = Math.log(2030 - 1936), v = Math.log(2030 - y); return LX0 + (a - v) / (a - b) * (LX1 - LX0); };

export class ColdOpen {
  init({ tl }) {
    const { L, w } = lookup(tl, 'c0');
    this.T = {
      twelve: w(0, 'twelve'), florence: w(0, 'florence'), banned: w(0, 'banned'),
      cards: CARDS.map(([, , a, b]) => [w(...a), w(...b)]),
      today: L(4).start, textbook: w(4, 'textbook'),
      addition: w(5, 'addition'), derivatives: w(5, 'derivatives'), integrals: w(5, 'integrals'),
      c6: L(6).start, c6e: L(6).end,
      crazy: w(7, 'crazy'), forbidden: w(7, 'forbidden'), meaningless: w(7, 'meaningless'),
      c8: L(8).start, timeline: w(8, 'timeline'), mark: w(8, 'mark'), pocket: w(8, 'pocket'), together: w(8, 'together'),
      turning: w(9, 'turning'), invented: w(9, 'invented'),
      older: w(10, 'older'), end: L(10).end,
    };
    this.END = this.T.end + 1.0;                     // khung đen kín → intro
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'paper');

    // ── phần 1–2: tường ý tưởng bị chê → trang vở (cùng trượt lên khi sang phần 3) ──
    const up = outCubic(prog(t, T.c8 - 0.3, T.c8 + 0.4)) * -1100;
    if (up > -1100) {
      g.save(); g.translate(0, up);
      // Florence 1299: mười chữ số, đóng dấu CẤM
      typed(g, '1299 · FLORENCE', 140, 190, prog(t, T.twelve, T.twelve + 0.7), '800 64px "Archivo"', E.ink);
      const peel = prog(t, T.today, T.today + 0.6);    // "Today": mọi dấu phán xét bong ra, rơi
      for (let d = 0; d < 10; d++) typed(g, String(d), 140 + d * 78, 300, prog(t, T.florence + d * 0.05, T.florence + d * 0.05 + 0.1), 'italic 600 96px "Cormorant Garamond"', E.ink);
      const fallOff = (k, i, draw) => { if (k <= 0) return draw(); g.save(); g.translate(0, outCubic(k) * 1400); g.rotate(k * (hash(i) - 0.5) * 0.8); draw(); g.restore(); };
      fallOff(peel, 9, () => stamp(g, 'BANNED', 520, 268, prog(t, T.banned, T.banned + 0.25), '800 60px "Archivo"', E.accent, { rot: -0.1 }));
      // bốn thẻ: ký hiệu + lời phán
      CARDS.forEach(([sym, verdict], i) => {
        const [a, b] = T.cards[i], x = 140 + i * 420, y = 400, k = prog(t, a - 0.1, a + 0.25);
        if (k <= 0) return;
        const dy = (1 - outCubic(k)) * 120;
        g.save(); g.translate(0, dy);
        g.strokeStyle = E.ink; g.lineWidth = 3; g.strokeRect(x, y, 380, 280);
        g.font = `italic 600 ${sym.length > 4 ? 72 : 96}px "Cormorant Garamond"`; g.fillStyle = E.ink; g.textAlign = 'center'; g.fillText(sym, x + 190, y + 150);
        g.restore();
        fallOff(peel, i, () => stamp(g, verdict, x + 190, y + 225 + dy, prog(t, b, b + 0.25), `800 ${verdict.length > 12 ? 30 : 38}px "Archivo"`, E.accent, { rot: -0.06 + i * 0.03 }));
      });
      // trang vở: dòng kẻ + lề đỏ; phép tính trên CÙNG một dòng kẻ (nét vạch dài của cả video)
      const rule = prog(t, T.textbook - 0.1, T.textbook + 0.6);
      if (rule > 0) {
        g.save(); g.strokeStyle = 'rgba(70,110,160,0.45)'; g.lineWidth = 2;
        for (let r = 0; r < 4; r++) { g.beginPath(); g.moveTo(100, 760 + r * 70); g.lineTo(100 + 1720 * outCubic(rule), 760 + r * 70); g.stroke(); }
        g.strokeStyle = 'rgba(160,50,40,0.55)'; g.beginPath(); g.moveTo(170, 730); g.lineTo(170, 730 + 260 * outCubic(rule)); g.stroke(); g.restore();
      }
      typed(g, '1 + 1 = 2', 220, 820, prog(t, T.addition, T.addition + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'd/dx', 560, 820, prog(t, T.derivatives, T.derivatives + 0.4), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, '∫ f(x) dx', 780, 820, prog(t, T.integrals, T.integrals + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      // "every symbol … inside one particular person's head": mỗi ký hiệu một thẻ tên + năm
      TAGS.forEach(([sym, who], i) => {
        const a = T.c6 + (T.c6e - T.c6) * i / TAGS.length, k = prog(t, a, a + 0.3), x = 1130 + (i % 3) * 250, y = 800 + Math.floor(i / 3) * 110;
        if (k <= 0) return;
        g.save(); g.translate(x, y); g.scale(outBack(k), outBack(k));
        g.font = 'italic 600 60px "Cormorant Garamond"'; g.fillStyle = E.accent; g.textAlign = 'center'; g.fillText(sym, 0, 0);
        g.font = '500 20px "IBM Plex Mono"'; g.fillStyle = E.dim; g.fillText(who, 0, 38); g.restore();
      });
      // crazy · forbidden · meaningless
      // dấu MỚI đóng lại lên ba thẻ cũ, đúng chỗ lời phán vừa bong ra
      [['CRAZY', T.crazy, 330, 625, -0.1], ['FORBIDDEN', T.forbidden, 750, 625, 0.06], ['MEANINGLESS', T.meaningless, 1170, 625, -0.04]]
        .forEach(([s, a, x, y, r]) => stamp(g, s, x, y, prog(t, a, a + 0.25), '800 46px "Archivo"', E.accent, { rot: r }));
      g.restore();
    }

    // ── phần 3: nét vạch dài — từ vạch khắc đầu tiên tới cái máy trong túi ──
    if (t >= T.c8 - 0.1) {
      const k = prog(t, T.timeline - 0.2, T.timeline + 0.9);
      hand(g, seg(LX0, LY, LX1, LY, 60), { w: 4, color: E.ink, jit: 1.2, seed: 3, k });
      // đầu trái: khúc xương có một vạch; đầu phải: điện thoại
      const kb = prog(t, T.mark - 0.1, T.mark + 0.3), kp = prog(t, T.pocket - 0.2, T.pocket + 0.2);
      if (kb > 0) { g.save(); g.translate(LX0 - 10, LY + 70); g.scale(outBack(kb), outBack(kb)); g.fillStyle = '#D9CBAE';
        for (const [x, y, r] of [[-60, -8, 14], [-60, 8, 14], [60, -8, 13], [60, 8, 13]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
        g.fillRect(-60, -9, 120, 18); g.fillStyle = E.ink; g.fillRect(-3, -9, 5, 18); g.restore(); }
      if (kp > 0) { g.save(); g.translate(LX1 + 70, LY); g.scale(outBack(kp), outBack(kp)); g.strokeStyle = E.ink; g.lineWidth = 5;
        g.beginPath(); g.roundRect(-34, -62, 68, 124, 12); g.stroke(); g.fillStyle = E.accent; g.fillRect(-24, -48, 48, 82); g.restore(); }
      // các mốc: vạch khắc trên đường, lần lượt từ trái sang (turning point)
      STOPS.forEach((s, i) => { const a = T.turning + i * 0.06; hand(g, seg(lx(s), LY - 22, lx(s) + 1, LY + 4, 4), { w: 3, color: E.ink, jit: 0.6, seed: i, k: prog(t, a, a + 0.15) }); });
      // "what was invented": vài thứ được phát minh, treo trên mốc của nó
      [['|||', -30000], ['60', -3000], ['0', 628], ['x', 1637], ['∫', 1670], ['i', 1806], ['∞', 1874]].forEach(([s, y], i) => {
        const a = T.invented + i * 0.09; typed(g, s, lx(y), LY - 44 - (i % 2) * 44, prog(t, a, a + 0.1), 'italic 600 40px "Cormorant Garamond"', E.accent, { align: 'center' }); });
      typed(g, '30,000 YEARS AGO', LX0 - 40, LY + 130, k, '500 18px "IBM Plex Mono"', E.dim);
      typed(g, 'TODAY', LX1 + 40, LY + 110, kp, '500 18px "IBM Plex Mono"', E.dim);
      // người dẫn đường mời đi cùng (chỉ dọc nét vạch, về phía quá khứ)
      figure(g, 'point', 1690, 1080, 620, 'paper', prog(t, T.together - 0.2, T.together + 0.15), { flip: true });
    }
    // màn chập khép về vạch đầu tiên ("much older, much simpler") → đen kín trước intro
    iris(g, LX0 - 10, LY + 70, 1 - prog(t, T.older, this.END - 0.15));
  }
}
