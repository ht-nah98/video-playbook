"""Sổ năng lực (tools/qa/capabilities.json) không được mục: thư viện còn, lối vào còn gọi nó, bài học dẫn có thật, mọi script Blender
wn có tên trong bản đồ docs/blender/README.md. Lý do: §294 — clip.py viết mới bỏ quên motion.py, video tụt về 40–50 %."""
import json, re, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CAP = json.loads((ROOT / 'tools/qa/capabilities.json').read_text())
LESSONS = (ROOT / 'docs/LESSONS.md').read_text()


class Capabilities(unittest.TestCase):
    def test_libs_exist(self):
        bad = [c['lib'] for a in CAP['areas'] for c in a['caps'] if not (ROOT / c['lib']).exists()]
        self.assertEqual(bad, [], 'thư viện trong sổ năng lực đã mất / đổi chỗ — sửa sổ hoặc khôi phục')

    def test_entries_still_use_libs(self):
        bad = []
        for a in CAP['areas']:
            for c in a['caps']:
                for f, pats in c['used_by'].items():
                    p = ROOT / f
                    txt = p.read_text() if p.exists() else ''
                    bad += [f'{c["name"]}: {f} thiếu "{x}"' for x in pats if x not in txt]
        self.assertEqual(bad, [], 'lối vào bỏ dùng kỹ thuật đã đúc kết (lặp §294) — dùng lại thư viện, đừng viết mới')

    def test_lessons_exist(self):
        bad = [c['lesson'] for a in CAP['areas'] for c in a['caps'] if not re.search(rf'^## {c["lesson"][1:]}\. ', LESSONS, re.M)]
        self.assertEqual(bad, [], 'sổ năng lực dẫn §n không có trong LESSONS')


if __name__ == '__main__':
    unittest.main()
