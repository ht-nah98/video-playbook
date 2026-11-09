#!/usr/bin/env bash
# Dựng khung một VIDEO BÀI HỌC mới từ templates/lesson/ (+ channels/<kênh>/templates/ phủ lên).
#   tools/new-lesson.sh <tên-thư-mục> "<Tên video>"                 # kênh tiếng Anh 99% from scratch → projects/en/<tên>
#   tools/new-lesson.sh <tên-thư-mục> "<タイトル>" --channel ja      # kênh 99の発見 → projects/ja/<tên>   (--ja = tắt)
# Kênh = channels/<kênh>/channel.json (giọng, intro, font, tên kênh) — channels/README.md.
# Sau đó làm theo docs/lesson/LESSON-VIDEO.md (+ channels/<kênh>/PIPELINE.md nếu có).
case "${1:-}" in -h|--help) awk 'NR>1&&/^#/{sub(/^# ?/,"");print;next} NR>1{exit}' "$0"; exit 0 ;; esac
set -euo pipefail
cd "$(dirname "$0")/.."
name="$1" title="${2:-$1}" ch=en
case "${3:-}" in --ja) ch=ja ;; --channel) ch="${4:?thiếu tên kênh}" ;; "") ;; *) echo "tham số lạ: $3"; exit 1 ;; esac
[[ "$name" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "tên thư mục chỉ gồm a-z, 0-9, '-': $name"; exit 1; }
[ -f "channels/$ch/channel.json" ] || { echo "không có kênh $ch (channels/$ch/channel.json)"; exit 1; }
p="$ch/$name"                                              # mọi kênh: projects/<kênh>/<tên> (2026-10-24)
dst="projects/$p"
[ -e "$dst" ] && { echo "đã có $dst — không ghi đè"; exit 1; }
mkdir -p "$(dirname "$dst")"
cp -r templates/lesson "$dst"
[ -d "channels/$ch/templates" ] && cp -r "channels/$ch/templates/." "$dst/"
python3 - "$dst" "$p" "$name" "$title" "$ch" <<'PY'
import sys, html, json, pathlib
dst, p, name, title, ch = sys.argv[1:6]
d = pathlib.Path(dst)
C = json.loads(pathlib.Path(f'channels/{ch}/channel.json').read_text())
up = '../' * (p.count('/') + 2)                             # từ projects/<p>/ về gốc repo
if p.count('/'):                                            # sâu hơn mẫu một cấp: sửa mọi đường dẫn về gốc repo
    for f in [*d.glob('*.html'), *d.glob('*.js')]:
        f.write_text(f.read_text().replace('../../', up))
t = (d / 'build.json').read_text()                          # sửa chữ, giữ cách trình bày của mẫu
if C.get('intro'):
    (d / 'build.json').write_text(t.replace('${REPO}/out/en/intro/intro.mp4', C['intro'])); json.loads((d / 'build.json').read_text())
else:                                                       # kênh không lồng intro (kênh Anh từ 2026-10-19)
    B = json.loads(t); B.pop('intro', None); B.pop('intro_gain_db', None); B['parts'] = [x for x in B['parts'] if not x.get('intro')]
    (d / 'build.json').write_text(json.dumps(B, ensure_ascii=False, indent=1) + '\n')
F = C.get('fonts', {})
faces = ''.join('  ' + x.replace('url("', 'url("' + up) + '\n' for x in F.get('face', []))   # đường dẫn font tính từ trang
loads = ', '.join("'" + x + "'" for x in F.get('load', []))                                     # nạp TRƯỚC init (tất định)
for part in ['p1', 'p2']:                                   # hai trang: trước intro (p1) và sau intro (p2)
    s = (d / 'part.html').read_text().replace('__PART__', part).replace('__TITLE__', html.escape(title))
    s = s.replace('  <!--CHANNEL-FONTS-->\n', faces).replace('/*CHANNEL-FONTLOAD*/', loads)
    (d / f'{part}.html').write_text(s)
    (d / 'plates' / f'{part}-order.js').write_text((d / 'plates' / 'order.js').read_text().replace('__PART__', part))
(d / 'part.html').unlink(); (d / 'plates' / 'order.js').unlink()
for f in d.rglob('*'):
    if f.is_file() and f.suffix in {'.md', '.js', '.json', '.html'}:
        f.write_text(f.read_text().replace('__NAME__', name).replace('__TITLE__', title).replace('__P__', p))
PY
echo "Đã tạo $dst (kênh $ch). Bước tiếp (docs/lesson/LESSON-VIDEO.md):"
[ -f "channels/$ch/PIPELINE.md" ] && echo "  (kênh $ch: đọc channels/$ch/WRITING.md + PIPELINE.md trước khi viết SCRIPT)"
echo "  1. CONTENT.md (bóc tách + soát sự kiện), SCRIPT.md (văn xuôi, mở bài hứa với người xem) → người dùng duyệt"
echo "  2. DNA.md + khung phong cách (tools/lab/) → thay ERA/STOPS trong kit.js theo DNA"
echo "  3. giọng: tools/voice/narrate.py $p --from … --to … --out p1|p2 ; mốc: tools/voice/align.py ; miệng: tools/voice/mouth_env.py $p p1 p2"
echo "  4. cảnh: plates/*.js theo BRIEF-PLATES.md (tiếng: sfx() trong cảnh, bảng hạn mức có hàng TỔNG) ; review độc lập"
echo "  5. node engine/render/shoot.js check --page $dst/p2.html ; python3 tools/lesson/build.py $p"
