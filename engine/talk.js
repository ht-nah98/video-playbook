// Miệng NÓI cho mascot trong video bài học (docs/character/CHARACTER-V2.md § Miệng nói). Không đè ảnh viseme (chỉ khớp mặt cận
// thẳng): vẽ một khẩu hình anime nhỏ đúng tâm, cỡ, góc nét miệng gốc của từng tư thế (assets/character-v2/mouths.js).
// open ∈ [0,1] lấy từ đường bao giọng (tools/voice/mouth_env.py → data/<part>.mouth.json, đọc bằng makeEnv). Hàm thuần.
import { MOUTHS } from '../assets/character-v2/mouths.js';
export { makeEnv } from './visemes.js';

/** Độ mở miệng lúc t: đường bao × cổng hiện diện (k của figure — chỉ nói khi đã đứng hẳn trên hình). */
export const mouthOpen = (env, t, k = 1) => (k < 0.95 ? 0 : env.at(t));

/**
 * Vẽ miệng mở lên một tư thế đã vẽ. place = { x0, y0, s, flip } — ảnh gốc được vẽ với góc trái-trên ở (x0, y0), tỉ lệ s
 * (lật ngang quanh tâm ảnh nếu flip). open < 0.12 → không vẽ gì (giữ nét miệng gốc của ảnh).
 */
export function drawMouth(g, pose, place, open, imgW) {
  const M = MOUTHS[pose];
  if (!M) throw new Error(`talk: chưa đo miệng của tư thế "${pose}" (assets/character-v2/mouths.js)`);
  if (open < 0.12) return;
  const { x0, y0, s, flip = false } = place;
  const mx = flip ? imgW - M.x : M.x, tilt = (flip ? -M.tilt : M.tilt) * Math.PI / 180;
  const cx = x0 + mx * s, cy = y0 + M.y * s, w = Math.max(13, M.w * s);
  const ww = w * (0.85 + 0.3 * open), hh = w * (0.2 + 0.6 * open);
  g.save(); g.translate(cx, cy); g.rotate(tilt);
  // che nét miệng gốc bằng màu da (mép mềm)
  g.fillStyle = `rgb(${M.skin.join(',')})`; g.beginPath(); g.ellipse(0, 0, ww * 0.62, Math.max(hh * 0.7, w * 0.2), 0, 0, 7); g.fill();
  // khoang miệng: hình bán nguyệt dẹt (anime), viền nâu đậm, lưỡi hồng ở đáy
  const cavity = () => { g.beginPath(); g.moveTo(-ww / 2, -hh * 0.15);
    g.quadraticCurveTo(0, -hh * 0.45, ww / 2, -hh * 0.15);
    g.quadraticCurveTo(ww * 0.42, hh * 0.85, 0, hh * 0.85);
    g.quadraticCurveTo(-ww * 0.42, hh * 0.85, -ww / 2, -hh * 0.15); g.closePath(); };
  cavity(); g.fillStyle = '#5A1E1E'; g.fill();
  g.save(); cavity(); g.clip(); g.fillStyle = '#D9706F'; g.beginPath(); g.ellipse(0, hh * 0.95, ww * 0.34, hh * 0.45, 0, 0, 7); g.fill(); g.restore();
  cavity(); g.strokeStyle = '#3A1512'; g.lineWidth = Math.max(1.2, w * 0.07); g.lineJoin = 'round'; g.stroke();
  g.restore();
}
