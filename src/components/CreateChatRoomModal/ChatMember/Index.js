import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import './styles.scss';

class ChatMember extends Component {
  constructor(props) {
    super(props);
  }
  handleDeselectMember(event) {
    event.preventDefault();

    const {
      index,
      memberData,
      handleDeselectMember
    } = this.props;

    index !== 0 && handleDeselectMember(memberData);
  }
  render() {
    const { memberData } = this.props;

    return (
      <div className="member-wrapper" onClick={::this.handleDeselectMember}>
        <div className="member" title={memberData.name}>
          <Avatar
            image={memberData.profilePicture}
            size="20px"
            title={memberData.name}
            accountType={memberData.accountType}
            badgeCloser
          />
          <div className="member-name">
            {memberData.name}
          </div>
        </div>
      </div>
    );
  }
}

ChatMember.propTypes = {
  index: PropTypes.number.isRequired,
  memberData: PropTypes.object.isRequired,
  handleDeselectMember: PropTypes.func.isRequired
}

export default ChatMember;
