// Gác chất lượng người que (docs/study/08-stick-animation.md §3.5) — chạy actor(t) của bàn thử ở 30 fps, đo trên khớp
// thật mà engine/stick.js trả về. Mã 1 nếu vượt ngưỡng. node tools/lab/stick2-qa.mjs
import { stick, L } from '../../engine/stick.js';
import { NOOP as noop } from '../../engine/stickmove.js';
const { actor, ground, H, DIR, SCENE, CARD } = await import(process.argv[2] ? new URL(process.argv[2], `file://${process.cwd()}/`).href : './stick2-scene.js');   // bàn thử khác: node tools/lab/stick2-qa.mjs tools/lab/<x>-scene.js

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const ang = (a, m, e) => { const u = [a[0] - m[0], a[1] - m[1]], v = [e[0] - m[0], e[1] - m[1]];
  return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))))) * 180 / Math.PI; };
const cross = (p, q, r, s) => { const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  return d(p, q, r) * d(p, q, s) < 0 && d(r, s, p) * d(r, s, q) < 0; };

const bad = [], stat = { kneeMin: 180, slide: 0, len: 0, cross: 0, sink: 0, jump: 0 };
let prev = null;
for (let f = 0; f <= SCENE.dur * 30; f++) {
  const t = f / 30, A = actor(t);
  const J = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, feet: A.feet, hands: A.hands, squash: A.squash ?? 1, arm: A.arm ?? 1 });
  for (const q of [J.hip, J.neck, J.head, J.handL, J.handR, J.footL, J.footR]) if (!Number.isFinite(q[0] + q[1])) { bad.push(`t ${t.toFixed(2)} khớp NaN (${A.phase})`); break; }
  for (const [nm, lg] of [['L', J.legL], ['R', J.legR]]) {
    const k = ang(lg.a, lg.m, lg.e); stat.kneeMin = Math.min(stat.kneeMin, k);
    if (k < 35) bad.push(`t ${t.toFixed(2)} gối ${nm} gập ${k.toFixed(0)}° (< 35° trong)`);
    // gối phải nằm về phía mặt nhìn của đường hông→chân (không gập ngược)
    const side = ((lg.e[0] - lg.a[0]) * (lg.m[1] - lg.a[1]) - (lg.e[1] - lg.a[1]) * (lg.m[0] - lg.a[0])) * DIR;
    if (k < 170 && side > 0 && A.phase !== 'sit') bad.push(`t ${t.toFixed(2)} gối ${nm} gập ngược`);
    const sq = A.squash ?? 1, dl = Math.abs(dist(lg.a, lg.m) - L.thigh * H * sq) + Math.abs(dist(lg.m, lg.e) - L.shin * H * sq);
    if ((A.squash ?? 1) === 1) stat.len = Math.max(stat.len, dl);   // squash & stretch cố ý đổi độ dài
    const gy = lg.e[0] > CARD.x0 && lg.e[0] < CARD.x1 && A.hip[1] < CARD.top ? CARD.top : ground(lg.e[0]);
    if (lg.e[1] > gy + 1.5) { stat.sink++; bad.push(`t ${t.toFixed(2)} chân ${nm} lún ${(lg.e[1] - gy).toFixed(1)} px`); }
  }
  for (const [i, hd] of [[0, J.handL], [1, J.handR]]) if (A.hands?.[i]) {           // tay khoá vào vật phải CHẠM (IK không với tới = tay lơ lửng)
    const d = dist(hd, A.hands[i]); if (d > 3) bad.push(`t ${t.toFixed(2)} tay ${i} cách vật ${d.toFixed(0)} px`); }
  for (const [i, ft] of [[0, J.footL], [1, J.footR]]) if (A.feet?.[i] && A.phase !== 'air' && (!A.planted || A.planted[i])) {   // bay: chân rời đất, điểm khoá chỉ là đích nối
    const d = dist(ft, A.feet[i]); if (d > 3) bad.push(`t ${t.toFixed(2)} chân ${i} không tới điểm khoá (${d.toFixed(0)} px)`); }
  for (const arm of [J.armR]) if (cross(arm.m, arm.e, J.hip, J.neck)) stat.cross++;
  if (prev && A.planted && prev.A.planted) for (const i of [0, 1]) if (A.planted[i] && prev.A.planted[i]) {
    const d = dist(A.feet[i], prev.A.feet[i]); stat.slide = Math.max(stat.slide, d);
    if (d > 0.5) bad.push(`t ${t.toFixed(2)} chân trụ ${i} trượt ${d.toFixed(1)} px`);
  }
  // A.fast = cú bật / đòn đánh CỐ Ý (nhịp Becker, study 10): đầu được phép đi xa trong một khung
  if (prev && !A.fast && !prev.A.fast) { const d = dist(J.head, prev.J.head); if (d > 0.16 * H) stat.jump++, bad.push(`t ${t.toFixed(2)} đầu nhảy ${d.toFixed(0)} px/khung`); }
  prev = { A, J };
}
console.log(`gối gập nhất ${stat.kneeMin.toFixed(0)}° trong · chân trụ trượt tối đa ${stat.slide.toFixed(2)} px · lệch độ dài chi ${stat.len.toFixed(2)} px · tay trước cắt thân ${stat.cross} khung · lún đất ${stat.sink} · đầu giật ${stat.jump}`);
if (bad.length) { console.log(bad.slice(0, 40).join('\n')); if (bad.length > 40) console.log(`… +${bad.length - 40}`); process.exit(1); }
console.log('✓ đạt');
