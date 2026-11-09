// a0 · Cold open (p1, câu 0–15). DNA a0「合わせ鏡」: gương bạc ở x = 930 (vật xuyên suốt) trồi lên từ khe bàn trong bóng tối, rồi:
//  ① 両手 — mascot `halt` (lật, lòng bàn tay sát gương, KHÔNG nói) + ảnh của cậu trong gương (bản lạnh, bên phải)
//  ② 右手と左手 — hai bàn tay vẽ (左 hổ phách / 右 azure); 重ねて: bản xoay thử nét đứt trượt sang, ngón cái lệch (合いません) → ✗ + gương rạn,
//     「重ならない」; 鏡に映した姿: đường chấm nối từng đầu ngón qua gương
//  ③ 分子にも — L-alanine trên tay trái, bản gương trên tay phải (một file, x → −x; R/S kiểm trong kit); 生き物: biểu tượng ở phía 左,
//     phân tử phía 右 thành bóng nét đứt 「片方の手だけ」
//  ④ 実験室 — ống nghiệm hai phía gương, hạt hổ phách / azure 50 : 50, 「半分ずつ」 → 「なぜ片方だけ？」
//  ⑤ 2026年10月7日 · ストックホルム + huy chương (vàng chỉ cho Nobel) → カガン 95歳 (trái) / 硤合憲三 76歳 (phải, ảnh ≤ 160 px)
//     → 10 huy chương nhỏ 「日本人10人目」「2年連続」 → điện thoại reo + túi đi chợ
//  ⑥ 3つの問い — mascot `point` (NÓI) bên trái chỉ ba ô kính ①②③ dọc mép gương (kit.panes) → 「答えは…意外」 → gương tối, đen (intro).
import { W, H, C, MX, MIN, JP, BENCH, QUESTIONS, clamp, prog, lookup, must, outCubic, smooth, hash, ground, dark, mirror, write, telop,
  mismatch, nobelText, flipWrite, measure, cross, arrow, molecule, stereo, hand, tube, nobel, photo, figure, panes, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
// dòng tiêu đề trên-trái (canh phải về MX − 44): mỗi mục viết NGƯỢC gương rồi lật (kit.flipWrite, bóng chữ ngược bên phải);
// mục cũ trượt lên khỏi khung khi mục mới tới. items: [[mốc, chữ | null, cỡ?]] tăng dần.
function headline(g, t, items, y = 176) {
  let i = -1; for (let j = 0; j < items.length; j++) if (t >= items[j][0]) i = j;
  const draw = (it, dy) => { const [a, s, size = 56] = it; if (!s) return;
    const font = `700 ${size}px ${MIN}`, x = MX - 44 - measure(g, s, font);
    g.save(); g.beginPath(); g.rect(0, 64, W, H); g.clip(); g.translate(0, -dy); flipWrite(g, s, x, y, t, a, { font, ghost: true }); g.restore(); };
  if (i >= 1) { const e = out(t, items[i][0], 0.35); if (e < 1) draw(items[i - 1], 170 * e); }
  if (i >= 0) draw(i >= 1 ? [items[i][0] + 0.3, ...items[i].slice(1)] : items[i], 0);   // mục mới lật sau khi mục cũ đã rời (0.3 s)
}
// điện thoại reo (vẽ): k vào, ring 0..1 rung + vòng sóng
function phone(g, x, y, k, ring) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), sh = ring > 0 && ring < 1 ? Math.sin(ring * 60) * 4 : 0;
  g.save(); g.translate(x + sh, y + (1 - e) * 200); g.rotate(-0.12);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.roundRect(-52, -92, 116, 196, 18); g.fill();
  g.fillStyle = '#1A2133'; g.strokeStyle = C.silver; g.lineWidth = 3; g.beginPath(); g.roundRect(-58, -100, 116, 200, 18); g.fill(); g.stroke();
  g.fillStyle = '#2A3A5A'; g.fillRect(-46, -78, 92, 150);
  g.fillStyle = C.text; g.beginPath(); g.arc(0, -10, 16, 0, 7); g.fill(); g.fillRect(-26, 20, 52, 6);
  g.restore();
  if (ring > 0 && ring < 1) for (let i = 0; i < 3; i++) { const r = 80 + 30 * i + 20 * ((ring * 6) % 1);
    g.save(); g.strokeStyle = `rgba(201,210,224,${0.6 - i * 0.15})`; g.lineWidth = 3; g.lineCap = 'round';
    for (const s of [-1, 1]) { g.beginPath(); g.arc(x, y, r, s < 0 ? Math.PI - 0.5 : -0.5, s < 0 ? Math.PI + 0.5 : 0.5); g.stroke(); } g.restore(); }
}
// túi đi chợ giấy (vẽ) + cọng hành
function bag(g, x, y, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 200);
  g.strokeStyle = '#7FB069'; g.lineWidth = 8; g.lineCap = 'round';
  for (const [dx, a] of [[-20, -0.25], [0, -0.05], [18, 0.2]]) { g.beginPath(); g.moveTo(dx, -40); g.lineTo(dx + Math.sin(a) * 120, -40 - Math.cos(a) * 120); g.stroke(); }
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-78, -52, 168, 170);
  g.fillStyle = '#B08A5A'; g.beginPath(); g.moveTo(-86, -60); g.lineTo(86, -60); g.lineTo(76, 110); g.lineTo(-76, 110); g.closePath(); g.fill();
  g.strokeStyle = '#5E4528'; g.lineWidth = 3; g.stroke();
  g.strokeStyle = '#5E4528'; g.lineWidth = 6; g.beginPath(); g.arc(0, -60, 34, Math.PI, 0); g.stroke();
  g.restore();
}
// biểu tượng sự sống (nét hổ phách): 0 lá, 1 vi khuẩn, 2 người
function icon(g, kind, x, y, k) {
  if (k <= 0) return;
  const s = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - s) * 60); g.strokeStyle = C.L; g.lineWidth = 4; g.lineCap = g.lineJoin = 'round'; g.fillStyle = 'rgba(242,165,65,0.12)';
  if (kind === 0) { g.beginPath(); g.moveTo(0, 50); g.quadraticCurveTo(-60, -10, 0, -60); g.quadraticCurveTo(60, -10, 0, 50); g.fill(); g.stroke(); g.beginPath(); g.moveTo(0, 60); g.lineTo(0, -45); g.stroke(); }
  else if (kind === 1) { g.beginPath(); g.roundRect(-55, -24, 110, 48, 24); g.fill(); g.stroke();
    for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(55, -10 + i * 10); g.bezierCurveTo(75, -25 + i * 10, 85, 5 + i * 10, 105, -10 + i * 14); g.stroke(); } }
  else { g.beginPath(); g.arc(0, -42, 20, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(-36, 60); g.quadraticCurveTo(-36, -12, 0, -12); g.quadraticCurveTo(36, -12, 36, 60); g.fill(); g.stroke(); }
  g.restore();
}

export default class Open {
  static ERA = 'mirror';
  static POSES = ['halt', 'point'];
  static IMAGES = { kagan: './assets/history/kagan.jpg', soai: './assets/history/soai.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'a0');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l0: S(0), ryote: w(0, '両手'), kao: w(0, '顔'), dashite: w(0, '出して'),
      l1: S(1), migi1: w(1, '右手'), hidari1: w(1, '左手'), katachi: w(1, '形'), sokkuri: w(1, 'そっくり'), kasane: w(1, '重ねて'), pittari: w(1, 'ぴったり'), kasanara: w(1, '合いません'), e1: E(1),
      l2: S(2), kagami2: w(2, '鏡'), utsushi: w(2, '映した'), e2: E(2),
      l3: S(3), karada: w(3, '体'), bunshi3: w(3, '分子'), migi3: w(3, '右手'), hidari3: w(3, '左手'), e3: E(3),
      l4: S(4), chikyu: w(4, '地球'), ikimono: w(4, '生き物'), saikin: w(4, '細菌'), watashi: w(4, '私'), katahou4: w(4, '片方'), tsukatte: w(4, '使って'),
      l5: S(5), kagaku: w(5, '化学者'), jikken: w(5, '実験室'), tsukuru: w(5, '作る'), migi5: w(5, '右'), hidari5: w(5, '左'), hanbun: w(5, '半分'), e5: E(5),
      l6: S(6), naze6: w(6, 'なぜ'), erabu: w(6, '選んだ'), e6: E(6),
      l7: S(7), date: w(7, '2026年10月7日'), nazo: w(7, '謎'), kotaeta: w(7, '答えた'), nobel7: w(7, 'ノーベル'), okura: w(7, '贈られました'),
      l8: S(8), france: w(8, 'フランス'), kagan: w(8, 'カガンさん'), age95: w(8, '95歳'),
      l9: S(9), tokyo: w(9, '東京'), soai: w(9, '硤合憲三'), age76: w(9, '76歳'),
      l10: S(10), nihon: w(10, '日本'), ten: w(10, '10人目'), nen2: w(10, '2年'),
      l11: S(11), denwa: w(11, '電話'), natta: w(11, '鳴った'), soai11: w(11, '硤合'), kaimono: w(11, '買い物'), e11: E(11),
      l12: S(12), mittsu: w(12, '3つ'), toi: w(12, '問い'),
      q: [w(13, '1つ目'), w(14, '2つ目'), w(15, '3つ目')], kusuri: w(15, '薬'), kotae: w(15, '答え'), igai: w(15, '意外'), end: E(15),
    };
    this.START = S(0);
    this.FROM = -0.5;                                  // lead p1 0.6: trang mở trong bóng tối
    this.TAIL = 1.0;                                   // build.json p1 tail — đen kín đúng hết câu cuối + tail
    // số trên hình (CONTENT.md): tuổi tính từ ngày sinh tới 2026-10-07; 10 người Nhật; 50 : 50
    const age = (y, m, d) => 2026 - y - ((10 * 100 + 7) < (m * 100 + d) ? 1 : 0);
    must(`${age(1930, 12, 15)}`, 95); must(`${age(1950, 5, 3)}`, 76);
    must('50 + 50', 100);
    must(`'${stereo('L-alanine')[0].cip}${stereo('L-alanine', { mirror: true })[0].cip}'`, 'SR');   // L-alanine = S, bản gương = R (D)
    // mascot halt (lật): thân 330–850, ảnh trong gương 1010–1530 — không chạm dải gương ±40 (kit.figure ném lỗi nếu chạm)
    this.HALT = { cx: 590, h: 760 }; this.POINT = { cx: 405, h: 560 };   // point: ảnh x 5–795 (trong khung), đầu ngón ≈ 785 < gương
    must('590 + 520 / 2 < 930 - 40', true);
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.35, 'flip', -4), cue(T.kao, 'flip', -6),
      cue(T.migi1, 'telop'), cue(T.sokkuri, 'flip', -6), cue(T.kasane, 'whoosh', -4), cue(T.kasanara, 'crack'),
      cue(T.utsushi, 'flip', -6),
      cue(T.bunshi3, 'mol'), cue(T.migi3, 'telop', -4), cue(T.chikyu, 'flip', -6), cue(T.katahou4, 'snap', -4),
      cue(T.jikken, 'tube'), cue(T.tsukuru, 'glass', -4), cue(T.hanbun, 'flip', -6),
      cue(T.naze6, 'pop', -6),
      cue(T.date, 'page'), cue(T.nobel7, 'nobel'),
      cue(T.kagan, 'photo'), cue(T.soai, 'photo'),
      cue(T.ten, 'nobel', -4), cue(T.nen2, 'telop', -4),
      cue(T.natta, 'tick'), cue(T.kaimono, 'pop'),
      cue(T.mittsu, 'glass'), ...T.q.map(t => cue(t, 'tick', -2)), cue(T.q[0] + 2.2, 'pop', -6), cue(T.q[1] + 2.0, 'pop', -6),
      cue(T.kotae - 0.1, 'flip', -4),
      cue(T.kagaku, 'flip', -6), cue(T.l3 + 0.3, 'whoosh', -8), cue(T.l5 - 0.3, 'whoosh', -8), cue(T.tokyo, 'telop', -6), cue(T.l12 - 0.2, 'whoosh', -6), cue(T.kusuri + 0.6, 'pop', -6), cue(T.nazo, 'telop', -4), cue(T.l10 + 0.2, 'tick', -4),
    ];
  }
  render(g, t) {
    const T = this.T, k0 = prog(t, this.FROM + 0.1, this.FROM + 0.8);
    ground(g, 'mirror', t);

    // ── tiêu đề trên-trái (lật gương) ──
    headline(g, t, [[T.kao - 0.2, '両手を、顔の前に'], [T.sokkuri - 0.2, '形はそっくり'], [T.utsushi - 0.2, '鏡に映した姿'], [T.bunshi3 - 0.1, '分子にも、右手と左手'],
      [T.chikyu, '地球の生き物は'], [T.kagaku, '化学者がつくると'], [T.naze6, 'なぜ片方だけ？', 64], [T.date - 0.4, null], [T.l12 - 0.2, '3つの問い', 64], [T.kotae - 0.1, '答えは、少し意外', 56]]);

    // ── ① mascot halt + ảnh trong gương (câu 0) → chìm xuống ở câu 1 ──
    const oM = out(t, T.migi1 - 0.5, 0.6);
    if (oM < 1) {
      const kM = prog(t, T.ryote - 0.4, T.ryote + 0.2), dy = 800 * oM, { cx, h } = this.HALT;
      g.save(); g.translate(0, dy);
      figure(g, 'halt', 2 * MX - cx, H, h, kM, { glass: true });                 // ảnh trong gương (không lật = ảnh gương của bản lật)
      figure(g, 'halt', cx, H, h, kM, { flip: true });                           // tay sát gương, KHÔNG nói
      g.restore();
    }

    // ── ② hai bàn tay (câu 1–2) → co xuống làm bệ cho phân tử (câu 3) → rời (câu 5) ──
    const oH = out(t, T.l5 - 0.4, 0.6);
    const shrink = smooth(prog(t, T.l3 - 0.2, T.l3 + 0.6));
    const HX = 560, HY = 540 + 230 * shrink, HS = 110 - 45 * shrink, RX = 2 * MX - HX;
    if (t > T.migi1 - 0.6 && oH < 1) {
      g.save(); g.translate(0, 600 * oH);
      const kR = prog(t, T.migi1 - 0.2, T.migi1 + 0.4), kL = prog(t, T.hidari1 - 0.2, T.hidari1 + 0.4);
      floorShadow(g, HX, 200 * Math.min(1, kL)); floorShadow(g, RX, 200 * Math.min(1, kR));
      hand(g, RX, HY, HS, kR, { side: 'R' }); hand(g, HX, HY, HS, kL, { side: 'L' });
      if (shrink < 1) {
        const lab = (s, x, col, k) => telop(g, s, x, HY + HS * 1.6 + 60, k * (1 - shrink), { size: 44, align: 'center', color: col, mincho: true });
        lab('右手', RX, '@R', prog(t, T.migi1, T.migi1 + 0.4)); lab('左手', HX, '@L', prog(t, T.hidari1, T.hidari1 + 0.4));
      }
      // 重ねて: bản xoay thử (nét đứt) của tay trái trượt sang chồng lên tay phải → ngón cái lệch
      const kg = smooth(prog(t, T.kasane, T.pittari + 0.2)), back = smooth(prog(t, T.l2 - 0.3, T.l2 + 0.3));
      if (kg > 0 && back < 1) {
        const gx = HX + (RX - HX) * kg * (1 - back);
        hand(g, gx, HY, HS, 1, { side: 'L', ghost: true });
        const kx = prog(t, T.kasanara, T.kasanara + 0.4) * (1 - back);
        if (kx > 0) { cross(g, RX + HS * 1.45, HY - HS * 0.55, 16, kx); cross(g, RX - HS * 1.45, HY - HS * 0.55, 16, kx); }
      }
      // 鏡に映した姿: đường chấm từ đầu ngón tay trái qua gương tới đầu ngón tay phải
      const kd = prog(t, T.utsushi - 0.3, T.utsushi + 0.6) * (1 - prog(t, T.l3 - 0.4, T.l3));
      if (kd > 0) { g.save(); g.setLineDash([6, 10]); g.strokeStyle = C.silver; g.lineWidth = 2;
        for (const [fx, L] of [[-0.72, 1.2], [-0.25, 1.5], [0.22, 1.42], [0.66, 1.1]]) { const y = HY - HS * 0.7 - HS * L + 6, x0 = HX + fx * HS, x1 = RX - fx * HS;
          g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (x1 - x0) * outCubic(kd), y); g.stroke(); } g.restore(); }
      g.restore();
    }
    const kMis = prog(t, T.kasanara, T.kasanara + 0.5) * (1 - prog(t, T.l2 - 0.3, T.l2));
    if (kMis > 0) mismatch(g, '重ならない', 2 * MX - 560, 900, kMis, { size: 52, mincho: true, align: 'center' });

    // ── ③ phân tử trên tay (câu 3–4) ──
    if (t > T.bunshi3 - 0.5 && oH < 1) {
      g.save(); g.translate(0, 600 * oH);
      const km = prog(t, T.bunshi3 - 0.1, T.bunshi3 + 0.5), rot = 0.6 + 0.22 * (t - T.bunshi3), y = 470;
      molecule(g, 'L-alanine', { x: HX, y, scale: 68, rot, k: km });
      const ghost = t >= T.katahou4;
      molecule(g, 'L-alanine', { x: RX, y, scale: 68, rot, k: km, mirror: true, ghost });
      // sự sống: lá · vi khuẩn · người — phía 左
      icon(g, 0, 170, 800, prog(t, T.ikimono, T.ikimono + 0.4)); icon(g, 1, 330, 810, prog(t, T.saikin, T.saikin + 0.4)); icon(g, 2, 760, 800, prog(t, T.watashi, T.watashi + 0.4));
      telop(g, '片方の手だけ', HX, 262, prog(t, T.katahou4, T.katahou4 + 0.6), { size: 48, color: '@L', align: 'center', mincho: true });
      g.restore();
    }

    // ── ④ ống nghiệm 50 : 50 (câu 5–6) → rời trước câu 7 ──
    const oT = out(t, T.l7 - 0.5, 0.6);
    if (t > T.jikken - 0.4 && oT < 1) {
      g.save(); g.translate(0, 700 * oT);
      const kt = prog(t, T.jikken - 0.2, T.jikken + 0.4), fill = 0.08 + 0.6 * smooth(prog(t, T.tsukuru, T.tsukuru + 1.2));
      for (const x of [560, 2 * MX - 560]) { floorShadow(g, x, 90); tube(g, x, 800, 380, kt, { fill, mix: 0.5, n: 30, seed: x === 560 ? 1 : 2 }); }
      // mỗi ống đều lẫn hai loại → chú thích dưới TỪNG ống: 「左50%・右50%」 (lời đọc: 右 rồi 左)
      for (const x of [560, 2 * MX - 560]) telop(g, [['左50%', `700 40px ${JP}`, '@L'], ['・', `700 40px ${JP}`, '@dim'], ['右50%', `700 40px ${JP}`, '@R']],
        x, 880, prog(t, T.migi5, T.hidari5 + 0.5), { align: 'center' });
      telop(g, '半分ずつ', MX, 990, prog(t, T.hanbun, T.hanbun + 0.5), { size: 52, align: 'center', mincho: true });
      g.restore();
    }

    // ── ⑤ Nobel (câu 7) ──
    const oN = out(t, T.l8 - 0.4, 0.5);
    if (t > T.date - 0.4 && oN < 1) {
      g.save(); g.translate(-1000 * oN, 0);
      telop(g, '2026年10月7日', 120, 330, prog(t, T.date, T.date + 0.8), { size: 72 });
      telop(g, 'ストックホルム', 124, 410, prog(t, T.date + 0.6, T.date + 1.2), { size: 40, color: '@dim' });
      telop(g, 'この謎に答えた二人に', 120, 560, prog(t, T.nazo, T.kotaeta + 0.6), { size: 48, mincho: true });
      g.restore();
      g.save(); g.translate(1000 * oN, 0);
      nobel(g, 1380, 470, 140, prog(t, T.nobel7 - 0.1, T.nobel7 + 0.5), { spin: 2.5 * (1 - smooth(prog(t, T.nobel7, T.nobel7 + 1.2))) });
      nobelText(g, 'ノーベル化学賞', 1380, 720, prog(t, T.nobel7 + 0.2, T.nobel7 + 1.0), { size: 56, mincho: true, align: 'center' });
      g.restore();
    }
    // ── カガン (câu 8, trái) · 硤合 (câu 9, phải) · 10人目 (câu 10) ──
    const oK = out(t, T.l11 - 0.4, 0.6), oS = out(t, T.l12 - 0.5, 0.6);
    if (t > T.l8 - 0.6 && oK < 1) {
      g.save(); g.translate(-1000 * oK, 0);
      telop(g, 'フランス', 560, 300, prog(t, T.france, T.france + 0.4), { size: 40, color: '@dim' });
      photo(g, 'kagan', 300, 250, 300, prog(t, T.l8 - 0.2, T.kagan + 0.3), { sub: '95歳', subSize: 56 });
      g.restore();
    }
    if (t > T.l9 - 0.6 && oS < 1) {
      g.save(); g.translate(1000 * oS, 0);
      photo(g, 'soai', 1010, 250, 160, prog(t, T.soai - 0.3, T.soai + 0.5), { sub: '76歳', subSize: 56 });
      telop(g, '東京理科大学', 1170, 300, prog(t, T.tokyo, T.tokyo + 0.6), { size: 40, color: '@dim' });
      // 10 huy chương nhỏ: người Nhật thứ 10 đoạt Nobel Hoá
      const k10 = prog(t, T.l10 + 0.2, T.ten + 0.2);                // 1 → 10 đếm dần suốt câu 10
      for (let i = 0; i < 10; i++) nobel(g, 1040 + i * 74, 760, i === 9 ? 30 : 22, clamp(k10 * 10 - i * 0.9));
      telop(g, '日本人10人目', 1010, 880, prog(t, T.ten, T.ten + 0.6), { size: 52 });
      telop(g, '2年連続', 1400, 880, prog(t, T.nen2, T.nen2 + 0.5), { size: 52 });
      g.restore();
    }
    // ── điện thoại + túi đi chợ (câu 11, trái) ──
    const oP = out(t, T.l12 - 0.5, 0.6);
    if (t > T.l11 - 0.4 && oP < 1) {
      g.save(); g.translate(-1000 * oP, 0);
      phone(g, 300, 520, prog(t, T.l11 - 0.3, T.l11 + 0.3), prog(t, T.natta - 0.1, T.natta + 1.6));
      telop(g, '知らせの電話', 160, 300, prog(t, T.denwa, T.denwa + 0.6), { size: 48, mincho: true });
      bag(g, 640, 640, prog(t, T.kaimono - 0.2, T.kaimono + 0.4));
      telop(g, '買い物の途中', 500, 860, prog(t, T.kaimono, T.kaimono + 0.6), { size: 48, mincho: true });
      g.restore();
    }

    // ── ⑥ mục lục: ba ô kính ①②③ + mascot point (NÓI) ──
    if (t > T.l12 - 0.4) {
      panes(g, { texts: QUESTIONS, k: [0, 1, 2].map(i => prog(t, T.mittsu + i * 0.2, T.mittsu + i * 0.2 + 0.6)),
        kText: T.q.map((a, i) => prog(t, a, a + [2.2, 2.0, 1.8][i])) });
      // mascot point (NÓI) ~8 s quanh câu 12–13, cắt ở eo (đáy khung), trọn trong khung ngang; rồi chìm xuống
      const { cx, h } = this.POINT, oF = out(t, T.q[1] - 0.4, 0.5);
      if (oF < 1) { g.save(); g.translate(0, 700 * oF); figure(g, 'point', cx, H, h, prog(t, T.mittsu - 0.5, T.mittsu + 0.1), { t }); g.restore(); }
      // sau đó: cặp 「鏡の双子」 (L-alanine) xoay chậm bên trái gương — vật của câu hỏi ①
      const kM = prog(t, T.q[1] - 0.2, T.q[1] + 0.4);
      if (kM > 0) { molecule(g, 'L-alanine', { x: 470, y: 520, scale: 90, rot: 0.4 + 0.25 * (t - T.q[1]), k: kM }); floorShadow(g, 470, 160); }
    }

    // ── gương (vật xuyên suốt): trồi từ khe bàn, rạn ở 重なりません, liền lại ở câu 2, tối dần cuối câu 15 ──
    const crack = prog(t, T.kasanara, T.kasanara + 0.5) * (1 - prog(t, T.l2 - 0.3, T.l2 + 0.2));
    mirror(g, { k: k0, crack, cy: 430, dim: prog(t, T.end - 1.2, T.end) });

    // ── mở từ bóng tối; tối về đen kín đúng hết câu cuối + tail (intro 漆と金 từ đen) ──
    const up = 0.1 + 0.9 * outCubic(prog(t, this.FROM, this.FROM + 1.0));
    const down = 1 - prog(t, T.end - 0.25, T.end + this.TAIL - 0.15);
    dark(g, Math.min(up, down));
  }
}
