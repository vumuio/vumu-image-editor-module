import { commonFonts } from '@/consts';
import * as WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: commonFonts,
  },
});
