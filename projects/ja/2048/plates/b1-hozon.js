// b1 · 盤の上の保存則 (p2, câu 0–8). DNA b1 (盤上): mở từ ĐEN, nắng hiện dần; thẻ「第一幕 合計は消えない」.
//  Bàn chính bên trái chạy luật thật (slide / spawn); 駒台 dưới-phải mang 算盤 ghi TỔNG (đứng yên khi gộp/trượt, +2 khi quân mới rơi).
//  Cột phải ba chặng chữ: ① 全部たす · 2+2=4 · 左右 (câu 0–2) → ② 新しいタイル · 9/10, 1/10 · = 2.2 判子 (câu 3–5)
//  → ③ 保存則 · 質量保存の法則（中学理科）· cân đĩa 2+2 ⇄ 4 · 生まれない・消えない · まとめられていくだけ (câu 6–8).
import { W, H, C, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, ground, dark, ban, board, boardMove, koma, komadai, soroban,
  telop, answer, luck, stamp, brush, arrow, heading, actCard, actCue, slide, spawn, TAU } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const total = cells => cells.flat().reduce((a, b) => a + b, 0);
// Cân đĩa (hàm cục bộ — báo đạo diễn): cột gỗ, đòn cân nghiêng `tilt` rad, hai đĩa treo; L / R = danh sách [v, k] quân trên đĩa.
function balance(g, cx, top, k, tilt, L, R) {
  if (k <= 0) return;
  const dy = (1 - outCubic(clamp(k))) * 160, Lb = 230, hang = 120, base = top + 250;
  g.save(); g.translate(0, dy); g.globalAlpha = clamp(k * 3);
  g.fillStyle = '#5E3E17'; g.fillRect(cx - 70, base, 140, 16); g.fillStyle = C.kayaEdge; g.fillRect(cx - 7, top, 14, base - top);
  const ends = [-1, 1].map(s => [cx + s * Lb * Math.cos(tilt), top + s * Lb * Math.sin(tilt)]);
  brush(g, [ends[0], ends[1]], 1, { w: 8, color: C.goldDk, alpha: 1 });
  g.fillStyle = C.gold; g.beginPath(); g.arc(cx, top, 9, 0, TAU); g.fill();
  ends.forEach(([ex, ey], i) => {
    const py = ey + hang;
    g.strokeStyle = 'rgba(217,180,90,0.75)'; g.lineWidth = 1.6;
    g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex - 78, py); g.moveTo(ex, ey); g.lineTo(ex + 78, py); g.stroke();
    g.fillStyle = C.goldDk; g.beginPath(); g.ellipse(ex, py, 92, 14, 0, 0, Math.PI); g.fill();
    g.fillStyle = C.gold; g.fillRect(ex - 92, py - 3, 184, 5);
    const list = i ? R : L;
    list.forEach(([v, kk], j) => koma(g, v, ex + (j - (list.length - 1) / 2) * 82, py - 40, 76, kk, { seed: 50 + i * 3 + j }));
  });
  g.restore();
}

export default class Hozon {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.START = L(0).start;
    this.FROM = this.START - 2.6;                    // cảnh đầu p2 (sau intro) — mở hồi
    this.T = {
      kansatsu: w(0, '観察'), ban0: w(0, '盤'), zenbu: w(0, '全部'), tashite: w(0, 'たして'), e0: L(0).end,
      ni: w(1, '2'), gattai: w(1, '合体'), gokei1: w(1, '合計'), kawara1: w(1, '変わりません'), pp: w(1, '2+2'), yon: w(1, '4', 2),
      sayu: w(2, '左右'), suberase: w(2, 'すべらせて'), gokei2: w(2, '合計'), kawara2: w(2, '変わりません'),
      l3: L(3).start, fuyasu: w(3, '増やす'), hitotsu: w(3, '1つ'), atara: w(3, '新しく'), dete: w(3, '出て'), tile3: w(3, 'タイル'),
      kyu: w(4, '9回'), ni4: w(4, '2'), juu2: w(4, '10回', 2), ikkai: w(4, '1回'), yon4: w(4, '4'),
      l5: L(5).start, itte: w(5, '1手'), gokei5: w(5, '合計'), mean: w(5, '2.2'), fuete: w(5, '増えて'),
      l6: L(6).start, hozon: w(6, '保存則'), chuugaku: w(6, '中学'), shitsu: w(6, '質量'), hosoku: w(6, '法則'),
      l7: L(7).start, katte: w(7, '勝手'), umare: w(7, '生まれる'), kie: w(7, '消える'),
      ookina: w(8, '大きな'), matome: w(8, 'まとめられて'), end: L(8).end,
    };
    const T = this.T;
    // bàn chính: mọi trạng thái bằng slide / spawn thật
    const P0 = [[2, 2, 0, 0], [0, 4, 0, 0], [0, 0, 0, 0], [8, 0, 0, 2]];
    const P1 = slide(P0, 'L').cells, P2 = slide(P1, 'R').cells, P3 = slide(P2, 'L').cells;
    const A = spawn(P3, 2), U1 = slide(A.cells, 'U').cells, B = spawn(U1, 2), F = slide(B.cells, 'U');
    must(`${A.v} + ${B.v}`, 4); must(`${F.merges.length} === 1 && ${F.merges[0].v}`, 16);
    must(`${slide(P0, 'L').merges.length} === 1 && ${slide(P0, 'L').merges[0].v}`, 4);   // câu 1: đúng một lần 2 + 2 → 4
    this.P0 = P0; this.A = A; this.B = B;
    this.SW = [[T.ni, P0, 'L'], [T.sayu, P1, 'R'], [T.suberase + 0.38, P2, 'L'], [T.itte, A.cells, 'U'], [T.matome, B.cells, 'U']].map(x => [...x, slide(x[1], x[2])]);
    for (let i = 1; i < this.SW.length; i++) must(`${this.SW[i][0]} - ${this.SW[i - 1][0]} >= 0.9`, true);
    this.SPN = { 2: [T.dete, A], 3: [T.itte + 1.1, B] };          // quân mới rơi sau lượt vuốt thứ i
    // 算盤: tổng bàn (must từng mốc, ở trạng thái đã xong)
    this.SUM = [[T.tashite, 0, total(P0)], [T.tile3, total(P0), total(A.cells)], [T.gokei5, total(A.cells), total(B.cells)]];
    must(`${total(P0)} === ${total(P1)} && ${total(P1)} === ${total(P2)} && ${total(P2)} === ${total(P3)}`, true);
    must(`${total(A.cells)} - ${total(P3)}`, 2); must(`${total(B.cells)} - ${total(U1)}`, 2); must(`${total(F.cells)}`, total(B.cells));
    must('2 * 0.9 + 4 * 0.1', 2.2);
    this.BX = [150, 260, 560];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START),
      c(T.ban0, 'koma'), c(T.tashite + 0.05, 'soroban'),
      c(T.ni, 'koma'), c(T.gokei1, 'pen'), c(T.yon, 'pen'),
      c(T.sayu, 'koma'), c(T.suberase + 0.38, 'koma'), c(T.kawara2, 'correct'),
      c(T.l3, 'pen'), c(T.dete, 'coin'), c(T.tile3 + 0.1, 'soroban'),
      c(T.ni4, 'koma'), c(T.yon4, 'koma'),
      c(T.itte, 'koma'), c(T.itte + 1.1, 'coin'), c(T.fuete + 0.2, 'hanko'),
      c(T.hozon, 'suzu'), c(T.shitsu, 'koma'),
      c(T.l7 + 0.75, 'pen'), c(T.kie, 'pen'), c(T.matome, 'koma'),
    ];
  }
  render(g, t) {
    const T = this.T, [bx, by, bS] = this.BX;
    ground(g, t, { sun: smooth(prog(t, this.FROM, this.START + 3)) });
    heading(g, 1, '盤の上の保存則', prog(t, this.START + 1.0, this.START + 2.2), { y: 168 });

    // ── bàn chính ──
    const kBan = prog(t, this.FROM + 0.3, this.FROM + 1.1);
    let sw = -1; this.SW.forEach(([a], i) => { if (t >= a) sw = i; });
    if (sw < 0) {
      const G = ban(g, bx, by, bS, kBan);
      let i = 0; this.P0.forEach((row, r) => row.forEach((v, c) => { if (!v) return;
        koma(g, v, ...G.ctr(r, c), G.cs, prog(t, T.ban0 + i * 0.15, T.ban0 + i * 0.15 + 0.45), { seed: r * 4 + c + 17 }); i++; }));
    } else {
      const [a, from, dir, res] = this.SW[sw], sp = this.SPN[sw];
      if (t < a + 0.9) boardMove(g, from, dir, bx, by, bS, prog(t, a, a + 0.9));
      else if (sp && t >= sp[0] - 0.6) {                            // ô 浅葱 sáng (chỗ 運 sắp rơi) → quân mới rơi, giữ viền tới lượt sau
        const [ts, S] = sp, kd = prog(t, ts, ts + 0.5);
        if (kd < 1) { const G = board(g, res.cells, bx, by, bS, 1, { hl: S.at }); koma(g, S.v, ...G.ctr(...S.at), G.cs, kd, { luck: true, seed: 99 }); }
        else board(g, S.cells, bx, by, bS, 1, { luck: [S.at] });
      } else board(g, res.cells, bx, by, bS, 1);
    }

    // ── 駒台 + 算盤: tổng bàn ──
    const kD = prog(t, T.zenbu - 0.2, T.zenbu + 0.5);
    const D = komadai(g, 880, 760, 640, 215, kD);
    let cur = this.SUM[0];
    for (const s of this.SUM) if (t >= s[0]) cur = s;
    const [ts, v0, v1] = cur, kv = prog(t, ts, ts + 0.8);
    if (kD > 0) {
      g.save(); g.translate(0, (1 - outCubic(kD)) * (H - 760 + 60));
      soroban(g, D.x + 26, D.y + 4, v1, 1, { cols: 4, rod: 56, from: v0, kv });
      telop(g, '合計', D.x + 340, D.y + 78, prog(t, T.zenbu + 0.2, T.zenbu + 0.7), { size: 40, on: 'wood' });
      if (t >= this.SUM[0][0] + 0.8) telop(g, String(kv < 1 ? v0 : v1), D.x + 340, D.y + 182, kv < 1 ? 1 : prog(t, ts + 0.8, ts + 1.1), { size: 96, on: 'wood' });
      g.restore();
    }

    // ── cột phải ① câu 0–2 ──
    const X = 880, o1 = out(t, T.l3 - 0.6);
    if (o1 < 1) {
      g.save(); g.translate(1100 * o1, 0);
      telop(g, '小さな観察', X, 190, prog(t, T.kansatsu, T.kansatsu + 0.6), { size: 40, color: '@dim' });
      telop(g, '盤の上の数を、全部たす', X, 280, prog(t, T.ban0, T.tashite + 0.4), { size: 52 });
      telop(g, '2と2が合体しても', X, 380, prog(t, T.ni, T.gattai + 0.6), { size: 44 });
      telop(g, '合計は変わらない', X + 420, 380, prog(t, T.gokei1, T.kawara1 + 0.6), { size: 44 });
      telop(g, '2 + 2 = 4', X + 60, 490, prog(t, T.pp, T.yon + 0.2), { size: 64 });
      const r = telop(g, '左右にすべらせても', X, 610, prog(t, T.sayu, T.suberase + 0.5), { size: 44 });
      telop(g, '変わらない', r.x + r.w + 30, 610, prog(t, T.kawara2, T.kawara2 + 0.6), { size: 44 });
      g.restore();
    }
    // ── ② câu 3–5 ──
    const o2 = out(t, T.l6 - 0.6);
    if (t > T.l3 - 0.3 && o2 < 1) {
      g.save(); g.translate(1100 * o2, 0);
      telop(g, '合計を増やすのは', X, 200, prog(t, T.l3, T.hitotsu - 0.1), { size: 48 });
      const r = telop(g, 'ただ1つ、', X, 300, prog(t, T.hitotsu, T.hitotsu + 0.5), { size: 52 });
      luck(g, '新しいタイル', r.x + r.w + 10, 300, prog(t, T.atara, T.atara + 0.8), { size: 52 });
      luck(g, '10回に9回', X, 415, prog(t, T.kyu - 0.8, T.kyu + 0.2), { size: 48 });
      arrow(g, X + 270, 400, X + 360, 400, prog(t, T.kyu + 0.2, T.kyu + 0.6), { w: 4, head: 18, color: C.gofunDim });
      koma(g, 2, X + 430, 398, 92, prog(t, T.ni4, T.ni4 + 0.45), { luck: true, seed: 61 });
      luck(g, '10回に1回', X, 525, prog(t, T.juu2, T.ikkai + 0.4), { size: 48 });
      arrow(g, X + 270, 510, X + 360, 510, prog(t, T.ikkai + 0.2, T.ikkai + 0.5), { w: 4, head: 18, color: C.gofunDim });
      koma(g, 4, X + 430, 508, 92, prog(t, T.yon4, T.yon4 + 0.45), { luck: true, seed: 62 });
      telop(g, '平均すると、1手ごとに', X, 625, prog(t, T.l5, T.itte + 0.5), { size: 36, color: '@dim' });
      const f = telop(g, '2×0.9 + 4×0.1', X, 712, prog(t, T.itte + 0.3, T.gokei5 + 0.3), { size: 52 });
      answer(g, '= 2.2', f.x + f.w + 24, 712, prog(t, T.mean, T.mean + 0.5), { size: 60 });
      stamp(g, '平均', f.x + f.w + 250, 690, prog(t, T.fuete + 0.2, T.fuete + 0.7), { size: 36 });
      g.restore();
    }
    // ── ③ câu 6–8 ──
    if (t > T.l6 - 0.3) {
      telop(g, '保存則', X, 235, prog(t, T.hozon, T.hozon + 0.6), { size: 96 });
      const o3 = out(t, T.l7 - 0.4);
      if (o3 < 1) { g.save(); g.translate(1100 * o3, 0);
        telop(g, '質量保存の法則（中学理科）', X, 330, prog(t, T.chuugaku, T.hosoku + 0.4), { size: 44, color: '@dim' }); g.restore(); }
      const r = telop(g, '勝手に', X, 330, prog(t, T.l7 + 0.75, T.katte + 0.3), { size: 40, color: '@dim' });
      const r2 = telop(g, '生まれない', r.x + r.w + 16, 330, prog(t, T.umare, T.umare + 0.5), { size: 52 });
      telop(g, '・消えない', r2.x + r2.w + 6, 330, prog(t, T.kie, T.kie + 0.5), { size: 52 });
      const kL = prog(t, T.shitsu, T.shitsu + 0.45), kR = prog(t, T.hosoku, T.hosoku + 0.45);
      const tilt = 0.16 * (kL - smooth(prog(t, T.hosoku + 0.1, T.hosoku + 0.9)));
      balance(g, 1330, 410, prog(t, T.chuugaku, T.chuugaku + 0.7), tilt, [[2, kL], [2, prog(t, T.shitsu + 0.15, T.shitsu + 0.6)]], [[4, kR]]);
      telop(g, 'より大きなタイルへ、まとめられていくだけ', X, 722, prog(t, T.ookina - 0.3, T.end - 0.3), { size: 44 });
    }

    actCard(g, t, this.FROM, this.START, 1);
    dark(g, outCubic(prog(t, this.FROM, this.FROM + 1.6)));
  }
}
