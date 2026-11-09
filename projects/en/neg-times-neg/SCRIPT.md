# Why Is a Negative Times a Negative Positive?

Narration script (English), v1 — written from the user's Vietnamese narration (`SCRIPT.vi.md`), keeping its four parts
and its argument, corrected and filled per `CONTENT.md` (fixes 1–8, fills 1–7, user OK 2026-10-07).

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

In the seventeen nineties, a schoolboy in Grenoble asked his maths teachers a simple question. Why does a minus times a minus make a plus?
Nobody could give him a reason. He was told, more or less, to learn the rule and move on.
That boy grew up to be the French novelist Stendhal, and forty years later he was still annoyed enough to write about it in his memoir.

You probably know the rule without thinking. Negative times negative is positive.
But if you stop and ask why, the answers you get are a strange mix.
Some people say it's just a convention, so accept it and keep going.
Some people tell a story about debts. Some say that walking backwards and then turning around makes you walk forwards.
Each of those has something to it. But are they proofs, or are they just ways to remember?

So in this video, I want to answer three questions with you.
One. Why did people refuse to accept negative numbers for more than a thousand years?
Two. Are the usual explanations real proofs, or only ways to remember?
And three. Is negative times negative a convention that someone chose, or is it forced on us?

Here is where we are going. The rule is not an arbitrary choice that someone made up.
It is what has to happen, the moment you ask negative numbers to behave like numbers.
But to see why, we first have to understand why, for most of history, people didn't think they were numbers at all.

[INTRO]

# ACT ONE — A number nobody wanted

## A length can't be negative

Today a negative number feels completely natural. That is mostly because you were taught it as a child, not because it is obvious.
The ancient Greeks thought about mathematics through geometry. A number was a length, an area, a quantity of something.
And a length cannot be less than nothing.
So when Diophantus of Alexandria, around the year two hundred and fifty, met the equation four x plus twenty equals four, he called it absurd.
The only answer would be negative, and to him, a negative answer simply was not an answer.

## Debts and fortunes

In other places, negative numbers were already being put to work.
In China, the book known as The Nine Chapters on the Mathematical Art used red counting rods for positive amounts and black rods for negative ones, with rules for adding and subtracting them.
And in the year six twenty-eight, in India, Brahmagupta wrote down rules for calculating with fortunes and debts.
Among them is the oldest written version of our rule that survives: the product of two debts is a fortune.
But Brahmagupta gave it as a rule, explained through debts and fortunes. He did not prove it the way a mathematician would today.

## Fictitious, absurd, meaningless

Europe was even more suspicious.
In fifteen forty-five, Gerolamo Cardano called negative numbers fictitious.
In seventeen fifty-nine, the English mathematician Francis Maseres wrote a whole dissertation arguing that the negative sign should be kept out of algebra.
And in seventeen ninety-six, William Frend published a textbook of algebra that refused to use negative numbers at all.
That is more than a thousand years after Brahmagupta first wrote the rule down.
If negative times negative were so obvious that it needed no proof, it would not have taken that long.

# ACT TWO — Explanations that feel right

## The debt story

You have probably met a few explanations already. Let's look at them honestly.
The first one is about debt.
If you owe three million, that is minus three million in your accounts.
If someone takes that debt away, they have subtracted minus three million, and you are three million richer.
So subtracting a negative is the same as adding a positive. For subtraction, this story works beautifully.
But try it for multiplication, and it starts to creak.
Negative three times negative two becomes something like, take away a debt of two, three times over.
You can make yourself accept that. But notice that you are no longer seeing it. You are leaning on a feeling.

## The pattern

The second explanation uses a pattern.
Three times minus two is minus six. Two times minus two is minus four.
One times minus two is minus two. Zero times minus two is zero.
Each time the first number drops by one, the answer goes up by two.
So if the pattern keeps going, minus one times minus two has to be two, and minus two times minus two has to be four.
It is convincing. But it rests on one big assumption: that the pattern has to continue.
Why should it? That is exactly the question we are trying to answer, and the pattern cannot answer it for us.

## The about-turn

The third explanation is a picture on the number line.
Multiplying by a negative number is like turning around, a turn of one hundred and eighty degrees.
Turn around once, and you face the other way. Turn around twice, and you are facing forwards again.
This is a lovely picture, and it will matter a great deal later, when you meet complex numbers.
But for ordinary numbers, it is still a picture. It describes the rule. It does not prove it.

## Even Euler

Even the great Leonhard Euler, in his algebra textbook of seventeen seventy, gave an argument that only sounds like a proof.
Minus a times minus b, he said, must be either a b or minus a b.
But minus a b is already taken, by minus a times b. So the only thing left is a b.
Why must there be only two choices? And why can't two different products give the same answer? Euler doesn't say.

## Feeling is not proof

All of these make the rule feel reasonable. But feeling right is not the same as being proved.
A real proof does not lean on feelings, or stories, or trust.
It starts only from things you have already agreed to, and shows that the conclusion has no other way to come out.
So let's do that now.

# ACT THREE — The proof

## The rules you already use

We are going to prove that minus a times minus b equals a times b, for any numbers a and b.
To do it, I need you to agree to a few rules. You have been using every one of them since primary school. I am only giving them names.

First, the distributive law. A times, b plus c, equals a times b, plus a times c.
You use it every time you multiply in your head. Twenty-three times seven is twenty times seven plus three times seven, one hundred and forty plus twenty-one, one hundred and sixty-one.
Second, opposites. Every number has an opposite, and a number plus its opposite is zero. Three plus minus three is zero. That is what a negative number is.
And a number has only one opposite. If two numbers add up to zero, each one is the other's opposite.
Third, zero. Adding zero to a number leaves it unchanged.
And finally, the order and the grouping of a sum or a product don't matter. Two times three is three times two.

Together, these rules are what modern mathematicians call a ring. You don't need to remember the name. You only need to agree that these are the rules you already use.

## Zero times anything

I'll do the proof with real numbers first, three and two, and keep the letters alongside for anyone who wants them.
Step one is a small fact that sounds too obvious to need proving: zero times anything is zero.
Take zero times two. Since zero plus zero is zero, zero times two is the same as, zero plus zero, times two.
By the distributive law, that is zero times two, plus zero times two.
So zero times two equals zero times two plus zero times two.
Now add the opposite of zero times two to both sides, and you are left with zero equals zero times two.
So zero times two is zero. Not because we said so, but because the rules leave it no choice.

## A negative times a positive

Step two. What is minus three times two?
Start with three plus minus three. That is zero. So, three plus minus three, times two, is zero times two, which we just showed is zero.
But by the distributive law, the same thing is three times two, plus minus three times two. That is six, plus minus three times two.
So six plus minus three times two equals zero.
Two numbers that add up to zero are opposites. So minus three times two is the opposite of six, which is minus six.

## A negative times a negative

Step three, the one we came for. Minus three times minus two.
Start with minus three times, two plus minus two.
Inside the brackets is zero, so the whole thing is minus three times zero, and by step one, that is zero.
By the distributive law, the same thing is minus three times two, plus minus three times minus two.
From step two, minus three times two is minus six. So minus six, plus minus three times minus two, equals zero.
Two numbers that add up to zero are opposites. So minus three times minus two is the opposite of minus six.
And the opposite of minus six is six.
Minus three times minus two is six.

Nothing in those steps used anything special about three and two. Put a and b in their place, and every line still holds.
Minus a times minus b equals a times b.

## Nobody chose

If you followed that, notice what did not happen.
At no point did we decide that negative times negative is positive. Nobody banged on the table and said, let it be so.
We used the distributive law, the meaning of an opposite, and the behaviour of zero.
The answer fell out on its own.

# ACT FOUR — Convention, or forced?

## The real choice

But you might push back, and it's a very good question.
You used the distributive law. How do you know it has to work for negative numbers? Maybe that is where the convention is hiding.
And that is exactly right. This is the one place where people really did make a choice.
Every time mathematicians widened the world of numbers, from counting numbers to negatives, from whole numbers to fractions, they faced the same question.
How should adding and multiplying work out here, in the new territory?
In eighteen thirty, the English mathematician George Peacock gave an answer, and in eighteen sixty-seven Hermann Hankel in Germany put it even more sharply.
It's often called the principle of permanence. When you extend the numbers, keep the old rules working, as far as you possibly can.

## Try to break it

So let's see what happens if you don't. Suppose we decide, just for fun, that minus one times minus one is minus one, and we keep everything else.
Take minus one times, one plus minus one.
Inside the brackets is zero, so the answer is minus one times zero, which is zero.
But the distributive law says it's also minus one times one, plus minus one times minus one.
That's minus one, plus our new minus one. Minus two.
So zero equals minus two.
One small change, and arithmetic collapses.

To make negative times negative come out negative, it is not enough to pick a different convention.
You would have to throw away the distributive law, or the meaning of an opposite.
And without the distributive law, a lot more goes with it. Doing sums in your head stops working.
The formula for a plus b, all squared, stops being true.
Even the idea that one expression can be rewritten in another, equivalent form falls apart.
You would no longer be in the numbers you know. You would be in some strange other system, perhaps consistent, but almost useless.

## What we chose

So here is the honest answer to the convention question.
There was one choice, and people did make it: negative numbers should obey the same rules as every other number.
Once you make that choice, nothing else is a choice. The distributive law forces zero times anything to be zero.
The meaning of an opposite forces a negative times a positive to be negative.
And together, they force a negative times a negative to be positive. There is no other way for it to come out.

# ACT FIVE — Putting it together

## Putting it together

People refused negative numbers for more than a thousand years, because they thought of numbers as lengths and amounts, and nothing can be less than nothing.
The usual explanations, debts, patterns, turning around, are good ways to remember the rule. But they make it feel right. They don't prove it.
And the rule is not a convention someone picked. The only choice was to keep the old rules, and once that choice is made, negative times negative has to be positive.

## Next time

Here is something to think about.
Multiplying by minus one turns the number line around, a turn of one hundred and eighty degrees.
So what would you multiply by, to turn only halfway, ninety degrees?
Do it twice, and you would have turned all the way around. So that number, times itself, would be minus one.
No ordinary number can do that. Mathematicians took a long time to accept it, too. But that is a story for another video.

Thank you for watching all the way to the end.
If there's a rule in maths that you were always told to just accept, tell me in the comments. It might be the next video.
And subscribe to ninety-nine percent from scratch, so you don't miss it. See you soon.

---

## What changed, and why

- **User's four parts kept** as Acts One to Four, in their order and with their argument; the opening became a cold
  open with a real person (Stendhal, fill 1), the three ways people answer, a numbered promise and a hanging line.
- **Fact fixes (CONTENT.md 1–8):** Nine Chapters (red/black rods) before Brahmagupta, who is the oldest SURVIVING written
  multiplication rule; Diophantus said concretely (4x + 20 = 4, "absurd"); "for any numbers a and b" (not only
  positive); commutativity named and uniqueness of opposites said out loud (the proof needs both); "subtract from both
  sides" → "add the opposite to both sides"; Hermann (not Herman) Hankel 1867, with Peacock 1830 first; Maseres 1759,
  Frend 1796; "more than a thousand years after Brahmagupta first wrote the rule down".
- **Stendhal dates:** born 1783, at the École centrale in Grenoble 1796–99 → "in the seventeen nineties"; memoir
  *Vie de Henry Brulard* written 1835–36 → "forty years later".
- **Fills:** Stendhal hook; Nine Chapters rods; Euler 1770 as a fourth "sounds like a proof" explanation; proof with 3
  and 2 first, letters alongside; break demo (0 = −2); 23 × 7 as everyday distributivity; "next time" = a quarter turn.
- **Misconception beats for the picture:** "it's just a convention" (cold open → answered in Act Four, struck → "forced
  by the rules we kept"); the three explanations are NOT struck as wrong — they are labelled "a way to remember, not a
  proof" (§58: red only on wrong words).
