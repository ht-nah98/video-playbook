# Imaginary Numbers Explained: What's Halfway Between 1 and −1?

Narration script (English), v2 (2026-11-02: mở bài nhanh hơn, tư liệu thật). Video đứng riêng: không nhắc, không dẫn sang video khác. Numbers: `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath; blank line = end of an idea; `##` = a stop, `# ACT` = act card
- numbers and symbols written as WORDS, each with a row in `spoken.json`

## Cold open

What number is exactly halfway between one and minus one?
Zero, if you walk along the line. But turn instead, and halfway through the turn you land on a number that isn't on the line at all.
In the fifteen hundreds, that number was the only road to a correct answer.
Descartes called it imaginary, and he meant it as an insult.
Today, it helps engineers run the power grid.
By the end of this video, you'll be able to point at it, and you'll see exactly why real machines use it.
It all starts with one question: what does multiplying actually do?

# ACT ONE — The square that can't be negative

## Multiplying is a move

Draw the number line, and treat every number as an arrow starting from zero.
Now multiply by two. Every arrow gets twice as long. Three lands on six, and minus one lands on minus two.
So multiplying by two isn't only a sum. It's a move you apply to the whole line: a stretch.

What move is multiplying by minus one?
Three goes to minus three. Five goes to minus five. Minus two goes to two.
Everything swaps sides. It's a flip through zero.
And flip twice, you're back where you started. That's one way to see why a negative times a negative is positive.

## The question with no answer

Now here's the question that causes all the trouble.
Is there a number you can multiply by itself to get minus one?
In other words, is there a move which, done twice, gives you a flip?

Try it on the line. A positive number keeps every arrow on its own side, and doing that twice still keeps it there.
A negative number swaps sides, and swapping twice brings you back.
Either way, the same move done twice can never end on the opposite side. So on this line, no number squares to minus one.
For a long time, that was the end of it. Ask for the square root of a negative, and the honest answer was: that's a badly posed question.
And it would have stayed that way, if it hadn't been for an equation that already had a perfectly good answer.

# ACT TWO — The impossible step to a correct answer

## An answer of four

In fifteen forty-five, the Italian scholar Gerolamo Cardano published a formula for solving cubic equations, the ones with x cubed in them.
But the formula had a strange problem.

Take x cubed equals fifteen x plus four.
You can check by hand that x equals four works. Four cubed is sixty-four, and fifteen fours plus four is also sixty-four.
So there's a real answer, and it's a small whole number.
But feed the equation into the formula, and halfway through it asks for the square root of minus one hundred twenty-one.

You might think that means the formula simply doesn't apply here. That's what you'd normally conclude when a calculation asks for something impossible.
But the answer exists. We just checked it. The formula was pointing at a true result, and its only road went through a number that wasn't allowed.

## Walking straight through

In fifteen seventy-two, an engineer named Rafael Bombelli tried something bold. He ignored the objection and kept calculating.
He treated the square root of minus one as an unknown symbol, with one rule: its square is minus one. Otherwise, normal algebra.
The formula then wanted two cube roots, and Bombelli found them: two plus that symbol, and two minus that symbol.
Now add those. The two and the two make four. The symbols, one plus and one minus, cancel out.
Four. The exact right answer, and the impossible part had vanished on the way out.

So nobody accepted this number because it sounded nice. It was accepted because it kept producing correct results, while no one could say what it was.
In sixteen thirty-seven, Rene Descartes used the word imaginary for quantities like this, and it wasn't meant as a compliment.
The symbol we use now, the letter i, came later. But the real question stayed open. A rule isn't an explanation. What is this thing?

# ACT THREE — A direction nobody had looked in

## Leaving the line

The answer turned up around eighteen hundred, published by Caspar Wessel and then Jean-Robert Argand, working separately.
And it's almost embarrassingly simple. We already showed no move on the line works. So stop staying on the line.

Look at that flip again. There's another way to send one to minus one, three to minus three, and everything to its opposite.
Rotate the whole line half a turn around zero.
The result looks exactly the same as the flip, but now the move has a middle.
Stop halfway through the rotation. You've made a quarter turn, and the arrow from zero to one is now pointing straight up, off the line.

There's your move. A quarter turn, done twice, is a half turn, and a half turn is multiplying by minus one.
So the square root of minus one isn't a mysterious quantity. It's a quarter turn. And the point one step straight up from zero is what we call i.

Now we can answer the opening question properly. Walk along the line from one to minus one, and halfway is zero.
Turn from one to minus one, and halfway is i. Turn the other way around, and halfway is minus i.

## Four turns and home

Keep multiplying by i, and you simply keep turning.
One, then i, then minus one, then minus i, then back to one. Four quarter turns, a full circle.
So a question that looks terrifying, like i to the power of one hundred, is easy. One hundred is twenty-five full circles, and you end exactly where you began: one.

The name imaginary makes this sound more mysterious than it is.
Minus one isn't something you can hold in your hand either. It's a direction on a line. And i is just one more direction, the one we weren't looking in.

# ACT FOUR — The multiplication that turns

## Numbers on a flat page

Once there's a direction up, every point on the page becomes a number.
Three to the right and two up is three plus two i. We call these complex numbers, and complex here means built from parts, not difficult.

Now test the idea. Multiply three plus two i by i, using plain algebra.
Three times i is three i. Two i times i is two i squared, which is minus two.
You get minus two plus three i. Now look where that point landed.
It's the same arrow, the same length, rotated exactly a quarter turn. Algebra did geometry without being told to.

And it works for every complex number, not only i. Each one is an arrow with a length and an angle.
When you multiply two of them, the lengths multiply, and the angles add. That's the entire rule.
Take one plus i. It points at forty-five degrees, and its length is the square root of two.
Square it. The angle doubles to ninety degrees, and the length becomes exactly two. That predicts two i.
Check with algebra: one, plus two i, plus i squared. The one and the minus one cancel, and two i is what's left.

## What Bombelli actually found

That rule finally explains the trick from fifteen seventy-two.
Bombelli's two plus i is an arrow with an angle of about twenty-six and a half degrees. Cube it, and the angle triples to almost eighty degrees, nearly straight up, landing precisely on two plus eleven i.
Its mirror image, two minus i, cubes to two minus eleven i, and that eleven i is the square root of minus one hundred twenty-one.
Now add the two arrows. One goes up, its mirror goes down by the same amount, and what's left lies flat on the ordinary line. Two plus two: four.
That's why a real answer had to pass through the imaginary. The formula's path left the line and came back. The real number was the shadow of something happening on the plane.

# ACT FIVE — Why engineers need it

## Waves are turning arrows

So why does the power grid care?
The electricity from a wall socket swings forward and back in a smooth wave, around fifty or sixty times every second.
Picture an arrow turning steadily in a circle, and watch only its height. Up, down, up, down. That height traces out exactly that wave.
So every smooth wave can be treated as the shadow of a rotating arrow. And we now have numbers that rotate.

Here's why that helps. Suppose two waves are pushed through the same circuit, one peaking at three volts, the other at four volts, and the second runs a quarter cycle behind the first.
What's the peak when they combine? You might say seven. It isn't, because they never peak at the same moment.
With arrows, a quarter cycle is a quarter turn. So the two waves are three and four i, at right angles.
Add them, and the length is five. The combined wave peaks at exactly five volts.

Without complex numbers, you could still get that answer, but through pages of trigonometry. With them, it's one short addition.
Scale that up to a whole circuit, full of coils and capacitors that shift waves in time, and it's the difference between a page of algebra and something truly painful.
Electrical engineers use this so much that they write the number as j, because i was already taken for current.
Radio signals, audio processing, and the equations of quantum mechanics all rely on it as well, for the same basic reason. Things that oscillate are things that turn.

# ACT SIX — Putting it together

## Putting it together

Why was anyone forced to accept it? Because a correct answer of four could only be reached by passing through the square root of a negative.
What is it? A quarter turn. And the point one step above zero, in a direction the number line never showed us.
Why is it useful? Because multiplying complex numbers rotates, and anything that oscillates can be treated as something rotating.

So try this with a pencil. Mark any point on a sheet of paper as a number, like two plus i, and multiply it by i four times.
Then plot each answer. You won't need anyone to tell you what i means. You'll watch your point walk around a circle and come home.

Thanks for watching, and if this made a strange idea feel obvious, subscribe to ninety-nine percent from scratch.

---

## Package

| | |
|---|---|
| Thumbnail | Cậu bé anime nhìn lên, bối rối; trục số −1 … 1; mũi tên cong vồng lên khỏi trục; chữ lớn "NOT 0?!" |
| Title | Imaginary Numbers Explained: What's Halfway Between 1 and −1? |
| 0–5 s | Hai chấm 1 và −1 trên trục, chấm giữa hiện dấu hỏi; caption = câu đầu |
| Pair check | Thumbnail "NOT 0" và title không chung từ khoá |
| 5–25 s | Lát cắt mỗi câu một hình: mũi tên vồng → Ars Magna + √−121 → La Géométrie + dấu IMAGINARY → cột điện thật + sóng → mũi tên chỉ i |
