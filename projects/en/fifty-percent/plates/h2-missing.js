// h2 — "Randomness as missing information" (p2 câu 119–122). Hai trạm, camera trôi ngang:
//   S1 (x 0)   câu 119  đồng xu lớn giữa khung, nhãn "RANDOMNESS?" chỉ vào trong xu → gạch (ý sai: không nằm trong xu)
//              câu 120  xu thu về điểm búng; HAI cung gần như trùng lúc đầu toả ra: một rơi H, một rơi T;
//                       vòng soi ở điểm búng (hai hướng lệch nhau một chút) — "hands cannot control / eyes cannot measure"
//              câu 121  sương phủ lên điểm búng, nhãn "MISSING INFORMATION" (sương = điều chưa biết, gọi đúng tên)
//   S2 (x W)   câu 122  ba biểu tượng nhỏ thắp lần lượt: thời tiết, thị trường, giao thông → "complicated — but not mystical"
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, fogBank, coin, typed, text, label, arrow, cross,
  ring, hand, seg, card, lookup } from '../kit.js';

const L0 = [520, 840], P = [[1500, 840, 430, 0], [1660, 840, 455, Math.PI]];   // điểm búng; hai điểm rơi (x, y, độ cao, lệch mặt)
const at = (p, u) => [L0[0] + (p[0] - L0[0]) * u, L0[1] - 4 * p[2] * u * (1 - u)];
const IX = [560, 960, 1360], IY = 540;


// nền tối mềm sau nhãn nằm trên sương (tương phản ≥ 4.5:1 đo ở khung thật); k = tiến độ viết của nhãn
function backing(g, s, x, y, px, align, k) {
  s = s.slice(0, Math.round(s.length * clamp(k))); if (!s) return;                 // bám phần chữ đã viết
  g.save(); g.font = `500 ${px}px ${MONO}`; const w = g.measureText(s).width * 1.02, x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.fillStyle = 'rgba(7,11,20,0.62)'; g.shadowColor = 'rgba(7,11,20,0.62)'; g.shadowBlur = 22;
  g.beginPath(); g.roundRect(x0 - 16, y - px - 8, w + 32, px + 22, 12); g.fill(); g.restore();
}
export default class Missing {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h2');
    this.T = {
      rand: w(119, 'randomness'), not: w(119, 'not'), inside: w(119, 'inside'), end119: L(119).end,
      lies: w(120, 'lies'), result: w(120, 'result'), sensitive: w(120, 'sensitive'), starting: w(120, 'starting'),
      hands: w(120, 'hands'), control: w(120, 'control'), eyes: w(120, 'eyes'), measure: w(120, 'measure'), end120: L(120).end,
      rand2: w(121, 'randomness'), another: w(121, 'another'), missing: w(121, 'missing'), info: w(121, 'information'), end121: L(121).end,
      weather: w(122, 'weather'), markets: w(122, 'markets'), traffic: w(122, 'traffic'), complicated: w(122, 'complicated'),
      sensitive2: w(122, 'sensitive'), start: w(122, 'start'), not2: w(122, 'not'), mystical: w(122, 'mystical'), end: L(122).end,
    };
    this.PAN = this.T.end121 - 0.25;
    this.START = L(119).start;
    this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.rand, kind: 'question' }, { t: T.starting + 0.3, kind: 'pop' }, { t: T.weather + 0.2, kind: 'pop' }, { t: T.not2, kind: 'tick' }];
  }

  s1(g, t) {
    const T = this.T;
    const kIn = outBack(prog(t, this.FROM + 0.9, this.FROM + 1.4));
    const shrink = smooth(prog(t, T.lies - 0.1, T.lies + 0.7));                // xu lớn → về điểm búng
    const fly = prog(t, T.result, T.starting + 0.3);
    // sương trên điểm búng: điều kiện đầu không đo được (câu 121)
    const fogK = smooth(prog(t, T.rand2 - 0.2, T.missing + 0.3));
    fogBank(g, 1100, 600, 520, 240, t, { a: 0.5, seed: 71 });
    // hai cung (vẽ dần theo xu)
    if (fly > 0) P.forEach((p, i) => { g.save(); g.strokeStyle = i ? 'rgba(142,162,184,0.7)' : 'rgba(237,230,214,0.6)'; g.lineWidth = 3; g.setLineDash([10, 14]);
      g.beginPath(); for (let j = 0; j <= 60 * fly; j++) { const [x, y] = at(p, j / 60); j ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); });
    if (fly <= 0) {
      const cx = 960 + (L0[0] - 960) * shrink, cy = 560 + (L0[1] - 560) * shrink, r = (120 - 92 * shrink) * kIn;
      glow(g, cx, cy, r * 2.2, 'rgba(255,216,102,0.25)', kIn);
      coin(g, cx, cy, r, { face: shrink < 0.5 ? 'H' : null, spin: shrink * 1.2 });
    } else {
      P.forEach((p, i) => { const u = clamp(fly * (1 + i * 0.02)), [x, y] = at(p, u), land = u >= 1;
        if (land) glow(g, x, y, 80, 'rgba(255,216,102,0.3)');
        coin(g, x, y, land ? 30 + 8 * outBack(prog(t, T.starting + 0.3, T.starting + 0.7)) : 28, { spin: land ? 0 : u * 31 + p[3] * u, face: i ? 'T' : 'H' }); });
      if (fly >= 1) { label(g, 'heads', P[0][0], 935, C.ivory, 'center', 22); label(g, 'tails', P[1][0], 935, C.ivory, 'center', 22); }
    }
    // vòng soi điểm búng: hai hướng gần trùng
    const kr = prog(t, T.starting - 0.2, T.starting + 0.5);
    if (kr > 0 && fly > 0) { ring(g, L0[0], L0[1], 80, 80, kr, { color: C.fog, w: 3 });
      hand(g, seg(L0[0], L0[1], L0[0] + 46, L0[1] - 66, 6), { w: 3, color: C.ivory, k: kr }); hand(g, seg(L0[0], L0[1], L0[0] + 52, L0[1] - 63, 6), { w: 3, color: C.fog, k: kr, seed: 4 });
    }
    fogBank(g, L0[0], L0[1] - 30, 230, 170, t, { a: 1.5 * fogK, seed: 77, n: 11 });
    if (fly > 0) { backing(g, 'ALMOST THE SAME START', L0[0], 960, 22, 'center', kr * 1.4); typed(g, 'ALMOST THE SAME START', L0[0], 960, kr * 1.4, `500 22px ${MONO}`, C.ivory, { align: 'center' }); }   // nhãn trên lớp sương
    backing(g, 'MISSING INFORMATION', L0[0] - 100, 850, 24, 'right', prog(t, T.missing - 0.1, T.info + 0.4));
    typed(g, 'MISSING INFORMATION', L0[0] - 100, 850, prog(t, T.missing - 0.1, T.info + 0.4), `500 24px ${MONO}`, C.ivory, { align: 'right' });
    // "RANDOMNESS?" chỉ vào trong xu → gạch (câu 119)
    const kq = prog(t, T.rand - 0.1, T.rand + 0.5), gone = smooth(prog(t, T.lies - 0.2, T.lies + 0.3));
    if (kq > 0 && gone < 1) { g.save(); g.translate(0, -gone * 500);
      typed(g, 'RANDOMNESS?', 960, 340, kq * 1.4, `500 26px ${MONO}`, C.ivory, { align: 'center' });
      arrow(g, 960, 362, 960, 438, kq, { color: C.fog, w: 3 });
      cross(g, 960, 405, 30, prog(t, T.not, T.inside + 0.3), { color: C.red }); g.restore(); }
    // chữ trái
    typed(g, 'Not inside the coin.', 96, 300, prog(t, T.not - 0.1, T.end119), `italic 600 54px ${CG}`, C.ivory);
    typed(g, 'hands cannot control,', 96, 380, prog(t, T.hands - 0.2, T.control + 0.4), `italic 500 46px ${CG}`, C.ivory);
    typed(g, 'eyes cannot measure', 96, 436, prog(t, T.eyes - 0.2, T.measure + 0.4), `italic 500 46px ${CG}`, C.ivory);
    typed(g, 'randomness = missing information', 1824, 300, prog(t, T.rand2 - 0.1, T.missing), `italic 600 54px ${CG}`, C.ivory, { align: 'right' });
  }

  s2(g, t) {
    const T = this.T;
    const ks = [T.weather, T.markets, T.traffic].map(a => prog(t, a + 0.1, a + 0.6));
    ks.forEach((k, i) => fogBank(g, IX[i], IY, 170, 130, t, { a: 1.3 - 0.9 * k, seed: 81 + i * 7, n: 6 }));
    ks.forEach((k, i) => { if (k <= 0) return; const x = IX[i], y = IY, s = outBack(k);
      glow(g, x, y, 200, 'rgba(244,184,96,0.3)', k);
      g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = g.lineJoin = 'round';
      if (i === 0) {                                                       // thời tiết: mây + mưa
        g.fillStyle = C.ivory; [[-40, 0, 38], [0, -22, 50], [44, 0, 36]].forEach(([a, b, r]) => { g.beginPath(); g.arc(a, b, r, 0, 7); g.fill(); });
        g.fillRect(-78, 0, 158, 36);
        g.strokeStyle = C.fog; g.lineWidth = 5; for (let j = 0; j < 4; j++) { const dx = -54 + j * 36, ph = ((t * 1.6 + j * 0.37) % 1) * 30;
          g.beginPath(); g.moveTo(dx, 54 + ph); g.lineTo(dx - 8, 74 + ph); g.stroke(); }
      } else if (i === 1) {                                                // thị trường: trục + đường gấp khúc
        g.strokeStyle = C.fog; g.lineWidth = 4; g.beginPath(); g.moveTo(-80, -70); g.lineTo(-80, 70); g.lineTo(90, 70); g.stroke();
        const pts = [[-70, 40], [-40, 10], [-14, 30], [12, -24], [36, 0], [60, -50], [84, -36]];
        hand(g, pts, { w: 5, color: C.amber, k: prog(t, T.markets, T.markets + 0.9) });
      } else {                                                             // giao thông: đèn tín hiệu
        g.fillStyle = '#1B2232'; g.strokeStyle = C.ivory; g.lineWidth = 4; g.beginPath(); g.roundRect(-38, -92, 76, 184, 20); g.fill(); g.stroke();
        [-52, 0, 52].forEach((dy, j) => { g.fillStyle = j === 1 ? C.amber : '#3A4458'; g.beginPath(); g.arc(0, dy, 20, 0, 7); g.fill(); });
      }
      g.restore();
      label(g, ['weather', 'markets', 'traffic'][i], x, IY + 160, C.ivory, 'center', 24); });
    // "complicated… sensitive… but not mystical": mỗi biểu tượng hai vệt toả ra từ một điểm
    const kd = prog(t, T.sensitive2 - 0.1, T.start + 0.3);
    if (kd > 0) IX.forEach((x, i) => { [-1, 1].forEach(sg => hand(g, [[x, IY + 200], [x + sg * 40, IY + 230], [x + sg * 110, IY + 250]].flatMap((p, j, a) => j ? seg(...a[j - 1], ...p, 6).slice(1) : [p]),
      { w: 3, color: sg < 0 ? C.ivory : C.fog, k: kd, seed: i * 5 + sg })); });
    typed(g, 'complicated, sensitive to where they start', W / 2, 900, prog(t, T.complicated - 0.1, T.start + 0.3), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
    typed(g, 'but not mystical.', W / 2, 970, prog(t, T.not2 - 0.2, T.mystical + 0.4), `italic 600 54px ${CG}`, C.gold, { align: 'center' });
  }

  render(g, t) {
    sky(g, t, { fog: 1 });
    const cx = W * smooth(prog(t, this.PAN, this.PAN + 0.9));
    [this.s1, this.s2].forEach((f, i) => { const ox = i * W - cx; if (ox > -W && ox < W) { g.save(); g.translate(ox, 0); f.call(this, g, t); g.restore(); } });
    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4), 'ACT SIX · INFORMATION', 'Randomness as missing information');
  }
}
