#!/usr/bin/env python3
"""Kiểm bảng số đọc-bằng-chữ của phụ đề:  python3 -m unittest tools/voice/test_publish.py  (hoặc chạy thẳng file)."""
import json, re, sys, unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import publish  # noqa: E402
from publish import ROOT, load_spoken, written, cues_of  # noqa: E402

PROJECTS = sorted(str(p.parent.relative_to(ROOT / 'projects')) for p in (ROOT / 'projects').glob('*/*/spoken.json'))   # mã dự án: en/pemdas


class SpokenTables(unittest.TestCase):
    def test_projects_found(self):
        for p in ('en/math-30k', 'en/zero-div', 'en/pemdas', 'en/fifty-percent', 'en/pi', 'en/neg-times-neg', 'en/zero-power', 'en/intuition'):
            self.assertIn(p, PROJECTS)

    def test_longest_first(self):
        for p in PROJECTS:
            lens = [len(a) for a, _ in load_spoken(p)]
            self.assertEqual(lens, sorted(lens, reverse=True), p)

    def test_no_shadowing(self):
        """Mỗi cụm đọc, đứng một mình, qua CẢ bảng của bài phải ra đúng cách viết của nó:
        không cụm nào bị cụm khác cắn mất một phần, và không cụm nào sửa tiếp kết quả của cụm khác."""
        for p in PROJECTS:
            table = load_spoken(p)
            for a, b in table:
                with self.subTest(project=p, spoken=a):
                    self.assertEqual(written(a, table), b)

    def test_shared_only_generic(self):
        shared = json.loads((ROOT / 'projects/_shared/spoken.json').read_text(encoding='utf-8'))
        self.assertIn(['ninety-nine percent from scratch', '99% from scratch'], shared)

    def test_fifty_percent_5067(self):
        t = load_spoken('en/fifty-percent')
        self.assertEqual(written('he got five thousand and sixty-seven heads', t), 'he got 5,067 heads')
        self.assertEqual(written('five thousand and ninety-four tails', t), '5,094 tails')
        self.assertEqual(written('about five thousand', t), 'about 5,000')

    def test_pi_doubling(self):
        t = load_spoken('en/pi')
        self.assertEqual(written('Then he doubled the sides. Twelve. Twenty-four. Forty-eight. Ninety-six.', t),
                         'Then he doubled the sides. 12. 24. 48. 96.')

    def test_keeps_sentence_case(self):
        t = load_spoken('en/fifty-percent')
        self.assertEqual(written('About one hundred of them really', t), 'About 100 of them really')
        self.assertEqual(written('about one hundred of them really', t), 'about 100 of them really')
        self.assertEqual(written('In nineteen thirty-three,', t), 'In 1933,')

    def test_whole_words_only(self):
        t = [('eighteen thirty', '1830'), ('twenty-four', '24')]
        t = sorted(t, key=lambda r: -len(r[0]))
        self.assertEqual(written('in eighteen thirty-three', t), 'in eighteen thirty-three')
        self.assertEqual(written('a twenty-four-year-old', t), 'a twenty-four-year-old')
        self.assertEqual(written('in eighteen thirty, then twenty-four.', t), 'in 1830, then 24.')

    def test_projects_isolated(self):
        """Mục của bài khác không lọt vào bảng của bài này."""
        self.assertEqual(written('five thousand and sixty-seven', load_spoken('en/pemdas')), 'five thousand and sixty-seven')


class Deterministic(unittest.TestCase):
    def cues(self, p):
        out = []
        for sg in json.loads((ROOT / f'projects/{p}/data/segments.json').read_text(encoding='utf-8')):
            if 'timeline' not in sg: continue
            tl = json.loads((ROOT / f"projects/{p}/data/{sg['timeline']}.timeline.json").read_text(encoding='utf-8'))
            for l in tl['lines']: out += cues_of(l, sg['offset'], load_spoken(p))
        return out

    def test_same_output_twice(self):
        for p in PROJECTS:
            with self.subTest(project=p):
                a = self.cues(p)
                publish._compiled.cache_clear()
                self.assertEqual(a, self.cues(p))
                self.assertTrue(a)

    def test_cues_have_no_partial_numbers(self):
        """Không cue nào lẫn chữ số với số đọc dở dang kiểu '5,000 and sixty-seven'."""
        words = r'(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)'
        bad = re.compile(r'\d[\d,]* and ' + words + r'\b|\b' + words + r'-\d|\d-' + words + r'\b', re.I)
        for p in PROJECTS:
            for _, _, s in self.cues(p):
                with self.subTest(project=p, cue=s):
                    self.assertIsNone(bad.search(s))


if __name__ == '__main__':
    unittest.main()
