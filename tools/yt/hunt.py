#!/usr/bin/env python3
"""Săn đề: video dài vượt trội so với trung vị CỦA CHÍNH KÊNH (chỉ dữ liệu công khai, YouTube Data API, ~3.200 đơn vị quota).
Dùng: tools/i18n/.venv/bin/python tools/yt/hunt.py analytics/market   (ra hunt.json; sửa danh sách Q theo đợt).
Chỉ thấy video thắng, không thấy video cùng đề bị chìm: đọc channels/en/TOPIC-HUNT-2026-11.md trước khi kết luận."""
import sys,re,json,statistics as st,pathlib
sys.path.insert(0,'tools/yt')
import auth
D=pathlib.Path(sys.argv[1]);yt=auth.clients('en',interactive=False)[0]
Q=["math explained visually","explained better than school math","all of algebra in minutes","all of precalculus in minutes","all of statistics in minutes","all of math in minutes","linear algebra explained intuition","statistics explained simply","imaginary numbers explained","what is e euler's number explained","integral explained intuition","derivative explained intuition","exponents explained why","probability explained intuition","fractions explained finally understand","math they never taught you in school"]
m=json.load(open('analytics/market/market-2026-11-02.json'));V=dict(m['V']);C=dict(m['C'])
def dur(d):
    x=re.match(r'P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?',d);return int(x[1] or 0)*86400+int(x[2] or 0)*3600+int(x[3] or 0)*60+int(x[4] or 0)
ids=set()
for q in Q:
    for vd in ('medium','long'):
        r=yt.search().list(part='id',q=q,type='video',order='viewCount',maxResults=25,publishedAfter='2025-11-02T00:00:00Z',relevanceLanguage='en',videoDuration=vd).execute()
        ids|={i['id']['videoId'] for i in r['items']}
print('search ids',len(ids))
ids=[i for i in ids if i not in V]
for i in range(0,len(ids),50):
    for v in yt.videos().list(part='snippet,statistics,contentDetails',id=','.join(ids[i:i+50])).execute()['items']:
        s=v['statistics'];V[v['id']]={'t':v['snippet']['title'],'c':v['snippet']['channelId'],'ct':v['snippet']['channelTitle'],'p':v['snippet']['publishedAt'],'v':int(s.get('viewCount',0)),'l':int(s.get('likeCount',0)),'cm':int(s.get('commentCount',0)),'d':v['contentDetails']['duration']}
need=[c for c in {x['c'] for x in V.values()} if c not in C]
for i in range(0,len(need),50):
    for c in yt.channels().list(part='statistics',id=','.join(need[i:i+50])).execute()['items']:
        C[c['id']]=int(c['statistics'].get('subscriberCount',0))
BAD=re.compile(r"class\s*\d|cbse|ncert|jee|neet|one\s*shot|oneshot|sat\b|act\b|psat|desmos|trading|scalp|aviator|kalshi|geometry dash|game|minecraft|ssc|upsc|board|lecture\s*\d|ep(isode)?\s*\d|chapter\s*\d|grade\s*\d|gcse|\bboy\b|prank|#",re.I)
cand=[]
for k,x in V.items():
    d=dur(x['d'])
    if not 180<=d<=2700 or x['p']<'2025-11' or x['v']<30000: continue
    s=C.get(x['c'],0)
    if not 0<s<200000 or BAD.search(x['t']) or not re.fullmatch(r"[\x00-\x7f’‘“”–—πθ×²]*",x['t']): continue
    cand.append((k,x,s,d))
print('cand',len(cand),'channels',len({c[1]['c'] for c in cand}))
med={}
for c in {x[1]['c'] for x in cand}:
    up='UU'+c[2:]
    try: it=yt.playlistItems().list(part='contentDetails',playlistId=up,maxResults=50).execute()['items']
    except Exception as e: continue
    vs=yt.videos().list(part='statistics,contentDetails',id=','.join(i['contentDetails']['videoId'] for i in it)).execute()['items']
    L=[int(v['statistics'].get('viewCount',0)) for v in vs if dur(v['contentDetails']['duration'])>=180]
    med[c]=(st.median(L) if L else 0,len(L))
rows=[]
for k,x,s,d in cand:
    a,n=med.get(x['c'],(0,0))
    rows.append(dict(id=k,t=x['t'],ct=x['ct'],v=x['v'],s=s,min=d//60,p=x['p'][:10],l=x['l'],cm=x['cm'],med=a,n=n,o=round(x['v']/a,1) if a else None))
rows=[r for r in rows if r['n']>=3 and r['o'] and r['o']>=3]
rows.sort(key=lambda r:-r['v'])
json.dump(rows,open(D/'hunt.json','w'),ensure_ascii=False,indent=0)
print('outliers',len(rows))
for r in rows:print(r['v'],'sub',r['s'],f"x{r['o']}",f"{r['min']}p",r['p'],r['ct'][:20],'|',r['t'][:72])
