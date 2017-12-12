
import { USER_SETTINGS } from '../constants';
import { keyToId, keyToText, createFunctionalCheckbox } from '../common/gui-commons';

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

        let input = null;
        let label = null;

        switch (typeof value) {
          case 'boolean':
            [input, label] = createFunctionalCheckbox(id, labelText);

            input.checked = value;

            input.addEventListener('change', event => {
              USER_SETTINGS.POST_PROCESSING = event.target.checked;
            });

            break;
        }

        // Create a list item to bundle the elements together.
        const li = document.createElement('li');
        li.appendChild(input);
        li.appendChild(label);

        this.items.push(li);

        // Once we are done append it to an unordered list.
        ul.appendChild(li);
      });

      resolve(ul);
    });
  }
}