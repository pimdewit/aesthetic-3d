
/** @param {HTMLElement} element */
export function hideElement(element) {
  element.setAttribute('aria-hidden', true);
}

/** @param {HTMLElement} element */
export function showElement(element) {
  element.removeAttribute('aria-hidden');
}
