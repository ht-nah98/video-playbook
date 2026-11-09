// `intro` v2 — channel intro "99% from scratch" (mascot-mv/projects/en/intro: DNA.md, TREATMENT.md — read those first).
// 99% = 99 of 100 blocks: a 10×10 floor fills over the song, from one block; the 100th, orange, is the viewer's.
// v2: every sung word is a 3D word made of cubes and moves the way it means; the mascot appears 3 times, enters as a
// clean 2D image and leaves by breaking into 3D cubes; dark look (p(doom), the reference video).
// Long version: the whole song. Short version: render from 14.68 with `?short=1` (fades in from black).
// Moments come from the lyric lines (data3d/lyrics.json `id`s, word times) and the beat grid, never typed in.
// TREATMENT.md rows are marked #n. Voxel/word/image data: projects/en/intro/data3d.py → data3d/.
import * as THREE from 'three';
import { Scene, type Frame, type PostOverrides } from '@3d/engine/scene';
import { FSPass, Layer2D, W, H } from '@3d/engine/gl';
import { F, font } from '@3d/engine/type';
import { clamp, lerp, ease, prog, hash, pulse, hexToLinear } from '@3d/engine/util';
import { DATA_DIR } from '@3d/engine/dataset';

type Vox = { w: number; h: number; cell: number; vox: [number, number, number, number, number, number][]; img?: [number, number] };
type P3 = { x: number; y: number; z: number };
type Pose = { pos: P3; tgt: P3; fov: number };
type Model = { data: Vox; mesh: THREE.InstancedMesh; own: THREE.Color[] };
type Word = { key: string; data: Vox; tIn: number; tOut: number; hot: boolean; at: P3; rot: [number, number, number]; k: number;
  enter: 'slam' | 'drop' | 'rise' | 'groups'; dir?: P3; exit: 'shatter' | 'sink' | 'none' | 'collapse'; groups?: number[];
  fx?: (c: number, r: number, t: number, l: P3) => P3 & { rx?: number } };

const SHORT = new URLSearchParams(location.search).has('short');
const PAL = { ink: '#05070C', ink2: '#0E1320', floor: '#0A0D14', grid: '#2A3550', block: '#1C2230', bone: '#EEE9DF', hot: '#FF6A2B' };
const lin = (hex: string) => hexToLinear(hex);
const v3 = (h: string) => `vec3(${lin(h).map((x) => x.toFixed(5)).join(',')})`;
const col = (hex: string, k = 1) => new THREE.Color().setRGB(...(lin(hex).map((x) => x * k) as [number, number, number]), THREE.LinearSRGBColorSpace);

const GAP = 0.62, TS = 0.5; // floor slot pitch, block size
const FALL = 0.42, DROP_H = 5;
const WV = 0.06; // word voxel size at k = 1 (a word is ~2 units tall)
const MH = 6; // mascot height (world units)
const MASCOT = { x: 4.9, z: 0.6, rot: -0.31 }; // idle builds here, facing the build camera
const OPEN = { x: -3.3, z: 0, rot: 0 }; // wave, the opening poster
const INVITE = { x: -4.4, z: -0.4, rot: 0.45 };
const WALL = { z: -3.9, k: 3 };
const RELIEF = { x: -8.5, k: 1.6 };
const v = (x: number, y: number, z: number): P3 => ({ x, y, z });
const mix3 = (a: P3, b: P3, u: number): P3 => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) });
const sineIO = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x));

/** Lit material whose emissive is the instance colour × k (glowing LEDs / lit type that still shows its faces). */
function glowMat(k: number, rough = 0.45) {
  const m = new THREE.MeshStandardMaterial({ roughness: rough, metalness: 0.1, color: 0xffffff });
  // k is baked into the shader as a constant (one program per k): a uniform set in onBeforeCompile is lost when
  // three.js reuses a cached program, and the glow then depended on render order (determinism check, 2026-10-09)
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n#ifdef USE_INSTANCING_COLOR\ntotalEmissiveRadiance += vColor.rgb * ${k.toFixed(4)};\n#endif`);
  };
  m.customProgramCacheKey = () => `glow${k}`;
  return m;
}

export default class IntroScene extends Scene {
  cam = new THREE.PerspectiveCamera(40, W / H, 0.05, 300);
  world = new THREE.Scene();
  bg = new FSPass(/* glsl */ `
    uniform float uT;
    void main() {
      vec2 p = vUv - 0.5;
      vec3 c = mix(${v3(PAL.ink)}, ${v3(PAL.ink2)}, smoothstep(-0.1, 0.6, vUv.y));
      c += ${v3(PAL.grid)} * 0.18 * exp(-pow((vUv.y - 0.45) * 9.0, 2.0));
      c += ${v3(PAL.ink2)} * 0.6 * fbm(vec3(p * vec2(3.0, 1.6), uT * 0.04), 3);
      fragColor = vec4(c, 1.0);
    }`, { uT: { value: 0 } });
  text = new Layer2D();
  box = new THREE.BoxGeometry(1, 1, 1);
  m4 = new THREE.Matrix4(); q = new THREE.Quaternion(); e = new THREE.Euler(); p = new THREE.Vector3(); s = new THREE.Vector3(); c = new THREE.Color();
  hotC = col(PAL.hot, 1.0); boneC = col(PAL.bone, 0.9);

  slots: P3[] = []; order: number[] = [];
  life1: number[] = []; sink1: number[] = []; life2: number[] = [];
  sparks!: THREE.InstancedMesh; tiles!: THREE.InstancedMesh; dust!: THREE.InstancedMesh; motes!: THREE.InstancedMesh; letters!: THREE.InstancedMesh;
  slotGlow!: THREE.Mesh; hover!: THREE.Mesh;
  M: Record<string, Model> = {};
  img: Record<string, THREE.Mesh> = {};
  words: Word[] = [];
  wordData: Record<string, Vox> = {};
  T: Record<string, number> = {};
  bars: number[] = []; beats: number[] = [];
  wt: Record<string, number[]> = {};
  turnRow = 0; turnCol = 0; slide: { k: number; to: number; t: number }[] = [];
  resting = 0; flashes: number[] = [];

  override async init() {
    const r = this.ctx.renderer;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap;
    const ly = this.ctx.lyrics, au = this.ctx.audio;
    for (const l of ly.lines as any[]) { this.T[l.id] = l.start; this.wt[l.id] = l.words.map((w: any) => w.start); }
    this.T.end = au.duration;
    this.T.drop = au.sections.find((x) => x.name === 'drop')!.start;
    this.T.tail = au.sections.find((x) => x.name === 'tail')!.start;
    this.bars = au.downbeats; this.beats = au.beats;
    this.T.lastBar = this.bars[this.bars.length - 1]!;
    const T = this.T;
    // "from" overlaps "work" in the source data: FROM goes between "work" and "scratch" (TREATMENT note)
    this.T.from = (this.wt.wy![3]! + this.wt.fs![1]!) / 2;
    this.T.scratch = this.wt.fs![1]!;

    // ---- world
    const w = this.world;
    w.fog = new THREE.Fog(col(PAL.ink), 18, 60);
    w.add(new THREE.HemisphereLight(col('#3A4A6A'), col(PAL.ink), 0.5));
    const key = new THREE.DirectionalLight(col('#AFC4FF'), 1.4);
    key.position.set(-6, 12, 8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
    key.shadow.bias = -0.0006;
    const rim = new THREE.DirectionalLight(col('#FF8A3D'), 0.55); rim.position.set(8, 4, -10);
    w.add(key, rim);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: col(PAL.floor), roughness: 0.62, metalness: 0.15 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
    w.add(ground);
    const gm = new THREE.MeshBasicMaterial({ color: col(PAL.grid, 1.4) });
    for (let i = 0; i <= 10; i++) {
      const a = new THREE.Mesh(new THREE.BoxGeometry(10 * GAP, 0.004, 0.018), gm); a.position.set(0, 0.003, (i - 5) * GAP); w.add(a);
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.004, 10 * GAP), gm); b.position.set((i - 5) * GAP, 0.003, 0); w.add(b);
    }

    // ---- floor order (centre-out, the viewer's slot last) and landing times
    for (let i = 0; i < 100; i++) this.slots.push(v(((i % 10) - 4.5) * GAP, 0, (Math.floor(i / 10) - 4.5) * GAP));
    const VIEWER = 7 * 10 + 6;
    const dist = (i: number) => Math.hypot(this.slots[i]!.x, this.slots[i]!.z) + 1e-3 * hash(i, 3);
    this.order = [...Array(100).keys()].filter((i) => i !== VIEWER).sort((a, b) => dist(a) - dist(b));
    this.order.push(VIEWER);
    const INF = 1e9;
    this.life1 = Array(99).fill(INF); this.sink1 = Array(99).fill(INF); this.life2 = Array(99).fill(INF);
    // #5: the opening mascot's cubes become the first 8 blocks, spread from the bar at 2.32 to "99%" again
    const b2 = this.bars.find((b) => b > 2)!, n2 = T.n2!;
    for (let j = 0; j < 8; j++) this.life1[j] = b2 + (j + 0.6) * (n2 - b2) / 8.4;
    for (let j = 0; j < 11; j++) { this.life1[8 + j] = T.ld1! + j * (T.ld2! - T.ld1!) / 11; this.life1[19 + j] = T.ld2! + j * (T.yh! - T.ld2!) / 11; }
    for (let k = 1; k < 30; k++) this.sink1[k] = T.from! + 0.006 * k;
    const impact = T.ld3! + 0.45;
    for (let k = 1; k < 60; k++) this.life2[k] = impact + 0.05 + (k - 1) * (T.ld4! - impact - 0.05) / 59;
    for (let k = 60; k < 99; k++) this.life2[k] = T.ld4! + (k - 60 + 1) * (T.lastBar! - T.ld4!) / 39;
    this.life2[0] = this.life1[0]!;
    const filled = new Set(this.order.slice(0, 30));
    const rowOf = (s: number) => Math.floor(s / 10), colOf = (s: number) => s % 10;
    this.turnRow = rowOf(this.order[0]!); this.turnCol = colOf(this.order[0]!);
    for (let k = 29; k > 0 && this.slide.length < 3; k--) {
      const s = this.order[k]!;
      const nb = [s - 1, s + 1, s - 10, s + 10].find((n) => n >= 0 && n < 100 && Math.abs(colOf(n) - colOf(s)) + Math.abs(rowOf(n) - rowOf(s)) === 1 && !filled.has(n) && !this.slide.some((x) => x.to === n));
      if (nb !== undefined) this.slide.push({ k, to: nb, t: this.wt.nm![1]! + 0.06 * this.slide.length });
    }

    // ---- meshes
    const inst = (n: number, mat: THREE.Material) => { const m = new THREE.InstancedMesh(this.box, mat, n); m.castShadow = m.receiveShadow = true; m.frustumCulled = false; w.add(m); return m; };
    this.tiles = inst(99, new THREE.MeshStandardMaterial({ color: col(PAL.block), roughness: 0.35, metalness: 0.3, emissive: col(PAL.grid, 0.25) }));
    this.dust = inst(990, glowMat(1.5));
    for (let i = 0; i < 990; i++) this.dust.setColorAt(i, col(PAL.bone, 0.6));
    this.motes = inst(400, glowMat(2.2)); this.motes.castShadow = false;
    this.sparks = inst(1200, glowMat(1.8)); this.sparks.castShadow = false;
    for (let i = 0; i < 1200; i++) this.sparks.setColorAt(i, i % 4 === 0 ? this.hotC : this.boneC);
    for (let i = 0; i < 400; i++) this.motes.setColorAt(i, col(PAL.grid, 0.6 + hash(i, 4)));
    this.letters = inst(24000, glowMat(0.55, 0.3));
    for (let i = 0; i < 24000; i++) this.letters.setColorAt(i, this.boneC);
    const glow = new THREE.MeshStandardMaterial({ color: this.hotC, emissive: this.hotC, emissiveIntensity: 1.2, roughness: 0.5 });
    this.slotGlow = new THREE.Mesh(new THREE.BoxGeometry(TS * 1.04, 0.03, TS * 1.04), glow);
    this.hover = new THREE.Mesh(this.box, glow); this.hover.castShadow = true;
    w.add(this.slotGlow, this.hover);

    const load = async (n: string): Promise<Vox> => (await fetch(`${DATA_DIR}/${n}.json`)).json();
    const model = async (n: string, tint?: THREE.Color, glowK = 0.9): Promise<Model> => {
      const data = await load(n);
      const mesh = inst(data.vox.length, glowMat(glowK));
      const own = data.vox.map(([, , R, G, B]) => tint ? tint.clone() : new THREE.Color().setRGB(R / 255, G / 255, B / 255, THREE.SRGBColorSpace));
      own.forEach((c, i) => mesh.setColorAt(i, c));
      return { data, mesh, own };
    };
    for (const p of ['wave', 'idle', 'invite']) {
      this.M[p] = await model(`mascot-${p}`, undefined, 0.75);
      const tex = await new THREE.TextureLoader().loadAsync(`${DATA_DIR}/mascot-${p}.png`);
      tex.colorSpace = THREE.SRGBColorSpace;
      const d = this.M[p]!.data, ar = d.img![0] / d.img![1];
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(MH * ar, MH), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.35 }));
      plane.visible = false; w.add(plane); this.img[p] = plane;
    }
    this.M.wall = await model('text-99', col(PAL.bone, 0.85), 0.5);
    this.M.relief = await model('text-99', col(PAL.bone, 0.85), 0.5);
    this.M.q = await model('text-q', this.hotC, 1.6);
    this.M.q.mesh.visible = false;
    const wordKeys = ['99', 'loading', 'yeah', 'start', 'with', 'a', 'question', 'break', 'it', 'down', 'lines', 'turn', 'numbers', 'move', 'watch', 'come', 'around', 'no', 'tricks', 'guessing', 'build', 'from', 'the', 'ground', 'why', 'does', 'work', 'scratch'];
    for (const k of wordKeys) this.wordData[k] = await load(`word-${k}`);
    this.buildWords();
    this.flashes = [T.n2!, this.wt.br![2]! + 0.14, this.wt.t1![1]!, T.n3!];
  }

  // ------------------------------------------------------------------ the words (#2–#25)
  wordW(key: string, k: number) { return this.wordData[key]!.w * WV * k; }
  /** Lay words out in a row centred on `c`, returning their centres. */
  row(keys: string[], k: number, c: P3, gap = 0.55): P3[] {
    const ws = keys.map((x) => this.wordW(x, k)), tot = ws.reduce((a, b) => a + b, 0) + gap * (keys.length - 1);
    let x = c.x - tot / 2;
    return ws.map((w) => { const p = v(x + w / 2, c.y, c.z); x += w + gap; return p; });
  }
  buildWords() {
    const T = this.T, wt = this.wt, beats = this.beats;
    const add = (o: Partial<Word> & { key: string; tIn: number; tOut: number; at: P3 }) =>
      this.words.push({ data: this.wordData[o.key]!, hot: false, rot: [0, 0, 0], k: 1, enter: 'slam', exit: 'shatter', ...o } as Word);
    const bAfter = (t: number, n = 0) => beats.filter((b) => b > t + 0.05)[n]!;
    const b2 = this.bars.find((b) => b > 2)!;
    // #2–5: 99% slams digit by digit beside the 2D mascot, then falls back flat behind the floor
    add({ key: '99', tIn: T.n1!, tOut: T.n2!, at: v(2.9, 2.6, 0), k: 1.55, enter: 'groups', groups: [T.n1!, bAfter(T.n1!, 0), bAfter(T.n1!, 1)], exit: 'none',
      fx: (c, r, t, l) => { const a = (Math.PI / 2) * ease.inOutCubic(prog(t, b2, b2 + 0.6)); const by = l.y + 2.6; return { x: l.x, y: by * Math.cos(a) - 2.6, z: -by * Math.sin(a) - 1.5 * prog(t, b2, T.n2!), rx: -a }; } });
    // #7–9
    add({ key: 'loading', tIn: T.ld1!, tOut: T.q!, at: v(0, 2.7, 0.6), rot: [0, 0.5, 0], k: 1.25, dir: v(-6, 0, 0) });
    add({ key: 'loading', tIn: T.ld2!, tOut: T.q!, at: v(0.35, 2.35, 0.1), rot: [0, 0.5, 0], k: 1.25, dir: v(6, 0, 0) });
    add({ key: 'yeah', tIn: T.yh!, tOut: T.q!, at: v(1.4, 4.2, 1.4), rot: [0, 0.5, 0.22], k: 0.9, dir: v(0, 4, 0) });
    // #10 START WITH A QUESTION: a row in space; QUESTION (orange) turns into the ?
    const q = this.row(['start', 'with', 'a', 'question'], 0.85, v(0, 2.2, 1.6));
    ['start', 'with', 'a', 'question'].forEach((k, i) => add({ key: k, tIn: wt.q![i]!, tOut: i === 3 ? wt.q![3]! + 0.42 : T.br!, at: q[i]!, k: 0.85, hot: k === 'question', exit: i === 3 ? 'none' : 'shatter', dir: v(0, 0, 4) }));
    this.T.qMorph = wt.q![3]! + 0.42; this.T.qAt = q[3]!.x;
    // #11 BREAK IT DOWN: DOWN drops onto the floor and breaks
    const br = this.row(['break', 'it', 'down'], 0.9, v(-0.6, 3.0, 1.8));
    add({ key: 'break', tIn: wt.br![0]!, tOut: T.ln!, at: br[0]!, k: 0.9, dir: v(-5, 0, 0) });
    add({ key: 'it', tIn: wt.br![1]!, tOut: T.ln!, at: br[1]!, k: 0.9, dir: v(0, 3, 0) });
    const tHit = wt.br![2]! + 0.14;
    add({ key: 'down', tIn: wt.br![2]!, tOut: tHit, at: br[2]!, k: 0.9, hot: true, enter: 'drop',
      fx: (c, r, t, l) => ({ ...l, y: l.y + lerp(4, 0, ease.inQuad(prog(t, wt.br![2]!, tHit))) - 2.95 * ease.inQuad(prog(t, wt.br![2]!, tHit)) }) });
    // #12 LINES TURN: TURN rolls 90° like a cube slice, lying flat to read from above
    const ln = this.row(['lines', 'turn'], 1.0, v(0, 1.9, 0.6));
    add({ key: 'lines', tIn: wt.ln![0]!, tOut: T.nm!, at: ln[0]!, k: 1.0, dir: v(0, 0, 5) });
    add({ key: 'turn', tIn: wt.ln![1]!, tOut: T.nm!, at: ln[1]!, k: 1.0, hot: true, dir: v(0, 5, 0),
      fx: (c, r, t, l) => { const a = (Math.PI / 2) * ease.outBack(prog(t, wt.ln![1]! + 0.18, wt.ln![1]! + 0.5)); return { x: l.x, y: l.y * Math.cos(a), z: -l.y * Math.sin(a), rx: -a }; } });
    // #13 NUMBERS MOVE: MOVE's letters slide over, alternately up and down
    const nm = this.row(['numbers', 'move'], 0.95, v(0, 2.0, 0.8));
    add({ key: 'numbers', tIn: wt.nm![0]!, tOut: T.ar!, at: nm[0]!, k: 0.95, dir: v(5, 0, 0) });
    const mv = this.wordData.move!;
    add({ key: 'move', tIn: wt.nm![1]!, tOut: T.ar! + 0.05, at: nm[1]!, k: 0.95, hot: true, dir: v(5, 0, 0),
      fx: (c, r, t, l) => { const g = Math.floor((4 * c) / mv.w), u = ease.inOutCubic(prog(t, wt.nm![1]! + 0.03 + 0.015 * g, wt.nm![1]! + 0.12 + 0.015 * g)); return { ...l, y: l.y + (g % 2 ? -1 : 1) * 0.5 * Math.sin(Math.PI * u), x: l.x + 0.25 * u }; } });
    // #14 WATCH IT COME AROUND: on a ring round the floor, each word where the orbiting camera is when it is sung
    ['watch', 'it', 'come', 'around'].forEach((k, i) => {
      const a = this.orbitAngle(wt.ar![i]! + 0.05), R = 4.4;
      add({ key: k, tIn: wt.ar![i]!, tOut: T.t1!, at: v(R * Math.sin(a), 1.5, R * Math.cos(a)), rot: [0, a, 0], k: 0.85, hot: k === 'around', dir: v(0, 0, 3) });
    });
    // #15 NO TRICKS: TRICKS splits open — solid all the way through — and closes
    const t1 = this.row(['no', 'tricks'], 1.1, v(0, 1.9, 0.8));
    const tr = this.wordData.tricks!;
    add({ key: 'no', tIn: wt.t1![0]!, tOut: T.t2!, at: t1[0]!, k: 1.1, enter: 'drop', fx: (c, r, t, l) => ({ ...l, y: l.y + 4 * Math.pow(1 - ease.outCubic(prog(t, wt.t1![0]!, wt.t1![0]! + 0.12)), 2) }) });
    add({ key: 'tricks', tIn: wt.t1![1]!, tOut: T.t2!, at: t1[1]!, k: 1.1, hot: true,
      fx: (c, r, t, l) => { const u = Math.sin(Math.PI * clamp((t - wt.t1![1]! - 0.1) / 0.33)), side = c < tr.w / 2 ? -1 : 1; return { x: l.x + side * 0.55 * u, y: l.y + 0.3 * u, z: l.z }; } });
    // #16 NO GUESSING: GUESSING drops exactly into place
    const t2 = this.row(['no', 'guessing'], 0.95, v(0, 1.4, 0.8));
    add({ key: 'no', tIn: wt.t2![0]!, tOut: T.gr!, at: t2[0]!, k: 0.95, dir: v(0, 0, 4) });
    add({ key: 'guessing', tIn: wt.t2![1]!, tOut: T.gr!, at: t2[1]!, k: 0.95, hot: true, enter: 'drop',
      fx: (c, r, t, l) => ({ ...l, y: l.y + 3 * (1 - ease.outBack(prog(t, wt.t2![1]!, wt.t2![1]! + 0.12))) }) });
    // #17 BUILD IT FROM THE GROUND: words rise out of the floor; GROUND lies flat at the mascot's feet
    const gr = this.row(['build', 'it', 'from', 'the'], 0.62, v(-0.9, 0.95, 2.2), 0.4);
    ['build', 'it', 'from', 'the'].forEach((k, i) => add({ key: k, tIn: wt.gr![i]!, tOut: T.wy!, at: gr[i]!, k: 0.62, enter: 'rise', exit: 'sink' }));
    add({ key: 'ground', tIn: wt.gr![4]!, tOut: T.wy!, at: v(MASCOT.x - 0.6, 0.06, MASCOT.z + 2.4), rot: [-Math.PI / 2, 0, 0], k: 0.62, hot: true, enter: 'rise', exit: 'sink' });
    // #18 WHY DOES IT WORK
    add({ key: 'why', tIn: wt.wy![0]!, tOut: T.from!, at: v(-0.4, 3.6, 1.6), k: 1.25, hot: true, dir: v(0, 0, 5), exit: 'sink' });
    const wy = this.row(['does', 'it', 'work'], 0.75, v(0.4, 1.5, 1.6));
    ['does', 'it', 'work'].forEach((k, i) => add({ key: k, tIn: wt.wy![i + 1]!, tOut: T.from!, at: wy[i]!, k: 0.75, dir: v(0, -3, 0), exit: 'sink' }));
    // #19 FROM SCRATCH, lying on the floor, then everything collapses into the one block
    const fsr = this.row(['from', 'scratch'], 0.7, v(0, 0.06, 4.2));
    add({ key: 'from', tIn: T.from!, tOut: T.scratch! + 0.35, at: fsr[0]!, rot: [-Math.PI / 2, 0, 0], k: 0.7, exit: 'collapse' });
    add({ key: 'scratch', tIn: T.scratch!, tOut: T.scratch! + 0.35, at: fsr[1]!, rot: [-Math.PI / 2, 0, 0], k: 0.7, hot: true, exit: 'collapse' });
    // #22–23
    const tN = this.bars.find((b) => b > T.ld4! + 1)!;
    add({ key: 'loading', tIn: T.ld3!, tOut: T.ld4!, at: v(0, 3.4, 1.2), rot: [0, 0.1, 0], k: 1.4, dir: v(0, 6, 0) });
    add({ key: 'loading', tIn: T.ld4!, tOut: tN, at: v(0.4, 3.2, 1.6), rot: [0, 0.1, 0], k: 1.4, dir: v(0, -6, 0) });
    // #25 the channel's name, a word per beat
    const nm3 = this.row(['99', 'from', 'scratch'], 0.62, v(2.3, 5.6, -1.6), 0.4);
    ['99', 'from', 'scratch'].forEach((k, i) => add({ key: k, tIn: bAfter(tN, i), tOut: T.tail! + 0.2, at: nm3[i]!, k: 0.62, hot: k === '99', dir: v(0, 0, 4) }));
  }

  /** The orbit of #14 (also used to place its words). */
  orbitAngle(t: number) { return Math.PI / 4 + Math.PI * ease.inOutCubic(prog(t, this.T.ar!, this.T.t1! - 0.05)); }

  drawWords(t: number) {
    const L = this.letters;
    const cap = L.instanceMatrix.count;
    let n = 0;
    const qW = new THREE.Quaternion(), qR = new THREE.Quaternion(), at = new THREE.Vector3();
    for (const wd of this.words) {
      if (t < wd.tIn - 0.4 || t > wd.tOut + 0.6 || (wd.exit === 'none' && t >= wd.tOut)) continue;
      const d = wd.data, s = WV * wd.k;
      this.e.set(wd.rot[0], wd.rot[1], wd.rot[2], 'YXZ');
      qW.setFromEuler(this.e);
      at.set(wd.at.x, wd.at.y, wd.at.z);
      const colr = wd.hot ? this.hotC : this.boneC;
      for (let i = 0; i < d.vox.length && n < cap; i++) {
        const [c, r] = d.vox[i]!;
        let l: P3 & { rx?: number } = v((c + 0.5 - d.w / 2) * s, (r + 0.5 - d.h / 2) * s, 0);
        let sc = 1, rx = 0;
        const g = wd.enter === 'groups' ? Math.min(2, Math.floor((3 * c) / d.w)) : 0;
        const tIn = wd.enter === 'groups' ? wd.groups![g]! : wd.tIn + 0.05 * (c / d.w);
        if (t < tIn) continue;
        const u = clamp((t - tIn) / 0.12);
        if (wd.enter === 'slam' || wd.enter === 'groups') {
          const dir = wd.dir ?? v(0, 0, 5), k = 1 - ease.outCubic(u), j = 0.6 + 0.8 * hash(i, 21);
          l = { x: l.x + dir.x * k * j, y: l.y + dir.y * k * j, z: l.z + dir.z * k * j };
        } else if (wd.enter === 'rise') l = { ...l, y: l.y - d.h * s * (1 - ease.outCubic(clamp((t - wd.tIn - 0.1 * (r / d.h)) / 0.18))) };
        if (wd.fx) { l = wd.fx(c, r, t, l); rx = l.rx ?? 0; }
        if (t > wd.tOut && wd.exit !== 'none') {
          const x = t - wd.tOut - 0.08 * hash(i, 22);
          if (x > 0) {
            if (wd.exit === 'shatter') {
              const vx = (hash(i, 23) - 0.5) * 6, vy = 1.5 + 3 * hash(i, 24), vz = (hash(i, 25) - 0.8) * 4;
              l = { x: l.x + vx * x, y: l.y + vy * x - 9 * x * x, z: l.z + vz * x };
              sc = 1 - clamp(x / 0.3); rx += 6 * x * (hash(i, 26) - 0.5);
            } else if (wd.exit === 'sink') { l = { ...l, y: l.y - 3 * x * x - 0.5 * x }; sc = 1 - clamp(x / 0.35); }
            else if (wd.exit === 'collapse') {
              const u2 = ease.inOutCubic(clamp(x / 0.45));
              this.p.set(l.x, l.y, l.z).applyQuaternion(qW).add(at);
              const P = mix3(v(this.p.x, this.p.y, this.p.z), v(0, TS / 2, 0), u2);
              this.put(L, n, P, s * 0.92 * (1 - u2), s * 0.92 * (1 - u2), s * (1 - u2));
              L.setColorAt(n++, colr);
              continue;
            }
          }
        }
        if (sc <= 0.001) continue;
        this.p.set(l.x, l.y, l.z).applyQuaternion(qW).add(at);
        this.e.set(rx, 0, 0, 'XYZ'); qR.setFromEuler(this.e).premultiply(qW);
        this.m4.compose(this.p, qR, this.s.set(s * 0.92 * sc, s * 0.92 * sc, s * 1.6 * sc));
        L.setMatrixAt(n, this.m4);
        L.setColorAt(n++, colr);
      }
    }
    this.finish(L, n);
  }

  // ------------------------------------------------------------------ helpers
  put(mesh: THREE.InstancedMesh, i: number, p: P3, sx: number, sy: number, sz: number, rx = 0, ry = 0, rz = 0) {
    this.e.set(rx, ry, rz, 'XYZ'); this.q.setFromEuler(this.e); // explicit order: Euler.set keeps the last order given (drawWords sets 'YXZ'), which made this frame depend on the previous one
    this.m4.compose(this.p.set(p.x, p.y, p.z), this.q, this.s.set(sx, sy, sz));
    mesh.setMatrixAt(i, this.m4);
  }
  finish(mesh: THREE.InstancedMesh, n: number) {
    mesh.count = n; mesh.visible = n > 0;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }
  arc(a: P3, b: P3, t: number, t0: number, d: number, hop: number): P3 {
    const u = clamp((t - t0) / d);
    const p = mix3(a, b, ease.inOutQuad(u));
    p.y += Math.sin(Math.PI * u) * hop;
    return p;
  }
  scatter(i: number): P3 {
    const a = hash(i, 11) * Math.PI * 2, rr = 5.6 + 3.0 * hash(i, 12);
    return v(Math.cos(a) * rr, 0.03, Math.sin(a) * rr * 0.8 + 0.6);
  }
  /** Mascot cell i on its image plane: base centre `b`, facing yaw `rot`. */
  cell(m: Model, i: number, b: P3, rot: number): P3 {
    const d = m.data, s = MH / d.h, [c, r] = d.vox[i]!;
    const lx = (c + 0.5 - d.w / 2) * s, ly = (r + 0.5) * s;
    return v(b.x + lx * Math.cos(rot), b.y + ly, b.z - lx * Math.sin(rot));
  }
  cellSize(m: Model) { return MH / m.data.h; }
  showImg(key: string, b: P3, rot: number) {
    const p = this.img[key]!;
    p.visible = true;
    p.position.set(b.x, b.y + MH / 2, b.z); p.rotation.set(0, rot, 0);
  }
  count(t: number) {
    let n = 0;
    for (let k = 0; k < 99; k++) if ((t >= this.life1[k]! && t < this.sink1[k]!) || t >= this.life2[k]!) n++;
    return n;
  }

  // ------------------------------------------------------------------ the floor
  drawTiles(t: number) {
    const T = this.T;
    let n = 0, nd = 0, rest = 0;
    for (let k = 0; k < 99; k++) {
      const life2 = t >= this.life2[k]! - FALL && k > 0;
      const tL = life2 ? this.life2[k]! : this.life1[k]!;
      const fromMascot = !life2 && k < 8; // #5 the first 8 are made by the opening mascot's cubes (no fall)
      if (t < tL - (fromMascot ? 0 : FALL)) continue;
      let p = { ...this.slots[this.order[k]!]! };
      let y = TS / 2, sy = 1, rx = 0, rz = 0;
      if (t < tL) { const u = (t - (tL - FALL)) / FALL; y = TS / 2 + DROP_H * (1 - u * u); }
      else {
        const d = t - tL;
        if (d < 0.18) sy = 1 - 0.22 * Math.sin(Math.PI * d / 0.18);
        if (d < 0.4) for (let j = 0; j < 5; j++) {
          const a = (j / 5) * Math.PI * 2 + hash(k, j, life2 ? 2 : 1) * 0.8, u = d / 0.4, rr = 0.3 + 0.5 * ease.outCubic(u);
          this.put(this.dust, nd++, v(p.x + Math.cos(a) * rr, 0.03 + 0.12 * Math.sin(Math.PI * u), p.z + Math.sin(a) * rr), 0.05 * (1 - u), 0.05 * (1 - u), 0.05 * (1 - u));
        }
      }
      if (t >= tL && (life2 || t < this.sink1[k]!)) rest++;
      if (!life2) {
        if (t >= this.sink1[k]!) {
          const u = prog(t, this.sink1[k]!, this.sink1[k]! + 0.35, ease.inCubic);
          if (u >= 1) continue;
          y -= TS * 1.05 * u;
        }
        const s = this.order[k]!;
        if (Math.floor(s / 10) === this.turnRow) rx = (Math.PI / 2) * ease.inOutCubic(prog(t, T.ln! + 0.03 * (s % 10), T.ln! + 0.03 * (s % 10) + 0.4));
        if (s % 10 === this.turnCol) rz = (Math.PI / 2) * ease.inOutCubic(prog(t, T.ln! + 0.38 + 0.03 * Math.floor(s / 10), T.ln! + 0.78 + 0.03 * Math.floor(s / 10)));
        const sl = this.slide.find((x) => x.k === k);
        if (sl) p = mix3(p, this.slots[sl.to]!, ease.inOutCubic(prog(t, sl.t, sl.t + 0.18)));
      }
      // #25 the 99th lands: the whole floor ripples out from the centre, once per beat to the end
      if (life2) y += this.beats.filter((b) => b >= T.lastBar! - 0.01).reduce((a, b) => a + 0.35 * Math.sin(Math.PI * clamp((t - b - 0.06 * Math.hypot(p.x, p.z)) / 0.3)), 0);
      this.put(this.tiles, n++, v(p.x, y - TS / 2 * (1 - sy), p.z), TS, TS * sy, TS, rx, 0, rz);
    }
    this.finish(this.tiles, n);
    this.finish(this.dust, nd);
    this.resting = rest;
  }

  /** Background depth: motes drifting through the dark (≥ 2 depth layers, reference §4). */
  drawMotes(t: number) {
    for (let i = 0; i < 400; i++) {
      const a = hash(i, 31) * Math.PI * 2, rr = 7 + 30 * hash(i, 32);
      const y = 0.5 + 12 * hash(i, 33) + 0.15 * t * (0.3 + hash(i, 34));
      const s = 0.03 + 0.05 * hash(i, 35);
      this.put(this.motes, i, v(Math.cos(a + 0.01 * t) * rr, ((y % 12) + 12) % 12, Math.sin(a + 0.01 * t) * rr), s, s, s, t * hash(i, 36), t, 0);
    }
    this.finish(this.motes, 400);
  }

  // ------------------------------------------------------------------ mascots: 2D in, 3D out (#2–5, #10–11, #17–18, #24, #26)
  drawMascots(t: number) {
    const T = this.T;
    for (const k of ['wave', 'idle', 'invite']) { this.img[k]!.visible = false; this.M[k]!.mesh.visible = false; }
    // #2–5 wave: tiles flip in to the clean image, break into 3D on a beat, its cubes become the first 8 blocks
    {
      const m = this.M.wave!, b = v(OPEN.x, 0, OPEN.z), N = m.data.vox.length, s = this.cellSize(m);
      const tFlip = T.n1!, t3D = this.beats.find((x) => x > 1.7)!, tFly = this.bars.find((x) => x > 2)!;
      const flipDone = tFlip + 0.3;
      if (t >= tFlip && t < T.n2!) {
        if (t >= flipDone && t < t3D) this.showImg('wave', b, OPEN.rot);
        else {
          for (let i = 0; i < N; i++) {
            const [c, , , , , hd] = m.data.vox[i]!;
            let p = this.cell(m, i, b, OPEN.rot), sx = s, sz = s * 0.15, ry = 0;
            if (t < flipDone) { const u = clamp((t - tFlip - 0.18 * (c / m.data.w)) / 0.12); ry = (Math.PI / 2) * (1 - u); if (u <= 0) sx = 0; }
            else {
              const u3 = ease.outCubic(prog(t, t3D, t3D + 0.35));
              sz = s * lerp(0.15, 2 * hd, u3);
              p = { ...p, z: p.z + (hash(i, 41) - 0.5) * 0.8 * u3 };
              if (t >= tFly) {
                const k = Math.floor(hash(i, 42) * 8), dst = this.slots[this.order[k]!]!, tL = this.life1[k]!;
                const t0 = tFly + (tL - tFly) * 0.35 * hash(i, 43), dd = Math.max(0.1, tL - t0);
                const w = clamp((t - t0) / dd);
                p = this.arc(p, v(dst.x + (hash(i, 44) - 0.5) * TS, TS * hash(i, 45), dst.z + (hash(i, 46) - 0.5) * TS), t, t0, dd, 1.2);
                const sh = 1 - clamp((w - 0.85) / 0.15); sx *= sh; sz *= sh;
              }
            }
            if (sx <= 0.0001) { this.put(m.mesh, i, p, 0, 0, 0); continue; }
            this.put(m.mesh, i, p, sx * 0.98, sx * 0.98, sz, 0, OPEN.rot + ry, 0);
          }
          this.finish(m.mesh, N);
        }
      }
    }
    // #10–11, #17–18 idle: QUESTION → ? (orange) → broken ring on the floor → mascot built row by row → back to its 2D image
    {
      const m = this.M.idle!, qm = this.M.q!, N = m.data.vox.length, Nq = qm.data.vox.length, s = this.cellSize(m);
      const b = v(MASCOT.x, 0, MASCOT.z), tq = T.qMorph!, tb = this.wt.br![2]! + 0.14, tg = T.gr!, t2D = T.wy! + 0.05, tFlat = T.wy! + 0.3;
      const qw = this.wordData.question!, qBase = v(T.qAt!, 2.2, 1.6), qs = 0.11;
      if (t >= tq && t < T.from! + 0.3) {
        if (t >= tFlat) {
          const back = prog(t, T.wy! + 0.5, T.from!, ease.inCubic), sink = prog(t, T.from!, T.from! + 0.3, ease.inCubic);
          this.showImg('idle', v(b.x - 0.2, -MH * sink, b.z - 2.5 * back), MASCOT.rot);
        } else {
          for (let i = 0; i < N; i++) {
            const qi = i % Nq, [qc, qr] = qm.data.vox[qi]!;
            const qPos = v(qBase.x + (qc + 0.5 - qm.data.w / 2) * qs * 1.4, qBase.y + (qr + 0.5 - qm.data.h / 2) * qs * 1.4, qBase.z);
            const wv = qw.vox[i % qw.vox.length]!, wPos = v(qBase.x + (wv[0] + 0.5 - qw.w / 2) * WV * 0.85, qBase.y + (wv[1] + 0.5 - qw.h / 2) * WV * 0.85, qBase.z);
            const sc = this.scatter(i), home = this.cell(m, i, b, MASCOT.rot), row = m.data.vox[i]![1] / m.data.h, hd = m.data.vox[i]![5];
            const tm = tg + row * 0.65;
            let p: P3, sz = qs, dep = qs;
            const k = clamp((t - tm) / 0.3);
            if (t < tb) p = this.arc(wPos, qPos, t, tq + 0.1 * hash(i, 1), 0.25, 0.2);
            else if (t < tm) p = this.arc(qPos, sc, t, tb + 0.08 * hash(i, 2), 0.5, 1.4);
            else { p = this.arc(sc, home, t, tm, 0.3, 1.0); sz = lerp(qs, s, k); dep = lerp(qs, s * 2 * hd, k); }
            if (t >= t2D) { const u = ease.inOutCubic(prog(t, t2D, tFlat)); dep = lerp(dep, s * 0.05, u); p = mix3(p, home, u); }
            this.put(m.mesh, i, p, sz * 0.97, sz * 0.97, dep, 0, MASCOT.rot, 0);
            m.mesh.setColorAt(i, this.c.copy(this.hotC).multiplyScalar(1.4).lerp(m.own[i]!, k));
          }
          this.finish(m.mesh, N);
        }
      }
    }
    // #24 invite: tiles flip in to the clean image; #26 it breaks into 3D and pours into the viewer's slot
    {
      const m = this.M.invite!, b = v(INVITE.x, 0, INVITE.z), N = m.data.vox.length, s = this.cellSize(m);
      const tIn = this.bars.find((x) => x > T.ld4! + 1)!, flipDone = tIn + 0.3, slot = this.slots[this.order[99]!]!;
      if (t >= tIn) {
        if (t >= flipDone && t < T.tail!) this.showImg('invite', b, INVITE.rot);
        else {
          for (let i = 0; i < N; i++) {
            const [c, , , , , hd] = m.data.vox[i]!;
            let p = this.cell(m, i, b, INVITE.rot), sx = s, sz = s * 0.15, ry = 0;
            if (t < flipDone) { const u = clamp((t - tIn - 0.18 * (c / m.data.w)) / 0.12); ry = (Math.PI / 2) * (1 - u); if (u <= 0) sx = 0; }
            else {
              const u3 = ease.outCubic(prog(t, T.tail!, T.tail! + 0.25));
              sz = s * lerp(0.15, 2 * hd, u3);
              const t0 = T.tail! + 0.2 + 0.4 * hash(i, 51), d = T.end! - 0.15 - t0;
              const w = clamp((t - t0) / d);
              p = this.arc(p, v(slot.x, TS * 0.3, slot.z), t, t0, d, 1.5);
              sx *= 1 - clamp((w - 0.8) / 0.2); sz *= 1 - clamp((w - 0.8) / 0.2);
            }
            if (sx <= 0.0001) { this.put(m.mesh, i, p, 0, 0, 0); continue; }
            this.put(m.mesh, i, p, sx * 0.98, sx * 0.98, sz, 0, INVITE.rot + ry, 0);
          }
          this.finish(m.mesh, N);
        }
      }
    }
  }

  /** #6 the 99% pressed up through the floor like pins. */
  drawRelief(t: number) {
    const m = this.M.relief!, T = this.T;
    if (t < T.n2! || t > T.ld1!) { m.mesh.visible = false; return; }
    const s = 0.06 * RELIEF.k * 1.6;
    m.data.vox.forEach(([c, r], i) => {
      const up = prog(t, T.n2! + 0.1 + (c / m.data.w) * 0.9, T.n2! + 0.35 + (c / m.data.w) * 0.9, ease.outBack);
      const down = prog(t, T.ld1! - 0.5 + (1 - c / m.data.w) * 0.3, T.ld1! - 0.2 + (1 - c / m.data.w) * 0.3, ease.inCubic);
      const rowHit = this.beats.reduce((a, b) => a + (b > T.n2! + 0.9 ? pulse(t - 0.02 * (m.data.h - r), b, 0.1) : 0), 0);
      const wave = this.bars.reduce((a, b) => a + (b > T.n2! + 1 ? pulse(t - 0.03 * c, b, 0.15) : 0), 0);
      const hgt = 0.35 * up * (1 - down) + 0.3 * rowHit * hash(i, 5) + 0.25 * wave;
      this.put(m.mesh, i, v(RELIEF.x + (c - m.data.w / 2) * s, hgt / 2 - 0.01, -(r - m.data.h / 2) * s), s * 0.92, Math.max(0.001, hgt), s * 0.92);
    });
    this.finish(m.mesh, m.data.vox.length);
  }

  /** #20–22 the 99% wall: erupts from the one block, bounces on the drop (a digit leaps out per beat), falls forward. */
  drawWall(t: number) {
    const T = this.T, m = this.M.wall!;
    if (t < T.n3! || t > T.ld3! + 1.0) { m.mesh.visible = false; return; }
    const s = 0.06 * WALL.k, d = m.data, seed = v(0, TS, 0);
    const fall = (Math.PI / 2) * ease.inQuad(prog(t, T.ld3!, T.ld3! + 0.45));
    const bounce = this.beats.reduce((a, b) => a + (b >= T.drop! ? pulse(t, b, 0.08) : 0), 0);
    const dropBeats = this.beats.filter((b) => b >= T.drop! && b < T.ld3!);
    d.vox.forEach(([c, r, , , , hd], i) => {
      const g = Math.min(2, Math.floor((3 * c) / d.w));
      const leap = dropBeats.reduce((a, b, j) => a + (j % 3 === g ? Math.sin(Math.PI * clamp((t - b) / 0.45)) : 0), 0);
      const lx = (c - d.w / 2) * s, ly = (r + 0.5) * s;
      const home = v(lx, ly * Math.cos(fall) + 0.25 * bounce * (r / d.h), WALL.z + ly * Math.sin(fall) + 3.2 * leap);
      const te = T.n3! + 0.05 + (c / d.w) * 0.7 + 0.1 * hash(i, 8);
      let p = this.arc(seed, home, t, te, 0.32, 1.5), sc = t < te ? 0 : 1;
      const tx = T.ld3! + 0.45 + 0.35 * hash(i, 9);
      if (t > tx) { const u = clamp((t - tx) / 0.3); sc *= 1 - u; p = { ...p, y: p.y + 0.4 * Math.sin(Math.PI * u) }; }
      this.put(m.mesh, i, p, s * 0.95 * sc, s * 0.95 * sc, Math.max(s, 2 * hd * s) * sc, fall, 0, 0);
    });
    this.finish(m.mesh, d.vox.length);
  }

  /** #21 on every beat of the drop, a burst of small cubes off the top of the 99% wall. */
  drawSparks(t: number) {
    const T = this.T, wd = this.M.wall!.data.w * 0.06 * WALL.k;
    let n = 0;
    for (const b of this.beats) {
      if (b < T.drop! || b >= T.ld3! || t < b || t > b + 0.7) continue;
      const x = t - b;
      for (let j = 0; j < 60 && n < 1200; j++) {
        const h = (k: number) => hash(Math.round(b * 1000), j, k);
        const p0 = v((h(1) - 0.5) * wd, 3.4 + 0.4 * h(2), WALL.z);
        const vel = v((h(3) - 0.5) * 7, 3 + 5 * h(4), 2 + 6 * h(5));
        const sc = 0.09 * (1 - clamp(x / 0.7));
        this.put(this.sparks, n++, v(p0.x + vel.x * x, p0.y + vel.y * x - 9 * x * x, p0.z + vel.z * x), sc, sc, sc, 8 * x * h(6), 8 * x * h(7), 0);
      }
    }
    this.finish(this.sparks, n);
  }

  drawViewer(t: number) {
    const T = this.T, slot = this.slots[this.order[99]!]!;
    const tIn = this.bars.find((b) => b > T.ld4! + 1)!;
    const on = prog(t, tIn, tIn + 0.6);
    this.slotGlow.visible = on > 0;
    this.slotGlow.position.set(slot.x, 0.015, slot.z);
    (this.slotGlow.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 + 2 * on + 3 * prog(t, T.tail!, T.end!);
    this.hover.visible = t >= tIn;
    const y = lerp(7, 2.0, ease.outCubic(prog(t, tIn, tIn + 0.8))) + 0.08 * Math.sin(t * 3) - 1.0 * ease.inOutCubic(prog(t, T.tail!, T.end!));
    this.hover.position.set(slot.x, y, slot.z);
    this.hover.scale.setScalar(TS);
    this.hover.rotation.set(0.35 * (1 - prog(t, T.tail!, T.end!)), t * 0.7, 0.2);
  }

  // ------------------------------------------------------------------ camera
  /** Shots: [start, blend s (0 = hard cut), pose(t)]. */
  shots(): [number, number, (t: number) => Pose][] {
    const T = this.T, wt = this.wt, slotV = this.slots[this.order[99]!]!;
    const P = (pos: P3, tgt: P3, fov: number): Pose => ({ pos, tgt, fov });
    const beatPush = (t: number, a: number, b: number, k: number) => k * this.beats.reduce((s, x) => s + (x >= a && x < b ? pulse(t, x, 0.12) : 0), 0);
    const wordAt = (key: string, t0: number) => this.words.find((w) => w.key === key && Math.abs(w.tIn - t0) < 1e-6)!.at;
    const t3D = this.beats.find((x) => x > 1.7)!, tFly = this.bars.find((x) => x > 2)!;
    return [
      [0, 0, (t) => P(v(0, 3.0, 11.2 - 0.6 * prog(t, 0, t3D) - beatPush(t, 0, t3D, 0.25)), v(0, 3.0, 0), 40)],
      [t3D, 0.12, (t) => { const a = 0.62 * ease.inOutCubic(prog(t, t3D, tFly)); return P(v(OPEN.x + 7 * Math.sin(a) + 1.5, 3.0, 10.5 * Math.cos(a)), v(OPEN.x + 1.2, 3.0, 0), 40); }],
      [tFly, 0.4, (t) => { const u = sineIO(prog(t, tFly, T.n2!)); return P(mix3(v(-1.5, 3.4, 9.2), v(3.8, 2.6, 8.2), u), mix3(v(-1.0, 1.4, 0), v(0, 0.6, 0), u), 42); }],
      [T.n2!, 0, (t) => { const a = lerp(-0.18, 0.18, prog(t, T.n2!, T.ld1!)); return P(v(RELIEF.x + 3.2 * Math.sin(a), 10.5, 3.2 * Math.cos(a)), v(RELIEF.x, 0, 0), 40); }],
      [T.ld1! - 0.1, 0.12, (t) => P(v(4.8 - 0.5 * (t - T.ld1!), 4.2 - 0.25 * pulse(t, T.yh!, 0.1), 8.8), v(0.4, 2.2, 0.4), 42)],
      [T.q!, 0.12, (t) => { const keys = ['start', 'with', 'a', 'question'], i = Math.max(0, wt.q!.filter((x) => x <= t + 0.05).length - 1); const c = wordAt(keys[i]!, wt.q![i]!); return P(v(c.x * 0.45 + 0.8, 3.0, 13.0), v(c.x * 0.45, 2.3, 1.6), 44); }],
      [T.br!, 0.1, (t) => P(v(1.6 + 0.4 * (t - T.br!), 3.6, 12.4), v(0.4, 2.0, 1.4), 46)],
      [T.ln!, 0.12, (t) => P(v(2.0, 9.0, 8.4 + 0.5 * (t - T.ln!)), v(0, 0.8, 0.4), 42)],
      [T.nm!, 0.08, (t) => P(v(-0.6 + 1.2 * (t - T.nm!), 3.0, 12.4), v(0.3, 1.9, 0.8), 44)],
      [T.ar!, 0.08, (t) => { const a = this.orbitAngle(t); return P(v(9 * Math.sin(a), 3.6, 9 * Math.cos(a)), v(0, 1.2, 0), 42); }],
      [T.t1!, 0.1, (t) => P(v(1.0, 2.6, 11.4 - 0.8 * prog(t, T.t1!, T.t2!)), v(0, 1.9, 0.8), 44)],
      [T.t2!, 0.08, (t) => P(v(-0.2 + 0.8 * (t - T.t2!), 3.4, 11.6), v(0.4, 1.4, 0.8), 44)],
      [T.gr!, 0.15, (t) => { const u = prog(t, T.gr!, T.wy!); return P(v(1.6, 1.0, 9.6), v(1.6, lerp(1.6, 2.8, u), 0.8), 44); }],
      [T.wy!, 0.15, (t) => { const u = sineIO(prog(t, T.wy!, T.from!)); return P(mix3(v(1.6, 2.8, 12.4), v(1.0, 2.8, 11.0), u), v(0.9, 2.5, 1.0), 44); }],
      [T.from!, 0.3, (t) => P(v(0.2, 11.5 - 0.3 * (t - T.from!), 3.6), v(0, 0, 1.2), 40)],
      [T.n3!, 0, (t) => { const push = beatPush(t, T.drop!, T.ld3!, 0.9), a = 0.45 * Math.sin(Math.PI * (prog(t, T.drop!, T.ld3!) - 0.5)) * prog(t, T.drop! - 0.3, T.drop! + 0.3), R = 11.0 - 1.6 * prog(t, T.n3!, T.ld3!) - push; return P(v(0.3 + R * Math.sin(a), 0.9 + 0.8 * prog(t, T.drop!, T.ld3!), WALL.z + 1 + (R + 1 - WALL.z) * Math.cos(a) - 1), v(0.3, 2.6, -2.0), 46); }],
      [T.ld3!, 0.3, (t) => P(v(2.4, 7.0 + 0.3 * (t - T.ld3!), 11.5), v(0, 1.6, 0.5), 44)],
      [T.ld4!, 0.4, (t) => { const u = prog(t, T.ld4!, T.tail!), a = lerp(0.42, 0.1, u) - beatPush(t, T.ld4!, T.tail!, 0.012), R = lerp(15.8, 14.8, u); return P(v(-0.6 + R * Math.sin(a), lerp(7.2, 5.8, u), -0.2 + R * Math.cos(a)), v(-0.6, 2.6, -0.2), 44); }],
      [T.tail!, 0.0001, (t) => { const u = ease.inCubic(prog(t, T.tail!, T.end!)); const a = v(-0.6 + 14.8 * Math.sin(0.1), 5.8, -0.2 + 14.8 * Math.cos(0.1)); return P(mix3(a, v(slotV.x + 0.05, 0.42, slotV.z + 0.12), u), mix3(v(-0.6, 2.6, -0.2), slotV, Math.min(1, u * 1.6)), lerp(44, 64, u)); }],
    ];
  }
  camAt(t: number): Pose {
    const S = this.shots();
    let i = 0;
    while (i + 1 < S.length && S[i + 1]![0] <= t) i++;
    const [t0, blend, f] = S[i]!;
    const cur = f(t);
    if (i === 0 || blend <= 0 || t >= t0 + blend) return cur;
    const prev = S[i - 1]![2](t0);
    const u = ease.inOutCubic(clamp((t - t0) / blend));
    return { pos: mix3(prev.pos, cur.pos, u), tgt: mix3(prev.tgt, cur.tgt, u), fov: lerp(prev.fov, cur.fov, u) };
  }

  // ------------------------------------------------------------------ frame
  render(f: Frame, out: THREE.WebGLRenderTarget): PostOverrides {
    const { renderer } = this.ctx;
    const t = f.t, T = this.T;
    this.drawTiles(t);
    this.drawMotes(t);
    this.drawWords(t);
    this.drawMascots(t);
    this.drawRelief(t);
    this.drawWall(t);
    this.drawSparks(t);
    this.drawViewer(t);
    const c = this.camAt(t), cam = this.cam;
    const shake = 0.05 * this.beats.reduce((a, b) => a + (b >= T.drop! && b < T.tail! ? pulse(t, b, 0.06) : 0), 0);
    cam.fov = c.fov; cam.position.set(c.pos.x + shake * Math.sin(t * 91), c.pos.y + shake * Math.sin(t * 77), c.pos.z); cam.up.set(0, 1, 0); cam.lookAt(c.tgt.x, c.tgt.y, c.tgt.z);
    cam.updateProjectionMatrix(); cam.updateMatrixWorld(true);

    this.bg.u.uT!.value = t;
    this.bg.render(renderer, out);
    renderer.setRenderTarget(out);
    renderer.clearDepth();
    renderer.render(this.world, cam);

    // ---- type: LOADING = blocks on the floor (asserted); the line under the channel's name
    const L = this.text; L.clear();
    const x = L.ctx;
    const n = this.count(t);
    const shown = (t >= T.ld1! - 0.1 && t < T.q!) || (t >= T.scratch! + 0.4 && t < T.n3!) || (t >= T.ld3! && t < T.tail! + 0.4);
    if (shown) {
      if (n !== this.resting) throw new Error(`LOADING ${n}% ≠ blocks on the floor at t=${t.toFixed(3)}`);
      x.globalAlpha = 1 - prog(t, T.tail!, T.tail! + 0.4);
      x.textAlign = 'left';
      x.fillStyle = PAL.bone;
      x.font = font(F.mono(500), 30);
      x.fillText('LOADING', 120, 128);
      x.font = font(F.archivo(100, 900), 96);
      x.fillText(`${n}%`, 114, 222);
      x.globalAlpha = 1;
    }
    const tN = this.bars.find((b) => b > T.ld4! + 1)!;
    const tSub = this.beats.filter((b) => b > tN + 0.05)[2]!;
    const sub = prog(t, tSub, tSub + 0.3) * (1 - prog(t, T.tail!, T.tail! + 0.3));
    if (sub > 0) {
      x.globalAlpha = sub; x.textAlign = 'right'; x.fillStyle = PAL.hot; x.font = font(F.mono(500), 30);
      x.fillText('99 / 100 — the last one is yours', W - 120, H - 110);
      x.globalAlpha = 1;
    }
    this.ctx.comp.draw(renderer, L.upload(), out);

    const open = SHORT ? 1 - prog(t, 14.68, 14.98, ease.outCubic) : 1 - prog(t, T.n1!, T.n1! + 0.25, ease.outCubic);
    const close = prog(t, T.end! - 0.17, T.end! - 0.02);
    const flash = this.flashes.reduce((a, b) => a + (t >= b && t < b + 2 / 60 ? 1.1 : 0), 0);
    return { hud: 0, bloom: 0.6, bloomThreshold: 0.75, halation: 0.2, ca: 0.8, grain: 0.05, vignette: 0.4, fade: Math.max(open, close), flash };
  }
}
