// P10 turn — "Lật câu hỏi" · 37.78 → 46.52 (TREATMENT P10, pre-chorus 1)
// Camera trượt dọc đường cong 2ˣ, mỗi câu thắp một đèn lồng (1, 2, 4, 8). "turn the question
// round": cả khung xoay 180°, vàng nguội dần thành xanh (bass rút 40–46). Thế giới cũ vỡ,
// camera quay nốt vòng về thẳng; còn lại `2^□ = 8` với ô □ đỏ rung mạnh dần theo trống dồn.
import { W, H, clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { mix } from '../../../../engine/draw.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL } from '../song.js';
import { powText, footer } from '../kit.js';

const X = (v) => 620 + v * 420, Y = (h) => 860 - h * 62;       // toạ độ thế giới của đường cong

export default class P10 {
  async init(s) {
    this.tl = s.tl; this.beat = s.beat;
    this.lit = ['Keep the rule alive,', 'follow where it goes.', 'Every step reveals', 'something we already know.']
      .map(l => s.tl.at(l));                      // đèn 2⁰, 2¹, 2², 2³ sáng ở đầu mỗi câu
    this.turn = s.tl.line('But turn the question round,').words[1].start;     // "turn"
    this.what = s.tl.at('What if the exponent');
    this.expo = s.tl.line('What if the exponent').words[3].start;             // "exponent": ô □ hiện
    this.next = s.tl.at('Run it forward,');
  }
  cool(t) { return smooth(prog(t, this.turn, this.what)); }
  backdropAt(t) {
    const c = this.cool(t);
    return { glow: 0.8, horizon: 700, floor: lerp(1, 0.45, smooth(prog(t, 40.0, this.next))),
      floorA: mix(PAL.fwd, PAL.back, c), floorB: PAL.back };
  }
  camera(t) {
    const vc = 3 * smooth(prog(t, this.t0, this.lit[3] + 0.8));
    const back = smooth(prog(t, this.what - 0.2, this.what + 0.7));        // trở về khung thẳng khi thế giới đã vỡ
    const k = 0.55 * smooth(prog(t, this.t0, this.t0 + 0.8)) * (1 - back);
    const s = lerp(1.04, 1, back);
    const r = Math.PI * smooth(prog(t, this.turn, this.turn + 0.9)) + Math.PI * back;   // 0 → π → 2π ≡ 0
    return { s, x: -(X(vc) - W / 2) * s * k, y: -(Y(2 ** vc) - H / 2) * s * k, r,
      bg: lerp(0.3, 1, smooth(prog(t, this.turn - 0.4, this.turn))) };
  }
  render(g, t) {
    if (t < this.what + 0.35) shatter(g, c => this.world(c, t), prog(t, this.what, this.what + 0.35), t, { seed: 10 });
    shatter(g, c => this.question(c, t), prog(t, this.next - 0.3, this.next), t, { seed: 11 });
    footer(g, this.tl, t, ['rule', 'step', 'turn', 'exponent', 'name'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  world(g, t) {
    const c = this.cool(t), gold = mix(PAL.fwd, PAL.back, c), core = mix(PAL.fwdCore, PAL.backCore, c);
    // đường cong vạch trước mặt camera
    const vEnd = lerp(0.2, 3.4, smooth(prog(t, this.t0, this.lit[3] + 0.6)));
    g.save(); g.strokeStyle = core; g.lineWidth = 8; g.shadowColor = gold; g.shadowBlur = 26; g.lineJoin = 'round';
    g.beginPath();
    for (let v = -1.6; v <= vEnd; v += 0.02) { const x = X(v), y = Y(2 ** v); v === -1.6 ? g.moveTo(x, y) : g.lineTo(x, y); }
    g.stroke(); g.restore();
    // đèn lồng: tối (vòng mờ) → sáng (đĩa vàng, số 2ᵛ bên trong, nhãn phía trên)
    this.lit.forEach((tl, v) => {
      const x = X(v), y = Y(2 ** v), on = outBack(clamp((t - tl) / 0.25));
      g.save();
      g.strokeStyle = gold; g.lineWidth = 3; g.globalAlpha = 0.5;
      g.beginPath(); g.arc(x, y, 50, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
      if (on > 0) {
        g.translate(x, y); g.scale(on, on);
        g.fillStyle = gold; g.shadowColor = gold; g.shadowBlur = 40;
        g.beginPath(); g.arc(0, 0, 50, 0, Math.PI * 2); g.fill(); g.shadowBlur = 0;
        g.fillStyle = PAL.bg; g.font = '900 54px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(String(2 ** v), 0, 3);
        g.restore(); g.save();
        powText(g, [['2', String(v)]], x, y - 80, 56, { expCol: gold });
      }
      g.restore();
    });
  }
  question(g, t) {
    if (t < this.what) return;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0);                // câu hỏi đứng thẳng trên màn hình
    const s = outBack(clamp((t - this.what) / 0.2));
    g.translate(960, 560); g.scale(s, s);
    g.font = '900 280px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'right'; g.textBaseline = 'alphabetic';
    g.fillText('2', -40, 100);
    g.textAlign = 'left'; g.fillText('= 8', 170, 100);
    // ô □ đỏ ở chỗ số mũ: hiện ở "exponent", nhấp nháy theo beat, rung mạnh dần theo trống dồn
    const bx = outBack(clamp((t - this.expo) / 0.2));
    if (bx > 0) {
      const amp = 3 + 18 * prog(t, this.expo, this.next) ** 2;
      g.translate(60 + Math.sin(t * 71) * amp, -140 + Math.cos(t * 53) * amp); g.scale(bx, bx);
      g.fillStyle = PAL.block; g.globalAlpha = 0.25 + 0.55 * this.beat.onBeat(t, 0.25);
      g.fillRect(-60, -60, 120, 120); g.globalAlpha = 1;
      g.strokeStyle = PAL.block; g.lineWidth = 12; g.strokeRect(-60, -60, 120, 120);
    }
    g.restore();
  }
}
