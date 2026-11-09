"""python3 -m unittest tools/lesson/test_build.py — mốc cắt, meta đoạn, nguồn của trang (build.py)."""
import json, sys, tempfile, unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build  # noqa: E402


class Cuts(unittest.TestCase):
    def test_cuts_for(self):
        self.assertEqual(build.cuts_for(69.486, 1), [0, 69.486])
        self.assertEqual(build.cuts_for(10.0, 3), [0, 3.3, 6.7, 10.0])

    def test_seg_frames_round_half_up_like_js(self):
        self.assertEqual(build.jsround(2.5), 3)                  # round() của Python cho 2
        self.assertEqual(build.seg_frames(0, 69.486, 60), 4169)  # Math.round(4169.16)
        self.assertEqual(build.seg_frames(0, 0.025, 60), 2)      # 1.5 → 2 như JS


class Meta(unittest.TestCase):
    pt = {'cuts': [0, 50.0, 100.25], 'dur': 100.25, 'lead': 3.0}

    def want(self, src='abc', i=0):
        return build.seg_meta(self.pt, i, 60, src)

    def test_exact_match(self):
        self.assertTrue(build.meta_ok(self.want(), self.want(), keep=False))

    def test_missing_meta_never_ok(self):
        self.assertFalse(build.meta_ok(None, self.want(), keep=True))

    def test_src_change_rerenders_unless_keep(self):
        old = self.want('old')
        self.assertFalse(build.meta_ok(old, self.want('new'), keep=False))
        self.assertTrue(build.meta_ok(old, self.want('new'), keep=True))

    def test_unknown_src_only_keep(self):
        old = {**self.want(None), 'migrated': True}
        self.assertFalse(build.meta_ok(old, self.want(None), keep=False))
        self.assertTrue(build.meta_ok(old, self.want('x'), keep=True))

    def test_cut_or_lead_change_breaks_keep(self):
        self.assertFalse(build.meta_ok(self.want(i=1), self.want(i=0), keep=True))
        self.assertFalse(build.meta_ok({**self.want(), 'lead': 2.5}, self.want(), keep=True))
        self.assertFalse(build.meta_ok({**self.want(), 'dur': 100.3}, self.want(), keep=True))

    def test_float_noise_ignored(self):
        self.assertTrue(build.meta_ok({**self.want(), 'dur': 100.25000000001}, self.want(), keep=False))

    def test_fps_change_rerenders_unless_keep(self):
        w = self.want()
        self.assertFalse(build.meta_ok({**w, 'fps': 30}, w, keep=False))
        self.assertTrue(build.meta_ok({**w, 'fps': 30}, w, keep=True))


class Project(unittest.TestCase):
    """Dự án giả trong thư mục tạm: plan_parts, src_files, src_hash, migrate_meta."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(); R = Path(self.tmp.name)
        self.patch = mock.patch.object(build, 'ROOT', R); self.patch.start()
        P = R / 'projects' / 'x'; (P / 'plates').mkdir(parents=True); (P / 'data').mkdir()
        (R / 'engine' / 'render').mkdir(parents=True); (R / 'assets' / 'fonts').mkdir(parents=True)
        (R / 'engine' / 'lib.js').write_text('export const W = 1920;\n')
        (R / 'engine' / 'render' / 'shoot.js').write_text('//\n')
        (R / 'assets' / 'fonts' / 'A.ttf').write_bytes(b'font')
        (P / 'p2.html').write_text("<style>@font-face{src:url(\"../../assets/fonts/A.ttf\")}</style><script type=module>\n"
                                   "import { ALL } from './plates/p2-order.js'; import { W } from '../../engine/lib.js';\n"
                                   "import '../../engine/render/shoot.js';\nfetch('./data/p2.timeline.json'); fetch('./build.json');\n</script>")
        (P / 'plates' / 'p2-order.js').write_text("export const ALL = ['b1-a', 'b2-b'];\n")
        (P / 'plates' / 'b1-a.js').write_text("static IMAGES = { k: './assets/pic (1).jpg' };\n")
        (P / 'plates' / 'b2-b.js').write_text("//\n"); (P / 'plates' / 'z9-unused.js').write_text('//\n')
        (P / 'assets').mkdir(); (P / 'assets' / 'pic (1).jpg').write_bytes(b'jpg')
        (P / 'data' / 'p2.timeline.json').write_text(json.dumps({'lines': [{'end': 10.0}]}))
        self.cfg = {'parts': [{'intro': True}, {'page': 'p2', 'timeline': 'p2', 'lead': 3.0, 'tail': 2.0, 'split': 3}]}
        (P / 'build.json').write_text(json.dumps(self.cfg))
        self.R, self.P, self.D = R, P, R / 'out' / 'x' / 'parts'; self.D.mkdir(parents=True)

    def tearDown(self):
        self.patch.stop(); self.tmp.cleanup()

    def test_plan_parts(self):
        intro, pt = build.plan_parts(self.P, self.cfg, self.D)
        self.assertTrue(intro['intro'])
        self.assertEqual(pt['dur'], 15.0)
        self.assertEqual(pt['cuts'], [0, 5.0, 10.0, 15.0])
        self.assertEqual([s.name for s in pt['segs']], ['1-p2-01', '1-p2-02', '1-p2-03'])

    def test_src_files(self):
        got = {str(f.relative_to(self.R)) for f in build.src_files(self.P, 'p2')}
        self.assertEqual(got, {'projects/x/p2.html', 'projects/x/plates/p2-order.js', 'projects/x/plates/b1-a.js',
                               'projects/x/plates/b2-b.js', 'engine/lib.js', 'assets/fonts/A.ttf',
                               'projects/x/data/p2.timeline.json', 'projects/x/assets/pic (1).jpg'})

    def test_src_hash_tracks_pixel_sources_only(self):
        pt = build.plan_parts(self.P, self.cfg, self.D)[1]
        h0 = build.src_hash(self.P, pt)
        (self.R / 'engine' / 'render' / 'shoot.js').write_text('// đổi\n')        # không ảnh hưởng pixel
        (self.P / 'plates' / 'z9-unused.js').write_text('// đổi\n')               # không nằm trong trang
        self.assertEqual(build.src_hash(self.P, pt), h0)
        self.assertEqual(build.src_hash(self.P, {**pt, 'entry': {**pt['entry'], 'split': 9}}), h0)   # split không đổi pixel
        (self.P / 'plates' / 'b2-b.js').write_text('// đổi\n')
        h1 = build.src_hash(self.P, pt); self.assertNotEqual(h1, h0)
        self.assertNotEqual(build.src_hash(self.P, {**pt, 'entry': {**pt['entry'], 'tail': 2.5}}), h1)

    def test_migrate_meta(self):
        pt = build.plan_parts(self.P, self.cfg, self.D)[1]
        for s in pt['segs']: s.with_suffix('.mp4').write_bytes(b'')
        want = {pt['segs'][0].with_suffix('.mp4'): 300, pt['segs'][1].with_suffix('.mp4'): 300, pt['segs'][2].with_suffix('.mp4'): 299}
        with mock.patch.object(build, 'frames', lambda f: want[f]), mock.patch('builtins.print'):
            build.migrate_meta(self.P, build.plan_parts(self.P, self.cfg, self.D), 60)
        m0, m2 = build.read_meta(pt['segs'][0]), build.read_meta(pt['segs'][2])
        self.assertIsNone(m2)                                                      # sai số khung → không ghi
        self.assertEqual((m0['from'], m0['to'], m0['dur'], m0['lead'], m0['migrated']), (0, 5.0, 15.0, 3.0, True))
        self.assertTrue(build.meta_ok(m0, build.seg_meta(pt, 0, 60, 'whatever'), keep=True))


if __name__ == '__main__':
    unittest.main()
