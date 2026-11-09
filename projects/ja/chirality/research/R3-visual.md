# R3: visual research for `ja/chirality` (2026 Nobel Prize in Chemistry: Kagan and Soai)

Scope: molecule data, visual ideas for each concept, 2–3 DNA options and historical image assets. No repo files were edited.
Everything is in `scratchpad/chirality/`:

| path | contents |
|---|---|
| `molecules/raw/*.3d.sdf`, `*.3d.json` | raw PubChem 3D conformer downloads (SDF and full JSON record) |
| `molecules/<name>.json` | compact JSON for the kit (schema below) |
| `molecules/_verify.json` | CIP and mirror checks per pair |
| `scripts/mol.py` | the converter and verifier (RDKit via `uv run --no-project --with rdkit --with numpy`) |
| `web/` | Nobel popular-info text and figures (reference only, © Johan Jarnestad/KVA, **not for reuse**), Soai review PDF (BCSJ 2011) |

---

## 0. Facts checked while doing this (feed into CONTENT.md)

Source: nobelprize.org popular information "They solved chemistry's asymmetric mystery" (fetched 2026-10-13), and Soai
et al., *Bull. Chem. Soc. Jpn.* 2011, 84, 879 (Table 1, from Soai's own lab site).

| claim in SCRIPT.vi.md | status |
|---|---|
| Kagan and Soai, prize announced 2026-10-07, "for the discovery of non-linear effects and autocatalysis…" | ✓ press release. Kagan was born in 1930 in Boulogne-Billancourt, so he is 95 ✓. Soai was born in 1950 in Hiroshima, so he is **75 or 76 depending on his birthday**; check the month before putting "76" on screen. |
| "In the early 1970s **Soai** created DIOP" | ✗ **Wrong person.** DIOP is **Kagan's** ligand (Kagan & Dang, 1971–72). Soai was a PhD student then (PhD 1979). |
| Soai 1995: 2% → "about 87%" | The Nobel popular text says **87%**. Soai's own Table 1 says **88%**. The rounds (ee of catalyst+product mixture): **2 → 10 → 57 → 81 → 88%** (entries 1–4). Entry 5 starts at 99% and gives **88%**, so this 1995 catalyst levels off at about 88–90% and never reaches 100%. The Nobel text agrees: "did not achieve the 100 per cent enantiomeric purity of life". |
| "By 2003 almost only one hand" | ✓ Nobel text, 2003. Use the **2-alkynyl (tert-butylethynyl) pyrimidyl alkanol**: about **0.00005% ee → 57% → 99% → >99.5%** in 3 rounds; the major enantiomer multiplies about 630,000×, the minor one less than 1000× (BCSJ 2011). The Nobel figure 6 adds "up to 99.99%", and the side that wins is random from run to run. |
| 1995 molecule | The 1995 *Nature* compound is **2-methyl-1-(pyrimidin-5-yl)propan-1-ol** (no 2-substituent), made from pyrimidine-5-carbaldehyde and iPr₂Zn. The 2-**methyl**pyrimidyl alkanol in the brief is a **later** autocatalyst. All three are downloaded. |
| Kagan's figure numbers (Nobel fig. 4) | 75% R : 25% L (ee 50%) → dimers RR **56%**, LR **38%**, LL **6%** → LR inactive → effective **90 : 10** (ee 80%). These are exactly 0.75² = 0.5625, 2·0.75·0.25 = 0.375 and 0.25² = 0.0625, so they can be computed in code with `must()`. |
| Frank 1953 | "Charles Frank, University of Bristol, theoretical physicist". Full name **Sir Frederick Charles Frank** (1911–1998), *Biochim. Biophys. Acta* 11, 459 (1953). Three conditions: (1) chiral catalyst + asymmetric reaction, (2) one enantiomer enhanced and the other damped, (3) the product is its own catalyst (autocatalysis). Marckwald (early 1900s) met condition 1, Kagan 1986 met condition 2, and Soai met condition 3. That gives a **3-box checklist** the video can fill in one tick at a time. |
| Pasteur 1848, age 25 | ✓ (born 27 Dec 1822). Nobel text: one solution bent light right, the other left, and mixing them cancelled the rotation. 1857: bacteria fermented only the grape enantiomer. |
| Kelvin named "chirality" | ✓ (Baltimore Lectures, 1893–1904). He was Belfast-born and worked in Glasgow, so call him a **British** physicist, not 「イギリス人」 in the narrow "English" sense. |
| Thalidomide >10,000 children; withdrawn 1961 | The Nobel text says "thousands"; ≈10,000 is the usual figure. Nobel: "the active substance's mirror image caused the harm". **But the two forms interconvert in the body** (racemisation at the acidic C–H in hours), so giving the "safe" enantiomer alone would not have helped. Say this, or the video teaches the myth. |
| **Labelling trap** | D/L ≠ R/S ≠ the direction light turns. **L-alanine is (S) and dextrorotatory (+)**. Natural **L-(+)-tartaric acid is (2R,3R)** and turns light right. Never draw "L = turns light left". |

---

## 1. Molecule data

### Compact JSON schema (`molecules/<name>.json`)
```json
{"name":"S-CHFClBr","note":"…","cid":57518772,"iupac":"(S)-bromo-chloro-fluoromethane","smiles":"[C@H](F)(Cl)Br",
 "source":"PubChem CID …, 3D conformer, Å, centred on centroid",
 "stereo":[{"atom":3,"cip":"S"}],
 "atoms":[{"el":"Br","x":-1.683,"y":-0.606,"z":0.403}, …],
 "bonds":[{"a":0,"b":3,"order":1}, …]}
```
- Coordinates are in Å, centred on the centroid and include hydrogens; the kit can filter H out. Bond orders are Kekulé (1/2/3, no 1.5). `stereo[].atom` indexes `atoms`.
- PubChem's 3D records carry no names, so `iupac` and `smiles` come from PUG REST `property/IUPACName,IsomericSMILES`.

### Files and checks
"CIP from 3D" means RDKit recomputed R/S from the downloaded coordinates (AssignStereochemistryFrom3D plus the new CIP labeler) and got the label in the PubChem IUPAC name. "Mirror" means x → −x of the first molecule, then a proper rotation only (Kabsch, det +1) onto the second, minimising RMSD over every graph mapping.

| pair (file names) | CIDs | PubChem IUPAC | CIP from 3D | mirror(A) gives | stereocentre RMSD, direct / mirrored | heavy-atom RMSD, direct / mirrored |
|---|---|---|---|---|---|---|
| `R-carvone` / `S-carvone` | 439570 / 16724 | (5R)-… / (5S)-2-methyl-5-prop-1-en-2-ylcyclohex-2-en-1-one | R / S ✓ | S ✓ | 1.218 / **0.005 Å** | 1.084 / **0.007** |
| `D-alanine` / `L-alanine` | 71080 / 5950 | (2R)- / (2S)-2-aminopropanoic acid | R / S ✓ | S ✓ | 1.235 / **0.002** | 0.653 / **0.007** |
| `R-thalidomide` / `S-thalidomide` | 75792 / 92142 | 2-[(3R)- / (3S)-2,6-dioxopiperidin-3-yl]isoindole-1,3-dione | R / S ✓ | S ✓ | 1.223 / **0.002** | 1.518 / **0.005** |
| `L-tartaric_2R3R` / `D-tartaric_2S3S` | 444305 / 439655 | (2R,3R)- / (2S,3S)-2,3-dihydroxybutanedioic acid | RR / SS ✓ | SS ✓ | 1.427 / **0.003** | 1.499 / **0.022** |
| `R-CHFClBr` / `S-CHFClBr` | 57518771 / 57518772 | (R)- / (S)-bromo-chloro-fluoromethane | R / S ✓ | S ✓ | 1.231 / **0.0003** | 0.459 / **0.0003** |
| `R-soai1995` / `S-soai1995` (Nature 1995, cpd 2) | 93233729 / 11240594 | (1R)- / (1S)-2-methyl-1-pyrimidin-5-ylpropan-1-ol | R / S ✓ | S ✓ | 1.195 / **0.003** | 1.481 / **0.022** |
| `R-soai-methyl` / `S-soai-methyl` (as in the brief) | 101710513 / 10975848 | (1R)- / (1S)-2-methyl-1-(2-methylpyrimidin-5-yl)propan-1-ol | R / S ✓ | S ✓ | 1.195 / **0.003** | 1.471 / **0.022** |
| `R-soai-alkynyl` / `S-soai-alkynyl` (2003, >99.5%) | 10998886 / 10911429 | (1R)- / (1S)-1-[2-(3,3-dimethylbut-1-ynyl)pyrimidin-5-yl]-2-methylpropan-1-ol | R / S ✓ | S ✓ | 1.189 / **0.010** | 1.154 / 1.294 ⚠ |

Results:
- **Mirroring R gives S in every pair.** The local geometry around each stereocentre matches to ≤ 0.01 Å after mirroring, against about 1.2 Å without it. No proper rotation superimposes R on S.
- ⚠ **Soai alkynyl:** PubChem built the R and S conformers independently, so rotamers (tBu–alkyne, iPr, OH) differ and the whole-molecule fit is about 1.3 Å even though the stereocentre is an exact mirror.
- **Recommendation for the kit:** load **one** file per pair and draw the partner as `x → −x` of it. The mirror on screen is then exact by construction, and `must()` can assert it.
- Natural/drug identities:
  - (R)-(−)-carvone = spearmint; (S)-(+)-carvone = caraway/dill.
  - L-alanine = (S).
  - (R)-thalidomide = sedative; (S) = teratogenic, but they interconvert in vivo.
  - Pasteur's natural tartaric acid = L-(+) = (2R,3R).

### Using it in a solid-geometry-style kit
- The solid-geometry `camera({yaw,pitch,dist,target})` with `cam.P(p)` → `[sx, sy, depth]` works as is. Scale Å to world units (C–C 1.54 Å; `s = 1/1.5` puts a bond at about 1 unit).
- **Ball-and-stick painter:**
  1. Project every atom and sort by depth, far to near.
  2. Draw each bond as two half-sticks, each coloured like its atom, drawn just before the nearer atom of the pair.
  3. Draw each atom as a disc with radius ∝ `F/z` (perspective), a flat fill, a one-step rim shade and a small highlight offset toward the scene's light.
  4. This needs no WebGL and stays deterministic. Double bonds are two parallel sticks offset in the screen plane.
- **Hide H by default.** Show it only for CHFClBr and alanine (the textbook tetrahedron), where H is one of the four "colours".
- **Colours:** do not use CPK literally. Use the DNA pair. Groups on the stereocentre take the 4-group palette, and the rest of the skeleton stays neutral.
- **Tetrahedral demo:** CHFClBr (5 atoms) is the minimal model. Its PubChem conformer is a near-perfect tetrahedron, so the "rotate it every way, it never overlaps" sequence can use it directly.
- **Mirror demo:** draw the mirror plane at x = 0 in the world (a vertical sheet), put molecule A at x = −d and its mirror at x = +d with coordinates `[-x, y, z]`, then rotate the copy and show the overlap fail by counting mismatched colour positions in code.

---

## 2. Visual references and ideas

### What good explainers do
- **Nobel figures** (Johan Jarnestad, KVA 2026, in `web/`, reference only):
  - Fig 1: mascots dancing hand-in-hand **through** a black mirror on saturated blue, with their mirror twins.
  - Fig 2: L-/D-alanine ball-and-stick, side by side, as mirror twins, with "homochirality" = a row of three L amino acids.
  - Fig 4: Kagan's catalyst: left = **yellow**, right = **pink** tetrapods, metal "M" as a black disc, pies 75/25 → 56/38/6 → 90/10, and the LR dimer arrow crossed out in red.
  - Fig 5: the original 1986 JACS curve (convex curve above the diagonal).
  - Fig 6: the Soai reaction, with chance at the start deciding the winner.
  - Lesson: **one colour per hand, kept everywhere**; metaphors (keys/lock, dancers) sit next to the real ball-and-stick.
- **Nobel locksmith metaphor:** two mirror keys, one fits, the other can damage the lock. It works well for the drug section and is softer than imagery of victims.
- **Common practice in chemistry teaching** (RSC *Education in Chemistry*, OpenStax/LibreTexts §5.4 Pasteur, 3Blue1Brown-style math animation):
  - hands and gloves first, then the tetrahedron with 4 coloured balls;
  - "try to overlap": rotate one copy step by step and show the mismatch;
  - Pasteur's two crystals with the small facet on opposite sides;
  - a polarimeter as a light beam whose plane rotates;
  - 3B1B style: let the viewer predict, keep one object and transform it, keep graphs live with a moving point.
- **Not verified this session:** I could not find or check a Veritasium "mirror life" video or its visuals. Its topic (mirror bacteria, 2024–25 *Science* warning) is a good closing hook. Watch it before citing it.

### Concept → visual ideas (2D canvas + projected 3D)
**Hands and mirror; tetrahedral carbon**
1. Open with the mascot's two hands, palm to palm, against a vertical mirror line. Slide one hand onto the other: thumbs land on opposite sides, shown with a red ✗ at the thumb tip.
   - Then morph the hand into **CHFClBr**: the same 4 colours sit where the thumb and fingers were (H = palm, F/Cl/Br = three fingers).
2. **"The rotating attempt":** the mirrored copy turns through three hard-coded rotations (90° about each axis), each projected in 3D.
   - After each turn a 4-slot checklist shows how many groups land on the original's positions. The best it reaches is 2/4, and the code checks that no proper rotation gets 4/4.
   - End on "swap any two balls = the mirror". This is a deeper rule that is easy to show: two balls trade places in an arc.

**Pasteur's tweezers; polarimeter**
1. **Crystals as projected 3D solids** (same technique as the solid-geometry `convex()`). Hemihedral sodium ammonium tartrate is a prism with one small **extra facet** on one corner, on the left or right.
   - Model one crystal and mirror its vertices; the result is a guaranteed enantiomorph.
   - A pile of about 40 small crystals (positions from `hash(i)`) under a round microscope vignette. Tweezers pick them out one by one into two piles, and the extra facet glints in the hand's colour.
2. **Polarimeter:** a horizontal tube in light 3D projection.
   - A light beam from the left passes a polarizer slit, shown as a double-headed arrow (the E-field plane) drawn as a thin flat ribbon.
   - Inside the tube the ribbon **twists**: clockwise for one pile, counter-clockwise for the other, by the same angle. The angle is read on a circular dial at the end, e.g. "+12°" / "−12°".
   - Mixing both piles gives no twist and "0°". Use a **dial, not text**, so the image reads with the sound off.

**Carvone smell; amino acids and sugars; DNA**
1. Two carvone models face each other across the mirror. Above each, a flat illustrated sprig: a **mint leaf** (R) and a **caraway seed** (S). A wavy "smell" ribbon drifts to a stylised nose receptor drawn as a **socket shaped like a hand**: one fits, the other bumps.
2. "Life chose one side":
   - A strip of 20 amino-acid "beads", all one colour (L), next to a DNA double helix drawn as two projected 3D helical polylines.
   - The helix is right-handed: make the handedness readable with a **curled right hand** beside it (thumb along the axis, fingers along the strand).
   - Mirror the helix live (x → −x) to show a left-handed helix, then stamp "自然界にない" ("not found in nature") on it.
   - Keep the colour logic straight: amino acids = L colour, sugars = D colour. Show both, so "life uses BOTH hands, each molecule type consistently" is visible.

**Thalidomide (sensitive)**
1. **No images of affected people.** Use:
   - the FDA's **Kevadon 1960** bottle photo (public domain, see §4);
   - a calendar strip "1957 → 1961";
   - a counter of dots "≈10,000" drawn as small neutral dots that fill a field slowly, without dramatic music.
   - Optional: Frances Oldham Kelsey receiving the award from JFK (1962, PD). She kept it off the US market, which is a positive human angle.
2. **The in-body interconversion:**
   - The two thalidomide models sit either side of the mirror with the stereocentre H highlighted.
   - In a "体内" (in the body) panel, that H pops off, the stereocentre **flattens** to a planar (sp²) form, and the H returns from either face.
   - A balance needle drifts to 50/50 over a clock icon ("数時間" (several hours)).
   - Message: "even pure R becomes a mix in the body". This same flat-intermediate visual sets up the next concept.

**Racemic 50/50 through a flat intermediate**
1. A **planar** molecule (e.g. a flat carbonyl, drawn as a 3D sheet with the camera at a slight angle) and a reagent ball approaching from **above** or **below**.
   - 100 approaches, deterministic `hash(i) < 0.5`, each drops a coloured bead into a left or right jar. Jar counts tick toward 50 : 50, with the exact counts computed and checked.
   - Re-use the solid-geometry "sheet" for the plane.
2. Then put a **chiral catalyst** (a hand-shaped glove) on one face: approaches from that face get blocked, and the jars tilt.

**Kagan non-linear effect**
1. **The dance floor (literal Nobel metaphor in the user's text):**
   - Tetrapod "dancers" in two colours (75 : 25) pair up at random into RR / LR / LL pairs. Counts are computed: 56 / 38 / 6 of 100 pairs.
   - LR pairs **freeze** (grey, sitting on chairs at the edge, 足止め "held in place"). Only RR and LL dance, 56 : 6, about 90 : 10.
   - Pies morph 75/25 → 90/10. **Every number on screen comes from p², 2pq, q²** (`must()`).
2. **ee curve:**
   - Axes: catalyst ee (x) vs product ee (y).
   - A grey dashed diagonal = "常識" (the common assumption). The real curve is drawn live: model y = 2x/(1+x²) (ML₂ model, statistical binding, inactive heterodimer).
   - Check point: x = 0.5 → y = 0.8, matching the dance floor. A moving dot connects both views.
   - Overlay Kagan's 1986 data shape (Nobel fig 5) as small hand-drawn points, labelled with the year and journal.

**Soai autocatalysis; Frank model**
1. **Cobweb plot of the real data** (Soai 1995 Table 1, mixture ee per round): 2 → 10 → 57 → 81 → 88%.
   - Plot points (xₙ, xₙ₊₁) = (2,10), (10,57), (57,81), (81,88), plus the honest one (99,88).
   - Draw a smooth monotone map through them with a **fixed point ≈ 88–90%**. The staircase between the curve and the diagonal y = x climbs and stalls.
   - Then switch to the **2003 alkynyl** data, 0.00005 → 57 → 99 → >99.5 (needs a **log-ish x-axis** or an inset). The staircase now reaches the top-right corner. Seeing two maps side by side shows why 2003 counted as "solved".
2. **Iterated idealised map (teaching model, label it "MODEL"):**
   - e′ = 2e/(1+e²) gives 2 → 4 → 8 → 15.9 → 31 → 56.5 → 85.7 → 98.8 → 99.99%.
   - It is the **same curve as Kagan's**, so the video can say "Soai = Kagan's curve, applied to itself, again and again". It ties both laureates into one picture.
   - Visual: test tube n pours into test tube n+1, and a bead jar grows one-sided.
3. **Frank 1953 "paper dream":**
   - A typewritten sheet with the two rate laws dL/dt = kL − μLD and dD/dt = kD − μLD, plus a phase-plane sketch: the diagonal L = D is unstable and arrows flow away to the L or D axis.
   - The 3 conditions as tick boxes, ticked in later acts (Marckwald → Kagan 1986 → Soai 1995/2003).
   - For the "chance decides" beat (Nobel fig 6): several runs from ee ≈ 0. Each staircase leaves the fixed point 0 upward or downward. Sign = `hash(run) < 0.5`, deterministic, and both colours appear.

---

## 3. DNA options (mirror motif + left/right colour pair)
Constraints:
- Each video needs its own DNA. Avoid echoing ja/pi (藍 night sky and instruments), ja/2048 (wooden 盤), sudoku (stained glass) and solid-geometry (cream paper and one lamp).
- Fonts: Noto Sans JP (UI, labels) and Shippori Mincho (titles). Glyph check with fontTools:
  - Noto lacks ₂ ₃.
  - **Shippori lacks ⇌ ⇄ α ≠ ≈ ∝ ₂ ₃.** Put equations and arrows in Noto, or draw ⇌ as two half-arrows.
  - Plex Mono and Cormorant lack all CJK, ⇌ and α.

Contrast ratios (WCAG) were measured with code. The L/R pairs differ in **hue**, not luminance (ratios between pair members 1.3–1.6), so **side is always a second cue**: left molecule left of the mirror, always. That keeps it colour-blind safe.

### A. 「合わせ鏡」 Silvered glass, dark *(recommended)*
- **Core image:** the whole video happens on the two sides of one vertical **silvered mirror** standing on a dark lab bench.
  - Every object on the left has its twin on the right. When something cannot be superimposed, the mirror **cracks** a little.
  - The racemic world = a symmetric frame. Homochirality (finale) = the mirror lowers and only one side remains.
- **Running object:** the mascot's **hand print** on the glass. It becomes the tetrahedron, the crystal, the catalyst glove and finally the life-hand.
- **Palette:** bg graphite `#0E1424`, mirror sheen `#C9D2E0` (12.0:1), text `#EDE6D6` (14.8:1).
  - **左 amber `#F2A541` (8.9:1)** and **右 azure `#4BA3E3` (6.7:1)**: orange/blue is the safest colour-blind pair.
  - Neutral skeleton `#8A93A6` (6.0:1). Red ✗ only for "doesn't fit".
- **Text:** titles in Shippori Mincho appear **mirror-written first, then flip** to readable (a short scaleX −1 → 1). Labels in Noto Sans JP.
- **Transitions:** same ERA = the camera **slides through the mirror** (horizontal flip-wipe along the mirror line). Different ERA = the standard wipe from the mirror centre.
- **Cost:** projected 3D only for molecules and crystals. The mirror is a 2D gradient strip.

### B. 「パスツールの実験ノート」 Pasteur's notebook and microscope
- **Core image:** a 19th-century French lab notebook (squared paper, sepia ink) with a **round microscope field** as the "window" where 3D things happen.
  - The mirror is the **fold line of the notebook**: left page / right page are mirror pages, and a hinge-fold shows superposition.
- **Palette:** paper `#F3EEE3`, ink `#2A2522` (13.1:1), **左 indigo `#2B4C9B` (7.0:1)**, **右 madder `#B23A48` (5.1:1)**, brass `#8C6A2E` (4.3:1, large text only), grey `#6B6B6B`.
- **Text:** handwriting-like Shippori Mincho for notes; graphs pencilled in and inked over.
- **Risk:** close to solid-geometry's paper and to zero-div's notebook. It fits ACT 1 (Pasteur) better than the Soai/Kagan acts, and modern chemistry may feel museum-like.

### C. 「偏光」 Polarized light
- **Core image:** everything is **light passing through polarizers on black**. Chirality is the **twist of light**.
  - Each hand = one rotation sense of the light ribbon. The ee is how strongly the light twists (a dial).
  - The finale: the ribbon twists all the way.
- **Palette:** bg `#08090C`, **左 magenta `#E0569B` (5.7:1)**, **右 teal `#2EC4A6` (9.1:1)**, text `#F5F1E8` (17.7:1), gold `#FFD166` (13.8:1) for the Nobel/history accent.
  - Optional birefringence rainbows **only** at the crystal moments.
- **Risk:** it is beautiful but abstract. Dark plus glow fights legibility (MEDIUM.md §77 warning), and it sits close to sudoku's stained glass if the rainbow is overused.

Recommendation: **A as the base, borrowing B's notebook only inside the Pasteur act and C's twisting ribbon inside the polarimeter scene.** As in the existing ERA system, those become ERAs inside A: `mirror` (main), `notebook` (1848), `light` (polarimeter). Each change of ERA = the standard wipe from the mirror centre.

---

## 4. Historical images (Wikimedia Commons; nothing downloaded)

| subject | full file name (Commons) | licence | notes |
|---|---|---|---|
| Louis Pasteur (French chemist and microbiologist, 1822–1895) | `File:Louis Pasteur en 1857.jpg` | Public domain | Closest to his tartrate period (age 34). NLM portrait no. 5229.35 |
| | `File:Louis Pasteur-portrait à 21 ans.jpg` | Public domain | Age 21 (pastel by Charles Lebayle, reproduced 1905). Good for the "young 25-year-old" beat |
| | `File:Louis Pasteur, foto av Paul Nadar, Crisco edit.jpg` | Public domain | The classic restored Nadar studio portrait, 2388×3292 |
| | `File:Albert Edelfelt - Louis Pasteur - 1885.jpg` | Public domain | Painting of Pasteur in his laboratory |
| Lord Kelvin (William Thomson, 1st Baron Kelvin, British physicist, 1824–1907) | `File:Sir William Thomson, Baron Kelvin by T. & R. Annan & Sons.jpg` | Public domain | c.1900, National Galleries of Scotland, restored. Shows a marine azimuth **mirror** in his hand, a nice coincidence |
| | `File:Portrait of William Thomson, Baron Kelvin.jpg` | No restrictions (Smithsonian) | 1906 |
| Sir Frederick Charles Frank (British theoretical physicist, Bristol, 1911–1998) | **None on Commons.** The en.wikipedia image `File:Frederick_Charles_Frank_Bristol.jpeg` is **local, non-free (fair use)**, so it is not usable | — | Use DNA §8 "no free portrait": show his 1953 paper as a typed sheet instead |
| Henri B. Kagan (French chemist, b. 1930) | `File:Henri Kagan.jpg` (656×928) and `File:Henri Kagan (2014).jpg` (373×497) | **CC BY-SA 2.0** | École polytechnique (Flickr), JCO 2013 in honour of Kagan. Attribution "École polytechnique / CC BY-SA 2.0" is required. Also the group photo `File:Journées de Chimie Organique de la Société Chimique de France – JCO 2013 à l’Ecole Polytechnique (Palaiseau, France) en l’honneur du Professeur Henri Kagan (12610168484).jpg` (CC BY-SA 2.0) |
| Kenso Soai (Japanese chemist, b. 1950, Tokyo University of Science) | `File:Kenso Soai.jpg` | CC BY 4.0, Japan Academy (日本学士院) 2025 | **Only 100×135 px**, too small for full screen; usable only small, e.g. a stamp in a frame |
| | `File:Kensō Soai.jpg` (553×732) | claims **CC0, "own work" by User:Pegy22, uploaded 2026-10-07** (prize day) | ⚠ Suspicious: a press-quality portrait uploaded on announcement day as "own work" is a likely copyright violation. **Do not use** unless its provenance is confirmed |
| Pasteur's tartrate crystals | `File:Left ammonium tartrate crystals Musée Pasteur Créer le cristal.jpg` | CC BY 4.0, Marie-Lan Taÿ Pamart | **Real crystals from Pasteur's collection** (Sorbonne exhibition 2026), 3892×5834 |
| | `File:Sodium Ammonium Tartrate Crystals.svg` | CC BY-SA 4.0, GreatStellatedDodecahedron | Enantiomorphic pair redrawn from Pauling's *General Chemistry* fig. 6-7. Use it as **geometry reference for the 3D crystal model**, not as an image |
| | no file of Pasteur's **original 1848 drawings** found on Commons | — | They exist in OpenStax §5.4 and IUCr articles (not free to reuse). Draw our own from the model |
| Polarimeter | `File:Polarimeter-of-Laurent.jpg` | Public domain | Engraving, James Grant 1912 (*The Chemistry of Breadmaking*). Labelled parts, era-appropriate |
| | `File:Soleil saccharimeter-IMG 6954-black.jpg` | CC BY-SA 3.0 fr, Rama | 19th-c. Soleil saccharimeter, Palais de la Découverte, on a black background |
| | `File:Polarimeter Saccharimeter-UNIL 603.867-IMG 2052-black.jpg` | CC BY-SA 3.0 fr, Rama | museum object on black |
| Thalidomide history (non-graphic) | `File:Kevadon (thalidomide), 1960.jpg` | Public domain (U.S. FDA) | US trade name bottle, 1960, 7216×5412 |
| | `File:Frances Oldham Kelsey and John F. Kennedy.jpg` | Public domain | 7 Aug 1962, Kelsey receives the award for blocking US approval |
| | `File:President Signing the 1962 Drug Amendments.jpg` | Public domain (Abbie Rowe) | Kefauver–Harris amendments, the legacy beat |
| | `File:Talidomida.jpg` | CC BY-SA 4.0 | modern Brazilian box (the drug is still used for leprosy and myeloma). Optional |
| Soai reaction diagrams (reference only) | `File:Soai reaction scheme.png` (CC BY-SA 4.0), `File:Soai autocatalysis.png` (CC BY-SA 3.0) | — | Draw our own in the DNA |

Licence notes:
- **CC BY / CC BY-SA files need the author and licence in the YouTube description.** CC BY-SA on a still inside a video is generally treated as a collection, but attribute anyway.
- The **Nobel figures are © KVA** and must not go on screen. Use them only as reference.

---

## Sources
- [Nobel Prize in Chemistry 2026, popular information](https://www.nobelprize.org/prizes/chemistry/2026/popular-information/), [press release](https://nobelprize.org/prizes/chemistry/2026/press-release)
- [Al Jazeera, 2026-10-07](https://www.aljazeera.com/news/2026/10/7/henri-kagan-kenso-soai-win-chemistry-nobel-for-mirror-image-breakthrough)
- Soai et al., Bull. Chem. Soc. Jpn. 2011, 84, 879 ([PDF](https://www.rs.kagu.tus.ac.jp/soai/Bull.Chem.Soc.Jpn.2011.84.879.pdf)), Table 1, Figure 3
- [Autocatalytic models for the origin of biological homochirality (arXiv 1909.13015)](https://arxiv.org/pdf/1909.13015), Frank model
- [OpenStax Organic Chemistry §5.4 Pasteur's discovery of enantiomers](https://openstax.org/books/organic-chemistry/pages/5-4-pasteurs-discovery-of-enantiomers)
- PubChem PUG REST (CIDs in the table) and the Wikimedia Commons API (licence metadata via `extmetadata`)
