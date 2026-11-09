// b1 · 目から光が出る？ (p2 câu 0–3) — ERA darkroom, mở hồi 1, cảnh đầu p2: từ ĐEN sau intro (dark 0 → 1), lỗ 節穴 + chùm bụi.
//  0 「光とは何か」「2000年以上前から」 + mũi tên thời gian · 1 bảng TRÁI: mắt phát tia (nét đứt xám, hình quạt đèn pin) — sai
//  2 bảng PHẢI: vật được chiếu, lớp 「写し」 bong ra bay vào mắt · 3 ✗ cạnh CẢ HAI bảng, bảng phải sáng lên: 「近かったのは、あとのほう」
// Mắt vẽ cục bộ (eyeIcon, nét trung tính); quả táo / chùm / quầng từ kit. Mốc chỉ theo chữ (w(i,'từ')).
import { C, TAU, clamp, prog, lookup, smooth, outBack, outCubic, ground, aperture, shaft, spot, apple, arrow, cross, telop, title, plate, ink,
  actCard, actCues, actTimes, dark, cue, JP, MIN } from '../kit.js';

const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const LP = { x: 140, y: 270, w: 760, h: 640 }, RP = { x: 980, y: 270, w: 844, h: 640 };

/** Mắt trung tính (nét 生成り): hạnh nhân + đồng tử; dir ±1 hướng nhìn; squint 0..1 nheo. */
function eyeIcon(g, x, y, s, { dir = 1, a = 1, squint = 0 } = {}) {
  const hh = s * 0.27 * (1 - 0.75 * squint);
  g.save(); g.globalAlpha = a; g.strokeStyle = ink('@ink'); g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x - s / 2, y); g.quadraticCurveTo(x, y - hh * 2, x + s / 2, y); g.quadraticCurveTo(x, y + hh * 2, x - s / 2, y); g.closePath(); g.stroke();
  g.fillStyle = ink('@ink'); g.beginPath(); g.arc(x + dir * s * 0.1, y, s * 0.12 * (1 - 0.5 * squint), 0, TAU); g.fill();
  g.restore();
}
/** Bảng: tấm tối viền mảnh, mở bằng vệt sáng quét từ trái (clip theo k). */
function panel(g, P, k) {
  if (k <= 0) return;
  g.save(); g.beginPath(); g.rect(P.x - 6, P.y - 6, (P.w + 12) * smooth(k), P.h + 12); g.clip();
  plate(g, P.x, P.y, P.w, P.h, { a: 0.9, ring: true }); g.restore();
}

export default class MeKara {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1-me-kara');
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                                           // cảnh đầu p2: mở từ đen
    this.T = {
      nani: w(0, '何'), y2000: w(0, '2000年'), kangaete: w(0, '考えて'),
      l1: L(1).start, euk: w(1, 'ユークリッドたち'), me1: w(1, '目'), miru: w(1, '見る'), kaichu: w(1, '懐中'),
      l2: L(2).start, dem: w(2, 'デモクリトスたち'), mono: w(2, 'もの'), utsushi: w(2, '写し'), hagare: w(2, 'はがれて'), me2: w(2, '目'),
      l3: L(3).start, dochira: w(3, 'どちら'), chika: w(3, '近かった'), end: L(3).end,
    };
    this.T.titleAt = actTimes(this.FROM, this.START).o1 - 0.2;
    this.T.introOut = this.T.l1 - 0.2;
  }
  sfx() {
    const T = this.T;
    return [...actCues(this.FROM, this.START),
      cue(T.y2000, 'telop'), cue(T.l1 + 0.1, 'hole', -4), cue(T.miru, 'telop', -2), cue(T.kaichu, 'beam', -6), cue(T.kangaete, 'tick', -4),
      cue(T.l2 + 0.1, 'step', -4), cue(T.hagare, 'photon', -2), cue(T.dochira + 0.3, 'step', -2), cue(T.chika, 'beam', -3)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');
    aperture(g, 'knot', { open: smooth(prog(t, F + 0.25, F + 0.9)) });
    shaft(g, 92, 360, 1800, 285, 1800, 435, { a: 0.09, k: prog(t, F + 0.55, F + 1.9), t, dust: 60, seed: 5, spot: false });
    actCard(g, t, F, this.START, 1);
    title(g, '目から光が出る？', t, T.titleAt, { act: 1 });

    // ── 0: 「光とは何か」 + 2000年 ──
    const oI = out(t, T.introOut, 0.6);
    if (oI < 1) {
      const A = actTimes(F, this.START), at = Math.max(T.nani, A.o0 + 0.2);
      g.save(); g.translate(-1900 * oI, 0);
      telop(g, '光とは何か', 140, 480, prog(t, at, at + 0.9), { size: 84, mincho: true });
      telop(g, '2000年以上前から', 140, 590, prog(t, T.y2000, T.y2000 + 0.9), { size: 52 });
      const ka = prog(t, T.y2000 + 0.3, T.kangaete + 0.3);
      arrow(g, [[1700, 730], [1700 - 1560 * ka, 730]], ka, { color: '@dim', w: 5, head: 18 });
      telop(g, '人類の問い', 140, 830, prog(t, T.kangaete, T.kangaete + 0.8), { size: 44, color: '@dim' });
      g.restore();
    }

    // ── 1: bảng TRÁI — mắt phát tia ──
    const kL = prog(t, T.l1 - 0.05, T.l1 + 0.8), dimL = smooth(prog(t, T.chika - 0.3, T.chika + 0.5));
    if (kL > 0) {
      panel(g, LP, kL);
      const ex = LP.x + 150, ey = LP.y + 330;
      telop(g, [['ユークリッドたち', `700 44px ${JP}`], ['（古代ギリシャ）', `500 32px ${JP}`, '@dim']], LP.x + 30, LP.y + 72, prog(t, T.euk, T.euk + 0.9));
      const ke = prog(t, T.me1 - 0.1, T.me1 + 0.4);
      if (ke > 0) { g.save(); g.translate(ex, ey); g.scale(outBack(ke), outBack(ke)); g.translate(-ex, -ey); eyeIcon(g, ex, ey, 130, { dir: 1 }); g.restore(); }
      const kr = prog(t, T.miru - 0.1, T.kaichu + 1.2);                       // quạt đèn pin: các tia nét đứt bay ra từ mắt
      for (const dy of [-95, 0, 95]) arrow(g, [[ex + 80, ey + dy * 0.12], [LP.x + 600, ey + dy]], kr, { color: '@dim', w: 5, head: 14, dash: [16, 12] });
      if (ke > 0) {                                                            // vật bị "nhìn" (khung trung tính)
        g.save(); g.strokeStyle = ink('@dim'); g.lineWidth = 5; g.beginPath(); g.roundRect(LP.x + 618, ey - 60, 100, 120, 14); g.stroke(); g.restore();
      }
      telop(g, '目から『見る光線』が出る？', LP.x + 30, LP.y + 590, prog(t, T.miru, T.miru + 0.9), { size: 40 });
      cross(g, LP.x + LP.w - 50, LP.y + 62, 14, prog(t, T.dochira + 0.2, T.dochira + 0.6));
      if (dimL > 0) { g.save(); g.fillStyle = `rgba(11,11,14,${0.62 * dimL})`; g.beginPath(); g.roundRect(LP.x, LP.y, LP.w, LP.h, 10); g.fill(); g.restore(); }
    }

    // ── 2: bảng PHẢI — 「写し」 bay vào mắt ──
    const kR = prog(t, T.l2 - 0.05, T.l2 + 0.8);
    if (kR > 0) {
      panel(g, RP, kR);
      const ax = RP.x + 190, ay = 600, ex = RP.x + 700;
      telop(g, 'デモクリトスたち', RP.x + 30, RP.y + 72, prog(t, T.dem, T.dem + 0.9));
      const kp = prog(t, T.mono - 0.1, T.mono + 0.5);
      if (kp > 0) {
        spot(g, ax, ay, 150, { nm: 'white', a: 0.22 * kp });
        g.save(); g.translate(ax, ay); g.scale(outBack(kp), outBack(kp)); g.translate(-ax, -ay); apple(g, ax, ay, 62, { lit: 0.95 }); g.restore();
      }
      const ke = prog(t, T.me2 - 0.1, T.me2 + 0.4);
      if (ke > 0) { g.save(); g.translate(ex, ay); g.scale(outBack(ke), outBack(ke)); g.translate(-ex, -ay); eyeIcon(g, ex, ay, 130, { dir: -1 }); g.restore(); }
      if (t >= T.hagare) for (let i = 0; i < 3; i++) {                        // 「写し」: lớp mỏng bong khỏi vật, bay vào mắt (hàm của t)
        const u = (((t - T.hagare) * 0.5 + i / 3) % 1 + 1) % 1, x0 = ax + 80, x1 = ex - 80, x = x0 + (x1 - x0) * u, y = ay + 22 * Math.sin(u * TAU * 2 + i);
        const al = Math.sin(Math.PI * u) * Math.min(1, (t - T.hagare) * 2);
        g.save(); g.globalAlpha = 0.85 * al; g.strokeStyle = ink('@ink'); g.fillStyle = 'rgba(237,232,223,0.12)'; g.lineWidth = 4; g.setLineDash([10, 8]);
        g.beginPath(); g.arc(x, y, 50 * (1 - 0.25 * u), 0, TAU); g.fill(); g.stroke(); g.restore();
      }
      telop(g, 'ものから『写し』が飛び込む？', RP.x + 30, RP.y + 590, prog(t, T.utsushi, T.utsushi + 0.9), { size: 40 });
      cross(g, RP.x + RP.w - 50, RP.y + 62, 14, prog(t, T.dochira + 0.2, T.dochira + 0.6));
      const kh = prog(t, T.chika - 0.1, T.chika + 0.5);                       // sáng lên bằng vòng mảnh 生成り
      if (kh > 0) { g.save(); g.strokeStyle = ink('@ink'); g.globalAlpha = kh; g.lineWidth = 4; g.beginPath(); g.roundRect(RP.x - 6, RP.y - 6, RP.w + 12, RP.h + 12, 14); g.stroke(); g.restore(); }
    }
    telop(g, '近かったのは、あとのほう', 960, 985, prog(t, T.chika, T.chika + 1.0), { size: 56, mincho: true, align: 'center' });
    dark(g, prog(t, F, F + 0.8));
  }
}
