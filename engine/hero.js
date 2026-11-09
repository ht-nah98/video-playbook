// engine/hero.js — nhân vật người que XUYÊN SUỐT của kênh (docs/character/CHARACTER-STICK.md; người dùng chọn C · que + khăn đỏ,
// 2026-10-23): người que mực, đầu tròn
// trắng to (×1.45 đầu engine), hai mắt hạt đen biết diễn (nhìn, chớp, choáng ×, cười ^), khăn quàng đỏ — món đồ nhận
// diện, hai đuôi bay theo gió / chuyển động. Khung xương + tư thế = engine/stick.js (tính khớp, vẽ ẩn); phần nhận
// dạng vẽ ở đây. Bàn thử: tools/lab/hero.html (bảng 3 phương án), hero-clip.html (clip đầu), fight.html (đánh nhau, study 10).
//   import { hero, headOf, ARM } from '../../engine/hero.js';
//   const J = hero(g, 'C', x, y, pose, { h, dir, hip, feet, hands, squash, arm, eye: { look, shape, lid, wide }, wind, t, anger, front });
import { stick } from './stick.js';

export const INK = '#22303C', RED = '#D9481E', GOLD = '#F2C94C', PAPER = '#F4F1E8', TEAL = '#0F8B8D';
export const VAR = {
  A: { name: 'A · Người que số 9', sub: 'đầu đặc, thân mọc ở cạnh phải → "9"', color: TEAL, nine: true },
  B: { name: 'B · Cổ điển + mắt', sub: 'quen nhất, mắt biết diễn', color: INK },
  C: { name: 'C · Que + khăn đỏ', sub: 'món đồ nhận diện cố định', color: INK, scarf: RED },
  D: { name: 'D · Que cam + khăn đỏ', sub: 'nét cam cho nền tối, tách khỏi đầu trắng (hệ hình kênh Anh 2026-11)', color: '#F4A259', scarf: RED },
};
const HEAD = 1.45, NECK = 0.03;
export const ARM = 1.3;   // tay dài 0.4 h (≈ chân): đầu to cao 0.33 h trên cổ — tay 0.305 h mặc định không giơ qua đầu được (study 10, 2026-10-23)
// nét mềm (o.soft — kiểu C ở tools/lab/soft-limb-lab.html, người dùng chọn 2026-10-26 sau "Animation vs. Coding"): mỗi chi
// một cung qua khuỷu/gối, thân cong, nét dày hơn, đầu tay tròn, bàn chân có móc; tay ngắn hơn ARM ("tay đang dài quá").
// Bài cũ không bật soft → không đổi pixel.
export const SOFT_ARM = 0.85, SOFT_TORSO = 1.2;   // người dùng 2026-10-26: "tay ngắn thêm, người dài thêm 1 xíu"; tay buông không quá nửa thân (đầu tay trên hông)

/** Tâm + bán kính đầu nhân vật từ khớp engine (dùng cả khi chưa vẽ: đặt vật lên đầu). */
export function headOf(J, h, v = 'C') {
  const hx = J.head[0] - J.neck[0], hy = J.head[1] - J.neck[1], hd = Math.hypot(hx, hy), vx = hx / hd, vy = hy / hd;
  if (VAR[v].nine) { const r = J.headR * 1.65, nx = -vy, ny = vx, att = [J.neck[0] + vx * (hd - 0.2 * r), J.neck[1] + vy * (hd - 0.2 * r)];
    return { C: [att[0] - nx * r, att[1] - ny * r], r, att, v: [vx, vy] }; }
  const r = J.headR * HEAD;
  return { C: [J.neck[0] + vx * (NECK * h + r), J.neck[1] + vy * (NECK * h + r)], r, v: [vx, vy] };
}

// mắt kiểu pi creature (bản A): tròng trắng, con ngươi nhìn theo `look`, mí trên theo `lid`
function eyesPi(g, cx, cy, r, { look = [0, 0], lid = 0, shape = 'open', ink = INK, lidCol = INK } = {}) {
  const ew = 0.27 * r, eh = 0.33 * r, gap = 0.33 * r;
  for (const s of [-1, 1]) {
    const ex = cx + s * gap, ey = cy - 0.08 * r;
    g.save(); g.lineCap = 'round';
    if (shape === 'x') { g.strokeStyle = PAPER; g.lineWidth = 0.1 * r; const d = 0.2 * r;
      g.beginPath(); g.moveTo(ex - d, ey - d); g.lineTo(ex + d, ey + d); g.moveTo(ex + d, ey - d); g.lineTo(ex - d, ey + d); g.stroke(); g.restore(); continue; }
    if (shape === 'happy') { g.strokeStyle = PAPER; g.lineWidth = 0.1 * r; g.beginPath(); g.arc(ex, ey + 0.08 * r, 0.2 * r, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); g.restore(); continue; }
    g.fillStyle = '#FFFFFF'; g.strokeStyle = ink; g.lineWidth = Math.max(1.5, 0.05 * r);
    g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, 7); g.clip();
    g.fillStyle = '#111'; g.beginPath(); g.arc(ex + look[0] * 0.13 * r, ey + look[1] * 0.15 * r, 0.15 * r, 0, 7); g.fill();
    g.fillStyle = '#FFF'; g.beginPath(); g.arc(ex + look[0] * 0.13 * r + 0.05 * r, ey + look[1] * 0.15 * r - 0.05 * r, 0.04 * r, 0, 7); g.fill();
    if (lid > 0) { g.fillStyle = lidCol; g.fillRect(ex - ew - 2, ey - eh - 2, 2 * ew + 4, (2 * eh + 4) * lid); }
    g.restore();
  }
}
// mắt bản cổ điển (B, C): hai hạt đen bầu dục; lid 0 → 1 = chớp (khép thành vạch); wide > 0 = mở to (giật mình)
function eyesDot(g, cx, cy, r, { look = [0, 0], shape = 'open', lid = 0, wide = 0 } = {}) {
  g.save(); g.fillStyle = INK; g.strokeStyle = INK; g.lineCap = 'round'; g.lineWidth = 0.1 * r;
  for (const s of [-1, 1]) {
    const ex = cx + s * 0.32 * r + look[0] * 0.2 * r, ey = cy - 0.05 * r + look[1] * 0.2 * r;
    if (shape === 'x') { const d = 0.15 * r; g.beginPath(); g.moveTo(ex - d, ey - d); g.lineTo(ex + d, ey + d); g.moveTo(ex + d, ey - d); g.lineTo(ex - d, ey + d); g.stroke(); continue; }
    if (shape === 'happy') { g.beginPath(); g.arc(ex, ey + 0.08 * r, 0.16 * r, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); continue; }
    if (shape === 'angry') {                      // lông mày gắt: vạch xiên chúc vào giữa, đè mép trên mắt
      g.lineWidth = 0.12 * r; g.beginPath(); g.moveTo(ex - s * 0.2 * r, ey - 0.34 * r); g.lineTo(ex + s * 0.17 * r, ey - 0.18 * r); g.stroke(); g.lineWidth = 0.1 * r; }
    const ry = 0.2 * r * (1 + 0.35 * wide) * (1 - lid);
    if (ry < 0.04 * r) { g.beginPath(); g.moveTo(ex - 0.11 * r, ey); g.lineTo(ex + 0.11 * r, ey); g.stroke(); continue; }
    g.beginPath(); g.ellipse(ex, ey, 0.13 * r * (1 + 0.25 * wide), ry, 0, 0, 7); g.fill();
  }
  g.restore();
}

/** Vẽ nhân vật. o: như stick() (h, dir, hip, feet, hands, squash…) + eye {look, shape, lid, wide}, wind (0 → 1: đuôi
 *  khăn bay ngang), t (giờ — đuôi khăn phấp phới), scale (bật ra khi phân thân), alpha, front (dáng chính diện: hai tay vẽ sau đầu), anger (0 → 1: nét đỏ, đầu hồng —
 *  màu trạng thái, khăn vẫn đỏ). Trả khớp + {C, r} của đầu. */
export function hero(g, v, x, y, pose, o = {}) {
  const h = o.h ?? 200, V = VAR[v], an = o.anger ?? 0, col = an > 0 ? mixHex(V.color, '#7A1F2B', an) : V.color, soft = !!o.soft, w0 = 0.06 * h, w = soft ? 1.25 * w0 : w0;
  const J = stick(g, x, y, pose, { arm: o.arm ?? (soft ? SOFT_ARM : ARM), torso: o.torso ?? (soft ? SOFT_TORSO : 1), spine: soft, ...o, h, alpha: 0 });
  const Hd = headOf(J, h, v), C = Hd.C, r = Hd.r;
  g.save(); g.globalAlpha *= o.alpha ?? 1;
  if (o.scale != null && o.scale !== 1) { const fy = (o.hip ? o.hip[1] : y) + 0.4 * h; g.translate(J.hip[0], fy); g.scale(o.scale, o.scale); g.translate(-J.hip[0], -fy); }
  g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  const poly = (...p) => { g.beginPath(); g.moveTo(...p[0]); for (const q of p.slice(1)) g.lineTo(...q); g.stroke(); };
  // chi: soft = cung bậc hai, điểm điều khiển m + β(m − (a + e)/2). Gập nhẹ β = 1 (cung đi QUA khớp); gập gắt β giảm tới
  // 0.3 (bo theo góc) — β = 1 ở gối 90° làm chi phình như bóng (bàn thử becker-redo, 2026-10-26)
  const curve = A => {
    const u = [A.m[0] - A.a[0], A.m[1] - A.a[1]], v = [A.e[0] - A.m[0], A.e[1] - A.m[1]];
    const th = Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / ((Math.hypot(...u) * Math.hypot(...v)) || 1))));
    const b = Math.max(0.3, Math.min(1, 1 - (th - Math.PI / 6) / (Math.PI / 2)));
    g.beginPath(); g.moveTo(...A.a); g.quadraticCurveTo(A.m[0] + b * (A.m[0] - (A.a[0] + A.e[0]) / 2), A.m[1] + b * (A.m[1] - (A.a[1] + A.e[1]) / 2), ...A.e); };
  const arm = A => { if (!soft) return poly(A.a, A.m, A.e);
    curve(A); g.stroke(); g.fillStyle = col; g.beginPath(); g.arc(A.e[0], A.e[1], 0.6 * w, 0, 7); g.fill(); };
  const leg = A => { if (!soft) return poly(A.a, A.m, A.e);
    curve(A); g.lineTo(A.e[0] + (o.dir ?? 1) * 0.05 * h, A.e[1] + 0.004 * h); g.stroke(); };
  // thân: soft = một cung hông → cổ đi QUA giữa lưng (J.mid — engine/stick.js gập thân theo curl), rồi nối tới đáy đầu
  const spine = top => { if (!soft) return poly(J.hip, J.neck, top);
    const m = J.mid; g.beginPath(); g.moveTo(...J.hip);
    g.quadraticCurveTo(2 * m[0] - (J.hip[0] + J.neck[0]) / 2, 2 * m[1] - (J.hip[1] + J.neck[1]) / 2, ...J.neck); g.lineTo(...top); g.stroke(); };
  if (!o.front) arm(J.armL);   // dáng nghiêng: tay sau vẽ TRƯỚC đầu (chiều sâu); chính diện (o.front): cả hai tay ở trước, vẽ sau đầu
  leg(J.legL); leg(J.legR);
  if (V.nine) { poly(J.hip, J.neck, Hd.att); g.fillStyle = col; g.beginPath(); g.arc(C[0], C[1], r, 0, 7); g.fill(); g.stroke(); }
  else { spine([C[0] - Hd.v[0] * r, C[1] - Hd.v[1] * r]); g.lineWidth = w0; g.fillStyle = an > 0 ? mixHex('#FFFFFF', '#FFC9BE', an) : '#FFFFFF'; g.beginPath(); g.arc(C[0], C[1], r, 0, 7); g.fill(); g.stroke(); g.lineWidth = w; }
  if (V.scarf) {                                  // khăn: vòng quanh cổ + hai đuôi về phía sau lưng; wind kéo đuôi nằm ngang, t làm phấp phới
    const d = o.dir ?? 1, n = [J.neck[0] + Hd.v[0] * 0.03 * h, J.neck[1] + Hd.v[1] * 0.03 * h], wd = o.wind ?? 0, tt = o.t ?? 0;
    const fl = i => Math.sin(tt * 13 + i * 1.7) * 0.022 * h * (0.3 + wd);
    g.strokeStyle = V.scarf; g.lineWidth = w0 * 1.5; poly([n[0] - 0.05 * h, n[1]], [n[0] + 0.05 * h, n[1]]);
    g.lineWidth = w0 * 1.1;
    poly(n, [n[0] - d * (0.1 + 0.04 * wd) * h, n[1] + (0.05 - 0.03 * wd) * h + fl(0) * 0.5], [n[0] - d * (0.18 + 0.1 * wd) * h, n[1] + (0.03 - 0.03 * wd) * h + fl(1)]);
    poly(n, [n[0] - d * (0.08 + 0.05 * wd) * h, n[1] + (0.1 - 0.05 * wd) * h + fl(2) * 0.5], [n[0] - d * (0.15 + 0.1 * wd) * h, n[1] + (0.11 - 0.06 * wd) * h + fl(3)]);
    g.strokeStyle = col; g.lineWidth = w;
  }
  if (o.front) arm(J.armL);
  arm(J.armR);
  if (V.nine) eyesPi(g, C[0], C[1], r, { ...o.eye, ink: col, lidCol: col });
  else eyesDot(g, C[0], C[1], r, o.eye || {});
  g.restore();
  return { ...J, C, r };
}

function mixHex(a, b, k) { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b);
  return '#' + A.map((x, i) => Math.round(x + (B[i] - x) * k).toString(16).padStart(2, '0')).join(''); }
export function card(g, cx, cy, s, txt, rot = 0, { col = INK, fill = '#FFFFFF' } = {}) {
  g.save(); g.translate(cx, cy); g.rotate(rot);
  g.fillStyle = fill; g.strokeStyle = col; g.lineWidth = 4; g.beginPath(); g.roundRect(-s * 0.6, -s * 0.4, s * 1.2, s * 0.8, 10); g.fill(); g.stroke();
  g.fillStyle = col; g.font = `800 ${Math.round(s * 0.42)}px Archivo, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 2);
  g.restore();
}
export function star(g, x, y, r) { g.save(); g.fillStyle = GOLD; g.strokeStyle = INK; g.lineWidth = 2.5; g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.closePath(); g.fill(); g.stroke(); g.restore(); }
