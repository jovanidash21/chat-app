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

/**
 * Get autocomplete text query
 *
 * @param {object} element
 * @param {string} text
 */
export function getAutoCompleteTextQuery( element, text ) {
  let selectedWord = '';
  const caretPosition = getCaretPosition(element);
  const start = /@/ig;
  const word = /@(\w+)/ig;
  const leftCaretText = text.substring(0, caretPosition);
  const rightCaretText = text.substring(caretPosition);
  const leftCaretWords = leftCaretText.split(' ');
  const leftCaretWordsLength = leftCaretWords.length;
  const leftCaretLastWord = leftCaretWords[ leftCaretWordsLength - 1 ];
  const rightCaretWords = rightCaretText.split(' ');
  const rightCaretFirstWord = rightCaretWords[0];

  selectedWord = leftCaretLastWord + rightCaretFirstWord;

  const leftCaretLastWordLength = leftCaretLastWord.length - 1;
  const rightCaretFirstWordLength = rightCaretFirstWord.length;

  const go = selectedWord.match( start );
  const name = selectedWord.match( word );

  if ( go !== null && go.length > 0 && name !== null && name.length > 0 ) {
    const textQuery = name[0].substr(1);

    return textQuery;
  }

  return '';
}
