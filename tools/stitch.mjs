#!/usr/bin/env node
// Ghép các đoạn render riêng thành một video, KHÔNG mã hoá lại hình, gắn audio cả bài MỘT lần.
//
// Vì sao ghép được: mỗi khung là hàm thuần của t và shoot.js đánh số khung round(t·fps),
// nên hai đoạn cắt ở cùng một mốc nối liền nhau, không trùng không hụt khung.
// Hai chỗ dễ sai mà công cụ này chặn:
//   1. audio: mỗi đoạn tự mang audio → chỗ nối có tiếng tách / lệch mồi AAC. Ở đây bỏ audio
//      của các đoạn, cắt audio gốc đúng [đầu, cuối] tổng rồi gắn một lần.
//   2. chép luồng (-c copy) chỉ cắt đúng ở KHUNG KHOÁ: điểm vào của mỗi đoạn (trừ đầu file)
//      phải trùng một keyframe của file đó, không thì dừng và in các keyframe gần nhất.
// Nhớ kiểm trước: code cho khoảng thời gian lấy từ bản cũ không được đổi (so md5 ảnh chụp).
//
// Dùng: node tools/stitch.mjs --audio projects/mv/exp-log/audio/song.m4a --out out/mv/exp-log/x.mp4 \
//          out/mv/exp-log/parts/0-33.233333.mp4@0:0:33.233333  out/mv/exp-log/parts/33.233333-64.32.mp4@33.233333:33.233333:64.32
//       Thường không gọi tay: tools/render.sh final <p> tự lập danh sách này từ out/<p>/parts/.
//       mỗi đoạn = file@<mốc bài lúc file bắt đầu>:<lấy từ>:<lấy tới> (giây, theo thời gian bài)
if (['-h', '--help'].includes(process.argv[2])) { console.log((await import('fs')).readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1).join('\n').match(/^(\/\/.*(\n|$))+/)[0].replace(/^\/\/ ?/gm, '').trimEnd()); process.exit(0); }
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

/**
 * Thuần: kiểm các đoạn và lập kế hoạch cắt. keyframes[file] = mốc khung khoá (giây, trong file),
 * frames[file] = tổng số khung của file. Chép luồng chỉ cắt đúng khi cả điểm vào LẪN điểm ra
 * rơi vào khung khoá (hoặc đầu/cuối file): GOP đóng của x264 → các gói trước một IDR theo thứ tự
 * giải mã đúng là các khung đứng trước nó. (outpoint của concat demuxer lấy thừa khung — đã thử.)
 * Trả về { segs: [{ file, ss, n }], t0, dur }: mỗi đoạn = n khung kể từ giây ss của file.
 */
export function planStitch(parts, keyframes, frames, fps = 60) {
  const fr = (s) => Math.round(s * fps);
  if (!parts.length) throw new Error('stitch: không có đoạn nào');
  const segs = parts.map((p, i) => {
    if (fr(p.to) <= fr(p.from)) throw new Error(`stitch: đoạn ${i + 1} rỗng (${p.from} → ${p.to})`);
    if (fr(p.from) < fr(p.start)) throw new Error(`stitch: đoạn ${i + 1} lấy từ ${p.from} trước lúc file bắt đầu ${p.start}`);
    if (i > 0 && fr(p.from) !== fr(parts[i - 1].to))
      throw new Error(`stitch: đoạn ${i} kết thúc khung ${fr(parts[i - 1].to)} nhưng đoạn ${i + 1} bắt đầu khung ${fr(p.from)} — phải liền nhau`);
    const inF = fr(p.from) - fr(p.start), outF = fr(p.to) - fr(p.start), total = frames[p.file];
    if (total !== undefined && outF > total) throw new Error(`stitch: đoạn ${i + 1} lấy tới khung ${outF} nhưng ${p.file} chỉ có ${total}`);
    const keys = (keyframes[p.file] || []).map(fr);
    const near = (f) => keys.filter(k => Math.abs(k - f) < 6 * fps).map(k => ((k + fr(p.start)) / fps).toFixed(6)).join(', ');
    if (inF > 0 && !keys.includes(inF))
      throw new Error(`stitch: điểm vào ${p.from} của ${p.file} không phải khung khoá; khung khoá gần (mốc bài): ${near(inF)}`);
    if (outF !== total && !keys.includes(outF))
      throw new Error(`stitch: điểm ra ${p.to} của ${p.file} không phải khung khoá hay cuối file; khung khoá gần (mốc bài): ${near(outF)}`);
    return { file: p.file, ss: inF / fps, n: outF - inF };
  });
  return { segs, t0: fr(parts[0].from) / fps, dur: (fr(parts.at(-1).to) - fr(parts[0].from)) / fps };
}

function keyframesOf(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'packet=pts_time,flags',
    '-of', 'csv=p=0', file]).toString();
  return out.split('\n').filter(l => l.includes('K')).map(l => +l.split(',')[0]);
}

function framesOf(file) {
  return +execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-count_packets', '-show_entries', 'stream=nb_read_packets',
    '-of', 'csv=p=0', file]).toString().trim();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2), opt = (k) => { const i = args.indexOf(`--${k}`); return i < 0 ? null : args.splice(i, 2)[1]; };
  const audio = opt('audio'), out = opt('out'), fps = +(opt('fps') || 60);
  if (!audio || !out || !args.length) { console.error('dùng: node tools/stitch.mjs --audio A --out O file@start:from:to …'); process.exit(2); }
  const parts = args.map(a => { const [file, rest] = a.split('@'); const [start, from, to] = rest.split(':').map(Number); return { file, start, from, to }; });
  const kf = Object.fromEntries(parts.map(p => [p.file, keyframesOf(p.file)]));
  const nf = Object.fromEntries(parts.map(p => [p.file, framesOf(p.file)]));
  const { segs, t0, dur } = planStitch(parts, kf, nf, fps);
  const dir = mkdtempSync(path.join(tmpdir(), 'stitch-'));
  const files = segs.map((s, i) => {
    const f = path.join(dir, `seg${i}.mp4`);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', s.ss.toFixed(6), '-i', s.file, '-map', '0:v', '-c', 'copy', '-frames:v', String(s.n), f]);
    return f;
  });
  const list = path.join(dir, 'list.txt');
  writeFileSync(list, files.map(f => `file '${f}'`).join('\n') + '\n');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-ss', String(t0), '-t', String(dur), '-i', audio,
    '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    ...(t0 === 0 ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '256k']), '-shortest',   // từ 0: giữ AAC gốc, không nén thế hệ hai
    '-movflags', '+faststart', out], { stdio: 'inherit' });
  console.log(`xong: ${out} (${dur.toFixed(3)}s từ mốc ${t0.toFixed(3)})`);
}
