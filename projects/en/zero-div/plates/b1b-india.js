// Hồi 1 · "Why zero came so late" (SCRIPT.md) — nửa sau, p2 câu 10–22. Lật trang từ b1a, lỗ ở nhà (960, 640).
//   10–13 bảng đất sét Babylon dán băng keo (nêm thật: 1 · [trống] · 5, hệ 60) · "BASE 60" · ô trống khoanh đỏ ·
//         hai nêm nghiêng ấn vào chỗ trống · "it held a place" · không bao giờ ở cuối số (✗) · + − × đều ✗
//   14–16 Ai Cập "nfr" (số dư bằng không) · vỏ ốc Maya "MAYA ZERO" · "…still not a number" gạch chân đỏ
//   17–20 "INDIA" · 628 · BRAHMAGUPTA · Brāhmasphuṭasiddhānta · số 0 được VIẾT VÀO lỗ · ba luật đúng lúc đọc
//   21–22 lộ trình ba trạm (không phải bản đồ): India 628 → Baghdad c. 820 → Europe 1202
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, lookup, hole, strike, cross, ring, arrow, card, stamp, wedge } from '../kit.js';

const E = ERA.page, C = ERA.clay;
const HX = 960, HY = 640;
const A = s => `800 ${s}px "Archivo"`, M = s => `500 ${s}px "IBM Plex Mono"`, I = s => `italic 600 ${s}px "Cormorant Garamond"`;

// bảng đất sét: 1 · 0 · 5 trong hệ 60 = 1·3600 + 0·60 + 5 — tính để ghi nhãn
const BAB = [1, 0, 5], BAB_V = BAB.reduce((a, d) => a * 60 + d, 0);
if (BAB_V !== 3605) throw new Error('b1b: giá trị hệ 60 sai');
// luật Brahmagupta — kiểm bằng số
for (let a = -7; a <= 7; a++) if (a + 0 !== a || a - a !== 0 || a * 0 !== 0) throw new Error('b1b: luật của 0 sai');

/** Dấu giữ chỗ Babylon: HAI nêm nghiêng chồng dọc (không phải ">>"): đầu nêm to, đuôi ngắn, nghiêng ~35°. */
function slant(g, x, y, s, k, e) {
  if (k <= 0) return;
  const C = ERA[e], p = outBack(clamp(k));
  g.save(); g.translate(x, y); g.rotate(-0.6); g.scale(s * p, s * p); g.fillStyle = C.ink;
  g.beginPath(); g.moveTo(-26, -30); g.lineTo(26, -30); g.lineTo(0, 6); g.fill(); g.fillRect(-4, 0, 8, 30);
  g.fillStyle = 'rgba(255,235,205,0.35)'; g.beginPath(); g.moveTo(-26, -30); g.lineTo(0, -30); g.lineTo(0, 6); g.fill();
  g.restore();
}
function placeholder(g, x, y, s, k, e = 'clay') {
  slant(g, x, y - 34 * s, s, clamp(k * 2), e);
  slant(g, x, y + 40 * s, s, clamp(k * 2 - 1), e);
}
/** Glyph vỏ ốc Maya, nét tay: thân hình thấu kính + hai đường xoắn trong + chấm. */
function shell(g, x, y, k, seed) {
  if (k <= 0) return;
  const n = 32, top = [], bot = [];
  for (let i = 0; i <= n; i++) { const u = i / n, px = x - 110 + 220 * u; top.push([px, y - 62 * Math.sin(Math.PI * u) ** 0.8]); bot.push([px, y + 34 * Math.sin(Math.PI * u)]); }
  hand(g, top.concat(bot.reverse()), { w: 4, color: E.ink, seed, k: clamp(k * 1.5) });
  for (let j = 0; j < 2; j++) {
    const P = []; for (let i = 0; i <= 20; i++) { const u = 0.12 + 0.76 * i / 20; P.push([x - 110 + 220 * u, y - (40 - j * 22) * Math.sin(Math.PI * u) ** 0.8 + 4]); }
    hand(g, P, { w: 3, color: E.ink, seed: seed + 3 + j, k: clamp(k * 2 - 0.8 - j * 0.3) });
  }
  for (let i = 0; i < 4; i++) { const kk = clamp(k * 3 - 2 - i * 0.15); if (kk <= 0) continue;
    g.save(); g.fillStyle = E.ink; g.beginPath(); g.arc(x - 54 + i * 36, y + 16, 5 * kk, 0, 7); g.fill(); g.restore(); }
}

export default class India {
  TRANSITION = 'page';                                           // trang trượt lên (cùng ERA page)
  static ERA = 'page';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1b');
    this.T = {
      babylonians: w(10, 'babylonians'), sixties: w(10, 'sixties'), tens10: w(10, 'tens'), problem: w(10, 'problem'), more: w(10, 'more'), years10: w(10, 'years'),
      centuries: w(11, 'centuries'), era: w(11, 'era'), scribes: w(11, 'scribes'), pressing: w(11, 'pressing'), two: w(11, 'two'), wedges: w(11, 'wedges'), gaps: w(11, 'gaps'),
      job: w(12, 'job'), only: w(12, 'only'), held: w(12, 'held'), place: w(12, 'place'),
      never: w(13, 'never'), end: w(13, 'end'), number13: w(13, 'number'), nobody: w(13, 'nobody'), added: w(13, 'added'), subtracted: w(13, 'subtracted'), multiplied: w(13, 'multiplied'),
      other: w(14, 'other'), close: w(14, 'close'),
      egyptian: w(15, 'egyptian'), word: w(15, 'word'), balance: w(15, 'balance'), nothing15: w(15, 'nothing'), maya: w(15, 'maya'), world: w(15, 'world'), invented: w(15, 'invented'), zero15: w(15, 'zero'),
      sign16: w(16, 'sign'), not16: w(16, 'not'), number16: w(16, 'number'), e16: L(16).end,
      real: w(17, 'real'), leap: w(17, 'leap'), india17: w(17, 'india'),
      six: w(18, 'six'), brahmagupta: w(18, 'brahmagupta'), book: w(18, 'book'), zero18: w(18, 'zero'), treated: w(18, 'treated'), number18: w(18, 'number'), other18: w(18, 'other'),
      rules: w(19, 'rules'), any1: w(19, 'any', 1), same: w(19, 'same'), a2: w(19, 'a', 1), itself: w(19, 'itself'), zero2: w(19, 'zero', 2),
      any3: w(19, 'any', 2), times: w(19, 'times'), zero4: w(19, 'zero', 4),
      nothing20: w(20, 'nothing'), mathematical: w(20, 'mathematical'), object: w(20, 'object'),
      from21: w(21, 'from'), india21: w(21, 'india'), travelled: w(21, 'travelled'), islamic: w(21, 'islamic'), alk: w(21, 'al-khwarizmi'), baghdad: w(21, 'baghdad'),
      twelve: w(22, 'twelve'), fibonacci: w(22, 'fibonacci'), europe: w(22, 'europe'), several: w(22, 'several'), accept: w(22, 'accept'),
    };
    this.START = L(10).start;
    this.FROM = this.START - 1.2;
  }
  sfx() {                                                          // docs/lesson/SFX.md · BRIEF-SFX.md
    const T = this.T;
    return [
      { t: T.babylonians - 0.3, kind: 'pop' },   // bảng đất sét dán lên trang
      { t: T.two - 0.05, kind: 'pop' },          // hai nêm nghiêng ấn vào chỗ trống
      { t: T.held, kind: 'pen' },                // "it held a place"
      { t: T.number13 - 0.1, kind: 'error' },    // ✗ ô cuối — không bao giờ ở cuối số
      { t: T.word, kind: 'pen' },                // "nfr"
      { t: T.maya + 0.1, kind: 'pop' },          // vỏ ốc Maya
      { t: T.sign16 - 0.2, kind: 'pen' },        // "…still not a number"
      { t: T.six - 0.05, kind: 'pen' },          // 628
      { t: T.zero18 - 0.05, kind: 'shimmer' },   // số 0 viết VÀO lỗ — 0 thành một con số
      { t: T.any1 - 0.05, kind: 'pen' },         // ba luật của Brahmagupta
      { t: T.a2 - 0.05, kind: 'pen' },
      { t: T.any3 - 0.05, kind: 'pen' },
      { t: T.india21 - 0.3, kind: 'pop' },       // ba trạm: India · Baghdad · Europe
      { t: T.baghdad - 0.3, kind: 'pop' },
      { t: T.europe - 0.3, kind: 'pop' },
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'page');
    card(g, 'page', prog(t, this.FROM + 0.3, this.FROM + 1.6), 'ACT ONE · NOTHING', 'Why zero came so late');

    // LỖ ở nhà; từ "zero" (câu 18) số 0 được VIẾT vào trong lỗ bằng màu giấy — 0 thành một con số
    const kz = prog(t, T.zero18 - 0.05, T.zero18 + 0.3);
    hole(g, HX, HY, 60, kz > 0 ? () => typed(g, '0', 0, 26, kz, A(72), E.bg, { align: 'center' }) : null, { seed: 3 });

    // ── 10–13: Babylon — trượt lên ở "Other people" ──
    const in1 = outCubic(prog(t, T.babylonians - 0.3, T.babylonians + 0.5)), up1 = outCubic(prog(t, T.other - 0.1, T.other + 0.6)) * -900;
    if (in1 > 0 && up1 > -900) {
      g.save(); g.translate(0, up1);
      // bảng đất sét dán vào trang: trượt lên + xoay nhẹ, rồi hai băng keo
      g.save(); g.translate(530, 395 + (1 - in1) * 700); g.rotate(-0.025 * in1);
      g.fillStyle = 'rgba(0,0,0,0.22)'; g.beginPath(); g.roundRect(-322, -137, 660, 300, 34); g.fill();
      g.fillStyle = C.bg; g.beginPath(); g.roundRect(-330, -145, 660, 290, 34); g.fill();
      for (let i = 0; i < 90; i++) { g.fillStyle = `rgba(51,35,26,${0.05 + hash(i * 3.3) * 0.08})`; g.beginPath(); g.arc(-310 + hash(i) * 620, -125 + hash(i * 7.1) * 250, 2 + hash(i * 1.7) * 6, 0, 7); g.fill(); }
      g.strokeStyle = 'rgba(51,35,26,0.45)'; g.lineWidth = 3; g.beginPath(); g.roundRect(-330, -145, 660, 290, 34); g.stroke();
      g.restore();
      const kt = prog(t, T.babylonians + 0.3, T.babylonians + 0.7);
      [[230, 268, -0.5], [830, 520, -0.5]].forEach(([x, y, r]) => { if (kt <= 0) return; g.save(); g.translate(x, y + (1 - in1) * 700); g.rotate(r); g.fillStyle = 'rgba(232,221,184,0.85)'; g.fillRect(-60 * kt, -18, 120 * kt, 36); g.restore(); });
      // nêm: nhóm 1 = một nêm đứng; nhóm 3 = năm nêm (3 + 2); nhóm giữa TRỐNG
      const dy = (1 - in1) * 700, kw = prog(t, T.babylonians + 0.2, T.babylonians + 1.0);
      wedge(g, 'v', 330, 360 + dy, 0.85, kw);
      [[680, 360], [730, 360], [780, 360], [705, 448], [755, 448]].forEach(([x, y], i) => wedge(g, 'v', x, y + dy, 0.85, clamp(kw * 1.6 - i * 0.12)));
      // hai nêm nghiêng ấn vào chỗ trống ("two slanted wedges")
      placeholder(g, 530, 395, 1, prog(t, T.two - 0.05, T.wedges + 0.3));
      const pl = ['×3600', '×60', '×1'];
      [330, 530, 730].forEach((x, i) => typed(g, pl[i], x, 590, prog(t, T.sixties + i * 0.15, T.sixties + 0.5 + i * 0.15), M(22), E.dim, { align: 'center' }));
      typed(g, 'BABYLON · CLAY TABLET', 200, 640, prog(t, T.babylonians, T.babylonians + 0.8), M(22), E.dim);
      stamp(g, 'BASE 60', 1180, 330, prog(t, T.sixties - 0.1, T.sixties + 0.25), A(56), E.ink, { rot: -0.06 });
      typed(g, 'NOT BASE 10', 1080, 420, prog(t, T.tens10 - 0.1, T.tens10 + 0.4), M(22), E.dim);
      // "this problem": chỗ trống khoanh đỏ + "?" — đến khi nêm ấn vào
      const kq = prog(t, T.problem - 0.2, T.problem + 0.4) * (1 - prog(t, T.two - 0.3, T.two));
      ring(g, 530, 400, 78, 112, kq, { seed: 41 });
      typed(g, '?', 530, 236, kq, A(56), E.accent, { align: 'center' });
      typed(g, 'MORE THAN 1,000 YEARS', 1080, 470, prog(t, T.more, T.years10 + 0.3), M(24), E.ink);
      typed(g, 'WITH NO MARK FOR "EMPTY"', 1080, 504, prog(t, T.more + 0.3, T.years10 + 0.6), M(22), E.dim);
      typed(g, 'A FEW CENTURIES BCE', 200, 680, prog(t, T.centuries, T.era + 0.4), M(22), E.ink);
      typed(g, 'SCRIBES ADD A PLACEHOLDER', 200, 714, prog(t, T.scribes, T.pressing + 0.5), M(22), E.dim);
      // "one job": held a place
      typed(g, 'ONE JOB ONLY:', 1100, 580, prog(t, T.job - 0.1, T.only + 0.3), M(22), E.dim);
      typed(g, 'it held a place', 1100, 640, prog(t, T.held, T.place + 0.4), I(54), E.ink);
      // "never at the end": [5][5][ph] — ô cuối ✗
      const kb = prog(t, T.never - 0.2, T.end + 0.2);
      [0, 1, 2].forEach(i => { const x = 1100 + i * 90; hand(g, [[x, 690], [x + 76, 690], [x + 76, 790], [x, 790], [x, 690]], { w: 3, color: E.ink, seed: 50 + i, k: clamp(kb * 2 - i * 0.3) }); });
      typed(g, '5', 1138, 765, kb * 2 - 0.4, A(56), E.ink, { align: 'center' }); typed(g, '5', 1228, 765, kb * 2 - 0.6, A(56), E.ink, { align: 'center' });
      placeholder(g, 1318, 738, 0.55, prog(t, T.end - 0.1, T.end + 0.3), 'page');
      cross(g, 1318, 740, 30, prog(t, T.number13 - 0.1, T.number13 + 0.3), { seed: 55 });
      typed(g, 'NEVER AT THE END', 1400, 750, prog(t, T.end, T.number13 + 0.5), M(22), E.accent);
      // + − × — nobody computed with it
      [['+', T.added], ['−', T.subtracted], ['×', T.multiplied]].forEach(([s, tw], i) => {
        const x = 1130 + i * 170;
        typed(g, s, x, 900, prog(t, T.nobody + i * 0.12, T.nobody + 0.25 + i * 0.12), A(72), E.ink, { align: 'center' });
        cross(g, x + 66, 874, 20, prog(t, tw, tw + 0.3), { seed: 60 + i });
      });
      typed(g, 'NO SUMS WITH IT', 1140 - 30, 966, prog(t, T.nobody, T.added + 0.5), M(22), E.dim);
      g.restore();
    }

    // ── 14–16: Ai Cập · Maya — vào ở "Other people", trượt lên ở "real leap" ──
    const in2 = outCubic(prog(t, T.other, T.other + 0.6)), up2 = outCubic(prog(t, T.real - 0.1, T.real + 0.6)) * -900;
    if (in2 > 0 && up2 > -900) {
      g.save(); g.translate(0, (1 - in2) * 700 + up2);
      typed(g, 'OTHERS CAME CLOSE', 200, 250, prog(t, T.other, T.close + 0.4), M(22), E.dim);
      // Ai Cập: sổ sách, dòng số dư = "nfr"
      typed(g, 'EGYPT · SCRIBES\' ACCOUNTS', 200, 320, prog(t, T.egyptian, T.egyptian + 0.8), M(22), E.ink);
      const kl = prog(t, T.egyptian + 0.2, T.word);
      [0, 1, 2].forEach(i => hand(g, seg(200, 380 + i * 50, 700, 380 + i * 50, 16), { w: 2, color: E.dim, seed: 70 + i, k: clamp(kl * 2 - i * 0.3) }));
      typed(g, 'BALANCE', 210, 470, prog(t, T.balance, T.balance + 0.4), M(22), E.dim);
      typed(g, 'nfr', 470, 468, prog(t, T.word, T.word + 0.3), I(96), E.ink);
      typed(g, 'NEFER = A BALANCE OF NOTHING', 200, 560, prog(t, T.nothing15 - 0.2, T.nothing15 + 0.8), M(22), E.dim);
      // Maya: vỏ ốc
      typed(g, 'MAYA · THE OTHER SIDE OF THE WORLD', 1100, 320, prog(t, T.maya, T.world + 0.4), M(22), E.ink);
      shell(g, 1330, 440, prog(t, T.maya + 0.1, T.maya + 1.2), 80);
      typed(g, 'MAYA ZERO', 1250, 560, prog(t, T.invented, T.zero15 + 0.3), M(22), E.ink);
      typed(g, 'THEIR OWN INVENTION', 1250, 594, prog(t, T.zero15, T.zero15 + 0.6), M(22), E.dim);
      // câu 16: viết, gạch chân đỏ "not a number"
      const s16a = 'a sign for an empty place is still ', s16b = 'not a number';
      g.save(); g.font = I(54); const wa = g.measureText(s16a).width, wb = g.measureText(s16b).width; g.restore();
      const x16 = HX - (wa + wb) / 2;
      typed(g, s16a, x16, 840, prog(t, T.sign16 - 0.2, T.not16), I(54), E.ink);
      typed(g, s16b, x16 + wa, 840, prog(t, T.not16, T.number16 + 0.3), I(54), E.accent);
      strike(g, x16 + wa, 858, x16 + wa + wb, 856, prog(t, T.number16, T.number16 + 0.4), { w: 5, seed: 90 });
      g.restore();
    }

    // ── 17–20: Ấn Độ — 628, Brahmagupta, luật; trượt lên ở "From India" ──
    const in3 = outCubic(prog(t, T.real, T.real + 0.6)), up3 = outCubic(prog(t, T.from21 - 0.1, T.from21 + 0.6)) * -900;
    if (in3 > 0 && up3 > -900) {
      g.save(); g.translate(0, (1 - in3) * 700 + up3);
      typed(g, 'THE REAL LEAP · INDIA', 200, 260, prog(t, T.leap, T.india17 + 0.3), M(24), E.ink);
      typed(g, '628', 200, 390, prog(t, T.six - 0.05, T.six + 0.4), A(120), E.ink);
      typed(g, 'BRAHMAGUPTA', 200, 470, prog(t, T.brahmagupta - 0.1, T.brahmagupta + 0.5), A(64), E.ink);
      typed(g, 'Brāhmasphuṭasiddhānta', 200, 540, prog(t, T.book - 0.1, T.book + 0.7), I(54), E.ink);
      // "as a number like any other": nhãn dưới lỗ + mũi tên
      typed(g, 'ZERO, A NUMBER LIKE ANY OTHER', HX, 760, prog(t, T.number18 - 0.2, T.other18 + 0.3), M(22), E.ink, { align: 'center' });
      arrow(g, 760, 520, 880, 610, prog(t, T.treated, T.treated + 0.4), { bend: 30, seed: 95 });
      // ba luật
      typed(g, 'HIS RULES', 1180, 330, prog(t, T.rules - 0.1, T.rules + 0.4), M(22), E.dim);
      typed(g, 'a + 0 = a', 1180, 430, prog(t, T.any1 - 0.05, T.same + 0.1), A(72), E.ink);
      typed(g, 'a − a = 0', 1180, 540, prog(t, T.a2 - 0.05, T.zero2 + 0.1), A(72), E.ink);
      typed(g, 'a × 0 = 0', 1180, 650, prog(t, T.any3 - 0.05, T.zero4 + 0.1), A(72), E.ink);
      // "nothing had become a mathematical object"
      typed(g, 'nothing had become a mathematical object', HX, 870, prog(t, T.nothing20 - 0.1, T.object + 0.3), I(54), E.ink, { align: 'center' });
      g.save(); g.font = I(54); const wn = g.measureText('nothing had become a mathematical object').width; g.restore();
      hand(g, seg(HX - wn / 2, 892, HX + wn / 2, 892, 30), { w: 4, color: E.ink, seed: 97, k: prog(t, T.object, T.object + 0.5) });
      g.restore();
    }

    // ── 21–22: lộ trình ba trạm (giấy, không bản đồ) ──
    const in4 = outCubic(prog(t, T.from21, T.from21 + 0.6));
    if (in4 > 0) {
      g.save(); g.translate(0, (1 - in4) * 700);
      const S = [
        { x: 400, y: 420, k: T.india21, name: 'INDIA', year: '628', who: 'BRAHMAGUPTA' },
        { x: 960, y: 300, k: T.alk, name: 'BAGHDAD', year: 'c. 820', who: 'AL-KHWARIZMI' },
        { x: 1520, y: 420, k: T.fibonacci, name: 'EUROPE', year: '1202', who: 'FIBONACCI · LIBER ABACI' },
      ];
      const kn = [T.india21, T.baghdad, T.europe], ky = [T.india21, T.alk, T.twelve];
      S.forEach((s, i) => {
        const kd = outBack(prog(t, kn[i] - 0.3, kn[i] + 0.1));
        if (kd > 0) { g.save(); g.fillStyle = E.ink; g.beginPath(); g.arc(s.x, s.y, 14 * kd, 0, 7); g.fill(); g.restore(); }
        typed(g, s.name, s.x, s.y + 52, prog(t, kn[i] - 0.2, kn[i] + 0.3), M(24), E.ink, { align: 'center' });
        typed(g, s.year, s.x, s.y + 116, prog(t, ky[i], ky[i] + 0.5), A(56), E.ink, { align: 'center' });
        typed(g, s.who, s.x, s.y + 152, prog(t, s.k, s.k + 0.6), M(20), E.dim, { align: 'center' });
      });
      typed(g, 'SCHOLARS OF THE ISLAMIC WORLD', 960, 252, prog(t, T.islamic - 0.3, T.islamic + 0.6), M(20), E.dim, { align: 'center' });
      arrow(g, 430, 400, 920, 296, prog(t, T.travelled - 0.1, T.alk - 0.1), { bend: -50, seed: 101 });
      arrow(g, 1000, 296, 1490, 400, prog(t, T.fibonacci - 0.2, T.europe), { bend: -50, seed: 103 });
      typed(g, 'IN WIDE USE BY c. 16TH CENTURY', 1520, 612, prog(t, T.several, T.accept + 0.3), M(20), E.dim, { align: 'center' });
      g.restore();
    }
  }
}
