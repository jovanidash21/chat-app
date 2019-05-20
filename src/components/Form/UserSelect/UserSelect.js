import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../../Avatar';
import './styles.scss';

class UserSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSelect: '',
      suggestions: []
    }
  }
  onSearchSelect(event, {newValue}) {
    this.setState({searchSelect: newValue});
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
          name={suggestionText}
          roleChatType={suggestion.role}
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
    this.setState({searchSelect: ''});
  }
  onSuggestionsFetchRequested({value}) {
    const { handleSearchUser } = this.props;
    const inputValue = value.trim().toLowerCase();

    if ( inputValue.length > 0 ) {
      handleSearchUser(inputValue).then(() => {
        this.setState({suggestions: ::this.handleGetSuggestions(value)});
      });
    }
  };
  handleClearSearchSelect(event) {
    event.preventDefault();

    this.setState({searchSelect: ''});

    this.inputSelect.input.focus();
  }
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
      listDisabled,
      inputDisabled,
      loading,
    } = this.props;
    const {
      searchSelect,
      suggestions,
    } = this.state;
    const inputProps = {
      placeholder: placeholder,
      value: searchSelect,
      onChange: ::this.onSearchSelect,
      disabled: inputDisabled,
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
          <div className="users-list" disabled={listDisabled}>
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
                      name={user.name}
                      roleChatType={user.role}
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
          <div className="search-icon">
            <FontAwesomeIcon icon="search" />
          </div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={::this.onSuggestionsClearRequested}
            getSuggestionValue={::this.handleGetSuggestionValue}
            renderSuggestion={::this.handleRenderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={::this.onSuggestionSelected}
            highlightFirstSuggestion
            ref={(element) => { this.inputSelect = element; }}
          />
          {
            loading &&
            <div className="loading-icon">
              <FontAwesomeIcon icon="spinner" pulse />
            </div>
          }
          {
            !loading &&
            searchSelect.length > 0 &&
            <div className="clear-icon" onClick={::this.handleClearSearchSelect}>
              <FontAwesomeIcon icon="times" />
            </div>
          }
          {
            !loading &&
            searchSelect.length > 0 &&
            suggestions.length === 0 &&
            <div className="no-results">
              No results found
            </div>
          }
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
  listDisabled: PropTypes.bool,
  inputDisabled: PropTypes.bool,
  loading: PropTypes.bool,
}

UserSelect.defaultProps = {
  label: '',
  placeholder: 'Select a user',
  showUsersList: true,
  selectedUsers: [],
  searchUsers: [],
  handleDeselectUser: () => {},
  listDisabled: false,
  inputDisabled: false,
  loading: false,
}

export default UserSelect
