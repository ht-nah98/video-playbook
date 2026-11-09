// Ván mở đầu「1時間 vs 1000時間」(a0 ⓪) — chơi THẬT bằng slide/spawn của kit.js, ghi hướng đi ra data/opening.js (module — cảnh import thẳng).
//   node projects/ja/2048/data/opening.mjs
// Phải (1000時間): cách của người chơi giỏi (DNA d1) — giữ quân lớn ở góc trên-trái, xếp rắn; chọn nước bằng
// expectimax 1–3 tầng (sâu hơn khi bàn chật) (trung bình trên MỌI quân mới có thể rơi). Quân mới thật vẫn rơi theo hash như mọi cảnh khác.
// Trái (1時間): kit.play bấm bừa (seed khác nhau) — chỉ chọn seed, không ghi hướng.
// Cảnh đọc lại bằng slide + spawn và must() từng bước → dữ liệu không khớp luật thì render chết.
import { slide, spawn, SNAKE } from '../kit.js';
import { play } from '../kit.js';
import { writeFileSync } from 'node:fs';

const empties = c => c.flat().filter(v => !v).length;
const W8 = SNAKE.map((_, i) => 4 ** (15 - i) / 4 ** 15);           // trọng số rắn từ góc trên-trái
function score(c) {
  let s = 0; SNAKE.forEach(([r, k], i) => { s += c[r][k] * W8[i]; });
  return s + empties(c) * 0.02 * Math.max(...c.flat());
}
function chance(c, depth) {                                       // trung bình trên mọi quân mới (2: 0.9, 4: 0.1)
  const E = []; c.forEach((row, r) => row.forEach((v, k) => { if (!v) E.push([r, k]); }));
  if (!E.length) return score(c);
  let tot = 0;
  for (const [r, k] of E) for (const [v, p] of [[2, 0.9], [4, 0.1]]) {
    const n = c.map(x => x.slice()); n[r][k] = v; tot += p * (depth ? best(n, depth - 1)[1] : score(n));
  }
  return tot / E.length;
}
function best(c, depth) {
  let b = [null, -1];
  for (const d of 'ULRD') { const r = slide(c, d); if (!r.moved) continue; const v = chance(r.cells, depth); if (v > b[1]) b = [d, v]; }
  return b[0] ? b : [null, score(c) * 0.01];          // hết nước: phạt nặng
}

const SEED = +(process.argv[2] || 7), N = +(process.argv[3] || 4000);
let cur = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]];
const start = cur.map(r => r.slice()), dirs = []; let peak = 0;
for (let s = 0; s < N; s++) {
  const e = empties(cur), [d] = best(cur, e > 7 ? 0 : e > 3 ? 1 : 2);
  if (!d) break;
  cur = spawn(slide(cur, d).cells, SEED * 100000 + s).cells; dirs.push(d);
  const m = Math.max(...cur.flat()); if (m > peak) peak = m;
  if (m >= 2048) break;                                         // dừng đúng lúc 2048 thành hình
}
// trái: seed bấm bừa chết nhanh với quân lớn nhất 64–256
const left = [];
for (let sd = 1; left.length < 4 && sd < 500; sd++) {
  const r = play([[0, 0, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]], 400, { seed: 300 + sd });
  const m = Math.max(...r.at(-1).cells.flat());
  if (r.at(-1).over && m >= 64 && m <= 256 && r.length < 160) left.push({ seed: 300 + sd, moves: r.length, max: m });
}
console.log({ seed: SEED, moves: dirs.length, peak, left });
writeFileSync(new URL('./opening.js', import.meta.url), '// sinh bởi data/opening.mjs — đừng sửa tay\nexport default ' +
  JSON.stringify({ seed: SEED, start, dirs: dirs.join(''), peak, left: left.map(l => l.seed) }) + ';\n');
