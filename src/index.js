import '@/polyfill';
import ImageEditor from '@/imageEditor';
import '@css/index.styl';

// commands
import '@/command/addIcon';
import '@/command/addLogo';
import '@/command/addImageObject';
import '@/command/addObject';
import '@/command/addShape';
import '@/command/addText';
import '@/command/applyFilter';
import '@/command/changeIconColor';
import '@/command/changeShape';
import '@/command/changeImage';
import '@/command/changeText';
import '@/command/changeTextStyle';
import '@/command/clearObjects';
import '@/command/flip';
import '@/command/loadImage';
import '@/command/removeFilter';
import '@/command/removeObject';
import '@/command/resizeCanvasDimension';
import '@/command/rotate';
import '@/command/setObjectProperties';
import '@/command/setObjectPosition';
import '@/command/changeSelection';
import '@/command/resize';
import '@/helper/fonts';

export default ImageEditor;
export { ImageEditor };
