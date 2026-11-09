// b8 · Back to the cards (p2 câu 48–52). Đúng bộ đồ của a0: bục chàm khung kem, túi nhung, ba lá bài (đỏ–đỏ, trắng–trắng,
// đỏ–trắng) bay ra khỏi túi; thẻ trực giác "50%" đã X từ a0 bật lên lại nguyên trạng (KHÔNG buzzer); ảnh Bertrand nhỏ.
//   "two cards could show red" → lá trắng–trắng bay về túi · "count the sides" → hai lá còn lại tách thành MẶT (4 mặt),
//   bóng đèn trên từng mặt đỏ bật đúng chữ "three red sides" · ngoặc mực: RED-RED · 2 / RED-WHITE · 1 ·
//   bảng "OTHER SIDE RED? / CHANCE = 2/3" + thanh ngọc 2/3 trên mặt bục · "just like the doors" → ba cửa nhỏ ·
//   nhãn "NOT CHOSEN FAIRLY".
import { W, H, C, FLOOR, clamp, smooth, outBack, outCubic, prog, ground, reflect, bulbs, bulb, flap, flapW, ctr, door,
  playingCard, gutCard, tag, label, block, card, figure, portrait, lookup, must } from '../kit.js';

const N = 22, CELL = 40, GAP = 5, RH = 62, BX = 150, BY = 100;
const BAG = [700, 520], SLOT = [880, 1090, 1290], SY = 445, FACES = ['RR', 'WW', 'RW'];

export default class Cards {
  static ERA = 'stage';
  static IMAGES = { bertrand: './assets/history/bertrand.jpg' };
  static POSES = ['ponder'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b8');
    this.T = {
      now: w(48, 'now'), finish: w(48, 'finish'), cards48: w(48, 'cards'), start: w(48, 'start'),
      gut: w(49, 'gut'), two49: w(49, 'two'), cards49: w(49, 'cards', 2), red49: w(49, 'red'), fifty: w(49, 'fifty-fifty'),
      but: w(50, 'but'), sides1: w(50, 'sides'), three: w(50, 'three'), red50: w(50, 'red'), sides2: w(50, 'sides', 2), e50: L(50).end,
      rr: w(51, 'red-red'), one51: w(51, 'one'), rw: w(51, 'red-white'),
      so: w(52, 'so'), red52: w(52, 'red'), two52: w(52, 'two'), three52: w(52, 'three'), just: w(52, 'just'), doors: w(52, 'doors'),
      fairly: w(52, 'fairly'), end: L(52).end,
    };
    const T = this.T;
    this.START = L(48).start; this.FROM = this.START - 1.2;
    // hộp Bertrand: đếm MẶT — 3 mặt đỏ, 2 thuộc lá đỏ–đỏ → 2/3 (CONTENT "Đúng — giữ nguyên")
    const faces = FACES.join(''), red = [...faces].filter(f => f === 'R').length, onRR = [...FACES[0]].filter(f => f === 'R').length;
    must(`${onRR} / ${red}`, 2 / 3);
    this.V = { red, onRR, onRW: must(`${red} - ${onRR}`, 1), ans: `${onRR}/${red}`, p: onRR / red, gut: must('1 / 2 * 100', 50),
      can: must('["RR", "RW"].length', 2) };
    const V = this.V;
    this.BOARD = [
      [T.now, ctr('BACK TO THE CARDS', N), ' '.repeat(N)],
      [T.gut, ctr('YOUR GUT COUNTS CARDS', N), null],
      [T.red49, null, ctr(`${V.can} CARDS CAN SHOW RED`, N)],
      [T.but, ctr('COUNT SIDES INSTEAD', N), ' '.repeat(N)],
      [T.sides2, null, ctr(`${V.red} RED SIDES`, N)],
      [T.rr, ctr(`RED-RED OWNS ${V.onRR}`, N), null],
      [T.rw, null, ctr(`RED-WHITE OWNS ${V.onRW}`, N)],
      [T.so, ctr('OTHER SIDE RED?', N), ' '.repeat(N)],
      [T.two52, null, ctr(`CHANCE = ${V.ans}`, N)],
    ];
  }
  sfx() {
    const T = this.T;
    return [
      ...this.BOARD.map(([t]) => ({ t, kind: 'flap' })),
      { t: T.finish, kind: 'card' }, { t: T.cards49 - 0.1, kind: 'card' }, { t: T.sides1, kind: 'card' },
      { t: T.three, kind: 'shimmer' }, { t: T.fairly, kind: 'chip' },
    ];
  }

  render(g, t) {
    const T = this.T, V = this.V;
    ground(g);
    // bục + túi (y như a0)
    const top = 640;
    reflect(g, FLOOR, d => {
      d.fillStyle = C.doorD; d.fillRect(540, top, 940, FLOOR - top);
      d.fillStyle = C.door; d.fillRect(556, top + 18, 908, FLOOR - top - 30);
      d.fillStyle = C.frame; d.fillRect(530, top - 10, 960, 14); d.fillStyle = 'rgba(255,255,255,0.4)'; d.fillRect(530, top - 10, 960, 3);
      for (let i = 0; i < 12; i++) { d.fillStyle = 'rgba(0,0,0,0.18)'; d.fillRect(580 + i * 76, top + 34, 3, FLOOR - top - 60); }
      bag(d, BAG[0], top - 8, t, T.cards49);
      // ba cửa nhỏ: "just like the doors" (cửa 3 mở ra dê)
      const kd = prog(t, T.doors - 0.3, T.doors + 0.2);
      if (kd > 0) [0, 1, 2].forEach(i => { const rise = (1 - outBack(prog(t, T.doors - 0.3 + i * 0.08, T.doors + 0.15 + i * 0.08))) * 260;
        d.save(); d.beginPath(); d.rect(1500, 0, 400, FLOOR); d.clip();
        door(d, 1540 + i * 92, FLOOR - 124 + rise, 72, 124, i + 1, i === 2 ? outCubic(prog(t, T.doors + 0.3, T.doors + 0.7)) : 0, { behind: 'goat' });
        d.restore(); });
    });
    if (t > T.doors - 0.3) label(g, 'just like the doors', 1680, 618, C.ink, 'center', 22, prog(t, T.doors, T.doors + 0.6));
    this.cards(g, t);
    // thanh ngọc trên mặt bục: 3 ô (3 mặt đỏ), 2 ô sáng = 2/3
    const kb = outCubic(prog(t, T.two52, T.three52 + 0.4));
    if (kb > 0) {
      const tw = 540, tx = 1010 - tw / 2 + 100, ty = 676, th = 54;
      dashed(g, tx, ty, tw, th, prog(t, T.two52 - 0.3, T.two52 + 0.1));
      for (let i = 1; i < V.red; i++) { g.fillStyle = 'rgba(234,220,192,0.35)'; g.fillRect(tx + tw * i / V.red - 1, ty + 6, 2, th - 12); }
      block(g, tx, ty, Math.max(1, tw * V.p * kb), th, kb > 0.85 ? V.ans : '');
    }
    if (t > T.fairly - 0.1) tag(g, 'not chosen fairly', 1260, 840, prog(t, T.fairly - 0.1, T.fairly + 0.25), { rot: 0.04, size: 22 });
    // Joseph Bertrand (ảnh khắc, PD) — "from the start"
    portrait(g, 'bertrand', 1520, 200, 250, prog(t, T.start - 0.4, T.start + 0.6), { name: 'Joseph Bertrand · 1889', t });
    this.board(g, t);
    // thẻ "50%" từ a0: đã X sẵn (vẽ lại nguyên trạng, không còi)
    gutCard(g, `${V.gut}%`, 760, 905, 400, 190, 1, { state: 'x', kx: 1, rise: prog(t, T.gut - 0.15, T.gut + 0.35), rot: -0.06, seed: 11 });
    if (t > T.gut) label(g, 'your gut', 760, 790, C.ink, 'center', 22, prog(t, T.gut + 0.2, T.gut + 0.7));
    // ponder: "your gut counted cards… count the sides instead"
    const kp = Math.min(prog(t, T.gut - 0.2, T.gut + 0.2), 1 - prog(t, T.e50 - 0.2, T.e50 + 0.25));
    if (kp > 0) figure(g, 'ponder', 230, 1080, 760, kp);
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.2), 'ACT ONE', 'Back to the cards');
  }

  cards(g, t) {
    const T = this.T, names = ['RED · RED', 'WHITE · WHITE', 'RED · WHITE'];
    const ks = outCubic(prog(t, T.sides1, T.sides1 + 0.5));            // tách lá thành hai mặt
    const gone = smooth(prog(t, T.cards49 - 0.1, T.cards49 + 0.4));     // lá trắng–trắng về túi
    for (let i = 0; i < 3; i++) {
      const at = T.finish + i * 0.22, kin = outCubic(prog(t, at, at + 0.45)), kout = i === 1 ? gone : 0;
      if (kin <= 0 || kout >= 1) continue;
      const k = kin * (1 - kout), x = BAG[0] + (SLOT[i] - BAG[0]) * k, y = BAG[1] + (SY - BAG[1]) * k - Math.sin(k * Math.PI) * 60, s = 0.35 + 0.65 * k;
      if (i !== 1 && ks > 0) {
        const cw = 136 - 26 * ks, ch = 200 - 40 * ks, off = 62 * ks;
        playingCard(g, x - off, y, cw, ch, FACES[i], 0, 0, { rot: -0.03 * ks });
        playingCard(g, x + off, y, cw, ch, FACES[i], 0, ks, { rot: 0.03 * ks });
      } else playingCard(g, x, y, 136 * s, 200 * s, FACES[i], 0, i === 1 ? 0 : 0, { rot: (1 - k) * 0.4 });
      if (k > 0.85 && ks < 1) { g.save(); g.globalAlpha = 1 - ks; label(g, names[i], x, SY + 140, C.ink, 'center', 22, prog(t, at + 0.35, at + 0.9)); g.restore(); }
    }
    if (ks <= 0) return;
    // bóng đèn trên từng mặt: đỏ bật đúng "three · red · sides"
    const faces = [[SLOT[0] - 62, 'R', T.three], [SLOT[0] + 62, 'R', T.red50], [SLOT[2] - 62, 'R', T.sides2], [SLOT[2] + 62, 'W', null]];
    faces.forEach(([fx, f, at]) => {
      const on = at != null && t >= at;
      bulb(g, fx, 322, 12 * ks, on);
      if (on && t < at + 0.3) bulb(g, fx, 322, 12 + 6 * (1 - (t - at) / 0.3), true);
    });
    // ngoặc mực: 2 mặt của lá đỏ–đỏ, 1 mặt của lá đỏ–trắng
    bracket(g, SLOT[0] - 118, SLOT[0] + 118, 560, prog(t, T.rr - 0.1, T.rr + 0.35));
    label(g, `red-red · ${this.V.onRR}`, SLOT[0], 606, C.ink, 'center', 22, prog(t, T.rr, T.rr + 0.6));
    bracket(g, SLOT[2] - 118, SLOT[2] - 6, 560, prog(t, T.one51 - 0.1, T.one51 + 0.3));
    label(g, `red-white · ${this.V.onRW}`, SLOT[2] - 40, 606, C.ink, 'center', 22, prog(t, T.rw, T.rw + 0.6));
  }

  board(g, t) {
    let r1 = ' '.repeat(N), r2 = r1, p1 = r1, p2 = r1, k1 = 1, k2 = 1;
    for (const [at, a, b] of this.BOARD) {
      if (t < at) break;
      if (a != null) { p1 = r1; r1 = a; k1 = prog(t, at, at + 1.1); }
      if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
    }
    const bw = flapW(N, CELL, GAP);
    bulbs(g, BX - 40, BY - 40, bw + 80, 2 * RH + 10 + 80, t);
    flap(g, r1, BX, BY, CELL, k1, { from: p1, gap: GAP, h: RH });
    flap(g, r2, BX, BY + RH + 10, CELL, k2, { from: p2, gap: GAP, h: RH });
  }
}

// túi nhung (y như a0), (x, y) = tâm đáy; lắc khi lá trắng–trắng bay về
function bag(d, x, y, t, sh) {
  const shake = t > sh + 0.3 && t < sh + 0.9 ? Math.sin((t - sh - 0.3) * 40) * 0.07 * (1 - (t - sh - 0.3) / 0.6) : 0;
  d.save(); d.translate(x, y); d.rotate(shake);
  d.fillStyle = 'rgba(0,0,0,0.4)'; d.beginPath(); d.ellipse(0, 0, 95, 9, 0, 0, Math.PI * 2); d.fill();
  const bg = d.createLinearGradient(-90, 0, 90, 0); bg.addColorStop(0, '#3A0F12'); bg.addColorStop(0.45, '#7A2A2E'); bg.addColorStop(1, '#2A0A0C');
  d.fillStyle = bg; d.beginPath(); d.moveTo(-48, -170); d.bezierCurveTo(-120, -120, -110, -10, -70, 0); d.lineTo(70, 0);
  d.bezierCurveTo(110, -10, 120, -120, 48, -170); d.closePath(); d.fill();
  d.fillStyle = '#5A1A1E'; d.beginPath(); d.ellipse(0, -172, 54, 16, 0, 0, Math.PI * 2); d.fill();
  d.fillStyle = '#140707'; d.beginPath(); d.ellipse(0, -172, 42, 10, 0, 0, Math.PI * 2); d.fill();
  d.strokeStyle = C.amberD; d.lineWidth = 5; d.beginPath(); d.moveTo(-50, -150); d.quadraticCurveTo(0, -138, 50, -150); d.stroke();
  d.beginPath(); d.moveTo(30, -146); d.quadraticCurveTo(46, -110, 34, -86); d.stroke();
  for (let i = 0; i < 5; i++) { d.fillStyle = 'rgba(255,200,180,0.06)'; d.fillRect(-60 + i * 26, -140, 3, 130); }
  d.restore();
}
// ngoặc mực (màu ngà — §61) dưới các mặt, vẽ dần
function bracket(g, x0, x1, y, k) {
  if (k <= 0) return;
  const m = (x0 + x1) / 2, h = 14, u = clamp(k);
  g.save(); g.strokeStyle = C.ink; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.moveTo(m - (m - x0) * u, y + h * Math.min(1, u * 3) - h); g.lineTo(m - (m - x0) * u, y);
  g.moveTo(m - (m - x0) * u, y); g.lineTo(m + (x1 - m) * u, y); g.moveTo(m + (x1 - m) * u, y); g.lineTo(m + (x1 - m) * u, y - h * Math.min(1, u * 3));
  g.moveTo(m, y); g.lineTo(m, y + 10 * u); g.stroke(); g.restore();
}
function dashed(g, x, y, w, h, k) {
  if (k <= 0) return;
  g.save(); g.globalAlpha = clamp(k); g.strokeStyle = 'rgba(234,220,192,0.7)'; g.lineWidth = 2.5; g.setLineDash([10, 8]);
  g.strokeRect(x, y, w, h); g.restore();
}
