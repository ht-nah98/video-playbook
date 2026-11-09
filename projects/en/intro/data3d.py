#!/usr/bin/env python3
"""Dữ liệu 3D của `intro` (studio3d ?set=intro, scene3d.ts): nhạc intro-99, lời, mascot voxel, chữ voxel.

    python3 projects/en/intro/data3d.py        # từ gốc repo mascot-mv; cần MASCOT_HKT (tools/config.py)

Ra projects/en/intro/data3d/: audio.json, lyrics.json, mix.m4a (nhạc), mascot-<pose>.json, text-<tên>.json.
Voxel: mỗi ô lưới = một cột khối; màu = trung bình điểm ảnh đục (sRGB); độ dày theo khoảng cách tới viền (thân tròn).
"""
import json, shutil, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import distance_transform_edt

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tools'))
from config import HKT  # noqa: E402

OUT = ROOT / 'projects/en/intro/data3d'
BRAND = HKT / 'assets/brand'


def music():
    grid = json.loads((BRAND / 'intro-99-grid.json').read_text())
    lyr = json.loads((BRAND / 'intro-99-lyrics.json').read_text())
    shutil.copy(BRAND / 'intro-99.m4a', OUT / 'mix.m4a')
    pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(BRAND / 'intro-99.m4a'), '-ac', '1', '-ar', '48000', '-f', 's16le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
    hop = 480; n = len(x) // hop
    rms = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)); rms = np.clip(rms / np.percentile(rms, 99), 0, 1)
    env = [round(float(v), 3) for v in rms]
    secs = [{'name': k, 'start': v[0], 'end': v[1]} for k, v in grid['sections'].items()]
    au = {'duration': grid['duration'], 'bpm': grid['tempo'], 'fps': 100, 'beats': grid['beats'], 'downbeats': grid['bars'],
          'sections': secs, 'rms': env, 'low': env, 'mid': env, 'high': env, 'vocal': env, 'drums': env, 'bass': env, 'other': env,
          'onsets': {'kick': [[t, min(1.0, s / 20)] for t, s in grid['onsets']]}}
    (OUT / 'audio.json').write_text(json.dumps(au))
    lines = []
    for i, p in enumerate(lyr['phrases']):
        ws = p['words']
        words = [{'w': w['w'], 'start': w['t'], 'end': ws[j + 1]['t'] if j + 1 < len(ws) else p['t_end'], 'conf': 1} for j, w in enumerate(ws)]
        lines.append({'i': i, 'id': p['id'], 'verb': p['verb'], 'text': p['line'], 'start': p['t'], 'end': p['t_end'], 'words': words})
    (OUT / 'lyrics.json').write_text(json.dumps({'lines': lines, 'notes': 'hkt-project assets/brand/intro-99-lyrics.json'}))


def voxels(mask, rgb, cell, depth):
    """mask/rgb at cell resolution → columns [col, row(from bottom), r, g, b, half-depth]."""
    d = distance_transform_edt(mask)
    h = mask.shape[0]
    out = []
    for r, c in zip(*np.nonzero(mask)):
        hd = depth(d[r, c])
        out.append([int(c), int(h - 1 - r), *[int(v) for v in rgb[r, c]], round(float(hd), 2)])
    return out


def mascot(pose, cell=10):
    im = Image.open(ROOT / f'assets/character-v2/cut/pose-{pose}.png').convert('RGBA')
    im = im.crop(im.getbbox())
    W, H = im.size[0] // cell, im.size[1] // cell
    a = np.asarray(im.resize((W, H), Image.BOX), np.float32)
    mask = a[..., 3] > 140
    rgb = a[..., :3] / np.maximum(a[..., 3:4] / 255, 1e-3)
    vox = voxels(mask, np.clip(rgb, 0, 255), cell, lambda d: 0.6 + 3.2 * np.sqrt(min(d, 7) / 7))
    (OUT / f'mascot-{pose}.json').write_text(json.dumps({'w': W, 'h': H, 'cell': cell, 'vox': vox, 'img': [im.size[0], im.size[1]]}))
    im.save(OUT / f'mascot-{pose}.png')  # the clean 2D image (cropped to its box), shown before it breaks into 3D
    return len(vox)


def text(name, s, px=260, cell=10):
    """A word as voxel columns (Archivo 900): `name` file stem, `s` the text."""
    f = ImageFont.truetype(str(ROOT / 'studio3d/app/public/fonts/Archivo-w1000-900.ttf'), px)
    l, t, r, b = f.getbbox(s)
    im = Image.new('L', (r - l + 20, b - t + 20)); ImageDraw.Draw(im).text((10 - l, 10 - t), s, font=f, fill=255)
    W, H = im.size[0] // cell, im.size[1] // cell
    mask = np.asarray(im.resize((W, H), Image.BOX)) > 110
    vox = voxels(mask, np.full(mask.shape + (3,), 255), cell, lambda d: 1.5)
    (OUT / (f'{name}.json' if name.startswith('word-') else f'text-{name}.json')).write_text(json.dumps({'w': W, 'h': H, 'cell': cell, 'vox': vox}))
    return len(vox)


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    music()
    for f in OUT.glob('*.json'):
        if f.name.startswith(('mascot-', 'text-', 'word-')): f.unlink()
    for p in ['wave', 'idle', 'invite']:
        print(p, mascot(p))
    print('99%', text('99', '99%'))
    print('?', text('q', '?', px=220, cell=12))
    lyr = json.loads((OUT / 'lyrics.json').read_text())
    words = {w['w'].upper() for l in lyr['lines'] for w in l['words']} | {'99%', 'FROM', 'SCRATCH'}
    for w in sorted(words):
        n = text('word-' + ''.join(ch for ch in w.lower() if ch.isalnum()), w, px=200, cell=8)
        print('word', w, n)
