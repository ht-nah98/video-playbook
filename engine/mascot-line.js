// Mascot kênh Anh 99% from scratch VẼ NÉT bằng code (2026-10-29) — chuyển thể cậu bé anime blouse trắng (assets/character-v2)
// sang dạng đầu tròn của kênh sử (projects/hist/_kit/narrator.js): tóc rối nâu đen phủ trán, kính tròn gọng mảnh, mắt lờ đờ,
// áo blouse trắng xắn tay, áo thun đen, quần đen, giày đen đế trắng. Dùng cho thumbnail (người dùng: "audience sợ nội dung AI").
// Tất định: không Math.random — hash(i). Bàn thử: projects/en/_lab/mascot.html (biểu cảm), mascot-poses.html (dáng), mascot-yaw.html (3/4).
//   import { bindMascot, mascot, head } from '…/engine/mascot-line.js';  bindMascot(g);
//   const a = mascot(x, yĐếGiày, h, { mood, mouth, arms | hands, crouch, lift, lean, yaw, look, lookY, blink, sweat, flip, noArm });
//   a = { hy (tâm đầu), r, top (vai), hands: [[x,y],[x,y]] }; head(x, y, r, { mood, mouth, yaw, look, blush, sweat }) cho cận mặt.
//   mood:  deadpan | shock | smug | happy | angry | sad | confused | think
//   mouth: flat | o | mid | wide | grin | smirk | frown | wavy   (nói: talkMouth(open, t)); chớp mắt: blinkAt(t, seed)
//   arms:  rest | point | shrug | think | cheer | facepalm | hold | present | pockets | wave | chalk  (hands = đích tuyệt đối, ghi đè)
//   yaw:   quay 3/4 (rad, ±1) — mặt chiếu khối cầu, thân + vai khối trụ (LESSONS §220). Diễn trong cảnh: engine/mascot-actor.js.
//   KHÔNG bọc lên khung người que (bản `skin()` đã xoá — dáng quái dị, §219).
export const INK = '#1E2328', SKIN = '#FBE3CC', HAIR = '#3B2A26', HAIR_HI = '#6E5045', COAT = '#FAFAF7', COAT_SH = '#D3D7E0', TEE = '#1D1D21', PANTS = '#26262C';
let g = null;
export function bindMascot(ctx) { g = ctx; }

// tóc (đơn vị = bán kính đầu, tâm đầu = 0,0): viền ngoài trái → đỉnh → phải, rồi mái răng cưa phải → trái (che trán, chạm gọng kính)
const OUTER = [[-1.02, 0.34], [-1.22, 0.12], [-1.08, -0.15], [-1.28, -0.4], [-1.04, -0.6], [-1.12, -0.86], [-0.74, -0.92], [-0.62, -1.16], [-0.3, -1.04],
  [-0.08, -1.22], [0.18, -1.04], [0.48, -1.18], [0.6, -0.94], [0.98, -0.96], [0.98, -0.7], [1.28, -0.5], [1.08, -0.26], [1.24, 0.04], [1.02, 0.3]];
const FRINGE = [[0.96, 0.1], [0.86, -0.18], [0.7, 0.02], [0.54, -0.3], [0.34, -0.02], [0.16, -0.32], [0.0, 0.04], [-0.2, -0.3], [-0.38, -0.0],
  [-0.56, -0.32], [-0.72, -0.02], [-0.86, -0.24], [-0.98, 0.14]];
const STRANDS = [[-0.75, -0.45, -0.45, -0.88], [-0.32, -0.42, -0.1, -0.98], [0.12, -0.45, 0.32, -0.92], [0.55, -0.4, 0.78, -0.78]];

// ── đầu xoay 3/4 (yaw, 2026-10-29): mặt chiếu lên khối cầu đầu. F(u, v) → điểm trên mặt (u, v đơn vị bán kính, nhìn thẳng)
// sau khi đầu quay góc yaw quanh trục dọc: { X, Y, k (co ngang tại đó), z (> 0 = mặt hướng ra) }; điểm ra sau đầu → bám mép.
function faceMap(x, y, r, yaw) { const cs = Math.cos(yaw), sn = Math.sin(yaw);
  return (u, v) => { const zz = Math.sqrt(Math.max(1e-4, 1 - u * u - v * v)), lim = Math.sqrt(Math.max(0, 1 - v * v));
    let u2 = u * cs + zz * sn; const z2 = -u * sn + zz * cs; if (z2 < 0) u2 = Math.sign(u2) * lim;
    return { X: x + u2 * r, Y: y + v * r, k: Math.max(0.3, Math.min(1.12, z2 / zz)), z: z2 }; }; }
const inDisk = ([u, v]) => u * u + v * v < 0.995;

function hair(x, y, r, lw, F, sn) {
  const P = ([u, v]) => { if (!sn) return [x + u * r, y + v * r]; if (inDisk([u, v])) { const f = F(u, v); return [f.X, f.Y]; }
    return [x + (u + sn * 0.05 * (1 - Math.abs(u))) * r, y + v * r]; };                                                    // chỏm ngoài = bóng khối cầu, gần như đứng yên
  g.save(); g.fillStyle = HAIR; g.strokeStyle = INK; g.lineWidth = lw; g.lineJoin = 'round';
  g.beginPath(); const pts = OUTER.map(P); g.moveTo(...pts[0]);
  for (let i = 1; i < pts.length - 1; i++) { const m = [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2]; g.quadraticCurveTo(...pts[i], ...m); }   // tóc ngoài: chỏm mềm
  g.lineTo(...pts[pts.length - 1]);
  for (const p of FRINGE.map(P)) g.lineTo(...p);                                                                                       // mái: răng cưa nhọn
  g.closePath(); g.fill(); g.stroke();
  g.strokeStyle = HAIR_HI; g.lineWidth = lw * 0.55; g.lineCap = 'round';
  for (const [a, b, c, d] of STRANDS) { g.beginPath(); g.moveTo(...P([a, b])); g.quadraticCurveTo(...P([(a + c) / 2 - 0.1, (b + d) / 2]), ...P([c, d])); g.stroke(); }
  g.strokeStyle = HAIR; g.lineWidth = lw * 1.4;                                                                                   // hai cọng tóc vểnh mảnh
  const Q = ([u, v]) => [x + (u + sn * 0.3) * r, y + v * r];
  for (const [a, b, c, d, e, f] of [[-0.12, -1.18, -0.05, -1.45, 0.2, -1.42], [0.06, -1.18, 0.22, -1.36, 0.36, -1.24]]) { g.beginPath(); g.moveTo(...Q([a, b])); g.quadraticCurveTo(...Q([c, d]), ...Q([e, f])); g.stroke(); }
  g.restore(); }

/** mắt sau kính — mỗi bên vẽ quanh (0, 0) trong khung đã chiếu lên khối cầu (F) */
function eyes(r, o, lw, F) { const mood = o.mood ?? 'deadpan', lk = (o.look ?? 0) * r * 0.07, ly = (o.lookY ?? 0) * r * 0.05;
  for (const s of [-1, 1]) { const f = F(s * 0.37, 0.14); if (f.z < 0.08) continue;
    g.save(); g.translate(f.X, f.Y); g.scale(f.k, 1); g.strokeStyle = INK; g.fillStyle = INK; g.lineCap = 'round'; g.lineWidth = lw * 1.3;
    const ex = 0, ey = 0, m = mood === 'confused' ? (s < 0 ? 'deadpan' : 'shock') : mood;
    const dot = (dx, dy, rr) => { g.beginPath(); g.arc(ex + dx + lk, ey + dy + ly, rr, 0, 7); g.fill(); };
    if (o.blink && m !== 'happy') { g.beginPath(); g.moveTo(ex - r * 0.15, ey + r * 0.06); g.quadraticCurveTo(ex, ey + r * 0.1, ex + r * 0.15, ey + r * 0.06); g.stroke(); }   // chớp mắt
    else if (m === 'happy') { g.beginPath(); g.arc(ex, ey + r * 0.06, r * 0.1, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    else if (m === 'shock') { g.fillStyle = '#FFF'; g.lineWidth = lw; g.beginPath(); g.arc(ex, ey, r * 0.17, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; dot(0, 0, r * 0.045); }
    else if (m === 'think') { dot(r * 0.04, -r * 0.06, r * 0.055); g.beginPath(); g.moveTo(ex - r * 0.15, ey + r * 0.05); g.lineTo(ex + r * 0.15, ey + r * 0.05); g.stroke(); }   // nhìn lên, mi dưới
    else { const d = m === 'angry' ? 0.1 : m === 'sad' ? -0.09 : 0, lidY = m === 'smug' ? 0.02 : -0.03;                          // d > 0: đầu trong thấp (giận), < 0: đầu ngoài thấp (buồn)
      g.beginPath(); g.moveTo(ex - s * r * 0.16, ey + r * (lidY + d)); g.lineTo(ex + s * r * 0.16, ey + r * (lidY - d)); g.stroke();   // mi trên nặng = mắt lờ đờ
      dot(0, r * (m === 'smug' ? 0.09 : 0.07), r * 0.055); }
    g.restore(); } }
function glasses(r, lw, F) { g.save(); g.strokeStyle = INK; g.lineWidth = lw * 0.85; g.lineCap = 'round';
  for (const s of [-1, 1]) { const f = F(s * 0.37, 0.14); if (f.z < 0.08) continue;
    const a = F(s * 0.62, 0.11), b = F(s * 0.95, 0.06);
    if (a.z > 0) { g.beginPath(); g.moveTo(a.X, a.Y); g.lineTo(b.X, b.Y); g.stroke(); }                                          // gọng tai (bên khuất: ra sau đầu)
    g.save(); g.translate(f.X, f.Y); g.scale(f.k, 1); g.beginPath(); g.arc(0, 0, r * 0.25, 0, 7); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = lw * 0.6; g.beginPath(); g.arc(0, 0, r * 0.19, -2.4, -1.9); g.stroke(); g.restore(); }   // ánh kính
  const n = F(0, 0.16); g.save(); g.translate(n.X, n.Y); g.scale(n.k, 1); g.beginPath(); g.arc(0, 0, r * 0.12, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.restore();
  g.restore(); }
function mouth(x, y, r, m, lw) { g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round'; g.fillStyle = '#5A1E22';
  if (m === 'flat') { g.beginPath(); g.moveTo(x - r * 0.08, y); g.lineTo(x + r * 0.08, y); g.stroke(); }
  if (m === 'mid') { g.beginPath(); g.ellipse(x, y + r * 0.03, r * 0.11, r * 0.07, 0, 0, 7); g.fill(); g.stroke(); }
  if (m === 'o') { g.beginPath(); g.ellipse(x, y + r * 0.02, r * 0.07, r * 0.09, 0, 0, 7); g.fill(); g.stroke(); }
  if (m === 'wide') { g.beginPath(); g.ellipse(x, y + r * 0.05, r * 0.14, r * 0.17, 0, 0, 7); g.fill(); g.save(); g.clip(); g.fillStyle = '#E07A7A'; g.beginPath(); g.ellipse(x, y + r * 0.16, r * 0.1, r * 0.07, 0, 0, 7); g.fill(); g.restore(); g.stroke(); }
  if (m === 'grin') { g.beginPath(); g.moveTo(x - r * 0.2, y - r * 0.03); g.quadraticCurveTo(x, y + r * 0.02, x + r * 0.2, y - r * 0.03); g.quadraticCurveTo(x, y + r * 0.28, x - r * 0.2, y - r * 0.03); g.fill();
    g.save(); g.clip(); g.fillStyle = '#FFF'; g.fillRect(x - r * 0.2, y - r * 0.05, r * 0.4, r * 0.08); g.restore(); g.stroke(); }
  if (m === 'smirk') { g.beginPath(); g.moveTo(x - r * 0.12, y + r * 0.02); g.quadraticCurveTo(x + r * 0.04, y + r * 0.06, x + r * 0.15, y - r * 0.06); g.stroke(); }
  if (m === 'frown') { g.beginPath(); g.arc(x, y + r * 0.12, r * 0.12, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  if (m === 'wavy') { g.beginPath(); g.moveTo(x - r * 0.15, y); for (let i = 1; i <= 4; i++) g.quadraticCurveTo(x - r * 0.15 + (i - 0.5) * r * 0.075, y + (i % 2 ? -1 : 1) * r * 0.05, x - r * 0.15 + i * r * 0.075, y); g.stroke(); }
  g.restore(); }

/** đầu (dùng riêng cho avatar / thumbnail cận mặt): tâm (x, y), bán kính r. o.yaw (rad, ±1 ≈ ±57°, > 0 = quay sang PHẢI khung):
 *  mắt / kính / miệng / mái / tai chiếu lên khối cầu — xoay mượt từ nhìn thẳng sang 3/4 (bàn thử projects/en/_lab/mascot-yaw.html) */
export function head(x, y, r, o = {}) { const lw = o.lw ?? Math.max(3, r * 0.05), yaw = Math.max(-1, Math.min(1, o.yaw ?? 0)), sn = Math.sin(yaw);
  const F = faceMap(x, y, r, yaw);
  g.save(); g.strokeStyle = INK; g.lineWidth = lw; g.fillStyle = SKIN; g.lineJoin = 'round';
  const ear = (s, front) => { const f = F(s * 0.97, 0.12), w = 0.13 + 0.03 * Math.max(0, f.z - 0.25); if ((f.z > 0.35) !== front) return;
    g.beginPath(); g.ellipse(f.X, f.Y + r * 0.02, r * w, r * 0.2, 0, 0, 7); g.fill(); g.stroke();
    if (front) { const d = -Math.sign(sn); g.lineWidth = lw * 0.75; g.beginPath(); g.moveTo(f.X - d * r * 0.02, f.Y - r * 0.1);      // tai quay ra trước: vẽ đè mặt, vành trong hình chữ C
      g.quadraticCurveTo(f.X + d * r * 0.09, f.Y + r * 0.02, f.X - d * r * 0.01, f.Y + r * 0.12); g.stroke(); g.lineWidth = lw; } };
  for (const s of [-1, 1]) ear(s, false);
  g.beginPath(); g.ellipse(x, y, r * 0.97, r, 0, 0, 7); g.fill(); g.stroke();
  for (const s of [-1, 1]) ear(s, true);
  if (o.blush) { g.fillStyle = 'rgba(232,110,120,0.4)'; for (const s of [-1, 1]) { const f = F(s * 0.58, 0.42); if (f.z < 0.1) continue; g.beginPath(); g.ellipse(f.X, f.Y, r * 0.14 * f.k, r * 0.07, 0, 0, 7); g.fill(); } }
  eyes(r, o, lw, F); glasses(r, lw, F);
  if (Math.abs(sn) > 0.12) { const n = F(0, 0.4), d = Math.sign(sn); g.save(); g.globalAlpha = Math.min(1, (Math.abs(sn) - 0.12) * 4); g.lineWidth = lw * 0.9; g.lineCap = 'round';   // mũi chỉ hiện khi quay
    g.beginPath(); g.moveTo(n.X, n.Y - r * 0.07); g.quadraticCurveTo(n.X + d * r * 0.09, n.Y + r * 0.03, n.X - d * r * 0.01, n.Y + r * 0.06); g.stroke(); g.restore(); }
  { const m = F(0.02, 0.6); g.save(); g.translate(m.X, m.Y); g.scale(m.k, 1); mouth(0, 0, r, o.mouth ?? 'flat', lw); g.restore(); }
  hair(x, y, r, lw, F, sn);
  if (o.sweat) { g.fillStyle = '#9AD0F5'; const sx = x + r * 1.0, sy = y - r * 0.25; g.beginPath(); g.moveTo(sx, sy - r * 0.22); g.quadraticCurveTo(sx + r * 0.16, sy + r * 0.02, sx, sy + r * 0.1); g.quadraticCurveTo(sx - r * 0.16, sy + r * 0.02, sx, sy - r * 0.22); g.fill(); g.stroke(); }
  g.restore(); }

// tay: đích bàn tay theo tư thế, đơn vị h, tính từ vai (s = -1 trái, +1 phải)
const ARMS = { rest: [[-0.05, 0.21], [0.05, 0.21]], point: [[-0.05, 0.21], [0.3, -0.13]], shrug: [[-0.25, -0.03], [0.25, -0.03]], cheer: [[-0.05, 0.21], [0.1, -0.33]],
  hold: [[0.08, 0.1], [-0.08, 0.1]], present: [[-0.05, 0.21], [0.27, 0.02]], pockets: [[0.03, 0.17], [-0.03, 0.17]], wave: [[-0.05, 0.21], [0.2, -0.26]],
  chalk: [[-0.05, 0.21], [0.26, -0.06]], think: [[0.12, 0.1], null], facepalm: [[-0.05, 0.21], null] };

/** mascot toàn thân, LUÔN NHÌN THẲNG (người dùng 2026-10-29: "không làm được góc nghiêng thì chỉ làm góc thẳng"): x = giữa,
 *  y = đế giày, h = cao. Tay theo lối người dẫn kênh sử (`projects/hist/_kit/narrator.js`): MỘT ống tay blouse dày liền tới bàn
 *  tay tròn, cổ tay xắn một vòng — không cẳng tay que. Diễn bằng: hands (đích bàn tay tuyệt đối, ghi đè arms), crouch 0..1
 *  (khuỵu: thân hạ, gối bẹt ra), lift [trái, phải] (nhấc bàn chân, bước nhún), lean. Trả neo để gắn đạo cụ. */
export function mascot(x, y, h, o = {}) { const lw = o.lw ?? Math.max(3, h * 0.011), r = h * 0.19, t = o.t ?? 0, c = Math.max(0, Math.min(1, o.crouch ?? 0));
  const drop = c * h * 0.15, hy = y - h + r * 1.38 + drop, top = hy + r * 0.95, bot = top + h * 0.25, hem = top + h * 0.32, bw = h * 0.3;
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = lw;
  if (o.flip) { g.translate(x, 0); g.scale(-1, 1); g.translate(-x, 0); }
  if (o.lean) { g.translate(x, y); g.rotate(o.lean); g.translate(-x, -y); }
  const tube = (a, cp, e, w, fill) => { const p = () => { g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(...cp, ...e); };
    p(); g.lineWidth = w + lw * 2; g.strokeStyle = INK; g.stroke(); p(); g.lineWidth = w; g.strokeStyle = fill; g.stroke(); };
  // chân: ống quần dày háng → bàn chân; khuỵu thì gối bẹt ra ngoài; giày đen đế trắng
  const lift = o.lift ?? [0, 0];
  for (const [i, s] of [[0, -1], [1, 1]]) { const hx = x + s * bw * 0.17, fx = x + s * bw * (0.17 + 0.16 * c), fy = y - h * 0.035 - (lift[i] ?? 0) * h * 0.12;
    const lf = lift[i] ?? 0; tube([hx, bot - lw], [(hx + fx) / 2 + s * bw * (0.55 * c + 0.25 * lf), (bot + fy) / 2 - lf * h * 0.02], [fx - s * lf * bw * 0.06, fy], bw * 0.24, PANTS);   // gối bẹt ra khi khuỵu / co khi nhấc
    const sx = fx + s * h * 0.018, sy = fy + h * 0.035 - h * 0.03; g.lineWidth = lw; g.strokeStyle = INK;
    g.fillStyle = TEE; g.beginPath(); g.ellipse(sx, sy, bw * 0.19, h * 0.032, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#FFF'; g.beginPath(); g.roundRect(sx - bw * 0.2, sy - h * 0.002, bw * 0.4, h * 0.03, h * 0.012); g.fill(); g.stroke(); }
  // thân xoay theo đầu (yaw × 0.4): chi tiết mặt trước trượt trên khối trụ, mép áo (|u| ≥ 0.5) giữ nguyên bóng
  const tw = Math.max(-1, Math.min(1, o.yaw ?? 0)) * 0.4, U = u => Math.abs(u) >= 0.5 ? u : Math.max(-0.5, Math.min(0.5, 0.62 * Math.sin(Math.asin(u / 0.62) + tw)));
  const torso = () => { g.strokeStyle = INK; g.lineWidth = lw;
  // áo thun đen ở giữa (blouse mở)
  g.lineWidth = lw; g.fillStyle = TEE; g.beginPath(); g.moveTo(x + U(-0.22) * bw, top); g.lineTo(x + U(0.22) * bw, top); g.lineTo(x + U(0.24) * bw, bot); g.lineTo(x + U(-0.24) * bw, bot); g.closePath(); g.fill(); g.stroke();
  for (const s of [-1, 1]) { const P = new Path2D();
    P.moveTo(x + U(s * 0.16) * bw, top - lw * 0.5); P.quadraticCurveTo(x + U(s * 0.5) * bw, top - lw, x + U(s * 0.53) * bw, top + bw * 0.25);
    P.lineTo(x + U(s * 0.6) * bw, hem); P.lineTo(x + U(s * 0.2) * bw, hem + h * 0.006); P.lineTo(x + U(s * 0.15) * bw, top + (bot - top) * 0.45); P.closePath();
    g.fillStyle = COAT; g.fill(P); g.save(); g.clip(P); g.strokeStyle = COAT_SH; g.lineWidth = lw * 0.8;
    g.beginPath(); g.moveTo(x + U(s * 0.42) * bw, top + (bot - top) * 0.55); g.lineTo(x + U(s * 0.46) * bw, hem); g.stroke(); g.restore(); g.stroke(P);
    g.fillStyle = COAT; g.beginPath(); g.moveTo(x + U(s * 0.16) * bw, top - lw * 0.5); g.lineTo(x + U(s * 0.34) * bw, top + (bot - top) * 0.18);
    g.lineTo(x + U(s * 0.26) * bw, top + (bot - top) * 0.24); g.lineTo(x + U(s * 0.15) * bw, top + (bot - top) * 0.45); g.closePath(); g.fill(); g.stroke(); }
  g.strokeRect(x + U(-0.38) * bw - bw * 0.1, top + (bot - top) * 0.78, bw * 0.2, bw * 0.13);
  };
  // tay: một ống tay blouse dày vai → bàn tay (cong nhẹ ra ngoài như khuỷu), vòng cổ tay xắn, bàn tay tròn
  const arms = o.arms ?? 'rest', tg = ARMS[arms] ?? ARMS.rest, hands = [], cy = top + h * 0.035;
  const shA = [-1, 1].map(s => s * 1.17 + tw * 1.5), sh = shA.map(a => [x + bw * 0.5 * Math.sin(a), cy]);           // vai trượt trên khối trụ thân theo yaw; vai quay ra sau → tay vẽ khuất sau áo
  const target = i => { if (o.hands?.[i]) { const [hx2, hy3] = o.hands[i]; return [o.flip ? 2 * x - hx2 : hx2, hy3]; }
    if (tg[i]) { const w = arms === 'wave' && i === 1 ? Math.sin(t * 9) * 0.03 : 0; return [sh[i][0] + (tg[i][0] + w) * h, sh[i][1] + tg[i][1] * h]; }
    return arms === 'think' ? [x + r * 0.3, hy + r * 0.78] : [x - r * 0.15, hy + r * 0.2]; };
  const sw = Math.max(lw * 3.4, h * 0.068), front = [], back = [], mid = [];
  for (let i = 0; i < 2; i++) { if (o.noArm === i) { hands.push(target(i)); continue; }
    const [sx, sy] = sh[i], [hx, hy2] = target(i), s = i ? 1 : -1, up = hy2 < sy;
    const cp = [(sx + hx) / 2 + s * bw * (up ? 0.22 : 0.12), (sy + hy2) / 2 + (up ? 0 : h * 0.035) + (arms === 'shrug' ? h * 0.07 : 0)];
    const q = k => [(1 - k) ** 2 * sx + 2 * (1 - k) * k * cp[0] + k * k * hx, (1 - k) ** 2 * sy + 2 * (1 - k) * k * cp[1] + k * k * hy2];
    const draw = () => { tube([sx, sy], cp, [hx, hy2], sw, COAT);
      const [ax, ay] = q(0.8), [bx, by] = q(0.9); g.save(); g.translate(ax, ay); g.rotate(Math.atan2(by - ay, bx - ax)); g.lineWidth = lw; g.strokeStyle = INK; g.fillStyle = COAT_SH;
      g.beginPath(); g.roundRect(-sw * 0.16, -sw * 0.62, sw * 0.32, sw * 1.24, sw * 0.12); g.fill(); g.stroke(); g.restore();                        // cổ tay xắn
      if (arms !== 'pockets' || o.hands) { g.lineWidth = lw; g.strokeStyle = INK; g.fillStyle = SKIN; g.beginPath(); g.arc(hx, hy2, sw * 0.62, 0, 7); g.fill(); g.stroke();
        if ((arms === 'point' || arms === 'chalk') && i === 1 && !o.hands) { g.lineWidth = sw * 0.32; g.beginPath(); g.moveTo(hx, hy2); g.lineTo(hx + sw * 0.9, hy2 - sw * 0.5); g.stroke(); g.strokeStyle = SKIN; g.lineWidth = sw * 0.32 - lw * 2; g.stroke(); }
        if (arms === 'cheer' && i === 1) { g.strokeStyle = INK; g.lineWidth = lw * 0.7; for (const k of [-0.3, 0, 0.3]) { g.beginPath(); g.moveTo(hx + k * sw, hy2 - sw * 0.5); g.lineTo(hx + k * sw, hy2 - sw * 0.2); g.stroke(); } } } };
    const overFace = Math.abs(hx - x) < r * 0.9 && hy2 < top;                                                                     // bàn tay trước mặt → vẽ sau đầu
    if ((arms === 'facepalm' || arms === 'think') && i === 1 || overFace) front.push(draw); else (Math.cos(shA[i]) < 0.3 ? back : mid).push(draw);
    hands.push(target(i)); }
  for (const f of back) f();
  torso();
  for (const f of mid) f();
  head(x, hy, r, { ...o, lw });
  for (const f of front) f();
  g.restore();
  const un = ([a, b2]) => [o.flip ? 2 * x - a : a, b2];
  return { hy, r, top, hands: hands.map(un) }; }

// ═════════════ chuyển động (2026-10-29 — docs/character/CHARACTER-MASCOT.md bước 1) ═════════════
const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
/** chớp mắt tất định: mỗi nhịp 2.6–4.2 s một lần nhắm 0.12 s; seed tách nhân vật */
export function blinkAt(t, seed = 0) { let t0 = 0.8 + hash(seed) * 2; for (let i = 0; t0 < t + 0.2 && i < 4000; i++) { if (t >= t0 && t < t0 + 0.12) return true; t0 += 2.6 + 1.6 * hash(seed * 31 + i); } return false; }
/** miệng nói theo độ mở đường bao giọng (engine/talk.js mouthOpen ∈ [0,1]); đổi ≤ 12 lần / s, im lặng → miệng của biểu cảm */
export function talkMouth(open, t, rest = 'flat') { if (open < 0.12) return rest; const set = open < 0.4 ? ['o', 'mid'] : open < 0.7 ? ['mid', 'mid', 'o'] : ['wide', 'mid'];
  return set[Math.floor(hash(Math.floor(t * 12)) * set.length)]; }
