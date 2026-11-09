// j2 · 次回 (p2 câu 136–138, hết video). DNA j2「合わせ鏡」: gương ĐÃ HẠ (chỉ còn chân kẹp) — một phía;
//  136 đồng xu quay giữa không trung trên khe gương 「もし生命が、もう一度」→「コインは今度、どちらの面を？」
//  137 gói ミントのガム (vẽ) + R-carvone (bạc hà lục, một tay — không còn ảnh gương) 「その香りは、片手の分子から」
//  138 mọi thứ rời khung; tấm kính viền bạc GIỮA khung 「99の発見」+「チャンネル登録」 đứng yên tới hết; mascot `wave` (nói) bên phải.
import { W, H, C, MX, BENCH, clamp, prog, lookup, must, outCubic, ground, mirror, telop, title, actTimes, photo, coin, molecule, stereo, figure, floorShadow, cue } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));          // 0 → 1 rời khung
const PL = { x: 600, y: 300, w: 720, h: 420 };                         // biển kênh giữa khung (tâm x = W/2)

// gói kẹo cao su bạc hà (vẽ): vỏ xanh bạc hà, giấy bạc, một thanh ló ra + lá bạc hà
function gum(g, x, y, k) {
  if (k <= 0) return;
  const e = outCubic(clamp(k));
  g.save(); g.translate(x, y + (1 - e) * 240); g.rotate(-0.08);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-92, -38, 196, 96);
  g.fillStyle = '#E8ECE4'; g.fillRect(-60, -70, 120, 40);
  g.fillStyle = '#C9D2E0'; g.fillRect(-60, -70, 120, 8);
  g.fillStyle = '#5FB89A'; g.fillRect(-100, -46, 200, 92);
  g.fillStyle = '#8FD4B8'; g.fillRect(-100, -46, 200, 10);
  g.strokeStyle = '#2E6E5A'; g.lineWidth = 3; g.strokeRect(-100, -46, 200, 92);
  g.translate(48, 4); g.rotate(-0.5);                                  // lá bạc hà trên vỏ
  g.fillStyle = '#E8F5EE'; g.beginPath(); g.moveTo(-34, 0); g.quadraticCurveTo(0, -26, 34, 0); g.quadraticCurveTo(0, 26, -34, 0); g.fill();
  g.strokeStyle = '#2E6E5A'; g.lineWidth = 2; g.beginPath(); g.moveTo(-30, 0); g.lineTo(30, 0); g.stroke();
  g.restore();
}

// đèn đội đầu — CHÉP NGUYÊN từ j1-matome.js (khung đầu j2 = khung cuối j1, CONTINUES; không import cảnh khác)
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

export default class Next {
  static IMAGES = { soai: './assets/history/soai.jpg' };
  static ERA = 'mirror';
  static POSES = ['wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'j2');
    this.T = {
      moshi: w(136, 'もし'), hajimat: w(136, '始まったら'), coin: w(136, 'コイン'), dochira: w(136, 'どちら'),
      l137: L(137).start, mint: w(137, 'ミント'), gamu: w(137, 'ガム'), kaori: w(137, '香り'), katate: w(137, '片手'), omoi: w(137, '思い出して'),
      l138: L(138).start, arigatou: w(138, 'ありがとう'), ch: w(138, 'チャンネル'), touroku: w(138, '登録'), end: L(138).end,
    };
    this.START = L(136).start;
    this.FROM = Math.max(this.START - 1.2, L(135).end + 0.5);
    // nối thẳng từ j1 (gương đã hạ — dải bạc của chuyển cảnh trượt sẽ "dựng lại" gương): khung đầu = khung cuối j1
    this.CONTINUES = true;
    this.J1_TITLE = actTimes(Math.max(L(128).start - 2.6, L(127).end + 0.5), L(128).start).o1 - 0.2;   // = j1.TITLE
    const T = this.T;
    this.ON = T.l138 - 0.3;                                            // mascot trồi lên (≈ 8 s tới hết video)
    // spearmint = (R)-carvone (CONTENT) — bản vẽ là file chính, không gương
    must(`'${stereo('R-carvone')[0].cip}'`, 'R');
    // mascot wave h 690, crop 0.45 của ảnh 542×1440 (bbox trái 11): mép trái thân > mép phải biển + 20
    this.MASCOT = [1640, 690];
    const s = 690 / (1440 * 0.45);
    must(`${1640 - 271 * s + 11 * s} > ${PL.x + PL.w} + 20`, true);
    // biển đứng yên ≥ 4 s tới hết (tail 2.0 của build.json)
    must(`${T.end + 2.0 - (T.touroku + 0.6)} >= 4`, true);
  }
  sfx() {
    const T = this.T;
    return [
      cue(this.FROM + 0.35, 'whoosh', -8), cue(T.moshi, 'coin'), cue(T.hajimat, 'telop', -4), cue(T.dochira, 'telop', -4),
      cue(T.mint, 'pop', -4), cue(T.katate, 'mol'), cue(T.omoi, 'telop', -6),
      cue(T.l138, 'page'), cue(T.ch, 'telop', -2),
    ];
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'mirror', t);
    // ── trạng thái cuối j1 (ảnh 硤合, 記者会見で, đèn đội đầu, まだまだ…, tiêu đề) → trượt sang trái rời khung ──
    const o0 = out(t, this.FROM + 0.3, 0.8);
    if (o0 < 1) {
      g.save(); g.translate(-1000 * o0, 0);
      g.save(); g.beginPath(); g.rect(0, 0, MX, BENCH); g.clip(); title(g, 'まとめ', t, this.J1_TITLE); g.restore();
      photo(g, 'soai', 160, 250, 160, 1);
      telop(g, '記者会見で', 420, 300, 1, { size: 44, color: '@dim', mincho: true });
      headlight(g, 520, 1);
      telop(g, 'まだまだ分からない。', 140, 600, 1, { size: 48, mincho: true });
      telop(g, '面白いことがあるはず', 140, 690, 1, { size: 48, mincho: true, color: '@L' });
      g.restore();
    }
    mirror(g, { lower: 1 });                                           // gương đã hạ: chỉ còn chân kẹp + khe

    // ── đồng xu quay lơ lửng trên khe gương (136–137) → bay lên khỏi khung trước câu 138 ──
    const oC = out(t, T.l138 - 0.9, 0.8);
    if (oC < 1) {
      const kc = prog(t, this.FROM + 0.3, this.FROM + 0.9), y = 470 + 14 * Math.sin(t * 1.7) - 700 * oC;
      floorShadow(g, MX, 120 * kc * (1 - oC));
      coin(g, MX, y, 100, kc, { spin: t * 5.5 });
    }

    // ── 136: もし生命が、もう一度 → コインは今度、どちらの面を？ ──
    const o1 = out(t, T.l137 - 0.4);
    if (o1 < 1) {
      g.save(); g.translate(0, -500 * o1);
      telop(g, 'もし生命が、もう一度始まったら', W / 2, 220, prog(t, T.moshi, T.hajimat + 0.6), { size: 52, align: 'center', mincho: true });
      g.restore();
      g.save(); g.translate(0, 500 * o1);
      telop(g, 'コインは今度、どちらの面を？', W / 2, 760, prog(t, T.coin - 0.1, T.dochira + 0.8), { size: 56, align: 'center', mincho: true });
      g.restore();
    }

    // ── 137: ミントのガム + R-carvone (một tay) · その香りは、片手の分子から ──
    const o2 = out(t, T.l138 - 0.5);
    if (t > T.l137 - 0.5 && o2 < 1) {
      g.save(); g.translate(-1000 * o2, 0);
      floorShadow(g, 300, 130 * prog(t, T.mint - 0.2, T.mint + 0.3));
      gum(g, 300, 780, prog(t, T.mint - 0.2, T.mint + 0.4));
      telop(g, 'ミントのガム', 300, 640, prog(t, T.mint, T.gamu + 0.5), { size: 44, align: 'center', mincho: true });
      molecule(g, 'R-carvone', { x: 560, y: 430, scale: 52, rot: 0.3 + 0.2 * (t - T.katate), k: prog(t, T.katate - 0.2, T.katate + 0.4) });
      g.restore();
      g.save(); g.translate(1000 * o2, 0);
      telop(g, 'その香りは', 1180, 360, prog(t, T.kaori - 0.1, T.kaori + 0.5), { size: 48, mincho: true, color: '@dim' });
      telop(g, '片手の分子から', 1180, 460, prog(t, T.katate - 0.1, T.katate + 0.7), { size: 60, mincho: true });
      telop(g, '思い出してみてください', 1180, 580, prog(t, T.omoi - 0.1, T.omoi + 0.9), { size: 40, color: '@dim' });
      g.restore();
    }

    // ── 138: biển kênh GIỮA khung (đứng yên tới hết) + mascot wave (nói) ──
    if (t > T.l138 - 0.3) {
      const kp = outCubic(prog(t, T.l138 - 0.2, T.l138 + 0.4)), dy = Math.round((1 - kp) * -(PL.y + PL.h + 40));
      const { x, y, w, h } = PL;
      g.save(); g.translate(0, dy);
      g.save(); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 40; g.shadowOffsetY = 16; g.fillStyle = 'rgba(16,22,38,0.94)'; g.fillRect(x, y, w, h); g.restore();
      const sh = g.createLinearGradient(x, y, x + w, y + h); sh.addColorStop(0, 'rgba(201,210,224,0.10)'); sh.addColorStop(0.45, 'rgba(201,210,224,0.02)'); sh.addColorStop(1, 'rgba(201,210,224,0.06)');
      g.fillStyle = sh; g.fillRect(x, y, w, h);
      g.strokeStyle = C.silver; g.lineWidth = 2; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      g.strokeStyle = 'rgba(201,210,224,0.35)'; g.lineWidth = 1; g.strokeRect(x + 14.5, y + 14.5, w - 29, h - 29);
      telop(g, '99の発見', W / 2, y + 200, prog(t, T.arigatou - 0.3, T.arigatou + 0.6), { size: 112, align: 'center', mincho: true, ls: 6 });
      const kl = prog(t, T.arigatou + 0.4, T.ch);
      if (kl > 0) { g.fillStyle = C.L; g.fillRect(W / 2 - 200, y + 246, 400 * outCubic(kl), 3); }
      telop(g, 'チャンネル登録', W / 2, y + 340, prog(t, T.ch - 0.1, T.touroku + 0.5), { size: 60, align: 'center', mincho: true, ls: 4 });
      g.restore();
      figure(g, 'wave', this.MASCOT[0], H, this.MASCOT[1], prog(t, this.ON, this.ON + 0.5), { t });
    }
  }
}
