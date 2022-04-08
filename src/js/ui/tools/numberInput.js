import snippet from 'tui-code-snippet';
import { toInteger, clamp } from '@/util';
import { keyCodes } from '@/consts';

const INPUT_FILTER_REGEXP = /(-?)([0-9]*)[^0-9]*([0-9]*)/g;

/**
 * Range control class
 * @class
 * @ignore
 */
class NumberInput {
  /**
   * @constructor
   * @extends {View}
   * @param {Object} rangeElements - Html resources for creating sliders
   *  @param {HTMLElement} rangeElements.slider - b
   *  @param {HTMLElement} [rangeElements.input] - c
   * @param {Object} options - Slider make options
   *  @param {number} options.min - min value
   *  @param {number} options.max - max value
   *  @param {number} options.value - default value
   *  @param {number} [options.useDecimal] - Decimal point processing.
   *  @param {boolean} [options.realTimeEvent] - Reflect live events.
   */
  constructor(inputElements, options = {}) {
    this._value = options.value || 0;
    this.numberInputElement = inputElements.input;
    this.increase = inputElements.increase;
    this.decrease = inputElements.decrease;

    console.log(this.numberInputElement, this.increase, this.decrease);
    this._drawNumberInputElement();
    this.realTimeEvent = options.realTimeEvent || false;

    this.eventHandler = {
      changeInput: this._changeValueWithInput.bind(this, false),
      changeInputFinally: this._changeValueWithInput.bind(this, true),
      changeInputWithArrow: this._changeValueWithInputKeyEvent.bind(this),
      changeIncrease: this._changeIncreaseValue.bind(this),
      changeDecrease: this._changeDecreaseValue.bind(this),
    };

    this._addClickEvent();
    this._addInputEvent();
    this.value = options.value;
    this.trigger('change');
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeClickEvent();
    this._removeInputEvent();
    // this.rangeElement.innerHTML = '';
    // snippet.forEach(this, (value, key) => {
    //   this[key] = null;
    // });
  }

  /**
   * Get range value
   * @returns {Number} range value
   */
  get value() {
    return this._value;
  }

  /**
   * Set range value
   * @param {Number} value range value
   */
  set value(value) {
    value = toInteger(value);
    this._value = value;
    if (this.numberInputElement) {
      this.numberInputElement.value = value;
    }
  }

  /**
   * event trigger
   * @param {string} type - type
   */
  trigger(type) {
    this.fire(type, this._value);
  }

  // /**
  //  * Calculate slider width
  //  * @returns {number} - slider width
  //  */
  // _getRangeWidth() {
  //   const getElementWidth = (element) => toInteger(window.getComputedStyle(element, null).width);
  //
  //   return getElementWidth(this.rangeElement) - getElementWidth(this.pointer);
  // }

  /**
   * Make range element
   * @private
   */
  _drawNumberInputElement() {
    // this.increase.classList.add('tui-image-editor-range');
    // this.numberInputElement.classList.add('number-input-element');
    // this.decrease.classList.add('tui-image-editor-range');
    // this.componentWrapper = document.createElement('div');
    // this.componentWrapper.className = 'number-input-wrapper';
    // this.componentWrapper.appendChild(this.increase);
    // this.componentWrapper.appendChild(this.decrease);
    // this.componentWrapper.appendChild(this.numberInputElement);
  }

  /**
   * Add range input editing event
   * @private
   */
  _addInputEvent() {
    if (this.numberInputElement) {
      // this.numberInputElement.addEventListener('keydown', this.eventHandler.changeInputWithArrow);
      this.numberInputElement.addEventListener('keyup', this.eventHandler.changeInput);
      // this.numberInputElement.addEventListener('blur', this.eventHandler.changeInputFinally);
    }
  }

  /**
   * Remove range input editing event
   * @private
   */
  _removeInputEvent() {
    if (this.numberInputElement) {
      // this.numberInputElement.removeEventListener('keydown', this.eventHandler.changeInputWithArrow);
      this.numberInputElement.removeEventListener('keyup', this.eventHandler.changeInput);
      // this.numberInputElement.removeEventListener('blur', this.eventHandler.changeInputFinally);
    }
  }

  /**
   * change angle event
   * @param {object} event - key event
   * @private
   */
  _changeValueWithInputKeyEvent(event) {
    const { keyCode, target } = event;

    // if ([keyCodes.ARROW_UP, keyCodes.ARROW_DOWN].indexOf(keyCode) < 0) {
    //   return;
    // }
    //
    // let value = Number(target.value);
    //
    // value = this._valueUpDownForKeyEvent(value, keyCode);
    //
    // const unChanged = value < this._min || value > this._max;
    //
    // if (!unChanged) {
    //   const clampValue = clamp(value, this._min, this.max);
    //   this.value = clampValue;
    //   this.fire('change', clampValue, false);
    // }
  }

  /**
   * change angle event
   * @param {object} event - key event
   * @private
   */
  _changeIncreaseValue(event) {
    this.value++;
    this.fire('change', this.value, true);
  }

  /**
   * change angle event
   * @param {object} event - key event
   * @private
   */
  _changeDecreaseValue(event) {
    if (this.numberInputElement.value <= 0) return;
    this.value--;
    this.fire('change', this.value, true);
  }

  /**
   * value up down for input
   * @param {number} value - original value number
   * @param {number} keyCode - input event key code
   * @returns {number} value - changed value
   * @private
   */
  _valueUpDownForKeyEvent(value, keyCode) {
    const step = this._useDecimal ? 0.1 : 1;

    if (keyCode === keyCodes.ARROW_UP) {
      value += step;
    } else if (keyCode === keyCodes.ARROW_DOWN) {
      value -= step;
    }

    return value;
  }

  /**
   * change angle event
   * @param {boolean} isLast - Is last change
   * @param {object} event - key event
   * @private
   */
  _changeValueWithInput(isLast, event) {
    const { keyCode, target } = event;

    if ([keyCodes.ARROW_UP, keyCodes.ARROW_DOWN].indexOf(keyCode) >= 0) {
      return;
    }

    const stringValue = this._filterForInputText(target.value);
    const waitForChange = !stringValue || isNaN(stringValue);
    target.value = stringValue;
    if (!waitForChange) {
      this.numberInputElement.value = target;
      this.value = toInteger(stringValue);
      this.fire('change', this.value, isLast);
    }
  }

  /**
   * Add Range click event
   * @private
   */

  _addClickEvent() {
    this.increase.addEventListener('click', this.eventHandler.changeIncrease);
    this.decrease.addEventListener('click', this.eventHandler.changeDecrease);
  }

  /**
   * Remove Range click event
   * @private
   */
  _removeClickEvent() {
    this.increase.removeEventListener('click', this.eventHandler.changeIncrease);
    this.decrease.removeEventListener('click', this.eventHandler.changeDecrease);
  }

  /**
   * Unnecessary string filtering.
   * @param {string} inputValue - origin string of input
   * @returns {string} filtered string
   * @private
   */
  _filterForInputText(inputValue) {
    return inputValue.replace(INPUT_FILTER_REGEXP, '$1$2$3');
  }
}

snippet.CustomEvents.mixin(NumberInput);

export default NumberInput;
