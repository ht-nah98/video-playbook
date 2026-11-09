// engine/riso.js — chất liệu in RISO: mỗi mực một bộ đệm, cuối khung in CHỒNG (multiply) lên giấy, mỗi mực lệch
// khuôn riêng. Dùng lần đầu ở add-it-up (projects/mv/add-it-up/DNA.md); MV khác dùng hay không tuỳ DNA của nó.
//
//   const R = new Riso({ inks: { pink: '#FF48B0', … }, paper: '#F2EDE4' }).init();
//   R.begin(g); R.paper();                         // tờ giấy (theo transform hiện tại của g)
//   R.ink('blue', x => x.fillRect(…));             // vẽ vào bộ đệm mực xanh — x đã mang transform của g
//   R.knock(x => x.drawImage(sil, …));             // đục lỗ MỌI mực đã in (riso không có mực trắng)
//   R.flush({ shake });                            // in chồng 4 mực lên g
//
// Luật (DNA add-it-up §8): sắc nhạt = TRAM (R.tint), không alpha. Thứ tự vẽ trong CÙNG một mực không quan trọng
// (cùng màu → hợp), giữa các mực thì multiply giao hoán — giống máy riso thật: mỗi mực một lượt.
import { W, H, hash, clamp, smooth } from './lib.js';

export const ANG = { pink: 75, blue: 15, yellow: 0, key: 45 };     // góc lưới tram, như máy in thật
// hướng lệch khuôn cố định của từng mực (px) — nhân với độ rung
export const MIS = { yellow: [3, -2], pink: [-2.5, 1.5], blue: [1.5, 2.5], key: [0, 0] };

const mk = (w = W, h = H, read = false) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  c.getContext('2d', read ? { willReadFrequently: true } : undefined); return c;
};

export class Riso {
  constructor({ inks, paper, order = Object.keys(inks) }) {
    this.inks = inks; this.paperCol = paper; this.order = order;   // thứ tự in: mực sau đè (multiply vẫn giao hoán)
  }
  init() {
    this.buf = {}; this.ctx = {}; this.dirty = {};
    for (const k of this.order) { this.buf[k] = mk(); this.ctx[k] = this.buf[k].getContext('2d'); this.dirty[k] = false; }
    this.grain = makeGrain(this.paperCol);
    this.speck = [0, 1, 2, 3].map(s => makeSpeck(s));
    this.pat = new Map();
    this.shake = 0;
    return this;
  }
  /** Bắt đầu một tờ: ghi nhớ context đích (transform của nó được chép sang bộ đệm mực mỗi lần vẽ). */
  begin(g) { this.g = g; return this; }
  /** Tờ giấy: màu giấy + hạt (sinh từ hash — tất định), phủ hình chữ nhật [x, y, w, h] theo transform của g. */
  paper({ x = 0, y = 0, w = W, h = H, color = null } = {}) {
    const g = this.g; g.save(); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    if (color) { g.fillStyle = color; g.fillRect(x, y, w, h); }
    else g.drawImage(this.grain, 0, 0, this.grain.width, this.grain.height, x, y, w, h);
    g.restore();
  }
  /** Vẽ vào bộ đệm của một mực. paint(x) nhận context đã có transform của g và fillStyle/strokeStyle = màu mực. */
  ink(name, paint) {
    const x = this.ctx[name]; if (!x) throw new Error(`riso: không có mực ${name}`);
    x.save(); x.setTransform(this.g.getTransform());
    x.fillStyle = x.strokeStyle = this.inks[name]; x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
    paint(x); x.restore(); this.dirty[name] = true;
  }
  /** Đục lỗ mọi mực đã in tới giờ (hoặc chỉ các mực trong `only`). paint vẽ hình cần đục, màu bất kỳ. */
  knock(paint, only = this.order) {
    for (const k of only) {
      if (!this.dirty[k]) continue;
      const x = this.ctx[k]; x.save(); x.setTransform(this.g.getTransform());
      x.globalCompositeOperation = 'destination-out'; x.fillStyle = x.strokeStyle = '#000'; paint(x); x.restore();
    }
  }
  /** Mẫu tram của một mực: mật độ 0..1 (diện tích chấm), ô `cell` px. Đã xoay theo góc của mực. */
  tint(name, density, cell = 9) {
    const d = Math.round(clamp(density) * 20) / 20, key = `${name}|${d}|${cell}`;
    let p = this.pat.get(key);
    if (!p) {
      const c = mk(cell, cell), x = c.getContext('2d'), r = cell * Math.sqrt(d / Math.PI);
      x.fillStyle = this.inks[name];
      if (d >= 0.78) x.fillRect(0, 0, cell, cell);
      else if (d > 0) { x.beginPath(); x.arc(cell / 2, cell / 2, r, 0, 7); x.fill(); }
      p = this.ctx[name].createPattern(c, 'repeat'); p.setTransform(new DOMMatrix().rotate(ANG[name] ?? 0));
      this.pat.set(key, p);
    }
    return p;
  }
  /** In chồng mọi mực lên g (multiply), mỗi mực lệch khuôn MIS × (0.6 + shake), có lỗ trắng li ti. */
  flush({ shake = this.shake, mis = MIS } = {}) {
    const g = this.g; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
    this.order.forEach((k, i) => {
      if (!this.dirty[k]) return;
      const x = this.ctx[k]; x.save(); x.setTransform(1, 0, 0, 1, 0, 0);
      x.globalCompositeOperation = 'destination-out'; x.drawImage(this.speck[i % 4], 0, 0, W, H); x.restore();
      const [dx, dy] = mis[k] || [0, 0], f = 0.6 + shake;
      g.globalCompositeOperation = 'multiply'; g.drawImage(this.buf[k], Math.round(dx * f), Math.round(dy * f));
      x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); x.restore();
      this.dirty[k] = false;
    });
    g.restore();
  }
}

function makeGrain(col) {
  const c = mk(W / 2, H / 2), x = c.getContext('2d'), d = x.createImageData(c.width, c.height);
  const r0 = parseInt(col.slice(1, 3), 16), g0 = parseInt(col.slice(3, 5), 16), b0 = parseInt(col.slice(5, 7), 16);
  for (let i = 0; i < c.width * c.height; i++) {
    const v = (hash(i * 0.731) - 0.5) * 16 + (hash(Math.floor(i / 7) * 1.3) - 0.5) * 6;
    d.data[i*4] = r0 + v; d.data[i*4+1] = g0 + v; d.data[i*4+2] = b0 + v; d.data[i*4+3] = 255;
  }
  x.putImageData(d, 0, 0); return c;
}
function makeSpeck(seed) {          // lỗ trắng li ti trên mặt mực — mỗi mực một bộ, nên không trùng nhau
  const c = mk(W / 2, H / 2), x = c.getContext('2d'), d = x.createImageData(c.width, c.height);
  for (let i = 0; i < c.width * c.height; i++) { const h = hash(i * 1.917 + 3.1 + seed * 17.3); d.data[i*4+3] = h > 0.94 ? 140 * (h - 0.94) / 0.06 : 0; }
  x.putImageData(d, 0, 0); return c;
}

// ───────────────────────── tách màu ảnh (nhân vật, mặt) ─────────────────────────
/**
 * Ảnh RGBA → bản in: key (đặc: nét, tóc, áo thun), tram xanh (bóng), tram hồng (da, chỗ ấm), tram vàng (ánh vàng),
 * sil (silhouette đen, để đục lỗ/bóng). Dựng MỘT lần khi nạp từ canvas CPU (toCanvas) → tất định.
 */
export function separate(img, { inks, cell = 7, keyL = 0.30 } = {}) {
  const w = img.width, h = img.height, d = img.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h).data;
  const out = { w, h, key: mk(w, h), blue: mk(w, h), pink: mk(w, h), yellow: mk(w, h), sil: mk(w, h) };
  const kx = out.key.getContext('2d'), kd = kx.createImageData(w, h);
  const sx = out.sil.getContext('2d'), sd = sx.createImageData(w, h);
  const L = i => (0.3 * d[i*4] + 0.59 * d[i*4+1] + 0.11 * d[i*4+2]) / 255;
  for (let i = 0; i < w * h; i++) {
    const a = d[i*4+3];
    sd.data[i*4+3] = a;
    if (a > 128 && L(i) < keyL) kd.data[i*4+3] = 255;
  }
  kx.putImageData(kd, 0, 0); sx.putImageData(sd, 0, 0);
  const dens = {
    blue: i => { const l = L(i); return l >= keyL ? (0.93 - l) * 1.9 : 0; },
    pink: i => L(i) >= keyL ? (d[i*4] - d[i*4+2]) / 255 * 1.25 - 0.05 : 0,
    yellow: i => ((d[i*4] + d[i*4+1]) / 2 - d[i*4+2]) / 255 * 2.2 - 0.25,
  };
  for (const ink of ['blue', 'pink', 'yellow']) {
    const x = out[ink].getContext('2d'); x.fillStyle = inks[ink];
    const th = ANG[ink] * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th), R = Math.hypot(w, h);
    for (let u = -R; u < R; u += cell) for (let v = -R; v < R; v += cell) {
      const px = Math.round(u * cs - v * sn), py = Math.round(u * sn + v * cs);
      if (px < 0 || py < 0 || px >= w || py >= h) continue;
      const i = py * w + px; if (d[i*4+3] < 128) continue;
      const k = Math.min(1, dens[ink](i)); if (k < 0.06) continue;
      x.beginPath(); x.arc(px, py, cell * 0.62 * Math.sqrt(k), 0, 7); x.fill();
    }
  }
  return out;
}

const PASSES = ['yellow', 'pink', 'blue', 'key'];
/**
 * In một ảnh đã tách màu. x = giữa, foot = đáy, h = chiều cao px.
 *   k   ∈ [0,1] vào: 4 lượt vàng → hồng → xanh → key, mỗi lượt lệch khuôn `kick` px rồi khớp lại
 *   out ∈ [0,1] ra: xén thành `strips` dải dọc rơi khỏi khung, lệch nhau
 *   shadow: mực của bóng bẹt lệch (chỉ lộ ngoài silhouette) · knock: đục lỗ mực bên dưới (giữ áo màu giấy)
 */
export function printImage(R, P, cx, foot, h, { k = 1, out = 0, shadow = 'pink', knock = true, flip = false,
  strips = 12, seed = 1, kick = 26, shadowOff = [18, 12], trap = 10 } = {}) {
  if (k <= 0 || out >= 1) return;
  const s = h / P.h, w = P.w * s, x0 = cx - w / 2, y0 = foot - h, sw = P.w / strips;
  // vẽ một bản (canvas cỡ ảnh) với lệch (dx, dy), xén dải khi đang ra
  const draw = (x, src, dx = 0, dy = 0) => {
    x.save(); x.translate(cx, 0); if (flip) x.scale(-1, 1); x.translate(-cx, 0);
    if (out <= 0) x.drawImage(src, x0 + dx, y0 + dy, w, h);
    else for (let j = 0; j < strips; j++) {
      const f = clamp((out - hash(j * 3.7 + seed) * 0.45) / 0.55), fy = f * f * (H + h);
      if (f >= 1) continue;
      x.drawImage(src, j * sw, 0, sw, P.h, x0 + j * sw * s + dx, y0 + dy + fy, sw * s + 0.5, h);
    }
    x.restore();
  };
  const first = smooth(clamp(k * 4));
  if (knock && first > 0) R.knock(x => { for (let a = 0; a < 8; a++) draw(x, P.sil, trap * Math.cos(a * Math.PI / 4), trap * Math.sin(a * Math.PI / 4)); });
  if (shadow && first > 0) R.ink(shadow, x => {
    draw(x, P.sil, shadowOff[0], shadowOff[1]);
    x.globalCompositeOperation = 'source-in'; x.setTransform(1, 0, 0, 1, 0, 0); x.fillRect(0, 0, W, H);
  });
  if (shadow && first > 0) R.knock(x => draw(x, P.sil), [shadow]);       // bóng chỉ lộ ngoài silhouette
  PASSES.forEach((ink, i) => {
    const p = clamp(k * 4 - i); if (p <= 0 || !R.ctx[ink]) return;
    const e = 1 - smooth(clamp(p * 1.6)), a = hash(i + seed) * 6.28;
    R.ink(ink, x => draw(x, P[ink], Math.cos(a) * kick * e, Math.sin(a) * kick * e));
  });
}
