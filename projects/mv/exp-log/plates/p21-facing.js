// P21 facing — "Hai câu hỏi đối mặt" · 155.70 → 168.58 (TREATMENT P21, bridge half-time — hát)
// Tối nhất, chậm nhất, ít vật nhất. Trang giấy P20 vừa vỡ về nền tối; một tấm gương ĐỨNG mọc giữa khung.
// Mặt cận bên trái hỏi "What does this exponent produce?" (2³ = ? vàng); ảnh của nó trong gương (lật ngang,
// nhuộm xanh) hỏi ngược "What exponent produced this?" (2^? = 8, chữ viết gương). "One moves forward": mặt
// bước tới, mũi tên vàng →. "One comes back": ảnh bước tới, mũi tên xanh ←. "Meet them at the mirror": hai
// mặt áp vào gương — mỗi bên chỉ còn nửa phía mình. "and they become": hai trục mũi trùng ở gương → MỘT gương
// mặt đối xứng. "the same": loé trắng, gương tan thành ký hiệu, còn lại một mặt thật; 2³ = 8 ở giữa.
import { clamp, prog, smooth, lerp, outBack, outExpo, hash } from '../../../../engine/lib.js';
import { drawMirrorLine, line } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { shatter, drawMorph } from '../../../../engine/morph.js';
import { PAL } from '../song.js';
import { footer, powText } from '../kit.js';
import { duetFace } from '../duet.js';

const SEAM = line(960, 40, 960, 960);                 // gương đứng
const Y = 945, H = 600;                               // cằm mặt, cao mặt
const EQ_Y = 215;

export default class P21 {
  async init(s) {
    this.s = s; this.tl = s.tl; this.vox = s.vox;
    const L = (x) => s.tl.line(x);
    this.q1 = L('What does this exponent produce?'); this.q2 = L('What exponent produced this?');
    this.two = L('Two questions'); this.fwd = L('One moves forward.'); this.back = L('One comes back.');
    this.meet = L('Meet them at the mirror—'); this.become = L('and they become'); this.same = L('the same.');
    this.next = s.tl.at('And if the curve');
  }
  backdropAt(t) {
    const f = smooth(prog(t, this.same.start, this.same.start + 0.25)) * (1 - 0.4 * smooth(prog(t, this.same.start + 0.25, this.same.start + 1.2)));
    return { glow: 0.38 * smooth(prog(t, this.t0, this.t0 + 0.6)) + 0.6 * f, haloX: 960, haloY: 640, haloR: 560 + 300 * f };   // P20 không có nền chung: quầng dâng từ 0
  }
  camera(t) {
    const drift = smooth(prog(t, this.t0, this.meet.start)), push = smooth(prog(t, this.meet.start, this.same.start));
    return { s: 1 + 0.03 * drift + 0.1 * push, x: 10 * Math.sin((t - this.t0) * 0.35) * (1 - push), cy: lerp(540, 640, push), bg: 0 };
  }
  /** Trục mũi hai bên theo lời: bước tới, lùi về, gặp nhau ở gương. */
  axes(t) {
    const f = smooth(prog(t, this.fwd.start, this.fwd.end)), b = smooth(prog(t, this.back.start, this.back.end));
    const m = smooth(prog(t, this.meet.start, this.become.start));
    return [lerp(lerp(560, 700, f), 960, m), lerp(lerp(1360, 1220, b), 960, m)];
  }
  render(g, t) {
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 31 });
    // loé trắng 0.2s khi hai nửa thành một
    const fl = 1 - prog(t, this.same.start, this.same.start + 0.2);
    if (t >= this.same.start && fl > 0) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(244,241,234,${0.55 * fl})`; g.fillRect(0, 0, 1920, 1080); g.restore(); }
    footer(g, this.tl, t, ['exponent', 'produce', 'produced', 'questions', 'forward', 'back', 'mirror', 'same'], { from: this.t0, carry: true });
  }
  paint(g, t) {
    const one = t >= this.same.start, l = this.tl.lineAt(t);
    const mouth = l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1;
    // gương đứng: vạch xuống từ trên trong 0.8s đầu; "the same" → tan thành ký hiệu
    if (!one) drawMirrorLine(g, SEAM, smooth(prog(t, this.t0, this.t0 + 0.8)), { width: 4, glow: 26 });
    drawMorph(g, SEAM_PTS, BURST_PTS, prog(t, this.same.start, this.same.start + 0.9), t, { colA: PAL.truth, colB: PAL.back, spread: 160 });
    const [AL, AR] = this.axes(t);
    if (one) duetFace(g, this.s, 960, Y, H, mouth);
    else {
      const inL = prog(t, this.t0, this.t0 + 0.4), tIn = this.q2.start - 0.3, inR = prog(t, tIn, tIn + 0.4);
      duetFace(g, this.s, AL, Y, H, mouth, { side: -1, tr: inL < 1 ? { kind: 'rows', dir: 'in', k: Math.max(0.001, inL), seed: 31 } : null, t });
      if (t >= tIn) duetFace(g, this.s, AR, Y, H, mouth, { mirror: true, side: 1, tr: inR < 1 ? { kind: 'columns', dir: 'in', k: Math.max(0.001, inR), seed: 32 } : null, t });
    }
    this.equations(g, t);
  }
  /** 2³ = ? (vàng, đọc xuôi) và 2^? = 8 (xanh, viết gương); "the same" → cả hai bay vào giữa thành 2³ = 8. */
  equations(g, t) {
    const m = smooth(prog(t, this.become.start, this.same.start));
    if (t >= this.same.start) {
      const s = 1 + 0.25 * (1 - outBack(prog(t, this.same.start, this.same.start + 0.25)));
      g.save(); g.translate(960, EQ_Y); g.scale(s, s); powText(g, [['2', '3'], ' = 8'], 0, 0, 110, { col: PAL.truth, expCol: PAL.fwd }); g.restore();
      return;
    }
    const pa = outBack(clamp((t - this.q1.start - 0.1) / 0.2)), pb = outBack(clamp((t - this.q2.start - 0.1) / 0.2));
    const xl = lerp(520, 960, m), xr = lerp(1400, 960, m);       // đứng yên phía trên hai mặt tới "and they become"
    if (pa > 0) { g.save(); g.translate(xl, EQ_Y); g.scale(pa, pa); powText(g, [['2', '3'], ' = ?'], 0, 0, 96, { col: PAL.fwd, expCol: PAL.fwdCore }); g.restore(); }
    if (pb > 0) {   // viết gương: lật ngang quanh tâm, lật dần về xuôi khi hai bên nhập lại
      g.save(); g.translate(xr, EQ_Y); g.scale(-pb * Math.cos(Math.PI * m) || -0.001, pb); powText(g, [['2', '?'], ' = 8'], 0, 0, 96, { col: PAL.back, expCol: PAL.backCore }); g.restore();
    }
    // mũi tên: vàng tiến (One moves forward), xanh lùi (One comes back)
    this.arrow(g, prog(t, this.fwd.start, this.fwd.start + 0.45, outExpo), xl - 150, EQ_Y + 70, 300, PAL.fwd, 1 - m);
    this.arrow(g, prog(t, this.back.start, this.back.start + 0.45, outExpo), xr + 150, EQ_Y + 70, -300, PAL.back, 1 - m);
  }
  arrow(g, k, x, y, len, col, a) {
    if (k <= 0 || a <= 0) return;
    const x1 = x + len * k, d = Math.sign(len);
    g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = 8; g.lineCap = 'round'; g.shadowColor = col; g.shadowBlur = 18;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x1, y); g.moveTo(x1, y); g.lineTo(x1 - 26 * d, y - 18); g.moveTo(x1, y); g.lineTo(x1 - 26 * d, y + 18); g.stroke();
    g.restore();
  }
}

const SEAM_PTS = Array.from({ length: 70 }, (_, i) => [960, 40 + i * 13]);
const BURST_PTS = SEAM_PTS.map(([x, y], i) => [x + (hash(i * 4.1) - 0.5) * 1700, y + (hash(i * 9.3) - 0.5) * 500]);
