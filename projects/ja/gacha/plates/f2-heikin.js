// f2 · 平均では見えない形 (p2 câu 120–123) — ERA studio. 20 người chơi = 20 viên nang ở đáy; 40 đồng xu.
//  120 xu chia ĐỀU (mỗi người 2 đồng) = 「総額 ÷ 人数」 · 121 đường chuông xám + tem 「つりがね型」 bị bóc (hình SAI) ·
//  122 xu bay về phân bố thật: 13 người = 0, đuôi 28 đồng (cùng tổng 40, must) · 123 tấm 「平均」 che đuôi + đường trung bình.
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, outBack, ground, heading, telop as telop0, write, wrong, capsule, rr, CROWD, TONES } from '../kit.js';

const telop = (g, p, x, y, k, o) => telop0(g, p, x, y, k > 0 ? 0.3 + 0.7 * k : 0, o);   // không bao giờ vẽ thẻ rỗng trước chữ
const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 22, oy = 8, col = 'rgba(70,50,40,0.20)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
function coin(g, x, y, r) {
  g.save(); g.translate(x, y); g.scale(1, 0.42);
  g.fillStyle = '#EFE7D8'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#B9AE98'; g.stroke(); g.restore();
}
const REAL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 4, 28];     // 20 người, tổng 40
const N = 20, X0 = 240, PITCH = 76, BASE = 890, CP = 18, R = 33;
const colX = i => X0 + i * PITCH;

export default class Average {
  static ERA = 'studio';
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      l120: L(120).start, sogaku: w(120, '総額'), waru: w(120, '割る'), chiisana: w(120, '小さな'),
      l121: L(121).start, kakoku: w(121, 'つりがね型'), arimasen: w(121, 'ありません'),
      l122: L(122).start, hotondo: w(122, 'ほとんど'), zero: w(122, 'ゼロ'), shippo: w(122, 'しっぽ'), nobite: w(122, '伸びて'),
      l123: L(123).start, heikin: w(123, '平均'), kakushite: w(123, '隠して'), end: L(123).end,
    };
    this.START = L(120).start;
    this.FROM = Math.max(this.START - 1.2, L(119).end + 0.5);
    must(`${REAL.reduce((a, b) => a + b, 0)}`, 40); must(`${REAL.length}`, 20); must(`${REAL.filter(v => v === 0).length}`, 13);
    must(`${REAL.reduce((a, b) => a + b, 0)} / ${REAL.length}`, 2);            // trung bình = 2 đồng/người, cùng tổng hai kiểu
    // đồng xu c: nguồn = cột ⌊c/2⌋ tầng c%2; đích = theo REAL
    this.SRC = Array.from({ length: 40 }, (_, c) => [Math.floor(c / 2), c % 2]);
    this.DST = []; REAL.forEach((v, i) => { for (let l = 0; l < v; l++) this.DST.push([i, l]); });
    must(`${this.DST.length}`, 40);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(this.FROM + 0.4, 'pop'), c(T.sogaku, 'coin'), c(T.sogaku + 0.5, 'soroban'), c(T.waru, 'pen'), c(T.chiisana, 'tick'),
      c(T.kakoku, 'pen'), c(T.arimasen, 'tear'), c(T.hotondo, 'coin'), c(T.hotondo + 0.6, 'soroban'), c(T.zero, 'pen'), c(T.shippo, 'pen'),
      c(T.heikin, 'card'), c(T.kakushite, 'pop')];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 5, '平均では見えない形', prog(t, this.START + 0.1, this.START + 0.9));
    // trục + 20 người (viên nang)
    g.fillStyle = C.line; g.fillRect(X0 - 40, BASE + 6, PITCH * (N - 1) + 80, 3);
    for (let i = 0; i < N; i++) capsule(g, colX(i), BASE + 52, 22, prog(t, F + 0.25 + i * 0.03, F + 0.7 + i * 0.03), { tone: CROWD[i % CROWD.length], ground: false });
    // đồng xu
    const dropK = c => prog(t, T.sogaku + c * 0.025, T.sogaku + 0.4 + c * 0.025);
    const coins = [];
    for (let c = 0; c < 40; c++) {
      const k0 = dropK(c); if (k0 <= 0) continue;
      const [si, sl] = this.SRC[c], [di, dl] = this.DST[c];
      const ts = T.hotondo + 0.1 + c * 0.03, m = outCubic(prog(t, ts, ts + 0.95));
      const x = colX(si) + (colX(di) - colX(si)) * m, y0 = BASE - 12 - sl * CP, y1 = BASE - 12 - dl * CP;
      const y = y0 + (y1 - y0) * m - 90 * Math.sin(Math.PI * m) - (1 - k0) * 160;
      coins.push([x, y, di]);
    }
    coins.sort((a, b) => b[1] - a[1]).forEach(([x, y]) => coin(g, x, y, R));
    // 120: nhãn tổng ÷ người
    if (t > T.sogaku - 0.3) {
      const o = out(t, T.l121 - 0.2, 0.5);
      g.save(); g.translate(1300 * o, 0);
      telop(g, [['総額 ÷ 人数'], [' ＝ 同じ高さ', undefined, '@dim']], 960, 330, prog(t, T.sogaku - 0.1, T.waru + 0.6), { size: 50 });
      g.restore();
    }
    if (t > T.chiisana - 0.2 && t < T.hotondo + 0.6) {
      g.save(); g.translate(-1300 * out(t, T.hotondo - 0.2, 0.5), 0);
      telop(g, '1人あたりは、小さな金額', 960, 470, prog(t, T.chiisana - 0.1, T.chiisana + 0.6), { size: 46 }); g.restore();
    }
    // 121: đường chuông (hình SAI) + tem bóc
    if (t > T.l121 - 0.3 && t < T.hotondo + 0.9) {
      const kb = prog(t, T.l121, T.kakoku + 0.3), fade = 1 - out(t, T.hotondo, 0.7);
      g.save(); g.globalAlpha = fade * 0.9; g.strokeStyle = '#A59D8C'; g.lineWidth = 6; g.setLineDash([14, 12]); g.lineCap = 'round';
      g.beginPath(); const x1 = colX(0) + (colX(N - 1) - colX(0)) * kb;
      for (let x = colX(0); x <= x1; x += 6) { const u = (x - 960) / 330, y = BASE - 40 - 330 * Math.exp(-u * u); x === colX(0) ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke(); g.restore();
      g.save(); g.globalAlpha = fade; wrong(g, 'つりがね型', 960, 250, prog(t, T.kakoku - 0.1, T.kakoku + 0.4), { size: 56, peel: prog(t, T.arimasen, T.arimasen + 0.9) }); g.restore();
    }
    // 122: ゼロ + しっぽ
    if (t > T.hotondo) {
      const kz = prog(t, T.zero - 0.1, T.zero + 0.4);
      if (kz > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.globalAlpha = kz; g.beginPath();
        g.moveTo(colX(0) - 24, BASE - 60); g.lineTo(colX(0) - 24, BASE - 80); g.lineTo(colX(12) + 24, BASE - 80); g.lineTo(colX(12) + 24, BASE - 60); g.stroke(); g.restore();
        telop(g, [['ほとんどの人は '], ['ゼロ', `700 50px ${MIN}`]], (colX(0) + colX(12)) / 2, BASE - 150, kz, { size: 44 }); }
      const ks = prog(t, T.shippo - 0.1, T.shippo + 0.6);
      if (ks > 0) { const tx = colX(19), ty = BASE - 12 - 28 * CP;
        g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.globalAlpha = ks; g.beginPath(); g.ellipse(tx, (ty + BASE) / 2 - 4, 50, (BASE - ty) / 2 + 24, 0, 0, TAU); g.stroke(); g.restore();
        telop(g, '長い長いしっぽ', Math.min(tx - 90, colX(16) - 50), ty + 40, ks, { size: 46, align: 'right' }); }
    }
    // 123: tấm 「平均」 che đuôi + đường trung bình (2 đồng)
    if (t > T.heikin - 0.3) {
      const k = outCubic(prog(t, T.heikin - 0.15, T.heikin + 0.5)), px = colX(16) - 30, pw = colX(19) + 80 - px, py = 280 - (1 - k) * 420, ph = 560;
      shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.97)'; g.fill(rr(px, py, pw, ph, 30)); }, 30, 12);
      g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(px + 0.75, py + 0.75, pw - 1.5, ph - 1.5, 29));
      write(g, '平均', px + pw / 2, py + 270, prog(t, T.heikin, T.heikin + 0.5), { font: `700 110px ${MIN}`, align: 'center' });
      write(g, 'ひとつの数', px + pw / 2, py + 350, prog(t, T.heikin + 0.3, T.kakushite), { font: `500 36px ${JP}`, color: '@dim', align: 'center' });
      const ka = prog(t, T.heikin + 0.4, T.kakushite + 0.2), ya = BASE - 12 - 2 * CP + 4;
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.setLineDash([12, 10]); g.beginPath(); g.moveTo(colX(0) - 30, ya); g.lineTo(colX(0) - 30 + (colX(16) - colX(0) - 10) * outCubic(ka), ya); g.stroke(); g.restore();
    }
  }
}
