// e1 · よく似た2台 (p2, câu 87–97) — mở ACT 4, ERA 'casino' (vào bằng loang từ máy slot: WIPE).
//  ① FROM…START  máy slot sơn mài trồi lên (WIPE = tâm máy), kéo cần; thẻ hồi 「第四幕 スロットの隣に置くと」 trượt qua
//  ② câu 87      điện thoại ガチャ vào cạnh máy slot — vẽ LẠI ĐÚNG như a0-open (cùng hàm, cùng tham số, chỉ dời cả cặp bằng translate)
//  ③ câu 88–91   ba điểm giống (ばらばらの報酬 / 光と音 / 数秒間の演出) — mỗi điểm một lượt quay: trượt → trúng (ánh vàng chung) → suýt; 「＝」
//  ④ câu 92      khác 1: 当たってもお金にならない — đồng xu ¥ bên điện thoại bị gạch xám
//  ⑤ câu 93–95   khác 2: 年齢 — ảnh casino + pachinko (thẻ acrylic), thẻ cửa hàng 13歳以上 / 16歳以上
//  ⑥ câu 96–97   ảnh 国民生活センター + 2022年度 / 4,024件 / 33万円
import { W, H, C, MIN, JP, TAU, ACTS, clamp, prog, lookup, must, outCubic, outBack, smooth, ground, phone, slot, slotStop, telop, write, stamp, strike,
  capsule, photoTag, photoImages, glint, actCard, actCue, actTimes, comma, rr } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const shade = (g, fn, blur = 26, oy = 10) => { g.save(); g.shadowColor = 'rgba(0,0,0,0.35)'; g.shadowBlur = blur; g.shadowOffsetY = oy; fn(); g.restore(); };
const bump = (t, a) => t < a ? 0 : t < a + 0.08 ? (t - a) / 0.08 : clamp(1 - (t - a - 0.08) / 0.22);   // như a0-open
const DX = 290;                                                       // dời cả cặp (a0: phone 440,124 · slot 860,130) — KHÔNG đổi s
const ST7 = slotStop('seven'), STB = slotStop('bar'), STC = slotStop('cher'), STL = slotStop('bell');

/** Ánh vàng chung — y hệt a0-open goldLight. */
function goldLight(g, a) {
  if (a <= 0) return;
  for (const [x, y, r] of [[440, 444, 300], [1140, 440, 360]]) {
    const gr = g.createRadialGradient(x, y, 20, x, y, r); gr.addColorStop(0, `rgba(255,222,120,${0.5 * a})`); gr.addColorStop(1, 'rgba(255,222,120,0)');
    g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
}
function headingDark(g, title, k) {                                   // biển mục trên nền casino (kit.heading chỉ có nền sáng)
  if (k <= 0) return;
  capsule(g, 122, 130, 24, clamp(k * 2), { tone: 'pink', ground: false });
  write(g, title, 162, 150, clamp(k * 1.6 - 0.3), { font: `700 60px ${MIN}`, ls: 2, on: 'dark' });
}
function coinYen(g, x, y, r) {                                        // đồng xu trung tính (kem), chữ 円
  g.save(); const gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 4, x, y, r); gr.addColorStop(0, '#FFF3D6'); gr.addColorStop(1, '#C9A867'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(90,60,20,0.5)'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r - 8, 0, TAU); g.stroke();
  write(g, '円', x, y + 22, 1, { font: `700 64px ${MIN}`, color: '#5A3A10', align: 'center' }); g.restore();
}

export default class Nidai {
  static ERA = 'casino';
  static IMAGES = photoImages('casino', 'pachinko', 'kokusen');
  static POSES = [];
  WIPE = [860 + DX + 280, 130 + 385];                                 // tâm máy slot: vòng loang vào casino bắt đầu từ đây
  init({ tl }) {
    const { L, w } = lookup(tl, 'e1');
    this.START = L(87).start;
    this.FROM = Math.max(this.START - 2.6, L(86).end + 0.5);
    this.T = {
      l87: L(87).start, slot87: w(87, 'スロット'), tonari: w(87, '隣'), oku: w(87, '置いて'),
      l88: L(88).start, baraba: w(88, 'ばらばら'), l89: L(89).start, hikari: w(89, '光'), oiwai: w(89, 'お祝い'), l90: L(90).start, suubyou: w(90, '数秒'), enshutsu: w(90, '演出'),
      l91: L(91).start, yoku: w(91, 'よく'), imasu: w(91, '似て'),
      l92: L(92).start, chigai: w(92, '違い'), okane: w(92, 'お金'), naranai: w(92, 'ならない'), l93: L(93).start, nenrei93: w(93, '年齢'),
      l94: L(94).start, casino: w(94, 'カジノ'), nenrei94: w(94, '年齢'), seigen: w(94, '制限'),
      l95: L(95).start, kono: w(95, 'この'), app: w(95, 'app store'), s13: w(95, '13歳'), gp: w(95, 'google play'), s16: w(95, '16歳'), e95: L(95).end,
      l96: L(96).start, kokumin: w(96, '国民'), y2022: w(96, '2022年度'), shou: w(96, '小学生'), n4024: w(96, '4024件'),
      l97: L(97).start, harai: w(97, '支払った'), n33: w(97, '33万円'), end: L(97).end,
    };
    const T = this.T;
    // các lượt quay: [bấm/kéo, dừng, kết quả]
    this.SPINS = [[this.FROM + 0.15, this.FROM + 1.4, 'gold'], [T.l88 - 0.05, T.l88 + 0.85, 'miss'], [T.l89 - 0.1, T.l89 + 0.9, 'gold'], [T.l90 - 0.05, T.l90 + 0.9, 'near']];
    this.EXIT1 = T.l94 - 0.3;                                         // cặp máy rời (rơi xuống)
    this.EXIT2 = T.l96 - 0.3;                                         // ảnh casino/pachinko rời
    this.N4024 = must('4024', 4024); this.N33 = must('33', 33);
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [actCue(this.FROM, this.START), c(T.oku - 0.4, 'pop'), c(T.l88 - 0.05, 'reel'), c(T.l88 + 0.25, 'gacha'), c(T.l89 - 0.1, 'gacha'), c(T.l89 + 0.9, 'shimmer'), c(T.l90 - 0.05, 'reel'),
      c(T.yoku, 'pop'), c(T.chigai, 'pen'), c(T.naranai, 'buzzer'), c(T.casino - 0.1, 'card'), c(T.seigen + 0.6, 'card'), c(T.app, 'pen'), c(T.gp, 'pen'), c(T.l96 + 0.1, 'card'),
      c(T.shou, 'pen'), c(T.s16 + 1.8, 'tick'), c(T.n4024, 'pen'), c(T.harai, 'pen'), c(T.n33, 'soroban')];
  }
  spin(t) {
    let cur = null; for (const s of this.SPINS) if (t >= s[0]) cur = s;
    if (!cur) return { r: 1, press: 0, lever: 0, out: 'idle', flash: 0 };
    const [a, land, res] = cur, r = t < land ? 1 - outCubic(prog(t, a, land)) : 0;
    const flash = this.SPINS.reduce((m, [, l, rs]) => rs === 'gold' && t >= l ? Math.max(m, Math.exp(-(t - l) * 2.2)) : m, 0);
    return { r, press: bump(t, a), lever: t < land ? 1 - prog(t, a + 0.25, land) : 0, out: t < land ? 'spin' : res, res, flash };
  }
  pair(g, t) {
    const T = this.T, F = this.FROM, sp = this.spin(t);
    const ks = prog(t, F + 0.3, F + 1.0), kp = prog(t, T.oku - 0.35, T.oku + 0.4), r = sp.r;
    const tgt = sp.res === 'miss' ? [STB, STC, STL] : sp.res === 'near' ? [ST7, ST7, STB] : [ST7, ST7, ST7];
    const gold = sp.out === 'gold', pState = sp.out === 'spin' ? 'spin' : sp.out === 'gold' ? 'gold' : sp.out === 'idle' ? 'idle' : 'miss';
    g.save(); g.translate(DX, 0);
    goldLight(g, (gold ? 0.45 : 0) * (kp > 0 ? 1 : 0.0) + 0.6 * sp.flash * (kp > 0 ? 1 : 0.5));
    if (kp > 0) phone(g, 440, 124, kp, { state: pState, press: sp.press, t });
    slot(g, 860, 130, ks, { reels: [tgt[0] + r * 8, tgt[1] + r * 10, tgt[2] + r * 13], blur: [r * 1.5, r * 1.8, r * 2.1].map(v => Math.min(1, v)), lever: sp.lever, lit: r === 0 && sp.res === 'gold' });
    if (sp.flash > 0.05) { if (kp > 0) glint(g, 330, 300, 40 * sp.flash, sp.flash); glint(g, 1360, 300, 48 * sp.flash, sp.flash); }
    g.restore();
    telop(g, 'スマホのガチャ', 440 + DX, 98, prog(t, T.oku - 0.2, T.oku + 0.4), { size: 34, font: `700 34px ${JP}` });
    telop(g, 'カジノのスロット', 1140 + DX, 98, prog(t, F + 0.5, F + 0.9), { size: 34, font: `700 34px ${JP}` });
    // ba điểm giống
    [[T.baraba - 0.1, 'ばらばらの報酬', 420], [T.hikari - 0.1, '光と音のお祝い', 900], [T.suubyou - 0.1, '数秒間の演出', 1380]].forEach(([a, s, x], i) => {
      if (t < T.chigai - 0.1) telop(g, s, x, 975, prog(t, a, a + 0.7), { size: 40 });
    });
    const kq = prog(t, T.yoku - 0.1, T.imasu + 0.4);
    if (kq > 0 && t < T.l93 + 0.3) write(g, '＝', 1035, 540, kq, { font: `700 110px ${MIN}`, align: 'center', on: 'dark' });
    // khác 1: đồng xu ¥ bên điện thoại bị gạch
    if (t > T.chigai - 0.2) {
      const kc = prog(t, T.chigai - 0.1, T.chigai + 0.5);
      if (kc > 0.05) coinYen(g, 330, 560, 76 * outCubic(kc));
      strike(g, 250, 640, 410, 480, prog(t, T.naranai, T.naranai + 0.5), { w: 10, on: 'dark' });
      telop(g, '当たっても、お金にならない', 730, 975, prog(t, T.okane - 0.4, T.naranai + 0.5), { size: 44 });
    }
    if (t > T.l93 - 0.1) telop(g, 'もう1つは、年齢', 1380, 975, prog(t, T.l93, T.nenrei93 + 0.6), { size: 44 });
  }
  render(g, t) {
    const T = this.T, F = this.FROM;
    ground(g, t, { era: 'casino' });
    headingDark(g, 'よく似た2台', prog(t, this.START + 1.0, this.START + 2.0));
    // cặp máy (rời bằng cách rơi xuống ở câu 94)
    const d1 = out(t, this.EXIT1, 0.6);
    if (d1 < 1) { g.save(); g.translate(0, 1150 * d1); this.pair(g, t); g.restore(); }
    actCard(g, t, F, this.START, 4);
    // câu 94–95: ảnh casino + pachinko + thẻ cửa hàng
    const d2 = out(t, this.EXIT2, 0.6);
    if (t > T.l94 - 0.3 && d2 < 1) {
      g.save(); g.translate(0, 1150 * d2);
      photoTag(g, 'casino', 130, 340, 600, 380, prog(t, T.casino - 0.15, T.casino + 0.6), { zoom: 1 + 0.07 * prog(t, T.casino, T.e95), rot: -0.03 });
      photoTag(g, 'pachinko', 820, 340, 600, 380, prog(t, T.seigen + 0.4, T.seigen + 1.1), { zoom: 1 + 0.06 * prog(t, T.seigen + 0.5, T.e95), rot: 0.025 });
      telop(g, '年齢の制限', 770, 235, prog(t, T.nenrei94 - 0.1, T.seigen + 0.6), { size: 52 });
      telop(g, 'このゲームは', 1660, 330, prog(t, T.kono - 0.1, T.kono + 0.5), { size: 36 });
      [['App Store', 400, T.app, T.s13, '13歳以上'], ['Google Play', 610, T.gp, T.s16, '16歳以上']].forEach(([nm, y, ta, tb, big]) => {
        const k = prog(t, ta - 0.1, ta + 0.5); if (k <= 0) return; const e = outBack(k);
        g.save(); g.translate((1 - e) * 400, 0);
        shade(g, () => { g.fillStyle = C.white; g.fill(rr(1500, y, 320, 170, 28)); }, 24, 10);
        write(g, nm, 1530, y + 50, 1, { font: `600 30px ${JP}`, color: '@dim' });
        write(g, big, 1530, y + 130, prog(t, tb - 0.1, tb + 0.5), { font: `700 60px ${MIN}` });
        g.restore();
      });
      g.restore();
    }
    // câu 96–97: ảnh 国民生活センター + số liệu
    if (t > T.l96 - 0.3) {
      photoTag(g, 'kokusen', 130, 300, 840, 520, prog(t, T.kokumin - 0.3, T.kokumin + 0.5), { zoom: 1 + 0.08 * prog(t, T.kokumin, T.end), focus: [0.5, 0], rot: -0.025 });
      telop(g, '2022年度', 1370, 300, prog(t, T.y2022 - 0.1, T.y2022 + 0.6), { size: 48 });
      write(g, '小学生〜高校生の相談', 1370, 410, prog(t, T.shou - 0.1, T.shou + 0.7), { font: `700 40px ${MIN}`, align: 'center', on: 'dark' });
      write(g, [[comma(this.N4024), `700 130px ${MIN}`], ['件', `700 56px ${MIN}`]], 1370, 580, prog(t, T.n4024 - 0.1, T.n4024 + 0.6), { align: 'center', on: 'dark' });
      write(g, '平均およそ', 1370, 700, prog(t, T.harai - 0.1, T.harai + 0.6), { font: `700 40px ${MIN}`, color: '@dim', align: 'center', on: 'dark' });
      write(g, [[String(this.N33), `700 130px ${MIN}`], ['万円', `700 64px ${MIN}`]], 1370, 830, prog(t, T.n33 - 0.1, T.n33 + 0.6), { align: 'center', on: 'dark' });
    }
  }
}
