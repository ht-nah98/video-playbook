#!/usr/bin/env python3
"""Tạo playlist Shorts kênh Anh "Math in Under a Minute: Shorts" và thêm 22 Short theo nhóm chủ đề (channels/en/PLAYLISTS.md §D).

    tools/i18n/.venv/bin/python tools/yt/playlist_shorts.py            # chạy thật: tạo (nếu chưa có) + thêm + đọc lại
    tools/i18n/.venv/bin/python tools/yt/playlist_shorts.py --dry-run  # chỉ in kênh + việc sẽ làm
    tools/i18n/.venv/bin/python tools/yt/playlist_shorts.py --pid=PL…  # dùng playlist đã tạo (lần trước dừng giữa chừng)

Chạy lại an toàn: playlist trùng title thì dùng lại, video đã có thì bỏ qua. Token: tools/yt/auth.py (kênh Anh).
"""
import pathlib, sys, time
ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools' / 'yt'))
from auth import clients
from googleapiclient.errors import HttpError

TITLE = 'Math in Under a Minute: Shorts'
DESC = """One idea, under a minute.

Why is π 3.14? Why is 0⁰ a problem? Why isn't a coin flip really 50/50? Why does a pyramid need only a third of the stone? Each Short is one moment from a full video on the channel.

Grouped by topic: π and circles, zero and powers, chance, geometry you can build, and calculus."""
IDS = [
    'Y4IkLUsFvG4', 'uPmJQzRCA4s', 'Il2rM7gnYD4', '_-4av4l8LKQ',                                 # π và hình tròn
    'WvW7CvnjL3g', 'F28gggAZKVo', 'FaIPLAd5BnM',                                                # hình khối, xây dựng
    'kxsbVINhems', 'jnC1OjWDcPc', 'TlFeF7PMSic', 'RgXatDg1cQY',                                 # xác suất
    'sSF7iFV2Cuo', 'tkYvPU8Daik', 'aV5RjRq88PM', 'ixfQlnzWyZ4', '6aCW1CMnBUk', '0p2lt5AGbPc',   # số 0, luỹ thừa, vô cực
    '4vbmzDsnJE4', 'WWOfZho-0CM',                                                               # lịch sử con số
    'eBENHajkgQw', 'NcJ1Yg7H5Kc', 'lt9PdZKNK24',                                                # calculus
]
assert len(IDS) == 22 and len(set(IDS)) == 22 and len(DESC) <= 5000 and '<' not in DESC and '>' not in DESC

dry = '--dry-run' in sys.argv
yt = clients('en')[0]
ch = yt.channels().list(part='snippet', mine=True).execute()['items'][0]
print('kênh:', ch['snippet']['title'], ch['id'])
mine = yt.playlists().list(part='snippet', mine=True, maxResults=50).execute()['items']
ex = [p for p in mine if p['snippet']['title'] == TITLE]
if dry:
    print('playlist:', 'đã có ' + ex[0]['id'] if ex else 'sẽ tạo mới (public)', '· sẽ thêm', len(IDS), 'Short'); sys.exit()
arg = [a.split('=', 1)[1] for a in sys.argv if a.startswith('--pid=')]
if arg:
    pid = arg[0]; print('dùng playlist đã tạo', pid)         # playlist mới tạo có thể chưa hiện trong playlists.list → tránh tạo trùng
elif ex:
    pid = ex[0]['id']; print('dùng lại playlist', pid)
else:
    pid = yt.playlists().insert(part='snippet,status', body={'snippet': {'title': TITLE, 'description': DESC, 'defaultLanguage': 'en'},
                                                              'status': {'privacyStatus': 'public'}}).execute()['id']
    print('tạo playlist', pid)
try:      # playlist vừa tạo / còn rỗng: API trả 404 playlistNotFound vài giây đầu → coi như chưa có video
    have = [i['contentDetails']['videoId'] for i in yt.playlistItems().list(part='contentDetails', playlistId=pid, maxResults=50).execute()['items']]
except HttpError as e:
    if e.resp.status != 404: raise
    have = []; time.sleep(3)
for n, v in enumerate(IDS):
    if v in have: continue
    yt.playlistItems().insert(part='snippet', body={'snippet': {'playlistId': pid, 'position': n,
                                                                'resourceId': {'kind': 'youtube#video', 'videoId': v}}}).execute()
    print('  +', n, v); time.sleep(0.3)
got = yt.playlistItems().list(part='contentDetails,snippet', playlistId=pid, maxResults=50).execute()['items']
order = [i['contentDetails']['videoId'] for i in sorted(got, key=lambda i: i['snippet']['position'])]
print('đọc lại:', len(order), 'video ·', 'đúng thứ tự' if order == IDS else 'LỆCH THỨ TỰ')
print('https://www.youtube.com/playlist?list=' + pid)
