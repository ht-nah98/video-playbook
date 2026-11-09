#!/usr/bin/env python3
"""Trộn track hiệu ứng từ danh sách cue — tất định (cùng cue → cùng tiếng từng mẫu).

    python3 tools/sfx/mix.py <cues.json> <dur> <out.wav> [--db -9] [--lib projects/<p>/assets/sfx]

cues.json = [{t (giây trang), kind, db?}] — do trang gom (engine/sfx.js collectCues) và shoot.js `cues` xuất ra.
Thư viện assets/sfx/<kind>/*.wav (48k stereo, đỉnh −6 dBFS) + library.json {kind: {db, gap}}.
Mỗi cue: biến thể xoay vòng không lặp liền nhau, lệch ±1 dB; cùng loại sát hơn `gap` thì bỏ. --db = mức cả track
(build.json "sfx_db"), trộn dưới giọng đã loudnorm. Luật: docs/lesson/SFX.md.
"""
import argparse, json, sys, wave, zlib
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT  # noqa: E402
LIB = ROOT / 'assets' / 'sfx'
SR = 48000


def read_wav(f):
    with wave.open(str(f)) as w:
        assert w.getframerate() == SR and w.getsampwidth() == 2 and w.getnchannels() == 2, f'{f}: cần 48k/16-bit/stereo'
        return np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2).astype(np.float32) / 32768


def load_library(root=LIB, extra=None):
    """Thư viện chung; `extra` = bộ tiếng chất liệu của bài (tools/sfx/material.py) — đè đúng các loại nó có."""
    def one(r):
        meta = json.loads((r / 'library.json').read_text())
        return {k: {**v, 'files': [read_wav(f) for f in sorted((r / k).glob('*.wav'))]} for k, v in meta.items() if k != '_'}
    lib = one(root)
    if extra and (Path(extra) / 'library.json').exists(): lib.update(one(Path(extra)))
    return lib


def keep(cues, lib):
    """Sắp theo t, bỏ cue cùng loại sát hơn gap. Loại lạ → KeyError."""
    last, out = {}, []
    for c in sorted(cues, key=lambda c: c['t']):
        k = c['kind']; gap = lib[k]['gap']
        if k in last and c['t'] - last[k] < gap: continue
        last[k] = c['t']; out.append(c)
    return out


def pick_variants(cues, lib, seed=0):
    rng, prev, out = {}, {}, []
    for c in cues:
        k = c['kind']; n = len(lib[k]['files'])
        r = rng.setdefault(k, np.random.default_rng(zlib.crc32(f'{k}:{seed}'.encode())))
        i = int(r.integers(n - 1 if n > 1 and k in prev else n))
        if n > 1 and k in prev and i >= prev[k]: i += 1
        prev[k] = i; out.append(i)
    return out


def mix(cues, dur, lib, db=0.0, seed=0):
    n = int(round(dur * SR)); y = np.zeros((n, 2), np.float32)
    cues = keep(cues, lib)
    jit = np.random.default_rng(seed + 1)
    for c, v in zip(cues, pick_variants(cues, lib, seed)):
        x = lib[c['kind']]['files'][v]
        g = 10 ** ((db + lib[c['kind']]['db'] + c.get('db', 0) + jit.uniform(-1, 1)) / 20)
        i = int(round(c['t'] * SR))
        if i >= n: continue
        m = min(len(x), n - i); y[i:i + m] += x[:m] * g
    return y


def write_wav(f, y):
    with wave.open(str(f), 'w') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('cues'); ap.add_argument('dur', type=float); ap.add_argument('out')
    ap.add_argument('--db', type=float, default=-9); ap.add_argument('--seed', type=int, default=0)
    ap.add_argument('--lib', help='bộ tiếng chất liệu của bài (đè thư viện chung theo loại)')
    o = ap.parse_args()
    cues = json.loads(Path(o.cues).read_text()); lib = load_library(extra=o.lib)
    y = mix(cues, o.dur, lib, o.db, o.seed); write_wav(o.out, y)
    kept = keep(cues, lib)
    print(f'▸ sfx: {len(kept)}/{len(cues)} cue · đỉnh {20 * np.log10(np.abs(y).max() + 1e-9):.1f} dBFS → {o.out}')


if __name__ == '__main__':
    main()
