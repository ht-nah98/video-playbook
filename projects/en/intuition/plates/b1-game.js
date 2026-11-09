// b1 · The game (p2, MỞ HỒI I "THREE DOORS · ANSWERS 1"). p2 mở từ đen: màn nhung mở ra trên thẻ hồi.
// Camera dolly qua ba khu (mỗi khu một khung):
//   A chân dung Monty Hall (crop người giữa, duotone) + bảng lật "THE MONTY HALL PROBLEM / NAMED AFTER THE HOST",
//     nhãn "MONTY HALL · LET'S MAKE A DEAL".
//   B lớp học phim 21 vẽ lại (không người thật): bảng đen giảng đường, giáo sư = mascot `chalk`, ba ô cửa phấn,
//     "STAY OR SWITCH?", ghế sinh viên được rọi đèn → mũi tên phấn tới ô trả lời trống (viền đứt) → quạt lá bài
//     "CARD COUNTERS"; chú thích "AS SEEN IN THE MOVIE 21 (2008)".
//   C sân khấu ba cửa sơn 1 2 3; ô bóng xe + 2 dê lật thành "?" rồi xáo, chui vào cửa; "YOUR PICK" trên cửa 1;
//     ngoặc đứt hai cửa còn lại; cửa 3 mở ra dê (door + goat); hai cửa còn đóng được rọi; "SWITCH?" lật vào bảng.
import { W, H, C, FLOOR, clamp, hash, smooth, outBack, outCubic, prog, ground, reflect, bulbs, flap, flapW, ctr, door, goat, car,
  tag, label, card, actTitle, curtain, figure, portrait, playingCard, mk, lookup, must } from '../kit.js';

const PAGE = W;
const N = 20, CELL = 42, GAP = 6, RH = 68;                   // bảng treo khu C: 2 hàng × 20 ô (chữ 50 px)
const AN = 22, ACELL = 38, AGAP = 5, ARH = 62;                // bảng khu A: 2 hàng × 22 ô (chữ 46 px)
const DW = 270, DH = 450, DY = FLOOR - DH, XS = [480, 825, 1170];   // ba cửa khu C (toạ độ trong khu)
const CHALK = 'rgba(243,230,207,0.88)';

// bảng lật nhiều hàng: list = [[mốc, hàng1|null, hàng2|null], …] — mỗi mục lật từ chữ cũ sang chữ mới
function boardState(t, list, n) {
  let r1 = ' '.repeat(n), r2 = r1, p1 = r1, p2 = r2, k1 = 1, k2 = 1;
  for (const [at, a, b] of list) {
    if (t < at) break;
    if (a != null) { p1 = r1; r1 = a; k1 = prog(t, at, at + 1.1); }
    if (b != null) { p2 = r2; r2 = b; k2 = prog(t, at + (a != null ? 0.25 : 0), at + (a != null ? 1.35 : 1.1)); }
  }
  return { r1, r2, p1, p2, k1, k2 };
}

export default class Game {
  static ERA = 'stage';
  static IMAGES = { montyhall: './assets/history/lets-make-a-deal-1974.jpg' };
  static POSES = ['chalk'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b1');
    this.T = {
      puzzle: w(0, 'puzzle'), monty: w(0, 'monty'), after: w(0, 'after'), host0: w(0, 'host'), american: w(0, 'american'), lets: w(0, "let's"),
      movie: w(1, 'movie'), tw1: w(1, 'twenty-one'), screen: w(1, 'screen'), professor: w(1, 'professor'), puts: w(1, 'puts'),
      student: w(1, 'student'), middle: w(1, 'middle'), class: w(1, 'class'), students: w(1, "student's"), answer: w(1, 'answer'),
      invited: w(1, 'invited'), team: w(1, 'team'), cardw: w(1, 'card'), counters: w(1, 'counters'), e1: L(1).end,
      rules: w(2, 'rules'), here: L(2).start,
      three3: w(3, 'three'), doors3: w(3, 'doors'), car3: w(3, 'car'), two3: w(3, 'two'), goats: w(3, 'goats'), e3: L(3).end,
      pick4: w(4, 'pick'), number: w(4, 'number'), one4: w(4, 'one'), stays: w(4, 'stays'), closed4: w(4, 'closed'),
      host5: w(5, 'host'), knows: w(5, 'knows'), opens: w(5, 'opens'), two5: w(5, 'two'), didnt: w(5, "didn't"), always: w(5, 'always'), goat5: w(5, 'goat'),
      two6: w(6, 'two'), still6: w(6, 'still'), yours: w(6, 'yours'), other6: w(6, 'other'),
      host7: w(7, 'host'), asks: w(7, 'asks'), sw7: w(7, 'switch'), e7: L(7).end,
    };
    const T = this.T;
    this.START = L(0).start; this.FROM = this.START - 2.6;
    this.PAN = [L(1).start - 0.45, L(2).start - 0.5];
    const V = this.V = {
      doors: must('[1, 2, 3].length', 3), cars: must('1', 1), goats: must('3 - 1', 2), pick: must('0 + 1', 1),
      closed: must('3 - 1', 2), movie: must('21', 21), year: must('2008', 2008),
    };
    this.BA = [                                                   // bảng khu A (22 ô)
      [T.monty, ctr('THE MONTY HALL PROBLEM', AN), null],
      [T.after, null, ctr('NAMED AFTER THE HOST', AN)],
    ];
    this.BC = [                                                   // bảng khu C (20 ô)
      [T.rules - 0.2, ctr('HERE ARE THE RULES', N), null],
      [T.doors3, null, ctr(`${V.doors} DOORS`, N)],
      [T.car3, null, ctr(`${V.cars} CAR · ${V.goats} GOATS`, N)],
      [T.pick4, ctr('YOU PICK A DOOR', N), ' '.repeat(N)],
      [T.one4, null, ctr(`YOUR PICK: DOOR ${V.pick}`, N)],
      [T.closed4, null, ctr('STAYS CLOSED', N)],
      [T.knows, ctr('THE HOST KNOWS', N), ' '.repeat(N)],
      [T.opens, null, ctr('HE OPENS ANOTHER', N)],
      [T.always, null, ctr('ALWAYS A GOAT', N)],
      [T.two6, ctr(`${V.closed} DOORS STILL CLOSED`, N), ' '.repeat(N)],
      [T.host7, ctr('THE HOST ASKS:', N), null],
      [T.sw7, null, ctr('SWITCH?', N)],
    ];
    for (const [, a, b] of [...this.BA, ...this.BC]) for (const s of [a, b]) if (s && s.length > Math.max(N, AN)) throw new Error('b1: hàng bảng quá dài ' + s);
  }
  sfx() {
    const T = this.T;
    return [
      { t: this.START - 1.95, kind: 'flap' },                     // thẻ hồi lật vào
      { t: T.monty, kind: 'flap' }, { t: T.lets, kind: 'chip' },
      { t: T.cardw, kind: 'card' },
      { t: T.rules - 0.2, kind: 'flap' }, { t: T.car3, kind: 'flap' }, { t: T.one4, kind: 'flap' },
      { t: T.always, kind: 'door' }, { t: T.goat5 + 0.1, kind: 'goat' },
      { t: T.sw7, kind: 'flap' },
    ];
  }
  cam(t) { return this.PAN.reduce((x, a) => x + PAGE * smooth(prog(t, a, a + 0.9)), 0); }

  render(g, t) {
    const T = this.T, cx = this.cam(t);
    ground(g);
    g.save(); g.translate(-cx, 0);
    if (cx < PAGE) this.zoneA(g, t);
    if (cx > 0 && cx < 2 * PAGE) this.zoneB(g, t);
    if (cx > PAGE) this.zoneC(g, t);
    g.restore();
    // giáo sư (phim 21 vẽ lại bằng mascot — không người thật): trồi lên ở "professor", lặn khi camera rời lớp
    const kf = Math.min(prog(t, T.professor - 0.25, T.professor + 0.15), 1 - prog(t, this.PAN[1] - 0.35, this.PAN[1] + 0.05));
    if (kf > 0) figure(g, 'chalk', 300 - (cx - PAGE), 1080, 760, kf, { flip: true });
    card(g, prog(t, this.START + 0.3, this.START + 1.0), 'ACT ONE', 'THE GAME');
    actTitle(g, t, this.START, 'ONE', 'THREE DOORS', 'ANSWERS 1');
    // p2 mở từ đen: màn nhung mở (đen tan trong 0.35 s đầu)
    const F = this.FROM;
    curtain(g, 1 - prog(t, F + 0.1, F + 1.0), { black: 1 - prog(t, F, F + 0.35) });
  }

  // ── khu A: chân dung + bảng lật ──
  zoneA(g, t) {
    const T = this.T, px = 230, py = 190, ph = 520, crop = [240, 25, 272, 350];
    const bw = flapW(AN, ACELL, AGAP), bx = 1790 - bw, by = 330;
    // ô chờ chân dung (viền đứt) trước khi đèn bật
    const kp = prog(t, T.host0 - 0.1, T.host0 + 1.2);
    if (kp <= 0) {
      g.save(); g.strokeStyle = 'rgba(234,220,192,0.4)'; g.lineWidth = 3; g.setLineDash([14, 10]);
      g.strokeRect(px - 40, py - 40, Math.round(crop[2] * ph / crop[3]) + 80, ph + 80); g.restore();
    }
    const { w: pw } = portrait(g, 'montyhall', px, py, ph, kp, { t, crop });
    // nhãn tên dán ở "let's make a deal"; năm sinh–mất (CONTENT) dưới nhãn
    if (t > T.lets - 0.1) tag(g, "Monty Hall · Let's Make a Deal", px + pw / 2, py + ph + 76, prog(t, T.lets - 0.1, T.lets + 0.25), { rot: -0.02, size: 22 });
    label(g, 'game-show host · 1921–2017', px + pw / 2, py + ph + 136, C.dim, 'center', 18, prog(t, T.lets + 0.2, T.lets + 0.8));
    const { r1, r2, p1, p2, k1, k2 } = boardState(t, this.BA, AN);
    reflect(g, FLOOR, d => {
      bulbs(d, bx - 46, by - 46, bw + 92, 2 * ARH + 12 + 92, t);
      flap(d, r1, bx, by, ACELL, k1, { from: p1, gap: AGAP, h: ARH });
      flap(d, r2, bx, by + ARH + 12, ACELL, k2, { from: p2, gap: AGAP, h: ARH });
    });
    label(g, 'an american game show', bx + bw / 2, by + 2 * ARH + 12 + 110, C.ink, 'center', 24, prog(t, T.american, T.american + 0.9));
  }

  // ── khu B: lớp học phim 21 vẽ lại ──
  zoneB(g, t) {
    const T = this.T, X = PAGE, bx = X + 660, by = 150, bw = 1120, bh = 440;
    // bảng đen trong khung gỗ (đứng trên sàn giảng đường)
    reflect(g, FLOOR, d => {
      d.fillStyle = '#4A3020'; d.fillRect(bx - 24, by - 24, bw + 48, bh + 48);
      d.fillStyle = 'rgba(255,220,170,0.18)'; d.fillRect(bx - 24, by - 24, bw + 48, 3);
      const sg = d.createLinearGradient(0, by, 0, by + bh); sg.addColorStop(0, '#22201F'); sg.addColorStop(1, C.cell); d.fillStyle = sg; d.fillRect(bx, by, bw, bh);
      d.save(); d.beginPath(); d.rect(bx, by, bw, bh); d.clip();                                                 // vệt phấn chỉ trong mặt bảng
      for (let i = 0; i < 26; i++) { d.fillStyle = `rgba(243,230,207,${0.025 + hash(i * 2.7) * 0.03})`;      // vệt phấn lau
        d.fillRect(bx + hash(i * 1.3) * (bw - 200), by + hash(i * 4.1) * (bh - 30), 120 + hash(i * 5.9) * 260, 10 + hash(i) * 22); }
      d.restore();
      d.fillStyle = '#3A2418'; d.fillRect(bx - 30, by + bh + 24, bw + 60, 16);                               // máng phấn
      d.fillStyle = '#4A3020'; d.fillRect(bx + 80, by + bh + 40, 18, FLOOR - by - bh - 40); d.fillRect(bx + bw - 98, by + bh + 40, 18, FLOOR - by - bh - 40);
    });
    // ba cửa phấn vẽ ở "puts it to a student"
    const cw = 170, ch = 250, cy = by + 50, cxs = [bx + 110, bx + 340, bx + 570];
    cxs.forEach((x, i) => {
      const k = prog(t, T.puts + i * 0.35, T.puts + 0.6 + i * 0.35);
      if (k <= 0) return;
      chalkRect(g, x, cy, cw, ch, k, 31 + i);
      if (k > 0.6) label(g, String(i + 1), x + cw / 2, cy + ch * 0.55, C.ink, 'center', 34, prog(t, T.puts + 0.4 + i * 0.35, T.puts + 0.7 + i * 0.35));
    });
    label(g, 'stay or switch?', bx + 425, cy + ch + 74, C.ink, 'center', 34, prog(t, T.middle, T.class + 0.6));
    // ô trả lời trống (viền đứt) — đáp án của sinh viên chờ ở phần sau
    const ka = prog(t, T.students, T.answer + 0.3), ax = bx + 920, ay = by + 190;
    if (ka > 0) {
      g.save(); g.strokeStyle = CHALK; g.lineWidth = 3; g.setLineDash([12, 9]); g.lineDashOffset = 0;
      g.beginPath(); g.rect(ax - 100, ay - 70, 200, 140); g.stroke(); g.restore();
      label(g, 'answer', ax, ay - 86, C.ink, 'center', 22, ka * 1.5);
    }
    // giảng đường: hai bậc bàn gỗ trước bảng (sàn), ghế sinh viên được rọi ở "student"
    const seat = X + 1500, rowY = [860, 960];
    const ks = prog(t, T.student, T.student + 0.4);
    if (ks > 0) {
      const sg = g.createRadialGradient(seat, rowY[0] - 10, 10, seat, rowY[0] - 10, 260);
      sg.addColorStop(0, `rgba(255,214,150,${0.32 * ks})`); sg.addColorStop(1, 'rgba(255,214,150,0)');
      g.fillStyle = sg; g.fillRect(seat - 300, rowY[0] - 280, 600, 520);
    }
    rowY.forEach((y, r) => {
      g.fillStyle = r ? '#24140F' : C.label; g.fillRect(X + 560, y - 26, 1300, 22);
      g.fillStyle = 'rgba(255,205,160,0.22)'; g.fillRect(X + 560, y - 26, 1300, 3);
      g.fillStyle = r ? '#180D0A' : '#1E120D'; g.fillRect(X + 560, y - 4, 1300, 70);
      for (let i = 0; i < 9; i++) { const sx = X + 640 + i * 140 + r * 70;               // lưng ghế
        g.fillStyle = r ? '#1A0F0B' : '#2E1D15'; g.beginPath(); g.roundRect(sx, y - 70, 70, 46, 8); g.fill(); }
    });
    // mũi tên phấn từ ghế sinh viên tới ô trả lời ở "answer"
    const kr = prog(t, T.answer, T.answer + 0.6);
    if (kr > 0) chalkArrow(g, [seat, rowY[0] - 80], [seat + 40, 560], [ax + 40, ay + 80], kr);
    // "invited onto a team of card counters": quạt lá bài bật ra từ ghế
    for (let i = 0; i < 3; i++) {
      const k = outBack(prog(t, T.team + i * 0.12, T.team + 0.45 + i * 0.12)); if (k <= 0) continue;
      playingCard(g, seat + 150 + (i - 1) * 46, rowY[0] - 120 - Math.abs(i - 1) * -8, 74 * k, 108 * k, i === 1 ? 'RW' : 'WR', 0, 0, { rot: (i - 1) * 0.3 });
    }
    if (t > T.counters) tag(g, 'card counters', seat + 150, rowY[0] - 210, prog(t, T.counters, T.counters + 0.3), { rot: 0.03, size: 22 });
    label(g, `as seen in the movie ${this.V.movie} (${this.V.year})`, bx + bw / 2, by + bh + 104, C.dim, 'center', 24, prog(t, T.movie, T.screen + 0.4));
  }

  // ── khu C: sân khấu ba cửa ──
  zoneC(g, t) {
    const T = this.T, X = 2 * PAGE, xs = XS.map(v => X + v);
    const bw = flapW(N, CELL, GAP), bx = X + (W - bw) / 2 - 150, by = 110;
    const open3 = outCubic(prog(t, T.always, T.always + 0.5));
    const pop = i => outBack(prog(t, T.rules + i * 0.3, T.rules + 0.45 + i * 0.3));   // cửa trồi lên từ "rules"
    // đèn rọi: cửa 1 ở "pick"; hai cửa còn đóng ở "still closed"
    const spot = (x, a) => { if (a <= 0) return; const sg = g.createLinearGradient(0, 120, 0, FLOOR); sg.addColorStop(0, 'rgba(255,214,150,0)'); sg.addColorStop(1, `rgba(255,214,150,${0.14 * a})`);
      g.fillStyle = sg; g.beginPath(); g.moveTo(x + DW * 0.3, 140); g.lineTo(x + DW * 0.7, 140); g.lineTo(x + DW + 50, FLOOR); g.lineTo(x - 50, FLOOR); g.fill(); };
    spot(xs[0], prog(t, T.pick4, T.pick4 + 0.4) + 0.6 * prog(t, T.yours, T.yours + 0.3) * (1 - prog(t, T.yours + 0.6, T.yours + 1.0)));
    spot(xs[1], prog(t, T.two6, T.two6 + 0.4) + 0.6 * prog(t, T.other6, T.other6 + 0.3) * (1 - prog(t, T.other6 + 0.6, T.other6 + 1.0)));
    const st = boardState(t, this.BC, N);
    reflect(g, FLOOR, d => {
      bulbs(d, bx - 46, by - 46, bw + 92, 2 * RH + 12 + 92, t);
      flap(d, st.r1, bx, by, CELL, st.k1, { from: st.p1, gap: GAP, h: RH });
      flap(d, st.r2, bx, by + RH + 12, CELL, st.k2, { from: st.p2, gap: GAP, h: RH });
      xs.forEach((x, i) => {
        const k = pop(i); if (k <= 0) return;
        d.save(); d.beginPath(); d.rect(x - 200, 0, DW + 400, FLOOR); d.clip(); d.translate(0, (1 - k) * (DH + 40));   // trồi lên từ sàn
        door(d, x, DY, DW, DH, i + 1, i === 2 ? open3 : 0, { behind: 'goat' });
        d.restore();
      });
    });
    // ô bóng: xe + 2 dê hiện trên cửa, lật thành "?", xáo, chui vào cửa
    this.tiles(g, t, xs);
    // "YOUR PICK" dán chéo trên cửa 1 ở "door number one"
    const kt = prog(t, T.one4 - 0.1, T.one4 + 0.25);
    if (kt > 0) {
      const sc = 1 + 0.25 * (1 - outCubic(kt));
      g.save(); g.translate(xs[0] + DW / 2, DY + DH * 0.78); g.rotate(-0.06); g.scale(sc, sc);
      g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 10; g.shadowOffsetY = 4; g.fillStyle = C.ink; g.fillRect(-112, -26, 224, 52); g.restore();
      g.fillStyle = 'rgba(230,220,195,0.7)'; g.fillRect(-126, -18, 26, 36); g.fillRect(100, -18, 26, 36);
      label(g, 'your pick', 0, 9, C.label, 'center', 24); g.restore();
    }
    // ổ khoá nhỏ "stays closed": hai chốt kem đóng ngang cửa 1
    const kl = prog(t, T.closed4, T.closed4 + 0.35);
    if (kl > 0) for (const yy of [DY + 70, DY + DH - 120]) {
      g.fillStyle = C.frame; g.fillRect(xs[0] - 22, yy, 44 * kl, 14); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(xs[0] - 22, yy + 11, 44 * kl, 3);
    }
    // ngoặc đứt bao hai cửa bạn không chọn (mực ngà — không phải màu xác suất)
    const kb = prog(t, T.two5, T.didnt + 0.3) * (1 - prog(t, T.two6 - 0.3, T.two6 + 0.2));
    if (kb > 0) {
      const L = xs[1] - 10, R = xs[2] + DW + 10, ky = FLOOR + 40;      // ngoặc trên sàn, mở lên phía hai cửa
      g.save(); g.strokeStyle = C.ink; g.globalAlpha = 0.8; g.lineWidth = 3; g.setLineDash([12, 8]);
      g.beginPath(); g.moveTo(L, ky - 18); g.lineTo(L, ky); g.lineTo(L + (R - L) * kb, ky); if (kb >= 1) g.lineTo(R, ky - 18); g.stroke(); g.restore();
      label(g, "you didn't pick", (L + R) / 2, ky + 40, C.ink, 'center', 24, kb * 1.3);
    }
  }
  tiles(g, t, xs) {
    const T = this.T, ty = DY + 130, tw = 230, th = 168;
    const flipK = prog(t, T.e3 + 0.05, T.e3 + 0.35), sh = smooth(prog(t, T.e3 + 0.35, T.pick4 - 0.05)), inK = prog(t, T.pick4 - 0.05, T.pick4 + 0.35);
    if (inK >= 1) return;
    // [cửa ban đầu, cửa sau khi xáo, mốc hiện, vật]
    const items = [[1, 0, T.car3, 'car'], [0, 2, T.goats - 0.1, 'goat'], [2, 1, T.goats + 0.1, 'goat']];
    for (const [a, b, at, what] of items) {
      const k = outBack(prog(t, at, at + 0.35)); if (k <= 0) continue;
      const x0 = xs[a] + DW / 2, x1 = xs[b] + DW / 2, x = x0 + (x1 - x0) * sh, y = ty - Math.sin(sh * Math.PI) * (a === 1 ? -60 : 60);
      const s = k * (1 - smooth(inK)), fl = Math.abs(Math.cos(Math.PI * flipK)), back = flipK >= 0.5;
      if (s <= 0.01) continue;
      g.save(); g.translate(x, y + smooth(inK) * 60); g.scale(s * Math.max(0.03, fl), s);
      g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 16; g.shadowOffsetY = 8;
      g.fillStyle = back ? C.velvet : C.card; g.beginPath(); g.roundRect(-tw / 2, -th / 2, tw, th, 10); g.fill(); g.restore();
      g.strokeStyle = back ? C.amberD : 'rgba(120,90,60,0.4)'; g.lineWidth = 3; g.beginPath(); g.roundRect(-tw / 2 + 5, -th / 2 + 5, tw - 10, th - 10, 7); g.stroke();
      if (back) label(g, '?', 0, 18, C.ink, 'center', 34);
      else {                                                     // bóng (silhouette) mực
        g.drawImage(SIL[what] ??= silhouette(what), -tw / 2, -th / 2, tw, th);
      }
      g.restore();
    }
  }
}

// bóng (silhouette) mực của xe / dê trên ô kem 230 × 168 — vẽ MỘT lần
const SIL = {};
function silhouette(what) {
  const c = mk(230, 168), x = c.getContext('2d');
  if (what === 'car') car(x, 17, 34, 0.98); else goat(x, 31, 18, 0.92);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = C.label; x.fillRect(0, 0, 230, 168);
  return c;
}
// khung chữ nhật phấn vẽ dần (nét lệch nhẹ theo hash)
function chalkRect(g, x, y, w, h, k, seed) {
  const P = [[x, y + h], [x, y], [x + w, y], [x + w, y + h]], seg = [h, w, h], tot = h * 2 + w;
  let left = tot * clamp(k);
  g.save(); g.strokeStyle = CHALK; g.lineWidth = 5; g.lineCap = 'round';
  for (let i = 0; i < 3 && left > 0; i++) {
    const u = Math.min(1, left / seg[i]); left -= seg[i];
    const [x0, y0] = P[i], [x1, y1] = P[i + 1], j = (hash(seed + i) - 0.5) * 4;
    g.beginPath(); g.moveTo(x0 + j, y0); g.lineTo(x0 + (x1 - x0) * u - j, y0 + (y1 - y0) * u + j); g.stroke();
  }
  if (k >= 1) { g.beginPath(); g.arc(x + w * 0.8, y + h * 0.55, 6, 0, Math.PI * 2); g.stroke(); }   // núm cửa
  g.restore();
}
// mũi tên phấn cong (bậc hai) vẽ dần
function chalkArrow(g, a, c, b, k) {
  const q = u => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * c[1] + u * u * b[1]];
  const n = Math.max(2, Math.round(40 * clamp(k)));
  g.save(); g.strokeStyle = CHALK; g.lineWidth = 4; g.lineCap = 'round'; g.setLineDash([16, 10]);
  g.beginPath(); for (let i = 0; i <= n; i++) { const [x, y] = q(clamp(k) * i / n); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  if (k >= 1) { const [x0, y0] = q(0.94), ang = Math.atan2(b[1] - y0, b[0] - x0); g.setLineDash([]);
    g.beginPath(); g.moveTo(b[0] - 22 * Math.cos(ang - 0.5), b[1] - 22 * Math.sin(ang - 0.5)); g.lineTo(b[0], b[1]); g.lineTo(b[0] - 22 * Math.cos(ang + 0.5), b[1] - 22 * Math.sin(ang + 0.5)); g.stroke(); }
  g.restore();
}
