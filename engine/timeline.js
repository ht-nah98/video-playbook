// Tra lời hát theo thời gian và theo CHỮ — không bao giờ gõ mốc tay trong cảnh.
// Dữ liệu: projects/<tên>/data/timeline.json (lời gốc ghép vào mốc forced alignment).
// Tra sai phải ném lỗi có tên dòng: cảnh trống im lặng là lỗi đắt nhất đã gặp
// (docs/LESSONS.md §7).

const key = s => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

export function makeTimeline(json) {
  const lines = json.lines.map(l => ({ ...l, words: l.words.map(w => ({ ...w })) }));
  const sections = json.sections.map(s => ({ ...s }));
  return {
    lines, sections,
    line(text, nth = 1) {
      const k = key(text);
      let n = 0;
      for (const l of lines) if (key(l.text) === k && ++n === nth) return l;
      throw new Error(`timeline: không có dòng "${text}" lần ${nth} (tìm thấy ${n} lần)`);
    },
    at(text, nth = 1) { return this.line(text, nth).start; },
    lineAt(t) {
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        if (t >= l.start) return t < l.end + 0.6 ? l : null;
      }
      return null;
    },
    sectionAt(t) {
      for (const s of sections) if (t >= s.start && t < s.end) return s;
      return null;
    },
    wordsOf(line) { return line.words.map(w => ({ ...w })); },
  };
}

/** Nạp trong trình duyệt. */
export async function loadTimeline(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`timeline: không tải được ${url} (${r.status})`);
  return makeTimeline(await r.json());
}
