# What Does 50% Actually Mean?

Narration script (English), v1 — from the user's Vietnamese original (`SCRIPT.vi.md`), same seven parts, same voice
and stance; fact fixes and additions in `CONTENT.md` (all approved by the user 2026-10-06).

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s), `[INTRO]` = the channel signature
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS

## Cold open

I have just flipped a coin, caught it, and slapped it down on the back of my hand.
I haven't looked at it yet. So let me ask you a simple question. What is the probability that it landed heads?

The familiar answer is fifty percent. But wait a moment, doesn't something feel a little strange here?
The coin has already landed. It is lying still under my hand, one face pointing up, and nothing can change that now.
It isn't hesitating between two possibilities. It is already heads, or it is already tails.

So that fifty percent is not describing the coin. The only thing still undecided in this whole situation, is you.
Then what does that number actually mean?

It is a much harder question than it looks, and in this video I want to dig into it with you.
To me, this is the most fascinating part of probability, and also the part that almost everyone skips.
And to answer it, we have to start with the way most of us first learned what a probability is.

[INTRO]

# ACT ONE — Probability as frequency

## Flip it again, and again

The most common way to understand probability, and the one most of us meet first, is to see it as a frequency.
In this view, when you say the chance of heads is one half, you are saying that if you flipped this coin many, many times, the share of heads would settle closer and closer to one half.

Flip it ten times, and you might well get seven heads.
Flip it a hundred times, and the share is already closer.
Flip it a million times, and it is practically glued to fifty percent.

People have actually done this, by hand.
In the eighteenth century, the naturalist Buffon flipped a coin four thousand and forty times, and got two thousand and forty-eight heads.
The statistician Karl Pearson flipped twenty-four thousand times, and got twelve thousand and twelve.
And during the Second World War, a mathematician named John Kerrich, held in an internment camp in Denmark, flipped ten thousand times, and got five thousand and sixty-seven heads.
Every one of them, a hair away from one half.

This is the law of large numbers, first proved by Jacob Bernoulli in a book published in seventeen thirteen.
It says that the frequency you observe will converge to the theoretical value as the number of trials grows.

## The world that runs on frequencies

This way of seeing things is enormously useful, and a huge number of systems around us are built on it.
A casino makes money not because it cares who wins this round, but because it cares about millions of rounds.
An insurance company doesn't need to know whether you will have an accident. It needs to know how many, out of a million customers, will.
A factory checking the quality of its products works by the very same logic.

The key thing in all these examples is that they can be repeated.
You can keep flipping the coin, keep making new batches, keep selling new insurance policies.
That repeatability turns a frequency into a number you can measure and test, so any argument can be settled with real data.
For problems of this kind, the frequency view is almost the natural choice. The trouble lies with the problems that are not of this kind.

# ACT TWO — Where frequency runs out of breath

## Things that happen once

Try applying the frequency view to sentences like these.
The probability that it rains in Hanoi tomorrow is seventy percent.
The probability that a new drug passes its phase three trial is thirty percent.
The probability that this candidate wins the election is sixty percent.

There is only one tomorrow, and it will not repeat.
That drug is tested only once, in exactly the way it is being tested.
That election happens exactly once in history. There are no million tomorrows for you to count how many were rainy.

## A clever escape

People who hold the frequency view have a rather clever answer for the weather.
They say the seventy percent is not about tomorrow at all. It is about the whole collection of days on which the forecast said seventy percent.
If, among all those days, roughly seven in ten really did turn out rainy, the forecast is called well calibrated.
It is a lovely idea, and it is exactly how forecasting models are scored in practice.
But that answer cannot rescue every case.

## Back to the coin under my hand

Go back to the coin lying under my hand. It has already landed. There is no collection to put it in.
The event has happened, and the result is fixed.
And this is the point where I feel I need to stop and think a little harder.

Suppose I sneak a look at the coin, and you don't.
For me, the probability is now one hundred percent, or zero. For you, it is still fifty.
The coin did not change at all in the instant I looked. Only the information changed.
And that small observation leads straight to the second way of understanding probability.

# ACT THREE — Probability as degree of belief

## A property of you, not of the coin

The second view says that probability measures how strongly you believe a statement, given the information you have.
In this view, probability is a property of the relationship between you and the event. It doesn't live inside the coin, or the cloud, or the ballot.
It describes the state of your knowledge.

## Belief with rules

At first this sounds far too loose, as if anyone could believe whatever they like.
But in fact it is tightly constrained.
In the nineteen twenties and thirties, Frank Ramsey in England and Bruno de Finetti in Italy, working independently, showed that if you want your beliefs to be consistent, they are forced to obey exactly the rules of probability.

Their argument is built on betting.
Suppose you are willing to bet according to exactly how strongly you believe things.
Now suppose your numbers break the rules. In a match with only two possible outcomes, you believe team A will win with seventy percent, and at the same time you believe team B will win with fifty percent.
Then someone can sell you two tickets. One pays a dollar if A wins, and by your own belief it is worth seventy cents. The other pays a dollar if B wins, and by your own belief it is worth fifty cents.
Each ticket looks perfectly fair to you, so you buy both, for a dollar twenty.
But exactly one team will win, so you will collect exactly one dollar. Whatever happens, you lose twenty cents.

So the rules of probability don't fall from the sky. They are the conditions for your beliefs not to contradict themselves.
What I love about this view is that it handles events that happen only once.
You can perfectly well talk about how strongly you believe that Mars once had life, even though that is simply true or false, and will never be repeated.

## Evidence doesn't tell you right or wrong, it shifts the scales

Once probability is a belief, a new question appears. When new information arrives, how much should you change your mind?
Bayes' theorem answers that question. Let me walk through a concrete situation, so it is easy to picture.

A text message pops up on your phone, claiming to be from your bank.
The hypothesis you are weighing is this. The message is a scam.
Until now, messages from this number have almost always been genuine, so your starting belief leans heavily towards genuine.
Picture it as a pair of scales, tipped deep to one side.

The message opens with "Dear valued customer". So you ask yourself two questions.
First, if this is a scam, how likely is it to open so politely? Quite likely.
Second, if this is genuine, how likely is it to open exactly like that? Also quite likely.
The ratio between those two answers is the weight of the evidence.
Here the two numbers are almost equal, so the ratio is close to one. Multiply the scales by it, and they barely move.
You have read the greeting, and you have really learned nothing.

You read on, and the message asks you to reply with your one-time password.
If it is a scam, that request makes perfect sense. If it is really your bank, it almost never happens.
Now the two numbers are far apart, the weight is large, and the scales swing hard.

That is the heart of Bayes' theorem.
A piece of evidence is convincing not because it fits your hypothesis, but because it would be unlikely if your hypothesis were wrong.
A sign that shows up about equally often whether the hypothesis is true or false tells you almost nothing, however impressive it looks.

And one more thing. The scales only shift. They are never reset from scratch.
If you start from a hypothesis that is extremely unlikely, with the scales tipped very deep, a single piece of evidence is usually not enough to pull them back to the middle.
That sounds obvious. But in the next part I will show you just how easily it gets forgotten.

# ACT FOUR — The number that surprises experts

## A positive test

Here is a classic example from medicine.
Suppose there is a disease that affects one person in every thousand. And there is a test for it.
If you really have the disease, the test comes back positive ninety-nine percent of the time.
If you are perfectly healthy, there is still a five percent chance it comes back positive by mistake.
You take the test, and it comes back positive. What do you think is the chance that you really have the disease?

## Count real people

The easiest way to see it is to count real people.
Imagine one hundred thousand people all taking the test.
About one hundred of them really have the disease, and the test catches ninety-nine of them.
That leaves ninety-nine thousand nine hundred healthy people. With a five percent false alarm rate, about four thousand nine hundred and ninety-five of them get a positive result too.
So in total, about five thousand and ninety-four people are holding a positive result. And only ninety-nine of them are actually sick.
Ninety-nine out of five thousand and ninety-four, is about two percent.

In other words, even with a positive result in your hand, the chance that you are really ill is only about two percent.

## Why it catches us out

That number surprises a lot of people, and not only beginners.
In nineteen seventy-eight, researchers at Harvard put almost exactly this question to sixty doctors, residents and medical students. Nearly half of them answered ninety-five percent.

The reason is that most of us focus on how accurate the test is, and forget how rare the disease was to begin with.
That starting rate matters enormously, yet it slips out of view without a sound.
When a disease is rare, the healthy people are so numerous that just a few percent of false alarms is enough to swamp the people who are truly sick.

And notice what made it easy. Counting people, instead of juggling percentages.
Psychologists call these natural frequencies, and simply rewriting the problem this way makes far more people get it right.
Counting, the frequency view, turns out to be the best tool for updating a belief.

The lesson of this example is that the same test result can mean very different things, depending on the background information you start from.

# ACT FIVE — Mathematics doesn't take sides

## Three rules

By now you might think these two views are two rival schools of mathematics. In fact, they are not.
In nineteen thirty-three, Andrey Kolmogorov put probability on a rigorous mathematical foundation, built on just three axioms, and they are surprisingly simple.

He said that a probability is a rule that gives every event a number, such that, first, no value is ever negative.
Second, the certain event gets the value one.
And third, for events that are mutually exclusive, meaning they can't happen together, the probability that one of them happens is the sum of their separate probabilities.
That is all.

## Rules, not meaning

The whole of modern probability theory is built on those three conditions.
And what is remarkable is that nowhere in those three axioms is there a single line saying what probability means.
Kolmogorov gives you the rules of the game, not its meaning.

Seen from mathematics, a probability is just a measure, from the same family as the way we measure area and volume, with the convention that the whole space of outcomes has measure one.
When you say an event has probability three tenths, you are saying it takes up three tenths of that space.

The frequency view and the belief view both satisfy these axioms.
That is why the two sides can argue fiercely about meaning, and still share the very same set of tools for calculation.
Frequentists and Bayesians build different statistical methods, and answer different questions. But neither of them is doing the mathematics wrong.

# ACT SIX — Is the world random, or are we just missing information?

## A coin is a machine

There is a deeper question, and to me it is the most fascinating question in this whole video.
A coin flying through the air is a physical object obeying Newton's mechanics.
If you knew exactly the force of the flick, the angle, the spin, the height, and the way the hand catches it, you could calculate the result. There is nothing mysterious in it at all.

Persi Diaconis, a mathematician who was once a professional magician, showed this in a very practical way.
He and his colleagues built a coin-tossing machine with fixed settings, and it gave the same face every single time.
His team also showed that a coin flipped by hand and caught in the palm is slightly biased towards the face that started on top, about fifty-one percent of the time.
In twenty twenty-three, a team of researchers tested this with more than three hundred and fifty thousand real flips, and found fifty point eight percent. Almost exactly what the theory predicted.

So if you had seen which face was up when I flicked my coin at the start of this video, your number would not be fifty percent. It would be fifty-one.
The coin is the same coin. Once again, only the information changed.

## Randomness as missing information

So the randomness of a coin is not inside the coin.
It lies in the fact that the result is extremely sensitive to starting conditions that our hands cannot control, and our eyes cannot measure.
Randomness, here, is another name for missing information.
With the weather, with markets, with traffic, the story is much the same. They are complicated, and extremely sensitive to where they start, but they are not mystical.

## The one place the story isn't settled

To be fair, there is one place where this story is not settled.
Down at the scale of single particles, quantum mechanics behaves very differently.
Experiments built on a result called Bell's theorem, which earned the Nobel Prize in Physics in twenty twenty-two, have ruled out the idea that each outcome is simply written in advance, in hidden information the particles carry with them.
Whether that is true randomness, or something stranger still, physicists are still debating.
But a coin is not an electron. For the coin, the weather and almost everything in our daily lives, the uncertainty lives in us.

## The distance between you and the coin

So, in the end, probability is often introduced as a tool for talking about how random the world is.
But look closely, and it is a disciplined way of writing down what you don't yet know.
The fifty percent at the start of this video says nothing about the coin. It describes the distance between you, and the coin.

Thank you for watching all the way to the end.
If this changed the way you hear the word probability, subscribe to ninety-nine percent from scratch, so you don't miss the next one. See you soon.

---

## What changed, and why

- Same seven parts, same stance and the same examples, in the same order. Grouped into six acts: Part 4 of the
  original (Bayes) closes Act Three; Part 5 (the medical test) is Act Four.
- Opening: kept the user's hook → twist → promise. "Bắt đầu thôi" became a hanging line for the intro ("…the way most
  of us first learned what a probability is").
- Part 1: added real coin data (Buffon 4,040 → 2,048; Pearson 24,000 → 12,012; Kerrich 10,000 → 5,067) and Bernoulli
  1713 (`CONTENT.md`, filled item 1).
- Part 3, fact fix: "early twentieth century" → "the nineteen twenties and thirties", "independently".
- Part 3, fact fix: in the betting argument, each ticket looks **fair** to you (not "always in your favour"). Added the
  concrete numbers: 70¢ + 50¢ = $1.20 paid, $1 collected, 20¢ lost whatever happens.
- Part 5: added Casscells 1978 (60 people at Harvard, nearly half said 95%) and "natural frequencies"
  (Gigerenzer & Hoffrage 1995, names not read aloud). This also ties the two views together.
- Part 7: added Bartoš 2023 (more than 350,000 flips → 50.8%) and a callback to the opening coin ("it would be
  fifty-one"). Added the quantum caveat the user approved: Bell tests (Nobel 2022) rule out local hidden information;
  whether that is true randomness is still debated; coins and weather are not like that.
- Ending: the channel name is said aloud, and shown on screen with SUBSCRIBE for at least 4 s (`outro-channel-name`).
- The SMS example: "Xin chào Quý khách" → "Dear valued customer"; OTP → "one-time password". Hanoi stays.
