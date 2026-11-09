# What Is Pi, Really?

Narration script (English), v1 — written in our own words from the material in `SCRIPT.vi.md` (the reference video's
narration), re-ordered and corrected per `CONTENT.md` (fact fixes 1–10; fills 1–8, user OK 2026-10-07).

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s), `[INTRO]` = the channel signature
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS

**Shape (docs/lesson/LESSON-VIDEO.md, "Học từ video mẫu số Pi"):**
- the promise names two or three questions; they go on screen as a numbered list, and each act answers one
- a misconception is said, then corrected ("You might think… It's actually…"); the picture strikes the wrong one
- an intuition that is not a proof says so out loud
- "Putting it together" gives each answer in one sentence, over the picture that first explained it
- the last idea is something the viewer can notice on their own, before the thanks and the channel board

## Cold open

Ask anyone why one plus one is two, and the answer comes straight away. One stone and another stone make two stones.
Now ask them why pi is three point one four. Why not two, or four, or seven?
Most people go quiet. The honest answer is usually, because that's what the calculator says.

You met pi in school, as the distance around a circle divided by the distance across it.
That definition is true. But it only tells you how to measure pi. It doesn't tell you what pi is.

So in this video, I want to answer three questions with you.
One. Why is pi three point one four, and not some other number?
Two. Why do its digits never end?
And three. Why, in a universe with a different geometry, would a circle give you a different number?

Here is the first strange thing. Nobody chose this number. No committee of mathematicians ever met and voted for three point one four.
Once you accept the basic rules of flat geometry, pi is forced on you. It could not be anything else.
And yet it is an ugly number. It isn't a fraction, and its digits run on forever without ever repeating.
If you were designing a universe, you would never pick something this messy as a basic constant. Ours picked it anyway.
So where does it come from? To find out, we have to go back more than two thousand years, to the first person who really caught it.

[INTRO]

# ACT ONE — Trapping the circle

## Measured, not explained

People knew pi roughly long before anyone could explain it, because they measured it.
Babylonian scribes usually just used three, and one clay tablet uses three and one eighth.
In Egypt, the Rhind papyrus, copied around sixteen fifty BC, finds the area of a round field in a way that works out to about three point one six.
These numbers were good enough for fields and granaries. But they were measurements, not reasons. Nobody could say why the number was what it was.

## The squeeze

The first person to go after the question systematically was Archimedes, in Syracuse, in the third century BC.
His problem is easy to state. You can't lay a straight ruler along a curve and read off its length.
But you can do this. Draw a polygon inside the circle. Its perimeter is a little shorter than the circle.
Then draw a polygon outside, hugging the circle. Its perimeter is a little longer.
So the circle, which you cannot measure directly, is trapped between two numbers that you can.

Archimedes started with hexagons, six sides each, and got a rough squeeze, somewhere between three and about three point four six.
Then he doubled the sides. Twelve. Twenty-four. Forty-eight. Ninety-six.
With every doubling, the polygons hug the circle a little tighter, and the gap between them shrinks.
At ninety-six sides, he proved that pi lies between three point one four zero eight and three point one four two nine.
That upper bound is twenty-two over seven, the very fraction many of us still use today.

## The idea that wouldn't die

The same idea was found again, independently, in China.
In the fifth century, Zu Chongzhi went all the way to a polygon with twelve thousand two hundred and eighty-eight sides, and pinned pi down to seven decimal places.
He also gave the fraction three hundred and fifty-five over one hundred and thirteen, which is right to six decimal places.
In Europe, Archimedes' squeeze stayed the method of choice for almost nineteen hundred years.
As late as sixteen ten, Ludolph van Ceulen was still doubling polygons, out to a shape with more than four quintillion sides, and he got thirty-five digits.
They were carved on his tombstone, and for a long time German speakers called pi the Ludolphine number.

## A limit

But the real gift of Archimedes isn't the digits. It's what his method shows pi to be.
Pi is the end of a process. It is where those polygons are heading as their sides grow without limit.
In other words, pi lives right on the border between straight and curved.
It is the price you pay to turn something with corners into something perfectly smooth.

# ACT TWO — Pi is about turning

## Not about circles

Now for the most important part.
In school, pi arrives as a fact about circles, so it's natural to think pi is about circles.
It isn't, really. Pi is about turning.
To see why, we need a unit of angle that most of us met once, briefly, and then forgot. The radian.

## Three hundred and sixty

We usually measure angles in degrees, and a full turn is three hundred and sixty of them.
But there's nothing mathematical about three hundred and sixty. Somebody chose it.
It most likely comes from Babylonian astronomy, which counted in sixties.
Three hundred and sixty can be divided evenly in twenty-four different ways, and it's close to the number of days in a year.
Very handy. But still, a convention.

## A unit nobody chose

A radian is different, because nobody had to pick a number.
Take a circle whose radius is one. Walk along its edge a distance of exactly one radius.
The angle you've swept out from the centre is one radian, a little over fifty-seven degrees. That's the whole definition.
And this is where pi steps in. A circle of radius one has a circumference of two pi.
So a full turn is two pi radians. Half a turn is pi. A quarter turn is pi over two.

So pi isn't some number that just happens to pop out when you measure circles.
Pi is how far you travel along the edge when you turn halfway round a circle of radius one. It is the natural measure of half a turn.
Some mathematicians even argue that the real constant should be the full turn, two pi, which they call tau.
Either way, it is a story about turning.

## The shadow of a turn

Look at pi this way, and it starts showing up in places with no circles at all.
Imagine a point running steadily around a circle, and look only at its shadow on a wall.
The shadow just slides up and down, up and down. Trace it out over time, and you get a wave. A sine wave.
That is exactly how a pendulum swings, at least for small swings, and it's why the formula for its period has a two pi in it.
A sound wave is air pressure rising and falling in that same rhythm.
And the alternating current in your walls is made by a coil spinning inside a generator.
Wherever something repeats, there is a hidden turn behind it, and pi comes along to measure it.
The circle is just the easiest picture of a turn to see. It isn't where pi comes from.

# ACT THREE — Why pi never ends

## A fraction has to repeat

Pi is irrational. That means you cannot write it as one whole number divided by another.
To see why that matters, look at what fractions do.
Divide one by three, and you get zero point three three three, repeating forever. A tiny bar over the three writes it down completely.
Divide one by seven, and you get one four two eight five seven, then one four two eight five seven again, and again.
That isn't luck. Each step of the division leaves a remainder, and unless the division comes out exactly, there are only six remainders it can be.
So within six steps, some remainder has to come back, and from that moment, the digits repeat.
Every fraction behaves like this. Its digits either stop, or they fall into a loop.
So if the digits of pi never stop and never loop, pi cannot be a fraction.

## Proved, not guessed

And they don't. This isn't a hunch. It's a theorem.
In seventeen sixty-one, the Swiss mathematician Johann Heinrich Lambert proved that pi is irrational.
More than a century later, in eighteen eighty-two, the German mathematician Ferdinand von Lindemann proved something even stronger. Pi is transcendental.
That means pi is not the solution of any polynomial equation with whole-number coefficients. No finite piece of algebra will ever pin it down.

## No shortcut

You might hope for a simple reason why a number born from a circle has to behave like this.
Honestly, there isn't a one-line one. The proofs are real, but subtle.
The shortest, by Ivan Niven in nineteen forty-seven, fits on a single page, but it needs calculus.
What we can show is what it costs.
The ancient Greeks asked a famous question. With only a compass and a straight edge, can you draw a square with exactly the same area as a circle?
For more than two thousand years, people tried. Lindemann's result finally settled it. It is impossible, because pi is transcendental.
So the endless digits aren't a flaw in the number. They are the reason one of the oldest problems in mathematics could never be solved.

# ACT FOUR — When the ratio isn't pi

## A circle on a ball

Here is something textbooks rarely mention.
Pi itself, the number, never changes. It is three point one four one five nine, and so on, forever.
But the ratio of a circle's circumference to its diameter only equals pi on a flat surface.
Imagine you are standing on a huge ball, like the Earth. You draw a circle the honest way, by walking the same distance from a centre point in every direction.
Now measure around that circle, and divide by its diameter, measured along the ground.
You get less than pi. Your diameter had to follow the curve of the ball, so it is longer than it would be on a flat floor, and the ratio shrinks.

Push it to the extreme. Put the centre at the North Pole, and let your circle be the equator.
The circumference is the whole equator. The diameter runs from the equator, over the pole, and down to the other side. That is half the equator.
So the ratio is exactly two.
And on a saddle, which curves the other way, the ratio comes out bigger than pi.

## Our universe

So the formula you learned, circumference equals pi times diameter, is only true in flat space. Not curving up, not curving down.
As far as our best measurements can tell, our universe is flat on the largest scales, to within a fraction of a percent. That's why the school formula works so well for everyday circles.
But Einstein's general relativity says that space near heavy objects does curve.
Draw a circle around a black hole, and the distance around it no longer matches pi times the distance across.
Pi didn't change. The world did.
Pi is the constant of flat geometry. When space bends, pi is still there as a number. It just stops describing the circles around you.

# ACT FIVE — Putting it together

## Putting it together

So, what is pi, really?
It is not just circumference over diameter. That's the easiest way to measure it, not what it is.
Pi is a limit. It's where the polygons end up as their sides multiply without end, the border between straight and curved.
Pi is the natural measure of turning. Half a turn, on a circle of radius one.
Pi is irrational, and transcendental. Lambert proved the first in seventeen sixty-one, Lindemann the second in eighteen eighty-two, and that is why no compass will ever square the circle.
And pi is the constant of flat space. Bend space, and circles stop obeying it.

Put it all together, and pi is what flat geometry has to say about turning.
Our universe is very nearly flat, which is why pi works so well here, and why it turns up in fields that seem to have nothing to do with circles. Statistics, quantum physics, probability, number theory.

## Next time

So the next time you see pi in a formula, try this.
There may be no circle anywhere in the problem.
The bell curve of statistics has a square root of pi inside it. Add one, plus a quarter, plus a ninth, plus a sixteenth, on forever, and you get pi squared over six.
But almost always, if you dig, there is a turn, a wave, or a circle hiding somewhere inside the calculation.

Thank you for watching all the way to the end.
If you'll never look at pi quite the same way again, subscribe to ninety-nine percent from scratch, so you don't miss the next one. See you soon.

---

## What changed, and why

- **Our own words, new order.** The material is the reference video's narration; every line here is rewritten. Its
  Part 1 became the cold open (hook "one plus one" first, numbered promise, hanging line); Parts 2–6 became Acts 1–5.
- **Fact fixes (CONTENT.md 1–10):** no pyramids; Egypt ≈ 3.16 (Rhind), Babylon 3 and 3⅛; "more than two thousand
  years"; Zu Chongzhi found the idea independently (12 288 sides, 355/113); "best in the West for centuries" → the
  squeeze lasted ~1 900 years (van Ceulen 1610); 360° "most likely" Babylonian; radian sentence rebuilt; pendulum =
  shadow of a turn (it does not rotate), AC from a spinning coil; the wrong irrationality "intuition" (curvature
  "changing evenly", reversed cause) replaced by why fractions must repeat (1/7, six remainders — a real proof) and an
  honest "no shortcut" (Niven 1947); squaring the circle is a consequence of transcendence, not its cause.
- **Fills:** van Ceulen; shadow → sine wave; 1/7; squaring the circle; equator around the North Pole (ratio 2); tau
  (two lines); bell curve √π and Basel π²/6 as "next time" examples; channel board ending.
- **Misconception beats for the picture:** "pi is about circles" (Act Two, struck → "turning"); "the digits never end
  because circles are infinitely curved" is NOT said at all (we don't plant a wrong idea we'd then have to strike).
