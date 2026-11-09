// f5 · 手で持てるものに換算する (p2 câu 136–139) — ERA studio.
//  136 30 hộp cơm trưa (1000円 × 30回 = 3万円, must) · 137 30 ô tháng = 2年半 (月1000円 × 30か月 = 2.5 năm, must) ·
//  138 cùng số tiền hiện trong game: 「≈ 3万円」 ↔ 「14,400石」 · 139 con số 石 mờ đi, hiện 「？」 — 大きさを感じにくい.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, gem, rr, comma, CROWD, tone } from '../kit.js';

const shade = (g, fn, blur = 20, oy = 8, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
function bento(g, x, y, k, i) {                                     // hộp cơm trưa: hai ngăn + một chấm pastel
  if (k <= 0) return; const e = outBack(clamp(k)), w = 70 * e, h = 52 * e;
  shade(g, () => { g.fillStyle = '#FFFFFF'; g.fill(rr(x - w / 2, y - h / 2, w, h, 10 * e)); }, 8, 3);
  g.strokeStyle = 'rgba(92,86,72,0.35)'; g.lineWidth = 2; g.stroke(rr(x - w / 2, y - h / 2, w, h, 10 * e));
  g.beginPath(); g.moveTo(x + w * 0.1, y - h / 2 + 4 * e); g.lineTo(x + w * 0.1, y + h / 2 - 4 * e); g.stroke();
  const tn = tone(['@sky', '@mint'][i % 2]); g.fillStyle = tn.mid; g.beginPath(); g.arc(x - w * 0.22, y, 9 * e, 0, TAU); g.fill();
  g.fillStyle = '#F2C9A6'; g.beginPath(); g.arc(x + w * 0.3, y, 7 * e, 0, TAU); g.fill();
}
function tile(g, x, y, k, empty = false) {                          // ô tháng
  if (k <= 0) return; const e = outBack(clamp(k)), s = 56 * e;
  if (empty) { g.save(); g.setLineDash([6, 6]); g.strokeStyle = 'rgba(92,86,72,0.4)'; g.lineWidth = 2; g.stroke(rr(x - 28, y - 28, 56, 56, 10)); g.restore(); return; }
  shade(g, () => { g.fillStyle = '#FFFFFF'; g.fill(rr(x - s / 2, y - s / 2, s, s, 10 * e)); }, 8, 3);
  g.fillStyle = tone('@sky').mid; g.fill(rr(x - s / 2, y - s / 2, s, 12 * e, [10 * e, 10 * e, 0, 0]));
  g.strokeStyle = 'rgba(92,86,72,0.3)'; g.lineWidth = 2; g.stroke(rr(x - s / 2, y - s / 2, s, s, 10 * e));
}

export default class Convert {
  static ERA = 'studio';
  init({ tl }) {
    const { L, w } = lookup(tl, 'f5');
    this.T = {
      l136: L(136).start, man: w(136, '3万円'), lunch: w(136, 'ランチ'), n1000: w(136, '1000円'), n30: w(136, '30回'),
      l137: L(137).start, getsu: w(137, '月'), douga: w(137, '動画'), nen: w(137, '2年半'),
      l138: L(138).start, naka: w(138, '中'), onaji: w(138, '同じ'), ishi: w(138, '石'), kazu: w(138, '数'), hyouji: w(138, '表示'),
      l139: L(139).start, ishi2: w(139, '石'), kanji: w(139, '感じにくい'), end: L(139).end,
    };
    this.START = L(136).start;
    this.FROM = Math.max(this.START - 1.2, L(135).end + 0.5);
    must('30000 / 1000', 30);                                       // 3万円 = 30 bữa × 1000円
    must('30000 / 1000 / 12', 2.5);                                 // 30 tháng × 1000円 = 2 năm rưỡi
    must('Math.round(90 * 160)', 14400);                            // 石 14,400 ≈ 3万円 (CONTENT)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'card'), c(T.man, 'pen'), c(T.lunch + 0.1, 'pop'), c(T.n1000, 'coin'), c(T.n30 - 0.5, 'tick'), c(T.n30 + 0.5, 'tick'), c(T.n30 + 1.2, 'pop'),
      c(T.getsu, 'pen'), c(T.douga, 'pop'), c(T.nen - 1.0, 'tick'), c(T.nen, 'pen'), c(T.nen + 1.2, 'tick'),
      c(T.naka, 'pen'), c(T.ishi, 'pop'), c(T.kazu, 'tick'), c(T.hyouji + 0.2, 'soroban'), c(T.ishi2, 'pen'), c(T.kanji, 'tick')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 5, '手で持てるものに換算する', prog(t, this.START + 0.1, this.START + 0.9));
    // ── hàng trên: 30 hộp cơm | 30 ô tháng ──
    const LX = 118, LY = 385, RX = 1060, RY = 385;
    telop(g, [['3万円 ＝ '], ['ランチ', undefined], [' 1000円 × 30回']], 500, 300, prog(t, F + 0.3, T.n30 + 0.4), { size: 44 });
    for (let i = 0; i < 30; i++) bento(g, LX + 36 + (i % 10) * 82, LY + Math.floor(i / 10) * 74, prog(t, T.lunch + i * 0.05, T.lunch + 0.35 + i * 0.05), i);
    if (t > T.getsu - 0.3) {
      telop(g, [['月1000円 × 30か月 ＝ '], ['2年半', `700 46px ${JP}`]], 1400, 300, prog(t, T.getsu - 0.1, T.nen + 0.4), { size: 40 });
      ['1年目', '2年目', '3年目'].forEach((s, r) => write(g, s, RX - 20, RY + r * 74 + 10, prog(t, T.douga + r * 0.15, T.douga + 0.5 + r * 0.15), { font: `600 28px ${JP}`, color: '@dim', align: 'right' }));
      for (let i = 0; i < 36; i++) { const x = RX + 14 + (i % 12) * 64, y = RY + Math.floor(i / 12) * 74; tile(g, x, y, prog(t, T.douga + i * 0.06, T.douga + 0.35 + i * 0.06), i >= 30); }
    }
    // ── hàng dưới: cùng số tiền trong game ──
    if (t > T.naka - 0.4) {
      const k = prog(t, T.naka - 0.2, T.onaji + 0.6), fade = prog(t, T.kanji - 0.1, T.kanji + 0.8);
      shade(g, () => { g.fillStyle = C.white; g.fill(rr(130, 665, 760, 290, 32)); }, 28, 10); shade(g, () => { g.fillStyle = C.white; g.fill(rr(1030, 665, 760, 290, 32)); }, 28, 10);
      write(g, [['≈ ', `700 90px ${JP}`], ['3万円', `700 120px ${MIN}`]], 510, 830, prog(t, T.onaji - 0.1, T.onaji + 0.6), { align: 'center' });
      write(g, 'ランチ30回分', 510, 905, prog(t, T.onaji, T.onaji + 0.6), { font: `500 36px ${JP}`, color: '@dim', align: 'center' });
      write(g, '＝', 960, 830, k, { font: `700 90px ${JP}`, align: 'center' });
      const ks = prog(t, T.ishi - 0.1, T.kazu + 0.5);
      [[1290, 770, 60], [1380, 790, 46], [1210, 800, 44], [1460, 770, 38], [1330, 730, 40]].forEach(([x, y, s], i) => gem(g, x, y, s * (1 - 0.3 * fade), prog(t, T.ishi + i * 0.08, T.ishi + 0.4 + i * 0.08)));
      write(g, [[comma(14400), `700 90px ${MIN}`, '@gem'], ['石', `700 70px ${JP}`, '@gem']], 1410, 900, prog(t, T.ishi - 0.3, T.ishi + 0.4), { align: 'center' });
      if (fade > 0) {
        g.save(); g.globalAlpha = 0.86 * fade; g.fillStyle = '#EDE7DD'; g.fill(rr(1030, 665, 760, 290, 32)); g.restore();
        write(g, '？', 1410, 850, fade, { font: `700 190px ${MIN}`, color: '@dim', align: 'center' });
      }
    }
    if (t > T.kanji - 0.3) telop(g, '石の数では、お金の大きさが見えない', 1410, 608, prog(t, T.kanji - 0.2, T.kanji + 0.5), { size: 40 });
  }
}
