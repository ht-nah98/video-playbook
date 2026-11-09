// Hồi 1 · "About 30,000 years ago — a scratch on a bone" (SCRIPT.md). Mỗi câu một thay đổi; mốc lấy từ từ được đọc.
//   L1 công thức bị một vết cào gạch đi · L2 khúc xương trồi lên, vạch đầu tiên · L3 xương sói: khắc 55 vạch nhóm 5
//   L4–L5 ảnh xương Ishango thật · L6 ba vạch RỜI khỏi xương · L7–L9 cừu, ngày, trăng → cùng một thứ: ba vạch
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, photo, iris, lookup } from '../kit.js';

const E = ERA.bone;
const BONE = { x: 170, y: 820, len: 1000 };
// xương sói Dolní Věstonice: 55 vạch, nhóm 5 (vạch 0 là vạch đầu tiên của câu "a scratch on a bone")
const NOTCH = Array.from({ length: 55 }, (_, i) => BONE.x + 90 + i * 12 + Math.floor(Math.min(i, 25) / 5) * 22);
const MARKS = [760, 806, 852];                  // ba vạch lớn ở giữa khung

function bone(g, k) {
  if (k <= 0) return;
  const dy = (1 - outCubic(k)) * 420;
  g.save(); g.translate(BONE.x, BONE.y + dy); g.rotate(-0.03);
  g.fillStyle = '#E3D5B8';
  for (const [x, y, r] of [[18, -30, 40], [22, 30, 38], [BONE.len + 18, -26, 36], [BONE.len + 14, 28, 34]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.beginPath(); g.moveTo(30, -40); g.bezierCurveTo(300, -20, 700, -22, BONE.len + 10, -36); g.lineTo(BONE.len + 10, 34); g.bezierCurveTo(700, 20, 300, 22, 30, 40); g.fill();
  g.fillStyle = 'rgba(120,90,60,0.22)'; g.beginPath(); g.moveTo(60, 10); g.bezierCurveTo(400, 22, 700, 20, BONE.len - 10, 12); g.lineTo(BONE.len - 10, 24); g.bezierCurveTo(700, 30, 400, 32, 60, 26); g.fill();
  g.restore();
  return dy;
}
/** vạch i trên xương, khắc dần theo k (dao đi từ trên xuống) */
function notch(g, i, k, color = '#5A3E28', dy = 0) {
  if (k <= 0) return;
  const x = NOTCH[i] - BONE.x, top = -26 + hash(i) * 6, bot = 24 - hash(i + 31) * 6;
  g.save(); g.translate(BONE.x, BONE.y + dy); g.rotate(-0.03);
  hand(g, seg(x, top, x + 2, bot, 6), { w: 3.5, color, jit: 0.8, seed: i, k });
  g.restore();
}
function icon(g, kind, x, y, k, bump = 0) {
  if (k <= 0) return;
  const s = outBack(clamp(k)) * (1 + bump);
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = g.strokeStyle = E.ink; g.lineWidth = 3;
  if (kind === 'sheep') { for (const [dx, dy] of [[-18, 0], [0, -10], [18, 0], [0, 8]]) { g.beginPath(); g.arc(dx, dy, 16, 0, 7); g.fill(); }
    g.fillStyle = E.dim; g.beginPath(); g.ellipse(34, -4, 11, 14, 0.4, 0, 7); g.fill(); g.beginPath(); g.ellipse(30, -18, 8, 4, -0.5, 0, 7); g.fill();
    g.fillStyle = E.ink; g.fillRect(-16, 18, 4, 14); g.fillRect(12, 18, 4, 14); }
  if (kind === 'sun') { g.beginPath(); g.arc(0, 0, 18, 0, 7); g.fill(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.beginPath(); g.moveTo(26 * Math.cos(a), 26 * Math.sin(a)); g.lineTo(36 * Math.cos(a), 36 * Math.sin(a)); g.stroke(); } }
  if (kind === 'moon') { g.beginPath(); g.arc(0, 0, 24, 0, 7); g.fill(); g.fillStyle = E.bg; g.beginPath(); g.arc(12, -6, 22, 0, 7); g.fill(); }
  g.restore();
}

export class Bone {
  init({ tl }) {
    const { L, w } = lookup(tl, 'a1');
    this.T = {
      fNot: w(0, 'not'), l2: L(1).start, scratch: w(1, 'scratch'),
      czech: w(2, 'czech'), carved: w(2, 'notches'), thirty: w(2, 'thirty'),
      fifty: w(3, 'nineteen'), africa: w(3, 'central'), grouped: w(3, 'groups'), twenty: w(3, 'twenty'),
      ishango: w(4, 'ishango'), l6: L(5).start, simple: w(5, 'simple'), leap: w(5, 'biggest'),
      quantity: w(6, 'quantity'), things: w(6, 'things'), counted: w(6, 'counted'),
      sheep1: w(7, 'three', 1), sheep2: w(7, 'three', 2),
      days: w(8, 'three', 2), moons: w(8, 'three', 3), same: w(8, 'same'), marks: w(8, 'three', 4),
      number: w(9, 'number'), pulling: w(10, 'pulling'), stuff: w(10, 'stuff'),
    };
    this.END = L(10).end;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'bone');
    // sau intro: màn chập mở từ đen; thẻ HỒI giữa khung rồi trượt lên nhường thẻ mốc
    const actOut = outCubic(prog(t, -0.6, 0.1));
    if (actOut < 1) {
      g.save(); g.translate(0, -actOut * 700);
      typed(g, 'ACT ONE', W / 2, 500, prog(t, -2.7, -2.2), '800 150px "Archivo"', E.ink, { align: 'center' });
      typed(g, 'Counting', W / 2, 600, prog(t, -2.2, -1.6), 'italic 500 72px "Cormorant Garamond"', E.accent, { align: 'center' });
      g.restore();
    }
    card(g, 'bone', prog(t, -0.2, 1.6), 'ACT ONE · COUNTING', '≈ 30,000 YEARS AGO', 'a scratch on a bone');
    ruler(g, 'bone', -30000, prog(t, 1.0, 2.0));

    // L1: công thức "không phải" — một vết cào gạch đi, rồi chúng rơi khỏi khung
    const fall = prog(t, T.l2 - 0.35, T.l2 + 0.25);
    if (fall < 1) {
      g.save(); g.translate(0, outCubic(fall) * 700); g.rotate(fall * 0.05);
      [['a² + b² = c²', 1060, 470, 0.15], ['F = m · a', 1380, 560, 0.45], ['∫ f(x) dx', 1120, 640, 0.75]].forEach(([s, x, y, d]) =>
        typed(g, s, x, y, prog(t, d, d + 0.6), 'italic 500 64px "Cormorant Garamond"', E.dim));
      hand(g, seg(1010, 600, 1700, 470, 30), { w: 9, color: E.accent, jit: 4, seed: 7, k: prog(t, T.fNot, T.fNot + 0.3) });
      g.restore();
    }

    // L2: khúc xương trồi lên; vạch đầu tiên đúng chữ "scratch"
    const dy = bone(g, prog(t, T.l2 - 0.25, T.l2 + 0.3)) ?? 0;
    if (t >= T.l2 - 0.25) {
      notch(g, 0, prog(t, T.scratch, T.scratch + 0.25), t < T.carved ? E.accent : '#5A3E28', dy);
      // L3: dao khắc 54 vạch còn lại từ "carved" tới hết "notches"
      for (let i = 1; i < 55; i++) { const a = T.carved + (i - 1) * 0.022; notch(g, i, prog(t, a, a + 0.08), undefined, dy); }
    }
    typed(g, 'DOLNÍ VĚSTONICE · CZECH REPUBLIC', 190, 920, prog(t, T.czech, T.czech + 0.8), '500 20px "IBM Plex Mono"', E.dim);
    typed(g, 'WOLF BONE · 55 NOTCHES · ~30,000 YEARS', 190, 950, prog(t, T.thirty, T.thirty + 1.0), '500 20px "IBM Plex Mono"', E.dim);

    // L4–L5: ảnh xương Ishango THẬT — vào lúc "nineteen fifty", ra (trượt phải) trước câu 6
    const out = prog(t, T.l6 - 0.5, T.l6 + 0.1);
    if (t >= T.fifty - 0.1 && out < 1) {
      g.save(); g.translate(outCubic(out) * 900, 0);
      const ph = photo(g, 'ishango', 'bone', 1330, 330, 440, prog(t, T.fifty - 0.1, T.fifty + 0.35), { rot: 0.02 });
      // "grouped notches": ba ngoặc đánh dấu các nhóm vạch dọc cạnh ảnh
      [[0.18, 0.34], [0.4, 0.58], [0.62, 0.8]].forEach(([a, b], j) => {
        const x = 1330 + ph.w + 26, k = prog(t, T.grouped + j * 0.12, T.grouped + j * 0.12 + 0.2);
        hand(g, [[x - 10, 330 + a * 440], [x, 330 + a * 440], [x, 330 + b * 440], [x - 10, 330 + b * 440]], { w: 4, color: E.accent, jit: 1, seed: j + 3, k });
      });
      typed(g, 'Ishango bone', 1330, 852, prog(t, T.ishango, T.ishango + 0.5), 'italic 600 52px "Cormorant Garamond"', E.accent);
      typed(g, 'FOUND 1950 · CENTRAL AFRICA', 1330, 900, prog(t, T.africa, T.africa + 0.7), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, 'BABOON BONE · ~20,000 YEARS', 1330, 930, prog(t, T.twenty, T.twenty + 0.7), '500 20px "IBM Plex Mono"', E.dim);
      g.restore();
    }

    // L6: "biggest leap" — ba vạch đầu RỜI khỏi xương, bay lên thành ba vạch lớn
    if (t >= T.simple) {
      const br = prog(t, T.simple, T.simple + 0.3);
      hand(g, [[NOTCH[0] - 6, BONE.y + 52], [NOTCH[0] - 6, BONE.y + 60], [NOTCH[2] + 8, BONE.y + 60], [NOTCH[2] + 8, BONE.y + 52]], { w: 3, color: E.accent, jit: 1, seed: 21, k: br });
      const fly = prog(t, T.leap, T.leap + 0.8), f = outCubic(fly);
      for (let j = 0; j < 3; j++) {
        if (fly <= 0) break;
        const x0 = NOTCH[j], x = x0 + (MARKS[j] - x0) * f, yTop = BONE.y - 24 + (450 - (BONE.y - 24)) * f, len = 48 + (150 - 48) * f;
        hand(g, seg(x, yTop, x + 4 + 4 * f, yTop + len, 10), { w: 3.5 + 10.5 * f, color: fly < 1 ? E.accent : E.ink, jit: 1 + f, seed: j });
      }
    }

    // L7–L9: cừu (vật được đếm) — rồi ngày, trăng — mọi hàng nối vào CÙNG ba vạch
    const drop = outCubic(prog(t, T.pulling, T.stuff + 0.4));     // "pulling the idea away from the stuff"
    const rows = [['sheep', 430, T.things], ['sun', 540, T.days - 0.15], ['moon', 650, T.moons - 0.15]];
    rows.forEach(([kind, y, a], r) => {
      for (let i = 0; i < 3; i++) {
        const k = prog(t, a + i * 0.08, a + i * 0.08 + 0.3);
        // "three sheep" đọc hai lần: mỗi con nhún một nhịp như đang được đếm
        const nod = kind === 'sheep' ? [T.sheep1, T.sheep2].reduce((m, s) => m + Math.max(0, 1 - Math.abs(t - (s + 0.12 + i * 0.1)) / 0.12) * 0.15, 0) : 0;
        g.save(); g.translate(0, drop * (700 + i * 60 + r * 40)); g.rotate(drop * (hash(i + r * 3) - 0.5) * 0.6);
        icon(g, kind, 170 + i * 92, y, k, nod); g.restore();
      }
      const ka = r === 0 ? prog(t, T.counted, T.counted + 0.5) : prog(t, a + 0.3, a + 0.7);
      g.save(); g.translate(0, drop * 900); hand(g, [[460, y], [600, y], [700, 525]], { color: E.dim, w: 3, seed: y, k: ka }); g.restore();
    });
    typed(g, 'quantity', 760, 400, prog(t, T.quantity, T.quantity + 0.4), '500 22px "IBM Plex Mono"', E.dim);
    if (t >= T.same) { const p = prog(t, T.same, T.same + 0.25); for (let j = 0; j < 3; j++) hand(g, seg(MARKS[j] - 6, 444, MARKS[j] + 2, 606, 10), { w: 3, color: E.accent, jit: 2, seed: 40 + j, k: p }); }
    typed(g, 'three', 760, 670, prog(t, T.marks, T.marks + 0.35), 'italic 600 44px "Cormorant Garamond"', E.accent);
    // "the idea of number itself": khung quanh ba vạch — con số tách khỏi mọi vật
    const box = prog(t, T.number - 0.1, T.number + 0.5);
    if (box > 0) hand(g, [[722, 420], [890, 420], [890, 700], [722, 700], [722, 420]], { w: 4, color: E.accent, jit: 2, seed: 77, k: box });
    typed(g, 'NUMBER', 806, 735, prog(t, T.number, T.number + 0.4), '500 20px "IBM Plex Mono"', E.accent, { align: 'center' });
    // người dẫn đường: trầm tư từ "It sounds simple…", đổi sang giơ ba ngón đúng "three marks" (bật lại, không fade)
    if (t < T.marks - 0.1) figure(g, 'ponder', 1600, 1080, 800, 'bone', prog(t, T.l6 - 0.2, T.l6 + 0.15));
    else figure(g, 'three', 1580, 1080, 820, 'bone', 0.55 + 0.45 * prog(t, T.marks - 0.1, T.marks + 0.2));
    iris(g, W / 2, H / 2, prog(t, -3.0, -1.9));
  }
}
