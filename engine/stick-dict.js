// engine/stick-dict.js — TỪ ĐIỂN người que (docs/stick/DICTIONARY.md): dáng có tên, học từ Alan Becker (mỗi dáng ghi mốc
// trong video mẫu — dựng lại ảnh: tools/study/stick_ref.py), + máy dàn cảnh `stage()` có overlap (đầu/tay trễ sau thân).
// Vẽ bằng hero(..., { soft: true }) (engine/hero.js). Hàm thuần của t — tất định.
//
//   import { DICT, pose, stage } from '../../engine/stick-dict.js';
//   const A = stage(t, { h, ground, keys: [[0, pose('idle', { x: 800 })], [0.4, pose('think', { x: 800 })]], walks, dirAt });
//   hero(g, 'C', A.hip[0], 0, A.pose, { soft: true, h, dir: A.dir, hip: A.hip, feet: A.feet, hands: A.hands, rot: A.rot, … });
//
// Một dáng = góc (độ, quy ước engine/stick.js: vai/hông đo từ phương thẳng xuống, + = về phía mặt; khuỷu + gập về trước,
// gối + gập về sau; L = chi phía SAU / bên trái khi chính diện) + đặt thân theo đơn vị chiều cao h:
//   hy  hông cao trên mặt đất        rot  xoay cả người quanh hông (độ; −90 = nằm ngửa đầu về trái khi dir 1)
//   fe  1 = khoá hai bàn chân xuống đất bằng IK, tại x + dir·fl (chân sau) và x + dir·fr (chân trước)
//   fb  1 = chân SAU vẽ theo góc (quỳ: gối chạm đất) — chỉ chân trước khoá IK
//   front 1 = dáng chính diện (hero vẽ hai tay trước đầu)
//   curl độ cong lưng (độ; + gù, − ưỡn; bỏ trống = curlOf(lean)) — thân Becker cong chữ C, không bao giờ là que thẳng
//   armK hệ số giãn tay (mặc định 1 = SOFT_ARM): tay ngắn không vươn qua cái đầu to (LESSONS §149) → dáng giơ cao GIÃN
//        tay như Becker kéo giãn chi (squash & stretch); nội suy giữa hai khoá nên tay dài ra dần, không bật
import { gait, keys } from './stickmove.js';
import { SOFT_ARM } from './hero.js';
import { curlOf } from './stick.js';

const D2R = Math.PI / 180;
const ANG = ['lean', 'curl', 'head', 'shL', 'elL', 'shR', 'elR', 'hipL', 'knL', 'hipR', 'knR', 'rot'];
const STAND = 0.394;                                     // hông đứng thẳng (= (đùi + cẳng) · 0.985)
const mk = (o, place = {}) => {
  const p = { lean: 0, head: 0, shL: 0, elL: 0, shR: 0, elR: 0, hipL: 0, knL: 0, hipR: 0, knR: 0, bob: 0, rot: 0, hy: STAND, fe: 1, fb: 0, fl: -0.035, fr: 0.035, front: 0, armK: 1, ...place };
  for (const k in o) p[k] = ANG.includes(k) ? o[k] * D2R : o[k];
  if (o.curl == null) p.curl = curlOf(p.lean);           // lưng cong theo độ nghiêng (engine/stick.js curlOf) — luôn là số để keys() nội suy
  return p;
};
const E = (group, ref, note, o, place) => ({ group, ref, note, p: mk(o, place) });

// ref: '<video>@<giây>' — coding = "Animation vs. Coding", math = "Animation vs. Math" (docs/stick/REFERENCE.md)
export const DICT = {
  // ── đứng ──
  idle:      E('đứng', 'coding@12.5', 'trọng tâm dồn một chân (contrapposto), tay buông hơi gập — KHÔNG đứng đối xứng',
               { lean: -2, head: 4, shL: -4, elL: 16, shR: 10, elR: 22 }, { fl: -0.1, fr: 0.03 }),
  idleOpen:  E('đứng', 'math@68', 'hai chân mở, thả lỏng — đứng nghe / chờ',
               { lean: 1, head: 6, shL: -10, elL: 12, shR: 12, elR: 18 }, { fl: -0.14, fr: 0.12, hy: 0.372 }),
  think:     E('đứng', 'math@88', 'tay chống cằm, đầu nghiêng xuống, chân dồn',
               { lean: 3, head: 14, shL: -4, elL: 14, shR: 26, elR: 150 }, { fl: -0.1, fr: 0.02 }),
  scratch:   E('đứng', 'math@12', 'gãi đỉnh đầu — bối rối',
               { lean: -2, head: 10, shL: -6, elL: 12, shR: 160, elR: 62 }, { fl: -0.06, fr: 0.03, armK: 1.15 }),
  facepalm:  E('đứng', 'math@24', 'che mặt — "ôi trời"',
               { lean: 8, curl: 26, head: 22, shL: -4, elL: 10, shR: 40, elR: 140 }, { fl: -0.05, fr: 0.03 }),
  shrug:     E('đứng', 'math@28', 'nhún vai, hai tay ngửa — chính diện',
               { head: 8, shL: -42, elL: -95, shR: 42, elR: 95 }, { fl: -0.09, fr: 0.09, front: 1, armK: 1.1 }),
  point:     E('đứng', 'math@128', 'chỉ thẳng về trước, thân hơi ngả sau',
               { lean: -4, head: -2, shL: -10, elL: 14, shR: 92, elR: 2 }, { fl: -0.13, fr: 0.06, hy: 0.388 }),
  cheer:     E('đứng', 'math@40', 'giơ hai tay — mừng / ngạc nhiên lớn, chính diện',
               { curl: -12, head: -10, shL: -132, elL: -18, shR: 132, elR: 18 }, { fl: -0.15, fr: 0.15, front: 1, hy: 0.365, armK: 1.3 }),
  sad:       E('đứng', 'coding@432.5', 'rũ: đầu cúi, vai sụp, tay thõng',
               { lean: 14, curl: 30, head: 26, shL: 2, elL: 6, shR: 6, elR: 8 }, { fl: -0.04, fr: 0.03, hy: 0.388 }),
  leanCross: E('đứng', 'math@220', 'tựa lưng khoanh tay, chân bắt chéo',
               { lean: -8, head: 6, shL: 35, elL: 105, shR: 42, elR: 115 }, { fl: 0.04, fr: -0.02 }),
  // ── cầm / vác ──
  hold:      E('cầm', 'coding@52.5', 'ôm laptop trước bụng, cẳng tay ngang — gắn tay bằng IK vào vật',
               { lean: 4, head: 20, shL: 20, elL: 70, shR: 30, elR: 70 }, { fl: -0.06, fr: 0.02 }),
  holdUp:    E('cầm', 'coding@67.5', 'giơ vật lên trước mặt để nhìn',
               { lean: -3, head: 8, shL: 40, elL: 60, shR: 50, elR: 60 }, { fl: -0.06, fr: 0.03 }),
  overhead:  E('cầm', 'coding@350', 'vác vật nặng qua đầu, gối khuỵu, chính diện',
               { curl: -14, head: -6, shL: -128, elL: -55, shR: 128, elR: 55 }, { fl: -0.11, fr: 0.11, front: 1, hy: 0.36, armK: 1.4 }),
  holdOut:   E('cầm', 'math@320', 'một tay chìa vật nhỏ ra trước',
               { lean: 2, head: 10, shL: -6, elL: 14, shR: 60, elR: 50 }, { fl: -0.07, fr: 0.03 }),
  // ── sàn ──
  lieBack:   E('sàn', 'coding@5', 'nằm ngửa, gối hơi co',
               { head: -8, shL: 8, elL: 6, shR: 16, elR: 14, hipL: 38, knL: 70, hipR: 18, knR: 30, rot: -90 }, { fe: 0, hy: 0.12 }),
  propBack:  E('sàn', 'coding@7.5', 'ngồi ngả sau chống tay, gối dựng — vừa tỉnh dậy',
               { lean: -30, curl: 12, head: -4, shL: -42, elL: 2, shR: -36, elR: 4 }, { fl: 0.25, fr: 0.32, hy: 0.05 }),
  hugKnees:  E('sàn', 'math@72', 'ngồi ôm gối',
               { lean: 22, curl: 46, head: 6, shL: 52, elL: 62, shR: 58, elR: 60 }, { fl: 0.12, fr: 0.16, hy: 0.05 }),
  prone:     E('sàn', 'coding@160', 'nằm sấp, ngẩng đầu, tay duỗi trước (bị đánh bay / trượt)',
               { curl: -22, head: -24, shL: 165, elL: 4, shR: 175, elR: 0, hipL: 4, hipR: -4, knR: 8, rot: 90 }, { fe: 0, hy: 0.07 }),
  crawl:     E('sàn', 'math@112', 'bò bằng tay và gối',
               { lean: 78, curl: 18, head: -50, shL: -6, elL: 0, shR: 6, elR: 0, hipL: 0, knL: 90, hipR: 12, knR: 92 }, { fe: 0, hy: 0.2 }),
  // ── quỳ / ngồi xổm ──
  kneelType: E('quỳ', 'coding@25', 'quỳ một gối gõ vật dưới đất',
               { lean: 34, curl: 36, head: 14, shL: 50, elL: 30, shR: 60, elR: 30, hipL: 0, knL: 90 }, { fb: 1, fl: 0, fr: 0.17, hy: 0.2 }),
  hunch:     E('quỳ', 'coding@40', 'quỳ hai gối, gập người sát vật — chăm chú',
               { lean: 62, curl: 56, head: 6, shL: 40, elL: 24, shR: 52, elR: 22, hipL: 60, knL: 150, hipR: 66, knR: 156 }, { fe: 0, hy: 0.1 }),
  sitHeels:  E('quỳ', 'coding@447.5', 'ngồi trên gót, lưng thẳng, tay đặt đùi',
               { lean: 6, head: 10, shL: 30, elL: 40, shR: 36, elR: 40, hipL: 55, knL: 145, hipR: 60, knR: 150 }, { fe: 0, hy: 0.115 }),
  sitHeelsSad: E('quỳ', 'coding@442.5', 'ngồi trên gót, gục đầu',
               { lean: 30, curl: 52, head: 22, shL: 10, elL: 10, shR: 14, elR: 10, hipL: 55, knL: 145, hipR: 60, knR: 150 }, { fe: 0, hy: 0.11 }),
  squat:     E('quỳ', 'coding@37.5', 'ngồi xổm — pha giữa khi đứng lên / ngồi xuống',
               { lean: 34, shL: 30, elL: 40, shR: 45, elR: 40 }, { fl: -0.05, fr: 0.09, hy: 0.14 }),
  pick:      E('quỳ', 'coding@22.5', 'cúi nhặt vật dưới đất, mông lùi',
               { lean: 58, curl: 50, head: -12, shL: 70, elL: 10, shR: 80, elR: 10 }, { fl: -0.06, fr: 0.14, hy: 0.3 }),
  // ── hành động ──
  stride:    E('hành động', 'coding@20', 'sải bước (khung contact) — đi thật dùng gait()',
               { lean: 8, head: 2, shL: 38, elL: 24, shR: -38, elR: 34 }, { fl: -0.21, fr: 0.2, hy: 0.35 }),
  sprint:    E('hành động', 'coding@190', 'chạy nước rút: ngả mạnh, tay đánh 90°, gối trước cao',
               { lean: 26, head: -8, shL: -55, elL: 95, shR: 70, elR: 100, hipL: -45, knL: 80, hipR: 70, knR: 85 }, { fb: 1, fl: 0, fr: 0.1, hy: 0.33 }),
  push:      E('hành động', 'coding@315', 'đẩy vật nặng: thân 55°, chân sau duỗi thẳng xa',
               { lean: 55, curl: 12, head: -28, shL: 85, elL: 20, shR: 90, elR: 15 }, { fl: -0.32, fr: 0.05, hy: 0.3 }),
  lunge:     E('hành động', 'math@444', 'lao tới / ném xong: chân trước khuỵu, chân sau duỗi',
               { lean: 26, head: -8, shL: -50, elL: 20, shR: 105, elR: 5 }, { fl: -0.37, fr: 0.2, hy: 0.26 }),
  windup:    E('hành động', 'math@448', 'lấy đà ném: tay vung ra sau, thân ngả sau',
               { lean: -16, curl: -26, head: 8, shL: 80, elL: 12, shR: -120, elR: 25 }, { fl: -0.25, fr: 0.2, hy: 0.335 }),
  dodge:     E('hành động', 'math@280', 'né: ngả sau, tay giơ chắn',
               { lean: -30, curl: -38, head: 0, shL: 60, elL: 60, shR: 110, elR: 50 }, { fl: -0.17, fr: 0.2, hy: 0.345 }),
  recoil:    E('hành động', 'coding@34.5', 'bị đập vào mặt: đầu bật sau, tay ôm mặt',
               { lean: -30, curl: -44, head: -24, shL: 30, elL: 90, shR: 150, elR: 120 }, { fl: -0.09, fr: 0.06, hy: 0.374 }),
  fallBack:  E('hành động', 'coding@162.5', 'văng ngửa trên không (vẽ kèm vệt nhoè nếu nhanh)',
               { lean: -20, curl: -34, head: -6, shL: 120, elL: 30, shR: 150, elR: 40, hipL: 50, knL: 60, hipR: 30, knR: 30, rot: -30 }, { fe: 0, hy: 0.5 }),
  hang:      E('hành động', 'coding@235', 'treo / với lên cao, chân thõng — chính diện',
               { curl: -10, head: -12, shL: -150, elL: 6, shR: 150, elR: -6, hipL: -6, knL: 20, hipR: 6, knR: 10 }, { fe: 0, hy: 0.42, front: 1, armK: 1.55 }),
};
export const GROUPS = [...new Set(Object.values(DICT).map(e => e.group))];

/** Dáng có tên + ghi đè (góc tính bằng ĐỘ, x = hông x tuyệt đối). Trả khoá dùng cho keys()/stage(). */
export function pose(name, over = {}) {
  const e = DICT[name]; if (!e) throw new Error(`stick-dict: không có dáng "${name}"`);
  const r = { ...e.p };
  for (const k in over) r[k] = ANG.includes(k) ? over[k] * D2R : over[k];
  return r;
}

// Overlap / follow-through (Becker: thân dẫn, đầu theo sau, tay theo sau nữa): trường của nhóm sau lấy khoá ở t − trễ.
export const DRAG = { chest: 0.05, head: 0.05, arms: 0.09 };   // chest: nửa trên thân trễ sau hông → lưng uốn khi đổi dáng nhanh
const LATE = { head: ['head'], arms: ['shL', 'elL', 'shR', 'elR'] };

/**
 * Dàn một nhân vật theo giờ: khoá dáng (keys) + các lượt đi (walks: o của gait()) + hướng (dirAt).
 * o: { h, ground: X => Y, keys, walks = [], dirAt = t => 1, drag = DRAG, breathe = 1 }
 * Trả { hip, feet, pose, rot, dir, front, walk } để đưa thẳng vào hero(). Tay cầm vật: tự gán A.hands sau.
 */
export function stage(t, o) {
  const h = o.h, ground = o.ground, dir = (o.dirAt || (() => 1))(t), drag = o.drag ?? DRAG;
  const W = (o.walks || []).find(w => t > w.t0 && t < w.t1);
  let A;
  if (W) {
    const G = gait({ ground, h, ...W }, t);
    A = { hip: G.hip, feet: G.feet, pose: { ...G.pose }, rot: 0, walk: true, front: 0 };
  } else {
    const k = keys(o.keys, t);
    // lưng uốn theo quán tính: nửa trên thân giữ hướng cũ một nhịp (curl += lean(t − trễ) − lean(t)), rồi đuổi kịp
    if (drag.chest) { const kc = keys(o.keys, t - drag.chest), d = Math.max(-30 * D2R, Math.min(30 * D2R, kc.lean - k.lean)); k.curl = (k.curl ?? curlOf(k.lean)) + d; }
    for (const g in LATE) if (drag[g]) { const kl = keys(o.keys, t - drag[g]); for (const f of LATE[g]) k[f] = kl[f]; }
    const gy = ground(k.x);
    A = { hip: [k.x, gy - k.hy * h], pose: k, rot: k.rot, front: k.front > 0.5 ? 1 : 0 };
    if (k.fe > 0.5) A.feet = [k.fb > 0.5 ? null : [k.x + dir * k.fl * h, ground(k.x + dir * k.fl * h)], [k.x + dir * k.fr * h, ground(k.x + dir * k.fr * h)]];
  }
  // giữ mà vẫn sống (moving hold): đầu + vai trôi rất nhẹ, lệch pha — KHÔNG nhún hông (LESSONS §158)
  const b = o.breathe ?? 1;
  if (b) { A.pose.head += Math.sin(t * 1.7) * 1.2 * D2R * b; A.pose.shL += Math.sin(t * 1.3 + 1) * 1.5 * D2R * b; A.pose.shR += Math.sin(t * 1.1 + 2) * 1.5 * D2R * b; }
  A.dir = dir; A.arm = SOFT_ARM * (A.pose.armK ?? 1);
  return A;
}
