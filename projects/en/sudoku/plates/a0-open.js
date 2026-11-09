// a0 · Cold open (p1, câu 0–10). DNA: ô cửa lưới đã giải trong bóng tối, ánh sáng bật dần; vòng 16 ô quanh khối giữa
// lắp kính đỏ, 4 góc 2×2 lắp kính xanh; chip bay ra thành hai dãy (lộn xộn = "not the same pattern") rồi tự sắp lại khớp
// từng số ("the same collection"); "a coincidence?" khắc rồi bị gạch bằng nét chì (KHÔNG nứt — kính nứt chỉ ở b2, f1);
// mascot `ponder` nói quanh chữ "coincidence"; ô cửa rời khung, ba ô kính tròn 1·2·3 khắc ba câu hỏi; "one rule" = một
// dải 9 ô kính 1–9; câu treo → ánh sáng tắt về ĐEN KÍN đúng hết câu cuối + tail (sau đó là intro 3D, từ đen).
import { W, H, C, prog, lookup, must, outCubic, ground, dark, window9, outline, chip, pane, it, label, num, figure,
  sectionTag, roundel, RING, CORNERS, boxOf, D, sortedDigits, cage, arrow, renban, CAGES, ARROWS, RENBAN } from '../kit.js';

// ── ba câu hỏi (g2-together vẽ lại ĐÚNG như thế này: cùng roundel, cùng chữ, cùng toạ độ) ──
const QX = [480, 960, 1440], QY = 320, QR = 130;
const QUESTIONS = [['Why does the', 'hidden ring exist?'], ['How far does the trick go?', 'What does it have', 'to do with algebra?'],
  ['How few clues', 'can a sudoku have?', 'How do you prove', 'one fewer is impossible?']];
/** Một ô kính tròn + các dòng câu hỏi (dòng thứ i lộ theo kl(i)). roundel() của kit chỉ khắc trọn 2 dòng đầu khi k = 1. */
function question(g, i, k, kl, m = 0) {
  roundel(g, QX[i], QY, QR, i + 1, [], k);
  if (m > 0) medallion(g, i, m);
  QUESTIONS[i].forEach((s, j) => it(g, s, QX[i], QY + QR + 60 + j * 42, 36, C.ink, { align: 'center', k: kl(j) }));
}
// ── HÉ HÌNH (PACKAGING §3 "dồn chất lượng lên đầu", Jenga): mỗi ô tròn mở như mống mắt ra một ô cửa nhỏ đúng câu hỏi
// đó — (1) vòng đỏ + 4 góc xanh, (2) câu đố Difference of Squares (lồng x² xanh, y² + x + y đỏ, mũi tên, đường tím),
// (3) ô cửa thưa 16 gợi ý + "16?". Số câu thành huy hiệu nhỏ góc phải trên. Không chữ số trong ô (cỡ chữ ngoài FONTS).
const MCS = 20, CLUE16 = [[0, 0], [0, 2], [0, 3], [1, 2], [1, 6], [2, 0], [3, 2], [3, 7], [3, 8], [4, 7], [5, 0], [5, 2], [6, 8], [7, 0], [7, 1], [7, 3]];
const inCells = (cells, r, c) => cells.some(([a, b]) => a === r && b === c);
const cageKind = (r, c) => { for (const k of CAGES) if (k.set && inCells(k.ce, r, c)) return k.set; return 'clear'; };
/** Ô cửa thu nhỏ PHẲNG (window9 ở cỡ này thành toàn chì): ô tô kín, khe chì 1.5 px, khe khối 3 px. */
const FILL = { clear: C.clear, red: C.red, blue: C.blue, empty: '#B3AA9B' };
function mini(g, X, Y, cs, kindOf) {
  const N = 9 * cs; g.fillStyle = C.lead; g.fillRect(X - 3, Y - 3, N + 6, N + 6);
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const l = c % 3 ? 0.75 : 1.5, tp = r % 3 ? 0.75 : 1.5, rg = (c + 1) % 3 ? 0.75 : 1.5, bt = (r + 1) % 3 ? 0.75 : 1.5;
    g.fillStyle = FILL[kindOf(r, c)]; g.fillRect(X + c * cs + l, Y + r * cs + tp, cs - l - rg, cs - tp - bt);
  }
  return { X, Y, cs, N, ctr: (r, c) => [X + c * cs + cs / 2, Y + r * cs + cs / 2] };
}
function medallion(g, i, m) {
  const cx = QX[i], cy = QY, gx = cx - 4.5 * MCS, gy = cy - 4.5 * MCS;
  g.save(); g.beginPath(); g.arc(cx, cy, (QR - 2) * outCubic(m), 0, 7); g.clip();
  g.fillStyle = C.wall; g.fillRect(cx - QR, cy - QR, 2 * QR, 2 * QR);
  if (i === 0) mini(g, gx, gy, MCS, (r, c) => (inCells(RING, r, c) ? 'red' : inCells(CORNERS, r, c) ? 'blue' : 'clear'));
  if (i === 1) {
    const P = mini(g, gx, gy, MCS, cageKind);
    RENBAN.forEach(l => renban(g, P, l)); ARROWS.forEach(a => arrow(g, P, a, { w: 1.6 })); CAGES.forEach(k => cage(g, P, k.ce, { d: 2.5 }));
  }
  if (i === 2) {
    mini(g, gx, gy, MCS, (r, c) => (inCells(CLUE16, r, c) ? 'clear' : 'empty'));
    g.fillStyle = C.clear; g.beginPath(); g.roundRect(cx - 62, cy - 34, 124, 68, 10); g.fill();
    num(g, '16?', cx, cy + 21, 60, C.redT, { align: 'center' });
  }
  g.restore();
  // huy hiệu số câu (ô tròn chì nhỏ, góc phải trên)
  const bx = cx + QR * 0.95, by = cy - QR * 0.95, br = 30 * outCubic(m);
  g.fillStyle = C.lead; g.beginPath(); g.arc(bx, by, br + 4, 0, 7); g.fill();
  g.fillStyle = C.clear; g.beginPath(); g.arc(bx, by, br, 0, 7); g.fill();
  if (m > 0.6) num(g, i + 1, bx, by + 13, 36, C.digit, { align: 'center' });
}

const GX = 712, GY = 132, CS = 80;
const ang = ([r, c]) => (Math.atan2(r - 4, c - 4) + Math.PI * 1.25) % (Math.PI * 2);
const RING_CW = RING.slice().sort((a, b) => ang(a) - ang(b));                 // lắp quanh vòng theo chiều kim đồng hồ
const CORN_ORD = CORNERS.slice().sort((a, b) => boxOf(...a) - boxOf(...b) || a[0] - b[0] || a[1] - b[1]);
const ringIdx = new Map(RING_CW.map(([r, c], i) => [r * 9 + c, i])), cornIdx = new Map(CORN_ORD.map(([r, c], i) => [r * 9 + c, i]));
// chip: bay ra theo thứ tự đọc (lộn xộn), rồi sắp lại; rank = vị trí sau khi sắp
const rankOf = cells => { const v = cells.map(([r, c]) => D(r, c)), o = v.map((x, i) => i).sort((a, b) => v[a] - v[b] || a - b), rk = [];
  o.forEach((i, p) => { rk[i] = p; }); return { v, rk }; };
const RCH = rankOf(RING), CCH = rankOf(CORNERS);

export default class Open {
  static ERA = 'glass';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    this.T = {
      finished: w(0, 'finished'), sixteen: w(1, 'sixteen'), ring: w(1, 'ring'), middle: w(1, 'middle'),
      four: w(2, 'four'), corners: w(2, 'corners'), sixteen2: w(2, 'sixteen'),
      groups: w(3, 'groups'), same: w(3, 'same'),
      pattern: w(4, 'pattern'), collection: w(4, 'collection'), every: w(4, 'every', 2), made: w(4, 'made'), end4: L(4).end,
      sounds: w(5, 'sounds'), coinc: w(5, 'coincidence'), isnt: w(5, "isn't"), minute: w(5, 'minute'), end5: L(5).end,
      so: w(6, 'so'),
      q1: [w(7, 'why'), L(7).end], q2: [w(8, 'how'), w(8, 'algebra') + 0.3], q3: [w(9, 'how'), w(9, 'impossible') + 0.35],
      one: w(10, 'one'), rule: w(10, 'rule'), end: L(10).end,
    };
    this.START = L(0).start;
    this.FROM = -0.5;                                  // lead p1 0.6: trang mở trong bóng tối
    this.TAIL = 1.0;                                   // build.json p1 tail — đen kín đúng hết câu cuối + tail
    must(`'${sortedDigits(RING).join('')}' === '${sortedDigits(CORNERS).join('')}'`, true);
    must(`${RING.length} === 16 && ${CORNERS.length} === 16`, true);
  }
  sfx() {
    const T = this.T;
    return [{ t: T.ring, kind: 'chip' }, { t: T.corners, kind: 'chip' },
      ...RING.map((_, i) => ({ t: T.groups + i * 0.06, kind: 'tick', db: -6 })).filter((_, i) => i % 4 === 0),
      { t: T.collection + 0.95, kind: 'correct' }, { t: T.coinc, kind: 'pen' }, { t: T.so + 0.3, kind: 'chip' },
      { t: T.q1[1], kind: 'pen' }, { t: T.q2[1] - 0.3, kind: 'pen' }, { t: T.q3[1] - 0.35, kind: 'pen' }, { t: T.rule, kind: 'chip' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'THE HIDDEN MATH INSIDE EVERY SUDOKU', prog(t, this.FROM + 0.3, this.FROM + 1.2));

    // ── ô cửa + chip: rời khung lên trên lúc "so in this video" ──
    const out = outCubic(prog(t, T.so - 0.1, T.so + 0.75)), gy = -1100 * out;
    if (out < 1) {
      g.save(); g.translate(0, gy);
      // camera lùi chậm đều 1.07 → 1 tới lúc chip bay (vòng màu có sẵn từ khung đầu nên 12 s đầu cần chuyển động riêng)
      const zs = 1 + 0.07 * (1 - prog(t, this.FROM, T.groups - 0.3)), zc = [GX + 4.5 * CS, GY + 4.5 * CS];
      g.translate(zc[0] * (1 - zs), zc[1] * (1 - zs)); g.scale(zs, zs);
      const kRing = (r, c) => prog(t, T.sixteen + ringIdx.get(r * 9 + c) * 0.07, T.sixteen + ringIdx.get(r * 9 + c) * 0.07 + 0.35);
      const kCorn = (r, c) => prog(t, T.four + cornIdx.get(r * 9 + c) * 0.09, T.four + cornIdx.get(r * 9 + c) * 0.09 + 0.35);
      // 5 giây đầu xem KHÔNG tiếng (PACKAGING §3): vòng đỏ + 4 góc xanh đã lắp sẵn từ khung đầu; lúc lời gọi tên, từng ô
      // lắp LẠI một nhịp (kính nảy) theo chiều kim đồng hồ — vẫn là chuyển động theo lời.
      const bump = k => (k > 0 && k < 1 ? Math.max(0.55, k) : 1);
      const st = (r, c) => {
        if (ringIdx.has(r * 9 + c)) return ['red', bump(kRing(r, c))];
        if (cornIdx.has(r * 9 + c)) return ['blue', bump(kCorn(r, c))];
        return ['clear', 1];
      };
      const P = window9(g, GX, GY, CS, { kindOf: (r, c) => st(r, c)[0], kOf: (r, c) => st(r, c)[1] });
      // vệt nắng trôi chéo qua ô kính (không tính là chuyển động nội dung)
      g.save(); g.beginPath(); g.rect(GX, GY, P.N, P.N); g.clip();
      const bx = GX - 500 + ((t + 0.5) * 34) % (P.N + 900);
      const gr = g.createLinearGradient(bx, GY, bx + 360, GY + 240);
      gr.addColorStop(0, 'rgba(255,250,236,0)'); gr.addColorStop(0.5, 'rgba(255,250,236,0.16)'); gr.addColorStop(1, 'rgba(255,250,236,0)');
      g.fillStyle = gr; g.fillRect(GX, GY, P.N, P.N); g.restore();
      // "around the middle box": viền trung tính quanh khối 5
      const box5 = []; for (let r = 3; r < 6; r++) for (let c = 3; c < 6; c++) box5.push([r, c]);
      outline(g, P, box5, C.ink, prog(t, T.middle, T.middle + 0.4), 4);
      outline(g, P, RING, C.redT, prog(t, T.ring + 0.2, T.ring + 0.6), 5);
      outline(g, P, CORNERS, C.blueT, prog(t, T.corners + 0.2, T.corners + 0.6), 5);

      // hai dãy chip: bay ra từ ô (thứ tự đọc) → sắp lại ("collection")
      const cx0 = 1542, cx1 = 1714, cs = 42, top = 166, pitch = 52;
      const kl = prog(t, T.groups - 0.3, T.groups);
      label(g, 'ring', cx0 + cs / 2, 150, { color: C.redT, align: 'center', k: kl });
      label(g, 'corners', cx1 + cs / 2, 150, { color: C.blueT, align: 'center', k: kl });
      const srt = outCubic(prog(t, T.collection, T.collection + 0.9));
      const fly = (cells, ch, x, kind, side) => cells.forEach(([r, c], i) => {
        const f = outCubic(prog(t, T.groups + i * 0.06, T.groups + i * 0.06 + 0.5));
        if (f <= 0) return;
        const [sx, sy] = P.ctr(r, c), yu = top + i * pitch, ys = top + ch.rk[i] * pitch;
        const tx = x + side * 46 * Math.sin(Math.PI * srt), ty = yu + (ys - yu) * srt;
        const px = sx - cs / 2 + (tx - sx + cs / 2) * f, py = sy - cs / 2 + (ty - sy + cs / 2) * f;
        chip(g, px, py, cs, kind, ch.v[i], Math.min(1, f * 3));
      });
      fly(RING, RCH, cx0, 'red', -1); fly(CORNERS, CCH, cx1, 'blue', 1);
      const ke = prog(t, T.collection + 0.85, T.collection + 1.2);
      if (ke > 0) for (let i = 0; i < 16; i++) it(g, '=', (cx0 + cs + cx1) / 2, top + i * pitch + cs * 0.75, 36, C.dim, { align: 'center', k: ke });
      g.restore();
    }

    // ── trái, nhóm 1 (câu 1–4): tên hai nhóm, "not the same pattern / the same collection" → trượt ra trái trước câu 5 ──
    const o1 = outCubic(prog(t, T.end4 + 0.15, T.end4 + 0.75));
    if (o1 < 1) {
      g.save(); g.translate(-760 * o1, 0);
      it(g, 'the ring', 96, 250, 60, C.redT, { k: prog(t, T.ring, T.ring + 0.5) });
      label(g, '16 cells around the middle box', 96, 292, { k: prog(t, T.middle, T.middle + 0.6) });
      it(g, 'the corners', 96, 390, 60, C.blueT, { k: prog(t, T.corners, T.corners + 0.5) });
      label(g, '16 cells too', 96, 432, { k: prog(t, T.sixteen2, T.sixteen2 + 0.5) });
      label(g, 'not the same pattern', 96, 530, { k: prog(t, T.pattern - 0.1, T.pattern + 0.5) });
      it(g, 'the same collection', 96, 600, 52, C.ink, { k: prog(t, T.collection, T.collection + 0.6) });
      it(g, 'in every sudoku ever made', 96, 656, 36, C.dim, { k: prog(t, T.every, T.made + 0.2) });
      g.restore();
    }

    // ── trái, nhóm 2 (câu 5): "a coincidence?" khắc → gạch nét chì → "it isn't." + mascot ponder ──
    const o2 = outCubic(prog(t, T.so - 0.1, T.so + 0.6));
    if (o2 < 1) {
      g.save(); g.translate(-760 * o2, 0);
      const wq = it(g, 'a coincidence?', 96, 260, 72, C.ink, { k: prog(t, T.coinc, T.coinc + 0.7) });
      const ks = prog(t, T.isnt, T.isnt + 0.35);
      if (ks > 0) { g.save(); g.strokeStyle = C.lead; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
        g.moveTo(90, 238); g.lineTo(90 + (wq + 12) * ks, 232); g.stroke(); g.restore(); }
      it(g, 'it isn’t.', 96, 350, 60, C.ink, { k: prog(t, T.isnt + 0.1, T.isnt + 0.6) });
      label(g, 'the reason: about one minute', 96, 410, { k: prog(t, T.minute - 0.4, T.minute + 0.4) });
      g.restore();
    }
    // mascot ponder (khung giữa đùi, trái, chân chạm đáy): trồi lên trước "coincidence", trượt xuống lúc ô cửa rời khung
    const kin = outCubic(prog(t, T.sounds - 0.5, T.sounds + 0.1)), kout = outCubic(prog(t, T.so - 0.1, T.so + 0.6));
    if (kin > 0 && kout < 1) {
      g.save(); g.translate(0, (1 - kin) * 640 + kout * 640);
      figure(g, 'ponder', 280, H, 600, 1, { t });
      g.restore();
    }

    // ── ba ô kính tròn 1·2·3 trồi lên khi ô cửa đi; mỗi câu hỏi khắc theo lời ──
    const qs = [T.q1, T.q2, T.q3];
    for (let i = 0; i < 3; i++) {
      const k = prog(t, T.so + 0.2 + i * 0.15, T.so + 0.8 + i * 0.15);   // trồi lên ngay khi ô cửa rời đi
      const [a, b] = qs[i], n = QUESTIONS[i].length;
      question(g, i, k, j => prog(t, a + (b - a) * j / n, a + (b - a) * (j + 1) / n), prog(t, a - 0.2, a + 0.5));
    }

    // ── "the one rule you already know": một dải 9 ô kính 1–9 ──
    it(g, 'the one rule you already know.', W / 2, 800, 44, C.ink, { align: 'center', k: prog(t, T.one, T.end - 0.2) });
    const sx0 = W / 2 - 270, sy0 = 860, sc = 60;
    const kb = prog(t, T.rule - 0.1, T.rule + 0.2);
    if (kb > 0) { const wb = (9 * sc + 16) * outCubic(kb); g.fillStyle = C.lead; g.fillRect(W / 2 - wb / 2, sy0 - 8, wb, sc + 16); }   // khung chì mở ra từ giữa
    for (let d = 1; d <= 9; d++) {
      const k = prog(t, T.rule + (d - 1) * 0.05, T.rule + (d - 1) * 0.05 + 0.35);
      if (k <= 0) continue;
      pane(g, sx0 + (d - 1) * sc + 3, sy0 + 3, sc - 6, 'clear', d * 7, k);
      if (k > 0.6) num(g, d, sx0 + (d - 1) * sc + sc / 2, sy0 + sc / 2 + 13, 36, C.digit, { align: 'center' });
    }

    // ── ánh sáng: bật dần từ bóng tối (câu 0), tắt về đen kín đúng hết câu cuối + tail ──
    const up = 0.35 + 0.65 * outCubic(prog(t, this.FROM, this.FROM + 1.0));   // sáng gần hẳn trước giây 1 (khung xem trước)
    const down = 1 - prog(t, T.end - 0.25, T.end + this.TAIL - 0.15);
    dark(g, Math.min(up, down));
  }
}
