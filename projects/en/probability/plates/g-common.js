// Phần dùng chung giữa các cảnh probability (không mang số riêng của cảnh). Hằng bố cục ở đây — đổi một chỗ.
import { W, H, C, AR, MO, clamp, hash, prog, lerp, outCubic, write, calc, big, hi, ring, strike, check, arrow, die, rollDie, betCard,
  contact, hand, seg, measure, N, figure, gambler, POSE, poseMix, smooth } from '../kit.js';

// bố cục hai thẻ cược (= lab notebook khung 0 = thumbnail)
export const CARD = { xs: [250, 1030], y: 250, w: 640, h: 560 };
export const BET = [
  { n: 1, times: '× 4', want: 'at least one 6', naive: '4 × 1/6 = 2/3', p: N.p4, col: C.win, final: +N.p4 },
  { n: 2, times: '× 24', want: 'at least one double 6', naive: '24 × 1/36 = 2/3', p: N.p24, col: C.lose, final: +N.p24 },
];

/** Một thẻ cược. s = { k, dice (0..1 bật), roll (null | {k, seed}), times, want, naive (k viết), pct (k), mark (k), sim (null | u 0..1), games (k) } */
export function betPanel(g, i, s, t) {
  const b = BET[i], x = CARD.xs[i], y = CARD.y, w = CARD.w, h = CARD.h;
  betCard(g, x, y, w, h, i ? 'BET 2' : 'BET 1', { k: s.k ?? 1, rot: i ? 0.012 : -0.014 });
  if ((s.k ?? 1) < 1) return;
  g.save(); g.translate(x + w / 2, y + h / 2); g.rotate(i ? 0.012 : -0.014); g.translate(-(x + w / 2), -(y + h / 2));
  const cy = y + 178;
  // xúc xắc: đứng yên (dice) hoặc đang lăn (roll: mặt đổi theo hash, dừng ở 6)
  const face = s.face ?? 6;
  if (b.n === 1) dieOrRoll(g, x + 210, cy, 150, face, C.dieA, s, -0.12, 1);
  else { dieOrRoll(g, x + 130, cy + 6, 112, face, C.dieA, s, -0.16, 2); dieOrRoll(g, x + 252, cy - 4, 112, face, C.dieB, s, 0.1, 3); }
  if (s.times) write(g, b.times, x + w - 70, cy + 34, s.times, { font: `800 108px ${AR}`, color: C.ink, align: 'right' });
  if (s.count != null) write(g, String(s.count), x + w - 70, cy + 96, 1, { font: `500 40px ${MO}`, color: C.ink2, align: 'right' });
  if (s.want) write(g, b.want, x + 60, y + 300, s.want, { font: `600 36px ${AR}`, color: C.ink2 });
  if (s.naive) calc(g, b.naive, x + 60, y + 362, s.naive, { size: 38 });
  if (s.naiveHi) { const nw = measure(g, b.naive, `500 38px ${MO}`); hi(g, x + 52, y + 328, nw + 18, 48, s.naiveHi); }
  // mô phỏng: thanh tiến độ + % chạy hội tụ (tất định) — rồi số thật
  if (s.sim != null) {
    const u = clamp(s.sim), games = Math.round(10000 * u), noise = (hash(Math.floor(u * 60) + i * 97) - 0.5) * 18 * Math.pow(1 - u, 1.4);
    const v = u < 0.02 ? 0 : b.final + noise;
    const live = 1 - clamp((s.pct || 0) * 3);                       // bộ đếm nhường chỗ cho số thật
    if (live > 0) { g.save(); g.globalAlpha *= live;
      big(g, (u < 0.02 ? '—' : v.toFixed(1)) + '%', x + w / 2, y + 500, 1, { size: 120, color: C.pencil });
      write(g, `${games.toLocaleString('en-US')} games`, x + w / 2, y + 545, 1, { font: `500 30px ${MO}`, color: C.ink2, align: 'center' }); g.restore(); }
  }
  if (s.pct) {
    const pw = big(g, b.p + '%', x + w / 2, y + 500, s.pct, { size: 140, color: b.col });
    if (s.mark) { if (i === 0) ring(g, x + w / 2, y + 458, pw / 2 + 62, 86, s.mark, { color: C.win, w: 6, seed: 12 });
      else { const yy = y + 532, P = []; for (let q = 0; q <= 24; q++) P.push([x + w / 2 - pw / 2 + q * pw / 24, yy + (q % 2 ? 9 : -5)]); hand(g, P, { w: 6, color: C.lose, k: s.mark, jit: 0.6, seed: 77 }); } }
  }
  if (s.trend) { const ax = x + w - 70, a = y + 380, b = y + 290; if (i === 0) arrow(g, ax, a, ax, b, s.trend, { color: C.win, w: 7 }); else arrow(g, ax, b, ax, a, s.trend, { color: C.lose, w: 7 }); }
  g.restore();
}
function dieOrRoll(g, cx, cy, s, face, col, st, rot, seed) {
  if (st.roll) { const k = st.roll.k, f = k >= 1 ? face : 1 + Math.floor(hash(Math.floor(k * 16) + seed * 13 + st.roll.seed * 7) * 6);
    const wob = k >= 1 ? 0 : Math.sin(k * 40 + seed) * 0.5 * (1 - k);
    die(g, cx, cy - Math.abs(Math.sin(k * Math.PI * 4)) * 26 * (1 - k), s, f, col, { rot: rot + wob }); return; }
  die(g, cx, cy, s, face, col, { rot, k: st.dice ?? 1 });
}

/** Tiêu đề SAME ODDS? trên dạ vàng (vật của thumbnail). */
export function sameOdds(g, k = 1, { y = 160, slash = 0 } = {}) {
  const s = 'SAME ODDS?', w = measure(g, s, `800 112px ${AR}`);
  hi(g, W / 2 - w / 2 - 30, y - 86, w + 60, 92, clamp(k * 1.6));
  write(g, s, W / 2, y, clamp(k * 1.4 - 0.2), { font: `800 112px ${AR}`, color: C.ink, align: 'center' });
}
/** Dấu "=" lớn giữa hai thẻ; slash k → gạch đỏ thành ≠. */
export function bigEquals(g, k, slash = 0, { x = 960, y = 470 } = {}) {
  if (k <= 0) return;
  hand(g, seg(x - 44, y - 18, x + 44, y - 18, 8), { w: 12, color: C.ink, k: clamp(k * 2), jit: 1, seed: 5 });
  hand(g, seg(x - 44, y + 18, x + 44, y + 18, 8), { w: 12, color: C.ink, k: clamp(k * 2 - 1), jit: 1, seed: 6 });
  if (slash > 0) strike(g, x + 30, y - 60, x - 30, y + 60, slash, { w: 10, seed: 8 });
}

/** Tư thế người que pha giữa hai tư thế theo k (lấy đà → làm → đà theo: k qua smooth). */
export const pose = (a, b, k) => poseMix(POSE[a], POSE[b], smooth(clamp(k)));

/** Mascot nhỏ góc dưới (DNA §5): xuất hiện từ `from`. */
export function mascot(g, t, pose_, from, { x = 150, h = 260, flip = false } = {}) {
  figure(g, pose_, x, 1080, h, prog(t, from, from + 0.35), { t, flip });
}
