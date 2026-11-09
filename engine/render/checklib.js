// Phần thuần của `shoot.js check` — tách ra để unit test (tools/test/checklib.test.mjs).
// Không chạm pixel: chỉ chọn mốc, băm, gom lỗi.

// Băm điểm ảnh: hai làn FNV-1a 32 bit trên từng word RGBA → 16 ký tự hex. Hàm này được chuỗi hoá
// (`pixelHash.toString()`) và chạy TRONG trang, nên không được dùng biến ngoài.
function pixelHash(data) {
  const u = new Uint32Array(data.buffer, data.byteOffset, data.byteLength >> 2);
  let a = 0x811c9dc5, b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < u.length; i++) {
    a = Math.imul(a ^ u[i], 0x01000193) >>> 0;
    b = Math.imul(b ^ (u[i] + i), 0x01000193) >>> 0;
  }
  return a.toString(16).padStart(8, '0') + b.toString(16).padStart(8, '0');
}

// Mốc lấy mẫu: 0, step, 2·step… < dur, làm tròn về khung (n/fps) để khớp đúng khung render.
function sampleTimes(dur, step, fps) {
  if (!(step > 0)) throw new Error('--hash cần bước > 0');
  const out = [];
  for (let i = 0; ; i++) {
    const n = Math.round(i * step * fps);
    if (n / fps >= dur) break;
    if (out.at(-1) !== n / fps) out.push(n / fps);   // bước < 1 khung → bỏ mốc trùng
  }
  return out;
}

// Vài mốc rải đều để chụp lại theo thứ tự NGƯỢC (xuôi = ngược → tất định).
function reversePick(times, k = 8) {
  if (times.length <= k) return times.slice().reverse();
  const out = [];
  for (let j = 0; j < k; j++) out.push(times[Math.round((times.length - 1) * j / (k - 1))]);
  return [...new Set(out)].reverse();
}

// Gom khung lỗi liền nhau cùng thông báo thành một dải: [{from, to, n, msg}].
function groupErrors(errs, fps) {
  const out = [];
  for (const [t, msg] of errs) {
    const g = out.at(-1);
    if (g && g.msg === msg && Math.abs(t - g.to - 1 / fps) < 1e-6) { g.to = t; g.n++; }
    else out.push({ from: t, to: t, n: 1, msg });
  }
  return out;
}

const key = t => t.toFixed(3);

module.exports = { pixelHash, sampleTimes, reversePick, groupErrors, key };
