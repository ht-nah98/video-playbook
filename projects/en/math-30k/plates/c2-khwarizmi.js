// Hồi 3 · "About 820 — Al-Khwarizmi" (SCRIPT.md) — giấy chép tay. Câu 38–51 của p2.
//   L38–39 chân dung tưởng tượng + trang al-jabr · al-jabr → algebra
//   L40–43 không ký hiệu: bài toán viết bằng LỜI, ẩn = "the thing" · một phương pháp: dạng chuẩn x² + 10x = 39, cân bù/cân bằng
//   L44–45 "Sound familiar?" (mascot trầm tư) · vở học trò: x = 3, thử lại 9 + 30 = 39
//   L46–47 mỗi bài một mẹo → cả họ phương trình đổ vào MỘT thủ tục
//   L48–51 sách thứ hai về chữ số Ấn Độ · DIXIT ALGORIZMI → "Algoritmi said" → algorithm · châu Âu chưa vội
import { ERA, clamp, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, figure, portrait, photo, lookup } from '../kit.js';

const E = ERA.parchment;
// bài toán của al-Khwarizmi: x² + 10x = 39 — nghiệm dương tính bằng công thức, thử lại bằng số
const P = 10, Q = 39, ROOT = (-P + Math.sqrt(P * P + 4 * Q)) / 2;      // = 3
const FAMILY = ['x² + 10x = 39', 'x² + 21 = 10x', '3x + 4 = x²', 'x² = 5x'];
const CARDS = [[150, 420], [560, 500], [190, 690], [600, 790]];

function text(g, s, x, y, font, color, align = 'left') { g.save(); g.font = font; g.fillStyle = color; g.textAlign = align; g.fillText(s, x, y); g.restore(); }
function typedParts(g, parts, x, y, k, font) {
  const total = parts.reduce((a, [s]) => a + s.length, 0); let n = Math.round(total * clamp(k)); if (!n) return;
  g.save(); g.font = font; g.textAlign = 'left';
  for (const [s, c] of parts) { if (n <= 0) break; g.fillStyle = c; g.fillText(s.slice(0, n), x, y); x += g.measureText(s).width; n -= s.length; }
  g.restore();
}
function box(g, x, y, w, h, k, color = E.ink, lw = 3, seed = 1) {
  if (k <= 0) return;
  hand(g, [...seg(x, y, x + w, y, 8), ...seg(x + w, y, x + w, y + h, 4).slice(1), ...seg(x + w, y + h, x, y + h, 8).slice(1), ...seg(x, y + h, x, y, 4).slice(1)], { w: lw, color, jit: 1.2, seed, k });
}
function arrowHead(g, x, y, ang, color, k = 1) {
  if (k < 1) return;
  hand(g, [[x - 18 * Math.cos(ang - 0.5), y - 18 * Math.sin(ang - 0.5)], [x, y], [x - 18 * Math.cos(ang + 0.5), y - 18 * Math.sin(ang + 0.5)]], { w: 4, color, jit: 0.4, seed: 7 });
}
/** cân hai đĩa: tâm (cx, cy), nghiêng ang (rad, dương = đĩa trái thấp) */
function scale(g, cx, cy, ang, left, right) {
  g.save(); g.strokeStyle = E.ink; g.fillStyle = E.ink; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy + 300); g.moveTo(cx - 90, cy + 300); g.lineTo(cx + 90, cy + 300); g.stroke();
  g.beginPath(); g.moveTo(cx - 24, cy - 30); g.lineTo(cx + 24, cy - 30); g.lineTo(cx, cy); g.closePath(); g.fill();
  const L = 290, dx = L * Math.cos(ang), dy = L * Math.sin(ang);
  g.beginPath(); g.moveTo(cx - dx, cy + dy); g.lineTo(cx + dx, cy - dy); g.stroke();
  [[cx - dx, cy + dy, left], [cx + dx, cy - dy, right]].forEach(([x, y, s]) => {
    g.lineWidth = 2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 120, y + 130); g.moveTo(x, y); g.lineTo(x + 120, y + 130); g.stroke();
    g.lineWidth = 5; g.beginPath(); g.moveTo(x - 125, y + 130); g.quadraticCurveTo(x, y + 180, x + 125, y + 130); g.stroke();
    text(g, s, x, y + 124, 'italic 600 44px "Cormorant Garamond"', E.ink, 'center');
  });
  g.restore();
}

export default class Khwarizmi {
  static ERA = 'parchment';
  static IMAGES = { alkhwarizmi: './assets/history/al-khwarizmi_portrait-250x361.avif', aljabr: './assets/history/aljabr-page.jpg' };
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      baghdad: w(38, 'baghdad'), khw: w(38, 'al-khwarizmi'), jabr38: w(38, 'al-jabr'), muq38: w(38, 'al-muqabala'),
      jabr39: w(39, 'al-jabr'), algebra: w(39, 'algebra'),
      l40: L(40).start, actually: w(40, 'actually'), invent: w(40, 'invent'),
      not: w(41, 'not'), symbols: w(41, 'symbols'), words41: w(41, 'words'), unknown: w(41, 'unknown'), thing: w(41, 'thing'),
      method: w(42, 'method'),
      standard: w(43, 'standard'), forms: w(43, 'forms'), moves: w(43, 'moves'), restoring: w(43, 'restoring'), jabr43: w(43, 'al-jabr'),
      balancing: w(43, 'balancing'), muq43: w(43, 'al-muqabala'),
      l44: L(44).start, familiar: w(44, 'familiar'),
      solve45: w(45, 'solve'), x45: w(45, 'x'), school: w(45, 'school'),
      l46: L(46).start, problems: w(46, 'problems'), trick: w(46, 'trick'),
      general: w(47, 'general'), procedure: w(47, 'procedure'), family: w(47, 'family'), equations: w(47, 'equations'),
      l48: L(48).start, second: w(48, 'second'), indian48: w(48, 'indian'),
      latin: w(49, 'latin'), words49: w(49, 'words'), said: w(49, 'said'), name: w(49, 'name'),
      algorithm: w(50, 'algorithm'),
      europe1: w(51, 'europe', 1), heard: w(51, 'heard'), europe2: w(51, 'europe', 2), hurry: w(51, 'hurry'),
    };
    this.START = L(38).start;
    this.FROM = this.START - 1.2;
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'parchment');
    card(g, 'parchment', prog(t, S - 1.4, S + 0.8), 'ACT THREE · THE NUMBERS GROW', '≈ 820', 'al-Khwarizmi, al-jabr');
    ruler(g, 'parchment', 820, prog(t, S - 0.6, S + 0.4));

    // ── L38–39: Baghdad · chân dung tưởng tượng · trang al-jabr · al-jabr → algebra ──
    const o39 = outCubic(prog(t, T.l40 - 0.3, T.l40 + 0.3));
    if (t >= T.baghdad - 0.1 && o39 < 1) {
      g.save(); g.translate(0, o39 * 900);
      typed(g, 'BAGHDAD', 150, 420, prog(t, T.baghdad, T.baghdad + 0.4), '500 26px "IBM Plex Mono"', E.accent);
      photo(g, 'aljabr', 'parchment', 160, 470, 270, prog(t, T.jabr38 - 0.2, T.jabr38 + 0.3), { rot: -0.015 });
      typed(g, 'al-jabr wa al-muqabala', 150, 820, prog(t, T.jabr38, T.muq38 + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink);
      g.save(); g.font = 'italic 600 54px "Cormorant Garamond"'; const wj = g.measureText('al-jabr').width; g.restore();
      hand(g, seg(150, 838, 150 + wj, 838, 12), { w: 5, color: E.accent, jit: 1, seed: 3, k: prog(t, T.jabr39, T.jabr39 + 0.35) });
      typed(g, '→ algebra', 150, 920, prog(t, T.algebra, T.algebra + 0.4), 'italic 600 64px "Cormorant Garamond"', E.accent);
      g.restore();
    }
    const oPor = outCubic(prog(t, T.algebra + 0.4, T.algebra + 1.0));
    if (t >= T.khw - 0.2 && oPor < 1) {
      g.save(); g.translate(oPor * 900, 0);
      portrait(g, 'alkhwarizmi', 'parchment', 1400, 330, 400, prog(t, T.khw - 0.2, T.khw + 0.3),
        { style: 'print', label: { name: 'al-Khwarizmi', note: 'IMAGINED · NO LIKENESS SURVIVES' } });
      g.restore();
    }

    // ── L40–41: ký hiệu? — không. Bài toán viết bằng LỜI; ẩn là "the thing" ──
    const fallSym = prog(t, T.words41 - 0.5, T.words41 + 0.1);
    if (t >= T.l40 - 0.1 && fallSym < 1) {
      g.save(); g.translate(0, outCubic(fallSym) * 800); g.rotate(fallSym * 0.04);
      typed(g, 'x    +    =    ²    √', 960, 620, prog(t, T.l40, T.invent + 0.3), 'italic 600 96px "Cormorant Garamond"', E.dim, { align: 'center' });
      typed(g, '?', 960, 480, prog(t, T.invent, T.invent + 0.2), '800 64px "Archivo"', E.accent, { align: 'center' });
      hand(g, seg(700, 640, 1220, 560, 20), { w: 9, color: E.accent, jit: 3, seed: 11, k: prog(t, T.not, T.not + 0.3) });
      g.restore();
    }
    const o45 = outCubic(prog(t, T.l46 - 0.3, T.l46 + 0.4));
    if (t >= T.words41 - 0.2 && o45 < 1) {
      g.save(); g.translate(-o45 * 1300, 0);
      typed(g, 'IN WORDS', 150, 420, prog(t, T.words41 - 0.2, T.words41 + 0.2), '500 26px "IBM Plex Mono"', E.accent);
      typed(g, 'a square and ten roots', 150, 510, prog(t, T.words41, T.words41 + 0.9), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'equal thirty-nine dirhams', 150, 590, prog(t, T.words41 + 0.6, T.words41 + 1.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typedParts(g, [['the unknown = ', E.dim], ['“the thing”', E.accent]], 150, 680, prog(t, T.unknown - 0.1, T.thing + 0.4), 'italic 600 54px "Cormorant Garamond"');
      // L43: dạng chuẩn (ký hiệu hôm nay)
      typed(g, 'STANDARD FORM · WRITTEN TODAY AS', 150, 760, prog(t, T.standard - 0.1, T.forms + 0.3), '500 20px "IBM Plex Mono"', E.dim);
      typed(g, `x² + ${P}x = ${Q}`, 150, 840, prog(t, T.forms, T.forms + 0.5), 'italic 600 64px "Cormorant Garamond"', E.ink);
      // L45: vở học trò — x = 3, thử lại
      const kn = prog(t, T.solve45 - 0.3, T.solve45 + 0.3);
      if (kn > 0) {
        g.save(); g.strokeStyle = 'rgba(70,110,160,0.45)'; g.lineWidth = 2;
        for (let r = 0; r < 3; r++) { g.beginPath(); g.moveTo(110, 860 + r * 70); g.lineTo(110 + 980 * outCubic(kn), 860 + r * 70); g.stroke(); }
        g.strokeStyle = 'rgba(160,50,40,0.55)'; g.beginPath(); g.moveTo(132, 780); g.lineTo(132, 780 + 230 * outCubic(kn)); g.stroke(); g.restore();
      }
      typed(g, `x = ${ROOT}`, 150, 920, prog(t, T.x45, T.x45 + 0.3), 'italic 600 64px "Cormorant Garamond"', E.accent);
      typed(g, `check: ${ROOT}² + ${P}·${ROOT} = ${ROOT * ROOT} + ${P * ROOT} = ${ROOT * ROOT + P * ROOT}`, 380, 915, prog(t, T.x45 + 0.3, T.school + 0.3), 'italic 500 40px "Cormorant Garamond"', E.ink);
      g.restore();
    }

    // ── L42–43: một phương pháp; cân: al-jabr (bù), al-muqabala (cân bằng) ──
    const oSc = outCubic(prog(t, T.l44 - 0.4, T.l44 + 0.2));
    if (t >= T.method - 0.1 && oSc < 1) {
      g.save(); g.translate(oSc * 1000, 0);
      typed(g, 'A METHOD', 1120, 420, prog(t, T.method, T.method + 0.4), '800 46px "Archivo"', E.accent);
      typed(g, '1 · RESTORING = AL-JABR', 1120, 470, prog(t, T.restoring, T.jabr43 + 0.4), '500 22px "IBM Plex Mono"', E.ink);
      typed(g, '2 · BALANCING = AL-MUQABALA', 1120, 505, prog(t, T.balancing, T.muq43 + 0.4), '500 22px "IBM Plex Mono"', E.ink);
      const ks = prog(t, T.moves - 0.2, T.moves + 0.3);
      if (ks > 0) {
        const r = prog(t, T.restoring, T.restoring + 0.8), b = prog(t, T.balancing, T.balancing + 0.9);
        const tilt = (1 - b) * (0.24 - 0.14 * outCubic(r) + Math.sin(r * Math.PI * 3) * 0.05 * (1 - r)) + Math.sin(b * Math.PI * 2) * 0.04 * (1 - b);
        g.save(); g.translate(0, (1 - outCubic(ks)) * 600);
        scale(g, 1390, 600, tilt, `x² + ${P}x`, String(Q));
        g.restore();
        typed(g, '=', 1390, 960, b * 3 - 2, 'italic 600 64px "Cormorant Garamond"', E.accent, { align: 'center' });
      }
      g.restore();
    }

    // ── L44–45: người dẫn đường trầm tư "Sound familiar?" ──
    const oFig = outCubic(prog(t, T.l46 - 0.3, T.l46 + 0.4));
    if (t >= T.l44 - 0.3 && oFig < 1) {
      g.save(); g.translate(0, oFig * 900);
      figure(g, 'ponder', 1560, 1080, 760, 'parchment', prog(t, T.l44 - 0.2, T.l44 + 0.15));
      g.restore();
    }

    // ── L46–47: mỗi bài một mẹo → một thủ tục chung cho cả họ ──
    const o47 = outCubic(prog(t, T.l48 - 0.3, T.l48 + 0.4));
    if (t >= T.problems - 0.2 && o47 < 1) {
      g.save(); g.translate(o47 * 1200, 0);
      const kb = prog(t, T.procedure - 0.2, T.procedure + 0.5), BX = 1180, BY = 470, BW = 560, BH = 340;
      box(g, BX, BY, BW, BH, kb, E.accent, 5, 21);
      typed(g, 'ONE GENERAL PROCEDURE', BX + 30, BY + 60, prog(t, T.procedure, T.procedure + 0.6), '500 26px "IBM Plex Mono"', E.accent);
      typed(g, '1 · restore  (al-jabr)', BX + 30, BY + 140, prog(t, T.procedure + 0.3, T.procedure + 0.9), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, '2 · balance  (al-muqabala)', BX + 30, BY + 210, prog(t, T.procedure + 0.5, T.procedure + 1.1), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, '→ the thing', BX + 30, BY + 290, prog(t, T.equations, T.equations + 0.5), 'italic 600 44px "Cormorant Garamond"', E.accent);
      typed(g, 'A WHOLE FAMILY OF EQUATIONS', BX, BY + BH + 50, prog(t, T.family - 0.2, T.family + 0.5), '500 20px "IBM Plex Mono"', E.dim);
      FAMILY.forEach((s, i) => {
        const a = T.problems + (T.trick - T.problems) * i / FAMILY.length, k = prog(t, a, a + 0.3);
        if (k <= 0) return;
        const f0 = T.family - 0.4 + i * 0.12, m = outCubic(prog(t, f0, f0 + 0.7)); if (m >= 1) return;
        const [x0, y0] = CARDS[i], x = x0 + (BX - 40 - x0) * m, y = y0 + (BY + BH / 2 - 55 - y0) * m, sc = outBack(k) * (1 - 0.7 * m);
        g.save(); g.translate(x, y); g.scale(sc, sc); g.rotate((i % 2 ? 0.03 : -0.03) * (1 - m));
        box(g, 0, 0, 360, 110, 1, E.ink, 3, 30 + i);
        text(g, s, 180, 72, 'italic 600 52px "Cormorant Garamond"', E.ink, 'center');
        typed(g, `TRICK ${'ABCD'[i]}`, 0, 146, prog(t, T.trick - 0.2 + i * 0.1, T.trick + i * 0.1 + 0.2), '500 20px "IBM Plex Mono"', E.dim);
        g.restore();
      });
      g.restore();
    }

    // ── L48–51: sách về chữ số Ấn Độ · DIXIT ALGORIZMI → algorithm · châu Âu chưa vội ──
    if (t >= T.l48 - 0.1) {
      const kb = prog(t, T.second - 0.2, T.second + 0.6), bx = 160, by = 430;
      if (kb > 0) {
        g.save(); g.translate(0, (1 - outCubic(kb)) * 500);
        g.fillStyle = 'rgba(46,36,24,0.08)'; g.fillRect(bx, by, 600, 340);
        g.strokeStyle = E.ink; g.lineWidth = 4; g.strokeRect(bx, by, 600, 340); g.beginPath(); g.moveTo(bx + 300, by); g.lineTo(bx + 300, by + 340); g.stroke();
        g.restore();
      }
      typed(g, '1 2 3 4 5', bx + 40, by + 200, prog(t, T.indian48, T.indian48 + 0.4), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, '6 7 8 9 0', bx + 340, by + 200, prog(t, T.indian48 + 0.4, T.indian48 + 0.8), 'italic 600 64px "Cormorant Garamond"', E.ink);
      typed(g, 'ON THE INDIAN NUMERALS', bx, by + 400, prog(t, T.indian48, T.indian48 + 0.7), '500 22px "IBM Plex Mono"', E.dim);
      // Latin: rubric đỏ mở đầu bản dịch
      const oLat = outCubic(prog(t, T.europe1 - 0.3, T.europe1 + 0.4));
      if (oLat < 1) {
        g.save(); g.translate(oLat * 1000, 0);
        const lx = 1000;
        typed(g, 'LATIN TRANSLATION · OPENING WORDS', lx, 430, prog(t, T.latin, T.latin + 0.6), '500 20px "IBM Plex Mono"', E.dim);
        typed(g, 'DIXIT ALGORIZMI', lx, 520, prog(t, T.words49, T.words49 + 0.6), '800 64px "Archivo"', E.accent);
        typed(g, '“Algoritmi said”', lx, 590, prog(t, T.said - 0.1, T.said + 0.4), 'italic 600 54px "Cormorant Garamond"', E.ink);
        g.save(); g.font = '800 64px "Archivo"'; const w0 = g.measureText('DIXIT ').width, w1 = g.measureText('ALGORIZMI').width; g.restore();
        hand(g, seg(lx + w0, 538, lx + w0 + w1, 538, 16), { w: 5, color: E.accent, jit: 1, seed: 41, k: prog(t, T.name - 0.2, T.name + 0.2) });
        typed(g, '= al-Khwarizmi', lx + w0, 660, prog(t, T.name, T.name + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink);
        const ka = prog(t, T.algorithm - 0.5, T.algorithm);
        hand(g, seg(lx + w0 + w1 / 2, 690, lx + w0 + w1 / 2 - 60, 790, 10), { w: 4, color: E.accent, jit: 0.8, seed: 42, k: ka });
        arrowHead(g, lx + w0 + w1 / 2 - 60, 790, Math.atan2(100, -60), E.accent, ka);
        typed(g, 'algorithm', lx + w0 + w1 / 2 - 60, 900, prog(t, T.algorithm, T.algorithm + 0.4), 'italic 600 96px "Cormorant Garamond"', E.accent, { align: 'center' });
        g.restore();
      }
      // L51: chữ số đi về phía châu Âu — chậm, rồi khựng lại
      const ke = prog(t, T.europe1, T.europe1 + 0.4);
      typed(g, 'EUROPE', 1500, 620, ke, '800 64px "Archivo"', E.ink);
      const p = 0.55 * outCubic(prog(t, T.heard, T.europe2)) + 0.12 * prog(t, T.europe2, T.hurry + 1.5);
      if (p > 0) {
        g.save(); g.strokeStyle = E.dim; g.lineWidth = 4; g.setLineDash([14, 12]); g.beginPath(); g.moveTo(800, 600); g.lineTo(800 + 640 * p, 600); g.stroke(); g.restore();
        text(g, '1 2 3', 800 + 640 * p - 10, 570, 'italic 600 44px "Cormorant Garamond"', E.ink, 'right');
      }
      typed(g, 'IN NO HURRY', 1500, 670, prog(t, T.hurry - 0.3, T.hurry + 0.3), '500 24px "IBM Plex Mono"', E.accent);
    }
  }
}
