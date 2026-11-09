// h1 · まとめ (p2 câu 132–135) — ERA darkroom, mở hồi 7. Thẻ hồi 「第七幕 まとめ」 rút xuống → bốn thẻ ①–④ hiện (lit 0.4) và LẬT lần lượt
// theo lời: thẻ i lật ở w(132+i, '(i+1)つ目') thành ANSWERS[i]; bên trái mini của hồi đó bằng hàm kit (mỗi mini rời bằng trượt trái):
//  ① wave + photon (PH_VIO, 3.1 eV) · ② ladder + ladderDrop 3→2 + dải liên tục (熱) · ③ specRuler hẹp (khe 可視光) · ④ mắt → 信号 → đầu 「赤」.
// Từ L(135).end: khung đứng yên = h1Final (h2 vẽ lại GIỐNG HỆT làm khung đầu của nó; CONTINUES — so pixel).
// Mọi mốc từ chữ (L / w). Số lên hình: eV(PH_VIO) qua kit + must. Chữ chỉ qua telop/title/actCard/promiseCards.
import { C, TAU, lookup, must, clamp, prog, outCubic, smooth, ground, wave, photon, ladder, ladderDrop, specRuler, spectrumStrip, eye, arrow, telop, title,
  actCard, actCues, actTimes, promiseCards, cue, eV, fmt } from '../kit.js';

const PH_VIO = 400;
must(`'${fmt(eV(PH_VIO), 1)}'`, '3.1');

// ═══ h1Final — khung cuối của まとめ (CHÉP GIỐNG HỆT vào h1-matome.js và h2-next.js; không import cảnh khác — so pixel) ═══
// Bốn thẻ lật hết (lit 1) + mini ④ (mắt → tín hiệu → đầu có 「赤」) + tiêu đề まとめ. td = giờ đóng băng cho bụi trong luồng.
const EYE4 = { x: 330, y: 560, R: 170 }, HEAD = { x: 770, y: 600, rx: 120, ry: 140 };
function mini4(g, k, kHead, kAka) {
  if (k <= 0) return;
  const E = eye(g, EYE4.x, EYE4.y, EYE4.R, { k, lit: 0.6 });
  if (E.nerve) arrow(g, [[E.nerve[0] + 114, E.nerve[1] + 40], [E.nerve[0] + 174, E.nerve[1] + 38], [690, 704]], clamp(kHead * 1.6), { color: '@ink', w: 4 });
  telop(g, '信号', 630, 750, clamp(kHead * 1.6), { size: 36, color: '@dim', align: 'center' });
  if (kHead > 0) {
    g.save(); g.strokeStyle = C.dim; g.lineWidth = 4; g.beginPath(); g.ellipse(HEAD.x, HEAD.y, HEAD.rx, HEAD.ry, 0, 0, TAU); g.stroke(); g.restore();
    telop(g, '脳', HEAD.x, 440, kHead, { size: 40, color: '@dim', align: 'center' });
  }
  telop(g, '赤', HEAD.x, 650, kAka, { size: 120, mincho: true, align: 'center' });
}
function h1Final(g, td) {
  ground(g, 'darkroom');
  promiseCards(g, { k: [1, 1, 1, 1], lit: [1, 1, 1, 1], flip: [1, 1, 1, 1], t: td });
  mini4(g, 1, 1, 1);
  title(g, 'まとめ', 1e9, 0, { act: 7 });
}
// ═══ hết h1Final ═══

/** Vòng sáng trung tính quanh một phần của mini (khoá theo chữ): sáng lên rồi tắt. */
function ring(g, x, y, w, h, a) {
  if (a <= 0) return;
  g.save(); g.strokeStyle = `rgba(237,232,223,${0.85 * a})`; g.lineWidth = 3; g.beginPath(); g.roundRect(x, y, w, h, 14); g.stroke();
  g.strokeStyle = `rgba(237,232,223,${0.25 * a})`; g.lineWidth = 9; g.stroke(); g.restore();
}
const pulse = (t, a) => smooth(prog(t, a, a + 0.25)) * (1 - smooth(prog(t, a + 0.9, a + 1.3)));
/** Mini rời bằng trượt trái khi mini sau tới. */
const slide = (g, t, a, draw) => { const o = outCubic(clamp((t - a) / 0.5)); if (o >= 1) return; g.save(); g.translate(-1000 * o, 0); draw(); g.restore(); };

export default class Matome {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1-matome');
    this.START = L(132).start;
    this.FROM = Math.max(this.START - 2.6, L(131).end + 0.5);          // mở hồi: lead 2.6
    const A = actTimes(this.FROM, this.START);
    this.A = A;
    this.T = {
      l132: L(132).start, l133: L(133).start, l134: L(134).start, l135: L(135).start, end: L(135).end,
      f: [Math.max(w(132, '1つ目'), A.o1 + 0.25), w(133, '2つ目'), w(134, '3つ目'), w(135, '4つ目')],
      koshi: w(132, '光子'), kaidan: w(133, '階段'), tobi: w(133, '跳び下りる'), mono: w(133, 'もの'), atsui: w(133, '熱い'),
      ichi: w(134, 'いちばん'), mado: w(134, '窓'), shingo: w(135, '信号', 1), no: w(135, '脳'), egaku: w(135, '描く'),
    };
    must(`${this.T.f[3] > this.T.f[2] && this.T.f[2] > this.T.f[1] && this.T.f[1] > this.T.f[0]}`, true);
    must(`${this.T.egaku + 0.7 <= this.T.end + 0.05}`, true);           // 「赤」 viết xong trước L(135).end
  }
  sfx() {
    const T = this.T;
    return [...actCues(this.FROM, this.START), cue(T.f[0], 'card'), cue(T.koshi, 'photon', -6), cue(T.f[1], 'card'), cue(T.kaidan, 'beam', -8),
      cue(T.f[2], 'card'), cue(T.ichi, 'beam', -8), cue(T.f[3], 'card'), cue(T.no, 'aha', -4)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM, A = this.A;
    if (t >= T.end) { h1Final(g, T.end); return; }
    ground(g, 'darkroom');
    // ── bốn thẻ: hiện sau thẻ hồi, lật theo lời ──
    const kc = prog(t, A.o0, A.o1 + 0.3), fl = T.f.map(a => prog(t, a, a + 0.6)), lit = T.f.map((a, i) => 0.4 + 0.6 * prog(t, a, a + 0.4));
    promiseCards(g, { k: [kc, kc, kc, kc], lit: lit.map(v => v * (kc > 0 ? 1 : 0)), flip: fl, t: Math.min(t, T.end) });
    // ── mini ① wave + photon ──
    slide(g, t, T.l133 + 0.2, () => {
      const k = prog(t, A.o1, A.o1 + 1.0);
      if (k <= 0) return;
      wave(g, 160, 480, 880, PH_VIO, { lamPx: 76, amp: 36, k, phase: t * 3, w: 5 });
      telop(g, '波', 160, 410, prog(t, A.o1 + 0.3, A.o1 + 0.9), { size: 48 });
      photon(g, 520, 690, PH_VIO, { size: 130, amp: 30, scale: 0.19, phase: t * 3, a: smooth(prog(t, A.o1 + 0.6, A.o1 + 1.4)) });
      telop(g, `粒（光子）　${fmt(eV(PH_VIO), 1)} eV`, 160, 800, prog(t, A.o1 + 0.9, T.koshi + 0.2), { size: 40 });
      ring(g, 300, 606, 440, 148, pulse(t, T.koshi));
    });
    // ── mini ② ladder 3→2 + dải liên tục ──
    if (t > T.l133) slide(g, t, T.l134 + 0.2, () => {
      const k = prog(t, T.l133 + 0.2, T.l133 + 1.2);
      const Lr = ladder(g, { x: 200, w: 260, y0: 300, sc: 50, gap: 70, k, labels: false, nmax: 3 });
      ladderDrop(g, Lr, 3, 2, 130, prog(t, T.tobi, T.tobi + 0.8), { w: 6 });
      telop(g, '電子の階段', 330, 640, prog(t, T.kaidan, T.kaidan + 0.7), { size: 36, align: 'center' });
      const ks = prog(t, T.mono, T.mono + 0.9);
      if (ks > 0) { spectrumStrip(g, 560, 360, 320, 44, { k: ks }); telop(g, '熱で光る', 720, 460, prog(t, T.atsui, T.atsui + 0.6), { size: 36, align: 'center' }); }
      ring(g, 176, 276, 316, 290, pulse(t, T.kaidan));
      ring(g, 546, 346, 348, 76, pulse(t, T.atsui));
    });
    // ── mini ③ thước phổ hẹp, khe thấy được ──
    if (t > T.l134) slide(g, t, T.l135 + 0.2, () => {
      const R = { x0: 160, x1: 880, top: 3, bot: -12 }, k = prog(t, T.l134 + 0.2, T.l134 + 1.4);
      const S = specRuler(g, { y: 520, h: 48, k, window: prog(t, T.mado - 0.4, T.mado + 0.5), labels: 0, pows: 0, R });
      if (k >= 1) {
        telop(g, 'ガンマ線', 160, 640, 1, { size: 32, color: '@dim' });
        telop(g, '電波', 880, 640, 1, { size: 32, color: '@dim', align: 'right' });
        telop(g, '可視光', (S.va + S.vb) / 2, 430, prog(t, T.ichi, T.ichi + 0.7), { size: 44, align: 'center' });
        ring(g, S.va - 30, 490, S.vb - S.va + 60, 110, pulse(t, T.mado));
      }
    });
    // ── mini ④ mắt → 信号 → đầu 「赤」 ──
    if (t > T.l135) {
      mini4(g, prog(t, T.l135 + 0.2, T.l135 + 1.0), prog(t, T.shingo - 0.2, T.no + 0.5), prog(t, T.egaku, T.egaku + 0.7));
      ring(g, 652, 440, 260, 300, pulse(t, T.no));
    }
    // ── tiêu đề + thẻ hồi ──
    title(g, 'まとめ', t, A.o1 - 0.2, { act: 7 });
    actCard(g, t, F, this.START, 7);
  }
}
