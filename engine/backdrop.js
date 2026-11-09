// Lớp nền dùng chung — thứ làm khung hình ĐẦY thay vì 90% đen.
// Nguyên tắc tách hai hệ nhịp:
//   chữ   bám MỐC TỪ HÁT (forced alignment) — giọng rap chạy tự do
//   nền   bám BEAT 78.97 BPM — chỉ 22% từ rơi gần beat, nên không thể chung
import { W, H, C, clamp, lerp, prog, hash } from './lib.js';

// Công thức thật của kênh, không phải ký hiệu trang trí ngẫu nhiên.
const FORMULAS = [
  'a² + b² = c²', '∫ f(x) dx', 'sin²θ + cos²θ = 1', 'P(A∩B)',
  'y = x³ − 3x', 'Σ 1/n²', 'V = ⅓Bh', 'lim h→0', 'eⁱᵖ + 1 = 0',
  '(aᵐ)ⁿ = aᵐⁿ', 'f(0) = 0', "y' = 3x² − 3", 'dy/dx', '2^1.4 ≈ 2.639',
];

/** Lưới sàn phối cảnh chạy về chân trời, trôi theo beat. */
export function floorGrid(g, t, { horizon = H * 0.46, alpha = 1, beat } = {}) {
  const drift = beat ? ((t - beat.T0) / beat.BEAT) % 1 : 0;
  // Trượt ngang chậm — video mẫu có mặt nước trôi liên tục, không bao giờ đứng
  // yên. Lớp nền chiếm phần lớn khung nên nó quyết định cảm giác "sống".
  const pan = Math.sin(t * 0.28) * 96;       // pan vừa phải — biên độ lớn hơn KHÔNG
                                             // tăng YDIF (đã thử 210px, xem §7)
  const dolly = 1 + Math.sin(t * 0.26) * 0.12;  // lưới tiến/lùi — chiều sâu đổi           // 0→1 mỗi beat
  g.save();
  g.globalAlpha = 0.55 * alpha;
  g.strokeStyle = C.teal;
  g.lineWidth = 1.4;
  // đường ngang: càng gần chân trời càng dày
  for (let i = 0; i < 16; i++) {
    const k = (i + drift) / 16;
    const y = horizon + (H - horizon) * Math.pow(k, 2.0 / dolly);
    if (y > H) continue;
    g.globalAlpha = 0.44 * alpha * (1 - k * 0.55);
    g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
  }
  // đường dọc hội tụ về điểm tụ
  g.globalAlpha = 0.26 * alpha;
  const vx = W / 2;
  for (let i = -9; i <= 9; i++) {
    g.beginPath();
    g.moveTo(vx + i * 34 + pan * 0.12, horizon);
    g.lineTo(vx + i * 300 + pan, H);
    g.stroke();
  }
  g.restore();
}

/** Công thức toán trôi ở nền, mờ, không bao giờ tranh chỗ với nội dung chính. */
export function formulaField(g, t, { alpha = 1, n = 22 } = {}) {
  g.save();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const s = hash(i * 3.1), s2 = hash(i * 7.7 + 2), s3 = hash(i * 11.3 + 5);
    const speed = 13 + s2 * 20;
    const x = ((s * W + t * speed) % (W + 380)) - 190;
    const y = 70 + s2 * (H - 140);
    const size = 26 + s3 * 30;
    // mờ dần ở giữa khung để không tranh chỗ với nội dung
    const mid = 1 - Math.exp(-Math.pow((x - W/2) / (W*0.30), 2));
    g.globalAlpha = alpha * (0.16 + s3 * 0.22) * (0.42 + mid * 0.58);
    g.font = `400 ${size.toFixed(0)}px "Cormorant Garamond", Georgia, serif`;
    g.fillStyle = i % 4 === 0 ? C.teal : C.bone;
    g.fillText(FORMULAS[i % FORMULAS.length], x, y);
  }
  g.restore();
}

/** Hạt sáng thưa. Nhịp theo beat bằng KÍCH THƯỚC/ĐỘ SÁNG CHUNG, không phải
 *  nhấp nháy từng hạt — nhấp nháy độc lập là nhiễu ngẫu nhiên, x264 không nén
 *  được và làm dung lượng tăng gấp 4 (bài học từ trường hạt ở v2). */
export function beatSparks(g, t, { alpha = 1, n = 52, beat } = {}) {
  const b = beat ? beat.onBeat(t, 0.30) : 0;
  const k = 0.62 + 0.38 * b;              // cả cụm sáng lên cùng nhịp
  g.save();
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const x = hash(i * 5.7) * W, y = hash(i * 9.1 + 3) * H;
    const ph = hash(i * 13.7 + 7);
    const r = (1.8 + ph * 3.0) * (0.92 + b * 0.16);
    g.globalAlpha = alpha * 0.80 * k * (0.45 + ph * 0.55);
    g.fillStyle = i % 3 === 0 ? C.teal : C.gold;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

/** Quầng sáng ấm phía sau — nền không còn phẳng lì, tăng độ sáng tổng thể. */
export function glow(g, t, { alpha = 1, beat } = {}) {
  const b = beat ? beat.onBeat(t, 0.30) : 0;
  g.save();
  g.globalCompositeOperation = 'lighter';
  // Tia sáng hướng tâm quay chậm — lớp chuyển động LỚN, thứ tạo YDIF thật.
  // Rung lắc không thay được cái này (xem docs/LESSONS.md § 12).
  const rot = t * 0.22;
  const sx = W * 0.38, sy = H * 0.26;
  for (let i = 0; i < 14; i++) {
    const a0 = rot + i / 14 * Math.PI * 2;
    const len = W * (0.30 + 0.10 * Math.sin(i * 2.1 + t * 0.4));
    const gr = g.createLinearGradient(sx, sy, sx + Math.cos(a0) * len, sy + Math.sin(a0) * len);
    gr.addColorStop(0, `rgba(212,160,23,${(0.055 + b * 0.025) * alpha})`);
    gr.addColorStop(1, 'rgba(212,160,23,0)');
    g.strokeStyle = gr;
    g.lineWidth = 12 + 9 * Math.sin(i * 1.7);
    g.beginPath(); g.moveTo(sx, sy);
    g.lineTo(sx + Math.cos(a0) * len, sy + Math.sin(a0) * len); g.stroke();
  }
  for (const [cx, cy, r, col] of [
    [W * 0.38, H * 0.30, W * 0.44, '212,160,23'],
    [W * 0.76, H * 0.70, W * 0.34, '47,224,208'],
  ]) {
    const rg = g.createRadialGradient(cx, cy, 0, cx, cy, r * (1 + b * 0.06));
    rg.addColorStop(0, `rgba(${col},${(0.13 + b * 0.05) * alpha})`);
    rg.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = rg;
    g.beginPath(); g.arc(cx, cy, r * 1.2, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

/**
 * Mặt phản chiếu — hàng nghìn điểm sáng lấp lánh ở nửa dưới khung.
 *
 * Đây là lớp chuyển động LỚN NHẤT của video mẫu (nền dưới YDIF 5.97 so với
 * 0.63 của tôi). Điểm mấu chốt: mỗi điểm phải TƯƠNG PHẢN CAO trên nền tối và
 * nhấp nháy ĐỘC LẬP — pan một lớp mờ không tạo được chuyển động (đã thử tăng
 * biên độ 4.5 lần, YDIF không đổi). Xem docs/mv/VISUAL-RESEARCH.md § 7.
 *
 * Tất định: vị trí từ hash(i), pha nhấp nháy cũng từ hash(i).
 */
export function reflection(g, t, { horizon = H * 0.46, alpha = 1, n = 1100, beat } = {}) {
  const b = beat ? beat.onBeat(t, 0.34) : 0;
  g.save();
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const u = hash(i * 3.7);                 // vị trí ngang
    const v = hash(i * 8.1 + 5);             // độ sâu 0..1
    const ph = hash(i * 12.3 + 9);           // pha riêng
    // càng xa chân trời càng thưa và càng lớn (phối cảnh)
    const y = horizon + (H - horizon) * (v * v * 0.98 + 0.02);
    const spread = 0.5 + (y - horizon) / (H - horizon) * 0.9;
    const x = (u - 0.5) * W * spread + W / 2 + Math.sin(t * 0.5 + ph * 9) * 26 * spread;
    // nhấp nháy độc lập — CHÍNH ĐIỂM NÀY tạo YDIF
    const tw = 0.30 + 0.70 * Math.pow(Math.abs(Math.sin(t * (1.1 + ph * 2.4) + ph * 6.3)), 2.4);
    const r = (1.5 + ph * 3.4) * spread * (1 + b * 0.22);
    g.globalAlpha = alpha * tw * (0.42 + 0.58 * v);
    g.fillStyle = i % 5 === 0 ? C.teal : (i % 3 === 0 ? C.bone : C.gold);
    g.beginPath(); g.ellipse(x, y, r * 1.7, r * 0.55, 0, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

/** HUD góc: tên kênh + số cảnh + bộ đếm beat. Học từ bản HKT. */
export function hud(g, t, { scene = 1, total = 9, alpha = 1, beat, dur = 25.968, ink = false } = {}) {
  const bi = beat ? Math.max(0, beat.beatIndex(t)) : 0;
  const tot = beat ? Math.floor((dur - beat.T0) / beat.BEAT) : 0;
  g.save();
  g.globalAlpha = 0.52 * alpha;
  g.font = '400 19px "IBM Plex Mono", monospace';
  g.textBaseline = 'middle';
  g.fillStyle = ink ? '#2a2418' : C.bone;
  g.textAlign = 'left';
  g.fillText(`99% FROM SCRATCH · ${String(scene).padStart(2,'0')}/${total}`, 84, H - 52);
  g.textAlign = 'right';
  g.fillStyle = ink ? '#8a6a10' : C.gold;
  g.fillText(`${bi}/${tot} BEATS · ${beat ? beat.BPM.toFixed(2) : '--'} BPM`, W - 84, H - 52);
  g.restore();
}

/** Gọi một lần đầu mỗi cảnh. `layers` chọn lớp nào bật. */
/**
 * ĐẢO NỀN — nền sáng, chữ tối. Đây là cơ chế tạo BIÊN ĐỘ độ sáng, thứ quan
 * trọng hơn YDIF: video mẫu dành 15% thời lượng cho nền sáng, pdoom 8%,
 * bản đầu của tôi 0% nên biên độ chỉ 5.2 (video mẫu 150.4).
 * Xem docs/mv/VISUAL-RESEARCH.md § 2.
 *
 * Dùng: đặt `backdrop = { invert: 1 }` trên class cảnh.
 */
export function paperGround(g, t, { alpha = 1, beat } = {}) {
  const b = beat ? beat.onBeat(t, 0.26) : 0;
  g.save();
  g.globalAlpha = alpha;
  // giấy: bone hơi ngả ấm, có vân nhẹ theo beat
  g.fillStyle = C.bone;
  g.fillRect(0, 0, W, H);
  // bóng mờ bốn góc để giấy không phẳng lì
  const vg = g.createRadialGradient(W/2, H/2, H*0.28, W/2, H/2, W*0.62);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, `rgba(20,16,8,${0.16 + b * 0.03})`);
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);
  // đường kẻ mờ như giấy có dòng
  g.globalAlpha = alpha * 0.07;
  g.strokeStyle = '#2a2418';
  g.lineWidth = 1;
  for (let y = 120; y < H; y += 54) {
    g.beginPath(); g.moveTo(96, y); g.lineTo(W - 96, y); g.stroke();
  }
  g.restore();
}

export function backdrop(g, t, { grid = 1, formulas = 1, sparks = 1, scene = 1,
                                 total = 9, halo = 1, beat, dur, invert = 0 } = {}) {
  if (invert) { paperGround(g, t, { alpha: invert, beat }); hud(g, t, { scene, total, beat, dur, ink: true }); return; }
  if (halo)     glow(g, t, { alpha: halo, beat });
  if (grid)     floorGrid(g, t, { alpha: grid, beat });
  if (formulas) formulaField(g, t, { alpha: formulas });
  if (sparks)   beatSparks(g, t, { alpha: sparks, beat });
  hud(g, t, { scene, total, beat, dur });
}
