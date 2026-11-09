#!/usr/bin/env python3
"""Kế hoạch tiếng wrong-turn → data/cues.json (mốc theo TỪ của narration.timeline.json, không gõ giây).

Mỗi tiếng gắn một việc nhìn thấy trong cảnh (ghi chú tiếng của người dựng từng hồi, scenes/aN.js). Thư viện: projects/hist/_kit/sfx/
(+ CREDITS.md), nhạc PD projects/hist/_kit/music/ (tạm — người dùng sẽ gen nhạc mới cho kênh). Mật độ mục tiêu 6–12 / phút,
nổ / súng sau khoảng lặng, hush trước cú chốt, `_quiet` liền qua đoạn chết (EDITING C, PLAYBOOK §5).

    python3 projects/hist/wrong-turn/data/cues.py
"""
import json, re
from pathlib import Path

D = Path(__file__).resolve().parent
TL = json.loads((D / 'narration.timeline.json').read_text())['lines']
MUS = 'projects/hist/_kit/music/'
WT = 'projects/hist/wrong-turn/assets/music/'
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
def music(t, f, src='kit', at=0):
    C.append({'t': round(t, 3), 'kind': '_music', 'file': (MUS if src == 'kit' else WT) + f, **({'from': at} if at else {})})

# ═══ a0 · Cold open
cue(w('Hey everyone', 'disasters'), 'boom-deep', -2)
cue(w('Hey everyone', 'tiny'), 'pop', -2)
cue(S('Take a good look') - 0.1, 'shutter', -1)                 # khung đóng băng
cue(w('Take a good look', 'expensive'), 'cash-register', -3)
cue(w('The young man standing', 'five'), 'clock-tick', -6, end=w('The young man standing', 'five') + 0.6)
cue(w('The young man standing', 'pistol'), 'thud', 0)
cue(w('The young man standing', 'brakes'), 'whoosh', 0)          # vệt phanh + SCREECH
cue(w('The young man standing', 'two'), 'clock-tick', -4, end=w('The young man standing', 'world'))
hush(w('The young man standing', 'world') - 0.3, w('The young man standing', 'world'))
cue(w('The young man standing', 'world') + 0.05, 'boom', 4)
cue(w('Around twenty million people will', 'twenty'), 'typewriter-soft', -4)  # bộ đếm số lăn
cue(w('Around twenty million people will', 'nearly'), 'whoosh-soft', -3)
cue(w('Because nobody told', 'nobody'), 'boing', -2)
cue(w('Because nobody told', 'driver'), 'stamp', 6)
cue(w("So let's rewind", 'rewind') - 0.1, 'whoosh-long', -1)     # tua ngược
cue(w("So let's rewind", 'morning'), 'ding', -3)
cue(w("So let's rewind", 'june'), 'page-flip', 0)
cue(w('Fair warning', 'warning'), 'ding', -2)
for i in range(5): cue(w('Fair warning', 'dumber') + 0.12 * i, 'pop', -4 + i)

# ═══ a1 · The powder keg
cue(w('First, a quick tour', 'armies'), 'pop', -1)
cue(w('Britain, France and Russia', 'table'), 'pop', -2)
cue(w('Britain, France and Russia', 'table', 1), 'pop', -2)
cue(w('Britain, France and Russia', 'exit'), 'whoosh-short', -3)
cue(w('Austria-Hungary, by the way', 'languages'), 'crowd-murmur', -8, end=w('Austria-Hungary, by the way', 'old'))
cue(w('Austria-Hungary, by the way', 'eighteen'), 'stamp', 3)
cue(w('Right next door', 'proud'), 'snap', 0)
cue(w('Right next door', 'wars'), 'boom-deep', -6)
cue(w('Serbia dreamed', 'thirty'), 'stamp', 2)
cue(w('Serbia dreamed', 'annexed'), 'stamp', 5)
cue(w('Imagine your neighbor', 'lawnmower'), 'engine', -6, end=w('Imagine your neighbor', 'years'))
cue(w('Imagine your neighbor', 'announcing'), 'thud', 0)
hush(w('Imagine your neighbor', 'his') - 0.2, w('Imagine your neighbor', 'now', edge='end'))
cue(w('By one count', 'twentyfive'), 'clock-tick', -6, end=w('By one count', 'nineteen'))
cue(w('By one count', 'thanksgiving'), 'pop', 2)
cue(w('And on one Sunday', 'sarajevo'), 'boom-deep', -8)

# ═══ a2 · The unloved heir
cue(w('Now, meet the man', 'archduke'), 'shutter', -2)
cue(w('He only became heir', 'died'), 'thud', 0)
cue(w('He only became heir', 'warmed'), 'amb-wind-drone-loop', -12, end=w('He only became heir', 'warmed') + 1.4)
cue(w('He was short-tempered', 'thousand'), 'ding', -1)
cue(w('Averaged out', 'fifteen'), 'pop', 0)
cue(w('Averaged out', 'single'), 'page-flip', -2)
cue(w('But he did one thing', 'love'), 'crowd-murmur', -6, end=w('But he did one thing', 'love') + 1.5)
cue(w('To be allowed', 'swear'), 'pen-sign', -2, end=w('To be allowed', 'swear') + 1.2)
cue(w('To be allowed', 'never'), 'stamp', 4)
cue(w("In Vienna, Sophie", 'box'), 'crowd-murmur', -12, end=w("In Vienna, Sophie", 'carriage'))
cue(w('But in Bosnia', 'army'), 'pop', 0)
cue(w('Which is sweet', 'only'), 'whoosh-soft', -6)
cue(w('Mistake number one', 'one'), 'ding', 2)
cue(w('They would drive through', 'vidovdan'), 'stamp', 2)
cue(w('They would drive through', 'thirteen'), 'boom-deep', -6)
cue(w('So the heir of the empire', 'grabbed'), 'snap', -1)
cue(w("It's a bit like", 'parade'), 'hurray', -6)
cue(w("It's a bit like", 'terrible'), 'boom-deep', -2)
cue(w('For the couple', 'fourteen'), 'whoosh-long', -3)
cue(w('For the couple', 'rights'), 'stamp', 2)
hush(w('Which made it a lovely day', 'perfect') - 0.1, w('Which made it a lovely day', 'assassination') + 0.2)
cue(w('Which made it a lovely day', 'assassination'), 'boom-deep', 0)

# ═══ a3 · Six assassins
for i in range(6): cue(w('Waiting for them', 'six') + 0.16 * i, 'pop', -4)
cue(w('Waiting for them', 'teenagers'), 'stamp', 2)
cue(w('They had four pistols', 'pistols'), 'thud', -2)
cue(w('They had four pistols', 'bombs'), 'thud', 0)
cue(w('They had four pistols', 'cyanide'), 'glass-clink', -4)
cue(w('Where does a group', 'all'), 'boing', -3)
cue(w('From the Black Hand', 'black'), 'boom-deep', -6)
cue(w('From the Black Hand', 'apis'), 'pop', -2)
cue(w('To be clear', "didn't"), 'stamp', 3)
cue(w('But when the head', 'assassination'), 'snap', -2)
cue(w('The weapons were smuggled', 'smuggled'), 'whoosh-soft', -3)
cue(w('The weapons were smuggled', 'waiting'), 'clock-tick', -8, end=E('The weapons were smuggled') + 0.8)

# ═══ a4 · The plan falls apart
cue(w('Mistake number two', 'two'), 'ding', 2)
cue(w('And in case any', 'printed'), 'slam-paper', 2)
cue(w('A little before ten', 'rolled'), 'engine', -6)
cue(w('The first assassin', 'nothing'), 'cricket', -6)
cue(w('The third, Nedeljko', 'lamppost'), 'impact', 0)
cue(w('The third, Nedeljko', 'threw'), 'whoosh', -2)
cue(w('The bomb had a fuse', 'bounced'), 'boing', 0)
cue(w('The bomb had a fuse', 'exploded') + 0.12, 'boom', 5)
cue(w('Chabrinovich then swallowed', 'cyanide'), 'glass-clink', -4)
cue(w('Chabrinovich then swallowed', 'jumped'), 'whoosh-long', -2)
cue(w('Except the cyanide', 'old'), 'stamp', 2)
cue(w('Except the cyanide', 'river'), 'splash', 0)
cue(w('So instead of a heroic', 'heroic'), 'bonk', -2)
cue(w('So instead of a heroic', 'beating'), 'bonk', 2)
cue(w('The motorcade sped off', 'sped'), 'engine', -4)
cue(w('The motorcade sped off', 'race'), 'whoosh', 0)
cue(w('At this point', 'failed'), 'stamp', 4)
hush(w('Archduke safe', 'cancelled') - 0.05, w('Archduke safe', 'cancelled') + 2.0)
cue(w('Archduke safe', 'cancelled'), 'stamp', 4)
cue(w('Archduke safe', 'cancelled') + 0.3, 'hurray', -6)

# ═══ a5 · But no
cue(S('But no.') - 0.05, 'whoosh-long', 0)                       # tua ngược + cận mặt sốc
cue(w('The motorcade reached', 'reading'), 'page-flip', -2)
cue(w('"Mister Mayor', 'bombs'), 'thud', 2)
cue(w('"Mister Mayor', 'outrageous'), 'impact', 2)
cue(w('Sophie whispered', 'speech'), 'page-flip', -3)
C.append({'t': round(S("Then it was the archduke's") - 0.1, 3), 'kind': '_quiet', 'end': round(E("Then it was the archduke's") + 0.4, 3)})
cue(w('Mistake number three', 'three'), 'ding', 2)
cue(w('Mistake number three', 'day'), 'cricket', -6)
cue(w('Someone asked', 'assassins'), 'boing', -3)
for i in range(5): cue(w('At that moment', 'five') + 0.1 * i, 'pop', -4)
cue(w('At that moment', 'four'), 'ding', 2)
cue(w('To play it safe', 'straight'), 'pen-sign', -6, end=w('To play it safe', 'hospital'))
cue(w('It was a sensible', 'sensible'), 'stamp', 1)
hush(w('It was a sensible', 'problem'), S('Mistake number five'))
cue(w('Mistake number five', 'five'), 'ding', 2)
cue(w('Mistake number five', 'driver'), 'stamp', 6)

# ═══ a6 · The wrong turn + Two shots
cue(w('At about ten forty-five', 'off'), 'engine', -4)
cue(w('At about ten forty-five', 'turned'), 'whoosh-soft', -2)
cue(w('For the record', 'only'), 'ding', -2)
cue(w('Potiorek, sitting', 'shouted'), 'honk', 2)
cue(w('The driver hit the brakes', 'brakes'), 'whoosh', 2)
cue(w('The driver hit the brakes', 'stop'), 'thud', 2)
cue(w('The driver hit the brakes', 'moritz'), 'pop', -2)
cue(w('And standing right there', 'five'), 'clock-tick', -6, end=w('And standing right there', 'five') + 0.5)
hush(w("And no, he wasn't", 'that'), w("And no, he wasn't", 'story'))
cue(w("And no, he wasn't", 'story'), 'stamp', 5)
q0 = E("And no, he wasn't") + 0.3
C.append({'t': round(q0, 3), 'kind': '_quiet', 'end': round(S("Here's the strange part") - 0.3, 3)})
cue(w('Princip stepped forward', 'fired'), 'gun', 6)
cue(w('Princip stepped forward', 'twice') + 0.05, 'gun', 6)
cue(S('Princip stepped forward') - 0.5, 'amb-wind-drone-loop', -20, end=S("Here's the strange part") - 0.3)

# ═══ a7 · Five weeks + Dominoes (bổ sung theo ghi chú người dựng a7)
cue(w('In the twenty years before', 'president'), 'shutter', -2)
cue(w('In the twenty years before', 'italy'), 'shutter', -2)
cue(w('In the twenty years before', 'greece'), 'shutter', -2)
cue(w('In the twenty years before', 'wife'), 'shutter', -2)
cue(w('So on July fifth', 'lunch'), 'glass-clink', -4)
cue(w('So on July fifth', 'support'), 'pour', -6)
cue(w('Historians call this', 'check'), 'cash-register', -2)
cue(w('The next day, the Kaiser', 'cruise'), 'whoosh-soft', -3)
cue(w('On July twenty-third', 'ultimatum'), 'slam-paper', 2)
cue(w('On July twenty-third', 'fortyeight'), 'clock-tick', -6, end=E('On July twenty-third'))
cue(w('Serbia, to almost', 'accepted'), 'pen-sign', -4, end=w('Serbia, to almost', 'refused'))
cue(w('Serbia, to almost', 'refused'), 'stamp', 2)
cue(w('Austria-Hungary declared war anyway', 'war'), 'boom', 2)
cue(w('Austria-Hungary declared war anyway', 'telegram'), 'morse', -4)
cue(w('And then the cafeteria', 'punch'), 'bonk', 2)
cue(w('Russia began mobilizing', 'mobilizing'), 'thud', 0)
cue(w('Russia began mobilizing', 'germany'), 'boom-deep', 0)
cue(w('Russia began mobilizing', 'france'), 'boom-deep', 2)
cue(w('To get to France quickly', 'belgium'), 'boom', 0)
cue(w('Britain had promised', 'paper'), 'paper-crumple', 0)
cue(w('Britain had promised', 'august'), 'boom', 4)
cue(w('In those final days', 'telegrams'), 'morse', -6)
cue(w('Crowds cheered', 'cheered'), 'cheer', -2, end=w('Crowds cheered', 'christmas'))
hush(E('Crowds cheered'), S('It would not be over') + 1.2)
cue(w('It would not be over', 'christmas'), 'page-flip', 0)
cue(w('Its license plate', 'armistice'), 'ding', 0)

# ═══ a8 · The bill (nghiêm) + Outro
C.append({'t': round(S('The war lasted') - 0.4, 3), 'kind': '_quiet', 'end': round(S('So what really started') - 0.6, 3)})
cue(S('The war lasted') - 0.4, 'amb-wind-drone-loop', -20, end=S('So what really started') - 0.6)
for k in ('german', 'austrohungarian', 'russian', 'ottoman'): cue(w('Four empires', k), 'boom-deep', -12)
cue(w('Because he was under', 'twenty', 1), 'thud', -4)
cue(w('But on that one morning', 'date'), 'bonk', -4)
cue(w('But on that one morning', 'security'), 'bonk', -4)
cue(w('But on that one morning', 'carry'), 'bonk', -4)
cue(w('But on that one morning', 'confidence'), 'bonk', -4)
cue(w('But on that one morning', 'seat'), 'bonk', -2)
cue(w('Change any one', 'boring'), 'cricket', -8)
hush(S('Instead, nobody told') - 0.2, w('Instead, nobody told', 'driver') + 0.4)
cue(w('Instead, nobody told', 'driver'), 'stamp', 6)
cue(w("History's biggest disasters", 'disasters'), 'boom-deep', -4)
cue(S('So stick around') - 0.2, 'whoosh-soft', -2)

# ═══ Nền + nhạc theo đoạn
cue(S('Take a good look'), 'amb-crowd-murmur-loop', -22, end=S('Around twenty million people will'))
cue(S('A little before ten'), 'amb-crowd-murmur-loop', -20, end=E('The motorcade sped off'))
cue(S('At about ten forty-five'), 'amb-crowd-murmur-loop', -22, end=S('Princip stepped forward') - 0.5)
cue(0.0, 'tex-crackle-78rpm-loop', -28, end=E('So stick around') + 5)
# nhạc người dùng gen 2026-10-29 (MUSIC.md; bản ngắn → mix.py lặp nối chéo 2 s); đoạn chết chóc + "The bill" = _quiet
music(0.0, 'wt-1-coldopen.m4a', 'wt')                                   # mở: tò mò
music(S('First, a quick tour') - 0.4, 'wt-2-theme.m4a', 'wt')           # bàn tiệc châu Âu: chủ đề hài
music(S('Now, meet the man') - 0.4, 'wt-1-coldopen.m4a', 'wt', 47)      # Thái tử: nửa sau bản mở (đổi màu, khỏi lặp chủ đề)
music(S('Waiting for them') - 0.4, 'wt-3-conspiracy.m4a', 'wt')         # sáu sát thủ
music(S('Mistake number two') - 0.4, 'wt-4-bumbling.m4a', 'wt')         # an ninh lỏng + bom hụt
music(S('The motorcade reached') - 0.4, 'wt-2-theme.m4a', 'wt')         # toà thị chính: chủ đề quay lại
music(S('At about ten forty-five') - 0.4, 'wt-5-suspense.m4a', 'wt')    # cú rẽ nhầm: căng dần tới hai phát súng
music(S("Here's the strange part") - 0.3, 'wt-3-conspiracy.m4a', 'wt')  # năm tuần: bữa trưa Potsdam, séc khống — mật đàm
music(S('And then the cafeteria') - 0.4, 'wt-6-escalation.m4a', 'wt')   # domino các nước
music(S('So what really started') - 0.6, 'wt-7-reflect.m4a', 'wt')      # kết: lắng
music(E('So stick around') + 0.3, 'm-sting-end-card.ogg')

C.sort(key=lambda c: c['t'])
(D / 'cues.json').write_text(json.dumps(C, indent=0))
n = [c for c in C if not c['kind'].startswith(('_', 'hush', 'amb', 'tex'))]
print(f'{len(C)} mục: {len(n)} tiếng ({len(n) / (E("So stick around") / 60):.1f}/phút), {sum(c["kind"] == "hush" for c in C)} hush')
