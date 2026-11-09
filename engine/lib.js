// Tiện ích dùng chung cho MỌI MV. Không chứa gì riêng của một bài hát.
// Mốc thời gian, lyrics, bảng màu riêng → đặt ở projects/<tên>/song.js
//
// Luật bất di bất dịch: mọi thứ ở đây là HÀM THUẦN của t.
// Cấm Math.random / Date.now / performance.now — render lấy nhiều sub-frame
// mỗi khung theo thứ tự bất kỳ, nên hàm không thuần sẽ cho kết quả khác nhau
// giữa hai lần chạy.

export const W = 1920, H = 1080;

// ---- easing ----
export const clamp = (x, a = 0, b = 1) => x < a ? a : x > b ? b : x;
export const lerp = (a, b, k) => a + (b - a) * k;
export const smooth = t => t * t * (3 - 2 * t);
export const outExpo = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const inExpo = t => t <= 0 ? 0 : Math.pow(2, 10 * (t - 1));
// Kẹp đầu/cuối: công thức ra 2.2e-16 ở t = 0 (sai số dấu phẩy động) làm mọi phép kiểm `outBack(...) > 0` luôn đúng.
export const outBack = (t, s = 1.70158) => { if (t <= 0) return 0; if (t >= 1) return 1; const u = t - 1; return 1 + u * u * ((s + 1) * u + s); };
export const outCubic = t => 1 - Math.pow(1 - t, 3);
export const inOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const prog = (t, a, b, e = x => x) => e(clamp((t - a) / (b - a)));

// ---- ngẫu nhiên TẤT ĐỊNH (cùng i luôn cho cùng giá trị) ----
export function hash(n) { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }
/** Chỉ số khung ở 60fps — dùng cho nhấp nháy, KHÔNG dùng Math.floor(t*60). */

// ---- bảng màu: mỗi màu đúng MỘT vai ----
// Bảng màu C là của 99-intro (projects/mv/99-intro/DNA.md). Mỗi MV khai bảng màu riêng trong song.js (docs/DNA.md).
export const C = {
  navy: '#05070f',      // nền, mặt giấy
  gold: '#d4a017',      // nét vừa vẽ, còn nóng
  goldHot: '#ffc94d',   // đầu bút + từ đang hát (màu DUY NHẤT được bloom)
  teal: '#2fe0d0',      // đã dựng xong, đã đúng
  bone: '#e8e4da',      // chữ, nhãn — luôn sắc
  boneDim: 'rgba(232,228,218,0.34)', // đường phụ trợ
};

// ---- font: vai trò cố định cho mọi MV ----
export const FONT = {
  mono: '"IBM Plex Mono", "DejaVu Sans Mono", monospace',
  serif: '"Cormorant Garamond", Georgia, serif',
};
export const mono = (px, w = 400) => `${w} ${px}px ${FONT.mono}`;
export const serifIt = (px, w = 500) => `italic ${w} ${px}px ${FONT.serif}`;

/**
 * Tạo bộ hàm nhịp cho một bài hát cụ thể.
 * Tách khỏi lib vì mỗi MV có BPM và downbeat riêng.
 */
export function makeBeat({ bpm, t0 }) {
  const BEAT = 60 / bpm, BAR = 4 * BEAT;
  return {
    BPM: bpm, BEAT, BAR, T0: t0,
    beatT: n => t0 + n * BEAT,
    barT: n => t0 + n * BAR,
    beatIndex: t => Math.floor((t - t0) / BEAT),
    beatOf: n => t0 + n * BEAT,
    sinceBeat(t) { const k = (t - t0) / BEAT; return k < 0 ? 999 : (k - Math.floor(k)) * BEAT; },
    /** 1 ngay tại beat, tắt dần trong `hold` giây. Dùng cho scale/alpha của NỀN. */
    onBeat(t, hold = 0.16) { return Math.max(0, 1 - this.sinceBeat(t) / hold); },
    /** Xung theo beat, tắt theo hàm mũ. */
    beatPulse(t, halfLife = 0.14) {
      const k = (t - t0) / BEAT; if (k < -0.5) return 0;
      return Math.pow(0.5, ((k - Math.floor(k)) * BEAT) / halfLife);
    },
  };
}

/**
 * Tạo bộ hàm tra lời hát từ bảng forced alignment.
 * LƯU Ý: giọng rap thường KHÔNG rơi vào beat (đo được chỉ 22% ở bài 99%).
 * Nên chữ bám hàm ở đây, còn nền bám makeBeat(). Xem docs/mv/SYNC.md § Hai hệ nhịp.
 */
export function makeVox({ starts, ends, words }) {
  return {
    VOX: starts, VOX_END: ends, VOX_W: words,
    /** Từ thứ i đã được hát tới đâu (0→1). */
    voxProg(t, i) {
      if (i < 0 || i >= starts.length) return 0;
      const a = starts[i], b = ends[i];
      return t < a ? 0 : t >= b ? 1 : (t - a) / (b - a);
    },
    /** Chỉ số từ đang/vừa được hát tại t, hoặc -1. */
    voxAt(t) {
      for (let i = starts.length - 1; i >= 0; i--) if (t >= starts[i]) return i;
      return -1;
    },
    /** Thời điểm bắt đầu của một cụm từ — tra theo LỜI, không gõ số tay. */
    wordAt(phrase, after = 0) {
      const toks = phrase.toLowerCase().split(/\s+/);
      for (let i = 0; i + toks.length <= words.length; i++) {
        if (starts[i] < after) continue;
        let ok = true;
        for (let j = 0; j < toks.length; j++) if (words[i + j] !== toks[j]) { ok = false; break; }
        if (ok) return starts[i];
      }
      return null;
    },
    /** Độ "nóng" của từ vừa hát (1 ngay lúc vào, tắt dần) — để nhấn chữ. */
    voxHot(t, hold = 0.42) {
      const i = this.voxAt(t);
      return i < 0 ? 0 : Math.max(0, 1 - (t - starts[i]) / hold);
    },
  };
}
