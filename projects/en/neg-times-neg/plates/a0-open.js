// a0 · Cold open (p1) — cảnh MẪU của đạo diễn. Một tấm thảm dài, camera đi xuống qua bốn vùng:
//   0 "1790s · GRENOBLE", (−) × (−) = (+) ? bằng gạch, "JUST LEARN THE RULE", ảnh Stendhal (ponder)
//   1 luật quen thuộc bằng gạch, "WHY?", ba giấy nhớ: CONVENTION (shrug) / DEBTS / TURN AROUND, "PROOF? OR A WAY TO REMEMBER?"
//   2 ba ô khay 1–3 = mục lục lời hứa (three) · 3 "NOT AN ARBITRARY CHOICE", một zero pair làm đúng việc của số,
//   câu treo: MỘT viên đỏ đứng giữa thảm "NOT A NUMBER?", iris khép vào nó → đen kín → intro (DNA §6).
import { W, H, C, CG, ARC, clamp, smooth, prog, ground, card, text, typed, label, mono, quote, eq, mid, tile, zeroPair,
  footprint, stickyNote, line, ring, figure, portrait, lookup, must } from '../kit.js';

const ZONE = 1080;                                    // mỗi vùng cách nhau một khung theo chiều dọc tấm thảm

export default class Open {
  static ERA = 'mat';
  static IMAGES = { stendhal: './assets/history/stendhal.jpg' };
  static POSES = ['ponder', 'shrug', 'three'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      nineties: w(0, 'nineties'), schoolboy: w(0, 'schoolboy'), grenoble: w(0, 'grenoble'), question: w(0, 'question'), why0: w(0, 'why'), minus1: w(0, 'minus'), times0: w(0, 'times'),
      minus2: w(0, 'minus', 2), make: w(0, 'make'), plus: w(0, 'plus'), e0: L(0).end,
      nobody: w(1, 'nobody'), reason: w(1, 'reason'), learn: w(1, 'learn'), on: w(1, 'on'),
      stendhal: w(2, 'stendhal'), forty: w(2, 'forty'), memoir: w(2, 'memoir'), e2: L(2).end,
      know: w(3, 'know'), rule3: w(3, 'rule'), neg1: w(3, 'negative'), neg2: w(3, 'negative', 2), positive: w(3, 'positive'),
      why: w(4, 'why'), mix: w(4, 'mix'),
      convention: w(5, 'convention'), accept: w(5, 'accept'), e5: L(5).end,
      debts: w(6, 'debts'), backwards: w(6, 'backwards'), turning: w(6, 'turning'), forwards: w(6, 'forwards'),
      proofs: w(7, 'proofs'), remember: w(7, 'remember'),
      video: w(8, 'video'), three: w(8, 'three'), q1: L(9).start, q2: L(10).start, q3: L(11).start, forced: w(11, 'forced'), e11: L(11).end,
      going: w(12, 'going'), rule12: w(12, 'rule'), arbitrary: w(12, 'arbitrary'), made: w(12, 'made'),
      happen: w(13, 'happen'), behave: w(13, 'behave'), like: w(13, 'like'), e13: L(13).end,
      history: w(14, 'history'), numbers: w(14, 'numbers'), all: w(14, 'all'), end: L(14).end,
    };
    this.PAN = [0, L(3).start - 0.75, L(8).start - 0.6, L(12).start - 0.5];
    this.START = L(0).start; this.FROM = -0.6;
    this.V = { r: must('(-1) * (-1)', 1), z: must('1 + (-1)', 0) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.minus1, kind: 'chip' }, { t: T.plus, kind: 'question' }, { t: T.learn - 0.2, kind: 'snap' },
      { t: T.stendhal - 0.1, kind: 'chip' }, { t: T.neg1, kind: 'chip' }, { t: T.why, kind: 'question' },
      { t: T.convention - 0.2, kind: 'snap' }, { t: T.debts - 0.2, kind: 'snap' }, { t: T.turning - 0.2, kind: 'snap' },
      { t: T.q1, kind: 'tick' }, { t: T.q2, kind: 'tick' }, { t: T.q3, kind: 'tick' },
      { t: T.like + 0.5, kind: 'pop' }, { t: T.history, kind: 'chip' }, { t: T.numbers + 0.2, kind: 'question' },
    ];
  }
  cam(t) {                                            // → {x, y}: vùng hiện tại + trôi chậm (3 px/s xuống) trong vùng
    const P = this.PAN; let s = 0; for (let i = 0; i < P.length; i++) if (t >= P[i]) s = i;
    const e = s ? smooth(prog(t, P[s], P[s] + 1.0)) : 1, from = s ? (s - 1) * ZONE + Math.min(60, 3 * (P[s] - P[s - 1])) : 0;
    const y0 = s * ZONE + Math.min(60, 3 * Math.max(0, t - P[s] - 1.0));
    return { x: 0, y: from + (y0 - from) * e };
  }
  render(g, t) {
    const T = this.T, c = this.cam(t);
    ground(g, 'mat', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < ZONE * 0.99) this.zone0(g, t);
    if (c.y > ZONE * 0.01 && c.y < ZONE * 1.99) this.zone1(g, t, ZONE);
    if (c.y > ZONE * 1.01 && c.y < ZONE * 2.99) this.zone2(g, t, 2 * ZONE);
    if (c.y > ZONE * 2.01) this.zone3(g, t, 3 * ZONE);
    g.restore();
    // toạ độ MÀN HÌNH: thẻ mục, nhân vật, màn đen cuối
    card(g, prog(t, 0.2, 1.6) - prog(t, this.PAN[1] - 0.6, this.PAN[1]), 'cold open', 'MINUS TIMES MINUS?');   // chỉ vùng 0: vùng sau trôi lên chỗ thẻ
    figure(g, 'ponder', 1640, H, 740, prog(t, T.schoolboy - 0.35, T.schoolboy) - prog(t, T.stendhal - 0.6, T.stendhal - 0.25));
    figure(g, 'shrug', 1620, H, 700, prog(t, T.convention - 0.5, T.convention - 0.15) - prog(t, T.e5, T.e5 + 0.35));
    figure(g, 'three', 1640, H, 740, prog(t, T.three - 0.5, T.three - 0.15) - prog(t, T.e11 + 0.2, T.e11 + 0.55));
    this.blackout(g, t);
  }
  zone0(g, t) {
    const T = this.T, s = 116, y = 330;
    mono(g, '1790s · GRENOBLE', 700, 236, prog(t, T.nineties - 0.3, T.grenoble + 0.4), C.dim, 22);
    quote(g, 'a schoolboy’s simple question', 700, 290, prog(t, T.schoolboy, T.question + 0.3), { size: 46, color: C.dim });
    // (−) × (−) = (+) ? — bằng gạch, mỗi viên rơi xuống đúng chữ
    tile(g, 700, y, s, 'n', { k: prog(t, T.minus1, T.minus1 + 0.35) });
    typed(g, '×', 700 + s + 50, y + s * 0.66, prog(t, T.times0, T.times0 + 0.15), `600 72px ${ARC}`, C.ink, { align: 'center' });
    tile(g, 700 + s + 100, y, s, 'n', { k: prog(t, T.minus2, T.minus2 + 0.35) });
    typed(g, '=', 700 + 2 * s + 150, y + s * 0.66, prog(t, T.make, T.make + 0.15), `600 72px ${ARC}`, C.ink, { align: 'center' });
    tile(g, 700 + 2 * s + 200, y, s, 'p', { k: prog(t, T.plus, T.plus + 0.35) });
    typed(g, '?', 700 + 3 * s + 250, y + s * 0.72, prog(t, T.plus + 0.25, T.plus + 0.45), `italic 600 120px ${CG}`, C.ink, { align: 'center' });
    // không ai giải thích: ô "REASON" trống, giấy nhớ "JUST LEARN THE RULE."
    label(g, 'reason:', 700, 548, prog(t, T.reason - 0.2, T.reason + 0.3));
    line(g, [[840, 552], [1080, 552]], C.dim, 2, { dash: [6, 8], k: prog(t, T.reason, T.reason + 0.4) });
    const inNote = stickyNote(g, 700, 610, 560, 150, prog(t, T.learn - 0.3, T.learn + 0.1), { rot: -0.03 });
    inNote(() => typed(g, 'JUST LEARN THE RULE.', 36, 96, prog(t, T.learn, T.on + 0.2), `800 40px ${ARC}`, C.noteInk, { ls: 1 }));
    // Stendhal: ảnh in dán thảm + tự truyện
    portrait(g, 'stendhal', 150, 230, 560, prog(t, T.stendhal - 0.1, T.stendhal + 0.5),
      { label: { name: 'Stendhal', life: 'Marie-Henri Beyle · 1783–1842', note: 'novelist' } });
    label(g, 'memoir · Vie de Henry Brulard · 1835–36', 700, 840, prog(t, T.memoir - 0.3, T.memoir + 0.8));
    label(g, '≈ 40 years later, still annoyed', 700, 878, prog(t, T.forty, T.forty + 0.9), { color: C.dim, size: 18 });
  }
  zone1(g, t, Y) {
    const T = this.T, s = 120, x0 = 220, y = Y + 250;
    label(g, 'the rule you know', x0, Y + 210, prog(t, T.know - 0.2, T.know + 0.5));
    // ba ô viền đứt chờ sẵn từ "rule" — khung không trống trong lúc chờ "negative"
    for (let i = 0; i < 3; i++) footprint(g, x0 + i * (s + 100), y, s, prog(t, T.rule3 + i * 0.12, T.rule3 + 0.4 + i * 0.12), { zero: false });
    tile(g, x0, y, s, 'n', { k: prog(t, T.neg1, T.neg1 + 0.35) });
    typed(g, '×', x0 + s + 50, y + s * 0.66, prog(t, T.neg1 + 0.3, T.neg1 + 0.45), `600 72px ${ARC}`, C.ink, { align: 'center' });
    tile(g, x0 + s + 100, y, s, 'n', { k: prog(t, T.neg2, T.neg2 + 0.35) });
    typed(g, '=', x0 + 2 * s + 150, y + s * 0.66, prog(t, T.neg2 + 0.3, T.neg2 + 0.45), `600 72px ${ARC}`, C.ink, { align: 'center' });
    tile(g, x0 + 2 * s + 200, y, s, 'p', { k: prog(t, T.positive, T.positive + 0.35) });
    eq(g, [['negative', C.negT], [' × '], ['negative', C.negT], [' = '], ['positive', C.posT]], x0, Y + 470, 46,
      prog(t, T.neg1, T.positive + 0.5));
    typed(g, 'Why?', 1100, Y + 380, prog(t, T.why, T.why + 0.35), `italic 600 120px ${CG}`, C.ink);
    // ba câu trả lời quen thuộc: ba giấy nhớ (KHÔNG gạch ở đây — câu "convention" chỉ bị gạch ở hồi 4, e3)
    const notes = [['IT\'S JUST A', 'CONVENTION', T.convention], ['A STORY ABOUT', 'DEBTS', T.debts], ['WALK BACK,', 'TURN AROUND', T.turning]];
    notes.forEach(([a, b, at], i) => {
      const inNote = stickyNote(g, 140 + i * 420, Y + 600, 380, 170, prog(t, at - 0.3, at + 0.1), { rot: [-0.03, 0.02, -0.015][i] });
      inNote(() => { typed(g, a, 30, 70, prog(t, at - 0.1, at + 0.3), `500 24px "IBM Plex Mono"`, C.noteDim, { ls: 2 });
        typed(g, b, 30, 126, prog(t, at, at + 0.4), `800 ${i === 2 ? 40 : 44}px ${ARC}`, C.noteInk, { ls: 1 }); });   // TURN AROUND: 44 px chạm mép giấy
    });
    // chứng minh hay mẹo nhớ?
    label(g, 'proofs?', 140, Y + 850, prog(t, T.proofs - 0.1, T.proofs + 0.4), { color: C.ink, size: 26 });
    label(g, 'or just ways to remember?', 380, Y + 850, prog(t, T.remember - 0.6, T.remember + 0.4), { color: C.ink, size: 26 });
  }
  zone2(g, t, Y) {
    const T = this.T;
    typed(g, 'Three questions', 140, Y + 200, prog(t, T.video - 0.2, T.three + 0.4), `italic 600 64px ${CG}`, C.ink);
    const Q = [['Why did people refuse negative numbers', 'for more than a thousand years?', T.q1],
      ['Are the usual explanations real proofs,', 'or only ways to remember?', T.q2],
      ['Is negative × negative a convention someone chose,', 'or is it forced on us?', T.q3]];
    Q.forEach(([a, b, at], i) => {
      const y = Y + 260 + i * 220, k = prog(t, at - 0.3, at + 0.2);
      if (k <= 0) return;
      g.save(); g.strokeStyle = C.dim; g.lineWidth = 2; g.setLineDash([10, 8]); g.globalAlpha = clamp(k * 2);
      g.beginPath(); g.roundRect(140, y, 1200, 190, 14); g.stroke(); g.restore();
      typed(g, String(i + 1), 200, y + 128, prog(t, at - 0.2, at), `800 96px ${ARC}`, C.posT, { align: 'center' });
      quote(g, a, 290, y + 82, prog(t, at, at + 1.2), { size: 44 });
      quote(g, b, 290, y + 142, prog(t, at + 1.0, at + 2.2), { size: 44 });
    });
    if (t > T.forced) {                               // khoanh đúng chữ "forced on us?" (đo, không đoán — §56), mực ngà
      g.save(); g.font = `italic 600 44px ${CG}`; const x0 = 290 + g.measureText('or is it ').width, wf = g.measureText('forced on us?').width; g.restore();
      ring(g, x0 + wf / 2, Y + 260 + 2 * 220 + 131, wf / 2 + 20, 24, prog(t, T.forced, T.forced + 0.5), { color: C.ink });
    }
  }
  zone3(g, t, Y) {
    const T = this.T, cx = W / 2;
    quote(g, 'Here is where we are going.', cx, Y + 150, prog(t, T.going - 0.9, T.going + 0.3), { size: 56, align: 'center' });
    // luật quen thuộc trở lại dưới câu dẫn (từ "rule"), nhấc đi khi zero pair vào
    const kr = prog(t, T.rule12, T.rule12 + 0.4) - prog(t, T.happen - 0.8, T.happen - 0.4);
    if (kr > 0) { const s = 90, x = cx - 1.5 * s - 100;
      tile(g, x, Y + 330, s, 'n', { k: kr }); tile(g, x + s + 100, Y + 330, s, 'n', { k: kr }); tile(g, x + 2 * s + 200, Y + 330, s, 'p', { k: kr });
      typed(g, '×', x + s + 50, Y + 330 + s * 0.66, kr, `600 56px ${ARC}`, C.ink, { align: 'center' });
      typed(g, '=', x + 2 * s + 150, Y + 330 + s * 0.66, kr, `600 56px ${ARC}`, C.ink, { align: 'center' }); }
    label(g, 'not an arbitrary choice', cx, Y + 210, prog(t, T.arbitrary - 0.3, T.made + 0.3), { align: 'center', size: 26, color: C.ink });
    // số âm cư xử như số: +1 và −1 làm đúng việc của chúng — úp vào nhau ra 0
    const ka = prog(t, T.happen - 0.4, T.happen) - prog(t, T.history - 0.6, T.history - 0.2);
    if (ka > 0) {
      zeroPair(g, cx - 160, Y + 330, 110, prog(t, T.like, T.e13 + 0.2), { show: ka });
      label(g, '+1', cx - 160 + 55 + 138, Y + 330 - 24, ka * prog(t, T.behave - 0.4, T.behave) * (1 - prog(t, T.like, T.like + 0.3)), { color: C.posT, align: 'center' });
      label(g, '−1', cx - 160 + 55, Y + 330 + 150, ka * prog(t, T.behave - 0.4, T.behave) * (1 - prog(t, T.like, T.like + 0.3)), { color: C.negT, align: 'center' });
      label(g, 'behaves like a number', cx, Y + 560, ka * prog(t, T.behave, T.e13), { align: 'center' });
    }
    // câu treo: một viên đỏ đứng một mình giữa thảm
    tile(g, cx - 70, Y + 430, 140, 'n', { k: prog(t, T.history, T.history + 0.4) });
    label(g, 'not a number?', cx, Y + 400, prog(t, T.numbers - 0.2, T.numbers + 0.5), { align: 'center', size: 26, color: C.ink });
    label(g, 'for most of history', cx, Y + 660, prog(t, T.history, T.history + 0.8), { align: 'center' });
  }
  blackout(g, t) {                                    // đen khép từ ngoài vào đúng viên đỏ, rồi thu về 0 (đen kín)
    const T = this.T, a = T.all + 0.15, b = a + 0.55, c = T.end + 0.75;
    if (t < a) return;
    const R = 112, cx = W / 2, cy = 3 * ZONE + 500 - this.cam(t).y;
    const r = t < b ? 2300 + (R - 2300) * smooth(prog(t, a, b)) : R * (1 - smooth(prog(t, b, c)));
    g.save(); g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2, true); g.fill('evenodd'); g.restore();
    if (r <= 0.5) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); }
  }
}
