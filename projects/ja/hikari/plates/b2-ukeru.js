// b2 · 目は受け取るだけ (p2 câu 4–6) — ERA darkroom. Ibn al-Haytham: nguồn sáng → vật → mắt (ánh sáng đi từ trái sang phải).
//  4 ảnh alhazen-hevelius (想像図) + 「11世紀のはじめ」「イラク・バスラ生まれ」「イブン・アル＝ハイサム」 · 5 Mặt Trời chói chiếu vào mắt → đau
//  6 lỗ đổi 'lamps': ba chùm → quả táo → tia toả 四方, CHỈ một tia vào mắt · 「目から光が出る」 gạch → 「目は受け取るだけ」
import { C, TAU, clamp, prog, lookup, smooth, outBack, outCubic, ground, aperture, shaft, spot, ray, eye, apple, telop, wrong, strike, title,
  photo, imgs, cue, ink } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const DEG = Math.PI / 180;

export default class Ukeru {
  static ERA = 'darkroom';
  static IMAGES = imgs('alhazen-hevelius');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2-ukeru');
    this.START = L(4).start;
    this.FROM = Math.max(this.START - 1.2, L(3).end + 0.5);
    this.T = {
      l4: L(4).start, jusei: w(4, '11世紀'), basura: w(4, 'バスラ'), ibn: w(4, 'イブン'), ronso: w(4, '論争'),
      l5: L(5).start, taiyo: w(5, '太陽'), mitsume: w(5, '見つめる'), itaku: w(5, '痛く'), dasu: w(5, '出して'), naze: w(5, 'なぜ'),
      l6: L(6).start, mono: w(6, 'もの'), shiho: w(6, '四方'), goku: w(6, 'ごく'), ichibu: w(6, '一部'), me2: w(6, '目', 2), uketoru: w(6, '受け取る'), end: L(6).end,
    };
  }
  sfx() {
    const T = this.T;
    return [cue(T.jusei - 0.2, 'photo'), cue(T.ichibu + 0.1, 'step', -3), cue(T.ibn, 'tick', -2), cue(T.taiyo, 'beam', -4), cue(T.itaku, 'tick', -1),
      cue(T.dasu + 0.3, 'telop', -3), cue(T.shiho, 'beam', -4), cue(T.uketoru - 0.15, 'fail', -4), cue(T.ronso, 'step', -4)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    const lamps = t >= T.l6 - 0.1;
    aperture(g, lamps ? 'lamps' : 'knot', { open: smooth(prog(t, F + 0.1, F + 0.7)) });
    shaft(g, 92, 360, 1800, 320, 1800, 400, { a: 0.08 * (1 - 0.8 * (lamps ? 1 : 0)), k: prog(t, F + 0.1, F + 1.6), t, dust: 50, seed: 11, spot: false });
    title(g, '目は受け取るだけ', t, F + 0.3);

    // ── 4: ảnh + giới thiệu (rời khung sang trái khi câu 5 vào) ──
    const o4 = out(t, T.l5 - 0.2);
    if (o4 < 1) {
      g.save(); g.translate(-1500 * o4, 0);
      photo(g, 'alhazen-hevelius', 140, 250, 560, prog(t, T.jusei - 0.3, T.jusei + 0.8));
      telop(g, '11世紀のはじめ', 430, 480, prog(t, T.jusei, T.jusei + 0.8), { size: 60, mincho: true });
      telop(g, 'イラク・バスラ生まれ', 430, 575, prog(t, T.basura, T.basura + 0.8), { size: 48 });
      telop(g, 'イブン・アル＝ハイサム', 430, 685, prog(t, T.ibn, T.ibn + 0.9), { size: 60, mincho: true });
      telop(g, 'この論争に、一石', 430, 765, prog(t, T.ronso, T.ronso + 0.8), { size: 40, color: '@dim' });
      g.restore();
    }

    // ── 5: Mặt Trời → mắt → đau ──
    const o5 = out(t, T.l6 - 0.2), k5 = prog(t, T.taiyo - 0.1, T.taiyo + 0.6);
    if (k5 > 0 && o5 < 1) {
      g.save(); g.translate(-1900 * o5, 0);
      const sx = 480, sy = 560, ex = 1180, R = 150, ks = outBack(k5);
      spot(g, sx, sy, 330, { nm: 'white', a: 0.42 * k5 });
      g.save(); g.translate(sx, sy); g.scale(ks, ks);
      const sg = g.createRadialGradient(0, 0, 0, 0, 0, 96); sg.addColorStop(0, '#FFFFFF'); sg.addColorStop(0.8, '#F6F2EA'); sg.addColorStop(1, 'rgba(246,242,234,0.9)');
      g.fillStyle = sg; g.beginPath(); g.arc(0, 0, 96, 0, TAU); g.fill(); g.restore();
      const kr = prog(t, T.taiyo + 0.4, T.mitsume + 0.5);
      ray(g, [[sx + 100, sy], [ex - R * 0.93 - 8, sy]], { nm: 'white', w: 9, k: kr });
      const lit = prog(t, T.mitsume + 0.3, T.itaku);
      eye(g, ex, sy, R, { k: prog(t, T.taiyo + 0.1, T.taiyo + 0.8), lit, thick: 0.4 });
      const kp = prog(t, T.itaku - 0.1, T.itaku + 0.5);                          // đau: vạch xoè quanh mắt, nhấp theo t
      if (kp > 0) for (let i = 0; i < 9; i++) {
        const a = (-100 + i * 25) * DEG + 0.0, pul = 0.75 + 0.25 * Math.sin(t * 9 + i * 1.7), r0 = R + 38, r1 = r0 + 46 * kp * pul;
        g.save(); g.strokeStyle = ink('@ink'); g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
        g.moveTo(ex + Math.cos(a) * r0 * 1.05, sy + Math.sin(a) * r0); g.lineTo(ex + Math.cos(a) * r1 * 1.05, sy + Math.sin(a) * r1); g.stroke(); g.restore();
      }
      telop(g, '目が痛くなる', 1180, 800, prog(t, T.itaku, T.itaku + 0.8), { size: 52, align: 'center' });
      telop(g, '目が光を出すだけなら、なぜ痛む？', 960, 915, prog(t, T.dasu - 0.1, T.naze + 1.2), { size: 48, mincho: true, align: 'center' });
      g.restore();
    }

    // ── 6: ba lỗ → vật → 四方 → một tia vào mắt ──
    if (t >= T.l6 - 0.1) {
      const ax = 900, ay = 620, kb = prog(t, T.mono - 0.3, T.mono + 0.9);
      for (const hy of [270, 360, 450]) ray(g, [[92, hy], [ax - 62, ay + (hy - 360) * 0.12]], { nm: 'white', w: 6, k: hy === 270 ? kb * (1 - smooth(prog(t, T.ichibu, T.ichibu + 0.8))) : kb, a: 0.9 });
      const cov = smooth(prog(t, T.ichibu, T.ichibu + 0.8));                  // che một đèn → vệt của nó tắt
      if (cov > 0) { g.save(); g.fillStyle = 'rgba(20,19,23,0.97)'; g.strokeStyle = ink('@dim'); g.lineWidth = 3; g.beginPath(); g.roundRect(100, 232, 44, 76, 6); g.fill(); g.stroke(); g.restore(); }
      const kp = prog(t, T.mono + 0.5, T.mono + 1.1);
      if (kp > 0) {
        spot(g, ax, ay, 150, { nm: 'white', a: 0.25 * kp });
        g.save(); g.translate(ax, ay); g.scale(outBack(kp), outBack(kp)); g.translate(-ax, -ay); apple(g, ax, ay, 56, { lit: 0.95 }); g.restore();
      }
      const ks = prog(t, T.shiho - 0.1, T.shiho + 1.1);
      for (const d of [-135, -90, -45, 45, 90, 135, 180]) {
        const a = d * DEG, r0 = 74, r1 = r0 + 120;
        ray(g, [[ax + Math.cos(a) * r0, ay + Math.sin(a) * r0], [ax + Math.cos(a) * r1, ay + Math.sin(a) * r1]], { nm: 'white', w: 4, k: ks, a: 0.7 });
      }
      const ex = 1572, R = 140, ke = prog(t, T.goku - 0.4, T.goku + 0.4);
      eye(g, ex, ay, R, { k: ke, lit: prog(t, T.goku + 0.9, T.goku + 1.4) });
      ray(g, [[ax + 74, ay], [ex - R * 0.93 - 6, ay]], { nm: 'white', w: 6, k: prog(t, T.goku - 0.2, T.goku + 1.0) });
      telop(g, 'ものから四方へ', 1230, 330, prog(t, T.shiho, T.shiho + 0.8), { size: 44 });
      telop(g, 'そのごく一部が目に入る', 1270, 420, prog(t, T.goku, T.goku + 0.9), { size: 44 });
      const bw = wrong(g, '目から光が出る', 960, 865, prog(t, T.me2 - 0.2, T.me2 + 0.6), { size: 44, align: 'center' });
      strike(g, bw, prog(t, T.uketoru - 0.3, T.uketoru + 0.1));
      telop(g, '目は受け取るだけ', 960, 965, prog(t, T.uketoru + 0.1, T.uketoru + 1.0), { size: 60, mincho: true, align: 'center' });
    }
  }
}
