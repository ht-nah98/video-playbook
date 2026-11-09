// c3 · アインシュタインの光の粒 (p2 câu 29–40). ERA lab. Khe 'slit' y = 580. Bốn khối (chữ cũ rút khi khối mới vào):
//  A (29–32) 1905年 + ảnh · chùm vỡ thành chuỗi photon · ∝ · 1.77 eV / 3.1 eV · electron nhận ĐÚNG một photon
//  B (33–35) tường (塀) + bóng: đỏ yếu ×1000 không qua, tím mạnh 1 quả qua; 赤=yếu · 紫=mạnh · sáng = ném nhiều
//  C (36–38) 1921 ノーベル物理学賞 (huy chương trơn) + nguyên văn lý do · 相対性理論 ✗ · 1922年11月 con tàu → 日本
//  D (39–40) sóng khi đi, hạt khi chạm · chốt: bước sóng ngắn = 1 photon nhiều năng lượng · 鍵
import { C, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, aperture, shaft, ray, wave, photon, arrow, cross, telop, wrong, strike,
  title, plate, photo, imgs, measure, cue, eV, fmt, JP, MIN } from '../kit.js';

const PH_RED = 650, PH_VIO = 400;
const EV_R = `${fmt(eV(PH_RED), 1)} eV`, EV_V = `${fmt(eV(PH_VIO), 1)} eV`;
must(`'${fmt(eV(PH_RED), 1)}'`, '1.9'); must(`'${fmt(eV(PH_VIO), 1)}'`, '3.1');
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const Y0 = 580, WX = 1150;                                   // khe; tâm tường

function row(g, s, x, y, k, o = {}) {
  if (k <= 0) return null;
  const size = o.size ?? 44, font = `700 ${size}px ${o.mincho ? MIN : JP}`, w = measure(g, s, font);
  plate(g, x - 18, y - size * 0.98, w + 36, size * 1.42, { a: 0.82 * Math.min(1, k * 5) });
  return (o.wrong ? wrong : telop)(g, s, x, y, k, o);
}
const slab = (g, x, y0, y1) => {
  const gr = g.createLinearGradient(x - 24, 0, x + 24, 0); gr.addColorStop(0, '#4A4743'); gr.addColorStop(0.5, '#34322F'); gr.addColorStop(1, '#232120');
  g.save(); g.fillStyle = gr; g.fillRect(x - 24, y0, 48, y1 - y0); g.strokeStyle = C.dim; g.lineWidth = 2; g.strokeRect(x - 24, y0, 48, y1 - y0); g.restore();
};
const dot = (g, x, y, a = 1, r = 8) => { g.save(); g.fillStyle = `rgba(237,232,223,${a})`; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore(); };
/** Bóng (photon nhỏ) ném qua tường: pass = true → vòng cung cao, bay qua; false → thấp, đập chân tường rồi rơi lại. */
function ball(g, t, t0, nm, pass) {
  const u = (t - t0) / 1.2; if (u < 0 || u > 1.4) return;
  let x, y, a = 1, dir;
  if (pass) { if (u > 1) return; x = 450 + 1300 * u; y = 820 - 4 * 640 * u * (1 - u); dir = Math.atan2(-4 * 640 * (1 - 2 * u), 1300); a = 1 - smooth(clamp((u - 0.85) / 0.15)); }
  else if (u <= 1) { x = 450 + 690 * u; y = 820 - 4 * 210 * u * (1 - u); dir = Math.atan2(-4 * 210 * (1 - 2 * u), 690); }
  else { x = WX - 24 - 14 - 140 * (u - 1); y = 820; dir = Math.PI; a = 1 - clamp((u - 1) / 0.4); }
  photon(g, x, y, nm, { size: 34, amp: 10, scale: 0.05, dir, phase: -t * 12, a, w: 4 });
}
function ship(g, x, y, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = Math.min(1, k * 3); g.strokeStyle = C.text; g.fillStyle = '#1A1917'; g.lineWidth = 5; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x - 150, y - 50); g.lineTo(x + 170, y - 50); g.lineTo(x + 120, y + 10); g.lineTo(x - 110, y + 10); g.closePath(); g.fill(); g.stroke();
  g.fillRect(x - 60, y - 100, 110, 50); g.strokeRect(x - 60, y - 100, 110, 50);
  g.fillRect(x - 10, y - 150, 36, 50); g.strokeRect(x - 10, y - 150, 36, 50);
  g.strokeStyle = C.dim; g.lineWidth = 4; g.beginPath(); for (let i = -4; i <= 40; i++) { const px = x - 260 + i * 16, py = y + 22 + Math.sin(i * 0.9 + x * 0.02) * 6; i === -4 ? g.moveTo(px, py) : g.lineTo(px, py); } g.stroke();
  g.restore();
}
function medal(g, cx, cy, k) {
  if (k <= 0) return;
  g.save(); g.translate(cx, cy); const s = outCubic(k); g.scale(s, s);
  g.fillStyle = '#3A3835'; g.beginPath(); g.moveTo(-60, -240); g.lineTo(0, -110); g.lineTo(60, -240); g.closePath(); g.fill();        // dải
  const gr = g.createRadialGradient(-40, -40, 10, 0, 0, 140); gr.addColorStop(0, '#9A958C'); gr.addColorStop(0.6, '#5E5A53'); gr.addColorStop(1, '#3A3835');
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 130, 0, TAU); g.fill();
  g.strokeStyle = C.text; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 112, 0, TAU); g.stroke();
  g.strokeStyle = C.dim; g.lineWidth = 3; for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; g.beginPath(); g.moveTo(Math.cos(a) * 60, Math.sin(a) * 60); g.lineTo(Math.cos(a) * 96, Math.sin(a) * 96); g.stroke(); }
  g.restore();
}

export default class Einstein {
  static ERA = 'lab';
  static IMAGES = imgs('einstein-1921');
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3-einstein');
    this.START = L(29).start;
    this.FROM = Math.max(this.START - 1.2, L(28).end + 0.5);
    const T = this.T = {
      y1905: w(29, '1905年'), einstein: w(29, 'アインシュタイン'),
      l30: L(30).start, hito: w(30, 'ひとかたまり'), tsubu: w(30, '粒'), koshi: w(30, '光子'), kotoba: w(30, '言葉'),
      l31: L(31).start, hirei: w(31, '比例'), oki1: w(31, '大きい', 2), mijikai31: w(31, '短い'),
      l32: L(32).start, denshi: w(32, '電子'), koshi32: w(32, '光子'), ko1: w(32, '1個'),
      hei: w(33, '塀'), yowai: w(33, '弱い'), sen: w(33, '1000個'), koemasen: w(33, '越えません'),
      tsuyoi: w(34, '強い'), koemasu: w(34, '越えます', 1), takusan: w(34, 'たくさん', 1), takusan2: w(34, 'たくさん', 2),
      l35: L(35).start, akai: w(35, '赤い'), murasaki: w(35, '紫'), akaruku: w(35, '明るく'), fuyasu: w(35, '増やす'),
      y1921: w(36, '1921年'), nobel: w(36, 'ノーベル'), end36: L(36).end,
      l37: L(37).start, riron: w(37, '理論', 1), kouden: w(37, '光電'), sotai: w(37, '相対性'), namae: w(37, '名前'),
      y1922: w(38, '1922年'), nov: w(38, '11月'), nihon: w(38, '日本'), fune: w(38, '船'), end38: L(38).end,
      l39: L(39).start, nami: w(39, '波', 1), tsubu39: w(39, '粒'), l40: L(40).start, mijikai: w(40, '短い'), kagi: w(40, '鍵'), end: L(40).end,
      jushou: w(37, '受賞'),
    };
    // các lần ném: [t0, nm, pass]
    const th = this.TH = [];
    for (let ti = T.yowai + 0.1; ti < T.koemasen + 0.6; ti += 0.17) th.push([ti, PH_RED, false]);
    th.push([T.tsuyoi + 0.5, PH_VIO, true]);
    for (let ti = T.takusan; ti < T.takusan + 1.9; ti += 0.3) th.push([ti, PH_VIO, true]);
    for (let ti = T.akaruku; ti < T.akaruku + 2.6; ti += 0.13) th.push([ti, PH_RED, false]);
    for (let ti = T.akaruku + 0.05; ti < T.akaruku + 2.6; ti += 0.3) th.push([ti, PH_VIO, true]);
  }
  sfx() {
    const T = this.T;
    return [cue(T.y1905, 'hanko', -4), cue(T.einstein, 'photo'), cue(T.l30 + 0.1, 'telop', -4), cue(T.tsubu, 'beam'), cue(T.koshi, 'telop'),
      cue(T.hirei, 'pen', -4), cue(T.mijikai31, 'photon'), cue(T.denshi, 'step', -4), cue(T.ko1, 'electron'),
      cue(T.hei, 'impact', -8), cue(T.yowai, 'step', -4), cue(T.sen, 'telop'), cue(T.koemasen, 'fail', -6),
      cue(T.tsuyoi, 'step', -4), cue(T.koemasu, 'electron'), cue(T.takusan2, 'electron'), cue(T.murasaki, 'telop', -4), cue(T.akaruku, 'beam', -4), cue(T.fuyasu, 'step', -4),
      cue(T.y1921, 'hanko'), cue(T.nobel, 'nobel'), cue(T.jushou, 'step', -4), cue(T.riron, 'page', -4), cue(T.kouden, 'step', -4), cue(T.namae, 'step', -4),
      cue(T.y1922, 'hanko', -4), cue(T.nov, 'wave', -6), cue(T.fune, 'step'), cue(T.l39 + 0.2, 'beam', -6), cue(T.nami, 'step', -4), cue(T.tsubu39 + 0.9, 'arrive'), cue(T.mijikai, 'impact', -6), cue(T.kagi, 'impact', -3)];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'lab');
    aperture(g, 'slit', { y: Y0 });
    const kBeam = prog(t, F + 0.1, F + 1.4), brk = smooth(prog(t, T.tsubu, T.tsubu + 0.7)), endA = T.denshi - 0.3;
    shaft(g, 92, Y0, 1800, Y0 - 70, 1800, Y0 + 70, { a: 0.07 * (1 - out(t, T.hei - 0.6, 0.6)), k: kBeam, t, dust: 50, seed: 7, spot: false });
    if (t < T.hei) ray(g, [[98, Y0], [1750, Y0]], { nm: 'white', w: 5, k: kBeam, a: (1 - brk) * (1 - out(t, T.hirei - 0.3, 0.4)) });
    title(g, 'アインシュタインの光の粒', t, F + 0.3);

    // ═══ A ═══
    const oA = out(t, T.hei - 0.4, 0.8);
    if (oA < 1) {
      g.save(); g.translate(-1600 * oA, 0);
      row(g, '1905年', 140, 290, prog(t, T.y1905, T.y1905 + 0.7), { size: 64, mincho: true });
      photo(g, 'einstein-1921', 140, 340, 460, prog(t, T.einstein - 0.2, T.einstein + 0.9));
      // chuỗi photon (sau 粒), trôi sang phải
      const oc = out(t, T.hirei - 0.2, 0.6);
      if (brk > 0 && oc < 1) for (let i = 0; i < 6; i++) {
        const x = 680 + ((i * 180 + 150 * (t - T.tsubu)) % 1080), edge = Math.min(1, (x - 680) / 80, (1760 - x) / 80);
        photon(g, x, Y0, 'white', { size: 60, amp: 14, phase: -t * 8, a: brk * (1 - oc) * Math.max(0, edge) });
      }
      const o30 = out(t, T.hirei - 0.3, 0.6);
      if (o30 < 1) { g.save(); g.translate(0, -700 * o30);
        row(g, '光のエネルギーは、ひとかたまりずつ', 700, 300, prog(t, T.l30 + 0.1, T.l30 + 1.4));
        row(g, '光子', 1250, 450, prog(t, T.koshi, T.koshi + 0.8), { size: 72, mincho: true });
        row(g, '今の言葉', 1440, 450, prog(t, T.kotoba, T.kotoba + 0.7), { color: '@dim', size: 40 });
        g.restore(); }
      const o31 = out(t, endA, 0.6);
      row(g, 'エネルギー ∝ 振動数', 700, 300, prog(t, T.hirei, T.hirei + 0.9) * (1 - o31));
      const kr = prog(t, T.mijikai31 - 0.2, T.mijikai31 + 0.5) * (1 - o31);
      if (kr > 0) {
        const mx = (nm, x) => photon(g, x + 40 * (1 - outCubic(kr)), Y0, nm, { size: 70, amp: 18, phase: -t * 6, a: kr });
        mx(PH_RED, 850); mx(PH_VIO, 1330);
        telop(g, EV_R, 850, 690, prog(t, T.mijikai31 + 0.1, T.mijikai31 + 0.8) * (1 - o31), { align: 'center' });
        telop(g, EV_V, 1330, 690, prog(t, T.mijikai31 + 0.5, T.mijikai31 + 1.2) * (1 - o31), { align: 'center' });
        row(g, '波長が短いほど、1個のエネルギーは大きい', 900, 800, prog(t, T.mijikai31, T.mijikai31 + 1.3) * (1 - o31), { size: 40 });
      }
      // câu 32: electron nhận đúng một photon
      const k32 = prog(t, T.denshi - 0.2, T.denshi + 0.5), ej = t - T.ko1;
      if (k32 > 0) {
        slab(g, 1560, 440, 720);
        const px = 1000 + 530 * outCubic(clamp((t - (T.denshi + 0.3)) / (T.ko1 - T.denshi - 0.1)));
        if (ej < 0) { photon(g, px, Y0, PH_VIO, { size: 70, amp: 18, phase: -t * 6, a: k32 }); dot(g, 1520, Y0, k32); }
        else {
          const f = clamp(ej / 1.2); dot(g, 1520 - 380 * f, Y0 - 170 * Math.sin(f * 2.2), 1 - 0.7 * f);
          g.save(); g.globalCompositeOperation = 'lighter'; const fl = clamp(1 - ej / 0.3); if (fl > 0) { g.fillStyle = `rgba(246,242,234,${0.6 * fl})`; g.beginPath(); g.arc(1520, Y0, 40 * (1 + ej * 3), 0, TAU); g.fill(); } g.restore();
        }
        row(g, '電子は、光子を1個ずつしか受け取れない', 900, 880, prog(t, T.koshi32, T.koshi32 + 1.4), { size: 44 });
      }
      g.restore();
    }

    // ═══ B ═══
    const oB = out(t, T.y1921 - 0.4, 0.8), kw = prog(t, T.hei, T.hei + 0.6);
    if (kw > 0 && oB < 1) {
      g.save(); g.translate(0, 900 * oB);
      const wy = 330 + (1 - outCubic(kw)) * 300;
      g.fillStyle = 'rgba(11,11,14,0.9)'; g.fillRect(WX - 22, wy, 44, 900 - wy);
      slab(g, WX, wy, 900);
      g.restore();
      g.save(); g.translate(-1700 * oB, 0);
      row(g, '電子が飛び出すのに必要なエネルギー', 560, 262, prog(t, T.hei + 0.2, T.hei + 1.4), { size: 32, color: '@dim' });
      for (const [t0, nm, pass] of this.TH) ball(g, t, t0, nm, pass);
      const rS = (s, a, b, y, o = {}) => row(g, s, 140, y, prog(t, a, b), o);
      const e1 = out(t, T.tsuyoi - 0.1, 0.5), e2 = out(t, T.l35 - 0.1, 0.5);
      if (e1 < 1) { g.save(); g.translate(-1600 * e1, 0);
        row(g, '×1000', 1330, 440, prog(t, T.sen, T.sen + 0.6), { size: 72, mincho: true });
        row(g, '1000個でも、1個も越えない', 140, 960, prog(t, T.koemasen - 0.5, T.koemasen + 0.6), { size: 48 });
        cross(g, 1290, 640, 40, prog(t, T.koemasen, T.koemasen + 0.5), { color: '@ink', w: 9 }); g.restore(); }
      if (e1 > 0 && e2 < 1) { g.save(); g.translate(-1600 * e2, 0);
        rS('強いボールなら、1個で越える', T.tsuyoi, T.tsuyoi + 1.2, 960, { size: 48 }); g.restore(); }
      rS('赤い光子＝弱いボール', T.akai, T.akai + 1.0, 420);
      rS('紫の光子＝強いボール', T.murasaki, T.murasaki + 1.0, 500);
      rS('明るくする＝投げる数を増やす', T.akaruku, T.akaruku + 1.2, 580);
      g.restore();
    }

    // ═══ C ═══
    const oC = out(t, T.nami - 1.1, 0.7), kc = prog(t, T.y1921, T.y1921 + 0.8);
    if (kc > 0 && oC < 1) {
      g.save(); g.translate(-1800 * oC, 0);
      const mo = out(t, T.y1922 - 0.3, 0.7);
      g.save(); g.translate(1800 * mo, 0); medal(g, 1480, 560, prog(t, T.y1921, T.y1921 + 0.9)); g.restore();
      const r36 = out(t, T.y1922 - 0.3, 0.7);
      g.save(); g.translate(-1700 * r36, 0);
      row(g, '1921年　ノーベル物理学賞', 140, 330, prog(t, T.y1921, T.y1921 + 1.4), { size: 56, mincho: true });
      row(g, '理論物理学への貢献、', 140, 520, prog(t, T.riron, T.riron + 1.0), { size: 40 });
      row(g, 'とくに光電効果の法則の発見', 140, 585, prog(t, T.kouden - 0.2, T.kouden + 1.2), { size: 40 });
      const bx = row(g, '相対性理論', 140, 700, prog(t, T.sotai, T.sotai + 0.7), { size: 44, wrong: true });
      if (bx) cross(g, bx.x + bx.w + 50, 688, 24, prog(t, T.sotai + 0.6, T.sotai + 1.0), { color: '@ink', w: 7 });
      g.restore();
      const k38 = prog(t, T.y1922, T.y1922 + 1.0);
      if (k38 > 0) {
        row(g, '1922年11月', 140, 330, k38, { size: 56, mincho: true });
        row(g, '日本へ向かう船の旅の途中', 140, 440, prog(t, T.nihon - 0.1, T.nihon + 1.2));
        ship(g, 420 + 1000 * smooth(prog(t, T.nov - 0.3, T.end38 + 1.0)), 840, prog(t, T.nov - 0.3, T.nov + 0.5));
      }
      g.restore();
    }

    // ═══ D ═══
    const kd = prog(t, T.nami - 0.3, T.nami + 0.3);  // D vào sau khi nhóm 1922 đã trượt hẳn ra (oC xong ở nami − 0.4)
    if (kd > 0) {
      const o39 = out(t, T.mijikai - 0.2, 0.6);
      if (o39 < 1) { g.save(); g.translate(-1700 * o39, 0);
        const wa = 1 - smooth(prog(t, T.tsubu39 - 0.1, T.tsubu39 + 0.5));
        wave(g, 330, Y0, 1330, 'white', { lamPx: 150, amp: 44, k: prog(t, T.nami, T.nami + 1.2), phase: t * 3, a: wa });
        slab(g, 1420, 440, 720);
        row(g, '進むときは、波のように', 140, 330, prog(t, T.nami - 0.1, T.nami + 1.0), { mincho: true, size: 52 });
        const ka = prog(t, T.tsubu39 - 0.1, T.tsubu39 + 0.9), ej = t - (T.tsubu39 + 0.9);
        if (ka > 0 && ej < 0) photon(g, 1000 + 400 * outCubic(ka), Y0, 'white', { size: 60, amp: 15, phase: -t * 8 });
        if (ej >= 0) { const f = clamp(ej / 1.2); dot(g, 1380 - 330 * f, Y0 - 160 * Math.sin(f * 2.2), 1 - 0.7 * f); }
        row(g, '物質とやりとりするときは、粒のように', 140, 780, prog(t, T.tsubu39 - 0.2, T.tsubu39 + 1.2), { mincho: true, size: 52 });
        g.restore(); }
      const kl = prog(t, T.mijikai - 0.1, T.mijikai + 0.6);
      if (kl > 0) {
        row(g, '波長が短いほど、光子1個のエネルギーは大きい', 140, 330, prog(t, T.mijikai, T.mijikai + 1.6), { mincho: true, size: 52 });
        photon(g, 560, 600, PH_RED, { size: 70, amp: 18, phase: -t * 6, a: kl }); photon(g, 1060, 600, PH_VIO, { size: 70, amp: 18, phase: -t * 6, a: kl });
        telop(g, EV_R, 560, 700, kl, { align: 'center' }); telop(g, EV_V, 1060, 700, kl, { align: 'center' });
        row(g, 'これが、この先の鍵', 140, 850, prog(t, T.kagi, T.kagi + 0.9), { mincho: true, size: 64 });
      }
    }
  }
}
