# trig-explained — thumbnail prompt v2 「HOW TALL?」 (bản C, gen AI với λ)

Bối cảnh: A/B zero-div (10-27 → 11-05) bản không cậu bé anime thắng 58,6% / 41,4% (`channels/THUMB-LOG.md`).
Bản A, B vẽ bằng code: `thumbs-lambda.html` → `out/en/trig-explained/youtube/thumb-tests/v2-lambda/`.
Bản C khác hai bản kia về thế giới: ngoài trời, cảnh mở đầu Act One của video (cái cây không trèo được, đo góc 35°, cách 20 m).

**Đính kèm:** `out/en/trig-explained/youtube/thumb-tests/v2-lambda/lambda-reference.png` (bảng dáng λ, giữ đúng hình).
Đi cặp với title **"Measure Any Tree Without Climbing It | Trigonometry From Scratch"** (combo C, `out/en/trig-explained/youtube/thumb-tests/v2-lambda/COMBOS.md`): không chung từ khoá với chữ "HOW TALL?".

```
Create a YouTube thumbnail, 1280x720, 16:9. Clean, minimal, flat vector illustration with soft shading, very few objects, lots of calm empty space. No people, no anime characters.

CHARACTER (copy exactly from the attached reference sheet): a small mascot shaped like the Greek letter "λ" (lambda), solid green #17907A, smooth thick rounded strokes, two big round white googly eyes with dark navy pupils sitting on the top hook of the letter, a tiny mouth line, no arms, no hands, no clothes. Keep the letter shape exactly as in the reference; only the eyes and mouth show emotion.

SCENE: a wide pale-blue sky over a flat light-green field. On the right, ONE very tall, simple tree (dark trunk, round cloud-like crown) reaching almost to the top edge of the frame. On the left, near the bottom, the small λ character stands on the grass, about 25% of the frame height, leaning back and looking up at the top of the tree with wide, amazed eyes and a small "o" mouth.
A thin dashed yellow line goes from the λ's eyes straight to the very top of the tree. A thin navy line runs along the ground from the λ to the foot of the tree. Together with the tree trunk they make one clear right triangle. At the λ, a small yellow arc marks the angle between the ground line and the dashed line, labelled "35°". Under the ground line, a small label "20 m". The tree trunk itself has a big red question mark next to it.

TEXT: top left, huge heavy bold sans-serif white letters with a thick dark navy outline: "HOW TALL?" No other words anywhere except "35°" and "20 m".

Do not draw a calculator, a circle, or any formula. No logos, no borders. Keep the bottom-right corner free of important content (timestamp).
```

Sau khi có ảnh: `python3 tools/thumb/check.py <ảnh> -o out/en/trig-explained/youtube/thumb-tests/v2-lambda/check-C.png --jpg out/en/trig-explained/youtube/thumb-tests/v2-lambda/thumb-C-how-tall.jpg`; soát λ đúng hình chữ (không mọc tay chân), đúng "35°" và "20 m".
Số đúng với lời đọc: 20 m, 35°, cây ≈ 14 m (`SCRIPT.md` Act One).
