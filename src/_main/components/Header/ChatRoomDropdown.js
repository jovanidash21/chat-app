import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

class ChatRoomDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleOpenMuteModal(event) {
    event.preventDefault();

    const { handleOpenMuteModal } = this.props;

    handleOpenMuteModal();
  }
  render() {
    return (
      <div className="mui-dropdown chat-room-dropdown">
        <div className="dropdown-toggle settings-icon" data-mui-toggle="dropdown">
          <FontAwesomeIcon icon="cog" />
        </div>
        <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
          <li>
            <a href="#" onClick={::this.handleOpenMuteModal}>
              <div className="option-icon">
                <FontAwesomeIcon icon="bell-slash" />
              </div>
              Mute
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

ChatRoomDropdown.propTypes = {
  activeChatRoom: PropTypes.object.isRequired,
  handleOpenMuteModal: PropTypes.func.isRequired
}

export default ChatRoomDropdown;
