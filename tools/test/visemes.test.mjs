import { test } from 'node:test';
import assert from 'node:assert/strict';
import { V, syllablesOf, mouthAt, makeEnv } from '../../engine/visemes.js';

const W = (w, s, e) => [{ w, start: s, end: e }];

test('syllablesOf tách âm tiết theo nhóm nguyên âm, bỏ e câm cuối', () => {
  assert.deepEqual(syllablesOf('back'), [{ onset: 'b', vowel: 'a' }]);
  assert.equal(syllablesOf('logarithm').length, 3);
  assert.equal(syllablesOf('same').length, 1);
  assert.equal(syllablesOf('me').length, 1);
});

test('ngoài mọi từ → REST', () => {
  assert.equal(mouthAt(0.5, W('run', 1, 2)), V.REST);
});

test('nguyên âm quyết định khẩu hình giữa âm tiết', () => {
  assert.equal(mouthAt(1.5, W('run', 1, 2)), V.U);
  assert.equal(mouthAt(1.5, W('go', 1, 2)), V.O);
  assert.equal(mouthAt(1.5, W('me', 1, 2)), V.EE);
  assert.equal(mouthAt(1.5, W('back', 1, 2)), V.WIDE);    // a dài (âm tiết ≥ 0.22s)
  assert.equal(mouthAt(1.05, W('back', 1, 1.15)), V.OPEN); // a ngắn — không phải onset vì b→REST chỉ 20% đầu
});

test('phụ âm đầu m/b/p khép môi, s/t/d/z lộ răng', () => {
  assert.equal(mouthAt(1.05, W('map', 1, 2)), V.REST);
  assert.equal(mouthAt(1.05, W('same', 1, 2)), V.TEETH);
});

test('15% cuối từ → CLOSE', () => {
  assert.equal(mouthAt(1.95, W('run', 1, 2)), V.CLOSE);
});

test('từ lạ không làm vỡ: luôn trả 1..9', () => {
  for (const w of ['x', 'y', '99', '—', '', "isn't", 'rhythm'])
    for (const t of [1.0, 1.3, 1.9]) {
      const m = mouthAt(t, W(w, 1, 2));
      assert.ok(Number.isInteger(m) && m >= 1 && m <= 9, `${w}@${t} → ${m}`);
    }
});

// ── v2: độ mở theo giọng thật (đường bao stem lead-vocals, 0..1 mỗi khung 1/60s) ──
const ENV = (level) => ({ fps: 60, at: () => level });

test('mức giọng gần 0 trong từ → khép miệng (nghỉ hơi giữa âm tiết)', () => {
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.05)), V.CLOSE);
});

test('cùng nguyên âm a: giọng lớn → WIDE, vừa → OPEN, nhỏ → E (hé)', () => {
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.9)), V.WIDE);
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.5)), V.OPEN);
  assert.equal(mouthAt(1.5, W('back', 1, 2), ENV(0.25)), V.E);
});

test('nguyên âm o: giọng lớn → O, nhỏ → U', () => {
  assert.equal(mouthAt(1.5, W('go', 1, 2), ENV(0.8)), V.O);
  assert.equal(mouthAt(1.5, W('go', 1, 2), ENV(0.3)), V.U);
});

test('ngân quá cuối từ (giọng còn lớn) → giữ miệng mở, không khép theo 15% cuối', () => {
  assert.equal(mouthAt(1.95, W('go', 1, 2), ENV(0.8)), V.O);
  assert.equal(mouthAt(2.2, W('go', 1, 2), ENV(0.7)), V.O);      // ngoài từ nhưng còn ngân: giữ nguyên âm cuối
  assert.equal(mouthAt(2.2, W('go', 1, 2), ENV(0.05)), V.REST);
});

test('không có đường bao → y hệt v1 (các cảnh cũ không đổi)', () => {
  for (const [w, t] of [['back', 1.5], ['run', 1.95], ['same', 1.05], ['go', 1.5]])
    assert.equal(mouthAt(t, W(w, 1, 2)), mouthAt(t, W(w, 1, 2), null));
});

test('makeEnv: tra theo khung, ngoài khoảng → 0, giá trị trong [0,1]', () => {
  const e = makeEnv({ fps: 60, t0: 0, q: [0, 128, 255] });
  assert.equal(e.at(0), 0); assert.ok(Math.abs(e.at(1 / 60) - 128 / 255) < 1e-9); assert.equal(e.at(2 / 60), 1);
  assert.equal(e.at(-1), 0); assert.equal(e.at(99), 0);
});
