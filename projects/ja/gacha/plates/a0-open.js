// a0 · Cold open (p1, câu 0–15) — DNA カプセル. 0–5 s = THUMBNAIL đang chuyển động (PACKAGING §0b, §4):
//  Ⓐ câu 0–1  điện thoại ガチャ (trái, pastel) ↔ máy slot sơn mài (phải): CÙNG nhịp — hai lượt quay bấm/kéo cùng lúc, cùng
//     dừng ở vàng (★5 | 7·7·7) cùng một ánh vàng; giữa 「＝？」. Câu 1: cặp dời trái, bản đồ ベルギー vào, tem 賭博 đóng giữa.
//  Ⓑ câu 2    ảnh máy ガシャポン thật + 「日本では、ガチャは」「合法」.
//  Ⓒ câu 3    điện thoại quay → ★5 vàng; 「人気ゲーム「原神」」; 「最高レア ★5 が出る確率」 → 0.6% (khoanh mực).
//  Ⓓ câu 4    khối 1000 viên → 6 viên vàng lóe ở 「金色」; 「金色の光を見るのは 6人だけ」.
//  Ⓔ câu 5    「この数字どおりなら、100回回しても」 → 100 người: 55 viên trắng tay / 45 viên vàng (≈ 54.78%).
//  Ⓕ câu 6–10 điện thoại + bảng 確率表 tự vẽ (tấm che rút ở 「隠されて」, khoanh 0.6% ở 「ちゃんと」); bấm 回す ×3 (quay mãi);
//     tem 「確率」 bị bóc → 「設計」; bảng quay lại, điện thoại rung, cột 天井 hé bóng ~1 s rồi sụp (câu treo). Mascot phone nói câu 9–10.
//  Ⓖ câu 11–14 khay 3 viên ①②③ mở nắp lần lượt → câu hỏi; tem 違法 ở câu ③.
//  Ⓗ câu 15   3 vật nhỏ (đồ thị / não / cán cân) nối theo 「順番」 → tối về đen (intro 漆と金 từ đen).
//
// ═══ THAM SỐ VẬT DÙNG CHUNG (G3 vẽ lại ĐÚNG ở e1-2dai — LESSONS §71) ═══
//  phone(g, 440, 124, k, { state: 'spin' | 'gold', press, t })      // s = 1 (mặc định), stones 160, history mặc định
//  slot(g, 860, 130, k, { reels: [st + r·8, st + r·10, st + r·13], blur: [min(1, r·1.5), min(1, r·1.8), min(1, r·2.1)],
//                         lever, lit: r === 0 })                    // s = 1, st = slotStop('seven'), r = phần còn lăn 1 → 0
//  「＝？」 write('＝？', 745, 540, …, { font: `700 96px ${MIN}`, align: 'center' }) · nhãn telop(… 440 | 1140, 98, { size: 34, font: `700 34px ${JP}` })
//  ánh vàng chung: goldLight() bên dưới (quầng ở màn điện thoại 440,444 r 300 và đường thắng slot 1140,440 r 360).
//  Khi đặt cạnh nhau ở e1: dời cả cặp bằng g.translate — KHÔNG đổi s (s < 0.94 kit bỏ chữ trên màn / スタート).
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, dark, phone, slot, slotStop, telop, write,
  wrong, stamp, capsule, capsuleGrid, pityBars, photoTag, photoImages, figure, glint, measure, tone, rr, atLeastOne, CROWD } from '../kit.js';

const SW = 1960;                                                       // quãng trượt một khay (DNA §7: trái ← phải)
const out = (t, a, d = 0.7) => outCubic(clamp((t - a) / d));
const stageX = (t, tin, tout) => (tin == null ? 0 : (1 - outCubic(prog(t, tin, tin + 0.7))) * SW) - (tout == null ? 0 : out(t, tout) * SW);
const live = (t, tin, tout) => (tin == null || t >= tin) && (tout == null || t < tout + 0.7);
const bump = (t, a) => t < a ? 0 : t < a + 0.08 ? (t - a) / 0.08 : clamp(1 - (t - a - 0.08) / 0.22);   // nút lún rồi nhả
const shade = (g, fn, blur = 26, oy = 10, col = 'rgba(70,50,40,0.18)') => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const ST7 = slotStop('seven');

/** Ánh vàng chung (★5 | 7·7·7): quầng dịu khi đã vàng + loé mạnh lúc vừa dừng. */
function goldLight(g, a) {
  if (a <= 0) return;
  for (const [x, y, r] of [[440, 444, 300], [1140, 440, 360]]) {
    const gr = g.createRadialGradient(x, y, 20, x, y, r); gr.addColorStop(0, `rgba(255,222,120,${0.5 * a})`); gr.addColorStop(1, 'rgba(255,222,120,0)');
    g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
}
/** Vòng mực khoanh (§61: khoanh bằng mực). */
function ring(g, cx, cy, rx, ry, k) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
  g.ellipse(cx, cy, rx, ry, -0.05, -2.3, -2.3 + TAU * 1.04 * outCubic(clamp(k))); g.stroke(); g.restore();
}
function underline(g, x0, x1, y, k) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (x1 - x0) * outCubic(clamp(k)), y + 1); g.stroke(); g.restore();
}
/** Bảng 確率表 tự vẽ (DNA §8: không chụp game). cover 0..1 = tấm mờ che hàng số (1 = che kín). Trả về tâm ô 0.6%. */
function table(g, x, y, k, cover, P06, P994) {
  const w = 660, h = 360;
  if (k <= 0) return null;
  const e = outCubic(clamp(k)), dy = Math.round((1 - e) * 60);
  g.save(); g.translate(0, dy);
  shade(g, () => { g.fillStyle = C.white; g.fill(rr(x, y, w, h, 30)); }, 34, 14);
  g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke(rr(x, y, w, h, 30));
  capsule(g, x + 58, y + 64, 22, 1, { tone: 'sky', ground: false });
  write(g, '確率表', x + 98, y + 82, 1, { font: `700 52px ${MIN}` });
  g.fillStyle = C.line; g.fillRect(x + 36, y + 118, w - 72, 2);
  const r1 = y + 206, r2 = y + 300, fv = `700 60px ${JP}`;
  write(g, [['★5', `700 48px ${JP}`, '@gold'], ['（最高レア）', `500 34px ${JP}`, '@dim']], x + 44, r1, 1);
  write(g, `${P06}%`, x + w - 44, r1 + 4, 1, { font: fv, color: '@sky', align: 'right' });
  write(g, 'その他', x + 44, r2, 1, { font: `500 36px ${JP}`, color: '@dim' });
  write(g, `${P994}%`, x + w - 44, r2, 1, { font: `500 40px ${JP}`, color: '@dim', align: 'right' });
  const vw = measure(g, `${P06}%`, fv), ctr = [x + w - 44 - vw / 2, r1 - 18 + dy, vw];
  if (cover > 0) {                                                     // tấm acrylic mờ che hàng số, rút xuống khỏi bảng
    g.save(); g.clip(rr(x, y + 128, w, h - 128, [0, 0, 30, 30]));
    const cy = y + 128 + (1 - cover) * (h - 120);
    g.fillStyle = 'rgba(236,230,221,0.97)'; g.fillRect(x, cy, w, h - 128);
    g.strokeStyle = 'rgba(92,86,72,0.25)'; g.setLineDash([6, 8]); g.lineWidth = 2; g.strokeRect(x + 16, cy + 14, w - 32, h - 128 - 30); g.setLineDash([]);
    write(g, '？', x + w / 2, cy + 150, 1, { font: `700 90px ${MIN}`, color: '@dim', align: 'center' });
    g.restore();
  }
  g.restore();
  return ctr;
}
/** Đĩa trắng (vật nhỏ câu 15). */
function disc(g, cx, cy, r, k) {
  const s = outCubic(clamp(k / 0.6)) * (1 + 0.08 * Math.sin(Math.PI * clamp(k)));
  g.save(); g.translate(cx, cy); g.scale(s, s);
  shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); }, 30, 12);
  g.strokeStyle = C.faint; g.lineWidth = 1.5; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
  return () => g.restore();
}
function iconGraph(g, k) {                                            // 1 − 0.994ⁿ (đồ thị ACT 1)
  const sk = tone('@sky');
  g.strokeStyle = C.mute; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(-70, -70); g.lineTo(-70, 66); g.lineTo(78, 66); g.stroke();
  g.strokeStyle = sk.dk; g.lineWidth = 7; g.beginPath();
  const N = Math.round(60 * clamp(k));
  for (let i = 0; i <= N; i++) { const n = i * 5, x = -70 + i * 2.4, y = 66 - atLeastOne(n) * 128; i ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke();
}
function iconBrain(g, k) {                                            // não (nghiên cứu dopamine)
  const e = outCubic(clamp(k));
  g.save(); g.scale(e, e);
  g.fillStyle = '#F7CFDC'; g.strokeStyle = '#A8687E'; g.lineWidth = 5;
  const q = new Path2D();
  q.moveTo(-6, -62); q.bezierCurveTo(-40, -86, -90, -60, -84, -16); q.bezierCurveTo(-104, 10, -78, 52, -44, 50);
  q.bezierCurveTo(-30, 70, 0, 66, 6, 50); q.bezierCurveTo(30, 66, 66, 56, 70, 30); q.bezierCurveTo(98, 14, 92, -30, 66, -40);
  q.bezierCurveTo(62, -74, 20, -82, -6, -62); q.closePath();
  g.fill(q); g.stroke(q);
  g.lineCap = 'round'; g.lineWidth = 4;
  [[[-6, -62], [-14, -20], [4, 10], [6, 50]], [[-60, -30], [-36, -36], [-30, -10]], [[-62, 20], [-40, 10], [-28, 28]], [[40, -52], [30, -26], [48, -10]], [[34, 14], [56, 8], [64, 28]]].forEach(P => {
    g.beginPath(); g.moveTo(...P[0]); for (let i = 1; i < P.length; i++) g.lineTo(...P[i]); g.stroke(); });
  g.restore();
}
function iconScales(g, k) {                                           // cán cân (luật các nước)
  const a = 0.18 * Math.sin(clamp(k) * Math.PI * 2.5) * (1 - clamp(k)) + 0.06;
  g.strokeStyle = C.mute; g.fillStyle = '#E9E2D8'; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, -70); g.lineTo(0, 64); g.moveTo(-40, 66); g.lineTo(40, 66); g.stroke();
  g.save(); g.translate(0, -56); g.rotate(a);
  g.beginPath(); g.moveTo(-84, 0); g.lineTo(84, 0); g.stroke();
  for (const sx of [-1, 1]) { g.save(); g.translate(sx * 78, 0); g.rotate(-a);
    g.lineWidth = 3; g.beginPath(); g.moveTo(0, 0); g.lineTo(-26, 58); g.moveTo(0, 0); g.lineTo(26, 58); g.stroke();
    g.beginPath(); g.moveTo(-34, 58); g.quadraticCurveTo(0, 86, 34, 58); g.closePath(); g.fill(); g.lineWidth = 4; g.stroke(); g.restore(); }
  g.restore();
  g.fillStyle = C.mute; g.beginPath(); g.arc(0, -70, 8, 0, TAU); g.fill();
}

export default class Open {
  static ERA = 'studio';
  static IMAGES = photoImages('belgium', 'gashapon');
  static POSES = ['phone'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0-open');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      gacha0: w(0, 'ガチャ'), slot0: w(0, 'スロット'),
      l1: S(1), belg: w(1, 'ベルギー'), tobaku: w(1, '賭博'),
      l2: S(2), nihon: w(2, '日本'), gouhou: w(2, '合法'),
      l3: S(3), genshin: w(3, '原神'), saikou: w(3, '最高'), star5: w(3, '★5'), kakuritsu3: w(3, '確率'), p06: w(3, '0.6%'), desu3: w(3, 'です'),
      l4: S(4), n1000: w(4, '1000人'), mawasu: w(4, '回す'), kiniro: w(4, '金色'), hikari: w(4, '光'), n6: w(4, '6人'),
      l5: S(5), n100: w(5, '100回'), hanbun: w(5, '半分'), ijou: w(5, '以上'), nani: w(5, '何'),
      l6: S(6), kakuritsu6: w(6, '確率'), kakusa: w(6, '隠されて'),
      gamen: w(7, '画面'), hyou7: w(7, '表'), chanto: w(7, 'ちゃんと'),
      l8: S(8), watashi: w(8, '私'), mawashi8: w(8, '回して'), shimau: w(8, 'しまう'),
      l9: S(9), kakuritsu9: w(9, '確率'), arimasen: w(9, 'ありません'), sekkei: w(9, '設計'),
      l10: S(10), hontou: w(10, '本当'), kono10: w(10, 'この'), doori10: w(10, 'どおり'), ugoite: w(10, '動いて'), e10: E(10),
      l11: S(11), mittsu: w(11, '3つ'), toi: w(11, '問い'),
      q: [w(12, '1つ目'), w(13, '2つ目'), w(14, '3つ目')], naze12: w(12, 'なぜ'), ura: w(13, '裏'), ihou: w(14, '違法'),
      l15: S(15), suugaku: w(15, '数学'), nou: w(15, '脳'), houritsu: w(15, '法律'), junban: w(15, '順番'), end: E(15),
    };
    this.START = S(0);
    this.FROM = -0.6;                                  // trang p1 có LEAD 0.6: khung 0 của video = cảnh này
    this.TAIL = 1.0;                                   // build.json p1 tail — đen kín đúng hết câu cuối + tail
    const T = this.T;
    // lượt quay chung (cùng nhịp cho cả hai máy): [bấm/kéo, dừng ở vàng]
    this.SPINS = [[this.FROM, -0.15], [0.9, T.slot0]];
    // khay (stage): giờ vào / ra
    this.ST = {
      A: [null, T.l2 - 0.5], B: [T.l2 - 0.5, T.l3 - 0.55], C: [T.l3 - 0.55, T.l4 - 0.55], D: [T.l4 - 0.55, T.l5 - 0.4],
      E: [T.l5 - 0.4, T.l6 - 0.5], F: [T.l6 - 0.5, T.l11 - 0.5], G: [T.l11 - 0.5, T.l15 - 0.5], H: [T.l15 - 0.5, null],
    };
    // số trên hình (must ở trạng thái đã xong)
    this.P06 = must('0.006 * 100', 0.6);
    this.P994 = must('100 - 0.006 * 100', 99.4);
    this.N6 = must('1000 * 0.006', 6);
    this.NONE = must(`Math.round((1 - ${atLeastOne(100)}) * 100)`, 55);  // CONTENT: 100 lần trắng tay 54.78%
    this.SOME = must(`100 - ${this.NONE}`, 45);
    // 6 viên vàng của khối 1000 = đúng các chỉ số capsuleGrid(…, 6, { seed: 1 }) chọn (cùng hàm băm)
    const order = (n, seed) => Array.from({ length: n }, (_, i) => [hash(i * 13.7 + seed * 101.3), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);
    this.G6 = order(1000, 1).slice(0, this.N6);
    const o100 = order(100, 3);
    this.B55 = new Set(o100.slice(0, this.NONE)); must(`${o100.length - this.B55.size}`, this.SOME);
    this.MASCOT = [T.l9 - 0.3, T.e10 + 0.2];           // mascot phone nói câu 9–10 (~8.4 s)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(this.FROM + 0.05, 'reel'), c(this.SPINS[0][1], 'shimmer'), c(T.slot0, 'coin'),
      c(T.tobaku, 'hanko'), c(T.gouhou, 'pen'),
      c(T.genshin, 'gacha'), c(T.star5, 'shimmer'), c(T.p06, 'pen'),
      c(this.ST.D[0] + 0.85, 'chip'), c(T.kiniro, 'shimmer'), c(T.n6, 'pen'),
      c(T.n100, 'chip'), c(T.nani, 'pen'),
      c(T.kakusa, 'card'), c(T.hyou7, 'pen'),
      c(T.l8, 'pen'), c(T.mawashi8, 'gacha'),
      c(T.sekkei, 'pen'),
      c(T.hontou, 'tick'), c(T.doori10 - 0.2, 'tick'),
      c(T.mittsu, 'pop'), c(T.q[0], 'pop'), c(T.naze12, 'tick'), c(T.ura, 'tick'), c(T.q[2], 'pop'), c(T.ihou, 'hanko'),
      c(T.suugaku, 'pop'), c(T.houritsu, 'pop'),
    ];
  }
  /** Trạng thái lượt quay chung: r = phần còn lăn (1 → 0), press/lever, gold = đã dừng ở vàng, flash = loé lúc dừng. */
  spin(t) {
    let cur = this.SPINS[0]; for (const s of this.SPINS) if (t >= s[0]) cur = s;
    const [a, land] = cur, r = t < land ? 1 - outCubic(prog(t, a, land)) : 0;
    const flash = this.SPINS.reduce((m, [, l]) => Math.max(m, t >= l ? Math.exp(-(t - l) * 2.2) : 0), 0);
    return { r, press: bump(t, a), lever: t < land ? 1 - prog(t, a + 0.25, land) : 0, gold: t >= land, flash };
  }

  /** Chữ (テロップ, nhãn, số, tem, bảng, thẻ ảnh): neo toạ độ MÀN HÌNH khi khay trượt ngang và mờ đi trong 0.35 s TRƯỚC khi
   *  khay ra (review 2026-10-19) — chữ không bao giờ trượt qua mép vùng an toàn (x 96–1824, y ≤ 1016) và không tách khỏi vật. */
  S(g, t, fn) {
    const a = this.stOut == null ? 1 : 1 - prog(t, this.stOut - 0.35, this.stOut);
    g.save(); g.translate(-this.sdx, 0); g.globalAlpha *= a; const r = fn(); g.restore(); return r;
  }
  // Ⓐ câu 0–1: cặp thumbnail
  stageA(g, t) {
    const T = this.T, F = this.FROM, sp = this.spin(t), kIn = prog(t, F, F + 0.35);
    const dx = -150 * smooth(prog(t, T.belg - 0.25, T.belg + 0.45));
    g.save(); g.translate(dx, 0);
    // viên nang rải sàn (ảnh sản phẩm)
    [[134, 832, 46, 0.4, 'pink'], [212, 868, 34, -0.5, 'mint'], [738, 870, 30, 0.8, 'lav']]
      .forEach(([x, y, r, a, tn], i) => capsule(g, x, y, r, prog(t, F + 0.1 + i * 0.08, F + 0.5 + i * 0.08), { tone: tn, rot: a + 0.15 * Math.sin(t * 0.8 + i) }));
    goldLight(g, (sp.gold ? 0.45 : 0) + 0.6 * sp.flash);
    phone(g, 440, 124, kIn, { state: sp.gold ? 'gold' : 'spin', press: sp.press, t });
    const r = sp.r;
    slot(g, 860, 130, kIn, { reels: [ST7 + r * 8, ST7 + r * 10, ST7 + r * 13], blur: [r * 1.5, r * 1.8, r * 2.1].map(v => Math.min(1, v)), lever: sp.lever, lit: r === 0 });
    if (sp.flash > 0.05) { glint(g, 330, 300, 40 * sp.flash, sp.flash); glint(g, 1360, 300, 48 * sp.flash, sp.flash); }
    const kl = prog(t, F + 0.05, F + 0.45);
    this.S(g, t, () => telop(g, 'スマホのガチャ', 440, 98, kl, { size: 34, font: `700 34px ${JP}` }));
    this.S(g, t, () => telop(g, 'カジノのスロット', 1140, 98, kl, { size: 34, font: `700 34px ${JP}` }));
    // 「＝？」 giữa: nhấc lên khi tem 賭博 đóng xuống chỗ nó
    const lift = outCubic(prog(t, T.tobaku - 0.15, T.tobaku + 0.3));
    this.S(g, t, () => write(g, '＝？', 745, 540 - 110 * lift, prog(t, F + 0.15, F + 0.4), { font: `700 96px ${MIN}`, align: 'center' }));
    stamp(g, '賭博', 745, 610, prog(t, T.tobaku - 0.05, T.tobaku + 0.4), { size: 70, rot: -0.08 });
    g.restore();
    // câu 1: bản đồ ベルギー vào chỗ trống bên phải
    this.S(g, t, () => photoTag(g, 'belgium', 1376, 262, 424, 340, prog(t, T.belg - 0.1, T.belg + 0.6), { zoom: 1 + 0.06 * prog(t, T.belg, T.l2), rot: 0.02 }));
    this.S(g, t, () => telop(g, [['ベルギーでは、どちらも'], ['「賭博」', undefined, '@lac']], 620, 962, prog(t, T.belg + 0.1, T.tobaku + 0.3), { size: 54 }));
  }
  // Ⓑ câu 2: ガシャポン thật + 合法
  stageB(g, t) {
    const T = this.T, [tin] = this.ST.B;
    this.S(g, t, () => photoTag(g, 'gashapon', 200, 200, 720, 540, prog(t, tin + 0.35, tin + 1.0), { zoom: 1 + 0.08 * prog(t, tin + 0.4, this.ST.B[1] + 0.7), focus: [0.5, 0.45] }));
    this.S(g, t, () => telop(g, '日本では、ガチャは', 1390, 330, prog(t, T.nihon - 0.1, T.gouhou - 0.1), { size: 56 }));
    const kg = prog(t, T.gouhou - 0.1, T.gouhou + 0.35);
    this.S(g, t, () => write(g, '合法', 1390, 640, kg, { font: `700 200px ${MIN}`, align: 'center' }));
    this.S(g, t, () => underline(g, 1200, 1580, 690, prog(t, T.gouhou + 0.3, T.gouhou + 0.8)));
  }
  // Ⓒ câu 3: điện thoại → ★5 vàng; 0.6%
  stageC(g, t) {
    const T = this.T, gold = t >= T.star5, fl = t >= T.star5 ? Math.exp(-(t - T.star5) * 2.2) : 0;
    if (gold) { const gr = g.createRadialGradient(470, 490, 20, 470, 490, 320); gr.addColorStop(0, `rgba(255,222,120,${0.35 + 0.4 * fl})`); gr.addColorStop(1, 'rgba(255,222,120,0)'); g.fillStyle = gr; g.fillRect(150, 170, 640, 640); }
    phone(g, 470, 170, 1, { state: gold ? 'gold' : t >= T.genshin ? 'spin' : 'idle', press: bump(t, T.genshin), t });
    if (fl > 0.05) glint(g, 600, 380, 46 * fl, fl);
    this.S(g, t, () => telop(g, '人気ゲーム「原神」', 470, 100, prog(t, T.l3 - 0.1, T.genshin + 0.4), { size: 40 }));
    this.S(g, t, () => write(g, [['最高レア ', `700 60px ${MIN}`], ['★5', `700 60px ${JP}`, '@gold'], [' が出る確率', `700 60px ${MIN}`]], 1300, 340, prog(t, T.saikou - 0.1, T.kakuritsu3 + 0.4), { align: 'center' }));
    this.S(g, t, () => write(g, `${this.P06}%`, 1300, 660, prog(t, T.p06 - 0.15, T.p06 + 0.5), { font: `700 240px ${MIN}`, color: '@sky', align: 'center' }));
    this.S(g, t, () => ring(g, 1300, 580, 330, 150, prog(t, T.p06 + 0.7, T.p06 + 1.3)));
  }
  // Ⓓ câu 4: 1000 viên, 6 vàng
  stageD(g, t) {
    const T = this.T, [tin] = this.ST.D;
    this.S(g, t, () => telop(g, '1000人が 1回ずつ回すと', 960, 100, prog(t, T.n1000 - 0.1, T.mawasu + 0.3), { size: 50 }));
    const box = { x: 300, y: 170, w: 1320, h: 680 };
    const G = capsuleGrid(g, box, 1000, 0, prog(t, tin + 0.85, T.mawasu + 0.4), { seed: 1, tones: CROWD });
    this.G6.forEach((i, j) => {
      const [x, y] = G.pos(i), k = prog(t, T.kiniro + j * 0.1, T.kiniro + 0.4 + j * 0.1);
      if (k <= 0) return;
      const pulse = 0.5 + 0.5 * Math.exp(-Math.max(0, t - T.hikari) * 1.5);
      const hg = g.createRadialGradient(x, y, G.r, x, y, G.r * 5); hg.addColorStop(0, `rgba(255,214,110,${0.7 * k * pulse})`); hg.addColorStop(1, 'rgba(255,214,110,0)');
      g.fillStyle = hg; g.fillRect(x - G.r * 5, y - G.r * 5, G.r * 10, G.r * 10);
      capsule(g, x, y, G.r * 1.6, k, { gold: true, ground: false, glow: 1 });
      glint(g, x + G.r * 1.2, y - G.r * 1.2, 22 * pulse, k);
    });
    this.S(g, t, () => telop(g, [['金色の光を見るのは '], [`${this.N6}人`, undefined, '@gold'], ['だけ']], 960, 948, prog(t, T.n6 - 0.6, T.n6 + 0.5), { size: 56 }));
  }
  // Ⓔ câu 5: 100 người × 100 lần
  stageE(g, t) {
    const T = this.T;
    this.S(g, t, () => telop(g, [['この数字どおりなら、', undefined, '@dim'], ['100回 回しても']], 960, 100, prog(t, T.l5 - 0.1, T.n100 + 0.9), { size: 50 }));
    const box = { x: 660, y: 172, w: 600, h: 600 }, ft = i => T.hanbun + (i / 100) * 1.0;
    const golds = [], blank = [];
    for (let i = 0; i < 100; i++) if (t >= ft(i)) (this.B55.has(i) ? blank : golds).push(i);
    capsuleGrid(g, box, 100, golds, prog(t, this.ST.E[0] + 0.3, T.n100 + 0.7), { cols: 10, seed: 3, blank, glints: false });
    const kl = prog(t, T.ijou - 0.1, T.ijou + 0.5);
    this.S(g, t, () => write(g, '1つぶ＝1人（100回ずつ）', 960, 830, prog(t, T.hanbun, T.hanbun + 0.6), { font: `600 32px ${JP}`, color: '@dim', align: 'center' }));
    this.S(g, t, () => write(g, [['★5', `700 44px ${JP}`, '@gold'], ['が出た', `700 44px ${MIN}`]], 390, 380, kl, { align: 'center' }));
    this.S(g, t, () => write(g, [['≈', `700 90px ${JP}`, '@gold'], [`${this.SOME}人`, `700 110px ${MIN}`, '@gold']], 390, 520, kl, { align: 'center' }));
    this.S(g, t, () => write(g, '何も出ない', 1530, 380, kl, { font: `700 44px ${MIN}`, align: 'center' }));
    this.S(g, t, () => write(g, [['≈', `700 90px ${JP}`], [`${this.NONE}人`, `700 110px ${MIN}`]], 1530, 520, kl, { align: 'center' }));
    this.S(g, t, () => telop(g, '半分以上の人は、何も手に入らない', 960, 948, prog(t, T.nani - 0.2, T.nani + 0.8), { size: 56 }));
  }
  // Ⓕ câu 6–10: điện thoại + 確率表 → 確率 / 設計 → hé bóng 天井
  stageF(g, t) {
    const T = this.T, [tin] = this.ST.F;
    // điện thoại: chờ → bấm 3 lần (câu 8) → không gì → rung (câu 10)
    const presses = [T.watashi, T.mawashi8, T.shimau], press = Math.max(...presses.map(a => bump(t, a)));
    const state = t >= T.hontou ? 'spin' : t >= T.watashi ? 'spin' : 'idle';
    const vib = t >= T.hontou ? (Math.floor((t - T.hontou) / 0.45) % 2 === 0 ? 1 : 0) * prog(t, T.hontou, T.hontou + 0.1) : 0;
    g.save(); g.translate(Math.round(vib * 5 * Math.sin(t * 90)), 0);
    phone(g, 400, 170, 1, { state, press, t });
    g.restore();
    // bảng 確率表: vào ở 「確率」, tấm che rút ở 「隠されて」; rời lên ở câu 9, quay lại ở câu 10
    const up = out(t, T.l9 - 0.35, 0.6) - out(t, T.l10 - 0.1, 0.6);
    const kT = prog(t, T.kakuritsu6 - 0.3, T.kakuritsu6 + 0.3);
    if (up < 1) {
      g.save(); g.translate(0, -700 * up);
      const ctr = this.S(g, t, () => table(g, 740, 230, kT, 1 - prog(t, T.kakusa, T.kakusa + 0.6), this.P06, this.P994));
      if (ctr) {
        this.S(g, t, () => ring(g, ctr[0], ctr[1], ctr[2] / 2 + 34, 52, prog(t, T.chanto - 0.1, T.chanto + 0.5)));
        // 「画面の確率表」: đường chấm từ màn điện thoại sang bảng
        const kc = prog(t, T.gamen, T.gamen + 0.6);
        if (kc > 0) { g.save(); g.setLineDash([3, 12]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 5; g.beginPath(); g.moveTo(560, 470); g.lineTo(560 + (735 - 560) * outCubic(kc), 470 - 60 * outCubic(kc)); g.stroke(); g.restore(); }
      }
      g.restore();
    }
    // câu 8: それでも、回してしまう
    const o8 = out(t, T.l9 - 0.3, 0.5);
    if (o8 < 1) { g.save(); g.translate(0, 220 * o8); this.S(g, t, () => telop(g, 'それでも、回してしまう', 1000, 950, prog(t, T.l8 - 0.1, T.shimau + 0.3), { size: 56 })); g.restore(); }
    // câu 9: 確率 (tem bóc) → 設計
    const o9 = out(t, T.l10 - 0.15, 0.6);
    if (t > T.l9 - 0.3 && o9 < 1) {
      g.save(); g.translate(0, -800 * o9);
      this.S(g, t, () => write(g, '理由は', 1010, 270, prog(t, T.l9 - 0.1, T.l9 + 0.4), { font: `700 44px ${MIN}`, color: '@dim', align: 'center' }));
      this.S(g, t, () => wrong(g, '確率', 1010, 420, prog(t, T.kakuritsu9 - 0.2, T.kakuritsu9 + 0.3), { size: 80, peel: prog(t, T.arimasen, T.arimasen + 0.9) }));
      this.S(g, t, () => telop(g, '設計', 1010, 680, prog(t, T.sekkei - 0.1, T.sekkei + 0.4), { size: 110 }));
      g.restore();
    }
    // câu 10: cột 天井 hé bóng ~1 s rồi sụp (câu treo)
    if (t > T.doori10 - 0.4) {
      const kb = Math.min(prog(t, T.doori10 - 0.4, T.doori10 + 0.3), 1 - prog(t, T.ugoite + 0.4, T.ugoite + 0.9));
      if (kb > 0) { g.save(); g.globalAlpha = 0.38; pityBars(g, { x: 720, y: 560, w: 700, h: 330 }, kb, { labels: false, notes: false, ceil: false }); g.restore(); }
    }
    this.S(g, t, () => telop(g, 'この数字どおりには、動いていない', 1000, 960, prog(t, T.kono10 - 0.1, T.ugoite + 0.4), { size: 48 }));
    // mascot phone (nói câu 9–10), vẽ sau cùng ở mép phải
    const [m0, m1] = this.MASCOT;
    if (t > m0 && t < m1 + 0.7) { g.save(); g.translate(0, 520 * out(t, m1, 0.6)); figure(g, 'phone', 1690, H, 460, prog(t, m0, m0 + 0.6), { t }); g.restore(); }
  }
  // Ⓖ câu 11–14: khay 3 viên ①②③
  stageG(g, t) {
    const T = this.T;
    this.S(g, t, () => telop(g, '3つの問い', 960, 110, prog(t, T.toi - 0.4, T.toi + 0.4), { size: 56 }));
    shade(g, () => { g.fillStyle = 'rgba(255,255,255,0.55)'; g.fill(rr(140, 196, 1640, 724, 40)); }, 34, 14, 'rgba(70,50,40,0.14)');
    g.strokeStyle = 'rgba(255,255,255,0.95)'; g.lineWidth = 3; g.stroke(rr(141.5, 197.5, 1637, 721, 39));
    const QS = [
      [[`${this.P06}%`, undefined, '@sky'], ['と知っていて、なぜ回してしまうのか']],
      [['確率表の数字の裏で、何が起きているのか']],
      [['なぜベルギーでは'], ['違法', undefined, '@lac'], ['で、日本では合法なのか']],
    ];
    const MARK = [['なぜ回してしまうのか', 'naze12'], ['裏で、何が起きているのか', 'ura'], null];
    const tones = ['pink', 'mint', 'lav'], font = `700 46px ${MIN}`;
    [330, 558, 786].forEach((cy, i) => {
      const q = T.q[i], kc = prog(t, T.mittsu + i * 0.22, T.mittsu + 0.5 + i * 0.22);
      capsule(g, 310, cy, 76, kc, { tone: tones[i], rot: -0.45 + 0.08 * Math.sin(t * 1.3 + i), open: prog(t, q, q + 0.5), ground: false });
      if (kc > 0) this.S(g, t, () => { g.fillStyle = C.white; g.beginPath(); g.arc(372, cy - 60, 30 * outCubic(kc), 0, TAU); g.fill(); g.strokeStyle = C.faint; g.lineWidth = 1.5; g.stroke();
        write(g, ['①', '②', '③'][i], 372, cy - 46, kc, { font: `700 40px ${JP}`, align: 'center' }); });
      const b = this.S(g, t, () => telop(g, QS[i], 420, cy, prog(t, q + 0.2, q + 2.2), { size: 46, align: 'left' }));
      const m = MARK[i];
      if (m) { const full = QS[i].map(p => p[0]).join(''), pre = full.slice(0, full.indexOf(m[0])), x0 = b.x + 44 + measure(g, pre, font);
        this.S(g, t, () => underline(g, x0, x0 + measure(g, m[0], font), cy + 30, prog(t, T[m[1]], T[m[1]] + 0.6))); }
    });
    stamp(g, '違法', 1610, 786, prog(t, T.ihou - 0.05, T.ihou + 0.4), { size: 50, rot: -0.1 });
  }
  // Ⓗ câu 15: 3 vật nhỏ theo thứ tự
  stageH(g, t) {
    const T = this.T, X = [560, 960, 1360], Y = 470, at = [T.suugaku, T.nou, T.houritsu], icons = [iconGraph, iconBrain, iconScales];
    const kp = prog(t, T.junban - 0.1, T.junban + 0.8);
    if (kp > 0) { g.save(); g.setLineDash([2, 14]); g.lineCap = 'round'; g.strokeStyle = C.mute; g.lineWidth = 6;
      const x0 = X[0] + 150, x1 = X[2] - 150, xe = x0 + (x1 - x0) * outCubic(kp);
      g.beginPath(); g.moveTo(x0, Y); g.lineTo(xe, Y); g.stroke(); g.restore(); }
    X.forEach((x, i) => {
      const k = prog(t, at[i] - 0.1, at[i] + 0.5);
      if (k <= 0) return;
      const done = disc(g, x, Y, 130, k); icons[i](g, prog(t, at[i] + 0.1, at[i] + 1.0)); done();
      this.S(g, t, () => telop(g, ['数学', '脳の研究', '各国の法律'][i], x, 690, prog(t, at[i], at[i] + 0.6), { size: 44 }));
    });
  }
  render(g, t) {
    const T = this.T, ST = this.ST;
    ground(g, t);
    const stages = [['A', this.stageA], ['B', this.stageB], ['C', this.stageC], ['D', this.stageD], ['E', this.stageE], ['F', this.stageF], ['G', this.stageG], ['H', this.stageH]];
    for (const [key, fn] of stages) {
      const [tin, tout] = ST[key];
      if (!live(t, tin, tout)) continue;
      this.sdx = Math.round(stageX(t, tin, tout)); this.stOut = tout;
      g.save(); g.translate(this.sdx, 0); fn.call(this, g, t); g.restore();
    }
    dark(g, 1 - prog(t, T.end - 0.25, T.end + this.TAIL - 0.15));
  }
}
