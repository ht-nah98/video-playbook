// f1 · まとめ (p2 câu 130–140) — mở HỒI 5. Thẻ hồi「第五幕 まとめ」; 天球儀 lắp dần: vành 360 (vật xuyên suốt) ở trái,
// mỗi đáp án là MỘT vòng nghiêng đồng thau quấn quanh vành (極限 · 回転 · 無理数・超越数 · 平らな空間), nối dây dẫn ra
// テロップ cột phải. Lòng vành vẽ lại THU NHỎ hình của từng hồi (lướt ngang trong lòng vành, đổi theo câu):
//  π？ + đường kính (測り方 ≠ 正体) → đa giác 6 → 96 (hồi 1) → kim quay + nửa vòng son = π (hồi 2) → chữ số π xoắn
//  (hồi 3; 1761 / 1882, 判子「証明」) → hình tròn ↔ hình vuông thép không khép (円積問題) → mặt phẳng → mặt cầu (hồi 4)
//  → π son giữa thiên cầu đủ bốn vòng; câu gộp「平らな幾何学が、回転について語る言葉」(taiko); cột phải nhường chỗ cho
//  bốn lĩnh vực 統計 · 量子力学 · 確率 · 数論 (vành nhỏ + π).
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, sk,
  ground, ring360, circleLine, arcShu, needle, polyIn, polyOut, drawPoly, gap, engrave, telop, heading, leader,
  stamp, actCard, PI_DIGITS } from '../kit.js';

const CX = 640, CY = 600, R = 220;                           // vành chính (thế giới = màn hình, không camera)
const OR = 300;                                              // bán kính các vòng nghiêng (ngay ngoài dải đồng r1 = 279)
// vòng nghiêng của 天球儀: [tỉ lệ trục ngắn, góc xoay] — đầu mút phải xếp từ trên xuống theo thứ tự hồi
const ORB = [[0.30, -0.62], [0.45, -0.15], [0.30, 0.32], [0.50, 0.85]];
const RX = 1110, RY = [320, 480, 640, 800];                  // cột テロップ phải: x, baseline từng hàng
const ACTS = ['第一幕', '第二幕', '第三幕', '第四幕'];
const ANS = ['極限', '回転のものさし', '無理数・超越数', '平らな空間の定数'];
const NG = [6, 12, 24, 48, 96];
const FIELDS = [['統計', 1110, 520], ['量子力学', 1470, 520], ['確率', 1110, 690], ['数論', 1470, 690]];
const HOLE = '#0B1638';
const ALL_W = 3.5, ALL_A = 0.6;                               // câu gộp: bề dày / độ đậm tối đa của vòng nghiêng                                      // lỗ chữ của 判子 trên nền trời (chàm)

const pt = (q, rot, th) => {                                 // điểm trên vòng nghiêng (tham số th, toạ độ màn hình)
  const x = OR * Math.cos(th), y = q * OR * Math.sin(th);
  return [CX + x * Math.cos(rot) - y * Math.sin(rot), CY + x * Math.sin(rot) + y * Math.cos(rot)];
};
/** Vòng nghiêng đồng thau: k = vẽ dần từ đầu mút phải; lit = sáng (đúng câu); all = câu gộp (cả bốn sáng nhưng MẢNH,
 *  vòng sau mờ hơn — bốn vòng dày 6.5px chồng nhau thành búi rối); i = thứ tự vòng. */
function orbit(g, q, rot, k, lit, all = 0, i = 0) {
  if (k <= 0) return;
  const e = TAU * outCubic(clamp(k));
  g.save(); g.translate(CX, CY); g.rotate(rot); g.lineCap = 'round';
  const path = () => { g.beginPath(); g.ellipse(0, 0, OR, q * OR, 0, 0, e); };
  const mix = (a, b) => a + (b - a) * all;
  const lw = mix(5 + 1.5 * lit, ALL_W - 0.4 * i), al = mix(0.75 + 0.25 * lit, ALL_A - 0.1 * i);
  g.strokeStyle = 'rgba(0,0,0,0.5)'; g.globalAlpha = mix(1, al); g.lineWidth = lw + 3; g.translate(0, 3); path(); g.stroke(); g.translate(0, -3);
  g.strokeStyle = lit > 0.5 ? C.brass : C.brassLo; g.globalAlpha = al; g.lineWidth = lw; path(); g.stroke();
  g.strokeStyle = C.brassHi; g.globalAlpha = mix(0.25 + 0.55 * lit, 0.45 - 0.08 * i); g.lineWidth = 1.2; path(); g.stroke();
  g.restore();
}

export default class Summary {
  static ERA = 'tenkyu';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    const S = i => L(i).start;
    this.T = {
      en130: w(130, '円周'), nani: w(130, '何'),
      en131: w(131, '円周'), chokkei: w(131, '直径'), watta: w(131, '割った'), hakari: w(131, '測り方で'), shoutai: w(131, '正体'),
      l132: S(132), kyokugen: w(132, '極限'), hen: w(132, '辺'), fuyashita: w(132, '増やした'), takakkei: w(132, '多角形'),
      tadori: w(132, 'たどり着く'), massugu: w(132, 'まっすぐ'), kyokusen: w(132, '曲線'), sakaime: w(132, '境目'),
      l133: S(133), kaiten: w(133, '回転'), hankei: w(133, '半径'), han: w(133, '半'), kaiten2: w(133, '回転', 2), e133: L(133).end,
      l134: S(134), muri: w(134, '無理'), choetsu: w(134, '超越'),
      y1761: w(135, '1761'), y1882: w(135, '1882'), shoumei: w(135, '証明'),
      l136: S(136), en136: w(136, '円'), menseki: w(136, '面積'), sei: w(136, '正'), houkei: w(136, '方形'), jougi: w(136, '定規'),
      sakuzu: w(136, '作図'),
      l137: S(137), taira: w(137, '平ら'), teisuu: w(137, '定数'), magare: w(137, '曲がれ'), shitagai: w(137, '従いません'),
      l138: S(138), subete: w(138, 'すべて'), en138: w(138, '円周'), kataru: w(138, '語る'), kotoba: w(138, '言葉'),
      uchuu: w(139, '宇宙'), taira139: w(139, '平ら'), hataraki: w(139, '働き'), yoku: w(139, 'よく'),
      l140: S(140), kankei: w(140, '関係'), arawa: w(140, '現れます'),
      f: [w(140, '統計'), w(140, '量子'), w(140, '確率'), w(140, '数論')],
    };
    this.START = S(130);
    this.FROM = Math.max(this.START - 2.6, L(129).end + 0.5);
    const T = this.T;
    // lòng vành: chặng [vào, ra] — lướt ngang trong lòng vành
    this.SL = [[this.FROM, T.l132 - 0.3], [T.l132 - 0.3, T.l133 - 0.3], [T.l133 - 0.3, T.l134 - 0.3], [T.l134 - 0.3, T.l136 - 0.2],
      [T.l136 - 0.2, T.l137 - 0.3], [T.l137 - 0.3, T.l138 - 0.3], [T.l138 - 0.3, Infinity]];
    // các vòng: lúc mọc (câu của đáp án) và lúc hết "đúng câu"
    this.ON = [T.kyokugen, T.kaiten, T.muri, T.taira];
    this.OFF = [T.l133, T.l134, T.l137, T.l138];
    // toán trên hình
    NG.forEach((n, i) => must(`${n}`, 6 * 2 ** i));
    must(`Math.round(96 * Math.sin(Math.PI / 96) * 1e4) / 1e4`, 3.141);              // 96 giác: chu vi/đường kính ≈ π (hồi 1)
    must('2 * Math.PI * 1 / 2', Math.PI);                                           // nửa vòng, bán kính 1 = π
    this.RHO = 120; this.SIDE = this.RHO * Math.sqrt(Math.PI);                       // 円積問題: cạnh vuông = ρ√π (không dựng được)
    must(`${this.SIDE} ** 2`, Math.PI * this.RHO ** 2);
    must('1761 < 1882', true);
    must(`${ALL_W} <= 3.5 && ${ALL_A} <= 0.6`, true);
    must(`${PI_DIGITS.slice(0, 6)}`, 3.1415);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(this.FROM + 0.35, 'hyoshigi'),                                              // thẻ hồi (sau tiếng chuyển cảnh)
      c(T.en130, 'tick'), c(T.nani, 'question'),
      c(T.en131, 'pen'), c(T.watta, 'tick'), c(T.hakari, 'tick'), c(T.shoutai, 'tick'),
      c(T.kyokugen, 'tick'), c(T.fuyashita, 'soroban'), c(T.tadori, 'soroban'), c(T.massugu, 'tick'),
      c(T.kaiten, 'tick'), c(T.hankei, 'tick'), c(T.han, 'pen'),
      c(T.muri, 'tick'), c(T.muri + 0.6, 'soroban'),
      c(T.y1761, 'tick'), c(T.y1882, 'tick'), c(T.shoumei, 'hanko'),
      c(T.en136, 'pen'), c(T.sei, 'pen'), c(T.sakuzu, 'tick'),
      c(T.taira, 'tick'), c(T.magare, 'pen'),
      c(T.subete, 'tick'), c(T.kotoba, 'taiko'),
      c(T.uchuu, 'tick'), c(T.hataraki, 'tick'),
      c(T.kankei, 'tick'), ...T.f.map(t => c(t, 'pop')),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t);
    actCard(g, t, this.START, '第五幕', 'まとめ');
    heading(g, '第五幕　まとめ', '円周率の正体', prog(t, this.START + 0.1, this.START + 1.6));

    // ── 天球儀: vành 360 + bốn vòng nghiêng ──
    const all = smooth(prog(t, T.subete - 0.1, T.subete + 0.6));                    // câu gộp: cả bốn vòng sáng
    const spin = 0.35 * smooth(prog(t, T.uchuu - 0.4, T.hataraki + 0.4));           // 宇宙… よく働き: khí cụ quay
    const rot = t * 0.02 + spin * 2;
    const G = ring360(g, CX, CY, R, prog(t, this.START - 0.2, this.START + 1.1), { rot, thread: false });
    const kThread = prog(t, this.START + 0.4, this.START + 1.3);
    circleLine(g, CX, CY, R, kThread, { w: 1.8 + 1.4 * prog(t, T.en131, T.en131 + 0.3) * (1 - prog(t, T.l132 - 0.4, T.l132)) });
    ORB.forEach(([q, r0], i) => {
      const lit = Math.max(prog(t, this.ON[i], this.ON[i] + 0.3) * (1 - prog(t, this.OFF[i] - 0.2, this.OFF[i] + 0.3)), all);
      orbit(g, q, r0 + spin * (i % 2 ? -1 : 1) * 0.6, prog(t, this.ON[i] - 0.3, this.ON[i] + 0.7), lit, all, i);
    });

    // ── lòng vành: từng hồi thu nhỏ, lướt ngang ──
    g.save(); g.beginPath(); g.arc(CX, CY, G.r0 - 2, 0, TAU); g.clip();
    const lens = 0.82 * prog(t, T.kyokugen - 0.6, T.kyokugen) * (1 - prog(t, T.l138 - 0.3, T.l138 + 0.4));   // ô kính chàm: hình thu nhỏ đọc rõ qua các vòng
    if (lens > 0) { g.fillStyle = `rgba(9,17,46,${lens})`; g.fillRect(CX - G.r0, CY - G.r0, 2 * G.r0, 2 * G.r0); }
    if (lens > 0) circleLine(g, CX, CY, R, kThread, { w: 1.8 });
    this.SL.forEach(([a, b], i) => {
      if (t < a || t > b + 0.7) return;
      const exit = Number.isFinite(b) ? 2 * G.r0 * outCubic(prog(t, b, b + 0.6)) : 0;   // chặng cuối không ra khung
      const off = (i ? 2 * G.r0 * (1 - outCubic(prog(t, a, a + 0.6))) : 0) - exit;
      g.save(); g.translate(CX + off, CY); this.inner(g, t, i); g.restore();
    });
    g.restore();

    // ── câu 131: 円周 ÷ 直径 = 測り方 ≠ 正体 (cột phải, lướt ra phải trước hàng ①) ──
    const o131 = outCubic(prog(t, T.l132 - 0.5, T.l132 + 0.1));
    if (t > T.en131 - 0.3 && o131 < 1) {
      g.save(); g.translate(900 * o131, 0);
      telop(g, [['円周', `700 52px ${MIN}`], [' ÷ ', `500 52px ${JP}`, C.dim], ['直径', `700 52px ${MIN}`]], RX, 420, prog(t, T.watta - 0.3, T.watta + 0.6), { size: 52 });
      engrave(g, [['= ', `500 48px ${CG}`, C.dim], ['いちばん簡単な ', `500 30px ${JP}`, C.dim], ['測り方', `700 48px ${MIN}`, C.brassHi]], RX + 20, 540, prog(t, T.hakari - 0.5, T.hakari + 0.4));
      engrave(g, [['≠ ', `500 48px ${JP}`, C.dim], ['正体', `700 48px ${MIN}`, C.ivory]], RX + 20, 640, prog(t, T.shoutai, T.shoutai + 0.5));
      g.restore();
    }

    // ── cột phải: bốn đáp án (dây dẫn từ đầu mút vòng) → nhường chỗ cho bốn lĩnh vực ──
    const oRows = outCubic(prog(t, T.l140 - 0.3, T.l140 + 0.4));
    if (t > T.kyokugen - 0.4 && oRows < 1) {
      g.save(); g.translate(900 * oRows, 0);
      ORB.forEach(([q, r0], i) => {
        const a = this.ON[i], y = RY[i];
        if (t < a - 0.3) return;
        const [px, py] = pt(q, r0 + spin * (i % 2 ? -1 : 1) * 0.6, 0);
        leader(g, px, py, RX - 26, y - 14, prog(t, a, a + 0.4) * (1 - Math.min(1, oRows * 4)), { a: 0.6 });   // dây rút lại khi cột trượt đi
        engrave(g, ACTS[i], RX + 2, y - 60, prog(t, a, a + 0.3), `500 22px ${JP}`, C.brass, { ls: 6, spark: false });
        telop(g, ANS[i], RX, y, prog(t, a + 0.1, a + 0.9), { size: 44 });
      });
      const sub = (s, i, k) => engrave(g, s, RX + 2, RY[i] + 58, k, `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      sub([['まっすぐ ', `500 28px ${JP}`], ['↔', `500 28px ${JP}`, C.brass], [' 曲線の境目', `500 28px ${JP}`]], 0, prog(t, T.massugu, T.sakaime + 0.4));
      sub('半径1の円の、半回転', 1, prog(t, T.hankei, T.kaiten2 + 0.3));
      engrave(g, '1761 ランベルト', RX + 2, RY[2] + 58, prog(t, T.y1761, T.y1761 + 0.9), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      engrave(g, '1882 リンデマン', RX + 262, RY[2] + 58, prog(t, T.y1882, T.y1882 + 0.9), `500 28px ${JP}`, C.dim, { ls: 2, spark: false });
      stamp(g, '証明', RX + 430, RY[2] - 20, prog(t, T.shoumei, T.shoumei + 0.5), { size: 40, hole: HOLE });
      sub('曲がった空間では、成り立たない', 3, prog(t, T.magare, T.shitagai + 0.4));
      g.restore();
    }
    // câu 140: bốn lĩnh vực — vành nhỏ + π son
    if (t > T.kankei - 0.3) {
      engrave(g, '円と関係なさそうな分野にも', RX, 380, prog(t, T.kankei, T.arawa), `500 32px ${JP}`, C.brass, { ls: 4 });
      FIELDS.forEach(([s, x, y], i) => {
        const a = T.f[i], k = prog(t, a - 0.1, a + 0.4);
        if (k <= 0) return;
        ring360(g, x + 34, y - 14, 30, k, { numerals: false, thread: false, rot: rot + i });
        engrave(g, 'π', x + 34, y + 2, prog(t, a + 0.1, a + 0.35), `600 44px ${CG}`, C.shu, { align: 'center', spark: false });
        telop(g, s, x + 120, y, prog(t, a, a + 0.6), { size: 44 });
      });
    }

    // ── câu gộp (138) + 私たちの宇宙 ≈ 平ら (139) ──
    telop(g, [['円周率とは、', `700 38px ${MIN}`, C.dim], ['平らな幾何学', `700 40px ${MIN}`, C.brassHi], ['が、', `700 40px ${MIN}`],
      ['回転', `700 40px ${MIN}`, C.brassHi], ['について語る言葉', `700 40px ${MIN}`]], W / 2, 985, prog(t, T.en138, T.kotoba + 0.2), { size: 40, align: 'center' });
    engrave(g, [['私たちの宇宙 ', `500 30px ${JP}`, C.dim], ['≈', `500 32px ${JP}`, C.brass], [' 平ら', `500 30px ${JP}`, C.ivory]], 100, 300,
      prog(t, T.uchuu, T.taira139 + 0.4), undefined, C.dim, { ls: 2 });
  }
  /** Lòng vành, toạ độ quanh tâm (0, 0), bán kính R. */
  inner(g, t, i) {
    const T = this.T;
    if (i === 0) {                                   // π？ → đường kính + 円周
      engrave(g, 'π', 0, -22, prog(t, T.en130, T.en130 + 0.5), `600 170px ${CG}`, C.shu, { align: 'center' });
      engrave(g, '？', 92, -60, prog(t, T.nani, T.nani + 0.25), `700 64px ${MIN}`, C.ivory, { align: 'left', spark: false });
      const kd = outCubic(prog(t, T.chokkei, T.chokkei + 0.5));
      if (kd > 0) { g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.4; g.beginPath(); g.moveTo(-R, 22); g.lineTo(-R + 2 * R * kd, 22); g.stroke(); g.restore();
        engrave(g, '直径', 0, 78, prog(t, T.chokkei + 0.2, T.chokkei + 0.6), `500 30px ${JP}`, C.ivory, { align: 'center', ls: 4, spark: false }); }
      engrave(g, '円周', 0, -178, prog(t, T.en131 + 0.2, T.en131 + 0.6), `500 30px ${JP}`, C.brassHi, { align: 'center', ls: 4, spark: false });
    } else if (i === 1) {                            // hồi 1: đa giác 6 → 96 kẹp đường tròn
      const at = [T.hen, T.fuyashita, T.takakkei, T.tadori - 0.1, T.tadori + 0.35];
      let j = 0; for (let q = 0; q < NG.length; q++) if (t >= at[q]) j = q;
      const n = NG[j], kp = prog(t, at[0], at[0] + 0.6), kn = j ? 1 : kp;
      const Pi = polyIn(0, 0, R, n), Po = polyOut(0, 0, R, n);
      if (kn >= 1) gap(g, Pi, Po, 0.12);
      drawPoly(g, Po, kn, { color: C.steel, w: 1.6 });
      drawPoly(g, Pi, kn, { color: C.brass, w: 1.8 });
      if (t >= at[0]) engrave(g, [['正', `700 34px ${MIN}`], [String(n), `600 44px ${CG}`, C.brassHi], ['角形', `700 34px ${MIN}`]], 0, 14, 1, undefined, C.ivory, { align: 'center', spark: false });
      engrave(g, '極限', 0, 120, prog(t, T.kyokugen, T.kyokugen + 0.5), `700 40px ${MIN}`, C.brassHi, { align: 'center', ls: 8 });
    } else if (i === 2) {                            // hồi 2: kim quay một vòng; nửa vòng son = π (bán kính 1)
      const spin = TAU * smooth(prog(t, T.kaiten, T.hankei - 0.3)), half = Math.PI * smooth(prog(t, T.han, T.kaiten2 + 0.35));
      arcShu(g, 0, 0, R, 0, Math.PI, prog(t, T.han, T.kaiten2 + 0.35), { w: 5 });
      needle(g, 0, 0, R * 0.96, spin + half, prog(t, T.kaiten - 0.2, T.kaiten + 0.3));
      const kr = prog(t, T.hankei, T.hankei + 0.5);
      if (kr > 0) engrave(g, [['半径 ', `500 28px ${JP}`, C.dim], ['1', `600 44px ${CG}`, C.brassHi]], R * 0.5, 54, kr, undefined, C.ivory, { align: 'center', spark: false });
      engrave(g, 'π', 0, -96, prog(t, T.kaiten2, T.kaiten2 + 0.4), `600 80px ${CG}`, C.shu, { align: 'center' });
    } else if (i === 3) {                            // hồi 3: chữ số π xoắn vào trong, không lặp
      engrave(g, 'π', 0, 46, prog(t, T.l134 - 0.2, T.l134 + 0.3), `600 130px ${CG}`, C.shu, { align: 'center' });
      const kd = prog(t, T.muri, T.shoumei + 0.6), n = Math.round(100 * kd);
      g.save(); g.font = `500 20px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let k = 0; k < n; k++) {
        const a = Math.PI / 2 - k * 0.088, rad = 196 - k * 0.85;
        g.save(); g.translate(rad * Math.cos(a), -rad * Math.sin(a)); g.rotate(Math.PI / 2 - a);
        g.fillStyle = k > n - 4 && kd < 1 ? C.brassHi : (k % 10 === 9 ? C.brass : C.ivory); g.fillText(PI_DIGITS[k + 2], 0, 0); g.restore();
      }
      g.restore();
    } else if (i === 4) {                            // 円積問題: hình tròn ↔ hình vuông thép cùng diện tích, không khép
      const rho = this.RHO, s = this.SIDE / 2;
      circleLine(g, 0, 0, rho, prog(t, T.en136, T.en136 + 0.7), { w: 2.4 });
      const ks = prog(t, T.sei, T.houkei + 0.6);
      if (ks > 0) {                                 // ba cạnh rưỡi — cạnh cuối dừng trước góc đầu (không dựng được)
        const P = [[-s, -s], [s, -s], [s, s], [-s, s], [-s, -s + 26]], m = ks * 4;
        g.save(); g.strokeStyle = C.steel; g.lineWidth = 2.2; g.setLineDash([10, 6]); g.beginPath(); g.moveTo(...P[0]);
        for (let q = 1; q <= 4; q++) { const f = clamp(m - (q - 1)); if (f <= 0) break; g.lineTo(P[q - 1][0] + (P[q][0] - P[q - 1][0]) * f, P[q - 1][1] + (P[q][1] - P[q - 1][1]) * f); }
        g.stroke(); g.restore();
      }
      engrave(g, '同じ面積', 0, -150, prog(t, T.menseki, T.menseki + 0.4), `500 28px ${JP}`, C.brass, { align: 'center', ls: 4, spark: false });
      engrave(g, '定規とコンパスで', 0, 152, prog(t, T.jougi, T.jougi + 0.7), `500 29px ${JP}`, C.dim, { align: 'center', spark: false });
      engrave(g, '作図できない', 0, 196, prog(t, T.sakuzu, T.sakuzu + 0.5), `700 32px ${MIN}`, C.ivory, { align: 'center', ls: 2 });
    } else if (i === 5) {                            // hồi 4: mặt phẳng (C/d = π) → cong thành mặt cầu (≠ π)
      const m = smooth(prog(t, T.magare, T.magare + 0.6));
      if (m < 1) {                                   // mặt phẳng phối cảnh + vòng tròn nằm trên nó
        g.save(); g.scale(1, 1 - m); g.strokeStyle = 'rgba(142,156,192,0.55)'; g.lineWidth = 1;
        const kp = prog(t, T.l137 - 0.2, T.l137 + 0.5), q = 0.42;
        for (let u = -4; u <= 4; u++) { g.beginPath(); g.moveTo(-170 + u * 10, -170 * q * kp); g.lineTo(u * 42, 170 * q * kp); g.stroke();
          g.beginPath(); g.moveTo(-200, u * 18 * q * kp); g.lineTo(200, u * 18 * q * kp); g.stroke(); }
        g.strokeStyle = C.brassHi; g.lineWidth = 2.4; g.beginPath(); g.ellipse(0, 0, 120, 120 * q, 0, -Math.PI / 2, -Math.PI / 2 + TAU * prog(t, T.taira, T.taira + 0.6)); g.stroke();
        g.restore();
        engrave(g, [['円周 ÷ 直径 ', `500 28px ${JP}`, C.dim], ['= ', `500 34px ${CG}`, C.dim], ['π', `600 48px ${CG}`, C.shu]], 0, 150, prog(t, T.teisuu, T.teisuu + 0.5) * (1 - m), undefined, C.dim, { align: 'center', spark: false });
      }
      if (m > 0) {                                   // mặt cầu: viền thép mờ, kinh tuyến, vĩ tuyến đồng
        g.save(); g.scale(m, m);
        g.strokeStyle = C.steelDim; g.lineWidth = 1.6; g.beginPath(); g.arc(0, 0, 150, 0, TAU); g.stroke();
        g.lineWidth = 1; g.globalAlpha = 0.6; [0.35, 0.75].forEach(f => { g.beginPath(); g.ellipse(0, 0, 150 * f, 150, 0, 0, TAU); g.stroke(); });
        g.beginPath(); g.ellipse(0, 0, 150, 40, 0, 0, TAU); g.stroke(); g.globalAlpha = 1;
        g.strokeStyle = C.brassHi; g.lineWidth = 2.4; g.beginPath(); g.ellipse(0, -80, 127, 34, 0, 0, TAU); g.stroke();
        g.restore();
        engrave(g, [['円周 ÷ 直径 ', `500 28px ${JP}`, C.dim], ['≠ ', `500 34px ${JP}`, C.steel], ['π', `600 48px ${CG}`, C.shu]], 0, 196, prog(t, T.shitagai - 0.2, T.shitagai + 0.4), undefined, C.dim, { align: 'center', spark: false });
      }
    } else {                                         // thiên cầu đủ vòng: π son giữa
      engrave(g, 'π', 0, 62, prog(t, this.SL[6][0] + 0.2, this.SL[6][0] + 0.7), `600 190px ${CG}`, C.shu, { align: 'center' });
    }
  }
}
