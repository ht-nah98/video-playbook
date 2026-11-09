// b4 · 海を越えたアイデア (p2 câu 28–39). ERA sangaku cả cảnh (cùng trời chàm, đèn đền ấm từ dưới) — loang từ WIPE ở
// đáy khung (b3 → b4); b5 loang ngược về tenkyu. Bản đồ sao Á Đông ở đáy khung: ギリシャ · 中国 · 日本 (ba sao, đường đi).
//  ① câu 28: 「同じアイデア、別の道から」, sao 中国 sáng, một đường riêng dẫn vào (không nối từ ギリシャ).
//  ② câu 29: 劉徽 (3世紀, 263年) — vành đồng thau, đa giác trong/ngoài nhân đôi 6 → 12 (24 đã trùng chỉ vàng ở r 150).
//  ③ câu 30–32: 祖沖之 (ảnh 後世の像) · π = 3.1415926… (小数第7位) · tấm đồng khắc 355/113 · = 3.1415929… gạch chân 6 chữ số
//     trùng → 「小数第6位まで正しい」 (suzu: 驚くほど良い近似).
//  ④ câu 33–38: nhóm Trung Quốc trượt trái; đường vượt biển 中国 → 日本; tấm 算額 hạ xuống dưới trời sao. Trên bảng: hình
//     tròn lá vàng + đa giác mực (trong) / thép mực (ngoài) từ 正方形 nhân đôi tới 32768 (村松茂清 1663, 3万角形超, 小数第7位),
//     関孝和 đẩy tới 131072; 建部賢弘 1722: dãy giá trị đa giác + 「隠れた規則」; chữ số π 40 桁 khắc mực.
//  ⑤ câu 39: tấm 算額 kéo lên; vành + đa giác (ý của Archimedes); đường sáng chạy ギリシャ → 中国 → 日本; 紀元前250年ごろ → 1722年,
//     「2000年近く」.
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, fix, outCubic, smooth, sk, typeCues,
  ground, ring360, circleLine, needle, bead, drawPoly, gap, engrave, telop, heading, rule, leader, sangaku, plate,
  measure, PI_DIGITS } from '../kit.js';

// ── đa giác nhân đôi LIÊN TỤC (mức s: 0 = n0-giác; mỗi mức ×2) — bán kính theo góc của đa giác đều, nội suy giữa n và 2n.
// Mẫu góc chứa đỉnh của cả n-giác lẫn 2n-giác (trong lẫn ngoài) → mỗi mức nguyên là đa giác thật, không nhảy.
const polyR = (th, n, A, phi) => { const seg = TAU / n; let d = ((th - phi) % seg + seg) % seg; if (d > seg / 2) d -= seg; return A / Math.cos(d); };
function morph(cx, cy, r, s, n0, side, a0 = -Math.PI / 2) {
  const lv = Math.floor(s + 1e-9), f = smooth(clamp(s - lv)), n = n0 * 2 ** lv, N = Math.min(4 * n, 2048);
  const rho = (th, m) => side === 'in' ? polyR(th, m, r * Math.cos(Math.PI / m), a0 + Math.PI / m) : polyR(th, m, r, a0);
  return Array.from({ length: N }, (_, j) => { const th = a0 + TAU * j / N, p = rho(th, n) + (rho(th, 2 * n) - rho(th, n)) * f;
    return [cx + p * Math.cos(th), cy + p * Math.sin(th)]; });
}
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));

// bản đồ sao (đáy khung)
const NODE = { gr: [260, 955], cn: [960, 955], jp: [1660, 955] };
const arcPts = ([ax, ay], [bx, by], lift = 70, N = 40) => Array.from({ length: N + 1 }, (_, i) => { const u = i / N, mx = (ax + bx) / 2, my = (ay + by) / 2 - lift;
  return [(1 - u) ** 2 * ax + 2 * u * (1 - u) * mx + u * u * bx, (1 - u) ** 2 * ay + 2 * u * (1 - u) * my + u * u * by]; });
function path(g, P, k, { color = C.brass, w = 1.4, dash = [], a = 0.85 } = {}) {
  if (k <= 0) return null;
  const m = clamp(k) * (P.length - 1), i = Math.floor(m), f = m - i;
  const end = i < P.length - 1 ? [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f] : P.at(-1);
  g.save(); g.globalAlpha = a; g.strokeStyle = color; g.lineWidth = w; g.setLineDash(dash); g.lineCap = 'round';
  g.beginPath(); g.moveTo(...P[0]); for (let j = 1; j <= i; j++) g.lineTo(...P[j]); g.lineTo(...end); g.stroke(); g.restore();
  return end;
}

// tấm đồng nhỏ (祖沖之 355/113): đồng tiện + vát mép, chữ khắc tối
function brassPlate(g, x, y, w, h, k, sheen = 0) {
  if (k <= 0) return;
  g.save(); g.translate(0, (1 - outCubic(clamp(k))) * 420);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.beginPath(); g.roundRect(x + 10, y + 14, w, h, 10); g.fill();
  const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, '#F0D894'); gr.addColorStop(0.35, '#B48A40'); gr.addColorStop(0.65, '#E2C178'); gr.addColorStop(1, '#6E5224');
  g.fillStyle = gr; g.beginPath(); g.roundRect(x, y, w, h, 10); g.fill();
  g.strokeStyle = 'rgba(42,28,8,0.9)'; g.lineWidth = 1.5; g.beginPath(); g.roundRect(x + 8, y + 8, w - 16, h - 16, 6); g.stroke();
  if (sheen > 0 && sheen < 1) {                                             // vệt sáng lướt qua (驚くほど)
    g.save(); g.beginPath(); g.roundRect(x, y, w, h, 10); g.clip(); g.globalCompositeOperation = 'lighter';
    const sx = x - 80 + (w + 160) * sheen, sg = g.createLinearGradient(sx - 60, 0, sx + 60, 0);
    sg.addColorStop(0, 'rgba(255,240,200,0)'); sg.addColorStop(0.5, 'rgba(255,240,200,0.45)'); sg.addColorStop(1, 'rgba(255,240,200,0)');
    g.fillStyle = sg; g.fillRect(x, y, w, h); g.restore();
  }
  g.restore();
}
const engraveDark = (g, s, x, y, k, font) => engrave(g, s, x, y, k, font, C.engrave, { align: 'center', spark: k < 1, shadow: false });

export default class Overseas {
  static ERA = 'sangaku';
  static IMAGES = { zu: './assets/history/zu-chongzhi.jpg' };
  static POSES = [];
  WIPE = [960, 1080];                                  // đèn đền từ dưới
  TRANSITION = 'whoosh';                               // loang khác ERA mặc định whoosh-long — hạn mức G2 = 0
  init({ tl }) {
    const { L, w } = lookup(tl, 'b4');
    this.T = {
      onaji: w(28, '同じ'), chugoku: w(28, '中国'), betsu: w(28, '別'), mitsuka: w(28, '見つかって'), l29: L(29).start,
      seiki3: w(29, '世紀'), ryuki: w(29, '劉徽'), takak29: w(29, '多角形'), motome: w(29, '求め'),
      l30: L(30).start, so30: w(30, '祖沖之'), shou30: w(30, '小数'), dai7: w(30, '第7位'), tsuki: w(30, '突き止めます'),
      so31: w(31, '祖沖之'), frac: w(31, '355/113'), bunsuu: w(31, '分数'),
      shou32: w(32, '小数'), dai6: w(32, '第6位'), tadashii32: w(32, '正しい'), odoroku: w(32, '驚く'), e32: L(32).end,
      l33: L(33).start, edo: w(33, '江戸'), nihon: w(33, '日本'), wasan: w(33, '和算家たち'), hasami: w(33, 'はさみうち'),
      y1663: w(34, '1663'), mura: w(34, '村松茂清'), sei: w(34, '正'), hen34: w(34, '辺'), bai: w(34, '倍'),
      man3: w(35, '3万角形'), shou35: w(35, '小数'), dai7b: w(35, '第7位'), atai35: w(35, '値'),
      seki: w(36, '関孝和'), sarani: w(36, 'さらに'), oshi: w(36, '推し進めます'),
      y1722: w(37, '1722'), deshi: w(37, '弟子'), takebe: w(37, '建部賢弘'), atai37: w(37, '値'), narabi: w(37, '並び'),
      kakure: w(37, '隠れた'), kisoku: w(37, '規則'), e37: L(37).end,
      l38: L(38).start, n40: w(38, '40'), keta: w(38, '桁'), tadashiku: w(38, '正しく'), e38: L(38).end,
      l39: L(39).start, archi: w(39, 'アルキメデス'), umi: w(39, '海'), koe: w(39, '越え'), y2000: w(39, '2000'), chikaku: w(39, '近く'),
      iki: w(39, '生き'), end: L(39).end,
    };
    this.START = L(28).start;
    this.FROM = Math.max(this.START - 1.2, L(27).end + 0.5);
    const T = this.T;
    // mức nhân đôi
    this.LIU = [T.takak29, T.motome + 0.2];                                  // 6 → 12 (1 mức — 24 cạnh ở r 150 đã trùng chỉ vàng, mắt không còn thấy)
    this.MURA = [T.bai - 0.05, T.man3 + 0.5, T.sarani, T.oshi + 0.6];      // 正方形 4 → 32768 (13 mức), rồi → 131072 (15)
    this.ARC = [T.archi + 0.3, T.koe];                                       // vành ở câu 39: 6 → 12 (dừng ở 12, đa giác còn thấy)
    // ── số trên hình (CONTENT.md: 劉徽 3世紀 263 · 祖沖之 5世紀, 7 chữ số, 355/113 đúng 6 · 村松茂清 1663, 2^15 cạnh, 7 chữ số ·
    //    関孝和 2^17 · 建部賢弘 1722, hơn 40 chữ số · 250 TCN → 1722 ≈ 2000 năm) ──
    must('263 >= 201 && 263 <= 300', true);                                  // 263年 thuộc 3世紀
    this.PI7 = PI_DIGITS.slice(0, 9); must(`${this.PI7}`, 3.1415926); must(`Math.floor(Math.PI * 1e7) / 1e7`, 3.1415926);
    this.Q = fix('355 / 113', 7); must(`${this.Q}`, 3.1415929);
    must(`'${fix('355 / 113', 9)}'.slice(0, 8) === '${PI_DIGITS}'.slice(0, 8) && '${fix('355 / 113', 9)}'[8] !== '${PI_DIGITS}'[8]`, true);   // trùng tới 小数第6位, khác ở 第7位
    must('4 * 2 ** 13', 32768); must('2 ** 15', 32768); must('2 ** 15 > 30000', true); must('2 ** 17', 131072);
    this.SEQ = [16, 32, 64, 128].map(n => fix(`${n} * Math.sin(Math.PI / ${n})`, 6));   // dãy chu vi đa giác nội tiếp (đường kính 1)
    must(`'${this.SEQ.join(',')}'`, '3.121445,3.136548,3.140331,3.141277');
    this.D40 = PI_DIGITS.slice(0, 42); must(`'${this.D40}'.length - 2`, 40); must(`'${this.D40}' === '${PI_DIGITS}'.slice(0, 42)`, true);
    must('6 * 2 ** 1', 12);                                                  // 劉徽 / câu 39: dừng ở 12-giác (1 mức nhân đôi)
    must('1722 + 250', 1972); must('1972 < 2000 && 1972 > 1900', true);    // 紀元前250年ごろ → 1722年: 2000年近く
  }
  sfx() {
    const T = this.T, c = (t, kind, db) => ({ t: +t.toFixed(3), kind: sk(kind), ...(db != null ? { db } : {}) });
    return [
      c(T.onaji, 'tick'), c(T.betsu, 'pen'),
      c(T.l29, 'tick'), c(T.takak29, 'pen'),
      c(T.so30, 'page'), ...typeCues(this.PI7, T.shou30, T.shou30 + 0.8), c(T.dai7 + 0.5, 'tick'),
      ...typeCues('355113', T.frac, T.frac + 1.2), c(T.bunsuu, 'tick'),
      ...typeCues(this.Q, T.shou32, T.shou32 + 0.45), c(T.tadashii32, 'tick'), c(T.odoroku, 'suzu'),
      c(T.edo + 0.1, 'wood'), c(T.nihon, 'pen'), c(T.wasan, 'tick'), c(T.hasami, 'pen'),
      c(T.y1663, 'tick'), c(T.sei, 'pen'), c(this.MURA[0] + 0.6, 'soroban'),
      c(T.man3 + 0.6, 'tick'), c(T.shou35 + 0.3, 'tick'),
      c(T.seki, 'tick'),
      c(T.y1722, 'tick'), c(T.takebe, 'tick'), c(T.atai37 + 0.3, 'soroban'), c(T.kisoku, 'pen'),
      c(T.l38 + 0.8, 'soroban'), c(T.tadashiku, 'tick'),
      c(T.archi + 0.3, 'pen'), c(T.umi, 'whoosh'), c(T.koe + 0.15, 'tick'), c(T.y2000 + 0.3, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'sangaku', t);
    heading(g, '第一幕　円をはさみうちにする', '海を越えたアイデア', prog(t, this.FROM + 0.3, this.START + 0.9));
    this.route(g, t);
    this.lead(g, t);
    this.china(g, t);
    this.board(g, t);
    this.finale(g, t);
  }
  // ── bản đồ sao: ba ngôi sao + đường đi ──
  route(g, t) {
    const T = this.T, lab = (s, [x, y], k) => engrave(g, s, x, y + 50, k, `500 28px ${JP}`, C.ivory, { align: 'center', ls: 4, spark: false });   // dưới sao: đường đi không cắt chữ
    const star = (p, k) => { if (k <= 0) return; g.save(); g.strokeStyle = C.brass; g.globalAlpha = 0.8; g.lineWidth = 1.2; g.beginPath(); g.arc(p[0], p[1], 14 * outCubic(clamp(k)), 0, TAU); g.stroke(); g.restore(); bead(g, p[0], p[1], 5, k); };
    star(NODE.gr, prog(t, this.FROM + 0.4, this.FROM + 0.8)); lab('ギリシャ', NODE.gr, prog(t, this.FROM + 0.5, this.FROM + 1.1));
    star(NODE.cn, prog(t, T.chugoku, T.chugoku + 0.4)); lab('中国', NODE.cn, prog(t, T.chugoku + 0.1, T.chugoku + 0.5));
    // 別の道: một đường riêng dẫn vào 中国 từ dưới-trái (không nối với ギリシャ)
    const own = [[600, 1075], [700, 1012], [820, 975], [960, 955]];
    path(g, own, prog(t, T.betsu, T.mitsuka + 0.2), { dash: [3, 7] });
    engrave(g, '別の道', 520, 1000, prog(t, T.betsu + 0.2, T.betsu + 0.6), `500 28px ${JP}`, C.dim, { ls: 4, spark: false });
    // vượt biển 中国 → 日本 (câu 33)
    path(g, arcPts(NODE.cn, NODE.jp, 60), prog(t, T.nihon, T.nihon + 0.8), { dash: [3, 7] });
    star(NODE.jp, prog(t, T.nihon + 0.6, T.nihon + 1.0)); lab('日本', NODE.jp, prog(t, T.nihon + 0.7, T.nihon + 1.1));
    // câu 39: ý của Archimedes chạy ギリシャ → 中国 → 日本 (đồng sáng, hạt ở đầu)
    const k = prog(t, T.umi, T.koe + 0.5);
    if (k > 0) {
      const P = arcPts(NODE.gr, NODE.cn, 70).concat(arcPts(NODE.cn, NODE.jp, 60).slice(1));
      const e = path(g, P, smooth(k), { color: C.brassHi, w: 2.4, a: 1 });
      if (k < 1) bead(g, e[0], e[1], 6, 1);
    }
  }
  // ── câu 28: 「同じアイデア、別の道から」 giữa khung, rồi kéo lên ──
  lead(g, t) {
    const T = this.T, o = out(t, T.l29 - 0.35, 0.6);
    if (t < this.FROM + 0.3 || o >= 1) return;
    g.save(); g.translate(0, -620 * o);
    telop(g, [['同じアイデアを、', `700 54px ${MIN}`], ['別の道から', `700 54px ${MIN}`, C.brassHi]], 960, 560,
      t < this.FROM + 0.6 ? 0.15 * prog(t, this.FROM + 0.3, this.FROM + 0.6) : 0.15 + 0.85 * prog(t, this.FROM + 0.6, T.mitsuka), { size: 54, align: 'center' });   // khung 0.3 s rồi chữ khắc ngay — không có hộp rỗng
    g.restore();
  }
  // ── câu 29–32: 劉徽 (vành) · 祖沖之 (ảnh, π 7 chữ số, 355/113) — trượt trái ra ở câu 33 ──
  china(g, t) {
    const T = this.T, o = out(t, T.l33 - 0.3, 0.8);
    if (t < T.l29 - 0.3 || o >= 1) return;
    g.save(); g.translate(-1800 * o, 0);
    // 劉徽: vành + đa giác trong (đồng) / ngoài (thép) 6 → 12
    const cx = 430, cy = 580, r = 150, rot = t * 0.03;
    telop(g, [['3世紀　', `700 36px ${MIN}`, C.dim], ['劉徽', `700 44px ${MIN}`]], cx, 322, prog(t, T.l29, T.ryuki + 0.5), { size: 44, align: 'center' });
    ring360(g, cx, cy, r, prog(t, T.l29 + 0.2, T.ryuki + 0.6), { rot, numerals: false });
    const s = clamp((t - this.LIU[0]) / (this.LIU[1] - this.LIU[0])), kp = prog(t, T.takak29 - 0.1, T.takak29 + 0.5);
    if (kp > 0) {
      const Pi = morph(cx, cy, r, s, 6, 'in'), Po = morph(cx, cy, r, s, 6, 'out');
      if (kp >= 1) gap(g, Pi, Po, 0.12);
      drawPoly(g, Po, kp, { color: C.steel, w: 1.6 }); drawPoly(g, Pi, kp, { color: C.brass, w: 1.8 });
    }
    engrave(g, '263年', cx, 852, prog(t, T.motome - 0.2, T.motome + 0.3), `500 32px ${JP}`, C.brass, { align: 'center', ls: 4, spark: false });
    // 祖沖之: ảnh (後世の像) bên phải
    plate(g, 'zu', 1490, 292, 410, prog(t, T.so30 - 0.2, T.so30 + 1.2), { label: { name: '祖沖之（後世の像）', life: '5世紀' } });
    // π = 3.1415926…  (hàng A) · tấm đồng 355/113 · = 3.1415929… (hàng B) — chữ số thẳng cột ở xA
    const xA = 1010, fA = `500 76px ${CG}`, yA = 440, yB = 690;
    const kA = prog(t, T.shou30, T.shou30 + 0.8);
    if (kA > 0) {
      engrave(g, [['π', `600 84px ${CG}`, C.shu], [' = ', fA, C.dim]], xA, yA, clamp(kA * 4), fA, C.ivory, { align: 'right', spark: false });
      engrave(g, [[this.PI7, fA, C.ivory], ['…', fA, C.dim]], xA, yA, kA, fA, C.ivory);
    }
    const x2 = xA + measure(g, '3.', fA), x8 = xA + measure(g, '3.141592', fA), x9 = xA + measure(g, this.PI7, fA);
    // 小数第7位まで: thước đồng dưới 7 chữ số thập phân
    rule(g, x2, x9, yA + 22, prog(t, T.dai7, T.dai7 + 0.5));
    engrave(g, '小数第7位まで', x2, yA + 70, prog(t, T.dai7 + 0.3, T.dai7 + 0.9), `500 30px ${JP}`, C.brass, { ls: 4, spark: false });
    // tấm đồng 355/113
    const bx = 730, by = 575, bw = 210, bh = 200, kb = prog(t, T.so31 - 0.3, T.so31 + 0.4);
    brassPlate(g, bx, by, bw, bh, kb, prog(t, T.odoroku, T.odoroku + 0.9));
    if (kb >= 1) {
      const kf = prog(t, T.frac, T.frac + 1.2);
      engraveDark(g, '355', bx + bw / 2, by + 84, clamp(kf * 2), `600 62px ${CG}`);
      if (kf > 0.45) { g.save(); g.strokeStyle = C.engrave; g.lineWidth = 3; g.beginPath(); g.moveTo(bx + 46, by + 104); g.lineTo(bx + 46 + (bw - 92) * outCubic(clamp((kf - 0.45) / 0.15)), by + 104); g.stroke(); g.restore(); }
      engraveDark(g, '113', bx + bw / 2, by + 166, clamp(kf * 2 - 1), `600 62px ${CG}`);
    }
    engrave(g, '分数', bx + bw / 2, by + bh + 52, prog(t, T.bunsuu, T.bunsuu + 0.4), `500 30px ${JP}`, C.dim, { align: 'center', ls: 6, spark: false });
    const kB = prog(t, T.shou32, T.shou32 + 0.45);
    if (kB > 0) {
      engrave(g, ' = ', xA, yB, clamp(kB * 4), fA, C.dim, { align: 'right', spark: false });
      engrave(g, [[this.Q, fA, C.ivory], ['…', fA, C.dim]], xA, yB, kB, fA, C.ivory);
    }
    // 小数第6位まで: gạch chân đồng đúng 6 chữ số trùng ở cả hai hàng
    const k6 = prog(t, T.dai6, T.dai6 + 0.5);
    if (k6 > 0) {
      g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 3; g.lineCap = 'round';
      for (const y of [yA + 22, yB + 22]) { g.beginPath(); g.moveTo(x2, y); g.lineTo(x2 + (x8 - x2) * outCubic(k6), y); g.stroke(); }
      g.restore(); }
    telop(g, [['小数第6位まで ', `700 36px ${MIN}`], ['正しい', `700 36px ${MIN}`, C.brassHi]], xA - 20, 850, prog(t, T.tadashii32 - 0.3, T.tadashii32 + 0.4), { size: 36 });
    g.restore();
  }
  // ── câu 33–38: tấm 算額 dưới trời sao ──
  board(g, t) {
    const T = this.T, kIn = prog(t, T.edo, T.edo + 1.1), kOut = out(t, T.e38 + 0.4, 0.8);
    if (kIn <= 0 || kOut >= 1) return;
    const ink = { spark: false, shadow: false };
    sangaku(g, 200, 300, 1520, 580, kIn * (1 - kOut), { title: '和算家の挑戦', content: R => {
      // hình: đường tròn lá vàng + đa giác trong (mực) / ngoài (thép mực), 正方形 → nhân đôi
      const fx = 440, fy = 598, fr = 124;
      const kc = prog(t, T.hasami, T.hasami + 0.8);
      if (kc > 0) { g.save(); g.strokeStyle = '#B98F3A'; g.lineWidth = 5; g.beginPath(); g.arc(fx, fy, fr, -Math.PI / 2, -Math.PI / 2 + TAU * outCubic(kc)); g.stroke();
        g.strokeStyle = 'rgba(110,82,36,0.9)'; g.lineWidth = 1; g.beginPath(); g.arc(fx, fy, fr + 3, -Math.PI / 2, -Math.PI / 2 + TAU * outCubic(kc)); g.stroke(); g.restore(); }
      const [m0, m1, m2, m3] = this.MURA;
      const s = 13 * clamp((t - m0) / (m1 - m0)) + 2 * clamp((t - m2) / (m3 - m2)), kp = prog(t, T.sei, T.sei + 0.6);
      if (kp > 0) {
        const Pi = morph(fx, fy, fr, s, 4, 'in'), Po = morph(fx, fy, fr, s, 4, 'out');
        drawPoly(g, Po, kp, { color: C.steelInk, w: 1.8 }); drawPoly(g, Pi, kp, { color: C.sumi, w: 2 });
        const n = 4 * 2 ** Math.round(s);
        engrave(g, [['正', `700 28px ${MIN}`], [String(n), `500 28px ${MONO}`], ['角形', `700 28px ${MIN}`]], fx, 812, kp, undefined, C.sumi, { align: 'center', ...ink });
      }
      // chữ (mực): ba nhà 和算
      const X = 690;
      engrave(g, '江戸時代の和算家たち', X, 400, prog(t, T.wasan, T.wasan + 0.9), `700 34px ${MIN}`, C.sumi, { ls: 4, ...ink });
      if (t > T.wasan + 0.4) { g.save(); g.strokeStyle = 'rgba(30,25,20,0.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(X, 422.5); g.lineTo(X + 860 * outCubic(prog(t, T.wasan + 0.4, T.wasan + 1.2)), 422.5); g.stroke(); g.restore(); }
      engrave(g, [['1663年　', `700 30px ${MIN}`], ['村松茂清', `700 40px ${MIN}`]], X, 478, prog(t, T.y1663, T.mura + 0.7), undefined, C.sumi, ink);
      engrave(g, '正方形から　辺の数を2倍', X + 4, 526, prog(t, T.sei, T.bai + 0.3), `500 28px ${JP}`, C.sumi, ink);
      engrave(g, [['→　', `500 28px ${JP}`], ['3万角形超', `700 32px ${MIN}`]], X + 4, 572, prog(t, T.man3, T.man3 + 0.9), undefined, C.sumi, ink);
      engrave(g, '小数第7位まで正しい', X + 290, 572, prog(t, T.shou35, T.atai35 + 0.3), `500 28px ${JP}`, C.sumi, ink);
      engrave(g, [['関孝和', `700 40px ${MIN}`], ['　さらに推し進める', `500 28px ${JP}`]], X, 642, prog(t, T.seki, T.oshi + 0.5), undefined, C.sumi, ink);
      engrave(g, [['1722年　', `700 30px ${MIN}`], ['弟子　', `500 26px ${JP}`], ['建部賢弘', `700 40px ${MIN}`]], X, 712, prog(t, T.y1722, T.takebe + 0.8), undefined, C.sumi, ink);
      // 多角形の値の並び → 隠れた規則: dãy giá trị, cung mực dưới mỗi bước (bước nhỏ dần)
      const fS = `500 26px ${MONO}`, sep = ' → ';
      let x = X + 4; const xs = [];
      this.SEQ.forEach((v, i) => { const a = T.atai37 + i * 0.35;
        engrave(g, v, x, 760, prog(t, a, a + 0.3), fS, C.sumi, ink); xs.push([x, x + measure(g, v, fS)]); x += measure(g, v, fS);
        if (i < 3) { engrave(g, sep, x, 760, prog(t, a + 0.3, a + 0.4), fS, C.sumi, ink); x += measure(g, sep, fS); } });
      const kr = prog(t, T.kisoku - 0.2, T.kisoku + 0.5);
      if (kr > 0) { g.save(); g.strokeStyle = C.steelInk; g.lineWidth = 1.6;
        for (let i = 0; i < 3; i++) { const a = (xs[i][0] + xs[i][1]) / 2, b = (xs[i + 1][0] + xs[i + 1][1]) / 2, hh = 14 - i * 4, e = clamp(kr * 3 - i);
          if (e <= 0) continue; g.beginPath(); for (let j = 0; j <= 20 * e; j++) { const u = j / 20; g.lineTo(a + (b - a) * u, 770 + hh * Math.sin(Math.PI * u)); } g.stroke(); }
        g.restore(); }
      engrave(g, '隠れた規則', x + 24, 764, prog(t, T.kakure, T.kisoku + 0.4), `700 30px ${MIN}`, C.sumi, ink);
      // 40桁以上: chữ số π khắc mực
      const kd = prog(t, T.l38 + 0.2, T.keta + 0.9), D = this.D40 + '…';
      engrave(g, D, X, 812, kd, fS, C.sumi, ink);
      engrave(g, [['40', `600 40px ${CG}`], ['桁以上', `700 30px ${MIN}`]], X + 14 + measure(g, D, fS), 814, prog(t, T.keta - 0.2, T.tadashiku + 0.2), undefined, C.sumi, ink);
    } });
  }
  // ── câu 39: vành + đa giác (ý của Archimedes) · 紀元前250年ごろ → 1722年 · 2000年近く ──
  finale(g, t) {
    const T = this.T;
    if (t < T.archi) return;
    const cx = 960, cy = 470, r = 150, rot = t * 0.03;
    ring360(g, cx, cy, r, prog(t, T.archi, T.archi + 1.0), { rot, numerals: false });
    const s = clamp((t - this.ARC[0]) / (this.ARC[1] - this.ARC[0])), kp = prog(t, this.ARC[0], this.ARC[0] + 0.5);
    if (kp > 0) { const Pi = morph(cx, cy, r, s, 6, 'in'), Po = morph(cx, cy, r, s, 6, 'out');
      if (kp >= 1) gap(g, Pi, Po, 0.12); drawPoly(g, Po, kp, { color: C.steel, w: 1.6 }); drawPoly(g, Pi, kp, { color: C.brass, w: 1.8 }); }
    needle(g, cx, cy, r * 0.8, t * 0.5, prog(t, T.iki, T.iki + 0.6));
    const fY = `500 34px ${JP}`;
    engrave(g, '紀元前250年ごろ', 900, 724, prog(t, T.koe, T.koe + 0.6), fY, C.ivory, { align: 'right', ls: 3, spark: false });
    leader(g, 920, 712, 1040, 712, prog(t, T.koe + 0.3, T.koe + 0.7));
    g.save(); const ka = prog(t, T.koe + 0.6, T.koe + 0.75);
    if (ka > 0) { g.fillStyle = C.brass; g.beginPath(); g.moveTo(1052, 712); g.lineTo(1038, 704); g.lineTo(1038, 720); g.closePath(); g.fill(); }
    g.restore();
    engrave(g, '1722年', 1064, 724, prog(t, T.koe + 0.5, T.koe + 1.0), fY, C.ivory, { ls: 3, spark: false });
    telop(g, [['2000', `600 72px ${CG}`, C.brassHi], ['年近く', `700 56px ${MIN}`]], 960, 860, prog(t, T.y2000, T.chikaku + 0.4), { size: 56, align: 'center' });
  }
}
