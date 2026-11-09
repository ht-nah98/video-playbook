// engine/stick.js — người que tất định (học từ "Animation vs. Geometry", Alan Becker; người dùng 2026-10-22).
// Một nhân vật SỐNG TRONG hình toán: đứng trên đường cong, đẩy điểm, vác ký hiệu, đu trên đoạn thẳng. Hàm thuần của
// tham số (không trạng thái giữa các khung, không random) — mọi chuyển động tính từ t ở cảnh gọi.
//
//   import { stick, P, mix, walk, ik2 } from '../../engine/stick.js';
//   stick(g, x, y, P.stand, { h: 180, color: '#F26B1D', dir: 1 });              // (x, y) = điểm giữa hai bàn chân trên đất
//   stick(g, x, y, mix(P.stand, P.cheer, k), { h: 180 });                       // nội suy tư thế (k 0 → 1)
//   stick(g, x, y, walk(phase), { h: 180, ground: X => yOf(X) });              // đi bộ, chân bám mặt đất bất kỳ
//   stick(g, x, y, P.push, { h: 180, hands: [[hx, hy], [hx, hy + 10]] });      // tay chạm đúng điểm (IK hai đoạn)
//   const J = stick(...);  J.handL, J.handR, J.head …                           // toạ độ khớp để gắn đồ vật
//
// Tư thế = góc (radian). Góc vai / hông đo từ phương THẲNG XUỐNG, dương = về phía mặt nhìn (dir). Khuỷu / gối = độ gập
// thêm (khuỷu dương gập về trước, gối dương gập về sau). lean = thân nghiêng về trước. bob = hông hạ (phần chiều cao).

// Tỉ lệ theo chiều cao H (đỉnh đầu → bàn chân khi đứng thẳng) — đầu to kiểu hoạt hình, chân dài
export const L = { head: 0.105, neck: 0.03, torso: 0.27, upper: 0.155, fore: 0.15, thigh: 0.2, shin: 0.2 };
const D2R = Math.PI / 180;

const pose = o => ({ lean: 0, head: 0, shL: 0, elL: 0, shR: 0, elR: 0, hipL: 0, knL: 0, hipR: 0, knR: 0, bob: 0, ...o });
const deg = o => { const r = {}; for (const k in o) r[k] = k === 'bob' ? o[k] : o[k] * D2R; return pose(r); };

// Thư viện tư thế (độ → radian). Dáng nghiêng: L = tay/chân phía SAU (xa người xem), R = phía trước. Dáng CHÍNH DIỆN
// (cheer, carry, hang, shrug): L mang góc ÂM → toả sang trái, R sang phải. dir lật cả hình.
export const P = {
  stand:   deg({ shL: -8, elL: 10, shR: 8, elR: 10, hipL: -4, hipR: 4 }),
  think:   deg({ lean: 4, head: 12, shL: -6, elL: 15, shR: 18, elR: 165, hipL: -4, hipR: 6 }),   // tay trước chống cằm
  point:   deg({ lean: -2, shL: -10, elL: 12, shR: 100, elR: 0, hipL: -6, hipR: 6 }),            // chỉ thẳng về trước
  pointUp: deg({ lean: -4, head: -18, shL: -10, elL: 12, shR: 135, elR: 5, hipL: -6, hipR: 6 }),
  cheer:   deg({ head: -10, shL: -128, elL: -22, shR: 128, elR: 22, hipL: -12, hipR: 12, bob: -0.02 }),          // chính diện, chữ V
  shrug:   deg({ head: 8, shL: -35, elL: -100, shR: 35, elR: 100, hipL: -5, hipR: 5 }),
  push:    deg({ lean: 52, head: -30, shL: 95, elL: 20, shR: 100, elR: 15, hipL: -30, knL: 15, hipR: 35, knR: 55, bob: 0.06 }),
  pull:    deg({ lean: -24, head: 8, shL: 70, elL: 5, shR: 75, elR: 5, hipL: 22, knL: 30, hipR: -16, knR: 10, bob: 0.04 }),
  carry:   deg({ head: -6, shL: -112, elL: -78, shR: 112, elR: 78, hipL: -8, hipR: 8 }),            // chính diện, hai tay đỡ vật trên đầu
  crouch:  deg({ lean: 30, head: -20, shL: 30, elL: 40, shR: 45, elR: 40, hipL: 70, knL: 130, hipR: 85, knR: 140, bob: 0.17 }),
  sit:     deg({ lean: 6, shL: 20, elL: 40, shR: 30, elR: 50, hipL: 85, knL: 85, hipR: 90, knR: 90, bob: 0.2 }),
  jump:    deg({ lean: 10, head: -10, shL: 150, elL: 20, shR: 140, elR: 20, hipL: 40, knL: 80, hipR: 10, knR: 60, bob: -0.12 }),
  fall:    deg({ lean: -40, head: 20, shL: 130, elL: 40, shR: -120, elR: 30, hipL: 30, knL: 40, hipR: -40, knR: 20, bob: 0.02 }),
  hang:    deg({ head: -6, shL: -138, elL: -8, shR: 138, elR: 8, hipL: -5, knL: 20, hipR: 5, knR: 10 }),  // chính diện, treo hai tay
  balance: deg({ head: -4, shL: -84, elL: -12, shR: 84, elR: 12, hipL: -10, knL: 12, hipR: 10, knR: 12, bob: 0.03 }),  // chính diện, dang tay giữ thăng bằng
  lean:    deg({ lean: -10, head: -8, shL: 35, elL: 105, shR: 42, elR: 115, hipL: 18, knL: 4, hipR: -6, knR: 2, bob: 0.01 }),   // tựa lưng (dir = hướng mặt; lưng chạm vật phía sau), khoanh tay, chân bắt chéo
  scratch: deg({ head: 10, shL: -6, elL: 10, shR: -117, elR: -79, hipL: -5, hipR: 5 }),          // gãi gáy — tay vòng ra SAU đầu, không cắt vòng đầu (giải số 2026-10-22)
  sad:     deg({ lean: 14, head: 28, shL: -4, elL: 5, shR: 4, elR: 5, hipL: -3, hipR: 3 }),
  aha:     deg({ lean: -8, head: -14, shL: -20, elL: 30, shR: 135, elR: -25, hipL: -8, hipR: 8 }),       // vỡ lẽ — một tay vút lên
  // ── bổ sung 2026-10-22 (người dùng: "tư thế linh hoạt, bổ sung nhiều hơn") — dáng nghiêng trừ khi ghi chính diện ──
  wave:    deg({ head: -4, shL: -8, elL: 12, shR: 109, elR: 62, hipL: -4, hipR: 4 }),                   // vẫy tay chào — khuỷu trước mặt, tay không chồng đầu
  facepalm: deg({ lean: 10, head: 22, shL: -6, elL: 12, shR: 40, elR: 140, hipL: -4, hipR: 4 }),       // ôm mặt — "ôi trời"
  kneel:   deg({ lean: 6, head: 4, shL: 10, elL: 30, shR: 30, elR: 50, hipL: 92, knL: 92, hipR: -8, knR: 100, bob: 0.2 }),   // quỳ một gối (gối sau chạm đất)
  sitFloor: deg({ lean: 4, head: 0, shL: -30, elL: 5, shR: -24, elR: 8, hipL: 88, knL: 8, hipR: 84, knR: 14, bob: 0.38 }),  // ngồi bệt, chân duỗi trước, tay chống sau
  kick:    deg({ lean: -18, head: -6, shL: -60, elL: 20, shR: 50, elR: 30, hipL: -10, knL: 8, hipR: 85, knR: 5 }),    // đá về trước
  sneak:   deg({ lean: 22, head: -6, shL: 40, elL: 100, shR: 60, elR: 110, hipL: -22, knL: 45, hipR: 30, knR: 60, bob: 0.07 }), // rón rén
  lookUp:  deg({ lean: -8, head: -34, shL: -10, elL: 12, shR: 8, elR: 14, hipL: -4, hipR: 4 }),
  lookDown: deg({ lean: 14, head: 38, shL: 4, elL: 14, shR: 14, elR: 18, hipL: -4, hipR: 4 }),
  surprised: deg({ lean: -16, head: -10, shL: 120, elL: 40, shR: 135, elR: 35, hipL: -14, knL: 10, hipR: 12, knR: 6 }),    // giật mình ngả ra sau, tay lên
  tired:   deg({ lean: 26, head: 36, shL: 6, elL: 4, shR: 10, elR: 6, hipL: -3, knL: 12, hipR: 4, knR: 14, bob: 0.03 }),     // rũ người
  climb:   deg({ lean: 8, head: -20, shL: 165, elL: 10, shR: 120, elR: 60, hipL: -8, knL: 10, hipR: 70, knR: 100 }),        // leo: một tay với cao, một gối nhấc
  write:   deg({ lean: 14, head: 22, shL: 20, elL: 60, shR: 55, elR: 50, hipL: -4, hipR: 6 }),          // viết / vẽ lên mặt phẳng trước mặt
  windup:  deg({ lean: -12, head: 0, shL: 40, elL: 30, shR: -70, elR: 30, hipL: -14, knL: 12, hipR: 18, knR: 20, bob: 0.03 }), // lấy đà ném (tay trước kéo ra sau)
  throw:   deg({ lean: 20, head: -4, shL: -30, elL: 20, shR: 110, elR: 5, hipL: -20, knL: 8, hipR: 26, knR: 24 }),   // ném — tay vung ra trước
  pointDown: deg({ lean: 10, head: 26, shL: -8, elL: 12, shR: 40, elR: 5, hipL: -6, hipR: 6 }),
};

// độ cong lưng mặc định theo độ nghiêng (người dùng 2026-10-27: "thân lúc nào cũng cứng đơ như một đoạn thẳng"): Becker
// cúi là lưng GÙ thành chữ C, ngả sau là ƯỠN; đứng thẳng vẫn hơi khom vai. Radian vào, radian ra.
export function curlOf(lean) {
  const d = lean / D2R;
  return (10 + (d > 0 ? Math.min(48, 0.6 * d) : Math.max(-40, 0.75 * d))) * D2R;
}

const ease = k => k * k * (3 - 2 * k);
export function mix(a, b, k) {
  const e = ease(Math.max(0, Math.min(1, k))), r = {};
  for (const key in a) r[key] = a[key] + (b[key] - a[key]) * e;
  return r;
}

// Nhịp đi / chạy: phase tính bằng VÒNG (1 = hai bước). Trả về tư thế; khi có `ground`, stick() đặt bàn chân lên mặt đất.
export function walk(phase, { run = 0, lean = 0 } = {}) {
  const s = Math.sin(phase * 2 * Math.PI), c = Math.cos(phase * 2 * Math.PI);
  const sw = (26 + 18 * run) * D2R, arm = (24 + 40 * run) * D2R;
  return pose({
    lean: lean + (6 + 14 * run) * D2R, head: -4 * D2R,
    hipL: sw * s, hipR: -sw * s,
    knL: (12 + 50 * run) * D2R * Math.max(0, -c) + 8 * D2R, knR: (12 + 50 * run) * D2R * Math.max(0, c) + 8 * D2R,
    shL: -arm * s, elL: (20 + 50 * run) * D2R, shR: arm * s, elR: (20 + 50 * run) * D2R,
    bob: 0.012 * Math.abs(c) + 0.03 * run, _phase: phase, _run: run,
  });
}

// IK hai đoạn: gốc (ax, ay), độ dài l1, l2, đích (tx, ty); bend = ±1 chọn phía khớp giữa. Trả [mx, my, ex, ey].
export function ik2(ax, ay, l1, l2, tx, ty, bend = 1) {
  let dx = tx - ax, dy = ty - ay, d = Math.hypot(dx, dy);
  const dm = Math.max(Math.abs(l1 - l2) + 1e-6, Math.min(l1 + l2 - 1e-6, d));
  if (d < 1e-9) { dx = 0; dy = 1; d = 1; }
  const ux = dx / d, uy = dy / d, ex = ax + ux * dm, ey = ay + uy * dm;
  const a = (l1 * l1 - l2 * l2 + dm * dm) / (2 * dm), hgt = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  return [ax + ux * a - uy * hgt * bend, ay + uy * a + ux * hgt * bend, ex, ey];
}

// Vẽ. (x, y) = điểm đất dưới hông khi đứng (giữa hai chân). Trả toạ độ các khớp.
// o: h (chiều cao px), color, width (độ dày nét, mặc định 0.05h), dir (1 nhìn phải, −1 nhìn trái), rot (xoay cả người
// quanh hông), squash (1 = thường; < 1 dẹt, > 1 dài — giữ thể tích), ground: X => Y (chân bám mặt đất khi đi),
// hat (màu mũ tai bèo), pack (màu ba lô, dáng nghiêng — đeo sau lưng), — đồ nhận diện của nhân vật từng bài,
// stride (độ dài bước, phần h), arm (hệ số dài tay, mặc định 1), torso (hệ số dài thân, mặc định 1), shoulder (gốc tay dưới cổ, phần thân; mặc định 0 = cổ), hands / feet: [[x,y] | null, [x,y] | null] (L, R) → IK, alpha, fill (màu ruột đầu, mặc định trống).
export function stick(g, x, y, p, o = {}) {
  const h = o.h ?? 180, dir = o.dir ?? 1, sq = o.squash ?? 1, color = o.color ?? '#22303C';   // màu theo DNA từng bài — mặc định mực, KHÔNG cam (cam rỗng đầu là dấu riêng của Alan Becker)
  const w = o.width ?? Math.max(3, 0.05 * h), sx = 1 / Math.sqrt(sq), sy = sq;
  const legLen = (L.thigh + L.shin) * h;
  if (!o.hip && o.ground) y = Math.max(y, o.ground(x - 0.16 * h * dir), o.ground(x + 0.16 * h * dir));
  if (!o.hip && o.feet) for (const f of o.feet) if (f) y = Math.max(y, f[1]);
  // o.hip = [x, y] đặt hông trực tiếp (engine/stickmove.js tính từ bản đồ bước) — không suy từ bàn chân thấp (08-stick-animation §1)
  const hip = o.hip ? [o.hip[0], o.hip[1]] : [x, y - (legLen * 0.985 - p.bob * h) * sy];
  // hướng: góc đo từ thẳng xuống, dương = về phía dir
  const at = (ox, oy, ang, len) => [ox + Math.sin(ang) * len * dir * sx, oy + Math.cos(ang) * len * sy];
  const up = (ox, oy, ang, len) => [ox + Math.sin(ang) * len * dir * sx, oy - Math.cos(ang) * len * sy];
  const rot = o.rot ?? 0, armK = o.arm ?? 1;   // arm: hệ số dài tay (người que khăn đỏ 1.3 — đầu to, tay phải giơ qua đầu được)
  const R = ([px, py]) => { if (!rot) return [px, py]; const c = Math.cos(rot), s = Math.sin(rot), dx = px - hip[0], dy = py - hip[1];
    return [hip[0] + dx * c - dy * s, hip[1] + dx * s + dy * c]; };

  // thân: p.curl = độ cong lưng (+ gù về trước, − ưỡn ra sau) — hai nửa thân nghiêng lean ∓ curl/2, dây cung vẫn theo lean.
  // Không có curl và không o.spine (hero soft) → một đoạn thẳng như mọi bài cũ (không đổi pixel).
  const cu = p.curl ?? (o.spine ? curlOf(p.lean) : 0), tl0 = L.torso * h * (o.torso ?? 1);   // o.torso: hệ số dài thân (hero soft)
  const mid = cu ? up(hip[0], hip[1], p.lean - cu / 2, tl0 / 2) : null;
  const neck = cu ? up(mid[0], mid[1], p.lean + cu / 2, tl0 / 2) : up(hip[0], hip[1], p.lean, tl0);
  const headC = up(neck[0], neck[1], p.lean + cu / 2 + p.head, (L.neck + L.head) * h);
  // tay
  // gốc tay: mặc định ở cổ (mọi bài cũ); o.shoulder = phần thân tính từ cổ xuống — người que cổ điển mọc tay dưới cổ,
  // không thì hai tay chung một gốc ngay dưới đầu trông như dính làm một (hist-ww1, người dùng 2026-10-24)
  const sk = o.shoulder ?? 0, shp = sk ? [neck[0] + (hip[0] - neck[0]) * sk, neck[1] + (hip[1] - neck[1]) * sk] : neck;
  const arm = (sh, el, target, side) => {
    if (target) { const [mx, my, ex, ey] = ik2(R(shp)[0], R(shp)[1], L.upper * h * armK, L.fore * h * armK, target[0], target[1], dir * side);
      return { a: R(shp), m: [mx, my], e: [ex, ey], abs: true }; }
    const m = at(shp[0], shp[1], sh, L.upper * h * armK), e = at(m[0], m[1], sh + el, L.fore * h * armK);
    return { a: shp, m, e };
  };
  const aL = arm(p.shL, p.elL, o.hands?.[0], 1), aR = arm(p.shR, p.elR, o.hands?.[1], 1);
  // chân: bám đất khi có ground (đi bộ) hoặc feet (IK), không thì theo góc
  const leg = (hp, kn, target, phaseOff) => {
    let tgt = target;
    if (!tgt && o.ground && p._phase !== undefined) {
      const ph = (p._phase + phaseOff) % 1, swing = ph < 0.5, k = swing ? ph / 0.5 : (ph - 0.5) / 0.5;
      const stride = (o.stride ?? 0.32) * h * (1 + 0.6 * (p._run || 0));
      const fx = x + dir * stride * (swing ? (-0.5 + k) : (0.5 - k));
      const lift = swing ? Math.sin(k * Math.PI) * (0.07 + 0.08 * (p._run || 0)) * h : 0;
      tgt = [fx, o.ground(fx) - lift];
    }
    if (tgt) { const [mx, my, ex, ey] = ik2(R(hip)[0], R(hip)[1], L.thigh * h * sy, L.shin * h * sy, tgt[0], tgt[1], -dir);
      return { a: R(hip), m: [mx, my], e: [ex, ey], abs: true }; }
    const m = at(hip[0], hip[1], hp, L.thigh * h), e = at(m[0], m[1], hp - kn, L.shin * h);
    return { a: hip, m, e };
  };
  const lL = leg(p.hipL, p.knL, o.feet?.[0], 0), lR = leg(p.hipR, p.knR, o.feet?.[1], 0.5);
  const T = q => (q.abs ? q : { a: R(q.a), m: R(q.m), e: R(q.e) });
  const J = { hip: R(hip), neck: R(neck), mid: R(mid || [(hip[0] + neck[0]) / 2, (hip[1] + neck[1]) / 2]), head: R(headC), headR: L.head * h,
    armL: T(aL), armR: T(aR), legL: T(lL), legR: T(lR) };
  J.handL = J.armL.e; J.handR = J.armR.e; J.footL = J.legL.e; J.footR = J.legR.e;

  g.save();
  g.globalAlpha *= o.alpha ?? 1;
  g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  const poly = (...pts) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (const q of pts.slice(1)) g.lineTo(q[0], q[1]); g.stroke(); };
  // trục thân (hông → cổ) và pháp tuyến về phía LƯNG (ngược hướng nhìn)
  const tx = J.neck[0] - J.hip[0], ty = J.neck[1] - J.hip[1], tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl;
  const bx = uy * dir, by = -ux * dir;                      // vuông góc thân, chĩa ra sau lưng
  if (o.pack) {                                             // ba lô: khối bo góc đeo sau lưng, nghiêng theo thân
    const pw = 0.13 * h, ph = 0.19 * h, cx = J.hip[0] + tx * 0.6 + bx * (w * 0.5 + pw * 0.5), cy = J.hip[1] + ty * 0.6 + by * (w * 0.5 + pw * 0.5);
    g.save(); g.translate(cx, cy); g.rotate(Math.atan2(uy, ux) + Math.PI / 2);
    g.fillStyle = o.pack; g.beginPath(); g.roundRect(-pw / 2, -ph / 2, pw, ph, pw * 0.3); g.fill();
    g.lineWidth = Math.max(2, w * 0.45); g.strokeStyle = color; g.stroke();
    g.restore();
  }
  // chi phía sau nhạt hơn một chút → đọc được chiều sâu (như mẫu: một màu, nhưng nét sau mảnh hơn)
  g.globalAlpha *= 0.82; poly(J.armL.a, J.armL.m, J.armL.e); poly(J.legL.a, J.legL.m, J.legL.e); g.globalAlpha /= 0.82;
  poly(J.legR.a, J.legR.m, J.legR.e);
  poly(J.hip, J.neck);
  // cổ → đầu: đường nối tới mép dưới vòng đầu
  const hx = J.head[0] - J.neck[0], hy = J.head[1] - J.neck[1], hd = Math.hypot(hx, hy) || 1;
  poly(J.neck, [J.head[0] - hx / hd * J.headR, J.head[1] - hy / hd * J.headR]);
  g.beginPath(); g.arc(J.head[0], J.head[1], J.headR, 0, Math.PI * 2);
  if (o.fill) { g.fillStyle = o.fill; g.fill(); }
  g.stroke();
  if (o.hat) {                                              // mũ tai bèo: vành dọc theo đầu + chóp, nghiêng theo cổ → đầu
    const r = J.headR, vx = hx / hd, vy = hy / hd, nx = -vy, ny = vx;
    const cx = J.head[0] + vx * r * 0.45, cy = J.head[1] + vy * r * 0.45;
    g.fillStyle = o.hat; g.beginPath();
    g.moveTo(cx - nx * r * 0.9, cy - ny * r * 0.9);
    g.lineTo(cx - nx * r * 0.7 + vx * r * 0.95, cy - ny * r * 0.7 + vy * r * 0.95);
    g.lineTo(cx + nx * r * 0.7 + vx * r * 0.95, cy + ny * r * 0.7 + vy * r * 0.95);
    g.lineTo(cx + nx * r * 0.9, cy + ny * r * 0.9); g.closePath(); g.fill(); g.lineWidth = Math.max(2, w * 0.45); g.stroke();
    g.lineWidth = w * 1.05; g.strokeStyle = o.hat; poly([cx - nx * r * 1.55, cy - ny * r * 1.55], [cx + nx * r * 1.55, cy + ny * r * 1.55]);
    g.strokeStyle = color;
  }
  poly(J.armR.a, J.armR.m, J.armR.e);
  g.restore();
  return J;
}
