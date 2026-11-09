// f2 · Next time (câu 107–114, cuối trang p2). Hai vùng trên một tấm thảm, camera đi xuống ở câu cảm ơn:
//   0 trục số in thảm: viên +3 quay nửa vòng thành −3 = × (−1); viên +2 quay một phần tư → ĐỨNG DỌC trên 0, rời khỏi trục
//     (viên "?"), quay thêm một phần tư thành −2: "? × ? = −1" — dấu ? lớn, KHÔNG viết chữ i (chỉ gieo tò mò).
//   1 cảm ơn · giấy nhớ mời bình luận · biển "99% from scratch" + SUBSCRIBE: vẽ xong TRƯỚC câu "And subscribe…" rồi đứng
//     YÊN tới hết (toạ độ màn hình, không trôi) · `invite`.
import { W, H, C, ARC, CG, MONO, PI, clamp, smooth, prog, outCubic, ground, card, typed, label, quote, eq, tile,
  footprint, numberLine, stickyNote, line, arrowHead, ring, stamp, figure, num, par, lookup, must, typeCues } from '../kit.js';

const ZONE = 1080, AX = 960, AY = 700;              // gốc 0 của trục số (vùng 0)

export default class Next {
  static ERA = 'mat';
  static IMAGES = {};
  static POSES = ['invite'];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f2');
    this.T = {
      here: w(107, 'here'), something: w(107, 'something'), about: w(107, 'about'),
      multiplying: w(108, 'multiplying'), one: w(108, 'one'), turns: w(108, 'turns'), around: w(108, 'around'),
      hundred: w(108, 'hundred'), degrees: w(108, 'degrees'),
      what: w(109, 'what'), multiply: w(109, 'multiply'), by: w(109, 'by'), halfway: w(109, 'halfway'), ninety: w(109, 'ninety'),
      degrees2: w(109, 'degrees'),
      twice: w(110, 'twice'), and: w(110, 'and'), turned: w(110, 'turned'), around2: w(110, 'around'), number: w(110, 'number'),
      itself: w(110, 'itself'), be: w(110, 'be'), minus: w(110, 'minus'), one2: w(110, 'one'),
      ordinary: w(111, 'ordinary'), number3: w(111, 'number'), mathematicians: w(111, 'mathematicians'), accept: w(111, 'accept'),
      story: w(111, 'story'), video: w(111, 'video'),
      thank: w(112, 'thank'), watching: w(112, 'watching'), end: w(112, 'end'),
      if: w(113, 'if'), rule: w(113, 'rule'), accept2: w(113, 'accept'), tell: w(113, 'tell'), comments: w(113, 'comments'),
      might: w(113, 'might'), video2: w(113, 'video'),
      and3: w(114, 'and'), subscribe: w(114, 'subscribe'), nn: w(114, 'ninety-nine'), scratch: w(114, 'scratch'),
    };
    this.START = L(107).start; this.FROM = this.START - 0.6;                  // f1 giữ "= 6"
    this.PAN = L(112).start - 0.6;
    // hai số trên trục: +3 quay nửa vòng, +2 quay hai lần một phần tư; số đối = × (−1)
    this.V = { a: must('3', 3), na: must('3 × (−1)', -3), b: must('2', 2), nb: must('2 × (−1)', -2), m: must('−1', -1) };
  }
  sfx() {
    const T = this.T;
    return [
      { t: T.around + 0.5, kind: 'tick' },             // nửa vòng xong: −3
      { t: T.degrees2, kind: 'question' },             // "ninety degrees?"
      { t: T.around2 + 0.25, kind: 'tick' },           // hai phần tư = nửa vòng: −2
      { t: T.one2, kind: 'tick' },                     // "? × ? = −1"
      ...typeCues('99% from scratch', T.thank + 0.3, T.end + 0.4),
      { t: T.if - 0.1, kind: 'snap' },                 // giấy nhớ mời bình luận
      { t: T.video2, kind: 'shimmer' },                // SUBSCRIBE đóng dấu — biển trọn vẹn trước câu cuối
    ];
  }
  camY(t) { return ZONE * smooth(prog(t, this.PAN, this.PAN + 1.0)); }
  render(g, t) {
    const T = this.T, cy = this.camY(t);
    ground(g, 'mat', 0, cy);
    g.save(); g.translate(0, -cy);
    if (cy < ZONE * 0.99) this.zone0(g, t);
    if (cy > ZONE * 0.01) this.zone1(g, t, ZONE);
    g.restore();
    // toạ độ MÀN HÌNH: thẻ mục (viết ngược ra trước khi camera xuống), nhân vật
    card(g, prog(t, this.FROM + 0.3, this.FROM + 1.7) - prog(t, this.PAN - 0.6, this.PAN), 'ACT V', 'NEXT TIME');
    figure(g, 'invite', 1620, H, 760, prog(t, T.tell - 0.4, T.tell));
  }
  // ── vùng 0: trục số ──
  zone0(g, t) {
    const T = this.T, V = this.V;
    quote(g, 'Something to think about.', 140, 262, prog(t, T.here, T.about + 0.3), { size: 54 });
    const X = numberLine(g, AX - 500, AX + 500, AY, -4, 4, prog(t, this.FROM + 0.3, this.FROM + 0.9));
    const s = 56, U = X(1) - X(0);
    // A: +3 quay nửa vòng (× (−1)) → −3; vệt cung viền đứt
    const RA = U * V.a, thA = PI * smooth(prog(t, T.turns - 0.1, T.around + 0.5));
    if (thA > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 2.4; g.setLineDash([10, 9]);
      g.beginPath(); g.arc(AX, AY, RA, 0, -thA, true); g.stroke(); g.restore();
      if (thA >= PI) arrowHead(g, AX - RA, AY - 4, PI / 2, C.ink, 16);
    }
    label(g, '180°', AX, AY - RA - 26, prog(t, T.hundred - 0.1, T.degrees + 0.3), { color: C.ink, size: 22, align: 'center' });
    this.rider(g, AX + RA * Math.cos(thA), AY - RA * Math.sin(thA), s, thA, prog(t, T.something, T.something + 0.35), false);
    // B: +2 quay một phần tư (đứng dọc trên 0, rời trục = viên "?"), rồi thêm một phần tư → −2
    const RB = U * V.b, thB = PI / 2 * smooth(prog(t, T.halfway - 0.1, T.ninety + 0.4)) + PI / 2 * smooth(prog(t, T.twice + 0.1, T.around2));
    line(g, [[AX, AY], [AX, AY - RB - 70]], C.dim, 2, { dash: [6, 8], k: prog(t, T.ninety - 0.2, T.ninety + 0.4) });
    if (thB > 0) {
      g.save(); g.strokeStyle = C.ink; g.lineWidth = 3.5; g.lineCap = 'round';
      g.beginPath(); g.arc(AX, AY, RB, 0, -thB, true); g.stroke(); g.restore();
    }
    label(g, '90°', AX + RB * 0.707 + 26, AY - RB * 0.707 - 18, prog(t, T.ninety, T.degrees2 + 0.2), { color: C.ink, size: 22 });
    label(g, '90°', AX - RB * 0.707 - 26, AY - RB * 0.707 - 18, prog(t, T.twice, T.twice + 0.5), { color: C.ink, size: 22, align: 'right' });
    // chỗ viên "?" vừa đứng: dấu chân "?" (không có số nào trên trục ở đó)
    const kf = prog(t, T.twice + 0.4, T.twice + 0.8);
    footprint(g, AX - s / 2, AY - RB - s / 2, s, kf, { color: C.dim, zero: false });
    if (kf > 0.5) typed(g, '?', AX, AY - RB + 12, 1, `600 34px ${ARC}`, C.ink, { align: 'center' });
    ring(g, AX, AY - RB, 66, 60, prog(t, T.ordinary - 0.1, T.number3 + 0.3), { color: C.ink, w: 3 });
    label(g, 'not on the line', AX, AY - RB - 86, prog(t, T.number3, T.number3 + 0.6), { color: C.ink, size: 18, align: 'center' });
    this.rider(g, AX + RB * Math.cos(thB), AY - RB * Math.sin(thB), s, thB, prog(t, T.multiply, T.multiply + 0.35), true);
    // cột phải: hai phép quay
    eq(g, [['× '], [par(V.m), C.negT]], 1520, 404, 56, prog(t, T.multiplying, T.one + 0.2));
    label(g, 'half turn · 180°', 1520, 450, prog(t, T.hundred - 0.2, T.degrees + 0.3), { size: 20 });
    eq(g, [['× ?']], 1520, 566, 56, prog(t, T.what, T.by + 0.2));
    label(g, 'quarter turn · 90°', 1520, 612, prog(t, T.ninety - 0.2, T.degrees2 + 0.3), { size: 20 });
    // dưới trục: hai phần tư = nửa vòng; ? × ? = −1 (dấu ? lớn, không gọi tên)
    label(g, 'two quarter turns = a half turn', AX, 836, prog(t, T.turned - 0.1, T.around2 + 0.5), { color: C.ink, size: 20, align: 'center' });
    eq(g, [['? × ? = '], [num(V.m), C.negT]], AX, 952, 84,
      0.6 * prog(t, T.number - 0.1, T.itself + 0.3) + 0.4 * prog(t, T.be, T.one2 + 0.2), { align: 'center' });
    // phải trên: lời kết của phần toán
    quote(g, 'Mathematicians took a long time to accept it —', 1140, 232, prog(t, T.mathematicians - 0.1, T.accept + 0.4), { size: 40 });
    quote(g, 'a story for another video.', 1140, 290, prog(t, T.story - 0.2, T.video + 0.4), { size: 40 });
  }
  /** Viên chạy trên cung: góc th (0 = nằm trên chiều dương). q = viên "?" khi đứng ngoài trục; đỏ khi về chiều âm. */
  rider(g, cx, cy, s, th, k, q) {
    if (k <= 0) return;
    const kind = th < (q ? 0.25 : PI / 2) ? 'p' : 'n';
    if (q && th >= 0.25 && th <= PI - 0.25) return qTile(g, cx - s / 2, cy - s / 2, s, 0);
    tile(g, cx - s / 2, cy - s / 2, s, kind, { k, rot: -th });
  }
  // ── vùng 1: cảm ơn, mời bình luận, biển kênh ──
  zone1(g, t, Y) {
    const T = this.T;
    quote(g, 'Thank you for watching all the way to the end.', 140, Y + 180, prog(t, T.thank - 0.1, T.end + 0.3), { size: 54 });
    const inNote = stickyNote(g, 140, Y + 262, 640, 200, prog(t, T.if - 0.4, T.if), { rot: -0.025 });
    inNote(() => {
      typed(g, 'TELL ME IN THE COMMENTS', 34, 58, prog(t, T.tell - 0.1, T.comments + 0.4), `500 22px ${MONO}`, C.noteDim, { ls: 2 });
      typed(g, 'A RULE YOU WERE TOLD', 34, 118, prog(t, T.rule - 0.1, T.accept2 - 0.4), `800 38px ${ARC}`, C.noteInk, { ls: 1 });
      typed(g, 'TO JUST ACCEPT?', 34, 168, prog(t, T.accept2 - 0.5, T.accept2 + 0.4), `800 38px ${ARC}`, C.noteInk, { ls: 1 });
    });
    label(g, 'it might be the next video', 830, Y + 374, prog(t, T.might - 0.1, T.video2 + 0.2), { color: C.ink, size: 22 });
    this.board(g, t, Y);
  }
  board(g, t, Y) {                                     // biển KÊNH: vẽ xong ở "video" (113), đứng yên từ "And subscribe…"
    const T = this.T, x0 = 140, y0 = Y + 520, w = 1180, h = 400, kb = prog(t, T.thank - 0.1, T.thank + 0.7);
    if (kb <= 0) return;
    const R = (x, y, ww, hh) => [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]];
    g.save(); g.fillStyle = 'rgba(14,21,30,0.45)'; g.globalAlpha = clamp(kb * 3); g.fillRect(x0, y0, w, h); g.restore();
    line(g, R(x0, y0, w, h), C.ink, 2.6, { k: kb });
    line(g, R(x0 + 10, y0 + 10, w - 20, h - 20), C.dim, 1.2, { k: kb });
    label(g, 'channel', x0 + 36, y0 + 58, prog(t, T.thank + 0.2, T.thank + 0.6), { size: 18 });
    typed(g, '99% from scratch', x0 + w / 2, y0 + 250, prog(t, T.thank + 0.3, T.end + 0.4), `italic 600 120px ${CG}`, C.ink, { align: 'center' });
    const ku = prog(t, T.and3, T.subscribe + 0.4);
    line(g, [[x0 + 210, y0 + 286], [x0 + w - 210, y0 + 286]], C.ink, 3, { k: ku });
    stamp(g, 'SUBSCRIBE', x0 + w - 240, y0 + 336, prog(t, T.video2 - 0.25, T.video2 + 0.1), { size: 44, color: C.ink, rot: -0.05 });
  }
}

/** Viên "?" — không dương không âm (đứng ngoài trục): mặt ngà, viền tối, dấu ? dập chìm. */
function qTile(g, x, y, s, rot) {
  const d = Math.max(3, s * 0.1), r = s * 0.12;
  g.save(); g.translate(x + s / 2, y + s / 2); g.rotate(rot); g.translate(-s / 2, -s / 2);
  g.save(); g.shadowColor = 'rgba(5,10,18,0.55)'; g.shadowBlur = s * 0.28; g.shadowOffsetX = s * 0.08; g.shadowOffsetY = s * 0.14;
  g.fillStyle = '#B9B19C'; g.beginPath(); g.roundRect(d * 0.6, d, s, s, r); g.fill(); g.restore();
  g.fillStyle = C.ink; g.beginPath(); g.roundRect(0, 0, s, s, r); g.fill();
  g.font = `800 ${s * 0.62}px ${ARC}`; g.textAlign = 'center'; g.fillStyle = C.noteInk; g.fillText('?', s / 2, s * 0.74);
  g.restore();
}
