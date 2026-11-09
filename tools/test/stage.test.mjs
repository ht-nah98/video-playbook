import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPoint } from '../../engine/stage.js';

test('floorPoint: nằm giữa chân trời và mép dưới, alpha trong [0, 1]', () => {
  for (let i = 0; i < 300; i++) for (const t of [0, 3.3, 47.1, 200]) {
    const p = floorPoint(i, t, { horizon: 660 });
    assert.ok(p.y >= 660 && p.y <= 1080, `y=${p.y}`);
    assert.ok(p.a >= 0 && p.a <= 1, `a=${p.a}`);
    assert.ok(Number.isFinite(p.x) && p.size > 0);
  }
});

test('floorPoint: thuần — cùng (i, t) cùng kết quả bất kể thứ tự gọi', () => {
  const ts = [50, 1, 30, 2.5, 49.9];
  const a = ts.map(t => floorPoint(7, t)), b = [...ts].reverse().map(t => floorPoint(7, t)).reverse();
  assert.deepEqual(a, b);
});

test('floorPoint: gần lúc quấn vòng (v ≈ 0 hoặc 1) gần như tắt → không giật', () => {
  // quét t mịn: mỗi lần y nhảy ngược (quấn) thì alpha hai phía đều nhỏ
  let prev = floorPoint(3, 0);
  for (let t = 0.01; t < 40; t += 0.01) {
    const p = floorPoint(3, t);
    if (p.y < prev.y - 50) assert.ok(prev.a < 0.08 && p.a < 0.08, `quấn ở t=${t.toFixed(2)} a=${prev.a},${p.a}`);
    prev = p;
  }
});

test('floorPoint: glyphs riêng của cảnh — chỉ lấy chữ trong danh sách', () => {
  const G = ['$', '%', '×1.07'];
  for (let i = 0; i < 200; i++) assert.ok(G.includes(floorPoint(i, 12.3, { glyphs: G }).glyph));
});
