// Từ khoá lớn lấp ruột bằng chữ nhỏ CÓ NGHĨA — lớp đùa thứ hai của video mẫu
// (REFERENCE-TEARDOWN §3.2). Ruột: vật thể lớn ít chữ → câu đọc được; chữ
// khổng lồ → kết cấu.
export function innerRows(phrases, rowsNeeded, minChars) {
  if (!phrases.length) return Array(rowsNeeded).fill('');
  const out = [];
  for (let i = 0; i < rowsNeeded; i++) {
    let s = '', j = i % phrases.length;
    while (s.length < minChars) { s += phrases[j % phrases.length] + ' · '; j++; }
    out.push(s);
  }
  return out;
}

let buf = null;
export function fillWord(g, word, x, y, {
  font, inner, innerFont = '500 22px "IBM Plex Mono"', color = '#FFB547',
  innerColor = '#FFE3A3', lineH = 24, drift = 0, outline = 0,
} = {}) {
  g.save(); g.font = font;
  const m = g.measureText(word);
  const w = Math.ceil(m.width) + 8, asc = Math.ceil(m.actualBoundingBoxAscent), desc = Math.ceil(m.actualBoundingBoxDescent);
  const h = asc + desc + 8;
  buf ||= document.createElement('canvas');
  if (buf.width < w) buf.width = w; if (buf.height < h) buf.height = h;
  const b = buf.getContext('2d');
  b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, buf.width, buf.height);
  // 1) hàng chữ nhỏ trên nền màu chữ
  b.fillStyle = color; b.fillRect(0, 0, w, h);
  b.font = innerFont; b.fillStyle = innerColor; b.textBaseline = 'top';
  // mỗi hàng là một vòng trọn các cụm (bắt đầu lệch một cụm so với hàng trên),
  // lặp đủ phủ bề rộng; trôi theo đúng chu kỳ P của vòng đó → không giật khi quấn
  if (inner?.length) for (let i = 0, n = Math.ceil(h / lineH) + 1; i < n; i++) {
    const unit = inner.map((_, q) => inner[(i + q) % inner.length] + ' · ').join('');
    const P = b.measureText(unit).width;
    const k = i % 2 ? 1 : -0.7;
    const off = -((((drift * k) % P) + P) % P);
    b.fillText(unit.repeat(Math.ceil(w / P) + 2), off, i * lineH);
  }

  // 2) giữ lại đúng hình chữ lớn
  b.globalCompositeOperation = 'destination-in';
  b.font = font; b.textBaseline = 'alphabetic'; b.fillStyle = '#000';
  b.fillText(word, 4, asc + 4);
  b.globalCompositeOperation = 'source-over';
  g.drawImage(buf, 0, 0, w, h, x - 4, y - (asc + 4) + (asc - desc) / 2, w, h);
  if (outline > 0) { g.lineWidth = outline; g.strokeStyle = color; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.strokeText(word, x, y + (asc - desc) / 2); }
  g.restore();
}
