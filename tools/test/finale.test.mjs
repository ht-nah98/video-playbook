import { test } from 'node:test';
import assert from 'node:assert/strict';
import { along, EQUATIONS } from '../../projects/mv/exp-log/finale.js';
import { G } from '../../projects/mv/exp-log/chorus2.js';
import { MIRROR } from '../../projects/mv/exp-log/song.js';
import { reflectPoint, mirrorMatrix } from '../../engine/mirror.js';

const near = (a, b, e = 1e-9) => a.every((v, i) => Math.abs(v - b[i]) < e);

test('along: d > 0 nằm phía vàng (x + y < 1500), cách gương đúng d', () => {
  for (const s of [-0.3, 0, 0.5, 1.2]) {
    const [x, y] = along(s, 330), dist = (1500 - (x + y)) / Math.SQRT2;
    assert.ok(Math.abs(dist - 330) < 1e-9, `s=${s}: ${dist}`);
  }
  assert.ok(near(along(0.5), [960, 540]));                         // giữa gương = tâm khung
});

test('dây nối: ảnh của (u, 2^u) qua gương màn hình là (2^u, u) — đường log', () => {
  for (const u of [-2, -0.5, 0, 1, 2]) assert.ok(near(reflectPoint(G(u, 2 ** u), MIRROR), G(2 ** u, u), 1e-6));
});

test('thẻ rơi chạm gương bật ngang sang trái: (0, 1) → (−1, 0)', () => {
  const [a, b, c, d] = mirrorMatrix(MIRROR), v = [0, 1];
  assert.ok(near([a * v[0] + c * v[1], b * v[0] + d * v[1]], [-1, 0], 1e-9));
});

test('tia mặt trời: các đẳng thức số đều đúng', () => {
  const close = (x, y, e) => Math.abs(x - y) < e;
  assert.ok(EQUATIONS.includes('2^√2 ≈ 2.665') && close(2 ** Math.SQRT2, 2.665, 5e-4));
  assert.ok(EQUATIONS.includes('1.07¹⁰·² ≈ 2') && close(1.07 ** 10.2, 2, 0.01));
  assert.ok(EQUATIONS.includes('log₁.₀₇ 2 ≈ 10.2') && close(Math.log(2) / Math.log(1.07), 10.2, 0.05));
  assert.ok(EQUATIONS.includes('2¹⁰ = 1024') && 2 ** 10 === 1024);
});
