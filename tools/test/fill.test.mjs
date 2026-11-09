import { test } from 'node:test';
import assert from 'node:assert/strict';
import { innerRows } from '../../engine/fill.js';

test('đủ số hàng, mỗi hàng đủ dài', () => {
  const r = innerRows(['2·2·2 = 8', 'POWER'], 5, 60);
  assert.equal(r.length, 5);
  assert.ok(r.every(s => s.length >= 60));
});

test('hàng kề nhau bắt đầu khác cụm', () => {
  const r = innerRows(['A', 'B', 'C'], 3, 10);
  assert.notEqual(r[0].slice(0, 1), r[1].slice(0, 1));
});

test('danh sách rỗng không treo máy', () => {
  assert.deepEqual(innerRows([], 3, 10), ['', '', '']);
});
