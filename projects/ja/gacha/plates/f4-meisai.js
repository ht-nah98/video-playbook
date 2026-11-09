// f4 · 明細にすると (p2 câu 130–135) — ERA studio. Tờ sao kê giấy nhiệt (kit.receipt) in dài từ trên xuống bên phải, cuộn theo đầu giấy;
//  30 dòng nhỏ (700 / 1300 xen kẽ, tổng 30,000円 = must). Trái: 130 「カードの明細のように」 · 131 một chồng xu 「一度に」 (ít người trả) ·
//  132 chồng tách thành 30 đồng nhỏ · 133 khoanh một dòng 「1行」 · 134 「合計 ≈3万円」 · 135 tờ giấy thu nhỏ cả tờ (dài nhưng từng dòng bé).
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, receipt, rr } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const coin = (g, x, y, r) => { g.save(); g.translate(x, y); g.scale(1, 0.42); g.fillStyle = '#EFE7D8'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#B9AE98'; g.stroke(); g.restore(); };
// giá gói iOS thật (CONTENT / inside-games): 60個=150, 300個=760, 980個=2,200, 1980個=4,500 円; danh sách VÍ DỤ (※例) kéo dài nhiều tháng
const PK = { 150: '60石', 760: '300石', 2200: '980石', 4500: '1980石' };
const LINES = [760, 2200, 760, 4500, 150, 2200, 4500, 760, 2200, 150, 4500, 2200, 4500].map(v => [PK[v], v]);
const RX = 1100, RW = 600, RY = 150, SIZE = 32, LH = SIZE * 1.75, HEAD = 120, TAIL = 150, HFULL = HEAD + LINES.length * LH + TAIL;

export default class Statement {
  static ERA = 'studio';
  init({ tl }) {
    const { L, w } = lookup(tl, 'f4');
    this.T = {
      l130: L(130).start, meisai: w(130, '明細'),
      l131: L(131).start, man: w(131, '3万円'), ichido: w(131, '度'),
      l132: L(132).start, chiisana: w(132, '小さな'), sukoshi: w(132, '少し'),
      l133: L(133).start, gyou: w(133, '1行'), oboete: w(133, '覚えて'),
      l134: L(134).start, goukei: w(134, '合計'), kaimono: w(134, '買い物'),
      l135: L(135).start, wakarete: w(135, '分かれて'), gyou2: w(135, '1行'), ookiku: w(135, '大きく'), end: L(135).end,
    };
    this.START = L(130).start;
    this.FROM = Math.max(this.START - 1.2, L(129).end + 0.5);
    this.TOTAL = must(`${LINES.reduce((a, [, v]) => a + v, 0)}`, 29380);        // ≈ 3万円 (29,000–31,000)
    this.PRINT = [this.FROM + 0.3, this.T.goukei + 0.6];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    const cues = [c(this.FROM + 0.4, 'card'), c(T.meisai, 'pen'), c(T.man, 'pen'), c(T.ichido + 0.3, 'coin'), c(T.sukoshi, 'soroban'), c(T.chiisana + 0.6, 'tick'),
      c(T.gyou, 'pen'), c(T.oboete, 'tick'), c(T.goukei, 'pen'), c(T.goukei + 0.5, 'coin'), c(T.kaimono, 'soroban'), c(T.l135, 'pen'), c(T.ookiku, 'tick')];
    for (let t = this.PRINT[0] + 1.6; t < T.goukei - 0.8; t += 3.2) cues.push(c(t, 'tick'));       // giấy nhiệt in từng dòng
    return cues.sort((a, b) => a.t - b.t);
  }
  /** telop trái: hiện trong [a, b), trượt ra phải khi hết. */
  slot(g, t, parts, a, b, size = 48, y = 470) {
    if (t < a - 0.1 || t > b + 0.7) return;
    g.save(); g.translate(-1300 * out(t, b, 0.55), 0); telop(g, parts, 560, y, prog(t, a, a + 0.55), { size }); g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 5, '明細にすると', prog(t, this.START + 0.1, this.START + 0.9));
    // ── tờ sao kê (phải) ──
    const lin = clamp((t - this.PRINT[0]) / (this.PRINT[1] - this.PRINT[0])), kk = 1 - Math.pow(1 - lin, 1 / 3);     // outCubic(kk) = lin → in đều
    const hNow = Math.max(30, HFULL * lin), sh = Math.min(0, 940 - (RY + hNow));
    const z = outCubic(prog(t, T.l135 - 0.1, T.l135 + 1.1)), s = 1 - 0.58 * z, cx = RX + RW / 2;
    g.save(); g.beginPath(); g.rect(RX - 60, 85, RW + 120, 945); g.clip();
    g.translate(cx, RY); g.scale(s, s); g.translate(-cx, -RY + sh * (1 - z));
    receipt(g, RX, RY, RW, LINES, kk, { expect: this.TOTAL, size: SIZE });
    write(g, '※例', RX + RW - 36, RY + 64, clamp(kk * 4), { font: `700 32px ${JP}`, color: '@dim', align: 'right' });
    // khoanh một dòng (133): dòng thứ 7
    const kr = prog(t, T.gyou - 0.1, T.gyou + 0.5);
    if (kr > 0) { const yy = RY + HEAD + 6 * LH + SIZE * 0.6; g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.ellipse(cx, yy - 11, (RW / 2 - 14) * outCubic(kr), 30, 0, 0, TAU); g.stroke(); g.restore(); }
    g.restore();
    // ── cột trái ──
    this.slot(g, t, 'カードの明細のように', T.l130, T.l131 - 0.2, 48);
    this.slot(g, t, [['3万円を '], ['一度に', undefined, '@dim'], ['払う人は少ない']], T.l131, T.l132 - 0.2, 46);
    this.slot(g, t, '小さなパックを、少しずつ', T.l132, T.l133 - 0.2, 48);
    this.slot(g, t, '1行は、覚えるほどの金額ではない', T.l133, T.l134 - 0.2, 44);
    if (t > T.l134 - 0.1 && t < T.l135 - 0.2 + 0.7) {
      g.save(); g.translate(-1300 * out(t, T.l135 - 0.2, 0.55), 0);
      telop(g, [['合計 ≈ '], ['3万円', `700 70px ${MIN}`]], 560, 470, prog(t, T.goukei - 0.1, T.goukei + 0.6), { size: 56 }); g.restore();
    }
    this.slot(g, t, 'どの1行も、立ち止まる大きさではない', T.l135, T.end + 1, 42);
    // xu: chồng 一度に (131) → tách thành 30 đồng nhỏ (132)
    if (t > T.l131 - 0.2) {
      const sp = prog(t, T.sukoshi - 0.1, T.sukoshi + 0.9), stack = 1 - out(t, T.l134 - 0.2, 0.6);
      for (let c = 29; c >= 0; c--) {
        const k = prog(t, T.man + c * 0.02, T.man + 0.35 + c * 0.02), m = outCubic(clamp((sp * 1.2) - c * 0.012));
        const sx = 330, sy = 900 - c * 9, ex = 150 + (c % 15) * 56, ey = 900 - Math.floor(c / 15) * 40;
        if (k <= 0) continue; const e = outCubic(m);
        coin(g, sx + (ex - sx) * e, sy + (ey - sy) * e - 90 * Math.sin(Math.PI * e) - (1 - k) * 120, 26 * (1 - 0.15 * e));
      }
      if (sp < 0.2) write(g, '一度に', 330, 960, prog(t, T.ichido, T.ichido + 0.4), { font: `700 38px ${JP}`, color: '@dim', align: 'center' });
    }
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Statement.prototype.sfx; Statement.prototype.sfx = function () { return [..._sfx.call(this), ...[722.0].map(t => ({ t, kind: 'tick' }))]; };
