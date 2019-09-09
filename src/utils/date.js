/**
 * Check if date is today
 *
 * @param {string} date
 */
export function isDateToday(date) {
  const d = new Date(date);
  const todayDate = new Date();

  if (d.setHours( 0, 0, 0, 0 ) === todayDate.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
}

/**
 * Check if date is today
 *
 * @param {string} date
 */
export function isDateYesterday(date) {
  const d = new Date( date );
  const todayDate = new Date();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  if (d.setHours(0, 0, 0, 0) === yesterdayDate.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
}

/**
 * Check if date is in this year
 *
 * @param {string} date
 */
export function isDateThisYear(date) {
  const d = new Date(date);
  const todayDate = new Date();

  if (d.getFullYear() === todayDate.getFullYear()) {
    return true;
  }

  return false;
}

/**
 * Check if dates are on the same day
 *
 * @param {string} date1
 * @param {string} date2
 */
export function isDatesSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  ) {
    return true;
  }

  return false;
}
