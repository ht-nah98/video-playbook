// Hồi 6 mở · "1936 — Turing" (SCRIPT.md) — màn hình. Câu 194–207 của p2.
//   194–196 câu hỏi của Hilbert: mệnh đề → [thủ tục máy móc ?] → PROVABLE / NOT PROVABLE · Turing (ảnh, 16 tuổi)
//   198–200 băng vô tận chia ô, ô mang VẠCH ĐẾM (gọi lại khúc xương) · đầu đọc: đọc, viết, dịch · bảng luật 4 dòng
//   201– máy CHẠY đúng theo bảng (máy đếm: mỗi lượt thêm một vạch) · 202 Church · 203 dấu NO, UNDECIDABLE
//   204 khung giới hạn quanh cả máy · 205–207 băng lên trên; ENIAC, điện thoại, giá máy chủ nối vào băng; "a physical body"
import { ERA, W, H, clamp, hash, outBack, outCubic, prog, ground, hand, seg, typed, card, ruler, photo, portrait, stamp, actTitle, lookup } from '../kit.js';

const E = ERA.screen;
const CW = 112, X0 = -40, NC = 18;                 // ô băng: x(i) = X0 + i·CW
const cx = i => X0 + i * CW + CW / 2;
// bảng luật: [trạng thái, đọc, viết, dịch, kế tiếp] — 1 = vạch, 0 = trống. Máy đếm: đi qua dãy vạch, thêm một vạch ở cuối,
// quay về đầu dãy, lặp lại. Mỗi lượt dãy vạch dài thêm một.
const RULES = [[1, 1, 1, +1, 1], [1, 0, 1, -1, 2], [2, 1, 1, -1, 2], [2, 0, 0, +1, 1]];
const TAPE0 = [3, 4, 5, 6, 11, 12], HEAD0 = 3, DT = 0.8;
const SUB = { 1: 'q₁', 2: 'q₂' };
function sim(n) {
  const tape = new Set(TAPE0); let pos = HEAD0, q = 1;
  for (let s = 0; s < n; s++) { const r = RULES.find(r => r[0] === q && r[1] === (tape.has(pos) ? 1 : 0));
    if (r[2]) tape.add(pos); else tape.delete(pos); pos += r[3]; q = r[4]; }
  const ri = RULES.findIndex(r => r[0] === q && r[1] === (tape.has(pos) ? 1 : 0));
  return { tape, pos, q, ri };
}
function mark(g, x, y, k, color, seed) { hand(g, seg(x - 2, y - 40, x + 2, y + 40, 8), { w: 10, color, jit: 2, seed, k }); }

export default class Turing {
  static ERA = 'screen';
  static IMAGES = {
    turing: './assets/history/Alan_Turing_Aged_16.jpg',
    church: './assets/history/Alonzo_Church.jpg',
    eniac: './assets/history/Glen_Beck_and_Betty_Snyder_program_the_ENIAC_in_building_328_at_the_Ballistic_Research_Laboratory.jpg',
  };
  static POSES = [];
  init({ tl }) {
    const { L, w } = lookup(tl, 'f1');
    this.T = {
      s194: L(194).start, hilbert: w(194, 'hilbert'), question: w(194, 'question'),
      mechanical: w(195, 'mechanical'), procedure: w(195, 'procedure'), decide: w(195, 'decide'), statement: w(195, 'statement'), proved: w(195, 'proved'),
      cambridge: w(196, 'cambridge'), pin: w(196, 'pin'), actually: w(196, 'actually'),
      alan: w(197, 'alan'), described: w(197, 'described'), imaginary: w(197, 'imaginary'),
      tape: w(198, 'tape'), divided: w(198, 'divided'), squares: w(198, 'squares'),
      s199: L(199).start, head: w(199, 'head'), reads: w(199, 'reads'), writes: w(199, 'writes'), moves: w(199, 'moves'), left: w(199, 'left'), right: w(199, 'right'),
      table: w(200, 'table'), rules: w(200, 'rules'), thats: w(201, "that's"),
      s202: L(202).start, alonzo: w(202, 'alonzo'), church: w(202, 'church'), anything: w(202, 'anything'), procedure202: w(202, 'procedure'),
      such: w(202, 'such'), machine202: w(202, 'machine'),
      answered: w(203, 'answered'), no: w(203, 'no'), decided: w(203, 'decided'),
      s204: L(204).start, drew: w(204, 'drew'), limit: w(204, 'limit'), everything: w(204, 'everything'), do204: w(204, 'do'),
      s205: L(205).start, computers: w(205, 'computers'),
      room: w(206, 'room-sized'), forties: w(206, 'forties'), phone: w(206, 'phone'), pocket: w(206, 'pocket'),
      data: w(206, 'data'), centres: w(206, 'centres'), ai: w(206, 'ai'), turing206: w(206, 'turing'), real: w(206, 'real'),
      paper: w(207, 'paper'), heads: w(207, 'heads'), physical: w(207, 'physical'), body: w(207, 'body'),
    };
    this.START = this.T.s194;
    this.FROM = this.START - 2.3;
  }
  render(g, t) {
    const T = this.T;
    ground(g, 'screen');
    actTitle(g, 'screen', t, this.START, 'ACT SIX', 'The machine');
    // thẻ mốc trượt lên khỏi khung khi băng lên trên (câu 205)
    const lift = outCubic(prog(t, T.s205 - 0.1, T.s205 + 0.7));
    g.save(); g.translate(0, -lift * 420);
    card(g, 'screen', prog(t, this.START - 0.2, this.START + 1.6), 'ACT SIX · THE MACHINE', '1936', 'Turing, an endless tape');
    ruler(g, 'screen', 1936, prog(t, this.START + 0.6, this.START + 1.6));
    g.restore();

    // ── 194–196: câu hỏi của Hilbert, dạng sơ đồ (trượt xuống khỏi khung ở "described") ──
    const fOut = outCubic(prog(t, T.described - 0.1, T.described + 0.5));
    if (fOut < 1) {
      g.save(); g.translate(0, fOut * 800);
      typed(g, 'HILBERT · ONE MORE QUESTION', 160, 480, prog(t, T.hilbert, T.question + 0.4), '500 22px "IBM Plex Mono"', E.accent);
      typed(g, 'any statement', 160, 662, prog(t, T.decide + 0.2, T.statement + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink);
      hand(g, seg(420, 648, 560, 648, 8), { w: 4, color: E.dim, seed: 3, k: prog(t, T.statement, T.statement + 0.4) });
      const kb = prog(t, T.mechanical - 0.1, T.procedure + 0.3), pinK = prog(t, T.pin, T.pin + 0.5);
      hand(g, [[580, 560], [900, 560], [900, 736], [580, 736], [580, 560]], { w: 4, color: pinK > 0 ? E.accent : E.ink, seed: 5, k: Math.max(kb, pinK) });
      typed(g, 'MECHANICAL PROCEDURE', 740, 780, prog(t, T.procedure, T.procedure + 0.6), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
      typed(g, '?', 740, 682, prog(t, T.decide, T.decide + 0.2), '800 92px "Archivo"', E.accent, { align: 'center' });
      const kq = prog(t, T.actually - 0.1, T.actually + 0.4);   // "what … actually is": khoanh dấu hỏi
      if (kq > 0) hand(g, Array.from({ length: 41 }, (_, i) => { const a = -Math.PI / 2 + i / 40 * Math.PI * 2.1; return [740 + 58 * Math.cos(a), 648 + 64 * Math.sin(a)]; }), { w: 4, color: E.accent, seed: 7, k: kq });
      const ko = prog(t, T.proved - 0.1, T.proved + 0.4);
      hand(g, seg(900, 610, 1020, 566, 6), { w: 4, color: E.dim, seed: 9, k: ko }); hand(g, seg(900, 690, 1020, 734, 6), { w: 4, color: E.dim, seed: 11, k: ko });
      typed(g, 'PROVABLE', 1040, 576, ko, '500 24px "IBM Plex Mono"', E.ink);
      typed(g, 'NOT PROVABLE', 1040, 744, ko, '500 24px "IBM Plex Mono"', E.ink);
      typed(g, 'CAMBRIDGE', 160, 900, prog(t, T.cambridge, T.cambridge + 0.4), '500 22px "IBM Plex Mono"', E.dim);
      g.restore();
    }
    // Turing (ảnh 16 tuổi, nhỏ): vào ở "Alan", ra ở câu 199; trở lại cùng Church ở câu 202, ra ở "answered"
    const lab = { name: 'Alan Turing', life: '1912–1954', note: 'PHOTOGRAPH, AGED 16' };
    const tOut1 = outCubic(prog(t, T.s199 - 0.1, T.s199 + 0.5));
    if (t >= T.alan - 0.3 && tOut1 < 1) { g.save(); g.translate(tOut1 * 600, 0); portrait(g, 'turing', 'screen', 1580, 80, 260, prog(t, T.alan - 0.3, T.alan + 0.4), { label: lab }); g.restore(); }
    const pOut2 = outCubic(prog(t, T.answered - 0.1, T.answered + 0.5));
    if (t >= T.s202 - 0.3 && pOut2 < 1) {
      g.save(); g.translate(pOut2 * 900, 0);
      portrait(g, 'turing', 'screen', 1580, 80, 260, prog(t, T.s202 - 0.3, T.s202 + 0.3), { label: lab });
      portrait(g, 'church', 'screen', 1290, 80, 260, prog(t, T.alonzo - 0.2, T.church + 0.4), { label: { name: 'Alonzo Church', life: '1903–1995' } });
      g.restore();
    }

    // ── 198–: băng vô tận, đầu đọc, bảng luật ──
    if (t < T.tape - 0.2) return;
    const Ty = 640 - 310 * lift;
    // u = số bước máy đã chạy (phần lẻ = đang trong bước): bước 1 diễn theo lời câu 199, rồi chạy đều từ "That's all"
    const u = t < T.moves ? 0 : t < T.thats ? 0.5 + 0.5 * prog(t, T.moves, T.moves + 0.5) : 1 + (t - T.thats) / DT;
    const s = Math.floor(u), f = u - s, A = sim(s), B = sim(s + 1), R = RULES[A.ri];
    const kt = prog(t, T.tape - 0.2, T.tape + 0.6);
    g.save(); g.strokeStyle = E.dim; g.lineWidth = 3;
    hand(g, seg(-10, Ty - 70, W + 10, Ty - 70, 40), { w: 3, color: E.dim, jit: 0.5, seed: 21, k: kt });
    hand(g, seg(-10, Ty + 70, W + 10, Ty + 70, 40), { w: 3, color: E.dim, jit: 0.5, seed: 23, k: kt });
    for (let i = 0; i <= NC; i++) { const a = T.divided + i * 0.04; hand(g, seg(X0 + i * CW, Ty - 70, X0 + i * CW, Ty + 70, 4), { w: 3, color: E.dim, jit: 0.4, seed: 30 + i, k: prog(t, a, a + 0.15) }); }
    g.restore();
    for (let i = 0; i < NC; i++) {
      const a = T.squares + 0.1 + i * 0.03, k0 = prog(t, a, a + 0.15);
      if (A.tape.has(i)) mark(g, cx(i), Ty, TAPE0.includes(i) ? k0 : 1, E.ink, i);
    }
    // vạch đang được viết (bước s+1) — màu nhấn, khắc vào
    const writing = R[2] === 1 && !A.tape.has(A.pos);
    if (writing && u >= 1) mark(g, cx(A.pos), Ty, prog(f, 0.15, 0.45), E.accent, 90 + s);
    // câu 199 "writes a mark": vạch dưới đầu đọc được viết lại bằng màu nhấn
    if (t >= T.writes && t < T.moves + 0.2) mark(g, cx(HEAD0), Ty, prog(t, T.writes, T.writes + 0.35), E.accent, 77);
    // đầu đọc
    const kh = prog(t, T.head - 0.1, T.head + 0.3);
    if (kh > 0) {
      const hx = cx(A.pos) + (cx(B.pos) - cx(A.pos)) * outCubic(prog(f, 0.5, 0.9)), q = f < 0.9 ? A.q : B.q;
      g.save(); g.translate(hx, Ty); g.scale(outBack(kh), outBack(kh));
      g.shadowColor = E.accent; g.shadowBlur = 14; g.strokeStyle = E.accent; g.lineWidth = 5; g.strokeRect(-CW / 2 - 6, -76, CW + 12, 152);
      g.fillStyle = E.accent; g.beginPath(); g.moveTo(0, -92); g.lineTo(-22, -130); g.lineTo(22, -130); g.fill(); g.shadowBlur = 0;
      g.font = '500 26px "IBM Plex Mono"'; g.textAlign = 'center'; g.fillText(SUB[q], 0, -146);
      const kr = prog(t, T.reads, T.reads + 0.3);     // "reads": vạch dưới ô được đọc
      if (kr > 0) { g.fillRect(-CW / 2 + 10, 86, (CW - 20) * kr, 6); }
      g.fillStyle = E.dim; g.font = '800 46px "Archivo"';
      if (t >= T.left) { g.textAlign = 'right'; g.fillText('←', -CW / 2 - 18, -104); }
      if (t >= T.right) { g.textAlign = 'left'; g.fillText('→', CW / 2 + 18, -104); }
      g.restore();
    }
    // bảng luật (ra cùng khung giới hạn ở câu 205)
    const down = outCubic(prog(t, T.s205 - 0.1, T.s205 + 0.6));
    if (t >= T.table - 0.2 && down < 1) {
      g.save(); g.translate(0, down * 600);
      const COL = [300, 420, 500, 580, 680, 780], HD = ['STATE', 'READ', '', 'WRITE', 'MOVE', 'NEXT'];
      HD.forEach((h, j) => typed(g, h, COL[j], 790, prog(t, T.table - 0.2, T.table + 0.3), '500 18px "IBM Plex Mono"', E.dim));
      RULES.forEach((r, i) => {
        const y = 830 + i * 40, k = prog(t, T.table + i * 0.15, T.rules + 0.2 + i * 0.15), on = u >= 1 && i === A.ri && f < 0.9;
        if (on) { g.fillStyle = 'rgba(242,201,76,0.16)'; g.fillRect(286, y - 28, 560, 38); }
        [SUB[r[0]], r[1] ? '|' : '·', '→', r[2] ? '|' : '·', r[3] > 0 ? 'R' : 'L', SUB[r[4]]].forEach((c, j) =>
          typed(g, c, COL[j], y, k, '500 24px "IBM Plex Mono"', on ? E.accent : E.ink));
      });
      // 202: luận đề — mọi thủ tục máy móc hữu hạn = một máy như thế này
      const cOut = outCubic(prog(t, T.answered - 0.2, T.answered + 0.3));
      g.save(); g.translate(0, cOut * 500);
      typed(g, 'any finite, mechanical procedure', 980, 840, prog(t, T.anything, T.procedure202 + 0.3), 'italic 600 44px "Cormorant Garamond"', E.ink);
      typed(g, '= a machine like this one', 980, 896, prog(t, T.such - 0.1, T.machine202 + 0.4), 'italic 600 44px "Cormorant Garamond"', E.accent);
      g.restore();
      // 203: NO · 204 rời khung
      const nOut = outCubic(prog(t, T.s204 - 0.1, T.s204 + 0.4));
      g.save(); g.translate(0, nOut * 600);
      g.save(); g.translate(1320, 862); g.scale(1.7, 1.7); stamp(g, 'NO', 0, 0, prog(t, T.no, T.no + 0.25), '800 64px "Archivo"', E.accent, { rot: -0.08 }); g.restore();
      typed(g, 'UNDECIDABLE', 1320, 975, prog(t, T.decided - 0.1, T.decided + 0.4), '500 26px "IBM Plex Mono"', E.accent, { align: 'center' });
      g.restore();
      // 204: giới hạn của mọi cỗ máy — khung quanh cả máy
      g.save(); g.shadowColor = E.accent; g.shadowBlur = 10;
      hand(g, [[96, 440], [1824, 440], [1824, 990], [96, 990], [96, 440]], { w: 3, color: E.accent, jit: 1, seed: 41, k: prog(t, T.drew, T.limit + 0.5) });
      g.restore();
      typed(g, 'EVERYTHING ANY MACHINE CAN EVER DO', 110, 425, prog(t, T.everything - 0.1, T.do204 + 0.2), '500 22px "IBM Plex Mono"', E.accent);
      g.restore();
    }

    // ── 205–207: những cỗ máy thật — mỗi cái nối vào băng ──
    if (t < T.computers - 0.3) return;
    photo(g, 'eniac', 'screen', 150, 480, 320, prog(t, T.computers - 0.3, T.computers + 0.3), { rot: -0.01 });
    typed(g, 'room-sized machines', 150, 870, prog(t, T.room, T.room + 0.5), 'italic 600 44px "Cormorant Garamond"', E.ink);
    typed(g, 'ENIAC, 1940s', 150, 904, prog(t, T.forties - 0.2, T.forties + 0.3), '500 20px "IBM Plex Mono"', E.dim);
    const kp = prog(t, T.phone - 0.1, T.phone + 0.35);
    if (kp > 0) {
      g.save(); g.translate(930, 640); g.scale(outBack(kp), outBack(kp));
      g.strokeStyle = E.ink; g.lineWidth = 5; g.beginPath(); g.roundRect(-75, -150, 150, 300, 22); g.stroke();
      g.strokeStyle = E.dim; g.lineWidth = 2; g.strokeRect(-56, -120, 112, 230);
      for (let i = 0; i < 3; i++) { g.strokeRect(-48 + i * 32, -20, 32, 44); if (i < 2 || (t * 2.5 | 0) % 2) { g.fillStyle = E.ink; g.fillRect(-34 + i * 32, -12, 4, 28); } }
      g.fillStyle = E.accent; g.fillRect(-48 + ((t * 2.5 | 0) % 3) * 32, 30, 32, 4);
      g.restore();
    }
    typed(g, 'in your pocket', 930, 870, prog(t, T.pocket - 0.1, T.pocket + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
    typed(g, 'PHONE', 930, 904, prog(t, T.phone, T.phone + 0.3), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
    for (let r = 0; r < 3; r++) {
      const a = T.data - 0.1 + r * 0.15, k = prog(t, a, a + 0.35); if (k <= 0) continue;
      const x = 1340 + r * 160, dy = (1 - outCubic(k)) * 300;
      g.save(); g.translate(0, dy); g.strokeStyle = E.ink; g.lineWidth = 4; g.strokeRect(x, 480, 130, 320);
      for (let j = 0; j < 9; j++) { g.strokeStyle = E.dim; g.lineWidth = 2; g.strokeRect(x + 10, 494 + j * 34, 110, 26);
        for (let l = 0; l < 3; l++) if (hash(r * 97 + j * 13 + l * 5 + Math.floor(t * 3)) > 0.55) { g.fillStyle = l ? E.ink : E.accent; g.fillRect(x + 92 - l * 14, 504 + j * 34, 8, 6); } }
      g.restore();
    }
    typed(g, 'data centres', 1600, 870, prog(t, T.centres - 0.1, T.centres + 0.4), 'italic 600 44px "Cormorant Garamond"', E.ink, { align: 'center' });
    typed(g, 'RUNNING MODERN AI', 1600, 904, prog(t, T.ai - 0.2, T.ai + 0.4), '500 20px "IBM Plex Mono"', E.dim, { align: 'center' });
    // "a Turing machine made real": nối từng cỗ máy lên băng
    [[360, 470], [930, 482], [1600, 470]].forEach(([x, y1], i) => { const a = T.turing206 + i * 0.15;
      g.save(); g.setLineDash([10, 10]); hand(g, seg(x, Ty + 74, x, y1, 6), { w: 3, color: E.accent, jit: 0, seed: 50 + i, k: prog(t, a, a + 0.35) }); g.restore(); });
    // 207: chỉ trên giấy và trong đầu người → một cơ thể vật lý
    typed(g, "ON PAPER · IN PEOPLE'S HEADS", 150, 985, prog(t, T.paper - 0.1, T.heads + 0.3), '500 22px "IBM Plex Mono"', E.dim);
    hand(g, seg(140, 977, 560, 977, 10), { w: 4, color: E.accent, jit: 1, seed: 61, k: prog(t, T.physical - 0.2, T.physical + 0.2) });
    typed(g, 'A PHYSICAL BODY', 640, 990, prog(t, T.physical, T.body + 0.3), '800 46px "Archivo"', E.accent);
  }
}
