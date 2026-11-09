// P1 "Đồng hồ 99%" · 0.00 → 5.40s · "Ninety-nine percent... Loading."
// Thanh loading của kênh không phải hình chữ nhật — nó là một VÒNG TRÒN
// CHƯA KHÉP. Thiếu 1% thì chưa phải vòng tròn. Xem docs/TREATMENT.md § P1.
import { C, H, W, clamp, inOutCubic, lerp, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, beat } from '../song.js';
import { arc, point, guideCircle, mix } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

const T_DOT   = 0.25;   // vox.VOX[0] — giọng máy cất tiếng đầu
const T_ARC0  = 0.74;   // vox.VOX[1] — bắt đầu vạch cung
const T_ARC1  = 5.76;   // vox.VOX[10] hết — cung dừng ở 99% đúng lúc giọng ngưng
const T_DOLLY = 6.04;   // dolly vào, kết thúc trước khi rap vào 5.28
const END     = P.dot;  // 5.40

export default class P1 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t >= END) return;

    // Camera dolly vào khoảng hở 1% ở cuối cảnh: phóng to quanh điểm hở
    const dolly = prog(t, T_DOLLY, END, inOutCubic);
    const R0 = 248;
    const cx0 = W * 0.5, cy0 = H * 0.53;
    // khoảng hở nằm ở −90° + 99% vòng → gần đỉnh, lệch phải một chút
    const aGap = -Math.PI/2 + Math.PI*2*0.995;
    const gx = cx0 + Math.cos(aGap)*R0, gy = cy0 + Math.sin(aGap)*R0;

    g.save();
    if (dolly > 0) {
      const z = lerp(1, 7.5, dolly);
      g.translate(gx, gy); g.scale(z, z); g.translate(-gx, -gy);
      // đồng thời trôi khoảng hở về mép phải
      g.translate(lerp(0, -(gx - W*1.02))*dolly*0.42, lerp(0, (H*0.5 - gy))*dolly*0.42);
    }

    const cx = cx0, cy = cy0;
    const pArc = prog(t, T_ARC0, T_ARC1, outCubic) * 0.99;

    // vòng phụ trợ mờ: cho thấy đích đến là một vòng tròn trọn vẹn
    if (t >= T_ARC0) guideCircle(g, cx, cy, R0, 1, { alpha: 0.5 * (1 - dolly*0.7) });

    // cung chính — vạch theo chiều kim đồng hồ từ đỉnh
    const a0 = -Math.PI/2;
    const [hx, hy] = arc(g, cx, cy, R0, a0, a0 + Math.PI*2, pArc, {
      width: 4.5, age: (t - T_ARC0) * 0.26, seg: 150,
    });

    // khoảng hở 1% nhấp nháy gold-hot, chờ
    if (pArc >= 0.985) {
      const bl = 0.45 + 0.55 * Math.pow(0.5, ((t - T_ARC1) % beat.BEAT) / 0.16);
      g.save();
      g.globalAlpha = bl;
      g.lineWidth = 4.5;
      g.strokeStyle = C.goldHot;
      g.setLineDash([3, 7]);
      g.beginPath();
      g.arc(cx, cy, R0, a0 + Math.PI*2*0.99, a0 + Math.PI*2);
      g.stroke();
      g.restore();
    }

    // đầu compa ở đầu bút
    if (t >= T_DOT) {
      const bob = t < T_ARC0 ? prog(t, T_DOT, T_ARC0, outExpo) : 1;
      point(g, hx, hy, { r: 6, glow: 1 + (1 - bob) * 1.6 });
    }

    // ---- nhãn phần trăm chạy theo đầu bút ----
    if (t >= T_ARC0 && dolly < 0.55) {
      const pct = Math.min(99, Math.floor(pArc / 0.99 * 99));
      g.save();
      g.globalAlpha = 1 - dolly/0.55;
      g.font = '500 34px "IBM Plex Mono", monospace';
      g.fillStyle = pct >= 99 ? C.goldHot : C.bone;
      g.textAlign = 'left'; g.textBaseline = 'middle';
      const lx = hx + 22, ly = hy - 20;
      g.strokeStyle = C.boneDim; g.lineWidth = 1.1;
      g.beginPath(); g.moveTo(hx, hy); g.lineTo(lx, ly); g.stroke();
      g.fillText(`${pct}%`, lx + 8, ly);
      g.restore();
    }

    // ---- "Loading" mono dưới tâm, dấu chấm gõ theo beat ----
    if (t >= 1.1 && dolly < 0.4) {
      const nd = Math.min(3, Math.max(0, Math.floor((t - 1.1) / (beat.BEAT/2)) % 4));
      g.save();
      g.globalAlpha = (1 - dolly/0.4) * 0.92;
      g.font = '400 30px "IBM Plex Mono", monospace';
      g.fillStyle = C.bone;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('Loading' + '.'.repeat(nd), cx, cy + R0 + 74);
      g.restore();
    }

    g.restore();

    // ---- MASCOT: trượt vào từ mép trái, nhìn vòng tròn chưa khép ----
    if (t >= 3.0) {
      const slide = prog(t, 3.90, 5.05, outExpo);
      const mh = H * 0.30;
      const x = lerp(-mh*0.5, W*0.145, slide);
      const fade = 1 - prog(t, T_DOLLY, END) * 0.85;
      this.mascot.draw(g, 'think', x, H * 0.985, mh, { alpha: 0.96 * fade, ring: 4 });
    }
  }
}
