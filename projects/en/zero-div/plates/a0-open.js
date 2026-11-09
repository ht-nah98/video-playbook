// Mở bài bản 2 (SCRIPT.md § Cold open, REVISION.md — khuôn 4 nhịp PACKAGING §0b). Trang giấy kẻ ô; LỖ ở số 0 có từ
// khung đầu (vật của thumbnail cùng máy tính bỏ túi).
//   0–1   máy tính: gõ 1 ÷ 0 = → ERROR đỏ · cột phép chia khác đều có đáp, dòng 1 ÷ 0 trống + "?"
//   2–4   "? × 0 = 1": thử 1, 5, 100 → đều ra 0, gạch đỏ · mascot nhún vai
//   5–6   RULE đóng dấu rồi bị gạch · lỗ lớn dần, 628 → 2026 · NGƯỜI QUE (clip duyệt 2026-10-22, plates/stick-patch.js)
//         vác miếng vá vào từ phải, lấy đà, tung lên lỗ → miếng vá nằm lên lỗ đúng "patch" rồi rơi tuột → gãi đầu → đi ra
//   7     các phép tính nối nhau bằng nét mực thành mạng — mạng hở đúng ở lỗ ("a system")
//   8     số 0 viết lên trên lỗ rồi rơi vào ("brought that hole along with it")
//   9–11  mục lục 3 câu; câu 3 hé terminal (1/0 → Infinity, 0/0 → NaN)
//   12    mũi tên xuống lỗ · camera LAO VÀO LỖ → đen → p2 mở iris ra người chăn cừu (không intro kênh)
import { makeStick, H as SH, PATCH } from './stick-patch.js';
import { stick } from '../../../../engine/stick.js';
import { ERA, W, H, clamp, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, diveInto, strike, cross, ring, arrow, stamp, figure } from '../kit.js';

const E = ERA.page, V = ERA.void;
const NY = 880, NX0 = 410, NU = 110, HX = NX0 + 5 * NU;      // trục số −5 … 5 ở đáy trang; lỗ ở số 0 (HX = 960)
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;
const R0 = 40;                                                 // bán kính lỗ lúc đầu

export default class Open {
  static ERA = 'page';
  static POSES = ['shrug'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      one: w(0, 'one'), divided: w(0, 'divided'), zero0: w(0, 'zero'), calc: w(0, 'calculator'), refuses: w(0, 'refuses'),
      every: w(1, 'every'), answer: w(1, 'answer'), does: w(1, 'does'), why1: w(1, 'why'),
      question: w(2, 'question'), number2: w(2, 'number'), gives: w(2, 'gives'), one2: w(2, 'one'),
      t1: w(3, 'one'), t5: w(3, 'five'), t100: w(3, 'hundred'),
      always: w(4, 'always'), back: w(4, 'back'), never: w(4, 'never'), e4: L(4).end,
      rule: w(5, 'rule'), teacher: w(5, 'teacher'), annoy: w(5, 'annoy'),
      hole6: w(6, 'hole'), arith: w(6, 'arithmetic'), fourteen: w(6, 'fourteen'), patch: w(6, 'patch'), e6: L(6).end,
      proof: w(7, 'proof'), maths: w(7, 'mathematics'), pile: w(7, 'pile'), rules: w(7, 'rules'), system: w(7, 'system'), e7: L(7).end,
      zero8: w(8, 'zero'), arrive: w(8, 'arrive'), brought: w(8, 'brought'), along: w(8, 'along'),
      q1: L(9).start + 0.3, q2: L(10).start + 0.1, q3: L(11).start + 0.1, computer: w(11, 'computer'), anyway: w(11, 'anyway'),
      first: w(12, 'first'), nobody: w(12, 'nobody'), end: L(12).end,
    };
    // người que: miếng vá chạm lỗ 0.15 s trước "patch" (clip: chạm ở τ 4.88, bắt đầu rơi τ 5.23, gãi đầu τ 6.8)
    const S = this.T.patch - 0.15 - 4.88, t1 = 3.3 + S;
    this.STK = { S, t0: t1 - 4.0, actor: makeStick({ x0: 2110, t0: t1 - 4.0, t1, exit: 7.3 + S }) };   // x0: cả miếng vá ngoài khung
    this.START = L(0).start; this.FROM = -0.6;
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.one - 0.05, kind: 'tick' }, { t: T.divided, kind: 'tick' }, { t: T.zero0, kind: 'tick' }, { t: T.calc, kind: 'tick' },  // chùm phím
      { t: T.refuses, kind: 'error' },           // ERROR đỏ
      { t: T.why1, kind: 'question' },           // 1 ÷ 0 = ?
      { t: T.question, kind: 'pen' },            // ? × 0 = 1
      { t: T.t1, kind: 'pen' },                  // dãy thử 1, 5, 100
      { t: T.never, kind: 'error' },             // ba dấu gạch
      { t: T.rule, kind: 'impact' },             // RULE đóng dấu (chốt ý lớn, 1/2 cả video)
      { t: T.hole6, kind: 'whoosh' },            // lỗ lớn ra
      { t: this.STK.S + 4.88, kind: 'pop' },     // miếng vá người que tung nằm lên lỗ
      { t: this.STK.S + 5.23, kind: 'whoosh' },  // miếng vá rơi tuột
      { t: T.system - 0.1, kind: 'shimmer' },    // mạng phép tính nối lại
      { t: T.brought, kind: 'whoosh' },          // số 0 rơi vào lỗ
      { t: T.q1 - 0.3, kind: 'pen' }, { t: T.q3 - 0.3, kind: 'pen' },
      { t: T.anyway, kind: 'beep' },             // terminal in NaN
      { t: T.end + 0.1, kind: 'whoosh' },        // camera lao vào lỗ
    ];
  }

  // máy tính bỏ túi: thân bo góc, màn hình LCD, lưới phím; key = phím đang nhấn ('1' '÷' '0' '='), disp = chữ màn hình
  calc(g, x, y, s, disp, err, key) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = 'rgba(28,38,64,0.18)'; g.beginPath(); g.roundRect(-196, -246, 400, 520, 34); g.fill();     // bóng
    g.fillStyle = '#2A3248'; g.beginPath(); g.roundRect(-200, -260, 400, 520, 34); g.fill();
    g.fillStyle = err ? '#E9D7CF' : '#C9D3B8'; g.beginPath(); g.roundRect(-164, -224, 328, 116, 12); g.fill();
    g.font = A(err ? 76 : 70); g.textAlign = 'right'; g.fillStyle = err ? E.accent : '#1E2A1A'; g.fillText(disp, 146, -138);
    const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'];
    keys.forEach((k, i) => {
      const kx = -150 + (i % 4) * 100, ky = -62 + Math.floor(i / 4) * 78, on = k === key;
      g.fillStyle = on ? E.accent : (i % 4 === 3 || k === '=' ? '#4A5578' : '#E8E4D8');
      g.beginPath(); g.roundRect(kx - 38, ky - 28 + (on ? 4 : 0), 76, 56, 10); g.fill();
      g.font = A(34); g.textAlign = 'center'; g.fillStyle = on || i % 4 === 3 || k === '=' ? '#F2EEE3' : E.ink; g.fillText(k, kx, ky + 12 + (on ? 4 : 0));
    });
    g.restore();
  }

  render(g, t) {
    const T = this.T;
    const dive = prog(t, T.end + 0.1, T.end + 1.2);
    g.save(); if (dive > 0) diveInto(g, HX, NY, 90, dive);
    ground(g, 'page');

    // ── trục số + lỗ ở 0: có từ khung đầu (vật của thumbnail) ──
    hand(g, seg(NX0 - 70, NY, NX0 + 10 * NU + 70, NY, 40), { w: 5, color: E.ink, seed: 2 });
    hand(g, [[NX0 + 10 * NU + 50, NY - 14], [NX0 + 10 * NU + 72, NY], [NX0 + 10 * NU + 50, NY + 14]], { w: 5, color: E.ink, seed: 4 });
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const x = NX0 + (i + 5) * NU;
      hand(g, seg(x, NY - 16, x, NY + 16, 3), { w: 4, color: E.ink, seed: 20 + i });
      typed(g, i < 0 ? '−' + -i : String(i), x, NY + 66, 1, A(42), E.ink, { align: 'center' });
    }
    const grow = outBack(prog(t, T.hole6 - 0.1, T.hole6 + 0.5)), hr = R0 + 50 * grow;

    // ── 0–1: máy tính gõ 1 ÷ 0 = → ERROR; cột phép chia có đáp ──
    const cOut = outCubic(prog(t, T.question - 0.5, T.question + 0.1));
    if (cOut < 1) {
      g.save(); g.translate(0, -cOut * 900);
      const keyAt = [[T.one - 0.05, '1'], [T.divided, '÷'], [T.zero0, '0'], [T.calc, '=']];
      let disp = '', key = null;
      for (const [a, k] of keyAt) if (t >= a) { disp = k === '=' ? disp : (disp + (disp ? ' ' : '') + k); if (t < a + 0.22) key = k; }
      const err = t >= T.refuses;
      const shake = err ? Math.sin((t - T.refuses) * 60) * 8 * (1 - prog(t, T.refuses, T.refuses + 0.4)) : 0;
      const sx = 960 - 360 * outCubic(prog(t, T.every - 0.3, T.every + 0.4));       // nhường chỗ cho cột phép chia
      this.calc(g, sx + shake, 410, 1.3, err ? 'ERROR' : (disp || '0'), err, key);
      // cột: mọi phép chia khác đều có đáp
      const rows = [['12 ÷ 3', '= 4', T.every], ['7 ÷ 2', '= 3.5', T.every + 0.45], ['1 ÷ 1000', '= 0.001', T.answer]];
      rows.forEach(([l, r, a], i) => { const y = 250 + i * 120;
        typed(g, l, 1420, y, prog(t, a - 0.1, a + 0.3), A(64), E.ink, { align: 'right' });
        typed(g, r, 1450, y, prog(t, a + 0.1, a + 0.4), A(64), E.ink); });
      typed(g, '1 ÷ 0', 1420, 610, prog(t, T.does - 0.2, T.does + 0.3), A(64), E.accent, { align: 'right' });
      typed(g, '= ?', 1450, 610, prog(t, T.why1 - 0.1, T.why1 + 0.2), A(64), E.accent);
      g.restore();
    }

    // ── 2–4: ? × 0 = 1 · thử 1, 5, 100 → 0, gạch đỏ ──
    const qIn = prog(t, T.question - 0.2, T.question + 0.5), qOut = outCubic(prog(t, T.rule - 0.4, T.rule + 0.2));
    if (qIn > 0 && qOut < 1) {
      g.save(); g.translate(0, -qOut * 900);
      typed(g, 'DIVISION IS A QUESTION', 960, 150, qIn * 2, M(26), E.dim, { align: 'center' });
      const blink = t < T.t1 && Math.floor((t - T.question) * 3) % 2 === 0;
      hand(g, [[640, 220], [770, 220], [770, 350], [640, 350], [640, 220]], { w: 5, color: blink ? E.accent : E.ink, seed: 51, k: qIn });
      typed(g, '?', 705, 320, prog(t, T.number2 - 0.1, T.number2 + 0.2), A(110), E.accent, { align: 'center' });
      typed(g, '× 0 = 1', 800, 320, prog(t, T.gives - 0.3, T.one2 + 0.2), A(110), E.ink);
      const tr = [['1', T.t1], ['5', T.t5], ['100', T.t100]];
      tr.forEach(([n, a], i) => { const y = 490 + i * 110, k = prog(t, a - 0.05, a + 0.25);
        typed(g, n, 860, y, k, A(80), E.ink, { align: 'right' });
        typed(g, '× 0', 890, y, k, A(80), E.ink);
        typed(g, '= 0', 1060, y, prog(t, T.back - 0.2 + i * 0.12, T.back + 0.1 + i * 0.12), A(80), E.accent);
        cross(g, 1290, y - 28, 30, prog(t, T.never + i * 0.12, T.never + 0.25 + i * 0.12), { seed: 61 + i }); });
      typed(g, 'NEVER 1', 1250, 820 - 30, prog(t, T.never + 0.4, T.never + 0.8), M(26), E.accent, { align: 'center' });
      g.restore();
    }
    const fk = prog(t, T.never - 0.3, T.never + 0.05) * (1 - prog(t, T.rule - 0.2, T.rule + 0.1));
    if (fk > 0) figure(g, 'shrug', 1690, H, 700, 'page', fk);

    // ── 5–6: RULE đóng dấu → bị gạch · lỗ lớn dần, 628 → 2026, miếng vá rơi tuột ──
    const rOut = outCubic(prog(t, T.proof - 0.4, T.proof + 0.2));
    if (t >= T.rule && rOut < 1) {
      g.save(); g.translate(0, -rOut * 900);
      stamp(g, 'RULE', 960, 420, prog(t, T.rule, T.rule + 0.25), A(220), E.ink);
      strike(g, 660, 360, 1270, 380, prog(t, T.annoy - 0.15, T.annoy + 0.25), { w: 12, seed: 71 });
      typed(g, 'NOT A RULE — A HOLE', 960, 540, prog(t, T.hole6 - 0.1, T.arith + 0.2), M(30), E.accent, { align: 'center' });
      typed(g, '628 → 2026 · ALMOST 1,400 YEARS UNPATCHED', 960, 596, prog(t, T.fourteen, T.fourteen + 0.8), M(26), E.dim, { align: 'center' });
      g.restore();
    }
    // ── 7: mạng phép tính — nối lại thành hệ thống, hở đúng ở lỗ ──
    const nIn = prog(t, T.proof - 0.1, T.maths + 0.6), nOut = outCubic(prog(t, T.zero8 - 0.4, T.zero8 + 0.2));
    if (nIn > 0 && nOut < 1) {
      g.save(); g.translate(0, -nOut * 900);
      const N = [['7 + 0 = 7', 420, 240], ['5 − 5 = 0', 960, 190], ['3 × 0 = 0', 1500, 250], ['12 ÷ 3 = 4', 380, 520],
        ['2 × 3 = 6', 1540, 540], ['6 ÷ 2 = 3', 960, 420], ['−2 + 2 = 0', 700, 680], ['½ × 2 = 1', 1240, 690]];
      const link = prog(t, T.system - 0.2, T.system + 1.0);
      const E2 = [[0, 1], [1, 2], [0, 3], [2, 4], [1, 5], [3, 5], [4, 5], [5, 6], [5, 7], [3, 6], [4, 7], [6, 7]];
      E2.forEach(([a, b], i) => { const k = clamp(link * 1.6 - i * 0.05); if (k <= 0) return;
        hand(g, seg(N[a][1], N[a][2], N[b][1], N[b][2], 12), { w: 3, color: E.ink, seed: 300 + i, k }); });
      // hai nét về lỗ: đứt, đỏ — chỗ duy nhất mạng không nối được
      if (link > 0.5) { g.save(); g.setLineDash([12, 12]); [6, 7].forEach((a, i) => hand(g, seg(N[a][1], N[a][2], HX + (i ? 40 : -40), NY - hr - 10, 10), { w: 3, color: E.accent, seed: 320 + i, k: clamp(link * 2 - 1) })); g.restore(); }
      N.forEach(([s, x, y], i) => { const k = prog(t, T.proof + i * 0.12, T.proof + 0.35 + i * 0.12);
        if (k <= 0) return; g.fillStyle = 'rgba(242,238,227,0.95)'; g.fillRect(x - 130, y - 44, 260, 64);
        typed(g, s, x, y + 6, k, A(44), E.ink, { align: 'center' }); });
      typed(g, 'NOT A PILE OF RULES · A SYSTEM', 960, 120, prog(t, T.rules - 0.2, T.system + 0.4), M(26), E.dim, { align: 'center' });
      g.restore();
    }

    hole(g, HX, NY, hr, null, { seed: 5 });
    // ── người que + miếng vá (sau lỗ: miếng vá nằm TRÊN lỗ; người que đứng trên trục số) ──
    const sa = this.STK.actor(t);
    if (t >= this.STK.t0 && sa.hip[0] < W + 200) {
      const P = sa.patch, sc = 1 - 0.9 * P.fall;
      if (P.fall < 0.97) {                                     // rơi hết thì thôi vẽ (không còn mẩu vá trong lỗ)
        g.save(); g.translate(P.c[0], P.c[1]); g.rotate(P.rot); g.scale(sc, sc); if (P.fall > 0) g.globalAlpha = 1 - P.fall * 0.3;
        g.fillStyle = 'rgba(244,236,205,0.97)'; g.fillRect(-PATCH.w / 2, -PATCH.h / 2, PATCH.w, PATCH.h);
        g.strokeStyle = 'rgba(28,38,64,.35)'; g.lineWidth = 2; g.strokeRect(-PATCH.w / 2, -PATCH.h / 2, PATCH.w, PATCH.h);
        typed(g, 'PATCH', 0, 9, 1, M(24), E.dim, { align: 'center' }); g.restore();
      }
      stick(g, sa.hip[0], 0, sa.pose, { h: SH, color: E.ink, dir: sa.dir ?? -1, hip: sa.hip, feet: sa.feet, hands: sa.hands });
    }

    // ── 8: số 0 — con số đến sau cùng — viết lên trên lỗ rồi rơi vào ──
    const z = prog(t, T.zero8 - 0.1, T.zero8 + 0.4), fall = prog(t, T.brought, T.along + 0.4);
    if (z > 0 && fall < 1) {
      g.save(); g.translate(HX, NY - 210 + outCubic(fall) * 210); const s = 1 - outCubic(fall) * 0.9; g.scale(s, s); g.rotate(fall * 1.3);
      typed(g, '0', 0, 50, z, I(200), E.ink, { align: 'center' }); g.restore();
    }
    typed(g, 'THE LAST NUMBER TO ARRIVE', HX, NY - 380, prog(t, T.zero8 + 0.2, T.arrive + 0.2) * (1 - prog(t, T.q1 - 0.6, T.q1 - 0.2)), M(28), E.dim, { align: 'center' });

    // ── 9–11: mục lục; câu 3 hé terminal ──
    const lo = outCubic(prog(t, T.first - 0.2, T.first + 0.5)) * -760;
    if (t > T.q1 - 0.7 && lo > -760) {
      g.save(); g.translate(0, lo);
      typed(g, 'IN THIS VIDEO', 220, 150, prog(t, T.q1 - 0.6, T.q1), M(26), E.accent);
      const Q = [['1', 'why zero was so hard to accept', T.q1], ['2', 'why dividing by zero makes no sense', T.q2], ['3', 'what your computer does with 1 ÷ 0', T.q3]];
      Q.forEach(([n, s, a], i) => { const y = 270 + i * 120;
        typed(g, n, 230, y, prog(t, a - 0.3, a), A(72), E.ink); typed(g, s, 310, y, prog(t, a - 0.2, a + 1.2), I(66), E.ink); });
      const tk = prog(t, T.computer - 0.2, T.computer + 0.3);                   // terminal hé 2 s (Jenga)
      if (tk > 0) {
        const x = 1300, y = 600, s = outBack(tk);
        g.save(); g.translate(x + 230, y + 90); g.scale(s, s); g.translate(-230, -90);
        g.fillStyle = V.bg; g.beginPath(); g.roundRect(0, 0, 460, 180, 14); g.fill();
        typed(g, '> 1/0', 28, 62, prog(t, T.computer, T.computer + 0.4), M(30), V.ink);
        typed(g, 'Infinity', 200, 62, prog(t, T.computer + 0.5, T.computer + 0.8), M(30), V.accent);
        typed(g, '> 0/0', 28, 130, prog(t, T.computer + 0.9, T.computer + 1.3), M(30), V.ink);
        typed(g, 'NaN', 200, 130, prog(t, T.anyway, T.anyway + 0.3), M(30), V.accent);
        g.restore();
      }
      g.restore();
    }
    // "nobody needed zero at all": mũi tên xuống lỗ
    arrow(g, HX - 360, NY - 420, HX - 80, NY - hr - 20, prog(t, T.nobody - 0.2, T.nobody + 0.4), { color: E.accent, bend: 60, seed: 99 });
    g.restore();
  }
}
