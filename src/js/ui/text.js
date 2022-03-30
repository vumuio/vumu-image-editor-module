import Range from '@/ui/tools/range';
import Colorpicker from '@/ui/tools/colorpicker';
import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/text';
import { assignmentForDestroy } from '@/util';
import {
  defaultSkewRangeValues,
  defaultTextRangeValues,
  eventNames,
  selectorNames,
} from '@/consts';

/**
 * Crop ui class
 * @class
 * @ignore
 */
class Text extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'text',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });
    this.effect = {
      bold: false,
      italic: false,
      underline: false,
    };
    this.align = 'tie-text-align-left';
    this._els = {
      textEffectButton: this.selector('.tie-text-effect-button'),
      textAddNewTextButton: this.selector('.tie-add-new-text-button'),
      addFallbackLabels: this.selector('.tie-fallback-label'),
      textFontFamily: this.selector('.tie-font-family-select'),
      fontFamilyList: this.selector('.font-family-list'),
      fontName: this.selector('.selected-font'),
      fontFamilyWrapper: this.selector('.font-family-wrapper'),
      textAlignButton: this.selector('.tie-text-align-button'),
      textColorpicker: new Colorpicker(this.selector('.tie-text-color'), {
        defaultColor: '#000000',
        toggleDirection: this.toggleDirection,
        usageStatistics: this.usageStatistics,
      }),
      textRange: new Range(
        {
          slider: this.selector('.tie-text-range'),
          input: this.selector('.tie-text-range-value'),
        },
        defaultTextRangeValues
      ),
      skewX: new Range(
        {
          slider: this.selector('.tie-skewx-range'),
          input: this.selector('.tie-skewx-range-value'),
        },
        defaultSkewRangeValues
      ),
      skewY: new Range(
        {
          slider: this.selector('.tie-skewy-range'),
          input: this.selector('.tie-skewy-range-value'),
        },
        defaultSkewRangeValues
      ),
    };

    this.colorPickerInputBox = this._els.textColorpicker.colorpickerElement.querySelector(
      selectorNames.COLOR_PICKER_INPUT_BOX
    );
    this._els.fontName.style.fontFamily = 'Alef'; // init style for select
    this._els.fontName.innerHTML = 'Alef'; // init style for select
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();
    this._els.textColorpicker.destroy();
    this._els.textRange.destroy();
    this._els.skewX.destroy();
    this._els.skewY.destroy();

    assignmentForDestroy(this);
  }

  /**
   * Add event for text
   * @param {Object} actions - actions for text
   *   @param {Function} actions.changeTextStyle - change text style
   */
  addEvent(actions) {
    const setTextEffect = this._setTextEffectHandler.bind(this);
    const setTextAlign = this._setTextAlignHandler.bind(this);
    const setFontFamily = this._changeFontFamilyHandler.bind(this);
    const selectFontFamily = this._selectFontFamily.bind(this);
    const clickFontFamily = this._clickFontFamily.bind(this);
    const callAddNewText = this._addNewTextHandler.bind(this);
    const callAddFallbackLabels = this._addFallbackLabels.bind(this);
    const hideSelect = this._hideFontFamily.bind(this);

    this.eventHandler = {
      setTextEffect,
      setTextAlign,
      setFontFamily,
      callAddNewText,
      callAddFallbackLabels,
    };

    this.actions = actions;
    this._els.textEffectButton.addEventListener('click', setTextEffect);
    this._els.textAlignButton.addEventListener('click', setTextAlign);
    this._els.textAddNewTextButton.addEventListener('click', callAddNewText);
    this._els.addFallbackLabels.addEventListener('click', callAddFallbackLabels);
    this._els.textFontFamily.addEventListener('change', setFontFamily);
    this._els.fontFamilyWrapper.addEventListener('click', clickFontFamily);
    this._els.fontFamilyList.addEventListener('click', selectFontFamily);
    this._els.textRange.on('change', this._changeTextRnageHandler.bind(this));
    this._els.skewX.on('change', this._changeSkewXRangeHandler.bind(this));
    this._els.skewY.on('change', this._changeSkewYRangeHandler.bind(this));
    this._els.textColorpicker.on('change', this._changeColorHandler.bind(this));

    this.colorPickerInputBox.addEventListener(
      eventNames.FOCUS,
      this._onStartEditingInputBox.bind(this)
    );
    this.colorPickerInputBox.addEventListener(
      eventNames.BLUR,
      this._onStopEditingInputBox.bind(this)
    );
    document.addEventListener('click', hideSelect);
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    const {
      setTextEffect,
      setTextAlign,
      setFontFamily,
      callAddNewText,
      callAddFallbackLabels,
      selectFontFamily,
      hideSelect,
    } = this.eventHandler;

    this._els.textEffectButton.removeEventListener('click', setTextEffect);
    this._els.textAlignButton.removeEventListener('click', setTextAlign);
    this._els.textAddNewTextButton.removeEventListener('click', callAddNewText);
    this._els.addFallbackLabels.removeEventListener('click', callAddFallbackLabels);
    this._els.textFontFamily.removeEventListener('change', setFontFamily);
    this._els.fontFamilyList.removeEventListener('click', selectFontFamily);
    this._els.textRange.off();
    this._els.textColorpicker.off();

    this.colorPickerInputBox.removeEventListener(
      eventNames.FOCUS,
      this._onStartEditingInputBox.bind(this)
    );
    this.colorPickerInputBox.removeEventListener(
      eventNames.BLUR,
      this._onStopEditingInputBox.bind(this)
    );
    document.removeEventListener('click', hideSelect);
  }

  /**
   * Returns the menu to its default state.
   */
  changeStandbyMode() {
    this.actions.stopDrawingMode();
  }

  /**
   * Executed when the menu starts.
   */
  changeStartMode() {
    this.actions.modeChange('text');
  }

  /**
   * Get text color
   * @returns {string} - text color
   */
  get textColor() {
    return this._els.textColorpicker.color;
  }

  set textColor(color) {
    this._els.textColorpicker.color = color;
  }

  /**
   * Get text size
   * @returns {string} - text size
   */
  get fontSize() {
    return this._els.textRange.value;
  }

  /**
   * Set Skew size
   * @param {Number} value - text size
   */
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
   * Set text size
   * @param {Number} value - text size
   */
  set fontSize(value) {
    this._els.textRange.value = value;
  }

  /**
   * Get font family
   * @returns {string} - font family
   */
  get fontFamily() {
    return this._els.textFontFamily.value;
  }

  /**
   * Set font family
   * @param {string} value - font family
   */
  set fontFamily(value) {
    this._els.textFontFamily.value = value;
  }

  /**
   * get font style
   * @returns {string} - font style
   */
  get fontStyle() {
    return this.effect.italic ? 'italic' : 'normal';
  }

  /**
   * get font weight
   * @returns {string} - font weight
   */
  get fontWeight() {
    return this.effect.bold ? 'bold' : 'normal';
  }

  /**
   * get text underline text underline
   * @returns {boolean} - true or false
   */
  get underline() {
    return this.effect.underline;
  }

  setTextStyleStateOnAction(textStyle = {}) {
    const {
      fill,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      textDecoration,
      textAlign,
      skewX,
      skewY,
    } = textStyle;
    this.textColor = fill;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this._els.fontName.style.fontFamily = fontFamily;
    this._els.fontName.innerHTML = fontFamily;
    this.skewX = skewX;
    this.skewY = skewY;
    this.setEffectState('italic', fontStyle);
    this.setEffectState('bold', fontWeight);
    this.setEffectState('underline', textDecoration);
    this.setAlignState(`tie-text-align-${textAlign}`);
  }

  setEffectState(effectName, value) {
    const effectValue = value === 'italic' || value === 'bold' || value === 'underline';
    const button = this._els.textEffectButton.querySelector(
      `.tui-image-editor-button.${effectName}`
    );

    this.effect[effectName] = effectValue;

    button.classList[effectValue ? 'add' : 'remove']('active');
  }

  setAlignState(value) {
    const button = this._els.textAlignButton;
    button.classList.remove(this.align);
    button.classList.add(value);
    this.align = value;
  }

  /**
   * text effect set handler
   * @param {object} event - add button event object
   * @private
   */
  _setTextEffectHandler(event) {
    const button = event.target.closest('.tui-image-editor-button');
    if (button) {
      const [styleType] = button.className.match(/(bold|italic|underline)/);
      const styleObj = {
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        underline: { textDecoration: 'underline' },
      }[styleType];

      this.effect[styleType] = !this.effect[styleType];
      button.classList.toggle('active');
      this.actions.changeTextStyle(styleObj);
    }
  }

  /**
   * text effect set handler
   * @param {object} event - add button event object
   * @private
   */
  _setTextAlignHandler(event) {
    const button = event.target.closest('.tui-image-editor-button');
    if (button) {
      const styleType = this.getButtonType(button, ['left', 'center', 'right']);
      const styleTypeAlias = `tie-text-align-${styleType}`;

      event.currentTarget.classList.remove(this.align);
      if (this.align !== styleTypeAlias) {
        event.currentTarget.classList.add(styleTypeAlias);
      }
      this.actions.changeTextStyle({ textAlign: styleType });

      this.align = styleTypeAlias;
    }
  }

  /**
   * text align set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeTextRnageHandler(value, isLast) {
    this.actions.changeTextStyle(
      {
        fontSize: value,
      },
      !isLast
    );
  }
  /**
   * skew x set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeSkewXRangeHandler(value, isLast) {
    this.actions.changeTextStyle(
      {
        skewX: value,
      },
      !isLast
    );
  }
  /**
   * skew y align set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeSkewYRangeHandler(value, isLast) {
    this.actions.changeTextStyle(
      {
        skewY: value,
      },
      !isLast
    );
  }

  /**
   * change color handler
   * @param {string} color - change color string
   * @private
   */
  _changeColorHandler(color) {
    color = color || 'transparent';
    this.actions.changeTextStyle({
      fill: color,
    });
  }

  _changeFontFamilyHandler(event) {
    const { target } = event;
    const font = target.value;
    this._els.textFontFamily.style.fontFamily = font;
    this.actions.changeTextStyle({
      fontFamily: font,
    });
  }
  _selectFontFamily(event) {
    event.stopPropagation();
    const { target } = event;
    const fontFamily = target.dataset.value;

    if (fontFamily) {
      this._els.fontName.innerHTML = fontFamily;
      this._els.fontName.style.fontFamily = fontFamily;
      this.actions.changeTextStyle({
        fontFamily,
      });
    }
    this._hideFontFamily();
  }

  _clickFontFamily(event) {
    event.stopPropagation();
    const fontName = this._els.fontName.innerHTML;
    const seletedFont = this.selector(`li[data-value="${fontName}"]`);

    this._els.fontFamilyList.classList.add('active');
    if (seletedFont) {
      seletedFont.scrollIntoView();
    }
  }

  _hideFontFamily() {
    console.log('first');
    this._els.fontFamilyList.classList.remove('active');
  }

  _addNewTextHandler() {
    this.actions.clickAddNewText();
  }
  _addFallbackLabels() {
    this.actions.clickAddFallback();
  }
}

export default Text;
