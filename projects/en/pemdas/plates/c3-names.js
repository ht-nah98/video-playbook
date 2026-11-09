// "Many names, one agreement" (p2 câu 32–36). BIÊN GIỚI dọc một con đường: UK · BODMAS | CANADA · BEDMAS | USA · PEMDAS.
// Mặt đường giống hệt nhau (cùng một phép sơn ở cả ba nước), chỉ chữ trên bảng khác. Toạ độ THẾ GIỚI ≈ màn hình (camera
// chỉ trôi chậm −40 → +40). Xe chạy trái → phải: lane bên TRÁI của xe = lane TRÊN (y < 540), lane bên PHẢI = lane DƯỚI.
//   Anh lái bên trái → xe ở lane trên; qua biên giới sang Canada/Mỹ (lái bên phải) → chuyển xuống lane dưới (CONTENT.md).
import { clamp, prog, smooth, outBack, ROAD, verge, road, centerLine, paint, car, card, typed, ring, hand, must,
  lookup } from '../kit.js';

const Y = 540, UP = 465, DN = 615;
const B1 = 640, B2 = 1280;                              // biên giới UK|CANADA, CANADA|USA
const ZONES = [['UK', 'BODMAS', 320], ['CANADA', 'BEDMAS', 960], ['USA', 'PEMDAS', 1600]];
const MAIN = g => { g.moveTo(-3000, Y); g.lineTo(5000, Y); };
const SERIF = s => `italic 600 ${s}px "Cormorant Garamond"`;
const laneY = x => x < B1 - 90 ? UP : x > B1 + 110 ? DN : UP + (DN - UP) * smooth((x - (B1 - 90)) / 200);
const TRAFFIC = ['#8E99A6', '#B9B1A1', '#6F8DA6'];        // xe khác: màu trầm (vàng chỉ cho xe người đọc, đỏ chỉ cho cái sai)

export default class Names {
  static ERA = 'road';
  static POSES = [];
  static IMAGES = {};
  init({ tl }) {
    const { L, w } = lookup(tl, 'c3');
    this.T = {
      clue: w(32, 'clue'), name: w(32, 'name'), pemdas: w(33, 'pemdas'), bodmas: w(33, 'bodmas'), bedmas: w(33, 'bedmas'),
      different33: w(33, 'different'), country: w(33, 'country'), one: w(34, 'one'), names: w(34, 'names'),
      agreement: w(34, 'agreement'), l35: L(35).start, choosing: w(35, 'choosing'), side: w(35, 'side'), drive: w(35, 'drive'),
      shared: w(36, 'shared'), different: w(36, 'different'), world: w(36, 'world'), work: w(36, 'work'),
    };
    const T = this.T;
    this.START = L(32).start; this.FROM = this.START - 1.2;
    this.END = L(37).start - 1.2 + 0.9;                  // cảnh sau (c4) bắt đầu ở câu 37 − 1.2
    this.v = must('2 × 3 + 4', 10);                      // cùng một phép, cùng một đáp số ở cả ba nước
    this.NAME_T = { UK: T.bodmas, CANADA: T.bedmas, USA: T.pemdas };
    this.CAR = [[T.choosing - 0.3, -220], [T.shared + 0.2, 2150]];
  }
  camX(t) { return -40 + 80 * clamp((t - this.FROM) / (this.END - this.FROM)); }
  sfx() {
    const T = this.T;
    return [{ t: T.name, kind: 'pop' }, { t: T.pemdas, kind: 'type' }, { t: T.bodmas, kind: 'type' }, { t: T.bedmas, kind: 'type' },
      { t: T.country, kind: 'tick' }, { t: T.one, kind: 'snap' }, { t: T.agreement, kind: 'pop' }, { t: T.choosing, kind: 'whoosh' },
      { t: T.side + 0.3, kind: 'tick' }, { t: T.different, kind: 'pop' }, { t: T.work, kind: 'correct' }];
  }
  render(g, t) {
    const T = this.T, cx = this.camX(t);
    g.save(); verge(g); g.translate(-cx, 0);
    road(g, MAIN); centerLine(g, MAIN);
    const kb = prog(t, T.different33, T.country + 0.2);   // vạch biên giới cắt ngang đường + cọc hai bên
    for (const x of [B1, B2]) border(g, x, kb);

    ZONES.forEach(([c, n, x], i) => {
      const kn = prog(t, this.NAME_T[c] - 0.15, this.NAME_T[c] + 0.3);
      plaque(g, x, 228, c, n, prog(t, T.name - 0.1 + i * 0.1, T.name + 0.25 + i * 0.1), kn);
      paint(g, `2 × 3 + 4 = ${this.v}`, x, Y, 56, { k: prog(t, T.one - 0.1, T.one + 0.6) });
      ring(g, x, 286, 200, 64, prog(t, T.names - 0.2 + i * 0.15, T.names + 0.15 + i * 0.15), { color: ROAD.gold, seed: 5 + i });
    });
    typed(g, 'same road, same answer — only the sign changes', 960, 835, prog(t, T.one + 0.3, T.names + 0.3), SERIF(44), ROAD.edge, { align: 'center' });
    typed(g, 'an agreement', 960, 935, prog(t, T.agreement - 0.1, T.agreement + 0.6), SERIF(64), ROAD.gold, { align: 'center' });

    // ── lái bên nào: mũi tên sơn trong lane đúng luật từng nước ──
    const ka = prog(t, T.side - 0.2, T.side + 0.3);
    for (const [x, y] of [[90, UP], [560, UP], [760, DN], [1160, DN], [1420, DN], [1800, DN]])
      paint(g, '→', x, y, 46, { k: ka, gap: false, color: 'rgba(237,235,227,0.8)' });
    laneTag(g, 'keeps LEFT', 320, UP, prog(t, T.side - 0.1, T.side + 0.5));
    laneTag(g, 'keeps RIGHT', 960, DN, prog(t, T.drive - 0.1, T.drive + 0.5));
    laneTag(g, 'keeps RIGHT', 1600, DN, prog(t, T.drive + 0.1, T.drive + 0.7));
    ring(g, 320, UP, 290, 46, prog(t, T.different - 0.1, T.different + 0.4), { color: ROAD.gold, w: 4, seed: 41 });
    ring(g, 1280, DN, 640, 46, prog(t, T.different + 0.2, T.different + 0.7), { color: ROAD.gold, w: 4, seed: 43 });

    // ── xe: người đọc (vàng) rồi dòng xe chung luật ──
    for (let i = 0; i < 14; i++) {
      const ti = T.shared - 0.4 + i * 0.62, x = -220 + 700 * (t - ti);
      if (x > -220 && x < 2300) drive(g, x, TRAFFIC[i % 3]);
    }
    if (t > this.CAR[0][0] && t < this.CAR[1][0] + 0.1) drive(g, keyAt(this.CAR, t)[0], ROAD.gold);
    check(g, 1220, 912, 30, prog(t, T.work - 0.15, T.work + 0.25));
    g.restore();

    card(g, 'road', prog(t, this.FROM, this.FROM + 1), 'ACT TWO · A CHOICE', 'Many names, one agreement');
  }
}

function keyAt(K, t) {
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const [t0, ...a] = K[i], [t1, ...b] = K[i + 1], u = smooth(clamp((t - t0) / (t1 - t0)));
  return a.map((v, j) => v + (b[j] - v) * u);
}
function drive(g, x, color) {                             // xe theo lane của nước đang đi qua; mũi xe nghiêng theo lúc chuyển lane
  const y = laneY(x), d = (laneY(x + 2) - laneY(x - 2)) / 4;
  car(g, x, y, Math.atan(d), { s: 0.8, color });
}
function border(g, x, k) {                                // biên giới: hai vạch trắng đứt cắt ngang đường + cọc than hai bên
  if (k <= 0) return; const y0 = 398, y1 = 398 + 284 * clamp(k);
  g.save(); g.strokeStyle = ROAD.edge; g.lineWidth = 7; g.setLineDash([22, 14]);
  for (const dx of [-9, 9]) { g.beginPath(); g.moveTo(x + dx, y0); g.lineTo(x + dx, y1); g.stroke(); }
  g.setLineDash([]); g.restore();
  for (const y of [362, 718]) { const p = outBack(clamp(k * 1.5));
    g.save(); g.translate(x, y); g.scale(p, p); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 10; g.shadowOffsetY = 6;
    g.fillStyle = ROAD.P; g.beginPath(); g.roundRect(-16, -16, 32, 32, 6); g.fill(); g.shadowColor = 'transparent';
    g.fillStyle = ROAD.edge; g.fillRect(-16, -3, 32, 6); g.restore(); }
}
function plaque(g, x, y, country, name, k, kn) {          // bảng biên giới: chữ trơn (không cờ, không logo)
  if (k <= 0) return; const w = 350, h = 116, p = outBack(clamp(k));
  g.save(); g.translate(x, y + h); g.scale(1, p); g.translate(-x, -(y + h));
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 18; g.shadowOffsetY = 10; g.fillStyle = '#23262A';
  g.beginPath(); g.roundRect(x - w / 2, y, w, h, 14); g.fill(); g.shadowColor = 'transparent';
  g.strokeStyle = ROAD.edge; g.lineWidth = 4; g.beginPath(); g.roundRect(x - w / 2 + 8, y + 8, w - 16, h - 16, 9); g.stroke(); g.restore();
  typed(g, country, x, y + 40, kn * 2, '500 24px "IBM Plex Mono"', ROAD.gold, { align: 'center' });
  typed(g, name, x, y + 96, kn * 1.4 - 0.2, '800 56px "Archivo"', ROAD.edge, { align: 'center' });
}
function laneTag(g, s, x, y, k) {                         // nhãn lane: chữ nhỏ trên cỏ ngay ngoài mép đường cạnh lane đó
  typed(g, s, x, y < Y ? 380 : 742, k, '500 24px "IBM Plex Mono"', ROAD.edge, { align: 'center' });
}
function check(g, x, y, s, k) {
  hand(g, [[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s * 1.2, y - s * 0.9]], { w: 9, color: ROAD.gold, jit: 1, seed: 21, k });
}
