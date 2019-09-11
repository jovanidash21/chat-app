/**
 * Check if object is empty
 *
 * @param {Object} object
 */
export function isObjectEmpty(object) {
  if (
    object !== null &&
    object !== 'undefined' &&
    Object.keys(object).length === 0 &&
    object.constructor === Object
  ) {
    return true;
  }

  return false;
}
