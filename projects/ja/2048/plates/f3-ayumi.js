// f3 · 研究の歩み (p2 câu 82–88). DNA f3 (盤上): 棋譜 dòng năm bên trái (chỉ chữ, không ảnh người) tích dần bốn dòng:
// 2014 ポーランド シュベルトとヤシュコフスキ · 日本 高知工科大学 松崎公紀 · 2016 台湾 段階ごとに別の頭脳 · 2021 学習＋探索.
// Bên phải là "sân" đổi theo dòng: quân 2048 + thanh 97% → chồng 棋譜 nghiên cứu → ván chia chặng, 1万回 ô nhỏ với MỘT ô
// vàng → quân 65536 → thanh 72% + quân 32768. Mọi số lấy từ CONTENT.md.
import { C, MIN, JP, clamp, prog, lookup, must, outCubic, smooth, ground, kifu, koma, telop, brush, arrow, write } from '../kit.js';

const out = (t, a, d = 0.6) => outCubic(clamp((t - a) / d));
const SX = 1000, SW = 824;                                              // sân phải: x 1000 … 1824
// vệt sáng lướt qua quân (ánh nắng, trung tính)
function glint(g, cx, cy, s, k) {
  if (k <= 0 || k >= 1) return;
  const x = cx - s + 2 * s * k;
  g.save(); g.globalCompositeOperation = 'screen'; g.beginPath(); g.rect(cx - s * 0.45, cy - s * 0.5, s * 0.9, s * 0.95); g.clip();
  const gr = g.createLinearGradient(x - s * 0.25, 0, x + s * 0.25, 0); gr.addColorStop(0, 'rgba(255,240,200,0)'); gr.addColorStop(0.5, 'rgba(255,240,200,0.55)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
  g.fillStyle = gr; g.fillRect(x - s * 0.25, cy - s * 0.6, s * 0.5, s * 1.2); g.restore();
}
// thanh phần trăm khắc trên gỗ: khung 0–100 %, phần đầy vàng; nhãn số bằng telop (明朝 số + % Noto)
function pct(g, x, y, w, p, k) {
  if (k <= 0) return;
  g.save(); g.fillStyle = 'rgba(8,5,2,0.5)'; g.fillRect(x + 6, y + 8, w, 44); g.fillStyle = '#3A2410'; g.fillRect(x, y, w, 44);
  g.fillStyle = C.gold; g.fillRect(x + 4, y + 4, (w - 8) * p / 100 * smooth(clamp(k)), 36);
  g.strokeStyle = 'rgba(243,222,156,0.6)'; g.lineWidth = 1.5; g.strokeRect(x + 0.75, y + 0.75, w - 1.5, 42.5);
  for (let i = 1; i < 10; i++) { g.fillStyle = 'rgba(23,17,12,0.45)'; g.fillRect(x + 4 + (w - 8) * i / 10, y + 30, 1.5, 10); }
  g.restore();
}
const NGRID = 100;                                                       // 100 × 100 = 1万回

export default class Ayumi {
  static ERA = 'banjo';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f3');
    this.T = {
      y14: w(82, '2014年'), pol: w(82, 'ポーランド'), ken: w(82, '研究者'), szu: w(82, 'シュベルト'), jas: w(82, 'ヤシュコフスキ'), houhou: w(82, '方法'),
      k2048: w(82, '2048'), manaba: w(82, '学ばせました'),
      l83: L(83).start, p97: w(83, '97%'), play83: w(83, 'プレイ'), r2048: w(83, '2048'), todoki: w(83, '届きました'),
      jp: w(84, '日本'), kochi: w(84, '高知'), matsu: w(84, '松崎公紀'), dai: w(84, '題材'), kenkyu: w(84, '研究'), kasane: w(84, '重ねて'),
      y16: w(85, '2016年'), tw: w(85, '台湾'), dankai: w(85, '段階'), wake: w(85, '分け'), goto: w(85, '段階ごと'), zuno: w(85, '頭脳'),
      man: w(86, '1万回'), tatta: w(86, 'たった'), ikkai: w(86, '1回'), k65: w(86, '65536'), umare: w(86, '生まれました'),
      chosha: w(87, '著者たち'), hajime: w(87, '初めて'), k65b: w(87, '65536'),
      y21: w(88, '2021年'), gaku: w(88, '学習'), tan: w(88, '探索'), p72: w(88, '72%'), k32: w(88, '32768'), todoi: w(88, '届いて'), end: L(88).end,
    };
    this.START = L(82).start;
    this.FROM = Math.max(this.START - 1.2, 529.58 + 0.5);              // kết f2 = 529.58
    // số trên hình — đúng CONTENT.md
    must('97', 97); must('72', 72); must('2 ^ 11', 2048); must('2 ^ 16', 65536); must('2 ^ 15', 32768);
    must(`${NGRID} * ${NGRID}`, 10000);
    this.ONE = [37, 62];                                                  // ô của ván ra 65536 (vị trí chỉ để vẽ)
  }
  sfx() {
    const T = this.T, c = (t, kind) => ({ t: +t.toFixed(3), kind });
    return [c(T.y14, 'pen'), c(T.szu, 'pen'), c(T.k2048, 'koma'), c(T.manaba, 'tick'),
      c(T.p97, 'soroban'), c(T.r2048, 'pen'), c(T.todoki, 'correct'),
      c(T.kochi, 'page'), c(T.matsu, 'pen'), c(T.dai, 'koma'), c(T.kasane, 'pen'),
      c(T.tw, 'wood'), c(T.wake, 'tick'), c(T.zuno, 'tick'),
      c(T.man, 'soroban'), c(T.k65, 'koma'), c(T.umare, 'shimmer'), c(T.chosha, 'pen'), c(T.hajime - 0.6, 'pen'), c(T.k65b, 'tick'), c(T.y21 - 0.6, 'whoosh'),
      c(T.gaku, 'pen'), c(T.p72, 'soroban'), c(T.k32, 'koma'), c(T.todoi - 0.2, 'pen')];
  }
  render(g, t) {
    const T = this.T;
    ground(g, t);

    // ── 棋譜 dòng năm (trái) ──
    const ink = { on: 'paper' };
    kifu(g, 96, 110, 840, 880, prog(t, this.FROM + 0.2, this.FROM + 0.8), { rules: true, seed: 11, content: X => {
      const x = X.ix + 10, row = (i, y, k, s, f) => write(g, s, x + i, y, k, { font: f, ...ink });
      write(g, '研究の歩み', x, X.iy + 50, prog(t, this.FROM + 0.4, this.FROM + 1.2), { font: `700 44px ${MIN}`, color: '@dim', ...ink });
      brush(g, [[x, X.iy + 80], [x + X.iw - 30, X.iy + 82]], prog(t, this.FROM + 0.8, this.FROM + 1.4), { w: 2, color: C.sumi, alpha: 0.5 });
      const R = [X.iy + 170, X.iy + 345, X.iy + 520, X.iy + 695];
      row(0, R[0], prog(t, T.y14, T.y14 + 0.6), '2014年', `700 56px ${MIN}`);
      row(220, R[0], prog(t, T.pol, T.pol + 0.6), 'ポーランド', `700 40px ${MIN}`);
      row(0, R[0] + 70, prog(t, T.szu, T.jas + 0.8), 'シュベルトとヤシュコフスキ', `700 40px ${MIN}`);
      row(0, R[1], prog(t, T.jp, T.jp + 0.4), '日本', `700 56px ${MIN}`);
      row(150, R[1], prog(t, T.kochi, T.kochi + 0.9), '高知工科大学', `700 40px ${MIN}`);
      row(0, R[1] + 70, prog(t, T.matsu, T.matsu + 0.7), '松崎公紀', `700 40px ${MIN}`);
      row(0, R[2], prog(t, T.y16, T.y16 + 0.6), '2016年', `700 56px ${MIN}`);
      row(220, R[2], prog(t, T.tw, T.tw + 0.4), '台湾', `700 40px ${MIN}`);
      row(0, R[2] + 70, prog(t, T.goto, T.zuno + 0.5), '段階ごとに別の「頭脳」', `700 40px ${MIN}`);
      row(0, R[3], prog(t, T.y21, T.y21 + 0.6), '2021年', `700 56px ${MIN}`);
      row(220, R[3], prog(t, T.gaku, T.tan + 0.5), '学習 ＋ 探索', `700 40px ${MIN}`);
      // dòng đang nói: nét vàng nhạt bên lề (trung tính)
      let ym = R[0]; [[T.jp, 1], [T.y16, 2], [T.y21, 3]].forEach(([a, i]) => { ym += (R[i] - R[i - 1]) * smooth(prog(t, a - 0.4, a)); });
      brush(g, [[X.ix - 22, ym - 44], [X.ix - 22, ym + 84]], prog(t, this.START, this.START + 0.4), { w: 5, color: C.goldDk });
    } });

    // ── sân 1: 2014 → quân 2048, 97% (câu 82–83) ──
    const o1 = out(t, T.jp - 0.5, 0.6);
    if (o1 < 1) {
      g.save(); g.translate(0, -900 * o1);
      telop(g, 'TD学習で', SX + 40, 200, prog(t, T.houhou - 0.2, T.houhou + 0.5), { size: 48, color: '@dim' });
      if (t < T.k2048 + 0.5) koma(g, 2048, SX + SW / 2, 450, 230, prog(t, this.FROM + 0.4, this.FROM + 1.0), { ghost: true });
      telop(g, 'ポーランドの研究者', SX + 40, 120, prog(t, T.ken - 0.3, T.ken + 0.6), { size: 40, color: '@dim' });
      koma(g, 2048, SX + SW / 2, 450, 230, prog(t, T.k2048, T.k2048 + 0.5), { seed: 50 });
      glint(g, SX + SW / 2, 442, 230, prog(t, T.todoki, T.todoki + 0.9));
      telop(g, 'プレイの', SX + 40, 720, prog(t, T.play83 - 0.2, T.play83 + 0.4), { size: 40, color: '@dim' });
      const kp = prog(t, T.p97, T.p97 + 1.2);
      pct(g, SX + 40, 760, 560, 97, kp);
      telop(g, [['97', `700 80px ${MIN}`], ['%', `700 56px ${JP}`]], SX + 640, 815, kp, { size: 80 });
      telop(g, 'が 2048 に到達', SX + 40, 900, prog(t, T.r2048, T.todoki + 0.5), { size: 48 });
      g.restore();
    }
    // ── sân 2: 日本 — chồng 棋譜 nghiên cứu (câu 84) ──
    const o2 = out(t, T.y16 - 0.5, 0.6);
    if (t > T.jp - 0.6 && o2 < 1) {
      g.save(); g.translate(0, -900 * o2 + 900 * (1 - out(t, T.jp - 0.6, 0.6)));
      // cụm vào ngay từ 「高知」 (nửa phải không trống); quân 2048 đặt lên tờ đúng 「題材」
      telop(g, '2048を題材に', SX + 40, 220, prog(t, T.kochi, T.kochi + 0.8), { size: 48 });
      [0, 0.4, 0.8].forEach((d, i) => kifu(g, SX + 90 + i * 70, 320 + i * 60, 520, 440, prog(t, T.kochi + d, T.kochi + d + 0.6), { rules: true, seed: 20 + i, content: X => {
        if (i === 2) { koma(g, 2048, X.x + 120, X.y + 140, 130, prog(t, T.dai, T.dai + 0.4), { seed: 60 }); write(g, '学習の研究', X.x + 220, X.y + 160, 1, { font: `700 44px ${MIN}`, on: 'paper' }); }
      } }));
      telop(g, '研究を重ねる', SX + 40, 990, prog(t, T.kasane, T.kasane + 0.6), { size: 48 });
      g.restore();
    }
    // ── sân 3: 2016 台湾 — chặng, 1万回, MỘT 65536 (câu 85–87) ──
    const o3 = out(t, T.y21 - 0.5, 0.6);
    if (t > T.y16 - 0.6 && o3 < 1) {
      g.save(); g.translate(0, -900 * o3 + 900 * (1 - out(t, T.y16 - 0.6, 0.6)));
      // câu 85: ván chia chặng, mỗi chặng một 「頭脳」 → thu lên trên khi 1万回 vào
      const oS = out(t, T.man - 0.4, 0.6);
      g.save(); g.translate(0, -900 * oS);
      telop(g, 'ゲームを段階に分ける', SX + 40, 220, prog(t, T.tw, T.tw + 1.0), { size: 44 });
      const kb = prog(t, T.tw, T.wake + 0.5);                            // trục vẽ từ 「台湾」 — nửa phải không trống
      brush(g, [[SX + 50, 330], [SX + 760, 330]], kb, { w: 5, color: C.gofunDim });
      arrow(g, SX + 700, 330, SX + 780, 330, kb >= 1 ? 1 : 0, { w: 5, color: C.gofunDim, head: 20 });
      [0, 1, 2].forEach(i => brush(g, [[SX + 50 + i * 240, 300], [SX + 50 + i * 240, 360]], prog(t, T.wake + i * 0.15, T.wake + 0.3 + i * 0.15), { w: 4, color: C.goldLt }));
      [0, 1, 2].forEach(i => koma(g, 1024, SX + 170 + i * 240, 450, 110, prog(t, T.zuno - 0.3 + i * 0.2, T.zuno + 0.1 + i * 0.2), { label: '脳', seed: 70 + i }));
      telop(g, '段階ごとに別の「頭脳」', SX + 40, 570, prog(t, T.goto, T.zuno + 0.5), { size: 44 });
      g.restore();
      // câu 86: 1万回 = lưới 100 × 100 ô nhỏ; ô duy nhất vàng → quân 65536
      if (t > T.man - 0.4) {
        const gx = SX + 40, gy = 300, cs = 4.2, kg = prog(t, T.man, T.man + 1.0);
        telop(g, [['1万回', `700 56px ${MIN}`], ['のプレイ', `700 40px ${MIN}`]], SX + 40, 260, prog(t, T.man, T.man + 0.7), { size: 56 });
        const nRow = Math.round(NGRID * smooth(kg));
        g.save(); g.fillStyle = '#C6A060';
        for (let r = 0; r < nRow; r++) for (let c = 0; c < NGRID; c++) g.fillRect(gx + c * cs, gy + r * cs, cs - 1.2, cs - 1.2);
        g.restore();
        const kOne = prog(t, T.ikkai, T.ikkai + 0.3);
        if (kOne > 0) {
          const [r1, c1] = this.ONE, ox = gx + c1 * cs, oy = gy + r1 * cs;
          g.save(); g.fillStyle = C.goldLt; g.fillRect(ox - 1, oy - 1, cs + 0.8, cs + 0.8);
          g.strokeStyle = C.goldLt; g.lineWidth = 2.5; g.beginPath(); g.arc(ox + cs / 2, oy + cs / 2, 12 + 22 * (1 - outCubic(kOne)), 0, 7); g.stroke(); g.restore();
          brush(g, [[ox + cs + 14, oy + cs / 2], [SX + 600, 470]], prog(t, T.ikkai + 0.2, T.k65), { w: 3, color: C.goldLt });
        }
        telop(g, [['たった', `700 40px ${MIN}`], ['1回', `700 56px ${MIN}`]], SX + 40, 800, prog(t, T.tatta, T.ikkai + 0.4), { size: 56 });
        koma(g, 65536, SX + 660, 520, 230, prog(t, T.k65, T.k65 + 0.5), { seed: 51 });
        glint(g, SX + 660, 512, 230, prog(t, T.umare, T.umare + 0.9));
        glint(g, SX + 660, 512, 230, prog(t, T.k65b, T.k65b + 0.9));
        telop(g, '65536 のタイル', SX + 660, 750, prog(t, T.k65 + 0.3, T.umare + 0.3), { size: 40, align: 'center' });
        telop(g, '著者たちによれば', SX + 40, 900, prog(t, T.chosha, T.chosha + 0.8), { size: 36, color: '@dim' });
        telop(g, 'プログラムが作った 初めての65536', SX + 40, 980, prog(t, T.hajime - 0.6, T.k65b + 0.6), { size: 44 });
      }
      g.restore();
    }
    // ── sân 4: 2021 学習＋探索 → 72% → 32768 (câu 88) ──
    if (t > T.y21 - 0.6) {
      g.save(); g.translate(0, 900 * (1 - out(t, T.y21 - 0.6, 0.6)));
      telop(g, '学習', SX + 40, 220, prog(t, T.gaku, T.gaku + 0.4), { size: 64 });
      telop(g, '＋', SX + 200, 220, prog(t, T.tan - 0.1, T.tan + 0.1), { size: 56 });
      telop(g, '探索', SX + 280, 220, prog(t, T.tan, T.tan + 0.4), { size: 64 });
      koma(g, 32768, SX + SW / 2, 450, 230, prog(t, T.k32, T.k32 + 0.5), { seed: 52 });
      glint(g, SX + SW / 2, 442, 230, prog(t, T.todoi, T.todoi + 0.9));
      telop(g, 'プレイの', SX + 40, 720, prog(t, T.p72 - 0.2, T.p72 + 0.4), { size: 40, color: '@dim' });
      const kp = prog(t, T.p72, T.p72 + 1.2);
      pct(g, SX + 40, 760, 560, 72, kp);
      telop(g, [['72', `700 80px ${MIN}`], ['%', `700 56px ${JP}`]], SX + 640, 815, kp, { size: 80 });
      telop(g, 'が 32768 に到達', SX + 40, 900, prog(t, T.k32 + 0.4, T.todoi + 0.3), { size: 48 });
      g.restore();
    }
  }
}
