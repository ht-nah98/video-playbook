// P20 fold — "X thành Y" · 140.09 → 155.70 (TREATMENT P20, beat vào lại, vẫn trên giấy)
// 140.09 beat vào: nếp gập của P19 đập xuống nốt — đường mũ vàng đè khít lên đường log xanh, mực bắn.
// Mở ra lại. "X becomes Y / Y becomes X": hai nhãn trục bay chéo qua gương đổi chỗ. "Every point switches":
// các chấm trên đường vàng nhảy vuông góc qua gương sang đường xanh. "Zero-one turns into one-zero":
// (0, 1) bay thành (1, 0). "Input becomes output on the other side of the screen": INPUT/OUTPUT đổi chỗ,
// cả tờ giấy lật sang mặt sau (mực thấm ngược); "What went forward now comes back": lật về.
// "Same relationship, different track": hai mũi tên chạy trên hai đường ray. "Two different graphs?":
// tờ giấy xé đôi theo gương, hai nửa trôi ra; "Look again": ghép lại; "One is the other seen through the
// mirror": gập lần nữa — trùng khít — rồi cả trang vỡ thành ký hiệu, về nền tối (P21).
import { clamp, prog, smooth, lerp, outBack } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { reflectPoint } from '../../../../engine/mirror.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR, beat } from '../song.js';
import { footer } from '../kit.js';
import { sheet, paperTimes, hand, splat, INK, FOLD_HOLD, AXIS_X, AXIS_Y, EXP_PTS, LOG_PTS } from '../paper.js';
import { G } from '../chorus2.js';

const DOTS = [-2, -1, 0, 1, 1.6];                    // các điểm trên đường mũ nhảy qua gương

export default class P20 {
  backdrop = false;
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.T = paperTimes(s.tl);
    const L = (x) => s.tl.line(x);
    this.xy = L('X becomes Y.'); this.yx = L('Y becomes X.'); this.every = L('Every point switches');
    this.zero = L('Zero-one turns'); this.clean = L('into one-zero clean.');
    this.input = L('Input becomes output'); this.screen = L('on the other side of the screen.');
    this.fwd = L('What went forward'); this.back = L('now comes back.'); this.rel = L('Same relationship,');
    this.two = L('Two different graphs?'); this.again = L('Look again.'); this.one = L('One is the other');
    this.next = s.tl.at('What does this exponent produce?');
    this.opened = this.yx.start - 0.05;                  // tờ giấy mở phẳng lại sau cú gập đầu
  }
  camera(t) {
    const slam = t >= this.t0 + 0.26 ? 1 - smooth(prog(t, this.t0 + 0.26, this.t0 + 0.7)) : 0;
    return { s: 1.03 + 0.05 * slam + 0.03 * Math.sin((t - this.t0) * 0.6), r: 0.012 * Math.sin((t - this.t0) * 0.8), bg: 0 };
  }
  render(g, t) {
    const t0 = this.t0;
    // 1) gập nốt (đập xuống đúng beat), mở lại; 9) gập lần cuối "One is the other"
    const close1 = smooth(prog(t, t0, t0 + 0.26)), open1 = smooth(prog(t, this.xy.words[2].start + 0.15, this.yx.start - 0.05));
    let flap = t < this.xy.words[2].start + 0.15 ? lerp(FOLD_HOLD, -1, close1) : lerp(-1, 1, open1);
    const close2 = smooth(prog(t, this.one.start, this.one.words[3].start));
    if (t >= this.one.start) flap = lerp(1, -1, close2);
    // 6) cả tờ lật sang mặt sau rồi lật về
    const over = smooth(prog(t, this.screen.words[2].start, this.screen.end)), comeback = smooth(prog(t, this.fwd.start, this.back.end));
    const whole = Math.cos(Math.PI * over * (1 - comeback));
    // 8) xé đôi rồi ghép lại
    const tear = 260 * smooth(prog(t, this.two.start, this.two.end)) * (1 - smooth(prog(t, this.again.start, this.again.end)));
    const paint = (c) => {
      const flip = t >= this.screen.words[2].start && t < this.back.end;
      sheet(c, t, this.T, { flap, whole: Math.abs(whole) < 0.02 ? 0.02 * Math.sign(whole || 1) : whole, tear, labels: t < this.opened,
        extra: (cc, back) => {
          if (back) return;
          this.marks(cc, t);
          if (flip) { hand(cc, 'x', ...AXIS_Y, 1, { size: 60 }); hand(cc, 'y', ...AXIS_X, 1, { size: 60 }); }   // đang lật: nhãn (đã đổi chỗ) nằm trên giấy
        } });
      this.labels(c, t);
    };
    shatter(g, paint, prog(t, this.next - 0.35, this.next), t, { seed: 28 });   // trang vỡ thành ký hiệu → nền tối
    // mực bắn khi nếp gập đập xuống, và khi trùng khít lần cuối
    splat(g, ...G(2, 1), prog(t, t0 + 0.26, t0 + 0.75), { col: INK.gold, seed: 3 });
    splat(g, ...G(2, 1), prog(t, this.one.words[3].start, this.one.words[3].start + 0.5), { col: INK.blue, seed: 9 });
    // nhân vật: chìa tay giới thiệu (khung trung, viền mực) — rồi mời "Look again"
    this.figure(g, t, 'offer', this.every.start - 0.1, this.input.start + 0.6, 29);
    this.figure(g, t, 'invite', this.again.start - 0.05, this.next - 0.6, 30);
    if (tear > 0) {                                      // lời chân khung nằm trên khe rách: dải giấy đỡ chữ để mực còn đọc được
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = Math.min(1, tear / 80); g.fillStyle = PAL.paper;
      g.beginPath(); g.roundRect(330, 958, 1260, 84, 14); g.fill(); g.restore();
    }
    footer(g, this.tl, t, ['x', 'y', 'point', 'mirror', 'zero', 'one', 'input', 'output', 'other', 'forward', 'back', 'relationship', 'graphs', 'again', 'mirror'],
      { from: t0, carry: true, colBase: PAL.ink, colKey: INK.gold });
  }
  figure(g, t, pose, a, b, seed) {
    const p = presence(t, a, b, { inDur: 0.3, outDur: 0.4 });
    if (p.state === 'hold') this.m.draw(g, pose, 1770, 1250, 960, { ring: 3, ringColor: PAL.ink, shadow: true });
    else if (p.state === 'in' || p.state === 'out') drawTransit(g, this.m, pose, 1770, 1250, 960, p.state === 'in' ? 'rows' : 'grid', p.state, p.k, { t, seed });
  }
  /** Nhãn x/y đổi chỗ bay qua gương (vẽ ngoài tờ giấy để không bị lật cùng). */
  labels(g, t) {
    // tới khi tờ giấy mở phẳng, nhãn nằm trên giấy (sheet labels) — gập cùng tờ; mở xong mới bay đổi chỗ
    if (t < this.opened || (t >= this.screen.words[2].start && t < this.back.end)) return;   // đang lật: vẽ trong sheet (extra)
    const kx = smooth(prog(t, this.opened, this.opened + 0.45)), ky = smooth(prog(t, this.opened + 0.25, this.opened + 0.7));
    const fly = (from, to, k) => { const [x, y] = [lerp(from[0], to[0], k), lerp(from[1], to[1], k) - Math.sin(Math.PI * k) * 120]; return [x, y]; };
    const [xx, xy] = fly(AXIS_X, AXIS_Y, kx), [yx, yy] = fly(AXIS_Y, AXIS_X, ky);
    hand(g, 'x', xx, xy, 1, { size: 60, col: kx > 0 && kx < 1 ? INK.gold : PAL.ink });
    hand(g, 'y', yx, yy, 1, { size: 60, col: ky > 0 && ky < 1 ? INK.blue : PAL.ink });
  }
  /** Dấu trên mặt trước tờ giấy: chấm nhảy qua gương, (0,1) → (1,0), INPUT/OUTPUT, mũi tên hai đường ray. */
  marks(g, t) {
    DOTS.forEach((u, i) => {
      const a = G(u, 2 ** u), b = reflectPoint(a, MIRROR), t1 = this.every.start + i * beat.BEAT * 0.5;
      const k = smooth(prog(t, t1, t1 + 0.35));
      if (t < this.every.start - 0.2) return;
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = 'rgba(30,34,48,0.5)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(...a); g.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); g.stroke(); g.setLineDash([]);
      g.fillStyle = INK.gold; g.beginPath(); g.arc(...a, 11, 0, Math.PI * 2); g.fill();
      if (k > 0) { g.fillStyle = INK.blue; g.beginPath(); g.arc(lerp(a[0], b[0], k), lerp(a[1], b[1], k), 11, 0, Math.PI * 2); g.fill(); }
      g.restore();
    });
    // (0, 1) → (1, 0)
    if (t >= this.zero.start) {
      const a = G(0, 1), b = G(1, 0), k = smooth(prog(t, this.clean.words[1].start, this.clean.words[3].start));
      const p = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
      g.save(); g.fillStyle = PAL.ink; g.beginPath(); g.arc(...p, 13, 0, Math.PI * 2); g.fill(); g.restore();
      hand(g, '(0, 1)', a[0] - 150, a[1] - 40, prog(t, this.zero.start, this.zero.start + 0.4), { col: INK.gold, size: 54 });
      hand(g, '(1, 0)', b[0] + 20, b[1] + 50, prog(t, this.clean.words[3].start, this.clean.words[3].start + 0.4), { col: INK.blue, size: 54 });
    }
    // INPUT / OUTPUT đổi chỗ qua gương
    if (t >= this.input.start) {
      const k = smooth(prog(t, this.input.words[2].start, this.input.words[2].start + 0.35));
      const A = [1240, 920], B = reflectPoint(A, MIRROR);
      const P1 = [lerp(A[0], B[0], k), lerp(A[1], B[1], k)], P2 = [lerp(B[0], A[0], k), lerp(B[1], A[1], k)];
      const s = outBack(clamp((t - this.input.start) / 0.2));
      for (const [txt, [x, y], col] of [['INPUT', P1, INK.gold], ['OUTPUT', P2, INK.blue]]) {
        g.save(); g.translate(x, y); g.scale(s, s); g.font = '600 36px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.strokeStyle = col; g.lineWidth = 3; const w = g.measureText(txt).width + 30; g.strokeRect(-w / 2, -28, w, 56);
        g.fillStyle = col; g.fillText(txt, 0, 2); g.restore();
      }
    }
    // hai đường ray: mũi tên vàng tiến trên đường mũ, mũi tên xanh lùi trên đường log
    if (t >= this.fwd.start) {
      const kf = prog(t, this.fwd.start, this.rel.end), kb = prog(t, this.back.start, this.rel.end + 0.6);
      this.runner(g, EXP_PTS, kf, INK.gold); this.runner(g, LOG_PTS, kb, INK.blue);
    }
  }
  runner(g, pts, k, col) {
    if (k <= 0 || k >= 1) return;
    const i = Math.min(pts.length - 2, Math.floor(k * (pts.length - 1))), [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    g.save(); g.translate(x0, y0); g.rotate(Math.atan2(y1 - y0, x1 - x0)); g.fillStyle = col;
    g.beginPath(); g.moveTo(26, 0); g.lineTo(-14, -16); g.lineTo(-14, 16); g.closePath(); g.fill(); g.restore();
  }
}
