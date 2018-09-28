import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'muicss/react';
import './styles.scss';

class ChatRoomMemberFilter extends Component {
  constructor(props) {
    super(props);
  }
  handleClearSearchFilter(event) {
    event.preventDefault();

    const { handleClearSearchFilter } = this.props;

    handleClearSearchFilter();

    this.inputFilter.controlEl.focus();
  }
  render() {
    const {
      value,
      onMemberNameChange,
      onMemberNameKeyDown
    } = this.props;

    return (
      <div className="chat-room-member-filter">
        <div className="search-icon">
          <FontAwesomeIcon icon="search" />
        </div>
        <Input
          value={value}
          type="text"
          autoComplete="off"
          floatingLabel={false}
          placeholder="Search"
          onChange={onMemberNameChange}
          onKeyDown={onMemberNameKeyDown}
          ref={(element) => { this.inputFilter = element; }}
        />
        {
          value.length > 0 &&
          <div className="clear-icon" onClick={::this.handleClearSearchFilter}>
            <FontAwesomeIcon icon="times" />
          </div>
        }
      </div>
    );
  }
}

ChatRoomMemberFilter.propTypes = {
  value: PropTypes.string,
  onMemberNameChange: PropTypes.func.isRequired,
  onMemberNameKeyDown: PropTypes.func.isRequired,
  handleClearSearchFilter: PropTypes.func.isRequired
}

ChatRoomMemberFilter.defaultProps = {
  value: ''
}

export default ChatRoomMemberFilter;
