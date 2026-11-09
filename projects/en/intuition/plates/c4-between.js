// c4 · Nothing fits in between (p2, Hồi II). Bảng lật treo trên (logic) + bảng đèn đứng trên sàn chứa TRỤC SỐ phóng to:
//   hai số khác nhau 0.9 < 1 → nhiều số chen giữa (chấm nhỏ) → trung bình (0.9 + 1) / 2 = 0.95 rơi vào (hổ phách, đã tính);
//   "try to find" → ví dụ rơi khỏi trục, điểm trái bước 0.99 → 0.999 → 0.9999 → 0.999… đáp ĐÚNG lên 1 (vòng bao chấm);
//   ô chờ viền đứt "?" thử chen vào, không lọt → nhãn in "NOTHING FITS"; kính lúp: phóng to vẫn MỘT điểm;
//   "can't be two different numbers" → bảng "0.999… = 1 / SAME NUMBER", điểm sáng hổ phách (correct).
import { W, C, FLOOR, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, ctr, tag, label, text, card,
  figure, lookup, must } from '../kit.js';

const N = 20, CELL = 46, GAP = 6, RH = 75, BX = 170, BY = 110;   // bảng treo: 2 hàng × 20 ô (chừa góc phải trên cho biển mục)
const PX = 120, PY = 340, PW = 1320, PH = FLOOR - 340;            // bảng đèn đứng trên sàn (trục số)
const LY = 590;                                                   // trục số
const X = v => 300 + (v - 0.9) * 9000;                            // 0.9 → 300, 1 → 1200
const LENS = [560, 560, 128];

/** Bảng lật theo lịch: S = [[mốc, [hàng | null …], lag?]] — mỗi mục MỘT tiếng flap. */
function rowsAt(t, S, n, n0) {
  const cur = Array(n).fill(' '.repeat(n0)), prev = cur.slice(), k = Array(n).fill(1);
  for (const [at, rows, lag = 0.25] of S) {
    if (t < at) break;
    let j = 0;
    rows.forEach((s, i) => { if (s == null) return; prev[i] = cur[i]; cur[i] = s; const a = at + j * lag; k[i] = prog(t, a, a + 1.1); j++; });
  }
  return { cur, prev, k };
}

export default class Between {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    this.T = {
      another: w(81, 'another'), two: w(82, 'two'), different: w(82, 'different'), more: w(82, 'more'), squeezed: w(82, 'squeezed'),
      average: w(82, 'average'), tryy: w(83, 'try'), find: w(83, 'find'), between: w(83, 'between'),
      steps: [w(83, 'zero'), w(83, 'point'), w(83, 'nine'), w(83, 'repeating')],
      bigger: w(83, 'bigger'), smaller: w(83, 'smaller'), wont: w(84, "won't"), find2: w(84, 'find'),
      nothing: w(85, 'nothing'), cant: w(85, "can't"), different2: w(85, 'different'),
      e81: L(81).start,
    };
    const T = this.T;
    this.START = L(81).start; this.FROM = this.START - 1.2;
    // toán trên hình: trung bình của 0.9 và 1; dãy 0.9, 0.99, … khoảng cách tới 1 = 10^-n; điểm 1 đặt đúng X(1)
    const avg = must('(0.9 + 1) / 2', 0.95);
    this.AVG = String(avg);
    must(`'${this.AVG}'`, '0.95');
    this.VALS = [1, 2, 3, 4].map(n => { const v = '0.' + '9'.repeat(n); must(`1 - ${v}`, 10 ** -n); return v; });
    this.LBL = [...this.VALS, '0.999…'];
    must(`${X(1)}`, 1200);
    const S = [
      [T.another, ['ANOTHER WAY', 'TO FEEL SAFER']],
      [T.two, ['ANY TWO REALS: A < B', ' ']],
      [T.more, [null, 'ALWAYS MORE BETWEEN']],
      [T.average, [null, 'AVERAGE: (A + B) / 2']],
      [T.tryy, ['FIND ONE BETWEEN', '0.999… < ? < 1'], T.between - T.tryy],
      [T.cant, ['0.999… = 1', 'SAME NUMBER']],
    ];
    this.S = S.map(([at, rows, lag]) => [at, rows.map(s => s == null ? null : ctr(s, N)), lag]);
  }
  sfx() {
    const T = this.T;
    return [...this.S.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.squeezed, kind: 'tick' }, { t: T.steps[0], kind: 'tick' }, { t: T.find2, kind: 'chip' }, { t: T.different2, kind: 'correct' }];
  }

  render(g, t) {
    const T = this.T;
    ground(g);
    this.board(g, t);
    // bảng trục số trượt sang giữa khi nhân vật lặn (dolly) — bên phải không bỏ trống
    const ox = 240 * smooth(prog(t, T.average + 0.6, T.average + 1.4));
    g.save(); g.translate(ox, 0); reflect(g, FLOOR, d => this.line(d, t)); g.restore();
    const kp = Math.min(prog(t, T.e81 - 0.2, T.e81 + 0.15), 1 - prog(t, T.average + 0.2, T.average + 0.6));
    if (kp > 0) figure(g, 'ponder', 1700, 1080, 760, kp);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.0), 'ACT TWO', 'NOTHING FITS IN BETWEEN');
  }

  board(g, t) {
    const { cur, prev, k } = rowsAt(t, this.S, 2, N);
    bulbs(g, BX - 46, BY - 46, flapW(N, CELL, GAP) + 92, 2 * RH + 12 + 92, t);
    cur.forEach((s, i) => flap(g, s, BX, BY + i * (RH + 12), CELL, k[i], { from: prev[i], gap: GAP, h: RH }));
  }

  // ── bảng đèn đứng + trục số ──
  line(d, t) {
    const T = this.T, F = this.FROM;
    const inner = bulbs(d, PX, PY, PW, PH, t + 0.37);
    label(d, 'the real number line', inner.x + 24, inner.y + 36, C.dim, 'left', 20, prog(t, F + 0.3, F + 1.0));
    d.save(); d.beginPath(); d.rect(inner.x, inner.y, inner.w, inner.h); d.clip();
    // trục + vạch 0.01
    const kl = outCubic(prog(t, F + 0.3, F + 1.1)), x0 = 190, x1 = 1370;
    d.strokeStyle = C.ink; d.lineWidth = 4; d.lineCap = 'round';
    d.beginPath(); d.moveTo(x0, LY); d.lineTo(x0 + (x1 - x0) * kl, LY); d.stroke();
    for (let i = 0; i <= 13; i++) {
      const v = 0.89 + i * 0.01, x = X(v), major = i === 1 || i === 11;
      if (x > x0 + (x1 - x0) * kl) break;
      d.lineWidth = major ? 3 : 2; d.strokeStyle = major ? C.ink : 'rgba(243,230,207,0.45)';
      d.beginPath(); d.moveTo(x, LY - (major ? 14 : 8)); d.lineTo(x, LY + (major ? 14 : 8)); d.stroke();
    }
    // các số chen giữa ("more numbers squeezed between them") — rơi khỏi trục khi đổi sang 0.999…
    const drop = (i, at) => { const u = prog(t, at + hash(i * 2.7) * 0.35, at + 0.6 + hash(i * 2.7) * 0.35); return u * u * 520; };
    for (let i = 0; i < 11; i++) {
      const at = T.squeezed + i * 0.05, k = outBack(prog(t, at, at + 0.25)); if (k <= 0) continue;
      const x = X(0.9 + 0.1 * (i + 1) / 12 + (hash(i * 4.1) - 0.5) * 0.004), y = LY + drop(i, T.find);
      d.fillStyle = 'rgba(243,230,207,0.75)'; d.beginPath(); d.arc(x, y, 6 * k, 0, 7); d.fill();
    }
    // trung bình (0.9 + 1) / 2 = 0.95 — hổ phách (đã tính)
    const ka = prog(t, T.average, T.average + 0.4);
    if (ka > 0) {
      const ya = LY - (1 - outBack(ka)) * 160 + drop(20, T.find - 0.1), xa = X(0.95);
      d.save(); d.shadowColor = 'rgba(255,170,40,0.8)'; d.shadowBlur = 18; d.fillStyle = C.amber; d.beginPath(); d.arc(xa, ya, 12, 0, 7); d.fill(); d.restore();
      text(d, this.AVG, xa, ya - 32, 48, C.amber, { align: 'center', glow: 'rgba(255,170,40,0.6)', blur: 12, k: prog(t, T.average + 0.2, T.average + 0.6) });
      label(d, '(0.9 + 1) / 2', xa, ya - 96, C.dim, 'center', 22, prog(t, T.average + 0.4, T.average + 0.9));
    }
    // điểm B = 1 (chấm đặc, nhãn dưới) · điểm A = 0.9 → … → 0.999… (vòng, nhãn trên)
    const kb = outBack(prog(t, T.two, T.two + 0.35)), kA = outBack(prog(t, T.different, T.different + 0.35));
    const s = T.steps, lit = prog(t, T.different2, T.different2 + 0.4);
    let st = 0, xA = X(0.9);
    for (let i = 0; i < 4; i++) {
      const u = outCubic(prog(t, s[i], s[i] + 0.22));
      const from = i === 0 ? X(0.9) : X(Number(this.VALS[i - 1])), to = i < 3 ? X(Number(this.VALS[i])) : X(1);
      if (u > 0) { xA = from + (to - from) * u; if (u > 0.5) st = i + 1; }
    }
    const pt = (x, y, k, ring) => {
      d.save(); if (lit > 0) { d.shadowColor = `rgba(255,170,40,${0.85 * lit})`; d.shadowBlur = 22; }
      d.strokeStyle = d.fillStyle = lit > 0.5 ? C.amber : C.ink; d.lineWidth = 4;
      d.beginPath(); d.arc(x, y, (ring ? 18 : 10) * k, 0, 7); ring ? d.stroke() : d.fill(); d.restore();
    };
    if (kb > 0) { pt(X(1), LY, kb, false); text(d, '1', X(1), LY + 66, 48, C.ink, { align: 'center', k: prog(t, T.two + 0.1, T.two + 0.4) }); }
    if (kA > 0) {
      pt(xA, LY, kA, true);
      const ks = st === 0 ? prog(t, T.different + 0.1, T.different + 0.4) : prog(t, s[st - 1] + 0.11, s[st - 1] + 0.3);
      text(d, this.LBL[st], xA, LY - 34, 48, C.ink, { align: 'center', k: ks });
    }
    // ô chờ viền đứt "?" thử chen giữa 0.999… và 1 — hai lần thử, không lọt; nhãn "NOTHING FITS"
    const ko = outBack(prog(t, T.bigger, T.bigger + 0.4));
    if (ko > 0) {
      const dip = a => Math.sin(Math.PI * prog(t, a, a + 0.5)) * 16;
      const cy = 440 + dip(T.smaller) + dip(T.wont) - (1 - ko) * 120, cx = X(1) + Math.sin(Math.PI * 2 * prog(t, T.smaller, T.smaller + 0.5)) * 10;
      d.save(); d.translate(cx, cy); d.scale(ko, ko);
      d.fillStyle = 'rgba(14,11,11,0.85)'; d.fillRect(-52, -46, 104, 92);
      d.strokeStyle = C.ink; d.lineWidth = 3; d.setLineDash([10, 8]); d.strokeRect(-52, -46, 104, 92); d.setLineDash([]);
      text(d, '?', 0, 22, 64, C.dim, { align: 'center' });
      d.restore();
      tag(d, 'nothing fits', cx, cy + 4, prog(t, T.find2, T.find2 + 0.25), { rot: -0.05 });
    }
    d.restore();
    // kính lúp: phóng to vẫn một điểm (vẽ ngoài clip trục, trong bảng)
    const kz = outBack(prog(t, T.nothing, T.nothing + 0.45));
    if (kz > 0) {
      const [lx, ly, r] = LENS, R = r * kz;
      d.save(); d.strokeStyle = 'rgba(243,230,207,0.5)'; d.lineWidth = 2; d.setLineDash([6, 6]);
      d.beginPath(); d.arc(X(1), LY, 28, 0, 7); d.stroke();
      d.beginPath(); d.moveTo(lx + R * 0.7, ly - R * 0.7); d.lineTo(X(1) - 20, LY - 20); d.moveTo(lx + R * 0.7, ly + R * 0.7); d.lineTo(X(1) - 20, LY + 20); d.stroke();
      d.restore();
      d.save(); d.beginPath(); d.arc(lx, ly, R, 0, 7); d.fillStyle = '#0E0B0B'; d.fill(); d.clip();
      d.strokeStyle = C.ink; d.lineWidth = 6; d.beginPath(); d.moveTo(lx - R, ly); d.lineTo(lx + R, ly); d.stroke();
      d.save(); if (lit > 0) { d.shadowColor = `rgba(255,170,40,${0.85 * lit})`; d.shadowBlur = 26; }
      d.strokeStyle = d.fillStyle = lit > 0.5 ? C.amber : C.ink; d.lineWidth = 6;
      d.beginPath(); d.arc(lx, ly, 30 * kz, 0, 7); d.stroke(); d.beginPath(); d.arc(lx, ly, 16 * kz, 0, 7); d.fill(); d.restore();
      text(d, '0.999…', lx, ly - 48, 40, C.ink, { align: 'center', k: prog(t, T.nothing + 0.3, T.nothing + 0.7) });
      text(d, '1', lx, ly + 80, 40, C.ink, { align: 'center', k: prog(t, T.nothing + 0.3, T.nothing + 0.7) });
      d.restore();
      d.save(); d.strokeStyle = C.frame; d.lineWidth = 6; d.beginPath(); d.arc(lx, ly, R, 0, 7); d.stroke(); d.restore();
      label(d, 'zoomed in: still one point', lx, ly + r + 36, C.dim, 'center', 20, prog(t, T.nothing + 0.4, T.nothing + 1.0));
    }
  }
}
