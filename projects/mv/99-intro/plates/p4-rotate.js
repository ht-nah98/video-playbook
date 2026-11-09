// P4 "Bốn môn, bốn hình" · 10.34 → 12.66s
// "Lines turn, numbers move, watch it come around."
// Kênh dạy hình học / giải tích / xác suất / đại số — nên cảnh dài nhất phải
// cho thấy CẢ BỐN, mỗi môn một biểu đồ thật, không phải một đường quay.
import { C, H, W, clamp, inOutCubic, lerp, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, vox } from '../song.js';
import { point, label, inkColor } from '../../../../engine/draw.js';
import { geometry, calculus, probability, algebra } from '../../../../engine/charts.js';
import { Mascot } from '../../../../engine/mascot.js';
import { typeLine, caret } from '../../../../engine/lyric.js';

const A   = P.rotate;    // 10.34  "lines turn"
const END = P.erase;     // 12.66

// bốn ô, mỗi ô một môn — vào theo từ được hát
const SLOT = [
  { t0: 10.34, name: 'GEOMETRY',    sub: 'dựng hình' },   // "lines turn"
  { t0: 11.02, name: 'CALCULUS',    sub: 'biến thiên' },  // "numbers move"
  { t0: 11.62, name: 'PROBABILITY', sub: 'phân phối' },   // "watch it"
  { t0: 12.04, name: 'ALGEBRA',     sub: 'khai triển' },  // "come around"
];

export default class P4 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
    this.beat = shared?.beat;
  }

  render(g, t) {
    if (t < A || t >= END) return;

    // 4 ô lưới 2×2, ô sau đè lên ô trước bằng cách camera trượt sang
    const gx = [W * 0.24, W * 0.56, W * 0.24, W * 0.56];
    const gy = [H * 0.33, H * 0.33, H * 0.72, H * 0.72];

    for (let i = 0; i < 4; i++) {
      const s = SLOT[i];
      const p = prog(t, s.t0, s.t0 + 0.62, outCubic);
      if (p <= 0) continue;
      const x = gx[i], y = gy[i];

      g.save();
      // ô vừa vào thì nhấn to hơn một nhịp rồi về
      const pop = 1 + (1 - prog(t, s.t0, s.t0 + 0.30, outExpo)) * 0.14;
      g.translate(x, y); g.scale(pop, pop); g.translate(-x, -y);

      if (i === 0) geometry(g, x, y - 18, 108, p);
      if (i === 1) calculus(g, x, y, 62, 46, p);
      if (i === 2) probability(g, x, y + 66, 250, 122, p);
      if (i === 3) algebra(g, x, y, 190, p);

      // nhãn môn học, mono, nhỏ — như nhãn bản vẽ kỹ thuật
      const pl = prog(t, s.t0 + 0.16, s.t0 + 0.40);
      if (pl > 0) {
        g.globalAlpha = pl;
        g.font = '500 25px "IBM Plex Mono", monospace';
        g.fillStyle = t - s.t0 < 0.55 ? C.goldHot : C.bone;
        g.textAlign = 'center';
        g.fillText(s.name, x, y - 152);
        g.globalAlpha = pl * 0.55;
        g.font = '400 19px "IBM Plex Mono", monospace';
        g.fillStyle = C.boneDim;
        g.fillText(s.sub, x, y - 128);
      }
      g.restore();
    }

    // ---- lời bài hát: gõ theo KÝ TỰ (docs/mv/SYNC.md §1) ----
    // Bốn cụm, mỗi cụm một dòng, mốc từ forced alignment.
    const ROWS = [
      [{ w:'Lines', start:10.34, end:10.80 }, { w:'turn', start:10.80, end:10.90, key:true }],
      [{ w:'numbers', start:11.143, end:11.344 }, { w:'move', start:11.24, end:11.44, key:true }],
      [{ w:'watch', start:11.624, end:11.784 }, { w:'it', start:11.70, end:11.80 }],
      [{ w:'come', start:11.864, end:12.024 }, { w:'around', start:12.044, end:12.604, key:true }],
    ];
    let yy = 96, lastRow = null;
    for (const row of ROWS) {
      if (t < row[0].start) break;
      lastRow = typeLine(g, row, t, 96, yy, { alpha: 0.95 });
      yy += 34;
    }
    if (lastRow && !lastRow.done) caret(g, lastRow.x, lastRow.y, t, this.beat);

    // ---- MASCOT: mosaic ký hiệu toán, hiện dần rồi tan ----
    // Đây là chất liệu đúng cho cảnh "bốn môn": nhân vật LÀM BẰNG ký hiệu toán.
    const rv = prog(t, A, A + 0.80);
    const out = 1 - prog(t, END - 0.42, END);
    this.mascot.mosaic(g, 'point', W * 0.915, H * 0.94, H * 0.40,
                       { alpha: 1.0 * out, reveal: rv, t, cell: 8 });
  }
}
