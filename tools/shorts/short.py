#!/usr/bin/env python3
"""YouTube Shorts dọc 1080×1920 cắt từ video bài học đã render (hình + tiếng của bản cuối, không render lại cảnh).

    python3 tools/shorts/short.py <p> [tên…]     # đọc projects/<p>/shorts.json, ghi out/<p>/shorts/<tên>.mp4 (+ .jpg bìa)

shorts.json: {"cta": "…", "shorts": [{"name", "hook": ["DÒNG 1", "DÒNG {2}"], "pieces": [...]}]}
  piece = {"from": "p2:58", "to": "p2:62"}     dải câu (gồm hai đầu) của timeline p2 — tiếng VÀ hình lấy cùng chỗ
          "video": 9.0                          (tuỳ) lấy hình từ giây này của video cuối thay vì cùng chỗ với tiếng
          "crop": [w, x0, x1, y]                (tuỳ) cửa sổ w × (w·8/9) của khung gốc, trượt mép trái x0 → x1, mép trên y
                                                (mặc định 1215, 352, 352, 0 = cả chiều cao; w nhỏ hơn = phóng to;
                                                w > 1215 = bố cục rộng, hiện thấp hơn khung, giữa vùng hình)
          "tail": 0.4                           (tuỳ) giữ thêm sau câu cuối (giây; âm = cắt sớm khi cảnh sau/thẻ hồi chen vào)
  {chữ} trong hook = tô màu nhấn.

Quy trình đầy đủ: docs/lesson/SHORTS.md.
Bố cục (vùng an toàn Shorts: đáy ~420 px và mép phải ~140 px bị nút/tiêu đề che):
  hook y 150–420 · khung hình 1080×960 ở y 440–1400 · phụ đề y ~1460 · 2.5 s cuối: hình đứng ở khung cuối, nhạc tắt
  dần, hiện thẻ CTA (không lấn sang câu/cảnh sau của video gốc).
Phụ đề: chữ của SCRIPT căn mốc từng từ, số đọc bằng chữ đổi lại thành số (publish.written, bảng projects/<p>/spoken.json), cụm ≤ 3 từ, từ đang đọc tô vàng.
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, re, subprocess, sys, tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT  # noqa: E402
sys.path.insert(0, str(ROOT / 'tools/voice'))
from publish import load_spoken, written  # noqa: E402
from channel import final_mp4, out_dir  # noqa: E402

W, H = 1080, 1920
VID_Y, VID_H, CAP_Y = 440, 960, 1470   # đỉnh + cao khung hình; tâm dòng phụ đề
PAD_IN, PAD_OUT = 0.12, 0.30      # lấy trước câu đầu / sau câu cuối của mỗi mẩu
CTA_DUR = 2.5
HOOK_MAX = 21                     # ký tự mỗi dòng hook; 22–23 đã chạm hoặc tràn mép (en/imaginary, §254)
ACCENT = '&H004EC1F2&'            # vàng #F2C14E (ASS = &HAABBGGRR)
FONTS = ROOT / 'assets/fonts'


def load_lines(p):
    """{'p2:58': line} với mốc đã cộng offset của phần → giây trong video cuối."""
    out = {}
    for s in json.loads((ROOT / f'projects/{p}/data/segments.json').read_text(encoding='utf-8')):
        if 'timeline' not in s: continue
        tl = json.loads((ROOT / f"projects/{p}/data/{s['timeline']}.timeline.json").read_text(encoding='utf-8'))
        for i, l in enumerate(tl['lines']):
            out[f"{s['timeline']}:{i}"] = dict(l, off=s['offset'])
    return out


def words_of(line, table):
    """Token của câu (chữ SCRIPT) + mốc từng token, cụm số đọc bằng chữ gộp thành một token đã viết lại."""
    toks, ws, off = line['text'].split(), line['words'], line['off']
    times, wi = [], 0
    for tk in toks:
        if re.search(r'[A-Za-z0-9]', tk) and wi < len(ws): times.append((ws[wi]['start'] + off, ws[wi]['end'] + off)); wi += 1
        else: times.append(times[-1] if times else (line['start'] + off,) * 2)
    out, i = [], 0
    while i < len(toks):
        for a, _ in table:                       # cụm số dài nhất bắt đầu ở token i (bảng đã xếp dài trước)
            n = len(a.split())
            if re.fullmatch(re.escape(a) + r'\W*', ' '.join(toks[i:i + n]), flags=re.I): break
        else: n = 1
        out.append((written(' '.join(toks[i:i + n]), table), times[i][0], times[i + n - 1][1])); i += n
    return out


def chunks(words, size=3):
    """Cụm ≤ size từ, ngắt sớm sau dấu câu."""
    out, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) == size or re.search(r'[,.;:?!]$', w[0]): out.append(cur); cur = []
    if cur: out.append(cur)
    return out


def ass_time(x):
    cs = int(round(max(x, 0) * 100)); h, cs = divmod(cs, 360000); m, cs = divmod(cs, 6000); s, cs = divmod(cs, 100)
    return f'{h}:{m:02d}:{s:02d}.{cs:02d}'


def esc(s): return s.replace('{', '(').replace('}', ')')


def build_ass(spec, cta, caps, dur):
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Hook,Archivo,84,&H00FFFFFF,&H00FFFFFF,&H00101010,&H00000000,1,0,0,0,100,100,0,0,1,5,0,8,60,60,0,1
Style: Cap,Archivo,74,&H00FFFFFF,&H00FFFFFF,&H00101010,&H00000000,1,0,0,0,100,100,0,0,1,6,0,5,130,130,0,1
Style: Brand,IBM Plex Mono,34,&H00E8E8E8,&H00FFFFFF,&H00101010,&H00000000,0,0,0,0,100,100,3,0,1,3,0,8,60,60,0,1
Style: Cta,Archivo,78,&H00FFFFFF,&H00FFFFFF,&H00101010,&HC8101010,1,0,0,0,100,100,0,0,3,26,0,5,90,90,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []
    for l in spec['hook']:
        if len(re.sub(r'[{}]', '', l)) > HOOK_MAX: print(f'  !! hook dài, dễ chạm mép khung: "{l}"')
    hook = r'\N'.join(re.sub(r'\{(.+?)\}', lambda m: '{\\c' + ACCENT + '}' + m.group(1) + r'{\c&H00FFFFFF&}', l)
                      for l in spec['hook'])
    ev.append(f'Dialogue: 1,{ass_time(0)},{ass_time(dur - CTA_DUR)},Hook,,0,0,0,,{{\\pos({W // 2},150)\\fad(0,200)}}{hook}')
    ev.append(f'Dialogue: 1,{ass_time(0)},{ass_time(dur)},Brand,,0,0,0,,{{\\pos({W // 2},80)}}99% FROM SCRATCH')
    cap = []                                     # (vào, ra, chữ): một sự kiện cho mỗi từ đang đọc
    for grp in caps:
        for k, (txt, a, b) in enumerate(grp):
            body = ' '.join(('{\\c' + ACCENT + '}' + esc(t) + r'{\c&H00FFFFFF&}') if j == k else esc(t)
                            for j, (t, _, _) in enumerate(grp))
            cap.append([a, b + 0.25, body])
    cap.sort(key=lambda e: e[0])
    for i, (a, b, body) in enumerate(cap):       # mỗi sự kiện tắt đúng lúc sự kiện sau hiện: không bao giờ hai cụm chồng nhau
        end = min(b, cap[i + 1][0]) if i + 1 < len(cap) else b
        if i + 1 < len(cap) and cap[i + 1][0] - b < 0.35: end = cap[i + 1][0]   # khe ngắn → giữ chữ, khỏi nháy trống
        cap[i][1] = end
        ev.append(f'Dialogue: 2,{ass_time(a)},{ass_time(min(end, dur - CTA_DUR))},Cap,,0,0,0,,{{\\pos({W // 2},{CAP_Y})}}{body}')
    over = [(a, b2) for (_, b, _), (a, b2, _) in zip(cap, cap[1:]) if b > a + 1e-6]
    if over: raise SystemExit(f'phụ đề chồng nhau ở {over[:3]}')   # luật docs/lesson/SHORTS.md §4
    ev.append(f'Dialogue: 3,{ass_time(dur - CTA_DUR)},{ass_time(dur)},Cta,,0,0,0,,{{\\pos({W // 2},{VID_Y + VID_H // 2})\\fad(250,0)}}{cta}')
    return head + '\n'.join(ev) + '\n'


def make(p, spec, cta, lines, src, outdir):
    pieces, caps, t0 = [], [], 0.0
    table = load_spoken(p)
    for k, pc in enumerate(spec['pieces']):
        tl, a = pc['from'].split(':'); b = int(pc['to'].split(':')[1])
        ls = [lines[f'{tl}:{i}'] for i in range(int(a), b + 1)]
        start = ls[0]['start'] + ls[0]['off'] - PAD_IN
        end = ls[-1]['end'] + ls[-1]['off'] + PAD_OUT + pc.get('tail', 0)
        d = end - start
        for l in ls:
            caps += [[(t, x - start + t0, y - start + t0) for t, x, y in g] for g in chunks(words_of(l, table))]
        crop = pc.get('crop', [1215, 352, 352, 0]); crop = crop + [0] * (4 - len(crop))
        pieces.append(dict(a=start, v=pc.get('video', start), d=d, crop=crop))
        t0 += d
    pad = CTA_DUR; t0 += pad
    work = Path(tempfile.mkdtemp(prefix=f'short-{spec["name"]}-'))
    ass = work / 'cap.ass'; ass.write_text(build_ass(spec, cta, caps, t0), encoding='utf-8')

    args, fc = ['ffmpeg', '-v', 'error', '-y'], []
    for k, pc in enumerate(pieces):
        args += ['-ss', f"{pc['v']:.3f}", '-t', f"{pc['d']:.3f}", '-i', str(src)]
    for k, pc in enumerate(pieces):
        args += ['-ss', f"{pc['a']:.3f}", '-t', f"{pc['d']:.3f}", '-i', str(src)]
    n = len(pieces)
    for k, pc in enumerate(pieces):
        cw, x0, x1, cy = pc['crop']
        ch = min(round(cw * VID_H / W), 1080 - cy)               # cửa sổ rộng (bố cục hai cột) → thấp hơn khung, đặt giữa
        sh = round(ch * W / cw / 2) * 2
        last = k == n - 1
        ease = f"(0.5-0.5*cos(PI*min(t/{pc['d']:.3f},1)))"
        fc.append(f'[{k}:v]fps=60' + (f',tpad=stop_mode=clone:stop_duration={pad}' if last else '') + f',split[s{k}][f{k}]')
        fc.append(f'[s{k}]scale=-2:{H},crop={W}:{H},boxblur=40:2,eq=brightness=-0.32:saturation=0.8[b{k}]')
        fc.append(f"[f{k}]crop={cw}:{ch}:'{x0}+({x1}-{x0})*{ease}':{cy},scale={W}:{sh}[c{k}]")
        fc.append(f'[b{k}][c{k}]overlay=0:{VID_Y + (VID_H - sh) // 2},setsar=1[v{k}]')
        fc.append(f'[{n + k}:a]aformat=sample_rates=48000:channel_layouts=stereo,'
                  f"afade=t=in:d=0.04,afade=t=out:st={pc['d'] - 0.06:.3f}:d=0.06" + (f',apad=pad_dur={pad}' if last else '') + f'[a{k}]')
    fc.append(''.join(f'[v{k}][a{k}]' for k in range(n)) + f'concat=n={n}:v=1:a=1[vc][ac]')
    fc.append(f"[vc]ass={ass}:fontsdir={FONTS}[vo]")
    fc.append(f"[ac]afade=t=out:st={t0 - pad - 0.5:.3f}:d=0.5[ao]")
    out = outdir / f"{spec['name']}.mp4"
    args += ['-filter_complex', ';'.join(fc), '-map', '[vo]', '-map', '[ao]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
             '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
             '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(out)]
    subprocess.run(args, check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '1.0', '-i', str(out), '-frames:v', '1',
                    str(outdir / f"{spec['name']}.jpg")], check=True)
    return out, t0


def main():
    p, only = sys.argv[1], set(sys.argv[2:])
    cfg = json.loads((ROOT / f'projects/{p}/shorts.json').read_text(encoding='utf-8'))
    lines, src = load_lines(p), final_mp4(p)
    outdir = out_dir(p) / 'shorts'; outdir.mkdir(parents=True, exist_ok=True)
    for spec in cfg['shorts']:
        if only and spec['name'] not in only: continue
        out, d = make(p, spec, cfg['cta'], lines, src, outdir)
        print(f'{out.relative_to(ROOT)}  {d:5.1f} s')


if __name__ == '__main__':
    main()
