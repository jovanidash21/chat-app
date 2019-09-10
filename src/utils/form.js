/**
 * Check if email is valid
 *
 * @param {string} email
 */
export function isEmailValid(email) {
  if (email.length > 0) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      return true;
    }
  }

  return false;
}
