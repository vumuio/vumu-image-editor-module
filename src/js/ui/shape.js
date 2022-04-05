import snippet from 'tui-code-snippet';
import Colorpicker from '@/ui/tools/colorpicker';
import Range from '@/ui/tools/range';
import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/shape';
import { toInteger, assignmentForDestroy } from '@/util';
import {
  defaultShapeStrokeValues,
  defaultSkewRangeValues,
  eventNames,
  selectorNames,
} from '@/consts';

const SHAPE_DEFAULT_OPTION = {
  stroke: '#00a9ff',
  fill: '#ffbb3b',
  strokeWidth: 3,
  width: 200,
  height: 200,
  scaleX: 1,
  scaleY: 1,
  skewY: 0,
  skewX: 0,
};

/**
 * Shape ui class
 * @class
 * @ignore
 */
class Shape extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'shape',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });
    this.type = null;
    this.options = SHAPE_DEFAULT_OPTION;

    this._els = {
      shapeSelectButton: this.selector('.tie-shape-button'),
      shapeColorButton: this.selector('.tie-shape-color-button'),
      strokeRange: new Range(
        {
          slider: this.selector('.tie-stroke-range'),
          input: this.selector('.tie-stroke-range-value'),
        },
        defaultShapeStrokeValues
      ),
      skewX: new Range(
        {
          slider: this.selector('.tie-skewx-shape-range'),
          input: this.selector('.tie-skewx-shape-range-value'),
        },
        defaultSkewRangeValues
      ),
      skewY: new Range(
        {
          slider: this.selector('.tie-skewy-shape-range'),
          input: this.selector('.tie-skewy-shape-range-value'),
        },
        defaultSkewRangeValues
      ),
      fillColorpicker: new Colorpicker(this.selector('.tie-color-fill'), {
        defaultColor: '',
        toggleDirection: this.toggleDirection,
        usageStatistics: this.usageStatistics,
      }),
      strokeColorpicker: new Colorpicker(this.selector('.tie-color-stroke'), {
        defaultColor: '#ffbb3b',
        toggleDirection: this.toggleDirection,
        usageStatistics: this.usageStatistics,
      }),
    };

    this.colorPickerControls.push(this._els.fillColorpicker);
    this.colorPickerControls.push(this._els.strokeColorpicker);

    this.colorPickerInputBoxes = [];
    this.colorPickerInputBoxes.push(
      this._els.fillColorpicker.colorpickerElement.querySelector(
        selectorNames.COLOR_PICKER_INPUT_BOX
      )
    );
    this.colorPickerInputBoxes.push(
      this._els.strokeColorpicker.colorpickerElement.querySelector(
        selectorNames.COLOR_PICKER_INPUT_BOX
      )
    );
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();
    this._els.strokeRange.destroy();
    this._els.skewX.destroy();
    this._els.skewY.destroy();
    this._els.fillColorpicker.destroy();
    this._els.strokeColorpicker.destroy();

    assignmentForDestroy(this);
  }

  /**
   * Add event for shape
   * @param {Object} actions - actions for shape
   *   @param {Function} actions.changeShape - change shape mode
   *   @param {Function} actions.setDrawingShape - set drawing shape
   */
  addEvent(actions) {
    this.eventHandler.shapeTypeSelected = this._changeShapeHandler.bind(this);
    this.actions = actions;

    this._els.shapeSelectButton.addEventListener('click', this.eventHandler.shapeTypeSelected);
    this._els.strokeRange.on('change', this._changeStrokeRangeHandler.bind(this));
    this._els.skewX.on('change', this._changeSkewXRangeHandler.bind(this));
    this._els.skewY.on('change', this._changeSkewYRangeHandler.bind(this));
    this._els.fillColorpicker.on('change', this._changeFillColorHandler.bind(this));
    this._els.strokeColorpicker.on('change', this._changeStrokeColorHandler.bind(this));
    this._els.fillColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));
    this._els.strokeColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));

    snippet.forEachArray(
      this.colorPickerInputBoxes,
      (inputBox) => {
        inputBox.addEventListener(eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
        inputBox.addEventListener(eventNames.BLUR, this._onStopEditingInputBox.bind(this));
      },
      this
    );
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.shapeSelectButton.removeEventListener('click', this.eventHandler.shapeTypeSelected);
    this._els.strokeRange.off();
    this._els.skewX.off();
    this._els.skewY.off();
    this._els.fillColorpicker.off();
    this._els.strokeColorpicker.off();

    snippet.forEachArray(
      this.colorPickerInputBoxes,
      (inputBox) => {
        inputBox.removeEventListener(eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
        inputBox.removeEventListener(eventNames.BLUR, this._onStopEditingInputBox.bind(this));
      },
      this
    );
  }

  /**
   * Set Shape status
   * @param {Object} options - options of shape status
   *   @param {string} strokeWidth - stroke width
   *   @param {string} strokeColor - stroke color
   *   @param {string} fillColor - fill color
   */
  setShapeStatus({ strokeWidth, strokeColor, fillColor, skewX, skewY }) {
    this._els.strokeRange.value = strokeWidth;
    this._els.skewX.value = skewX;
    this._els.skewY.value = skewY;
    this._els.strokeColorpicker.color = strokeColor;
    this._els.fillColorpicker.color = fillColor;
    this.options.stroke = strokeColor;
    this.options.fill = fillColor;
    this.options.strokeWidth = strokeWidth;
    this.options.skewX = skewX;
    this.options.skewY = skewY;

    this.actions.setDrawingShape(this.type, { strokeWidth, skewX, skewY });
  }

  /**
   * Executed when the menu starts.
   */
  changeStartMode() {
    this.actions.stopDrawingMode();
  }

  /**
   * Returns the menu to its default state.
   */
  changeStandbyMode() {
    this.type = null;
    this.actions.changeSelectableAll(true);
    this._els.shapeSelectButton.classList.remove('circle');
    this._els.shapeSelectButton.classList.remove('triangle');
    this._els.shapeSelectButton.classList.remove('rect');
  }

  /**
   * set range stroke max value
   * @param {number} maxValue - expect max value for change
   */
  setMaxStrokeValue(maxValue) {
    let strokeMaxValue = maxValue;
    if (strokeMaxValue <= 0) {
      strokeMaxValue = defaultShapeStrokeValues.max;
    }
    this._els.strokeRange.max = strokeMaxValue;
  }

  /**
   * Set stroke value
   * @param {number} value - expect value for strokeRange change
   */
  setStrokeValue(value) {
    this._els.strokeRange.value = value;
    this._els.strokeRange.trigger('change');
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
   * Get stroke value
   * @returns {number} - stroke range value
   */
  getStrokeValue() {
    return this._els.strokeRange.value;
  }

  /**
   * Change icon color
   * @param {object} event - add button event object
   * @private
   */
  _changeShapeHandler(event) {
    const button = event.target.closest('.tui-image-editor-button');
    if (button) {
      const shapeType = this.getButtonType(button, ['circle', 'triangle', 'rect']);
      this.type = shapeType;
      this.actions.addNewShape(
        shapeType,
        shapeType === 'circle'
          ? { ...SHAPE_DEFAULT_OPTION, rx: 100, ry: 100 }
          : SHAPE_DEFAULT_OPTION
      );
      return;
      // this.actions.stopDrawingMode();
      // this.actions.discardSelection();
      // if (this.type === shapeType) {
      //   this.changeStandbyMode();
      //
      //   return;
      // }
      // this.changeStandbyMode();
      // this.type = shapeType;
      // event.currentTarget.classList.add(shapeType);
      // this.actions.changeSelectableAll(false);
      // this.actions.modeChange('shape');
    }
  }

  /**
   * Change stroke range
   * @param {number} value - stroke range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeStrokeRangeHandler(value, isLast) {
    // this.options.strokeWidth = toInteger(value);
    this.actions.changeShape(
      {
        strokeWidth: value,
      },
      !isLast
    );

    this.actions.setDrawingShape(this.type, this.options);
  }
  /**
   * skew x set handler
   * @param {number} value - range value
   * @param {boolean} isLast - Is last change
   * @private
   */
  _changeSkewXRangeHandler(value, isLast) {
    // this.options.skewX = value;
    this.actions.changeShape(
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
    // this.options.skewY = value;
    this.actions.changeShape(
      {
        skewY: value,
      },
      !isLast
    );
  }

  /**
   * Change shape color
   * @param {string} color - fill color
   * @private
   */
  _changeFillColorHandler(color) {
    color = color || 'transparent';
    this.options.fill = color;
    this.actions.changeShape({
      fill: color,
    });
  }

  /**
   * Change shape stroke color
   * @param {string} color - fill color
   * @private
   */
  _changeStrokeColorHandler(color) {
    color = color || 'transparent';
    this.options.stroke = color;
    this.actions.changeShape({
      stroke: color,
    });
  }
}

export default Shape;
