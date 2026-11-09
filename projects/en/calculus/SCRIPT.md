# The Impossible Question That Created Calculus

Narration script (English), v1 (2026-10-21). Written from the user's Vietnamese script (`SCRIPT.vi.md`), keeping its
parts and their order (hill → secant → closer → tangent → limit and the hole → derivative → integral → two sides). The
sponsor segment is dropped; the two gaps in the source timeline (5:05–7:45, 9:05–10:17) are filled with the algebra of
2 + h, the derivative 2x, the speedometer, the rectangle sums and the fundamental theorem. Fixes and additions: `CONTENT.md`.
The user gave full autonomy (2026-10-21): package, script and DNA chosen by the director, reviewed at the end.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s); the English channel has no channel intro
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS, each with a `spoken.json` row
- length: words ÷ 190 = minutes (LESSONS §129)

## Cold open

How steep is a hill, at the exact spot where your foot is standing?
It sounds easy. We measure steepness as rise over run: how much higher you get, divided by how far across you go.
But for that, you need two points, a start and a finish. A single point has neither.
The rise is zero, the run is zero, and zero divided by zero means nothing at all.
For centuries, questions like this one were genuinely impossible. Trying to answer them is how calculus was born.
And here's the twist. The answer isn't nothing. Shape the hill like the curve y equals x squared, stand where x is one, and the steepness there is exactly two.
Not roughly two. Exactly two.
Run the same idea backwards, and it adds up infinitely many slices, each one infinitely thin, into an exact area. Archimedes was already doing a version of that more than two thousand years ago.

So in this video, I want to answer three questions with you.
One. How can a single point have a steepness?
Two. What is a limit, and how does it squeeze an answer out of zero over zero?
And three. Why are slopes and areas, derivatives and integrals, really two sides of the same coin?

Let's begin with the one thing we already know how to measure: the slope between two points.

# ACT ONE — Two points

## A bowl

Take a curve you've probably met before: y equals x squared.
It's shaped like a bowl, sitting the right way up. It comes down, flattens out at the bottom, and climbs again.
Our walker stands on the right-hand side, at the point where x is one. One squared is one, so the point is one, one.
And that's our question. How steep is the curve, right here?

## The secant

We don't know how to handle a single point yet, so let's cheat, and take a second one, where x is two. Two squared is four.
Join the two points with a straight line. A line that cuts through two points of a curve like this is called a secant.
Its steepness is easy. From one to two, the curve rises from one to four, so the rise is three, and the run is one.
Three divided by one. The secant has a slope of three.

## An average

But three isn't our answer.
It's the average steepness of the whole stretch from one to two, and along that stretch the curve keeps getting steeper.
So that three has some of the steep part, far up the slope, mixed into it.
To get rid of it, we need a shorter stretch.

# ACT TWO — Closer and closer

## Sliding in

So let's slide the second point back towards the first.
At x equals one point five, y is two point two five. The rise is one point two five, the run is a half, and the slope is two point five.
Closer. At one point one, y is one point two one. The rise is zero point two one, the run is zero point one. The slope is two point one.
Closer still. At one point zero one, the slope is two point zero one.
And at one point zero zero one, it's two point zero zero one.

## Lining up

Look at the numbers lining up: three, two point five, two point one, two point zero one, two point zero zero one.
They're closing in on two. Every step gets closer, and not one of them goes past it.

## The line turns

On the picture, you can watch it happen.
Each time the second point slides in, the secant turns a little, around the point at x equals one.
It turns less and less each time, and it settles at one particular angle.

## The tangent

The line it settles on is special. It touches the curve at exactly one point, like a ruler laid gently against the outside of a bowl.
It's called the tangent.
And the slope of the tangent is what we were looking for all along: the steepness of the curve at that single point.
But notice what we never did. We never put the second point right on top of the first. If we had, we'd be back at zero over zero.
We only asked where the slopes were heading.

# ACT THREE — The hole

## Where it's heading

That idea, asking where something is heading instead of what it is at one exact spot, is called a limit.
Here's a cleaner example, so you can feel it.
Take x squared minus twenty-five, divided by x minus five.
Put in five, and the top is twenty-five minus twenty-five, which is zero. The bottom is five minus five, also zero. Zero over zero, again.
At x equals five, this expression simply has no value.

## Sneaking up

But nothing stops us from trying numbers near five.
At four point nine, it gives nine point nine. At four point nine nine, nine point nine nine.
From the other side, five point one gives ten point one, and five point zero one gives ten point zero one.
From the left or from the right, the answers close in on ten.
So we say that the limit of this expression, as x approaches five, is ten.

## A hole in the line

Draw it, and you get a straight line, with a single hole punched out of it at x equals five.
Everywhere else, the expression is just x plus five. Only at five itself is there nothing there.
And that hole is the whole spirit of a limit.
A limit doesn't care what happens at the hole. It only cares what happens around it, as you creep closer and closer.

# ACT FOUR — The derivative

## Back to the bowl

Now the slope at a single point isn't stuck anymore.
Call the gap between our two points h. The second point sits at one plus h.
The rise is one plus h, squared, minus one. Multiply it out, and that's two h plus h squared.
Divide by the run, which is h, and the slope of the secant is simply two plus h.
Check it. When h was a tenth, we got two point one. When h was a hundredth, two point zero one.
We never set h to zero. We only let it shrink towards zero, and two plus h heads straight for two.

## Every point at once

Do the same at any point x, and the secant's slope comes out as two x plus h. Let h shrink, and you're left with two x.
That's the slope of the bowl at every point at once. At x equals one, it's two. At x equals three, it's six. At the very bottom, at zero, it's zero: perfectly flat.
This new function, the slope at every point, is called the derivative. The derivative of x squared is two x.

## The speedometer

And the derivative isn't only about hills.
Swap height for distance, and the run for time, and the slope becomes speed.
Your car's speedometer shows a derivative. Not your average speed over the whole trip, but how fast you're going right now, at a single instant.
In the sixteen sixties and seventies, Isaac Newton in England and Gottfried Leibniz in Germany each turned this idea into a complete method. Leibniz published his first, in sixteen eighty-four.
The derivative takes a change apart, so you can see each instant clearly.

# ACT FIVE — Adding up thin slices

## The area under the bowl

Integrals use the same idea of cutting things small, but in the opposite direction: adding up countless small pieces to see the whole.
Take the area under our bowl, from zero to one.
There's no simple formula for a curved shape like this. But there is one for rectangles.

## Four strips

So cut the area into four strips, and give each one a rectangle that reaches the curve at its right edge.
Add them up, and you get about zero point four seven. That's too much, because every rectangle sticks out above the curve.
Let the rectangles reach the curve at their left edge instead, and you get about zero point two two. Too little.
The true area is trapped somewhere in between.

## Thinner and thinner

Now make the strips thinner. With ten of them, the two answers are zero point two eight five and zero point three eight five.
With a hundred, zero point three two eight and zero point three three eight. With a thousand, they agree to two decimal places.
The overhang shrinks every time. In fact, the gap between the two answers is exactly one divided by the number of strips.
So as the strips get thinner and thinner, both answers are squeezed onto a single number: one third.
That number, the limit of the sums as the width of the strips shrinks to zero, is the integral.

## Archimedes

This isn't a modern trick.
More than two thousand years ago, Archimedes found the area of a curved piece of a parabola by filling it with smaller and smaller shapes, and trapping the answer from both sides, in the same spirit as this.

# ACT SIX — Two sides of one coin

## The growing area

So derivatives cut a change into instants, and integrals add slices back into a whole. Here's the surprise: each one undoes the other.
Let the area start at zero and stretch out to some point x, and watch how fast it grows.
Push x a tiny bit further, by h, and the area gains one more thin slice.
That slice is almost a rectangle. Its width is h, and its height is the height of the curve.
So the extra area, divided by h, is just the height of the curve, and as h shrinks, that becomes exact.
The rate at which the area grows is the curve itself.

## Check it

For our bowl, the area from zero to x turns out to be x cubed over three. At x equals one, that's the one third we just found.
And the derivative of x cubed over three is x squared, the very bowl we started with.

## The car, again

Your car knows this too.
The speedometer shows the derivative of the distance. The odometer adds the speed up, moment by moment, into a distance. That's an integral.
Newton and Leibniz both saw this connection. Today it's called the fundamental theorem of calculus.

# ACT SEVEN — Putting it together

## Putting it together

A single point has a steepness because we never measure at the point. We watch the slopes of shorter and shorter secants, and see where they're heading.
Where they're heading is a limit. It doesn't care about the hole at zero over zero, only about what happens around it.
And derivatives and integrals are two sides of one idea. One cuts a change into instants. The other adds the instants back into a whole.

## Next time

Next time you're walking up a hill and it starts to feel harder, that's a derivative you're feeling, in your legs.
And next time your eyes drift from the speedometer to the odometer, you're looking at both sides of calculus at once.
Thanks for watching all the way to the end. If you enjoyed this, leave a like and subscribe, so you don't miss the next one. See you then.

---

## Package first — written BEFORE the narration (director's choice under full autonomy, 2026-10-21)

| | |
|---|---|
| Thumbnail | SHOWS: a bowl-shaped curve with ONE glowing point, a ruler (the tangent) laid against it, a faint fan of secants collapsing into it — words: 「0 ÷ 0 = 2?」 only. Covered text still asks: a ruler touching a curve at one point — how steep is it there? Type STRANGE ("wait, what?" — the English channel's strongest, cf. "2^√2 = ?"). Mascot small, bottom-left, looking up the slope. Warm point + ruler vs cool background |
| Title | SAYS the other half: **A "The Impossible Question That Created Calculus"** (45) · **B "How Steep Is a Hill at One Single Point?"** (40) |
| Pair check | thumbnail words "0 ÷ 0 = 2?" / title A shares no key word (no "zero", no "calculus" on the thumbnail); B asks the question in words the thumbnail only shows (LESSONS §125). Two mechanisms: A = claim + history, B = concrete question |
| 0–5 s | the thumbnail in motion: at 0.5 s the hill/bowl with the walker's foot on one glowing point, the ruler hovering; caption 1 = "How steep is a hill, at the exact spot where your foot is standing?" |
| 0–30 s | four beats: **promise** (steepness at one point) → **evidence** (rise over run needs two points; at one point 0 ÷ 0 — nothing) → **not X, it's Y** (not "nothing": on y = x² at x = 1 it's EXACTLY 2; secant slopes 3 → 2.5 → 2.1 → 2.01 flash past) → **bigger promise** (run backwards: infinitely thin slices → exact area; Archimedes 2,000+ years ago). Then three questions, a hanging line. No channel intro |

**Ten titles, scored** (stop-thinking · extreme-but-true · big enough · ≤ 50 chars · reason to trust):
| # | title | chars | note |
|---|---|---|---|
| 1 ★ | The Impossible Question That Created Calculus | 45 | "impossible" is true (0 ÷ 0, a point has no rise or run); history = reason to trust; the gap: which question, and how was it answered |
| 2 ★ | How Steep Is a Hill at One Single Point? | 40 | B for A/B: a concrete question anyone can picture (different mechanism) |
| 3 | 0 ÷ 0 = 2? The Idea Behind All of Calculus | 41 | repeats the thumbnail |
| 4 | A Point Has No Slope. Calculus Finds It Anyway. | 47 | strong, but "slope" is the chapter word |
| 5 | Derivatives and Integrals Are the Same Idea | 43 | true and surprising, but needs the viewer to know both words |
| 6 | The 2,000-Year-Old Trick Inside Every Integral | 46 | reason to trust, but only the second half of the video |
| 7 | Your Speedometer Is Doing Calculus | 34 | fun, too small for 10 minutes |
| 8 | What Calculus Really Is, Without the Formulas | 45 | "really is" = chapter feel |
| 9 | The Essence of Derivatives and Integrals | 40 | the original — chapter name (the losing format) |
| 10 | Calculus Explained Visually | 27 | chapter name |

## Cold open — what the viewer SEES

| line | the viewer SEES |
|---|---|
| How steep is a hill… where your foot is standing? | 0.5 s: the hill (the bowl's right side), the walker small at the foot, ONE glowing point under the foot, a ruler hovering at the point (thumbnail world) |
| rise over run | a stair-step triangle between two points: RISE (vertical), RUN (horizontal), "RISE ÷ RUN" |
| two points… a single point has neither | the two points slide together into one; the triangle shrinks to nothing |
| zero divided by zero means nothing | "0 ÷ 0" with "= ?" — the glyph cracks / greys |
| For centuries… calculus was born | a quick strip of old pages (Leibniz 1684) behind the bowl |
| The answer isn't nothing… exactly two | the curve labelled y = x², point (1, 1); secants flash 3 → 2.5 → 2.1 → 2.01, the ruler settles; "= 2" stamps (the thumbnail's 0 ÷ 0 = 2?) |
| Not roughly two. Exactly two. | "≈ 2" struck, "= 2" stays |
| Run the same idea backwards… exact area. Archimedes… | the area under the bowl fills with thin strips that multiply (4 → 10 → 100); "⅓" (most beautiful shot preview ~3 s); Archimedes portrait corner |
| One / Two / Three | three numbered cards: a point with a ruler · "0/0" with a hole · a coin with slope on one face and strips on the other |
| Let's begin… two points | two points on the bowl join with a line — cut to ACT ONE |

## What changed, and why

- **Package:** "Bản chất của đạo hàm và tích phân" (The Essence of Derivatives and Integrals) is a chapter name, the
  losing format on the English channel. The source's own "impossible" line (a single point has no start and no finish)
  went to 0:00, and the answer that makes it surprising (exactly 2) is said inside the first 30 s.
- **Dropped:** the Odoo / TikTok Shop sponsor segment (1:05–1:57 of the source) and the "many students feel lost" aside.
- **Filled the gaps** in the source timeline (5:05–7:45 and 9:05–10:17 were missing): the secant slope as 2 + h, the
  derivative 2x (x = 1 → 2, x = 3 → 6, bottom flat), the speedometer, Newton and Leibniz (1660s–70s; Leibniz published
  1684), the four-strip upper and lower sums (0.47 / 0.22), 10 / 100 / 1000 strips, gap = 1/n, ⅓, Archimedes, and the
  fundamental theorem (the area grows at the rate of the curve's height; x³/3 → x²; speedometer ↔ odometer). The
  source's conclusion says "two sides of the same problem" without showing why — ACT SIX shows it.
- **Kept:** the hill, the bowl y = x², the point (1, 1), the secant 3, 2.5 / 2.1 / 2.01 / 2.001, the turning secant,
  the ruler against the bowl, the limit example (x² − 25)/(x − 5) with 4.9 / 4.99 / 5.1 / 5.01 → 10, the hole, "cut
  small to see each instant / add up to see the whole".
- Expected length: see CONTENT (words ÷ 190 + pauses).
