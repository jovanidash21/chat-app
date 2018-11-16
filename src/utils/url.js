/**
 * Get base URL
 */
export function getBaseURL() {
  const localtionArr = window.location.href.split("/");
  const baseURL = localtionArr[0] + "//" + localtionArr[2];

  return baseURL;
}
