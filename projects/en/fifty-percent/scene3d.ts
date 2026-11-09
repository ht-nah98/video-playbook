// `fifty` — 3D test of fifty-percent (mascot-mv/projects/en/fifty-percent), p2 21.4–53.9 s:
// "flip it a million times… glued to fifty percent" → Buffon, Pearson, Kerrich → "a hair away from one half".
// DNA of that video: LIGHT = INFORMATION. A night field in fog; the running share of heads of a million
// (seeded) flips is an amber trace laid on the ground, depth = log10(flips): it swings wide near the camera and
// is glued to the gold 1/2 rail far away. The three historical runs are lanterns beside the rail that light up
// when their name is read; their light clears the fog and their counters run with the narration.
import * as THREE from 'three';
import { Scene, type Frame, type PostOverrides } from '@3d/engine/scene';
import { FSPass, Layer2D, W, H } from '@3d/engine/gl';
import { LineBatch } from '@3d/engine/lines';
import { F, font } from '@3d/engine/type';
import { norm, type Line, type Word } from '@3d/engine/lyrics';
import { clamp, lerp, ease, prog, pulse, noise1, mulberry32, hexToLinear } from '@3d/engine/util';

type P3 = { x: number; y: number; z: number };
type Cam = { t: number; pos: P3; tgt: P3; fov: number };

const HEX = { night: '#070B14', night2: '#101A2E', amber: '#F4B860', fog: '#8EA2B8', gold: '#FFD866', ivory: '#EDE6D6' };
const LIN = Object.fromEntries(Object.entries(HEX).map(([k, v]) => [k, hexToLinear(v)])) as Record<keyof typeof HEX, [number, number, number]>;
const v3 = (c: [number, number, number]) => `vec3(${c.map((x) => x.toFixed(5)).join(',')})`;

const D = 11; // world units per decade of flips (depth)
const K = 30; // world units per unit of share (sideways): 0.69 % → 0.21
const zOf = (logn: number) => -logn * D;
const xOf = (share: number) => (share - 0.5) * K;
const LAMP_X = 4.2;
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

function word(line: Line, q: string, from = 0): Word {
  const n = norm(q);
  const w = line.words.slice(from).find((x) => norm(x.w) === n);
  if (!w) throw new Error(`word not found: ${q} in "${line.text}"`);
  return w;
}

interface Lamp {
  name: string; sub: string; n: number; heads: number; z: number; share: number;
  tName: number; tFlips0: number; tFlips1: number; tHeads0: number; tHeads1: number;
}

export default class FiftyScene extends Scene {
  cam = new THREE.PerspectiveCamera(45, W / H, 0.05, 500);
  vp = new THREE.Matrix4();
  inv = new THREE.Matrix4();
  v4 = new THREE.Vector4();
  bg = new FSPass(/* glsl */ `
    uniform mat4 uInv; uniform vec3 uCam; uniform vec4 uLamp[3]; uniform float uTime, uRail;
    const vec3 NIGHT = ${v3(LIN.night)}, NIGHT2 = ${v3(LIN.night2)}, AMBER = ${v3(LIN.amber)}, FOG = ${v3(LIN.fog)};
    void main() {
      vec4 a = uInv * vec4(vUv * 2.0 - 1.0, -1.0, 1.0), b = uInv * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
      vec3 ro = a.xyz / a.w, rd = normalize(b.xyz / b.w - ro);
      // sky: night gradient, slow fog banks
      float h = clamp(rd.y * 3.0, 0.0, 1.0);
      vec3 col = mix(NIGHT2, NIGHT, h);
      float dist = 400.0;
      vec3 P = ro + rd * dist;
      if (rd.y < -0.0005) {
        dist = -uCam.y / rd.y; P = uCam + rd * dist;
        float tex = 0.75 + 0.25 * fbm(P.xz * 0.35, 3);
        col = NIGHT * 0.9 * tex;
        // lantern pools on the ground (light = what we know)
        for (int i = 0; i < 3; i++) {
          vec3 L = uLamp[i].xyz; float I = uLamp[i].w;
          float d2 = dot(P - L, P - L);
          col += AMBER * I * 0.55 / (1.0 + d2 * 1.4);
        }
        // the 1/2 rail's faint spill
        col += ${v3(LIN.gold)} * uRail * 0.05 * exp(-abs(P.x) * 2.5) * step(P.z, 0.0);
      }
      // fog: thickens with distance, thinned where a lantern shines
      float clear = 0.0;
      for (int i = 0; i < 3; i++) clear += uLamp[i].w * exp(-dot(P - uLamp[i].xyz, P - uLamp[i].xyz) * 0.02);
      // fog texture: on the ground from the hit point, in the sky from the view direction (no far-plane streaks)
      vec2 fq = rd.y < -0.0005 ? P.xz * 0.05 : rd.xz / (rd.y + 0.25) * 0.6;
      float drift = fbm(vec3(fq, 0.0) + vec3(uTime * 0.03, 0.0, uTime * 0.02), 3) * 0.5 + 0.5;
      float fogK = (1.0 - exp(-dist * 0.028)) * (0.55 + 0.45 * drift) * (1.0 - 0.6 * clamp(clear, 0.0, 1.0));
      col = mix(col, FOG * 0.06, fogK);
      // in-scattered halo around each lantern along the view ray
      for (int i = 0; i < 3; i++) {
        vec3 L = uLamp[i].xyz; float I = uLamp[i].w;
        float s = max(dot(L - ro, rd), 0.0);
        float dd = length(ro + rd * s - L);
        if (s < dist + 2.0) col += AMBER * I * (0.45 * exp(-dd * dd * 2.2) + 0.035 * exp(-dd * 0.8));
      }
      fragColor = vec4(col, 1.0);
    }`, {
    uInv: { value: new THREE.Matrix4() }, uCam: { value: new THREE.Vector3() }, uTime: { value: 0 }, uRail: { value: 1 },
    uLamp: { value: [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] },
  });
  L3 = new LineBatch(20000, { screen2D: false, blend: 'add' });
  text = new Layer2D();

  trace: { x: number; z: number; logn: number }[] = [];
  lamps: Lamp[] = [];
  lMillion!: Line; lHand!: Line; lHair!: Line;
  tMillion = 0; tGlued = 0; tFifty = 0; tFiftyEnd = 0;
  shots: Cam[] = [];

  override async init() {
    const ly = this.ctx.lyrics;
    // a million seeded flips; the running share sampled at log-spaced n (deterministic)
    const rnd = mulberry32(1713);
    let heads = 0, k = 0;
    const N = 1_000_000;
    for (let n = 1; n <= N; n++) {
      if (rnd() < 0.5) heads++;
      while (k <= 1200 && Math.round(Math.pow(10, k / 200)) <= n) {
        if (Math.round(Math.pow(10, k / 200)) === n && n >= 10) this.trace.push({ x: xOf(heads / n), z: zOf(Math.log10(n)), logn: Math.log10(n) });
        k++;
      }
    }
    this.lMillion = ly.get('flip it a million times');
    this.tMillion = word(this.lMillion, 'million').start;
    this.tGlued = word(this.lMillion, 'glued').end;
    this.tFifty = word(this.lMillion, 'fifty').start;
    this.tFiftyEnd = this.lMillion.end;
    this.lHand = ly.get('people have actually done this');
    this.lHair = ly.get('a hair away from one half');
    const mk = (q: string, name: string, sub: string, n: number, h: number, nameWord: string): Lamp => {
      const l = ly.get(q);
      const fl = word(l, 'flipped'), times = word(l, 'times', l.words.indexOf(fl)), got = word(l, 'got', l.words.indexOf(times));
      const after = l.words[l.words.indexOf(fl) + 1]!;
      return {
        name, sub, n, heads: h, z: zOf(Math.log10(n)), share: h / n, tName: word(l, nameWord).start,
        tFlips0: after.start, tFlips1: times.start, tHeads0: got.end, tHeads1: l.end,
      };
    };
    this.lamps = [
      mk('the naturalist buffon', 'Buffon', 'naturalist · 18th century', 4040, 2048, 'buffon'),
      mk('karl pearson', 'Karl Pearson', 'statistician · c. 1900', 24000, 12012, 'pearson'),
      mk('john kerrich', 'John Kerrich', 'internment camp, Denmark · 1940s', 10000, 5067, 'kerrich'),
    ];
    const [B, P, Kr] = this.lamps as [Lamp, Lamp, Lamp];
    const at = (x: number, y: number, z: number): P3 => ({ x, y, z });
    const lampHead = (l: Lamp) => at(LAMP_X - 0.6, 3.3, l.z);
    const tB = B.tName - 1.4, tP = this.lamps[1]!.tName - 1.6, tK = Kr.tName - 1.8;
    // camera: waypoints, eased between consecutive ones (a repeated pose holds)
    this.shots = [
      { t: this.ctx.start, pos: at(-1.2, 1.5, zOf(1.6) + 5), tgt: at(0.5, 0.2, zOf(2.6)), fov: 50 },
      { t: this.tMillion, pos: at(-1.0, 1.4, zOf(1.9) + 5), tgt: at(0.3, 0.2, zOf(3.0)), fov: 50 },
      { t: this.tGlued + 0.4, pos: at(-0.6, 1.1, zOf(5.0) + 6), tgt: at(0.0, 0.1, zOf(6.0)), fov: 46 },
      { t: this.tFiftyEnd + 0.4, pos: at(-0.4, 1.0, zOf(5.3) + 6), tgt: at(0.0, 0.0, zOf(6.2)), fov: 44 },
      { t: this.lHand.start + 0.2, pos: at(-7, 7.5, zOf(2.6)), tgt: at(2.5, 0.8, zOf(4.0)), fov: 42 },
      { t: tB, pos: at(-6, 6.0, zOf(2.9)), tgt: at(2.8, 1.2, B.z - 2), fov: 42 },
      { t: B.tName + 0.3, pos: at(9.0, 2.6, B.z + 7.5), tgt: lampHead(B), fov: 40 },
      { t: B.tHeads1 - 0.2, pos: at(8.0, 2.3, B.z + 5.8), tgt: { ...lampHead(B), y: 1.6 }, fov: 40 },
      { t: tP, pos: at(10.5, 3.0, P.z + 13), tgt: lampHead(P), fov: 40 },
      { t: P.tName + 0.6, pos: at(9.0, 2.6, P.z + 7.5), tgt: lampHead(P), fov: 40 },
      { t: P.tHeads1, pos: at(8.2, 2.3, P.z + 6.0), tgt: { ...lampHead(P), y: 1.6 }, fov: 40 },
      { t: tK, pos: at(-5.5, 3.6, Kr.z - 10), tgt: lampHead(Kr), fov: 42 },
      { t: Kr.tName + 0.6, pos: at(-4.6, 3.4, Kr.z - 9), tgt: lampHead(Kr), fov: 40 },
      { t: Kr.tHeads1, pos: at(-3.8, 3.0, Kr.z - 7.6), tgt: { ...lampHead(Kr), y: 2.2 }, fov: 40 },
      { t: this.lHair.start + 0.4, pos: at(-6.4, 4.6, Kr.z), tgt: at(0.4, 0.3, Kr.z), fov: 42 },
      { t: this.ctx.end, pos: at(-5.9, 4.1, Kr.z), tgt: at(0.4, 0.3, Kr.z), fov: 41 },
    ];
  }

  camAt(t: number): Cam {
    const S = this.shots;
    let i = 0;
    while (i + 1 < S.length && S[i + 1]!.t <= t) i++;
    const a = S[i]!, b = S[Math.min(i + 1, S.length - 1)]!;
    const u = b.t > a.t ? ease.inOutCubic(clamp((t - a.t) / (b.t - a.t))) : 0;
    const L = (p: P3, q: P3): P3 => ({ x: lerp(p.x, q.x, u), y: lerp(p.y, q.y, u), z: lerp(p.z, q.z, u) });
    const pos = L(a.pos, b.pos);
    // breathing hand-held drift
    pos.x += 0.06 * noise1(t * 0.7, 3); pos.y += 0.05 * noise1(t * 0.6, 4);
    return { t, pos, tgt: L(a.tgt, b.tgt), fov: lerp(a.fov, b.fov, u) };
  }
  setCam(c0: Cam) {
    const c = this.cam;
    c.fov = c0.fov; c.updateProjectionMatrix();
    c.position.set(c0.pos.x, c0.pos.y, c0.pos.z);
    c.up.set(0, 1, 0);
    c.lookAt(c0.tgt.x, c0.tgt.y, c0.tgt.z);
    c.updateMatrixWorld(true);
    this.vp.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
    this.inv.copy(this.vp).invert();
  }
  proj(p: P3) {
    const v = this.v4.set(p.x, p.y, p.z, 1).applyMatrix4(this.vp);
    if (v.w <= 0.1) return null;
    const P11 = this.cam.projectionMatrix.elements[5]!;
    return { x: (v.x / v.w * 0.5 + 0.5) * W, y: (0.5 - v.y / v.w * 0.5) * H, s: 0.5 * H * P11 / v.w, w: v.w };
  }
  lampI(l: Lamp, t: number) {
    return prog(t, l.tName, l.tName + 0.9, ease.outExpo) * (0.93 + 0.07 * noise1(t * 5.0, l.n));
  }
  /** Trace reveal front in log10(flips). */
  reveal(t: number) {
    return t < this.tMillion ? 2 : lerp(2, 6, prog(t, this.tMillion, this.tGlued, ease.inOutCubic));
  }

  render(f: Frame, out: THREE.WebGLRenderTarget): PostOverrides {
    const { renderer } = this.ctx;
    const t = f.t;
    const cam = this.camAt(t);
    this.setCam(cam);
    const fifty = pulse(t, this.tFifty, 0.6) * (t < this.tFiftyEnd + 2 ? 1 : 0);
    const hair = prog(t, this.lHair.start, this.lHair.start + 1.2, ease.outCubic);

    const u = this.bg.u;
    (u.uInv!.value as THREE.Matrix4).copy(this.inv);
    (u.uCam!.value as THREE.Vector3).set(cam.pos.x, cam.pos.y, cam.pos.z);
    u.uTime!.value = t;
    u.uRail!.value = 1 + 2 * fifty;
    this.lamps.forEach((l, i) => (u.uLamp!.value as THREE.Vector4[])[i]!.set(LAMP_X - 0.6, 2.5, l.z, this.lampI(l, t)));
    this.bg.render(renderer, out);

    // ---- lines (3D)
    const L = this.L3; L.clear();
    const fade = (p: P3) => Math.exp(-Math.hypot(p.x - cam.pos.x, p.y - cam.pos.y, p.z - cam.pos.z) / 55);
    const [ar, ag, ab] = LIN.amber, [gr, gg, gb] = LIN.gold, [fr, fg, fb] = LIN.fog, [ir, ig, ib] = LIN.ivory;
    // gold 1/2 rail
    for (let z = 0; z > -72; z -= 1.5) {
      const a = fade({ x: 0, y: 0, z }) * (0.55 + 0.9 * fifty + 0.4 * hair);
      L.seg(0, 0.01, z, 0, 0.01, z - 1.5, 1.6, gr * a, gg * a, gb * a, 1);
    }
    // decade ticks across the field
    for (let d = 1; d <= 6; d++) {
      const z = zOf(d), a = fade({ x: 0, y: 0, z }) * 0.16;
      L.seg(-9, 0.01, z, 9, 0.01, z, 1.0, fr * a, fg * a, fb * a, 1);
    }
    // the running share
    const front = this.reveal(t);
    let head: P3 | null = null;
    for (let i = 1; i < this.trace.length; i++) {
      const p = this.trace[i - 1]!, q = this.trace[i]!;
      if (q.logn > front) { head = { x: p.x, y: 0.03, z: p.z }; break; }
      const a = fade({ x: q.x, y: 0, z: q.z }) * 1.4;
      L.seg(p.x, 0.03, p.z, q.x, 0.03, q.z, 2.6, ar * a, ag * a, ab * a, 1);
    }
    if (!head) { const p = this.trace[this.trace.length - 1]!; head = { x: p.x, y: 0.03, z: p.z }; }
    if (front < 5.999) {
      const hb = 6 * (0.85 + 0.15 * noise1(t * 30, 9));
      L.seg(head.x, head.y, head.z, head.x, head.y + 0.001, head.z, 10, ar * hb, ag * hb, ab * hb, 1);
    }
    // lantern posts, lamps, and each run's mark on the ground
    for (const l of this.lamps) {
      const I = this.lampI(l, t), a = fade({ x: LAMP_X, y: 1, z: l.z });
      const post = 0.08 + 0.25 * I;
      L.seg(LAMP_X, 0, l.z, LAMP_X, 2.9, l.z, 3, fr * post * a, fg * post * a, fb * post * a, 1);
      L.seg(LAMP_X, 2.9, l.z, LAMP_X - 0.6, 2.9, l.z, 2.5, fr * post * a, fg * post * a, fb * post * a, 1);
      const lb = 0.15 + 9 * I;
      L.seg(LAMP_X - 0.6, 2.55, l.z, LAMP_X - 0.6, 2.75, l.z, 9, ar * lb, ag * lb, ab * lb, 1);
      const m = prog(t, l.tHeads1 - 0.2, l.tHeads1 + 0.6, ease.outCubic);
      if (m > 0) {
        const x = xOf(l.share), r = 0.13;
        for (let k = 0; k < 24; k++) {
          const a0 = (k / 24) * Math.PI * 2, a1 = ((k + 1) / 24) * Math.PI * 2;
          const c = 2.2 * m * a;
          L.seg(x + r * Math.cos(a0), 0.02, l.z + r * Math.sin(a0), x + r * Math.cos(a1), 0.02, l.z + r * Math.sin(a1), 2, ir * c, ig * c, ib * c, 1);
        }
        // a thread of light from the lantern to its mark
        const c = 0.6 * m * a;
        L.seg(LAMP_X - 0.6, 2.5, l.z, x, 0.02, l.z, 1.2, ar * c, ag * c, ab * c, 1);
        // the hair between the mark and 1/2
        if (hair > 0) {
          const h = 3 * hair;
          L.seg(0, 0.05, l.z, x, 0.05, l.z, 2.2, ir * h, ig * h, ib * h, 1);
        }
      }
    }
    L.render(renderer, out, this.cam);

    // ---- type
    const T = this.text; T.clear();
    const c = T.ctx;
    c.textBaseline = 'alphabetic';
    // decade labels on the left edge of the field
    for (let d = 1; d <= 6; d++) {
      const p = this.proj({ x: -9.4, y: 0, z: zOf(d) });
      if (!p || p.s < 6) continue;
      const a = clamp(fade({ x: -9.4, y: 0, z: zOf(d) }) * 1.4) * (d <= front + 0.3 ? 0.75 : 0.25);
      c.font = font(F.mono(400), clamp(p.s * 0.42, 11, 26));
      c.textAlign = 'right';
      c.fillStyle = `rgba(142,162,184,${a})`;
      c.fillText(`${fmt(Math.pow(10, d))} flips`, p.x, p.y);
    }
    // each lantern's card, hanging in its light
    const cur = this.lamps.filter((l) => l.tName <= t + 0.2).pop();
    for (const l of this.lamps) {
      const I = this.lampI(l, t) * (l === cur ? 1 : 0) * (1 - hair);
      if (I <= 0.01) continue;
      const p = this.proj({ x: LAMP_X - 0.6, y: 3.6, z: l.z });
      if (!p) continue;
      const s = clamp(p.s / 60, 0.45, 1.5), a = I * clamp(fade({ x: LAMP_X, y: 3, z: l.z }) * 1.6);
      const x = p.x, y = p.y;
      c.textAlign = 'center';
      c.fillStyle = `rgba(237,230,214,${a})`;
      c.font = font(F.serif(600, true), 54 * s);
      c.fillText(l.name, x, y - 120 * s);
      c.fillStyle = `rgba(142,162,184,${0.9 * a})`;
      c.font = font(F.mono(400), 19 * s);
      c.fillText(l.sub.toUpperCase(), x, y - 90 * s);
      const fl = l.n * prog(t, l.tFlips0, l.tFlips1, ease.outCubic);
      const hd = l.heads * prog(t, l.tHeads0, l.tHeads1, ease.outCubic);
      c.font = font(F.mono(500), 26 * s);
      c.textAlign = 'right';
      c.fillStyle = `rgba(237,230,214,${0.85 * a})`;
      c.fillText('flips', x - 14 * s, y - 48 * s);
      c.fillText('heads', x - 14 * s, y - 16 * s);
      c.textAlign = 'left';
      c.fillStyle = `rgba(244,184,96,${a})`;
      c.fillText(fmt(fl), x + 14 * s, y - 48 * s);
      c.fillText(t >= l.tHeads0 ? fmt(hd) : '…', x + 14 * s, y - 16 * s);
      const sh = prog(t, l.tHeads1 - 0.3, l.tHeads1 + 0.5, ease.outCubic);
      if (sh > 0) {
        c.textAlign = 'center';
        c.fillStyle = `rgba(255,216,102,${sh * a})`;
        c.font = font(F.serif(600), 64 * s);
        c.fillText(`${(l.share * 100).toFixed(2)}%`, x, y + 48 * s);
      }
    }
    // final: how far from one half, read off the hair
    if (hair > 0) {
      for (const l of this.lamps) {
        const p = this.proj({ x: xOf(l.share), y: 0, z: l.z });
        if (!p) continue;
        c.textAlign = 'center';
        c.font = font(F.serif(600, true), 42);
        c.fillStyle = `rgba(237,230,214,${hair})`;
        c.fillText(l.name.split(' ').pop()!, p.x, p.y - 40);
        c.font = font(F.mono(500), 30);
        c.fillStyle = `rgba(255,216,102,${hair})`;
        c.fillText(`+${((l.share - 0.5) * 100).toFixed(2)}%`, p.x, p.y + 56);
      }
      const p = this.proj({ x: 0, y: 0, z: this.lamps[0]!.z + 3.0 });
      if (p) {
        c.textAlign = 'center';
        c.font = font(F.serif(600, true), 44);
        c.fillStyle = `rgba(255,216,102,${hair})`;
        c.fillText('½', p.x, p.y + 12);
      }
    }
    // the viewer's lantern, lower left: the number we hold
    const vx = 210, vy = H - 150;
    const g = c.createRadialGradient(vx, vy, 10, vx, vy, 260);
    const va = 0.16 + 0.22 * fifty;
    g.addColorStop(0, `rgba(244,184,96,${va})`); g.addColorStop(1, 'rgba(244,184,96,0)');
    c.fillStyle = g; c.fillRect(vx - 260, vy - 260, 520, 520);
    c.textAlign = 'center';
    c.font = font(F.serif(600), 92 + 10 * fifty);
    c.fillStyle = `rgba(237,230,214,${0.82 + 0.18 * fifty})`;
    c.fillText('50%', vx, vy + 30);
    this.ctx.comp.draw(renderer, T.upload(), out);

    return { hud: 0, bloom: 0.75, bloomThreshold: 0.7, halation: 0.25, vignette: 0.45, grain: 0.045, ca: 0.6 };
  }
}
