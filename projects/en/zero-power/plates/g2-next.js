// g2 · Next time (p2 câu 105–110, cuối video). Hai trang màn cuộn:
//   0 (105–107)  phím "!" bấm xuống → 0! = 1 (lam) · thanh ghi × [1] "PRODUCT OF NO NUMBERS" · "WHERE HAVE WE SEEN THAT?"
//   1 (108–110)  "THANK YOU FOR WATCHING" · câu hỏi bình luận "0^0 = 1, 0, OR UNDEFINED?" · biển kênh
//                "99% FROM SCRATCH" + phím "SUBSCRIBE" (ma trận điểm lớn) — đứng yên tới hết trang (≥ 4 s). Pose wave.
import { W, C, smooth, prog, ground, ink, card, dm, dmW, annunciators, register, dots, figure, lookup, must } from '../kit.js';

const PAGE = 1080;

export default class Next {
  static ERA = 'lcd';
  static IMAGES = {};
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'g2');
    this.T = {
      s105: L(105).start, notice: w(105, 'notice'), e105: L(105).end,
      zero106: w(106, 'zero'), fact: w(106, 'factorial'), one: w(106, 'one'), product: w(106, 'product'), numbers: w(106, 'numbers'),
      where: w(107, 'where'), before: w(107, 'before'),
      thank: w(108, 'thank'), end: w(108, 'end'),
      zero109: w(109, 'zero'), one109: w(109, 'one'), zz109: w(109, 'zero', 3), undef: w(109, 'undefined'), tell: w(109, 'tell'),
      comments: w(109, 'comments'), subscribe: w(110, 'subscribe'), e110: L(110).end,
    };
    this.START = L(105).start; this.FROM = this.START - 1.2;
    this.PAN = L(108).start - 0.5;
    this.WAVE = [this.T.thank + 0.9, this.T.subscribe + 1.0];      // 7.6 s, ra xong trước khi biển đứng yên ≥ 4 s
    this.V = { f0: must('1', 1) };                                   // 0! = tích rỗng = 1 (JS không có giai thừa; giá trị định nghĩa)
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.one, kind: 'beep' }, { t: T.where, kind: 'tick' },
      { t: T.zero109, kind: 'question' }, { t: T.subscribe, kind: 'beep' },
    ];
  }
  render(g, t) {
    const T = this.T, cy = PAGE * smooth(prog(t, this.PAN, this.PAN + 0.9));
    ground(g);
    ink(g, d => {
      annunciators(d, ['×']);
      card(d, prog(t, this.FROM + 0.3, this.FROM + 1.1), 'ACT VI', 'NEXT TIME');
      d.save(); d.beginPath(); d.rect(0, 120, W, 960); d.clip(); d.translate(0, -cy);
      this.page0(d, t); this.page1(d, t);
      d.restore();
    });
    const [a, b] = this.WAVE, kin = prog(t, a - 0.2, a + 0.15), out = smooth(prog(t, b, b + 0.45));
    if (kin > 0 && out < 1) figure(g, 'wave', 1640, 1080 + 820 * out, 760, kin);
  }

  // ── trang 0: phím "!" ──
  page0(d, t) {
    const T = this.T;
    if (t > this.PAN + 1.2) return;
    // phím: viền chấm khi chờ, bấm (lún 8 px) đúng "notice"
    const kx = 132, ky = 190, kw = 200, kh = 150;
    const press = prog(t, T.notice - 0.05, T.notice + 0.08) - prog(t, T.notice + 0.2, T.notice + 0.35), dy = 8 * press;
    if (t < T.notice - 0.4) {
      const c = `rgba(${C.inkRGB},0.25)`, k = prog(t, this.FROM + 0.3, this.FROM + 1.0);
      dots(d, kx, ky, kx + kw, ky, c, { step: 12, k }); dots(d, kx, ky + kh, kx + kw, ky + kh, c, { step: 12, k });
      dots(d, kx, ky, kx, ky + kh, c, { step: 12, k }); dots(d, kx + kw, ky, kx + kw, ky + kh, c, { step: 12, k });
      dm(d, '!', kx + kw / 2, ky + 33, 12, `rgba(${C.inkRGB},0.25)`, { align: 'center' });
    } else {
      d.fillStyle = C.ink; d.fillRect(kx, ky + dy, kw, kh); d.fillRect(kx + 6, ky + kh + dy, kw - 6, 10 - dy);
      d.save(); d.globalCompositeOperation = 'xor';
      dm(d, '!', kx + kw / 2, ky + 33 + dy, 12, C.ink, { align: 'center', ghost: false });
      d.restore();
    }
    // 0! = 1
    // ô chờ từ FROM + 0.3: "0! = ?" mờ và khung thanh ghi viền chấm
    const kw0 = prog(t, this.FROM + 0.3, this.FROM + 1.0);
    if (t <= T.zero106 - 0.1 && kw0 > 0) dm(d, '0! = ?', 420, 206, 14, `rgba(${C.inkRGB},0.18)`, { k: kw0 });
    if (t <= T.product - 0.2 && kw0 > 0) {
      const c = `rgba(${C.inkRGB},0.25)`, x = 132, y = 458, w = 196, h = 90;
      dots(d, x, y, x + w, y, c, { step: 12, k: kw0 }); dots(d, x, y + h, x + w, y + h, c, { step: 12, k: kw0 });
      dots(d, x, y, x, y + h, c, { step: 12, k: kw0 }); dots(d, x + w, y, x + w, y + h, c, { step: 12, k: kw0 });
      dots(d, 380, 536, 1010, 536, c, { step: 12, k: kw0 });
    }
    if (t > T.zero106 - 0.1) {
      dm(d, [['0! = ', C.ink], [t >= T.one - 0.05 ? String(this.V.f0) : ' ', C.one]], 420, 206, 14, C.ink, { k: prog(t, T.zero106 - 0.1, T.one) });
      if (t > T.one) dm(d, 'TOO', 420 + dmW('0! = 1 ', 14), 252, 6, C.dim, { k: prog(t, T.one, T.one + 0.4) });
    }
    // thanh ghi × [1] = tích của không số nào
    const kr = prog(t, T.product - 0.2, T.product + 0.4);
    register(d, 132, 470, '×', 1, C.one, { k: kr });
    if (t > T.product - 0.1) dm(d, 'PRODUCT OF NO NUMBERS', 380, 494, 6, C.ink, { k: prog(t, T.product - 0.1, T.numbers + 0.5) });
    // câu hỏi
    if (t > T.where - 0.1) dm(d, 'WHERE HAVE WE SEEN THAT?', 132, 720, 8, C.ink, { k: prog(t, T.where - 0.1, T.before + 0.4) });
    else dots(d, 132, 790, 1290, 790, `rgba(${C.inkRGB},0.2)`, { step: 12, k: prog(t, this.FROM + 0.5, this.START + 1) });
    if (t > T.before) dm(d, 'NOTICE IT ON YOUR OWN', 132, 830, 4, C.dim, { k: prog(t, T.before, T.before + 0.8) });
  }

  // ── trang 1: câu hỏi bình luận + biển kênh ──
  page1(d, t) {
    const T = this.T, y0 = PAGE;
    if (t < this.PAN - 0.2) return;
    dm(d, 'THANK YOU FOR WATCHING', 132, y0 + 160, 4, C.dim, { k: prog(t, T.thank - 0.1, T.end + 0.2) });
    // câu hỏi: 1 lam, 0 gỉ, UNDEFINED mực — sáng theo từng từ
    const q = [['0^0^ = ', C.ink], ['1', C.one], [', ', C.ink], ['0', C.zero], [', OR UNDEFINED?', C.ink]];
    if (t < T.zero109 - 0.2) dots(d, 132, y0 + 290, 1260, y0 + 290, `rgba(${C.inkRGB},0.2)`, { step: 12 });
    else dm(d, q, 132, y0 + 236, 8, C.ink, { k: (5 * prog(t, T.zero109 - 0.2, T.one109 - 0.1) + (t >= T.one109 - 0.05 ? 1 : 0) + 3 * prog(t, T.one109, T.zz109 + 0.05) + 15 * prog(t, T.zz109 + 0.1, T.undef + 0.5)) / 24 });
    if (t > T.tell - 0.1) dm(d, 'TELL ME IN THE COMMENTS', 132, y0 + 336, 5, C.ink, { k: prog(t, T.tell - 0.1, T.comments + 0.4) });
    dots(d, 132, y0 + 430, 1270, y0 + 430, `rgba(${C.inkRGB},0.3)`, { step: 10, k: prog(t, this.PAN + 0.4, this.PAN + 1.2) });
    // biển kênh — gõ vào ở "thank you", rồi ĐỨNG YÊN
    dm(d, '99% FROM SCRATCH', 132, y0 + 500, 12, C.ink, { k: prog(t, T.thank + 0.1, T.end + 0.3) });
    const s = 'SUBSCRIBE', p = 10, bw = dmW(s, p) + 80, bx = 132, by = y0 + 700, bh = 7 * p + 60;
    if (t < T.subscribe - 0.1) {
      const c = `rgba(${C.inkRGB},0.25)`;
      dots(d, bx, by, bx + bw, by, c, { step: 12 }); dots(d, bx, by + bh, bx + bw, by + bh, c, { step: 12 });
      dots(d, bx, by, bx, by + bh, c, { step: 12 }); dots(d, bx + bw, by, bx + bw, by + bh, c, { step: 12 });
      dm(d, s, bx + 40, by + 30, p, `rgba(${C.inkRGB},0.18)`);
    } else {
      const k = prog(t, T.subscribe - 0.1, T.subscribe + 0.45);
      d.strokeStyle = C.ink; d.lineWidth = 6; d.strokeRect(bx, by, bw, bh);
      dm(d, s, bx + 40, by + 30, p, C.ink, { k });
    }
  }
}
