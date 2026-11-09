#!/usr/bin/env python3
"""Tiếng hiệu ứng THEO CHẤT LIỆU của DNA, tổng hợp bằng code — mỗi bài một bộ riêng, nhiều biến thể (docs/lesson/SFX.md).

    python3 tools/sfx/material.py <p> --material paper [--variants 12]    # → projects/<p>/assets/sfx/<kind>/NN.wav + library.json
    python3 tools/sfx/material.py --list                                  # chất liệu + loại (kind) mỗi bộ thay

Bộ của bài ĐÈ thư viện chung `assets/sfx/` đúng các loại nó có (tools/sfx/mix.py --lib, build.py tự dùng khi thư mục
tồn tại); loại mang tính nhạc (correct, error, question, shimmer, impact…) vẫn lấy thư viện chung. Tất định: cùng bài +
chất liệu + số biến thể → cùng mẫu từng byte (hạt giống theo tên). Bài đã xong không chạy lại — tiếng của bài giữ nguyên.

Kỹ thuật tổng hợp (ma sát = nhiễu lọc dải × hạt bám-trượt; gõ = xung + cộng hưởng; lật giấy = nhấc + vút + đập) học và
chuyển từ lemo-opuscar (LemoLab, MIT — docs/study/11): core/audio/sfx.py, styles/{crayon-book,dataviz,whiteboard,
microgame}/demo/mix.py. Copyright (c) LemoLab, MIT License — bản quyền giữ trong file này.
"""
import argparse, json, sys, zlib
from pathlib import Path
import numpy as np
from scipy.ndimage import uniform_filter1d
from scipy.signal import butter, sosfilt

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT  # noqa: E402
SR = 48000
GLOBAL = ROOT / 'assets' / 'sfx'


# ── nền (từ lemo-opuscar core/audio/sfx.py) ──
class Gen:
    """Một bộ sinh tất định: mọi nhiễu lấy từ rng riêng của (bài, chất liệu, loại, biến thể)."""
    def __init__(self, seed): self.r = np.random.default_rng(seed)
    def T(self, d): return np.arange(int(round(d * SR))) / SR
    def nz(self, d): return self.r.standard_normal(int(round(d * SR)))
    def dec(self, d, tau): return np.exp(-self.T(d) / tau)

def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, min(hi, SR / 2.2)], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def fade(x, a=.004, b=.02):
    n = len(x); ia, ib = min(n, int(a * SR)), min(n, int(b * SR))
    if ia: x[:ia] *= np.linspace(0, 1, ia)
    if ib: x[-ib:] *= np.linspace(1, 0, ib)
    return x
def env(g, d, pts): k = np.array(pts, float); return np.interp(g.T(d), k[:, 0] * d, k[:, 1])
def put(buf, x, at):
    i = int(at * SR); buf[i:i + len(x)] += x[:max(0, len(buf) - i)]; return buf


# ── chất liệu: GIẤY / vở nháp (bút chì, bút bi, dạ quang trên giấy; trang vở; xúc xắc trên bàn) ──
def graphite(g, d, speed=1.0, v=1.0):
    """Ma sát bút trên giấy: nhiễu dải × hạt bám-trượt; nhanh hơn → hạt dày + sáng hơn (crayon-book `crayon`)."""
    n = g.nz(d); rate = int(SR / (70 + 90 * speed))
    grain = uniform_filter1d((g.r.random(len(n) // rate + 2) ** 3).repeat(rate)[:len(n)], rate // 3 + 1)
    x = bp(n, 1600 + 600 * speed, 7000) * (0.35 + grain * 1.6) + bp(n, 350, 1000, 1) * 0.18
    return fade(x * env(g, d, [(0, 0), (.06, 1), (.85, .9), (1, 0)]) * v, .006, .03)

def paper_pen(g):
    """Viết một cụm: 2–5 nét ngắn liền nhau (dataviz `scratch`, crayon-book `write`), độ dài + tốc độ ngẫu nhiên."""
    d = g.r.uniform(.28, .62); out = np.zeros(int((d + .05) * SR)); t = 0.0
    while t < d - .06:
        L = g.r.uniform(.05, .16); put(out, graphite(g, L, g.r.uniform(.6, 1.4), g.r.uniform(.7, 1.0)), t); t += L + g.r.uniform(0, .035)
    tick = bp(g.nz(.012), 2200, 7000) * g.dec(.012, .002) * .6   # đầu bút chạm giấy
    return put(out, tick, 0)

def paper_tap(g, bright=1.0):
    """Đầu bút chấm giấy: tích nhỏ + thân giấy (dataviz `tap`)."""
    d = .08; t = g.T(d); x = bp(g.nz(d), 1800 * bright, 6500) * np.exp(-t / .0022)
    x = x + bp(g.nz(d), 180, 900) * np.exp(-t / .009) * .7 + np.sin(2 * np.pi * g.r.uniform(130, 170) * t) * np.exp(-t / .01) * .35
    return fade(x, .0005, .02)

def paper_pop(g):
    """Giấy note / thẻ đặt xuống: đập giấy mềm (microgame `paper_thump`) + tích."""
    d = .26; t = g.T(d); f0 = g.r.uniform(95, 125)
    x = lp(g.nz(d), 1500) * np.exp(-t / .018) + np.sin(2 * np.pi * f0 * t) * np.exp(-t / .045) * .55 + bp(g.nz(d), 2000, 6000) * np.exp(-t / .03) * .3
    return fade(x, .0005, .05)

def paper_swish(g):
    """Giấy lướt qua: nhiễu dải trượt tần, mềm (microgame `swoosh` hạ sáng cho giấy)."""
    d = g.r.uniform(.3, .5); n = g.nz(d); out = np.zeros_like(n); step = 240
    lo, hi = g.r.uniform(250, 380), g.r.uniform(2400, 3600)
    for i in range(0, len(n), step):
        u = i / len(n); f = lo * (hi / lo) ** u
        s = bp(n[max(0, i - 1200):i + step], f * .7, f * 1.4)[-len(n[i:i + step]):]; out[i:i + len(s)] = s
    rust = (g.r.random(len(n)) < .003) * g.r.standard_normal(len(n)) * 2.5
    return fade(out * np.sin(np.pi * g.T(d) / d) ** 1.5 + bp(rust, 1500, 8000) * .3, .01, .05)

def page_turn(g):
    """Lật trang: nhấc mép → vút có lạo xạo → đập xuống (crayon-book `page_turn`)."""
    d = g.r.uniform(.9, 1.2); out = np.zeros(int((d + .4) * SR))
    lift = bp(g.nz(.35), 600, 5000) * env(g, .35, [(0, 0), (.5, .6), (1, .2)]) * .18
    wh = bp(g.nz(.6), 300, 4000) * np.sin(np.linspace(0, np.pi, int(.6 * SR))) ** 1.5 * .35
    cr = (g.r.random(int(.6 * SR)) < .003) * g.r.standard_normal(int(.6 * SR)) * 2.5
    ft = g.T(.25); flap = lp(g.nz(.25), 1500) * np.exp(-ft / .03) * .6 + np.sin(2 * np.pi * 90 * ft) * np.exp(-ft / .05) * .3
    put(out, lift, 0); put(out, wh + bp(cr, 1500, 6000), .25); put(out, flap, d - .1)
    return fade(out, .005, .05)

def paper_tear(g):
    """Xé / chọc thủng giấy: tách + chuỗi lạo xạo thưa dần (dataviz `snap`)."""
    d = .45; t = g.T(d); x = bp(g.nz(d), 1200, 6000) * np.exp(-t / .006) * 1.1
    for k in range(int(g.r.integers(8, 13))):
        s = int((.01 + (k / 10) ** 1.3 * .3) * SR); c = bp(g.nz(.016), 1500, 6000) * np.exp(-g.T(.016) / .003) * (.6 - k * .04)
        x[s:s + len(c)] += c[:len(x) - s]
    return fade(x + bp(g.nz(d), 250, 900) * np.exp(-t / .05) * 1.0, .0005, .05)

def card_flip(g):
    """Rút / lật thẻ giấy: phẩy giấy ngắn (microgame `card_flip`) + đập nhẹ."""
    d = .12; x = bp(g.nz(d), 1500, 7000) * g.dec(d, .015)
    return fade(x + lp(g.nz(d), 800) * g.dec(d, .02) * .4, .0005, .03)

def dice_roll(g):
    """Xúc xắc nhựa lăn trên bàn: 3–6 cú chạm nhỏ dần (click cộng hưởng nhựa — core `click`/`clack`), cú cuối dừng."""
    hits = int(g.r.integers(3, 7)); out = np.zeros(int(.9 * SR)); t = 0.0
    for k in range(hits):
        d = .07; tt = g.T(d); p = g.r.uniform(.85, 1.15)
        tr = bp(g.nz(d), 1500, 6000) * np.exp(-tt / .0015)
        res = sum(a * np.sin(2 * np.pi * f * p * tt + g.r.random() * 6) * np.exp(-tt / tau) for f, a, tau in [(1450, .6, .014), (2600, .3, .008), (720, .55, .025)])
        body = np.sin(2 * np.pi * 180 * p * tt) * np.exp(-tt / .02) * .9
        put(out, (tr * .8 + res + body) * (1 - k / (hits + 1)) ** 1.3, t); t += g.r.uniform(.05, .14) * (1 + .3 * k)
    return fade(out[:int(min(.9, t + .12) * SR)], .0005, .04)

def wood_knock(g):
    """Thân bút / thước gỗ chạm bàn (dataviz `wood`)."""
    d = .14; t = g.T(d); f = g.r.uniform(.9, 1.12)
    x = sum(a * np.sin(2 * np.pi * fr * f * t) * np.exp(-t / tau) for fr, a, tau in [(420, .8, .03), (860, .5, .018), (1650, .25, .01)])
    return fade(x + bp(g.nz(d), 800, 3500) * np.exp(-t / .002) * .4, .0005, .02)

# ── chất liệu: CARTOON / meme (kênh lịch sử, học Thanh Pahm — tiếng theo NGHĨA khoảnh khắc: nảy, nổ, súng, còi xe cổ, xe chết máy,
#    kim đĩa rít khi tua, còi trượt khi hỏng việc, dế kêu khi im lặng ngượng). Tất cả tổng hợp; tiếng đám đông reo dùng file CC0.
def tone(g, d, f, kind='sin'):
    """Dao động theo tần số tức thời f (mảng hoặc số) — tích phân pha."""
    f = np.broadcast_to(np.asarray(f, float), (int(round(d * SR)),)); ph = 2 * np.pi * np.cumsum(f) / SR
    if kind == 'saw': return 2 * ((ph / (2 * np.pi)) % 1) - 1
    if kind == 'sq': return np.sign(np.sin(ph))
    return np.sin(ph)

def toon_boing(g):
    """Lò xo / đàn môi: sóng răng cưa qua cộng hưởng, cao độ rung 11–14 Hz tắt dần (bom nảy khỏi xe)."""
    d = .75; t = g.T(d); f0 = g.r.uniform(150, 190); v = g.r.uniform(11, 14)
    f = f0 * (1 + .45 * np.sin(2 * np.pi * v * t) * np.exp(-t / .3)) * (1 - .15 * t)
    x = lp(tone(g, d, f, 'saw'), 1800) + .6 * tone(g, d, 2 * f)
    return fade(x * np.exp(-t / .28), .002, .05)

def toon_gun(g):
    """Súng lục 1914: tiếng nổ chát (nhiễu cao 6 ms) + cú đấm trầm + đuôi vang phố (dải giữa, 300 ms)."""
    d = .6; t = g.T(d); n = g.nz(d)
    crack = bp(n, 700, 4500) * np.exp(-t / .008); body = lp(g.nz(d), 220, 3) * np.exp(-t / .04) * 3 + np.sin(2 * np.pi * (75 - 30 * t) * t) * np.exp(-t / .06)
    tail = bp(g.nz(d), 250, 1800) * np.exp(-t / g.r.uniform(.18, .3)) * .3
    return fade(crack * .8 + body * 1.3 + tail, .0003, .05)

def toon_boom(g):
    """Nổ hoạt hình: chát mở đầu + ầm trầm (nhiễu lọc thấp 0.9 s) + sub rơi 55 → 30 Hz."""
    d = 1.4; t = g.T(d); n = g.nz(d)
    x = bp(n, 600, 3000) * np.exp(-t / .012) * .5 + lp(n, g.r.uniform(300, 420), 4) * np.exp(-t / .45) * 4
    x += np.sin(2 * np.pi * np.cumsum(55 - 25 * np.minimum(t, 1)) / SR) * np.exp(-t / .5) * 1.4
    return fade(x, .0005, .2)

def toon_honk(g):
    """Còi bóp xe cổ "honk honk": răng cưa ~380 Hz uốn cao độ, lọc giọng mũi; 2 tiếng."""
    out = np.zeros(int(.62 * SR)); f0 = g.r.uniform(340, 420)
    for k, at in enumerate([0, .3]):
        d = .22; t = g.T(d); f = f0 * (1 + .06 * np.minimum(t / .04, 1) - .05 * t / d) * (1 - .04 * k)
        h = lp(bp(tone(g, d, f, 'saw'), 300, 1600), 1800) + .4 * lp(tone(g, d, f / 2, 'sq'), 1200)
        put(out, fade(h * env(g, d, [(0, 0), (.08, 1), (.85, .8), (1, 0)]), .002, .02), at)
    return out

def toon_fuse(g):
    """Ngòi bom cháy xèo: nhiễu cao đều + lách tách ngẫu nhiên, 1.2 s."""
    d = 1.2; n = g.nz(d); t = g.T(d)
    pops = np.zeros(len(n)); idx = g.r.integers(0, len(n) - 400, 40); pops[idx] = g.r.uniform(.5, 1.5, 40)
    x = bp(n, 2000, 6500) * .5 * (1 + .3 * np.sin(2 * np.pi * 7 * t)) + bp(np.convolve(pops, np.exp(-np.arange(300) / 40), 'same'), 1200, 5000)
    return fade(x, .03, .1)

def toon_scratch(g):
    """Kim đĩa than rít (tua ngược / "khoan đã"): nhiễu dải hẹp, tâm quét lên rồi xuống nhanh."""
    out = []
    for lo, hi, d in [(500, 2600, .14), (2600, 400, .2)]:
        n = g.nz(d); t = g.T(d); fc = lo * (hi / lo) ** (t / d); y = np.zeros(len(n)); blk = 240
        for i in range(0, len(n), blk):
            c = fc[i]; y[i:i + blk] = bp(n[max(0, i - 2 * blk):i + blk], c * .7, c * 1.4)[-len(n[i:i + blk]):]
        out.append(fade(y * 3, .003, .02))
    return np.concatenate(out)

def toon_slide(g):
    """Còi trượt xuống (hỏng việc / "thôi xong"): sin + hơi thổi, 1400 → 350 Hz."""
    d = g.r.uniform(.55, .75); t = g.T(d); f = 1400 * (350 / 1400) ** (t / d) * (1 + .01 * np.sin(2 * np.pi * 6 * t))
    return fade(tone(g, d, f) + bp(g.nz(d), 1000, 4000) * .05, .02, .08)

def toon_stall(g):
    """Xe cổ khục khặc rồi chết máy: xung nổ máy chậm dần 16 → 3 Hz, rồi "phụt"."""
    d = 1.3; out = np.zeros(int((d + .4) * SR)); t = 0.0
    while t < d:
        rate = 16 - 13 * (t / d); put(out, lp(g.nz(.05), 260, 3) * np.exp(-g.T(.05) / .015) * (1.2 - .5 * t / d), t); t += 1 / rate + g.r.uniform(0, .01)
    put(out, bp(g.nz(.35), 200, 900) * env(g, .35, [(0, 0), (.1, .7), (1, 0)]), d + .02)
    return out

def toon_engine(g):
    """Xe cổ chạy pành pạch đều (xe vào cảnh): xung 22 Hz, 1.6 s."""
    d = 1.6; out = np.zeros(int(d * SR)); t = 0.0; k = 0
    while t < d - .05:
        put(out, lp(g.nz(.04), 300, 3) * np.exp(-g.T(.04) / .012) * (1 if k % 2 else .7), t); t += 1 / 22 + g.r.uniform(-.004, .004); k += 1
    return fade(out * env(g, d, [(0, 0), (.15, 1), (.8, 1), (1, 0)]), .01, .1)

def toon_ding(g):
    """Chuông "ding" (ý tưởng / đúng rồi): partial chuông lệch hoà âm."""
    d = 1.0; t = g.T(d); f = g.r.uniform(1650, 1850)
    return fade(sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / tau) for m, a, tau in [(1, 1, .45), (2.76, .35, .18), (5.4, .12, .08)]), .001, .1)

def toon_cricket(g):
    """Dế kêu (im lặng ngượng — "He does not go home."): 3 cụm chíp 4.6 kHz."""
    out = np.zeros(int(1.4 * SR)); f = g.r.uniform(4300, 4800)
    for c in range(3):
        for p in range(3): d = .022; put(out, np.sin(2 * np.pi * f * g.T(d)) * np.hanning(int(d * SR)), c * .42 + p * .035)
    return out

def toon_dun(g):
    """"Dun dun DUNNN" (lộ mặt kẻ chủ mưu): hợp âm răng cưa trầm, 2 ngắn + 1 dài."""
    out = np.zeros(int(2.0 * SR))
    for at, d, root in [(0, .22, 146.8), (.3, .22, 146.8), (.62, 1.3, 138.6)]:
        t = g.T(d); x = sum(lp(tone(g, d, root * r, 'saw'), 900) for r in (1, 1.189, 1.498, .5))
        put(out, fade(x * env(g, d, [(0, 0), (.04, 1), (.6, .8), (1, 0)]), .005, .05), at)
    return out

def toon_bonk(g):
    """"Bốp" vào đầu: tiếng chát ngắn + cao độ rơi 320 → 110 Hz."""
    d = .3; t = g.T(d); f = 110 + 210 * np.exp(-t / .04)
    return fade(tone(g, d, f) * np.exp(-t / .09) + bp(g.nz(d), 600, 2500) * np.exp(-t / .004) * .6, .0005, .03)

# kind → hàm. Loại không có ở đây giữ thư viện chung.
MATERIALS = {
    'paper': {'pen': paper_pen, 'tick': lambda g: paper_tap(g, 1.25), 'pop': paper_pop, 'whoosh': paper_swish,
              'page': page_turn, 'tear': paper_tear, 'card': card_flip, 'dice': dice_roll, 'wood': wood_knock},
    'cartoon': {'boing': toon_boing, 'gun': toon_gun, 'boom': toon_boom, 'honk': toon_honk, 'fuse': toon_fuse, 'scratch': toon_scratch,
                'slide': toon_slide, 'stall': toon_stall, 'engine': toon_engine, 'ding': toon_ding, 'cricket': toon_cricket, 'dun': toon_dun,
                'bonk': toon_bonk},
}
# loại mới không có trong thư viện chung → khớp RMS theo loại gần nghĩa nhất đã được tai người dùng duyệt (LESSONS §156)
RMS_REF = {'boing': 'pop', 'gun': 'impact', 'boom': 'impact', 'honk': 'beep', 'fuse': 'whoosh', 'scratch': 'whoosh', 'slide': 'whoosh',
           'stall': 'wood', 'engine': 'whoosh', 'ding': 'correct', 'cricket': 'tick', 'dun': 'impact', 'bonk': 'wood'}
N_DEFAULT = {'pen': 12}                       # loại dày đặc nhất của bài cần nhiều biến thể (probability: 55 cú bút)


def render(project, material, kind, i):
    seed = zlib.crc32(f'{project}:{material}:{kind}:{i}'.encode())
    g = Gen(seed); x = np.asarray(MATERIALS[material][kind](g), np.float64)
    nz = np.flatnonzero(np.abs(x) > 1e-4 * np.abs(x).max())
    x = x[nz[0]:nz[-1] + 1] if len(nz) else x
    pan = Gen(seed ^ 0x5A5A).r.uniform(-.25, .25)                 # vị trí ngang nhẹ, khác nhau mỗi biến thể
    st = np.stack([x * (1 - max(0, pan)), x * (1 + min(0, pan))], 1)
    return st / np.abs(st).max() * 10 ** (-6 / 20)                 # đỉnh −6 dBFS như thư viện chung (rồi khớp RMS — match_rms)


def rms(y):
    a = np.abs(y).max(1); m = a > 1e-3 * a.max()                 # bỏ đuôi lặng
    return float(np.sqrt(np.mean(y[m] ** 2)))


def match_rms(ys, kind):
    """Khớp RMS trung bình của loại này trong thư viện chung: mức `db` trong library.json (chỉnh theo tai người dùng) giữ
    nguyên nghĩa. Đỉnh không vượt −1 dBFS."""
    import wave
    ref = []
    for f in sorted((GLOBAL / RMS_REF.get(kind, kind)).glob('*.wav')):
        with wave.open(str(f)) as w: ref.append(rms(np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2) / 32768))
    if not ref: return ys
    target = float(np.mean(ref))
    return [y * min(target / max(rms(y), 1e-9), 10 ** (-1 / 20) / np.abs(y).max()) for y in ys]


def write_wav(f, y):
    import wave
    f.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(f), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('project', nargs='?'); ap.add_argument('--material'); ap.add_argument('--variants', type=int, default=6)
    ap.add_argument('--list', action='store_true')
    o = ap.parse_args()
    if o.list or not o.project:
        for m, ks in MATERIALS.items(): print(f'{m}: {", ".join(ks)}')
        if not o.list: ap.print_usage()
        return
    if o.material not in MATERIALS: sys.exit(f'--material phải là một trong: {", ".join(MATERIALS)}')
    P = ROOT / 'projects' / o.project
    if not P.is_dir(): sys.exit(f'không có {P}')
    out = P / 'assets' / 'sfx'; glob_meta = json.loads((GLOBAL / 'library.json').read_text())
    meta = {'_': f'bộ tiếng chất liệu "{o.material}" của bài — tools/sfx/material.py; đè assets/sfx đúng các loại dưới đây'}
    for kind in MATERIALS[o.material]:
        n = max(o.variants, N_DEFAULT.get(kind, 0))
        for old in (out / kind).glob('*.wav'): old.unlink()
        ys = match_rms([render(o.project, o.material, kind, i) for i in range(n)], kind)
        for i, y in enumerate(ys): write_wav(out / kind / f'{i + 1:02d}.wav', y)
        meta[kind] = glob_meta.get(kind, glob_meta.get(RMS_REF.get(kind, ''), {'db': 0, 'gap': .1}))
        print(f'▸ {kind}: {n} biến thể')
    (out / 'library.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1) + '\n')
    print(f'✓ {out.relative_to(ROOT)} — {len(MATERIALS[o.material])} loại')


if __name__ == '__main__':
    main()
