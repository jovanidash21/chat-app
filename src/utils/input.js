/**
 * Get caret position of an input
 *
 * @param {object} element
 */
export function getCaretPosition( element ) {
  let caretPosition = 0;
  const document = element.ownerDocument || element.document;
  const windown = document.defaultView || document.parentWindow;
  let selection;

  if ( typeof window.getSelection != 'undefined' ) {
    selection = window.getSelection();

    if ( selection.rangeCount > 0 ) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents( element );
      preCaretRange.setEnd( range.endContainer, range.endOffset );
      caretPosition = preCaretRange.toString().length;
    }
  } else if ( ( selection = document.selection ) && selection.type != 'Control' ) {
    const textRange = selection.createRange();
    const preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint( 'EndToEnd', textRange );
    caretPosition = preCaretTextRange.text.length;
  }

  return caretPosition;
}

/**
 * Get autocomplete text query
 *
 * @param {object} element
 */
export function getAutoCompleteTextQuery( element ) {
  let parentElement = null;
  const inputHTML = element.innerHTML;

  if ( window.getSelection ) {
    parentElement = window.getSelection().anchorNode.parentNode;
  } else if ( document.selection && document.selection.createRange ) {
    parentElement = document.selection.createRange().parentElement();
  }

  if ( parentElement && ! parentElement.classList.contains( 'user-username-tag' ) ) {
    let selectedWord = '';
    const caretPosition = getCaretPosition(element);
    const start = /@/ig;
    const word = /@(\w+)/ig;
    const leftCaretText = inputHTML.substring(0, caretPosition);
    const rightCaretText = inputHTML.substring(caretPosition);
    const leftCaretWords = leftCaretText.split(' ');
    const leftCaretWordsLength = leftCaretWords.length;
    const leftCaretLastWord = leftCaretWords[ leftCaretWordsLength - 1 ];
    const rightCaretWords = rightCaretText.split(' ');
    const rightCaretFirstWord = rightCaretWords[0];

    selectedWord = leftCaretLastWord + rightCaretFirstWord;

    const go = selectedWord.match( start );
    const name = selectedWord.match( word );

    if ( go !== null && go.length > 0 && name !== null && name.length > 0 ) {
      const textQuery = name[0].substr(1);

      return textQuery;
    }
  }

  return '';
}

/**
 * Insert autocomplete text
 *
 * @param {object} element
 * @param {string} text
 */
export function insertAutocompleteText( element, text ) {
  const inputHTML = element.innerHTML;
  let selectedWord = '';
  let newInputHTML = '';
  const caretPosition = getCaretPosition(element);
  const start = /@/ig;
  const word = /@(\w+)/ig;
  const leftCaretText = inputHTML.substring(0, caretPosition);
  const rightCaretText = inputHTML.substring(caretPosition);
  const leftCaretWords = leftCaretText.split(' ');
  const leftCaretWordsLength = leftCaretWords.length;
  const leftCaretLastWord = leftCaretWords[ leftCaretWordsLength - 1 ];
  const rightCaretWords = rightCaretText.split(' ');
  const rightCaretFirstWord = rightCaretWords[0];

  selectedWord = leftCaretLastWord + rightCaretFirstWord;

  const leftCaretLastWordLength = leftCaretLastWord.length - 1;
  const rightCaretFirstWordLength = rightCaretFirstWord.length;
  const firstPartWordsPosition = caretPosition - leftCaretLastWordLength - 1;
  const lastPartWordsPosition = caretPosition + rightCaretFirstWordLength;
  const firstPartWords = inputHTML.substring(0, firstPartWordsPosition);
  const lastPartWords = inputHTML.substring(lastPartWordsPosition);

  const go = selectedWord.match( start );
  const name = selectedWord.match( word );

  if ( go !== null && go.length > 0 && name !== null && name.length > 0 ) {
    newInputHTML = `${firstPartWords}&nbsp;${text}&nbsp;${lastPartWords}`;
  }

  element.focus();
  element.innerHTML = newInputHTML;
}

/**
 * Remove autocomplete text
 *
 */
export function removeAutocompleteText() {
  let parentElement = null;

  if ( window.getSelection ) {
    parentElement = window.getSelection().anchorNode.parentNode;
  } else if ( document.selection && document.selection.createRange ) {
    parentElement = document.selection.createRange().parentElement();
  }

  if ( parentElement && parentElement.classList.contains( 'user-username-tag' ) ) {
    parentElement.outerHTML = parentElement.innerHTML;
  }
}
