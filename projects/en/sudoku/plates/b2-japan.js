// b2 · Not from Japan — gạch hiểu lầm (một trong hai chỗ kính NỨT, DNA §1).
// "from Japan" → ô kính lớn khắc "from Japan?"; "doesn't" → kính nứt, câu đúng khắc bên dưới; rồi cả ô thu lên góc.
// Bốn ô kính kể chuyện lắp vào theo từng câu: 1979 · trang "Number Place" (vẽ bằng code, kiểu chung) · Dell →
// Howard Garns, most likely → Nikoli · 1984 · sudoku → 2004 · London (báo in nhân lên).
import { W, H, C, prog, lookup, must, outCubic, clamp, hash, ground, window9, crack, it, label, num, sectionTag, D } from '../kit.js';

const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
/** Tấm kính trong khung chì (chữ nhật bất kỳ) — kit.pane chỉ vẽ ô vuông. */
function slab(g, x, y, w, h, k = 1) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 3);
  g.shadowColor = 'rgba(40,32,24,0.25)'; g.shadowBlur = 24; g.shadowOffsetX = 10; g.shadowOffsetY = 14;
  g.fillStyle = C.lead; rr(g, x - 10, y - 10, w + 20, h + 20, 12); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = C.clear; rr(g, x, y, w, h, 6); g.fill();
  const gr = g.createLinearGradient(x, y, x + w, y + h);
  gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(0.3, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(120,110,100,0.06)');
  g.fillStyle = gr; rr(g, x, y, w, h, 6); g.fill();
  g.strokeStyle = 'rgba(30,24,30,0.13)'; g.lineWidth = 3; rr(g, x + 2, y + 2, w - 4, h - 4, 5); g.stroke();
  g.restore();
}
/** Trang in vẽ bằng code (kiểu chung): giấy, dòng chữ giả, một lưới sudoku nhỏ. head = tiêu đề Plex hoặc null. */
function page(g, x, y, w, h, { head = null, headK = 1, seed = 1, k = 1, cols = 2, mast = false } = {}) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2);
  g.fillStyle = 'rgba(60,50,40,0.18)'; g.fillRect(x + 6, y + 8, w, h);
  g.fillStyle = '#FBF8F0'; g.fillRect(x, y, w, h); g.strokeStyle = 'rgba(60,50,40,0.35)'; g.lineWidth = 1.5; g.strokeRect(x, y, w, h);
  let yy = y + 18;
  if (mast) { g.fillStyle = '#3A3530'; g.fillRect(x + 16, yy, w - 32, 22); yy += 30; g.fillStyle = 'rgba(58,53,48,0.6)'; g.fillRect(x + 16, yy, w - 32, 3); yy += 14; }
  if (head) { g.restore(); label(g, head, x + w / 2, yy + 22, { size: 22, color: C.ink, align: 'center', k: Math.min(k, headK) }); g.save(); g.globalAlpha = clamp(k * 2); yy += 40; }
  // lưới nhỏ (đường kẻ in, vài số in làm gợi ý)
  const gs = Math.min(w - 40, h * 0.5), gx = x + (w - gs) / 2, gy = yy + 4, c = gs / 9;
  g.strokeStyle = '#3A3530';
  for (let i = 0; i <= 9; i++) { g.lineWidth = i % 3 ? 0.8 : 2; g.beginPath(); g.moveTo(gx + i * c, gy); g.lineTo(gx + i * c, gy + gs); g.moveTo(gx, gy + i * c); g.lineTo(gx + gs, gy + i * c); g.stroke(); }
  g.fillStyle = '#3A3530';
  for (let i = 0; i < 81; i++) if (hash(i * 1.9 + seed) < 0.3) g.fillRect(gx + (i % 9) * c + c * 0.36, gy + ((i / 9) | 0) * c + c * 0.25, c * 0.28, c * 0.5);
  // dòng chữ giả
  yy = gy + gs + 16; g.fillStyle = 'rgba(58,53,48,0.45)';
  const cw = (w - 32 - (cols - 1) * 12) / cols;
  for (let j = 0; yy + j * 11 < y + h - 14; j++) for (let q = 0; q < cols; q++) g.fillRect(x + 16 + q * (cw + 12), yy + j * 11, cw * (0.7 + 0.3 * hash(seed * 7 + j * 3 + q)), 4);
  g.restore();
}
/** Ê-ke + thước của kiến trúc sư, nét chì. */
function setSquare(g, cx, cy, s, k) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 2); g.strokeStyle = C.lead; g.lineJoin = 'round';
  const e = outCubic(clamp(k)); g.translate(cx, cy + (1 - e) * 30);
  g.lineWidth = 6; g.beginPath(); g.moveTo(-s * 0.5, s * 0.4); g.lineTo(s * 0.5, s * 0.4); g.lineTo(-s * 0.5, -s * 0.5); g.closePath(); g.stroke();
  g.lineWidth = 3; g.beginPath(); g.moveTo(-s * 0.36, s * 0.3); g.lineTo(s * 0.14, s * 0.3); g.lineTo(-s * 0.36, -s * 0.15); g.closePath(); g.stroke();
  g.fillStyle = 'rgba(44,45,51,0.08)'; g.fill();
  g.lineWidth = 4; g.strokeRect(-s * 0.56, s * 0.5, s * 1.12, s * 0.14);
  for (let i = 1; i < 12; i++) { g.lineWidth = 1.5; g.beginPath(); g.moveTo(-s * 0.56 + i * s * 0.0933, s * 0.5); g.lineTo(-s * 0.56 + i * s * 0.0933, s * 0.5 + (i % 2 ? 8 : 14)); g.stroke(); }
  g.restore();
}

const PW = 400, PH = 640, PY = 330, PX = i => 96 + i * 442;

export default class Japan {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      think: w(5, 'think'), from: w(5, 'from'), japan: w(5, 'japan'), name: w(5, 'name'), does: w(5, 'does'), doesnt: w(5, "doesn't"),
      it6: w(6, 'it'), first: w(6, 'first'), nineteen: w(6, 'nineteen'), y79: w(6, 'seventy-nine'), american: w(6, 'american'),
      magazine: w(6, 'magazine'), number: w(6, 'number'),
      setter: w(7, 'setter'), likely: w(7, 'likely'), howard: w(7, 'howard'), garns: w(7, 'garns'), retired: w(7, 'retired'), indiana: w(7, 'indiana'),
      japanese: w(8, 'japanese'), nikoli: w(8, 'nikoli'), picked: w(8, 'picked'), y84: w(8, 'eighty-four'), sudoku: w(8, 'sudoku'),
      became: w(9, 'became'), worldwide: w(9, 'worldwide'), four: w(9, 'four'), british: w(9, 'british'), newspapers: w(9, 'newspapers'),
      printing: w(9, 'printing'), end: L(9).end,
    };
    this.START = L(5).start;
    this.FROM = Math.max(this.START - 1.2, L(4).end + 0.5);
    must('1984 - 1979', 5); must('2004 - 1979', 25);                  // thứ tự năm trên dòng kể chuyện
  }
  sfx() {
    const T = this.T;
    return [{ t: T.doesnt, kind: 'error' }, { t: T.american, kind: 'chip' }, { t: T.garns, kind: 'pen' },
      { t: T.nikoli, kind: 'chip' }, { t: T.sudoku, kind: 'pen' }, { t: T.four, kind: 'chip' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    sectionTag(g, 'ACT I · NOT FROM JAPAN', prog(t, this.FROM + 0.3, this.FROM + 0.9));

    // ── hiểu lầm: ô kính lớn → nứt → thu lên góc trái trên ──
    const mv = outCubic(prog(t, T.it6 - 0.2, T.it6 + 0.7)), s = 1 - 0.5 * mv;
    const gx = 460 + (96 - 460) * mv, gy = 300 + (130 - 300) * mv;
    g.save(); g.translate(gx, gy); g.scale(s, s);
    slab(g, 0, 0, 1000, 240, prog(t, this.FROM + 0.3, this.FROM + 0.9));
    it(g, 'from Japan?', 500, 165, 120, C.ink, { align: 'center', k: prog(t, this.START - 0.2, T.japan + 0.4) });
    g.save(); rr(g, 0, 0, 1000, 240, 6); g.clip();
    crack(g, 690, 110, 600, 240, prog(t, T.doesnt - 0.05, T.doesnt + 0.3), 7);
    g.restore();
    it(g, 'the name is Japanese — the puzzle isn’t', 500, 330, 60, C.ink, { align: 'center', k: prog(t, T.doesnt + 0.1, T.doesnt + 0.9) });
    g.restore();

    // ── bốn ô kính kể chuyện ──
    const pane = (i, a) => { const k = prog(t, a - 0.2, a + 0.4), dy = (1 - outCubic(k)) * 120; return { k, x: PX(i), y: PY + dy }; };
    // 1 · 1979 · Number Place · Dell
    { const { k, x, y } = pane(0, T.first);
      if (k > 0) { g.save(); slab(g, x, y, PW, PH, k);
        num(g, '1979', x + 30, y + 90, 72, C.ink, { k: prog(t, T.nineteen, T.y79 + 0.3) });
        const pk = prog(t, T.american - 0.1, T.american + 0.5), drop = (1 - outCubic(pk)) * -60;
        page(g, x + 60, y + 128 + drop, 280, 350, { head: 'NUMBER PLACE', headK: prog(t, T.number - 0.1, T.number + 0.5), seed: 3, k: pk });   // tiêu đề in lúc "number place"
        label(g, 'Dell pencil puzzles', x + 30, y + 540, { k: prog(t, T.magazine, T.magazine + 0.5) });
        label(g, 'american magazine', x + 30, y + 580, { k: prog(t, T.magazine + 0.3, T.magazine + 0.8) });
        g.restore(); } }
    // 2 · Howard Garns · most likely
    { const { k, x, y } = pane(1, T.setter);
      if (k > 0) { slab(g, x, y, PW, PH, k);
        label(g, 'most likely', x + 30, y + 70, { k: prog(t, T.likely - 0.2, T.likely + 0.3) });
        it(g, 'Howard Garns', x + 30, y + 150, 60, C.ink, { k: prog(t, T.howard, T.garns + 0.5) });
        setSquare(g, x + PW / 2, y + 330, 220, prog(t, T.retired - 0.2, T.retired + 0.6));
        label(g, 'retired architect', x + 30, y + 540, { k: prog(t, T.retired, T.retired + 0.6) });
        label(g, 'Indiana', x + 30, y + 580, { k: prog(t, T.indiana, T.indiana + 0.4) }); } }
    // 3 · Nikoli · 1984 · sudoku
    { const { k, x, y } = pane(2, T.japanese);
      if (k > 0) { slab(g, x, y, PW, PH, k);
        label(g, 'Nikoli · Japan', x + 30, y + 60, { k: prog(t, T.nikoli - 0.1, T.nikoli + 0.5) });
        num(g, '1984', x + 30, y + 150, 72, C.ink, { k: prog(t, T.y84 - 0.2, T.y84 + 0.4) });
        const cs = 38, gx2 = x + (PW - 9 * cs) / 2, gy2 = y + 190;
        const kOf = (r, c) => prog(t, T.picked - 0.2 + (r + c) * 0.035, T.picked + 0.2 + (r + c) * 0.035);
        window9(g, gx2, gy2, cs, { kindOf: (r, c) => (kOf(r, c) > 0 ? 'clear' : 'empty'), kOf, shadow: false,
          digits: (r, c) => (hash((r * 9 + c) * 1.31 + 5) < 0.32 && kOf(r, c) >= 1 ? D(r, c) : null) });
        it(g, 'sudoku', x + PW / 2, y + 600, 60, C.ink, { align: 'center', k: prog(t, T.sudoku - 0.1, T.sudoku + 0.5) }); } }
    // 4 · 2004 · London · báo in nhân lên
    { const { k, x, y } = pane(3, T.became);
      if (k > 0) { slab(g, x, y, PW, PH, k);
        num(g, '2004', x + 30, y + 90, 72, C.ink, { k: prog(t, T.four - 0.3, T.four + 0.3) });
        const pk = prog(t, T.worldwide - 0.1, T.worldwide + 0.5);
        for (let j = 3; j >= 1; j--) {                                   // bản in thêm, xoè ra lúc "printing"
          const kj = outCubic(prog(t, T.newspapers + (3 - j) * 0.2, T.newspapers + 0.5 + (3 - j) * 0.2));
          if (kj <= 0) continue;
          g.save(); g.translate(x + 200, y + 300); g.rotate((j - 2) * 0.07 * kj + 0.04 * j * kj); g.translate(-140 + j * 10 * kj, -170 - j * 6 * kj);
          page(g, 0, 0, 280, 340, { seed: 20 + j, k: kj, cols: 3, mast: true }); g.restore();
        }
        page(g, x + 60, y + 130 + (1 - outCubic(pk)) * -60, 280, 340, { seed: 11, k: pk, cols: 3, mast: true });
        label(g, 'London', x + 30, y + 540, { k: prog(t, T.british - 0.1, T.british + 0.4) });
        label(g, 'british newspapers', x + 30, y + 580, { k: prog(t, T.newspapers, T.newspapers + 0.6) }); } }
  }
}
