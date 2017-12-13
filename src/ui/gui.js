
import { USER_SETTINGS } from '../constants';
import { keyToId, keyToText, createFunctionalCheckbox, createFunctionalRange, getListItem } from '../common/gui-commons';

/**
 * @author Pim de Wit <https://pdw.io>
 * @class
 */
export class GUI {
  constructor() {
    this.items = [];
  }

  objectToList(list) {
    return new Promise((resolve, reject) => {
      const ul = document.createElement('ul');

      Object.keys(list).forEach(key => {
        const value = list[key];
        const id = keyToId(key);
        const labelText = keyToText(key);


        const li = getListItem(key, value, id, labelText);

        this.items.push(li);

        // Once we are done append it to an unordered list.
        ul.appendChild(li);
      });

      resolve(ul);
    });
  }
}