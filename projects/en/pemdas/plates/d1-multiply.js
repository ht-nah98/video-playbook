// ACT THREE mở hồi + "Why multiply before you add" (p2, câu 42–51). Toạ độ THẾ GIỚI: đường chính y = 540.
//   đoạn 0  (x 0)      thẻ ACT THREE; "JUST A CONVENTION?" sơn trên đường; biển PEMDAS ("a little unfair")
//   đoạn 1  (x 2000)   sáu cột biển = sáu cách xếp ^ × + "we could have picked"; cột ^ › × › + được khoanh vàng, CLEVER
//   đoạn 2  (x 4000)   × outranks + (biển × đứng trên biển +)
//   đoạn 3  (x 6000)   đường SẠCH: 3x² + 2x + 1, không ngoặc, ✓
//   đoạn 4  (x 8000)   nếu + đứng trên ×: (3x²) + (2x) + 1 — làn rào ngoặc, biển ( ) khắp nơi, cọc ngổn ngang
//   đoạn 5  (x 10000)  luật phân phối: a(b + c) — một làn tách hai: ab (trên) + ac (dưới), nhập lại
//   đoạn 6  (x 11950)  kiểm bằng số: 2 × (3 + 4) = 2 × 3 + 2 × 4 = 14 — đường thẳng, nối sang cảnh sau
import { clamp, prog, smooth, outCubic, outBack, hash, ROAD, ERA, verge, road, centerLine, paint, sign, car, card,
  actTitle, typed, hand, must, lookup } from '../kit.js';

const Y = 540, S = 2000;
const FX = 10900, FS = 330, FL = 1100, FD = 205;      // ngã tách: bắt đầu, dài đoạn cong, tổng dài, lệch mỗi làn
const off = x => x < FX || x > FX + FL ? 0 : x < FX + FS ? FD * smooth((x - FX) / FS) : x > FX + FL - FS ? FD * smooth((FX + FL - x) / FS) : FD;
const lane = s => g => { g.moveTo(FX, Y); for (let x = FX; x <= FX + FL; x += 10) g.lineTo(x, Y + s * off(x)); };
const MAIN = [g => { g.moveTo(-2000, Y); g.lineTo(FX, Y); }, g => { g.moveTo(FX + FL, Y); g.lineTo(20000, Y); }];
const ROADS = [...MAIN, lane(-1), lane(1)];
const OPS = { '^': 'E', '×': 'MD', '+': 'AS' };
const ORDERS = [['+', '×', '^'], ['×', '^', '+'], ['^', '×', '+'], ['×', '+', '^'], ['^', '+', '×'], ['+', '^', '×']]; // đủ 6 cách; 2 = PEMDAS
const SEGX = [0, 2000, 4000, 6000, 8000, 10080, 12150];

export default class Multiply {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      stopped: w(42, 'stopped'), conv: w(42, 'convention'), unfair: w(42, 'unfair'), pemdas: w(42, 'pemdas'),
      l43: L(43).start, out: w(43, 'out'), rules: w(43, 'rules'), picked: w(43, 'picked'), humanity: w(43, 'humanity'),
      settled: w(43, 'settled'), clever: w(43, 'clever'),
      l44: L(44).start, mul44: w(44, 'multiplication'), outranks: w(44, 'outranks'), add44: w(44, 'addition'),
      l45: L(45).start, poly: w(45, 'polynomials'), three: w(45, 'three'), plus1: w(45, 'plus'), two: w(45, 'two'), plus2: w(45, 'plus', 2), one: w(45, 'one'),
      mul46: w(46, 'multiplication'), add46: w(46, 'addition'), no: w(46, 'no'), clean: w(46, 'clean'), read: w(46, 'read'),
      l47: L(47).start, add47: w(47, 'addition'), outranked: w(47, 'outranked'), mul47: w(47, 'multiplication'), everywhere: w(47, 'everywhere'),
      three48: w(48, 'three'), br1: w(48, 'brackets'), plus48: w(48, 'plus'), two48: w(48, 'two'), br2: w(48, 'brackets', 2),
      plus48b: w(48, 'plus', 2), one48: w(48, 'one'), tiring: w(48, 'tiring'),
      l49: L(49).start, deeper: w(49, 'deeper'), distributive: w(49, 'distributive'),
      a50: w(50, 'a'), bracket50: w(50, 'bracket'), b50: w(50, 'b'), plus50: w(50, 'plus'), c50: w(50, 'c'), equals: w(50, 'equals'),
      ab: w(50, 'a', 2), plus50b: w(50, 'plus', 2), ac: w(50, 'a', 3),
      l51: L(51).start, fits: w(51, 'fits'), law: w(51, 'law'), perfectly: w(51, 'perfectly'), write: w(51, 'write'),
      mirrors: w(51, 'mirrors'), behave: w(51, 'behave'), end: L(51).end,
    };
    this.START = L(42).start; this.FROM = this.START - 2.6;
    // toán trên hình (CONTENT.md: "Phân phối: 2 × (3 + 4) = 2 × 3 + 2 × 4 = 14")
    this.lhs = must('2 × (3 + 4)', 14); this.rhs = must('2 × 3 + 2 × 4', 14);
    const T = this.T, A = [this.FROM, T.l43, T.l44, T.l45, T.l47, T.l49, T.l51], DRIFT = [150, 200, 150, 300, 120, 100, 300];
    this.CAM = [[this.FROM - 1, 0]]; this.CAR = [[this.FROM, 150]];
    A.forEach((a, n) => {
      const next = A[n + 1];
      if (next) {
        this.CAM.push([next - 0.55, SEGX[n] + DRIFT[n]], [next + 0.35, SEGX[n + 1]]);
        if (n === 5) this.CAR.push([T.equals, FX + 20], [next - 0.55, FX + FL * 0.66]);          // tới ngã tách đúng lúc "equals"
        else this.CAR.push([next - 0.55, SEGX[n] + 1700]);
        this.CAR.push([next + 0.35, SEGX[n + 1] + 150]);
      } else { this.CAM.push([T.end + 3, SEGX[n] + DRIFT[n]]); this.CAR.push([T.end + 3, SEGX[n] + 2000]); }
    });
  }
  camX(t) { return keys(this.CAM, t, smooth); }
  carX(t) { return keys(this.CAR, t, x => x); }
  sfx() {
    const T = this.T;
    return [
      { t: T.pemdas, kind: 'pop' }, { t: T.rules, kind: 'pop' }, { t: T.clever, kind: 'correct' }, { t: T.mul44, kind: 'pop' },
      { t: T.plus1, kind: 'tick' }, { t: T.plus2, kind: 'tick' }, { t: T.clean, kind: 'correct' }, { t: T.everywhere, kind: 'pop' },
      { t: T.br1, kind: 'snap' }, { t: T.br2, kind: 'snap' }, { t: T.equals, kind: 'whoosh' }, { t: T.perfectly, kind: 'correct' },
      ...[T.l43, T.l44, T.l45, T.l47, T.l49, T.l51].map(a => ({ t: a - 0.55, kind: 'whoosh' })),
    ];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, ROADS);
    for (const p of ROADS) centerLine(g, p);
    const LBL = 'italic 600 54px "Cormorant Garamond"';

    // ── đoạn 0: "chỉ là quy ước" thì hơi bất công với PEMDAS ──
    paint(g, 'JUST A CONVENTION?', 1000, Y, 92, { k: prog(t, T.stopped - 0.05, T.conv + 0.5) });   // sơn từ "stopped": không khoảng lặng sau thẻ hồi
    typed(g, '…a little unfair', 300, 840, prog(t, T.unfair - 0.1, T.unfair + 0.6), LBL, ROAD.edge);
    plaque(g, 1380, 860, prog(t, T.pemdas - 0.1, T.pemdas + 0.35));

    // ── đoạn 1: mọi cách xếp ta có thể chọn; nhân loại chọn ^ › × › + ──
    ORDERS.forEach((o, i) => {
      const x = S + 330 + i * 250, k0 = T.out + i * 0.22;
      o.forEach((op, j) => sign(g, OPS[op], op, x, 128 + j * 92, op === '^' ? 34 : 32, prog(t, k0 + j * 0.05, k0 + j * 0.05 + 0.35)));
    });
    typed(g, 'every order we could have picked', S + 330, 840, prog(t, T.rules - 0.2, T.picked + 0.4), LBL, ROAD.edge);
    const kr = prog(t, T.settled - 0.3, T.settled + 0.4);
    if (kr > 0) { g.save(); g.strokeStyle = ROAD.gold; g.lineWidth = 7; g.beginPath(); g.roundRect(S + 830 - 70, 70, 140, 300 * outCubic(kr), 22); g.stroke(); g.restore(); }
    paint(g, 'CLEVER', S + 830, Y, 120, { k: prog(t, T.clever - 0.1, T.clever + 0.4), color: ROAD.gold });

    // ── đoạn 2: nhân xếp trên cộng ──
    const s2 = 2 * S;
    row(g, ['×', 'outranks', '+'], s2 + 220, Y, 120, [prog(t, T.mul44 - 0.1, T.mul44 + 0.2), prog(t, T.outranks, T.outranks + 0.4), prog(t, T.add44, T.add44 + 0.2)]);
    sign(g, 'MD', '×', s2 + 1420, 170, 58, prog(t, T.mul44, T.mul44 + 0.35));
    sign(g, 'AS', '+', s2 + 1420, 320, 40, prog(t, T.add44, T.add44 + 0.35));
    typed(g, 'higher', s2 + 1520, 186, prog(t, T.outranks, T.outranks + 0.5), LBL, ROAD.edge);
    typed(g, 'lower', s2 + 1520, 336, prog(t, T.add44 + 0.1, T.add44 + 0.6), LBL, ROAD.edge);

    // ── đoạn 3: đa thức trên đường sạch ──
    const s3 = 3 * S;
    typed(g, 'polynomials', s3 + 200, 830, prog(t, T.poly - 0.1, T.poly + 0.6), LBL, ROAD.edge);
    typed(g, 'what you write all the time in algebra', s3 + 204, 890, prog(t, T.poly + 0.7, T.three - 0.4), '500 24px "IBM Plex Mono"', ERA.road.dim);
    row(g, ['3x²', '+', '2x', '+', '1'], s3 + 420, Y, 120, [prog(t, T.three, T.three + 0.4), prog(t, T.plus1, T.plus1 + 0.15),
      prog(t, T.two, T.two + 0.3), prog(t, T.plus2, T.plus2 + 0.15), prog(t, T.one, T.one + 0.15)]);
    sign(g, 'MD', '×', s3 + 1560, 170, 58, prog(t, T.mul46, T.mul46 + 0.35));
    sign(g, 'AS', '+', s3 + 1560, 320, 40, prog(t, T.add46, T.add46 + 0.35));
    typed(g, 'no brackets at all', s3 + 1040, 860, prog(t, T.no - 0.1, T.no + 0.7), LBL, ROAD.gold);
    tick(g, s3 + 1520, 850, prog(t, T.clean, T.clean + 0.4));

    // ── đoạn 4: nếu cộng đứng trên nhân — ngoặc ở khắp nơi ──
    const s4 = 4 * S;
    sign(g, 'AS', '+', s4 + 1250, 160, 48, prog(t, T.add47, T.add47 + 0.35));
    sign(g, 'MD', '×', s4 + 1250, 316, 46, prog(t, T.mul47, T.mul47 + 0.35));
    typed(g, 'if + outranked ×', s4 + 460, 830, prog(t, T.add47 - 0.1, T.mul47 + 0.6), LBL, ROAD.edge);
    [[1500, 260], [1700, 130], [1880, 280], [1100, 800], [1360, 930], [1560, 790], [1800, 900], [2000, 780]].forEach(([x, y], i) =>
      sign(g, 'P', '( )', s4 + x, y, 34, prog(t, T.everywhere - 0.2 + i * 0.09, T.everywhere + 0.15 + i * 0.09)));
    const toks = row(g, ['(3x²)', '+', '(2x)', '+', '1'], s4 + 360, Y, 92, [prog(t, T.three48, T.three48 + 0.5), prog(t, T.plus48, T.plus48 + 0.15),
      prog(t, T.two48, T.two48 + 0.4), prog(t, T.plus48b, T.plus48b + 0.15), prog(t, T.one48, T.one48 + 0.15)]);
    fence(g, toks[0], prog(t, T.br1 - 0.1, T.br1 + 0.35)); fence(g, toks[2], prog(t, T.br2 - 0.1, T.br2 + 0.35));
    for (let i = 0; i < 10; i++) {                       // cọc ngổn ngang (trắng–than: không phải đỏ, vì không có gì SAI ở đây)
      const k = prog(t, T.tiring + i * 0.05, T.tiring + i * 0.05 + 0.3), x = s4 + 240 + i * 150 + hash(i * 4.1) * 60, y = Y - 66 - hash(i * 2.3) * 46;
      bollard(g, x, y, k);
    }
    typed(g, 'tiring just to look at', s4 + 460, 900, prog(t, T.tiring - 0.1, T.tiring + 0.7), LBL, ROAD.edge);

    // ── đoạn 5: luật phân phối — một làn tách hai rồi nhập lại ──
    const s5 = SEGX[5];
    typed(g, 'the distributive law', s5 + 160, 860, prog(t, T.distributive - 0.1, T.distributive + 0.7), LBL, ROAD.edge);
    paint(g, 'a(b + c)', FX - 560, Y, 92, { k: steps(t, [[T.a50, 1], [T.bracket50, 2], [T.b50, 3], [T.plus50, 5], [T.c50, 8]], 8) });
    paint(g, '=', FX - 10, Y, 92, { k: prog(t, T.equals - 0.05, T.equals + 0.1), gap: false });
    paint(g, 'ab', FX + FL / 2, Y - FD, 92, { k: prog(t, T.ab - 0.05, T.ab + 0.2) });
    sign(g, 'AS', '+', FX + FL / 2, Y, 34, prog(t, T.plus50b - 0.1, T.plus50b + 0.25));
    paint(g, 'ac', FX + FL / 2, Y + FD, 92, { k: prog(t, T.ac - 0.05, T.ac + 0.2) });

    // ── đoạn 6: kiểm bằng số ──
    const s6 = SEGX[6];
    const nums = row(g, ['2 × (3 + 4)', '=', '2 × 3 + 2 × 4', '=', String(this.rhs)], s6 + 330, Y, 72,
      [prog(t, T.l51 + 0.3, T.l51 + 1.1), prog(t, T.fits, T.fits + 0.1), prog(t, T.law - 0.1, T.perfectly), prog(t, T.perfectly, T.perfectly + 0.1), prog(t, T.perfectly + 0.1, T.perfectly + 0.3)],
      i => i === 4 ? ROAD.gold : ROAD.paint);
    if (t > T.mirrors) for (const i of [0, 2]) { const n = nums[i];
      hand(g, [[n.x - n.w / 2, Y + 62], [n.x, Y + 66], [n.x + n.w / 2, Y + 62]], { w: 6, color: ROAD.gold, k: prog(t, T.mirrors + i * 0.15, T.mirrors + i * 0.15 + 0.5), seed: i }); }
    typed(g, 'how we write it', s6 + 330, 830, prog(t, T.write - 0.1, T.write + 0.6), LBL, ROAD.edge);
    typed(g, 'mirrors how it behaves', s6 + 334, 896, prog(t, T.mirrors, T.behave + 0.3), LBL, ROAD.gold);

    // ── xe đọc: một chiếc; ở ngã tách thành hai (mỗi làn một xe "a"), nhập lại sau ──
    const x = this.carX(t), o = off(x);
    if (o > 0.5) for (const s of [-1, 1]) { const a = Math.atan2(s * (off(x + 4) - off(x - 4)), 8); carL(g, x, Y + s * o + 100, a, 'a'); }
    else carL(g, x, Y + 100, 0, x > FX - 1200 && x < FX + FL + 50 ? 'a' : null);
    g.restore();

    actTitle(g, 'road', t, this.START, 'ACT THREE', 'Not an arbitrary choice');
    card(g, 'road', prog(t, T.l44 - 0.6, T.l44 + 0.4), 'ACT THREE · NOT ARBITRARY', 'Why multiply before you add');
  }
}

function keys(K, t, ease) { let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, a] = K[i], [t1, b] = K[i + 1]; return a + (b - a) * ease(clamp((t - t0) / (t1 - t0))); }
/** số ký tự lộ ra theo từng mốc chữ (mỗi mốc: [lúc, số ký tự]) → k ∈ [0,1] */
function steps(t, S, n) { let c = 0; for (const [a, m] of S) if (t >= a) c = m; return c / n; }
/** hàng chữ sơn, mỗi token có k riêng; trả về [{x, w}] để đặt rào / gạch chân */
function row(g, tokens, x, y, size, ks, color = () => ROAD.paint) {
  g.save(); g.font = `800 ${size}px "Archivo"`; const ws = tokens.map(s => g.measureText(s).width); g.restore();
  let cx = x; return tokens.map((s, i) => { const c = cx + ws[i] / 2; paint(g, s, c, y, size, { k: ks[i], color: color(i) }); cx += ws[i] + size * 0.4; return { x: c, w: ws[i] }; });
}
/** xe có chữ trên nóc (giữa hai kính) */
function carL(g, x, y, rot, label) {
  car(g, x, y, rot, { s: 0.75 });
  if (!label) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = ROAD.ink; g.font = '800 38px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(label, -7, 0); g.restore();
}
/** làn rào ngoặc: hai hàng rào than ôm đoạn chữ, dựng dần */
function fence(g, tok, k) {
  if (k <= 0) return; const L = (tok.w + 70) * outCubic(clamp(k)), x0 = tok.x - (tok.w + 70) / 2;
  for (const yy of [Y - 128, Y + 128]) {
    g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 8; g.shadowOffsetY = 5; g.fillStyle = ROAD.P; g.fillRect(x0, yy - 5, L, 10);
    g.shadowColor = 'transparent'; g.fillStyle = '#E9E7DF'; for (let px = x0; px <= x0 + L; px += 36) { g.beginPath(); g.arc(px, yy, 7, 0, 7); g.fill(); }
    g.restore();
  }
}
/** cọc tiêu nhìn từ trên: đĩa trắng viền than */
function bollard(g, x, y, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 8; g.shadowOffsetY = 5;
  g.fillStyle = ROAD.P; g.beginPath(); g.arc(0, 0, 17, 0, 7); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = '#F4F1EA'; g.beginPath(); g.arc(0, 0, 11, 0, 7); g.fill(); g.fillStyle = ROAD.P; g.beginPath(); g.arc(0, 0, 4, 0, 7); g.fill(); g.restore();
}
/** dấu ✓ vẽ tay (font không có ✓) */
function tick(g, x, y, k) { if (k > 0) hand(g, [[x, y], [x + 22, y + 26], [x + 70, y - 40]], { w: 9, color: ROAD.gold, k, seed: 2 }); }
/** biển PEMDAS: bảng chỉ đường tối viền trắng */
function plaque(g, x, y, k) {
  if (k <= 0) return; const p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale(1, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.shadowOffsetY = 12;
  g.fillStyle = '#23262A'; g.beginPath(); g.roundRect(-230, -72, 460, 144, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 5; g.beginPath(); g.roundRect(-218, -60, 436, 120, 9); g.stroke();
  g.fillStyle = ROAD.edge; g.font = '800 92px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PEMDAS', 0, 6); g.restore();
}
