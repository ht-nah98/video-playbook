// P18 engine — "× xoay thành +" · 112.80 → 125.66 (TREATMENT P18, beat switch)
// 112.8–116.4 gần như chỉ còn giọng (đo stem): khung xoay của P17 từ từ dừng, ký hiệu tụ thành cánh cửa két
// tròn của sảnh ngân hàng — hoá ra là một ĐỘNG CƠ, răng hình ×. "Multiply the values": 8 và 16 vào hai khe;
// "exponents add within": trong lõi 3 + 4. 116.42 band vào lại = CÚ NỔ THỨ HAI: động cơ bừng sáng, quay theo
// beat. "read it backward / language shift": nhãn chuyển sang ngôn ngữ log. 118.87 (bass nhấn):
// "Multiplication turns to addition" — mọi răng × xoay 45° thành +. "different script": chữ đổi sang mono.
// "Not a bag of rules": túi thẻ công thức rơi, vỡ. "Not a trick to memorize": thẻ học thuộc bị chém vụn (angry).
// "seen from the other side": camera vòng ra sau động cơ — mặt sau là cùng cỗ máy, đọc bằng log.
// 125.66 cắt cứng sang giấy (P19).
import { prog, smooth, lerp } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { drawMorph, shatter } from '../../../../engine/morph.js';
import { decodeChars } from '../../../../engine/glyphs.js';
import { foldMatrix, line } from '../../../../engine/mirror.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { kaleidoPoints } from '../chorus.js';
import { gear, rimPoints, ruleBag, flashcards, GEAR } from '../gear.js';

export const BAND_BACK = 116.42;                  // đo stem: trống + bass + synth cùng vào lại sau quãng chỉ còn giọng
const HIT = 118.87;                               // bass nhấn đúng "Multiplication"
const AXIS = line(GEAR.cx, -2000, GEAR.cx, 3000); // trục đứng để vòng ra sau động cơ

const pad = (s, n) => { const l = Math.floor((n - s.length) / 2); return ' '.repeat(l) + s + ' '.repeat(n - s.length - l); };
/** Nhãn đổi theo lời: chuỗi mới giải mã ĐÈ LÊN chuỗi cũ (ký tự chưa tới lượt vẫn là chữ cũ) — không bao giờ trống một khung;
 *  mọi chặng đệm cùng độ dài nên cỡ chữ và tâm không nhảy. stages = [[mốc, chuỗi], …]. */
const chain = (t, stages) => {
  const n = Math.max(...stages.map(([, s]) => s.length));
  let cur = ' '.repeat(n);
  for (const [at, s] of stages) {
    if (t < at) break;
    const B = pad(s, n), A = cur;
    cur = decodeChars(B, t, at, at + 0.3, { seed: n }).map((c, i) => (c.state === 'hidden' ? A[i] : c.ch)).join('');
  }
  return cur.trim() ? cur : '';
};

export default class P18 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.mult = s.tl.line('Multiply the values—'); this.add = s.tl.line('exponents add within.');
    this.read = s.tl.at('Now read it backward,'); this.shift = s.tl.at('watch the language shift.');
    this.same = s.tl.at('same engine,'); this.script = s.tl.line('different script.');
    this.bag = s.tl.line('Not a bag of rules.'); this.trick = s.tl.line('Not a trick to memorize.');
    this.just = s.tl.at('Just the old exponent laws'); this.other = s.tl.line('seen from the other side.');
    this.next = s.tl.at('Put them on the axes.');
    this.r0 = 0.22 + (this.t0 - s.tl.line('everywhere.', 2).start) * 0.9;   // góc camera ở khung cuối P17
    this.src = kaleidoPoints(); this.dst = rimPoints();
  }
  live(t) { return smooth(prog(t, BAND_BACK, BAND_BACK + 0.25)); }
  backdropAt(t) {
    const L = this.live(t), q = smooth(prog(t, this.t0, this.t0 + 0.8));
    // giữ màu sàn theo gương như P17, bokeh tắt dần; chữ sàn chỉ đổi đúng cú nổ 116.42 / 118.87 (không đổi ở ranh giới cảnh)
    return { glow: lerp(lerp(1, 0.35, q), 1, L), horizon: 760, floor: lerp(lerp(1, 0.15, q), 1, L), mirror: true, bokeh: 0.8 * (1 - q),
      floorA: PAL.fwd, floorB: PAL.back,
      floorGlyphs: t < BAND_BACK ? undefined : t >= HIT ? ['+', '+', 'log', '+'] : ['×', '×', 'log', '×'] };
  }
  camera(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 1.3));            // khung xoay của P17 dừng lại
    const punch = (t >= BAND_BACK ? 1 - smooth(prog(t, BAND_BACK, BAND_BACK + 0.45)) : 0) + (t >= HIT ? 1 - smooth(prog(t, HIT, HIT + 0.4)) : 0);
    return { s: lerp(1.06, 1, k) + 0.08 * punch, r: lerp(this.r0, 0, k), bg: lerp(0.25, 0, k) };
  }
  render(g, t) {
    const L = this.live(t);
    // ký hiệu của P17 tụ thành vành động cơ trong quãng chỉ còn giọng
    drawMorph(g, this.src, this.dst, prog(t, this.t0, this.t0 + 0.9), t, { colA: PAL.back, colB: PAL.truth, n: 200 });
    const appear = smooth(prog(t, this.t0 + 0.7, this.t0 + 1.0));
    if (appear > 0) {
      // vòng ra sau: lật quanh trục đứng (|c| như P11b — mặt sau vẽ nội dung log, chữ không ngược)
      const o = smooth(prog(t, this.other.start, this.next - 0.1)), c = Math.cos(Math.PI * o), back = c < 0;
      g.save(); g.transform(...foldMatrix(AXIS, Math.max(Math.abs(c), 0.02)));
      gear(g, t, this.state(t, back, L, appear));
      g.restore();
    }
    // 116.42 / 118.87: vòng loé từ tâm động cơ
    for (const [h, col] of [[BAND_BACK, PAL.fwd], [HIT, PAL.truth]]) {
      const r = prog(t, h, h + 0.5);
      if (r <= 0 || r >= 1) continue;
      g.save(); g.strokeStyle = col; g.lineWidth = 14 * (1 - r); g.shadowColor = col; g.shadowBlur = 30;
      g.beginPath(); g.arc(GEAR.cx, GEAR.cy, GEAR.R + 60 + 600 * r, 0, Math.PI * 2); g.stroke(); g.restore();
    }
    // "Not a bag of rules": túi rơi, thẻ tung ra rồi vỡ
    if (t >= this.bag.start && t < this.trick.start + 0.3)
      shatter(g, c => ruleBag(c, prog(t, this.bag.start, this.bag.end)), prog(t, this.trick.start, this.trick.start + 0.3), t, { seed: 24 });
    // "Not a trick to memorize": xấp thẻ học thuộc bị chém, dải rơi khỏi khung
    if (t >= this.trick.start) flashcards(g, prog(t, this.trick.start, this.trick.start + 0.25), prog(t, this.trick.words[4].start, this.trick.words[4].start + 0.6));
    // nhân vật: que chỉ dẫn giảng về động cơ (khung trung, góc trái dưới) → giận dữ với thẻ học thuộc
    const p1 = presence(t, this.mult.start, this.bag.start - 0.2, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'pointer', 300, 1180, 820, p1.state === 'out' ? 'grid' : 'rows', p1, { t, seed: 25 });
    const p2 = presence(t, this.trick.start - 0.1, this.other.start, { inDur: 0.25, outDur: 0.4 });
    figure(g, this.m, 'angry', 1640, 1060, 560, p2.state === 'out' ? 'digits' : 'burn', p2, { t, seed: 26 });
    footer(g, this.tl, t, ['laws', 'multiply', 'add', 'backward', 'shift', 'addition', 'engine', 'script', 'rules', 'memorize', 'other'],
      { from: this.t0, carry: true });
  }
  /** Trạng thái động cơ theo lời. back = mặt sau (đọc bằng log). */
  state(t, back, L, appear) {
    const sp = t < BAND_BACK ? (t - this.t0) * 0.15 : (BAND_BACK - this.t0) * 0.15 + (t - BAND_BACK) * 0.9 + 0.25 * beat.beatPulse(t, 0.12);
    const plus = smooth(prog(t, HIT, HIT + 0.35)), mono = t >= this.script.words[1].start ? 1 : 0;
    const labels = back ? { top: 'log xy = log x + log y', left: 'log 8', right: 'log 16', core: '3 + 4', bottom: '7' } : {
      left: chain(t, [[this.mult.words[0].start, '8'], [this.shift, 'log 8 = 3']]),
      right: chain(t, [[this.mult.words[2].start, '16'], [this.shift, 'log 16 = 4']]),
      core: chain(t, [[this.add.words[1].start, '3 + 4']]),
      bottom: chain(t, [[this.add.words[2].start, '128'], [this.shift, '7']]),
      top: chain(t, [[this.mult.words[2].start, '8 × 16'], [this.shift, 'log(8 × 16)'], [HIT, 'log 8 + log 16'], [this.just, 'aᵐ · aⁿ = aᵐ⁺ⁿ']]),
    };
    return { angle: sp, plus, lit: appear * (0.35 + 0.65 * L), col: back ? PAL.back : PAL.fwd, labels, mono, alpha: appear };
  }
}
