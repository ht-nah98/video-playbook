import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lookup, must, fix, prog, mk, loadImages, CROP, typeCues } from '../../engine/lesson.js';

const tl = { lines: [
  { text: 'is it is', start: 1, words: [{ w: 'is', start: 1 }, { w: 'it', start: 1.3 }, { w: 'is', start: 1.6 }] },
  { text: 'zero', start: 3, words: [{ w: 'zero', start: 3 }] },
] };

test('lookup: L(i) theo chỉ số, w(i, từ, n) = lần thứ n; thiếu câu/từ → ném kèm tên cảnh', () => {
  const { L, w } = lookup(tl, 'a1-x');
  assert.equal(L(1).start, 3);
  assert.equal(w(0, 'is'), 1);
  assert.equal(w(0, 'is', 2), 1.6);
  assert.throws(() => L(5), /a1-x: không có câu 5/);
  assert.throws(() => w(0, 'is', 3), /a1-x: không có "is" \(3\)/);
  assert.throws(() => w(1, 'one'), /không có "one"/);
});

test('must: số (sai số 1e-9) và chuỗi (===), ký hiệu ÷ × − ^', () => {
  assert.equal(must('6 ÷ 2 × (1 + 2)', 9), 9);
  assert.equal(must('0.1 + 0.2', 0.3), 0.3);
  assert.equal(must('(−2)^2', 4), 4);
  assert.equal(must('"a" + "b"', 'ab'), 'ab');
  assert.throws(() => must('2 + 2', 5), /toán sai trên hình/);
  assert.throws(() => must('"a" + "b"', 'ba'), /toán sai trên hình/);
  assert.throws(() => must('−2^2', 4), /không tính được/);
  assert.equal(fix('22 ÷ 7', 3), '3.143');
});

test('prog: 0→1 kẹp trong [a, b]; b < a → ném', () => {
  assert.equal(prog(5, 4, 6), 0.5);
  assert.equal(prog(0, 4, 6), 0);
  assert.equal(prog(9, 4, 6), 1);
  assert.throws(() => prog(5, 6, 4), /prog: b < a/);
});

test('mk: làm tròn lên, tối thiểu 1, mặc định 1920 × 1080', () => {
  globalThis.document = { createElement: () => ({}) };
  try {
    assert.deepEqual([mk().width, mk().height], [1920, 1080]);
    const c = mk(10.2, 0); assert.deepEqual([c.width, c.height], [11, 1]);
  } finally { delete globalThis.document; }
});

test('loadImages: mọi ảnh qua toCanvas vào IM; lỗi nạp nêu url', async () => {
  globalThis.Image = class { set src(u) { this.u = u; queueMicrotask(() => u.includes('bad') ? this.onerror() : this.onload()); } };
  try {
    const IM = {};
    await loadImages({ a: 'x/a.png', b: 'x/b.png' }, IM, { toCanvas: im => 'cv:' + im.u });
    assert.deepEqual(IM, { a: 'cv:x/a.png', b: 'cv:x/b.png' });
    await assert.rejects(loadImages({ c: 'x/bad.png' }, {}, { toCanvas: x => x }), /không nạp được x\/bad.png/);
  } finally { delete globalThis.Image; }
});

test('CROP và typeCues có mặt', () => {
  assert.equal(CROP.idle, 0.45); assert.equal(CROP.ponder, 1);
  assert.ok(Array.isArray(typeCues('ab', 0, 1)));
});
