import cmath, math
ok = lambda c, m: (print('✓' if c else '✗', m), c)[1]
r = []
r.append(ok(4**3 == 15*4 + 4 == 64, 'x=4 nghiệm x³=15x+4 (64)'))
q, p = 4/2, -15/3  # công thức Cardano cho x³ = 15x + 4
d = q*q + p**3
r.append(ok(d == -121, f'dưới căn = {d}'))
r.append(ok((2+1j)**3 == 2+11j and (2-1j)**3 == 2-11j, '(2±i)³ = 2±11i'))
r.append(ok((2+1j)+(2-1j) == 4, '(2+i)+(2−i)=4'))
r.append(ok(1j*1j == -1, 'i²=−1'))
r.append(ok(1j**100 == 1 or abs(1j**100-1) < 1e-9, 'i¹⁰⁰=1 (25 vòng)'))
r.append(ok((3+2j)*1j == -2+3j and abs(3+2j) == abs(-2+3j), '(3+2i)i=−2+3i, cùng độ dài'))
z = 1+1j; r.append(ok(z*z == 2j and math.isclose(math.degrees(cmath.phase(z)), 45) and math.isclose(abs(z), 2**.5), '(1+i)²=2i; 45°, √2'))
a = math.degrees(cmath.phase(2+1j)); b = math.degrees(cmath.phase(2+11j))
r.append(ok(math.isclose(3*a, b), f'góc 2+i = {a:.2f}°, ×3 = {3*a:.2f}° = góc 2+11i {b:.2f}°'))
r.append(ok(abs(3+4j) == 5, '|3+4i|=5'))
N = 100000; pk = max(abs(3*math.sin(t) + 4*math.sin(t - math.pi/2)) for t in (2*math.pi*i/N for i in range(N)))
r.append(ok(math.isclose(pk, 5, abs_tol=1e-6), f'mô phỏng 3 sin t + 4 sin(t−90°): đỉnh {pk:.4f} V, không phải 7'))
raise SystemExit(0 if all(r) else 1)
