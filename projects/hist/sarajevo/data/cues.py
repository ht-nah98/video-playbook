#!/usr/bin/env python3
"""Kế hoạch tiếng Sarajevo (bản 6+) → data/cues.json (mốc theo TỪ của narration.timeline.json, không gõ giây).

Nguồn: kế hoạch v5 (51 cue) + sửa của bài review tiếng bản 5 (LESSONS §201; git 71db400 REVIEW-v5.md §C): bỏ 8 cue không có việc nhìn thấy, đổi loại sai
(dấu ngày / CANCELLED → stamp), nổ lúc bom +5 dB dời 0.14 s cắt 0.8 s, cú đá 105 s → bonk, súng vào khoảng lặng TRƯỚC
"He fires twice", một `_quiet` liền qua nhịp chết (bỏ whoosh sau), pop +3 dB, bỏ shutter + hurray, 4 hush, bản soft của
whoosh / typewriter / fuse; thêm cue cho cảnh mở mới + câu Italy; nền phố rì rầm, rè đĩa 78 vòng, nhạc theo đoạn.

    python3 projects/hist/sarajevo/data/cues.py
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent
TL = json.loads((D / 'narration.timeline.json').read_text())['lines']
MUS = 'projects/hist/_kit/music/'


def line(pre):
    ls = [l for l in TL if l['text'].startswith(pre)]
    assert len(ls) == 1, pre
    return ls[0]


def w(pre, word, nth=0, edge='start'):
    """giờ của từ thứ nth (đúng bằng `word`, không phân biệt hoa, bỏ dấu câu) trong dòng có đầu `pre`."""
    ws = [x for x in line(pre)['words'] if x['w'].lower().strip('.,:;?!"\'') == word]
    assert len(ws) > nth, (pre, word)
    return round(ws[nth][edge], 3)


def S(pre): return round(line(pre)['words'][0]['start'], 3)
def E(pre): return round(line(pre)['words'][-1]['end'], 3)


C = []
def cue(t, kind, db=0, **k): C.append({'t': round(t, 3), 'kind': kind, 'db': db, **k})
def hush(t, end): C.append({'t': round(t, 3), 'kind': 'hush', 'end': round(end, 3)})


# ── Mở bài: chào → hứa (cảnh WRONG TURN / STALL / "19" / bản đồ nổ) → ngòi nổ
cue(0.35, 'whoosh-soft', -2)
cue(w('Today: how', 'turn'), 'honk', -3)                    # xe + chữ WRONG TURN
cue(w('Today: how', 'stalled'), 'thud', -3)                 # khói STALL
cue(w('Today: how', 'outside'), 'pop', 1)                            # chữ "19" hiện
cue(w('Today: how', 'lit'), 'boom-deep', 2)                 # bản đồ nổ thật (realBoom từ 'lit')
cue(w('But first', 'fuse') - 0.1, 'fuse-soft', -2)          # ngòi chạy ngang bản đồ tới Sarajevo
# ── Bối cảnh 1914
cue(w('Naturally', 'army'), 'bonk', 2); cue(w('Naturally', 'navy'), 'bonk', 4)
cue(w('In nineteen fourteen they', 'war') + 0.05, 'boom', 4)
cue(w('In nineteen fourteen they', 'the', 2), 'typewriter-soft', -2)   # câu trích Wells hiện chữ
hush(S('Today we just') - 0.05, w('Today we just', 'world'))
cue(w('Today we just', 'world') + 0.04, 'boom-deep', 9)
cue(S('This is the world map') - 0.25, 'whoosh-soft', -2)
cue(w("That's imperialism", 'imperialism'), 'stamp', 7)
cue(w("That's imperialism", 'flag'), 'pop', 1)
cue(w('Britain ran', 'fifth'), 'stamp', 3)                   # dấu ≈ 1/5
cue(w('Germany, on the other', 'steel'), 'thud', 4)
# ── Hai phe
cue(w('Germany, Austria-Hungary', 'alliance'), 'pop', 1)
hush(w('Italy, still', 'said'), w('Italy, still', 'sure'))
cue(w('Italy, still', 'sure'), 'pop', 0)
cue(w('Everyone promised', 'giant'), 'bonk', 0)
cue(w('And the most dangerous', 'nineteen'), 'stamp', 6)     # dấu năm 1908
cue(w('That spark came', 'spark'), 'engine', -3)
# ── Buổi sáng 28-6
cue(S('June twenty-eighth'), 'stamp', 4)                     # dấu ngày
amb0 = w('June twenty-eighth', 'sarajevo')
cue(w('Along the route', 'pistols'), 'pop', 0); cue(w('Along the route', 'bombs'), 'pop', 0)
cue(w('The first one', 'bounces'), 'boing', 0)
cue(w('The first one', 'explodes') + 0.14, 'boom', 5, end=w('The first one', 'explodes') + 0.94)
hush(w('Plan failed', 'cancelled'), w('Plan failed', 'cancelled') + 2.6)
cue(w('Plan failed', 'cancelled'), 'stamp', 4)
amb1 = E('Plan failed') + 0.6
# ── Đổi lộ trình
amb2 = S('So the cars turn') - 0.3
cue(S('So the cars turn') + 0.2, 'engine', -6)
cue(w('So the cars turn', 'wrong') - 0.05, 'honk', 3)
cue(w('So the cars turn', 'stalls'), 'thud', 0)
hush(w('And no, he', 'that'), w('And no, he', 'myth'))
cue(w('And no, he', 'myth'), 'stamp', 7)
# ── Hai phát súng: một khoảng lặng liền, súng trong lặng TRƯỚC câu, nghỉ 2 s sau "dead within the hour"
q0 = E('And no, he') + 0.35; t_he = S('He fires twice')
C.append({'t': round(q0, 3), 'kind': '_quiet', 'end': round(S('One month later') - 0.1, 3)})
cue(t_he - 0.76, 'gun', 6); cue(t_he - 0.31, 'gun', 6)
amb3 = t_he - 1.0
# ── Hậu quả + tập sau
cue(w('One month later', 'joined'), 'boom', 6)
cue(w('All because', 'driver', edge='end') + 0.1, 'cricket', -4)
cue(S('Next time') - 0.2, 'whoosh-soft', -2)
for k in ('letter', 'cheque', 'seven'): cue(w('Next time', k), 'stamp', 3)
cue(w('And Italy', 'well'), 'pop', 1)                        # mặt Italy + "?"
# ── Nền
end_ep = E('And Italy') + 4.4
cue(amb0, 'amb-crowd-murmur-loop', -20, end=amb1)
cue(amb2, 'amb-crowd-murmur-loop', -20, end=amb3)
cue(S('This is the world map'), 'amb-wind-drone-loop', -24, end=S('So Europe split'))
cue(0.0, 'tex-crackle-78rpm-loop', -27, end=end_ep)
# ── Nhạc theo đoạn (C4)
C += [{'t': 0.0, 'kind': '_music', 'file': MUS + 'm-opening-slippery-place.ogg'},
      {'t': round(S('So Europe split') - 0.3, 3), 'kind': '_music', 'file': MUS + 'm-march-fall-in-line.ogg'},
      {'t': round(S('One month later') - 0.6, 3), 'kind': '_music', 'file': MUS + 'm-sombre-chopin-funeral.ogg'},
      {'t': round(S('Next time') - 0.4, 3), 'kind': '_music', 'file': MUS + 'm-opening-alt-trombone-johnsen.ogg'},
      {'t': round(E('And Italy') + 0.3, 3), 'kind': '_music', 'file': MUS + 'm-sting-end-card.ogg'}]

C.sort(key=lambda c: c['t'])
(D / 'cues.json').write_text(json.dumps(C, indent=0))
n = [c for c in C if not c['kind'].startswith(('_', 'hush', 'amb', 'tex'))]
print(f'{len(C)} mục: {len(n)} tiếng ({len(n) / (E("And Italy") / 60):.1f}/phút), {sum(c["kind"] == "hush" for c in C)} hush')
