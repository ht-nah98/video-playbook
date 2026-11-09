"""out_dir: bài đã đăng → out/<kênh>/<p>_public; chưa đăng → out/<kênh>/<p> (2026-10-22, theo kênh 2026-10-24)."""
import tempfile, unittest
from pathlib import Path
import channel


class OutDir(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(); self.old = channel.ROOT; channel.ROOT = Path(self.tmp.name)
        (channel.ROOT / 'out' / 'en' / 'pi_public').mkdir(parents=True); (channel.ROOT / 'out' / 'en' / 'trig').mkdir()
        (channel.ROOT / 'out' / 'ja' / 'pi').mkdir(parents=True)

    def tearDown(self):
        channel.ROOT = self.old; self.tmp.cleanup()

    def test_public(self):
        self.assertEqual(channel.out_dir('en/pi'), channel.ROOT / 'out' / 'en' / 'pi_public')
        self.assertEqual(channel.final_mp4('en/pi'), channel.ROOT / 'out' / 'en' / 'pi_public' / 'pi.mp4')
        self.assertEqual(channel.qa_dir('en/pi'), channel.ROOT / 'out' / 'en' / 'pi_public' / 'qa')

    def test_not_public(self):
        self.assertEqual(channel.out_dir('en/trig'), channel.ROOT / 'out' / 'en' / 'trig')
        self.assertEqual(channel.out_dir('ja/pi'), channel.ROOT / 'out' / 'ja' / 'pi')   # cùng tên bài kênh khác không lẫn
        self.assertEqual(channel.out_dir('hist/new'), channel.ROOT / 'out' / 'hist' / 'new')           # chưa có thư mục → tên thường


if __name__ == '__main__':
    unittest.main()
