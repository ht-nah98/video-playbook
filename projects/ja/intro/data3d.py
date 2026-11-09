#!/usr/bin/env python3
"""Dữ liệu 3D của `ja/intro` (kênh 99の発見; studio3d --set ja/intro, scene3d.ts): nhạc, lời theo CỤM, đường viền glyph,
mascot voxel.

    "$(python3 tools/config.py analysis_py)" projects/ja/intro/data3d.py      # từ gốc repo; cần unidic (tools/voice/ja.py)

Vào: audio/intro-ja.m4a (Suno, người dùng gửi 2026-10-10), data/music.json (MUSIC_LANG=ja tools/analyze/run.sh),
lyrics.txt (lời người dùng nhập cho Suno — nguồn CHỮ; whisper chỉ cho MỐC).
Ra data3d/: audio.json, lyrics.json, mix.m4a, glyphs.json, mascot-<pose>.json/.png.

Mốc cụm: whisper nghe stem giọng thành từng ký tự có mốc; đổi cả hai bên ra kana (ja.reading) rồi so chuỗi (difflib) —
cụm bắt đầu ở ký tự kana đầu tiên khớp. "99" được HÁT là ナインティナイン (tiếng Anh), nên cụm ghi cách đọc riêng.
Chữ khối: đường viền TrueType của Shippori Mincho Bold (明朝, OFL) làm phẳng thành đa giác, 1 em = 1.0; scene đùn
thành khối có vát cạnh (chữ Hán nét mảnh → voxel răng cưa, không "mịn").
"""
import difflib, json, shutil, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen

ROOT = Path(__file__).resolve().parents[3]
P = ROOT / 'projects/ja/intro'
OUT = P / 'data3d'
sys.path.insert(0, str(ROOT / 'tools/voice'))
import ja  # noqa: E402

FONT = ROOT / 'assets/fonts/ShipporiMincho-Bold.ttf'

# Cụm lời theo dòng (chữ HIỆN, cách ĐỌC để căn mốc khi khác chữ). Tách cụm = một vật thể trên hình (TREATMENT).
LINES = [
    ('why',     [('なぜ？', None), ('どうして？', None), ('答えを', None), ('探せ！', None)]),
    ('hidden',  [('数字の', None), ('裏に', None), ('隠れた', None), ('世界', None)]),
    ('visual',  [('見える', None), ('ビジュアル', None), ('ひらめく', None), ('未来！', None)]),
    ('hook1',   [('99', 'ないんてぃないん'), ('の', None), ('発見！', None)]),
    ('fun',     [('数学も', None), ('科学も', None), ('もっと', None), ('面白い！', None)]),
    ('know',    [('知るほど、', None), ('世界は', None), ('面白い！', None)]),
    ('hook2',   [('99', 'ないんてぃないん'), ('の', None), ('発見！', None)]),
    ('go',      [("Let's", 'れっつ'), ('go!', 'ごー')]),
]


def audio():
    m = json.loads((P / 'data/music.json').read_text())
    au = {'duration': m['duration'], 'bpm': m['bpm'], 'fps': m['fps'], 'beats': m['beats'], 'downbeats': m['downbeats'],
          'sections': [{'name': s['name'], 'start': s['start'], 'end': s['end']} for s in m['sections']],
          **{k: [round(x, 3) for x in v] for k, v in m['env'].items()},
          'onsets': {k: [[t, 1.0] for t in v] for k, v in m['onsets'].items()}}
    (OUT / 'audio.json').write_text(json.dumps(au))
    shutil.copy(P / 'audio/intro-ja.m4a', OUT / 'mix.m4a')
    return m


def _norm(c):
    import unicodedata
    c = unicodedata.normalize('NFKC', c).lower()
    return '' if c in '？！?!、。,. ' else c


def lyrics(m):
    """Mốc cụm = ký tự nghe được ĐẦU TIÊN khớp chữ đầu cụm; chữ đầu không khớp (whisper nghe 数字 → 富士, 99 → ナイディネビル)
    → ký tự nghe được NGAY SAU ký tự cuối đã khớp của cụm trước (lời hát liền mạch). So trên MẶT CHỮ: lời và whisper phần
    lớn cùng chữ Hán; đọc kana từng chữ Hán đứng riêng thì sai (面 → めん) — làm cụm 面白い trễ 0.45 s (đã gặp)."""
    heard, ht, he = [], [], []
    for w in m['words']:
        cs = [c for c in (_norm(c) for c in w['w']) if c]
        if w['w'].lower() in ('let', "'s", 'go'): cs = [w['w'].lower()]          # chữ Latin: một "ký tự" mỗi từ
        for i, c in enumerate(cs):
            heard.append(c); ht.append(w['start'] + (w['end'] - w['start']) * i / len(cs)); he.append(w['end'])
    units = [(lid, d) for lid, us in LINES for d, _ in us]
    want, owner = [], []
    for ui, (_, d) in enumerate(units):
        cs = [d.lower().rstrip('!')] if d.lower().rstrip('!') in ('let\'s', 'go') else [c for c in (_norm(c) for c in d) if c]
        if d == "Let's": cs = ['let']
        want += cs; owner += [ui] * len(cs)
    sm = difflib.SequenceMatcher(a=want, b=heard, autojunk=False)
    hit = {}                                       # vị trí trong want → vị trí trong heard
    for a, b, n in sm.get_matching_blocks():
        for i in range(n): hit[a + i] = b + i
    starts, last, pos = [], -1, 0
    for ui in range(len(units)):
        idx = [k for k in range(len(want)) if owner[k] == ui]
        if idx[0] in hit: s = ht[hit[idx[0]]]
        else:
            s = ht[min(last + 1, len(ht) - 1)]; print(f'   ~ {units[ui][1]}: chữ đầu không khớp → ký tự nghe được sau cụm trước ({heard[min(last + 1, len(ht) - 1)]})')
        starts.append(s)
        ms = [hit[k] for k in idx if k in hit]
        if ms: last = max(ms)
    lines, k = [], 0
    vocal_end = max(w['end'] for w in m['words'])
    for li, (lid, us) in enumerate(LINES):
        ws = []
        for j, (d, r) in enumerate(us):
            s = starts[k]; e = starts[k + 1] if k + 1 < len(units) else vocal_end
            ws.append({'w': d, 'start': round(s, 3), 'end': round(min(e, s + 1.6), 3), 'conf': 1}); k += 1
        lines.append({'i': li, 'id': lid, 'text': ''.join(w['w'] for w in ws), 'start': ws[0]['start'], 'end': ws[-1]['end'], 'words': ws})
    (OUT / 'lyrics.json').write_text(json.dumps({'lines': lines, 'notes': 'lyrics.txt (người dùng) + mốc whisper ja/CTC (data/music.json)'}, ensure_ascii=False))
    for l in lines: print(f"   {l['id']:7s} " + '  '.join(f"{w['w']}@{w['start']:.2f}" for w in l['words']))
    return lines


class FlatPen(BasePen):
    """Đường viền glyph → các vòng đa giác (đường cong chia đoạn đều)."""
    def __init__(self, gs, steps=8):
        super().__init__(gs); self.rings, self.cur, self.steps = [], [], steps
    def _moveTo(self, p): self.cur = [p]
    def _lineTo(self, p): self.cur.append(p)
    def _curveToOne(self, p1, p2, p3):
        p0 = self.cur[-1]
        for i in range(1, self.steps + 1):
            t = i / self.steps; u = 1 - t
            self.cur.append((u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
                             u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]))
    def _qCurveToOne(self, p1, p2):
        p0 = self.cur[-1]
        for i in range(1, self.steps + 1):
            t = i / self.steps; u = 1 - t
            self.cur.append((u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]))
    def _closePath(self):
        if len(self.cur) > 2: self.rings.append(self.cur)
        self.cur = []
    _endPath = _closePath


def glyphs(chars):
    f = TTFont(FONT); cmap, gs = f.getBestCmap(), f.getGlyphSet(); upm = f['head'].unitsPerEm
    out, miss = {}, []
    for ch in sorted(chars):
        if ord(ch) not in cmap: miss.append(ch); continue
        g = gs[cmap[ord(ch)]]; pen = FlatPen(gs); g.draw(pen)
        out[ch] = {'adv': round(g.width / upm, 4), 'rings': [[round(v / upm, 4) for xy in r for v in xy] for r in pen.rings]}
    if miss: sys.exit(f'LỖI: {FONT.name} thiếu ký tự {miss}')
    (OUT / 'glyphs.json').write_text(json.dumps({'font': FONT.name, 'ascender': f['hhea'].ascent / upm, 'glyphs': out}, ensure_ascii=False))
    return len(out), sum(len(r) for g in out.values() for r in g['rings']) // 2


def voxels(mask, rgb, depth):
    d = distance_transform_edt(mask); h = mask.shape[0]
    return [[int(c), int(h - 1 - r), *[int(v) for v in rgb[r, c]], round(float(depth(d[r, c])), 2)] for r, c in zip(*np.nonzero(mask))]


def mascot(pose, cell=10):
    im = Image.open(ROOT / f'assets/character-v2/cut/pose-{pose}.png').convert('RGBA'); im = im.crop(im.getbbox())
    W, H = im.size[0] // cell, im.size[1] // cell
    a = np.asarray(im.resize((W, H), Image.BOX), np.float32)
    mask = a[..., 3] > 140
    rgb = np.clip(a[..., :3] / np.maximum(a[..., 3:4] / 255, 1e-3), 0, 255)
    vox = voxels(mask, rgb, lambda d: 0.6 + 3.2 * np.sqrt(min(d, 7) / 7))
    (OUT / f'mascot-{pose}.json').write_text(json.dumps({'w': W, 'h': H, 'cell': cell, 'vox': vox, 'img': [im.size[0], im.size[1]]}))
    im.save(OUT / f'mascot-{pose}.png')
    return len(vox)


# chữ phụ trên hình (không phải lời hát): khung logo, chữ số tường soroban, ký hiệu nửa toán / nửa khoa học
EXTRA = '99の発見知るほど、世界は面白い0123456789'   # Shippori thiếu π Σ ∞ √ — ký hiệu đó vẽ bằng hình, không phải glyph

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    m = audio()
    print('▸ lời theo cụm (mốc nghe được):')
    ls = lyrics(m)
    chars = {c for l in ls for w in l['words'] for c in w['w']} | set(EXTRA)
    chars -= {' '}
    print('▸ glyph', *glyphs(chars), 'điểm')
    for p in ['wave', 'point']:
        print('▸ mascot', p, mascot(p))
