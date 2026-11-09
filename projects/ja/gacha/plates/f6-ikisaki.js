// f6 · お金の行き先 (p2 câu 140–144) — ERA studio. Dòng tiền: 私たち (điện thoại) → アプリストア → 運営会社; xu chạy theo luồng.
//  140 ba ô nghi vấn (nét đứt) + xu chạy xuyên qua 「どこへ？」 · 141 ô ストア hiện, giữ lại phần xu (手数料) · 142 thanh 100%: ストアの取り分 30% ·
//  143 ảnh Apple Japan, phần ストア co lại (không nêu số — chỉ 「それより低く」), bóng 30% nét đứt · 144 ô 運営会社 hiện, xu còn lại chất lên.
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, phone, photoTag, photoImages, rr, tone } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const shade = (g, fn, blur = 20, oy = 8, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const coin = (g, x, y, r) => { g.save(); g.translate(x, y); g.scale(1, 0.55); g.fillStyle = '#EFE7D8'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#B9AE98'; g.stroke(); g.restore(); };
const AX = 290, BX = 860, CX = 1480, NY = 585, BOXW = 340, BOXH = 250;       // ba nút trên một hàng
const STORE = '#E4C9A8', OPS = '#D3D9C5';

export default class Money {
  static ERA = 'studio';
  static IMAGES = photoImages('apple');
  init({ tl }) {
    const { L, w } = lookup(tl, 'f6');
    this.T = {
      l140: L(140).start, okane: w(140, 'お金'), doko: w(140, 'どこ'),
      l141: L(141).start, mazu: w(141, 'まず'), suu: w(141, '手数料'),
      l142: L(142).start, nihon: w(142, '日本'), n30: w(142, '30%'),
      l143: L(143).start, n2025: w(143, '2025年'), hikuku: w(143, '低く'),
      l144: L(144).start, nokori: w(144, '残り'), uriage: w(144, '売上'), end: L(144).end,
    };
    this.START = L(140).start;
    this.FROM = Math.max(this.START - 1.2, L(139).end + 0.5);
    must('Math.round(0.3 * 100)', 30);                              // CONTENT: 30% (trước 12/2025 ở Nhật)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'pop'), c(T.okane, 'coin'), c(T.doko, 'pen'), c(T.mazu, 'pen'), c(T.suu, 'coin'), c(T.suu + 0.7, 'chip'), c(T.nihon, 'pen'), c(T.n30, 'tick'),
      c(T.l143 + 0.1, 'card'), c(T.n2025, 'pen'), c(T.hikuku, 'tick'), c(T.nokori, 'pen'), c(T.nokori + 0.6, 'soroban'), c(T.uriage, 'coin')];
  }
  /** vị trí đồng xu n: thời điểm xuất phát, đã đi tới đâu, bị ストア giữ hay chạy tiếp. */
  flow(t, n) {
    const T = this.T, t0 = this.FROM + 0.6 + n * 0.34, tB = t0 + 0.95, tC = tB + 1.0;
    const share = tB < T.suu ? 0 : tB < T.l143 + 0.4 ? 0.3 : 0.15;
    const held = (n * 0.37 + 0.11) % 1 < share;
    if (t < t0) return null;
    if (t < tB) { const u = (t - t0) / 0.95; return { x: AX + 110 + (BX - BOXW / 2 - AX - 110) * u, y: NY - 40 * Math.sin(Math.PI * u), phase: 'AB' }; }
    if (held) return { arrived: 'B', t: tB };
    if (t < tC) { const u = (t - tB) / 1.0; return { x: BX + BOXW / 2 - 40 + (CX - BOXW / 2 + 40 - (BX + BOXW / 2 - 40)) * u, y: NY - 40 * Math.sin(Math.PI * u), phase: 'BC' }; }
    return { arrived: 'C', t: tC };
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 5, 'お金の行き先', prog(t, this.START + 0.1, this.START + 0.9));
    // nút A: 私たち
    phone(g, AX, NY - 150, prog(t, F + 0.3, F + 0.9), { s: 0.34, state: 'idle', t });
    write(g, '私たち', AX, NY + 205, prog(t, F + 0.5, F + 1.0), { font: `700 36px ${JP}`, color: '@dim', align: 'center' });
    // nút B (ストア) và C (運営会社): nét đứt (chưa biết) → nội dung
    const kB = prog(t, T.mazu - 0.1, T.mazu + 0.5), kC = prog(t, T.nokori - 0.1, T.nokori + 0.5);
    const node = (x, k, fill, label) => {
      const y = NY - BOXH / 2 + 10;
      if (k < 1) { g.save(); g.setLineDash([10, 9]); g.strokeStyle = 'rgba(92,86,72,0.5)'; g.lineWidth = 3; g.stroke(rr(x - BOXW / 2, y, BOXW, BOXH, 26)); g.restore();
        write(g, '？', x, y + 150, prog(t, F + 0.5, F + 1.0) * (1 - k), { font: `700 130px ${MIN}`, color: '@dim', align: 'center' }); }
      if (k > 0) { const e = outBack(clamp(k)); g.save(); g.translate(x, y + BOXH / 2); g.scale(e, e); g.translate(-x, -(y + BOXH / 2));
        shade(g, () => { g.fillStyle = C.white; g.fill(rr(x - BOXW / 2, y, BOXW, BOXH, 26)); }, 24, 10);
        g.fillStyle = fill; g.fill(rr(x - BOXW / 2, y, BOXW, 40, [26, 26, 0, 0]));
        write(g, label, x, y + BOXH - 26, 1, { font: `700 36px ${JP}`, align: 'center' }); g.restore(); }
    };
    node(BX, kB, STORE, 'アプリストア'); node(CX, kC, OPS, '運営会社');
    // đường dẫn
    g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 4; g.globalAlpha = 0.6;
    g.beginPath(); g.moveTo(AX + 110, NY); g.lineTo(BX - BOXW / 2 - 12, NY); g.moveTo(BX + BOXW / 2 + 12, NY); g.lineTo(CX - BOXW / 2 - 12, NY); g.stroke(); g.restore();
    // dòng xu
    let nB = 0, nC = 0;
    for (let n = 0; n < 90; n++) {
      const f = this.flow(t, n); if (!f) continue;
      if (f.arrived === 'B') nB++; else if (f.arrived === 'C') nC++; else coin(g, f.x, f.y - 14, 19);
    }
    const pile = (x, cnt, on) => { const m = Math.min(cnt, 18); for (let i = 0; i < m; i++) coin(g, x - 70 + (i % 3) * 70, NY + 22 - Math.floor(i / 3) * 16, 29); };
    if (kB > 0.6) pile(BX, nB, true); if (kC > 0.6) pile(CX, nC, true);
    // thanh 100%: phần ストア (142) → co lại (143)
    if (t > T.l142 - 0.2) {
      const bx = 130, by = 275, bw = 700, bh = 56, k = prog(t, T.nihon - 0.2, T.nihon + 0.6);
      const shrink = outCubic(prog(t, T.n2025, T.hikuku + 0.5)), sw = bw * 0.3 * (1 - 0.3 * shrink);
      write(g, 'ストアの取り分', bx, by - 22, k, { font: `700 36px ${JP}` });
      g.save(); g.beginPath(); g.rect(bx, by, bw * outCubic(k), bh); g.clip();
      shade(g, () => { g.fillStyle = OPS; g.fill(rr(bx, by, bw, bh, 14)); }, 10, 4);
      g.fillStyle = STORE; g.fill(rr(bx, by, sw + 14, bh, [14, 0, 0, 14])); g.restore();
      g.fillStyle = STORE; if (shrink > 0) { g.save(); g.setLineDash([8, 7]); g.strokeStyle = C.mute; g.lineWidth = 3; g.stroke(rr(bx, by, bw * 0.3, bh, 14)); g.restore(); }
      write(g, '30%', bx + bw * 0.3 + 18, by + 44, prog(t, T.n30 - 0.1, T.n30 + 0.4), { font: `700 44px ${JP}`, color: shrink > 0 ? '@dim' : C.ink });
      if (shrink > 0) telop(g, 'それより低く', bx + bw * 0.5, by + bh + 56, prog(t, T.hikuku - 0.3, T.hikuku + 0.4), { size: 40 });
    }
    // ảnh Apple (143)
    if (t > T.l143 - 0.2) photoTag(g, 'apple', 1090, 190, 700, 160, prog(t, T.l143 + 0.2, T.n2025 + 0.4), { zoom: 1 + 0.06 * prog(t, T.l143, T.l144), rot: 0.02 });
    // telop dưới theo câu
    const sl = (parts, a, b, size = 48) => { if (t < a - 0.1 || t > b + 0.6) return; g.save(); g.translate(0, 150 * outCubic(clamp((t - b) / 0.5))); telop(g, parts, 960, 950, prog(t, a, a + 0.55), { size }); g.restore(); };
    sl('私たちが払ったお金は、どこへ行く？', T.l140, T.l141 - 0.2);
    sl('アプリストアが手数料を受け取る', T.l141, T.l142 - 0.2);
    sl([['日本では長く '], ['30%', `700 50px ${JP}`]], T.l142, T.l143 - 0.2);
    sl('2025年の終わりから、多くの場合それより低く', T.l143, T.l144 - 0.2, 42);
    sl('残りが、運営会社の売上になる', T.l144, T.end + 1);
  }
}
