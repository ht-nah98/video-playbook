import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planStitch } from '../stitch.mjs';

const A = { file: 'a.mp4', start: 0, from: 0, to: 33.233333 };
const B = { file: 'b.mp4', start: 33.233333, from: 33.233333, to: 64.32 };
const KF = { 'a.mp4': [0, 29.066667, 33.233333], 'b.mp4': [0, 4.1] }, NF = { 'a.mp4': 2141, 'b.mp4': 1865 };

test('hai đoạn liền khung: số khung mỗi đoạn và tổng đúng', () => {
  const { segs, t0, dur } = planStitch([A, B], KF, NF);
  assert.deepEqual(segs.map(s => s.n), [1994, 1865]);
  assert.equal(segs[1].ss, 0);
  assert.equal(t0, 0);
  assert.equal(Math.round(dur * 60), 3859);
});

test('hở hoặc chồng một khung giữa hai đoạn → ném lỗi', () => {
  assert.throws(() => planStitch([A, { ...B, from: 33.25 }], KF, NF), /liền nhau/);
});

test('điểm vào hoặc điểm ra giữa file không phải khung khoá → ném lỗi kèm khung khoá gần', () => {
  assert.throws(() => planStitch([{ ...A, from: 30 }], KF, NF), /điểm vào.*khung khoá gần.*29\.066667/);
  assert.throws(() => planStitch([{ ...A, to: 31 }], KF, NF), /điểm ra.*khung khoá gần.*29\.066667/);
});

test('đoạn rỗng hoặc lấy quá cuối file → ném lỗi', () => {
  assert.throws(() => planStitch([{ ...A, to: 0 }], KF, NF), /rỗng/);
  assert.throws(() => planStitch([{ ...B, to: 70 }], KF, NF), /chỉ có 1865/);
});
