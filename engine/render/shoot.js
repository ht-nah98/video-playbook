// Render frame bằng Chrome headless qua CDP, ghép bằng ffmpeg. Không cần bun/playwright.
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

const ROOT = path.resolve(__dirname, '..', '..');
const ARG = process.argv.slice(2);
const opt = (k,d)=>{const i=ARG.indexOf('--'+k);return i>=0&&ARG[i+1]?ARG[i+1]:d};

// Tham số hoá cho mọi MV — không hardcode bài nào.
const FPS = +opt('fps', '60');
// check: không có --dur thì lấy window.__intro.DUR của trang (gán sau khi trang sẵn sàng).
let DUR = +opt('dur', '25.968');
const MODE = ARG[0] && !ARG[0].startsWith('--') ? ARG[0] : 'video';
// --page BẮT BUỘC: trước đây mặc định 99-intro + out/en/intro.mp4 → chạy thiếu tham số là âm thầm ghi đè bản render của MV
// (pi, 2026-10-07: một reviewer gõ `node engine/render/shoot.js` trống).
const PAGE = opt('page', '');
if (!PAGE) { console.error('shoot.js: thiếu --page.  Dùng: shoot.js <video|stills|cues|check|readcheck> --page <trang.html> [--dur s] [--t a,b] [--outdir d] [--out f] [--audio f | --silent] [--hash bước]'); process.exit(2); }
const { pixelHash, sampleTimes, reversePick, groupErrors, key } = require('./checklib.js');
const OUT = opt('out', path.join(ROOT,'out','intro.mp4'));
const FROM = +opt('from','0'); let TO = +opt('to', String(DUR));
// Khổ khung (mặc định ngang 1080p, trang dọc: --w 1080 --h 1920). --gpu: WebGL trên card thật thay vì SwiftShader (§72).
const VW = +opt('w','1920'), VH = +opt('h','1080'), GPU_FLAGS = ARG.includes('--gpu') ? ['--use-angle=vulkan','--enable-features=Vulkan','--ignore-gpu-blocklist','--enable-gpu-rasterization'] : [];

function freePort(){return new Promise(r=>{const s=net.createServer();s.listen(0,()=>{const p=s.address().port;s.close(()=>r(p))})})}
const sleep = ms=>new Promise(r=>setTimeout(r,ms));

// server tĩnh
let onRawFrame = null;
function serve(port){
  const TYPES={'.html':'text/html','.js':'text/javascript','.png':'image/png','.mp3':'audio/mpeg'};
  return http.createServer((req,res)=>{
    let p = decodeURIComponent(req.url.split('?')[0]);
    // --raw: trang POST pixel thô của canvas (RGBA) về đây, ?n=<số khung>; trả lời khi khung đã vào ffmpeg (chặn ngược)
    if(req.method==='POST' && p==='/__frame'){ const ch=[]; req.on('data',c=>ch.push(c)); req.on('end',()=>{
      const n=+new URL(req.url,'http://x').searchParams.get('n'); Promise.resolve(onRawFrame && onRawFrame(n, Buffer.concat(ch)))
        .then(()=>{res.writeHead(200);res.end('ok')}, e=>{res.writeHead(500);res.end(String(e))}); }); return; }
    if(p==='/') p='/'+PAGE;
    const f = path.join(ROOT, p);
    if(!f.startsWith(ROOT) || !fs.existsSync(f)){res.writeHead(404);return res.end('404')}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'});
    fs.createReadStream(f).pipe(res);
  }).listen(port);
}

async function cdp(port){
  for(let i=0;i<80;i++){
    try{
      const list = await new Promise((res,rej)=>{
        http.get(`http://127.0.0.1:${port}/json/list`,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej);
      });
      const pg = list.find(x=>x.type==='page');
      if(pg) return pg.webSocketDebuggerUrl;
    }catch(e){}
    await sleep(150);
  }
  throw new Error('Chrome DevTools không phản hồi');
}

// Dọn Chrome + hồ sơ /tmp ở MỌI đường ra (trước đây đường lỗi để lại Chrome chạy và thư mục hồ sơ).
let chrome = null, prof = null, srv = null, ffProc = null;
async function cleanup(){
  try{ if(ffProc && ffProc.exitCode===null) ffProc.kill('SIGKILL'); }catch(e){}
  try{ if(srv) srv.close(); }catch(e){}
  // chờ Chrome thoát hẳn rồi mới xoá hồ sơ — xoá trong lúc nó còn ghi thì thư mục mọc lại
  try{ if(chrome && chrome.exitCode===null && chrome.signalCode===null){
    const gone = new Promise(r=>chrome.once('exit',r)); chrome.kill('SIGKILL'); await Promise.race([gone, sleep(3000)]); } }catch(e){}
  try{ if(prof) fs.rmSync(prof,{recursive:true,force:true}); }catch(e){}
}

(async()=>{
  const sPort = await freePort(), dPort = await freePort();
  srv = serve(sPort);
  const url = `http://127.0.0.1:${sPort}/${PAGE}`;
  prof = fs.mkdtempSync('/tmp/chrome-intro-');
  chrome = spawn('google-chrome',[
    '--headless=new', `--remote-debugging-port=${dPort}`, `--user-data-dir=${prof}`,
    `--window-size=${VW},${VH}`, '--force-device-scale-factor=1', ...GPU_FLAGS,
    '--hide-scrollbars','--no-sandbox','--disable-gpu-sandbox',
    '--enable-unsafe-swiftshader','--disable-dev-shm-usage',
    '--no-first-run','--disable-extensions', url,
  ],{stdio:'ignore'});

  const wsUrl = await cdp(dPort);
  const WebSocket = await loadWS();
  const ws = new WebSocket(wsUrl);
  await Promise.race([new Promise(r=>ws.on('open',r)), sleep(30000).then(()=>{ throw new Error('CDP websocket không mở sau 30s'); })]);
  let id=0; const pend=new Map();
  ws.on('message',m=>{const o=JSON.parse(m);if(o.id&&pend.has(o.id)){pend.get(o.id)(o);pend.delete(o.id)}});
  // Mỗi lệnh CDP có hạn (--cdp-timeout giây, mặc định 300): renderer chết / treo thì lệnh không bao giờ được trả lời
  // → trước đây node chờ mãi (zero-power, 2026-10-08: check treo 30 phút, 0 s CPU).
  const CDP_MS = +opt('cdp-timeout','300')*1000;
  const send=(method,params={})=>new Promise((r,rej)=>{const i=++id;
    const tm=setTimeout(()=>{ pend.delete(i); rej(new Error(`CDP ${method} không trả lời sau ${CDP_MS/1000}s (renderer treo/chết?)`)); }, CDP_MS);
    pend.set(i,o=>{clearTimeout(tm);r(o)}); ws.send(JSON.stringify({id:i,method,params}))});

  const evalJs = async(expr)=>{
    const r = await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});
    if(r.result&&r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
    return r.result&&r.result.result&&r.result.result.value;
  };

  await send('Runtime.enable');
  await send('Log.enable');
  let syntaxErr = null;
  ws.on('message',m=>{
    const o=JSON.parse(m);
    if(o.method==='Runtime.exceptionThrown'){
      const d=o.params.exceptionDetails;
      console.error('[PAGE ERROR]', d.text, d.exception&&d.exception.description||'', d.url||'', d.lineNumber);
      // lỗi CÚ PHÁP ở module trang → __intro không bao giờ có; đừng ngồi chờ hết ready-timeout (ja-render 2026-10-10)
      if(/SyntaxError/.test(d.text+' '+(d.exception&&d.exception.description||''))) syntaxErr ??= `${d.text} ${d.url||''}:${d.lineNumber}`;
    }
    if(o.method==='Log.entryAdded' && o.params.entry.level==='error'){
      console.error('[LOG]', o.params.entry.text, o.params.entry.url||'');
    }
  });

  // ép viewport đúng 1920x1080 (headless trừ chiều cao UI -> 1920x937 nếu không ép)
  await send('Emulation.setDeviceMetricsOverride',{
    width:VW, height:VH, deviceScaleFactor:1, mobile:false,
    screenWidth:VW, screenHeight:VH,
  });

  // chờ app sẵn sàng — hết giờ mà chưa sẵn sàng là LỖI ở MỌI mode (trước đây đi tiếp im lặng: cues ghi [] → video
  // mất hết tiếng hiệu ứng mà không ai biết).
  const READY_S = +opt('ready-timeout','60');
  let st = '';
  for(let i=0;i<READY_S*10;i++){
    st = await evalJs('window.__intro ? (window.__intro.error||(window.__intro.ready?"ok":"")) : ""');
    if(st==='ok') break;
    if(st) throw new Error('App lỗi: '+st);
    if(syntaxErr) throw new Error('trang lỗi cú pháp: '+syntaxErr);
    await sleep(100);
  }
  if(st!=='ok') throw new Error(`trang chưa sẵn sàng sau ${READY_S}s (window.__intro.ready vẫn false): ${PAGE}`);
  console.log('app sẵn sàng');

  const shot = async(t)=>{
    await evalJs(`window.__intro.still(${t})`);
    const r = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    return Buffer.from(r.result.data,'base64');
  };

  // xác nhận kích thước thật của frame (chỉ cho các mode xuất ảnh)
  if(MODE==='video' || MODE==='stills' || MODE==='sheet'){
    const b = await shot(0);
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    if(w!==VW || h!==VH) throw new Error(`Chrome chụp ${w}x${h}, cần ${VW}x${VH}`);
    console.log(`frame ${w}x${h} OK`);
  }

  if(MODE==='check'){
    // Chạy khô MỌI khung (LESSONS §70): gọi frame(n/FPS) trong trang, không chụp, không ffmpeg. Lỗi → in, thoát 1.
    // --hash <bước>: băm getImageData của canvas mỗi <bước> giây (xuôi), rồi vài mốc NGƯỢC để kiểm tất định → JSON --out.
    if(!opt('dur')) DUR = +(await evalJs('window.__intro.DUR'));
    if(!(DUR>0)) throw new Error('check: không có --dur và window.__intro.DUR không hợp lệ');
    await evalJs(`window.__chk = { f: window.__intro.frame || window.__intro.still, h: ${pixelHash.toString()},
      cv: document.querySelector('canvas') }; true`);
    const total = Math.round(DUR*FPS), CH = +opt('chunk','600'), errs = [];
    const t0 = Date.now();
    if(!ARG.includes('--no-frames')) for(let a=0;a<total;a+=CH){
      const b = Math.min(total, a+CH);
      const r = JSON.parse(await evalJs(`(async()=>{ const e=[]; for(let n=${a};n<${b};n++){ const t=n/${FPS};
        try{ const r=__chk.f(t); if(r&&r.then) await r; }catch(x){ e.push([t, String(x&&x.message||x)]); } } return JSON.stringify(e); })()`));
      errs.push(...r);
      process.stdout.write(`\rcheck ${b}/${total}  lỗi ${errs.length}   `);
    }
    console.log(`\ncheck: ${ARG.includes('--no-frames')?0:total} khung, ${errs.length} lỗi, ${((Date.now()-t0)/1000).toFixed(0)}s`);
    for(const g of groupErrors(errs, FPS))
      console.error(`  LỖI t=${g.from.toFixed(3)}${g.n>1?`–${g.to.toFixed(3)} (${g.n} khung)`:''}: ${g.msg}`);
    let nondet = [];
    if(opt('hash')){
      const ts = sampleTimes(DUR, +opt('hash'), FPS), hashes = {};
      const grab = async t => JSON.parse(await evalJs(`(async()=>{ try{ const r=__chk.f(${t}); if(r&&r.then) await r; }catch(x){ return JSON.stringify('ERR '+String(x&&x.message||x)); }
        const c=__chk.cv; return JSON.stringify(__chk.h(c.getContext('2d').getImageData(0,0,c.width,c.height).data)); })()`));
      for(const t of ts) hashes[key(t)] = await grab(t);
      for(const t of reversePick(ts)){ const h = await grab(t); if(h!==hashes[key(t)]) nondet.push(key(t)); }
      if(nondet.length) console.error(`  KHÔNG TẤT ĐỊNH (xuôi ≠ ngược) ở t=${nondet.join(', ')}`);
      const res = { page: PAGE, dur: DUR, fps: FPS, step: +opt('hash'), frames_checked: ARG.includes('--no-frames')?0:total,
        errors: errs.length, nondeterministic: nondet, hashes };
      if(opt('out')){ fs.mkdirSync(path.dirname(path.resolve(OUT)),{recursive:true}); fs.writeFileSync(OUT, JSON.stringify(res,null,1)); }
      console.log(`hash: ${ts.length} mốc mỗi ${opt('hash')}s${opt('out')?' → '+OUT:''}`);
    }
    // chuyển cảnh đè đuôi câu đang đọc (trang khuôn bài học lộ window.__intro.transitions — LESSONS §153)
    const tr = JSON.parse(await evalJs('JSON.stringify(window.__intro.transitions||null)'));
    const cut = (tr||[]).filter(x => !x.cont && x.prevEnd > 0 && x.from < x.prevEnd + 0.5 - 1e-6);
    for(const x of cut) console.error(`  LỖI chuyển cảnh ${x.plate}: FROM ${x.from.toFixed(2)} < kết câu trước ${x.prevEnd.toFixed(2)} + 0.5 (đè đuôi câu — BRIEF-PLATES luật FROM)`);
    if(tr) console.log(`chuyển cảnh: ${tr.length} chỗ, ${cut.length} đè câu`);
    if(errs.length || nondet.length || cut.length){ await cleanup(); process.exit(1); }
  } else if(MODE==='readcheck'){
    // Chữ trên hình có đủ lâu để đọc? (học lemo-opuscar core/render/readcheck.mjs, MIT — docs/study/11). Móc fillText của
    // canvas khi chạy kiểm (không sửa kit nào, chạy được cả bài cũ): mỗi mẩu chữ (vị trí neo + font + nội dung) phải HIỆN
    // TRỌN (trong khung, alpha ≥ 0.9) liên tục ≥ max(--min, ký tự / --cps + --pad) giây. Chữ đang gõ dần (chuỗi là phần đầu
    // của chữ kế tiếp ở cùng chỗ) không tính là mẩu riêng. Mặc định chỉ cảnh báo; --strict → mã 1. --t0/--t1 giới hạn đoạn,
    // --minlen (3) bỏ nhãn ngắn, --cps 15 / --pad 1.5 / --min 1.5 như lemo-opuscar DIRECTOR §7.
    if(!opt('dur')) DUR = +(await evalJs('window.__intro.DUR'));
    const STEP=+opt('step','0.04'), CPS=+opt('cps','15'), PAD=+opt('pad','1.5'), MINH=+opt('min','1.5');
    const T0=+opt('t0','0'), T1=Math.min(DUR, +opt('t1', String(DUR))), MINLEN=+opt('minlen','3');
    await evalJs(`(()=>{ const cv=document.querySelector('canvas'), P=CanvasRenderingContext2D.prototype; if(P.__rc) return true; P.__rc=P.fillText;
      window.__rcLog=[]; P.fillText=function(s,x,y,mw){ try{ s=String(s); if(s.trim() && this.canvas===cv){ const m=this.measureText(s), T=this.getTransform();
        const px=+((this.font.match(/(\\d+(?:\\.\\d+)?)px/)||[0,20])[1]); const w=m.width, a=this.textAlign;
        const x0=a==='center'?x-w/2:(a==='right'||a==='end')?x-w:x, y0=y-px*0.8, x1=x0+w, y1=y+px*0.25;
        const pts=[[x0,y0],[x1,y0],[x0,y1],[x1,y1]].map(([u,v])=>[T.a*u+T.c*v+T.e, T.b*u+T.d*v+T.f]);
        const X=pts.map(p=>p[0]), Y=pts.map(p=>p[1]), ax=T.a*x+T.c*y+T.e, ay=T.b*x+T.d*y+T.f;
        window.__rcLog.push({s, font:this.font, ax, ay, a:this.globalAlpha,
          x0:Math.min(...X), y0:Math.min(...Y), x1:Math.max(...X), y1:Math.max(...Y)}); } }catch(e){} return P.__rc.call(this,s,x,y,mw); };
      return true; })()`);
    const W=1920, H=1080, seen={}, out=[];
    for(let a=T0; a<T1; a+=STEP*500){
      const b=Math.min(T1, a+STEP*500);
      const frames=JSON.parse(await evalJs(`(async()=>{ const F=[]; for(let t=${a}; t<${b}-1e-9; t+=${STEP}){ window.__rcLog=[];
        const r=(window.__intro.frame||window.__intro.still)(t); if(r&&r.then) await r; F.push([t, window.__rcLog]); } return JSON.stringify(F); })()`));
      for(const [t, items] of frames){
        const vis=new Set();
        for(const it of items){ if(it.a<0.9 || it.x0<0 || it.y0<0 || it.x1>W || it.y1>H) continue;
          const id=it.font+'\u0000'+it.s; vis.add(id);                 // một mẩu = nội dung + font: chữ trượt theo trang vẫn là nó
          const e=seen[id] ??= {s:it.s, font:it.font, t0:t, last:t, a0:[it.ax,it.ay], a1:[it.ax,it.ay], open:true}; e.last=t; e.a1=[it.ax,it.ay]; }
        for(const [id,e] of Object.entries(seen)) if(e.open && !vis.has(id)){ e.open=false; out.push(e); delete seen[id]; }
      }
      process.stdout.write(`\rreadcheck ${b.toFixed(0)}/${T1.toFixed(0)}s   `);
    }
    for(const e of Object.values(seen)) out.push(e);
    // bỏ mẩu bị THAY TẠI CHỖ ngay khi biến mất (chữ đang gõ dần, bộ đếm, số đang chạy): chỉ xét nội dung cuối cùng ở chỗ đó.
    // Cùng nội dung + cùng thời gian vẽ hai lần (viền, bóng) → một mẩu.
    const near = (p,q) => Math.abs(p[0]-q[0])<160 && Math.abs(p[1]-q[1])<160;   // chữ vừa gõ vừa trượt (thư trượt vào) vẫn là cùng chỗ
    const replaced = e => out.some(o=>o!==e && o.font===e.font && o.s!==e.s && near(o.a0,e.a1) && o.t0>e.last-1e-6 && o.t0<=e.last+STEP*1.5);
    const uniq=new Map(); for(const e of out) if(!replaced(e)) uniq.set(e.s+'\u0000'+e.t0.toFixed(3)+'\u0000'+e.last.toFixed(3), e);
    const bad=[], pieces=[...uniq.values()];
    for(const e of pieces){ const n=[...e.s].filter(c=>!/\s/.test(c)).length, need=Math.max(MINH, n/CPS+PAD), held=e.last-e.t0+STEP;
      if(n<MINLEN) continue;                                   // nhãn 1–2 ký tự (số trên lưới, chữ số lẻ): đọc trong nháy mắt
      if(held+1e-6<need) bad.push({...e, held, need}); }
    console.log(`\nreadcheck: ${pieces.length} mẩu chữ, ${bad.length} giữ chưa đủ để đọc (≥ ký tự/${CPS} + ${PAD} s, tối thiểu ${MINH} s)`);
    for(const e of bad.sort((p,q)=>p.t0-q.t0).slice(0,+opt('show','40'))) console.error(`  t=${e.t0.toFixed(2)}  giữ ${e.held.toFixed(2)}s < ${e.need.toFixed(2)}s  "${e.s.slice(0,60)}"`);
    if(opt('out')){ fs.mkdirSync(path.dirname(path.resolve(OUT)),{recursive:true}); fs.writeFileSync(OUT, JSON.stringify({pieces:pieces.length, bad},null,1)); }
    // mặc định CẢNH BÁO (người soát xem danh sách — CRAFT §3); --strict: mã 1 khi còn mẩu chưa đạt
    if(bad.length && ARG.includes('--strict')){ await cleanup(); process.exit(1); }
  } else if(MODE==='cues'){
    // tiếng hiệu ứng trang tự gom (engine/sfx.js collectCues) → JSON cho tools/sfx/mix.py
    if(!opt('out')){ console.error('cues: thiếu --out <file.json> (mặc định cũ ghi đè out/en/intro.mp4 — LESSONS §60)'); await cleanup(); process.exit(1); }
    const c = await evalJs('JSON.stringify(window.__intro.cues||[])');
    fs.mkdirSync(path.dirname(OUT),{recursive:true}); fs.writeFileSync(OUT, c);
    console.log(`cues: ${JSON.parse(c).length} → ${OUT}`);
  } else if(MODE==='dur'){
    // độ dài trang (window.__intro.DUR) — tools/render/par.py chia phần theo số này
    console.log('DUR', +(await evalJs('window.__intro.DUR')));
  } else if(MODE==='gl'){
    const info = await evalJs('JSON.stringify(window.__intro.gl||{})');
    console.log(info);
  } else if(MODE==='bench'){
    for(const n of [20000,60000,150000,300000]){
      const r = await evalJs(`JSON.stringify(window.__intro.bench(${n}, 20))`);
      console.log(r);
    }
  } else if(MODE==='stills'){
    const times=(opt('t','0')).split(',').map(Number);
    const dir=opt('outdir',path.join(ROOT,'out','stills'));
    fs.mkdirSync(dir,{recursive:true});
    for(const t of times){
      const f=path.join(dir,`t_${t.toFixed(2)}.png`);
      fs.writeFileSync(f, await shot(t));
      console.log(f);
    }
  } else {
    // Không có --audio thì KHÔNG lấy nhạc mặc định của 99-intro cho trang khác: ffmpeg -shortest sẽ dừng ở 26 s và
    // vòng chụp treo chờ 'drain' mãi mãi (math-30k, 2026-10-05 — LESSONS §33).
    // --silent: clip bàn thử không tiếng (tools/lab/…) — tiếng câm đúng độ dài, không cần tự tạo wav (2026-10-23)
    const SILENT = ARG.includes('--silent');
    if(!opt('audio') && !SILENT && PAGE!=='projects/mv/99-intro/index.html') throw new Error('video cần --audio <file> hoặc --silent (trang '+PAGE+')');
    // Không --dur: lấy window.__intro.DUR như check / readcheck — mặc định 25.968 s của 99-intro từng cắt phim 74 s
    // (hist-pilot) còn 26 s mà không báo gì (2026-10-24).
    if(!opt('dur') && PAGE!=='projects/mv/99-intro/index.html') { DUR = +(await evalJs('window.__intro.DUR')); if(!opt('to') || TO > DUR) TO = DUR;   // --to 999 từng render 822 s cho phim 233 s (2026-10-28)
      if(!(DUR>0)) throw new Error('video: không có --dur và window.__intro.DUR không hợp lệ'); }
    fs.mkdirSync(path.dirname(OUT),{recursive:true});
    const n0=Math.round(FROM*FPS), n1=Math.round(TO*FPS), total=n1-n0;
    // --raw: đọc pixel canvas đầu tiên trong trang (getImageData) và POST thô về server, thay vì chụp PNG qua CDP
    //   (Short 3D: PNG 4,2 khung/s là nút cổ chai, GPU vẽ ~700 khung/s — LESSONS §256). Chỉ dùng khi CẢ khung là canvas đó.
    // --nvenc: mã hoá H.264 bằng card NVIDIA (cq = --crf) thay libx264 preset slow.
    const RAW = ARG.includes('--raw'), NVENC = ARG.includes('--nvenc');
    const [CW, CH] = RAW ? JSON.parse(await evalJs('JSON.stringify((c=>[c.width,c.height])(document.querySelector("canvas")))')) : [VW, VH];
    if(RAW && (CW!==VW || CH!==VH)) throw new Error(`--raw: canvas ${CW}x${CH} khác khổ khung ${VW}x${VH}`);
    const vin = RAW ? ['-f','rawvideo','-pix_fmt','rgba','-s',`${CW}x${CH}`,'-framerate',String(FPS),'-i','pipe:0'] : ['-f','image2pipe','-vcodec','png','-framerate',String(FPS),'-i','pipe:0'];
    const venc = NVENC ? ['-c:v','h264_nvenc','-preset','p7','-tune','hq','-rc','vbr','-cq',String(+opt('crf','19')),'-b:v','0','-bf','0'] : ['-c:v','libx264','-preset','slow','-crf', String(+opt('crf','19'))];   // nvenc không B-frame: dts bắt đầu 0, ghép -c copy giữ đúng thứ tự (§260)
    const ff=spawn('ffmpeg',['-y',...vin,
      ...(SILENT ? ['-f','lavfi','-t',String((n1-n0)/FPS),'-i','anullsrc=r=48000:cl=stereo']
                 : ['-ss',String(FROM),'-t',String((n1-n0)/FPS),'-i',path.resolve(ROOT, opt('audio','projects/mv/99-intro/audio/loading.mp3'))]),
      '-map','0:v','-map','1:a',...venc,'-pix_fmt','yuv420p',
      '-vf','scale=out_color_matrix=bt709','-c:a','aac','-b:a','256k','-shortest',
      '-movflags','+faststart',OUT],{stdio:['pipe','inherit','inherit']});
    ffProc=ff; let dead=false;
    ff.stdin.on('error',e=>{ if(e.code==='EPIPE'){dead=true;} else throw e; });
    // Hứa đóng tạo NGAY lúc spawn: ffmpeg chết sớm thì 'close' đã bắn trước khi ta chờ → `ff.on('close')` muộn treo mãi.
    const ffClosed = new Promise(r=>ff.on('close',c=>{ dead=true; r(c); }));
    const t0=Date.now();
    const put = async buf => { if(!ff.stdin.write(buf)) await Promise.race([new Promise(r=>ff.stdin.once('drain',r)), ffClosed]); };
    // khung thô có thể tới lệch thứ tự (nhiều kết nối) → xếp lại theo n rồi mới ghi
    const pendRaw = new Map(); let nextRaw = n0, waiters = [];
    onRawFrame = async (n, buf) => { if(buf.length !== CW*CH*4) throw new Error(`khung ${n}: ${buf.length} byte, cần ${CW*CH*4}`); pendRaw.set(n, buf);
      while(pendRaw.has(nextRaw)){ const b = pendRaw.get(nextRaw); pendRaw.delete(nextRaw); nextRaw++; await put(b); }
      for(const w of waiters.splice(0)) w(); };
    if(RAW){ await evalJs(`window.__raw = { c: document.querySelector('canvas'), pf: Promise.resolve() }; true`);
      // chốt: khung đầu đọc thô phải TRÙNG ảnh chụp thật (trang có lớp HTML / canvas khác đè lên → dừng, đừng mất hình im lặng)
      const png = await shot(n0/FPS), dec = require('child_process').spawnSync('ffmpeg',['-loglevel','error','-i','pipe:0','-f','rawvideo','-pix_fmt','rgba','pipe:1'],{input:png, maxBuffer:CW*CH*8});
      const raw = Buffer.from(await evalJs(`(async()=>{ const R=window.__raw; const r=(window.__intro.frame||window.__intro.still)(${n0/FPS}); if(r&&r.then) await r;
        const d=R.c.getContext('2d').getImageData(0,0,R.c.width,R.c.height).data; let s=''; for(let i=0;i<d.length;i+=32768) s+=String.fromCharCode.apply(null,d.subarray(i,i+32768)); return btoa(s); })()`), 'base64');
      let bad = 0; for(let i=0;i<raw.length;i+=4) if(Math.abs(raw[i]-dec.stdout[i])>1 || Math.abs(raw[i+1]-dec.stdout[i+1])>1 || Math.abs(raw[i+2]-dec.stdout[i+2])>1) bad++;
      if(dec.stdout.length!==raw.length || bad > raw.length/4*0.001) throw new Error(`--raw: khung đầu đọc thô khác ảnh chụp (${bad} điểm) — trang có lớp ngoài canvas đầu tiên, bỏ --raw`);
      console.log(`--raw: khung đầu trùng ảnh chụp (${bad} điểm lệch > 1)`); }
    for(let n=n0;n<n1;n++){
      if(dead){ throw new Error(`ffmpeg đã đóng sớm, dừng ở frame ${n}/${n1}`); }
      if(RAW){
        // khung n+1 vẽ trong lúc khung n đang truyền; tối đa 2 khung bay cùng lúc
        await evalJs(`(async()=>{ const R=window.__raw; const r=(window.__intro.frame||window.__intro.still)(${n/FPS}); if(r&&r.then) await r;
          const d=R.c.getContext('2d').getImageData(0,0,R.c.width,R.c.height).data; await R.pf;
          R.pf=fetch('/__frame?n=${n}',{method:'POST',body:d}).then(x=>{ if(!x.ok) return x.text().then(t=>{throw new Error(t)}); }); return 1; })()`);
      } else await put(await shot(n/FPS));
      if((n-n0)%60===0||n===n1-1){
        const d=(Date.now()-t0)/1000, done=n-n0+1;
        process.stdout.write(`\r${done}/${total}  ${(done/d).toFixed(1)} fps  eta ${((total-done)/(done/d)).toFixed(0)}s   `);
      }
    }
    if(RAW){ await evalJs('window.__raw.pf.then(()=>1)'); while(nextRaw<n1 && !dead) await new Promise(r=>{ waiters.push(r); setTimeout(r,200); });
      if(nextRaw<n1) throw new Error(`--raw: chỉ ghi được ${nextRaw-n0}/${total} khung`); }
    ff.stdin.end();
    const code = await ffClosed;
    if(code!==0) throw new Error(`ffmpeg thoát mã ${code} — ${OUT} hỏng`);
    console.log(`\nxong: ${OUT}`);
  }

  ws.close(); await cleanup();
  process.exit(0);
})().catch(async e=>{console.error('LỖI:',e.message);await cleanup();process.exit(1)});

async function loadWS(){
  try{ return require('ws'); }catch(e){}
  // fallback: client WebSocket tối giản cho CDP
  return class extends require('events').EventEmitter{
    constructor(url){
      super();
      const u=new URL(url);
      const key=require('crypto').randomBytes(16).toString('base64');
      const sock=net.connect(+u.port,u.hostname,()=>{
        sock.write(`GET ${u.pathname} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`);
      });
      this.sock=sock; let buf=Buffer.alloc(0); let up=false;
      sock.on('data',d=>{
        buf=Buffer.concat([buf,d]);
        if(!up){
          const i=buf.indexOf('\r\n\r\n');
          if(i<0) return;
          buf=buf.slice(i+4); up=true; this.emit('open');
        }
        while(buf.length>=2){
          const op=buf[0]&0x0f; let len=buf[1]&0x7f, off=2;
          if(len===126){ if(buf.length<4)return; len=buf.readUInt16BE(2); off=4; }
          else if(len===127){ if(buf.length<10)return; len=Number(buf.readBigUInt64BE(2)); off=10; }
          if(buf.length<off+len) return;
          const pl=buf.slice(off,off+len); buf=buf.slice(off+len);
          if(op===1) this.emit('message',pl.toString('utf8'));
          else if(op===8){ this.emit('close'); sock.end(); return; }
        }
      });
      sock.on('error',e=>this.emit('error',e));
    }
    send(s){
      const p=Buffer.from(s,'utf8'), mask=require('crypto').randomBytes(4);
      let hdr;
      if(p.length<126) hdr=Buffer.from([0x81,0x80|p.length]);
      else if(p.length<65536){ hdr=Buffer.alloc(4); hdr[0]=0x81; hdr[1]=0xfe; hdr.writeUInt16BE(p.length,2); }
      else { hdr=Buffer.alloc(10); hdr[0]=0x81; hdr[1]=0xff; hdr.writeBigUInt64BE(BigInt(p.length),2); }
      const m=Buffer.from(p); for(let i=0;i<m.length;i++) m[i]^=mask[i&3];
      this.sock.write(Buffer.concat([hdr,mask,m]));
    }
    close(){ try{this.sock.end()}catch(e){} }
  };
}
