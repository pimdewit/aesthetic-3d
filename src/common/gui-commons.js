
import { USER_SETTINGS } from '../constants';

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

/** @param {String} id */
function createCheckbox(id) {
  const element = document.createElement('input');
  element.id = id;
  element.type = 'checkbox';

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