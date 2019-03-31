import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Avatar } from '../../../../../components/Avatar';
import './styles.scss';

class AutocompleteBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      suggestions,
       loading,
    } = this.props;

    return (
      <div className="autocomplete-box">
        {
          suggestions.length > 0 &&
          suggestions.map((suggestion, i) =>
            <div className="suggestion-item">
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
    )
  }
}

AutocompleteBox.propTypes = {
  suggestions: PropTypes.array,
  loading: PropTypes.bool,
}

AutocompleteBox.defaultProps = {
  suggestions: [],
  loading: false,
}

export default AutocompleteBox;
