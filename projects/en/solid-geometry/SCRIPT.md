# Solid Geometry from Scratch

Narration script (English), v1. Written from the user's Vietnamese narration (`SCRIPT.vi.md`, 2026-10-09), keeping
its ten parts and their order. Fixed and filled per `CONTENT.md`. The examples are changed for an international
audience (the user, 2026-10-09: "Tiếng Anh, thay đổi ví dụ sao cho phù hợp người nước ngoài").

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

Fill a pyramid with water, and pour it into a box with the same base and the same height.
It doesn't fill the box. You need exactly three.
Any pyramid, any matching box. It's always one third.
And a ball that fits snugly inside a cylinder? It fills exactly two thirds of it.
Why those numbers? To see it, we need geometry in three dimensions, and it's simpler than it looks.

By the end of this video, I want to answer three questions with you.
One. What are the few simple rules that the whole subject is built on?
Two. How do you measure an angle, or a distance, between things that never even touch?
And three. Where do the volume formulas come from, including that strange one third that keeps showing up?

And it all starts with three ideas so simple that mathematics doesn't even try to define them.

[INTRO]

# ACT ONE — Three bricks

## Point, line, plane

Every building needs a foundation. And the foundation of solid geometry is three basic ideas: the point, the line, and the plane.
You already know points and lines from flat geometry. The new character here is the plane.
Picture the top of a table, or the surface of a perfectly still lake.
Now stretch it out forever in every direction, and make it so thin that it has no thickness at all.
On paper, we usually draw a plane as a slanted parallelogram, and give it a name with a letter, like plane P.

Here's the interesting part. Mathematics never defines these three ideas in words.
Instead, it describes how they behave, through a few properties that we simply agree to accept. They're called axioms.

## Four rules

Rule one. Through two different points, there is exactly one line. Just like on flat paper.

Rule two. Through three points that don't lie on one line, there is exactly one plane.
This is why a three-legged stool never wobbles, even on an uneven floor.
The tips of its three legs always pin down exactly one plane, so all three can touch the ground at once.
A four-legged chair has no such guarantee. The fourth leg can end up just off the plane of the other three, and the chair rocks.
It's also why a camera tripod has three legs, and not four.

Rule three. If two points of a line lie in a plane, then the whole line lies in that plane.
You can check this with a ruler on a table. If both ends of the ruler touch the table, the entire ruler lies flat against it.

Rule four. If two different planes share one point, then they share a whole line through that point. That line is called their intersection.
Look up at the corner of your room, where a wall meets the ceiling.
That straight edge you see is the intersection of two planes, the wall and the ceiling.

## Three ways to pin a plane

From these rules, we get three ways to fix a plane in place.
Three points that aren't on one line.
A line, and one point that isn't on it.
Or two lines that cross each other.

# ACT TWO — Where things can be

## The map

Once we have points, lines and planes, the next question is: how can they sit relative to each other?
This part can sound dry, but it's actually the map for everything that comes after.

## Two lines

On a flat page, two lines have only two options. They cross, or they're parallel.
In space, a third option appears, and it's a special one. Two lines can be skew.
Skew lines don't cross, and they aren't parallel either. There's no single plane that contains both of them.

You can find a pair right in your room.
Take the top edge of the wall in front of you. Now take the vertical edge of the side wall, at the end nearest to you, where it meets the wall behind you.
Those two edges never meet. But they aren't parallel either, because one runs sideways and the other runs straight up.
Careful, though. The vertical edge in the far corner does meet the top edge, right in the corner. That pair crosses.

Another example is a highway overpass.
The center line of the road on the bridge, and the center line of the road underneath, are skew.
That's exactly why the cars can pass over each other without ever colliding.

## A line and a plane

A line and a plane have three options.
The line can lie entirely inside the plane.
It can cut through the plane at exactly one point, like a needle through a sheet of paper.
Or it can be parallel to the plane, with no point in common at all, like a straight cable stretched above a road.

## Two planes

Two different planes have exactly two options.
They can cross along a line, like the two pages of an open book meeting at the spine.
Or they can be parallel, with nothing in common, like the floor and the ceiling of the same room.

Once these three groups feel solid, the next two parts get much easier.
Because those parts are really just a closer look at two of the cases on this map.

# ACT THREE — Parallel

## A stand-in

Being parallel comes down to one simple idea: two things that keep the same distance from each other forever.
But to prove that something is parallel, we need a few theorems that act as bridges.

The most important one, for a line and a plane, says this.
If a line is not in a plane, and it's parallel to some line that is in the plane, then it's parallel to the whole plane.
In plain words, to show that line d is parallel to plane P, you just need to find a stand-in inside P that's parallel to d.
This is the move behind almost every proof of parallel lines and planes.

## Which way the cut goes

There's a useful result in the other direction too.
If line d is parallel to plane P, then any plane that contains d and cuts P, cuts it along a line that's parallel to d.
This is the key to a whole family of problems where you slice a solid with a plane. It tells you which direction each cut has to run.

## Two directions lock a plane

To recognize two parallel planes, we use this theorem.
If one plane contains two crossing lines, and both are parallel to a second plane, then the two planes are parallel.
Notice the condition: two lines that cross.
One line isn't enough. A plane can still swing around that single line, like a door on its hinge, until it hits the other plane.
You need two different directions, both parallel, before the plane is locked in place.

And once two planes are parallel, there's a neat consequence.
Any third plane that cuts through both of them cuts them along two lines that are parallel to each other.

# ACT FOUR — Perpendicular

## Every line in the plane

If parallel lines have the beauty of regularity, perpendicular lines have the strength of stability.
Almost everything we build stands up because of right angles. Columns stand perpendicular to the ground. Walls stand perpendicular to the floor.

The central idea here is a line perpendicular to a plane.
A line is called perpendicular to a plane when it's perpendicular to every single line in that plane.

## Two are enough

At first, that sounds impossible to check. A plane contains infinitely many lines. Surely we can't test them one by one?
Luckily, there's a theorem that cuts the work down to almost nothing.
If a line is perpendicular to two crossing lines in a plane, then it's perpendicular to the whole plane.
It may be the single most used theorem in all of solid geometry. I'd suggest knowing it as well as your times tables.

## The theorem of three perpendiculars

From here we get a powerful tool, called the theorem of three perpendiculars.
Take a line, call it a, lying in plane P. And take a second line, b, that isn't in P, and isn't perpendicular to P either.
Shine a light straight down onto P, and line b casts a shadow. That shadow is called its projection.
The theorem says: a is perpendicular to b, exactly when a is perpendicular to b's shadow.
What makes it valuable is that it lets you trade a line floating in space for its shadow lying flat in the plane.
And suddenly a problem in space becomes a familiar problem on a flat page.

## Two planes at a right angle

Next comes two planes that are perpendicular, meaning the angle between them is ninety degrees.
The usual way to recognize it: if one plane contains a line that's perpendicular to the other plane, then the two planes are perpendicular.
A wall is perpendicular to the floor precisely because the wall contains vertical lines, and each of them is perpendicular to the floor.

And there's one consequence worth remembering, because it shows up all the time.
When two planes are perpendicular, draw a line in the first plane that's perpendicular to their intersection.
That line is then perpendicular to the whole second plane.
It's a shortcut for building perpendicular lines, and you'll need it in a lot of distance problems later on.

# ACT FIVE — Angles

## In between

Once we can sort things into parallel and perpendicular, the next job is to measure everything in between.
For example, how steeply is a ladder leaning against the floor?
There are three kinds of angle to know.

## Two lines

The first is the angle between two lines.
If the lines cross, you can measure the angle directly.
The trouble is skew lines, because they never meet, so there's no corner to measure.
The trick is to slide one line, or both, without turning them, until they meet at a point, and then measure the angle right there.
Sliding a line doesn't change its direction, so the angle you get is a true measure of how differently the two lines point.
By convention, the angle between two lines is always taken between zero and ninety degrees.

## A line and a plane

The second is the angle between a line and a plane.
It's the angle you feel when you look at a ladder leaning on a wall and wonder how steep it is compared to the ground.
If the line is perpendicular to the plane, the angle is ninety degrees.
Otherwise, it's the angle between the line and its shadow on the plane.

Here's the usual recipe.
First, pick a point on the line, and drop a perpendicular from it to the plane. Where it lands tells you where the shadow goes.
Then use the right triangle you've just built to work out the angle.
And notice, once again, the shadow is at the center of everything.

## Two planes

The third is the angle between two planes. Picture an open book.
How wide it's open is the angle between its two covers.
To measure it properly, pick a point on the spine, which is the line where the two planes meet.
From that point, draw a line in each cover that's perpendicular to the spine.
The angle between those two lines is the angle between the planes.

By convention, this angle is also taken between zero and ninety degrees.
So if you open a laptop to a hundred and twenty degrees, the angle between the screen and the keyboard, as two planes, is sixty degrees.
In real life, the pitch of a roof, or the tilt of a laptop screen, are both angles between two planes.

## Every road leads to a triangle

The general lesson with angles is that every road leads to a triangle.
Usually a right triangle, lying neatly inside some plane.
Your job is to build that triangle. After that, it's just the trigonometry you already know.

# ACT SIX — Distance

## The shortest way

Right alongside angles comes distance.
The core idea fits into one sentence. Distance is the length of the shortest path, and the shortest path is always the perpendicular one.

## A point and a plane

The most basic distance is from a point to a plane. It's the length of the perpendicular dropped from the point to the plane.
When you say a ceiling is three meters high, this is exactly the distance you mean.
In exercises, the hard part is the construction. You have to show where the foot of that perpendicular actually lands.
And the facts about perpendicular planes from earlier are precisely the tools for doing that.

## Any point will do

From this one idea, the other distances follow logically.
The distance from a line to a plane parallel to it is the distance from any point on the line to the plane.
The distance between two parallel planes is the distance from any point on one of them to the other.
We're allowed to pick any point, because being parallel guarantees that every point is the same distance away.

## Two skew lines

The most challenging one is the distance between two skew lines.
Mathematics proves that between two skew lines there is always exactly one segment that's perpendicular to both of them. It's called their common perpendicular.
Its length is the distance we're looking for.
Building that segment directly is usually hard work. So in practice, we use a conversion trick.
Build a plane that contains one of the lines and is parallel to the other.
Then the distance between the two skew lines is just the distance from the other line to that plane.
And the problem is back in familiar territory.

# ACT SEVEN — Solids

## Faces, edges, vertices

Now we leave relationships behind, and step into solids, where everything becomes much easier to picture.
The first family is the polyhedra, solids that are completely wrapped in flat polygons.
A brick, a die, and the Great Pyramid of Giza are all polyhedra.
The polygons around the outside are called faces. A side shared by two faces is called an edge. And a corner where edges meet is called a vertex.

The two most important families of polyhedra are prisms and pyramids.

## Prisms

A prism has two bases, two identical polygons lying in two parallel planes, and its sides are all parallelograms.
Imagine taking a polygon and pushing it straight out in one fixed direction. The shape it sweeps out is a prism.
When the side edges stand perpendicular to the base, it's a right prism, and its sides become rectangles.
A right prism with a regular polygon for a base is called a regular prism.

The most familiar case is the rectangular box, a right prism with a rectangle for a base.
And even more special, the cube, with six equal square faces.
The box comes with one formula worth remembering.
The square of its long diagonal equals the sum of the squares of its length, its width and its height.
That's the Pythagorean theorem, in three dimensions.

## Pyramids

A pyramid has one polygon for a base, and one apex that sits outside the plane of that base. Its sides are all triangles that share that apex.
The Great Pyramid is the most famous example.
When the base is a regular polygon, and the apex sits directly above the center of the base, it's a regular pyramid.
Its side edges are all equal, and its side faces are matching isosceles triangles.
The smallest case is the tetrahedron, a pyramid on a triangle.
It's the simplest polyhedron that can exist, with four faces, four vertices and six edges.

## Only five

And here's a fact that surprises a lot of people.
On a flat page, there are infinitely many regular polygons. A triangle, a square, a pentagon, a hexagon, and on and on.
But in space, there are only five regular polyhedra. They're called the Platonic solids.
The tetrahedron, the cube, the octahedron, the dodecahedron with twelve faces, and the icosahedron with twenty.

You can even see why there can't be a sixth.
At every corner of a solid, at least three faces have to meet, and their angles have to add up to less than a full turn. Otherwise the corner lies flat and can't fold up.
Three, four or five triangles fit around a corner. Six triangles make exactly a full turn, and lie flat.
Three squares fit. Four lie flat. Three pentagons fit. And three hexagons already lie flat.
That's five ways, and no more.

The ancient Greeks knew this more than two thousand years ago. Euclid proves it in the final book of the Elements.
And you can still hold all five today, in a set of dice for tabletop role-playing games.

# ACT EIGHT — Volume

## How much room

Volume answers one question: how much space does a solid take up? Or more concretely, how much water would it hold?
It's measured in cubic units, like cubic meters, or cubic centimeters.

## Stacking cubes

The most basic formula belongs to the rectangular box. Volume equals length times width times height.
Here's an easy way to see it. Imagine packing the box with little cubes, each one unit on a side.
On the bottom layer, you fit length times width cubes.
The height tells you how many layers there are.
Multiply the two, and you've counted every little cube. That count is the volume of the box.

From there, the general rule for every prism is: volume equals the area of the base, times the height.
But be careful. The height here is the distance between the two planes of the bases.
For a slanted prism, that's not the same as the length of a side edge.

## The one third

When we get to pyramids, a special number appears. Volume equals one third of the base area, times the height.
It's been proven that a triangular prism can always be cut into three pyramids with equal volumes. That's where the one third comes from.

And it reveals something fun.
With the same base and the same height, the Great Pyramid needs only one third of the stone of a box built on that base.
That's still about two and a half million cubic meters of stone. But a box would have needed nearly eight million.

# ACT NINE — Solids that spin

## Turning a flat shape

Now for the second family of solids, born from rotation.
When a flat shape spins around a fixed axis, it sweeps out a solid of revolution.

## The cylinder

The first one is the cylinder. It's what you get when a rectangle spins around one of its sides.
Its volume is the area of the base times the height. That's pi times the radius squared, times the height.
It's the same pattern as the prism, because a cylinder really is a prism with a round base.

Its curved surface area is the distance around the base times the height. That's two pi times the radius, times the height.
The quickest way to see it is to peel the label off a soda can.
Laid flat, the label is a rectangle. One side is the distance around the can, and the other side is its height.

## The cone

The second one is the cone. It's what you get when a right triangle spins around one of its two shorter sides.
An ice-cream cone, a traffic cone, and a party hat are all cones.
Its volume is one third pi times the radius squared, times the height.
The familiar one third is back, because a cone really is a pyramid with a round base.

A cone also has what's called a slant height, the distance from the tip down to any point on the edge of the base.
The curved surface area is pi times the radius, times the slant height.
Unroll the surface of a cone onto flat paper, and you get a sector of a circle, like a slice of pizza.

## The sphere

The third one is the sphere. It's what you get when a half-circle spins around its diameter.
A sphere is the set of all points at the same fixed distance from one point, the center. That fixed distance is the radius.
Its surface area is four pi times the radius squared.
Its volume is four thirds pi times the radius cubed.

## Archimedes' favorite

There's a lovely story behind these two formulas.
Archimedes proved that if you fit a sphere snugly inside a cylinder, the sphere's volume is exactly two thirds of the cylinder's.
He was so proud of this that he asked for a sphere inside a cylinder to be carved on his tomb.
And about a hundred and fifty years later, the Roman writer Cicero found an overgrown tomb in Syracuse, recognized it by exactly that carving, and had it cleaned up.

# ACT TEN — Putting it together

## Back to the flat page

So that's the whole tour, from three bricks to spinning solids.

Before we finish, I want to leave you with a couple of habits that make solid geometry easier.
The first is to always look for a way to turn the problem in space into a problem on a flat page.
You may have noticed that throughout this video, every angle and every distance was finally worked out inside a triangle, lying in some plane.
So when you're stuck, ask yourself: which triangle contains the thing I need, and which plane of the solid is it lying in?

## A chain, not a list

The second habit is to stop memorizing theorems one by one, because in this subject they link together into a chain.
Where things can be gives us parallel and perpendicular.
Perpendicular gives us angles and distances.
And distance becomes the height in every volume formula.

## Putting it together

So, the three questions.
What is the subject built on? Three ideas that are never defined, and four simple rules about how they behave.
How do you measure between things that never touch? You build a triangle in a plane, usually with a perpendicular or a shadow, and then it's flat geometry again.
And where does the one third come from? From cutting a prism into three equal pyramids. And it comes back in the cone, for the same reason.

## Next time

You might not remember every theorem and formula after one video, and that's completely fine.
What matters more is that when you look at a problem in space, you know where to start, what relationship to look for, and how to bring it back, step by step, to things you already know.
And next time you sit on a three-legged stool, or look up into the corner of a room, try to see the planes and the lines hiding there.

Solid geometry really isn't scary. With a little patience, it can be a lot of fun.
Thanks for exploring it with me. See you in the next video.

---

## What changed, and why

- Examples localized: Vietnamese conical hat → ice-cream cone, traffic cone, party hat; "power line above the road" →
  "straight cable stretched above a road" (a real power line sags); dice "of role-playing games" → "tabletop role-playing
  games"; "the program" (chương trình) → "solid geometry".
- Skew-line room example fixed: the vertical edge has to be the near one, not the corner where it meets the top edge
  (CONTENT fix 1).
- Sphere: "the same fixed distance" + radius (CONTENT fix 2).
- Angle between two planes: the laptop at 120° gives 60°, so the open book and the laptop don't contradict the 0–90°
  convention (CONTENT fix 3).
- Added: a numbered promise of three questions and a hanging line before the intro; the projection introduced as a
  "shadow" right where it first appears (theorem of three perpendiculars); why only five Platonic solids (corner-angle
  argument), with Euclid, *Elements* XIII; the Great Pyramid in numbers; Cicero finding the tomb; "Putting it together"
  answering the three questions; "Next time" as something the viewer can notice.
