import { test } from 'node:test';
import assert from 'node:assert/strict';
import { outBack, clamp } from '../../engine/lib.js';

test('outBack: đúng 0 ở 0 và đúng 1 ở 1 — để `outBack(...) > 0` là phép kiểm "đã tới mốc"', () => {
  assert.equal(outBack(0), 0);
  assert.equal(outBack(clamp(-3)), 0);
  assert.equal(outBack(1), 1);
  assert.ok(outBack(0.5) > 1);                 // vẫn vọt quá giữa đường
});
