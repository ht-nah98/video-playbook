# R3: visual research for `ja/hikari` (なぜ世界は見えるのか ― 光の正体)

Scope: what each section must SHOW (diagrams that carry the explanation, with the numbers they need), 3 DNA directions,
thumbnail ideas, and historical/real images (downloaded to `assets/history/`, listed in `assets/history/INDEX.md`).
No other repo files were edited. Scratch files (search/licence scripts, rejected downloads) are in the session scratchpad.

---

## 0. Facts checked while doing this (feed into CONTENT.md)

Numbers computed in code (rainbow by Descartes minimum deviation with water n(λ); photon energy E[eV] = 1239.84/λ[nm];
hydrogen E_n = −13.606/n² eV).

| claim in SCRIPT.vi.md | status |
|---|---|
| Sun → Earth "8 minutes", 150 million km, 300,000 km/s | ✓ 1 AU = 149.6 million km, 499 s = **8 min 19 s**. c = 299,792.458 km/s |
| "trillions of photons hit your eye each second" | ✓ conservative. Rough estimate in daylight: scene ~10⁴ cd/m², pupil 2 mm → ~0.1 lm → **~10¹⁴ photons/s**. 「毎秒、何兆個も」 is safe |
| Euclid/Ptolemy emission vs Democritus/Epicurus "eidola" (intromission) | ✓ standard. Ibn al-Haytham (c. 965 – c. 1040, born in Basra, worked in Cairo), *Kitāb al-Manāẓir* (Book of Optics) c. 1011–1021. He argued with **experiments in a dark room** (camera obscura, several lamps → several separate spots of light). Good hook for DNA A |
| Newton "corpuscles" 17th c. | ✓ prism experiments 1666, paper 1672, *Opticks* 1704. Huygens *Traité de la lumière* 1690 (written 1678) |
| "Two beams cross without colliding", "light bends round corners" for the wave side | ✓ (diffraction was known to Grimaldi, 1665) |
| "Year 1801, Young, two slits" | ⚠ Young stated interference in 1801–1803 (his 1803 experiment used a thin card splitting a sunbeam); the two-slit **figure** is in his *Lectures* (1807). Safe wording: 「1801年ごろ、トマス・ヤング」 and show the 1807 plate as 「1807年の講義録の図」. Particle theory then lost ground over ~1801–1820s (Fresnel 1818), so "more than 100 years" (1704 → 1801) ✓ |
| "the video about the speed of light" (Maxwell's equations) | ✗ that video does not exist on 99の発見. Cut the reference or rephrase |
| Maxwell: EM wave at the speed of light | ✓ 1865. Hertz made radio waves in the lab in 1887–88 (good one-liner) |
| Photoelectric effect: intensity ×10 does nothing, shorter λ ejects at once | ✓ Hertz 1887, Lenard 1902, Einstein 1905, **Nobel 1921** (for the photoelectric law, not relativity). Numbers for the slider: sodium work function ≈ **2.28 eV → threshold ≈ 544 nm** (green). Red 700 nm = 1.77 eV ✗, blue 450 nm = 2.76 eV ✓. Classic school demo: zinc plate (4.3 eV → 288 nm, UV only) |
| E ∝ frequency | ✓ E = hf = hc/λ. Visible range 1.77 eV (700 nm) – 3.26 eV (380 nm) |
| Energy ladder; "Hydrogen, Sodium, Neon fingerprints" | ✓ H (Balmer, n→2): **656.1 (Hα 3→2, red), 486.0 (Hβ 4→2), 433.9 (Hγ 5→2), 410.1 (Hδ 6→2) nm**; levels −13.6, −3.40, −1.51, −0.85, −0.54, −0.38 eV. **Na D: 589.0 / 589.6 nm** (one yellow-orange double line). **Ne**: dense red-orange group 585.2, 588.2, 594.5, 597.6, 603.0, 607.4, 609.6, 614.3, 616.4, 621.7, 626.6, 633.4, 638.3, 640.2, 650.7, 659.9, 692.9, 703.2 nm (+ weak green 540.1) |
| "Sun shines because the core is 15 million degrees … electrons excited … photons at every wavelength" | ⚠ core ≈ 15.7 million K ✓, but the light we **see** leaves the **photosphere at ≈ 5,800 K (5,772 K)**, and a continuous spectrum is **thermal radiation**, not single ladder-jumps. Keep the simple picture but say 「表面は約6000度」 for the visible light, or say "heat shakes charges → light" for continuous spectra. Tungsten filament ≈ 2,700–3,000 K ✓ (peak ≈ 1 µm, so most of its output is infrared: a nice link to Part 4). Candle: the yellow is glowing **soot** (~1,000–1,400 °C); blue base = molecular emission (C₂, CH) |
| Radio, microwave 12 cm | ✓ microwave oven 2.45 GHz → **12.2 cm** ✓. ⚠ "this frequency is strongly absorbed by water" is a common myth: 2.45 GHz is **not** a water resonance; water molecules (dipoles) are twisted back and forth by the field (dielectric heating). Say 「水の分子をゆさぶって温める」 |
| CMB 380,000 years after the Big Bang, microwave | ✓ peak ≈ 1.06 mm (160 GHz), T = 2.725 K |
| IR 700 nm – 1 mm; body emits IR; TV remote | ✓ body (310 K) peaks at **≈ 9.3 µm**; TV remote ≈ **940 nm** (phone cameras see it: a nice "invisible made visible" shot) |
| UV 10–380 nm; UVA ageing, UVB burning, ozone absorbs UVC | ✓ UVA 315–400, UVB 280–315, UVC 100–280 nm. ⚠ "without ozone the surface would be sterilised" is too strong; say 「生き物にとってずっと危険な場所になる」 |
| Bees see UV; flowers have UV nectar guides | ✓ (Mimulus photo in assets) |
| X-ray 0.01–10 nm; "sao nơi trong" | ✓ ("sao nơi trong" = neutron star 中性子星) |
| Gamma < 0.01 nm, "billions of times" a visible photon | ⚠ a Co-60 gamma (1.33 MeV) is ≈ **600,000×** a visible photon (2.2 eV); "billions" only for cosmic gamma rays (GeV–TeV). Say 「数十万倍から、それ以上」 |
| Refraction: water ~25% slower, ~225,000 km/s | ✓ n = 1.333 → 224,900 km/s. Glass n ≈ 1.5 → ≈ 200,000 km/s |
| Chopstick looks broken, pool looks shallower | ✓ apparent depth ≈ real depth / 1.33 ≈ **¾** (viewed from above) |
| Dispersion: violet bent more | ✓ water n: 404.7 nm 1.3435 · 486 1.3371 · 589 1.3330 · 656 1.3311 · 700 1.3300 |
| Rainbow red 42°, violet 40° | ✓ computed: **red (700) 42.5°, 656 nm 42.4°, 589 nm 42.1°, 486 nm 41.5°, violet (405) 40.6°**. Ray enters at i ≈ 59°, refracts to r ≈ 40° |
| Secondary bow: two internal reflections, reversed colours, fainter | ✓ **red 50.1–50.4°, violet 53.6°** (so ≈ 51° outer arc). The darker sky between the bows = **Alexander's dark band** (worth one shot) |
| "Each drop sends one colour to your eye"; "two people see different rainbows" | ✓ (cone of 42° around the antisolar point — the shadow of your head) |
| Rayleigh ∝ 1/λ⁴, 450 vs 700 nm "almost 6×" | ✓ (700/450)⁴ = **5.86**. Why not violet: sunlight has less violet, eyes are less sensitive to it, and some is absorbed high up (one line max) |
| Apple absorbs all but red | ✓ (simplified; real reflectance curve rises from ~600 nm) |
| ~130 million photoreceptors; rods ~120 M; cones 6–7 M | ✓ (rods 90–120 M, cones 4.6–6 M by Curcio 1990; "約1億2000万 / 約600万" is fine) |
| S/M/L "blue/green/red" | ⚠ peaks are **S ≈ 420 nm, M ≈ 534 nm, L ≈ 564 nm** — L peaks in **yellow-green**, not red. The curves overlap strongly. Red light is "red" because L ≫ M, not because L is a "red sensor". Rods peak ≈ 498 nm. Draw the curves at the true positions or the diagram teaches a myth |
| "photon hits rhodopsin" in cones | ⚠ **rhodopsin is the rod pigment**; cones use similar cone opsins (photopsins). Both share **retinal**, which flips shape (11-cis → all-trans) when hit. Say 「視物質（ロドプシンなど）」 |
| "Colour is not in physics, it is in your head" | ✓ good closing. Bonus evidence that fits the DNA: **magenta is not in the spectrum** — the brain invents it when S and L fire but M does not |

---

## 1. Section by section: what must be SHOWN

Rule for this video: **colour on screen = light**. Any colour drawn as light must come from a wavelength through the same
`wavelengthToRGB()` (§3). Everything that is not light (labels, frames, diagrams) stays neutral.

### 0. Opening (Mở đầu)
1. **The journey in one line:** Sun → 150,000,000 km → atmosphere → an object → your eye. A single photon dot travels a
   log-scale path (otherwise the last 1 m is invisible), with a timer running 0 → 8:19 (499 s) at the top.
2. **Rain of photons into a pupil:** many dots (hash(i) positions) converging on a drawn eye; a counter 「毎秒 何兆個」.
3. **The promise (目次, ①②③④):** 光とは何？ / どう生まれる？ / なぜ見える？ / なぜ宇宙の大半は見えない？ Ideally four
   beams of light lighting up four cards in a dark room (DNA A).

### 1. Three centuries of argument (Phần 1)
1. **Emission vs intromission (needs clean geometry):** two side-by-side panels.
   - Left 「目から光が出る」 (Euclid/Ptolemy): rays fan **out** of the eye like a flashlight cone, sweeping an object.
   - Right 「物から像が飛んでくる」 (Democritus/Epicurus): tiny copies of the object (eidola) fly **into** the eye.
   - Then Ibn al-Haytham's correction: **source → object → eye**, three arrows; red ✗ on the left panel.
   - His dark-room proof: three lamps outside a hole, three separate spots on the inner wall; cover one lamp, one spot
     goes out. (Commons has a diagram `Ibn al-Haytham's lamps experiment.svg`; draw our own.)
2. **Corpuscles:** Newton's particles as dots flying straight: a sharp shadow behind an obstacle, mirror reflection with
   equal angles (∠i = ∠r, angle arcs drawn).
3. **Huygens' wave:** expanding circular wavefronts from a point, each point of a front spawning wavelets (Huygens'
   principle); two wave trains crossing and passing through each other unchanged; a wave bending round an edge.
4. **Double slit (the key diagram — numbers matter):**
   - Top view: wavefronts from two slits, crests = bright arcs, troughs = dark arcs; **antinodal lines** (bright fringes)
     where crest meets crest. Fringe spacing Δy = λL/d (e.g. λ = 650 nm, d = 0.25 mm, L = 2 m → **5.2 mm**). Assert it.
   - Prediction vs reality on the screen: "particles → two stripes" (ghost) vs **fringes building up** dot by dot.
     Positions sampled from I(y) ∝ cos²(πdy/λL)·sinc²(πay/λL) with a deterministic hash-based inverse CDF.
   - Insert Young's 1807 figure `young-waves.png` (his own two-source drawing) as the historical proof.

### 2. EM waves and photons (Phần 2)
1. **EM wave (accurate geometry):** a 3D-projected travelling wave: **E vertical (one colour), B horizontal (another),
   in phase, both ⊥ to the direction of travel**, sinusoid arrows sampled along the axis. Label 「電場」「磁場」「進む向き」.
   Maxwell portrait + "1865"; optionally "c = 1/√(ε₀μ₀) ≈ 30万 km/s" as an engraved line.
2. **Photoelectric effect (two sliders — the core demo):**
   - A metal plate (sodium), a lamp with two dials: **明るさ (intensity)** and **波長/色 (wavelength)**.
   - Intensity ×1 → ×10 at 700 nm: more red photons rain down, **no electron leaves** (counter stays 0).
   - Switch to 450 nm at 1/10 intensity: few photons, **each one ejects an electron immediately**.
   - Threshold line at **544 nm** on a wavelength dial; each photon drawn as a packet with its energy (1.77 / 2.76 eV) vs
     a "wall" height of 2.28 eV. The stone/window metaphor: pebbles vs one big stone, one shot.
   - Einstein 1921 portrait + 「1921年ノーベル物理学賞（光電効果）」 (playlist hook なぜ？を解いたノーベル賞).
3. **E ∝ f strip:** three wave trains (red, green, violet) with photon "packet sizes" growing; keep for Parts 3–4.

### 3. Where light comes from (Phần 3)
1. **Energy-level ladder (numbers must be right):** hydrogen levels drawn to scale in eV (−13.6, −3.40, −1.51, −0.85,
   −0.54, −0.38). Electron jumps up (heat/collision/current), then drops 3→2 and **emits a photon whose colour is the
   gap**: 1.89 eV → 656 nm red. Then 4→2 (486 cyan-blue), 5→2 (434 blue-violet), 6→2 (410 violet). Assert every λ
   from 1239.84/ΔE.
2. **Fingerprints:** three emission-line bars on the same nm ruler (380–700): H (4 lines), Na (589.0/589.6, one
   yellow-orange line), Ne (dense red-orange group). Next to each, the real photo: hydrogen tube (pink), neon tube
   (red-orange), sodium street light (monochrome yellow). Real spectroscope photos: `spectrum-na.jpg`, `spectrum-ne.jpg`.
3. **Continuous sources:** Sun / candle / filament as glowing bodies with a **continuous** spectrum strip; temperature
   tags (Sun surface ≈ 5,800 K; filament ≈ 2,800 K, its curve peaking in the IR). Optional: blackbody curves with the
   visible band shaded (peak 502 nm for the Sun, ≈ 1 µm for the filament).
4. **Summary loop:** energy in → electron up → down → photon out (a 4-step cycle icon reused in the ending).

### 4. The electromagnetic spectrum (Phần 4)
1. **The full ruler (log scale, the running prop of this section):** one horizontal log-λ axis from **1 km to 1 pm**
   (10³ m → 10⁻¹² m, 15 decades). Bands at their real decades: radio (> ~1 m… km), microwave (1 mm – 30 cm), IR
   (700 nm – 1 mm), visible (380–700 nm, **a sliver ≈ 0.27 of one decade out of 15 ≈ 2% of the log width**), UV
   (10–380 nm), X (0.01–10 nm), gamma (< 0.01 nm). An energy axis (eV) mirrored underneath.
2. **Everyday object at each band, at its real wavelength:** radio tower / FM 3 m; Wi-Fi 12.5 cm & microwave oven
   12.2 cm; CMB 1.06 mm; body heat 9.3 µm (thermal-camera silhouette); TV remote 940 nm; the visible strip; sunscreen /
   UVB 300 nm; X-ray hand 0.1 nm; gamma (radioactive symbol, radiotherapy) 0.001 nm.
3. **Size comparisons** for the wavelength (building, human, bee, cell, molecule, atom, nucleus) above the ruler.
4. **"Invisible made visible" inserts:** bee's-eye UV flower (`mimulus-uv.jpg`); a remote's IR LED seen by a phone
   camera (draw it); a thermal silhouette (drawn).
5. **Ending beat:** zoom the camera from the whole ruler into the tiny visible slit → "this is all you can see".

### 5. Refraction, dispersion, rainbow (Phần 5)
1. **Refraction wavefront + car on sand (accurate):** plane wavefronts hitting a boundary at an angle; spacing shrinks to
   λ/1.33 in water; fronts kink; the ray obeys Snell (n₁ sin θ₁ = n₂ sin θ₂). Side by side: a car (axle as a wavefront)
   whose left wheel hits sand first and turns. Speeds 30万 → 22.5万 km/s.
2. **Chopstick in a glass:** real chopstick (dashed ghost) vs where the eye thinks it is; the traced ray bends at the
   surface; apparent depth ≈ ¾. Pool floor version optional.
3. **Prism (Newton):** white beam into a 60° prism; dispersion from a real n(λ) (BK7: 1.530 at 404 nm, 1.514 at 656 nm);
   the fan exaggerated **only if labelled**. Then Newton's **experimentum crucis**: a second prism does **not** split a
   single colour again (the proof that white is a mixture). Newton portrait + Grusche's painting (imagined).
4. **Raindrop path (numbers matter):** circle drop; incoming ray at i ≈ 59°, refraction in, one internal reflection,
   refraction out; red exits at **42.4°**, violet at **40.6°** to the anti-solar direction. Then the many-drops picture:
   observer, anti-solar point (head shadow), a 42° cone; drops higher up send red, lower send violet.
5. **Double rainbow:** second ray path with **two** internal reflections; secondary at ≈ 50–54°, colours reversed,
   fainter; Alexander's dark band between. Real photo `rainbow-double.jpg`.
6. **Blue sky / red sunset:** sunbeam through air molecules; blue scattered sideways ∝ 1/λ⁴ (bar chart: 450 nm vs 700 nm
   = **5.86×**); short path at noon vs long path at sunset (the tangent path through the atmosphere is ~38× longer near
   the horizon, ≈ 1/sin(altitude) for higher Sun) → sunset light reddens. A slider for the Sun's altitude.

### 6. Why you see colour (Phần 6)
1. **Apple absorption:** white beam (all wavelengths as strands) hits the apple; strands except red **end** at the
   surface (absorbed, the apple warms), red strands bounce out. Then **the sodium-light proof**: under monochrome 589 nm
   light the red apple looks dark grey (`sodium-cars.jpg`: a red car and a black car look the same under low-pressure
   sodium lamps). "The apple's red is what it does **not** keep."
2. **Eye cross-section (accurate anatomy, simplified):** cornea, iris/pupil, lens (accommodation: lens thickens for
   near), vitreous, retina, fovea, optic nerve, blind spot. Rays from an object focus to an **inverted** image on the
   retina (camera obscura link to Part 1).
3. **Rods and cones:** a magnified retina patch; rods (thin, 約1億2000万, grey) and cones (fat, 約600万, three tints);
   fovea = cones only.
4. **S/M/L sensitivity curves at the true peaks (420 / 534 / 564 nm)**, overlapping, on the same nm ruler as Parts 3–4;
   a vertical probe at 650 nm (apple red) reads the three responses as bar heights (L high, M low, S ≈ 0). The ratio is
   the colour code. Optional: 580 nm (yellow) vs red+green mix gives the same ratio → screens work; magenta = S+L
   without M → not in the spectrum.
5. **Retina → brain:** photon hits the pigment (retinal flips shape, a two-frame molecule icon), → electrical pulse,
   → optic nerve → optic chiasm → visual cortex at the back of the head. A visible **boundary line**: left of it
   「物理（光子・波長・エネルギー）」, right of it 「生物（電気信号・神経・脳）」. The light ends at the retina: the beam
   stops, only pulses continue.

### Conclusion (Kết luận)
- Replay the whole chain as one continuous camera move along the light path: atom ladder → photon (wave + packet) →
  Sun 8:19 → apple absorbs → cornea/lens → retina → pulses → brain. The four promise cards get their answers.
- Last image: the full spectrum ruler, all dark except the tiny visible slit; then the sentence
  「色は物理の中にはない。あなたの頭の中にある。」 End card 99の発見 + チャンネル登録 (≥ 4 s still).

---

## 2. DNA directions

Not to echo: 天球 (ja/pi: indigo night, brass instruments), 盤上 (ja/2048: kaya-wood board), 合わせ鏡 (ja/chirality:
silvered mirror on a graphite bench), 漆と金 (intro: lacquer + gold). Also avoid the English-channel ones that sit close to
"light": sudoku (stained glass), fifty-percent (lamps in a foggy night), solid-geometry (cream paper + one lamp + shadow).

Fonts (checked with fontTools `getBestCmap`):
- **Noto Sans JP lacks ⁰ ⁵ ⁶ ⁷ ⁸ ⁹ ⁻ and ₀–₃** (has ¹ ² ³ ⁴). Powers of ten (10⁻⁹ m, 10¹⁴) must be drawn as a small raised run of
  normal digits by the kit, not typed as Unicode superscripts. It has λ ν γ ⊥ × ≈ ∝ ° μ ℏ θ π.
- **Shippori Mincho lacks λ ν γ ⊥ ≈ ∝ μ ℏ θ π ∞ ≠** → titles only; every formula/label in Noto.
- Plex Mono / Cormorant lack CJK (and λ ν ⊥ ∝).

### A. 「節穴の暗室」 The knot-hole darkroom — *recommended*
- **Core image:** the whole video happens inside **one pitch-dark Japanese room** shut by 雨戸 (storm shutters). Light
  enters only through a **節穴** (knot-hole) or a slit in the shutters, as a visible beam in dusty air. Nothing exists
  on screen until light touches it: objects, diagrams and even the mascot appear **only where a beam lands** (which IS
  the lesson: seeing = light that reached you). The camera-obscura effect of a knot-hole (the inverted outside world
  projected on the 障子) is a real, familiar Japanese phenomenon (「節穴カメラ」) and is exactly Ibn al-Haytham's
  dark-room experiment and the eye's own optics.
- **Dark → light arc:** each section opens one more aperture. Part 1 one hole; Part 1 end two slits (Young); Part 5 a
  prism on the sill; Part 6 the hole becomes a **pupil** (the room = an eyeball, the back wall = retina). Finale:
  **all shutters slide open**, daylight floods the room (the only time the background is bright).
- **Running object: the hole (`kit.aperture`).** Its states: knot-hole (opening, Ibn al-Haytham), lamp-hole (3 lamps),
  two slits (Young), metal plate window (photoelectric), spectroscope slit (fingerprints), the visible "slit" in the
  log ruler (Part 4: the hole is literally the narrow band we see through), prism window (Part 5), pupil (Part 6),
  open shutters (ending). The 目次 = four beams through four holes landing on four cards.
- **Palette** (contrast vs bg computed, WCAG):
  - room black `#0B0B0E`; dim plaster/wood structure `#1E1C19` (1.2:1 — texture only, never carries information);
  - text 生成り `#EDE8DF` (**16.1:1**), secondary label `#9A958C` (6.6:1), misconception strike = secondary grey with a
    single grey stroke (no red: red is a wavelength here);
  - **every colour that is light comes from `wavelengthToRGB(λ)`**; white light = additive sum of strands.
  - **No accent hue** for UI marks (the ① ② ③ ④ promise, "answer" stamps): emphasis by brightness, size and a thin
    生成り ring only. This keeps the rule "colour = light" absolute, which is the DNA.
- **Text:** titles Shippori Mincho; labels Noto Sans JP ≥ 28 px. Text **is revealed by light**: a beam sweeps across a
  dark card and the letters appear where it passes (a lit mask, not a fade); when the beam moves on, the text stays
  softly lit. Numbers engraved on a thin ruler style for nm / eV.
- **Transitions:** same ERA = **shutters**: 雨戸 slats slide shut (black frame) and reopen on the next set-up (a natural
  "black-to-black" with a wooden-slide sound). Different ERA = **iris wipe** from the current aperture (a circle of light
  opening from the hole). Intro joins: black ↔ black.
- **Sounds (ja channel, ~1 / 3 s):** 雨戸 slide, shutter click, glass clink (prism/glass of water), soft "pin" for each
  photon arrival, electrical crackle for the photoelectric hit, suzu for the "a-ha" (the apple turning grey under Na).
- **Why it fits:** it turns the content's own thesis into the medium (dark until light arrives), it carries the history
  (Ibn al-Haytham's dark room, Newton's shuttered room with a hole and a prism — both literally happened in darkened
  rooms), and the eye = camera obscura gives Part 6 a payoff without a new world. It is Japanese without being
  decorative (雨戸, 障子, 節穴, a 麦茶 glass for the chopstick, an apple on a 卓袱台).

### B. 「分光器」 The spectroscope bench
- **Core image:** a modern optics lab: a black anodised **optical rail** with precision mounts (slits, lenses, prisms,
  gratings, a detector) and a **calibrated nm scale** that is always in shot. Every phenomenon is an instrument set-up;
  the camera tracks along the rail.
- **Running object:** the **spectrum scale** (`kit.scale`): 380–700 nm in Parts 1–3, extending to the 15-decade log
  ruler in Part 4, reused under the S/M/L curves in Part 6.
- **Palette:** anodised black `#14171C`, machined aluminium highlights `#C9CDD3`, text `#EDE8DF` (**14.7:1**), laser-etched
  tick labels `#8E949C`; colours only from wavelengths.
- **Text:** laser-etched mono-like Noto at small caps sizes; values with units; readouts as instrument displays.
- **Transitions:** rail slide (camera dolly along the bench); different ERA = a lens-focus blur-in.
- **Risk:** precise but cold; "engraved instrument" sits near 天球's engraved brass. Little room for the history and the
  everyday objects (apple, rainbow, sky) without leaving the bench.

### C. 「縁側の夏」 A summer veranda (bright)
- **Core image:** a Japanese summer afternoon on an 縁側: 麦茶 in a glass (refraction), a 風鈴 (glints), a garden hose
  making a rainbow (打ち水), 簾 slits throwing fringes, a red apple, the sky going to sunset. Optics with everyday
  objects, drawn on 和紙.
- **Palette:** 和紙 `#F4EFE4`, 墨 `#23211F` (**14.0:1**), 藍 `#1F3A5F` (10.0:1).
- **Text:** brush-like Mincho titles, Noto labels; diagrams inked with a pen line.
- **Transitions:** 簾 rolled down/up; different ERA = a sun-shadow sweep.
- **Risk (measured):** spectral colours on light paper fail: **green/yellow/cyan lines are 1.1–1.5:1 on 和紙**, so the
  spectrum, fingerprints and rainbow (the heart of the video) would need dark insets anyway. Bright background also
  kills the "glow" of light, and the history/space parts (Maxwell, gamma, CMB) don't live on a veranda.

**Recommendation: A 「節穴の暗室」**, borrowing C's everyday props *inside* the room (the 麦茶 glass, the apple on a
卓袱台, a hose rainbow seen **through** the opened shutters at the end) and B's calibrated nm scale as the single
measurement object (it hangs on the darkroom wall, then becomes the log ruler). As ERAs inside A: `darkroom` (main),
`lab` (photoelectric, ladder, fingerprints: darker, with the scale), `sky` (rainbow/sunset seen through the open
shutters), `eye` (the room as an eyeball). ERA change = iris wipe from the aperture.

### Pitfalls (all directions)
1. **Spectral colour accuracy.** Use **tabulated CIE 1931 2° CMFs** (CVRL, 5 nm) → XYZ → linear sRGB → bring into gamut
   (clip negatives / desaturate toward D65 at constant luminance) → sRGB gamma. **Do not** use Bruton's approximation or
   a quick analytic fit untested: two quick methods tried here gave **700 nm → orange `#FF8100` and 380 nm → blue**
   (hue errors at both ends). Put a `must()` test strip: 656 nm red, 589 nm yellow-orange, 546 nm green, 486 nm cyan-blue,
   434 nm blue-violet, 405 nm violet; check hues in a still. Fade intensity at 380–420 and 650–700 nm (eye sensitivity)
   so the strip does not look like an RGB gradient with hard red/blue blocks.
2. **Dark background vs coloured glow.** Blue-violet 430–470 nm is only **≈ 2.6–3.0:1 on black** (computed): thin violet
   lines vanish, especially after YouTube compression. Draw beams with a lighter core (mix ~30% white along the centre
   line) + soft glow, ≥ 4 px for diagram rays. Additive glow (`lighter`) must be clamped or overlapping beams burn to
   white. Large dark areas + gradients band in H.264: add hash-based dither/grain (deterministic) to the glow.
3. **Japanese legibility.** Labels never in spectral colour (yellow-green labels look fine, violet ones disappear);
   use 生成り text with a small colour chip/dot instead. ≥ 28 px (LESSONS §95). No text inside a glow halo without a
   dark backing plate.
4. **"Colour = light" consistency.** If an apple is red under white light, it must turn dark under sodium light in the
   same kit: drive surface colours from a reflectance curve × illuminant spectrum, not a fixed fill.
5. **Numbers on screen** (λ, eV, angles, 5.86×, 544 nm) computed in kit code with `must()`; no hand-typed values.

---

## 3. YouTube thumbnail ideas (title pattern なぜ…？)

1. **"Why is the apple red?" (dark room + one beam):** pitch-black frame, a single white beam from top-left hits a red
   apple; behind the apple the beam splits into a small spectrum where every colour **stops** except red. Big text
   「りんごは赤くない？」 or 「なぜ世界は見える？」 in white Mincho bold, small 「光の正体」. Mascot half-visible in the
   beam, surprised face. Title: 「なぜ世界は見えるのか？ ― 光の正体」.
2. **"You are almost blind" (spectrum ruler):** the full log spectrum as a long black bar with icons (radio tower,
   microwave, thermal person, X-ray hand, gamma), **all dark** except a thin bright rainbow slit in the middle with a
   red arrow and 「見えているのはここだけ」. Big text 「目に見える光は 2%」 (2% of the log ruler; or 「ほんの一瞬」 if the %
   feels technical). Title: 「なぜ私たちには宇宙のほとんどが見えないのか？」.

---

## 4. Historical / real images

Downloaded by me from Wikimedia Commons (`Special:FilePath`, width ≤ 1600 → served at ≤ 1920), looked at every one.
Table with keys, sizes, licences and Japanese labels: `assets/history/INDEX.md`.

Not kept (and why):
- `Ibn al-Haytham.png` (modern pencil-style portrait, CC BY-SA 4.0 Sopianwar, 2015): purely imaginary and modern. The
  1647 Hevelius frontispiece is the historically grounded image (Alhazen as "Ratione"), so use that, marked imagined.
- Iraqi 10,000-dinar note (Ibn al-Haytham portrait): **not found on Commons** in this session.
- `Neon.JPG`: the "NEON" sign glows **cyan-white**, i.e. not neon gas (neon is red-orange) — would teach the wrong colour.
- `Neon discharge tube.jpg`: GFDL 1.2 only (awkward for video) → replaced by `Neon-glow.jpg` (CC BY 3.0, Jurii).
- `Sodium spectrum visible.png`, `Hydrogen spectrum visible.png`, `Visible spectrum of neon.jpg`: synthetic renders;
  we draw our own from the line lists (§0) instead. The real spectroscope photos (Na, Ne) are kept.
- `Albert Einstein (Nobel).png` (280 px, too small); duplicate Maxwell; `Huyghens … Fig. 3.svg` (renders as white lines
  on transparent → black); `Double rainbow, Graz` (good, but Alaska is clearer; one fewer credit); small/odd sodium
  lamp photos.

Licence notes: CC BY / CC BY-SA / FAL files need author + licence in the YouTube description (list in INDEX.md). The
Grusche painting is a **modern imagined** scene (2015), label it so.

## Sources
- Wikimedia Commons file pages (licence/author read from each page's licence template, 2026-10-13).
- Water refractive index: Daimon & Masumura (2007) values at 20 °C (rounded). Hydrogen levels: Bohr/Rydberg
  (R∞hc = 13.606 eV). Na D lines and Ne lines: NIST Atomic Spectra Database (strong visible lines).
- Cone peaks: Stockman & Sharpe (2000) fundamentals (S 420, M 534, L 564 nm; rods 498 nm). Receptor counts: Curcio et
  al. (1990).
