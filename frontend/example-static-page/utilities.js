/**
 * Safety enhancement over the builtin querySelector.
 * Throws a descriptive error if no element matches.
 * 
 * @param {HTMLElement} element - Element to query
 * @param {HTMLElementTagNameMap} selector - CSS selector
 * @returns {Element}
 * @throws - If no element matches selector
 */
export function safeQuery(element, selector) {
  const result = element.querySelector(selector)
  if (result === null) {
    throw new Error(`No element found matching CSS selector: '${selector}'`)
  }
  return result
}

/**
 * Safety enhancement over the builtin querySelector.
 * Throws a descriptive error if no element matches.
 * 
 * @param {HTMLElement} element - Element to query
 * @param {keyof HTMLElementTagNameMap} selector - CSS Query Selector
 * @returns {Element}
 * @throws - If no element matches selector
 */
export function safeQueryAll(element, selector) {
  const result = element.querySelectorAll(selector)
  if (result === null) {
    throw new Error(`No element found matching CSS selector: '${selector}'`)
  }
  return result
}
