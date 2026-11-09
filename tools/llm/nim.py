#!/usr/bin/env python3
"""Gọi model trên NVIDIA build.nvidia.com (NIM, API kiểu OpenAI) cho việc chữ rẻ: review góc nhìn thứ hai, nháp tag/tiêu đề.

  python3 tools/llm/nim.py "câu hỏi" [-f file …] [-m z-ai/glm-5.3] [-e low|high|max] [-o out.md]

Key: biến môi trường NVIDIA_API_KEY; thiếu thì đọc dòng `export NVIDIA_API_KEY="…"` trong ~/.zshrc. Không bao giờ in key.
Gửi nội dung file sang máy chủ NVIDIA — chỉ dùng cho kịch bản/nội dung bài, không gửi bí mật. Bản thử: ~40 request/phút.
"""
import argparse, json, os, re, sys, time, urllib.error, urllib.request
from pathlib import Path

URL = 'https://integrate.api.nvidia.com/v1/chat/completions'


def api_key():
    k = os.environ.get('NVIDIA_API_KEY', '').strip()
    if not k:
        rc = Path.home() / '.zshrc'
        m = re.search(r'^\s*export\s+NVIDIA_API_KEY=["\']?([^"\'\s]+)', rc.read_text(), re.M) if rc.exists() else None
        k = m.group(1) if m else ''
    if not k:
        sys.exit('nim: thiếu NVIDIA_API_KEY (env hoặc ~/.zshrc)')
    return k


def ask(prompt, model='z-ai/glm-5.3', effort='high', max_tokens=8192, timeout=600):
    body = {'model': model, 'messages': [{'role': 'user', 'content': prompt}],
            'max_tokens': max_tokens, 'temperature': 0.2, 'stream': False}
    if effort:
        body['reasoning_effort'] = effort
    req = urllib.request.Request(URL, json.dumps(body).encode(), {
        'Authorization': f'Bearer {api_key()}', 'Content-Type': 'application/json', 'Accept': 'application/json'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                d = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 3:
                time.sleep(15 * (attempt + 1))
                continue
            sys.exit(f'nim: HTTP {e.code} {e.read()[:300].decode(errors="replace")}')
    msg = d['choices'][0]['message']
    return msg.get('content') or '', d.get('usage', {})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('prompt')
    ap.add_argument('-f', '--file', action='append', default=[])
    ap.add_argument('-m', '--model', default='z-ai/glm-5.3')
    ap.add_argument('-e', '--effort', default='high')
    ap.add_argument('-o', '--out')
    a = ap.parse_args()
    parts = [a.prompt] + [f'\n\n===== {p} =====\n{Path(p).read_text()}' for p in a.file]
    t0 = time.time()
    text, usage = ask(''.join(parts), a.model, a.effort)
    if a.out:
        Path(a.out).parent.mkdir(parents=True, exist_ok=True)
        Path(a.out).write_text(text)
    print(text if not a.out else f'→ {a.out}')
    print(f'nim: {a.model} {time.time() - t0:.0f}s usage={usage}', file=sys.stderr)


if __name__ == '__main__':
    main()
