#!/usr/bin/env python3
"""Đọc channels-*.json của market_channels.py: bảng kênh theo tuổi + so SEO trong từng kênh (video vượt trội ≥3× trung vị kênh vs phần còn lại)."""
import sys, json, re, statistics as st, datetime as dt, collections
R = json.load(open(sys.argv[1])); NOW = dt.datetime(2026, 11, 2)
def dur(d):
    x = re.match(r'P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', d); return int(x[1] or 0)*86400+int(x[2] or 0)*3600+int(x[3] or 0)*60+int(x[4] or 0)
day = lambda s: dt.datetime.strptime(s[:10], '%Y-%m-%d')
rows = []; pairs = collections.defaultdict(list); tagO = collections.Counter(); tagN = collections.Counter(); ov = []
F = dict(tag=lambda v: len(v['tags']) > 0, ntags=lambda v: len(v['tags']), hash_desc=lambda v: bool(re.search(r'#\w', v['desc'])), hash_title=lambda v: '#' in v['t'], tlen=lambda v: len(v['t']), dlen=lambda v: len(v['desc']), chap=lambda v: bool(re.search(r'(?m)^\D{0,3}0?0:00', v['desc'])), q=lambda v: '?' in v['t'], num=lambda v: bool(re.search(r'\d', v['t'])), explained=lambda v: bool(re.search(r'explain', v['t'], re.I)), why=lambda v: bool(re.search(r'\bwhy\b', v['t'], re.I)), mins=lambda v: bool(re.search(r'\d+\s*min', v['t'], re.I)), every=lambda v: bool(re.search(r'\b(every|all of|entire)\b', v['t'], re.I)), never=lambda v: bool(re.search(r'never|wish|school|nobody|finally', v['t'], re.I)), mins_len=lambda v: dur(v['d'])/60)
for c, x in R.items():
    L = [v for v in x['videos'] if dur(v['d']) >= 180]; S = [v for v in x['videos'] if dur(v['d']) < 180]
    if len(L) < 3: continue
    L.sort(key=lambda v: v['p']); med = st.median(v['v'] for v in L); first = day(L[0]['p'])
    hit = next((i for i, v in enumerate(L) if v['v'] >= 100000), None)
    span = max((day(L[-1]['p'])-first).days, 1)
    top = max(L, key=lambda v: v['v'])
    rows.append(dict(name=x['name'], src=x['src'], made=x['made'][:7], first=L[0]['p'][:7], partial=x['n'] > len(x['videos']), subs=x['subs'], n=len(L), s=len(S), per=len(L)/span*30, med=med, top=top['v'], tt=top['t'], hit=None if hit is None else hit+1, hitd=None if hit is None else (day(L[hit]['p'])-first).days, top_share=top['v']/max(sum(v['v'] for v in L),1), sub1k=x['subs']/max(x['views'],1)*1000, tagp=sum(1 for v in L if v['tags'])/len(L), hashp=sum(1 for v in L if re.search(r'#\w', v['desc']))/len(L)))
    if len(L) < 8: continue
    O = [v for v in L if v['v'] >= 3*med]; N = [v for v in L if v['v'] < 3*med]
    if len(O) < 2: continue
    for k, f in F.items():
        pairs[k].append(st.mean(map(float, map(f, O)))-st.mean(map(float, map(f, N))))
    for v in O:
        ov.append((v['v'], med, x['name'], v['t'], len(v['tags']))); tagO.update(t.lower() for t in v['tags'])
    for v in N: tagN.update(t.lower() for t in v['tags'])
rows.sort(key=lambda r: r['first'], reverse=True)
print('kênh | từ | sub | dài/ngắn | video/tháng | trung vị | top | hit100k thứ/ngày | top% | sub/1k | tag% | #%')
for r in rows:
    print(f"{r['name'][:22]:22} {r['first']}{'*' if r['partial'] else ''} {r['subs']:>9} {r['n']:>3}/{r['s']:<3} {r['per']:>5.1f} {r['med']:>9.0f} {r['top']:>9} {str(r['hit'])+'/'+str(r['hitd']) if r['hit'] else '-':>8} {r['top_share']*100:>3.0f} {r['sub1k']:>5.1f} {r['tagp']*100:>3.0f} {r['hashp']*100:>3.0f} | {r['tt'][:48]}")
print('\nSO TRONG KÊNH (vượt trội − còn lại), số kênh', len(next(iter(pairs.values()))))
for k, a in pairs.items():
    print(f"{k:10} TB {st.mean(a):+8.2f}  trung vị {st.median(a):+8.2f}  kênh dương {sum(1 for x in a if x>0)}/{len(a)}")
print('\nTAG hay gặp ở video vượt trội:', [t for t, _ in tagO.most_common(30)])
