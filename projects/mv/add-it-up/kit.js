// Đồ nghề chung của các cảnh trong bài này (xưởng in riso — DNA.md). Plate không import plate; hình dùng chung ở đây.
import { W, H, clamp, smooth } from '../../../engine/lib.js';
import { Riso, separate, printImage } from '../../../engine/riso.js';
import { lyricTrack, voiceOf, drawLine, FONTS } from '../../../engine/tape.js';
import { mouthAt } from '../../../engine/visemes.js';
import { PAL, INKS } from './song.js';

export { PAL, FONTS, drawLine };
export const R = new Riso({ inks: INKS, paper: PAL.paper }).init();

// ── ảnh tách màu: dựng một lần (tất định — từ canvas CPU của Mascot/Face) ──
const SEP = new Map();
export function art(mascot, pose) {
  if (!SEP.has(pose)) {
    const im = mascot.im[pose]; if (!im) throw new Error(`kit: thiếu pose ${pose}`);
    SEP.set(pose, separate(im, { inks: INKS, cell: 7 }));
  }
  return SEP.get(pose);
}
/** 9 khung mặt hát nhép (viseme nền + miệng N) đã tách màu. */
export function faceArt(face) {
  if (!SEP.has('face')) {
    const fr = [];
    for (let i = 1; i <= 9; i++) {
      const c = document.createElement('canvas'); c.width = face.base.width; c.height = face.base.height;
      const x = c.getContext('2d', { willReadFrequently: true });
      face.draw(x, c.width / 2, c.height, c.height, i);
      fr.push(separate(c, { inks: INKS, cell: 4 }));
    }
    SEP.set('face', fr);
  }
  return SEP.get('face');
}

/**
 * Một tờ in: giấy → paint() vẽ mực → khung in (dấu cắt, vạch đăng ký, dòng lượt in) → in chồng.
 *   amp: độ rung lệch khuôn theo trống (verse ~1, điệp khúc ~3)
 */
export function sheet(g, t, s, paint, { amp = 1, chrome = true, pass = 4 } = {}) {
  R.begin(g); R.paper();
  paint();
  if (chrome) marks(pass);
  R.flush({ shake: amp * (s.drums ? s.drums(t) : 0) });
}
export function marks(pass = 4) {
  R.ink('key', x => {
    x.lineWidth = 2;
    for (const [px, py, sx, sy] of [[60, 60, 1, 1], [W - 60, 60, -1, 1], [60, H - 60, 1, -1], [W - 60, H - 60, -1, -1]]) {
      x.beginPath(); x.moveTo(px - 30 * sx, py); x.lineTo(px + 20 * sx, py); x.moveTo(px, py - 30 * sy); x.lineTo(px, py + 20 * sy); x.stroke();
    }
    x.font = '500 17px "IBM Plex Mono"';
    x.fillText(`ADD IT UP · 99% FROM SCRATCH · PASS ${pass}/4${pass === 4 ? ' · K' : ''}`, 130, H - 26);
  });
  // vạch đăng ký in ở CẢ 4 mực: khi lệch khuôn, các vòng tách màu ra — thước đo lệch khuôn ngay trên tờ
  for (const ink of ['yellow', 'pink', 'blue', 'key']) R.ink(ink, x => {
    x.lineWidth = 2;
    for (const [px, py] of [[104, 104], [W - 104, 104], [104, H - 104], [W - 104, H - 104]]) {
      x.beginPath(); x.arc(px, py, 9, 0, 7); x.moveTo(px - 14, py); x.lineTo(px + 14, py); x.moveTo(px, py - 14); x.lineTo(px, py + 14); x.stroke();
    }
  });
}

/** Lời của cảnh, giọng theo tag section. style(line, i, voice) → ghi đè vị trí/cỡ/mực. */
export function lyrics(s, t, from, to, style = () => ({}), opts = {}) {
  lyricTrack(R, s.tl, t, { from, to, ...opts, style: (l, i) => {
    const voice = voiceOf(l.section);
    const base = voice === 'rap' ? { x: 130, y: 980, px: 66, rot: -2.2, bg: 'yellow' }
      : voice === 'sung' ? { x: 130, y: 985, px: 84, rot: 0, shadow: 'pink' }
      : { x: 130, y: 985, px: 40, rot: 0 };
    return { voice, ...base, ...style(l, i, voice) };
  } });
}

/** Nhân vật: vào ở tIn (4 lượt in, 0.32s), ra ở tOut (xén dải, 0.6s). */
export function figure(s, pose, t, tIn, tOut, cx, foot, h, o = {}) {
  const k = clamp((t - tIn) / 0.32), out = clamp((t - tOut) / 0.6);
  printImage(R, art(s.mascot, pose), cx, foot, h, { k, out, ...o });
}
/** Mặt hát nhép bản riso. */
export function singer(s, t, cx, foot, h, o = {}) {
  const words = s._words ??= s.tl.lines.flatMap(l => l.words);
  const m = mouthAt(t, words, s.vox);
  printImage(R, faceArt(s.face)[Math.min(9, Math.max(1, m)) - 1], cx, foot, h, { shadow: 'blue', ...o });
}
export const between = (t, a, b) => t >= a && t < b;
export { clamp, smooth };

// ── hình toán dùng chung ──
/** Hệ trục: gốc (ox, oy), dài sang phải w, lên trên h. */
export function axes(ox, oy, w, h, { lx = 'x', ly = '', lw = 3 } = {}) {
  R.ink('key', c => {
    c.lineWidth = lw; c.beginPath(); c.moveTo(ox - 30, oy); c.lineTo(ox + w, oy); c.moveTo(ox, oy + 30); c.lineTo(ox, oy - h); c.stroke();
    c.beginPath(); c.moveTo(ox + w + 14, oy); c.lineTo(ox + w - 4, oy - 8); c.lineTo(ox + w - 4, oy + 8); c.fill();
    c.font = '500 26px "IBM Plex Mono"'; c.fillText(lx, ox + w + 22, oy + 9); if (ly) c.fillText(ly, ox - 12, oy - h - 18);
  });
}
/** Đường y = f(u), u ∈ [a, b] trong toạ độ màn hình X(u), Y(y). */
export function plot(c, f, a, b, X, Y, step = 0.01) {
  c.beginPath();
  for (let u = a, first = true; u <= b + 1e-9; u += step, first = false) { const px = X(u), py = Y(f(u)); first ? c.moveTo(px, py) : c.lineTo(px, py); }
}
/** Trục lăn của máy in (d/dx): con lăn đứng ở x, cao từ y0 tới y1, nhãn trên đầu. */
export function roller(x, y0, y1, label = 'd/dx') {
  R.ink('blue', c => { c.fillStyle = R.tint('blue', 0.35, 8); c.fillRect(x - 26, y0, 52, y1 - y0); });
  R.ink('key', c => {
    c.lineWidth = 4; c.beginPath(); c.roundRect(x - 26, y0, 52, y1 - y0, 26); c.stroke();
    c.lineWidth = 2; for (let y = y0 + 30; y < y1 - 20; y += 34) { c.beginPath(); c.moveTo(x - 22, y); c.lineTo(x + 22, y + 12); c.stroke(); }
    c.font = '800 38px "Archivo"'; c.textAlign = 'center'; c.fillText(label, x, y0 - 18);
  });
}
/** Chữ in khối: thân một mực + bóng lệch mực khác; k ∈ [0,1] in vào (lệch khuôn → khớp). */
export function stamp(text, x, y, font, { ink = 'key', shadow = 'pink', off = [10, 8], k = 1, align = 'left', rot = 0 } = {}) {
  if (k <= 0) return;
  const e = (1 - smooth(clamp(k))) * 30;
  const put = (c, dx, dy) => { c.translate(x, y); c.rotate(rot); c.font = font; c.textAlign = align; c.fillText(text, dx, dy); };
  if (shadow) R.ink(shadow, c => put(c, off[0] - e, off[1] + e * 0.5));
  R.ink(ink, c => put(c, e * 0.6, -e * 0.3));
}
