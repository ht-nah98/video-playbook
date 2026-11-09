// P08 extend — "Luật kéo dài" · 29.24 → 35.68 (TREATMENT P08)
// Trục số mũ (tiếp từ P07), trên mỗi mốc một cột cao 2ⁿ; cuối cảnh đường cong 2ˣ luồn qua đỉnh mọi cột.
import { clamp, prog, outBack, smooth } from '../../../../engine/lib.js';
import { presence } from '../../../../engine/transit.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, CUE } from '../song.js';
import { powText, figure, footer, AXIS, axisX, axisY, markLabel } from '../kit.js';

const CW = 70;                                   // bề rộng cột

export default class P08 {
  backdrop = { glow: 0.9, haloX: 900, haloY: 560 };
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.zero = s.tl.line('Zero has no choice.');
    this.neg = s.tl.line('Negative turns around.');
    this.frac = s.tl.line('Fractions pull out roots');
    this.law = s.tl.line('when the same law holds its ground.');
    this.step = s.tl.line('Step by step,');
    this.next = s.tl.at("We didn't pick the meaning.");
  }
  // cột ở mốc v, cao h đơn vị (h < 0: cắm xuống dưới trục)
  col(g, v, h, color, dy = 0) {
    const x = axisX(v) - CW / 2, top = Math.min(AXIS.y, axisY(h)), bot = Math.max(AXIS.y, axisY(h));
    g.fillStyle = color; g.fillRect(x, top + dy, CW, bot - top);
  }
  lock(g, x, y, shut) {                          // ổ khoá: càng khoá hạ xuống khi shut → 1
    g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 10;
    const lift = 34 * (1 - shut), cy = y - 60 - lift;
    g.beginPath(); g.moveTo(x - 26, y - 30 - lift); g.lineTo(x - 26, cy); g.arc(x, cy, 26, Math.PI, 0); g.lineTo(x + 26, y - 30 - lift); g.stroke();
    g.fillStyle = PAL.fwd; g.fillRect(x - 38, y - 30, 76, 58);
    g.fillStyle = PAL.bg; g.fillRect(x - 5, y - 12, 10, 20);
    g.restore();
  }
  render(g, t) {
    // lối ra: cả biểu đồ vỡ thành ký hiệu trong 0.35s cuối, lời chân khung vỡ theo
    shatter(g, c => this.paint(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 8 });
    footer(g, this.tl, t, ['zero', 'negative', 'roots', 'law', 'step'], { from: this.t0, at: this.next - 0.3, dur: 0.3 });
  }
  paint(g, t) {
    const { zero, neg, frac, law, step } = this;
    // trục + nhãn mốc — y hệt khung cuối P07 để hai cảnh nối liền
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4;
    g.beginPath(); g.moveTo(axisX(-2.5), AXIS.y); g.lineTo(axisX(3.4), AXIS.y); g.stroke();
    g.textAlign = 'center'; g.font = '900 64px "Archivo"';
    AXIS.marks.forEach((v) => { g.fillStyle = v < 0 ? PAL.back : PAL.fwd; g.fillText(markLabel(v), axisX(v), AXIS.y + 70); });
    g.restore();
    // cột dương 2¹ 2² 2³ mọc lên ngay đầu cảnh
    [1, 2, 3].forEach((v, i) => {
      const k = outBack(clamp((t - zero.start - 0.1 * i) / 0.4));
      if (k <= 0) return;
      this.col(g, v, 2 ** v * Math.min(k, 1), PAL.fwd);
      if (k > 0.9) powText(g, [['2', `${v}`]], axisX(v), axisY(2 ** v) - 20, 52);
    });
    // "Zero has no choice": khối cao đúng 1 đập xuống mốc 0, ổ khoá đóng đúng tiếng brass
    const land = smooth(clamp((t - zero.start - 0.15) / 0.25));    // rơi không nảy: không lọt xuống dưới trục
    if (land > 0) {
      this.col(g, 0, 1, PAL.truth, -(1 - land) * 900);
      const shut = smooth(prog(t, CUE.brass - 0.18, CUE.brass));
      const show = outBack(clamp((t - zero.start - 0.26) / 0.2));
      if (show > 0) { g.save(); g.translate(axisX(0), axisY(1) - 90); g.scale(show, show); this.lock(g, 0, 0, shut); g.restore(); }
      const ring = prog(t, CUE.brass, CUE.brass + 0.35);
      if (ring > 0 && ring < 1) {
        g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 6 * (1 - ring);
        g.beginPath(); g.arc(axisX(0), axisY(1) - 90, 50 + 140 * ring, 0, Math.PI * 2); g.stroke(); g.restore();
      }
      if (t >= CUE.brass) powText(g, [['2', '0'], ' = 1'], axisX(0) - 50, axisY(1) - 150, 52, { align: 'right' });
    }
    // "Negative turns around": cột âm cắm xuống rồi lộn ngược thành ½, ¼ — mũi tên quay đầu
    if (t >= neg.start) {
      const flip = smooth(prog(t, neg.start + 0.3, neg.start + 0.8));
      [-1, -2].forEach((v, i) => {
        const k = outBack(clamp((t - neg.start - 0.08 * i) / 0.25));
        this.col(g, v, (-(0.2 + 0.1 * i) * (1 - flip) + 2 ** v * flip) * k, PAL.back);
        if (flip >= 1) {
          g.save(); g.textAlign = 'center'; g.font = '900 52px "Archivo"'; g.fillStyle = PAL.backCore;
          g.fillText(v === -1 ? '½' : '¼', axisX(v), axisY(2 ** v) - 22); g.restore();
        }
      });
      const cx = axisX(-1.5) - 12, a1 = Math.PI / 2 - Math.PI * flip;         // cung từ dưới vòng lên trên
      g.save(); g.strokeStyle = PAL.back; g.lineWidth = 8; g.shadowColor = PAL.back; g.shadowBlur = 16;
      g.beginPath(); g.arc(cx, AXIS.y, 85, Math.PI / 2, a1, true); g.stroke();
      if (flip > 0.05) {
        const hx = cx + 85 * Math.cos(a1), hy = AXIS.y + 85 * Math.sin(a1);
        g.fillStyle = PAL.back; g.beginPath();
        g.moveTo(hx + 26, hy); g.lineTo(hx - 14, hy - 20); g.lineTo(hx - 14, hy + 20); g.fill();
      }
      g.restore();
    }
    // "Fractions pull out roots": cột ½ cao √2, rút ra một dấu √ như rút kiếm
    if (t >= frac.start) {
      const k = outBack(clamp((t - frac.start) / 0.3));
      this.col(g, 0.5, Math.SQRT2 * k, PAL.fwd);
      const pull = smooth(prog(t, frac.start + 0.3, frac.start + 0.8));
      const top = axisY(Math.SQRT2);
      g.save(); g.textAlign = 'center'; g.font = `900 ${(60 + 60 * pull).toFixed(0)}px "Archivo"`;
      g.fillStyle = PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 30 * pull;
      g.beginPath(); g.rect(axisX(0.5) - 120, 0, 240, top + 4); g.clip();     // lưỡi kiếm mọc lên từ miệng cột
      g.fillText('√', axisX(0.5), top + 70 - 200 * pull);
      g.restore();
      if (pull >= 1) powText(g, [['2', '½'], ' = √2'], axisX(0.5) + 30, top - 235, 48);
    }
    // "when the same law holds its ground": con dấu đóng lên góc trái
    if (t >= law.start) {
      const s = 1 + 0.9 * (1 - outBack(clamp((t - law.start) / 0.22)));
      g.save(); g.translate(430, 250); g.rotate(-0.1); g.scale(s, s);
      g.strokeStyle = PAL.fwd; g.lineWidth = 8; g.strokeRect(-250, -95, 500, 190);
      g.font = '500 30px "IBM Plex Mono"'; g.fillStyle = PAL.fwdCore; g.textAlign = 'center'; g.fillText('SAME LAW', 0, -45);
      powText(g, [['a', 'm'], ' · ', ['a', 'n'], ' = ', ['a', 'm+n']], 0, 55, 64);
      g.restore();
    }
    // "Step by step": đường cong vàng luồn qua đỉnh mọi cột — đường cong mũ ra đời
    if (t >= step.start) {
      const k = smooth(prog(t, step.start, step.start + 1.6)), v0 = -2.45, v1 = v0 + (3.05 - v0) * k;
      g.save(); g.strokeStyle = PAL.fwdCore; g.lineWidth = 8; g.shadowColor = PAL.fwd; g.shadowBlur = 28; g.lineJoin = 'round';
      g.beginPath();
      for (let v = v0; v <= v1; v += 0.02) { const x = axisX(v), y = axisY(2 ** v); v === v0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(axisX(v1), axisY(2 ** v1), 12, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    // nhân vật chỉ theo đường cong, vào bằng rows; tan trước khi sang P09
    const p = presence(t, step.start, this.next - 0.5, { inDur: 0.3, outDur: 0.45 });
    figure(g, this.m, 'point', 1715, 1040, 500, 'rows', p, { t, seed: 8, flip: true });   // lật: tay chỉ ngược về đường cong
  }
}
