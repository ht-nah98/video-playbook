// P14 hiding — "Ẩn trong số mũ" · 72.46 → 81.78 (TREATMENT P14)
// Dấu "?" trên tờ lịch bật ra thành ô □ đỏ. "isn't sitting in a sum": hàng 1.07 + ⬚, ghế trống, □ lắc đầu.
// "isn't multiplying": dấu + xoay 45° thành × (đúng hình học — báo trước P18). "division cannot run":
// ÷ mọc chân chạy tới, nhảy, không với tới, ngã sấp. "hiding in the exponent": 1.07 bay lên thành
// cơ số lớn, □ chui vào chỗ số mũ. "out of reach of what we knew": + − × ÷ dưới sàn nhảy với, không tới.
// "this base into two?": = 2, vạch ×2 của sảnh sáng lên. Sảnh vẫn tối (đoạn lặng, năng lượng tụt 70.9–73).
import { clamp, prog, outBack, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, unknownBox, hiddenEq, CAL_Q, EQ, EQ_BOX, EQ_BS } from '../bank.js';

const ROW = { y: 640, num: 640, op: 830, seat: 950, size: 110 };   // hàng "1.07 + ⬚"
const HOVER = [950, 470];                                          // □ lơ lửng trên ghế trống
const FLOOR = 742;                                                 // mặt sàn cho các dấu ngã
const ECHO = [72.0, 73.5];                                         // data/stems.json: backing vocals

export default class P14 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.every = s.tl.at('same percent every month.');
    this.times = monthTimes(KACHING[0], this.every);
    this.sum = s.tl.line("isn't sitting in a sum.");
    this.mul = s.tl.line("It isn't multiplying,");
    this.div = s.tl.line('so division cannot run.');
    this.hide = s.tl.line("It's hiding in the exponent,");
    this.reach = s.tl.line('out of reach of what we knew.');
    this.what = s.tl.line('What exponent turns');
    this.two = s.tl.line('this base into two?');
    this.next = s.tl.at("That's the whole question.");
  }
  backdropAt() { return { glow: 0.425, horizon: 760, floor: 0.3825, mirror: true, floorB: PAL.fwd, bokeh: 0, floorGlyphs: BANK_GLYPHS }; }
  camera(t) { return { s: 1.05 - 0.05 * smooth(prog(t, this.t0, this.next)), cy: 500, bg: 0 }; }
  render(g, t) {
    const two = this.two.words[3].start;
    vault(g, t, { alpha: 0.36 });
    stacks(g, t, this.times, { alpha: 0.55 - 0.27 * smooth(prog(t, this.sum.start, this.sum.start + 0.5)) });   // lùi ra sau khi hàng phép tính hiện
    doubleLine(g, t, 1, { alpha: 1 });
    if (t >= two) {                                                // "two": vạch ×2 loé lên — đích của câu hỏi
      const f = 1 - prog(t, two, two + 0.6);
      g.save(); g.globalAlpha = 0.6 * f; g.strokeStyle = PAL.fwd; g.lineWidth = 10; g.shadowColor = PAL.fwd; g.shadowBlur = 30;
      g.beginPath(); g.moveTo(400 - 53, 460); g.lineTo(1526, 460); g.stroke(); g.restore();
    }
    calendar(g, t, 12, -1, { label: t < this.t0 + 0.12 ? '?' : ' ', appear: 1 });
    // dưới sàn: những gì ta đã biết, vỡ khi sang P15
    if (t < this.next) shatter(g, c => this.ground(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 16 });
    this.row(g, t);
    // □: bật ra từ dấu ? → lơ lửng trên ghế (lắc đầu) → né cú nhảy của ÷ → chui vào chỗ số mũ
    const fly = smooth(prog(t, this.t0, this.t0 + 0.7));
    let [bx, by] = [lerp(CAL_Q[0], HOVER[0], fly), lerp(CAL_Q[1], HOVER[1], fly) - Math.sin(Math.PI * fly) * 160];
    const shake = Math.sin((t - this.sum.words[1].start) * 30) * 18 * (1 - prog(t, this.sum.words[1].start, this.sum.words[1].start + 0.6)) * (t >= this.sum.words[1].start ? 1 : 0);
    const dodge = smooth(prog(t, this.div.words[2].start - 0.1, this.div.words[2].start + 0.15));
    bx += shake; by -= dodge * 110;
    const go = smooth(prog(t, this.hide.start + 0.2, this.hide.words[4].start));
    bx = lerp(bx, EQ_BOX[0], go); by = lerp(by, EQ_BOX[1], go);
    const bs = lerp(lerp(40, 100, fly), EQ_BS, go);
    const pulse = t >= this.what.words[1].start ? 1 + 0.12 * Math.max(0, 1 - (t - this.what.words[1].start) / 0.3) : 1;
    const k2 = prog(t, two, two + 0.25);
    if (t >= this.hide.start + 0.6) hiddenEq(g, t, { k2, box: false });   // cơ số đã tới chỗ (row() thôi vẽ)
    unknownBox(g, t, bx, by, bs * pulse, { bob: 1 - go });
    // bè vọng: lời lật gương, xanh, góc trên-phải
    const l = this.tl.lineAt(t);
    if (l && t >= ECHO[0] && t < ECHO[1])
      decodeLine(g, this.tl.wordsOf(l), t, 1300, 150, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75, burstAt: Math.min(ECHO[1], l.end) - 0.3, burstDur: 0.3 });
    // nhân vật: "cannot run" — gục vai
    const p = presence(t, this.div.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'slump', 1740, 1050, 600, p.state === 'out' ? 'burn' : 'rows', p, { t, seed: 14 });
    footer(g, this.tl, t, ['unknown', 'sum', 'multiplying', 'division', 'cannot', 'exponent', 'reach', 'two'], { from: this.t0, carry: true });
  }
  /** Hàng 1.07 + ⬚ (ghế trống). + xoay thành ×. Từ "hiding": 1.07 bay lên thành cơ số lớn. */
  row(g, t) {
    const a = this.sum.start;
    if (t < a) return;
    const up = smooth(prog(t, this.hide.start, this.hide.start + 0.6));
    if (up >= 1) return;
    const sz = lerp(ROW.size, EQ.size, up), x = lerp(ROW.num, EQ.x, up), y = lerp(ROW.y, EQ.y, up);
    const s = outBack(clamp((t - a) / 0.25));
    g.save(); g.translate(x, y); g.scale(s, s);
    g.font = `900 ${sz}px "Archivo"`; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.shadowColor = PAL.bg; g.shadowBlur = 24; g.fillText('1.07', 0, 0); g.restore();
    if (t >= this.hide.start) return;                              // dấu và ghế rơi xuống sàn (vẽ ở ground)
    this.op(g, t, ROW.op, ROW.y - 38, s, 0);
    g.save(); g.translate(ROW.seat, ROW.y - 38); g.scale(s, s);
    g.setLineDash([12, 9]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.7; g.lineWidth = 5;
    g.strokeRect(-50, -50, 100, 100); g.restore();
  }
  /** Dấu + xoay 45° ở "multiplying" → ×. */
  op(g, t, x, y, s, lie) {
    const r = Math.PI / 4 * smooth(prog(t, this.mul.words[2].start, this.mul.words[2].start + 0.3));
    g.save(); g.translate(x, y); g.rotate(r + lie); g.scale(s, s);
    g.strokeStyle = PAL.truth; g.lineWidth = 16; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-42, 0); g.lineTo(42, 0); g.moveTo(0, -42); g.lineTo(0, 42); g.stroke(); g.restore();
  }
  /** Sàn: ÷ chạy-nhảy-ngã; từ "hiding" ×, ghế rơi; từ "reach" + − ÷ × nhảy với lên □. */
  ground(g, t) {
    const d0 = this.div.words[1].start, jump = this.div.words[2].start, fall = this.div.words[3].start;
    if (t >= d0) {
      const run = smooth(prog(t, d0, jump)), j = prog(t, jump, fall);
      const x = lerp(260, ROW.seat - 20, run), lift = Math.sin(Math.PI * Math.min(j, 1)) * 230;
      const lie = smooth(prog(t, fall - 0.1, fall + 0.15)) * Math.PI / 2;
      const y = FLOOR - 60 - lift + lie * 30 + this.hop(t, 0);
      this.divide(g, t, x, y, lie, t < jump);
    }
    if (t >= this.hide.start) {                                     // × và ghế rơi xuống sàn
      const f = smooth(prog(t, this.hide.start, this.hide.start + 0.4));
      this.op(g, t, lerp(ROW.op, 700, f), lerp(ROW.y - 38, FLOOR - 45, f) + this.hop(t, 1), 1, 0);
      g.save(); g.translate(lerp(ROW.seat, 1180, f), lerp(ROW.y - 38, FLOOR - 50, f) + this.hop(t, 2)); g.rotate(0.3 * f);
      g.setLineDash([12, 9]); g.strokeStyle = PAL.truth; g.globalAlpha = 0.7; g.lineWidth = 5; g.strokeRect(-50, -50, 100, 100); g.restore();
    }
    if (t >= this.reach.start) {                                    // + và − trồi lên từ sàn ký hiệu
      const k = outBack(clamp((t - this.reach.start) / 0.3));
      g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 16; g.lineCap = 'round';
      for (const [x, plus, i] of [[520, true, 3], [1340, false, 4]]) {
        g.save(); g.translate(x, FLOOR - 45 + this.hop(t, i)); g.scale(k, k);
        g.beginPath(); g.moveTo(-40, 0); g.lineTo(40, 0); if (plus) { g.moveTo(0, -40); g.lineTo(0, 40); } g.stroke(); g.restore();
      }
      g.restore();
    }
  }
  /** "out of reach": mỗi beat một dấu nhảy lên với □ (cao ≤ 150px, không tới). */
  hop(t, i) {
    if (t < this.reach.start) return 0;
    const sb = beat.sinceBeat(t), n = beat.beatIndex(t);
    if ((n + i) % 3 !== 0) return 0;
    return -Math.sin(Math.PI * clamp(sb / beat.BEAT)) * (110 + 40 * hash(i * 7.7 + n));
  }
  divide(g, t, x, y, lie, running) {
    g.save(); g.translate(x, y); g.rotate(lie);
    g.fillStyle = PAL.truth; g.strokeStyle = PAL.truth; g.lineCap = 'round';
    g.lineWidth = 14; g.beginPath(); g.moveTo(-42, 0); g.lineTo(42, 0); g.stroke();
    for (const dy of [-30, 30]) { g.beginPath(); g.arc(0, dy, 9, 0, Math.PI * 2); g.fill(); }
    if (running) {                                                   // hai chân guồng theo t
      const ph = t * 18; g.lineWidth = 7;
      for (const s of [0, Math.PI]) { g.beginPath(); g.moveTo(0, 40); g.lineTo(Math.sin(ph + s) * 26, 72); g.stroke(); }
    }
    g.restore();
  }
}
