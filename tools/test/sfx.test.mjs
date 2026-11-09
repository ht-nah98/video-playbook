import { test } from 'node:test';
import assert from 'node:assert/strict';
import { typeCues, collectCues, KINDS } from '../../engine/sfx.js';

test('typeCues: một tiếng mỗi ký tự hiện, đúng lúc typed() lộ ký tự đó, bỏ khoảng trắng', () => {
  const c = typeCues('a b', 10, 13);              // k = (t-10)/3; ký tự i lộ khi round(3k) >= i → k >= (i-0.5)/3
  assert.deepEqual(c.map(x => x.t), [10.5, 12.5]); // 'a' (i=1), 'b' (i=3); ' ' bỏ
  assert.ok(c.every(x => x.kind === 'type'));
});

test('collectCues: chuyển cảnh tự có whoosh (cùng ERA) / whoosh-long (khác ERA), cộng LEAD, sắp theo t', () => {
  class A { static ERA = 'page'; }
  class B { static ERA = 'void'; }
  const p = (C, FROM, sfx) => Object.assign(new C(), { FROM, sfx });
  const plates = [p(A, -1), p(A, 5, () => [{ t: 6, kind: 'pop' }]), p(B, 9)];
  assert.deepEqual(collectCues(plates, 0.6), [
    { t: 5.6, kind: 'whoosh' }, { t: 6.6, kind: 'pop' }, { t: 9.6, kind: 'whoosh-long' }]);
});

test('collectCues: loại tiếng lạ ném lỗi ngay (không im lặng mất tiếng)', () => {
  class A { static ERA = 'page'; }
  const pl = Object.assign(new A(), { FROM: 0, sfx: () => [{ t: 1, kind: 'boing' }] });
  assert.throws(() => collectCues([pl], 0), /boing/);
});

test('collectCues: cảnh tự đặt tiếng chuyển của mình (TRANSITION) thì không thêm whoosh mặc định', () => {
  class A { static ERA = 'page'; }
  const a = Object.assign(new A(), { FROM: 0 }), b = Object.assign(new A(), { FROM: 4, TRANSITION: null });
  assert.deepEqual(collectCues([a, b], 0), []);
  assert.ok(KINDS.includes('shimmer'));
});
