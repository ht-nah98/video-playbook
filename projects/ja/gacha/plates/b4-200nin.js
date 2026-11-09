// b4 · 200人の200通りの物語 (p2, câu 19–27) — DNA ACT 1: 200 viên = 200 người (mô hình PHẲNG p = 0.6% mỗi lần — 「表の数字どおり」; hình học, đuôi dài).
//  câu 19–21  khối 200 viên đổ vào; một viên được nhấc ra = 「私」 (1回きり); 「200人」 cùng quay
//  câu 22–23  ≤ 3 lần: 3–4 viên vàng sớm (+ bóng thoại 「！」 = họ kể lại mãi)
//  câu 24     quá lần 80 vẫn chưa thấy ánh vàng: ~16 viên xám + vòng nét đứt
//  câu 25–26  cùng một trò chơi, cùng xác suất (khung quanh cả khối) → 「物語」
//  câu 27     200 viên bay từ khối ra cột theo lần trúng ĐẦU TIÊN = phân bố (tản ra: vàng sớm, xám ở đuôi)
import { W, H, C, MIN, JP, TAU, clamp, hash, prog, lookup, must, outCubic, smooth, ground, telop, write, capsule, capsuleGrid, heading, rr, CROWD, P } from '../kit.js';
import { out, shade, ring, order, fillGaps, pop } from './g2-util.js';

const COLS = 20, N = 200, BOX = { x: 450, y: 250, w: 1020, h: 540 };
const BASE = 840, DX0 = 250, PIX = 12.2;             // phân bố: n = 1…90, rồi một khối 「91回以上」 bên phải
const TX0 = 1440, TD = 30, TCOLS = 12;               // khối đuôi (đã quá 90 lần)
export default class Nin {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b4');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l19: S(19), kakuritsu: w(19, '確率'), matomete: w(19, 'まとめて'), hanashi19: w(19, '話'),
      l20: S(20), watashi: w(20, '私'), jinsei: w(20, '人生'), ikkai: w(20, '1回'),
      l21: S(21), n200: w(21, '200人'), douji: w(21, '同時'), mawashite: w(21, '回して'),
      l22: S(22), san: w(22, '3回目'), sannin: w(22, '3人'), yonin: w(22, '4人'),
      l23: S(23), hitotachi: w(23, '人たち'), hanashi23: w(23, '話'), nando: w(23, '何'),
      l24: S(24), n80: w(24, '80回'), mada: w(24, 'まだ'), hikari: w(24, '光'),
      l25: S(25), dochira: w(25, 'どちら'), onaji1: w(25, '同じ', 1), onaji2: w(25, '同じ', 2),
      l26: S(26), kioku: w(26, '記憶'), monogatari: w(26, '物語'),
      l27: S(27), saifu: w(27, '財布'), hirogari: w(27, '広がり'), bunpu: w(27, '分布'), end: E(27),
    };
    this.START = S(19);
    this.FROM = Math.max(this.START - 1.2, E(18) + 0.5);
    // mô hình PHẲNG p = 0.006 (ACT 1: 「表の数字どおり」): người j (phân vị (j+½)/200) trúng đầu tiên ở n = ⌈ln(1−u)/ln(0.994)⌉
    const ns = Array.from({ length: N }, (_, j) => Math.ceil(Math.log(1 - (j + 0.5) / N) / Math.log(1 - P)));
    this.IDS = order(hash, N, 5);
    this.N3 = ns.filter(n => n <= 3).length;
    must(`${this.N3 >= 3 && this.N3 <= 4}`, true);                       // 200·(1−0.994³) ≈ 3.6 → 3人か4人
    this.NW = must(`Math.round(200 * ${(1 - P) ** 80})`, 124);           // 200·0.994⁸⁰ ≈ 123.6 còn chờ sau 80 lần
    must(`${ns.filter(n => n > 80).length}`, this.NW);
    this.NT = ns.filter(n => n > 90).length;                              // 200·0.994⁹⁰ ≈ 116 người quá 90 lần vẫn chưa trúng
    this.TARGET = new Array(N); const slot = {}; let kt = 0;              // đích: cột n tầng slot, hoặc khối đuôi (n > 90)
    this.IDS.forEach((id, j) => { const n = ns[j]; if (n > 90) { this.TARGET[id] = [-1, kt++]; } else { slot[n] = (slot[n] ?? -1) + 1; this.TARGET[id] = [n, slot[n]]; } });
    this.GOLD = new Set(this.IDS.slice(0, this.N3)); this.WAIT = new Set(this.IDS.slice(N - this.NW));
    this.DUM = capsuleGrid(document.createElement('canvas').getContext('2d'), BOX, N, 0, 0, { cols: COLS, seed: 5 });
    this.ME = this.IDS[Math.floor(N / 2) + 3];
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([c(T.l19 + 0.4, 'chip'), c(T.l19 + 1.8, 'chip'), c(T.matomete, 'pen'), c(T.watashi, 'pop'), c(T.ikkai, 'pen'),
      c(T.n200, 'pen'), c(T.mawashite, 'gacha'), c(T.san, 'tick'), c(T.sannin, 'shimmer'), c(T.hitotachi, 'pop'),
      c(T.n80, 'pen'), c(T.mada, 'tick'), c(T.dochira, 'pen'), c(T.onaji2, 'tick'), c(T.monogatari, 'pop'),
      c(T.hirogari - 0.2, 'chip'), c(T.hirogari + 1.4, 'chip'), c(T.bunpu, 'pen')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM, D = this.DUM, r = D.r;
    ground(g, t);
    heading(g, 1, '200人の200通りの物語', prog(t, F + 0.3, F + 1.3));
    const tFly = T.hirogari - 0.2, flyK = i => smooth(prog(t, tFly + hash(i * 3.7) * 0.9, tFly + 1.3 + hash(i * 3.7) * 0.9));
    // khối acrylic (rời xuống khi các viên bay đi)
    const exit = out(t, tFly + 0.8, 0.8);
    if (exit < 1 && t >= T.l19 - 0.2) {
      g.save(); g.translate(0, 700 * exit);
      capsuleGrid(g, BOX, N, 0, 0, { cols: COLS, seed: 5 }); g.restore();
    }
    // 200 viên
    const goldT = T.sannin - 0.1, waitT = T.mada - 0.1;
    for (let i = 0; i < N; i++) {
      const [gx, gy] = D.pos(i), [n, sl] = this.TARGET[i], tail = n < 0;
      const tin = T.l19 + 0.2 + (i / N) * 2.3, kin = prog(t, tin, tin + 0.35); if (kin <= 0) continue;
      const fk = flyK(i), tx = tail ? TX0 + ((sl % TCOLS) + 0.5) * TD : DX0 + (n - 0.5) * PIX, ty = tail ? BASE - TD / 2 - Math.floor(sl / TCOLS) * TD : BASE - 7 - sl * 13.5, rt = tail ? TD * 0.46 : 6;
      let x = gx + (tx - gx) * fk, y = gy + (ty - gy) * fk - 120 * Math.sin(Math.PI * fk) * (0.4 + hash(i) * 0.6), rr_ = r + (rt - r) * fk;
      if (i === this.ME && t >= T.watashi - 0.2 && t < T.n200 - 0.2) continue;    // viên 「私」 được nhấc ra (vẽ ở cột phải)
      const gold = this.GOLD.has(i) && t >= goldT, wait = this.WAIT.has(i) && t >= waitT;
      capsule(g, x, y, rr_, fk > 0 ? 1 : kin, { tone: wait ? 'blank' : CROWD[Math.floor(hash(i * 3.1 + 5) * CROWD.length) % CROWD.length], gold, glow: gold ? 1 : 0, ground: false, rot: -0.45 + Math.round(hash(i * 5.3 + 5) * 6) / 4 });
    }
    // ── cột phải: 私 (1回きり) ──
    if (t >= T.watashi - 0.2 && t < T.n200 + 0.3) {
      const e = out(t, T.watashi - 0.2, 0.6), ex = out(t, T.n200 - 0.2, 0.5);
      g.save(); pop(g, 1660, 480, 1 - ex);
      capsule(g, 1660, 380 - (1 - e) * 120, 76, e, { tone: 'sky', ground: true });
      write(g, '私', 1660, 560, prog(t, T.watashi, T.watashi + 0.3), { font: `700 64px ${MIN}`, align: 'center' });
      write(g, '1回きり', 1660, 640, prog(t, T.ikkai - 0.1, T.ikkai + 0.4), { font: `700 52px ${MIN}`, align: 'center' });
      g.restore();
    }
    // ── cột trái: số người ──
    if (t >= T.n200 - 0.2 && t < T.l27 - 0.4) {
      const e = out(t, T.n200 - 0.2, 0.6);
      g.save(); pop(g, 270, 520, e);
      write(g, '200人', 270, 480, prog(t, T.n200, T.n200 + 0.5), { font: `700 120px ${MIN}`, align: 'center' });
      write(g, '同時に回す', 270, 552, prog(t, T.douji, T.douji + 0.4), { font: `700 44px ${MIN}`, color: '@dim', align: 'center' });
      g.restore();
    }
    if (t >= T.san - 0.3 && t < T.l27 - 0.4) {      // 3回目まで → 3〜4人 (vàng)
      const e = out(t, T.san - 0.3, 0.6), x3 = out(t, T.dochira - 0.3, 0.5);
      g.save(); pop(g, 1660, 450, Math.min(e, 1 - x3));
      write(g, '3回目までに', 1660, 380, prog(t, T.san, T.san + 0.4), { font: `700 44px ${MIN}`, align: 'center' });
      write(g, '3人か4人', 1660, 520, prog(t, T.sannin - 0.1, T.sannin + 0.4), { font: `700 72px ${MIN}`, color: '@gold', align: 'center' });
      g.restore();
      for (const i of this.GOLD) { const [x, y] = D.pos(i), kb = prog(t, T.hitotachi - 0.1 + (i % 3) * 0.12, T.hitotachi + 0.4 + (i % 3) * 0.12); if (kb <= 0) continue;
        const bx = x + 34, by = y - 52 - 10 * (1 - outCubic(kb)); g.save(); g.globalAlpha = clamp(kb * 2);
        shade(g, () => { g.fillStyle = C.white; g.beginPath(); g.arc(bx, by, 30 * outCubic(kb), 0, TAU); g.fill(); }, 12, 4);
        g.restore(); write(g, '！', bx, by + 17, kb, { font: `700 46px ${MIN}`, align: 'center' }); }
    }
    if (t >= T.n80 - 0.3 && t < T.l27 - 0.4) {      // quá 80 vẫn chưa thấy ánh vàng
      const e = out(t, T.n80 - 0.3, 0.6);
      g.save(); pop(g, 270, 760, e);
      write(g, '80回を過ぎても', 270, 700, prog(t, T.n80, T.n80 + 0.5), { font: `700 38px ${MIN}`, align: 'center' });
      write(g, [['≈', `700 56px ${JP}`], [`${this.NW}人`, `700 92px ${MIN}`]], 280, 820, prog(t, T.mada, T.mada + 0.4), { color: '@dim', align: 'center' });
      g.restore();
    }
    // câu 25: cùng trò chơi, cùng xác suất — khung quanh cả khối
    const kf = prog(t, T.dochira, T.onaji2 + 0.6);
    if (kf > 0 && t < T.l27 - 0.4) {
      g.save(); g.setLineDash([14, 12]); g.strokeStyle = C.ink; g.lineWidth = 4; g.lineCap = 'round'; g.globalAlpha = 0.8 * (1 - out(t, T.l27 - 0.8, 0.4));
      const rx = BOX.x - 18, ry = BOX.y - 18, rw = BOX.w + 36, rh = BOX.h + 36, per = 2 * (rw + rh), len = per * outCubic(kf);
      g.setLineDash([len, per]); g.stroke(rr(rx, ry, rw, rh, 36)); g.restore();
      telop(g, '同じゲーム', 1660, 400, prog(t, T.onaji1 - 0.1, T.onaji1 + 0.5), { size: 46 });
      telop(g, '同じ確率', 1660, 500, prog(t, T.onaji2 - 0.1, T.onaji2 + 0.5), { size: 46 });
    }
    // câu 26: 物語
    const km = prog(t, T.monogatari - 0.2, T.monogatari + 0.5);
    if (km > 0 && t < T.l27 - 0.4) { const e = outCubic(km); g.save(); g.translate(0, (1 - e) * 80);
      telop(g, [['記憶に残るのは '], ['物語', undefined, '@ink']], 1660, 700, km, { size: 44 }); g.restore(); }
    // ── câu 27: phân bố ──
    if (t >= tFly) {
      const ka = prog(t, tFly, tFly + 0.8);
      g.save(); g.strokeStyle = C.line; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(DX0 - 20, BASE + 4); g.lineTo(DX0 - 20 + (TX0 + TCOLS * TD - DX0 + 20) * outCubic(ka), BASE + 4); g.stroke(); g.restore();
      write(g, '回数 →', DX0 + 90 * PIX, BASE + 56, ka, { font: `600 30px ${JP}`, color: '@dim', align: 'right' });
      write(g, '早く当たる人', DX0 + 2 * PIX, BASE - 110, prog(t, T.hirogari + 1.0, T.hirogari + 1.5), { font: `700 34px ${JP}`, color: '@gold', align: 'left' });
      write(g, 'まだ待つ人', TX0 + TCOLS * TD / 2, BASE - 10 * TD - 40, prog(t, T.hirogari + 1.2, T.hirogari + 1.7), { font: `700 36px ${JP}`, color: '@dim', align: 'center' });
      write(g, '分布', 1660, 330, prog(t, T.bunpu - 0.1, T.bunpu + 0.4), { font: `700 110px ${MIN}`, align: 'center' });
    }
    this.cap(g, t, T.l19 - 0.1, T.l20 - 0.1, [['確率は、たくさんの人を まとめた話']]);
    this.cap(g, t, T.l20 - 0.1, T.l21 - 0.1, [['私たちの人生は 1回きり']]);
    this.cap(g, t, T.l21 - 0.1, T.l22 - 0.1, [['200人に 同時に回してもらう']]);
    this.cap(g, t, T.l22 - 0.1, T.l23 - 0.1, [['3回目までに当たるのは 3人か4人']]);
    this.cap(g, t, T.l23 - 0.1, T.l24 - 0.1, [['その話を、何度もするだろう']]);
    this.cap(g, t, T.l24 - 0.1, T.l25 - 0.1, [['80回を過ぎても まだ光を見ていない']]);
    this.cap(g, t, T.l25 - 0.1, T.l26 - 0.1, [['同じゲームを 同じ確率で']]);
    this.cap(g, t, T.l26 - 0.1, T.l27 - 0.1, [['記憶に残るのは 物語']]);
    this.cap(g, t, T.l27 - 0.1, T.end + 4, [['財布を決めるのは 広がり ＝ 分布']]);
  }
}
