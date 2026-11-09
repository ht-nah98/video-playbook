// b16 · Next time · câu p2 87–92 + outro. Trang p2 TAIL 6.0 → biển kênh đứng yên ≥ 4 s, chỗ cho end screen YouTube (≥ 5 s).
//  câu 87  23 người que nhỏ thành hai hàng; "birthday" → bánh sinh nhật nhỏ + "?".
//  câu 88  "move two" → note 2 FLIP; "just over half" → "> 1/2".
//  câu 89  tờ thư 1654 trượt vào góc với dấu "?" ("one question open").
//  câu 90  đồng xu đặt trên vở + "50%": mũi tên tới đồng xu ("the coin") và tới mascot/người xem ("or you?").
//  câu 91  "right here" → khung nét đứt bên phải: "What does 50% actually mean?" (end screen trỏ fifty-percent — PACKAGING §7).
//  câu 92  biển "99% from scratch" + SUBSCRIBE (giấy note lớn dán xuống, ĐỨNG YÊN tới hết); mascot vẫy.
import { W, H, C, AR, MO, CO, clamp, prog, lookup, lerp, outCubic, paper, write, calc, big, hi, ring, arrow, note, letter, gambler, POSE, contact, hand, seg, rr, N, must } from '../kit.js';
import { mascot } from './g-common.js';

function coin50(g, cx, cy, r, k) {
  if (k <= 0) return; const s = 0.3 + 0.7 * clamp(k);
  g.save(); g.translate(cx, cy); g.scale(s, s); contact(g, 6, r * 0.9, r * 1.1, r * 0.25, 0.25);
  g.fillStyle = '#F2C94C'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 4; g.stroke();
  g.beginPath(); g.arc(0, 0, r * 0.75, 0, 7); g.lineWidth = 2; g.stroke(); g.restore();
}
function board(g, k, pulse) {
  if (k <= 0) return;
  const x = 150, y = 300, w = 820, h = 420, dy = (1 - outCubic(clamp(k))) * -700;
  g.save(); g.translate(0, dy);
  contact(g, x + w / 2 + 10, y + h + 10, w * 0.55, 30, 0.25);
  g.fillStyle = C.note[0]; g.fillRect(x, y, w, h); g.fillStyle = 'rgba(0,0,0,0.05)'; g.fillRect(x, y, w, 26);
  g.fillStyle = C.tape; g.save(); g.translate(x + w / 2, y); g.rotate(-0.04); g.fillRect(-110, -24, 220, 48); g.restore();
  write(g, '99% from scratch', x + w / 2, y + 190, 1, { font: `800 96px ${AR}`, color: C.ink, align: 'center' });
  const s = 1 + 0.07 * Math.sin(Math.PI * clamp(pulse));
  g.save(); g.translate(x + w / 2, y + 310); g.scale(s, s); g.fillStyle = C.lose; g.fill(rr(-190, -44, 380, 88, 44));
  write(g, 'SUBSCRIBE', 0, 16, 1, { font: `800 46px ${AR}`, color: '#FFFFFF', align: 'center' }); g.restore();
  g.restore();
}

export default class Next {
  static ERA = 'paper';
  static IMAGES = {};
  static POSES = ['pointer', 'wave'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b16');
    const S = i => L(i).start, E = i => L(i).end;
    this.T = {
      l87: S(87), room87: w(87, 'room'), twenty87: w(87, 'twenty-three'), birthday87: w(87, 'birthday'), e87: E(87),
      move88: w(88, 'move'), half88: w(88, 'half'), e88: E(88),
      l89: S(89), question89: w(89, 'question'), stranger89: w(89, 'stranger'), e89: E(89),
      coin90: w(90, 'coin'), fifty90: w(90, 'fifty'), coin90b: w(90, 'coin', 2), you90: w(90, 'you'), e90: E(90),
      next91: w(91, 'next'), here91: w(91, 'here'), e91: E(91),
      thanks92: w(92, 'thanks'), see92: w(92, 'see'), e92: E(92),
    };
    this.START = S(87);
    this.FROM = S(87) - 0.5;
    must(`${N.bday} > 50`, true);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.room87, 'pop'), c(T.birthday87, 'question'), c(T.move88, 'pop'), c(T.half88, 'pen'), c(T.l89, 'page'), c(T.coin90, 'coin'), c(T.you90, 'pop'), c(T.here91, 'whoosh'), c(T.thanks92 + 0.3, 'card')];
  }
  render(g, t) {
    const T = this.T;
    paper(g);
    // câu 87–88: phòng 23 người
    const a = 1 - prog(t, T.l89 - 0.3, T.l89 + 0.3);
    if (a > 0) { g.save(); g.globalAlpha = a;
      write(g, 'try it yourself', 200, 170, prog(t, T.l87, T.room87), { font: `800 56px ${AR}`, color: C.ink });
      for (let i = 0; i < 23; i++) { const k = prog(t, lerp(T.room87, T.twenty87 + 0.5, i / 23), lerp(T.room87, T.twenty87 + 0.5, i / 23) + 0.25);
        if (k > 0) gambler(g, 240 + (i % 12) * 110 + (i >= 12 ? 55 : 0), 480 + (i >= 12 ? 230 : 0), 150, i % 3 ? POSE.stand : POSE.wave, { hat: false, dir: i % 2 ? 1 : -1, a: k }); }
      write(g, '23 people — two share a birthday?', 200, 860, prog(t, T.birthday87 - 0.6, T.e87), { font: `800 52px ${AR}`, color: C.ink });
      note(g, 1480, 140, 300, 230, prog(t, T.move88, T.move88 + 0.4), { col: C.note[1], rot: 0.04, num: 2, title: 'FLIP', body: ['count "no match"'] });
      write(g, '> 1/2', 1520, 520, prog(t, T.half88 - 0.2, T.half88 + 0.4), { font: `800 96px ${AR}`, color: C.win });
      g.restore(); }
    // câu 89–90: thư + đồng xu 50%
    const b = prog(t, T.l89 - 0.3, T.l89 + 0.3) * (1 - prog(t, T.thanks92 - 0.2, T.thanks92 + 0.3));
    if (b > 0) { g.save(); g.globalAlpha = b;
      const L_ = letter(g, 180, 160, 560, 300, prog(t, T.l89, T.question89), { rot: -0.03, from: 'left' });
      if (L_) { write(g, 'Pascal · Fermat', 40, 100, 1, { font: `700 44px ${CO}`, color: C.iron }); write(g, 'one question open', 40, 170, 1, { font: `italic 600 44px ${CO}`, color: C.iron2 });
        write(g, '?', 470, 230, prog(t, T.stranger89, T.stranger89 + 0.4), { font: `700 120px ${CO}`, color: C.wax, align: 'center' }); L_.done(); }
      coin50(g, 520, 720, 110, prog(t, T.coin90 - 0.2, T.coin90 + 0.3));
      write(g, '50%', 520, 750, prog(t, T.fifty90, T.fifty90 + 0.4), { font: `800 72px ${AR}`, color: C.ink, align: 'center' });
      write(g, 'the coin?', 200, 960, prog(t, T.coin90b - 0.2, T.coin90b + 0.3), { font: `800 50px ${AR}`, color: C.ink });
      arrow(g, 320, 910, 440, 790, prog(t, T.coin90b, T.coin90b + 0.4), { w: 5 });
      write(g, 'or you?', 700, 960, prog(t, T.you90 - 0.1, T.you90 + 0.3), { font: `800 50px ${AR}`, color: C.lose });
      // câu 91: khung end screen
      const kf = prog(t, T.next91 - 0.2, T.here91 + 0.4);
      if (kf > 0) { g.save(); g.setLineDash([18, 14]); g.strokeStyle = C.ink2; g.lineWidth = 5; g.strokeRect(1060, 300, 700 * kf, 394); g.restore();
        write(g, 'What does 50%', 1410, 470, prog(t, T.here91, T.here91 + 0.5), { font: `800 60px ${AR}`, color: C.ink, align: 'center' });
        write(g, 'actually mean?', 1410, 550, prog(t, T.here91 + 0.2, T.here91 + 0.7), { font: `800 60px ${AR}`, color: C.ink, align: 'center' });
        arrow(g, 900, 780, 1050, 620, prog(t, T.here91, T.here91 + 0.5), { w: 6, color: C.lose }); }
      g.restore(); }
    // câu 92: biển kênh (trái) — khung end screen (phải) vẫn giữ
    const kb = prog(t, T.thanks92 + 0.2, T.thanks92 + 0.9);
    if (kb > 0) { board(g, kb, prog(t, T.see92, T.see92 + 0.5));
      g.save(); g.setLineDash([18, 14]); g.strokeStyle = C.ink2; g.lineWidth = 5; g.strokeRect(1060, 300, 700, 394); g.restore();
      write(g, 'What does 50%', 1410, 470, 1, { font: `800 60px ${AR}`, color: C.ink, align: 'center' }); write(g, 'actually mean?', 1410, 550, 1, { font: `800 60px ${AR}`, color: C.ink, align: 'center' }); }
    mascot(g, t, t >= T.thanks92 ? 'wave' : 'pointer', -1, { x: 1780 });
  }
}
