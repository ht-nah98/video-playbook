// P22 unique — "Đúng một đáp án" · 168.58 → 186.88 (TREATMENT P22, final rap)
// 168.58 cymbal: sáng lại. Lưới toạ độ của trang sổ P19 giờ là lưới neon trên nền tối, cùng hệ G của điệp khúc 2.
// "And if the curve never turns around": camera NGỒI trên đường mũ như tàu lượn, đường cong vạch ra dưới bánh xe.
// "every positive target gets exactly one way found": tia laser ngang quét lên — mỗi độ cao chạm đường cong đúng
// MỘT điểm. "One height / One crossing / One exponent there": ba con dấu ở v = 4, điểm (2, 4), u = 2 — nhân vật chỉ
// xuống. "No second answer waiting anywhere": nhánh ma đỏ thử quay đầu để cắt lần hai — nhân vật giơ tay chặn, gạch
// chéo, nhánh ma rút về. "That's why the question had an answer from the start": thầy cầm phấn, bảng đen viết lời
// giải. "Not because a textbook declared that part": sách giáo khoa mở ra, đóng sập ở "declared", vỡ thành ký hiệu.
// "Follow the curve / the law / the reason": ba cú tăng tốc, sao chổi chạy dọc đường cong mỗi lần nhanh hơn.
// "What looked like two ideas — was one idea seen from two views": hai khung (mũ | log) trượt vào nhập làm một
// đồ thị có cả hai đường và gương — đúng khung mở P23.
import { clamp, prog, smooth, lerp, outBack, outExpo, hash } from '../../../../engine/lib.js';
import { burstText } from '../../../../engine/lyric.js';
import { shatter } from '../../../../engine/morph.js';
import { PAL, MIRROR } from '../song.js';
import { figure, footer } from '../kit.js';
import { presence } from '../../../../engine/transit.js';
import { G, OY, curve, graph } from '../chorus2.js';
import { hand } from '../paper.js';

const U0 = -5.8, U1 = 2.75;
const kOf = (u) => (u - U0) / (U1 - U0);              // tiến độ curve() tới u
const MID = [1660, 1230, 900];                         // nhân vật khung trung, góc phải dưới
const BOARD = { x: 110, y: 80, w: 1000, h: 470 };
// nhánh ma: rời đường mũ ở u = 2.2, vồng lên rồi quay đầu cắt lại v = 4 (điều mà đường mũ không bao giờ làm)
const ghostV = (s) => 2 ** 2.2 + 1.2 * Math.sin(Math.PI * s) - 1.6 * s;
const GHOST = Array.from({ length: 40 }, (_, i) => G(2.2 + 1.6 * i / 39, ghostV(i / 39)));
const GHOST_X = (() => { let s = 0.5; while (ghostV(s) > 4) s += 0.005; return G(2.2 + 1.6 * s, 4); })();

export default class P22 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    const L = (x) => s.tl.line(x);
    this.ride = L('And if the curve'); this.never = L('never turns around,'); this.every = L('every positive target');
    this.gets = L('gets exactly one way found.'); this.h1 = L('One height.'); this.c1 = L('One crossing.'); this.e1 = L('One exponent there.');
    this.no2 = L('No second answer'); this.wait = L('waiting anywhere.'); this.why = L("That's why the question");
    this.had = L('had an answer from the start.'); this.notb = L('Not because a textbook'); this.decl = L('declared that part.');
    this.fc = L('Follow the curve.'); this.fl = L('Follow the law.'); this.fr = L('Follow the reason through.');
    this.two = L('What looked like two ideas—'); this.one = L('was one idea'); this.views = L('seen from two views.');
    this.next = s.tl.at('Run it forward,', 3);
    this.kicks = [this.fc.start, this.fl.start, this.fr.start];
    this.slam = this.decl.start;                                   // sách đóng sập
  }
  backdropAt(t) {
    const on = smooth(prog(t, this.t0, this.t0 + 0.3));
    return { glow: lerp(0.45, 1, on), haloX: 960, haloY: lerp(480, 600, smooth(prog(t, this.two.start, this.next))), bokeh: 0.5 * on };   // quầng về chỗ của P23
  }
  /** Tàu lượn: u của toa trên đường cong. */
  uRide(t) { return lerp(-4.2, 2.2, smooth(prog(t, this.t0, this.never.end + 0.3))); }
  camera(t) {
    const u = this.uRide(t), [px, py] = G(u, 2 ** u), e = smooth(prog(t, this.never.end, this.every.start + 0.55));
    const ride = { s: 2.1, x: 960 - px, y: 600 - py, r: 0.5 * Math.atan(Math.LN2 * 2 ** u), cx: px, cy: py };
    let kick = 0, rk = 0;
    this.kicks.forEach((k, i) => { const d = 1 - smooth(prog(t, k, k + 0.45)); if (t >= k) { kick += 0.1 * (1 + 0.5 * i) * d; rk += (i % 2 ? -1 : 1) * 0.025 * d; } });
    return { s: lerp(ride.s, 1, e) + kick, x: lerp(ride.x, 0, e), y: lerp(ride.y, 0, e), r: lerp(ride.r, 0, e) + rk,
      cx: lerp(px, 960, e), cy: lerp(py, 540, e), bg: 0 };
  }
  render(g, t) {
    // cymbal 168.58: loé trắng ngắn
    const fl = 1 - prog(t, this.t0, this.t0 + 0.18);
    if (t < this.two.start) {
      graph(g, { k: lerp(kOf(this.uRide(t)), 1, smooth(prog(t, this.never.end, this.never.end + 0.4))) });   // phần cuối đường cong vạch nốt, không bật ra
      this.cart(g, t); this.laser(g, t); this.stamps(g, t); this.ghost(g, t); this.comets(g, t);
      this.board(g, t); this.book(g, t);
    } else this.split(g, t);
    if (t < this.two.start + 0.35) this.follow(g, t);              // REASON vỡ ở "What looked…" — vẽ tiếp tới hết cú vỡ
    // nhân vật: chỉ xuống → giơ tay chặn → cầm phấn → mời đi theo
    const P = (a, b) => presence(t, a, b, { inDur: 0.25, outDur: 0.35 });
    figure(g, this.m, 'down', ...MID, 'rows', P(this.h1.start - 0.15, this.no2.start - 0.2), { t, seed: 41 });
    figure(g, this.m, 'halt', ...MID, 'burn', P(this.no2.start - 0.05, this.why.start - 0.2), { t, seed: 42 });
    figure(g, this.m, 'chalk', ...MID, 'columns', P(this.why.start - 0.05, this.fc.start - 0.25), { t, seed: 43 });
    figure(g, this.m, 'invite', ...MID, 'digits', P(this.fc.start - 0.05, this.two.start - 0.1), { t, seed: 44 });
    if (fl > 0) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(244,241,234,${0.5 * fl})`; g.fillRect(0, 0, 1920, 1080); g.restore(); }
    footer(g, this.tl, t, ['curve', 'never', 'positive', 'one', 'height', 'crossing', 'exponent', 'second', 'question', 'answer', 'start', 'textbook', 'declared', 'follow', 'law', 'reason', 'two', 'ideas', 'views'],
      { from: this.t0, carry: true });
  }
  /** Toa tàu lượn: chấm sáng + vệt, mũi tên chỉ hướng đi (không bao giờ quay đầu). */
  cart(g, t) {
    if (t >= this.every.start + 0.6) return;
    const u = this.uRide(t), [x, y] = G(u, 2 ** u), a = Math.atan2(-Math.LN2 * 2 ** u, 1);
    g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 30;
    g.beginPath(); g.moveTo(34, 0); g.lineTo(-18, -22); g.lineTo(-8, 0); g.lineTo(-18, 22); g.closePath(); g.fill(); g.restore();
  }
  /** Laser ngang quét lên: v = 2^w, w từ −2 tới 2; giao điểm duy nhất loé "1". Dừng ở v = 4. */
  laser(g, t) {
    const k = prog(t, this.every.start, this.gets.end - 0.05, smooth), out = this.why.start;
    if (k <= 0 || t >= out + 0.3) return;
    const v = 2 ** lerp(-2, 2, k), u = Math.log2(v), [px, py] = G(u, v), kr = smooth(prog(t, out, out + 0.3));   // bảng đen vào: tia co về điểm cắt
    g.save(); g.strokeStyle = PAL.truth; g.lineWidth = 4; g.shadowColor = PAL.fwdCore; g.shadowBlur = 24;
    g.beginPath(); g.moveTo(lerp(-600, px, kr), py); g.lineTo(lerp(2600, px, kr), py); g.stroke();
    g.fillStyle = PAL.fwdCore; g.beginPath(); g.arc(px, py, 16 * (1 - kr), 0, Math.PI * 2); g.fill();
    const one = t >= this.gets.words[2].start, pop = one ? outBack(clamp((t - this.gets.words[2].start) / 0.2)) : 1;
    g.shadowBlur = 0;
    g.save(); g.translate(px - 60, py - 60); g.scale(one ? 1 + 0.5 * pop * (1 - prog(t, this.gets.words[2].start + 0.2, this.gets.words[2].start + 0.5)) : 1, 1);
    burstText(g, '1', t, out, 0, 23, '900 64px "Archivo"', one ? PAL.fwd : PAL.truth, { seed: 46, align: 'center' }); g.restore();
    // "One exponent there": đường thả xuống trục, nhãn 2
    const d = prog(t, this.e1.start, this.e1.start + 0.35, outExpo);
    if (d > 0) {
      g.setLineDash([14, 10]); g.strokeStyle = PAL.fwd; g.lineWidth = 4; g.shadowBlur = 0;
      g.beginPath(); g.moveTo(px, py); g.lineTo(px, lerp(lerp(py, OY, d), py, kr)); g.stroke(); g.setLineDash([]);   // rút về cùng tia
      if (d >= 1) burstText(g, '2', t, out, px, OY + 82, '900 72px "Archivo"', PAL.fwd, { seed: 47, align: 'center' });
    }
    g.restore();
  }
  /** Ba con dấu đúng ba từ "One", vỡ thành ký hiệu khi bảng đen vào. */
  stamps(g, t) {
    const out = this.why.start;
    const S3 = [[this.h1, 'ONE HEIGHT', 330, 250, -0.08], [this.c1, 'ONE CROSSING', 1150, 130, 0.06], [this.e1, 'ONE EXPONENT', 600, 890, -0.05]];
    S3.forEach(([l, txt, x, y, rot], i) => {
      if (t < l.start) return;
      const pop = 1 + 0.6 * (1 - smooth(prog(t, l.start, l.start + 0.12))), s = pop * (1 - smooth(prog(t, out, out + 0.3)));
      g.save(); g.translate(x, y); g.rotate(rot);
      if (s > 0.01) { g.save(); g.scale(s, s); g.strokeStyle = PAL.fwd; g.lineWidth = 7; g.strokeRect(-200, -48, 400, 96); g.restore(); }
      burstText(g, txt, t, out, 0, 22 * Math.max(s, 0.3), '900 56px "Archivo"', PAL.fwd, { dur: 0.3, seed: 50 + i, align: 'center' });
      g.restore();
    });
  }
  /** Nhánh ma: đường cong thử quay đầu để cắt v = 4 lần hai; gạch chéo đỏ ở "anywhere", rồi rút về. */
  ghost(g, t) {
    const grow = prog(t, this.no2.start, this.no2.end + 0.3, smooth), back = prog(t, this.wait.end - 0.1, this.why.start + 0.2, smooth);
    const k = grow * (1 - back);
    if (k <= 0) return;
    const pts = GHOST;
    const n = Math.max(2, Math.ceil(pts.length * k));
    g.save(); g.strokeStyle = PAL.block; g.lineWidth = 6; g.setLineDash([16, 12]); g.globalAlpha = 0.9;
    g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < n; i++) g.lineTo(...pts[i]); g.stroke(); g.setLineDash([]);
    const q = GHOST_X;
    const qk = outBack(clamp((grow - 0.9) / 0.1)) * (1 - back);                  // "?" và dấu gạch co lại cùng nhánh ma
    if (qk > 0) { g.save(); g.translate(q[0], q[1] - 40); g.scale(qk, qk); g.font = '900 64px "Archivo"'; g.fillStyle = PAL.block; g.textAlign = 'center'; g.fillText('?', 0, 0); g.restore(); }
    const x = outBack(clamp((t - this.wait.words[1].start) / 0.18)) * (1 - back);
    if (x > 0) {
      g.lineWidth = 16; g.lineCap = 'round'; g.shadowColor = PAL.block; g.shadowBlur = 24;
      g.save(); g.translate(q[0], q[1]); g.scale(x, x); g.beginPath(); g.moveTo(-70, -70); g.lineTo(70, 70); g.moveTo(70, -70); g.lineTo(-70, 70); g.stroke(); g.restore();
    }
    g.restore();
  }
  /** Sao chổi chạy dọc đường mũ ở mỗi "Follow", mỗi lần nhanh hơn. */
  comets(g, t) {
    this.kicks.forEach((k0, i) => {
      const dur = 0.9 / (1 + 0.6 * i), k = prog(t, k0, k0 + dur);
      if (k <= 0 || k >= 1) return;
      for (let j = 0; j < 8; j++) {
        const u = lerp(-3.5, 2.7, clamp(k - j * 0.025)), [x, y] = G(u, 2 ** u);
        g.save(); g.globalAlpha = 1 - j / 8; g.fillStyle = j ? PAL.fwd : PAL.fwdCore; g.shadowColor = PAL.fwd; g.shadowBlur = 26;
        g.beginPath(); g.arc(x, y, 16 - j * 1.5, 0, Math.PI * 2); g.fill(); g.restore();
      }
    });
  }
  /** Bảng đen trượt vào từ trái; phấn viết lời giải; trượt ra ở "Follow the curve". */
  board(g, t) {
    const inK = prog(t, this.why.start, this.why.start + 0.35, outExpo), outK = prog(t, this.fc.start - 0.15, this.fc.start + 0.2, smooth);
    if (inK <= 0 || outK >= 1) return;
    const { x, y, w, h } = BOARD, dx = -(1 - inK) * 1300 - outK * 1300;
    g.save(); g.translate(dx, 0);
    g.fillStyle = '#16241F'; g.fillRect(x, y, w, h); g.strokeStyle = '#8A6B3E'; g.lineWidth = 14; g.strokeRect(x, y, w, h);
    const c = '#EDEBE3', w1 = this.why.words, w2 = this.had.words;
    hand(g, 'aˣ = y  (y > 0)', x + 60, y + 100, prog(t, w1[1].start, w1[3].start + 0.2), { col: c, size: 74 });
    hand(g, '→ exactly one x', x + 60, y + 220, prog(t, w1[3].start, w2[2].start + 0.2), { col: PAL.fwdCore, size: 74 });
    hand(g, 'x = logₐ y', x + 60, y + 350, prog(t, w2[2].start, w2[5].start + 0.3), { col: PAL.backCore, size: 90 });
    g.restore();
  }
  /** Sách giáo khoa: mở ra ở "Not because", đóng sập ở "declared", vỡ thành ký hiệu. */
  book(g, t) {
    const a = this.notb.words[3].start - 0.25;
    if (t < a) return;
    shatter(g, c => this.bookShape(c, t, a), prog(t, this.slam + 0.45, this.slam + 0.8), t, { seed: 45, cell: 10 });
  }
  bookShape(g, t, a) {
    const app = outBack(clamp((t - a) / 0.25)), shut = smooth(prog(t, this.slam - 0.05, this.slam + 0.12));
    g.save(); g.translate(760, 760); g.scale(app, app); g.rotate(-0.05);
    const W = 250, Hh = 300;
    g.fillStyle = '#7A2230'; g.fillRect(-W - 14, -Hh / 2 - 12, 2 * W + 28, Hh + 24);   // bìa
    g.fillStyle = PAL.paper; g.fillRect(-W, -Hh / 2, W, Hh);                             // trang trái
    g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('DEFINITION', -W / 2, -Hh / 2 + 40);
    g.font = '500 22px "IBM Plex Mono"'; ['logₐ y = x', 'iff aˣ = y.', '', 'Memorize.'].forEach((s, i) => g.fillText(s, -W / 2, -40 + i * 40));
    // trang phải lật sang trái (đóng sập): bề rộng cos
    const cs = Math.cos(Math.PI * shut);
    g.save(); g.scale(cs, 1);
    g.fillStyle = cs > 0 ? PAL.paper : '#7A2230'; g.fillRect(0, -Hh / 2, W, Hh);
    if (cs > 0) { g.fillStyle = PAL.ink; g.font = '600 26px "IBM Plex Mono"'; g.fillText('RULE 7.3', W / 2, -Hh / 2 + 40); g.font = '500 22px "IBM Plex Mono"'; g.fillText('log xy = log x + log y', W / 2, -10); }
    else { g.fillStyle = PAL.paper; g.font = '900 40px "Archivo"'; g.save(); g.scale(-1, 1); g.fillText('TEXTBOOK', -W / 2, 0); g.restore(); }
    g.restore();
    g.restore();
  }
  /** Ba chữ khổng lồ theo ba "Follow": CURVE · LAW · REASON (chữ mới giải mã, chữ cũ vỡ). */
  follow(g, t) {
    const W3 = [[this.fc, 'CURVE', PAL.fwd], [this.fl, 'LAW', PAL.truth], [this.fr, 'REASON', PAL.back]];
    W3.forEach(([l, s, col], i) => {
      const end = (W3[i + 1]?.[0].start) ?? this.two.start;   // hiện từ chữ "Follow", vỡ khi chữ sau vào
      if (t < l.start) return;
      const p = 1 + 0.4 * (1 - outBack(clamp((t - l.start) / 0.2)));
      g.save(); g.translate(960, 330); g.scale(p, p);
      burstText(g, s, t, end, 0, 90, '900 250px "Archivo"', col, { dur: 0.3, seed: 60 + i, align: 'center', alpha: 0.9 });
      g.restore();
    });
  }
  /** Nhãn hai đường (cùng chỗ trong mọi khung → nhập lại không nhảy); vỡ ở 0.3s cuối cảnh. */
  labels(g, t, e, l) {
    const F = '900 110px "Archivo"', tb = this.next - 0.3;
    const pop = (x, y, fn) => { const k = outBack(clamp((t - this.two.start) / 0.25)); g.save(); g.translate(x, y); g.scale(k, k); g.translate(-x, -y); fn(); g.restore(); };   // nảy vào khi hai khung tách
    if (e) pop(620, 230, () => burstText(g, '2ˣ', t, tb, 560, 260, F, PAL.fwd, { seed: 71 }));
    if (l) pop(1320, 660, () => burstText(g, 'log₂ x', t, tb, 1180, 690, F, PAL.back, { seed: 72 }));
  }
  /** Hai khung (mũ | log) trượt vào giữa, nhập làm một đồ thị có gương, nở ra toàn khung. */
  split(g, t) {
    const inK = prog(t, this.two.start, this.two.start + 0.35, outExpo), m = smooth(prog(t, this.one.start, this.one.words[2].start + 0.2));
    const grow = smooth(prog(t, this.views.start, this.next - 0.05));      // về đúng cỡ khung trước khi P23 nhận đồ thị
    const base = lerp(0.46, 1, grow), panel = (cx, sc, frame, fn, dy = 0) => {
      g.save(); g.translate(cx, 540 + dy); g.scale(sc, sc); g.translate(-960, -540);
      g.save(); g.beginPath(); g.rect(0, 0, 1920, 1080); g.clip(); fn(); g.restore();
      g.strokeStyle = PAL.truth; g.lineWidth = 6 / sc; g.globalAlpha = frame; g.strokeRect(0, 0, 1920, 1080);
      g.restore();
    };
    const off = lerp(470, 0, m), drop = (1 - inK) * 1100;
    if (m < 1) {   // khung trái = chính đồ thị toàn khung đang co lại; khung phải rơi vào từ dưới
      panel(lerp(960, 960 - off, inK), lerp(1, base, inK), inK * (1 - grow), () => { graph(g, { k: 1 }); this.labels(g, t, 1, 0); });
      panel(960 + off, base, 1 - grow, () => { graph(g, { k: 0, kl: 1 }); this.labels(g, t, 0, 1); }, drop * base);   // khung rơi cùng nội dung
    } else panel(960, base, 1 - grow, () => { graph(g, { k: 1, kl: 1, km: smooth(prog(t, this.views.start, this.views.start + 0.4)) }); this.labels(g, t, 1, 1); });
  }
}


