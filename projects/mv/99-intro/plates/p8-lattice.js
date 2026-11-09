// P8 "Lưới chứng minh" · 20.77 → 24.81s · cao trào nhạc, không có lời
// Ý tưởng: dựng hình Euclid I.1 (⊙(A,AB) ∩ ⊙(B,AB) → tam giác đều) TỰ NHÂN
// BẢN mỗi beat: 1 → 6 quanh nút → lát kín vùng → phủ khung → trải thành mặt
// phẳng 3D chạy tới chân trời. Xem docs/TREATMENT.md § P8.
import { C, H, W, clamp, hash, inOutCubic, lerp, outCubic, outExpo, prog, smooth } from '../../../../engine/lib.js';
import { P, beat } from '../song.js';
import { arc, line, point, guideCircle, inkColor, mix } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

const A0  = P.lattice;          // 20.77 — mở cảnh, hai cung tròn dựng hình
const END = P.close;            // 24.81

// 5 beat của cảnh: mốc bậc nhân bản (đo từ beat.T0 + n*beat.BEAT, làm tròn vào cảnh)
// (beat.T0 + n*beat.BEAT: 21.37, 22.13, 22.89, 23.65 — trùng downbeat, xem lib.js)
const B1 = 18.52;   // tam giác đều đầu tiên — dựng xong từ hai cung
const B2 = 19.24;   // 6 tam giác quanh một nút → lục giác
const B3 = 19.95;   // lục giác lát kín một vùng
const B4 = 20.67;   // lưới lan hết khung (camera dolly lùi)
const B5 = 21.02;   // lưới trải thành mặt phẳng 3D tới chân trời
const T_QED = 20.24;

// Bước lưới tam giác đều (px, trong không gian lưới)
const S = 132;
const SQ3 = Math.sqrt(3);

// Trần an toàn: tổng số đoạn thẳng vẽ mỗi frame.
const SEG_BUDGET = 12000;

export default class P8 {
  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
    // Lưới tam giác đều dựng SẴN một lần (tất định, không phụ thuộc t):
    // các cạnh của lưới tam giác, mỗi cạnh mang `ord` = bậc nhân bản mà nó
    // thuộc về (khoảng cách vòng hex từ nút gốc) → dùng để lộ dần theo beat.
    // R=16 → 2352 cạnh, 817 nút. Dư sức dưới trần 12000 đoạn/frame, và đủ sâu
    // để mặt phẳng 3D chạy tới sát chân trời thay vì cụt ở một mép lục giác.
    this.edges = buildLattice(16);
    this.hexes = buildHexRings(16);
    this.peak = 0;                 // số đoạn đỉnh điểm đã vẽ (báo cáo)
  }

  render(g, t) {
    // nền do backdrop() trong main.js vẽ — KHÔNG tô đè,
    // nếu không lớp lưới/công thức/hạt bị xoá sạch.
    if (t < A0 || t >= END) return;

    let segs = 0;
    const pulse = beat.beatPulse(t, 0.13);

    // ---- Camera: dolly lùi ở B4, rồi ngả xuống thành phối cảnh ở B5 ----
    const back  = prog(t, B4, B4 + 0.62, inOutCubic);        // thu nhỏ để chứa lưới
    const tilt  = prog(t, B5, B5 + 0.80, inOutCubic);        // 0 = phẳng, 1 = 3D
    const zoom  = lerp(1, 0.52, back);

    // Gốc lưới = nơi con dấu P7 kết thúc (nối tiếp mạch nảy mầm), rồi trôi
    // về tâm khung khi lưới lớn dần — nếu không lưới dồn hết về nửa trái.
    const ox = W * 0.40, oy = H * 0.49;
    const centre = prog(t, B1, B3 + 0.20, inOutCubic);
    // Khi ngả sang 3D, tâm nhìn trôi xuống để chừa chân trời phía trên
    const camY = lerp(lerp(oy, H * 0.50, centre), H * 0.62, tilt);
    const camX = lerp(lerp(ox, W * 0.5, centre), W * 0.5, tilt);

    // Chân trời của mặt phẳng 3D
    const HORIZON = H * 0.335;

    // Chiếu một điểm lưới (u,v tính bằng px trong không gian lưới) ra màn hình.
    // tilt=0: affine phẳng (2D). tilt=1: phối cảnh một điểm tụ — độ sâu d
    // càng lớn thì tỉ lệ càng nhỏ, đường càng sát nhau và càng mờ.
    // Quy ước: v ÂM = xa (về phía chân trời), v DƯƠNG = gần (dưới khung).
    const EYE = 900;                  // tiêu cự
    const NEAR = 260;                 // mặt phẳng gần: chặn k bùng nổ
    const proj = (u, v) => {
      // 2D thuần
      const fx = camX + u * zoom, fy = camY + v * zoom;
      if (tilt <= 0) return [fx, fy, 1];
      // 3D: −v trở thành ĐỘ SÂU (càng lên trên lưới càng xa)
      const depth = EYE - v * zoom * 1.55;
      if (depth < NEAR) return [fx, fy, -1];      // gần hơn mặt phẳng gần → bỏ
      const k = EYE / depth;                      // ≤ EYE/NEAR, luôn hữu hạn
      const px = W * 0.5 + (u * zoom) * k * 1.30;
      const py = HORIZON + (H * 0.34) * k;
      return [lerp(fx, px, tilt), lerp(fy, py, tilt), lerp(1, k, tilt)];
    };

    // ---- Dựng hình Euclid I.1: hai điểm A, B và hai cung tròn ----
    const Ax = -S/2, Ay = 0, Bx = S/2, By = 0;
    const pAB  = prog(t, A0, A0 + 0.14);
    // hai cung phải kịp vạch xong TRƯỚC khi tam giác đầu tiên xuất hiện ở B1,
    // nhưng vẫn còn nhìn thấy đủ lâu để đọc ra đây là dựng hình Euclid I.1
    const pArc = prog(t, A0 + 0.12, A0 + 0.62, outCubic);
    const fadeCons = 1 - prog(t, B2, B3);        // đường dựng mờ đi khi xong

    if (fadeCons > 0.01) {
      const [ax, ay] = proj(Ax, Ay), [bx, by] = proj(Bx, By);
      g.save();
      g.globalAlpha = fadeCons;
      // đoạn AB — cạnh gốc
      line(g, ax, ay, bx, by, pAB, { width: 3.4, age: (t - A0) * 0.8 });
      // ⊙(A,AB) và ⊙(B,AB): hai cung tròn giao nhau tại đỉnh tam giác
      const r = Math.hypot(bx - ax, by - ay);
      if (pArc > 0) {
        // age nhỏ → gold-hot/gold: hai cung này ĐANG được vẽ ngay lúc này.
        // (age lớn sẽ ra teal = "đã chứng minh", sai ngữ pháp màu.)
        const aAge = (t - (A0 + 0.12)) * 0.42;
        // Mỗi cung chỉ quét ±36° quanh hướng tới ĐỈNH tam giác, nên chỗ hai
        // cung cắt nhau là điểm nhìn thấy rõ — đó chính là dựng hình I.1.
        // (Quét rộng hơn sẽ ra hình thấu kính vesica, không đọc ra tam giác.)
        // Đỉnh nằm PHÍA DƯỚI AB, vì nút node(0,1) của lưới ở y dương — dựng
        // hình phải khớp đúng tam giác đầu tiên của lưới, nếu không tam giác
        // "được dựng" và tam giác "được nhân bản" là hai hình khác nhau.
        const SW = Math.PI / 5;
        arc(g, ax, ay, r, Math.PI/3 - SW, Math.PI/3 + SW, pArc,
            { width: 2.2, age: aAge, seg: 30, alpha: 0.85 * fadeCons });
        arc(g, bx, by, r, Math.PI*2/3 - SW, Math.PI*2/3 + SW, pArc,
            { width: 2.2, age: aAge, seg: 30, alpha: 0.85 * fadeCons });
        segs += 60;

        // Đỉnh tam giác = giao điểm hai cung. Chấm nhỏ + hai cạnh vẽ tới nó:
        // đây là bước "dựng ra" chứ không phải "hiện ra".
        const apx = (ax + bx) / 2, apy = ay + r * SQ3 / 2;
        if (pArc > 0.9) {
          const pv = prog(t, A0 + 0.56, B1, outCubic);
          line(g, ax, ay, apx, apy, pv, { width: 3.0, age: (t - (A0+0.56)) * 0.5 });
          line(g, bx, by, apx, apy, pv, { width: 3.0, age: (t - (A0+0.56)) * 0.5 });
          segs += 2;
          if (pv >= 1) {
            g.save();
            g.globalAlpha = fadeCons;
            g.fillStyle = C.teal;
            g.beginPath(); g.arc(apx, apy, 3.4, 0, Math.PI*2); g.fill();
            g.restore();
          }
        }
      }
      // nhãn A, B mono nhỏ — bản vẽ kỹ thuật
      if (t < B3) {
        g.globalAlpha = fadeCons * 0.8;
        g.font = '400 24px "IBM Plex Mono", monospace';
        g.fillStyle = C.bone;
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText('A', ax - 20, ay + 20);
        g.fillText('B', bx + 20, by + 20);
      }
      g.restore();
    }

    // ---- Bậc nhân bản hiện tại: 1 bậc / beat ----
    // ord 0 = tam giác đầu; ord tăng dần theo vòng hex ra ngoài.
    const stage = [B1, B2, B3, B4, B5].reduce((n, tb) => n + (t >= tb ? 1 : 0), 0);
    // ordMax trôi mượt trong beat, để lưới mọc ra chứ không bật ra
    const gradeT = [B1, B2, B3, B4, B5];
    let ordMax = 0;
    if (stage > 0) {
      const tb = gradeT[stage - 1];
      const tn = gradeT[stage] || END;
      const sub = prog(t, tb, Math.min(tb + 0.52, tn), outCubic);
      // 1 → 6 tam giác → lát vùng → phủ khung → trải tới chân trời
      const base = [0, 1, 2.2, 4.6, 9][stage - 1];
      const next = [1, 2.2, 4.6, 9, 16][stage - 1];
      ordMax = lerp(base, next, sub);
    }

    // Sóng nguội lan từ tâm ra: nét ở ord nào cũng nguội sau khi đã mọc
    const ageOf = (ord) => {
      const grown = ordMax - ord;                 // "đã mọc được bao lâu" theo bậc
      return clamp(grown, 0, 3) * 0.55;           // 0 → gold-hot, ≥1.8 → teal
    };

    // ---- Vẽ lưới tam giác ----
    // Ngân sách: cắt các bậc xa khi vượt trần, và bỏ đường quá xa chân trời.
    const budget = SEG_BUDGET - segs;
    const E = this.edges;
    let drawn = 0;
    g.save();
    g.lineCap = 'round';
    for (let i = 0; i < E.length; i++) {
      const e = E[i];
      if (e.ord > ordMax) break;                  // edges đã sắp theo ord
      if (drawn >= budget) break;
      // Mọc dần TRONG bậc của nó. Hệ số cao → mỗi cạnh vạch xong rất nhanh,
      // nên rìa lưới là một VÒNG đang được vẽ chứ không phải một đám gạch
      // rời rạc (đám gạch rời đọc thành hoa văn trang trí, không thành dựng hình).
      const p = clamp((ordMax - e.ord) * 5.0);
      // Ngưỡng 0.34: cạnh mới chớm (chưa được 1/3) thì KHÔNG vẽ. Các mẩu cụt
      // rải rác ở rìa đọc thành hoa văn trang trí — đúng thứ § "Not slop" cấm.
      if (p <= 0.34) continue;
      const [x0, y0, k0] = proj(e.x0, e.y0);
      const [x1, y1, k1] = proj(e.x1, e.y1);
      if (k0 <= 0 || k1 <= 0) continue;           // bị mặt phẳng gần cắt
      // cắt bớt: cả hai đầu phải nằm DƯỚI chân trời, nếu không đoạn sẽ
      // vắt qua điểm tụ và kéo thành một vệt dài vô nghĩa
      if (tilt > 0.02 && (y0 < HORIZON + 6 || y1 < HORIZON + 6)) continue;
      // và không được dài quá nửa khung (dấu hiệu của đoạn bị méo)
      if (tilt > 0.02 && Math.hypot(x1 - x0, y1 - y0) > H * 0.55) continue;
      const kk = (k0 + k1) * 0.5;
      if (kk < 0.16) continue;                    // quá xa → bỏ
      const age = ageOf(e.ord);
      // càng xa càng mờ, càng mảnh — đó là toàn bộ chiều sâu, không cần sương
      const depthFade = tilt > 0 ? clamp((kk - 0.16) / 0.5) : 1;
      const a = clamp(p * 1.6) * (0.30 + 0.70 * depthFade);
      if (a < 0.03) continue;
      g.globalAlpha = a;
      g.lineWidth = Math.max(0.6, (e.ord === 0 ? 3.4 : 2.0) * (tilt > 0 ? kk : 1));
      // nét đang mọc ở rìa thì nóng, bên trong đã nguội về teal
      g.strokeStyle = inkColor(age);
      g.beginPath();
      g.moveTo(x0, y0);
      g.lineTo(lerp(x0, x1, p), lerp(y0, y1, p));
      g.stroke();
      drawn++;
    }
    g.restore();
    segs += drawn;

    // ---- Lục giác lộ ra: viền teal đậm quanh các vòng hex đã đóng ----
    // (lưới tam giác CHỨA lưới lục giác — ta chỉ nhấn nó lên, không vẽ thêm hình mới)
    if (t >= B2 && segs < SEG_BUDGET) {
      const hexPulse = 0.35 + 0.65 * pulse;
      g.save();
      g.lineJoin = 'round';
      for (const hx of this.hexes) {
        if (hx.ord > ordMax - 0.35) continue;
        if (segs >= SEG_BUDGET) break;
        // Chiếu CẢ SÁU đỉnh trước: chỉ cần một đỉnh hỏng (sau mặt phẳng gần,
        // hoặc vắt qua chân trời) là bỏ cả lục giác — nếu không nó kéo thành
        // hai vệt dài chạy lên đỉnh khung.
        const q = hx.pts.map(([u, v]) => proj(u, v));
        let ok = true, ksum = 0;
        for (const [px, py, pk] of q) {
          if (pk <= 0.2 || (tilt > 0.02 && py < HORIZON + 16)) { ok = false; break; }
          ksum += pk;
        }
        if (!ok) continue;
        const sk = ksum / 6;
        const fresh = clamp(1 - (ordMax - hx.ord - 0.35) / 1.2);
        g.globalAlpha = (0.18 + fresh * 0.55 * hexPulse) * (tilt > 0 ? clamp(sk * 1.5) : 1);
        g.lineWidth = Math.max(0.8, 2.4 * (tilt > 0 ? sk : 1));
        g.strokeStyle = fresh > 0.5 ? C.gold : C.teal;
        g.beginPath();
        g.moveTo(q[0][0], q[0][1]);
        for (let j = 1; j < 6; j++) g.lineTo(q[j][0], q[j][1]);
        g.closePath();
        g.stroke();
        segs += 6;
      }
      g.restore();
    }

    // ---- Nút lưới đang được dựng: đầu compa nhảy theo beat sang nút mới ----
    // (motif M1 — mọi thứ vẫn do đầu compa vẽ ra)
    if (t < B5 + 0.5) {
      const bi = Math.max(0, Math.floor((t - beat.T0) / beat.BEAT));
      const dir = Math.floor(hash(bi * 3.1) * 6);
      const rad = 1 + Math.floor(hash(bi * 7.7) * Math.max(1, ordMax));
      const ang = dir * Math.PI / 3;
      const nu = Math.cos(ang) * S * rad, nv = Math.sin(ang) * S * rad * SQ3 / 2;
      const [nx, ny, nk] = proj(nu, nv);
      if (nk > 0.25 && ny > HORIZON + 20) {
        point(g, nx, ny, { r: 5 * (tilt > 0 ? Math.max(0.5, nk) : 1),
                           glow: 0.8 + pulse * 0.9, alpha: 0.9 });
      }
    }

    // ---- MASCOT: đứng trên một nút lưới, có bóng đổ, quay về camera ----
    // Nút chân: một nút lưới thật (u,v) → chiếu ra, mascot đứng ĐÚNG trên đó.
    // (u,v) là một nút lưới THẬT: 2 bước e1 + 2 bước e2, tức node(2,2) dịch về
    // gốc. v dương = phía gần camera, nên khi ngả 3D anh ta đứng ở tiền cảnh.
    const mu = S * 3.0 - S / 2, mv = S * SQ3;
    const [fx, fy, fk] = proj(mu, mv);
    const enter = prog(t, A0, A0 + 0.45, outCubic);
    // bước đi: nhấc nhẹ theo nửa beat, dịch ngang một nhịp nhỏ — có nguyên nhân
    const stepK = ((t - beat.T0) / (beat.BEAT / 2)) % 1;
    const walk = t < 20.20 ? Math.abs(Math.sin(stepK * Math.PI)) : 0;
    // thở từ 24.0s (rig biên độ nhỏ): chỉ nhún chiều cao, không méo
    const breath = t >= 20.30 ? Math.sin((t - 20.30) * Math.PI) * 3 : 0;
    // Chiều cao LÀM TRÒN theo bậc 4px: mascot.draw() dựng lại canvas viền mỗi
    // khi kích thước đổi, nên chiều cao biến thiên liên tục sẽ cấp phát canvas
    // mới mỗi frame (rất đắt ở renderer phần mềm). Bậc 4px là không nhìn thấy.
    const mScale = tilt > 0 ? clamp(fk, 0.55, 1.15) : 1;
    const mh = Math.round(H * 0.34 * mScale / 4) * 4;
    const stepX = t < 20.20 ? Math.sin((t - A0) * 1.35) * 26 : Math.sin((20.20 - A0) * 1.35) * 26;
    const mx = fx + stepX;
    const my = fy - walk * 9 + breath;

    if (enter > 0 && fk > 0.3 && my > HORIZON + 60) {
      // bóng đổ mềm XUỐNG LƯỚI (ellipse bẹt, theo mặt phẳng)
      g.save();
      g.globalAlpha = 0.55 * enter;
      g.filter = 'blur(14px)';
      g.fillStyle = '#01030a';
      g.beginPath();
      g.ellipse(mx, my + 4, mh * 0.20, mh * 0.052, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();

      // 20.20s: quay đầu về phía camera → đổi hướng lật (rig 2 lớp không có
      // sẵn cho pose thumb, nên dùng lật ngang: trước đó anh ta đi hướng lưới)
      const faced = t >= 20.20;
      this.mascot.draw(g, 'thumb', mx, my, mh,
                       { alpha: 0.96, ring: 4, flip: !faced });
    }

    // ---- Q.E.D. — nhãn mono nhỏ, khiêm tốn, góc dưới-phải, trong vùng an toàn ----
    if (t >= T_QED) {
      const k = prog(t, T_QED, T_QED + 0.30, outCubic);
      g.save();
      g.font = '400 30px "IBM Plex Mono", monospace';
      const wq = g.measureText('Q.E.D.').width;
      // Nền navy nhỏ sau nhãn: lưới chạy ngay dưới chỗ này, không có nền thì
      // chữ bị các đường teal cắt ngang và mất nét (§ Typography: luôn SẮC).
      g.globalAlpha = k * 0.88;
      g.fillStyle = C.navy;
      g.fillRect(W - 96 - wq - 14, H - 96 - 30, wq + 28, 52);
      g.globalAlpha = k * 0.9;
      g.fillStyle = C.bone;
      g.textAlign = 'right'; g.textBaseline = 'alphabetic';
      g.fillText('Q.E.D.', W - 96, H - 96);
      // gạch chân mảnh, vẽ dần — chính đầu compa kẻ nó
      g.strokeStyle = C.teal;
      g.globalAlpha = k * 0.7;
      g.lineWidth = 1.6;
      g.beginPath();
      g.moveTo(W - 96 - wq, H - 82);
      g.lineTo(W - 96 - wq + wq * k, H - 82);
      g.stroke();
      g.restore();
    }

    if (segs > this.peak) this.peak = segs;
    if (typeof window !== 'undefined') window.__p8segs = this.peak;
  }
}

/**
 * Lưới tam giác đều dựng bằng cách nhân bản cạnh gốc AB: mỗi nút lưới là
 * A + i*e1 + j*e2 với e1=(S,0), e2=(S/2, S*√3/2). Mỗi cạnh mang `ord` =
 * khoảng cách vòng-hex từ nút gốc → chính là BẬC NHÂN BẢN mà nó xuất hiện.
 * Sắp theo ord tăng dần để cắt ngân sách chỉ bằng một lần `break`.
 */
function buildLattice(R) {
  const e1 = [S, 0], e2 = [S / 2, S * SQ3 / 2];
  const node = (i, j) => [i * e1[0] + j * e2[0] - S / 2, i * e1[1] + j * e2[1]];
  // khoảng cách vòng hex trên lưới tam giác toạ độ trục
  const hexDist = (i, j) => (Math.abs(i) + Math.abs(j) + Math.abs(i + j)) / 2;
  const seen = new Set();
  const out = [];
  const DIRS = [[1, 0], [0, 1], [-1, 1]];
  for (let i = -R; i <= R; i++) {
    for (let j = -R; j <= R; j++) {
      if (hexDist(i, j) > R) continue;
      for (const [di, dj] of DIRS) {
        const i2 = i + di, j2 = j + dj;
        if (hexDist(i2, j2) > R) continue;
        const key = `${i},${j},${i2},${j2}`;
        const rk = `${i2},${j2},${i},${j}`;
        if (seen.has(key) || seen.has(rk)) continue;
        seen.add(key);
        const [x0, y0] = node(i, j), [x1, y1] = node(i2, j2);
        out.push({ x0, y0, x1, y1, ord: Math.max(hexDist(i, j), hexDist(i2, j2)) });
      }
    }
  }
  out.sort((a, b) => a.ord - b.ord);
  return out;
}

/**
 * Các lục giác của lưới: tâm ở những nút "hex-center" (i-j ≡ 0 mod 3),
 * sáu đỉnh là sáu nút lân cận. Đây là cấu trúc CÓ SẴN trong lưới tam giác —
 * ta chỉ làm nó lộ ra, không vẽ hình mới.
 */
function buildHexRings(R) {
  const e1 = [S, 0], e2 = [S / 2, S * SQ3 / 2];
  const node = (i, j) => [i * e1[0] + j * e2[0] - S / 2, i * e1[1] + j * e2[1]];
  const hexDist = (i, j) => (Math.abs(i) + Math.abs(j) + Math.abs(i + j)) / 2;
  const NB = [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]];
  const out = [];
  for (let i = -R; i <= R; i++) {
    for (let j = -R; j <= R; j++) {
      if (hexDist(i, j) > R - 1) continue;
      if (((i - j) % 3 + 3) % 3 !== 0) continue;
      const pts = NB.map(([di, dj]) => node(i + di, j + dj));
      out.push({ pts, ord: hexDist(i, j) + 1 });
    }
  }
  out.sort((a, b) => a.ord - b.ord);
  return out;
}
