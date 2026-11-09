import subprocess, sys, tempfile, unittest, wave
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import ROOT, duration


class CommonTest(unittest.TestCase):
    def test_root(self):
        self.assertTrue((ROOT / 'AGENTS.md').exists())

    def test_duration(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'a.wav'
            with wave.open(str(p), 'wb') as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(8000); w.writeframes(b'\0\0' * 4000)
            self.assertAlmostEqual(duration(p), 0.5, places=2)
            self.assertEqual(duration(Path(d) / 'none.wav', 0), 0)
            with self.assertRaises(subprocess.CalledProcessError):
                duration(Path(d) / 'none.wav')


if __name__ == '__main__':
    unittest.main()
