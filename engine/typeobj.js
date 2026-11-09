// CHỮ LÀ VẬT THỂ — kỹ thuật mạnh nhất của video mẫu.
//
// Ở video mẫu, mặt trời được dựng bằng chính lời bài hát: chữ uốn thành vòng
// đồng tâm, tia sáng cũng là chữ. Chữ không bao giờ chỉ là phụ đề — nó là
// MỘT PHẦN CỦA THẾ GIỚI trong khung. Xem docs/mv/REFERENCE-TEARDOWN.md § 3.
//
// Khác engine/lyric.js: lyric.js hiện lời để ĐỌC (gõ theo ký tự, bám vox).
// File này dùng lời làm VẬT LIỆU dựng hình — người xem đọc được thì tốt,
// nhưng vai trò chính của nó là hình khối và chuyển động.
//
// Mọi hàm ở đây:
//   • là hàm THUẦN của t (không Math.random / Date.now) — AGENTS.md luật 2
//   • nhận màu từ tham số, KHÔNG tự chọn theo bảng màu thương hiệu
//     (docs/LESSONS.md §13: màu phải hợp nền của cảnh đó)
//   • vẽ LỚN và tương phản cao — đây cũng là lớp chuyển động chính của khung
//     (docs/mv/VISUAL-RESEARCH.md §7-8: nền trên cần vật thể lớn, không phải
//      lớp mờ trượt)
import { clamp, hash, lerp, prog } from './lib.js';

/** Bóc cỡ chữ (px) từ chuỗi font CSS.
 *  parseFloat('700 46px "Archivo"') trả về 700 — trọng lượng, KHÔNG phải cỡ.
 *  Lỗi này từng làm lineH sai 15 lần và tường chữ trôi khỏi khung. */
export const fontPx = f => parseFloat((String(f).match(/(\d+(?:\.\d+)?)px/) || [0, 54])[1]);

/**
 * Chữ uốn quanh một CUNG TRÒN. Là viên gạch của mọi vật thể tròn làm bằng chữ.
 *
 * @param text   chuỗi cần uốn
 * @param cx,cy  tâm vòng
 * @param r      bán kính (tính tới đường chân chữ)
 * @param a0     góc bắt đầu, radian (0 = hướng 3 giờ, tăng theo chiều kim)
 * @param opts.reveal  0→1: hiện dần theo chu vi (dùng để "vẽ" vòng chữ ra)
 * @param opts.flip    true: chữ quay đầu vào tâm (dùng cho vòng ngoài)
 * @returns góc kết thúc — nối được nhiều đoạn liên tiếp
 */
export function arcText(g, text, cx, cy, r, a0, {
  font = '700 40px "Archivo"', color = '#e8e4da', alpha = 1,
  reveal = 1, flip = false, spacing = 1,
} = {}) {
  if (!text || alpha <= 0.004 || r <= 0) return a0;
  g.save();
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.globalAlpha = alpha;
  g.fillStyle = color;

  const n = Math.ceil(text.length * clamp(reveal));
  let a = a0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const w = g.measureText(ch).width * spacing;
    const da = w / r;                       // cung mà ký tự này chiếm
    const am = a + da / 2;                  // góc giữa ký tự
    if (i < n) {
      g.save();
      g.translate(cx + Math.cos(am) * r, cy + Math.sin(am) * r);
      // chữ dựng đứng theo phương bán kính
      g.rotate(am + (flip ? -Math.PI / 2 : Math.PI / 2));
      g.fillText(ch, 0, 0);
      g.restore();
    }
    a += da;
  }
  g.restore();
  return a;
}

/**
 * VẬT THỂ TRÒN DỰNG BẰNG CHỮ — "mặt trời" của video mẫu.
 *
 * Nhiều vòng đồng tâm, mỗi vòng lặp lại `text`, quay chậm và ngược chiều nhau
 * để lớp trong/lớp ngoài tách bạch. Tuỳ chọn `rays` thêm tia hướng tâm cũng
 * làm bằng chữ.
 *
 * @param rings  số vòng đồng tâm
 * @param spin   radian/giây của vòng trong cùng (vòng ngoài chậm hơn, ngược chiều)
 * @param grow   0→1: vòng nở ra từ tâm; dùng prog() bám mốc hát
 */
export function textOrb(g, text, cx, cy, r, t, {
  rings = 3, gap = 46, font = '700 40px "Archivo"',
  color = '#d4a017', colorHot = '#ffc94d', alpha = 1,
  spin = 0.22, grow = 1, rays = 0, rayLen = 0.55, reveal = 1,
} = {}) {
  if (alpha <= 0.004) return;
  const k = clamp(grow);
  if (k <= 0) return;

  // Tia hướng tâm vẽ TRƯỚC để vòng chữ nằm đè lên.
  if (rays > 0) {
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * Math.PI * 2 + t * spin * 0.5;
      const r0 = r * k * 1.05, r1 = r * k * (1 + rayLen);
      // độ dài tia so le nhưng TẤT ĐỊNH
      const len = lerp(r0, r1, 0.45 + hash(i * 3.7) * 0.55);
      g.save();
      g.globalAlpha = alpha * 0.75;
      g.translate(cx, cy);
      g.rotate(a);
      g.font = font;
      g.textBaseline = 'middle';
      g.textAlign = 'left';
      g.fillStyle = i % 3 === 0 ? colorHot : color;
      // chữ chạy dọc tia, cắt cho vừa độ dài
      const chars = Math.max(1, Math.round((len - r0) / (g.measureText('M').width * 1.05)));
      g.fillText(text.repeat(Math.ceil(chars / text.length)).slice(0, chars), r0, 0);
      g.restore();
    }
  }

  for (let ring = 0; ring < rings; ring++) {
    const rr = (r - ring * gap) * k;
    if (rr <= 8) continue;
    const dir = ring % 2 === 0 ? 1 : -1;            // vòng kề nhau quay ngược
    const speed = spin * (1 - ring * 0.22) * dir;
    const a0 = t * speed + ring * 0.7;
    // Lặp chuỗi cho VỪA KHÍT chu vi. Làm tròn LÊN thì phần dư quấn chồng lên
    // đoạn đầu -> chữ đè nhau thành vệt rối. Làm tròn XUỐNG rồi giãn nhẹ
    // spacing để phần thiếu được chia đều cho mọi ký tự.
    g.save(); g.font = font;
    const per = g.measureText(text) .width;
    g.restore();
    const circ = 2 * Math.PI * rr;
    const times = Math.max(1, Math.floor(circ / Math.max(1, per)));
    const sp = circ / (times * per);            // ≥1: giãn cho kín vòng
    arcText(g, text.repeat(times), cx, cy, rr, a0, {
      font, alpha: alpha * (ring === 0 ? 1 : 0.82 - ring * 0.12),
      color: ring === 0 ? colorHot : color,
      reveal, flip: ring % 2 === 1, spacing: sp,
    });
  }
}

/**
 * BỨC TƯỜNG CHỮ — chữ thành kiến trúc không gian (video mẫu: tường chữ Hán).
 *
 * Lưới chữ phủ kín vùng, trôi chậm theo một hướng. Dùng làm lớp chuyển động
 * LỚN ở nền: đây chính là thứ nền trên của tôi còn thiếu.
 *
 * @param drift  px/giây theo trục x (âm = sang trái)
 */
export function textWall(g, text, x, y, w, h, t, {
  font = '700 54px "Archivo"', color = '#d4a017', alpha = 0.16,
  drift = -38, rowGap = 1.35, tilt = 0,
} = {}) {
  if (alpha <= 0.004 || !text) return;
  g.save();
  g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.font = font;
  g.textBaseline = 'middle';
  g.textAlign = 'left';
  g.globalAlpha = alpha;
  g.fillStyle = color;
  if (tilt) { g.translate(x + w / 2, y + h / 2); g.rotate(tilt); g.translate(-(x + w / 2), -(y + h / 2)); }

  const m = g.measureText(text + '  ').width;
  // parseFloat('700 46px ...') = 700, KHÔNG phải cỡ chữ. Phải bóc đúng số px,
  // nếu không lineH sai 15 lần và tường chữ trôi hết khỏi vùng clip.
  const lineH = fontPx(font) * rowGap;
  const rows = Math.ceil(h / lineH) + 2;
  for (let r = -1; r < rows; r++) {
    const yy = y + lineH * 0.7 + r * lineH;
    // hàng lẻ trôi ngược -> mắt đọc ra chuyển động, không phải một khối trượt
    const dir = r % 2 === 0 ? 1 : -1;
    let off = ((t * drift * dir) % m + m) % m;
    for (let xx = x - off - m; xx < x + w + m; xx += m) {
      g.fillText(text + '  ', xx, yy);
    }
  }
  g.restore();
}

/**
 * CHỮ TAN THÀNH HẠT khi hết lượt (video mẫu: dòng cũ phân rã thành cột chấm).
 *
 * Vẽ chuỗi lên canvas phụ, đọc pixel, rồi thả từng điểm rơi xuống. `k` 0→1.
 * Canvas phụ được cache theo (text, font, màu) — đọc pixel mỗi khung quá đắt.
 */
export function textDissolve(g, text, x, y, t, k, {
  font = '900 120px "Archivo"', color = '#e8e4da', alpha = 1,
  step = 5, fall = 240, spread = 46, align = 'left',
} = {}) {
  const kk = clamp(k);
  if (alpha <= 0.004 || !text) return;
  if (kk <= 0) {                       // chưa tan: vẽ chữ bình thường
    g.save(); g.font = font; g.textAlign = align; g.textBaseline = 'alphabetic';
    g.globalAlpha = alpha; g.fillStyle = color; g.fillText(text, x, y); g.restore();
    return;
  }

  textDissolve._c ||= {};
  const key = `${text}|${font}|${step}`;
  let pts = textDissolve._c[key];
  if (!pts) {
    const cv = document.createElement('canvas');
    const gg = cv.getContext('2d', { willReadFrequently: true });
    gg.font = font;
    const m = gg.measureText(text);
    const pad = 20;
    const cw = Math.ceil(m.width) + pad * 2;
    const asc = Math.ceil(m.actualBoundingBoxAscent || fontPx(font));
    const dsc = Math.ceil(m.actualBoundingBoxDescent || 20);
    cv.width = cw; cv.height = asc + dsc + pad * 2;
    gg.font = font; gg.textBaseline = 'alphabetic'; gg.fillStyle = '#fff';
    gg.fillText(text, pad, pad + asc);
    const d = gg.getImageData(0, 0, cv.width, cv.height).data;
    pts = [];
    for (let py = 0; py < cv.height; py += step) {
      for (let px = 0; px < cv.width; px += step) {
        if (d[(py * cv.width + px) * 4 + 3] > 128) {
          pts.push([px - pad, py - pad - asc]);   // gốc = điểm neo chữ
        }
      }
    }
    pts.w = m.width;
    textDissolve._c[key] = pts;
  }

  const ox = align === 'center' ? -pts.w / 2 : align === 'right' ? -pts.w : 0;
  // Chữ phải ĐỌC ĐƯỢC rồi mới rã. Đường cong tuyến tính làm 48% hạt rời chỗ
  // ngay ở k=0.30 — người xem chưa kịp đọc. Mũ 2.2 giữ chữ gần nguyên tới
  // k≈0.45 rồi rã dứt khoát, đúng cách video mẫu làm.
  const kEff = Math.pow(kk, 2.2);
  g.save();
  g.fillStyle = color;
  for (let i = 0; i < pts.length; i++) {
    const d0 = hash(i * 2.3) * 0.42;                 // hạt rơi so le
    const kp = clamp((kEff - d0) / (1 - d0 + 1e-6));
    if (kp <= 0) {
      g.globalAlpha = alpha;
      g.fillRect(x + ox + pts[i][0], y + pts[i][1], step, step);
      continue;
    }
    const e = kp * kp;                               // rơi nhanh dần
    const dx = (hash(i * 5.1) - 0.5) * spread * kp;
    g.globalAlpha = alpha * (1 - kp);
    g.fillRect(x + ox + pts[i][0] + dx, y + pts[i][1] + e * fall, step, step);
  }
  g.restore();
}

/**
 * CHỮ TRÊN MẶT PHẲNG 3D NGHIÊNG — chữ của tôi trước giờ luôn phẳng 2D.
 *
 * Chiếu phối cảnh giả: mỗi dòng đặt ở một "độ sâu" z, dòng xa thì nhỏ và
 * dịch về điểm tụ. Chuyển động theo z tạo cảm giác bay xuyên qua chữ.
 *
 * @param lines  mảng chuỗi, phần tử [0] ở gần nhất
 * @param z      0→1 vị trí camera; tăng dần = bay tới
 */
export function textPlane(g, lines, cx, cy, t, z, {
  font = '900 96px "Archivo"', color = '#e8e4da', alpha = 1,
  depth = 0.34, vanishY = -0.55, spacing = 150,
} = {}) {
  if (alpha <= 0.004 || !lines || !lines.length) return;
  g.save();
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (let i = lines.length - 1; i >= 0; i--) {       // vẽ xa trước
    const d = i - (z % 1) + 1;                        // độ sâu hiện tại
    if (d <= 0.05) continue;
    const s = 1 / (1 + d * depth);                    // tỉ lệ phối cảnh
    // Dòng xa co về ĐIỂM TỤ quanh cy. Cộng dồn i*spacing sẽ đẩy cả khối
    // xuống đáy khung (lỗi cũ: chữ nằm lệch hẳn khỏi tâm ô).
    const yy = cy + (d - 1) * spacing * s + vanishY * spacing * (1 - s);
    const a = alpha * clamp(1.15 - d * 0.30) * clamp(d * 2.2);
    if (a <= 0.01) continue;
    g.save();
    g.globalAlpha = a;
    g.fillStyle = color;
    g.translate(cx, yy);
    g.scale(s, s);
    g.fillText(lines[i], 0, 0);
    g.restore();
  }
  g.restore();
}
