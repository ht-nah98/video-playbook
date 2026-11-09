// hồi a3 · Tear down this wall (BRIEF-SCENES.md) — các nhà lãnh đạo Tây tới đứng cạnh Tường (cảnh vẽ) → ảnh tư liệu Reagan 12/6/1987
// (khung ảnh rồi tràn khung + câu trích thật) → khán giả vỗ tay → tường đứng im, thước "0 IN" → Honecker + bong bóng "50… EVEN 100 YEARS"
// → lưới 100 năm gạch còn lại một ô: "99 YEARS, 2 MONTHS". Người dẫn: không xuất hiện. Mốc theo TỪ (wd).
import * as S from '../../_kit/stage.js';
import * as C from '../../_kit/cast.js';
import { bubble, INK } from '../../_kit/mapkit.js';
import { P, SK, wall } from './common.js';

const { W, H, RED, clamp, lerp, hash, easeOut, ease, back } = S;
let g = null;
const kk = (X, t0, d = 0.25) => clamp((X - t0) / d);

function sky() { const gr = g.createLinearGradient(0, 0, 0, 880); gr.addColorStop(0, '#A9C4DA'); gr.addColorStop(1, '#E6E0CF'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.fillStyle = '#8F8E88'; g.fillRect(0, 900, W, 180); g.strokeStyle = '#767570'; g.lineWidth = 4; for (let y = 940; y < H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 900); g.lineTo(W, 900); g.stroke(); }
function flag(x, y, kind, X) { g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(x, y + 700); g.lineTo(x, y); g.stroke();
  const w = 230, h = 150; g.translate(x, y + 10); const cols = kind === 'de' ? ['#151515', '#C2343A', '#F3C61B'] : null;
  if (cols) cols.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * h / 3, w, h / 3 + 1); });
  else { for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? '#FFFFFF' : '#C2343A'; g.fillRect(0, i * h / 7, w, h / 7 + 1); } g.fillStyle = '#2B4C7E'; g.fillRect(0, 0, w * 0.42, h * 4 / 7); }
  g.lineWidth = 5; g.strokeRect(0, 0, w, h); g.restore(); }
function lectern(x, y) { g.save(); g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#8A5E3C'; g.beginPath(); g.moveTo(x - 130, y); g.lineTo(x + 130, y); g.lineTo(x + 105, y + 290); g.lineTo(x - 105, y + 290); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#1C1C1F'; g.fillRect(x - 6, y - 34, 12, 34); g.beginPath(); g.ellipse(x, y - 46, 16, 22, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
function plainStage() { g.fillStyle = '#4B5A6E'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < 8; i++) g.fillRect(i * 260, 0, 130, H); }

export default K => { g = K.g; const { IM, LT, wd, ST } = K;
  const F = 'For decades', J = 'In June nineteen', G1 = 'It was a great line', Hn = 'In January nineteen', O = 'He was off by';
  const tG = wd(G1, 'wall') - 0.3;                                            // "the Wall did not move an inch"
  return [
    // ── 0. các nhà lãnh đạo tới Berlin · ba người mặc vest đứng cạnh Tường Tây (graffiti), cờ hai bên · tiếng: bước chân, nhạc nghi lễ
    [ST(F), (t, X) => { sky(); wall(0, 1920, 900, 520, { west: true, seed: 6 }); flag(150, 160, 'de', X); flag(1780 - 230, 160, 'us', X);
      [[560, 'bowler', 0], [960, 'top', 0.4], [1360, null, 0.8]].forEach(([x, wr, d], i) => { const k = kk(X, ST(F) + 0.3 + d, 0.4); if (k > 0) C.folk(x + (1 - easeOut(k)) * (i === 1 ? 0 : (i ? 700 : -700)), 1020, 560, { skin: SK, coat: 'suit', wear: wr, eyes: 'dot', mouth: 'grin', look: 0 }); }); }],
    // ── 1. "say something memorable" · một người ra bục, bong bóng nảy ở "memorable" · tiếng: mic gõ, vỗ tay thưa
    [wd(F, 'stand') - 0.2, (t, X) => { sky(); wall(0, 1920, 900, 520, { west: true, seed: 6 }); flag(150, 160, 'de', X); flag(1780 - 230, 160, 'us', X);
      C.folk(960, 1000, 560, { skin: SK, coat: 'suit', wear: 'top', eyes: 'dot', mouth: X > wd(F, 'say') ? 'o' : 'grin', arm: X > wd(F, 'memorable') ? 'up' : null }); lectern(960, 770);
      bubble(g, 'SOMETHING MEMORABLE', 1120, 290, 1000, 470, kk(X, wd(F, 'memorable'), 0.3), 48); }],
    // ── 2a. Reagan 1987 · khung ảnh tư liệu trên nền tối, "JUNE / 1987" nảy theo từ, thẻ tên ở "Ronald" · tiếng: gió, đám đông xa
    [ST(J), (t, X) => { g.fillStyle = '#14161C'; g.fillRect(0, 0, W, H);
      S.photo(IM.p_reagan, 1400, 540, 640, kk(X, ST(J), 0.4), { rot: 0.0 });
      S.label('JUNE', 440, 330, 170, kk(X, wd(J, 'june'), 0.3), '#FFFFFF', { stroke: '#000' }); S.label('1987', 440, 520, 170, kk(X, wd(J, 'eighty-seven') - 0.1, 0.15), '#FFFFFF', { stroke: '#000' });
      S.nameTag('RONALD REAGAN', kk(X, wd(J, 'ronald'), 0.3), 70, 880); S.nameTag('12 JUNE 1987', kk(X, wd(J, 'ronald'), 0.3), 70, 950);
      S.credit('Photo: White House Photographic Office · public domain (via Wikimedia Commons)'); }],
    // ── 2b. câu trích thật · ảnh tràn khung, từng từ nảy lên; "WALL!" đóng dấu · tiếng: giọng đọc, vang
    [wd(J, 'mister') - 0.25, (t, X) => { S.photoBg(IM.p_reagan, t, { fy: 0.585, dark: 0.18, push: 0.01 }); g.fillStyle = 'rgba(10,12,20,0.35)'; g.fillRect(0, 60, W, 470);
      S.label('MR. GORBACHEV,', 960, 175, 110, kk(X, wd(J, 'mister'), 0.3), '#FFFFFF', { stroke: '#000' });
      S.label('TEAR DOWN', 960, 325, 140, kk(X, wd(J, 'tear'), 0.3), '#FFFFFF', { stroke: '#000' });
      S.label('THIS', 600, 480, 150, kk(X, wd(J, 'this'), 0.3), '#FFFFFF', { stroke: '#000' });
      S.label('WALL!', 1180, 480, 170, kk(X, wd(J, 'wall'), 0.3), '#F3C61B', { stroke: '#000' });
      S.credit('Photo: White House Photographic Office · public domain (via Wikimedia Commons)'); }],
    // ── 3a. "great line" · khán giả vẽ vỗ tay (nảy), chữ GREAT LINE nảy theo từ · tiếng: vỗ tay
    [ST(G1), (t, X) => { plainStage(); C.crowd(60, 1860, 1060, 420, X, { rows: 2, cheer: true, wears: ['top', 'cap', null, 'scarf', 'bowler', null], coats: ['suit', 'plain', 'worker'] });
      S.label('GREAT', 640, 300, 190, kk(X, wd(G1, 'great'), 0.3), '#FFFFFF', { stroke: '#111' }); S.label('LINE.', 1290, 300, 190, kk(X, wd(G1, 'line'), 0.3), '#F3C61B', { stroke: '#111' }); }],
    // ── 3b. tường đứng im · lời "tear down" dội vào tường rồi tan; thước đo 0 IN · tiếng: vang dội, boing, im lặng
    [tG, (t, X) => { sky(); wall(700, 1540, 900, 420, { west: true, seed: 7 });
      C.folk(130, 1000, 330, { skin: SK, coat: 'suit', eyes: 'dot', mouth: 'o', arm: 'up' });
      for (let j = 0; j < 4; j++) { const ph = ((X - tG) * 1.1 + j * 0.25) % 1, r = 120 + ph * 520; g.save(); g.strokeStyle = `rgba(40,60,90,${0.7 * (1 - ph)})`; g.lineWidth = 10; g.beginPath(); g.arc(150, 760, r, -0.55, 0.55); g.stroke(); g.restore(); }
      g.save(); g.fillStyle = '#F3C61B'; g.strokeStyle = INK; g.lineWidth = 6; g.fillRect(470, 935, 170, 70); g.strokeRect(470, 935, 170, 70); g.beginPath(); g.moveTo(640, 960); g.lineTo(700, 960); g.stroke(); g.fillStyle = RED; g.fillRect(692, 945, 14, 30); g.restore();
      S.label('0 IN', 1120, 280, 230, kk(X, wd(G1, 'inch'), 0.3), RED, { stroke: '#FFFFFF' }); }],
    // ── 4a. Honecker, tháng 1/1989 · tự tin cạnh tường Đông xám, lịch "JANUARY 1989" · tiếng: tờ lịch xoẹt, giọng hách dịch
    [ST(Hn), (t, X) => { sky(); wall(900, 1900, 900, 440, { west: false, seed: 8 });
      P.honecker(560, 1010, 620, { eyes: 'dot', mouth: 'grin' });
      S.label('JANUARY 1989', 960, 170, 110, kk(X, wd(Hn, 'january'), 0.3), '#FFFFFF', { stroke: '#222' }); }],
    // ── 4b. "as long as the reasons remain" · bong bóng diễn ý · tiếng: giọng đều đều
    [wd(Hn, 'said') - 0.1, (t, X) => { sky(); wall(900, 1900, 900, 440, { west: false, seed: 8 });
      P.honecker(560, 1010, 620, { eyes: 'dot', mouth: 'o' });
      bubble(g, 'THE REASONS REMAIN', 1230, 280, 700, 500, kk(X, wd(Hn, 'reasons') - 0.3, 0.3), 56); }],
    // ── 4c. "fifty… even a hundred years" · bong bóng thứ hai, chữ nối thêm ở "even" · tiếng: pop, tự mãn
    [wd(Hn, 'fifty') - 0.2, (t, X) => { sky(); wall(900, 1900, 900, 440, { west: false, seed: 8 });
      P.honecker(560, 1010, 620, { eyes: 'dot', mouth: 'grin' });
      bubble(g, X < wd(Hn, 'even') ? '50 YEARS...' : '50... EVEN 100 YEARS', 1280, 280, 700, 500, kk(X, wd(Hn, 'fifty'), 0.3), 62); }],
    // ── 5. "off by ninety-nine years" · lưới 100 năm gạch dần chỉ còn một ô; Honecker toát mồ hôi, bong bóng biến mất · tiếng: tích tắc nhanh, tút buồn
    [ST(O), (t, X) => { sky(); const tn = wd(O, 'ninety-nine'), ty = wd(O, 'years');
      P.honecker(560, 1010, 620, { eyes: X > tn ? 'shock' : 'dot', mouth: X > tn ? 'o' : 'flat', sweat: X > tn });
      S.label('100 YEARS', 1400, 160, 100, kk(X, ST(O), 0.3), '#222', { stroke: '#FFFFFF' });
      const n = Math.floor(clamp((X - tn) / (ty - tn + 0.4)) * 99);
      for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), x = 1050 + c * 70, y = 220 + r * 70, dead = i < n;
        g.fillStyle = dead ? '#B9B8B2' : '#F3D36B'; g.strokeStyle = INK; g.lineWidth = 3; g.fillRect(x, y, 64, 64); g.strokeRect(x, y, 64, 64);
        if (dead) { g.strokeStyle = '#7A7870'; g.beginPath(); g.moveTo(x + 8, y + 8); g.lineTo(x + 56, y + 56); g.moveTo(x + 56, y + 8); g.lineTo(x + 8, y + 56); g.stroke(); }
        if (i === 99 && X > tn + 0.2) { g.strokeStyle = RED; g.lineWidth = 8; g.strokeRect(x - 4, y - 4, 72, 72); } }
      S.label('99 YEARS, 2 MONTHS', 1400, 1000, 80, kk(X, wd(O, 'two') - 0.2, 0.3), RED, { stroke: '#FFFFFF' }); }],
  ];
};
