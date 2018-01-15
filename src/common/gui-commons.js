
import { USER_SETTINGS } from '../constants';

export function getListItem(key, value, id, labelText) {
  // Create a list item to bundle the elements together.
  const li = document.createElement('li');

  let input = null;
  let label = null;

  switch (typeof value) {
    case 'boolean':
      [input, label] = createFunctionalCheckbox(id, labelText);

      input.checked = value;

      input.addEventListener('change', event => {
        USER_SETTINGS[key] = event.target.checked;
      });
      break;
    case 'number':
      [input, label] = createFunctionalRange(id, labelText);

      input.value = value;

      input.addEventListener('change', event => {
        USER_SETTINGS[key] = event.target.value;
      });

      window.dispatchEvent(new Event('resize'));
      break;
  }

  li.appendChild(input);
  li.appendChild(label);

  return li;
}

/**
 * Create a checkbox + label.
 * @param {String} id
 * @param {String} description
 */
export function createFunctionalCheckbox(id, description) {
  const input = createCheckbox(id);
  const label = createLabel(id, description);


  return [input, label];
}

export function createFunctionalRange(id, description) {
  const input = createRange(id);
  const label = createLabel(id, description);

  return [input, label];
}

function createRange(id) {
  const element = document.createElement('input');
  element.id = id;
  element.type = 'range';
  element.min = 0;
  element.max = USER_SETTINGS.SCREEN_DENSITY + 1;
  element.step = 1;

  return element;
}

/** @param {String} id */
function createCheckbox(id) {
  const element = document.createElement('input');
  element.id = id;
  element.type = 'checkbox';

  return element;
}

/**
 * @param {String} id
 * @param {String} text
 */
function createLabel(id, textString) {
  const element = document.createElement('label');
  element.setAttribute('for', id);
  const text = document.createTextNode(textString);
  element.appendChild(text);

  return element;
}


/**
 * Get a string and make it a hyphenated sentence.
 * @param {String} string
 */
export function keyToId(string) {
  return string.replace('_', '-');
}

/** @param {String} string */
export function keyToText(string) {
  return string.replace('_', ' ');
}