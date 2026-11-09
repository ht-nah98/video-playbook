#!/usr/bin/env python3
"""Kế hoạch tiếng pearl → data/cues.json (mốc theo TỪ của narration.timeline.json, không gõ giây).

Mỗi tiếng gắn một việc nhìn thấy trong cảnh (scenes/aN.js, chú thích đầu từng cảnh). Thư viện: projects/hist/_kit/sfx/ (+ CREDITS.md;
mới: alarm-ring CC0). Nhạc: THƯ VIỆN KÊNH projects/hist/_kit/music/LIBRARY.md — tập này không xin gen mới; chọn theo không khí,
`from` để không nghe lặp tập trước. Mật độ 6–12 / phút, hush trước cú chốt, `_quiet` qua đoạn chết chóc (Just before eight).

    python3 projects/hist/pearl/data/cues.py
"""
import json, re
from pathlib import Path

D = Path(__file__).resolve().parent
TL = json.loads((D / 'narration.timeline.json').read_text())['lines']
GEN = 'projects/hist/_kit/music/gen/'
WT = 'projects/hist/wrong-turn/assets/music/'
PD = 'projects/hist/_kit/music/'
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower())


def line(pre):
    ls = [l for l in TL if l['text'].startswith(pre)]
    assert len(ls) == 1, (pre, len(ls))
    return ls[0]


def w(pre, word, nth=0, edge='start'):
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
def music(t, f, at=0): C.append({'t': round(t, 3), 'kind': '_music', 'file': f, **({'from': at} if at else {})})

# ═══ a0 · Cold open
cue(w('Hey everyone', 'tiny'), 'pop', -2)
cue(w('Last time, a man', 'wall') - 0.1, 'thud', -2)                 # khối Tường rơi
cue(w('Last time, a man', 'party'), 'cheer', -8)                     # hoa giấy
cue(w("It's December seventh", 'seventh'), 'stamp', 0)               # SUNDAY · 7 DEC 1941
cue(w('Two young privates', 'blip'), 'morse', -6)                    # radar bíp
cue(w('So they do exactly', 'phone') - 0.2, 'page-flip', -8)         # nhấc ống nghe
hush(w('And the officer', "don't") - 0.6, w('And the officer', "don't"))
cue(w('And the officer', "don't"), 'ding', -2)                       # chữ "DON'T WORRY" đóng băng
cue(w('A couple of hours', 'dead') - 0.3, 'boom-deep', -6)           # ảnh Arizona
cue(S("And here's the part") - 0.1, 'bonk', -4)                      # cận mặt sốc
cue(w("That phone call wasn't", 'first'), 'alarm-ring', -10)
cue(w("That phone call wasn't", 'last'), 'alarm-ring', -10)
cue(w('So how do you sleep', 'three'), 'alarm-ring', -6)
cue(w('So how do you sleep', 'three') + 0.3, 'stamp', -4)            # SNOOZE ×3
cue(S('To answer that') + 0.2, 'thud', 0)                            # thùng OIL bật

# ═══ a1 · Running on empty
cue(w('By nineteen forty-one', 'china') - 0.3, 'whoosh', -6)
cue(w('By nineteen forty-one', 'indochina') - 0.3, 'whoosh', -6)
cue(w('The United States answered', 'freezing'), 'glass-clink', -4)  # khối băng ¥
cue(w('The United States answered', 'oil'), 'snap', 0)              # cắt ống dầu
cue(w('The United States answered', 'oil') + 0.4, 'stamp', -2)
cue(w('Without oil', 'parked'), 'stamp', 0)                          # PARKED
cue(w("So Japan's leaders", 'grab'), 'pop', -2)
cue(S('They chose to fight') + 0.4, 'ding', -6)                      # ghim Pearl Harbor
cue(w('The year before', 'kept'), 'whoosh-long', -8)                 # đường California → Hawaii
cue(w("Japan's admirals", 'sink'), 'pop', 0)                         # bong bóng SINK IT

# ═══ a2 · Paradise, Sunday edition
cue(w('On November twenty-sixth', 'silence') - 0.2, 'snap', -4)      # dấu cấm radio
cue(w('The next day, Washington', 'dispatch'), 'typewriter', -8)
cue(w('The Army got its own', 'hostile'), 'typewriter', -8)
cue(w('That sounds pretty clear', 'spies'), 'boing', -8)
cue(w('So to protect his planes', 'ammunition') + 0.2, 'snap', -2)  # khoá rương đạn
cue(w('Which is a great way', 'wrench'), 'ding', -4)
cue(w('Which is a great way', 'raid') - 0.3, 'whoosh-long', -4)      # bóng máy bay lướt
cue(w('And on Sunday mornings', 'sleep'), 'cricket', -12)
cue(w('Battleships lined up', 'radar'), 'pop', -4)
cue(w("They just weren't", 'up'), 'stamp', -2)                       # SNOOZE

# ═══ a3 · The first alarm
cue(w('At six thirty-seven', 'submarine'), 'splash', -10)            # kính tiềm vọng
hush(w('The Ward opened fire', 'fire') - 0.5, w('The Ward opened fire', 'fire'))
cue(w('The Ward opened fire', 'fire'), 'gun', -2)
cue(w('The Ward opened fire', 'depth'), 'splash', 0)
cue(w('The Ward opened fire', 'depth') + 0.35, 'splash', -3)
cue(w('Its captain radioed', 'radioed'), 'morse', -8)
for i in range(4): cue(S('The Navy had chased') + 0.6 + i * 1.9, 'stamp', -6)
cue(w('In other words', "don't"), 'stamp', -2)                       # SNOOZE #1

# ═══ a4 · The second alarm
cue(w('Up on the northern tip', 'opana'), 'ding', -6)
cue(w('Their shift ended', 'late'), 'stamp', -4)
cue(w('At seven oh two', 'blob') - 0.1, 'morse', -2)
cue(w('Lockard had never seen', 'broken'), 'bonk', -2)
hush(S("It wasn't.") - 0.3, E("It wasn't.") + 0.4)
cue(S("It wasn't.") + 0.1, 'page-flip', -4)                          # ảnh bản vẽ radar thật
cue(w('So they called the information', 'called'), 'alarm-ring', -14)  # chuông điện thoại reo
cue(w('The call ended up', 'training'), 'pen-sign', -6)
cue(S('And Tyler had a theory') + 0.3, 'ding', -2)                   # bóng đèn
cue(w('A flight of American B-17', 'california') - 0.3, 'whoosh-long', -8)
cue(w('A flight of American B-17', 'friend') + 0.2, 'pop', -4)
cue(w('So he put two and two', 'bombers'), 'ding', -2)
cue(S("Don't worry about it, he told") + 0.1, 'ding', -2)            # gag lần 2
cue(w('To be fair', 'direction'), 'whoosh-long', -6)
cue(w('To be fair', 'unarmed'), 'stamp', -4)
cue(w('The two privates kept', 'forty'), 'snap', -8)                 # mất dấu
cue(w('Then they finally drove', 'breakfast'), 'stamp', -2)          # SNOOZE #2

# ═══ a5 · The third alarm
cue(S('Meanwhile, in Washington') + 0.1, 'clock-tick', -8)
cue(w('American codebreakers', 'cracked'), 'typewriter', -8)
cue(w('So he wrote a warning', 'wrote'), 'pen-sign', -6)
cue(w("Then the Army's radio", 'static'), 'tex-crackle-78rpm-loop', -2, end=w("Then the Army's radio", 'static') + 1.8)   # rè nhiễu, cắt 1.8 s
cue(w('So the most important warning', 'aunt'), 'pop', -4)
cue(w('So the most important warning', 'urgent'), 'stamp', 0)
cue(w('It reached the telegraph', 'teletype'), 'bonk', -6)
cue(w('It reached the telegraph', 'motorcycle'), 'engine', -6)
cue(w('That messenger was still', 'bombs'), 'boom-deep', -8)
cue(w('That messenger was still', 'afternoon'), 'stamp', -2)         # SNOOZE #3

# ═══ a6 · Just before eight — NGHIÊM: ít tiếng, nổ đặt sau lặng
cue(w('At about seven fifty-five', 'wave'), 'whoosh-long', -6)
cue(w('Torpedo bombers went', 'torpedo'), 'boom-deep', -6)
cue(w('Torpedo bombers went', 'dive'), 'boom', -8)
hush(w('At eight oh six', 'exploded') - 0.8, w('At eight oh six', 'exploded'))
cue(w('At eight oh six', 'exploded'), 'boom', 2)
quiet(S('One thousand one hundred') - 0.4, S('Four battleships were sunk') - 0.4)
quiet(S('Four battleships were sunk') - 0.4, S('But Japan had its own') - 0.6)

# ═══ a7 · Japan hits snooze too
cue(S('But Japan had its own') + 0.3, 'boing', -6)                   # mồ hôi
for i in range(3): cue(w('The big prize', 'carriers') + i * 0.3, 'pop', -6)
cue(w('And the Japanese pilots ignored', 'yards'), 'stamp', 0)       # UNTOUCHED
cue(w('And the Japanese pilots ignored', 'raised'), 'whoosh-long', -8)
cue(w('Then there was the declaration', 'sort'), 'pen-sign', -6)
cue(w('That note was supposed', 'bombs'), 'clock-tick', -6)
cue(w('But the long message', 'typed'), 'typewriter-soft', -4)
cue(w('But the long message', 'slowly'), 'typewriter-soft', -4)
cue(w('By the time they handed', 'hour'), 'page-flip', -6)
cue(w('Which is how a surprise', 'sneak') - 0.3, 'alarm-ring', -6)
cue(w('Which is how a surprise', 'angry'), 'crowd-murmur', -10)

# ═══ a8 · The bill
cue(w('The next day, President Roosevelt', 'infamy'), 'pen-sign', -8)
cue(w('The next day, President Roosevelt', 'congress'), 'shutter', -6)
cue(w('Three days later, Germany', 'germany'), 'stamp', -2)
cue(w('Three days later, Germany', 'italy'), 'stamp', -2)
cue(w('Japan had wanted to knock', 'dragged'), 'impact', -6)
cue(w('And no, despite all', 'proof'), 'stamp', 0)
cue(S('A sub report nobody') + 0.4, 'stamp', -4)
cue(w('A sub report nobody', 'radar'), 'stamp', -4)
cue(w('A sub report nobody', 'warning'), 'stamp', -4)

# ═══ a9 · Outro
cue(w('Not really, because six', "hour's"), 'stamp', -4)             # NOT ENOUGH
cue(w('But it could have filled', 'fighters'), 'whoosh-long', -6)
cue(w('Kermit Tyler was never', 'training'), 'pen-sign', -8)
cue(w('It was sunk exactly', 'forty-four') - 0.3, 'page-flip', -4)   # lịch lật 1941 → 1944
cue(w('It was sunk exactly', 'same') - 1.0, 'gun', -8)
cue(S('History, it turns out') + 0.05, 'ding', -4)                   # nháy mắt
cue(S('Next time, a German minister') + 0.05, 'whoosh-soft', -8)    # ảnh bức điện trượt vào
cue(w('Next time, a German minister', 'secret'), 'stamp', -6)        # TOP SECRET
cue(w('Next time, a German minister', 'me') - 0.1, 'stamp', -3)      # REAL.

# ═══ Nhạc theo đoạn (thư viện kênh, không gen mới); đoạn chết chóc = _quiet
music(0.0, WT + 'wt-1-coldopen.m4a', 20)
music(S('By nineteen forty-one') - 0.4, GEN + 'bw-2-divided.mp3', 30)
music(S('On November twenty-sixth') - 0.4, WT + 'wt-3-conspiracy.m4a')
music(S('At six thirty-seven') - 0.4, WT + 'wt-5-suspense.m4a')
music(S('So they called the information') - 0.4, GEN + 'bw-5-press.mp3')
music(S('Meanwhile, in Washington') - 0.4, WT + 'wt-5-suspense.m4a', 40)
music(S('At about seven fifty-five') - 0.4, GEN + 'bw-3-wall.mp3', 60)
music(S('But Japan had its own') - 0.4, WT + 'wt-4-bumbling.m4a')
music(S('The next day, President Roosevelt') - 0.4, WT + 'wt-6-escalation.m4a')
music(S('So, did one man saying') - 0.4, GEN + 'bw-7-reflect.mp3', 30)
music(E('Next time, a German minister') + 1.5, PD + 'm-sting-end-card.ogg')

C.sort(key=lambda c: c['t'])
(D / 'cues.json').write_text(json.dumps(C, indent=0))
n = sum(1 for c in C if not c['kind'].startswith('_') and c['kind'] != 'hush')
print(f'{n} tiếng, {sum(1 for c in C if c["kind"] == "_music")} đoạn nhạc → data/cues.json ({n / (TL[-1]["end"] / 60):.1f} / phút)')
