// Dữ liệu RIÊNG của bài Add It Up. Mốc LỜI: data/timeline.json qua engine/timeline.js — KHÔNG gõ mốc lời ở đây.
// Chỉ mốc NHẠC CỤ (không có trong lời) được khai báo, kèm nguồn (data/stems.json, data/music.json).
import { makeBeat } from '../../../engine/lib.js';
import { loadTimeline } from '../../../engine/timeline.js';

export const SONG = { title: "Add It Up", audio: 'audio/song.m4a', duration: 233.2, fps: 60 };

// Bảng màu: 4 mực riso + giấy (DNA.md §2). In chồng bằng multiply; màu thứ 5 trở đi chỉ sinh ra từ in chồng.
export const PAL = {
  paper: '#F2EDE4',
  pink: '#FF48B0',    // thay đổi / tốc độ / đầu vào
  blue: '#0078BF',    // tích luỹ / tổng
  yellow: '#FFE800',  // hằng số C — ký ức đã mất
  key: '#1F1D24',     // chữ, trục, nét (K = key plate)
};
export const INKS = { yellow: PAL.yellow, pink: PAL.pink, blue: PAL.blue, key: PAL.key };   // thứ tự lượt in

// data/music.json: bpm 97.00 (tin cậy 5.31×), downbeat đầu 0.155
export const beat = makeBeat({ bpm: 97, t0: 0.155 });

// data/stems.json — mốc nhạc cụ (TREATMENT § Mốc nhạc cụ cụ thể). Onset = env vượt ngưỡng sau trũng.
export const CUE = {
  kbIntro: [0.20, 0.50, 2.04],                                         // keyboard
  kbTwins: [4.49, 5.12, 5.75, 6.65, 6.97, 7.90, 8.20, 9.13],           // keyboard
  guitar: [10.06, 10.68, 10.98, 11.62, 11.93, 12.24, 12.53, 13.16, 13.47],
  drumsIn: 15.00,                                                      // drums vào lần đầu
  build: [52.12, 52.43, 52.74, 53.05, 53.36],                          // drums dồn trước điệp khúc 1
  breakPerc: [134.39, 135.63, 136.87, 138.10, 139.34],                 // percussion của Break
  silence: [139.94, 143.52],                                           // mọi nhạc cụ im (tổng stem < 0.004)
  drumsBack: 143.67,
  switchPerc: [148.02, 150.50, 152.97, 154.20, 155.44, 156.67, 157.92, 159.15],
  fx: 212.33,                                                          // other (FX) trước tiếng hô
  hookPerc: [221.01, 223.48, 224.72, 225.95, 227.19],
  end: 233.20,
};

export async function loadSong() {
  const tl = await loadTimeline('./data/timeline.json');
  const st = await (await fetch('./data/stems.json')).json();
  const fps = st.fps, dr = st.stems.drums.env, pk = Math.max(...dr) || 1;
  // độ rung lệch khuôn theo trống: đường bao drums chuẩn hoá theo đỉnh (hàm thuần của t)
  const drums = t => { const i = Math.round(t * fps); return i >= 0 && i < dr.length ? dr[i] / pk : 0; };
  return { tl, drums };
}
