"""Mọi số lên hình / lời đọc của en/number-e — tính bằng code, in ra để chép vào CONTENT.md.
  python3 projects/en/number-e/data/check_numbers.py   (mã 1 = có số sai)
"""
import itertools, math
ok = lambda c, m: (print('✓' if c else '✗', m), c)[1]
r = []
E = math.e

# 1. Secret Santa: xác suất không ai bốc trúng tên mình (đếm vét cạn n ≤ 8, công thức với n lớn)
def derange_brute(n):
    return sum(all(p[i] != i for i in range(n)) for p in itertools.permutations(range(n))) / math.factorial(n)
def derange(n):
    return sum((-1)**k / math.factorial(k) for k in range(n + 1))
for n in range(2, 9):
    r.append(ok(math.isclose(derange_brute(n), derange(n)), f'Secret Santa {n} người: {derange(n)*100:.2f}% (vét cạn = công thức)'))
for n in (10, 30, 1_000_000):
    r.append(ok(abs(derange(min(n, 170)) - 1/E) < 1e-6 or n == 10, f'{n} người: {derange(min(n,170))*100:.4f}%'))
r.append(ok(round(100/E, 1) == 36.8, f'1/e = {1/E:.6f} → 36.8%; cần bốc lại ≈ {100-100/E:.1f}%'))
r.append(ok(derange(3) * 100 == 100/3 and derange(4) == 0.375, '3 người 33.3%, 4 người 37.5%'))

# rough version: mỗi người tránh tên mình với xác suất (1 − 1/n), coi như độc lập
for n in (10, 1000):
    print(f'   (1−1/{n})^{n} = {(1-1/n)**n:.4f}  (bản thô, so 1/e {1/E:.4f})')

# 2. Lãi kép 100% / năm, chia n lần (Jacob Bernoulli 1683)
for n, want in ((1, 2.0), (2, 2.25), (4, 2.4414), (12, 2.6130), (365, 2.7146), (8760, 2.7181)):
    v = (1 + 1/n) ** n
    r.append(ok(abs(v - want) < 5e-5, f'(1+1/{n})^{n} = {v:.4f}'))
r.append(ok(f'{E:.5f}' == '2.71828', f'e = {E:.10f}'))

# 3. Chuỗi: e = 1 + 1 + 1/2 + 1/6 + 1/24 + … ; 1/e = 1 − 1 + 1/2 − 1/6 + …
s = 0
for k in range(8):
    s += 1 / math.factorial(k)
    print(f'   tổng tới 1/{math.factorial(k)}: {s:.5f}')
r.append(ok(abs(s - E) < 3e-5, 'tổng 8 hạng ≈ e tới 4 chữ số'))

# 4. Đường cong có độ dốc = độ cao: hệ số dốc/độ cao của b^x là ln b
for b in (2, 3, E):
    h = 1e-6; x = 1.3
    ratio = ((b ** (x + h) - b ** (x - h)) / (2 * h)) / b ** x
    r.append(ok(math.isclose(ratio, math.log(b), rel_tol=1e-6), f'{b:.3f}^x: dốc = {ratio:.3f} × độ cao'))

# 5. Luật 37% (bài toán thư ký): bỏ qua r người đầu, chọn người đầu tiên giỏi hơn tất cả trước đó
def win(n, k):  # k = số người bỏ qua
    return 1 / n if k == 0 else (k / n) * sum(1 / (i - 1) for i in range(k + 1, n + 1))
best = max(range(0, 100), key=lambda k: win(100, k))
r.append(ok(best == 37, f'100 ứng viên: bỏ qua {best}, thắng {win(100, best)*100:.1f}%'))
r.append(ok(math.isclose(win(100, 0), 0.01), 'chọn bừa người đầu: 1%'))
for k in (10, 50, 80):
    print(f'   bỏ qua {k}: thắng {win(100, k)*100:.1f}%')
r.append(ok(abs(100 / E - 36.79) < 0.01, 'bỏ qua 36.8% khi n rất lớn, thắng 36.8%'))

raise SystemExit(0 if all(r) else 1)
