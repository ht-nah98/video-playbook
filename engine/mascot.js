// Mascot — nhiều chất liệu, MỘT nguồn ảnh PNG:
//   draw()      PNG đặc + viền navy + bóng → khi cần nhân vật RÕ (cao trào)
//   mosaic()    lưới ký hiệu toán          → khi nhân vật HIỆN RA / TAN ĐI
//   sweep()     vệt sáng quét trên silhouette
//   shatter()   vỡ thành hạt rồi tụ lại    → lời nói về PHÁ / DỰNG
//   frame()     khung chứa quanh nhân vật  → lời đổi CHỦ ĐỀ
//   chalk()     nét phấn, không phải PNG   → lời nói về VẼ TAY / NHÁP
//   mirror()    bóng phản chiếu dưới chân  → tạo chiều sâu, nền dưới
//
// LUẬT TỶ LỆ của 99-intro (projects/mv/99-intro/DNA.md §3): PNG đặc khi ĐỨNG (~75%). MỌI lần vào/ra đi
// qua một chuyển chất liệu — mosaic hiện ra / tan đi (~25%), không cắt cứng.
// Ngoài vào/ra, các chất liệu khác là SỰ KIỆN kể chuyện.
//
// MỖI hàm dưới đây phải phục vụ một CÂU LỜI cụ thể. Không thêm hiệu ứng
// chỉ vì nó đẹp — đó chính là lỗi đã làm bản v2 bị bác bỏ.
// Ở v2 mascot chìm vì XUNG ĐỘT MÀU với nền hạt vàng, không phải vì mosaic.
// Nền v3 là navy sạch nên mosaic đọc rõ — đó là cách nhân vật "thuộc về" thế
// giới ký hiệu toán thay vì là sticker dán lên.
import { C, clamp, prog, hash, lerp, smooth, outCubic } from './lib.js';
import { sampleGrid, stretch, drawMosaic, gridToPoints } from './mosaic.js';

export const POSES_V1 = ['wave','point','thumb','shrug','think','chalk'];
export const POSES_V2 = ['wave','point','crossed','thumb','startled','slump','angry','jump'];
// Bộ khung trung 2026-10-01 (cắt ở giữa đùi): đặt sát mép dưới khung hoặc crop góc.
export const POSES_V2_MID = ['notebook','offer','stand','pointer','pockets','pockets2','invite','tea',
                             'ponder','sky','down','halt','chalk'];

/**
 * Chép ảnh sang canvas CPU một lần khi nạp. Lý do (đã đo, 2026-09-30): drawImage-thu-nhỏ một <img>
 * cho pixel khác nhau tuỳ ảnh đã từng được vẽ lên canvas GPU hay chưa (trạng thái giải mã của Chrome),
 * nên lưới ký hiệu dựng lần đầu phụ thuộc thứ tự khung → ảnh chụp lẻ ≠ render tuần tự.
 */
export function toCanvas(im) {
  const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
  c.getContext('2d', { willReadFrequently: true }).drawImage(im, 0, 0);
  return c;
}

export class Mascot {
  async load(base = '../../assets/character/cut', poses = POSES_V1) {
    this.im = {};
    await Promise.all(poses.map(p => new Promise(res => {
      const im = new Image();
      im.onload = () => { this.im[p] = toCanvas(im); res(); };
      im.onerror = () => { console.warn(`mascot: thiếu ${base}/pose-${p}.png`); res(); };
      im.src = `${base}/pose-${p}.png`;
    })));
    // canvas phụ để dựng viền silhouette
    this.buf = document.createElement('canvas');
    this.bufG = this.buf.getContext('2d');
    return this;
  }

  /**
   * Vẽ mascot với viền + bóng.
   * @param x,y  toạ độ CHÂN nhân vật (đáy, tâm ngang)
   * @param hpx  chiều cao mong muốn tính bằng px
   */
  draw(g, pose, x, y, hpx, { alpha = 1, ring = 4, shadow = true, flip = false,
                             ringColor = null } = {}) {
    const im = this.im[pose];
    if (!im) return;
    const w = im.width * (hpx / im.height), h = hpx;
    const x0 = x - w/2, y0 = y - h;

    // --- bóng tối phía sau khối nhân vật: tách khỏi nền sáng ---
    if (shadow) {
      g.save();
      g.globalAlpha = alpha * (ringColor ? 0.22 : 0.5);
      g.filter = 'blur(26px)';
      g.fillStyle = ringColor ? '#6b5a3a' : '#000008';
      g.beginPath();
      g.ellipse(x, y - h*0.46, w*0.42, h*0.48, 0, 0, Math.PI*2);
      g.fill();
      g.restore();
    }

    // --- viền navy quanh silhouette: vẽ ảnh lệch 8 hướng, tô đè màu nền ---
    if (ring > 0) {
      const bw = Math.ceil(w) + ring*2, bh = Math.ceil(h) + ring*2;
      if (this.buf.width !== bw || this.buf.height !== bh) {
        this.buf.width = bw; this.buf.height = bh;
      }
      const b = this.bufG;
      b.clearRect(0, 0, bw, bh);
      for (let a = 0; a < 8; a++) {
        const an = a / 8 * Math.PI * 2;
        b.drawImage(im, ring + Math.cos(an)*ring, ring + Math.sin(an)*ring, w, h);
      }
      b.globalCompositeOperation = 'source-in';
      b.fillStyle = ringColor || C.navy;
      b.fillRect(0, 0, bw, bh);
      b.globalCompositeOperation = 'source-over';
      g.save();
      g.globalAlpha = alpha;
      g.drawImage(this.buf, x0 - ring, y0 - ring);
      g.restore();
    }

    g.save();
    g.globalAlpha = clamp(alpha, 0, 1);
    if (flip) { g.translate(x*2, 0); g.scale(-1, 1); }
    g.drawImage(im, x0, y0, w, h);
    g.restore();
  }

  /**
   * Vệt sáng quét chéo CHỈ TRÊN silhouette (không phải trên hộp bao).
   * Dựng trên canvas phụ: vẽ gradient rồi `destination-in` với chính ảnh,
   * nên mọi pixel trong suốt của PNG vẫn trong suốt.
   */
  sweep(g, pose, x, y, hpx, k, { color = '255,201,77', strength = 0.42 } = {}) {
    const im = this.im[pose];
    if (!im || k <= 0 || k >= 1) return;
    const w = im.width * (hpx / im.height), h = hpx;
    const x0 = x - w/2, y0 = y - h;
    if (!this.sbuf) {
      this.sbuf = document.createElement('canvas');
      this.sbufG = this.sbuf.getContext('2d');
    }
    const bw = Math.ceil(w), bh = Math.ceil(h);
    if (this.sbuf.width !== bw || this.sbuf.height !== bh) {
      this.sbuf.width = bw; this.sbuf.height = bh;
    }
    const b = this.sbufG;
    b.clearRect(0, 0, bw, bh);
    const bx = -bw * 0.8 + k * (bw * 2.2);
    const grad = b.createLinearGradient(bx - 70, 0, bx + 70, bh);
    grad.addColorStop(0,   `rgba(${color},0)`);
    grad.addColorStop(0.5, `rgba(${color},${strength})`);
    grad.addColorStop(1,   `rgba(${color},0)`);
    b.fillStyle = grad;
    b.fillRect(0, 0, bw, bh);
    b.globalCompositeOperation = 'destination-in';
    b.drawImage(im, 0, 0, bw, bh);
    b.globalCompositeOperation = 'source-over';
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.drawImage(this.sbuf, x0, y0);
    g.restore();
  }

  /** Lưới ký hiệu toán cho một pose (dựng một lần, dùng lại). */
  /**
   * Lưới ký hiệu cho một pose, LẤY MẪU THEO hpx THẬT.
   *
   * Lỗi cũ: lưới luôn dựng ở h=420 cố định, nên số hàng cố định và ô chữ co
   * giãn theo hpx — `cell` không còn là px logic như tài liệu nói. P4 dùng
   * hpx=432 (gần 420) nên tình cờ đúng; mọi kích thước khác đều sai cỡ chữ.
   * Nay lưới dựng theo hpx (làm tròn bậc 60px để còn dùng lại được cache).
   */
  grid(pose, cell = 9, hpx = 420) {
    this._g ||= {};
    const h = Math.max(120, Math.round(hpx / 60) * 60);
    const k = pose + ':' + cell + ':' + h;
    if (this._g[k]) return this._g[k];
    const im = this.im[pose];
    if (!im) return null;
    const w = Math.round(im.width * (h / im.height));
    this._g[k] = stretch(sampleGrid(im, w, h, cell), { gain: 1.2, lift: 0.50 });
    return this._g[k];
  }

  /**
   * Mascot dựng bằng ký hiệu toán. `reveal` 0→1: hiện dần từ dưới lên;
   * dùng ngược lại để nhân vật TAN ĐI thành ký hiệu.
   */
  mosaic(g, pose, x, y, hpx, { alpha = 1, reveal = 1, t = 0, cell = 9, colorMode = 'gold' } = {}) {
    const gr = this.grid(pose, cell, hpx);
    const im = this.im[pose];
    if (!gr || !im || alpha <= 0.004) return;
    const w = im.width * (hpx / im.height);
    // drawMosaic nhận TÂM-ĐÁY y hệt draw() — nó tự trừ w/2 và hpx bên trong.
    // Trừ sẵn ở đây là trừ HAI LẦN (lỗi cũ: mascot bay lên góc trên phải).
    drawMosaic(g, gr, x, y, w, hpx, {
      color: C.gold, color2: C.goldHot, alpha, reveal, t, colorMode,
    });
  }

  /** Đám hạt cho một pose (dựng một lần, dùng lại). Toạ độ tương đối tâm. */
  points(pose, cell = 11) {
    this._p ||= {};
    const k = pose + ':' + cell;
    if (this._p[k]) return this._p[k];
    const gr = this.grid(pose, cell, 420);   // hạt: lưới cố định là đủ
    if (!gr) return null;
    // Khung chuẩn hoá 1x1: cảnh scale theo hpx lúc vẽ.
    this._p[k] = gridToPoints(gr, 1, 1, { aMin: 0.30, lumMin: 0.05 });
    return this._p[k];
  }

  /**
   * VỠ THÀNH HẠT rồi TỤ LẠI. Dành cho lời nói về phá / dựng lại
   * ("break it down", "build it from the ground").
   *
   * @param k  0 = nguyên hình, 1 = tan hết.
   *           Cho k chạy 0→1 là VỠ RA; 1→0 là TỤ LẠI thành người.
   * @param dir hướng bay: 'out' toả đều, 'down' rơi xuống, 'up' bốc lên.
   *
   * Mỗi hạt có hướng + độ trễ riêng lấy từ hash(chỉ số) — TẤT ĐỊNH, không
   * dùng Math.random (AGENTS.md luật 2: khung phải là hàm thuần của t).
   */
  shatter(g, pose, x, y, hpx, k, { alpha = 1, dir = 'out', spread = 0.9,
                                   size = 6.0, color = null, cell = 7 } = {}) {
    const P = this.points(pose, cell);
    const im = this.im[pose];
    if (!P || !im || alpha <= 0.004) return;
    const w = im.width * (hpx / im.height);
    const cx = x, cy = y - hpx / 2;
    const kk = clamp(k);
    g.save();
    g.globalAlpha = alpha;
    for (let i = 0; i < P.pts.length; i++) {
      // Độ trễ so le: hạt dưới chân đi trước khi rơi, hạt trên đi trước khi bốc.
      const d0 = hash(i * 1.7) * 0.55;   // so le: hạt đi lệch nhau
      const kp = clamp((kk - d0) / (1 - d0 + 1e-6));
      if (kp <= 0 && kk > 0) continue;           // chưa tới lượt → vẫn ở chỗ cũ
      const px = P.pts[i][0] * w, py = -P.pts[i][1] * hpx;
      const an = hash(i * 3.1) * Math.PI * 2;
      const mag = (0.35 + hash(i * 5.3) * 0.65) * spread * hpx;
      let vx = Math.cos(an) * mag, vy = Math.sin(an) * mag;
      if (dir === 'down') { vx *= 0.5; vy = Math.abs(vy) * 1.5; }
      if (dir === 'up')   { vx *= 0.5; vy = -Math.abs(vy) * 1.5; }
      const e = outCubic(kp);
      const fx = cx + px + vx * e;
      const fy = cy + py + vy * e + (dir === 'out' ? e * e * hpx * 0.18 : 0);
      const a = Math.pow(1 - kp, 0.55) * alpha;  // giữ sáng lâu, tắt nhanh ở cuối
      if (a <= 0.01) continue;
      const c = color || P.cols[i];
      g.globalAlpha = a;
      g.fillStyle = color || `rgb(${(c[0]*255)|0},${(c[1]*255)|0},${(c[2]*255)|0})`;
      const s = size * (1 - kp * 0.35);
      g.fillRect(fx - s/2, fy - s/2, s, s);
    }
    g.restore();
  }

  /**
   * KHUNG CHỨA quanh nhân vật — đổi theo NGHĨA của câu đang hát.
   * Video mẫu đổi khung mỗi khi lời chuyển ý; đây là cách nói "giờ đang bàn
   * chuyện khác" mà không cần cắt cảnh.
   *
   * @param shape 'circle' | 'square' | 'bracket' | 'grid'
   * @param k     0→1 khung được vẽ ra (theo chu vi)
   */
  frame(g, x, y, hpx, k, { shape = 'circle', color = C.teal, lw = 3,
                           alpha = 1, pad = 1.16 } = {}) {
    const kk = clamp(k);
    if (kk <= 0 || alpha <= 0.004) return;
    const r = hpx * 0.5 * pad, cx = x, cy = y - hpx / 2;
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = color;
    g.lineWidth = lw;
    g.lineCap = 'round';
    g.beginPath();
    if (shape === 'circle') {
      g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + kk * Math.PI * 2);
    } else if (shape === 'square') {
      const s = r * 0.94, x0 = cx - s, y0 = cy - s, per = s * 8, run = kk * per;
      const seg = [[x0, y0, 1, 0], [x0 + s*2, y0, 0, 1],
                   [x0 + s*2, y0 + s*2, -1, 0], [x0, y0 + s*2, 0, -1]];
      let left = run;
      g.moveTo(x0, y0);
      for (const [sx, sy, dx, dy] of seg) {
        const take = Math.min(left, s * 2);
        if (take <= 0) break;
        g.moveTo(sx, sy);
        g.lineTo(sx + dx * take, sy + dy * take);
        left -= take;
      }
    } else if (shape === 'bracket') {
      // Hai ngoặc vuông ôm hai bên — dùng khi nhân vật ĐANG ĐƯỢC TRÍCH DẪN.
      const s = r * 0.92, arm = s * 0.34 * kk;
      for (const sgn of [-1, 1]) {
        const bx = cx + sgn * s;
        g.moveTo(bx - sgn * arm, cy - s);
        g.lineTo(bx, cy - s);
        g.lineTo(bx, cy + s);
        g.lineTo(bx - sgn * arm, cy + s);
      }
    } else if (shape === 'grid') {
      // Lưới toạ độ: nhân vật đang đứng trong hệ quy chiếu.
      const s = r * 0.98, n = 4;
      for (let i = 0; i <= n; i++) {
        const f = clamp(kk * (n + 1) - i);
        if (f <= 0) break;
        const u = -s + (i / n) * s * 2;
        g.moveTo(cx + u, cy - s); g.lineTo(cx + u, cy - s + f * s * 2);
        g.moveTo(cx - s, cy + u); g.lineTo(cx - s + f * s * 2, cy + u);
      }
    }
    g.stroke();
    g.restore();
  }

  /**
   * NÉT PHẤN — nhân vật vẽ bằng viền sáng thay vì PNG đặc.
   * Dành cho lời nói về bản nháp / làm tay ("no tricks", "from scratch").
   * Dựng bằng chính silhouette: dilate rồi khoét ruột (`destination-out`),
   * nên luôn khớp đúng hình, không cần vector riêng.
   */
  /**
   * NÉT PHẤN — nhân vật vẽ bằng nét sáng trên nền tối, không phải PNG đặc.
   * Dành cho lời nói về bản nháp / làm tay ("no tricks", "from scratch").
   *
   * Chỉ lấy viền ngoài thì ruột rỗng hoàn toàn -> mất mặt, mất kính, mất tay
   * áo, nhìn như một cái bóng. Video mẫu GIỮ nét trong. Nên dựng hai phần:
   *   (a) viền ngoài  = (ảnh nở lw) trừ (ảnh gốc)
   *   (b) nét trong   = chính các pixel TỐI của ảnh (nét mực của bản vẽ)
   * rồi tô cả hai bằng cùng một màu phấn.
   */
  chalk(g, pose, x, y, hpx, { alpha = 1, color = C.gold, lw = 5,
                              flip = false, inkMax = 0.34 } = {}) {
    const im = this.im[pose];
    if (!im || alpha <= 0.004) return;
    const w = im.width * (hpx / im.height), h = hpx;
    const x0 = x - w / 2, y0 = y - h;
    const pad = Math.ceil(lw) + 2;
    const bw = Math.ceil(w) + pad * 2, bh = Math.ceil(h) + pad * 2;

    // Cache theo (pose, kích thước, độ dày): dựng lại mỗi khung sẽ tốn
    // getImageData 1 lần/khung — quá đắt ở 60fps.
    this._ck ||= {};
    const ckey = `${pose}:${bw}x${bh}:${lw}:${color}:${inkMax}`;
    let cv = this._ck[ckey];
    if (!cv) {
      cv = document.createElement('canvas');
      cv.width = bw; cv.height = bh;
      const b = cv.getContext('2d', { willReadFrequently: true });

      // (a) viền ngoài: nở 12 hướng rồi khoét đúng ảnh gốc
      for (let a = 0; a < 12; a++) {
        const an = a / 12 * Math.PI * 2;
        b.drawImage(im, pad + Math.cos(an) * lw, pad + Math.sin(an) * lw, w, h);
      }
      b.globalCompositeOperation = 'destination-out';
      b.drawImage(im, pad, pad, w, h);
      b.globalCompositeOperation = 'source-over';

      // (b) nét trong: vẽ ảnh ra canvas phụ, giữ pixel TỐI (nét mực),
      //     bỏ pixel sáng (mảng màu). Đây là thứ giữ lại mặt và kính.
      const ink = document.createElement('canvas');
      ink.width = bw; ink.height = bh;
      const ig = ink.getContext('2d', { willReadFrequently: true });
      ig.drawImage(im, pad, pad, w, h);
      const d = ig.getImageData(0, 0, bw, bh);
      const px = d.data;
      // Giữ BIÊN, không giữ cả mảng tối. Lấy nguyên vùng lum<inkMax sẽ biến
      // tóc và áo khoác thành khối đặc -> ra hình bóng tô màu, không phải nét.
      // Nét vẽ = nơi độ sáng ĐỔI ĐỘT NGỘT giữa hai pixel cạnh nhau.
      const lum = new Float32Array(bw * bh);
      for (let i = 0, j = 0; i < px.length; i += 4, j++) {
        lum[j] = px[i+3] > 200
          ? (0.2126 * px[i] + 0.7152 * px[i+1] + 0.0722 * px[i+2]) / 255
          : -1;                               // ngoài thân: đánh dấu riêng
      }
      const EDGE = 0.20;                      // chênh lệch đủ để coi là nét
      for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
          const j = y * bw + x, i = j * 4;
          const v = lum[j];
          if (v < 0) { px[i+3] = 0; continue; }
          let edge = 0;
          if (x + 1 < bw) { const u = lum[j+1];  if (u >= 0 && Math.abs(u - v) > EDGE) edge = 1; }
          if (!edge && y + 1 < bh) { const u = lum[j+bw]; if (u >= 0 && Math.abs(u - v) > EDGE) edge = 1; }
          // nét mực rất tối (viền vẽ tay) luôn được giữ
          px[i+3] = (edge || v < inkMax * 0.45) ? 255 : 0;
        }
      }
      ig.putImageData(d, 0, 0);
      b.drawImage(ink, 0, 0);

      // tô toàn bộ (viền + nét) bằng màu phấn
      b.globalCompositeOperation = 'source-in';
      b.fillStyle = color;
      b.fillRect(0, 0, bw, bh);
      b.globalCompositeOperation = 'source-over';
      this._ck[ckey] = cv;
    }

    g.save();
    g.globalAlpha = alpha;
    if (flip) { g.translate(x * 2, 0); g.scale(-1, 1); }
    g.drawImage(cv, x0 - pad, y0 - pad);
    g.restore();
  }

  /**
   * BÓNG PHẢN CHIẾU dưới chân — lật dọc, mờ dần, hơi nhoè.
   * Video mẫu đặt mọi thứ trên mặt phản chiếu; đây là thứ tạo chiều sâu
   * tức thì và là lớp chuyển động lớn ở nửa dưới khung.
   */
  mirror(g, pose, x, y, hpx, { alpha = 0.3, squash = 0.55, gap = 4,
                               blur = 5 } = {}) {
    const im = this.im[pose];
    if (!im || alpha <= 0.004) return;
    const w = im.width * (hpx / im.height);
    g.save();
    g.globalAlpha = alpha;
    if (blur) g.filter = `blur(${blur}px)`;
    // Lật quanh đường chân: sau scale(1,-1) trục y hướng LÊN, nên vẽ ảnh tại
    // y=0..-hpx thì nó đổ XUỐNG dưới chân. Vẽ tại 0..+hpx sẽ phủ lên thân.
    g.translate(0, y + gap);
    g.scale(1, -squash);
    g.drawImage(im, x - w / 2, -hpx, w, hpx);
    g.restore();
  }

}
