import snippet from 'tui-code-snippet';
import Colorpicker from '@/ui/tools/colorpicker';
import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/icon';
import { isSupportFileApi, assignmentForDestroy } from '@/util';
import { defaultIconPath, defaultSkewRangeValues, eventNames, selectorNames } from '@/consts';
import Range from '@/ui/tools/range';

/**
 * Icon ui class
 * @class
 * @ignore
 */
const ICON_DEFAULT_OPTION = {
  left: 200,
  top: 200,
  fill: '#ffbb3b',
  skewY: 0,
  skewX: 0,
};
class Icon extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'icon',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });

    this.iconType = null;
    this._iconMap = {};

    this._els = {
      // registerIconButton: this.selector('.tie-icon-image-file'),
      addIconButton: this.selector('.tie-icon-add-button'),
      iconColorpicker: new Colorpicker(this.selector('.tie-icon-color'), {
        defaultColor: '#ffbb3b',
        toggleDirection: this.toggleDirection,
        usageStatistics: this.usageStatistics,
      }),
      skewX: new Range(
        {
          slider: this.selector('.tie-skewx-icon-range'),
          input: this.selector('.tie-skewx-icon-range-value'),
        },
        defaultSkewRangeValues
      ),
      skewY: new Range(
        {
          slider: this.selector('.tie-skewy-icon-range'),
          input: this.selector('.tie-skewy-icon-range-value'),
        },
        defaultSkewRangeValues
      ),
    };

    this.colorPickerInputBox = this._els.iconColorpicker.colorpickerElement.querySelector(
      selectorNames.COLOR_PICKER_INPUT_BOX
    );
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();
    this._els.iconColorpicker.destroy();

    assignmentForDestroy(this);
  }

  /**
   * Add event for icon
   * @param {Object} actions - actions for icon
   *   @param {Function} actions.registerCustomIcon - register icon
   *   @param {Function} actions.addIcon - add icon
   *   @param {Function} actions.changeColor - change icon color
   */
  addEvent(actions) {
    const registerIcon = this._registerIconHandler.bind(this);
    const addIcon = this._addIconHandler.bind(this);

    this.eventHandler = {
      registerIcon,
      addIcon,
    };

    this.actions = actions;
    this._els.iconColorpicker.on('change', this._changeColorHandler.bind(this));
    this._els.skewX.on('change', this._changeSkewXRangeHandler.bind(this));
    this._els.skewY.on('change', this._changeSkewYRangeHandler.bind(this));
    // this._els.registerIconButton.addEventListener('change', registerIcon);
    this._els.addIconButton.addEventListener('click', addIcon);

    this.colorPickerInputBox.addEventListener(
      eventNames.FOCUS,
      this._onStartEditingInputBox.bind(this)
    );
    this.colorPickerInputBox.addEventListener(
      eventNames.BLUR,
      this._onStopEditingInputBox.bind(this)
    );
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.iconColorpicker.off();
    // this._els.registerIconButton.removeEventListener('change', this.eventHandler.registerIcon);
    this._els.addIconButton.removeEventListener('click', this.eventHandler.addIcon);

    this.colorPickerInputBox.removeEventListener(
      eventNames.FOCUS,
      this._onStartEditingInputBox.bind(this)
    );
    this.colorPickerInputBox.removeEventListener(
      eventNames.BLUR,
      this._onStopEditingInputBox.bind(this)
    );
  }

  /**
   * Clear icon type
   */
  clearIconType() {
    this._els.addIconButton.classList.remove(this.iconType);
    this.iconType = null;
  }

  /**
   * Register default icon
   */
  registerDefaultIcon() {
    snippet.forEach(defaultIconPath, (path, type) => {
      this.actions.registerDefaultIcons(type, path);
    });
  }

  /**
   * Set icon picker color
   * @param {string} iconColor - rgb color string
   */
  setIconPickerColor(iconColor) {
    this._els.iconColorpicker.color = iconColor;
  }
  set skewX(value) {
    this._els.skewX.value = value;
  }
  /**
   * Set skew size
   * @param {Number} value - text size
   */
  set skewY(value) {
    this._els.skewY.value = value;
  }

  /**
   * Returns the menu to its default state.
   */
  changeStandbyMode() {
    this.clearIconType();
    this.actions.cancelAddIcon();
  }

  /**
   * Change icon color
   * @param {string} color - color for change
   * @private
   */
  _changeColorHandler(color) {
    color = color || 'transparent';
    this.actions.changeIcon({ color });
  }
  /**
   * skew x set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeSkewXRangeHandler(value, isLast) {
    console.log('skew-change');
  }
  /**
   * skew y align set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeSkewYRangeHandler(value, isLast) {
    console.log('skew-change');
  }

  /**
   * Change icon color
   * @param {object} event - add button event object
   * @private
   */
  _addIconHandler(event) {
    debugger;
    const button = event.target.closest('.tui-image-editor-button');

    if (button) {
      const iconType = button.getAttribute('data-icontype');
      const iconColor = this._els.iconColorpicker.color;
      this.actions.discardSelection();
      // this.actions.changeSelectableAll(false);
      this._els.addIconButton.classList.remove(this.iconType);
      this._els.addIconButton.classList.add(iconType);

      if (this.iconType === iconType) {
        this.changeStandbyMode();
      } else {
        this.actions.addIcon(iconType, ICON_DEFAULT_OPTION);
        this.iconType = iconType;
      }
    }
  }

  /**
   * register icon
   * @param {object} event - file change event object
   * @private
   */
  _registerIconHandler(event) {
    let imgUrl;

    if (!isSupportFileApi) {
      alert('This browser does not support file-api');
    }

    const [file] = event.target.files;

    if (file) {
      imgUrl = URL.createObjectURL(file);
      this.actions.registerCustomIcon(imgUrl, file);
    }
  }
}

export default Icon;
