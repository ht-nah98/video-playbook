// d2 · 片手の触媒 (p2, câu 48–55). DNA d2:
//  ① câu 48: tấm phân tử phẳng của d1 vẫn trên gương, hai đường tới đối xứng; 「対称性を崩す」; 片手 → găng tay hổ phách trồi lên
//     MỘT phía (trái), đường tới bên trái tắt
//  ② câu 49–50: 「不斉触媒」, 「不斉 ＝ 左右がそろっていない」; bánh răng kim loại (エンジン) vào lòng găng (ハンドル)
//  ③ câu 51–52: 1971年 · カガン (ảnh kagan) · 「ハンドル役の分子」 DIOP (phối tử vẽ biểu tượng, màu trung tính); 天然の酒石酸 = đống
//     PHẢI của b1 (azure, quay phải) ✓ → một tinh thể bay qua gương vào DIOP; đống trái = ảnh gương
//  ④ câu 53–54: 2001年 huy chương (nobel) + 「ノーベル化学賞」; 名古屋大学 野依良治 (chữ), hai người còn lại; カガン (ảnh) —
//     ô tên trống nét đứt 「カガン？」
//  ⑤ câu 55: 2001年 → 2026年, 「25年」 (must), 「もう一つの発見で」, huy chương nhỏ cạnh ảnh カガン.
// Vật thiếu trong kit: tấm phẳng flatMol (CHÉP từ d1 — nên gom vào kit), bánh răng kim loại gear(), phối tử DIOP diop().
import { C, MX, JP, clamp, prog, lookup, must, outCubic, smooth, ground, mirror, title, telop, nobelText, arrow, hand,
  crystal, nobel, photo, badge, tick, floorShadow, write, cue, TAU } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));

/** Tấm phân tử phẳng — giống hệt d1 (gom vào kit). */
function flatMol(g, x, y, s, k, yaw) {
  if (k <= 0) return [];
  const e = outCubic(clamp(k)), sw = Math.sin(yaw), cw = Math.cos(yaw);
  const P = [[1, 0], [-0.5, -0.866], [-0.5, 0.866]].map(([Y, Z]) => [x + Z * sw * s * e, y - Y * s * e + Z * cw * 0.16 * s * e]);
  const plate = P.map(([px, py]) => [x + (px - x) * 1.3, y + (py - y) * 1.3]);
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath(); plate.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath();
  g.fillStyle = 'rgba(201,210,224,0.12)'; g.fill(); g.strokeStyle = 'rgba(201,210,224,0.75)'; g.lineWidth = 2; g.stroke();
  for (const p of P) { g.strokeStyle = '#2A3246'; g.lineWidth = 13; g.beginPath(); g.moveTo(x, y); g.lineTo(...p); g.stroke();
    g.strokeStyle = C.bone; g.lineWidth = 7; g.beginPath(); g.moveTo(x, y); g.lineTo(...p); g.stroke(); }
  const shapes = [6, 4, 3], cols = [C.silver, C.bone, C.dim];
  P.forEach(([px, py], i) => { const n = shapes[i], r = 24 * e;
    g.beginPath(); for (let j = 0; j < n; j++) { const a = j / n * TAU - Math.PI / 2; j ? g.lineTo(px + r * Math.cos(a), py + r * Math.sin(a)) : g.moveTo(px + r * Math.cos(a), py + r * Math.sin(a)); }
    g.closePath(); g.fillStyle = '#2A3246'; g.fill(); g.strokeStyle = cols[i]; g.lineWidth = 3.5; g.stroke(); });
  g.beginPath(); g.arc(x, y, 15 * e, 0, TAU); g.fillStyle = '#4A5366'; g.fill(); g.strokeStyle = C.silver; g.lineWidth = 2.5; g.stroke();
  g.restore();
  return P;
}
/** Bánh răng kim loại (nguyên tử kim loại = động cơ): r bán kính, spin quay theo t, k bật ra. */
function gear(g, x, y, r, k, spin) {
  if (k <= 0) return;
  const e = outCubic(clamp(k)), n = 10;
  g.save(); g.translate(x, y); g.scale(e, e); g.rotate(spin);
  g.beginPath();
  for (let i = 0; i < n * 2; i++) { const a0 = i / (n * 2) * TAU, a1 = (i + 1) / (n * 2) * TAU, R = i % 2 ? r * 0.8 : r;
    g.lineTo(R * Math.cos(a0 + 0.06), R * Math.sin(a0 + 0.06)); g.lineTo(R * Math.cos(a1 - 0.06), R * Math.sin(a1 - 0.06)); }
  g.closePath();
  const gr = g.createLinearGradient(-r, -r, r, r); gr.addColorStop(0, '#F4F7FB'); gr.addColorStop(0.5, '#9AA4B6'); gr.addColorStop(1, '#4E576A');
  g.fillStyle = gr; g.fill(); g.strokeStyle = '#2A3246'; g.lineWidth = 2; g.stroke();
  g.beginPath(); g.arc(0, 0, r * 0.32, 0, TAU); g.fillStyle = '#1A2133'; g.fill(); g.strokeStyle = C.silver; g.lineWidth = 2; g.stroke();
  g.restore();
}
/** DIOP vẽ biểu tượng: vòng 5 cạnh (dioxolane, từ 酒石酸) + hai tay CH₂ tới hai P, mỗi P hai vòng phenyl. */
function diop(g, x, y, s, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y); g.scale(e, e); g.lineJoin = 'round'; g.lineCap = 'round';
  const ring = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i / 5 * TAU; return [s * 0.45 * Math.cos(a), s * 0.45 + s * 0.45 * Math.sin(a)]; });
  const seg = (a, b, col = C.bone, w = 5) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); };
  const P = [[-s * 0.75, -s * 0.5], [s * 0.75, -s * 0.5]];
  seg(ring[4], [-s * 0.7, -s * 0.05]); seg([-s * 0.7, -s * 0.05], P[0]);
  seg(ring[1], [s * 0.7, -s * 0.05]); seg([s * 0.7, -s * 0.05], P[1]);
  for (const [px, py] of P) for (const dx of [-1, 1]) {
    const cx = px + dx * s * 0.42, cy = py - s * 0.42; seg([px, py], [cx - dx * s * 0.17, cy + s * 0.17]);
    g.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; g.lineTo(cx + s * 0.2 * Math.cos(a), cy + s * 0.2 * Math.sin(a)); }
    g.closePath(); g.strokeStyle = C.dim; g.lineWidth = 3; g.stroke();
  }
  g.beginPath(); ring.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath();
  g.fillStyle = 'rgba(201,210,224,0.14)'; g.fill(); g.strokeStyle = C.silver; g.lineWidth = 5; g.stroke();
  for (const [px, py] of P) { g.beginPath(); g.arc(px, py, s * 0.16, 0, TAU); g.fillStyle = '#1A2133'; g.fill(); g.strokeStyle = C.silver; g.lineWidth = 3; g.stroke(); }
  g.restore();
  if (e >= 1) for (const [px, py] of P) write(g, 'P', x + px, y + py + 11, 1, { font: `700 30px ${JP}`, align: 'center', shadow: false });
}
/** Một đống tinh thể (3 viên) — mirror: đống ảnh gương. */
function pile(g, x, y, k, mirror, rot) {
  for (const [dx, dy, s, d] of [[-48, 12, 34, 0], [46, 16, 30, 0.15], [0, -18, 42, 0.3]])
    crystal(g, x + (mirror ? -dx : dx), y + dy, s, clamp(k * 1.5 - d), { mirror, rot });
}

export default class Shokubai {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = { kagan: './assets/history/kagan.jpg' };
  init({ tl }) {
    const { L, w } = lookup(tl, 'd2');
    const S = i => L(i).start;
    this.T = {
      taisho: w(48, '対称性'), tashika: w(48, '確か'), katate: w(48, '片手'), ireru: w(48, '入れる'),
      fusei: w(49, '不斉', 1), sayu: w(49, '左右'),
      kinzoku: w(50, '金属'), engine: w(50, 'エンジン'), mawari: w(50, 'まわり'), handle: w(50, 'ハンドル'),
      y1971: w(51, '1971年'), kagan: w(51, 'カガンさんたち'), handle51: w(51, 'ハンドル'), bunshi: w(51, '分子'), diop: w(51, 'ディオップ'),
      genryo: w(52, '原料'), shuseki: w(52, '酒石酸'), pasteur: w(52, 'パスツール'), katahou: w(52, '片方'), onaji: w(52, '同じ'),
      y2001: w(53, '2001年'), nobel: w(53, 'ノーベル'), nagoya: w(53, '名古屋'), noyori: w(53, '野依良治'), hitori: w(53, '一人'),
      jushosha: w(54, '受賞者'), kagan54: w(54, 'カガンさん'), nakatta: w(54, 'ありませんでした'),
      y25: w(55, '25年'), hakken: w(55, '発見'), yobareru: w(55, '呼ばれる'),
    };
    this.START = S(48);
    this.FROM = Math.max(this.START - 1.2, L(47).end + 0.5);
    must('2026 - 2001', 25);                                             // 「25年」: Nobel 2001 → Nobel 2026 (CONTENT.md)
  }
  sfx() {
    const T = this.T;
    // trần d2: 2 chuyển cảnh trang + 21 ≤ 58.75 ÷ 2.5
    return [
      cue(T.taisho, 'telop'), cue(T.katate, 'glass', -4), cue(T.fusei, 'flip', -4), cue(T.sayu, 'telop'),
      cue(T.engine, 'tweezers'), cue(T.handle, 'telop', -4),
      cue(T.y1971, 'page'), cue(T.kagan, 'photo'), cue(T.bunshi, 'mol'),
      cue(T.shuseki, 'crystal'), cue(T.pasteur, 'crystal', -4), cue(T.onaji, 'match'),
      cue(T.y2001, 'telop'), cue(T.nobel, 'nobel'), cue(T.noyori, 'telop'), cue(T.hitori, 'pop', -8),
      cue(T.kagan54, 'photo'), cue(T.nakatta, 'telop', -4),
      cue(T.y25, 'telop'), cue(T.hakken, 'telop', -6), cue(T.yobareru, 'flip', -4),
    ];
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, 'mirror', t);
    mirror(g);
    title(g, '片手の触媒', t, F + 0.6);

    // ── ① ② câu 48–50: đường tới đối xứng → găng tay một phía → xúc tác (bánh răng + găng) ──
    const o12 = out(t, T.y1971 + 0.6, 0.6), k12 = 1 - prog(t, T.y1971, T.y1971 + 0.4);   // chữ rút trước, vật trượt sau
    if (o12 < 1) {
      // tấm phẳng + hai đường tới (trượt xuống ở câu 50)
      const oP = out(t, T.kinzoku - 0.5, 0.6);
      if (oP < 1) {
        g.save(); g.translate(0, 600 * oP);
        const RP = [[1320, 780], [1140, 780], [990, 560]], LP = RP.map(([x, y]) => [2 * MX - x, y]);
        const kA = prog(t, F + 0.9, F + 1.5), fadeL = 1 - prog(t, T.katate, T.katate + 0.6);
        arrow(g, RP, kA, { color: C.R, w: 5 });
        if (fadeL > 0) { g.save(); g.globalAlpha = fadeL; arrow(g, LP, kA, { color: C.L, w: 5 }); g.restore(); }
        const kp = prog(t, F + 0.4, F + 1.1);                         // rơi xuống từ trên (không đặt sẵn: d1 cũng có tấm này — §50)
        flatMol(g, MX, 520 - Math.round(520 * (1 - outCubic(kp))), 140, Math.min(1, kp * 3), 0.9 + 0.1 * Math.sin(0.5 * (t - this.START)));
        g.restore();
      }
      // găng tay hổ phách (片手) → tiến lại gần → giữ bánh răng (câu 50); rời sang trái ở câu 51
      g.save(); g.translate(-900 * o12, 0);
      const kG = prog(t, T.katate - 0.1, T.katate + 0.5), slide = smooth(prog(t, T.ireru, T.ireru + 0.8));
      const back = smooth(prog(t, T.kinzoku - 0.6, T.kinzoku)), gx = 480 + 140 * slide * (1 - back), gy = 640 - 40 * back;
      const grip = 1 + 0.08 * Math.sin(Math.PI * prog(t, T.mawari, T.mawari + 0.8));
      floorShadow(g, gx, 160 * Math.min(1, kG));
      hand(g, gx, gy, 95 * grip, kG, { side: 'L', glove: true });
      gear(g, gx, gy + 20, 62, prog(t, T.kinzoku - 0.1, T.kinzoku + 0.4), 0.6 * (t - T.kinzoku));
      g.restore();
      // chữ bên phải
      const kOff = 1 - prog(t, T.fusei - 0.5, T.fusei - 0.1);
      telop(g, '対称性を崩す', 1040, 290, k12 * prog(t, T.taisho, T.taisho + 0.6) * kOff, { size: 48, mincho: true });
      telop(g, 'いちばん確かな方法', 1040, 360, k12 * prog(t, T.tashika, T.tashika + 0.6) * kOff, { size: 36, color: '@dim' });
      telop(g, '片手のものを入れる', 1040, 440, k12 * prog(t, T.katate, T.katate + 0.7) * kOff, { size: 44, mincho: true });
      telop(g, '不斉触媒', 1040, 330, k12 * prog(t, T.fusei, T.fusei + 0.6), { size: 72, mincho: true });
      telop(g, '不斉＝左右がそろっていない', 1040, 430, k12 * prog(t, T.sayu, T.sayu + 0.9), { size: 40 });
      telop(g, '金属＝エンジン', 1040, 580, k12 * prog(t, T.engine, T.engine + 0.6), { size: 44 });
      telop(g, '片手の分子＝ハンドル', 1040, 670, k12 * prog(t, T.handle, T.handle + 0.7), { size: 44 });
    }

    // ── ③ câu 51–52: 1971 · カガン · DIOP · 天然の酒石酸 (tinh thể Pasteur) ──
    // b1: 酒石酸 tự nhiên = đống PHẢI (azure, 「右へ回す」 — L-(+) quay phải; L/D KHÔNG phải chiều quay, CONTENT §10).
    const o3 = out(t, T.y2001 - 0.7, 0.6), k3 = 1 - prog(t, T.y2001 - 1.1, T.y2001 - 0.7);
    if (t > T.y1971 - 0.4 && o3 < 1) {
      telop(g, '1971年', 140, 300, k3 * prog(t, T.y1971, T.y1971 + 0.6), { size: 64 });
      const DX = 470, DY = 640;
      telop(g, 'ハンドル役の分子', DX, 400, k3 * prog(t, T.handle51, T.handle51 + 0.7), { size: 36, color: '@dim', align: 'center' });
      telop(g, 'ディオップ（DIOP）', DX, 840, k3 * prog(t, T.diop, T.diop + 0.6), { size: 44, align: 'center' });
      // カガン (ảnh) — trượt ra phải trước câu 52
      const oK = out(t, T.genryo - 0.4, 0.5);
      if (oK < 1) { g.save(); g.translate(1000 * oK, 0); photo(g, 'kagan', 1040, 240, 300, prog(t, T.kagan - 0.2, T.kagan + 0.6)); g.restore(); }
      telop(g, 'DIOPの原料', 1040, 300, k3 * prog(t, T.genryo, T.genryo + 0.6), { size: 48, mincho: true });
      telop(g, 'パスツールが分けた2つの山', 1040, 390, k3 * prog(t, T.pasteur, T.pasteur + 0.9), { size: 40, color: '@dim' });
      telop(g, 'その片方と同じ形', 1040, 470, k3 * prog(t, T.onaji, T.onaji + 0.7), { size: 44 });
      const RX = 2 * MX - 780;
      telop(g, '天然の酒石酸', RX, 1000, k3 * prog(t, T.shuseki, T.shuseki + 0.6), { size: 40, align: 'center' });
      g.save(); g.translate(0, 800 * o3);
      // DIOP nhận tinh thể: loé nhẹ khi tinh thể tới
      const hit = Math.sin(Math.PI * prog(t, T.onaji + 0.9, T.onaji + 1.5));
      diop(g, DX, DY, 170 * (1 + 0.06 * hit), prog(t, T.bunshi - 0.1, T.bunshi + 0.5));
      // hai đống: PHẢI (天然) hiện ở 酒石酸, TRÁI (đống gương) ở パスツール; ✓ đống phải ở 片方
      const kR = prog(t, T.shuseki - 0.1, T.shuseki + 0.7), kL = prog(t, T.pasteur - 0.1, T.pasteur + 0.7), rot = -0.35 + 0.12 * Math.sin(0.5 * (t - T.shuseki));
      floorShadow(g, 780, 120 * Math.min(1, kL)); floorShadow(g, RX, 120 * Math.min(1, kR));
      pile(g, 780, 860, kL, false, rot); pile(g, RX, 860, kR, true, rot);
      const kT = prog(t, T.katahou, T.katahou + 0.5);
      if (kT > 0) { badge(g, RX + 100, 790, 24, { stroke: C.silver }); tick(g, RX + 100, 792, 14, kT); }
      // một tinh thể bay từ đống phải qua gương vào DIOP (đường chấm để lại)
      const uf = prog(t, T.onaji - 0.1, T.onaji + 0.9);
      if (uf > 0) {
        const path = [[RX, 800], [MX, 560], [DX + 60, DY + 20]], e = smooth(uf), n = 24;
        g.save(); g.setLineDash([6, 10]); g.strokeStyle = 'rgba(201,210,224,0.6)'; g.lineWidth = 2; g.beginPath();
        for (let i = 0; i <= n * e; i++) { const u = i / n, a = (1 - u) ** 2, b = 2 * u * (1 - u), c = u * u;
          const x = a * path[0][0] + b * path[1][0] + c * path[2][0], y = a * path[0][1] + b * path[1][1] + c * path[2][1]; i ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.stroke(); g.restore();
        if (uf < 1) { const a = (1 - e) ** 2, b = 2 * e * (1 - e), c = e * e;
          crystal(g, a * path[0][0] + b * path[1][0] + c * path[2][0], a * path[0][1] + b * path[1][1] + c * path[2][1], 34 * (1 - 0.6 * e), 1, { mirror: true, rot: rot + 3 * e }); }
      }
      g.restore();
    }

    // ── ④ ⑤ câu 53–55: 2001 Nobel · 野依良治 · カガン vắng · 25年 ──
    if (t > T.y2001 - 0.4) {
      telop(g, '2001年', 160, 300, prog(t, T.y2001, T.y2001 + 0.6), { size: 64 });
      telop(g, '→2026年', 390, 300, prog(t, T.y25, T.y25 + 0.7), { size: 64, color: '@dim' });
      nobel(g, 1380, 400, 110, prog(t, T.nobel - 0.1, T.nobel + 0.5), { spin: 2.5 * (1 - smooth(prog(t, T.nobel, T.nobel + 1.2))) });
      nobelText(g, 'ノーベル化学賞', 1380, 600, prog(t, T.nobel + 0.2, T.nobel + 1.0), { size: 52, mincho: true, align: 'center' });
      telop(g, '名古屋大学', 1380, 690, prog(t, T.nagoya, T.nagoya + 0.6), { size: 32, color: '@dim', align: 'center' });
      telop(g, '野依良治', 1380, 765, prog(t, T.noyori, T.noyori + 0.6), { size: 56, align: 'center', mincho: true });
      telop(g, 'ノールズ', 1130, 860, prog(t, T.hitori, T.hitori + 0.5), { size: 36, color: '@dim', align: 'center' });
      telop(g, 'シャープレス', 1630, 860, prog(t, T.hitori + 0.2, T.hitori + 0.7), { size: 36, color: '@dim', align: 'center' });
      // ô tên trống cho カガン
      const kS = prog(t, T.nakatta, T.nakatta + 0.6);
      if (kS > 0) {
        g.save(); g.setLineDash([10, 8]); g.strokeStyle = C.bone; g.lineWidth = 2.5; const w = 340 * outCubic(kS);
        g.strokeRect(1380 - w / 2, 920, w, 70); g.restore();
        telop(g, 'カガン？', 1380, 970, kS, { size: 40, color: '@bone', align: 'center' });
      }
      photo(g, 'kagan', 160, 380, 300, prog(t, T.jushosha, T.kagan54 + 0.3));
      telop(g, '25年', 160, 900, prog(t, T.y25, T.y25 + 0.6), { size: 80 });
      telop(g, 'もう一つの発見で', 160, 985, prog(t, T.hakken, T.hakken + 0.7), { size: 40, color: '@dim' });
      nobel(g, 470, 520, 50, prog(t, T.yobareru - 0.1, T.yobareru + 0.5), { spin: 3 * (1 - smooth(prog(t, T.yobareru, T.yobareru + 1.0))) });
    }
  }
}
