# The Hidden Math Inside Every Sudoku

Narration script (English), v1. Source material: transcripts of three Numberphile videos sent by the user
(`SCRIPT.vi.md`, 2026-10-09). This is NOT a transcript: the story is rewritten in the channel's own words, reordered
(rules → the ring → other shapes → the 17-clue proof → "is it just logic?"), and corrected per `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath = one synthesis take (a sentence, or two tightly linked ones); 0.35 s pause after it
- blank line = end of an idea; 0.95 s pause
- `##` = a stop (1.6 s), `# ACT` = act card (2.4 s), `[INTRO]` = the channel signature
- prose with soul, not beat-sized fragments; numbers and symbols written as WORDS

## Cold open

Here's something that's true of every sudoku you have ever finished.
Take the sixteen cells that form a ring around the middle box.
Now take the four little two by two squares in the corners. That's sixteen cells too.
Whatever puzzle you solved, those two groups hold exactly the same digits.
Not the same pattern. The same collection of numbers, every time, in every sudoku ever made.

It sounds like a coincidence. It isn't. And the reason fits into about one minute of careful thinking.

So in this video, I want to answer three questions with you.
One. Why does that hidden ring exist?
Two. How far does the same trick go, and what does it have to do with algebra?
And three. How few clues can a sudoku have, and how do you prove that one fewer is impossible?

And to get there, we only need the one rule you already know.

[INTRO]

# ACT ONE — The rules, and a very big number

## One rule, three ways

A sudoku is a nine by nine grid.
Every row has to contain the digits one to nine, each exactly once.
So does every column. And so does each of the nine three by three boxes.

You start with some digits already filled in. Those are the clues.
And a fair puzzle has exactly one way to finish it.

## Not from Japan

You might think sudoku comes from Japan. The name does, but the puzzle doesn't.
It was first printed in nineteen seventy-nine, in an American puzzle magazine, under the name Number Place.
The setter was most likely Howard Garns, a retired architect from Indiana.
A Japanese publisher, Nikoli, picked it up in nineteen eighty-four and gave it the name sudoku.
And it only became a worldwide craze in two thousand and four, when British newspapers started printing it.

## How many grids?

So how many different finished grids are there?
In two thousand and five, it was counted exactly. About six point seven times ten to the twenty-one.
That's six thousand seven hundred billion billion grids.
Keep that number in mind. It's going to come back and cause a lot of trouble.

# ACT TWO — The ring

## Counting without knowing

Here's the key idea, and it's surprisingly simple.
Take any row of a finished sudoku. You don't know where each digit is, but you know exactly which digits are there.
One to nine, once each. Call that one full set.
The same is true for any column, and for any box.

So if I colour some whole rows, columns or boxes, I can say exactly what the coloured cells hold in total, without solving anything.
Puzzle solvers call this set equivalence.

## Red and blue

Let's colour four things in red. Row three, row seven, and the two boxes on the left and right of the middle.
Four regions, so the red cells hold four full sets of one to nine.
Now colour four columns in blue. The first two, and the last two.
That's also four full sets of one to nine.

So red and blue hold exactly the same digits. Four of each, from one to nine.

## Take away the overlap

Now look at the cells that are both red and blue.
Take one of them out of both groups. Whatever digit is hiding there, we've removed it from both sides.
So red and blue still hold the same digits.
Do that with every cell that has both colours, and the balance never changes.

## What's left

Here's what remains.
In red, sixteen cells, forming a ring around the middle box.
In blue, the four two by two squares in the corners.
And they must hold exactly the same digits.

This is the Phistomefel ring, named after the German puzzle setter who noticed it.
Next time you finish a sudoku, check it. It works on every single one.
And notice that we never solved anything. We only counted.

# ACT THREE — Other shapes

## Four rows, five columns

So can the same trick make other shapes? It can.
This time, colour the top four rows in red. That's four full sets.
And colour the five columns on the right in blue. That's five full sets.
Blue has exactly one set more than red.

## Squares appear

Now remove every cell that's both colours. That's a four by five block along the top.
What's left in red is a four by four square, top left.
What's left in blue is a five by five square, bottom right.
And since we removed the same cells from both, blue still has exactly one full set more.

So the big square holds everything the small square holds, plus one more of each digit from one to nine.
Count the cells. Twenty-five minus sixteen is nine.
Five squared minus four squared is exactly one full set.
And if you add up the digits, the big square always beats the small one by exactly forty-five.

The Dutch setter Aad van de Wetering found a trick of exactly this kind, a square in one corner tied to a square in the opposite corner.
And puzzle setters have taken it much further.

# ACT FOUR — Difference of Squares

## A puzzle built from algebra

Here's a puzzle called Difference of Squares, set by MathGuy underscore twelve.
It follows the normal sudoku rules, plus a few extra ones.
Digits in a cage add up to the number written in its corner.
Digits along an arrow add up to the digit in its circle.
And digits on a purple line are a run of consecutive numbers, in any order.

But some of the cages don't show a number. They show letters.
This cage adds up to x. This one adds up to y.
This long cage adds up to y squared. And this big one adds up to x squared.
Two single cells are each equal to x minus y.
And x and y are positive whole numbers, with x bigger than y.

Almost nothing else is given. So where do you even start?

## Red, blue, and one box

You start with the same colouring.
Red, the top four rows. Blue, the five columns on the right.
Take away the overlap, and the five by five square holds one more full set than the four by four square.

Now take the top left box out of red as well. That's one more full set gone.
So blue now holds exactly two full sets more than red.
And look what's left in red. It's exactly the y squared cage.

## Balance the books

Blue is two sets ahead, so let's give red two more sets.
Add the whole of the last column to red, and the whole of the bottom row.
Now red and blue hold exactly the same digits again.
Notice the bottom right corner cell. It's in red twice now, and in blue once.

Remove everything that's in both colours, one copy at a time.
Then let the arrows do the rest.
These two red cells on an arrow add up to that blue circle, so take out all three.
The same happens here, at the bottom.
And the corner cell, still red once, is the circle of this arrow, whose three cells are blue. Out they go.

## The equation

Here's what survives.
In blue, only the x squared cage.
In red, the y squared cage, the x cage at the top right, and the y cage at the bottom left.
So x squared equals y squared plus x plus y.

That's algebra, and we can finish it.
Move y squared across. x squared minus y squared equals x plus y.
The left side is a difference of squares, so it's x minus y, times x plus y.
And x plus y isn't zero, so x minus y must be one.
The puzzle's title wasn't decoration. The grid itself is a difference of squares, and so is the equation.

## Two ones, and a range

So both x minus y cells are ones.
That puts a one in the bottom row. So the y cage, two different cells in that row, must be at least two plus three. y is at least five.
And the y squared cage can't be too big.
Its column part and its row part are runs of three, at most seven plus eight plus nine each, and the corner cell has to be different from all of them.
So the most it can hold is fifty-four. Sixty-four is out of reach, so y is at most seven.
y is five, six or seven, and x is one more.

## The rest of the grid

Pinning down exactly which takes many more steps.
When the Cracking the Cryptic channel solved it on video, the full solve took close to an hour.
Here is where it lands. x is eight. y is seven.
The y squared cage adds up to forty-nine. The x squared cage adds up to sixty-four.
And sixty-four minus forty-nine is fifteen, which is exactly eight plus seven.

# ACT FIVE — Seventeen clues

## How few?

Newspaper sudokus usually give you around twenty-five clues.
So here's a natural question. What's the fewest clues a puzzle can have, and still have only one answer?

For years, people found puzzles with seventeen clues. Tens of thousands of them.
But nobody ever found one with sixteen.
Every sixteen-clue puzzle anyone tried had more than one answer.
That's a strong hint. But not finding something isn't a proof that it doesn't exist.

## Too big to search

The obvious way to prove it is to check everything.
Take every possible grid, try every way to keep just sixteen clues, and see whether any of them has only one answer.
But there are about six point seven times ten to the twenty-one grids.
And in each grid, there are about three point four times ten to the sixteen ways to choose sixteen cells.
Even for a supercomputer, that's hopeless.

## Families of grids

So the first step was to stop checking grids that are really the same.
Swap two rows inside the same band of three, and you still have a valid grid.
Swap two whole bands, swap columns the same way, turn the grid on its side, or relabel the digits, swapping every three with every five.
All of these give valid grids, and they keep a puzzle's clue count too.
So grids come in big families, and you only need to check one grid from each family.
That cuts six point seven times ten to the twenty-one down to about five point five billion.

## Patterns that must be broken

The second step cuts down the clues.
Suppose a seven and a nine sit in one row, and another seven and nine sit in the same two columns, a few rows down, in the same two boxes.
Then you could swap the sevens and the nines in those four cells, and the grid would still be perfectly valid.
So a puzzle with only one answer must have a clue in at least one of those four cells.
These sets of cells are called unavoidable sets.
Find enough of them, and most ways of placing sixteen clues fail immediately, without any solving at all.

## Seven million hours

In two thousand and eleven, Gary McGuire, a mathematician at University College Dublin, ran this search with Bastian Tugemann and Gilles Civario.
It took about seven million hours of computer time, running for the whole year on a supercomputer in Ireland.
And it found nothing. No sixteen-clue sudoku with a unique answer exists.
Since seventeen-clue puzzles do exist, seventeen is the minimum.
They announced it in January two thousand and twelve.

# ACT SIX — Just logic?

## A computer can do it

Some people, including some mathematicians, find sudoku a little dull.
It's pure logic, and a computer can solve any newspaper sudoku in a fraction of a second.

And that's true. But notice what the computer can't do.
It can solve a grid without ever noticing the ring.
It can't tell you why the ring is there, or that a square of twenty-five cells beats a square of sixteen by exactly forty-five.
Even the seventeen-clue proof only finished in a year because people first understood the families and the unavoidable sets.
The search was computing. Knowing what to search was mathematics.

## Putting it together

So, the three questions.
Why does the ring exist? Because two groups of whole rows, columns and boxes hold the same digits, and taking away the overlap keeps them equal.
How far does the trick go? Far enough to turn the grid into algebra. Five squared minus four squared is one full set of digits, and a whole puzzle can hide x squared minus y squared.
And how few clues can a sudoku have? Seventeen. Proven by cutting a hopeless search down to a year of computing.

## Next time

Next time you finish a sudoku, don't throw it away straight away.
Circle the ring around the middle box, and the four corners, and compare.
Then add up the four by four square in the top left, and the five by five square in the bottom right.
The difference will be forty-five. Every time.

Thanks for watching. See you in the next one.

---

## What changed, and why

- Reordered: the user's sources are three separate videos (ring, Difference of Squares, 17 clues). The script runs
  rules → ring → other shapes → Difference of Squares → 17 clues → "is it just logic?", each act answering one question of the promise.
- Fixed: "sudoku comes from Japan, big in the 1980s" → Number Place, Dell, 1979 (most likely Howard Garns); Nikoli
  1984; worldwide craze 2004 (CONTENT fix 1).
- Fixed: the unavoidable rectangle needs the four cells in exactly two boxes (CONTENT fix 2).
- Dropped: "300,000 years" (no source found; CONTENT fix 3), the Jerry Maguire joke, the in-studio banter.
- Added (user, 2026-10-09: "dựng thêm giải chi tiết câu đố"): ACT FOUR solves the break-in of MathGuy_12's
  Difference of Squares (data from SudokuPad, checked in code), the two-ones step and the range 5 ≤ y ≤ 7.
- Added: the 5 × 5 vs 4 × 4 identity derived from the same colouring (25 − 16 = 9 cells, sum difference 45),
  checked in code on 20,000 grids; 5,472,730,538 essentially different grids; the closing argument that knowing what
  to search is the mathematics (answers the source's "pure logic" remark instead of repeating it).
