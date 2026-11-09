import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLYPHS, decodeChars, burstChars } from '../../engine/glyphs.js';

const str = a => a.map(c => c.ch).join('');

test('decode: trước t0 mọi ký tự ẩn', () => {
  assert.ok(decodeChars('two', 0.99, 1, 2).every(c => c.state === 'hidden'));
});

test('decode: sau t1 chữ đã chốt nguyên vẹn', () => {
  const a = decodeChars('Run it', 5, 1, 2);
  assert.equal(str(a), 'Run it');
  assert.ok(a.every(c => c.state === 'set'));
});

test('decode: đang xáo thì là ký hiệu toán, không phải chữ gốc', () => {
  // 'ab' từ 1→2: 'b' chốt ở 2.0, xáo trong [1.91, 2.0)
  const a = decodeChars('ab', 1.95, 1, 2);
  assert.equal(a[1].state, 'scramble');
  assert.ok(GLYPHS.includes(a[1].ch));
});

test('decode: khoảng trắng giữ nguyên', () => {
  assert.equal(decodeChars('a b', 5, 1, 2)[1].ch, ' ');
});

test('decode: thuần — cùng đầu vào, cùng đầu ra, bất kể thứ tự gọi', () => {
  const ts = [1.93, 1.2, 1.97, 1.5];
  const first = ts.map(t => str(decodeChars('forward', t, 1, 2, { seed: 7 })));
  const again = [...ts].reverse().map(t => str(decodeChars('forward', t, 1, 2, { seed: 7 }))).reverse();
  assert.deepEqual(first, again);
});

test('burst: trước tb là chữ gốc, sau tb+dur alpha = 0', () => {
  assert.equal(str(burstChars('back', 0.9, 1)), 'back');
  assert.ok(burstChars('back', 1.6, 1, { dur: 0.5 }).every(c => c.alpha === 0));
});

test('burst: ngay sau tb ký tự đã thành ký hiệu', () => {
  const a = burstChars('back', 1.01, 1);
  assert.ok(a.every(c => GLYPHS.includes(c.ch)));
});

test('burst: thuần', () => {
  assert.deepEqual(burstChars('xy', 1.2, 1, { seed: 3 }), burstChars('xy', 1.2, 1, { seed: 3 }));
});
