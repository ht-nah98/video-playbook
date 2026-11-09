// b2 · 手の形をした分子 (p2 câu 12–21). Khung lab 0 của bàn thử (tools/lab/awasekagami.html, kit-test A): CHFClBr soi gương.
//  ① 1893 · ケルビン卿 (ảnh kelvin) → 「キラル」 ← ギリシャ語 χειρ ＝ 手; hai bàn tay soi gương
//  ② 「分子のどこに『手』が？」 → tứ diện: C + 4 liên kết tới 4 đỉnh (khung dây chiếu ĐÚNG như molecule()) → 4 nguyên tử khác nhau
//  ③ ảnh gương bên phải; どう回しても: bản XOAY THỬ (nét đứt) bay từ trái sang, xoay dần tới trialFit → khớp 2/4, F/Cl ✗, gương rạn
//  ④ 不斉炭素原子 (vòng quanh C); 2つを入れかえる: F ⇄ Cl đổi chỗ → bản sao bay sang khớp 4/4 ✓, gương liền; đổi lại; 鏡像異性体
//  ⑤ ノーベル委員会のたとえ: chìa khoá 左 + chìa gương 右 (2本), ổ khoá phía trái — chỉ một chìa vào.
import { C, MX, JP, BENCH, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, mirror, telop, title,
  tick, cross, badge, arrow, molecule, stereo, cip, placeMol, trialFit, hand, photo, floorShadow, benchReflect, TAU, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
const lerp = (a, b, u) => a + (b - a) * u;
// vector / xoay (cục bộ — kit không xuất)
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
const mv = (M, p) => M.map(r => dot(r, p));
const frame = (u, v) => { const e1 = nrm(u), e2 = nrm(sub(v, e1.map(x => x * dot(v, e1)))); return [e1, e2, crs(e1, e2)]; };
const mul = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
const tr = M => [0, 1, 2].map(i => M.map(r => r[i]));
/** Quay cứng đưa src (quanh tâm ci) trùng dst ở hai nhóm iA, iB → hàm u ↦ toạ độ (u = 0: src, 1: dst), quay theo trục–góc. */
function flight(src, dst, ci, iA, iB) {
  const cS = src[ci].p, cD = dst[ci].p;
  const R = mul(tr(frame(sub(dst[iA].p, cD), sub(dst[iB].p, cD))), frame(sub(src[iA].p, cS), sub(src[iB].p, cS)));
  const th = Math.acos(clamp((R[0][0] + R[1][1] + R[2][2] - 1) / 2, -1, 1)), s = Math.sin(th);
  const ax = s > 1e-6 ? nrm([R[2][1] - R[1][2], R[0][2] - R[2][0], R[1][0] - R[0][1]]) : [0, 1, 0];
  const rod = a => { const c = Math.cos(a), sn = Math.sin(a), [x, y, z] = ax, v = 1 - c;
    return [[c + x * x * v, x * y * v - z * sn, x * z * v + y * sn], [y * x * v + z * sn, c + y * y * v, y * z * v - x * sn], [z * x * v - y * sn, z * y * v + x * sn, c + z * z * v]]; };
  return u => { const Ru = rod(th * u), c = [0, 1, 2].map(i => lerp(cS[i], cD[i], u)); return src.map(a => ({ el: a.el, p: mv(Ru, sub(a.p, cS)).map((v, i) => v + c[i]) })); };
}
// chìa khoá dựng đứng: vòng cầm ở trên, răng ở phía +x (side 'R' = ảnh gương); ghost = nét đứt
function key(g, x, y, s, k, { side = 'L', ghost = false } = {}) {
  if (k <= 0) return;
  const col = side === 'R' ? C.R : C.L, e = outBack(clamp(k));
  g.save(); g.translate(x, y); g.scale((side === 'R' ? -1 : 1) * e, e);
  const P = new Path2D();
  P.arc(0, -120 * s, 46 * s, 0, TAU); P.rect(-10 * s, -76 * s, 20 * s, 210 * s);
  [[40, 26, 22], [74, 14, 18], [100, 32, 20]].forEach(([yy, w, h]) => P.rect(8 * s, yy * s, w * s, h * s));
  if (ghost) { g.setLineDash([9, 7]); g.strokeStyle = col; g.lineWidth = 3; g.fillStyle = side === 'R' ? 'rgba(75,163,227,0.10)' : 'rgba(242,165,65,0.10)'; g.fill(P, 'nonzero'); g.stroke(P); }
  else {
    g.save(); g.translate(6, 10); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fill(P); g.restore();
    g.lineJoin = 'round'; g.strokeStyle = col; g.lineWidth = 7; g.stroke(P);
    const gr = g.createLinearGradient(-50 * s, -170 * s, 50 * s, 150 * s); gr.addColorStop(0, '#2A3246'); gr.addColorStop(1, '#151B2B'); g.fillStyle = gr; g.fill(P);
    g.fillStyle = C.bg; g.beginPath(); g.arc(0, -120 * s, 20 * s, 0, TAU); g.fill(); g.strokeStyle = col; g.lineWidth = 3; g.stroke();
  }
  g.restore();
}
// ổ khoá (tấm kim loại có lỗ khoá hình răng phía +x — chỉ chìa 左 vừa)
function lock(g, x, y, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(0, Math.round((1 - e) * 240));
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(x - 84, y + 10, 180, 180);
  const gr = g.createLinearGradient(x, y, x, y + 170); gr.addColorStop(0, '#3A4358'); gr.addColorStop(1, '#1E2536');
  g.fillStyle = gr; g.beginPath(); g.roundRect(x - 92, y, 184, 170, 10); g.fill(); g.strokeStyle = C.silver; g.lineWidth = 2.5; g.stroke();
  g.fillStyle = '#05070D'; g.fillRect(x - 6, y + 34, 12, 100); g.fillRect(x + 4, y + 52, 26, 18); g.fillRect(x + 4, y + 86, 14, 14); g.fillRect(x + 4, y + 112, 32, 16);
  g.restore();
}

const KEY = 'R-CHFClBr', LX = 560, RX = 2 * MX - LX, CY = 480, S = 142;
// liên kết của data/molecules/R-CHFClBr.json (kit không xuất bonds; cip ở init kiểm lại: bản trái phải ra R)
const BONDS = [{ a: 0, b: 3, order: 1 }, { a: 1, b: 3, order: 1 }, { a: 2, b: 3, order: 1 }, { a: 3, b: 4, order: 1 }];

export default class Te {
  static ERA = 'mirror';
  static IMAGES = { kelvin: './assets/history/kelvin.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'b2-te');
    const S_ = i => L(i).start, E = i => L(i).end;
    this.T = {
      l12: S_(12), y1893: w(12, '1893年'), igirisu: w(12, 'イギリス'), kiraru: w(12, 'キラル'),
      l13: S_(13), girisha: w(13, 'ギリシャ'), te13: w(13, '手'),
      l14: S_(14), bunshi14: w(14, '分子'),
      l15: S_(15), tanso15: w(15, '炭素'), nobiru: w(15, '伸びる'), hon4: w(15, '4本'), yotsu15: w(15, '4つ'), shimen: w(15, '正四面体'), choten: w(15, '頂点'),
      l16: S_(16), saki: w(16, '先'), shurui: w(16, '4種類'), kagami16: w(16, '鏡'), utsushita: w(16, '映した'), mawashite: w(16, '回して'), kasanara: w(16, '重なりません'),
      l17: S_(17), tanso17: w(17, '炭素', 1), fusei: w(17, '不斉'),
      l18: S_(18), futatsu: w(18, '2つ'), irekae: w(18, '入れかえる'), chodo: w(18, 'ちょうど'), kagami18: w(18, '鏡'), bunshi18: w(18, '分子'),
      l19: S_(19), kyozo: w(19, '鏡像'), genshi: w(19, '原子'), chigau: w(19, 'ちがう'), narabi: w(19, '並び方'),
      l20: S_(20), iinkai: w(20, '委員'), kagi20: w(20, '鍵'),
      l21: S_(21), tsukuru: w(21, '作る'), kagami21: w(21, '鏡'), hon2: w(21, '2本'), jo: w(21, '錠'), au: w(21, '合う'), ippon: w(21, '1本'), end: E(21),
    };
    this.START = S_(12);
    this.FROM = Math.max(this.START - 1.2, 71.86 + 0.5);            // KẾT b1 = 71.86 (bảng nhóm)
    must(`${E(11).toFixed(2)}`, 71.86);
    // hình học khung lab 0 (góc nhìn gốc của kit, không tự xoay — bản xoay thử cần CÙNG góc với hai bản)
    const Lm = placeMol(KEY), Rm = placeMol(KEY, { mirror: true }), ci = stereo(KEY)[0].atom, ix = el => Lm.findIndex(a => a.el === el);
    const iH = ix('H'), iBr = ix('Br'), iF = ix('F'), iCl = ix('Cl'), trial = trialFit(KEY);
    must(`'${stereo(KEY)[0].cip}${stereo(KEY, { mirror: true })[0].cip}'`, 'RS');
    must(`${trial.fit.length}`, 2);                                                    // 「2つしか重ならない」
    // đổi F ⇄ Cl ở bản trái → thành ảnh gương (S), bay sang khớp CẢ 4
    // F đi tới HƯỚNG của Cl (giữ độ dài liên kết của F) và ngược lại
    const c0 = Lm[ci].p, at = (i, j) => { const d = sub(Lm[j].p, c0), r = Math.hypot(...sub(Lm[i].p, c0)) / Math.hypot(...d); return d.map((v, q) => c0[q] + v * r); };
    const swapped = Lm.map((a, i) => ({ el: a.el, p: i === iF ? at(iF, iCl) : i === iCl ? at(iCl, iF) : a.p }));
    must(`'${cip(Lm, BONDS, ci)}${cip(swapped, BONDS, ci)}'`, 'RS');                    // bản trái R; đổi 2 nhóm → S
    const fly2 = flight(swapped, Rm, ci, iH, iBr), end2 = fly2(1);
    const dirOK = (A, B, i) => dot(nrm(sub(A[i].p, A[ci].p)), nrm(sub(B[i].p, B[ci].p))) > 0.98;
    must(`${[iH, iBr, iF, iCl].every(i => dirOK(end2, Rm, i))}`, true);                // 4/4 cùng hướng (khớp)
    const fly1 = flight(Lm, trial.atoms, ci, iH, iBr);
    must(`${fly1(1).every((a, i) => Math.hypot(...sub(a.p, trial.atoms[i].p)) < 1e-6)}`, true);
    // chiếu khung dây tứ diện đúng như molecule(): D = max(9, 3·bán kính lớn nhất)
    const D = Math.max(9, 3 * Math.max(...Lm.map(a => Math.hypot(...a.p))));
    this.G = { Lm, Rm, ci, iH, iBr, iF, iCl, trial, swapped, fly1, fly2, D, subs: [iH, iBr, iF, iCl] };
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.9, 'photo'), cue(T.y1893, 'telop'), cue(T.igirisu, 'telop', -6), cue(T.kiraru, 'flip'), cue(T.girisha, 'telop'),
      cue(T.bunshi14, 'telop'), cue(T.tanso15, 'mol'), cue(T.hon4, 'telop'), cue(T.yotsu15, 'tick', -4), cue(T.shurui, 'mol'),
      cue(T.utsushita, 'mol'), cue(T.kasanara, 'crack'), cue(T.kasanara + 0.4, 'mismatch'),
      cue(T.fusei, 'telop'), cue(T.futatsu, 'tick', -4), cue(T.bunshi18, 'match'), cue(T.kyozo, 'flip', -4), cue(T.genshi, 'telop', -4), cue(T.narabi, 'telop', -4),
      cue(T.iinkai, 'telop'), cue(T.kagi20, 'tick'), cue(T.kagami21, 'flip', -4), cue(T.hon2, 'telop', -4), cue(T.au, 'tick'), cue(T.ippon, 'telop'),
    ];
  }
  // khung dây tứ diện: liên kết C → 4 đỉnh + 6 cạnh, chiếu như molecule() (k: vẽ dần)
  tetra(g, atoms, x, y, kB, kE, kV) {
    const { ci, subs, D } = this.G, P = a => { const kk = D / (D - a.p[2]); return [x + a.p[0] * S * kk, y - a.p[1] * S * kk]; };
    const c = P(atoms[ci]), V = subs.map(i => P(atoms[i]));
    g.save(); g.lineCap = 'round';
    if (kE > 0) { g.setLineDash([8, 8]); g.strokeStyle = `rgba(174,182,198,${0.75 * clamp(kE)})`; g.lineWidth = 2.5;
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const e = outCubic(clamp(kE)); g.beginPath(); g.moveTo(...V[i]); g.lineTo(V[i][0] + (V[j][0] - V[i][0]) * e, V[i][1] + (V[j][1] - V[i][1]) * e); g.stroke(); }
      g.setLineDash([]); }
    if (kB > 0) { g.strokeStyle = C.bone; g.lineWidth = 9; for (const v of V) { const e = outCubic(clamp(kB)); g.beginPath(); g.moveTo(...c); g.lineTo(c[0] + (v[0] - c[0]) * e, c[1] + (v[1] - c[1]) * e); g.stroke(); }
      g.fillStyle = '#4A5366'; g.strokeStyle = C.L; g.lineWidth = 3; g.beginPath(); g.arc(...c, 16, 0, TAU); g.fill(); g.stroke(); }
    if (kV > 0) for (const v of V) { g.strokeStyle = C.text; g.lineWidth = 3; g.beginPath(); g.arc(...v, 12 * outBack(clamp(kV)), 0, TAU); g.stroke(); }
    g.restore();
  }
  render(g, t) {
    const T = this.T, G = this.G;
    ground(g, 'mirror', t);
    title(g, '手の形をした分子', t, this.FROM + 0.3);

    // ═════ ① ケルビン卿 · キラル · 手 (câu 12–13) ═════
    const o1 = out(t, T.l14 - 0.3, 0.6);
    if (o1 < 1) {
      g.save(); g.translate(-1000 * o1, 0);
      photo(g, 'kelvin', 150, 270, 360, prog(t, this.FROM + 0.6, this.FROM + 1.4));
      g.restore();
      g.save(); g.translate(1000 * o1, 0);
      telop(g, '1893年', 1010, 320, prog(t, T.y1893, T.y1893 + 0.6), { size: 64 });
      telop(g, 'イギリスの物理学者', 1012, 395, prog(t, T.igirisu, T.igirisu + 1.2), { size: 36, color: '@dim' });
      telop(g, 'キラル', 1010, 560, prog(t, T.kiraru - 0.1, T.kiraru + 0.5), { size: 110, mincho: true });
      telop(g, [['ギリシャ語　', `500 36px ${JP}`, '@dim'], ['χειρ ＝ 手', `700 52px ${JP}`]], 1012, 660, prog(t, T.girisha, T.te13 + 0.3));
      { const kg = prog(t, T.girisha, T.te13 + 0.3);                         // dấu sắc trên ι (Noto thiếu ί) — vẽ tay
        if (kg >= 1) { g.save(); g.font = `500 36px ${JP}`; const x0 = 1012 + g.measureText('ギリシャ語　').width; g.font = `700 52px ${JP}`;
          const xi = x0 + g.measureText('χε').width + g.measureText('ι').width * 0.62;
          g.strokeStyle = C.text; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(xi - 5, 636); g.lineTo(xi + 6, 621); g.stroke(); g.restore(); } }
      g.restore();
      g.save(); g.translate(0, 500 * o1);
      const kh = prog(t, T.te13 - 0.2, T.te13 + 0.4);
      hand(g, 690, 840, 48, kh, { side: 'L' }); hand(g, 2 * MX - 690, 840, 48, kh, { side: 'R' });
      g.restore();
    }

    // gương (cố định — không đi theo khung lab): rạn ở 重なりません, liền khi 4/4 khớp (câu 18)
    mirror(g, { crack: prog(t, T.kasanara, T.kasanara + 0.5) * (1 - prog(t, T.bunshi18, T.bunshi18 + 0.5)), cy: CY - 10 });

    // ═════ ②–④ khung lab 0 (câu 14–19) ═════
    const oLab = out(t, T.l20 - 0.4, 0.6);
    if (t > T.l14 - 0.4 && oLab < 1) {
      g.save(); g.translate(0, -900 * oLab);
      // câu hỏi + tứ diện (chữ phía phải, rời trước khi ảnh gương tới)
      const oQ = out(t, T.kagami16 - 0.4, 0.5);
      if (oQ < 1) {
        g.save(); g.translate(900 * oQ, 0);
        telop(g, '分子のどこに「手」が？', 1010, 330, prog(t, T.bunshi14, T.bunshi14 + 0.8), { size: 52, mincho: true });
        telop(g, '炭素から4本の結合', 1012, 430, prog(t, T.hon4 - 0.6, T.hon4 + 0.5), { size: 40 });
        telop(g, '正四面体の4つの頂点', 1012, 500, prog(t, T.shimen, T.choten + 0.3), { size: 40 });
        g.restore();
      }
      // bản trái: đổi F ⇄ Cl (câu 18) rồi đổi lại (câu 19)
      const sw = smooth(prog(t, T.irekae, T.irekae + 0.8)) * (1 - smooth(prog(t, T.l19 - 0.2, T.l19 + 0.5)));
      const left = G.Lm.map((a, i) => {
        if (i !== G.iF && i !== G.iCl || sw <= 0) return a;
        const o = G.swapped[i].p, lift = Math.sin(Math.PI * sw) * 0.9 * (i === G.iF ? 1 : -1);
        return { el: a.el, p: [lerp(a.p[0], o[0], sw), lerp(a.p[1], o[1], sw), lerp(a.p[2], o[2], sw) + lift] };
      });
      const kA = prog(t, T.shurui - 0.1, T.shurui + 0.5), kM = prog(t, T.utsushita - 0.1, T.utsushita + 0.5);
      floorShadow(g, LX, 230 * Math.min(1, kA + 0.4 * prog(t, T.tanso15, T.tanso15 + 0.4))); floorShadow(g, RX, 230 * Math.min(1, kM));
      benchReflect(g, BENCH + 60, () => { molecule(g, KEY, { x: LX, y: CY, scale: S, k: kA, atoms: left }); molecule(g, KEY, { x: RX, y: CY, scale: S, mirror: true, k: kM }); });
      // khung dây: C + liên kết (炭素 / 伸びる) → cạnh tứ diện (正四面体) → đỉnh (頂点 / 先); mờ đi thành nét phụ khi nguyên tử vào
      const kB = prog(t, T.tanso15 - 0.1, T.nobiru + 0.4), kE = prog(t, T.shimen - 0.1, T.shimen + 0.6) * (1 - 0.6 * kA);
      const kV = prog(t, T.choten - 0.1, T.choten + 0.3) * (1 - kA) + 0.6 * Math.sin(Math.PI * prog(t, T.saki, T.saki + 0.6)) * (1 - kA);
      this.tetra(g, left, LX, CY, kB * (1 - kA), kE, kV);
      const AL = molecule(g, KEY, { x: LX, y: CY, scale: S, k: kA, atoms: left });
      molecule(g, KEY, { x: RX, y: CY, scale: S, mirror: true, k: kM });
      arrow(g, [[LX + 60, 285], [MX, 222], [RX - 60, 285]], prog(t, T.utsushita, T.utsushita + 0.6), { color: C.dim, w: 3 });
      telop(g, '4種類のちがう原子', 130, 376, prog(t, T.shurui, T.shurui + 0.8), { size: 30, weight: 500, color: '@dim' });
      // ③ bản xoay thử: bay từ trái sang, xoay dần → khớp 2/4 (F, Cl ✗)
      const u1 = smooth(prog(t, T.mawashite - 0.3, T.kasanara)), o1g = out(t, T.l17 - 0.2, 0.5);
      if (u1 > 0 && o1g < 1) {
        g.save(); g.globalAlpha = 1 - o1g;
        const landed = t >= T.kasanara;
        const AG = molecule(g, KEY, { x: lerp(LX, RX, u1), y: CY, scale: S, atoms: G.fly1(u1), ghost: landed ? { letters: ['F', 'Cl'] } : true });
        if (landed) G.trial.fit.forEach(j => { const a = AG[j]; badge(g, a.x + a.r + 26, a.y - 10, 22); tick(g, a.x + a.r + 26, a.y - 8, 14, prog(t, T.kasanara, T.kasanara + 0.3), { color: C.R }); });
        g.restore();
      }
      const o2 = out(t, T.l18 - 0.2, 0.4);
      if (o2 < 1) { g.save(); g.translate(0, 300 * o2); telop(g, '2つしか重ならない', RX, 836, prog(t, T.kasanara, T.kasanara + 0.6), { size: 36, align: 'center' }); g.restore(); }
      // ④ 不斉炭素原子: vòng quanh C
      const kC = prog(t, T.tanso17 - 0.1, T.tanso17 + 0.4) * (1 - prog(t, T.l20 - 0.6, T.l20 - 0.2)), c = AL[G.ci];
      if (kC > 0 && c) { g.save(); g.strokeStyle = C.L; g.lineWidth = 4; g.setLineDash([10, 7]); g.beginPath(); g.arc(c.x, c.y, (c.r + 18) * outBack(clamp(kC)), 0, TAU); g.stroke(); g.restore(); }
      telop(g, '不斉炭素原子', 130, 330, prog(t, T.fusei, T.fusei + 0.6), { size: 38, color: '@L' });
      // 2つを入れかえる: vòng quanh F, Cl → đổi chỗ → bản sao bay sang khớp 4/4
      const kR = prog(t, T.futatsu - 0.1, T.futatsu + 0.3) * (1 - prog(t, T.chodo, T.chodo + 0.3));
      if (kR > 0) for (const i of [G.iF, G.iCl]) { const a = AL[i]; if (a) { g.save(); g.strokeStyle = C.text; g.lineWidth = 3; g.beginPath(); g.arc(a.x, a.y, a.r + 10, 0, TAU * clamp(kR)); g.stroke(); g.restore(); } }
      const o18 = out(t, T.l19 - 0.2, 0.5);
      if (o18 < 1) {
        g.save(); g.translate(0, 320 * o18);
        telop(g, '2つを入れかえると', 130, 800, prog(t, T.futatsu, T.irekae + 0.4), { size: 36 });
        telop(g, '＝ 鏡の中の分子', RX, 836, prog(t, T.kagami18 - 0.2, T.bunshi18), { size: 36, align: 'center' });
        g.restore();
      }
      const u2 = smooth(prog(t, T.chodo, T.bunshi18 - 0.1)), o2g = out(t, T.l19 - 0.3, 0.5);
      if (u2 > 0 && o2g < 1) {
        g.save(); g.globalAlpha = 1 - o2g;
        const AG = molecule(g, KEY, { x: lerp(LX, RX, u2), y: CY, scale: S, atoms: G.fly2(u2), ghost: true });
        const kt = prog(t, T.bunshi18, T.bunshi18 + 0.4);
        if (kt > 0) G.subs.forEach(j => { const a = AG[j]; badge(g, a.x + a.r + 26, a.y - 10, 22); tick(g, a.x + a.r + 26, a.y - 8, 14, kt, { color: C.R }); });
        g.restore();
      }
      // 鏡像異性体 + 同じ / ちがう
      telop(g, '鏡像異性体', MX, 964, prog(t, T.kyozo, T.kyozo + 0.6), { size: 52, mincho: true, align: 'center' });
      telop(g, '原子も、つながり方も同じ', 130, 800, prog(t, T.genshi, T.genshi + 1.2), { size: 36 });
      telop(g, [['ちがうのは、', `700 36px ${JP}`, '@dim'], ['立体的な並び方', `700 40px ${JP}`], ['だけ', `700 36px ${JP}`, '@dim']], 1010, 800, prog(t, T.chigau, T.narabi + 0.6));
      g.restore();
    }

    // ═════ ⑤ 鍵のたとえ (câu 20–21) ═════
    if (t > T.l20 - 0.3) {
      telop(g, 'ノーベル委員会のたとえ', 150, 252, prog(t, T.iinkai - 0.2, T.iinkai + 0.8), { size: 48, mincho: true });
      const kL = prog(t, T.kagi20 - 0.1, T.kagi20 + 0.5), down = smooth(prog(t, T.au - 0.1, T.au + 0.4));
      const kRg = prog(t, T.tsukuru - 0.1, T.tsukuru + 0.5), kRs = prog(t, T.kagami21 - 0.1, T.kagami21 + 0.4);
      floorShadow(g, LX, 120 * Math.min(1, kL)); floorShadow(g, RX, 120 * Math.min(1, kRg));
      key(g, LX, 470 + 150 * down, 1, kL, { side: 'L' });                     // chìa đi xuống: phần lưỡi vào sau tấm khoá (vẽ sau)
      if (kRs <= 0) key(g, RX, 470, 1, kRg, { side: 'R', ghost: true }); else key(g, RX, 470, 1, 1, { side: 'R' });
      lock(g, LX, 700, prog(t, T.jo - 0.2, T.jo + 0.3));
      const kt = prog(t, T.au + 0.3, T.au + 0.6);
      if (kt > 0) { badge(g, LX + 140, 760, 26, { stroke: C.silver }); tick(g, LX + 140, 762, 16, kt); }
      const kx = prog(t, T.ippon, T.ippon + 0.4);
      if (kx > 0) { badge(g, RX + 120, 560, 26); cross(g, RX + 120, 560, 12, kx); }
      telop(g, 'いつも鏡うつしの2本', MX, 990, prog(t, T.kagami21 - 0.2, T.hon2 + 0.4), { size: 44, align: 'center', mincho: true });
      telop(g, '合うのは1本だけ', 1010, 252, prog(t, T.ippon - 0.2, T.ippon + 0.5), { size: 52, mincho: true });
    }
  }
}
