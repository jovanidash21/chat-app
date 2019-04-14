import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import './styles.scss';

class UserTooltip extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      image,
      name,
      username,
      roleChatType,
      accountType,
      small,
      right
    } = this.props;

    return (
      <ul className={"user-tooltip-wrapper mui-dropdown__menu " + (right ? 'mui-dropdown__menu--right' : '')}>
        <div className={"user-tooltip " + (small ? 'small' : '')}>
          <Avatar
            image={image}
            size={!small ? "70px" : "40px"}
            name={name}
            roleChatType={roleChatType}
            accountType={accountType}
            badgeBigger={!small ? true : false}
            badgeCloser
          />
          <div className="user-detail">
            <div className="user-full-name">
              {name}
            </div>
            <div className="user-username">
              {
                accountType === 'local'
                  ? '@' + username
                  : accountType
              }
            </div>
          </div>
        </div>
      </ul>
    )
  }
}

UserTooltip.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  roleChatType: PropTypes.string,
  accountType: PropTypes.string,
  small: PropTypes.bool,
  right: PropTypes.bool
}

UserTooltip.defaultProps = {
  image: '',
  name: '',
  username: '',
  roleChatType: '',
  accountType: '',
  small: false,
  right: false
}

export default UserTooltip;
