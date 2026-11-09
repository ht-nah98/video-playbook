// c2 · においの右と左 (p2 câu 27–31). DNA §1: carvone R (左, file chính) / S (右, ảnh gương — một file, x → −x; nhãn từ
// stereo()); làn hương cuộn NGƯỢC chiều hai phía; ミント + ガム (左) / キャラウェイ + ライ麦パン (右) vẽ; dòng chữ góc trên-phải
// 「原子はまったく同じ」→「鼻はかぎ分ける」→「においなら…」; câu 31 「薬」: mọi thứ chìm xuống, viên thuốc + 「話は別」.
import { W, C, MX, clamp, prog, lookup, must, outCubic, ground, mirror, title, telop, molecule, stereo, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.5) => outCubic(clamp((t - a) / d));
// làn hương: 3 sợi cuộn đi lên từ (x, y); dir +1 / −1 = chiều cuộn; trôi theo t
function scent(g, x, y, dir, col, k, t) {
  if (k <= 0) return;
  g.save(); g.strokeStyle = col; g.lineCap = 'round';
  for (let j = 0; j < 3; j++) {
    const ox = (j - 1) * 46, N = 40, len = clamp(k * 1.3 - j * 0.15);
    for (let i = 1; i <= N * len; i++) {
      const p = u => { const th = dir * (u * 4.2 * Math.PI + t * 1.6 + j * 2.1), r = 10 + 26 * u; return [x + ox + Math.cos(th) * r, y - u * 165 + Math.sin(th) * r * 0.45]; };
      const [ax, ay] = p((i - 1) / N), [bx, by] = p(i / N);
      g.globalAlpha = 0.85 * (1 - i / N); g.lineWidth = 3.5; g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke();
    }
  }
  g.restore();
}
function mint(g, x, y, k) {                            // nhánh bạc hà: 4 lá có gân
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 80); g.strokeStyle = '#7FB069'; g.fillStyle = 'rgba(127,176,105,0.25)'; g.lineWidth = 4; g.lineJoin = g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, 70); g.lineTo(0, -70); g.stroke();
  for (const [dy, s] of [[-50, -1], [-50, 1], [5, -1], [5, 1]]) {
    g.save(); g.translate(0, dy); g.scale(s, 1); g.rotate(-0.5);
    g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(30, -36, 72, -6); g.quadraticCurveTo(34, 24, 0, 0); g.fill(); g.stroke();
    g.lineWidth = 2; g.beginPath(); g.moveTo(4, 0); g.lineTo(60, -6); g.stroke(); g.restore();
  }
  g.restore();
}
function gum(g, x, y, k) {                             // thanh kẹo cao su trong giấy bạc
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 80); g.rotate(-0.18);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-56, -14, 120, 36);
  g.fillStyle = '#C9D2E0'; g.fillRect(-60, -18, 120, 36); g.fillStyle = '#7FB069'; g.fillRect(-20, -18, 40, 36);
  g.strokeStyle = '#5D6678'; g.lineWidth = 2; g.strokeRect(-60, -18, 120, 36);
  g.restore();
}
function rye(g, x, y, k) {                             // ổ bánh mì lúa mạch đen + vài hạt キャラウェイ
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 80);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.ellipse(6, 40, 110, 20, 0, 0, 7); g.fill();
  g.fillStyle = '#6B4A2E'; g.beginPath(); g.ellipse(0, 0, 105, 52, 0, Math.PI, 0); g.lineTo(105, 30); g.lineTo(-105, 30); g.closePath(); g.fill();
  g.strokeStyle = '#3E2A18'; g.lineWidth = 3; g.stroke();
  g.strokeStyle = '#A07A50'; g.lineWidth = 4; g.lineCap = 'round';
  for (const dx of [-50, 0, 50]) { g.beginPath(); g.moveTo(dx - 16, -30); g.lineTo(dx + 16, -6); g.stroke(); }
  g.restore();
}
function seeds(g, x, y, k) {                           // hạt キャラウェイ: hình lưỡi liềm nhỏ có sọc
  if (k <= 0) return;
  for (let i = 0; i < 7; i++) {
    const kk = clamp(k * 1.6 - i * 0.09); if (kk <= 0) continue;
    const px = x + (i % 4) * 30 - 45 + (i >= 4 ? 15 : 0), py = y + (i >= 4 ? 26 : 0), a = -0.6 + 0.35 * i;
    g.save(); g.translate(px, py + (1 - outCubic(kk)) * 40); g.rotate(a);
    g.fillStyle = '#8A6A45'; g.beginPath(); g.ellipse(0, 0, 13, 4.5, 0, 0, 7); g.fill();
    g.strokeStyle = '#D9C29A'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-10, 0); g.lineTo(10, 0); g.stroke(); g.restore();
  }
}
function capsule(g, x, y, k) {                         // viên nang trung tính (bạc / trắng)
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 120); g.rotate(-0.5);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.roundRect(-118, -38, 248, 88, 44); g.fill();
  g.fillStyle = '#E6EAF0'; g.beginPath(); g.roundRect(-125, -44, 125, 88, [44, 0, 0, 44]); g.fill();
  g.fillStyle = '#8A93A6'; g.beginPath(); g.roundRect(0, -44, 125, 88, [0, 44, 44, 0]); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.45)'; g.fillRect(-95, -30, 190, 8);
  g.restore();
}

export default class Nioi {
  static ERA = 'mirror';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c2');
    const S = i => L(i).start;
    this.T = {
      l27: S(27), carvone: w(27, 'カルボン'),
      l28: S(28), ippou: w(28, '一方'), gum: w(28, 'ガム'), mint: w(28, 'スペアミント'),
      l29: S(29), utsushi: w(29, '映した'), rye: w(29, 'ライ'), cara: w(29, 'キャラウェイ'),
      l30: S(30), genshi: w(30, '原子'), onaji: w(30, '同じ'), hana: w(30, '鼻'), kagi: w(30, 'かぎ分けます'),
      l31: S(31), nioi: w(31, 'におい'), omoshiroi: w(31, 'おもしろい'), kusuri: w(31, '薬'), betsu: w(31, '別'), end: L(31).end,
    };
    this.START = S(27);
    this.FROM = Math.max(this.START - 1.2, L(26).end + 0.5);
    // carvone: file chính R = スペアミント (左), ảnh gương S = キャラウェイ (右) — CONTENT.md; nhãn từ hình học CIP
    this.CL = stereo('R-carvone')[0].cip; this.CR = stereo('R-carvone', { mirror: true })[0].cip;
    must(`'${this.CL}${this.CR}'`, 'RS');
    this.HX = 480; this.RX = 2 * MX - 480;
  }
  sfx() {
    const T = this.T;
    return [
      cue(T.carvone, 'mol'), cue(T.ippou, 'telop', -4), cue(T.mint, 'telop'),
      cue(T.utsushi, 'telop', -4), cue(T.cara, 'telop'), cue(T.onaji, 'telop', -4), cue(T.kagi, 'telop', -2),
      cue(T.kusuri, 'whoosh', -6), cue(T.betsu, 'telop', -2),
    ];
  }
  render(g, t) {
    const T = this.T, { HX, RX } = this;
    ground(g, 'mirror', t);
    title(g, 'においの右と左', t, this.FROM + 0.3);

    // ── carvone R / S + hương (câu 27–30) → chìm xuống ở 「薬」 ──
    const oA = out(t, T.kusuri - 0.3, 0.6);
    if (oA < 1) {
      g.save(); g.translate(0, 820 * oA);
      const km = prog(t, this.FROM + 0.05, this.FROM + 0.6), rot = 0.4 + 0.2 * (t - this.FROM);
      floorShadow(g, HX, 170 * km); floorShadow(g, RX, 170 * km);
      molecule(g, 'R-carvone', { x: HX, y: 540, scale: 46, rot, k: km });
      molecule(g, 'R-carvone', { x: RX, y: 540, scale: 46, rot, k: km, mirror: true });
      telop(g, 'カルボン', HX, 770, prog(t, T.carvone, T.carvone + 0.4), { size: 44, align: 'center', mincho: true });
      telop(g, `${this.CL}体`, 110, 560, prog(t, T.ippou, T.ippou + 0.3), { size: 48, color: '@L' });
      telop(g, `${this.CR}体`, 1810, 560, prog(t, T.utsushi, T.utsushi + 0.3), { size: 48, color: '@R', align: 'right' });
      scent(g, HX - 120, 380, -1, C.L, prog(t, T.mint - 0.2, T.mint + 1.2), t);
      scent(g, RX + 120, 380, 1, C.R, prog(t, T.cara - 0.2, T.cara + 1.2), t);
      mint(g, 210, 880, prog(t, T.mint - 0.3, T.mint + 0.3));
      telop(g, 'スペアミント', 310, 885, prog(t, T.mint, T.mint + 0.5), { size: 44, color: '@L' });
      gum(g, 720, 940, prog(t, T.gum - 0.1, T.gum + 0.4));
      telop(g, 'ガムでおなじみ', 310, 950, prog(t, T.gum, T.gum + 0.5), { size: 32, color: '@dim' });
      rye(g, 1700, 900, prog(t, T.rye - 0.3, T.rye + 0.3));
      seeds(g, 1170, 930, prog(t, T.cara - 0.3, T.cara + 0.4));
      telop(g, 'キャラウェイ', 1580, 885, prog(t, T.cara, T.cara + 0.5), { size: 44, color: '@R', align: 'right' });
      telop(g, 'ライ麦パン', 1580, 950, prog(t, T.rye, T.rye + 0.5), { size: 32, color: '@dim', align: 'right' });
      g.restore();
    }

    // ── dòng chữ góc trên-phải: mục mới đẩy mục cũ lên khỏi khung ──
    const items = [[T.onaji - 0.2, '原子はまったく同じ'], [T.kagi - 0.2, '鼻はかぎ分ける'], [T.omoshiroi - 0.2, 'においなら、おもしろい話']];
    let cur = -1; items.forEach((it, j) => { if (t >= it[0]) cur = j; });
    const oH = out(t, T.kusuri - 0.3, 0.5);
    if (cur >= 0 && oH < 1) {
      const line = (j, dy) => { const [a, s] = items[j]; g.save(); g.beginPath(); g.rect(MX + 30, 690, W, 110); g.clip(); g.translate(0, dy);
        telop(g, s, RX, 770, prog(t, a, a + 0.6), { size: 44, align: 'center', mincho: true }); g.restore(); };
      g.save(); g.translate(0, 400 * oH);
      if (cur >= 1) { const e = out(t, items[cur][0], 0.35); if (e < 1) line(cur - 1, -110 * e); }
      line(cur, 0);
      g.restore();
    }

    // ── 「でも、薬となると、話は別」 ──
    if (t > T.kusuri - 0.3) {
      capsule(g, RX, 540, prog(t, T.kusuri - 0.1, T.kusuri + 0.5));
      telop(g, '薬となると', HX, 500, prog(t, T.kusuri, T.kusuri + 0.5), { size: 48, color: '@dim', align: 'center', mincho: true });
      telop(g, '話は別', HX, 600, prog(t, T.betsu - 0.3, T.betsu + 0.3), { size: 72, align: 'center', mincho: true });
    }

    mirror(g);
  }
}
