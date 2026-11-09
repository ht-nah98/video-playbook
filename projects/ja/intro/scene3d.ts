// `ja/intro` — intro kênh 99の発見, DNA A「漆と金」 (projects/ja/intro/DNA.md, TREATMENT.md — đọc trước).
// Render: cd studio3d/app && bun scripts/render.ts video --set ja/intro --samples auto --shutter 0.2 → out/ja/intro/intro.mp4
// Sơn mài đen, lá vàng, son đỏ. Tám phần cảnh theo câu lời; các dòng TREATMENT đánh dấu #n.
// Mốc lấy từ data3d/lyrics.json (cụm lời của người dùng căn vào mốc whisper — data3d.py) và lưới nhịp audio.json —
// không gõ số giây tay. Mọi thứ là hàm thuần của t (hash, không Math.random); Euler luôn ghi thứ tự trục (LESSONS §74).
// Chữ: đường viền Shippori Mincho Bold (data3d/glyphs.json) đùn khối có vát — chữ Hán nét mảnh, voxel sẽ răng cưa.
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { Scene, type Frame, type PostOverrides } from '@3d/engine/scene';
import { FSPass, W, H } from '@3d/engine/gl';
import { clamp, lerp, ease, prog, hash, pulse, hexToLinear } from '@3d/engine/util';
import { DATA_DIR } from '@3d/engine/dataset';

type Glyph = { adv: number; rings: number[][] };
type Vox = { w: number; h: number; cell: number; vox: [number, number, number, number, number, number][] };
type P3 = { x: number; y: number; z: number };
type Pose = { pos: P3; tgt: P3; fov: number };
const v = (x: number, y: number, z: number): P3 => ({ x, y, z });
const mix3 = (a: P3, b: P3, u: number): P3 => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) });

const PAL = { ink: '#050403', ink2: '#120B07', lacquer: '#070505', gold: '#D9A441', goldDeep: '#9C6B1E', shu: '#9A1D12', ivory: '#EFE3C8', paper: '#F3DDB0' };
const lin = (hex: string) => hexToLinear(hex);
const v3 = (h: string) => `vec3(${lin(h).map((x) => x.toFixed(5)).join(',')})`;
const col = (hex: string, k = 1) => new THREE.Color().setRGB(...(lin(hex).map((x) => x * k) as [number, number, number]), THREE.LinearSRGBColorSpace);

function area(r: number[]) { let a = 0; for (let i = 0; i < r.length; i += 2) { const j = (i + 2) % r.length; a += r[i]! * r[j + 1]! - r[j]! * r[i + 1]!; } return a / 2; }
function inside(x: number, y: number, r: number[]) {
  let c = false;
  for (let i = 0, j = r.length - 2; i < r.length; j = i, i += 2) {
    const xi = r[i]!, yi = r[i + 1]!, xj = r[j]!, yj = r[j + 1]!;
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const inGlyph = (g: Glyph, x: number, y: number) => g.rings.reduce((n, r) => n + (inside(x, y, r) ? 1 : 0), 0) % 2 === 1;

type Txt = THREE.Group & { base?: { x: number; s: number }[] };

export default class IntroJa extends Scene {
  cam = new THREE.PerspectiveCamera(35, W / H, 0.05, 200);
  world = new THREE.Scene();
  bg = new FSPass(/* glsl */ `
    uniform float uT;
    void main() {
      vec2 p = vUv - 0.5;
      vec3 c = mix(${v3(PAL.ink)}, ${v3(PAL.ink2)}, smoothstep(0.05, 0.75, vUv.y));
      c += ${v3(PAL.shu)} * 0.05 * exp(-pow((vUv.y - 0.42) * 7.0, 2.0)) * (0.7 + 0.3 * fbm(vec3(p * vec2(2.0, 1.0), uT * 0.03), 3));
      fragColor = vec4(c, 1.0);
    }`, { uT: { value: 0 } });
  G: Record<string, Glyph> = {};
  geo: Record<string, THREE.ExtrudeGeometry> = {};
  mat!: Record<'gold' | 'goldDeep' | 'shu' | 'ivory' | 'rock', THREE.MeshPhysicalMaterial> & { ring: THREE.MeshBasicMaterial; glow: THREE.MeshBasicMaterial; white: THREE.MeshBasicMaterial; shuGlow: THREE.MeshBasicMaterial };
  Wd: Record<string, number> = {};
  bars: number[] = []; beats: number[] = [];
  O: Record<string, THREE.Object3D> = {};
  ripples: THREE.Mesh[] = []; rippleAt: [number, number, number, number][] = [];
  enso!: THREE.InstancedMesh; drop!: THREE.Mesh;
  cracks!: THREE.InstancedMesh; crackSeg: { x: number; y: number; a: number; l: number; t: number }[] = [];
  wall: THREE.Group[] = []; rakes: THREE.Mesh[] = []; tunnel: THREE.Mesh[] = [];
  math: THREE.Object3D[] = []; atom!: THREE.Group; electrons: THREE.Mesh[] = []; orbits: THREE.Mesh[] = [];
  confG!: THREE.InstancedMesh; confS!: THREE.InstancedMesh;
  lanterns: { g: THREE.Group; m: THREE.MeshStandardMaterial }[] = [];
  mascot!: THREE.Mesh; mvox!: THREE.InstancedMesh; mdata!: Vox; mframe!: THREE.Group;
  dust!: THREE.InstancedMesh;
  m4 = new THREE.Matrix4(); q = new THREE.Quaternion(); e = new THREE.Euler(); p = new THREE.Vector3(); s = new THREE.Vector3();

  // ------------------------------------------------------------------ setup
  override async init() {
    const r = this.ctx.renderer, au = this.ctx.audio;
    this.G = (await (await fetch(`${DATA_DIR}/glyphs.json`)).json()).glyphs;
    for (const l of this.ctx.lyrics.lines as any[]) for (const w of l.words) this.Wd[`${l.id}.${w.w.replace(/[’‘]/g, "'")}`] = w.start;   // Lyrics.smart() đổi ' thành ’
    this.bars = au.downbeats; this.beats = au.beats;

    const pm = new THREE.PMREMGenerator(r);
    this.world.environment = pm.fromScene(this.studio(), 0.03).texture;   // studio tối có softbox (DNA: không RoomEnvironment)
    this.mat = {
      gold: new THREE.MeshPhysicalMaterial({ color: col(PAL.gold), metalness: 1, roughness: 0.24, clearcoat: 0.4, clearcoatRoughness: 0.15 }),
      goldDeep: new THREE.MeshPhysicalMaterial({ color: col(PAL.goldDeep), metalness: 1, roughness: 0.38 }),
      shu: new THREE.MeshPhysicalMaterial({ color: col(PAL.shu), metalness: 0, roughness: 0.55, clearcoat: 0.45, clearcoatRoughness: 0.2 }),
      ivory: new THREE.MeshPhysicalMaterial({ color: col(PAL.ivory), metalness: 0, roughness: 0.4, clearcoat: 0.6 }),
      rock: new THREE.MeshPhysicalMaterial({ color: col('#0B0909'), metalness: 0.2, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1 }),
      ring: new THREE.MeshBasicMaterial({ color: col(PAL.gold, 2.2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
      glow: new THREE.MeshBasicMaterial({ color: col(PAL.gold, 3.0) }),
      white: new THREE.MeshBasicMaterial({ color: col('#FFF4DC', 6.0) }),
      shuGlow: new THREE.MeshBasicMaterial({ color: col('#D2341F', 1.6), transparent: true, depthWrite: false }),
    };
    const w = this.world, M = this.mat;
    w.fog = new THREE.Fog(col(PAL.ink2), 12, 34);
    const floor = new Reflector(new THREE.PlaneGeometry(160, 160), { color: 0x181818, textureWidth: 1920, textureHeight: 1080, clipBias: 0.003 });
    floor.rotation.set(-Math.PI / 2, 0, 0, 'XYZ'); w.add(floor);
    // Reflector trộn OVERLAY (không nhân) → lớp sơn đen bán trong giữ ~15% phản chiếu (DNA)
    const lac = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.MeshBasicMaterial({ color: col(PAL.lacquer), transparent: true, opacity: 0.85, depthWrite: false }));
    lac.rotation.set(-Math.PI / 2, 0, 0, 'XYZ'); lac.position.y = 0.002; lac.renderOrder = -1; w.add(lac);
    const key = new THREE.DirectionalLight(col('#FFE9C8'), 2.2); key.position.set(-5, 9, 7);
    const rim = new THREE.DirectionalLight(col('#FF7A45'), 1.1); rim.position.set(7, 3, -8);
    const fill = new THREE.DirectionalLight(col('#8FA6FF'), 0.25); fill.position.set(6, 2, 8);
    w.add(key, rim, fill);
    const add = <T extends THREE.Object3D>(k: string, o: T) => { this.O[k] = o; o.visible = false; w.add(o); return o; };
    const T = (k: string) => this.t(k);

    // #2 giọt vàng, gợn ; #3 円相 (150 đốt cọ, dày ở đầu nét, khô ở cuối)
    this.drop = add('drop', new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 12), M.glow));
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(new THREE.RingGeometry(0.985, 1, 160), M.ring.clone());
      m.rotation.set(-Math.PI / 2, 0, 0, 'XYZ'); m.position.y = 0.006; m.visible = false; w.add(m); this.ripples.push(m);
    }
    const ENSO = 150;
    this.enso = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.012, 1), M.ring, ENSO); this.enso.count = 0; w.add(this.enso);
    for (let i = 0; i < ENSO; i++) {
      const u = i / ENSO, a = 0.4 + u * Math.PI * 2 * 0.93, R = 2.6 + 0.08 * Math.sin(u * 9);
      const wdt = 0.05 + 0.2 * Math.pow(1 - u, 0.7) * (0.75 + 0.25 * hash(i, 11)), len = (2 * Math.PI * R) / ENSO * 1.25;
      this.e.set(0, -a, 0, 'XYZ'); this.q.setFromEuler(this.e); this.p.set(Math.cos(a) * R, 0.006, Math.sin(a) * R); this.s.set(wdt, 1, len);
      this.m4.compose(this.p, this.q, this.s); this.enso.setMatrixAt(i, this.m4);
    }

    // #4–7 なぜ？ (son) + vết nứt kintsugi chạy trong lòng nét chữ ; どうして？ 答えを 探せ！
    const naze = add('naze', this.word('なぜ？', M.shu, 2.2, 0.32));
    this.cracks = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), M.glow, 400); this.cracks.count = 0; naze.add(this.cracks);
    let gx = -[...'なぜ？'].reduce((a, c) => a + this.G[c]!.adv, 0) / 2;
    for (const [ci, ch] of [...'なぜ？'].entries()) {
      const g = this.G[ch]!;
      for (let k = 0; k < 3; k++) {
        let x = 0, y = 0, tries = 0;
        do { x = hash(ci, k, tries, 1) * g.adv; y = hash(ci, k, tries, 2) * 0.9; tries++; } while (!inGlyph(g, x, y) && tries < 200);
        let a = hash(ci, k, 3) * Math.PI * 2;
        for (let st = 0; st < 22; st++) {
          a += (hash(ci, k, st, 4) - 0.5) * 1.3;
          const l = 0.035, nx = x + Math.cos(a) * l, ny = y + Math.sin(a) * l;
          if (!inGlyph(g, nx, ny)) { a += Math.PI * 0.6; continue; }
          this.crackSeg.push({ x: (gx + (x + nx) / 2) * 2.2, y: ((y + ny) / 2) * 2.2, a, l: l * 2.2, t: (st / 22) * 0.35 + k * 0.06 });
          x = nx; y = ny;
        }
      }
      gx += g.adv;
    }
    add('doushite', this.word('どうして？', M.gold, 0.78, 0.12));
    add('kotae', this.word('答えを', M.ivory, 0.62, 0.08));
    add('sagase', this.word('探せ！', M.gold, 0.95, 0.16));

    // #8–11 tường chữ số → 枯山水
    const digits = add('wall', new THREE.Group());
    for (let r0 = 0; r0 < 5; r0++) for (let c = 0; c < 12; c++) {
      const g = this.word(String(Math.floor(hash(r0, c, 7) * 10)), M.goldDeep, 0.7, 0.12);
      g.position.set((c - 5.5) * 0.9, 0.6 + r0 * 0.95, -5.2); digits.add(g); this.wall.push(g);
    }
    const garden = add('garden', new THREE.Group());
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), M.rock); rock.scale.set(1.3, 0.7, 1.0); rock.position.set(-2.6, 0.35, -0.6); garden.add(rock);
    for (let i = 0; i < 14; i++) {
      const rr = 1.5 + i * 0.32, m = new THREE.Mesh(new THREE.RingGeometry(rr - 0.012, rr + 0.012, 200), M.ring.clone());
      m.rotation.set(-Math.PI / 2, 0, 0, 'XYZ'); m.position.set(-2.6, 0.004, -0.6); garden.add(m); this.rakes.push(m);
    }
    add('kakureta', this.word('隠れた', M.ivory, 0.75, 0.1));
    add('sekai', this.word('世界', M.gold, 1.9, 0.3));

    // #12–15 đường hầm vòng vàng, tia sét, 未来
    const tun = add('tunnel', new THREE.Group());
    for (let i = 0; i < 16; i++) {
      const m = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.025, 8, 160), M.glow); m.position.set(0, 1.7, 2 - i * 1.5); tun.add(m); this.tunnel.push(m);
    }
    add('mieru', this.word('見える', M.ivory, 0.6, 0.08));
    add('visual', this.word('ビジュアル', M.gold, 1.25, 0.2));
    add('hirameku', this.word('ひらめく', M.ivory, 0.8, 0.1));
    const boltG = add('bolt', new THREE.Group());
    let bx = 0.3, by = 4.6;
    for (let i = 0; i < 9; i++) {
      const nx = bx + (hash(i, 21) - 0.5) * 0.9, ny = by - 0.5;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.05, Math.hypot(nx - bx, ny - by), 0.05), M.white);
      seg.position.set((bx + nx) / 2, (by + ny) / 2, -3); seg.rotation.set(0, 0, Math.atan2(nx - bx, by - ny), 'XYZ'); boltG.add(seg);
      bx = nx; by = ny;
    }
    add('mirai', this.word('未来！', M.gold, 2.0, 0.3));

    // #16–18 朱印 + vết mực
    const seal = add('seal', new THREE.Group());
    seal.add(new THREE.Mesh(new THREE.BoxGeometry(3.0, 3.0, 0.7), M.shu));
    for (const [x, y, bw, bh] of [[0, 1.46, 3.08, 0.1], [0, -1.46, 3.08, 0.1], [1.46, 0, 0.1, 3.08], [-1.46, 0, 0.1, 3.08]] as const) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.78), M.gold); b.position.set(x, y, 0); seal.add(b);
    }
    const s99 = this.word('99', M.ivory, 2.1, 0.16); s99.position.set(0, -0.78, 0.35); seal.add(s99);
    add('ink', new THREE.Mesh(new THREE.RingGeometry(2.0, 2.12, 4, 1), M.shuGlow));
    add('hakken', this.word('の発見！', M.gold, 1.12, 0.2));

    // #19–22 toán vàng / nguyên tử son / hoa giấy
    const mg = add('mathG', new THREE.Group());
    const tor = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.13, 160, 16), M.gold); tor.position.set(0, 1.9, 0);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.85), M.goldDeep); cube.position.set(-1.1, 0.7, 0.4);
    const sph = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 1), new THREE.MeshBasicMaterial({ color: col(PAL.gold, 2.0), wireframe: true })); sph.position.set(1.0, 0.75, 0.3);
    mg.add(tor, cube, sph); this.math = [tor, cube, sph];
    this.atom = add('atom', new THREE.Group());
    for (let i = 0; i < 7; i++) {
      const n = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 12), i % 2 ? M.shu : M.ivory);
      n.position.set((hash(i, 31) - 0.5) * 0.35, 1.5 + (hash(i, 32) - 0.5) * 0.35, (hash(i, 33) - 0.5) * 0.35); this.atom.add(n);
    }
    for (let i = 0; i < 3; i++) {
      const o = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.018, 8, 160), M.glow); o.position.set(0, 1.5, 0); this.atom.add(o); this.orbits.push(o);
      const el = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 8), M.white); this.atom.add(el); this.electrons.push(el);
    }
    add('sugaku', this.word('数学も', M.gold, 0.8, 0.12));
    add('kagaku', this.word('科学も', M.shu, 0.8, 0.12));
    add('motto', this.word('もっと', M.ivory, 0.9, 0.12));
    add('omo1', this.word('面白い！', M.shu, 1.45, 0.24));
    const NC = 300, pg = new THREE.PlaneGeometry(0.09, 0.13);
    this.confG = new THREE.InstancedMesh(pg, new THREE.MeshPhysicalMaterial({ color: col(PAL.gold), metalness: 1, roughness: 0.3, side: THREE.DoubleSide }), NC);
    this.confS = new THREE.InstancedMesh(pg, new THREE.MeshPhysicalMaterial({ color: col(PAL.shu), roughness: 0.6, side: THREE.DoubleSide }), NC);
    this.confG.visible = this.confS.visible = false;
    w.add(this.confG, this.confS);

    // #23–25 đèn lồng giấy
    const lan = add('lanterns', new THREE.Group());
    for (let i = 0; i < 7; i++) {
      const g = new THREE.Group(), m = new THREE.MeshStandardMaterial({ color: col(PAL.paper, 0.4), roughness: 0.9, emissive: col('#FFB45A'), emissiveIntensity: 0 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 16), m); body.scale.set(1, 1.25, 1);
      const capT = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.12, 24), M.rock); capT.position.y = 0.66;
      const capB = capT.clone(); capB.position.y = -0.66;
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 2.5, 6), M.goldDeep); cord.position.y = 1.95;
      g.add(body, capT, capB, cord); g.position.set((i - 3) * 1.55, 3.0 + 0.15 * Math.sin(i * 1.7), -1.4 - 0.3 * (i % 2)); lan.add(g);
      this.lanterns.push({ g, m });
    }
    add('shiru', this.word('知るほど、', M.ivory, 0.75, 0.1));
    add('sekaiwa', this.word('世界は', M.gold, 1.2, 0.2));
    add('omo2', this.word('面白い！', M.shu, 1.2, 0.2));

    // #26–30 mascot 2D→3D, hàng 99の発見, khung logo
    const tex = await new THREE.TextureLoader().loadAsync(`${DATA_DIR}/mascot-wave.png`); tex.colorSpace = THREE.SRGBColorSpace;
    this.mdata = await (await fetch(`${DATA_DIR}/mascot-wave.json`)).json();
    const MH = 3.7, mw = (MH * this.mdata.w) / this.mdata.h;
    this.mascot = add('mascot', new THREE.Mesh(new THREE.PlaneGeometry(mw, MH), new THREE.MeshBasicMaterial({ map: tex, transparent: true, color: col('#FFFFFF', 0.85) })));
    this.mframe = add('mframe', new THREE.Group());
    for (const [x, y, bw, bh] of [[0, MH / 2 + 0.06, mw + 0.24, 0.06], [0, -MH / 2 - 0.06, mw + 0.24, 0.06], [mw / 2 + 0.09, 0, 0.06, MH + 0.18], [-mw / 2 - 0.09, 0, 0.06, MH + 0.18]] as const) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.08), M.gold); b.position.set(x, y, 0); this.mframe.add(b);
    }
    const vm = new THREE.MeshPhysicalMaterial({ metalness: 0.85, roughness: 0.3, color: 0xffffff });
    this.mvox = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), vm, this.mdata.vox.length); this.mvox.visible = false; w.add(this.mvox);
    const gc = col(PAL.gold);
    this.mdata.vox.forEach((vx, i) => { const c = new THREE.Color().setRGB(vx[2] / 255, vx[3] / 255, vx[4] / 255, THREE.SRGBColorSpace); this.mvox.setColorAt(i, c.lerp(gc, 0.55)); });
    const logo = add('logo', new THREE.Group());
    const L1 = this.word('99の発見', M.gold, 1.7, 0.28); this.O.L1 = L1; logo.add(L1);
    const L2 = this.word('知るほど、世界は面白い', M.ivory, 0.36, 0.04); this.O.L2 = L2; L2.position.set(0, -0.95, 0.2); logo.add(L2);
    const sm = new THREE.Group(); this.O.mini = sm; sm.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.22), M.shu));
    const sg = this.word('発', M.ivory, 0.62, 0.05); sg.position.set(0, -0.25, 0.11); sm.add(sg); sm.position.set(4.35, 0.75, 0); logo.add(sm);
    add('lets', this.word("Let's", M.shu, 0.9, 0.14));
    add('go', this.word('go!', M.shu, 1.1, 0.16));

    this.dust = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.018, 0), M.glow, 260); w.add(this.dust);

    // gợn vàng: [mốc, x, z, cỡ] — mỗi sự kiện hai vòng
    this.rippleAt = [[this.beats[0]!, 0, 0, 0.6], [T('why.なぜ？') + 0.16, 0, 0, 1], [T('hook1.99') + 0.14, -2.25, 0, 1], [T('hook2.99') + 0.14, 0, 0, 1.2]];
  }

  studio() {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: col('#0A0705'), side: THREE.BackSide })));
    const box = (bw: number, bh: number, c: string, k: number, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(bw, bh), new THREE.MeshBasicMaterial({ color: col(c, k), side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 1, 0); s.add(m);
    };
    box(26, 7, '#FFE6BC', 2.6, 0, 3.5, 16);   // sau lưng camera: thiếu tấm này mặt trước chữ vàng thành nâu (DNA)
    box(14, 5, '#FFE2B0', 2.2, -4, 12, 6);
    box(10, 3, '#FFD9A0', 1.4, 8, 5, 10);
    box(18, 1.2, '#C2301C', 1.6, 0, 3, -14);
    box(6, 6, '#9FB4FF', 0.35, -12, 4, -2);
    return s;
  }

  /** Một dòng chữ khối: gốc = giữa đường chân chữ; size = cỡ em. Con: mỗi ký tự một mesh, `base` giữ vị trí gốc. */
  word(s: string, mat: THREE.Material, size: number, depth: number): Txt {
    const g: Txt = new THREE.Group(); g.base = [];
    const total = [...s].reduce((a, ch) => a + (this.G[ch]?.adv ?? 0.5), 0) * size;
    let x = -total / 2;
    for (const ch of s) {
      const gl = this.G[ch];
      if (!gl) throw new Error(`ja/intro: glyphs.json thiếu 「${ch}」 (data3d.py EXTRA / lời)`);
      const geo = (this.geo[`${ch}|${depth / size}`] ??= this.extrude(gl, depth / size));
      const m = new THREE.Mesh(geo, mat); m.scale.setScalar(size); m.position.x = x; g.add(m); g.base.push({ x, s: size });
      x += gl.adv * size;
    }
    return g;
  }

  extrude(gl: Glyph, depth: number) {
    const rings = gl.rings.filter((r) => r.length >= 6);
    if (!rings.length) return new THREE.ExtrudeGeometry([], { depth });
    const big = rings.reduce((a, b) => (Math.abs(area(b)) > Math.abs(area(a)) ? b : a)), sgn = Math.sign(area(big));
    const outers = rings.filter((r) => Math.sign(area(r)) === sgn), holes = rings.filter((r) => Math.sign(area(r)) !== sgn);
    const pts = (r: number[]) => { const p: THREE.Vector2[] = []; for (let i = 0; i < r.length; i += 2) p.push(new THREE.Vector2(r[i]!, r[i + 1]!)); return p; };
    const shapes = outers.map((o) => { const sh = new THREE.Shape(pts(o)); for (const h of holes) if (inside(h[0]!, h[1]!, o)) sh.holes.push(new THREE.Path(pts(h))); return sh; });
    const geo = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: true, bevelThickness: depth * 0.35, bevelSize: 0.012, bevelSegments: 3, curveSegments: 1 });
    geo.translate(0, 0, -depth / 2);
    return geo;
  }

  t(k: string) { const x = this.Wd[k]; if (x === undefined) throw new Error(`ja/intro: không có cụm ${k} trong lyrics.json`); return x; }

  /** Hiện o trong [a, b) ở (x, y, z), quay ry, cỡ sc. → có hiện không. */
  at(o: THREE.Object3D, a: number, b: number, t: number, x: number, y: number, z: number, ry = 0, sc = 1) {
    o.visible = t >= a && t < b; if (!o.visible) return false;
    o.position.set(x, y, z); o.rotation.set(0, ry, 0, 'XYZ'); o.scale.setScalar(sc); return true;
  }

  /** "Đập": rơi từ độ cao hgt trong d giây, nén khi chạm. */
  slam(t: number, t0: number, d = 0.14, hgt = 3) {
    const u = prog(t, t0, t0 + d, ease.inQuad);
    return { dy: hgt * (1 - u), sq: t >= t0 + d ? 1 - 0.14 * pulse(t, t0 + d, 0.06) : 1 };
  }

  camAt(t: number): Pose {
    const T = (k: string) => this.t(k);
    const tN = T('why.なぜ？'), tS = T('why.探せ！'), tH = T('hidden.数字の'), tV = T('visual.見える'), tM = T('visual.未来！');
    const t9 = T('hook1.99'), tF = T('fun.数学も'), tMo = T('fun.もっと'), tK = T('know.知るほど、'), tD = T('hook2.99'), tL = T("go.Let's"), tNo2 = T('hook2.の');
    const S: [number, number, (t: number) => Pose][] = [
      // #1–3 từ trên hạ xuống, xoay nhẹ quanh 円相
      [0, 0, (u) => { const k = prog(u, 0, tN - 0.05, ease.inOutCubic), a = 0.5 - 0.5 * k, R = lerp(4, 9.0, k); return { pos: v(Math.sin(a) * R + 0.6 * k, lerp(9.5, 1.25, k), Math.cos(a) * R), tgt: v(0, lerp(0, 1.35, k), 0), fov: 36 }; }],
      // #4–6 thấp chính diện, đẩy nhẹ ; #7 lao xuyên dấu ？
      [tN - 0.05, 0, (u) => {
        const dive = prog(u, tS + 0.22, tH, ease.inCubic);   // 探せ！ đọc kịp trước khi lao
        return { pos: mix3(v(0.6, 1.25, 9.0 - 0.25 * (u - tN)), v(2.25, 1.05, -2.5), dive), tgt: mix3(v(0, 1.35, 0), v(2.25, 1.0, -6), dive), fov: lerp(36, 50, dive) };
      }],
      [tH - 0.02, 0, (u) => ({ pos: v(-0.4 + 0.3 * (u - tH), 2.1 + 0.1 * (u - tH), 9.2 - 0.2 * (u - tH)), tgt: v(-0.8, 1.2, -1.5), fov: 36 })],
      // #12–15 lên trục đường hầm, bay xuyên tới 未来
      [tV - 0.02, 0.35, (u) => { const f = prog(u, tM, t9, ease.inCubic); return { pos: v(0.15 * Math.sin(u * 2), 1.7, lerp(8.5 - 0.6 * (u - tV), -4, f)), tgt: v(0, 1.6, lerp(-6, -13, f)), fov: 42 }; }],
      [t9 - 0.02, 0, (u) => ({ pos: v(0.0, 1.5, 9.5 - 0.35 * (u - t9)), tgt: v(0, 1.2, 0), fov: 32 })],
      // #19–22 rộng; もっと đẩy nhanh
      [tF - 0.02, 0, (u) => { const k = prog(u, tMo, tMo + 0.45, ease.inOutCubic); return { pos: v(0.2 * Math.sin(u), 1.6, lerp(10.5, 7.2, k) - 0.15 * (u - tF)), tgt: v(0, 1.45, 0), fov: 36 }; }],
      // #23–25 trượt ngang dọc hàng đèn
      [tK - 0.02, 0, (u) => { const k = prog(u, tK, tD, ease.inOutQuad); return { pos: v(lerp(-3.8, 3.8, k), 1.9, 8.8), tgt: v(lerp(-2.6, 2.6, k), 1.8, 0), fov: 38 }; }],
      // #26–28 thấp kiểu anh hùng → lùi
      [tD - 0.02, 0, (u) => { const k = prog(u, tNo2, tNo2 + 0.8, ease.inOutCubic); return { pos: v(0, lerp(0.55, 1.25, k), lerp(8.6, 10.8, k)), tgt: v(0, lerp(1.6, 0.85, k), 0), fov: lerp(36, 30, k) }; }],
      [tL - 0.02, 0, (u) => ({ pos: v(0, 1.25, 10.8 - 0.22 * (u - tL)), tgt: v(0, 0.75, 0), fov: 30 })],
    ];
    let i = 0; for (let j = 0; j < S.length; j++) if (t >= S[j]![0]) i = j;
    const [t0, blend, f] = S[i]!;
    const cur = f(t);
    if (i === 0 || blend <= 0 || t >= t0 + blend) return cur;
    const prev = S[i - 1]![2](t0), u = ease.inOutCubic(clamp((t - t0) / blend));
    return { pos: mix3(prev.pos, cur.pos, u), tgt: mix3(prev.tgt, cur.tgt, u), fov: lerp(prev.fov, cur.fov, u) };
  }

  // ------------------------------------------------------------------ frame
  render(f: Frame, out: THREE.WebGLRenderTarget): PostOverrides {
    const { renderer } = this.ctx;
    const t = f.t, O = this.O, T = (k: string) => this.t(k);
    let flash = 0, shake = 0;
    const flashAt = (t0: number, k = 1) => { if (t >= t0 && t < t0 + 2 / 60) flash += k; };
    const tN = T('why.なぜ？'), tD2 = T('why.どうして？'), tK0 = T('why.答えを'), tS = T('why.探せ！');
    const tH = T('hidden.数字の'), tU = T('hidden.裏に'), tKk = T('hidden.隠れた'), tSe = T('hidden.世界');
    const tV = T('visual.見える'), tVi = T('visual.ビジュアル'), tHi = T('visual.ひらめく'), tM = T('visual.未来！');
    const t9 = T('hook1.99'), tNo = T('hook1.の'), tHk = T('hook1.発見！');
    const tF = T('fun.数学も'), tKa = T('fun.科学も'), tMo = T('fun.もっと'), tO1 = T('fun.面白い！');
    const tK = T('know.知るほど、'), tSw = T('know.世界は'), tO2 = T('know.面白い！');
    const tD = T('hook2.99'), tNo2 = T('hook2.の'), tHk2 = T('hook2.発見！'), tL = T("go.Let's"), tG = T('go.go!');
    const END = this.ctx.audio.duration;

    // #2 giọt vàng ; gợn
    const b0 = this.beats[0]!;
    if (this.at(this.drop, b0 - 0.3, b0, t, 0, 4 * (1 - prog(t, b0 - 0.3, b0, ease.inQuad)) + 0.07, 0)) this.drop.scale.set(1, 1 + 1.5 * prog(t, b0 - 0.3, b0), 1);
    this.ripples.forEach((m, i) => {
      const [t0, x, z, k] = this.rippleAt[i >> 1] ?? [1e9, 0, 0, 0];
      const tt = t0 + (i % 2) * 0.12, u = prog(t, tt, tt + 1.6, ease.outCubic);
      m.visible = t >= tt && u < 1; if (!m.visible) return;
      m.position.set(x, 0.006, z); m.scale.setScalar((0.4 + u * 5.5) * k); (m.material as THREE.MeshBasicMaterial).opacity = (1 - u) * 0.9;
    });
    // #3 円相: mỗi beat vẽ 1/3 vòng; tắt khi sang phần 数字
    const ek = [this.beats[1]!, this.beats[2]!, this.beats[3]!].reduce((a, s0) => a + prog(t, s0, s0 + 0.35, ease.outCubic) / 3, 0);
    this.enso.count = t < tH ? Math.floor(150 * ek) : 0; this.enso.visible = this.enso.count > 0;

    // #4–7
    const sN = this.slam(t, tN, 0.16, 6);
    if (this.at(O.naze!, tN - 0.01, tH, t, 0, sN.dy, 0)) O.naze!.scale.set(1 / Math.sqrt(sN.sq), sN.sq, 1);
    shake += 0.07 * pulse(t, tN + 0.16, 0.08); flashAt(tN + 0.16, 0.5);
    this.cracks.count = 0;
    if (t >= tD2) {
      for (const c of this.crackSeg) {
        if (t < tD2 + c.t) continue;
        this.e.set(0, 0, c.a, 'XYZ'); this.q.setFromEuler(this.e); this.p.set(c.x, c.y, 0.3); this.s.set(c.l * 1.15, 0.035, 0.03);
        this.m4.compose(this.p, this.q, this.s); this.cracks.setMatrixAt(this.cracks.count++, this.m4);
      }
      this.cracks.instanceMatrix.needsUpdate = true;
    }
    const sD = this.slam(t, tD2, 0.12, 2.5);
    this.at(O.doushite!, tD2, tH, t, 2.55, 2.4 + sD.dy, 0.9, -0.15);
    this.at(O.kotae!, tK0, tH, t, -3.0, 2.45 - 0.4 * (1 - prog(t, tK0, tK0 + 0.25, ease.outCubic)), 0.9, 0.15);
    const sS = this.slam(t, tS, 0.12, 2.5);
    this.at(O.sagase!, tS, tH, t, -1.2, 0.06 + sS.dy, 3.0, 0.2);

    // #8–11
    O.wall!.visible = t >= tH && t < tV;
    this.wall.forEach((g, i) => {
      const c = i % 12, rr = Math.floor(i / 12), a = tH + (rr * 0.12 + c * 0.012);
      const flip = prog(t, tU + c * 0.03, tU + c * 0.03 + 0.35, ease.inCubic);
      g.visible = t >= a && flip < 1; g.rotation.set((-Math.PI / 2) * flip, 0, 0, 'XYZ');
      g.position.y = (0.6 + rr * 0.95) * (1 - flip) + 1.2 * (1 - prog(t, a, a + 0.12, ease.inQuad));
    });
    O.garden!.visible = t >= tU && t < tV + 0.6;
    this.rakes.forEach((m, i) => {
      const u = prog(t, tU + i * 0.04, tU + i * 0.04 + 0.4, ease.outCubic), lift = prog(t, tV, tV + 0.5, ease.inCubic);
      m.scale.setScalar(0.3 + 0.7 * u); m.position.y = 0.004 + lift * (0.4 + i * 0.25);
      (m.material as THREE.MeshBasicMaterial).opacity = 0.55 * u * (0.75 + 0.25 * Math.sin(t * 2 + i)) * (1 - lift);
    });
    this.at(O.kakureta!, tKk, tV, t, 1.0, 2.55, 0.4, -0.15);
    this.at(O.sekai!, tSe, tV, t, 1.3, -1.6 + 2.2 * prog(t, tSe, tSe + 0.35, ease.outBack), 0.2, -0.15);

    // #12–15 đường hầm
    O.tunnel!.visible = t >= tV && t < t9;
    this.tunnel.forEach((m, i) => {
      const up = prog(t, tV + i * 0.025, tV + i * 0.025 + 0.4, ease.outBack);
      m.rotation.set((-Math.PI / 2) * (1 - up), 0, 0, 'XYZ'); m.position.y = lerp(0.01, 1.7, up);
      m.scale.setScalar(1 + 0.08 * Math.sin(t * 9 - i * 0.7) * prog(t, tVi, tVi + 0.3) + 0.15 * pulse(t, tHi, 0.15));
    });
    this.at(O.mieru!, tV, tM + 0.08, t, 0, 2.75, 0.5, 0);
    this.at(O.visual!, tVi, tM + 0.08, t, lerp(-6, 0, prog(t, tVi, tVi + 0.25, ease.outCubic)), 1.25, 0.5, 0);
    this.at(O.hirameku!, tHi, tM + 0.08, t, 0, 0.2, 0.5, 0);
    O.bolt!.visible = t >= tHi && t < tHi + 0.3 && Math.floor((t - tHi) * 30) % 3 !== 2;
    flashAt(tHi, 0.75); shake += 0.06 * pulse(t, tHi, 0.1);
    this.at(O.mirai!, tM, t9, t, 0, 0.9, -12, 0, 1.2 + 0.4 * prog(t, tM, t9));

    // #16–18 朱印
    const s9 = this.slam(t, t9, 0.14, 5);
    if (this.at(O.seal!, t9 - 0.01, tF, t, -2.25, 1.55 + s9.dy, 0)) {
      const bounce = this.beats.filter((b) => b > t9 + 0.1 && b < tNo).reduce((a, b) => a + 0.05 * pulse(t, b, 0.07), 0);
      O.seal!.rotation.set(-0.06, 0.32, 0, 'XYZ'); O.seal!.scale.set(0.92, 0.92 * (s9.sq - bounce), 0.92);
    }
    flashAt(t9 + 0.14, 0.9); shake += 0.1 * pulse(t, t9 + 0.14, 0.09);
    const b4 = this.bars.find((b) => b > t9 + 0.4)!;
    if (this.at(O.ink!, b4, tF, t, -2.25, 0.008, 0.3, 0, 0.6 + 0.9 * prog(t, b4, b4 + 0.8, ease.outCubic)))
      O.ink!.rotation.set(-Math.PI / 2, 0, Math.PI / 4, 'XYZ');
    this.mat.shuGlow.opacity = 0.55 * (1 - 0.6 * prog(t, b4 + 0.4, tF));
    this.at(O.hakken!, tNo, tF, t, 1.75, 1.0 + 0.25 * (1 - prog(t, tHk, tHk + 0.3, ease.outCubic)), 0.3, -0.1);

    // #19–22
    const push = prog(t, tMo, tMo + 0.35, ease.inOutCubic);
    if (this.at(O.mathG!, tF, tK, t, lerp(-3.4, -1.9, push), 0, lerp(0, 1.6, push), 0.25, prog(t, tF, tF + 0.25, ease.outBack)))
      this.math.forEach((m, i) => m.rotation.set(t * (0.6 + 0.2 * i), t * (0.9 - 0.15 * i), 0, 'XYZ'));
    if (this.at(this.atom, tKa, tK, t, lerp(3.4, 1.9, push), 0, lerp(0, 1.6, push), -0.25, prog(t, tKa, tKa + 0.25, ease.outBack))) {
      this.orbits.forEach((o, i) => o.rotation.set(Math.PI / 2 + i * 1.05, i * 0.8 + t * 0.3, 0, 'XYZ'));
      this.electrons.forEach((el, i) => {
        const a = t * (3.2 + i * 0.7) + i * 2;
        this.p.set(Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0).applyEuler(this.orbits[i]!.rotation); el.position.set(this.p.x, this.p.y + 1.5, this.p.z);
      });
    }
    this.at(O.sugaku!, tF, tMo + 0.05, t, lerp(-3.4, -2.6, push), lerp(3.3, 2.55, push), 0.5, 0.15);
    this.at(O.kagaku!, tKa, tMo + 0.05, t, lerp(3.4, 2.6, push), lerp(3.3, 2.55, push), 0.5, -0.15);
    this.at(O.motto!, tMo, tO1, t, 0, 2.7 - 0.3 * prog(t, tMo, tMo + 0.2), 1.0);
    const sO = this.slam(t, tO1, 0.1, 2);
    if (this.at(O.omo1!, tO1, tK, t, 0, 1.05 + sO.dy, 1.6)) O.omo1!.scale.set(1 / Math.sqrt(sO.sq), sO.sq, 1);
    flashAt(tO1 + 0.1, 0.8); shake += 0.09 * pulse(t, tO1 + 0.1, 0.1);
    this.confetti(t, tO1 + 0.1, tK);

    // #23–25 đèn lồng
    O.lanterns!.visible = t >= tK - 0.3 && t < tD;
    this.lanterns.forEach(({ g, m }, i) => {
      const on = prog(t, tK + i * 0.306, tK + i * 0.306 + 0.15) * (0.9 + 0.1 * Math.sin(t * 7 + i * 3));
      m.emissiveIntensity = 2.2 * on + 2.5 * pulse(t, tO2, 0.4) * prog(t, tO2, tO2 + 0.15) + 0.4 * f.a.kick * on;
      g.rotation.set(0, 0, 0.04 * Math.sin(t * 1.3 + i), 'XYZ');
    });
    this.at(O.shiru!, tK, tD, t, -4.4, 0.5, 1.4, 0.12);
    const sW = this.slam(t, tSw, 0.12, 2);
    this.at(O.sekaiwa!, tSw, tD, t, -0.3, 0.45 + sW.dy, 1.4);
    const sO2 = this.slam(t, tO2, 0.12, 2);
    this.at(O.omo2!, tO2, tD, t, 3.9, 0.45 + sO2.dy, 1.4, -0.12);

    // #26–30 mascot + 99 khổng lồ → hàng 99の発見 → logo
    const drop = this.bars.find((b) => b > tD + 0.3)!;          // ô nhịp drop
    const my = 1.9 + 0.4 * (1 - prog(t, tD, tD + 0.2, ease.outCubic));
    this.at(this.mascot, tD - 0.01, drop, t, -3.05, my, 0.8, 0.3);
    this.at(this.mframe, tD - 0.01, drop, t, -3.05, my, 0.8, 0.3);
    this.voxels(t, drop, -3.05, 1.9, 0.8, 0.3);
    shake += 0.12 * pulse(t, drop, 0.12) + (t > drop && t < tL ? 0.04 * f.a.kick : 0); flashAt(drop, 0.7);
    O.logo!.visible = t >= tD - 0.01;
    if (O.logo!.visible) {
      const lk = t >= tL ? prog(t, tL, tL + 0.5, ease.outCubic) : 0;
      O.logo!.position.set(0, 1.0 + (t >= tL ? 0.5 * (1 - lk) : 0), 0); O.logo!.rotation.set(0, 0, 0, 'XYZ'); O.logo!.scale.setScalar(t >= tL ? 0.85 + 0.15 * lk : 1);
      const L1 = O.L1 as Txt, row = prog(t, tNo2, tNo2 + 0.45, ease.inOutCubic), s9b = this.slam(t, tD, 0.14, 4), big = 2.3;
      L1.children.forEach((m, i) => {
        const b = L1.base![i]!;
        if (i < 2) {           // 99: to giữa khung → co về chỗ trong hàng
          const bx = (i === 0 ? -1 : 0) * b.s * this.G['9']!.adv * big;
          m.visible = t >= tD; m.position.set(lerp(bx, b.x, row), s9b.dy * (1 - row), 0);
          m.scale.set(b.s * lerp(big, 1, row), b.s * lerp(big, 1, row) * s9b.sq, b.s);
        } else {
          const ti = i === 2 ? tNo2 : tHk2 + (i - 3) * 0.08;
          m.visible = t >= ti; m.position.set(b.x, 0.6 * (1 - prog(t, ti, ti + 0.2, ease.outCubic)), 0); m.scale.setScalar(b.s);
        }
      });
      O.L2!.visible = t >= this.beats.find((b) => b > tL + 0.2)!;
      const bL = this.bars.find((b) => b > tL)!;               // triện 発 đóng đúng ô nhịp cuối
      O.mini!.visible = t >= bL - 0.12;
      if (O.mini!.visible) O.mini!.position.set(4.35, 0.75 + this.slam(t, bL - 0.12, 0.12, 1.5).dy, 0);
      flashAt(bL, 0.6);
    }
    flashAt(tD + 0.14, 0.9); shake += 0.1 * pulse(t, tD + 0.14, 0.09);
    const pop = (o: THREE.Object3D, t0: number, x: number) => {
      const u = prog(t, t0, t0 + 0.45);
      this.at(o, t0, t0 + 0.45, t, x, 2.2 + 0.15 * u, 2.0, 0, ease.outBack(clamp(u * 3)) * (1 - ease.inCubic(clamp((u - 0.6) / 0.4))));
    };
    pop(O.lets!, tL, -2.6); pop(O.go!, tG, 2.6);

    // bụi vàng
    for (let i = 0; i < this.dust.count; i++) {
      const x = (hash(i, 1) - 0.5) * 22, z = -hash(i, 2) * 14 + 2, y = (hash(i, 3) * 6 + t * (0.08 + 0.1 * hash(i, 4))) % 6.2;
      this.p.set(x + Math.sin(t * 0.4 + i) * 0.2, y + 0.05, z);
      this.e.set(t * (0.5 + hash(i, 5)), t * 0.7, 0, 'XYZ'); this.q.setFromEuler(this.e);
      this.s.setScalar((0.35 + 0.8 * hash(i, 6)) * (1 + 0.6 * f.a.kick));
      this.m4.compose(this.p, this.q, this.s); this.dust.setMatrixAt(i, this.m4);
    }
    this.dust.instanceMatrix.needsUpdate = true;

    const c = this.camAt(t), cam = this.cam;
    cam.fov = c.fov; cam.position.set(c.pos.x + shake * Math.sin(t * 91), c.pos.y + shake * Math.sin(t * 77), c.pos.z);
    cam.up.set(0, 1, 0); cam.lookAt(c.tgt.x, c.tgt.y, c.tgt.z); cam.updateProjectionMatrix(); cam.updateMatrixWorld(true);
    this.bg.u.uT!.value = t;
    this.bg.render(renderer, out);
    renderer.setRenderTarget(out); renderer.clearDepth(); renderer.render(this.world, cam);
    const open = 1 - prog(t, 0, 0.3), close = prog(t, END - 0.35, END - 0.02);
    return { hud: 0, bloom: 0.5, bloomThreshold: 0.9, halation: 0.12, ca: 0.6, grain: 0.035, vignette: 0.45, fade: Math.max(open, close), flash };
  }

  /** #22 hoa giấy cắt: bắn từ giữa, cản gió, trọng lực, lật; vàng + son. Hàm thuần của t. */
  confetti(t: number, t0: number, t1: number) {
    const on = t >= t0 && t < t1;
    this.confG.visible = this.confS.visible = on;
    if (!on) return;
    const dt = t - t0, drag = (1 - Math.exp(-2.2 * dt)) / 2.2;
    [this.confG, this.confS].forEach((im, k) => {
      for (let i = 0; i < im.count; i++) {
        const a = hash(i, k, 41) * Math.PI * 2, el = 0.2 + hash(i, k, 42) * 1.1, sp = 4 + 6 * hash(i, k, 43);
        const vx = Math.cos(a) * Math.cos(el) * sp, vy = Math.sin(el) * sp, vz = Math.sin(a) * Math.cos(el) * sp * 0.6 + 1.5;
        this.p.set(vx * drag, 1.8 + vy * drag - 2.6 * dt * dt, 1.0 + vz * drag * 0.6);
        this.e.set(dt * (3 + 6 * hash(i, k, 44)), dt * (2 + 5 * hash(i, k, 45)), a, 'XYZ'); this.q.setFromEuler(this.e);
        this.s.setScalar(this.p.y < 0 ? 0 : 1);
        this.m4.compose(this.p, this.q, this.s); im.setMatrixAt(i, this.m4);
      }
      im.instanceMatrix.needsUpdate = true;
    });
  }

  /** #27 mascot 2D → khối vàng: từ ô nhịp drop, mỗi khối bay về phía camera và sang phải, xoay. Hàm thuần của t. */
  voxels(t: number, t0: number, x0: number, y0: number, z0: number, ry: number) {
    const on = t >= t0 && t < t0 + 1.6;
    this.mvox.visible = on; if (!on) return;
    const D = this.mdata, MH = 3.7, cs = MH / D.h, dt = t - t0, ca = Math.cos(ry), sa = Math.sin(ry);
    D.vox.forEach((vx, i) => {
      const lx = (vx[0] - D.w / 2 + 0.5) * cs, ly = (vx[1] + 0.5) * cs - MH / 2;
      const d = Math.max(0, dt - 0.15 * hash(i, 51));
      const fx = d * d * (6 + 8 * hash(i, 52)), fy = d * (1.5 + 3 * hash(i, 53)) - 3 * d * d, fz = d * d * (5 + 7 * hash(i, 54));
      this.p.set(x0 + lx * ca + fx, y0 + ly + fy, z0 - lx * sa + fz);
      this.e.set(d * 6 * hash(i, 55), d * 5 * hash(i, 56), 0, 'XYZ'); this.q.setFromEuler(this.e);
      this.s.set(cs * 0.95, cs * 0.95, cs * vx[5] * 0.5);
      this.m4.compose(this.p, this.q, this.s); this.mvox.setMatrixAt(i, this.m4);
    });
    this.mvox.instanceMatrix.needsUpdate = true;
  }
}
