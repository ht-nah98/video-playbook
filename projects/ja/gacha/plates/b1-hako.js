// b1 · 100回の箱 (p2, câu 0–5) — MỞ HỒI 1 (actCard). DNA ACT 1: 100 viên xếp lưới, 55% trắng tay; không có viên vàng nào (0.6 viên).
//  câu 0  「表の数字どおり、毎回 0.6%」: cột trái 毎回 / 0.6% sky, khoanh ở 「計算」
//  câu 1  100回 → 100個の箱: lưới 100 viên đổ từ hàng dưới (capsuleGrid, KHÔNG viên vàng)
//  câu 2–3 cột phải: viên vàng bị cắt còn 60% trong khung nét đứt (= 0.6個), thước 0.6 < 1個; vòng quét trên lưới: không thấy ánh vàng nào
//  câu 4  0.994¹⁰⁰ ≈ 55%: 55 viên chuyển trắng xám dần (cùng tập chỉ số với a0-open: order(100, 3))
//  câu 5  「いちばんありそうな結果」: vòng mực quanh 55 viên trắng tay + 「何も出ない」
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, dark, telop, write, measure,
  capsule, capsuleGrid, heading, actCard, actCue, atLeastOne, CROWD, push } from '../kit.js';
import { out, underline, ring, order, fillGaps } from './g2-util.js';

export default class Hako {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      suuji: w(0, '数字'), mai: w(0, '毎回'), p06: w(0, '0.6%'), keisan: w(0, '計算'),
      l1: S(1), hyaku1: w(1, '100回'), hyakko: w(1, '100個'), hako: w(1, '箱'), narabe: w(1, '並べて'),
      l2: S(2), hikaru: w(2, '光る'), heikin: w(2, '平均'), ko06: w(2, '0.6個'),
      l3: S(3), ikko: w(3, '1個'), todokanai: w(3, '届きません'),
      l4: S(4), hazureru: w(4, '外れる'), kakuritsu: w(4, '確率'), v994: w(4, '0.994'), n100b: w(4, '100回', 2), kaketa: w(4, 'かけた'), oyoso: w(4, 'およそ'), p55: w(4, '55%'),
      l5: S(5), ichiban: w(5, 'いちばん'), kekka: w(5, '結果'), nani: w(5, '何'), dena: w(5, '出ない'), end: E(5),
    };
    this.START = S(0);
    this.FROM = this.START - 2.6;                       // cảnh đầu p2 (sau intro) — mở hồi
    this.KO06 = must('100 * 0.006', 0.6);
    this.NONE = must(`Math.round((1 - ${atLeastOne(100)}) * 100)`, 55);
    this.B55 = order(hash, 100, 3).slice(0, this.NONE);      // cùng tập "trắng tay" với a0-open (câu 5 cold open)
    must(`${this.B55.length}`, this.NONE);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([actCue(this.FROM, this.START),
      c(T.suuji, 'pen'), c(T.p06, 'pen'), c(T.keisan, 'tick'),
      c(T.hyaku1, 'pen'), c(T.hako - 0.3, 'chip'), c(T.narabe + 0.2, 'chip'),
      c(T.hikaru, 'shimmer'), c(T.ko06, 'pen'), c(T.todokanai, 'tick'),
      c(T.hazureru, 'pen'), c(T.v994, 'tick'), c(T.p55, 'pen'),
      c(T.ichiban, 'pen'), c(T.kekka, 'tick'), c(T.dena, 'pen')], this.FROM, 3.9, false);
  }
  /** Telop đáy khung (y 955): vào ở a, trượt xuống khỏi khung sau b. */
  cap(g, t, a, b, parts, size = 54) {
    if (t < a - 0.1 || t > b + 0.1) return;
    const dy = 220 * outCubic(clamp((t - b + 0.45) / 0.4));
    g.save(); g.translate(0, dy); telop(g, parts, 960, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 1, '100回の箱', prog(t, this.START + 1.0, this.START + 2.2));
    // viên nang rải sàn (ảnh sản phẩm): dạt ra khi lưới đổ vào
    [[180, 872, 46, 0.4, 'pink'], [440, 892, 34, -0.5, 'mint'], [1500, 888, 40, 0.8, 'lav']].forEach(([x, y, r, a, tn], i) =>
      capsule(g, x, y, r, prog(t, this.START + 1.4 + i * 0.25, this.START + 1.9 + i * 0.25), { tone: tn, rot: a + 0.12 * Math.sin(t * 0.8 + i) }));
    // ── cột trái: 毎回 0.6% ──
    const dyL = 700 * out(t, T.ichiban - 0.2, 0.7);
    g.save(); g.translate(0, dyL);
    write(g, '毎回', 338, 380, prog(t, T.mai, T.mai + 0.3), { font: `700 52px ${MIN}`, color: '@dim', align: 'center' });
    write(g, `${must('0.006 * 100', 0.6)}%`, 338, 570, prog(t, T.p06 - 0.1, T.p06 + 0.5), { font: `700 170px ${MIN}`, color: '@sky', align: 'center' });
    ring(g, 338, 524, 250, 100, prog(t, T.keisan, T.keisan + 0.7));
    g.restore();
    this.cap(g, t, T.suuji - 0.1, T.l1 - 0.1, [['表の数字どおり、毎回 '], ['0.6%', undefined, '@sky']]);
    // ── lưới 100 viên ──
    const box = { x: 625, y: 215, w: 670, h: 670 };
    const kPour = prog(t, T.hyaku1, T.narabe + 0.9);
    const flip = this.B55.filter((_, j) => t >= T.kakuritsu + 0.2 + (j / this.NONE) * (T.p55 + 0.4 - T.kakuritsu - 0.2));
    g.save(); push(g, 1 + 0.045 * smooth(prog(t, T.l1, T.end)), 960, 550);
    const G = capsuleGrid(g, t < T.hyaku1 - 0.2 ? { x: -999, y: -999, w: 670, h: 670 } : box, 100, [], t < T.hyaku1 - 0.2 ? 0 : Math.max(kPour, 0.0001), { cols: 10, seed: 3, glints: false, blank: flip });
    // vòng quét (câu 2): không viên nào vàng
    const ks = prog(t, T.hikaru, T.l3 + 0.2);
    if (ks > 0 && ks < 1) { const i = Math.floor(ks * 99.99), [x, y] = G.pos(i), ii = ((i * 37) % 100);
      for (let q = 0; q < 6; q++) { const j = (ii + q * 17) % 100, [px, py] = G.pos(j); g.strokeStyle = `rgba(43,42,51,${0.55 - q * 0.08})`; g.lineWidth = 3; g.beginPath(); g.arc(px, py, G.r * 1.18, 0, TAU); g.stroke(); } }
    // vòng mực quanh 55 viên trắng tay (câu 5)
    this.B55.forEach((i, j) => { const k = prog(t, T.kekka + j * 0.012, T.kekka + 0.35 + j * 0.012); if (k <= 0) return; const [x, y] = G.pos(i);
      g.strokeStyle = C.ink; g.globalAlpha = 0.6 * k; g.lineWidth = 3; g.beginPath(); g.arc(x, y, G.r * 1.12, 0, TAU); g.stroke(); g.globalAlpha = 1; });
    g.restore();
    this.cap(g, t, T.hyaku1 - 0.1, T.hikaru - 0.2, [['100回のガチャ ＝ 100個の箱']]);
    // ── cột phải câu 2–3: viên vàng 60% ──
    const dyR = 760 * out(t, T.hazureru - 0.3, 0.7);
    if (t > T.hikaru - 0.3 && dyR < 760) {
      g.save(); g.translate(0, dyR);
      const cx = 1577, cy = 520, r = 96, k60 = prog(t, T.ko06 - 0.5, T.ko06 + 0.5);
      const kk = prog(t, T.hikaru - 0.1, T.hikaru + 0.4);
      g.setLineDash([8, 10]); g.strokeStyle = C.mute; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, (r + 8) * outCubic(kk), 0, TAU); g.stroke(); g.setLineDash([]);
      g.save(); g.beginPath(); g.rect(cx - r - 20, cy - r - 20, (this.KO06 * 2 * r + 20) * outCubic(k60) + (1 - outCubic(k60)) * 0, 2 * r + 40); g.clip();
      capsule(g, cx, cy, r * outCubic(Math.min(1, kk * 1.2)), 1, { gold: true, ground: false, glow: 0 }); g.restore();
      write(g, '光る箱', cx, 330, prog(t, T.hikaru, T.hikaru + 0.4), { font: `700 48px ${MIN}`, align: 'center' });
      write(g, `${this.KO06}個`, cx, 740, prog(t, T.ko06 - 0.1, T.ko06 + 0.5), { font: `700 110px ${MIN}`, color: '@gold', align: 'center' });
      // thước: 0.6 so với 1個
      const kr = prog(t, T.ikko - 0.1, T.ikko + 0.6);
      if (kr > 0) { const x0 = cx - r, x1 = cx + r, y = cy + 150;
        g.strokeStyle = C.mute; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + 2 * r * outCubic(kr), y); g.stroke();
        [x0, x1].forEach(x => { g.beginPath(); g.moveTo(x, y - 12); g.lineTo(x, y + 12); g.stroke(); });
        write(g, '1個', x1 + 22, y + 10, kr, { font: `700 44px ${MIN}`, color: '@dim' }); }
      g.restore();
    }
    this.cap(g, t, T.heikin - 0.1, T.ikko - 0.15, [['光る箱は 平均 '], [`${this.KO06}個`, undefined, '@gold']]);
    this.cap(g, t, T.ikko - 0.1, T.hazureru - 0.3, [['1個にも届かない']]);
    // ── cột phải câu 4–5: 0.994¹⁰⁰ ≈ 55% ──
    if (t > T.hazureru - 0.2) {
      const kin = out(t, T.hazureru - 0.3, 0.7), x0 = 1577 - 190, fb = `700 92px ${MIN}`, fe = `700 52px ${MIN}`;
      g.save(); g.translate((1 - kin) * 700, 0);
      write(g, '100回すべて外れる', 1577, 330, prog(t, T.hazureru - 0.1, T.hazureru + 0.5), { font: `700 44px ${MIN}`, color: '@dim', align: 'center' });
      write(g, '0.994', x0, 520, prog(t, T.v994 - 0.1, T.v994 + 0.4), { font: fb });
      const wb = measure(g, '0.994', fb);
      write(g, '100', x0 + wb + 6, 520 - 46, prog(t, T.n100b - 0.1, T.n100b + 0.3), { font: fe });
      write(g, [['≈ ', `700 90px ${JP}`], [`${this.NONE}%`, `700 150px ${MIN}`]], 1577, 720, prog(t, T.p55 - 0.15, T.p55 + 0.5), { align: 'center' });
      g.restore();
    }
    this.cap(g, t, T.kakuritsu - 0.2, T.ichiban - 0.2, [['100回すべて外れる確率']]);
    // ── cột trái câu 5: 何も出ない ──
    if (t > T.ichiban - 0.2) {
      const kin = out(t, T.nani - 0.4, 0.7);
      g.save(); g.translate((1 - kin) * -700, 0);
      write(g, '何も出ない', 338, 560, prog(t, T.dena - 0.1, T.dena + 0.6), { font: `700 80px ${MIN}`, align: 'center' });
      underline(g, 128, 548, 600, prog(t, T.dena + 0.6, T.dena + 1.1));
      g.restore();
    }
    this.cap(g, t, T.ichiban - 0.1, T.end + 4, [['いちばんありそうな結果']]);
    actCard(g, t, F, this.START, 1);
    dark(g, outCubic(prog(t, F, F + 1.6)));
  }
}
