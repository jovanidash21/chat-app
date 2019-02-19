/**
 * Check if email is valid
 * @param {string} emailAddress
 */
export function isValidEmail(emailAddress) {
  if ( emailAddress.length ) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( regex.test( emailAddress ) ) {
      return true;
    }
  }

  return false;
}
