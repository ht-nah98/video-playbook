// Mascot dựng bằng ký hiệu toán (text-mosaic) và bằng hạt (point-cloud).
// Hai chất liệu, một nguồn: cùng đọc từ ảnh PNG của mascot.

/** Ký hiệu toán xếp theo "độ dày mực" tăng dần — vật liệu thay cho ASCII thường. */
export const RAMP = ['·', '.', ':', '−', '+', 'π', 'θ', 'd', '√', 'Σ', '∫', 'Π', '8', '▓'];

/**
 * Đọc ảnh thành lưới ô, mỗi ô giữ độ sáng trung bình + màu trung bình.
 * cell tính theo px LOGIC của khung 1920x1080 (không phải px ảnh gốc),
 * nên chữ giữ đúng kích thước khi mascot được scale.
 */
export function sampleGrid(img, dstW, dstH, cell){
  const cols = Math.max(1, Math.round(dstW / cell));
  const rows = Math.max(1, Math.round(dstH / cell));
  const cv = document.createElement('canvas');
  cv.width = cols; cv.height = rows;
  const g = cv.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingEnabled = true;
  g.drawImage(img, 0, 0, cols, rows);      // thu nhỏ = lấy trung bình mỗi ô
  const d = g.getImageData(0, 0, cols, rows).data;

  const lum = new Float32Array(cols * rows);
  const col = new Uint8Array(cols * rows * 3);
  const alp = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const r = d[i*4], gg = d[i*4+1], b = d[i*4+2], a = d[i*4+3] / 255;
    lum[i] = (0.2126*r + 0.7152*gg + 0.0722*b) / 255;
    col[i*3] = r; col[i*3+1] = gg; col[i*3+2] = b;
    alp[i] = a;
  }
  return { cols, rows, lum, col, alp, cell };
}

/**
 * Giãn tương phản QUANH TRUNG VỊ của phần không trong suốt.
 * Nâng sáng đều sẽ làm áo/da/tóc dính thành một khối; cách này tách chúng
 * thành các dải ký tự khác nhau.
 */
export function stretch(grid, { gain = 1.15, lift = 0.52, aMin = 0.35, lo = 0.06, hi = 0.94 } = {}) {
  const vals = [];
  for (let i = 0; i < grid.lum.length; i++) if (grid.alp[i] > aMin) vals.push(grid.lum[i]);
  if (!vals.length) return grid;
  vals.sort((a, b) => a - b);
  const med = vals[vals.length >> 1];
  // phân vị thực của nhân vật, không phải của cả khung
  const pLo = vals[Math.floor(vals.length * lo)];
  const pHi = vals[Math.floor(vals.length * hi)];
  const span = Math.max(1e-4, pHi - pLo);
  const out = new Float32Array(grid.lum.length);
  for (let i = 0; i < grid.lum.length; i++) {
    // 1) trải [pLo,pHi] ra [0,1] -> dùng hết thang ký tự
    let v = (grid.lum[i] - pLo) / span;
    v = Math.max(0, Math.min(1, v));
    // 2) giãn quanh trung vị đã chuẩn hoá, nhưng giữ vùng tối trong thang
    const m = (med - pLo) / span;
    v = (v - m) * gain + lift;
    // nén vùng rất sáng: mặt/tay không biến thành khối '▓' đặc
    if (v > 0.70) v = 0.70 + (v - 0.70) * 0.42;
    out[i] = Math.max(0.10, Math.min(0.94, v));   // sàn 0.10 để áo tối vẫn có ký tự
  }
  return { ...grid, lum: out, median: med, pLo, pHi };
}

/**
 * Vẽ mascot bằng ký hiệu toán lên ctx 2D.
 * x,y = chân nhân vật; h = chiều cao mong muốn (px logic).
 * `reveal` 0..1: tỉ lệ ô đã hiện (dùng để "gõ" nhân vật ra dần).
 */
export function drawMosaic(ctx, grid, x, y, w, h, {
  color = '#f0c000', color2 = '#78f0f0', alpha = 1, reveal = 1,
  t = 0, jitter = 0.5, aMin = 0.35, colorMode = 'gold',
} = {}) {
  const { cols, rows, lum, alp } = grid;
  const cw = w / cols, ch = h / rows;
  const x0 = x - w / 2, y0 = y - h;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${(ch * 0.96).toFixed(2)}px "IBM Plex Mono", "DejaVu Sans Mono", monospace`;
  if (colorMode !== 'image') {
    // bóng tối phía sau khối nhân vật -> tách khỏi nền hạt
    ctx.save();
    ctx.globalAlpha = alpha * 0.55;
    ctx.filter = 'blur(26px)';
    ctx.fillStyle = '#000008';
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.47, w * 0.40, h * 0.50, 0, 0, 6.2832);
    ctx.fill();
    ctx.restore();
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (alp[i] < aMin) continue;
      // hiện dần từ dưới lên
      if (reveal < 1 && (rows - r) / rows > reveal) continue;

      const v = lum[i];
      // chế độ ảnh: ô đặc không bao giờ rơi vào ký hiệu ít mực
      const vk = colorMode === 'image' ? 0.45 + 0.55 * v : v;
      const k = Math.min(RAMP.length - (colorMode === 'image' ? 2 : 1), Math.max(0, Math.round(vk * (RAMP.length - 1))));   // image: bỏ '▓' — khối đặc không phải ký hiệu
      const chx = RAMP[k];
      if (chx === ' ') continue;

      // rung nhẹ tất định, để lưới chữ "sống"
      const s = Math.sin((i * 12.9898 + t * 1.7) * 1.0) * 43758.5453;
      const j = (s - Math.floor(s) - 0.5) * jitter;

      // Nền v3 là navy sạch (#05070f), KHÔNG phải trường hạt vàng như v2 —
      // nên mascot được dùng đúng bảng màu của video. Đây là lỗi tôi đã sửa
      // NHẦM ở v3 đầu: v2 chìm vì xung đột MÀU với nền hạt, không phải vì
      // kỹ thuật mosaic. Bỏ mosaic là bỏ nhầm thứ.
      if (colorMode === 'image') {
        let R = Math.min(255, grid.col[i*3] * 1.15), G = Math.min(255, grid.col[i*3+1] * 1.15), B = Math.min(255, grid.col[i*3+2] * 1.15);
        // sàn độ sáng: ô tối vẫn đọc được trên nền navy, giữ nguyên sắc
        const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
        if (L < 8) { R = 96; G = 104; B = 130; }
        else if (L < 110) { const k = 110 / L; R = Math.min(255, R * k); G = Math.min(255, G * k); B = Math.min(255, B * k); }
        ctx.fillStyle = `rgb(${R|0},${G|0},${B|0})`;
        ctx.globalAlpha = alpha;
      } else {
        ctx.fillStyle = v > 0.70 ? '#ffffff' : v > 0.46 ? '#ffc94d' : v > 0.26 ? '#d4a017' : '#7a5f12';
        ctx.globalAlpha = alpha * Math.min(1, 0.55 + v * 0.62);
      }
      ctx.fillText(chx, x0 + (c + 0.5) * cw + j, y0 + (r + 0.5) * ch + j);
    }
  }
  ctx.restore();
}

/**
 * Chuyển lưới thành điểm 3D cho hệ hạt: trả về mảng [x, y] (đơn vị px logic,
 * gốc ở tâm) cùng màu, để Field.setTarget2D dùng.
 */
export function gridToPoints(grid, w, h, { aMin = 0.35, lumMin = 0.10 } = {}) {
  const { cols, rows, lum, alp, col } = grid;
  const pts = [], cols3 = [];
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (alp[i] < aMin || lum[i] < lumMin) continue;
      pts.push([(c + 0.5 - cols / 2) * cw, -(r + 0.5 - rows / 2) * ch]);
      cols3.push([col[i*3] / 255, col[i*3+1] / 255, col[i*3+2] / 255]);
    }
  }
  return { pts, cols: cols3 };
}
