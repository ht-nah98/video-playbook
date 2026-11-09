// b3 · How many grids? — bức tường đầy ô cửa nhỏ lùi xa (camera lùi), số lưới đếm lên rồi chốt.
// Bắt đầu từ MỘT lưới đã giải (vật xuyên suốt); "different" → camera lùi, các lưới khác (đổi nhãn số — vẫn hợp lệ)
// trượt vào và nhỏ dần thành tường; "counted exactly" → 6,670,903,752,021,072,936,960 đếm lên (CONTENT, Felgenhauer &
// Jarvis 2005); "six point seven times ten to the twenty-one" → "≈ 6.7 × 10²¹"; "billion billion" → nhãn; "keep" → khoanh.
import { W, H, C, prog, lookup, must, outCubic, clamp, hash, mk, ground, window9, it, label, num, eq, sectionTag, D } from '../kit.js';

const N = 6670903752021072936960n;
const fmt = v => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
/** Tấm kính trong khung chì (chữ nhật) — như b2.slab. */
function slab(g, x, y, w, h, k = 1) {
  if (k <= 0) return; g.save(); g.globalAlpha = clamp(k * 3);
  g.shadowColor = 'rgba(40,32,24,0.3)'; g.shadowBlur = 24; g.shadowOffsetX = 10; g.shadowOffsetY = 14;
  g.fillStyle = C.lead; rr(g, x - 10, y - 10, w + 20, h + 20, 12); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = C.clear; rr(g, x, y, w, h, 6); g.fill();
  const gr = g.createLinearGradient(x, y, x + w, y + h);
  gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(0.3, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(120,110,100,0.06)');
  g.fillStyle = gr; rr(g, x, y, w, h, 6); g.fill();
  g.restore();
}

const SX = 192, SY = 712, SW = 1536, SH = 288;          // tấm kính số ở đáy
const CX = 960, CY = 400, S0 = 520, S1 = 40;            // tâm tường, cỡ lưới đầu / cuối

export default class Count {
  static ERA = 'glass';
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'b3');
    this.T = {
      how: w(10, 'how'), different: w(10, 'different'), there: w(10, 'there'),
      five: w(11, 'five'), counted: w(11, 'counted'), exactly: w(11, 'exactly'), about: w(11, 'about'), six: w(11, 'six'),
      times: w(11, 'times'), ten: w(11, 'ten'), tw1: w(11, 'twenty-one'),
      billion1: w(12, 'billion', 1), billion2: w(12, 'billion', 2), grids: w(12, 'grids'),
      keep: w(13, 'keep'), mind: w(13, 'mind'), back: w(13, 'back'), trouble: w(13, 'trouble'), end: L(13).end,
    };
    this.START = L(10).start;
    this.FROM = Math.max(this.START - 1.2, L(9).end + 0.5);
    must(`'${fmt(N)}' === '6,670,903,752,021,072,936,960'`, true);
    must(`Math.round(${Number(N)} / 1e20) / 10`, 6.7);
    must('Math.round(6700 * 1e9 * 1e9 / 1e20)', 67);                  // "six thousand seven hundred billion billion"
    // các lưới trên tường: lời giải đổi nhãn số (hoán vị 1–9) — vẫn là lưới hợp lệ; ô giữa = lưới gốc
    const perm = j => { const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]; return j ? a.slice().sort((p, q) => hash(j * 13.1 + p) - hash(j * 13.1 + q)) : a; };
    this.TILES = [...Array(6)].map((_, j) => {
      const P = perm(j), cs = 62, pad = Math.max(4, cs * 0.07) * 2.1, c = mk(9 * cs + 2 * pad, 9 * cs + 2 * pad), x = c.getContext('2d');
      window9(x, pad, pad, cs, { shadow: false, digits: (r, cc) => P[D(r, cc) - 1] });
      const mid = mk(c.width / 4, c.height / 4), xm = mid.getContext('2d'); xm.imageSmoothingQuality = 'high'; xm.drawImage(c, 0, 0, mid.width, mid.height);
      const lo = mk(mid.width / 4, mid.height / 4), xl = lo.getContext('2d'); xl.imageSmoothingQuality = 'high'; xl.drawImage(mid, 0, 0, lo.width, lo.height);
      return [c, mid, lo];
    });
  }
  sfx() {
    const T = this.T, ticks = [];
    for (let s = T.counted; s < T.about - 0.15; s += 0.14) ticks.push({ t: s, kind: 'tick', db: -6 });
    return [{ t: T.different, kind: 'chip' }, ...ticks, { t: T.times, kind: 'pen' }, { t: T.billion1, kind: 'pen' }];
  }
  render(g, t) {
    const T = this.T;
    ground(g);
    // ── tường ô cửa: camera lùi ──
    const z = prog(t, T.different, T.keep), ez = z * z * (3 - 2 * z);
    const S = Math.exp(Math.log(S0) + (Math.log(S1) - Math.log(S0)) * ez - 0.22 * prog(t, T.keep, T.end + 2) + 0.02 * Math.sin(t * 0.5) * (1 - z));
    const sp = prog(t, T.different, T.there + 0.6), pitch = S * (1.12 + 1.3 * (1 - sp * sp * (3 - 2 * sp)));
    const mip = S > 200 ? 0 : S > 52 ? 1 : 2;
    g.save(); g.beginPath(); g.rect(0, 110, W, H - 110); g.clip();
    const ni = Math.ceil((W / 2 + S) / pitch), j0 = -Math.ceil((CY - 110 + S) / pitch), j1 = Math.ceil((H - CY + S) / pitch);
    for (let j = j0; j <= j1; j++) for (let i = -ni; i <= ni; i++) {
      const v = i === 0 && j === 0 ? 0 : 1 + ((hash(i * 31.7 + j * 7.3 + 0.5) * 5) | 0);
      g.drawImage(this.TILES[v][mip], CX + i * pitch - S / 2, CY + j * pitch - S / 2, S, S);
    }
    const fade = g.createLinearGradient(0, 110, 0, 190); fade.addColorStop(0, C.wall); fade.addColorStop(1, 'rgba(228,220,205,0)');
    g.fillStyle = fade; g.fillRect(0, 110, W, 80);
    g.restore();
    sectionTag(g, 'ACT I · HOW MANY GRIDS?', prog(t, this.FROM + 0.3, this.FROM + 0.9));

    // ── tấm kính số ──
    const ks = prog(t, T.how - 0.4, T.how + 0.2), dy = (1 - outCubic(ks)) * 340;
    if (ks > 0) {
      g.save(); g.translate(0, dy);
      slab(g, SX, SY, SW, SH, ks);
      g.save(); rr(g, SX, SY, SW, SH, 6); g.clip();
      const up = outCubic(prog(t, T.five - 0.2, T.five + 0.4)) * 220;     // câu hỏi rời lên khi có câu trả lời
      it(g, 'how many finished grids?', W / 2, 880 - up, 72, C.ink, { align: 'center', k: prog(t, T.how, T.there + 0.3) });
      g.restore();
      label(g, '2005 · counted exactly', SX + 48, SY + 58, { size: 22, color: C.ink, k: prog(t, T.five, T.exactly + 0.4) });
      const kc = prog(t, T.counted, T.about - 0.1);
      if (kc > 0) {
        const e = 1 - Math.pow(1 - kc, 3), v = kc >= 1 ? N : (N * BigInt(Math.floor(e * 1e9))) / 1000000000n;
        num(g, fmt(v), W / 2, 880, 72, C.digit, { align: 'center' });
      }
      const sp2 = eq(g, [['≈ 6.7'], [' × 10']], SX + 48, 962, 60, { k: prog(t, T.six, T.ten + 0.3) });
      it(g, '21', sp2[1][1] + 4, 928, 36, C.ink, { k: prog(t, T.tw1, T.tw1 + 0.3) });
      label(g, '6,700 billion billion grids', SX + SW - 48, 958, { size: 26, color: C.ink, align: 'right', k: prog(t, T.billion1 - 0.3, T.grids + 0.3) });
      // "keep that number in mind": khoanh số mũ
      const kk = prog(t, T.keep, T.keep + 0.6);
      if (kk > 0) { g.save(); g.strokeStyle = C.ink; g.lineWidth = 4; g.setLineDash([Math.max(1, 900 * kk), 2000]);
        rr(g, SX + 30, 900, sp2[1][1] - SX + 40, 82, 10); g.stroke(); g.restore(); }
      label(g, 'keep in mind', SX + SW - 48, SY + 58, { size: 22, color: C.ink, align: 'right', k: prog(t, T.mind, T.mind + 0.5) });
      g.restore();
    }
  }
}
