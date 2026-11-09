#!/usr/bin/env python3
"""Kế hoạch tiếng berlin → data/cues.json (mốc theo TỪ của narration.timeline.json, không gõ giây).

Mỗi tiếng gắn một việc nhìn thấy trong cảnh (báo cáo người dựng từng hồi + scenes/aN.js). Thư viện: projects/hist/_kit/sfx/
(+ CREDITS.md). Nhạc: bản người dùng gen theo MUSIC.md → thư viện kênh projects/hist/_kit/music/gen/ (LIBRARY.md); chưa có file thì bản PD tạm.
Mật độ mục tiêu 6–12 / phút, hush trước cú chốt, `_quiet` liền qua đoạn chết (người chết ở Tường, toà án) (EDITING C, PLAYBOOK §5).

    python3 projects/hist/berlin/data/cues.py
"""
import json, re
from pathlib import Path

D = Path(__file__).resolve().parent
ROOT = D.parents[3]
TL = json.loads((D / 'narration.timeline.json').read_text())['lines']
MUS = 'projects/hist/_kit/music/'
BW = 'projects/hist/_kit/music/gen/'   # thư viện nhạc kênh (LIBRARY.md)
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower())


def line(pre):
    ls = [l for l in TL if l['text'].startswith(pre)]
    assert len(ls) == 1, (pre, len(ls))
    return ls[0]


def w(pre, word, nth=0, edge='start'):
    """giờ của từ `word` (lần thứ nth) tính từ dòng có đầu `pre`, tìm trong dòng đó + 2 dòng sau (giống wd() của trang)."""
    i = TL.index(line(pre))
    ws = [x for l in TL[i:i + 3] for x in l['words'] if norm(x['w']) == norm(word)]
    assert len(ws) > nth, (pre, word)
    return round(ws[nth][edge], 3)


def S(pre): return round(line(pre)['words'][0]['start'], 3)
def E(pre): return round(line(pre)['words'][-1]['end'], 3)


C = []
def cue(t, kind, db=0, **k): C.append({'t': round(t, 3), 'kind': kind, 'db': db, **k})
def hush(t, end): C.append({'t': round(t, 3), 'kind': 'hush', 'end': round(end, 3)})
def quiet(t, end): C.append({'t': round(t, 3), 'kind': '_quiet', 'end': round(end, 3)})
def music(t, name, fallback, at=0):
    """bản người dùng gen (assets/music/<name>.*) nếu có, không thì bản PD tạm của kit"""
    got = sorted((ROOT / BW).glob(name + '.*')) if (ROOT / BW).exists() else []
    f = (BW + got[0].name) if got else (MUS + fallback)
    C.append({'t': round(t, 3), 'kind': '_music', 'file': f, **({'from': at} if at else {})})

# ═══ a0 · Cold open
for pre, off in [('Pretty soon', 0), ('West Berlin was left', 0), ('So at midnight', 5.2), ('They tore up', 0), ('Berliners still call', 0), ('Families woke up', 0), ('Over the years', 5.2), ('For decades', 1.4), ('In June nineteen eighty-seven', 0)]: cue(S(pre) + off, 'shutter', -14)   # v3: cắt vào phim tư liệu
# trailer TV chuyển kênh: tiếng bám từng cắt của a0 cảnh đầu
H0 = 'Hey everyone'
T1, T2, T3, T4, T5, T6 = w(H0, "history's"), w(H0, 'and', 1), w(H0, 'tiny'), w(H0, 'stupid'), w(H0, 'mistakes'), w(H0, 'that')
for i in range(8): cue(i * T1 / 8, 'snap', -14)                           # bấm điều khiển mỗi kênh
for i in range(1, 3): cue(T1 + i * (T2 - T1) / 3, 'whoosh-short', -12)
cue(T1, 'whoosh-short', -9); cue(w(H0, 'disasters'), 'boom-deep', -4)
cue(T3, 'pop', -4); cue(T4, 'boing', -6); cue(T5, 'stamp', -3)            # tiny · stupid · dấu MISTAKES
cue(T6, 'impact', -4)                                                     # logo sập
cue(w('Last time, one driver', 'wrong'), 'honk', -4)              # xe 1914 rẽ nhầm
cue(w('Last time, one driver', 'war'), 'boom', -6)
cue(w('Well, here it is', 'single') - 0.3, 'whoosh-soft', -3)       # tờ giấy rơi lắc lư
cue(w('Well, here it is', 'paper'), 'page-flip', 0)
cue(w("It's November ninth", 'ninth'), 'stamp', 2)                  # dấu 9 NOV 1989
cue(w("It's November ninth", 'live'), 'shutter', -2)
cue(w('His boss handed it', 'barely') - 0.05, 'shutter', 0)         # ĐÓNG BĂNG
cue(w('A reporter asks him', 'shuffles'), 'page-flip', -2)
hush(w('A reporter asks him', 'immediately') - 0.4, w('A reporter asks him', 'immediately'))
cue(w('A reporter asks him', 'immediately'), 'impact', 2)
cue(w('By midnight', 'open'), 'cheer', -4)
cue(w('Within a year', 'exists'), 'whoosh', -3)                    # bản đồ nhập một
cue(w('So how does one unread', 'beat'), 'thud', 0)                # cán cân nghiêng về tờ giấy
cue(w('To answer that', 'cut'), 'snap', 0)

# ═══ a1 · A city cut in half
cue(w('After World War Two', 'four'), 'pop', -4)
cue(w('After World War Two', 'four', 1), 'pop', -4)
cue(w('It was like four roommates', 'roommates'), 'ding', -6)
cue(w('Pretty soon the roommates', 'stopped'), 'bonk', -4)
cue(w('West Berlin was left', 'island'), 'ding', -6)
cue(w('And East Germans kept', 'leaving'), 'whoosh-soft', -4)
cue(w('Before nineteen sixty-one', 'three'), 'typewriter-soft', -6)  # bộ đếm lăn
cue(w('Before nineteen sixty-one', 'subway'), 'engine', -10, end=w('Before nineteen sixty-one', 'subway') + 2.0)
cue(w('Imagine running a country', 'quit'), 'cash-register', -5)

# ═══ a2 · Barbed Wire Sunday
cue(w('So at midnight on August', 'midnight'), 'clock-tick', -6, end=w('So at midnight on August', 'midnight') + 1.6)
cue(w('So at midnight on August', 'august'), 'stamp', 0)
cue(w('So at midnight on August', 'sealed'), 'slam-paper', 2)
cue(w('They tore up streets', 'tore'), 'impact', -4)
cue(w('They tore up streets', 'barbed'), 'snap', -4)
cue(w('They tore up streets', 'concrete'), 'thud', 0)
cue(w('They tore up streets', 'concrete') + 0.5, 'thud', -3)
cue(w('Berliners still call', 'sunday'), 'stamp', 0)
cue(w("The government didn't call", 'wall'), 'boing', -6)
cue(w('Officially it was the', 'rampart'), 'ding', -4)
cue(w('Over the years it grew', 'watchtowers'), 'thud', -6)
cue(w('Over the years it grew', 'death'), 'boom-deep', -10)
cue(w('More than a hundred thousand', 'five'), 'whoosh-soft', -6)
quiet(S('At least a hundred and forty') - 0.4, S('For decades, Western leaders') - 0.5)   # người chết ở Tường — im, không tiếng

# ═══ a3 · Tear down this wall
cue(w('For decades, Western leaders', 'memorable'), 'ding', -6)
cue(w('In June nineteen eighty-seven', 'tear'), 'crowd-murmur', -10)
cue(w('It was a great line', 'line'), 'cheer', -8)
hush(w('It was a great line', 'not') - 0.2, w('It was a great line', 'inch') + 0.3)
cue(w('It was a great line', 'inch'), 'cricket', -8, end=w('It was a great line', 'inch') + 1.5)
cue(w('In January nineteen', 'hundred'), 'pop', -4)
cue(w('He was off by about', 'ninety-nine'), 'clock-tick', -6, end=E('He was off by about'))
cue(E('He was off by about'), 'boing', -4)

# ═══ a4 · The summer everything leaked
cue(w('Because nineteen eighty-nine', 'wall'), 'pour', -10)           # tường nứt rỉ nước
cue(w('The Soviet Union under Gorbachev', 'tanks'), 'engine', -10, end=w('The Soviet Union under Gorbachev', 'tanks') + 1.5)
cue(w('In May, Hungary started', 'fence'), 'snap', -2)
cue(w('In May, Hungary started', 'picnic'), 'glass-clink', -8)
cue(w('In May, Hungary started', 'walked'), 'whoosh-soft', -6)
cue(w('Word got around', 'hungarian'), 'cash-register', -6)
cue(w('Others climbed into the garden', 'thousands'), 'crowd-murmur', -8)
cue(w('On September thirtieth', 'cheering'), 'cheer', -2)
cue(w('In Leipzig, every Monday', 'people'), 'crowd-murmur', -8, end=E('In Leipzig, every Monday'))
hush(S('The police and army had been') - 0.2, S('The police and army had been') + 0.3)
cue(w('But nobody gave the order', 'fired') + 0.3, 'whoosh-soft', -10)
cue(w('Nine days later, Honecker', 'pushed'), 'whoosh', -2)

# ═══ a5 · The memo
cue(w('Krenz needed to let', 'steam'), 'fuse-soft', -4)
cue(w('So he asked the Interior Ministry', 'trash'), 'paper-crumple', 0)
cue(S('Back to the drawing board.') + 0.2, 'whoosh-soft', -4)
cue(w('On the morning of November ninth', 'rushed'), 'typewriter', -4)
cue(w('The leadership approved it', 'approved'), 'stamp', 0)
cue(w('The leadership approved it', 'tenth'), 'page-flip', -2)
cue(w('Now here\'s the guy', 'schabowski'), 'ding', -6)
cue(w('Shortly before his evening press', 'handed'), 'page-flip', -2)
cue(w('Schabowski later said', 'simple'), 'pop', -6)
cue(w('So he walked into a room', 'college'), 'boing', -4)

# ═══ a6 · The press conference
cue(w('The press conference started', 'live'), 'shutter', -4)
cue(w('The press conference started', 'spectacularly'), 'clock-tick', -8, end=E('The press conference started'))
cue(w('Committees, reforms', 'committees'), 'pop', -6)
cue(w('Committees, reforms', 'reforms'), 'pop', -6)
cue(w('Committees, reforms', 'committees', 1), 'pop', -4)
cue(w('Then, at about six fifty-three', 'italian'), 'ding', -6)
cue(w('He read it out, stumbling', 'buzzing'), 'crowd-murmur', -8, end=E('He read it out, stumbling'))
cue(w('Schabowski shuffled through', 'shuffled'), 'page-flip', -2)
cue(w('Schabowski shuffled through', 'papers'), 'page-flip', -4)
hush(S('"As far as I know') - 0.3, w('"As far as I know', 'immediately'))
cue(w('"As far as I know', 'immediately'), 'impact', 2)
cue(w('Nobody had told him about', 'tenth'), 'page-flip', -4)
cue(w('Nobody read the memo, and the only', 'memo'), 'stamp', 4)            # dấu lần 1
cue(w('Someone asked if this included', 'three'), 'ding', -6)
cue(w('Then a British reporter', 'wall'), 'thud', -6)
cue(w('Schabowski gave a long', 'disarmament'), 'boing', -8)
cue(w('Then he sat down with an American', 'again'), 'shutter', -4)

# ═══ a7 · Nobody read the memo
cue(w('At four minutes past seven', 'agency'), 'morse', -6)                 # máy telex
cue(w('At four minutes past seven', 'immediately'), 'typewriter-soft', -4)
cue(w('At seven seventeen', 'tv'), 'shutter', -6)
cue(w('Later that night, one of West', 'camera'), 'ding', -8)
hush(S('They did not.') - 0.3, S('They did not.') + 0.2)
cue(S('They did not.'), 'cricket', -8, end=E('At that moment, the gates'))   # cổng im lìm ban đêm
cue(w('At that moment, the gates', 'shut'), 'thud', -4)
cue(w('So now the entire world', 'memo'), 'stamp', 4)                       # dấu lần 2

# ═══ a8 · Bornholmer Street
cue(w('But East Berliners had heard', 'literally'), 'whoosh-soft', -6)
cue(w('They grabbed their coats', 'thousands'), 'crowd-murmur', -6, end=S('He called his superiors'))
cue(w('He called his superiors', 'called'), 'morse', -10)                   # quay số (tạm — chưa có tiếng điện thoại)
cue(w('Their best idea was to let', 'mark'), 'stamp', 0)
cue(w("It didn't help, because the crowd", 'gate'), 'cheer', -8)
hush(S('So at around eleven thirty') - 0.3, w('So at around eleven thirty', 'gate'))
cue(w('So at around eleven thirty', 'thirty'), 'clock-tick', -6, end=w('So at around eleven thirty', 'gate'))
cue(w('So at around eleven thirty', 'gate'), 'hurray', 2)
cue(w('Thousands of people poured', 'poured'), 'cheer', 0, end=E('Thousands of people poured') + 1.0)
cue(w('Across the city, the other', 'flowers'), 'pop', -4)
cue(w('Across the city, the other', 'champagne'), 'pop', 0)
cue(w('Across the city, the other', 'champagne') + 0.3, 'pour', -6)
cue(w('By the early hours', 'hammers'), 'impact', -2)
cue(w('By the early hours', 'hammers') + 0.45, 'impact', -4)

# ═══ a9 · The bill (nghiêm từ "As for Schabowski")
cue(w('By the next morning', 'close'), 'thud', -2)
cue(w('Less than eleven months later', 'one'), 'stamp', 0)
cue(w('A little over a year after', 'gone'), 'whoosh', -6)
quiet(S('As for Schabowski') - 0.4, S('So, did one man') - 0.6)
cue(w('As for Schabowski', 'expelled'), 'paper-crumple', -8)
cue(w('In nineteen ninety-seven a German', 'sentenced'), 'thud', -2)

# ═══ a10 · Outro + thẻ kết
cue(w('Not really, because the people', 'hungary'), 'pop', -8)
cue(w('Not really, because the people', 'prague'), 'pop', -8)
cue(w('Not really, because the people', 'leipzig'), 'pop', -8)
cue(w('But the memo decided when', 'when'), 'clock-tick', -6, end=w('But the memo decided when', 'when') + 0.8)
cue(w('All because nobody read the memo', 'memo'), 'stamp', 4)              # dấu lần 3
cue(w("History's biggest disasters started", 'happy'), 'whoosh-long', -6)   # máy bay giấy qua Tường
cue(w('So stick around, because next', 'happy'), 'boom-deep', -10)

# ═══ Nền + nhạc theo đoạn (MUSIC.md); đoạn chết chóc + toà án = _quiet
music(0.0, 'bw-1-coldopen', 'm-opening-slippery-place.ogg')
music(S('After World War Two') - 0.4, 'bw-2-divided', 'm-opening-alt-trombone-johnsen.ogg')
music(S('So at midnight on August') - 0.4, 'bw-3-wall', 'm-sombre-chopin-funeral.ogg')
music(S('For decades, Western leaders') - 0.4, 'bw-2-divided', 'm-opening-alt-trombone-johnsen.ogg', 40)
music(S('Because nineteen eighty-nine') - 0.4, 'bw-4-leak', 'm-march-fall-in-line.ogg')
music(S('The press conference started') - 0.4, 'bw-5-press', 'm-opening-slippery-place.ogg')
music(S('But East Berliners had heard') - 0.4, 'bw-6-gate', 'm-march-fall-in-line.ogg')        # căng dần → bùng nổ ở 23:30
music(S('By the next morning') - 0.4, 'bw-7-reflect', 'm-sombre-chopin-funeral.ogg')
music(E('So stick around, because next') + 0.3, 'bw-sting', 'm-sting-end-card.ogg')

C.sort(key=lambda c: c['t'])
(D / 'cues.json').write_text(json.dumps(C, indent=0))
n = sum(1 for c in C if not c['kind'].startswith('_') and c['kind'] != 'hush')
print(f'{n} tiếng, {sum(1 for c in C if c["kind"] == "_music")} đoạn nhạc → data/cues.json ({n / (TL[-1]["end"] / 60):.1f} / phút)')
