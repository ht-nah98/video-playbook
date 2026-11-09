"""Tiếng Nhật cho đường ống giọng bài học (channels/ja/WRITING.md, PIPELINE.md).

Một dòng SCRIPT tiếng Nhật có HAI bản: chữ để HIỆN (phụ đề, mốc chữ cho cảnh) và chữ để ĐỌC (gửi OmniVoice). Viết chung
một dòng bằng cú pháp chú âm `{hiện|đọc}`:  `{x²|エックスの二乗}{+|たす}{y²|ワイの二乗}` → phụ đề "x²+y²", giọng đọc
"エックスの二乗たすワイの二乗". Ngoài ngoặc: hiện = đọc.

Vì sao (phép thử 2026-10-10, 8 câu × 3 take): OmniVoice KHÔNG chuẩn hoá chữ cho ja, mô hình tự đoán — 百八十 đúng 1/3,
× ÷ và x²+y²=z² đúng 0/3; chữ số Ả Rập, kana, phép toán bằng lời, biến bằng katakana đúng 3/3. `check_spoken` chặn các
mẫu đã sai TRƯỚC khi tốn một take.

Phần không cần thư viện (markup, check, số → kana, mora) chạy bằng python thường (narrate.py). Tách từ / đọc kana /
romaji cần fugashi + unidic-lite + pykakasi — có ở venv phân tích (tools/config.py analysis_py), nạp lười.
"""
import re
import unicodedata

# ── cú pháp chú âm ─────────────────────────────────────────────────────────────
_RUBY = re.compile(r'\{([^{}|]+)\|([^{}|]+)\}')


def units(text):
    """→ [(hiện, đọc, chú_âm?)] theo thứ tự: đoạn chú âm là một khối; đoạn thường hiện = đọc."""
    out, pos = [], 0
    for m in _RUBY.finditer(text):
        if m.start() > pos: out.append((text[pos:m.start()], text[pos:m.start()], False))
        out.append((m.group(1), m.group(2), True)); pos = m.end()
    if pos < len(text): out.append((text[pos:], text[pos:], False))
    return out


def display(text):
    return ''.join(u[0] for u in units(text))


def spoken(text):
    return ''.join(u[1] for u in units(text))


# ── chặn mẫu đã đo là SAI (trên chữ để ĐỌC) ──────────────────────────────────────
_KANJI_NUM = '〇一二三四五六七八九'
_BAD = [
    (re.compile(r'[×÷＋+＝=−\-－√²³％%^/／<>≤≥≠≈πθ∠△]'), 'ký hiệu toán (đọc sai/bị nuốt 3/3) — viết bằng lời: かける わる たす ひく イコール の二乗 ルート パーセント'),
    (re.compile(r'[A-Za-zＡ-Ｚａ-ｚ]'), 'chữ Latin (x²… đọc vô nghĩa 3/3) — viết katakana: エックス ワイ ゼット エー ビー…'),
    (re.compile(rf'[{_KANJI_NUM}十][十百千万][{_KANJI_NUM}十百千万]*|[百千][{_KANJI_NUM}十百千万]+'), 'số Hán nhiều chữ (百八十 đúng 1/3) — viết chữ số 180 hoặc kana ひゃくはちじゅう'),
    (re.compile(r'他の'), '他の đọc nhầm た/ほか (ホタニヘン) — viết ほかの'),
]


def check_spoken(text):
    """→ [(đoạn, lý do)] cho chữ để ĐỌC; rỗng = sạch. Thêm mẫu vào _BAD khi một phép thử mới chứng minh nó sai."""
    s, bad = spoken(text), []
    for rx, why in _BAD:
        for m in rx.finditer(s): bad.append((m.group(0), why))
    return bad


# ── số → kana (biến âm 300 さんびゃく, 600 ろっぴゃく, 800 はっぴゃく, 3000 さんぜん, 8000 はっせん) ──
_D = ['ぜろ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう']
_HUN = {1: 'ひゃく', 3: 'さんびゃく', 6: 'ろっぴゃく', 8: 'はっぴゃく'}
_THO = {1: 'せん', 3: 'さんぜん', 8: 'はっせん'}


def _under_10000(n):
    s = ''
    th, n = divmod(n, 1000)
    if th: s += _THO.get(th, _D[th] + 'せん')
    h, n = divmod(n, 100)
    if h: s += _HUN.get(h, _D[h] + 'ひゃく')
    t, n = divmod(n, 10)
    if t: s += ('' if t == 1 else _D[t]) + 'じゅう'
    if n: s += _D[n]
    return s


def num_kana(num):
    """'180' → ひゃくはちじゅう; '3.14' → さんてんいちよん; '1,000' → せん. Số nguyên tới 10^16."""
    num = unicodedata.normalize('NFKC', num).replace(',', '')
    if '.' in num:
        a, b = num.split('.', 1)
        return num_kana(a or '0') + 'てん' + ''.join(_D[int(c)] for c in b)
    n = int(num)
    if n == 0: return 'ぜろ'
    out = ''
    for unit, name in ((10 ** 12, 'ちょう'), (10 ** 8, 'おく'), (10 ** 4, 'まん')):
        q, n = divmod(n, unit)
        if q: out += _under_10000(q) + name
    return out + _under_10000(n)


# ── kana, mora ─────────────────────────────────────────────────────────────────
def hira(s):
    """Katakana → hiragana (giữ ー)."""
    return ''.join(chr(ord(c) - 0x60) if 'ァ' <= c <= 'ヶ' else c for c in s)


_SMALL = set('ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ')


def mora(kana):
    """Số mora của chuỗi kana: mỗi kana 1, ゃゅょ nhỏ 0, っ ん ー mỗi cái 1; ký tự khác bỏ qua."""
    return sum(1 for c in kana if ('ぁ' <= c <= 'ゖ' or 'ァ' <= c <= 'ヺ' or c == 'ー') and c not in _SMALL)


_TAGGER = None


def _tagger():
    global _TAGGER
    if _TAGGER is None:
        import fugashi
        _TAGGER = fugashi.Tagger()
    return _TAGGER


_SYM = {'×': 'かける', '÷': 'わる', '+': 'たす', '＋': 'たす', '=': 'いこーる', '＝': 'いこーる', '%': 'ぱーせんと', '％': 'ぱーせんと',
        '−': 'まいなす', '-': 'まいなす', '²': 'のにじょう', '³': 'のさんじょう', '√': 'るーと'}
_NUM = re.compile(r'\d+(?:[.,]\d+)*')
# tên chữ cái Latin như người Nhật đọc (whisper viết "x", giọng đọc エックス — so được với nhau)
_ABC = dict(zip('abcdefghijklmnopqrstuvwxyz', 'えー びー しー でぃー いー えふ じー えいち あい じぇー けー える えむ えぬ おー ぴー きゅー あーる えす てぃー ゆー ぶい だぶりゅー えっくす わい ぜっと'.split()))
# whisper viết, unidic đọc sai trong ngữ cảnh toán: 他の → た (giọng nói ほかの), 2乗 → のり (động từ 乗る)
def _bun(n):
    """N分 (phút): 1, 6, 8, 10 và bội của 10 đọc ぷん (促音), 3/4 cũng ぷん; còn lại ふん."""
    k = num_kana(n)
    for a, b in (('いち', 'いっ'), ('ろく', 'ろっ'), ('はち', 'はっ'), ('じゅう', 'じゅっ')):
        if k.endswith(a): return k[:-len(a)] + b + 'ぷん'
    return k + ('ぷん' if k.endswith(('さん', 'よん')) else 'ふん')


_HEARD = [(re.compile(r'他の'), 'ほかの'), (re.compile(r'にーてん'), 'にてん'), (re.compile(r'日本'), 'にほん'), (re.compile(r'(?<!\d)1個'), 'いっこ'), (re.compile(r'(\d+)年'), lambda m: re.sub('よん$', 'よ', num_kana(m.group(1))) + 'ねん'),
          (re.compile(r'(?<![\d一二])([3-9]|\d\d+)人'), lambda m: num_kana(m.group(1)) + 'にん'), (re.compile(r'(\d+)分(?=[^のかの間])'), lambda m: _bun(m.group(1))),
          (re.compile(r'言う'), 'いう'), (re.compile(r'nm'), 'なのめーとる'), (re.compile(r'GHz'), 'ぎがへるつ'), (re.compile(r'Wi-?Fi', re.I), 'わいふぁい'),
          (re.compile(r'一色'), 'ひといろ'), (re.compile(r'一塊'), 'ひとかたまり'), (re.compile(r'中[くぐ]らい'), 'ちゅうくらい'), (re.compile(r'水体'), 'すいたい'), (re.compile(r'角形'), 'かっけい'), (re.compile(r'(?:一|1)辺'), 'いっぺん'), (re.compile(r'(\d+(?:\.\d+)?)乗'), lambda m: num_kana(m.group(1)) + 'じょう'),
          (re.compile(r'(\d+(?:\.\d+)?)倍'), lambda m: num_kana(m.group(1)) + 'ばい'),
          (re.compile(r'(?<!\d)([1-9])つ'), lambda m: 'ひと ふた みっ よっ いつ むっ なな やっ ここの'.split()[int(m.group(1)) - 1] + 'つ')]   # 3つ → みっつ


def reading(s):
    """Cách đọc hiragana của một chuỗi bất kỳ (dùng để SO bản đọc với bản whisper nghe lại, không để đọc).
    Chữ số → num_kana, ký hiệu toán → lời, chữ Hán → unidic. Bỏ dấu câu và ký tự không đọc."""
    s = ''.join(_SYM.get(c, c) if c in '²³√×÷' else c for c in s)       # TRƯỚC NFKC (NFKC biến ² thành 2)
    s = unicodedata.normalize('NFKC', s)
    for rx, rep in _HEARD: s = rx.sub(rep, s)
    s = _NUM.sub(lambda m: num_kana(m.group(0)), s)
    s = ''.join(_SYM.get(c, _ABC.get(c.lower(), c)) for c in s)
    out = []
    for w in _tagger()(s):
        k = w.feature.kana if w.feature.kana and w.feature.kana != '*' else w.surface
        out.append(hira(k))
    return ''.join(c for c in ''.join(out) if 'ぁ' <= c <= 'ゖ' or c == 'ー')


# ── từ cho mốc thời gian ───────────────────────────────────────────────────────
def _pos(w):
    return w.feature.pos1 if hasattr(w.feature, 'pos1') else str(w.pos).split(',')[0]


def _kana(t, field):
    k = getattr(t.feature, field, None)
    return hira(k) if k and k != '*' else reading_plain(t.surface)


def reading_plain(s):
    """Đọc của mảnh không có trong từ điển (chữ số, ký hiệu): số → kana, ký hiệu → lời, còn lại bỏ."""
    s = _NUM.sub(lambda m: num_kana(m.group(0)), unicodedata.normalize('NFKC', s))
    s = hira(''.join(_SYM.get(c, c) for c in s))
    return ''.join(c for c in s if 'ぁ' <= c <= 'ゖ' or c == 'ー')


def words(text):
    """Từ của một dòng (để căn mốc, cảnh tra `w(i, 'từ')`, ngắt phụ đề) → [{'w': hiện, 's': đọc, 'kana', 'pron'}].
    kana = cách viết hiragana (để so), pron = cách PHÁT ÂM (は → わ, ー; để romaji cho CTC). Đoạn chú âm là MỘT từ.
    Đoạn thường tách bằng unidic rồi gộp: hậu tố vào từ trước (三角+形 → 三角形), tiền tố vào từ sau, trợ động từ và て/で
    vào động/tính từ trước (なり+ます → なります, 見+て → 見て). Dấu câu không thành từ."""
    out, pre = [], None
    for disp, spk, ruby in units(text):
        if ruby:
            r = reading(spk)
            out.append({'w': disp, 's': spk, 'kana': r, 'pron': r, 'pos': 'ruby'}); continue
        for t in _tagger()(spk):
            surf, p = t.surface, _pos(t)
            if p in ('補助記号', '空白') or not surf.strip():
                if out: out[-1]['pos'] = '記号後'   # không gộp qua dấu câu (「でした。でも」 ≠ 「でしたで」)
                continue
            k, pr = _kana(t, 'kana'), _kana(t, 'pron')
            if p == '接頭辞':
                pre = (pre or ('', '', '')); pre = (pre[0] + surf, pre[1] + k, pre[2] + pr); continue
            if pre: surf, k, pr = pre[0] + surf, pre[1] + k, pre[2] + pr; pre = None
            last = out[-1]['pos'] if out else None
            glue = last not in (None, 'ruby') and (
                p == '接尾辞' or (p == '助動詞' and last in ('動詞', '形容詞', '助動詞'))
                or (p == '助詞' and surf in ('て', 'で') and last in ('動詞', '形容詞', '助動詞')))
            if glue:
                o = out[-1]; o['w'] += surf; o['s'] += surf; o['kana'] += k; o['pron'] += pr
                if p == '助動詞': o['pos'] = '助動詞'
            else:
                out.append({'w': surf, 's': surf, 'kana': k, 'pron': pr, 'pos': p})
    for x in out: x.pop('pos')
    return out


def romaji(pron):
    """Cách phát âm (`pron`, は → わ) → chữ a-z cho CTC MMS_FA (bảng nhãn chỉ có a-z và '). ー → lặp nguyên âm trước."""
    import pykakasi
    r = ''.join(x['hepburn'] for x in pykakasi.kakasi().convert(pron.replace('ー', '-'))).lower()
    r = re.sub(r'([aeiou])-', r'\1\1', r)
    return re.sub(r"[^a-z']", '', r) or 'a'


# ── so bản đọc với bản whisper nghe lại ────────────────────────────────────────
def compare(want_spoken, heard):
    """So THEO CÁCH ĐỌC (180 ↔ ひゃくはちじゅう, × ↔ かける, 和 ↔ 輪 đều là một).
    → {'ratio', 'leak': kana thừa ĐẦU câu (giọng clone đọc tiếp tham chiếu), 'ops': [(loại, muốn, nghe)]}."""
    import difflib
    a, b = reading(want_spoken), reading(heard)
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    ops = [(op, a[i1:i2], b[j1:j2]) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != 'equal']
    leak = ''
    head = a[:4]
    if head and not b.startswith(head):
        k = b.find(head)
        if 0 < k <= 12: leak = b[:k]
    return {'ratio': round(sm.ratio(), 3), 'leak': leak, 'ops': ops}
