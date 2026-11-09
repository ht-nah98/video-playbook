# Should You Trust Your Intuition in Math?

Narration script (English), v1 — written from the user's Vietnamese narration (`SCRIPT.vi.md`), keeping its three parts
and its argument, corrected and filled per `CONTENT.md` (fixes 1–10, fills 1–7; film *21* and Bertrand's box chosen by
the user 2026-10-08).

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

Here's a quick one. Answer it before you think too hard.
There are three cards in a bag. One is red on both sides. One is white on both sides. And one is red on one side and white on the other.
I pull out a card without looking, and put it on the table. The side facing up is red.
What's the chance that the other side is red too?

I'm guessing a number just popped into your head. Fifty percent.
It's either the red-red card or the red-white card. Two cards, one of each. It feels obvious.
It's also wrong. The answer is two out of three, and by the end of the first part, you'll see exactly why.

That instant answer, the one that arrives before any thinking, is what we call intuition.
And some puzzles are built so that the instant answer is a trap.
There's one puzzle that thousands of smart people, including professors of mathematics, argued about by mail, because they trusted their gut over the calculation.

So in this video, I want to answer three questions with you.
One. When does intuition lead you wrong, and why?
Two. What do you do when the proof is right, and your gut still says no?
And three. Does math need intuition at all, or is logic enough?

We'll use two famous puzzles. One where intuition loses an argument it was sure it would win.
And one where intuition loses the argument, and still refuses to give up.

[INTRO]

# ACT ONE — Three doors

## The game

The first puzzle is called the Monty Hall problem, after the host of an American game show called Let's Make a Deal.
If you've seen the movie twenty-one, you've seen it on screen. A professor puts it to a student in the middle of a class, and the student's answer is what gets him invited onto a team of card counters.

Here are the rules.
In front of you are three doors. Behind one is a car. Behind the other two, goats.
You pick a door. Say, door number one. But it stays closed for now.
The host knows where the car is. He opens one of the two doors you didn't pick, and it's always a goat.
Now two doors are still closed. Yours, and one other.
And the host asks you: do you want to switch?

## Fifty-fifty?

Almost everyone has the same reflex.
Two doors left. One car, one goat. That's fifty-fifty, so switching can't make any difference.
In one study, out of more than two hundred people, only thirteen percent switched.

It sounds completely reasonable. But the right answer is that you should switch.
If you stay, you win the car one time in three. If you switch, you win two times in three.
Switching doubles your chances.

## What the host knows

The reason is hiding in the moment you made your first pick.
At that point you knew nothing. So your door has exactly a one in three chance of hiding the car.
The other two doors, taken together, hold the remaining two in three.

Here is the key. The host doesn't open a door at random.
He knows where the car is, and he deliberately opens a goat.
So when he opens one of those two doors, the two in three doesn't vanish. All of it moves onto the one door he left closed.
Your door is still one in three. The other door now holds two in three.

## Ten thousand letters

If that still feels wrong to you, you're in very good company.
In nineteen ninety, Marilyn vos Savant gave exactly this answer in her magazine column. Switch.
Around ten thousand letters arrived, most of them telling her she was wrong. Nearly a thousand were signed by people with doctorates.
Even Paul Erdős, one of the most brilliant mathematicians of the twentieth century, wasn't convinced, until he watched a computer play the game over and over.

## A hundred doors

So let's give your intuition a better picture.
Instead of three doors, imagine a hundred.
You pick one. Your chance of having the car is one in a hundred. Tiny.
Then the host, who knows where the car is, opens ninety-eight doors. Goat, goat, goat, all the way along.
He leaves exactly one other door closed.

Now it's obvious, isn't it?
Out of ninety-nine other doors, he carefully skipped that one. It almost certainly has the car.
Your door is still the wild guess it always was. One in a hundred.
Of course you switch.

The three-door game is exactly the same. The numbers are just small enough to fool you.

## Play it a thousand times

And you can do what convinced Erdős.
Here are a thousand games, played by a computer. On the left, a player who always stays. On the right, one who always switches.
The staying player wins about a third of the time. The switching player wins about two thirds.
Not because of a formula. You can just watch it happen.

## The rules nobody said

Before we call this settled, there's one detail that matters a lot.
The answer two in three depends on the rules. The host always knows where the car is, he always opens a goat, and he always offers you the switch.

Change the rules, and the answer changes.
Suppose the host opens one of the other doors at random, and sometimes, by accident, he reveals the car.
In the games where he happens to show a goat, switching and staying are now exactly even. One half each.

Monty Hall himself made this point. If the host is required to open a door and offer a switch every time, he said, take the switch. But if he has the choice, beware.
And look back at that classroom scene in twenty-one. The professor says the host decides to open a door. He never says the host has to.
The student's answer is right, but only under rules that nobody in the scene actually says out loud.

That's what makes this puzzle so good. The answer depends on the host working to hide the car, and that's exactly the detail intuition skips.

## Back to the cards

Now we can finish the cards from the start.
Your gut counted cards. Two cards could show red, so fifty-fifty.
But count the sides instead. There are three red sides you could be looking at.
Two of them belong to the red-red card. Only one belongs to the red-white card.
So the other side is red two times out of three. Just like the doors, what you see isn't chosen fairly between the two possibilities.

## Intuition, rebuilt

Here's what I find most interesting about Monty Hall.
Your first intuition led you to the wrong answer. But intuition didn't turn out to be useless.
The moment you pictured a hundred doors, intuition switched sides and agreed with the calculation.
A small change in how you look at the problem, and intuition is walking in the right direction again.

# ACT TWO — Zero point nine, repeating

## Always a little short

The second puzzle is different.
Here, even after hearing the explanation, many people still feel uneasy.
The fact is this. Zero point nine nine nine, with the nines going on forever, is exactly equal to one.

The natural reaction is to refuse.
It feels like zero point nine repeating is still just a tiny bit short of one. An infinitely small gap, but still a gap.
And the feeling is strong. People hear the explanation, nod, and then quietly think, it's still a little short.

## Two quick proofs

There are a couple of familiar arguments that the two numbers are equal.
The first starts with a fraction. One third, written as a decimal, is zero point three three three, with the threes going on forever.
Multiply both sides by three. The left side becomes one. The right side becomes zero point nine nine nine, forever.
So zero point nine repeating is one.

The second is an algebra trick.
Call zero point nine repeating x. Multiply by ten, and you get ten x equals nine point nine repeating.
Subtract x from ten x, and the endless tails cancel. Nine x equals nine, so x equals one.

Both are easy to remember, and both are pretty convincing.
But honestly, they take a shortcut.
They assume we're allowed to add, subtract, multiply and divide endless decimals just like ordinary numbers. And that's exactly the part your gut doesn't trust.

## What the dots mean

The real reason is in a different place. It's in the question, what does zero point nine repeating actually mean?

When we write nines that go on forever, we're talking about a list of numbers that keeps getting longer.
Zero point nine. Then zero point nine nine. Then zero point nine nine nine, and so on.
The gap to one is a tenth, then a hundredth, then a thousandth.
The list keeps closing in on one, and you can push it as close as you like, just by writing enough nines.

In the real numbers, the numbers we use every day, the symbol zero point nine repeating is defined to be exactly where that list is heading.
And where it's heading is one.
So zero point nine repeating doesn't hover somewhere just before one. It sits exactly on one.

## Nothing fits in between

Here's another way to feel safer about it.
Take any two different real numbers, and there are always more numbers squeezed between them. Their average, for a start.
So try to find a number between zero point nine repeating and one. Bigger than zero point nine repeating, and smaller than one.
You won't find one, because there isn't one.
And if nothing at all fits between two numbers, they can't be two different numbers.

## The gap your gut can feel

I suspect some of you still feel there's a tiny gap left over, somewhere.
And honestly, that feeling isn't silly.
The problem is that in the real numbers, there's no distance that is bigger than zero, but smaller than every positive number.
So there's simply nowhere to put that gap.

But mathematics has built other number systems, where distances that small really are allowed to exist.
Newton and Leibniz worked with quantities like that when they invented calculus, and in the nineteen sixties Abraham Robinson made them rigorous.
Your intuition is pointing toward systems like those.
It's just that the symbol we're talking about lives in the familiar real numbers. And there, it equals one.

## A different question

That's the difference from Monty Hall.
With Monty Hall, intuition got a probability wrong, plain and simple.
Here, the intuition about a gap isn't exactly wrong. It's answering a slightly different question from the one we asked.
You're feeling your way through a world with infinitely small distances, while zero point nine repeating is defined in a world that doesn't have them.
Once it's clear which number system we're talking about, there's nothing left to argue about the symbol.

# ACT THREE — Does math need intuition?

## The engine and the brakes

So, back to the question from the beginning. When you do math, do you need intuition?

The two puzzles show us two different sides of it. Let's put them together.
With Monty Hall, intuition made a real mistake, and logic pulled us back.
But once the logic was done, we could build a better intuition, like the hundred doors, so the next puzzle of that kind doesn't fool us again.
With zero point nine repeating, logic didn't throw your feeling away. It showed you where the feeling came from: a different number system.

Here's my view, after those two examples.
Math does need intuition. But intuition shouldn't get the final word.
Intuition is the engine. It's how people sense that something is true or false, and guess which way to go, often long before they know how to prove it.
Logic and careful proof are the brakes. They keep intuition from driving off a cliff, the way it nearly did with the doors.

## Prove and discover

The mathematician Henri Poincaré put it in one line, in nineteen oh eight.
It is by logic that we prove, but by intuition that we discover.
I think that's still true.
The goal isn't to trust your intuition completely, or to distrust it completely. It's to recognize which situation you're in, so you know when to trust it, and when to check it again.

# ACT FOUR — Putting it together

## Putting it together

When does intuition lead you wrong? When there's information you didn't count, like a host who knows where the car is, or a card with two red sides.
What do you do when the proof is right and your gut still says no? Ask what your gut is actually answering. Often it's a different question, in a different system.
And does math need intuition? Yes, as the engine. With logic as the brakes.

Sometimes, like Monty Hall, the moment you feel most certain is exactly the moment to stop and check.
Sometimes, like zero point nine repeating, the feeling that won't give up is pointing at a deeper question, one worth digging into.
Telling those two apart is the hard part, and the interesting part.

## Next time

Here's something to try on your own.
The next time an answer pops into your head instantly, ask two questions.
Who knows something I haven't counted? And which system of numbers am I standing in?

Thank you for watching all the way to the end.
Which puzzle fooled you more, the doors or the nines? Tell me in the comments.
And subscribe to ninety-nine percent from scratch, so you don't miss the next one. See you soon.

---

## What changed, and why

- **User's three parts kept** as Acts One to Three in their order, with their argument, examples (three doors, a hundred
  doors, the host's assumption; one third × 3, ten x − x, the limit, nothing in between, other number systems; engine and
  brakes, Poincaré) and closing thought; the opening became a cold open with a concrete puzzle, a numbered promise and
  a hanging line; "Putting it together" + "Next time" added (Act Four).
- **Fact fixes (CONTENT.md 1–10):** the vague "red card" question → Bertrand's three-card box, answered at the end of
  Act One (count sides, not cards); "thousands of smart people argued" made concrete (vos Savant 1990, ~10,000 letters,
  nearly 1,000 doctorates, Erdős convinced by simulation); "almost everyone" backed by the 13% study; the random-host
  case given its number (one half); Monty Hall's own "beware"; "the argument disappears" softened to "nothing left to
  argue about the symbol"; the "other number systems" named (Newton/Leibniz infinitesimals, Robinson 1960s); Poincaré
  quoted exactly, with the year.
- **Film 21:** introduced with the game, called back at the assumption beat — the professor says the host "decides" to
  open a door, never that he must; the student's answer depends on unstated rules. No actor names, no quoted dialogue
  beyond two words; the scene is redrawn, not shown.
- **Fills:** the thousand-game simulation (Erdős's way, and the viewer's new intuition); "next time" habit of two
  questions.
- **Misconception beats for the picture:** "fifty percent" for the cards (struck → 2/3); "fifty-fifty" for the doors
  (struck → 1/3 vs 2/3); "two-thirds always" (→ only under the rules; random host 1/2); "zero point nine repeating is a
  little short" (NOT struck — moved to "a different system"); the two quick proofs (marked "shortcut", not wrong).
