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
      accountType
    } = this.props;

    return (
      <ul className="user-tooltip-wrapper mui-dropdown__menu">
        <div className="user-tooltip">
          <Avatar
            image={image}
            size="60px"
            name={name}
            accountType={accountType}
            badgeBigger
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
  accountType: PropTypes.string,
}

UserTooltip.defaultProps = {
  image: '',
  name: '',
  username: '',
  accountType: ''
}

export default UserTooltip;
