// c4 · The shadow of a turn (p2 câu 42–49). CONTINUES từ c3: khung đầu = khung cuối c3 (vẽ lại đúng tờ c3 bằng chính
// hàm của nó, cùng camera). Rồi camera sang phải: trục thời gian, điểm xanh chạy đều quanh vòng compa, tường hatch, bóng
// trượt lên xuống, bóng vẽ theo thời gian thành sóng sin (π, 2π trên trục). Camera xuống vùng dưới tờ: con lắc
// (T = 2π√(L/g), góc nhỏ), sóng âm (hạt khí dồn/giãn + đường áp suất), cuộn dây quay giữa nam châm (dòng xoay chiều);
// "hidden turn" → vòng xanh nhỏ quay cùng nhịp trên mỗi hình; câu cuối viết dòng kết.
import { C, CG, PI, clamp, outCubic, smooth, prog, ground, card, typed, note, line, compassCircle, arc, arrowHead,
  ring, lookup, must } from '../kit.js';
import Radian, { O, R } from './c3-radian.js';

const WX = 1360, X0 = 1400, X1 = 2300, KP = 360 / (2 * PI);   // tường, trục thời gian (tờ giấy), px / rad
const CAM1 = [560, 60], Z = [560, 1160];                        // camera vùng 1 (vòng + sóng) · gốc vùng 2 (ba ví dụ)
const PX = [380, 960, 1540];                                    // tâm ba cột vùng 2 (toạ độ màn hình của vùng)

function hatchRect(g, x, y, w, h, gap = 10, color = 'rgba(91,95,99,0.6)') {
  if (w <= 0 || h <= 0) return;
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.strokeStyle = color; g.lineWidth = 1;
  for (let k = -h; k < w; k += gap) { g.beginPath(); g.moveTo(x + k, y + h); g.lineTo(x + k + h, y); g.stroke(); }
  g.restore();
}
const dot = (g, x, y, r, color) => { g.save(); g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore(); };
/** Chữ nhiều mảnh (màu/kiểu khác nhau) căn giữa tại x, viết vào theo k qua toàn chuỗi. */
function typedRun(g, parts, x, y, k) {
  const ws = parts.map(([s, font]) => { g.save(); g.font = font; const w = g.measureText(s).width; g.restore(); return w; });
  const n = parts.reduce((a, [s]) => a + s.length, 0); let left = Math.round(n * clamp(k)), cx = x - ws.reduce((a, b) => a + b, 0) / 2;
  parts.forEach(([s, font, color], i) => { if (left > 0) typed(g, s, cx, y, Math.min(1, left / s.length), font, color); left -= s.length; cx += ws[i]; });
  return { x0: x - ws.reduce((a, b) => a + b, 0) / 2, ws };
}

export default class Shadow {
  static ERA = 'vellum';
  static POSES = [];
  CONTINUES = true;
  init({ tl }) {
    this.base = new Radian(); this.base.init({ tl });
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      look: w(42, 'look'), places: w(42, 'places'), no: w(42, 'no'), all: w(42, 'all'),
      point: w(43, 'point'), running: w(43, 'running'), look2: w(43, 'look'), shadow: w(43, 'shadow'), wall: w(43, 'wall'),
      slides: w(44, 'slides'), trace: w(44, 'trace'), time: w(44, 'time'), wave: w(44, 'wave'), sine: w(44, 'sine'), end44: L(44).end,
      that: w(45, 'that'), pendulum: w(45, 'pendulum'), swings: w(45, 'swings'), small: w(45, 'small'), formula: w(45, 'formula'),
      two45: w(45, 'two'), end45: L(45).end,
      sound: w(46, 'sound'), pressure: w(46, 'pressure'), rising: w(46, 'rising'), rhythm: w(46, 'rhythm'),
      alternating: w(47, 'alternating'), current: w(47, 'current'), coil: w(47, 'coil'), spinning: w(47, 'spinning'),
      generator: w(47, 'generator'), end47: L(47).end,
      repeats: w(48, 'repeats'), hidden: w(48, 'hidden'), turn48: w(48, 'turn'), pi48: w(48, 'pi'), measure: w(48, 'measure'),
      circle49: w(49, 'circle'), see: w(49, 'see'), isnt: w(49, "isn't"), from: w(49, 'from'), end49: L(49).end,
    };
    this.START = L(42).start; this.FROM = this.START - 1.2;
    this.PAN2 = this.T.pendulum - 0.6;                      // camera xuống vùng ba ví dụ
    // điểm quay: đúng 3 vòng từ lúc hiện tới "trace" → bóng bắt đầu vẽ đúng ở pha 0 (gốc trục thời gian)
    this.OM = 3 * 2 * PI / (this.T.trace - this.T.point);
    this.OMP = 2 * PI / 2.2; this.OMS = 2 * PI / 1.2; this.OMC = 2 * PI / 1.6;   // con lắc · sóng âm · cuộn dây
    must('Math.abs(Math.sin(0.3) - 0.3) < 0.005', true);    // góc nhỏ: sin θ ≈ θ (θ0 = 0.3 rad) — "small swings"
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.places, kind: 'pen' }, { t: T.look2, kind: 'pen' }, { t: T.trace, kind: 'pen' }, { t: T.pendulum, kind: 'pen' },
      { t: T.formula, kind: 'tick' }, { t: T.pressure, kind: 'pen' }, { t: T.coil, kind: 'pen' }, { t: T.hidden, kind: 'shimmer' },
      { t: T.circle49, kind: 'tick' },
    ];
  }
  cam(t) {
    const b = this.base.cam(t), T = this.T;
    const e1 = smooth(prog(t, T.look, T.look + 2.2)), e2 = smooth(prog(t, this.PAN2, this.PAN2 + 1.0));
    const d = Math.min(40, 4 * Math.max(0, t - this.PAN2 - 1.0));
    return { x: b.x + (CAM1[0] - b.x) * e1 + d, y: b.y + (CAM1[1] - b.y) * e1 + (Z[1] - CAM1[1]) * e2 + d * 0.5 };
  }
  render(g, t) {
    const c = this.cam(t);
    ground(g, 'vellum', c.x, c.y);
    g.save(); g.translate(-c.x, -c.y);
    if (c.y < Z[1] - 200) { this.base.plate(g, t); this.shadow(g, t); }
    if (c.y > CAM1[1] + 200) { g.save(); g.translate(Z[0], Z[1]); this.zone2(g, t); g.restore(); }
    g.restore();
    this.card(g, t);
  }
  card(g, t) {                                              // khung tên: giữ nguyên của c3, rồi viết lại tên mục
    const T = this.T, k0 = prog(t, this.START, this.START + 0.35), k1 = prog(t, this.START + 0.4, this.START + 1.3);
    if (k0 <= 0) { this.base.card(g, t); return; }
    const x = 1824, y = 64, w = 420, h = 96;
    g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.fillStyle = 'rgba(239,232,214,0.92)'; g.fillRect(x - w, y, w, h); g.strokeRect(x - w, y, w, h);
    g.lineWidth = 1; g.beginPath(); g.moveTo(x - w + 120, y); g.lineTo(x - w + 120, y + h); g.moveTo(x - w + 120, y + 52); g.lineTo(x, y + 52); g.stroke(); g.restore();
    typed(g, 'PLATE', x - w + 60, y + 30, 1, `600 18px "Archivo"`, C.leadT, { align: 'center', ls: 3 });
    typed(g, 'II', x - w + 60, y + 80, 1, `600 46px ${CG}`, C.ink, { align: 'center' });
    if (k1 <= 0) {                                          // tên cũ lùi lại (xoá ngược), rồi tên mới viết vào
      typed(g, 'NOBODY CHOSE', x - w + 136, y + 38, 1 - k0, `700 26px "Archivo"`, C.ink, { ls: 2 });
      note(g, 'the radian · radius 1', x - w + 136, y + 82, 1 - k0, { size: 18 });
    } else {
      typed(g, "TURN'S SHADOW", x - w + 136, y + 38, k1 * 1.3, `700 26px "Archivo"`, C.ink, { ls: 2 });
      note(g, 'π without circles', x - w + 136, y + 82, k1 * 1.6 - 0.4, { size: 18 });
    }
  }
  /** Vùng 1 (toạ độ tờ c3): trục thời gian, điểm quay, tường, bóng, sóng sin. */
  shadow(g, t) {
    const T = this.T, cx = O[0], cy = O[1];
    // câu 42: trục thời gian chạy ra chỗ không có vòng tròn nào
    const ka = prog(t, T.places, T.places + 0.7);
    line(g, [[X0, cy], [X1, cy]], C.ink, 1.8, { k: ka });
    if (ka >= 1) arrowHead(g, X1 + 12, cy, 0, C.ink, 14);
    note(g, 'no circles out here', 1470, 905, prog(t, T.no - 0.1, T.all + 0.4), { size: 22 });
    // câu 43: tường (hatch chì) vẽ vào từ "look", điểm chạy đều quanh vòng
    const kw = prog(t, T.look2, T.wall + 0.2), top = cy - R - 40, hh = 2 * R + 80;
    line(g, [[WX, top], [WX, top + hh]], C.ink, 2.6, { k: kw });
    hatchRect(g, WX - 26, top, 26, hh * kw);
    note(g, 'wall', WX - 4, top - 14, prog(t, T.wall, T.wall + 0.3), { size: 20 });
    const ph = this.OM * (t - T.trace), px = cx + R * Math.cos(ph), py = cy - R * Math.sin(ph), kp = prog(t, T.point, T.point + 0.3);
    if (kp > 0) {
      line(g, [[cx, cy], [px, py]], C.ink, 1.6, { dash: [8, 6] });
      // bóng: chiếu ngang lên tường
      const ks = prog(t, T.shadow, T.shadow + 0.35);
      if (ks > 0) {
        line(g, [[px, py], [px + (WX - px) * ks, py]], C.blue, 1.6, { dash: [2, 7] });
        if (ks >= 1) { dot(g, WX, py, 9, C.ink); }
      }
      g.save(); g.fillStyle = C.paper; g.strokeStyle = C.blue; g.lineWidth = 4; g.beginPath(); g.arc(px, py, 13 * outCubic(kp), 0, 7); g.fill(); g.stroke(); g.restore();
      dot(g, px, py, 5 * kp, C.blue);
    }
    // câu 44: bóng trượt lên xuống (mũi tên đôi chì cạnh tường)
    const ku = prog(t, T.slides, T.slides + 0.5), ax = WX + 22;
    if (ku > 0) {
      line(g, [[ax, cy], [ax, cy - (R - 10) * ku]], C.leadT, 1.6); line(g, [[ax, cy], [ax, cy + (R - 10) * ku]], C.leadT, 1.6);
      if (ku >= 1) { arrowHead(g, ax, cy - R + 4, -PI / 2, C.leadT, 13); arrowHead(g, ax, cy + R - 4, PI / 2, C.leadT, 13); }
    }
    // vạch π, 2π trên trục
    [[PI, 'π', C.blue], [2 * PI, '2π', C.ink]].forEach(([a, s, col]) => {
      const x = X0 + a * KP, k = prog(t, T.time, T.time + 0.3);
      line(g, [[x, cy - 10], [x, cy + 10]], C.ink, 2, { k });
      line(g, [[x, cy - 14], [x, cy - R + 6]], C.lead, 1.1, { dash: [3, 6], k });   // nhãn ở trên đỉnh sóng, không đè nét sóng
      typed(g, s, x, cy - R - 16, k, `italic 700 46px ${CG}`, col, { align: 'center' });
    });
    note(g, 'time', X1, cy - 24, prog(t, T.time, T.time + 0.3), { size: 20, align: 'right' });
    // sóng: bóng ghi lại theo thời gian từ "trace" (đầu bút chạy theo bóng)
    const tt = t - T.trace;
    if (tt > 0) {
      const umax = Math.min(tt * this.OM, (X1 - 30 - X0) / KP), n = Math.max(2, Math.ceil(umax * 24));
      const pts = Array.from({ length: n + 1 }, (_, i) => { const u = umax * i / n; return [X0 + u * KP, cy - R * Math.sin(u)]; });
      line(g, pts, C.ink, 3.4);
      const tip = pts.at(-1);
      line(g, [[WX, py], [tip[0], tip[1]]], C.blue, 1.2, { dash: [2, 8] });
      dot(g, tip[0], tip[1], 6, C.ink);
    }
    note(g, 'a wave', 1470, 950, prog(t, T.wave, T.wave + 0.3), { color: C.ink, size: 24 });
    note(g, '· a sine wave', 1586, 950, prog(t, T.sine, T.sine + 0.5), { color: C.ink, size: 24 });
    note(g, '= one turn', X0 + 2 * PI * KP + 34, cy - R - 24, prog(t, T.sine + 0.2, T.end44 + 0.3), { color: C.blue, size: 20 });
  }
  /** Vùng 2 (toạ độ màn hình của vùng, gốc Z trên tờ): con lắc · sóng âm · cuộn dây máy phát. */
  zone2(g, t) {
    const T = this.T;
    // ── câu 45: con lắc, góc nhỏ, T = 2π√(L/g) ──
    {
      const cx = PX[0], top = 420, Lp = 300, th0 = 0.3, kc = prog(t, T.pendulum - 0.2, T.pendulum + 0.3);
      line(g, [[cx - 100, top], [cx + 100, top]], C.ink, 2.6, { k: kc }); hatchRect(g, cx - 100, top - 18, 200 * kc, 18);
      const amp = th0 * smooth(prog(t, T.swings - 0.2, T.swings + 0.7)), th = amp * Math.sin(this.OMP * (t - T.swings));
      const ks = prog(t, T.pendulum, T.pendulum + 0.5), bx = cx + Lp * Math.sin(th), by = top + Lp * Math.cos(th);
      line(g, [[cx, top], [cx + (bx - cx) * ks, top + (by - top) * ks]], C.ink, 2);
      if (ks >= 1) { dot(g, bx, by, 21, C.ink); dot(g, bx - 6, by - 6, 5, 'rgba(239,232,214,0.5)'); }
      arc(g, cx, top, Lp, -PI / 2 - th0, -PI / 2 + th0, C.lead, 1.4, prog(t, T.small, T.small + 0.5), { dash: [6, 6] });
      line(g, [[cx, top], [cx, top + Lp + 40]], C.lead, 1.2, { dash: [4, 6], k: prog(t, T.small, T.small + 0.4) });
      typed(g, 'L', cx - 34, top + 160, prog(t, T.formula, T.formula + 0.2), `italic 700 46px ${CG}`, C.ink, { align: 'center' });
      note(g, 'pendulum', cx, 870, prog(t, T.pendulum, T.pendulum + 0.4), { color: C.ink, size: 24, align: 'center' });
      note(g, 'small swings', cx, 906, prog(t, T.small, T.small + 0.5), { size: 20, align: 'center' });
      const F = `italic 700 46px ${CG}`;
      const run = typedRun(g, [['T =   ', F, C.ink], ['2π', F, C.blue], ['   √(L / g)', F, C.ink]], cx, 975, prog(t, T.formula, T.formula + 0.9));
      ring(g, run.x0 + run.ws[0] + run.ws[1] / 2, 960, 33, 28, prog(t, T.two45, T.two45 + 0.45));
    }
    // ── câu 46: sóng âm — hạt khí dồn/giãn, đường áp suất lên xuống ──
    {
      const x0 = 740, x1 = 1180, K = 2 * PI / 220, ph = this.OMS * (t - T.sound), kr = prog(t, T.sound - 0.1, T.pressure + 0.3);
      // loa nhỏ bên trái
      const kl = prog(t, T.sound - 0.2, T.sound + 0.2);
      line(g, [[700, 520], [716, 520], [716, 590], [700, 590], [700, 520]], C.ink, 2.4, { k: kl });
      line(g, [[716, 520], [732, 486], [732, 624], [716, 590]], C.ink, 2.4, { k: kl });
      for (let i = 0; i < 22; i++) {
        const xr = x0 + 12 + i * 20; if ((xr - x0) / (x1 - x0) > kr) break;
        const dx = 8 * Math.sin(K * (xr - x0) - ph);
        for (let j = 0; j < 8; j++) dot(g, xr + dx, 470 + j * 24, 3.4, C.ink);
      }
      const kpz = prog(t, T.pressure, T.rising + 0.4), yc = 735;
      line(g, [[x0, yc], [x1, yc]], C.lead, 1.2, { k: kpz });
      if (kpz > 0) {
        const n = 90, pts = Array.from({ length: n + 1 }, (_, i) => { const x = x0 + (x1 - x0) * kpz * i / n; return [x, yc + 42 * Math.cos(K * (x - x0) - ph)]; });
        line(g, pts, C.ink, 3);
      }
      note(g, 'sound wave', PX[1], 870, prog(t, T.sound, T.sound + 0.4), { color: C.ink, size: 24, align: 'center' });
      note(g, 'air pressure rising · falling', PX[1], 906, prog(t, T.pressure, T.rhythm + 0.3), { size: 20, align: 'center' });
    }
    // ── câu 47: cuộn dây quay giữa hai nam châm → dòng xoay chiều ──
    {
      const cx = PX[2], spin = smooth(prog(t, T.spinning - 0.2, T.spinning + 0.6));
      const psi = this.OMC * (t - T.spinning) * spin + 0.35, kc = prog(t, T.coil, T.coil + 0.5);
      const kg = prog(t, T.generator, T.generator + 0.4);
      [[1330, 'N'], [1686, 'S']].forEach(([x, s], i) => {
        if (kg <= 0) return;
        line(g, [[x, 470], [x + 64, 470], [x + 64, 650], [x, 650], [x, 470]], C.ink, 2.4, { k: kg });
        if (i === 0) hatchRect(g, x, 470, 64, 180 * kg, 10);
        typed(g, s, x + 32, 580, kg * 2 - 1, `600 46px ${CG}`, C.ink, { align: 'center' });
      });
      line(g, [[cx, 445], [cx, 690]], C.lead, 1.4, { k: kc });
      if (kc > 0) {
        for (let j = 0; j < 3; j++) {
          const hw = (106 - j * 7) * Math.cos(psi), y0 = 488 + j * 6, y1 = 632 - j * 6, col = Math.cos(psi) * Math.sin(psi) >= 0 ? C.ink : C.leadT;
          line(g, [[cx, y0], [cx + hw, y0], [cx + hw, y1], [cx - hw, y1], [cx - hw, y0], [cx, y0]], col, 2.4, { k: kc });
        }
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 2; g.beginPath(); g.arc(cx, 690, 9, 0, 7); g.stroke(); g.restore();
      }
      // dòng điện ra: vết ghi trượt (mới nhất ở phải)
      const ka = prog(t, T.alternating, T.current + 0.4), yo = 778, xl = 1330, xr = 1750;
      line(g, [[xl, yo], [xr, yo]], C.lead, 1.2, { k: ka });
      if (ka > 0) {
        const span = 2.4, n = 120, pts = Array.from({ length: n + 1 }, (_, i) => {
          const tp = t - span * (1 - i / n), sp = smooth(prog(tp, T.spinning - 0.2, T.spinning + 0.6));
          const ps = this.OMC * (tp - T.spinning) * sp + 0.35, emf = tp < T.spinning - 0.2 ? 0 : Math.sin(ps) * sp;
          return [xl + (xr - xl) * i / n, yo - 38 * emf];
        });
        line(g, pts, C.ink, 3, { k: ka });
      }
      note(g, 'alternating current', cx, 870, prog(t, T.alternating, T.current + 0.4), { color: C.ink, size: 24, align: 'center' });
      note(g, 'a coil spinning in a generator', cx, 906, prog(t, T.coil, T.generator + 0.5), { size: 20, align: 'center' });
    }
    // ── câu 48: phía sau mỗi thứ lặp lại là một vòng quay ẩn — vòng xanh nhỏ quay cùng nhịp ──
    const phases = [this.OMP * (t - T.swings), this.OMS * (t - T.sound), this.OMC * (t - T.spinning) + 0.35];
    PX.forEach((cx, i) => {
      const a = T.hidden + i * 0.25, k = prog(t, a, a + 0.7), cy = 330, r = 44;
      if (k <= 0) return;
      compassCircle(g, cx, cy, r, { k, w: 3, a0: 0 });
      dot(g, cx, cy, 3, C.ink);
      if (k >= 1) {
        const ph = phases[i], qx = cx + r * Math.cos(ph), qy = cy - r * Math.sin(ph);
        line(g, [[cx, cy], [qx, qy]], C.ink, 1.4); dot(g, qx, qy, 7, C.blue);
      }
      note(g, 'hidden turn', cx, 266, prog(t, a + 0.1, a + 0.6), { size: 18, align: 'center' });
      typed(g, '2π', cx + 66, 346, prog(t, T.pi48 + i * 0.2, T.pi48 + i * 0.2 + 0.25), `italic 700 46px ${CG}`, C.blue);
    });
    note(g, 'one turn per cycle', PX[1] + 66, 380, prog(t, T.measure - 0.2, T.measure + 0.6), { size: 18, color: C.blue });
    // ── câu 49: dòng kết ──
    typed(g, 'The circle is just the easiest picture of a turn to see.', 140, 176, prog(t, T.circle49 - 0.1, T.see + 0.3),
      `italic 600 44px ${CG}`, C.ink);
    note(g, "it isn't where π comes from", 140, 222, prog(t, T.isnt, T.from), { color: C.blue, size: 24 });
  }
}
