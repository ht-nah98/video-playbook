import pathlib, tempfile, unittest
from pack_check import check


def pack(d, **over):
    files = {'title.txt': 'T', 'title-b.txt': 'B', 'description.txt': 'x\n0:00 Intro', 'tags.txt': 'a, b',
             'problems.txt': '0:10 Why?', 'chapters.txt': '0:00 Intro', 'subtitles-en.srt': '1'}
    files.update(over)
    for n, t in files.items():
        if t is not None: (pathlib.Path(d) / n).write_text(t, encoding='utf-8')


class PackCheck(unittest.TestCase):
    def run_with(self, **over):
        with tempfile.TemporaryDirectory() as d:
            pack(d, **over); return check(d)

    def test_ok(self): self.assertEqual(self.run_with(), [])
    def test_missing_problems(self): self.assertIn('thiếu problems.txt', self.run_with(**{'problems.txt': None}))
    def test_problems_limit(self): self.assertTrue(any('800' in e for e in self.run_with(**{'problems.txt': '0:10 ' + 'x' * 800})))
    def test_stale_chapters(self): self.assertTrue(any('chương' in e for e in self.run_with(**{'chapters.txt': '0:32 Intro'})))
    def test_bad_problem_line(self): self.assertTrue(any('định dạng' in e for e in self.run_with(**{'problems.txt': 'Why?'})))


if __name__ == '__main__':
    unittest.main()
