#!/usr/bin/env node
// Kiểm mọi mốc thời gian trong các cảnh nằm đúng cửa sổ cảnh của nó.
// Bắt CẢ BA dạng — dạng mảng từng làm một cảnh mất sạch chữ mà không báo lỗi:
//   const T_CUT = 7.58        prog(t, 7.58, 7.9)        ['Why', 15.65]
//
// Dùng: node tools/check-timing.mjs projects/mv/99-intro
//
// CHỈ cho project khai mốc cảnh bằng tay trong song.js (`export const P`, kiểu 99-intro). Project từ exp-log trở đi
// tra mốc lời theo chữ qua data/timeline.json (tl.at) — không có P để kiểm; dùng tools/qa/seams.py + NHÌN ảnh.
if (['-h', '--help'].includes(process.argv[2])) { console.log((await import('fs')).readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1).join('\n').match(/^(\/\/.*(\n|$))+/)[0].replace(/^\/\/ ?/gm, '').trimEnd()); process.exit(0); }
import { readFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';

const proj = process.argv[2] || 'projects/mv/99-intro';
const { P } = await import(resolve(proj, 'song.js'));
if (!P) { console.log(`${proj}: song.js không khai P (mốc tra theo timeline) — công cụ này chỉ cho kiểu 99-intro. Dùng tools/qa/seams.py.`); process.exit(0); }

const keys = Object.keys(P).filter(k => k !== 'end');
const plates = readdirSync(resolve(proj, 'plates')).filter(f => f.endsWith('.js')).sort();
if (plates.length !== keys.length) {
  console.log(`CẢNH BÁO: ${keys.length} mốc trong song.js nhưng ${plates.length} file trong plates/`);
}

const TOL = 0.45;
let bad = 0;
for (let i = 0; i < keys.length; i++) {
  const a = P[keys[i]];
  const b = i + 1 < keys.length ? P[keys[i + 1]] : P.end;
  const f = plates[i];
  if (!f) continue;
  const src = readFileSync(resolve(proj, 'plates', f), 'utf8');
  const lines = src.split('\n');
  // CHỈ bắt số có phần thập phân (mốc thời gian luôn viết 7.58, không phải 7).
  // Số nguyên như `RING = 4`, `pCut < 1` là hằng số toán — bỏ qua.
  const re = /(?:const [A-Z][A-Z0-9_]*\s*=\s*|prog\(\s*t\s*,\s*|t\s*>=\s*|t\s*<\s*|\[\s*'[^']*'\s*,\s*)(\d+\.\d+)/g;
  let m;
  while ((m = re.exec(src))) {
    const v = parseFloat(m[1]);
    if (v < 0.9 || v > P.end + 0.5) continue;   // ngoài dải thời gian bài hát
    if (v >= a - TOL && v <= b + TOL) continue;
    const ln = src.slice(0, m.index).split('\n').length;
    console.log(`  ${f}:${ln}  ${v.toFixed(2)}  ngoài [${a.toFixed(2)}, ${b.toFixed(2)}]`);
    console.log(`     ${lines[ln - 1].trim().slice(0, 76)}`);
    bad++;
  }
}
console.log(bad === 0 ? 'OK — mọi mốc nằm đúng cửa sổ cảnh' : `THẤT BẠI — ${bad} mốc lệch`);
process.exit(bad === 0 ? 0 : 1);
