import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import { SOCKET_BROADCAST_NOTIFY_MESSAGE } from '../../constants/message';
import socket from '../../../socket';
import './styles.scss';

var notificationSystem = null;

class NotificationPopUp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    notificationSystem = this.refs.notificationSystem;

    ::this.handleNotifyMessage();
  }
  handleNotifyMessage() {
    const {
      handleViewMessage,
      mobile
    } = this.props;

    socket.on('action', (action) => {
      const chatRoom =  {...action.chatRoom};

      if ( action.type === SOCKET_BROADCAST_NOTIFY_MESSAGE ) {
        if ( !chatRoom.mute.data ) {
          chatRoom.data.name = action.senderName;

          notificationSystem.addNotification({
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
      }
    });
  }
  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
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
