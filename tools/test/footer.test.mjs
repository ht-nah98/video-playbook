import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTimeline } from '../../engine/timeline.js';
import { footerPlan } from '../../engine/lyric.js';

const tl = makeTimeline({ sections: [], lines: [
  { text: 'one', start: 10, end: 11, words: [] },
  { text: 'two', start: 11.2, end: 12, words: [] },       // nối liền dòng trước (cách 0.2s)
  { text: 'three', start: 15, end: 16, words: [] },       // cách dòng trước 3s
] });
const texts = (plan) => plan.map(p => [p.line.text, p.burstAt]);

test('dòng mới vào: dòng trước VỠ ở mốc dòng mới trong 0.3s (khi dòng trước thuộc cảnh này)', () => {
  assert.deepEqual(texts(footerPlan(tl, 11.3, { from: 9 })), [['one', 11.2], ['two', null]]);
  assert.deepEqual(texts(footerPlan(tl, 11.6, { from: 9 })), [['two', null]]);   // hết 0.3s
});

test('dòng trước thuộc cảnh trước: không vẽ lại — trừ khi carry (cảnh trước không tự vỡ nó)', () => {
  assert.deepEqual(texts(footerPlan(tl, 11.3, { from: 11.2 })), [['two', null]]);
  assert.deepEqual(texts(footerPlan(tl, 11.3, { from: 11.2, carry: true })), [['one', 11.2], ['two', null]]);
});

test('khoảng nghỉ > 0.6s giữa hai dòng: không vỡ dòng trước (nó đã hết từ lâu)', () => {
  assert.deepEqual(texts(footerPlan(tl, 15.1, { from: 0, carry: true })), [['three', null]]);
});

test('ngoài dòng hát (quá end + 0.6): không có gì; burst của cảnh truyền xuống dòng hiện tại', () => {
  assert.deepEqual(footerPlan(tl, 13.5), []);
  assert.deepEqual(footerPlan(tl, 15.5, { at: 15.7, dur: 0.25 }).map(p => [p.burstAt, p.burstDur]), [[15.7, 0.25]]);
});

test('null/undefined = mặc định (như kit.footer cũ dùng ??): from null không kéo dòng cảnh trước vào', () => {
  assert.deepEqual(texts(footerPlan(tl, 11.3, { from: null, dur: null })), [['two', null]]);
  assert.equal(footerPlan(tl, 11.9, { dur: undefined })[0].burstDur, 0.3);
});
