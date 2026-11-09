# Trigonometry, Finally Explained: What Sine Really Measures

Narration script (English), v2 (2026-11-02, thêm tên chuẩn, góc đặc biệt, đổi đơn vị, nhắc kiểm chế độ, móc sóng). Numbers: `CONTENT.md`.

**Format (read by `tools/voice/narrate.py`):**
- one line = one breath; blank line = end of an idea; `##` = a stop, `# ACT` = act card
- numbers and symbols written as WORDS, each with a row in `spoken.json`

## Cold open

Type sine of thirty into a scientific calculator, and it says zero point five.
Now change one small setting, type exactly the same thing, and it says minus zero point nine eight eight.
Same keys. Nothing is broken. And both answers are correct.

To see how that's possible, we're going to build trigonometry from nothing, in under ten minutes.
You'll see one number that refuses to change, however big the triangle gets, one point walking around a circle, and one measurement that makes that minus sign completely obvious.
By the end, you won't need to memorize sine and cosine, because you'll be able to read them off a picture.

All you need to begin with is a tree you can't climb.

# ACT ONE — The number that refuses to change

## A tree you can't climb

Suppose you want the height of a tall tree, and you only have a tape measure.
You can't reach the top, but you can walk away from it along the ground. Say, twenty meters.
From there you look up at the very top, and you measure the angle: thirty-five degrees.
That's a right triangle, and you only know one of its sides. It doesn't look like enough.

But now draw the same triangle on paper, small enough to measure. Same angles, so the same shape.
Your little triangle is a scale model of the real one, which means its proportions are exactly the same.
On paper, the height comes out at about zero point seven of the base.
So the real tree is zero point seven of twenty meters. About fourteen meters, and you never left the ground.

Here's what just happened, and it's the seed of the whole subject.
Fix the angle, and the proportions of a right triangle are fixed too, whatever its size.
Double the triangle, and both sides double, so their ratio doesn't move.
Every angle comes with its own unchanging numbers, and that is all trigonometry was at the start: a list of those numbers.

## Three names

There are three sides, so there are three ratios worth naming.
The side across from our angle, divided by the longest side, is called the sine.
The side next to our angle, divided by the longest side, is the cosine.
And across divided by next to, the one we just used on the tree, is the tangent.
Textbooks call those same sides the opposite, the adjacent and the hypotenuse, and you may have met them as soh cah toa. Same ratios, longer names.

Notice what those are not. Sine isn't a length, and it isn't a kind of angle.
It's a plain number, a ratio, and it has no units at all.
For thirty degrees that number is exactly one half, and we can even see why.
Take a triangle with three equal sides, and cut it straight down the middle.
The short side is now half of the long side, and the angle across from it is thirty degrees. So the sine of thirty is one half. No memorizing needed.

So zero point five was the honest answer. Then where on earth does minus zero point nine eight eight come from?
A ratio of two lengths can't even be negative.
Something about this definition is too small.

# ACT TWO — One point on a circle

## The triangle runs out

Try the sine of one hundred and twenty degrees.
A right triangle already spends ninety degrees on its corner, so the other two angles have to share what's left. One hundred and twenty simply doesn't fit.
By our definition, the question has no answer. And yet the calculator says zero point eight six six, without hesitating.
So the calculator must know a better definition than the one we just learned.

Here it is, and it starts with a small trick.
Take our triangle and make the longest side exactly one.
Now dividing by the longest side does nothing, so the sine is simply the height of the triangle, and the cosine is simply its width.

Next, stand that triangle at the center of a circle of radius one.
Its tip sits on the rim. Call that tip M.
As the angle opens, M slides along the rim, and the triangle's width and height just follow it.
So the cosine is how far M is across, and the sine is how far M is up.

That's the better definition. Cosine and sine are the two coordinates of one point on a circle.
For angles a triangle can hold, it gives exactly the same numbers as before, so nothing we learned was wrong.
It just doesn't stop at ninety degrees.

## Past ninety degrees

Keep opening the angle to one hundred and twenty degrees.
There's no triangle to worry about now, only a point that has kept walking.
M is still high up, so its height is zero point eight six six, the number the calculator gave us.
That's the same height it had at sixty degrees, on the other side. Remember that, it comes back next time.

But look at M's across coordinate. M has crossed to the left of center, so its cosine is minus one half.
And there's our first negative number. A side of a triangle can't be negative, but a coordinate can.

Which means you never have to memorize the signs.
Is M on the left? Then the cosine is negative. Is M below the center? Then the sine is negative.
That's the entire table of signs, and you can see it from across the room.

## What the picture gives you for free

M lives on a circle of radius one, so its across and its up form a right triangle with a long side of one.
Pythagoras says that across squared, plus up squared, equals one.
Written in our new words, that's sine squared plus cosine squared equals one, for every angle there is.
This is the most used identity in trigonometry, and it's nothing more than the statement that M is on the circle.

And the famous angles can now be read right off the circle.
At thirty degrees, M is one half up. At sixty, across and up simply trade places, so M is zero point eight six six up and one half across.
At forty-five, across and up are equal, and their squares add to one, so each is root two over two. About zero point seven zero seven.

Tangent gets a picture as well. It's up divided by across, and that is exactly the slope of the line from the center to M.
At ninety degrees, that line stands straight up. Its slope doesn't exist, and neither does the tangent of ninety degrees.
Nothing has gone wrong there. Your calculator's error message is telling the truth.

So we know what sine really measures now: height on a circle.
But the height at thirty is one half, and the calculator also said minus zero point nine eight eight.
For that, we have to ask what the word thirty actually meant.

# ACT THREE — What thirty means

## Measuring with the circle itself

Degrees cut a full turn into three hundred and sixty parts.
It's a handy number, but nothing about a circle asks for it. Someone had to choose it.

Here's a way to measure an angle with no choices at all.
Start at the right of the circle, and walk along the rim until you've walked exactly one radius.
The angle you've swept out is called one radian. It's a little over fifty-seven degrees.
It's the same on any circle, a coin or the whole Earth, since it only compares the rim with that circle's own radius.

So how many radians are in a full turn? The rim is two pi times the radius, so a full turn is two pi radians. About six point two eight.
Half a turn is pi, and a quarter turn is pi over two.
So one hundred and eighty degrees is pi, and that's the only conversion you need. Thirty degrees is a sixth of that, so pi over six.
This is why mathematicians love radians. On a circle of any size, the arc you walk is just the angle times the radius, with no extra factor.
And since this is just distance along the rim, on a circle of radius one, an angle in radians is simply how far M has walked.

## The answer

Now we can finally go back to our calculator.
In degree mode, thirty means a twelfth of a turn, and M's height is one half.
That one setting we changed switches it to radians, and now thirty means this: walk thirty units along the rim.

So let's walk. Each full turn takes about six point two eight.
Four turns use up just over twenty-five. And after each whole turn, M stands exactly where it started, so all of those turns change nothing.
That's what we mean when we say sine repeats, and it's the last piece.

We have about four point eight seven left to walk.
That carries M past the left side, past the bottom, and stops it nearly two hundred and seventy-nine degrees around, low on the right.
Almost at the very bottom of the circle.
Its height there is minus zero point nine eight eight.

Same keys, and two different points on the same circle.
The calculator was never confused. We just never told it how far to walk.
So before you trust a sine on a calculator, check that little setting.

# ACT FOUR — Putting it together

## Putting it together

An angle fixes the proportions of a right triangle, and those proportions are sine, cosine and tangent.
Put the triangle in a circle of radius one, and cosine and sine become the coordinates of a point, which can go anywhere, and can go negative.
And radians measure the walk itself, so going around again changes nothing, and thirty units lands you near the bottom.

## Next time

Here's something to try before the next video. Find a second angle whose sine is exactly one half.
You won't need a calculator. Just look for another point on the circle at the same height.
Next time we'll use that same trick to turn a whole page of formulas you were told to memorize into four simple pictures.
And later in the series, we'll keep M walking and write down its height as it goes, and the circle will unroll into a wave.
This is the first part of our trigonometry series on 99% from scratch. Thanks for watching, and I'll see you in the next one.

---

## Package first

| | |
|---|---|
| Thumbnail | Cậu bé anime + máy tính lớn: `sin 30`, hai đáp án 0.5 (lạnh) / −0.988 (đỏ). Chữ lớn "SAME KEYS?!". Che chữ vẫn thấy một phép tính hai đáp án. Không có đường tròn: đó là lời giải |
| Title | Trigonometry, Finally Explained: What Sine Really Measures (không chung từ khoá với thumbnail ✓) |
| 0–5 s | Máy tính, `sin 30 = 0.5`, đổi DEG → RAD, `−0.988` đỏ. Phụ đề: "…it says zero point five… minus zero point nine eight eight" |
| 0–30 s | hứa (2 đáp án) → bằng chứng (cả hai đúng) → không phải máy hỏng, là ta chưa nói 30 là gì (lời hé ở Act 3) → hứa lớn hơn: tự đọc sin/cos từ hình |

## Cold open — lát cắt, dựng SAU thân bài (§244)

| line | the viewer SEES |
|---|---|
| Type sine of thirty… | máy tính, gõ thật, 0.5 |
| Now change one small setting… | công tắc DEG → RAD, gõ lại, −0.988 đỏ giật nhẹ |
| Same keys… | hai màn hình đặt cạnh; người que nhìn qua lại, dấu hỏi trên đầu |
| To see how… | cắt nhanh: tam giác co giãn giữ nguyên tỉ số |
| one number… one point… one measurement | ba lát từ thân bài: tam giác giãn / M chạy trên vành / M đi 30 đơn vị rồi dừng gần đáy; hình cuối giữ ≥ 2 s |
| By the end… | cos và sin đọc trực tiếp từ M; mascot ở góc |
| All you need… | cái cây, chuyển vào Act 1 |

## Nhân vật (§247, `docs/study/16b-3blue1brown.md`)

Hình toán tự diễn. λ chỉ biểu cảm trong 8 đoạn chen (bảng `CUT`, `plates/common.js`), mascot anime dẫn ở góc (bảng `HOST`). Không nhân vật nào chạm hình toán.
