// ACT FIVE · "Rules, not meaning" (p2 câu 102–109). Không mascot. Nối thẳng từ g1: ba đèn đường + ba tiên đề.
//   102  "built on those three conditions": phiến "MODERN PROBABILITY THEORY" đặt lên đầu ba đèn
//   103–104  ba đèn soi lần lượt (không dòng nào nói "nghĩa"); "what probability means" nằm trong sương bên trái;
//        "rules of the game" sáng, "not its meaning" → sương dày thêm
//   105  camera NGHIÊNG XUỐNG mặt sân: ô 10 × 10 (độ đo, như diện tích), cả sân = 1 (số trong quầng đèn người xem)
//   106  30 ô sáng = 3/10 (must('30 / 100', 0.3))
//   107–109  hai ngọn đèn (tần suất, niềm tin) cùng soi một mặt sân; cãi nhau về nghĩa (vòng cung đứt), chung công cụ;
//        Frequentists / Bayesians soi chỗ khác nhau rồi cùng về; "neither… wrong"
import { W, H, C, CG, MONO, clamp, prog, smooth, outCubic, outBack, hash, sky, glow, lantern, beam, fogBank, typed, text,
  hand, seg, card, ring, dashes, must, lookup } from '../kit.js';
import { LAMPS, AX, streetLamp } from './g1-axioms.js';

const LX = 180, LY = 950;                                  // đèn bão người xem
const PX = 980, PY = 330, CELL = 56, GAP = 6, PS = 10 * CELL + 9 * GAP;   // mặt sân 10 × 10 (620 px)
const N = must('10 * 10', 100), EV = 30;
must('30 / 100', 0.3); must('3 / 10', 0.3);
// 30 ô của biến cố: gần một tâm lệch trái-dưới, nhiễu hash → vùng sáng méo tự nhiên, liền khối
const CELLS = Array.from({ length: N }, (_, i) => i).sort((a, b) => {
  const d = i => Math.hypot(i % 10 - 2.6, ((i / 10) | 0) - 5.4) + hash(i * 4.3) * 1.2; return d(a) - d(b); });
const EVENT = CELLS.slice(0, EV);
const ORB = [[800, 450], [1740, 450]];

function orb(g, x, y, on, t) {
  if (on <= 0) return;
  const fl = 1 + 0.05 * Math.sin(t * 6.1 + x);
  glow(g, x, y, 240 * fl, 'rgba(244,184,96,0.32)', on); glow(g, x, y, 60, 'rgba(255,226,160,0.9)', on);
  g.save(); g.globalAlpha = clamp(on); g.fillStyle = '#FFF3D0'; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.restore();
}
const cellXY = i => [PX + (i % 10) * (CELL + GAP), PY + ((i / 10) | 0) * (CELL + GAP)];

export default class Measure {
  static ERA = 'night';
  CONTINUES = true;                                        // nối tiếp bố cục g1: cắt thẳng, không trôi camera (review H1)
  TRANSITION = null;
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    this.T = {
      whole: w(102, 'whole'), built: w(102, 'built'), three: w(102, 'three'),
      remarkable: w(103, 'remarkable'), nowhere: w(103, 'nowhere'), single: w(103, 'single'), saying: w(103, 'saying'), means: w(103, 'means'),
      kolmo: L(104).start, rules: w(104, 'rules'), game: w(104, 'game'), not: w(104, 'not'), meaning: w(104, 'meaning'),
      seen: L(105).start, measure: w(105, 'measure'), area: w(105, 'area'), volume: w(105, 'volume'), wspace: w(105, 'whole'), one: w(105, 'one'),
      tenths: w(106, 'three'), tenths2: w(106, 'three', 2), space: w(106, 'space'),
      freq: L(107).start, belief: w(107, 'belief'), satisfy: w(107, 'satisfy'),
      argue: w(108, 'argue'), fiercely: w(108, 'fiercely'), share: w(108, 'share'), tools: w(108, 'tools'),
      fq: w(109, 'frequentists'), bayes: w(109, 'bayesians'), methods: w(109, 'different'), questions: w(109, 'different', 2), neither: w(109, 'neither'),
      wrong: w(109, 'wrong'), end: L(109).end,
    };
    this.START = L(102).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.built, kind: 'tick' }, { t: T.means, kind: 'question' }, { t: T.area, kind: 'tick' }, { t: T.tenths, kind: 'tick' },
      { t: T.satisfy, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    const tilt = smooth(prog(t, T.seen - 0.2, T.seen + 1.2));            // camera nghiêng xuống mặt sân
    sky(g, t, { fog: 1 });

    // ── phần trên: ba đèn + ba tiên đề + phiến lý thuyết; nghĩa nằm trong sương ──
    if (tilt < 1) {
      g.save(); g.translate(0, -H * tilt);
      // "remarkable": đèn hạ xuống; "nowhere": từng đèn loé lên soi lại tiên đề của nó (không dòng nào nói "nghĩa"); "rules": sáng lại hết
      const dim = 1 - 0.6 * prog(t, T.remarkable, T.remarkable + 0.5) * (1 - prog(t, T.rules - 0.2, T.rules + 0.3));
      const scan = i => dim + (1 - dim) * Math.sin(prog(t, T.nowhere + i * 0.5, T.nowhere + 0.7 + i * 0.5) * Math.PI);
      LAMPS.forEach((x, i) => streetLamp(g, x, 320, 960, scan(i), t, { seed: i }));
      // phần còn lại của g1 rời khung: hai vòng A, B chìm xuống
      const gone = smooth(prog(t, F + 0.1, F + 0.9));
      if (gone < 1) { g.save(); g.translate(0, 120 * gone); g.globalAlpha = 1 - gone;
        ring(g, 1590, 820, 36, 30, 1, { color: C.fog, w: 3, seed: 2 }); ring(g, 1700, 820, 36, 30, 1, { color: C.fog, w: 3, seed: 9 });
        text(g, 'A', 1590, 836, `italic 600 44px ${CG}`, C.ivory, 'center'); text(g, 'B', 1700, 836, `italic 600 44px ${CG}`, C.ivory, 'center'); g.restore(); }
      // "a single line saying what probability means": dòng ấy để trống
      const kLine = prog(t, T.single - 0.1, T.saying + 0.3);
      if (kLine > 0) { typed(g, 'MEANING:', 915, 808, kLine * 3, `500 22px ${MONO}`, C.ivory);
        dashes(g, 1050, 800, 1760, 800, 'rgba(142,162,184,0.8)', { w: 3, k: prog(t, T.single + 0.1, T.means) }); }
      AX.forEach((a, i) => {
        a.f.forEach((s, j) => text(g, s, LAMPS[i], 600 + j * 62, `italic 600 64px ${CG}`, C.ivory, 'center'));
        text(g, a.note, LAMPS[i], a.f.length > 1 ? 740 : 680, `500 20px ${MONO}`, C.amber, 'center');
      });
      // phiến "MODERN PROBABILITY THEORY" hạ xuống, đặt lên ba đầu đèn
      const kS = outBack(prog(t, T.built - 0.3, T.built + 0.4));
      if (kS > 0) {
        const y = 230 - 260 * (1 - kS);
        g.save(); g.fillStyle = 'rgba(22,30,48,0.92)'; g.fillRect(800, y, 940, 56); g.restore();
        hand(g, [[800, y], [1740, y], [1740, y + 56], [800, y + 56], [800, y]], { w: 3, color: C.ivory, seed: 3, jit: 1.2 });
        text(g, 'MODERN PROBABILITY THEORY', 1270, y + 38, `500 24px ${MONO}`, C.ivory, 'center', 3);
        g.save(); g.strokeStyle = '#2A3448'; g.lineWidth = 6; LAMPS.forEach(x => { g.beginPath(); g.moveTo(x, y + 56); g.lineTo(x, 286); g.stroke(); }); g.restore();
      }
      // nghĩa trong sương (trái): viết ở "saying", sương dày lên ở "not its meaning"
      const kM = prog(t, T.saying - 0.1, T.means + 0.3), thick = prog(t, T.not, T.meaning + 0.6);
      if (kM > 0) {
        g.save(); g.globalAlpha = 1 - 0.55 * thick;
        typed(g, 'what probability means', 430, 560 + 30 * thick, kM, `italic 500 46px ${CG}`, C.fog, { align: 'center' });
        if (t > T.means) text(g, '?', 430, 680 + 30 * thick, `italic 600 96px ${CG}`, C.fog, 'center');
        g.restore();
      }
      fogBank(g, 430, 600, 260, 200, t, { a: 0.9 * prog(t, F + 0.5, T.saying) + 1.8 * thick + kM * 0.3, seed: 51 });
      if (t > T.rules - 0.1) typed(g, 'RULES OF THE GAME', 1260, 860, prog(t, T.rules - 0.1, T.game + 0.3), `500 26px ${MONO}`, C.gold, { align: 'center' });
      if (t > T.not - 0.1) typed(g, 'NOT ITS MEANING', 430, 860, prog(t, T.not - 0.1, T.meaning + 0.4), `500 26px ${MONO}`, C.ivory, { align: 'center' });
      g.restore();
    }

    // ── phần dưới: mặt sân (độ đo) ──
    if (tilt > 0) {
      g.save(); g.translate(0, H * (1 - tilt));
      hand(g, [[PX - 14, PY - 14], [PX + PS + 14, PY - 14], [PX + PS + 14, PY + PS + 14], [PX - 14, PY + PS + 14], [PX - 14, PY - 14]],
        { w: 3, color: C.fog, seed: 6, jit: 1.5, k: prog(t, T.seen + 0.4, T.measure + 0.6) });   // khung sân vẽ dần tới "measure"
      const depth = 8 * outCubic(prog(t, T.volume - 0.1, T.volume + 0.5));                       // "volume": ô nổi khối
      const frameGold = outCubic(prog(t, T.satisfy - 0.1, T.satisfy + 0.7));
      if (frameGold > 0) hand(g, [[PX - 22, PY - 22], [PX + PS + 22, PY - 22], [PX + PS + 22, PY + PS + 22], [PX - 22, PY + PS + 22], [PX - 22, PY - 22]],
        { w: 4, color: C.gold, seed: 16, jit: 1.5, k: frameGold });
      // beams of the two views (dưới lớp ô)
      const kO = outCubic(prog(t, T.freq - 0.2, T.belief + 0.5)), reach = outCubic(prog(t, T.freq + 0.2, T.satisfy + 0.3));
      const share = 1 + 0.5 * prog(t, T.share, T.tools + 0.4);
      const split = smooth(prog(t, T.methods, T.questions + 0.4)) * (1 - smooth(prog(t, T.neither - 0.2, T.neither + 0.8)));
      const cx = PX + PS / 2, cy = PY + PS / 2, tgt = [[cx - 200 * split, cy - 120 * split], [cx + 200 * split, cy + 140 * split]];
      ORB.forEach(([x, y], i) => { beam(g, x, y, tgt[i][0], tgt[i][1], 40, 520, 0.22 * reach * share, { reach }); });
      for (let i = 0; i < N; i++) {
        const [x, y] = cellXY(i), c = i % 10, r = (i / 10) | 0;
        const kc = prog(t, T.area - 0.1 + (c + r) * 0.04, T.area + 0.2 + (c + r) * 0.04);
        if (kc <= 0) continue;
        const ev = EVENT.indexOf(i), kE = ev >= 0 ? prog(t, T.tenths - 0.1 + ev * 0.025, T.tenths + 0.15 + ev * 0.025) : 0;
        const kw = prog(t, T.wspace - 0.1 + (c + r) * 0.05, T.wspace + 0.3 + (c + r) * 0.05);    // "whole space": sóng sáng quét cả sân
        const yy = y + (1 - outBack(kc)) * 10;
        if (depth > 0) { g.fillStyle = 'rgba(4,7,14,0.85)'; g.beginPath(); g.roundRect(x + depth, yy + depth, CELL, CELL, 6); g.fill(); }
        g.fillStyle = kE > 0 ? `rgba(244,184,96,${0.25 + 0.6 * kE})` : `rgba(237,230,214,${0.06 + 0.2 * kw})`;
        g.beginPath(); g.roundRect(x, yy, CELL, CELL, 6); g.fill();
        if (kE > 0) glow(g, x + CELL / 2, y + CELL / 2, 50, 'rgba(244,184,96,0.25)', kE);
      }
      // nhãn trên mặt sân: "A MEASURE · LIKE AREA · LIKE VOLUME" → thay bằng "BOTH SATISFY THE SAME THREE AXIOMS"
      const up = smooth(prog(t, T.freq - 0.3, T.freq + 0.2));
      if (up < 1) {
        g.save(); g.translate(0, -40 * up); g.globalAlpha = 1 - up;
        typed(g, 'A MEASURE', PX, 296, prog(t, T.measure, T.measure + 0.4), `500 24px ${MONO}`, C.ivory);
        typed(g, ' · LIKE AREA', PX + 9 * 14.4 + 30, 296, prog(t, T.area - 0.1, T.area + 0.4), `500 24px ${MONO}`, C.ivory);
        typed(g, ' · LIKE VOLUME', PX + 21 * 14.4 + 70, 296, prog(t, T.volume - 0.1, T.volume + 0.4), `500 24px ${MONO}`, C.ivory);
        g.restore();
      }
      if (t > T.satisfy - 0.1) typed(g, 'BOTH SATISFY THE SAME THREE AXIOMS', PX + PS / 2, 296, prog(t, T.satisfy - 0.1, T.satisfy + 0.8), `500 24px ${MONO}`, C.gold, { align: 'center' });
      // nhãn dưới: whole space = 1 · event = 3/10 → nhường "neither… wrong"
      const bot = smooth(prog(t, T.fq - 0.2, T.fq + 0.5));
      if (bot < 1) {
        g.save(); g.translate(0, 50 * bot); g.globalAlpha = 1 - bot;
        typed(g, 'WHOLE SPACE = 1', PX, 1000, prog(t, T.wspace, T.one + 0.3), `500 24px ${MONO}`, C.ivory);
        typed(g, 'EVENT = 3/10 OF IT', PX + PS, 1000, prog(t, T.tenths2, T.space + 0.3), `500 24px ${MONO}`, C.amber, { align: 'right' });
        g.restore();
      }
      if (t > T.neither - 0.1) typed(g, 'Neither is doing the mathematics wrong.', PX + PS / 2, 1010, prog(t, T.neither - 0.3, T.neither + 1.2), `italic 600 54px ${CG}`, C.ivory, { align: 'center' });
      g.restore();

      // hai ngọn đèn + tên (toạ độ màn hình: đã vào sau khi camera nghiêng xong)
      ORB.forEach(([x, y], i) => orb(g, x, y, kO, t));
      const names = [['FREQUENCY VIEW', 'FREQUENTISTS', T.freq, T.fq], ['BELIEF VIEW', 'BAYESIANS', T.belief, T.bayes]];
      names.forEach(([a, b, ta, tb], i) => {
        const x = ORB[i][0], sw = smooth(prog(t, tb - 0.25, tb + 0.15));
        if (sw < 1) { g.save(); g.translate(0, -30 * sw); g.globalAlpha = 1 - sw; typed(g, a, x, 350, prog(t, ta - 0.1, ta + 0.5), `500 22px ${MONO}`, C.amber, { align: 'center' }); g.restore(); }
        if (sw > 0) typed(g, b, x, 350, prog(t, tb - 0.1, tb + 0.4), `500 22px ${MONO}`, C.amber, { align: 'center' });
        typed(g, 'SAME TOOLS', x, 560, prog(t, T.share, T.tools + 0.3), `500 22px ${MONO}`, C.gold, { align: 'center' });
      });
      // cãi nhau về nghĩa: hai vòng cung đứt từ hai đèn chụm lên trên mặt sân, "meaning?" trong sương; rút về ở "share"
      const kA = prog(t, T.argue - 0.1, T.fiercely + 0.4) * (1 - prog(t, T.share, T.share + 0.6));
      if (kA > 0) {
        const mx = 1290, my = 150;
        [[ORB[0], 0], [ORB[1], 1]].forEach(([[x, y], i]) => {
          const fl = 0.55 + 0.45 * Math.max(0, Math.sin((t - T.argue) * 9 + i * Math.PI));
          const P = Array.from({ length: 21 }, (_, j) => { const u = j / 20; const y0 = y - 140; return [x + (mx - x) * u, y0 + (my - y0) * u - 90 * Math.sin(u * Math.PI)]; });
          g.save(); g.globalAlpha = fl; g.setLineDash([10, 12]); hand(g, P, { w: 3, color: C.fog, seed: 20 + i, k: kA, jit: 0.8 }); g.restore();
        });
        g.save(); g.globalAlpha = clamp(kA * 2 - 1); text(g, 'meaning?', mx, my - 10, `italic 500 46px ${CG}`, C.ivory, 'center'); g.restore();
      }
    }

    // ── đèn người xem + số trong quầng: 1 (cả không gian) → 3/10 ──
    const kL = outCubic(prog(t, T.seen + 0.4, T.seen + 1.4));
    if (kL > 0) {
      glow(g, 400, 600, 340, 'rgba(244,184,96,0.16)', kL);
      lantern(g, LX, LY + 300 * (1 - kL), 0.85, t, kL);
      const k1 = outBack(prog(t, T.one - 0.05, T.one + 0.4)), sw = smooth(prog(t, T.tenths - 0.2, T.tenths + 0.3));
      if (k1 > 0 && sw < 1) { g.save(); g.translate(400, 660 - 80 * sw); g.scale(k1, k1); g.globalAlpha = 1 - sw; text(g, '1', 0, 0, `600 140px ${CG}`, C.amber, 'center'); g.restore(); }
      if (sw > 0) {
        g.save(); g.translate(400, 660 + 60 * (1 - sw)); g.globalAlpha = sw; text(g, '3/10', 0, 0, `600 140px ${CG}`, C.amber, 'center'); g.restore();
        typed(g, '30 OF 100 CELLS', 400, 730, prog(t, T.tenths + 0.3, T.tenths + 1.0), `500 22px ${MONO}`, C.amber, { align: 'center' });
      }
    }
    // chữ g1 còn lại (toạ độ màn hình) xoá dần ngay sau mối nối
    const er = 1 - prog(t, F + 0.1, F + 0.8);
    typed(g, 'every event gets a number', 96, 290, er, `italic 600 54px ${CG}`, C.ivory);
    typed(g, 'That is all.', 1300, 1000, er, `italic 600 54px ${CG}`, C.gold, { align: 'center' });
    // biển tên mục: giữ dòng hồi + vạch; tên cũ xoá, tên mới viết vào
    card(g, 'night', 1, 'ACT FIVE · AXIOMS', '');
    typed(g, 'Three rules', 96, 168, 1 - prog(t, F + 0.3, F + 0.8), 'italic 600 54px "Cormorant Garamond"', C.ivory);
    typed(g, 'Rules, not meaning', 96, 168, prog(t, F + 0.9, F + 1.7), 'italic 600 54px "Cormorant Garamond"', C.ivory);
  }
}
