# Sine Was Never About Triangles

Narration script (English), v1 (2026-10-20). Written from the user's Vietnamese script (`SCRIPT.vi.md`), keeping its
seven parts and their order; the opening is rebuilt around the package chosen by the user (package A, "no triangle").
Fixes and additions: `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s); the English channel has no channel intro
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS

## Cold open

Type sine of one hundred and twenty degrees into any calculator, and it answers instantly: zero point eight six six.
But no right triangle has a one-hundred-and-twenty-degree angle. Not a single one.
Sine of minus thirty degrees? Minus one half. Sine of a thousand degrees? It answers that too.
Those numbers don't come from soh cah toa. They come from a single point, running around a circle.
And that circle, seen from the side, is hiding inside every wave: sound, light, even the power in your wall.

Trigonometry is more than two thousand years old, and for most of that time it was a tool for the sky, not for homework.
In this video, I want to follow it from the stars, to the circle, to the waves, and answer three questions with you.
One. Why does every angle come with its own fixed number, its sine?
Two. How can a calculator find the sine of an angle that no triangle can hold?
And three. Why does that same circle turn up inside every wave?

It all begins with a problem much older than any calculator: measuring something you can't reach.

# ACT ONE — Measuring the unreachable

## Too far to touch

How tall is that mountain? How far out is that ship? How far away is the Moon?
You can't stretch a tape measure to any of them.
But you can stand on the ground, measure a couple of angles and one distance, and work out the rest.
That need is what gave us trigonometry.

The name comes from two Greek words: trigonon, a triangle, and metron, a measure.
Trigonometry literally means measuring triangles.
The core idea is this. If you know enough about a triangle, say one side and two angles, then every other side and angle is already decided.
And since almost any shape can be cut into triangles, measuring triangles means measuring almost anything.

## Tables for the sky

The first people to lean hard on this tool were astronomers.
Hipparchus, a Greek astronomer who lived more than two thousand years ago, is usually credited with the first trigonometric table we know of.
His original is lost. We know it mostly through writers who came centuries later, like Ptolemy.
So from the very start, trigonometry was about the sky and enormous distances, not little triangles on a worksheet.

# ACT TWO — One number for every angle

## The same ratio, every time

Here's the step that most of us skipped in school.
Pick an angle, say thirty degrees. Build a right triangle with that angle, and divide the side opposite it by the longest side, the hypotenuse.
You get one half.
Now build another right triangle with the same thirty-degree angle, twice as big. Or ten times smaller.
Divide again. One half. Every single time.

The reason is that these triangles are similar. Same angles, same shape, only the size is different.
And when you scale a shape up or down, every ratio between its sides stays exactly the same.

## A number that belongs to the angle

So that ratio doesn't care which triangle you drew. It only depends on the angle.
Every angle carries its own fixed number. For thirty degrees, it's one half.
That number is what we call the sine of the angle.
In the same way, the cosine is the adjacent side over the hypotenuse, and the tangent is the opposite side over the adjacent one.
Three fixed numbers, attached to every angle.

And the name has a strange history.
Indian astronomers called it jya, the bowstring: the straight string stretched across a bent bow, like a chord across an arc of a circle.
Arabic scholars wrote the word as jiba, and since Arabic is written without vowels, later readers took it for jayb, a fold.
Latin translators turned that fold into sinus. And sinus became our sine.
Notice what that bowstring was. Not the side of a right triangle, but a chord, inside a circle.
Even Hipparchus's table, as far as we can tell, was a table of chords in a circle.

So here's the first answer. Every angle has one sine because similar triangles keep their ratios.
Which means sine isn't really a rule about triangles. It's a function: you give it an angle, and it gives you back one number.

# ACT THREE — Stuck below ninety

## Where the triangle runs out

But the triangle definition has a limit you hit very quickly.
In a right triangle, the other two angles are always between zero and ninety degrees.
So what is the sine of one hundred and twenty degrees? Of minus thirty degrees? Of an angle bigger than a full turn?
With opposite over hypotenuse, those questions don't even make sense. There is no right triangle with a one-hundred-and-twenty-degree angle.

You might think that's fine, since triangles are what trigonometry was made for.
But the world is full of angles like that. A wheel doesn't stop turning at ninety degrees. Anything that swings or spins passes through every angle there is.
If sine only worked from zero to ninety, it would be far too weak to describe any of it.
We need a definition that works for every angle at all. And the most natural one comes from a circle.

# ACT FOUR — The unit circle

## A circle of radius one

Draw a circle with a radius of one, centred where the two axes cross. It's called the unit circle.
Put a point on the circle, and measure its angle starting from the axis pointing right, turning counter-clockwise.
Now here is the new definition. The point's horizontal position, its x coordinate, is the cosine of the angle.
Its height, its y coordinate, is the sine.
Cosine tells you how far left or right the point is. Sine tells you how high or low.

## The old sine is still inside

First, let's check that nothing broke.
For an angle between zero and ninety, drop a line from the point straight down to the axis.
You get a right triangle, and its hypotenuse is the radius, which is one.
So opposite over hypotenuse is just the height divided by one. The old sine and the new sine are the same number.

## Every angle has an answer

Now let the point keep going.
At one hundred and twenty degrees, it's past the top, over on the left. Its height is zero point eight six six.
That's the number your calculator gave you.
At minus thirty degrees, you turn the other way, clockwise, and the point sits below the axis, at minus one half.
And a thousand degrees? That's two full turns, and two hundred and eighty degrees more.
The point lands low on the right, at about minus zero point nine eight five.
Big angles, negative angles, angles that wind around many times. Every one of them is just a point somewhere on the circle.

That's the second answer. Your calculator isn't looking for a triangle. It's finding a point on a circle.

# ACT FIVE — Why mathematicians measure in radians

## Three hundred and sixty is a choice

Degrees are so familiar that we forget they were a choice.
A full turn is three hundred and sixty degrees probably because of the Babylonians, who counted in sixties.
Three hundred and sixty splits neatly into halves, thirds, quarters, fifths, sixths and many more, which is handy.
But there's nothing special about it mathematically.

## Measuring with the circle itself

Radians measure an angle with the circle itself.
Take the length of the arc that the angle cuts out, and divide it by the radius.
A circle's circumference is two pi times its radius, so a full turn is two pi radians.
Half a turn, one hundred and eighty degrees, is pi. A quarter turn is pi over two.
On the unit circle, where the radius is one, the angle in radians is exactly the distance the point has travelled along the circle.
The angle and the distance become the same number.

## Cleaner formulas

That makes a lot of formulas cleaner.
The rate at which sine changes is exactly cosine. In calculus language, the derivative of sine is cosine.
But that's only true in radians. Measure in degrees, and an awkward extra factor, pi over one hundred and eighty, sneaks into every formula like it.
That's why mathematicians and scientists switch to radians, and stay there.

# ACT SIX — The circle becomes a wave

## Watching only the height

This is where trigonometry turns from geometry into the language of physics.
Picture a point running around the unit circle at a steady speed.
Now ignore everything except its height, the sine, and plot that height as time goes by.
The horizontal axis is the angle, which you can also read as time. The vertical axis is the sine.
What you get is a smooth line rising and falling. Up to one, down to minus one, and up again, forever.
That's the sine wave.
The cosine wave is exactly the same shape, just shifted by a quarter of a turn.

## A circle seen from the side

Here's what I most want you to keep.
That wave is circular motion, seen from the side.
Anything that turns steadily, viewed edge-on, moves back and forth in a sine wave.
A pendulum making small swings. A vibrating guitar string. The alternating current in your wall socket, turning fifty or sixty times every second.

That's the third answer. Sine and cosine turn up everywhere, because steady turning turns up everywhere.

# ACT SEVEN — The formulas are just the circle

## Sine squared plus cosine squared

Trigonometry has a reputation for endless formulas to memorise. But most of them fall straight out of the circle.
Take the famous one: sine squared plus cosine squared equals one.
On the unit circle, every point is at a distance of one from the centre. That's what a circle of radius one is.
By Pythagoras, that circle's equation is x squared plus y squared equals one.
Put cosine in place of x and sine in place of y, and there it is. Sine squared plus cosine squared equals one.
It's just the circle, written in the language of trigonometry.

## The rest of the list

The others work the same way.
Why does sine repeat every full turn? Because the point comes back to where it started.
Why is the sine of a negative angle minus the sine? Because turning the other way mirrors the point below the axis.
The addition and double-angle formulas come from turning a point twice in a row.
Keep the circle clear in your head, and the formulas stop being a list to memorise. They become things you can see.

# ACT EIGHT — Everything that repeats

## The key is rhythm

So how did a tool for solving triangles end up underneath modern science?
The key is repetition. So much of nature repeats in a rhythm.
Sound is air being pushed back and forth. Light and radio are oscillations of electric and magnetic fields.
Alternating current, the tides, the seasons coming round every year.
Anything that repeats steadily like that can be described with sine and cosine.

## Fourier

In the early eighteen hundreds, the French mathematician Joseph Fourier went much further.
He showed that almost any repeating pattern, however messy, can be built by adding up simple sine waves.
That one idea is inside your phone when it compresses music, inside an MRI scanner building a picture of your body, and inside the signals that carry your mobile data.
Trigonometry started out measuring the world. It ended up as the language of everything that turns and vibrates.

## Putting it together

Every angle has one fixed sine, because similar triangles keep their ratios.
Your calculator can answer sine of one hundred and twenty degrees, because sine is the height of a point on a circle, and every angle lands somewhere on it.
And that circle hides inside every wave, because a wave is steady turning, seen from the side.

## Next time

If you remember one thing from this video, let it be this picture.
A point running around a circle. Cosine is how far across, sine is how high, and the angle is the distance it has travelled.
Let it run, and sine and cosine ripple out into waves.
Next time you see a ripple, a swing, or a vibrating string, try to picture the circle turning behind it.
Thanks for watching all the way to the end. If you enjoyed this, leave a like and subscribe, so you don't miss the next one. See you then.

---

## Package first — written BEFORE the narration (user chose package A, 2026-10-20)

| | |
|---|---|
| Thumbnail | SHOWS: a big calculator display `sin 120° = 0.866` next to a right triangle stretched until its corner snaps (grey, cold) — words: 「HOW?」. Covered text still asks: a calculator answering something a triangle can't hold → type STRANGE. Mascot small, bottom-left, puzzled. Warm paper + one glowing number vs grey broken triangle |
| Title | SAYS the other half: **A "Sine Was Never About Triangles"** (30) · **B "What SOH-CAH-TOA Never Told You About Sine"** (42) |
| 0–5 s | the thumbnail in motion: at 0.5 s the calculator is already on screen, the keys type `sin 120°`, the display answers 0.866; the triangle beside it tries to open its angle to 120° and snaps. Caption 1 = "Type sine of 120 degrees into any calculator…", caption 2 = "But no right triangle has a 120° angle." |
| 0–30 s | four beats: **promise** (sin 120° = 0.866, no triangle) → **evidence** (sin −30°, sin 1000° answer too; more triangles snap) → **not X, it's Y** (SOH-CAH-TOA struck → a point running on a circle, its height lights 0.866) → **bigger promise** (the circle seen from the side unrolls into a wave: sound, light, the wall socket — the most beautiful shot, previewed 2–3 s). Then context ~15 s, three questions, a hanging line. No channel intro |

**Thumbnail ↔ title (PACKAGING §2a):** the thumbnail SHOWS the impossible answer; title A SAYS the reason in one claim
("never about triangles") — no shared key word (the thumbnail has no "triangle" / "sine" word, only HOW?). The proof
the title is true is in the video: the bowstring / chord history (ACT TWO) and the circle definition (ACT FOUR).
Thumbnail text A/B: **A 「HOW?」** · B 「120°?!」 · C 「IMPOSSIBLE?」.

**Ten titles, scored** (stop-thinking · extreme-but-true · big enough · ≤ 50 chars · reason to trust):
| # | title | chars | note |
|---|---|---|---|
| 1 ★ | Sine Was Never About Triangles | 30 | flat claim against what everyone was taught; true (jya = chord, Hipparchus = chords, unit circle) |
| 2 ★ | What SOH-CAH-TOA Never Told You About Sine | 42 | the phrase people search + a hidden secret; B for A/B (different mechanism: secret vs claim) |
| 3 | Your Calculator Knows sin 120°. No Triangle Does. | 49 | strong, but repeats the thumbnail's number |
| 4 | Every Wave Is a Circle in Disguise | 34 | true and beautiful, but the promise is the end of the video, not the hook |
| 5 | Sine Is a Circle, Not a Triangle | 32 | same as 1, weaker |
| 6 | The 2,000-Year-Old Secret Inside Sine and Cosine | 47 | reason to trust, vague promise |
| 7 | Why sin 120° Exists When No Triangle Can Hold It | 48 | explains too much |
| 8 | Trigonometry Was Never About Triangles | 38 | "trigonometry" = "measuring triangles" — less true |
| 9 | You Learned Sine Wrong | 22 | extreme, but no concrete gap |
| 10 | The Essence of Trigonometry | 27 | the original — a chapter name, the losing format (PACKAGING §1) |

## Cold open — what the viewer SEES

| line | the viewer SEES |
|---|---|
| Type sine of 120 degrees… 0.866 | 0.5 s: a big calculator (the thumbnail object) — keys press `sin` `1` `2` `0`, the display glows **0.866** |
| But no right triangle has a 120° angle | a right triangle beside it tries to widen its angle 60° → 90° → 120°; the corner snaps, the triangle greys out |
| Sine of −30°? −½. A thousand degrees? | two more lines on the calculator tape: `sin(−30°) = −0.5`, `sin 1000° = −0.985`; two more triangles fail (one flips upside down, one spins over itself) |
| Not from SOH-CAH-TOA… a point running around a circle | the words SOH-CAH-TOA struck; a circle draws itself, a point runs round it; at 120° a vertical bar from the point lights **0.866** — the calculator's number |
| That circle, seen from the side, is hiding inside every wave… | the camera turns the circle edge-on and its height unrolls into a sine wave across the screen; three icons ride the wave: a speaker, a light beam, a wall socket (most beautiful shot, ~3 s) |
| Trigonometry is more than two thousand years old… | a star map / Hipparchus image slides in; the wave becomes the horizon |
| One / Two / Three | three numbered cards: a 30° triangle family · the calculator · the wave |
| It all begins with… something you can't reach | a mountain, a ship, the Moon, far away; a dashed sight-line from the ground — cut to ACT ONE |

## What changed, and why

- **Opening:** the user's mnemonic opening ("Sin đi học, cos không hư" → SOH-CAH-TOA) was a lead-in about feeling
  lost. The new opening starts with the user's own Part 3 question (sin 120°), because "a familiar thing that seems
  impossible — why?" is the English channel's winning format (PACKAGING §1). SOH-CAH-TOA stays, as the "not X" beat.
- **Title:** "The Essence of Trigonometry" would be a chapter name (lost 3 times on this channel). The new title is a
  claim the video proves.
- **Added:** the history of the word "sine" (bowstring → chord → fold → sinus) — fun, and evidence for the title.
- **Fixed:** the degrees factor is named (π/180); cosine is shifted by exactly a quarter turn; pendulum = small swings.
- **Kept:** all seven parts in the user's order, the Fourier ending, the "one picture to remember" close.
- Expected length ~13 min (≈ 2,000 words at ~150 words per minute).
