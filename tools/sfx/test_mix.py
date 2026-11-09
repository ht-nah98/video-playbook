"""python3 -m unittest tools/sfx/test_mix.py"""
import sys, unittest
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).parent))
from mix import mix, load_library

SR = 48000


class Mix(unittest.TestCase):
    def setUp(self):
        self.lib = load_library()

    def test_shape_and_silence_without_cues(self):
        y = mix([], 2.0, self.lib)
        self.assertEqual(y.shape, (2 * SR, 2)); self.assertEqual(np.abs(y).max(), 0)

    def test_sound_lands_at_cue_time(self):
        y = mix([{'t': 1.0, 'kind': 'pop'}], 2.0, self.lib)
        on = np.argmax(np.abs(y).max(1) > 1e-3) / SR
        self.assertAlmostEqual(on, 1.0, delta=0.005)

    def test_deterministic(self):
        c = [{'t': 0.2 + 0.1 * i, 'kind': 'type'} for i in range(8)]
        self.assertTrue(np.array_equal(mix(c, 2, self.lib), mix(c, 2, self.lib)))

    def test_gap_drops_crowded_same_kind(self):
        a = mix([{'t': 0.5, 'kind': 'snap'}], 2, self.lib)
        b = mix([{'t': 0.5, 'kind': 'snap'}, {'t': 0.52, 'kind': 'snap'}], 2, self.lib)
        self.assertTrue(np.array_equal(a, b))

    def test_no_immediate_variant_repeat(self):
        from mix import pick_variants
        v = pick_variants([{'t': i * 0.2, 'kind': 'type'} for i in range(40)], self.lib)
        self.assertTrue(all(x != y for x, y in zip(v, v[1:])))

    def test_unknown_kind_raises(self):
        with self.assertRaises(KeyError): mix([{'t': 0, 'kind': 'boing'}], 1, self.lib)

    def test_cue_past_end_is_clipped_not_crash(self):
        y = mix([{'t': 1.95, 'kind': 'whoosh-long'}], 2, self.lib)
        self.assertEqual(len(y), 2 * SR)


if __name__ == '__main__':
    unittest.main()
