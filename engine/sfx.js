// Gợi ý tiếng hiệu ứng (cue) cho video bài học — thuần hàm, không DOM. Trang gom cue → shoot.js `cues` → tools/sfx/mix.py.
// Thư viện: assets/sfx/<kind>/*.wav + assets/sfx/library.json. Luật dùng: docs/lesson/SFX.md.
export const KINDS = ['type', 'tick', 'pop', 'snap', 'whoosh', 'whoosh-long', 'shimmer', 'impact', 'error', 'correct', 'question', 'beep', 'pen', 'page', 'tear', 'coin', 'chip', 'flap', 'buzzer', 'door', 'goat', 'card', 'dice', 'wood', 'hyoshigi', 'soroban', 'hanko', 'suzu', 'taiko', 'koma', 'glass', 'crack', 'amado', 'zap', 'gacha', 'reel'];

// Một tiếng gõ cho mỗi ký tự (trừ khoảng trắng) đúng lúc kit.typed(g, s, …, prog(t, a, b)) lộ ký tự đó.
// Gõ nhanh thì mix.py tự bỏ bớt tiếng sát nhau (gap trong library.json).
export function typeCues(s, a, b, kind = 'type') {
  const out = [];
  for (let i = 1; i <= s.length; i++) if (s[i - 1].trim()) out.push({ t: +(a + (b - a) * (i - 0.5) / s.length).toFixed(3), kind });
  return out;
}

// Cue cả trang (giờ TRANG = giờ timeline + lead). Chuyển cảnh tự có tiếng: cùng ERA (trang trượt) → whoosh,
// khác ERA (vòng loang) → whoosh-long. Cảnh đặt `TRANSITION = 'kind'` để đổi, `= null` để tắt.
// Cảnh tự khai báo thêm qua sfx() → [{ t (giờ timeline), kind, db? }].
export function collectCues(plates, lead) {
  const out = [];
  plates.forEach((p, j) => {
    if (j) {
      const auto = p.constructor.ERA === plates[j - 1].constructor.ERA ? 'whoosh' : 'whoosh-long';
      // CONTINUES (cắt thẳng, cùng hình — LESSONS §50) thì không có cú trượt nào để nghe: mặc định im.
      const kind = p.TRANSITION === undefined ? (p.CONTINUES ? null : auto) : p.TRANSITION;
      if (kind) out.push({ t: p.FROM, kind });
    }
    for (const c of p.sfx?.() || []) out.push({ ...c });
  });
  for (const c of out) {
    if (!KINDS.includes(c.kind)) throw new Error(`sfx: loại tiếng lạ "${c.kind}" (có: ${KINDS.join(', ')})`);
    c.t = +(c.t + lead).toFixed(3);
  }
  return out.sort((x, y) => x.t - y.t);
}
