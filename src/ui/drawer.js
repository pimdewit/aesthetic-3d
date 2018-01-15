import { hideElement, showElement } from '../common/common';

const DRAWER_CONSTANTS = {
  DRAWER_TOGGLE_ACTIVE: 'drawer-toggle--open',
  ACTIVE_ATTRIBUTE: 'opened',
  TITLE_WHILST_ENABLED: 'Close drawer',
  TITLE_WHILST_DISABLED: 'Open drawer'
};

/**
 * @author Pim de Wit <https://pdw.io>
 * @class
 */
export class Drawer {
  constructor(element) {
    this._element = element;
    this._isOpen = false;

    this._togglers = [];

    this.addToggle(this._element);
  }

  set open(open) {
    this._isOpen = open;

    if (open) {
      showElement(this._element);
    } else {
      hideElement(this._element);
    }
  }

  get open() {
    return this._isOpen;
  }

  get toggleElement() {
    return this._togglers;
  }

  /**
   * Toggles the drawer open/closed.
   */
  toggle() {
    this.open = !this.open;
  }

  /**
   * 
   * @param {HTMLElement} element 
   */
  addToggle(element) {
    element.addEventListener('click', event => {
      if (event.target.classList.contains('drawer-container')) return;

      this.toggle();
      
      this._setTogglerState();
    }, false);


    this._togglers.push(element);
  }

  /**
   * Set the visual state of the toggle buttons.
   * @private
   */
  _setTogglerState() {
    this._togglers.forEach(toggler => {
      if (this.open) {
        toggler.title = DRAWER_CONSTANTS.TITLE_WHILST_ENABLED;
        toggler.setAttribute(DRAWER_CONSTANTS.ACTIVE_ATTRIBUTE, true);
      } else {
        toggler.title = DRAWER_CONSTANTS.TITLE_WHILST_DISABLED;
        toggler.removeAttribute(DRAWER_CONSTANTS.ACTIVE_ATTRIBUTE);
      }
    });
  }
}