// Người que của zero-div — MỘT nguồn cho bàn thử (tools/lab/stick-zd.html, clip người dùng duyệt 2026-10-22) và mở bài
// (plates/a0-open.js). makeStick() không tham số = đúng clip đã duyệt; video truyền x0 / t0 / exit.
// Bàn thử người que cho zero-div (câu 6 của mở bài: "…nobody has managed to patch it") — áp docs/study/08:
// tư thế chính đặt tay + ease, đi theo bản đồ bước, IK chỉ khoá chân / tay vào vật. Mặt đất = trục số (phẳng), lỗ ở 0.
// Kịch bản 8 s: vác miếng vá đi từ 5 về phía 0 → dừng ở mép lỗ → khom xuống đặt miếng vá lên lỗ → buông → miếng vá
// rơi tuột qua lỗ, người que nghiêng nhìn theo → đứng lên, gãi đầu.
import { P } from '../../../../engine/stick.js';
import { gait, keys, ease, easeOut } from '../../../../engine/stickmove.js';

export const H = 250, DIR = -1, NY = 880, HX = 960, HR = 90;
export const SCENE = { dur: 8 };
export const CARD = { x0: -1, x1: -1, top: -1 };          // (không có bục — để bộ gác dùng chung)
const D2R = Math.PI / 180, legLen = 0.4 * H;
// tư thế gãi đầu ĐÚNG như clip đã duyệt (engine P.scratch đổi sau đó — giữ bài đã duyệt không đổi pixel)
const SCRATCH = { ...P.stand, head: 10 * D2R, shL: -6 * D2R, elL: 10 * D2R, shR: 140 * D2R, elR: 125 * D2R, hipL: -5 * D2R, hipR: 5 * D2R };
export const ground = X => NY;
const deg = o => { const r = { ...P.stand }; for (const k in o) r[k] = ['lean', 'head', 'shL', 'elL', 'shR', 'elR', 'hipL', 'knL', 'hipR', 'knR'].includes(k) ? o[k] * D2R : o[k]; return r; };
const lerp2 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
const win = (t, a, b) => ease((t - a) / (b - a));

// miếng vá: hình chữ nhật 200 × 64; vị trí tâm theo t (do người que cầm → đặt → rơi)
export const PATCH = { w: 250, h: 72 };                       // rộng hơn đường kính lỗ (180) — đặt lên là CHE được, rồi vẫn rơi
// o: x0 (chỗ bắt đầu đi), t0 / t1 (giờ đi), exit (giờ quay lưng đi ra khỏi khung, tuỳ chọn). Hành động sau khi dừng giữ
// đúng nhịp của clip đã duyệt (dời theo t1).
export function makeStick({ x0 = 1560, t0 = 0.3, t1 = 3.3, exit = null } = {}) {
  const W1 = { ground, h: H, dir: DIR, x0, x1: HX + HR + 0.3 * H, t0, t1, step: 0.28 };
  const S = t1 - 3.3;                                       // dời mọi mốc sau khi dừng
  const actorNeck = t => { const A = actor0(t); return [A.hip[0] + Math.sin(A.pose.lean) * 0.27 * H * DIR, A.hip[1] - Math.cos(A.pose.lean) * 0.27 * H]; };
  function actor0(T) {
    const t = T < t1 + 0.15 ? T - S : T - S;   // τ: giờ trong clip gốc
  const standY = NY - legLen * 0.985;
  let hip, feet, pose, phase, planted;
  if (t < 3.45) {
    const G = gait(W1, T); hip = G.hip; feet = G.feet; pose = G.pose; phase = 'walk'; planted = G.planted;
  } else {
    const E = gait(W1, 1e6); feet = E.feet;
    const k = keys([
      [3.45, { ...deg({}), hy: E.hip[1], hx: E.hip[0] }],
      [3.75, { ...deg({ lean: 8, head: 20 }), hy: E.hip[1] + 0.04 * legLen, hx: E.hip[0] }],            // nhìn xuống lỗ
      [4.2, { ...deg({ lean: -10, head: 4 }), hy: E.hip[1] + 0.1 * legLen, hx: E.hip[0] + 8 }],         // lấy đà: ngả ra sau, hơi khuỵu
      [4.38, { ...deg({ lean: 22, head: 6, shL: 70, elL: 10, shR: 78, elR: 8 }), hy: E.hip[1] + 0.02 * legLen, hx: E.hip[0] - 6 }, easeOut],  // ném
      [4.6, { ...deg({ lean: 26, head: 14, shL: 62, elL: 14, shR: 70, elR: 12 }), hy: E.hip[1] + 0.06 * legLen, hx: E.hip[0] - 6 }],   // theo đà
      [5.1, { ...deg({ lean: 30, head: 30, shL: 20, elL: 30, shR: 25, elR: 35 }), hy: E.hip[1] + 0.12 * legLen, hx: E.hip[0] - 2 }],  // nhìn miếng vá rơi
      [5.7, { ...deg({ lean: 30, head: 36, shL: 18, elL: 30, shR: 22, elR: 35 }), hy: E.hip[1] + 0.12 * legLen, hx: E.hip[0] - 2 }],
      [6.15, { ...deg({ lean: -2, head: 2 }), hy: E.hip[1] - 0.01 * legLen, hx: E.hip[0] }],            // đứng lên (vượt nhẹ)
      [6.35, { ...deg({}), hy: E.hip[1], hx: E.hip[0] }],
      [6.8, { ...SCRATCH, hy: E.hip[1], hx: E.hip[0] }],                                              // gãi đầu — bối rối
    ], t);
    if (t > 6.8) k.head = SCRATCH.head + 6 * D2R * Math.sin((t - 6.8) * 5) * Math.exp(-(t - 6.8));
    hip = [k.hx, k.hy]; pose = k; phase = t < 4.38 ? 'windup' : t < 6.35 ? 'watch' : 'scratch';
  }
  // miếng vá: cầm trước ngực (toạ độ theo CỔ — luôn trong tầm tay), kéo về sát người khi lấy đà, đưa ra khi ném,
  // rồi bay theo CUNG tới đúng tâm lỗ, nằm phẳng, rồi rơi tuột qua lỗ
  const neck = [hip[0] + Math.sin(pose.lean) * 0.27 * H * DIR, hip[1] - Math.cos(pose.lean) * 0.27 * H];
  const rel0 = 4.38, fly = 0.5;
  const off = keys([[3.45, { x: 0.2, y: 0.2 }], [4.2, { x: 0.02, y: 0.28 }], [rel0, { x: 0.27, y: 0.13 }]], t);   // tung từ DƯỚI lên: miếng vá luôn thấp hơn đầu
  const hold = [neck[0] + DIR * off.x * H, neck[1] + off.y * H];
  let pc = hold, fall = 0, rot = -0.04;
  if (t > rel0) {
    const k = Math.min(1, (t - rel0) / fly), p0 = (() => { const n0 = actorNeck(rel0); return [n0[0] + DIR * 0.27 * H, n0[1] + 0.13 * H]; })();
    pc = [p0[0] + (HX - p0[0]) * k, p0[1] + (NY - 6 - p0[1]) * k - 60 * 4 * k * (1 - k)]; rot = -0.04 + 0.5 * Math.sin(Math.PI * k) * (1 - k);
  }
  if (t > rel0 + fly + 0.35) { fall = ease((t - rel0 - fly - 0.35) / 0.9); pc = [HX, NY - 6 + fall * 40]; rot = fall * 1.1; }
  const rel = win(t, rel0 - 0.02, rel0 + 0.2);
  const grip = [[hold[0] - DIR * 22, hold[1] - 4], [hold[0] + DIR * 2, hold[1] + 2]];   // hai tay ôm sát mép gần — trong tầm với   // hai tay ôm sát mép gần — trong tầm với
  // buông: nội suy điểm từ chỗ cầm về vị trí tay theo GÓC (FK) — không bật công tắc (LESSONS §137)
  const fk = i => { const sh = i ? pose.shR : pose.shL, el = i ? pose.elR : pose.elL;
    const m = [neck[0] + Math.sin(sh) * 0.155 * H * DIR, neck[1] + Math.cos(sh) * 0.155 * H];
    return [m[0] + Math.sin(sh + el) * 0.15 * H * DIR, m[1] + Math.cos(sh + el) * 0.15 * H]; };
  let hands = rel >= 1 ? [null, null] : [0, 1].map(i => lerp2(grip[i], fk(i), rel));
  // gãi đầu: bàn tay gần khoá vào mép SAU-TRÊN của vòng đầu (không chui vào trong đầu — silhouette, study 08)
  const ws = win(t, 6.35, 6.8);
  if (ws > 0) {
    const a = pose.lean + pose.head, hc = [neck[0] + Math.sin(a) * 0.135 * H * DIR, neck[1] - Math.cos(a) * 0.135 * H], r = 0.105 * H;
    const wob = t > 6.8 ? Math.sin((t - 6.8) * 14) * 4 * Math.exp(-(t - 6.8) * 0.8) : 0;
    const tgt = [hc[0] - DIR * 0.75 * r + wob, hc[1] - 0.75 * r];
    hands = [null, lerp2(fk(1), tgt, ws)];
  }
  return { hip, feet, pose, phase, planted, hands, release: rel, patch: { c: pc, fall, rot } };
}
  // đi ra: quay lưng (dáng đứng đối xứng → lật hướng không giật), đi về bên phải ra khỏi khung
  const E = gait(W1, 1e6), W2 = exit == null ? null : { ground, h: H, dir: 1, x0: E.hip[0], x1: 2180, t0: exit, t1: exit + 2.8, step: 0.3 };
  return function actor(T) {
    if (!W2 || T < exit) return actor0(T);
    const G = gait(W2, T);
    return { hip: G.hip, feet: G.feet, pose: G.pose, phase: 'exit', planted: G.planted, hands: [null, null], dir: 1, patch: { c: [HX, NY], fall: 1, rot: 0 } };
  };
}
