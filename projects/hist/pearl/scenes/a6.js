// a6 — Just before eight (376–424 s). NGHIÊM: không người dẫn, không đùa, không màu chói. Ảnh thật PD (máy bay rời Akagi, ảnh trinh sát
// Nhật chụp Battleship Row, Arizona, Shaw) xen bản đồ đợt 1 và chữ số liệu trắng ngà trên nền đen.
import * as S from '../../_kit/stage.js';
import { view, drawMap, ll, INK } from '../../_kit/mapkit.js';
import { battleship, plane, sober, fade } from './common.js';
const { W, H, RED, clamp, lerp, ease, easeOut, hash } = S;

export default K => { const { g, IM, O, wd, ST } = K;
  const L = { at: 'At about seven fifty-five', torp: 'Torpedo bombers went', eight: 'At eight oh six', one: 'One thousand one hundred', second: 'A second wave followed',
    two: 'Two thousand four hundred', four: 'Four battleships were sunk' };
  const T = { wave: wd(L.at, 'wave'), planes: wd(L.at, 'planes'), dive: wd(L.torp, 'dive'), parked: wd(L.torp, 'parked'), exploded: wd(L.eight, 'exploded'), ten: wd(L.second, 'ten'),
    civ: wd(L.two, 'civilians'), wounded: wd(L.two, 'wounded'), damaged: wd(L.four, 'damaged'), planes2: wd(L.four, 'planes') };
  const black = () => { g.fillStyle = '#0E0F12'; g.fillRect(0, 0, W, H); };
  const photo = (im, t, o, credit) => { if (im) S.photoBg(im, t, o); else black(); S.desat(0.35); g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(0, 0, W, H); S.credit(credit); };

  return [
    // 1a · ẢNH THẬT máy bay Nhật trên boong Akagi (PD) · "7:55 AM" · tiếng: nhạc tắt, động cơ máy bay xa
    [ST(L.at), (t, X) => { photo(IM.p_akagi, t, { zoom: 1.05 }, 'Photo: Japanese Navy, Dec 1941 (public domain)'); sober('7:55 AM', 960, 980, 90, fade(X, ST(L.at) + 0.3, 0.4)); }],
    // 1b · bản đồ Oahu tối màu, mũi tên đỏ đậm từ phía bắc "183 PLANES" · tiếng: tiếng gầm lớn dần
    [T.wave - 0.2, (t, X) => { const V = view(O, { cx: 202.0, cy: 21.5, zoom: 0.8 }); drawMap(g, O, V, { fill: { Oahu: '#CFC9B6' } }); S.desat(0.5, 0.2);
      const [hx, hy] = V.pt(ll(O, 202.05, 21.45)), k = ease((X - T.wave + 0.2) / 1.6);
      g.save(); g.strokeStyle = '#8E1F24'; g.lineWidth = 40; g.lineCap = 'round'; const ty = lerp(-40, hy - 140, k); g.beginPath(); g.moveTo(hx - 40, -40); g.lineTo(hx - 40, ty); g.stroke(); g.fillStyle = '#8E1F24'; g.beginPath(); g.moveTo(hx - 110, ty - 10); g.lineTo(hx + 30, ty - 10); g.lineTo(hx - 40, ty + 80); g.closePath(); g.fill(); g.restore();
      sober('183 PLANES · FIRST WAVE', 960, 1000, 64, fade(X, T.planes, 0.4)); }],
    // 2a · ẢNH THẬT trinh sát Nhật chụp Battleship Row bị ngư lôi (PD, NARA 80-G-30551) · tiếng: nổ trầm xa
    [ST(L.torp), (t, X) => { photo(IM.p_row, t, { zoom: 1.08 }, 'Photo: Japanese Navy / NARA 80-G-30551 (public domain)'); sober('BATTLESHIP ROW', 960, 990, 70, fade(X, ST(L.torp) + 0.4, 0.4)); }],
    // 2b · ẢNH THẬT Wheeler Field 7/12/1941 (PD): máy bay đỗ sát cánh bốc cháy · tiếng: nổ liên tiếp nhỏ
    [T.dive - 0.3, (t, X) => { photo(IM.p_wheeler, t, { zoom: 1.06 }, 'Photo: U.S. Army Air Forces, Wheeler Field, 7 Dec 1941 (public domain)'); sober('PARKED WINGTIP TO WINGTIP', 960, 990, 62, fade(X, T.parked, 0.4)); }],
    // 3 · ẢNH THẬT USS Arizona cháy (PD), "8:06 AM" · tiếng: một tiếng nổ lớn đúng "exploded" rồi im
    [ST(L.eight), (t, X) => { black(); if (IM.p_arizona) S.photo(IM.p_arizona, 960, 450, 1040 + 30 * t); S.desat(0.35); S.credit('Photo: U.S. Navy, 7 Dec 1941 (public domain)'); sober('USS ARIZONA · 8:06 AM', 960, 990, 70, fade(X, ST(L.eight) + 0.3, 0.4));
      if (X > T.exploded) { const k = clamp((X - T.exploded) / 0.5); g.fillStyle = `rgba(255,230,180,${0.5 * (1 - k)})`; g.fillRect(0, 0, W, H); } }],
    // 4 · nền đen: "1,177" / "DIED ON THE ARIZONA" · tiếng: im lặng
    [ST(L.one), (t, X) => { black(); sober('1,177', 960, 520, 220, fade(X, ST(L.one) + 0.2, 0.6)); sober('DIED ON THE ARIZONA', 960, 660, 60, fade(X, ST(L.one) + 1.6, 0.6), { col: '#B8B4AA' }); }],
    // 5 · ẢNH THẬT USS Shaw (PD), "SECOND WAVE" → "OVER BY 10 AM" · tiếng: nổ xa, rồi gió
    [ST(L.second), (t, X) => { photo(IM.p_shaw, t, { zoom: 1.04 }, 'Photo: U.S. Navy, 7 Dec 1941 (public domain)'); sober(X < T.ten ? 'SECOND WAVE' : 'OVER BY 10 AM', 960, 990, 70, 1); }],
    // 6 · nền đen: 2,403 KILLED · 68 CIVILIANS · 1,178 WOUNDED · tiếng: im
    [ST(L.two), (t, X) => { black(); sober('2,403 KILLED', 960, 430, 150, fade(X, ST(L.two) + 0.2, 0.6)); sober('68 OF THEM CIVILIANS', 960, 580, 64, fade(X, T.civ - 0.3, 0.5), { col: '#B8B4AA' });
      sober('1,178 WOUNDED', 960, 700, 64, fade(X, T.wounded - 0.3, 0.5), { col: '#B8B4AA' }); }],
    // 7 · biểu tượng khử màu: hàng trên 4 thiết giáp hạm chìm (nước phủ nửa thân), hàng giữa 4 hư bốc khói, hàng dưới máy bay xám · tiếng: im, gió
    [ST(L.four), (t, X) => { black(); sober('4 BATTLESHIPS SUNK', 960, 150, 52, 1, { col: '#B8B4AA' });
      for (let i = 0; i < 4; i++) { const x = 300 + i * 440; battleship(x, 330, 360, { col: '#5A5F64', sink: 0.5, dir: i % 2 ? 1 : -1 }); g.fillStyle = 'rgba(40,60,78,0.92)'; g.fillRect(x - 230, 340, 460, 70); }
      const dk = fade(X, T.damaged - 0.2, 0.4); sober('4 DAMAGED', 960, 520, 52, dk, { col: '#B8B4AA' });
      if (dk > 0) { g.save(); g.globalAlpha = dk; for (let i = 0; i < 4; i++) battleship(300 + i * 440, 700, 360, { col: '#8E959C', fire: 0.25 }); g.restore(); }
      const pk = fade(X, T.planes2 - 0.4, 0.6); if (pk > 0) { g.save(); g.globalAlpha = pk; for (let i = 0; i < 18; i++) plane(180 + i * 92, 860, 70, 'b17', { rot: 0.15 * Math.sin(i * 2.1) }); g.restore(); sober('188 PLANES DESTROYED', 960, 990, 60, pk); }
      S.desat(1, 0.1); }],
  ];
};
