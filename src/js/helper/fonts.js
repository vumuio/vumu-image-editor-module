import { commonFonts } from '@/consts';
import * as WebFont from 'webfontloader';

const step = 20;
const actions = Math.ceil(commonFonts.length / step);
Array(actions)
  .fill(1)
  .forEach((_, index) => {
    console.log(index);
    WebFont.load({
      google: {
        families: commonFonts.slice(index * step, index * step + step),
      },
    });
  });
