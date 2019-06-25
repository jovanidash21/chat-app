import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../../../../../components/Avatar';
import './styles.scss';

class AutocompleteBox extends Component {
  constructor(props) {
    super(props);
  }
  handleSelectSuggestion(event, suggestion) {
    event.preventDefault();

    const { handleSelectSuggestion } = this.props;

    handleSelectSuggestion(suggestion);
  }
  render() {
    const {
      suggestions,
      loading,
    } = this.props;

    return (
      <div className="autocomplete-box-wrapper">
        <div className="autocomplete-box">
          {
            loading &&
            <div className="loading-container">
              <div className="loading-icon">
                <FontAwesomeIcon icon="spinner" pulse />
              </div>
              <span>Loading...</span>
            </div>
          }
          {
            suggestions.length > 0 &&
            suggestions.map((suggestion, i) =>
              <div
                className="suggestion-item"
                key={i}
                onClick={(e) => {::this.handleSelectSuggestion(e, suggestion)}}
              >
                <MediaQuery query="(max-width: 767px)">
                  {(matches) => {
                    return (
                      <Avatar
                        image={suggestion.profilePicture}
                        size={matches ? '25px' : '23px'}
                        name={suggestion.name}
                        username={suggestion.username}
                        roleChatType={suggestion.role}
                        accountType={suggestion.accountType}
                      />
                    )
                  }}
                </MediaQuery>
                <div className="suggestion-name">
                  {suggestion.name}
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

AutocompleteBox.propTypes = {
  suggestions: PropTypes.array,
  loading: PropTypes.bool,
  handleSelectSuggestion: PropTypes.func.isRequired,
}

AutocompleteBox.defaultProps = {
  suggestions: [],
  loading: false,
}

export default AutocompleteBox;
