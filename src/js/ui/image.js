import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/image';
import { assignmentForDestroy, isSupportFileApi } from '@/util';
import Range from '@/ui/tools/range';
import { defaultSkewRangeValues } from '@/consts';
import NumberInput from '@/ui/tools/numberInput';

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
      imageShape: this.selector('.image-shape-button'),
      imageWidth: new NumberInput(
        {
          increase: this.selector('.tie-width-input-increase'),
          input: this.selector('.tie-number-input-width-value'),
          decrease: this.selector('.tie-width-input-decrease'),
        },
        { value: 600 }
      ),
      imageHeight: new NumberInput(
        {
          increase: this.selector('.tie-height-input-increase'),
          input: this.selector('.tie-number-input-height-value'),
          decrease: this.selector('.tie-height-input-decrease'),
        },
        { value: 400 }
      ),
      skewX: new Range(
        {
          slider: this.selector('.tie-skewx-image-range'),
          input: this.selector('.tie-skewx-image-range-value'),
        },
        defaultSkewRangeValues
      ),
      skewY: new Range(
        {
          slider: this.selector('.tie-skewy-image-range'),
          input: this.selector('.tie-skewy-image-range-value'),
        },
        defaultSkewRangeValues
      ),
    };
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();
    this._els.skewX.destroy();
    this._els.skewY.destroy();
    this._els.imageWidth.destroy();
    this._els.imageHeight.destroy();

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
    const imageShapeTypeSelected = this._changeImageShapeHandler.bind(this);

    this.eventHandler = {
      loadMaskFile,
      imageShapeTypeSelected,
    };

    this.actions = actions;
    this._els.maskImageButton.addEventListener('change', loadMaskFile);
    this._els.imageShape.addEventListener('click', imageShapeTypeSelected);
    this._els.imageWidth.on('change', this._changeInputWidthHandler.bind(this));
    this._els.imageHeight.on('change', this._changeInputHeightHandler.bind(this));
    this._els.skewX.on('change', this._changeSkewXHandler.bind(this));
    this._els.skewY.on('change', this._changeSkewYHandler.bind(this));
  }

  setImageStatus({ width, height, skewX, skewY }) {
    this._els.imageWidth.value = width;
    this._els.imageHeight.value = height;
    this._els.skewX.value = skewX;
    this._els.skewY.value = skewY;
  }
  _changeImageShapeHandler(event) {
    const button = event.target.closest('.tie-image-shape');
    if (button) {
      this.type = this.getButtonType(button, ['rect', 'circle']);
      const toggleChild =
        button[this.type === 'rect' ? 'nextElementSibling' : 'previousElementSibling'];
      toggleChild.classList.remove('active');
      button.classList.add('active');
      this.changeImageShape(this.type);
    }
  }

  _changeInputWidthHandler(value, isLast) {
    this.actions.changeImageAction(
      {
        width: value,
      },
      !isLast
    );
  }
  changeImageShape(type) {
    this.actions.changeImageAction(
      {
        scaleY: 0.3,
        scaleX: 0.3,
      },
      true
    );
  }
  _changeInputHeightHandler(value, isLast) {
    this.actions.changeImageAction(
      {
        height: value,
      },
      !isLast
    );
  }
  _changeSkewXHandler(value, isLast) {
    this.actions.changeImageAction(
      {
        skewX: value,
      },
      !isLast
    );
  }
  _changeSkewYHandler(value, isLast) {
    this.actions.changeImageAction(
      {
        skewY: value,
      },
      !isLast
    );
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.maskImageButton.removeEventListener('change', this.eventHandler.loadMaskFile);
    this._els.imageShape.removeEventListener('change', this.eventHandler.imageShapeTypeSelected);
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
      this.actions.insertImg(imgUrl, file);
    }
  }
}

export default Image;
