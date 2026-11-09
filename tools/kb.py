#!/usr/bin/env python3
"""Tra kho bài học (docs/LESSONS.md) và luật (docs/CRAFT.md) — đọc đúng mục cần, không đọc cả 1200 dòng.

    python3 tools/kb.py shadowBlur tất định     # tìm mục chứa MỌI từ (không phân biệt hoa/thường, bỏ dấu tiếng Việt)
    python3 tools/kb.py 127 §60                 # in nguyên mục §127 và §60
    python3 tools/kb.py --group "Âm thanh"      # mọi mục của một nhóm trong bảng chỉ mục (một phần tên là đủ)
    python3 tools/kb.py --groups                # liệt kê các nhóm + số mục
    python3 tools/kb.py --file engine/sfx.js    # mục nào nhắc tới file / thư mục này — đọc TRƯỚC khi sửa nó
    python3 tools/kb.py --craft 8b              # in một mục của CRAFT (luật ngắn) + các §LESSONS nó dẫn
    python3 tools/kb.py --recent 10             # 10 mục mới nhất (tiêu đề)
    python3 tools/kb.py --check                 # mọi mục có trong chỉ mục? mọi §n được dẫn (CRAFT, docs) có thật?

Kết quả tìm: một dòng mỗi mục — §n, nhóm, loại [MV/BH/chung], → CRAFT §x, tiêu đề, dòng khớp đầu tiên.
Thêm `-v` để in nguyên văn các mục khớp. Mục mới: viết `## N. tiêu đề (bài, ngày)` cuối LESSONS + thêm vào bảng chỉ mục.
"""
import argparse, re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LESSONS = ROOT / 'docs' / 'LESSONS.md'
CRAFT = ROOT / 'docs' / 'CRAFT.md'


def fold(s):
    s = unicodedata.normalize('NFD', s.lower().replace('đ', 'd'))
    return ''.join(c for c in s if not unicodedata.combining(c))


def parse_lessons(text=None):
    text = text if text is not None else LESSONS.read_text(encoding='utf-8')
    entries, cur = {}, None
    for line in text.split('\n'):
        m = re.match(r'^## (\d+)\. (.*)', line)
        if m:
            cur = int(m.group(1)); entries[cur] = {'n': cur, 'title': m.group(2).strip(), 'body': [line]}
        elif line.startswith('## '):
            cur = None
        elif cur is not None:
            entries[cur]['body'].append(line)
    for e in entries.values():
        e['text'] = '\n'.join(e['body']).rstrip()
        e.update(group='', kind='', craft='', short='')
    # bảng chỉ mục: | nhóm | §1 mô tả [chung] → CRAFT §1 · §2 … |
    for line in text.split('\n'):
        m = re.match(r'^\| ([^|]+?) \| (§.*) \|$', line)
        if not m: continue
        group = m.group(1).strip()
        for item in m.group(2).split(' · '):
            im = re.match(r'§(\d+) (.*?)(?: \[(MV|BH|chung)\])?(?: → (CRAFT §\w+|MEDIUM))?\s*$', item.strip())
            if not im: continue
            n = int(im.group(1))
            if n in entries and not entries[n]['group']:
                entries[n].update(group=group, short=im.group(2), kind=im.group(3) or '', craft=im.group(4) or '')
    return entries


def parse_craft():
    secs, cur = {}, None
    for line in CRAFT.read_text(encoding='utf-8').split('\n'):
        m = re.match(r'^## (\w+)\. ', line)
        if m: cur = m.group(1).lower(); secs[cur] = [line]
        elif line.startswith('## '): cur = None
        elif cur: secs[cur].append(line)
    return {k: '\n'.join(v).rstrip() for k, v in secs.items()}


def head(e):
    tag = ' '.join(x for x in (f'[{e["kind"]}]' if e['kind'] else '', f'→ {e["craft"]}' if e['craft'] else '') if x)
    return f'§{e["n"]:<4} {e["group"][:24]:<24} {tag:<20} {e["title"]}'


def search(entries, words, verbose):
    q = [fold(w) for w in words]
    hits = [e for e in entries.values() if all(w in fold(e['text']) for w in q)]
    for e in hits:
        print(head(e))
        if verbose: print(e['text'] + '\n')
        else:
            first = next((l.strip() for l in e['body'][1:] if any(w in fold(l) for w in q)), '')
            if first: print('       ' + first[:150])
    print(f'— {len(hits)} mục', file=sys.stderr)
    return hits


def check(entries):
    bad = 0
    missing = [n for n, e in entries.items() if not e['group']]
    if missing: bad += 1; print(f'✗ mục không có trong bảng chỉ mục: {missing}')
    nums = sorted(entries)
    gaps = [n for n in range(1, nums[-1] + 1) if n not in entries]
    if gaps: bad += 1; print(f'✗ số mục bị thiếu: {gaps}')
    secs = parse_craft()
    for e in entries.values():
        m = re.match(r'CRAFT §(\w+)', e['craft'])
        if m and m.group(1).lower() not in secs: bad += 1; print(f'✗ §{e["n"]} trỏ CRAFT §{m.group(1)} không tồn tại')
    # §n trong CRAFT và tài liệu bài học phải là mục có thật
    for f in [CRAFT, *sorted((ROOT / 'docs' / 'lesson').glob('*.md')), ROOT / 'AGENTS.md']:
        for i, line in enumerate(f.read_text(encoding='utf-8').split('\n'), 1):
            if f != CRAFT and 'LESSONS' not in line: continue
            for n in re.findall(r'§(\d+)', line):
                if int(n) not in entries and int(n) > 9:   # §1–§9 dễ là mục của chính file đó
                    bad += 1; print(f'✗ {f.relative_to(ROOT)}:{i} dẫn §{n} — không có trong LESSONS')
    # skill: mọi §n là LESSONS, trừ khi đứng sau tên tài liệu khác (PACKAGING §1, CRAFT §4, ENGINE.md §7)
    for f in sorted((ROOT / '.claude' / 'skills').glob('*/SKILL.md')):
        for i, line in enumerate(f.read_text(encoding='utf-8').split('\n'), 1):
            for m in re.finditer(r'§(\d+)', line):
                if re.search(r'(PACKAGING|CRAFT|ENGINE|MEDIUM|DNA|PLAYBOOK|PIPELINE|EDITING|WRITING|CHARACTER|3D|SHORTS)(\.md)?`?[^§]{0,3}$', line[:m.start()]): continue
                if int(m.group(1)) not in entries:
                    bad += 1; print(f'✗ {f.relative_to(ROOT)}:{i} dẫn §{m.group(1)} — không có trong LESSONS')
    # đường dẫn `…` trong tài liệu điều hướng phải có thật (review 2026-11-03, C1): router, MAP, CRAFT, skill, agent, kênh, docs/lesson, docs/mv
    roots = ('docs/', 'tools/', 'engine/', 'projects/', 'channels/', 'templates/', 'studio3d/', '.claude/')
    nav = [ROOT / 'AGENTS.md', ROOT / 'README.md', ROOT / 'docs' / 'MAP.md', CRAFT, ROOT / 'docs' / 'ENGINE.md',
           *(ROOT / '.claude').glob('skills/*/SKILL.md'), *(ROOT / '.claude').glob('agents/*.md'), *(ROOT / 'channels').glob('*/*.md'),
           *(ROOT / 'docs' / 'lesson').glob('*.md'), *(ROOT / 'docs' / 'mv').glob('*.md')]
    for f in sorted(set(nav)):
        if not f.exists(): continue
        for i, line in enumerate(f.read_text(encoding='utf-8').split('\n'), 1):
            for m in re.findall(r'`([^`\s]+)`', line):
                q = m.split(':')[0].rstrip('/,.')
                if not q.startswith(roots) or any(c in q for c in '<>*{}$…|') or '/.venv' in q: continue   # venv không bao giờ nằm trong git
                if not (ROOT / q).exists(): bad += 1; print(f'✗ {f.relative_to(ROOT)}:{i} trỏ `{q}` — không có')
    print('✓ kho bài học nhất quán' if not bad else f'— {bad} vấn đề')
    return bad


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0], formatter_class=argparse.RawDescriptionHelpFormatter,
                                 epilog='\n'.join(__doc__.split('\n')[2:]))
    ap.add_argument('q', nargs='*', help='từ khoá, hoặc số mục (127 / §127)')
    ap.add_argument('-v', action='store_true', help='in nguyên văn mục khớp')
    ap.add_argument('--group'); ap.add_argument('--groups', action='store_true')
    ap.add_argument('--file'); ap.add_argument('--craft'); ap.add_argument('--recent', type=int)
    ap.add_argument('--check', action='store_true')
    a = ap.parse_args(argv)
    entries = parse_lessons()
    if a.check: return 1 if check(entries) else 0
    if a.groups:
        groups = {}
        for e in entries.values(): groups.setdefault(e['group'] or '(chưa xếp)', []).append(e['n'])
        for g, ns in groups.items(): print(f'{len(ns):>3}  {g}')
        return 0
    if a.recent:
        for n in sorted(entries)[-a.recent:]: print(head(entries[n]))
        return 0
    if a.group:
        g = fold(a.group)
        for e in entries.values():
            if g in fold(e['group']): print(head(e)); a.v and print(e['text'] + '\n')
        return 0
    if a.file:
        hits = search(entries, [a.file], a.v)
        return 0 if hits else 1
    if a.craft:
        secs = parse_craft(); s = secs.get(a.craft.lower().lstrip('§'))
        if not s: print(f'không có CRAFT §{a.craft}; có: {", ".join(secs)}'); return 1
        print(s + '\n\n— các mục LESSONS được dẫn:')
        for n in sorted({int(x) for x in re.findall(r'§(\d+)', s)}):
            if n in entries: print(head(entries[n]))
        return 0
    nums = [int(x.lstrip('§')) for x in a.q if re.fullmatch(r'§?\d+', x)]
    if nums and len(nums) == len(a.q):
        for n in nums:
            print(entries[n]['text'] + '\n' if n in entries else f'không có §{n}')
        return 0
    if not a.q: ap.print_help(); return 0
    return 0 if search(entries, a.q, a.v) else 1


if __name__ == '__main__':
    sys.exit(main())
