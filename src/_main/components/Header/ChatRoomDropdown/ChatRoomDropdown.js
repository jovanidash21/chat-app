import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ChatRoomDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleOpenMuteUnmuteModal(event) {
    event.preventDefault();

    const { handleOpenMuteUnmuteModal } = this.props;

    handleOpenMuteUnmuteModal();
  }
  render() {
    const { activeChatRoom } = this.props;
    const isMuted = activeChatRoom.mute.data;

    return (
      <div className="mui-dropdown chat-room-dropdown">
        <div className="dropdown-toggle settings-icon header-item-icon" data-mui-toggle="dropdown">
          <FontAwesomeIcon icon="cog" />
        </div>
        <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
          <li>
            <a href="#" onClick={::this.handleOpenMuteUnmuteModal}>
              <div className="option-icon">
                <FontAwesomeIcon icon={!isMuted ? 'bell-slash' : 'bell'} />
              </div>
              {!isMuted ? 'Mute' : 'Unmute'}
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

ChatRoomDropdown.propTypes = {
  activeChatRoom: PropTypes.object.isRequired,
  handleOpenMuteUnmuteModal: PropTypes.func.isRequired,
}

export default ChatRoomDropdown;
