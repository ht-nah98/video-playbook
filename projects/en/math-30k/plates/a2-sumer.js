// Hồi 1 · "About 3000 BC — Sumer" (SCRIPT.md) — đất sét. Câu 11–21 của phần p1b.
//   vạch khắc tràn khung (437) · ảnh phiến đất sét thật · dấu nêm 1/10/60 · 437 = 7 × 60 + 17 · vòng ước của 60
//   đất · lúa · thời gian · mặt đồng hồ: 60 phút, 60 giây, 360° = 6 × 60
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, photo, wedge, lookup } from '../kit.js';

const E = ERA.clay;
const S = 11;                                    // câu đầu của phần này trong timeline p1b
const DIV = [[2, 30], [3, 20], [4, 15], [5, 12], [6, 10], [10, 6], [12, 5], [15, 4], [20, 3], [30, 2]];
const DIVW = ['two', 'three', 'four', 'five', 'six', 'ten', 'twelve', 'fifteen', 'twenty', 'thirty'];
// 437 vạch: nhóm 5 (4 đứng + 1 gạch chéo), 24 nhóm một hàng
const tally = m => { const gi = Math.floor(m / 5), j = m % 5, x = 150 + (gi % 24) * 66, y = 430 + Math.floor(gi / 24) * 110; return { x, y, j }; };

export class Sumer {
  init({ tl }) {
    const { L, w } = lookup(tl, 'a2');
    this.T = {
      s0: L(S).start, four: w(S + 1, 'four'), carve: w(S + 1, 'carve'), s1e: L(S + 1).end,
      s2: L(S + 2).start, sumerians: w(S + 2, 'sumerians'), numerals: w(S + 2, 'numerals'),
      one: w(S + 3, 'one'), ten: w(S + 3, 'ten'), sixty: w(S + 3, 'sixty'),
      s4: L(S + 4).start, base60: w(S + 4, 'sixty'),
      s5: L(S + 5).start,
      div: DIVW.map(x => w(S + 6, x)),
      land: w(S + 7, 'land'), grain: w(S + 7, 'grain'), time: w(S + 7, 'time'),
      s8: L(S + 8).start,
      hour: w(S + 9, 'hour'), minutes: w(S + 9, 'minutes'), seconds: w(S + 9, 'seconds'), circle: w(S + 9, 'circle'),
      degrees: w(S + 9, 'degrees'), six: w(S + 9, 'six'), times: w(S + 9, 'times'),
      clock: w(S + 10, 'clock'), five: w(S + 10, 'five'), end: L(S + 10).end,
    };
    this.START = this.T.s0;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'clay');
    card(g, 'clay', prog(t, T.s0 - 1.4, T.s0 + 0.8), 'ACT ONE · COUNTING', '≈ 3000 BC', 'Sumer, the first numerals');
    ruler(g, 'clay', -3000, prog(t, T.s0 - 0.6, T.s0 + 0.4));

    // ── 437 con cừu = 437 vạch: khắc tới tràn khung, rồi cả bãi vạch trượt xuống khỏi khung ──
    const away = outCubic(prog(t, T.s2 - 0.2, T.s2 + 0.4));
    if (away < 1) {
      g.save(); g.translate(0, away * 900);
      typed(g, '437 SHEEP', 1300, 200, prog(t, T.four, T.four + 0.6), '800 64px "Archivo"', E.ink);
      const n = Math.floor(437 * prog(t, T.carve - 0.2, T.s1e + 0.2));
      for (let m = 0; m < n; m++) { const { x, y, j } = tally(m);
        if (j < 4) hand(g, seg(x + j * 10, y, x + j * 10 + 1, y + 60, 3), { w: 3, color: E.ink, jit: 0.8, seed: m });
        else hand(g, seg(x - 6, y + 48, x + 40, y + 12, 3), { w: 3, color: E.ink, jit: 0.8, seed: m }); }
      if (n > 0) typed(g, `${n} / 437`, 1300, 250, 1, '500 22px "IBM Plex Mono"', E.accent);
      g.restore();
    }

    // ── ảnh phiến đất sét thật (vào ở "Sumerians", ra ở "Why sixty?") ──
    const phOut = outCubic(prog(t, T.s5 - 0.3, T.s5 + 0.3));
    if (t >= T.sumerians - 0.1 && phOut < 1) {
      g.save(); g.translate(phOut * 800, 0);
      photo(g, 'sumer', 'clay', 1320, 360, 400, prog(t, T.sumerians - 0.1, T.sumerians + 0.35), { rot: -0.02 });
      typed(g, 'CLAY TABLET · MESOPOTAMIA', 1320, 820, prog(t, T.numerals, T.numerals + 0.6), '500 20px "IBM Plex Mono"', E.dim);
      g.restore();
    }

    // ── dấu nêm cho 1 · 10 · 60, rồi 437 = 7 × 60 + 17 viết bằng chính các dấu đó ──
    const signsOut = outCubic(prog(t, T.s5 - 0.3, T.s5 + 0.3));
    if (t >= T.one - 0.1 && signsOut < 1) {
      g.save(); g.translate(-signsOut * 1300, 0);
      [['v', 300, 1.0, T.one, '1'], ['c', 560, 1.0, T.ten, '10'], ['v', 820, 1.8, T.sixty, '60']].forEach(([kind, x, s, a, lab]) => {
        wedge(g, kind, x, 520, s, prog(t, a - 0.05, a + 0.25));
        typed(g, lab, x, 680, prog(t, a + 0.1, a + 0.3), '500 34px "IBM Plex Mono"', E.accent, { align: 'center' });
      });
      // 437: bảy dấu sáu-mươi · một dấu mười · bảy dấu một
      const marks = [...Array(7).fill(['v', 1.1]), ['c', 0.7], ...Array(7).fill(['v', 0.6])];
      marks.forEach(([kind, s], i) => { const x = 210 + i * 44 + (i >= 7 ? 40 : 0) + (i >= 8 ? 30 : 0), a = T.s4 + i * 0.09;
        wedge(g, kind, x, 820, s, prog(t, a, a + 0.2)); });
      typed(g, '437 = 7 × 60 + 17', 210, 960, prog(t, T.base60, T.base60 + 0.6), 'italic 600 54px "Cormorant Garamond"', E.accent);
      g.restore();
    }

    // ── "Why sixty?": 60 ở giữa, các cặp ước nảy ra quanh nó đúng lúc được đọc ──
    const ringOut = outCubic(prog(t, T.hour - 0.7, T.hour - 0.1));     // ở lại qua câu "fun part" tới khi đồng hồ vào
    if (t >= T.s5 - 0.1 && ringOut < 1) {
      g.save(); g.translate(0, ringOut * 900);
      const cx = 560, cy = 650;
      typed(g, '60', cx, cy + 50, prog(t, T.s5, T.s5 + 0.3), '800 150px "Archivo"', E.ink, { align: 'center' });
      DIV.forEach(([a, b], i) => { const ang = -Math.PI / 2 + i * Math.PI * 2 / DIV.length, k = prog(t, T.div[i] - 0.05, T.div[i] + 0.2);
        if (k <= 0) return; const x = cx + 250 * Math.cos(ang), y = cy + 230 * Math.sin(ang);
        g.save(); g.translate(x, y); g.scale(outBack(k), outBack(k)); g.font = '500 28px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillStyle = E.ink; g.fillText(`${a} × ${b}`, 0, 0); g.restore(); });
      // đất (thửa chia 4) · lúa · thời gian (đồng hồ cát)
      const ic = (x, a, lab, draw) => { const k = prog(t, a - 0.05, a + 0.25); if (k <= 0) return;
        g.save(); g.translate(x, 600); g.scale(outBack(k), outBack(k)); g.strokeStyle = g.fillStyle = E.ink; g.lineWidth = 4; draw(); g.restore();
        typed(g, lab, x, 700, k, '500 20px "IBM Plex Mono"', E.dim, { align: 'center' }); };
      ic(1000, T.land, 'LAND', () => { g.strokeRect(-44, -44, 88, 88); g.beginPath(); g.moveTo(0, -44); g.lineTo(0, 44); g.moveTo(-44, 0); g.lineTo(44, 0); g.stroke(); });
      ic(1140, T.grain, 'GRAIN', () => { g.beginPath(); g.moveTo(0, 46); g.lineTo(0, -40); g.stroke(); for (let j = 0; j < 4; j++) { g.beginPath(); g.ellipse(-10, -30 + j * 18, 6, 11, -0.6, 0, 7); g.ellipse(10, -30 + j * 18, 6, 11, 0.6, 0, 7); g.fill(); } });
      ic(1280, T.time, 'TIME', () => { g.beginPath(); g.moveTo(-30, -44); g.lineTo(30, -44); g.lineTo(-30, 44); g.lineTo(30, 44); g.closePath(); g.stroke(); });
      g.restore();
    }

    // ── mặt đồng hồ: 60 phút · 60 giây · 360° = 6 × 60 ──
    if (t >= T.hour - 0.2) {
      const cx = 720, cy = 640, r = 250, kc = prog(t, T.hour - 0.2, T.hour + 0.4);
      hand(g, Array.from({ length: 91 }, (_, i) => [cx + r * Math.cos(i / 90 * 2 * Math.PI), cy + r * Math.sin(i / 90 * 2 * Math.PI)]), { w: 6, color: E.ink, jit: 1, seed: 5, k: kc });
      // sáu múi 60° tô lần lượt ở "six times sixty"
      for (let i = 0; i < 6; i++) { const a0 = T.six + i * 0.12, k = prog(t, a0, a0 + 0.12); if (k <= 0 || i % 2) continue;
        g.save(); g.fillStyle = E.accent; g.globalAlpha = 0.28; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, r - 8, -Math.PI / 2 + i * Math.PI / 3, -Math.PI / 2 + (i + k) * Math.PI / 3); g.closePath(); g.fill(); g.restore(); }
      for (let i = 0; i < 6; i++) { const a0 = T.six + i * 0.12, k = prog(t, a0, a0 + 0.12), a = -Math.PI / 2 + i * Math.PI / 3;
        hand(g, seg(cx, cy, cx + (r - 8) * Math.cos(a), cy + (r - 8) * Math.sin(a), 6), { w: 3, color: E.accent, jit: 0.6, seed: 60 + i, k }); }
      // 60 vạch phút
      const nt = Math.floor(60 * prog(t, T.minutes - 0.3, T.minutes + 0.6));
      for (let i = 0; i < nt; i++) { const a = -Math.PI / 2 + i * Math.PI / 30, l = i % 5 ? 14 : 30;
        g.save(); g.strokeStyle = E.ink; g.lineWidth = i % 5 ? 2 : 4; g.beginPath(); g.moveTo(cx + (r - 12) * Math.cos(a), cy + (r - 12) * Math.sin(a)); g.lineTo(cx + (r - 12 - l) * Math.cos(a), cy + (r - 12 - l) * Math.sin(a)); g.stroke(); g.restore(); }
      // kim: kim giây quay từ "seconds"; kim phút/giờ trôi chậm
      const sec = Math.max(0, t - T.seconds) * Math.PI * 2 / 6, ang = -Math.PI / 2;
      const needle = (a, len, wd, col) => { g.save(); g.strokeStyle = col; g.lineWidth = wd; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + len * Math.cos(a), cy + len * Math.sin(a)); g.stroke(); g.restore(); };
      if (kc >= 1) { needle(ang + 2.1 + Math.max(0, t - T.hour) * 0.02, 130, 9, E.ink); needle(ang + 0.5 + Math.max(0, t - T.hour) * 0.25, 200, 6, E.ink);
        if (t >= T.seconds) needle(ang + sec, 215, 2.5, E.accent);
        g.fillStyle = E.ink; g.beginPath(); g.arc(cx, cy, 10, 0, 7); g.fill(); }
      typed(g, '60 MINUTES', 1010, 470, prog(t, T.minutes, T.minutes + 0.4), '500 24px "IBM Plex Mono"', E.ink);
      typed(g, '60 SECONDS', 1010, 512, prog(t, T.seconds, T.seconds + 0.4), '500 24px "IBM Plex Mono"', E.ink);
      typed(g, '360°', 1010, 600, prog(t, T.degrees - 0.1, T.degrees + 0.3), '800 64px "Archivo"', E.accent);
      typed(g, '= 6 × 60°', 1010, 650, prog(t, T.times, T.times + 0.4), 'italic 600 44px "Cormorant Garamond"', E.accent);
      typed(g, '≈ 5,000 YEARS OLD', 720, 960, prog(t, T.five, T.five + 0.6), '500 26px "IBM Plex Mono"', E.ink, { align: 'center' });
    }

    // người dẫn đường: trầm tư ở "Why sixty?", chỉ vào đồng hồ từ "An hour…"
    if (t < T.hour - 0.1) figure(g, 'ponder', 1610, 1080, 780, 'clay', prog(t, T.s5 - 0.2, T.s5 + 0.15));
    else figure(g, 'point', 1660, 1080, 640, 'clay', 0.55 + 0.45 * prog(t, T.hour - 0.1, T.hour + 0.2), { flip: true });
  }
}
