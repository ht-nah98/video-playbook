import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, presence, order, cellIn, cellOut } from '../../engine/transit.js';

test('presence: đủ 5 pha theo thời gian', () => {
  const p = t => presence(t, 10, 20, { inDur: 0.25, outDur: 0.6 }).state;
  assert.equal(p(9.9), 'before'); assert.equal(p(10.1), 'in'); assert.equal(p(15), 'hold');
  assert.equal(p(20.3), 'out'); assert.equal(p(20.7), 'gone');
});

test('presence: k chạy 0→1 trong pha in', () => {
  assert.equal(presence(10, 10, 20).k, 0);
  assert.ok(Math.abs(presence(10.125, 10, 20).k - 0.5) < 1e-9);
});

test('order: luôn trong [0,1] với mọi kiểu', () => {
  for (const kind of KINDS) for (let r = 0; r < 12; r++) for (let c = 0; c < 9; c++) {
    const o = order(kind, r, c, 12, 9);
    assert.ok(o >= 0 && o <= 1, `${kind} ${r},${c} = ${o}`);
  }
});

test('order: rows quét từ trên xuống', () => {
  assert.ok(order('rows', 0, 4, 12, 9) < order('rows', 11, 4, 12, 9));
});

test('cellIn: số ô hiện ký hiệu không giảm khi k tăng (pha ký hiệu)', () => {
  const os = Array.from({ length: 200 }, (_, i) => order('grid', i % 20, (i / 20) | 0, 20, 10));
  let prev = -1;
  for (let k = 0; k <= 0.6; k += 0.05) {
    const n = os.filter(o => cellIn(k, o).glyph > 0).length;
    assert.ok(n >= prev); prev = n;
  }
});

test('cellIn: k=0 không có gì, k=1 chỉ còn ảnh', () => {
  assert.deepEqual(cellIn(0, 0.5), { glyph: 0, png: 0 });
  assert.deepEqual(cellIn(1, 0.5), { glyph: 0, png: 1 });
});

test('cellOut: k=0 là ảnh nguyên, k=1 là hết sạch', () => {
  for (const kind of KINDS) {
    assert.equal(cellOut(kind, 0, 0.3, 1).png, 1);
    const e = cellOut(kind, 1, 0.3, 1);
    assert.equal(e.glyph, 0); assert.equal(e.png, 0);
  }
});

test('thuần: cùng đầu vào cùng đầu ra', () => {
  assert.deepEqual(cellOut('digits', 0.5, 0.4, 9), cellOut('digits', 0.5, 0.4, 9));
});
