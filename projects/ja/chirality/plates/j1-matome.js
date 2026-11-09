// j1 · まとめ (p2 câu 128–135, mở hồi 9). DNA j1「合わせ鏡」: thẻ hồi「第九幕 まとめ」 → ba ô kính câu hỏi (a0) lật ra câu trả lời:
//  128 ① 「体が片手の手袋」 + găng tay hổ phách bên trái · 129 ② cặp lẫn kẹt SÁT gương (ペア) + chấm hổ phách nhân đôi (コピー)
//  130 「ぴったり半々 = 不安定」 + bút chì dựng đứng chao · 131 ③ + đồng xu 「コイン投げ？」 → ba ô lùi vào sau gương
//  132 1953 tờ giấy ba điều kiện (trái) → mũi tên xuyên gương 「50年」 → 2003 ống nghiệm gần như một tay (phải) ✓ 本物
//  133 ảnh 硤合 (≤ 160 px) · 134 lời trích 明朝 bên phải + đèn đội đầu soi lối đi bên trái · 135 「まだまだ…」 bên trái
//  → cuối cảnh GƯƠNG HẠ XUỐNG: thế giới bên phải chìm theo gương vào khe bàn — chỉ còn một phía (homochirality).
import { W, C, MX, JP, BENCH, QUESTIONS, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, telop, title, actCard, actCues,
  actTimes, arrow, tick, hand, tube, coin, photo, panes, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
// câu trả lời trên mặt sau ba ô (rút từ まとめ, ≤ 16 chữ)
const BACKS = ['体そのものが、片手の手袋', '少ない方はペア、多い方はコピー', '変わったのは、化学者の目'];

// bút chì dựng đứng trên đầu nhọn (cân bằng bất ổn — như điểm 0 ở g2): chao theo t
function pencil(g, x, y, k, t) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), a = 0.05 * Math.sin(t * 2.3) + 0.03 * Math.sin(t * 5.1);
  g.save(); g.translate(x, y + (1 - e) * 240); g.rotate(a);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-11, -246, 26, 230);
  g.fillStyle = '#C9B48A'; g.beginPath(); g.moveTo(-14, -40); g.lineTo(0, 0); g.lineTo(14, -40); g.closePath(); g.fill();
  g.fillStyle = '#2A3246'; g.beginPath(); g.moveTo(-4, -11); g.lineTo(0, 0); g.lineTo(4, -11); g.closePath(); g.fill();
  g.fillStyle = '#5D6678'; g.fillRect(-14, -240, 28, 200);
  g.fillStyle = 'rgba(201,210,224,0.45)'; g.fillRect(-10, -238, 4, 196);
  g.fillStyle = '#9AA4B6'; g.fillRect(-14, -262, 28, 22);
  g.restore();
}
// tờ giấy đánh máy 1953 (ba dòng điều kiện ①②③, nét giả + ✓)
function paper(g, x, y, k, kt) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), w = 330, h = 400;
  g.save(); g.translate(x, y + (1 - e) * 260); g.rotate(-0.04);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(10, 14, w, h);
  g.fillStyle = '#D9D2C2'; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(42,50,70,0.55)';
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) g.fillRect(36, 54 + i * 118 + j * 22, (j === 2 ? 150 : 250) - 20 * ((i + j) % 2), 5);
  for (let i = 0; i < 3; i++) tick(g, w - 40, 64 + i * 118, 16, clamp(kt * 3 - i), { color: '#2A3246', w: 5 });
  g.restore();
}

// đèn đội đầu: chùm sáng soi lối chấm trên mặt bàn (trái gương) — j2 chép NGUYÊN hàm này (khung đầu j2 = khung cuối j1)
function headlight(g, px, kl) {
  if (kl <= 0) return;
  const py = 820, R = 360;
  g.save();
  const gr = g.createRadialGradient(px, py, 4, px, py, R);
  gr.addColorStop(0, `rgba(237,230,214,${0.45 * kl})`); gr.addColorStop(1, 'rgba(237,230,214,0)');
  g.fillStyle = gr; g.beginPath(); g.moveTo(px, py); g.arc(px, py, R, -0.3, 0.3); g.closePath(); g.fill();
  g.fillStyle = C.text;
  for (let i = 0; i < 20; i++) { const x = 120 + i * 38; if (x > px + R - 30 || x > MX - 60) continue; const a = clamp(1 - Math.abs(x - px - 150) / 220) * kl;
    if (a > 0.02) { g.globalAlpha = a; g.beginPath(); g.arc(x, py + 6 * Math.sin(i * 1.3), 7, 0, 7); g.fill(); } }
  g.globalAlpha = 1; g.fillStyle = C.silver; g.beginPath(); g.arc(px, py, 11 * kl, 0, 7); g.fill();
  g.restore();
}

export default class Matome {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = { soai: './assets/history/soai.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'j1');
    const S = i => L(i).start;
    this.T = {
      q1: w(128, '1つ目'), karada: w(128, '体'), tebukuro: w(128, '手袋'), futago: w(128, '双子'), miwake: w(128, '見分けます'),
      q2: w(129, '2つ目'), sukunai: w(129, '少ない'), pea: w(129, 'ペア'), ooi: w(129, '多い'), kopi: w(129, 'コピー'), tsuzuke: w(129, '続ける'),
      l130: S(130), hanhan: w(130, '半々'), fuantei: w(130, '不安定'), tsuriai: w(130, 'つり合い'),
      q3: w(131, '3つ目'), kagakusha: w(131, '化学者'), seimei: w(131, '生命'), coin: w(131, 'コイン'), nage: w(131, '投げ'),
      l132: S(132), y1953: w(132, '1953年'), kami: w(132, '紙'), joken: w(132, '条件'), y50: w(132, '50年'), shiken: w(132, '試験'), honmono: w(132, '本物'),
      l133: S(133), soai: w(133, '硤合'), kaiken: w(133, '会見'),
      l134: S(134), kurai: w(134, '暗い'), atama: w(134, '頭'), light: w(134, 'ヘッドライト'), zutto: w(134, 'ずっと'), kibun: w(134, '気分'), e134: L(134).end,
      l135: S(135), madamada: w(135, 'まだまだ'), omoshiroi: w(135, '面白い'), hazu: w(135, 'はず'), end: L(135).end,
    };
    this.START = S(128);
    this.FROM = Math.max(this.START - 2.6, L(127).end + 0.5);
    const T = this.T;
    this.TITLE = actTimes(this.FROM, this.START).o1 - 0.2;
    this.LOWER = [T.omoshiroi + 0.4, T.end + 0.9];                       // gương hạ: sau 「面白いこと」 → hết câu cuối
    must('2003 - 1953', 50);
    for (const s of BACKS) must(`${[...s].length} <= 16`, true);
  }
  sfx() {
    const T = this.T;
    return [
      ...actCues(this.FROM, this.START), cue(T.q1, 'flip', -4), cue(T.tebukuro, 'glass', -4),
      cue(T.q2, 'flip', -4), cue(T.pea, 'tick'),
      cue(T.hanhan, 'telop', -4),
      cue(T.q3, 'flip', -4), cue(T.kagakusha, 'pop', -6), cue(T.seimei, 'telop', -4), cue(T.coin, 'telop', -4),
      cue(T.y1953, 'page'), cue(T.joken, 'frank'), cue(T.shiken, 'tube'), cue(T.honmono, 'match'),
      cue(T.soai, 'photo'), cue(T.kurai, 'telop', -4), cue(T.zutto, 'telop', -4),
      cue(T.madamada, 'telop', -4), cue(this.LOWER[0] + 0.1, 'crack', -4),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    const [lw0, lw1] = this.LOWER, lower = smooth(prog(t, lw0, lw1)), drop = Math.round((BENCH - 120) * lower);

    // ── tiêu đề cảnh (sau thẻ hồi) ──
    g.save(); g.beginPath(); g.rect(0, 0, MX, BENCH); g.clip(); title(g, 'まとめ', t, this.TITLE); g.restore();
    g.save(); g.beginPath(); g.rect(MX + 20, 0, W, BENCH - 2); g.clip(); g.translate(0, drop); title(g, 'まとめ', t, this.TITLE); g.restore();   // bóng chữ ngược chìm theo gương

    // ── ba ô câu hỏi (a0) → lật ra câu trả lời → lùi vào sau gương trước câu 132 ──
    const kp = 1 - out(t, T.l132 - 0.9, 0.6);
    if (kp > 0) {
      const k0 = prog(t, this.FROM + 0.2, this.FROM + 0.8) * kp;
      panes(g, { texts: QUESTIONS, k: [k0, k0, k0], kText: [1, 1, 1], backs: BACKS,
        flip: [T.q1, T.q2, T.q3].map(a => smooth(prog(t, a, a + 0.6))),
        kBack: [[T.q1, T.futago], [T.q2, T.tsuzuke], [T.q3, T.kagakusha + 0.6]].map(([a, b]) => prog(t, a + 0.3, b)) });
    }

    // ── 128: găng tay hổ phách (trái) · 「鏡の双子を見分ける」 ──
    const o1 = out(t, T.q2 - 0.4);
    if (t > T.karada - 0.6 && o1 < 1) {
      g.save(); g.translate(-900 * o1, 0);
      floorShadow(g, 480, 160 * prog(t, T.tebukuro - 0.3, T.tebukuro + 0.3));
      hand(g, 480, 500, 92, prog(t, T.tebukuro - 0.3, T.tebukuro + 0.4), { side: 'L', glove: true });
      telop(g, '片手の分子の手袋', 480, 330 - 70, prog(t, T.karada, T.tebukuro + 0.6), { size: 44, align: 'center', color: '@L', mincho: true });
      telop(g, '鏡の双子を見分ける', 480, 780, prog(t, T.miwake - 0.2, T.miwake + 0.6), { size: 48, align: 'center', mincho: true });
      g.restore();
    }

    // ── 129: 多い方 → コピー (chấm hổ phách nhân đôi) · 少ない方 → ペア (cặp lẫn kẹt sát gương) ──
    const o2 = out(t, T.l130 - 0.4);
    if (t > T.q2 - 0.4 && o2 < 1) {
      g.save(); g.translate(-900 * o2, 0);
      telop(g, '多い方は、自分をコピー', 140, 300, prog(t, T.ooi, T.kopi + 0.4), { size: 44 });
      const kc = prog(t, T.kopi, T.tsuzuke + 0.8);
      for (const [r, cnt] of [[0, 1], [1, 2], [2, 4], [3, 8], [4, 16]]) {
        const kr = clamp(kc * 5 - r);
        for (let i = 0; i < cnt; i++) { if (kr <= 0) continue;
          const x = 160 + (i % 16) * 42, y = 370 + r * 52, s = outCubic(kr);
          g.fillStyle = C.silver; g.beginPath(); g.arc(x, y, 14 * s, 0, 7); g.fill(); }
      }
      telop(g, '少ない方は、ペアに', 140, 720, prog(t, T.sukunai, T.pea + 0.4), { size: 44, color: '@dim' });
      const kq = outCubic(prog(t, T.pea, T.pea + 0.6));
      if (kq > 0) {
        const y = 800, xa = MX - 50 * kq - 20, xb = MX + 50 * kq + 20;
        g.strokeStyle = C.bone; g.lineWidth = 5; g.beginPath(); g.moveTo(xa, y); g.lineTo(xb, y); g.stroke();
        g.fillStyle = C.L; g.beginPath(); g.arc(xa, y, 18, 0, 7); g.fill();
        g.fillStyle = C.R; g.beginPath(); g.arc(xb, y, 18, 0, 7); g.fill();
      }
      g.restore();
    }

    // ── 130: ぴったり半々は、不安定なつり合い (bút chì dựng đứng) ──
    const o3 = out(t, T.seimei - 1.0);
    if (t > T.l130 - 0.4 && o3 < 1) {
      g.save(); g.translate(-900 * o3, 0);
      telop(g, 'ぴったり半々は', 140, 360, prog(t, T.l130, T.hanhan + 0.5), { size: 52, mincho: true });
      telop(g, '不安定なつり合い', 140, 450, prog(t, T.fuantei - 0.1, T.tsuriai + 0.5), { size: 52, mincho: true });
      pencil(g, 640, 820, prog(t, T.fuantei - 0.3, T.fuantei + 0.3), t);
      floorShadow(g, 640, 60);
      g.restore();
    }

    // ── 131: 生命の選択は、コイン投げ？ ──
    const o4 = out(t, T.l132 - 0.6);
    if (t > T.seimei - 0.5 && o4 < 1) {
      g.save(); g.translate(-900 * o4, 0);
      telop(g, '生命の選択は', 140, 330, prog(t, T.seimei, T.seimei + 0.6), { size: 48, mincho: true });
      const kc = prog(t, T.coin - 0.2, T.coin + 0.3);
      floorShadow(g, 480, 90 * kc);
      coin(g, 480, 560, 90, kc, { spin: 9 * (1 - smooth(prog(t, T.coin, T.coin + 2.2))) });
      telop(g, 'コイン投げ？', 480, 780, prog(t, T.nage - 0.1, T.nage + 0.5), { size: 60, align: 'center', mincho: true });
      g.restore();
    }

    // ── 132: 1953 紙の上の3つの条件 → 50年 → 2003 試験管の中で本物 ──
    const o5 = out(t, T.l133 - 0.5, 0.6);
    if (t > T.l132 - 0.6 && o5 < 1) {
      g.save(); g.translate(0, 900 * o5);
      telop(g, '1953年', 230, 300, prog(t, T.y1953, T.y1953 + 0.6), { size: 64 });
      telop(g, '紙の上', 470, 300, prog(t, T.kami, T.kami + 0.4), { size: 40, color: '@dim', mincho: true });
      paper(g, 300, 360, prog(t, T.kami - 0.3, T.kami + 0.3), prog(t, T.joken - 0.2, T.joken + 0.9));
      arrow(g, [[680, 560], [MX, 470], [1180, 560]], prog(t, T.y50 - 0.2, T.y50 + 0.6), { color: C.silver, w: 5, head: 20 });
      telop(g, '50年', 1010, 420, prog(t, T.y50, T.y50 + 0.4), { size: 72 });
      telop(g, [['1995年 → ', `700 40px ${JP}`, '@dim'], ['2003年', `700 64px ${JP}`]], 1150, 300, prog(t, T.shiken - 0.4, T.shiken + 0.4), { size: 64 });
      telop(g, '試験管の中', 1300, 380, prog(t, T.shiken, T.shiken + 0.5), { size: 40, color: '@dim', mincho: true });
      floorShadow(g, 1380, 90);
      tube(g, 1380, 800, 360, prog(t, T.shiken - 0.3, T.shiken + 0.3), { fill: 0.62, mix: 0, n: 30, seed: 5 });
      const kt = prog(t, T.honmono, T.honmono + 0.5);
      tick(g, 1520, 560, 26, kt, { w: 7 });
      telop(g, '本物に', 1490, 680, kt, { size: 48, mincho: true });
      g.restore();
    }

    // ── 133–135: 硤合さん (ảnh) · lời trích (phải, chìm theo gương) · まだまだ… (trái) ──
    if (t > T.l133 - 0.6) {
      photo(g, 'soai', 160, 250, 160, prog(t, T.soai - 0.3, T.soai + 0.5));
      telop(g, '記者会見で', 420, 300, prog(t, T.kaiken - 0.2, T.kaiken + 0.5), { size: 44, color: '@dim', mincho: true });
      // đèn đội đầu: chùm sáng quét lối đi tối trên mặt bàn (trái), từ 「ヘッドライト」
      headlight(g, 140 + 380 * smooth(prog(t, T.light, T.kibun + 1.2)), prog(t, T.light - 0.2, T.light + 0.6));
      telop(g, 'まだまだ分からない。', 140, 600, prog(t, T.madamada - 0.1, T.madamada + 1.0), { size: 48, mincho: true });
      telop(g, '面白いことがあるはず', 140, 690, prog(t, T.omoshiroi - 0.1, T.hazu + 0.4), { size: 48, mincho: true, color: '@L' });

      // lời trích bên phải gương — khi gương hạ, cả thế giới bên phải chìm theo vào khe bàn
      g.save(); g.beginPath(); g.rect(MX + 20, 0, W, BENCH - 2); g.clip(); g.translate(0, drop);
      const QX = 1000;
      telop(g, '「暗い地面を、', QX, 300, prog(t, T.kurai - 0.1, T.kurai + 0.8), { size: 44, mincho: true });
      telop(g, '頭にヘッドライトだけを着けて、', QX + 22, 390, prog(t, T.atama - 0.1, T.light + 1.2), { size: 44, mincho: true });
      telop(g, 'ずっとたどって行っている', QX + 22, 480, prog(t, T.zutto - 0.1, T.zutto + 1.2), { size: 44, mincho: true });
      telop(g, 'ような気分」', QX + 22, 570, prog(t, T.kibun - 0.4, T.kibun + 0.4), { size: 44, mincho: true });
      g.restore();
    }

    // ── gương (vật xuyên suốt) — cuối cảnh hạ xuống: chỉ còn một phía ──
    mirror(g, { lower });
    actCard(g, t, this.FROM, this.START, 9);
  }
}
