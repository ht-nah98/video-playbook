# Why Is Anything to the Power of Zero One?

Narration script (English), v1 — written from the user's Vietnamese narration (`SCRIPT.vi.md`), keeping its five parts
and its argument, corrected and filled per `CONTENT.md` (fixes 1–9, fills 1–8, user OK 2026-10-08).

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

Two to the power of three means three twos multiplied together. Two times two times two, which is eight. That makes sense.
Two to the power of one is just two, on its own. That makes sense too.
But then comes two to the power of zero. Your textbook says it equals one, and every calculator agrees.

Why one?
If a power counts how many times you multiply, then a power of zero means multiplying zero times.
And multiplying zero times sounds like it should mean nothing at all.

It gets stranger. Try zero to the power of zero.
Python says one. So does JavaScript, and so does Google.
A TI eighty-four calculator says domain error. Excel gives you an error, too.
Same question, same symbols, and the machines can't agree.

So in this video, I want to answer three questions with you.
One. Why is anything to the power of zero equal to one?
Two. Is that a rule somebody chose, or is it forced on us?
And three. What is zero to the zero, and why do the machines disagree?

Here is where we are going. That one isn't a trick, and it isn't nothing.
Multiplying zero times means you haven't multiplied yet, and a multiplication that hasn't started stands at one.
But zero to the zero is where two good ideas collide. To see why, we start with a staircase.

[INTRO]

# ACT ONE — Follow the pattern

## Down the powers of two

Let's begin with the most visual way to see it.
Write the powers of two in a column. Two to the fourth is sixteen. Two cubed is eight. Two squared is four. And two to the first is two.
Now notice what happens each time the exponent goes down by one. The answer is divided by two.
Sixteen to eight, divide by two. Eight to four, divide by two. Four to two, divide by two again.
So what should the next step be? Two divided by two is one.
If the pattern keeps going, two to the zero is one.

## Try another number

Let's check with another number, just to be sure. Take ten.
Ten cubed is a thousand. Ten squared is a hundred. Ten to the first is ten.
Each step down divides by ten. And ten divided by ten is one.
So ten to the zero is one as well.
Start from any number you like, as long as it isn't zero, and the staircase always lands on one. On the last step, you are dividing the number by itself.

## A pattern is not a proof

This is the easiest way to see it. But a pattern is a hint, not a reason.
Who says the pattern has to keep going, past the last step we actually understand?
Mathematics needs something stronger. A reason why a to the zero has to be one.

# ACT TWO — Forced by a rule

## The rule you already know

There is one rule about powers that everybody learns.
a to the m, times a to the n, equals a to the m plus n.
For example, two cubed times two squared is two to the three plus two. That's two to the fifth, thirty-two.
You can check it. Eight times four really is thirty-two.
The rule works because you are only counting twos. Three of them, then two more, five altogether.

## Put in a zero

Now let's ask the rule about a to the zero.
Take any number a that isn't zero, and any exponent m.
The rule says a to the m, times a to the zero, equals a to the m plus zero. And m plus zero is just m.
So a to the m, times a to the zero, gives back a to the m.
Whatever a to the zero is, multiplying by it changes nothing.
And because a to the m isn't zero, we can divide both sides by it. What's left is a to the zero equals one.
Hold on to that small step, "because it isn't zero". It is going to matter later.

## Or divide

There is another way to say the same thing.
Any number divided by itself is one, so a to the m divided by a to the m is one.
But the division rule for powers says a to the m divided by a to the m is a to the m minus m. That's a to the zero.
Two roads, same place. A to the zero is one.

## Multiplying zero times

So what about the question we started with? What does it mean to multiply zero times?
Think about where a calculation starts.
When you add up a list of numbers, you start from zero, because adding zero changes nothing. Add up no numbers at all, and you get zero.
When you multiply a list of numbers, you start from one, because multiplying by one changes nothing.
Two cubed is really one, times two, times two, times two.
Take the twos away, one at a time, and you are left with the starting point. One.
Multiplying zero times isn't nothing. It's not having done anything yet, and for multiplication, that place is one.

## A choice, then no choice

So is this a convention?
Here is the honest answer. The rule for multiplying powers was first proved for counting exponents. One, two, three, and so on.
Asking it to work for zero as well is a choice. It's the same choice we met in the last video, about negative numbers. Keep the rules that already work.
But once you make that choice, nothing else is a choice. A to the zero is forced to be one.
And for every number except zero, nobody has found a good reason to choose anything else.

# ACT THREE — When the base is zero

## The staircase stops

Everything has been tidy so far. Now put zero in place of a, and watch what happens.
The staircase first. Zero cubed is zero. Zero squared is zero. Zero to the first is zero.
To take the next step down, you would divide by zero. And dividing by zero isn't allowed.
The staircase stops, one step early.

## The rule goes quiet

What about the multiplication rule? It doesn't break. It does something stranger. It goes quiet.
Remember the small step. Because a to the m isn't zero, we could divide.
With zero, a to the m is zero. Now the rule says zero, times zero to the zero, equals zero.
But zero times anything is zero. Put in one, put in seven, put in a million. Every value passes.
The rule has stopped deciding.
It still narrows things down a little. Use it with both exponents zero, and it says zero to the zero, times itself, equals zero to the zero.
Only two numbers equal their own square. Zero, and one.
So the rule throws out every number except those two. It just won't pick between them.

## Two patterns, one square

And those two candidates come from two patterns that both feel natural.
Picture a table of x to the power of y. Along the row where the exponent is zero, every answer is one. Five to the zero, two to the zero, a half to the zero. One, one, one.
Down the column where the base is zero, every answer is zero. Zero to the third, zero squared, zero to the first. Zero, zero, zero.
Both lines run into the same square. Zero to the zero.
One pattern says one. The other says zero.
So which one wins? It depends on what kind of mathematics you are doing.

# ACT FOUR — When counting decides

## Counting the ways

Here is another way to read a power, and in one part of mathematics it settles the question.
Two cubed counts the ways to fill three boxes, when each box gets one of two symbols.
There are eight ways. Two choices, then two, then two.
In general, a to the n counts the ways to fill n boxes, with a choices for each box.
Now take zero boxes. How many ways are there to fill no boxes at all? Exactly one. You do nothing, and you're done.
That stays true even when you have zero symbols to choose from.
So in counting, zero to the zero is one. It isn't a convention there. You count, and you get one.

## Formulas that need it

Algebra leans on the same answer, because so many formulas quietly assume it.
Take a polynomial. Three, plus two x, plus x squared.
Mathematicians often write it as a sum of terms, each one a number times x to some power. The first term is three times x to the zero.
Put x equals zero, and the answer should obviously be three. That only works if zero to the zero is one.
The binomial theorem, the expansion of x plus y to the n that goes back to Newton, has the same problem.
Its first term is x to the zero, times y to the n. Put x equals zero, and the whole thing should be y to the n. Again, it only works if zero to the zero is one.
And the series that defines e to the x begins with x to the zero, divided by zero factorial. Zero factorial is also one, by the way. Hold that thought.
At x equals zero you want e to the zero, which is one. Once more, you need zero to the zero to be one.

## Ten thousand times no

In nineteen ninety-two, the computer scientist Donald Knuth wrote about this in a paper called Two Notes on Notation.
To the people who wanted zero to the zero left undefined, his answer was: no, no, ten thousand times no.
The binomial theorem, he argued, is far too important to be broken over one square of the table.
Most programming languages make the same choice. That's why Python and JavaScript answer one.

# ACT FIVE — When limits decide

## A shape, not a number

So why do some calculators refuse?
Because in calculus, zero to the zero has a second life. It is called an indeterminate form.
This is the part that convinces many people that zero to the zero has no value at all, so it's worth getting right.

## Two paths to the corner

Take x to the y, and let both x and y slide towards zero.
First path. Keep y at zero, and let x shrink. Every value along the way is x to the zero, which is one. The limit is one.
Second path. Keep x at zero, and let y shrink towards zero from above. Every value is zero to a positive power, which is zero. The limit is zero.
Two paths into the same corner, and two different answers.
And it's worse than that. Choose the path cleverly, and you can make the limit come out as two, or a half, or any positive number you like.
There is a curved path along which x to the y is exactly two, at every single point.
So there is no number you could place in that corner that every path agrees on.

## What indeterminate means

That is why calculus calls zero to the zero an indeterminate form.
Indeterminate doesn't mean the expression has no value.
It means that when a limit takes the shape of zero to the zero, you can't read the answer off the shape. You have to work it out, case by case.
Sometimes it comes out as one. As x shrinks towards zero, x to the x dips down, and then climbs back up to one.
Sometimes it's two, or a half, or something else entirely.

## An old argument

This argument is almost two hundred years old.
In eighteen twenty-one, Augustin-Louis Cauchy put zero to the zero in his table of undefined forms, in his famous course on analysis.
In eighteen thirty-three, a paper by Guglielmo Libri argued that it should be one, and August Möbius stepped in with a proof to back him up.
The proof was wrong. But the argument it started is still going on in classrooms today.

# ACT SIX — Putting it together

## Putting it together

Anything except zero, to the power of zero, is one. Multiplying zero times leaves you where multiplication starts, and the staircase of powers lands there too.
It's a choice in only one sense. We chose to keep the rules of powers working, and once we did, a to the zero had to be one.
And zero to the zero lives two lives. As a value, in counting, in algebra, and in almost every programming language, it is one.
As the shape of a limit in calculus, it is indeterminate, and you have to calculate.
Those two facts don't contradict each other. One is about a number. The other is about where a moving quantity is heading.
That's also why the machines disagree. The ones that say one are doing algebra. The ones that show an error are holding up a warning sign.
So if a test asks you for zero to the zero, answer the way your course defines it. Many school textbooks call it undefined, and that is the answer they expect.

## Next time

Here is something to notice on your own.
Zero factorial is one, too. And zero factorial is the product of no numbers at all.
Where have we seen that before?

Thank you for watching all the way to the end.
What do you think zero to the zero should be? One, zero, or undefined? Tell me in the comments.
And subscribe to ninety-nine percent from scratch, so you don't miss the next one. See you soon.

---

## What changed, and why

- **User's five parts kept** as Acts One to Five in their order, with their argument; the opening became a cold open
  with the machines disagreeing (fix 6), a numbered promise and a hanging line; "Putting it together" + "Next time"
  added (Act Six).
- **Fact fixes (CONTENT.md 1–9):** the quiz advice reversed ("answer the way your course defines it"; Vietnamese and
  many US textbooks say undefined); the multiplication rule with base zero "goes quiet" instead of "fails" (0 · x = 0
  for every x), and narrows 0⁰ to 0 or 1 (x · x = x); "because a to the m isn't zero, we can divide" said out loud and
  called back in Act Three; "forced" vs "convention" reconciled (keeping the rule is the choice, then a⁰ = 1 is forced
  — callback to lesson 6); no guess at Excel's designers' intent ("a warning sign"); concrete machines (Python,
  JavaScript, Google → 1; TI-84 domain error; Excel error); counting makes 0⁰ = 1 a count, not a convention; binomial
  written with ascending powers of x; zero factorial deferred to "next time".
- **Fills:** empty product (sum starts at 0, product at 1) answers the opening question; counting boxes; x · x = x;
  the x^y table (row of ones, column of zeros); polynomial p(0) = 3; x^x → 1; the path where x^y = 2; Cauchy 1821,
  Libri 1833 + Möbius, Knuth 1992.
- **Knuth quote** "No, no, ten thousand times no!" — from *Two Notes on Notation* (arXiv math/9205211), where he
  answers those who would leave 0⁰ undefined. Python/JS answer 1 because they follow C's `pow` (not because of Knuth);
  the script only says "most languages make the same choice".
- **Misconception beats for the picture:** "multiplying zero times means nothing" (cold open → Act Two, struck → "not
  started yet = 1"); "the rule fails at zero" (→ "goes quiet"); "indeterminate = no value" (struck in Act Five);
  "the safest quiz answer is 1" is NOT said at all (fix 1).
