import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnlineIndicator } from '../OnlineIndicator';
import { Avatar } from '../../../components/Avatar';
import './styles.scss';

class ChatRoomMember extends Component {
  constructor(props) {
    super(props);
  }
  handleAddDirectChatRoom(event, mobile) {
    event.preventDefault();

    const {
      chatRoomMember,
      handleAddDirectChatRoom,
    } = this.props;

    handleAddDirectChatRoom(chatRoomMember._id, mobile);
  }
  handleOpenBlockUnblockUserModal(event) {
    event.preventDefault();

    const {
      chatRoomMember,
      handleOpenBlockUnblockUserModal,
    } = this.props;

    handleOpenBlockUnblockUserModal(chatRoomMember);
  }
  render() {
    const {
      user,
      chatRoomMember,
      active,
      dropdownUp,
    } = this.props;
    let showDropdownMenu = false;

    if ( user._id !== chatRoomMember._id ) {
      showDropdownMenu = true;
    }

    return (
      <div
        className={
          "chat-room-member " +
          (chatRoomMember.isOnline ? 'online ' : 'offline ') +
          (active ? 'active' : '')
        }
        title={chatRoomMember.name}
      >
        <OnlineIndicator online={chatRoomMember.isOnline} />
        <Avatar
          image={chatRoomMember.profilePicture}
          size="23px"
          name={chatRoomMember.name}
          username={chatRoomMember.username}
          roleChatType={chatRoomMember.role}
          accountType={chatRoomMember.accountType}
          showUserTooltip
        />
        <div className="member-name">
          {chatRoomMember.name}
          {
            user._id === chatRoomMember._id &&
            <span className="you-label">(you)</span>
          }
        </div>
        <div className={"member-options-button " + (showDropdownMenu && dropdownUp ? 'mui-dropdown--up' : '')}>
          {
            showDropdownMenu &&
            <Fragment>
              <div className="ellipsis-icon" data-mui-toggle="dropdown">
                <FontAwesomeIcon icon="ellipsis-v" />
              </div>
              <ul className="dropdown-menu mui-dropdown__menu mui-dropdown__menu--right">
                <MediaQuery query="(max-width: 767px)">
                  {(matches) => {
                    return (
                      <Fragment>
                        <li>
                          <a href="#" onClick={(e) => {::this.handleAddDirectChatRoom(e, matches)}}>
                            <div className="option-icon">
                              <FontAwesomeIcon icon={["far", "envelope"]} />
                            </div>
                            Direct messages
                          </a>
                        </li>
                        {
                          chatRoomMember.role !== 'admin' &&
                          <li>
                            <a href="#" onClick={::this.handleOpenBlockUnblockUserModal}>
                              <div className="option-icon">
                                <FontAwesomeIcon icon="user-slash" />
                              </div>
                              {!chatRoomMember.blocked ? 'Block' : 'Unblock'} user
                            </a>
                          </li>
                        }
                      </Fragment>
                    )
                  }}
                </MediaQuery>
              </ul>
            </Fragment>
          }
        </div>
      </div>
    )
  }
}

ChatRoomMember.propTypes = {
  user: PropTypes.object.isRequired,
  chatRoomMember: PropTypes.object.isRequired,
  handleAddDirectChatRoom: PropTypes.func.isRequired,
  handleOpenBlockUnblockUserModal: PropTypes.func.isRequired,
  active: PropTypes.bool,
  dropdownUp: PropTypes.bool,
}

ChatRoomMember.defaultProps = {
  active: false,
  dropdownUp: false,
}

export default ChatRoomMember;
