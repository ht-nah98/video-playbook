// "Ngân hàng của số mũ" — thế giới dùng chung của verse 2 (P13 → P15, cửa két quay lại ở P18).
// Một sảnh két sắt: tường ô két trôi chậm phía sau, cửa két tròn, các chồng xu đứng trên chân trời,
// mỗi tháng một chồng cao gấp 1.07 chồng trước → đỉnh các chồng vạch đúng đường cong mũ.
// Các cảnh gọi CÙNG hàm với cùng t → thế giới nối liền qua ranh giới cảnh.
import { clamp, prog, outBack, smooth, hash } from '../../../engine/lib.js';
import { PAL, beat } from './song.js';

export const BASE = 760;                  // chân các chồng xu = đường chân trời của sân khấu
export const U = 150;                     // px cho giá trị 1
export const RATE = 1.07;
export const colX = (n) => 400 + n * 88;  // tháng n → x
export const valY = (v) => BASE - v * U;  // giá trị → y
export const KACHING = [64.49, 64.85];   // data/stems.json: percussion — máy tính tiền (TREATMENT § Mốc nhạc cụ)
export const BANK_GLYPHS = ['$', '%', '$', '¢', '%', '$', '1.07'];   // sàn sảnh: chữ của chính lời (UPGRADE-NOTES §2)
export const DOUBLE_AT = Math.log(2) / Math.log(RATE);   // 10.24 tháng: log₁.₀₇ 2

/** Mốc tháng n hiện ra: tháng 0 ở cú ka-ching, tháng 1… mỗi beat một tháng kể từ `every`. */
export function monthTimes(kaching, every, last = 12) {
  const k0 = Math.ceil((every - beat.T0) / beat.BEAT);
  return [kaching, ...Array.from({ length: last }, (_, i) => beat.beatT(k0 + i))];
}

/** Tháng đã hiện tới lúc t (−1 nếu chưa có). */
export const monthAt = (times, t) => times.reduce((m, tm, n) => (t >= tm ? n : m), -1);

/** Tường ô két + cửa két tròn: thế giới phía sau, trôi chậm theo t (không bám beat). */
export function vault(g, t, { alpha = 1, doorSpin = 0 } = {}) {
  if (alpha <= 0) return;
  g.save(); g.globalAlpha = alpha;
  g.strokeStyle = '#22305A'; g.lineWidth = 2;
  const off = -((t * 9) % 160);
  for (let y = 70; y < 700; y += 106) for (let x = -320 + off; x < 2240; x += 160) {
    const r = hash(Math.round((x - off) / 160) * 7.1 + y * 0.37);
    g.strokeRect(x, y, 150, 96);
    g.beginPath(); g.arc(x + 75, y + 48, 7, 0, Math.PI * 2); g.stroke();
    if (r > 0.86) { g.fillStyle = 'rgba(255,181,71,0.10)'; g.fillRect(x + 2, y + 2, 146, 92); }   // vài ô đang sáng đèn
  }
  // cửa két tròn: vành, bu-lông, tay quay — chính nó là "động cơ" ở P18
  const cx = 1380, cy = 330, R = 230;
  g.fillStyle = PAL.bg; g.beginPath(); g.arc(cx, cy, R + 14, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#2C3D6B'; g.lineWidth = 6;
  for (const r of [R, R - 34, 70]) { g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
  g.fillStyle = '#2C3D6B';
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; g.beginPath(); g.arc(cx + Math.cos(a) * (R - 17), cy + Math.sin(a) * (R - 17), 6, 0, Math.PI * 2); g.fill(); }
  const a0 = doorSpin + t * 0.08;
  g.lineWidth = 10; g.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const a = a0 + i * Math.PI / 3;
    g.beginPath(); g.moveTo(cx - Math.cos(a) * 150, cy - Math.sin(a) * 150); g.lineTo(cx + Math.cos(a) * 150, cy + Math.sin(a) * 150); g.stroke();
  }
  g.restore();
}

/** Một chồng xu cao h px, chân (x, BASE). */
function stack(g, x, h, { col = PAL.fwd, core = PAL.fwdCore, w = 56 } = {}) {
  if (h <= 0) return;
  const top = BASE - h;
  g.fillStyle = col; g.fillRect(x - w / 2, top, w, h);
  g.strokeStyle = 'rgba(11,15,30,0.45)'; g.lineWidth = 2;
  g.beginPath();
  for (let y = BASE - 11; y > top + 4; y -= 11) { g.moveTo(x - w / 2, y); g.lineTo(x + w / 2, y); }
  g.stroke();
  g.fillStyle = core; g.beginPath(); g.ellipse(x, top, w / 2, 8, 0, 0, Math.PI * 2); g.fill();
}

/**
 * Các chồng xu tới tháng hiện tại. times = monthTimes(...); mỗi chồng mọc lên (outBack) ở mốc của nó.
 * Trả toạ độ đỉnh chồng mới nhất (cho token ×1.07 nhảy theo).
 */
export function stacks(g, t, times, { alpha = 1 } = {}) {
  g.save(); g.globalAlpha = alpha;
  times.forEach((tm, n) => {
    if (t < tm) return;
    const k = outBack(clamp((t - tm) / 0.25));
    stack(g, colX(n), RATE ** n * U * k);
  });
  // nhãn tháng dưới chân (mono nhỏ) — trục thời gian của thế giới
  g.font = '500 22px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = PAL.fwdCore;
  times.forEach((tm, n) => { if (t >= tm) g.fillText(String(n), colX(n), BASE + 14); });
  g.restore();
}

/** Đường cong mũ qua đỉnh các chồng (vàng) — vạch tới tháng v1. */
export function growthCurve(g, v1, { alpha = 1, col = PAL.fwd, width = 5 } = {}) {
  if (v1 <= 0 || alpha <= 0) return;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = width; g.shadowColor = col; g.shadowBlur = 18;
  g.beginPath();
  for (let v = 0; v <= v1; v += 0.05) { const x = colX(v), y = valY(RATE ** v); v === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
  g.stroke(); g.restore();
}

/** Vạch ×2 nằm ngang: mục tiêu "gấp đôi". k = tiến độ vạch từ trái sang phải. */
export function doubleLine(g, t, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  const y = valY(2), x0 = colX(-0.6), x1 = colX(-0.6) + (colX(12.8) - colX(-0.6)) * k;
  g.save(); g.globalAlpha = alpha;
  g.setLineDash([18, 12]); g.lineDashOffset = -t * 40; g.strokeStyle = PAL.truth; g.lineWidth = 4;
  g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); g.setLineDash([]);
  if (k >= 1) { g.font = '900 54px "Archivo"'; g.fillStyle = PAL.truth; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('×2', colX(12.8) + 18, y); }
  g.restore();
}

/** Tờ lịch treo tường: tháng hiện tại; lật trang (co dọc) mỗi lần đổi. `label` thay số (vd. '?'). */
export function calendar(g, t, month, flipAt, { x = 200, y = 120, label = null, labelCol = PAL.block, appear = 1 } = {}) {
  if (appear <= 0) return;
  const f = clamp((t - flipAt) / 0.14), sy = f < 1 ? Math.abs(Math.cos(Math.PI * f)) : 1;
  g.save(); g.translate(x + 115, y); g.scale(appear, appear * Math.max(sy, 0.05));
  g.fillStyle = PAL.paper; g.fillRect(-115, 0, 230, 250);
  g.fillStyle = PAL.block; g.fillRect(-115, 0, 230, 52);
  g.fillStyle = PAL.paper; g.font = '600 24px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('MONTH', 0, 27);
  const txt = label ?? String(month);
  g.fillStyle = label ? labelCol : PAL.ink; g.font = `900 ${txt.length > 2 ? 92 : 140}px "Archivo"`;   // "10.2" vừa tờ lịch
  g.fillText(txt, 0, 158);
  g.restore();
}

// ── Ô □ và phương trình 1.07^□ = 2 (P14 dựng, P15 mở hộp, P16 khắc lên kính) ──
export const CAL_Q = [315, 278];                                // dấu "?" trên tờ lịch (toạ độ khung)
export const EQ = { x: 880, y: 380, size: 170 };                 // "1.07" lớn, căn giữa tại x
export const EQ_BOX = [1140, 232], EQ_BS = 92;                  // chỗ số mũ

/** Ô □ đỏ: cạnh s, nhấp nhô theo t. lid ∈ [0,1]: nắp mở (P15). */
export function unknownBox(g, t, x, y, s, { col = PAL.block, lid = 0, bob = 1 } = {}) {
  const yy = y + Math.sin(t * 3) * 6 * bob;
  g.save(); g.translate(x, yy);
  g.strokeStyle = col; g.lineWidth = Math.max(4, s * 0.09); g.shadowColor = col; g.shadowBlur = 22;
  g.beginPath(); g.moveTo(-s / 2, -s / 2); g.lineTo(-s / 2, s / 2); g.lineTo(s / 2, s / 2); g.lineTo(s / 2, -s / 2); g.stroke();
  if (lid > 0) {                                     // mở nắp: lòng hộp trống trơn, một luồng sáng trắng đi lên
    const gr = g.createLinearGradient(0, -s / 2, 0, -s / 2 - 260 * lid);
    gr.addColorStop(0, 'rgba(244,241,234,0.32)'); gr.addColorStop(1, 'rgba(244,241,234,0)');
    g.save(); g.shadowBlur = 0; g.fillStyle = gr;
    g.beginPath(); g.moveTo(-s / 2, -s / 2); g.lineTo(s / 2, -s / 2); g.lineTo(s * 1.1, -s / 2 - 260 * lid); g.lineTo(-s * 1.1, -s / 2 - 260 * lid); g.fill();
    g.restore();
  }
  // nắp: bản lề ở góc trên-phải, mở tới 110°
  g.translate(s / 2, -s / 2); g.rotate(-lid * 1.92);
  g.beginPath(); g.moveTo(0, 0); g.lineTo(-s, 0); g.stroke();
  g.restore();
}

/** "1.07" lớn + ô □ ở số mũ + "= 2" (k2: tiến độ "= 2", 0 → không có). */
export function hiddenEq(g, t, { k2 = 0, box = true, boxCol = PAL.block, lid = 0, alpha = 1, eqX = 1330 } = {}) {
  g.save(); g.globalAlpha = alpha;
  g.font = `900 ${EQ.size}px "Archivo"`; g.fillStyle = PAL.truth; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  g.shadowColor = PAL.bg; g.shadowBlur = 24; g.fillText('1.07', EQ.x, EQ.y); g.shadowBlur = 0;
  if (k2 > 0) {
    const s = outBack(clamp(k2));
    g.save(); g.translate(eqX, EQ.y - 60); g.scale(s, s); g.textBaseline = 'middle';
    g.fillText('=', -70, 0); g.fillStyle = PAL.fwd; g.shadowColor = PAL.fwd; g.shadowBlur = 30; g.fillText('2', 60, 0);
    g.restore();
  }
  g.restore();
  if (box) unknownBox(g, t, EQ_BOX[0], EQ_BOX[1], EQ_BS, { col: boxCol, lid });
}

/** Nhãn log₁.₀₇ 2 trong khung xanh — tên của số mũ. (x, y) = tâm trái của khung; k = tỉ lệ hiện. Trả bề rộng. */
export function logLabel(g, x, y, k, { size = 58, text = null } = {}) {
  if (k <= 0) return 0;
  g.save(); g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  const big = `900 ${size}px "Archivo"`, sub = `900 ${Math.round(size * 0.5)}px "Archivo"`;
  g.font = big; const w1 = g.measureText('log').width, w3 = g.measureText(' 2').width;
  g.font = sub; const w2 = g.measureText('1.07').width;
  const w = w1 + w2 + w3 + 36;
  g.translate(x + w / 2, y); g.scale(k, k); g.translate(-w / 2, 0);
  g.strokeStyle = PAL.back; g.lineWidth = 7; g.shadowColor = PAL.back; g.shadowBlur = 22;
  g.beginPath(); g.roundRect(0, -size * 0.78, w, size * 1.56, 14); g.stroke(); g.shadowBlur = 0;
  g.fillStyle = PAL.backCore;
  g.font = big; g.fillText('log', 18, size * 0.32);
  g.font = sub; g.fillText('1.07', 18 + w1, size * 0.62);
  g.font = big; g.fillText(text ?? ' 2', 18 + w1 + w2, size * 0.32);
  g.restore();
  return w;
}

/** Mốc "gấp đôi": vạch xanh từ chỗ đường cong cắt ×2 rơi xuống trục tháng, nhãn ≈ 10.2. */
export function doubleMarker(g, t, k, { alpha = 1 } = {}) {
  if (k <= 0) return;
  const x = colX(DOUBLE_AT), y0 = valY(2), y1 = y0 + (BASE - y0) * k;
  g.save(); g.globalAlpha = alpha; g.strokeStyle = PAL.back; g.lineWidth = 6; g.shadowColor = PAL.back; g.shadowBlur = 20;
  g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
  g.fillStyle = PAL.backCore; g.beginPath(); g.arc(x, y0, 11, 0, Math.PI * 2); g.fill();
  if (k >= 1) {
    g.shadowBlur = 0; g.font = '900 40px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = PAL.backCore;
    g.fillText('≈ 10.2', x, BASE + 44);
  }
  g.restore();
}
