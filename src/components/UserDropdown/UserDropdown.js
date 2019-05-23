import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../Avatar';
import { EditProfileModal } from './EditProfileModal';
import { BlockedUsersListModal } from './BlockedUsersListModal';
import './styles.scss';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleOpenEditProfileModal(event) {
    event.preventDefault();

    const { handleOpenEditProfileModal } = this.props;

    handleOpenEditProfileModal();
  }
  handleOpenBlockedUsersListModal(event) {
    event.preventDefault();

    const { handleOpenBlockedUsersListModal } = this.props;

    handleOpenBlockedUsersListModal();
  }
  render() {
    const {
      user,
      children,
    } = this.props;
    const isLocalUser = user.accountType === 'local';

    return (
      <div className="mui-dropdown user-dropdown">
        <div className="dropdown-toggle" data-mui-toggle="dropdown">
          <Avatar
            image={user.profilePicture}
            size="32px"
            name={user.name}
            roleChatType={user.role}
            accountType={user.accountType}
            badgeCloser
          />
          <div className="arrow-down-icon">
            <FontAwesomeIcon icon="caret-down" />
          </div>
        </div>
        <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
          <li>
            <div className="user-detail">
              <div className="user-full-name">
                {user.name}
              </div>
              <div className="user-username">
                {
                  user.accountType === 'local'
                    ? '@' + user.username
                    : user.accountType
                }
              </div>
            </div>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <a href="#" onClick={::this.handleOpenEditProfileModal}>
              <div className="option-icon">
                <FontAwesomeIcon icon={isLocalUser ? 'user-edit' : 'user'} />
              </div>
              {isLocalUser ? 'Edit ' : 'View '}profile
            </a>
          </li>
          <li>
            <a href="#" onClick={::this.handleOpenBlockedUsersListModal}>
              <div className="option-icon">
              <FontAwesomeIcon icon="user-slash" />
              </div>
              Blocked users
            </a>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <a href="/logout">
              <div className="option-icon">
                <FontAwesomeIcon icon="sign-out-alt" />
              </div>
              Logout
            </a>
          </li>
        </ul>
        {children}
      </div>
    )
  }
}

UserDropdown.EditProfileModal = EditProfileModal;
UserDropdown.BlockedUsersListModal = BlockedUsersListModal;

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  handleOpenEditProfileModal: PropTypes.func.isRequired,
  handleOpenBlockedUsersListModal: PropTypes.func.isRequired,
}

export default UserDropdown;
