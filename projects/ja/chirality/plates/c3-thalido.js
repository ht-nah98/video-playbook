// c3 · サリドマイド (p2 câu 32–41). ĐIỀM TĨNH, KHÔNG hình người (DNA §8): ảnh lọ `kevadon` (左) + dòng thời gian bên 右
// (西ドイツ trên / 日本 dưới: 1957 発売 · 1958 発売 · 1961 停止 · 1962.9 停止; ngoặc 「約10か月」 xương xám); câu 34–35: số bằng chữ
// + chấm đếm (100 chấm × 100人 = 1万人; 309 chấm nhỏ × 1人). Câu 36+: thalidomide R (左) / ảnh gương (右), ống nghiệm 「半分ずつ」;
// 「安全な方だけなら？」 (bản gương mờ thành bóng) → gạch → 「入れかわる」 ngay dưới: gương MỜ đi, hai mũi tên vòng qua gương,
// bóng đặc lại; câu 41: hai vòng kính lúp 「右と左を それぞれ調べる」.
import { C, MX, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, title, telop, wrong, strike, molecule, stereo, tube,
  photo, arrow, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// dòng thời gian: năm thập phân → x
const Y0 = 1957, X0 = 1150, PX = 105, LY = 420;
const tx = y => X0 + (y - Y0) * PX;
// sự kiện: [năm thập phân (CONTENT.md: 10/1957, 1/1958, 11/1961, 9/1962), hàng (−1 = 西ドイツ trên, +1 = 日本 dưới), năm hiện, việc]
const EV = [[1957 + 9.5 / 12, -1, '1957', '発売'], [1958 + 0.5 / 12, 1, '1958', '発売'], [1961 + 10.5 / 12, -1, '1961', '停止'], [1962 + 8.5 / 12, 1, '1962.9', '停止']];
const N309 = 309, COLS = 31;

export default class Thalido {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = { kevadon: './assets/history/kevadon.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    const S = i => L(i).start;
    this.T = {
      l32: S(32), y1957: w(32, '1957年'), doitsu: w(32, '西ドイツ'), thal: w(32, 'サリドマイド'), hatsu1: w(32, '発売'), nihon32: w(32, '日本'), yokunen: w(32, '翌年'),
      l33: S(33), tsuwari: w(33, 'つわり'), ninpu: w(33, '妊婦さんたち'), shougai: w(33, '障害'),
      l34: S(34), sekai: w(34, '世界'), man: w(34, '1万人'), suitei: w(34, '推定'),
      l35: S(35), teishi: w(35, '停止'), doitsu35: w(35, '西ドイツ'), kagetsu: w(35, '10か月'), nintei: w(35, '認定'), n309: w(35, '309人'),
      l36: S(36), thal36: w(36, 'サリドマイド'), migi36: w(36, '右'), hidari36: w(36, '左'), urarete: w(36, '売られて'), hanbun: w(36, '半分'),
      l37: S(37), taiji: w(37, '胎児'), ippou: w(37, '一方'),
      l38: S(38), anzen: w(38, '安全'), tsukutte: w(38, '作って'),
      l39: S(39), zannen: w(39, '残念'),
      l40: S(40), karada: w(40, '体'), jikan: w(40, '時間'), irekawa: w(40, '入れかわって'),
      l41: S(41), atarashii: w(41, '新しい'), sorezore: w(41, 'それぞれ'), shiraberu: w(41, '調べる'), end: L(41).end,
    };
    this.START = S(32);
    this.FROM = Math.max(this.START - 1.2, L(31).end + 0.5);
    // số trên hình (CONTENT.md): 西ドイツ 11/1961 → 日本 9/1962 = 10 tháng; 1万人 = 100 chấm × 100人; 309 chấm × 1人
    must('(1962 * 12 + 9) - (1961 * 12 + 11)', 10);
    must('100 * 100', 10000);
    must(`${N309}`, 309);
    // thalidomide: file chính R (左), ảnh gương S (右) — nhãn CIP từ hình học
    this.CL = stereo('R-thalidomide')[0].cip; this.CR = stereo('R-thalidomide', { mirror: true })[0].cip;
    must(`'${this.CL}${this.CR}'`, 'RS');
    this.HX = 560; this.RX = 2 * MX - 560;
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.y1957, 'tick', -4), cue(T.thal, 'photo'), cue(T.hatsu1, 'telop', -6), cue(T.yokunen, 'tick', -4),
      cue(T.tsuwari, 'telop', -8), cue(T.shougai - 0.8, 'telop', -8),
      cue(T.man, 'telop', -4),
      cue(T.teishi, 'tick', -4), cue(T.doitsu35, 'tick', -6), cue(T.kagetsu, 'telop', -4), cue(T.n309, 'telop', -4),
      cue(T.thal36, 'mol', -2), cue(T.migi36, 'telop', -8), cue(T.urarete, 'tube', -6), cue(T.hanbun, 'telop', -4),
      cue(T.taiji, 'telop', -8), cue(T.ippou, 'telop', -6),
      cue(T.anzen, 'telop', -4),
      cue(T.zannen, 'pen', -4),
      cue(T.karada, 'shimmer', -8), cue(T.jikan, 'telop', -4), cue(T.irekawa, 'glass', -4), cue(T.irekawa + 1.2, 'telop', -2),
      cue(T.atarashii, 'telop', -4), cue(T.shiraberu, 'glass', -4),
    ];
  }
  render(g, t) {
    const T = this.T, { HX, RX } = this;
    ground(g, 'mirror', t);
    title(g, 'サリドマイド', t, this.FROM + 0.3);

    // ── A: lọ thuốc + dòng thời gian + chấm đếm (câu 32–35), rời trước câu 36 ──
    const oA = out(t, T.l36 - 0.7, 0.6);
    if (oA < 1) {
      // dòng thời gian (右) — trượt sang phải khi rời
      g.save(); g.translate(1000 * oA, 0);
      const ka = prog(t, this.FROM + 0.1, this.FROM + 0.9);
      g.save(); g.strokeStyle = C.bone; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath(); g.moveTo(tx(1957) - 40, LY); g.lineTo(tx(1957) - 40 + (tx(1963) - tx(1957) + 50) * outCubic(ka), LY); g.stroke();
      g.lineWidth = 2; for (let y = 1957; y <= 1963; y++) if (tx(y) <= tx(1957) - 40 + (tx(1963) - tx(1957) + 50) * ka) { g.beginPath(); g.moveTo(tx(y), LY - 8); g.lineTo(tx(y), LY + 8); g.stroke(); }
      g.restore();
      telop(g, '西ドイツ', 990, 360, prog(t, this.FROM + 0.3, this.FROM + 0.8), { size: 32, color: '@dim' });
      telop(g, '日本', 990, 505, prog(t, this.FROM + 0.5, this.FROM + 1.0), { size: 32, color: '@dim' });
      const at = [T.y1957, T.yokunen, T.doitsu35, T.teishi];
      EV.forEach(([y, row, ys, what], i) => {
        const k = prog(t, at[i] - 0.1, at[i] + 0.4); if (k <= 0) return;
        const x = tx(y), e = outCubic(k);
        g.save(); g.strokeStyle = C.silver; g.lineWidth = 2; g.beginPath(); g.moveTo(x, LY); g.lineTo(x, LY + row * 34 * e); g.stroke();
        g.fillStyle = C.text; g.beginPath(); g.arc(x, LY, 7 * e, 0, 7); g.fill(); g.restore();
        const kw = i === 0 ? prog(t, T.hatsu1, T.hatsu1 + 0.4) : k;
        if (row < 0) { telop(g, ys, x, 370, k, { size: 30, align: 'center' }); telop(g, what, x, 325, kw, { size: 32, align: 'center', mincho: true }); }
        else { telop(g, ys, x, 495, k, { size: 30, align: 'center' }); telop(g, what, x, 540, kw, { size: 32, align: 'center', mincho: true }); }
      });
      const kb = prog(t, T.kagetsu - 0.2, T.kagetsu + 0.5);              // ngoặc 約10か月 (xương xám — không đỏ)
      if (kb > 0) { const a = tx(EV[2][0]), b = tx(EV[3][0]), y = 575;
        g.save(); g.strokeStyle = C.bone; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(a, y - 12); g.lineTo(a, y); g.lineTo(a + (b - a) * outCubic(kb), y);
        if (kb >= 1) g.lineTo(b, y - 12); g.stroke(); g.restore();
        telop(g, '約10か月の遅れ', 1800, 630, kb, { size: 32, align: 'right' }); }
      telop(g, 'つわりに悩む妊婦さんも', 1000, 760, prog(t, T.tsuwari, T.ninpu + 0.6), { size: 40, color: '@dim', mincho: true });
      telop(g, '赤ちゃんの手や足に障害', 1000, 830, prog(t, T.shougai - 0.8, T.shougai + 0.3), { size: 40, mincho: true });
      g.restore();

      // ảnh lọ thuốc (左) → chìm xuống ở câu 34; chấm đếm thay chỗ
      g.save(); g.translate(-1000 * oA, 0);
      const oP = out(t, T.l34 - 0.5, 0.6);
      if (oP < 1) { g.save(); g.translate(0, 700 * oP); photo(g, 'kevadon', 170, 250, 300, prog(t, T.thal - 0.3, T.thal + 0.5)); g.restore(); }
      if (t > T.l34 - 0.3) {
        telop(g, '被害を受けた子ども（世界）', 160, 300, prog(t, T.l34 - 0.2, T.sekai + 0.6), { size: 32, color: '@dim' });
        const kd = prog(t, T.sekai, T.suitei);                            // 100 chấm, mỗi chấm 100人
        for (let i = 0; i < 100; i++) { const kk = clamp(kd * 100 - i); if (kk <= 0) break;
          g.fillStyle = C.text; g.beginPath(); g.arc(176 + (i % 20) * 32, 340 + Math.floor(i / 20) * 32, 9 * outCubic(kk), 0, 7); g.fill(); }
        telop(g, '1万人以上（推定）', 160, 555, prog(t, T.man, T.suitei + 0.3), { size: 52 });
        telop(g, '●1つ＝100人', 620, 555, prog(t, T.suitei, T.suitei + 0.4), { size: 28, color: '@dim' });
      }
      if (t > T.nintei - 0.3) {
        telop(g, '日本で認定された被害者', 160, 680, prog(t, T.nintei - 0.2, T.nintei + 0.6), { size: 32, color: '@dim' });
        const kd = prog(t, T.nintei, T.n309 + 0.6);                       // 309 chấm nhỏ, mỗi chấm 1人
        g.fillStyle = C.text;
        for (let i = 0; i < N309; i++) { if (kd * N309 - i <= 0) break; g.beginPath(); g.arc(170 + (i % COLS) * 14, 715 + Math.floor(i / COLS) * 14, 4, 0, 7); g.fill(); }
        telop(g, '309人', 630, 800, prog(t, T.n309, T.n309 + 0.4), { size: 56 });
        telop(g, '・1つ＝1人', 630, 850, prog(t, T.n309 + 0.4, T.n309 + 0.8), { size: 28, color: '@dim' });
      }
      g.restore();
    }

    // ── B: thalidomide R / S (câu 36–41) ──
    const fog = smooth(prog(t, T.karada, T.karada + 1.5)) * (1 - 0.6 * smooth(prog(t, T.l41, T.l41 + 1.5)));
    if (t > T.l36 - 0.6) {
      const km = prog(t, T.thal36 - 0.4, T.thal36 + 0.4), rot = 0.3 + 0.18 * (t - T.l36);
      const gh = prog(t, T.tsukutte, T.tsukutte + 0.6) * (1 - prog(t, T.irekawa + 0.3, T.irekawa + 1.3));   // "chỉ làm một dạng" → bóng → đặc lại
      floorShadow(g, HX, 170 * km); floorShadow(g, RX, 170 * km * (1 - gh));
      molecule(g, 'R-thalidomide', { x: HX, y: 520, scale: 46, rot, k: km });
      molecule(g, 'R-thalidomide', { x: RX, y: 520, scale: 46, rot, k: km, mirror: true, ghost: gh > 0.5 });
      telop(g, `${this.CL}体`, 150, 530, prog(t, T.hidari36, T.hidari36 + 0.3), { size: 48, color: '@L' });
      telop(g, `${this.CR}体`, 1770, 530, prog(t, T.migi36, T.migi36 + 0.3), { size: 48, color: '@R', align: 'right' });
      // ống nghiệm 「半分ずつ」 (câu 36–37) → chìm ở câu 38
      const oT = out(t, T.l38 - 0.5, 0.6);
      if (oT < 1) { g.save(); g.translate(0, 600 * oT);
        floorShadow(g, 200, 70); tube(g, 200, 860, 250, prog(t, T.urarete - 0.2, T.urarete + 0.4), { fill: 0.65, mix: 0.5, n: 24, seed: 3 });
        telop(g, '売られていた薬', 300, 900, prog(t, T.urarete, T.urarete + 0.6), { size: 36, color: '@dim', mincho: true });
        telop(g, '右と左が半分ずつ', 300, 965, prog(t, T.hanbun - 0.4, T.hanbun + 0.4), { size: 48, mincho: true });
        g.restore(); }
      const oJ = out(t, T.l38 - 0.5, 0.6);
      if (oJ < 1) { g.save(); g.translate(0, 500 * oJ);
        telop(g, '胎児への害', 1050, 900, prog(t, T.taiji, T.taiji + 0.5), { size: 36, color: '@dim', mincho: true });
        telop(g, '主に一方の形が関わる', 1050, 965, prog(t, T.ippou - 0.2, T.ippou + 0.7), { size: 44, mincho: true });
        g.restore(); }
      // 安全な方だけなら？ → gạch → 入れかわる
      const b = wrong(g, '安全な方だけなら？', HX, 905, prog(t, T.anzen - 0.2, T.anzen + 0.8), { size: 48, align: 'center', mincho: true });
      strike(g, b, prog(t, T.zannen, T.zannen + 0.5));
      telop(g, '入れかわる', HX, 985, prog(t, T.irekawa + 0.8, T.irekawa + 1.4), { size: 56, align: 'center', mincho: true });
      telop(g, '体の中で数時間のうちに', RX + 40, 228, prog(t, T.l40, T.jikan + 0.4), { size: 40, align: 'center', mincho: true });
      // R ⇄ S: hai mũi tên vòng qua gương
      const kc = prog(t, T.irekawa - 0.2, T.irekawa + 1.0);
      if (kc > 0) { const ph = 0.06 * Math.sin((t - T.irekawa) * 2.2);
        arrow(g, [[HX + 120, 330], [MX, 200 + 20 * ph], [RX - 120, 330]], kc, { color: C.silver, w: 4 });
        arrow(g, [[RX - 120, 720], [MX, 850 - 20 * ph], [HX + 120, 720]], kc, { color: C.silver, w: 4 }); }
      // 41: hai vòng kính lúp nét đứt quanh từng dạng + 「右と左を それぞれ調べる」
      const ks = prog(t, T.sorezore - 0.2, T.shiraberu + 0.3);
      if (ks > 0) { g.save(); g.setLineDash([12, 10]); g.lineWidth = 3;
        for (const [x, col] of [[HX, C.L], [RX, C.R]]) { g.strokeStyle = col; g.beginPath(); g.arc(x, 520, 245, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * outCubic(ks)); g.stroke(); }
        g.restore(); }
      telop(g, '新しい薬は', RX, 905, prog(t, T.atarashii, T.atarashii + 0.4), { size: 40, color: '@dim', align: 'center', mincho: true });
      telop(g, '右と左をそれぞれ調べる', RX, 975, prog(t, T.sorezore, T.shiraberu + 0.4), { size: 48, align: 'center', mincho: true });
    }

    mirror(g, { fog });
  }
}
