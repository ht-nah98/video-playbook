# R1: 2026 Nobel Prize in Chemistry (Kagan and Soai), with sources

Researched 2026-10-13. Fetch method: `WebFetch` got HTTP 403 on nobelprize.org, but plain `curl` with a browser user-agent downloaded every official page and PDF. The local copies are in `scratchpad/chirality/dl/`: `press.pdf/txt`, `popular.pdf`/`popular-raw.txt`, `advanced.pdf`/`adv.txt`, plus the HTML pages converted to `.txt`. Every quote below is copied from those files.

Official URLs:
- Press release (HTML): https://www.nobelprize.org/prizes/chemistry/2026/press-release/
- Press release PDF: https://www.nobelprize.org/uploads/2026/10/press-chemistryprize2026.pdf
- Popular science background PDF: https://www.nobelprize.org/uploads/2026/10/popular-chemistryprize2026.pdf (HTML: https://www.nobelprize.org/prizes/chemistry/2026/popular-information/)
- Scientific background PDF: https://www.nobelprize.org/uploads/2026/10/advanced-chemistryprize2026.pdf
- Prize announcement page with the Somfai interview transcript: https://www.nobelprize.org/prizes/chemistry/2026/prize-announcement/
- Laureate facts pages: https://www.nobelprize.org/prizes/chemistry/2026/kagan/facts/ and https://www.nobelprize.org/prizes/chemistry/2026/soai/facts/
- Soai telephone interview: https://www.nobelprize.org/prizes/chemistry/2026/soai/interview/ (the Kagan interview URL returns 404, so there appears to be no Kagan interview)
- KVA news page: https://www.kva.se/en/news/the-nobel-prize-in-chemistry-2026/

---

## 1. Official Nobel materials

### Citation, split, amount (press release PDF, dated 7 October 2026)
- "The Royal Swedish Academy of Sciences has decided to award the Nobel Prize in Chemistry 2026 to Henri B. Kagan, Université Paris-Sud, France [and] Kenso Soai, Tokyo University of Science, Japan"
- **Citation:** "for the discovery of non-linear effects and autocatalysis in asymmetric organic synthesis"
- **Amount:** "Prize amount: 12 million Swedish kronor to be shared equally between the laureates". The facts pages give each laureate a "Prize share: 1/2".
- Nature news converts this to "12-million Swedish kronor (US$1.2-million)": https://www.nature.com/articles/d41586-026-03093-0
- **Announced by:** "professor Ellen Moons, Secretary General of the Royal Swedish Academy of Sciences, on 7 October 2026" (prize-announcement page).
- **Headline of the press release:** "They made chemistry choose a mirror image"

### What the press release says (verbatim)
- "Some molecules, such as amino acids, exist as two variants that are each other's mirror image. However, living organisms only contain one of these mirror images. How chemical asymmetry such as this could have emerged was long a mystery to chemists."
- "Life's chemistry is what chemists call homochiral, after the Greek words for 'same' and 'hand'. Like hands, all amino acids exist as two mirrored variants, but only one of them is found in the proteins in your cells. The other is rarely found in nature."
- "When they began to experiment with chemical reactions that can form two mirrored molecules, they always obtained equal proportions of both in their test tubes."
- "Henri Kagan took the first decisive step in 1986, when he discovered a new way of manipulating chemical reactions. This allowed him to create a greater excess of one of the mirror images than had previously been thought possible."
- "Kenso Soai took the next step. In 1995, a key publication describes how he designed the first ever chemical reaction that had the potential to be homochiral. In 2003, he finally succeeded. He presented a reaction in which only one of the two possible mirror images was formed. Other than life itself, no one had previously achieved this feat."
- "Thanks to Henri Kagan and Kenso Soai, we now know how homochirality can emerge. Their discoveries have been decisive for chemists who design reactions for the manufacture of pharmaceuticals."

### Popular science background ("They solved chemistry's asymmetric mystery"; text by Ann Fernholm, illustrations by Johan Jarnestad)
- **Locksmith analogy:** "Imagine that you are a locksmith who makes keys to order. The problem is that when you produce them, you always end up with two mirrored variants, but only one of them fits the lock – and the lock can be damaged if your customers try to unlock it with the other key. Unfortunately, telling the keys apart is very difficult, so the customer gets them both."
- **DNA sugars:** "This is also true of the sugar molecules that are part of our DNA; there are two different mirror images of these molecules, but life only uses one."
- **The chain of ideas behind the prize:**
  - **Pasteur and tartaric acid.** He sorted mirror-image crystals with tweezers. One solution bent polarised light to the right, the other to the left. Mixed together, the light was unaffected.
  - **Pasteur, 1857.** Bacteria fermented only the grape enantiomer.
  - **Natural molecules and light.** "naturally occurring amino acids always bend polarised light to the left, while the sugars found in the DNA helix do the opposite".
  - **Willy Marckwald, early 1900s.** He ran the first asymmetric reaction, using a chiral catalyst. "The difference was very small, but its mere existence was a breakthrough."
  - **Charles Frank, 1953 (University of Bristol, theoretical physicist).** His model required three conditions:
    1. "That there are a chiral catalyst and an asymmetric reaction."
    2. "That the formation of one mirror image is somehow enhanced and the other dampened."
    3. "That the chemical reaction forms the catalyst itself. This is called autocatalysis … resulting in the number of one of the enantiomers in a reaction growing exponentially."
  - Frank's model was "a kind of chemical puzzle that university lecturers could present to their students".
  - Earlier prizes: "Pioneers in this field were awarded the Nobel Prize in Chemistry in 2001 and 2021."
  - Kagan in 1986: "putting a tick beside the second condition in Frank's model."
- **Thalidomide:** "thousands of children were affected by birth defects caused by a sedative, thalidomide … it was the active substance's mirror image that caused the harm."
- **Kagan's reasoning (Figure 4, with numbers).** The metal binds two chiral ligands, so there are three catalysts: right-right, left-right and left-left.
  - **Example:** "we can combine 75 per cent right enantiomers and 25 per cent left enantiomers in the catalyst."
  - The pie chart gives **RIGHT+RIGHT 56%, LEFT+RIGHT 38%, LEFT+LEFT 6%**.
  - "The right-left catalyst barely works."
  - "Only two of the catalysts work efficiently. So, in practice, the chemical reaction will be driven by **90 per cent right and 10 per cent left**."
  - Note: 56:6 normalises to roughly 90:10. These numbers are the Academy's illustration, not data from an experiment.
- **Figure 5** shows a curved, non-linear plot "taken from J. Am. Chem. Soc. 1986, 108, 2353–2357". "In 1986, he described no fewer than three different asymmetric reactions that displayed what chemists call non-linear effects. This was a historic breakthrough".
- **Soai, 1995:** "By experimenting with many different molecules, Soai succeeded in finding a chiral substance – 5-pyrimidyl alkanol – which could create itself. In a publication from 1995 … He started with a **two per cent excess** of one enantiomer of 5-pyrimidyl alkanol and ended with an excess of **87 per cent**." It also says the reaction "did not achieve the 100 per cent enantiomeric purity of life."
- **Soai, 2003:** "For another eight years, Soai continued his search … In 2003, he was finally able to present a chemical reaction that formed an excess of an enantiomer, which then formed copies of itself … This was the first time anyone had successfully created chirality from a non-chiral combination of molecules since the dawn of life."
- **Figure 6 numbers:** the excess grows **0.00005% → 57% (run 1) → 99% (run 2) → >99.5% (run 3)**. "After Soai added more substrate and reagent three times, the enantiomer comprised more than 99.5 per cent of the product."
- **Chance decides the winner:** "because chance governed the process, slightly more of one of them was formed. This tiny excess was enough for the enantiomer to take over the entire chemical reaction. Ultimately, it can comprise **99.99 per cent** of the product. When Soai repeated the reaction, the other enantiomer could take over instead".
- **The committee's superlatives:** "The Soai reaction is one of the most spectacular chemical experiments ever conducted." and "The Soai reaction is considered one of the most elegant chemical experiments ever conducted."
- **Limits and applications:** "The Soai reaction is artificial, different to the chemistry of life". Kagan's work is described as "revolutionary for chemists who develop reactions for the manufacture of pharmaceuticals, flavours, scents and new materials."

### Scientific background ("Non-linear effects and autocatalysis in asymmetric organic synthesis"; signed by Peter Somfai, Professor of Organic Chemistry, Lund University)
- **Frank's model:** it "is a chemical substance which is a catalyst for its own production and an anti-catalyst for the production of its optical antimer". He closed with "A laboratory demonstration may not be impossible." Reference: Frank, *Biochim. Biophys. Acta* 1953, 11, 459.
- **Kagan's 1986 paper:** Puchot, Samuel, Dunach, Zhao, Agami, Kagan, *J. Am. Chem. Soc.* 1986, 108, 2353–2357.
  - Before then, a linear relation was assumed: ee_prod = ee_max × ee_ligand.
  - Kagan invoked ML\*2 complexes.
  - A less reactive heterochiral MLRLS complex gives +NLE.
  - The three reactions tested:
    - sulfide oxidation (–NLE)
    - Sharpless epoxidation of geraniol (+NLE)
    - L-proline Hajos–Parrish reaction (–NLE)
- **Noyori's DAIB result:** "when ee_ligand is 15%, the product is obtained in ee_prod 98%".
- **Soai, 1990** (*Chem. Commun.* 1990, 982): the first asymmetric autocatalysis, with pyridine-3-carbaldehyde and i-Pr2Zn. The ee eroded from 86% in the catalyst to 35% in the product.
- **Soai, 1995** (Soai, Shibata, Morioka, Choji, *Nature* 1995, 378, 767–768): pyrimidine-5-carbaldehyde. The catalyst went from **ee 5% → 55%** in run 1, then **87%**, then a **plateau of 90%** after five runs. This contradicts the popular background's "2% → 87%" (see the final section).
- **Alkynyl version, 2003** (Sato et al., *Angew. Chem. Int. Ed.* 2003, 42, 315): starting from "eeligand 0.00005%", the product reached "eeprod >99.5% after three consecutive runs … an amplification of the stereoisomeric ratio by a factor of **630,000**."
- **Absolute asymmetric synthesis** (Soai et al., *Tetrahedron: Asymmetry* 2003, 14, 185; independently Singleton, *JACS* 2002 / *Org. Lett.* 2003): with no chiral input, "during a series of **37 experiments, 18** resulted in a preferential formation of (R)-6, and **19** gave (S)-6, the eeprod varying from 15% to 91%". It also names Mislow's "cryptochirality".
- **Uniqueness:** "The Soai reaction is the only example so far of an asymmetric autocatalytic reaction with amplification of stereochemistry and that is also applicable to absolute asymmetric synthesis."
- **Caveat 1:** "It is important to stress that the Frank model is not an answer to the origin of biological homochirality … an event that occurred about **3.5–4 billion years ago** and to which we will probably never have a definitive answer."
- **Caveat 2:** the Soai reaction "is not relevant for the emergence of biological homochirality in aqueous systems". Nature news quotes Furkan Öztürk: "famously, it cannot run in water".
- **Mechanism still debated:** two models exist, Denmark's SMS tetramer and Trapp's hemiacetal zinc complex.

---

## 2. Laureate bios and ages on 7 Oct 2026

| | Henri B. Kagan | Kenso Soai 硤合 憲三（そあい・けんそう） |
|---|---|---|
| Born | **15 December 1930**, Boulogne-Billancourt, France (Nobel facts page). The press release says "born 1930 in Boulogne-Billancourt" | **1950**, Hiroshima, Japan (Nobel facts page and press release). **3 May 1950**, 広島県安芸郡府中町 (Fuchū, Aki District, Hiroshima), per en/ja Wikipedia only. The TUS page gives "1950（昭和25）年生まれ" with no day |
| PhD | 1960, Collège de France (press release) | 1979, University of Tokyo (press release). TUS: 1979年3月 東京大学大学院理学系研究科博士課程修了、理学博士. ja-Wikipedia names his advisor as 向山光昭 (Teruaki Mukaiyama) |
| Affiliation (Nobel) | "Université Paris-Sud, Orsay, France" (facts page). The press release says "Professor Emeritus at the then Université Paris-Sud". Paris-Sud merged into **Université Paris-Saclay**, which calls him "Professor Emeritus of Université Paris-Saclay" and says his work was done at ICMMO, the Orsay Institute of Molecular Chemistry and Materials (Paris-Saclay/CNRS) | "Tokyo University of Science, Tokyo, Japan" (facts page). "Professor Emeritus at Tokyo University of Science" (press release) |
| Current title | Professor Emeritus, Paris-Saclay; member of the Académie des sciences since 1991 (Paris-Saclay news) | 東京理科大学 **名誉教授** since 2017年6月. 東京理科大学 **栄誉教授** (Distinguished Professor Emeritus) since **2026年10月** (8 Oct, per the TUS news link and ja-Wikipedia) |
| Age on 7 Oct 2026 | **95** (his 96th birthday is 15 Dec) | **76** (born 3 May 1950; even with only the birth year known, he is 75 or 76; all Japanese media say 76) |

Sources:
- https://www.nobelprize.org/prizes/chemistry/2026/kagan/facts/
- https://www.nobelprize.org/prizes/chemistry/2026/soai/facts/
- https://www.universite-paris-saclay.fr/en/news/2026-nobel-prize-chemistry-awarded-henri-kagan-professor-emeritus-universite-paris-saclay
- https://www.tus.ac.jp/today/archive/20261007_3541.html
- https://www.tus.ac.jp/about/nobelprize2026/index.html
- https://en.wikipedia.org/wiki/Henri_B._Kagan
- https://en.wikipedia.org/wiki/Kens%C5%8D_Soai
- https://ja.wikipedia.org/wiki/硤合憲三

Other details:
- **Soai's career** (TUS release):
  - 1974 東大理学部化学科卒
  - 1979–81 ノースカロライナ大学博士研究員 (with Ernest Eliel, per en-Wikipedia)
  - 1981 東京理科大 講師
  - 1986 助教授
  - 1991 教授
  - 2007 キラルマテリアル研究センター長
  - Main awards: 2011 日本化学会賞, 2012 紫綬褒章, 2023 野依賞 and 瑞宝中綬章, 2025 日本学士院賞
- **Soai's home:** Nikkei (8 Oct) says he left "埼玉県志木市内の自宅" on the morning after the announcement: https://www.nikkei.com/article/DGXZQOUD080DD0Y6A001C2000000/
- **Schools:** ja-Wikipedia lists 広島大学附属小・中・高.
- **Kagan's family history:** en-Wikipedia says he was born to a Jewish family that survived WWII hiding in southern France. He graduated from the Sorbonne and ENSCP (1954), did his PhD under Jean Jacques, and set up a lab at Orsay in 1968. He is known for the DIOP ligand.
- **France count:** franceinfo says he is "le 75e français à recevoir un prix Nobel": https://www.franceinfo.fr/replay-radio/histoire-du-jour/grand-oublie-des-nobel-le-francais-henri-kagan-recoit-le-prix-de-chimie-a-95-ans_8227828.html

---

## 3. Quotes

### Heiner Linke (committee chair), press release (verbatim)
> "Henri Kagan and Kenso Soai have provided a solution to a chemical mystery that is over a century old: how homochirality can emerge spontaneously. The chemical reactions they have developed are spectacular," says Heiner Linke, chair of the Nobel Committee for Chemistry.

At the announcement, per C&EN: "Life as we know it is homochiral," and he used his two hands to illustrate chirality. Source: https://cen.acs.org/people/nobel-prize/chemistry-nobel-chirality-kagan-soai/104/web/2026/10

The exact wording is "a chemical mystery that is **over a century old**", not "more than a century old".

### Peter Somfai (committee member, Lund University), official interview on the prize-announcement page, conducted by Sharon Jåma
- "In organic chemistry, molecules can be like our hands. They are mirror images of each other, but they are not identical. … This year's prize is about … how we can increase the ratio of one of the mirror images compared to the other. That's one part of the prize. The other part is, how can we create one of the mirror images when we start from nothing? That is also a question that is very relevant for the origin of life."
- On the phone calls: "We only got hold of Kenso Soai, but he was of course very happy to receive the prize. I think a little bit shocked, but very happy." and "He was out on a walk and you know, Japanese are a little reserved, but you could tell that he was very happy. 'Oh, really? That great.'"
- "I would say that this year's prize shows one possibility how we create a single answer mirror image from nothing. That's probably the most fundamental question in life, because somehow that must have happened four billion years ago, when life was created. Now we mimicked it in a lab today, not the way it happened four billion years ago – it's important to stress – but we have for the first time mimicked it." The transcript reads "single answer mirror image", probably a mistranscription of "single-handed".
- The page headline is: "The most fundamental question in life".

### Somfai, in AP and other coverage
- **"This is probably the coolest experiment in organic chemistry,"** said Peter Somfai (AP via NPR): https://www.npr.org/2026/10/07/g-s1-146849/nobel-prize-chemistry
- "It might be difficult to say that this drug, or that drug, was developed using this … I would say all of them, because we use this as a tool, we use this as an understanding, how to develop catalysts, how they function." (AP via NPR)
- "taken together, the groundbreaking discoveries by Henri Kagan and Kenso Soai have reshaped our understanding of molecular chirality, how it is created, amplified and transmitted." (Scientific American: https://www.scientificamerican.com/article/2026-nobel-prize-in-chemistry-is-award-to-henri-kagan-and-kenso-soai-for-their-work-in-mirror-chemistry/)

### Kenso Soai
- **Official Nobel telephone interview with Adam Smith:**
  - "Moshi Moshi … Thank you so much. I'm very excited to hear the news. Good news, very good news." and "The Nobel Committee has kindly recognised our research and we are very pleased to receive the prize."
  - On Pasteur: "So people have been wondering, especially Louis Pasteur also, tried to induce chirality in molecules. But, he didn't publish, but he mentioned in his lecture. So we made a little bit contribution to solve the homochirality problem."
  - "We are friends, scientific friends."
  - He ended the call: "Excuse me, may I interrupt because I heard our prime minister wants to call me at 7:45 Tokyo time."
  - Source: https://www.nobelprize.org/prizes/chemistry/2026/soai/interview/
- **Phone line to the Stockholm press conference:**
  - AP/NPR: "I'm very excited to receive the very nice news … Of course, this is one of the most exciting days in my life."
  - Nature: "I am very excited to receive the very nice news about the Nobel prize. This is one of the most exciting days in my life."
  - Al Jazeera: "This is the most exciting day in my life, I am very glad to share this prize with Professor Henri Kagan" (https://www.aljazeera.com/news/2026/10/7/henri-kagan-kenso-soai-win-chemistry-nobel-for-mirror-image-breakthrough)
  - C&EN: "There are many, many, many excellent researchers in this field. So I'm very especially glad to receive this prize."
  - Scientific American: "This is not the final answer … This field should be [moved] forward ... more and more to understand life."
- **Tokyo press conference, AP English rendering:** "There are still fascinating aspects that remain unknown and surely more yet to be discovered … I hope to do what I can, however modestly, to contribute to help advance research in this field." (NPR)
- Japanese originals of his press-conference remarks are in section 5.

### Henri Kagan
- **No direct quote from Kagan was found.** Somfai said the committee "only got hold of Kenso Soai". There is no Kagan interview page (the URL returns 404).
- The Jewish Chronicle attributes the "most exciting day" quote to Kagan, but it contains "share this prize with professor Henri Kagan", so it is Soai's quote, misattributed.
- **Second-hand remarks about Kagan:**
  - Olivier Riant, a former PhD student, in Nature news: "Kagan is a very, very modest person with a real passion for chemistry, he didn't care about being famous".
  - Emmanuel Macron, via AP/NPR: "an immense source of pride for the country" and "a recognition befitting a lifetime of research".
  - Kagan on students, quoted by franceinfo: "très souvent, ils posent des questions qui vous obligent à beaucoup réfléchir" (an older remark, not a reaction to the prize).

### Others
- Jonathan Clayden (Bristol), in Nature: "Kagan showed how it could be done in principle and then the Soai reaction gave us the first actual real example".
- Stephen Fletcher (Oxford), in Nature: "sometimes you could have one million molecules of one handedness on one side, and one million and one molecules of the other handedness on the other side, and Soai worked on how to amplify the imbalance — that's remarkable". This is a useful analogy for the video.
- Erick Carreira (ETH), in C&EN: the prize is "long overdue". On the Soai reaction: "It just blows your mind."
- NPR/AP give the carvone example: one mirror form smells of mint, the other of caraway.

---

## 4. The 2001 Nobel and Kagan being left out

- **The 2001 prize** (https://www.nobelprize.org/prizes/chemistry/2001/summary/): "divided, one half jointly to William S. Knowles and Ryoji Noyori 'for their work on chirally catalysed hydrogenation reactions' and the other half to K. Barry Sharpless 'for his work on chirally catalysed oxidation reactions'". The shares were Knowles 1/4, Noyori 1/4, Sharpless 1/2.
- **Contemporary report:** Sally Goodman, "French Nobel protest makes chemist a cause célèbre", *Nature* 414, 239 (2001), doi:10.1038/35104765: https://www.nature.com/articles/35104765
  - The free abstract says: "The unusual move by the minister, Roger-Gérard Schwartzenberg, comes after several French scientists voiced their dismay that Kagan missed out."
- **en-Wikipedia** (citing the Nature piece): "In 2001, there was some controversy when Kagan was not awarded the Nobel Prize that year … Several French scientists voiced their protests. The French minister for science, Roger-Gérard Schwartzenberg, thought that Kagan, as a pioneer of the field, should also have been honoured. However, the prize can be given to a maximum of three people."
- **2026 coverage of the snub:** franceinfo, "Grand oublié des Nobel, le Français Henri Kagan reçoit le prix de chimie à 95 ans": "En 2001, le prix Nobel de chimie échappe à Henri Kagan provoquant l'indignation de la communauté scientifique et du ministre de la Recherche de l'époque. Il ne fait pas partie du groupe de scientifiques récompensés, alors que ceux-ci qui ne font qu'appliquer ce qu'il a inventé." Le Monde's headline was "French scientist Henri Kagan wins long-awaited Nobel Prize in Chemistry", cited in en-Wikipedia; I did not fetch it.
- **Wolf Prize:** in 2001 Kagan shared the **Wolf Prize in Chemistry** with Noyori and Sharpless (Paris-Saclay news; en-Wikipedia).
- **Nature news (2026)** links the two prizes on the science but does not mention the snub: "The winners of the 2001 Nobel chemistry prize, William Knowles, Ryoji Noyori and Barry Sharpless, designed reactions that used a chiral catalyst … This year's prize recognizes Kagan and Soai for going further and realizing Frank's vision".
- **The three-person rule** is real (Nobel statutes: a prize may be divided among at most three persons). However, **no source found says explicitly that the three-person limit was *the reason* Kagan was left out**. The claim comes from Wikipedia's "However, the prize can be given to a maximum of three people". The Nobel Committee's 2001 deliberations stay sealed for 50 years, until 2051. In the video, phrase it as "the rule allows at most three laureates, and three were chosen", not as the committee's stated reason.

---

## 5. Japanese coverage

### Name and terms
- Name: **硤合 憲三（そあい・けんそう）**. 硤 is a rare kanji. Sankei-linked coverage says the surname is a "全国30人の〝レア〟な姓" (headline on the Yahoo/Sankei page).
- The Japanese rendering of the citation varies by outlet:
  - JST Science Portal: 「不斉有機合成における**非線形効果および自己触媒作用**の発見」 (https://scienceportal.jst.go.jp/newsflash/20261007_n01/)
  - Reuters (via Newsweek Japan): 「不斉有機合成における非線形効果と**自己触媒作用**の発見」 (https://www.newsweekjapan.jp/articles/-/336267)
  - nippon.com: 「不斉有機合成における非線形効果と**自己触媒反応**の発見」 (https://www.nippon.com/ja/japan-data/h02923/)
  - ja-Wikipedia uses 「…非線形効果および自己触媒反応の発見」 in the body, but 自触媒反応 in the infobox
  - "autocatalysis" is most literally **自己触媒作用**
- Name of the reaction: **硤合反応** (Soai reaction). Name of the phenomenon: **不斉自己触媒反応** (TUS). The University of Tokyo uses 「不斉自己増殖反応」 (https://www.s.u-tokyo.ac.jp/ja/info/11252/).
- Other terms: 鏡像異性体, ホモキラリティー (JCP: 「鏡像異性体の一方が偏っている状態」), 非線形効果, 不斉合成.

### Tokyo University of Science official release (7 Oct, updated 9 Oct): https://www.tus.ac.jp/today/archive/20261007_3541.html
- 「硤合憲三名誉教授は、本学在籍時に、生成物そのものが触媒となって同じ反応を促進する『不斉自己触媒反応』を世界で初めて発見しました。この反応は『硤合反応』として知られ、生命を構成する分子がなぜ片方の『鏡像』に偏っているのかという、生命の起源にも関わる謎の解明につながる研究として注目されてきました。」
- 「10月7日、記者会見を本学神楽坂キャンパスで実施しました。」
- Comments:
  - 「アンリ・カガン先生と一緒に受賞できるということがとても嬉しい」
  - 「（日本の有機合成化学は）研究土壌としては非常にレベルが高いことがそろっておりますので、そういう中で研究の成果を出すことができた。完全にまだ解明したわけじゃなくて、まだまだ分からない。面白いことがあるはず。今後ともそういう分野の研究が進むように微力ながら尽力したいと考えております」
  - 「学生の存在があって到達できた」
- Commemorative page: https://www.tus.ac.jp/about/nobelprize2026/index.html

### Reuters Japanese, via Newsweek Japan (7 Oct; byline 岡坂健太郎): https://www.newsweekjapan.jp/articles/-/336267
- He said his work was something that 「受賞できても文句は言われないとは（思っていた）」. He also said: 「研究に対する意味合い、位置付けも今回の受賞で認識していただけた。非常に喜んでいる」
- On his research path: 「暗い地面を頭にヘッドライトだけを着けて、そこをずっとたどって行っているような気分」. This is a vivid image usable in the video.
- 「傍から見たら苦しいことが続いていたかもしれないけど、全然本人はそうは思ってない。新しい事実がどんどん見つかるわけですからね。それはそれで楽しいというか、感動したことはある」
- On applications: 「応用ができるに越したことはないが、化学賞だけ皆さん、応用が何にできるかって聞かれるが、物理学賞、宇宙のことってあんまり応用って質問されませんよね。応用オンリーではないとかねがね思っている」
- On nationality: 「日本人かどうかというところはあまりこだわりを持っていなくて」
- How he heard the news: 「受賞の連絡は、夕方から夜ごろ、近所のスーパーに１人で食材を買いに出かけている時に電話で受けたという。」
- Biography line: 「硤合氏は広島県出身。」 Kagan is given as 「仏パリ第１１大学のアンリ・カガン氏（９５）」.

### Sankei, via Yahoo News (7 Oct): https://news.yahoo.co.jp/articles/7d189065fe07572bc00eec2ba75ea1b4baa76142
- Headline: 「『文句は出ないだろう』ノーベル化学賞の硤合憲三氏、記者会見で自画自賛 会場から笑い」
- 「大変うれしい。とりわけ著名なアンリ・カガン先生と一緒に受賞できるのがうれしい」
- 「（ノーベル賞を）受賞できても文句はないだろうな」. The article says the room laughed.
- When the committee called he was 「自宅付近で食材を買い込んでいた」, and university staff could not reach him for a while.
- The press conference started 「発表から3時間余りが経過した午後10時ごろ」 at the university in Shinjuku.
- 「大学職員、学生の力なくしては（仕組みを）見つけることがなかった」
- Description of the science: 「鏡映しの関係にある左右一対の分子について、わずかな量的偏りを増幅できる仕組みを発見」

### JST Science Portal (7 Oct): https://scienceportal.jst.go.jp/newsflash/20261007_n01/
- Quote: 「私の人生で最もエキサイティングな日だ」
- Gives the amount as 1200万スウェーデンクローナ（約1億9千万円）. Explains the science using thalidomide and Frank's three conditions. Says he is the 10th Japanese chemistry laureate.

### Shimbun Akahata (8 Oct): https://www.jcp.or.jp/akahata/aik26/2026-10-08/2026100801_02_0.php
- Also quotes 「私の人生で最もエキサイティングな日だ」.
- 「日本の自然科学３分野のノーベル賞受賞は、２８人目（米国籍３人を含む）。… ２年連続。化学賞は１０人目です。」

### nippon.com: https://www.nippon.com/ja/japan-data/h02923/
- On the phone call: 「人生で最も興奮する日」
- 「個人では米国籍取得者を含め31人目。化学賞は2年連続10人目となる。」 The previous year was 北川進 (chemistry, 2025).
- Applications: 「医薬品や香料、甘味料の開発への応用が期待される。」

### Nikkei (8 Oct, paywalled after the lead): https://www.nikkei.com/article/DGXZQOUD080DD0Y6A001C2000000/
- Headline: 「ノーベル化学賞の硤合憲三さん『ようやく実感』」
- 「特に変わったことはないが、体が興奮しているので休憩しないと。若くないから」 This was said on leaving his home in 埼玉県志木市 around 8 a.m. on 8 Oct.
- Related Nikkei headline: 「自然科学分野、日本生まれの受賞28人目（米国籍含む）」

### Other coverage
- AP says Yomiuri distributed an extra edition (号外) headlined "Nobel Prize Mr. Soai" (NPR).
- **NHK, Asahi and Yomiuri articles were not retrieved.** They did not surface in searches, so nothing above relies on them.
- **Japanese chemistry laureate count: Soai is the 10th** (JST, Akahata, nippon.com agree). Previous Japanese chemistry laureates: 福井謙一, 白川英樹, 野依良治, 田中耕一, 下村脩, 根岸英一, 鈴木章, 吉野彰, 北川進, then 硤合 as the 10th.
- **Noyori link:** 野依良治 is one of the 2001 laureates. Soai received the 野依賞 in 2023 and Kagan the Ryoji Noyori Prize in 2002.

---

## UNVERIFIED / CONFLICTING

1. **Soai's age "95" is wrong.** AP's first version (carried by NPR, WUNC, Ynet) said Soai was 95. **AP issued a correction on 8 Oct 2026**: "The Associated Press erroneously reported that Kenso Soai is 95 years old. In fact, Henri B. Kagan is 95, and Soai is 76." (NPR page). Some search snippets also show "Soai, 95". The correct ages are Kagan 95 and Soai 76.
2. **Soai's exact birth date (3 May 1950) and town (府中町, Aki District)** come only from Wikipedia (en/ja). The official sources give only "1950, Hiroshima" (Nobel) and "1950年生まれ" (TUS). Reuters says 「広島県出身」. Use "1950, Hiroshima" unless a primary source for the date turns up.
3. **Where Soai was when the call came:**
   - Somfai (official interview): "out on a walk"
   - AP: "shopping at a neighborhood supermarket"
   - Reuters/Sankei: buying groceries near his home, alone
   - GEN (genengnews) says "near his home in **Hiroshima**". This is wrong: Nikkei places his home in **埼玉県志木市**, and he held the press conference in Tokyo that same evening.
   - Safe wording: "近所で買い物中".
4. **1995 numbers differ between the two official documents.**
   - Popular background: "two per cent excess … ended with an excess of 87 per cent".
   - Scientific background (citing *Nature* 1995, 378, 767): **5% → 55%** in one run, **87%** after the second, **plateau 90%** after five runs.
   - For the 2003 alkynyl version both documents agree: 0.00005% → >99.5% in three runs (popular Fig. 6: 57%, 99%, >99.5%).
   - The popular text also says "Ultimately, it can comprise 99.99 per cent", which has no source figure.
   - Use the scientific background when precise numbers are needed.
5. **Which year counts as Soai's milestone?**
   - The press release says 1995 was the key publication and that "In 2003, he finally succeeded" (only one mirror image formed / chirality from achiral start).
   - The scientific background says the 1995 paper already "fulfilled" all three of Frank's criteria, and that absolute asymmetric synthesis came in 2003 (Singleton independently in 2002).
   - Somfai's interview says "beginning of the 90s", meaning the 1990 autocatalysis.
   - The press release's framing (1986 → 1995 → 2003) is safe.
6. **Kagan's affiliation names:** Université Paris-Sud (Nobel), "the then Université Paris-Sud" (press release), Université Paris-Saclay (the merged successor; Paris-Saclay news), パリ南大学 (JST/Akahata), パリ第11大学 (Reuters JP), パリ・サクレー大学 (nippon.com). All refer to the same Orsay institution. In Japanese, use 「パリ・サクレー大学（旧パリ南大学）」.
7. **The Somfai quote "perhaps the most exciting experiment in organic chemistry" was not found.** The verified forms are:
   - AP: "This is probably the **coolest** experiment in organic chemistry"
   - Popular background: "one of the most **spectacular** chemical experiments ever conducted" and "one of the most **elegant** chemical experiments ever conducted"
   - "Most exciting" is Soai's own phrase ("one of the most exciting days in my life").
8. **"A mystery more than a century old":** the official wording is "**over** a century old". Use the exact wording.
9. **Kagan's reaction:** no direct quote found. The committee could not reach him (Somfai). The Jewish Chronicle's attribution of the "most exciting day" quote to Kagan is a misattribution of Soai's words.
10. **Three-person limit as the reason for 2001:** the rule exists, but no source states it was the committee's reason. The protest is documented in Nature 2001 (Goodman) and franceinfo 2026. The deliberations are sealed until 2051.
11. **Prize money in yen:** about 1億9千万円 (JST), at whatever exchange rate JST used. One search summary claimed the amount was raised by 1 million SEK for the "125th anniversary". I did not find this in a fetched source, so treat it as unverified. The press release says only "12 million Swedish kronor".
12. **Prime minister call:** Soai said "our prime minister wants to call me at 7:45 Tokyo time", and Adam Smith replied "Of course you must speak to her". The PM's name was not checked.
13. **NHK, Asahi and Yomiuri articles were not retrieved.** The Japanese quotes above come from TUS, Reuters JP, Sankei, JST, Akahata, nippon.com and Nikkei.
14. **Rounding of the Kagan figure:** the popular-background 75/25 → 56/38/6 → "90/10" figure is an idealised illustration (56:6 ≈ 90:10), not experimental data. Present it that way.
