// a0 · Mở bài 25 s kiểu lát cắt: mỗi câu một hình, mũi tên chạy ngay từ giây đầu, tư liệu thật (đo mở bài mẫu: docs/study/17b-openings.md).
import { must, figure, archive } from '../kit.js';
import { scene, cue, C, FONT, bg, txt, seg, dot, prog, ease, D2R, I, arrow, line, turn, wave, popped } from './common.js';
const CX = 1090, CY = 640, U = 340;
export default class Open {
  static ERA = 'night'; static IMAGES = { 'ars-magna': 'assets/history/ars-magna.jpg', geometrie: 'assets/history/geometrie.png', tower: 'assets/history/tower.jpg' }; static POSES = ['pointer'];
  init({ tl }) { const s = scene(tl, 'What number'); this.START = s.START; this.FROM = -9; const { at, wd } = s;
    this.T = { zero: wd('Zero', 'zero'), but: wd('Zero', 'but'), mid: wd('Zero', 'halfway'), road: at('In the fifteen').start, des: at('Descartes').start, name: wd('Descartes', 'imaginary'), grid: at('Today').start, by: at('By the end').start, st: at('It all').start, end: at('It all').end };
    must('2^2-5^3', -121); }
  sfx() { const T = this.T; return [cue(.2, 'question'), cue(T.zero, 'tick'), cue(T.but, 'whoosh-long'), cue(T.mid, 'impact'), cue(T.road, 'page'), cue(T.name, 'impact'), cue(T.grid, 'whoosh'), cue(T.by, 'whoosh'), cue(T.st, 'tick')]; }
  render(g, t) {
    const T = this.T; bg(g);
    if (t < T.road) { line(g, CX, CY, U, 1, { labels: false }); txt(g, '−1', CX - U, CY + 62, FONT.black(70), C.neg); txt(g, '1', CX + U, CY + 62, FONT.black(70), C.cos); dot(g, CX - U, CY, 18, C.neg); dot(g, CX + U, CY, 18, C.cos);
      if (t < T.zero) txt(g, '?', CX, CY - 110, FONT.black(170), C.a); else { dot(g, CX, CY, 16, C.ink); txt(g, '0', CX, CY + 62, FONT.black(70), C.ink, 'center', prog(t, T.zero, T.zero + .2)); }
      const k = ease(prog(t, T.but, T.mid + .1)) * .5 + ease(prog(t, T.mid + .9, T.road - .5)) * .5, d = 180 * k, r = d * D2R; if (k > 0) { turn(g, CX, CY, U, 0, d, I, 10); arrow(g, CX, CY, CX + U * Math.cos(r), CY - U * Math.sin(r), I, 12, 38); }
      if (t > T.mid) { popped(g, CX, CY - U, prog(t, T.mid, T.mid + .25), () => { dot(g, CX, CY - U, 22, I); txt(g, '?', CX + 74, CY - U - 40, FONT.black(110), I); }); txt(g, 'NOT 0?!', 470, 300, FONT.black(110), C.neg, 'center', prog(t, T.mid, T.mid + .25)); }
    } else if (t < T.des) { const u = prog(t, T.road, T.des); archive(g, 'ars-magna', 560, 70, 560, 840, prog(t, T.road, T.road + .25), u, { fy: .1, zoom: .1, caption: 'Ars Magna, 1545' }); txt(g, 'x³ = 15x + 4', 1500, 330, FONT.black(70), C.ink, 'center', prog(t, T.road + .3, T.road + .6)); popped(g, 1500, 520, prog(t, T.road + .9, T.road + 1.2), () => txt(g, '√−121', 1500, 520, FONT.black(130), C.neg)); txt(g, '→ 4', 1500, 680, FONT.black(90), C.b, 'center', prog(t, T.road + 1.8, T.road + 2.1));
    } else if (t < T.grid) { const u = prog(t, T.des, T.grid); archive(g, 'geometrie', 560, 70, 640, 840, prog(t, T.des, T.des + .25), u, { fy: .05, caption: 'La Géométrie, 1637' }); popped(g, 1400, 480, prog(t, T.name, T.name + .25), () => { g.save(); g.translate(1400, 480); g.rotate(-.08); g.fillStyle = C.panel; g.fillRect(-340, -80, 680, 160); g.strokeStyle = I; g.lineWidth = 9; g.strokeRect(-340, -80, 680, 160); txt(g, 'IMAGINARY', 0, 4, FONT.black(100), I); g.restore(); });
    } else if (t < T.by) { const u = prog(t, T.grid, T.by), th = (t - T.grid) * 3; archive(g, 'tower', 500, 70, 1330, 700, 1, u, { fy: .35, zoom: .1 }); g.save(); g.fillStyle = 'rgba(255,255,255,.86)'; g.fillRect(500, 790, 1330, 170); g.restore(); seg(g, 560, 875, 1780, 875, C.dim, 3); wave(g, 560, 1780, 875, 62, x => Math.sin(th - (x - 560) / 60), C.sin, 7);
    } else if (t < T.st) { const k = ease(prog(t, T.by + .1, T.by + 1.6)), r = 90 * D2R * k; line(g, CX, CY, U * .7, 1, { labels: false }); arrow(g, CX, CY, CX + U * Math.cos(r), CY - U * Math.sin(r), I, 16, 46); turn(g, CX, CY, 130, 0, 90 * k, C.a, 8); txt(g, 'i', CX + 66, CY - U + 10, FONT.black(120), I, 'center', prog(t, T.by + 1.4, T.by + 1.7));
    } else { const k = ease(prog(t, T.st + 1.6, T.end - .3)), v = 1 + k, X = 1040, Y = 620, u = 190; line(g, X, Y, u, 3); arrow(g, X, Y - 90, X + v * u, Y - 90, C.cos, 14, 40); txt(g, '× 2  = ?', X, 300, FONT.black(130), C.ink, 'center', prog(t, T.st, T.st + .3)); }
    figure(g, 'pointer', 210, 1080, 470, 'night', 1, { t });
  }
}
