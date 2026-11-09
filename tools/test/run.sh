#!/usr/bin/env bash
# Chạy MỌI unit test của repo bằng một lệnh: JS (node --test) + Python (từng file test_*.py trong thư mục của nó) + kb.py --check.
#   tools/test/run.sh          mã 0 = xanh hết
# test_ja.py cần fugashi/pykakasi → chạy bằng venv phân tích (tools/config.py analysis_py); thiếu venv thì bỏ qua và báo.
cd "$(dirname "$0")/../.." || exit 1
[ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] && { sed -n 2,4p "$0" | sed 's/^# \{0,1\}//'; exit 0; }
fail=0
echo "== node --test tools/test/*.test.mjs"
out=$(node --test tools/test/*.test.mjs 2>&1) || fail=1
echo "$out" | grep -E '^# (tests|pass|fail)'; [ $fail = 0 ] || echo "$out" | grep -B2 -A8 'not ok' | head -40
APY=$(python3 tools/config.py analysis_py 2>/dev/null)
for t in $(find tools -name 'test_*.py' -not -path '*/node_modules/*' -not -path '*/.venv/*' | sort); do
  py=python3; case "$t" in *test_ja.py) py=$APY;; esac
  if [ ! -x "$py" ] && [ "$py" != python3 ]; then echo "⚠ bỏ qua $t (không có venv phân tích)"; continue; fi
  if (cd "$(dirname "$t")" && "$py" -m unittest "$(basename "$t" .py)" >/tmp/run-$$.log 2>&1); then
    echo "✓ $t ($(grep -o 'Ran [0-9]* tests\?' /tmp/run-$$.log))"
  else echo "✗ $t"; tail -15 /tmp/run-$$.log; fail=1; fi
done
rm -f /tmp/run-$$.log
# kho bài học + đường dẫn trong tài liệu điều hướng (review 2026-11-03): link chết, §n không có thật
if out=$(python3 tools/kb.py --check 2>&1); then echo "✓ tools/kb.py --check"; else echo "✗ tools/kb.py --check"; echo "$out" | tail -15; fail=1; fi
[ $fail = 0 ] && echo "XANH" || echo "CÓ LỖI"
exit $fail
