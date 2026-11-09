"""Đường bao giọng cho miệng nhân vật (docs/character/CHARACTER-V2.md § Miệng nói): projects/<p>/audio/<part>.wav → data/<part>.mouth.json.

  python3 tools/voice/mouth_env.py <p> p1 [p2 …]

Mỗi khung 1/60 s: RMS cửa sổ 30 ms của lời đọc (bản DRY — chưa trộn room tone), đổi ra dB, ánh xạ −30…−12 dB (lời đọc OmniVoice: trung vị −25, p95 −12) → 0…1,
mở nhanh (tức thì) / khép chậm (≈ 70 ms), lượng tử 0…255. Kết quả { fps, t0: 0, q } đọc bằng engine/visemes.js makeEnv —
nên miệng vẫn là hàm thuần của t (tất định).
"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, subprocess, sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT                    # noqa: E402
FPS, SR = 60, 48000

def env(wav):
    a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', str(wav), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                                     capture_output=True, check=True).stdout, np.float32)
    hop, win = SR // FPS, int(SR * 0.030)
    n = len(a) // hop
    out, prev = [], 0.0
    for i in range(n):
        c = i * hop + hop // 2
        seg = a[max(0, c - win // 2): c + win // 2]
        db = 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9)
        v = float(np.clip((db + 30) / 18, 0, 1))
        prev = v if v > prev else prev * 0.78 + v * 0.22      # mở tức thì, khép ~70 ms
        out.append(int(round(prev * 255)))
    return out

def main():
    p, parts = sys.argv[1], sys.argv[2:]
    P = ROOT / 'projects' / p
    for part in parts:
        src = P / 'audio' / f'{part}.dry.wav'
        q = env(src)
        (P / 'data' / f'{part}.mouth.json').write_text(json.dumps({'fps': FPS, 't0': 0, 'q': q}, separators=(',', ':')))
        print(f'✓ {part}: {len(q)} khung ({len(q) / FPS:.1f}s), mở > 0.3 ở {sum(x > 76 for x in q) / max(1, len(q)):.0%} khung')

if __name__ == '__main__':
    main()
