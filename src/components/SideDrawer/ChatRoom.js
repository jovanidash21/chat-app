import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name } = this.props;

    return (
      <div className="chat-room">
        {name}
      </div>
    )
  }
}

ChatRoom.propTypes={
  name: PropTypes.string.isRequired
}

export default ChatRoom;