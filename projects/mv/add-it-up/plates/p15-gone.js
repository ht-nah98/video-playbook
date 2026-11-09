// P15 gone — "Biến mất" · ✂ 139.94 đúng lúc MỌI nhạc cụ im (stems: 139.94–143.52). Toàn khổ phủ xanh; C − C co về
// không; bảy đường của họ sập làm một rồi rút thành số 8 khổng lồ (đục lỗ giấy). Đứng yên tới khi trống về.
import { W, H, clamp, smooth, prog, lerp } from '../../../../engine/lib.js';
import { R, sheet } from '../kit.js';
import { CUE } from '../song.js';

const F = u => u * u * u, Cs = [-6, -4, -2, 0, 2, 4, 6];
const X = u => 560 + u * 400, Y = v => 760 - v * 52;

export default class P15 {
  feed = 0;
  async init(s) {
    this.s = s; const L = (x, n = 1) => s.tl.at(x, n);
    this.tGone = L("and it's gone."); this.tFam = L('The family'); this.tOne = L('becomes one number.'); this.tCurve = L('Now take a curve');
    this.lines = ["and it's gone.", 'The family', 'becomes one number.', 'Now take a curve'].map(x => s.tl.line(x));
  }
  render(g, t) { sheet(g, t, this.s, () => this.page(t), { amp: 0, chrome: false }); }
  page(t) {
    R.ink('blue', c => c.fillRect(-100, -100, W + 200, H + 200));
    // C − C: khối vàng (trên xanh = lục) co về không
    const z = 1 - smooth(prog(t, CUE.silence[0], CUE.silence[0] + 0.5));
    if (z > 0) R.ink('yellow', c => c.fillRect(960 - 110 * z, 470, 220 * z, 140));
    if (z > 0) R.knock(c => { c.font = '900 90px "Archivo"'; c.textAlign = 'center'; c.fillText('C − C', 960, 760); });
    if (z <= 0 && t < this.tFam) R.knock(c => { c.font = '900 90px "Archivo"'; c.textAlign = 'center'; c.fillText('= 0', 960, 760); });
    // họ → một đường → số 8
    if (t >= this.tFam) {
      const col = smooth(prog(t, this.tFam, this.tOne)), ret = smooth(prog(t, this.tOne + 0.1, this.tOne + 0.6));
      R.knock(c => { c.lineWidth = 10; c.lineCap = 'round';
        for (const C of Cs) { c.beginPath(); const a = ret, b = 2 - 0;
          for (let u = a; u <= 2 - ret + 1e-9; u += 0.02) { const px = X(u), py = Y(F(u) + C * (1 - col) - 4 + 3); u === a ? c.moveTo(px, py) : c.lineTo(px, py); } if (ret < 1) c.stroke(); } });
      const k8 = clamp((t - this.tOne - 0.35) / 0.15);
      if (k8 > 0) R.knock(c => { c.font = '900 560px "Archivo"'; c.textAlign = 'center'; c.fillText('8', 960, 760 + (1 - k8) * 60); });
    }
    // lời: chữ đục lỗ (giấy trên nền xanh: tương phản 4.7)
    const [l0, l1, l2, l3] = this.lines, put = (l, y) => R.knock(c => { c.font = '500 46px "IBM Plex Mono"'; c.fillText(l.text, 130, y); });
    if (t < this.tFam) put(l0, 990);
    else if (t < this.tCurve) { put(l1, 930); if (t >= this.tOne) put(l2, 990); }
    else put(l3, 990);
  }
}
