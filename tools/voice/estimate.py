#!/usr/bin/env python3
"""Mốc TẠM cho một đoạn kịch bản (chưa có giọng): data/<out>.timeline.json + data/<out>.lines.txt.

    python3 tools/voice/estimate.py <p> --from "dòng đầu" --to "dòng cuối" --out p2

Cùng định dạng với tools/voice/align.py để cảnh viết và chụp kiểm được NGAY; khi giọng thật xong, align.py ghi đè.
Cảnh tra mốc theo CHỮ (kit.lookup), không theo giây, nên đổi mốc không phải sửa cảnh. Tốc độ: Atlas ×1.08 ≈ 174 wpm;
pause theo narrate.PAUSE. lines.txt: chỉ số câu → mục → chữ (để cảnh biết câu nào là câu mấy).
Tiếng Nhật (build.json voice.lang = "ja"): theo MORA — Jaikyu 6.6 mora/s (trung vị 21 take, 6.1–7.6; 2026-10-10), chia
cho tempo; từ = ja.words (cần venv phân tích: "$(python3 tools/config.py analysis_py)" tools/voice/estimate.py …).
"""
import argparse, json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT                                          # noqa: E402
sys.path.insert(0, str(ROOT / 'tools' / 'voice'))
from config import HKT                                            # noqa: E402  (MASCOT_HKT)
sys.path.insert(0, str(HKT / 'src'))
import narrate                                                    # noqa: E402

WPS = 174 / 60
MORA_PS = 6.6


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('project'); ap.add_argument('--from', dest='a'); ap.add_argument('--to', dest='b')
    ap.add_argument('--out', default='p2'); o = ap.parse_args()
    P = ROOT / 'projects' / o.project
    beats = narrate.parse(P / 'SCRIPT.md')
    i0 = next(i for i, b in enumerate(beats) if b['text'].startswith(o.a)); i1 = next(i for i, b in enumerate(beats) if b['text'].startswith(o.b))
    beats = beats[i0:i1 + 1]
    V = narrate.voice_of(P); lang, tempo = V['lang'], float(V['tempo'])
    if lang == 'ja':
        import ja
    t, lines, sections, idx = 0.0, [], [], []
    for k, b in enumerate(beats):
        if k and b['opens']: t += narrate.PAUSE[b['opens']] - (narrate.PAUSE['idea'] if beats[k - 1]['idea'] else narrate.PAUSE['line'])
        if lang == 'ja':
            W = ja.words(b['text'])
            ws, dws, text = [x['w'] for x in W], [max(1, ja.mora(x['pron'])) / MORA_PS / tempo for x in W], ja.display(b['text'])
        else:
            ws = [w for w in re.findall(r"[A-Za-zÀ-ÿ0-9'’-]+", b['text']) if re.search(r'[A-Za-z0-9]', w)]
            dws, text = [(0.12 + 0.055 * len(w)) / 1.08 for w in ws], b['text']
        d = sum(dws)
        words, x = [], t
        for w, dw in zip(ws, dws):
            words.append({'w': w.lower(), 'start': round(x, 3), 'end': round(x + dw * 0.9, 3), 'conf': 0}); x += dw
        lines.append({'section': b['section'], 'act': b['act'], 'text': text, 'idea': b['idea'], 'start': words[0]['start'], 'end': words[-1]['end'], 'words': words})
        if not sections or sections[-1]['name'] != b['section']:
            if sections: sections[-1]['end'] = t
            sections.append({'name': b['section'], 'act': b['act'], 'start': t, 'end': None})
        idx.append(f"{k:3d}  [{b['section'][:28]:28s}]  {b['text']}")
        t += d + (narrate.PAUSE['idea'] if b['idea'] else narrate.PAUSE['line'])
    sections[-1]['end'] = t
    (P / 'data' / f'{o.out}.timeline.json').write_text(json.dumps({'estimated': True, 'sections': sections, 'lines': lines}, indent=1, ensure_ascii=False), encoding='utf-8')
    (P / 'data' / f'{o.out}.lines.txt').write_text('\n'.join(idx) + '\n', encoding='utf-8')
    print(f'✓ {len(lines)} câu, ~{t / 60:.1f} phút (ƯỚC TÍNH) → data/{o.out}.timeline.json, data/{o.out}.lines.txt')


if __name__ == '__main__':
    main()
