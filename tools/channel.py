"""Kênh của một dự án — MỘT nguồn cho giọng, intro, tên kênh: channels/<kênh>/channel.json (channels/README.md).

    from channel import channel_of, final_mp4
    ch = channel_of('ja/pythagoras')        # → dict của channels/ja/channel.json
    final_mp4('ja/pythagoras')              # → out/ja/pythagoras/pythagoras.mp4
    out_dir('pi')                           # → out/en/pi_public nếu bài đã đăng, không thì out/en/pi

Dự án tiếng Anh (và MV) nằm phẳng projects/<p>; dự án kênh khác nằm projects/<kênh>/<p> — tiền tố thư mục là kênh.
build.json của bài có thể ghi đè "voice" / "intro"; thiếu thì lấy của kênh.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHANNELS = ROOT / 'channels'


def load(cid):
    f = CHANNELS / cid / 'channel.json'
    if not f.exists(): raise SystemExit(f'không có kênh {cid} ({f.relative_to(ROOT)})')
    return json.loads(f.read_text(encoding='utf-8'))


def channel_id(project):
    """'ja/x' → 'ja'; 'en/x' → 'en'; 'hist/x' → 'hist'; 'mv/x' (không có channels/mv) → 'en'."""
    head = str(project).split('/', 1)[0]
    return head if '/' in str(project) and (CHANNELS / head / 'channel.json').exists() else 'en'


def channel_of(project):
    return load(channel_id(project))


PUBLIC = '_public'


def out_dir(project):
    """Thư mục đầu ra của bài: out/<kênh>/<p>_public nếu bài ĐÃ ĐĂNG (người dùng đánh dấu bằng tên thư mục, 2026-10-22),
    không thì out/<kênh>/<p>. Mọi công cụ đi qua hàm này — đừng tự ghép ROOT / 'out' / p."""
    project = str(project)
    if '/shorts/' in project:                     # Short của một tập: out/<kênh>/<tập>[_public]/shorts/<tên> (2026-11-03)
        parent, name = project.split('/shorts/', 1)
        return out_dir(parent) / 'shorts' / name
    pub = ROOT / 'out' / f'{project}{PUBLIC}'
    return pub if pub.is_dir() else ROOT / 'out' / project


def final_mp4(project):
    """Bản cuối: out/<p>[_public]/<tên>.mp4 với <tên> = phần cuối của p (phẳng: out/en/pemdas/pemdas.mp4)."""
    return out_dir(project) / f'{Path(project).name}.mp4'


def qa_dir(project):
    """Ảnh kiểm tra / golden / log của một bài: out/<kênh>/<p>[_public]/qa (không còn out/_qa chung)."""
    return out_dir(project) / 'qa'
