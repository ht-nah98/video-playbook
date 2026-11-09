// d1 · The engine and the brakes (p2 câu 99–107) — MỞ HỒI III.
// Bảng treo trên cao (toạ độ màn hình) hỏi lại câu hứa số 3, rồi ghi "MATH NEEDS INTUITION / BUT NOT THE FINAL WORD".
// Khu A (hai bài, vẽ lại thu nhỏ): ba cửa + thẻ "50/50" đã X (không buzzer) + bảng "STAY 1/3 · SWITCH 2/3" + 100 cửa nhỏ
//   ("A BETTER INTUITION") | bảng 0.999… = 1 + thẻ "STILL A LITTLE SHORT" đã dán nhãn (khoanh mực ở "different number system").
// Khu B (dolly ở "here's my view"): cột trực giác = thẻ hồng "ENGINE / SENSE, GUESS, / DISCOVER"; cột logic = bảng hổ phách
//   "BRAKES / CHECK / PROVE"; "driving off a cliff" → thẻ trượt về phía bảng, bị chặn lại (phanh).
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, flapSpin, ctr,
  bulbText, door, gutCard, markerW, tag, label, card, actTitle, figure, lookup, must } from '../kit.js';

const PAGE = W;
const BN = 34, BC = 34, BG = 5, BH = 56, BFX = 150, BFY = 140, BX0 = 320, BY0 = 186;   // bảng treo: 2 hàng × 34 ô

export default class Engine {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['fist'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd1');
    this.T = {
      question: w(99, 'question'), beginning: w(99, 'beginning'),
      two: w(100, 'two'), puzzles: w(100, 'puzzles'), together: w(100, 'together'),
      monty: w(101, 'monty'), mistake: w(101, 'mistake'), logic1: w(101, 'logic'), pulled: w(101, 'pulled'),
      build: w(102, 'build'), better: w(102, 'better'), hundred: w(102, 'hundred'), fool: w(102, 'fool'),
      zero: w(103, 'zero'), throw: w(103, 'throw'), came: w(103, 'came'), different: w(103, 'different'), system: w(103, 'system'),
      view: w(104, 'view'), math: w(105, 'math'), need: w(105, 'need'), final: w(105, 'final'), word: w(105, 'word'),
      int6: w(106, 'intuition'), engine: w(106, 'engine'), sense: w(106, 'sense'), guess: w(106, 'guess'), often: w(106, 'often'), prove: w(106, 'prove'),
      careful: w(107, 'careful'), proof: w(107, 'proof'), brakes: w(107, 'brakes'), driving: w(107, 'driving'), cliff: w(107, 'cliff'),
      nearly: w(107, 'nearly'), doors: w(107, 'doors'), end: L(107).end,
    };
    this.START = L(99).start;
    this.FROM = Math.max(this.START - 2.6, L(98).end + 0.5);   // mở hồi: không đè câu cuối c6 (§64)
    this.PAN = this.T.view - 0.35;
    const V = this.V = {
      q: must('2 + 1', 3), gut: must('1 / 2 * 100', 50),
      stay: '1/3', sw: '2/3', n: must('10 * 10', 100), open: must('10 * 10 - 2', 98),
    };
    must('1/3 + 2/3', 1);
    this.PICK = 34 - 1; this.LIT = 78 - 1;                      // đúng b5-hundred: chọn cửa 34, cửa còn lại 78 (1-based)
    const T = this.T;
    // bảng treo: [lúc bắt đầu, lúc xong, hàng, chuỗi]
    this.BOARD = [
      [T.beginning, T.beginning + 1.6, 0, 'DOES MATH NEED INTUITION AT ALL?'],
      [T.two, T.together + 0.2, 1, 'TWO PUZZLES · TWO SIDES'],
      [T.need, T.need + 1.1, 0, 'MATH NEEDS INTUITION'],
      [T.need + 0.5, T.word + 0.3, 1, 'BUT NOT THE FINAL WORD'],
    ];
    for (const [, , , s] of this.BOARD) if ([...s].length > BN) throw new Error('d1: hàng bảng quá ' + BN + ' ô: ' + s);
    this.ENG = ['ENGINE', 'SENSE, GUESS,', 'DISCOVER'];
    // k viết theo dòng: dòng i xong ở tỉ lệ bề rộng tích luỹ (xấp xỉ độ dài nét)
    const ws = this.ENG.map(s => markerW(s, 1)), tot = ws.reduce((a, b) => a + b, 0);
    this.ENGK = ws.reduce((a, v, i) => (a.push((a[i - 1] ?? 0) + v / tot), a), []);
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.beginning, kind: 'flap' }, { t: T.two, kind: 'flap' }, { t: T.logic1, kind: 'flap' },
      { t: T.hundred, kind: 'tick' }, { t: T.fool, kind: 'chip' },
      { t: T.need, kind: 'flap' }, { t: T.engine, kind: 'pen' }, { t: T.careful, kind: 'flap' },
    ];
  }
  cam(t) { return PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9)); }

  render(g, t) {
    const T = this.T, cx = this.cam(t);
    ground(g);
    g.save(); g.translate(-cx, 0);
    if (cx < PAGE) this.zoneA(g, t);
    if (cx > 0) this.zoneB(g, t);
    g.restore();
    this.board(g, t);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'act three', 'the engine and the brakes');
    // fist: "math DOES need intuition" — một bên khung phải, 504.7 → 511.9
    const kf = Math.min(prog(t, T.math - 0.15, T.math + 0.25), 1 - prog(t, T.sense + 0.9, T.sense + 1.3));
    if (kf > 0) figure(g, 'fist', 1625, 1080, 720, kf);
    actTitle(g, t, this.START, 'three', 'DOES MATH NEED INTUITION?', 'ANSWERS 3');
  }

  board(g, t) {
    const T = this.T, fw = BX0 - BFX + flapW(BN, BC, BG) + 46, fh = 2 * BH + 10 + 92;
    bulbs(g, BFX, BFY, fw, fh, t);
    bulbText(g, String(this.V.q), BFX + 98, BFY + 50, 120, prog(t, T.question - 0.05, T.question + 0.3), { align: 'center', pitch: 10, r: 4 });
    for (let r = 0; r < 2; r++) {
      let s = ' '.repeat(BN), p = s, k = 1;
      for (const [a, b, row, str] of this.BOARD) { if (row !== r || t < a) continue; p = s; s = ctr(str, BN); k = prog(t, a, b); }
      flap(g, s, BX0, BY0 + r * (BH + 10), BC, k, { from: p, gap: BG, h: BH });
    }
  }

  // ── khu A: hai bài, vẽ lại thu nhỏ ──
  zoneA(g, t) {
    const T = this.T, V = this.V, dw = 120, dh = 220, dy = FLOOR - dh, xs = [165, 315, 465];
    const fc = 20, fg = 3, fs = `STAY ${V.stay} · SWITCH ${V.sw}`, fwid = flapW(fs, fc, fg), fx = 375 - fwid / 2, fy = 452;
    const gx0 = 690, gp = 26, gq = 34, gy0 = FLOOR - 10 * gq;
    const nb = '0.999… = 1', nc = 46, ngp = 6, nw = flapW(nb, nc, ngp), nx = 1447 - nw / 2, ny = 470;
    reflect(g, FLOOR, d => {
      xs.forEach((x, i) => door(d, x, dy, dw, dh, i + 1, i === 2 ? 1 : 0, { behind: 'goat' }));
      // "logic pulled us back": bảng nhỏ STAY · SWITCH
      if (t > T.logic1 - 0.4) {
        bulbs(d, fx - 30, fy - 30, fwid + 60, 33 + 60, t, { pad: 12, r: 4, step: 22 });
        flap(d, fs, fx, fy, fc, prog(t, T.logic1, T.pulled + 0.5), { gap: fg, h: 33 });
      }
      // 100 cửa nhỏ: hiện ở "build", 98 cửa mở loạt ở "hundred doors", cửa còn lại sáng
      const kg = prog(t, T.build - 0.1, T.build + 0.5);
      if (kg > 0) for (let i = 0; i < V.n; i++) {
        const c = i % 10, r = Math.floor(i / 10), x = gx0 + c * gp, y = gy0 + r * gq, e = outBack(clamp(kg * 1.6 - (r / 10) * 0.6));
        if (e <= 0) continue;
        const keep = i === this.PICK || i === this.LIT, to = T.hundred + (hash(i * 2.71) * 0.8 + (i / V.n) * 0.4);
        const op = keep ? 0 : prog(t, to, to + 0.18);
        this.miniDoor(d, x, y + (1 - e) * 20, 20, 30, op, i === this.LIT ? prog(t, T.hundred + 1.25, T.hundred + 1.6) : 0);
        if (i === this.PICK) { d.strokeStyle = C.ink; d.lineWidth = 2; d.strokeRect(x - 3, y - 3, 26, 36); }
      }
      bulbs(d, nx - 40, ny - 40, nw + 80, Math.round(nc * 1.64) + 80, t, { pad: 14, r: 5, step: 28 });
      flap(d, nb, nx, ny, nc, 1, { gap: ngp });
      flapSpin(d, '9', nx + 4 * (nc + ngp), ny, nc, t);
    });
    label(g, 'puzzle one', 520, 410, C.ink, 'center', 22, prog(t, T.puzzles, T.puzzles + 0.5));
    label(g, 'puzzle two', 1447, 410, C.ink, 'center', 22, prog(t, T.together - 0.3, T.together + 0.2));
    // thẻ "50/50" — đã X từ b2 (vẽ lại nguyên trạng, không buzzer); rung ở "mistake"
    const wob = t > T.mistake && t < T.mistake + 1 ? Math.sin((t - T.mistake) * 16) * 0.05 * (1 - (t - T.mistake)) : 0;
    gutCard(g, `${V.gut}/${V.gut}`, 360, 905, 320, 160, 1, { state: 'x', kx: 1, rise: prog(t, T.puzzles - 0.2, T.puzzles + 0.3), rot: -0.05 + wob, seed: 31 });
    if (t > T.better) tag(g, 'a better intuition', 820, 880, prog(t, T.fool - 0.15, T.fool + 0.2), { rot: -0.04, size: 20 });
    // thẻ "STILL A LITTLE SHORT" + nhãn — giữ nguyên trạng c6; rung ở "throw … away" nhưng ở lại; khoanh mực ở "different"
    const wb2 = t > T.throw && t < T.throw + 1 ? Math.sin((t - T.throw) * 14) * 0.04 * (1 - (t - T.throw)) : 0;
    const cxr = 1447, cyr = 860;
    gutCard(g, 'STILL A\nLITTLE SHORT', cxr, cyr, 470, 220, 1, { state: 'label', label: 'a different number system', kx: 1,
      rise: prog(t, T.together - 0.2, T.together + 0.3), rot: 0.04 + wb2, seed: 47 });
    const kc = prog(t, T.different, T.system + 0.4);
    if (kc > 0) {
      g.save(); g.translate(cxr, cyr); g.rotate(0.04); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.ellipse(470 * 0.08, 220 * 0.33, 270, 48, -0.05, -2.2, -2.2 + 6.6 * kc); g.stroke(); g.restore();
    }
    // tiêu điểm: bài một ở 101–102, bài hai ở 103 (vùng kia tối đi, không biến mất)
    const dimR = Math.min(prog(t, T.monty - 0.3, T.monty + 0.2), 1 - prog(t, T.zero - 0.3, T.zero + 0.2));
    const dimL = prog(t, T.zero - 0.3, T.zero + 0.2);
    const shade = (a, right) => { if (a <= 0) return;                    // mép mờ 160 px, không thành vạch cứng
      const gr = g.createLinearGradient(980, 0, 1140, 0), c0 = `rgba(10,5,6,${0.5 * a})`, c1 = 'rgba(10,5,6,0)';
      gr.addColorStop(0, right ? c1 : c0); gr.addColorStop(1, right ? c0 : c1); g.fillStyle = gr; g.fillRect(0, 370, W, H - 370); };
    shade(dimR, true); shade(dimL, false);
  }
  miniDoor(d, x, y, w, h, op, lit) {
    d.fillStyle = C.frame; d.fillRect(x - 2, y - 2, w + 4, h + 2);
    if (op <= 0) { d.fillStyle = C.door; d.fillRect(x, y, w, h); d.fillStyle = 'rgba(0,0,0,0.25)'; d.fillRect(x + 3, y + 3, w - 6, h * 0.45); }
    else { d.fillStyle = '#3A2418'; d.fillRect(x, y, w, h); d.fillStyle = C.doorD; d.fillRect(x + w, y, 7 * op, h); }
    if (lit > 0) { d.save(); d.shadowColor = 'rgba(255,180,60,0.9)'; d.shadowBlur = 22 * lit; d.fillStyle = `rgba(255,192,74,${0.85 * lit})`;
      d.fillRect(x, y, w, h); d.strokeStyle = C.amber; d.lineWidth = 3; d.strokeRect(x - 3, y - 3, w + 6, h + 4); d.restore(); }
  }

  // ── khu B: động cơ và phanh ──
  zoneB(g, t) {
    const T = this.T, X = PAGE, ex = X + 470, ey = 615, bc = 52, bgp = 7, bw = flapW(6, bc, bgp), bh = Math.round(bc * 1.64);
    const bx = X + 900, by = 470;
    label(g, 'intuition', ex, 420, C.ink, 'center', 22, prog(t, this.PAN + 0.6, this.PAN + 1.2));
    label(g, 'logic', bx + bw / 2, 420, C.ink, 'center', 22, prog(t, this.PAN + 0.8, this.PAN + 1.4));
    reflect(g, FLOOR, d => {
      bulbs(d, bx - 50, by - 50, bw + 100, 3 * bh + 2 * 14 + 100, t);
      const rows = [['BRAKES', T.brakes - 0.1], ['CHECK', T.careful], ['PROVE', T.proof]];
      rows.forEach(([s, a], i) => flap(d, ctr(s, 6), bx, by + i * (bh + 14), bc, prog(t, a, a + 0.7), { gap: bgp }));
    });
    // ô chờ cho thẻ (viền đứt) tới khi thẻ bật lên
    const rise = prog(t, T.int6 - 0.2, T.int6 + 0.3);
    if (rise < 1 && t > this.PAN) {
      g.save(); g.strokeStyle = 'rgba(234,220,192,0.4)'; g.lineWidth = 3; g.setLineDash([14, 9]);
      g.strokeRect(ex - 280, ey - 170, 560, 340); g.restore();
    }
    // viết theo dòng: ENGINE ở "engine", SENSE, GUESS, ở sense → guess, DISCOVER ở "often … prove"
    const K = this.ENGK, k = t < T.sense ? K[0] * prog(t, T.engine, T.engine + 0.6)
      : t < T.often ? K[0] + (K[1] - K[0]) * prog(t, T.sense, T.guess + 0.5) : K[1] + (K[2] - K[1]) * prog(t, T.often, T.prove);
    // "driving off a cliff": trượt về phía bảng phanh, bị chặn lại
    const sk = outCubic(prog(t, T.driving, T.cliff + 0.1)), jolt = t > T.cliff + 0.1 && t < T.cliff + 0.9 ? Math.sin((t - T.cliff - 0.1) * 26) * 10 * (1 - (t - T.cliff - 0.1) / 0.8) : 0;
    const back = smooth(prog(t, T.nearly, T.doors + 0.3)) * 60;
    gutCard(g, this.ENG.join('\n'), ex + sk * 110 + jolt - back, ey, 560, 340, k, { rise, rot: -0.03 + sk * 0.05 - back * 0.0006, seed: 61 });
  }
}
