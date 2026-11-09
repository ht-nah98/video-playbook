// b6 · Play it a thousand times (p2 câu 35–38). Bảng lật tiêu đề + hai bảng điểm đèn: trái ALWAYS STAY, phải ALWAYS
// SWITCH. 1.000 ván TẤT ĐỊNH (hash của engine/lib.js — không Math.random): ván i có xe ở cửa ⌊hash(3i+1)·3⌋, người chơi
// chọn ⌊hash(3i+2)·3⌋, người dẫn biết và mở một cửa dê → giữ thắng ⇔ chọn trúng xe, đổi thắng ⇔ chọn trượt.
// Mỗi bảng: bộ đếm "WINS n" lật, lưới 1.000 ô (40 × 25) tô ngọc ô thắng theo đúng thứ tự ván, thanh ngọc tỉ lệ thắng;
// số in ra là số đếm THẬT của mô phỏng này (tính trong init, kiểm bằng must).
//   35 "what convinced Erdős" → bảng "WHAT CONVINCED ERDŐS" · 36 "a thousand games" → "1,000 GAMES", lưới ô chờ hiện;
//      "left … stays" → "ALWAYS STAY", "right … switches" → "ALWAYS SWITCH"; máy chơi 0 → 1.000 ván (tick)
//   37 "about a third" → "≈ 1/3" lật vào bảng trái; "about two thirds" → "≈ 2/3" bảng phải sáng (correct)
//   38 "not because of a formula" → nhân vật ok; "watch it happen" → bảng "JUST WATCH IT HAPPEN".
import { W, H, C, clamp, hash, smooth, outBack, outCubic, prog, ground, bulbs, flap, flapW, ctr, block, label, card,
  figure, lookup, must } from '../kit.js';

const FL = 1010, NT = 20, TC = 40, TG = 5, TW = flapW(NT, TC, TG), TX = 885 - TW / 2, TY = 170;    // bảng tiêu đề
const PW = 600, PH = 716, PY = 292, PXS = [250, 920];                                              // hai bảng điểm
const GN = 1000, COLS = 40, ROWS = 25, PITCH = 12, CS = 10;
const fmt = n => n.toLocaleString('en-US');

export default class Sim {
  static ERA = 'stage';
  static IMAGES = {};
  static POSES = ['ok'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b6');
    this.T = {
      convinced: w(35, 'convinced'), games: w(36, 'games'), thousand: w(36, 'thousand'), left: w(36, 'left'), stays: w(36, 'stays'),
      right: w(36, 'right'), switches: w(36, 'switches'), third: w(37, 'third'), two: w(37, 'two'), thirds: w(37, 'thirds'),
      not: w(38, 'not'), formula: w(38, 'formula'), watch: w(38, 'watch'), e38: L(38).end,
    };
    const T = this.T;
    this.START = L(35).start; this.FROM = this.START - 1.2;
    // ── mô phỏng: cùng 1.000 ván cho cả hai người chơi ──
    const stay = [], sw = [];
    for (let i = 0; i < GN; i++) {
      const car = Math.floor(hash(i * 3 + 1) * 3), pick = Math.floor(hash(i * 3 + 2) * 3);
      const opened = [0, 1, 2].find(d => d !== car && d !== pick);           // người dẫn biết, luôn mở cửa dê
      const other = [0, 1, 2].find(d => d !== pick && d !== opened);         // cửa còn lại để đổi
      stay.push(pick === car ? 1 : 0); sw.push(other === car ? 1 : 0);
    }
    const cum = a => a.reduce((o, v) => (o.push(o.at(-1) + v), o), [0]);
    this.WIN = [stay, sw]; this.CUM = [cum(stay), cum(sw)];
    const S = this.CUM[0][GN], X = this.CUM[1][GN];
    must(`${S} + ${X}`, GN);                                                  // mỗi ván đúng một người thắng
    if (Math.abs(S / GN - 1 / 3) > 0.03 || Math.abs(X / GN - 2 / 3) > 0.03) throw new Error(`b6: mô phỏng lệch ${S}/${X}`);
    this.V = { stay: S, sw: X, n: must('1000', GN) };
    this.RUN = [T.switches + 0.55, T.third - 0.3];                            // máy chơi 0 → 1.000 ván (nhanh dần)
    this.TITLE = [
      [T.convinced, ctr('WHAT CONVINCED ERDŐS', NT)],
      [T.games, ctr(`${fmt(GN)} GAMES`, NT)],
      [T.watch, ctr('JUST WATCH IT HAPPEN', NT)],
    ];
  }
  sfx() {
    const T = this.T, out = this.TITLE.map(([t]) => ({ t, kind: 'flap' }));
    out.push({ t: T.left, kind: 'flap' }, { t: T.right, kind: 'flap' }, { t: T.third, kind: 'flap' }, { t: T.two, kind: 'correct' });
    for (let t = this.RUN[0] + 0.05; t < this.RUN[1] - 0.05; t += 0.12) out.push({ t: +t.toFixed(3), kind: 'tick' });
    return out;
  }
  played(t) { return Math.round(GN * Math.pow(prog(t, ...this.RUN), 1.8)); }

  render(g, t) {
    const T = this.T;
    ground(g, 'stage', { floor: FL });
    // bảng tiêu đề
    const drop = (1 - outBack(prog(t, this.FROM + 0.3, this.FROM + 0.8))) * -400;
    g.save(); g.translate(0, drop);
    bulbs(g, TX - 46, TY - 46, TW + 92, Math.round(TC * 1.64) + 92, t);
    let s = ' '.repeat(NT), p = s, k = 1;
    for (const [at, str] of this.TITLE) { if (t < at) break; p = s; s = str; k = prog(t, at, at + 1.2); }
    flap(g, s, TX, TY, TC, k, { from: p, gap: TG });
    g.restore();
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.1), 'ACT ONE', 'PLAY IT A THOUSAND TIMES');
    // hai bảng điểm trồi lên từ sàn
    PXS.forEach((x, i) => {
      const r = (1 - outBack(prog(t, this.FROM + 0.35 + i * 0.15, this.FROM + 0.95 + i * 0.15))) * 760;
      g.save(); g.translate(0, r); this.panel(g, t, i, x); g.restore();
    });
    // nhân vật: "not because of a formula" → hết cảnh
    const kf = prog(t, T.not - 0.1, T.not + 0.3);
    if (kf > 0) figure(g, 'ok', 1700, 1080, 740, kf, { crop: 1 });
  }

  panel(g, t, i, x) {
    const T = this.T, n = this.played(t), wins = this.CUM[i][n], win = this.WIN[i];
    bulbs(g, x, PY, PW, PH, t, { pad: 18, r: 6, step: 30 });
    const hd = i === 0 ? ['ALWAYS STAY', T.left] : ['ALWAYS SWITCH', T.right];
    const hw = flapW(14, 32, 4), hx = x + (PW - hw) / 2;
    flap(g, ctr(hd[0], 14), hx, PY + 44, 32, prog(t, hd[1], hd[1] + 1.0), { gap: 4, h: 52 });
    // bộ đếm thắng
    const ww = flapW(9, 44, 6), wx = x + (PW - ww) / 2, ws = `WINS ${String(wins).padStart(4)}`;
    flap(g, ws, wx, PY + 112, 44, prog(t, hd[1] + 0.3, hd[1] + 1.1), { gap: 6, h: 72 });
    label(g, `games ${fmt(n).padStart(5)} / ${fmt(GN)}`, x + PW / 2, PY + 218, C.dim, 'center', 20, prog(t, T.games, T.games + 0.6));
    // lưới 1.000 ô: ô chờ hiện ở "games", ô được tô theo thứ tự ván
    const gx = x + (PW - (COLS * PITCH - 2)) / 2, gy = PY + 236, kg = prog(t, T.games, T.games + 0.8);
    for (let j = 0; j < GN; j++) {
      const c = j % COLS, r = Math.floor(j / COLS); if (r / ROWS > kg) break;
      g.fillStyle = j < n ? (win[j] ? C.teal : '#4A3B36') : '#241C1C';
      g.fillRect(gx + c * PITCH, gy + r * PITCH, CS, CS);
    }
    // thanh tỉ lệ thắng (ngọc, dài ∝ wins / games)
    const by = gy + ROWS * PITCH + 14, bw = COLS * PITCH - 2;
    g.fillStyle = '#241C1C'; g.fillRect(gx, by, bw, 30);
    if (n > 0 && wins > 0) block(g, gx, by, bw * wins / n, 30);
    // kết quả
    const res = i === 0 ? [`≈ 1/3`, T.third] : [`≈ 2/3`, T.two];
    const rw = flapW(6, 36, 5), rx = x + (PW - rw) / 2, ry = by + 48;
    if (t > res[1] - 0.2 || t > T.games) flap(g, ctr(res[0], 6), rx, ry, 36, prog(t, res[1], res[1] + 0.8), { gap: 5, h: 58 });
  }
}
