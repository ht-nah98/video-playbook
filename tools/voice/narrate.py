#!/usr/bin/env python3
"""Lồng tiếng một kịch bản bài học: SCRIPT.md → audio/narration.wav + data/beats.json.

    python3 tools/voice/narrate.py <p> [--from "dòng đầu"] [--to "dòng cuối"] [--voice 03572937] [--redo]
    (phạm vi nhớ theo --out ở data/<out>.range.json — lần sau, kể cả --redo, không cần ghi lại)

Giọng theo KÊNH: channels/<kênh>/channel.json `voice` (en: Atlas 03572937 ×1.08; ja: Jaikyu 49f48276 ×1.0; hist: d589c5a8 `speed` 1.2 — OmniVoice tự đọc nhanh, không atempo); build.json
`"voice"` của bài ghi đè nếu cần. Dự án kênh khác tiếng Anh nằm projects/<kênh>/<p> (tham số <p> = "ja/<tên>"). Tiếng Nhật (channels/ja/WRITING.md, PIPELINE.md): dòng SCRIPT có thể chú âm `{hiện|đọc}`, chỉ phần ĐỌC gửi
OmniVoice (`language: ja` — server không lấy ngôn ngữ từ profile); `tools/voice/ja.py check_spoken` chặn số Hán, ký hiệu
toán, chữ Latin TRƯỚC khi tốn take. Guard `leaked_prefix` của hkt tách bằng dấu cách nên mù với tiếng Nhật → kiểm chữ
thừa đầu câu ở align.py (whisper ja, so theo kana), câu hỏng ghi data/<out>.redo.json; `--redo` tổng hợp lại đúng các câu đó.

Giọng: hkt-project/src/hkt/voice (gọi OmniVoice qua HTTP — AGPL, không import gói của nó). Mỗi câu một take, cache
theo (chữ, giọng) ở projects/<p>/audio/voice/, mọi take qua `leaked_prefix` (engine tự thử lại 2 lần).
Sau tổng hợp: cắt lặng hai đầu, `atempo=<tempo>` (Atlas 1.08 đã duyệt — handoff §3), rồi nối theo pause KHAI BÁO:
  0.35 s sau câu · 0.95 s sau câu kết ý (`//`) · 1.6 s khi sang mốc mới (`##`) · 2.4 s khi sang hồi (`# ACT`)
Lót room tone −64 dBFS liên tục (lặng số 0 giữa câu nghe như tiếng click — handoff §9).
Định dạng SCRIPT.md: một dòng = một hơi đọc (0.35 s), dòng trống = hết ý (0.95 s) — đầu file SCRIPT.md. Mốc từng từ: tools/voice/align.py (bước sau).
"""
import argparse, hashlib, json, subprocess, sys, wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from common import ROOT                                  # noqa: E402
from config import HKT                                    # noqa: E402  (MASCOT_HKT)
from channel import channel_of                            # noqa: E402  (channels/<kênh>/channel.json)
sys.path.insert(0, str(HKT / 'src'))
from hkt.voice.omnivoice import OmniVoiceEngine          # noqa: E402
sys.path.insert(0, str(ROOT / 'tools' / 'voice'))
import ja                                                 # noqa: E402  (phần không cần thư viện)

SR = 48000


def voice_of(P):
    """Giọng của bài: giọng của KÊNH (channels/<kênh>/channel.json — en: Atlas ×1.08, handoff §3), build.json "voice"
    ghi đè từng trường nếu bài cần khác."""
    f = P / 'build.json'
    v = json.loads(f.read_text(encoding='utf-8')).get('voice', {}) if f.exists() else {}
    return {**channel_of(P.relative_to(ROOT / 'projects').as_posix())['voice'], **v}
PAUSE = {'line': 0.35, 'idea': 0.95, 'stop': 1.6, 'act': 2.4}


def parse(script):
    """→ [{text, idea, act, section, opens}]: một dòng = một hơi đọc; dòng trống = hết ý (idea=True cho dòng trước)."""
    beats, act, section, opens = [], '', '', None
    for raw in Path(script).read_text(encoding='utf-8').split('\n## Cold open', 1)[1].split('\n---\n')[0].splitlines():
        s = raw.strip()
        if not s:
            if beats: beats[-1]['idea'] = True
            continue
        if s.startswith('[INTRO]'):
            continue
        if s.startswith('# ACT'):
            act, opens = s[2:], 'act'; continue
        if s.startswith('## '):
            section, opens = s[3:], opens or 'stop'; continue
        idea = s.endswith('//')                 # định dạng cũ (v2) vẫn đọc được
        beats.append({'text': s.rstrip('/').strip(), 'idea': idea, 'act': act, 'section': section or 'Cold open', 'opens': opens})
        opens = None
    return beats


def ff(*a):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)


def dur(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('project'); ap.add_argument('--from', dest='a'); ap.add_argument('--to', dest='b')
    ap.add_argument('--voice'); ap.add_argument('--out', default='narration')
    ap.add_argument('--redo', action='store_true', help='tổng hợp lại các câu trong data/<out>.redo.json (align.py ghi)')
    o = ap.parse_args()
    P = ROOT / 'projects' / o.project
    V = voice_of(P); voice = o.voice or V['id']; lang, tempo = V['lang'], float(V['tempo'])
    beats = parse(P / 'SCRIPT.md')
    # phạm vi --from/--to nhớ theo --out: chạy lại (vd. --redo) thiếu phạm vi từng ghi CẢ kịch bản vào p1 (probability, LESSONS §150)
    rng = P / 'data' / f'{o.out}.range.json'
    if o.a or o.b:
        rng.parent.mkdir(exist_ok=True); rng.write_text(json.dumps({'from': o.a, 'to': o.b}, ensure_ascii=False), encoding='utf-8')
    elif rng.exists():
        r = json.loads(rng.read_text(encoding='utf-8')); o.a, o.b = r['from'], r['to']
        print(f'▸ dùng lại phạm vi đã nhớ của {o.out}: --from "{(o.a or "")[:40]}" --to "{(o.b or "")[:40]}"')
    elif o.out != 'narration':
        sys.exit(f'LỖI: --out {o.out} không có --from/--to và chưa có {rng.name} — sẽ đọc CẢ kịch bản vào {o.out}. Ghi rõ phạm vi.')
    i0 = next(i for i, b in enumerate(beats) if b['text'].startswith(o.a)) if o.a else 0
    i1 = next(i for i, b in enumerate(beats) if b['text'].startswith(o.b)) if o.b else len(beats) - 1
    beats = beats[i0:i1 + 1]
    for b in beats:
        b['spoken'] = ja.spoken(b['text']) if lang == 'ja' else b['text']
    if lang == 'ja':                                    # chặn trước khi tốn take (mẫu đã đo là đọc sai)
        bad = [(b['text'], x) for b in beats for x in ja.check_spoken(b['text'])]
        if bad: sys.exit('LỖI lời đọc tiếng Nhật — sửa SCRIPT (chú âm {hiện|đọc}):\n' + '\n'.join(f'  「{seg}」 {why}\n     ở: {t}' for t, (seg, why) in bad))
    redo = set()
    if o.redo:
        rf = P / 'data' / f'{o.out}.redo.json'
        redo = set(json.loads(rf.read_text(encoding='utf-8'))['texts']) if rf.exists() else set()
        print(f'▸ tổng hợp lại {len(redo)} câu ({rf.name})')

    # ja: không xin OmniVoice căn chữ (route transcriptions bỏ qua language và mất mảng words — channels/ja/VOICE.md)
    # speed: OmniVoice tự đọc nhanh (hist ×1.2, channels/hist/voice/VOICE.md); 1.0 → khoá cache bài cũ y nguyên
    PZ = {**PAUSE, **V.get('pause', {})}            # kênh Short (wn) nghỉ ngắn hơn bài học — channel.json voice.pause
    eng = OmniVoiceEngine(voice=voice, language=lang, align=(lang == 'en'), speed=float(V.get('speed', 1.0)))
    ident = eng.cache_identity()
    cache = P / 'audio' / 'voice'; cache.mkdir(parents=True, exist_ok=True)
    parts, t, out = [], 0.0, []
    for k, b in enumerate(beats):
        key = hashlib.sha1(f"{b['spoken']}|{ident}|tempo{tempo:g}".encode()).hexdigest()[:16]   # en: y hệt khoá cũ
        raw, fin = cache / f'{key}.raw.wav', cache / f'{key}.wav'
        if b['text'] in redo and fin.exists():          # giữ take cũ cạnh cache để so tai nếu cần
            fin.rename(fin.with_suffix('.old.wav'))
        if not fin.exists():
            print(f"▸ [{k + 1}/{len(beats)}] {b['text'][:70]}", flush=True)
            eng.synthesize(b['spoken'], raw)
            # cắt lặng hai đầu (ngưỡng thấp: không ăn phụ âm cuối), tăng tốc, 48 kHz mono
            ff('-i', str(raw), '-af',
               'silenceremove=start_periods=1:start_threshold=-55dB,areverse,'
               'silenceremove=start_periods=1:start_threshold=-55dB,areverse,'
               + (f'atempo={tempo:g}' if tempo != 1 else 'anull'), '-ar', str(SR), '-ac', '1', str(fin))
        if k and b['opens']:                      # chỗ mở mốc/hồi: ngắt dài TRƯỚC nó
            gap = PZ[b['opens']] - parts[-1][1]
            parts[-1] = (parts[-1][0], parts[-1][1] + max(0, gap)); t += max(0, gap)
        d = dur(fin)
        out.append({**b, 'start': round(t, 3), 'end': round(t + d, 3), 'wav': str(fin.relative_to(P))})
        pause = PZ['idea'] if b['idea'] else PZ['line']
        parts.append((fin, pause)); t += d + pause
    # nối: mỗi câu + lặng khai báo, rồi trộn room tone
    lst = cache / '_concat.txt'
    sil = {}
    lines = []
    for f, p in parts:
        lines.append(f"file '{f}'")
        s = sil.setdefault(round(p, 3), cache / f'_sil{round(p * 1000)}.wav')
        if not s.exists():
            ff('-f', 'lavfi', '-i', f'anullsrc=r={SR}:cl=mono', '-t', f'{p:.3f}', str(s))
        lines.append(f"file '{s}'")
    lst.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    (P / 'audio').mkdir(exist_ok=True)
    dry = P / 'audio' / f'{o.out}.dry.wav'
    ff('-f', 'concat', '-safe', '0', '-i', str(lst), '-c:a', 'pcm_s16le', str(dry))
    total = dur(dry)
    ff('-i', str(dry), '-f', 'lavfi', '-t', f'{total:.3f}', '-i', f'anoisesrc=r={SR}:color=pink:amplitude=0.00063',
       '-filter_complex', '[0][1]amix=inputs=2:normalize=0', '-ar', str(SR), '-ac', '1', str(P / 'audio' / f'{o.out}.wav'))
    (P / 'data').mkdir(exist_ok=True)
    (P / 'data' / f'{o.out}.beats.json').write_text(json.dumps({'duration': round(total, 3), 'tempo': tempo, 'voice': voice, 'lang': lang,
                                                               'leak_retries': eng.leak_retries, 'beats': out}, indent=1), encoding='utf-8')
    print(f'✓ {len(out)} câu, {total:.1f}s → audio/{o.out}.wav; retries: {len(eng.leak_retries)}')


if __name__ == '__main__':
    main()
