// Đồ nghề chung của các cảnh trong bài này: gắn bảng màu của bài vào các hàm của engine.
import { footerLine } from '../../engine/lyric.js';
import { PAL } from './song.js';

export { figure } from '../../engine/transit.js';
/** Lời chân khung. burst = { from: this.t0, carry, at, dur } — luật ở engine/lyric.js footerPlan. */
export const footer = (g, tl, t, keys, burst = {}) => footerLine(g, tl, t, keys, { colBase: PAL.truth, colKey: PAL.fwd, ...burst });
