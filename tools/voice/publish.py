#!/usr/bin/env python3
"""Phụ đề SRT + chương YouTube cho video bài học, từ mốc từng từ của từng phần.

    python3 tools/voice/publish.py <p>      # đọc projects/<p>/data/segments.json, ghi out/<p>/youtube/subtitles-en.srt + chapters.txt

segments.json (build ghi ra từ thời lượng THẬT của từng đoạn đã render):
  [{"timeline": "p1a", "offset": 0.6}, {"gap": "INTRO", "start": 58.5, "dur": 25.984},
   {"timeline": "p1b", "offset": 87.5}, {"timeline": "p2", "offset": 187.9}]
offset = giây trong video ứng với t = 0 của timeline phần đó (= đầu đoạn + LEAD của trang).

Phụ đề: chữ của SCRIPT (đã căn mốc), số đọc-bằng-chữ đổi lại thành chữ số (projects/<p>/spoken.json + bảng chung, xem load_spoken); cue ≤ 2 dòng × 42 ký tự,
chia theo mốc TỪ (không chia đều), tối thiểu 1.0 s. Chương: đầu mỗi mục (0:00 đầu tiên), ≥ 10 s mỗi chương.
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, re, sys
from functools import lru_cache
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from channel import channel_of, final_mp4, out_dir  # noqa: E402
from common import ROOT, duration  # noqa: E402

# Bảng số đọc-bằng-chữ → cách viết: RIÊNG từng bài ở projects/<p>/spoken.json ([[đọc, viết], …]) + bảng chung
# projects/_shared/spoken.json (chỉ mục thật sự dùng chung, vd tên kênh). Thêm số cho bài mới KHÔNG đổi SRT bài cũ.
# Thứ tự áp: cụm đọc DÀI trước (rồi theo thứ tự trong file) — tự động, khỏi xếp tay; 'five thousand' không còn ăn
# mất 'five thousand and sixty-seven'. Mỗi cụm chỉ khớp trọn từ: không dính chữ/số hay '-chữ' hai bên
# ('eighteen thirty' không cắn vào 'eighteen thirty-three'). Áp lần lượt: cụm sau thấy kết quả của cụm trước.
SHARED_SPOKEN = ROOT / 'projects' / '_shared' / 'spoken.json'


def load_spoken(p):
    """Bảng (đọc, viết) của bài p + bảng chung, đã xếp cụm dài trước."""
    rows = []
    for f in (SHARED_SPOKEN, ROOT / 'projects' / p / 'spoken.json'):
        if f.exists():
            rows += [tuple(r) for r in json.loads(f.read_text(encoding='utf-8'))]
    rows = list(dict.fromkeys(rows))                       # bỏ trùng, giữ thứ tự
    keys = [a.lower() for a, _ in rows]
    clash = {a for a in keys if keys.count(a) > 1}
    if clash: sys.exit(f'LỖI spoken.json ({p}): một cụm đọc hai cách viết: {sorted(clash)}')
    return sorted(rows, key=lambda r: -len(r[0]))           # sort ổn định: cùng độ dài giữ thứ tự file


@lru_cache(maxsize=None)
def _compiled(table):
    return [(re.compile(r'(?<![\w-])' + re.escape(a) + r'(?!\w|-\w)', re.I), b) for a, b in table]


def _keep_case(m, b):
    """Cách viết bắt đầu bằng chính chữ đầu của cụm đọc ('about one hundred…' → 'about 100…') theo hoa/thường của lời:
    đầu câu 'About one hundred of them' → 'About 100 of them'."""
    t = m.group(0)
    if b[:2].isupper():                                    # viết tắt toàn hoa (SOH-CAH-TOA) giữ nguyên
        return b
    if b[:1].isalpha() and b[0].lower() == t[0].lower():
        return t[0] + b[1:]
    return b


def written(s, table):
    """Đổi số đọc-bằng-chữ trong s thành chữ số theo bảng (từ load_spoken)."""
    for rx, b in _compiled(tuple(table)):
        s = rx.sub(lambda m, b=b: _keep_case(m, b), s)
    return s


def ts(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'


def wrap(text, width=42):
    words, lines, cur = text.split(), [], ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > width: lines.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    lines.append(cur); return lines


def cues_of(line, off, table):
    """Một câu → các cue ≤ 84 ký tự, cắt ở dấu câu gần nhất, mốc theo từ."""
    toks = line['text'].split(); ws = line['words']
    # gán mỗi token chữ một mốc từ (token có thể dính dấu câu); token không có chữ (—) dùng mốc từ trước
    times, wi = [], 0
    for tk in toks:
        if re.search(r'[A-Za-z0-9]', tk) and wi < len(ws): times.append((ws[wi]['start'], ws[wi]['end'])); wi += 1
        else: times.append(times[-1] if times else (line['start'], line['start']))
    out, i = [], 0
    while i < len(toks):
        j, best = i, None
        while j < len(toks) and len(written(' '.join(toks[i:j + 1]), table)) <= 84:
            if re.search(r'[,.;:?!]$', toks[j]): best = j
            j += 1
        if j >= len(toks): best = len(toks) - 1
        elif best is None or best < i + 2:
            # không có dấu câu hợp lý: chia phần còn lại thành các mẩu dài gần bằng nhau (không để đuôi lửng)
            rest = len(written(' '.join(toks[i:]), table))
            target = rest / -(-rest // 84)
            acc, best = 0, i
            for q in range(i, len(toks)):
                acc += len(toks[q]) + 1
                if acc >= target: best = q; break
        out.append((times[i][0] + off, times[best][1] + off, written(' '.join(toks[i:best + 1]), table)))
        i = best + 1
    return out


# ── tiếng Nhật: không có dấu cách — cắt theo TỪ của timeline (ja.words), ≤ 2 dòng × 18 ký tự (cỡ phụ đề Nhật
# thường gặp ~16–20 ký tự/dòng), ưu tiên cắt sau 、。？！; bỏ 。、 ở cuối cue. Chữ HIỆN (chú âm {hiện|đọc} đã bỏ). ──
JA_LINE, JA_CUE, JA_PUNCT = 18, 36, '、。？！?!'
_JA_GAP = '、。？！?!「」『』（）・ 　'


def _ja_pieces(line):
    """Câu → [(mảnh chữ hiện kể cả dấu câu theo sau, start, end)] — mỗi từ một mảnh, mốc của từ."""
    text, low, ws = line['text'], line['text'].lower(), line['words']
    spans, cur = [], 0
    for w in ws:
        k, n = low.find(w['w'], cur), len(w['w'])
        if k < 0:   # mốc cũ (trước khi ja.words thôi gộp qua dấu câu): 「でした。でも」 → 「でしたで」 — cho dấu câu chen giữa
            m = re.compile(f'[{re.escape(_JA_GAP)}]*'.join(map(re.escape, w['w']))).search(low, cur)
            if not m: sys.exit(f"LỖI publish ja: không thấy từ 「{w['w']}」 trong 「{text}」")
            k, n = m.start(), m.end() - m.start()
        spans.append(k); cur = k + n
    spans.append(len(text))
    lead = text[:spans[0]]
    return [((lead if i == 0 else '') + text[spans[i]:spans[i + 1]], w['start'], w['end']) for i, w in enumerate(ws)]


def _ja_clean(s):
    return s.strip().rstrip('、。').strip()


def wrap_ja(pieces):
    """Mảnh của một cue → 1–2 dòng: cắt ở ranh giới từ gần giữa nhất (ưu tiên sau 、)."""
    full = ''.join(pieces)
    if len(_ja_clean(full)) <= JA_LINE: return [_ja_clean(full)]
    # chỗ cắt: hai dòng đều ≤ JA_LINE thì ưu tiên ngay sau 、, rồi mới tới cân đôi
    best, acc = None, 0
    for i in range(1, len(pieces)):
        acc += len(pieces[i - 1])
        fits = max(len(_ja_clean(''.join(pieces[:i]))), len(_ja_clean(''.join(pieces[i:])))) <= JA_LINE
        score = (not fits, pieces[i - 1].rstrip()[-1:] not in JA_PUNCT, abs(acc - len(full) / 2))
        if best is None or score < best[0]: best = (score, i)
    i = best[1]
    return [_ja_clean(''.join(pieces[:i])), _ja_clean(''.join(pieces[i:]))]


def cues_ja(line, off):
    P_ = _ja_pieces(line); out, i = [], 0
    while i < len(P_):
        j, best, n = i, None, 0
        while j < len(P_) and n + len(P_[j][0]) <= JA_CUE:
            n += len(P_[j][0])
            if P_[j][0].rstrip()[-1:] in JA_PUNCT: best = j
            j += 1
        if j == i: j = i + 1                          # một từ dài hơn cả cue
        if j >= len(P_): best = len(P_) - 1
        elif best is None or best < i + 2: best = j - 1
        out.append((P_[i][1] + off, P_[best][2] + off, [x[0] for x in P_[i:best + 1]]))
        i = best + 1
    return out


def lang_of(P):
    """Ngôn ngữ lời đọc: build.json "voice" của bài nếu có, không thì của KÊNH (channels/<kênh>/channel.json)."""
    f = P / 'build.json'
    v = json.loads(f.read_text(encoding='utf-8')).get('voice', {}) if f.exists() else {}
    return v.get('lang') or channel_of(P.relative_to(ROOT / 'projects').as_posix())['lang']


def main():
    p = sys.argv[1]
    P = ROOT / 'projects' / p
    lang = lang_of(P)
    table = load_spoken(p)
    segs = json.loads((P / 'data' / 'segments.json').read_text(encoding='utf-8'))
    cues, chapters = [], []
    for sg in segs:
        if 'gap' in sg:
            continue
        tl = json.loads((P / 'data' / f"{sg['timeline']}.timeline.json").read_text(encoding='utf-8'))
        if tl.get('estimated'): sys.exit(f"LỖI: {sg['timeline']} còn là mốc ƯỚC TÍNH — chạy tools/voice/align.py trước")
        for l in tl['lines']: cues += cues_ja(l, sg['offset']) if lang == 'ja' else cues_of(l, sg['offset'], table)
        for s in tl['sections']:
            name = ('はじめに' if lang == 'ja' else 'Introduction') if s['name'] == 'Cold open' else s['name']
            chapters.append((s['start'] + sg['offset'], name))
    cues.sort()
    for k in range(len(cues)):                  # tối thiểu 1.0 s, không chồng cue sau
        a, b, s = cues[k]; nxt = cues[k + 1][0] if k + 1 < len(cues) else b + 2
        cues[k] = (a, min(max(b, a + 1.0), nxt - 0.02), s)
    srt = '\n'.join(f"{n}\n{ts(a)} --> {ts(b)}\n" + '\n'.join(wrap_ja(s) if lang == 'ja' else wrap(s)) + '\n' for n, (a, b, s) in enumerate(cues, 1))
    # thư mục RIÊNG, tên KHÁC video: trình phát (VLC, mpv…) tự bật <tên video>.srt nằm cạnh video như phụ đề cứng —
    # người dùng xem bản cuối tưởng phụ đề bị lồng vào hình (math-30k, 2026-10-05). SRT chỉ để tải lên YouTube.
    out = out_dir(p) / 'youtube'; out.mkdir(parents=True, exist_ok=True)
    (out / f'subtitles-{lang}.srt').write_text(srt, encoding='utf-8')
    chapters[0] = (0.0, chapters[0][1])
    keep = [c for k, c in enumerate(chapters) if k == 0 or c[0] - chapters[k - 1][0] >= 10]
    mp4 = final_mp4(p)           # hết video: đo bản cuối nếu đã có, không thì ước (đuôi trang ≈ 2 s)
    end = duration(mp4, 0) if mp4.exists() else cues[-1][1] + 2.0
    # chương CUỐI cũng phải ≥ 10 s, nếu không
    while len(keep) > 1 and end - keep[-1][0] < 10:   # YouTube tắt cả danh sách chương (zero-div: Outro chỉ 6 s)
        keep.pop()
    fmt = lambda x: f'{int(x // 3600)}:{int(x % 3600 // 60):02d}:{int(x % 60):02d}' if x >= 3600 else f'{int(x // 60)}:{int(x % 60):02d}'
    (out / 'chapters.txt').write_text('\n'.join(f'{fmt(x)} {n}' for x, n in keep) + '\n', encoding='utf-8')
    print(f'✓ {len(cues)} cue → {out.relative_to(ROOT)}/subtitles-{lang}.srt · {len(keep)} chương → {out.relative_to(ROOT)}/chapters.txt')
    if lang == 'en':                            # số còn đọc-bằng-chữ → thiếu dòng spoken.json (trig, LESSONS §128)
        left = sorted({m.group(0).lower() for m in re.finditer(
            r'\b(zero point( \w+)+|(one|two|three|four|five|six|seven|eight|nine) (hundred|thousand)( and)?( \w+)?)\b', srt, re.I)})
        if left: print(f'⚠ SRT còn số viết bằng chữ ({len(left)}): {left[:8]} — thêm vào projects/{p}/spoken.json nếu không cố ý')


if __name__ == '__main__':
    main()
