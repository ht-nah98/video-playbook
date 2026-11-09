import { test } from 'node:test';
import assert from 'node:assert/strict';
import { P } from '../../engine/stick.js';
import { hero, ARM } from '../../engine/hero.js';
import { gait, keys, snap, fast, reach, leadOf, NOOP } from '../../engine/stickmove.js';
import { SPORT, sport } from '../../engine/poses-sport.js';

const finite = o => Object.values(o).flat(3).every(v => typeof v !== 'number' || Number.isFinite(v));

test('poses-sport: đủ 70 tư thế, mọi trường hữu hạn, góc radian, tên lạ ném lỗi', () => {
  assert.equal(Object.keys(SPORT).length, 70);
  for (const n in SPORT) {
    const s = sport(n);
    assert.ok(finite(s), n);
    for (const k of ['lean', 'shL', 'elL', 'shR', 'elR', 'hipL', 'knL', 'hipR', 'knR']) assert.ok(Math.abs(s[k]) <= 2 * Math.PI, `${n}.${k}`);
    assert.ok(Math.abs(s.dx) < 1 && Math.abs(s.dy) < 1.5, `${n} dx/dy là phần chiều cao (bay cao nhất: diving −1.125)`);
  }
  assert.throws(() => sport('quidditch'));
});

test('stickmove: snap bật, fast vào gắt dừng mềm, keys giữ hai đầu', () => {
  assert.equal(snap(0), 0); assert.equal(snap(0.01), 1);
  assert.equal(fast(0), 0); assert.equal(fast(1), 1); assert.ok(fast(0.25) > 0.5);
  for (let k = 0; k < 1; k += 0.05) assert.ok(fast(k + 0.05) >= fast(k));
  const L = [[1, { a: 0 }], [2, { a: 10 }]];
  assert.equal(keys(L, 0).a, 0); assert.equal(keys(L, 3).a, 10); assert.equal(keys(L, 1.5).a, 5);
});

test('reach: điểm ngoài tầm kéo về đúng bán kính, trong tầm giữ nguyên', () => {
  assert.deepEqual(reach([0, 0], [3, 4], 10), [3, 4]);
  const p = reach([0, 0], [30, 40], 10);
  assert.ok(Math.abs(Math.hypot(...p) - 10) < 1e-9);
});

test('leadOf: hai lượt đi nối nhau, chân không trượt ở khung nối (§148)', () => {
  const h = 200, ground = () => 900, A = { h, ground, x0: 100, x1: 700, t0: 0, t1: 3 };
  const B = { h, ground, x0: 700, x1: 1300, t0: 3, t1: 6, lead: leadOf(A) };
  const a = gait(A, 3).feet, b = gait(B, 3).feet;
  for (let i = 0; i < 2; i++) assert.ok(Math.abs(a[i][0] - b[i][0]) < 0.5, `chân ${i}: ${a[i][0]} → ${b[i][0]}`);
});

test('hero: tất định, khớp hữu hạn, tay dài ×ARM, giận / chính diện không lỗi', () => {
  const o = { h: 200, hip: [500, 700], eye: { look: [1, 0] }, t: 1.3, wind: 0.5 };
  const a = hero(NOOP, 'C', 500, 0, P.stand, o), b = hero(NOOP, 'C', 500, 0, P.stand, o);
  assert.deepEqual(a, b); assert.ok(finite(a));
  const s = hero(NOOP, 'C', 500, 0, P.stand, { ...o, arm: 1 });
  const len = J => Math.hypot(J.armR.e[0] - J.armR.a[0], J.armR.e[1] - J.armR.a[1]);
  assert.ok(Math.abs(len(a) / len(s) - ARM) < 0.02);
  for (const n of ['javelin', 'boxing']) assert.ok(finite(hero(NOOP, 'C', 500, 0, { ...P.stand, ...sport(n) }, { ...o, anger: 0.7, front: true })));
});
