// e1 · 物理学者への宿題 (p2, câu 56–63) — mở hồi 4「紙の上の答え」. DNA e1: tờ giấy đánh máy 1953 dán trên kính (bên TRÁI
// gương): 1953年・イギリス・チャールズ・フランク (chữ — không có ảnh tự do), câu hỏi, 反応のモデル (nét bút chì) → 条件は3つ;
// bên phải: phong thư của đồng nghiệp → ống nghiệm một tay (生命のかたより) → ba ô kính điều kiện của Frank (kit.panes, FRANK)
// viết theo 1つ目/2つ目/3つ目 → 自己触媒 → ねずみ算 (chấm azure nhân đôi 1 → 64) → ô ① đánh dấu ở 満たしました (suzu).
import { MIN, FRANK, clamp, prog, lookup, outCubic, smooth, ground, mirror, write, telop, title, actCard, actCues, actTimes,
  tube, panes, PANES, floorShadow, cue, C, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
const INK = '#2B2F3A';                                   // mực máy chữ trên giấy ngà (trung tính)
const PX0 = 140, PX1 = 840, PY0 = 236, PY1 = 820;        // tờ giấy

// tờ giấy đánh máy dán trên kính: giấy ngà, hai mẩu băng dính bạc ở góc trên
function paper(g, dy) {
  g.save(); g.translate(0, dy);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(PX0 + 12, PY0 + 16, PX1 - PX0, PY1 - PY0);
  const gr = g.createLinearGradient(PX0, PY0, PX1, PY1); gr.addColorStop(0, '#ECE5D2'); gr.addColorStop(1, '#D9D0B8');
  g.fillStyle = gr; g.fillRect(PX0, PY0, PX1 - PX0, PY1 - PY0);
  g.strokeStyle = 'rgba(90,80,60,0.25)'; g.lineWidth = 1; g.strokeRect(PX0 + 0.5, PY0 + 0.5, PX1 - PX0 - 1, PY1 - PY0 - 1);
  for (const [x, r] of [[PX0 + 40, -0.5], [PX1 - 40, 0.5]]) { g.save(); g.translate(x, PY0 + 4); g.rotate(r);
    g.fillStyle = 'rgba(201,210,224,0.55)'; g.fillRect(-46, -14, 92, 28); g.restore(); }
  g.restore();
}
function rule(g, y, k) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = 'rgba(43,47,58,0.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(190, y); g.lineTo(190 + 600 * outCubic(clamp(k)), y); g.stroke(); g.restore();
}
// nét bút chì trên giấy: trục nhỏ + đường cong vụt lên (片方だけの世界が、ひとりでに)
function doodle(g, k) {
  if (k <= 0) return;
  const x0 = 560, y0 = 660, w = 220, h = 80;
  g.save(); g.strokeStyle = INK; g.lineWidth = 2.5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x0, y0 - h - 6); g.lineTo(x0, y0); g.lineTo(x0 + w + 6, y0); g.stroke();
  g.lineWidth = 3.5; g.beginPath(); const N = Math.round(60 * clamp(k));
  for (let i = 0; i <= N; i++) { const u = i / 60, y = (Math.exp(4 * u) - 1) / (Math.exp(4) - 1); i ? g.lineTo(x0 + u * w, y0 - 4 - y * h) : g.moveTo(x0, y0 - 4); }
  g.stroke(); g.restore();
}
// phong thư (lời nhờ của đồng nghiệp): hình chữ nhật viền bạc + nắp chữ V
function envelope(g, x, y, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), w = 240, h = 150;
  g.save(); g.translate(x + (1 - e) * 500, y);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 10, -h / 2 + 12, w, h);
  g.fillStyle = '#1F2740'; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = C.silver; g.lineWidth = 3; g.lineJoin = 'round'; g.strokeRect(-w / 2, -h / 2, w, h);
  g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(0, 12); g.lineTo(w / 2, -h / 2); g.stroke();
  g.restore();
}

export default class Frank {
  static ERA = 'mirror';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l56: S(56), y1953: w(56, '1953年'), igirisu: w(56, 'イギリス'), riron: w(56, '理論'), butsuri: w(56, '物理学者'), charles: w(56, 'チャールズ'),
      frank: w(56, 'フランク'), doryo: w(56, '同僚'), tanoma: w(56, '頼まれました'),
      seimei: w(57, '生命'), katayori: w(57, 'かたより'), dou: w(57, 'どう'), sugaku: w(57, '数学'), kotae: w(57, '答え'), e57: E(57),
      kami: w(58, '紙'), model: w(58, 'モデル'), katate: w(58, '片手'), hitori: w(58, 'ひとりでに'), umareru: w(58, '生まれる'), joken: w(58, '条件'), mittsu: w(58, '3つ'),
      q: [w(59, '1つ目'), w(60, '2つ目'), w(61, '3つ目')], qe: [E(59), E(60), E(61)], fukohei: w(59, '不公平'), osae: w(60, 'おさえられる'),
      jiko: w(61, '自己'), jibun: w(61, '自分'), mittsu62: w(62, '3つ'), sukoshi: w(62, '少し'),
      l62: S(62), nezumi: w(62, 'ねずみ算'), fuete: w(62, '増えて'), katahou: w(62, '片方'),
      l63: S(63), fusei: w(63, '不斉'), mitashi: w(63, '満たしました'), nokoru: w(63, '残る'), ato2: w(63, '2つ'), end: E(63),
    };
    this.START = S(56);
    this.FROM = Math.max(this.START - 2.6, E(55) + 0.5);          // mở hồi 4
    this.TA = actTimes(this.FROM, this.START).o1 - 0.2;            // tiêu đề lật khi thẻ hồi đã rút
  }
  sfx() {
    const T = this.T;
    return [                                                       // ≤ 22.7 cả cảnh (gồm actCues + whoosh/shimmer trang tự thêm)
      ...actCues(this.FROM, this.START),
      cue(T.y1953, 'type'), cue(T.charles, 'type'), cue(T.doryo, 'page'), cue(T.seimei, 'tube'), cue(T.kotae, 'type', -4),
      cue(T.model, 'pen', -4), cue(T.mittsu - 0.1, 'glass'),
      cue(T.q[0], 'tick', -2), cue(T.fukohei, 'telop', -6), cue(T.q[1], 'tick', -2), cue(T.osae, 'telop', -6), cue(T.q[2], 'tick', -2),
      cue(T.jibun, 'telop', -6), cue(T.jiko, 'telop'),
      cue(T.mittsu62, 'glass', -6), cue(T.sukoshi, 'pop', -6), cue(T.fuete, 'pop', -4), cue(T.mitashi, 'frank'),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    title(g, '物理学者への宿題', t, this.TA);

    // ── trái: tờ giấy đánh máy (vào từ FROM + 0.3), chữ gõ theo lời ──
    const dyP = Math.round((1 - outCubic(prog(t, F + 0.3, F + 0.9))) * 900);
    paper(g, dyP);
    g.save(); g.translate(0, dyP);
    const ty = (s, y, a, b, size = 32, wt = 400) => write(g, s, 190, y, prog(t, a, b), { font: `${wt} ${size}px ${MIN}`, color: INK, shadow: false });
    ty('1953年　イギリス', 310, T.y1953, T.igirisu + 0.5, 36, 700);
    ty('理論物理学者', 362, T.riron, T.butsuri + 0.5);
    ty('チャールズ・フランク', 420, T.charles, T.frank + 0.6, 44, 700);
    rule(g, 446, prog(t, T.doryo, T.tanoma));
    ty('問い　かたよりは、どう生まれた？', 505, T.katayori - 0.2, T.dou + 0.8);
    ty('→ 数学で答えを', 560, T.sugaku, T.kotae + 0.4);
    ty('反応のモデル', 625, T.model - 0.3, T.model + 0.4, 34, 700);
    doodle(g, prog(t, T.hitori - 0.2, T.umareru + 0.4));
    ty('→ 片手だけの世界が、ひとりでに', 700, T.katate, T.umareru + 0.3);
    ty('条件は　3つ', 772, T.joken, T.mittsu + 0.3, 40, 700);
    g.restore();

    // ── phải (câu 56–58): phong thư của đồng nghiệp → ống nghiệm một tay ──
    const oE = out(t, T.seimei - 0.4, 0.5);
    if (t > T.doryo - 0.3 && oE < 1) { g.save(); g.translate(0, -700 * oE); envelope(g, 1400, 480, prog(t, T.doryo - 0.2, T.doryo + 0.4));
      telop(g, '同僚からの頼み', 1400, 640, prog(t, T.doryo + 0.2, T.tanoma + 0.3), { size: 40, align: 'center', mincho: true }); g.restore(); }
    const oT = out(t, T.mittsu - 0.7, 0.5);
    if (t > T.seimei - 0.3 && oT < 1) {
      g.save(); g.translate(0, 700 * oT);
      const kt = prog(t, T.seimei - 0.1, T.seimei + 0.5);
      floorShadow(g, 1400, 90 * kt); tube(g, 1400, 790, 380, kt, { fill: 0.62, mix: 0, n: 26, seed: 5 });
      telop(g, '生命のかたより', 1400, 900, prog(t, T.katayori, T.katayori + 0.5), { size: 40, align: 'center', color: '@R', mincho: true });
      g.restore();
    }

    // ── ba ô kính điều kiện (FRANK): trượt ra ở 3つ, viết theo 1つ目/2つ目/3つ目, ô ① đánh dấu ở 満たしました ──
    if (t > T.mittsu - 0.1) {
      panes(g, { texts: FRANK, k: [0, 1, 2].map(i => prog(t, T.mittsu + i * 0.2, T.mittsu + i * 0.2 + 0.6)),
        kText: [0, 1, 2].map(i => prog(t, T.q[i] + 0.2, Math.max(T.q[i] + 0.8, T.qe[i] - 0.4))), tick: [prog(t, T.mitashi, T.mitashi + 0.5), 0, 0] });
    }
    const fl = prog(t, T.mittsu62, T.mittsu62 + 0.8);                      // 「この3つが」: ba ô loé viền bạc
    if (fl > 0 && fl < 1) { g.save(); g.strokeStyle = `rgba(244,247,251,${Math.sin(Math.PI * fl)})`; g.lineWidth = 4;
      for (let i = 0; i < 3; i++) g.strokeRect(PANES.x - 4, PANES.y0 + i * (PANES.h + PANES.gap) - 4, PANES.w + 8, PANES.h + 8); g.restore(); }
    // 自己触媒 → ねずみ算 (chấm azure nhân đôi 1 → 64) → 片方だけの世界; rời xuống ở câu 63
    const oN = out(t, T.l63 - 0.4, 0.5);
    if (t > T.jiko - 0.2 && oN < 1) {
      g.save(); g.translate(0, 320 * oN);
      telop(g, '自己触媒', 1000, 832, prog(t, T.jiko, T.jiko + 0.6), { size: 52, mincho: true });
      telop(g, 'ねずみ算', 1000, 912, prog(t, T.nezumi, T.nezumi + 0.5), { size: 40, mincho: true });
      const u = prog(t, T.nezumi, T.fuete + 0.9) * 6.999, steps = Math.floor(u), n = t >= T.nezumi ? 2 ** steps : t >= T.sukoshi ? 1 : 0, fresh = steps > 0 ? 2 ** (steps - 1) : 0;
      for (let i = 0; i < n; i++) { const c = i % 16, r = Math.floor(i / 16), born = steps === 0 ? prog(t, T.sukoshi, T.sukoshi + 0.3) : i >= fresh ? clamp((u - steps) * 4) : 1;
        g.fillStyle = C.R; g.beginPath(); g.arc(1366 + c * 28, 872 + r * 28, 9 * (0.4 + 0.6 * born), 0, TAU); g.fill(); }
      telop(g, '→ 片方だけの世界', 1000, 985, prog(t, T.katahou, T.katahou + 0.6), { size: 36, mincho: true });
      g.restore();
    }
    // câu 63: ① = 不斉触媒, còn lại hai
    if (t > T.fusei - 0.2) {
      telop(g, '① ＝ 不斉触媒', 1000, 872, prog(t, T.fusei, T.fusei + 0.6), { size: 48, mincho: true });
      telop(g, '残るは、あと2つ', 1000, 960, prog(t, T.nokoru, T.ato2 + 0.4), { size: 44, mincho: true });
    }

    mirror(g);
    actCard(g, t, F, this.START, 4);
  }
}
