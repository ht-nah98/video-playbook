// f2 · 次回 (p2 câu 141–148). Vành 360 nhỏ làm「のぞき窓」giữa trời: π son hiện trong ô kính (「その奥をのぞいて」, kính
// phóng lên) → π rút đi, 「円？」 thép (円なんてどこにもない？) → ô kính thu nhỏ về góc dưới-phải chờ. Hai công thức không
// có hình tròn: đường chuông 正規分布 (tích phân e^(−x²/2) kiểm bằng Simpson = √(2π)) và 1 + 1/4 + 1/9 + 1/16 + … chạy
// tổng riêng phần tới π²/6 trên thước đồng. 「回転か、波か、隠れた円」 = ba vành nhỏ (kim quay · sóng · đường tròn chỉ
// vàng hiện trong ô kính — ô về góc rồi rút đi, vẽ lại đúng lúc「隠れた円」, correct). 「ありがとう」 → mọi thứ trượt lên, biển kênh 99の発見 + チャンネル登録 (toạ
// độ MÀN HÌNH) trượt vào, mascot `wave` (nói) 3–8 s, mascot lặn thì biển trượt vào giữa; π son khắc trên huy hiệu ở 「99の発見」 rồi đứng yên tới khung cuối.
import { W, H, C, MIN, JP, CG, MONO, TAU, clamp, prog, lookup, must, fix, outCubic, outBack, smooth, sk,
  ground, ring360, circleLine, needle, engrave, telop, heading, rule, figure } from '../kit.js';

const LOUPE = [[960, 540, 150], [960, 540, 185], [1340, 850, 70]];       // ô kính: giữa → phóng → chờ ở hàng ba vành
const MED = [[300, 850], [820, 850], [1340, 850]];                       // ba vành nhỏ 回転 · 波 · 隠れた円 (r 70)
const MEDL = ['回転', '波', '隠れた円'];
const BX = 510, BY = 390, BU = 108, BH = 250;                             // đường chuông: tâm, đáy (y = BY + BH), px/đơn vị, cao đỉnh
const SX0 = 1000, SBAR = 650, SW = 760, SMAX = 1.8;                      // tổng: lề trái, thước, bề rộng, thang
const bell = x => Math.exp(-x * x / 2);
const BOARD = { x: 250, y: 330, w: 1040, h: 440 };                       // biển kênh (màn hình) — lệch trái khi mascot đứng phải
const BOARD_CX = (W - BOARD.w) / 2;                                      // mascot rời → biển trượt vào giữa

function track(t, keys) {                                                // dời mượt giữa các chặng [giờ, [x, y, r]]
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [t0, nv] = keys[i], e = smooth(clamp((t - t0) / 0.9)); if (e <= 0) break; v = v.map((a, j) => a + (nv[j] - a) * e); }
  return v;
}

export default class Next {
  static ERA = 'tenkyu';
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      l141: L(141).start, suushiki: w(141, '数式'), en141: w(141, '円周'), zehi: w(141, 'ぜひ'), nozoite: w(141, 'のぞいて'),
      l142: L(142).start, en142: w(142, '円'), doko: w(142, 'どこ'), e142: L(142).end,
      toukei: w(143, '統計'), seiki: w(143, '正規'), root: w(143, '√2π'), haitte: w(143, '入って'),
      sum: w(144, '1+1/4+1/9+1/16+…'), towa: w(144, '永遠'), pi6: w(144, 'π²/6'), naru: w(144, 'なります'),
      hori: w(145, '掘り下げて'), kaiten: w(145, '回転'), nami: w(145, '波'), kakureta: w(145, '隠れた'), en145: w(145, '円'), mitsukaru: w(145, '見つかる'),
      l146: L(146).start, arigatou: w(146, 'ありがとう'),
      channel: w(147, 'チャンネル'), touroku: w(147, '登録'), e147: L(147).end,
      name: w(148, '99の発見'), end: L(148).end,
    };
    this.START = L(141).start;
    this.FROM = Math.max(this.START - 1.2, L(140).end + 0.5);
    const T = this.T;
    this.KEYS = [[this.FROM, LOUPE[0]], [T.nozoite, LOUPE[1]], [T.e142 + 0.1, LOUPE[2]]];
    this.PAN = [T.l146 - 0.3, T.l146 + 0.8];                             // mọi thứ trượt lên, biển kênh vào
    this.FIG = [T.l146 - 0.1, T.touroku + 0.5];                          // mascot wave: 3–8 s
    must(`${this.FIG[1] - this.FIG[0]} <= 8`, true);
    this.CENTER = [this.FIG[1] + 0.2, this.FIG[1] + 1.1];                // biển trượt vào giữa khi mascot lặn xuống
    must(`${this.CENTER[1]} <= ${T.name + 0.7}`, true);                   // xong trước khi π khắc xong trên huy hiệu
    must(`${BOARD_CX}`, 440);
    must(`${T.end + 2.0 - Math.max(T.name + 0.7, this.CENTER[1])} >= 4`, true);   // biển kênh đứng yên ≥ 4 s tới khung cuối (tail p2 = 2.0)
    // ∫ e^(−x²/2) dx trên [−12, 12] (Simpson) = √(2π)
    const n = 4000, a = -12, h = 24 / n; let s = bell(a) + bell(12);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * bell(a + i * h);
    must(`${s * h / 3}`, Math.sqrt(2 * Math.PI));
    // tổng riêng phần 1 + 1/4 + … + 1/N² → π²/6
    this.S = [0]; for (let k = 1; k <= 1000; k++) this.S.push(this.S[k - 1] + 1 / (k * k));
    must('1 + 1/4 + 1/9 + 1/16', this.S[4]);
    must(`${Math.abs(this.S[1000] - Math.PI ** 2 / 6) < 1e-3 && this.S[1000] < Math.PI ** 2 / 6}`, true);
    this.BASEL = fix('Math.PI ** 2 / 6', 4); must(`${this.BASEL}`, 1.6449);
    this.NAME = '99の発見'; this.CTA = 'チャンネル登録';                   // channels/ja/channel.json outro
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind: sk(kind) });
    return [
      c(T.suushiki, 'tick'), c(T.en141, 'tick'), c(T.zehi, 'tick'),
      c(T.en142, 'question'), c(T.doko, 'tick'), c(T.e142 + 0.1, 'whoosh'),
      c(T.seiki, 'pen'), c(T.root, 'tick'),
      c(T.sum, 'tick'), c(T.sum + 2.6, 'tick'), c(T.towa, 'soroban'), c(T.towa + 0.9, 'soroban'), c(T.pi6, 'tick'),
      c(T.hori, 'tick'), c(T.kaiten, 'tick'), c(T.nami, 'tick'), c(T.en145, 'pen'), c(T.mitsukaru, 'correct'),
      c(this.PAN[0] + 0.3, 'page'), c(T.arigatou, 'tick'), c(T.channel, 'pop'), c(T.name, 'tick'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'tenkyu', t);
    const pan = outCubic(prog(t, this.PAN[0], this.PAN[1]));
    if (pan < 1) { g.save(); g.translate(0, -H * pan); this.board1(g, t); g.restore(); }
    if (pan > 0) this.board(g, t, H * (1 - pan));
    // mascot wave (nói) — sau biển, toạ độ màn hình; rời khung bằng cách lặn xuống
    const kf = prog(t, this.FIG[0], this.FIG[0] + 0.6), of = outCubic(prog(t, this.FIG[1], this.FIG[1] + 0.6));
    if (kf > 0 && of < 1) { g.save(); g.translate(0, 780 * of); figure(g, 'wave', 1620, H, 720, kf, { t }); g.restore(); }
  }
  /** Phần trước lời cảm ơn: ô kính, hai công thức, ba vành. */
  board1(g, t) {
    const T = this.T;
    heading(g, '第五幕　次回', '数式の奥へ', prog(t, this.FROM + 0.3, this.FROM + 1.8));
    const [lx, ly, lr] = track(t, this.KEYS), rot = t * 0.03;
    // ── ô kính (vành 360 nhỏ) ──
    // ô kính về góc rồi rút đi (không để ô trống chờ ~20 s), vẽ lại đúng lúc「隠れた円」như hai vành kia
    const kLoupe = t < T.kakureta - 0.2 ? prog(t, this.FROM + 0.3, this.FROM + 1.4) * (1 - prog(t, T.e142 + 0.6, T.e142 + 1.1))
      : prog(t, T.kakureta - 0.2, T.kakureta + 0.4);
    const G = ring360(g, lx, ly, lr, kLoupe, { rot, numerals: false, thread: false });
    const s = lr / 150, inOut = 1 - outCubic(prog(t, T.e142 - 0.1, T.e142 + 0.3));
    const kpi = prog(t, T.en141, T.en141 + 0.4) - outCubic(prog(t, T.l142, T.l142 + 0.35));   // π hiện → rút nhỏ đi
    if (kpi > 0) { g.save(); g.translate(lx, ly); g.scale(kpi * s, kpi * s);
      engrave(g, 'π', 0, 52, 1, `600 160px ${CG}`, C.shu, { align: 'center', spark: false }); g.restore(); }
    const kq = prog(t, T.en142, T.en142 + 0.35) * inOut;
    if (kq > 0) {
      g.save(); g.translate(lx, ly); g.scale(kq, kq);
      g.strokeStyle = C.steelDim; g.lineWidth = 2; g.setLineDash([9, 7]); g.beginPath(); g.arc(0, 0, 105, 0, TAU); g.stroke(); g.setLineDash([]);
      engrave(g, '円？', 0, 26, 1, `700 76px ${MIN}`, C.steel, { align: 'center', spark: false });
      g.restore();
    }
    // chữ quanh ô kính (câu 141–142) — trượt ra khi ô kính về chỗ chờ
    const o1 = outCubic(prog(t, T.e142, T.e142 + 0.6));
    if (o1 < 1) {
      g.save(); g.translate(0, -500 * o1);
      engrave(g, 'どこかの数式で', 960, 300, prog(t, T.suushiki, T.suushiki + 0.6), `500 32px ${JP}`, C.dim, { align: 'center', ls: 6 });
      g.restore();
      const o0 = outCubic(prog(t, T.l142 - 0.2, T.l142 + 0.4));
      g.save(); g.translate(-1200 * o0, 500 * o1);
      telop(g, [['その奥を ', `700 42px ${MIN}`], ['のぞいてみる', `700 42px ${MIN}`, C.brassHi]], 960, 860, prog(t, T.zehi, T.nozoite + 0.4), { size: 42, align: 'center' });
      g.restore();
      g.save(); g.translate(0, 500 * o1);
      telop(g, [['円は ', `700 42px ${MIN}`, C.steel], ['どこにもない？', `700 42px ${MIN}`]], 960, 860, prog(t, T.doko - 0.1, T.e142 - 0.2), { size: 42, align: 'center' });
      g.restore();
    }
    // ── đường chuông 正規分布 (câu 143) ──
    const kb = prog(t, T.seiki - 0.1, T.seiki + 1.0);
    if (t > T.toukei - 0.3) {
      engrave(g, '統計 ・ 正規分布', 160, 300, prog(t, T.toukei, T.seiki + 0.6), `500 30px ${JP}`, C.brass, { ls: 4 });
      rule(g, BX - 350, BX + 350, BY + BH, prog(t, T.toukei, T.toukei + 0.6));
      if (kb > 0) {
        g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 2.6; g.lineJoin = 'round'; g.shadowColor = 'rgba(243,223,162,0.4)'; g.shadowBlur = 6; g.beginPath();
        const N = 140, m = Math.round(N * kb);
        for (let i = 0; i <= m; i++) { const x = -3.2 + 6.4 * i / N, px = BX + x * BU, py = BY + BH - BH * bell(x); i ? g.lineTo(px, py) : g.moveTo(px, py); }
        g.stroke(); g.restore();
      }
      telop(g, [['式に ', `700 40px ${MIN}`], ['√', `500 44px ${JP}`, C.brassHi], ['(2', `600 52px ${CG}`, C.brassHi], ['π', `600 52px ${CG}`, C.shu], [')', `600 52px ${CG}`, C.brassHi]],
        BX, BY + BH + 86, prog(t, T.root - 0.2, T.haitte + 0.2), { size: 44, align: 'center' });
    }
    // ── 1 + 1/4 + 1/9 + 1/16 + … → π²/6 (câu 144) ──
    if (t > T.sum - 0.3) {
      const f = `500 54px ${CG}`, d = C.dim;
      engrave(g, [['1', f], [' + ', f, d], ['1/4', f], [' + ', f, d], ['1/9', f], [' + ', f, d], ['1/16', f], [' + …', f, d]], SX0, 380, prog(t, T.sum, T.sum + 5.0), f, C.ivory);
      const kn = prog(t, T.towa, T.pi6 - 0.15), N = Math.max(1, Math.round(1000 ** kn)), S = this.S[N];
      if (t > T.towa - 0.2) {
        rule(g, SX0, SX0 + SW, SBAR, prog(t, T.towa - 0.2, T.towa + 0.3), { a: 0.6 });
        const xm = SX0 + SW * (Math.PI ** 2 / 6) / SMAX;
        g.save(); g.strokeStyle = C.brassHi; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(SX0, SBAR - 8); g.lineTo(SX0 + SW * S / SMAX * smooth(prog(t, T.towa, T.towa + 0.3)), SBAR - 8); g.stroke();
        g.strokeStyle = C.ivory; g.lineWidth = 1.5; g.beginPath(); g.moveTo(xm, SBAR - 30); g.lineTo(xm, SBAR + 10); g.stroke(); g.restore();
        engrave(g, [['π', `600 34px ${CG}`], ['²/6', `500 30px ${CG}`]], xm, SBAR + 50, prog(t, T.pi6, T.pi6 + 0.4), undefined, C.ivory, { align: 'center', spark: false });
        engrave(g, [[String(N), `500 30px ${MONO}`, C.brassHi], ['項までの和 ', `500 28px ${JP}`, C.dim], [S.toFixed(4), `500 30px ${MONO}`, C.ivory]], SX0, SBAR - 50, 1, undefined, C.ivory, { spark: false });
      }
      engrave(g, [['= ', `500 64px ${CG}`, C.dim], ['π', `600 80px ${CG}`, C.shu], ['²', `600 64px ${CG}`, C.ivory], ['/6', `500 64px ${CG}`, C.ivory],
        [`  ≈ ${this.BASEL}`, `500 34px ${MONO}`, C.dim]], SX0, 500, prog(t, T.pi6, T.pi6 + 0.7), undefined, C.ivory);
    }
    // ── 回転か、波か、隠れた円 (câu 145): ba vành nhỏ — vành thứ ba là ô kính vẽ lại ──
    telop(g, '掘り下げてみると', 1380, 190, prog(t, T.hori, T.hori + 0.7), { size: 38 });
    MED.forEach(([x, y], i) => {
      const a = [T.kaiten, T.nami, T.kakureta][i], k = prog(t, a - 0.2, a + 0.4);
      if (i < 2) ring360(g, x, y, 70, k, { rot: rot + i, numerals: false, thread: false });
      if (k <= 0) return;
      if (i === 0) needle(g, x, y, 62, 1.3 + (t - a) * 2.2, prog(t, a, a + 0.4));
      if (i === 1) { const kw = prog(t, a, a + 0.5); g.save(); g.beginPath(); g.arc(x, y, 76, 0, TAU); g.clip();
        g.strokeStyle = C.brassHi; g.lineWidth = 2.4; g.beginPath();
        for (let px = -76; px <= -76 + 152 * kw; px += 2) { const py = 28 * Math.sin(px / 18 - (t - a) * 3); px === -76 ? g.moveTo(x + px, y + py) : g.lineTo(x + px, y + py); }
        g.stroke(); g.restore(); }
      if (i === 2) circleLine(g, x, y, 70, prog(t, T.en145 - 0.1, T.en145 + 0.5), { w: 2.6 });
      engrave(g, MEDL[i], x + 136, y + 14, prog(t, a, a + 0.5), `700 40px ${MIN}`, i === 2 ? C.brassHi : C.ivory, { ls: 4 });
    });
  }
  /** Biển kênh (màn hình), dy = độ trượt vào. Đứng yên sau π trên huy hiệu (câu 148). */
  board(g, t, dy) {
    const T = this.T, { y, w, h } = BOARD;
    const x = BOARD.x + (BOARD_CX - BOARD.x) * smooth(prog(t, this.CENTER[0], this.CENTER[1]));
    g.save(); g.translate(0, dy);
    g.fillStyle = 'rgba(5,10,28,0.55)'; g.fillRect(x, y, w, h);
    g.strokeStyle = C.brass; g.lineWidth = 1.5; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    g.globalAlpha = 0.45; g.lineWidth = 1; g.strokeRect(x + 10.5, y + 10.5, w - 21, h - 21); g.globalAlpha = 1;
    const ex = x + 190, ey = y + h / 2;
    ring360(g, ex, ey, 120, 1, { rot: 0, numerals: false });
    engrave(g, 'π', ex, ey + 46, prog(t, T.name, T.name + 0.5), `600 130px ${CG}`, C.shu, { align: 'center' });
    const nx = x + 400;
    const N = engrave(g, [['99', `600 140px ${CG}`, C.brassHi], ['の発見', `700 104px ${MIN}`, C.ivory]], nx, y + 230, prog(t, T.arigatou - 0.2, T.arigatou + 0.7));
    rule(g, nx + 4, nx + 4 + N.w, y + 268, prog(t, T.arigatou + 0.3, T.arigatou + 1.0));
    telop(g, this.CTA, nx + 22, y + 360, prog(t, T.channel - 0.1, T.touroku + 0.3), { size: 46 });
    g.restore();
  }
}
