import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTimeline } from '../../engine/timeline.js';

const J = {
  sections: [{ name: 'Chorus', start: 10, end: 14 }, { name: 'Verse', start: 14, end: 20 }],
  lines: [
    { section: 'Chorus', text: 'Run it forward,', start: 10, end: 11, words: [{ w: 'run', start: 10, end: 10.3 }] },
    { section: 'Chorus', text: 'run it back.', start: 11.2, end: 12, words: [{ w: 'run', start: 11.2, end: 11.4 }] },
    { section: 'Verse', text: 'Run it forward,', start: 15, end: 16, words: [{ w: 'run', start: 15, end: 15.3 }] },
  ],
};

test('line() tra theo chữ, bỏ dấu câu và hoa thường', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.line('run it forward').start, 10);
  assert.equal(tl.line('RUN IT BACK').start, 11.2);
});

test('line() chọn lần thứ nth của dòng lặp lại', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.line('Run it forward,', 2).start, 15);
});

test('line() ném lỗi có tên dòng khi không có', () => {
  const tl = makeTimeline(J);
  assert.throws(() => tl.line('Run it forward,', 3), /Run it forward.*lần 3/);
  assert.throws(() => tl.line('không có dòng này'), /không có dòng này/);
});

test('lineAt() biên trái đóng, biên phải mở, hết hạn sau end + 0.6', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.lineAt(9.99), null);
  assert.equal(tl.lineAt(10).text, 'Run it forward,');
  assert.equal(tl.lineAt(11.2).text, 'run it back.');
  assert.equal(tl.lineAt(12.5).text, 'run it back.');
  assert.equal(tl.lineAt(12.7), null);
});

test('sectionAt() và at()', () => {
  const tl = makeTimeline(J);
  assert.equal(tl.sectionAt(14).name, 'Verse');
  assert.equal(tl.at('run it back'), 11.2);
});

test('wordsOf() trả bản sao — sửa không làm hỏng dữ liệu gốc', () => {
  const tl = makeTimeline(J);
  const ws = tl.wordsOf(tl.line('run it back'));
  ws[0].start = 999;
  assert.equal(tl.line('run it back').words[0].start, 11.2);
});
