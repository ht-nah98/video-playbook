// a0 · Cold open (p1) — cảnh MẪU của đạo diễn. Một sân khấu game show, camera dolly ngang qua bốn khu (mỗi khu một khung):
//   A hộp Bertrand: bảng lật treo trên cao (logic), bục chàm + túi nhung; ba lá bài ra khỏi túi, mỗi lá lật khoe hai mặt;
//     rút một lá đặt lên giá, mặt đỏ; "OTHER SIDE RED? · CHANCE = ?"; thẻ trực giác bật lên viết "50%" (ponder) → X đỏ còi
//     sai ở "wrong" → "?" lật thành "2/3", "WHY? → PART 1".
//   B thẻ 50% đi theo sang khu B (cửa sập): nhãn in "INTUITION"; "= A TRAP" → cửa sập mở, thẻ rơi; thư rơi đầy sàn (bao thư
//     mồi cho b4), thẻ mới bật lên từ đống thư "YOU'RE WRONG!" — "TRUSTED THEIR GUT / OVER THE CALCULATION".
//   C mục lục lời hứa: bảng lớn ba hàng 1 · 2 · 3 (số bằng bóng đèn bật đúng chữ "One./Two./three.", câu hỏi lật vào).
//   D xem trước hai bài: ba cửa (cửa 3 mở ra dê) + thẻ "50/50" · bảng 0.999… (ô 9 lật mãi) + thẻ "STILL A LITTLE SHORT"
//     (twoways); màn nhung khép → đen kín → intro.
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, flapSpin, ctr,
  bulbText, door, playingCard, gutCard, tag, label, text, curtain, figure, lookup, must } from '../kit.js';

const PAGE = W;                                             // mỗi khu sân khấu cách nhau một khung
const N = 20, CELL = 46, GAP = 6, BX = (W - flapW(N, CELL, GAP)) / 2, BY = 110;   // bảng treo khu A/B: 2 hàng × 20 ô
const lft = (s, pad = 4) => (' '.repeat(pad) + s).padEnd(N);  // canh trái trong hàng (giữ "CHANCE = " đứng yên khi lật)

export default class Open {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['ponder', 'twoways'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      quick: w(0, 'quick'), think0: w(0, 'think'),
      three1: w(1, 'three'), bag: w(1, 'bag'), rr: w(1, 'one'), rrBoth: w(1, 'both'), ww: w(1, 'one', 2), wwBoth: w(1, 'both', 2),
      rw: w(1, 'one', 3), rwWhite: w(1, 'white', 2),
      pull: w(2, 'pull'), put: w(2, 'put'), table: w(2, 'table'), side2: w(2, 'side'), red2: w(2, 'red'),
      chance: w(3, 'chance'), q: L(3).start,
      popped: w(4, 'popped'), fifty: w(4, 'fifty'), percent: w(4, 'percent'),
      redred: w(5, 'red-red'), redwhite: w(5, 'red-white'), two5: w(5, 'two'), each: w(5, 'each'), feels: w(5, 'feels'),
      wrong: w(6, 'wrong'), two6: w(6, 'two'), first: w(6, 'first'), e6: L(6).end,
      instant: w(7, 'instant'), before7: w(7, 'before'), intuition7: w(7, 'intuition'),
      some: w(8, 'some'), trap: w(8, 'trap'),
      puzzle9: w(9, 'puzzle'), thousands: w(9, 'thousands'), professors: w(9, 'professors'), maths: w(9, 'mathematics'), argued: w(9, 'argued'),
      trusted: w(9, 'trusted'), gut9: w(9, 'gut'), over: w(9, 'over'),
      threeQ: w(10, 'three'), q1: L(11).start, q2: L(12).start, q3: w(13, 'three'), logic: w(13, 'logic'),
      two14: w(14, 'two'), one14: w(14, 'one'), int14: w(14, 'intuition'), loses14: w(14, 'loses'),
      one15: w(15, 'one'), int15: w(15, 'intuition'), refuses: w(15, 'refuses'), end: L(15).end,
    };
    const T = this.T;
    this.PAN = [L(7).start - 0.6, L(10).start - 0.5, L(14).start - 0.5];
    this.START = L(0).start; this.FROM = -0.6;
    // hộp Bertrand: ba lá, đếm MẶT — 3 mặt đỏ, 2 thuộc lá đỏ–đỏ → 2/3 (CONTENT "Đúng — giữ nguyên")
    const cards = ['RR', 'WW', 'RW'], faces = cards.join('');
    const redFaces = [...faces].filter(f => f === 'R').length, onRR = [...cards[0]].filter(f => f === 'R').length;
    must(`${onRR} / ${redFaces}`, 2 / 3);
    this.V = { n: must('[0, 1, 2].length', 3), ans: `${onRR}/${redFaces}`, gut: must('1 / 2 * 100', 50) };
    // bảng treo khu A/B: [mốc, hàng 1, hàng 2] — mỗi mục là một lần lật (một tiếng flap)
    const V = this.V;
    this.BOARD = [
      [T.quick, ctr('QUICK ONE', N), null],
      [T.think0, null, ctr("DON'T THINK TOO HARD", N)],
      [T.three1, ctr(`${V.n} CARDS IN A BAG`, N), ' '.repeat(N)],
      [T.pull, ctr('PULL ONE, NO LOOKING', N), null],
      [T.side2, null, ctr('FACE UP: RED', N)],
      [T.chance, ctr('OTHER SIDE RED?', N), lft('CHANCE = ?')],
      [T.two6, null, lft(`CHANCE = ${V.ans}`)],
      [T.first, ctr('WHY? → PART 1', N), null],
      [T.instant, ctr('THE INSTANT ANSWER', N), ' '.repeat(N)],
      [T.before7, null, ctr('BEFORE ANY THINKING', N)],
      [T.trap, null, ctr('= A TRAP', N)],
      [T.thousands, ctr('THOUSANDS ARGUED', N), ' '.repeat(N)],
      [T.professors, null, ctr('PROFESSORS TOO', N)],
      [T.trusted, ctr('TRUSTED THEIR GUT', N), ' '.repeat(N)],
      [T.over, null, ctr('OVER THE CALCULATION', N)],
    ];
    this.Q = [                                                   // mục lục lời hứa (≤ 35 ô)
      [T.q1, 'WHEN DOES INTUITION LEAD YOU WRONG?'],
      [T.q2, 'PROOF RIGHT, GUT SAYS NO. NOW WHAT?'],
      [T.q3, 'DOES MATH NEED INTUITION AT ALL?'],
    ];
    if (this.Q.some(([, s]) => s.length > 35)) throw new Error('a0: câu hứa quá 35 ô');
  }
  sfx() {
    const T = this.T;
    return [
      ...this.BOARD.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.rr, kind: 'card' }, { t: T.rw, kind: 'card' }, { t: T.table, kind: 'card' },
      { t: T.fifty, kind: 'pen' }, { t: T.wrong, kind: 'buzzer' },
      { t: T.intuition7, kind: 'chip' }, { t: T.trap + 0.3, kind: 'whoosh' },        // thẻ rơi qua cửa sập (flap '= A TRAP' ở T.trap)
      { t: T.gut9, kind: 'pen' },
      { t: T.threeQ, kind: 'flap' }, ...this.Q.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.loses14, kind: 'door' }, { t: T.one15, kind: 'flap' }, { t: T.int15, kind: 'pen' },
      { t: T.end + 0.12, kind: 'whoosh' },
    ];
  }
  cam(t) { return this.PAN.reduce((x, a) => x + PAGE * smooth(prog(t, a, a + 0.9)), 0); }

  render(g, t) {
    const T = this.T, cx = this.cam(t);
    ground(g);
    g.save(); g.translate(-cx, 0);
    if (cx < PAGE) this.zoneA(g, t);
    if (cx > 0 && cx < 2 * PAGE) this.zoneB(g, t);
    if (cx > PAGE && cx < 3 * PAGE) this.zoneC(g, t);
    if (cx > 2 * PAGE) this.zoneD(g, t);
    g.restore();
    this.board(g, t);
    this.gut(g, t, cx);
    // nhân vật (toạ độ màn hình): ponder khi câu hỏi được đặt ra (khu A); twoways — "một bài … và một bài" (khu D)
    const kp = Math.min(prog(t, T.q - 0.2, T.q + 0.15), 1 - prog(t, T.redred - 0.5, T.redred - 0.15));
    if (kp > 0) figure(g, 'ponder', 1690, 1080, 760, kp);
    if (cx > 2.5 * PAGE) figure(g, 'twoways', 1715, 1080, 760, prog(t, T.two14 + 0.1, T.two14 + 0.45));
    // câu treo: màn nhung khép kín → đen kín trước intro (khung cuối đen)
    curtain(g, prog(t, T.end - 0.33, T.end + 0.47), { black: prog(t, T.end + 0.47, T.end + 0.87) });
  }

  // ── bảng lật treo (khu A/B, toạ độ màn hình) — kéo lên khỏi khung khi sang khu C ──
  board(g, t) {
    const up = smooth(prog(t, this.PAN[1], this.PAN[1] + 0.7)) * 420;
    if (up >= 420) return;
    let r1 = ' '.repeat(N), r2 = ' '.repeat(N), p1 = r1, p2 = r2, k1 = 1, k2 = 1;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      const k = prog(t, at, at + 1.1);
      if (a != null) { p1 = r1; r1 = a; k1 = k; }
      if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    g.save(); g.translate(0, -up);
    bulbs(g, BX - 46, BY - 46, flapW(N, CELL, GAP) + 92, 2 * 75 + 12 + 92, t);
    flap(g, r1, BX, BY, CELL, k1, { from: p1, gap: GAP, h: 75 });
    flap(g, r2, BX, BY + 87, CELL, k2, { from: p2, gap: GAP, h: 75 });
    g.restore();
  }

  // ── khu A: bục + túi + ba lá bài ──
  zoneA(g, t) {
    const T = this.T, bagX = 700, top = 640, slot = [890, 1110, 1330], sy = 445;
    reflect(g, FLOOR, d => {
      // bục chàm, khung kem, mặt bục sáng
      d.fillStyle = C.doorD; d.fillRect(540, top, 940, FLOOR - top);
      d.fillStyle = C.door; d.fillRect(556, top + 18, 908, FLOOR - top - 30);
      d.fillStyle = C.frame; d.fillRect(530, top - 10, 960, 14); d.fillStyle = 'rgba(255,255,255,0.4)'; d.fillRect(530, top - 10, 960, 3);
      for (let i = 0; i < 12; i++) { d.fillStyle = 'rgba(0,0,0,0.18)'; d.fillRect(580 + i * 76, top + 34, 3, FLOOR - top - 60); }
      // giá đỡ lá bài (giữa bục)
      d.fillStyle = '#2A1A14'; d.beginPath(); d.moveTo(1035, top - 8); d.lineTo(1185, top - 8); d.lineTo(1175, top - 30); d.lineTo(1045, top - 30); d.fill();
      // túi nhung rơi xuống bục
      const kb = prog(t, T.three1 - 0.15, T.bag + 0.1);
      if (kb > 0) this.bag(d, bagX, top - 8 - (1 - outBack(kb)) * 700, t);
    });
    // ba lá bay ra khỏi túi, lật khoe hai mặt; "pull" → bay về túi
    const em = [T.rr, T.ww, T.rw], fl = [T.rrBoth, T.wwBoth, T.rwWhite], faces = ['RR', 'WW', 'RW'], names = ['RED · RED', 'WHITE · WHITE', 'RED · WHITE'];
    for (let i = 0; i < 3; i++) {
      const kin = outCubic(prog(t, em[i], em[i] + 0.45)), kout = smooth(prog(t, T.pull + i * 0.07, T.pull + 0.4 + i * 0.07));
      if (kin <= 0 || kout >= 1) continue;
      const k = kin * (1 - kout), x = bagX + (slot[i] - bagX) * k, y = 520 + (sy - 520) * k - Math.sin(k * Math.PI) * 60, s = 0.35 + 0.65 * k;
      playingCard(g, x, y, 136 * s, 200 * s, faces[i], 0, prog(t, fl[i], fl[i] + 0.5), { rot: (1 - k) * 0.4 });
      if (k > 0.85) label(g, names[i], x, sy + 140, C.ink, 'center', 22, prog(t, em[i] + 0.35, em[i] + 0.9));
    }
    // lá được rút: ra khỏi túi xoay cạnh (không lộ mặt), đặt lên giá ngửa mặt đỏ
    const kup = prog(t, T.put - 0.45, T.put), kdown = outCubic(prog(t, T.put, T.table + 0.05));
    if (kup > 0) {
      const lx = bagX + (1110 - bagX) * kdown, ly = 470 - 120 * Math.sin(kup * Math.PI / 2) * (1 - kdown) + (560 - 470) * kdown + (1 - kup) * 60;
      const spin = kdown < 1 ? 0.5 + 0.06 * Math.sin(t * 30) : 0;     // cạnh lá hướng về người xem khi đang bay
      playingCard(g, lx, ly, 150, 220, 'RW', 0, spin * (1 - kdown) + 0, { rot: (1 - kdown) * -0.3, squash: 0.9 + 0.1 * (1 - kdown) });
      // đèn rọi lá bài ở "side facing up is red"
      const ks = prog(t, T.side2, T.red2);
      if (ks > 0) {
        const sg = g.createRadialGradient(1110, 560, 20, 1110, 560, 220); sg.addColorStop(0, `rgba(255,214,150,${0.18 * ks})`); sg.addColorStop(1, 'rgba(255,214,150,0)');
        g.fillStyle = sg; g.fillRect(860, 330, 500, 400);
      }
    }
    // hai khả năng trực giác thấy: lá đỏ–đỏ hay lá đỏ–trắng (hai mặt đặt cạnh nhau, thu nhỏ)
    const pair = (x, at, f, name) => {
      const k = outBack(prog(t, at, at + 0.4)); if (k <= 0) return;
      g.save(); g.translate(x, sy); g.scale(k, k);
      playingCard(g, -40, 0, 70, 104, f, 0, 0, { rot: -0.05 }); playingCard(g, 40, 0, 70, 104, f, 1, 0, { rot: 0.05 });
      g.restore();
      label(g, name, x, sy + 100, C.ink, 'center', 22, prog(t, at + 0.2, at + 0.7));
    };
    pair(890, T.redred, 'RR', 'RED-RED'); pair(1330, T.redwhite, 'RW', 'RED-WHITE');
    label(g, 'TWO CARDS · ONE OF EACH', 1110, 372, C.ink, 'center', 22, prog(t, T.two5, T.each + 0.4));
  }
  bag(d, x, y, t) {                                         // túi nhung: (x, y) = tâm đáy
    const sh = this.T.pull + 0.45, shake = t > sh && t < sh + 0.6 ? Math.sin((t - sh) * 40) * 0.07 * (1 - (t - sh) / 0.6) : 0;
    d.save(); d.translate(x, y); d.rotate(shake);
    d.fillStyle = 'rgba(0,0,0,0.4)'; d.beginPath(); d.ellipse(0, 0, 95, 9, 0, 0, Math.PI * 2); d.fill();
    const bg = d.createLinearGradient(-90, 0, 90, 0); bg.addColorStop(0, '#3A0F12'); bg.addColorStop(0.45, '#7A2A2E'); bg.addColorStop(1, '#2A0A0C');
    d.fillStyle = bg; d.beginPath(); d.moveTo(-48, -170); d.bezierCurveTo(-120, -120, -110, -10, -70, 0); d.lineTo(70, 0);
    d.bezierCurveTo(110, -10, 120, -120, 48, -170); d.closePath(); d.fill();
    d.fillStyle = '#5A1A1E'; d.beginPath(); d.ellipse(0, -172, 54, 16, 0, 0, Math.PI * 2); d.fill();   // miệng túi
    d.fillStyle = '#140707'; d.beginPath(); d.ellipse(0, -172, 42, 10, 0, 0, Math.PI * 2); d.fill();
    d.strokeStyle = C.amberD; d.lineWidth = 5; d.beginPath(); d.moveTo(-50, -150); d.quadraticCurveTo(0, -138, 50, -150); d.stroke();   // dây rút
    d.beginPath(); d.moveTo(30, -146); d.quadraticCurveTo(46, -110, 34, -86); d.stroke();
    for (let i = 0; i < 5; i++) { d.fillStyle = 'rgba(255,200,180,0.06)'; d.fillRect(-60 + i * 26, -140, 3, 130); }
    d.restore();
  }

  // ── thẻ trực giác (toạ độ màn hình, trừ thẻ thư ở khu B và hai thẻ khu D đi theo sân khấu) ──
  gut(g, t, cx) {
    const T = this.T, V = this.V, P0 = this.PAN[0];
    // thẻ "50%": khu A (420, 905) → khu B (820, 560) theo đúng cú dolly; rơi xuống cửa sập ở "trap"
    if (t > T.popped - 0.2 && t < T.trap + 0.8) {
      const m = smooth(prog(t, P0, P0 + 0.9)), x = 420 + 400 * m, y0 = 905 - 345 * m;
      const wob = t > T.feels && t < T.feels + 1.2 ? Math.sin((t - T.feels) * 14) * 0.05 * (1 - (t - T.feels) / 1.2) : 0;
      const fall = Math.pow(prog(t, T.trap + 0.1, T.trap + 0.6), 2) * 900, F = FLOOR + 2;
      g.save();
      if (fall > 0) { g.beginPath(); g.rect(-100, -100, W + 200, F + 100); g.ellipse(820, 842, 280, 40, 0, 0, Math.PI * 2); g.clip(); }
      gutCard(g, `${V.gut}%`, x, y0 + fall, 440, 210, prog(t, T.fifty, T.percent + 0.3), {
        state: 'x', kx: prog(t, T.wrong, T.wrong + 0.3), rise: prog(t, T.popped - 0.2, T.popped + 0.3), rot: -0.06 + wob, seed: 11 });
      if (t > T.intuition7 - 0.1) tag(g, 'intuition', x + 20, y0 + fall - 150, prog(t, T.intuition7 - 0.1, T.intuition7 + 0.25), { rot: -0.04 });
      g.restore();
    }
    // khu B: thẻ mới bật lên từ đống thư
    const bx = PAGE + 1250 - cx;
    if (t > T.gut9 - 0.3 && bx > -400 && bx < W + 400)
      gutCard(g, "YOU'RE\nWRONG!", bx, 560, 420, 230, prog(t, T.gut9, T.gut9 + 0.9), { rise: prog(t, T.gut9 - 0.3, T.gut9 + 0.2), rot: 0.05, seed: 23 });
    // khu D: hai thẻ xem trước
    const dx = 3 * PAGE - cx;
    if (dx < W) {
      gutCard(g, `${V.gut}/${V.gut}`, dx + 460, 902, 340, 170, prog(t, T.int14, T.int14 + 0.8), { rise: prog(t, T.int14 - 0.3, T.int14 + 0.15), rot: -0.05, seed: 31 });
      gutCard(g, 'STILL A\nLITTLE SHORT', dx + 1065, 900, 420, 190, prog(t, T.int15, T.int15 + 1.4), { rise: prog(t, T.int15 - 0.3, T.int15 + 0.15), rot: 0.04, seed: 47 });
    }
  }

  // ── khu B: cửa sập + thư ──
  zoneB(g, t) {
    const T = this.T, X = PAGE, hx = X + 820, hy = 842;
    // cửa sập trên sàn: đường nối vẽ vào từ "some puzzles", mở ở "trap", đóng lại sau khi thẻ rơi
    const kd = prog(t, T.some, T.some + 0.8), op = Math.min(outCubic(prog(t, T.trap, T.trap + 0.18)), 1 - smooth(prog(t, T.trap + 0.75, T.trap + 1.1)));
    if (kd > 0) {
      g.save(); g.strokeStyle = 'rgba(234,220,192,0.45)'; g.lineWidth = 3; g.setLineDash([14, 9]);
      g.beginPath(); g.ellipse(hx, hy, 280, 40, 0, Math.PI, Math.PI + Math.PI * 2 * kd, false); g.stroke(); g.restore();
    }
    if (op > 0) {
      g.fillStyle = '#030202'; g.beginPath(); g.ellipse(hx, hy, 280, 40 * op, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(80,30,25,0.6)'; g.beginPath(); g.ellipse(hx, hy - 40 * op * 0.6, 270, 6 * op, 0, 0, Math.PI * 2); g.fill();
    }
    // thư rơi đầy sàn (bao thư kem, nắp chữ V) — mồi cho "Ten thousand letters"
    if (t > T.puzzle9) for (let i = 0; i < 64; i++) {
      const t0 = T.puzzle9 + Math.pow(hash(i * 1.37), 1.3) * 4.2,   // thư rơi suốt "one puzzle … argued by mail"
      k = prog(t, t0, t0 + 0.7); if (k <= 0) continue;
      const ex = X + 200 + hash(i * 3.7) * 1520, ey = FLOOR + 18 + hash(i * 5.1) * 120;            // nằm TRÊN sàn (trước mép sân khấu)
      const y = -120 + (ey + 120) * k * k, x = ex + Math.sin(k * 6 + i) * 40 * (1 - k), r = (hash(i * 7.9) - 0.5) * 0.9 + (1 - k) * 2.2 * (hash(i) - 0.5);
      g.save(); g.translate(x, y); g.rotate(r); g.scale(1, k < 1 ? 1 : 0.62);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-42, -24, 90, 56);
      g.fillStyle = i % 4 ? C.frame : '#F4EEE2'; g.fillRect(-45, -28, 90, 56);
      g.strokeStyle = 'rgba(42,26,20,0.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-45, -28); g.lineTo(0, 4); g.lineTo(45, -28); g.stroke();
      g.fillStyle = 'rgba(194,122,16,0.75)'; g.fillRect(28, -22, 11, 13);
      g.restore();
    }
  }

  // ── khu C: mục lục lời hứa ──
  zoneC(g, t) {
    const T = this.T, X = 2 * PAGE, cell = 36, gap = 5, rh = 60, x0 = X + 300, mx = X + 130, my = 70, mw = 1660, mh = 600;
    reflect(g, FLOOR, d => {
      bulbs(d, mx, my, mw, mh, t);
      flap(d, ctr(`${this.V.n} QUESTIONS`, 16), X + (W - flapW(16, 44, 6)) / 2, 130, 44, prog(t, T.threeQ, T.threeQ + 0.9), { gap: 6, h: 72 });
      this.Q.forEach(([at, s], i) => {
        const y = 250 + i * 128, lit = prog(t, at - 0.05, at + 0.25);
        bulbText(d, String(must(`${i} + 1`, i + 1)), X + 228, y - 34, 132, lit, { align: 'center', pitch: 10, r: 4.2 });
        flap(d, s.padEnd(35), x0, y, cell, prog(t, at + 0.15, at + 1.8), { gap, h: rh });
      });
    });
  }

  // ── khu D: hai bài sẽ gặp ──
  zoneD(g, t) {
    const T = this.T, X = 3 * PAGE, dw = 170, dh = 320, xs = [150, 370, 590].map(v => X + v), dy = FLOOR - dh;
    const cell = 40, gap = 5, bw = flapW(10, cell, gap), bx = X + 830, by = 300;
    reflect(g, FLOOR, d => {
      xs.forEach((x, i) => door(d, x, dy, dw, dh, i + 1, i === 2 ? outCubic(prog(t, T.loses14, T.loses14 + 0.5)) : 0, { behind: 'goat' }));
      bulbs(d, bx - 46, by - 46, bw + 92, Math.round(cell * 1.64) + 92, t);
      const k = prog(t, T.one15, T.one15 + 1.0), s = '0.999… = 1';
      flap(d, s, bx, by, cell, k, { gap });
      if (k >= 1) flapSpin(d, '9', bx + 4 * (cell + gap), by, cell, t - T.one15);
    });
    label(g, 'puzzle one', X + 455, dy - 42, C.ink, 'center', 22, prog(t, T.one14, T.one14 + 0.5));
    label(g, 'puzzle two', bx + bw / 2, by - 72, C.ink, 'center', 22, prog(t, T.one15 - 0.2, T.one15 + 0.3));
  }
}
