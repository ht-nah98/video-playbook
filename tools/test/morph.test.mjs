import { test } from 'node:test';
import assert from 'node:assert/strict';
import { morphPoint, squarePoints } from '../../engine/morph.js';

const near = (a, b, e = 1e-9) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;

test('morphPoint: k = 0 ở nguồn, k = 1 ở đích, với mọi hạt', () => {
  for (let i = 0; i < 200; i++) {
    assert.ok(near(morphPoint([10, 20], [900, 500], 0, i), [10, 20]));
    assert.ok(near(morphPoint([10, 20], [900, 500], 1, i), [900, 500]));
  }
});

test('morphPoint: giữa đường hạt phình ra (nổ) chứ không đi thẳng', () => {
  let off = 0;
  for (let i = 0; i < 100; i++) {
    const [x, y] = morphPoint([0, 0], [1000, 0], 0.5, i);
    off += Math.abs(y);
  }
  assert.ok(off / 100 > 40, `lệch trung bình ${off / 100}`);
});

test('squarePoints: nằm trên chu vi hình vuông', () => {
  for (const [x, y] of squarePoints(500, 400, 100, 40)) {
    const onX = Math.abs(Math.abs(x - 500) - 50) < 1e-9, onY = Math.abs(Math.abs(y - 400) - 50) < 1e-9;
    assert.ok(onX || onY, `${x},${y}`);
  }
});
