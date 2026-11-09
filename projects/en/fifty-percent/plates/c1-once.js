// ACT TWO mở hồi — "Things that happen once" (p2 câu 20–26).
// Bố cục (DNA §1: ba vật đơn lẻ trong sương, mỗi vật một nhãn % trong đèn người xem):
//   trái dưới   đèn bão của NGƯỜI XEM; ba con số % xếp cột TRONG quầng đèn (x 130–560), không trên vật (DNA §9)
//   giữa–phải   ba vật nổi lên từ sương: mây mưa Hà Nội (x 820), lọ thuốc pha 3 (x 1220), lá phiếu (x 1620);
//               chùm đèn quét tới vật đang được đọc thì vật sáng lên
//   câu 24–26   dưới mỗi vật một nhãn "chỉ một lần"; "no million tomorrows": hàng mây ma đứt nét lan sang phải phía trên
//               rồi chìm vào sương ở "count" — chỉ có MỘT ngày mai thật.
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, mk, sky, glow, lantern, beam, fogBank, card, actTitle,
  typed, text, label, must, lookup } from '../kit.js';

const LX = 210, LY = 930;                                // đèn bão người xem
const OBJ = [{ x: 820, y: 460 }, { x: 1220, y: 460 }, { x: 1620, y: 460 }];
const SPR = {};

function cloudPath(x, s) {                               // mây = các vòng tròn chồng (toạ độ gốc 0,0; s tỉ lệ)
  const P = [[-70, 10, 46], [-22, -18, 62], [40, -6, 54], [82, 18, 38], [0, 22, 48], [-100, 28, 30]];
  x.beginPath(); for (const [a, b, r] of P) { x.moveTo(a * s + r * s, b * s); x.arc(a * s, b * s, r * s, 0, 7); }
}
// Sprite mỗi vật (vẽ MỘT lần): bản sáng + bản tối (chìm sương). 320×320, tâm (160,160).
function sprite(kind, lit) {
  return (SPR[kind + lit] ??= (() => {
    const c = mk(320, 320), x = c.getContext('2d'); x.translate(160, 160);
    const ink = lit ? C.ivory : '#2A3446', shade = lit ? '#CFC6B2' : '#242D3D';
    if (kind === 'cloud') {
      x.fillStyle = shade; x.save(); x.translate(6, 10); cloudPath(x, 1); x.fill(); x.restore();
      x.fillStyle = ink; cloudPath(x, 1); x.fill();
    } else if (kind === 'vial') {
      x.fillStyle = lit ? '#3B4A5E' : '#1A2130'; x.beginPath(); x.roundRect(-26, -118, 52, 34, 6); x.fill();       // nắp
      x.fillStyle = shade; x.beginPath(); x.roundRect(-58, -86, 116, 196, 16); x.fill();                           // thân
      x.fillStyle = lit ? 'rgba(244,184,96,0.85)' : '#2A2A30'; x.beginPath(); x.roundRect(-52, -6, 104, 110, 12); x.fill();   // thuốc
      x.fillStyle = ink; x.fillRect(-58, -60, 116, 44);                                                              // nhãn
      x.fillStyle = lit ? '#1C2433' : '#141A26'; x.font = `500 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText('PHASE 3', 0, -37);
      x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 5; x.beginPath(); x.moveTo(-42, -10); x.lineTo(-42, 90); x.stroke();
    } else {                                                                                                         // lá phiếu
      x.rotate(-0.06); x.fillStyle = shade; x.fillRect(-92, -116, 196, 244); x.fillStyle = ink; x.fillRect(-98, -122, 196, 244);
      x.fillStyle = lit ? '#1C2433' : '#141A26'; x.font = `500 20px ${MONO}`; x.fillText('BALLOT', -74, -86);
      x.strokeStyle = lit ? '#59657A' : '#1C2433'; x.lineWidth = 3;
      for (let i = 0; i < 3; i++) { const y = -42 + i * 58; x.strokeRect(-74, y - 16, 32, 32); x.beginPath(); x.moveTo(-26, y); x.lineTo(70, y); x.stroke(); }
      x.strokeStyle = lit ? '#1C2433' : '#141A26'; x.lineWidth = 6; x.lineCap = 'round';                            // dấu chọn ô giữa
      x.beginPath(); x.moveTo(-70, 16); x.lineTo(-60, 28); x.lineTo(-40, -2); x.stroke();
    }
    return c;
  })());
}
/** Vật trong sương: k = nổi lên (0–1), lit = đèn chạm (0 = chìm tối). */
function thing(g, kind, x, y, k, lit) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * 120, s = 0.9 + 0.1 * outBack(clamp(k));
  g.save(); g.translate(x, y + dy); g.scale(s, s);
  g.globalAlpha = clamp(k * 1.4); g.drawImage(sprite(kind, false), -160, -160);
  if (lit > 0) { g.globalAlpha = clamp(lit) * clamp(k * 1.4); g.drawImage(sprite(kind, true), -160, -160); }
  g.restore();
}
function ghostCloud(g, x, y, s, a) {                     // một "ngày mai" không có thật: bóng mây mờ màu sương (không có thật)
  if (a <= 0) return;
  g.save(); g.translate(x, y); g.globalAlpha = clamp(a) * 0.4; g.fillStyle = C.fog; cloudPath(g, s); g.fill(); g.restore();
}

export default class Once {
  static ERA = 'night';
  init({ tl }) {
    const { L, w } = lookup(tl, 'c1');
    this.T = {
      sentences: w(20, 'sentences'), these: w(20, 'these'),
      rains: w(21, 'rains'), hanoi: w(21, 'hanoi'), p70: w(21, 'seventy'),
      drug: w(22, 'drug'), phase: w(22, 'phase'), p30: w(22, 'thirty'),
      candidate: w(23, 'candidate'), election: w(23, 'election'), p60: w(23, 'sixty'),
      one: w(24, 'one'), repeat: w(24, 'repeat'),
      tested: w(25, 'tested'), once1: w(25, 'once'),
      happens: w(26, 'happens'), once2: w(26, 'once'), no: w(26, 'no'), million: w(26, 'million'), tomorrows: w(26, 'tomorrows'),
      count: w(26, 'count'), rainy: w(26, 'rainy'), end: L(26).end,
    };
    this.START = L(20).start; this.FROM = this.START - 2.6;
    this.P = [must('70', 70), must('30', 30), must('60', 60)];   // CONTENT §2: mưa 70%, pha 3 30%, bầu cử 60%
  }
  sfx() {
    const T = this.T;
    return [{ t: T.p70, kind: 'pop' }, { t: T.p30, kind: 'pop' }, { t: T.p60, kind: 'pop' }, { t: T.once1, kind: 'tick' },
      { t: T.tomorrows, kind: 'question' }];
  }
  render(g, t) {
    const T = this.T;
    const push = 1 + 0.03 * smooth(prog(t, T.one - 0.5, T.end + 1));      // câu 24–26: camera đẩy rất chậm
    g.save(); g.translate(W * 0.6, H * 0.5); g.scale(push, push); g.translate(-W * 0.6, -H * 0.5);
    sky(g, t, { fog: 1 });
    const lamp = 0.25 + 0.75 * outCubic(prog(t, this.START, this.START + 1.2));

    // ── vật đang được đọc: chùm đèn quét tới (từ tên vật tới hết câu) ──
    const say = [[T.rains, T.hanoi], [T.drug, T.phase], [T.candidate, T.election]];
    const enter = [T.sentences - 0.2, T.sentences + 0.15, T.these];         // câu 20: ba bóng nổi lên từ sương, chưa sáng
    const kinds = ['cloud', 'vial', 'ballot'];
    let cur = -1; for (let i = 0; i < 3; i++) if (t >= say[i][0] - 0.2) cur = i;
    const sweep = cur >= 0 ? outCubic(prog(t, say[cur][0] - 0.2, say[cur][1] + 0.3)) : 0;
    if (cur >= 0) {
      const from = cur > 0 ? OBJ[cur - 1] : { x: 600, y: 760 }, o = OBJ[cur];
      const ex = from.x + (o.x - from.x) * sweep, ey = from.y + (o.y - from.y) * sweep;
      beam(g, LX, LY - 40, ex, ey + 40, 110, 360, 0.34 * lamp, { reach: 0.96 });
    }
    // sương nền dày quanh hàng vật (chỗ vật chưa đọc chìm vào)
    fogBank(g, 1220, 560, 700, 200, t, { a: 1.0, seed: 4 });
    for (let i = 0; i < 3; i++) {
      const lit = i < cur ? 0.62 : i === cur ? 0.62 + 0.38 * sweep : 0;     // đã đọc: còn âm ỉ; đang đọc: sáng hẳn
      if (lit > 0) glow(g, OBJ[i].x, OBJ[i].y, 260, 'rgba(244,184,96,0.16)', lit);
      thing(g, kinds[i], OBJ[i].x, OBJ[i].y, prog(t, enter[i], enter[i] + 0.7), lit);
    }

    // ── câu 24–26: mỗi vật CHỈ MỘT lần (nhãn dưới vật) ──
    const once = [['one tomorrow', T.one], ['tested once', T.once1], ['once in history', T.once2]];
    for (let i = 0; i < 3; i++) {
      const k = prog(t, once[i][1] - 0.15, once[i][1] + 0.55); if (k <= 0) continue;
      g.save(); g.fillStyle = C.gold; g.globalAlpha = 0.9; g.fillRect(OBJ[i].x - 4, 628, 8, 8 * outBack(clamp(k * 2))); g.restore();
      typed(g, once[i][0].toUpperCase(), OBJ[i].x, 680, k, `500 24px ${MONO}`, C.ivory, { align: 'center' });
      typed(g, '× 1', OBJ[i].x, 736, prog(t, once[i][1] + 0.2, once[i][1] + 0.6), `600 60px ${CG}`, C.gold, { align: 'center' });
    }

    // ── "no million tomorrows": hàng mây ma lan sang phải phía trên → chìm vào sương ở "count" ──
    const grow = outCubic(prog(t, T.million - 0.2, T.tomorrows + 0.5)), sink = smooth(prog(t, T.count - 0.1, T.rainy + 0.6));
    if (grow > 0) {
      const N = 11;
      for (let j = 0; j < N; j++) {
        const u = j / (N - 1); if (u > grow) break;
        const s = 0.5 * Math.pow(0.88, j), x = 1000 + j * 74 - j * j * 0.6, y = 290 - j * 5;
        const late = clamp(sink * 1.6 - (1 - u) * 0.6);                         // xa chìm trước
        ghostCloud(g, x, y + late * 110, s, (0.85 - u * 0.35) * (1 - late));
      }
      fogBank(g, 1400, 300 + 40 * (1 - sink), 520, 120, t, { a: 0.3 + 1.1 * sink, seed: 21, n: 8 });
    }
    g.restore();

    // ── đèn + con số trong quầng đèn của NGƯỜI XEM (toạ độ màn hình) ──
    lantern(g, LX, LY, 0.9, t, lamp);
    glow(g, 330, 600, 380, 'rgba(244,184,96,0.16)', lamp * clamp(cur + 1));
    const names = ['rain · hanoi · tomorrow', 'phase 3 trial', 'this candidate wins'], at = [T.p70, T.p30, T.p60], why = [T.hanoi, T.phase, T.election];
    for (let i = 0; i < 3; i++) {
      const y0 = 404 + i * 124;
      if (t > why[i] - 0.1) label(g, names[i], 130, y0, C.amber, 'left', 20);
      const k = outBack(prog(t, at[i] - 0.05, at[i] + 0.4)); if (k <= 0) continue;
      g.save(); g.translate(130, y0 + 76); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha = clamp(k * 1.5);
      text(g, this.P[i] + '%', 0, 0, `600 72px ${CG}`, i === cur ? '#FFD08A' : C.amber, 'left'); g.restore();
    }
    // câu dẫn câu 26 (trên phải, dưới thẻ mục) — chỉ khi hàng mây ma xuất hiện
    if (t > T.no - 0.1)
      typed(g, 'no million tomorrows to count', 1824, 186, prog(t, T.no - 0.1, T.count), `italic 600 44px ${CG}`, C.fog, { align: 'right' });

    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4), 'ACT TWO · ONE-OFFS', 'Things that happen once');
    actTitle(g, 'night', t, this.START, 'ACT TWO', 'Where frequency runs out of breath');
  }
}
