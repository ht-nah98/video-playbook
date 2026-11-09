// P15 sentence — "Nói được mà không viết được" · 81.78 → 90.47 (TREATMENT P15)
// "That's the whole question": camera lao vào ô □. "Nothing strange inside": nắp mở — trống trơn, chỉ có ánh sáng.
// "We could say it in a sentence": gõ "the power of 1.07 that gives 2". "couldn't write it right": câu nhét
// vào □ không vừa, chữ tràn ra rơi xuống sàn (đỏ). "a symbol and a name": mọi chữ tụ lại thành log₁.₀₇ 2 —
// ngồi đúng chỗ số mũ. "isn't magic": đũa thần chạm vào rồi vỡ vụn. "already in the game": đèn sảnh bật lại,
// đường cong tiền của P13 cắt vạch ×2 đúng ở tháng 10.2 — câu trả lời nằm sẵn trong thế giới từ đầu.
import { clamp, prog, outBack, smooth, lerp, hash } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { mix } from '../../../../engine/draw.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker,
  hiddenEq, logLabel, unknownBox, EQ_BOX, EQ_BS } from '../bank.js';

const SENT = 'the power of 1.07 that gives 2', SY = 600, FLOOR = 742, FIT = 5;
const LABEL_X = 1098;                                  // mép trái nhãn log₁.₀₇ 2 (ngay sau "1.07")

export default class P15 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.strange = s.tl.line('Nothing strange inside.');
    this.say = s.tl.line('We could say it in a sentence—');
    this.wr = s.tl.line("we just couldn't write it right.");
    this.give = s.tl.line('So give that exponent');
    this.name = s.tl.line('a symbol and a name.');
    this.magic = s.tl.line("A logarithm isn't magic.");     // căn chỉnh dồn cả câu về 87.94 → dùng khoảng của dòng
    this.game = s.tl.line('It was already');
    this.next = s.tl.at('We already knew the question,');
  }
  lights(t) { return smooth(prog(t, this.game.start, this.game.start + 0.6)); }
  backdropAt(t) {
    const L = this.lights(t);
    return { glow: lerp(0.425, 0.9, L), horizon: 760, floor: lerp(0.3825, 0.8, L), mirror: true, floorB: PAL.fwd, bokeh: 0, floorGlyphs: BANK_GLYPHS };
  }
  camera(t) {
    const zin = smooth(prog(t, this.t0 + 0.1, this.strange.start)), zout = smooth(prog(t, this.say.start - 0.1, this.say.start + 0.5));
    const z = zin * (1 - zout), wide = smooth(prog(t, this.game.start, this.game.start + 0.8));
    return { s: 1 + 1.1 * z - 0.05 * wide, cx: EQ_BOX[0], cy: EQ_BOX[1] + 40, x: (960 - EQ_BOX[0]) * z, y: (540 - EQ_BOX[1] - 40) * z, bg: 0 };
  }
  render(g, t) {
    const L = this.lights(t);
    vault(g, t, { alpha: lerp(0.36, 0.9, L) });
    stacks(g, t, this.times, { alpha: lerp(0.28, 1, L) });
    doubleLine(g, t, 1);
    growthCurve(g, 12.6 * smooth(prog(t, this.game.start, this.game.start + 0.6)));
    const ans = this.game.words[2].start + 0.45;              // tờ lịch hỏi "?" ở P13 — giờ tự trả lời
    doubleMarker(g, t, smooth(prog(t, this.game.words[2].start, this.game.words[2].start + 0.45)));   // thế giới: P16 giữ nguyên
    calendar(g, t, 12, t >= ans ? ans : -1, { label: t >= ans ? '10.2' : ' ', labelCol: PAL.back, appear: 1 });
    if (t < this.next) shatter(g, c => this.fg(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 17 });
    if (t >= this.magic.start && t < this.magic.end) shatter(g, c => this.wand(c, t), prog(t, this.magic.end - 0.4, this.magic.end - 0.1), t, { seed: 18 });
    // nhân vật: gục vai lúc "couldn't write it right", giơ ngón cái lúc "already in the game"
    const p1 = presence(t, this.wr.start - 0.15, this.give.start + 0.3, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'slump', 1740, 1050, 600, p1.state === 'out' ? 'columns' : 'rows', p1, { t, seed: 15 });
    const p2 = presence(t, this.game.start, this.next - 0.45, { inDur: 0.3, outDur: 0.4 });
    figure(g, this.m, 'thumb', 1740, 1050, 600, p2.state === 'out' ? 'digits' : 'grid', p2, { t, seed: 16 });
    footer(g, this.tl, t, ['question', 'strange', 'sentence', 'write', 'symbol', 'name', 'magic', 'already', 'game'],
      { from: this.t0, carry: true });                       // P16 carry vỡ hộ dòng cuối
  }
  /** Tiền cảnh: phương trình, ô □ / nhãn log, câu chữ, mốc 10.2 — vỡ cùng nhau khi sang P16. */
  fg(g, t) {
    const named = smooth(prog(t, this.name.words[1].start, this.name.end - 0.05));   // □ co lại, nhãn log nở ra
    const lid = smooth(prog(t, this.strange.words[1].start, this.strange.words[1].start + 0.35)) * (1 - smooth(prog(t, this.say.start, this.say.start + 0.3)));
    hiddenEq(g, t, { k2: 1, box: false, eqX: lerp(1330, 1470, named) });
    if (named < 1) unknownBox(g, t, EQ_BOX[0], EQ_BOX[1], EQ_BS * (1 - named), { lid });
    logLabel(g, LABEL_X, EQ_BOX[1], named);
    this.sentence(g, t);
  }
  /** Câu dài: gõ → nhét vào □ → tràn, rơi sàn → tụ về nhãn log. */
  sentence(g, t) {
    if (t < this.say.start) return;
    g.save(); g.font = '500 44px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const cw = g.measureText('m').width, x0 = 960 - (SENT.length * cw) / 2;
    const typed = Math.floor(SENT.length * prog(t, this.say.start, this.say.end));
    const squeeze = smooth(prog(t, this.wr.start, this.wr.words[3].start));
    const eject = this.wr.words[3].start, gather = smooth(prog(t, this.give.words[1].start, this.name.words[1].start + 0.25));
    const red = smooth(prog(t, this.wr.words[2].start, this.wr.words[2].start + 0.2)) * (1 - gather);
    const lab = [LABEL_X + 120, EQ_BOX[1]];
    for (let i = 0; i < typed; i++) {
      const ch = SENT[i];
      if (ch === ' ') continue;
      let x = x0 + (i + 0.5) * cw, y = SY, s = 1, r = 0;
      const ins = [EQ_BOX[0] + ((i % FIT) - 2) * 11, EQ_BOX[1] + (hash(i) - 0.5) * 30];
      x = lerp(x, ins[0], squeeze); y = lerp(y, ins[1], squeeze); s = lerp(1, 0.45, squeeze);
      if (i >= FIT && t >= eject) {                     // không vừa: bật ra, rơi xuống sàn, nằm đó
        const dt = t - eject, a = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.6, v = 520 + 260 * hash(i * 5.7);
        const tLand = this.landT(i, a, v);
        const tt = Math.min(dt, tLand);
        x = ins[0] + Math.cos(a) * v * tt; y = ins[1] + Math.sin(a) * v * tt + 900 * tt * tt;
        s = lerp(0.45, 1, clamp(dt / 0.3)); r = (hash(i * 9.1) - 0.5) * 6 * tt;
      }
      x = lerp(x, lab[0], gather); y = lerp(y, lab[1], gather); s *= 1 - gather;
      if (s <= 0.01) continue;
      g.save(); g.translate(x, y); g.rotate(r); g.scale(s, s);
      g.fillStyle = mix(PAL.truth, PAL.block, red); g.fillText(ch, 0, 0); g.restore();
    }
    if (typed < SENT.length && squeeze <= 0) {          // con trỏ khối
      g.fillStyle = PAL.fwd; g.fillRect(x0 + typed * cw + 2, SY - 24, cw * 0.8, 48);
    }
    g.restore();
  }
  /** Lúc chữ i chạm sàn (y = FLOOR): giải ins.y + sin(a)·v·τ + 900τ² = FLOOR. */
  landT(i, a, v) {
    const y0 = EQ_BOX[1] + (hash(i) - 0.5) * 30, b = Math.sin(a) * v, c = y0 - FLOOR;
    return (-b + Math.sqrt(b * b - 4 * 900 * c)) / (2 * 900);
  }
  /** Đũa thần: bay vào, chạm nhãn log — rồi vỡ (shatter ở render). */
  wand(g, t) {
    const k = smooth(prog(t, this.magic.start, this.magic.start + 0.35));
    const tip = [lerp(1900, 1290, k), lerp(-80, 140, k)], ang = lerp(-0.2, 0.6, k);
    g.save(); g.translate(tip[0], tip[1]); g.rotate(ang);
    g.strokeStyle = PAL.truth; g.lineWidth = 12; g.lineCap = 'round';
    g.beginPath(); g.moveTo(0, 0); g.lineTo(230, -160); g.stroke();
    g.fillStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 26; g.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 22 : 52, a = i / 10 * Math.PI * 2 - Math.PI / 2; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    g.closePath(); g.fill();
    g.restore();
  }
}
