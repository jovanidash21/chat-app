import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Avatar from '../../Avatar';
import './styles.scss';

class ChatMemberSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectMember: '',
      suggestions: []
    }
  }
  onSelectMemberChange(event, {newValue}) {
    this.setState({selectMember: newValue});
  };
  handleGetSuggestions(value) {
    const { searchedUsers } = this.props;

    return searchedUsers;
  };
  handleGetSuggestionValue(suggestion) {
    return suggestion.name;
  }
  handleRenderSuggestion(suggestion, {query}) {
    const suggestionText = suggestion.name;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className="suggestion-content">
        <Avatar
          image={suggestion.profilePicture}
          size="27px"
          title={suggestionText}
          accountType={suggestion.accountType}
          badgeCloser
        />
        {
          parts.map((part, i) => {
            return (
              <span
                key={i}
                className={"user-name " + (part.highlight ? 'highlight' : '')}
              >
                {part.text.replace(/ /g, "\u00a0")}
              </span>
            );
          })
        }
      </span>
    );
  }
  onSuggestionSelected(event, suggestion) {
    const { onSuggestionSelected } = this.props;

    onSuggestionSelected(event, suggestion);
    this.setState({selectMember: ''});
  }
  onSuggestionsFetchRequested({value}) {
    const { handleSearchUser } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if ( inputLength > 0 ) {
      handleSearchUser(inputValue).then(() => {
        this.setState({suggestions: ::this.handleGetSuggestions(value)});
      });
    }
  };
  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  };
  render() {
    const { isDisabled } = this.props;
    const {
      selectMember,
      suggestions
    } = this.state;
    const inputProps = {
      placeholder: 'Select a member',
      value: selectMember,
      onChange: ::this.onSelectMemberChange,
      disabled: isDisabled
    };

    return (
      <div className="chat-member-select">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={::this.onSuggestionsClearRequested}
          getSuggestionValue={::this.handleGetSuggestionValue}
          renderSuggestion={::this.handleRenderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={::this.onSuggestionSelected}
          highlightFirstSuggestion={true}
        />
      </div>
    );
  }
}

ChatMemberSelect.propTypes = {
  searchedUsers: PropTypes.array.isRequired,
  handleSearchUser: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

ChatMemberSelect.defaultProps = {
  isDisabled: false
}

export default ChatMemberSelect;
