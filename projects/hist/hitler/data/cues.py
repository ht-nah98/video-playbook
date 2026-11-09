#!/usr/bin/env python3
"""Kế hoạch tiếng hitler → data/cues.json (mốc theo TỪ của narration.timeline.json, không gõ giây).

Mỗi tiếng gắn một việc nhìn thấy trong cảnh (scenes/aN.js, chú thích đầu từng cảnh). Thư viện: projects/hist/_kit/sfx/ (+ CREDITS.md).
Nhạc: THƯ VIỆN KÊNH projects/hist/_kit/music/LIBRARY.md — tập này không xin gen mới; `from` để không nghe lặp tập trước.
Đoạn NGHIÊM (The serious part) = `_quiet`, không tiếng hiệu ứng; số người chết quán bia + Stalingrad + kết chiến tranh: hush, ít tiếng.

    python3 projects/hist/hitler/data/cues.py
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
# trailer 0–7.8 s: tiếng bám từng cắt của a0 cảnh 0 (cùng công thức chia đều)
H0 = 'Hey everyone, and welcome'
T1, T2, T3, T4, T5, T6 = w(H0, 'biggest'), w(H0, 'and', 1), w(H0, 'tiny'), w(H0, 'stupid'), w(H0, 'mistakes'), w(H0, 'that')
cue(0.0, 'whoosh-long', -9)                                              # băng tua ngược
for i in range(1, 9): cue(i * T1 / 9, 'whoosh-short', -13)               # mỗi ảnh một cắt
cue(T1, 'impact', -5); cue(w(H0, 'disasters'), 'boom', -4)               # chữ sập + rung
for i in range(1, 4): cue(T1 + i * (T2 - T1) / 4, 'whoosh-short', -12)
cue(T3, 'pop', -6); cue(T4, 'boing', -6); cue(T5, 'stamp', -3)           # tiny · stupid · dấu MISTAKES
cue(T6, 'impact', -4); cue(T6 + 0.05, 'whoosh-short', -9)                # logo sập
for i in range(4): cue(S('Today is a little different') - 0.2 + 0.4 + i / 1.8, 'bonk', -10)   # dấu ✗ bật
cue(S("It's June sixth") - 0.1, 'splash', -6)                           # ảnh D-Day
cue(S('Germany has powerful tank'), 'engine', -10)                      # xe tăng dự bị
cue(w('Only one person in the entire', 'bed') - 0.1, 'whoosh-soft', -8)  # cắt sang phòng ngủ
cue(S('His staff look at the confusing') + 1.2, 'snap', -10)            # rụt tay không gõ
cue(S('So the big tank reserves wait'), 'clock-tick', -6)
cue(w('So the big tank reserves wait', 'beach') - 0.1, 'stamp', -4)      # ASHORE
cue(S("It wasn't even close.") + 0.05, 'typewriter', -10)              # vạch đếm dồn
cue(S("So let's go back to the beginning"), 'whoosh-long', -6)          # tua ngược

# ═══ a0 · The art student
cue(w('He passed the first round', 'heads') - 1.6, 'stamp', -4)          # UNSATISFACTORY
cue(w('In other words, he could draw', 'people') - 0.3, 'boing', -6)     # người vẽ méo
cue(S('A year later he tried again') + 0.05, 'slam-paper', -2)          # cửa đóng sầm
cue(w('He later claimed the director', 'diploma'), 'stamp', -6)          # DIPLOMA REQUIRED
cue(w('So he stayed in Vienna', 'dealers'), 'cash-register', -8)
cue(w("Now, it's tempting to say", 'yes') - 0.4, 'ding', -6)             # WHAT IF?
cue(w("That's a joke, not history", 'joke'), 'stamp', -3)
cue(w("That's a joke, not history", 'thousand'), 'whoosh-short', -8)     # thẻ 1 vào khay

# ═══ a1 · The beer hall
cue(S('After fighting in the First World War'), 'crowd-murmur', -14)
cue(w('So on the evening of November eighth', 'pistol'), 'gun', -4)       # bắn lên trần
cue(S('His plan was to force three') + 2.2, 'pen-sign', -8)              # mũi tên Munich → Berlin
cue(w('The three men agreed', 'took'), 'boing', -6)                       # …NOPE
cue(S('The next morning, about two thousand') + 0.2, 'crowd-murmur', -12)
cue(w('About sixteen of his men', 'arrested'), 'stamp', -8)               # ARRESTED (nghiêm, khẽ)
cue(w('At his trial he gave', 'five'), 'stamp', -4)                       # 5 YEARS
cue(S('He served about nine months') + 0.4, 'typewriter-soft', -10)
cue(w('So his first attempt', 'famous') - 0.3, 'whoosh-short', -8)       # thẻ 2

# ═══ a1 · Not elected
for i in range(3): cue(S('He learned one lesson') + 0.1 + i * 0.4, 'bonk', -12)   # gõ cửa lịch sự
for i in range(3): cue(S('So for the next ten years') + 1.0 + i * 1.6, 'ding', -12)  # cột phiếu mọc
cue(w("But here's a fact", 'majority'), 'stamp', -4)                       # NEVER A MAJORITY
cue(w('In nineteen thirty-two he ran', 'lost'), 'boing', -8)
cue(S('Then a group of conservative') + 0.4, 'snap', -10)                # dây con rối
cue(S('That was the plan, in January') - 0.1, 'shutter', -6)            # ảnh Potsdam
cue(w('Within two months he had passed', 'law'), 'stamp', -4)             # ENABLING ACT
cue(w('Within two months he had passed', 'nobody'), 'whoosh', -6)         # chính khách rơi

# ═══ a2 · The halt order
cue(w('In September nineteen thirty-nine', 'poland'), 'boom-deep', -10)
cue(w('Then, in May nineteen forty', 'forest'), 'engine', -10)
cue(S('And then the tanks stopped.') - 0.1, 'impact', -4)                 # biển STOP
hush(S('And then the tanks stopped.') - 0.1, E('And then the tanks stopped.') + 0.4)
cue(w('The order to halt came', 'approved'), 'stamp', -3)                 # APPROVED
cue(w('Hermann Göring, the head', 'alone') - 0.8, 'engine', -12)          # máy bay vòng
cue(S('For about three days') + 0.2, 'clock-tick', -10)
cue(w('For about three days', 'work') - 0.3, 'honk', -10)                 # tàu Anh lên đường
cue(S('Destroyers, ferries, fishing') + 0.1, 'splash', -8)
cue(w('Britain lost almost all', 'trucks') + 0.4, 'whoosh-short', -8)     # thẻ 4

# ═══ a2 · Changing targets
cue(S('That summer, Hitler wanted') + 1.0, 'boom', -12)                  # sân bay bị đánh
cue(S('It was hurting') + 0.3, 'pour', -14)                              # phi công mệt (tách trà)
cue(w('Then, one night, a few German', 'london'), 'boom-deep', -8)
cue(w('Hitler was furious', 'london'), 'impact', -6)                      # đập bàn, đổi mũi tên
cue(S('But it also gave the exhausted') + 0.2, 'glass-clink', -12)       # nghỉ, uống trà
cue(w('By the middle of September', 'postponed'), 'stamp', -4)
cue(w('By the middle of September', 'happened'), 'whoosh-short', -8)      # thẻ 5

# ═══ a3 · Kicking the door
cue(S('On June twenty-second') + 0.1, 'boom-deep', -6)
cue(w('Hitler reportedly said', 'crashing'), 'impact', -4)                # đạp cửa đổ
cue(S('But the plan assumed') + 0.1, 'amb-wind-drone-loop', -16, end=E('By early December') + 0.5)
cue(w('The roads turned to mud', 'mud'), 'splash', -10)
cue(w('And then the Soviet counterattack', 'east') - 0.6, 'cheer', -12)    # "Ura!"
cue(w('The door, it turned out', 'house') + 0.3, 'whoosh-short', -8)      # thẻ 6

# ═══ a3 · The serious part — không tiếng hiệu ứng
quiet(S('Before we go any further') - 0.6, E('The jokes are about one thing') + 0.4)

# ═══ a4 · Four days later
cue(S('On December seventh, nineteen forty-one') - 0.1, 'boom-deep', -10)
cue(w('Germany had a treaty with Japan', 'attacked') - 0.4, 'pen-sign', -8)  # tô vàng
cue(S('So Hitler was under no obligation') + 0.2, 'cricket', -10)
cue(w('Four days later, he stood up', 'declared'), 'stamp', -3)           # WAR ON THE USA
cue(S('And now it had added') + 0.2, 'engine', -10)                      # nhà máy
cue(w("If you're keeping track", 'picked'), 'boom', -6)                   # nổ não
cue(w("If you're keeping track", 'picked') + 0.6, 'whoosh-short', -8)    # thẻ 7

# ═══ a4 · The airlift
cue(S('In the summer of nineteen forty-two') + 0.6, 'engine', -10)
cue(S('Stalingrad turned into months') + 0.3, 'gun', -14)
cue(w('In November, the Soviets launched', 'surrounded') - 0.3, 'impact', -8)
cue(w('His generals wanted to break out', 'no'), 'stamp', -2)             # NO.
cue(S('He said his air force could keep') + 0.2, 'engine', -12)
cue(w('The army needed around', 'hundred', 1) - 0.2, 'boing', -8)         # cột ~100 lùn tịt
cue(w('So the soldiers starved', 'marshal') - 0.3, 'ding', -6)            # gậy thống chế
cue(S('Paulus surrendered the next day.') - 0.1, 'stamp', -4)
hush(S('About ninety-one thousand') - 0.2, E('About ninety-one thousand') + 0.6)
cue(w('About ninety-one thousand', 'home') + 0.6, 'whoosh-soft', -12)     # thẻ 8 (khẽ)

# ═══ a5 · Do not disturb
cue(S('Which brings us back') + 0.1, 'page-flip', -6)
cue(w('For months, the Allies', 'inflatable'), 'pour', -12)               # bơm hơi
cue(w('So when the landings began', 'sleep') - 0.2, 'fuse-soft', -12)     # ngáy khẽ
cue(S("Germany's most famous general") + 0.2, 'hurray', -12)             # tiệc sinh nhật
cue(w('The tank reserves finally got', 'planes'), 'boom', -6)
cue(w('Two months later, Paris', 'east') + 0.8, 'whoosh-short', -8)       # thẻ 9

# ═══ a5 · The bunker
cue(S('By the spring of nineteen forty-five') + 0.2, 'boom-deep', -16)
cue(S('Soviet troops were fighting') + 0.2, 'gun', -12)
hush(S('On April thirtieth') - 0.3, E('The war he started') + 0.6)

# ═══ a6 · The ranking + Outro
for wd_ in [('Down at the bottom', 'art'), ('Changing targets in the Battle', 'britain'), ('Changing targets in the Battle', 'dunkirk'),
            ('And at the very top', 'soviet'), ('And at the very top', 'states')]: cue(w(*wd_), 'stamp', -6)
cue(S('The beer hall goes low') + 0.5, 'stamp', -6)
cue(S('Sleeping in on D-Day') + 0.5, 'stamp', -6)
cue(w("That's the moment the most", 'world') - 0.6, 'impact', -6)
cue(w('But they were also helped', 'no') - 0.3, 'stamp', -4)              # NEIN.
cue(S('Except, maybe, that art school.') + 0.5, 'stamp', -4)             # REJECTED

# ═══ Nhạc theo đoạn (thư viện kênh, không gen mới)
music(0.0, GEN + 'bw-1-coldopen.mp3', 30)
music(S('In nineteen-oh-seven') - 0.4, WT + 'wt-2-theme.m4a')
music(S('After fighting in the First World War') - 0.4, WT + 'wt-3-conspiracy.m4a')
music(S('He learned one lesson') - 0.4, GEN + 'bw-5-press.mp3')
music(S('In September nineteen thirty-nine') - 0.4, WT + 'wt-6-escalation.m4a')
music(S('The order to halt came') - 0.4, WT + 'wt-4-bumbling.m4a')
music(S('Destroyers, ferries, fishing') - 0.4, GEN + 'bw-6-gate.mp3', 60)
music(S('That summer, Hitler wanted') - 0.4, GEN + 'bw-2-divided.mp3', 40)
music(S('It was a horror for the people') - 0.4, GEN + 'bw-3-wall.mp3')
music(S('But it also gave the exhausted') - 0.4, WT + 'wt-2-theme.m4a', 20)
music(S("So Hitler couldn't beat Britain") - 0.4, WT + 'wt-6-escalation.m4a', 40)
music(S('But the plan assumed') - 0.4, GEN + 'bw-3-wall.mp3', 60)
music(S('On December seventh, nineteen forty-one') - 0.4, WT + 'wt-5-suspense.m4a')
music(S("If you're keeping track") - 0.4, WT + 'wt-4-bumbling.m4a', 10)
music(S('In the summer of nineteen forty-two') - 0.4, WT + 'wt-6-escalation.m4a', 60)
music(S('He said his air force could keep') - 0.4, WT + 'wt-4-bumbling.m4a', 20)
music(S('So the soldiers starved') - 0.4, GEN + 'bw-3-wall.mp3', 100)
music(S('Which brings us back') - 0.4, GEN + 'bw-1-coldopen.mp3', 60)
music(S("Germany's most famous general") - 0.4, WT + 'wt-2-theme.m4a', 30)
music(S('The tank reserves finally got') - 0.4, WT + 'wt-6-escalation.m4a', 20)
music(S('By the spring of nineteen forty-five') - 0.4, GEN + 'bw-3-wall.mp3', 140)
music(S('So, which was his worst') - 0.4, GEN + 'bw-5-press.mp3', 30)
music(S('The people who stopped him') - 0.4, GEN + 'bw-7-reflect.mp3', 60)
music(E('Except, maybe, that art school.') + 1.0, PD + 'm-sting-end-card.ogg')

C.sort(key=lambda c: c['t'])
(D / 'cues.json').write_text(json.dumps(C, indent=0))
n = sum(1 for c in C if not c['kind'].startswith('_') and c['kind'] != 'hush')
print(f'{n} tiếng, {sum(1 for c in C if c["kind"] == "_music")} đoạn nhạc → data/cues.json ({n / (TL[-1]["end"] / 60):.1f} / phút)')
