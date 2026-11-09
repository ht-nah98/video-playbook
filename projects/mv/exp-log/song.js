// Dữ liệu RIÊNG của bài "Ninety-nine percent" (luỹ thừa ⇄ logarit).
// Mốc lời: data/timeline.json qua engine/timeline.js — KHÔNG gõ mốc lời ở đây.
// Chỉ mốc NHẠC CỤ (không có trong lời) được khai báo, kèm nguồn.
import { makeBeat } from '../../../engine/lib.js';
import { loadTimeline } from '../../../engine/timeline.js';
import { line } from '../../../engine/mirror.js';

export const SONG = { title: 'Ninety-nine percent', audio: 'audio/song.m4a', duration: 239.65, fps: 60 };

// TREATMENT § Bảng màu
export const PAL = {
  bg: '#0B0F1E', halo: '#16203A', fwd: '#FFB547', fwdCore: '#FFE3A3',
  back: '#3FB8FF', backCore: '#BDE8FF', truth: '#F4F1EA', block: '#FF4D5E',
  paper: '#F2EEE4', ink: '#1E2230',
};

// data/music.json: 112.00 BPM, tin cậy 3.28×, downbeat đầu 0.184s
export const beat = makeBeat({ bpm: 112, t0: 0.184 });

// data/stems.json (TREATMENT § Mốc nhạc cụ cụ thể)
export const CUE = {
  fx0: 1.81,                                           // other: tiếng vút mở màn
  keysPrint: [1.87, 2.13, 2.40, 2.67, 2.97, 3.24],     // keyboard: in chân dung
  keysCubes: [4.54, 4.83, 5.34, 5.64, 6.14, 6.41, 6.68, 6.99], // keyboard: 8 khối
  drop: 12.52,                                         // drums + brass vào cùng lúc
  brass: 29.81,                                        // brass: nốt nhấn ở "Zero has no choice" — khoá đóng
};

// Đường y = x trên màn hình: 45°, qua tâm khung (960, 540).
export const MIRROR = line(420, 1080, 1500, 0);

export async function loadSong() {
  return { tl: await loadTimeline('./data/timeline.json') };
}
