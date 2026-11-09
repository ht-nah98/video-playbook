// Toán in trên hình của add-it-up phải ĐÚNG (docs/DNA.md: "Toán trên hình có đúng không?").
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rate, amount, riemann, simpson, famF, famf, sliceArea } from '../../projects/mv/add-it-up/math.js';

const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;

test('bồn: ∫₀² 3t² dt = 2³ − 0³ = 8, và lượng = t³ có đạo hàm 3t²', () => {
  assert.ok(near(simpson(rate, 0, 2), 8, 1e-9));
  for (const t of [0.3, 1, 1.7]) assert.ok(near((amount(t + 1e-6) - amount(t - 1e-6)) / 2e-6, rate(t), 1e-5));
});

test('một hình chữ nhật: 12 × 2 = 24 ≠ 8 (P10)', () => {
  assert.equal(riemann(1), 24); assert.equal(rate(2), 12);
});

test('tổng Riemann phải in trên hình (P11): 15 · 11.25 · 9.5625 · 8.7656 · 8.3789 · 8.1885 → 8', () => {
  assert.equal(riemann(2), 15); assert.equal(riemann(4), 11.25); assert.equal(riemann(8), 9.5625);
  assert.equal(riemann(16).toFixed(4), '8.7656'); assert.equal(riemann(32).toFixed(4), '8.3789');
  assert.equal(riemann(64).toFixed(4), '8.1885'); assert.equal(riemann(512).toFixed(4), '8.0235');
  for (let n = 1; n < 512; n *= 2) assert.ok(riemann(2 * n) < riemann(n) && riemann(n) > 8);   // giảm dần về 8
});

test('họ F + C (P07): F′ = x² − 1, tiếp tuyến tại 1.8 song song mọi C, độ dốc 2.24', () => {
  for (const x of [-1, 0.4, 1.8]) assert.ok(near((famF(x + 1e-6) - famF(x - 1e-6)) / 2e-6, famf(x), 1e-6));
  assert.ok(near(famf(1.8), 2.24, 1e-12));
});

test('định lý cơ bản (P14, P15): F(2) − F(0) = 8 với MỌI C', () => {
  for (const C of [-9, -2, 0, 3.5, 100]) assert.ok(near((amount(2) + C) - (amount(0) + C), 8, 1e-12));
});

test('đường cong √x trên [0, 4] (P16): diện tích 16/3; khối tròn xoay (P17): A(x) = π(√x)² = πx, V = 8π', () => {
  assert.ok(near(simpson(Math.sqrt, 0, 4, 200000), 16 / 3, 1e-4));
  for (const x of [0.5, 2, 3.7]) assert.ok(near(Math.PI * Math.sqrt(x) ** 2, sliceArea(x), 1e-12));
  assert.ok(near(simpson(sliceArea, 0, 4), 8 * Math.PI, 1e-9));
});

test('ví dụ một khoảnh khắc (P12): 3 · 1.3² = 5.07', () => assert.ok(near(rate(1.3), 5.07, 1e-12)));
