// h3 — "The one place it isn't settled" (p2 câu 123–127). Một khung, camera đẩy vào rồi lùi ra:
//   trái dưới   đèn bão của NGƯỜI XEM (như a0)
//   phải        một bức sương đặc nhỏ, trong đó MỘT hạt; chùm đèn chiếu vào mà sương KHÔNG tan — chỗ duy nhất (DNA §1)
//   phải trên   Bell's theorem · Nobel Prize in Physics 2022 · ruled out: hidden information (toạ độ màn hình)
//   giữa        "tờ ghi chú ẩn" rời khỏi hạt, viết sẵn "H" → bị gạch (ý đã bị bác bỏ — đỏ đúng nghĩa), chìm vào sương
//   câu 127     camera lùi; một đồng xu trong sương giữa khung, chùm đèn quay về xu → sương quanh xu tan, mặt H sáng;
//               "the uncertainty lives in us" viết cạnh đèn của người xem
import { W, H, clamp, prog, smooth, outCubic, outBack, C, CG, MONO, sky, glow, lantern, beam, fogBank, coin, typed, text, label,
  cross, card, must, lookup } from '../kit.js';

const LX = 250, LY = 900, PX = 1400, PY = 560, CX = 900, CY = 800;


// nền tối mềm sau nhãn nằm trên sương (tương phản ≥ 4.5:1 đo ở khung thật); k = tiến độ viết của nhãn
function backing(g, s, x, y, px, align, k) {
  s = s.slice(0, Math.round(s.length * clamp(k))); if (!s) return;                 // bám phần chữ đã viết
  g.save(); g.font = `500 ${px}px ${MONO}`; const w = g.measureText(s).width * 1.02, x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.fillStyle = 'rgba(7,11,20,0.62)'; g.shadowColor = 'rgba(7,11,20,0.62)'; g.shadowBlur = 22;
  g.beginPath(); g.roundRect(x0 - 16, y - px - 8, w + 32, px + 22, 12); g.fill(); g.restore();
}
export default class Quantum {
  static ERA = 'night';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'h3');
    this.T = {
      one: w(123, 'one'), not: w(123, 'not'), settled: w(123, 'settled'),
      down: w(124, 'down'), single: w(124, 'single'), particles: w(124, 'particles'), quantum: w(124, 'quantum'), behaves: w(124, 'behaves'),
      differently: w(124, 'differently'),
      bells: w(125, "bell's"), nobel: w(125, 'nobel'), tt: w(125, 'twenty-two'), ruled: w(125, 'ruled'), idea: w(125, 'idea'),
      written: w(125, 'written'), advance: w(125, 'advance'), hidden: w(125, 'hidden'), carry: w(125, 'carry'), end125: L(125).end,
      true: w(126, 'true'), something: w(126, 'something'), still: w(126, 'still'), debating: w(126, 'debating'),
      but: w(127, 'but'), coin: w(127, 'coin'), electron: w(127, 'electron'), forc: w(127, 'coin', 2), uncertainty: w(127, 'uncertainty'),
      us: w(127, 'us'), end: L(127).end,
    };
    this.YEAR = must('2022', 2022);                                          // CONTENT: Nobel Vật lý 2022 (Aspect, Clauser, Zeilinger)
    this.START = L(123).start;
    this.FROM = this.START - 1.2;
  }
  sfx() {
    const T = this.T;
    return [{ t: T.settled - 0.2, kind: 'question' }, { t: T.behaves, kind: 'tick' }, { t: T.bells, kind: 'pop' },
      { t: T.carry - 0.3, kind: 'snap' }, { t: T.debating, kind: 'question' }, { t: T.forc + 0.15, kind: 'shimmer' }];
  }
  out(t) { return 1 - prog(t, this.T.but, this.T.but + 0.6); }   // chữ phía hạt tự xoá (viết ngược) khi chuyển về đồng xu
  render(g, t) {
    const T = this.T;
    sky(g, t, { fog: 1 });
    const push = 1 + 0.1 * smooth(prog(t, T.down - 0.2, T.particles + 0.4)) * (1 - smooth(prog(t, T.but, T.coin + 0.9)));
    g.save(); g.translate(PX, PY); g.scale(push, push); g.translate(-PX, -PY);
    // chùm đèn: tới hạt ở "behaves" → quay về đồng xu ở "for the coin"
    const toP = outCubic(prog(t, T.behaves - 0.2, T.behaves + 0.6)), swing = smooth(prog(t, T.forc - 0.3, T.forc + 0.5));
    const tx = PX + (CX - PX) * swing, ty = PY + (CY - PY) * swing;
    if (toP > 0) beam(g, LX, LY - 40, tx - 20, ty, 130, 460, 0.42, { reach: 0.25 + 0.75 * toP });
    // bức sương quanh hạt: dày lên khi bị chiếu — sương KHÔNG tan ở đây
    const kPatch = outCubic(prog(t, T.one - 0.3, T.one + 0.9));
    fogBank(g, PX, PY, 200, 170, t, { a: (1.2 + 0.35 * toP) * kPatch, seed: 91, n: 12, drift: 22 });
    // hạt: chấm sáng nhỏ rung (hash theo bước thời gian → tất định)
    const kp = prog(t, T.particles - 0.2, T.particles + 0.3);
    if (kp > 0) { const jx = Math.sin(t * 9.1) * 3 + Math.sin(t * 23.7) * 2, jy = Math.cos(t * 7.3) * 3;
      glow(g, PX + jx, PY + jy, 40, 'rgba(237,230,214,0.6)', kp); g.save(); g.globalAlpha = clamp(kp * 2); g.fillStyle = C.ivory;
      g.beginPath(); g.arc(PX + jx, PY + jy, 6 * outBack(kp), 0, 7); g.fill(); g.restore(); }
    fogBank(g, PX, PY, 120, 90, t, { a: 0.6 * toP * kPatch, seed: 97, n: 6 });               // lớp sương trước hạt, cũng không tan
    backing(g, 'A SINGLE PARTICLE', PX, PY + 120, 22, 'center', prog(t, T.single - 0.1, T.particles + 0.5) * this.out(t));
    typed(g, 'A SINGLE PARTICLE', PX, PY + 120, prog(t, T.single - 0.1, T.particles + 0.5) * this.out(t), `500 22px ${MONO}`, C.ivory, { align: 'center' });
    // "?" ở chỗ chưa ngã ngũ; nảy lại ở "still debating"
    const kq = outBack(prog(t, T.settled - 0.3, T.settled + 0.3)), bump = 1 + 0.25 * Math.sin(Math.PI * prog(t, T.debating - 0.1, T.debating + 0.4));
    if (kq > 0) { g.save(); g.translate(PX + 220, PY - 30); g.scale(kq * bump, kq * bump); text(g, '?', 0, 0, `italic 600 120px ${CG}`, C.ivory, 'center'); g.restore(); }
    backing(g, 'STILL DEBATED', PX + 220, PY + 30, 22, 'center', prog(t, T.debating, T.debating + 0.5));
    typed(g, 'STILL DEBATED', PX + 220, PY + 30, prog(t, T.debating, T.debating + 0.5), `500 22px ${MONO}`, C.ivory, { align: 'center' });
    backing(g, 'lit — and the fog stays', PX, PY + 200, 28, 'center', prog(t, T.differently - 0.1, T.differently + 0.8) * this.out(t));
    typed(g, 'lit — and the fog stays', PX, PY + 200, prog(t, T.differently - 0.1, T.differently + 0.8) * this.out(t), `italic 500 46px ${CG}`, C.ivory, { align: 'center' });
    // hai khả năng (câu 126)
    backing(g, 'true randomness?', PX - 40, PY - 150, 27, 'right', prog(t, T.true - 0.1, T.true + 0.6) * this.out(t));
    typed(g, 'true randomness?', PX - 40, PY - 150, prog(t, T.true - 0.1, T.true + 0.6) * this.out(t), `italic 600 44px ${CG}`, C.ivory, { align: 'right' });
    backing(g, 'or something stranger still?', PX, PY + 268, 27, 'center', prog(t, T.something - 0.1, T.still + 0.4) * this.out(t));
    typed(g, 'or something stranger still?', PX, PY + 268, prog(t, T.something - 0.1, T.still + 0.4) * this.out(t), `italic 600 44px ${CG}`, C.ivory, { align: 'center' });
    // tờ ghi chú ẩn: rời hạt ở "idea", viết "H" ở "written in advance", gạch ở cuối câu, chìm vào sương
    const kn = outCubic(prog(t, T.idea - 0.2, T.idea + 0.6)), sink = smooth(prog(t, T.end125 + 0.1, T.end125 + 0.8));
    if (kn > 0 && sink < 1) {
      const nx = PX + (-330) * kn, ny = PY - 40 * kn + sink * 420;
      g.save(); g.translate(nx, ny); g.rotate(-0.08 * kn); g.scale(1 - 0.5 * sink, 1 - 0.5 * sink);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-66, -46, 140, 104); g.fillStyle = '#D9D2C0'; g.fillRect(-72, -52, 140, 104);
      g.restore();
      g.save(); g.translate(nx, ny); g.rotate(-0.08 * kn); g.scale(1 - 0.5 * sink, 1 - 0.5 * sink);
      typed(g, 'H', -2, 30, prog(t, T.written - 0.1, T.advance + 0.3), `italic 600 96px ${CG}`, '#3A2E1C', { align: 'center' });
      cross(g, -2, 0, 56, prog(t, T.carry - 0.35, T.carry + 0.25), { color: C.red });
      g.restore();
      typed(g, 'HIDDEN NOTE', nx, ny - 76, prog(t, T.hidden - 0.1, T.hidden + 0.5) * (1 - sink * 3), `500 22px ${MONO}`, C.ivory, { align: 'center' });
    }
    // đồng xu (câu 127): trồi trong sương, chùm đèn quay về → sương tan, mặt H vàng
    const kc = outBack(prog(t, T.coin - 0.1, T.coin + 0.4));
    if (kc > 0) {
      fogBank(g, CX, CY - 20, 220, 150, t, { a: 1.3 * (1 - 0.85 * swing), seed: 103, n: 8 });
      if (swing > 0) glow(g, CX, CY, 120, 'rgba(255,216,102,0.5)', swing);
      coin(g, CX, CY, 46 * kc, { spin: 1.2 * (1 - swing), face: 'H', lit: 0.4 + 0.6 * swing });
      typed(g, 'A COIN', CX, CY + 86, prog(t, T.coin, T.electron + 0.3), `500 22px ${MONO}`, C.ivory, { align: 'center' });
    }
    lantern(g, LX, LY, 1.05, t, 1);
    g.restore();
    // khối Bell (toạ độ màn hình, phải trên)
    typed(g, "Bell's theorem", 1824, 150, prog(t, T.bells - 0.1, T.bells + 0.6), `italic 600 64px ${CG}`, C.ivory, { align: 'right' });
    typed(g, `NOBEL PRIZE IN PHYSICS ${this.YEAR}`, 1824, 200, prog(t, T.nobel - 0.1, T.tt + 0.4), `500 24px ${MONO}`, C.amber, { align: 'right' });
    typed(g, 'ruled out: hidden information', 1824, 262, prog(t, T.ruled - 0.1, T.hidden + 0.6), `italic 500 46px ${CG}`, C.ivory, { align: 'right' });
    typed(g, 'quantum mechanics', 96, 300, prog(t, T.quantum - 0.1, T.quantum + 0.6) * this.out(t), `italic 600 54px ${CG}`, C.ivory);
    typed(g, 'behaves very differently', 96, 362, prog(t, T.behaves - 0.1, T.differently + 0.4) * this.out(t), `italic 500 46px ${CG}`, C.ivory);
    // "the uncertainty lives in us" — cạnh đèn của người xem
    typed(g, 'The uncertainty', 96, 640, prog(t, T.uncertainty - 0.1, T.uncertainty + 0.6), `italic 600 54px ${CG}`, C.amber);
    typed(g, 'lives in us.', 96, 702, prog(t, T.us - 0.4, T.us + 0.3), `italic 600 54px ${CG}`, C.amber);
    card(g, 'night', prog(t, this.FROM + 0.9, this.FROM + 2.4), 'ACT SIX · INFORMATION', "Where the story isn't settled");
  }
}
