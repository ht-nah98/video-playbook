// d2 · 単純なルールの実験 (p2, câu 42–47). DNA d2 (盤上): bốn quân mũi tên ↓ ← → ↑ xếp thứ tự ưu tiên trên 駒台; bàn chạy
// THẬT theo luật (kit.play order 'DLRU', quân mới hash) — quân mũi tên đang dùng nhấc lên; 「20万回」, 512: でたらめ vs ルール
// (thanh 1 : 200), 「約200倍」; mascot `ponder` (nói) bên trái + 「これで勝てる？」 (墨 xám) → gạch ở 「5回」, 1024 「たったの5回」
// ngay dưới; câu 47: 「決まったルールだけでは 足りない」 + 「相手がいる」 → đồng xu 浅葱 lần đầu.
import { W, H, C, MIN, clamp, prog, lookup, must, outCubic, ground, board, boardMove, koma, komadai, coin, telop, wrong, luck,
  heading, strikeInk, brush, figure, play, ARROW } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const ORDER = 'DLRU', CAPS = ['まず', '次に', 'しかたなく', '動けない時'];
const KD = { x: 96, y: 210, w: 820, h: 230 };                          // 駒台 thứ tự ưu tiên
const BX = 270, BY = 520, BS = 430;                                   // bàn chạy theo luật
const S0 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 2]];
const BAR = 560;                                                      // thanh "ルール" (×200); でたらめ = BAR / 200
const FIG = [300, 720];                                               // mascot ponder: cx, h (ảnh 864×1448 → rộng ≈ 430)

export default class Rule {
  static ERA = 'banjo';
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l42: S(42), tanjun: w(42, '単純'), comp: w(42, 'コンピュータ'), mamora: w(42, '守らせて'),
      dirs: [w(43, '下'), w(43, '左'), w(43, '右'), w(43, '上')], shikata: w(43, 'しかたない'), ugoke: w(43, '動けない'),
      l44: S(44), kangae: w(44, '考えません'),
      l45: S(45), man20: w(45, '20万回'), kado: w(45, '角'), rule: w(45, 'ルール'), v512: w(45, '512'), tadori: w(45, 'たどり着く'),
      detara: w(45, 'でたらめ'), bai: w(45, '200倍'),
      l46: S(46), v1024: w(46, '1024'), dekita: w(46, 'できた'), tatta: w(46, 'たった'), go: w(46, '5回'), e46: E(46),
      l47: S(47), kimatta: w(47, '決まった'), tarimasen: w(47, '足りません'), aite: w(47, '相手'), iru: w(47, 'いる'), end: E(47),
    };
    const T = this.T;
    this.START = S(42);
    this.FROM = Math.max(this.START - 1.2, E(41) + 0.5);
    // bàn chạy theo luật: kit.play thật, từ 「考えません」 tới lúc cột trái rời (P s mỗi lượt)
    this.P = 0.42; this.R0 = T.kangae; this.OUTL = T.l46 - 0.6;
    const n = Math.ceil((this.OUTL - this.R0) / this.P) + 1;
    this.RUN = play(S0, n, { seed: 7, order: ORDER });
    must(`${this.RUN.length}`, n);                                     // không kẹt giữa chừng
    must(`${Math.max(...this.RUN.at(-1).cells.flat())} < 1024`, true);
    must('20 * 10000', 200000); must(`${BAR} / 200`, 2.8);
    must(`${FIG[0]} + 0.5 * 864 * ${FIG[1]} / 1448 < 960`, true);      // mascot nằm trọn nửa trái
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [
      c(T.tanjun, 'pen'),
      ...T.dirs.filter((_, i) => i !== 1).map(t => c(t, 'koma')),
      c(T.l44, 'pen'),
      c(T.man20, 'soroban'), c(T.kado, 'pen'), c(T.v512, 'koma'), c(T.detara, 'dice'), c(T.bai, 'pen'),
      c(T.l46, 'pen'), c(T.v1024 + 0.4, 'koma'), c(T.go, 'error'),
      c(T.tarimasen, 'pen'), c(T.aite, 'coin'),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);
    heading(g, 3, '単純なルールの実験', prog(t, this.FROM + 0.3, this.FROM + 1.3));

    // ── cột trái: 駒台 thứ tự + bàn chạy (câu 42–45) → rời trái trước khi mascot lên ──
    const oL = out(t, this.OUTL, 0.6);
    if (oL < 1) {
      g.save(); g.translate(-(KD.x + KD.w + 60) * oL, 0);
      const idx = Math.max(0, Math.min(this.RUN.length - 1, Math.floor((t - this.R0) / this.P)));
      const st = this.RUN[idx], running = t >= this.R0;
      const D = komadai(g, KD.x, KD.y, KD.w, KD.h, prog(t, this.FROM + 0.3, this.FROM + 0.9));
      [...ORDER].forEach((d, i) => {
        const x = D.x + 115 + i * 197, y = D.y + 92, a = T.dirs[i];
        koma(g, 2, x, y, 132, prog(t, a, a + 0.45), { label: ARROW[d], lift: running && st.dir === d ? 1 : 0, seed: i + 5 });
        telop(g, CAPS[i], x, D.y + 205, prog(t, a + 0.15, a + 0.6), { size: 28, align: 'center', on: 'wood' });
      });
      const kb = prog(t, this.FROM + 0.3, this.FROM + 1.3);
      if (!running) board(g, S0, BX, BY, BS, kb, { seed: 3 });
      else {
        const ts = this.R0 + idx * this.P, sp = st.spawn;
        boardMove(g, st.prev, st.dir, BX, BY, BS, prog(t, ts, ts + 0.3), { seed: 3, spawn: { at: sp.at, v: sp.v, k: prog(t, ts + 0.24, ts + 0.4) } });
      }
      g.restore();
    }

    // ── chữ phải, nhóm 1 (câu 42–44) ──
    const X = 1000, o1 = out(t, T.l45 - 0.5);
    if (o1 < 1) {
      g.save(); g.translate(900 * o1, 0);
      telop(g, 'ごく単純なルール', X, 330, prog(t, T.tanjun - 0.3, T.tanjun + 0.6), { size: 64 });
      telop(g, 'コンピュータに守らせる', X, 430, prog(t, T.comp, T.mamora + 0.5), { size: 44, color: '@dim' });
      telop(g, 'それ以上は', X, 620, prog(t, T.l44, T.l44 + 0.5), { size: 44 });
      telop(g, '何も考えない', X, 720, prog(t, T.l44 + 0.5, T.kangae + 0.5), { size: 64 });
      g.restore();
    }

    // ── nhóm 2 (câu 45): 20万回 · 512: でたらめ vs ルール ×200 ──
    const o2 = out(t, T.l46 - 0.4);
    if (t > T.l45 - 0.5 && o2 < 1) {
      g.save(); g.translate(900 * o2, 0);
      const kc = prog(t, T.man20, T.man20 + 1.2), n = `${Math.round(20 * kc)}万回`;            // lời đọc: 20万回 — đếm theo 万
      if (kc > 0) telop(g, [[n, `700 64px ${MIN}`], ['のプレイ', `700 44px ${MIN}`]], X, 330, 1, { size: 64 });
      if (kc >= 1) must(`'${n}'`, '20万回');
      telop(g, '角に集めるルール', X, 420, prog(t, T.kado, T.rule + 0.4), { size: 44, color: '@dim' });
      koma(g, 512, X + 80, 560, 150, prog(t, T.v512, T.v512 + 0.45), { seed: 11 });
      telop(g, 'にたどり着いた回数', X + 180, 585, prog(t, T.tadori, T.tadori + 0.6), { size: 32, color: '@dim' });
      const bx = X + 180;
      telop(g, 'でたらめ', bx, 690, prog(t, T.detara, T.detara + 0.4), { size: 32 });
      const kr = prog(t, T.detara + 0.4, T.detara + 0.8);
      if (kr > 0) { g.fillStyle = C.gofunDim; g.fillRect(bx, 708, Math.max(3, BAR / 200 * kr), 22); }
      telop(g, '1', bx + 16, 730, prog(t, T.detara + 0.6, T.detara + 0.9), { size: 32, color: '@dim' });   // thanh でたらめ gần như vô hình → nhãn
      telop(g, 'ルール', bx, 790, prog(t, T.detara + 0.6, T.detara + 1.0), { size: 32 });
      const kR = outCubic(prog(t, T.bai - 0.5, T.bai + 0.5));
      if (kR > 0) { g.fillStyle = C.goldLt; g.fillRect(bx, 808, BAR * kR, 22); }
      telop(g, '約200', bx + BAR, 798, prog(t, T.bai - 0.1, T.bai + 0.4), { size: 32, color: '@dim', align: 'right' });
      telop(g, '約200倍', bx, 940, prog(t, T.bai, T.bai + 0.5), { size: 72 });
      g.restore();
    }

    // ── nhóm 3 (câu 46): 「これで勝てる？」 → gạch; 1024 たったの5回 ngay dưới ──
    if (t > T.l46 - 0.4) {
      const b = wrong(g, 'これで勝てる？', X, 300, prog(t, T.l46, T.l46 + 0.8), { size: 64 });
      strikeInk(g, b.x - 10, b.y + b.h * 0.5, b.x + b.w + 10, b.y + b.h * 0.45, prog(t, T.go, T.go + 0.4), { w: 7 });
      koma(g, 1024, X + 110, 560, 190, prog(t, T.v1024 + 0.3, T.v1024 + 0.8), { seed: 13 });
      telop(g, '20万回のうち', X + 260, 480, prog(t, T.dekita, T.dekita + 0.6), { size: 36, color: '@dim' });
      telop(g, 'たったの', X + 260, 580, prog(t, T.tatta, T.tatta + 0.5), { size: 44 });
      telop(g, '5回', X + 260, 730, prog(t, T.go, T.go + 0.4), { size: 128 });
    }

    // ── mascot ponder (nói) — nửa trái, câu 46 ──
    const oF = out(t, T.e46 + 0.3, 0.6);
    if (t > T.l46 - 0.5 && oF < 1) {
      g.save(); g.translate(0, (H * 0.9) * oF);
      figure(g, 'ponder', FIG[0], H, FIG[1], prog(t, T.l46 - 0.4, T.l46 + 0.3), { t });
      g.restore();
    }

    // ── câu 47: nửa trái sau khi mascot rời ──
    if (t > T.kimatta) {
      telop(g, '決まったルールだけでは', 140, 330, prog(t, T.kimatta + 0.4, T.tarimasen), { size: 48 });
      telop(g, '足りない', 140, 460, prog(t, T.tarimasen, T.tarimasen + 0.5), { size: 88 });
      coin(g, 420, 660, 96, prog(t, T.aite, T.aite + 0.4), { spin: Math.max(0, 1 - prog(t, T.aite, T.aite + 1.0)) * 7 });
      luck(g, '相手がいる', 420, 880, prog(t, T.aite, T.iru + 0.4), { size: 64, align: 'center' });
    }
  }
}
