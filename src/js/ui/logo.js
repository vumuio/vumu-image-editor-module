import Submenu from '@/ui/submenuBase';
import templateHtml from '@/ui/template/submenu/logo';
import { assignmentForDestroy } from '@/util';

/**
 * Logo ui class
 * @class
 * @ignore
 */
class Logo extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'logo',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });

    this._els = {
      logoButton: this.selector('.tie-insert-logo'),
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
   */
  addEvent(actions) {
    const insertLogo = this._insertLogo.bind(this);

    this.eventHandler = {
      insertLogo,
    };

    this.actions = actions;
    this._els.logoButton.addEventListener('click', insertLogo);
  }

  _removeEvent() {
    this._els.logoButton.removeEventListener('click', this.eventHandler.insertLogo);
  }

  /**
   * Load image file
   * @param {object} event - File change event object
   * @private
   */
  _insertLogo() {
    this.actions.insertLogo('https://i.ibb.co/GC1tCwn/vumu-logo-placeholder.png', new Blob());
  }
}

export default Logo;
