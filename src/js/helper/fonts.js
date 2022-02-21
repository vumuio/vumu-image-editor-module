import { googleFonts } from '@/consts';
import * as WebFont from 'webfontloader';

const step = 20;
const actions = Math.ceil(googleFonts.length / step);
Array(actions)
  .fill(1)
  .forEach((_, index) => {
    WebFont.load({
      google: {
        families: googleFonts.slice(index * step, index * step + step),
      },
    });
  });
