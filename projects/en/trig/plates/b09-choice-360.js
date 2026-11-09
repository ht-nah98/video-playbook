// b09 · ACT FIVE — "Three hundred and sixty is a choice" (câu 57–60, ERA tent: bảng Babylon). DNA ferris, nhóm G3.
//  57 degrees…choice   vòng đu quay vẽ vành chia độ (360 vạch quét một vòng), vé DEGREES, vé A CHOICE
//  58 full turn…sixties cung chanh quét cả vòng, vé 360°, khung gương bảng Babylon trượt vào, sáu múi 60 + 60 + … (6 × 60 = 360)
//  59 halves…sixths     ảnh rời đi; mỗi từ một phép chia vành (vạch chanh) + một vé xếp cột trái; "many more" = chấm mịn
//  60 nothing special   vé "MATHEMATICALLY SPECIAL" bị gạch xám; ý đúng viết dưới: JUST A CHOICE
import { W, H, C, AR, TAU, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, wheel, ticket, secTag, actTitle, strike,
  mirrorFrame, photoImages, line, text, SPIN, angleArc } from '../kit.js';

const inC = u => u * u * u;
const lerp = (a, b, u) => a + (b - a) * u;
const WX = 1470, WY = 540, WR = 268;                                 // vòng đu quay bên phải
const PHOTO = { x: 400, y: 250, w: 420, h: 520 };                    // khung đứng (cắt thang màu bên trái bảng Babylon)
const DIV = [['HALVES', 2], ['THIRDS', 3], ['QUARTERS', 4], ['FIFTHS', 5], ['SIXTHS', 6]];

export default class Choice360 {
  static ERA = 'tent';
  static IMAGES = photoImages('babylon');
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b09');
    this.T = {
      degrees: w(57, 'degrees'), choice: w(57, 'choice'),
      full: w(58, 'full'), sixty: w(58, 'sixty'), babylonians: w(58, 'babylonians'), counted: w(58, 'counted'), sixties: w(58, 'sixties'),
      splits: w(59, 'splits'), div: [w(59, 'halves'), w(59, 'thirds'), w(59, 'quarters'), w(59, 'fifths'), w(59, 'sixths')], many: w(59, 'many'), handy: w(59, 'handy'),
      nothing: w(60, 'nothing'), special: w(60, 'special'), math: w(60, 'mathematically'),
    };
    this.START = L(57).start;
    this.FROM = Math.max(this.START - 2.6, L(56).end + 0.5);
    this.END = L(60).end;
    // 6 múi × 60° = 360° (mọi số lên hình qua must)
    this.SECT = must('360 / 60', 6);
    this.Z60 = String(must('360 / 6', 60));
    this.Z360 = String(must('6 * 60', 360));
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.START - 1.45, 'flap'), c(T.full + 0.3, 'tick'), c(T.babylonians + 0.1, 'card'), c(T.div[0], 'tick'),
      c(T.nothing + 0.45, 'snap'), c(T.math + 0.05, 'pen')];
  }
  render(g, t) {
    const T = this.T, S = this.START;
    ground(g, 'tent');
    actTitle(g, t, S, 'ACT FIVE', 'Why mathematicians measure in radians');
    secTag(g, 'Three hundred and sixty is a choice', { k: prog(t, S, S + 0.4), t });

    // ── vòng đu quay + vành chia độ ──
    const come = outCubic(prog(t, S - 0.7, S + 0.1)), cy = WY + (1 - come) * 520;
    const th = 0.5 + SPIN * t;
    const Wh = wheel(g, WX, cy, WR, { theta: th, hero: true, legs: false, alpha: 1 });
    const sweep = prog(t, T.degrees, T.degrees + 2.2);
    this.dial(g, WX, cy, WR, sweep, t);
    // cung chanh quét cả vòng ở "full turn" (câu 58), hạ xuống trước phép chia (câu 59)
    const arcK = outCubic(prog(t, T.full, T.sixty + 0.3)) * (1 - smooth(prog(t, T.splits - 0.2, T.splits + 0.3)));
    if (arcK > 0.002) angleArc(g, WX, cy, 118, TAU * arcK * 0.9995);
    // sáu múi 60 (sixties)
    for (let i = 0; i < this.SECT; i++) {
      const k = prog(t, T.counted + i * 0.17, T.counted + i * 0.17 + 0.35) * (1 - smooth(prog(t, T.splits - 0.1, T.splits + 0.3)));
      if (k <= 0) continue;
      const a0 = i * 60 * Math.PI / 180, a1 = a0 + Math.PI / 3, am = (a0 + a1) / 2;
      g.save(); g.fillStyle = i % 2 ? 'rgba(242,182,50,0.30)' : 'rgba(143,214,193,0.40)'; g.beginPath(); g.moveTo(WX, cy); g.arc(WX, cy, 100 + 30 * k, -a1, -a0); g.closePath(); g.globalAlpha = k; g.fill(); g.restore();
      g.globalAlpha = k; text(g, this.Z60, WX + 150 * Math.cos(am) * 0.58, cy - 150 * Math.sin(am) * 0.58 + 2, { font: `800 34px ${AR}`, color: C.ink, align: 'center', base: 'middle' }); g.globalAlpha = 1;
    }
    // ── phép chia vành (câu 59): vạch chanh = GÓC ──
    DIV.forEach(([name, n], i) => {
      const a = T.div[i], b = i < 4 ? T.div[i + 1] : T.many, k = Math.min(prog(t, a, a + 0.3), 1 - prog(t, b - 0.05, b + 0.25));
      if (k <= 0) return;
      for (let j = 0; j < n; j++) { const an = th + j * TAU / n, rx = Math.cos(an), ry = -Math.sin(an);
        line(g, WX + rx * 60 * k, cy + ry * 60 * k, WX + rx * (WR + 8) * k, cy + ry * (WR + 8) * k, C.ang, 6); }
    });
    const km = prog(t, T.many, T.many + 0.5) * (1 - prog(t, T.nothing - 0.15, T.nothing + 0.3));
    if (km > 0) for (const n of [8, 9, 10, 12]) for (let j = 0; j < n; j++) { const an = th + j * TAU / n; g.fillStyle = `rgba(242,182,50,${0.9 * km})`; g.beginPath(); g.arc(WX + (WR + 40 + n) * Math.cos(an), cy - (WR + 40 + n) * Math.sin(an), 5, 0, TAU); g.fill(); }

    // ── vé bên trái (57): DEGREES / A CHOICE, rời sang trái trước khi ảnh Babylon vào ──
    const outK = prog(t, T.splits - 0.2, T.splits + 0.3), tOut = inC(prog(t, T.babylonians - 0.45, T.babylonians + 0.05));
    if (tOut < 1) {
      g.save(); g.translate(-1000 * tOut, 0);
      ticket(g, 'DEGREES', 520, 400, { size: 84, color: C.angInk, edge: C.ang, k: prog(t, T.degrees, T.degrees + 0.35) });
      ticket(g, 'A CHOICE', 520, 560, { size: 84, color: C.ink, edge: C.ink, k: prog(t, T.choice, T.choice + 0.35) });
      g.restore();
    }
    const tk = prog(t, T.sixty + 0.05, T.sixty + 0.4) * (1 - outK);
    if (tk > 0) ticket(g, this.Z360 + '°', WX, cy, { size: 76, color: C.angInk, edge: C.ang, k: tk });

    // ── ảnh bảng Babylon (câu 58) ──
    const pk = Math.min(prog(t, T.babylonians - 0.1, T.babylonians + 0.6), 1 - prog(t, T.splits - 0.1, T.splits + 0.5));
    if (pk > 0) mirrorFrame(g, 'babylon', PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h, { k: pk, rot: -0.03, label: 'BABYLONIAN TABLET YBC 7289 · BASE-60 NUMBERS', zoom: 1.45 + 0.04 * prog(t, T.babylonians, T.splits), t });

    // ── cột trái: halves … sixths (câu 59) ──
    const exit = inC(prog(t, T.nothing - 0.35, T.nothing + 0.3));
    DIV.forEach(([name], i) => {
      const k = prog(t, T.div[i], T.div[i] + 0.3); if (k <= 0) return;
      g.save(); g.translate(-1000 * exit, 0); ticket(g, name, 470, 330 + i * 104, { size: 46, color: C.angInk, edge: C.ang, k }); g.restore();
    });
    const kmm = prog(t, T.many, T.many + 0.3);
    if (kmm > 0) { g.save(); g.translate(-1000 * exit, 0); ticket(g, 'AND MANY MORE', 520, 330 + 5 * 104, { size: 46, color: C.ink, edge: C.ink, k: kmm }); g.restore(); }

    // ── câu 60: gạch xám ──
    const k1 = prog(t, T.nothing - 0.1, T.nothing + 0.3);
    if (k1 > 0) {
      const bx = ticket(g, 'MATHEMATICALLY SPECIAL', 640, 400, { size: 60, color: C.ink, edge: C.ink, k: k1 });
      strike(g, bx.x + 10, bx.y + bx.h * 0.55, bx.x + bx.w - 10, bx.y + bx.h * 0.45, prog(t, T.special - 0.1, T.special + 0.3), { w: 10 });
      ticket(g, 'JUST A CHOICE', 640, 560, { size: 64, color: C.ink, edge: C.ang, k: prog(t, T.math, T.math + 0.35) });
    }
  }
  // vành chia độ: 360 vạch quét theo góc (sweep 0 → 1); mỗi 30° vạch dài hơn
  dial(g, cx, cy, R, sweep, t) {
    if (sweep <= 0) return;
    const n = Math.round(this.SECT * 60), last = Math.floor(n * clamp(sweep));
    g.save(); g.lineCap = 'round';
    for (let i = 0; i < last; i++) {
      const a = i * TAU / n, big = i % 30 === 0, mid = i % 10 === 0, r0 = R + 14, r1 = R + (big ? 40 : mid ? 30 : 22);
      g.strokeStyle = big ? C.ang : 'rgba(35,50,74,0.7)'; g.lineWidth = big ? 4 : mid ? 2.5 : 1.5;
      g.beginPath(); g.moveTo(cx + r0 * Math.cos(a), cy - r0 * Math.sin(a)); g.lineTo(cx + r1 * Math.cos(a), cy - r1 * Math.sin(a)); g.stroke();
    }
    g.restore();
  }
}
