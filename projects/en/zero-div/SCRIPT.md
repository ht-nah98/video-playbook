# Why You Can't Divide by Zero

Narration script (English), v2 (2026-10-22: new cold open, no channel intro — `REVISION.md`) — v1 from the user's Vietnamese original (`SCRIPT.vi.md`), same eight parts, same voice;
fact fixes and additions in `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s), `[INTRO]` = the channel signature
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS

## Cold open

Type one divided by zero into any calculator, and it refuses.
Every other division has an answer. This one does not. Why?

Division is really a question: what number, times zero, gives you one?
Try any number you like. One, five, a hundred.
Times zero, it always comes back as zero. Never one.

So this is not a rule some teacher made up to annoy you.
It is a hole in arithmetic itself, and in almost fourteen hundred years, nobody has managed to patch it.
And that one hole turns out to be the best proof we have that mathematics is not a pile of rules, but a system.

Zero was the last of the familiar numbers to arrive, and it brought that hole along with it.
So in this video, we'll find out why zero was so hard to accept as a number at all.
Why dividing by zero makes no sense, no matter which way you look at it.
And what your computer actually does when you ask it anyway.
But first, we have to go back to a time when nobody needed zero at all.


# ACT ONE — Nothing

## Why zero came so late

Imagine you are a shepherd, thousands of years ago, counting your sheep.
What is the first number you need? One, of course. Then two, then three.
You never need to count zero sheep, because if there are no sheep, what exactly are you counting?

Zero is useless for counting, and that is why the Romans never needed it.
Roman numerals have I, V, X, L, C, D and M, but no sign at all for zero.
And with them, the Romans did their sums, built their bridges, and kept their accounts, perfectly well.

The trouble only begins when you write numbers by position.
Try writing three hundred and five in columns.
A three in the hundreds column, a five in the ones column, and in the tens column, something that says: empty.
Leave that something out, and your reader sees thirty-five.

The Babylonians, who counted in sixties rather than tens, lived with exactly this problem for more than a thousand years.
Then, a few centuries before our era, their scribes began pressing a small sign of two slanted wedges into the gaps.
But that sign did one job, and only one. It held a place.
It was never written at the end of a number, and nobody ever added, subtracted, or multiplied with it.

Other people came close, too.
Egyptian scribes had a word for a balance of nothing in their accounts, and the Maya, on the other side of the world, invented a zero of their own.
But a sign for an empty place is still not a number.

The real leap came from India.
In the year six twenty-eight, the mathematician Brahmagupta wrote a book in which zero was treated, for the first time, as a number like any other.
He wrote down its rules. Any number plus zero stays the same. A number minus itself is zero. Any number times zero is zero.
For the first time in history, nothing had become a mathematical object.

From India, the idea travelled to the scholars of the Islamic world, among them al-Khwarizmi in Baghdad.
And in twelve oh two, Fibonacci brought it to Europe, which took several more centuries to fully accept it.

## The two jobs of zero

So when we talk about zero, we are really talking about two very different things.

The first job is holding a place, and it is the easy one.
In three hundred and five, the zero simply says that the tens column is empty.
It is a piece of notation that lets you tell thirty-five from three hundred and five, and from three thousand and fifty.
Nothing more.

The second job is the hard one. Zero is also a real number.
It sits on the number line, right between the positive numbers and the negative ones.
It is what you get from five minus five. It is how many apples are in an empty basket. It is the origin of every graph you have ever drawn.
Brahmagupta was the first to say it out loud: zero is not just a placeholder, it is a number that can take part in a calculation.
And from that very moment, he ran into the problem this whole video is about.
Division.

# ACT TWO — The broken operation

## Everything works, except division

Notice how well zero gets along with addition, subtraction and multiplication.

Add zero to any number, and nothing changes. Seven plus zero is still seven.
In addition, zero is the neutral element. It leaves its partner exactly as it found it.

Subtraction works too. Seven minus zero is seven, and seven minus seven is zero. Everything fits.

Multiplication is a little more dramatic, but just as consistent. Any number times zero is zero.
You can picture it. Seven baskets with zero apples in each, and you have no apples at all.
Zero baskets with seven apples in each, and you still have none.
In multiplication, zero is a black hole. Everything that touches it gets pulled in.

But with division, the story falls apart.
Brahmagupta wrote that zero divided by zero is zero.
About five hundred years later, another Indian mathematician, Bhaskara, said that a number divided by zero is infinite, and he gave it a name: khahara, the quantity whose divisor is zero.
In the modern sense, both of them were wrong.
Or, more precisely, neither definition fits with the rest of arithmetic.
So what went wrong?

## What division really is

To see why dividing by zero breaks, you have to look again at what division actually is.
Division is multiplication, run backwards.

When you write twelve divided by three equals four, what you are really saying is this.
There is exactly one number, four, such that four times three is twelve.
Dividing is simply finding the missing factor in a multiplication.
Now apply that same definition to zero.

Say you want twelve divided by zero.
You are looking for some number, call it x, such that x times zero is twelve.
But you have just seen that every number times zero is zero.
There is no x anywhere that you can multiply by zero and get twelve.
So twelve divided by zero is not a hard question. It is a question with no answer to find.

What about zero divided by zero?
Now you want an x such that x times zero is zero, and this time, the trouble runs the other way.
Every x works. One times zero is zero. Two times zero is zero. A million times zero is still zero.
There are infinitely many answers.

But division, by its very definition, has to give one answer, and only one.
So mathematicians say that twelve divided by zero is undefined, because there is no answer.
And zero divided by zero is undefined too, but because there are too many.
Two different kinds of undefined, and both of them rob division of the one thing that makes it useful: a single answer.

## Getting closer to zero

There is another way to feel why dividing by zero breaks.
Instead of dividing by zero itself, divide by numbers that get closer and closer to it.

One divided by one tenth is ten.
One divided by one hundredth is a hundred.
One divided by one thousandth is a thousand.
The smaller the number you divide by, the bigger the result. It looks as if dividing by zero should give you infinity.

But now come at zero from the other side.
One divided by minus one tenth is minus ten. By minus one hundredth, minus a hundred. By minus one thousandth, minus a thousand.
From the negative side, the result races off towards minus infinity.

So which is it? Should one divided by zero be plus infinity, or minus infinity?
It depends on which side you come from.
Two roads lead to two destinations with opposite signs, so there is no single place where they both arrive.
That is why, in calculus, the limit of one over x, as x goes to zero, does not exist.
It isn't some strange, exotic number. It simply isn't there.

And zero over zero is even more slippery.
Take x over x. As x shrinks towards zero, the answer is always one.
Take two x over x, and the answer is always two.
Take x squared over x, and the answer slides down to zero.
Every one of them looks like zero over zero at the end, yet the answer can be anything at all, depending on how you got there.
That is why zero over zero is called an indeterminate form.

# ACT THREE — The price

## Why not just call it infinity?

By now, you might be thinking: why not just define one divided by zero as infinity, and be done with it?

The trouble is that the rest of arithmetic starts to crack.
Remember the rule that ties division to multiplication: if a divided by b is c, then c times b must be a.
So if one divided by zero is infinity, then infinity times zero must be one.
But by the same argument, two divided by zero is infinity too, so infinity times zero must also be two.
One expression, two different answers. One equals two.

Or try treating infinity as an ordinary number.
Add one to infinity, and you still have infinity. Add two to infinity, and you still have infinity.
So one plus infinity equals two plus infinity.
Now take infinity away from both sides, the way you would with any number, and you are left with one equals two.

And yet, mathematics does not actually forbid you from defining one divided by zero.
On a surface called the Riemann sphere, one divided by zero really is infinity, and it is perfectly legal.
But look at what it costs.
That infinity has no sign. It is not bigger than five, and not smaller than minus five.
Zero times infinity, infinity minus infinity, and zero over zero still have no answer.
So mathematics never says you can't. It says: if you do, you have to pay, by giving something else up.

## What your computer does

So what does your computer do, when you ask it to divide by zero?

With whole numbers, most programming languages simply stop, with an error.
It is the most honest answer there is. The machine tells you straight out: I can't compute this.

But with decimal numbers, computers follow a standard called I triple E seven five four, and it handles things differently.
A positive number divided by zero gives Infinity. A negative number divided by zero gives minus Infinity.
And zero divided by zero gives a special value called NaN, which stands for Not a Number.

Here is a detail that echoes everything we have seen.
The standard actually keeps two zeros, a plus zero and a minus zero, so that it can remember which side you came from.
One divided by plus zero is Infinity. One divided by minus zero is minus Infinity.

And NaN has a very strange property. It is not equal to itself.
Compare NaN with NaN, and the computer answers: false.
Ask it for infinity times zero, or infinity minus infinity, and it answers NaN again.
The machine has learned exactly the lesson we just worked out by hand.

None of this means the standard has solved division by zero.
It is a practical agreement, so that a program does not crash halfway through a calculation.
The mathematical problem is still there. It has just been wrapped up in a special value, and set aside.

## Looking back

Zero is one of the most important inventions in all of mathematics.
Without it, there is no origin on a graph, no calculus, no computer.
But it came with a boundary attached. You cannot divide by it.

And mathematics has filled holes like this before.
When subtraction ran out of answers, we invented negative numbers. When division ran out, we invented fractions.
When square roots ran out, we invented i.
Each time, a new kind of number filled the gap, and the old rules kept working.

Dividing by zero is the one hole among the four operations that no new kind of number can fill for free.
Every time someone has tried to step across it, the system has made them pay, by giving up another rule in exchange.
So dividing by zero is not an arbitrary ban.
It is a hole that cannot be filled, and that hole shows you just how tightly everything else is woven together.

## Outro

Thank you for watching all the way to the end, and see you in the next video.

---

## What changed, and why

**v1 (2026-10-05):** the user's Vietnamese original, kept part by part in its own voice (rhetorical questions, "you"
throughout, the black-hole and basket images). Added: a link back to math-30k in the cold open (this is the deep dive
its outro promised); the Babylonian placeholder dated ("a few centuries before our era", after a thousand years
without it) and their base sixty named; Egypt's *nfr* and the Maya so "nobody had zero" is not an overclaim; the
concrete one-equals-two argument in place of "give up commutativity, associativity or distributivity"; the Riemann
sphere as a real example of "you may, but you pay"; IEEE's plus and minus zero, and infinity times zero = NaN, tying
part seven back to parts five and six; "the only hole in arithmetic" narrowed to the four operations, framed by the
holes that new numbers did fill (negatives, fractions, i). Fact fixes in `CONTENT.md`.
