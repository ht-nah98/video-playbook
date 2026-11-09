// Trang vẽ clip "đánh nhau" (kịch bản: fight-scene.js). run(step): step = 0 → nhân vật 60 hình / giây (mượt nội suy);
// step = 24 → nhân vật + con số + hiệu ứng lấy giờ lượng tử 1/24 s ("vẽ trên 24" như Becker), camera vẫn 60 (study 10 B).
import { stick } from '../../engine/stick.js';
import { actor, num, HITS, DUST, H, DIR, GY, NW, SCENE } from './fight-scene.js';
import { hero, INK, PAPER } from '../../engine/hero.js';
import { NOOP as noop } from '../../engine/stickmove.js';

const BLUE = '#2F6DB5', RULE = 'rgba(47,109,181,0.16)', MARGIN = 'rgba(217,72,30,0.35)';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;

export function run(step) {
  const g = document.getElementById('cv').getContext('2d');
  let fontsReady = false, GL = null;
  Promise.all([new FontFace('Archivo', 'url("../../assets/fonts/Archivo[wdth,wght].ttf")', { weight: '100 900' }).load()
    .then(f => document.fonts.add(f)).catch(() => {})]).then(() => { fontsReady = true; });
  const F = '800 300px Archivo, sans-serif';
  const glyphs = () => {                                  // đo một lần sau khi có font: bề rộng 4 · 9 · %, co về NW
    if (GL) return GL; g.font = F; const ws = ['4', '9', '%'].map(c => g.measureText(c).width), sum = ws.reduce((a, b) => a + b, 0), k = NW / sum;
    let x = 0; GL = { k, parts: ['4', '9', '%'].map((c, i) => { const p = { c, x: x + ws[i] / 2 }; x += ws[i]; return p; }) }; return GL;
  };

  // ── camera: trôi chậm + đẩy vào và rung khi trúng + hai lần cắt cảnh ──
  function cam(t) {
    let cx = 960 + 18 * Math.sin(t * 0.5), cy = 540 + 6 * Math.sin(t * 0.37), z = 1 + 0.015 * Math.sin(t * 0.3);
    for (const h of HITS) { const d = t - h.t; if (d >= 0 && d < 0.45) { const e = Math.exp(-d * 9);
      z += 0.05 * h.size * e; cx += h.shake * e * Math.sin(d * 95); cy += h.shake * 0.7 * e * Math.sin(d * 77 + 1); } }
    if (t >= 6.07 && t < 6.6) { cx = 1400; cy = 520; z = 0.8; }                       // CẮT: toàn cảnh, thấy số văng
    else if (t >= 6.6) { cx = 1000 + 10 * Math.sin(t * 0.5); cy = 640; z = 1.22; }     // CẮT: cận người thắng
    return { cx, cy, z };
  }

  function paperWorld() {
    g.fillStyle = PAPER; g.fillRect(-1200, -800, 4800, 2800);
    g.strokeStyle = RULE; g.lineWidth = 2; for (let y = -760; y < 1900; y += 48) { g.beginPath(); g.moveTo(-1200, y); g.lineTo(3600, y); g.stroke(); }
    g.strokeStyle = MARGIN; g.lineWidth = 3; g.beginPath(); g.moveTo(160, -800); g.lineTo(160, 2000); g.stroke();
    g.strokeStyle = 'rgba(34,48,60,0.55)'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(-1200, GY); g.lineTo(3600, GY); g.stroke();
  }

  function drawNum(s, ghost = 1) {
    if (s.a <= 0) return; const G = glyphs();
    g.save(); g.globalAlpha *= ghost; g.translate(s.x + NW / 2, s.y); g.rotate(s.rot); g.scale(s.sx * G.k, s.sy * G.k);
    g.font = F; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
    const off = [[-160, -80, -2], [0, -200, 1.5], [180, -40, 3]];
    G.parts.forEach((p, i) => { const sp = s.split, o = off[i];
      g.save(); g.translate(p.x - NW / G.k / 2 + o[0] * sp / G.k, o[1] * sp / G.k); g.rotate(o[2] * sp);
      g.strokeStyle = INK; g.lineWidth = 14; g.strokeText(p.c, 0, 0); g.fillStyle = BLUE; g.fillText(p.c, 0, 0); g.restore(); });
    g.restore();
  }

  // vệt kéo (smear vẽ bằng hình): khớp ở các thời điểm trước, nét nhỏ dần, nhạt dần
  function smear(tq, pick, w0) {
    const pts = []; for (let k = 0; k <= 5; k++) { const A = actor(tq - k * 0.014), J = stick(noop, A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, feet: A.feet, hands: A.hands, squash: A.squash ?? 1, arm: A.arm }); pts.push(pick(J)); }
    g.save(); g.lineCap = 'round'; g.strokeStyle = INK;
    for (let k = 1; k <= 5; k++) { g.globalAlpha = 0.45 * (1 - k / 6); g.lineWidth = w0 * (1 - k / 7); g.beginPath(); g.moveTo(...pts[k - 1]); g.lineTo(...pts[k]); g.stroke(); }
    g.restore();
  }
  function burst(p, size, d) {                            // khung loé (1 khung-24) rồi tia toả
    g.save(); g.translate(...p);
    if (d < 0.05) { g.fillStyle = INK; g.beginPath(); for (let i = 0; i < 28; i++) { const a = i * Math.PI / 14, r = (i % 2 ? 55 : 130) * size; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fill();
      g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(0, 0, 38 * size, 0, 7); g.fill(); }
    else { const k = (d - 0.05) / 0.25; g.strokeStyle = INK; g.lineWidth = 6 * (1 - k); g.lineCap = 'round';
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 + 0.3, r0 = (70 + 120 * k) * size, r1 = r0 + 50 * size * (1 - k);
        g.beginPath(); g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); g.stroke(); } }
    g.restore();
  }
  function dust(x, w, d) {
    const k = d / 0.45; g.save(); g.globalAlpha = 1 - k; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 3;
    for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, dx = s * (0.2 + 0.5 * k + 0.12 * (i >> 1)) * w, r = (10 + 6 * (i >> 1)) * (0.6 + k);
      g.beginPath(); g.arc(x + dx, GY - r * 0.7 - 10 * k, r, 0, 7); g.fill(); g.stroke(); }
    g.restore();
  }
  function steam(C, r, d) {
    g.save(); g.strokeStyle = INK; g.fillStyle = '#FFFFFF'; g.lineWidth = 3;
    for (let i = 0; i < 3; i++) { const k = ((d * 1.6 + i / 3) % 1), s = i % 2 ? 1 : -1;
      g.globalAlpha = 1 - k; g.beginPath(); g.arc(C[0] + s * (r * 0.9 + 20 * k), C[1] - r * 0.6 - 70 * k, 8 + 10 * k, 0, 7); g.fill(); g.stroke(); }
    g.restore();
  }

  function frame(t) {
    const tq = step ? Math.floor(t * step + 1e-6) / step : t;     // nhân vật / số / hiệu ứng theo giờ lượng tử
    const c = cam(t);
    g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = PAPER; g.fillRect(0, 0, 1920, 1080);
    g.translate(960, 540); g.scale(c.z, c.z); g.translate(-c.cx, -c.cy);
    paperWorld();
    const A = actor(tq), s = num(tq, A);
    for (const d of DUST) { const dd = tq - d.t; if (dd >= 0 && dd < 0.45) dust(d.x, d.w, dd); }
    if ((tq > 2.25 && tq < 2.6) || (tq > 2.8 && tq < 3.15) || (tq > 6.07 && tq < 6.7)) for (let k = 3; k >= 1; k--) drawNum(num(tq - k * 0.025, A), 0.12 * (4 - k));
    if (tq > 1.99 && tq < 2.16) smear(tq, J => J.handR, 0.06 * H);
    if (tq > 5.84 && tq < 5.97) smear(tq, J => J.footR, 0.06 * H);
    if (tq > 5.0 && tq < 5.62) smear(tq, J => J.head, 0.03 * H);
    const J = hero(g, 'C', A.hip[0], 0, A.pose, { h: H, dir: DIR, hip: A.hip, feet: A.feet, hands: A.hands, squash: A.squash ?? 1, eye: A.eye, wind: A.wind, t: tq, anger: A.anger, front: A.front });
    if (tq >= 4.3 && tq < 5.0) {                                     // gồng giận: vạch rung hai bên + hơi bốc
      steam(J.C, J.r, tq - 4.3);
      g.save(); g.strokeStyle = '#B3261E'; g.lineWidth = 5; g.lineCap = 'round';
      for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { const x = A.hip[0] + sd * (0.24 * H + 6 * Math.sin(tq * 60 + i)), y = A.hip[1] - 0.15 * H - i * 0.12 * H;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + sd * 22, y - 8); g.stroke(); }
      g.restore();
    }
    drawNum(s);
    for (const h of HITS) { const d = tq - h.t; if (d >= 0 && d < 0.3) burst(h.p(), h.size, d); }
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = 'rgba(34,48,60,0.45)'; g.font = '600 24px Archivo, sans-serif'; g.textAlign = 'left';
    g.fillText(`fight · ${step ? 'nhân vật 24 hình/giây' : 'nhân vật 60 hình/giây'} · t ${t.toFixed(2)}`, 40, 1050);
  }
  window.__intro = { get ready() { return fontsReady; }, still: frame, frame, DUR: SCENE.dur };
}
