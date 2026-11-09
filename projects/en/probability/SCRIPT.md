# How to Solve Any Probability Problem — A 1654 Bet

Narration script (English), v1 draft — from the user's request (`SCRIPT.vi.md`) and the research in
`docs/study/09-probability.md`; every number and date is in `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s), `[INTRO]` = the channel signature
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS — and each one gets a row in
  `spoken.json` (spoken → written) before publish
- length: narration words ÷ 190 = minutes (Atlas voice)

## Cold open

In sixteen fifty-four, a French gambler made two bets he was sure were exactly the same, and only one of them was a good bet.
The mistake behind it is one you have almost certainly made yourself.

The first bet: roll one die four times. You win if a six shows up at least once.
The second bet: roll two dice twenty-four times. You win if a double six shows up at least once.

His reasoning sounded perfect. A six comes up one time in six, and four rolls is four sixths, so two thirds.
A double six comes up one time in thirty-six, and twenty-four rolls is twenty-four thirty-sixths. Two thirds again.

So let us play ten thousand games of each and watch.
The first bet wins fifty-one point eight percent of the time. The second wins only forty-nine point one.
One makes money, and the other slowly loses it.

That is not bad luck, and it is not a rounding error. He was counting the wrong thing.

His complaint reached Blaise Pascal, who wrote about it to Pierre de Fermat, and the letters they exchanged that summer are where the mathematics of probability begins.

By the end of this video you will be able to settle both of his bets in one line each.
And you will have five moves that take apart almost any probability problem, including the ones on an exam.

Three questions get us there.
What is a probability, really? Why does our instinct count the wrong thing? And how do you solve a probability problem without guessing?

The answer to the first one fits on a single die.

# ACT ONE — A probability is a count

## Part of the whole

Roll one die. Before it lands, write down everything that could happen: one, two, three, four, five, six.
That list is called the sample space, and the whole subject rests on it.

Now pick the thing you care about, say rolling a six. That is one item out of the list of six.
So the probability is one out of six. The part, divided by the whole.

Rolling an even number is three items out of six, so one half.
Something that cannot happen, like rolling a seven, is none of the list, which is zero.
Something that must happen, like rolling a number from one to six, is the whole list, which is one.

So every probability lives on a line from zero to one, and that is not a rule someone decided.
A part can never be bigger than the whole, or smaller than nothing.

## The condition everyone forgets

There is one condition hiding in that division, and almost every mistake in probability breaks it.
The items in the list have to be equally likely.

Roll two dice and add them. The totals run from two to twelve, which is eleven different answers.
So is a total of seven one chance in eleven?

It is tempting, and it is wrong. Eleven is a list of answers, not a list of equally likely outcomes.

Paint one die red and the other blue. The red die can land six ways, and for each of those the blue die can land six ways.
That is a grid of thirty-six squares, and every square is exactly as likely as every other one.

Now look for the sevens. One and six, two and five, three and four, and each of those the other way round.
Six squares out of thirty-six, so one in six.

And a total of twelve? Only one square, six and six. One in thirty-six.
Seven is six times as likely as twelve, even though both were just one item on the list of totals.

Researchers who study how people learn probability have a name for this: the equiprobability bias, treating every answer as if it were equally likely.
It is the most common mistake students make, and one study found that more statistics classes did not cure it. It got stronger.

So here is the first answer, in one line.
A probability is a count of what you want, divided by a count of everything that could happen, and both counts have to be made of equally likely pieces.

# ACT TWO — Why instinct counts the wrong thing

## The gambler's rule

Now we can look at the gambler's rule with fresh eyes.
One roll gives a six with probability one sixth. He said four rolls give four times that, four sixths.

Let us test the rule where it cannot hide. What about seven rolls?
Seven times one sixth is seven sixths, more than one. A probability bigger than certain.

The rule breaks the line from zero to one, so it was never right, even when it happened to sound close.

## Where the extra comes from

Here is what adding does wrong. Adding one sixth for each roll counts every roll where a six appears.
But a game with a six on the first roll and another six on the third roll gets counted twice.
Adding works only when the cases cannot happen together, and sixes on different rolls can.

So counting what we want directly is messy. A six on the first roll, or the second, or both, or three of them.
Let us count the opposite instead.

## Count what you do not want

The opposite of "at least one six" is "no six at all", and that is one single, clean case.
One roll misses the six with probability five sixths.

Four rolls all miss when the first misses, and the second, and the third, and the fourth.
Each roll does not care about the others, so the chances multiply: five sixths, four times over.

That is six hundred twenty-five out of one thousand two hundred ninety-six.
So at least one six is everything else: six hundred seventy-one out of one thousand two hundred ninety-six, fifty-one point eight percent.

Those two numbers, six hundred seventy-one and six hundred twenty-five, are written in Pascal's own letter to Fermat, dated the twenty-ninth of July, sixteen fifty-four.
The first bet really was a good bet.

## The second bet

Now the double six, with exactly the same move.
One roll of two dice misses the double six in thirty-five squares out of thirty-six.

Twenty-four rolls all miss with probability thirty-five thirty-sixths, multiplied by itself twenty-four times.
That comes out just over a half, fifty point nine percent.

So at least one double six is forty-nine point one percent. Just under even. A bet that loses, slowly.
Add one more roll, twenty-five instead of twenty-four, and it crosses to fifty point six.

According to Pascal's letter, the gambler was so upset that he declared arithmetic had contradicted itself.
It had not. His adding rule had.

One honest note. Historians doubt he could have felt the difference just by playing.
To be fairly sure that forty-nine point one is not fifty, you would need around thirteen thousand games.
What we know for certain is the reasoning, because Pascal wrote it down.

## Why our instinct does this

So that is the second answer.
Our instinct counts answers instead of equally likely outcomes, and it adds chances that can happen together.

Both mistakes feel natural because the wrong number is often close to the right one.
Four sixths is sixty-seven percent, the truth is fifty-two. Close enough to believe, wrong enough to lose money.

# ACT THREE — Five moves for any probability problem

## Move one: list equally likely outcomes

So how do you solve a probability problem without guessing?
Pascal and Fermat had no formulas to look up. They had counting, and five moves cover almost everything you will meet.

Move one. Before you calculate anything, draw the list.
A grid when there are two things at once, like two dice. A tree when things happen one after another.
Then ask the question the gambler never asked: are these outcomes equally likely?

## Move two: "at least one" means count the opposite

Move two. Whenever a question says "at least one", count "none" instead and subtract from one.
"At least one" spreads over many cases. "None" is one case.

Three coins, at least one head? There is exactly one way to get no heads, tails three times, one in eight.
So the answer is seven in eight, without listing the other seven.

## Move three: "and" multiplies, "or" adds

Move three. Walk down the tree. "And" means multiply along a path. "Or" means add separate paths, but only if they cannot both happen.

A bag holds three red marbles and two blue. Draw two without putting the first back. What is the chance both are red?
The first is red three times in five. Now the bag holds two red out of four, so the second is red two times in four.
Red and then red: three fifths times two quarters, three tenths.

Notice the second branch changed, because the first marble left the bag. The tree shows that. A formula you half-remember does not.

## Move four: turn percentages into people

Move four. When the numbers are percentages, turn them into people.

A test for a rare disease is ninety-nine percent accurate, and one person in a thousand has the disease. You test positive. How worried should you be?
Most people say ninety-nine percent.

Imagine a thousand people. One of them is sick, and the test catches them.
Of the nine hundred ninety-nine who are healthy, one percent still test positive. That is about ten people.
So eleven people test positive, and only one of them is sick. About nine percent, not ninety-nine.

Psychologists have measured this. The same question, asked in people instead of percentages, gets the right answer far more often.

## Move five: check the answer

Move five. Check before you trust it.
The answer has to sit between zero and one. All the branches leaving one point of a tree must add up to one.
And make a rough guess first. If the calculation lands far from your guess, one of them is telling you something.

The seven-sixths answer would have failed this check in one second.

# ACT FOUR — Putting it together

## Putting it together

A probability is a count of what you want over a count of everything that could happen, made of equally likely pieces.
Our instinct goes wrong by counting answers instead of outcomes, and by adding chances that overlap.
And five moves fix that: list, flip "at least one", multiply along "and", turn percentages into people, and check.

With those, the gambler's two bets take one line each.
One minus five sixths to the fourth: fifty-one point eight. One minus thirty-five thirty-sixths to the twenty-fourth: forty-nine point one.

## Next time

Here is one to try on your own. In a room of twenty-three people, what is the chance that two of them share a birthday?
Use move two. The answer is just over half.

But Pascal and Fermat left one question open, and it is stranger than it sounds.
When we say a coin is fifty percent heads, what is that fifty percent actually describing? The coin, or you?
That is the next video, and it is waiting for you right here.

Thanks for watching, and I will see you there.

---

## Package first — write these four BEFORE the narration

| | |
|---|---|
| Thumbnail | SHOWS: two betting tables side by side on green felt. Left: ONE die, "×4", big green **51.8%**. Right: TWO dice, "×24", big red **49.1%**. Between them a small "=" being crossed out. Words: **"SAME ODDS?"** (2 words). Mascot small at lower left, looking at the red number. Covered text still asks: why does the left win and the right lose? |
| Title | 3 options below (scored); working title "The Bet That Invented Probability" |
| 0–5 s | the two tables are already on screen at 0.5 s, dice rolling; caption 1 = "In 1654, a French gambler made two bets he was sure were exactly the same" |
| Pair check | thumbnail words SAME / ODDS / numbers — titles below share none of them |
| 0–30 s | promise (two bets, one mistake you make too) → evidence (his "two thirds = two thirds", 10,000 simulated games 51.8 vs 49.1) → "not bad luck — he counted the wrong thing" → bigger promise (Pascal–Fermat; settle both bets in one line; five moves for any problem, exams). Three questions, Act One by ~1:15 |

**Title drafts (≤ 55 chars, criterion 6 "what the viewer gets / gets wrong", "you"):**

| # | title | chars | note |
|---|---|---|---|
| A | The Probability Mistake You Make Too (Since 1654) | 49 | "you" + misconception + history as reason to trust |
| B | How to Solve Any Probability Problem — A 1654 Bet | 49 | search phrase "solve probability problem" + promise; story second |
| C | The Bet That Invented Probability | 33 | story first — the losing pattern (CTR 1.24% "How Humans Invented Math…") |

**User 2026-10-23: script v1 approved; title B is the main title.** A = the Test & Compare second title (different
mechanism: misconception vs how-to).

## Cold open — what the viewer SEES

| line | the viewer SEES |
|---|---|
| In 1654… two bets | two felt tables, dice already rolling; the stick-figure gambler in a 17th-century hat between them |
| mistake you have made | the gambler turns and points at the viewer |
| first bet / second bet | left table: one die rolls 4 times, a six lands on roll 3 — coin slides to him; right table: two dice, a counter 1…24 |
| his reasoning | chalk sums write themselves: 4 × 1/6 = 2/3, 24 × 1/36 = 2/3, a big "=" between |
| ten thousand games | both tables fast-forward; two win bars race; they part: 51.8% green, 49.1% red (THE thumbnail) |
| not bad luck | the "=" cracks and falls |
| Pascal… Fermat | two portraits, a letter folding between Paris and Toulouse, date "29 July 1654" |
| settle in one line / five moves | the two one-line answers flash, then five small icons (grid, flip, ×, people, ✓) |
| three questions | numbered list 1–3 |

## What changed, and why
- Chosen hook: de Méré (user, 2026-10-23). Bayes / birthday / Monty Hall are saturated → used as exercises, not hooks.
- Honest-history line added: Ore's doubt that the difference could be felt by play (CONTENT).
- Body follows hkt-project l01's "list → part → shortcut" but rewritten in our voice; act three is the exam toolkit
  the user asked for; ending points to fifty-percent by its question (PACKAGING §7).
