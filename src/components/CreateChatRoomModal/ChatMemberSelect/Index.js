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
    const {
      userData,
      users
    } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : users.filter(suggestion =>
      userData._id !== suggestion._id &&
      suggestion.name &&
      suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
    );
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
    this.setState({suggestions: ::this.handleGetSuggestions(value)});
  };
  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  };
  render() {
    const { users } = this.props;
    const {
      selectMember,
      suggestions
    } = this.state;
    const inputProps = {
      placeholder: 'Select a member',
      value: selectMember,
      onChange: ::this.onSelectMemberChange
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
  userData: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired
}

export default ChatMemberSelect;
