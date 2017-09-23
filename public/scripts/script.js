// Remove the Facebook appended hash on redirect
// <https://github.com/jaredhanson/passport-facebook/issues/12>
if ( window.location.hash && ( window.location.hash == '#_=_' ) ) {
  if ( window.history.replaceState ) {
    var cleanHref = window.location.href.split('#')[0];
    window.history.replaceState(null, null, cleanHref);
  } else {
    window.location.hash = '';
  }
}