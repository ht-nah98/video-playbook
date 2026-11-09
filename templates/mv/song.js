// Dữ liệu RIÊNG của bài __TITLE__. Mốc LỜI: data/timeline.json qua engine/timeline.js — KHÔNG gõ mốc lời ở đây.
// Chỉ mốc NHẠC CỤ (không có trong lời) được khai báo, kèm nguồn (data/stems.json, data/music.json).
import { makeBeat } from '../../engine/lib.js';
import { loadTimeline } from '../../engine/timeline.js';

export const SONG = { title: __TITLE_JS__, audio: 'audio/song.m4a', duration: __DUR__, fps: 60 };

// Bảng màu: CHỖ TRỐNG — thay bằng DNA.md §2 của bài này. Giá trị dưới là của exp-log chỉ để khung chạy được;
// tên vai (fwd/back/truth…) cũng đổi theo nghĩa màu của bài. Đo tương phản nhân vật/nền (LESSONS §13).
export const PAL = {
  bg: '#0B0F1E', halo: '#16203A', fwd: '#FFB547', fwdCore: '#FFE3A3',
  back: '#3FB8FF', backCore: '#BDE8FF', truth: '#F4F1EA', block: '#FF4D5E',
  paper: '#F2EEE4', ink: '#1E2230',
};

// data/music.json: bpm + downbeat đầu (tools/analyze/run.sh)
export const beat = makeBeat({ bpm: __BPM__, t0: __T0__ });

// data/stems.json: mốc nhạc cụ (TREATMENT § Mốc nhạc cụ cụ thể)
export const CUE = {};

export async function loadSong() {
  return { tl: await loadTimeline('./data/timeline.json') };
}
