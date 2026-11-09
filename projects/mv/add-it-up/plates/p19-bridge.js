// P19 bridge — "Khác chuyện, chung máy" (bridge hát trọn, thoáng). Ba poster in lần lượt; một con dấu ∫ in chồng
// ngang qua cả ba; ba con tem nước / khối lượng / năng lượng; các tờ gấp lại thành một tập zine, rồi nằm yên.
import { W, H, clamp, smooth, prog, lerp } from '../../../../engine/lib.js';
import { R, sheet, lyrics } from '../kit.js';

const PW = 460, PH = 600, PY = 150, PX = [180, 730, 1280];
const POST = [
  { ink: 'pink', a: 'RATE', b: 'AMOUNT', line: 'A rate' },
  { ink: 'blue', a: 'HEIGHT', b: 'AREA', line: 'A height' },
  { ink: 'yellow', a: 'SLICE', b: 'VOLUME', line: 'A slice' },
];
const STAMPS = [
  { word: 'Water.', ink: 'blue', lab: '∫ flow · dt' },
  { word: 'Mass.', ink: 'key', lab: '∫ density · dx' },
  { word: 'Energy.', ink: 'pink', lab: '∫ power · dt' },
];

export default class P19 {
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    POST.forEach(p => p.t = L(p.line)); STAMPS.forEach(p => p.t = L(p.word));
    this.tOp = L('Same operation.'); this.tStories = L('Different stories.'); this.end = L('Add it up,', 3);
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 0.8, pass: 4 }); }
  page(t) {
    const fold = smooth(prog(t, this.tStories, this.tStories + 1.2)), drift = Math.max(0, t - this.tStories - 1.2) * 6;
    POST.forEach((p, i) => {
      const k = clamp((t - p.t) / 0.3); if (k <= 0) return;
      const x = lerp(PX[i], PX[1] + (i - 1) * 18, fold), y = PY + (1 - smooth(k)) * 60 - drift, rot = fold * (i - 1) * 0.05;
      const tr = c => { c.translate(x + PW / 2, y + PH / 2); c.rotate(rot); c.translate(-PW / 2, -PH / 2); };
      R.knock(c => { tr(c); c.fillRect(0, 0, PW, PH); });            // tờ poster đè lên tờ dưới khi gấp
      R.ink(p.ink, c => { tr(c); c.fillStyle = R.tint(p.ink, 0.5, 9); c.fillRect(0, 0, PW, PH); });
      R.ink('key', c => { tr(c); c.lineWidth = 4; c.strokeRect(0, 0, PW, PH);
        c.font = '900 76px "Archivo"'; c.fillText(p.a, 30, 120); c.font = '900 76px "Archivo"'; c.fillText('↓', 30, 230); c.fillText(p.b, 30, 340);
        c.font = '500 22px "IBM Plex Mono"'; c.fillText(`POSTER ${i + 1}/3`, 30, PH - 30); });
      // biểu tượng nhỏ trên poster
      R.ink(i === 2 ? 'blue' : 'key', c => { tr(c);
        if (i === 0) { c.lineWidth = 6; c.beginPath(); c.arc(PW - 120, 470, 70, Math.PI, 2 * Math.PI); c.stroke(); c.beginPath(); c.moveTo(PW - 120, 470); c.lineTo(PW - 70, 420); c.stroke(); }
        if (i === 1) for (let j = 0; j < 8; j++) c.fillRect(PW - 260 + j * 28, 540 - 20 - j * j * 3, 22, 20 + j * j * 3);
        if (i === 2) for (let j = 0; j < 9; j++) { c.beginPath(); c.ellipse(PW - 260 + j * 24, 460, 14, 20 + j * 7, 0, 0, 7); c.fill(); } });
    });
    // một con dấu ∫ ngang qua cả ba tờ
    const ks = clamp((t - this.tOp) / 0.15);
    if (ks > 0 && fold < 1) R.ink('key', c => { c.font = 'italic 300 900px "Cormorant Garamond"'; c.textAlign = 'center'; c.fillText('∫', 960, 860 - (1 - ks) * 80 + fold * 1300); });   // gấp: con dấu trượt xuống khỏi khung
    STAMPS.forEach((p, i) => {
      const k = clamp((t - p.t) / 0.12); if (k <= 0) return;
      const x = 420 + i * 540, y = 860 - drift;
      R.ink(p.ink, c => { c.beginPath(); c.arc(x, y, 46 + (1 - k) * 30, 0, 7); c.fill(); });
      R.ink('key', c => { c.font = '800 34px "Archivo"'; c.fillText(p.word.replace('.', '').toUpperCase(), x + 64, y - 4); c.font = '500 24px "IBM Plex Mono"'; c.fillText(p.lab, x + 64, y + 30); });
    });
    lyrics(this.s, t, POST[0].t, this.end);
  }
}
