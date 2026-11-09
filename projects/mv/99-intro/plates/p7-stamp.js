// P7 "Con dấu" · 17.25 → 20.77s · "From scratch! From scratch!" · beat.BEAT DROP
// Ý tưởng: đầu compa lao xuống đóng như con dấu cao su; chữ FROM SCRATCH
// được làm bằng chính nét cào của mũi compa. Xem docs/TREATMENT.md § P7.
import { C, H, W, clamp, hash, lerp, outBack, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, beat } from '../song.js';
import { hatchText, drawHatch, drawSprout } from '../../../../engine/hatch.js';
import { Mascot } from '../../../../engine/mascot.js';

const A = P.stamp;                 // 17.25 — cú đóng thứ nhất
const B = 15.85;                   // cú đóng thứ hai
const SPROUT = 16.23;              // bắt đầu nảy mầm
const END = P.lattice;             // 20.77

export default class P7 {
  // ĐẢO NỀN: giấy sáng, mực tối. Đây là cao trào — cú sốc thị giác lớn nhất
  // của video, và là cơ chế tạo BIÊN ĐỘ độ sáng (xem docs/mv/VISUAL-RESEARCH.md).
  // pdoom dành 8% thời lượng cho nền sáng; P7 dài 2.08s = đúng 8.0% bài.
  backdrop = { invert: 1 };

  async init() {
    this.mascot = await new Mascot().load();
    // Hai dòng xếp chồng: khối chữ chắc nịch như một con dấu thật,
    // chừa nửa phải khung cho mascot (TREATMENT § P7).
    this.a1 = hatchText('FROM',    { font: '900 150px "Archivo"', angle: -32*Math.PI/180, gap: 6 });
    this.a2 = hatchText('SCRATCH', { font: '900 150px "Archivo"', angle: -32*Math.PI/180, gap: 6 });
    this.b1 = hatchText('FROM',    { font: '900 150px "Archivo"', angle: -22*Math.PI/180, gap: 7, jitter: 2.1 });
    this.b2 = hatchText('SCRATCH', { font: '900 150px "Archivo"', angle: -22*Math.PI/180, gap: 7, jitter: 2.1 });
  }

  // chấn động khung do con dấu đóng xuống (có nguyên nhân trên hình)
  shake(t) {
    let sx = 0, sy = 0;
    for (const [tk, amp] of [[A, 26], [B, 34]]) {
      if (t >= tk && t < tk + 0.42) {
        const k = 1 - prog(t, tk, tk + 0.42);
        const d = k * k * amp;
        sx += Math.sin((t - tk) * 190) * d;
        sy += Math.cos((t - tk) * 157) * d * 0.7;
      }
    }
    return [sx, sy];
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t < A || t >= END) return;

    const [sx, sy] = this.shake(t);
    g.save();
    g.translate(sx, sy);

    const cx = W * 0.325, cy = H * 0.47;

    // ---- sóng xung kích teal tại mỗi cú đóng ----
    for (const [tk, r0] of [[A, 1.0], [B, 1.25]]) {
      if (t >= tk && t < tk + 0.9) {
        const k = prog(t, tk, tk + 0.9, outExpo);
        const r = k * 760 * r0;
        g.save();
        g.globalAlpha = (1 - k) * 0.55;
        g.strokeStyle = '#c4381a';
        g.lineWidth = lerp(9, 1.2, k);
        g.beginPath(); g.arc(cx, cy, r, 0, Math.PI*2); g.stroke();
        g.restore();
      }
    }

    // ---- nảy mầm: nét cào kéo dài ra thành đường dựng ----
    const sprout = t >= SPROUT ? prog(t, SPROUT, END, outCubic) : 0;
    // ---- từ 19.9s con dấu BUNG RA: chữ mờ đi, mầm sáng lên và toả rộng,
    //      bàn giao không gian cho P8 (không cắt cảnh) ----
    const burst = prog(t, 16.86, END, outCubic);
    const inkFade = 1 - burst * 0.82;

    // Hai dòng cào NỐI TIẾP nhau như một nhát tay liên tục:
    // reveal 0→1 chia đôi, dòng trên xong mới tới dòng dưới.
    const twoLine = (l1, l2, rv, col, wid, alpha, grow, dy) => {
      const n1 = l1.strokes.length, n2 = l2.strokes.length;
      const k = rv * (n1 + n2);
      // mầm mọc trước, nằm DƯỚI chữ
      if (grow > 0) {
        drawSprout(g, l1, 0, -dy, 1.0, { grow, alpha: 0.85, every: 2 });
        drawSprout(g, l2, 0,  dy, 1.0, { grow, alpha: 0.85, every: 2 });
      }
      drawHatch(g, l1, 0, -dy, 1.0, { color: col, width: wid, reveal: clamp(k / n1), alpha });
      if (k > n1) drawHatch(g, l2, 0, dy, 1.0, { color: col, width: wid, reveal: clamp((k - n1) / n2), alpha });
    };

    // ---- dấu 1: nghiêng +3°, gold, cào dần trong 0.34s ----
    if (t >= A) {
      const rv = prog(t, A, A + 0.34);
      const drop = prog(t, A - 0.10, A + 0.16, outExpo); // lao xuống
      g.save();
      g.translate(cx, cy);
      g.rotate(3 * Math.PI/180);
      g.scale(lerp(1.14, 1, drop), lerp(1.14, 1, drop));
      twoLine(this.a1, this.a2, rv, '#8a6a10', 2.6, 0.95*inkFade, sprout + burst*2.6, 126);
      g.restore();
    }

    // ---- dấu 2: to hơn, lệch −4°, gold-hot, đè chồng ----
    if (t >= B) {
      const rv = prog(t, B, B + 0.28);
      const drop = prog(t, B - 0.10, B + 0.14, outExpo);
      g.save();
      g.translate(cx + 30, cy + 16);
      g.rotate(-4 * Math.PI/180);
      const s = lerp(1.30, 1.15, drop);
      g.scale(s, s);
      twoLine(this.b1, this.b2, rv, '#c4381a', 2.9, 1.0*inkFade, sprout + burst*2.6, 126);
      g.restore();
    }

    // ---- MASCOT: rõ nhất cả video (TREATMENT § P7) ----
    // 40% chiều cao khung, PNG đặc, viền navy 4px, nảy mỗi cú đóng dấu.
    const mh = H * 0.52;   // cao trào: rõ nhất cả video
    let by = 0;
    for (const tk of [A, B]) {
      if (t >= tk && t < tk + 0.55) {
        const k = prog(t, tk, tk + 0.55, outBack);
        by -= Math.sin(k * Math.PI) * 14;      // nảy lên rồi về
      }
    }
    const mAlpha = t >= A ? Math.max(0.92, prog(t, A, A + 0.18)) : 0;
    if (mAlpha > 0) {
      // "FROM SCRATCH" — nhân vật được CÀO RA bằng nét phấn trước, rồi mới
      // đặc lại thành người. Đúng nghĩa đen của lời hát: dựng từ số không.
      // 0.34s đầu là nét; sau đó PNG đặc chồng lên và nét tắt dần.
      // docs/character/MASCOT-MATERIALS.md § Phân công.
      const kSolid = prog(t, A + 0.10, A + 0.34, outCubic);
      if (kSolid < 1) {
        // Nền P7 là GIẤY SÁNG (paperGround). Nét phấn gold-hot sẽ chìm hẳn —
        // đúng cái bẫy xung đột màu đã làm v2 hỏng. Trên giấy phải dùng MỰC
        // TỐI. docs/LESSONS.md §3.
        this.mascot.chalk(g, 'thumb', W * 0.815, H * 0.93 + by, mh,
                          { alpha: (1 - kSolid) * 0.95, color: '#2a2418', lw: 5 });
      }
      // PNG đặc ngay khi xuất hiện: cho alpha chạy 0→1 thì giấy lọt xuyên qua
      // người, nhìn như bóng ma. Nét phấn mới là thứ fade, không phải thân.
      this.mascot.draw(g, 'thumb', W * 0.815, H * 0.93 + by, mh,
                       { alpha: 0.98, ring: 4, ringColor: '#2a2418' });

      // vệt sáng gold quét chéo qua người một lần (19.5s): nhân vật
      // "thuộc về" thế giới sáng, không phải sticker dán lên.
      this.mascot.sweep(g, 'thumb', W * 0.815, H * 0.93 + by, mh,
                        prog(t, 16.50, 17.10));   // chỉ ăn khi PNG đã đặc
    }

    g.restore();
  }
}
