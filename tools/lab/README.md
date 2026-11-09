# tools/lab — bàn thử

Mỗi file là một trang canvas 1920×1080 (`window.__intro`), chụp bằng
`node engine/render/shoot.js stills --page tools/lab/<tên>.html --dur 2 --t 0.5,1.5 --outdir out/_lab/<tên>`.
Brief viết lab mới: `projects/en/logarithm/BRIEF-LAB.md` (mẫu gần nhất). Mỗi hướng DNA của một bài = MỘT file ở đây.

## Lab đã thành DNA (giữ — tham khảo khi cần chất liệu tương tự, KHÔNG chép phong cách)
| lab | bài |
|---|---|
| long-line | math-30k |
| hole | zero-div |
| road, poster, table | pemdas (road chọn) |
| lantern, felt | fifty-percent (lantern + mượn phỉnh của felt) |
| drafting | pi |
| tiles | neg-times-neg |
| lcd | zero-power |
| gameshow | intuition |
| shadowbox | solid-geometry |
| glass | sudoku (và tham khảo cho ja/hikari) |
| riso | MV add-it-up |
| sangaku, tenkyu | ja/pi |
| banjo | ja/2048 |
| awasekagami | ja/chirality |
| capsule | ja/gacha |
| skatepark, pottery, survey | calculus (survey chọn; hai hướng kia giữ để đối chiếu) |
| ferris | trig |
| blocks | logarithm |
| notebook, boardgame, engraving (+ prob-common.js) | probability (notebook chọn) |

## Lab của engine (giữ — thử module dùng chung)
face, fill, lyric, mascot, mascot-v2, mirror, shade (engine/shade.js: xuôi = ngược từng byte), stick (engine/stick.js: người
que — bảng 34 tư thế + cảnh calculus; xuôi = ngược từng byte), talk, transit, typeobj.

## Người que (engine/stick.js, stickmove.js, hero.js) — mỗi cảnh có `<x>-scene.js` (kịch bản, gác số được) + trang vẽ
| lab | gì | gác |
|---|---|---|
| stick2 (+ stick2-scene.js) | đi phẳng → dốc 22° → nhảy lên thẻ → ngồi (study 08) | `node tools/lab/stick2-qa.mjs` |
| stick-zd, stick-run | người que zero-div (đã duyệt, vào video) · chạy có pha bay | `… stick2-qa.mjs tools/lab/stick-zd-scene.js` |
| hero | bảng 3 phương án nhân vật kênh — người dùng chọn C (khăn đỏ) 2026-10-23 | — |
| hero-clip (+ hero-scene.js) | clip đầu người que khăn đỏ: bị số rơi trúng, vác 1/6 từ A sang B, phân thân | `… stick2-qa.mjs tools/lab/hero-scene.js` |
| fight, fight24 (+ fight-scene.js, fight-page.js) | đánh nhau với 49% — nhịp Becker, camera, va chạm (study 10); người dùng chọn 60 fps | `… stick2-qa.mjs tools/lab/fight-scene.js` |
| sport-poses | bảng 70 tư thế `engine/poses-sport.js` (chuyển từ lemo-opuscar pictogram-motion, MIT, study 11) — người dùng duyệt cả bộ 2026-10-23; `picto-extract.mjs` dựng lại từ nguồn (công thức góc ở đầu file); highjump sửa tay (§154) | bảng tĩnh |
| traveler, traveler-clip | (đã bỏ — người dẫn kênh lịch sử chuyển sang chibi Concept B `assets/hist-host/`, `channels/hist/CHARACTER.md`; file đã rời `tools/lab/`) | — |

| soft-limb | so 3 kiểu nét chi (A đoạn thẳng · B bo góc · C cong) — người dùng chọn C 2026-10-26 → `hero` `soft` | bảng |
| becker-redo (+ becker-redo-scene.js) | làm lại 60 s đầu "Animation vs. Coding" bằng người que nét mềm; ghép cạnh bản gốc `out/_lab/becker-redo/compare.mp4` (lệnh ghép: docs/stick/README) | `shoot.js check` |
| stick-dict | bảng từ điển dáng `engine/stick-dict.js`; cặp với mẫu: `tools/study/stick_dict_pairs.py` | bảng tĩnh |

Clip không tiếng: `node engine/render/shoot.js video --page tools/lab/<x>.html --dur <s> --silent --out out/_lab/<x>.mp4`.

## archive/ — hướng bị loại (giữ làm bằng chứng "so 3 hướng"; đường dẫn đã sửa `../../../`)
brass, chalk, enso, fold, jikkennote, kirigami, kiriko, ledger, meisai, neon, newsprint, nightlab, pinboard, press,
puzzlelab, rods, rosen, syracuse; bowstring, lighthouse (thua ở trig); sliderule, vault (thua ở logarithm).
Cất thêm 2026-10-27: logarithm-stick-lab, logarithm-stick-scene (nháp người que cho logarithm, không dùng trong bản cuối).
