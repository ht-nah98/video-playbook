"""Test tools/voice/ja.py — chạy bằng venv phân tích (cần fugashi + unidic-lite + pykakasi):
    "$(python3 tools/config.py analysis_py)" -m unittest tools/voice/test_ja.py
Các ca lấy từ phép thử 2026-10-10 (channels/ja/WRITING.md) và lỗi đã gặp khi dựng ja-e2e."""
import sys, unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import ja


class Markup(unittest.TestCase):
    def test_ruby(self):
        s = '底辺{×|かける}高さ{÷|わる}2、{x²|エックスの二乗}です。'
        self.assertEqual(ja.display(s), '底辺×高さ÷2、x²です。')
        self.assertEqual(ja.spoken(s), '底辺かける高さわる2、エックスの二乗です。')


class Check(unittest.TestCase):
    def bad(self, s): return [x[0] for x in ja.check_spoken(s)]

    def test_measured_failures_are_blocked(self):
        self.assertEqual(self.bad('いつも百八十度です。'), ['百八十'])
        self.assertEqual(self.bad('底辺×高さ÷2'), ['×', '÷'])
        self.assertIn('x', self.bad('x²+y²'))
        self.assertEqual(self.bad('他の二辺'), ['他の'])

    def test_measured_passes_are_allowed(self):
        for s in ['いつも180度です。', 'ひゃくはちじゅう度', '底辺{×|かける}高さ', '{x²|エックスの二乗}', 'ほかの二辺の二乗', '三角形', '十分']:
            self.assertEqual(ja.check_spoken(s), [], s)


class Numbers(unittest.TestCase):
    def test_sound_changes(self):
        for n, k in [('180', 'ひゃくはちじゅう'), ('300', 'さんびゃく'), ('600', 'ろっぴゃく'), ('800', 'はっぴゃく'),
                     ('3000', 'さんぜん'), ('8000', 'はっせん'), ('10000', 'いちまん'), ('3.14', 'さんてんいちよん'), ('0', 'ぜろ')]:
            self.assertEqual(ja.num_kana(n), k)

    def test_mora(self):
        self.assertEqual(ja.mora('きょう'), 2); self.assertEqual(ja.mora('がっこう'), 4); self.assertEqual(ja.mora('そー'), 2)


class Hearing(unittest.TestCase):
    """whisper viết khác mặt chữ nhưng CÙNG cách đọc → không báo; chữ thừa đầu câu → báo."""
    def test_same_reading(self):
        for want, heard in [('いつもひゃくはちじゅう度になります。', 'いつも180度になります'),
                            ('斜辺の二乗は、ほかの二辺の二乗の和', '斜辺の2乗は他の2辺の2乗の和'),
                            (ja.spoken('{x²|エックスの二乗}{+|たす}{y²|ワイの二乗}'), 'xの2乗足すyの2乗'),
                            ('底辺かける高さわる2', '底辺×高さ÷2'),
                            ('みっつの問いに', '3つの問いに'),
                            ('はっぷんあまり前に', '8分あまり前に'),                       # hikari: 分 = ふん/ぷん
                            ('光子いっこずつ', '光子1個ずつ'), ('にほんへ', '日本へ'), ('せんきゅうひゃくにじゅうにねんの', '1922年の'),
                            ('にせんじゅうよねんさんにんは', '2014年3人は'), ('三百八十からななひゃくはちじゅうナノメートル', '380から780nm'),
                            ('ワイファイにーてんよんギガヘルツ', 'Wi-Fi2.4GHz'), ('ひといろずつ', '一色ずつ'), ('ひとかたまりずつ', '一塊ずつ'),
                            ('ちゅうくらい', '中くらい'), ('ちゅうくらい', '中ぐらい'), ('すいたい', '水体'), ('波長でいうと', '波長で言うと')]:            # whisper viết số + つ (ja/pi p1)
            c = ja.compare(want, heard)
            self.assertEqual((c['ratio'], c['leak']), (1.0, ''), (want, heard, c))

    def test_leak_and_misread(self):
        c = ja.compare('三角形の内角の和は、いつも180度になります。', 'でもそうだよね。三角形の内角の和はいつも100%になります')
        self.assertEqual(c['leak'], 'でもそうだよね')
        self.assertLess(c['ratio'], 0.95)


class Words(unittest.TestCase):
    def test_merge_and_ruby(self):
        ws = [w['w'] for w in ja.words('三角形の内角の和は、いつも180度になります。')]
        self.assertEqual(ws, ['三角形', 'の', '内角', 'の', '和', 'は', 'いつ', 'も', '180', '度', 'に', 'なります'])
        ws = [w['w'] for w in ja.words('底辺{×|かける}高さ{÷|わる}2、これが三角形の面積です。')]
        self.assertEqual(ws[:5], ['底辺', '×', '高さ', '÷', '2'])

    def test_romaji_for_ctc(self):
        self.assertEqual(ja.romaji('そー'), 'soo')
        self.assertTrue(all(c.isalpha() or c == "'" for w in ja.words('では、なぜそうなるのか') for c in ja.romaji(w['pron'])))


if __name__ == '__main__':
    unittest.main()
