// d4 · 100兆桁の先へ (p2 câu 103–107). DNA d4: chữ số π khắc theo xoắn ốc ra ngoài; ba mốc: 金田康正 2002「1兆桁超」·
// 近藤茂 2011「10兆桁」· 岩尾エマはるか 2022「100兆桁」 (chữ, KHÔNG ảnh — người còn sống); 「くり返しは現れない」.
// 103 vành (trái) + π son giữa vành; chữ số π (tính bằng Machin trong code, khớp PI_DIGITS) khắc chạy theo xoắn ốc ra
//     ngoài suốt cảnh · 「それでも、計算は続く」
// 104–106 cột phải: trục thời gian đồng thau, ba hàng năm · tên · nơi · thanh đồng dài TỈ LỆ THẬT với số chữ số
//     (1兆 : 10兆 : 100兆 = 1 : 10 : 100, must) + nhãn số chữ số
// 107 「くり返しは決して現れない」 + 「もう証明されている」 (taiko: chốt hồi 3)
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, sk, typeCues,
  ground, ring360, engrave, telop, heading, bead, PI_DIGITS } from '../kit.js';

const RX = 600, RY = 600, RR = 190;
const ND = 560;                                         // số chữ số khắc trên xoắn ốc

// π bằng công thức Machin (số nguyên lớn) — giống kit, nhiều chữ số hơn PI_DIGITS
function machin(n) {
  const S = 10n ** BigInt(n + 10), at = x => { let s = 0n, t = S / x, k = 1n, sg = 1n; const x2 = x * x;
    while (t) { s += sg * t / k; t /= x2; k += 2n; sg = -sg; } return s; };
  const p = (16n * at(5n) - 4n * at(239n)) / 10n ** 10n, d = p.toString(); return d[0] + '.' + d.slice(1, n + 1);
}

// ba kỷ lục (CONTENT.md: 金田 2002 ≈ 1.24兆 → 「1兆桁超」, 近藤 10/2011 10兆, 岩尾 2022 100兆)
const REC = [
  { year: 2002, name: '金田康正', sub: '東京大学 ・ 何度も世界記録', digits: 1e12, label: [['1', 'n'], ['兆桁', 'k'], ['超', 'k']] },
  { year: 2011, name: '近藤茂', sub: '長野県の会社員 ・ 自宅のパソコン', digits: 1e13, label: [['10', 'n'], ['兆桁', 'k']] },
  { year: 2022, name: '岩尾エマはるか', sub: '', digits: 1e14, label: [['100', 'n'], ['兆桁', 'k']] },
];
const BAR = 520;                                        // thanh của 100兆桁

export default class Records {
  static ERA = 'tenkyu';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd4');
    this.T = {
      l103: L(103).start, hito: w(103, '人'), keisan: w(103, '計算'), tsuzu: w(103, '続けて'),
      toukyou: w(104, '東京'), kanada: w(104, '金田康正'), sekai: w(104, '世界'), y2002: w(104, '2002'), itchou: w(104, '1兆'), koe: w(104, '超えました'),
      nagano: w(105, '長野'), kondou: w(105, '近藤茂'), america: w(105, 'アメリカ'), jitaku: w(105, '自宅'), pc: w(105, 'パソコン'), j10: w(105, '10'), keisan105: w(105, '計算'),
      y2022: w(106, '2022'), iwao: w(106, '岩尾'), h100: w(106, '100'), touta: w(106, '到達'),
      kuri: w(107, 'くり返し'), kesshite: w(107, '決して'), arawa: w(107, '現れません'), mou: w(107, 'もう'), shou: w(107, '証明'), end: L(107).end,
    };
    this.START = L(103).start;
    this.FROM = Math.max(this.START - 1.2, L(102).end + 0.5);
    const T = this.T;
    // chữ số: Machin, kiểm tiền tố với PI_DIGITS của kit
    const D = machin(ND);
    must(`${JSON.stringify(D.slice(0, PI_DIGITS.length))} === ${JSON.stringify(PI_DIGITS)}`, true);
    this.DIG = D.slice(2);
    // xoắn ốc Archimedes: mỗi chữ cách 15 px theo cung, mỗi vòng ra ngoài 24 px
    const r0 = RR + 21 + 30 + 22; this.SP = [];
    let th = 0;
    for (let i = 0; i < ND; i++) { const r = r0 + 24 * th / TAU; this.SP.push([th, r]); th += 15 / r; }
    must(`${Math.round(this.SP.at(-1)[1])} <= 380`, true);                 // không chạm tiêu đề / mép trên
    // năm, tỉ lệ thanh
    this.REC = REC.map(r => ({ ...r, y: String(must(String(r.year), r.year)), len: BAR * must(`${r.digits} / 1e14`, r.digits / 1e14) }));
    must('1e12 * 10', 1e13); must('1e13 * 10', 1e14);
    this.ROW = [
      { a: T.toukyou, name: T.kanada, year: T.y2002, bar: T.itchou, sub2: T.sekai },
      { a: T.nagano, name: T.kondou, year: T.kondou + 0.5, bar: T.j10, sub2: T.jitaku },
      { a: T.y2022, name: T.iwao, year: T.y2022, bar: T.h100, sub2: null },
    ];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.hito, 'tick'), c(T.keisan, 'soroban'),
      c(T.toukyou, 'tick'), c(T.kanada, 'tick'), ...typeCues(this.REC[0].y, T.y2002, T.y2002 + 0.5), c(T.itchou, 'soroban'),
      c(T.nagano, 'tick'), c(T.kondou, 'tick'), ...typeCues(this.REC[1].y, T.kondou + 0.5, T.kondou + 1.0), c(T.jitaku, 'tick'), c(T.j10, 'soroban'),
      ...typeCues(this.REC[2].y, T.y2022, T.y2022 + 0.5), c(T.iwao, 'tick'), c(T.h100, 'soroban'), c(T.touta, 'tick'),
      c(T.kuri, 'tick'), c(T.shou, 'taiko'),
    ];
  }
  render(g, t) {
    const T = this.T, F0 = this.FROM + 0.3;
    ground(g, Records.ERA, t);
    heading(g, '第三幕　円周率は、なぜ終わらないのか', '100兆桁の先へ', prog(t, F0, F0 + 1.4));

    // ── vành + π son + chữ số xoắn ốc ──
    const rot = t * 0.03;
    ring360(g, RX, RY, RR, prog(t, F0, F0 + 1.2), { rot });
    engrave(g, 'π', RX, RY + 52, prog(t, F0 + 0.6, F0 + 1.1), `600 150px ${CG}`, C.shu, { align: 'center', spark: false });
    // từ FROM: 40 chữ số đã khắc; chạy chậm, tăng tốc ở 「計算」, tới hết vào câu cuối
    const kd = 0.07 + 0.18 * prog(t, F0, T.keisan) + 0.75 * prog(t, T.keisan, T.arawa);
    const n = Math.round(ND * clamp(kd) * outCubic(prog(t, F0, F0 + 0.8)));
    g.save(); g.font = `500 20px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
      const [th, r] = this.SP[i], a = Math.PI / 2 - th + rot * 0.5, fresh = i > n - 4;
      g.save(); g.translate(RX + r * Math.cos(a), RY - r * Math.sin(a)); g.rotate(Math.PI / 2 - a);
      g.fillStyle = fresh ? C.brassHi : (i % 10 === 9 ? C.brass : C.ivory); g.fillText(this.DIG[i], 0, 0); g.restore();
    }
    g.restore();

    // ── 103 ──
    telop(g, [['それでも、', `700 34px ${MIN}`, C.dim], ['計算は続く', `700 42px ${MIN}`, C.ivory]], 1102, 236, prog(t, T.hito - 0.2, T.tsuzu + 0.4), { size: 42, ls: 3 });

    // ── 104–106: trục thời gian + ba kỷ lục ──
    const ax = 1060, y0s = [370, 570, 770];
    const kax = prog(t, T.toukyou - 0.3, T.h100);
    if (kax > 0) { g.save(); g.strokeStyle = 'rgba(217,164,65,0.6)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(ax, y0s[0] - 40); g.lineTo(ax, y0s[0] - 40 + (y0s[2] + 100 - y0s[0] + 40) * outCubic(kax)); g.stroke(); g.restore(); }
    this.REC.forEach((r, i) => {
      const R = this.ROW[i], y0 = y0s[i], x = 1090;
      bead(g, ax, y0 - 16, 6, prog(t, R.a - 0.2, R.a + 0.2));
      engrave(g, [[r.y, `600 52px ${CG}`, C.brassHi], ['年', `700 28px ${MIN}`, C.ivory]], x, y0, prog(t, R.year, R.year + 0.5));
      engrave(g, r.name, x + 170, y0, prog(t, R.name - 0.1, R.name + 0.6), `700 42px ${MIN}`, C.ivory, { ls: 3 });
      if (r.sub) {
        const [s1, s2] = r.sub.split(' ・ ');
        const f = `500 28px ${JP}`, r1 = engrave(g, s1, x + 172, y0 + 46, prog(t, R.a, R.a + 0.6), f, C.dim, { ls: 3, spark: false });
        if (s2) engrave(g, '・ ' + s2, x + 172 + r1.w + 12, y0 + 46, prog(t, R.sub2, R.sub2 + 0.6), f, C.dim, { ls: 3, spark: false });
      }
      // thanh đồng tỉ lệ thật + nhãn số chữ số
      const kb = outCubic(prog(t, R.bar - 0.1, R.bar + 0.4 + 0.5 * i)), by = y0 + 82;
      if (kb > 0) {
        const L = Math.max(3, r.len * kb), gr = g.createLinearGradient(0, by - 7, 0, by + 7);
        gr.addColorStop(0, C.brassHi); gr.addColorStop(0.5, C.brass); gr.addColorStop(1, C.brassLo);
        g.save(); g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(x + 4, by - 3, L, 14); g.fillStyle = gr; g.fillRect(x, by - 7, L, 14); g.restore();
        bead(g, x + L, by, 6, prog(t, R.bar - 0.1, R.bar + 0.3));                 // hạt ở đầu thanh: thanh 1兆桁 chỉ ~5 px vẫn thấy
        const parts = r.label.map(([s, f]) => [s, f === 'n' ? `600 50px ${CG}` : `700 32px ${MIN}`, f === 'n' ? C.brassHi : C.ivory]);
        engrave(g, parts, x + Math.max(3, r.len) + 26, by + 15, prog(t, R.bar, R.bar + 0.6));
      }
    });

    // ── 107 ──
    telop(g, [['くり返しは', `700 38px ${MIN}`, C.ivory], ['決して現れない', `700 46px ${MIN}`, C.brassHi]], 1112, 940, prog(t, T.kuri - 0.1, T.arawa + 0.5), { size: 46, ls: 3 });
    engrave(g, 'もう証明されている', 1800, 1005, prog(t, T.mou, T.shou + 0.6), `700 30px ${MIN}`, C.brass, { align: 'right', ls: 4 });
  }
}
