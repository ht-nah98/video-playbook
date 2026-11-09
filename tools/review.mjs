#!/usr/bin/env node
// Tự chấm một bản render theo các ngưỡng rút từ video mẫu + pdoom.
// Dùng: node tools/review.mjs out/<p>/<p>.mp4 [projects/<p>]
//
// Ngưỡng ở docs/mv/VISUAL-RESEARCH.md. Chỉ số nào FAIL thì in cách sửa.
if (['-h', '--help'].includes(process.argv[2])) { console.log((await import('fs')).readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1).join('\n').match(/^(\/\/.*(\n|$))+/)[0].replace(/^\/\/ ?/gm, '').trimEnd()); process.exit(0); }
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const video = process.argv[2];
const proj = process.argv[3] || 'projects/mv/99-intro';
if (!video || !existsSync(video)) { console.log('Dùng: node tools/review.mjs <video.mp4> [project]'); process.exit(1); }

// ---- đo ----
const raw = execSync(
  `ffmpeg -hide_banner -i "${video}" -vf "scale=640:360,signalstats,metadata=print:file=-" -an -f null - 2>/dev/null` +
  ` | grep -oP 'lavfi.signalstats.(YAVG|YDIF|SATAVG|HUEAVG)=\\K[0-9.-]+'`,
  { shell: '/bin/bash', maxBuffer: 64 << 20 }).toString().trim().split('\n').map(Number);

const Y = raw.filter((_, i) => i % 4 === 0);
const S = raw.filter((_, i) => i % 4 === 1);
const D = raw.filter((_, i) => i % 4 === 3);
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length * p / 100)]; };
const med = a => pct(a, 50);
const dur = +execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${video}"`).toString();
const mb = +execSync(`stat -c %s "${video}"`).toString() / 1048576;

// ---- các phép kiểm ----
const checks = [];
const add = (name, val, ok, want, fix) => checks.push({ name, val, ok, want, fix });

// p5–p95, KHÔNG p10–p90: cảnh đảo nền thường chỉ chiếm 8% thời lượng nên
// không lọt vào p90 — đo bằng p90 sẽ báo "chưa đạt" trên một video đã đạt.
const amp = pct(Y, 95) - pct(Y, 5);
add('Biên độ độ sáng', amp.toFixed(1), amp >= 90, '≥ 90 (p95−p5)',
    'Thêm cảnh ĐẢO NỀN (nền sáng, chữ tối) — xem docs/mv/VISUAL-RESEARCH.md §2');

const brightPct = 100 * Y.filter(v => v > 120).length / Y.length;
add('Thời lượng nền sáng', brightPct.toFixed(1) + '%', brightPct >= 6 && brightPct <= 20, '6–20%',
    brightPct < 6 ? 'Thiếu cảnh đảo nền. Video mẫu 15%, pdoom 8%.'
                  : 'Quá nhiều nền sáng — mất tương phản với phần tối.');

add('Độ sáng trung vị', med(Y).toFixed(1), med(Y) >= 30, '≥ 30',
    'Khung quá tối/trống. Bật lớp backdrop, hoặc tăng alpha lưới/công thức.');

// Đo ở 640×360, KHÔNG 160×90: ở 160×90 chữ và nét mảnh bị nuốt hoàn toàn
// (bản này đo 0.27 ở 160×90 nhưng 0.65 ở 640×360). Ngưỡng lấy theo pdoom 3.04.
add('YDIF trung vị', med(D).toFixed(2), med(D) >= 1.5, '≥ 1.5 (pdoom 3.04)',
    'Hình quá tĩnh: thiếu camera dịch chuyển, thiếu vật thể lớn đổi chỗ.\n' +
    '    Không sửa bằng rung — sửa bằng cho hình LỚN chuyển động có nghĩa.');

add('Bão hoà', med(S).toFixed(1), med(S) >= 3 && med(S) <= 16, '3–16',
    med(S) < 3 ? 'Màu quá nhợt.' : 'Màu quá rực — kênh dùng bảng màu kỷ luật.');

const mbps = mb * 8 / dur;
add('Bitrate', mbps.toFixed(1) + ' Mbps', mbps >= 2 && mbps <= 9, '2–9 Mbps',
    mbps > 9 ? 'Quá nặng — thường do hạt nhấp nháy độc lập (nhiễu, x264 không nén được).'
             : 'Quá nhẹ — có thể khung quá trống.');

// ---- % pixel đổi giữa hai khung liên tiếp ----
// Đáng tin hơn YDIF: YDIF là trung bình toàn khung nên một lớp nền mờ trượt
// qua không làm nó nhúc nhích. Xem docs/mv/VISUAL-RESEARCH.md § 8.
try {
  const tmp = '/tmp/_rev_' + process.pid;
  const fps = +execSync(`ffprobe -v error -select_streams v -show_entries stream=r_frame_rate -of csv=p=0 "${video}"`)
                .toString().trim().split('/').reduce((a, b) => a / b);
  const t0 = dur * 0.42;
  execSync(`mkdir -p ${tmp}`, { shell: '/bin/bash' });
  execSync(`ffmpeg -v error -y -ss ${t0.toFixed(4)} -i "${video}" -frames:v 1 ${tmp}/f1.png`, { shell: '/bin/bash' });
  execSync(`ffmpeg -v error -y -ss ${(t0 + 1/fps).toFixed(4)} -i "${video}" -frames:v 1 ${tmp}/f2.png`, { shell: '/bin/bash' });
  const pc = execSync(`python3 -c "
from PIL import Image, ImageChops
import numpy as np
a=Image.open('${tmp}/f1.png').convert('L'); b=Image.open('${tmp}/f2.png').convert('L')
d=np.array(ImageChops.difference(a,b))
print('%.1f' % (100*(d>2).mean()))"`, { shell: '/bin/bash' }).toString().trim();
  execSync(`rm -rf ${tmp}`);
  const v = +pc;
  add('% pixel đổi/frame', v.toFixed(1) + '%', v >= 15, '≥ 15% (mẫu 32%)',
      'Khung quá tĩnh. Cần lớp chuyển động LỚN, tương phản cao — không phải nền mờ trượt.');
} catch (e) { /* PIL không có thì bỏ qua */ }

// ---- khớp lời (nếu có music.json) ----
const mj = resolve(proj, 'data/music.json');
if (existsSync(mj)) {
  const m = JSON.parse(readFileSync(mj, 'utf8'));
  const sj = resolve(proj, 'song.js');
  if (existsSync(sj)) {
    const { P = {} } = await import(sj);   // exp-log không có P: mốc lấy từ timeline.json
    const keys = Object.keys(P).filter(k => k !== 'end');
    let worst = 0, worstName = '';
    for (const k of keys) {
      const t = P[k];
      const near = Math.min(...m.words.map(w => Math.abs(w.start - t)),
                            ...m.onsets.kick.map(x => Math.abs(x - t)));
      if (near > worst) { worst = near; worstName = k; }
    }
    add('Lệch mốc cảnh lớn nhất', (worst * 1000).toFixed(0) + ' ms (' + worstName + ')',
        worst < 0.12, '< 120 ms',
        'Mốc cảnh không rơi vào từ hát hay cú kick. Dùng vox.wordAt() thay vì gõ số.');
  }
}

// ---- in ----
const W = 26;
console.log(`\n  ${video}  —  ${dur.toFixed(2)}s, ${mb.toFixed(1)} MB\n`);
console.log('  ' + 'CHỈ SỐ'.padEnd(W) + 'ĐO ĐƯỢC'.padEnd(16) + 'MỤC TIÊU'.padEnd(20) + 'KẾT QUẢ');
console.log('  ' + '─'.repeat(74));
let fail = 0;
for (const c of checks) {
  if (!c.ok) fail++;
  console.log('  ' + c.name.padEnd(W) + String(c.val).padEnd(16) + c.want.padEnd(20) + (c.ok ? 'ĐẠT' : 'CHƯA ĐẠT'));
}
console.log();
if (fail) {
  console.log('  ── CẦN SỬA ──');
  for (const c of checks) if (!c.ok) console.log(`  • ${c.name}: ${c.fix}`);
  console.log();
}
console.log(fail === 0 ? '  ✓ Đạt toàn bộ ngưỡng kỹ thuật.\n'
                       : `  ${fail}/${checks.length} chỉ số chưa đạt.\n`);
console.log('  Lưu ý: đây chỉ là ngưỡng KỸ THUẬT. Chúng không đo được hình ảnh có');
console.log('  NGHĨA hay không — bản v2 đạt YDIF vượt video mẫu mà vẫn bị bác bỏ.');
console.log('  Luôn chụp ảnh từng cảnh và NHÌN.\n');
process.exit(fail ? 1 : 0);
