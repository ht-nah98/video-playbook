// c3 · なぜ4から始まるのか (p2 câu 28–33). DNA c3: bậc thang 16 quân (đáy 4·4, khoanh); quân mới có thể là 4 (浅葱, 9/10 · 1/10);
// nếu chỉ 2: cả bậc thang hạ nửa → 2,2,4…32768, 壁 131072 → 65536 (must); lớn hơn 131072 cần bậc thang 17 quân → quân thứ 17
// (131072) lơ lửng ngoài bàn, không có ô 17; 保存則: 131072 ÷ 2.2 ≈ 59,578 → 「少なくとも 6万手近く」 (must).
import { C, MIN, JP, clamp, prog, lookup, must, outCubic, ground, ban, koma, komadai, telop, answer, luck, stamp, heading, brush, arrow,
  soroban, comma, snake, LADDER, LADDER2, SNAKE, MEAN } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const BX = 330, BY = 220, BS = 600;
const STAIR = snake(LADDER), STAIR2 = snake(LADDER2);
const FX = 200;                                                       // quân thứ 17 lơ lửng bên trái bàn

export default class Naze4 {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      naze: w(28, 'なぜ'), shita: w(28, '下'), two: w(28, '2'), four: w(28, '4'), e28: E(28),
      l29: S(29), atara: w(29, '新しい'), tile: w(29, 'タイル'), four29: w(29, '4'), dete: w(29, '出て'), aru: w(29, 'ある'),
      l30: S(30), dasa: w(30, '出さなかったら'), kaidan: w(30, '階段'), two30: w(30, '2', 2), kabe: w(30, '壁'), v65536: w(30, '65536'), sagari: w(30, '下がります'),
      l31: S(31), v131072: w(31, '131072'), m17: w(31, '17枚'), hitsuyou: w(31, '必要'),
      l32: S(32), n17: w(32, '17'), arimasen: w(32, 'ありません'),
      l33: S(33), hozon: w(33, '保存則'), keisan: w(33, '計算'), kono: w(33, 'この'), sukunaku: w(33, '少なく'), man6: w(33, '6万手'), end: E(33),
    };
    const T = this.T;
    this.START = S(28);
    this.FROM = Math.max(this.START - 1.2, E(27) + 0.5);
    // dòng đời từng quân (theo vị trí SNAKE p): [giờ đổi, giá trị] — hạ nửa (câu 30) từ đáy lên, rồi trở lại (câu 31)
    this.LIFE = SNAKE.map(([r, c], p) => { const j = 15 - p;
      return [[this.FROM + 0.45 + j * 0.03, STAIR[r][c]], [T.two30 + j * 0.08, STAIR2[r][c]], [T.l31 + j * 0.06, STAIR[r][c]]]; });
    // số trên hình
    must(`[${LADDER2}].reduce((a, b) => a + b, 0)`, 65536);
    must(`${LADDER2[0]} === 2 && ${LADDER2[1]} === 2 && ${LADDER2[15]} === 32768`, true);
    must(`[${LADDER}, 131072].length`, 17);
    must(`Math.round((0.9 * 2 + 0.1 * 4) * 10) / 10`, MEAN);
    this.STEPS = Math.round(131072 / MEAN);
    must(`${this.STEPS}`, 59578); must(`${this.STEPS} < 60000 && ${this.STEPS} > 55000`, true);
    must(`'${comma(this.STEPS)}'`, '59,578');
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.naze, 'pen'), c(T.four, 'pen'),
      c(T.tile, 'coin'), c(T.four29, 'coin'),
      c(T.l30, 'pen'), c(T.two30, 'koma'), c(T.kabe, 'wood'), c(T.sagari, 'tick'),
      c(T.l31, 'koma'), c(T.v131072 + 1.8, 'tick'), c(T.m17, 'pen'), c(T.hitsuyou, 'pen'),
      c(T.n17, 'pen'), c(T.arimasen, 'wood'),
      c(T.keisan, 'pen'), c(T.kono, 'soroban'), c(T.sukunaku, 'tick'), c(T.man6 + 1.1, 'hanko'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    heading(g, 2, 'なぜ4から始まるのか', prog(t, this.FROM + 0.3, this.FROM + 1.2));

    // ── bàn + bậc thang ──
    const G = ban(g, BX, BY, BS, prog(t, this.FROM + 0.25, this.FROM + 0.75), { seed: 4 });
    const lucky = t > T.aru && t < T.two30;
    SNAKE.forEach(([r, c], p) => {
      const life = this.LIFE[p]; let i = -1; life.forEach(([a], j) => { if (t >= a) i = j; });
      if (i < 0) return;
      const [a, v] = life[i], ctr = G.ctr(r, c), seed = p + 21;
      if (i > 0) { const ko = 1 - prog(t, a, a + 0.15); if (ko > 0) koma(g, life[i - 1][1], ...ctr, G.cs, ko, { seed }); }
      koma(g, v, ...ctr, G.cs, prog(t, i > 0 ? a + 0.1 : a, a + 0.45), { seed, luck: lucky && r === 3 && c < 2 });
    });
    // đáy: khoanh hai quân giống nhau (trung tính)
    const x0 = G.ox, y3 = G.oy + 3 * G.cs, cs = G.cs;
    brush(g, [[x0 + 7, y3 + 7], [x0 + 2 * cs - 7, y3 + 7], [x0 + 2 * cs - 7, y3 + cs - 7], [x0 + 7, y3 + cs - 7], [x0 + 7, y3 + 7]], prog(t, T.shita, T.shita + 0.6), { w: 6, color: C.sumi });

    // ── A: なぜ いちばん下は 2が2枚ではなく 4が2枚？ (câu 28) → rời phải ──
    const oA = out(t, T.l29 - 0.3);
    if (t > T.naze - 0.1 && oA < 1) {
      g.save(); g.translate(1000 * oA, 0);
      telop(g, 'なぜ、いちばん下は', 1010, 280, prog(t, T.naze, T.shita + 0.5), { size: 48 });
      telop(g, '2が2枚ではなく', 1010, 390, prog(t, T.two, T.two + 1.0), { size: 44, color: '@dim' });
      telop(g, '4が2枚？', 1010, 520, prog(t, T.four, T.four + 0.6), { size: 72 });
      g.restore();
    }
    // ── B: 新しいタイルは 2 / 4 (浅葱, 9/10 · 1/10) (câu 29) → rời phải ──
    const oB = out(t, T.l30 - 0.3);
    if (t > T.atara - 0.1 && oB < 1) {
      g.save(); g.translate(1000 * oB, 0);
      telop(g, '新しいタイルは', 1010, 280, prog(t, T.atara, T.tile + 0.4), { size: 48 });
      koma(g, 2, 1120, 450, 150, prog(t, T.tile, T.tile + 0.45), { luck: true, seed: 5 });
      koma(g, 4, 1330, 450, 150, prog(t, T.four29, T.four29 + 0.45), { luck: true, seed: 6 });
      luck(g, '9/10', 1120, 590, prog(t, T.tile + 0.3, T.tile + 0.7), { size: 40, align: 'center' });
      luck(g, '1/10', 1330, 590, prog(t, T.four29 + 0.3, T.four29 + 0.7), { size: 40, align: 'center' });
      telop(g, '4で出ることもある', 1010, 720, prog(t, T.dete, T.aru + 0.5), { size: 52 });
      g.restore();
    }
    // ── C: もし2しか出なかったら · 階段は2から · 壁は65536まで (câu 30) → rời phải ──
    const oC = out(t, T.l31 - 0.3);
    if (t > T.l30 - 0.1 && oC < 1) {
      g.save(); g.translate(1000 * oC, 0);
      telop(g, 'もし2しか出なかったら', 1010, 280, prog(t, T.l30, T.dasa + 0.6), { size: 52 });
      telop(g, '階段は2から', 1010, 380, prog(t, T.kaidan, T.two30 + 0.4), { size: 44, color: '@dim' });
      telop(g, '壁は65536まで', 1010, 480, prog(t, T.kabe, T.v65536 + 0.9), { size: 52 });
      g.restore();
    }
    // 駒台: 壁 131072 (bóng) → 65536 (câu 30) · 131072より大きなタイル「？」 (câu 31–32) → rời phải ở câu 33
    const oD = out(t, T.l33 - 0.3, 0.7);
    if (t > T.kabe - 0.1 && oD < 1) {
      g.save(); g.translate(1000 * oD, 0);
      const D = komadai(g, 1050, 580, 640, 290, prog(t, T.kabe, T.kabe + 0.6));
      koma(g, 131072, D.x + 170, D.y + 140, 200, prog(t, T.kabe + 0.2, T.kabe + 0.6), { ghost: true });
      const o65 = out(t, T.l31, 0.4);
      if (o65 < 1) {
        g.save(); g.translate(0, -700 * o65);
        koma(g, 65536, D.x + 470, D.y + 170, 170, prog(t, T.v65536 + 0.4, T.v65536 + 0.8), { ghost: true });
        g.restore();
        arrow(g, D.x + 290, D.y + 100, D.x + 375, D.y + 150, prog(t, T.sagari, T.sagari + 0.5) * (1 - o65), { color: C.gofunDim, w: 5, head: 22 });
      }
      koma(g, 131072, D.x + 470, D.y + 140, 200, prog(t, T.v131072 + 1.8, T.v131072 + 2.2), { ghost: true, label: '？' });
      g.restore();
    }
    // ── E: 131072より大きなタイルには · 17枚の階段が必要 · 17番目のマスはない (câu 31–32) → rời phải ──
    const oE = out(t, T.l33 - 0.3);
    if (t > T.v131072 - 0.1 && oE < 1) {
      g.save(); g.translate(1000 * oE, 0);
      telop(g, '131072より大きなタイルには', 1010, 280, prog(t, T.v131072, T.v131072 + 2.4), { size: 44, color: '@dim' });
      telop(g, '17枚の階段が必要', 1010, 390, prog(t, T.m17, T.hitsuyou + 0.4), { size: 60 });
      telop(g, '盤に17番目のマスはない', 1010, 500, prog(t, T.n17, T.arimasen + 0.4), { size: 48 });
      g.restore();
    }
    // quân thứ 17 lơ lửng ngoài bàn (từ câu 31 tới hết); câu 32: đẩy vào mép bàn rồi bật ra
    if (t > T.m17 - 0.1) {
      const [, cy] = G.ctr(0, 0), b = prog(t, T.arimasen, T.arimasen + 0.6), dx = 46 * Math.sin(Math.PI * b) * (b < 0.5 ? 1 : 0.4);
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = C.gofunDim; g.lineWidth = 2.5; g.globalAlpha = clamp(prog(t, T.m17, T.m17 + 0.5));
      g.strokeRect(FX - cs / 2, cy - cs / 2, cs, cs); g.restore();
      koma(g, 131072, FX + dx, cy - 6, cs, prog(t, T.m17, T.m17 + 0.5), { lift: 0.6, seed: 9 });
      telop(g, '17枚目', FX, cy + cs / 2 + 60, prog(t, T.m17 + 0.3, T.m17 + 0.9), { size: 36, align: 'center' });
    }
    // ── F: 保存則 · 131072 ÷ 2.2 ≈ 59,578 · 少なくとも 6万手近く (câu 33, kết luận) ──
    if (t > T.hozon - 0.1) {
      telop(g, [['保存則：1手で平均 ', `700 40px ${MIN}`], ['+2.2', `700 40px ${MIN}`]], 1010, 280, prog(t, T.hozon, T.hozon + 0.8), { size: 40, color: '@dim' });
      telop(g, [['131072 ', `700 64px ${MIN}`], ['÷', `700 64px ${JP}`], [' 2.2', `700 64px ${MIN}`]], 1010, 390, prog(t, T.keisan, T.keisan + 0.7), { size: 64 });
      soroban(g, 1010, 440, this.STEPS, prog(t, T.keisan + 0.4, T.kono), { cols: 6, rod: 58, from: 0, kv: prog(t, T.kono, T.kono + 1.8) });
      telop(g, [['≈ ', `700 56px ${JP}`], [comma(this.STEPS), `700 56px ${MIN}`]], 1420, 580, prog(t, T.kono + 1.9, T.kono + 2.4), { size: 56 });
      telop(g, '少なくとも', 1010, 790, prog(t, T.sukunaku, T.sukunaku + 0.5), { size: 44 });
      answer(g, '6万手近く', 1010, 920, prog(t, T.man6, T.man6 + 0.8), { size: 96 });
      stamp(g, '答', 1560, 870, prog(t, T.man6 + 1.1, T.man6 + 1.6), { size: 44 });
    }
  }
}
