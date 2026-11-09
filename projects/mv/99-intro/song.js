// Dữ liệu RIÊNG của bài "99% 로딩 중" (anhht). Engine không biết gì về bài này.
// Mỗi MV mới = một file như thế này + thư mục plates/ riêng.
import { makeBeat, makeVox } from '../../../engine/lib.js';

export const SONG = {
  title: '99% 로딩 중',
  artist: 'anhht',
  audio: 'audio/loading.mp3',
  duration: 25.968,
  fps: 60,
};

// BPM xác minh bằng grid-energy scoring: 78.97 đạt 3.71x baseline.
// (Metadata mp3 khai 118 BPM — SAI, chỉ đạt 1.76x.)
export const beat = makeBeat({ bpm: 78.97, t0: 0.731 });

// Mốc từng từ — forced alignment trên stem giọng đã tách (Demucs + whisper + CTC).
// Xem docs/mv/PIPELINE.md § Căn lời. Lời khác metadata mp3: có "uh loading loading
// yeah", và "from scratch" chỉ hát MỘT lần.
export const vox = makeVox({
  starts: [0.0, 0.66, 4.28, 4.68, 6.9, 7.3, 7.84, 8.28, 8.843, 9.103, 9.263, 9.363, 9.76, 9.88, 10.143, 10.34, 10.8, 11.143, 11.24, 11.624, 11.7, 11.864, 12.044, 12.664, 12.884, 13.184, 13.18, 13.54, 13.7, 13.884, 14.024, 14.184, 14.38, 14.72, 14.92, 15.1, 15.38, 15.48, 16.02, 16.58, 20.9],
  ends: [0.66, 1.3, 4.68, 5.08, 7.3, 7.7, 8.2, 8.6, 9.083, 9.223, 9.283, 9.763, 9.88, 10.0, 10.523, 10.8, 10.9, 11.344, 11.44, 11.784, 11.8, 12.024, 12.604, 12.724, 13.104, 13.244, 13.52, 13.7, 13.8, 14.004, 14.104, 14.645, 14.72, 14.92, 15.1, 15.26, 15.48, 16.02, 16.58, 17.46, 21.3],
  words: ["99", "%", "99", "%", "uh", "loading", "loading", "yeah", "start", "with", "a", "question", "break", "it", "down", "lines", "turn", "numbers", "move", "watch", "it", "come", "around", "no", "tricks", "no", "guessing", "build", "it", "from", "the", "ground", "why", "does", "it", "work", "from", "scratch", "99", "%", "loading"],
});

// Mốc cảnh — mỗi cảnh bắt đầu đúng khung hình từ khoá của nó được hát.
// Kiểm bằng: node tools/check-timing.mjs
export const P = {
  dial: 0.00,      // "99%" ×2 — intro giọng máy
  dot: 6.90,       // "uh loading loading yeah" → "start with a question"
  break_: 9.76,    // "break it down"           (0.58s — đúng độ dài câu hát)
  rotate: 10.34,   // "lines turn / numbers move / watch it come around"
  erase: 12.66,    // "no tricks, no guessing, build it from the ground"
  question: 14.38, // "why does it work"
  stamp: 15.38,    // "from scratch" → "99%"    — cú chốt
  lattice: 17.46,  // hết lời — cao trào không lời
  close: 20.90,    // "loading" cuối + hard stop
  end: 25.968,
};

export const DUR = SONG.duration;
