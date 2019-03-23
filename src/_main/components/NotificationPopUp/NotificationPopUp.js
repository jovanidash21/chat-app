import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import { SOCKET_BROADCAST_NOTIFY_MESSAGE } from '../../constants/message';
import {
  SOCKET_BROADCAST_REJECT_VIDEO_CALL,
  SOCKET_BROADCAST_ACCEPT_VIDEO_CALL
} from '../../constants/video-call';
import socket from '../../../socket';
import './styles.scss';

class NotificationPopUp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ::this.handleNotifyMessage();
  }
  handleNotifyMessage() {
    const {
      handleViewMessage,
      mobile
    } = this.props;

    socket.on('action', (action) => {
      switch (action.type) {
        case SOCKET_BROADCAST_NOTIFY_MESSAGE:
          var chatRoom =  {...action.chatRoom};
          if ( ! chatRoom.mute.data ) {
            chatRoom.data.name = action.senderName;

            this.notificationSystem.addNotification({
              title: 'New message from ' +
                action.senderName +
                (chatRoom.data.chatType !== 'direct' ? ` on ${action.chatRoomName}` : ''),
              level: 'success',
              action: {
                label: 'View Message',
                callback: function() {
                  handleViewMessage(chatRoom, mobile);
                }
              }
            });
          }
          break;
        case SOCKET_BROADCAST_REJECT_VIDEO_CALL:
          this.notificationSystem.addNotification({
            title: 'Your video call is not accepted',
            level: 'error'
          });
          break;
        case SOCKET_BROADCAST_ACCEPT_VIDEO_CALL:
          this.notificationSystem.addNotification({
            title: 'Your video call is accepted',
            level: 'success'
          });
          break;
      }
    });
  }
  render() {
    return (
      <NotificationSystem ref={(element) => { this.notificationSystem = element; }} />
    )
  }
}

NotificationPopUp.propTypes = {
  handleViewMessage: PropTypes.func.isRequired,
  mobile: PropTypes.bool
}

NotificationPopUp.defaultProps = {
  mobile: false
}

export default NotificationPopUp;
