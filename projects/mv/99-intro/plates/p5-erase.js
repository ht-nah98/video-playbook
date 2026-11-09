// P5 "Không mẹo, không đoán, có mặt đất" · 13.47 → 15.59s
// "No tricks, no guessing, build it from the ground."
// Ba động tác, mỗi cái rơi đúng beat:
//   (a) đường dựng phụ KHÔNG bị xoá mà sáng bừng lên  — không giấu gì
//   (b) ba mũi tên phỏng đoán bị gạch chéo            — không đoán mò
//   (c) một đường ngang được kẻ, mọi thứ rơi xuống đáp lên nó — mặt đất
// Xem docs/TREATMENT.md § P5.
import { C, H, W, clamp, inOutCubic, lerp, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, beat } from '../song.js';
import { guide, guideCircle, point, label, inkColor, mix } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

// ---- mốc thời gian: NEO VÀO GIỌNG THẬT (vox.VOX trong lib.js) ----
// Đo bằng STFT hop=128 trên dải 300–3400Hz. Bản trước neo vào lưới beat và
// lệch so với lời hát; giờ mỗi động tác rơi đúng lúc từ đó được hát.
const A0 = P.erase;            // 13.19  vox.VOX[26] "No tricks"
const FLARE = 12.81;           //        đỉnh sáng của phần nháp
const B0 = 13.51;              //        vox.VOX[27] "no guessing" — mũi tên bắn ra
const X1 = 13.67;              //        gạch chéo 1
const X2 = 13.75;              //        gạch chéo 2
const X3 = 13.84;              //        gạch chéo 3
const C0 = 13.89;              //        "build it from the" — kẻ đường ngang
const C1 = 14.11;              //        kẻ xong TRƯỚC khi vật rơi
const GROUND = 14.13;          //        "ground": mọi thứ rơi (kịp đáp trước 15.19)
const LAND = 14.32;            //        chạm đất, còn 0.07s lặng trước cú cắt
const END = P.question;        // 15.19 -> cảnh sau tiếp quản

// ---- hình học kế thừa từ P4: vòng tròn ⊙(A, AB) ----
const CX = W * 0.30, CY = H * 0.355, R = 210;
const GY = H * 0.732;            // cao độ mặt đất = cao độ đầu phấn
const GX0 = 150, GX1 = W - 150;  // hai đầu đường ngang

// Ba phỏng đoán: hướng (rad) + độ dài
const GUESSES = [
  { a: -Math.PI * 0.80, len: 315, t: X1 },   // lên trái
  { a: -Math.PI * 0.12, len: 355, t: X2 },   // sang phải, hơi chếch lên
  { a:  Math.PI * 0.30, len: 300, t: X3 },   // xuống phải
];

export default class P5 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
  }

  /** Rung khung — CHỈ khi vòng tròn thật sự chạm mặt đất. */
  shake(t) {
    if (t < LAND || t >= LAND + 0.30) return [0, 0];
    const k = 1 - prog(t, LAND, LAND + 0.30);
    const d = k * k * 15;
    return [Math.sin((t - LAND) * 205) * d * 0.55, Math.cos((t - LAND) * 168) * d];
  }

  /** Độ rơi của cụm hình học: 0 = chỗ cũ, 1 = đã đáp + nảy xong. */
  fallY(t) {
    if (t < GROUND) return 0;
    const drop = GY - R - CY;                    // đáy vòng tròn chạm GY
    if (t < LAND) return drop * prog(t, GROUND, LAND, x => x * x);
    // nảy một cái rồi đứng yên
    const k = prog(t, LAND, LAND + 0.26);
    return drop - Math.sin(k * Math.PI) * 26 * (1 - k);
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t < A0 || t >= END) return;

    const [sx, sy] = this.shake(t);
    const dy = this.fallY(t);
    const pen = this.penX(t);      // đầu bút của đường ngang (x, hoặc null)

    g.save();
    g.translate(sx, sy);

    this.drawScrap(g, t, dy);
    this.drawCircle(g, t, dy);
    this.drawGuesses(g, t, dy);
    this.drawGround(g, t, pen);
    this.drawStamps(g, t);

    g.restore();

    this.drawMascot(g, t, pen, sx, sy);
  }

  /** x của đầu phấn khi đang kẻ đường ngang; null khi chưa kẻ / kẻ xong. */
  penX(t) {
    if (t < C0) return null;
    const p = prog(t, C0, C1, inOutCubic);
    if (p >= 1) return null;
    return lerp(GX0, GX1, p);
  }

  // ------------------------------------------------------------------
  // (a) "No tricks" — TOÀN BỘ phần nháp sáng bừng lên rồi mờ về
  // ------------------------------------------------------------------
  /** 0 → 1 → 0.28 : đường phụ bùng sáng thành bone đặc trong 0.2s. */
  flare(t) {
    if (t < A0) return 0;
    if (t < FLARE) return prog(t, A0, FLARE, outExpo);
    // giữ nguyên đỉnh suốt cụm từ "no tricks" — mời xem cho kỹ
    if (t < B0 - 0.06) return 1;
    return lerp(1, 0.30, prog(t, B0 - 0.06, B0 + 0.30, outCubic));
  }

  /**
   * Phần nháp của một dựng hình thước-compa: hai tâm A, B, các bán kính,
   * hai cung dựng cắt nhau, đường trung trực. Vẽ bằng guide() khi mờ;
   * khi flare cao thì vẽ đè một lớp bone ĐẶC — cùng hình, sáng lên.
   */
  drawScrap(g, t, dy) {
    const f = this.flare(t);
    if (f <= 0.01) return;
    // sau khi rơi, phần nháp tan đi: việc của nó xong rồi
    const gone = 1 - prog(t, GROUND, GROUND + 0.30);
    if (gone <= 0) return;

    const ax = CX, ay = CY + dy;               // tâm A
    const bx = CX + R, by = CY + dy;           // tâm B (trên vòng, AB = R)
    const mx = (ax + bx) / 2;
    const hh = Math.sqrt(3) / 2 * R;           // nửa dây của hai cung cắt nhau

    // --- lớp mờ nền: luôn có mặt, đây là construction lines thật ---
    const dim = gone * (0.55 + 0.45 * (1 - f));
    guideCircle(g, ax, ay, R, 1, { alpha: dim });
    guideCircle(g, bx, by, R, 1, { alpha: dim * 0.9 });
    guide(g, ax, ay, bx, by, 1, { alpha: dim });
    guide(g, mx, ay - hh - 60, mx, ay + hh + 60, 1, { alpha: dim });
    guide(g, ax, ay, mx, ay - hh, 1, { alpha: dim * 0.8 });
    guide(g, bx, by, mx, ay - hh, 1, { alpha: dim * 0.8 });
    guide(g, ax, ay, ax, ay - R, 1, { alpha: dim * 0.7 });

    // --- lớp sáng: CÙNG những đường đó, bone đặc, nét dày hơn ---
    if (f > 0.02) {
      g.save();
      g.globalAlpha = f * gone;
      g.strokeStyle = C.bone;
      g.lineWidth = 1.7;
      g.setLineDash([7, 9]);
      const seg = (x0, y0, x1, y1) => {
        g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      };
      g.beginPath(); g.arc(ax, ay, R, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.arc(bx, by, R, 0, Math.PI * 2); g.stroke();
      seg(ax, ay, bx, by);
      seg(mx, ay - hh - 60, mx, ay + hh + 60);
      seg(ax, ay, mx, ay - hh);
      seg(bx, by, mx, ay - hh);
      seg(ax, ay, ax, ay - R);
      g.restore();

      // tâm và giao điểm: chấm bone đặc + nhãn mono — "đây là phần nháp"
      const pts = [[ax, ay, 'A', -30, -24], [bx, by, 'B', 28, -24],
                   [mx, ay - hh, 'M', 26, -22], [mx, ay + hh, '', 0, 0]];
      g.save();
      g.globalAlpha = f * gone;
      for (const [px, py] of pts) {
        g.fillStyle = C.bone;
        g.beginPath(); g.arc(px, py, 3.4, 0, Math.PI * 2); g.fill();
      }
      g.restore();
      if (f > 0.5) {
        for (const [px, py, tx, ldx, ldy] of pts) {
          if (!tx) continue;
          label(g, px, py, tx, { dx: ldx, dy: ldy, size: 24, alpha: (f - 0.5) * 2 * gone });
        }
      }
      // ký hiệu vuông góc ở chân trung trực — nháp có cả chứng minh
      g.save();
      g.globalAlpha = f * gone * 0.9;
      g.strokeStyle = C.bone; g.lineWidth = 1.5; g.setLineDash([]);
      g.strokeRect(mx - 15, ay - 15, 15, 15);
      g.restore();
    }
  }

  // ------------------------------------------------------------------
  // vòng tròn ⊙(A, AB) — vật thể chính, nguội teal, rơi xuống mặt đất
  // ------------------------------------------------------------------
  drawCircle(g, t, dy) {
    const cy = CY + dy;
    g.save();
    g.lineWidth = 4.5;
    g.lineCap = 'round';
    // đã dựng xong ở P4 → teal; chớp gold-hot đúng lúc chạm đất
    const hit = t >= LAND && t < LAND + 0.14 ? 1 - prog(t, LAND, LAND + 0.14) : 0;
    g.strokeStyle = hit > 0 ? mix(C.teal, C.goldHot, hit * 0.75) : C.teal;
    g.beginPath(); g.arc(CX, cy, R, 0, Math.PI * 2); g.stroke();
    // tâm
    g.fillStyle = C.teal;
    g.beginPath(); g.arc(CX, cy, 4.5, 0, Math.PI * 2); g.fill();
    g.restore();

    if (t < GROUND) {
      label(g, CX + R * 0.71, cy - R * 0.71, '⊙(A, AB)',
            { dx: 30, dy: -26, size: 25, alpha: 0.9 * (1 - prog(t, C0, C0 + 0.3)) });
    }
  }

  // ------------------------------------------------------------------
  // (b) "no guessing" — ba mũi tên đứt nét bị gạch chéo theo 3 nhịp hạt
  // ------------------------------------------------------------------
  drawGuesses(g, t, dy) {
    if (t < B0) return;
    const cy = CY + dy;
    // sau nhịp gạch cuối, chúng tan trong 0.22s
    // tan dứt điểm TRƯỚC khi đầu bút xuất phát — khung sạch để kẻ đường
    const vanish = prog(t, X3 + 0.05, C0 + 0.02);
    if (vanish >= 1) return;

    for (let i = 0; i < GUESSES.length; i++) {
      const gs = GUESSES[i];
      const t0 = B0 + i * 0.075;
      const shoot = prog(t, t0, t0 + 0.20, outExpo);
      if (shoot <= 0) continue;
      const ca = Math.cos(gs.a), sa = Math.sin(gs.a);
      const x0 = CX + ca * R, y0 = cy + sa * R;
      const L = gs.len * shoot;
      const x1 = x0 + ca * L, y1 = y0 + sa * L;
      const alpha = (1 - vanish) * 0.95;
      const dead = t >= gs.t;

      // thân mũi tên: đứt nét, bone-dim (phỏng đoán = chưa chứng minh)
      g.save();
      g.globalAlpha = alpha * (dead ? 0.7 : 1);
      g.strokeStyle = C.boneDim;
      g.lineWidth = 2.2;
      g.setLineDash([11, 8]);
      g.lineCap = 'butt';
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      // đầu mũi tên
      g.setLineDash([]);
      g.lineWidth = 2.4;
      g.beginPath();
      for (const s of [1, -1]) {
        const b = gs.a + Math.PI + s * 0.34;
        g.moveTo(x1, y1); g.lineTo(x1 + Math.cos(b) * 20, y1 + Math.sin(b) * 20);
      }
      g.stroke();
      g.restore();

      // nhãn ở đầu mũi tên: `?` (mono) → `✗` (vẽ bằng hai nét, vì
      // IBM Plex Mono không có glyph này và sẽ rơi về font thay thế)
      const lx = x1 + ca * 32, ly = y1 + sa * 32;
      g.save();
      g.globalAlpha = alpha;
      if (!dead) {
        g.font = '500 32px "IBM Plex Mono", monospace';
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillStyle = C.bone;
        g.fillText('?', lx, ly);
      } else {
        const kx = prog(t, gs.t + 0.04, gs.t + 0.14, outCubic);
        const r2 = 11;
        g.strokeStyle = C.gold;
        g.lineWidth = 3.4;
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(lx - r2, ly - r2); g.lineTo(lx - r2 + 2*r2*kx, ly - r2 + 2*r2*kx);
        g.moveTo(lx + r2, ly - r2); g.lineTo(lx + r2 - 2*r2*kx, ly - r2 + 2*r2*kx);
        g.stroke();
      }
      g.restore();

      // nét gạch chéo gold: một nét NGẮN cắt ngang thân mũi tên,
      // kẻ trong 0.10s đúng trên nhịp hạt.
      if (dead) {
        const k = prog(t, gs.t, gs.t + 0.10, outCubic);
        const mxp = (x0 + x1) / 2, myp = (y0 + y1) / 2;
        // hướng nét gạch: xoay 55° so với mũi tên → đọc rõ là "gạch bỏ"
        const b = gs.a + Math.PI * 0.42;
        const half = 46;
        const sxp = mxp - Math.cos(b) * half, syp = myp - Math.sin(b) * half;
        const exp_ = mxp + Math.cos(b) * half, eyp = myp + Math.sin(b) * half;
        g.save();
        g.globalAlpha = alpha;
        g.lineCap = 'round';
        g.lineWidth = 5;
        g.strokeStyle = inkColor(t - gs.t);
        g.beginPath();
        g.moveTo(sxp, syp);
        g.lineTo(lerp(sxp, exp_, k), lerp(syp, eyp, k));
        g.stroke();
        g.restore();
        if (k < 1) point(g, lerp(sxp, exp_, k), lerp(syp, eyp, k), { r: 5, glow: 0.9 });
      }
    }
  }

  // ------------------------------------------------------------------
  // (c) "build it from the ground" — đường ngang = TRỤC SỐ
  // ------------------------------------------------------------------
  drawGround(g, t, pen) {
    if (t < C0) return;
    const p = prog(t, C0, C1, inOutCubic);
    const xEnd = lerp(GX0, GX1, p);
    const age = t - C1;                  // nguội về teal sau khi kẻ xong

    // thân đường: gold-hot ở đầu bút, nguội dần về phía sau
    g.save();
    g.lineCap = 'round';
    g.lineWidth = 5;
    const nSeg = 26;
    for (let i = 0; i < nSeg; i++) {
      const k0 = i / nSeg, k1 = (i + 1) / nSeg;
      const a = GX0 + (xEnd - GX0) * k0, b = GX0 + (xEnd - GX0) * k1;
      if (b - a < 0.4) continue;
      // tuổi của đoạn này = bao lâu kể từ lúc đầu bút đi qua
      const segAge = (t - C0) * (1 - k1) + Math.max(0, age) * k1;
      g.strokeStyle = inkColor(segAge);
      g.beginPath(); g.moveTo(a, GY); g.lineTo(b, GY); g.stroke();
    }
    g.restore();

    // vạch chia mono đều đặn — nó là một TRỤC SỐ, không phải gạch trang trí
    const STEP = 135;
    g.save();
    g.lineCap = 'butt';
    for (let x = GX0; x <= GX1 + 1; x += STEP) {
      if (x > xEnd) break;
      const i = Math.round((x - GX0) / STEP);
      const major = i % 2 === 0;
      const tickAge = Math.max(0, t - (C0 + (x - GX0) / (GX1 - GX0) * (C1 - C0)) - 0.05);
      const gr = prog(t, C0 + (x - GX0) / (GX1 - GX0) * (C1 - C0), 0, x => x);
      const h = major ? 17 : 10;
      g.globalAlpha = clamp(tickAge / 0.14) * 0.95;
      g.strokeStyle = inkColor(tickAge + 0.25);
      g.lineWidth = major ? 2.4 : 1.6;
      g.beginPath(); g.moveTo(x, GY - h); g.lineTo(x, GY + h); g.stroke();
      if (major && tickAge > 0.1) {
        g.globalAlpha = clamp((tickAge - 0.1) / 0.2) * 0.62;
        g.font = '400 20px "IBM Plex Mono", monospace';
        g.fillStyle = C.bone;
        g.textAlign = 'center'; g.textBaseline = 'top';
        g.fillText(String(i / 2), x, GY + 24);
      }
    }
    g.restore();

    // đầu bút gold-hot chạy dọc đường
    if (pen !== null) point(g, pen, GY, { r: 6.5, glow: 1.25 });

    // ---- "BUILD IT FROM THE GROUND" KHẮC DỌC THEO CHÍNH ĐƯỜNG ----
    // chữ nằm trên trục số: baseline chính là đường ngang, mỗi chữ cái
    // hiện ra khi đầu bút vừa chạy qua chỗ nó đứng.
    const S = 'BUILD IT FROM THE GROUND';
    g.save();
    g.font = '800 44px "Archivo"';
    g.textBaseline = 'alphabetic';
    g.textAlign = 'left';
    const tw = g.measureText(S).width;
    let x = W * 0.335;   // sau vòng tròn, trước vùng mascot
    for (const ch of S) {
      const cw = g.measureText(ch).width;
      const reach = clamp((xEnd - x) / 30);
      if (reach > 0) {
        // tuổi của chữ = kể từ lúc đầu bút qua nó
        const chAge = (t - C0) - ((x - GX0) / (GX1 - GX0)) * (C1 - C0);
        g.globalAlpha = reach * 0.98;
        g.fillStyle = inkColor(chAge + 0.1);
        g.fillText(ch, x, GY - 16);
      }
      x += cw;
      if (x > W - 320) break;
    }
    g.restore();
  }

  // ------------------------------------------------------------------
  // Chữ: NO TRICKS / NO GUESSING đóng như hai nhãn kiểm định (QC stamp)
  // ------------------------------------------------------------------
  drawStamps(g, t) {
    const RX = W - 120;                 // lề phải, an toàn 120px
    const items = [
      ['NO TRICKS', A0 + 0.05, H * 0.215],
      ['NO GUESSING', B0 + 0.04, H * 0.325],
    ];
    for (const [txt, t0, y] of items) {
      if (t < t0) continue;
      const k = prog(t, t0, t0 + 0.16, outExpo);
      g.save();
      g.font = '500 32px "IBM Plex Mono", monospace';
      g.textAlign = 'right'; g.textBaseline = 'middle';
      const tw = g.measureText(txt).width;
      const padX = 20, padY = 15;
      const x0 = RX - tw - padX, x1 = RX + padX;
      // đóng dấu: hơi to rồi co về, quay nhẹ — như con dấu cao su
      g.translate((x0 + x1) / 2, y);
      const s = lerp(1.22, 1, k);
      g.rotate((1 - k) * 0.05 - 0.018);
      g.scale(s, s);
      g.globalAlpha = k;
      const bw = (x1 - x0) / 2, bh = 27;
      // khung dấu nảy nhẹ theo beat — con dấu kiểm định vẫn "sống"
      g.strokeStyle = C.bone;
      g.lineWidth = 1.8 + beat.beatPulse(t, 0.10) * 0.9;
      g.strokeRect(-bw, -bh, bw * 2, bh * 2);
      // vạch cắt góc trái — dấu kiểm định, không phải hộp trang trí
      g.beginPath();
      g.moveTo(-bw, -bh + 13); g.lineTo(-bw + 13, -bh);
      g.stroke();
      g.fillStyle = C.bone;
      g.fillText(txt, bw - padX + 2, 1);
      g.restore();
    }
  }

  /**
   * Viền navy + bóng của mascot, dựng sẵn một lần vào canvas phụ.
   * Chỉ phụ thuộc (ảnh, chiều cao) nên trong cảnh này là hằng số —
   * dựng lại mỗi frame là toàn bộ chi phí render của cảnh (~28ms/frame).
   */
  plate(im, hpx) {
    if (!im) return null;
    const w = im.width * (hpx / im.height), h = hpx;
    if (this._plate && this._plate.h === h) return this._plate;
    const RING = 4, PAD = 60;                 // PAD chừa chỗ cho bóng blur
    const cv = document.createElement('canvas');
    cv.width = Math.ceil(w) + PAD * 2;
    cv.height = Math.ceil(h) + PAD * 2;
    const b = cv.getContext('2d');
    // bóng tối phía sau khối nhân vật
    b.save();
    b.globalAlpha = 0.5;
    b.filter = 'blur(26px)';
    b.fillStyle = '#000008';
    b.beginPath();
    b.ellipse(PAD + w / 2, PAD + h * 0.54, w * 0.42, h * 0.48, 0, 0, Math.PI * 2);
    b.fill();
    b.restore();
    // viền navy: vẽ ảnh lệch 8 hướng rồi tô đè màu nền
    const rb = document.createElement('canvas');
    rb.width = cv.width; rb.height = cv.height;
    const r = rb.getContext('2d');
    for (let a = 0; a < 8; a++) {
      const an = a / 8 * Math.PI * 2;
      r.drawImage(im, PAD + Math.cos(an) * RING, PAD + Math.sin(an) * RING, w, h);
    }
    r.globalCompositeOperation = 'source-in';
    r.fillStyle = C.navy;
    r.fillRect(0, 0, rb.width, rb.height);
    b.drawImage(rb, 0, 0);
    this._plate = { cv, pad: PAD, h };
    return this._plate;
  }

  // ------------------------------------------------------------------
  // MASCOT — pose chalk, ~32% khung, tay cầm phấn đi theo đầu bút
  // ------------------------------------------------------------------
  drawMascot(g, t, pen, sx, sy) {
    const MH = H * 0.335;                     // ≥ 32% (cảnh cao trào)
    // Đầu phấn trong PNG gốc 648×1344 ở ~(0.085, 0.212); ảnh được lật
    // ngang để tay phấn hướng sang phải ⇒ x' = 1 − 0.085.
    const TIPX = 1 - 48 / 648, TIPY = 280 / 1344;
    const im = this.mascot.im && this.mascot.im.chalk;
    if (!im) return;                          // thiếu pose thì bỏ qua
    const mw = im.width * (MH / im.height);
    // chân đặt sao cho đầu phấn nằm ĐÚNG trên đường ngang:
    //   tipY = footY − MH + TIPY·MH  ⇒  footY = GY + MH·(1 − TIPY)
    const footY = GY + MH * (1 - TIPY);
    const tipToCenter = (TIPX - 0.5) * mw;    // lệch ngang từ tâm người tới phấn

    // thân người luôn nằm trong khung; đầu phấn mới là thứ chạy theo bút
    const MINX = 40 + mw / 2, MAXX = W - 40 - mw / 2;
    let footX;
    if (t < C0) {
      // bước lên phía trước, tiến tới chỗ sắp đặt bút
      footX = lerp(W * 0.135, GX0 - tipToCenter, prog(t, A0 + 0.15, C0, inOutCubic));
    } else if (pen !== null) {
      footX = pen - tipToCenter;              // tay đi ĐỒNG TỐC với đầu bút
    } else {
      // kẻ xong: đứng lại ở cuối đường, không lùi — anh ta vừa kẻ xong nó
      footX = GX1 - tipToCenter;
    }
    footX = clamp(footX, MINX, MAXX);

    g.save();
    g.translate(sx * 0.45, sy * 0.45);        // anh ta đứng vững hơn nền
    // Lật bằng chính transform của cảnh: mascot.draw() chỉ lật phần thân,
    // viền navy thì không — lật ở đây nên viền và thân luôn khớp nhau.
    g.translate(footX, 0); g.scale(-1, 1); g.translate(-footX, 0);
    // Viền + bóng chỉ phụ thuộc (pose, hpx) — dựng MỘT LẦN rồi blit.
    // Dựng lại mỗi frame tốn ~28ms (8 lượt drawImage + blur 26px).
    const plate = this.plate(im, MH);
    if (plate) {
      g.save();
      g.globalAlpha = 0.96;
      g.drawImage(plate.cv, footX - mw / 2 - plate.pad, footY - MH - plate.pad);
      g.restore();
    }
    g.save();
    g.globalAlpha = 0.96;
    g.drawImage(im, footX - mw / 2, footY - MH, mw, MH);
    g.restore();
    g.restore();
  }
}
