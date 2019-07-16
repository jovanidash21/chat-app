import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import './styles.scss';

const UserTooltip = (props) => {
  return (
    <ul className={"user-tooltip-wrapper mui-dropdown__menu " + (props.right ? 'mui-dropdown__menu--right' : '')}>
      <div className={"user-tooltip " + (props.small ? 'small' : '')}>
        <Avatar
          image={props.image}
          size={!props.small ? "70px" : "40px"}
          name={props.name}
          roleChatType={props.roleChatType}
          accountType={props.accountType}
          badgeBigger={!props.small}
          badgeCloser
        />
        <div className="user-detail">
          <div className="user-full-name">
            {props.name}
          </div>
          <div className="user-username">
            {
              props.accountType === 'local'
                ? '@' + props.username
                : props.accountType
            }
          </div>
        </div>
      </div>
    </ul>
  );
}

UserTooltip.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  roleChatType: PropTypes.string,
  accountType: PropTypes.string,
  small: PropTypes.bool,
  right: PropTypes.bool,
}

UserTooltip.defaultProps = {
  image: '',
  name: '',
  username: '',
  roleChatType: '',
  accountType: '',
  small: false,
  right: false,
}

export default UserTooltip;
