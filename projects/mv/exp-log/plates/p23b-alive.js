// P23b alive — "Lý lẽ sống dậy" · 196.86 → 208.60 (TREATMENT P23 nửa sau, final chorus)
// Cùng sân khấu P23 (đồ thị, gương, đoàn diễu hành). "No tricks." / "No guessing.": nhân vật giơ tay chặn; thẻ
// TRICK, GUESS bị gạch đỏ. "No rules falling from the sky": nhân vật chỉ lên trời — thẻ công thức rơi xuống, chạm
// gương thì BẬT ngang ra khỏi khung (vận tốc thẳng đứng phản xạ qua đường x + y = c thành nằm ngang).
// "Follow what must stay true and the reason comes alive": mặt cận trở lại, sau đầu là mặt trời làm bằng MỌI đẳng
// thức của bài, bừng sáng tràn khung ở "alive". "Same law / Different direction / Same curve / Different
// reflection": hai thẻ lật trên bốn beat, vàng ⇄ xanh. "Why does it work?": MỌI THỨ ĐỨNG IM (thế giới đông ở
// mốc câu hỏi), câu hỏi của kênh trắng giữa khung, không hiệu ứng; chỉ nhân vật trầm tư hiện vào.
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { decodeLine, burstText } from '../../../../engine/lyric.js';
import { PAL, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { graph } from '../chorus2.js';
import { RULE_CARDS } from '../gear.js';
import { parade, sun, flipCard, skyCard, FACE } from '../finale.js';
import { backdrop } from '../backdrop.js';

const MID = [1660, 1230, 900];
const SUN = [960, 520];
const KEYS = ['tricks', 'guessing', 'rules', 'sky', 'true', 'reason', 'alive', 'law', 'direction', 'curve', 'reflection'];

export default class P23b {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (x) => s.tl.line(x);
    this.tricks = L('No tricks.'); this.guess = L('No guessing.'); this.rules = L('No rules falling from the sky.');
    this.follow = L('Follow what must stay true'); this.alive = L('and the reason comes alive.');
    this.law = L('Same law.'); this.dir = L('Different direction.'); this.curve = L('Same curve.'); this.refl = L('Different reflection.');
    this.why = L('Why does it work?');
    this.freeze = this.why.start;
    this.ref = s.tl.at('Run it forward,', 3);
  }
  bd(t) { return { glow: 1, horizon: 780, floor: 0.75, mirror: true, bokeh: 0.7, haloX: SUN[0], haloY: lerp(600, SUN[1], smooth(prog(t, this.t0, this.t0 + 0.5))) }; }   // quầng trượt từ chỗ của P23
  backdropAt(t) { return t < this.freeze ? this.bd(t) : false; }    // đông cứng: cảnh tự vẽ nền ở mốc câu hỏi
  camera(t) {
    const tf = Math.min(t, this.freeze), p = beat.beatPulse(tf, 0.16), a = smooth(prog(tf, this.alive.words[4].start - 0.1, this.alive.words[4].start + 0.6));
    return { s: 1.02 + 0.02 * p + 0.08 * Math.sin(Math.PI * a), r: 0.02 * Math.sin((tf - this.ref) * 0.5), bg: 0 };   // cùng pha với P23 (mốc vào điệp khúc cuối)
  }
  render(g, t) {
    const tf = Math.min(t, this.freeze);                          // "Why does it work?": thế giới đông cứng
    if (t >= this.freeze) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); backdrop(g, tf, { beat, ...this.bd(tf) }); g.restore(); }
    this.world(g, tf);
    // nhân vật: chặn → chỉ trời → mặt cận (hào quang mặt trời)
    const P = (a, b) => presence(tf, a, b, { inDur: 0.25, outDur: 0.35 });
    figure(g, this.m, 'halt', ...MID, 'burn', P(this.t0 - 0.05, this.rules.start - 0.25), { t: tf, seed: 51 });
    figure(g, this.m, 'sky', 1520, MID[1], MID[2], 'columns', P(this.rules.start - 0.15, this.follow.start - 0.3), { t: tf, seed: 52 });
    this.faceAt(g, tf, this.follow.start - 0.1, 1e9);
    if (t >= this.freeze) this.question(g, t);
    else footer(g, this.tl, t, KEYS, { from: this.t0, carry: true });
  }
  world(g, t) {
    parade(g, t, { pulse: beat.beatPulse(t, 0.16) });
    graph(g, { k: 1, kl: 1, km: 1, a: 0.85 });
    // mặt trời phương trình sau đầu nhân vật
    const R = 230 * outBack(clamp((t - this.follow.start) / 0.6)), bl = smooth(prog(t, this.alive.words[4].start - 0.1, this.alive.words[4].start + 0.3)) * (1 - smooth(prog(t, this.alive.end + 0.1, this.law.start + 0.4)));
    sun(g, t, ...SUN, R, { reach: prog(t, this.follow.start + 0.3, this.follow.end + 0.4), bloom: bl, spin: 0.1 * (t - this.follow.start) });
    // TRICK, GUESS: thẻ nảy vào rồi bị gạch chéo; vỡ khi thẻ công thức rơi
    [[this.tricks, 'TRICK', 420, 300], [this.guess, 'GUESS?', 470, 520]].forEach(([l, s, x, y], i) => {
      if (t < l.start) return;
      const pop = outBack(clamp((t - l.start) / 0.18)), cross = outBack(clamp((t - l.words[1].start - 0.1) / 0.16)), out = this.rules.start;
      const shrink = 1 - smooth(prog(t, out, out + 0.3));
      g.save(); g.translate(x, y); g.rotate(i ? 0.05 : -0.06);
      if (shrink > 0.01) { g.save(); g.scale(pop * shrink, pop * shrink); g.strokeStyle = PAL.truth; g.lineWidth = 7; g.strokeRect(-170, -60, 340, 120); g.restore(); }
      burstText(g, s, t, out, 0, 26, '900 76px "Archivo"', PAL.truth, { dur: 0.3, seed: 80 + i, align: 'center', alpha: pop > 0 ? 1 : 0 });
      if (cross > 0 && shrink > 0.01) {
        g.save(); g.scale(cross * shrink, cross * shrink); g.strokeStyle = PAL.block; g.lineWidth = 14; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 20;
        g.beginPath(); g.moveTo(-190, -70); g.lineTo(190, 70); g.moveTo(190, -70); g.lineTo(-190, 70); g.stroke(); g.restore();
      }
      g.restore();
    });
    // thẻ công thức rơi từ trời, bật khỏi gương
    const w = this.rules.words;
    RULE_CARDS.forEach((s, i) => skyCard(g, s, 640 + i * 130, t, w[1].start + i * 0.17, { seed: 90 + i, col: i % 2 ? PAL.back : PAL.fwd }));
    // bốn thẻ lật: Same law ⇄ Different direction; Same curve ⇄ Different reflection
    const card2 = this.curve.start;
    if (t >= this.law.start) {
      const pop1 = outBack(clamp((t - this.law.start) / 0.2)) * (1 - smooth(prog(t, card2 - 0.12, card2 + 0.05)));
      flipCard(g, 960, 150, 'SAME LAW', 'DIFFERENT DIRECTION', smooth(prog(t, this.dir.start, this.dir.start + 0.3)), pop1, { w: 1100 });
      if (t >= card2) flipCard(g, 960, 150, 'SAME CURVE', 'DIFFERENT REFLECTION', smooth(prog(t, this.refl.start, this.refl.start + 0.3)), outBack(clamp((t - card2) / 0.2)), { w: 1180 });
    }
  }
  faceAt(g, t, a, b) {
    const [FX, FY, FH] = FACE, p = presence(t, a, b, { inDur: 0.3 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'burn', 'in', p.k, { t, cell: 7, seed: 53 });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
  }
  /** Câu hỏi của kênh: thế giới đông + màn tối, chữ trắng giữa khung không hiệu ứng; nhân vật trầm tư hiện vào. */
  question(g, t) {
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(11,15,30,0.62)'; g.fillRect(0, 0, 1920, 1080);
    g.font = '900 120px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Why does it work?', 820, 330);                    // tránh đầu nhân vật trầm tư (góc phải)
    g.restore();
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
    figure(g, this.m, 'ponder', 1660, 1230, 900, 'burn', presence(t, this.freeze + 0.05, 1e9, { inDur: 0.3 }), { t, seed: 54 });
    // dòng lời trước vỡ (không tắt cứng); câu hỏi đã ở giữa khung nên chân khung không lặp lại
    const prev = this.refl;
    decodeLine(g, this.tl.wordsOf(prev), t, 960, 1000, { align: 'center', font: '800 56px "Archivo"', colBase: PAL.truth, colKey: PAL.fwd, keys: KEYS, burstAt: this.freeze, burstDur: 0.3 });
    g.restore();
  }
}
