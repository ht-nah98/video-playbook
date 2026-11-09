// Dựng lại engine/poses-sport.js từ nguồn lemo-opuscar (LemoLab, MIT — docs/study/11). ~/lemo-opuscar của plugin là bản
// clone THƯA (không có demo/) → clone đầy đủ vào một thư mục riêng (dữ liệu tải về, không chạy từ trong đó):
//   git clone https://github.com/lemomo-ai/lemo-opuscar <dir>          (bản đã chuyển: commit 3961ddb)
//   node tools/lab/picto-extract.mjs <dir>/styles/pictogram-motion/demo > sport.json
// Chạy engine.js + poses/*.js trong vm cô lập (window giả), lấy pose(iconU) — khoảnh khắc làm icon của môn — rồi đổi góc
// sang quy ước engine/stick.js (độ, đo từ thẳng xuống, 90° = trước):
//   lean = rot + torso · sh = a1 + lean (tay: khung thân → thế giới) · el = a2 − a1 (cẳng tay tuyệt đối → khuỷu tương đối)
//   hip = l1 + rot · kn = l1 − l2 · dx = x, dy = y (dời hông, phần chiều cao)
// Góc cộng dồn vòng (|a| > 360) đưa về (−180, 180]. Hình chính bị giấu (|x| ≥ 10, vd. highjump: icon do hình lật gương
// trong front() vẽ) → báo, không xuất — mục đó sửa tay trong engine/poses-sport.js (LESSONS §154).
import fs from 'fs'; import vm from 'vm'; import path from 'path';
const dir = process.argv[2];
if (!dir) { console.error('Dùng: node tools/lab/picto-extract.mjs <lemo-opuscar>/styles/pictogram-motion/demo'); process.exit(2); }
const ctx = { window: {}, console, Math };
ctx.window.window = ctx.window; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
run('engine.js');
for (const f of ['base.js', 'ath.js', 'aqua.js', 'ball.js', 'combat.js', 'power.js', 'nature.js', 'asia.js']) run('poses/' + f);
const wrap = a => (Math.abs(a) > 360 ? ((a % 360) + 540) % 360 - 180 : a), r2 = x => Math.round(x * 100) / 100;
const out = {};
for (const [k, v] of Object.entries(ctx.window.POSES)) {
  const u = v.iconU ?? 0.5, p = typeof v.pose === 'function' ? v.pose(u) : ctx.window.G.keyPose(v.keys, u, v.loop);
  if (Math.abs(p.x ?? 0) >= 10) { console.error(`⚠ ${k}: hình chính bị giấu (x = ${p.x}) — sửa tay`); continue; }
  const z = n => p[n] ?? 0, rot = z('rot'), lean = rot + z('torso');
  const s = { lean, head: z('head'), shR: z('aR1') + lean, elR: z('aR2') - z('aR1'), shL: z('aL1') + lean, elL: z('aL2') - z('aL1'),
    hipR: z('lR1') + rot, knR: z('lR1') - z('lR2'), hipL: z('lL1') + rot, knL: z('lL1') - z('lL2') };
  for (const n in s) s[n] = r2(wrap(s[n]));
  out[k] = { ...s, dy: r2(z('y') * 1e4) / 1e4, dx: r2(z('x')), ...(v.second ? { _second: true } : {}) };
}
console.log(JSON.stringify(out));
