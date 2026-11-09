// b1 · Point, line, plane — MỞ HỒI I (mở từ đen sau intro: đèn bật trên thẻ hồi "Three bricks · ANSWERS 1").
// Ba viên gạch bìa POINT · LINE · PLANE → mặt bàn → mặt hồ lặng → kéo giãn vô tận (mép mờ), mỏng "NO THICKNESS" →
// co lại thành hình bình hành vẽ mực + "P" → "never defined in words" → điểm nằm trên đường, đường nằm trong mặt → "Axioms".
import { W, H, C, prog, lookup, outCubic, outBack, smooth, clamp, ground, pool, camLerp, sheet, thread, dot3, shadow,
  solid, box, lamp, dark, line, poly, rgb, it, label, sectionTag, actCard, quad, shadowPt, add, sub, mul, lerp3 } from '../kit.js';

const LT = [1.5, 2.5, 9];                       // đèn của cảnh (toạ độ thế giới) — mọi bóng
const LAMP_X = 1250, LAMP_Y = 150;              // đèn vẽ ở mép trên
const CAMB = { yaw: -28, pitch: 26, dist: 10, target: [0, 0, 0.45], cx: 1200, cy: 600 };   // ba viên gạch
const CAMS = { yaw: -30, pitch: 30, dist: 11, target: [0, 0, 0.5], cx: 1240, cy: 600 };    // mặt bàn / mặt hồ
const CAMD = { yaw: -22, pitch: 36, dist: 10.5, target: [0.4, 0, 0.3], cx: 1250, cy: 640 }; // điểm · đường · mặt
const BRICK = box(1.5, 1.0, 0.75), BX = [-2.3, 0, 2.3], NAMES = ['point', 'line', 'plane'];
const ZT = 1.1, ZL = 0.25;                      // cao mặt bàn, cao mặt hồ

// bóng mềm của một chấm / một sợi chỉ (cam đất nhạt — bóng vật, không phải hình chiếu đang nói tới)
function dotShadow(g, cam, p, k = 1) {
  if (k <= 0) return; const q = cam.P(shadowPt(p, LT));
  g.save(); g.fillStyle = `rgba(150,74,38,${0.22 * clamp(k)})`; g.beginPath(); g.ellipse(q[0], q[1], 13, 6, 0, 0, 7); g.fill(); g.restore();
}
function threadShadow(g, cam, a, b, k = 1) {
  if (k <= 0) return; line(g, cam.P(shadowPt(a, LT)), cam.P(shadowPt(b, LT)), 'rgba(150,74,38,0.2)', 7, [], k);
}
// tờ bìa kéo giãn: tô trong đa giác bằng dải mờ dần ra mép (mặt phẳng "không có mép")
function fadeSheet(g, cam, corners, center, r0, r1) {
  const cs = corners.map(cam.P), c = cam.P(center);
  g.save(); poly(g, cs); g.clip();
  const gr = g.createRadialGradient(c[0], c[1], r0, c[0], c[1], r1);
  gr.addColorStop(0, rgb(C.card, 1, 1)); gr.addColorStop(0.6, rgb(C.card, 1, 0.75)); gr.addColorStop(1, rgb(C.card, 1, 0));
  g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
}
function arrow(g, a, b, color, w, k) {
  if (k <= 0) return; const e = [a[0] + (b[0] - a[0]) * clamp(k), a[1] + (b[1] - a[1]) * clamp(k)];
  line(g, a, e, color, w); const an = Math.atan2(e[1] - a[1], e[0] - a[0]);
  g.save(); g.fillStyle = color; g.beginPath(); g.moveTo(e[0] + 6 * Math.cos(an), e[1] + 6 * Math.sin(an));
  g.lineTo(e[0] - 18 * Math.cos(an) + 10 * Math.sin(an), e[1] - 18 * Math.sin(an) - 10 * Math.cos(an));
  g.lineTo(e[0] - 18 * Math.cos(an) - 10 * Math.sin(an), e[1] - 18 * Math.sin(an) + 10 * Math.cos(an)); g.closePath(); g.fill(); g.restore();
}
// lưới mực trên mặt phẳng đã kéo giãn: đậm ở giữa, nhạt dần ra xa (mặt phẳng không có mép)
function grid(g, cam, c, k) {
  const R = 6.5, st = 0.8;
  for (let a = -R; a <= R + 1e-9; a += st) for (const ax of [0, 1]) for (let b = -R; b < R - 1e-9; b += 0.5) {
    const m = [ax ? a : b + 0.25, ax ? b + 0.25 : a], dd = Math.hypot(m[0] / 1.3, m[1]) / R, al = 0.32 * k * Math.max(0, 1 - dd) ** 1.5;
    if (al < 0.01) continue;
    const p = ax ? [[a, b], [a, b + 0.5]] : [[b, a], [b + 0.5, a]];
    line(g, cam.P(add(c, [p[0][0], p[0][1], 0.01])), cam.P(add(c, [p[1][0], p[1][1], 0.01])), C.inkA(al), 1.5);
  }
}
// vẽ dần chu vi đa giác màn hình (bút mực)
function trace(g, pts, color, w, k) {
  if (k <= 0) return; const n = pts.length, seg = clamp(k) * n;
  for (let i = 0; i < n; i++) { const u = clamp(seg - i); if (u <= 0) break; line(g, pts[i], pts[(i + 1) % n], color, w, [], u); }
}

export default class Bricks {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      found: w(0, 'foundation', 1), point: w(0, 'point'), line: w(0, 'line'), plane: w(0, 'plane'),
      pts1: w(1, 'points'), flat1: w(1, 'flat'), nw: w(1, 'new'), plane1: w(1, 'plane'),
      pic: L(2).start, table: w(2, 'table'), surface: w(2, 'surface'), still: w(2, 'still'), lake: w(2, 'lake'),
      stretch: w(3, 'stretch'), forever: w(3, 'forever'), every: w(3, 'every'), dir: w(3, 'direction'),
      make: w(3, 'make'), thin: w(3, 'thin'), no: w(3, 'no'), thick: w(3, 'thickness'),
      paper: w(4, 'paper'), draw: w(4, 'draw'), slanted: w(4, 'slanted'), para: w(4, 'parallelogram'), letter: w(4, 'letter'), p: w(4, 'p'),
      part: w(5, 'part'), interest: w(5, 'interesting'), never: w(5, 'never'), defines: w(5, 'defines'), these: w(5, 'these'),
      ideas: w(5, 'ideas'), words: w(5, 'words'),
      describes: w(6, 'describes'), behave: w(6, 'behave'), props: w(6, 'properties'), accept: w(6, 'accept'), axioms: w(6, 'axioms'),
      end: L(6).end,
    };
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                   // cảnh đầu p2: mở hồi, từ đen
  }
  sfx() {
    const T = this.T;
    return [{ t: this.START - 2.3, kind: 'shimmer' }, { t: T.found + 0.1, kind: 'flap' }, { t: T.table, kind: 'flap' },
      { t: T.draw, kind: 'pen' }, { t: T.axioms + 0.15, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g);
    const on = prog(t, S - 2.55, S - 2.25);                       // đèn bật (mở từ đen)
    // camera: gạch → mặt bàn → bộ ba; trôi rất chậm (lắc ≤ 0.4°/s)
    const sway = 3 * Math.sin((t - S) * 0.12);
    const u1 = smooth(prog(t, T.pic - 0.2, T.table + 0.2)), u2 = smooth(prog(t, T.interest - 0.3, T.part + 0.5));
    const cp = lerpCam(lerpCam(CAMB, CAMS, u1), CAMD, u2), camera = camLerp({ ...cp, yaw: cp.yaw + sway }, cp, 0);
    const P = camera.P;

    // vũng sáng đèn trên bàn
    if (on > 0) { g.save(); g.globalAlpha = on; pool(g, 1180, 640, 820, 0.35); g.restore(); }

    // ── 1. ba viên gạch (câu 0–1), trượt ra trái khi sang mặt bàn ──
    const out1 = smooth(prog(t, T.pic - 0.3, T.pic + 0.7));
    if (t >= T.found && out1 < 1) {
      const dx = -11 * out1;
      const items = BX.map((x, i) => {
        const kz = outBack(prog(t, T.found + 0.15 * i, T.found + 0.15 * i + 0.6));
        const lift = i === 2 ? 0.45 * outBack(prog(t, T.nw, T.nw + 0.5)) : 0;
        const dim = i < 2 ? 1 - 0.55 * smooth(prog(t, T.flat1, T.flat1 + 0.6)) : 1;
        const V = BRICK.V.map(v => [v[0] - 0.75 + x + dx, v[1] - 0.5, Math.max(0.02, v[2] * kz) + lift]);
        return { x: x + dx, kz, lift, dim, V, top: 0.75 * kz + lift };
      });
      items.forEach(o => { if (o.kz > 0) shadow(g, camera, o.V, LT, { a: 0.4 * clamp(o.kz) * o.dim }); });
      items.forEach((o, i) => {
        if (o.kz <= 0) return;
        g.save(); g.globalAlpha = o.dim; solid(g, camera, BRICK, o.V, LT, { alpha: o.dim }); g.restore();
        // ký hiệu trên mặt trên: chấm · chỉ · tờ bìa
        const tc = [o.x, 0, o.top + 0.01], kk = prog(t, [T.point, T.line, T.plane][i], [T.point, T.line, T.plane][i] + 0.4);
        g.save(); g.globalAlpha = o.dim;
        if (i === 0) dot3(g, camera, tc, { r: 10, k: kk });
        if (i === 1) thread(g, camera, add(tc, [-0.6, 0, 0]), add(tc, [0.6, 0, 0]), { w: 5, k: kk });
        if (i === 2 && kk > 0) sheet(g, camera, quad(add(tc, [0, 0, 0.03]), [0.55 * outCubic(kk), 0, 0], [0, 0.33 * outCubic(kk), 0]), { thick: 0.03 });
        g.restore();
        const lb = P([o.x, -0.5, 0]);
        label(g, NAMES[i], lb[0], lb[1] + 56, { size: 26, align: 'center', color: i === 2 && t >= T.nw ? C.ink : C.lead, k: prog(t, [T.point, T.line, T.plane][i], [T.point, T.line, T.plane][i] + 0.35) });
      });
      // "flat geometry": hai viên đầu đã quen
      const fl = P([BX[0] + dx - 0.75, -0.5, 0]);
      label(g, 'from flat geometry', fl[0] - 10, fl[1] + 104, { size: 22, k: prog(t, T.flat1, T.flat1 + 0.6) });
      if (t >= T.nw) { const q = P([BX[2] + dx - 0.75, 0, 0.75 + 0.45]); it(g, 'the new one', q[0] - 20, q[1] - 70, 48, C.ink, { align: 'right', k: prog(t, T.nw, T.nw + 0.6) }); }
    }

    // ── 2. mặt bàn → mặt hồ → vô tận → hình bình hành P (câu 2–4) ──
    const enter2 = outCubic(prog(t, T.pic, T.table + 0.2)), toTrio = smooth(prog(t, T.interest - 0.2, T.part + 0.6));
    if (t >= T.pic) {
      const dx = 10 * (1 - enter2);
      const down = smooth(prog(t, T.surface - 0.15, T.surface + 0.7)), z = ZT + (ZL - ZT) * down;
      const grow = outCubic(prog(t, T.stretch, T.dir + 0.3)), shrink = smooth(prog(t, T.paper, T.draw - 0.05));
      const s = 1 + 2.4 * grow * (1 - shrink) - 0.15 * shrink;    // 1 → 3.4 → 0.85
      // sang bộ ba: tờ bìa thu nhỏ về bên phải
      const cTo = lerp3([dx, 0, z], [2.4, 0.1, ZL], toTrio), su = 2.2 * s * (1 - 0.42 * toTrio), sv = 1.4 * s * (1 - 0.32 * toTrio);
      const corners = quad(cTo, [su, 0, 0], [0, sv, 0]);
      const fade = prog(s, 1.05, 2.2);
      // bóng của tờ bìa (mờ dần khi tờ phủ cả bàn)
      if (fade < 1) shadow(g, camera, corners, LT, { a: 0.32 * (1 - fade) });
      // chân bàn (rút vào khi thành mặt hồ)
      const legK = 1 - down;
      if (legK > 0) [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([a, b]) => {
        const top = [cTo[0] + a * 1.95, cTo[1] + b * 1.15, z], bot = [top[0], top[1], z - z * legK];
        threadShadow(g, camera, top, bot, legK); thread(g, camera, top, bot, { w: 8, k: 1 });
      });
      const drawK = prog(t, T.draw, T.para + 0.45), fillA = 1;
      if (fade > 0) { fadeSheet(g, camera, corners, cTo, 200, 760); grid(g, camera, cTo, fade); }
      const cs = fade < 1 ? sheet(g, camera, corners, { alpha: (1 - fade) * fillA, edge: drawK > 0 ? null : C.ink, thick: 0.05 }) : corners.map(camera.P);
      // mặt hồ: phản chiếu quầng đèn + một vòng sóng tắt dần ("perfectly still")
      const kLake = prog(t, T.surface, T.surface + 0.8) * (1 - prog(t, T.stretch, T.stretch + 0.6));
      if (kLake > 0) {
        g.save(); poly(g, cs); g.clip(); g.globalAlpha = kLake; const c = camera.P(cTo); pool(g, c[0] - 60, c[1] - 30, 260, 0.7);
        const r = prog(t, T.still - 0.2, T.still + 1.3);
        if (r > 0 && r < 1) { g.globalAlpha = (1 - r) * 0.7; g.strokeStyle = C.ink; g.lineWidth = 2;
          g.beginPath(); for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI, q = camera.P(add(cTo, [Math.cos(a) * (0.2 + 1.5 * r), Math.sin(a) * (0.2 + 1.1 * r), 0.01]));
            i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); } g.stroke(); }
        g.restore();
        const lq = camera.P(add(cTo, [-2.2, -1.4, 0]));
        label(g, 'a perfectly still lake', lq[0] - 10, lq[1] + 60, { size: 24, k: prog(t, T.still, T.still + 0.6) * (1 - prog(t, T.stretch, T.stretch + 0.01)) });
      }
      if (t >= T.table && t < T.surface + 0.1) { const lq = camera.P(add(cTo, [-2.2, -1.4, z])); label(g, 'a table top', lq[0] - 10, lq[1] + 60, { size: 24, k: prog(t, T.table, T.table + 0.5) }); }
      // mũi tên "mọi hướng" + "FOREVER" (chỉ khi đang giãn)
      const kAr = prog(t, T.every - 0.1, T.dir + 0.4) * (1 - prog(t, T.paper, T.paper + 0.3));
      if (kAr > 0 && t < T.paper + 0.3) {
        [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([a, b], i) => {
          const p0 = camera.P(add(cTo, [a * 1.0, b * 0.8, 0.02])), p1 = camera.P(add(cTo, [a * 3.0, b * 2.0, 0.02]));
          arrow(g, p0, p1, C.ink, 4, prog(kAr, i * 0.15, i * 0.15 + 0.55));
        });
        const fq = camera.P(add(cTo, [3.0, 0, 0.02]));
        label(g, 'forever', fq[0] + 26, fq[1] - 26, { size: 26, color: C.ink, k: prog(t, T.forever, T.forever + 0.5) });
      }
      // bút mực vẽ hình bình hành + tên P
      if (drawK > 0) trace(g, cs, C.ink, 4, drawK);
      if (t >= T.slanted && toTrio < 1) label(g, 'slanted parallelogram', 96, 250, { size: 26, color: C.ink, k: prog(t, T.slanted, T.para + 0.6) });
      const pc = camera.P(add(cTo, [su * 0.55, -sv * 0.72, 0]));
      it(g, 'P', pc[0], pc[1] + 10, 64, C.ink, { k: prog(t, T.letter, T.letter + 0.3) });
      this._cTo = cTo;
    }
    // kính lúp: lát cắt mép tờ bìa, bề dày co về một nét ("no thickness")
    const kLens = outCubic(prog(t, T.make, T.make + 0.5)), lensOut = smooth(prog(t, T.paper, T.paper + 0.7));
    if (kLens > 0 && lensOut < 1) {
      const cx = 820, cy = 760 + 420 * lensOut, r = 118 * kLens, th = 30 * (1 - smooth(prog(t, T.thin, T.thin + 0.9)));
      const tgt = camera.P([0.6, -1.4, ZL]);
      line(g, [cx + r * 0.7, cy - r * 0.7], tgt, C.inkA(0.6), 2, [6, 8], kLens);
      g.save(); g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fillStyle = C.paper; g.fill(); g.clip();
      g.fillStyle = rgb(C.card, 0.92); g.fillRect(cx - r, cy - th, 2 * r, 2 * th);
      line(g, [cx - r, cy - th], [cx + r, cy - th], C.ink, 3); line(g, [cx - r, cy + th], [cx + r, cy + th], C.ink, 3); g.restore();
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore();
      label(g, 'no thickness', cx, cy + 160, { size: 26, color: C.ink, align: 'center', k: prog(t, T.no, T.thick + 0.4) });
    }

    // ── 3. điểm · đường · mặt: không định nghĩa, chỉ mô tả cách chúng cư xử (câu 5–6) ──
    if (t >= T.part - 0.1) {
      const cTo = this._cTo || [2.4, 0.1, ZL];
      const kD = prog(t, T.part, T.part + 0.4), kL = prog(t, T.part + 0.3, T.part + 0.9);
      // cư xử: chấm lên chỉ (behave), chỉ hạ vào tờ bìa (properties)
      const onL = smooth(prog(t, T.behave - 0.1, T.behave + 0.7)), inP = smooth(prog(t, T.props - 0.1, T.props + 0.9));
      const a0 = [-2.6, -0.9, 1.0], b0 = [-0.4, 0.9, 1.0], a1 = add(cTo, [-1.0, -0.45, 0.02]), b1 = add(cTo, [0.9, 0.45, 0.02]);
      const A = lerp3(a0, a1, inP), B = lerp3(b0, b1, inP);
      const d0 = [-3.1, 0.6, 0.6], dOn = lerp3(A, B, 0.55), D = lerp3(d0, dOn, onL);
      threadShadow(g, camera, A, B, kL); dotShadow(g, camera, D, kD);
      thread(g, camera, A, B, { w: 6, k: kL });
      dot3(g, camera, D, { r: 11, k: kD });
            if (t >= T.never) {
        ['point', 'line', 'plane'].forEach((s, i) => label(g, `${s} = ?`, 96, 330 + i * 56, { size: 30, color: C.ink,
          k: prog(t, [T.defines, T.these, T.ideas][i], [T.defines, T.these, T.ideas][i] + 0.45) }));
        it(g, 'never defined in words', 96, 250, 54, C.ink, { k: prog(t, T.never, T.words + 0.3) });
      }
      it(g, 'only how they behave', 96, 540, 46, C.lead, { wt: 500, k: prog(t, T.describes, T.behave + 0.5) });
      label(g, 'properties we accept', 96, 600, { size: 24, k: prog(t, T.props, T.accept + 0.4) });
      it(g, 'Axioms', 96, 760, 104, C.ink, { k: prog(t, T.axioms, T.axioms + 0.45) });
      line(g, [96, 784], [420, 784], C.ink, 4, [], prog(t, T.axioms + 0.15, T.axioms + 0.7));
    }

    // biển mục + đèn + thẻ hồi + đèn tắt/bật
    sectionTag(g, 'Act I · point, line, plane', prog(t, S + 0.3, S + 1.0));
    lamp(g, LAMP_X, LAMP_Y, { on });
    actCard(g, t, S, 'ACT ONE', 'Three bricks', 'ANSWERS 1');
    dark(g, on);
  }
}
const lerpCam = (a, b, u) => Object.fromEntries(Object.keys(a).map(k => [k, Array.isArray(a[k]) ? lerp3(a[k], b[k], u) : a[k] + (b[k] - a[k]) * u]));
