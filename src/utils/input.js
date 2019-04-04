/**
 * Get caret position of an input
 *
 * @param {object} element
 */
export function getCaretPosition( element ) {
  let caretPosition = 0;

  if ( window.getSelection ) {
    const selection = window.getSelection();

    if ( selection.getRangeAt && selection.rangeCount ) {
      const range = selection.getRangeAt(0);

      if ( range.commonAncestorContainer.parentNode === element ) {
        caretPosition = range.endOffset;
      }
    }
  } else if ( document.selection && document.selection.createRange ) {
    const range = document.selection.createRange();

    if ( range.parentElement() == element ) {
      const tempElement = document.createElement('span');

      element.insertBefore( tempElement, element.firstChild );

      const tempRange = range.duplicate();

      tempRange.moveToElementText( tempElement );
      tempRange.setEndPoint( 'EndToEnd', range );
      caretPosition = tempRange.text.length;
    }
  }

  return caretPosition;
}
