// engine/stickmove.js — hoạt ảnh người que theo cách người làm hoạt hình làm (docs/study/08-stick-animation.md):
// tư thế chính đặt tay + khung giữa có ease (keys), đi bộ theo BẢN ĐỒ BƯỚC — bàn chân trụ khoá đứng yên, hông đi theo
// đường mượt, độ cao hông tính để chân luôn với tới (gait). IK chỉ để KHOÁ bàn chân đã đặt, không để sinh tư thế.
// Hàm thuần của t (tất định). Vẽ vẫn bằng engine/stick.js.
//
//   import { gait, keys, ease } from '../../engine/stickmove.js';
//   const G = gait({ ground, h: 240, dir: 1, x0: 260, x1: 1300, t0: 0.4, t1: 6.2 }, t);
//   stick(g, G.hip[0], 0, G.pose, { h: 240, hip: G.hip, feet: G.feet });
//   const k = keys([[6.6, { ...P.stand, x: 1300 }], [7.0, { ...P.crouch, x: 1290 }]], t);   // nội suy MỌI trường số
import { L, P } from './stick.js';

const D2R = Math.PI / 180;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const ease = k => { k = clamp(k); return k * k * (3 - 2 * k); };
export const easeOut = k => { k = clamp(k); return 1 - (1 - k) * (1 - k); };
export const easeIn = k => { k = clamp(k); return k * k; };

// Khoá tư thế: list = [[t, obj, easeFn?], …] tăng dần theo t; nội suy mọi trường số giữa hai khoá kề (ease mặc định).
// Muốn overshoot → thêm một khoá vượt quá rồi khoá đích (cách Becker làm), không dùng hàm đàn hồi.
export function keys(list, t) {
  if (t <= list[0][0]) return { ...list[0][1] };
  for (let i = 1; i < list.length; i++) {
    const [ta, a] = list[i - 1], [tb, b, fn] = list[i];
    if (t <= tb) {
      const k = (fn || ease)((t - ta) / (tb - ta)), r = { ...b };
      for (const key in a) if (typeof a[key] === 'number' && typeof b[key] === 'number') r[key] = a[key] + (b[key] - a[key]) * k;
      return r;
    }
  }
  return { ...list[list.length - 1][1] };
}

// Hermite đơn điệu đủ dùng: điểm (ti, xi) cách đều, tiếp tuyến trung bình, 0 ở hai đầu (khởi hành / dừng êm)
function spline(ts, xs, t) {
  const n = ts.length;
  if (t <= ts[0]) return xs[0];
  if (t >= ts[n - 1]) return xs[n - 1];
  let i = 0; while (t > ts[i + 1]) i++;
  const T = ts[i + 1] - ts[i], k = (t - ts[i]) / T;
  const m = j => (j <= 0 || j >= n - 1) ? 0 : (xs[j + 1] - xs[j - 1]) / (ts[j + 1] - ts[j - 1]) * T;
  const k2 = k * k, k3 = k2 * k;
  return (2 * k3 - 3 * k2 + 1) * xs[i] + (k3 - 2 * k2 + k) * m(i) + (-2 * k3 + 3 * k2) * xs[i + 1] + (k3 - k2) * m(i + 1);
}

// Đi bộ theo bản đồ bước từ x0 tới x1 trong [t0, t1] trên mặt đất ground(X) → Y.
// o: h, dir (1 phải, −1 trái), step (độ dài bước, phần h; mặc định 0.3), lift (độ nhấc chân, phần h), run (0 đi … 1 chạy),
//    arm (biên độ vung tay, độ), lead ('L' | 'R' chân bước trước).
// Trả { hip, feet: [[x,y],[x,y]], pose, planted: [bool,bool], slope (độ, dương = lên dốc theo hướng đi) }.
export function gait(o, t) {
  const h = o.h, dir = o.dir ?? (Math.sign(o.x1 - o.x0) || 1), ground = o.ground;
  const legLen = (L.thigh + L.shin) * h, reach = 0.985 * legLen, gap = 0.035 * h * dir;
  const n = Math.max(1, Math.round(Math.abs(o.x1 - o.x0) / ((o.step ?? 0.3) * h)));
  // điểm đặt chân P_k (k = 1…n) cách đều; bước n + 1 khép chân → dừng với hông ở x1, hai chân x1 ∓ gap
  const run = o.run ?? 0;                                   // 0 đi … 1 chạy: pha bay (hai chân rời đất) khi swing > T
  const S = (o.x1 - gap - o.x0) / (n - 0.5), T = (o.t1 - o.t0) / (n + 1), swing = (0.8 + 0.5 * run) * T;
  const Pk = k => o.x0 + (k - 0.5) * S;
  const lead = o.lead === 'R' ? 1 : 0, plants = [[], []];
  plants[lead].push([-1e9, o.x0 - gap]); plants[1 - lead].push([-1e9, o.x0 + gap]);
  for (let k = 1; k <= n; k++) plants[(lead + k - 1) % 2].push([o.t0 + k * T, Pk(k)]);
  plants[(lead + n) % 2].push([o.t0 + (n + 1) * T, o.x1 + gap]);
  const lift = (o.lift ?? (0.085 + 0.07 * run)) * h;
  const foot = f => {
    const pl = plants[f];
    let i = 0; while (i + 1 < pl.length && pl[i + 1][0] <= t) i++;
    const [, xa] = pl[i], nx = pl[i + 1];
    if (nx && t > nx[0] - swing) {                         // bay: cung từ chỗ cũ tới chỗ mới, nhấc cao sớm (passing)
      const k = clamp((t - (nx[0] - swing)) / swing), e = ease(k), x = xa + (nx[1] - xa) * e;
      const line = ground(xa) + (ground(nx[1]) - ground(xa)) * e;
      const up = Math.sin(Math.PI * Math.pow(k, 0.75));
      return { p: [x, Math.min(line, ground(x)) - lift * up], planted: false };
    }
    return { p: [xa, ground(xa)], planted: true };       // trụ: đứng YÊN đúng chỗ đã đặt
  };
  const A = foot(0), B = foot(1);
  // hông x: qua trung điểm hai chân ở mỗi lần chạm đất, spline mượt, đứng yên trước t0 / sau t1
  const ts = [o.t0], xs = [o.x0];
  for (let k = 1; k <= n; k++) { ts.push(o.t0 + k * T); xs.push(((k === 1 ? o.x0 - gap : Pk(k - 1)) + Pk(k)) / 2); }
  ts.push(o.t0 + (n + 1) * T); xs.push(o.x1);
  const hx = spline(ts, xs, t);
  // độ dốc dưới hông (độ, dương = lên theo hướng đi)
  const d = 0.12 * h, slope = Math.atan2(-(ground(hx + d * dir) - ground(hx - d * dir)), 2 * d) / D2R;
  // hông y: cao ~0.93 chân trên mặt đất trung bình, nhấp nhô 4 nhịp (down ngay sau chạm đất, up giữa pha trụ)
  const walking = t > o.t0 && t < o.t1, w = walking ? clamp(Math.min(t - o.t0, o.t1 - t) / (0.6 * T)) : 0;
  const ph = ((t - o.t0) / T) % 1, bob = (0.022 + 0.03 * run) * h * Math.cos(2 * Math.PI * (ph - 0.18)) * w;
  const gy = (ground(hx) + (ground(A.p[0]) + ground(B.p[0])) / 2) / 2;
  let hy = gy - legLen * (0.985 - 0.07 * w) + bob;
  // chân luôn với tới: hạ hông nếu cần. Chạy: CHỈ chân trụ (chân bay phía sau không được kéo hông xuống → dáng khom)
  for (const F of (run > 0 ? [A, B].filter(F => F.planted) : [A, B])) {
    const dx = Math.abs(F.p[0] - hx); if (dx < reach) hy = Math.max(hy, F.p[1] - Math.sqrt(reach * reach - dx * dx));
  }
  // tay: ngược chân, suy từ vị trí thật của hai bàn chân → luôn khớp với bước; khuỷu tay trước gập nhiều hơn
  const fwd = clamp((B.p[0] - A.p[0]) * dir / Math.max(1, Math.abs(S)), -1, 1);   // >0: chân gần (R) đang ở trước
  const arm = (o.arm ?? (24 + 26 * run)) * D2R * (1 + 0.5 * clamp(slope / 25, 0, 1)) * w;
  const up = clamp(slope / 30, -0.6, 1);
  const pose = {
    ...P.stand,
    lean: ((5 + 12 * run) * w + 0.5 * Math.max(0, slope) + 0.2 * Math.min(0, slope)) * D2R, head: (-4 - 0.3 * Math.max(0, slope)) * D2R,
    shR: -arm * fwd + 4 * D2R, elR: (8 + 32 * clamp(-fwd, 0, 1) + 10 * up + 55 * run) * D2R,
    shL: arm * fwd + 4 * D2R, elL: (8 + 32 * clamp(fwd, 0, 1) + 10 * up + 55 * run) * D2R,   // tay sau gần thẳng, tay trước gập (mẫu Becker)
  };
  if (!walking) { pose.shR = P.stand.shR; pose.shL = P.stand.shL; pose.elR = P.stand.elR; pose.elL = P.stand.elL; }
  return { hip: [hx, hy], feet: [A.p, B.p], planted: [A.planted, B.planted], pose, slope, dir };
}

// ── dùng chung cho cảnh người que (tools/lab/hero-scene.js, fight-scene.js; docs/character/CHARACTER-STICK.md §5) ──
// Canvas giả: gọi stick() chỉ để lấy KHỚP (đặt vật, tính va chạm, gác số) mà không vẽ.
export const NOOP = new Proxy({}, { get: (o, k) => (k in o ? o[k] : () => {}), set: (o, k, v) => (o[k] = v, true) });
// Nhịp Becker (study 10): snap = bật dáng không khung đệm (đặt hai khoá cùng giờ), fast = ease-out bậc 3 (vào gắt, dừng mềm).
export const snap = k => (k > 0 ? 1 : 0);
export const fast = k => { k = clamp(k); return 1 - (1 - k) ** 3; };
// Đích tay ngoài tầm với (đang nội suy FK → vật) → kéo về mép tầm: tay luôn CHẠM đích đã cho (LESSONS §148).
// len = (L.upper + L.fore) · h · arm.
export const reach = (neck, p, len) => { if (!p) return p; const dx = p[0] - neck[0], dy = p[1] - neck[1], d = Math.hypot(dx, dy);
  return d <= len ? p : [neck[0] + dx / d * len, neck[1] + dy / d * len]; };
// Hai lượt đi nối nhau: chân đang ở SAU (x nhỏ) là chân bước trước của lượt sau — không thì chân trụ trượt 2 · gap (§148).
export const leadOf = W => { const f = gait(W, 99).feet; return f[0][0] < f[1][0] ? 'L' : 'R'; };
