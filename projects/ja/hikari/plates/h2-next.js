// h2 · 次回 (p2 câu 136–138, hết video) — ERA day, CONTINUES = true (bắt buộc: khung đầu = khung cuối h1 — h1Final chép GIỐNG HỆT).
//  FROM: h1Final → 雨戸 khép (amado 0→1 from left, 0.45 s) → nền ngày + 雨戸 mở hết (amado 1→0 from right) — DNA §7 kết bài.
//  l136 「次に虹を見つけたら」 · 人 (nét '@dark', KHÔNG phải mascot) quay lưng Mặt Trời trái; 「太陽に背を向けて、頭の影を探そう」; bóng đầu trên đất
//  l137 CẦU VỒNG TRÒN quanh bóng đầu (đỏ ngoài, tím trong; wlCss source-over; bán kính ∝ descartes().theta) 「皆さんだけに見えている虹」
//  l138 cảnh trượt trái; biển GIỮA khung 「99の発見」+「チャンネル登録」 đứng YÊN tới hết (≥ 4 s); mascot `wave` (nói) bên phải.
// Mọi mốc từ chữ (L / w). Chữ nền ngày: color '@dark', shadow false. Chữ chỉ qua telop; màu có sắc chỉ qua wlCss (ánh sáng).
import { C, W, H, TAU, FLOOR, lookup, must, clamp, prog, outCubic, ground, amado, figure, telop, wlCss, descartes, eye, arrow, promiseCards, title, cue } from '../kit.js';

const D = { color: '@dark', shadow: false };
// Mặt Trời thấp (~24° trên đường chân trời — cầu vồng chính chỉ có khi < 42°): bóng đầu rơi XA phía trước người, cầu vồng nằm hết ở phía đối diện Mặt Trời
const SUN = { x: 240, y: 422, r: 44 }, HEADP = { x: 640, y: 600, r: 38 }, GROUND_X = 1480, GROUND_Y = 975;    // 太陽, đầu người, bóng đầu trên đất (thẳng hàng)
const RB = { cx: GROUND_X, cy: GROUND_Y, K: 440 / descartes(700).theta };                                    // đỏ (700 nm) ngoài, bán kính 440 px; tím trong (≈ 420 px)
const PL = { x: 560, y: 290, w: 800, h: 400 };                                                                // biển kênh giữa khung (tâm x = W/2)
const MASCOT = [1650, 620];
const out = (t, a, d = 0.8) => outCubic(clamp((t - a) / d));
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

/** Người (nét '@dark') đứng quay lưng Mặt Trời (trái), nhìn sang phải. */
function person(g, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), { x, y, r } = HEADP;
  g.save(); g.globalAlpha = e; g.translate(0, (1 - e) * 60); g.fillStyle = C.dayInk;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.beginPath(); g.moveTo(x + r - 4, y - 6); g.lineTo(x + r + 12, y + 6); g.lineTo(x + r - 4, y + 12); g.closePath(); g.fill();      // mũi
  g.beginPath(); g.roundRect(x - 34, y + r + 8, 68, 160, 18); g.fill();                                                             // thân
  g.fillRect(x - 28, y + r + 150, 24, FLOOR - (y + r + 150)); g.fillRect(x + 4, y + r + 150, 24, FLOOR - (y + r + 150));            // chân
  g.restore();
}
/** Mặt Trời (nét '@dark' — vòng + tia). */
function sun(g, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.globalAlpha = e; g.strokeStyle = C.dayInk; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.arc(SUN.x, SUN.y, SUN.r, 0, TAU); g.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.beginPath(); g.moveTo(SUN.x + Math.cos(a) * (SUN.r + 14), SUN.y + Math.sin(a) * (SUN.r + 14)); g.lineTo(SUN.x + Math.cos(a) * (SUN.r + 32), SUN.y + Math.sin(a) * (SUN.r + 32)); g.stroke(); }
  g.restore();
}
/** Cầu vồng tròn quanh bóng đầu: phần trên đường chân trời (FLOOR), quét từ chân trái sang phải theo k. */
function rainbow(g, k) {
  if (k <= 0) return;
  g.save(); g.lineCap = 'butt'; g.lineWidth = 5.5;
  for (let nm = 700; nm >= 405; nm -= 2) {
    const r = descartes(nm).theta * RB.K, f = Math.asin(clamp((FLOOR - RB.cy) / r, -1, 1)), a0 = Math.PI - f, a1 = 2 * Math.PI + f;
    g.strokeStyle = wlCss(nm, 0.92, { fade: true }); g.beginPath(); g.arc(RB.cx, RB.cy, r, a0, a0 + (a1 - a0) * clamp(k)); g.stroke();
  }
  g.restore();
}

export default class Next {
  static ERA = 'day';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2-next');
    this.START = L(136).start;
    this.FROM = Math.max(this.START - 1.2, L(135).end + 0.5);
    this.CONTINUES = true;                                           // khung đầu = khung cuối h1 (h1Final) — trang cắt thẳng, im
    this.END1 = L(135).end;                                          // h1 đứng yên từ đây
    this.T = {
      tsugi: w(136, '次'), mi: w(136, '見つけたら'), taiyo: w(136, '太陽'), se: w(136, '背'), kage: w(136, '影'), sagashi: w(136, '探して'),
      l137: L(137).start, chushin: w(137, '中心'), en: w(137, '円'), minna: w(137, '皆さん'), mie: w(137, '見えて'),
      l138: L(138).start, gosh: w(138, 'ご視聴'), arigatou: w(138, 'ありがとう'), ch: w(138, 'チャンネル'), toroku: w(138, '登録'), end: L(138).end,
    };
    const T = this.T;
    // vĩ tuyến thật: bóng đầu thẳng hàng 太陽 → đầu (đã dựng bằng hằng số); cầu vồng đỏ 600 px, tím tỉ lệ descartes
    must(`${Math.abs(descartes(404.7).theta / descartes(700).theta * 440 - 420) < 2}`, true);
    must(`${Math.atan2(GROUND_Y - HEADP.y, GROUND_X - HEADP.x) * 180 / Math.PI < 26 && Math.atan2(HEADP.y - SUN.y, HEADP.x - SUN.x) * 180 / Math.PI < 26}`, true);   // độ cao Mặt Trời < 26° (≪ 42°)
    must(`'${descartes(700).theta.toFixed(1)}'`, '42.5');
    // mascot wave h 620 (crop 0.45 của ảnh 542×1440, bbox trái ≈ 11): mép trái thân phải cách biển ≥ 20 px
    const s = MASCOT[1] / (1440 * 0.45);
    must(`${MASCOT[0] - 271 * s + 11 * s > PL.x + PL.w + 20}`, true);
    // biển đứng yên ≥ 4 s tới hết trang (tail 2.0 của build.json): chữ cuối viết xong tại w(138,'登録')
    must(`${T.end + 2.0 - (T.ch + 0.1) >= 4.4}`, true);
    must(`${T.toroku > T.ch}`, true);
  }
  sfx() {
    const T = this.T, F = this.FROM;
    return [cue(F + 0.2, 'amado', -4), cue(Math.max(T.tsugi, F + 1.2), 'telop', -4), cue(T.taiyo, 'beam', -6), cue(T.kage, 'step', -6),
      cue(T.chushin, 'beam', -4), cue(T.minna, 'photon', -6), cue(T.gosh, 'aha', -8), cue(T.ch + 0.1, 'telop', -6)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    // ── FROM → 雨戸 khép trên h1Final → nền ngày + 雨戸 mở hết ──
    if (t < F + 0.45) { h1Final(g, this.END1); amado(g, prog(t, F, F + 0.45), { from: 'left' }); return; }
    ground(g, 'day');
    const sceneOut = out(t, T.l138 - 0.2, 0.9);
    if (sceneOut < 1) {
      g.save(); g.translate(-1500 * sceneOut, 0);
      // đường nắng: 太陽 → đầu → bóng đầu (nét đứt '@dark')
      const k1 = prog(t, T.taiyo, T.se + 0.6), k2 = prog(t, T.kage - 0.1, T.kage + 0.7);
      g.save(); g.strokeStyle = 'rgba(35,33,31,0.4)'; g.lineWidth = 3; g.setLineDash([12, 10]);
      const ux = HEADP.x - SUN.x, uy = HEADP.y - SUN.y, ul = Math.hypot(ux, uy), sx = SUN.x + ux / ul * 70, sy = SUN.y + uy / ul * 70;
      if (k1 > 0) { g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + (HEADP.x - sx) * k1, sy + (HEADP.y - sy) * k1); g.stroke(); }
      if (k2 > 0) { g.beginPath(); g.moveTo(HEADP.x, HEADP.y); g.lineTo(HEADP.x + (GROUND_X - HEADP.x) * k2, HEADP.y + (GROUND_Y - HEADP.y) * k2); g.stroke(); }
      g.restore();
      sun(g, prog(t, T.taiyo, T.taiyo + 0.6));
      person(g, prog(t, T.se, T.se + 0.6));
      const ks = outCubic(prog(t, T.kage, T.kage + 0.6));                                  // bóng đầu trên đất
      if (ks > 0) { g.save(); g.fillStyle = 'rgba(35,33,31,0.62)'; g.beginPath(); g.ellipse(GROUND_X, GROUND_Y, 74 * ks, 20 * ks, 0, 0, TAU); g.fill(); g.restore();
        telop(g, '頭の影', GROUND_X + 90, 1006, prog(t, T.kage + 0.2, T.kage + 0.8), { size: 34, ...D }); }
      rainbow(g, outCubic(prog(t, T.chushin - 0.3, T.en + 0.3)));
      // chữ l136 (rút lên khi l137 tới) và l137
      const o136 = out(t, T.l137 + 0.9, 0.7);
      if (o136 < 1) { g.save(); g.translate(0, -420 * o136);
        telop(g, '次に虹を見つけたら', 960, 170, prog(t, Math.max(T.tsugi, F + 1.2), T.mi + 0.3), { size: 56, mincho: true, align: 'center', ...D });
        telop(g, '太陽に背を向けて、頭の影を探そう', 960, 262, prog(t, T.taiyo, T.sagashi + 0.4), { size: 44, align: 'center', ...D });
        g.restore(); }
      telop(g, '皆さんだけに見えている虹', 960, 170, prog(t, T.minna, T.mie + 0.6), { size: 56, mincho: true, align: 'center', ...D });
      g.restore();
    }
    // ── l138: biển kênh (đứng yên) + mascot wave ──
    if (t > T.l138 - 0.3) {
      const kp = outCubic(prog(t, T.l138 + 0.2, T.l138 + 0.9)), dy = Math.round((1 - kp) * -(PL.y + PL.h + 40)), { x, y, w, h } = PL;
      g.save(); g.translate(0, dy);
      g.save(); g.shadowColor = 'rgba(35,33,31,0.25)'; g.shadowBlur = 36; g.shadowOffsetY = 12; g.fillStyle = 'rgba(246,242,234,0.94)'; g.fillRect(x, y, w, h); g.restore();
      g.strokeStyle = C.dayInk; g.lineWidth = 3; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      g.strokeStyle = 'rgba(35,33,31,0.35)'; g.lineWidth = 1; g.strokeRect(x + 14.5, y + 14.5, w - 29, h - 29);
      telop(g, '99の発見', W / 2, y + 170, prog(t, T.l138 + 0.7, T.arigatou + 0.8), { size: 112, mincho: true, align: 'center', ls: 6, ...D });
      const kl = prog(t, T.arigatou + 0.6, T.ch - 0.5);
      if (kl > 0) { g.fillStyle = C.dayInk; g.fillRect(W / 2 - 200, y + 214, 400 * outCubic(kl), 3); }
      telop(g, 'チャンネル登録', W / 2, y + 320, prog(t, T.ch - 0.5, T.ch + 0.1), { size: 60, mincho: true, align: 'center', ls: 4, ...D });
      g.restore();
      figure(g, 'wave', MASCOT[0], H, MASCOT[1], prog(t, T.gosh, T.gosh + 0.6), { t, lit: 0 });
    }
    amado(g, 1 - prog(t, F + 0.45, F + 1.4), { from: 'right' });
  }
}
