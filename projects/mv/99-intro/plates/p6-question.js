// P6 "Câu hỏi" · 14.38 → 15.38s · "Why does it work?" · ✂ CẮT CỨNG ĐẦU TIÊN
// Đây là 1.7 giây DUY NHẤT trong cả video mà mọi thứ đứng im. Giá trị của nó
// nằm ở chỗ nó KHÔNG làm gì. Xem docs/TREATMENT.md § P6.
//
// Kỷ luật: đúng HAI thứ được phép chuyển động —
//   (1) bốn từ hiện lần lượt theo `start`, fade-in TẠI CHỖ (không trượt/scale/blur)
//   (2) đầu compa nhấp nháy như con trỏ, rồi lùi lấy đà cho cú đóng dấu ở P7.
// Không camera drift, không parallax, không hạt, không đường nền.
import { C, H, W, clamp, inOutCubic, lerp, outCubic, prog, serifIt } from '../../../../engine/lib.js';
import { P } from '../song.js';
import { point } from '../../../../engine/draw.js';
import { Mascot } from '../../../../engine/mascot.js';

const A   = P.question;   // 14.38 — cắt cứng
const END = P.stamp;      // 15.38

// `start` từng từ — LẤY TỪ FORCED ALIGNMENT (data/lyrics-aligned.json),
// không phải ước lượng. Dấu `?` là một "từ" riêng, hiện sau "work".
const WORDS = [
  ['Why',  14.38],
  ['does', 14.72],
  ['it',   14.92],
  ['work', 15.10],
  ['?',    15.24],
];
const FADE = 0.13;        // cảnh chỉ 1.0s nên fade phải nhanh hơn

const SIZE  = 86;                 // cỡ vừa phải — không to, không gào
const FONT  = serifIt(SIZE, 500);
const BASE_Y = H * 0.50;          // baseline dòng chữ, giữa khung

const T_PULL = 15.16;             // đầu compa lùi lấy đà, sát cú đóng dấu 15.38

export default class P6 {
  // 1.0s duy nhất mọi thứ đứng im — tắt hẳn lớp nền (TREATMENT § P6)
  backdrop = false;

  async init(shared) {
    this.mascot = shared?.mascot || await new Mascot().load();
    this.metrics = null;           // đo một lần, cache — bố cục TUYỆT ĐỐI tĩnh
    // Phải nạp XONG Cormorant italic TRƯỚC khi đo. Nếu đo lúc font chưa về,
    // measureText trả bề rộng của font dự phòng (Georgia) và bố cục bị khoá
    // vào số đo sai — cảnh này đứng im nên mọi sai lệch đều lộ ra.
    if (document.fonts) {
      try { await document.fonts.load(FONT); await document.fonts.ready; } catch (e) {}
    }
  }

  /** Đo bề rộng từng từ một lần rồi khoá lại: chữ không bao giờ nhúc nhích. */
  layout(g) {
    // Chỉ dùng lại số đo khi font đã thật sự sẵn sàng: tránh khoá nhầm vào
    // bề rộng của font dự phòng ở frame đầu tiên.
    const ok = !document.fonts || document.fonts.check(FONT);
    if (this.metrics && this.metricsFontOk) return this.metrics;
    g.save();
    g.font = FONT;
    const w = WORDS.map(([s]) => g.measureText(s).width);
    g.restore();
    // Dấu cách QUANG HỌC, không dùng measureText(' '): chữ serif nghiêng có
    // advance nghiêng sẵn nên dấu cách đo được luôn rộng quá. "?" kern sát
    // vào "work" để không đọc thành "work ?".
    const SPACE = SIZE * 0.24;
    const KERN_Q = -SIZE * 0.045;
    const gapAfter = i => (WORDS[i + 1][0] === '?' ? KERN_Q : SPACE);
    let total = 0;
    for (let i = 0; i < WORDS.length; i++) {
      total += w[i];
      if (i < WORDS.length - 1) total += gapAfter(i);
    }
    // Bố cục bất đối xứng: khối chữ lệch trái so với tâm khung, chừa chỗ
    // bên phải cho con trỏ compa (TREATMENT § Typography — không căn giữa tất cả).
    const x0 = W * 0.50 - total * 0.5 - 92;
    const xs = [];
    let x = x0;
    for (let i = 0; i < WORDS.length; i++) {
      xs.push(x);
      x += w[i];
      if (i < WORDS.length - 1) x += gapAfter(i);
    }
    this.metrics = { xs, w, x0, right: x0 + total };
    this.metricsFontOk = ok;
    return this.metrics;
  }

  render(g, t) {
    // Nền navy gần như đen tuyệt đối — cắt cứng, tất cả biến mất.
    g.fillStyle = C.navy;
    g.fillRect(0, 0, W, H);
    if (t < A || t >= END) return;

    const m = this.layout(g);

    // ---- CHỮ: đứng yên tuyệt đối, chỉ alpha đổi ----
    g.save();
    g.font = FONT;
    g.textAlign = 'left';
    g.textBaseline = 'alphabetic';
    g.fillStyle = C.bone;                   // bone sắc, KHÔNG bloom, không viền
    for (let i = 0; i < WORDS.length; i++) {
      const a = clamp((t - WORDS[i][1]) / FADE);
      if (a <= 0) continue;
      g.globalAlpha = a;                    // fade-in tại chỗ, không dịch chuyển
      g.fillText(WORDS[i][0], m.xs[i], BASE_Y);
    }
    g.restore();

    // ---- ĐẦU COMPA: con trỏ văn bản đang chờ, rồi lùi lấy đà ----
    // Đứng ở ngay sau chữ, cao ngang thân chữ.
    const cx0 = m.right + 46;
    const cy0 = BASE_Y - SIZE * 0.30;

    // Lùi lấy đà: kéo RA XA khỏi mặt giấy — lên trên + sang phải, quầng sáng
    // nở ra (vật lại gần nguồn sáng / rời tiêu cự). Điểm lấy đà nằm chếch
    // trên-phải so với chỗ sẽ đóng dấu ở P7 (W*0.325, H*0.47), nên cú lao
    // xuống của P7 là một đường chéo xuống-trái hợp lý.
    const pull = prog(t, T_PULL, END, inOutCubic);
    const cx = lerp(cx0, W * 0.585, pull);
    const cy = lerp(cy0, H * 0.190, pull);

    // Nhấp nháy chậm như con trỏ (chu kỳ 0.86s). Đáy 0.34, KHÔNG tắt hẳn:
    // đầu compa là thứ sáng nhất khung hình ở MỌI frame (TREATMENT § M1).
    const ph = ((t - A) / 0.86) % 1;
    const blink = ph < 0.58 ? 1 : 0.34;
    // Nhấp nháy CHỈ trong pha chờ. Từ T_PULL trở đi nó sáng đều và tăng dần:
    // đầu compa phải là thứ sáng nhất khung hình ở MỌI frame (TREATMENT § M1).
    const lit = prog(t, T_PULL, T_PULL + 0.10);
    const alpha = lerp(blink, 1, lit);
    const glow  = lerp(1.0, 2.8, pull);
    const r     = lerp(5.5, 7.6, pull);
    point(g, cx, cy, { r, glow, alpha });

    // ---- MASCOT: bước vào từ mép trái ở 16.4s, pose `shrug` ----
    // Đứng THẤP bên trái, không che chữ. Pose đắt nhất cả video — sắc nét tuyệt đối.
    if (t >= 14.50) {
      const step = prog(t, 14.50, 14.80, outCubic);
      const mh = H * 0.26;                       // ~26% chiều cao khung
      const x = lerp(-mh * 0.45, W * 0.132, step);
      this.mascot.draw(g, 'shrug', x, H * 0.972, mh, { alpha: 0.96, ring: 4 });
    }
  }
}
