// P3 "Bẻ nhỏ ra" · 7.40 → 9.43s · "break it down."
// Dấu hỏi của P2 bị một ĐƯỜNG CẮT gold-hot quét chéo qua, vỡ dọc theo ĐÚNG
// đường đó thành 3 mảnh mép thẳng; rồi 3 mảnh rơi xuống và DUỖI RA thành 3
// dòng lời giải. Không vỡ vụn, không particle. Xem docs/TREATMENT.md § P3.
import { C, H, W, clamp, inOutCubic, lerp, outCubic, outExpo, prog } from '../../../../engine/lib.js';
import { P } from '../song.js';
import { line, guide, point, mix } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

const A        = P.break_;   // 7.40  cảnh mở, dấu hỏi còn nguyên
const T_AIM    = 9.70;       // mascot chỉ vào đường cắt (TRƯỚC khi quét)
const T_CUT0   = 9.76;       // lưỡi cắt bắt đầu quét — trên từ "break"
const T_CUT1   = 9.84;       // quét xong: dấu hỏi đã đứt rời
const T_PART   = 9.85;       // 3 mảnh tách nhau ra theo pháp tuyến
const T_FALL   = 9.92;       // trên từ "down": rơi
const T_LAND   = 10.11;       // mảnh cuối chạm dòng
const T_UNROLL = 10.08;       // mảnh duỗi ra thành dòng ký hiệu
const T_SHRUG  = 10.17;       // mascot đổi sang shrug
const END      = P.rotate;   // 9.43

// Tâm dấu hỏi (P2 dựng nó quanh đây)
const QX = W * 0.42, QY = H * 0.45;

// Đường cắt: điểm gốc + pháp tuyến. side = sign(dot(p - p0, n)).
// Hai đường song song chéo −34° → 3 lát: trên / giữa / dưới.
const CUT_ANG = -50 * Math.PI / 180;
const NX = -Math.sin(CUT_ANG), NY = Math.cos(CUT_ANG);   // pháp tuyến
const DX =  Math.cos(CUT_ANG), DY = Math.sin(CUT_ANG);   // phương lưỡi cắt
// Khoảng cách (dọc pháp tuyến) của hai đường cắt so với tâm dấu hỏi
const CUT_D = [-160, -20];

const side = (x, y, d) => (x - QX) * NX + (y - QY) * NY - d;

/** Cắt một polyline bằng đường (QX,QY)+d dọc pháp tuyến. Trả về [dưới, trên]. */
function slice(pts, d) {
  const lo = [], hi = [];
  let cur = null, curSign = 0;
  const push = (arr, p) => { if (!cur || curSign !== arr) { cur = []; curSign = arr; (arr < 0 ? lo : hi).push(cur); } cur.push(p); };
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i];
    const s = side(x, y, d);
    const sg = s < 0 ? -1 : 1;
    if (i > 0) {
      const [px, py] = pts[i - 1];
      const ps = side(px, py, d);
      const psg = ps < 0 ? -1 : 1;
      if (psg !== sg) {
        // giao điểm chính xác: nội suy tuyến tính theo giá trị side
        const k = ps / (ps - s);
        const ix = lerp(px, x, k), iy = lerp(py, y, k);
        push(psg, [ix, iy]);          // đóng đoạn cũ ĐÚNG trên đường cắt
        cur = null;                    // buộc mở đoạn mới
        push(sg, [ix, iy]);            // mở đoạn mới cũng từ đường cắt
      }
    }
    push(sg, [x, y]);
  }
  return [lo.filter(s => s.length > 1), hi.filter(s => s.length > 1)];
}

/** Lấy mẫu một cung thành polyline. */
function arcPts(cx, cy, r, a0, a1, n = 60) {
  const out = [];
  for (let i = 0; i <= n; i++) out.push([cx + Math.cos(lerp(a0, a1, i / n)) * r, cy + Math.sin(lerp(a0, a1, i / n)) * r]);
  return out;
}

function centroid(strokes) {
  let sx = 0, sy = 0, n = 0;
  for (const s of strokes) for (const [x, y] of s) { sx += x; sy += y; n++; }
  return n ? [sx / n, sy / n] : [QX, QY];
}

/** Độ dài tích luỹ của một polyline — dùng để duỗi thẳng ra thành dòng. */
function arclen(pts) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i-1][0], dy = pts[i][1] - pts[i-1][1];
    acc.push(acc[i-1] + Math.hypot(dx, dy));
  }
  return acc;
}

// Ba dòng lời giải mà 3 mảnh duỗi ra thành. Số thứ tự vẽ riêng ở máng trái
// (M4: nhãn mono), phần còn lại là ký hiệu toán.
const NUM  = ['1.', '2.', '3.'];
const LINES = ['cho AB', 'dựng ⊙(A, AB)', '⊙(A) ∩ ⊙(B) = C'];
const ROW_X = W * 0.30;                 // mép trái các dòng (≥ 80px an toàn)
const ROW_Y = [H * 0.52, H * 0.665, H * 0.81];

export default class P3 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();

    // ---- Dựng dấu hỏi bằng dựng hình hợp lệ (như P2 để lại) ----
    // Góc canvas (y hướng xuống): −PI/2 = ĐỈNH, 0 = phải, +PI/2 = đáy, PI = trái.
    // Cung lớn = móc trên: bắt đầu ở TRÁI-DƯỚI tâm, đi NGƯỢC kim đồng hồ
    // (giá trị góc TĂNG từ −1.12PI lên −0.02PI) nên nó quét qua đỉnh → mở xuống.
    const R1 = 138, C1X = QX, C1Y = QY - 196;
    const bigArc = arcPts(C1X, C1Y, R1, -Math.PI * 1.14, -Math.PI * 0.02, 80);
    // Cung nhỏ tiếp tuyến: nối đuôi cung lớn (mép PHẢI), cong xuống-vào giữa.
    // Tâm nằm thẳng dưới điểm nối → tiếp tuyến khớp, cung đi từ đỉnh sang trái.
    const e = bigArc[bigArc.length - 1];
    const R2 = 96, C2X = e[0], C2Y = e[1] + R2;
    const smallArc = arcPts(C2X, C2Y, R2, -Math.PI / 2, -Math.PI * 1.06, 48);
    // Thân: đoạn thẳng đứng ngắn nối từ đuôi cung nhỏ xuống.
    const s = smallArc[smallArc.length - 1];
    const stem = [];
    for (let i = 0; i <= 18; i++) stem.push([lerp(s[0], s[0] + 10, i / 18), lerp(s[1], s[1] + 150, i / 18)]);
    // Chấm dưới dấu hỏi: vòng tròn nhỏ khép kín, cách thân một khoảng đọc được.
    const st = stem[stem.length - 1];
    const dot = arcPts(st[0], st[1] + 62, 16, 0, Math.PI * 2, 26);

    this.q = [bigArc, smallArc, stem, dot];

    // ---- Cắt toàn bộ dấu hỏi bằng 2 đường → 3 mảnh ----
    // slice() trả [lo, hi] theo dấu của side(); pháp tuyến hướng xuống-phải,
    // nên lo = phía TRÊN đường cắt. band[0] trên cùng → dòng 1.
    const band = [[], [], []];
    for (const pts of this.q) {
      const [aboveA, belowA] = slice(pts, CUT_D[0]);
      for (const seg of aboveA) band[0].push(seg);
      for (const seg of belowA) {
        const [mid, low] = slice(seg, CUT_D[1]);
        for (const m of mid) band[1].push(m);
        for (const l of low) band[2].push(l);
      }
    }

    // Mỗi mảnh: tâm riêng (để rơi/xoay), và một "đường duỗi" — nối các nét
    // của mảnh thành một chuỗi duy nhất để trải ra thành một dòng ngang.
    this.piece = band.map((strokes, i) => {
      // nét dài nhất vẽ trước → đầu dòng là phần "xương sống" của mảnh
      strokes = strokes.slice().sort((a, b) => b.length - a.length);
      let total = 0;
      for (const st of strokes) { st.acc = arclen(st); total += st.acc[st.acc.length - 1]; }
      const [cx, cy] = centroid(strokes);
      return { strokes, cx, cy, total, row: i };
    });
  }

  /** Vị trí + biến dạng của mảnh i tại thời điểm t. */
  poseOf(t, i) {
    const pc = this.piece[i];
    // tách rời nhẹ dọc pháp tuyến ngay sau khi cắt xong
    const sep = prog(t, T_PART, T_PART + 0.26, outCubic);
    const sgn = i === 0 ? -1 : i === 2 ? 1 : 0.18;
    let ox = NX * sgn * 15 * sep, oy = NY * sgn * 15 * sep;

    // rơi: lệch pha theo mảnh, ease inQuad + nảy một nhịp.
    // inQuad thuần khiến 2/3 đầu gần như đứng yên — pha nhẹ về tuyến tính để
    // chuyển động ĐỌC ĐƯỢC ngay từ đầu, vẫn giữ cảm giác gia tốc trọng lực.
    const t0 = T_FALL + i * 0.075;
    const t1 = T_LAND + i * 0.055;
    const kf = clamp((t - t0) / (t1 - t0));
    const fall = lerp(kf * kf, kf, 0.42);
    const tx = ROW_X + 4, ty = ROW_Y[i];
    ox += (tx - pc.cx) * fall;
    oy += (ty - pc.cy) * fall;
    // nảy nhẹ sau khi chạm (có nguyên nhân: mảnh đáp xuống dòng)
    let bounce = 0;
    if (t > t1 && t < t1 + 0.24) {
      const k = prog(t, t1, t1 + 0.24);
      bounce = -Math.sin(k * Math.PI) * 13 * (1 - k);
    }
    // xoay về ngang khi rơi
    const rot = lerp(0, -CUT_ANG * 0.55, fall) * (i === 1 ? 1 : 0.7);
    return { ox, oy: oy + bounce, fall, rot, kf };
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t < A || t >= END) return;

    // độ dài lưỡi cắt quét qua khung
    const pCut = prog(t, T_CUT0, T_CUT1, inOutCubic);
    const unroll = prog(t, T_UNROLL, END - 0.12, outCubic);

    // ---- Đường dựng phụ: trục của hai đường cắt (cho thấy cắt CÓ CHỦ Ý) ----
    if (t >= T_AIM && unroll < 0.9) {
      const gAl = (1 - unroll) * 0.85 * (t < T_CUT0 ? prog(t, T_AIM, T_CUT0) : 1);
      for (const d of CUT_D) {
        const bx = QX + NX * d, by = QY + NY * d;
        guide(g, bx - DX * 560, by - DY * 560, bx + DX * 560, by + DY * 560,
              t < T_CUT0 ? prog(t, T_AIM, T_CUT0) : 1, { alpha: gAl * 0.55 });
      }
    }

    // ---- Lưới 3 dòng: kẻ ra TRƯỚC khi mảnh rơi xuống (đích đến đọc được) ----
    const pGrid = prog(t, T_FALL - 0.22, T_FALL + 0.30, outCubic);
    if (pGrid > 0) {
      for (let i = 0; i < 3; i++) {
        const y = ROW_Y[i] + 42;
        guide(g, ROW_X - 86, y, ROW_X + 720, y, pGrid, { alpha: 0.9 });
        // số thứ tự mono bên trái
        g.save();
        g.globalAlpha = pGrid * 0.95;
        g.font = '500 34px "IBM Plex Mono", monospace';
        g.fillStyle = unroll > 0.5 ? C.teal : C.bone;
        g.textAlign = 'right'; g.textBaseline = 'alphabetic';
        g.fillText(NUM[i], ROW_X - 26, y - 12);
        g.restore();
      }
    }

    // ---- 3 mảnh dấu hỏi ----
    for (let i = 0; i < 3; i++) {
      const pc = this.piece[i];
      const ps = this.poseOf(t, i);
      // mảnh chỉ "tồn tại" sau khi lưỡi cắt đã quét tới nó; trước đó vẫn là
      // dấu hỏi liền khối — nhưng vì các mảnh ghép khít nhau nên vẽ liên tục
      // cho ta đúng hình dấu hỏi nguyên vẹn. Không cần trạng thái.
      const age = t - A + 0.30;                 // dấu hỏi từ P2: đã nguội về teal
      const landed = ps.kf >= 1;
      const col = landed ? mix(C.gold, C.teal, clamp((t - (T_LAND + i * 0.055)) / 0.36)) :
                  ps.fall > 0 ? C.gold : mix(C.teal, C.gold, clamp((t - T_CUT0) / 0.5) * 0.35);

      // khi duỗi ra: nội suy từng điểm về vị trí của nó trên một dòng ngang.
      // Mỗi nét chiếm một khúc của dòng tỉ lệ với ĐỘ DÀI THẬT của nó — mảnh
      // "duỗi thẳng ra" chứ không co lại thành một cục.
      const u = clamp(prog(t, T_UNROLL + i * 0.05, T_UNROLL + i * 0.05 + 0.34, outCubic));
      const ly = ROW_Y[i] + 42;
      const rowW = 470;
      let acc = 0;
      const totalAll = pc.total || 1;

      g.save();
      g.globalAlpha = 1;
      g.lineCap = 'round';
      g.lineJoin = 'round';
      g.lineWidth = lerp(5.5, 3.4, ps.fall);
      g.strokeStyle = col;

      for (const st of pc.strokes) {
        const L = st.acc[st.acc.length - 1] || 1;
        const base = acc; acc += L;
        g.beginPath();
        for (let k = 0; k < st.length; k++) {
          // vị trí gốc, xoay quanh tâm mảnh
          const rx = st[k][0] - pc.cx, ry = st[k][1] - pc.cy;
          const ca = Math.cos(ps.rot), sa = Math.sin(ps.rot);
          let x = pc.cx + rx * ca - ry * sa + ps.ox;
          let y = pc.cy + rx * sa + ry * ca + ps.oy;
          if (u > 0) {
            const lx = ROW_X + ((base + st.acc[k]) / totalAll) * rowW;
            x = lerp(x, lx, u); y = lerp(y, ly, u);
          }
          k === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.stroke();
      }
      g.restore();

      // ---- dòng ký hiệu toán hiện ra khi mảnh đã duỗi thẳng ----
      if (u > 0.42) {
        const a = prog(t, T_UNROLL + i * 0.05 + 0.12, END - 0.10, outCubic);
        g.save();
        g.globalAlpha = a;
        g.font = '500 42px "IBM Plex Mono", monospace';
        g.fillStyle = mix(C.gold, C.teal, clamp(a * 1.35));
        g.textAlign = 'left'; g.textBaseline = 'alphabetic';
        g.fillText(LINES[i], ROW_X, ROW_Y[i] + 30);
        g.restore();
      }
    }

    // ---- LƯỠI CẮT gold-hot quét chéo qua dấu hỏi ----
    if (t >= T_CUT0 && t < T_CUT1 + 0.30) {
      const fade = t < T_CUT1 ? 1 : 1 - prog(t, T_CUT1, T_CUT1 + 0.30);
      for (const d of CUT_D) {
        const bx = QX + NX * d - DX * 640, by = QY + NY * d - DY * 640;
        const ex = QX + NX * d + DX * 640, ey = QY + NY * d + DY * 640;
        line(g, bx, by, ex, ey, pCut, { width: 3.4, color: C.goldHot, alpha: fade * 0.95 });
      }
      // đầu compa dẫn lưỡi cắt
      if (pCut < 1) {
        const d = CUT_D[1];
        const bx = QX + NX * d - DX * 640, by = QY + NY * d - DY * 640;
        point(g, lerp(bx, bx + DX * 1280, pCut), lerp(by, by + DY * 1280, pCut), { r: 6, glow: 1.3 });
      }
    }

    // ---- Chữ "break" do đầu compa viết — và CHÍNH NÓ bị lưỡi cắt xẻ đôi ----
    this.breakWord(g, t);

    // ---- Chữ "down" rơi cùng các mảnh, đáp xuống ngang hàng dòng 3 ----
    if (t >= T_FALL - 0.14) {
      const y0 = H * 0.255, y1 = ROW_Y[2] + 30;
      const kf = prog(t, T_FALL - 0.14, T_LAND + 0.10);
      let y = lerp(y0, y1, kf * kf);
      if (t > T_LAND && t < T_LAND + 0.26) {           // nảy cùng mảnh cuối
        const k = prog(t, T_LAND, T_LAND + 0.26);
        y -= Math.sin(k * Math.PI) * 15 * (1 - k);
      }
      g.save();
      g.globalAlpha = clamp(prog(t, T_FALL - 0.14, T_FALL + 0.10));
      g.font = '900 92px "Archivo"';
      g.fillStyle = kf < 0.92 ? C.goldHot : mix(C.gold, C.teal, prog(t, T_LAND + 0.05, T_LAND + 0.45));
      g.textAlign = 'left'; g.textBaseline = 'alphabetic';
      g.fillText('down', W * 0.775, y);
      g.restore();
    }

    // ---- MASCOT: chỉ → VỠ cùng lời "break" → tụ lại → shrug ----
    // Lời hát bảo "break it down", nên chính nhân vật cũng vỡ. Đây là lý do
    // shatter() tồn tại: chất liệu phải nói đúng điều câu hát nói.
    // docs/character/MASCOT-MATERIALS.md § Phân công.
    const mh = H * 0.28;
    const mx = W * 0.105, my = H * 0.985;
    const SH_IN = T_CUT0, SH_PEAK = T_FALL, SH_OUT = T_SHRUG;   // vỡ → đỉnh → tụ
    if (t >= SH_IN && t < SH_OUT) {
      // k: 0 →0.62 (vỡ, cùng lúc lưỡi cắt quét) rồi 0.62→0 (hạt bay ngược về)
      const k = t < SH_PEAK
        ? prog(t, SH_IN, SH_PEAK, outCubic) * 0.62
        : (1 - prog(t, SH_PEAK, SH_OUT, inOutCubic)) * 0.62;
      // spread 0.28: mascot đứng ở x=202 và rộng 137px, nên spread 0.7 đẩy
      // hạt tới x=-10 — bay ra ngoài khung, mất nửa số hạt. Đo, đừng đoán.
      this.mascot.shatter(g, 'point', mx, my, mh, k, { alpha: 0.96, dir: 'up', spread: 0.28 });
    } else if (t >= SH_OUT) {
      this.mascot.draw(g, 'shrug', mx, my, mh, { alpha: 0.96, ring: 4 });
    } else {
      // nhích về phía đường cắt đúng trước lúc quét — cử chỉ "ra lệnh cắt"
      const jab = prog(t, T_AIM, T_CUT0, outExpo);
      this.mascot.draw(g, 'point', mx + jab * 22, my, mh, { alpha: 0.96, ring: 4 });
    }
  }

  /** Chữ "break" viết bởi đầu compa, rồi bị đúng đường cắt xẻ đôi và trượt. */
  breakWord(g, t) {
    const WX = W * 0.735, WY = H * 0.245;   // mép phải khung, không đè hình
    const FONT = '900 100px "Archivo"';
    const write = prog(t, A, T_CUT0 - 0.02);
    if (write <= 0) return;
    // tan đi khi các mảnh bắt đầu rơi — nhường chỗ cho "down"
    const fade = 1 - prog(t, T_FALL - 0.26, T_FALL + 0.08);
    if (fade <= 0.02) return;

    const split = prog(t, T_CUT0 + 0.02, T_CUT0 + 0.50, outCubic);

    g.save();
    g.font = FONT;
    const wWidth = g.measureText('break').width;
    g.restore();

    for (const half of [-1, 1]) {
      g.save();
      g.globalAlpha = fade;
      // mỗi nửa trượt ra theo PHÁP TUYẾN lưỡi cắt: chữ chịu cùng số phận hình
      g.translate(NX * half * 15 * split, NY * half * 15 * split);
      // nửa mặt phẳng của đường cắt đi qua tâm chữ (cùng góc CUT_ANG)
      const L = 1400;
      g.beginPath();
      g.moveTo(WX - DX * L, WY - DY * L);
      g.lineTo(WX + DX * L, WY + DY * L);
      g.lineTo(WX + DX * L + NX * L * half, WY + DY * L + NY * L * half);
      g.lineTo(WX - DX * L + NX * L * half, WY - DY * L + NY * L * half);
      g.closePath();
      g.clip();
      // đang viết: lộ dần từ trái sang phải (nét đơn do đầu compa kéo)
      if (write < 1) {
        g.beginPath();
        g.rect(WX - wWidth / 2, WY - 110, wWidth * write, 220);
        g.clip();
      }
      g.font = FONT;
      g.fillStyle = mix(C.goldHot, C.gold, split * 0.5);
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('break', WX, WY);
      g.restore();
    }

    // đầu compa đang viết chữ
    if (write > 0 && write < 1) {
      point(g, WX - wWidth / 2 + wWidth * write, WY + 10, { r: 5.5, glow: 1.1 });
    }
  }
}
