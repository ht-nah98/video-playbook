// e2 · Next time (p2 câu 118–123) — cảnh CUỐI video.
// Bảng treo lật "TRY THIS ON YOUR OWN"; "an answer pops into your head" → thẻ trực giác TRẮNG TRỐNG bật lên; "two questions" →
// số đèn 1 · 2 cạnh thẻ; hai câu hỏi viết hồng vào thẻ đúng lúc đọc; "thank you" → `wave`; "the doors or the nines?" lật vào
// bảng + "TELL ME IN THE COMMENTS"; "subscribe" → mọi thứ rời khung, BẢNG ĐÈN KÊNH "99% FROM SCRATCH" + "SUBSCRIBE" thả vào.
// LUẬT OUTRO: từ FREEZE trở đi khung ĐỨNG YÊN TUYỆT ĐỐI (render dùng min(t, FREEZE) — đèn không chạy) tới hết trang.
import { W, H, C, FLOOR, clamp, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, ctr, bulbText, gutCard,
  markerW, label, card, figure, lookup, must } from '../kit.js';

const BN = 24, BC = 44, BG = 6, BH = 72, BX = (W - flapW(BN, BC, BG)) / 2, BY = 186;
const CX = 880, CYc = 640, CW = 1000, CH = 470;

export default class Next {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e2');
    this.T = {
      something: w(118, 'something'), pops: w(119, 'pops'), two: w(119, 'two'), questions: w(119, 'questions'),
      who: w(120, 'who'), counted: w(120, 'counted'), which: w(120, 'which'), in: w(120, 'in'),
      thank: w(121, 'thank'), which2: w(122, 'which'), doors: w(122, 'doors'), nines: w(122, 'nines'), tell: w(122, 'tell'), comments: w(122, 'comments'),
      and3: L(123).start, subscribe: w(123, 'subscribe'), nn: w(123, 'ninety-nine'), scratch: w(123, 'scratch'), end: L(123).end,
    };
    this.START = L(118).start;
    this.FROM = this.START - 1.2;
    if (this.FROM < L(117).end + 0.5 - 1e-9) throw new Error('e2: FROM đè câu cuối cảnh trước');
    const T = this.T;
    // tên kênh sáng xong ở "scratch" + 0.25 → đứng yên từ đó; trang dài tới end + TAIL (2.0): phải ≥ 4 s đứng yên
    this.FREEZE = T.scratch + 0.25;
    const tail = 2.0;                                            // build.json p2.tail
    if (T.end + tail - this.FREEZE < 4) throw new Error(`e2: outro đứng yên ${(T.end + tail - this.FREEZE).toFixed(2)} s < 4 s`);
    this.Q = ['WHO KNOWS SOMETHING', "I HAVEN'T COUNTED?", 'WHICH NUMBER SYSTEM', 'AM I IN?'];
    const ws = this.Q.map(s => markerW(s, 1)), tot = ws.reduce((a, b) => a + b, 0);
    this.QK = ws.reduce((a, v, i) => (a.push((a[i - 1] ?? 0) + v / tot), a), []);
    this.V = { two: must('1 + 1', 2), pct: must('100 - 1', 99) };
    this.BOARD = [[T.something, 'TRY THIS ON YOUR OWN'], [T.which2 - 0.17, 'THE DOORS OR THE NINES?']];
    for (const [, s] of this.BOARD) if (s.length > BN) throw new Error('e2: hàng quá dài ' + s);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.something, kind: 'flap' }, { t: T.who, kind: 'pen' }, { t: this.BOARD[1][0], kind: 'flap' }, { t: T.subscribe, kind: 'shimmer' }];
  }

  render(g, t0) {
    const t = Math.min(t0, this.FREEZE), T = this.T;
    ground(g);
    const leave = smooth(prog(t, T.and3 - 0.05, T.subscribe + 0.35));          // "and subscribe": mọi thứ rời khung
    // bảng treo — kéo lên khỏi khung
    if (leave < 1) {
      g.save(); g.translate(0, -leave * 420);
      bulbs(g, BX - 46, BY - 46, flapW(BN, BC, BG) + 92, BH + 92, t);
      let s = ' '.repeat(BN), p = s, k = 1;
      for (const [at, str] of this.BOARD) { if (t < at) break; p = s; s = ctr(str, BN); k = prog(t, at, at + 1.9); }
      flap(g, s, BX, BY, BC, k, { from: p, gap: BG, h: BH });
      g.restore();
      // thẻ trực giác: trắng trống bật lên ở "pops", hai câu hỏi viết vào; rơi xuống khi rời khung
      const K = this.QK;
      const k1 = K[1] * prog(t, T.who, T.counted + 0.6), k2 = (K[3] - K[1]) * prog(t, T.which, T.in + 0.5);
      const drop = leave * 900;
      gutCard(g, this.Q.join('\n'), CX, CYc + drop, CW, CH, k1 + k2, { rise: prog(t, T.pops - 0.15, T.pops + 0.35), rot: -0.025, seed: 71 });
      // số đèn 1 · 2 cạnh thẻ ở "two questions"
      const kn = prog(t, T.pops + 0.2, T.pops + 0.5);
      if (kn > 0) {
        g.save(); g.translate(0, drop + (1 - outCubic(kn)) * 300);
        bulbText(g, '1', 300, 470, 120, prog(t, T.two - 0.05, T.two + 0.25), { align: 'center', pitch: 10, r: 4 });
        bulbText(g, String(this.V.two), 300, 650, 120, prog(t, T.questions, T.questions + 0.3), { align: 'center', pitch: 10, r: 4 });
        g.restore();
      }
      label(g, 'tell me in the comments', CX, 960 + drop, C.ink, 'center', 28, prog(t, T.tell, T.comments + 0.4));
    }
    // wave: "thank you for watching" → lặn xuống ở "and subscribe"
    const kw = Math.min(prog(t, T.thank - 0.15, T.thank + 0.25), 1 - prog(t, T.and3 - 0.1, T.subscribe + 0.2));
    if (kw > 0) figure(g, 'wave', 1690, 1080, 720, kw);
    // BẢNG ĐÈN KÊNH (toạ độ màn hình): thả vào ở "subscribe", tên kênh sáng ở "ninety-nine … scratch"
    const kb = prog(t, T.subscribe - 0.1, T.subscribe + 0.45);
    if (kb > 0) {
      const mw = 1320, mh = 540, mx = (W - mw) / 2, my = 230, dy = (1 - outBack(kb)) * -900;
      g.save(); g.translate(0, dy);
      reflect(g, FLOOR, d => {
        bulbs(d, mx, my, mw, mh, t);
        const nm = `${this.V.pct}% FROM SCRATCH`;
        const bw = bulbText(d, nm, W / 2, my + 125, 120, prog(t, T.nn, T.scratch + 0.2), { align: 'center', pitch: 10, r: 4 });
        if (bw > mw - 140) throw new Error('e2: tên kênh tràn bảng ' + bw);
        const sc = 64, sgp = 8, sw = flapW(9, sc, sgp);
        flap(d, 'SUBSCRIBE', (W - sw) / 2, my + 320, sc, prog(t, T.subscribe, T.nn), { gap: sgp });
      });
      g.restore();
    }
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.3), 'act four', 'next time');
  }
}
