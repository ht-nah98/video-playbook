// P2 "Từ một chấm, dựng một câu hỏi" · 5.40 → 7.40s · "Start with a question,"
// Ngay cả câu hỏi cũng phải được DỰNG từ nền móng: dấu hỏi ở đây là một
// dựng hình thước-compa hợp lệ, không phải chữ vẽ tay.
// Xem docs/TREATMENT.md § P2.
import { C, H, W, clamp, lerp, outBack, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, beat, vox } from '../song.js';
import { arc, line, guide, guideCircle, point, label, inkColor } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';
import { typeLine, caret } from '../../../../engine/lyric.js';

const T_DOT = 6.90;    // "uh" — đầu compa chốt xuống mặt giấy
const T_Q   = 8.84;    // "start" — bắt đầu dựng; dấu hỏi xong đúng lúc
                       // hát hết "question" (9.76). Forced align.
const END   = P.break_; // 7.40

// Hình học dấu hỏi — dựng bằng thước-compa:
//  (1) cung lớn C1: phần móc trên, quét từ trái qua đỉnh sang phải-dưới
//  (2) cung nhỏ C2: cong ngược lại, kéo nét về trục giữa (chỗ thắt của dấu hỏi)
//  (3) đoạn thẳng đứng: từ chỗ thắt xuống
//  (4) chấm dưới = chính điểm A
const QX = W * 0.46, QY = H * 0.38;
const R1 = 118;                      // cung lớn
const A1_0 = Math.PI * 0.92;         // hở ở dưới-trái (đặc trưng dấu hỏi)
const A1_1 = Math.PI * 2.08;         // qua trái, lên đỉnh, xuống phải
const R2 = 92;                       // cung nhỏ, cong NGƯỢC chiều
const A2_0 = Math.PI * 1.98;
const A2_1 = Math.PI * 2.62;

export default class P2 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
    this.beat = shared?.beat;
  }

  render(g, t) {
    if (t < P.dot || t >= END) return;

    // điểm A — chấm chân dấu hỏi, cũng là điểm khởi đầu duy nhất
    const ax = QX + 6, ay = QY + 386;

    // rung nhẹ khi đầu compa chạm giấy (rung CÓ lý do)
    let sh = 0;
    if (t >= T_DOT && t < T_DOT + 0.26) {
      const k = 1 - prog(t, T_DOT, T_DOT + 0.26);
      sh = k * k * 7;
    }
    g.save();
    g.translate(Math.sin((t - T_DOT) * 150) * sh, Math.cos((t - T_DOT) * 131) * sh * 0.6);

    // ---- đường dựng phụ: cho thấy dấu hỏi được DỰNG ----
    const gp = prog(t, T_Q - 0.18, T_Q + 0.5);
    if (gp > 0) {
      guideCircle(g, QX, QY, R1, gp, { alpha: 0.7 });
      guide(g, QX, QY, QX + R1, QY, gp, { alpha: 0.6 });
      guide(g, QX, QY, QX, ay, gp, { alpha: 0.45 });
      if (gp > 0.5) label(g, QX, QY, 'O', { dx: -32, dy: -26, size: 22, alpha: (gp-0.5)*2*0.75 });
    }

    // ---- (1) cung lớn: móc trên của dấu hỏi ----
    const p1 = prog(t, T_Q, T_Q + 0.32, outCubic);
    const [e1x, e1y] = arc(g, QX, QY, R1, A1_0, A1_1, p1, {
      width: 11, age: (t - T_Q) * 0.55, seg: 90,
    });

    // ---- (2) cung nhỏ cong NGƯỢC: kéo nét về trục giữa ----
    // tâm C2 đặt sao cho C2 nối liền đầu cuối cung lớn
    const j1x = QX + Math.cos(A1_1) * R1, j1y = QY + Math.sin(A1_1) * R1;
    const c2x = j1x - Math.cos(A2_0) * R2, c2y = j1y - Math.sin(A2_0) * R2;
    const p2 = prog(t, T_Q + 0.28, T_Q + 0.56, outCubic);
    const [e2x, e2y] = arc(g, c2x, c2y, R2, A2_0, A2_1, p2, {
      width: 11, age: (t - T_Q - 0.28) * 0.55, seg: 48,
    });
    if (p2 > 0.05) guideCircle(g, c2x, c2y, R2, Math.min(1, p2*1.5), { alpha: 0.34 });

    // ---- (3) đoạn thẳng đứng xuống chân dấu hỏi ----
    const p3 = prog(t, T_Q + 0.52, T_Q + 0.72, outCubic);
    const [e3x, e3y] = line(g, e2x, e2y, e2x, e2y + 104, p3, {
      width: 11, age: (t - T_Q - 0.52) * 0.55,
    });

    // ---- (4) chấm dưới — CHÍNH LÀ điểm A ban đầu ----
    const p4 = prog(t, T_Q + 0.70, T_Q + 0.84, outBack);
    if (p4 > 0) {
      g.save();
      g.globalAlpha = clamp(p4);
      g.fillStyle = inkColor((t - T_Q - 0.70) * 0.55);
      g.beginPath();
      g.arc(e2x, e2y + 168, 13 * Math.min(1, p4), 0, Math.PI*2);
      g.fill();
      g.restore();
    }

    // ---- điểm A: có từ đầu cảnh, là tất cả những gì ta được cho ----
    if (t >= T_DOT) {
      const pop = prog(t, T_DOT, T_DOT + 0.30, outBack);
      if (t < T_Q + 0.74) {
        g.save();
        g.globalAlpha = 1;
        g.fillStyle = C.goldHot;
        g.beginPath(); g.arc(ax, ay, 7 * Math.min(1.3, pop), 0, Math.PI*2); g.fill();
        g.restore();
      }
      if (t < T_Q + 0.2) {
        label(g, ax, ay, 'A', { dx: 30, dy: -28, size: 26, alpha: clamp(pop) * (1 - prog(t, T_Q, T_Q+0.2)) });
      }
    }

    // ---- đầu compa ở đầu bút ----
    let hx = ax, hy = ay;
    if (t >= T_Q) {
      if (p4 > 0)      { hx = e2x; hy = e2y + 168; }
      else if (p3 > 0) { hx = e3x; hy = e3y; }
      else if (p2 > 0) { hx = e2x; hy = e2y; }
      else             { hx = e1x; hy = e1y; }
    }
    const glow = t < T_Q ? 1.5 : 1;
    point(g, hx, hy, { r: 6, glow });

    g.restore();

    // ---- ghi chú bên lề: từng từ hiện đúng lúc được hát ----
    // Gõ theo KÝ TỰ, tốc độ bám thời lượng hát từng từ (docs/mv/SYNC.md §1).
    // Mốc từ forced alignment — không gõ số tay.
    const LW = [
      { w: 'Start',    start: 8.843, end: 9.083 },
      { w: 'with',     start: 9.103, end: 9.223 },
      { w: 'a',        start: 9.263, end: 9.283 },
      { w: 'question', start: 9.363, end: 9.763, key: true },
    ];
    const cur = typeLine(g, LW, t, 118, 128, { alpha: 0.95 });
    caret(g, cur.x, 128, t, this.beat, { alpha: cur.done ? 0 : 1 });
    g.restore();

    // ---- MASCOT: cầm phấn, tay chỉ vào đầu compa ----
    const mh = H * 0.34;
    const slide = prog(t, P.dot, P.dot + 0.55, outExpo);
    const mx = lerp(W + mh*0.4, W * 0.845, slide);
    this.mascot.draw(g, 'chalk', mx, H * 0.99, mh, { alpha: 0.96, ring: 4 });

    // Vòng tròn teal vẽ quanh anh ta ĐÚNG lúc hát từ "question" — khung chứa
    // đổi nghĩa: giờ nhân vật đang ở trong một câu hỏi. Vòng mở theo chu vi
    // trùng độ dài từ được hát (vox.wordAt), không phải hằng số gõ tay.
    // docs/character/MASCOT-MATERIALS.md § Phân công.
    const q = vox.wordAt('question');
    if (q && t >= q.start) {
      const k = prog(t, q.start, q.end + 0.18, outCubic);
      this.mascot.frame(g, mx, H * 0.99, mh, k,
                        { shape: 'circle', color: C.teal, lw: 3, alpha: 0.55, pad: 1.05 });
    }
  }
}
