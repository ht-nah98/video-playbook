"""python3 -m unittest tools/sfx/test_material.py — tiếng theo chất liệu (material.py) + bộ của bài đè thư viện (mix --lib)."""
import sys, unittest, wave
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).parent))
from material import render, match_rms, rms, MATERIALS, GLOBAL, ROOT, SR
from mix import load_library, mix


def wav(f):
    with wave.open(str(f)) as w: return np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2) / 32768


def centroid(y):
    m = y.mean(1); S = np.abs(np.fft.rfft(m)); f = np.fft.rfftfreq(len(m), 1 / SR)
    return float((S * f).sum() / S.sum())


class Material(unittest.TestCase):
    def test_deterministic_and_variants_differ(self):
        a, b = render('t', 'paper', 'pen', 0), render('t', 'paper', 'pen', 0)
        self.assertTrue(np.array_equal(a, b))
        self.assertFalse(np.array_equal(a[:1000], render('t', 'paper', 'pen', 1)[:1000]))

    def test_rms_matches_library_and_peak_safe(self):
        for kind in MATERIALS['paper']:
            ref = np.mean([rms(wav(f)) for f in sorted((GLOBAL / kind).glob('*.wav'))] or [0])
            for y in match_rms([render('t', 'paper', kind, i) for i in range(3)], kind):
                self.assertLessEqual(np.abs(y).max(), 10 ** (-1 / 20) + 1e-9, kind)
                if ref: self.assertLessEqual(rms(y), ref * 1.01, kind)

    def test_not_brighter_than_library(self):
        """Bản đầu chói (xé giấy 12 kHz, gỗ 8 kHz) — giữ trọng tâm phổ trong dải thư viện chung (×1.5; bản chói là ×2.6, whoosh đã duyệt ×1.35)."""
        for kind in MATERIALS['paper']:
            ref = [centroid(wav(f)) for f in sorted((GLOBAL / kind).glob('*.wav'))]
            if not ref: continue
            c = max(centroid(render('t', 'paper', kind, i)) for i in range(3))
            self.assertLessEqual(c, max(ref) * 1.5, f'{kind}: {c:.0f} Hz')

    def test_probability_set_unchanged(self):
        """Bài đã sinh giữ tiếng: sửa material.py không được đổi bộ đã commit của probability."""
        d = ROOT / 'projects' / 'en' / 'probability' / 'assets' / 'sfx'
        for kind in ('pen', 'page', 'wood'):
            files = sorted((d / kind).glob('*.wav'))
            ys = match_rms([render('probability', 'paper', kind, i) for i in range(len(files))], kind)
            for f, y in zip(files[:3], ys):
                got = (np.clip(y, -1, 1) * 32767).astype('<i2') / 32768
                self.assertTrue(np.array_equal(got, wav(f)), f.name)


class Overlay(unittest.TestCase):
    def test_lesson_set_overrides_only_its_kinds(self):
        d = ROOT / 'projects' / 'en' / 'probability' / 'assets' / 'sfx'
        base, lib = load_library(), load_library(extra=d)
        self.assertEqual(len(lib['pen']['files']), len(list((d / 'pen').glob('*.wav'))))
        self.assertIs(type(lib['correct']['files']), list)
        self.assertEqual(len(lib['correct']['files']), len(base['correct']['files']))
        y = mix([{'t': 0.5, 'kind': 'pen'}], 2, lib)
        self.assertGreater(np.abs(y).max(), 0)


if __name__ == '__main__':
    unittest.main()
