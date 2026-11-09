Tư liệu người dùng gửi 2026-10-09: lời thoại (transcript) của ba video Numberphile về sudoku, giữ nguyên văn để đối
chiếu. Đây là TƯ LIỆU của kênh khác, không phải kịch bản của kênh: `SCRIPT.md` viết lại bằng lời của kênh, sắp lại
mạch, sửa lỗi (CONTENT.md).

1. "A Sudoku Secret to Blow Your Mind" — Simon Anthony (Cracking the Cryptic): vòng Phistomefel, set equivalence.
2. Tiếp theo: câu đố "Difference of Squares".
3. "17 clue sudoku" (số trong tin tức) — James Grime: Gary McGuire, chứng minh 17 gợi ý.

---

We're going to talk about sudoku and in particular something called the
Phistomefel ring.

Phistomefel ring?

Well it's named after a German sudoku constructor called Phistomefel, who
discovered it a couple of years ago. And it's a property that exists in all
sudoku puzzles, but not many people know about it and it's got quite a lovely
proof and it might blow your mind.

It might, alright.

It might.

Is it useful, like is this a secret that will help people solve sudokus?

It can definitely help you solve some sudokus and yeah maybe shall I show you?
So maybe while I'm doing this I'll tell you... I'm sure everybody watching
Numberphile knows the rules of sudoku. The idea of sudoku is you have to put the
numbers one to nine just once each into every row, every column, and into every
three by three box. That is our sudoku. And what I'm going to show you now is
something called set equivalence theory. So we know that in this sudoku, if we
complete it correctly, there'll be the numbers one to nine once each in every
row, column and box. So I'm now going to highlight some cells in red. So I'm
going to highlight row three, row seven, this box, this whole box here, and box
six. And the interesting thing about those four things I just highlighted is
because of the properties of sudoku we actually know... We don't know what the
disposition of the digits will be within those red cells, but we do know exactly
what those red cells contain altogether. Because it's four complete sets of the
digits one to nine. One for this row, one for this row, one for this box and one
for this box. So altogether we know that the red cells here contain four sets of
the digits one to nine. Now I'm going to switch to green and I'm going to
highlight a different four sets of the digits one to nine. So I'm going to
highlight the whole of... Can we see that that's green? So I'm going to
highlight the whole of column one, the whole of column two, the whole of column
eight, and the whole of column nine. Okay. So now let's describe the green set
of digits. That's also four sets of digits one to nine. One for each of the
columns. So at this point we know that the set of the green cells if you like
and the set of the red cells are identical. Each equal to four sets of the
digits one to nine. Now the trick to understanding the Phistomefel ring is to
focus on one of these cells that has two colors in it. So let's look at this
cell here. And imagine that we removed it from both the green set and the red
set. So let's imagine that we just take this out, I'll make it blue. So I'm
removing this from both the green set and the red set. What can we say about the
remaining cells now in green and red? And the thing we can say is that they
still contain the same set of digits. We don't know now exactly what that set of
digits is because we don't know what digit will fill in row three column one in
the final solution. But we do know that the red set and the green set are still
equivalent. They are still equal. And we can do that for every single cell in
this puzzle that contains both colors. We can remove it from both the green set
and the red set. Let's now focus on what we've got left now. So we know at this
point that the green and the red sets are still equivalent. And if we look at
the red set you can see 16 cells here ringing the central box of the sudoku. Now
this is the Phistomefel ring. And we know that that is exactly the same digits
as appear in the four corners of the sudoku. These four two by twos in the
corners. And you can try this on any sudoku you solve on your train home. Fill
it in and then ring this central box and compare those digits to the corners two
by twos. And you will find that this works. It works for every sudoku and it's
quite... I think it's quite magical.

One of the questions that pops into my head is, could you make any other shapes
or configurations on a grid that have this property?

Brady, you are brilliant. Yes you can indeed. And in fact there's a famous Dutch
constructor called Aad van de Wetering, who he found another trick. He found
that there's a square in the top left of a sudoku and a square in the bottom
right of the sudoku that have a relationship using exactly this trick. And we've
even seen puzzles now where you can use this feature to create the difference of
squares equation in sudoku form. It sounds completely crazy but you can see it
on the screen here. And you can create some mathematics out of the geometry of
sudoku that actually can yield to some really beautiful results. So and it's
very much in sort of really advanced sudoku solving, this equivalence of
different parts of the geometry of the grid is important and can crack some
fiendish puzzles.

---

When you think about the constraints on a sudoku grid, and obviously there's the
famous one, you've got to have one to nine in these rows, columns, and...

But this is another constraint on a sudoku.

It's amazing that so many are possible, it's amazing they can make so many
different ones.

Uh yeah, the world of sudoku, um, it's almost a sort of bottomless pit. We've
just done the Phistomefel ring, and we saw how sets of different digits can be
important. I'm going to show you something mad now, which is where sudoku
constructors have taken this sort of thinking. I don't know if you can see this
grid here, but there's a few things to know about the rules of sudoku as they
apply in this grid. So you can see there are some cages in the grid. So the
digits in this cage have to sum to y to the power of two. The digits in this
cage have to sum to x to the power of two. And the only other thing you really
need to know is that these see these arrows with circles, the digits along the
arrow have to sum up to the digit in the circle. So if this was a one and this
was a two, this would be equal to three. This puzzle involved trying to work out
what x and y were. And using the Phistomefel ring and the ideas of set theory,
you can work it out. And that's what I'll try and show you now.

It also has to obey the normal sudoku rules of the columns, the rows and the
squares.

Yes it does, it does indeed. Let me start. So this time we're going to highlight
the first four rows of the grid using the red pen. And again we know that the
red cells are four sets of the digits one to nine altogether. And now our green
cells this time are not going to be quite the same. So I'm going to highlight
five complete columns. So in this instance we've got four sets of the digits one
to nine in the red cells and five sets of the digits one to nine in the green
columns. And we can see if we look carefully again, let's use my blue pen, this
portion of the grid has two colors in every cell. So we can remove all of these
from both sets and we know that the difference between the red set of tiles and
the green set of tiles is still one set of the digits one to nine. Because we
had four sets versus five sets, we've removed the same thing from both, so the
difference is still one set of the digits one to nine. I want to imagine that we
remove this, box one, this box here from the red set. So now what's the
difference between the red tiles we've got remaining and the green tiles we've
got remaining, is now two sets of the digits one to nine. So we're going into
mad lands now. But we can actually use this to solve this puzzle. Because what
we've got remaining in red is just this cage which we know sums to y to the
power of two. And what we've got left in the bottom of the grid is all of those
squares. So it's all of these squares versus this cage, the difference is two
sets of the digits one to nine. And this is where constructors get even more
crazy because they say okay, well what would happen if we equalized those
differences? So what we could do is add the whole of column nine into red. And
what we could do is add the whole of row nine into red. And if we did that, this
cell is obviously twice in red now, this cell here. But if we do that red and
green are now equivalent again. Because we've added one complete set, one more
complete set of red into the red set and another complete row of the sudoku, so
that's another complete set of the digits one to nine into the red set. So at
the moment the red and the green are now equivalent. And now you can play some
games to isolate this cage which I hopefully you can see is x to the power of
two. And the way that you do that is you take out just as we did before, you
take out the cells from both sets that are common, which is this one, this one,
this one, this one, this one, this one, this one, and this one. And if you look
very carefully now you can see that these arrows which have to add up to the
same number, these two digits here sum up to the same as a digit in the green
set. So if we were to take these two digits out of red and take this digit out
of green, the set still should sum to the same number. We can take these two out
and knock this one out. And look at what we're left in the corner. We've got
this cell here which was twice in red and once in green. So if we cancel that
once from red and once from green we end up with it being once in red. And it
cancels out with its arrow here like that. And we now have an equation where we
have proved that what is left in red is exactly equal to what is left in green.
And this is the difference of squares. Because you can see that x to the power
of two is equal to y to the power of two plus x plus y from these cages. And
that allows you, if you can solve that equation, you'll find out that x and y
differ by exactly one and that allows you to solve the puzzle.

Simple.

Not simple, but actually once you start to understand Phistomefel, achievable.
And quite magical. And the thing I really love about this puzzle is the puzzle
title was a Difference of Squares. And it results in a mathematical difference
of squares being the equation. But that equation is derived from what we did at
the start which was to find the geometric difference of squares in the grid. So
it's sort of the title is hinting at the geometry and hinting at the maths
involved. It's really beautiful.

Simon, did the person who set this puzzle realize this was the way it could be
solved or are there other ways to do it?

Yeah, this was set by mathguy_12, who is a mathematician. I think they are doing
a PhD in number theory and they wanted to set a puzzle that could explain to a
layman about the difference of squares and they achieved it in this sort of
magical way. It's the first puzzle I believe they've ever set. So it's quite an
incredible debut.

You couldn't solve this like people on the train by putting... does a one work
there, does a two...

No, I invite you to try. I don't think you could get through it. Maybe if you
gave yourself a hundred years and you guessed a lot you could do it by
iteration, but it wouldn't be fun.

---

Right, we're going to talk about numbers in the news because uh just recently uh
the number 17 was in the news. This is one for sudoku fans because uh it's just
been recently proved by a man called uh Gary McGuire, he's a mathematician at uh
University College in Dublin has proven that a sudoku uh need at least uh 17
clues to solve it.

So sudoku, if you don't know what they are, uh they were they come from Japan,
they were big in the 1980s but then so were many things, but here is a sudoku.
It's a nine by nine grid and the the idea is you fill every row with the numbers
one to nine uh without repeats, uh you fill every column with the numbers one to
nine without repeats, and then ad- for extra difficulty you fill these uh little
squares, these three by three squares, with the numbers one to nine without
repeat. And the idea with sudoku is uh they'll give you some clues, they'll
clear most of this away, it'll look something like this. They'll give you some
clues and they'll ask you to complete the sudoku grid, uh and the idea is just
there should only be one way to complete the sudoku grid. If you see them in the
newspapers, the newspapers give you about 25 clues to solve the grid, but what
sudoku fans were interested in was what is the fewest number of clues that you
need to solve that grid. And uh the sudoku fans tried to find the fewest numbers
you needed. They found puzzles that had 17 numbers, but they couldn't find any
puzzles with 16 numbers. Uh if you tried to find puzzles with 16 numbers, the
answer you got wasn't unique, you could get one or two answers from that puzzle.
So they thought maybe 17 is the smallest number you needed. And so just at the
beginning of this month this was proved uh by Gary McGuire uh who did a method
which was partly mathematics and partly using computer power.

Let's talk about how many sudokus there are. Right, if I want to fill a sudoku
grid like this, the number of possible sudoku grids is, let me write this down
for you, let's see, number of grids, let's put an 's' on the end of that, number
of sudoku grids is, well in words it's 6,700 million million million. Uh
mathematicians write it like this, 6.7 times 10 to the 21. So this is the number
of sudoku grids that there are. Now um importantly uh what they were saying is
they're not saying that every sudoku grid can be solved with 17 clues, they are
saying that there are no sudoku grids that can be solved with 16 or fewer clues,
not uniquely anyway. So one way to solve this puzzle is to uh take all the
possible sudoku grids and check all of them for 16-clue starting positions and
to check if they give you a unique answer. That's one way to do it. It's a brute
force way to do it. How many ways are there to pick 16 clues from my sudoku
grid? That number, 16 clues, I can't spell! Ha. 16 clues is around about 33
million billion, around about 33 times 10 to the 16. I think I've got that, 3.3
times 10 to the 16. Now this is a massive number. The problem was, uh the guy
who worked this out, Gary McGuire, if he he estimated that if he used the method
that he already had, uh it would take a computer around about 300,000 years to
check every possible sudoku grid for every possible 16 clue starting position.
So he had to make the problem more simple than that. This is what he did.

You see, uh sudokus, what you can do is if I took the first two rows and swapped
them over, it would still be a valid sudoku grid. That's allowed. Right? It's
the same if I took any of those first three rows and swapped them over, you
would get a valid sudoku grid. The same is true for the next three rows, if you
swapped them over you would get a valid grid. And the last three rows, you swap
them over, you get a valid grid. And these bands as well, if you take these as
bands and swap the bands over, you get a valid grid. So, if you had a
valid 16-clue starting position, it would still be a valid 16-clue starting
position when you start to swap the rows. What you get is a whole family of
sudokus. Uh it's the same for the columns. Uh it's the same if I rotate the
grid. And it's the same if I start to swap the numbers, if I took all the threes
and swapped them with all the fives, you still get a valid grid. You get a whole
family. So all you need is one representative from each family of sudoku grids.
Now how many of those are there? So all they needed to do is check one
representative from each family.

Now they could also reduce the number of 16 clues that they had to check, this
number. What you can do, here's my sudoku grid again. Take a look at this. You
see this seven and nine, and down here I've got another seven and nine in the
same columns. Now if I swap the sevens and nines over, I get another valid
sudoku grid. Now I don't want to get two possible answers from my sudoku puzzle.
So if I want a unique solution, one of my clues has to be one of these four
numbers. These are unavoidable squares. So you- at least one of your clues has
to be from those squares. So if you can find the unavoidable squares, that
reduces the number of 16 clues you have to check. That's what they did. So they
were looking for unavoidable squares, checking for these uh representatives from
families of sudoku grid, then they started to uh by brute force with a computer
analyze them. It took them seven million computer hours to do it, they started
in uh January 2011, they finished the project in December 2011, and they proved
that nothing they checked, you couldn't get a 16 clue puzzle from all these
sudoku grids. We know 17 puzzles exist, 17-clue puzzles exist, so therefore they
proved it. 17 is the smallest amount of squares, it's the fewest clues you need
to solve a sudoku grid, uniquely, and that's the most important part.

Scientists and mathematicians get asked this all the time but if there's ever an
appropriate time to ask this, this seems like it. Surely there are better things
to do with your time.

Yeah, like completely understand, completely understand. Well for a start we're
talking about it because it's a bit of fun right, and people know what sudoku
are so they can understand the puzzle that I'm trying to solve here, the
problem. Um, by doing this, the met- it's a hard problem, it's a hard problem,
the methods that they had to develop to solve this problem can be used in other
perhaps more serious applications, in other problems in mathematics, in other
problems in combinatorics, and so it's- although it seems like it's a trivial
thing, it actually pushes the boundaries of our knowledge. So it turns out not
to be so. Do you want to hear my Gary McGuire joke?

Go on.

So this is my Gary McGuire joke. Gary McGuire is the guy who solved this puzzle,
right here's my Gary McGuire joke. What did the sudoku say to Gary McGuire? You
complete me. That's a reference to the film Jerry Maguire. Yeah, yeah, it's like
a joke. Not much like one, I'll give you that.

I, I have to be honest, sudoku for me uh are not my favourite type of puzzles
because it is a game of pure logic. Now people think mathematicians are just you
know logic machines, like we're robots, uh but that isn't what mathematics is
about, I'm very keen to stress that this isn't what mathematics is about, it's a
much more creative thing than that. And so for me because this is a game of pure
logic that I know a computer can do, I have no interest in it. But this is very
popular with people, um crosswords enthusiasts and sudoku enthusiasts, these are
a very popular kind of puzzle.
