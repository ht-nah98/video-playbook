# One Number Tells You When Your Money Doubles

Narration script (English), v1 (2026-10-20). Written from the user's Vietnamese script (`SCRIPT.vi.md`), keeping its
five parts and their order; the opening is rebuilt around package A (the rule of 72), which was already the user's own
hook. Fixes and additions: `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s); the English channel has no channel intro
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS, each with a `spoken.json` row;
  letters read one by one are written lower-case with spaces ("p h") + a `spoken.json` row (LESSONS §128)
- length: words ÷ 190 = minutes (LESSONS §129)

## Cold open

At eight percent, one number tells you when your money doubles: seventy-two divided by eight — about nine years.

At six percent, twelve years. At twelve percent, six. At three percent, twenty-four.

The exact answer at eight percent is nine years and two days.

It is not a banker's superstition. It is a logarithm. So why does seventy-two work — and what is a logarithm, really?

Let's ask a power question backwards.

# ACT ONE — The question, backwards

## Forwards

Start with something familiar: multiplying again and again.
Begin at one. Multiply by two. Then by two again. Then by two once more. You land on eight.
We write that as two to the power of three equals eight. The three tells you how many times you multiplied by two.
A power answers a forward question. Start at one, multiply by two three times, where do you end up? At eight.

## Backwards

A logarithm asks the same question backwards.
You already know where you want to end up, at eight. How many times do you need to multiply by two to get there?
Three times. And we write that as the log, base two, of eight, equals three.
So a logarithm has two characters. The base is the brick you build with. The number inside is where you want to go.
And the answer, the logarithm itself, is how many bricks it takes.

## A few more

Let's try a few.
The log, base ten, of a thousand is three, because ten times ten times ten is a thousand.
The log, base three, of eighty-one is four, because four threes multiplied together make eighty-one.
The log, base five, of five is one. You only need a single five.

## Standing at the start

Here's a fun one. The log of one is always zero, whatever the base.
If you haven't multiplied at all, you're still standing at the starting line, and the starting line of multiplication is one.
And numbers smaller than one? The log, base two, of one eighth is minus three.
The minus sign means you divide by two three times, instead of multiplying.
So picture logarithms as a road, with one sitting at the origin. Walk towards bigger numbers and the log is positive. Walk towards smaller ones and it's negative.

# ACT TWO — Counting zeros

## How many zeros

Now try something small. Look at ten, a hundred, a thousand, ten thousand.
Their logs, base ten, are one, two, three and four. That's just the number of zeros after the one.
So the base ten log of a number tells you how big it is, in steps of ten.
A four-digit number, like five thousand, has a log between three and four. A ten-digit number has a log between nine and ten.

## An ant and a whale

That makes it easy to compare things of wildly different sizes.
An ant weighs a few milligrams. A blue whale can weigh well over a hundred tonnes.
Draw both on an ordinary ruler, and the ant simply vanishes.
But count steps of ten instead, and the gap between them is only about eleven steps.
Eleven is a lot easier to picture than a hundred billion.
And that's the heart of it. Logarithms shrink numbers that are enormous, or tiny, down to a size you can hold in your hand.

# ACT THREE — Multiplication becomes addition

## Adding up bricks

The most famous property of logarithms says that the log of a product is the sum of the logs.
If you think in bricks, it's almost obvious.
Take eight times four. Eight is three twos multiplied together. Four is two twos.
Multiply them, and you're just putting all the bricks in one pile: five twos in total.
The answer is thirty-two, and the log, base two, of thirty-two is five. Three plus two.
The bricks of a product are the bricks of its parts, added up.
And division becomes subtraction. Dividing by a number takes away exactly its bricks.

## 1614

That one property was worth a fortune.
In sixteen fourteen, the Scottish mathematician John Napier published the first work on logarithms.
There were no calculators. Astronomers and navigators multiplied huge numbers by hand, for hours, and every slip ruined the result.
Logarithms were a shortcut. Look up the log of each number in a printed table, add them, and look the sum up backwards.
A hard multiplication became an easy addition.
Within a few years, Henry Briggs had printed tables in base ten, and for the next three and a half centuries, scientists and engineers multiplied this way, with tables and slide rules.
The French mathematician Laplace is often quoted as saying that logarithms doubled the working life of astronomers.
We have calculators now, but the idea of turning multiplication into addition is still everywhere.

# ACT FOUR — Rulers that count powers

## Earthquakes

When something can range from tiny to enormous, we often measure it on a logarithmic scale.
Earthquakes are one. From Richter's original scale to the moment magnitude scale seismologists use today, they're logarithmic.
Each step up in magnitude means the ground shakes about ten times harder, and releases about thirty-two times more energy.
So a magnitude seven isn't a little stronger than a six. It releases about thirty-two times the energy.

## Decibels

Sound is another. We measure loudness in decibels.
Between the faintest sound you can hear and a sound loud enough to hurt, the intensity grows about a trillion times.
Decibels squeeze that whole range into numbers from zero to about one hundred and twenty.
Every ten decibels more means ten times the intensity.

## Lemons

A third is p h, the number you see on bottled water and garden soil.
It's built from the logarithm of how much hydrogen ion is in the liquid, with a minus sign in front.
Pure water has a p h of seven. Lemon juice is about two.
Those five steps mean lemon juice has about a hundred thousand times more hydrogen ions than pure water.

## Your own senses

And here's something curious. Our own senses seem to work a bit like logarithms.
Holding ten kilograms, add one more, and you feel it right away.
Holding a hundred kilograms, add one more, and you barely notice.
To feel the same difference, you'd need to add about ten.
We notice ratios, not differences. That's one reason scales like decibels match the way we actually hear.

# ACT FIVE — Where seventy-two comes from

## A strange base

You may have wondered why mathematics has a logarithm called natural, written l n, with a strange base of about two point seven one eight.
That number is called e.

## Interest on interest

To see where it comes from, think about growth.
In sixteen eighty-three, Jacob Bernoulli asked a question about exactly this.
Put one dollar in a bank that pays one hundred percent a year.
If the bank adds the interest once, at the end of the year, you have two dollars.
If it pays fifty percent twice a year, you have two dollars and twenty-five cents.
Monthly, daily, every hour? The total doesn't grow forever. It creeps up towards a limit, about two dollars and seventy-two cents.
That limit is e. It's how much something multiplies when it grows one hundred percent, continuously, for one unit of time.

## Doubling time

The natural log asks the question backwards. To multiply your money by some amount, how long do you have to wait?
The natural log of two is about zero point six nine three.
So growing continuously at one hundred percent, money doubles in about zero point six nine three of a year.
Grow at six percent instead, and it takes sixty-nine point three divided by six, about eleven and a half years. Any rate works the same way: sixty-nine point three, divided by the rate.

## Why 72, not 69.3

So why do bankers say seventy-two?
Partly because seventy-two divides so neatly, by two, three, four, six, eight, nine and twelve.
But there's a better reason. Banks add interest once a year, not continuously, and that slows the doubling down a little.
Around eight percent, that delay is exactly what pushes sixty-nine point three up to seventy-two.
That's why the rule hits nine years almost to the day.
It drifts at extreme rates, but for ordinary savings, it's remarkably good.

# ACT SIX — Putting it together

## Putting it together

A logarithm is a power, asked backwards: how many bricks does it take to reach a number?
It turns multiplication into addition, because the bricks of a product are the bricks of its parts, added together. That shortcut carried science for three and a half centuries.
And seventy-two is the natural log of two, nudged up for interest that's added once a year.

## Next time

Logarithms shrink the enormous and the tiny down to a size you can hold, and they turn hard multiplying into easy adding.
Next time you hear about a magnitude seven earthquake, or a sound of a hundred decibels, or a savings rate of six percent, try counting the bricks.
Thanks for watching all the way to the end. If you enjoyed this, leave a like and subscribe, so you don't miss the next one. See you then.

---

## Package first — written BEFORE the narration (user chose package A, 2026-10-20)

| | |
|---|---|
| Thumbnail | SHOWS: a short coin stack → a twice-as-tall stack, ×2, and a huge "72" — words: 「72」 only (+ small ×2). Covered text still asks: why does money double? Type RESULT ("how?"). Mascot small, bottom-left. Warm gold coins vs cool background |
| Title | SAYS the other half: **A "One Number Tells You When Your Money Doubles"** (44) · **B "Bankers Know This Number. It's a Logarithm."** (42) |
| Pair check | thumbnail word "72" / title A shares no key word (no "72", no "double" on the thumbnail — "×2" is a symbol); B names the number's secret without the number (LESSONS §125) |
| 0–5 s | the thumbnail in motion: at 0.5 s a coin stack with "$1,000" and an "8%" tag; the stack doubles as a year counter runs to 9. Caption 1 = "Put a thousand dollars in an account that pays eight percent a year. How long until it doubles?" |
| 0–30 s | four beats: **promise** (8% → 9 years, instantly) → **evidence** (6% → 12, 12% → 6, 3% → 24; 72 ÷ rate; real answer at 8% = 9 years 2 days) → **not X, it's Y** (not a banker's trick — a logarithm, 400 years old) → **bigger promise** (earthquakes, sound, lemons, ant and whale on one ruler — previewed 2–3 s). Then three questions, a hanging line. No channel intro |

**Ten titles, scored** (stop-thinking · extreme-but-true · big enough · ≤ 50 chars · reason to trust):
| # | title | chars | note |
|---|---|---|---|
| 1 ★ | One Number Tells You When Your Money Doubles | 44 | "one number… any money" is extreme and true (rule of 72); the gap: which number, and why |
| 2 ★ | Bankers Know This Number. It's a Logarithm. | 42 | B for A/B: a hidden number + the math behind it (different mechanism: secret vs claim) |
| 3 | Why 72? The Number That Doubles Your Money | 41 | repeats the thumbnail's 72 |
| 4 | The 400-Year-Old Math Inside Your Savings Account | 48 | reason to trust (400 years), weaker gap |
| 5 | An Ant and a Blue Whale Are Only 11 Steps Apart | 47 | great line — used in the body, not the package |
| 6 | Logarithms Explained With One Number: 72 | 40 | "explained" = chapter feel |
| 7 | How Bankers Do Exponential Math in Their Heads | 46 | vague |
| 8 | The Trick That Turned Multiplication Into Addition | 50 | true, but the hook is history, not the viewer |
| 9 | What a Logarithm Really Is | 26 | chapter name — the losing format |
| 10 | The Essence of Logarithms | 25 | the original — chapter name |

## Cold open — what the viewer SEES

| line | the viewer SEES |
|---|---|
| Put a thousand dollars… eight percent… doubles? | 0.5 s: a coin stack labelled $1,000 with an 8% tag; a ghost outline of a twice-as-tall stack beside it with "?" |
| Ask a banker… nine years | a year counter flips 1 → 9 while the stack grows into the ghost; "9 YEARS" stamps |
| Six percent? Twelve… Three? Twenty-four | three more stacks/rates race at once: 6% → 12, 12% → 6, 3% → 24 |
| seventy-two, divided by the interest rate | the big "72" (thumbnail number) drops in; "72 ÷ 8 = 9", "72 ÷ 6 = 12", … |
| at eight percent… nine years and two days | a calendar zooms to year 9 + 2 days; the exact curve meets the rule |
| not a banker's superstition… a logarithm, 400 years old | "TRICK" struck; "log" written; an old printed log table (1614 title page) slides under it |
| earthquakes, sound, a lemon… an ant and a blue whale on the same ruler | quick preview (~3 s): a seismograph, a decibel meter, a lemon on a p h strip, then an ant and a blue whale sliding onto one ruler of ×10 steps (most beautiful shot) |
| One / Two / Three | three numbered cards: bricks 2·2·2 → 8 · "×" turning into "+" · "72" |
| It all starts with a question… backwards | the 2·2·2 bricks stack up, then a reverse arrow — cut to ACT ONE |

## What changed, and why

- **Package:** "The Essence of Logarithms" would be a chapter name (the losing format). The user's own hook, the rule of
  72, became the package; its answer (ACT FIVE) is previewed with real numbers in the first 30 s.
- **Fixed:** "72 is 69.3 rounded up for easy mental math" is only half the reason. Banks compound yearly, not
  continuously, which adds about a third of a year; near 8 % that is exactly the gap from 69.3 to 72 (exact doubling at
  8 % = 9.006 years = 9 years 2 days). Plus 72's many divisors. The rule drifts at extreme rates.
- **Added:** Jacob Bernoulli's 1683 compound-interest question (where e comes from), Henry Briggs's base-10 tables and
  three and a half centuries of tables and slide rules, Laplace's line (as "often quoted"). Money in dollars.
- **Kept:** the five parts in order, the bricks image, the ant/whale, earthquakes / decibels / p h / senses, the close.
- Expected length: 1,543 words ÷ 190 ≈ 8.1 min + ~1 min of pauses and act cards ≈ 9 min (the Vietnamese timestamps said 10:45).
