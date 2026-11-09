// Chữ "cào" — chữ được tạo bởi các nét gạch chéo song song, như mũi kim loại
// cào trên giấy. Đây là cú chơi chữ trung tâm của P7 ("scratch" = vết cào).
import { hash } from './lib.js';

/**
 * Dựng danh sách nét gạch cho một chuỗi chữ.
 * Cách làm: vẽ chữ lên canvas offscreen làm MẶT NẠ, rồi quét các đường
 * song song nghiêng qua nó; mỗi đoạn đường nằm trong mặt nạ là một nét cào.
 * Tất định hoàn toàn (chỉ dùng hash theo chỉ số).
 *
 * @returns {{strokes:Array, w:number, h:number}} toạ độ gốc ở tâm khối chữ
 */
export function hatchText(text, {
  font = '900 220px "Archivo"',
  angle = -32 * Math.PI/180,  // hướng nét cào
  gap = 7,                    // khoảng cách giữa các nét (px)
  jitter = 1.6,               // xô lệch đầu/cuối nét
  overshoot = 5,              // nét chờm ra ngoài mép chữ -> mép xước
  minLen = 2.5,               // bỏ các mẩu quá ngắn
} = {}) {
  const cv = document.createElement('canvas');
  let ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.font = font;
  const m = ctx.measureText(text);
  const asc = m.actualBoundingBoxAscent || 160;
  const desc = m.actualBoundingBoxDescent || 50;
  const pad = 24;
  const w = Math.ceil(m.width) + pad*2;
  const h = Math.ceil(asc + desc) + pad*2;
  cv.width = w; cv.height = h;
  ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.font = font;
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, pad, asc + pad);
  const data = ctx.getImageData(0, 0, w, h).data;
  const inside = (x, y) => {
    const xi = x|0, yi = y|0;
    if (xi < 0 || yi < 0 || xi >= w || yi >= h) return false;
    return data[(yi*w + xi)*4 + 3] > 110;
  };

  // hệ trục xoay theo góc nét
  const ca = Math.cos(angle), sa = Math.sin(angle);
  const diag = Math.hypot(w, h);
  const strokes = [];
  let si = 0;
  // u: dọc theo nét; v: vuông góc (chỉ số dòng nét)
  for (let v = -diag; v <= diag; v += gap) {
    let run = null;
    const step = 1.0;
    for (let u = -diag; u <= diag; u += step) {
      // điểm trong hệ ảnh
      const x = w/2 + u*ca - v*sa;
      const y = h/2 + u*sa + v*ca;
      if (inside(x, y)) {
        if (!run) run = { u0: u, u1: u };
        else run.u1 = u;
      } else if (run) {
        if (run.u1 - run.u0 >= minLen) pushRun(run, v);
        run = null;
      }
    }
    if (run && run.u1 - run.u0 >= minLen) pushRun(run, v);
  }

  function pushRun(run, v) {
    const j1 = (hash(si*3.7) - 0.5) * jitter;
    const j2 = (hash(si*5.1 + 9) - 0.5) * jitter;
    const o1 = hash(si*7.3 + 2) * overshoot;
    const o2 = hash(si*11.9 + 5) * overshoot;
    const u0 = run.u0 - o1, u1 = run.u1 + o2;
    const x0 = w/2 + u0*ca - v*sa + j1;
    const y0 = h/2 + u0*sa + v*ca + j1;
    const x1 = w/2 + u1*ca - v*sa + j2;
    const y1 = h/2 + u1*sa + v*ca + j2;
    strokes.push({
      x0: x0 - w/2, y0: y0 - h/2,
      x1: x1 - w/2, y1: y1 - h/2,
      // độ đậm không đều, như mực dồn không đều
      ink: 0.55 + hash(si*13.1 + 3) * 0.45,
      seed: si,
    });
    si++;
  }
  // Thứ tự cào = thứ tự tay người quét: trái → phải theo tâm mỗi nét.
  // (mảng dựng theo dòng nét, vuông góc với hướng cào, nên phải sắp lại)
  strokes.sort((p, q) => (p.x0 + p.x1) - (q.x0 + q.x1));
  return { strokes, w, h };
}

/**
 * Vẽ các nét cào. `reveal` 0→1 cho phép chữ "được cào dần" theo thời gian.
 * Thứ tự cào: theo v (dòng nét), tức quét từ một phía sang — như tay người.
 */
export function drawHatch(g, hatch, x, y, scale, {
  color = '#ffc94d', width = 2.4, reveal = 1, alpha = 1, growFrom = 0,
} = {}) {
  const S = hatch.strokes;
  const n = S.length;
  if (!n) return;
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.lineCap = 'round';
  g.strokeStyle = color;
  const upTo = Math.ceil(n * reveal);
  for (let i = 0; i < upTo; i++) {
    const s = S[i];
    // nét mới nhất đậm hơn (đang cào)
    const fresh = reveal < 1 ? Math.max(0, 1 - (upTo - i) / 40) : 0;
    g.globalAlpha = alpha * s.ink * (0.75 + fresh * 0.25);
    g.lineWidth = (width + fresh * 1.1) / scale;
    g.beginPath();
    g.moveTo(s.x0, s.y0);
    g.lineTo(s.x1, s.y1);
    g.stroke();
  }
  g.restore();
}


/**
 * "Nảy mầm": từ mỗi nét cào của con dấu, một đường dựng mọc DÀI RA ngoài chữ.
 * Chữ giữ nguyên; đây là các đoạn vẽ THÊM nối tiếp hai đầu nét.
 * `grow` (0→1) là chiều dài mầm tính theo bội của nét gốc.
 */
export function drawSprout(g, hatch, x, y, scale, {
  color = '#2fe0d0', width = 1.2, grow = 0, alpha = 1, every = 3,
} = {}) {
  if (grow <= 0) return;
  const S = hatch.strokes;
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.lineCap = 'round';
  g.strokeStyle = color;
  g.lineWidth = width / scale;
  for (let i = 0; i < S.length; i += every) {
    const s = S[i];
    const dx = s.x1 - s.x0, dy = s.y1 - s.y0;
    const len = Math.hypot(dx, dy) || 1;
    // mầm dài theo hash riêng từng nét -> không đều, như rễ
    const L = grow * (26 + hash(s.seed * 17.3) * 62);
    const ux = dx / len, uy = dy / len;
    g.globalAlpha = alpha * (0.22 + hash(s.seed * 5.5) * 0.5);
    g.beginPath();
    g.moveTo(s.x1, s.y1);
    g.lineTo(s.x1 + ux * L, s.y1 + uy * L);
    g.stroke();
    g.beginPath();
    g.moveTo(s.x0, s.y0);
    g.lineTo(s.x0 - ux * L, s.y0 - uy * L);
    g.stroke();
  }
  g.restore();
}
