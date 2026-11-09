// k1 · Back to the flat page — MỞ HỒI X. Thẻ hồi "ACT TEN · Putting it together" (đèn chớp tắt–bật) → cả chuyến đi
// xếp lên KỆ dưới đèn (ba viên gạch → hộp-phòng → lập phương, chóp → trụ, nón, cầu) → "two habits" → habit 1:
// "space → flat page" → mỗi góc / khoảng cách co về MỘT tam giác cam đất nằm trong một mặt (phòng: đường chéo; chóp:
// đường cao; nón: đường sinh) → mặt phẳng chứa tam giác → "which triangle? which plane?".
import { H, C, prog, lookup, outCubic, outBack, smooth, ground, pool, camera, sheet, sheetShadow, shadow, solid, thread,
  dot3, lamp, line, it, label, sectionTag, actCard, dark, box, pyramid, revolve, sphere, ngon, add, mul, sub, clamp,
  goalTriangle, rightMark, ROOM, norm } from '../kit.js';
import { miniRoom } from './a0-open.js';

const L0 = [0.4, 2.6, 9];
const CAM0 = { yaw: -16, pitch: 30, dist: 10.4, target: [0.2, 0.7, 0.6], cx: 1070, cy: 640 };
const SH = 0.25;                        // mặt kệ
const PLANK = box(8.9, 1.6, SH), PLANK_AT = [-4.4, 0, 0];
const RS = 0.14, R_AT = [-2.75, 0.3, SH];                     // hộp-phòng thu nhỏ: 1.92 × 0.64 × 0.48
const CUBE = box(0.75, 0.75, 0.75), CUBE_AT = [-0.7, 0.45, SH];
const PYB = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]], PY_AT = [0.75, 0.8], PY_H = 1.05;
const CYL = revolve(0.4, 0.9, 0.4, 48), CYL_AT = [1.9, 0.8];
const CONE = revolve(0.45, 1.05, 0, 48), CONE_AT = [3.0, 0.8];
const SPH = sphere(0.42), SPH_AT = [4.0, 0.8];

export default class Flat {
  static ERA = 'desk';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'k1');
    this.T = {
      tour: w(194, 'tour'), bricks: w(194, 'bricks'), solids: w(194, 'solids'),
      habits: w(195, 'habits'), easier: w(195, 'easier'),
      turn: w(196, 'turn'), space: w(196, 'space'), page: w(196, 'page'),
      angle: w(197, 'angle'), dist: w(197, 'distance'), tri: w(197, 'triangle'), plane: w(197, 'plane'),
      wh1: w(198, 'which', 1), wh2: w(198, 'which', 2), end: L(198).end,
    };
    this.START = L(194).start;
    this.FROM = Math.max(this.START - 2.6, L(193).end + 0.5);
    this.BLINK = Math.max(this.START - 2.4, this.FROM + 0.95);  // đèn chớp sau khi tờ mới đã nạp xong
  }
  sfx() {
    const T = this.T;
    return [{ t: this.BLINK, kind: 'shimmer' }, { t: T.bricks, kind: 'flap' }, { t: T.space, kind: 'pen' },
      { t: T.angle, kind: 'pen' }, { t: T.tri + 0.5, kind: 'correct' }, { t: T.wh1, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    const cam = camera({ ...CAM0, yaw: CAM0.yaw + 0.25 * clamp(t - this.START, 0, 30) });
    const P = cam.P, L = L0, lp = P(L);
    const blink = 1 - clamp(1 - Math.abs(t - this.BLINK) / 0.15);
    pool(g, lp[0], 640, 820, 0.45 * blink);

    // kệ + mô hình xuất hiện lần lượt "from three bricks … to spinning solids"
    const kShelf = outCubic(prog(t, this.START - 0.1, this.START + 0.5));
    const at = i => outBack(prog(t, T.tour + i * (T.solids - T.tour) / 7, T.tour + i * (T.solids - T.tour) / 7 + 0.45));
    const zs = (V, k, ox = [0, 0, 0]) => V.map(v => [v[0] + ox[0], v[1] + ox[1], SH + (v[2] + ox[2] - SH) * k]);
    if (kShelf > 0) {
      const V = PLANK.V.map(v => add([v[0] * (0.2 + 0.8 * kShelf), v[1], v[2]], [PLANK_AT[0] * (0.2 + 0.8 * kShelf), 0, 0]));
      shadow(g, cam, V, L, { a: 0.3, spread: 0.15 });
      solid(g, cam, PLANK, V, L, { k: kShelf, hidden: false });
    }
    const kTri = [prog(t, T.angle, T.angle + 0.8), prog(t, T.dist, T.dist + 0.8), prog(t, T.tri, T.tri + 0.8)];
    // 0 · ba viên gạch: chấm, sợi chỉ, tờ bìa nhỏ
    const k0 = at(0);
    if (k0 > 0) {
      const sc = [[-4.1, 0.9, 0], [-3.4, 0.9, 0], [-3.4, 1.4, 0], [-4.1, 1.4, 0]].map(p => [p[0], p[1], SH + 0.18 * k0]);
      sheetShadow(g, cam, sc.map(p => [p[0], p[1], SH]), { a: 0.2 * clamp(k0), dx: -0.06, dy: -0.06 });
      sheet(g, cam, sc, { k: clamp(k0), thick: 0.03 });
      thread(g, cam, [-4.15, 0.3, SH + 0.15], [-3.3, 0.55, SH + 0.15], { w: 4, k: clamp(k0) });
      dot3(g, cam, [-3.8, 0.2, SH + 0.02], { r: 7, k: k0 });
    }
    // 1 · hộp-phòng thu nhỏ (vật xuyên suốt)
    const k1 = at(1);
    let Pr = null;
    if (k1 > 0) Pr = miniRoom(g, cam, R_AT, RS, L, k1);
    if (Pr && kTri[0] > 0) {
      const c = ROOM.corners;
      // mặt phẳng chứa tam giác (đường chéo sàn – cạnh dọc – đường chéo phòng), nét đứt ở "plane"
      const kpl = prog(t, T.plane - 0.2, T.plane + 0.5);
      if (kpl > 0) { const q = [c.lf0, c.rb0, c.rb1, c.lf1].map(Pr); for (let i = 0; i < 4; i++) line(g, q[i], q[(i + 1) % 4], C.inkA(0.6), 2.5, [8, 9], kpl); }
      const cam2 = { ...cam, P: Pr };
      goalTriangle(g, cam2, c.lf0, c.rb0, c.rb1, { k: kTri[0] });
      if (kTri[0] >= 1) rightMark(g, cam2, c.rb0, norm(sub(c.lf0, c.rb0)), [0, 0, 1], 0.9, { color: C.terra });
    }
    // 2 · lập phương
    const k2 = at(2);
    if (k2 > 0) { const V = zs(CUBE.V, k2, CUBE_AT); shadow(g, cam, V, L, { a: 0.35 }); solid(g, cam, CUBE, V, L, { k: clamp(k2 * 2) }); }
    // 3 · chóp tứ giác đều: tam giác (đỉnh, tâm đáy, trung điểm cạnh trước) — đường cao
    const k3 = at(3), PY = pyramid(PYB, [0, 0, PY_H]);
    if (k3 > 0) {
      const V = zs(PY.V.map(v => [v[0] + PY_AT[0], v[1] + PY_AT[1], v[2] + SH]), k3);
      shadow(g, cam, V, L, { a: 0.35 });
      solid(g, cam, PY, V, L, { k: clamp(k3 * 2), alpha: 1 - 0.45 * kTri[1] });
      const A = [PY_AT[0], PY_AT[1], SH + PY_H], O = [PY_AT[0], PY_AT[1], SH], M = [PY_AT[0], PY_AT[1] - 0.5, SH];
      goalTriangle(g, cam, A, O, M, { k: kTri[1] });
      if (kTri[1] >= 1) rightMark(g, cam, O, [0, -1, 0], [0, 0, 1], 0.14, { color: C.terra });
    }
    // 4 · trụ
    const k4 = at(4);
    if (k4 > 0) { const V = zs(CYL.V.map(v => [v[0] + CYL_AT[0], v[1] + CYL_AT[1], v[2] + SH]), k4); shadow(g, cam, V, L, { a: 0.35 }); solid(g, cam, CYL, V, L, { k: clamp(k4 * 2) }); }
    // 5 · nón: tam giác (đỉnh, tâm đáy, điểm vành trước) — đường sinh
    const k5 = at(5);
    if (k5 > 0) {
      const V = zs(CONE.V.map(v => [v[0] + CONE_AT[0], v[1] + CONE_AT[1], v[2] + SH]), k5);
      shadow(g, cam, V, L, { a: 0.35 });
      solid(g, cam, CONE, V, L, { k: clamp(k5 * 2), alpha: 1 - 0.45 * kTri[2] });
      const A = [CONE_AT[0], CONE_AT[1], SH + 1.05], O = [CONE_AT[0], CONE_AT[1], SH], R = [CONE_AT[0] + 0.32, CONE_AT[1] - 0.32, SH];
      goalTriangle(g, cam, A, O, R, { k: kTri[2] });
      if (kTri[2] >= 1) rightMark(g, cam, O, norm(sub(R, O)), [0, 0, 1], 0.13, { color: C.terra });
    }
    // 6 · cầu
    const k6 = at(6);
    if (k6 > 0) { const V = SPH.V.map(v => [v[0] * k6 + SPH_AT[0], v[1] * k6 + SPH_AT[1], SH + (v[2] + 0.42) * k6]); shadow(g, cam, V, L, { a: 0.35 }); solid(g, cam, SPH, V, L, { k: clamp(k6 * 2) }); }

    // chữ trái: hai thói quen → thói quen 1 → câu tự hỏi
    it(g, 'two habits', 96, 260, 72, C.ink, { k: prog(t, T.habits, T.habits + 0.7) });
    label(g, '1 · space  →  flat page', 96, 330, { size: 28, color: C.ink, k: prog(t, T.turn, T.page + 0.3) });
    label(g, 'every angle, every distance:', 96, 390, { size: 24, k: prog(t, T.angle, T.dist + 0.4) });
    label(g, 'a triangle in a plane', 96, 428, { size: 24, color: C.terraT, k: prog(t, T.tri, T.plane + 0.3) });
    it(g, 'Which triangle?', 96, 510, 64, C.ink, { k: prog(t, T.wh1, T.wh1 + 0.8) });
    it(g, 'Which plane?', 96, 584, 64, C.ink, { k: prog(t, T.wh2, T.wh2 + 0.7) });

    lamp(g, lp[0], 150, { on: blink });
    sectionTag(g, 'Act X · back to the flat page', prog(t, this.START, this.START + 0.7));
    actCard(g, t, this.START, 'ACT TEN', 'Putting it together');
    dark(g, 1 - 0.85 * clamp(1 - Math.abs(t - this.BLINK) / 0.15));
  }
}
