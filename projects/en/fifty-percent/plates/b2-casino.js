// ACT ONE (p2, câu 12–19) — "The world that runs on frequencies". DNA §1: sòng bạc = phỉnh dưới đèn bàn, hàng triệu ván =
// dòng phỉnh chảy đều về nhà cái; bảo hiểm, nhà máy = hàng đốm sáng đếm được. Bố cục ba cột, thắp lần lượt theo lời:
//   x 400   sòng bạc: deskLamp + phỉnh; "this round" một phỉnh với "?"; "millions of rounds" dòng phỉnh về chồng HOUSE
//   x 960   bảo hiểm: một đốm "YOU ?" → lưới khách hàng toả ra từ nó, vài đốm sáng (tai nạn)
//   x 1520  nhà máy: băng chuyền, đèn kiểm tra soi từng hộp
//   câu 12  chân trời: hàng đèn nhỏ thắp dần ("a huge number of systems")
//   câu 16–18 vòng lặp ↻ trên mỗi cột; tung lại xu / lô mới / hàng khách mới; vạch đo dưới mỗi cột + dấu kiểm
//   câu 19  đèn dịu, sương cuộn vào từ phải, một dấu "?" trong sương — trao sang ACT TWO
import { W, H, clamp, prog, smooth, outCubic, outBack, hash, C, CG, MONO, sky, glow, fogBank, beam, coin, chip, deskLamp,
  hand, seg, arrow, cross, typed, text, label, card, lookup } from '../kit.js';

const CX = { casino: 400, ins: 960, fac: 1520 };
const POOL = { x: 400, y: 690, rx: 250 };
const HOUSE = [548, 676];                                  // chồng phỉnh nhà cái (trong vũng đèn)
const GRID = { cols: 22, rows: 20, s: 19, x0: 960 - 21 * 19 / 2, y0: 430 };
const BELT = { x0: 1290, x1: 1780, y: 760, gate: 1520 };
const NAME_Y = 905, SUB_Y = 945, BAR_Y = 852;

export default class Casino {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2');
    this.T = {
      useful: w(12, 'useful'), huge: w(12, 'huge'), systems: w(12, 'systems'),
      casino: w(13, 'casino'), who: w(13, 'who'), round: w(13, 'round'), but: w(13, 'but'), millions: w(13, 'millions'),
      insurance: w(14, 'insurance'), you: w(14, 'you'), accident: w(14, 'accident'), how: w(14, 'how'), million: w(14, 'million'), customers: w(14, 'customers'),
      factory: w(15, 'factory'), quality: w(15, 'quality'), products: w(15, 'products'), logic: w(15, 'logic'),
      examples: w(16, 'examples'), repeated: w(16, 'repeated'),
      flipping: w(17, 'flipping'), batches: w(17, 'batches'), selling: w(17, 'selling'), policies: w(17, 'policies'),
      frequency: w(18, 'frequency'), number: w(18, 'number'), measure: w(18, 'measure'), test: w(18, 'test'), settled: w(18, 'settled'), data: w(18, 'data'),
      problems: w(19, 'problems'), natural: w(19, 'natural'), choice: w(19, 'choice'), trouble: w(19, 'trouble'), not: w(19, 'not'), kind: w(19, 'kind', 2),
    };
    this.START = L(12).start; this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.casino, kind: 'chip' }, { t: T.millions, kind: 'chip' }, { t: T.you, kind: 'pop' }, { t: T.million + 0.25, kind: 'tick' },
      { t: T.products, kind: 'pop' }, { t: T.flipping, kind: 'coin' }, { t: T.policies - 0.3, kind: 'pop' }, { t: T.measure, kind: 'tick' },
      { t: T.not, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T;
    const dim = smooth(prog(t, T.trouble - 0.2, T.kind + 0.6));          // câu 19: đèn dịu, sương nuốt
    const bright = 1 + 0.25 * Math.sin(Math.PI * prog(t, T.problems, T.choice + 0.6));
    const push = 1 + 0.025 * smooth(prog(t, this.START, T.kind));
    g.save(); g.translate(W / 2, H * 0.6); g.scale(push, push); g.translate(-W / 2, -H * 0.6);
    sky(g, t, { fog: 0.7 + 0.6 * dim, y: 0.78 });

    // ── chân trời: hàng đèn nhỏ thắp dần ("a huge number of systems around us") ──
    for (let i = 0; i < 46; i++) {
      const x = 110 + i * 37 + (hash(i * 2.1) - 0.5) * 20, y = 300 + (hash(i * 4.7) - 0.5) * 26;
      const k = prog(t, T.useful + 0.4 + hash(i * 1.7) * (T.systems + 0.6 - T.useful), T.useful + 0.7 + hash(i * 1.7) * (T.systems + 0.6 - T.useful));
      const a = k * (0.75 - 0.4 * prog(t, T.casino - 0.3, T.casino + 0.8)) * (1 - 0.7 * dim) * (0.85 + 0.15 * Math.sin(t * 3 + i));
      if (a > 0) { glow(g, x, y, 16, 'rgba(244,184,96,0.8)', a); g.fillStyle = `rgba(255,227,168,${a})`; g.fillRect(x - 1.5, y - 1.5, 3, 3); }
    }

    this.casino(g, t, dim, bright);
    this.insurance(g, t, dim, bright);
    this.factory(g, t, dim, bright);

    // ── câu 16: vòng lặp trên mỗi cột (quay chậm mãi) ──
    [CX.casino, CX.ins, CX.fac].forEach((x, i) => {
      const k = prog(t, T.repeated - 0.2 + i * 0.22, T.repeated + 0.5 + i * 0.22);
      if (k <= 0) return;
      const y = 236, r = 30, a0 = t * (1.2 + 1.2 * prog(t, T.problems, T.natural)) + i;
      const P = Array.from({ length: 25 }, (_, j) => { const a = a0 + j / 24 * Math.PI * 1.6 * outCubic(k); return [x + Math.cos(a) * r, y + Math.sin(a) * r]; });
      hand(g, P, { w: 3.5, color: `rgba(244,184,96,${0.9 - 0.6 * dim})`, jit: 0.4, seed: 4 + i });
      if (k >= 1) { const a = a0 + Math.PI * 1.6, hx = x + Math.cos(a) * r, hy = y + Math.sin(a) * r, d = a + Math.PI / 2;
        hand(g, [[hx - 13 * Math.cos(d - 0.5), hy - 13 * Math.sin(d - 0.5)], [hx, hy], [hx - 13 * Math.cos(d + 0.5), hy - 13 * Math.sin(d + 0.5)]], { w: 3.5, color: `rgba(244,184,96,${0.9 - 0.6 * dim})`, jit: 0.3 }); }
    });

    // ── câu 18: vạch đo dưới mỗi cột (tần suất thành con số đo được), dấu kiểm ở "test", sáng ở "data" ──
    const kBar = prog(t, T.frequency - 0.1, T.frequency + 0.9);
    if (kBar > 0) [[CX.casino, 0.62], [CX.ins, 0.05], [CX.fac, 0.86]].forEach(([x, f], i) => {
      const x0 = x - 150, x1 = x + 150, a = 1 - 0.6 * dim;
      g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(142,162,184,0.35)'; g.fillRect(x0, BAR_Y - 4, (x1 - x0) * outCubic(kBar), 8);
      g.fillStyle = C.amber; g.fillRect(x0, BAR_Y - 4, (x1 - x0) * f * outCubic(prog(t, T.frequency + 0.2 + i * 0.15, T.number + 0.4)), 8);
      const kTk = prog(t, T.measure - 0.1, T.measure + 0.5);
      for (let j = 0; j <= 10; j++) if (kTk * 10 >= j) g.fillRect(x0 + (x1 - x0) * j / 10 - 1, BAR_Y + 8, 2, j % 5 ? 8 : 14);
      g.restore();
      const kC = prog(t, T.test + i * 0.15, T.test + 0.5 + i * 0.15);
      if (kC > 0) hand(g, [[x1 + 22, BAR_Y - 2], [x1 + 32, BAR_Y + 10], [x1 + 52, BAR_Y - 18]], { w: 4, color: C.gold, k: kC, jit: 0.5, seed: 8 + i });
      glow(g, x0 + (x1 - x0) * f, BAR_Y, 40, 'rgba(255,216,102,0.6)', prog(t, T.settled, T.data + 0.4) * (1 - dim));
    });

    // ── câu 19: sương cuộn vào từ phải, một "?" trong sương ──
    if (dim > 0) {
      fogBank(g, 2300 - 1100 * dim, 600, 700, 420, t, { a: 1.6 * dim, seed: 31, n: 12 });
      fogBank(g, 2500 - 1500 * dim, 380, 600, 300, t, { a: 1.2 * dim, seed: 47, n: 9 });
      const kq = outBack(prog(t, T.not - 0.1, T.not + 0.5));
      if (kq > 0) { g.save(); g.translate(1560, 560); g.scale(kq, kq); text(g, '?', 0, 40, `italic 600 120px ${CG}`, 'rgba(201,212,224,0.85)', 'center'); g.restore(); }
    }
    g.restore();

    card(g, 'night', prog(t, this.FROM + 0.6, this.FROM + 2.2), 'ACT ONE · FREQUENCY', 'The world that runs on frequencies');
  }

  // ── sòng bạc: phỉnh dưới đèn bàn ──
  casino(g, t, dim, bright) {
    const T = this.T, on = outCubic(prog(t, T.casino - 0.1, T.casino + 0.5)) * (1 - 0.8 * dim) * bright;
    deskLamp(g, POOL.x, POOL.y, POOL.rx, on, t, { top: 330 });
    if (on <= 0) return;
    // phỉnh nằm rải trong vũng đèn (đạo cụ)
    [[260, 730, '#1E1E22'], [300, 660, '#1E1E22'], [470, 740, C.brass], [230, 690, '#1E1E22']].forEach(([x, y, b], i) =>
      chip(g, x, y, 20, b, { spots: b === C.brass ? C.chip : C.chipRim }));
    // "who wins THIS round": một phỉnh trượt vào giữa, "?" — rồi đi về nhà cái ở "but"
    const kIn = outCubic(prog(t, T.who - 0.3, T.who + 0.3)), kGo = smooth(prog(t, T.but, T.but + 0.8));
    if (kIn > 0) {
      const x = 150 + (POOL.x - 150) * kIn + (HOUSE[0] - POOL.x) * kGo, y = POOL.y + 20 - (POOL.y + 20 - HOUSE[1]) * kGo;
      if (kGo < 1) chip(g, x, y, 26, C.chip);
      const kq = outBack(prog(t, T.round - 0.3, T.round + 0.2)) * (1 - kGo);
      if (kq > 0) { g.save(); g.translate(POOL.x, POOL.y - 40); g.scale(kq, kq); text(g, '?', 0, 0, `italic 600 64px ${CG}`, C.ivory, 'center'); g.restore(); }
    }
    // "millions of rounds": dòng phỉnh chảy đều về nhà cái (chu kỳ 0.28 s, mỗi phỉnh bay 1.1 s)
    const t0 = T.millions - 0.2, per = 0.28, fly = 1.1;
    const landed = t < t0 + fly ? (kGo >= 1 ? 1 : 0) : 1 + Math.floor((t - t0 - fly) / per) + 1;
    for (let j = 0; j < Math.min(landed, 40); j++) { const c = j % 4, r = (j / 4) | 0;
      chip(g, HOUSE[0] + c * 22 - (r % 2) * 8, HOUSE[1] - r * 6 - c * 3, 22, j % 7 === 3 ? C.brass : C.chip, { spots: j % 7 === 3 ? C.chip : C.chipRim }); }
    if (t > t0) for (let j = Math.max(0, Math.floor((t - t0 - fly) / per)); j * per + t0 <= t; j++) {
      const u = (t - t0 - j * per) / fly; if (u < 0 || u > 1) continue;
      const sx = 170 + hash(j * 2.3) * 40, sy = 700 + hash(j * 3.1) * 70;
      chip(g, sx + (HOUSE[0] - sx) * smooth(u), sy + (HOUSE[1] - 40 - sy) * u - 50 * Math.sin(u * Math.PI), 18, C.chip);
    }
    const kH = prog(t, T.millions - 0.4, T.millions + 0.2);
    label(g, 'house', HOUSE[0] + 30, HOUSE[1] + 70, `rgba(244,184,96,${(1 - 0.6 * dim) * clamp(kH * 3)})`, 'center', 20);
    // câu 17: "keep flipping the coin" — xu bật lên khỏi bàn, ba lần
    for (let j = 0; j < 3; j++) {
      const u = prog(t, T.flipping - 0.2 + j * 1.25, T.flipping + 0.8 + j * 1.25);
      if (u > 0 && u < 1) { const y = POOL.y - 20 - 260 * Math.sin(u * Math.PI); glow(g, 330, y, 50, 'rgba(255,216,102,0.3)'); coin(g, 330, y, 20, { spin: u * 20 }); }
    }
    typed(g, 'CASINO', CX.casino, NAME_Y, prog(t, T.casino, T.casino + 0.5), `500 24px ${MONO}`, C.ivory, { align: 'center' });
    typed(g, 'MILLIONS OF ROUNDS', CX.casino, SUB_Y, prog(t, T.millions, T.millions + 0.7), `500 20px ${MONO}`, C.amber, { align: 'center' });
  }

  // ── bảo hiểm: một "YOU ?" → lưới khách hàng toả ra, vài đốm sáng ──
  insurance(g, t, dim, bright) {
    const T = this.T, kYou = outBack(prog(t, T.insurance - 0.1, T.insurance + 0.4));
    if (kYou <= 0) return;
    const G = GRID, you = [G.x0 + 11 * G.s, G.y0 + 9 * G.s];
    const kGrid = prog(t, T.how - 0.2, T.customers + 0.2), kNew = prog(t, T.selling - 0.1, T.policies + 0.1);
    const lift = G.s * smooth(kNew);                                     // hàng khách mới: lưới nhích lên một hàng
    const a = 1 - 0.65 * dim;
    for (let r = 0; r <= G.rows; r++) for (let c = 0; c < G.cols; c++) {
      if (r === G.rows && kNew <= 0) continue;
      const tx = G.x0 + c * G.s, ty = G.y0 + r * G.s - lift, d = Math.hypot(c - 11, r - 9) / 15;
      let k = r === G.rows ? outBack(prog(kNew, c / 30, c / 30 + 0.3)) : prog(kGrid, d * 0.6, d * 0.6 + 0.4);
      if (c === 11 && r === 9) k = 1;
      if (k <= 0) continue;
      const x = you[0] + (tx - you[0]) * outCubic(k), y = you[1] + (ty - you[1]) * outCubic(k);
      const lit = hash(r * 31.7 + c * 7.3) < 0.045 && prog(t, T.million + hash(r + c * 3) * 0.6, T.million + 0.3 + hash(r + c * 3) * 0.6) > 0;
      if (lit) { glow(g, x, y, 22, 'rgba(244,184,96,0.8)', a * bright); g.fillStyle = `rgba(255,227,168,${a})`; }
      else g.fillStyle = `rgba(142,162,184,${(c === 11 && r === 9 ? 0.95 : 0.55) * a})`;
      g.beginPath(); g.arc(x, y, c === 11 && r === 9 ? 6 * kYou : 4.2 * Math.min(1, k * 1.4), 0, 7); g.fill();
    }
    // "YOU ?" chỉ một người — co vào đốm khi lưới toả ra
    const kq = (1 - smooth(prog(t, T.how - 0.3, T.how + 0.3)));
    if (kq > 0) {
      g.save(); g.translate(you[0], you[1] - lift); g.scale(kq, kq);
      text(g, 'YOU', 0, -26, `500 22px ${MONO}`, C.ivory, 'center', 3);
      const k2 = outBack(prog(t, T.accident - 0.4, T.accident + 0.1)); if (k2 > 0) { g.scale(k2, k2); text(g, '?', 34, 14, `italic 600 54px ${CG}`, C.ivory, 'left'); }
      g.restore();
    }
    typed(g, 'INSURANCE', CX.ins, NAME_Y, prog(t, T.insurance, T.insurance + 0.6), `500 24px ${MONO}`, C.ivory, { align: 'center' });
    typed(g, 'A MILLION CUSTOMERS', CX.ins, SUB_Y, prog(t, T.million, T.customers + 0.4), `500 20px ${MONO}`, C.amber, { align: 'center' });
  }

  // ── nhà máy: băng chuyền, đèn kiểm tra soi từng hộp ──
  factory(g, t, dim, bright) {
    const T = this.T, kB = prog(t, T.factory - 0.2, T.factory + 0.6);
    if (kB <= 0) return;
    const B = BELT, a = 1 - 0.65 * dim;
    hand(g, seg(B.x0, B.y, B.x1, B.y, 30), { w: 4, color: 'rgba(142,162,184,0.8)', k: kB, seed: 12 });
    hand(g, seg(B.x0, B.y + 26, B.x1, B.y + 26, 30), { w: 3, color: 'rgba(142,162,184,0.5)', k: kB, seed: 13 });
    const run = t - T.factory, speed = 120;
    for (let x = B.x0 + 20; x < B.x0 + (B.x1 - B.x0) * kB; x += 49) {          // con lăn quay
      g.save(); g.strokeStyle = 'rgba(142,162,184,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(x, B.y + 13, 9, 0, 7); g.stroke();
      const an = run * speed / 9; g.beginPath(); g.moveTo(x, B.y + 13); g.lineTo(x + 9 * Math.cos(an), B.y + 13 + 9 * Math.sin(an)); g.stroke(); g.restore();
    }
    // đèn kiểm tra (chao + chùm xuống băng)
    const lampOn = outCubic(prog(t, T.quality - 0.2, T.quality + 0.4)) * (1 - 0.8 * dim) * bright;
    g.save(); g.fillStyle = '#231A10'; g.beginPath(); g.moveTo(B.gate - 44, 470); g.lineTo(B.gate + 44, 470); g.lineTo(B.gate + 20, 440); g.lineTo(B.gate - 20, 440); g.fill();
    g.strokeStyle = '#2A2016'; g.lineWidth = 3; g.beginPath(); g.moveTo(B.gate, 380); g.lineTo(B.gate, 440); g.stroke(); g.restore();
    beam(g, B.gate, 470, B.gate, B.y, 30, 150, 0.35 * lampOn);
    // hộp: sinh mỗi 0.62 s ở đầu băng; qua đèn → sáng hổ phách (đạt) hoặc ✗ đỏ (lỗi — cái sai, hiếm)
    const per = 0.62, travel = (B.x1 - B.x0) / speed;
    const batch = prog(t, T.batches - 0.3, T.batches + 0.3);
    const drop = x => { const u = Math.max(0, x - B.x1 + 10) / speed; return 2000 * u * u; };   // cuối băng: hộp rơi khỏi khung
    for (let j = Math.max(0, Math.floor((run - travel - 1) / per)); j * per <= run; j++) {
      const age = run - j * per, x = B.x0 + age * speed, fy = drop(x); if (B.y - 36 + fy > H + 40) continue;
      const bad = hash(j * 9.31 + 2) < 0.12, past = x > B.gate + 8 && lampOn > 0.5;
      g.save(); g.globalAlpha = a; g.fillStyle = past && !bad ? '#C58A3A' : '#3A3226'; g.fillRect(x - 17, B.y - 36 + fy, 34, 34);
      g.strokeStyle = past && !bad ? '#FFD38A' : '#6A5A44'; g.lineWidth = 2; g.strokeRect(x - 17, B.y - 36 + fy, 34, 34); g.restore();
      if (past && bad) cross(g, x, B.y - 56 + fy, 10, 1, { color: C.red });
    }
    // "new batches": lô 5 hộp mới rơi xuống băng ở đầu
    if (batch > 0) for (let j = 0; j < 5; j++) {                  // trôi theo băng rồi rơi khỏi đầu cuối như mọi hộp
      const k = outBack(prog(t, T.batches - 0.2 + j * 0.08, T.batches + 0.3 + j * 0.08)), slide = Math.max(0, t - T.batches - 0.5) * speed;
      const x = B.x0 + 20 + j * 38 + slide, y = B.y - 36 - (1 - k) * 160 + drop(x); if (k <= 0 || y > H + 40) continue;
      g.save(); g.globalAlpha = a; g.fillStyle = '#3A3226'; g.fillRect(x - 17, y, 34, 34); g.strokeStyle = '#8A7656'; g.lineWidth = 2; g.strokeRect(x - 17, y, 34, 34); g.restore();
    }
    typed(g, 'QUALITY CHECK', CX.fac, NAME_Y, prog(t, T.quality, T.quality + 0.6), `500 24px ${MONO}`, C.ivory, { align: 'center' });
    typed(g, 'EVERY BATCH, SAME LOGIC', CX.fac, SUB_Y, prog(t, T.logic - 0.5, T.logic + 0.4), `500 20px ${MONO}`, C.amber, { align: 'center' });
  }
}
