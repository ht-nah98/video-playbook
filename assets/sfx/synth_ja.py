# Tiếng Nhật cho 99の発見 (ja/pi, 2026-10-10): hyoshigi, soroban, hanko, suzu, taiko — không tìm được bản CC0 sạch.
# ja/2048 (2026-10-12): koma 駒音.
#   python3 assets/sfx/synth_ja.py → _synth/*.wav (thư mục hiện hành), rồi tools/sfx/add.sh <kind> _synth/<kind>_*.wav
# Tổng hợp theo mode (modal synthesis): mỗi vật = vài tần số riêng tắt dần + tiếng chạm (nhiễu ngắn), thêm phòng nhỏ.
# Tất định: mọi ngẫu nhiên qua default_rng(seed) cố định.
import os; os.makedirs("_synth", exist_ok=True)
import numpy as np, scipy.signal as ss, soundfile as sf
sr = 48000
def norm(x, db=-3): return x / np.abs(x).max() * 10 ** (db / 20)
def tt(dur): return np.arange(int(dur * sr)) / sr
def band(x, lo, hi, o=2): b, a = ss.butter(o, [lo / (sr / 2), hi / (sr / 2)], 'band'); return ss.lfilter(b, a, x)
def lp(x, f, o=2): b, a = ss.butter(o, f / (sr / 2)); return ss.lfilter(b, a, x)
def hp(x, f, o=2): b, a = ss.butter(o, f / (sr / 2), 'high'); return ss.lfilter(b, a, x)
def modes(t, fs, amps, taus, r, det=0.004):
    """Tổng sin tắt dần, pha ngẫu nhiên, lệch tần nhẹ (vật thật không đúng tỉ lệ lý thuyết)."""
    y = np.zeros_like(t)
    for f, a, tau in zip(fs, amps, taus):
        f *= 1 + r.uniform(-det, det); y += a * np.sin(2 * np.pi * f * t + r.uniform(0, 2 * np.pi)) * np.exp(-t / tau)
    return y * (1 - np.exp(-t * 4000))                       # vào 0.25 ms: không bật "click" số
def room(y, seed, dur=0.5, wet=0.12, lo=300, hi=6000):
    """Phòng nhỏ: IR = nhiễu lọc tắt dần, trộn ướt nhẹ, stereo hai IR khác nhau."""
    r = np.random.default_rng(seed); n = int(dur * sr); e = np.exp(-np.arange(n) / sr / (dur / 6.9))
    out = []
    for ch in range(2):
        ir = band(r.standard_normal(n), lo, hi) * e; ir /= np.sqrt((ir ** 2).sum())
        w = np.zeros(len(y) + n); c = ss.fftconvolve(y, ir); w[:len(c)] = c[:len(w)]
        out.append(np.concatenate([y, np.zeros(n)]) + wet * w)
    return np.stack(out, 1)
def place(dst, src, t0, pan=0.5):
    i = int(t0 * sr); L = min(len(src), len(dst) - i)
    dst[i:i + L, 0] += src[:L] * (1 - pan); dst[i:i + L, 1] += src[:L] * pan

# hyoshigi 拍子木 — hai thanh gỗ cứng (thanh tự do: tỉ lệ mode 1 : 2.76 : 5.40) gõ vào nhau "カン": gốc 1.0–1.6 kHz,
# tắt 40–90 ms, cộng tiếng chạm khô (nhiễu dải 2–8 kHz, 2 ms). Hai thanh lệch cao độ chút → tiếng "kan" có độ dày.
def kan(f0, r, bright=1.0):
    t = tt(0.6); y = 0
    for k, f in enumerate([f0, f0 * 1.07]):                 # hai thanh
        y = y + modes(t, [f, f * 2.76, f * 5.40], [1, 0.45 * bright, 0.18 * bright], [0.085, 0.03, 0.012], r) * (1 - 0.3 * k)
    hit = band(r.standard_normal(len(t)), 2000, 8000) * np.exp(-t / 0.002) * 0.9 * bright
    return y + hit
def hyoshigi(f0s, gaps, seed):
    r = np.random.default_rng(seed); dur = sum(gaps) + 0.6; y = np.zeros(int(dur * sr)); t0 = 0
    for k, f0 in enumerate(f0s):
        s = kan(f0, r, bright=1.0 - 0.12 * k); i = int(t0 * sr); L = min(len(s), len(y) - i); y[i:i + L] += s[:L] * (1 - 0.15 * k)
        t0 += gaps[k] if k < len(gaps) else 0
    return norm(room(y, seed + 100, dur=0.7, wet=0.18, lo=400, hi=5000))
for i, (fs, gs) in enumerate([([1250], [0]), ([1250, 1260], [0.21]), ([1080, 1100], [0.26]), ([1420], [0])]):
    sf.write(f'_synth/hyoshigi_{i+1}.wav', hyoshigi(fs, gs, seed=30 + i), sr)

# soroban 算盤 — hạt gỗ trượt chạm thanh ngang: mỗi click = mode hạt 2.6–4.2 kHz tắt 6 ms + "tách" nhiễu 1.5–7 kHz 1.5 ms
# + cộp khung ~900 Hz. Chùm 6–14 click, nhịp hơi không đều (ngón tay gảy), to nhỏ khác nhau.
def soroban(n, span, seed):
    r = np.random.default_rng(seed); dur = span + 0.1; y = np.zeros((int(dur * sr), 2))
    ts = np.sort(r.uniform(0, span, n)); ts[0] = 0
    for t0 in ts:
        t = tt(0.06); f = r.uniform(2600, 4200)
        s = modes(t, [f, f * 1.9], [1, 0.3], [0.006, 0.003], r) + band(r.standard_normal(len(t)), 1500, 7000) * np.exp(-t / 0.0015) * 0.8
        s += np.sin(2 * np.pi * r.uniform(800, 1000) * t) * np.exp(-t / 0.008) * 0.25
        place(y, s * r.uniform(0.5, 1.0), t0, r.uniform(0.3, 0.7))
    return norm(np.stack([room(y[:, c], seed + 200 + c, dur=0.25, wet=0.08)[:, c] for c in range(2)], 1))
for i, (n, span) in enumerate([(8, 0.28), (12, 0.45), (6, 0.2), (14, 0.58)]):
    sf.write(f'_synth/soroban_{i+1}.wav', soroban(n, span, seed=40 + i), sr)

# hanko 判子 — con dấu ấn xuống giấy trên bàn gỗ "トン": cộp trầm 150–250 Hz trượt xuống, tắt 45 ms, + nhiễu giấy
# (dải 400–3500 Hz, 25 ms) + tiếng gõ thân dấu ~700 Hz rất ngắn.
def hanko(f0, paper, seed):
    r = np.random.default_rng(seed); t = tt(0.3)
    ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.35 * np.exp(-t / 0.01))) / sr
    thump = np.sin(ph) * np.exp(-t / 0.045) * (1 - np.exp(-t * 3000))
    knock = np.sin(2 * np.pi * r.uniform(650, 760) * t) * np.exp(-t / 0.006) * 0.3
    pap = band(r.standard_normal(len(t)), 400, 3500) * np.exp(-t / 0.025) * paper
    y = thump + knock + pap
    return norm(room(y, seed + 300, dur=0.35, wet=0.1, lo=150, hi=3000))
for i, (f0, p) in enumerate([(200, 0.35), (170, 0.5), (235, 0.3)]):
    sf.write(f'_synth/hanko_{i+1}.wav', hanko(f0, p, seed=50 + i), sr)

# suzu 鈴 — chuông nhỏ trong trẻo: partial không nguyên 2–6 kHz (tỉ lệ chuông nhỏ 1 : 1.52 : 2.34 : 2.94), mỗi partial
# là cặp lệch 1.5–4 Hz (beating "lung linh"), tắt τ ~0.35 s → −60 dB ~1.3 s. Biến thể 2: lắc nhẹ, 3 quả chuông lần lượt.
def bell(f0, r, tau=0.33):
    t = tt(2.4); ratios = [1, 1.52, 2.34, 2.94]; amps = [1, 0.55, 0.35, 0.2]; y = 0
    for q, a in zip(ratios, amps):
        f = f0 * q; d = r.uniform(1.5, 4)
        y = y + modes(t, [f, f + d], [a, a * 0.7], [tau / q ** 0.4] * 2, r, det=0.002)
    return y + hp(r.standard_normal(len(t)), 5000) * np.exp(-t / 0.0015) * 0.3
def suzu(f0s, gaps, seed):
    r = np.random.default_rng(seed); dur = sum(gaps) + 2.4; y = np.zeros((int(dur * sr), 2)); t0 = 0
    for k, f0 in enumerate(f0s):
        place(y, bell(f0, r) * (1 - 0.2 * k), t0, r.uniform(0.3, 0.7)); t0 += gaps[k] if k < len(gaps) else 0
    return norm(np.stack([room(y[:, c], seed + 400 + c, dur=0.9, wet=0.15, lo=1500, hi=10000)[:, c] for c in range(2)], 1))
for i, (fs, gs) in enumerate([([2650], [0]), ([2650, 3120, 2380], [0.09, 0.12])]):
    sf.write(f'_synth/suzu_{i+1}.wav', suzu(fs, gs, seed=60 + i), sr)

# taiko 和太鼓 — "ドン": màng tròn (mode 1 : 1.59 : 2.14 : 2.30 : 2.65), gốc 62–78 Hz trượt từ +30 % xuống trong 80 ms,
# gốc tắt τ 0.35 s, mode trên tắt nhanh; dùi chạm = nhiễu thấp < 1.2 kHz 8 ms + "bộp" 250 Hz; thân trống + phòng lớn.
def taiko(f0, tau, seed):
    r = np.random.default_rng(seed); t = tt(3.0); y = 0
    for q, a, ta in zip([1, 1.59, 2.14, 2.30, 2.65], [1, 0.35, 0.22, 0.15, 0.1], [tau, tau * 0.45, tau * 0.3, tau * 0.25, tau * 0.2]):
        fi = f0 * q * (1 + 0.3 * np.exp(-t / 0.08)); ph = 2 * np.pi * np.cumsum(fi) / sr + r.uniform(0, 2 * np.pi)
        y = y + a * np.sin(ph) * np.exp(-t / ta)
    y *= 1 - np.exp(-t * 2500)
    stick = lp(r.standard_normal(len(t)), 1200) * np.exp(-t / 0.008) * 0.5 + np.sin(2 * np.pi * 250 * t) * np.exp(-t / 0.02) * 0.3
    return norm(room(y + stick, seed + 500, dur=1.4, wet=0.22, lo=60, hi=2500))
for i, (f0, tau) in enumerate([(70, 0.38), (62, 0.45), (78, 0.32)]):
    sf.write(f'_synth/taiko_{i+1}.wav', taiko(f0, tau, seed=70 + i), sr)
# koma 駒音 「パチッ」 (ja/2048, 2026-10-12) — quân 柘植 khô đập xuống mặt bàn 榧 dày: tiếng "tách" rất ngắn của quân (mode
# 2.2–3.6 kHz, tắt 4–9 ms, cộng nhiễu chạm 3–10 kHz 1 ms) + thân bàn cộng hưởng gỗ dày (mode 380–620 Hz tắt 25–40 ms, tỉ lệ
# tấm 1 : 1.58 : 2.31) + cộp trầm ~170 Hz rất ngắn. Khô, phòng nhỏ ướt ít — khác hyoshigi (vang dài, cao) và wood (Kenney, đục).
def koma(f_piece, f_board, hard, seed):
    r = np.random.default_rng(seed); t = tt(0.25)
    piece = modes(t, [f_piece, f_piece * 1.71, f_piece * 2.62], [1, 0.5, 0.22], [0.009, 0.005, 0.003], r)
    click = band(r.standard_normal(len(t)), 3000, 10000) * np.exp(-t / 0.001) * 1.1 * hard
    board = modes(t, [f_board, f_board * 1.58, f_board * 2.31], [0.9, 0.45, 0.25], [0.04, 0.028, 0.018], r)
    thump = np.sin(2 * np.pi * r.uniform(150, 190) * t) * np.exp(-t / 0.012) * 0.5
    y = piece * 0.8 * hard + click + board + thump
    return norm(room(y, seed + 600, dur=0.3, wet=0.08, lo=300, hi=7000))
for i, (fp, fb, h) in enumerate([(2900, 470, 1.0), (2500, 410, 0.9), (3300, 540, 1.1), (2700, 600, 0.85)]):
    sf.write(f'_synth/koma_{i+1}.wav', koma(fp, fb, h, seed=80 + i), sr)
print('ok')
