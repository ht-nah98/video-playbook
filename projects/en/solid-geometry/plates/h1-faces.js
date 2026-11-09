// h1 · Faces, edges, vertices — MỞ HỒI VII (thẻ hồi 'ACT SEVEN' · 'Solids' · 'ANSWERS 3').
// Một kim tự tháp giấy (tỉ lệ Giza 146.6 / 230.33 — CONTENT §Lấp 2) gấp lên từ hình khai triển; "wrapped in flat polygons"
// → mở ra thành các đa giác phẳng rồi gấp lại; viên gạch, xúc xắc (dice), ảnh Giza kẹp bìa; FACE · EDGE · VERTEX chỉ vào
// kim tự tháp; câu cuối: PRISMS (gạch, xúc xắc) · PYRAMIDS.
import { W, H, C, prog, lookup, outCubic, smooth, ground, pool, camera, solid, shadow, box, pyramid, xf, centroid, lamp, line,
  it, label, photo, sectionTag, actCard, dark, poly, rgb, add, sub, mul, dot, cross3, norm, len } from '../kit.js';

const CAM0 = { yaw: -12, pitch: 22, dist: 13, target: [-0.8, 0.2, 0.7], cx: 1180, cy: 600 };
const LW = [-0.8, 2.6, 4.2];                       // đèn của cảnh (toạ độ thế giới)
// kim tự tháp: đáy vuông cạnh S, cao theo tỉ lệ Giza; tâm đáy PC, xoay 20°
const S = 2.4, HP = S * 146.6 / 230.33, PC = [1.8, 0.5], SP = 20 * Math.PI / 180;
const BASE = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => [PC[0] + S / 2 * (x * Math.cos(SP) - y * Math.sin(SP)), PC[1] + S / 2 * (x * Math.sin(SP) + y * Math.cos(SP))]);
const APEX = [PC[0], PC[1], HP];
const PYR = pyramid(BASE, APEX);                   // V: 4 đỉnh đáy (z=0) + đỉnh 4
const BRICK = box(1.8, 0.85, 0.6), BRICK_V = xf(BRICK.V, { rz: 12, at: [-4.3, -0.4, 0] });
const DIE = box(1, 1, 1), DIE_V = xf(DIE.V, { rz: 32, at: [-2.2, 0.3, 0] });

// Rodrigues: xoay v quanh trục đơn vị k góc a
const rot = (v, k, a) => add(add(mul(v, Math.cos(a)), mul(cross3(k, v), Math.sin(a))), mul(k, dot(k, v) * (1 - Math.cos(a))));
// mặt bên i của kim tự tháp khi mở ra u ∈ [0,1] (0 = gấp kín, 1 = nằm phẳng trên bàn ngoài đáy)
function sideTri(i, u) {
  const b0 = [...BASE[i], 0], b1 = [...BASE[(i + 1) % 4], 0], M = mul(add(b0, b1), 0.5), r = sub(APEX, M);
  const out = norm([M[0] - PC[0], M[1] - PC[1], 0]), rf = mul(out, len(r)), k = norm(cross3(r, rf)), al = Math.acos(dot(r, rf) / (len(r) * len(rf)));
  return [b0, b1, add(M, rot(r, k, al * u))];
}
// vẽ các mảnh giấy rời (painter): mặt hướng nào cũng tô, sáng theo đèn
function pieces(g, cam, polys, L, { k = 1 } = {}) {
  polys.map(p => ({ p, z: cam.P(centroid(p))[2] })).sort((a, b) => b.z - a.z).forEach(({ p }) => {
    let N = norm(cross3(sub(p[1], p[0]), sub(p[2], p[0]))); if (dot(N, sub(cam.pos, centroid(p))) < 0) N = mul(N, -1);
    const lit = Math.max(0, dot(N, norm(sub(L, centroid(p))))), q = 0.82 + 0.24 * lit, s = p.map(cam.P);
    g.save(); g.globalAlpha = k; g.fillStyle = `rgb(${Math.min(255, C.card[0] * q)},${Math.min(255, C.card[1] * q ** 1.25)},${Math.min(255, C.card[2] * q ** 1.6)})`;
    poly(g, s); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineJoin = 'round'; g.stroke(); g.restore();
  });
}
// chấm xúc xắc trên các mặt thấy (mặt i của box: pháp tuyến gốc → số chấm, mặt đối nhau cộng 7)
const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
function pips(g, cam, m, P3) {
  const ctr0 = centroid(m.V), ctr = centroid(P3);
  m.faces.forEach(f => {
    const n0 = sub(centroid(f.map(q => m.V[q])), ctr0), c = centroid(f.map(q => P3[q])), N = norm(sub(c, ctr));
    if (dot(N, sub(cam.pos, c)) <= 0) return;
    const ax = [0, 1, 2].reduce((a, i) => Math.abs(n0[i]) > Math.abs(n0[a]) ? i : a, 0), pos = n0[ax] > 0;
    const num = [[3, 4], [1, 6], [5, 2]][ax][pos ? 0 : 1];
    const e1 = mul(sub(P3[f[1]], P3[f[0]]), 0.5), e2 = mul(sub(P3[f[3]], P3[f[0]]), 0.5), u1 = norm(e1), u2 = norm(e2);
    g.save(); g.fillStyle = C.ink;
    PIPS[num].forEach(([a, b]) => { const p = add(c, add(mul(e1, a * 0.55), mul(e2, b * 0.55)));
      poly(g, Array.from({ length: 14 }, (_, i) => cam.P(add(p, add(mul(u1, 0.085 * Math.cos(i * 0.4488)), mul(u2, 0.085 * Math.sin(i * 0.4488))))))); g.fill(); });
    g.restore();
  });
}
const lift = (V, dz) => V.map(p => [p[0], p[1], p[2] + dz]);

export default class Faces {
  static ERA = 'desk';
  static POSES = [];
  static IMAGES = { giza: './assets/history/giza.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'h1');
    this.T = {
      step: w(125, 'step'), solids: w(125, 'solids'), picture: w(125, 'picture'),
      poly126: w(126, 'polyhedra'), wrapped: w(126, 'wrapped'), polygons: w(126, 'polygons'), end126: L(126).end,
      brick: w(127, 'brick'), die: w(127, 'die'), pyramid: w(127, 'pyramid'), giza: w(127, 'giza'), all127: w(127, 'polyhedra'),
      s128: L(128).start, face: w(128, 'faces', 1), two: w(128, 'faces', 2), edge: w(128, 'edge'), corner: w(128, 'corner'), vertex: w(128, 'vertex'),
      s129: L(129).start, prisms: w(129, 'prisms'), pyramids: w(129, 'pyramids'), end: L(129).end,
    };
    this.START = L(125).start;
    this.FROM = Math.max(this.START - 2.6, L(124).end + 0.5);
    // đèn tắt–bật (DNA §7): quanh START − 2.4, nhưng không sớm hơn lúc trang đã lật xong
    this.FLASH = Math.max(this.START - 2.4, this.FROM + 0.95);
    // mặt / cạnh được gọi tên: chọn MỘT lần theo camera lúc câu 128 (camera đứng ở câu này)
    const cam = this.cam(this.T.s128), sides = [0, 1, 2, 3].map(i => sideTri(i, 0));
    const outward = sides.map(p => { const N = norm(cross3(sub(p[1], p[0]), sub(p[2], p[0]))), c = centroid(p); return dot(N, sub(c, [PC[0], PC[1], HP / 3])) > 0 ? N : mul(N, -1); });
    const vis = [0, 1, 2, 3].filter(i => dot(outward[i], sub(cam.pos, centroid(sides[i]))) > 0);
    if (vis.length < 2) throw new Error('h1: cần ≥ 2 mặt bên thấy được');
    const area = i => { const s = sides[i].map(cam.P); return Math.abs((s[1][0] - s[0][0]) * (s[2][1] - s[0][1]) - (s[2][0] - s[0][0]) * (s[1][1] - s[0][1])); };
    this.FACE = vis.slice().sort((a, b) => area(b) - area(a))[0];
    // cạnh bên chung của hai mặt thấy: đỉnh đáy j nằm giữa mặt j−1 và mặt j
    const j = vis.find(i => vis.includes((i + 3) % 4)); this.EDGE = j; this.EDGE_F = [(j + 3) % 4, j];
  }
  cam(t) {
    const drift = Math.min(Math.max(t - this.T.solids, 0), this.T.s128 - this.T.solids) * 0.22;
    return camera({ ...CAM0, yaw: CAM0.yaw + drift });
  }
  sfx() {
    const T = this.T;
    return [{ t: this.FLASH + 0.1, kind: 'shimmer' }, { t: T.solids, kind: 'flap' }, { t: T.wrapped, kind: 'flap' },
      { t: T.die + 0.35, kind: 'dice' }, { t: T.face, kind: 'pen' }, { t: T.edge + 0.2, kind: 'tick' }, { t: T.prisms, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T, cam = this.cam(t), P = cam.P;
    ground(g);
    const pc = P([-0.8, 0.4, 0]); pool(g, pc[0], pc[1], 820, 0.55);

    // kim tự tháp: hiện dưới dạng hình khai triển ở "step", gấp lên ở "solids"; mở ra ở "wrapped", gấp lại trước "brick"
    const kNet = outCubic(prog(t, T.step, T.step + 0.6));
    const fold = smooth(prog(t, T.solids, T.solids + 0.8));
    const open = smooth(prog(t, T.wrapped, T.wrapped + 0.8)) * (1 - smooth(prog(t, T.polygons + 0.35, Math.min(T.brick - 0.05, T.polygons + 1.1))));
    const u = Math.max(1 - fold, open);
    // bóng (vật trước, sàn sau): gạch, xúc xắc, kim tự tháp
    const dB = 2.4 * (1 - outCubic(prog(t, T.brick - 0.1, T.brick + 0.45))), dD = 2.4 * (1 - outCubic(prog(t, T.die - 0.1, T.die + 0.4)));
    const bV = lift(BRICK_V, dB), dV = lift(DIE_V, dD);
    const shA = k => 0.4 * k;
    if (t >= T.brick - 0.1 && dB < 1) shadow(g, cam, bV, LW, { a: shA(1 - dB) });
    if (t >= T.die - 0.1 && dD < 1) shadow(g, cam, dV, LW, { a: shA(1 - dD) });
    if (kNet > 0) {
      const tris = [0, 1, 2, 3].map(i => sideTri(i, u));
      shadow(g, cam, [...BASE.map(p => [...p, 0]), ...tris.map(p => p[2])], LW, { a: 0.4 * kNet * (1 - u * 0.7) });
    }
    if (t >= T.brick - 0.1) solid(g, cam, BRICK, bV, LW);
    if (t >= T.die - 0.1) { solid(g, cam, DIE, dV, LW); pips(g, cam, DIE, dV); }
    if (kNet > 0) {
      if (u < 1e-3) solid(g, cam, PYR, PYR.V, LW);
      else {
        // giấy khai triển: đáy + 4 tam giác, kéo ra từ tâm lúc mới hiện
        const sc = p => [PC[0] + (p[0] - PC[0]) * kNet, PC[1] + (p[1] - PC[1]) * kNet, p[2] * kNet];
        pieces(g, cam, [BASE.map(p => sc([...p, 0])), ...[0, 1, 2, 3].map(i => sideTri(i, u).map(sc))], LW);
      }
    }
    // "flat polygons": đa giác phẳng được kẻ lại nét đậm lúc nằm trên bàn
    if (open > 0.95 && t < T.brick) {
      const kk = prog(t, T.polygons, T.polygons + 0.4);
      [0, 1, 2, 3].forEach(i => { const s = sideTri(i, 1).map(P); line(g, s[0], s[2], C.ink, 5, [], kk); line(g, s[1], s[2], C.ink, 5, [], kk); });
    }

    // câu 128: FACE · EDGE · VERTEX trên kim tự tháp
    if (t >= T.s128 && u < 1e-3) {
      const fA = this.FACE, tri = i => sideTri(i, 0);
      const tint = (i, k) => { if (k <= 0) return; g.save(); g.globalAlpha = 0.16 * k; g.fillStyle = C.ink; poly(g, tri(i).map(P)); g.fill(); g.restore(); };
      const kFace = prog(t, T.face, T.face + 0.4), kTwo = prog(t, T.two, T.two + 0.4) * (1 - prog(t, T.corner, T.corner + 0.4));
      if (t < T.two) tint(fA, kFace);
      else this.EDGE_F.forEach(i => tint(i, kTwo));
      const e0 = P([...BASE[this.EDGE], 0]), e1 = P(APEX), pa = P(APEX);
      line(g, e0, e1, C.ink, 8, [], prog(t, T.edge, T.edge + 0.5));
      if (t >= T.vertex - 0.1) { const r = 12 * outCubic(prog(t, T.vertex - 0.1, T.vertex + 0.25)); g.save(); g.fillStyle = C.ink; g.beginPath(); g.arc(pa[0], pa[1], r, 0, 7); g.fill(); g.restore(); }
      // nhãn phẳng cạnh điểm chiếu
      const fc = P(centroid(tri(fA)));
      label(g, 'face', fc[0], fc[1] + 8, { color: C.ink, size: 26, align: 'center', k: prog(t, T.face, T.face + 0.4) });
      const em = [(e0[0] + e1[0]) / 2, (e0[1] + e1[1]) / 2], left = e0[0] < pa[0];
      label(g, 'edge', em[0] + (left ? -24 : 24), em[1], { color: C.ink, size: 26, align: left ? 'right' : 'left', k: prog(t, T.edge, T.edge + 0.4) });
      label(g, 'vertex', pa[0] + 26, pa[1] - 22, { color: C.ink, size: 26, k: prog(t, T.vertex, T.vertex + 0.4) });
    }

    // câu 129: hai họ — gạch nối dưới gạch + xúc xắc / dưới kim tự tháp
    if (t >= T.prisms - 0.1) {
      const pb = [...bV, ...dV].map(P), xs = pb.map(p => p[0]), y = Math.max(...pb.map(p => p[1])) + 46;
      const x0 = Math.min(...xs), x1 = Math.max(...xs), k = prog(t, T.prisms, T.prisms + 0.4);
      line(g, [x0, y], [x1, y], C.ink, 3, [], k);
      label(g, 'prisms', (x0 + x1) / 2, y + 44, { color: C.ink, size: 28, align: 'center', k });
    }
    if (t >= T.pyramids - 0.1) {
      const pp = PYR.V.map(P), xs = pp.map(p => p[0]), y = Math.max(...pp.map(p => p[1])) + 46;
      const x0 = Math.min(...xs), x1 = Math.max(...xs), k = prog(t, T.pyramids, T.pyramids + 0.4);
      line(g, [x0, y], [x1, y], C.ink, 3, [], k);
      label(g, 'pyramids', (x0 + x1) / 2, y + 44, { color: C.ink, size: 28, align: 'center', k });
    }

    // chữ trái-trên
    sectionTag(g, 'Act VII · solids', prog(t, this.START + 0.2, this.START + 0.9));
    it(g, 'Polyhedra', 96, 250, 92, C.ink, { k: prog(t, T.poly126, T.poly126 + 0.6) });
    it(g, 'solids wrapped in flat polygons', 96, 318, 46, C.lead, { wt: 500, k: prog(t, T.wrapped, T.polygons + 0.4) });
    // ảnh Giza kẹp bìa: trượt vào ở "giza", trượt xuống khỏi khung ở câu 128
    if (t >= T.giza - 0.05) {
      const out = outCubic(prog(t, T.s128, T.s128 + 0.7)) * 900;
      g.save(); g.translate(0, out);
      photo(g, 'giza', 110, 390, 270, prog(t, T.giza - 0.05, T.giza + 0.55), { rot: -0.025, credit: 'PHOTO: NINA · CC BY 2.5' });
      g.restore();
    }
    // câu 128: ba từ bên trái (viết theo lời)
    const rows = [['face', 'a flat polygon', T.face], ['edge', 'shared by two faces', T.edge], ['vertex', 'where edges meet', T.vertex]];
    rows.forEach(([a, b, tw], i) => { const y = 440 + i * 92;
      it(g, a, 96, y, 60, C.ink, { k: prog(t, tw, tw + 0.35) }); label(g, b, 300, y - 6, { size: 24, k: prog(t, tw + 0.15, tw + 0.8) }); });

    // đèn (bật cùng thẻ hồi), thẻ hồi, chớp đèn
    const fl = this.FLASH, on = 1 - 0.92 * Math.sin(Math.PI * prog(t, fl - 0.15, fl + 0.15));
    lamp(g, P([LW[0], LW[1], 3.2])[0], 150, { on: t < fl - 0.15 ? 0.25 : on });
    actCard(g, t, this.START, 'ACT SEVEN', 'Solids', 'ANSWERS 3');
    dark(g, on);
  }
}
