// Toán của bài — hàm THUẦN, không đụng canvas (để test: tools/test/add-it-up.test.mjs).
// Mọi con số in trên hình lấy từ / được kiểm bằng các hàm này.
export const rate = t => 3 * t * t;                 // lưu lượng bồn (Verse 2)
export const amount = t => t * t * t;               // lượng trong bồn = ∫₀ᵗ 3s² ds
/** Tổng Riemann phải của f trên [a, b] với n dải. */
export function riemann(n, f = rate, a = 0, b = 2) { let s = 0; const w = (b - a) / n; for (let i = 1; i <= n; i++) s += f(a + i * w) * w; return s; }
/** Tích phân số (Simpson) — để kiểm các kết quả đóng. */
export function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
export const famF = x => x * x * x / 3 - x;         // họ F + C ở Verse 1 (P06, P07)
export const famf = x => x * x - 1;                 // F′
export const sliceArea = x => Math.PI * x;          // A(x) = π(√x)² (P17)
