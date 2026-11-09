// k4 · Next time. Ghế ba chân + hộp-phòng (đúng như a0) gấp lên dưới đèn → "where to start / what to look for / step by
// step" → "three-legged stool": ba chân chạm bàn = ba điểm → MẶT PHẲNG nét đứt; "corner of a room": ba cạnh góc trong
// tô mực; "planes … lines hiding there": mặt tường kéo dài (nét đứt) + cạnh kéo dài thành đường thẳng. Mascot `stool`
// → `wave`. Biển kênh "99% from scratch" + SUBSCRIBE viết xong trước "thanks", rồi ĐỨNG YÊN tới hết (≥ 4 s, tail 2.0 s).
import { H, C, prog, lookup, outCubic, outBack, smooth, ground, pool, camera, lamp, line, it, label, figure, sectionTag,
  thread, dot3, ROOM, add, mul, sub, clamp, rgb, poly } from '../kit.js';
import { STOOL, drawStool, miniRoom } from './a0-open.js';

const L0 = [0.4, 2.4, 9];
const CAM0 = { yaw: -20, pitch: 30, dist: 9.6, target: [0.1, 0.6, 0.5], cx: 1000, cy: 650 };
const STOOL_AT = [-2.3, 0.9], RS = 0.26, R_AT = [-0.9, 0.3, 0];

export default class Next {
  static ERA = 'desk';
  static POSES = ['stool', 'wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'k4');
    this.T = {
      remember: w(207, 'remember'), formula: w(207, 'formula'), fine: w(207, 'fine'), completely: w(207, 'completely'),
      space: w(208, 'space'), start: w(208, 'start'), rel: w(208, 'relationship'), step: w(208, 'step', 1), know: w(208, 'know', 2),
      tls: w(209, 'three-legged'), stool: w(209, 'stool'), corner: w(209, 'corner'), room: w(209, 'room'), planes: w(209, 'planes'),
      lines: w(209, 'lines'), there: w(209, 'there'),
      solid: w(210, 'solid'), scary: w(210, 'scary'), fun: w(210, 'fun'), thanks: w(211, 'thanks'), end: L(211).end,
    };
    this.START = L(207).start;
    this.FROM = Math.max(this.START - 1.2, L(206).end + 0.5);
    this.SIGN = this.T.solid;   // biển kênh bắt đầu; viết xong ≤ SIGN + 3.4 → đứng yên ≥ 4 s tới hết trang
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FROM + 0.7, kind: 'flap' }, { t: T.start, kind: 'pen' }, { t: T.stool, kind: 'pen' }, { t: T.planes, kind: 'pen' },
      { t: this.SIGN + 0.7, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // camera trôi chậm, DỪNG trước biển kênh; vật trượt ra khỏi khung khi biển kênh vào
    const drift = 0.25 * clamp(t - this.FROM, 0, T.solid - this.FROM);
    const out = 9 * smooth(prog(t, this.SIGN, this.SIGN + 0.9));
    const cam = camera({ ...CAM0, yaw: CAM0.yaw + drift, target: add(CAM0.target, [out, 0, 0]) });
    const P = cam.P, L = add(L0, [out, 0, 0]), lp = camera({ ...CAM0, yaw: CAM0.yaw + drift }).P(L0);
    pool(g, lp[0], 640, 820, 0.45);

    if (out < 8.9) {
      const kSt = outBack(prog(t, this.FROM + 0.3, this.FROM + 0.9)), kR = outBack(prog(t, T.remember - 0.1, T.remember + 0.5));
      // mặt phẳng qua ba chân ghế (ba điểm → một mặt) — nét đứt, nằm trên bàn, vẽ trước ghế
      const feet = STOOL.legAng.map(a => [STOOL_AT[0] + 0.5 * Math.cos(a), STOOL_AT[1] + 0.5 * Math.sin(a), 0]);
      const kPl = prog(t, T.stool, T.stool + 0.8);
      if (kPl > 0) {
        const c = [STOOL_AT[0], STOOL_AT[1], 0], q = [[-1.1, -0.9], [1.1, -0.9], [1.1, 0.9], [-1.1, 0.9]].map(([x, y]) => P(add(c, [x, y, 0])));
        g.save(); g.globalAlpha = 0.5 * kPl; g.fillStyle = rgb(C.card); poly(g, q); g.fill(); g.restore();
        for (let i = 0; i < 4; i++) line(g, q[i], q[(i + 1) % 4], C.inkA(0.7), 2.5, [9, 9], kPl);
        it(g, 'P', q[3][0] - 10, q[3][1] - 10, 48, C.ink, { k: prog(t, T.stool + 0.5, T.stool + 0.9) });
      }
      drawStool(g, cam, STOOL_AT, L, kSt);
      feet.forEach((f, i) => dot3(g, cam, f, { r: 8, k: prog(t, T.tls + i * 0.12, T.tls + 0.3 + i * 0.12) }));
      // hộp-phòng + góc trong: ba cạnh tô mực, rồi kéo dài thành đường thẳng; tường sau kéo dài thành mặt phẳng
      if (kR > 0) {
        const Pr = miniRoom(g, cam, R_AT, RS, L, kR), c = ROOM.corners;
        const kW = prog(t, T.planes - 0.1, T.planes + 0.7);
        if (kW > 0) { const ext = [[-1.5, 4, -0.7], [13.5, 4, -0.7], [13.5, 4, 3.9], [-1.5, 4, 3.9]].map(Pr);
          for (let i = 0; i < 4; i++) line(g, ext[i], ext[(i + 1) % 4], C.inkA(0.7), 2.5, [9, 9], kW); }
        const kC = prog(t, T.corner, T.room + 0.3), kLn = prog(t, T.lines, T.lines + 0.6);
        [[c.lb0, c.rb0], [c.lb0, c.lf0], [c.lb0, c.lb1]].forEach(([a, b], i) => {
          const pa = Pr(a), pb = Pr(b);
          line(g, pa, pb, C.ink, 6, [], prog(kC, i * 0.2, i * 0.2 + 0.6));
          if (kLn > 0) { const d = sub(b, a), e0 = Pr(sub(a, mul(d, 0.25))), e1 = Pr(add(b, mul(d, 0.25)));
            line(g, pa, e0, C.ink, 3, [6, 8], kLn); line(g, pb, e1, C.ink, 3, [6, 8], kLn); }
        });
        if (kC > 0) dot3(g, { P: Pr }, c.lb0, { r: 8, k: kC * 2 });
      }
      // ba câu hỏi để bắt đầu (s208)
      const kOutT = 1 - prog(t, this.SIGN - 0.2, this.SIGN + 0.2);
      if (kOutT > 0) {
        const dy = -400 * (1 - kOutT);
        it(g, "that's completely fine", 96, 260 + dy, 54, C.ink, { k: prog(t, T.completely, T.fine + 0.4) });
        label(g, '1 · where to start', 96, 340 + dy, { size: 26, color: C.ink, k: prog(t, T.start - 0.2, T.start + 0.5) });
        label(g, '2 · what to look for', 96, 386 + dy, { size: 26, color: C.ink, k: prog(t, T.rel, T.rel + 0.6) });
        label(g, '3 · step by step, back', 96, 432 + dy, { size: 26, color: C.ink, k: prog(t, T.step, T.step + 0.7) });
        label(g, 'to what you know', 96, 470 + dy, { size: 26, color: C.ink, k: prog(t, T.know - 0.4, T.know + 0.3) });
      }
    }

    // biển kênh: tấm bìa trượt lên, viết "99% from scratch" + SUBSCRIBE — XONG trước "thanks", rồi đứng yên
    const kB = outCubic(prog(t, this.SIGN + 0.2, this.SIGN + 1.0));
    if (kB > 0) {
      const x0 = 150, y0 = 330 + (1 - kB) * 760, w = 1150, h = 430;
      g.save(); g.fillStyle = 'rgba(120,80,50,0.16)'; g.fillRect(x0 + 22, y0 + 26, w, h);
      g.fillStyle = rgb(C.card); g.fillRect(x0, y0, w, h); g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(x0, y0, w, h); g.restore();
      it(g, '99% from scratch', x0 + w / 2, y0 + 200, 120, C.ink, { align: 'center', k: prog(t, this.SIGN + 0.9, this.SIGN + 2.0) });
      const kS = prog(t, this.SIGN + 2.1, this.SIGN + 2.6), bx = x0 + w / 2 - 170, by = y0 + 270;
      if (kS > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.strokeRect(bx, by, 340 * kS, 84); g.restore(); }
      label(g, 'subscribe', x0 + w / 2 + 2, by + 54, { size: 34, color: C.ink, align: 'center', k: prog(t, this.SIGN + 2.4, this.SIGN + 3.0) });
    }

    // mascot: ngồi ghế đúng "three-legged stool" → vẫy tay chào ở biển kênh (đứng yên tới hết)
    const kf1 = prog(t, T.tls - 0.3, T.tls + 0.05) * (1 - prog(t, this.SIGN - 0.3, this.SIGN + 0.05));
    figure(g, 'stool', 1640, H, 760, kf1);
    figure(g, 'wave', 1610, H, 600, prog(t, this.SIGN + 0.6, this.SIGN + 0.95));

    lamp(g, lp[0], 150);
    sectionTag(g, 'Act X · next time', prog(t, this.FROM + 0.3, this.FROM + 1));
  }
}
