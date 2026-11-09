#!/usr/bin/env python3
"""Dựng bản cuối một video bài học: render song song các trang → nối hình → MỘT track tiếng → SRT + chương.

    python3 tools/lesson/build.py <p>            # đọc projects/<p>/build.json
    python3 tools/lesson/build.py <p> --jobs 13

build.json (ví dụ math-30k):
  { "intro": "${HKT}/work/brand/intro.mp4", "intro_gain_db": -1.5, "lufs": -16,
    "parts": [ {"page": "part1a", "timeline": "p1a", "lead": 0.6, "tail": 1.0, "split": 1},
               {"intro": true},
               {"page": "part1b", "timeline": "p1b", "lead": 3.0, "tail": 1.6, "split": 2},
               {"page": "part2",  "timeline": "p2",  "lead": 0.8, "tail": 2.0, "split": 10} ] }
  page = projects/<p>/<page>.html · timeline = data/<timeline>.timeline.json (mốc THẬT — align.py) + audio/<timeline>.wav
  lead/tail = giây hình trước câu đầu / sau câu cuối (trang dùng cùng LEAD) · split = số đoạn render song song.
  sfx_db (tuỳ chọn) = bật tiếng hiệu ứng: trang gom cue (shoot.js cues) → tools/sfx/mix.py → trộn dưới giọng, tiếng ra
  stereo. Không có khoá này = chỉ giọng (math-30k, zero-div dựng lại y như cũ). Luật: docs/lesson/SFX.md.
  intro: đường dẫn tuyệt đối hoặc "${HKT}/…" (tools/config.py, biến MASCOT_HKT) · fps (tuỳ chọn, mặc định 60).

Luật đã trả giá (docs/lesson/LESSON-VIDEO.md):
- Trước render: `shoot.js check` chạy khô MỌI khung của trang có đoạn phải render (LESSONS §70) — lỗi thì dừng.
- Mỗi đoạn render xong ghi `<đoạn>.meta` {from, to, dur, lead, fps, src_hash}. Đoạn được GIỮ khi mp4 + meta khớp hết;
  src_hash = băm nguồn ảnh hưởng PIXEL của trang (html, kit, plates, module engine được import, mốc, ảnh/font, mục
  build.json của trang) — đổi nhạc/sfx không kéo render lại hình. --keep: chỉ cần {from, to, dur, lead} khớp (bỏ qua
  nguồn). Đoạn render từ trước khi có meta: `--migrate-meta` (một lần, không render).
- Hình nối bằng chép (cùng thông số mã hoá; intro mã hoá lại cho khớp). Tiếng dựng MỘT track: mỗi phần cắt/đệm đúng số
  khung hình của nó — nối file có sẵn tiếng làm hụt tiếng âm thầm (hkt EPISODE_FLOW §8).
- Đầu ra: out/<p>/<p>.mp4 (không phụ đề) · out/<p>/youtube/{subtitles-<lang>.srt, chapters.txt} · tạm: out/<p>/parts/.
"""
import argparse, hashlib, json, math, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'tools'))
from common import ROOT, duration                          # noqa: E402
from config import expand                                   # noqa: E402
from channel import channel_of, final_mp4, out_dir         # noqa: E402

META_KEYS = ('from', 'to', 'dur', 'lead')                  # --keep chỉ xét bộ này
ASSET = re.compile(r"""['"`]([^'"`\n]+?\.(?:png|jpe?g|webp|svg|ttf|otf|woff2?|json))['"`]""")
JSIMP = re.compile(r"""(?:from\s+|import\s*\(\s*)['"]([^'"]+\.js)['"]""")


def run(*a, **k):
    return subprocess.run(a, check=True, **k)


def ff(*a):
    run('ffmpeg', '-v', 'error', '-y', *a)


def frames(f):
    out = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries',
                          'stream=nb_read_packets', '-of', 'csv=p=0', str(f)], capture_output=True, text=True, check=True).stdout
    return int(out.strip())


def jsround(x):
    """Math.round của JS (nửa lên) — shoot.js tính khung đầu/cuối bằng nó; round() của Python làm tròn về chẵn."""
    return math.floor(x + 0.5)


def cuts_for(dur, n):
    return [0] + [round(dur * i / n, 1) for i in range(1, n)] + [dur]


def seg_frames(a, b, fps):
    return jsround(b * fps) - jsround(a * fps)


def seg_meta(pt, i, fps, src):
    return {'from': pt['cuts'][i], 'to': pt['cuts'][i + 1], 'dur': pt['dur'], 'lead': pt['lead'], 'fps': fps, 'src_hash': src}


def meta_ok(have, want, keep):
    """Đoạn dùng lại được? keep → chỉ {from,to,dur,lead}; thường → thêm fps + src_hash (None = không rõ nguồn → không)."""
    if not have: return False
    num = lambda v: isinstance(v, (int, float))
    same = lambda k: k in have and (round(have[k], 3) == round(want[k], 3) if num(want[k]) and num(have[k]) else have[k] == want[k])
    if not all(same(k) for k in META_KEYS): return False
    return keep or (same('fps') and want['src_hash'] is not None and same('src_hash'))


def src_files(P, page):
    """Tệp ảnh hưởng pixel của một trang (xấp xỉ): html → module JS (đệ quy, kể cả engine/*.js trừ engine/render/),
    cảnh trong <page>-order.js, chuỗi trỏ tới ảnh/font/json trong mọi tệp đó, ảnh nhân vật nếu trang dùng
    character-v2/cut. build.json KHÔNG tính (mục của trang được băm riêng trong src_hash)."""
    html = P / f'{page}.html'
    seen, todo, files = set(), [html], set()
    while todo:
        f = todo.pop()
        if f in seen or not f.exists(): continue
        seen.add(f); files.add(f)
        txt = f.read_text(encoding='utf-8', errors='ignore')
        deps = [f.parent / m for m in JSIMP.findall(txt)]
        if f.name.endswith('-order.js'): deps += [f.parent / f'{n}.js' for n in re.findall(r"'([\w-]+)'", txt)]
        for d in deps:
            d = d.resolve()
            if d.is_relative_to(ROOT) and not d.is_relative_to(ROOT / 'engine' / 'render'): todo.append(d)
        for a in ASSET.findall(txt):
            for base in (f.parent, html.parent):
                c = (base / a).resolve()
                if c.is_file() and c.is_relative_to(ROOT) and c.name != 'build.json': files.add(c); break
        if 'character-v2/cut' in txt: files.update((ROOT / 'assets' / 'character-v2' / 'cut').glob('*.png'))
    return sorted(files)


def src_hash(P, pt):
    h = hashlib.sha256(json.dumps({k: v for k, v in pt['entry'].items() if k != 'split'}, sort_keys=True).encode())   # mục build.json của trang
    for f in src_files(P, pt['page']):
        h.update(str(f.relative_to(ROOT)).encode() + b'\0' + hashlib.sha256(f.read_bytes()).digest())
    return h.hexdigest()[:16]


def read_meta(seg):
    m = seg.with_suffix('.meta')
    try: return json.loads(m.read_text(encoding='utf-8'))
    except (OSError, ValueError): return None


def plan_parts(P, cfg, D):
    """build.json → các phần: thời lượng (lead + câu cuối + tail), mốc cắt, tên đoạn. Không chạy ffmpeg."""
    parts = []
    for k, pt in enumerate(cfg['parts']):
        if pt.get('intro'): parts.append({'intro': True, 'name': 'intro'}); continue
        tl = json.loads((P / 'data' / f"{pt['timeline']}.timeline.json").read_text(encoding='utf-8'))
        if tl.get('estimated'): sys.exit(f"LỖI: {pt['timeline']} còn là mốc ƯỚC TÍNH — chạy tools/voice/align.py")
        dur = round(pt['lead'] + tl['lines'][-1]['end'] + pt['tail'], 3)
        n = pt.get('split', 1)
        segs = [D / f"{k}-{pt['page']}-{i + 1:02d}" for i in range(n)]
        parts.append({**pt, 'entry': pt, 'dur': dur, 'segs': segs, 'cuts': cuts_for(dur, n), 'name': pt['page'],
                      'aud': D / f"{pt['timeline']}.aud.wav"})
    return parts


def migrate_meta(P, parts, fps):
    """Một lần: đoạn mp4 render trước khi có .meta → ghi meta theo mốc cắt HIỆN TẠI của build.json, sau khi kiểm số
    khung khớp. src_hash chỉ ghi khi mp4 mới hơn mọi nguồn (luật mtime cũ); không thì None → build thường render lại,
    --keep vẫn dùng được."""
    done = skip = 0
    for pt in parts:
        if pt.get('intro'): continue
        files = src_files(P, pt['page']); newest = max(f.stat().st_mtime for f in files); h = src_hash(P, pt)
        for i, seg in enumerate(pt['segs']):
            mp4 = seg.with_suffix('.mp4')
            if not mp4.exists() or read_meta(seg): continue
            want, got = seg_frames(pt['cuts'][i], pt['cuts'][i + 1], fps), frames(mp4)
            if got != want: print(f'  ✗ {mp4.name}: {got} khung ≠ {want} theo build.json — không ghi meta'); skip += 1; continue
            m = {**seg_meta(pt, i, fps, h if mp4.stat().st_mtime >= newest else None), 'migrated': True}
            seg.with_suffix('.meta').write_text(json.dumps(m) + '\n', encoding='utf-8'); done += 1
            print(f"  ✓ {mp4.name}: {got} khung, src {'khớp' if m['src_hash'] else 'cũ hơn nguồn (chỉ --keep)'}")
    print(f'▸ migrate-meta: {done} đoạn ghi meta, {skip} bỏ qua')


def check_pages(o, parts, fps):
    """shoot.js check (chạy khô mọi khung) song song cho các trang; trả [(trang, dòng lỗi…)].
    Khúc 150 khung / lệnh CDP: máy bận (calculus 2026-10-22, test khác chạy song song) thì khúc 600 vượt hạn 300 s."""
    def one(pt):
        r = subprocess.run(['node', 'engine/render/shoot.js', 'check', '--page', f"projects/{o.project}/{pt['page']}.html",
                            '--dur', str(pt['dur']), '--fps', str(fps), '--chunk', '150'], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
        return None if r.returncode == 0 else (pt['page'], [l for l in (r.stdout + r.stderr).splitlines() if 'LỖI' in l] or [f'mã {r.returncode}'])
    with ThreadPoolExecutor(max(1, len(parts))) as ex: return [x for x in ex.map(one, parts) if x]


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('project'); ap.add_argument('--jobs', type=int, default=13); ap.add_argument('--keep', action='store_true')
    ap.add_argument('--migrate-meta', action='store_true', help='ghi .meta cho đoạn mp4 đã render trước khi có meta, rồi thoát')
    o = ap.parse_args()
    P = ROOT / 'projects' / o.project
    cfg = json.loads((P / 'build.json').read_text(encoding='utf-8'))
    D = out_dir(o.project) / 'parts'; D.mkdir(parents=True, exist_ok=True)
    intro = cfg.get('intro', channel_of(o.project).get('intro'))   # null = kênh không lồng intro (kênh Anh từ 2026-10-19)
    lufs, intro, FPS = cfg.get('lufs', -16), (expand(intro) if intro else None), cfg.get('fps', 60)
    if not intro and any(pt.get('intro') for pt in cfg['parts']): sys.exit('LỖI: build.json có phần {"intro": true} nhưng không có đường dẫn intro')
    if intro and not Path(intro).exists():  # out/ is not in git: the 3D intro is rendered per machine (docs/mv/NEW-3D.md)
        sys.exit(f'không có intro {intro} — intro 3D của kênh: cd studio3d/app && bun scripts/render.ts video --set {Path(intro).parent.name} --samples auto --shutter 0.2')
    parts = plan_parts(P, cfg, D)
    if o.migrate_meta: return migrate_meta(P, parts, FPS)
    # miệng nói: trang đọc data/<part>.mouth.json nhưng tự im khi thiếu (để chạy được với mốc tạm) → chặn ở đây.
    # dry.wav đổi (tổng hợp lại một take) mà quên chạy lại mouth_env → độ dài lệch → dừng.
    for pt in parts:
        if pt.get('intro') or 'mouth.json' not in (P / f"{pt['page']}.html").read_text(encoding='utf-8'): continue
        m, dry = P / 'data' / f"{pt['timeline']}.mouth.json", P / 'audio' / f"{pt['timeline']}.dry.wav"
        mq = json.loads(m.read_text()) if m.exists() else None   # so độ dài, không so mtime (git checkout đặt lại mtime)
        dur = duration(dry, 0) if dry.exists() else None
        if mq is None or (dur and abs(len(mq['q']) / mq['fps'] - dur) > 0.1):
            sys.exit(f"LỖI: {m.relative_to(ROOT)} thiếu hoặc không khớp độ dài lời đọc — python3 tools/voice/mouth_env.py {o.project} {pt['timeline']}")

    # 1) tiếng từng phần (lệch LEAD, đệm dài)
    for pt in parts:
        if pt.get('intro'):
            ff('-i', intro, '-vn', '-af', f"volume={cfg.get('intro_gain_db', 0)}dB,aresample=48000", '-ar', '48000', '-ac', '1', str(D / 'intro.aud.wav'))
            continue
        ff('-i', str(P / 'audio' / f"{pt['timeline']}.wav"), '-af',
           f"adelay={round(pt['lead'] * 1000)}:all=1,loudnorm=I={lufs}:TP=-1.5:LRA=11,aresample=48000,apad=whole_dur={pt['dur']}",
           '-t', str(pt['dur']), '-ar', '48000', '-ac', '1', str(pt['aud']))
        print(f"▸ {pt['page']}: {pt['dur']}s, {len(pt['segs'])} đoạn")

    # 2) render song song — đoạn GIỮ khi mp4 + .meta khớp (xem đầu file). Trước đó chạy khô các trang có đoạn phải render.
    for pt in parts:
        if not pt.get('intro'): pt['src'] = src_hash(P, pt)
    jobs = [(pt, i) for pt in parts if not pt.get('intro') for i in range(len(pt['segs']))]
    stale = [(pt, i) for pt, i in jobs if not (pt['segs'][i].with_suffix('.mp4').exists()
                                                and meta_ok(read_meta(pt['segs'][i]), seg_meta(pt, i, FPS, pt['src']), o.keep))]
    print(f"▸ đoạn giữ lại: {len(jobs) - len(stale)}/{len(jobs)}")
    if stale:
        pages = list({id(pt): pt for pt, _ in stale}.values())
        print('▸ chạy khô: ' + ', '.join(pt['page'] for pt in pages))
        bad = check_pages(o, pages, FPS)
        if bad: sys.exit('LỖI: shoot.js check thất bại — sửa trước khi render:\n' + '\n'.join(f'  {pg}: {l}' for pg, ls in bad for l in ls))

    def render(job):
        pt, i = job; out = pt['segs'][i]
        log, mp4, meta = out.with_suffix('.log'), out.with_suffix('.mp4'), out.with_suffix('.meta')
        meta.unlink(missing_ok=True)
        with open(log, 'w', encoding='utf-8') as lf:
            r = subprocess.run(['node', 'engine/render/shoot.js', 'video', '--page', f"projects/{o.project}/{pt['page']}.html",
                                '--dur', str(pt['dur']), '--from', str(pt['cuts'][i]), '--to', str(pt['cuts'][i + 1]), '--fps', str(FPS),
                                '--audio', str(pt['aud']), '--out', str(mp4)], cwd=ROOT, stdout=lf, stderr=subprocess.STDOUT)
        if r.returncode != 0: return False
        meta.write_text(json.dumps(seg_meta(pt, i, FPS, pt['src'])) + '\n', encoding='utf-8')
        return True
    with ThreadPoolExecutor(o.jobs) as ex: ok = list(ex.map(render, stale))
    print(f"▸ đoạn render: {sum(ok)}/{len(ok)}")
    if not all(ok): sys.exit('LỖI: có đoạn render hỏng — xem out/<p>/parts/*.log')

    # 2b) tiếng hiệu ứng: cue của trang → track sfx → trộn với giọng (stereo). Luôn gom lại (rẻ) — sửa sfx() không cần render lại hình.
    sfx_db = cfg.get('sfx_db')
    for pt in parts:
        if pt.get('intro'): continue
        pt['mix'] = pt['aud']
        if sfx_db is None: continue
        cues, sfx, mixed = (D / f"{pt['timeline']}.{x}" for x in ('cues.json', 'sfx.wav', 'mix.wav'))
        run('node', 'engine/render/shoot.js', 'cues', '--page', f"projects/{o.project}/{pt['page']}.html", '--out', str(cues),
            cwd=ROOT, stdout=subprocess.DEVNULL)
        mat = P / 'assets' / 'sfx'                     # bộ tiếng chất liệu của bài (tools/sfx/material.py) — đè thư viện chung theo loại
        run(sys.executable, str(ROOT / 'tools' / 'sfx' / 'mix.py'), str(cues), str(pt['dur']), str(sfx), '--db', str(sfx_db),
            *(['--lib', str(mat)] if (mat / 'library.json').exists() else []), cwd=ROOT)
        ff('-i', str(pt['aud']), '-i', str(sfx), '-filter_complex',
           '[0]aformat=channel_layouts=stereo[v];[v][1]amix=inputs=2:normalize=0:duration=first', '-ar', '48000', str(mixed))
        pt['mix'] = mixed

    # 2c) nhạc nền (build.json "music": {file, lufs, loop:[a,b], xfade}) — một dải nhạc chạy liền qua các phần, NGHỈ lúc
    #     intro (intro có nhạc riêng). Lặp đoạn [a,b] nối chéo xfade s (file gốc cắt ngang ở cuối). Mức: chuẩn hoá cả dải
    #     về `lufs` (mặc định −35 — video mẫu: nhạc ≈ −35, giọng −16 → thấp hơn ~19 LU, không át lời/tiếng hiệu ứng).
    #     Vào dần 2.5 s / ra dần 2.0 s ở hai đầu video và sát intro (khớp màn đêm/bình minh quanh intro); không intro → liền.
    mus = cfg.get('music')
    if mus:
        src = P / mus['file']; a, b = mus.get('loop', [0, None]); xf = mus.get('xfade', 2.0)
        if b is None: b = duration(src)
        if b - a - xf <= 1: sys.exit(f"LỖI: music.loop {[a, b]} ngắn hơn xfade {xf}+1 s")
        need = sum(pt['dur'] for pt in parts if not pt.get('intro')) + 5
        n = max(0, math.ceil((need - b) / (b - a - xf)))
        fc = f"[0]atrim=0:{b},asetpts=N/SR/TB[m0];" + ''.join(f"[0]atrim={a}:{b},asetpts=N/SR/TB[r{i}];" for i in range(n))
        cur = 'm0'
        for i in range(n): fc += f"[{cur}][r{i}]acrossfade=d={xf}:c1=tri:c2=tri[x{i}];"; cur = f'x{i}'
        raw = D / 'music.raw.wav'
        ff('-i', str(src), '-filter_complex', fc.rstrip(';') + (f";[{cur}]anull[out]" if n else ";[m0]anull[out]"),
           '-map', '[out]', '-ar', '48000', '-ac', '2', str(raw))
        meas = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(raw), '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
        I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', meas)[-1]); gain = mus.get('lufs', -35) - I
        off = 0.0
        for j, pt in enumerate(parts):
            if pt.get('intro'): continue
            d = pt['dur']; bed, out = D / f"{pt['timeline']}.music.wav", D / f"{pt['timeline']}.mixm.wav"
            # vào/ra dần chỉ ở hai đầu video và sát intro — không có intro thì nhạc chạy liền qua mối nối p1 → p2
            fin = j == 0 or parts[j - 1].get('intro'); fout = j == len(parts) - 1 or parts[j + 1].get('intro')
            fades = (',afade=t=in:d=2.5' if fin else '') + (f',afade=t=out:st={max(0, d - 2.0):.3f}:d=2.0' if fout else '')
            ff('-ss', str(off), '-t', str(d), '-i', str(raw), '-af', f"volume={gain:.2f}dB{fades}", '-ar', '48000', str(bed))
            ff('-i', str(pt['mix']), '-i', str(bed), '-filter_complex',
               '[0]aformat=channel_layouts=stereo[v];[v][1]amix=inputs=2:normalize=0:duration=first', '-ar', '48000', str(out))
            pt['mix'] = out; off += d
        print(f"▸ nhạc nền: {src.name} ×{n + 1} vòng, {I:.1f} → {mus.get('lufs', -35)} LUFS ({gain:+.1f} dB)")

    # 3) intro: mã hoá lại phần hình cho cùng thông số (nối bằng chép); intro gốc mới hơn bản mã hoá → làm lại
    iv = D / 'intro.mp4'
    if intro and (not iv.exists() or iv.stat().st_mtime < Path(intro).stat().st_mtime):
        ff('-i', intro, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p',
           '-vf', 'scale=out_color_matrix=bt709', '-r', str(FPS), str(iv))

    # 4) hình: chép nối · tiếng: mỗi phần đúng bằng số khung của nó
    files, secs = [], []
    for pt in parts:
        fs = [iv] if pt.get('intro') else [s.with_suffix('.mp4') for s in pt['segs']]
        files += fs; secs.append(sum(frames(f) for f in fs) / FPS)
    (D / 'list.txt').write_text(''.join(f"file '{f.name}'\n" for f in files), encoding='utf-8')
    ff('-f', 'concat', '-safe', '0', '-i', str(D / 'list.txt'), '-map', '0:v', '-c', 'copy', str(D / 'video.mp4'))
    ins, chains = [], []
    for j, pt in enumerate(parts):
        ins += ['-i', str(D / 'intro.aud.wav' if pt.get('intro') else pt['mix'])]
        # có sfx → tiếng stereo. KHÔNG bù gì: ffmpeg đổi mono→stereo đã hạ −3 dB mỗi kênh, LUFS giữ nguyên (đã đo:
        # bù thêm −3 dB thì bản thử ra −19.4 thay vì −16)
        st = '' if sfx_db is None and not mus else 'aformat=channel_layouts=stereo,'
        chains.append(f"[{j}]{st}apad,atrim=0:{secs[j]}[a{j}]")
    fc = ';'.join(chains) + ';' + ''.join(f'[a{j}]' for j in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1[o]'
    ff(*ins, '-filter_complex', fc, '-map', '[o]', '-ar', '48000', str(D / 'audio.wav'))
    final = final_mp4(o.project)
    ff('-i', str(D / 'video.mp4'), '-i', str(D / 'audio.wav'), '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac',
       '-b:a', '192k', '-movflags', '+faststart', str(final))

    # 5) độ lệch thật của từng phần → phụ đề + chương
    segs, t = [], 0.0
    for pt, s in zip(parts, secs):
        segs.append({'gap': 'INTRO', 'start': round(t, 3), 'dur': round(s, 3)} if pt.get('intro')
                    else {'timeline': pt['timeline'], 'offset': round(t + pt['lead'], 3)})
        t += s
    (P / 'data' / 'segments.json').write_text(json.dumps(segs, indent=1), encoding='utf-8')
    run(sys.executable, str(ROOT / 'tools' / 'voice' / 'publish.py'), o.project, cwd=ROOT)
    print(f'✓ {final.relative_to(ROOT)} ({t:.1f}s) · {(out_dir(o.project) / "youtube").relative_to(ROOT)}/')
    subprocess.call([sys.executable, str(ROOT / 'tools' / 'lesson' / 'pack_check.py'), o.project], cwd=ROOT)  # chỉ cảnh báo


if __name__ == '__main__':
    main()
