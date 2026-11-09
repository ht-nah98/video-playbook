// berlin (bản v3, người dùng chọn 11-02): hai lớp đè lên mọi cảnh (người dùng 11-02: thiếu phim thật, thiếu chuyển động).
// INSERTS = phim tư liệu PD chèn đúng câu lời; camera() trôi nhẹ trong đoạn tĩnh; life() thêm đèn flash họp báo, đèn pha + hơi thở đêm Bornholmer. Tất định: hash theo khung.
import * as S from '../../_kit/stage.js';
import { INK } from '../../_kit/mapkit.js';
const { W, H, clamp, hash, easeOut } = S;
let g = null, IM = null, INS = [];
const inR = (X, R) => R.some(([a, b]) => X >= a && X < b);
export function bindLife(ctx, K) { g = ctx; IM = K.IM; const st = p => K.LT(p).start, en = p => K.LT(p).end;
  // [từ, đến, phim, nhãn, chú thích nguồn]
  const WALL = 'Film: "The Wall", Universal News, 1962 (public domain)', AIR = 'Film: "Berlin Airlift", UK Central Office of Information (public domain)', CIA = 'Film: aerial view of divided Berlin, 1961 (public domain)';
  // Phim nối phim, không để hở giữa hai câu; đầu / cuối chèn ăn trọn mẩu cảnh vẽ < 1 s (người dùng 11-02: hình vẽ chớp 0,5 s giữa phim như lỗi edit, LESSONS §242).
  const WAKE = st('Families woke up'), RG = st('In June nineteen eighty-seven');
  INS = [[st('Pretty soon') - 0.22, st('Pretty soon') + 4, 'i_air', 'THE BERLIN AIRLIFT · 1948', AIR],
    [st('West Berlin was left') - 0.22, en('West Berlin was left') - 2.0, 'i_island', 'WEST BERLIN', CIA],
    [en('So at midnight') - 2.4, st('They tore up'), 'i_police', null, WALL], [st('They tore up'), st('They tore up') + 3.0, 'i_wire', null, WALL], [st('They tore up') + 3.0, st('Berliners still call'), 'i_brand', 'THE WALL GOES UP', WALL],
    [st('Berliners still call'), WAKE, 'i_traps', 'BARBED WIRE SUNDAY', WALL], [WAKE, WAKE + 3.4, 'i_windows', 'WINDOWS BRICKED UP · BERNAUER STRASSE', WALL],
    [st('Over the years') + 5.2, en('Over the years') + 0.4, 'i_aerial', 'THE DEATH STRIP · FROM THE AIR', CIA], [st('At least a hundred') + 4.2, en('At least a hundred'), 'i_memorial', null, WALL],
    [st('For decades') + 1.4, RG, 'i_jfk', 'KENNEDY · BERLIN, 1963', 'Film: "One Day in Berlin", USIA, 1963 (public domain)'], [RG, en('In June nineteen eighty-seven') + 0.26, 'i_reagan', 'REAGAN · 12 JUNE 1987', 'Film: Reagan Presidential Library (public domain)']]; }
export const DRIFT = [[366, 446], [483, 554], [557, 613]];
/** camera trôi: gọi trước khi vẽ cảnh; u = giây trong cảnh, i = số cảnh */
export function camera(X, u, i) { if (!inR(X, DRIFT)) return; const k = clamp(u / 9), z = i % 2 ? 1.06 - 0.05 * k : 1.01 + 0.05 * k, px = (i % 3 - 1) * 14 * k; g.translate(960 + px, 540); g.scale(z, z); g.translate(-960, -540); }
const FLASH = [[366, 370], [374, 398], [430, 438]], NIGHT = [[483, 503], [522, 527], [534, 546]];
export function life(X) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  if (inR(X, FLASH)) { const slot = Math.floor(X / 0.42), u = (X / 0.42 - slot) * 0.42; if (hash(slot * 7) > 0.35 && u < 0.12) { const x = 120 + hash(slot * 13) * 1680, y = 720 + hash(slot * 17) * 240; S.flash(x, y, u / 0.12, 120); g.fillStyle = `rgba(255,255,255,${0.1 * (1 - u / 0.12)})`; g.fillRect(0, 0, W, H); } }
  if (inR(X, NIGHT)) { g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { const a = Math.sin(X * (0.35 + i * 0.09) + i * 2.1) * 0.5 + (i - 1) * 0.5, x0 = 360 + i * 600; g.fillStyle = 'rgba(190,210,255,0.09)'; g.beginPath(); g.moveTo(x0, 560); g.lineTo(x0 + Math.sin(a) * 900 - 110, -40); g.lineTo(x0 + Math.sin(a) * 900 + 110, -40); g.closePath(); g.fill(); } g.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 26; i++) { const p = (X * 0.45 + hash(i) * 3) % 1, x = hash(i + 9) * 1500 + 60 + Math.sin(X + i) * 10, y = 700 - p * 170; g.fillStyle = `rgba(255,255,255,${0.17 * (1 - p)})`; g.beginPath(); g.ellipse(x, y, 16 + p * 26, 10 + p * 15, 0, 0, 7); g.fill(); } }
  for (const [a, b, k, lab, cr] of INS) { if (X < a || X >= b) continue; const fr = IM.film[k], u = X - a, im = fr[Math.min(fr.length - 1, Math.floor(u * 12))], z = 1.06 + 0.012 * u, s = Math.max(W / im.width, H / im.height) * z, w = im.width * s, h = im.height * s; g.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
    const f = Math.floor(X * 24); g.fillStyle = 'rgba(255,255,255,0.10)'; for (let i = 0; i < 26; i++) g.fillRect(hash(i + f * 41) * W, hash(i + f * 77) * H, 1 + 2 * hash(i + f), 2 + 70 * hash(i * 3 + f));
    if (lab) S.nameTag(lab, clamp(u / 0.2)); S.credit(cr);
    if (k === 'i_reagan') S.label('"TEAR DOWN THIS WALL!"', 960, 170, 96, clamp((X - (b - 3.26)) / 0.2), '#FFE04A', { stroke: INK }); }
  g.restore(); }
