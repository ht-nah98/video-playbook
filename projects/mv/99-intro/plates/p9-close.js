// P9 "Chốt" · 24.81 → 25.968s · "Ninety-nine percent... Loading." rồi HARD STOP
// Camera lao VÀO một nút lưới của P8, và nút đó hoá ra chính là vòng tròn 99%
// của P1 — vẫn thiếu đúng 1%. Đầu compa quay nốt 1% cuối, khép vòng.
// 25.37s: tắt hết, còn một chấm gold. 25.90s: đen. Xem docs/TREATMENT.md § P9.
import { C, H, W, clamp, inExpo, inOutCubic, lerp, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P, beat } from '../song.js';
import { arc, point, guideCircle } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

const A0    = P.close;    // 24.81 — cắt cứng VÀO nút lưới
const T_ZM  = 21.64;      // hết cú lao (0.25s)
const T_SEAL0 = 23.35;    // bắt đầu quay nốt 1%
const T_SEAL1 = 24.09;    // vòng khép kín
const T_STOP  = 24.58;    // HARD STOP — nhạc dừng, mọi thứ tắt
const T_DOT   = 25.80;    // chấm gold tắt
const END     = P.end;    // 25.968

// Hình học của P1, lặp lại NGUYÊN XI để khán giả nhận ra
const R0  = 248;
const CX  = W * 0.5, CY = H * 0.53;
const AST = -Math.PI / 2;                  // cung bắt đầu ở đỉnh
const AGAP = AST + Math.PI * 2 * 0.99;     // mép khuyết 1%

export default class P9 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t < A0 || t >= END) return;

    // ================= SAU HARD STOP: chỉ còn một chấm gold =================
    if (t >= T_STOP) {
      if (t < T_DOT) {
        // 1-2 frame đầu còn dư sáng của đầu compa, rồi đứng yên tuyệt đối
        const flash = prog(t, T_STOP, T_STOP + 0.034);
        point(g, CX, CY, { r: lerp(11, 6, flash), glow: lerp(2.2, 0.85, flash) });
      }
      return;                               // 25.90 → 25.968: đen tuyệt đối
    }

    // ================= CÚ LAO VÀO NÚT LƯỚI =================
    // Nút lưới P8 nằm lệch tâm; camera lao vào nó và nó nở ra thành vòng tròn.
    // Thực hiện bằng scale quanh tâm vòng: bắt đầu rất nhỏ (nút) → cỡ thật.
    const zk = prog(t, A0, T_ZM, outExpo);
    const zoom = lerp(0.055, 1, zk);
    // lưới xung quanh còn sót lại một-hai frame rồi văng ra khỏi khung
    const gridOut = prog(t, A0, A0 + 0.20, outCubic);

    g.save();
    g.translate(CX, CY);
    g.scale(zoom, zoom);
    g.translate(-CX, -CY);

    // --- tàn dư lưới P8 văng ra: sáu cạnh tam giác quanh nút, chỉ 0.2s ---
    if (gridOut < 1) {
      const S = 132;
      g.save();
      g.globalAlpha = (1 - gridOut) * 0.7;
      g.strokeStyle = C.teal;
      g.lineWidth = 2.2 / zoom;
      g.lineCap = 'round';
      for (let k = 0; k < 6; k++) {
        const a = k * Math.PI / 3;
        const L = S * lerp(1, 7, gridOut);
        g.beginPath();
        g.moveTo(CX, CY);
        g.lineTo(CX + Math.cos(a) * L, CY + Math.sin(a) * L);
        g.stroke();
      }
      g.restore();
    }

    // --- vòng phụ trợ: đích đến là một vòng tròn trọn vẹn (như P1) ---
    guideCircle(g, CX, CY, R0, 1, { alpha: 0.42 * zk });

    // --- cung 99% đã có sẵn: đây là CHÍNH vòng tròn của P1, đã nguội về teal
    const sealP = prog(t, T_SEAL0, T_SEAL1, outCubic);
    g.save();
    g.globalAlpha = zk;
    g.lineCap = 'round';
    g.lineWidth = 4.5 / 1;
    // sau khi khép: cả vòng chớp gold-hot một lần rồi nguội hết về teal
    const sealFlash = sealP >= 1 ? prog(t, T_SEAL1, T_SEAL1 + 0.05) : 0;
    g.strokeStyle = sealP >= 1
      ? (sealFlash < 1 ? C.goldHot : C.teal)
      : C.teal;
    g.beginPath();
    g.arc(CX, CY, R0, AST, AGAP);
    g.stroke();
    g.restore();

    // --- 1% cuối: đầu compa quay nốt và KHÉP VÒNG ---
    let hx = CX + Math.cos(AGAP) * R0, hy = CY + Math.sin(AGAP) * R0;
    if (t >= T_SEAL0) {
      const aEnd = lerp(AGAP, AST + Math.PI * 2, sealP);
      g.save();
      g.lineCap = 'round';
      g.lineWidth = 4.5;
      g.strokeStyle = C.goldHot;
      g.beginPath();
      g.arc(CX, CY, R0, AGAP, aEnd);
      g.stroke();
      g.restore();
      hx = CX + Math.cos(aEnd) * R0;
      hy = CY + Math.sin(aEnd) * R0;
    } else if (zk > 0.3) {
      // chờ: khoảng hở nhấp nháy như ở P1 — vẫn chưa xong
      const bl = 0.4 + 0.6 * Math.pow(0.5, ((t - A0) % beat.BEAT) / 0.16);
      g.save();
      g.globalAlpha = bl * zk;
      g.lineWidth = 4.5;
      g.strokeStyle = C.goldHot;
      g.setLineDash([3, 7]);
      g.beginPath();
      g.arc(CX, CY, R0, AGAP, AST + Math.PI * 2);
      g.stroke();
      g.restore();
    }

    // --- đầu compa ---
    if (zk > 0.25) point(g, hx, hy, { r: 6, glow: 1 + sealFlashGlow(t), alpha: zk });

    g.restore();   // hết khối zoom

    // ================= NHÃN 99% → 100%, đổi trong ĐÚNG 1 frame =================
    // Không animate số: dưới ngưỡng khép là 99%, từ frame khép trở đi là 100%.
    if (zk > 0.45) {
      const done = t >= T_SEAL1;
      g.save();
      g.globalAlpha = clamp((zk - 0.45) / 0.3);
      g.font = '500 44px "IBM Plex Mono", monospace';
      g.fillStyle = done ? C.teal : C.bone;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(done ? '100%' : '99%', CX, CY);
      // "Loading" chỉ còn trước khi khép — khép xong thì không loading nữa
      if (!done) {
        const nd = Math.max(0, Math.floor((t - A0) / (beat.BEAT / 2)) % 4);
        g.font = '400 30px "IBM Plex Mono", monospace';
        g.fillStyle = C.bone;
        g.globalAlpha *= 0.85;
        g.fillText('Loading' + '.'.repeat(nd), CX, CY + R0 + 74);
      }
      g.restore();
    }

    // ================= MASCOT: ở lại phía sau, ra khỏi khung tự nhiên =========
    // Camera lao vào → anh ta bị bỏ lại: trượt ra mép trái và to dần (bị vượt qua).
    if (t < T_STOP - 0.18) {
      const out = prog(t, A0, A0 + 0.42, outCubic);
      // làm tròn bậc 8px: xem ghi chú ở p8-lattice.js (tránh cấp phát lại
      // canvas viền mỗi frame khi mascot phóng to lúc bị camera vượt qua)
      const mh = Math.round(H * 0.34 * lerp(1, 2.6, out) / 8) * 8;
      const x = lerp(W * 0.30, -mh * 0.85, out);
      if (x > -mh) {
        this.mascot.draw(g, 'thumb', x, H * 0.99 + out * 90, mh,
                         { alpha: 0.96, ring: 4 });
      }
    }
  }
}

// Chớp gold-hot một lần đúng lúc vòng khép — tắt ngay sau 0.09s.
function sealFlashGlow(t) {
  if (t < T_SEAL1 || t > T_SEAL1 + 0.09) return 0;
  return (1 - (t - T_SEAL1) / 0.09) * 1.8;
}
