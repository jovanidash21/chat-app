/**
 * Format number
 *
 * @param {number} number
 */
export function formatNumber(number) {
  if (number >= 1000000000000) {
    return new Intl.NumberFormat().format(Math.round((number / 1000000000000) * 10 ) / 10) + 't';
  } else if (number >= 1000000000) {
    return new Intl.NumberFormat().format(Math.round((number / 1000000000) * 10) / 10) + 'b';
  } else if (number >= 1000000) {
    return new Intl.NumberFormat().format(Math.round((number / 1000000) * 10) / 10) + 'm';
  } else if (number >= 1000) {
    return new Intl.NumberFormat().format(Math.round((number / 1000) * 10) / 10) + 'k';
  }

  return new Intl.NumberFormat().format(Math.round(number));
}
