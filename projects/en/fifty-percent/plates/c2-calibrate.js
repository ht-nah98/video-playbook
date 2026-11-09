// ACT TWO — "A clever escape" (p2 câu 27–31): hiệu chỉnh (calibration) của dự báo thời tiết.
// Bố cục (DNA §1: dải nhiều ngày "70%" thắp thành hàng, ~7/10 sáng mưa; CONTENT "Ví dụ do hình thêm": 10 ngày, 7 mưa):
//   giữa      MỘT ngày mai "70%" (câu 27) → mất nhãn "tomorrow" ("not about tomorrow"), lùi vào hàng 10 ngày (câu 28)
//   hàng      mỗi ngày = một ngọn đèn nhỏ ghi "70%" (lời dự báo, hổ phách); 7 ngày sáng mưa vàng (câu 29, sự thật)
//   dưới trái "said 70% · rained 7 / 10" + "well calibrated"; dưới phải biểu đồ chấm điểm dự báo (câu 30)
//   câu 31    cả hàng trôi sang trái, chìm vào bức sương ("cannot rescue every case").
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, fogBank, card, typed, text, label, dashes,
  strike, must, lookup } from '../kit.js';

let P70 = 70;                                            // init() thay bằng số must() trả về
const N = 10, DX = 148, X0 = W / 2 - DX * (N - 1) / 2, ROWY = 470, CW = 128, CH = 196;
const RAINY = [0, 1, 3, 4, 6, 7, 9];                     // 7 ngày mưa (vị trí cố định, rải đều — không ngẫu nhiên)
const CX = 1430, CY = 960, CS = 300;                     // biểu đồ hiệu chỉnh: gốc (CX, CY), cạnh CS

function cloud(g, x, y, s, color) {
  g.save(); g.fillStyle = color; g.beginPath();
  for (const [a, b, r] of [[-16, 4, 14], [0, -6, 18], [16, 2, 14], [0, 8, 14]]) { g.moveTo(x + (a + r) * s, y + b * s); g.arc(x + a * s, y + b * s, r * s, 0, 7); }
  g.fill(); g.restore();
}
/** Một ngày: thẻ đèn nhỏ ở (x, y) tâm; on = đèn dự báo bật; rain = mức sáng mưa (0 = chưa biết / không mưa). */
function day(g, x, y, t, on, rain, dry, { tag = null } = {}) {
  g.save(); g.fillStyle = '#121A2B'; g.strokeStyle = on > 0 ? 'rgba(244,184,96,0.55)' : '#2A3446'; g.lineWidth = 2;
  g.beginPath(); g.roundRect(x - CW / 2, y - CH / 2, CW, CH, 12); g.fill(); g.stroke(); g.restore();
  glow(g, x, y - 52, 90, 'rgba(244,184,96,0.30)', on);
  if (on > 0) text(g, P70 + '%', x, y - 30, `600 60px ${CG}`, C.amber, 'center');
  cloud(g, x, y + 36, 1, rain > 0 ? '#D9D2C2' : '#3A465A');
  if (rain > 0) {                                                          // mưa thật = vàng (DNA §2)
    glow(g, x, y + 50, 80, 'rgba(255,216,102,0.35)', rain);
    g.save(); g.strokeStyle = C.gold; g.lineWidth = 3; g.lineCap = 'round'; g.globalAlpha = clamp(rain * 1.3);
    for (let i = 0; i < 4; i++) { const dx = -18 + i * 12, f = ((t * 1.6 + i * 0.37) % 1); g.beginPath(); g.moveTo(x + dx, y + 56 + f * 10); g.lineTo(x + dx - 4, y + 68 + f * 10); g.stroke(); }
    g.restore();
  }
  if (dry > 0) label(g, 'dry', x, y + 86, C.fog, 'center', 20);
  if (tag) tag();
}

export default class Calibrate {
  static ERA = 'night';
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    this.T = {
      people: L(27).start, clever: w(27, 'clever'), weather: w(27, 'weather'),
      seventy: w(28, 'seventy'), percent: w(28, 'percent'), not: w(28, 'not'), tomorrow: w(28, 'tomorrow'), all: w(28, 'all'), whole: w(28, 'whole'), collection: w(28, 'collection'),
      days: w(28, 'days'), said: w(28, 'said'), seventy2: w(28, 'seventy', 2),
      seven: w(29, 'seven'), rainy: w(29, 'rainy'), well: w(29, 'well'), calibrated: w(29, 'calibrated'),
      lovely: w(30, 'lovely'), forecasting: w(30, 'forecasting'), models: w(30, 'models'), scored: w(30, 'scored'), practice: w(30, 'practice'),
      but: L(31).start, cannot: w(31, 'cannot'), rescue: w(31, 'rescue'), cse: w(31, 'case'), end: L(31).end,
    };
    this.START = L(27).start; this.FROM = this.START - 1.2;
    this.RAIN = must('10 * 0.7', 7); P70 = must('7 / 10 * 100', 70);                                       // CONTENT: 10 ngày "70%", 7 ngày mưa
    if (RAINY.length !== this.RAIN) throw new Error('c2: số ngày mưa vẽ ra khác 7');
  }
  sfx() {
    const T = this.T;
    return [{ t: T.collection, kind: 'pop' }, { t: T.seven, kind: 'tick' }, { t: T.calibrated, kind: 'correct' }, { t: T.forecasting, kind: 'tick' }];
  }
  render(g, t) {
    const T = this.T;
    sky(g, t, { fog: 1 });
    const away = smooth(prog(t, T.rescue - 0.3, T.end + 0.4));             // câu 31: cả hàng trôi trái vào sương
    g.save(); g.translate(-away * 760, 0);

    // ── câu 27–28: một ngày mai ở giữa → về ô thứ 5 của hàng; 9 ngày còn lại nổi lên từ sương ──
    const centre = 4, kIn = outBack(prog(t, this.FROM + 1.0, this.FROM + 1.6));
    const back = smooth(prog(t, T.tomorrow, T.all + 0.6));            // "not about tomorrow at all": lùi về hàng
    const s1 = 1.35 - 0.35 * back, x1 = W / 2 + (X0 + centre * DX - W / 2) * back, y1 = ROWY + 40 * (1 - back);
    const rainAt = i => { const r = RAINY.indexOf(i); return r < 0 ? Infinity : T.seven + r * ((T.rainy + 0.2 - T.seven) / (this.RAIN - 1)); };
    for (let i = 0; i < N; i++) {
      if (i === centre) continue;
      const k = outCubic(prog(t, T.collection + 0.05 * Math.abs(i - centre) - 0.2, T.days + 0.08 * Math.abs(i - centre) + 0.2));
      const d = Math.abs(i - centre) - (i > centre ? 0.5 : 0);               // thứ tự toả ra từ giữa
      const kSlot = outBack(prog(t, T.all + 0.2 + d * 0.22, T.all + 0.5 + d * 0.22));   // ô trống đứt nét: "it is about…"
      if (kSlot > 0 && k < 1) {
        g.save(); g.globalAlpha = 0.8 * (1 - k); g.strokeStyle = C.fog; g.lineWidth = 2.5; g.setLineDash([8, 8]);
        const sw = CW * (0.6 + 0.4 * kSlot), sh = CH * (0.6 + 0.4 * kSlot);
        g.beginPath(); g.roundRect(X0 + i * DX - sw / 2, ROWY - sh / 2, sw, sh, 12); g.stroke(); g.restore();
      }
      if (k <= 0) continue;
      const side = i < centre ? -1 : 1, x = X0 + i * DX + side * (1 - k) * 260;
      g.save(); g.translate(x, ROWY + (1 - k) * 90); g.globalAlpha = clamp(k * 1.3);
      const on = prog(t, T.said - 0.2 + i * 0.04, T.seventy2 + 0.2 + i * 0.04) * 0.6 + 0.4 * k;
      day(g, 0, 0, t, on, outCubic(prog(t, rainAt(i), rainAt(i) + 0.3)), prog(t, T.rainy + 0.3, T.rainy + 0.8) * (RAINY.includes(i) ? 0 : 1));
      g.restore();
    }
    if (kIn > 0) {
      const pulse = 1 + 0.08 * Math.sin(Math.PI * prog(t, T.seventy - 0.1, T.percent + 0.4));   // "the seventy percent"
      glow(g, x1, y1 - 60, 200, 'rgba(244,184,96,0.25)', (pulse - 1) / 0.08);
      g.save(); g.translate(x1, y1); g.scale(s1 * (0.8 + 0.2 * kIn) * pulse, s1 * (0.8 + 0.2 * kIn) * pulse);
      day(g, 0, 0, t, clamp(kIn), outCubic(prog(t, rainAt(centre), rainAt(centre) + 0.3)), 0);
      g.restore();
      // nhãn "tomorrow" trên ngày giữa: hiện ở "weather", gạch ở "not about tomorrow", trôi lên khi về hàng
      const kt = prog(t, T.clever, T.weather + 0.3);
      if (kt > 0 && back < 1) {
        const ty = y1 - CH / 2 * s1 - 28 - back * 80;
        g.save(); g.globalAlpha = 1 - back;
        typed(g, 'TOMORROW', x1, ty, kt, `500 24px ${MONO}`, C.ivory, { align: 'center' });
        strike(g, x1 - 76, ty - 8, x1 + 76, ty - 8, prog(t, T.not, T.tomorrow + 0.3), { color: C.fog, w: 4 });
        g.restore();
      }
    }
    // tên hàng: "the days the forecast said 70%"
    if (t > T.collection) {
      typed(g, `every day the forecast said ${P70}%`, W / 2, ROWY - CH / 2 - 34, prog(t, T.collection, T.seventy2 + 0.4), `italic 600 44px ${CG}`, C.ivory, { align: 'center' });
    }

    // ── câu 29: đếm ngày mưa, "said 70% · rained 7 / 10", "well calibrated" ──
    const lit = RAINY.filter(i => t >= rainAt(i)).length;
    if (t > T.seven - 0.1) {
      let x = 96;
      x += text(g, 'said ', x, 760, `italic 600 54px ${CG}`, C.ivory);
      x += text(g, P70 + '%', x, 760, `600 72px ${CG}`, C.amber);
      x += text(g, '  ·  rained ', x, 760, `italic 600 54px ${CG}`, C.ivory);
      text(g, `${lit} / ${N}`, x, 760, `600 72px ${CG}`, C.gold);
    }
    typed(g, 'well calibrated', 96, 864, prog(t, T.well - 0.05, T.calibrated + 0.5), `italic 600 72px ${CG}`, C.ivory);

    // ── câu 30: biểu đồ chấm điểm dự báo — dự báo 70% ↔ thực tế 7/10, nằm trên đường chéo ──
    const kc = prog(t, T.lovely, T.forecasting + 0.4);
    if (kc > 0) {
      const ax = 'rgba(142,162,184,0.9)';
      dashes(g, CX, CY, CX + CS, CY, ax, { w: 3, on: 400, off: 0, k: kc * 1.5 });
      dashes(g, CX, CY, CX, CY - CS, ax, { w: 3, on: 400, off: 0, k: kc * 1.5 });
      dashes(g, CX, CY, CX + CS, CY - CS, 'rgba(237,230,214,0.55)', { w: 2, k: prog(t, T.forecasting - 0.2, T.models + 0.3) });
      label(g, 'forecast', CX + CS, CY + 34, C.fog, 'right', 20);
      g.save(); g.translate(CX - 18, CY - CS); g.rotate(-Math.PI / 2); label(g, 'rained', 0, 0, C.fog, 'right', 20); g.restore();
      const kd = outBack(prog(t, T.scored - 0.1, T.scored + 0.35));
      if (kd > 0) {
        const fx = P70 / 100, ry = this.RAIN / N, px = CX + CS * fx, py = CY - CS * ry;
        dashes(g, px, CY, px, py, 'rgba(244,184,96,0.6)', { w: 2, k: kd });
        glow(g, px, py, 60, 'rgba(255,216,102,0.5)', kd);
        g.save(); g.fillStyle = C.gold; g.beginPath(); g.arc(px, py, 10 * kd, 0, 7); g.fill(); g.restore();
      }
      typed(g, 'HOW FORECASTS ARE SCORED', CX + CS, CY - CS - 34, prog(t, T.forecasting, T.practice + 0.3), `500 22px ${MONO}`, C.ivory, { align: 'right' });
    }
    g.restore();

    // bức sương bên trái nuốt hàng (câu 31) — luôn có, dày lên khi hàng trôi vào
    fogBank(g, 160, 560, 420, 360, t, { a: 0.5 + 1.2 * away, seed: 13, n: 10 });
    typed(g, 'cannot rescue every case', 1824, 300, prog(t, T.cannot, T.cse + 0.3), `italic 600 54px ${CG}`, C.fog, { align: 'right' });

    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4), 'ACT TWO · ONE-OFFS', 'A clever escape');
  }
}
