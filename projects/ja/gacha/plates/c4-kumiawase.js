// c4 · 不確かさの組み合わせ (p2, câu 52–55) — DNA ACT 2 b: hai cực rồi một viên ghép.
//  câu 52 「必ず当たる」 100%: dãy viên vàng (★5 luôn ra) → xám đi ở 「飽きます」       câu 53 「絶対に当たらない」 0%: máy ガシャポン đứng yên, không ai vặn
//  câu 54 giữa: 低い確率 (viên trời) + 待たせる演出 (viên hồng đang lắc)                 câu 55 hai viên chui vào MỘT viên lớn, nắp đóng lại → 設計
import { W, H, C, MIN, JP, TAU, clamp, prog, lookup, must, outCubic, smooth, ground, telop, write, capsule, machine, heading, rr } from '../kit.js';
import { out, shade, fillGaps } from './g2-util.js';

export default class Kumiawase {
  static ERA = 'studio';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'c4');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l52: S(52), kanarazu: w(52, '必ず'), akimasu: w(52, '飽きます'),
      l53: S(53), zettai: w(53, '絶対'), mawashimasen: w(53, '回しません'),
      l54: S(54), hikui: w(54, '低い'), kakuritsu: w(54, '確率'), matasero: w(54, '待たせる'), enshutsu: w(54, '演出'),
      l55: S(55), kumi: w(55, '組み合わせ'), sekkei: w(55, '設計'), end: E(55),
    };
    this.START = S(52);
    this.FROM = Math.max(this.START - 1.2, E(51) + 0.5);
    this.P100 = must('1 * 100', 100); this.P0 = must('0 * 100', 0);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return fillGaps([c(this.FROM + 0.9, 'pop'), c(T.akimasu, 'tick'), c(T.zettai, 'pen'), c(T.hikui, 'pen'), c(T.matasero, 'pop'), c(T.kumi + 0.3, 'pop'), c(T.sekkei, 'pen')], this.FROM, 3.9, true);
  }
  cap(g, t, a, b, parts, size = 54, x = 960) {
    if (t < a - 0.1 || t > b + 0.1) return;
    g.save(); g.translate(0, 220 * outCubic(clamp((t - b + 0.45) / 0.4))); telop(g, parts, x, 955, prog(t, a - 0.1, a + 0.5), { size }); g.restore();
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t);
    heading(g, 2, '不確かさの組み合わせ', prog(t, F + 0.3, F + 1.3));
    const exit = out(t, T.hikui - 0.5, 0.8);                              // hai cực trượt ra khi bước vào giữa
    // ── cực trái: 100% ──
    if (exit < 1) {
      g.save(); g.translate(-900 * exit, 0);
      write(g, '必ず当たる', 480, 300, prog(t, F + 0.3, F + 0.8), { font: `700 52px ${MIN}`, align: 'center' });
      write(g, `${this.P100}%`, 480, 470, prog(t, F + 0.5, F + 1.1), { font: `700 150px ${MIN}`, color: '@gold', align: 'center' });
      for (let i = 0; i < 4; i++) {
        const a = F + 0.7 + i * 0.28, bored = t >= T.akimasu + i * 0.12, k = prog(t, a, a + 0.5), dx = (1 - outCubic(k)) * -700;
        capsule(g, 250 + i * 150 + dx, 680 - 0 * i, 62, 1, { gold: !bored, tone: 'blank', glow: bored ? 0 : 1, rot: -0.45 - dx / 62, ground: true });
      }
      write(g, 'すぐ飽きる', 480, 840, prog(t, T.akimasu, T.akimasu + 0.5), { font: `700 44px ${MIN}`, color: '@dim', align: 'center' });
      g.restore();
    }
    // ── cực phải: 0% ──
    if (exit < 1 && t >= T.zettai - 0.4) {
      const e = out(t, T.zettai - 0.4, 0.7);
      g.save(); g.translate((1 - e) * 900 + 900 * exit, 0);
      write(g, '絶対に当たらない', 1440, 280, prog(t, T.zettai, T.zettai + 0.5), { font: `700 52px ${MIN}`, align: 'center' });
      write(g, `${this.P0}%`, 1440, 450, prog(t, T.zettai + 0.2, T.zettai + 0.7), { font: `700 150px ${MIN}`, color: '@dim', align: 'center' });
      machine(g, 1440, 880, 380, 1, { turn: 0, label: '1回' });
      g.restore();
    }
    // ── giữa: 2 viên → 1 viên ──
    if (t >= T.hikui - 0.4) {
      const e = out(t, T.hikui - 0.4, 0.8), merge = smooth(prog(t, T.kumi - 0.2, T.kumi + 0.9)), open = clamp(prog(t, T.kumi - 0.3, T.kumi + 0.3) - prog(t, T.kumi + 0.8, T.kumi + 1.4));
      const cy = 500, lx = 700 + merge * 260, rx = 1220 - merge * 260;
      if (merge < 1) {
        g.save(); g.translate(0, (1 - e) * 500);
        capsule(g, lx, cy - 90 * merge, 105 * (1 - 0.55 * merge), 1, { tone: 'sky', ground: merge < 0.2, rot: -0.45 });
        capsule(g, rx, cy - 90 * merge, 105 * (1 - 0.55 * merge), 1, { tone: 'pink', shake: 1 - merge, t, ground: merge < 0.2 });
        g.restore();
        const kl = prog(t, T.hikui, T.hikui + 0.5), kr = prog(t, T.matasero, T.matasero + 0.5), fade = 1 - merge;
        g.save(); g.translate(0, (1 - e) * 500); g.globalAlpha = fade;
        write(g, '低い確率', lx, 740, kl, { font: `700 64px ${MIN}`, color: '@sky', align: 'center' });
        write(g, '待たせる演出', rx, 740, kr, { font: `700 64px ${MIN}`, color: '@ink', align: 'center' });
        write(g, '＋', 960, cy + 20, prog(t, T.matasero - 0.3, T.matasero), { font: `700 110px ${MIN}`, align: 'center' });
        g.restore();
      }
      if (merge > 0.3) {
        const km = clamp((merge - 0.3) / 0.7);
        capsule(g, 960, cy - 20, 175 * outCubic(km), 1, { tone: 'lav', open, rot: -0.2, ground: true, content: (gg, r) => {
          capsule(gg, -r * 0.35, -r * 0.1, r * 0.3, 1, { tone: 'sky', ground: false }); capsule(gg, r * 0.35, -r * 0.1, r * 0.3, 1, { tone: 'pink', ground: false }); } });
        telop(g, '設計', 960, 790, prog(t, T.sekkei - 0.1, T.sekkei + 0.5), { size: 100 });
      }
    }
    this.cap(g, t, T.l52 - 0.1, T.l53 - 0.1, [['必ず当たるなら、すぐ飽きる']]);
    this.cap(g, t, T.l53 - 0.1, T.l54 - 0.1, [['絶対に当たらないなら、誰も回さない']]);
    this.cap(g, t, T.l54 - 0.1, T.l55 - 0.1, [['低い確率 ＋ 結果を待たせる演出']]);
    this.cap(g, t, T.l55 - 0.1, T.end + 4, [['その2つの組み合わせが、設計']]);
  }
}
