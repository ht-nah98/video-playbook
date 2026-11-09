import { test } from 'node:test';
import assert from 'node:assert/strict';
import { line, reflectPoint, mirrorMatrix, side, foldMatrix } from '../../engine/mirror.js';

const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);
const L = line(0, 0, 1, 1);                       // y = x trong toạ độ toán

test('(0,1) ↔ (1,0) qua y = x', () => {
  assert.ok(near(reflectPoint([0, 1], L), [1, 0]));
});

test('phản chiếu hai lần = giữ nguyên', () => {
  const S = line(420, 1080, 1500, 0);
  const p = [300, 200];
  assert.ok(near(reflectPoint(reflectPoint(p, S), S), p));
});

test('điểm trên gương đứng yên và side = 0', () => {
  const S = line(420, 1080, 1500, 0);
  assert.ok(near(reflectPoint([960, 540], S), [960, 540]));
  assert.equal(side([960, 540], S), 0);
});

test('side: góc dưới-phải là +1 (nửa đi xuôi), góc trên-trái là -1', () => {
  const S = line(420, 1080, 1500, 0);
  assert.equal(side([1900, 1070], S), 1);
  assert.equal(side([20, 20], S), -1);
});

test('mirrorMatrix cho cùng kết quả với reflectPoint', () => {
  const S = line(420, 1080, 1500, 0), [a, b, c, d, e, f] = mirrorMatrix(S), [x, y] = [123, 456];
  assert.ok(near([a * x + c * y + e, b * x + d * y + f], reflectPoint([x, y], S)));
});

test('đường suy biến (hai điểm trùng) không sinh NaN — trả điểm nguyên', () => {
  const D = line(5, 5, 5, 5);
  const r = reflectPoint([1, 2], D);
  assert.ok(r.every(Number.isFinite));
  assert.ok(near(r, [1, 2]));
});

test('foldMatrix: c = 1 là đơn vị, c = −1 trùng mirrorMatrix', () => {
  const S = line(420, 1080, 1500, 0);
  assert.ok(near(foldMatrix(S, 1), [1, 0, 0, 1, 0, 0]));
  assert.ok(near(foldMatrix(S, -1), mirrorMatrix(S)));
});

test('foldMatrix: c = 0 ép mọi điểm lên gương; điểm trên gương đứng yên', () => {
  const S = line(420, 1080, 1500, 0);
  const [a, b, c, d, e, f] = foldMatrix(S, 0);
  const ap = ([x, y]) => [a * x + c * y + e, b * x + d * y + f];
  assert.equal(side(ap([300, 200]), S), 0);
  assert.ok(near(ap([960, 540]), [960, 540]));
});

test('foldMatrix: gương suy biến → đơn vị, không NaN', () => {
  assert.ok(near(foldMatrix(line(5, 5, 5, 5), 0), [1, 0, 0, 1, 0, 0]));
});
