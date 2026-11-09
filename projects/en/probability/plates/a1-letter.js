// a1 · Cold open câu p1 10–15 — thư 1654 kẹp vào vở, lời hứa, mục lục, khép về MỘT viên xúc xắc.
//  câu 10  tờ thư trượt vào từ phải (giấy vergé, mực sắt): Pascal ("pascal") trái, Fermat ("fermat") phải, nét bút lông nối hai người,
//          "summer" → "29 July 1654" viết vào; "probability begins" → dấu sáp đỏ.
//  câu 11  tờ thư trượt ra; vở: hai dòng lời giải viết vào (một dòng mỗi cược) — "one line each" khoanh.
//  câu 12  "five moves" → 5 giấy note dán lần lượt ở hàng dưới; "exam" → note 5 nghiêng + chữ "exam".
//  câu 13–14  note thu nhỏ; ①②③ viết vào, mỗi câu hỏi tô dạ vàng khi được đọc.
//  câu 15  mọi thứ rút đi; "single die" → MỘT xúc xắc đỏ rơi xuống giữa trang (khung cuối p1 = khung đầu p2: trang trắng + xúc xắc).
// Mascot pointer từ câu 11 (góc phải dưới, để chỗ cho note).
import { W, H, C, AR, MO, CO, clamp, prog, lookup, lerp, outCubic, paper, letter, wax, photo, photoImages, write, calc, ring, hi, note,
  die, rollDie, promise, gambler, POSE, N, contact, hand, seg } from '../kit.js';
import { mascot, pose } from './g-common.js';

export const MOVES = [['LIST', ['grid or tree']], ['FLIP', ['"at least one"', '→ count none']], ['× AND  + OR', ['along a path']], ['PEOPLE', ['% → 1000 people']], ['CHECK', ['0 to 1, sums to 1']]];
export const NOTE = { y: 640, w: 300, h: 230, x0: 160, gap: 330 };
export const DIE_END = { x: W / 2, y: 560, s: 170 };   // khung cuối p1 — b01 mở từ đúng đây

export default class Letter {
  static ERA = 'paper';
  static IMAGES = photoImages('pascal', 'fermat');
  static POSES = ['pointer'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a1-letter');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l10: S(10), pascal10: w(10, 'pascal'), fermat10: w(10, 'fermat'), summer10: w(10, 'summer'), prob10: w(10, 'probability'), e10: E(10),
      l11: S(11), settle11: w(11, 'settle'), both11: w(11, 'both'), line11: w(11, 'line'), e11: E(11),
      five12: w(12, 'five'), moves12: w(12, 'moves'), apart12: w(12, 'apart'), problem12: w(12, 'problem'), exam12: w(12, 'exam'), e12: E(12),
      l13: S(13), q: [w(14, 'what'), w(14, 'why'), w(14, 'how')], e14: E(14),
      l15: S(15), single15: w(15, 'single'), die15: w(15, 'die'), e15: E(15),
    };
    this.START = S(10);
    this.FROM = Math.max(S(10) - 0.6, L(9).end + 0.5);   // luật FROM (BRIEF-PLATES, §153)
    const T = this.T;
    this.NOTE_T = [T.five12, T.moves12, T.apart12, T.problem12, T.exam12];
    for (let i = 1; i < 5; i++) if (this.NOTE_T[i] < this.NOTE_T[i - 1] + 0.15) this.NOTE_T[i] = this.NOTE_T[i - 1] + 0.15;
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.l10, 'page'), c(T.pascal10, 'card'), c(T.fermat10, 'card'), c(T.summer10, 'pen'), c(T.prob10, 'hanko'),
      c(T.e10 + 0.1, 'page'), c(T.settle11, 'pen'), c(T.line11, 'pen'), ...this.NOTE_T.map(t => c(t, 'pop')),
      ...T.q.map(t => c(t, 'pen')), c(T.die15 + 0.25, 'dice')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    // ── câu 11: hai dòng lời giải (dưới tờ thư; tờ thư trượt ra thì lộ) ──
    const kOut = prog(t, T.l13, T.l13 + 0.6), kGone = prog(t, T.l15, T.l15 + 0.5);
    if (t >= T.e10 && kGone < 1) {
      const a = 1 - Math.max(kGone, kOut);                          // lời giải xong việc khi mục lục vào
      g.save(); g.globalAlpha = a;
      const y0 = 300;
      calc(g, `bet 1:  1 − (5/6)⁴     = ${N.p4}%`, 300, y0, prog(t, T.settle11, T.both11 + 0.4), { size: 48, color: C.ink });
      calc(g, `bet 2:  1 − (35/36)²⁴ = ${N.p24}%`, 300, y0 + 90, prog(t, T.both11 + 0.2, T.line11), { size: 48, color: C.ink });
      ring(g, 1500, y0 + 30, 170, 90, prog(t, T.line11, T.line11 + 0.5), { color: C.orange });
      write(g, 'one line each', 1500, y0 + 42, prog(t, T.line11 + 0.1, T.e11), { font: `800 40px ${AR}`, color: C.orangeInk, align: 'center' });
      g.restore();
    }
    // ── câu 12: 5 giấy note (hàng dưới), câu 13–14 thu nhỏ lên lề phải ──
    if (t >= T.five12 && kGone < 1) {
      MOVES.forEach(([title, body], i) => {
        const k = prog(t, this.NOTE_T[i], this.NOTE_T[i] + 0.35);
        const x = lerp(NOTE.x0 + i * NOTE.gap, 1540 + (i % 2) * 120, kOut), y = lerp(NOTE.y, 110 + i * 132, kOut);
        g.save(); g.globalAlpha = 1 - kGone; const s = lerp(1, 0.5, kOut);
        g.translate(x, y); g.scale(s, s); note(g, 0, 0, NOTE.w, NOTE.h, k, { col: C.note[i], rot: (i % 2 ? 0.03 : -0.03), num: i + 1, title, body }); g.restore();
      });
      write(g, 'exam', NOTE.x0 + 4 * NOTE.gap + 150, NOTE.y + 290, prog(t, T.exam12, T.exam12 + 0.3) * (1 - kOut), { font: `800 44px ${AR}`, color: C.lose, align: 'center', rot: -0.06 });
    }
    // ── câu 13–14: mục lục ①②③ ──
    if (t >= T.l13 && kGone < 1) {
      g.save(); g.globalAlpha = 1 - kGone;
      write(g, 'Three questions', 200, 300, prog(t, T.l13, T.l13 + 0.6), { font: `800 64px ${AR}`, color: C.ink });
      T.q.forEach((q, i) => promise(g, i, 200, 450 + i * 130, prog(t, q - 0.1, q + 0.9), { hiK: prog(t, q, q + 0.8) * (i === 0 ? 1 : 1 - prog(t, T.q[i + 1] ?? 1e9, (T.q[i + 1] ?? 1e9) + 0.3)) }));
      g.restore();
    }
    // ── câu 15: MỘT xúc xắc rơi xuống giữa trang ──
    if (t >= T.single15 - 0.3) rollDie(g, W / 2 + 380, 180, DIE_END.x, DIE_END.y, DIE_END.s, 6, C.dieA, prog(t, T.single15 - 0.3, T.die15 + 0.25), 4);
    // ── câu 10: tờ thư 1654 ──
    const kin = prog(t, T.l10 - 0.4, T.l10 + 0.5), kexit = prog(t, T.e10 + 0.1, T.e10 + 0.7);
    if (kin > 0 && kexit < 1) {
      const L_ = letter(g, 250 - kexit * 1900, 110, 1420, 820, kin, { rot: 0.012 });
      if (L_) {
        const ph = photo(g, 'pascal', 90, 120, 420, prog(t, T.pascal10 - 0.3, T.pascal10 + 0.3), { rot: -0.03 });
        photo(g, 'fermat', 1420 - 90 - 314, 110, 420, prog(t, T.fermat10 - 0.3, T.fermat10 + 0.3), { rot: 0.03 });
        // nét bút lông nối hai người (Paris → Toulouse)
        const kq = prog(t, T.fermat10, T.summer10);
        if (kq > 0) { hand(g, Array.from({ length: 30 }, (_, i) => { const u = i / 29; return [lerp(90 + ph.w + 40, 1420 - 90 - 314 - 40, u), 340 - Math.sin(u * Math.PI) * 90]; }), { w: 4, color: C.iron, k: kq, jit: 0.8, seed: 3 });
          write(g, 'Paris', 90 + ph.w + 40, 400, kq, { font: `italic 600 44px ${CO}`, color: C.iron2 });
          write(g, 'Toulouse', 1420 - 90 - 314 - 40, 400, kq, { font: `italic 600 44px ${CO}`, color: C.iron2, align: 'right' }); }
        write(g, '29 July 1654', 710, 690, prog(t, T.summer10, T.summer10 + 0.8), { font: `700 64px ${CO}`, color: C.iron, align: 'center' });
        wax(g, 1010, 700, prog(t, T.prob10, T.prob10 + 0.3), { letter: 'P' });
        L_.done();
      }
    }
    // người que dân cược (cổ áo ren trong đoạn thư) — đứng bên phải, quay về phía thư
    if (kexit < 1 && t < T.l11) gambler(g, 1760, 980, 230, POSE.lookUp, { dir: -1, lace: true, a: kin });
    mascot(g, t, 'pointer', T.l11 - 0.2, { x: 1770 });
  }
}
