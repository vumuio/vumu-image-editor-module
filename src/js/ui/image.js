import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/image';
import { assignmentForDestroy, isSupportFileApi } from '@/util';

/**
 * Image ui class
 * @class
 * @ignore
 */
class Image extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'image',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });

    this._els = {
      maskImageButton: this.selector('.tie-mask-image-file'),
    };
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();

    assignmentForDestroy(this);
  }

  /**
   * Add event for image
   * @param {Object} actions - actions for crop
   *   @param {Function} actions.loadImageFromURL - load image action
   *   @param {Function} actions.applyFilter - apply filter action
   */
  addEvent(actions) {
    const loadMaskFile = this._loadMaskFile.bind(this);

    this.eventHandler = {
      loadMaskFile,
    };

    this.actions = actions;
    this._els.maskImageButton.addEventListener('change', loadMaskFile);
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.maskImageButton.removeEventListener('change', this.eventHandler.loadMaskFile);
  }

  /**
   * Load image file
   * @param {object} event - File change event object
   * @private
   */
  _loadMaskFile(event) {
    let imgUrl;

    if (!isSupportFileApi()) {
      alert('This browser does not support file-api');
    }

    const [file] = event.target.files;

    if (file) {
      imgUrl = URL.createObjectURL(file);
      this.actions.loadImageFromURL(imgUrl, file);
    }
  }
}

export default Image;
