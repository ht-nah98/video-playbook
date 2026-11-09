#!/usr/bin/env python3
"""Hook Claude Code (.claude/settings.json), LESSONS §295.
  PreToolUse Write: tạo FILE MỚI trong một vùng của sổ năng lực → đưa vào ngữ cảnh danh sách kỹ thuật đã có + file cùng thư mục,
                    để không viết lại từ đầu thứ đã làm (§294: clip.py quên motion.py).
  SessionStart (mở / sau nén): in tóm tắt sổ năng lực mọi vùng.
Không tham số + stdin rỗng: in cách dùng."""
import json, os, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CAP = json.loads((ROOT / 'tools/qa/capabilities.json').read_text())


def area_text(a, full=True):
    out = [f"■ {a['area']} — đọc trước: {', '.join(a['read'])}"]
    for c in a['caps']:
        out.append(f"  · {c['name']} → {c['lib']} ({c['lesson']})" + (f"; lối vào phải dùng: {', '.join(c['used_by'])}" if full and c['used_by'] else ''))
    return '\n'.join(out)


def emit(event, text):
    print(json.dumps({'hookSpecificOutput': {'hookEventName': event, 'additionalContext': text}}, ensure_ascii=False))


def main():
    raw = sys.stdin.read() if not sys.stdin.isatty() else ''
    if not raw.strip():
        print(__doc__)
        return
    ev = json.loads(raw)
    name = ev.get('hook_event_name', '')
    if name == 'SessionStart':
        emit('SessionStart', 'SỔ NĂNG LỰC (tools/qa/capabilities.json) — kỹ thuật ĐÃ CÓ, dùng lại trước khi viết mới:\n' + '\n'.join(area_text(a, False) for a in CAP['areas']))
        return
    fp = (ev.get('tool_input') or {}).get('file_path', '')
    if not fp or os.path.exists(fp):
        return
    try:
        rel = str(Path(fp).resolve().relative_to(ROOT))
    except ValueError:
        return
    for a in CAP['areas']:
        if any(rel.startswith(d) for d in a['dirs']):
            d = Path(fp).parent
            sib = ', '.join(sorted(p.name for p in d.glob('*') if p.is_file() and p.suffix in ('.py', '.js', '.mjs', '.sh')))[:900] if d.exists() else ''
            emit('PreToolUse', f"FILE MỚI {rel}: vùng này đã có kỹ thuật dưới đây — dùng lại / mở rộng file có sẵn trước khi viết mới (LESSONS §294).\n"
                 + area_text(a) + (f"\nFile cùng thư mục: {sib}" if sib else '') + f"\nTra thêm: python3 tools/kb.py --file {rel}")
            return
    if rel.startswith(('projects/', 'tools/', 'engine/')) and rel.endswith(('.py', '.js', '.mjs', '.sh')):
        emit('PreToolUse', f"FILE MỚI {rel}: kiểm tra công cụ sẵn có trước (docs/MAP.md, python3 tools/kb.py --file {rel}); kỹ thuật mới đúc kết → thêm dòng vào tools/qa/capabilities.json.")


if __name__ == '__main__':
    main()
