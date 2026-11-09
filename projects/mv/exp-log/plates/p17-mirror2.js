// P17 mirror2 — "Gương nhân đôi" · 98.88 → 112.80 (TREATMENT P17, chorus 2 — CÚ BÙNG NỔ)
// 98.88 cú trống lớn + bass + bè vọng cùng vào: kính quầy giao dịch vỡ tung về phía camera, lộ HAI gương giao
// nhau, sảnh ngân hàng nhường chỗ cho sảnh gương sâu hun hút. Điệp khúc 1 kể bằng đại số (mũi tên, cỗ máy);
// điệp khúc 2 kể bằng ĐỒ THỊ: hệ toạ độ đặt sao cho u = v trùng gương, nên ảnh của đường cong mũ (vàng)
// đúng là đường cong log (xanh). "Same connection, different track": vạch nối vuông góc gương giữa hai đường.
// "Give me the exponent…": điểm chạy 2 → 4 trên đường mũ; "…find the exponent": 4 → 2 trên đường log.
// "Turn it around": cả đồ thị gập qua gương — vàng ⇄ xanh. "Forward and backward… everywhere": nhân vật nhảy,
// kính vạn hoa 8 nhánh đường cong tràn khung, camera xoay. Bè vọng 101–114: lời lật gương ở nửa trên-trái.
import { clamp, prog, smooth, lerp, outExpo } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine, clipSide, foldMatrix, reflectPoint, line } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { decodeLine } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { textRings } from '../../../../engine/stage.js';
import { PAL, MIRROR, beat } from '../song.js';
import { figure, footer } from '../kit.js';
import { G, curve, axes, shards, mirrorHall, trace } from '../chorus2.js';
import { KACHING, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker } from '../bank.js';
import { glassAnswer } from '../glass.js';

const FACE = [960, 870, 560];                    // = P16: mặt nối liền qua cú vỡ
const ECHO = [101.0, 114.0];                     // data/stems.json: backing vocals
const LONG1 = line(-1740, 3240, 3660, -2160);     // = MIRROR (x + y = 1500), kéo dài
const LONG2 = line(-1740, -2160, 3660, 3240);     // = MIRROR2 (y = x − 420), kéo dài

export default class P17 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    const L = (txt) => s.tl.line(txt, 2);
    this.fwd = L('Run it forward,'); this.back = L('run it back.'); this.same = L('Same connection,');
    this.give = L('Give me the exponent—'); this.value = L("I'll give you the value.");
    this.gv = L('Give me the value—'); this.find = L('find the exponent.');
    this.turn = L('Turn it around,'); this.fb = L('Forward and backward—'); this.every = L('everywhere.');
    this.next = s.tl.at('Same old laws');
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.found = s.tl.line('and the answer can be found.').words[2].start;
  }
  backdropAt(t) {
    const k = smooth(prog(t, this.t0, this.t0 + 0.3)), e = smooth(prog(t, this.fb.start, this.fb.start + 0.5));
    return { glow: lerp(0.7, 1, k), horizon: 760, floor: lerp(0.65, 1, k), mirror: true, bokeh: 0.8 * k };   // vòng chữ vẽ trong cảnh: vỡ cùng thế giới ở lối ra
  }
  camera(t) {
    const p = prog(t, this.t0, this.t0 + 0.5), punch = 1 - smooth(p);
    const kick = Math.sin(Math.PI * prog(t, this.turn.start, this.turn.end)) * 0.3;
    const e = smooth(prog(t, this.fb.start, this.every.start)), spin = Math.max(0, t - this.every.start) * 0.9;
    return { s: 1 + 0.12 * punch + 0.06 * e, r: 0.07 * Math.sin(p * Math.PI * 3) * punch + kick + 0.22 * e + spin, bg: 0.25 * e };
  }
  render(g, t) {
    // thế giới điệp khúc 2 (sảnh gương, hai gương, vòng chữ, đồ thị) — vỡ CÙNG NHAU ở 0.35s cuối, không tắt cứng
    if (t < this.next) shatter(g, c => this.world(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 19 });
    if (t < this.t0 + 0.3) shatter(g, c => this.bank(c, t), prog(t, this.t0, this.t0 + 0.3), t, { seed: 23 });   // sảnh + chữ trên kính vỡ theo kính
    // mặt cận nối từ P16, hát nhép tới hết "different track", ra bằng lưới khi đồ thị làm việc
    const [FX, FY, FH] = FACE, p = presence(t, this.t0 - 1, this.give.start - 0.3, { outDur: 0.35 });
    if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
    else if (p.state === 'out') drawTransit(g, this.m, 'face', FX, FY, FH, 'grid', 'out', p.k, { t, cell: 7, seed: 22 });
    // "Forward and backward": nhảy lên giữa hai gương
    const pj = presence(t, this.fb.start, this.next - 0.45, { inDur: 0.25, outDur: 0.4 });
    figure(g, this.m, 'jump', 960, 1060, 640, pj.state === 'out' ? 'digits' : 'burn', pj, { t, seed: 17 });
    shards(g, prog(t, this.t0, this.t0 + 0.75));
    // bè vọng: lời lật gương, xanh, nửa trên-trái
    const l = this.tl.lineAt(t);
    if (l && t >= ECHO[0] && t < Math.min(ECHO[1], this.next))
      decodeLine(g, this.tl.wordsOf(l), t, 600, 200, { align: 'center', font: '800 44px "Archivo"', mirror: true,
        colBase: PAL.back, colKey: PAL.backCore, alpha: 0.75, burstAt: Math.min(this.next, l.end) - 0.3, burstDur: 0.3 });
    footer(g, this.tl, t, ['forward', 'back', 'connection', 'exponent', 'value', 'around', 'everywhere'], { from: this.t0, carry: true });
  }
  /** Đồ thị: hai đường cong + nối + điểm chạy; gập qua gương ở "Turn it around"; kính vạn hoa ở "everywhere". */
  graph(g, t) {
    const k = smooth(prog(t, this.turn.start, this.turn.end)), c = Math.cos(Math.PI * k), swap = c < 0;
    const A = swap ? PAL.back : PAL.fwd, B = swap ? PAL.fwd : PAL.back;
    const kal = smooth(prog(t, this.fb.words[2].start, this.every.start + 0.3));
    for (let m = 1; m < 8 && kal > 0; m++) {                     // kính vạn hoa: 7 bản xoay quanh tâm
      g.save(); g.translate(960, 540); g.rotate(m * Math.PI / 4 * kal); g.translate(-960, -540);
      curve(g, 1, { col: A, alpha: 0.5 * kal, width: 5 }); curve(g, 1, { log: true, col: B, alpha: 0.5 * kal, width: 5 });
      g.restore();
    }
    g.save(); g.transform(...foldMatrix(MIRROR, Math.max(Math.abs(c), 0.001)));   // |c| như P11b: qua nửa đường đổi màu, chữ không bị ngược
    axes(g, smooth(prog(t, this.give.start - 0.3, this.give.start)), { alpha: 0.35 });
    curve(g, prog(t, this.fwd.words[2].start - 0.1, this.fwd.words[2].start + 0.5, smooth), { col: A });
    curve(g, prog(t, this.back.words[2].start - 0.1, this.back.words[2].start + 0.5, smooth), { log: true, col: B });
    this.links(g, t);
    trace(g, 2, prog(t, this.give.words[3].start, this.give.words[3].start + 0.35), prog(t, this.value.words[4].start, this.value.words[4].start + 0.3),
      { inLabel: '2', outLabel: '4', col: A });
    trace(g, 2, prog(t, this.gv.words[3].start, this.gv.words[3].start + 0.35), prog(t, this.find.words[2].start, this.find.words[2].start + 0.3),
      { log: true, inLabel: '4', outLabel: '2', col: B });
    g.restore();
  }
  world(g, t) {
    const pulse = beat.onBeat(t, 0.25), e = smooth(prog(t, this.fb.start, this.fb.start + 0.5));
    mirrorHall(g, t, { alpha: smooth(prog(t, this.t0, this.t0 + 0.4)), pulse, spin: Math.max(0, t - this.every.start) * 0.6 });
    for (const [s, col] of [[1, PAL.fwd], [-1, PAL.back]]) {                 // hai nửa nhuộm theo gương thứ nhất
      g.save(); clipSide(g, MIRROR, s); g.globalAlpha = 0.07; g.fillStyle = col; g.fillRect(-960, -540, 3840, 2160); g.restore();
    }
    // gương kéo dài gấp 5 lần: camera xoay (kick 0.3 rad, spin ở "everywhere") không làm lộ đầu gương trong khung
    drawMirrorLine(g, LONG1, 1, { width: 6, glow: 30 });
    drawMirrorLine(g, LONG2, outExpo(prog(t, this.t0 + 0.05, this.t0 + 0.4)), { width: 4, glow: 20 });   // gương thứ hai xé ra
    if (e > 0) textRings(g, t, 960, 540, { r0: 300, gap: 62, n: 5, alpha: 0.85 * e, spin: 0.3, colors: [PAL.fwd, PAL.back],
      texts: ['FORWARD', 'BACKWARD', '2ᵘ', 'log₂', 'EVERYWHERE'] });
    this.graph(g, t);
  }
  /** Trạng thái cuối của P16 (sảnh lạnh sau kính alpha 0.32 + chữ trả lời trên kính) — để vỡ cùng mảnh kính. */
  bank(g, t) {
    const a = 0.32;
    vault(g, t, { alpha: 0.9 * a }); stacks(g, t, this.times, { alpha: a }); doubleLine(g, t, 1, { alpha: a });
    growthCurve(g, 12.6, { alpha: a }); doubleMarker(g, t, 1, { alpha: a });
    g.save(); g.globalAlpha = a; calendar(g, t, 12, -1, { label: '10.2', labelCol: PAL.back }); g.restore();
    glassAnswer(g, t, this.found);
  }
  /** "Same connection, different track": vạch nối đứt nét giữa điểm trên đường mũ và ảnh của nó trên đường log. */
  links(g, t) {
    const k = smooth(prog(t, this.same.start, this.same.start + 0.6));
    if (k <= 0) return;
    g.save(); g.setLineDash([12, 10]); g.lineDashOffset = -t * 60; g.strokeStyle = PAL.truth; g.lineWidth = 3; g.globalAlpha = 0.75 * k;
    for (const u of [-1, 0, 1, 1.8]) {
      const a = G(u, 2 ** u), b = reflectPoint(a, MIRROR);
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); g.stroke();
    }
    g.restore();
  }
}
