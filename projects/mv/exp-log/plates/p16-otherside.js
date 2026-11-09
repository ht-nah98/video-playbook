// P16 otherside — "Nghe từ phía bên kia" · 90.47 → 98.88 (TREATMENT P16, pre-chorus 2 — hát)
// Sảnh ngân hàng giờ nằm sau tấm kính quầy giao dịch. 90–94 nhạc tắt hẳn: đèn lạnh, đứng yên, chỉ kính trôi vệt sáng.
// "We already knew the question": 1.07^□ = 2 khắc lên kính. "Turn the language backward": dòng chữ lật như tấm
// bìa — mặt sau là □ = log₁.₀₇ 2; "the answer can be found": □ hoá xanh, 10.2 nằm trong.
// "waiting there all along": sau kính, đường gương y = x sáng lên; mặt cận hiện ra trên gương và hát nhép.
// 94 → 98.88 trống dồn: mỗi beat một cú rạn, ô nhịp cuối dồn nửa beat; camera đẩy vào. P17 đập vỡ kính.
import { clamp, prog, outBack, smooth, lerp } from '../../../../engine/lib.js';
import { presence, drawTransit } from '../../../../engine/transit.js';
import { drawMirrorLine } from '../../../../engine/mirror.js';
import { mouthAt } from '../../../../engine/visemes.js';
import { mix } from '../../../../engine/draw.js';
import { PAL, MIRROR, beat } from '../song.js';
import { footer } from '../kit.js';
import { KACHING, BANK_GLYPHS, vault, stacks, doubleLine, calendar, monthTimes, growthCurve, doubleMarker, EQ_BOX } from '../bank.js';
import { glassPane, crackHits, etch, glassAnswer, glassBox } from '../glass.js';

export const FACE = [960, 870, 560];                   // mặt cận sau kính: tâm trên gương, cằm trên dòng lời
export const DRUMS_BACK = 94.0;                        // data/stems.json: trống vào lại sau 4s im (bảng năng lượng)

export default class P16 {
  async init(s) {
    this.m = s.mascot; this.tl = s.tl; this.face = s.face; this.vox = s.vox;
    this.times = monthTimes(KACHING[0], s.tl.at('same percent every month.'));
    this.ans10 = s.tl.line('It was already').words[2].start + 0.45;
    this.knew = s.tl.line('We already knew the question,');
    this.down = s.tl.line("we just couldn't write it down.");
    this.turn = s.tl.line('Turn the language backward,');
    this.found = s.tl.line('and the answer can be found.');
    this.wait = s.tl.line('What looked unfamiliar');
    this.same = s.tl.line('The same idea');
    this.next = s.tl.at('Run it forward,', 2);            // điệp khúc 2
    this.hits = crackHits(DRUMS_BACK, this.next, this.next - beat.BAR);   // ô nhịp cuối: dồn nửa beat
  }
  cold(t) { return smooth(prog(t, this.t0, this.t0 + 0.8)); }
  backdropAt(t) {
    const c = this.cold(t), m = smooth(prog(t, this.wait.start, this.wait.start + 0.6));
    return { glow: lerp(0.9, 0.45, c) + 0.25 * m, horizon: 760, floor: lerp(0.8, 0.35, c) + 0.3 * m, mirror: true,
      floorA: mix(PAL.fwd, PAL.back, c * (1 - m)), floorB: mix(PAL.fwd, PAL.back, c), bokeh: 0, floorGlyphs: BANK_GLYPHS };
  }
  camera(t) {
    const e = smooth(prog(t, this.t0, this.t0 + 1.0)), push = smooth(prog(t, this.same.start, this.next));
    return { s: lerp(0.95, 1, e) + 0.12 * push, cx: lerp(EQ_BOX[0], 960, e), cy: lerp(EQ_BOX[1] + 40, 540, e), bg: 0 };
  }
  render(g, t) {
    const c = this.cold(t);
    // thế giới sau kính: sảnh ngân hàng của P13–P15, lạnh và lùi lại
    const a = lerp(1, 0.32, c);                       // các hàm thế giới tự đặt globalAlpha → truyền alpha vào từng hàm
    vault(g, t, { alpha: 0.9 * a }); stacks(g, t, this.times, { alpha: a }); doubleLine(g, t, 1, { alpha: a }); growthCurve(g, 12.6, { alpha: a });
    doubleMarker(g, t, 1, { alpha: a });
    g.save(); g.globalAlpha = a; calendar(g, t, 12, -1, { label: '10.2', labelCol: PAL.back }); g.restore();
    // đường gương chờ sẵn phía sau kính
    const m = smooth(prog(t, this.wait.start, this.wait.start + 0.5));
    drawMirrorLine(g, MIRROR, m, { width: 6, glow: 30 });
    // mặt cận trên gương, hát nhép (hát: pre-chorus) — P17 nhận đúng mặt này
    const [FX, FY, FH] = FACE;
    const p = presence(t, this.wait.start + 0.1, 1e9, { inDur: 0.35 });
    if (p.state === 'in') drawTransit(g, this.m, 'face', FX, FY, FH, 'rows', 'in', p.k, { t, cell: 7, seed: 21 });
    else if (p.state === 'hold') { const l = this.tl.lineAt(t); this.face.draw(g, FX, FY, FH, l ? mouthAt(t, this.tl.wordsOf(l), this.vox) : 1); }
    // kính + chữ khắc + vết rạn
    // kính hạ xuống như cửa chớp quầy giao dịch (0.45s), câu hỏi khắc lên khi kính đã đứng
    const drop = 1 - smooth(prog(t, this.t0, this.t0 + 0.45));
    g.save(); g.translate(0, -1000 * drop);
    glassPane(g, t, { hits: this.hits, strain: smooth(prog(t, this.same.start, this.next)) });
    g.restore();
    this.words(g, t);
    footer(g, this.tl, t, ['question', 'write', 'backward', 'answer', 'unfamiliar', 'waiting', 'same', 'other', 'side'],
      { from: this.t0, carry: true });
  }
  /** Câu hỏi khắc trên kính; lật quanh trục đứng ở "Turn the language backward" → mặt sau là câu trả lời. */
  words(g, t) {
    const etchK = prog(t, this.knew.start + 0.45, this.knew.end + 0.2);
    const k = smooth(prog(t, this.turn.start, this.turn.end)), cs = Math.cos(Math.PI * k);
    g.save(); g.translate(960, 200); g.scale(Math.max(Math.abs(cs), 0.02), 1); g.translate(-960, -200);
    if (cs >= 0) {
      etch(g, '1.07', 820, 210, '900 120px "Archivo"', etchK);
      etch(g, '= 2', 1130, 210, '900 120px "Archivo"', clamp(etchK * 2 - 1));
      const blink = t >= this.down.start && t < this.turn.start ? 0.55 + 0.45 * Math.cos((t - this.down.start) * 14) : 1;
      if (etchK > 0.45) glassBox(g, 985, 140, 62, PAL.block, blink);
    } else {
      glassAnswer(g, t, this.found.words[2].start);
    }
    g.restore();
  }
}
