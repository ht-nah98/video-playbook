// f1 · 0.15%の人たち (p2 câu 114–119) — MỞ ACT 5 「代償」, ERA studio (vào từ casino bằng loang ở WIPE).
//  Khối 1000 viên (1 viên = 1 người) rơi vào sau thẻ hồi · 114 「ごく小さな集団」 · 115 ảnh Swrve + 15 viên có đá lam (1.5%) ·
//  116 hai viên vàng to (0.15%) nối tới NỬA chồng xu · 117 cá voi 「クジラ」 · 118 hai viên vàng hóa 「？」 · 119 mọi người chơi miễn phí
//  nhờ nhóm nhỏ. Telop dưới (y 960) đổi theo câu.
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, outBack, ground, heading, actCard, actCue, typeCues, telop as telop0, write,
  capsuleGrid, photoTag, photoImages, gem, glint, rr, CROWD } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 22, oy = 8, col = 'rgba(70,50,40,0.20)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const order = (n, seed) => Array.from({ length: n }, (_, i) => [hash(i * 13.7 + seed * 101.3), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);

function coin(g, x, y, r, k = 1, hi = false) {                 // đồng xu trung tính (không vàng: vàng chỉ cho ★5)
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(1, 0.42);
  shade(g, () => { g.fillStyle = hi ? '#FFFFFF' : '#EFE7D8'; g.beginPath(); g.arc(0, 0, r * outBack(clamp(k)), 0, TAU); g.fill(); }, 8, 4);
  g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? C.ink : '#B9AE98'; g.beginPath(); g.arc(0, 0, r * outBack(clamp(k)), 0, TAU); g.stroke();
  g.restore();
}
function whale(g, x, y, s, k) {                                // cá voi đơn giản, màu trung tính xám-xanh
  if (k <= 0) return;
  const e = outBack(clamp(k)); g.save(); g.translate(x, y + (1 - e) * 80); g.scale(s * e, s * e);
  g.fillStyle = '#9FB0BE'; g.strokeStyle = '#6F8191'; g.lineWidth = 5; g.lineJoin = 'round';
  const q = new Path2D(); q.moveTo(-110, 10); q.bezierCurveTo(-110, -70, 20, -80, 80, -30); q.bezierCurveTo(100, -60, 130, -80, 150, -70);
  q.bezierCurveTo(140, -40, 125, -20, 105, 0); q.bezierCurveTo(125, 20, 140, 40, 150, 70); q.bezierCurveTo(125, 70, 100, 50, 80, 30);
  q.bezierCurveTo(30, 60, -110, 60, -110, 10); q.closePath(); g.fill(q); g.stroke(q);
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(-20, 30, 70, 14, 0.05, 0, TAU); g.fill();
  g.fillStyle = C.ink; g.beginPath(); g.arc(-72, -8, 6, 0, TAU); g.fill();
  g.restore();
}

export default class Whales {
  static ERA = 'studio';
  static IMAGES = photoImages('swrve');
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      l114: L(114).start, shudan: w(114, '集団'),
      l115: L(115).start, n2014: w(115, '2014年'), n15: w(115, '1.5%'),
      l116: L(116).start, hanbun: w(116, '半分'), n015: w(116, '0.15%'),
      l117: L(117).start, kujira: w(117, 'クジラ'),
      l118: L(118).start, wakarimasen: w(118, 'わかりません'),
      l119: L(119).start, muryou: w(119, '無料'), shudan2: w(119, '集団'), haratte: w(119, '払って'), end: L(119).end,
    };
    this.START = L(114).start;
    this.FROM = Math.max(this.START - 2.6, L(113).end + 0.5);
    this.WIPE = [W / 2, 640];
    const P = order(1000, 7).slice(0, 15);
    this.PAY = P; this.WHALE = P.slice(0, 2);
    this.N15 = must('1000 * 0.015', 15);                         // CONTENT: Swrve 1.5% / 0.15% (7/2014: 0.13% → 62%)
    must('1000 * 0.0015', 1.5);
    this.GB = { x: 760, y: 205, w: 1064, h: 695 };
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START), c(this.FROM + 0.5, 'pop'), c(T.shudan, 'pen'), c(T.l115, 'card'), c(T.n15, 'pen'), c(T.n15 + 0.5, 'tick'),
      c(T.hanbun, 'coin'), c(T.n015, 'shimmer'), c(T.n015 + 0.9, 'soroban'), c(T.kujira, 'pen'), c(T.kujira + 0.7, 'pop'),
      c(T.wakarimasen, 'tick'), c(T.muryou, 'pen'), c(T.haratte, 'chip')];
  }
  /** telop dưới: hiện trong [a, b), rơi xuống khi hết. */
  bottom(g, t, parts, a, b, size = 50) {
    if (t < a - 0.1 || t > b + 0.7) return;
    const d = 140 * out(t, b, 0.5);
    g.save(); g.translate(0, d); telop(g, parts, 1292, 960, prog(t, a, a + 0.55), { size }); g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM, GB = this.GB;
    ground(g, t);
    // khối 1000 viên: rơi vào từ FROM + 0.3 (sau thẻ hồi)
    const G = capsuleGrid(g, GB, 1000, 0, prog(t, F + 0.3, F + 1.3), { seed: 1, tones: CROWD });
    write(g, '1つぶ ＝ 1人', GB.x + GB.w, GB.y - 18, prog(t, T.l114, T.l114 + 0.5), { font: `500 34px ${JP}`, color: '@dim', align: 'right' });
    // 15 người trả tiền (115): quầng + đá lam
    const kp = i => prog(t, T.n15 + i * 0.07, T.n15 + 0.35 + i * 0.07);
    this.PAY.forEach((id, i) => {
      const k = kp(i); if (k <= 0) return; const [x, y] = G.pos(id), s = G.cell * 0.95;
      const hg = g.createRadialGradient(x, y, 1, x, y, s * 1.6); hg.addColorStop(0, 'rgba(92,200,230,0.55)'); hg.addColorStop(1, 'rgba(92,200,230,0)');
      g.fillStyle = hg; g.fillRect(x - s * 1.6, y - s * 1.6, s * 3.2, s * 3.2); gem(g, x, y - s * 0.2, s, k);
    });
    // 116: hai viên vàng to
    this.WHALE.forEach((id, j) => {
      const k = prog(t, T.n015 + j * 0.2, T.n015 + 0.5 + j * 0.2); if (k <= 0) return;
      const [x, y] = G.pos(id), q = t > T.wakarimasen ? out(t, T.wakarimasen + j * 0.1, 0.4) : 0;
      { const R = G.r * 3.4, hg = g.createRadialGradient(x, y, R * 0.4, x, y, R * 2.2); hg.addColorStop(0, `rgba(92,200,230,${0.6 * k})`); hg.addColorStop(1, 'rgba(92,200,230,0)');
        g.fillStyle = hg; g.fillRect(x - R * 2.2, y - R * 2.2, R * 4.4, R * 4.4); gem(g, x, y, R * 1.1, k); }
      if (q > 0) write(g, '？', x, y + 24, q, { font: `700 64px ${MIN}`, color: C.ink, align: 'center' });
    });
    // cột trái
    const kh = prog(t, T.l114 + 0.1, T.l114 + 0.9);
    heading(g, 5, '0.15%の人たち', kh);
    if (t > T.shudan - 0.8 && t < T.hanbun + 0.6) { g.save(); g.translate(0, -420 * out(t, T.hanbun - 0.1, 0.5)); telop(g, 'ごく小さな集団', 96, 300, prog(t, T.shudan - 0.6, T.shudan + 0.2), { size: 44, align: 'left' }); g.restore(); }
    // ảnh Swrve (115) rời lên ở 116
    const po = out(t, T.hanbun - 0.2, 0.6);
    if (po < 1 && t > T.l115 - 0.3) { g.save(); g.translate(0, -620 * po);
      photoTag(g, 'swrve', 120, 420, 600, 232, prog(t, T.l115, T.l115 + 0.7), { capSize: 30, zoom: 1 + 0.07 * prog(t, T.l115, T.hanbun), rot: -0.03, focus: [0.5, 0.3] }); g.restore(); }
    // chồng xu: nửa trên thuộc 2 viên vàng (116)
    if (t > T.hanbun - 0.3) {
      const bx = 330, base = 860;
      for (let i = 0; i < 10; i++) coin(g, bx, base - i * 36, 78, prog(t, T.hanbun + i * 0.06, T.hanbun + 0.4 + i * 0.06), i >= 5);
      const kb = prog(t, T.n015 - 0.2, T.n015 + 0.5);
      if (kb > 0) {
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
        g.moveTo(bx + 100, base - 5 * 36 - 22 - 0); g.lineTo(bx + 118, base - 5 * 36 - 22); g.lineTo(bx + 118, base - 10 * 36 + 18); g.lineTo(bx + 100, base - 10 * 36 + 18); g.globalAlpha = kb; g.stroke(); g.restore();
        write(g, '売上の半分', bx - 100, base - 10 * 36 - 40, kb, { font: `700 40px ${MIN}`, align: 'left' });
        // đường nối từ hai viên vàng tới ngoặc
        g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 4; g.globalAlpha = kb;
        this.WHALE.forEach(id => { const [x, y] = G.pos(id); g.beginPath(); g.moveTo(x - G.r * 3.6, y); g.quadraticCurveTo((x + bx) / 2, y - 120, bx + 130, base - 7.5 * 36); g.stroke(); });
        g.restore();
      }
    }
    // cá voi (117): trên chồng xu
    whale(g, 330, 250, 0.8, prog(t, T.kujira - 0.1, T.kujira + 0.5));
    if (t > T.kujira) telop(g, '「クジラ」', 330, 345, prog(t, T.kujira, T.kujira + 0.4), { size: 44 });
    // telop dưới theo câu
    this.bottom(g, t, [['お金を払う人は 約'], ['1.5%', undefined, '@gem']], T.l115, T.hanbun - 0.2);
    this.bottom(g, t, [['売上の半分は 約'], ['0.15%', `700 50px ${MIN}`, '@gold']], T.hanbun, T.l117 - 0.2);
    this.bottom(g, t, '業界は「クジラ」と呼ぶ', T.l117, T.l118 - 0.2);
    this.bottom(g, t, 'どんな人かは、データからはわからない', T.l118, T.l119 - 0.2, 48);
    this.bottom(g, t, '無料で遊べるのは、この小さな集団のおかげ', T.l119, T.end + 0.5, 46);
    actCard(g, t, F, this.START, 5);
  }
}

// tiếng lấp khoảng lặng > 4 s (SFX.md)
const _sfx = Whales.prototype.sfx; Whales.prototype.sfx = function () { return [..._sfx.call(this), ...[610.3, 616.3, 618.6, 635.3].map(t => ({ t, kind: 'tick' }))]; };
