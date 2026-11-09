import unittest
from par import split


class Split(unittest.TestCase):
    def test_contiguous_frames(self):
        for dur, fps, n in [(81.034, 60, 4), (665.2, 60, 4), (10, 30, 3), (0.1, 60, 4), (81.0333, 60, 7)]:
            segs = split(dur, fps, n)
            ks = [(round(a * fps), round(b * fps)) for a, b in segs]
            self.assertEqual(ks[0][0], 0)
            self.assertEqual(ks[-1][1], round(dur * fps))
            for (_, b), (c, _) in zip(ks, ks[1:]):
                self.assertEqual(b, c)          # không hụt, không trùng khung ở mối nối
            self.assertTrue(all(b > a for a, b in ks))


if __name__ == '__main__':
    unittest.main()
