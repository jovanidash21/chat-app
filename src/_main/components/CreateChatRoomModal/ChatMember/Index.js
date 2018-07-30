import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../../components/Avatar';
import './styles.scss';

class ChatMember extends Component {
  constructor(props) {
    super(props);
  }
  handleDeselectMember(event) {
    event.preventDefault();

    const {
      index,
      member,
      handleDeselectMember
    } = this.props;

    index !== 0 && handleDeselectMember(member);
  }
  render() {
    const { member } = this.props;

    return (
      <div className="member-wrapper" onClick={::this.handleDeselectMember}>
        <div className="member" title={member.name}>
          <Avatar
            image={member.profilePicture}
            size="20px"
            title={member.name}
            accountType={member.accountType}
            badgeCloser
          />
          <div className="member-name">
            {member.name}
          </div>
        </div>
      </div>
    );
  }
}

ChatMember.propTypes = {
  index: PropTypes.number.isRequired,
  member: PropTypes.object.isRequired,
  handleDeselectMember: PropTypes.func.isRequired
}

export default ChatMember;
