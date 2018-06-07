import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import { SOCKET_BROADCAST_NOTIFY_MESSAGE } from '../../constants/message';
import socket from '../../socket';
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
    const { handleViewMessage } = this.props;

    socket.on('action', (action) => {
      if ( action.type === SOCKET_BROADCAST_NOTIFY_MESSAGE ) {
        notificationSystem.addNotification({
          title: 'New message from ' +
            action.senderName +
            (action.chatRoom.data.chatType !== 'direct' ? ` on ${action.chatRoomName}` : ''),
          message: '',
          autoDismiss: 0,
          level: 'success',
          action: {
            label: 'View Message',
            callback: function() {
              handleViewMessage(action.chatRoom);
            }
          }
        });
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
  handleViewMessage: PropTypes.func.isRequired
}

export default NotificationPopUp;
