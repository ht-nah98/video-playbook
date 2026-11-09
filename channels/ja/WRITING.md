# 99の発見 — luật viết lời đọc tiếng Nhật

Đọc TRƯỚC khi viết SCRIPT. `tools/voice/narrate.py` chặn các mẫu đã đo là sai (`tools/voice/ja.py check_spoken`);
thêm mẫu mới vào `_BAD` khi một phép thử chứng minh nó sai.

## Phép thử cách viết (2026-10-10) — 8 câu × 3 take, whisper large-v3 `language="ja"` nghe lại

Bản nghe ở `out/_lab/ja-probe/` (thư mục QA — có thể đã bị dọn) (`lines.json` = chữ đưa vào).

| câu | cách viết | đúng |
|---|---|---|
| a1 | `180度` (chữ số Ả Rập) | **3/3** |
| a2 | `百八十度` (số Hán) | **1/3** — "100%", "100%四十度" (khớp lỗi hkt l1_t1) |
| a3 | `ひゃくはちじゅう度` (kana) | **3/3** |
| b1 | `底辺×高さ÷2` | **0/3** — "×" bị nuốt/đọc bậy ("底辺高さ", "バテル"), take ngắn hơn 0.8 s |
| b2 | `底辺かける高さわる2` | **3/3** |
| c1 | `x²+y²=z²` | **0/3** — vô nghĩa ("エクスカリア", "X軸とYY軽量") |
| c2 | `エックスの二乗たすワイの二乗イコールゼットの二乗` | **3/3** |
| d1 | `ほかの二辺` (kana thay 他の) | **3/3** (hkt: `他の二辺` 1/2 thành "ホタニヘン/ホタニエ") |

**Luật viết lời đọc tiếng Nhật (rút từ bảng):**
1. Số: chữ số Ả Rập (`180`) hoặc kana; **KHÔNG số Hán** cho số nhiều chữ (百八十 sai 2/3). Số đếm có trợ từ đếm đặc
   biệt (三つ, 一本, 二乗) viết theo cách đọc chuẩn và thử.
2. Phép toán và ký hiệu: **viết bằng lời** (かける, わる, たす, ひく, イコール, の二乗, ルート) — mọi ký hiệu sai. Cách viết
   tốt nhất là CHÚ ÂM `底辺{×|かける}高さ{÷|わる}2`: phụ đề hiện ký hiệu, giọng đọc lời, và unidic không tách nhầm chuỗi kana
   dài ("かける高さわる2" viết trơn bị tách thành かける高 / さわる — đã gặp).
3. Biến Latin: katakana (エックス, ワイ, ゼット); không để `x` trần.
4. Chữ Hán nhiều cách đọc (他 = た/ほか, 方, 角…): viết kana nếu từ điển không chắc; SCRIPT giữ hai bản — chữ để hiện
   (phụ đề, hình) và chữ để đọc (như `spoken_narration` của hkt, nhưng ngược lại: đọc = kana).
5. Kiểm mỗi take bằng whisper ja, so theo CÁCH ĐỌC (kana), không theo mặt chữ: whisper viết 180 cho ひゃくはちじゅう,
   × cho かける, 和 ↔ 輪 đồng âm.


## Thuật ngữ (theo sách giáo khoa Nhật — soát ở CONTENT, người Nhật duyệt)

| khái niệm | dùng | tránh / ghi chú |
|---|---|---|
| định lý Pythagoras | 三平方の定理 | ピタゴラスの定理 cũng hiểu được nhưng SGK dùng 三平方 |
| số pi | 円周率 (π) | |
| tổng các góc trong | 内角の和 | |
| diện tích tam giác | `底辺{×\|かける}高さ{÷\|わる}2` | đọc bằng lời, hiện ký hiệu |
| giới hạn | 極限 | 数学III |
| radian | 弧度法・ラジアン | 数学II |
| số thập phân hữu hạn / tuần hoàn | 有限小数・循環小数 | số lặp ghi bằng DẤU CHẤM trên chữ số (không gạch ngang như phương Tây) |
| công thức chu vi | 円周＝直径×円周率 | thứ tự SGK lớp 5 (không "π × d") |
| đa giác đều n cạnh, số + trợ từ đếm | `{正12角形\|せいじゅうにかっけい}` | unidic đọc 角形 = かくがた, 1辺 = いちへん, 1つ = いちつ → luôn chú âm số + trợ từ đếm |
| phân số | `{22/7\|ななぶんのにじゅうに}` | đọc MẪU trước TỬ |

Bảng này nhỏ — thêm dòng mỗi khi một bài cần thuật ngữ mới.

## Rút từ bài đầu (ja/pi, 2026-10-11 — LESSONS §91, §92)

6. **Một cụm hỏng hai lần đọc lại → viết lại cụm**, không thử lần ba. 「4分の1回転」 bị nuốt ba take liền; 「直角は、π/2です」
   đọc đúng ngay. Giữ nghĩa trên hình, đổi chữ trong lời.
7. **Tên người chữ Hán (劉徽, 祖沖之, 建部賢弘…) luôn chú âm** `{祖沖之|そちゅうし}`; whisper vẫn đoán chữ khác cùng âm —
   đó là bộ so báo nhầm, nghe take rồi bỏ qua, đừng đọc lại.
8. **Số thập phân bắt đầu bằng 0**: chú âm `{0.333…|れいてんさんさんさん}`; chuỗi chữ số dài đọc từng chữ số
   `{142857|いちよんにはちごなな}` — chú âm quyết định cách đọc, đừng để giọng tự chọn (đọc như số lớn hay từng chữ số).
9. **Bản địa hoá đổi ví dụ, người, đề thi, thuật ngữ — không đổi mạch:** lớp theo chương trình Nhật (小学5年 học 円周率),
   người Nhật trong lịch sử (和算: 村松茂清, 関孝和, 建部賢弘), đề thi người Nhật nhớ (東大 2003), công thức theo SGK. Câu
   quen với phương Tây mà lạ với Nhật (22/7) thì nói rõ 「西洋では」.
10. Lời giảng です/ます, câu ngắn, một câu một dòng; 「」 cho khái niệm; bỏ あなた và 翻訳調 (「〜することができます」 → 「〜できます」).
11. **Không mở câu bằng số / năm / phần trăm** — âm đầu take hay mất (「{0.6%|…}。」 → whisper "Y.6%"; 「{2018年|…}{4月|…}、」 →
    "2010年"). Dời số vào giữa hoặc cuối câu. (ja/gacha, LESSONS §120)
12. **「số + の + danh từ」 sát nhau** dễ nuốt の (「1000円のランチ」 → "1000円ソランチ") → đảo: 「ランチが1回1000円なら」.
13. **Từ Hán hiếm (誤謬…)**: lời đọc dùng từ thường (思い込み), chữ Hán để trên テロップ.
14. **Hai số liền nhau** (「70回から80回分」) → một số đại diện (「76回前後」).

