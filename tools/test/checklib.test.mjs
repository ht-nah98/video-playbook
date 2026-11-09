import { test } from 'node:test';
import assert from 'node:assert/strict';
import lib from '../../engine/render/checklib.js';
const { pixelHash, sampleTimes, reversePick, groupErrors, key } = lib;

test('sampleTimes: 0, step, … < dur, làm tròn về khung', () => {
  assert.deepEqual(sampleTimes(6, 2, 60), [0, 2, 4]);
  assert.deepEqual(sampleTimes(0.2, 0.025, 60).map(key), ['0.000', '0.033', '0.050', '0.083', '0.100', '0.133', '0.150', '0.183']); // 1.5 khung → làm tròn, bỏ trùng
  assert.throws(() => sampleTimes(5, 0, 60), /bước/);
});

test('reversePick: rải đều, gồm hai đầu, thứ tự ngược, không trùng', () => {
  const ts = Array.from({ length: 100 }, (_, i) => i * 2);
  const r = reversePick(ts, 5);
  assert.deepEqual(r, [198, 148, 100, 50, 0]);
  assert.deepEqual(reversePick([0, 2], 8), [2, 0]);
});

test('pixelHash: tất định, đổi một điểm ảnh là đổi băm, 16 hex', () => {
  const a = new Uint8ClampedArray(64 * 36 * 4).fill(7), b = a.slice();
  assert.match(pixelHash(a), /^[0-9a-f]{16}$/);
  assert.equal(pixelHash(a), pixelHash(a.slice()));
  b[4 * 100 + 2] = 8;
  assert.notEqual(pixelHash(a), pixelHash(b));
});

test('pixelHash chạy được khi chuỗi hoá (trong trang không có biến ngoài)', () => {
  const f = new Function(`return (${pixelHash.toString()})`)();
  const a = new Uint8ClampedArray(16).fill(3);
  assert.equal(f(a), pixelHash(a));
});

test('groupErrors: khung liền nhau cùng lỗi gộp thành dải, khác lỗi / có khe thì tách', () => {
  const e = [[1, 'x'], [1 + 1 / 60, 'x'], [1 + 2 / 60, 'y'], [2, 'y']];
  const g = groupErrors(e, 60);
  assert.equal(g.length, 3);
  assert.deepEqual(g.map(x => [x.n, x.msg]), [[2, 'x'], [1, 'y'], [1, 'y']]);
});
