import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { Avatar } from '../Avatar';
import './styles.scss';

class UserSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectUser: '',
      suggestions: []
    }
  }
  onSelectUserChange(event, {newValue}) {
    this.setState({selectUser: newValue});
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
    this.setState({selectUser: ''});
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
  handleDeselectUser(event, user) {
    event.preventDefault();

    const { handleDeselectUser } = this.props;

    handleDeselectUser(user);
  }
  render() {
    const {
      label,
      placeholder,
      showUsersList,
      handleSearchUser,
      selectedUsers,
      searchedUsers,
      isListDisabled,
      isInputDisabled
    } = this.props;
    const {
      selectUser,
      suggestions
    } = this.state;
    const inputProps = {
      placeholder: placeholder,
      value: selectUser,
      onChange: ::this.onSelectUserChange,
      disabled: isInputDisabled
    };

    return (
      <div className="user-select-wrapper">
        {
          label.length > 0 &&
          <div className="users-list-label">
            {label}
          </div>
        }
        {
          showUsersList &&
          <div className="users-list" disabled={isListDisabled}>
            {
              selectedUsers.map((user, i) =>
                <div
                  key={i}
                  className="user-wrapper"
                  onClick={(e) => {::this.handleDeselectUser(e, user)}}
                >
                  <div className="user" title={user.name}>
                    <Avatar
                      image={user.profilePicture}
                      size="20px"
                      title={user.name}
                      accountType={user.accountType}
                      badgeCloser
                    />
                    <div className="user-name">
                      {user.name}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        }
        <div className="user-select">
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
      </div>
    )
  }
}

UserSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  showUsersList: PropTypes.bool,
  handleSearchUser: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array,
  searchedUsers: PropTypes.array,
  onSuggestionSelected: PropTypes.func.isRequired,
  handleDeselectUser: PropTypes.func,
  isListDisabled: PropTypes.bool,
  isInputDisabled: PropTypes.bool
}

UserSelect.defaultProps = {
  label: '',
  placeholder: 'Select a user',
  showUsersList: true,
  selectedUsers: [],
  searchUsers: [],
  handleDeselectUser: () => {},
  isListDisabled: false,
  isInputDisabled: false
}

export default UserSelect
