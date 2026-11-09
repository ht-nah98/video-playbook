// P01 hello — CẢNH MẪU (xoá khi có cảnh thật). Minh hoạ HỢP ĐỒNG CẢNH (docs/ENGINE.md § Cảnh): tra mốc lời theo
// chữ, init/render/backdropAt/camera, hàm thuần của t. Các KỸ THUẬT trong đây (vào/ra bằng ký hiệu, lời chân
// khung giải mã, vỡ cảnh, chỉ trôi nhẹ) là lựa chọn của exp-log — không phải mặc định; chọn theo DNA của bài.
import { clamp, prog, smooth, outBack } from '../../../engine/lib.js';
import { presence } from '../../../engine/transit.js';
import { shatter } from '../../../engine/morph.js';
import { PAL } from '../song.js';
import { figure, footer } from '../kit.js';

export default class P01 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl;
    this.l = s.tl.line('Hello world');            // mốc lời: LUÔN tra theo chữ (tl.at / tl.line), không gõ số
    this.next = this.l.end + 0.6;                  // cảnh sau vào — thường là tl.at('câu đầu cảnh sau')
  }
  backdropAt(t) { return { glow: 0.5 + 0.5 * smooth(prog(t, this.t0, this.t0 + 0.6)) }; }
  camera(t) { return { s: 1 + 0.03 * smooth(prog(t, this.t0, this.next)), bg: 0 }; }   // đoạn lặng: chỉ trôi nhẹ
  render(g, t) {
    shatter(g, c => this.world(c, t), prog(t, this.next - 0.35, this.next), t, { seed: 1 });
    figure(g, this.m, 'wave', 1450, 1080, 760, 'rows', presence(t, this.t0 + 0.1, this.next - 0.45, { inDur: 0.3, outDur: 0.4 }), { t, seed: 2 });
    footer(g, this.tl, t, ['world'], { from: this.t0, at: this.next - 0.3 });
  }
  world(g, t) {
    const k = outBack(clamp((t - this.l.words[1].start) / 0.25));   // nảy vào đúng từ khoá
    if (k <= 0) return;
    g.save(); g.translate(620, 480); g.scale(k, k);
    g.font = '900 220px "Archivo"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = PAL.fwd;
    g.fillText('2³ = 8', 0, 0); g.restore();
  }
}
