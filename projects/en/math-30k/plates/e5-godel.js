// Hồi 5 · "1931 — Gödel: incompleteness" (SCRIPT.md) — bảng đen, phấn. Câu 186–193 của p2.
//   186 hai thẻ ngày: 8 SEPT 1930 · HILBERT, rồi "the day before" 7 SEPT 1930 · GÖDEL — cùng KÖNIGSBERG; mũi tên trả lời ngược
//   187 Gödel (ảnh ghim, nhỏ) · 1931 · 188–189 vòng "system of axioms": tiên đề, phép tính đã chứng minh; G ở ngoài: TRUE · UNPROVABLE
//   190 vòng thử chứng minh "consistent" — mũi tên rơi giữa đường · 191 không phải một lý thuyết: thêm hai hệ, mỗi hệ một G
//   192 vạch GIỚI HẠN ngang mọi hệ · PROOF FROM AXIOMS, 2,300 YEARS EARLIER · 193 ☐ COMPLETE ☐ CONSISTENT — NEVER BOTH
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, portrait, stamp, lookup } from '../kit.js';

const E = ERA.chalk;
const S = { x: 600, y: 720, r: 200 };              // hệ tiên đề chính
const MINI = [[1350, 760], [1640, 760]];           // hai hệ khác (câu 191)
const LIM = 505;                                   // vạch giới hạn (câu 192)

function chalk(g, pts, { w = 4, color = E.ink, seed = 1, k = 1, jit = 2.2 } = {}) {
  hand(g, pts, { w, color, jit, seed, k });
  g.save(); g.globalAlpha = 0.3; hand(g, pts, { w: w * 0.6, color, jit: jit * 1.6, seed: seed + 50, k }); g.restore();
}
function ctext(g, s, x, y, k, font, color, opt = {}) {
  typed(g, s, x, y, k, font, color, opt);
  g.save(); g.globalAlpha = 0.28; typed(g, s, x + 1.5, y - 1.2, k, font, color, opt); g.restore();
}
const circ = (cx, cy, r, n = 80) => Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + Math.PI * 2 * i / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
function cross(g, x, y, r, k, seed) {
  chalk(g, seg(x - r, y - r, x + r, y + r, 4), { w: 5, color: E.accent, seed, k: clamp(k * 2), jit: 1 });
  chalk(g, seg(x + r, y - r, x - r, y + r, 4), { w: 5, color: E.accent, seed: seed + 1, k: clamp(k * 2 - 1), jit: 1 });
}
/** mũi tên chứng minh hụt: đi từ a tới b nhưng chỉ tới phần `reach`, rồi rũ xuống; gạch chéo ở đầu */
function shortArrow(g, [x0, y0], [x1, y1], k, seed, reach = 0.55) {
  if (k <= 0) return;
  const mx = x0 + (x1 - x0) * reach, my = y0 + (y1 - y0) * reach;
  const pts = [...seg(x0, y0, mx, my, 14), [mx + (x1 - x0) * 0.06, my + 40]];
  chalk(g, pts, { w: 4, color: E.ink, seed, k: clamp(k * 1.3), jit: 1.4 });
  cross(g, mx + (x1 - x0) * 0.06, my + 40, 13, prog(k, 0.75, 1), seed + 5);
}

export default class Godel {
  static ERA = 'chalk';
  static IMAGES = { godel: './assets/history/Kurt_gödel.jpg' };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e5');
    this.T = {
      s186: L(186).start, day: w(186, 'day'), before: w(186, 'before'), speech: w(186, 'speech'), city: w(186, 'city'),
      tfy: w(186, 'twenty-four-year-old'), answered: w(186, 'answered'),
      kurt: w(187, 'kurt'), godel: w(187, 'gödel'), published: w(187, 'published'), n1931: w(187, 'thirty-one'),
      s188: L(188).start, proved: w(188, 'proved'), e188: L(188).end,
      system: w(189, 'system'), axioms: w(189, 'axioms'), strong: w(189, 'strong'), arithmetic: w(189, 'arithmetic'),
      true189: w(189, 'true'), cannot: w(189, 'cannot'), prove189: w(189, 'prove'),
      never: w(190, 'never'), consistency: w(190, 'consistency'),
      s191: L(191).start, flaw: w(191, 'flaw'), theory: w(191, 'theory'),
      limit: w(192, 'limit'), greeks: w(192, 'greeks'), tth: w(192, 'twenty-three'), proof: w(192, 'proof'), axioms192: w(192, 'axioms'),
      true193: w(193, 'true'), certify: w(193, 'certify'), complete: w(193, 'complete'), consistent: w(193, 'consistent'), e193: L(193).end,
    };
    this.START = this.T.s186;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'chalk');
    card(g, 'chalk', prog(t, this.FROM + 0.1, this.START + 1.0), 'ACT FIVE · QUESTIONING THE FOUNDATIONS', '1931', 'Gödel, incompleteness');
    ruler(g, 'chalk', 1931, prog(t, this.START - 0.3, this.START + 0.7));

    // ── 186–187: hai ngày ở Königsberg (trượt lên khỏi khung ở câu 188) ──
    const up = outCubic(prog(t, T.s188 - 0.1, T.s188 + 0.5));
    if (up < 1) {
      g.save(); g.translate(0, -up * 900);
      const X7 = 1080, X8 = 1560, Y = 560;
      chalk(g, seg(900, Y, 1760, Y, 30), { w: 3, color: E.dim, seed: 3, k: prog(t, T.s186 - 0.2, T.s186 + 0.5) });
      // "that speech" (đã nghe ở cảnh trước): 8 SEPT · HILBERT có trước; "the day before": 7 SEPT · GÖDEL
      const k8 = prog(t, T.s186 + 0.2, T.s186 + 0.7), k7 = prog(t, T.before - 0.05, T.before + 0.45);
      [[X8, k8, '8 SEPT 1930', 5], [X7, k7, '7 SEPT 1930', 7]].forEach(([x, k, s, seed]) => {
        chalk(g, seg(x, Y - 16, x, Y + 16, 3), { w: 4, seed, k });
        ctext(g, s, x, Y - 40, k, '800 46px "Archivo"', E.ink, { align: 'center' }); });
      typed(g, 'HILBERT', X8, Y + 52, k8, '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
      typed(g, 'GÖDEL', X7, Y + 52, prog(t, T.godel, T.godel + 0.3), '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
      typed(g, 'AGED 24', X7, Y + 114, prog(t, T.tfy, T.tfy + 0.3), '500 22px "IBM Plex Mono"', E.dim, { align: 'center' });
      [X7, X8].forEach((x, i) => typed(g, 'KÖNIGSBERG', x, Y + 84, prog(t, T.city - 0.1 + i * 0.15, T.city + 0.4 + i * 0.15), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' }));
      // "had already answered him": mũi tên phấn vàng từ ngày 7 vòng tới ngày 8
      const arc = Array.from({ length: 31 }, (_, i) => { const s = i / 30; return [X7 + (X8 - X7) * s, Y - 110 - Math.sin(s * Math.PI) * 70]; });
      const ka = prog(t, T.answered - 0.1, T.answered + 0.5);
      chalk(g, arc, { w: 4, color: E.accent, seed: 9, k: ka, jit: 1.2 });
      if (ka >= 1) chalk(g, [[X8 - 22, Y - 128], [X8, Y - 110], [X8 - 4, Y - 138]], { w: 4, color: E.accent, seed: 13, jit: 0.8 });
      ctext(g, 'PROOF PUBLISHED 1931', X7 - 160, Y + 170, prog(t, T.published, T.n1931 + 0.4), '500 26px "IBM Plex Mono"', E.accent);
      g.restore();
    }
    const pOut = outCubic(prog(t, T.s188 - 0.1, T.s188 + 0.5));
    if (t >= T.kurt - 0.3 && pOut < 1) {
      g.save(); g.translate(-pOut * 800, 0);
      portrait(g, 'godel', 'chalk', 150, 390, 380, prog(t, T.kurt - 0.3, T.godel + 0.3), { style: 'pin', rot: -0.02, label: { name: 'Kurt Gödel', life: '1906–1978' } });
      g.restore();
    }

    // ── 188–193: hệ tiên đề và cái nằm ngoài tầm với ──
    if (t < T.s188) return;
    const kc = prog(t, T.proved - 0.1, T.e188 + 0.4);
    chalk(g, circ(S.x, S.y, S.r), { w: 5, seed: 21, k: kc });
    ctext(g, 'SYSTEM OF AXIOMS', S.x, S.y + S.r + 52, prog(t, T.system - 0.1, T.axioms + 0.3), '500 22px "IBM Plex Mono"', E.ink, { align: 'center' });
    ctext(g, 'A1 · A2 · A3', S.x, S.y - 90, prog(t, T.axioms, T.axioms + 0.4), '500 26px "IBM Plex Mono"', E.dim, { align: 'center' });
    // phép tính số học (đúng, đã chứng minh): mũi tên ngắn từ tiên đề + dấu kiểm
    [['1 + 1 = 2', S.y + 10], ['2 × 3 = 6', S.y + 90]].forEach(([s, y], i) => {
      const a = T.arithmetic + i * 0.3;
      ctext(g, s, S.x, y, prog(t, a, a + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
      const kv = prog(t, a + 0.3, a + 0.6);
      chalk(g, [[S.x + 100, y - 18], [S.x + 112, y - 4], [S.x + 136, y - 34]], { w: 4, color: E.accent, seed: 31 + i, k: kv, jit: 0.8 });
    });
    // G: đúng nhưng không chứng minh được — nằm ngoài vòng; mũi tên chứng minh hụt
    const G = [1000, 400];
    ctext(g, 'G', G[0], G[1], prog(t, T.true189 - 0.1, T.true189 + 0.2), 'italic 600 64px "Cormorant Garamond"', E.accent, { align: 'center' });
    ctext(g, 'TRUE · UNPROVABLE', G[0], G[1] + 48, prog(t, T.true189 + 0.2, T.prove189 + 0.3), '500 22px "IBM Plex Mono"', E.accent, { align: 'center' });
    shortArrow(g, [S.x + 150, S.y - 140], [G[0] - 30, G[1] - 10], prog(t, T.cannot - 0.2, T.prove189 + 0.4), 41);
    // 190: "consistent" — vòng tự chứng minh, mũi tên rơi giữa đường
    ctext(g, '“consistent”', 1100, 790, prog(t, T.never - 0.1, T.never + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink, { align: 'center' });
    shortArrow(g, [S.x + S.r + 6, S.y + 10], [990, 770], prog(t, T.consistency - 0.3, T.consistency + 0.5), 47, 0.6);
    // 191: không phải lỗi của một lý thuyết — hai hệ khác, mỗi hệ một G của riêng nó
    MINI.forEach(([x, y], i) => {
      const a = i ? T.theory : T.flaw, k = prog(t, a - 0.1, a + 0.4); if (k <= 0) return;
      chalk(g, circ(x, y, 100, 50), { w: 4, seed: 51 + i, k });
      for (let j = 0; j < 2; j++) chalk(g, seg(x - 40, y - 10 + j * 36, x + 40, y - 10 + j * 36, 4), { w: 3, color: E.dim, seed: 55 + j + i * 3, k });
      ctext(g, 'G', x + 70, 440, prog(k, 0.4, 0.7), 'italic 600 64px "Cormorant Garamond"', E.accent, { align: 'center' });
      shortArrow(g, [x + 40, y - 92], [x + 70, 430], prog(k, 0.5, 1), 61 + i * 5, 0.5);
    });
    // 192: giới hạn — một vạch ngang tách mọi hệ khỏi các G của chúng
    const kl = prog(t, T.limit - 0.1, T.limit + 0.6);
    for (let i = 0; i < 26; i++) { const x0 = 300 + i * 58; chalk(g, seg(x0, LIM, x0 + 34, LIM, 3), { w: 4, color: E.accent, seed: 70 + i, k: clamp(kl * 26 - i), jit: 1 }); }
    typed(g, 'LIMIT', 1800, LIM + 38, prog(t, T.limit + 0.2, T.limit + 0.6), '500 22px "IBM Plex Mono"', E.accent, { align: 'right' });
    ctext(g, 'PROOF FROM AXIOMS', 1180, 950, prog(t, T.proof - 0.1, T.axioms192 + 0.4), '800 46px "Archivo"', E.ink);
    ctext(g, 'THE GREEKS · 2,300 YEARS EARLIER', 1180, 990, prog(t, T.greeks - 0.1, T.tth + 0.8), '500 22px "IBM Plex Mono"', E.dim);
    // 193: "can be true": các G được gạch chân · "never certify itself as both complete and consistent"
    const ku = prog(t, T.true193, T.true193 + 0.4);
    [[G[0], 412], [MINI[0][0] + 70, 452], [MINI[1][0] + 70, 452]].forEach(([x, y], i) => chalk(g, seg(x - 26, y, x + 26, y, 6), { w: 4, color: E.accent, seed: 90 + i, k: ku }));
    ctext(g, 'CERTIFY ITSELF:', 960, 120, prog(t, T.certify - 0.1, T.certify + 0.5), '500 22px "IBM Plex Mono"', E.dim);
    [[T.complete, 'COMPLETE', 186], [T.consistent, 'CONSISTENT', 252]].forEach(([a, s, y], i) => {
      const k = prog(t, a - 0.1, a + 0.4);
      chalk(g, [[960, y - 40], [1000, y - 40], [1000, y], [960, y], [960, y - 40]], { w: 4, seed: 95 + i, k });
      ctext(g, s, 1022, y, k, '800 46px "Archivo"', E.ink); });
    stamp(g, 'NEVER BOTH', 1560, 210, prog(t, T.consistent + 0.5, T.consistent + 0.75), '800 46px "Archivo"', E.accent, { rot: -0.08 });
  }
}
