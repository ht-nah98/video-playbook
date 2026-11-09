#!/usr/bin/env python3
"""Mốc từng từ cho lời đọc: data/<out>.beats.json + wav từng câu → data/timeline.json (định dạng engine/timeline.js).

    "$(python3 tools/config.py analysis_py)" tools/voice/align.py <p> [--out narration]

Cần python của venv phân tích (tools/config.py, biến MASCOT_ANALYSIS_PY) — python thường không có torch.

Căn TỪNG CÂU (wav ngắn, chữ đã biết) bằng CTC MMS_FA + star (tools/analyze/align.py), rồi cộng mốc câu trong bản nối.
Atempo đã áp trước khi căn, nên mốc là của chính file sẽ nghe. Kiểm độc lập: whisper nghe lại cả bản nối, báo từ
lệch so với kịch bản (bắt chữ lạc đầu câu, từ bị nuốt) — handoff §5: guard chưa từng bắn thì chưa biết nó bắn được.
Câu bị báo → data/<out>.redo.json (sửa tay nếu là khác biệt vô hại) → `narrate.py --redo` tổng hợp lại đúng các câu đó.

Tiếng Nhật (beats.json "lang": "ja", channels/ja/PIPELINE.md): từ = tools/voice/ja.py words() (unidic + gộp hậu tố/trợ
động từ; chú âm {hiện|đọc} là một từ, `w` = chữ HIỆN — cảnh tra w(i, '三角形')), CTC trên romaji của cách phát âm;
whisper nghe lại `language='ja'`, so THEO KANA (180 ↔ ひゃくはちじゅう) và bắt chữ thừa đầu câu (thay leaked_prefix mù).
"""
import argparse, json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT                    # noqa: E402
sys.path.insert(0, str(ROOT / 'tools' / 'analyze'))
from align import ctc_align, hear       # noqa: E402
sys.path.insert(0, str(ROOT / 'tools' / 'voice'))
import ja                                # noqa: E402

NUM = {'0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'}


def words_of(text):
    return [w for w in re.findall(r"[A-Za-zÀ-ÿ0-9'’-]+", text) if re.search(r'[A-Za-z0-9]', w)]


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('project'); ap.add_argument('--out', default='narration'); ap.add_argument('--force', action='store_true', help='chạy dù OmniVoice đang bật (dễ sập VRAM)')
    o = ap.parse_args()
    # OmniVoice giữ ~11 GB VRAM: chạy align (whisper + CTC trên GPU) song song làm OmniVoice sập giữa chừng (probability, §151)
    import socket
    with socket.socket() as sk:
        sk.settimeout(0.3)
        if sk.connect_ex(('127.0.0.1', 3900)) == 0 and not o.force:
            sys.exit('LỖI: OmniVoice đang chạy (cổng 3900) — tắt trước khi align (VRAM, LESSONS §151). Cố tình chạy chung: --force')
    P = ROOT / 'projects' / o.project
    B = json.loads((P / 'data' / f'{o.out}.beats.json').read_text(encoding='utf-8'))
    lang = B.get('lang', 'en')
    lines, sections = [], []
    for b in B['beats']:
        if lang == 'ja':
            W = ja.words(b['text'])
            ws, extra = [x['w'] for x in W], [{'s': x['s']} for x in W]
            al = ctc_align(str(P / b['wav']), [{'w': ja.romaji(x['pron'])} for x in W])
        else:
            ws = words_of(b['text']); extra = [{} for _ in ws]
            al = ctc_align(str(P / b['wav']), [{'w': w.lower().replace('’', "'")} for w in ws])
        if not ws: sys.exit(f'LỖI: câu không có từ nào (sai ngôn ngữ? beats.json lang={lang}): {b["text"]}')
        words, d = [], b['end'] - b['start']
        for i, (w, a) in enumerate(zip(ws, al)):
            if a is None:                      # không căn được: chia đều phần còn lại, đánh dấu
                a = {'start': d * i / len(ws), 'end': d * (i + 1) / len(ws), 'conf': 0, 'interp': True}
            words.append({'w': w.lower(), 'start': round(b['start'] + a['start'], 3), 'end': round(b['start'] + a['end'], 3),
                          'conf': a.get('conf', 0), **extra[i], **({'interp': True} if a.get('interp') else {})})
        lines.append({'section': b['section'], 'act': b['act'], 'text': ja.display(b['text']) if lang == 'ja' else b['text'],
                      'idea': b['idea'], 'start': words[0]['start'], 'end': words[-1]['end'], 'words': words})
        if not sections or sections[-1]['name'] != b['section']:
            if sections: sections[-1]['end'] = lines[-1]['start']
            sections.append({'name': b['section'], 'act': b['act'], 'start': lines[-1]['start'], 'end': None})
    sections[-1]['end'] = B['duration']
    (P / 'data' / f'{o.out}.timeline.json').write_text(json.dumps({'sections': sections, 'lines': lines}, indent=1, ensure_ascii=False), encoding='utf-8')
    low = [w for l in lines for w in l['words'] if w['conf'] < 0.3]
    print(f'✓ {len(lines)} câu, {sum(len(l["words"]) for l in lines)} từ; tin cậy thấp: {len(low)} {[w["w"] for w in low][:12]}')

    # kiểm độc lập: whisper nghe lại TỪNG CÂU (nghe cả file dài thì whisper tự bịa chữ ở chỗ lặng — "thank you for
    # watching" — và lặp cụm; đã gặp ở p1a/p1b). Một mô hình, nạp một lần.
    from faster_whisper import WhisperModel
    import difflib
    m = WhisperModel("large-v3", device="cpu", compute_type="int8")
    norm = lambda s: re.sub(r"[^a-z0-9]", '', s.lower())
    bad, redo = 0, []
    for b, l in zip(B['beats'], lines):
        segs, _ = m.transcribe(str(P / b['wav']), language=lang, beam_size=5, vad_filter=False)
        if lang == 'ja':
            heard = ''.join(sg.text for sg in segs)
            c = ja.compare(b.get('spoken') or ja.spoken(b['text']), heard)
            if c['leak'] or c['ratio'] < 0.95:
                bad += 1; redo.append(b['text'])
                print(f"   ✗ {b['text'][:40]}… ({c['ratio']}) nghe: {heard}")
                if c['leak']: print(f"       CHỮ THỪA ĐẦU CÂU: {c['leak']}")
                for op in c['ops'][:6]: print('      ', *op)
            continue
        heard = [norm(x) for x in ' '.join(sg.text for sg in segs).split()]
        want = [norm(w['w']) for w in l['words']]
        ops = [op for op in difflib.SequenceMatcher(a=want, b=heard, autojunk=False).get_opcodes() if op[0] != 'equal']
        # số viết bằng chữ ↔ chữ số là cùng một lời; chỉ báo khác biệt về CHỮ
        real = [op for op in ops if not any(c.isdigit() for c in ''.join(heard[op[3]:op[4]]))]
        if real:
            bad += 1; redo.append(b['text']); print(f"   ✗ {b['text'][:60]}…"); [print('      ', op[0], want[op[1]:op[2]], '→', heard[op[3]:op[4]]) for op in real]
    (P / 'data' / f'{o.out}.redo.json').write_text(json.dumps({'texts': redo}, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'whisper nghe lại {len(lines)} câu: {bad} câu có khác biệt về chữ → data/{o.out}.redo.json '
          f'(bỏ dòng vô hại rồi: narrate.py {o.project} … --out {o.out} --redo)')

if __name__ == '__main__':
    main()
