// g3 · 100万個に1個の差 (p2, câu 103–108). DNA §1 g3:
//  ① 2003年 · もっと驚く結果 (trái); phân tử cải tiến R-soai-alkynyl bên phải gương (bản gương, viền azure) 「改良した分子」
//  ② はじめのかたより 0.00005% (chữ lớn, `must` = 1 / 2 000 001)
//  ③ hai lưới hạt khổng lồ hai phía gương: 左 100万個 (hổ phách) | 右 100万1個 (azure) — một hạt sáng có vòng bạc 「差は、たった1個」
//  ④ lưới rời xuống; bốn ống 実験 2003 bên phải (SOAI_2003, hằng số nguồn): 最初 → 1回目 57% → 2回目 99% → 3回目 >99.5%,
//     hạt hổ phách thưa dần; bộ đếm lớn bên trái thay số đúng chữ; 超えました: gạch bạc dưới số
//  ⑤ ノーベル委員会: 「もっとも美しい / 実験の一つ」 (明朝, trái) — suzu
import { W, C, MX, JP, SOAI_2003, clamp, prog, lookup, must, outCubic, hash, mk, ground, mirror, write, telop, title,
  measure, arrow, molecule, tube, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// một ô chữ thay phiên (mục cũ trượt lên khỏi dải). items: [[mốc, chữ | null, opts?]] tăng dần.
function slot(g, t, items, x, y, o = {}) {
  let i = -1; for (let j = 0; j < items.length; j++) if (t >= items[j][0]) i = j;
  const size = o.size ?? 44;
  const draw = (it, dy, k) => { const [, s, oo = {}] = it; if (!s) return;
    g.save(); g.beginPath(); g.rect(0, y - size * 1.3, W, size * 1.75); g.clip(); g.translate(0, -dy);
    telop(g, s, x, y, k, { ...o, ...oo }); g.restore(); };
  if (i >= 1) { const e = out(t, items[i][0], 0.35); if (e < 1) draw(items[i - 1], size * 1.7 * e, 1); }
  if (i >= 0) draw(items[i], 0, prog(t, items[i][0], items[i][0] + 0.5));
}
// nhãn 「実験」: khung bạc mảnh (số thí nghiệm — DNA §9)
function tag(g, s, x, y, k) {
  if (k <= 0) return;
  const font = `700 30px ${JP}`, w = measure(g, s, font), e = outCubic(clamp(k * 2));
  g.save(); g.strokeStyle = C.silver; g.lineWidth = 2; g.beginPath(); g.roundRect(x - 12, y - 34, (w + 24) * e, 46, 6); g.stroke(); g.restore();
  write(g, s, x, y, clamp(k * 2 - 0.6), { font });
}

const GW = 720, GH = 520, SP = 6, GY = 290, GXL = 140, GXR = 1000;      // hai lưới hạt (120 × 86 ô mỗi bên)
const ONE = { c: 57, r: 44 };                                             // hạt thứ 100万1 (lưới phải)
const TXR = i => 1100 + i * 180;                                          // bốn ống (phải gương)
const EE = [0.0000005, 0.57, 0.99, 0.995];                                // phần lệch mỗi vòng (hiển thị hạt; số chữ = SOAI_2003)
const LABEL = ['最初', '1回目', '2回目', '3回目'];

function grains(col, seed) {
  const c = mk(GW, GH), x = c.getContext('2d'); x.fillStyle = col;
  for (let r = 0; r < GH / SP; r++) for (let q = 0; q < GW / SP; q++) { x.globalAlpha = 0.25 + 0.5 * hash(r * 131 + q * 7.3 + seed); x.fillRect(q * SP + 1, r * SP + 1, 3.6, 3.6); }
  return c;
}

export default class Hyakuman {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'g3-hyakuman');
    const S = i => L(i).start;
    this.T = {
      y2003: w(103, '2003年'), kairyo: w(103, '改良'), odoroku: w(103, '驚く'),
      l104: S(104), p104: w(104, '0.00005%'),
      l105: S(105), hidari: w(105, '左'), man: w(105, '100万個'), migi: w(105, '右'), man1: w(105, '100万1個'), ikko: w(105, '1個'),
      l106: S(106), sore: w(106, 'それ'), kai: [w(106, '1回目'), w(106, '2回目'), w(107, '3回目')], nums: [w(106, '57%'), w(106, '99%'), w(107, '99.5%')],
      koe: w(107, '超えました'),
      iinkai: w(108, '委員'), utsuku: w(108, '美しい'),
    };
    this.START = S(103);
    this.FROM = Math.max(this.START - 1.2, L(102).end + 0.5);
    must(`'${SOAI_2003.join()}'`, '0.00005,57,99,>99.5');                  // Angew. Chem. 2003 (CONTENT.md) — 3 vòng
    must(`Math.round((1000001 - 1000000) / 2000001 * 100 * 1e5) / 1e5`, 0.00005);   // 0.00005% ↔ 1 hạt / 2 000 001
    must(`${GW / SP * (GH / SP) > 10000}`, true);                           // lưới đủ "khổng lồ" (≥ 1 vạn hạt mỗi bên)
    this.GL = grains(C.L, 1); this.GR = grains(C.R, 2);
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.y2003, 'page'), cue(T.odoroku, 'telop', -4),
      cue(T.l104, 'telop', -6), cue(T.p104, 'telop'),
      cue(T.man, 'crystal', -4), cue(T.ikko, 'telop'),
      ...T.nums.map(a => cue(a, 'tube')), cue(T.koe, 'web99', -4),
      cue(T.iinkai, 'telop', -4), cue(T.utsuku, 'nobel'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    mirror(g);

    // ── ①② 2003 / 0.00005% (trái) + phân tử cải tiến (phải) → rời ở câu 105 ──
    const oA = out(t, T.l105 - 0.3, 0.5);
    if (oA < 1) {
      g.save(); g.translate(-900 * oA, 0);
      telop(g, '2003年', 120, 330, prog(t, T.y2003 - 0.1, T.y2003 + 0.5), { size: 72 });
      telop(g, 'もっと驚く結果', 120, 420, prog(t, T.odoroku, T.odoroku + 0.6), { size: 44, mincho: true });
      tag(g, '実験', 120, 500, prog(t, T.l104 - 0.2, T.l104 + 0.4));        // 0.00005% là số THÍ NGHIỆM
      telop(g, 'はじめのかたより', 120, 570, prog(t, T.l104, T.l104 + 0.6), { size: 40, color: '@dim' });
      telop(g, '0.00005%', 120, 710, prog(t, T.p104 - 0.1, T.p104 + 0.9), { size: 110 });
      g.restore();
      g.save(); g.translate(900 * oA, 0);
      const km = prog(t, T.kairyo - 0.2, T.kairyo + 0.5);
      floorShadow(g, 1380, 220 * km);
      molecule(g, 'R-soai-alkynyl', { x: 1380, y: 520, scale: 50, rot: 0.4 + 0.15 * (t - F), k: km, hideH: true, mirror: true });
      telop(g, '改良した分子', 1380, 800, prog(t, T.kairyo, T.kairyo + 0.5), { size: 40, align: 'center' });
      g.restore();
    }

    // ── ③ hai lưới hạt (câu 105) → rời xuống ở câu 106 ──
    const oG = out(t, T.l106 - 0.3, 0.6);
    if (t > T.l105 - 0.4 && oG < 1) {
      g.save(); g.translate(0, 820 * oG);
      const kL = outCubic(prog(t, T.hidari - 0.1, T.man + 0.6)), kR = outCubic(prog(t, T.migi - 0.1, T.man1 + 0.6));
      if (kL > 0) { g.save(); g.beginPath(); g.rect(GXL + GW * (1 - kL), GY, GW * kL, GH); g.clip(); g.drawImage(this.GL, GXL, GY); g.restore(); }   // lộ ra từ phía gương
      if (kR > 0) { g.save(); g.beginPath(); g.rect(GXR, GY, GW * kR, GH); g.clip(); g.drawImage(this.GR, GXR, GY); g.restore(); }
      telop(g, '左 100万個', GXL, 260, prog(t, T.hidari, T.man + 0.5), { size: 44, color: '@L' });
      telop(g, '右 100万1個', GXR, 260, prog(t, T.migi, T.man1 + 0.5), { size: 44, color: '@R' });
      const kg = prog(t, T.ikko - 0.4, T.ikko + 0.3);
      if (kg > 0) {
        const x = GXR + ONE.c * SP + 2.8, y = GY + ONE.r * SP + 2.8;
        g.save(); g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x, y, 5.5, 0, 7); g.fill();
        g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 22 + 60 * (1 - outCubic(kg)), 0, 7); g.stroke(); g.restore();
        arrow(g, [[1250, 905], [1330, 760], [x + 4, y + 30]], prog(t, T.ikko, T.ikko + 0.5), { color: C.text, w: 3, head: 14 });
      }
      telop(g, '差は、たった1個', GXR, 960, prog(t, T.ikko, T.ikko + 0.6), { size: 52 });
      g.restore();
    }

    // ── ④ bốn ống 実験 2003 (phải) + bộ đếm (trái), câu 106–108 ──
    if (t > T.l106 - 0.5) {
      tag(g, '実験', 1000, 400, prog(t, T.sore - 0.2, T.sore + 0.4));
      for (let i = 0; i < 4; i++) {
        const x = TXR(i), a = i === 0 ? T.sore : T.nums[i - 1], kt = prog(t, a - 0.3, a + 0.3);
        if (kt <= 0) continue;
        floorShadow(g, x, 70 * kt);
        tube(g, x, 800, 300, kt, { fill: 0.6, mix: (1 - EE[i]) / 2, n: 40, seed: 11 + i });
        telop(g, `${SOAI_2003[i]}%`, x, 470, prog(t, a, a + 0.5), { size: 36, align: 'center' });
        telop(g, LABEL[i], x, 890, kt, { size: 28, color: '@dim', align: 'center' });
        if (i > 0) arrow(g, [[x - 140, 640], [x - 90, 585], [x - 40, 640]], kt, { color: C.dim, w: 3, head: 12 });
      }
      slot(g, t, [[T.kai[0], '1回目で'], [T.kai[1], '2回目で'], [T.kai[2], '3回目には']], 120, 560, { size: 44, color: '@dim' });
      slot(g, t, [[T.nums[0], '57%'], [T.kai[1], null], [T.nums[1], '99%'], [T.kai[2], null], [T.nums[2], '>99.5%']], 120, 700, { size: 120 });
      const ku = prog(t, T.koe, T.koe + 0.5);
      if (ku > 0) { g.save(); g.fillStyle = C.silver; g.fillRect(120, 728, measure(g, '>99.5%', `700 120px ${JP}`) * outCubic(ku), 5); g.restore(); }
      telop(g, 'ノーベル委員会', 120, 830, prog(t, T.iinkai - 0.3, T.iinkai + 0.4), { size: 36, color: '@dim' });
      telop(g, 'もっとも美しい', 120, 912, prog(t, T.utsuku - 0.6, T.utsuku + 0.4), { size: 60, mincho: true });
      telop(g, '実験の一つ', 120, 990, prog(t, T.utsuku + 0.3, T.utsuku + 1.0), { size: 60, mincho: true });
    }

    title(g, '100万個に1個の差', t, F + 0.15);
  }
}
