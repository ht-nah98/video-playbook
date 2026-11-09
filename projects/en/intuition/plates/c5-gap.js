// c5 · The gap your gut can feel (p2, Hồi II). Sân khấu hai khu, camera dolly ngang:
//   khu A (số thực): thẻ trực giác "STILL A LITTLE SHORT" bật lên lại (vật xuyên suốt, nguyên trạng); trên bảng đèn,
//     điểm 0.999… lùi khỏi 1 để lộ "khe hở" viền đứt "TINY GAP?" (trực giác tưởng ra); bảng lật: "A TINY GAP LEFT?" →
//     "THE FEELING: NOT SILLY" → luật "IN THE REAL NUMBERS: NO DISTANCE > 0 AND SMALLER THAN EVERY POSITIVE NUMBER";
//     "nowhere to put that gap" → khe bị ép về 0, hai điểm nhập lại.
//   khu B (hệ số khác): bảng tên bóng đèn "OTHER NUMBER SYSTEMS / INFINITESIMALS ALLOWED"; Newton (ảnh) + "& LEIBNIZ"
//     (chỉ chữ) · "INVENTED CALCULUS"; Robinson "ABRAHAM ROBINSON · 1960s" (credit) · "MADE RIGOROUS"; nhân vật `sky`
//     chỉ lên bảng tên ở "your intuition is pointing toward systems like those".
//   về khu A: "THE SYMBOL 0.999… LIVES IN THE REAL NUMBERS" → "THERE: 0.999… = 1".
import { W, C, FLOOR, clamp, outBack, outCubic, smooth, prog, ground, reflect, bulbs, flap, flapW, ctr, gutCard, tag, label, text,
  card, figure, portrait, lookup } from '../kit.js';

const PAGE = W;
const N = 22, CELL = 44, GAP = 6, RH = 72, RG = 84, BX = 170, BY = 110;   // bảng 22 ô (≤ 4 hàng), chừa góc phải trên
const PX = 124, PY = 510, PW = flapW(N, CELL, GAP) + 92, PH = FLOOR - 510; // bảng đèn trục số (khu A)
const LY = 672, XC = 760, SPLIT = 300;                                    // trục; điểm 1; 0.999… lùi tới XC − SPLIT
const NEWTON = { x: 680, y: 390, h: 330, crop: [600, 100, 1250, 1450] };
const ROBIN = { x: 1160, y: 390, h: 330, crop: [120, 110, 420, 500] };

function rowsAt(t, S, n, n0) {
  const cur = Array(n).fill(' '.repeat(n0)), prev = cur.slice(), k = Array(n).fill(1);
  for (const [at, rows, lag = 0.25] of S) {
    if (t < at) break;
    let j = 0;
    rows.forEach((s, i) => { if (s == null) return; prev[i] = cur[i]; cur[i] = s; const a = at + j * lag; k[i] = prog(t, a, a + 1.1); j++; });
  }
  return { cur, prev, k };
}

export default class Gap {
  static ERA = 'stage';
  static IMAGES = { newton: './assets/history/newton.jpg', robinson: './assets/history/robinson.jpg' };
  static POSES = ['sky'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c5');
    this.T = {
      still: w(86, 'still'), tiny: w(86, 'tiny'), that87: w(87, 'that'), real88: w(88, 'real'), no: w(88, 'no'), but88: w(88, 'but'),
      every: w(88, 'every'), nowhere: w(89, 'nowhere'), other: w(90, 'other'), distances: w(90, 'distances'), small: w(90, 'small'), allowed: w(90, 'allowed'),
      newton: w(91, 'newton'), leibniz: w(91, 'leibniz'), calculus: w(91, 'calculus'), abraham: w(91, 'abraham'), rigorous: w(91, 'rigorous'),
      your: w(92, 'your'), talking: w(93, 'talking'), equals: w(93, 'equals'),
    };
    const T = this.T;
    this.START = L(86).start; this.FROM = this.START - 1.2;
    this.PAN = [L(90).start - 0.8, L(93).start + 0.15];       // → khu B · ← khu A
    const S = [
      [T.tiny, ['A TINY GAP LEFT?', ' ', ' ', ' ']],
      [T.that87, [null, 'THE FEELING:', 'NOT SILLY', null]],
      [T.real88, ['IN THE REAL NUMBERS:', ' ', ' ', ' ']],
      [T.no, [null, 'NO DISTANCE > 0', null, null]],
      [T.but88, [null, null, 'AND SMALLER THAN', 'EVERY POSITIVE NUMBER'], T.every - T.but88 - 0.1],
      [T.talking, ['THE SYMBOL 0.999…', 'LIVES IN THE', 'REAL NUMBERS', ' ']],
      [T.equals, [null, null, null, 'THERE: 0.999… = 1']],
    ];
    this.S = S.map(([at, rows, lag]) => [at, rows.map(s => s == null ? null : ctr(s, N)), lag]);
    this.SIGN = [[T.other, ['OTHER NUMBER SYSTEMS', ' ']], [T.allowed, [null, 'INFINITESIMALS ALLOWED']]]
      .map(([at, rows]) => [at, rows.map(s => s == null ? null : ctr(s, N))]);
  }
  sfx() {
    const T = this.T;
    return [...this.S.map(([t]) => ({ t, kind: 'flap' })), ...this.SIGN.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.leibniz, kind: 'chip' }, { t: T.abraham + 0.42, kind: 'chip' }];
  }
  cam(t) { const [a, b] = this.PAN; return PAGE * (smooth(prog(t, a, a + 0.9)) - smooth(prog(t, b, b + 0.9))); }

  render(g, t) {
    const T = this.T, cx = this.cam(t);
    ground(g);
    g.save(); g.translate(-cx, 0);
    if (cx < PAGE) this.zoneA(g, t);
    if (cx > 0) this.zoneB(g, t);
    g.restore();
    // nhân vật `sky` (toạ độ màn hình) — chỉ lên bảng tên "OTHER NUMBER SYSTEMS"; lặn trước khi dolly về khu A
    const ks = Math.min(prog(t, T.rigorous + 0.15, T.rigorous + 0.5), 1 - prog(t, this.PAN[1] - 0.4, this.PAN[1] - 0.05));
    if (ks > 0) figure(g, 'sky', 300, 1080, 760, ks);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT TWO', 'THE GAP YOUR GUT CAN FEEL');
  }

  board(g, t, S, n, by = BY) {
    const { cur, prev, k } = rowsAt(t, S, n, N);
    bulbs(g, BX - 46, by - 46, flapW(N, CELL, GAP) + 92, n * RG - 12 + 92, t);
    cur.forEach((s, i) => flap(g, s, BX, by + i * RG, CELL, k[i], { from: prev[i], gap: GAP, h: RH }));
  }

  // ── khu A: số thực ──
  zoneA(g, t) {
    const T = this.T, F = this.FROM;
    this.board(g, t, this.S, 4);
    reflect(g, FLOOR, d => {
      const inner = bulbs(d, PX, PY, PW, PH, t + 0.37);
      label(d, 'the real number line', inner.x + 24, inner.y + 34, C.dim, 'left', 20, prog(t, F + 0.3, F + 1.0));
      d.save(); d.beginPath(); d.rect(inner.x, inner.y, inner.w, inner.h); d.clip();
      const kl = outCubic(prog(t, F + 0.3, F + 1.1)), x0 = inner.x + 40, x1 = inner.x + inner.w - 40;
      d.strokeStyle = C.ink; d.lineWidth = 4; d.lineCap = 'round';
      d.beginPath(); d.moveTo(x0, LY); d.lineTo(x0 + (x1 - x0) * kl, LY); d.stroke();
      // khe hở trực giác tưởng ra: 0.999… lùi khỏi 1, khe viền đứt; "nowhere" → ép về 0
      const sp = outCubic(prog(t, T.tiny, T.tiny + 0.6)) * (1 - outCubic(prog(t, T.nowhere, T.nowhere + 0.5)));
      const xa = XC - SPLIT * sp, lit = prog(t, T.equals, T.equals + 0.4);
      if (sp > 0.02) {
        const gx = xa + 24, gw = Math.max(0, XC - 16 - gx);
        d.save(); d.fillStyle = 'rgba(243,230,207,0.06)'; d.fillRect(gx, LY - 30, gw, 60);
        d.strokeStyle = C.ink; d.lineWidth = 2.5; d.setLineDash([9, 7]); d.strokeRect(gx, LY - 30, gw, 60); d.restore();
        d.save(); d.translate(gx + gw / 2, LY - 48); d.scale(Math.min(1, sp * 1.2), 1);
        label(d, 'tiny gap?', 0, 0, C.ink, 'center', 22, prog(t, T.tiny + 0.3, T.tiny + 0.8)); d.restore();
      }
      const ka = prog(t, F + 0.5, F + 0.9);
      d.save(); if (lit > 0) { d.shadowColor = `rgba(255,170,40,${0.85 * lit})`; d.shadowBlur = 22; }
      d.strokeStyle = d.fillStyle = lit > 0.5 ? C.amber : C.ink; d.lineWidth = 4;
      d.beginPath(); d.arc(XC, LY, 10 * outBack(ka), 0, 7); d.fill();
      d.beginPath(); d.arc(xa, LY, 18 * outBack(ka), 0, 7); d.stroke(); d.restore();
      text(d, '0.999…', xa, LY - 36, 48, C.ink, { align: 'center', k: ka });
      text(d, '1', XC, LY + 58, 48, C.ink, { align: 'center', k: ka });
      label(d, 'nowhere to put it', inner.x + inner.w - 40, LY + 52, C.ink, 'right', 22, prog(t, T.nowhere + 0.3, T.nowhere + 1.0));
      d.restore();
    });
    // thẻ trực giác (vật xuyên suốt): nguyên trạng từ c1, bật lên ở "still feel"
    gutCard(g, 'STILL A\nLITTLE SHORT', 1600, 880, 440, 210, 1, { rise: prog(t, T.still - 0.3, T.still + 0.2), rot: 0.04, seed: 47 });
  }

  // ── khu B: hệ số khác ──
  zoneB(g, t) {
    const T = this.T, X = PAGE;
    g.save(); g.translate(X, 0);
    this.board(g, t, this.SIGN, 2);
    // khe vô cùng bé: ĐƯỢC tồn tại ở hệ khác (đường liền, không viền đứt) — bảng nhỏ bên phải, không số
    const ki = prog(t, T.distances, T.distances + 0.5);
    // ô chờ viền đứt (§63): có sẵn khi camera tới khu B, nhường chỗ khi vật thật hiện
    const wait = (x, y, w, h, gone) => { if (gone >= 1) return; g.save(); g.globalAlpha = 1 - gone;
      g.strokeStyle = 'rgba(243,230,207,0.4)'; g.lineWidth = 2.5; g.setLineDash([12, 9]); g.strokeRect(x, y, w, h); g.restore(); };
    const nW = portrait(g, 'newton', NEWTON.x, NEWTON.y, NEWTON.h, 0, { crop: NEWTON.crop }).w;
    const rW = portrait(g, 'robinson', ROBIN.x, ROBIN.y, ROBIN.h, 0, { crop: ROBIN.crop }).w;
    wait(NEWTON.x - 40, NEWTON.y - 40, nW + 80, NEWTON.h + 80, prog(t, T.newton, T.newton + 0.2));
    wait(ROBIN.x - 40, ROBIN.y - 40, rW + 80, ROBIN.h + 80, prog(t, T.abraham, T.abraham + 0.2));
    wait(1520, 420, 300, FLOOR - 420, prog(t, T.distances, T.distances + 0.2));
    if (ki > 0) reflect(g, FLOOR, d => {
      const ix = 1520, iw = 300, iy = 420, inner = bulbs(d, ix, iy, iw, FLOOR - iy, t + 0.21, { pad: 18, r: 6, step: 30 });
      const cy = inner.y + 150, x0 = inner.x + 30, x1 = inner.x + inner.w - 30, cx = inner.x + inner.w / 2;
      d.strokeStyle = C.ink; d.lineWidth = 4; d.lineCap = 'round';
      d.beginPath(); d.moveTo(x0, cy); d.lineTo(x0 + (x1 - x0) * outCubic(ki), cy); d.stroke();
      const sp = 22 * outCubic(prog(t, T.small, T.small + 0.5));
      d.fillStyle = C.ink; d.beginPath(); d.arc(cx - sp, cy, 9, 0, 7); d.fill(); d.beginPath(); d.arc(cx + sp, cy, 9, 0, 7); d.fill();
      if (sp > 1) { d.lineWidth = 3; d.beginPath(); d.moveTo(cx - sp, cy - 30); d.lineTo(cx - sp, cy - 40); d.lineTo(cx + sp, cy - 40); d.lineTo(cx + sp, cy - 30); d.stroke(); }
      label(d, 'infinitely', cx, cy + 70, C.ink, 'center', 20, prog(t, T.allowed - 0.2, T.allowed + 0.3));
      label(d, 'small gap', cx, cy + 100, C.ink, 'center', 20, prog(t, T.allowed, T.allowed + 0.5));
      label(d, 'allowed', cx, cy + 150, C.dim, 'center', 20, prog(t, T.allowed + 0.3, T.allowed + 0.8));
    });
    const kn = prog(t, T.newton, T.newton + 0.8), kr = prog(t, T.abraham, T.abraham + 0.8);
    portrait(g, 'newton', NEWTON.x, NEWTON.y, NEWTON.h, kn, { name: 'Isaac Newton', t, crop: NEWTON.crop });
    const nw = portrait(g, 'newton', NEWTON.x, NEWTON.y, NEWTON.h, 0, { crop: NEWTON.crop }).w, ncx = NEWTON.x + nw / 2;
    tag(g, '& Leibniz', ncx, NEWTON.y + NEWTON.h + 140, prog(t, T.leibniz, T.leibniz + 0.25), { rot: 0.03, size: 22 });
    label(g, 'invented calculus', ncx, 970, C.ink, 'center', 20, prog(t, T.calculus, T.calculus + 0.6));
    const rw = portrait(g, 'robinson', ROBIN.x, ROBIN.y, ROBIN.h, kr, { note: 'photo: Konrad Jacobs · CC BY-SA 2.0 DE', t, crop: ROBIN.crop }).w;
    // nhãn tên giữ chữ thường "1960s" (portrait.name viết HOA) → tag keepCase
    tag(g, 'ABRAHAM ROBINSON · 1960s', ROBIN.x + rw / 2, ROBIN.y + ROBIN.h + 76, clamp(kr * 2 - 1), { rot: -0.02, size: 22, keepCase: true });
    label(g, 'made them rigorous', ROBIN.x + rw / 2, 970, C.ink, 'center', 20, prog(t, T.rigorous, T.rigorous + 0.6));
    g.restore();
  }
}
