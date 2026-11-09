#!/usr/bin/env python3
"""Kiểu title nào thắng trong MỘT đề (docs/TITLE.md §3): tìm video theo vài cụm từ khoá (YouTube Data API, chỉ dữ liệu công khai,
~100 đơn vị quota mỗi cụm × độ dài), lấy view + số sub kênh, xếp title theo khuôn (why / how / what if / hỏi khác / khẳng định), in trung vị.
Làm lần đầu cho pearl (11-06): câu hỏi thắng khi trúng câu người ta đang tìm; góc nói thẳng đáp án yếu.

  tools/i18n/.venv/bin/python tools/yt/topic_titles.py <ra.json> "<cụm 1>" ["<cụm 2>" …] [--must "<từ bắt buộc trong title>"] [--noise "<regex loại>"] [--short]
  vd: tools/i18n/.venv/bin/python tools/yt/topic_titles.py out/hist/_market/pearl-titles.json "pearl harbor" "pearl harbor radar" --must "pearl harbor" \\
        --noise "soundtrack|suite|movie|zimmer|trailer|scene"
Không tham số: in cách dùng (LESSONS §135). Có <ra.json> sẵn → chỉ phân tích lại, không gọi API (đổi --must / --noise thoải mái).
Là VIEW, chưa phải CTR — phán quyết cuối là Test & Compare."""
import sys, json, re, pathlib, statistics as st

KINDS = [('what if', r'(?i)^(what if|could|would)\b'), ('why', r'(?i)^why\b'), ('how', r'(?i)^how\b'),
         ('hỏi khác', r'(?i)^(what|who|when|did|was|is|are|can)\b|\?\s*$')]
def kind(t):
    for k, rx in KINDS:
        if re.search(rx, t.strip()): return k
    return 'khẳng định'

def fetch(qs, short):
    sys.path.insert(0, str(pathlib.Path(__file__).parent)); import auth
    yt = auth.clients('en', interactive=False)[0]; ids = set()
    for q in qs:
        for vd in (['short'] if short else ['medium', 'long']):
            r = yt.search().list(part='id', q=q, type='video', order='viewCount', maxResults=25, relevanceLanguage='en', videoDuration=vd).execute()
            ids |= {i['id']['videoId'] for i in r['items']}
    V, ids = {}, list(ids)
    for i in range(0, len(ids), 50):
        for v in yt.videos().list(part='snippet,statistics', id=','.join(ids[i:i + 50])).execute()['items']:
            V[v['id']] = {'t': v['snippet']['title'], 'c': v['snippet']['channelId'], 'ct': v['snippet']['channelTitle'], 'p': v['snippet']['publishedAt'][:10], 'v': int(v['statistics'].get('viewCount', 0))}
    cs = list({x['c'] for x in V.values()}); C = {}
    for i in range(0, len(cs), 50):
        for c in yt.channels().list(part='statistics', id=','.join(cs[i:i + 50])).execute()['items']: C[c['id']] = int(c['statistics'].get('subscriberCount', 0) or 0)
    for x in V.values(): x['s'] = C.get(x['c'], 0); x['r'] = x['v'] / max(1, x['s'])
    return V

def main(a):
    if len(a) < 1 or a[0] in ('-h', '--help'): print(__doc__); return 0
    out = pathlib.Path(a[0]); opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    qs = [x for i, x in enumerate(a[1:], 1) if not x.startswith('--') and a[i - 1] not in ('--must', '--noise', '--min')]
    if out.exists(): V = json.load(open(out))
    else:
        if not qs: print('chưa có', out, '→ cần ít nhất một cụm từ khoá'); return 2
        V = fetch(qs, '--short' in a); out.parent.mkdir(parents=True, exist_ok=True); json.dump(V, open(out, 'w'), ensure_ascii=False, indent=0)
    must, noise, minv = opt('--must'), opt('--noise'), int(opt('--min', '30000'))
    L = [x for x in V.values() if x['v'] >= minv and (not must or re.search('(?i)' + re.escape(must), x['t'])) and not (noise and re.search('(?i)' + noise, x['t']))]
    G = {}
    for x in L: G.setdefault(kind(x['t']), []).append(x)
    print(f"{len(L)} video ≥ {minv:,} view (của {len(V)} tìm được)\n{'khuôn':12s} {'n':>3s} {'trung vị view':>14s} {'trung vị view/sub':>18s}")
    for k, xs in sorted(G.items(), key=lambda kv: -st.median([x['v'] for x in kv[1]])):
        print(f"{k:12s} {len(xs):3d} {st.median([x['v'] for x in xs]) / 1e3:12.0f}k {st.median([x['r'] for x in xs]):18.2f}")
    print()
    for x in sorted(L, key=lambda x: -x['v'])[:30]: print(f"{x['v'] / 1e6:6.2f}tr {x['r']:7.1f}×  {kind(x['t']):11s} {x['ct'][:18]:18s} {x['t'][:90]}")
    return 0

if __name__ == '__main__': sys.exit(main(sys.argv[1:]))
