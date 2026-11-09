// engine/visemes.js
// Chữ → khẩu hình theo thời gian, cho mặt cận (docs/character/CHARACTER-V2.md § Hát nhép).
// Đơn giản có chủ đích: chia đều thời lượng từ cho các âm tiết; nguyên âm quyết
// định khẩu hình, phụ âm đầu chiếm 20% đầu âm tiết, 15% cuối từ khép miệng.
export const V = { REST: 1, CLOSE: 2, TEETH: 3, OPEN: 4, WIDE: 5, O: 6, U: 7, EE: 8, E: 9 };

export function syllablesOf(word) {
  let w = String(word).toLowerCase().replace(/[^a-z]/g, '');
  if (w.length > 3 && /[^aeiouy]e$/.test(w)) w = w.slice(0, -1);   // e câm: same, name, rule
  const out = []; let onset = '';
  for (const m of w.matchAll(/[aeiouy]+|[^aeiouy]+/g)) {
    if (/^[aeiouy]/.test(m[0])) { out.push({ onset, vowel: m[0] }); onset = ''; }
    else onset = m[0];
  }
  return out;
}

function vowelMouth(v, sylDur) {
  if (/oo|u|w/.test(v)) return V.U;
  if (v.includes('o')) return V.O;
  if (/ee|i|y/.test(v)) return V.EE;
  if (v.includes('a')) return sylDur >= 0.22 ? V.WIDE : V.OPEN;
  if (v.includes('e')) return V.E;
  return V.OPEN;
}

function onsetMouth(o) {
  const c = o.slice(-1);
  if ('mbp'.includes(c) && c) return V.REST;
  if ('sztdcjx'.includes(c) && c) return V.TEETH;
  return null;
}

/**
 * Đường bao giọng (stem lead-vocals) đã lượng tử 0..255 mỗi khung: { fps, t0, q }.
 * Sinh một lần bằng tools/analyze/vox_env.py → data/vox.json, nên vẫn là hàm thuần của t.
 */
export function makeEnv({ fps, t0 = 0, q }) {
  return { fps, at(t) { const i = Math.round((t - t0) * fps); return i >= 0 && i < q.length ? q[i] / 255 : 0; } };
}

/** v2: chỉnh độ mở theo mức giọng thật — nguyên âm vẫn quyết định hình. */
function byLevel(m, lv) {
  if (m === V.WIDE || m === V.OPEN) return lv >= 0.7 ? V.WIDE : lv >= 0.38 ? V.OPEN : V.E;
  if (m === V.O || m === V.U) return lv >= 0.55 ? V.O : V.U;
  if (m === V.E) return lv >= 0.7 ? V.OPEN : V.E;
  return m;
}

function shapeOf(wd, f, held) {
  const dur = Math.max(0.01, wd.end - wd.start);
  const syl = syllablesOf(wd.w);
  if (!syl.length) return V.OPEN;                       // "x", "99", "—": miệng hé
  if (f > 0.85 && !held) return V.CLOSE;
  const n = syl.length, si = Math.min(n - 1, Math.floor(f * n)), sf = f * n - si;
  const s = syl[si];
  if (sf < 0.2) { const om = onsetMouth(s.onset); if (om) return om; }   // phụ âm m/b/p vẫn khép môi kể cả khi hát lớn
  // 'e' đứng cuối từ ngắn (me, be, we) đọc là /i:/
  if (s.vowel === 'e' && si === n - 1 && /e$/i.test(wd.w)) return V.EE;
  return vowelMouth(s.vowel, dur / n);
}

/**
 * Khẩu hình tại t. `env` (tuỳ chọn, từ makeEnv): khi có, giọng gần tắt → khép miệng giữa âm tiết,
 * giọng lớn → há to hơn, và nốt ngân quá mốc cuối từ vẫn giữ miệng mở. Không có env → y hệt v1.
 */
export function mouthAt(t, words, env = null) {
  const lv = env ? env.at(t) : null;
  for (const wd of words) {
    if (t < wd.start || t >= wd.end) continue;
    const f = (t - wd.start) / Math.max(0.01, wd.end - wd.start);
    if (lv === null) return shapeOf(wd, f, false);
    if (lv < 0.12) return V.CLOSE;
    return byLevel(shapeOf(wd, f, lv >= 0.4), lv);
  }
  if (lv !== null && lv >= 0.4) {                       // ngân sau mốc cuối từ: giữ nguyên âm cuối
    const last = [...words].reverse().find(w => w.end <= t && t - w.end < 0.6);
    if (last) return byLevel(shapeOf(last, 0.99, true), lv);
  }
  return V.REST;
}
