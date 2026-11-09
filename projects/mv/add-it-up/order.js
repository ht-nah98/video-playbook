// Thứ tự cảnh: [mốc vào, lớp cảnh]. Mốc tra theo LỜI (tl.at) hoặc mốc nhạc cụ có nguồn (song.js CUE).
import { CUE } from './song.js';
import P01 from './plates/p01-press.js';
import P02 from './plates/p02-twins.js';
import P03 from './plates/p03-lose.js';
import P04 from './plates/p04-cars.js';
import P05 from './plates/p05-erase.js';
import P06 from './plates/p06-family.js';
import P07 from './plates/p07-plusc.js';
import P08 from './plates/p08-forgot.js';
import P09 from './plates/p09-hook1.js';
import P09b from './plates/p09b-press1.js';
import P10 from './plates/p10-tank.js';
import P11 from './plates/p11-strips.js';
import P12 from './plates/p12-whole.js';
import P13 from './plates/p13-hook2.js';
import P13b from './plates/p13b-ride.js';
import P14 from './plates/p14-ftc.js';
import P15 from './plates/p15-gone.js';
import P16 from './plates/p16-area.js';
import P17 from './plates/p17-solid.js';
import P18 from './plates/p18-climb.js';
import P19 from './plates/p19-bridge.js';
import P20 from './plates/p20-hook3.js';
import P20b from './plates/p20b-final.js';
import P21 from './plates/p21-why.js';
import P22 from './plates/p22-chant.js';
import P23 from './plates/p23-hook.js';
import P24 from './plates/p24-loading.js';

export const ORDER = tl => [
  [0, P01],
  [tl.at('Same speed.') - 0.35, P02],                         // nạp giấy xong đúng lúc câu vào
  [tl.at('What did we lose?') - 0.35, P03],
  [tl.at('Two cars moving down the same straight line,') - 0.35, P04],
  [tl.at('Same motion on the meter—') - 0.35, P05],
  [tl.at('Run it backward,') - 0.35, P06],
  [tl.at('F of x plus C,'), P07],                             // cùng tờ với P06 (feed 0)
  [tl.at('If the rate forgot') - 0.35, P08],
  [tl.at('Add it up,'), P09],                                 // ✂ 53.50 cắt cứng: điệp khúc 1
  [tl.at('Let the changing') - 0.35, P09b],
  [tl.at('Now the tank fills up,') - 0.35, P10],
  [tl.at('So break it down.'), P11],                          // cùng tờ với P10 (feed 0)
  [tl.at('No single moment') - 0.35, P12],
  [tl.at('Add it up,', 2), P13],                              // ✂ 112.86 cắt cứng: điệp khúc 2
  [tl.at('Let the changing', 2) - 0.35, P13b],
  [tl.at('Take an antiderivative.') - 0.35, P14],
  [CUE.silence[0], P15],                                      // ✂ 139.94: mọi nhạc cụ im
  [CUE.drumsBack, P16],                                       // ✂ 143.67: trống về
  [tl.at('Now take a solid.'), P17],                          // cùng tờ với P16 (feed 0)
  [tl.at('And suddenly—') - 0.35, P18],
  [tl.at('A rate') - 0.35, P19],
  [tl.at('Add it up,', 3), P20],                              // ✂ 191.92 cắt cứng: điệp khúc cuối
  [tl.at("Don't memorise") - 0.35, P20b],
  [tl.at('Why does it work?') - 0.35, P21],
  [tl.at('From scratch!', 1), P22],                           // ✂✂✂✂ 212.60 / 213.56 / 214.79 / 216.03 (trong cảnh)
  [tl.at('Reverse it.'), P23],                                // ✂ 218.02
  [tl.at('Ninety-nine percent...', 2) - 0.35, P24],           // dừng cứng ở 233.20 = hết bài
];
