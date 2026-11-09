"""Lời của video mẫu bằng faster-whisper large-v3 (GPU nếu có): <audio.wav> <out.json> [lang] → out.json + out.txt.
Chạy bằng venv phân tích: $(python3 tools/config.py analysis_py) -I tools/study/transcribe.py …"""
import sys as _sys
if __name__ == '__main__' and _sys.argv[1:2] in (['-h'], ['--help']): print(__doc__.strip()); raise SystemExit(0)
import json, sys
from faster_whisper import WhisperModel

wav, out = sys.argv[1], sys.argv[2]
lang = sys.argv[3] if len(sys.argv) > 3 else 'en'
try:
    m = WhisperModel('large-v3', device='cuda', compute_type='float16')
except Exception:
    m = WhisperModel('large-v3', device='cpu', compute_type='int8')
segs, _ = m.transcribe(wav, language=lang, word_timestamps=True, vad_filter=True)
res = [{'start': s.start, 'end': s.end, 'text': s.text.strip(),
        'words': [[w.start, w.end, w.word] for w in s.words]} for s in segs]
json.dump(res, open(out, 'w'), ensure_ascii=False, indent=0)
with open(out.rsplit('.', 1)[0] + '.txt', 'w') as f:
    for s in res:
        f.write(f"[{int(s['start'] // 60)}:{s['start'] % 60:05.2f}] {s['text']}\n")
print('xong', len(res), 'câu')
