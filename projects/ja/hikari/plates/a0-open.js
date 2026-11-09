// a0 · Cold open (p1 câu 0–12) — ERA darkroom, FROM = −0.5 (trang mở trong bóng tối). Bố cục = sf1 (kit-test.html): 節穴 ở y 300,
// luồng tới BÀN TÁO (1150, 880), bó sóng nhiều màu bay trong luồng, mascot `ponder` bên phải.
//  l0 chấm sáng ở lỗ → luồng vươn tới táo → 「毎秒 何十兆個もの / 光の粒」 → mắt (nét trung tính) + bó sóng bay vào mắt
//  l1 「外にいるなら」「8分19秒前に太陽を出た光」(SUN_S) · l2 sơ đồ ☉ — 1億5000万km — 地球 (photon chạy 秒速30万km)
//  l3 tia trắng lỗ → táo → tia dội (chỉ nm ≥ 600) → mắt · l4 mascot ponder + 「『見る』」 · l5 ba trạm 物理 → 化学 → 脳 nối bằng vệt sáng
//  l6 「バトン＝光」 · l7 bốn khe mở → bốn thẻ ①–④ (mascot `point`), l8–11 thẻ i hiện ở w(8+i, 'iつ目') + gạch chân từ khoá
//  l12 「思いがけない場所」 → thẻ + luồng tắt, 節穴 khép, phòng về đen (→ intro).
// Mọi mốc từ chữ (L / w); số lên hình qua kit + must. Chữ chỉ qua telop/write/promiseCards; màu có sắc chỉ qua ánh sáng (ray/photon/apple/spot).
import { C, W, H, TAU, APT, WALL_X, JP, MIN, SUN_S, QUESTIONS, lookup, must, clamp, prog, outCubic, smooth, ground, dark, aperture, shaft, ray, spot, photon, along,
  eye, apple, chabudai, figure, telop, plate, measure, promiseCards, arrow, cue } from '../kit.js';

const AY = 300, TX = 1150;                                  // lỗ (y 300 như sf1), tâm bàn táo
const HOLE = [APT.x, AY];
const EYE = { x: 1640, y: 430, R: 130 };                   // mắt nét trung tính (góc phải-trên); đồng tử ở bên TRÁI
const PUPIL = [EYE.x - EYE.R * 0.93, EYE.y];
const BOUNCE = [[1182, 772], PUPIL];                       // tia dội: táo → mắt
const ST_Y = 500, ST_X = [500, 1010, 1520], ST_W = 300, ST_H = 120;   // ba trạm (l5)
const PATH = [[HOLE[0] + 6, AY], [ST_X[0] - ST_W / 2, ST_Y], [ST_X[2] + ST_W / 2, ST_Y]];   // đường rơ-le của ánh sáng
const NMS = [650, 470, 560, 410, 600, 520, 700, 440];       // bó sóng nhiều màu trong luồng (sf1)
const CARD = { x: 980, y0: 230, h: 150, gap: 36 };         // = promiseCards mặc định

/** Khối chữ trượt ra trái khi hết lượt (rời khung bằng chuyển động). */
const slideOut = (g, t, a, draw) => { const o = outCubic(clamp((t - a) / 0.6)); if (o >= 1) return; g.save(); g.beginPath(); g.rect(WALL_X, 0, W - WALL_X, H); g.clip(); g.translate(-1200 * o, 0); draw(); g.restore(); };
/** Gạch chân (trung tính) dưới một cụm trong chữ thẻ i: quét dần theo k. */
function underline(g, i, part, k) {
  if (k <= 0) return;
  const text = QUESTIONS[i], at = text.indexOf(part); if (at < 0) throw new Error(`a0: "${part}" không có trong thẻ ${i + 1}`);
  const font = `700 40px ${JP}`, x0 = CARD.x + 110 + measure(g, text.slice(0, at), font), w = measure(g, part, font), y = CARD.y0 + i * (CARD.h + CARD.gap) + CARD.h / 2 + 14 + 10;
  g.save(); g.fillStyle = C.text; g.fillRect(x0, y, w * outCubic(clamp(k)), 4); g.restore();
}

export default class Open {
  static ERA = 'darkroom';
  static IMAGES = {};
  static POSES = ['ponder', 'point'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    this.START = L(0).start;
    this.FROM = -0.5;                                          // trang mở trong bóng tối (LEAD 0.6)
    this.T = {
      ima: w(0, '今'), mai: w(0, '毎秒'), nan: w(0, '何十兆個'), mono: w(0, 'もの'), hikari: w(0, '光'), minna: w(0, '皆さん'), me0: w(0, '目'), tobi: w(0, '飛び込んで'),
      l1: L(1).start, soto: w(1, '外'), hachi: w(1, '8分'), deta: w(1, '出た'),
      l2: L(2).start, oku: w(2, '1億5000万キロ'), shinku: w(2, '真空'), byoku: w(2, '秒速30万キロ'),
      l3: L(3).start, kuuki: w(3, '空気'), mawari: w(3, 'まわり'), hane: w(3, '跳ね返り'), me3: w(3, '目'), end3: L(3).end,
      l4: L(4).start, watashi: w(4, '私'), miru: w(4, '見る'), end4: L(4).end,
      l5: L(5).start, butsuri: w(5, '物理'), kagaku: w(5, '化学'), no: w(5, '脳'), rire: w(5, 'リレー'),
      l6: L(6).start, baton: w(6, 'バトン'), hikari6: w(6, '光'), gaku: w(6, '物理学者たち'), ichiban: w(6, 'いちばん'), nayama: w(6, '悩ませて'), aite: w(6, '相手'),
      l7: L(7).start, yottsu: w(7, '4つ'), end7: L(7).end,
      c: [w(8, '1つ目'), w(9, '2つ目'), w(10, '3つ目'), w(11, '4つ目')],
      u: [w(8, '何'), w(9, 'どこ'), w(10, '外側'), w(10, '見えない'), w(11, '色'), w(11, '見せて')],
      end9: L(9).end,
      l12: L(12).start, kotae: w(12, '答え'), omoi: w(12, '思いがけない'), end: L(12).end,
    };
    // số lên hình
    this.SUN = `${Math.floor(SUN_S / 60)}分${Math.round(SUN_S % 60)}秒`;
    must(`'${this.SUN}'`, '8分19秒');
    must(`${Math.round(149.6e6 / 1e7) * 1e3}`, 15000);       // 1億5000万 km (万 km)
    must(`${Math.round(299792.458 / 1e4)}`, 30);             // 秒速30万 km
    // tín hiệu: thẻ ① phải hiện đủ trước 4つ mở; cả bốn thẻ tới trước L(12)
    must(`${this.T.c[0] > this.T.yottsu}`, true);
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.ima, 'hole'), cue(T.mai, 'telop', -4), cue(T.tobi, 'photon', -4), cue(T.hachi, 'step', -4),
      cue(T.oku, 'beam', -6), cue(T.byoku, 'photon', -4),
      cue(T.kuuki, 'beam', -6), cue(T.hane, 'photon', -4), cue(T.me3, 'arrive', -8),
      cue(T.miru, 'telop', -2),
      cue(T.butsuri, 'step', -4), cue(T.no, 'step', -4), cue(T.rire, 'step', -4), cue(T.baton, 'beam', -4), cue(T.nayama, 'beam', -8),
      cue(T.l7 + 0.05, 'wave', -8), cue(T.yottsu, 'hole'),
      cue(T.c[0], 'card'), cue(T.c[1], 'card'), cue(T.c[2], 'card'), cue(T.c[3], 'card'),
      cue(T.u[2], 'step', -8), cue(T.u[3], 'step', -8), cue(T.u[4], 'step', -8), cue(T.u[5], 'step', -8),
      cue(T.kotae, 'beam', -4), cue(T.end + 0.1, 'hole', -4),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'darkroom');

    // ── lỗ + luồng + bàn táo (l0) ──
    const knotClose = prog(t, T.end, T.end + 0.7);
    aperture(g, 'knot', { y: AY, open: outCubic(prog(t, F + 0.25, T.ima + 0.5)) * (1 - knotClose) });
    const rB = outCubic(prog(t, T.l5 - 0.1, T.l5 + 0.9));                    // l5: luồng rút, bàn táo chìm xuống
    const kS = outCubic(prog(t, T.ima + 0.15, T.ima + 1.5)) * (1 - rB);
    if (kS > 0) shaft(g, APT.x, AY, TX - 175, 872, TX + 165, 872, { a: 0.2 * (1 - 0.6 * rB), k: kS, t, dust: 110, spot: false });
    const kT = prog(kS / Math.max(1e-6, 1 - rB), 0.75, 1) * (1 - rB);
    if (kT > 0) {
      g.save(); g.translate(0, 200 * rB); g.globalAlpha = kT;
      chabudai(g, TX, 880, 380, { lit: 0.9 });
      spot(g, TX, 872, 230, { a: 0.35, sy: 0.16 });
      apple(g, TX, 812, 50, { lit: 1 });
      g.restore();
    }
    // bó sóng nhiều màu bay trong luồng (trắng = mọi màu)
    if (kS > 0.6) {
      const dir = Math.atan2(860 - AY, TX - APT.x);
      NMS.forEach((nm, i) => {
        const u = (0.12 + i * 0.1 + t * 0.03) % 0.88, x = APT.x + (TX - APT.x) * u, y = AY + (860 - AY) * u + (((Math.sin(i * 127.1 + 3.7) * 43758.5453) % 1 + 1) % 1 - 0.5) * 70 * u;
        const al = prog(t, T.mai + 0.15 * i, T.mai + 0.15 * i + 0.4) * (1 - rB);
        if (al > 0) photon(g, x, y, nm, { dir, size: 34, amp: 8, w: 4, phase: t * 9 + i, scale: 0.045, a: al });
      });
    }

    // ── mắt (nét trung tính) + tia từ táo vào mắt ──
    const eOut = outCubic(prog(t, T.l4 - 0.2, T.l4 + 0.6));
    const kE = prog(t, T.minna, T.minna + 0.7) * (1 - eOut);
    if (kE > 0) {
      g.save(); g.translate(520 * eOut, 0); g.globalAlpha = 1;
      eye(g, EYE.x, EYE.y, EYE.R, { k: kE, thick: 0.4 });
      telop(g, '皆さんの目', EYE.x, 640, prog(t, T.me0, T.me0 + 0.6), { size: 40, align: 'center' });
      // l0: bó sóng bay vào mắt, xuất phát từ mặt táo
      [650, 620, 690, 600].forEach((nm, i) => {
        const u = (t - (T.tobi + 0.28 * i)) / 0.9; if (u <= 0 || u >= 1) return;
        const p = along(BOUNCE, outCubic(u)), a = clamp(u * 8) * (1 - smooth(clamp((u - 0.85) / 0.15)));
        photon(g, p[0], p[1], nm, { dir: Math.atan2(PUPIL[1] - BOUNCE[0][1], PUPIL[0] - BOUNCE[0][0]), size: 30, amp: 7, w: 4, phase: t * 9 + i, scale: 0.045, a });
      });
      // l3: tia trắng lỗ → táo (đi theo luồng), tia dội sợi đỏ (nm ≥ 600) → mắt
      const kW = prog(t, T.kuuki, T.hane - 0.2), kR = prog(t, T.hane, T.me3 - 0.1), aR = 1 - prog(t, T.end3 + 0.1, T.end3 + 0.6);
      g.restore();
      if (kW > 0) ray(g, [[HOLE[0] + 6, AY], [TX - 38, 790]], { nm: 'white', w: 5, k: kW, a: 0.9 * (1 - rB) });
      if (kR > 0 && aR > 0) { g.save(); g.translate(520 * eOut, 0); [[610, -16], [650, 0], [690, 16]].forEach(([nm, d]) => ray(g, [[BOUNCE[0][0] + d, BOUNCE[0][1] + d * 0.3], [PUPIL[0], PUPIL[1] + d * 0.9]], { nm, w: 4, k: kR, a: aR })); g.restore(); }
    }

    // ── chữ trái-dưới: nhóm A (l0), nhóm B (l1) ──
    slideOut(g, t, T.l1, () => {
      telop(g, '毎秒　何十兆個もの', 140, 760, prog(t, T.mai - 0.05, T.mono + 0.25), { size: 64, weight: 900 });
      telop(g, '光の粒', 140, 852, prog(t, T.hikari - 0.05, T.hikari + 0.8), { size: 76, mincho: true });
    });
    if (t > T.soto - 0.1) slideOut(g, t, T.l2 + 0.3, () => {
      telop(g, '外にいるなら', 140, 790, prog(t, T.soto + 0.2, T.soto + 0.9), { size: 40, color: '@dim' });
      telop(g, `約${this.SUN}前に太陽を出た光`, 140, 868, prog(t, T.hachi, T.deta + 0.4), { size: 50, weight: 700 });
    });

    // ── l2: sơ đồ ☉ — 1億5000万km — 地球 ──
    if (t > T.l2 - 0.1) {
      const o = outCubic(clamp((t - (T.l3 + 0.1)) / 0.6));
      if (o < 1) {
        g.save(); g.translate(0, -420 * o);
        const kS2 = prog(t, T.l2 + 0.05, T.l2 + 0.8), kL = prog(t, T.oku, T.oku + 1.0);
        if (kS2 > 0) { spot(g, 240, 190, 90 * kS2, { nm: 'white', a: 0.9 }); g.save(); g.fillStyle = '#FFFDF8'; g.beginPath(); g.arc(240, 190, 30 * kS2, 0, TAU); g.fill(); g.restore();
          telop(g, '太陽', 240, 262, kS2, { size: 32, color: '@dim', align: 'center' }); }
        if (kL > 0) {
          arrow(g, [[300, 190], [1086, 190]], kL, { color: '@dim', w: 4, dash: [14, 12], head: 0 });
          g.save(); g.fillStyle = C.struct; g.strokeStyle = C.dim; g.lineWidth = 4; g.beginPath(); g.arc(1130, 190, 24 * clamp(kL * 3), 0, TAU); g.fill(); g.stroke(); g.restore();
          telop(g, '地球', 1130, 262, clamp(kL * 2 - 0.5), { size: 32, color: '@dim', align: 'center' });
        }
        telop(g, '1億5000万km', 690, 148, prog(t, T.oku, T.oku + 0.9), { size: 46, align: 'center' });
        telop(g, '真空', 420, 262, prog(t, T.shinku, T.shinku + 0.5), { size: 34, color: '@dim', align: 'center' });
        telop(g, '秒速30万km', 900, 262, prog(t, T.byoku, T.byoku + 0.9), { size: 46, align: 'center' });
        // photon chạy từ ☉ tới 地球 sau 秒速30万キロ
        for (let i = 0; i < 3; i++) { const u = (t - (T.byoku + 0.7 * i)) / 2.2; if (u <= 0 || u >= 1) continue;
          const p = along([[300, 190], [1086, 190]], u); photon(g, p[0], p[1], ['white', 560, 'white'][i], { size: 26, amp: 7, w: 4, phase: t * 9 + i, scale: 0.045, a: clamp(u * 6) * (1 - smooth(clamp((u - 0.9) / 0.1))) }); }
        g.restore();
      }
    }
    // ── l3: nhãn ──
    if (t > T.kuuki - 0.1 && t < T.l5) {
      const o = outCubic(clamp((t - (T.l4 - 0.2)) / 0.6));
      if (o < 1) { g.save(); g.translate(-1200 * o, 0);
        telop(g, '空気', 330, 346, prog(t, T.kuuki, T.kuuki + 0.5), { size: 40, color: '@dim' });
        telop(g, 'まわりのもの', 1170, 692, prog(t, T.mawari, T.mawari + 0.8), { size: 40, color: '@dim', align: 'right' });
        g.restore(); }
    }

    // ── l4: mascot ponder + 「『見る』」 ──
    {
      const kM = prog(t, T.l4 - 0.1, T.l4 + 0.7), sink = outCubic(prog(t, T.l5 - 0.8, T.l5 - 0.1));
      slideOut(g, t, T.l5 - 0.3, () => {
        if (t > T.watashi - 0.1) {
          telop(g, '私たちは、それを', 140, 790, prog(t, T.watashi, T.watashi + 0.9), { size: 40, color: '@dim' });
          telop(g, '『見る』', 140, 880, prog(t, T.miru - 0.05, T.miru + 0.7), { size: 72, mincho: true });
        } });
      if (kM > 0 && sink < 1) { g.save(); g.translate(0, 900 * sink); figure(g, 'ponder', 1590, H, 800, kM, { flip: true, t }); g.restore(); }
    }

    // ── l5–l6: ba trạm + rơ-le ──
    if (t > T.l5 - 0.1) {
      const exit = outCubic(prog(t, T.l7 - 0.15, T.l7 + 0.7));
      if (exit < 1) {
        g.save(); g.translate(0, -900 * exit);
        const kr = [prog(t, T.l5 + 0.15, T.butsuri + 0.15), prog(t, T.butsuri + 0.15, T.kagaku + 0.1), prog(t, T.kagaku + 0.1, T.no + 0.1)];
        ray(g, [PATH[0], [ST_X[0] - ST_W / 2, ST_Y]], { nm: 'white', w: 6, k: kr[0] });
        ray(g, [[ST_X[0] + ST_W / 2, ST_Y], [ST_X[1] - ST_W / 2, ST_Y]], { nm: 'white', w: 6, k: kr[1] });
        ray(g, [[ST_X[1] + ST_W / 2, ST_Y], [ST_X[2] - ST_W / 2, ST_Y]], { nm: 'white', w: 6, k: kr[2] });
        [['物理', T.butsuri], ['化学', T.kagaku], ['脳', T.no]].forEach(([s, a], i) => {
          const k = prog(t, a - 0.1, a + 0.5), x = ST_X[i] - ST_W / 2;
          if (k > 0) { g.save(); g.globalAlpha = k; plate(g, x, ST_Y - ST_H / 2, ST_W, ST_H, { a: 0.95, ring: true }); g.restore();
            telop(g, s, ST_X[i], ST_Y + 22, prog(t, a, a + 0.6), { size: 64, align: 'center', mincho: true }); }
        });
        // baton: điểm sáng chạy dọc đường rơ-le (từ バトン), lặp 2.6 s
        if (t > T.baton) {
          const u = ((t - T.baton) / 2.6) % 1, p = along(PATH, u), a = prog(t, T.baton, T.baton + 0.3);
          spot(g, p[0], p[1], 80, { nm: 'white', a: 0.85 * a }); g.save(); g.fillStyle = `rgba(255,253,248,${a})`; g.beginPath(); g.arc(p[0], p[1], 11, 0, TAU); g.fill(); g.restore();
        }
        telop(g, 'リレー', 960, 370, prog(t, T.rire, T.rire + 0.7), { size: 60, mincho: true, align: 'center' });
        telop(g, 'バトン＝光', 960, 730, prog(t, T.baton - 0.05, T.hikari6 + 0.4), { size: 76, mincho: true, align: 'center' });
        telop(g, '物理学者たちを、いちばん長く悩ませてきた', 960, 880, prog(t, T.gaku, T.aite + 0.2), { size: 44, color: '@dim', align: 'center' });
        g.restore();
      }
    }

    // ── l7–l12: bốn khe → bốn thẻ ──
    if (t > T.yottsu - 0.2) {
      const fadeOut = 1 - outCubic(prog(t, T.end, T.end + 0.6));
      const lit = [0, 1, 2, 3].map(i => {
        const a = T.yottsu + 0.12 * i, up = prog(t, T.c[i] - 0.4, T.c[i]);
        return 0.35 * outCubic(prog(t, a, a + 0.3)) + 0.65 * up;
      });
      const k = [0, 1, 2, 3].map(i => prog(t, T.c[i], T.c[i] + 0.5));
      g.save(); g.globalAlpha = fadeOut;
      promiseCards(g, { k, lit, t });
      underline(g, 0, '何', prog(t, T.u[0], T.u[0] + 0.5));
      underline(g, 1, 'どこ', prog(t, T.u[1], T.u[1] + 0.5));
      underline(g, 2, '虹の外', prog(t, T.u[2] - 0.5, T.u[2] + 0.5));
      underline(g, 2, '見えない', prog(t, T.u[3], T.u[3] + 0.6));
      underline(g, 3, '「色」', prog(t, T.u[4], T.u[4] + 0.5));
      underline(g, 3, 'になる', prog(t, T.u[5], T.u[5] + 0.5));
      telop(g, '4つの問い', 140, 168, prog(t, T.yottsu - 0.1, T.yottsu + 0.8), { size: 64, mincho: true });
      telop(g, '思いがけない場所', CARD.x + 110, 992, prog(t, T.kotae, T.omoi + 0.7), { size: 48, color: '@dim' });
      g.restore();
      // mascot point (nói) chỉ sang thẻ
      const kM = prog(t, T.yottsu - 0.1, T.yottsu + 0.6), sink = outCubic(prog(t, T.u[5] + 0.3, T.u[5] + 1.0));
      if (kM > 0 && sink < 1) { g.save(); g.translate(0, 700 * sink); figure(g, 'point', 510, H, 600, kM, { t }); g.restore(); }
    }

    // ── cuối: phòng về đen (→ intro) ──
    dark(g, clamp(prog(t, F, F + 0.5)) * (1 - prog(t, T.end, T.end + 1.0)));
  }
}
